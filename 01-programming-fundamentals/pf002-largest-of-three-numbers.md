# PF002 · Find the Largest of Three Numbers

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** conditional comparison, ternary logic

## Problem Statement

Write a function `largestOfThree(a, b, c)` that returns the largest of
three numbers, without using `Math.max`.

## Input

`a`, `b`, `c`: three numbers.

## Output

A single number: the largest of the three.

## Constraints

`-10^9 <= a, b, c <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `a=3, b=7, c=5` | `7` | 7 is greater than both others |
| `a=-1, b=-5, c=-2` | `-1` | The least negative value is the largest |
| `a=4, b=4, c=4` | `4` | All equal — the shared value is the largest |

## Edge Cases

- All three values equal → that value is the (trivial) largest
- Two values tied for largest → either matching value is a correct
  answer, since they're equal
- All negative values → comparison logic must not assume non-negative
  input

## Hints

1. `Math.max` trivializes exactly what this exercise is testing —
   manual comparison logic. What's the minimum number of comparisons
   needed to determine the largest of three values?
2. Compare `a` and `b` first to find the larger of the two, then compare
   that result against `c`.
3. Nested ternary expressions or sequential `if`/`else if` chains both
   express this correctly — the key structural idea is always narrowing
   from "largest of two" to "largest of three" by one more comparison.

## Algorithm

**Pattern:** sequential pairwise comparison.
**Core insight:** finding the largest of three values reduces cleanly to
two comparisons: first determine the larger of any two, then compare
that winner against the third value — the result of that second
comparison is guaranteed to be the largest of all three, since it's
already been shown to be `>=` one value and is now being compared
directly against the last one.
**Invariant:** after the first comparison, the intermediate result holds
the larger of `a` and `b`; after the second comparison, the final result
holds the larger of that intermediate value and `c`, which is
necessarily the largest of all three.

## Dry Run

**Input:** `a=3, b=7, c=5`

| Step | Comparison | Result so far |
|---|---|---|
| 1 | `a (3) vs b (7)` | `7` is larger |
| 2 | `7 vs c (5)` | `7` is larger |

**Result:** `7` — matches expected output.

## JavaScript Solution

```js
function largestOfThree(a, b, c) {
  const largerOfAB = a > b ? a : b;
  return largerOfAB > c ? largerOfAB : c;
}
```

## TypeScript Solution

```ts
function largestOfThree(a: number, b: number, c: number): number {
  const largerOfAB: number = a > b ? a : b;
  return largerOfAB > c ? largerOfAB : c;
}
```

## Time Complexity

O(1) — a fixed two comparisons regardless of input values.

## Space Complexity

O(1) — one intermediate variable.

## Common Mistakes

- Using `Math.max(a, b, c)` — trivializes the manual comparison logic
  this exercise is meant to test.
- Writing three separate independent `if` conditions (`if (a > b && a >
  c)`, etc.) instead of a narrowing two-step comparison — works, but is
  more verbose and error-prone to get exhaustively correct across all
  orderings.
- Using `>=` inconsistently across comparisons in a way that changes
  which of several equal maximum values gets returned — harmless for
  this problem (any correct maximum value is acceptable), but worth
  being deliberate about.

## Interview Follow-up Questions

1. How would you generalize this to find the largest of an arbitrary
   list of `n` numbers, still without `Math.max`?
2. How would you find both the largest *and* second-largest in a single
   pass?
3. How would this change for values that could be `NaN`?

## Similar Questions

- Check Even or Odd (see [pf003-check-even-or-odd.md](pf003-check-even-or-odd.md))
- Variable Swap (see [../65-dsa/logic-building/lb004-variable-swap.md](../65-dsa/logic-building/lb004-variable-swap.md))

---
[← Back to Programming Fundamentals](README.md)
