# Q6551 · Coin Change (Unbounded Knapsack Minimum Coins)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, unbounded-knapsack, memoization, array-dp  

## Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

## Input

- `coins`: `number[]` — available coin denominations
- `amount`: `number` — target total amount

## Output

- `number` — minimum coin count required, or `-1` if impossible

## Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `coins = [1,2,5], amount = 11` | `3` | 11 = 5 + 5 + 1 (3 coins) |
| `coins = [2], amount = 3` | `-1` | Cannot form 3 using only 2s |
| `coins = [1], amount = 0` | `0` | 0 amount requires 0 coins |

## Edge Cases

- `amount === 0` -> returns `0`
- `coins` cannot sum to `amount` -> returns `-1`

## Hints

1. **1D DP Bottom-Up**: Let `dp[i]` be the minimum number of coins needed to make up amount `i`.
2. Initialize `dp` array of size `amount + 1` filled with `Infinity` (or `amount + 1`).
3. Base case: `dp[0] = 0`.
4. Outer loop `i` from `1` to `amount`:
   - Inner loop for each `coin` in `coins`:
     - If `i - coin >= 0`:
       - `dp[i] = Math.min(dp[i], 1 + dp[i - coin])`.
5. Return `dp[amount] === Infinity ? -1 : dp[amount]`.

## Algorithm

**Pattern:** Unbounded Knapsack Bottom-Up DP  
**Core Insight:** Reusing available coin choices infinitely allows state transition `dp[i] = min(dp[i], 1 + dp[i - coin])` in $O(\text{amount} \times N)$ time.

## Dry Run

`coins = [1, 2, 5], amount = 11`:
- `dp[0] = 0`, all others = `Infinity`.
- `i = 1`: `coin 1` -> `dp[1] = 1 + dp[0] = 1`.
- `i = 2`: `coin 1` -> `1 + dp[1] = 2`; `coin 2` -> `1 + dp[0] = 1` -> `dp[2] = 1`.
- ...
- `i = 11`: `coin 1` -> `1 + dp[10] = 3`; `coin 5` -> `1 + dp[6] = 3`. `dp[11] = 3`.
- Return `3`.

## JavaScript Solution

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## TypeScript Solution

```ts
function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Time Complexity

`O(amount * N)` — where $N$ is `coins.length`.

## Space Complexity

`O(amount)` — for 1D DP table.

## Common Mistakes

- Greedy coin selection (picking largest coin first), which fails for cases like `coins = [1, 3, 4, 5], amount = 7` (Greedy picks `5 + 1 + 1` = 3 coins, but optimal DP is `4 + 3` = 2 coins).

## Follow-Up Questions

1. How would you solve Coin Change II, which asks for total unique combination counts instead of minimum coin count?

## Similar Questions

- Coin Change II
- Combination Sum IV
