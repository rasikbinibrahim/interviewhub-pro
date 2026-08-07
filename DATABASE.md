# Database

> **Status: target schema, not yet built.** No database is provisioned.
> This document defines the schema so implementation has a real spec to
> build against, not so infrastructure gets stood up from reading it.

## Why three different stores

Each store is chosen for a genuinely different data shape and access
pattern — not "because more technology," but because forcing all three
kinds of data into one store would be the wrong trade-off for at least
one of them:

| Store | Holds | Why this store |
|---|---|---|
| **PostgreSQL** | Users, progress, notes, bookmarks, achievements, mock interview attempts | Strongly relational (a user has many progress records, each referencing a question), needs real transactions (submitting an answer updates progress *and* a streak *and* possibly an achievement atomically), and benefits from foreign-key integrity that a document store doesn't enforce natively |
| **MongoDB** | Questions, technical questions | Every question has the same ~23-field shape from [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md), but with genuinely variable-length nested content (multiple examples, multiple hints, multiple follow-ups) that maps naturally onto a document rather than several join tables; questions are also read far more than written, favoring a store optimized for that |
| **Redis** | Sessions, rate limiting, hot caches | Sub-millisecond access for data that's inherently ephemeral (a session token, a rate-limit counter) or safely reconstructable if lost (a cached "top 100 questions this week" query) — nothing here needs durability guarantees stronger than "survive a restart is nice, not required" |

**MVP note** (see [PRD.md](PRD.md)): if the "does auth need to exist at
MVP" open question resolves toward "no, localStorage first," Postgres
becomes Phase 2 infrastructure and MVP ships on MongoDB (questions) +
nothing else. This document specs the full design either way; sequencing
is a PRD decision, not a schema one.

## PostgreSQL schema

```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           TEXT UNIQUE NOT NULL,
    password_hash   TEXT,                 -- NULL if OAuth-only account
    display_name    TEXT NOT NULL,
    oauth_provider  TEXT,                 -- 'google' | 'github' | NULL
    oauth_id        TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_active_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE progress (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id     TEXT NOT NULL,        -- references MongoDB _id, see note below
    status          TEXT NOT NULL CHECK (status IN ('attempted', 'solved')),
    solved_at       TIMESTAMPTZ,
    attempt_count   INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, question_id)
);

CREATE TABLE bookmarks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id     TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, question_id)
);

CREATE TABLE notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id     TEXT NOT NULL,
    content_markdown TEXT NOT NULL DEFAULT '',
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, question_id)
);

CREATE TABLE revision_schedule (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id     TEXT NOT NULL,
    due_at          TIMESTAMPTZ NOT NULL,
    interval_stage  INTEGER NOT NULL DEFAULT 0, -- index into [1,3,7,15,30] days
    completed_at    TIMESTAMPTZ
);

CREATE TABLE achievements (
    id              TEXT PRIMARY KEY,      -- e.g. 'solved_100_easy'
    title           TEXT NOT NULL,
    description     TEXT NOT NULL
);

CREATE TABLE user_achievements (
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id  TEXT NOT NULL REFERENCES achievements(id),
    earned_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, achievement_id)
);

CREATE TABLE mock_interview_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company         TEXT,
    question_ids    TEXT[] NOT NULL,
    started_at      TIMESTAMPTZ NOT NULL,
    submitted_at    TIMESTAMPTZ,
    duration_seconds INTEGER NOT NULL,
    score           NUMERIC,
    per_question_result JSONB            -- [{questionId, passed, timeSpentSeconds}, ...]
);

-- Indexes beyond the implicit PK/UNIQUE ones
CREATE INDEX idx_progress_user_status ON progress(user_id, status);
CREATE INDEX idx_revision_due ON revision_schedule(user_id, due_at) WHERE completed_at IS NULL;
```

**Cross-database reference note:** `question_id` columns above are
strings referencing a MongoDB `ObjectId`, not a Postgres foreign key —
there's no cross-database foreign-key enforcement, which is the real
cost of this two-store split. The application layer (never the database
layer) is responsible for not creating a `progress` row for a
`question_id` that doesn't exist in MongoDB. This trade-off is accepted
deliberately for the read/write pattern benefits above; if it becomes a
real integrity problem in practice, a periodic consistency-check job is
the standard mitigation, not a redesign.

## MongoDB schema

### `questions` collection

Mirrors [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md) field-for-field —
this collection's shape should never drift from that document; if the
template changes, this schema changes with it, not independently.

