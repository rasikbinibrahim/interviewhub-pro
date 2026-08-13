# QJSC052 · Implement a Custom Array.prototype.flatMap Polyfill (Iterative)

**Difficulty:** Medium
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** single-pass map + one-level flatten, sparse-array hole skipping, `thisArg` binding

## Problem Statement

Implement `myFlatMap`, a polyfill for `Array.prototype.flatMap`,
attached as `Array.prototype.myFlatMap`. Given `callbackFn(element,
index, array)`, it should behave like calling `map` and then flattening
the result by exactly one level — but it must do so in a **single pass**
over the array, not by literally calling a `map` implementation followed
by a `flat` implementation. If `callbackFn`'s return value is an array,
its elements are spliced directly into the output in place of the
original element; if not, the return value itself becomes one output
element. It must accept an optional `thisArg`.

## Input

- The array `myFlatMap` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a function whose return value
  becomes (or contributes, if an array) part of the output.
- `thisArg` (optional): the value to use as `this` inside `callbackFn`.

## Output

A new, flat array — one level flatter than a plain `map` over the same
input would have produced, whenever `callbackFn` returns arrays.

## Constraints

- `0 <= array.length <= 10^5`
- Must flatten exactly **one** level of nesting from `callbackFn`'s
  return value — arrays nested more than one level inside a returned
  array stay nested (this is not the same as `myFlat(Infinity)`).
- Must skip holes in the *original* array — `callbackFn` is never
  invoked for an index that doesn't exist.
- Must be a single pass — no separate internal call to a `map`
  implementation followed by a `flat` implementation.
- Must not call the native `Array.prototype.flatMap` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3].myFlatMap(x => [x, x * 2])` | `[1, 2, 2, 4, 3, 6]` | each element's returned pair is spliced in directly, doubling the output length |
| `[1, [2], 3].myFlatMap(x => x)` | `[1, 2, 3]` | the identity callback returns `[2]` for the middle element, which gets unwrapped by one level — a classic use of `flatMap(x => x)` to flatten a mixed array by exactly one level |
| `[1, 2, 3].myFlatMap(x => x % 2 === 0 ? [] : [x])` | `[1, 3]` | returning `[]` for even numbers effectively filters them out, while `[x]` keeps odd numbers — `flatMap` doubling as a filter+map combinator |

## Edge Cases

- `callbackFn` never returns an array → behaves identically to a plain
  `map` (nothing to unwrap).
- `callbackFn` returns `[]` for some elements → those elements
  contribute zero output entries, effectively removing them.
- `callbackFn` returns a nested array like `[[1, 2]]` → only the outer
  array is unwrapped; `[1, 2]` stays as a single nested element in the
  output (only one level is flattened, unlike `myFlat(Infinity)`).
- Holes in the original array → skipped entirely; `callbackFn` is never
  invoked for them, matching `map`'s behavior (not `find`'s).
- Empty input array → returns `[]` immediately.

## Hints

1. `flatMap` is `map`'s per-element callback plus an automatic one-level
   unwrap whenever the callback's return value happens to be an array —
   you don't need to build a full mapped array first and then flatten
   it separately.
2. Because the unwrap only ever goes one level deep, you don't need a
   stack or recursion the way a general `flat(depth)` does — a single
   outer loop over the source array, with a small inner loop that either
   spreads the callback's array result or pushes it directly, is the
   entire algorithm.
3. Holes in the source array should be skipped before the callback is
   ever called, exactly like `map` — check `index in this` first.

## Algorithm

**Pattern:** single-pass map-and-splice.
**Core insight:** `flatMap`'s specification is literally "map, then flat
by exactly 1" — but computing it as one pass avoids ever materializing
an intermediate mapped array that would then need a second traversal to
flatten. For each present element, call `callbackFn` once; if the result
is an array, iterate *that* array's present indices and push each
element directly into the shared output; otherwise push the single
result value. Because the unwrap depth is fixed at exactly one, no
stack or recursion is needed — only one extra (bounded) inner loop per
element.
**Invariant:** after processing source index `i`, `result` holds every
output contributed by source indices `0..i` — either their raw
callback return value, or that value's own elements if it was an array
— in original order, with holes from the source and from any returned
array both dropped entirely.

## Dry Run

**Input:** `[1, 2, 3].myFlatMap(x => x % 2 === 0 ? [] : [x])`

| Step | index | element | `callbackFn` result | Is array? | Action | `result` so far |
|---|---|---|---|---|---|---|
| 1 | 0 | `1` | `[1]` (1 is odd) | yes | unwrap: push `1` | `[1]` |
| 2 | 1 | `2` | `[]` (2 is even) | yes | unwrap: nothing to push (empty array) | `[1]` |
| 3 | 2 | `3` | `[3]` (3 is odd) | yes | unwrap: push `3` | `[1, 3]` |

**Result:** `[1, 3]` — even numbers contributed zero output entries
because their callback result was an empty array, matching Example 3.

## JavaScript Solution

```js
Array.prototype.myFlatMap = function (callbackFn, thisArg) {
  const result = [];
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // Holes in the SOURCE array are skipped before calling back —
    // same rule as map.
    if (!(index in this)) {
      continue;
    }

    const mapped = callbackFn.call(thisArg, this[index], index, this);

    if (Array.isArray(mapped)) {
      // Unwrap exactly ONE level: splice `mapped`'s own present
      // elements directly into the shared result, skipping ITS holes
      // too — but never recurse into elements nested further inside it.
      for (let innerIndex = 0; innerIndex < mapped.length; innerIndex += 1) {
        if (innerIndex in mapped) {
          result.push(mapped[innerIndex]);
        }
      }
    } else {
      result.push(mapped);
    }
  }

  return result;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFlatMap<U>(
    callbackFn: (element: T, index: number, array: T[]) => U | U[],
    thisArg?: unknown,
  ): U[];
}

