# Q6596 · Online Stock Span (Monotonic Stack Class Design)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, monotonic-stack, class-design, streaming-data  

## Problem Statement

Design an algorithm that collects daily price quotes for some stock and returns the **span** of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was **less than or equal to the price of that day**.

For example, if the prices of the stock in the last four days were `[100, 80, 60, 70]` and the price of the stock today is `60`, then the span of today is `1`, and if the price of the stock today is `75`, then the span of today is `4` (because `75 >= 60`, `70`, `80` is false, wait: `75 >= 70`, `60`, `80` false -> span = 3).

Implement the `StockSpanner` class:
- `StockSpanner()` Initializes the object of the class.
- `next(price)` Returns the **span** of that price.

## Input

- `next(price)`: `number` — daily stock price integer

## Output

- `number` — stock span integer count for today

## Constraints

- `1 <= price <= 10^5`
- At most `10^4` calls will be made to `next`.

## Examples

| Input Call | Output | Explanation |
|---|---|---|
| `next(100)` | `1` | Span 1 |
| `next(80)` | `1` | Span 1 |
| `next(60)` | `1` | Span 1 |
| `next(70)` | `2` | 70 >= 60 (span 1 + 1 = 2) |
| `next(60)` | `1` | Span 1 |
| `next(75)` | `4` | 75 >= 60, 70, 80 (span 1 + 2 + 1 = 4) |
| `next(85)` | `6` | 85 >= 75... (span 6) |

## Edge Cases

- Strictly increasing prices `[10, 20, 30]` -> returns `1, 2, 3`

## Hints

1. **Monotonic Stack Storing `[price, span]` Pairs**:
   - Maintain a stack storing pairs of `[price, span]`.
   - Initial span for today's price = `1`.
2. While `stack` is not empty AND `stack.top.price <= price`:
   - `span += stack.pop().span` (Absorb previous spans!).
3. Push `[price, span]` onto `stack`.
4. Return `span`.

## Algorithm

**Pattern:** Monotonic Decreasing Stack Span Accumulation  
**Core Insight:** Popping elements with smaller prices and accumulating their pre-computed span values avoids re-scanning historical price arrays on every streaming query.

## Dry Run

Calls: `next(100)`, `next(80)`, `next(60)`, `next(70)`, `next(75)`:
- `next(100)`: Stack `[[100, 1]]`. Return `1`.
- `next(80)`: Stack `[[100, 1], [80, 1]]`. Return `1`.
- `next(60)`: Stack `[[100, 1], [80, 1], [60, 1]]`. Return `1`.
- `next(70)`: Pop `[60, 1]`. `span = 1 + 1 = 2`. Stack `[[100, 1], [80, 1], [70, 2]]`. Return `2`.
- `next(75)`: Pop `[70, 2]` (`span = 1 + 2 = 3`). Pop `[80, 1]` (`span = 3 + 1 = 4`). Stack `[[100, 1], [75, 4]]`. Return `4`.

## JavaScript Solution

```js
class StockSpanner {
  constructor() {
    this.stack = []; // Stores pairs: [price, span]
  }

  next(price) {
    let span = 1;

    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
      const [, prevSpan] = this.stack.pop();
      span += prevSpan;
    }

    this.stack.push([price, span]);
    return span;
  }
}
```

## TypeScript Solution

```ts
class StockSpanner {
  private stack: Array<[number, number]>;

  constructor() {
    this.stack = [];
  }

  next(price: number): number {
    let span = 1;

    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
      const [, prevSpan] = this.stack.pop()!;
      span += prevSpan;
    }

    this.stack.push([price, span]);
    return span;
  }
}
```

## Time Complexity

`O(1)` amortized time per `next()` call (each price is pushed and popped at most once).

## Space Complexity

`O(N)` — stack space storing `[price, span]` pairs.

## Common Mistakes

- Re-scanning an internal `prices` array backward on every `next()` call ($O(N^2)$ overall time), causing TLE on $10,000$ queries.

## Follow-Up Questions

1. How does Daily Temperatures use identical monotonic stack mechanics to find distances to future warmer days?

## Similar Questions

- Daily Temperatures
- Min Stack Design
