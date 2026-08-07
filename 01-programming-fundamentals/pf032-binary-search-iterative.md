# PF032 · Standard Iterative Binary Search

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** binary-search, searching, arrays

## Problem Statement

Write a function `binarySearch(nums, target)` that returns the index of
`target` in a sorted array `nums`, or `-1` if it isn't present, using an
iterative (not recursive) approach.

## Input

`nums`: a sorted (ascending) array of distinct numbers. `target`: the
number to search for.

## Output

The index of `target` in `nums`, or `-1` if not found.

## Constraints

`0 <= nums.length <= 10^5`, `nums` is sorted in strictly ascending order

## Examples

| Input | Output | Why |
|---|---|---|
| `nums=[1,3,5,7,9], target=7` | `3` | `7` is at index 3 |
| `nums=[1,3,5,7,9], target=4` | `-1` | `4` isn't present in the array |
| `nums=[], target=1` | `-1` | Nothing to search in an empty array |

## Edge Cases

- Empty array → `-1` immediately (loop never runs, since `left > right`
  from the start)
- Target at the first or last index → still found correctly, since the
  search range always includes both ends
- Target smaller than every element, or larger than every element →
  `-1`, the search range shrinks to nothing without a match
- Single-element array → either found at index `0` or `-1`

## Hints

1. Because the array is sorted, checking the middle element tells you
   which half the target must be in (if it's present at all) — what
   does that let you eliminate on every comparison?
2. Maintain a `left`/`right` window over the current search range.
   Compare the target to the middle element: if they match, you're done;
   if the target is larger, the entire left half (including the middle)
   can be discarded; if smaller, discard the right half instead.
3. The loop continues as long as `left <= right` — note the `<=`, not
   `<`; using `<` incorrectly skips checking the case where the search
   range has narrowed to exactly one remaining element.

## Algorithm

**Pattern:** binary search via a shrinking `[left, right]` window.
**Core insight:** sortedness lets you discard half of the remaining
search space with every single comparison — checking the middle element
against `target` tells you definitively whether `target` (if present)
lies strictly to the left or strictly right of that middle position, so
that entire half can be eliminated without ever inspecting its elements
individually.
**Invariant:** at the start of every loop iteration, if `target` exists
in `nums`, its index is guaranteed to lie within `[left, right]`
(inclusive); the loop only terminates once that range is exhausted
(`left > right`) or the target has been found.

## Dry Run

**Input:** `nums = [1,3,5,7,9], target = 7`

| left | right | mid | nums[mid] | comparison | next |
|---|---|---|---|---|---|
| 0 | 4 | 2 | 5 | `5 < 7` | `left = 3` |
| 3 | 4 | 3 | 7 | `7 === 7` | return `3` |

**Result:** `3` — matches expected output.

## JavaScript Solution

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

## TypeScript Solution

```ts
function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

## Time Complexity

O(log n) — the search range halves with every comparison.

## Space Complexity

O(1) — three scalar variables (`left`, `right`, `mid`), regardless of
input size; the recursive version would instead use O(log n) call-stack
space.

## Common Mistakes

- Using `left < right` as the loop condition instead of `left <= right`
  — incorrectly skips the final comparison when the search range has
  narrowed to a single remaining element, missing a target that's
  actually present.
- Computing `mid` as `(left + right) / 2` without `Math.floor` — leaves
  a fractional index, which doesn't index correctly into the array.
- Assuming the array is sorted when it isn't — binary search's
  correctness depends entirely on sortedness; running it on unsorted
  data produces meaningless results without any error or warning.

## Interview Follow-up Questions

1. How would you adapt this to find the *first* or *last* occurrence of
   a target when duplicates are allowed?
2. `(left + right) / 2` can theoretically overflow in languages with
   fixed-width integers — how would you compute the midpoint safely, and
   does this matter in JavaScript?
3. How would you write this recursively instead, and what's the
   trade-off versus the iterative version?

## Similar Questions

- Find Missing Number in Sequence (see [pf033-find-missing-number-in-sequence.md](pf033-find-missing-number-in-sequence.md))
- Calculate Power Pow(x, n) (see [pf030-calculate-power-x-n.md](pf030-calculate-power-x-n.md))

---
[← Back to Programming Fundamentals](README.md)
