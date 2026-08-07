# Q6631 · Find Median from Data Stream (Two Heaps Strategy)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Heap
**Concepts:** heap, min-heap, max-heap, streaming-data

## Problem Statement

Implement a `MedianFinder` class that supports adding numbers from a
stream one at a time and, at any point, efficiently reporting the median
of every number added so far.

- `addNum(num)`: adds `num` to the running data stream.
- `findMedian()`: returns the median of all numbers added so far.

## Input

A sequence of `addNum(num)` calls interleaved with `findMedian()` calls.

## Output

`findMedian()` returns the current median: the middle value if the count
of numbers seen so far is odd, or the average of the two middle values
if even.

## Constraints

`-10^5 <= num <= 10^5`, up to `5*10^4` calls to `addNum` and
`findMedian` combined

## Examples

```javascript
const finder = new MedianFinder();
finder.addNum(5);
finder.findMedian(); // 5      (only one value so far)
finder.addNum(15);
finder.findMedian(); // 10     ((5 + 15) / 2)
finder.addNum(1);
finder.findMedian(); // 5      (middle of [1, 5, 15])
finder.addNum(3);
finder.findMedian(); // 4      ((3 + 5) / 2, middle two of [1, 3, 5, 15])
```

## Edge Cases

- Only one number added → that number is the median
- Two numbers added → the average of both
- Numbers added out of order (not pre-sorted) → the median must still
  be correct after every single insertion, not just at the end
- Duplicate values → handled the same as any other value, no special
  casing needed

## Hints

1. Re-sorting the entire dataset on every `addNum` call works but is
   wasteful — is there a way to keep track of just enough structure to
   find the middle value(s) quickly, without a full sort each time?
2. Split the numbers into two halves: `small`, holding the *lower* half
   (its largest value easily accessible), and `large`, holding the
   *upper* half (its smallest value easily accessible). The median is
   then derived directly from the boundary between the two halves.
3. After inserting a new number, the two halves can become unbalanced in
   size by at most one — rebalance by moving the boundary element across
   whenever one half grows more than one larger than the other.

## Algorithm

**Pattern:** two balanced halves ("two heaps" conceptually — a max-heap
for the lower half, a min-heap for the upper half).
**Core insight:** the median only ever depends on the values right at
the boundary between the lower and upper halves of the sorted data — so
instead of keeping the *entire* dataset sorted, it's enough to maintain
two partitions, `small` (the lower half, always able to report its
*largest* value) and `large` (the upper half, always able to report its
*smallest* value), kept balanced in size to within one element of each
other. Every new number is inserted into `small`, its current maximum is
promoted into `large` to maintain the ordering property between the two
halves, and then the halves are rebalanced if `small` has fallen behind
in size. This implementation represents each half as a plain array kept
sorted after each mutation (rather than a true binary heap) — correct in
result, but see Complexity below for what that costs versus a real heap.
**Invariant:** after every `addNum` call, every value in `small` is
`<=` every value in `large`, and the two halves differ in size by at
most one element — together these guarantee `findMedian` can always read
the answer directly from the boundary values.

## Dry Run

**Input:** `addNum(5)`, `addNum(15)`, `addNum(1)`, `addNum(3)`

| Call | small (desc order) | large (asc order) | findMedian() |
|---|---|---|---|
| `addNum(5)` | `[5]` | `[]` | `5` (small longer) |
| `addNum(15)` | `[5]` | `[15]` | `10` ((5+15)/2) |
| `addNum(1)` | `[5, 1]` | `[15]` | `5` (small longer) |
| `addNum(3)` | `[3, 1]` | `[5, 15]` | `4` ((3+5)/2) |

**Result:** medians `5, 10, 5, 4` — matches the expected sequence.

## JavaScript Solution

```js
class MedianFinder {
  constructor() {
    this.small = []; // Max-heap for lower half
    this.large = []; // Min-heap for upper half
  }

  addNum(num) {
    // Add to max-heap, move max to min-heap
    this.small.push(num);
    this.small.sort((a, b) => b - a);
    this.large.push(this.small.shift());
    this.large.sort((a, b) => a - b);

    if (this.small.length < this.large.length) {
      this.small.push(this.large.shift());
      this.small.sort((a, b) => b - a);
    }
  }

  findMedian() {
    if (this.small.length > this.large.length) {
      return this.small[0];
    }
    return (this.small[0] + this.large[0]) / 2;
  }
}
```

## TypeScript Solution

```ts
class MedianFinder {
  private small: number[] = []; // conceptually a max-heap for the lower half
  private large: number[] = []; // conceptually a min-heap for the upper half

  addNum(num: number): void {
    this.small.push(num);
    this.small.sort((a, b) => b - a);
    this.large.push(this.small.shift()!);
    this.large.sort((a, b) => a - b);

    if (this.small.length < this.large.length) {
      this.small.push(this.large.shift()!);
      this.small.sort((a, b) => b - a);
    }
  }

  findMedian(): number {
    if (this.small.length > this.large.length) {
      return this.small[0];
    }
    return (this.small[0] + this.large[0]) / 2;
  }
}
```

## Time Complexity

`addNum`: O(n log n) *as written here*, dominated by the `.sort()` calls
on each insertion — a real binary heap implementation (using array-based
heapify/sift operations instead of a full re-sort) would bring this down
to O(log n) per insertion, which is what the "two heaps" name for this
pattern refers to. `findMedian`: O(1) either way, since it only reads
boundary elements.

## Space Complexity

O(n) — every number added so far is stored, split across the two
halves.

## Common Mistakes

- Re-sorting the *entire* combined dataset from scratch on every
  `addNum` call — correct but even more wasteful than this
  implementation's per-half sorts.
- Implementing the halves with plain arrays and `.sort()` (as shown
  here) while believing it has true heap performance — it doesn't; a
  production-grade version needs an actual binary heap (sift-up/sift-
  down operations) to achieve the O(log n) insertion the "two heaps"
  technique is meant to provide.
- Letting the two halves drift more than one element apart in size —
  breaks the invariant that the median can always be read directly from
  the boundary, since `findMedian` assumes at most a one-element size
  difference.

## Interview Follow-up Questions

1. How would you reimplement `small`/`large` as true binary heaps
   (with sift-up/sift-down) to achieve genuine O(log n) insertions?
2. How would you extend this to also support *removing* a number from
   the stream?
3. How would you adapt this design if the stream were extremely large
   and needed to be processed across multiple machines?

## Similar Questions

- Merge k Sorted Lists (Min-Heap) (see [merge-k-sorted-lists-min-heap.md](merge-k-sorted-lists-min-heap.md))
- Sliding Window Maximum (see [../sliding-window/sliding-window-maximum-monotonic-deque.md](../sliding-window/sliding-window-maximum-monotonic-deque.md))
