# Q6645 · Maximum Subarray (Kadane's Algorithm)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Arrays
**Concepts:** arrays, kadanes-algorithm, dynamic-programming

## Problem Statement

Write a function `maxSubArray(nums)` that returns the largest possible
sum of any contiguous subarray of `nums` (at least one element).

## Input

`nums`: a non-empty array of integers (may include negative numbers).

## Output

A single number: the maximum sum achievable by any contiguous subarray.

## Constraints

`1 <= nums.length <= 10^5`, `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `[-2,1,-3,4,-1,2,1,-5,4]` | `6` | Subarray `[4,-1,2,1]` sums to 6, the largest possible |
| `[1]` | `1` | Only one element, so it's trivially the answer |
| `[-1,-2,-3]` | `-1` | All negative — the best "subarray" is the single least-negative element |

## Edge Cases

- Single-element array → that element is the answer, whether positive or
  negative
- All-negative array → the answer is the single largest (least negative)
  element, not `0` — an empty subarray isn't a valid choice
- All-positive array → the answer is the sum of the entire array
- Mix of positive and negative → the optimal subarray boundary must be
  found, not assumed to start or end at the array's edges

## Hints

1. Checking every possible subarray's sum is O(n²) (or O(n³) naively) —
   is there a way to decide, at each position, whether to extend the
   current subarray or start fresh, using only information from the
   position just before it?
2. At each index, the best subarray *ending* there is either "extend the
   best subarray ending at the previous index" or "start a brand new
   subarray right here" — whichever gives a larger sum.
3. Extending only helps if the running sum so far is still positive; if
   it's dropped to zero or negative, it can only be dragging future
   sums down, so starting fresh at the current element is at least as
   good.

## Algorithm

**Pattern:** Kadane's algorithm — single-pass running-maximum dynamic
programming.
**Core insight:** the maximum subarray ending at index `i` is either the
element `nums[i]` alone, or `nums[i]` appended to the maximum subarray
ending at `i - 1` — whichever is larger. A negative running sum can
never help a future subarray (adding a negative number only shrinks
whatever comes after it), so whenever the running sum drops below the
value of the current element alone, it's strictly better to restart
the subarray at the current position. Tracking the best "ending here"
value at each step, and the best value seen overall, solves the whole
problem in one linear pass.
**Invariant:** at the start of iteration `i`, `currMax` holds the
maximum sum of any subarray that *ends exactly at* index `i - 1`, and
`maxSoFar` holds the maximum subarray sum found anywhere in `nums[0..i-1]`.

## Dry Run

**Input:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`

| i | nums[i] | currMax + nums[i] | currMax = max(nums[i], currMax+nums[i]) | maxSoFar |
|---|---|---|---|---|
| start | – | – | -2 | -2 |
| 1 | 1 | -1 | max(1, -1) = 1 | 1 |
| 2 | -3 | -2 | max(-3, -2) = -2 | 1 |
| 3 | 4 | 2 | max(4, 2) = 4 | 4 |
| 4 | -1 | 3 | max(-1, 3) = 3 | 4 |
| 5 | 2 | 5 | max(2, 5) = 5 | 5 |
| 6 | 1 | 6 | max(1, 6) = 6 | 6 |
| 7 | -5 | 1 | max(-5, 1) = 1 | 6 |
| 8 | 4 | 5 | max(4, 5) = 5 | 6 |

**Result:** `6` — matches expected output (subarray `[4,-1,2,1]`).

## JavaScript Solution

```js
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }

  return maxSoFar;
}
```

## TypeScript Solution

```ts
function maxSubArray(nums: number[]): number {
  let maxSoFar: number = nums[0];
  let currMax: number = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }

  return maxSoFar;
}
```

## Time Complexity

O(n) — a single pass over the array, constant work per element.

## Space Complexity

O(1) — two running scalar variables, regardless of input size.

## Common Mistakes

- Checking every subarray with nested loops — correct, but O(n²) (or
  O(n³) if sums are recomputed from scratch each time) instead of O(n).
- Resetting `currMax` to `0` instead of `nums[i]` when starting fresh —
  incorrectly assumes an empty subarray (summing to `0`) is always a
  valid fallback, which breaks on all-negative arrays where the correct
  answer must be negative.
- Seeding `maxSoFar` at `0` instead of `nums[0]` — also breaks on
  all-negative input, silently returning `0` (an impossible sum for a
  non-empty subarray) instead of the true, negative maximum.

## Interview Follow-up Questions

1. How would you also return the actual subarray (its start and end
   indices), not just its sum?
2. How would you solve this using a divide-and-conquer approach instead,
   and how does its complexity compare?
3. How would you adapt this to find the maximum sum of a *circular*
   subarray, where the subarray can wrap around the end of the array?

## Similar Questions

- Product of Array Except Self (see [product-of-array-except-self.md](product-of-array-except-self.md))
- Sliding Window Maximum (see [../sliding-window/sliding-window-maximum-monotonic-deque.md](../sliding-window/sliding-window-maximum-monotonic-deque.md))
