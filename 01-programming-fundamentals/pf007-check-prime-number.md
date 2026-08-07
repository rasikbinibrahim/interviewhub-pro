# PF007 · Check Prime Number

**Difficulty:** Easy  
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** math, primality-test, loops, trial-division  

## Problem Statement

Given an integer `n`, write a function that returns `true` if `n` is a **prime number**, and `false` otherwise.

A **prime number** is a natural number greater than `1` that has no positive divisors other than `1` and itself.

## Input

- `n`: `number` — integer value to test for primality

## Output

- `boolean` — `true` if `n` is prime, `false` otherwise

## Constraints

- `-10^9 <= n <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 7` | `true` | 7 has no divisors other than 1 and 7 |
| `n = 4` | `false` | 4 is divisible by 2 |
| `n = 1` | `false` | 1 is not a prime number |

## Edge Cases

- `n <= 1` (negative numbers, 0, 1) -> returns `false`
- `n = 2` (the only even prime number) -> returns `true`
- Large prime numbers (e.g. `n = 997`)

## Hints

1. Any number `n <= 1` is not prime.
2. 2 and 3 are prime numbers.
3. If `n` is divisible by 2 or 3, it is not prime.
4. Trial division optimization: Check factors only up to `Math.sqrt(n)`. If `n` has a divisor greater than `Math.sqrt(n)`, it must also have a corresponding divisor smaller than `Math.sqrt(n)`.
5. Further $6k \pm 1$ optimization: All primes greater than 3 can be written in the form $6k \pm 1$.

## Algorithm

**Pattern:** Optimized Trial Division  
**Core Insight:** By testing factors of the form $6k \pm 1$ up to $\sqrt{N}$, we reduce loop iterations by $83\%$ compared to naive checking up to $N$.

## Dry Run

`n = 37`:
- `n <= 1` -> false.
- `n === 2 || n === 3` -> false.
- `37 % 2 === 0 || 37 % 3 === 0` -> false.
- Loop `i` from 5 up to `i * i <= 37` (`i = 5`):
  - `37 % 5 === 0` (false), `37 % 7 === 0` (false).
  - Next `i = 11`. `11 * 11 = 121 > 37` -> Loop ends.
- Return `true`.

## JavaScript Solution

```js
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
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
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

`O(sqrt(N))` — loops up to $\sqrt{N}$ with step 6.

## Space Complexity

`O(1)` — constant auxiliary space.

## Common Mistakes

- Testing all numbers up to `n` in a loop `for (let i = 2; i < n; i++)`, resulting in slow $O(N)$ performance for large $N$.

## Follow-Up Questions

1. How would you generate all prime numbers up to $N$? (Use Sieve of Eratosthenes algorithm in $O(N \log \log N)$ time).

## Similar Questions

- Sieve of Eratosthenes
- Prime Factors Decomposition
