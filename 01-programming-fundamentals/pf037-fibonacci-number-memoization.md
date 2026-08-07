# PF037 · N-th Fibonacci Number (Iterative O(1) Space)

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Amazon
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** math, fibonacci, dynamic-programming

## Problem Statement

Write a function `fib(n)` that returns the `n`-th Fibonacci number
(`fib(0) = 0`, `fib(1) = 1`, `fib(n) = fib(n-1) + fib(n-2)`), using O(1)
auxiliary space.

## Input

`n`: a non-negative integer.

## Output

The `n`-th Fibonacci number.

## Constraints

`0 <= n <= 45` (kept within `Number` safe-integer precision for a plain
iterative solution)

## Examples

| Input | Output | Why |
|---|---|---|
| `6` | `8` | Sequence: `0,1,1,2,3,5,8` — index 6 is `8` |
| `0` | `0` | Base case |
| `1` | `1` | Base case |

## Edge Cases

- `n = 0` → `0` (base case, returned immediately)
- `n = 1` → `1` (base case, returned immediately)
- `n = 2` → `1` (the first value actually computed by the loop)

## Hints

1. The naive recursive definition (`fib(n) = fib(n-1) + fib(n-2)`)
   recomputes the same values exponentially many times — what if you
   built the sequence *forward*, from the base cases up, instead?
2. You only ever need the *two* most recent Fibonacci values to compute
   the next one — there's no need to store the entire sequence.
3. Keep two running variables representing "the previous two values,"
   and slide them forward by one position on each loop iteration until
   you reach `n`.

## Algorithm

**Pattern:** bottom-up iterative dynamic programming with O(1) space
(tabulation, collapsed to just the last two values).
**Core insight:** naive recursion recomputes overlapping subproblems
exponentially many times (computing `fib(n-2)` separately as part of
both `fib(n-1)` and directly, and so on recursively) — this is the
classic sign that dynamic programming applies. Since each Fibonacci
value only ever depends on the two immediately before it, there's no
need to memoize a whole table of previous results: just keep the last
two values in two variables and slide them forward one step at a time
until reaching `n`.
**Invariant:** at the start of loop iteration `i`, `a` holds `fib(i-2)`
and `b` holds `fib(i-1)`; after computing `temp = a + b`, that value is
`fib(i)`, and shifting `a ← b, b ← temp` prepares the same invariant for
iteration `i+1`.

## Dry Run

**Input:** `n = 6`

| i | a (before) | b (before) | temp = a+b | a (after) | b (after) |
|---|---|---|---|---|---|
| 2 | 0 | 1 | 1 | 1 | 1 |
| 3 | 1 | 1 | 2 | 1 | 2 |
| 4 | 1 | 2 | 3 | 2 | 3 |
| 5 | 2 | 3 | 5 | 3 | 5 |
| 6 | 3 | 5 | 8 | 5 | 8 |

Loop ends (`i` reaches `n`). **Result:** `b = 8` — matches expected
output.

## JavaScript Solution

```js
function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}
```

## TypeScript Solution

```ts
function fib(n: number): number {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const temp: number = a + b;
    a = b;
    b = temp;
  }
  return b;
}
```

## Time Complexity

O(n) — one loop iteration per value from `2` to `n`.

## Space Complexity

O(1) — only two running variables, regardless of `n` (versus O(n) for a
memoized recursive/tabulated version that stores the whole sequence).

## Common Mistakes

- Naive recursion without memoization — correct but exponential O(2ⁿ)
  time, since `fib(n-1)` and `fib(n-2)` each independently re-derive
  overlapping subproblems all the way back down to the base cases.
- Memoizing with a full array/object cache — correct and much faster
  than naive recursion (O(n) time), but uses O(n) space when O(1) is
  achievable, since only the last two values are ever needed at once.
- Off-by-one errors in the loop bounds or in which variable ends up
  holding the answer — easy to swap `a`/`b`'s roles incorrectly when
  refactoring between recursive and iterative styles.

## Interview Follow-up Questions

1. How would you compute `fib(n)` in O(log n) time using matrix
   exponentiation?
2. Why does naive recursive Fibonacci run in exponential time — can you
   sketch the recursion tree and count the redundant calls?
3. How would you adapt this to return the entire sequence up to `n`,
   rather than just the final value?

## Similar Questions

- Calculate Power Pow(x, n) (see [pf030-calculate-power-x-n.md](pf030-calculate-power-x-n.md))
- Sum of Digits of a Number (see [pf020-sum-of-digits-of-number.md](pf020-sum-of-digits-of-number.md))

---
[← Back to Programming Fundamentals](README.md)
