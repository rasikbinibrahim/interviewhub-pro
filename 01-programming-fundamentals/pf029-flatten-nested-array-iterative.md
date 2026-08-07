# PF029 · Flatten Nested Array (Iterative Stack)

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** arrays, stack, recursion

## Problem Statement

Write a function `flattenArray(arr)` that returns a new array containing
every non-array value from `arr`, fully flattened to any nesting depth,
in their original left-to-right order — using an explicit stack instead
of recursion.

## Input

`arr`: an array that may contain arbitrarily nested arrays and
non-array values, to any depth.

## Output

A new, single-level array containing every non-array value, in original
order.

## Constraints

`0 <= total number of values <= 10^4`, nesting depth up to `1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, [2, 3], 4]` | `[1, 2, 3, 4]` | One level of nesting flattened |
| `[1, [2, [3, [4]]]]` | `[1, 2, 3, 4]` | Arbitrary nesting depth flattened |
| `[]` | `[]` | Nothing to flatten |

## Edge Cases

- Empty array → `[]`
- No nesting at all (already flat) → returned unchanged (in the same
  order)
- Empty nested arrays (`[1, [], 2]`) → contribute nothing, don't break
  the traversal
- Very deep nesting → recursion could hit a stack-size limit for deep
  enough input; the explicit stack here avoids that entirely, which is
  the whole point of the iterative approach

## Hints

1. A recursive flatten is the obvious first idea, but for very deeply
   nested input it risks a call-stack overflow — how could you flatten
   using your *own* explicit stack (a plain array) instead of the call
   stack?
2. Push everything onto a stack, then repeatedly pop: if what you popped
   is itself an array, push its contents back on for further
   processing; if it's a plain value, it's part of the answer.
3. Because a stack pops in last-in-first-out order, values naturally
   come out *reversed* relative to the original left-to-right order —
   so the simplest fix is to build the result in whatever order the
   stack produces it, then reverse the whole result once at the end.

## Algorithm

**Pattern:** iterative flattening with an explicit stack, deferred
reversal.
**Core insight:** recursion flattens nested structures naturally because
each recursive call handles one level of nesting, but that relies on the
call stack — which has a size limit. Replacing the call stack with an
explicit array-based stack achieves the same traversal without that
limit: pop a value, and if it's itself an array, push its elements back
on for further unpacking; otherwise it's a genuine leaf value that
belongs in the answer. Because popping is LIFO, values are collected in
reverse of their original order, so a single `reverse()` at the end
restores the correct left-to-right ordering.
**Invariant:** at any point during the loop, every value remaining on
`stack` still needs to be processed, and every value already in `res` is
a correctly-identified leaf value (just not yet in final order).

## Dry Run

**Input:** `arr = [1, [2, 3], 4]`

| Step | pop() | is array? | action | stack after | res after |
|---|---|---|---|---|---|
| start | – | – | – | `[1, [2,3], 4]` | `[]` |
| 1 | `4` | no | `res.push(4)` | `[1, [2,3]]` | `[4]` |
| 2 | `[2,3]` | yes | `stack.push(...[2,3])` | `[1, 2, 3]` | `[4]` |
| 3 | `3` | no | `res.push(3)` | `[1, 2]` | `[4, 3]` |
| 4 | `2` | no | `res.push(2)` | `[1]` | `[4, 3, 2]` |
| 5 | `1` | no | `res.push(1)` | `[]` | `[4, 3, 2, 1]` |

Stack empty, loop ends. `res.reverse()` → `[1, 2, 3, 4]` — matches
expected output.

## JavaScript Solution

```js
function flattenArray(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length > 0) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
```

## TypeScript Solution

```ts
function flattenArray(arr: unknown[]): unknown[] {
  const stack: unknown[] = [...arr];
  const res: unknown[] = [];
  while (stack.length > 0) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
```

## Time Complexity

O(n), where n is the total number of values (including nested arrays
themselves) across the whole structure — every value is pushed and
popped exactly once.

## Space Complexity

O(n) — the stack can, in the worst case, hold most of the structure at
once (e.g. a wide array with one deeply nested branch), plus the result
array itself.

## Common Mistakes

- Forgetting the final `.reverse()` — since the stack processes values
  in last-in-first-out order, omitting the reversal silently returns the
  flattened values in the wrong order.
- Using `stack.push(next)` instead of `stack.push(...next)` when
  unpacking a nested array — pushes the array as a single new nested
  element instead of spreading its contents back onto the stack,
  causing an infinite loop.
- Reaching for `Array.prototype.flat(Infinity)` — trivializes exactly
  the traversal logic this exercise is testing, and doesn't demonstrate
  the iterative-stack technique the "no recursion" constraint is meant
  to practice.

## Interview Follow-up Questions

1. How would you flatten to only a *specific* depth, rather than fully?
2. Why does the iterative stack approach avoid the call-stack overflow
   risk that a naive recursive flatten has on very deep input?
3. How would you flatten an array while preserving a reference to each
   value's original nesting depth?

## Similar Questions

- Generate Pascal's Triangle (see [pf024-generate-pascal-triangle.md](pf024-generate-pascal-triangle.md))
- Valid Parentheses Expression Stack Matcher (see [pf040-valid-parentheses-stack-check.md](pf040-valid-parentheses-stack-check.md))

---
[← Back to Programming Fundamentals](README.md)
