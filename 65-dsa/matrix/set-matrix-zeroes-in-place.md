# Q6558 · Set Matrix Zeroes (In-Place O(1) Space)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, in-place, space-optimization, array-2d  

## Problem Statement

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`s.

You must do it **in-place** with `O(1)` constant extra space.

## Input

- `matrix`: `number[][]` — 2D grid of numbers

## Output

- Modifies `matrix` in-place (void return)

## Constraints

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,1,1],[1,0,1],[1,1,1]]` | `[[1,0,1],[0,0,0],[1,0,1]]` | Row 1 and Col 1 set to zero |
| `matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]` | `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]` | Row 0, Row 2, Col 0, Col 3 zeroed |

## Edge Cases

- `1x1` matrix `[[0]]` -> `[[0]]`
- First row or first column contains zero -> tracked using boolean flags `firstRowHasZero`, `firstColHasZero`.

## Hints

1. **Use First Row & Column as Storage**:
   - Instead of allocating auxiliary `row[m]` and `col[n]` arrays, use `matrix[0][j]` and `matrix[i][0]` as zero markers!
2. Step 1: Use boolean variables `firstRowHasZero` and `firstColHasZero` to record if row 0 or col 0 contain zeros.
3. Step 2: Iterate rest of grid `1...m`, `1...n`. If `matrix[i][j] === 0`, set `matrix[i][0] = 0` and `matrix[0][j] = 0`.
4. Step 3: Iterate `1...m`, `1...n`. If `matrix[i][0] === 0` or `matrix[0][j] === 0`, set `matrix[i][j] = 0`.
5. Step 4: If `firstRowHasZero`, zero out row 0. If `firstColHasZero`, zero out col 0.

## Algorithm

**Pattern:** In-Place First Row & Column Sentinel Marker Storage  
**Core Insight:** Reusing row 0 and column 0 of the matrix itself to store zero status indicators reduces auxiliary space from $O(M + N)$ to $O(1)$.

## Dry Run

`matrix = [[1,1,1],[1,0,1],[1,1,1]]`:
- `firstRowHasZero = false`, `firstColHasZero = false`.
- At `(1, 1) = 0`: set `matrix[1][0] = 0` and `matrix[0][1] = 0`.
- Matrix markers updated: `[[1, 0, 1], [0, 0, 1], [1, 1, 1]]`.
- Zero out cells based on markers -> `[[1,0,1],[0,0,0],[1,0,1]]`.

## JavaScript Solution

```js
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Check if first row has zero
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Check if first col has zero
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Use first row and col as markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Zero out cells based on markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Zero out first row if needed
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) matrix[0][j] = 0;
  }

  // Zero out first col if needed
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) matrix[i][0] = 0;
  }
}
```

## TypeScript Solution

```ts
function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) matrix[0][j] = 0;
  }

  if (firstColHasZero) {
    for (let i = 0; i < m; i++) matrix[i][0] = 0;
  }
}
```

## Time Complexity

`O(M * N)` — constant number of grid traversals.

## Space Complexity

`O(1)` — in-place memory usage.

## Common Mistakes

- Modifying grid cells immediately upon discovering a zero during the first pass, causing downstream cells to turn zero and wrongly propagating zeroes across the entire grid.

## Follow-Up Questions

1. How would you handle a sparse matrix where zeroes are very rare?

## Similar Questions

- Game of Life
- Spiral Matrix
