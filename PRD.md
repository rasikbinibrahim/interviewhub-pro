# Product Requirements Document — InterviewHub Pro

> **Status: partially built.** This document defines *what* to build and
> *why*, at the scope of the full vision described to date. See
> [ARCHITECTURE.md](ARCHITECTURE.md) for *how*. A real frontend exists
> (`frontend/`) covering most of the MVP scope below, but built
> local-first (localStorage, no auth/backend) rather than strictly
> following the phase gating below — see the reconciliation note at the
> end of the MVP section, and [PROGRESS.md](PROGRESS.md) for the
> authoritative current state.

## Vision

A LeetCode-style platform purpose-built for frontend engineering
interviews — coding practice, technical Q&A, company-specific prep,
mock interviews, progress tracking, and spaced-repetition revision, in
one place, with an admin panel for continuously growing the question
bank.

## Problem

Generic coding-practice platforms (LeetCode, HackerRank) test general
algorithmic ability but don't cover frontend-specific technical depth
(React internals, browser internals, framework-specific coding
patterns) or frontend-specific interview structure (technical Q&A
rounds, machine coding rounds, frontend system design). Frontend
candidates end up stitching together a generic DSA site, scattered
blog posts, and ad-hoc notes. InterviewHub Pro is the single surface
that covers both the DSA bar *and* the frontend-specific bar.

## Target users

| Persona | Need |
|---|---|
| 0-3 YOE candidate | Structured path from fundamentals through frontend-specific topics, without needing to know what to study next |
| 5-7 YOE (Senior) | Fast diagnostic of weak spots, company-specific prep, timed mock interviews |
| 7-10+ YOE (Staff/Principal) | System design depth, technical discussion prep, less DSA-volume-driven |
| Content owner (you, via [ADMIN_GUIDE.md](ADMIN_GUIDE.md)) | A fast, structured way to keep growing the question bank without touching code |

## Scope: MVP vs. later phases

The full feature list in the vision (achievements, analytics dashboards,
Elasticsearch-backed search, OAuth login, admin bulk import, mock
interview scoring) is a mature-product feature set, not a v1. A PRD's
job is to say what ships first. Proposed phasing — **this is a
recommendation for discussion, not a decision already made**:

### MVP (Phase 1)
- Question list with filters (difficulty, topic, company) and search
  (Postgres full-text search is sufficient at MVP scale; Elasticsearch
  is a later-phase upgrade, not a day-one dependency — see
  [DATABASE.md](DATABASE.md))
- Coding question page: problem, Monaco editor (JS/TS), Run against
  sample tests, Submit against hidden tests, progressive reveal
  (Hint → Algorithm → Dry Run → Solution)
- Technical question page (read-only Q&A, progressive reveal)
- Progress tracking (Solved/Attempted/Bookmarked) persisted per user
- Single-user auth (email/password via JWT) — OAuth is additive, not
  blocking
- Admin CRUD for questions (add/edit/delete), no bulk import yet

### Phase 2
- Company-wise dashboards
- Personal notes (markdown, autosave)
- Revision scheduling (spaced repetition: Day 1/3/7/15/30)
- Bulk import (JSON/Markdown) in the admin panel
- OAuth login (Google/GitHub)

### Phase 3
- Mock interview mode (timed, scored, no-answers-during)
- Analytics dashboard (accuracy, weak topics, difficulty distribution)
- Achievements/gamification
- Elasticsearch/Meilisearch upgrade for search at scale
- Study Mode / Practice Mode / Review Mode as distinct UI modes (MVP
  ships one unified mode with progressive reveal, which covers most of
  the same underlying need)

**Reconciliation — what's actually been built vs. this plan:** the real
build didn't wait for auth/backend to exist before building the rest of
MVP; it built the whole frontend loop against mocked/local data first
(question list + filters + search, coding page with Monaco + Run +
progressive reveal, technical-question-shaped reveal pattern, progress
tracking via localStorage) and deferred auth/backend entirely — a
different sequencing than "MVP = Phase 1 as literally scoped above," but
consistent with this section's own point that shipping something
end-to-end early beats waiting on a dependency. One Phase 2 item is also
already done ahead of schedule: revision scheduling (Day 1/3/7/15/30) is
built and real, computed client-side. See [PROGRESS.md](PROGRESS.md) for
the exact phase-by-phase status. Admin CRUD, bulk import, company
dashboards, OAuth, mock interview mode, and analytics are all still
genuinely not started.

