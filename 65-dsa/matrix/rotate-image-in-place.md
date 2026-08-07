# Q6573 · Rotate Image / Matrix (Transpose & Reverse In-Place)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, in-place, transpose, linear-algebra  

## Problem Statement

You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90 degrees (clockwise)**.

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

## Input

- `matrix`: `number[][]` — 2D square $N \times N$ matrix

## Output

- Modifies `matrix` in-place (void return)

## Constraints

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,2,3],[4,5,6],[7,8,9]]` | `[[7,4,1],[8,5,2],[9,6,3]]` | Rotated 90 degrees clockwise |
| `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]` | `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]` | 4x4 matrix 90 degree rotation |

## Edge Cases

- `1x1` matrix `[[1]]` -> `[[1]]`

## Hints

1. **2-Step Linear Algebra Transformation**:
   - **Step 1 (Transpose)**: Swap `matrix[i][j]` with `matrix[j][i]` across the main diagonal.
   - **Step 2 (Reverse Rows)**: Reverse each row of the matrix horizontally (`row.reverse()`).
2. Transpose + Horizontal Reverse = **90 Degree Clockwise Rotation!**
3. Transpose + Vertical Reverse = **90 Degree Counter-Clockwise Rotation!**

## Algorithm

**Pattern:** Transpose & Reflection Matrix Manipulation  
**Core Insight:** Combining main-diagonal transposition with horizontal row reflection rotates any square matrix 90 degrees clockwise in $O(N^2)$ time with zero extra space.

## Dry Run

`matrix = [[1,2,3],[4,5,6],[7,8,9]]`:
- Step 1 (Transpose):
  - Swap (0,1)&(1,0): `[[1,4,3],[2,5,6],[7,8,9]]`
  - Swap (0,2)&(2,0): `[[1,4,7],[2,5,6],[3,8,9]]`
  - Swap (1,2)&(2,1): `[[1,4,7],[2,5,8],[3,6,9]]`
- Step 2 (Reverse Rows):
  - Row 0: `[7, 4, 1]`
  - Row 1: `[8, 5, 2]`
  - Row 2: `[9, 6, 3]`
- Result: `[[7,4,1],[8,5,2],[9,6,3]]`.

## JavaScript Solution

```js
function rotate(matrix) {
  const n = matrix.length;

  // Step 1: Transpose matrix in-place
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // Step 2: Reverse each row horizontally
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
```

## TypeScript Solution

```ts
function rotate(matrix: number[][]): void {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
```

## Time Complexity

`O(N^2)` — visits each cell of the $N \times N$ matrix twice.

## Space Complexity

`O(1)` — in-place memory modifications.

## Common Mistakes

- Running inner loop `for (let j = 0; j < n; j++)` during transpose, which swaps elements twice and restores the original matrix! (Inner loop MUST start at `j = i + 1`).

## Follow-Up Questions

1. How would you rotate a 2D matrix 90 degrees Counter-Clockwise in-place? (Transpose, then reverse vertically top-to-bottom).

## Similar Questions

- Spiral Matrix
- Set Matrix Zeroes
