# Q1502 · Merge Sort

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Google, Meta, Adobe
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Sorting
**Concepts:** divide and conquer, stable merge of sorted halves

## Problem Statement

Implement `mergeSort(nums)`, which sorts an array of numbers in
ascending order using the merge sort algorithm: recursively divide the
array in half, sort each half, then merge the two sorted halves back
together.

## Input

`nums`: an array of numbers.

## Output

A new array containing the same elements, sorted in ascending order.

## Constraints

`0 <= nums.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [5,2,4,1,3]` | `[1,2,3,4,5]` | Sorted ascending |
| `nums = [1]` | `[1]` | Single element is trivially sorted |
| `nums = []` | `[]` | Empty array |

## Edge Cases

- Empty array → `[]`
- Single-element array → returned as-is (the recursion's base case)
- Array with duplicate values → must remain stable-sorted relative to
  each other if stability matters for the use case (this implementation
  is naturally stable, since the merge step always prefers the left
  half on ties)

## Hints

1. Sorting a large array directly is hard — what if you only had to
   merge two *already-sorted* smaller arrays together? Is that easier?
2. Recursively split the array in half until you reach base cases
   (arrays of length 0 or 1, which are trivially sorted), then merge
   pairs of sorted halves back together, one level at a time.
3. The merge step itself only needs a single pass with two pointers,
   one into each half, always taking the smaller of the two current
   elements — no re-comparison against already-placed elements is ever
   needed.

## Algorithm

**Pattern:** divide and conquer — recursively split, then merge sorted
halves.
**Core insight:** merging two *already-sorted* arrays into one sorted
array is a simple linear-time operation (a single pass with two
pointers, always taking the smaller current element from either side).
Merge sort exploits this by recursively splitting the array in half
until reaching trivially-sorted base cases (length 0 or 1), then merging
pairs of sorted halves back together at each level going back up the
recursion — since merging is O(n) and there are O(log n) levels of
splitting, the total work is O(n log n).
**Invariant:** every recursive call on a sub-array returns that
sub-array fully sorted; the merge step combines two already-correctly-
sorted inputs into one larger correctly-sorted output.

## Dry Run

**Input:** `nums = [5,2,4,1,3]`

| Step | Action |
|---|---|
| Split | `[5,2,4,1,3]` → `[5,2]` and `[4,1,3]` |
| Split further | `[5,2]` → `[5]`, `[2]`; `[4,1,3]` → `[4]`, `[1,3]` → `[1]`, `[3]` |
| Merge base cases | `[5]` and `[2]` merge to `[2,5]`; `[1]` and `[3]` merge to `[1,3]` |
| Merge next level | `[1,3]` and `[4]` merge to `[1,3,4]` |
| Merge top level | `[2,5]` and `[1,3,4]` merge to `[1,2,3,4,5]` |

**Result:** `[1,2,3,4,5]` — matches expected output.

## JavaScript Solution

```js
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append whichever side still has leftover elements — they're
  // already sorted, so no further comparison is needed.
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  return merge(left, right);
}
```

## TypeScript Solution

```ts
function merge(left: readonly number[], right: readonly number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i]! <= right[j]!) {
      result.push(left[i]!);
      i++;
    } else {
      result.push(right[j]!);
      j++;
    }
  }

  while (i < left.length) result.push(left[i++]!);
  while (j < right.length) result.push(right[j++]!);

  return result;
}

function mergeSort(nums: readonly number[]): number[] {
  if (nums.length <= 1) return [...nums];

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  return merge(left, right);
}
```

## Time Complexity

O(n log n) — O(log n) levels of splitting, O(n) total work merging at
each level.

## Space Complexity

O(n) — the merge step allocates new arrays; this implementation is not
in-place (an in-place merge sort is possible but significantly more
complex).

## Common Mistakes

- Using `<` instead of `<=` in the merge comparison — while both
  produce correctly *sorted* output, `<=` preferring the left half on
  ties is what makes this implementation stable (preserving the
  relative order of equal elements from the original array).
- Forgetting to append the leftover elements from whichever side didn't
  run out first — without those two trailing `while` loops, elements get
  silently dropped from the output.
- Re-slicing arrays repeatedly in a way that adds unnecessary overhead
  at very large scale — a production implementation might sort indices
  into a single shared buffer instead of allocating new arrays at every
  recursive level.

## Interview Follow-up Questions

1. How would you implement this in-place instead of allocating new
   arrays at every merge step?
2. Why is merge sort preferred over quicksort when stability matters,
   or when sorting a linked list?
3. How would you adapt merge sort to count the number of inversions in
   an array as a side effect of the merge step?

## Similar Questions

- Quick Sort (see [quick-sort.md](quick-sort.md))
- Bubble Sort (see [bubble-sort.md](bubble-sort.md))
- Merge Two Sorted Lists (see [../linked-list/merge-two-sorted-lists.md](../linked-list/merge-two-sorted-lists.md))

---
[← Back to 65-dsa](../README.md)
