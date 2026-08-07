# PF038 · Count Set Bits (Hamming Weight, Brian Kernighan's Bitwise Algorithm)

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** bit-manipulation, hamming-weight, binary

## Problem Statement

Write a function `hammingWeight(n)` that returns the number of `1` bits
(the Hamming weight) in the binary representation of a non-negative
integer `n`.

## Input

`n`: a non-negative integer.

## Output

The count of `1` bits in `n`'s binary representation.

## Constraints

`0 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `11` | `3` | `11` is `1011` in binary — three `1` bits |
| `128` | `1` | `128` is `10000000` in binary — one `1` bit |
| `0` | `0` | `0` has no set bits |

## Edge Cases

- `n = 0` → `0` (loop never runs, since `n !== 0` is immediately false)
- Power of two (`n = 128`) → always exactly one set bit
- All bits set within a range (e.g. `n = 255 = 11111111`) → count equals
  the number of bits in that range

## Hints

1. Checking every one of the 32 bit positions with `(n >> i) & 1` works,
   but does fixed work even when `n` has very few set bits — is there a
   way to do work proportional only to the *number of set bits*, not the
   total bit width?
2. `n & (n - 1)` has a special property: it clears exactly the lowest
   set bit of `n`, leaving every other bit unchanged. What happens if
   you repeat that operation until `n` becomes `0`?
3. Each application of `n & (n - 1)` removes exactly one set bit, so
   counting how many times you can apply it before `n` reaches `0`
   directly gives you the total count of set bits.

## Algorithm

**Pattern:** Brian Kernighan's bit-clearing trick.
**Core insight:** subtracting `1` from `n` flips every bit from the
lowest set bit down to bit 0 (turning that lowest `1` into a `0`, and
every `0` below it into a `1`), while leaving all higher bits unchanged.
ANDing `n` with `n - 1` therefore clears exactly that lowest set bit and
nothing else. Repeating this until `n` becomes `0` removes one set bit
per iteration, so the number of iterations needed is exactly the number
of set bits — no need to ever inspect the 29+ zero bits typically
present in a 32-bit number.
**Invariant:** at the start of each loop iteration, `count` holds the
number of set bits already cleared from the original `n`, and the
current `n` holds only the bits that haven't been counted yet.

## Dry Run

**Input:** `n = 11` (binary `1011`)

| Step | n (binary, before) | n - 1 (binary) | n & (n-1) | n (after) | count |
|---|---|---|---|---|---|
| 1 | `1011` | `1010` | `1010` | `1010` (10) | 1 |
| 2 | `1010` | `1001` | `1000` | `1000` (8) | 2 |
| 3 | `1000` | `0111` | `0000` | `0000` (0) | 3 |

Loop ends (`n === 0`). **Result:** `3` — matches expected output.

## JavaScript Solution

```js
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Clears lowest set bit!
    count++;
  }
  return count;
}
```

## TypeScript Solution

```ts
function hammingWeight(n: number): number {
  let count = 0;
  let remaining: number = n;
  while (remaining !== 0) {
    remaining = remaining & (remaining - 1);
    count++;
  }
  return count;
}
```

## Time Complexity

O(k), where k is the number of set bits in `n` — not O(32)/O(bit width),
since each iteration clears exactly one set bit and the loop stops as
soon as none remain.

## Space Complexity

O(1) — a single counter and the (locally reassigned) input value.

## Common Mistakes

- Looping over all 32 bit positions unconditionally (`for (let i = 0; i
  < 32; i++)`) — correct, but does fixed work regardless of how many
  bits are actually set, instead of work proportional to the set-bit
  count.
- Converting to a binary string and counting `'1'` characters
  (`n.toString(2).split('').filter(c => c === '1').length`) — works, but
  sidesteps the bitwise technique this exercise is meant to test.
- Forgetting that `n & (n - 1)` only clears the *lowest* set bit, not
  all of them — misreading this as clearing every bit would break the
  loop's per-iteration counting logic.

## Interview Follow-up Questions

1. How would you count set bits for *every* number from `0` to `n`
   efficiently, reusing previously computed results?
2. What does `n & (n - 1) === 0` tell you about `n` (hint: this is a
   classic power-of-two check)?
3. How would this algorithm need to change for negative numbers
   represented in two's complement?

## Similar Questions

- Reverse Bits of 32-Bit Unsigned Integer (see [pf039-reverse-bits-of-32bit-unsigned-integer.md](pf039-reverse-bits-of-32bit-unsigned-integer.md))
- Check Prime Number (see [pf022-check-prime-number.md](pf022-check-prime-number.md))

---
[← Back to Programming Fundamentals](README.md)
