# PF033 · Find Missing Number in Sequence (XOR / Gauss Sum Formula)

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** math, xor, arrays

## Problem Statement

Write a function `missingNumber(nums)` that, given an array containing
`n` distinct numbers from the range `[0, n]` with exactly one number
missing, returns the missing number.

## Input

`nums`: an array of `n` distinct integers drawn from `[0, n]` (so the
array has `n` elements, but the full range `[0, n]` has `n + 1` possible
values — exactly one of which is missing).

## Output

The single missing number from the range.

## Constraints

`1 <= n <= 10^4`, `0 <= nums[i] <= n`, all values in `nums` are distinct

## Examples

| Input | Output | Why |
|---|---|---|
| `[3,0,1]` | `2` | Range `[0,3]` has 4 values; `2` is the one missing |
| `[0,1]` | `2` | Range `[0,2]` has 3 values; `2` is the one missing |
| `[0]` | `1` | Range `[0,1]` has 2 values; `1` is the one missing |

## Edge Cases

- Missing value is `0` → still found correctly, since the sum-difference
  approach doesn't treat `0` specially
- Missing value is `n` (the largest possible) → also found correctly,
  for the same reason
- `nums` has only one element → the range `[0,1]` has exactly one
  missing value to find

## Hints

1. Sorting and scanning for a gap works, but costs O(n log n) — is there
   a way to find the missing value using only sums, in one pass?
2. The sum of every integer from `0` to `n` has a closed-form formula:
   `n * (n + 1) / 2`. If you know what the *full* sum should be, and you
   know what the array's *actual* sum is, what does their difference
   tell you?
3. `expectedSum - actualSum` isolates exactly the one value that's
   present in the full range but absent from the array — because every
   other value cancels out between the two sums.

## Algorithm

**Pattern:** Gauss's summation formula compared against the actual sum.
**Core insight:** the sum of all integers from `0` to `n` has a
well-known closed-form value, `n(n+1)/2` — no need to add them up one by
one. If `nums` contained every value in `[0, n]`, its sum would exactly
equal that formula's result; since exactly one value is missing, the
array's actual sum falls short of the expected sum by precisely that
missing value.
**Invariant:** `expectedSum` always equals the sum of the complete range
`[0, n]`; `actualSum` always equals the sum of the values actually
present, so `expectedSum - actualSum` isolates exactly the one value
excluded from `nums`.

## Dry Run

**Input:** `nums = [3, 0, 1]` (`n = 3`)

| Step | Computation | Value |
|---|---|---|
| 1 | `expectedSum = 3 * 4 / 2` | `6` |
| 2 | `actualSum = 3 + 0 + 1` | `4` |
| 3 | `expectedSum - actualSum` | `2` |

**Result:** `2` — matches expected output (the range `[0,3]` is
`{0,1,2,3}`; `nums` has `{3,0,1}`, missing `2`).

## JavaScript Solution

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}
```

## TypeScript Solution

```ts
function missingNumber(nums: number[]): number {
  const n: number = nums.length;
  const expectedSum: number = (n * (n + 1)) / 2;
  const actualSum: number = nums.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}
```

## Time Complexity

O(n) — a single pass to sum the array's values; the expected sum is
computed in O(1) via the formula.

## Space Complexity

O(1) — no auxiliary storage beyond a couple of scalar accumulators.

## Common Mistakes

- Sorting the array and scanning for the first index where
  `nums[i] !== i` — correct, but O(n log n) instead of O(n), and more
  code than the summation approach.
- Using a `Set` to check which values from `0` to `n` are absent — works
  but uses O(n) extra space and more operations than the arithmetic
  approach needs.
- Overflow considerations in fixed-width-integer languages for very
  large `n` (since the sum formula can grow large) — not a practical
  concern in JavaScript, whose numbers are floating-point up to
  `Number.MAX_SAFE_INTEGER`, but worth mentioning as a real constraint
  elsewhere.

## Interview Follow-up Questions

1. How would you solve this using XOR instead of summation, and why does
   that approach work (hint: `a ^ a = 0`)?
2. How would the approach change if *two* numbers could be missing
   instead of one?
3. Which approach — sum or XOR — is safer against numeric overflow in a
   language with fixed-width integers, and why?

## Similar Questions

- Standard Iterative Binary Search (see [pf032-binary-search-iterative.md](pf032-binary-search-iterative.md))
- Intersection of Two Arrays (see [pf035-find-intersection-of-two-arrays.md](pf035-find-intersection-of-two-arrays.md))

---
[← Back to Programming Fundamentals](README.md)
