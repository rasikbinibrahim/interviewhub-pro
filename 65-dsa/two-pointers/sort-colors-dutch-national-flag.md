# Q6609 · Sort Colors (Dutch National Flag 3-Pointer Algorithm)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Two Pointers  
**Concepts:** two-pointers, sorting, in-place, dutch-national-flag  

## Problem Statement

Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

You must solve this problem **without** using the library's sort function.

## Input

- `nums`: `number[]` — array of integers `0`, `1`, `2`

## Output

- Modifies `nums` in-place (void return)

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2,0,2,1,1,0]` | `[0,0,1,1,2,2]` | Sorted 0s, 1s, and 2s in-place |

## Algorithm

**Pattern:** 3-Pointer Dutch National Flag Partitioning  
- `low`: Boundary for `0`s (red).
- `mid`: Current scanner pointer for `1`s (white).
- `high`: Boundary for `2`s (blue).

```javascript
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else { // nums[mid] === 2
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single-pass traversal.
- **Space Complexity:** `O(1)` — in-place pointers.
