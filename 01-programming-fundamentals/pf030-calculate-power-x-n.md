# PF030 · Calculate Power Pow(x, n) via Binary Exponentiation

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** math, binary-exponentiation, recursion

## Problem Statement

Write a function `myPow(x, n)` that computes `x` raised to the integer
power `n`, without using the `**` operator or `Math.pow`, in better than
O(n) time.

## Input

`x`: a number (the base). `n`: an integer (the exponent, may be
negative).

## Output

A number: `x` raised to the power `n`.

## Constraints

`-100 < x < 100`, `-2^31 <= n <= 2^31 - 1`, `x != 0` when `n < 0`

## Examples

| Input | Output | Why |
|---|---|---|
| `x=2, n=10` | `1024` | `2^10 = 1024` |
| `x=2, n=-2` | `0.25` | Negative exponent means `1 / 2^2 = 0.25` |
| `x=2, n=0` | `1` | Any non-zero base to the power 0 is 1 |

## Edge Cases

- `n = 0` → always `1`, regardless of `x` (handled as an immediate
  special case)
- Negative `n` → equivalent to `1 / x^|n|`; invert `x` and negate `n` up
  front, then proceed as if `n` were positive
- `x = 1` → always `1`, for any `n`
- `x = -1` → alternates between `1` and `-1` depending on whether `n` is
  even or odd — the algorithm handles this correctly without any special
  case, since it's just repeated multiplication

## Hints

1. Multiplying `x` by itself `n` times works but is O(n) — can you avoid
   redoing work by reusing previously-computed powers, similar to how
   `x^8 = (x^4)^2 = ((x^2)^2)^2` only needs 3 multiplications instead of
   7?
2. Every exponent can be built from powers of two: `n` in binary tells
   you exactly which powers of `x` (`x^1, x^2, x^4, x^8, ...`) to
   multiply together to reach `x^n`.
3. Walk through `n`'s bits one at a time: square a running "current
   power of x" value every step, and multiply it into the answer only
   when the corresponding bit of `n` is `1`.

## Algorithm

**Pattern:** binary exponentiation (fast power / exponentiation by
squaring).
**Core insight:** any exponent `n` can be decomposed into a sum of
powers of two based on its binary representation (e.g. `13 = 8 + 4 + 1`,
i.e. `1101` in binary), so `x^n` can be built as the product of
`x^(2^k)` for each bit `k` that's set in `n`. Each successive
`x^(2^k)` is just the previous one squared, so the whole computation
only needs O(log n) multiplications — squaring the running power once
per bit, and multiplying it into the answer only when that bit is `1` —
instead of O(n) repeated multiplications by `x` itself.
**Invariant:** at the start of each loop iteration, `currentProduct`
holds `x` raised to `2^(number of iterations completed)`, and `ans`
holds `x` raised to the sum of the bit-values already processed.

## Dry Run

**Input:** `myPow(2, 10)` (`10` in binary is `1010`)

| i (before) | i % 2 | ans (before) | multiply? | ans (after) | currentProduct (after) | i (after, i = floor(i/2)) |
|---|---|---|---|---|---|---|
| 10 | 0 | 1 | no | 1 | 4 | 5 |
| 5 | 1 | 1 | yes: 1×4 | 4 | 16 | 2 |
| 2 | 0 | 4 | no | 4 | 256 | 1 |
| 1 | 1 | 4 | yes: 4×256 | 1024 | 65536 | 0 |

Loop ends (`i = 0`). **Result:** `1024` — matches `2^10`.

## JavaScript Solution

```js
function myPow(x, n) {
  if (n === 0) return 1;
  let N = n;
  if (N < 0) {
    x = 1 / x;
    N = -N;
  }

  let ans = 1;
  let currentProduct = x;
  for (let i = N; i > 0; i = Math.floor(i / 2)) {
    if (i % 2 === 1) {
      ans = ans * currentProduct;
    }
    currentProduct = currentProduct * currentProduct;
  }

  return ans;
}
```

## TypeScript Solution

```ts
function myPow(x: number, n: number): number {
  if (n === 0) return 1;
  let base: number = x;
  let exponent: number = n;
  if (exponent < 0) {
    base = 1 / base;
    exponent = -exponent;
  }

  let ans = 1;
  let currentProduct: number = base;
  for (let i = exponent; i > 0; i = Math.floor(i / 2)) {
    if (i % 2 === 1) {
      ans = ans * currentProduct;
    }
    currentProduct = currentProduct * currentProduct;
  }

  return ans;
}
```

## Time Complexity

O(log n) — the loop halves `i` each iteration, so it runs roughly
`log₂(n)` times instead of `n` times.

## Space Complexity

O(1) — a fixed number of scalar variables, for the iterative version
shown (a recursive version would use O(log n) stack space instead).

## Common Mistakes

- Multiplying `x` by itself in a simple `for` loop `n` times — correct,
  but O(n), defeating the purpose of an exponentiation-by-squaring
  exercise.
- Forgetting to invert `x` and negate `n` for negative exponents —
  without that step, the loop condition `i > 0` never even runs for a
  negative `n`, incorrectly returning `1` (the initial `ans`) instead of
  the reciprocal power.
- Integer overflow considerations in other languages (not JavaScript,
  whose numbers are floating-point) — worth mentioning explicitly in an
  interview, since `x^n` can grow extremely large very fast.

## Interview Follow-up Questions

1. How would you write this recursively instead of iteratively, and
   what's the trade-off?
2. Why does exponentiation by squaring achieve O(log n) instead of
   O(n) — what's the intuition tied to binary representation?
3. How would this need to change to compute `x^n mod m` for very large
   `n`, as used in cryptography?

## Similar Questions

- N-th Fibonacci Number (see [pf037-fibonacci-number-memoization.md](pf037-fibonacci-number-memoization.md))
- Standard Iterative Binary Search (see [pf032-binary-search-iterative.md](pf032-binary-search-iterative.md))

---
[← Back to Programming Fundamentals](README.md)
