# Q304 · Top K Frequent Elements

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Hashing
**Concepts:** frequency counting, bucket sort by frequency

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` most
frequent elements. The answer may be returned in any order.

## Input

- `nums`: an array of integers
- `k`: an integer, `1 <= k <= number of distinct elements in nums`

## Output

An array of the `k` most frequent values in `nums`, in any order.

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is always valid: `1 <= k <= number of distinct elements`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,1,1,2,2,3], k = 2` | `[1,2]` | `1` appears 3 times, `2` appears 2 times — the two most frequent |
| `nums = [1], k = 1` | `[1]` | Only one distinct value |
| `nums = [4,1,-1,2,-1,2,3], k = 2` | `[-1,2]` | `-1` and `2` each appear twice, tied for most frequent |

## Edge Cases

- `k` equals the number of distinct elements → return all distinct
  values
- All elements identical → the single value is the only (and most
  frequent) answer
- Multiple values tied for the same frequency at the `k`-th cutoff →
  any valid set of `k` values meeting or exceeding that frequency is
  acceptable, per "any order" / no specified tie-break

## Hints

1. Sorting all distinct values by frequency and taking the top `k` works
   but costs O(m log m) for `m` distinct values — since frequency is
   bounded by `nums.length`, is there a way to sort by frequency without
   comparison-based sorting?
2. Build a frequency map first, then think about *bucketing* values by
   their frequency count — what's the maximum possible frequency any
   single value could have?
3. A value's frequency can be at most `nums.length`. An array of
   buckets, indexed by frequency (0 to `nums.length`), where each bucket
   holds every value with that exact frequency, lets you walk from the
   highest possible frequency downward and collect values until you
   have `k` of them — no comparison sort needed.

## Algorithm

**Pattern:** frequency counting + bucket sort.
**Core insight:** a value's frequency is bounded by `nums.length`, so
instead of sorting distinct values by frequency (a comparison sort,
O(m log m)), place each value into a bucket indexed by its exact
frequency count. Walking the buckets from the highest index (highest
frequency) down to 1 and collecting values as you go produces the top-k
values without ever comparing two frequencies against each other —
bucket sort exploits the bounded range of possible frequency values to
avoid the log factor.
**Invariant:** after the bucket-building pass, `buckets[f]` contains
exactly the set of values whose frequency in `nums` is exactly `f`; the
collection walk visits buckets in strictly decreasing frequency order,
so the first `k` values collected are guaranteed to be the `k` most
frequent.

## Dry Run

**Input:** `nums = [1,1,1,2,2,3]`, `k = 2`

| Step | Action | Result |
|---|---|---|
| 1 | Build frequency map | `{1: 3, 2: 2, 3: 1}` |
| 2 | Build buckets (index = frequency) | `buckets[3] = [1]`, `buckets[2] = [2]`, `buckets[1] = [3]` |
| 3 | Walk from `buckets[6]` down to `buckets[1]`, collecting until `k` values found | `buckets[3]` → take `1` (1 collected); `buckets[2]` → take `2` (2 collected, `k` reached, stop) |

**Result:** `[1, 2]` — matches expected output.

## JavaScript Solution

```js
function topKFrequent(nums, k) {
  const frequency = new Map();
  for (const num of nums) {
    frequency.set(num, (frequency.get(num) ?? 0) + 1);
  }

  // buckets[f] holds every value whose frequency is exactly f; frequency
  // can never exceed nums.length, so that bounds the bucket array size.
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, count] of frequency) {
    buckets[count].push(value);
  }

  const result = [];
  for (let count = buckets.length - 1; count >= 1 && result.length < k; count--) {
    for (const value of buckets[count]) {
      if (result.length === k) break;
      result.push(value);
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function topKFrequent(nums: readonly number[], k: number): number[] {
  const frequency = new Map<number, number>();
  for (const num of nums) {
    frequency.set(num, (frequency.get(num) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, count] of frequency) {
    buckets[count]!.push(value);
  }

  const result: number[] = [];
  for (let count = buckets.length - 1; count >= 1 && result.length < k; count--) {
    for (const value of buckets[count]!) {
      if (result.length === k) break;
      result.push(value);
    }
  }

  return result;
}
```

## Time Complexity

O(n) — building the frequency map is O(n); building and walking the
buckets is O(n) total, since the sum of all bucket sizes across all
frequencies is bounded by the number of distinct values, and the bucket
array itself has `n + 1` slots.

## Space Complexity

O(n) — the frequency map, the buckets array, and the result array are
all bounded by `n`.

## Common Mistakes

- Sorting distinct values by frequency with `.sort()` — correct, but
  O(m log m), not the optimal linear bucket-sort approach interviewers
  expect once the follow-up is raised.
- Forgetting the buckets array needs `nums.length + 1` slots (frequency
  can be as high as `nums.length` itself, e.g. when every element is
  identical).
- Stopping the outer bucket walk based on bucket *index* alone without
  also checking `result.length < k` inside the inner loop — can overshoot
  past exactly `k` results when a bucket holds more than one value.

## Interview Follow-up Questions

1. How would a min-heap of size `k` solve this in O(n log k) instead —
   when might that be preferable to bucket sort (e.g. streaming data
   where you can't wait to see the whole array first)?
2. How would you extend this to "top k frequent *words*," where ties
   need to be broken lexicographically?
3. How would you maintain a running "top k frequent" answer efficiently
   if `nums` were being appended to continuously?

## Similar Questions

- Group Anagrams (see [group-anagrams.md](group-anagrams.md))
- Kth Largest Element in an Array
- Sort Characters By Frequency

---
[← Back to Hashing](README.md) · [← Back to 65-dsa](../README.md)
