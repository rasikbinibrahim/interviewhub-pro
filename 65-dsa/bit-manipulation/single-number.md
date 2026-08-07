# Q1601 · Single Number

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Google, Meta, Adobe
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Bit Manipulation
**Concepts:** XOR properties, self-cancellation

## Problem Statement

Given a non-empty array of integers `nums` where every element appears
exactly twice except for one element that appears exactly once, return
that single element — in O(n) time and O(1) extra space.

## Input

`nums`: an array of integers.

## Output

A single integer: the element that appears exactly once.

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- Every element appears exactly twice except one, which appears exactly
  once.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2,2,1]` | `1` | 2 appears twice, 1 appears once |
| `nums = [4,1,2,1,2]` | `4` | 1 and 2 each appear twice, 4 appears once |
| `nums = [1]` | `1` | Single element |

## Edge Cases

- Single-element array → that element itself is the answer
- The unique element appears first, last, or anywhere in the middle →
  position must not matter to the algorithm
- Negative numbers → XOR-based bit manipulation works identically on
  negative numbers, via their two's-complement representation

## Hints

1. A hash map counting occurrences solves this in O(n) time but O(n)
   space — the constraint asks for O(1) space. What operation makes a
   number "cancel out" when combined with itself?
2. XOR (`^`) has the property that `x ^ x = 0` for any `x`, and `x ^ 0 =
   x`. What happens if you XOR every element in the array together?
3. XOR is also commutative and associative, so the order of XOR-ing
   doesn't matter — every pair of duplicate values will cancel each
   other out to `0`, leaving only the single unique value XORed with
   `0`, which is itself.

## Algorithm

**Pattern:** XOR accumulation exploiting self-cancellation.
**Core insight:** XOR-ing a number with itself always produces `0`
(`x ^ x = 0`), and XOR-ing any number with `0` leaves it unchanged
(`x ^ 0 = x`). Since XOR is commutative and associative, XOR-ing every
element of the array together in any order causes every pair of
duplicate values to cancel out to `0`, leaving only the XOR of `0` with
the single unique value — which is that value itself.
**Invariant:** at any point during the scan, the running XOR
accumulator equals the XOR of every duplicate-paired value processed so
far (which is always `0`, since pairs cancel) combined with the unique
value if it's been seen — in practice this means the accumulator always
reflects "XOR of everything seen so far," collapsing correctly by the
end.

## Dry Run

**Input:** `nums = [4,1,2,1,2]`

| Step | value | accumulator = accumulator ^ value |
|---|---|---|
| start | — | 0 |
| 1 | 4 | `0 ^ 4 = 4` |
| 2 | 1 | `4 ^ 1 = 5` |
| 3 | 2 | `5 ^ 2 = 7` |
| 4 | 1 | `7 ^ 1 = 6` |
| 5 | 2 | `6 ^ 2 = 4` |

**Result:** `4` — matches expected output (the two `1`s and two `2`s
cancelled each other out, leaving `4`).

## JavaScript Solution

```js
function singleNumber(nums) {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
```

## TypeScript Solution

```ts
function singleNumber(nums: readonly number[]): number {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
```

## Time Complexity

O(n) — a single pass over the array.

## Space Complexity

O(1) — a single accumulator variable, regardless of input size.

## Common Mistakes

- Using a hash map or `Set` to count occurrences — correct, but O(n)
  space, which doesn't meet the stated constraint.
- Sorting the array first to find the unpaired element — correct, but
  O(n log n), slower than the optimal O(n) XOR approach.
- Assuming XOR order matters — since XOR is commutative and
  associative, the array doesn't need to be processed in any particular
  order for the technique to work.

## Interview Follow-up Questions

1. How would this change if every element appeared exactly *three*
   times except one (Single Number II)?
2. How would you find the two unique elements if exactly *two* elements
   appeared once and all others appeared twice (Single Number III)?
3. What other problems can be solved using XOR's self-cancellation
   property?

## Similar Questions

- Number of 1 Bits (see [number-of-1-bits.md](number-of-1-bits.md))
- Missing Number
- Find the Duplicate Number (see [../arrays/find-the-duplicate-number.md](../arrays/find-the-duplicate-number.md))

---
[← Back to 65-dsa](../README.md)
