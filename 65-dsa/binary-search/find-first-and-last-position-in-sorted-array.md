# Q6652 · Find First and Last Position of Element in Sorted Array

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Binary Search
**Concepts:** binary-search, bounds, sorted-array

## Problem Statement

Write a function `searchRange(nums, target)` that returns the first and
last index at which `target` appears in a sorted array `nums`, as
`[first, last]`, or `[-1, -1]` if `target` isn't present — in O(log n)
time.

## Input

`nums`: a sorted (ascending) array of integers, possibly with
duplicates. `target`: the value to locate.

## Output

A two-element array `[first, last]`: the first and last index of
`target`, or `[-1, -1]` if not found.

## Constraints

`0 <= nums.length <= 10^5`, `nums` is sorted in non-decreasing order

## Examples

| Input | Output | Why |
|---|---|---|
| `nums=[5,7,7,8,8,10], target=8` | `[3,4]` | `8` first appears at index 3, last at index 4 |
| `nums=[5,7,7,8,8,10], target=6` | `[-1,-1]` | `6` isn't present anywhere |
| `nums=[], target=0` | `[-1,-1]` | Empty array — nothing to find |

## Edge Cases

- Empty array → `[-1,-1]`
- `target` not present at all → `[-1,-1]`
- `target` appears exactly once → `first === last`, both equal that
  single index
- Every element equals `target` → `first = 0`, `last = nums.length - 1`

## Hints

1. A single binary search finds *some* occurrence of `target`, but not
   necessarily the first or last one — how could you bias a binary
   search to keep looking further left (or right) even after it finds a
   match?
2. Run two separate binary searches: one that, upon finding `target`,
   records the index but keeps narrowing toward the *left* half in
   search of an earlier occurrence; another that does the mirror image,
   narrowing toward the *right* half.
3. Each of those two searches is still a standard O(log n) binary
   search — the only change is what happens on a match: instead of
   returning immediately, record the match and keep shrinking the search
   window in the chosen direction.

## Algorithm

**Pattern:** two biased binary searches (leftmost-match and
rightmost-match).
**Core insight:** because `nums` is sorted, every occurrence of `target`
forms a single contiguous block — so finding the boundaries of that
block is really two independent "find the boundary" searches. Each
search behaves like ordinary binary search, except that on finding a
match, it doesn't stop: it records the match as the current best answer
and continues narrowing in the direction that could still reveal an
earlier (or later) occurrence, until the search space is exhausted.
**Invariant:** for the left-bound search, `bound` always holds the
leftmost index found *so far* where `nums[index] === target`; since the
search keeps narrowing toward `mid - 1` after every match, by the time
the loop ends `bound` holds the true leftmost occurrence (the mirror
argument holds for the right-bound search).

## Dry Run

**Input:** `nums = [5,7,7,8,8,10], target = 8` — finding the **first**
occurrence (`isFirst = true`):

| left | right | mid | nums[mid] | comparison | action |
|---|---|---|---|---|---|
| 0 | 5 | 2 | 7 | `7 < 8` | `left = 3` |
| 3 | 5 | 4 | 8 | match! `bound = 4` | `right = 3` (keep looking left) |
| 3 | 3 | 3 | 8 | match! `bound = 3` | `right = 2` (keep looking left) |
| 3 | 2 | – | – | `left > right` | loop ends |

First-bound result: `3`. The mirrored search for the **last** occurrence
similarly converges to `4`.

**Result:** `[3, 4]` — matches expected output.

## JavaScript Solution

```js
function searchRange(nums, target) {
  function findBound(isFirst) {
    let left = 0, right = nums.length - 1;
    let bound = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return bound;
  }

  return [findBound(true), findBound(false)];
}
```

## TypeScript Solution

```ts
function searchRange(nums: number[], target: number): [number, number] {
  function findBound(isFirst: boolean): number {
    let left = 0;
    let right: number = nums.length - 1;
    let bound = -1;
    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return bound;
  }

  return [findBound(true), findBound(false)];
}
```

## Time Complexity

O(log n) — two independent binary searches, each O(log n).

## Space Complexity

O(1) — a fixed number of scalar variables per search (the nested
function itself doesn't add auxiliary space proportional to input size).

## Common Mistakes

- Finding one occurrence with a standard binary search, then linearly
  scanning left and right from it to find the full range — correct, but
  degrades to O(n) in the worst case (e.g. an array where every element
  equals `target`).
- Stopping the search immediately upon the first match instead of
  continuing to narrow toward the boundary — returns *some* valid index
  containing `target`, but not necessarily the first or last one.
- Mixing up which direction to narrow for the first-bound versus
  last-bound search — narrowing the wrong way after a match causes the
  search to converge on the wrong boundary.

## Interview Follow-up Questions

1. How would you count the total number of occurrences of `target`,
   given the first and last indices?
2. How would you generalize this to find the boundary of the *first*
   value greater than or equal to `target` (a "lower bound" search), even
   when `target` itself isn't present?
3. Why can't you find both bounds correctly with just a single binary
   search pass?

## Similar Questions

- Standard Iterative Binary Search (see [../../01-programming-fundamentals/pf032-binary-search-iterative.md](../../01-programming-fundamentals/pf032-binary-search-iterative.md))
- Search in Rotated Sorted Array (see [search-in-rotated-sorted-array.md](search-in-rotated-sorted-array.md))
