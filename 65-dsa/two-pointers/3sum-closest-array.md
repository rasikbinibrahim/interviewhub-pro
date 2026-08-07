# Q6608 · 3Sum Closest (Sorted Array Two Pointers)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Two Pointers  
**Concepts:** two-pointers, sorting, arrays  

## Problem Statement

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is **closest** to `target`.

Return the **sum** of the three integers.

You may assume that each input would have exactly one solution.

## Input

- `nums`: `number[]` — integer array
- `target`: `number` — target integer

## Output

- `number` — sum of 3 integers closest to target

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [-1,2,1,-4], target = 1` | `2` | Sum closest to target is (-1 + 2 + 1 = 2) |
| `nums = [0,0,0], target = 1` | `0` | Sum closest to target is (0 + 0 + 0 = 0) |

## Algorithm

```javascript
function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];

      if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
        closestSum = currentSum;
      }

      if (currentSum < target) {
        left++;
      } else if (currentSum > target) {
        right--;
      } else {
        return currentSum; // Exact match found!
      }
    }
  }

  return closestSum;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N^2)` — sorting $O(N \log N)$ + $O(N^2)$ two-pointer traversal.
- **Space Complexity:** `O(1)` or $O(N)$ for sorting.
