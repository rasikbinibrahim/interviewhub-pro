# Q6626 · Coin Change I (Minimum Coins 1D DP)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Dynamic Programming
**Concepts:** dp, unbounded-knapsack, coins

## Problem Statement

Write a function `coinChange(coins, amount)` that returns the fewest
number of coins (from an unlimited supply of each denomination in
`coins`) needed to make exactly `amount`, or `-1` if it's impossible.

## Input

`coins`: an array of distinct positive integer denominations. `amount`:
a non-negative integer target.

## Output

The minimum number of coins needed to make `amount`, or `-1` if
impossible.

## Constraints

`1 <= coins.length <= 12`, `1 <= coins[i] <= 2^31 - 1`, `0 <= amount <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `coins=[1,2,5], amount=11` | `3` | `5+5+1 = 11`, using 3 coins |
| `coins=[2], amount=3` | `-1` | No combination of only 2s can total an odd amount like 3 |
| `coins=[1], amount=0` | `0` | Zero coins needed to make an amount of zero |

## Edge Cases

- `amount = 0` → `0`, no coins needed
- No combination of coins can reach `amount` → `-1`
- A single coin denomination exactly equal to `amount` → `1`
- `coins` containing a `1` → every amount is reachable (worst case, all
  1s), so `-1` is only possible when `1` isn't among the denominations

## Hints

1. Trying every combination of coins recursively works but revisits the
   same sub-amounts repeatedly — what smaller subproblem does the answer
   for `amount` depend on?
2. The minimum coins to make `amount` is `1 + (minimum coins to make
   amount - coin)`, minimized over every coin denomination that's
   `<= amount` — build this up from the smallest amounts to the largest.
3. Seed `dp[0] = 0` (zero coins for zero amount) and initialize every
   other `dp[a]` to a sentinel representing "unreachable so far"
   (`Infinity` works well in JavaScript); any `dp[a]` still at that
   sentinel value after the full computation means `amount` truly can't
   be formed.

## Algorithm

**Pattern:** bottom-up 1D dynamic programming (unbounded knapsack).
**Core insight:** the minimum number of coins to make amount `a` can be
derived directly from smaller, already-solved subproblems: for every
coin denomination `c <= a`, one valid way to make `a` is "one coin of
value `c`, plus however many coins it takes to make the remaining `a -
c`" — and the true minimum for `a` is just the best (smallest) of those
options across every available coin. Building `dp` from `0` up to
`amount` guarantees `dp[a - c]` is already computed by the time `dp[a]`
needs it.
**Invariant:** after computing `dp[a]`, it holds the true minimum number
of coins needed to make exactly amount `a` (or `Infinity` if no
combination of the given coins can reach `a`).

## Dry Run

**Input:** `coins = [1,2,5], amount = 6`

| a | check coin 1: dp[a-1]+1 | check coin 2: dp[a-2]+1 | check coin 5: dp[a-5]+1 | dp[a] |
|---|---|---|---|---|
| 0 | – | – | – | 0 (seeded) |
| 1 | dp[0]+1=1 | – (a-2<0) | – | 1 |
| 2 | dp[1]+1=2 | dp[0]+1=1 | – | 1 |
| 3 | dp[2]+1=2 | dp[1]+1=2 | – | 2 |
| 4 | dp[3]+1=3 | dp[2]+1=2 | – | 2 |
| 5 | dp[4]+1=3 | dp[3]+1=3 | dp[0]+1=1 | 1 |
| 6 | dp[5]+1=2 | dp[4]+1=3 | dp[1]+1=2 | 2 |

**Result:** `dp[6] = 2` (e.g. `5 + 1`, or `2 + 2 + 2`) — 2 coins needed.

## JavaScript Solution

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
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

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Time Complexity

O(amount × coins.length) — for each amount from `1` to `amount`, every
coin denomination is checked once.

## Space Complexity

O(amount) — one DP array sized to `amount + 1`.

## Common Mistakes

- Greedily always picking the largest coin that fits — works for
  "canonical" coin systems (like standard currency) but fails for
  arbitrary denominations (e.g. `coins=[1,3,4], amount=6`: greedy picks
  `4+1+1` (3 coins), but the true optimum is `3+3` (2 coins)).
- Naive recursion without memoization — correct, but re-solves the same
  sub-amounts exponentially many times.
- Forgetting to distinguish "unreachable" from "zero coins needed" — a
  sentinel like `Infinity` (checked explicitly at the end) avoids
  confusing an unreachable amount with a genuinely valid answer of `0`.

## Interview Follow-up Questions

1. How would you also reconstruct *which* coins were used, not just the
   count?
2. How does this differ from "Coin Change II" (counting the number of
   *ways* to make an amount, rather than the minimum coins)?
3. Why does initializing `dp` with `Infinity` (rather than `-1` or `0`)
   make the `Math.min` comparisons work correctly without extra special
   casing?

## Similar Questions

- Coin Change II (Number of Ways) (see [coin-change-minimum-ways.md](coin-change-minimum-ways.md))
- Longest Increasing Subsequence (see [long-increasing-subsequence-patience-sorting.md](long-increasing-subsequence-patience-sorting.md))
