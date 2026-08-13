# QJSC051 · Implement a Custom Array.prototype.flat Polyfill (Iterative)

**Difficulty:** Medium
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** explicit stack simulation, iterative tree/array flattening, recursion-to-iteration conversion, sparse-array hole removal

## Problem Statement

Implement `myFlat`, a polyfill for `Array.prototype.flat`, attached as
`Array.prototype.myFlat`. Called as `array.myFlat(depth)`, it returns a
**new** array with all sub-array elements nested up to `depth` levels
deep concatenated into it. `depth` defaults to `1` and may be any
non-negative number, including `Infinity` (fully flatten, regardless of
nesting depth). The implementation must be **iterative** — using an
explicit stack — not naive recursion, since unbounded recursion depth on
deeply nested input is exactly the failure mode this question is
testing for.

## Input

- The array `myFlat` is called on, arbitrarily nested, possibly sparse.
- `depth` (optional, default `1`): how many levels of nesting to
  flatten; `0` means "don't flatten at all," `Infinity` means "flatten
  completely."

## Output

A new, flat(ter) array — the original array is not mutated.

## Constraints

- `0 <= array.length <= 10^4` (nesting can make the *effective* element
  count much larger once flattened).
- `depth >= 0`, and may be `Infinity`.
- Must be implemented iteratively with an explicit stack — no recursive
  helper function calling itself.
- Must skip/remove holes in sparse arrays (native `flat` drops empty
  slots entirely; it does not preserve them or convert them to
  `undefined`).
- Must not call the native `Array.prototype.flat` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, [2, 3], [4, [5, 6]]].myFlat()` | `[1, 2, 3, 4, [5, 6]]` | default `depth = 1` unwraps only one level — `[5, 6]` is two levels deep, so it stays nested |
| `[1, [2, 3], [4, [5, 6]]].myFlat(2)` | `[1, 2, 3, 4, 5, 6]` | two levels of unwrapping fully flattens this input |
| `[1, [2, [3, [4, [5]]]]].myFlat(Infinity)` | `[1, 2, 3, 4, 5]` | `Infinity` keeps unwrapping regardless of how deep the nesting goes |

## Edge Cases

- `depth = 0` → returns a shallow copy of the array completely
  unflattened (still a *new* array, just with no unwrapping performed).
- Already-flat input → returns an equivalent new array, unchanged in
  content.
- Deeply nested input (e.g. 10,000 levels deep) → must not blow the call
  stack; this is exactly why the iterative-with-explicit-stack
  requirement exists — a naive recursive `flat` would `RangeError:
  Maximum call stack size exceeded` on input like this.
- Sparse array with holes, e.g. `[1, , [2, , 3]]` → holes at every level
  are dropped entirely from the output, not preserved as holes or
  converted to `undefined`.
- Mixed depth siblings (some elements deeply nested, others not) → each
  element is flattened independently according to its own nesting, not
  a single global "deepest wins" depth.

## Hints

1. A naive recursive `flat` calls itself once per nesting level — to go
   iterative, you need something that plays the role of "the call
   stack" explicitly: an array you `push`/`pop` from, where each entry
   remembers both a *value* and how much flattening budget it still has
   left.
2. Since a stack is LIFO, popping items in the order you pushed them
   would reverse your output — push each array's children in **reverse
   index order** so that popping restores the original left-to-right
   order.
3. When you pop an entry: if it's a non-array (or an array but its
   remaining depth budget has hit `0`), it goes straight into the
   result; if it's still an array *and* has depth budget left, push its
   own children back onto the stack with one less depth to spend, and
   don't add the array itself to the result.

## Algorithm

**Pattern:** explicit-stack simulation of what recursive flattening
would otherwise do via the call stack.
**Core insight:** recursion's implicit stack frames are replaced with
explicit `[value, depthRemaining]` pairs on a real array used as a
stack. Each pair remembers exactly what a recursive call's stack frame
would have remembered — the value to process and how many more levels
it's allowed to unwrap. Pushing a sub-array's children in reverse index
order is what makes popping (which reverses order once) restore the
original left-to-right sequence.
**Invariant:** at any point, the stack holds exactly the not-yet-emitted
elements, each paired with the correct remaining depth for *its*
position in the original nesting — popping and testing
`Array.isArray(value) && depthRemaining > 0` is the entire flattening
decision, repeated until the stack is empty.

## Dry Run

**Input:** `[1, [2, 3], [4, [5, 6]]].myFlat(2)`

| Step | Popped `[value, depthRemaining]` | Is array & depth left? | Action | `result` so far |
|---|---|---|---|---|
| seed | — | — | push `[1,2]`, `[[2,3],2]`, `[[4,[5,6]],2]` (reverse index order) | `[]` |
| 1 | `[1, 2]` | no | push straight to result | `[1]` |
| 2 | `[[2,3], 2]` | yes, depth 2 > 0 | push `[2,1]`, `[3,1]` (children, depth − 1) | `[1]` |
| 3 | `[2, 1]` | no | push to result | `[1, 2]` |
| 4 | `[3, 1]` | no | push to result | `[1, 2, 3]` |
| 5 | `[[4,[5,6]], 2]` | yes, depth 2 > 0 | push `[4,1]`, `[[5,6],1]` (children, depth − 1) | `[1, 2, 3]` |
| 6 | `[4, 1]` | no | push to result | `[1, 2, 3, 4]` |
| 7 | `[[5,6], 1]` | yes, depth 1 > 0 | push `[5,0]`, `[6,0]` (children, depth − 1) | `[1, 2, 3, 4]` |
| 8 | `[5, 0]` | no | push to result | `[1, 2, 3, 4, 5]` |
| 9 | `[6, 0]` | no | push to result | `[1, 2, 3, 4, 5, 6]` |

**Result:** `[1, 2, 3, 4, 5, 6]` — matches Example 2; note that `[5, 6]`
still had one unit of depth budget left when it was reached (it started
at `depth = 2`, was decremented once when pulled out of `[4, [5, 6]]`,
leaving `1`, which was enough to unwrap it too).

## JavaScript Solution

```js
Array.prototype.myFlat = function (depth = 1) {
  const result = [];
  const stack = [];

  // Seed the stack with this array's own entries, skipping holes
  // entirely (native flat drops holes, it doesn't preserve or convert
  // them). Pushed in reverse index order so popping restores the
  // original left-to-right order.
  for (let index = this.length - 1; index >= 0; index -= 1) {
    if (index in this) {
      stack.push([this[index], depth]);
    }
  }

  while (stack.length > 0) {
    const [value, depthRemaining] = stack.pop();

    if (Array.isArray(value) && depthRemaining > 0) {
      // Still an array and still has flattening budget left — unwrap
      // one level by pushing ITS children (also skipping its holes),
      // each with one less unit of depth to spend.
      for (let index = value.length - 1; index >= 0; index -= 1) {
        if (index in value) {
          stack.push([value[index], depthRemaining - 1]);
        }
      }
    } else {
      // Either not an array, or an array whose depth budget is spent —
      // either way it belongs in the output as-is.
      result.push(value);
    }
  }

  return result;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFlat(depth?: number): unknown[];
}

