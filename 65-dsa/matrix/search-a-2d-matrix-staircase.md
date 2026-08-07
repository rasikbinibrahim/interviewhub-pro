# Q6590 · Search a 2D Matrix II (Staircase Search Top-Right Corner)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, binary-search, staircase-search, divide-and-conquer  

## Problem Statement

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

- Integers in each row are sorted in ascending order from left to right.
- Integers in each column are sorted in ascending order from top to bottom.

## Input

- `matrix`: `number[][]` — 2D sorted grid
- `target`: `number` — search target value

## Output

- `boolean` — `true` if `target` exists in grid, `false` otherwise

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `-10^9 <= matrix[i][j], target <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5` | `true` | Target 5 exists at `(1, 1)` |
| `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20` | `false` | Target 20 does not exist |

## Edge Cases

- `target` smaller than `matrix[0][0]` or larger than `matrix[m-1][n-1]` -> returns `false` immediately

## Hints

1. **Staircase Search from Top-Right Corner**:
   - Start pointer at **Top-Right Corner** `(row = 0, col = n - 1)`.
   - At cell `(r, c)`:
     - If `matrix[r][c] === target`: Return `true`!
     - If `matrix[r][c] > target`: Target MUST be in a smaller column. Move **Left** (`c--`).
     - If `matrix[r][c] < target`: Target MUST be in a larger row. Move **Down** (`r++`).
2. Alternatively, start at **Bottom-Left Corner** `(row = m - 1, col = 0)`.

## Algorithm

**Pattern:** Top-Right Corner Staircase Decision Reduction  
**Core Insight:** The top-right corner acts as a Binary Search Decision Node: values to the left are strictly smaller, while values below are strictly larger.

## Dry Run

`matrix = [[1, 4, 7], [2, 5, 8], [3, 6, 9]], target = 5`:
- Start `(0, 2) = 7`: `7 > 5` -> Move Left (`col = 1`).
- At `(0, 1) = 4`: `4 < 5` -> Move Down (`row = 1`).
- At `(1, 1) = 5`: `5 === 5` -> Match found! Return `true`.

## JavaScript Solution

```js
function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  let r = 0;
  let c = n - 1; // Start at Top-Right Corner

  while (r < m && c >= 0) {
    const val = matrix[r][c];

    if (val === target) {
      return true;
    } else if (val > target) {
      c--; // Move Left
    } else {
      r++; // Move Down
    }
  }

  return false;
}
```

## TypeScript Solution

```ts
function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix || matrix.length === 0) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  let r = 0;
  let c = n - 1;

  while (r < m && c >= 0) {
    const val = matrix[r][c];

    if (val === target) {
      return true;
    } else if (val > target) {
      c--;
    } else {
      r++;
    }
  }

  return false;
}
```

## Time Complexity

`O(M + N)` — maximum $M + N$ steps across matrix boundaries.

## Space Complexity

`O(1)` — constant extra space.

## Common Mistakes

- Starting at `(0, 0)` Top-Left corner, where moving both right and down increases values, eliminating directional decision logic.

## Follow-Up Questions

1. How does Search a 2D Matrix I differ when the entire matrix is flattened as a single sorted array?

## Similar Questions

- Search a 2D Matrix I
- Kth Smallest Element in a Sorted Matrix
