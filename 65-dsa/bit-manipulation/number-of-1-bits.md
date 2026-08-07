# Q1602 · Number of 1 Bits

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Apple, Google
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Bit Manipulation
**Concepts:** bitwise AND, right shift, Brian Kernighan's trick

## Problem Statement

Write a function `hammingWeight(n)` that returns the number of `1` bits
in the binary representation of a non-negative integer `n` (also known
as the Hamming weight).

## Input

`n`: a non-negative integer (treated as a 32-bit unsigned value).

## Output

A single integer: the count of `1` bits in `n`'s binary representation.

## Constraints

`0 <= n <= 2^32 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 11` (binary `1011`) | `3` | Three `1` bits |
| `n = 128` (binary `10000000`) | `1` | A single `1` bit |
| `n = 0` | `0` | No `1` bits |

## Edge Cases

- `n = 0` → `0`, no bits set
- `n` with all 32 bits set (`2^32 - 1`) → `32`
- Powers of two → always exactly `1` bit set

## Hints

1. Converting `n` to a binary string and counting `'1'` characters
   works, but doesn't demonstrate direct bit manipulation — what
   bitwise operator directly tells you the value of the last bit?
2. `n & 1` isolates the last bit; `n >>> 1` (unsigned right shift) drops
   it — repeating this 32 times (or until `n` becomes `0`) visits every
   bit.
3. A faster technique, Brian Kernighan's algorithm: `n & (n - 1)` always
   clears the *lowest set bit* of `n` in a single operation — repeating
   this only as many times as there are `1` bits (not a fixed 32 times)
   counts them directly, skipping over runs of `0` bits entirely.

## Algorithm

**Pattern:** Brian Kernighan's bit-clearing trick.
**Core insight:** for any non-zero `n`, `n & (n - 1)` clears exactly the
lowest set bit of `n`, leaving every other bit unchanged. Repeating this
operation and counting how many times it takes to reach `0` counts
exactly the number of `1` bits — critically, this loop runs once *per
set bit*, not once per bit position, so a number with very few `1` bits
(even if it's numerically large) finishes quickly.
**Invariant:** each iteration strictly reduces the number of set bits in
`n` by exactly one, so the loop terminates in exactly as many iterations
as there are `1` bits, and the counter accumulates that exact count.

## Dry Run

**Input:** `n = 11` (binary `1011`)

| Step | n (binary) | n - 1 (binary) | n & (n-1) (binary) | count |
|---|---|---|---|---|
| 1 | `1011` | `1010` | `1010` | 1 |
| 2 | `1010` | `1001` | `1000` | 2 |
| 3 | `1000` | `0111` | `0000` | 3 |

Loop ends (`n = 0`). **Result:** `3` — matches expected output.

## JavaScript Solution

```js
function hammingWeight(n) {
  let count = 0;
  let remaining = n;

  while (remaining !== 0) {
    remaining &= remaining - 1; // clears the lowest set bit
    count++;
  }

  return count;
}
```

## TypeScript Solution

```ts
function hammingWeight(n: number): number {
  let count = 0;
  let remaining = n;

  while (remaining !== 0) {
    remaining &= remaining - 1;
    count++;
  }

  return count;
}
```

## Time Complexity

O(k) — where `k` is the number of `1` bits in `n` (at most 32), rather
than a fixed O(32) for a naive bit-by-bit scan — Brian Kernighan's trick
skips directly over runs of `0` bits.

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Converting to a string (`n.toString(2)`) and counting `'1'` characters
  — works, but doesn't demonstrate direct bitwise manipulation, which is
  the point of the exercise.
- Using a signed right shift (`>>`) instead of an unsigned one (`>>>`)
  in a naive bit-by-bit scan — for numbers whose highest bit is set,
  signed shift sign-extends and can produce an infinite loop or
  incorrect count; Brian Kernighan's approach sidesteps this issue
  entirely since it never shifts.
- Assuming the loop always runs 32 times — it runs only as many times
  as there are `1` bits, which is the whole benefit of this technique
  over a naive fixed-width scan.

## Interview Follow-up Questions

1. How would the naive "shift and check the last bit 32 times" approach
   compare in the worst and best cases to Brian Kernighan's trick?
2. How would you count the total number of `1` bits across all numbers
   from `0` to `n` (Counting Bits)? (See [counting-bits.md](counting-bits.md).)
3. How would you determine if `n` is a power of two using a similar
   bit-clearing idea?

## Similar Questions

- Single Number (see [single-number.md](single-number.md))
- Counting Bits (see [counting-bits.md](counting-bits.md))
- Power of Two

---
[← Back to 65-dsa](../README.md)
