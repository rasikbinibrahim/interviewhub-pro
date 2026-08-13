# QJSC031 · Implement Custom Array prototype values Polyfill

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** iterator protocol, `Symbol.iterator`, lazy evaluation, `for...of` mechanics

## Problem Statement

Implement `customValues(array)`, a polyfill for `Array.prototype.values`
— the exact method `for...of` calls under the hood when iterating a
real array. It must return a real **iterator object** that lazily
yields `array`'s elements in order, one per `.next()` call, and that is
itself directly usable in `for...of` and spread syntax.

## Input

`array`: the array whose elements should be iterated.

## Output

An iterator object: `.next()` returns `{ value: element, done: false }`
for each element in order, then `{ value: undefined, done: true }`
forever after the last element is exhausted. The object also implements
`[Symbol.iterator]` (conventionally returning itself).

## Constraints

- Must be lazy — elements are produced one at a time on demand, not
  precomputed into a copied array up front.
- Yields the elements themselves, not indices (`keys()`) and not
  `[index, value]` pairs (`entries()`).
- Must not mutate `array`.
- Must work directly in `for...of` and with spread syntax without any
  extra unwrapping step, since `values()` is literally what `for...of`
  already does internally for arrays (`array[Symbol.iterator] ===
  array.values`, per spec).

## Examples

| `array` | Usage | Output | Why |
|---|---|---|---|
| `['a', 'b', 'c']` | `[...customValues(['a', 'b', 'c'])]` | `['a', 'b', 'c']` | Spreading fully drains the iterator |
| `[10]` | `const it = customValues([10]); it.next()` | `{ value: 10, done: false }` | First (and only) element |
| `[10]` | same `it`, then `it.next()` again | `{ value: undefined, done: true }` | Exhausted after the single element |

## Edge Cases

- Empty array → the first `.next()` immediately reports `{ value:
  undefined, done: true }`.
- Repeated `.next()` calls past exhaustion → keep returning `done:
  true`, never throw or restart.
- Used directly in `for (const value of customValues(array))` → must
  work without manual `[Symbol.iterator]()` calls.
- Array mutated after the iterator is created but before fully consumed
  → per spec, the iterator reads `array`'s live, current state on each
  `.next()` rather than a frozen snapshot taken at creation time.

## Hints

1. This is the same iterator-building shape used for `keys()` and
   `entries()` — only what gets yielded differs.
2. The state that must persist between `.next()` calls is just the
   current index, held in the enclosing closure, starting at `0` and
   incrementing by one each call.
3. Remember `[Symbol.iterator]() { return this; }` — this is what makes
   the object work directly in `for...of`, and is in fact conceptually
   identical to what a real array's own `[Symbol.iterator]` method does:
   it *is* `values()`.

## Algorithm

**Pattern:** the iterator protocol, manually implemented with closure
state.
**Core insight:** `for (const value of array)` on a real array works
*because* arrays have a `[Symbol.iterator]` method that is, per spec,
the exact same function as `Array.prototype.values`. So building
`values()` correctly means building the very mechanism `for...of`
already depends on: an object tracking a current index via closure,
whose `.next()` reads `array[currentIndex]`, hands it back wrapped in
`{ value, done: false }`, advances the index, and once the index reaches
`array.length`, reports `{ value: undefined, done: true }` from then on.
`[Symbol.iterator]` returning `this` completes the loop — literally —
by making the object satisfy the iterable protocol as well as the
iterator protocol.
**Invariant:** at the start of every `.next()` call, `currentIndex`
equals exactly the number of elements already yielded by this iterator
instance so far.

## Dry Run

**Input:** `const it = customValues(['x', 'y']); it.next(); it.next(); it.next();`

| Call | `currentIndex` before | `currentIndex < array.length`? | Returned | `currentIndex` after |
|---|---|---|---|---|
| `it.next()` #1 | `0` | `0 < 2` → true | `{ value: 'x', done: false }` | `1` |
| `it.next()` #2 | `1` | `1 < 2` → true | `{ value: 'y', done: false }` | `2` |
| `it.next()` #3 | `2` | `2 < 2` → false | `{ value: undefined, done: true }` | `2` (unchanged) |

**Result:** yields `'x'`, then `'y'`, then permanently reports `done:
true` — exactly what `for (const v of ['x', 'y'])` produces internally.

## JavaScript Solution

```js
function customValues(array) {
  let currentIndex = 0; // closure state, remembered across .next() calls

  const iterator = {
    next() {
      if (currentIndex < array.length) {
        const value = array[currentIndex];
        currentIndex += 1;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    },

    // for...of and spread both call this first to obtain an iterator —
    // returning `this` means the object is its own iterator.
    [Symbol.iterator]() {
      return this;
    },
  };

  return iterator;
}
```

## TypeScript Solution

```ts
function customValues<T>(array: readonly T[]): IterableIterator<T> {
  let currentIndex = 0;

  const iterator: IterableIterator<T> = {
    next(): IteratorResult<T> {
      if (currentIndex < array.length) {
        const value = array[currentIndex] as T;
        currentIndex += 1;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    },

    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },
  };

  return iterator;
}
```

## Time Complexity

O(1) per `.next()` call; O(n) to fully drain an n-element array.

## Space Complexity

O(1) held by the iterator itself; draining it into an array (e.g. via
spread) costs O(n) for the resulting array, a cost borne by the caller,
not the iterator.

## Common Mistakes

- Returning `[...array]` (a real, eagerly-copied array) instead of a
  lazy iterator — produces the same values when spread again, but is
  not actually an iterator (no `.next()`), does unnecessary upfront work
  even if the caller only wants the first element, and fails any check
  that inspects the object for iterator-shaped behavior.
- Declaring `currentIndex` fresh inside `.next()` instead of in the
  outer closure — resets to `0` every call instead of advancing, so the
  iterator never progresses past the first element.
- Omitting `[Symbol.iterator]` — leaves `.next()` working in isolation,
  but breaks `for...of` and spread, both of which require the object to
  satisfy the iterable protocol, not just the iterator protocol.
- Confusing this with `keys()` or `entries()` by yielding the index or a
  pair instead of the plain element value.

## Interview Follow-up Questions

1. Why is `Array.prototype[Symbol.iterator]` literally the same function
   reference as `Array.prototype.values` in the real spec — what does
   that tell you about what `for...of` is actually doing when it
   iterates an array?
2. How would strings, `Map`, and `Set` each implement their own
   `values()`-equivalent differently, given they iterate different
   kinds of "elements"?
3. How would you implement this using a generator function (`function*
   customValues(array) { for (const value of array) yield value; }`)
   instead — what does the generator syntax handle automatically that
   you had to build by hand here?
4. What happens if two separate `for...of` loops iterate the *same*
   array concurrently (e.g. one nested inside the other) — does each
   loop get its own independent iterator, and why does that matter?

## Similar Questions

- [Implement Custom Array prototype keys Polyfill](implement-custom-array-prototype-keys-polyfill.md)
- [Implement Custom Array prototype entries Polyfill](implement-custom-array-prototype-entries-polyfill.md)
- Implement a custom iterable class with a generator-based
  `[Symbol.iterator]`

---
[← Back to 61-javascript-coding](README.md)
