# PF039 · Reverse Bits of 32-Bit Unsigned Integer

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Apple
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** bit-manipulation, bitwise, binary

## Problem Statement

Write a function `reverseBits(n)` that reverses the bits of a 32-bit
unsigned integer `n` (bit 0 becomes bit 31, bit 1 becomes bit 30, and so
on).

## Input

`n`: a 32-bit unsigned integer, represented as a JavaScript number.

## Output

A 32-bit unsigned integer: `n` with its bit order reversed.

## Constraints

`0 <= n <= 2^32 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `1` | `2147483648` | `1` is bit 0 set; reversed, that bit lands at position 31 (`2³¹`) |
| `0` | `0` | No bits set — reversal changes nothing |
| `43261596` | `964176192` | A mixed bit pattern reversed end-to-end |

## Edge Cases

- `n = 0` → `0` (no bits to move)
- `n = 2^32 - 1` (all 32 bits set) → unchanged, since reversing an
  all-ones pattern produces the same all-ones pattern
- `n = 1` → the smallest nonzero input, reversed to the *largest* single
  bit position (`2^31`)

## Hints

1. You need to process exactly 32 bit positions, regardless of how many
   bits are actually set — how would you extract one bit of `n` at a
   time, from the least-significant end?
2. `n & 1` gives you `n`'s current lowest bit. Build the `result` by
   shifting it left by one position on every iteration *before* placing
   the next extracted bit in, so bits accumulate in reverse order.
3. After extracting each bit, shift `n` itself right by one (using the
   *unsigned* right shift `>>>`, not `>>`, so no sign bit gets
   incorrectly extended) to expose the next bit for the following
   iteration.

## Algorithm

**Pattern:** bit-by-bit extraction and reversed accumulation, fixed at
32 iterations.
**Core insight:** reversing bit order means the *last* bit extracted
from `n` (its original bit 31) must end up as the *first* bit placed
into the result (its new bit 0), and vice versa. Building `result` by
left-shifting it before OR-ing in each newly extracted bit naturally
achieves this: the first bit extracted (originally bit 0) ends up
shifted furthest to the left by the time all 32 iterations complete,
landing exactly at bit 31 of the result — the reversed position.
**Invariant:** after processing `i` bits, `result`'s lowest `i` bits
(now shifted into result's highest `i` positions) correctly hold the
reverse of `n`'s original lowest `i` bits.

## Dry Run

**Input:** `n = 1` (binary `00000000000000000000000000000001`)

| Iteration | n & 1 | result before shift | result after `(result << 1) \| bit` | n after `>>>= 1` |
|---|---|---|---|---|
| 1 | 1 | `0` | `1` | `0` |
| 2 | 0 | `1` | `10` | `0` |
| 3 | 0 | `10` | `100` | `0` |
| ... | 0 | ... | (shifts left each time) | `0` |
| 32 | 0 | `1000...0` (31 zeros) | `10000000000000000000000000000000` | `0` |

After 32 iterations, `result` has the original single `1` bit shifted
all the way to position 31. `result >>> 0` interprets it as an unsigned
32-bit value: **`2147483648`** — matches expected output (`2³¹`).

## JavaScript Solution

```js
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1; // Unsigned right shift
  }
  return result >>> 0;
}
```

## TypeScript Solution

```ts
function reverseBits(n: number): number {
  let result = 0;
  let remaining: number = n;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (remaining & 1);
    remaining >>>= 1;
  }
  return result >>> 0;
}
```

## Time Complexity

O(1) — always exactly 32 iterations, regardless of `n`'s value (bounded
by the fixed 32-bit width).

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Using the signed right shift `>>` instead of the unsigned `>>> ` when
  shifting `n` — for a value whose top bit is set, `>>` sign-extends,
  filling in `1`s from the left instead of `0`s, corrupting the bits
  extracted on later iterations.
- Forgetting the final `result >>> 0` — without it, `result` may be
  interpreted as a signed 32-bit integer (JavaScript's bitwise operators
  always produce signed 32-bit results internally), which can print as a
  negative number instead of the expected unsigned value.
- Converting to a binary string, reversing the string, and parsing it
  back — works, but sidesteps the bitwise shifting technique this
  exercise is meant to test, and is easy to get subtly wrong with
  leading-zero padding to exactly 32 characters.

## Interview Follow-up Questions

1. How would you optimize this for repeated calls, using a lookup table
   for byte-sized (8-bit) chunks instead of processing one bit at a
   time?
2. Why is the unsigned right shift (`>>>`) necessary here specifically,
   while a signed right shift (`>>`) would be wrong?
3. How does this relate to `Count Set Bits` — could you compute the
   Hamming weight of `n` as a side effect while reversing its bits in
   the same loop?

## Similar Questions

- Count Set Bits (Hamming Weight) (see [pf038-count-set-bits-hamming-weight.md](pf038-count-set-bits-hamming-weight.md))
- Find Missing Number in Sequence (see [pf033-find-missing-number-in-sequence.md](pf033-find-missing-number-in-sequence.md))

---
[← Back to Programming Fundamentals](README.md)
