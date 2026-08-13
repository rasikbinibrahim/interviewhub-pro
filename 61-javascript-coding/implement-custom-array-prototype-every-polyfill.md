# QJSC053 · Implement a Custom Array.prototype.every Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** callback iteration, short-circuit evaluation, sparse-array hole skipping, `thisArg` binding

## Problem Statement

Implement `myEvery`, a polyfill for `Array.prototype.every`, attached as
`Array.prototype.myEvery`. Given a callback `callbackFn(element, index,
array)`, it should return `true` only if `callbackFn` returns a truthy
value for **every** element in the array, and `false` the moment it
returns a falsy value for any element — stopping immediately rather than
continuing to check what's left. It must not call the native `every`
internally, and it must accept an optional second argument `thisArg`
that becomes `this` inside `callbackFn`.

## Input

- The array `myEvery` is called on (possibly sparse, i.e. containing
  holes).
- `callbackFn(element, index, array)`: a function returning a value
  coerced to boolean.
- `thisArg` (optional): the value to use as `this` when invoking
  `callbackFn`.

## Output

A boolean: `true` if every present element passed, `false` otherwise.

## Constraints

- `0 <= array.length <= 10^5`
- Must short-circuit: stop invoking `callbackFn` as soon as one call
  returns falsy.
- Must skip holes in sparse arrays — `callbackFn` is never invoked for
  an index that doesn't actually exist on the array.
- Must not call the native `Array.prototype.every` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[2, 4, 6].myEvery(x => x % 2 === 0)` | `true` | every element is even; the callback runs for all 3 indices |
| `[2, 3, 6].myEvery(x => x % 2 === 0)` | `false` | index 1 (`3`) fails, so `myEvery` returns immediately — index 2 is never checked |
| `[1, , 3].myEvery(x => x > 0)` | `true` | the hole at index 1 is skipped entirely (never passed to the callback as `undefined`); only indices 0 and 2 run, and both pass |

## Edge Cases

- Empty array → `true` (vacuously true — no element exists to fail a
  check that's never run), matching native behavior.
- All elements pass → the callback runs for every index; `true` is only
  returned after the loop fully completes.
- The very first element fails → short-circuits immediately; the
  callback is invoked exactly once total.
- Sparse array with holes → holes are skipped, not treated as
  `undefined` (contrast with `find`/`findIndex`, which do **not** skip
  holes — see [find](implement-custom-array-prototype-find-polyfill.md)).
- `thisArg` supplied → the callback's `this` must resolve to `thisArg`
  (e.g. a threshold read via `this.min`), not `undefined` or the global
  object.

## Hints

1. Loop by numeric index from `0` to `length - 1`, but check whether
   that index actually exists on the array *before* calling the
   callback — that check is what makes a hole different from a real
   element whose value happens to be `undefined`.
2. The instant `callbackFn` returns anything falsy, `myEvery` should
   return `false` right away — don't finish the loop. That early return
   is the entire "short circuit."
3. Call `callbackFn.call(thisArg, element, index, array)` instead of
   `callbackFn(element, index, array)` directly, so an optional
   `thisArg` is actually honored.

## Algorithm

**Pattern:** linear scan with an early-exit guard and a hole-existence
check.
**Core insight:** `every`'s two defining behaviors — short-circuiting
and hole-skipping — are both just guard conditions inside an otherwise
plain `for` loop: `index in this` decides whether to run the callback at
all (skipping holes), and `if (!passed) return false` decides whether to
keep looping (short-circuiting). Neither needs any extra state beyond
the loop index itself.
**Invariant:** at the start of every iteration, every previously-visited
present element has already passed the callback — the moment that stops
being true, the function returns immediately without visiting any more
indices.

## Dry Run

**Input:** `[2, 3, 6].myEvery(x => x % 2 === 0)`

| Step | index | `index in this`? | element | callback result | Action |
|---|---|---|---|---|---|
| 1 | 0 | yes | `2` | `true` (2 % 2 === 0) | continue looping |
| 2 | 1 | yes | `3` | `false` (3 % 2 !== 0) | return `false` immediately |
| — | 2 | never reached | — | — | short-circuited — index 2 is never checked |

**Result:** `false`, and the callback was invoked exactly twice, not
three times — proof the short-circuit actually skipped work, not just
that the final boolean happens to be correct.

## JavaScript Solution

```js
Array.prototype.myEvery = function (callbackFn, thisArg) {
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // Sparse arrays: a "hole" has no own property at this index at
    // all — native `every` never invokes the callback for it, so we
    // must skip it too rather than passing `undefined` in its place.
    if (!(index in this)) {
      continue;
    }

    const passed = callbackFn.call(thisArg, this[index], index, this);
    if (!passed) {
      return false; // one failure is enough to know the final answer
    }
  }

  return true; // every present element passed (or there were none at all)
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myEvery(
    callbackFn: (element: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
  ): boolean;
}

Array.prototype.myEvery = function <T>(
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
    if (!passed) {
      return false;
    }
  }

  return true;
};
```

## Time Complexity

O(n) worst case — every element passes, or the only failure is at the
last present index, so the loop runs to completion. Best case O(1) when
the very first element fails.

## Space Complexity

O(1) — no auxiliary structure grows with input size; only a loop
counter and a couple of scalar locals.

## Common Mistakes

- Using `this[index] === undefined` to detect holes instead of `index
  in this` — this incorrectly treats a real element whose value is
  `undefined` (e.g. `[undefined, 2, 3]`) as a hole and skips it, when it
  should actually be passed to the callback.
- Not short-circuiting — looping through the whole array and only
  checking an accumulated boolean at the end still returns the correct
  answer, but calls the callback on elements the native version never
  touches, which is observable the moment the callback has a side
  effect (e.g. logging, mutating a counter).
- Forgetting `callbackFn.call(thisArg, ...)` and invoking
  `callbackFn(...)` directly — silently breaks any caller relying on
  `thisArg`.
- Caching `this.length` once at the top versus re-reading it every
  iteration — the spec re-reads length-adjacent behavior more subtly
  than this simplification captures; caching once is the expected,
  acceptable interview-level answer, but worth naming as a deliberate
  simplification if asked.

## Interview Follow-up Questions

1. How does `myEvery`'s hole-skipping differ from `find`/`findIndex`,
   which invoke the callback on every index including holes, treating
   them as `undefined`?
2. How would `mySome` relate to `myEvery` through De Morgan's laws —
   could you implement one in terms of the other?
3. What does `[].every(x => x > 0)` return on a genuinely empty array,
   and why is that the mathematically correct answer (vacuous truth)?
4. How would you rewrite this recursively instead of iteratively, and
   what's the practical downside for very large arrays (call stack
   depth)?
5. What would happen if `callbackFn` pushed new elements onto the array
   while `myEvery` was mid-iteration?

## Similar Questions

- [Implement a Custom Array.prototype.some Polyfill](implement-custom-array-prototype-some-polyfill.md)
- [Implement a Custom Array.prototype.find Polyfill](implement-custom-array-prototype-find-polyfill.md)
- [Implement a Custom Array.prototype.filter Polyfill](implement-custom-array-prototype-filter-polyfill.md)
- [Implement a Custom Array.prototype.reduce Polyfill](implement-custom-array-prototype-reduce-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
