# Q6538 · Best Time to Buy and Sell Stock (Single Pass Min Price)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, dynamic-programming, single-pass, greedy  

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

## Input

- `prices`: `number[]` — stock prices on consecutive days

## Output

- `number` — maximum profit possible

## Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `prices = [7,1,5,3,6,4]` | `5` | Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5 |
| `prices = [7,6,4,3,1]` | `0` | Prices decrease monotonically; no transaction yields profit |

## Edge Cases

- Prices decrease every day `[5, 4, 3, 2, 1]` -> returns `0`
- Single day array `[5]` -> returns `0`

## Hints

1. Maintain two scalar variables during a single iteration:
   - `minPrice`: Track the lowest stock price encountered so far (initialize to `Infinity` or `prices[0]`).
   - `maxProfit`: Track the maximum profit difference calculated so far (initialize to `0`).
2. For each price `p` in `prices`:
   - Update `minPrice = Math.min(minPrice, p)`.
   - Update `maxProfit = Math.max(maxProfit, p - minPrice)`.
3. Return `maxProfit`.

## Algorithm

**Pattern:** Greedy Minimum Tracking Single Pass  
**Core Insight:** By maintaining a running minimum price seen so far, the maximum potential profit on day `i` is simply `prices[i] - minPrice`, requiring only $O(N)$ time and $O(1)$ space.

## Dry Run

`prices = [7, 1, 5, 3, 6, 4]`:
- `minPrice = 7`, `maxProfit = 0`.
- Day 2 (`price = 1`): `minPrice = 1`, `maxProfit = max(0, 1 - 1) = 0`.
- Day 3 (`price = 5`): `minPrice = 1`, `maxProfit = max(0, 5 - 1) = 4`.
- Day 4 (`price = 3`): `minPrice = 1`, `maxProfit = max(4, 3 - 1) = 4`.
- Day 5 (`price = 6`): `minPrice = 1`, `maxProfit = max(4, 6 - 1) = 5`.
- Day 6 (`price = 4`): `minPrice = 1`, `maxProfit = max(5, 4 - 1) = 5`.
- Result: `5`.

## JavaScript Solution

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}
```

## TypeScript Solution

```ts
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}
```

## Time Complexity

`O(N)` — single linear pass through `prices`.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Using nested loops checking every pair ($O(N^2)$), causing Time Limit Exceeded (TLE) for $N = 10^5$.

## Follow-Up Questions

1. How would you solve Best Time to Buy and Sell Stock II, where you can complete as many transactions as you like?

## Similar Questions

- Best Time to Buy and Sell Stock II
- Best Time to Buy and Sell Stock with Cooldown
