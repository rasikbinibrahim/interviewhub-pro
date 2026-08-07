# CLAUDE.md

Project-standing instructions for any Claude Code session working in this
repo. Read this before generating or editing any question, answer, or
prompt file.

## Project Goal

Build the best **Frontend Interview Practice Platform**.

Purpose:
- Practice coding
- Study technical questions
- Prepare for FAANG
- Prepare for product companies

**No projects.** This repo is interview preparation only — no full sample
applications, no "build a dashboard" portfolio pieces. If content starts
looking like a tutorial project rather than interview prep, it's out of
scope.

> **Status note:** the repo is two things now — a plain markdown
> knowledge base (100 numbered sections — see [README.md](README.md) and
> [TEMPLATE.md](TEMPLATE.md)) **and** a real, running frontend app
> (`frontend/` — Vite + React 19 + TypeScript strict + Tailwind + Redux
> Toolkit/RTK Query + Monaco, built against mocked data). See
> [PROGRESS.md](PROGRESS.md#implementation-phases) for exactly which
> implementation phases are real versus still 🚧. There is still no
> `backend/`, no database, no auth, no deployment — the full
> frontend/backend/database/API/admin stack in
> [PRD.md](PRD.md)/[ARCHITECTURE.md](ARCHITECTURE.md)/[DATABASE.md](DATABASE.md)/[API_GUIDE.md](API_GUIDE.md)/[ADMIN_GUIDE.md](ADMIN_GUIDE.md)
> is still the target, not yet fully built. Content generated under this
> file's rules must stay format-agnostic where possible (the *question
> and answer content* should be equally valid whether rendered as
> markdown or served through the app) — see the last section of this
> file, [Reconciling with the existing repo](#reconciling-with-the-existing-repo).

## Companion Documents

This file holds the rules; the following files hold the detail so
nothing is duplicated in two places (if this file and a companion ever
disagree, the companion file — being more specific — wins, and this file
should be corrected to match):

| File | What it defines |
|---|---|
| [PRD.md](PRD.md) | Product vision, target users, MVP-vs-later phasing, user flows, success metrics (not yet built) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Target app architecture — frontend + backend stack, folder structure, state management, data flow (not yet built) |
| [UI_UX_GUIDE.md](UI_UX_GUIDE.md) | Design system — colors, typography, spacing, components, accessibility, keyboard shortcuts |
| [DATABASE.md](DATABASE.md) | PostgreSQL + MongoDB + Redis schema and why each store is used for what |
| [API_GUIDE.md](API_GUIDE.md) | REST API endpoint spec |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | Admin panel scope, access control, content validation pipeline |
| [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md) | Full coding-question field list + a worked example |
| [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md) | Full technical-question field list + a worked example |
| [STYLE_GUIDE.md](STYLE_GUIDE.md) | Code formatting, naming, comments, documentation style |
| [PROMPTS.md](PROMPTS.md) | Index into the reusable prompts in [docs/prompts/](docs/prompts/) |
| [ROADMAP.md](ROADMAP.md) | Sequenced study path through the repo, by phase and experience level |
| [CHECKLIST.md](CHECKLIST.md) | Quality / review / validation checklists before adding content |
| [PROGRESS.md](PROGRESS.md) | Honest status of what's actually written vs. scaffolded |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to add a topic page |

## AI Generation Rules

- Never generate placeholder content.
- Never skip explanations.
- Never output incomplete solutions.
- Prefer readable, interview-ready code over clever/golfed code.
- Explain the algorithm *before* the code, not after — a reader should
  understand the approach before seeing its implementation.
- Always include a dry run and full complexity analysis (time and
  space) — no exceptions, no "left as an exercise."
- **Keep coding and technical interview content in separate sections.**
  A coding question uses [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md); a
  concept question uses
  [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md).
  Never blend the two into one entry, even when a topic could plausibly
  support either framing (e.g. "implement a debounce" is a coding
  question; "explain debouncing and when you'd use it" is a technical
  question — write them as two separate entries if both are wanted, not
  one hybrid).
- Maintain a consistent template across all generated content — every
  coding question has all 23 fields from
  [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md); every technical question
  has all 13 fields from
  [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md). A
  question missing fields is not a valid entry, even in a draft state —
  mark it as an unwritten backlog item (per [PROGRESS.md](PROGRESS.md)'s
  pattern) rather than publishing a partial page.

## Repository Rules

- Never generate placeholder code.
- Never generate incomplete answers.
- Never skip explanations.
- Always optimize solutions (don't stop at a correct-but-naive solution
  without at least discussing the optimal one).
- Always explain every algorithm — the *why*, not just the *what*.
- Always include a dry run.
- Always include complexity analysis (time and space).
- Always include follow-up questions.

## Coding Rules

- Prefer manual algorithms over reaching for a built-in that hides the
  logic the question is actually testing (e.g. implement the traversal
  yourself rather than `Array.prototype.flat(Infinity)` when the question
  is *about* traversal).
- Avoid unnecessary built-in functions — if a built-in would trivialize
  the exact thing being tested, don't use it; if it's incidental (e.g.
  `Math.max` inside an otherwise-manual algorithm), it's fine.
- Explain why every step exists — no step should appear without a reason
  a candidate could repeat back in an interview.
- Variable names must be meaningful (`left`/`right`, not `l`/`r`;
  `visited`, not `v`) — this is interview-communication practice, not
  just code style.
- Use ES2025 JavaScript for all JS solutions.
- TypeScript solutions must use strict mode (`strict: true` semantics —
  no implicit `any`, no unchecked nulls).

## Coding Question Template

Full 23-field template, ordering, and a complete worked example (Reverse
a Number) now live in **[QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)** —
generated via
[docs/prompts/coding-question-generator.md](docs/prompts/coding-question-generator.md).

## Technical Question Template

Full 13-field template, ordering, and a complete worked example (Explain
React Fiber) now live in
**[TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md)** —
generated via
[docs/prompts/technical-question-generator.md](docs/prompts/technical-question-generator.md).

## Folder Rules

Coding-question content is organized by these categories:

**Programming Fundamentals:** Logic, Math, Patterns

**Data Structures & Algorithms:** Arrays, Strings, Hashing, Linked List,
Queue, Stack, Heap, Tree, BST, Trie, Graph, Greedy, Backtracking, Dynamic
Programming, Bit Manipulation

**Language & Framework:** JavaScript, TypeScript, React, Redux, React
Native

**Other:** Browser, System Design, Mock Interviews

### Reconciling with the existing repo

This list is a category taxonomy for *coding questions specifically*, not
a replacement for the repo's existing 100-section structure. Map it onto
existing sections rather than creating a parallel structure:

| Folder Rule category | Existing section |
|---|---|
| Logic, Math, Patterns, Arrays, Strings, Hashing, Linked List, Queue, Stack, Heap, Tree, BST, Trie, Graph, Greedy, Backtracking, DP, Bit Manipulation | [65-dsa](65-dsa) (one subfile per topic) |
| JavaScript | [61-javascript-coding](61-javascript-coding) |
| TypeScript | [62-typescript-coding](62-typescript-coding) |
| React | [63-react-coding](63-react-coding) |
| Redux | within [63-react-coding](63-react-coding) or a new subfolder if volume warrants it |
| React Native | [64-react-native-coding](64-react-native-coding) |
| Browser | [05-browser-internals](05-browser-internals) |
| System Design | [60-frontend-system-design](60-frontend-system-design) |
| Mock Interviews | [79-mock-interviews](79-mock-interviews) |

Per the "no projects" rule above, [94-projects](94-projects) and
[95-open-source](95-open-source) are **out of scope** for new content
under these rules. They remain as empty stubs from the initial scaffold;
don't populate them unless this rule changes.

## Difficulty

Easy / Medium / Hard — no other values. Classify using
[docs/prompts/difficulty-classifier.md](docs/prompts/difficulty-classifier.md).

## Company Tags

Google, Meta, Amazon, Microsoft, Apple, Netflix, Uber, Stripe, Adobe,
Atlassian, Oracle, LinkedIn, Airbnb, Salesforce, Shopify, Walmart,
Bloomberg, Cloudflare, GitHub, ServiceNow, Zoho, Freshworks, TCS,
Infosys, Wipro, Accenture, Capgemini, IBM, HCL, Cognizant, EPAM,
Thoughtworks, GlobalLogic, KPMG, Deloitte, PayPal, Paytm, PhonePe,
Razorpay, Flipkart, Swiggy, Zomato.

Only tag a company if there's a real, defensible reason to (a genuinely
common pattern at that company, not a guess) — see the "no fabrication"
note in [docs/prompts/company-question-generator.md](docs/prompts/company-question-generator.md).
This list extends the company set already tracked in
[85-company-wise-questions](85-company-wise-questions) —
[88-mnc-questions](88-mnc-questions) should be updated to include the
services/fintech-company set (Zoho, Freshworks, TCS, Infosys, Wipro,
Accenture, Capgemini, IBM, HCL, Cognizant, EPAM, Thoughtworks,
GlobalLogic, KPMG, Deloitte, PayPal, Paytm, PhonePe, Razorpay, Flipkart,
Swiggy, Zomato) that wasn't there before.

