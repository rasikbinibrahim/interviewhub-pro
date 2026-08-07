# Q6501 · Search in a 2D Matrix

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Searching  
**Concepts:** binary-search, 2d-matrix, searching, arrays  

## Problem Statement

Write an efficient algorithm that searches for a `target` value in an `m x n` integer matrix `matrix`. This matrix has the following properties:
1. Integers in each row are sorted from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

Return `true` if `target` is in `matrix` or `false` otherwise.

## Input

- `matrix`: `number[][]` — an `m x n` 2D array of integers
- `target`: `number` — the integer to locate

## Output

- `boolean` — `true` if target exists in matrix, `false` otherwise.

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3` | `true` | `3` is located at `matrix[0][1]` |
| `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13` | `false` | `13` is not present in matrix |

## Edge Cases

- Single element matrix `[[5]]`
- Matrix with `m = 1` or `n = 1`
- `target` smaller than `matrix[0][0]` or larger than `matrix[m-1][n-1]`

## Hints

1. Since the last element of row `i` is smaller than the first element of row `i+1`, the 2D matrix can be treated as a single sorted 1D array of length `m * n`.
2. Convert virtual 1D index `mid` to 2D indices: `row = Math.floor(mid / n)` and `col = mid % n`.
3. Apply standard binary search on index range `[0, m * n - 1]`.

## Algorithm

**Pattern:** Virtual 1D Binary Search on 2D Matrix  
**Core Insight:** Treat the matrix as a flattened array of size `total = m * n`. Map index `mid` to `matrix[Math.floor(mid / n)][mid % n]`. Perform standard binary search in `O(log(m * n))` time complexity.

## Dry Run

Given `matrix` of size 3x4 (m=3, n=4), total = 12. Search `target = 3`:
- Initial: `left = 0`, `right = 11`.
- Step 1: `mid = 5`. Row = `Math.floor(5/4) = 1`, Col = `5%4 = 1`. `matrix[1][1] = 11`. Since `11 > 3`, set `right = mid - 1 = 4`.
- Step 2: `left = 0`, `right = 4`. `mid = 2`. Row = `Math.floor(2/4) = 0`, Col = `2%4 = 2`. `matrix[0][2] = 5`. Since `5 > 3`, set `right = mid - 1 = 1`.
- Step 3: `left = 0`, `right = 1`. `mid = 0`. Row = `0`, Col = `0`. `matrix[0][0] = 1`. Since `1 < 3`, set `left = mid + 1 = 1`.
- Step 4: `left = 1`, `right = 1`. `mid = 1`. Row = `0`, Col = `1`. `matrix[0][1] = 3`. Match found! Return `true`.

## JavaScript Solution

```js
function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) {
      return true;
    } else if (val < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}
```

## TypeScript Solution

```ts
function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) {
      return true;
    } else if (val < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}
```

## Time Complexity

`O(log(m * n))` — logarithmic binary search over `m * n` virtual elements.

## Space Complexity

`O(1)` — constant space overhead.

## Common Mistakes

- Using `Math.floor(mid / m)` instead of `Math.floor(mid / n)` when mapping 1D index to 2D row coordinate.
- Iterating row by row (`O(m log n)`), missing the optimal virtual 1D binary search.

## Follow-Up Questions

1. How would you solve Search in a 2D Matrix II where rows are sorted left-to-right and columns top-to-bottom, but row `i+1` does not necessarily start after row `i` ends? (Staircase search from top-right corner in `O(m + n)`).

## Similar Questions

- Search in a 2D Matrix II
- First Bad Version
