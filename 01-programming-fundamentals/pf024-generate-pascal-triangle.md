# PF024 · Generate Pascal's Triangle

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** arrays, math, pascals-triangle

## Problem Statement

Write a function `generatePascal(numRows)` that returns the first
`numRows` rows of Pascal's triangle, where each row is an array of
numbers and each interior value is the sum of the two values above it.

## Input

`numRows`: a non-negative integer.

## Output

An array of `numRows` arrays, the rows of Pascal's triangle.

## Constraints

`0 <= numRows <= 30`

## Examples

| Input | Output | Why |
|---|---|---|
| `3` | `[[1], [1,1], [1,2,1]]` | Row 2's middle value `2` is `1 + 1` from row 1 |
| `1` | `[[1]]` | A single row containing just the top `1` |
| `0` | `[]` | No rows requested |

## Edge Cases

- `numRows = 0` → an empty array, no rows at all
- `numRows = 1` → a single row `[1]`, with no interior values to compute
- First and last value of every row are always `1`, regardless of row
  length — the interior loop never touches them

## Hints

1. Every row starts and ends with `1` — what does that tell you about
   how to initialize each row before filling in its interior?
2. Each interior value at position `j` in row `i` is the sum of the
   values at positions `j-1` and `j` in the *previous* row — this means
   you need the previous row available before you can compute the
   current one.
3. Build the triangle row by row, from the top down, so each new row can
   look up the row that was just completed.

## Algorithm

**Pattern:** bottom-up row construction using the previous row.
**Core insight:** row `i` of Pascal's triangle always has `i + 1`
entries, with the first and last always `1`; only the interior entries
(index `1` through `i - 2`) need to be computed, and each one is exactly
the sum of the two entries diagonally above it in row `i - 1`. Building
rows in order (top to bottom) guarantees the previous row is always
already available when the current row needs it.
**Invariant:** after row `i` is pushed onto `triangle`, `triangle[i]`
holds the mathematically correct i-th row (0-indexed) of Pascal's
triangle.

## Dry Run

**Input:** `numRows = 4`

| i | row initialized | interior fill (j from 1 to i-1) | final row |
|---|---|---|---|
| 0 | `[1]` | none (loop doesn't run) | `[1]` |
| 1 | `[1, 1]` | none (loop doesn't run) | `[1, 1]` |
| 2 | `[1, 1, 1]` | `j=1: row[1] = triangle[1][0] + triangle[1][1] = 1+1 = 2` | `[1, 2, 1]` |
| 3 | `[1, 1, 1, 1]` | `j=1: 1+2=3`; `j=2: 2+1=3` | `[1, 3, 3, 1]` |

**Result:** `[[1], [1,1], [1,2,1], [1,3,3,1]]` — matches Pascal's
triangle for 4 rows.

## JavaScript Solution

```js
function generatePascal(numRows) {
  const triangle = [];
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle;
}
```

## TypeScript Solution

```ts
function generatePascal(numRows: number): number[][] {
  const triangle: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    const row: number[] = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle;
}
```

## Time Complexity

O(numRows²) — the total number of values across all rows grows
quadratically (row `i` has `i + 1` entries).

## Space Complexity

O(numRows²) — the full triangle is retained in the output; this cannot
be reduced below the size of the output itself.

## Common Mistakes

- Off-by-one errors in the interior loop bounds (`j < i` vs `j <= i`) —
  since the row already has `i + 1` slots pre-filled with `1`, the
  interior loop must stop *before* the last index to avoid overwriting
  the trailing `1` with an out-of-bounds lookup.
- Trying to compute each value with a binomial-coefficient formula
  (`C(i, j)`) independently instead of reusing the previous row — works
  mathematically, but is more error-prone with factorials/overflow and
  loses the elegant O(1)-per-cell reuse this approach gives for free.
- Forgetting `numRows = 0` should return `[]`, not `[[1]]` — the loop
  condition `i < numRows` already handles this correctly if written as
  shown, but it's an easy case to get wrong with an off-by-one loop
  bound.

## Interview Follow-up Questions

1. How would you compute just a single row of Pascal's triangle (say,
   row 20) without generating every row before it?
2. How does each row of Pascal's triangle relate to the binomial
   coefficients `C(n, k)`?
3. How would you generate the triangle using O(numRows) space instead of
   O(numRows²), if only the *last* row needed to be returned?

## Similar Questions

- Matrix Transposition (see [pf026-matrix-transposition.md](pf026-matrix-transposition.md))
- Calculate Power Pow(x, n) (see [pf030-calculate-power-x-n.md](pf030-calculate-power-x-n.md))

---
[← Back to Programming Fundamentals](README.md)
