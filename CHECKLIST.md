# Checklist

Three checklists: run **Quality** while writing, **Review** before
merging, **Validation** as a final mechanical pass. All three apply to
both coding questions and technical questions unless marked otherwise.

## Quality checklist (while authoring)

- [ ] Every field in [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md) /
      [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md) is
      present — none skipped, none left as a placeholder
- [ ] Problem statement is original phrasing, not copied verbatim from a
      known external source (coding questions)
- [ ] At least 2 Examples (coding) with a stated reason for each output
- [ ] Edge Cases generated via
      [edge-case-generator.md](docs/prompts/edge-case-generator.md) and
      checked against the actual solution, not just listed
- [ ] Exactly 3 Hints, progressive, none revealing the next stage (see
      [hint-generator.md](docs/prompts/hint-generator.md))
- [ ] Algorithm section states the *why*, not just a restatement of the
      code (see [algorithm-explainer.md](docs/prompts/algorithm-explainer.md))
- [ ] Dry Run traces the actual submitted code, not a simplified
      restatement of it
- [ ] Both JavaScript and TypeScript solutions provided, both actually
      run and produce correct output for every stated example
- [ ] TypeScript solution is strict-mode clean — no `any`, no unchecked
      null/undefined access (see [STYLE_GUIDE.md](STYLE_GUIDE.md))
- [ ] Manual algorithm used where a built-in would trivialize the exact
      thing being tested (see [CLAUDE.md](CLAUDE.md#coding-rules))
- [ ] Time/Space Complexity include derivation, not just a final Big-O
      label (see [complexity-analyzer.md](docs/prompts/complexity-analyzer.md))
- [ ] Common Mistakes are specific to this exact question, not generic
      advice that could apply to any problem
- [ ] Company tags (if any) pass the no-fabrication rule (see
      [company-question-generator.md](docs/prompts/company-question-generator.md))

## Review checklist (before merging)

- [ ] Difficulty classification matches the rubric in
      [difficulty-classifier.md](docs/prompts/difficulty-classifier.md),
      not just a gut-feel label
- [ ] Content is in the correct section per
      [ROADMAP.md](ROADMAP.md)'s taxonomy
- [ ] Coding and technical content are kept in separate files/sections —
      never mixed in one entry (see
      [CLAUDE.md](CLAUDE.md#ai-generation-rules))
- [ ] No placeholder text anywhere (`TODO`, `...`, `etc.` standing in for
      real content)
- [ ] Naming, formatting, and comment style match
      [STYLE_GUIDE.md](STYLE_GUIDE.md)
- [ ] If this question closely resembles an existing one in the repo, it
      genuinely tests something different (pattern, constraint, or
      framing) — not a near-duplicate
- [ ] Related/Similar Questions and Follow-up Questions actually link to
      real content in this repo where such content exists, rather than
      being generic unlinked suggestions

## Validation checklist (final, mechanical pass)

- [ ] Every internal markdown link resolves to a real file (no broken
      relative links)
- [ ] Every code block is language-tagged
- [ ] Question ID is unique across the whole repo and hasn't been reused
- [ ] File is named per [STYLE_GUIDE.md](STYLE_GUIDE.md)'s naming
      convention and placed in the correct folder
- [ ] The relevant section's `README.md` index has been updated to link
      the new file
- [ ] [PROGRESS.md](PROGRESS.md) has been updated if this changes a
      section's status
- [ ] JavaScript solution actually executes without error against every
      stated Example and Edge Case
- [ ] TypeScript solution actually compiles under strict mode (see
      compiler options in
      [docs/prompts/typescript-generator.md](docs/prompts/typescript-generator.md))

---
[← Back to root index](README.md)
