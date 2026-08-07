# Q305 · Longest Consecutive Sequence

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Hashing
**Concepts:** hash set membership, sequence-start detection, amortized linear scan

## Problem Statement

Given an unsorted array of integers `nums`, return the length of the
longest run of consecutive integers that could be formed from its
elements (e.g. `[100, 4, 200, 1, 3, 2]` contains the consecutive run
`1, 2, 3, 4`, of length 4). The algorithm must run in O(n) time.

## Input

- `nums`: an array of integers, possibly containing duplicates, in no
  particular order

## Output

A single number: the length of the longest consecutive sequence.

## Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- Must run in O(n) time — sorting first (O(n log n)) does not satisfy
  this.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [100,4,200,1,3,2]` | `4` | The run `1,2,3,4` is the longest consecutive sequence present |
| `nums = [0,3,7,2,5,8,4,6,0,1]` | `9` | The run `0` through `8` (length 9); the duplicate `0` doesn't add length |
| `nums = []` | `0` | No elements, no sequence |

## Edge Cases

- Empty array → `0`
- All elements identical → longest run is length `1` (a single value is
  trivially a sequence of length 1)
- Duplicates mixed into an otherwise-consecutive run → duplicates don't
  extend the run's length, since a run counts each *distinct* value once
- Negative numbers and numbers spanning a very large range → must not
  assume non-negative values or attempt to allocate an array sized to
  the value range

## Hints

1. Sorting first makes this trivial (scan for consecutive runs), but
   costs O(n log n) — what data structure gives O(1) "does this value
   exist?" checks without ordering the values?
2. Put every value into a hash set. For a given value `v`, you can check
   in O(1) whether `v + 1`, `v + 2`, etc. are also present — but doing
   that check starting from *every* value risks re-walking the same
   sequence over and over.
3. Only start counting a sequence from a value `v` if `v - 1` is *not*
   in the set — that means `v` is guaranteed to be the smallest element
   of its sequence, so each sequence gets counted exactly once, from its
   true start, keeping the total work linear across the whole array.

## Algorithm

**Pattern:** hash set membership + sequence-start detection.
**Core insight:** put every value into a `Set` for O(1) lookups. For
each value `v`, only begin counting a run starting at `v` if `v - 1` is
absent from the set — this guarantees `v` is the smallest element of
whatever sequence it belongs to. Without that check, every element of a
long run would independently re-walk the entire run from its own
position, degrading to O(n^2) on an input like one long consecutive
range; with it, each run is discovered and walked exactly once, from its
start, so the total work across all runs combined is bounded by O(n).
**Invariant:** every sequence in the array is counted from its true
starting value exactly once — no element ever triggers a redundant walk
through a run it doesn't start.

## Dry Run

**Input:** `nums = [100, 4, 200, 1, 3, 2]`

| Value checked | Is `value - 1` in set? | Action | Run length found |
|---|---|---|---|
| 100 | no (`99` absent) | this is a sequence start; walk `101`? absent, stop | 1 |
| 4 | yes (`3` present) | skip — not a sequence start | — |
| 200 | no (`199` absent) | this is a sequence start; walk `201`? absent, stop | 1 |
| 1 | no (`0` absent) | this is a sequence start; walk `2,3,4` present, `5` absent, stop | 4 |
| 3 | yes (`2` present) | skip | — |
| 2 | yes (`1` present) | skip | — |

**Result:** `4` — matches expected output (the longest run found was
`1,2,3,4`).

## JavaScript Solution

```js
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longestLength = 0;

  for (const value of numSet) {
    // Only start counting from a value that begins its own sequence —
    // this is what keeps the total work linear across the whole set.
    if (!numSet.has(value - 1)) {
      let currentValue = value;
      let currentLength = 1;

      while (numSet.has(currentValue + 1)) {
        currentValue++;
        currentLength++;
      }

      longestLength = Math.max(longestLength, currentLength);
    }
  }

  return longestLength;
}
```

## TypeScript Solution

```ts
function longestConsecutive(nums: readonly number[]): number {
  const numSet = new Set<number>(nums);
  let longestLength = 0;

  for (const value of numSet) {
    if (!numSet.has(value - 1)) {
      let currentValue = value;
      let currentLength = 1;

      while (numSet.has(currentValue + 1)) {
        currentValue++;
        currentLength++;
      }

      longestLength = Math.max(longestLength, currentLength);
    }
  }

  return longestLength;
}
```

## Time Complexity

O(n) amortized — building the set is O(n); the sequence-start check
means every value is visited as the *inner* while-loop target at most
once across the entire run of the algorithm, so total work across all
"start" walks combined is bounded by the number of elements.

## Space Complexity

O(n) — the hash set holding all distinct values.

## Common Mistakes

- Sorting the array first — correct and simpler to reason about, but
  O(n log n), which doesn't meet the stated O(n) requirement.
- Omitting the "is this a sequence start" check and walking forward from
  every element unconditionally — still produces the correct answer, but
  degrades to O(n^2) on inputs that are one long consecutive run, since
  every element re-walks the same sequence.
- Forgetting that duplicates don't extend sequence length — using a
  `Set` naturally avoids this, but a naive count-based approach could
  double-count them if not careful.

## Interview Follow-up Questions

1. How would you return the actual sequence (start and end values), not
   just its length?
2. How would a Union-Find (Disjoint Set) structure solve this instead —
   what would "union" represent here?
3. What if the input were a stream of numbers arriving over time, and
   you needed the longest-consecutive-sequence-so-far maintained online?

## Similar Questions

- Longest Substring Without Repeating Characters (see [strings/longest-substring-without-repeating-characters.md](../strings/longest-substring-without-repeating-characters.md))
- Binary Search-based counting variants
- Union Find (Disjoint Set) applications

---
[← Back to Hashing](README.md) · [← Back to 65-dsa](../README.md)
