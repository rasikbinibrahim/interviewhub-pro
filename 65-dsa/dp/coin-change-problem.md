# Q6502 · Coin Change (Minimum Coins)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, unbounded-knapsack, bottom-up-dp, optimization  

## Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

## Input

- `coins`: `number[]` — array of distinct positive integers representing coin denominations
- `amount`: `number` — non-negative integer target amount

## Output

- `number` — minimum number of coins needed, or `-1` if impossible.

## Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `coins = [1,2,5], amount = 11` | `3` | `11 = 5 + 5 + 1` (3 coins) |
| `coins = [2], amount = 3` | `-1` | Cannot form amount 3 with denomination 2 |
| `coins = [1], amount = 0` | `0` | 0 coins needed for 0 amount |

## Edge Cases

- `amount = 0` -> returns `0`
- No combination can form `amount` -> returns `-1`
- `coins` contains denomination larger than `amount`

## Hints

1. Define `dp[i]` as the minimum number of coins needed to make amount `i`.
2. Base case: `dp[0] = 0`, all other `dp[i] = Infinity`.
3. State transition: `dp[i] = min(dp[i], dp[i - coin] + 1)` for every `coin` where `coin <= i`.

## Algorithm

**Pattern:** Unbounded Knapsack / Bottom-Up Dynamic Programming  
**Core Insight:** Build `dp` array of size `amount + 1` initialized to `Infinity`. Set `dp[0] = 0`. For each target sub-amount `i` from 1 to `amount`, iterate through each coin denomination `c`. If `c <= i`, update `dp[i] = Math.min(dp[i], dp[i - c] + 1)`.

## Dry Run

`coins = [1, 2, 5]`, `amount = 5`:
- `dp = [0, ∞, ∞, ∞, ∞, ∞]`
- `i = 1`: `coin=1` -> `dp[1] = min(∞, dp[0] + 1) = 1`
- `i = 2`: `coin=1` -> `dp[2] = min(∞, dp[1] + 1) = 2`; `coin=2` -> `dp[2] = min(2, dp[0] + 1) = 1`
- `i = 3`: `coin=1` -> `dp[3] = 2`; `coin=2` -> `dp[3] = min(2, dp[1] + 1) = 2`
- `i = 4`: `coin=1` -> `dp[4] = 3`; `coin=2` -> `dp[4] = min(3, dp[2] + 1) = 2`
- `i = 5`: `coin=1` -> `dp[5] = 3`; `coin=2` -> `dp[5] = 3`; `coin=5` -> `dp[5] = min(3, dp[0] + 1) = 1`
- Result: `dp[5] = 1`.

## JavaScript Solution

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
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
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Time Complexity

`O(N * A)` — where `N` is the number of coins and `A` is the target amount.

## Space Complexity

`O(A)` — space required for the 1D DP table of size `amount + 1`.

## Common Mistakes

- Initializing DP array with `0` instead of `Infinity`, corrupting `Math.min` evaluations.
- Greedily picking largest coins, which fails for cases like `coins = [1, 3, 4, 5], amount = 7` (Greedy picks `5+1+1` = 3 coins, DP finds `4+3` = 2 coins).

## Follow-Up Questions

1. How would you return the actual coin combinations used rather than just the minimum count?
2. How would you solve Coin Change II (number of total combinations to make the amount)?

## Similar Questions

- Coin Change II
- Combination Sum
