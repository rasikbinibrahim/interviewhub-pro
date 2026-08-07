# Salvaged Source Data

This folder holds the raw data files from the prior (pre-rebuild) version
of this repo, kept **only** so the content isn't lost while
[BACKLOG-JS.md](../BACKLOG-JS.md) gets converted into real topic pages.
This is not part of the new repo's structure or its published content —
it's a source archive for migration work.

- `questions.ts` — 250 JavaScript question stubs (id, title, difficulty,
  time estimate), plus TypeScript/React/React Native stubs.
- `detailedAnswers.ts` — the actual content per question: core concept
  explanation, senior-level nuance, best practices, and a runnable code
  example with expected output, keyed by question id.
- `challenges.ts` — ~58 interactive coding-challenge problem statements
  with constraints and test cases (Two Sum, Debounce, Promise.all polyfill,
  etc.) — source for [61-javascript-coding](../61-javascript-coding).
- `codingSolutions.ts` — reference solutions for the above.

**Once a topic from [BACKLOG-JS.md](../BACKLOG-JS.md) is fully converted
into a markdown page, check it off there.** Once every item in that file
is converted, this folder should be deleted — it's scaffolding for the
migration, not a permanent part of the repo.
