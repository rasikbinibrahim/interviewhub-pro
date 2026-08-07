# Q6527 · Coin Change (Minimum Coins DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, unbounded-knapsack, memoization, array-dp  

## Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

## Input

- `coins`: `number[]` — coin denominations
- `amount`: `number` — target total amount

## Output

- `number` — minimum coin count, or `-1` if impossible

## Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `coins = [1,2,5], amount = 11` | `3` | `11 = 5 + 5 + 1` (3 coins) |
| `coins = [2], amount = 3` | `-1` | Cannot form amount 3 with coin denomination 2 |
| `coins = [1], amount = 0` | `0` | Amount 0 requires 0 coins |

## Edge Cases

- `amount === 0` -> returns `0`
- Target amount smaller than smallest coin denomination -> returns `-1`

## Hints

1. **State Definition**: Let `dp[i]` be the minimum number of coins required to make up amount `i`.
2. Initialize `dp` array of size `amount + 1` filled with `Infinity` (or `amount + 1`), and set `dp[0] = 0`.
3. Recurrence Relation: For each amount `i` from `1` to `amount`, iterate through each coin `c` in `coins`:
   - If `i - c >= 0`: `dp[i] = Math.min(dp[i], dp[i - c] + 1)`.
4. Result: If `dp[amount] === Infinity`, return `-1`; otherwise return `dp[amount]`.

## Algorithm

**Pattern:** Unbounded Knapsack Bottom-Up Array DP  
**Core Insight:** Computing `dp[i]` by trying every available coin `c` and transitioning from previously calculated `dp[i - c]` guarantees global optimal coin count.

## Dry Run

`coins = [1, 2, 5], amount = 11`:
- `dp = [0, inf, inf, ..., inf]`
- `i = 1`: `dp[1] = min(inf, dp[0] + 1) = 1`
- `i = 2`: `dp[2] = min(dp[1]+1, dp[0]+1) = 1` (coin 2)
- `i = 5`: `dp[5] = min(dp[4]+1, dp[3]+1, dp[0]+1) = 1` (coin 5)
- `i = 11`: `dp[11] = min(dp[10]+1, dp[9]+1, dp[6]+1) = dp[6] + 1 = 2 + 1 = 3`.
- Result: `3`.

## JavaScript Solution

```js
function coinChange(coins, amount) {
  if (amount === 0) return 0;

  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## TypeScript Solution

```ts
function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;

  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Time Complexity

`O(amount * N)` — where `N` is `coins.length`.

## Space Complexity

`O(amount)` — for 1D `dp` table array.

## Common Mistakes

- Using a greedy choice (always picking largest coin first), which fails for combinations like `coins = [1, 3, 4, 5], amount = 7` (Greedy gives `5 + 1 + 1` = 3 coins, DP gives `4 + 3` = 2 coins).

## Follow-Up Questions

1. How would you solve Coin Change II, which asks for the total number of distinct combinations that sum up to amount?

## Similar Questions

- Coin Change II
- Minimum Cost For Tickets
