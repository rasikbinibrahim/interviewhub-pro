# PF021 · Check if a Year is a Leap Year

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** math, conditional-logic

## Problem Statement

Write a function `isLeapYear(year)` that returns `true` if `year` is a
leap year on the Gregorian calendar, and `false` otherwise.

## Input

`year`: a positive integer.

## Output

A boolean: `true` if `year` is a leap year, `false` otherwise.

## Constraints

`1 <= year <= 9999`

## Examples

| Input | Output | Why |
|---|---|---|
| `2024` | `true` | Divisible by 4, and not divisible by 100 |
| `1900` | `false` | Divisible by 100 but not by 400 — a century exception |
| `2000` | `true` | Divisible by 400 — the exception to the exception |

## Edge Cases

- Century years not divisible by 400 (`1900`, `2100`) → **not** leap
  years, despite being divisible by 4
- Century years divisible by 400 (`2000`, `2400`) → **are** leap years
- Ordinary non-century years divisible by 4 (`2024`) → leap years
- Years not divisible by 4 at all (`2023`) → never leap years

## Hints

1. The naive rule "divisible by 4" is *almost* right, but has a
   well-known exception at century boundaries — what's special about
   years like `1900` versus `2000`?
2. The full Gregorian rule is: divisible by 4 AND (not divisible by 100
   OR divisible by 400).
3. Structure the condition as two independent cases joined by `||`: the
   common case (divisible by 4, not a century year) and the rarer
   exception case (divisible by 400).

## Algorithm

**Pattern:** compound modulo conditional.
**Core insight:** the Gregorian calendar adds a leap day every 4 years to
correct for Earth's orbit being slightly longer than 365 days, but that
overcorrects slightly — so century years (divisible by 100) skip the
leap day, *except* for years divisible by 400, which restores it, since
that's a closer long-run approximation to the true orbital period.
**Invariant:** the expression evaluates `true` exactly for years that
satisfy the actual Gregorian leap-year rule — every non-century
multiple-of-4, plus every multiple-of-400 century.

## Dry Run

**Input:** `year = 1900`

| Sub-check | Expression | Result |
|---|---|---|
| Divisible by 4? | `1900 % 4 === 0` | `true` |
| Not divisible by 100? | `1900 % 100 !== 0` | `false` |
| First clause (`4 && !100`) | `true && false` | `false` |
| Divisible by 400? | `1900 % 400 === 0` | `false` |
| Final (`clause1 \|\| clause2`) | `false \|\| false` | `false` |

**Result:** `false` — matches expected output (1900 is not a leap year).

## JavaScript Solution

```js
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
```

## TypeScript Solution

```ts
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
```

## Time Complexity

O(1) — a fixed number of modulo operations regardless of the input.

## Space Complexity

O(1) — no auxiliary storage.

## Common Mistakes

- Checking only `year % 4 === 0` — incorrectly marks century years like
  `1900` as leap years.
- Checking `year % 4 === 0 && year % 100 !== 0 && year % 400 === 0` (all
  three ANDed together) — this is over-restrictive and would incorrectly
  reject `2024`, since `2024 % 400 !== 0`; the `%400` check only applies
  *as an exception* to century years, not as a universal requirement.
- Relying on `new Date(year, 1, 29).getMonth() === 1` (checking whether
  February 29th "rolls over" into March) — works, but obscures the
  actual mathematical rule being tested and is easy to get subtly wrong
  around timezone/date-object edge cases.

## Interview Follow-up Questions

1. Why does the Gregorian calendar need the "divisible by 400" exception
   at all — what real-world inaccuracy is it correcting for?
2. How would you validate that `year` is a plausible input (e.g. reject
   negative years or non-integers) before applying the leap-year rule?
3. How would you compute the number of leap years between two given
   years efficiently, without checking every year individually?

## Similar Questions

- Check Prime Number (see [pf022-check-prime-number.md](pf022-check-prime-number.md))
- Check Perfect Number (see [pf034-check-perfect-number.md](pf034-check-perfect-number.md))

---
[← Back to Programming Fundamentals](README.md)
