# PF036 · Rotate Image 90 Degrees Clockwise In-Place

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** matrix, in-place, transpose, reverse

## Problem Statement

Write a function `rotate(matrix)` that rotates an `n x n` matrix 90
degrees clockwise, in place, without allocating a second matrix. The
function does not return anything — the caller's `matrix` is mutated
directly.

## Input

`matrix`: a square (`n x n`) 2D array of numbers.

## Output

None (`undefined`) — the input `matrix` is mutated in place to hold the
rotated result.

## Constraints

`1 <= n <= 50`, matrix is always square

## Examples

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
rotate(matrix);
// matrix is now mutated in place to:
// [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3],
// ]
```

## Edge Cases

- `1 x 1` matrix → rotating has no visible effect (a single cell is its
  own rotation)
- `2 x 2` matrix → the smallest case where transposition and reversal
  both do meaningful work
- Already-rotated-looking input (e.g. a symmetric matrix) → still
  processed the same way; the algorithm doesn't special-case any input
  shape

## Hints

1. Allocating a new `n x n` matrix and copying rotated values into it is
   the obvious first approach, but this problem specifically asks for an
   *in-place* rotation — what two simpler operations, done in sequence,
   produce the same result without extra space?
2. A 90-degree clockwise rotation is exactly equivalent to first
   transposing the matrix (flipping it across its main diagonal), and
   then reversing each row.
3. Do the transpose first, swapping `matrix[i][j]` with `matrix[j][i]`
   only for `j > i` (to avoid swapping each pair back), then call
   `.reverse()` on every row.

## Algorithm

**Pattern:** transpose, then reverse each row.
**Core insight:** a clockwise 90-degree rotation can be decomposed into
two simpler, well-understood operations: transposing the matrix (which
reflects it across the main diagonal, turning columns into rows) and
then reversing each row (which mirrors it horizontally). Composing those
two operations produces exactly the same result as rotating directly,
but each individual step is easy to implement correctly and in place —
transposition only needs to swap each `(i, j)`/`(j, i)` pair once (for
`j > i`, to avoid swapping back), and row reversal is a built-in,
well-understood operation.
**Invariant:** after the transpose loop completes, `matrix` holds the
exact transpose of the original input; after the row-reversal loop
completes, `matrix` holds the original input rotated 90 degrees
clockwise.

## Dry Run

**Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`

**Step 1 — Transpose** (swap `matrix[i][j]` with `matrix[j][i]` for
`j > i`):

| Swap | Before | After |
|---|---|---|
| `(0,1) ↔ (1,0)`: `2 ↔ 4` | `[[1,2,3],[4,5,6],[7,8,9]]` | `[[1,4,3],[2,5,6],[7,8,9]]` |
| `(0,2) ↔ (2,0)`: `3 ↔ 7` | `[[1,4,3],[2,5,6],[7,8,9]]` | `[[1,4,7],[2,5,6],[3,8,9]]` |
| `(1,2) ↔ (2,1)`: `6 ↔ 8` | `[[1,4,7],[2,5,6],[3,8,9]]` | `[[1,4,7],[2,5,8],[3,6,9]]` |

Transposed: `[[1,4,7],[2,5,8],[3,6,9]]`

**Step 2 — Reverse each row:**

| Row | Before | After |
|---|---|---|
| 0 | `[1,4,7]` | `[7,4,1]` |
| 1 | `[2,5,8]` | `[8,5,2]` |
| 2 | `[3,6,9]` | `[9,6,3]` |

**Result:** `[[7,4,1],[8,5,2],[9,6,3]]` — matches the expected rotated
matrix.

## JavaScript Solution

```js
function rotate(matrix) {
  const n = matrix.length;

  // 1. Transpose matrix
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 2. Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
```

## TypeScript Solution

```ts
function rotate(matrix: number[][]): void {
  const n: number = matrix.length;

  // 1. Transpose matrix
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 2. Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
```

## Time Complexity

O(n²) — both the transpose and the row-reversal steps touch every
element of the matrix a constant number of times.

## Space Complexity

O(1) — the rotation happens entirely in place, using only a fixed number
of temporary variables for each swap.

## Common Mistakes

- Transposing with `j` starting from `0` instead of `i + 1` — swaps
  every pair twice (once each direction), which undoes the transpose
  entirely and leaves the matrix unchanged.
- Allocating a new matrix and copying rotated values into it — correct
  in result, but violates the in-place constraint this exercise is
  testing.
- Forgetting that `matrix[i].reverse()` mutates the row array in place —
  relying on it to return a *new* array (it returns the same, mutated
  array) can lead to confusion if the code is later refactored to expect
  a non-mutating call.

## Interview Follow-up Questions

1. How would you rotate the matrix 90 degrees *counter-clockwise*
   instead — what changes in the two-step decomposition?
2. How would you rotate a *non-square* (`m x n`) matrix, given that an
   in-place rotation isn't possible when the dimensions differ?
3. How would you verify your in-place rotation is correct without
   allocating a second matrix for comparison, if asked to write a test
   for it?

## Similar Questions

- Matrix Transposition (see [pf026-matrix-transposition.md](pf026-matrix-transposition.md))
- Generate Pascal's Triangle (see [pf024-generate-pascal-triangle.md](pf024-generate-pascal-triangle.md))

---
[← Back to Programming Fundamentals](README.md)
