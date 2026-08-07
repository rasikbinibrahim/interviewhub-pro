# Progress

Honest status tracker. This repo's stated goal has grown since this file
was first written, and grown again since the last revision of this
paragraph — the target is no longer the ~9,000-question figure this file
used to cite. **Current target: ~19,730+ questions across 54 categories**
(the "Company-wise" row alone is stated as "2,000+", open-ended, so the
real total is higher), on top of the 100-section concept-page knowledge
base each following the full 30-part [TEMPLATE.md](TEMPLATE.md)
treatment. See [Content Target vs. Actual](#content-target-vs-actual-by-category)
below for the full per-category breakdown and honest done/target count.
This is a multi-contributor, long-term effort — realistically tens of
thousands of hours of work at genuine quality, not something any number
of individual sessions completes, and the target has already grown
faster than content has been added. This file exists so nobody has to
guess what's real versus scaffolded, no matter how large the target
grows.

## ⚠️ Content quality warning — read before trusting any "Actual" count below

**3,000 markdown question/topic pages exist on disk, but roughly 2,109 of
them (≈70%) are auto-generated placeholder content, not real questions.**
Every one of those ~2,109 files follows the same fill-in-the-blank
template — a title like `"X Concept Name NNN"`, then paragraphs that
restate the title back with generic phrases like *"is an essential
interview topic in Y... enables software engineers to build scalable,
high-performance systems..."* — with zero real problem statement, zero
real code, zero real technical explanation, regardless of topic. This
was **not** written by following [CLAUDE.md](CLAUDE.md)'s rules; it
appears to have been produced by a bulk-generation process outside a
normal content-authoring session, added to the repo alongside a genuine
~800-page baseline that **is** real, checked content. Detected via a
structural fingerprint (`scripts/` — the "Related Topics" section always
closes with an `Advanced X Architecture` / `... Performance and
Reliability` pair unique to this template); a small number of
placeholder files using yet another paraphrasing may still be
undercounted, and a small number of the ~891 "presumed real" files
haven't been individually spot-checked yet — treat both figures as
best-effort, not exact.

**What this means for every count in this file**: a file existing, or
being wired into `frontend/src/mocks/questions.ts`, is not the same
claim as "this question is correct and complete." The category table and
section table below report raw file/question counts (matching what's
literally in the repo and the running app), the same as before this was
discovered — but until a file is individually rewritten or verified, its
presence in those counts should **not** be read as done. The
[Content Target vs. Actual](#content-target-vs-actual-by-category) table
below tags every category with how many of its files are confirmed
placeholder. Fixing this is an active, ongoing rewrite effort, worked
through in section-sized batches (see "Status by section" below for
which sections have been individually rewritten so far).

**Actual, individually verified/rewritten to full quality so far: 70
coding-question pages** — the 24 previously-blank stubs plus 3
gap-fixes in [01-programming-fundamentals](01-programming-fundamentals),
33 previously-blank stubs in [65-dsa](65-dsa), and 10 previously-blank
stubs in [59-machine-coding](59-machine-coding) (3 of which needed real
code fixes, not just documentation — see that section's note). Plus a
repo-wide infrastructure fix: `scripts/sync_mock_questions.js` (which
builds `frontend/src/mocks/questions.ts` from every markdown page) was
rewritten from scratch — it previously filled placeholder values for
almost every field regardless of what the source markdown said, and in
some cases shipped an intentionally-buggy debugging example as the
"correct" solution. It now parses each page's real sections, and
self-validates every derived sample test against its own reference
solution before shipping it (165 of 973 coding questions currently have
real, passing sample tests; the rest either come from a placeholder
source file or have a structural shape — a React component, a
multi-method class — the single-function Run harness can't test). See
[CLAUDE.md](CLAUDE.md) and `scripts/sync_report.txt` (regenerate with
`node scripts/sync_mock_questions.js`) for the full remaining gap list.

## Content Target vs. Actual (by category)

User-supplied target breakdown (54 categories, ~19,730+ questions —
supersedes the old ~9,000/8-area figure above). Per the quality warning
above, **"Files" below is a raw count of what's on disk / wired into the
app, not a claim those files are correct** — "Placeholder" is how many
of those files match the detected bulk-template fingerprint and need a
full rewrite; "Real" (`Files − Placeholder`) is what's left, and even
that isn't all individually verified yet outside the categories this
session actually worked through (Programming Fundamentals, DSA's
sub-categories, Machine Coding). Status % is computed off **Real**, not
Files, since Files/Target would overstate progress by roughly 3x
repo-wide.

| Category | Target | Files | Placeholder | Real | Status (Real/Target) |
|---|---:|---:|---:|---:|---|
| Programming Fundamentals | 300 | 132 | 87 | 45 | 🟡 15.0% (40 pages individually verified) |
| Logic Building | 500 | 8 | 1 | 7 | 🚧 1.4% |
| Mathematics | 300 | 11 | 10 | 1 | 🚧 0.3% |
| Pattern Problems | 250 | 0 | 0 | 0 | 🚧 Not started |
| Arrays | 500 | 66 | 43 | 23 | 🟡 4.6% (4 pages individually verified) |
| Strings | 500 | 48 | 35 | 13 | 🚧 2.6% |
| Recursion | 250 | 11 | 8 | 3 | 🚧 1.2% |
| Searching | 200 | 2 | 1 | 1 | 🚧 0.5% |
| Sorting | 200 | 29 | 26 | 3 | 🚧 1.5% |
| Hashing | 250 | 32 | 27 | 5 | 🚧 2.0% |
| Linked List | 300 | 45 | 33 | 12 | 🟡 4.0% (3 pages individually verified) |
| Stack | 250 | 40 | 29 | 11 | 🟡 4.4% (3 pages individually verified) |
| Queue | 200 | 21 | 18 | 3 | 🚧 1.5% |
| Deque | 100 | 0 | 0 | 0 | 🚧 Not started |
| Heap | 200 | 35 | 27 | 8 | 🟡 4.0% (2 pages individually verified) |
| Binary Search | 250 | 36 | 28 | 8 | 🟡 3.2% (2 pages individually verified) |
| Trees | 450 | 59 | 36 | 23 | 🟡 5.1% (3 pages individually verified) |
| BST | 250 | 20 | 17 | 3 | 🚧 1.2% |
| Trie | 150 | 22 | 20 | 2 | 🚧 1.3% |
| Graph | 500 | 54 | 31 | 23 | 🟡 4.6% (5 pages individually verified) |
| Greedy | 250 | 14 | 13 | 1 | 🚧 0.4% |
| Backtracking | 300 | 33 | 28 | 5 | 🚧 1.7% |
| Dynamic Programming | 700 | 66 | 41 | 25 | 🟡 3.6% (5 pages individually verified) |
| Bit Manipulation | 250 | 30 | 27 | 3 | 🚧 1.2% |
| Segment Tree | 100 | 2 | 1 | 1 | 🚧 1.0% |
| Fenwick Tree | 80 | 1 | 0 | 1 | 🚧 1.3% |
| Disjoint Set | 100 | 2 | 1 | 1 | 🚧 1.0% |
| JavaScript | 1,000 | 731 | 392 | 339 | 🟡 33.9% |
| TypeScript | 500 | 191 | 127 | 64 | 🚧 12.8% |
| HTML | 250 | 50 | 34 | 16 | 🚧 6.4% |
| CSS | 500 | 62 | 40 | 22 | 🚧 4.4% |
| React | 1,000 | 329 | 290 | 39 | 🚧 3.9% |
| Redux | 300 | 48 | 46 | 2 | 🚧 0.7% |
| React Query | 200 | 8 | 6 | 2 | 🚧 1.0% |
| Next.js | 400 | 77 | 74 | 3 | 🚧 0.8% |
| React Native | 500 | 96 | 68 | 28 | 🚧 5.6% |
| Browser Internals | 500 | 57 | 40 | 17 | 🚧 3.4% |
| Web APIs | 300 | — | — | — | 🚧 not separately tracked in the current `category` taxonomy (folded into Browser Internals / JavaScript) |
| Networking | 300 | 28 | 11 | 17 | 🚧 5.7% |
| Security | 300 | 67 | 62 | 5 | 🚧 1.7% |
| Accessibility | 250 | 42 | 31 | 11 | 🚧 4.4% |
| Performance | 300 | 80 | 61 | 19 | 🚧 6.3% |
| Testing | 300 | 45 | 42 | 3 | 🚧 1.0% |
| Build Tools | 250 | 4 | 2 | 2 | 🚧 0.8% |
| Design Patterns | 300 | 62 | 58 | 4 | 🚧 1.3% |
| Frontend Architecture | 300 | 15 | 14 | 1 | 🚧 0.3% |
| Machine Coding | 500 | 71 | 54 | 17 | 🟡 3.4% (10 pages individually verified this session) |
| Frontend System Design | 400 | 83 | 68 | 15 | 🚧 3.8% |
| Low-Level Design | 200 | 0 | 0 | 0 | 🚧 Not started |
| High-Level Design | 200 | 0 | 0 | 0 | 🚧 Not started |
| Behavioral | 300 | 2 | 0 | 2 | 🚧 0.7% |
| HR Interview | 200 | 1 | 0 | 1 | 🚧 0.5% |
| Company-wise | 2,000 | 11 | 0 | 11 | 🚧 0.6% |
| Mock Interviews | 500 | 1 | 0 | 1 | 🚧 0.2% |
| Revision & Cheat Sheets | Complete coverage | 2 | 0 | 2 | 🟡 In progress (2, both real) |
| **Total** | **~19,730+** | **~3,000** | **~2,109** | **~891** | **~4.5% (Real/Target)** |

Notes on this table:
- "🟡 N pages individually verified" means exactly what it says — a
  human-reviewable rewrite happened this session for that many pages in
  that category; the rest of that category's "Real" count is only
  *presumed* real (not confirmed placeholder by the structural
  fingerprint), not individually checked.
- The Files/Placeholder/Real split was computed programmatically (see
  the quality warning above for the detection method) — re-derive it
  with `grep -rlE "^- (Advanced|System)?.*Performance and Reliability" --include="*.md" .`
  for the placeholder set, cross-referenced against
  `scripts/sync_mock_questions.js`'s own `resolveCategory()` for the
  per-category split, rather than trusting these numbers to stay fresh
  as content changes.
- Company-wise, Behavioral, HR Interview, Mock Interviews, and Revision
  & Cheat Sheets show 0 detected placeholder — those sections weren't
  touched by whatever process added the ~2,109 placeholder files, so
  their small existing counts are the original, pre-placeholder-event
  content.
- This table will drift the moment new content is added without a
  matching edit here — treat it the same way as
  `mocks/questions.ts`'s header comment: update both together, not just
  one.

**Legend:** ✅ Done · 🟡 In progress · 🚧 Planned (folder + README stub only)

This file tracks two separate things — don't conflate them:
1. **Content status** (below, "Status by section") — the markdown
   knowledge base and question bank.
2. **Implementation phases** (immediately below) — the actual
   InterviewHub Pro application (frontend, backend, database, etc.),
   specced in [PRD.md](PRD.md)/[ARCHITECTURE.md](ARCHITECTURE.md)/
   [DATABASE.md](DATABASE.md)/[API_GUIDE.md](API_GUIDE.md)/
   [ADMIN_GUIDE.md](ADMIN_GUIDE.md), which is documentation-only so far.

## Implementation Phases

5 of 15 phases have real, verified code behind them (4, 5, 6, 9, 13 below)
— all frontend-only, against mocked/local data, no backend. The other 10
are genuinely 🚧 not started. Phases are worked **one at a time, with a
checkpoint after each** (per the workflow in
[CLAUDE.md](CLAUDE.md#workflow-before-implementing-any-feature)) — not
run end-to-end unsupervised. Several of the not-started phases
specifically require a decision or credential only a human can provide
before implementation can start at all (flagged below) — those are hard
blockers, not sequencing preferences.

| # | Phase | Status | Blocked on |
|---|---|---|---|
| 1 | Authentication | 🚧 Not started | OAuth app registration (Google/GitHub) if OAuth is in scope; JWT secret provisioning |
| 2 | Database | 🚧 Not started | Environment decision — local/Docker Postgres+Mongo+Redis for dev, or real provisioned infra |
| 3 | API | 🚧 Not started | Depends on 1, 2; backend framework choice (FastAPI vs. NestJS/Express) per [ARCHITECTURE.md](ARCHITECTURE.md)'s open decision |
| 4 | Dashboard | 🟡 Built against mocked data | Real backend data (Phase 2, 3) still needed for cross-device sync; progress is currently localStorage-only |
| 5 | Question Engine | 🟡 Built against mocked data | **Every written question/topic page in the repo is now wired end-to-end** (list, filter, search, detail) — 105 total: 81 coding (`65-dsa` incl. logic-building, `64-react-native-coding`, `63-react-coding`, `61-javascript-coding`, `01-programming-fundamentals`, `72-debugging`) + 24 technical (`10-react`, `04-typescript`, `05-browser-internals`, `31-security`, `32-performance`, `59-machine-coding`, `60-frontend-system-design`, all 11 `02-javascript-fundamentals` concept pages + both `03-advanced-javascript` pages). `mocks/questions.ts`'s header comment is the authoritative "add it here too" reminder for any new page written later. List view adds client-side pagination (8/page), per-topic/difficulty/type question counts in the filter dropdowns, and URL-sourced filter+page state (`useSearchParams`) so browser back navigation from a question detail restores the list's exact prior filters/page/scroll instead of resetting to defaults — see `QuestionList.tsx`'s and `AppShell.tsx`'s comments. RTK Query layer already shaped to match [API_GUIDE.md](API_GUIDE.md) exactly, so swapping in the real backend is a `baseQuery` change, not a rewrite |
| 6 | Monaco Editor | ✅ Done | JS/TS language switch, dark/light theme wired to the app's own theme toggle |
| 7 | Run Engine | 🚧 Not started | **Unresolved design decision**: code-execution sandboxing approach (see [PRD.md](PRD.md)'s open questions) — this is a security-critical design choice, not an implementation detail, and needs to be resolved deliberately before any code runs here. **Not the same thing** as the client-side "Run" button that exists today (`frontend/src/shared/services/codeRunner.ts`), which executes a candidate's code only inside their own browser tab against sample tests — safe, same trust model as typing into devtools, and explicitly documented in that file as not a substitute for this phase. |
| 8 | Submission Engine | 🚧 Not started | Depends on 7 |
| 9 | Progress System | 🟡 Built locally (no sync) | Solved/attempted timestamps, bookmarks, streak, and a real Day 1/3/7/15/30 revision schedule computed client-side from those timestamps — core logic in `frontend/src/store/slices/progressSlice.ts` + `shared/selectors/progressSelectors.ts`. Full UI surface built on top: Bookmarks page, Revision page (real due-schedule list), Settings page (theme, JSON export, reset with confirmation), live sidebar badge counts, top-bar search, and the Dashboard widgets (streak/weak-topics/recent-problems/upcoming-revision). Persisted to localStorage only; Phase 1/2 (Auth, Database) still needed for cross-device sync |
| 10 | Mock Interview | 🚧 Not started | Depends on 5, 7, 9 |
| 11 | Analytics | 🚧 Not started | Depends on 9 (needs real usage data to be meaningful) |
| 12 | Admin Panel | 🚧 Not started | Depends on 1, 2, 3 |
| 13 | Testing | 🟡 Started — Vitest configured | 63 tests across 8 files covering the real business logic and key screens: `codeRunner` (12, including regression tests that run every reference solution against its own sample tests), `progressSelectors` (14 — streak calculation, revision-schedule staging), `progressSlice` (9 — reducers + localStorage persistence + legacy-data migration), a store-level integration test (3 — slice + RTK Query + selectors wired together), `QuestionListItem` (6), `RevealPanel` (4 — progressive-reveal ordering), `Dashboard` (8 — streak/weak-topics/recent-problems widgets against seeded state), `CodingScreen` (7 — Run producing real pass/fail, bookmark toggle, tab switching, language switch; Monaco mocked since jsdom can't run it). Writing these tests found and fixed two real bugs: `RevealPanel`'s first "Show Hint" button had an inverted visibility condition and could never be clicked from a fresh page load, and the bookmark toggle button had no accessible name. Run via `npm test` in `frontend/`. **Known environment issue, not a code issue** — in this specific sandboxed dev environment (WSL, slow disk I/O, and observed contention from multiple concurrent Claude Code sessions on the same machine), a multi-file `npm test` run occasionally hits a Vitest worker-pool startup race that either silently drops one file's tests or fails that file's worker outright. Every file has been verified passing 100% individually (`npx vitest run <path>`) after retries; if `npm test` ever reports fewer than 63 tests or a worker-start error, re-run it or isolate the affected file rather than trusting a single batch run. **`QuestionList.test.tsx` added (6 tests — question counts, pagination, and the URL-based back-navigation state fix) but NOT yet verified running** — this session's `node_modules` was installed from a Windows host (`win32-x64-msvc` native binaries for rolldown/oxlint) but is being invoked via WSL's Linux Node, so both `vitest` and `oxlint` fail to start entirely (`Cannot find native binding`) regardless of any code change; a subsequent `npm install` from inside WSL should resolve it. Correctness was instead verified via `tsc --noEmit -p tsconfig.app.json` (strict mode, zero new errors). Still needed: E2E layer (Playwright/Cypress, per `50-testing`) once there's more to click through |
| 14 | Performance Optimization | 🚧 Not started | Needs a real implementation to measure first |
| 15 | Deployment | 🚧 Not started | Real infra/cost/access decision — needs explicit go-ahead |

## Status by section

| # | Section | Status |
|---|---------|--------|
| 00 | Roadmap | ✅ Done — see [ROADMAP.md](ROADMAP.md) |
| 01 | Programming Fundamentals | 🟡 In progress (40 pages) |
| 02 | JavaScript Fundamentals | 🟡 In progress (273 pages) |
| 03 | Advanced JavaScript | 🟡 In progress (39 pages) |
| 04 | TypeScript | 🟡 In progress (64 pages) |
| 05 | Browser Internals | 🟡 In progress (3 pages) |
| 06 | HTML | 🟡 In progress (1 page) |
| 07 | CSS | 🟡 In progress (3 pages) |
| 08 | Responsive Design | 🚧 Planned |
| 09 | Accessibility | 🟡 In progress (1 page) |
| 10 | React | 🟡 In progress (36 pages) |
| 11 | React Patterns | 🚧 Planned |
| 12 | React Hooks | 🚧 Planned |
| 13 | React Performance | 🚧 Planned |
| 14 | React Internals | 🚧 Planned |
| 15 | React Router | 🚧 Planned |
| 16 | Redux | 🟡 In progress (2 pages) |
| 17 | Redux Toolkit | 🚧 Planned |
| 18 | RTK Query | 🚧 Planned |
| 19 | Zustand | 🚧 Planned |
| 20 | React Query | 🟡 In progress (2 pages) |
| 21 | MobX | 🚧 Planned |
| 22 | Next.js | 🟡 In progress (2 pages) |
| 23 | React Native | 🟡 In progress (27 pages) |
| 24 | Expo | 🚧 Planned |
| 25 | Node.js Basics | 🚧 Planned |
| 26 | REST API | 🚧 Planned |
| 27 | GraphQL | 🚧 Planned |
| 28 | WebSockets | 🚧 Planned |
| 29 | Authentication | 🚧 Planned |
| 30 | Authorization | 🚧 Planned |
| 31 | Security | 🟡 In progress (4 pages) |
| 32 | Performance | 🟡 In progress (18 pages) |
| 33 | Caching | 🚧 Planned |
| 34 | Networking | 🟡 In progress (17 pages) |
| 35 | Vite | 🟡 In progress (2 pages) |
| 36 | Webpack | 🚧 Planned |
| 37 | Babel | 🚧 Planned |
| 38 | npm | 🚧 Planned |
| 39 | Yarn | 🚧 Planned |
| 40 | pnpm | 🚧 Planned |
| 41 | Monorepo | 🚧 Planned |
| 42 | TurboRepo | 🚧 Planned |
| 43 | Nx | 🚧 Planned |
| 44 | Design Patterns | 🟡 In progress (3 pages) |
| 45 | Clean Code | 🚧 Planned |
| 46 | SOLID Principles | 🚧 Planned |
| 47 | Frontend Architecture | 🟡 In progress (1 page) |
| 48 | Micro Frontends | 🚧 Planned |
| 49 | Module Federation | 🚧 Planned |
| 50 | Testing | 🟡 In progress (2 pages) |
| 51 | CI/CD | 🚧 Planned |
| 52 | Docker | 🚧 Planned |
| 53 | Kubernetes Basics | 🚧 Planned |
| 54 | Cloud Basics | 🚧 Planned |
| 55 | AWS Frontend | 🚧 Planned |
| 56 | Azure Frontend | 🚧 Planned |
| 57 | Firebase | 🚧 Planned |
| 58 | Supabase | 🚧 Planned |
| 59 | Machine Coding | 🟡 In progress (16 pages) |
| 60 | Frontend System Design | 🟡 In progress (15 pages) |
| 61 | JavaScript Coding | 🟡 In progress (7 pages) |
| 62 | TypeScript Coding | 🚧 Planned |
| 63 | React Coding | 🟡 In progress (1 page) |
| 64 | React Native Coding | 🟡 In progress (1 page) |
| 65 | DSA | 🟡 In progress (202 pages) |
| 66 | SQL Basics | 🚧 Planned |
| 67 | NoSQL Basics | 🚧 Planned |
| 68 | Git | 🚧 Planned |
| 69 | GitHub | 🚧 Planned |
| 70 | Linux | 🚧 Planned |
| 71 | VS Code | 🚧 Planned |
| 72 | Debugging | 🟡 In progress (1 page) |
| 73 | Monitoring | 🚧 Planned |
| 74 | Logging | 🚧 Planned |
| 75 | Error Tracking | 🚧 Planned |
| 76 | Analytics | 🚧 Planned |
| 77 | Behavioral | 🟡 In progress (2 pages) |
| 78 | Leadership | 🚧 Planned |
| 79 | Mock Interviews | 🟡 In progress (1 page) |
| 80 | Resume Preparation | 🚧 Planned |
| 81 | HR Questions | 🟡 In progress (1 page) |
| 82 | Salary Negotiation | 🚧 Planned |
| 83 | Cheat Sheets | 🟡 In progress (2 pages) |
| 84 | Revision Notes | 🚧 Planned |
| 85 | Company-wise Questions | 🟡 In progress (11 pages) |
| 86 | FAANG Questions | 🚧 Planned |
| 87 | Product Company Questions | 🚧 Planned |
| 88 | MNC Questions | 🚧 Planned |
| 89 | Senior Engineer Questions | 🚧 Planned |
| 90 | Staff Engineer Questions | 🚧 Planned |
| 91 | Principal Engineer Questions | 🚧 Planned |
| 92 | Interview Experiences | 🚧 Planned |
| 93 | Coding Challenges | 🚧 Planned |
| 94 | Projects | 🚧 Planned |
| 95 | Open Source | 🚧 Planned |
| 96 | AI for Frontend | 🚧 Planned |
| 97 | MCP | 🚧 Planned |
| 98 | LLM Integration | 🚧 Planned |
| 99 | Career Guide | 🚧 Planned |

## What "In progress" actually means right now

**02 JavaScript Fundamentals** — 239 topic and question pages written (core concepts, flagship pages, and converted technical questions covering scope, closures, prototypes, hoisting, this, async patterns, ES6+ features, memory model, and object manipulation).

**03 Advanced JavaScript** — 4 topic pages written at core depth ([Event Loop, Microtasks & Macrotasks](03-advanced-javascript/event-loop-and-async.md), [Promise Internals](03-advanced-javascript/promise-internals.md), [async/await](03-advanced-javascript/async-await.md), and [Execution Context & Call Stack](03-advanced-javascript/execution-context-and-call-stack.md)).

**04 TypeScript** — 36 topic and question pages written covering generics, mapped types, conditional types, type narrowing, inference, ambient declarations, and compiler options.

**23 React Native** — 25 topic and question pages written covering React Native architecture, navigation, native modules, layout, performance, and Expo workflows.

**61 JavaScript Coding** — 7 flagship coding questions written per [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md): [Implement Debounce](61-javascript-coding/debounce.md), [Implement Throttle](61-javascript-coding/throttle.md), [Implement a Deep Clone](61-javascript-coding/deep-clone.md), [Implement Function.prototype.bind](61-javascript-coding/function-bind-polyfill.md), [Implement Promise.all](61-javascript-coding/promise-all-polyfill.md), [Implement a Custom EventEmitter](61-javascript-coding/event-emitter.md), and [Implement a once() Function](61-javascript-coding/once-function.md) — all with real, runnable JS + TS solutions, dry runs, and derived complexity, no placeholders.

**65 DSA** — 65 fully-templated coding questions written across Arrays, Strings, Hashing, Linked List (Reverse, Merge Two Sorted, Cycle, Add Two Numbers), Stack, Queue, Binary Search, Binary Tree, BST, Graph, Backtracking, Recursion, Sorting, Bit Manipulation, Logic Building, and Patterns.

**Active Content in Frontend & Infrastructure Sections** — 391 total authentic pages written and 100% wired into `frontend/src/mocks/questions.ts`:
- [10-react](10-react) ([React Fiber & Concurrent Rendering](10-react/react-fiber-and-concurrent-rendering.md))
- [05-browser-internals](05-browser-internals) ([Critical Rendering Path](05-browser-internals/critical-rendering-path.md))
- [31-security](31-security) ([Web Security: XSS, CSRF & Content Security Policy](31-security/web-security-xss-csrf-csp.md))
- [32-performance](32-performance) ([Web Performance: Core Web Vitals & INP Optimization](32-performance/core-web-vitals-and-inp.md))
- [59-machine-coding](59-machine-coding) ([Machine Coding: Virtualized Infinite Scroll Grid](59-machine-coding/virtualized-infinite-scroll-grid.md))
- [60-frontend-system-design](60-frontend-system-design) ([Frontend System Design: Realtime Chat & WebSockets](60-frontend-system-design/realtime-chat-websockets.md))
- [63-react-coding](63-react-coding) ([Implement useDebounce](63-react-coding/use-debounce-hook.md))
- [64-react-native-coding](64-react-native-coding) ([Implement a FlatList-based Infinite Scroll List](64-react-native-coding/flatlist-infinite-scroll.md))
- [72-debugging](72-debugging) ([Input and Output Basics](72-debugging/input-output-basics.md))

## Recommended build order

Given the scope, sections should be tackled in roughly this order —
highest interview-frequency and highest reuse-value first:

1. JavaScript Fundamentals / Advanced JavaScript (in progress)
2. React / React Hooks / React Patterns / React Performance / React Internals
3. TypeScript
4. Browser Internals
5. Frontend System Design + Machine Coding
6. DSA
7. Everything else, roughly in the numbered order, as demand dictates

If you have a specific section you want prioritized next, say so — the
order above is a default, not a constraint.
