# Q6597 · Minimum Size Subarray Sum (Variable Sliding Window)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Sliding Window  
**Concepts:** sliding-window, arrays, two-pointers, subarray-sum  

## Problem Statement

Given an array of positive integers `nums` and a positive integer `target`, return the **minimal length** of a subarray whose sum is **greater than or equal to** `target`. If there is no such subarray, return `0` instead.

## Input

- `target`: `number` — target sum threshold
- `nums`: `number[]` — positive integer array

## Output

- `number` — minimum subarray length, or `0` if impossible

## Constraints

- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `target = 7, nums = [2,3,1,2,4,3]` | `2` | Subarray `[4, 3]` has minimal length 2 with sum 7 >= 7 |
| `target = 4, nums = [1,4,4]` | `1` | Subarray `[4]` has minimal length 1 |
| `target = 11, nums = [1,1,1,1,1,1,1,1]` | `0` | Total sum 8 < 11 |

## Edge Cases

- `sum(nums) < target` -> returns `0`

## Hints

1. **Variable Sliding Window**:
   - Expand `right` pointer to add `nums[right]` to `currentSum`.
   - While `currentSum >= target`:
     - Update `minLen = Math.min(minLen, right - left + 1)`.
     - Shrink window by subtracting `nums[left]` from `currentSum` and incrementing `left++`.
2. Return `minLen === Infinity ? 0 : minLen`.

## Algorithm

**Pattern:** Two-Pointer Expand/Shrink Variable Sliding Window  
**Core Insight:** Because all numbers are strictly positive, the subarray sum functions as a monotonic function — growing as `right` expands and shrinking as `left` advances.

## Dry Run

`target = 7, nums = [2, 3, 1, 2, 4, 3]`:
- `right = 0 (2)`: `sum = 2`.
- `right = 1 (3)`: `sum = 5`.
- `right = 2 (1)`: `sum = 6`.
- `right = 3 (2)`: `sum = 8 >= 7`. `minLen = 4`. Shrink `left = 1` (`sum = 6`).
- `right = 4 (4)`: `sum = 10 >= 7`. `minLen = 4`. Shrink `left = 2` (`sum = 7 >= 7`). `minLen = 3`. Shrink `left = 3` (`sum = 6`).
- `right = 5 (3)`: `sum = 9 >= 7`. Shrink `left = 4` (`sum = 7 >= 7`). `minLen = 2`. Shrink `left = 5` (`sum = 3`).
- Return `2`.

## JavaScript Solution

```js
function minSubArrayLen(target, nums) {
  let left = 0;
  let currentSum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    // Shrink window while sum condition is satisfied
    while (currentSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      currentSum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

## TypeScript Solution

```ts
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0;
  let currentSum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    while (currentSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      currentSum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

## Time Complexity

`O(N)` — both `right` and `left` pointers traverse array at most once.

## Space Complexity

`O(1)` — constant extra space.

## Common Mistakes

- Using nested loops ($O(N^2)$ time) or Binary Search on Prefix Sums ($O(N \log N)$ time), when two-pointer sliding window achieves optimal $O(N)$ linear time.

## Follow-Up Questions

1. How would you solve this problem if `nums` contained negative integers? (Sliding window fails; requires Prefix Sum + Monotonic Deque / Binary Search).

## Similar Questions

- Minimum Window Substring
- Subarray Product Less Than K
