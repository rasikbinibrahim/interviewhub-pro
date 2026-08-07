# Q6528 · Maximum Subarray (Kadane's Algorithm)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, dynamic-programming, kadanes-algorithm  

## Problem Statement

Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.

## Input

- `nums`: `number[]` — array of integers

## Output

- `number` — maximum sum of any contiguous subarray

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [-2,1,-3,4,-1,2,1,-5,4]` | `6` | Subarray `[4,-1,2,1]` has the largest sum = 6 |
| `nums = [1]` | `1` | Single element |
| `nums = [5,4,-1,7,8]` | `23` | Entire array sum = 23 |

## Edge Cases

- Array with all negative numbers `[-5, -2, -8, -1]` -> returns `-1` (largest single element)
- Single element array `[5]` -> returns `5`

## Hints

1. **Kadane's Algorithm**: At each index `i`, decide whether to add `nums[i]` to the existing subarray sum (`currentSum + nums[i]`) OR start a brand new subarray starting at `nums[i]` (`nums[i]` itself).
2. Local transition: `currentSum = Math.max(nums[i], currentSum + nums[i])`.
3. Global tracking: `maxSum = Math.max(maxSum, currentSum)`.
4. Initialize both `currentSum` and `maxSum` to `nums[0]`. Loop `i` from `1` to `nums.length - 1`.

## Algorithm

**Pattern:** Dynamic Programming / Local vs Global Maxima Tracking  
**Core Insight:** If `currentSum` becomes negative, it can only drag down the sum of any subsequent subarray, so resetting the subarray start to `nums[i]` is always optimal.

## Dry Run

`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`:
- `currentSum = -2`, `maxSum = -2`.
- `i = 1 (1)`: `currentSum = max(1, -2 + 1) = 1`, `maxSum = max(-2, 1) = 1`.
- `i = 2 (-3)`: `currentSum = max(-3, 1 + -3) = -2`, `maxSum = 1`.
- `i = 3 (4)`: `currentSum = max(4, -2 + 4) = 4`, `maxSum = max(1, 4) = 4`.
- `i = 4 (-1)`: `currentSum = max(-1, 4 + -1) = 3`, `maxSum = 4`.
- `i = 5 (2)`: `currentSum = max(2, 3 + 2) = 5`, `maxSum = 5`.
- `i = 6 (1)`: `currentSum = max(1, 5 + 1) = 6`, `maxSum = 6`.
- Result: `6`.

## JavaScript Solution

```js
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

## TypeScript Solution

```ts
function maxSubArray(nums: number[]): number {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

## Time Complexity

`O(N)` — single linear pass through `nums`.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Initializing `currentSum` or `maxSum` to `0` instead of `nums[0]`, which fails when `nums` contains only negative numbers like `[-5, -2, -8]`.

## Follow-Up Questions

1. How would you modify Kadane's algorithm to return the starting and ending indices `[start, end]` of the maximum subarray?

## Similar Questions

- Maximum Product Subarray
- Degree of an Array
