# PF003 · Check Even or Odd

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** modulo operator, bitwise AND as an alternative

## Problem Statement

Write a function `isEven(n)` that returns `true` if the integer `n` is
even, and `false` if it's odd.

## Input

`n`: an integer (may be negative).

## Output

Boolean — `true` if `n` is even.

## Constraints

`-2^31 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 4` | `true` | Divisible by 2 with no remainder |
| `n = 7` | `false` | Remainder of 1 when divided by 2 |
| `n = -4` | `true` | Negative even numbers are still even |
| `n = 0` | `true` | Zero is even |

## Edge Cases

- `n = 0` → even
- Negative even numbers → `-4 % 2` evaluates to `-0` in JavaScript,
  which must still compare as even, not be mistaken for a non-zero
  remainder
- Negative odd numbers → `-3 % 2` evaluates to `-1`, not `1` — a check
  against `=== 0` handles this correctly regardless of sign, but a check
  against a specific non-zero remainder value would need to account for
  the sign

## Hints

1. The most direct check is whether `n` divides evenly by 2 — what
   operator directly gives you the remainder of a division?
2. `n % 2 === 0` is true for both positive and negative even numbers,
   since JavaScript's `%` preserves the sign of the dividend but a
   remainder of exactly zero has no sign to worry about.
3. A bitwise alternative, `(n & 1) === 0`, checks the least significant
   bit directly — this works because a number's evenness is entirely
   determined by whether its last binary bit is 0 or 1, and it behaves
   correctly for negative numbers too, since JavaScript's bitwise
   operators use two's-complement representation.

## Algorithm

**Pattern:** modulo-based divisibility check.
**Core insight:** a number is even exactly when it's divisible by 2 with
no remainder — checking `n % 2 === 0` captures this directly.
Comparing against `=== 0` (rather than checking for a specific non-zero
remainder value like `=== 1`) is what makes this robust to negative
numbers, since `%` in JavaScript returns a remainder with the same sign
as the dividend, but zero has no sign ambiguity.
**Invariant:** none needed — this is a direct O(1) check, not an
iterative algorithm.

## Dry Run

**Input:** `n = -4`

| Expression | Value |
|---|---|
| `n % 2` | `-0` (JavaScript's signed zero) |
| `-0 === 0` | `true` |

**Result:** `true` — matches expected output (negative even numbers are
still even).

## JavaScript Solution

```js
function isEven(n) {
  return n % 2 === 0;
}
```

## TypeScript Solution

```ts
function isEven(n: number): boolean {
  return n % 2 === 0;
}
```

## Time Complexity

O(1) — a single arithmetic operation and comparison.

## Space Complexity

O(1) — no auxiliary memory.

## Common Mistakes

- Checking `n % 2 === 1` to detect odd numbers instead of checking
  evenness against `0` — fails for negative odd numbers, since `-3 % 2`
  is `-1` in JavaScript, not `1`.
- Using `n % 2` directly as a truthy/falsy check without the explicit
  `=== 0` comparison — `-0` is falsy in JS, so this happens to work by
  coincidence for negative even numbers, but relying on that coincidence
  rather than an explicit comparison is fragile and unclear.
- Assuming `Number.isInteger` needs to be checked first — not required
  by this problem's integer-only constraint, but worth raising if `n`
  could be a non-integer in a broader context.

## Interview Follow-up Questions

1. How would the bitwise `(n & 1) === 0` approach compare in
   performance to the modulo approach, and why do they behave the same
   even for negative numbers?
2. How would you check evenness for a number represented as a string
   (too large for a normal number type)?
3. How would you write `isOdd` in terms of `isEven`, without repeating
   the core logic?

## Similar Questions

- Find the Largest of Three Numbers (see [pf002-largest-of-three-numbers.md](pf002-largest-of-three-numbers.md))
- Check Leap Year (see [pf005-check-leap-year.md](pf005-check-leap-year.md))

---
[← Back to Programming Fundamentals](README.md)
