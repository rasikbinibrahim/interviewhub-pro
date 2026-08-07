# Q6613 · Search in Rotated Sorted Array II (Handling Duplicates)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Binary Search  
**Concepts:** binary-search, rotated-array, duplicates  

## Problem Statement

Given a rotated sorted array `nums` that may contain **duplicates** and a target value `target`, return `true` if `target` is in `nums`, or `false` if it is not.

## Algorithm

**Pattern:** Binary Search Shrink Duplicates  
- When `nums[left] === nums[mid] === nums[right]`, shrink boundary `left++` and `right--` to eliminate ambiguity.

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return true;

    // Handle duplicates
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(\log N)` average, `O(N)` worst-case when all elements are duplicates.
- **Space Complexity:** `O(1)` constant space.
