# Q6610 · Next Permutation (Lexicographical Array Reversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, lexicographical-order  

## Problem Statement

A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order.

The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. If such an arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

The replacement must be **in-place** and use only constant extra memory.

## Input

- `nums`: `number[]` — integer array

## Output

- Modifies `nums` in-place (void return)

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3]` | `[1,3,2]` | Next lexicographical order |
| `nums = [3,2,1]` | `[1,2,3]` | Maximum permutation wraps to lowest order |

## Algorithm

**Pattern:** Pivot Search Swap & Tail Reversal  
1. Find first decreasing element `i` from right: `nums[i] < nums[i + 1]`.
2. Find element `j` from right greater than `nums[i]`: `nums[j] > nums[i]`.
3. Swap `nums[i]` and `nums[j]`.
4. Reverse subarray from `i + 1` to end.

```javascript
function nextPermutation(nums) {
  let i = nums.length - 2;

  // Step 1: Find first decreasing element from right
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // Step 2: Find element just larger than nums[i]
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Step 3: Swap nums[i] and nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // Step 4: Reverse suffix starting at i + 1
  let left = i + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single linear pass.
- **Space Complexity:** `O(1)` — constant space in-place modification.
