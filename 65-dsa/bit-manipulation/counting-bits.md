# Q1603 · Counting Bits

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Bit Manipulation
**Concepts:** dynamic programming, bit-position recurrence

## Problem Statement

Given a non-negative integer `n`, return an array `answer` of length
`n + 1` where `answer[i]` is the number of `1` bits in the binary
representation of `i`, for every `i` from `0` to `n` — in O(n) total
time (not O(n) *per number*, which would be O(n log n) overall).

## Input

`n`: a non-negative integer.

## Output

An array of length `n + 1`: the Hamming weight of every integer from
`0` to `n`.

## Constraints

`0 <= n <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 2` | `[0,1,1]` | `0` has 0 bits, `1` (binary `1`) has 1, `2` (binary `10`) has 1 |
| `n = 5` | `[0,1,1,2,1,2]` | `3` (`11`) has 2, `4` (`100`) has 1, `5` (`101`) has 2 |

## Edge Cases

- `n = 0` → `[0]`, just the single entry for zero
- Powers of two (`1, 2, 4, 8, ...`) → always exactly `1` bit
- The requirement to run in O(n) total (not O(n) per number) rules out
  calling a per-number bit-counting routine independently for each `i`

## Hints

1. Computing the bit count for each number independently (e.g. with
   Brian Kernighan's trick per number) gives a correct but O(n log n)
   overall solution — how could the answer for a smaller number be
   reused to compute the answer for a larger one?
2. Every number `i` can be related to a smaller number by removing its
   lowest set bit: `i & (i - 1)` is exactly that smaller number, and it
   differs from `i` by exactly one bit (the one that got cleared).
3. `answer[i] = answer[i & (i - 1)] + 1` — since `i & (i - 1)` is always
   strictly smaller than `i`, its answer has already been computed
   earlier in the same left-to-right pass, making this a simple O(1)
   lookup plus one addition per number.

## Algorithm

**Pattern:** dynamic programming via the "remove lowest set bit"
recurrence.
**Core insight:** `i & (i - 1)` clears `i`'s lowest set bit, producing a
strictly smaller number whose bit count is already known (since the
array is filled left to right, from `0` up to `n`). The bit count of `i`
is therefore always exactly one more than the bit count of `i & (i -
1)` — reusing previously computed answers turns what would be O(log n)
work per number into O(1) work per number, for O(n) total.
**Invariant:** by the time `answer[i]` is computed, `answer[j]` is
already correctly filled in for every `j < i`, including
`j = i & (i - 1)`.

## Dry Run

**Input:** `n = 5`

| i | i & (i-1) | answer[i & (i-1)] | answer[i] |
|---|---|---|---|
| 0 | — (base case) | — | 0 |
| 1 | `1 & 0 = 0` | 0 | 1 |
| 2 | `2 & 1 = 0` | 0 | 1 |
| 3 | `3 & 2 = 2` | 1 | 2 |
| 4 | `4 & 3 = 0` | 0 | 1 |
| 5 | `5 & 4 = 4` | 1 | 2 |

**Result:** `[0,1,1,2,1,2]` — matches expected output.

## JavaScript Solution

```js
function countBits(n) {
  const answer = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // i & (i - 1) clears the lowest set bit, always producing a
    // smaller number whose answer is already computed.
    answer[i] = answer[i & (i - 1)] + 1;
  }

  return answer;
}
```

## TypeScript Solution

```ts
function countBits(n: number): number[] {
  const answer: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    answer[i] = answer[i & (i - 1)]! + 1;
  }

  return answer;
}
```

## Time Complexity

O(n) — one O(1) lookup-and-increment per number from `1` to `n`.

## Space Complexity

O(n) — the output array itself (no additional auxiliary space beyond
that).

## Common Mistakes

- Calling a per-number Brian Kernighan's-trick routine independently
  for each `i` — correct, but O(n log n) overall, not meeting the
  stated O(n) total requirement.
- Using `i >> 1` (dropping the last bit) instead of `i & (i - 1)`
  (clearing the lowest set bit) — the shift-based recurrence
  (`answer[i] = answer[i >> 1] + (i & 1)`) is also valid and O(n), just
  a different correct recurrence; mixing up the two without adjusting
  the formula produces wrong results.
- Off-by-one on the array size — the array needs `n + 1` slots to cover
  every integer from `0` through `n` inclusive.

## Interview Follow-up Questions

1. There's an alternative recurrence using `answer[i >> 1] + (i & 1)` —
   how does that one work, and why does it also achieve O(n)?
2. How would you count the total number of `1` bits across all numbers
   from `0` to `n` combined, as a single number rather than an array?
3. How would this generalize to counting bits in a different base
   (e.g. counting non-zero digits in base 3)?

## Similar Questions

- Number of 1 Bits (see [number-of-1-bits.md](number-of-1-bits.md))
- Single Number (see [single-number.md](single-number.md))
- Power of Two

---
[← Back to 65-dsa](../README.md)
