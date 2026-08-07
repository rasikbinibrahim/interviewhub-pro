# Q6563 · Spiral Matrix Traversal (Boundary Shrinking Matrix)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** matrix, spiral-traversal, simulation, boundary-shrink  

## Problem Statement

Given an `m x n` `matrix`, return all elements of the `matrix` in **spiral order**.

## Input

- `matrix`: `number[][]` — 2D matrix of numbers

## Output

- `number[]` — 1D array of elements in clockwise spiral order

## Constraints

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,2,3],[4,5,6],[7,8,9]]` | `[1,2,3,6,9,8,7,4,5]` | Clockwise outer-to-inner spiral |
| `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]` | `[1,2,3,4,8,12,11,10,9,5,6,7]` | 3x4 rectangular grid spiral |

## Edge Cases

- Single row matrix `[[1, 2, 3]]` -> `[1, 2, 3]`
- Single column matrix `[[1], [2], [3]]` -> `[1, 2, 3]`

## Hints

1. Maintain 4 boundary pointers: `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`.
2. While `top <= bottom && left <= right`:
   - Traverse **Top row** from `left` to `right`. Increment `top++`.
   - Traverse **Right column** from `top` to `bottom`. Decrement `right--`.
   - If `top <= bottom`: Traverse **Bottom row** from `right` to `left`. Decrement `bottom--`.
   - If `left <= right`: Traverse **Left column** from `bottom` to `top`. Increment `left++`.

## Algorithm

**Pattern:** 4-Pointer Boundary Shrinking Simulation  
**Core Insight:** Shrinking four boundary pointers (`top`, `bottom`, `left`, `right`) inwards after completing each wall traversal ensures exact 1D spiral ordering in $O(M \times N)$ time.

## Dry Run

`matrix = [[1,2,3],[4,5,6],[7,8,9]]`:
- `top=0, bottom=2, left=0, right=2`.
- Top row: `1, 2, 3`. `top = 1`.
- Right col: `6, 9`. `right = 1`.
- Bottom row: `8, 7`. `bottom = 1`.
- Left col: `4`. `left = 1`.
- Center element: `5`.
- Return `[1,2,3,6,9,8,7,4,5]`.

## JavaScript Solution

```js
function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse Top Row
    for (let c = left; c <= right; c++) {
      result.push(matrix[top][c]);
    }
    top++;

    // Traverse Right Column
    for (let r = top; r <= bottom; r++) {
      result.push(matrix[r][right]);
    }
    right--;

    // Traverse Bottom Row (if valid)
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        result.push(matrix[bottom][c]);
      }
      bottom--;
    }

    // Traverse Left Column (if valid)
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        result.push(matrix[r][left]);
      }
      left++;
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function spiralOrder(matrix: number[][]): number[] {
  if (!matrix || matrix.length === 0) return [];

  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) {
      result.push(matrix[top][c]);
    }
    top++;

    for (let r = top; r <= bottom; r++) {
      result.push(matrix[r][right]);
    }
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        result.push(matrix[bottom][c]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        result.push(matrix[r][left]);
      }
      left++;
    }
  }

  return result;
}
```

## Time Complexity

`O(M * N)` — visits every matrix cell exactly once.

## Space Complexity

`O(1)` — auxiliary space (excluding output array).

## Common Mistakes

- Forgetting checks `if (top <= bottom)` and `if (left <= right)` before running bottom/left traversal loops, causing duplicate duplicate element processing in single-row/single-col grids.

## Follow-Up Questions

1. How would you solve Spiral Matrix II (generating an $N \times N$ spiral matrix filled with numbers 1 to $N^2$)?

## Similar Questions

- Spiral Matrix II
- Rotate Image
