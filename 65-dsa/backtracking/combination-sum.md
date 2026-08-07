# Q1203 · Combination Sum

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Microsoft, Google, Snowflake
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Backtracking
**Concepts:** backtracking with unlimited reuse, pruning via running sum

## Problem Statement

Given an array of distinct positive integers `candidates` and a target
integer `target`, return all unique combinations of `candidates` that
sum to exactly `target`. The same number may be chosen from
`candidates` an unlimited number of times. Return the combinations in
any order; a combination is a set of numbers regardless of order (so
`[2,2,3]` and `[2,3,2]` count as the same combination and should only
appear once).

## Input

- `candidates`: an array of distinct positive integers
- `target`: a positive integer

## Output

An array of arrays, each inner array a unique combination summing to
`target`.

## Constraints

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All values in `candidates` are distinct.
- `1 <= target <= 40`

## Examples

| Input | Output | Why |
|---|---|---|
| `candidates = [2,3,6,7], target = 7` | `[[2,2,3],[7]]` | `2+2+3=7` (reusing 2) and `7` alone both work |
| `candidates = [2,3,5], target = 8` | `[[2,2,2,2],[2,3,3],[3,5]]` | Three distinct ways to reach 8 |
| `candidates = [2], target = 1` | `[]` | No combination of 2s can ever sum to 1 |

## Edge Cases

- No valid combination exists → return `[]`
- `target` is itself one of the candidates → the single-element
  combination `[target]` is a valid answer
- A candidate larger than `target` → can never be part of any valid
  combination, should be skipped/pruned quickly rather than explored

## Hints

1. Since numbers can repeat, this isn't quite standard subset/combination
   generation — what needs to stay available for reuse at each
   recursive step, unlike Permutations or Subsets?
2. To avoid generating the same combination in different orders (e.g.
   `[2,3]` and `[3,2]`), only allow each recursive step to choose a
   candidate at the *current index or later* — never go back to an
   earlier index — this enforces a canonical non-decreasing order within
   each combination.
3. Track the running sum as you build a combination, and stop exploring
   a branch (backtrack immediately) the moment the running sum exceeds
   `target` — since all candidates are positive, adding more can only
   ever increase the sum further, so continuing past that point can
   never succeed.

## Algorithm

**Pattern:** backtracking with unlimited reuse and sum-based pruning.
**Core insight:** because a candidate can be reused, the recursive call
that "chooses" a candidate at index `i` recurses with the same index
`i` still eligible (not `i + 1`) — allowing that same value to be picked
again. To prevent generating the same set of numbers in multiple orders,
candidates before the current index are never revisited, enforcing a
canonical non-decreasing choice order within each combination. Since all
candidate values are positive, the running sum only ever increases as
more values are added — the moment it exceeds `target`, that entire
branch (and everything deeper within it) is guaranteed to fail, so it
can be abandoned immediately without further exploration.
**Invariant:** at every point during the recursion, `currentCombination`
sums to exactly `remainingTarget`'s complement — i.e.
`sum(currentCombination) + remainingTarget === target` — and every
value in it is `>= candidates[the index the recursion started from]`.

## Dry Run

**Input:** `candidates = [2,3,6,7]`, `target = 7`

| Call | current combination | remaining target | Action |
|---|---|---|---|
| `backtrack(0, 7)` | `[]` | 7 | try candidates[0]=2: `2 <= 7` → recurse |
| `backtrack(0, 5)` | `[2]` | 5 | try candidates[0]=2 again: `2 <= 5` → recurse |
| `backtrack(0, 3)` | `[2,2]` | 3 | try candidates[0]=2: `2 <= 3` → recurse |
| `backtrack(0, 1)` | `[2,2,2]` | 1 | candidates[0]=2 > 1 → prune; try candidates[1]=3 > 1 → prune; ...all remaining too big → dead end, backtrack |
| back to `[2,2]`, remaining 3 | | | try candidates[1]=3: `3 === 3` → record `[2,2,3]`! |
| ... continues exploring other branches ... | | | eventually finds `[7]` alone too |

**Result:** `[[2,2,3],[7]]` — matches expected output.

## JavaScript Solution

```js
function combinationSum(candidates, target) {
  const result = [];
  const current = [];

  function backtrack(startIndex, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    if (remaining < 0) {
      return; // overshot — this branch can never succeed
    }

    for (let i = startIndex; i < candidates.length; i++) {
      current.push(candidates[i]);
      // Pass i (not i + 1) so this same candidate can be reused.
      backtrack(i, remaining - candidates[i]);
      current.pop(); // undo the choice before trying the next candidate
    }
  }

  backtrack(0, target);
  return result;
}
```

## TypeScript Solution

```ts
function combinationSum(candidates: readonly number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(startIndex: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    if (remaining < 0) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const value = candidates[i]!;
      current.push(value);
      backtrack(i, remaining - value);
      current.pop();
    }
  }

  backtrack(0, target);
  return result;
}
```

## Time Complexity

O(2^target) worst case — the branching factor and depth both scale with
how many times small candidates can be reused; sum-based pruning cuts
this substantially in practice but the theoretical worst case remains
exponential, as with most backtracking enumeration problems.

## Space Complexity

O(target / minCandidate) for the recursion depth (bounded by how many
times the smallest candidate can be added before hitting `target`), plus
the space for the output itself.

## Common Mistakes

- Passing `i + 1` instead of `i` in the recursive call — this
  incorrectly prevents reusing the same candidate, turning the problem
  into "Combination Sum II" (each candidate used at most once) instead
  of this problem's "unlimited reuse" requirement.
- Not restricting the loop to start at `startIndex` (allowing it to
  restart from `0` every time) — produces duplicate combinations in
  different orders (e.g. both `[2,3]` and `[3,2]`).
- Missing the `remaining < 0` pruning check — without it, the recursion
  keeps exploring hopeless branches all the way to their natural base
  case instead of cutting them off early.

## Interview Follow-up Questions

1. How would this change if each candidate could only be used *once*
   (Combination Sum II), especially with duplicate values in the input?
2. How would you count just the *number* of valid combinations, without
   materializing them all?
3. How would you adapt this to allow negative target values or
   candidates?

## Similar Questions

- Subsets (see [subsets.md](subsets.md))
- Permutations (see [permutations.md](permutations.md))
- Combination Sum II

---
[← Back to Backtracking](README.md) · [← Back to 65-dsa](../README.md)
