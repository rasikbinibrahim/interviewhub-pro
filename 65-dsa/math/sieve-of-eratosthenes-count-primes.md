# Q6504 · Count Primes (Sieve of Eratosthenes)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Microsoft, Google, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** Mathematics  
**Concepts:** math, sieve-of-eratosthenes, prime-numbers, algorithms  

## Problem Statement

Given an integer `n`, return the number of prime numbers strictly less than `n`.

## Input

- `n`: `number` — upper bound integer limit

## Output

- `number` — total count of prime numbers in range `[2, n-1]`

## Constraints

- `0 <= n <= 5 * 10^6`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 10` | `4` | Primes less than 10 are `[2, 3, 5, 7]` |
| `n = 0` | `0` | No primes less than 0 |
| `n = 1` | `0` | No primes less than 1 |

## Edge Cases

- `n <= 2` -> returns `0`
- Large `n = 5,000,000` (requires optimized boolean array allocation)

## Hints

1. Checking each number individually for primality up to `n` takes `O(n sqrt(n))` time, which will time out for large `n`.
2. Use the **Sieve of Eratosthenes**: Create a boolean array `isPrime` of size `n` initialized to `true`.
3. Starting from `p = 2`, mark all multiples of `p` starting from `p * p` as `false`.
4. Stop outer loop when `p * p >= n`.

## Algorithm

**Pattern:** Sieve of Eratosthenes  
**Core Insight:** If a number `p` is prime, all its composite multiples (`2p, 3p, 4p...`) cannot be prime. We mark them composite starting at `p^2` because smaller multiples like `k * p` (where `k < p`) will have already been marked by smaller prime factors.

## Dry Run

`n = 10`:
- Initialize `isPrime = [false, false, true, true, true, true, true, true, true, true]` (indices 0..9)
- `p = 2`: `p*p = 4 < 10`. Mark `4, 6, 8` as `false`.
- `p = 3`: `p*p = 9 < 10`. Mark `9` as `false`.
- `p = 4`: `4*4 = 16 >= 10`. Loop terminates.
- Count remaining `true` entries: indices `2, 3, 5, 7` -> count = `4`.

## JavaScript Solution

```js
function countPrimes(n) {
  if (n <= 2) return 0;

  const isPrime = new Uint8Array(n);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p < n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i < n; i += p) {
        isPrime[i] = 0;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) count++;
  }

  return count;
}
```

## TypeScript Solution

```ts
function countPrimes(n: number): number {
  if (n <= 2) return 0;

  const isPrime = new Uint8Array(n);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p < n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i < n; i += p) {
        isPrime[i] = 0;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) count++;
  }

  return count;
}
```

## Time Complexity

`O(N log(log N))` — standard time complexity for Sieve of Eratosthenes.

## Space Complexity

`O(N)` — Uint8Array memory footprint for `n` entries.

## Common Mistakes

- Starting inner loop at `2 * p` instead of `p * p`, causing redundant duplicate work.
- Including `n` itself when problem states "strictly less than `n`".

## Follow-Up Questions

1. How would you optimize space complexity to `O(sqrt(N))` using Segmented Sieve for ranges `[L, R]`?

## Similar Questions

- Ugly Numbers II
- Perfect Squares