```js
{
  _id: ObjectId,
  questionNumber: "Q101",        // human-facing ID, e.g. "Q101"
  title: "Two Sum",
  difficulty: "Easy",            // "Easy" | "Medium" | "Hard"
  companies: ["Google", "Amazon"],
  frequency: 5,                  // 1-5, maps to ★ display
  category: "arrays",            // matches ROADMAP.md taxonomy slug
  concepts: ["hash map", "single-pass"],
  problemStatement: "...",       // markdown
  input: "...",
  output: "...",
  constraints: ["2 <= nums.length <= 10^4", "..."],
  examples: [
    { input: "...", output: "...", explanation: "..." }
  ],
  edgeCases: [
    { case: "...", expected: "..." }
  ],
  hints: ["...", "...", "..."],  // exactly 3, per hint-generator.md
  algorithm: "...",              // markdown
  dryRun: "...",                 // markdown (table)
  solutions: {
    javascript: "...",           // full solution source
    typescript: "..."
  },
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  commonMistakes: ["...", "..."],
  followUpQuestions: ["...", "..."],
  similarQuestions: [ObjectId, ObjectId],
  testCases: {
    sample: [{ input: [...], expectedOutput: ... }],     // shown to user
    hidden: [{ input: [...], expectedOutput: ... }],     // run on Submit only
    edge: [{ input: [...], expectedOutput: ... }],
    performance: [{ input: [...], expectedOutput: ..., maxRuntimeMs: 500 }]
  },
  status: "published",           // "draft" | "published" — see ADMIN_GUIDE.md
  createdAt: ISODate,
  updatedAt: ISODate
}
```

**Indexes:** `{ category: 1, difficulty: 1 }` (filter queries),
`{ companies: 1 }` (company dashboard), text index on `title` +
`problemStatement` for MVP search (see the Elasticsearch note below).

### `technical_questions` collection

Mirrors [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md):

```js
{
  _id: ObjectId,
  question: "Explain React Fiber",
  difficulty: "Medium",
  experienceLevel: "Senior",
  companies: ["Google", "Meta"],
  frequency: 4,
  expectedAnswer: "...",
  deepExplanation: "...",
  productionExample: "...",
  bestPractices: "...",
  tradeOffs: "...",
  commonMistakes: "...",
  followUpQuestions: ["...", "..."],
  relatedTopics: [ObjectId],
  status: "published",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## Redis usage

| Key pattern | Purpose | TTL |
|---|---|---|
| `session:{sessionId}` | JWT refresh-token session record | 30 days (refresh window) |
| `ratelimit:submit:{userId}` | Throttle Submit spam (prevent brute-forcing hidden tests) | 60s sliding window |
| `cache:question-list:{filterHash}` | Cached filtered/paginated question list response | 5 min |
| `cache:company:{slug}:stats` | Precomputed company dashboard counts | 15 min |
| `leaderboard:daily` | Sorted set for "problems solved today" if surfaced anywhere | 24h |

Nothing in Redis is a system of record — every key here is either
reconstructable from Postgres/MongoDB or genuinely fine to lose (a
session forces re-login, a stale cache just recomputes on next miss).

## Search: MVP vs. later phase

Per [PRD.md](PRD.md)'s phasing, MongoDB's built-in text index (`title` +
`problemStatement` + `concepts`) is sufficient for MVP-scale question
volume (low thousands of documents). Elasticsearch/Meilisearch becomes
worth its operational cost once search needs to rank by relevance across
large free-text fields, support typo-tolerant fuzzy matching at scale, or
facet across many filter dimensions simultaneously — a real but
Phase 3-scale need, not a Phase 1 one. Don't stand up a search cluster to
serve a question bank that fits comfortably in a Mongo index.

## Migrations & seeding

- Postgres: a standard migration tool (e.g. `node-pg-migrate` or
  Prisma Migrate, depending on the eventual backend framework choice —
  not decided here) tracks schema changes in version control.
- MongoDB: no schema migrations in the traditional sense, but a
  **validation schema** (via `$jsonSchema` on the collection) should
  enforce the required [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)
  fields at the database level, not only in application code — this is
  the database-layer backstop for the "never publish an incomplete
  question" rule in [CLAUDE.md](CLAUDE.md).
- Seeding: the markdown content already written in
  [65-dsa](65-dsa) and elsewhere is the actual seed source — a build
  script (not yet written) parses those `.md` files against
  [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)'s field list and inserts
  them, so content authored in markdown never needs to be re-entered
  through the admin UI.

---
[← Back to root index](README.md)
