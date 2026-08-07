# PF005 · Check Leap Year

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** compound conditional logic, divisibility rules

## Problem Statement

Write a function `isLeapYear(year)` that returns `true` if `year` is a
leap year according to the Gregorian calendar rule: a year is a leap
year if it's divisible by 4, except years divisible by 100 are not leap
years, unless they're also divisible by 400.

## Input

`year`: a positive integer.

## Output

Boolean — `true` if `year` is a leap year.

## Constraints

`1 <= year <= 10^6`

## Examples

| Input | Output | Why |
|---|---|---|
| `year = 2024` | `true` | Divisible by 4, not by 100 |
| `year = 1900` | `false` | Divisible by 100 but not by 400 |
| `year = 2000` | `true` | Divisible by 100 AND by 400 |
| `year = 2023` | `false` | Not divisible by 4 at all |

## Edge Cases

- A century year not divisible by 400 (e.g. `1900`, `1800`, `2100`) →
  not a leap year, despite being divisible by 4
- A century year divisible by 400 (e.g. `2000`, `1600`) → is a leap
  year, overriding the "century years aren't leap years" rule
- A year not divisible by 4 at all → straightforwardly not a leap year,
  no further checks needed

## Hints

1. "Divisible by 4" alone isn't the full rule — what famous exception
   trips people up, and what exception-to-the-exception corrects it?
2. Structure the check in the order the rule is stated: first rule out
   "not divisible by 4" entirely; among years divisible by 4, treat
   century years (divisible by 100) as a special case; among those,
   years divisible by 400 are leap years after all.
3. The whole rule collapses into one boolean expression: `(year % 4 ===
   0 && year % 100 !== 0) || year % 400 === 0` — divisible by 4 and NOT
   a century year, OR divisible by 400 regardless of the century check.

## Algorithm

**Pattern:** compound conditional logic encoding a three-tier
divisibility rule.
**Core insight:** the leap year rule has a "rule, exception, exception
to the exception" structure. Expressed as a single boolean expression,
a year is a leap year if (divisible by 4 AND not divisible by 100) OR
(divisible by 400) — the first clause handles ordinary years, and the
second clause specifically reinstates century years that are also
divisible by 400, which the first clause's "not divisible by 100" term
would otherwise exclude.
**Invariant:** none needed — this is a direct O(1) boolean evaluation,
not an iterative algorithm.

## Dry Run

**Input:** `year = 1900`

| Sub-check | Value |
|---|---|
| `1900 % 4 === 0` | `true` |
| `1900 % 100 !== 0` | `false` (1900 IS divisible by 100) |
| First clause: `true && false` | `false` |
| `1900 % 400 === 0` | `false` |
| Final: `false \|\| false` | `false` |

**Result:** `false` — matches expected output (1900 is not a leap year).

## JavaScript Solution

```js
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
```

## TypeScript Solution

```ts
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
```

## Time Complexity

O(1) — a fixed number of arithmetic and logical operations.

## Space Complexity

O(1) — no auxiliary memory.

## Common Mistakes

- Checking only `year % 4 === 0` — incorrectly marks non-leap century
  years like 1900 as leap years.
- Checking `year % 4 === 0 && year % 100 !== 0 && year % 400 === 0` (all
  three ANDed together) — this is logically wrong; it would reject 2024
  (divisible by 4, not by 100, but also not by 400) even though 2024 is
  a genuine leap year. The `400` check should only matter for century
  years, combined with OR, not required unconditionally.
- Getting the order of exceptions backward (treating "divisible by 400"
  as disqualifying rather than re-qualifying) — the actual rule reinstates
  leap-year status for 400-divisible century years, it doesn't remove it.

## Interview Follow-up Questions

1. How would you verify this logic against a known reference table of
   historical leap years to build confidence in the implementation?
2. How would you extend this to also return the number of days in
   February for that year, building on the leap year check?
3. What's the astronomical reason behind the "divisible by 100 but not
   400" exception in the first place (the Gregorian calendar's
   correction to the Julian calendar's slight overcounting)?

## Similar Questions

- Check Even or Odd (see [pf003-check-even-or-odd.md](pf003-check-even-or-odd.md))
- Sum of Natural Numbers up to N (see [pf006-sum-of-natural-numbers.md](pf006-sum-of-natural-numbers.md))

---
[← Back to Programming Fundamentals](README.md)