**Why this ordering (as originally proposed):** the MVP is the smallest version that's actually
usable end-to-end for the core loop (find a question → solve it → get
feedback → track progress) — everything in Phase 2/3 is real value, but
none of it works without Phase 1 existing first, and shipping Phase 1
early means real usage data informs whether Phase 2/3 priorities (as
currently ordered) are actually right.

## Core user flows

### Solve a coding question
1. User browses/searches/filters the question list.
2. Opens a question → sees Problem/Constraints/Examples, hints hidden.
3. Writes code in Monaco, clicks Run → sees pass/fail against sample
   tests with actual vs. expected output.
4. Clicks Submit → runs against hidden tests + edge cases; gets a
   pass/fail summary with runtime/memory (MVP: pass/fail and test
   count is sufficient; percentile ranking is a later-phase nice-to-have
   requiring a large existing submission corpus to be meaningful).
5. Reveals Algorithm/Dry Run/Solution progressively as needed.
6. Question is marked Solved; progress updates.

### Admin adds a question
1. Admin logs in (single-admin auth, not a role system at MVP scope).
2. Fills the question form (fields per
   [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)) or pastes a markdown
   file matching that template.
3. System validates required fields present (ties to
   [CHECKLIST.md](CHECKLIST.md)'s validation checklist) before allowing
   publish.
4. Question appears in the live question list immediately.

### Take a mock interview (Phase 3)
1. User selects a company + duration + question mix.
2. Timer starts; questions presented one at a time, no hints, no
   solutions visible.
3. Single submission per question, no re-attempts.
4. At time's end (or early finish), a summary score is shown; answers
   review happens *after* submission, not during.

## Success metrics (proposed)

- **Activation:** % of signups who solve at least 1 question in their
  first session.
- **Retention:** % of users with a 7-day-later return visit (the
  streak/revision system is designed specifically to drive this).
- **Depth:** average questions solved per active user per week.
- **Content velocity:** questions added per week via the admin panel
  (this is the metric that validates the admin panel is actually
  reducing your own content-authoring friction, which is its whole
  point).

## Explicitly out of scope

- **No full sample projects** (dashboards, e-commerce apps, etc.) — per
  the standing "no projects" rule in [CLAUDE.md](CLAUDE.md).
- **No social/community features** (comments, discussion threads, user
  profiles visible to others) at any currently-planned phase — nothing
  in the vision calls for this, and it's a materially different
  moderation/trust-and-safety surface if added later.
- **No multi-tenant admin roles** at MVP — a single admin (you) managing
  content, not a marketplace of contributors, per
  [ADMIN_GUIDE.md](ADMIN_GUIDE.md).

## Open questions

- ~~Is user auth actually required for MVP, or can progress tracking work
  anonymously (localStorage) first~~ — **provisionally answered by what
  was actually built**: localStorage-first, no auth, per the
  reconciliation note above. Not a final decision — cross-device sync
  will force this question again once Phase 1/2 (Auth, Database) are
  implemented — but it's no longer blocking anything today.
- **Still genuinely open:** self-hosted code execution (running
  arbitrary submitted JS/TS safely for the real hidden-test Submission
  Engine) needs a sandboxing decision (e.g. isolated-vm, a
  container-per-run model, or a hosted code-execution API) — this is a
  real security surface, not a detail, and belongs in
  [ARCHITECTURE.md](ARCHITECTURE.md) once decided. The client-side "Run"
  button that exists today does **not** answer this question — it
  executes code only in the user's own browser tab against sample
  tests, which is a different trust model entirely (see
  `frontend/src/shared/services/codeRunner.ts`'s file-level comment).

---
[← Back to root index](README.md)
