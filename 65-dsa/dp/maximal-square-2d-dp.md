# Q6593 · Maximal Square (2D Matrix Sub-Grid DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2d-dp, matrix, geometry  

## Problem Statement

Given an `m x n` binary `matrix` filled with `0`s and `1`s, find the **largest square containing only `1`s** and return its **area**.

## Input

- `matrix`: `string[][]` — 2D matrix of `'0'` and `'1'` characters

## Output

- `number` — area integer of largest square of `'1'`s ($side^2$)

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` is `'0'` or `'1'`.

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]` | `4` | 2x2 maximal square of 1s (area $2^2 = 4$) |
| `matrix = [["0","1"],["1","0"]]` | `1` | 1x1 maximal square of 1s (area 1) |

## Edge Cases

- Matrix filled with `'0'`s -> returns `0`

## Hints

1. **2D DP State Definition**:
   - `dp[r][c]` = side length of the largest square whose **bottom-right corner** is at cell `(r, c)`.
2. Transition for `r, c > 0` when `matrix[r][c] === '1'`:
   - `dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1])`
   - (Square side is bottlenecked by the minimum of top, left, and top-left diagonal squares).
3. Maintain `maxSide = Math.max(maxSide, dp[r][c])`.
4. Return `maxSide * maxSide`.

## Algorithm

**Pattern:** 3-Neighbor Bottleneck Min-Side DP  
**Core Insight:** A cell $(r, c)$ can extend a square of size $K + 1$ if and only if its Top, Left, and Top-Left diagonal neighbors all support squares of size $\ge K$.

## Dry Run

`matrix = [["1","1"],["1","1"]]`:
- `(0,0)=1`: `dp[0][0] = 1`.
- `(0,1)=1`: `dp[0][1] = 1`.
- `(1,0)=1`: `dp[1][0] = 1`.
- `(1,1)=1`: `dp[1][1] = 1 + min(dp[0][1], dp[1][0], dp[0][0]) = 1 + min(1, 1, 1) = 2`.
- `maxSide = 2`. Return `2 * 2 = 4`.

## JavaScript Solution

```js
function maximalSquare(matrix) {
  if (!matrix || matrix.length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  let maxSide = 0;

  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (matrix[r - 1][c - 1] === '1') {
        dp[r][c] = 1 + Math.min(
          dp[r - 1][c],     // Top
          dp[r][c - 1],     // Left
          dp[r - 1][c - 1]  // Top-Left Diagonal
        );
        maxSide = Math.max(maxSide, dp[r][c]);
      }
    }
  }

  return maxSide * maxSide;
}
```

## TypeScript Solution

```ts
function maximalSquare(matrix: string[][]): number {
  if (!matrix || matrix.length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  let maxSide = 0;

  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (matrix[r - 1][c - 1] === '1') {
        dp[r][c] = 1 + Math.min(
          dp[r - 1][c],
          dp[r][c - 1],
          dp[r - 1][c - 1]
        );
        maxSide = Math.max(maxSide, dp[r][c]);
      }
    }
  }

  return maxSide * maxSide;
}
```

## Time Complexity

`O(M * N)` — single pass filling $M \times N$ matrix.

## Space Complexity

`O(M * N)` — 2D DP matrix space (can be optimized to $O(N)$ using 1D rolling array).

## Common Mistakes

- Returning `maxSide` instead of area `maxSide * maxSide`.

## Follow-Up Questions

1. How does Maximal Rectangle differ when finding the largest *rectangular* area of 1s in a binary matrix?

## Similar Questions

- Maximal Rectangle
- Count Square Submatrices with All Ones
