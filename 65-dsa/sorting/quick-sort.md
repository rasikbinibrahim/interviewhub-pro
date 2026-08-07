# Q1503 · Quick Sort

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Google, Meta, Adobe, Oracle
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Sorting
**Concepts:** divide and conquer, in-place partitioning (Lomuto scheme)

## Problem Statement

Implement `quickSort(nums)`, which sorts an array of numbers in
ascending order in place, using the quicksort algorithm: choose a
pivot element, partition the array so smaller elements come before it
and larger elements come after, then recursively sort each partition.

## Input

`nums`: an array of numbers.

## Output

The same array, sorted in ascending order.

## Constraints

`0 <= nums.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [5,2,4,1,3]` | `[1,2,3,4,5]` | Sorted ascending |
| `nums = [1]` | `[1]` | Single element is trivially sorted |
| `nums = []` | `[]` | Empty array |

## Edge Cases

- Empty or single-element array → base case, no partitioning needed
- Already-sorted or reverse-sorted array with a naive "always pick the
  last element" pivot choice → degrades to O(n^2) worst-case behavior,
  which is why real implementations often randomize the pivot choice
- All identical elements → every comparison against the pivot goes the
  same direction, still correctly handled but worth tracing through

## Hints

1. Rather than merging sorted halves (like merge sort), quicksort
   commits to a pivot value and figures out its *final sorted position*
   directly — what property must every element on the pivot's left and
   right satisfy once partitioning is done?
2. The partition step walks through the array, using a boundary index
   to track "everything before this point is confirmed smaller than the
   pivot" — every time a smaller element is found, it's swapped into
   that boundary and the boundary advances.
3. After partitioning, the pivot itself lands in its correct final
   sorted position, splitting the array into "everything smaller"
   (left) and "everything larger" (right) — recursively sorting each
   side independently, using the same partitioning process, completes
   the sort.

## Algorithm

**Pattern:** divide and conquer — in-place partitioning around a pivot
(Lomuto partition scheme).
**Core insight:** rather than merging pre-sorted halves, quicksort picks
a pivot and partitions the array around it in a single pass: every
element smaller than the pivot gets moved before a running boundary
index, and everything else stays after it. Once the pass completes, the
pivot is swapped into that boundary position — which is now provably its
correct final sorted index, since everything before it is smaller and
everything after it is greater or equal. The two resulting partitions
are then sorted recursively and independently.
**Invariant:** during partitioning, everything in `nums[low..boundary]`
(exclusive of the current scan position) is confirmed smaller than the
pivot; after partitioning completes, the pivot sits at its correct
final sorted position, with the rest of the array correctly split
around it.

## Dry Run

**Input:** `nums = [5,2,4,1,3]` (choosing the last element, `3`, as
pivot)

| Step | i (boundary) | j (scan) | nums[j] vs pivot(3) | Action | Array state |
|---|---|---|---|---|---|
| start | -1 | 0 | 5 > 3 | no swap | `[5,2,4,1,3]` |
| | -1 | 1 | 2 <= 3 | i=0, swap(0,1) | `[2,5,4,1,3]` |
| | 0 | 2 | 4 > 3 | no swap | `[2,5,4,1,3]` |
| | 0 | 3 | 1 <= 3 | i=1, swap(1,3) | `[2,1,4,5,3]` |
| end scan | 1 | — | — | swap pivot into position i+1=2 | `[2,1,3,5,4]` |

Pivot `3` is now at index 2, its correct final position. Recursively
sort `[2,1]` (indices 0-1) and `[5,4]` (indices 3-4).

**Result (after full recursion):** `[1,2,3,4,5]` — matches expected
output.

## JavaScript Solution

```js
function partition(nums, low, high) {
  const pivot = nums[high];
  let boundary = low - 1;

  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      boundary++;
      const temp = nums[boundary];
      nums[boundary] = nums[j];
      nums[j] = temp;
    }
  }

  // Place the pivot in its correct final position.
  const temp = nums[boundary + 1];
  nums[boundary + 1] = nums[high];
  nums[high] = temp;

  return boundary + 1;
}

function quickSortHelper(nums, low, high) {
  if (low < high) {
    const pivotIndex = partition(nums, low, high);
    quickSortHelper(nums, low, pivotIndex - 1);
    quickSortHelper(nums, pivotIndex + 1, high);
  }
}

function quickSort(nums) {
  quickSortHelper(nums, 0, nums.length - 1);
  return nums;
}
```

## TypeScript Solution

```ts
function partition(nums: number[], low: number, high: number): number {
  const pivot = nums[high]!;
  let boundary = low - 1;

  for (let j = low; j < high; j++) {
    if (nums[j]! <= pivot) {
      boundary++;
      const temp = nums[boundary]!;
      nums[boundary] = nums[j]!;
      nums[j] = temp;
    }
  }

  const temp = nums[boundary + 1]!;
  nums[boundary + 1] = nums[high]!;
  nums[high] = temp;

  return boundary + 1;
}

function quickSortHelper(nums: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(nums, low, high);
    quickSortHelper(nums, low, pivotIndex - 1);
    quickSortHelper(nums, pivotIndex + 1, high);
  }
}

function quickSort(nums: number[]): number[] {
  quickSortHelper(nums, 0, nums.length - 1);
  return nums;
}
```

## Time Complexity

O(n log n) average case; O(n^2) worst case (e.g. an already-sorted array
with a naive last-element pivot choice, causing maximally unbalanced
partitions every time).

## Space Complexity

O(log n) average case for the recursion call stack (O(n) worst case for
the same unbalanced-partition scenario).

## Common Mistakes

- Always choosing a fixed pivot position (e.g. always the last element)
  in production code — vulnerable to O(n^2) worst-case behavior on
  already-sorted or adversarially-crafted input; randomizing the pivot
  choice mitigates this.
- Off-by-one errors in the partition boundary tracking — the boundary
  starts at `low - 1` specifically so the first qualifying swap lands at
  index `low`.
- Confusing quicksort's in-place partitioning with merge sort's
  separate-array merging — the two algorithms solve the same problem
  with fundamentally different mechanics and different space
  complexity.

## Interview Follow-up Questions

1. How would randomizing the pivot choice help avoid the O(n^2) worst
   case on already-sorted input?
2. How does the Hoare partition scheme differ from the Lomuto scheme
   used here, and what's the tradeoff?
3. How would you find the k-th smallest element in an unsorted array in
   average O(n) time, building on quicksort's partitioning step
   (quickselect)?

## Similar Questions

- Merge Sort (see [merge-sort.md](merge-sort.md))
- Bubble Sort (see [bubble-sort.md](bubble-sort.md))
- Kth Largest Element in an Array

---
[← Back to 65-dsa](../README.md)