type StackEntry = [unknown, number];

Array.prototype.myFlat = function (this: unknown[], depth = 1): unknown[] {
  const result: unknown[] = [];
  const stack: StackEntry[] = [];

  for (let index = this.length - 1; index >= 0; index -= 1) {
    if (index in this) {
      stack.push([this[index], depth]);
    }
  }

  while (stack.length > 0) {
    const [value, depthRemaining] = stack.pop() as StackEntry;

    if (Array.isArray(value) && depthRemaining > 0) {
      for (let index = value.length - 1; index >= 0; index -= 1) {
        if (index in value) {
          stack.push([value[index], depthRemaining - 1]);
        }
      }
    } else {
      result.push(value);
    }
  }

  return result;
};
```

## Time Complexity

O(n), where n is the total number of elements across every nesting
level in the input (every element is pushed once and popped once,
regardless of how deep it was nested).

## Space Complexity

O(n) for the `result` array plus O(w) for the stack, where w is bounded
by the total number of elements as well in the worst case (a wide,
shallow array) — so O(n) overall. This trades the O(depth) call-stack
space a recursive version would use for O(n) heap-allocated stack space,
which is the entire point: heap arrays can grow far larger than the JS
call stack allows before overflowing.

## Common Mistakes

- Writing this recursively anyway ("iterative in spirit") — a helper
  function that calls itself is still recursion; the requirement is a
  literal, explicit stack data structure driving a `while` loop, exactly
  to avoid `RangeError: Maximum call stack size exceeded` on deeply
  nested input.
- Pushing children in forward index order instead of reverse — this
  silently reverses the output order once popped, since a stack is
  LIFO.
- Decrementing depth incorrectly (e.g. decrementing when *pushing* an
  array's own entry rather than when *unwrapping* its children) — leads
  to flattening one level too many or too few compared to the native
  method.
- Forgetting `Infinity - 1 === Infinity` — a correct implementation
  doesn't need a special case for `Infinity`, but an implementation that
  tries to defensively "cap" depth at some large integer will silently
  break full-depth flattening on very deeply nested input.
- Not skipping holes when seeding the stack or when unwrapping a
  sub-array's children — a hole should vanish from the output entirely,
  not appear as `undefined`.

## Interview Follow-up Questions

1. Why does an explicit-stack iterative version scale to much deeper
   nesting than a recursive version, given both are ultimately O(n) time
   and O(n) space?
2. How would you implement `flatMap` as a single-pass combination of
   `map` and this `flat` logic, instead of calling `map` then `flat`
   separately?
3. What's the difference between a stack-based (DFS, this
   implementation) and a queue-based (BFS) traversal here — would a BFS
   version produce the same output order?
4. How would you detect and handle a circular reference (an array that
   contains itself) without infinite-looping?
5. How does JavaScript's actual engine implementation of `flat` avoid
   the stack-depth problem — do you know if V8's built-in is recursive
   or iterative under the hood?

## Similar Questions

- [Implement a Custom Array.prototype.flatMap Polyfill (Iterative)](implement-custom-array-prototype-flatmap-polyfill-iterative.md)
- Implement an iterative in-order/pre-order tree traversal (same
  explicit-stack-instead-of-recursion pattern)
- Flatten a nested object (same pattern, applied to object trees instead
  of arrays)

---
[← Back to 61-javascript-coding](README.md)
