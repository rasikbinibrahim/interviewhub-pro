# PF023 · Find GCD and LCM of Two Numbers (Euclidean Algorithm)

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** math, euclidean-algorithm, gcd, lcm

## Problem Statement

Write a function `gcd(a, b)` that returns the greatest common divisor of
two positive integers using the Euclidean algorithm. Then, using that
`gcd`, write `lcm(a, b)` that returns their least common multiple.

## Input

`a`, `b`: two positive integers.

## Output

`gcd(a, b)`: their greatest common divisor. `lcm(a, b)`: their least
common multiple.

## Constraints

`1 <= a, b <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `a=48, b=18` | `6` | 6 is the largest number dividing both 48 and 18 |
| `a=17, b=5` | `1` | 17 and 5 share no common factor other than 1 (coprime) |
| `a=4, b=6` | `2` | 4 and 6's largest shared factor is 2 (`lcm(4,6)=12` follows from `4*6/2`) |

## Edge Cases

- `a === b` → `gcd` is that shared value itself, `lcm` is also that
  value
- Coprime inputs (no shared factors, e.g. `7` and `13`) → `gcd` is `1`,
  `lcm` is simply `a * b`
- One value divides the other evenly (`gcd(10, 5)`) → `gcd` is the
  smaller value, `lcm` is the larger value

## Hints

1. Repeatedly subtracting the smaller number from the larger one
   eventually finds the GCD, but it's slow — the Euclidean algorithm's
   key trick is to jump straight to the *remainder* of division instead
   of subtracting one step at a time.
2. `gcd(a, b) === gcd(b, a % b)`, and the recursion bottoms out when the
   second argument reaches `0` — at that point, the first argument is
   the answer. This can be written as a loop instead of recursion to
   avoid stack growth.
3. Once you have `gcd`, `lcm` follows directly from the identity
   `a * b = gcd(a, b) * lcm(a, b)` — so `lcm(a, b) = (a * b) / gcd(a, b)`.

## Algorithm

**Pattern:** Euclidean algorithm (iterative remainder reduction).
**Core insight:** the greatest common divisor of `a` and `b` is the same
as the greatest common divisor of `b` and `a % b`, because any number
that evenly divides both `a` and `b` must also evenly divide their
difference (and therefore their remainder). Repeating this swap-and-
reduce step shrinks the pair rapidly — far faster than subtracting one
at a time — until the second value reaches `0`, at which point the first
value is the GCD. `lcm` then reuses that result via the identity
`a * b = gcd(a, b) * lcm(a, b)`, avoiding a second independent search.
**Invariant:** at every step of the loop, `gcd(a, b)` (the *original*
`a` and `b`) equals `gcd(current a, current b)`.

## Dry Run

**Input:** `gcd(48, 18)`

| Step | a | b | a % b | next (a, b) |
|---|---|---|---|---|
| 1 | 48 | 18 | 12 | (18, 12) |
| 2 | 18 | 12 | 6 | (12, 6) |
| 3 | 12 | 6 | 0 | (6, 0) |

Loop ends (`b = 0`). **Result:** `a = 6` — matches expected output.

Then `lcm(48, 18) = |48 * 18| / 6 = 864 / 6 = 144`.

## JavaScript Solution

```js
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
```

## TypeScript Solution

```ts
function gcd(a: number, b: number): number {
  let x: number = a;
  let y: number = b;
  while (y !== 0) {
    const temp: number = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
```

## Time Complexity

O(log(min(a, b))) — each step roughly halves the smaller value, since
the remainder of a division is always less than the divisor (this is a
classical result following from Fibonacci-number worst-case analysis of
the Euclidean algorithm).

## Space Complexity

O(1) — a fixed number of scalar variables for the iterative version.

## Common Mistakes

- Implementing GCD via repeated subtraction instead of modulo — correct,
  but degrades to O(max(a, b)) time in the worst case (e.g. `gcd(1,
  1000000)` takes a million subtraction steps).
- Computing `lcm` independently (e.g. by scanning multiples) instead of
  reusing `gcd` via the `a * b = gcd * lcm` identity — unnecessarily
  slow and duplicates work already done.
- Computing `a * b` before checking for overflow — for very large inputs
  in other languages this can overflow a fixed-width integer type;
  JavaScript's numbers are floating-point so this specific bug doesn't
  apply here, but it's worth flagging as a real constraint in typed
  languages.

## Interview Follow-up Questions

1. How would you extend `gcd` to work on more than two numbers at once?
2. What does it mean for `gcd(a, b) === 1`, and why is that condition
   called "coprime"?
3. How would you prove that the Euclidean algorithm always terminates?

## Similar Questions

- Check Prime Number (see [pf022-check-prime-number.md](pf022-check-prime-number.md))
- Check Perfect Number (see [pf034-check-perfect-number.md](pf034-check-perfect-number.md))

---
[← Back to Programming Fundamentals](README.md)
