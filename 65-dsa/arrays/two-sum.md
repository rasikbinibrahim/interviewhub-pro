# Q101 · Two Sum

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Adobe, LinkedIn
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Arrays / Hashing
**Concepts:** hash map for O(1) lookup, single-pass complement search

## Problem Statement

Given an array of integers `nums` and an integer `target`, return the
indices of the two numbers that add up to `target`. You may assume
exactly one valid pair exists, and you may not use the same array
element twice. Return the indices in any order.

## Input

- `nums`: an array of integers
- `target`: an integer

## Output

An array of two indices `[i, j]` such that `nums[i] + nums[j] === target`.

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Exactly one valid answer exists.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2, 7, 11, 15], target = 9` | `[0, 1]` | `2 + 7 = 9` |
| `nums = [3, 2, 4], target = 6` | `[1, 2]` | `2 + 4 = 6`; note the answer isn't at the start of the array |
| `nums = [3, 3], target = 6` | `[0, 1]` | Duplicate values are valid as long as they're different indices |

## Edge Cases

- Array with exactly 2 elements (the minimum per constraints) → the only
  possible pair
- Negative numbers, including a negative `target` → algorithm must not
  assume non-negative values
- Duplicate values that themselves sum to target (`[3, 3]`, target `6`)
  → must use two distinct indices, not the same element twice
- The two matching numbers are the first and last elements → a solution
  that only checks nearby elements would miss this

## Hints

1. The brute-force approach checks every pair — think about what
   information you'd need to avoid re-scanning the array for each
   element.
2. For each number, the value you're looking for (`target - num`) is
   fully determined before you look for it — what data structure gives
   you an O(1) check for "have I seen this value before?"
3. Check for the complement *before* adding the current number to your
   lookup structure — this is what correctly prevents using the same
   element twice.

## Algorithm

**Pattern:** hashing — complement lookup.
**Core insight:** for each element `nums[i]`, the only thing that
matters is whether `target - nums[i]` has already been seen earlier in
the array. Storing every visited value (and its index) in a hash map as
you go turns "has this complement appeared?" into an O(1) lookup instead
of an O(n) re-scan, collapsing the brute-force O(n²) into a single O(n)
pass.
**Invariant:** at the start of processing index `i`, the map contains
exactly the values (and their indices) from `nums[0..i-1]` — never
including `nums[i]` itself, which is why checking happens before
inserting.

## Dry Run

**Input:** `nums = [2, 7, 11, 15]`, `target = 9`

| i | nums[i] | complement = target - nums[i] | complement in map? | Action |
|---|---|---|---|---|
| 0 | 2 | 7 | No (map is empty) | map.set(2, 0) |
| 1 | 7 | 2 | Yes — map has `2 → 0` | return `[0, 1]` |

**Result:** `[0, 1]` — matches expected output.

## JavaScript Solution

```js
function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      // Found a pair: the earlier element at seen.get(complement),
      // and the current element at i.
      return [seen.get(complement), i];
    }

    // Only insert AFTER checking, so we never pair an element with itself.
    seen.set(nums[i], i);
  }

  // Per constraints, exactly one valid answer always exists, so this
  // line is unreachable for valid input — present only to satisfy
  // the function's return contract.
  return [];
}
```

## TypeScript Solution

```ts
function twoSum(nums: readonly number[], target: number): [number, number] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current === undefined) continue; // noUncheckedIndexedAccess guard

    const complement = target - current;
    const complementIndex = seen.get(complement);

    if (complementIndex !== undefined) {
      return [complementIndex, i];
    }

    seen.set(current, i);
  }

  throw new Error('No valid pair found — violates stated constraints');
}
```

## Time Complexity

O(n) — a single pass over `nums`; each hash map `.get`/`.has`/`.set`
call is O(1) average case.

## Space Complexity

O(n) — in the worst case (no match until the last element), the map
holds up to `n - 1` entries.

## Common Mistakes

- Using nested loops (O(n²) brute force) when the constraints
  (`nums.length` up to 10⁴) make that acceptable for correctness but
  suboptimal — interviewers expect the hash map optimization to be
  reached, not just a working brute force.
- Inserting into the map *before* checking for the complement — this
  allows an element to incorrectly pair with itself when `target === 2 *
  nums[i]`.
- Returning the *values* instead of the *indices* — the problem asks for
  indices specifically.

## Interview Follow-up Questions

1. What if the array is sorted — is there a solution that avoids extra
   space? (Two-pointer from both ends.)
2. What if you needed *all* pairs that sum to target, not just one?
3. How would this change if the input were a stream you couldn't store
   entirely in memory?

## Similar Questions

- Three Sum
- Two Sum II (sorted input)
- Subarray Sum Equals K (see [hashing/subarray-sum-equals-k.md](../hashing/subarray-sum-equals-k.md))

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
