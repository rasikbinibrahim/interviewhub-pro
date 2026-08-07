# Prompts

Quick-reference index into this repo's reusable Claude prompts. The full
prompt text lives in [docs/prompts/](docs/prompts/) — one file per
task, each self-contained with required inputs, process, hard
constraints, and an output skeleton. This file exists so the right
prompt is easy to find; it doesn't duplicate their content.

Every prompt in this set assumes [CLAUDE.md](CLAUDE.md) as standing
context and doesn't repeat its rules.

> **Note on `PROMPTS/generate-*.md`:** a later spec asked for a
> `PROMPTS/` folder with 7 files (`generate-question`, `generate-answer`,
> `generate-dry-run`, `generate-react-question`, `generate-js-question`,
> `review-question`, `company-question`). That folder wasn't created —
> [docs/prompts/](docs/prompts/) already covers the same 7 tasks (see
> the mapping below) with equal or greater depth, and duplicating them
> under a second name would just create two copies that drift apart.
> If you specifically want the shorter names, this file already gives
> you that as an index — the underlying prompt content doesn't need to
> move or duplicate.

| Requested name | Maps to |
|---|---|
| `generate-question` | [coding-question-generator.md](docs/prompts/coding-question-generator.md) |
| `generate-answer` | [solution-generator.md](docs/prompts/solution-generator.md) |
| `generate-dry-run` | [dry-run-generator.md](docs/prompts/dry-run-generator.md) |
| `generate-react-question` | [react-generator.md](docs/prompts/react-generator.md) |
| `generate-js-question` | [javascript-generator.md](docs/prompts/javascript-generator.md) |
| `review-question` | [review-generator.md](docs/prompts/review-generator.md) |
| `company-question` | [company-question-generator.md](docs/prompts/company-question-generator.md) |

## Generate coding questions

- [coding-question-generator.md](docs/prompts/coding-question-generator.md) — the primary entry point; produces a complete question against [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)
- [solution-generator.md](docs/prompts/solution-generator.md) — JS + TS solutions specifically
- [javascript-generator.md](docs/prompts/javascript-generator.md) — JS-specific conventions
- [typescript-generator.md](docs/prompts/typescript-generator.md) — TS-specific conventions
- [react-generator.md](docs/prompts/react-generator.md), [redux-generator.md](docs/prompts/redux-generator.md), [react-native-generator.md](docs/prompts/react-native-generator.md) — framework-specific coding questions

## Generate technical questions

- [technical-question-generator.md](docs/prompts/technical-question-generator.md) — produces a complete technical Q&A against [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md)

## Generate explanations

- [algorithm-explainer.md](docs/prompts/algorithm-explainer.md) — the *why* behind an algorithm: pattern, core insight, invariant
- [complexity-analyzer.md](docs/prompts/complexity-analyzer.md) — derived (not asserted) time/space complexity

## Generate dry runs

- [dry-run-generator.md](docs/prompts/dry-run-generator.md) — step-by-step execution trace, table form for loop-shaped algorithms, prose form for recursion/branching

## Generate hints

- [hint-generator.md](docs/prompts/hint-generator.md) — exactly 3 progressive hints, none of which leak the next reveal stage

## Generate company-wise questions

- [company-question-generator.md](docs/prompts/company-question-generator.md) — tags/selects questions per company, governed by the no-fabrication rule (never invent that a specific question was asked at a specific company without a real basis)

## Other prompts in this set

Not explicitly called out in the six categories above, but part of the
same reusable set:

- [edge-case-generator.md](docs/prompts/edge-case-generator.md) — systematic edge-case checklist by input type
- [mock-interview-generator.md](docs/prompts/mock-interview-generator.md) — full timed mock interview scripts, see [ROADMAP.md](ROADMAP.md)'s Mock Interviews section
- [review-generator.md](docs/prompts/review-generator.md) — reviews a candidate's own submitted solution against this repo's quality bar
- [revision-generator.md](docs/prompts/revision-generator.md) — compresses an existing topic page into a cheat sheet / revision note
- [difficulty-classifier.md](docs/prompts/difficulty-classifier.md) — the rubric behind every Easy/Medium/Hard label in this repo

---
[← Back to root index](README.md)
