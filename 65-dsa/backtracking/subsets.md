# Q1201 · Subsets (Power Set)

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Meta, Microsoft, Uber
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Backtracking
**Concepts:** backtracking, decision tree, include/exclude recursion

## Problem Statement

Given an array `nums` of distinct integers, return all possible subsets
(the power set) — every combination of elements, including the empty
subset and the full array itself. Subsets may be returned in any order.

## Input

`nums`: an array of distinct integers.

## Output

An array of arrays: every possible subset of `nums`.

## Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All elements in `nums` are distinct.
- The total number of subsets is `2^n`, where `n = nums.length`.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3]` | `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]` | All 2³ = 8 subsets, order may vary |
| `nums = [0]` | `[[],[0]]` | 2¹ = 2 subsets: with and without the only element |
| `nums = []` (below the stated constraint, but worth reasoning about) | `[[]]` | The empty set has exactly one subset: itself |

## Edge Cases

- Single-element array → exactly 2 subsets (empty and the singleton).
- The empty subset `[]` must always be included, and the full array
  must always be included — both are easy to accidentally omit if the
  recursion's base case or an off-by-one is wrong.
- Negative numbers or zero as elements → no different from any other
  distinct integers; must not be special-cased incorrectly.

## Hints

1. For each individual element, there are exactly two choices that
   apply independently: it's either *included* in a given subset, or
   *excluded* from it — what recursive structure naturally explores
   every combination of independent binary choices?
2. Think of building the answer element by element: at each element,
   branch into two recursive calls — one where you add the element to
   the subset being built, one where you don't — then move to the next
   element in both branches.
3. A subset is "complete" (ready to record) once you've made a decision
   for every element in `nums` — that's your base case: when you've
   processed the last index, whatever you've built so far is one valid
   subset to add to the result.

## Algorithm

**Pattern:** backtracking — include/exclude decision tree.
**Core insight:** every subset of `nums` corresponds to exactly one
sequence of independent include/exclude decisions, one decision per
element — so exploring "include this element, recurse; then undo and
exclude this element, recurse" for every element, in order, visits
every possible subset exactly once. This is the canonical backtracking
shape: make a choice, recurse into the consequence of that choice, then
undo the choice (backtrack) before trying the alternative.
**Invariant:** at the moment `index` reaches `nums.length`, `current`
holds exactly one valid, fully-decided subset — every element at index
`0..nums.length-1` was either explicitly included or explicitly
skipped to arrive at this state.

## Dry Run

**Input:** `nums = [1, 2]`

```
                    index=0, current=[]
                   /                    \
        include 1                        exclude 1
    index=1, current=[1]              index=1, current=[]
     /              \                   /              \
include 2      exclude 2        include 2         exclude 2
idx=2,[1,2]    idx=2,[1]        idx=2,[2]         idx=2,[]
  record         record           record            record
```

| Leaf reached | Subset recorded |
|---|---|
| include 1, include 2 | `[1, 2]` |
| include 1, exclude 2 | `[1]` |
| exclude 1, include 2 | `[2]` |
| exclude 1, exclude 2 | `[]` |

**Result:** `[[1,2], [1], [2], []]` — all `2^2 = 4` subsets, each
produced by exactly one path through the include/exclude decision tree.

## JavaScript Solution

```js
function subsets(nums) {
  const result = [];
  const current = [];

  function backtrack(index) {
    if (index === nums.length) {
      // Every element has been decided — record a COPY, since `current`
      // keeps being mutated by later backtracking.
      result.push([...current]);
      return;
    }

    // Choice 1: include nums[index].
    current.push(nums[index]);
    backtrack(index + 1);
    current.pop(); // undo the choice before trying the alternative

    // Choice 2: exclude nums[index].
    backtrack(index + 1);
  }

  backtrack(0);
  return result;
}
```

## TypeScript Solution

```ts
function subsets(nums: readonly number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(index: number): void {
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    current.push(nums[index] as number);
    backtrack(index + 1);
    current.pop();

    backtrack(index + 1);
  }

  backtrack(0);
  return result;
}
```

## Time Complexity

O(n * 2^n) — there are `2^n` subsets total, and copying each subset
(`[...current]`) into the result costs up to O(n), giving O(n * 2^n)
overall.

## Space Complexity

O(n) auxiliary (the recursion depth and `current` array), not counting
the O(n * 2^n) required for the output itself, which is unavoidable
given the problem asks for every subset explicitly.

## Common Mistakes

- Pushing `current` directly into `result` instead of a copy
  (`[...current]`) — since `current` is mutated in place throughout the
  recursion, every entry in `result` would end up referencing the *same*
  array, which is empty by the time backtracking finishes.
- Forgetting to `pop()` after the "include" branch returns — without
  undoing the choice, `current` keeps growing across sibling branches,
  producing wrong/duplicate subsets rather than exploring exclude and
  include independently.
- Trying to special-case the empty subset or full array separately
  instead of letting them fall out naturally from the base case (empty
  subset = every choice was "exclude"; full array = every choice was
  "include") — this is unnecessary and error-prone compared to trusting
  the recursion.

## Interview Follow-up Questions

1. How would you modify this to handle an input array with duplicate
   elements, avoiding duplicate subsets in the output (Subsets II)?
2. How would you generate subsets iteratively instead of recursively,
   e.g. by doubling the result list at each element?
3. How is this problem structurally related to Combination Sum and
   Permutations — what's the same about the backtracking shape, and
   what's different about the base case / choices available?
4. How would you generate only subsets of a specific size k, without
   generating and then filtering the full power set?

## Similar Questions

- Subsets II (with duplicates)
- Permutations
- Combination Sum
- Generate Parentheses

---
[← Back to Backtracking](README.md) · [← Back to 65-dsa](../README.md)
