# PF006 · Sum of Natural Numbers up to N

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** iterative accumulation, closed-form arithmetic series formula

## Problem Statement

Write a function `sumOfNaturalNumbers(n)` that returns the sum of every
positive integer from `1` to `n` (inclusive).

## Input

`n`: a non-negative integer.

## Output

A single number: `1 + 2 + ... + n`.

## Constraints

`0 <= n <= 10^6`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5` | `15` | `1+2+3+4+5 = 15` |
| `n = 0` | `0` | No numbers to sum |
| `n = 1` | `1` | Only one number to sum |

## Edge Cases

- `n = 0` → sum is `0`, an empty sum
- `n = 1` → sum equals `n` itself
- Large `n` (up to the constraint bound) → the closed-form formula
  avoids a slow loop and stays within safe integer precision

## Hints

1. A loop from `1` to `n`, accumulating a running total, is the direct
   approach — what's its time complexity, and is there a way to compute
   the same answer without iterating at all?
2. This is a well-known arithmetic series: pairing the first and last
   terms (`1 + n`), the second and second-to-last (`2 + (n-1)`), and so
   on, each pair sums to the same value, `n + 1`.
3. There are exactly `n / 2` such pairs (with a small adjustment for odd
   `n`), giving the closed-form formula `n * (n + 1) / 2` — this
   computes the exact same result as the loop, in O(1) instead of O(n).

## Algorithm

**Pattern:** closed-form arithmetic series formula (Gauss's pairing
insight).
**Core insight:** summing `1` through `n` by pairing the smallest and
largest remaining terms (`1` with `n`, `2` with `n-1`, etc.) reveals that
every pair sums to exactly `n + 1`, and there are `n / 2` such pairs
(handled correctly for both even and odd `n` by the formula `n * (n +
1) / 2`, since one of `n` or `n + 1` is always even, keeping the result
an integer). This transforms an O(n) iterative sum into an O(1)
computation.
**Invariant:** none needed for the closed-form version — it's a direct
formula, not an iterative accumulation.

## Dry Run

**Input:** `n = 5`

| Approach | Computation | Result |
|---|---|---|
| Iterative | `1+2+3+4+5` | `15` |
| Closed-form | `5 * (5 + 1) / 2 = 5 * 6 / 2 = 30 / 2` | `15` |

**Result:** `15` — matches expected output; both approaches agree.

## JavaScript Solution

```js
function sumOfNaturalNumbers(n) {
  return (n * (n + 1)) / 2;
}
```

## TypeScript Solution

```ts
function sumOfNaturalNumbers(n: number): number {
  return (n * (n + 1)) / 2;
}
```

## Time Complexity

O(1) — a fixed number of arithmetic operations, regardless of `n`.

## Space Complexity

O(1) — no auxiliary memory.

## Common Mistakes

- Using a loop (`for (let i = 1; i <= n; i++) sum += i`) when the
  closed-form formula is available — correct and easy to explain, but
  worth presenting the O(1) formula as the optimized follow-up.
- Writing the formula as `n * (n + 1 / 2)` or otherwise misplacing the
  parentheses — operator precedence matters; the division must apply to
  the full product, not just one factor.
- Off-by-one, using `(n - 1) * n / 2` (the sum up to `n - 1`) instead of
  `n * (n + 1) / 2` — this excludes `n` itself from the sum.

## Interview Follow-up Questions

1. How would you derive the closed-form formula for the sum of squares
   (`1² + 2² + ... + n²`) using a similar approach?
2. Why does `n * (n + 1)` always produce an even number, guaranteeing
   the division by 2 never leaves a fractional remainder?
3. How would this formula need to change for the sum from an arbitrary
   starting value `a` to `n`, not just from `1`?

## Similar Questions

- Calculate Factorial (see [pf004-calculate-factorial.md](pf004-calculate-factorial.md))
- Sum of Digits (see [../65-dsa/logic-building/lb006-sum-of-digits.md](../65-dsa/logic-building/lb006-sum-of-digits.md))

---
[← Back to Programming Fundamentals](README.md)