Array.prototype.myFlatMap = function <T, U>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => U | U[],
  thisArg?: unknown,
): U[] {
  const result: U[] = [];
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    if (!(index in this)) {
      continue;
    }

    const mapped = callbackFn.call(thisArg, this[index], index, this);

    if (Array.isArray(mapped)) {
      for (let innerIndex = 0; innerIndex < mapped.length; innerIndex += 1) {
        if (innerIndex in mapped) {
          result.push(mapped[innerIndex]);
        }
      }
    } else {
      result.push(mapped);
    }
  }

  return result;
};
```

## Time Complexity

O(n + m), where n is the source array's length and m is the total
number of elements across every array `callbackFn` returned — each
source element is visited once, and each returned array's elements are
visited once each during the unwrap.

## Space Complexity

O(m) for the output array, where m is the total number of elements
actually produced (which can be smaller than n, as when returning `[]`
to filter, or larger, as when returning multi-element arrays).

## Common Mistakes

- Literally implementing it as `this.myMap(callbackFn, thisArg).myFlat(1)`
  — correct output, but violates the single-pass requirement and builds
  an unnecessary intermediate array; also conflates two separate
  concerns the question is specifically testing together.
- Flattening more than one level — recursively unwrapping nested arrays
  inside the callback's return value, instead of stopping after exactly
  one level (`flatMap` is not `flat(Infinity)` applied after `map`).
- Forgetting to skip holes in the array `callbackFn` returns — a sparse
  returned array should have its holes dropped during the unwrap, same
  as `flat` does.
- Not skipping holes in the *source* array before invoking `callbackFn`
  — this differs from `find`, which does invoke its callback on holes
  (as `undefined`).
- Missing `thisArg` support by calling `callbackFn(...)` directly instead
  of `callbackFn.call(thisArg, ...)`.

## Interview Follow-up Questions

1. Why is `flatMap(x => x % 2 === 0 ? [] : [x])` a legitimate way to
   express a filter — what makes returning `[]` vs. `[x]` equivalent to
   "drop" vs. "keep"?
2. How would this differ if it needed to support flattening more than
   one level — would you need to bring back the explicit-stack approach
   from `myFlat`?
3. What's the time/space advantage (if any) of the single-pass version
   over calling `map` then `flat` separately, given both are ultimately
   O(n) — is it about performance or about something else (avoiding an
   intermediate array's transient memory)?
4. How would you use `flatMap` to implement a `compactMap` (map, then
   drop `null`/`undefined` results) — what would the callback return in
   each case?
5. What would change if `callbackFn` could return a `Promise` — how
   would you adapt this to support async mapping (and does flattening
   still make sense the same way)?

## Similar Questions

- [Implement a Custom Array.prototype.flat Polyfill (Iterative)](implement-custom-array-prototype-flat-polyfill-iterative.md)
- [Implement a Custom Array.prototype.map Polyfill](implement-custom-array-prototype-map-polyfill.md)
- [Implement a Custom Array.prototype.filter Polyfill](implement-custom-array-prototype-filter-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
