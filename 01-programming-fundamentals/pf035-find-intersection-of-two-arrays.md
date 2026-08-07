# PF035 · Intersection of Two Arrays (Hash Set Matching)

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** arrays, hash-set, intersection

## Problem Statement

Write a function `intersection(nums1, nums2)` that returns an array of
the distinct values present in *both* `nums1` and `nums2`, with no
duplicates in the result.

## Input

`nums1`, `nums2`: two arrays of numbers.

## Output

An array of the distinct values common to both input arrays.

## Constraints

`0 <= nums1.length, nums2.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums1=[1,2,2,1], nums2=[2,2]` | `[2]` | `2` is the only value present in both, deduplicated |
| `nums1=[4,9,5], nums2=[9,4,9,8,4]` | `[4,9]` | Both `4` and `9` appear in both arrays |
| `nums1=[1,2], nums2=[3,4]` | `[]` | No values are shared between the two arrays |

## Edge Cases

- No overlap at all → an empty array
- One or both input arrays empty → an empty array (nothing can intersect
  with nothing)
- Duplicate values within one or both arrays → the result still contains
  each shared value only once
- Identical arrays → the result is the full set of distinct values in
  either one

## Hints

1. Checking every element of `nums1` against every element of `nums2`
   with nested loops works but is O(n × m) — what data structure gives
   you O(1) membership checks instead of a linear scan?
2. Converting both arrays to `Set`s removes duplicates for free and lets
   you check membership instantly with `.has()`.
3. Iterate the distinct values of one set, and for each one, check
   whether it's also present in the other set — only push the values
   that pass both checks.

## Algorithm

**Pattern:** set-based membership matching.
**Core insight:** converting both arrays into sets does two things at
once: it removes duplicates within each array, and it turns "does this
value also appear in the other array" into an O(1) hash lookup instead
of an O(m) linear scan. Iterating the smaller (or either) set and
checking membership in the other set produces every shared value exactly
once, since the source set already had duplicates removed.
**Invariant:** after processing each value from `set1`, `result` holds
every value processed so far that exists in both `set1` and `set2`, with
no duplicates.

## Dry Run

**Input:** `nums1 = [1,2,2,1], nums2 = [2,2]`

| Step | Operation | Result |
|---|---|---|
| 1 | `set1 = new Set([1,2,2,1])` | `{1, 2}` |
| 2 | `set2 = new Set([2,2])` | `{2}` |
| 3 | iterate `set1`: `1` — `set2.has(1)`? | no, skip |
| 4 | iterate `set1`: `2` — `set2.has(2)`? | yes, push `2` |

**Result:** `[2]` — matches expected output.

## JavaScript Solution

```js
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const result = [];

  for (const num of set1) {
    if (set2.has(num)) result.push(num);
  }

  return result;
}
```

## TypeScript Solution

```ts
function intersection(nums1: number[], nums2: number[]): number[] {
  const set1 = new Set<number>(nums1);
  const set2 = new Set<number>(nums2);
  const result: number[] = [];

  for (const num of set1) {
    if (set2.has(num)) result.push(num);
  }

  return result;
}
```

## Time Complexity

O(n + m) — building both sets is linear in each array's length, and the
membership-check loop over `set1` is linear in its size.

## Space Complexity

O(n + m) — both sets, plus the result array, in the worst case (no
duplicates and full overlap).

## Common Mistakes

- Nested loops comparing every element of `nums1` against every element
  of `nums2` — correct, but O(n × m), far slower than the set-based
  approach for large inputs.
- Forgetting that the *result* must also be deduplicated — iterating
  `nums1` directly (instead of `set1`) and pushing every match would
  produce duplicate entries in the output whenever a shared value repeats
  in `nums1`.
- Confusing this with "intersection with duplicates preserved" (a
  related but different problem, sometimes called "Intersection II"),
  which requires counting occurrences rather than simple set membership.

## Interview Follow-up Questions

1. How would you solve "Intersection II," where the result should
   include a value as many times as it appears in *both* arrays (using
   the minimum of the two counts)?
2. How would this approach change if one array is enormous and the other
   is tiny — is there a way to do less total work?
3. How would you find the intersection of *more than two* arrays at
   once?

## Similar Questions

- Check Valid Anagram Strings (see [pf028-check-anagram-strings.md](pf028-check-anagram-strings.md))
- Find Missing Number in Sequence (see [pf033-find-missing-number-in-sequence.md](pf033-find-missing-number-in-sequence.md))

---
[← Back to Programming Fundamentals](README.md)
