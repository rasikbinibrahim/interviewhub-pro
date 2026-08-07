# Coding Question Generator

**Purpose:** produce one complete coding question, fully filled, matching
the Coding Question Template in [CLAUDE.md](../../CLAUDE.md). Never emit a
partial question — every field below is required.

## Required inputs

- **Topic/pattern** (e.g. "sliding window", "binary search on answer",
  "graph — topological sort")
- **Target difficulty** (Easy / Medium / Hard) — or "classify it yourself"
  using [difficulty-classifier.md](difficulty-classifier.md)
- **Category** — one of the [Folder Rules](../../CLAUDE.md#folder-rules)
  categories

## Process

1. Write the **Problem Statement** first, in your own words — never copy
   a known problem verbatim if it's a recognizable LeetCode-style
   question; paraphrase and, where sensible, reframe with a frontend-
   relevant scenario (e.g. "flatten a nested comment tree" instead of a
   generic "flatten nested array").
2. Derive **Input**, **Output**, and **Constraints** from the statement —
   constraints should be concrete (`1 <= n <= 10^5`, not "large input").
3. Write 2-3 **Examples**, each with input, output, and a one-line
   explanation of *why* that output is correct.
4. Generate **Edge Cases** using [edge-case-generator.md](edge-case-generator.md).
5. Generate **Hints** using [hint-generator.md](hint-generator.md) — 3
   progressive hints, none of which reveal the full algorithm.
6. Write the **Algorithm** section: the approach in prose, including *why*
   this approach and not a more naive one, using
   [algorithm-explainer.md](algorithm-explainer.md).
7. Generate the **Dry Run** using [dry-run-generator.md](dry-run-generator.md)
   against one of the Examples above.
8. Generate **JavaScript Solution** and **TypeScript Solution** using
   [solution-generator.md](solution-generator.md) — always include both a
   brute-force pass (briefly) and the optimized solution in full, per the
   "always optimize" rule.
9. Fill **Time Complexity** / **Space Complexity** using
   [complexity-analyzer.md](complexity-analyzer.md).
10. Write **Common Mistakes** — specific bugs a real candidate would
    write for *this exact problem*, not generic advice.
11. Write 3-5 **Follow-up Questions** — the kind an interviewer actually
    asks after a correct solution (scale up the input, change a
    constraint, ask for a streaming/online variant, ask to parallelize).
12. List **Related Problems** — 2-4 problems from the same pattern,
    linked if they already exist in this repo.

## Hard constraints

- No placeholder text anywhere ("TODO", "...", "etc." as a stand-in for
  real content) — see Repository Rules in CLAUDE.md.
- JavaScript must be ES2025; TypeScript must be strict-mode-clean (no
  `any`, no unchecked null access).
- Every algorithmic step in the solution needs an inline comment
  explaining *why*, not *what* (the code already shows what).
- Company tags must be honest — see
  [company-question-generator.md](company-question-generator.md)'s
  no-fabrication rule. If uncertain, omit the tag rather than guess.

## Output skeleton

```markdown
### [Question ID] · [Title]

**Difficulty:** Easy | Medium | Hard
**Companies:** ...
**Frequency:** ...
**Category:** ...
**Concepts:** ...

#### Problem Statement
...

#### Input / Output
...

#### Constraints
...

#### Examples
...

#### Edge Cases
...

#### Hints
...

#### Algorithm
...

#### Dry Run
...

#### JavaScript Solution
```js
...
```

#### TypeScript Solution
```ts
...
```

#### Time Complexity / Space Complexity
...

#### Common Mistakes
...

#### Follow-up Questions
...

#### Related Problems
...
```
