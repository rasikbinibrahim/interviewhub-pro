# Q6647 · Search in Rotated Sorted Array

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Binary Search
**Concepts:** binary-search, rotated-array

## Problem Statement

Write a function `search(nums, target)` that returns the index of
`target` in `nums` — an array that was originally sorted in ascending
order, then rotated at some unknown pivot — or `-1` if it isn't present,
in O(log n) time.

## Input

`nums`: a rotated, originally-ascending array of distinct integers.
`target`: the value to locate.

## Output

The index of `target` in `nums`, or `-1` if not found.

## Constraints

`1 <= nums.length <= 5000`, all values in `nums` are distinct

## Examples

| Input | Output | Why |
|---|---|---|
| `nums=[4,5,6,7,0,1,2], target=0` | `4` | `0` sits at index 4 after the rotation |
| `nums=[4,5,6,7,0,1,2], target=3` | `-1` | `3` isn't present anywhere in the array |
| `nums=[1], target=0` | `-1` | Single-element array without the target |

## Edge Cases

- Array not actually rotated (pivot at index 0) → behaves like ordinary
  binary search
- `target` at the rotation pivot itself → still found correctly, since
  the pivot index is just another position the search can land on
- Single-element array → `0` if it matches `target`, else `-1`
- `target` not present → `-1`

## Hints

1. A rotated sorted array isn't fully sorted, so plain binary search
   doesn't directly apply — but at any midpoint, is there always at
   least *one* half (left or right of mid) that's guaranteed to still be
   in sorted order?
2. Compare `nums[left]` to `nums[mid]`: if `nums[left] <= nums[mid]`,
   the left half is the sorted one; otherwise, the right half must be.
3. Once you know which half is sorted, you can cheaply check whether
   `target` falls within that sorted half's value range — if it does,
   search there; if it doesn't, `target` (if present at all) must be in
   the other, still-unsorted-looking half.

## Algorithm

**Pattern:** modified binary search using the "one half is always
sorted" property of a rotated sorted array.
**Core insight:** although the whole array isn't sorted, splitting it at
any midpoint always leaves at least one of the two halves in genuine
ascending order (the rotation pivot can only fall in one of them).
Identifying which half is sorted lets you cheaply test — using simple
value-range comparisons, no nested search needed — whether `target`
could possibly be in that sorted half; if so, recurse there, and if not,
`target` must be in the other half (if it's present at all), so recurse
there instead. Either way, exactly one half is eliminated per
comparison, preserving the O(log n) halving that makes binary search
fast.
**Invariant:** at the start of every loop iteration, if `target` exists
in `nums`, its index is guaranteed to lie within `[left, right]`.

## Dry Run

**Input:** `nums = [4,5,6,7,0,1,2], target = 0`

| left | right | mid | nums[mid] | which half sorted? | target in that range? | action |
|---|---|---|---|---|---|---|
| 0 | 6 | 3 | 7 | left (`nums[0]=4 <= nums[3]=7`) | `4 <= 0 < 7`? no | search right: `left = 4` |
| 4 | 6 | 5 | 1 | left (`nums[4]=0 <= nums[5]=1`) | `0 <= 0 < 1`? yes | search left: `right = 4` |
| 4 | 4 | 4 | 0 | — | `nums[mid] === target` | return `4` |

**Result:** `4` — matches expected output.

## JavaScript Solution

```js
function search(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Check left sorted portion
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // Right sorted portion
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

## TypeScript Solution

```ts
function search(nums: number[], target: number): number {
  let left = 0;
  let right: number = nums.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
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

  return -1;
}
```

## Time Complexity

O(log n) — one half of the search space is eliminated on every
iteration, exactly as in standard binary search.

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Finding the rotation pivot first with a separate search, then running
  two ordinary binary searches on the two sorted halves — correct, but
  more code than needed; this problem can be solved with a single
  modified binary search pass.
- Using `<` instead of `<=` when comparing `nums[left]` to `nums[mid]`
  to decide which half is sorted — with only two elements remaining
  (`left === mid`), the comparison must still correctly identify the
  left half as sorted, which `<=` (not `<`) guarantees.
- Getting the value-range boundary comparisons backwards (`<` vs `<=`)
  when checking whether `target` falls within the sorted half — an
  off-by-one here can incorrectly eliminate the half that actually
  contains `target`.

## Interview Follow-up Questions

1. How would this change if `nums` could contain duplicate values (a
   classic harder variant of this problem)?
2. How would you first find the index of the rotation pivot itself,
   using a similar technique?
3. How would you adapt this to search in an array rotated an unknown
   number of *times*, or one that could also be reversed?

## Similar Questions

- Standard Iterative Binary Search (see [../../01-programming-fundamentals/pf032-binary-search-iterative.md](../../01-programming-fundamentals/pf032-binary-search-iterative.md))
- Find First and Last Position of Element in Sorted Array (see [find-first-and-last-position-in-sorted-array.md](find-first-and-last-position-in-sorted-array.md))
