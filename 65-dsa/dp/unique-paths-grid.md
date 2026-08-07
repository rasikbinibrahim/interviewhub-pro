# Q6566 · Unique Paths (2D Grid Combinatorics & Dynamic Programming)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2d-dp, combinatorics, grid  

## Problem Statement

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (`grid[0][0]`). The robot tries to move to the **bottom-right corner** (`grid[m - 1][n - 1]`). The robot can only move either **down** or **right** at any point in time.

Given the two integers `m` and `n`, return the number of **possible unique paths** that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to `2 * 10^9`.

## Input

- `m`: `number` — number of rows
- `n`: `number` — number of columns

## Output

- `number` — total unique paths count

## Constraints

- `1 <= m, n <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `m = 3, n = 7` | `28` | Total unique grid paths |
| `m = 3, n = 2` | `3` | Right -> Down -> Down, Down -> Down -> Right, Down -> Right -> Down |

## Edge Cases

- `m = 1` or `n = 1` -> returns `1` (only 1 straight path possible)

## Hints

1. **2D DP Grid Recurrence**:
   - `dp[r][c]` = number of unique paths to reach cell `(r, c)`.
   - `dp[r][c] = dp[r - 1][c] + dp[r][c - 1]` (sum of paths from top cell and left cell).
2. Base cases: `dp[r][0] = 1` and `dp[0][c] = 1` (top row and left col have only 1 unique path).
3. Space optimization: Maintain single 1D array `dp` of size `n` initialized to `1`.

## Algorithm

**Pattern:** 1D Rolling Array DP / Combinatorics  
**Core Insight:** Since `dp[r][c]` depends only on `dp[r-1][c]` and `dp[r][c-1]`, updating a 1D array of length $N$ in-place reduces space complexity to $O(N)$.

## Dry Run

`m = 3, n = 3`:
- `dp = [1, 1, 1]`.
- Row 1:
  - `c = 1`: `dp[1] = dp[1] + dp[0] = 1 + 1 = 2`.
  - `c = 2`: `dp[2] = dp[2] + dp[1] = 1 + 2 = 3`. `dp = [1, 2, 3]`.
- Row 2:
  - `c = 1`: `dp[1] = 2 + 1 = 3`.
  - `c = 2`: `dp[2] = 3 + 3 = 6`. `dp = [1, 3, 6]`.
- Return `6`.

## JavaScript Solution

```js
function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[c] = dp[c] + dp[c - 1];
    }
  }

  return dp[n - 1];
}
```

## TypeScript Solution

```ts
function uniquePaths(m: number, n: number): number {
  const dp: number[] = new Array(n).fill(1);

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[c] = dp[c] + dp[c - 1];
    }
  }

  return dp[n - 1];
}
```

## Time Complexity

`O(M * N)` — filling $M \times N$ cell transitions.

## Space Complexity

`O(N)` — optimized 1D DP array.

## Common Mistakes

- Un-memoized recursion `uniquePaths(m-1, n) + uniquePaths(m, n-1)`, taking exponential $O(2^{M+N})$ time.

## Follow-Up Questions

1. How would you solve Unique Paths II, where obstacles are placed inside grid cells?

## Similar Questions

- Unique Paths II
- Minimum Path Sum
