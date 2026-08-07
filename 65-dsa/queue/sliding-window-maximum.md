# Q803 · Sliding Window Maximum

**Difficulty:** Hard
**Companies Asked:** Amazon, Google, Meta, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Queue
**Concepts:** monotonic deque, amortized O(1) window maximum

## Problem Statement

Given an integer array `nums` and a window size `k`, return an array of
the maximum value in every contiguous window of size `k` as it slides
from the start of the array to the end.

## Input

- `nums`: an array of integers
- `k`: the window size, `1 <= k <= nums.length`

## Output

An array of length `nums.length - k + 1`, where each element is the
maximum of the corresponding window.

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,3,-1,-3,5,3,6,7], k = 3` | `[3,3,5,5,6,7]` | Each window's max, e.g. `[1,3,-1]→3`, `[5,3,6]→6` |
| `nums = [1], k = 1` | `[1]` | Single-element window equals the array itself |

## Edge Cases

- `k = nums.length` → a single window, the answer is `[Math.max(...nums)]`
- `k = 1` → every element is its own window; output equals the input
- Strictly decreasing or strictly increasing array → tests whether the
  algorithm correctly evicts stale maximums, not just tracks the running
  max naively

## Hints

1. Recomputing the max of each window from scratch is O(n*k) — what
   information from the *previous* window could carry over into the
   next one?
2. As the window slides right by one, only one element leaves (the
   left) and one enters (the right) — most of the window's other
   elements are unchanged. What candidates for "future maximum" can you
   safely discard the instant a *larger* element appears?
3. Maintain a deque of *indices* (not values) such that the values they
   point to are in strictly decreasing order from front to back. Any
   index whose value is smaller than the newly arriving value can never
   be the maximum of any future window (the new, larger value will
   always beat it while both remain in range) — discard those from the
   back before adding the new index.

## Algorithm

**Pattern:** monotonic decreasing deque of indices.
**Core insight:** a deque holding indices whose corresponding values are
in strictly decreasing order always has the current window's maximum at
its front. When a new value arrives, any smaller values at the deque's
back can never win against it for the remainder of their shared
lifetime in the window, so they're evicted immediately — this is what
keeps each index in the deque for a bounded amount of total work across
the whole scan. Before recording a window's maximum, the front index is
checked against the window's left boundary and evicted if it's fallen
out of range.
**Invariant:** at every step, the deque holds indices in increasing
order (oldest at front) whose *values* are in strictly decreasing order,
and every index still in the deque is within the current window's
bounds.

## Dry Run

**Input:** `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`

| i | nums[i] | Deque before | Evictions (smaller values from back) | Deque after push | Front out of window? | Window max (once i >= k-1) |
|---|---|---|---|---|---|---|
| 0 | 1 | `[]` | none | `[0]` | — | — |
| 1 | 3 | `[0]` | `0` (value 1 < 3) | `[1]` | — | — |
| 2 | -1 | `[1]` | none (-1 < 3) | `[1,2]` | no | `nums[1]=3` |
| 3 | -3 | `[1,2]` | none | `[1,2,3]` | no | `nums[1]=3` |
| 4 | 5 | `[1,2,3]` | `3,2,1` (all < 5) | `[4]` | no | `nums[4]=5` |
| 5 | 3 | `[4]` | none | `[4,5]` | no | `nums[4]=5` |
| 6 | 6 | `[4,5]` | `5,4` (both < 6) | `[6]` | no | `nums[6]=6` |
| 7 | 7 | `[6]` | `6` (< 7) | `[7]` | no | `nums[7]=7` |

**Result:** `[3, 3, 5, 5, 6, 7]` — matches expected output.

## JavaScript Solution

```js
function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices; values are strictly decreasing
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Discard indices whose values can never win against nums[i].
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Evict the front index if it has fallen out of the current window.
    if (deque[0] <= i - k) {
      deque.shift();
    }

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function maxSlidingWindow(nums: readonly number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && nums[deque[deque.length - 1]!]! < nums[i]!) {
      deque.pop();
    }

    deque.push(i);

    if (deque[0]! <= i - k) {
      deque.shift();
    }

    if (i >= k - 1) {
      result.push(nums[deque[0]!]!);
    }
  }

  return result;
}
```

## Time Complexity

O(n) — each index is pushed onto the deque exactly once and popped at
most once (from either end) across the entire scan, so total deque work
is bounded by O(n) despite the nested-looking `while` loop.

## Space Complexity

O(k) — the deque never holds more than `k` indices at once (bounded by
the window size).

## Common Mistakes

- Recomputing `Math.max(...window)` for every window — correct but
  O(n*k), which times out on large inputs.
- Storing values in the deque instead of indices — makes it impossible
  to detect when the front element has fallen outside the current
  window.
- Forgetting the eviction check for the front index (`deque[0] <= i -
  k`) — without it, a stale maximum from outside the window could be
  reported.
- Using `<=` instead of `<` when evicting from the back — using `<=`
  would incorrectly discard an equal value that could still be a valid
  tie-breaking maximum later, though either convention can be made
  correct as long as it's applied consistently; `<` is the more common
  and slightly simpler choice.

## Interview Follow-up Questions

1. How would you solve this with a max-heap instead of a monotonic
   deque — what's the tradeoff (lazy deletion complexity vs. deque
   simplicity)?
2. How would you adapt this to track the sliding window *minimum*
   instead?
3. How would this generalize to a 2D sliding window (over a matrix)?

## Similar Questions

- Min Stack (see [../stack/min-stack.md](../stack/min-stack.md))
- Moving Average from Data Stream (see [moving-average-from-data-stream.md](moving-average-from-data-stream.md))
- Shortest Subarray with Sum at Least K

---
[← Back to Queue](README.md) · [← Back to 65-dsa](../README.md)
