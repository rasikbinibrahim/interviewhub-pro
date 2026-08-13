# QADVJS064 · Implement a Curried Sum Function (sum(1)(2)(3)...)

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Uber
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Functional Programming / Currying
**Concepts:** closures, `Symbol.toPrimitive`, `valueOf` override, a function returning itself

## Problem Statement

Implement `sum(a)` so it can be called repeatedly, chained call after call —
`sum(1)(2)(3)(4)...` — with each call adding one more number to a running
total. Unlike a typical curried function, there's no fixed arity and no
explicit terminal call needed to get the accumulated result: the chain must
also work correctly when it's implicitly coerced to a primitive value, such
as inside a template literal or with the `+` operator — e.g.
`` `${sum(1)(2)(3)}` === '6' `` and `sum(1)(2)(3) + 0 === 6`, without ever
calling anything like `.value()` explicitly (though exposing an explicit
`.valueOf()` too is fine and expected).

## Input

A chain of single-argument calls, each supplying one number:
`sum(a1)(a2)(a3)...(an)`.

## Output

A function/callable value that (a) can always be called again with another
number to continue the chain, and (b) evaluates to the running total
whenever JavaScript needs to convert it to a primitive (numeric context,
string context via template literals, comparison operators, etc.).

## Constraints

- The chain length is unbounded — `sum` must support any number of
  sequential calls, not a fixed arity.
- Coercion must work through the language's actual primitive-conversion
  machinery (`Symbol.toPrimitive` and/or `valueOf`), not through a
  special-cased "if the caller happens to call `.toString()`" workaround.
- Arguments are assumed to be valid numbers — no need to validate/reject
  non-numeric input for the core solution (see Interview Follow-up
  Questions for that extension).

## Examples

| Input | Output | Why |
|---|---|---|
| `sum(1)(2)(3).valueOf()` | `6` | Explicitly calling `.valueOf()` reads the accumulated total directly |
| `` `${sum(1)(2)(3)}` `` | `'6'` | Template literal interpolation coerces the returned function to a string, which internally requests a primitive value first — resolved via `Symbol.toPrimitive`/`valueOf` |
| `sum(1)(2)(3) + 0` | `6` | The `+` operator coerces its operand to a primitive with a `"default"` hint, again resolved via `Symbol.toPrimitive`/`valueOf` |

## Edge Cases

- A single call with no further chaining (`sum(5)`, then coerced) → `5` —
  the coercion hook must work correctly even after just one call.
- Very long chains (`sum(1)(2)(3)...(100)`) → sums correctly with O(1) work
  per call; no stack growth, since each call just mutates a shared variable
  and returns the same function reference rather than recursing.
- Negative numbers and zero as arguments → the running total reflects a
  correctly *signed* sum, not just accumulated magnitude.
- **Boolean coercion is a trap**: `if (sum(0)) { ... }` does **not** behave
  like `if (0)` — it always runs the branch. `ToBoolean` on any object
  (including a function) is unconditionally `true` in JavaScript and never
  consults `valueOf`/`Symbol.toPrimitive` at all; only numeric and string
  coercion contexts do. This is worth stating explicitly, since it's the
  single easiest wrong assumption to make about this exact problem.

## Hints

1. Every call in the chain needs to return something that is itself
   callable again (so `(n2)` can follow `(n1)`) *and* is convertible to a
   number once the chain ends — what single kind of JS value can be both
   callable and hold extra behavior/properties?
2. A function is still an object under the hood, so you can attach
   properties — including overriding `valueOf()`, or defining a
   `[Symbol.toPrimitive]` method — directly onto it. Which of those hooks
   does the JS engine consult when a value needs to become a primitive
   (arithmetic, template literals, relational comparisons)?
3. The running total must be visible to *both* "the next call in the
   chain" (to keep adding) and "the coercion hook" (to report the final
   value) — keep a single variable in one shared closure, and have the
   chaining function and its `valueOf`/`Symbol.toPrimitive` both close over
   that exact same variable, rather than creating a fresh one per call.

## Algorithm

**Pattern:** closures + primitive-coercion hooks (`Symbol.toPrimitive` /
`valueOf`).
**Core insight:** define one inner function that does two things: it
returns **itself** on every call (so the chain can keep extending — the
same function reference is reused, not a fresh closure per call), and it
has its coercion hooks overridden to read a `total` variable living in the
enclosing closure. Because every call in the chain operates on that single
shared `total` (the function is literally the same reference every time,
not a new one), each `(n)` call mutates the one value that the coercion
hooks will later report — there's no need to "pass along" state separately,
the closure does that automatically.
**Invariant:** at any point in the chain, `total` equals the sum of every
argument passed to every call made so far, and the function returned by
each call is coercible to exactly that value.

