# Q6560 · Kth Largest Element in an Array (QuickSelect O(N) & Min-Heap)

**Difficulty:** Medium  
**Companies Asked:** Meta, Amazon, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, quickselect, priority-queue, divide-and-conquer, sorting  

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.

Note that it is the `k-th` largest element in the sorted order, not the `k-th` distinct element.

Can you solve it without sorting in `O(n)` average time complexity?

## Input

- `nums`: `number[]` — integer array
- `k`: `number` — 1-based k-th largest position

## Output

- `number` — k-th largest element integer value

## Constraints

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [3,2,1,5,6,4], k = 2` | `5` | Sorted array: [1,2,3,4,5,6], 2nd largest is 5 |
| `nums = [3,2,3,1,2,4,5,5,6], k = 4` | `4` | Sorted array: [1,2,2,3,3,4,5,5,6], 4th largest is 4 |

## Edge Cases

- `k = 1` (maximum element) -> max value
- `k = nums.length` (minimum element) -> min value

## Hints

1. **QuickSelect Algorithm (Average O(N))**:
   - Convert $K$-th largest to target index `targetIndex = nums.length - k`.
   - Partition array around a random pivot `p`.
   - If `pivotIndex === targetIndex`, return `nums[pivotIndex]`.
   - If `pivotIndex < targetIndex`, recurse right half `[pivotIndex + 1...right]`.
   - If `pivotIndex > targetIndex`, recurse left half `[left...pivotIndex - 1]`.
2. **Min-Heap Approach O(N log K)**:
   - Maintain a Min-Heap of size `k`.
   - For each number, push into heap. If `heap.size > k`, pop smallest element.
   - Root of Min-Heap `heap.peek()` holds the $K$-th largest element.

## Algorithm

**Pattern:** QuickSelect Partitioning Divide & Conquer  
**Core Insight:** By eliminating half of the search space on each partition step, QuickSelect achieves average $O(N)$ expected time complexity ($N + N/2 + N/4 + ... = 2N$).

## Dry Run

`nums = [3, 2, 1, 5, 6, 4], k = 2`:
- `targetIndex = 6 - 2 = 4`.
- Partition around pivot 4: Array rearranged to `[3, 2, 1, 4, 6, 5]`, pivot index 3.
- `3 < 4` -> Recurse right `[6, 5]` (index 4 to 5).
- Partition `[6, 5]`: Pivot 5 placed at index 4 (`nums[4] = 5`).
- `pivotIndex (4) === targetIndex (4)` -> Return `5`.

## JavaScript Solution

```js
function findKthLargest(nums, k) {
  const targetIndex = nums.length - k;

  function partition(left, right) {
    // Randomize pivot to prevent O(N^2) worst case
    const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];

    const pivot = nums[right];
    let p = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }
    [nums[p], nums[right]] = [nums[right], nums[p]];
    return p;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return -1;
}
```

## TypeScript Solution

```ts
function findKthLargest(nums: number[], k: number): number {
  const targetIndex = nums.length - k;

  function partition(left: number, right: number): number {
    const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];

    const pivot = nums[right];
    let p = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }
    [nums[p], nums[right]] = [nums[right], nums[p]];
    return p;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return -1;
}
```

## Time Complexity

Average `O(N)`, Worst Case `O(N^2)` (avoided by random pivot selection).

## Space Complexity

`O(1)` — in-place iterative partitioning.

## Common Mistakes

- Sorting full array `nums.sort((a,b) => b-a)[k-1]`, which takes $O(N \log N)$ time instead of optimal $O(N)$ average time.

## Follow-Up Questions

1. How does QuickSelect compare against Min-Heap $O(N \log K)$ in streaming data scenarios? (Heap handles streaming data; QuickSelect requires full static array).

## Similar Questions

- Top K Frequent Elements
- Kth Largest Element in a Stream
