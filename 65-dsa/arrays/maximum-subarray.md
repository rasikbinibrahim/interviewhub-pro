# Q102 · Maximum Subarray

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, LinkedIn, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Arrays / Greedy (Kadane's Algorithm)
**Concepts:** Kadane's algorithm, running-sum greedy reset, one-pass optimization

## Problem Statement

Given an integer array `nums`, find the contiguous subarray (containing
at least one number) with the largest sum, and return that sum.

## Input

`nums`: an array of integers (may include negative numbers).

## Output

A single integer: the maximum possible sum of any contiguous subarray.

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` | `6` | The subarray `[4, -1, 2, 1]` sums to 6, the maximum |
| `[1]` | `1` | Single element — the only possible subarray |
| `[5, 4, -1, 7, 8]` | `23` | The entire array is the best subarray here |
| `[-3, -1, -2]` | `-1` | All negative — the best "subarray" is the single largest element |

## Edge Cases

- All-negative array → the answer is the single largest (least negative)
  element, not `0` (an empty subarray is not allowed — "at least one
  number")
- Single-element array → that element is the answer
- All-positive array → the whole array is the answer
- Array with a single very negative value between two positive runs →
  must correctly decide whether including it still beats starting fresh

## Hints

1. For any subarray ending at index `i`, its sum only depends on whether
   extending the subarray that ended at `i - 1` helps or hurts — what
   local decision at each index determines that?
2. If the running sum ending at the previous index is negative, does
   carrying it forward ever help the sum starting fresh at the current
   element?
3. Track two things as you scan once: the best sum *ending exactly at
   the current index*, and the best sum *seen anywhere so far* — the
   final answer is the second one, not the first.

## Algorithm

**Pattern:** Kadane's Algorithm (a greedy/DP hybrid, one pass).
**Core insight:** for a subarray ending at index `i`, the best possible
sum is either "extend the best subarray ending at `i - 1`" or "start a
brand-new subarray at `i`" — whichever is larger. Extending only helps
if the running sum so far is positive; if it's gone negative, it can
only be dragging the total down, so it's strictly better to abandon it
and start fresh at the current element.
**Invariant:** `currentSum` always holds the maximum sum of a subarray
*ending exactly at the current index*; `maxSum` holds the maximum over
all subarrays considered so far. Because `maxSum` is updated on every
iteration (not just when a new maximum is a "fresh start"), it correctly
captures the best subarray regardless of where it starts or ends.

## Dry Run

**Input:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

| i | nums[i] | currentSum = max(nums[i], currentSum + nums[i]) | maxSum = max(maxSum, currentSum) |
|---|---|---|---|
| 0 | -2 | max(-2, -2) = -2 | -2 |
| 1 | 1 | max(1, -2+1=-1) = 1 | 1 |
| 2 | -3 | max(-3, 1-3=-2) = -2 | 1 |
| 3 | 4 | max(4, -2+4=2) = 4 | 4 |
| 4 | -1 | max(-1, 4-1=3) = 3 | 4 |
| 5 | 2 | max(2, 3+2=5) = 5 | 5 |
| 6 | 1 | max(1, 5+1=6) = 6 | 6 |
| 7 | -5 | max(-5, 6-5=1) = 1 | 6 |
| 8 | 4 | max(4, 1+4=5) = 5 | 6 |

**Result:** `maxSum = 6` — matches expected output (subarray `[4, -1, 2, 1]`).

## JavaScript Solution

```js
function maxSubArray(nums) {
  // Start both trackers at the first element — a subarray must contain
  // at least one number, so an empty-subarray baseline of 0 would be
  // wrong for an all-negative input.
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous subarray, or abandon it and start
    // fresh here — whichever gives a larger sum ending at this index.
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Track the best sum seen anywhere, not just the one ending here.
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

## TypeScript Solution

```ts
function maxSubArray(nums: readonly number[]): number {
  if (nums.length === 0) {
    throw new Error('Input must contain at least one number');
  }

  // Safe: the length check above guarantees index 0 exists.
  let currentSum: number = nums[0]!;
  let maxSum: number = nums[0]!;

  for (let i = 1; i < nums.length; i++) {
    // Safe: i is bounded by the loop's `i < nums.length` condition.
    const value = nums[i]!;
    currentSum = Math.max(value, currentSum + value);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

## Time Complexity

O(n) — a single pass over the array, constant work per element.

## Space Complexity

O(1) — only two scalar accumulators, regardless of input size.

## Common Mistakes

- Resetting `currentSum` to `0` instead of comparing against starting
  fresh with `nums[i]` — breaks on all-negative arrays, since `0` isn't
  a valid "sum of a non-empty subarray."
- Only updating `maxSum` when `currentSum` is reset, instead of on every
  iteration — this misses cases where the best subarray sum occurs
  mid-extension, not at a reset point.
- Confusing this with the *subsequence* (non-contiguous) maximum sum
  problem, which is a different, trivial problem (just sum all positive
  numbers) — this problem requires contiguity.

## Interview Follow-up Questions

1. Can you also return the actual subarray (start and end indices), not
   just the sum?
2. How would you solve this with a divide-and-conquer approach instead,
   and what's its complexity compared to Kadane's?
3. What if the array were circular (the subarray can wrap from the end
   back to the start)?

## Similar Questions

- Maximum Product Subarray
- Best Time to Buy and Sell Stock
- Maximum Circular Subarray Sum

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
