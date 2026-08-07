# Q901 · Binary Search

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Meta, Adobe, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Binary Search
**Concepts:** divide and conquer, sorted-array invariant, boundary conditions

## Problem Statement

Given a sorted (ascending), zero-indexed array of distinct integers
`nums` and a target integer `target`, return the index of `target` in
`nums`, or `-1` if it isn't present. Your solution must run in O(log n)
time.

## Input

- `nums`: a sorted array of distinct integers
- `target`: an integer to search for

## Output

The index of `target` in `nums`, or `-1` if not found.

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i], target <= 10^4`
- `nums` is sorted in strictly ascending order (no duplicates).
- Must run in O(log n) time — a linear scan is correct but does not
  satisfy the stated requirement.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [-1,0,3,5,9,12], target = 9` | `4` | `nums[4] === 9` |
| `nums = [-1,0,3,5,9,12], target = 2` | `-1` | `2` isn't in the array |
| `nums = [5], target = 5` | `0` | Single-element array, target is that element |

## Edge Cases

- Target smaller than every element, or larger than every element →
  `-1`, and the search space must shrink to nothing without error.
- Single-element array, target present or absent → both must resolve
  correctly in one comparison.
- Target equal to the first or last element → boundary indices must be
  included, not accidentally excluded by an off-by-one `left`/`right`
  update.

## Hints

1. Since the array is sorted, comparing `target` against the *middle*
   element tells you which half of the array could possibly contain it
   — you never need to look at the other half at all.
2. Maintain a shrinking `[left, right]` window that always contains
   `target` if it exists anywhere in the array; each comparison against
   the midpoint lets you discard one entire half of the current window.
3. Be precise about the boundary updates: if `nums[mid] < target`, the
   entire left half including `mid` is provably too small, so the new
   `left` must be `mid + 1`, not `mid` — including `mid` again would
   risk an infinite loop.

## Algorithm

**Pattern:** binary search — divide and conquer on a sorted array.
**Core insight:** because `nums` is sorted, a single comparison against
the middle element (`nums[mid]` vs. `target`) is enough to determine
which half of the remaining search space could still contain the
target, letting you discard the other half entirely without examining
any of its elements. Repeating this halves the search space every
iteration.
**Invariant:** if `target` exists in `nums`, it is always within
`nums[left..right]` at the start of every iteration — the search
window never accidentally excludes the target while shrinking.

## Dry Run

**Input:** `nums = [-1, 0, 3, 5, 9, 12]`, `target = 9`

| Step | left | right | mid | nums[mid] | Comparison | Action |
|---|---|---|---|---|---|---|
| 1 | 0 | 5 | 2 | 3 | `3 < 9` | target is in the right half → `left = mid + 1 = 3` |
| 2 | 3 | 5 | 4 | 9 | `9 === 9` | found — return `4` |

**Result:** `4` — matches expected output; the search space shrank from
6 elements to 3 to a single match in two comparisons.

## JavaScript Solution

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // avoids overflow in other languages, safe habit in JS too

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1; // target must be strictly right of mid
    } else {
      right = mid - 1; // target must be strictly left of mid
    }
  }

  return -1; // left > right means the search space is exhausted
}
```

## TypeScript Solution

```ts
function binarySearch(nums: readonly number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midValue = nums[mid];
    if (midValue === undefined) break; // noUncheckedIndexedAccess guard

    if (midValue === target) {
      return mid;
    }

    if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

## Time Complexity

O(log n) — the search window halves every iteration, so the loop runs at
most `log2(n)` times.

## Space Complexity

O(1) — three scalar variables (`left`, `right`, `mid`), regardless of
array size.

## Common Mistakes

- Computing `mid = (left + right) / 2` directly — in languages with
  fixed-width integers this can overflow for very large `left`/`right`;
  `left + Math.floor((right - left) / 2)` avoids it and is a good habit
  even where JS numbers don't overflow the same way.
- Using `left < right` as the loop condition instead of `left <= right`
  — this incorrectly skips checking the case where the search window has
  exactly one element left.
- Updating `left`/`right` to `mid` instead of `mid + 1`/`mid - 1` after
  a comparison — since `mid` has already been checked and ruled out,
  including it again in the next window causes an infinite loop when the
  window narrows to two elements.

## Interview Follow-up Questions

1. How would this change if the array contained duplicates and you
   needed the *first* occurrence of `target` specifically?
2. How would you adapt this to search a sorted array that's been rotated
   at an unknown pivot (Search in Rotated Sorted Array)?
3. How would you find the "insertion position" for a target that isn't
   present, i.e. where it *would* go to keep the array sorted?
4. Can you implement this recursively? What does the recursion depth
   tell you about the algorithm's time complexity?

## Similar Questions

- Search in Rotated Sorted Array
- Find First and Last Position of Element in Sorted Array
- Search Insert Position

---
[← Back to Binary Search](README.md) · [← Back to 65-dsa](../README.md)
