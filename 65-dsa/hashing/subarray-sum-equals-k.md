# Q302 · Subarray Sum Equals K

**Difficulty:** Medium
**Companies Asked:** Google, Facebook/Meta, Amazon, Bloomberg
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Hashing / Prefix Sum
**Concepts:** prefix sum, hash map frequency count, complement lookup on running totals

## Problem Statement

Given an array of integers `nums` and an integer `k`, return the total
number of contiguous subarrays whose elements sum to exactly `k`.

## Input

- `nums`: an array of integers (may include negative numbers)
- `k`: an integer target sum

## Output

A single integer: the count of subarrays summing to `k`.

## Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1, 1, 1], k = 2` | `2` | Subarrays `[1,1]` (indices 0-1) and `[1,1]` (indices 1-2) both sum to 2 |
| `nums = [1, 2, 3], k = 3` | `2` | `[1,2]` and `[3]` both sum to 3 |
| `nums = [1, -1, 0], k = 0` | `3` | `[1,-1]`, `[0]`, and `[1,-1,0]` all sum to 0 — negative numbers make multiple non-obvious subarrays valid |

## Edge Cases

- Array containing negative numbers → sums are non-monotonic, so a
  sliding-window approach (which assumes shrinking the window only
  decreases the sum) does *not* work here — this is a common trap
  distinguishing this problem from superficially similar sliding-window
  problems
- `k = 0` with cancelling positive/negative runs → multiple valid,
  possibly overlapping, subarrays
- Single-element array where that element equals `k` → count of 1
- No subarray sums to `k` → `0`

## Hints

1. Sliding window works when all numbers are non-negative (growing the
   window never decreases the sum). This problem allows negatives — what
   different technique tracks sums that can go up and down?
2. The sum of any subarray `nums[i..j]` can be expressed as
   `prefixSum[j] - prefixSum[i-1]`, where `prefixSum[x]` is the sum of
   everything from the start up through index `x`. If you know all
   prefix sums seen so far, how do you find how many of them equal
   `prefixSum[j] - k`?
3. Store a running frequency count of every prefix sum seen so far in a
   hash map, including a `0` count seeded before the scan begins (for
   subarrays that start at index 0).

## Algorithm

**Pattern:** prefix sum + hash map frequency count.
**Core insight:** a subarray `nums[i..j]` sums to `k` exactly when
`prefixSum[j] - prefixSum[i-1] = k`, i.e. `prefixSum[i-1] = prefixSum[j]
- k`. So at each index `j`, instead of checking every possible `i`
directly, the question becomes "how many earlier prefix sums equal
`currentPrefixSum - k`?" — answerable in O(1) via a hash map that counts
how many times each prefix sum has occurred so far.
**Invariant:** `prefixCount` always holds the frequency of every prefix
sum computed from index `0` up through the *previous* index — the count
for the current prefix sum is added only after checking, exactly
mirroring the "check before insert" discipline from Two Sum.

## Dry Run

**Input:** `nums = [1, 1, 1]`, `k = 2`

Seed: `prefixCount = { 0: 1 }` (accounts for subarrays starting at index 0)

| j | nums[j] | runningSum | need = runningSum - k | prefixCount[need] | total | prefixCount after |
|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 1 - 2 = -1 | 0 (not present) | 0 | `{0:1, 1:1}` |
| 1 | 1 | 2 | 2 - 2 = 0 | 1 (present, count 1) | 1 | `{0:1, 1:1, 2:1}` |
| 2 | 1 | 3 | 3 - 2 = 1 | 1 (present, count 1) | 2 | `{0:1, 1:1, 2:1, 3:1}` |

**Result:** `total = 2` — matches expected output.

## JavaScript Solution

```js
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]); // seed: empty prefix sums to 0
  let runningSum = 0;
  let total = 0;

  for (const num of nums) {
    runningSum += num;

    // How many earlier prefix sums, if subtracted from this one, give k?
    const need = runningSum - k;
    total += prefixCount.get(need) ?? 0;

    // Record this prefix sum AFTER checking, so a subarray can't
    // incorrectly pair a prefix sum with itself at the same index.
    prefixCount.set(runningSum, (prefixCount.get(runningSum) ?? 0) + 1);
  }

  return total;
}
```

## TypeScript Solution

```ts
function subarraySum(nums: readonly number[], k: number): number {
  const prefixCount = new Map<number, number>([[0, 1]]);
  let runningSum = 0;
  let total = 0;

  for (const num of nums) {
    runningSum += num;

    const need = runningSum - k;
    total += prefixCount.get(need) ?? 0;

    prefixCount.set(runningSum, (prefixCount.get(runningSum) ?? 0) + 1);
  }

  return total;
}
```

## Time Complexity

O(n) — a single pass over `nums`, with O(1) average-case map operations
per element.

## Space Complexity

O(n) — worst case, every prefix sum is distinct, producing n entries in
the map.

## Common Mistakes

- Reaching for a sliding-window approach out of habit — this problem's
  negative numbers make sliding window incorrect, since shrinking the
  window doesn't monotonically decrease the sum.
- Forgetting to seed `prefixCount` with `{0: 1}` before the loop — this
  seed is what correctly counts subarrays that start at index 0 (whose
  "previous prefix sum" is the empty prefix, sum 0).
- Incrementing the count for the current `runningSum` *before* checking
  `need` — if `k === 0`, this would incorrectly let a prefix sum pair
  with itself as if two different indices existed.

## Interview Follow-up Questions

1. How would you modify this to return the actual subarrays, not just
   the count?
2. What if you needed the *longest* subarray summing to `k`, instead of
   the count of all such subarrays?
3. Why doesn't the two-pointer/sliding-window technique work here, and
   under what added constraint (e.g. "all numbers are positive") would
   it become valid again?

## Similar Questions

- Two Sum (see [arrays/two-sum.md](../arrays/two-sum.md)) — the same
  "check complement before inserting" discipline, applied to prefix
  sums instead of raw values
- Continuous Subarray Sum
- Maximum Size Subarray Sum Equals K

---
[← Back to Hashing](README.md) · [← Back to 65-dsa](../README.md)
