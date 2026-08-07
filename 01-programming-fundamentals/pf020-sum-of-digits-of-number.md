# PF020 · Sum of Digits of a Number

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** math, modulo, loops

## Problem Statement

Write a function `sumOfDigits(n)` that returns the sum of the digits of
an integer `n`, without converting `n` to a string.

## Input

`n`: an integer (may be negative).

## Output

A single integer: the sum of `n`'s digits.

## Constraints

`-2^31 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `1234` | `10` | `1 + 2 + 3 + 4 = 10` |
| `0` | `0` | A single digit, `0`, sums to itself |
| `-456` | `15` | Sign is ignored; `4 + 5 + 6 = 15` |

## Edge Cases

- `n = 0` → `0` (the loop never runs, and `sum` starts at `0`)
- Negative `n` → the sign must be stripped before digit extraction, not
  treated as part of a digit
- Single-digit `n` → that digit is itself the sum

## Hints

1. Converting to a string and summing character codes works, but
   defeats the point of this exercise — think about extracting digits
   arithmetically instead.
2. `n % 10` gives you the last digit of `n`; `Math.floor(n / 10)` removes
   it. What loop, repeated until nothing is left, extracts every digit
   this way?
3. Take the absolute value of `n` up front so the sign never has to be
   handled inside the digit-extraction loop itself.

## Algorithm

**Pattern:** digit extraction via modulo/division.
**Core insight:** `n % 10` isolates the last digit of `n` and
`Math.floor(n / 10)` strips it off, so repeating this until `n` reaches
`0` visits every digit exactly once, in any order — and since this
problem only needs their *sum*, the order digits are visited in doesn't
matter (unlike a "reverse the digits" problem, where it would).
**Invariant:** at the start of each loop iteration, `sum` holds the
correct total of every digit already extracted from `n`.

## Dry Run

**Input:** `n = 1234`

| Step | n (before) | digit = n % 10 | sum += digit | n = Math.floor(n / 10) |
|---|---|---|---|---|
| 1 | 1234 | 4 | 0 + 4 = 4 | 123 |
| 2 | 123 | 3 | 4 + 3 = 7 | 12 |
| 3 | 12 | 2 | 7 + 2 = 9 | 1 |
| 4 | 1 | 1 | 9 + 1 = 10 | 0 |

Loop ends (`n = 0`). **Result:** `10` — matches expected output.

## JavaScript Solution

```js
function sumOfDigits(n) {
  n = Math.abs(n);
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
```

## TypeScript Solution

```ts
function sumOfDigits(n: number): number {
  let remaining: number = Math.abs(n);
  let sum: number = 0;
  while (remaining > 0) {
    sum += remaining % 10;
    remaining = Math.floor(remaining / 10);
  }
  return sum;
}
```

## Time Complexity

O(d), where d is the number of digits in `n` — each iteration removes
exactly one digit.

## Space Complexity

O(1) — a fixed number of scalar variables regardless of how large `n`
is.

## Common Mistakes

- Forgetting `Math.abs(n)` — a negative `n` makes the `while (n > 0)`
  condition false immediately, silently returning `0` for any negative
  input.
- Converting to a string (`String(n).split('').reduce(...)`) — works,
  but sidesteps the arithmetic digit-extraction this exercise is meant
  to test.
- Using `n / 10` without `Math.floor` — JavaScript division isn't
  integer division, so this leaves a fractional remainder that breaks
  the loop's termination condition.

## Interview Follow-up Questions

1. How would you compute the *digital root* (repeatedly summing digits
   until a single digit remains)?
2. How would this need to change to support numbers larger than
   `Number.MAX_SAFE_INTEGER` (using `BigInt`)?
3. How would you sum only the *even-positioned* digits, or every other
   digit, instead of all of them?

## Similar Questions

- Reverse a Number (see [../65-dsa/logic-building/](../65-dsa/logic-building/))
- Check Armstrong Number (see [pf025-check-armstrong-number.md](pf025-check-armstrong-number.md))

---
[← Back to Programming Fundamentals](README.md)
