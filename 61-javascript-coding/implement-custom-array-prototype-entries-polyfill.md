# QJSC029 · Implement Custom Array prototype entries Polyfill

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** iterator protocol, `Symbol.iterator`, lazy evaluation, `[index, value]` pairs

## Problem Statement

Implement `customEntries(array)`, a polyfill for `Array.prototype.entries`.
It must return a real **iterator object** — not an array of pairs — that
lazily yields `[index, value]` pairs, one per `.next()` call, in index
order. The returned object must itself be iterable (usable directly in
`for...of` and with spread syntax), matching what the native method
returns.

## Input

`array`: the array to iterate.

## Output

An iterator object implementing the iterator protocol: it has a
`.next()` method returning `{ value, done }`, and it is itself iterable
(has a `[Symbol.iterator]` method that returns itself), so `for...of`
and `[...iterator]` both work directly on it.

## Constraints

- Must be **lazy** — no work happens, and no array of pairs is
  precomputed, until `.next()` is actually called. Returning
  `array.map((value, index) => [index, value])` (a real array, not an
  iterator, and eagerly computed) does not satisfy this.
- Each `.next()` call returns `{ value: [index, value], done: false }`
  until the array is exhausted, at which point it returns `{ value:
  undefined, done: true }` forever after.
- Must not mutate `array`.
- The returned object must be directly usable in `for...of` (i.e. it
  must implement `Symbol.iterator`, typically by returning itself).

## Examples

| `array` | Usage | Output | Why |
|---|---|---|---|
| `['a', 'b']` | `[...customEntries(['a', 'b'])]` | `[[0, 'a'], [1, 'b']]` | Spreading fully drains the iterator into an array of pairs |
| `['x']` | `const it = customEntries(['x']); it.next()` | `{ value: [0, 'x'], done: false }` | First call yields the first pair |
| `['x']` | same `it`, then `it.next()` again | `{ value: undefined, done: true }` | After the single element is exhausted, further calls report done |

## Edge Cases

- Empty array (`customEntries([])`) → the very first `.next()` call
  immediately returns `{ value: undefined, done: true }`.
- Calling `.next()` repeatedly after exhaustion → keeps returning `{
  value: undefined, done: true }`, never throws or resets.
- Used directly in `for...of` (`for (const [i, v] of
  customEntries(arr))`) → must work without first calling
  `[Symbol.iterator]()` manually, since `for...of` calls it internally.
