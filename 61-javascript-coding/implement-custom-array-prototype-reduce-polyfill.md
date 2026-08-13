# QJS334 · Implement a Custom Array.prototype.reduce Polyfill

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** accumulator pattern, optional `initialValue` detection, `TypeError` on empty array with no initial value, sparse-array hole skipping

## Problem Statement

Implement `myReduce`, a polyfill for `Array.prototype.reduce`, attached
as `Array.prototype.myReduce`. Given `callbackFn(accumulator, current,
index, array)` and an optional `initialValue`, it should fold the array
down to a single value by repeatedly calling `callbackFn`. If
`initialValue` is provided, it seeds the accumulator and iteration
starts at index `0`. If it is **not** provided, the first present
(non-hole) element seeds the accumulator instead, and iteration starts
right after that element's index. If the array has no present elements
at all and no `initialValue` was given, it must throw a `TypeError` —
there is nothing to reduce and no seed to start from.

## Input

- The array `myReduce` is called on (possibly sparse).
- `callbackFn(accumulator, current, index, array)`: combines the
  running accumulator with the current element.
- `initialValue` (optional): seeds the accumulator if provided.

## Output

The final accumulator value after folding over every present element.

## Constraints

- `0 <= array.length <= 10^5`
- Must distinguish "no `initialValue` argument was passed at all" from
  "`initialValue` was explicitly passed as `undefined`" — these are
  different calls with different behavior, not the same thing.
- Must skip holes when searching for a default seed *and* during the
  main loop.
- Must throw `TypeError` for an empty (or all-holes) array with no
  `initialValue`.
- `reduce` does **not** accept a `thisArg` — unlike `map`/`filter`/
  `every`/`some`, this is not part of its signature.
- Must not call the native `Array.prototype.reduce` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3, 4].myReduce((acc, x) => acc + x, 10)` | `20` | `initialValue = 10` seeds the accumulator; the callback runs 4 times, once per element (`10+1+2+3+4`) |
| `[1, 2, 3, 4].myReduce((acc, x) => acc + x)` | `10` | no `initialValue`: the first element (`1`) becomes the starting accumulator, and the loop begins at index 1 — the callback runs only 3 times, not 4 |
| `[].myReduce((acc, x) => acc + x, 0)` | `0` | an empty array *with* an initial value simply returns that value — the callback is never invoked at all (0 times), since there's nothing to combine it with |

## Edge Cases

- `[].myReduce((acc, x) => acc + x)` (empty array, **no** initial value)
  → throws `TypeError: Reduce of empty array with no initial value`,
  the single most important edge case this method is known for.
- `[5].myReduce((acc, x) => acc + x)` (single element, no initial value)
  → returns `5` directly; the callback is never invoked (there's nothing
  after the seed to combine it with).
- `[, , 5, 6].myReduce((acc, x) => acc + x)` (leading holes, no initial
  value) → the seed search skips the holes at indices 0 and 1, seeds
  with `5` (index 2), then combines with `6` (index 3): result `11`.
- `initialValue` explicitly passed as `undefined` (e.g.
  `array.myReduce(fn, undefined)`) → this **does** count as providing an
  initial value (the accumulator starts as `undefined`), which is
  different from omitting the argument entirely.

## Hints

1. You need to distinguish "no second argument was passed" from "the
   second argument's value happens to be `undefined`" — a plain default
   parameter alone can't tell these apart, but `arguments.length` can
   (which means this needs a regular `function`, not an arrow function).
2. When no `initialValue` is given, scan forward for the first *present*
   element to seed the accumulator — not necessarily index 0, if there
   are leading holes — and start the real reduction loop at the index
   right after wherever that seed was found.
3. If that search reaches the end of the array without finding any
   present element, and no `initialValue` was given, there's nothing to
   seed with at all — throw a `TypeError` rather than returning
   `undefined` silently.

## Algorithm

**Pattern:** two-phase fold — determine the starting accumulator and
starting index first, then run a single forward accumulation loop.
**Core insight:** `reduce`'s trickiest behavior all comes from one
question: "where does the accumulator's very first value come from?"
When `initialValue` is supplied, the answer is trivial (use it, start at
index 0). When it isn't, the array has to supply its own first present
element as the seed — which means the seed-search and the main loop
share the exact same hole-skipping rule, just applied in two different
phases of the same function.
**Invariant:** once phase one has established `accumulator` and
`startIndex`, phase two's loop invariant is that after processing index
`i`, `accumulator` holds the correctly-folded result of every present
element from the seed through index `i`.

## Dry Run

**Input:** `[1, 2, 3, 4].myReduce((acc, x) => acc + x)` (no initial value)

| Step | Phase | index | Action | `accumulator` |
|---|---|---|---|---|
| seed | search for first present element | 0 | index 0 is present → `accumulator = 1`, `startIndex = 1` | `1` |
| 1 | main loop | 1 | `accumulator = callbackFn(1, 2) = 3` | `3` |
| 2 | main loop | 2 | `accumulator = callbackFn(3, 3) = 6` | `6` |
| 3 | main loop | 3 | `accumulator = callbackFn(6, 4) = 10` | `10` |

**Result:** `10` — the callback ran exactly 3 times (not 4), matching
Example 2.

## JavaScript Solution

```js
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const length = this.length;
  // arguments.length distinguishes "no second argument passed" from
  // "initialValue was explicitly passed as undefined" — a default
  // parameter alone can't tell these apart. This requires a regular
  // function (not an arrow function) to access `arguments`.
  const hasInitialValue = arguments.length >= 2;

  let accumulator;
  let startIndex;

  if (hasInitialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // No initial value: seed with the first PRESENT element, skipping
    // any leading holes, and start the main loop right after it.
    let index = 0;
    while (index < length && !(index in this)) {
      index += 1;
    }

    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = this[index];
    startIndex = index + 1;
  }

  for (let index = startIndex; index < length; index += 1) {
    if (!(index in this)) {
      continue; // skip holes in the main loop too
    }

    accumulator = callbackFn(accumulator, this[index], index, this);
  }

  return accumulator;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myReduce(
    callbackFn: (accumulator: T, current: T, index: number, array: T[]) => T,
    initialValue?: T,
  ): T;
  myReduce<U>(
    callbackFn: (accumulator: U, current: T, index: number, array: T[]) => U,
    initialValue: U,
  ): U;
}

