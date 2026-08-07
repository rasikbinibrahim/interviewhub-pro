# Q110 · Find the Duplicate Number

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Apple, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Arrays
**Concepts:** Floyd's cycle detection (tortoise and hare), array-as-implicit-linked-list

## Problem Statement

Given an array `nums` of `n + 1` integers, where every integer is in the
range `[1, n]` inclusive, exactly one value in that range is duplicated
one or more times (all other values appear exactly once). Find the
duplicate value **without modifying the array** and using only **O(1)
extra space**.

## Input

- `nums`: an array of `n + 1` integers, each in `[1, n]`

## Output

A single number: the one value that appears more than once.

## Constraints

- `1 <= n <= 10^5`, so `nums.length === n + 1`
- Every `nums[i]` is in `[1, n]`
- Exactly one value is duplicated (it may appear more than twice)
- Must not modify `nums`
- Must use O(1) extra space (rules out sorting a copy or a `Set`)

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1, 3, 4, 2, 2]` | `2` | `2` appears at both index 3 and index 4 |
| `nums = [3, 1, 3, 4, 2]` | `3` | `3` appears at both index 0 and index 2 |
| `nums = [1, 1]` | `1` | `n = 1`, and the only possible value, `1`, is duplicated |

## Edge Cases

- The duplicate appears more than twice (e.g. `[2, 2, 2, 3]` for `n=3`)
  → algorithm must still converge on `2`
- The duplicate is `1` (the smallest possible value) or `n` (the
  largest) → no special-casing should be needed if the core algorithm is
  correct
- Minimum size input (`n = 1`, `nums.length = 2`) → the two entries must
  both be `1`

## Hints

1. A hash set or a sorted copy solves this easily but costs O(n) space
   or mutates the array — what property of the values (each one is a
   valid *index* into the same array, since they're all in `[1, n]`)
   could let you avoid extra storage entirely?
2. Think of `nums` as describing a function: from index `i`, "the next
   index to visit" is `nums[i]`. Because there are `n+1` values but only
   `n` possible targets `[1, n]`, at least two indices must point to the
   same next index — which means this implicit "linked list" must
   contain a cycle.
3. The classic two-pointer cycle-detection technique (slow pointer moves
   one step, fast pointer moves two steps, per iteration) finds *that*
   there's a cycle. A second phase — resetting one pointer to the start
   and advancing both one step at a time until they meet again — finds
   exactly *where* the cycle begins, which is provably the duplicate
   value.

## Algorithm

**Pattern:** Floyd's Tortoise and Hare cycle detection, applied to the
array treated as an implicit linked list.
**Core insight:** since every value in `nums` is a valid index (all in
`[1, n]`, and there are `n` valid indices `1..n`), define `next(i) =
nums[i]`. With `n+1` values mapped into only `n` possible targets, the
pigeonhole principle guarantees two different indices point to the same
next index — meaning this implicit list must loop back on itself
somewhere, i.e. it contains a cycle. The node where two different paths
first converge is exactly the duplicate value, and the entry point of
that cycle is found by the standard two-phase tortoise-and-hare
algorithm: Phase 1 finds *a* meeting point inside the cycle (fast moves
2x speed); Phase 2, restarting one pointer from the start and advancing
both at 1x speed, finds the cycle's *entrance*, by the classic proof
that the distance from the start to the cycle entrance equals the
distance from the phase-1 meeting point to the cycle entrance, walked at
equal speed.
**Invariant:** because `next(i) = nums[i]` is never rewritten, this
technique never mutates `nums` and uses only two pointer variables —
satisfying both constraints simultaneously.

## Dry Run

**Input:** `nums = [1, 3, 4, 2, 2]` (so `n = 4`, indices `0..4`)

**Phase 1 — find a meeting point inside the cycle** (start both pointers
at `nums[0]`, then slow moves one step, fast moves two steps per
iteration):

| Iteration | slow = nums[slow] | fast = nums[nums[fast]] | slow === fast? |
|---|---|---|---|
| start | 1 | 1 | — |
| 1 | nums[1] = 3 | nums[nums[1]] = nums[3] = 2 | no |
| 2 | nums[3] = 2 | nums[nums[2]] = nums[4] = 2 | yes — stop |

**Phase 2 — find the cycle entrance** (reset `slow` to `nums[0]`, keep
`fast` where it stopped; both now move one step at a time):

| Iteration | slow = nums[slow] | fast = nums[fast] | slow === fast? |
|---|---|---|---|
| start | 1 | 2 | no |
| 1 | nums[1] = 3 | nums[2] = 4 | no |
| 2 | nums[3] = 2 | nums[4] = 2 | yes — stop |

**Result:** `2` — matches expected output.

## JavaScript Solution

```js
function findDuplicate(nums) {
  // Phase 1: advance until slow and fast meet somewhere inside the cycle.
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: reset slow to the start; advance both at equal speed until
  // they meet again — that meeting point is the cycle's entrance, which
  // is exactly the duplicated value.
  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

## TypeScript Solution

```ts
function findDuplicate(nums: readonly number[]): number {
  let slow = nums[0]!;
  let fast = nums[0]!;

  do {
    slow = nums[slow]!;
    fast = nums[nums[fast]!]!;
  } while (slow !== fast);

  slow = nums[0]!;

  while (slow !== fast) {
    slow = nums[slow]!;
    fast = nums[fast]!;
  }

  return slow;
}
```

## Time Complexity

O(n) — both phases of Floyd's algorithm visit a number of nodes linear
in the size of the implicit list (bounded by `n + 1`), not exponential
or quadratic.

## Space Complexity

O(1) — only two pointer variables (`slow`, `fast`), regardless of input
size; `nums` itself is never copied or mutated.

## Common Mistakes

- Reaching for a `Set` to detect the first repeated value — correct and
  simple, but O(n) space, which violates the stated constraint.
- Sorting a copy of the array and scanning for adjacent duplicates —
  correct, but O(n log n) time and, if sorting `nums` directly instead
  of a copy, an illegal mutation of the input.
- In Phase 2, advancing `fast` at double speed again instead of matching
  `slow`'s single-step speed — the "meet at the cycle entrance" proof
  specifically requires both pointers to move at the *same* speed in
  this phase; keeping the double-speed step here finds the wrong node.
- Treating index `0` as part of the cycle search space — values are
  guaranteed to be in `[1, n]`, so `nums[0]` is always a safe, valid
  starting "next" pointer, but the *value* `0` itself never appears and
  isn't a candidate answer.

## Interview Follow-up Questions

1. Can you walk through *why* the cycle's entrance is provably the
   duplicate value, rather than just citing the algorithm? (Distance
   argument: the path from index `0` to the entrance has the same length
   as the path from the phase-1 meeting point to the entrance, so
   advancing both at equal speed makes them arrive simultaneously.)
2. There's an O(n log n) alternative using binary search on the value
   range `[1, n]`, counting how many elements are `<=` mid at each step —
   how does that approach work, and when might you prefer its simplicity
   over Floyd's algorithm despite the worse time complexity?
3. How would the problem change if more than one distinct value could be
   duplicated?
4. How is this the exact same underlying technique as detecting a cycle
   in a real linked list (Linked List Cycle II) — what's the mapping
   between "array index" and "list node" here?

## Similar Questions

- Linked List Cycle II (identical two-phase cycle-detection technique)
- Missing Number
- First Missing Positive

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
