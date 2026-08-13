# QJS349 · Implement a Custom Array.prototype.reduceRight Polyfill

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** right-to-left accumulator pattern, optional `initialValue` detection, `TypeError` on empty array with no initial value, sparse-array hole skipping

## Problem Statement

Implement `myReduceRight`, a polyfill for `Array.prototype.reduceRight`,
attached as `Array.prototype.myReduceRight`. It behaves exactly like
`reduce`, except it folds the array **right to left**: without an
`initialValue`, the accumulator is seeded with the *last* present
element (skipping trailing holes), and the main loop walks backward from
there toward index `0`. With an `initialValue`, the loop starts at the
last index and walks backward to `0`. An empty (or all-holes) array with
no `initialValue` must throw a `TypeError`, same as `reduce`.

## Input

- The array `myReduceRight` is called on (possibly sparse).
- `callbackFn(accumulator, current, index, array)`: combines the running
  accumulator with the current element.
- `initialValue` (optional): seeds the accumulator if provided.

## Output

The final accumulator value after folding over every present element,
right to left.

## Constraints

- `0 <= array.length <= 10^5`
- Must fold **right to left** — from the last index toward `0`.
- Must distinguish "no `initialValue` passed" from "`initialValue`
  explicitly passed as `undefined`," same as `reduce`.
- Must skip holes when searching for the default seed (from the end)
  and during the main loop.
- Must throw `TypeError` for an empty (or all-holes) array with no
  `initialValue`.
- Does **not** accept a `thisArg`, same as `reduce`.
- Must not call the native `Array.prototype.reduceRight` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `['a', 'b', 'c'].myReduceRight((acc, x) => acc + x)` | `'cba'` | no initial value: seeds with the *last* element (`'c'`), then walks backward through `'b'` then `'a'` — the right-to-left order is what makes this `'cba'`, not `'abc'` |
| `['a', 'b', 'c'].myReduceRight((acc, x) => acc + x, '')` | `'cba'` | with an explicit initial value, the loop still starts at the actual last index and walks backward |
| `[].myReduceRight((acc, x) => acc + x, '')` | `''` | an empty array with an initial value returns it directly — the callback never runs |

## Edge Cases

- `[].myReduceRight((acc, x) => acc + x)` (empty, no initial value) →
  throws `TypeError: Reduce of empty array with no initial value`, the
  same message and condition as `reduce`.
- `[5].myReduceRight((acc, x) => acc + x)` (single element, no initial
  value) → returns `5` directly, callback never invoked.
- `[5, 6, , ].myReduceRight((acc, x) => acc + x)` (trailing holes, no
  initial value) → the seed search starts from the last index and skips
  trailing holes, seeding with `6` (index 1), then combining with `5`
  (index 0): result `11`.
- `initialValue` explicitly passed as `undefined` → counts as providing
  one, same distinction as `reduce`.

## Hints

1. Reuse `reduce`'s two-phase structure — determine the starting
   accumulator and starting index first, then run a single accumulation
   loop — just mirror both the seed search and the loop direction.
2. Without an initial value, search for the seed starting from
   `length - 1` and moving *down* toward `0`, skipping any trailing
   holes, instead of searching forward from `0`.
3. Use `arguments.length` to distinguish "no initial value passed" from
   "explicitly passed as `undefined`," exactly as in `reduce` — this
   still requires a regular `function`, not an arrow function.

## Algorithm

**Pattern:** two-phase fold, mirrored — determine the starting
accumulator and starting index by searching from the *end*, then run a
single backward accumulation loop.
**Core insight:** every piece of `reduce`'s logic has a direct mirror
here: "first present element, searching forward" becomes "last present
element, searching backward," and "loop forward from `startIndex + 1`"
becomes "loop backward from `startIndex - 1`." The `TypeError` condition
and the `arguments.length`-based initial-value detection are identical
in both — only the direction of traversal changes.
**Invariant:** once phase one has established `accumulator` and
`startIndex` from the right-hand side, phase two's loop invariant is
that after processing index `i`, `accumulator` holds the correctly
right-to-left-folded result of every present element from the seed down
through index `i`.

## Dry Run