## Dry Run

**Input:** `` `${sum(1)(2)(3)}` ``

| Step | Call | `total` (before) | `total` (after) | Returned |
|---|---|---|---|---|
| 1 | `sum(1)` | — (fresh closure created) | `1` | `chained` (the reusable inner function) |
| 2 | `chained(2)` | `1` | `1 + 2 = 3` | `chained` (same reference) |
| 3 | `chained(3)` | `3` | `3 + 3 = 6` | `chained` (same reference) |
| 4 | `` `${chained}` `` | `6` | `6` (unchanged — coercion just reads it) | JS calls `chained[Symbol.toPrimitive]("string")` → returns `6` → then `ToString(6)` → `"6"` |

**Result:** `` `${sum(1)(2)(3)}` === '6' ``.

## JavaScript Solution

```js
function sum(firstValue) {
  let total = firstValue; // shared across every call in the chain

  function chained(nextValue) {
    total += nextValue;
    return chained; // return the SAME function — keeps the chain alive
                     // and keeps every call pointed at the same `total`
  }

  // Consulted whenever `chained` needs to become a primitive: template
  // literals, `+`, `<`/`>`, loose equality against a number, etc.
  chained[Symbol.toPrimitive] = () => total;

  // Fallback for any coercion path that consults valueOf() directly —
  // harmless to define alongside Symbol.toPrimitive, and keeps behavior
  // robust if this ever runs somewhere Symbol.toPrimitive isn't checked.
  chained.valueOf = () => total;

  return chained;
}
```

## TypeScript Solution

```ts
interface ChainableSum {
  (nextValue: number): ChainableSum;
  [Symbol.toPrimitive](hint: string): number;
  valueOf(): number;
}

function sum(firstValue: number): ChainableSum {
  let total = firstValue;

  // A function value can't be given extra call-signature-shaped
  // properties without a cast — this single, narrow cast is the standard,
  // documented way to type a "callable object" in strict TypeScript.
  const chained = ((nextValue: number): ChainableSum => {
    total += nextValue;
    return chained;
  }) as ChainableSum;

  chained[Symbol.toPrimitive] = (): number => total;
  chained.valueOf = (): number => total;

  return chained;
}
```

## Time Complexity

O(1) per call — each call does one addition and returns an existing
reference; no iteration or recursion. Across a chain of n calls, total work
is O(n).

## Space Complexity

O(1) — the entire chain reuses a single function object and a single
`total` variable via closure; no new closure or data structure is created
per call.

## Common Mistakes

- Assuming `if (sum(0))` reflects the accumulated total's truthiness — it
  doesn't. `ToBoolean` on any object, including a function, is always
  `true` in JavaScript and never invokes `valueOf`/`Symbol.toPrimitive` at
  all; those hooks only apply to numeric and string coercion.
- Returning a **new** function from every call instead of the exact same
  `chained` reference — if `total` isn't in a scope shared by every one of
  those new functions, accumulation silently breaks (each call thinks
  it's starting a fresh sum), and even when it doesn't break it wastes a
  fresh closure + fresh coercion hooks on every single call.
- Overriding only `toString()` and leaving `valueOf`/`Symbol.toPrimitive`
  untouched — breaks numeric coercion contexts like `sum(1)(2) + 0`, which
  request a primitive with hint `"default"`/`"number"` and never consult
  `toString` first.
- Not realizing `Symbol.toPrimitive`, when defined, takes priority over
  `valueOf` and `toString` entirely — if it's defined but returns the
  wrong thing (or the wrong type for the given hint), it silently
  overrides an otherwise-correct `valueOf`.

## Interview Follow-up Questions

1. Why doesn't `if (sum(0))` evaluate as falsy, even though the
   accumulated total is `0`?
2. How would you additionally support an explicit terminal call —
   `sum(1)(2)(3)()` with no arguments — to end the chain and get a plain
   number back, on top of implicit coercion?
3. How would you generalize this pattern to a `multiply(a)(b)(c)...` chain
   — what changes, and what stays exactly the same?
4. What would you do if a non-number were passed mid-chain (e.g.
   `sum(1)('x')`) — where would you add validation, and what should happen?
5. How does this relate to how JS's own `Date` object supports both numeric
   coercion (timestamp) and string coercion (formatted date string) through
   `Symbol.toPrimitive`'s different hints?

## Similar Questions

- [Implement curry() with Placeholder Support](implement-curry-with-placeholder-support.md)
- Implement a chainable calculator supporting multiple operators
  (`calc(5).add(3).multiply(2).value()`)
- [Implement Function.prototype.bind (Polyfill)](function-bind-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
