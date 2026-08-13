# QJS338 · Implement a Custom Array.prototype.findIndex Polyfill

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** predicate callback, short-circuit evaluation, holes treated as `undefined` (no skipping), `thisArg` binding

## Problem Statement

Implement `myFindIndex`, a polyfill for `Array.prototype.findIndex`,
attached as `Array.prototype.myFindIndex`. Given a predicate
`callbackFn(element, index, array)`, it should return the **index** of
the first element for which the callback returns a truthy value, or
`-1` if none does. Like `find` (and unlike
`filter`/`map`/`every`/`some`), it must invoke the callback for every
index including holes, which are passed as `undefined` rather than
skipped.

## Input

- The array `myFindIndex` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a predicate returning a value
  coerced to boolean.
- `thisArg` (optional): the value to use as `this` inside `callbackFn`.

## Output

A number: the index of the first matching element, or `-1` if none
matches.

## Constraints

- `0 <= array.length <= 10^5`
- Must short-circuit: stop invoking `callbackFn` as soon as one call
  returns truthy.
- Must **not** skip holes — `callbackFn` runs for every index, holes
  included, treated as `undefined`.
- Must not call the native `Array.prototype.findIndex` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 3, 4, 5].myFindIndex(x => x % 2 === 0)` | `2` | the first even element is `4`, at index 2 |
| `[1, 3, 5].myFindIndex(x => x % 2 === 0)` | `-1` | no element is even; the callback runs for all 3 present indices before giving up |
| `[1, , 3].myFindIndex(x => x === undefined)` | `1` | the hole at index 1 is passed to the callback as `undefined`, and the predicate matches it — proof the callback actually ran on the hole, unlike `filter`/`every`/`some`, which would have skipped it and returned `-1` here |

## Edge Cases

- No element matches → `-1`, after the callback runs on every present
  *and* hole index.
- Match at index `0` → short-circuits immediately; the callback runs
  exactly once.
- Empty array → `-1` immediately.
- A hole is the actual match → returns that hole's index, since the
  predicate is evaluated against `undefined` just like any other value
  — this is the cleanest way to demonstrate `findIndex` not skipping
  holes, since the return value (an index) unambiguously proves *where*
  the match happened, unlike `find`'s return value which can be
  ambiguous when the match itself is `undefined`.
- `thisArg` supplied → the callback's `this` must resolve to it.

## Hints

1. This is `find`'s twin — same "visit every index, holes included, no
   skipping" rule, just returning the index instead of the element.
2. Do **not** add an `index in this` guard — that's the hole-skip
   behavior from `filter`/`every`/`some`, and `findIndex` deliberately
   does the opposite.
3. Return `index` (not `this[index]`) the moment the predicate returns
   truthy; return `-1` explicitly if the loop finishes without a match.

## Algorithm

**Pattern:** linear scan with an early-exit guard and no hole
filtering — identical in spirit to `find`, differing only in what value
is returned on success.
**Core insight:** because `findIndex` shares `find`'s ES2015-era
"dense, always-defined sequence" semantics, the same reasoning applies:
holes are conceptually `undefined`, not absent, so every index gets a
callback invocation regardless of whether it was ever explicitly
assigned.
**Invariant:** at the start of every iteration, no index before the
current one — hole or not — has satisfied the predicate.

## Dry Run

**Input:** `[1, , 3].myFindIndex(x => x === undefined)`

| Step | index | element (hole reads as `undefined`) | predicate result | Action |
|---|---|---|---|---|
| 1 | 0 | `1` | `false` (`1 !== undefined`) | continue |
| 2 | 1 | `undefined` (this is the hole) | `true` (`undefined === undefined`) | return `1` immediately |

**Result:** `1` — the hole at index 1 was genuinely visited and matched,
matching Example 3; index 2 (`3`) is never checked.

## JavaScript Solution

```js
Array.prototype.myFindIndex = function (callbackFn, thisArg) {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // Same rule as find: holes are NOT skipped, they read as
    // `undefined` and are passed to the callback like any other value.
    const element = this[index];

    if (callbackFn.call(thisArg, element, index, this)) {
      return index;
    }
  }

  return -1; // no element matched
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFindIndex(
    callbackFn: (element: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
  ): number;
}

Array.prototype.myFindIndex = function <T>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => unknown,
  thisArg?: unknown,
): number {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    const element = this[index];

    if (callbackFn.call(thisArg, element, index, this)) {
      return index;
    }
  }

  return -1;
};
```

## Time Complexity

O(n) worst case — no match, or the match is at the last index. Best case
O(1) if the very first index matches.

## Space Complexity

O(1) — only a loop counter and scalar locals.

## Common Mistakes

- Adding a hole-skip guard by habit, copied from `filter`/`every`/`some`
  — the same trap as `find`, and just as common here.
- Returning the element instead of the index — that's `find`'s contract,
  not `findIndex`'s.
- Returning `undefined` instead of `-1` when nothing matches — mixing up
  `find`'s "not found" sentinel (`undefined`) with `findIndex`'s
  (`-1`), which are deliberately different because an index of `0` is a
  valid, truthy-adjacent result that must be distinguishable from "not
  found" (`-1` can never be a valid index).
- Forgetting `callbackFn.call(thisArg, ...)`.

## Interview Follow-up Questions

1. Why does `findIndex` return `-1` for "not found" while `find` returns
   `undefined` — why wouldn't `findIndex` also just return `undefined`?
2. How does this differ from `indexOf`, which also returns an index —
   what's the fundamental difference between searching by predicate
   versus searching by raw value equality?
3. How would `findLastIndex` (ES2023) differ structurally — same hole
   behavior, but what changes about scan direction and the default
   "not found" handling?
4. Given a match at index `0` is falsy as a number but a legitimate
   "found" result, how does `findIndex`'s `-1` sentinel avoid the bugs
   that plague code doing `if (indexOf(...))` instead of `if (indexOf(...)
   !== -1)`?
5. How would you implement `findIndex` by reusing `find`'s exact loop
   structure — what's the minimal diff between the two implementations?

## Similar Questions

- [Implement a Custom Array.prototype.find Polyfill](implement-custom-array-prototype-find-polyfill.md)
- [Implement a Custom Array.prototype.indexOf Polyfill](implement-custom-array-prototype-indexof-polyfill.md)
- [Implement a Custom Array.prototype.findlastindex Polyfill](implement-custom-array-prototype-findlastindex-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
