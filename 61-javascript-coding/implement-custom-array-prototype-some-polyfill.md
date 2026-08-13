# QJSC054 · Implement a Custom Array.prototype.some Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** callback iteration, short-circuit evaluation, sparse-array hole skipping, `thisArg` binding

## Problem Statement

Implement `mySome`, a polyfill for `Array.prototype.some`, attached as
`Array.prototype.mySome`. Given a callback `callbackFn(element, index,
array)`, it should return `true` the moment `callbackFn` returns a
truthy value for **any** element, stopping immediately rather than
checking the rest, and `false` only if no element ever passes. It must
not call the native `some` internally, and it must accept an optional
`thisArg` that becomes `this` inside `callbackFn`.

## Input

- The array `mySome` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a function returning a value
  coerced to boolean.
- `thisArg` (optional): the value to use as `this` when invoking
  `callbackFn`.

## Output

A boolean: `true` if at least one present element passed, `false` if
none did.

## Constraints

- `0 <= array.length <= 10^5`
- Must short-circuit: stop invoking `callbackFn` as soon as one call
  returns truthy.
- Must skip holes in sparse arrays — `callbackFn` is never invoked for
  an index that doesn't actually exist on the array.
- Must not call the native `Array.prototype.some` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 3, 5].mySome(x => x % 2 === 0)` | `false` | none of 1, 3, 5 are even; all three are checked before concluding `false` |
| `[1, 4, 5].mySome(x => x % 2 === 0)` | `true` | index 1 (`4`) passes, so `mySome` returns immediately — index 2 is never checked |
| `[, , 7].mySome(x => x > 0)` | `true` | the holes at indices 0 and 1 are skipped entirely; only index 2 (`7`) runs, and it passes |

## Edge Cases

- Empty array → `false` (there's no element that could possibly pass a
  check that never runs), matching native behavior.
- All elements fail → the callback runs for every index; `false` is
  only returned after the loop fully completes.
- The very first element passes → short-circuits immediately; the
  callback is invoked exactly once total.
- Sparse array with holes → holes are skipped, not treated as
  `undefined`.
- `thisArg` supplied → the callback's `this` must resolve to `thisArg`.

## Hints

1. This is the mirror image of `every` — instead of exiting early on the
   first *failure*, exit early on the first *success*.
2. Skipping holes works exactly the same way as in `every`: check
   `index in this` before invoking the callback, don't just check
   whether the value is `undefined`.
3. Use `callbackFn.call(thisArg, element, index, array)` so an optional
   `thisArg` is honored, and only fall through to `return false` once
   the loop has genuinely finished without a single truthy result.

## Algorithm

**Pattern:** linear scan with an early-exit guard and a hole-existence
check — structurally the same skeleton as `every`, with the exit
condition flipped.
**Core insight:** `every` is a universal quantifier ("all must pass");
`some` is an existential quantifier ("at least one must pass"). Both
reduce to the same loop shape — visit present elements in order, invoke
the callback, and react to the first "deciding" result — the only
difference is which boolean result counts as deciding: for `every` it's
the first falsy result, for `some` it's the first truthy one.
**Invariant:** at the start of every iteration, no previously-visited
present element has passed the callback yet — the moment one does, the
function returns immediately without visiting any more indices.

## Dry Run

**Input:** `[1, 4, 5].mySome(x => x % 2 === 0)`

| Step | index | `index in this`? | element | callback result | Action |
|---|---|---|---|---|---|
| 1 | 0 | yes | `1` | `false` (1 % 2 !== 0) | continue looping |
| 2 | 1 | yes | `4` | `true` (4 % 2 === 0) | return `true` immediately |
| — | 2 | never reached | — | — | short-circuited — index 2 is never checked |

**Result:** `true`, and the callback was invoked exactly twice, not
three times.

## JavaScript Solution

```js
Array.prototype.mySome = function (callbackFn, thisArg) {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // Skip holes exactly as `every` does — a hole is not the same as
    // an element whose value is `undefined`.
    if (!(index in this)) {
      continue;
    }

    const passed = callbackFn.call(thisArg, this[index], index, this);
    if (passed) {
      return true; // one success is enough to know the final answer
    }
  }

  return false; // no present element ever passed (or there were none at all)
};
```

## TypeScript Solution

```ts
interface Array<T> {
  mySome(
    callbackFn: (element: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
  ): boolean;
}

Array.prototype.mySome = function <T>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => unknown,
  thisArg?: unknown,
): boolean {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    if (!(index in this)) {
      continue;
    }

    const passed = callbackFn.call(thisArg, this[index], index, this);
    if (passed) {
      return true;
    }
  }

  return false;
};
```

## Time Complexity

O(n) worst case — no element passes, or the only success is at the last
present index. Best case O(1) when the very first element passes.

## Space Complexity

O(1) — only a loop counter and a couple of scalar locals, regardless of
array size.

## Common Mistakes

- Implementing `mySome` as `!array.myEvery(x => !predicate(x))` without
  actually understanding *why* that transformation is valid (De
  Morgan's laws) — functionally fine, but if asked to explain it in an
  interview, a candidate should be able to justify the negation, not
  just state it.
- Using `this[index] === undefined` instead of `index in this` to detect
  holes.
- Not short-circuiting — checking every element and only returning at
  the end still gives the right boolean but calls the callback on
  elements the native version would have skipped after finding a match.
- Confusing `some(predicate)` with `includes(value)` — `some` takes a
  function and tests a condition; `includes` takes a raw value and tests
  membership via SameValueZero. They solve different problems even
  though both return a boolean.

## Interview Follow-up Questions

1. How would you express `mySome` in terms of `myEvery` using De
   Morgan's laws, and would you actually want to in production code
   (readability vs. cleverness)?
2. What does `[].some(x => true)` return on an empty array, and why?
3. How does `some`'s hole-skipping differ from `find`, which does not
   skip holes?
4. How would you implement this recursively, and what's the call-stack
   cost for a very large array?
5. Would `some`'s short-circuit behavior change if `callbackFn` were
   asynchronous (returned a `Promise`)? What would you need to change to
   support that correctly?

## Similar Questions

- [Implement a Custom Array.prototype.every Polyfill](implement-custom-array-prototype-every-polyfill.md)
- [Implement a Custom Array.prototype.includes Polyfill](implement-custom-array-prototype-includes-polyfill.md)
- [Implement a Custom Array.prototype.find Polyfill](implement-custom-array-prototype-find-polyfill.md)
- [Implement a Custom Array.prototype.findIndex Polyfill](implement-custom-array-prototype-findindex-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
