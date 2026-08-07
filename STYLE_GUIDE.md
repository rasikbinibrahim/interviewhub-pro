# Style Guide

Formatting, naming, documentation, and comment standards for everything
in this repo — question solutions, prompt files, and (once it exists)
the app's own source code.

## Code formatting

- **JavaScript:** ES2025, `const`/`let` only (never `var`), strict
  equality only (`===`/`!==`), 2-space indentation, semicolons required,
  single quotes for strings unless the string itself contains a single
  quote.
- **TypeScript:** strict mode always (`strict: true`,
  `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true` —
  see [docs/prompts/typescript-generator.md](docs/prompts/typescript-generator.md)).
  Explicit return types on every exported function.
- **Line length:** soft-wrap around 80-100 characters in code blocks —
  this is study material read on a variety of screens, not a codebase
  with an enforced formatter; prioritize readability over a hard rule.
- **One statement per line.** No comma-operator chains, no multiple
  assignments on one line, even where JS permits it — this is
  interview-communication code, meant to be read and explained aloud.

## Naming conventions

- **Variables/functions:** `camelCase`, always a real word or
  standard abbreviation — `left`/`right` for two-pointer bounds,
  `visited` for a traversal set, never single letters except a bare loop
  index (`i`) in a context with no risk of ambiguity.
- **Classes/types/interfaces:** `PascalCase`.
- **Constants that are truly fixed** (not just `const`-declared, but
  conceptually a constant — e.g. `MAX_SAFE_DEPTH`): `SCREAMING_SNAKE_CASE`.
  A `const` holding a value that changes per call (e.g. `const result =
  []`) stays `camelCase` — the distinction is "is this conceptually a
  constant," not "was it declared with `const`."
- **Files:**
  - Markdown topic pages: `kebab-case.md` (e.g. `closures.md`,
    `var-let-const.md`).
  - Prompt files: `kebab-case-generator.md` /
    `kebab-case-classifier.md`/`analyzer.md` (matches the existing
    [docs/prompts/](docs/prompts/) set).
  - Once app code exists: components `PascalCase.tsx`, hooks
    `useCamelCase.ts`, everything else `kebab-case.ts`.
- **Question IDs:** `Q` followed by a zero-padded number (`Q001`,
  `Q042`) — stable once assigned, never reused.

## Documentation rules

- Every markdown topic/question file starts with a single `#` title
  matching its filename's subject, followed immediately by required
  metadata (difficulty, companies, etc. per the relevant template) —
  never bury metadata mid-document.
- Section headers use sentence case ("Common mistakes", not "Common
  Mistakes" — exception: the field names defined in
  [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)/
  [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md), which
  keep their exact Title Case field names for scannability and
  consistency with the templates).
- Every code block is language-tagged (` ```js `, ` ```ts `,
  ` ```mermaid `) — untagged code blocks are a lint-worthy defect in
  this repo, not a style nitpick, since syntax highlighting is part of
  how this content is meant to be read.
- Internal links are relative and checked against the actual file tree
  before a page is considered done — a broken link in a study reference
  is worse than no link.

## Comment standards (in solution code)

- Comments explain **why**, not **what** — `// remove the digit we just
  consumed` (why this line exists in the algorithm) beats
  `// divide remaining by 10` (what the line already visibly does).
- No comment restates the line it's attached to. If a comment can be
  deleted without losing information, delete it.
- A function-level comment (JSDoc-style `/** ... */`) is required when
  the function's name and signature alone don't make its contract clear
  — most solution functions in this repo are simple enough not to need
  one; don't add one just to look thorough.
- Never leave a commented-out alternative implementation in a "final"
  solution — if it's worth showing, it belongs in the Algorithm section
  as prose ("a brute-force alternative would be...", per
  [solution-generator.md](docs/prompts/solution-generator.md)), not as
  dead code.

## Consistency check

Before merging new content, run it against
[CHECKLIST.md](CHECKLIST.md) — this file defines *what* good style looks
like; that file is *how* you verify a specific piece of content actually
meets it.

---
[← Back to root index](README.md)
