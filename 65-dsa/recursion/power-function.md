# Q1402 · Power Function (Fast Exponentiation)

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Microsoft, Meta
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Recursion
**Concepts:** divide and conquer, exponentiation by squaring

## Problem Statement

Implement `power(x, n)`, which calculates `x` raised to the integer
power `n` (i.e., `x^n`), without using the built-in `**` operator or
`Math.pow`. `n` may be negative.

## Input

- `x`: a floating-point number (the base)
- `n`: an integer (the exponent, may be negative)

## Output

A single number: `x^n`.

## Constraints

- `-100 < x < 100`
- `-2^31 <= n <= 2^31 - 1`
- `x != 0` when `n` is negative or zero-adjacent in a way that would
  divide by zero.

## Examples

| Input | Output | Why |
|---|---|---|
| `x = 2, n = 10` | `1024` | `2^10 = 1024` |
| `x = 2, n = -2` | `0.25` | `2^-2 = 1/2^2 = 0.25` |
| `x = 2, n = 0` | `1` | Any non-zero base to the power 0 is 1 |

## Edge Cases

- `n = 0` → always `1`, regardless of `x` (except `x = 0`, which is a
  mathematically undefined edge case not tested here)
- Negative `n` → compute the positive-power result, then take its
  reciprocal
- `n = Number.MIN_SAFE_INTEGER`-scale negative values → naive negation
  (`-n`) of the most negative 32-bit integer can overflow in fixed-width
  languages (not a concern in JS's floating-point numbers, but worth
  mentioning as a classic pitfall)

## Hints

1. Naively multiplying `x` by itself `n` times is O(n) — what
   mathematical identity lets you compute `x^n` using far fewer
   multiplications?
2. `x^n = (x^(n/2))^2` when `n` is even, and `x^n = x * (x^((n-1)/2))^2`
   when `n` is odd — this halves the exponent at every recursive step
   instead of decrementing it by one.
3. For negative `n`, compute the result for the positive exponent `-n`
   first, then return its reciprocal (`1 / result`) at the very end.

## Algorithm

**Pattern:** divide and conquer — exponentiation by squaring.
**Core insight:** rather than multiplying `x` by itself `n` times,
repeatedly halving the exponent and squaring the partial result computes
the same value in O(log n) multiplications instead of O(n). Each
recursive call solves a problem half the size, and the "combine" step is
a single squaring (plus one extra multiplication by `x` when the current
exponent is odd, to account for the leftover factor that halving
doesn't evenly divide).
**Invariant:** at every recursive step, `x^n` is correctly expressed in
terms of a single call to `x^(n/2)` (integer division), squared, with an
extra factor of `x` included exactly when `n` is odd.

## Dry Run

**Input:** `x = 2`, `n = 10`

| Call | n even/odd | Recurse into | Combine |
|---|---|---|---|
| `power(2, 10)` | even | `power(2, 5)` | `result^2` |
| `power(2, 5)` | odd | `power(2, 2)` | `x * result^2` |
| `power(2, 2)` | even | `power(2, 1)` | `result^2` |
| `power(2, 1)` | odd | `power(2, 0)` | `x * result^2` |
| `power(2, 0)` | base case | — | returns `1` |

Unwinding: `power(2,0)=1` → `power(2,1)=2*1^2=2` → `power(2,2)=2^2=4` →
`power(2,5)=2*4^2=32` → `power(2,10)=32^2=1024`.

**Result:** `1024` — matches expected output.

## JavaScript Solution

```js
function power(x, n) {
  if (n < 0) {
    return 1 / power(x, -n);
  }

  if (n === 0) {
    return 1;
  }

  const halfPower = power(x, Math.floor(n / 2));
  const squared = halfPower * halfPower;

  return n % 2 === 0 ? squared : x * squared;
}
```

## TypeScript Solution

```ts
function power(x: number, n: number): number {
  if (n < 0) {
    return 1 / power(x, -n);
  }

  if (n === 0) {
    return 1;
  }

  const halfPower = power(x, Math.floor(n / 2));
  const squared = halfPower * halfPower;

  return n % 2 === 0 ? squared : x * squared;
}
```

## Time Complexity

O(log n) — the exponent halves at every recursive call.

## Space Complexity

O(log n) — the recursion call stack depth matches the number of
halving steps.

## Common Mistakes

- Naively looping `n` times multiplying `x` — correct but O(n), not the
  optimized O(log n) the exponentiation-by-squaring technique achieves.
- Forgetting the odd-exponent case needs an extra factor of `x` — using
  only `squared` for both even and odd `n` silently drops a factor.
- Handling negative `n` by negating `x` instead of taking the reciprocal
  of the result — a negative exponent means "divide," not "negate the
  base."

## Interview Follow-up Questions

1. How would you convert this recursive version into an iterative one
   to avoid the O(log n) call stack?
2. How does this same "repeated squaring" idea apply to fast modular
   exponentiation in cryptography?
3. How would you handle potential floating-point precision issues for
   very large `n`?

## Similar Questions

- Fibonacci Number (see [fibonacci-number.md](fibonacci-number.md))
- Sqrt(x) (binary search / Newton's method variant)
- Counting Bits (see [../bit-manipulation/counting-bits.md](../bit-manipulation/counting-bits.md))

---
[← Back to 65-dsa](../README.md)
