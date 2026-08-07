# Q6635 · Spiral Matrix II (Generate Grid Layer Traversal)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Matrix
**Concepts:** matrix, spiral-traversal, simulation

## Problem Statement

Write a function `generateMatrix(n)` that returns an `n x n` matrix
filled with the values `1` to `n²`, arranged in spiral order starting
from the top-left corner and moving clockwise.

## Input

`n`: a positive integer, the matrix's dimension.

## Output

An `n x n` matrix containing `1` through `n²`, arranged in a clockwise
spiral.

## Constraints

`1 <= n <= 20`

## Examples

| Input | Output | Why |
|---|---|---|
| `3` | `[[1,2,3],[8,9,4],[7,6,5]]` | Values 1-9 spiral clockwise from the top-left |
| `1` | `[[1]]` | A single cell, trivially the whole spiral |
| `2` | `[[1,2],[4,3]]` | Values 1-4 spiral around the 2×2 grid |

## Edge Cases

- `n = 1` → a single-cell matrix `[[1]]`
- `n = 2` → the smallest case where all four traversal directions
  (right, down, left, up) actually execute
- Odd `n` → the spiral converges on a single center cell
- Even `n` → the spiral converges on the final inward layer without a
  true single center cell

## Hints

1. Filling the matrix in spiral order means repeatedly tracing out the
   current "ring" — across the top, down the right side, across the
   bottom (reversed), and up the left side — then shrinking the
   boundaries and repeating for the next ring inward.
2. Track four boundaries — `top`, `bottom`, `left`, `right` — that
   define the current unfilled ring. After filling each of the four
   sides, shrink the corresponding boundary inward.
3. After filling the top row and right column, check whether `top` is
   still `<= bottom` (and similarly `left <= right`) before filling the
   bottom row and left column — without these checks, a ring that's only
   one row or column thick would get some of its cells overwritten by
   filling the "same" row or column twice from opposite directions.

## Algorithm

**Pattern:** layer-by-layer spiral simulation with shrinking boundaries.
**Core insight:** a spiral fills the matrix one "ring" at a time, from
the outside in — each ring is fully traced by moving across its top,
down its right side, across its bottom (right to left), and up its left
side, after which the boundaries shrink inward by one and the next ring
begins. The guard checks before filling the bottom row and left column
(`top <= bottom`, `left <= right`) exist specifically to handle rings
that have collapsed to a single row or column, where filling all four
sides unconditionally would double-write (and corrupt) cells already
filled by the top-row or right-column pass.
**Invariant:** at the start of each iteration of the outer loop, every
cell strictly outside the current `[top, bottom] × [left, right]`
boundary box has already been correctly filled with its spiral position
value, and `val` holds the next value to place.

## Dry Run

**Input:** `n = 3`

| Ring pass | Boundaries before | Cells filled (value) | Boundaries after |
|---|---|---|---|
| top row | top=0,bottom=2,left=0,right=2 | `(0,0)=1, (0,1)=2, (0,2)=3` | top=1 |
| right col | top=1,bottom=2,right=2 | `(1,2)=4, (2,2)=5` | right=1 |
| bottom row (top<=bottom: 1<=2 ✓) | bottom=2,left=0,right=1 | `(2,1)=6, (2,0)=7` | bottom=1 |
| left col (left<=right: 0<=1 ✓) | top=1,bottom=1,left=0 | `(1,0)=8` | left=1 |
| *(next outer-loop check: top=1<=bottom=1 and left=1<=right=1 → continue)* | | | |
| top row | top=1,bottom=1,left=1,right=1 | `(1,1)=9` | top=2 |
| right col | top=2,bottom=1 | (loop doesn't run, top>bottom) | right=0 |
| *(top<=bottom: 2<=1 false → skip bottom row and left col)* | | | |
| *(outer-loop check: top=2<=bottom=1 false → exit)* | | | |

**Result:** `[[1,2,3],[8,9,4],[7,6,5]]` — matches expected output.

## JavaScript Solution

```js
function generateMatrix(n) {
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1;
  let val = 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) matrix[top][c] = val++;
    top++;
    for (let r = top; r <= bottom; r++) matrix[r][right] = val++;
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) matrix[bottom][c] = val++;
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) matrix[r][left] = val++;
      left++;
    }
  }

  return matrix;
}
```

## TypeScript Solution

```ts
function generateMatrix(n: number): number[][] {
  const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let val = 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) matrix[top][c] = val++;
    top++;
    for (let r = top; r <= bottom; r++) matrix[r][right] = val++;
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) matrix[bottom][c] = val++;
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) matrix[r][left] = val++;
      left++;
    }
  }

  return matrix;
}
```

## Time Complexity

O(n²) — every one of the `n²` cells is filled exactly once.

## Space Complexity

O(n²) for the output matrix (excluded from "extra" space analysis since
it's the required result); O(1) auxiliary space beyond it.

## Common Mistakes

- Omitting the `top <= bottom` / `left <= right` guards before filling
  the bottom row and left column — for a ring that's collapsed to a
  single row or column, this causes cells already filled by the top-row
  or right-column pass to be overwritten a second time with wrong
  values.
- Off-by-one errors in the boundary increment/decrement order — the
  boundaries must shrink *after* each side is filled, using the values
  that were current *during* that side's fill, not values already
  shrunk for a later side.
- Confusing this with "Spiral Matrix I" (reading an existing matrix in
  spiral order) — this problem *generates* a new matrix by writing
  values in spiral order, the reverse direction of data flow.

## Interview Follow-up Questions

1. How would you solve "Spiral Matrix I" — reading an existing `m x n`
   matrix's elements in spiral order — using the same boundary-shrinking
   technique?
2. How would this generalize to a non-square `m x n` matrix instead of
   a fixed `n x n`?
3. How would you fill the spiral counter-clockwise instead of clockwise?

## Similar Questions

- Matrix Transposition (see [../../01-programming-fundamentals/pf026-matrix-transposition.md](../../01-programming-fundamentals/pf026-matrix-transposition.md))
- Rotate Image 90 Degrees Clockwise In-Place (see [../../01-programming-fundamentals/pf036-rotate-matrix-90-degrees.md](../../01-programming-fundamentals/pf036-rotate-matrix-90-degrees.md))
