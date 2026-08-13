# QJS332 · Implement a Custom Array.prototype.map Polyfill

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** callback invocation, sparse-array hole preservation, pre-sized output array, `thisArg` binding

## Problem Statement

Implement `myMap`, a polyfill for `Array.prototype.map`, attached as
`Array.prototype.myMap`. Given `callbackFn(element, index, array)`, it
should return a **new** array of the same `length`, where each present
index holds `callbackFn`'s return value for that element. Holes in a
sparse input must **not** be skipped in the sense of being dropped from
the output's length — they must be *preserved as holes at the same
index in the output*, with the callback never invoked for them at all.
It must accept an optional `thisArg`.

## Input

- The array `myMap` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a function whose return value
  becomes the mapped output for that index.
- `thisArg` (optional): the value to use as `this` inside `callbackFn`.

## Output

A new array of the same `length` as the input. Present indices hold
`callbackFn`'s return value; indices that were holes in the input remain
holes in the output (not `undefined`).

## Constraints

- `0 <= array.length <= 10^5`
- The output must have the exact same `length` as the input, including
  when the input has holes.
- Must skip invoking the callback for holes, **and** must not write
  anything to that same index in the output — the hole must propagate
  through, not become `undefined`.
- Must not call the native `Array.prototype.map` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3].myMap(x => x * 2)` | `[2, 4, 6]` | a dense array maps every index normally |
| `[1, , 3].myMap(x => x * 10)` | `[10, <1 empty item>, 30]` (`1 in result` is `false`) | the hole at index 1 is never passed to the callback, and the output's index 1 is left as a real hole too — not `undefined` |
| `[1, 2, 3].myMap(function (x) { return x * this.factor; }, { factor: 5 })` | `[5, 10, 15]` | `thisArg` makes `this.factor` (`5`) resolve inside the callback |

## Edge Cases

- Empty array → `[]`.
- Fully dense array → behaves like a normal element-by-element
  transform, output length equals input length.
- Sparse array → output preserves holes at the exact same indices;
  `index in result` is `false` for those indices, same as the input.
- `thisArg` supplied → the callback's `this` must resolve to it.
- Result must always be a **new** array reference, never the original.

## Hints

1. Pre-size the output with `new Array(length)` so it already has the
   correct final `length` — any index you never explicitly assign to
   remains a genuine hole, not `undefined`.
2. Skip holes in the input exactly like `filter`/`every`/`some`
   (`index in this`) — but here, "skip" means "don't write to
   `result[index]` either," not "don't add to the output," since the
   output must stay the same length as the input.
3. Only assign `result[index] = callbackFn.call(thisArg, element, index,
   array)` for indices that actually exist on the input.

## Algorithm

**Pattern:** pre-sized output array with conditional per-index writes.
**Core insight:** `map` must keep `result[i]` positionally aligned with
`array[i]` for every `i` — this is what distinguishes it from `filter`,
which can freely compact indices. Because a pre-sized `new Array(length)`
starts entirely as holes, simply choosing *not* to write to a hole's
corresponding output index is enough to make the hole propagate through
correctly, with no extra bookkeeping required.
**Invariant:** after processing index `i`, `result` has exactly the same
holes/non-holes at every index `0..i` as the input array does, with
non-hole indices holding the callback's return value for that position.

## Dry Run

**Input:** `[1, , 3].myMap(x => x * 10)`

| Step | index | `index in this`? | element | mapped value | Write to `result` |
|---|---|---|---|---|---|
| 1 | 0 | yes | `1` | `10` | `result[0] = 10` |
| 2 | 1 | no (hole) | — | — | skipped — `result[1]` stays a hole |
| 3 | 2 | yes | `3` | `30` | `result[2] = 30` |

**Result:** `[10, <1 empty item>, 30]` — `1 in result` is `false`,
matching Example 2 exactly.

## JavaScript Solution

```js
Array.prototype.myMap = function (callbackFn, thisArg) {
  const length = this.length;
  const result = new Array(length); // pre-sized; unset slots stay real holes

  for (let index = 0; index < length; index += 1) {
    if (!(index in this)) {
      continue; // leave result[index] as a hole too — never write undefined
    }

    result[index] = callbackFn.call(thisArg, this[index], index, this);
  }

  return result;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myMap<U>(
    callbackFn: (element: T, index: number, array: T[]) => U,
    thisArg?: unknown,
  ): U[];
}

Array.prototype.myMap = function <T, U>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => U,
  thisArg?: unknown,
): U[] {
  const length = this.length;
  // NOTE: `new Array<U>(length)` produces a length-U[] with holes at
  // every index — TypeScript's type system can't express "hole" versus
  // "assigned," so this is a deliberate, documented simplification.
  const result: U[] = new Array(length);

  for (let index = 0; index < length; index += 1) {
    if (!(index in this)) {
      continue;
    }

    result[index] = callbackFn.call(thisArg, this[index], index, this);
  }

  return result;
};
```

## Time Complexity

O(n) — every present element is visited and mapped exactly once; holes
are O(1) each to skip.

## Space Complexity

O(n) — the output array always has the same `length` as the input,
regardless of how many indices are actually holes.

## Common Mistakes

- Using `result.push(...)` inside a loop that skips holes, instead of a
  pre-sized array with index assignment — `push` compacts the output,
  shrinking its length below the input's and misaligning every
  subsequent index with the original array. This is the single most
  common `map`-specific bug.
- Writing `result[index] = undefined` for a hole instead of leaving it
  genuinely unset — this looks identical in a casual `console.log` but
  fails an `index in result` check and differs from native `map`'s
  actual output.
- Forgetting `thisArg` support.
- Mutating the original array or returning it directly instead of a new
  one.

## Interview Follow-up Questions

1. Why must the output be pre-sized instead of built with `push`, given
   that `map` has to skip invoking the callback on holes?
2. Compare hole-handling across `map` (preserves holes in output),
   `filter` (removes them, shrinking the array), and `find`/`findIndex`
   (don't skip them at all, treating them as `undefined`) — why does
   each method make a different choice?
3. How would you implement `flatMap` by extending this `map` logic with
   a one-level flatten step?
4. When would you prefer `thisArg` over an arrow function closing over
   an outer variable — is there ever a real reason to choose one over
   the other?
5. Is `result.push()` actually slower than pre-sized index assignment in
   real JS engines, independent of the holes issue — what does that say
   about array growth/reallocation strategies?

## Similar Questions

- [Implement a Custom Array.prototype.filter Polyfill](implement-custom-array-prototype-filter-polyfill.md)
- [Implement a Custom Array.prototype.flatMap Polyfill (Iterative)](implement-custom-array-prototype-flatmap-polyfill-iterative.md)
- [Implement a Custom Array.prototype.reduce Polyfill](implement-custom-array-prototype-reduce-polyfill.md)
- [Array.prototype.map Polyfill Walkthrough](../02-javascript-fundamentals/array-prototype-map-polyfill-walkthrough.md) — a technical-question framing of the same underlying topic

---
[← Back to 61-javascript-coding](README.md)
