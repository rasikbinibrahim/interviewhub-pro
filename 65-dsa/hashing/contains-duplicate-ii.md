# Q303 · Contains Duplicate II

**Difficulty:** Easy
**Companies Asked:** Amazon, Google, Microsoft
**Interview Frequency:** ★★★☆☆
**Category:** Data Structures & Algorithms → Hashing
**Concepts:** hash map of last-seen index, index-distance window

## Problem Statement

Given an integer array `nums` and an integer `k`, return `true` if there
exist two distinct indices `i` and `j` such that `nums[i] === nums[j]`
and `Math.abs(i - j) <= k`.

## Input

- `nums`: an array of integers
- `k`: a non-negative integer

## Output

Boolean — `true` if such a pair of indices exists.

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3,1], k = 3` | `true` | Value `1` at indices 0 and 3; `\|0-3\| = 3 <= 3` |
| `nums = [1,0,1,1], k = 1` | `true` | Value `1` at indices 2 and 3; `\|2-3\| = 1 <= 1` |
| `nums = [1,2,3,1,2,3], k = 2` | `false` | Every repeat of a value is more than 2 indices away |

## Edge Cases

- `k = 0` → distance must be exactly one and the same index, which is
  impossible for *distinct* indices, so the answer is always `false`
  for `k = 0` unless the problem's own bound treats it differently —
  here it correctly means no two distinct indices ever qualify
- No duplicates anywhere in the array → `false`
- Duplicate values exist but are always farther apart than `k` → `false`
- Same value appears 3+ times → only the *closest* prior occurrence
  matters at each step, not all previous occurrences

## Hints

1. Checking every pair of equal values against every other is O(n^2) —
   what's the only occurrence of a value that actually matters when
   you're standing at index `i` and checking backward?
2. For each value, only the *most recent* previous index it appeared at
   can possibly be within distance `k` of the current index — anything
   further back is automatically farther away too.
3. A hash map from value to its last-seen index lets you check "was this
   value seen recently enough?" in O(1) at each step, updating the
   stored index to the current one every time.

## Algorithm

**Pattern:** hash map storing each value's most recent index.
**Core insight:** at index `i`, checking whether `nums[i]` was seen at
some earlier index `j` with `i - j <= k` only ever needs the *most
recent* prior index for that value — any earlier occurrence would have
an even larger, and therefore already-disqualifying, distance. Storing
just the last-seen index per value (updated every time that value
recurs) turns the check into a single O(1) hash map lookup per element.
**Invariant:** at the start of processing index `i`, the map holds, for
every distinct value seen in `nums[0..i-1]`, the largest index at which
that value occurred so far.

## Dry Run

**Input:** `nums = [1, 2, 3, 1]`, `k = 3`

| i | nums[i] | lastSeen has nums[i]? | distance check | Action |
|---|---|---|---|---|
| 0 | 1 | no | — | lastSeen = `{1:0}` |
| 1 | 2 | no | — | lastSeen = `{1:0, 2:1}` |
| 2 | 3 | no | — | lastSeen = `{1:0, 2:1, 3:2}` |
| 3 | 1 | yes, at index 0 | `3 - 0 = 3 <= 3` → true | return `true` |

**Result:** `true` — matches expected output.

## JavaScript Solution

```js
function containsNearbyDuplicate(nums, k) {
  const lastSeen = new Map(); // value -> most recent index

  for (let i = 0; i < nums.length; i++) {
    const previousIndex = lastSeen.get(nums[i]);

    if (previousIndex !== undefined && i - previousIndex <= k) {
      return true;
    }

    lastSeen.set(nums[i], i);
  }

  return false;
}
```

## TypeScript Solution

```ts
function containsNearbyDuplicate(nums: readonly number[], k: number): boolean {
  const lastSeen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    const previousIndex = lastSeen.get(value);

    if (previousIndex !== undefined && i - previousIndex <= k) {
      return true;
    }

    lastSeen.set(value, i);
  }

  return false;
}
```

## Time Complexity

O(n) — a single pass, O(1) average-case map operations.

## Space Complexity

O(min(n, k)) in practice for the map — bounded by the number of distinct
values within any recent window, and O(n) worst case overall.

## Common Mistakes

- Comparing every pair of equal-value indices directly (O(n^2)) instead
  of tracking only the most recent one.
- Storing *all* previous indices for a value in an array/list instead of
  just the last one — unnecessary extra bookkeeping for this problem's
  requirements.
- Off-by-one on the distance check — the condition is `<= k`, not `< k`.

## Interview Follow-up Questions

1. How would this change for Contains Duplicate III, where values also
   need to be within `t` of each other, not just indices within `k`?
2. How would you solve this with a sliding-window `Set` instead of a
   last-seen-index map — what would you need to remove from the set as
   the window slides?
3. How would the approach change if `nums` were a live stream instead of
   a fixed array?

## Similar Questions

- Contains Duplicate
- Contains Duplicate III
- Longest Substring Without Repeating Characters (see [strings/longest-substring-without-repeating-characters.md](../strings/longest-substring-without-repeating-characters.md) — same last-seen-index technique)

---
[← Back to Hashing](README.md) · [← Back to 65-dsa](../README.md)
