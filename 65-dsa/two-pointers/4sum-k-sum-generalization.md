# Q6643 · 4Sum (General K-Sum via Recursive Two Pointers)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Two Pointers
**Concepts:** two-pointers, sorting, arrays, k-sum

## Problem Statement

Write a function `fourSum(nums, target)` that returns every unique
quadruplet of values in `nums` that sums to `target`. Each quadruplet's
values should appear in ascending order, and the overall result must
contain no duplicate quadruplets.

## Input

`nums`: an array of integers. `target`: the target sum.

## Output

An array of quadruplets (each a 4-element array), each summing to
`target`, with no duplicate quadruplets.

## Constraints

`1 <= nums.length <= 200`, `-10^9 <= nums[i], target <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums=[1,0,-1,0,-2,2], target=0` | `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]` | The three unique combinations of four values summing to 0 |
| `nums=[2,2,2,2,2], target=8` | `[[2,2,2,2]]` | Only one quadruplet possible, using four of the five available 2s |
| `nums=[1,2,3], target=10` | `[]` | Fewer than four elements can never form a quadruplet |

## Edge Cases

- Fewer than 4 elements → `[]`, no quadruplet is possible
- Many duplicate values → must not produce duplicate quadruplets, even
  though the same value may be reusable across multiple valid
  quadruplets
- All identical values summing exactly to target → a single quadruplet
  using that repeated value
- Very large or very negative values → sums must not silently overflow
  (not a practical concern in JavaScript's floating-point numbers, but
  worth flagging as a real constraint in fixed-width-integer languages)

## Hints

1. `3Sum` reduces the problem by fixing one value and two-pointering the
   rest — could `4Sum` reduce the same way, by fixing one value and
   recursively solving the remaining "3Sum-like" problem on what's left?
2. Generalize further: fixing values one at a time reduces `kSum` to
   `(k-1)Sum`, all the way down to a base case of `2Sum`, which two
   pointers solve directly on the sorted array — this recursive
   structure works for any `k`, not just 4.
3. Skip duplicate values at *every* level of the recursion (not just the
   base case) to avoid producing duplicate quadruplets — the same
   duplicate-skipping logic that makes `3Sum` correct needs to apply
   uniformly as `k` shrinks.

## Algorithm

**Pattern:** recursive reduction to 2Sum, with two pointers at the base
case.
**Core insight:** the two-pointer technique that solves `2Sum` on a
sorted array (and the "fix one, reduce to 2Sum" technique that solves
`3Sum`) generalizes cleanly: fixing one value reduces `kSum` to
`(k-1)Sum` with a smaller target and a narrower search range, and
recursing on that smaller problem all the way down to `k=2` — where two
pointers finish the job directly — solves the general case for any `k`.
Sorting the array up front is what makes both the two-pointer base case
and the duplicate-skipping logic at every recursive level work
correctly.
**Invariant:** at every recursive call `kSum(k, start, target)`, every
quadruplet-in-progress accumulated so far consists of values in
ascending index order (`start` never decreases), and duplicate values at
the current level are skipped so no duplicate combination is ever
explored twice.

## Dry Run

**Input:** `nums = [1,0,-1,0,-2,2], target = 0` → sorted:
`[-2,-1,0,0,1,2]`

| Fixed at k=4 (index, val) | remaining target for kSum(3,...) | quadruplets found via that branch |
|---|---|---|
| index 0, `-2` | `0 - (-2) = 2` | `kSum(3, 1, 2)` finds `[-1,1,2]` and `[0,0,2]` → `[-2,-1,1,2]`, `[-2,0,0,2]` |
| index 1, `-1` | `0 - (-1) = 1` | `kSum(3, 2, 1)` finds `[0,0,1]` → `[-1,0,0,1]` |
| index 2, `0` | `0 - 0 = 0` | `kSum(3, 3, 0)` finds nothing → no additional quadruplet |

(Index 3 is skipped as a duplicate of index 2's value, `0`.)

**Result:** `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]` — matches expected
output.

## JavaScript Solution

```js
function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const result = [];

  function kSum(k, start, target) {
    if (k === 2) {
      let left = start, right = nums.length - 1;
      const res = [];
      while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum < target) left++;
        else if (sum > target) right--;
        else {
          res.push([nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        }
      }
      return res;
    }

    const res = [];
    for (let i = start; i < nums.length - k + 1; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      const subRes = kSum(k - 1, i + 1, target - nums[i]);
      for (const list of subRes) {
        res.push([nums[i], ...list]);
      }
    }
    return res;
  }

  return kSum(4, 0, target);
}
```

## TypeScript Solution

```ts
function fourSum(nums: number[], target: number): number[][] {
  const sorted: number[] = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];

  function kSum(k: number, start: number, target: number): number[][] {
    if (k === 2) {
      let left = start;
      let right: number = sorted.length - 1;
      const res: number[][] = [];
      while (left < right) {
        const sum: number = sorted[left] + sorted[right];
        if (sum < target) left++;
        else if (sum > target) right--;
        else {
          res.push([sorted[left], sorted[right]]);
          while (left < right && sorted[left] === sorted[left + 1]) left++;
          while (left < right && sorted[right] === sorted[right - 1]) right--;
          left++;
          right--;
        }
      }
      return res;
    }

    const res: number[][] = [];
    for (let i = start; i < sorted.length - k + 1; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      const subRes: number[][] = kSum(k - 1, i + 1, target - sorted[i]);
      for (const list of subRes) {
        res.push([sorted[i], ...list]);
      }
    }
    return res;
  }

  return kSum(4, 0, target);
}
```

## Time Complexity

O(n^(k-1)) for general `kSum`, so O(n³) for `4Sum` specifically —
`k - 2` levels of nested iteration (each O(n)) on top of the O(n)
two-pointer base case.

## Space Complexity

O(n) to O(log n) for the sort, plus O(k) recursion depth (a small
constant for `4Sum`) — excluding the output itself.

## Common Mistakes

- Writing `4Sum` as its own bespoke, hand-unrolled two-nested-loops-plus-
  two-pointers solution instead of the general recursive `kSum` pattern
  — works, but doesn't generalize, and duplicates a lot of the
  duplicate-skipping logic that `kSum` handles uniformly at every level.
- Forgetting to skip duplicate values at *every* recursive level (not
  just inside the base-case two-pointer scan) — produces duplicate
  quadruplets whenever an outer fixed value repeats.
- Integer overflow when summing very large values (a real concern in
  fixed-width-integer languages, not JavaScript) — worth mentioning
  explicitly, since `target - nums[i]` accumulates across levels.

## Interview Follow-up Questions

1. How would you generalize this further to solve `kSum` for an
   arbitrary `k` passed in as a parameter, not hardcoded to 4?
2. Why does the recursion bottom out at `k === 2` specifically, rather
   than `k === 1` or `k === 3`?
3. How would early termination (checking whether the smallest/largest
   possible remaining sum could even reach `target`) speed up the
   recursive search in practice, without changing the worst-case
   complexity?

## Similar Questions

- 3Sum (Sorted Array Two Pointers) (see [../arrays/3sum-zero-triplets.md](../arrays/3sum-zero-triplets.md))
- Container With Most Water (see [container-with-most-water.md](container-with-most-water.md))
