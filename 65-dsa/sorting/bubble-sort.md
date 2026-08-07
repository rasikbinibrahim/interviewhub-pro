# Q1501 · Bubble Sort

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Sorting
**Concepts:** adjacent-swap sorting, early-exit optimization

## Problem Statement

Implement `bubbleSort(nums)`, which sorts an array of numbers in
ascending order in place, using the bubble sort algorithm: repeatedly
step through the array, swapping adjacent elements that are out of
order, until no swaps are needed.

## Input

`nums`: an array of numbers.

## Output

The same array, sorted in ascending order.

## Constraints

`0 <= nums.length <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [5,2,4,1,3]` | `[1,2,3,4,5]` | Sorted ascending |
| `nums = [1,2,3]` | `[1,2,3]` | Already sorted — no swaps needed |
| `nums = []` | `[]` | Empty array |

## Edge Cases

- Empty array → `[]`, no passes needed
- Already-sorted array → the early-exit optimization should detect this
  in a single pass and stop, rather than always running the full
  quadratic number of passes
- All identical elements → no swaps ever occur, correctly considered
  already sorted
- Reverse-sorted array (worst case) → requires the maximum possible
  number of passes and swaps

## Hints

1. The core operation is comparing each pair of adjacent elements and
   swapping them if they're out of order — what happens if you repeat
   this pass over the whole array multiple times?
2. After one full pass, the largest unsorted element is guaranteed to
   have "bubbled" to its correct final position at the end of the
   unsorted region — so each subsequent pass needs to check one fewer
   element at the end.
3. If an entire pass completes with zero swaps, the array is already
   fully sorted — track this with a flag and exit early, rather than
   always running the full `n` passes even on already-sorted input.

## Algorithm

**Pattern:** repeated adjacent-swap passes, with early-exit
optimization.
**Core insight:** each full left-to-right pass compares every adjacent
pair and swaps them if out of order — this guarantees the largest
remaining unsorted element "bubbles" up to its correct final position by
the end of that pass. Repeating this for up to `n - 1` passes correctly
sorts the array, since each pass places at least one more element in
its final position. A pass that makes zero swaps proves the array is
already sorted, letting the algorithm terminate early instead of running
every possible pass unconditionally.
**Invariant:** after `k` completed passes, the last `k` elements of the
array are in their correct, final sorted positions.

## Dry Run

**Input:** `nums = [5,2,4,1,3]`

| Pass | Array before | Comparisons/swaps | Array after |
|---|---|---|---|
| 1 | `[5,2,4,1,3]` | swap(5,2), swap(5,4), swap(5,1), swap(5,3) | `[2,4,1,3,5]` |
| 2 | `[2,4,1,3,5]` | swap(4,1), swap(4,3) | `[2,1,3,4,5]` |
| 3 | `[2,1,3,4,5]` | swap(2,1) | `[1,2,3,4,5]` |
| 4 | `[1,2,3,4,5]` | no swaps | `[1,2,3,4,5]` — early exit |

**Result:** `[1,2,3,4,5]` — matches expected output.

## JavaScript Solution

```js
function bubbleSort(nums) {
  const n = nums.length;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    // Each completed pass places one more element correctly at the
    // end, so the unsorted region shrinks by one each time.
    for (let i = 0; i < n - 1 - pass; i++) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) break; // already sorted, no need for further passes
  }

  return nums;
}
```

## TypeScript Solution

```ts
function bubbleSort(nums: number[]): number[] {
  const n = nums.length;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    for (let i = 0; i < n - 1 - pass; i++) {
      const current = nums[i]!;
      const next = nums[i + 1]!;

      if (current > next) {
        nums[i] = next;
        nums[i + 1] = current;
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return nums;
}
```

## Time Complexity

O(n^2) worst and average case; O(n) best case (already-sorted input,
thanks to the early-exit optimization).

## Space Complexity

O(1) — sorting happens in place, no auxiliary array.

## Common Mistakes

- Omitting the early-exit `swapped` flag — the algorithm still works
  correctly, but always runs the full O(n^2) passes even on already-
  sorted input, missing an easy optimization.
- Not shrinking the inner loop's upper bound by `pass` each time —
  re-comparing already-correctly-placed trailing elements wastes work,
  though doesn't cause incorrectness.
- Using bubble sort in a performance-sensitive real context — it's
  taught for its conceptual simplicity, but O(n log n) algorithms like
  merge sort or quicksort are what production code should actually use.

## Interview Follow-up Questions

1. Why is bubble sort rarely used in production despite being simple to
   understand?
2. How would you modify this to sort in descending order instead?
3. How does bubble sort's best-case time complexity compare to insertion
   sort's, and when might insertion sort be preferred?

## Similar Questions

- Merge Sort (see [merge-sort.md](merge-sort.md))
- Quick Sort (see [quick-sort.md](quick-sort.md))

---
[← Back to 65-dsa](../README.md)
