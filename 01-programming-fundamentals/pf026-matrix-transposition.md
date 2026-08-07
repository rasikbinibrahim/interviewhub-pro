# PF026 · Matrix Transposition

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** matrix, 2d-array

## Problem Statement

Write a function `transpose(matrix)` that returns the transpose of an
`m x n` matrix — a new `n x m` matrix where row `i`, column `j` of the
input becomes row `j`, column `i` of the output.

## Input

`matrix`: a non-empty 2D array of numbers with `m` rows and `n` columns
(not necessarily square).

## Output

A new 2D array with `n` rows and `m` columns: the transposed matrix.

## Constraints

`1 <= m, n <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `[[1,2,3],[4,5,6]]` | `[[1,4],[2,5],[3,6]]` | 2×3 becomes 3×2; column 0 (`1,4`) becomes row 0 |
| `[[1,2],[3,4]]` | `[[1,3],[2,4]]` | A square matrix transposes in place conceptually |
| `[[5]]` | `[[5]]` | A 1×1 matrix is its own transpose |

## Edge Cases

- Square matrix (`m === n`) → still produces a genuinely new matrix
  (this solution never mutates the input, so it's safe even if the
  caller keeps using the original)
- Single row (`1 x n`) → transposes to a single column (`n x 1`)
- Single column (`m x 1`) → transposes to a single row (`1 x m`)
- Single cell (`1 x 1`) → the transpose is identical to the input

## Hints

1. The defining property of a transpose is simple: the value at
   `matrix[r][c]` in the input belongs at `[c][r]` in the output — the
   row and column indices swap.
2. Because the output has swapped dimensions (`n` rows, `m` columns), you
   need to allocate the result matrix with those swapped dimensions
   *before* filling it in, not try to grow it as you go.
3. A straightforward nested loop over every `(r, c)` pair in the input,
   writing each value to its swapped position, covers the entire matrix
   in one pass — no need for anything cleverer for a non-square matrix.

## Algorithm

**Pattern:** index-swapping traversal into a pre-allocated result.
**Core insight:** transposition is purely a relabeling of coordinates —
every value keeps its content, only its row/column position swaps. Since
input and output can have different shapes (`m×n` versus `n×m`) unless
the matrix happens to be square, the result must be allocated with the
swapped dimensions up front, then filled by visiting every cell of the
input exactly once and writing it to its mirrored position.
**Invariant:** after processing input cell `(r, c)`, `result[c][r]`
holds `matrix[r][c]`, and every cell processed so far is correctly
placed in the output.

## Dry Run

**Input:** `matrix = [[1,2,3],[4,5,6]]` (`m=2` rows, `n=3` columns)

| r | c | matrix[r][c] | write to result[c][r] |
|---|---|---|---|
| 0 | 0 | 1 | `result[0][0] = 1` |
| 0 | 1 | 2 | `result[1][0] = 2` |
| 0 | 2 | 3 | `result[2][0] = 3` |
| 1 | 0 | 4 | `result[0][1] = 4` |
| 1 | 1 | 5 | `result[1][1] = 5` |
| 1 | 2 | 6 | `result[2][1] = 6` |

**Result:** `[[1,4],[2,5],[3,6]]` — matches expected output.

## JavaScript Solution

```js
function transpose(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const result = Array.from({ length: n }, () => new Array(m));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      result[c][r] = matrix[r][c];
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function transpose(matrix: number[][]): number[][] {
  const m: number = matrix.length;
  const n: number = matrix[0].length;
  const result: number[][] = Array.from({ length: n }, () => new Array(m));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      result[c][r] = matrix[r][c];
    }
  }

  return result;
}
```

## Time Complexity

O(m × n) — every cell of the input is visited and written exactly once.

## Space Complexity

O(m × n) — a new result matrix of the same total size is allocated.

## Common Mistakes

- Allocating `result` with the *same* dimensions as `matrix` instead of
  swapped dimensions — works only for square matrices and throws or
  silently drops data for any rectangular (non-square) input.
- Trying to transpose "in place" by swapping `matrix[r][c]` and
  `matrix[c][r]` directly — this only makes sense for square matrices,
  and even then requires care to only swap each pair once (`c > r`) to
  avoid swapping every pair back to its original position.
- Reading `matrix[0].length` without first checking `matrix.length > 0`
  — throws on an empty matrix; this solution assumes a non-empty input
  per the stated constraints.

## Interview Follow-up Questions

1. How would you transpose a square matrix *in place*, without
   allocating a new matrix?
2. How does this relate to `Rotate Image 90 Degrees` — what single extra
   step turns a transpose into a 90-degree rotation?
3. How would you handle a "ragged" input where rows have different
   lengths?

## Similar Questions

- Rotate Image 90 Degrees Clockwise In-Place (see [pf036-rotate-matrix-90-degrees.md](pf036-rotate-matrix-90-degrees.md))
- Generate Pascal's Triangle (see [pf024-generate-pascal-triangle.md](pf024-generate-pascal-triangle.md))

---
[← Back to Programming Fundamentals](README.md)
