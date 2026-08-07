# LB007 · Check Prime Number

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon
**Interview Frequency:** ★★★★★
**Category:** Logic Building
**Concepts:** divisibility testing, square-root bound optimization

## Problem Statement

Write a function `isPrime(n)` that returns `true` if `n` is a prime
number (greater than 1, divisible only by 1 and itself) and `false`
otherwise.

## Input

`n`: an integer.

## Output

Boolean — `true` if `n` is prime.

## Constraints

`0 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 7` | `true` | Only divisible by 1 and 7 |
| `n = 8` | `false` | Divisible by 2 and 4 |
| `n = 1` | `false` | By definition, 1 is not prime |

## Edge Cases

- `n = 0` or `n = 1` → always `false`, by definition of primality
- `n = 2` → the only even prime number; a naive "even numbers aren't
  prime" shortcut must not exclude 2 itself
- Large prime numbers → checking divisors only up to `sqrt(n)` matters
  for performance, not just correctness

## Hints

1. Checking every number from `2` to `n - 1` as a possible divisor works
   but is wasteful — once you've checked divisors up to a certain point
   without finding one, can you be sure none exist beyond that point?
2. If `n` has a divisor `d` greater than `sqrt(n)`, then `n / d` is a
   divisor *smaller* than `sqrt(n)` — so if no divisor exists up to
   `sqrt(n)`, none exists beyond it either.
3. Checking divisors only from `2` up to `Math.sqrt(n)` (inclusive) is
   sufficient to correctly determine primality, cutting the work from
   O(n) down to O(sqrt(n)).

## Algorithm

**Pattern:** trial division bounded by the square root of `n`.
**Core insight:** divisors of `n` always come in pairs `(d, n / d)`
multiplying to `n`. For any divisor pair, at least one of the two
values must be `<= sqrt(n)` (they can't both be strictly greater, since
their product would then exceed `n`). This means checking for divisors
only up to `sqrt(n)` is sufficient — if none is found in that range,
none exists at all, since any divisor beyond `sqrt(n)` would necessarily
pair with one below it that would already have been found.
**Invariant:** after checking every integer from `2` up to the current
candidate divisor without finding one that evenly divides `n`, `n` is
guaranteed to have no divisor at or below that point.

## Dry Run

**Input:** `n = 29` (`sqrt(29) ≈ 5.39`, so check divisors 2 through 5)

| Candidate divisor | 29 % divisor | Divides evenly? |
|---|---|---|
| 2 | 1 | no |
| 3 | 2 | no |
| 4 | 1 | no |
| 5 | 4 | no |

No divisor found up to `sqrt(29)`. **Result:** `true` — 29 is prime,
matches expected output.

## JavaScript Solution

```js
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    if (n % divisor === 0) {
      return false;
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    if (n % divisor === 0) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

O(sqrt(n)) — only odd divisors up to `sqrt(n)` are checked.

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Checking divisors all the way up to `n - 1` instead of stopping at
  `sqrt(n)` — correct but unnecessarily slow for large `n`.
- Forgetting `n <= 1` returns `false` — both `0` and `1` are common
  off-by-one traps since neither is prime by definition, despite having
  no smaller positive divisors either.
- Excluding all even numbers including `2` itself — `2` is the one even
  prime and needs its own explicit check before the "skip even
  divisors" optimization kicks in.

## Interview Follow-up Questions

1. How would you efficiently find all primes up to `n` (Sieve of
   Eratosthenes) instead of checking one number at a time?
2. How would you find the prime factorization of `n`, building on this
   same divisibility-checking idea?
3. How does trial division's O(sqrt(n)) compare to probabilistic
   primality tests (like Miller-Rabin) used for very large numbers in
   cryptography?

## Similar Questions

- Sum of Digits (see [lb006-sum-of-digits.md](lb006-sum-of-digits.md))
- FizzBuzz (see [lb005-fizzbuzz.md](lb005-fizzbuzz.md))

---
[← Back to 65-dsa](../README.md)