**Input:** `['a', 'b', 'c'].myReduceRight((acc, x) => acc + x)` (no
initial value)

| Step | Phase | index | Action | `accumulator` |
|---|---|---|---|---|
| seed | search backward for first present element | 2 | index 2 is present → `accumulator = 'c'`, `startIndex = 1` | `'c'` |
| 1 | main loop | 1 | `accumulator = callbackFn('c', 'b') = 'cb'` | `'cb'` |
| 2 | main loop | 0 | `accumulator = callbackFn('cb', 'a') = 'cba'` | `'cba'` |

**Result:** `'cba'` — matching Example 1, and clearly demonstrating
right-to-left order versus `reduce`'s `'abc'` on the same input.

## JavaScript Solution

```js
Array.prototype.myReduceRight = function (callbackFn, initialValue) {
  const length = this.length;
  const hasInitialValue = arguments.length >= 2;

  let accumulator;
  let startIndex;

  if (hasInitialValue) {
    accumulator = initialValue;
    startIndex = length - 1;
  } else {
    // No initial value: seed with the LAST present element, skipping
    // any trailing holes, and start the main loop right before it.
    let index = length - 1;
    while (index >= 0 && !(index in this)) {
      index -= 1;
    }

    if (index < 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = this[index];
    startIndex = index - 1;
  }

  for (let index = startIndex; index >= 0; index -= 1) {
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
  myReduceRight(
    callbackFn: (accumulator: T, current: T, index: number, array: T[]) => T,
    initialValue?: T,
  ): T;
  myReduceRight<U>(
    callbackFn: (accumulator: U, current: T, index: number, array: T[]) => U,
    initialValue: U,
  ): U;
}

Array.prototype.myReduceRight = function <T, U>(
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
    startIndex = length - 1;
  } else {
    let index = length - 1;
    while (index >= 0 && !(index in this)) {
      index -= 1;
    }

    if (index < 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = this[index];
    startIndex = index - 1;
  }

  for (let index = startIndex; index >= 0; index -= 1) {
    if (!(index in this)) {
      continue;
    }

    accumulator = callbackFn(accumulator, this[index], index, this);
  }

  return accumulator;
};
```

## Time Complexity

O(n) — the optional seed search (from the end) and the main backward
loop together visit each index at most once.

## Space Complexity

O(1) — only the accumulator and a couple of index variables, independent
of array size.

## Common Mistakes

- Implementing this by reversing a copy of the array and calling
  `reduce` on it — the final value can come out correct, but the
  `index` and `array` arguments the callback receives would be wrong
  (reversed indices, a reversed-copy array) unless carefully corrected,
  which is more error-prone than just writing the backward loop
  directly.
- Copying `reduce`'s `arguments.length` check but forgetting to mirror
  the seed search direction — searching forward for the seed while
  looping backward (or vice versa) produces subtly wrong results only
  visible with sparse or single-element arrays.
- Not skipping trailing holes when seeding without an initial value, and
  not starting the main loop at `index - 1` from wherever the seed was
  actually found.
- Adding a `thisArg` parameter — `reduceRight`, like `reduce`, doesn't
  accept one.

## Interview Follow-up Questions

1. Could you implement `reduceRight` by reversing the array and calling
   `reduce`? What has to be corrected about the callback's `index`
   argument if you did?
2. When does evaluation *order* actually change the result, not just the
   mechanics — think of right-associative operations like exponentiation
   or function composition.
3. How would you build a `compose(...fns)` utility (right-to-left
   function composition) using `reduceRight`, and how would `pipe`
   (left-to-right) differ using plain `reduce`?
4. Walk through the same `arguments.length` vs. `=== undefined`
   distinction discussed for `reduce` — does it apply identically here?
5. Why don't `reduce`/`reduceRight` accept a `thisArg` while most other
   iteration methods do?

## Similar Questions

- [Implement a Custom Array.prototype.reduce Polyfill](implement-custom-array-prototype-reduce-polyfill.md)
- Implement a `compose` utility using `reduceRight` (function composition)
- [Implement a Custom Array.prototype.map Polyfill](implement-custom-array-prototype-map-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
