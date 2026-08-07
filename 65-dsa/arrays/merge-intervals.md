# Q109 · Merge Intervals

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, LinkedIn
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Arrays
**Concepts:** sorting, greedy linear merge, overlap detection

## Problem Statement

Given an array of intervals `intervals`, where `intervals[i] = [start_i,
end_i]`, merge all overlapping intervals and return an array of the
non-overlapping intervals that together cover every interval in the
input. Two intervals that only touch at an endpoint (e.g. `[1, 4]` and
`[4, 5]`) count as overlapping and must be merged.

## Input

- `intervals`: an array of two-element arrays `[start, end]`, not
  necessarily sorted

## Output

An array of two-element arrays `[start, end]` — the merged,
non-overlapping intervals, sorted by start.

## Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length === 2`
- `0 <= start_i <= end_i <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `[[1,3],[2,6],[8,10],[15,18]]` | `[[1,6],[8,10],[15,18]]` | `[1,3]` and `[2,6]` overlap (`2 <= 3`) and merge into `[1,6]` |
| `[[1,4],[4,5]]` | `[[1,5]]` | Touching endpoints (`4 <= 4`) still count as overlapping |
| `[[1,4],[0,4]]` | `[[0,4]]` | Input isn't pre-sorted; sorting by start first is required before merging |

## Edge Cases

- A single interval → returned unchanged
- All intervals overlap into one → result is a single merged interval
- No intervals overlap at all → result equals the input, sorted by start
- Intervals that are fully contained within another (e.g. `[1,10]` and
  `[2,5]`) → must merge to the outer bound, not just extend by the
  inner interval's end

## Hints

1. Overlap between two intervals is easy to check *if they're adjacent
   in some order* — what ordering of the input array makes "overlapping
   intervals" always sit next to each other?
2. Sort the intervals by their start value first. Then a single
   left-to-right scan only ever needs to compare each interval against
   the *last merged* interval so far, not every previous interval.
3. Two intervals overlap (or touch) exactly when the next interval's
   start is `<=` the current merged interval's end — when that's true,
   extend the merged interval's end to the *larger* of the two ends
   (not just the next interval's end, since the current merged interval
   might already extend further).

## Algorithm

**Pattern:** sort, then greedy linear merge.
**Core insight:** overlap is only easy to check between adjacent
intervals, so sorting by start value first guarantees that any two
intervals that could possibly overlap end up next to each other in scan
order. From there, a single pass keeps a running "current merged
interval" — each new interval either extends it (if `interval.start <=
merged.end`) or starts a brand new merged interval (if it starts strictly
after the current one ends).
**Invariant:** at any point during the scan, every interval processed so
far has already been correctly merged into the `merged` result list —
no later interval can affect an entry in `merged` other than the last
one, because the array is sorted by start.

## Dry Run

**Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]` (already sorted by
start)

| Step | Current interval | Last merged | Overlap? (`start <= merged.end`) | merged after step |
|---|---|---|---|---|
| 1 | `[1,3]` | none | — (first interval) | `[[1,3]]` |
| 2 | `[2,6]` | `[1,3]` | `2 <= 3` → yes, extend end to `max(3,6)=6` | `[[1,6]]` |
| 3 | `[8,10]` | `[1,6]` | `8 <= 6` → no, push new | `[[1,6],[8,10]]` |
| 4 | `[15,18]` | `[8,10]` | `15 <= 10` → no, push new | `[[1,6],[8,10],[15,18]]` |

**Result:** `[[1,6],[8,10],[15,18]]` — matches expected output.

## JavaScript Solution

```js
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const lastMerged = merged[merged.length - 1];

    if (start <= lastMerged[1]) {
      // Overlaps (or touches) the last merged interval — extend its end,
      // but only if the new end is actually further out.
      lastMerged[1] = Math.max(lastMerged[1], end);
    } else {
      // Starts strictly after the last merged interval ends — no overlap.
      merged.push([start, end]);
    }
  }

  return merged;
}
```

## TypeScript Solution

```ts
type Interval = readonly [number, number];

function mergeIntervals(intervals: readonly Interval[]): Interval[] {
  if (intervals.length <= 1) return [...intervals];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [[sorted[0]![0], sorted[0]![1]]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i]!;
    const lastMerged = merged[merged.length - 1]!;

    if (start <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}
```

## Time Complexity

O(n log n) — dominated by the sort; the merge scan itself is O(n).

## Space Complexity

O(n) for the output array (and the sort's auxiliary space, which is
engine-dependent — typically O(log n) to O(n)); O(1) additional
auxiliary space beyond the output if the sort is in-place.

## Common Mistakes

- Forgetting to sort by start value first — without sorting, overlapping
  intervals aren't guaranteed to be adjacent, so a single linear scan
  can't correctly detect all overlaps.
- Using strict `<` instead of `<=` when checking overlap — this misses
  intervals that only touch at an endpoint (`[1,4]` and `[4,5]`), which
  the problem defines as overlapping.
- Extending the merged interval's end to the *next* interval's end
  unconditionally, instead of `Math.max(lastMerged.end, next.end)` — a
  fully-contained interval (e.g. merging `[1,10]` with `[2,5]`) would
  incorrectly shrink the merged range.
- Mutating the original input array's sub-arrays in place while
  iterating, when the caller might still need the original unsorted
  order.

## Interview Follow-up Questions

1. How would you insert a *single* new interval into an already-sorted,
   already-merged list efficiently, without re-sorting everything?
   (Insert Interval.)
2. Given a list of meeting time intervals, how would you determine the
   minimum number of conference rooms required to hold all meetings?
   (Meeting Rooms II — same overlap concept, different aggregation.)
3. How would this need to change if intervals arrived one at a time as a
   stream, and merged state had to be maintained online?
4. What's the minimum number of intervals you'd need to remove to make
   the rest non-overlapping? (Non-overlapping Intervals.)

## Similar Questions

- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms II

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