- Array mutated *after* the iterator is created but *before* it's fully
  consumed → per the real spec, the iterator reads the array's *current*
  state and length lazily on each `.next()`, so it reflects
  in-progress mutations rather than a frozen snapshot (worth noting even
  though most interview answers don't need to defend against this).

## Hints

1. An iterator is just an object with a `.next()` method that returns
   `{ value, done }` — you don't need a special built-in type to create
   one; a plain object (or a class instance) with that method already
   qualifies.
2. "Lazy" means the current position must be remembered *between* calls
   to `.next()` — a closure variable (or an instance field, if using a
   class) that starts at `0` and increments by one each call is enough
   state.
3. For the object to work in `for...of`, it needs a `[Symbol.iterator]`
   method too — and for an iterator (as opposed to a plain iterable),
   the conventional and simplest implementation of that method is
   `return this`, since the object is already its own iterator.

## Algorithm

**Pattern:** the iterator protocol, implemented manually with closure
state.
**Core insight:** `for...of`, spread, and destructuring don't know
anything about arrays specifically — they only know how to call
`[Symbol.iterator]()` to get an iterator, then repeatedly call
`.next()` on it until `done` is `true`. So building a spec-compliant
`entries()` is really just building an object that honors that
protocol: it tracks a current index in closure scope (so state persists
across separate `.next()` calls on the *same* iterator instance), and on
each call either returns the next `[index, value]` pair and increments
the index, or reports `done: true` once the index reaches
`array.length`. `[Symbol.iterator]` returning `this` is what makes the
object directly usable in `for...of` without an extra unwrapping step.
**Invariant:** at the start of every `.next()` call, the closure's
`currentIndex` equals exactly the number of pairs already yielded by
this iterator so far — never more, never less.

## Dry Run

**Input:** `const it = customEntries(['a', 'b']); it.next(); it.next(); it.next();`

| Call | `currentIndex` before | Condition (`currentIndex < array.length`) | Returned | `currentIndex` after |
|---|---|---|---|---|
| `it.next()` #1 | `0` | `0 < 2` → true | `{ value: [0, 'a'], done: false }` | `1` |
| `it.next()` #2 | `1` | `1 < 2` → true | `{ value: [1, 'b'], done: false }` | `2` |
| `it.next()` #3 | `2` | `2 < 2` → false | `{ value: undefined, done: true }` | `2` (unchanged) |

**Result:** two real pairs yielded in order, then permanently `done:
true` — matches native `Array.prototype.entries()` behavior, and no
array of pairs was ever built eagerly; each pair is computed only at the
moment `.next()` asks for it.

## JavaScript Solution

```js
function customEntries(array) {
  let currentIndex = 0; // closure state: position remembered across .next() calls

  const iterator = {
    next() {
      if (currentIndex < array.length) {
        const pair = [currentIndex, array[currentIndex]];
        currentIndex += 1;
        return { value: pair, done: false };
      }
      return { value: undefined, done: true };
    },

    // Makes the iterator itself directly usable in for...of / spread —
    // for...of calls [Symbol.iterator]() first, then repeatedly calls
    // .next() on whatever that returns.
    [Symbol.iterator]() {
      return this;
    },
  };

  return iterator;
}
```

## TypeScript Solution

```ts
function customEntries<T>(array: readonly T[]): IterableIterator<[number, T]> {
  let currentIndex = 0;

  const iterator: IterableIterator<[number, T]> = {
    next(): IteratorResult<[number, T]> {
      if (currentIndex < array.length) {
        const pair: [number, T] = [currentIndex, array[currentIndex] as T];
        currentIndex += 1;
        return { value: pair, done: false };
      }
      return { value: undefined, done: true };
    },

    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this;
    },
  };

  return iterator;
}
```

## Time Complexity

O(1) per `.next()` call (constant work to produce one pair); O(n)
overall to fully drain an n-element array, same as the native method.

## Space Complexity

O(1) additional space held by the iterator itself (just `currentIndex`);
draining it into an array via spread (`[...customEntries(arr)]`) costs
O(n) for that resulting array, but that's the caller's choice, not a
cost of the iterator itself.

## Common Mistakes

- Returning a fully-built array of pairs (`array.map((v, i) => [i,
  v])`) instead of a lazy iterator — this technically produces the same
  *values* when spread, but isn't an iterator at all (no `.next()`
  method), fails the "must be lazy" requirement, and does unnecessary
  work upfront if the caller only consumes a few pairs before breaking
  out of a loop.
- Declaring `currentIndex` as a fresh `let` *inside* `.next()` instead
  of in the enclosing closure — resets progress to `0` on every call
  instead of advancing, so the iterator never progresses past the first
  pair.
- Omitting `[Symbol.iterator]` entirely — the object still has a working
  `.next()`, but `for...of` and spread syntax both require the iterable
  protocol (`[Symbol.iterator]`), not just the iterator protocol
  (`.next()`), so `for (const pair of customEntries(arr))` would throw
  `TypeError: customEntries(...) is not iterable`.
- Returning a *new* object from `[Symbol.iterator]()` instead of `this`
  — breaks the common (though not strictly mandatory) convention that an
  iterator is its own iterable, and can cause subtle bugs if code
  expects calling `[Symbol.iterator]()` twice to return the same
  in-progress iterator.

## Interview Follow-up Questions

1. What's the difference between an "iterable" and an "iterator" in the
   spec, and how does this object satisfy both roles at once?
2. How would you implement `keys()` and `values()` by reusing most of
   this same iterator-building logic?
3. How would you make this iterator support early termination cleanly
   (e.g. `break`ing out of a `for...of` loop) — does anything special
   need to happen, given `.next()` might never be called again after a
   `break`?
4. Could you implement this using a generator function (`function*`)
   instead of a manually-built object with `.next()`? What would that
   version look like, and is it simpler?

## Similar Questions

- [Implement Custom Array prototype keys Polyfill](implement-custom-array-prototype-keys-polyfill.md)
- [Implement Custom Array prototype values Polyfill](implement-custom-array-prototype-values-polyfill.md)
- Implement a custom iterable class using generator functions

---
[← Back to 61-javascript-coding](README.md)