## Code Quality Rules

All generated code must be: readable, clean, interview-ready, production
style, explained step by step, appropriately commented, and consistent
with the rest of the repo (naming, formatting, structure).

This section governs **question-content code** (the JS/TS solutions
inside coding questions). The application codebase itself (once it
exists) is governed by the next section, which is a distinct, stricter
set of rules — a teaching-solution snippet and a production application
module answer to different concerns.

## Application Codebase Standards

> Applies once real implementation starts (see
> [Implementation Phases](#implementation-phases)
> below) — there is no application codebase yet.

- Feature-based architecture: code organized by feature
  (`features/editor`, `features/questions`), not by technical layer
  (`components/`, `reducers/`, `services/` as top-level folders) — see
  [ARCHITECTURE.md](ARCHITECTURE.md)'s folder structure.
- SOLID principles, applied pragmatically — a component/module with one
  clear reason to change, dependencies pointed at abstractions where a
  real seam is needed (e.g. the persistence layer), not SOLID applied
  ceremonially to trivial code that will only ever have one
  implementation.
- Clean Architecture boundaries: UI components, business logic, services
  (API calls, external integrations), and data access are separated into
  distinct layers — a component should not directly call `fetch`, and
  business logic should not import a React hook.
- Domain-Driven Design **where appropriate** — this app has real
  domain complexity worth modeling explicitly (a `RevisionSchedule`
  domain concept, a `SubmissionResult` value object) but is not a
  large enough domain to justify full DDD ceremony (bounded contexts,
  aggregates, repositories) everywhere; apply it to the genuinely
  complex domain logic (revision scheduling, progress calculation,
  mock interview scoring), not to simple CRUD screens.
- Components/modules stay under ~300 lines where practical — a
  component consistently exceeding that is a signal to extract a
  sub-component or move logic to a hook/service, not a hard build-time
  limit to game with formatting.
- TypeScript strict mode across the entire codebase, frontend and
  backend — same bar as [docs/prompts/typescript-generator.md](docs/prompts/typescript-generator.md)
  already sets for question-content TS solutions.
- Reuse existing components/modules before writing a new one — check
  for an existing implementation first; never create a second version
  of something that already exists in the codebase.
- No dead code, no duplicate files or folders, no unused files —
  removing these is part of the standard workflow below, not a
  separate cleanup pass done occasionally.
- Unit tests for all business logic; integration tests where a feature
  crosses a real boundary (API + database, editor + run engine).
- Accessibility and responsive design are requirements, not
  enhancements — see [UI_UX_GUIDE.md](UI_UX_GUIDE.md)'s standards.
- Dark and light themes both supported from the start, not
  dark-only-with-light-later — see [UI_UX_GUIDE.md](UI_UX_GUIDE.md)'s
  color system.
- Security practices per [API_GUIDE.md](API_GUIDE.md) (reveal
  integrity, rate limiting) and standard practice beyond it (input
  validation at every API boundary, parameterized queries, secrets
  never committed to the repo).

### Workflow before implementing any feature

1. Review existing code for something to reuse.
2. Reuse existing modules rather than duplicating.
3. Remove dead code encountered along the way.
4. Remove duplicate code encountered along the way.
5. Remove unused folders/files encountered along the way.
6. Implement the feature.
7. Update the relevant documentation (the companion file that owns
   that concern — never CLAUDE.md itself for feature-level detail).
8. Update [PROGRESS.md](PROGRESS.md)'s
   [implementation phase tracker](#implementation-phases).
9. Run lint.
10. Run the type checker.
11. Run tests.
12. Review the implementation before considering the task done.

This workflow applies per feature/task — it is not a license to chain
tasks unsupervised. See [PROGRESS.md](PROGRESS.md) for why each
implementation phase is checkpointed rather than run end-to-end
automatically.

## Explanation Rules

Every answer must explain, in this order: Problem → Logic → Algorithm →
Dry Run → Code → Complexity → Optimization → Interviewer's Expectation
(what a strong answer actually demonstrates to the person on the other
side of the table).

## UI Rules (target platform — not yet built)

LeetCode-style, dark theme, with: search, filters, bookmarks, progress
tracking, hints, show/hide solution, a code editor, previous/next
navigation, notes.

### Solution Visibility

Hide the answer by default. The user reveals progressively, in this
order: Show Hint → Show Algorithm → Show Dry Run → Show Code → Show
Complexity → Show Follow-up. Never reveal a later stage before an earlier
one has been requested.

### Code Editor

Monaco Editor, with: Run, Reset, Copy, Format, and a Language Switch
between JavaScript and TypeScript.

### Learning Flow

Read Problem → Think → Write Code → Run → Compare → Reveal Solution →
Study Explanation → Mark Solved.

### Progress Tracking

Per-question states: Solved, Attempted, Bookmarked, Revision Needed,
Favorite, Completed.

### Search Filters

Difficulty, Topic, Company, Frequency, Concept, Solved, Bookmarked.

## Answer Rules

Never provide only code. Every answer must include: Explanation,
Visualization, Dry Run, Complexity, Optimization, Alternative Solution,
Interview Tips.

## Repository Structure & Naming

- **Content structure** (the 100 numbered sections, e.g.
  `02-javascript-fundamentals`): see [README.md](README.md) for the full
  index and [CONTRIBUTING.md](CONTRIBUTING.md) for how a topic file is
  added to one.
- **App structure** (not yet built): see [ARCHITECTURE.md](ARCHITECTURE.md).
- **Naming conventions** (files, variables, question IDs): see
  [STYLE_GUIDE.md](STYLE_GUIDE.md) — don't improvise a naming pattern
  that file doesn't already cover.

## Reusable Prompt Files

Specialized, reusable prompt templates live in
[docs/prompts/](docs/prompts/) — one per content-generation task, so a
session can be pointed at a specific prompt instead of re-deriving these
rules from scratch each time. See **[PROMPTS.md](PROMPTS.md)** for the
full index, organized by task category.

Each prompt file assumes the rules in *this* file as context and doesn't
repeat them — read this file first.
