# PF031 · Remove Duplicates from Sorted Array In-Place

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** arrays, two-pointers, in-place

## Problem Statement

Write a function `removeDuplicates(nums)` that removes duplicates from a
sorted array `nums` in place, so that each distinct value appears only
once at the front of the array, and returns the count of distinct
values. Do not allocate a second array.

## Input

`nums`: a sorted (ascending) array of numbers.

## Output

A number: the count of distinct values. As a side effect, the first
that-many positions of `nums` hold the distinct values in order (values
past that point are left in an unspecified state).

## Constraints

`0 <= nums.length <= 10^5`, `nums` is sorted in non-decreasing order

## Examples

| Input | Output | Why |
|---|---|---|
| `[1,1,2,2,3]` | `3` | Three distinct values: `1, 2, 3` |
| `[1,2,3]` | `3` | Already all distinct — nothing to remove |
| `[]` | `0` | No elements, no distinct values |

## Edge Cases

- Empty array → `0`, returned immediately without entering the loop
- No duplicates at all → every element is kept, return value equals the
  original length
- All elements identical → exactly `1` distinct value
- Single-element array → `1` (the loop from `j=1` never runs, and `i`
  stays at its initial `0`, so `i + 1 = 1`)

## Hints

1. Because the array is already sorted, every duplicate of a value sits
   immediately next to it — you never need to search the whole array to
   find duplicates, just compare each element to its neighbor.
2. Use two pointers: `i` marks the last position of the "clean, deduped"
   section built so far, and `j` scans ahead looking for the next value
   different from `nums[i]`.
3. Whenever `nums[j]` differs from `nums[i]`, it's a genuinely new
   distinct value — advance `i` by one and copy `nums[j]` into that new
   position, overwriting whatever was left behind by the compaction.

## Algorithm

**Pattern:** two-pointer in-place compaction, exploiting sortedness.
**Core insight:** because `nums` is sorted, all copies of any given value
are adjacent, so a duplicate is detected simply by comparing an element
to its immediate predecessor in the deduped section — no hash set or
extra memory is needed. `i` tracks the boundary of the deduped prefix
built so far; `j` scans forward, and every time it finds a value that
doesn't match `nums[i]`, that value is new and gets written into the
next slot of the deduped prefix.
**Invariant:** at all times, `nums[0..i]` contains every distinct value
seen so far, in original sorted order, with no duplicates.

## Dry Run

**Input:** `nums = [1,1,2,2,3]`

| j | nums[j] | nums[i] | differ? | action | i after | nums after |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | no | skip | 0 | `[1,1,2,2,3]` |
| 2 | 2 | 1 | yes | i++, nums[1]=2 | 1 | `[1,2,2,2,3]` |
| 3 | 2 | 2 | no | skip | 1 | `[1,2,2,2,3]` |
| 4 | 3 | 2 | yes | i++, nums[2]=3 | 2 | `[1,2,3,2,3]` |

Loop ends. **Result:** `i + 1 = 3` — matches expected output. The first
3 elements of `nums`, `[1, 2, 3]`, are the deduped values in order.

## JavaScript Solution

```js
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
```

## TypeScript Solution

```ts
function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
```

## Time Complexity

O(n) — a single pass through the array with `j`.

## Space Complexity

O(1) — modifies `nums` in place, using only two index variables.

## Common Mistakes

- Using `Array.from(new Set(nums))` — correctly deduplicates but
  allocates a new array, violating the in-place constraint this exercise
  is testing.
- Forgetting this technique relies on the array being *sorted* — the
  same two-pointer trick does not correctly deduplicate an unsorted
  array, since duplicates might not be adjacent.
- Off-by-one in the return value (`return i` instead of `return i + 1`)
  — `i` is a zero-based index into the deduped prefix, so the actual
  *count* of distinct values is `i + 1`.

## Interview Follow-up Questions

1. How would you adapt this to allow each value to appear at most
   *twice*, rather than exactly once?
2. Why does this two-pointer technique require the array to be sorted —
   what would you need to do differently for an unsorted array while
   still deduplicating in place?
3. How would you deduplicate a sorted *linked list* in place, and how
   does that differ from the array version?

## Similar Questions

- Find the Largest Number in an Array (see [pf017-find-largest-number-in-array.md](pf017-find-largest-number-in-array.md))
- Standard Iterative Binary Search (see [pf032-binary-search-iterative.md](pf032-binary-search-iterative.md))

---
[← Back to Programming Fundamentals](README.md)
