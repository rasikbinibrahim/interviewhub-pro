# PF034 · Check Perfect Number

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** math, divisors

## Problem Statement

Write a function `checkPerfectNumber(num)` that returns `true` if `num`
is a perfect number — a positive integer equal to the sum of its proper
divisors (all divisors excluding itself) — and `false` otherwise.

## Input

`num`: an integer.

## Output

A boolean: `true` if `num` is a perfect number, `false` otherwise.

## Constraints

`-2^31 <= num <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `28` | `true` | Proper divisors `1+2+4+7+14 = 28` |
| `6` | `true` | Proper divisors `1+2+3 = 6` |
| `12` | `false` | Proper divisors `1+2+3+4+6 = 16 ≠ 12` |

## Edge Cases

- `num <= 1` → always `false` (no positive integer `<= 1` is perfect;
  `1`'s only proper divisor would be nothing, since `1` has no divisors
  other than itself)
- Negative `num` → `false` (perfect numbers are defined only for
  positive integers)
- Large `num` with no matching divisor sum → `false`, found efficiently
  since the search only goes up to `sqrt(num)`

## Hints

1. Checking every number from `1` to `num - 1` as a potential divisor
   works but is O(num) — divisors come in pairs (`d` and `num / d`), so
   how far do you actually need to search?
2. You only need to check candidate divisors up to `sqrt(num)`; for each
   divisor `i` found, both `i` and its pair `num / i` contribute to the
   sum (unless they're equal, in which case count it only once).
3. Start the running sum at `1` (since `1` is a proper divisor of every
   number `> 1`), and search starting from `2` upward.

## Algorithm

**Pattern:** divisor-pair summation up to the square root.
**Core insight:** divisors of `num` always come in pairs `(i, num / i)`
whenever `i` divides `num` evenly, and one member of every such pair is
always `<= sqrt(num)`. So scanning candidate divisors only up to
`sqrt(num)` and adding *both* members of each found pair to the running
sum covers every proper divisor, without ever checking values past the
square root. The special case `i * i === num` (a divisor that pairs with
itself) is added only once, to avoid double-counting.
**Invariant:** after processing candidate divisor `i`, `sum` holds the
correct total of every proper divisor of `num` found among `1` through
`i` and their paired counterparts.

## Dry Run

**Input:** `num = 28`

| i | i*i <= 28? | num % i === 0? | sum += i | pair = 28/i | i*i === 28? | sum += pair | sum after |
|---|---|---|---|---|---|---|---|
| start | – | – | – | – | – | – | `1` (seeded) |
| 2 | 4<=28 | yes | +2 | 14 | no (4≠28) | +14 | `17` |
| 3 | 9<=28 | no | – | – | – | – | `17` |
| 4 | 16<=28 | yes | +4 | 7 | no (16≠28) | +7 | `28` |
| 5 | 25<=28 | no | – | – | – | – | `28` |
| 6 | 36<=28? no | loop ends | – | – | – | – | `28` |

`sum (28) === num (28)`. **Result:** `true` — matches expected output.

## JavaScript Solution

```js
function checkPerfectNumber(num) {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i * i !== num) sum += num / i;
    }
  }
  return sum === num;
}
```

## TypeScript Solution

```ts
function checkPerfectNumber(num: number): boolean {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i * i !== num) sum += num / i;
    }
  }
  return sum === num;
}
```

## Time Complexity

O(√num) — the loop only scans candidate divisors up to `sqrt(num)`.

## Space Complexity

O(1) — a single running sum, no auxiliary storage.

## Common Mistakes

- Scanning all divisors from `1` to `num - 1` — correct, but O(num)
  instead of O(√num), far too slow for large inputs.
- Forgetting to guard against double-counting when `i * i === num` (a
  divisor that's its own pair) — without that check, a perfect square
  divisor gets added twice, inflating the sum incorrectly.
- Forgetting the `num <= 1` guard — without it, `num = 1` could
  incorrectly evaluate as `sum(1) === 1`, but `1` has no proper divisors
  at all (its only divisor is itself), so it must never be reported as
  perfect.

## Interview Follow-up Questions

1. How would you generate the actual list of proper divisors, not just
   their sum?
2. Why are perfect numbers so rare — what does that suggest about
   searching for large ones efficiently?
3. How does this problem relate to `Check Prime Number` — what's the
   overlap in technique between the two?

## Similar Questions

- Check Prime Number (see [pf022-check-prime-number.md](pf022-check-prime-number.md))
- Check Armstrong Number (see [pf025-check-armstrong-number.md](pf025-check-armstrong-number.md))

---
[← Back to Programming Fundamentals](README.md)
