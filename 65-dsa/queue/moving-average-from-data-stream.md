# Q802 · Moving Average from Data Stream

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Meta
**Interview Frequency:** ★★★☆☆
**Category:** Data Structures & Algorithms → Queue
**Concepts:** FIFO window, running sum

## Problem Statement

Design a data structure that calculates the moving average of the last
`size` values from a stream of integers. Implement `next(value)`, which
adds `value` to the stream and returns the current moving average of the
last `size` values (or of all values seen so far, if fewer than `size`
have arrived yet).

## Input

- `size`: the window size (constructor argument)
- A sequence of `next(value)` calls, each with a single integer

## Output

Each `next(value)` call returns the current moving average (a number) of
the most recent up-to-`size` values.

## Constraints

- `1 <= size <= 1000`
- `-10^5 <= value <= 10^5`
- At most `10^4` calls to `next`.

## Examples

| Operations | Return values | Why |
|---|---|---|
| `size=3; next(1); next(10); next(3); next(5)` | `1, 5.5, 4.67, 6` | Window fills to 3, then oldest value drops off as new ones arrive |

## Edge Cases

- Fewer values seen than `size` → average over however many have
  actually arrived, not divided by the full window size
- `size = 1` → the "average" is always just the most recent value
- Negative values in the stream → sum and average must handle them
  correctly, not assume non-negative input

## Hints

1. Recomputing the sum of the last `size` values from scratch on every
   call is O(size) per call — what running total could you maintain
   instead?
2. A queue (FIFO) is a natural fit for "the last `size` values" — values
   enter at one end and, once the window is full, leave from the other.
3. Keep a running sum alongside the queue: add the new value to both the
   queue and the sum; if the queue exceeds `size`, dequeue the oldest
   value and subtract it from the sum — the average is always
   `sum / queue.length`.

## Algorithm

**Pattern:** FIFO window with a running sum.
**Core insight:** rather than resumming the window's contents on every
call, maintain the sum incrementally — adding the newly arrived value
and, once the window exceeds its target size, subtracting whatever value
just fell out of the window. A queue naturally represents "the current
window" and gives O(1) access to the oldest element that needs removing.
**Invariant:** after every `next` call, `queue` holds exactly the most
recent `min(size, callsSoFar)` values, and `sum` equals the sum of
everything currently in `queue`.

## Dry Run

**Input:** `size = 3`, calls `next(1)`, `next(10)`, `next(3)`, `next(5)`

| Call | queue after | sum | average returned |
|---|---|---|---|
| `next(1)` | `[1]` | 1 | `1 / 1 = 1` |
| `next(10)` | `[1, 10]` | 11 | `11 / 2 = 5.5` |
| `next(3)` | `[1, 10, 3]` | 14 | `14 / 3 ≈ 4.67` |
| `next(5)` | `[10, 3, 5]` (1 evicted) | 18 | `18 / 3 = 6` |

**Result:** matches the expected sequence of return values.

## JavaScript Solution

```js
class MovingAverage {
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }

  next(value) {
    this.queue.push(value);
    this.sum += value;

    if (this.queue.length > this.size) {
      // The window overflowed — evict the oldest value from both the
      // queue and the running sum.
      this.sum -= this.queue.shift();
    }

    return this.sum / this.queue.length;
  }
}
```

## TypeScript Solution

```ts
class MovingAverage {
  private size: number;
  private queue: number[] = [];
  private sum = 0;

  constructor(size: number) {
    this.size = size;
  }

  next(value: number): number {
    this.queue.push(value);
    this.sum += value;

    if (this.queue.length > this.size) {
      this.sum -= this.queue.shift()!;
    }

    return this.sum / this.queue.length;
  }
}
```

## Time Complexity

O(1) amortized per `next` call — `push`/`shift` on a small window and
constant-time sum updates. (A plain array's `.shift()` is technically
O(n) in the worst case; a real ring-buffer or linked-list-backed queue
avoids that if `size` is large — see follow-ups.)

## Space Complexity

O(size) — the queue never holds more than `size` values.

## Common Mistakes

- Recomputing the sum of the whole window from scratch each call instead
  of maintaining it incrementally.
- Dividing by the fixed `size` instead of the *current* number of values
  in the window, before the window has filled up for the first time.
- Using `.shift()` on a large array in a performance-sensitive context
  without recognizing its O(n) cost — fine for small `size`, worth
  flagging as a real-world scaling concern.

## Interview Follow-up Questions

1. How would you avoid `.shift()`'s O(n) cost using a circular buffer
   (fixed-size array with a wrapping write index) instead of a plain
   array-backed queue?
2. How would you support a *weighted* moving average instead of a
   simple one?
3. How would this design change if `next` needed to support removing an
   arbitrary past value, not just the oldest one?

## Similar Questions

- Design Circular Queue
- Sliding Window Maximum (see [sliding-window-maximum.md](sliding-window-maximum.md))
- Number of Recent Calls

---
[← Back to Queue](README.md) · [← Back to 65-dsa](../README.md)
