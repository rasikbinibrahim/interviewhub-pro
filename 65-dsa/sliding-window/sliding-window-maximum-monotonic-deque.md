# Q6636 · Sliding Window Maximum (Monotonic Decreasing Deque)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Sliding Window
**Concepts:** sliding-window, deque, monotonic-queue

## Problem Statement

Write a function `maxSlidingWindow(nums, k)` that returns an array of
the maximum value in every contiguous window of size `k` as it slides
from the start of `nums` to the end, in O(n) time.

## Input

`nums`: an array of integers. `k`: the window size.

## Output

An array where each element is the maximum of the corresponding
size-`k` window.

## Constraints

`1 <= k <= nums.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums=[1,3,-1,-3,5,3,6,7], k=3` | `[3,3,5,5,6,7]` | Max of `[1,3,-1]`, `[3,-1,-3]`, `[-1,-3,5]`, etc. |
| `nums=[1], k=1` | `[1]` | Every window is just the single element |
| `nums=[9,8,7,6], k=2` | `[9,8,7]` | Strictly decreasing — each window's max is its own first (leftmost) element |

## Edge Cases

- `k = 1` → every element is its own window's maximum, so the output
  equals the input
- `k === nums.length` → a single output value, the maximum of the
  entire array
- Strictly increasing array → each window's max is always its rightmost
  (newest) element
- Strictly decreasing array → each window's max is always its leftmost
  (oldest) element, until that element slides out of the window

## Hints

1. Recomputing the maximum of each window from scratch is O(n × k) —
   what information from the *previous* window could help avoid
   redundant comparisons as the window slides by one?
2. Maintain a deque of *indices* (not values) such that the values they
   point to are always in decreasing order, front to back — the front of
   the deque is then always the index of the current window's maximum.
3. Before adding a new index, remove every index from the *back* of the
   deque whose value is `<=` the new value — those values can never be
   the maximum of any future window that also contains the new value,
   since the new value is both larger and more recent. Also remove the
   *front* index if it's fallen outside the current window's left
   boundary.

## Algorithm

**Pattern:** monotonic decreasing deque of indices.
**Core insight:** a value can be safely discarded from future
consideration the moment a *larger* value appears to its right within
the same or a later window, since it can never again be the maximum
while that larger, more recent value remains in play — this lets the
deque maintain only genuinely "still relevant" candidates, in decreasing
order, so the front is always the current window's maximum. Storing
*indices* rather than values lets the algorithm also detect when the
front candidate has aged out of the window (its index is too far left)
and needs to be dropped.
**Invariant:** at any point after processing index `i`, the deque holds
indices in increasing order (front to back) whose corresponding values
are in strictly decreasing order, and every index still within the
deque could still be the maximum of some current-or-future window.

## Dry Run

**Input:** `nums = [1,3,-1,-3,5,3,6,7], k = 3`

| i | nums[i] | remove stale front | pop smaller-or-equal from back | deque after push i | window max (once i >= k-1) |
|---|---|---|---|---|---|
| 0 | 1 | – | – | `[0]` | – |
| 1 | 3 | – | pop 0 (nums[0]=1 ≤ 3) | `[1]` | – |
| 2 | -1 | – | – | `[1,2]` | `nums[1]=3` |
| 3 | -3 | – | – | `[1,2,3]` | `nums[1]=3` |
| 4 | 5 | pop 1 (index < 4-3+1=2) | pop 3, pop 2, pop 1 (all ≤ 5) | `[4]` | `nums[4]=5` |
| 5 | 3 | – | – | `[4,5]` | `nums[4]=5` |
| 6 | 6 | – | pop 5, pop 4 (both ≤ 6) | `[6]` | `nums[6]=6` |
| 7 | 7 | – | pop 6 (nums[6]=6 ≤ 7) | `[7]` | `nums[7]=7` |

**Result:** `[3,3,5,5,6,7]` — matches expected output.

## JavaScript Solution

```js
function maxSlidingWindow(nums, k) {
  const deque = []; // Stores indices
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove indices outside current window
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // 2. Maintain monotonic decreasing order
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 3. Record max when window reaches size k
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

## Time Complexity

O(n) — although there's a nested `while` loop, each index is pushed onto
the deque exactly once and popped at most once across the entire run, so
the total number of push/pop operations is bounded by O(n), not O(n×k).

## Space Complexity

O(k) — the deque never holds more than `k` indices at once (stale and
dominated indices are continuously removed).

## Common Mistakes

- Recomputing the maximum of each window from scratch (e.g. with
  `Math.max(...window)`) — correct but O(n × k), far slower than the
  monotonic deque's O(n).
- Using a max-heap instead of a monotonic deque — works, but a heap
  doesn't support efficiently removing an *arbitrary* stale element
  (the one sliding out of the window on the left) without extra
  bookkeeping like lazy deletion; the deque handles this naturally by
  storing indices and checking the front against the window boundary.
- Storing *values* in the deque instead of *indices* — without indices,
  there's no way to tell whether the front value has aged out of the
  current window and needs to be discarded.

## Interview Follow-up Questions

1. How would you adapt this to track the *minimum* of each window
   instead of the maximum?
2. Why is the total work across all iterations O(n) despite the nested
   loop — what accounting argument proves this (each index is pushed
   once, popped at most once)?
3. How would you solve this using a balanced BST or ordered multiset
   instead of a monotonic deque, and what would that trade off?

## Similar Questions

- Maximum Subarray (Kadane's Algorithm) (see [../arrays/maximum-subarray-kadane.md](../arrays/maximum-subarray-kadane.md))
- Find Median from Data Stream (see [../heap/find-median-from-data-stream.md](../heap/find-median-from-data-stream.md))