Array.prototype.myReduce = function <T, U>(
  this: T[],
  callbackFn: (accumulator: T | U, current: T, index: number, array: T[]) => T | U,
  initialValue?: U,
): T | U {
  const length = this.length;
  const hasInitialValue = arguments.length >= 2;

  let accumulator: T | U;
  let startIndex: number;

  if (hasInitialValue) {
    accumulator = initialValue as U;
    startIndex = 0;
  } else {
    let index = 0;
    while (index < length && !(index in this)) {
      index += 1;
    }

    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = this[index];
    startIndex = index + 1;
  }

  for (let index = startIndex; index < length; index += 1) {
    if (!(index in this)) {
      continue;
    }

    accumulator = callbackFn(accumulator, this[index], index, this);
  }

  return accumulator;
};
```

## Time Complexity

O(n) — the optional seed search and the main loop together visit each
index at most once.

## Space Complexity

O(1) — only the accumulator and a couple of index variables, independent
of array size (assuming `callbackFn` itself doesn't allocate proportional
to input size).

## Common Mistakes

- Checking `initialValue === undefined` to decide whether one was
  provided, instead of `arguments.length` — this incorrectly treats an
  explicitly-passed `undefined` initial value the same as no argument at
  all, when the real spec distinguishes them by argument count, not
  value.
- Not throwing `TypeError` for an empty (or all-holes) array with no
  initial value — silently returning `undefined` hides a genuine runtime
  error condition real code relies on being able to catch.
- Forgetting that, without an initial value, the main loop must start
  right after wherever the seed was actually found — not always index
  1 — if the array has leading holes.
- Adding a `thisArg` parameter — `reduce`/`reduceRight` are the two
  iteration methods that do **not** accept one; a callback needing outer
  context must use a closure instead.

## Interview Follow-up Questions

1. Why does distinguishing "no initial value" from "initial value is
   `undefined`" require `arguments.length` instead of a plain equality
   check?
2. Walk through `[undefined].myReduce((acc, x) => x, 5)` versus
   `[undefined].myReduce((acc, x) => x)` — do they produce the same
   result, and does the callback run the same number of times in each?
3. How would you implement `map`, `filter`, or `some` purely in terms of
   `reduce` — a classic "everything is a reduce" exercise?
4. Why doesn't `reduce` accept a `thisArg` the way `map`/`filter`/
   `every`/`some` do?
5. How would you implement `reduceRight` by adapting this same two-phase
   structure?

## Similar Questions

- [Implement a Custom Array.prototype.reduceRight Polyfill](implement-custom-array-prototype-reduceright-polyfill.md)
- [Implement a Custom Array.prototype.map Polyfill](implement-custom-array-prototype-map-polyfill.md)
- [Implement a Custom Array.prototype.filter Polyfill](implement-custom-array-prototype-filter-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
