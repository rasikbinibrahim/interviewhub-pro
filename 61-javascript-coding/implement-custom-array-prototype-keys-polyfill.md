# QJSC030 · Implement Custom Array prototype keys Polyfill

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** iterator protocol, `Symbol.iterator`, lazy evaluation, index-only iteration

## Problem Statement

Implement `customKeys(array)`, a polyfill for `Array.prototype.keys`. It
must return a real **iterator object** (not an array) that lazily
yields `array`'s indices — `0`, `1`, `2`, ... up to `array.length - 1`
— one per `.next()` call, and that is itself directly usable in
`for...of` and spread syntax.

## Input

`array`: the array whose indices should be iterated.

## Output

An iterator object: `.next()` returns `{ value: index, done: false }`
for each index in order, then `{ value: undefined, done: true }`
forever after the last index is exhausted. The object also implements
`[Symbol.iterator]` (conventionally returning itself).

## Constraints

- Must be lazy — indices are produced one at a time on demand, not
  precomputed into an array up front.
- Yields plain numbers (the indices themselves), not `[index, value]`
  pairs (that's `entries()`) and not the values (that's `values()`).
- Must not mutate `array`.
- Must work directly in `for...of` without any extra unwrapping step.

## Examples

| `array` | Usage | Output | Why |
|---|---|---|---|
| `['a', 'b', 'c']` | `[...customKeys(['a', 'b', 'c'])]` | `[0, 1, 2]` | Spreading drains every index in order |
| `[10]` | `const it = customKeys([10]); it.next()` | `{ value: 0, done: false }` | First (and only) index |
| `[10]` | same `it`, then `it.next()` again | `{ value: undefined, done: true }` | Exhausted after the single index |

## Edge Cases

- Empty array → the first `.next()` immediately reports `{ value:
  undefined, done: true }`.
- Repeated `.next()` calls past exhaustion → keep returning `done:
  true`, never throw.
- Used with `Array.from(customKeys(array))` instead of spread → must
  still work, since `Array.from` also consumes any iterable via the
  same protocol.
- Sparse arrays (holes) → `keys()` still yields every index in range,
  including hole positions (indices are indices regardless of whether a
  value is actually stored there).

## Hints

1. This is the same iterator-building shape as `entries()`, just
   yielding a plain index each time instead of a `[index, value]` pair.
2. The only state that needs to persist between `.next()` calls is the
   current index — start it at `0` in the enclosing closure and
   increment after each yield.
3. Don't forget `[Symbol.iterator]() { return this; }` — without it, the
   object has a working `.next()` but still isn't usable in `for...of`
   or spread syntax, which require the iterable protocol specifically.

## Algorithm

**Pattern:** the iterator protocol, manually implemented with closure
state, specialized to yield indices only.
**Core insight:** `keys()` needs the least information of the three
"array iterator" methods (`keys`, `values`, `entries`) — it never even
needs to read `array[currentIndex]`, only compare `currentIndex` against
`array.length` and hand back the counter itself. Everything else —
lazy, one-at-a-time production; state persisting via closure; being
directly `for...of`-usable via `[Symbol.iterator]` returning `this` —
is identical in shape to `entries()` and `values()`.
**Invariant:** at the start of every `.next()` call, `currentIndex`
equals exactly the number of indices already yielded by this particular
iterator instance.

## Dry Run

**Input:** `const it = customKeys(['a', 'b']); it.next(); it.next(); it.next();`

| Call | `currentIndex` before | `currentIndex < array.length`? | Returned | `currentIndex` after |
|---|---|---|---|---|
| `it.next()` #1 | `0` | `0 < 2` → true | `{ value: 0, done: false }` | `1` |
| `it.next()` #2 | `1` | `1 < 2` → true | `{ value: 1, done: false }` | `2` |
| `it.next()` #3 | `2` | `2 < 2` → false | `{ value: undefined, done: true }` | `2` (unchanged) |

**Result:** yields `0`, then `1`, then permanently reports `done: true`
— the array's two valid indices, in order, and nothing else.

## JavaScript Solution

```js
function customKeys(array) {
  let currentIndex = 0; // closure state, remembered across .next() calls

  const iterator = {
    next() {
      if (currentIndex < array.length) {
        const key = currentIndex;
        currentIndex += 1;
        return { value: key, done: false };
      }
      return { value: undefined, done: true };
    },

    [Symbol.iterator]() {
      return this; // makes the iterator directly usable in for...of / spread
    },
  };

  return iterator;
}
```

## TypeScript Solution

```ts
function customKeys<T>(array: readonly T[]): IterableIterator<number> {
  let currentIndex = 0;

  const iterator: IterableIterator<number> = {
    next(): IteratorResult<number> {
      if (currentIndex < array.length) {
        const key = currentIndex;
        currentIndex += 1;
        return { value: key, done: false };
      }
      return { value: undefined, done: true };
    },

    [Symbol.iterator](): IterableIterator<number> {
      return this;
    },
  };

  return iterator;
}
```

## Time Complexity

O(1) per `.next()` call; O(n) to fully drain across an n-element array.

## Space Complexity

O(1) held by the iterator itself; draining it (e.g. via spread) costs
O(n) for the resulting array, which is the caller's cost, not the
iterator's.

## Common Mistakes

- Returning `Object.keys(array)` (a real array of string keys, plus any
  own enumerable properties) instead of a lazy numeric iterator —
  wrong return type entirely, and `Object.keys` on an array actually
  returns *string* indices (`'0'`, `'1'`, ...), not numbers, which
  diverges from `Array.prototype.keys`'s numeric `value`.
- Yielding `array[currentIndex]` (the value) instead of `currentIndex`
  itself — confuses this with `values()`.
- Forgetting `[Symbol.iterator]` — leaves the object with a working
  `.next()` but unusable in `for...of`/spread, which require the
  iterable protocol.
- Precomputing all indices into an array (`[0, 1, ..., array.length -
  1]`) up front instead of lazily — violates the "must be lazy"
  requirement and does unnecessary work if the caller only consumes a
  few indices before breaking out of a loop.

## Interview Follow-up Questions

1. What's the practical use case for `keys()` when you could just use a
   plain `for (let i = 0; i < array.length; i++)` loop instead?
2. How would you implement `values()` and `entries()` by adapting this
   exact same structure?
3. How does this iterator behave if `array.length` changes (grows or
   shrinks) *while* the iterator is partway through being consumed?
4. Could this be implemented more concisely using a generator function
   (`function* customKeys(array) { ... }`)? What does JS give you "for
   free" with generators that you had to build manually here?

## Similar Questions

- [Implement Custom Array prototype values Polyfill](implement-custom-array-prototype-values-polyfill.md)
- [Implement Custom Array prototype entries Polyfill](implement-custom-array-prototype-entries-polyfill.md)
- Implement a custom `Map`/`Set`-like iterable class

---
[← Back to 61-javascript-coding](README.md)
