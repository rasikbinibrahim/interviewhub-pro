# Q6612 · Find Minimum in Rotated Sorted Array

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Search  
**Concepts:** binary-search, arrays, rotated-array  

## Problem Statement

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times.

Given the sorted rotated array `nums` of **unique** elements, return the **minimum element** of this array.

You must write an algorithm that runs in `O(log n)` time.

## Input

- `nums`: `number[]` — rotated sorted integer array

## Output

- `number` — minimum element value

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [3,4,5,1,2]` | `1` | Original array was [1,2,3,4,5] rotated 3 times |
| `nums = [4,5,6,7,0,1,2]` | `0` | Min element is 0 |

## Algorithm

**Pattern:** Binary Search Boundary Drop Comparison  
- If `nums[mid] > nums[right]`: Minimum element MUST be in right half (`left = mid + 1`).
- Otherwise: Minimum element is in left half inclusive (`right = mid`).

```javascript
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(\log N)` — binary search halving space.
- **Space Complexity:** `O(1)` — constant extra space.
