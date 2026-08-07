# Q1204 · Generate Parentheses

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Microsoft, Bloomberg
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Backtracking
**Concepts:** backtracking with validity-preserving constraints

## Problem Statement

Given an integer `n`, generate all combinations of `n` pairs of
well-formed (balanced) parentheses.

## Input

- `n`: a positive integer, the number of parenthesis pairs

## Output

An array of strings, each a valid combination of `n` pairs of
parentheses.

## Constraints

- `1 <= n <= 8`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 3` | `["((()))","(()())","(())()","()(())","()()()"]` | All 5 (the Catalan number for n=3) valid arrangements of 3 pairs |
| `n = 1` | `["()"]` | Only one valid arrangement is possible |

## Edge Cases

- `n = 1` → exactly one output, the minimal valid pair
- Larger `n` → the number of valid combinations grows rapidly (the
  `n`-th Catalan number), but every one must still be individually valid

## Hints

1. Generating all 2^(2n) strings of `(`/`)` and filtering for validity
   works but wastes enormous effort on strings that are invalid from a
   very early point — what could stop an invalid branch immediately,
   instead of only checking validity at the end?
2. At any point while building a string, track how many open and close
   parentheses have been placed so far. When is it *ever* still possible
   to place an open paren? When is it *ever* still possible to place a
   close paren, without immediately creating an invalid prefix?
3. An open paren can be added any time fewer than `n` have been placed
   so far. A close paren can only be added if doing so wouldn't create
   more closes than opens at that point in the string — i.e., only when
   the count of closes placed so far is strictly less than the count of
   opens placed so far.

## Algorithm

**Pattern:** backtracking with validity-preserving constraints (prune
before descending, not after).
**Core insight:** rather than generating every possible arrangement and
checking validity afterward, encode the two validity rules directly into
which choices are even allowed at each step: add `(` only if fewer than
`n` opens have been used so far, and add `)` only if doing so wouldn't
make closes outnumber opens at that point. Because every partial string
built this way is guaranteed to be a valid *prefix* of some balanced
string, every string that reaches length `2n` is automatically fully
valid — no separate validation pass is ever needed.
**Invariant:** at every point during the recursion, the partial string
built so far has `closeCount <= openCount <= n`, which is exactly the
condition for it to still be extendable into at least one valid,
balanced string of length `2n`.

## Dry Run

**Input:** `n = 2` (showing the first two full valid strings found)

| Call state (string, openCount, closeCount) | Choices tried | Action |
|---|---|---|
| `("", 0, 0)` | open allowed (0<2), close not allowed (0 not < 0) | choose `(` |
| `("(", 1, 0)` | open allowed (1<2), close allowed (0<1) | choose `(` |
| `("((", 2, 0)` | open not allowed (2 not <2), close allowed (0<2) | choose `)` |
| `("(()", 2, 1)` | open not allowed, close allowed (1<2) | choose `)` |
| `("(())", 2, 2)` | length === 2n=4 | record `"(())"` |
| backtrack to `("((", 2, 0)` | already tried `)`, no more choices | backtrack further |
| backtrack to `("(", 1, 0)` | already tried `(`, now try `)` | choose `)` |
| `("()", 1, 1)` | open allowed (1<2), close allowed (1<1? no) | choose `(` |
| `("()(", 2, 1)` | close allowed (1<2) | choose `)` |
| `("()()", 2, 2)` | length === 4 | record `"()()"` |

**Result (partial):** `["(())", "()()"]` — both are among the expected
outputs for `n = 2` (the full expected output is `["(())", "()()"]`,
matching exactly since there are only 2 valid arrangements for `n=2`).

## JavaScript Solution

```js
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, openCount, closeCount) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (openCount < n) {
      backtrack(current + '(', openCount + 1, closeCount);
    }

    if (closeCount < openCount) {
      backtrack(current + ')', openCount, closeCount + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}
```

## TypeScript Solution

```ts
function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(current: string, openCount: number, closeCount: number): void {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (openCount < n) {
      backtrack(current + '(', openCount + 1, closeCount);
    }

    if (closeCount < openCount) {
      backtrack(current + ')', openCount, closeCount + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}
```

## Time Complexity

O(4^n / sqrt(n)) — bounded by the `n`-th Catalan number (the exact count
of valid outputs), which is the tight bound for this class of
backtracking problem; each valid string also costs O(n) to build/copy.

## Space Complexity

O(n) auxiliary for the recursion depth (each level adds one character),
not counting the space needed for the output itself.

## Common Mistakes

- Generating all 2^(2n) binary strings of parens and filtering valid
  ones afterward — correct, but explores vastly more branches than
  necessary, since most prefixes are invalid long before reaching full
  length.
- Allowing a close paren whenever `closeCount < n` (matching the open
  condition) instead of `closeCount < openCount` — this permits invalid
  prefixes like `")"` to be generated.
- Concatenating strings with `+` inside deep recursion in a
  performance-sensitive context — fine at this problem's small `n`
  bound, but worth noting as a real cost at larger scale (an array-based
  builder would be more efficient).

## Interview Follow-up Questions

1. How would you verify a *given* string of parentheses is valid,
   separately from generating all valid ones? (See [Valid Parentheses](../stack/valid-parentheses.md).)
2. How would this generalize to multiple types of brackets (`()`, `[]`,
   `{}`) all needing to nest validly together?
3. Why is the count of valid outputs exactly the `n`-th Catalan number,
   and where else does that sequence show up in combinatorics?

## Similar Questions

- Valid Parentheses (see [../stack/valid-parentheses.md](../stack/valid-parentheses.md))
- Subsets (see [subsets.md](subsets.md))
- Letter Combinations of a Phone Number

---
[← Back to Backtracking](README.md) · [← Back to 65-dsa](../README.md)
