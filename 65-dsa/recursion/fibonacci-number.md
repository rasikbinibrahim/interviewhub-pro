# Q1401 · Fibonacci Number

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Google, TCS, Infosys
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Recursion
**Concepts:** recursion, overlapping subproblems, memoization

## Problem Statement

Given an integer `n`, return the `n`-th Fibonacci number, where
`fib(0) = 0`, `fib(1) = 1`, and `fib(n) = fib(n-1) + fib(n-2)` for
`n > 1`.

## Input

`n`: a non-negative integer.

## Output

A single integer: the `n`-th Fibonacci number.

## Constraints

`0 <= n <= 30`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 2` | `1` | `fib(1) + fib(0) = 1 + 0 = 1` |
| `n = 4` | `3` | `fib(3) + fib(2) = 2 + 1 = 3` |
| `n = 0` | `0` | Base case |

## Edge Cases

- `n = 0` → `0` (base case)
- `n = 1` → `1` (base case)
- Larger `n` (near the constraint bound) → without memoization, the pure
  recursive version becomes extremely slow, since it recomputes the same
  subproblems exponentially many times

## Hints

1. The recursive definition translates almost directly into code — but
   what happens to performance as `n` grows, if implemented naively?
2. `fib(5)` calls `fib(4)` and `fib(3)`; `fib(4)` itself calls `fib(3)`
   again — the same subproblems get recomputed repeatedly. What
   technique avoids redoing work already done?
3. Storing each computed `fib(k)` result in a cache (memoization) the
   first time it's computed means every subsequent call for that same
   `k` is an O(1) lookup instead of a full re-computation — collapsing
   the exponential naive recursion into linear time.

## Algorithm

**Pattern:** recursion with memoization (top-down dynamic programming).
**Core insight:** the naive recursive definition recomputes the same
`fib(k)` value many times as `n` grows — the number of redundant calls
grows exponentially. Caching each `fib(k)` result the first time it's
computed, and returning the cached value on any later request for the
same `k`, ensures each distinct subproblem is solved exactly once.
**Invariant:** once `memo[k]` is set, it correctly holds `fib(k)` for
the remainder of the computation, and every future request for `fib(k)`
short-circuits directly to it.

## Dry Run

**Input:** `n = 4`

| Call | Cached? | Action |
|---|---|---|
| `fib(4)` | no | compute `fib(3) + fib(2)` |
| `fib(3)` | no | compute `fib(2) + fib(1)` |
| `fib(2)` | no | compute `fib(1) + fib(0) = 1 + 0 = 1`; cache `memo[2]=1` |
| `fib(1)` | (base case) | returns `1` |
| back in `fib(3)`: `fib(2)` | yes, `memo[2]=1` | reuse cached value instead of recomputing |
| `fib(3) = 1 + 1 = 2` | | cache `memo[3]=2` |
| back in `fib(4)`: `fib(2)` | yes, `memo[2]=1` | reuse cached value |
| `fib(4) = 2 + 1 = 3` | | cache `memo[4]=3` |

**Result:** `3` — matches expected output.

## JavaScript Solution

```js
function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

## TypeScript Solution

```ts
function fib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;

  const cached = memo.get(n);
  if (cached !== undefined) return cached;

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

## Time Complexity

O(n) — each distinct subproblem `fib(k)` for `k` from `0` to `n` is
computed exactly once, thanks to memoization (versus O(2^n) for the
naive unmemoized recursion).

## Space Complexity

O(n) — the memoization map holds up to `n` entries, plus O(n) recursion
call stack depth.

## Common Mistakes

- Writing the naive recursive version without memoization — correct but
  exponential time, becoming impractically slow well before `n = 30`.
- Forgetting the base cases (`n <= 1`) — without them, the recursion
  never terminates or produces incorrect results for small `n`.
- Sharing a single mutable default-parameter memo object across
  unrelated top-level calls in a way that isn't reset — usually fine
  here since default parameters create a fresh `Map` per top-level call
  without an explicit second argument, but worth being deliberate about.

## Interview Follow-up Questions

1. How would you convert this to a bottom-up iterative solution instead,
   avoiding recursion entirely?
2. How would you compute `fib(n)` in O(log n) time using matrix
   exponentiation?
3. What's the space-optimized O(1)-extra-space iterative version look
   like, and why does it not need a full memo array?

## Similar Questions

- Calculate Factorial (see [../../01-programming-fundamentals/pf004-calculate-factorial.md](../../01-programming-fundamentals/pf004-calculate-factorial.md))
- Power Function (see [power-function.md](power-function.md))
- Climbing Stairs

---
[← Back to 65-dsa](../README.md)
