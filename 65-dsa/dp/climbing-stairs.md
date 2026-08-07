# Q6522 · Climbing Stairs (Dynamic Programming)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, fibonacci, memoization, space-optimization  

## Problem Statement

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

## Input

- `n`: `number` — total number of steps to reach top

## Output

- `number` — total number of distinct ways

## Constraints

- `1 <= n <= 45`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 2` | `2` | 1. 1 step + 1 step; 2. 2 steps |
| `n = 3` | `3` | 1. 1+1+1; 2. 1+2; 3. 2+1 |
| `n = 4` | `5` | Follows Fibonacci sequence |

## Edge Cases

- `n = 1` -> returns `1`
- `n = 2` -> returns `2`

## Hints

1. **State Relation**: To reach step `i`, you could have stepped from `i - 1` (climbing 1 step) or `i - 2` (climbing 2 steps).
2. Recurrence Relation: `dp[i] = dp[i - 1] + dp[i - 2]`.
3. Base Cases: `dp[1] = 1`, `dp[2] = 2`.
4. Space Optimization: Since `dp[i]` only depends on the previous 2 values, keep two variables (`prev2`, `prev1`) to reduce space to `O(1)`.

## Algorithm

**Pattern:** Bottom-Up Dynamic Programming (Fibonacci Transition)  
**Core Insight:** The number of ways to reach step `N` is the sum of ways to reach step `N - 1` and step `N - 2`.

## Dry Run

`n = 4`:
- `prev2 = 1` (n=1), `prev1 = 2` (n=2).
- `i = 3`: `current = 1 + 2 = 3`; `prev2 = 2`, `prev1 = 3`.
- `i = 4`: `current = 2 + 3 = 5`; `prev2 = 3`, `prev1 = 5`.
- Result: `5`.

## JavaScript Solution

```js
function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

## TypeScript Solution

```ts
function climbStairs(n: number): number {
  if (n <= 2) {
    return n;
  }

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

## Time Complexity

`O(N)` — single loop iterating from 3 to `N`.

## Space Complexity

`O(1)` — constant space using two tracking variables.

## Common Mistakes

- Using un-memoized plain recursion `climbStairs(n - 1) + climbStairs(n - 2)`, causing exponential $O(2^N)$ time complexity resulting in TLE.

## Follow-Up Questions

1. How would you solve this if you could climb $1, 2, \dots, K$ steps at a time? (General K-step DP / Sliding Window Sum).

## Similar Questions

- Min Cost Climbing Stairs
- Fibonacci Number
