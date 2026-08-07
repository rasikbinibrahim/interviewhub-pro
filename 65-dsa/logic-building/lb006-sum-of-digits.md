# LB006 · Sum of Digits

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Amazon
**Interview Frequency:** ★★★★☆
**Category:** Logic Building
**Concepts:** modulo/division digit extraction, accumulator pattern

## Problem Statement

Write a function `sumOfDigits(n)` that returns the sum of the individual
digits of a non-negative integer `n`, without converting `n` to a string.

## Input

`n`: a non-negative integer.

## Output

A single integer: the sum of `n`'s digits.

## Constraints

`0 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 12345` | `15` | `1+2+3+4+5 = 15` |
| `n = 0` | `0` | Zero has one digit, itself |
| `n = 9` | `9` | Single digit, sums to itself |

## Edge Cases

- `n = 0` → the loop-based digit extraction never runs (since `0 % 10 =
  0` and `0 / 10 = 0` immediately), so this needs an explicit check, or
  a loop structure that still runs at least once
- Single-digit numbers → sum equals the number itself
- Large numbers near the constraint boundary → must not lose precision
  (safe in JS since these stay well within `Number.MAX_SAFE_INTEGER`)

## Hints

1. Without converting to a string, how else can you access "each digit"
   of a number one at a time?
2. `n % 10` extracts the last digit; `Math.floor(n / 10)` removes it —
   repeating this until nothing is left visits every digit exactly once.
3. Watch out for `n = 0` specifically: if your loop condition is `while
   (n > 0)`, it never executes for `n = 0`, silently producing the wrong
   sum (0, which happens to be correct here, but only by coincidence —
   verify the loop structure handles it deliberately, not accidentally).

## Algorithm

**Pattern:** digit extraction via modulo/division, accumulated into a
running sum.
**Core insight:** the same peel-off-the-last-digit technique used for
reversing a number applies here — `n % 10` isolates the last digit, and
`Math.floor(n / 10)` drops it, repeated until the number is fully
consumed. Instead of building a reversed number from the digits, this
problem just adds each one to a running total.
**Invariant:** after each iteration, `sum` holds the sum of every digit
already extracted from the original `n`, and `remaining` holds only the
digits not yet processed.

## Dry Run

**Input:** `n = 12345`

| Step | remaining (before) | digit = remaining % 10 | sum += digit | remaining = Math.floor(remaining / 10) |
|---|---|---|---|---|
| 1 | 12345 | 5 | 0 + 5 = 5 | 1234 |
| 2 | 1234 | 4 | 5 + 4 = 9 | 123 |
| 3 | 123 | 3 | 9 + 3 = 12 | 12 |
| 4 | 12 | 2 | 12 + 2 = 14 | 1 |
| 5 | 1 | 1 | 14 + 1 = 15 | 0 |

Loop ends (`remaining = 0`). **Result:** `15` — matches expected output.

## JavaScript Solution

```js
function sumOfDigits(n) {
  if (n === 0) return 0;

  let sum = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit = remaining % 10;
    sum += digit;
    remaining = Math.floor(remaining / 10);
  }

  return sum;
}
```

## TypeScript Solution

```ts
function sumOfDigits(n: number): number {
  if (n === 0) return 0;

  let sum = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit: number = remaining % 10;
    sum += digit;
    remaining = Math.floor(remaining / 10);
  }

  return sum;
}
```

## Time Complexity

O(d) — where `d` is the number of digits in `n`.

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Converting `n` to a string and summing character codes — works, but
  violates the "no string conversion" constraint and doesn't demonstrate
  the digit-extraction technique being tested.
- Forgetting `Math.floor` on the division — leaves a fractional
  remainder in JS, breaking the loop's `> 0` condition.
- Not explicitly handling `n = 0` — happens to still work here since the
  loop simply never runs and `sum` starts at `0`, but relying on that
  coincidence rather than understanding why is a common gap in
  explanation during an interview.

## Interview Follow-up Questions

1. How would you compute the *digital root* (repeatedly summing digits
   until a single digit remains)?
2. How would this change for negative input?
3. How would you sum digits of a number represented as a string of
   arbitrary length (too large for a normal number type)?

## Similar Questions

- FizzBuzz (see [lb005-fizzbuzz.md](lb005-fizzbuzz.md))
- Palindrome Number Check (see [lb008-palindrome-number-check.md](lb008-palindrome-number-check.md))

---
[← Back to 65-dsa](../README.md)
