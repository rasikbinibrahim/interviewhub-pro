# Q505 · Implement Promise.all (Polyfill)

**Difficulty:** Hard
**Companies Asked:** Google, Amazon, Meta, Microsoft, Uber, Adobe, Netflix
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** Promises, async coordination, order preservation under concurrency, fail-fast rejection

## Problem Statement

Implement `promiseAll(promises)`, a polyfill for `Promise.all`. Given an
iterable of promises (or plain values), it should return a single
promise that resolves with an array of all resolved values, in the same
order as the input, once every input has settled successfully. If *any*
input promise rejects, the returned promise must reject immediately with
that same rejection reason, without waiting for the others to settle.

## Input

`promises`: an iterable (e.g. an array) of `Promise`s and/or plain
(non-promise) values, of length `n >= 0`.

## Output

A single `Promise` that:
- resolves to an array of length `n`, where `results[i]` is the resolved
  value of `promises[i]` (or the plain value itself, if `promises[i]`
  wasn't a promise) — in input order, regardless of which promise
  actually settles first, or
- rejects with the reason of whichever input promise rejects first.

## Constraints

- Must preserve input order in the resolved array, even though promises
  can settle in any order.
- Must reject as soon as the *first* input rejects (fail-fast) — must
  not wait for slower promises to finish once a rejection has already
  occurred.
- Must handle non-promise values in the input by treating them as
  already-resolved.
- An empty input (`n = 0`) must resolve immediately with `[]`.
- Must not use the real `Promise.all` internally.

## Examples

| Input | Behavior |
|---|---|
| `[Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]` | Resolves to `[1, 2, 3]` |
| `[delay(30, 'a'), delay(10, 'b'), delay(20, 'c')]` (each resolves after its delay) | Resolves to `['a', 'b', 'c']` — input order, even though `'b'` actually settles first in real time |
| `[Promise.resolve(1), Promise.reject('boom'), delay(1000, 'never seen')]` | Rejects with `'boom'` — does not wait 1000ms for the third promise |
| `[]` | Resolves immediately to `[]` |
| `[1, Promise.resolve(2), 3]` (mix of plain values and promises) | Resolves to `[1, 2, 3]` |

## Edge Cases

- Empty array → resolves to `[]` immediately, without ever entering the
  per-promise resolution logic (no promises to wait on).
- All inputs are plain (non-promise) values → resolves as soon as
  possible, effectively synchronously-ish (still a microtask, since the
  function always returns a `Promise`).
- Multiple promises reject → only the *first* rejection (in settlement
  order, not input order) propagates; later rejections are effectively
  ignored by the caller (though see the follow-up question about
  unhandled rejection warnings).
- A single input that's not iterable → should throw synchronously
  (matches native `Promise.all`'s behavior of throwing a `TypeError`
  before returning a promise at all, for a non-iterable argument).

## Hints

1. You need to track two things across all the promises: how many have
   resolved so far, and where each resolved value goes in the final
   results array — what happens if you don't pre-size the results array
   and instead push in *settlement* order?
2. Because settlement order isn't input order, each promise's `.then`
   callback needs to know its *own* original index (from the iteration)
   so it can write directly to `results[index]` rather than appending —
   a closure over the loop's index variable is exactly what's needed
   here.
3. For fail-fast rejection, the single outer `reject` (from the `new
   Promise((resolve, reject) => ...)` you're implementing `promiseAll`
   with) can be called directly from *any* individual promise's
   `.catch` — whichever one rejects first "wins" naturally, since a
   promise's `resolve`/`reject` can only meaningfully take effect once
   (a promise's state, once settled, is permanent).

## Algorithm

**Pattern:** promise coordination via a counter + indexed writes into a
pre-sized results array.
**Core insight:** `Promise.all`'s two defining behaviors — order
preservation despite concurrent completion, and fail-fast rejection —
both fall out of the same simple structure: attach a `.then`/`.catch` to
*every* input promise up front (so they all race concurrently, not
sequentially), have each success handler write to its own fixed index in
a shared results array (not push, which would reorder), and have every
failure handler call the same outer `reject` (whichever fires first
determines the outcome, since a promise settles exactly once). The outer
promise only resolves once a running "resolved count" reaches `n`,
meaning every single input has succeeded.
**Invariant:** at any point after `k` promises have resolved, `results`
holds the correct values at indices `0..n-1` for exactly those `k`
promises (with unresolved slots still empty) — resolution order never
corrupts final positions because each write targets its own fixed
index.

## Dry Run

**Input:** `promiseAll([delay(30, 'a'), delay(10, 'b'), delay(20, 'c')])`
— each `delay(ms, value)` resolves to `value` after `ms` milliseconds.

| Real time | Event | resolvedCount | results |
|---|---|---|---|
| t=0 | `promiseAll` starts; attaches `.then` to all 3 promises immediately (they all start "racing" concurrently) | 0 | `[empty, empty, empty]` |
| t=10 | `delay(10, 'b')` (index 1) resolves first | 1 | `[empty, 'b', empty]` |
| t=20 | `delay(20, 'c')` (index 2) resolves next | 2 | `[empty, 'b', 'c']` |
| t=30 | `delay(30, 'a')` (index 0) resolves last; `resolvedCount` reaches `n = 3` → outer promise resolves | 3 | `['a', 'b', 'c']` |

**Result:** resolves to `['a', 'b', 'c']` — input order, even though the
actual settlement order in real time was `'b'`, then `'c'`, then `'a'`.

## JavaScript Solution

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises); // materialize the iterable once
    const n = items.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results = new Array(n);
    let resolvedCount = 0;

    items.forEach((item, index) => {
      // Promise.resolve() normalizes plain values into already-resolved
      // promises, so both cases go through the same .then path.
      Promise.resolve(item).then(
        (value) => {
          results[index] = value; // write to the ORIGINAL index, not push
          resolvedCount += 1;

          if (resolvedCount === n) {
            resolve(results); // every input has now succeeded
          }
        },
        (reason) => {
          // First rejection wins — reject() on an already-settled
          // promise is a silent no-op, so later rejections can't
          // override this one.
          reject(reason);
        },
      );
    });
  });
}
```

## TypeScript Solution

```ts
function promiseAll<T>(promises: Iterable<T | Promise<T>>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const items = Array.from(promises);
    const n = items.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results: T[] = new Array(n);
    let resolvedCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          resolvedCount += 1;

          if (resolvedCount === n) {
            resolve(results);
          }
        },
        (reason: unknown) => {
          reject(reason);
        },
      );
    });
  });
}
```

## Time Complexity

O(n) — each of the n input items gets one `.then`/`.catch` attachment
and, on settlement, one O(1) array write; total work is linear in the
number of inputs, independent of how long any individual promise takes
to settle.

## Space Complexity

O(n) — the `items` array (materialized from the iterable) and the
`results` array are both proportional to the input size.

## Common Mistakes

- Pushing resolved values (`results.push(value)`) instead of writing to
  `results[index]` — this produces results in *settlement* order, not
  input order, which is wrong the moment any promise resolves out of
  order (as in the dry run above).
- Awaiting/attaching `.then` to promises sequentially in a loop (`for`
  with `await` inside) instead of attaching to all of them up front —
  this serializes what should be concurrent work, turning an O(max
  delay) operation into an O(sum of delays) one.
- Not pre-sizing/pre-declaring the results array and instead relying on
  sparse assignment without accounting for it — functionally similar to
  the push mistake, but worth calling out separately since `results[5] =
  x` on a shorter array silently creates holes if earlier indices never
  get filled (which would only happen if a promise never settles, itself
  worth discussing).
- Forgetting to handle plain (non-promise) values in the input — calling
  `.then` directly on a non-promise throws; wrapping every item in
  `Promise.resolve(item)` first is what makes both cases uniform.
- Not short-circuiting on the empty-array case — without it, `n = 0`
  means `resolvedCount === n` is trivially true from the start but the
  loop never runs to trigger the resolve check, so the returned promise
  would hang forever instead of resolving to `[]`.

## Interview Follow-up Questions

1. How would you implement `Promise.allSettled` instead — what changes
   about how rejections are handled?
2. How would you implement `Promise.race`? How does its "first to settle
   wins, whether resolved or rejected" behavior differ structurally from
   `Promise.all`'s fail-fast-but-succeed-together behavior?
3. How would you implement `Promise.any`?
4. How would you add a concurrency limit (e.g. "run at most 3 promises
   at a time") to this — what does that change about when each promise
   in the input actually *starts*, versus this implementation where
   they're all already-created/started promises?
5. What happens to the rejections of the *other* promises that were
   still pending when the fail-fast rejection occurred — do they trigger
   unhandled promise rejection warnings, and how would you suppress
   those if needed?

## Similar Questions

- Implement `Promise.allSettled` (Polyfill)
- Implement `Promise.race` (Polyfill)
- Implement `Promise.any` (Polyfill)
- Implement a Promise pool / concurrency limiter

---
[← Back to 61-javascript-coding](README.md)
