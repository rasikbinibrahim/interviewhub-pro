# Q6586 · Coin Change II (Unbounded Knapsack Combinations DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 01-knapsack, unbounded-knapsack, combinations  

## Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the **number of combinations** that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an **infinite number** of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

## Input

- `amount`: `number` — target total money amount
- `coins`: `number[]` — array of available coin values

## Output

- `number` — total unique combination count

## Constraints

- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All values of `coins` are **unique**.
- `0 <= amount <= 5000`

## Examples

| Input | Output | Why |
|---|---|---|
| `amount = 5, coins = [1,2,5]` | `4` | 4 combinations: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1 |
| `amount = 3, coins = [2]` | `0` | Amount 3 cannot be formed with 2s |
| `amount = 10, coins = [10]` | `1` | 1 combination: 10 |

## Edge Cases

- `amount = 0` -> returns `1` (1 way: choose 0 coins)

## Hints

1. **Order Matters (Combinations vs Permutations)**:
   - Outer loop over `coins`, inner loop over `amount`: Computes **Combinations** (Order does NOT matter, e.g. `1+2` and `2+1` are counted once).
   - Outer loop over `amount`, inner loop over `coins`: Computes **Permutations** (Order matters).
2. 1D DP Array: `dp[a]` = number of ways to form amount `a`. `dp[0] = 1`.
3. For each `coin` in `coins`:
   - For `a` from `coin` to `amount`:
     - `dp[a] += dp[a - coin]`.

## Algorithm

**Pattern:** Outer-Coin Unbounded Knapsack 1D DP Combinations  
**Core Insight:** Iterating over `coins` in the outer loop forces coins to be picked in non-decreasing order of denomination, preventing duplicate permutation counts.

## Dry Run

`amount = 5, coins = [1, 2, 5]`:
- `dp = [1, 0, 0, 0, 0, 0]`.
- Coin `1`: `dp = [1, 1, 1, 1, 1, 1]`.
- Coin `2`:
  - `a = 2`: `dp[2] += dp[0] = 1 + 1 = 2`.
  - `a = 3`: `dp[3] += dp[1] = 1 + 1 = 2`.
  - `a = 4`: `dp[4] += dp[2] = 1 + 2 = 3`.
  - `a = 5`: `dp[5] += dp[3] = 1 + 2 = 3`. `dp = [1, 1, 2, 2, 3, 3]`.
- Coin `5`: `dp[5] += dp[0] = 3 + 1 = 4`.
- Return `dp[5] = 4`.

## JavaScript Solution

```js
function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1; // Base case: 1 way to make amount 0

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }

  return dp[amount];
}
```

## TypeScript Solution

```ts
function change(amount: number, coins: number[]): number {
  const dp: number[] = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }

  return dp[amount];
}
```

## Time Complexity

`O(N * A)` — where $N = \text{coins.length}$ and $A = \text{amount}$.

## Space Complexity

`O(A)` — 1D DP array space.

## Common Mistakes

- Swapping outer and inner loop orders `for (let a = 1; a <= amount; a++) { for (const coin of coins) ... }`, which calculates Permutations (Combination Sum IV) instead of Combinations.

## Follow-Up Questions

1. How does Coin Change I differ (finding *minimum* coins instead of *total combinations*)?

## Similar Questions

- Coin Change I (Minimum Coins)
- Combination Sum IV
