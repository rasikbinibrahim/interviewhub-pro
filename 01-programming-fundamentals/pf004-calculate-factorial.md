# PF004 · Calculate Factorial

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** iterative accumulation, recursion, base case identification

## Problem Statement

Write a function `factorial(n)` that returns `n!` (the product of every
positive integer from 1 to `n`), where `0! = 1` by definition.

## Input

`n`: a non-negative integer.

## Output

A single number: `n!`.

## Constraints

`0 <= n <= 20` (bounded to keep the result within `Number.MAX_SAFE_INTEGER`)

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5` | `120` | `5 * 4 * 3 * 2 * 1 = 120` |
| `n = 0` | `1` | By definition, `0! = 1` |
| `n = 1` | `1` | `1! = 1` |

## Edge Cases

- `n = 0` → must return `1`, not `0` — a common off-by-default-value
  mistake if the accumulator is initialized incorrectly
- `n = 1` → returns `1`, same as the base case
- Larger `n` (close to 20) → the result grows very quickly (factorial
  growth), staying just within safe integer precision at this
  constraint's upper bound

## Hints

1. Factorial has a natural recursive definition (`n! = n * (n-1)!`), but
   it's just as naturally expressed iteratively — what's the base case
   in either framing?
2. Iteratively, start an accumulator at `1` (not `0` — multiplying by
   zero would always give zero) and multiply it by every integer from
   `1` up to `n`.
3. Recursively, the base case is `n <= 1` returning `1` — both `0!` and
   `1!` equal `1`, so a single base case check covers both.

## Algorithm

**Pattern:** iterative accumulation (with an equally valid recursive
formulation).
**Core insight:** factorial is the product of a sequence of integers,
which is exactly what an accumulator initialized to the multiplicative
identity (`1`, not `0`) and multiplied through a loop computes. The
recursive definition `n! = n * (n-1)!` with base case `0! = 1! = 1`
expresses the same computation, trading loop iteration for call-stack
depth.
**Invariant (iterative):** after the loop has processed integers `1`
through `i`, `result` holds `i!`.

## Dry Run

**Input:** `n = 5`

| i | result before | result = result * i |
|---|---|---|
| 1 | 1 | 1 * 1 = 1 |
| 2 | 1 | 1 * 2 = 2 |
| 3 | 2 | 2 * 3 = 6 |
| 4 | 6 | 6 * 4 = 24 |
| 5 | 24 | 24 * 5 = 120 |

**Result:** `120` — matches expected output.

## JavaScript Solution

```js
function factorial(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}
```

## TypeScript Solution

```ts
function factorial(n: number): number {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}
```

## Time Complexity

O(n) — one multiplication per integer from 2 to n.

## Space Complexity

O(1) iteratively — one accumulator variable. (A recursive version would
use O(n) call stack space instead.)

## Common Mistakes

- Initializing the accumulator to `0` instead of `1` — multiplying
  anything by `0` always yields `0`, silently breaking every result.
- Starting the loop at `1` instead of `2` — harmless correctness-wise
  (multiplying by 1 is a no-op) but a small unnecessary iteration; more
  importantly, forgetting the loop must handle `n = 0` and `n = 1`
  correctly by simply never executing and leaving `result` at its
  correctly-initialized `1`.
- Using a plain recursive version for large `n` without considering
  stack depth — fine at this problem's small constraint bound, but worth
  raising as a real concern for unbounded `n`.

## Interview Follow-up Questions

1. How would you write this recursively instead, and what's the
   tradeoff versus the iterative version?
2. How would you compute factorial for `n` large enough to exceed
   `Number.MAX_SAFE_INTEGER`, using `BigInt`?
3. How would you memoize factorial calculations if the function were
   called repeatedly with overlapping values of `n`?

## Similar Questions

- Sum of Natural Numbers up to N (see [pf006-sum-of-natural-numbers.md](pf006-sum-of-natural-numbers.md))
- Check Prime Number (see [../65-dsa/logic-building/lb007-check-prime-number.md](../65-dsa/logic-building/lb007-check-prime-number.md))

---
[← Back to Programming Fundamentals](README.md)
