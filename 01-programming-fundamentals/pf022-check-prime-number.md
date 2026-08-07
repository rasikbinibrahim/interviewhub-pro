# PF022 · Check Prime Number

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** math, prime-numbers

## Problem Statement

Write a function `isPrime(n)` that returns `true` if `n` is a prime
number, and `false` otherwise, in better than O(n) time.

## Input

`n`: an integer.

## Output

A boolean: `true` if `n` is prime, `false` otherwise.

## Constraints

`-2^31 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `7` | `true` | Only divisible by 1 and itself |
| `1` | `false` | 1 is defined as not prime by convention |
| `9` | `false` | Divisible by 3 |

## Edge Cases

- `n <= 1` → always `false` (primes are defined starting at 2)
- `n = 2` or `n = 3` → `true` (the only even prime, and the smallest odd
  prime)
- Even `n > 2` → always `false` (divisible by 2)
- Negative `n` → `false` (primality is only defined for positive
  integers)
- Perfect square of a prime (e.g. `n = 49 = 7 * 7`) → correctly caught
  because the trial-division loop runs up to `sqrt(n)` inclusive

## Hints

1. Checking every divisor from `2` to `n - 1` works but is O(n) — you
   only ever need to check divisors up to `sqrt(n)`, since any factor
   pair `(a, b)` with `a * b = n` must have one factor `<= sqrt(n)`.
2. Handle `n <= 1`, `n <= 3`, and even numbers as fast, explicit special
   cases before the main loop — this both simplifies the loop and skips
   unnecessary work for the most common non-prime inputs.
3. Every prime greater than 3 is of the form `6k ± 1` — so once 2 and 3
   are ruled out, you only need to test divisors at that specific
   spacing, roughly a third of the work of checking every odd number.

## Algorithm

**Pattern:** trial division up to the square root, with a `6k ± 1`
optimization.
**Core insight:** if `n` has a divisor greater than `sqrt(n)`, it must
also have a corresponding divisor smaller than `sqrt(n)` (since their
product is `n`), so trial division never needs to go past `sqrt(n)`.
Additionally, every integer can be written as `6k`, `6k+1`, `6k+2`,
`6k+3`, `6k+4`, or `6k+5` — and of those, `6k`, `6k+2`, `6k+4` are even
and `6k+3` is divisible by 3, leaving only `6k+1` and `6k+5` (equivalent
to `6k-1`) as candidates that need checking once 2 and 3 are already
ruled out.
**Invariant:** if the loop reaches `i` without finding a divisor, `n`
has no divisor in `[2, i)`, so if the loop completes entirely, `n` has
no divisor other than 1 and itself.

## Dry Run

**Input:** `n = 29`

| Check | Result |
|---|---|
| `n <= 1`? | false |
| `n <= 3`? | false |
| `n % 2 === 0 \|\| n % 3 === 0`? | false (29 is odd, not divisible by 3) |
| loop `i = 5`: `5*5=25 <= 29`? | yes; `29%5===0`? no; `29%7===0`? no |
| loop `i = 11`: `11*11=121 <= 29`? | no — loop stops |

Loop never found a divisor. **Result:** `true` — matches expected output
(29 is prime).

## JavaScript Solution

```js
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
```

## TypeScript Solution

```ts
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
```

## Time Complexity

O(√n) — the loop runs roughly `√n / 6` times, since it advances by 6
each iteration up to `√n`.

## Space Complexity

O(1) — a single loop counter, no auxiliary storage.

## Common Mistakes

- Looping all the way to `n - 1` (or even to `n / 2`) instead of
  stopping at `sqrt(n)` — correct, but O(n) instead of O(√n), which
  matters a lot for large `n`.
- Forgetting the `n <= 1` guard — without it, `n = 1` or `n = 0` can
  incorrectly fall through to `true` depending on how the rest of the
  logic is written.
- Using `i <= Math.sqrt(n)` recomputed on every iteration instead of
  `i * i <= n` — functionally similar, but repeatedly calling
  `Math.sqrt` is unnecessary overhead compared to a single
  multiplication.

## Interview Follow-up Questions

1. How would you find all prime numbers up to `n` efficiently (Sieve of
   Eratosthenes), rather than testing one number at a time?
2. How would this function's performance change for very large `n` (say,
   a 20-digit number), and what would you reach for instead of trial
   division?
3. How would you find the prime factorization of `n`, not just whether
   it's prime?

## Similar Questions

- Find GCD and LCM of Two Numbers (see [pf023-find-gcd-and-lcm-of-two-numbers.md](pf023-find-gcd-and-lcm-of-two-numbers.md))
- Check Perfect Number (see [pf034-check-perfect-number.md](pf034-check-perfect-number.md))

---
[← Back to Programming Fundamentals](README.md)
