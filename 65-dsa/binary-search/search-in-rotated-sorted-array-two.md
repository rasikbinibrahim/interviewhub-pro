# Q6554 · Search in Rotated Sorted Array II (With Duplicates)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, LinkedIn  
**Interview Frequency:** ★★★★☆  
**Category:** Binary Search  
**Concepts:** binary-search, rotated-array, duplicates, worst-case-linear  

## Problem Statement

There is an integer array `nums` sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, `nums` is **rotated** at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`.

Given the array `nums` after the rotation and an integer `target`, return `true` if `target` is in `nums`, or `false` if it is not in `nums`.

You must decrease the overall operation steps as much as possible.

## Input

- `nums`: `number[]` — rotated sorted array with duplicates
- `target`: `number` — value to search for

## Output

- `boolean` — `true` if `target` exists in `nums`, `false` otherwise

## Constraints

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i], target <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2,5,6,0,0,1,2], target = 0` | `true` | Target 0 exists at index 3 and 4 |
| `nums = [2,5,6,0,0,1,2], target = 3` | `false` | Target 3 does not exist |

## Edge Cases

- Array with all identical elements `[1, 1, 1, 1, 1], target = 0` -> worst case $O(N)$
- Single element array `[1], target = 1` -> `true`

## Hints

1. **Handling Duplicates**: When `nums[left] === nums[mid] === nums[right]`, we cannot determine which half is sorted!
   - Solution: Increment `left++` and decrement `right--` to skip identical boundary duplicates.
2. **Determining Sorted Half**:
   - If `nums[left] <= nums[mid]`: Left half `[left...mid]` is sorted.
     - If `nums[left] <= target && target < nums[mid]`: search left `right = mid - 1`. Else search right `left = mid + 1`.
   - Else: Right half `[mid...right]` is sorted.
     - If `nums[mid] < target && target <= nums[right]`: search right `left = mid + 1`. Else search left `right = mid - 1`.

## Algorithm

**Pattern:** Modified Binary Search with Duplicate Boundary Shrinking  
**Core Insight:** Skipping duplicates when `nums[left] === nums[mid] === nums[right]` resolves ambiguity while preserving binary search efficiency for non-duplicate elements.

## Dry Run

`nums = [2, 5, 6, 0, 0, 1, 2], target = 0`:
- `left = 0` (2), `right = 6` (2), `mid = 3` (val 0). `nums[mid] === target` -> return `true`.

## JavaScript Solution

```js
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return true;

    // Skip duplicates at boundaries
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
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

## TypeScript Solution

```ts
function search(nums: number[], target: number): boolean {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return true;

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

## Time Complexity

Average `O(log N)`, Worst Case `O(N)` (when all array elements are identical duplicates).

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Not shrinking both `left++` and `right--` on duplicate matches, leading to infinite `while` loops.

## Follow-Up Questions

1. Why does the presence of duplicate elements degrade the worst-case time complexity of rotated binary search from $O(\log N)$ to $O(N)$?

## Similar Questions

- Search in Rotated Sorted Array I
- Find Minimum in Rotated Sorted Array II
