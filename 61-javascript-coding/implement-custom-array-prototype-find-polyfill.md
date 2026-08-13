# QJS337 · Implement a Custom Array.prototype.find Polyfill

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** predicate callback, short-circuit evaluation, holes treated as `undefined` (no skipping), `thisArg` binding

## Problem Statement

Implement `myFind`, a polyfill for `Array.prototype.find`, attached as
`Array.prototype.myFind`. Given a predicate `callbackFn(element, index,
array)`, it should return the **first element** for which the callback
returns a truthy value, or `undefined` if none does. Critically — unlike
`filter`/`map`/`every`/`some` — `find` must invoke the callback for
**every** index from `0` to `length - 1`, including holes in sparse
arrays, which are read out and passed to the callback as `undefined`
rather than being skipped.

## Input

- The array `myFind` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a predicate returning a value
  coerced to boolean.
- `thisArg` (optional): the value to use as `this` inside `callbackFn`.

## Output

The first matching element, or `undefined` if no element matches.

## Constraints

- `0 <= array.length <= 10^5`
- Must short-circuit: stop invoking `callbackFn` as soon as one call
  returns truthy.
- Must **not** skip holes — `callbackFn` runs for every index,
  including holes, which are treated as `undefined`.
- Must not call the native `Array.prototype.find` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 3, 4, 5].myFind(x => x % 2 === 0)` | `4` | the first even element, found at index 2 |
| `[1, 3, 5].myFind(x => x % 2 === 0)` | `undefined` | no element is even; the callback runs for all 3 present indices before giving up |
| `const visited = []; [1, , 3].myFind((x, i) => { visited.push(i); return false; }); // visited` | `[0, 1, 2]` | the callback runs for **every** index, including the hole at index 1 — `visited` has no gap, proving the hole was actually visited (contrast with `filter`/`every`/`some`, where `visited` would end up `[0, 2]`) |

## Edge Cases

- No element matches → `undefined`, after the callback runs on every
  present *and* hole index.
- Match at index `0` → short-circuits immediately; the callback runs
  exactly once.
- Empty array → `undefined` immediately, loop body never runs.
- A hole in the middle of the array → the callback still runs for that
  index, receiving `undefined` as the element — if the predicate is
  something like `x => x === undefined`, `find` can genuinely "find" a
  hole and return `undefined` as the (correctly found) result, which
  looks identical to the not-found case unless you also check whether a
  match actually occurred.
- `thisArg` supplied → the callback's `this` must resolve to it.

## Hints

1. Do **not** add the `index in this` hole-guard you'd use for
   `filter`/`every`/`some` — `find` is the one method in this family
   that deliberately visits every index, holes included.
2. Reading `this[index]` for a hole naturally produces `undefined` in
   JavaScript already — you don't need any special-casing to make holes
   "look like" `undefined`, that's just what indexing into a hole does.
3. Return the element itself (not the index — that's `findIndex`'s job)
   the moment the predicate returns truthy; after the loop completes
   with no match, explicitly return `undefined`.

## Algorithm

**Pattern:** linear scan with an early-exit guard and *no* hole
filtering.
**Core insight:** `find` was specified (ES2015) with different
semantics than the older, hole-aware iteration methods
(`map`/`filter`/`forEach`, all ES5) — it treats the array as a dense,
`length`-sized sequence where every index conceptually holds a value
(with holes simply reading as `undefined`), rather than skipping indices
that were never assigned. This is a deliberate spec design choice, not
an oversight, and it's exactly what this question is testing awareness
of.
**Invariant:** at the start of every iteration, no index before the
current one — hole or not — has satisfied the predicate; the moment one
does, the function returns immediately.

## Dry Run

**Input:** `[1, 3, 4, 5].myFind(x => x % 2 === 0)`

| Step | index | element | predicate result | Action |
|---|---|---|---|---|
| 1 | 0 | `1` | `false` (1 is odd) | continue |
| 2 | 1 | `3` | `false` (3 is odd) | continue |
| 3 | 2 | `4` | `true` (4 is even) | return `4` immediately |

**Result:** `4` — index 3 (`5`) is never checked, matching Example 1.

## JavaScript Solution

```js
Array.prototype.myFind = function (callbackFn, thisArg) {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // NOTE: unlike filter/map/every/some, find does NOT skip holes —
    // reading a hole here naturally yields `undefined`, and it's still
    // passed to the callback like any other value.
    const element = this[index];

    if (callbackFn.call(thisArg, element, index, this)) {
      return element;
    }
  }

  return undefined; // explicit, for clarity — no element matched
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFind(
    callbackFn: (element: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
  ): T | undefined;
}

Array.prototype.myFind = function <T>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => unknown,
  thisArg?: unknown,
): T | undefined {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    const element = this[index];

    if (callbackFn.call(thisArg, element, index, this)) {
      return element;
    }
  }

  return undefined;
};
```

## Time Complexity

O(n) worst case — no match, or the match is at the last index. Best case
O(1) if the very first index matches.

## Space Complexity

O(1) — only a loop counter and scalar locals, independent of array
size.

## Common Mistakes

- Adding a hole-skip guard (`if (!(index in this)) continue;`) out of
  habit, copied from `filter`/`every`/`some` — this is the single most
  common mistake on this exact question, since `find` is the one method
  in the family that deliberately does the opposite.
- Returning the index instead of the element — that's `findIndex`'s
  contract, not `find`'s.
- Not distinguishing "found a genuinely `undefined`-valued match" from
  "found nothing" when reasoning about return values — both look like
  `undefined` from the caller's side, which is a real, if rare,
  ambiguity worth being able to explain.
- Forgetting `callbackFn.call(thisArg, ...)`.

## Interview Follow-up Questions

1. Why does `find` invoke its callback on every index including holes,
   while `filter`/`map`/`every`/`some` skip them — what does that say
   about when each method was added to the spec (ES5 vs. ES2015)?
2. How would you implement `findIndex` by reusing almost all of this
   logic, just changing what gets returned?
3. How would `findLast`/`findLastIndex` (ES2023) differ structurally
   from this — same hole behavior, but what changes about the scan
   direction?
4. How can a caller distinguish "found `undefined`" from "found nothing"
   when using `find`, given both produce the same return value?
5. Why can't `find` short-circuit the same way `filter` can't — wait,
   actually it *can* short-circuit; what's the key difference between
   `find` and `filter` that makes one able to short-circuit and the
   other not?

## Similar Questions

- [Implement a Custom Array.prototype.findIndex Polyfill](implement-custom-array-prototype-findindex-polyfill.md)
- [Implement a Custom Array.prototype.some Polyfill](implement-custom-array-prototype-some-polyfill.md)
- [Implement a Custom Array.prototype.filter Polyfill](implement-custom-array-prototype-filter-polyfill.md)
- [Implement a Custom Array.prototype.findLastIndex Polyfill](implement-custom-array-prototype-findlastindex-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
