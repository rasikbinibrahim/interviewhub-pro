# Q6553 · Merge Overlapping Intervals (Sorting & Greedy Interval Sweep)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Intervals  
**Concepts:** intervals, sorting, greedy, array-manipulation  

## Problem Statement

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Input

- `intervals`: `number[][]` — 2D array of interval bounds

## Output

- `number[][]` — merged non-overlapping 2D interval array

## Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `intervals = [[1,3],[2,6],[8,10],[15,18]]` | `[[1,6],[8,10],[15,18]]` | Intervals `[1,3]` and `[2,6]` overlap -> merged to `[1,6]` |
| `intervals = [[1,4],[4,5]]` | `[[1,5]]` | Edge overlap at point 4 -> merged to `[1,5]` |

## Edge Cases

- Single interval `[[1, 4]]` -> returns `[[1, 4]]`
- Nested intervals `[[1, 10], [2, 3], [4, 5]]` -> returns `[[1, 10]]`

## Hints

1. **Sort by Start Time**: Sort `intervals` ascending by starting point `a[0] - b[0]`.
2. Push `intervals[0]` into `mergedResult`.
3. Loop through remaining intervals `curr`:
   - Get last merged interval `prev = mergedResult[mergedResult.length - 1]`.
   - If `curr[0] <= prev[1]` (Overlap!):
     - Extend `prev[1] = Math.max(prev[1], curr[1])`.
   - Else (No overlap):
     - Push `curr` into `mergedResult`.

## Algorithm

**Pattern:** Sorting & Greedy Interval Merging  
**Core Insight:** Sorting intervals by start time ensures that overlapping intervals are strictly adjacent in the array, reducing merging checks to a single linear sweep.

## Dry Run

`intervals = [[1,3],[2,6],[8,10],[15,18]]`:
- Sorted by start time: `[[1,3],[2,6],[8,10],[15,18]]`.
- `merged = [[1, 3]]`.
- `curr = [2, 6]`: `2 <= 3` (Overlap!). `prev[1] = max(3, 6) = 6`. `merged = [[1, 6]]`.
- `curr = [8, 10]`: `8 > 6` (No overlap!). Push `[8, 10]`. `merged = [[1, 6], [8, 10]]`.
- `curr = [15, 18]`: `15 > 10` (No overlap!). Push `[15, 18]`.
- Return `[[1, 6], [8, 10], [15, 18]]`.

## JavaScript Solution

```js
function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // Step 1: Sort by start time ascending
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlap detected: extend end bound
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // Non-overlapping interval: push to result
      merged.push(current);
    }
  }

  return merged;
}
```

## TypeScript Solution

```ts
function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}
```

## Time Complexity

`O(N log N)` — dominated by the initial interval sorting step.

## Space Complexity

`O(N)` — to store output merged intervals array.

## Common Mistakes

- Forgetting to sort `intervals` prior to merging, causing non-adjacent overlapping intervals to be missed during linear iteration.

## Follow-Up Questions

1. How would you solve Insert Interval (inserting a new interval into an already sorted list of non-overlapping intervals)?

## Similar Questions

- Insert Interval
- Non-overlapping Intervals
