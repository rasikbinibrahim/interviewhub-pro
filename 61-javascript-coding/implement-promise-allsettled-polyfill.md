# QADVJS072 · Implement Promise.allSettled (Polyfill)

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** Promises, async coordination, order preservation, never short-circuiting on rejection, settlement status objects

## Problem Statement

Implement `promiseAllSettled(promises)`, a polyfill for
`Promise.allSettled`. Given an iterable of promises (or plain values),
return a single promise that resolves — **never rejects** — once every
input has settled, with an array of status objects in original input
order: `{ status: 'fulfilled', value }` for each one that resolved, or
`{ status: 'rejected', reason }` for each one that rejected. Unlike
[`promiseAll`](promise-all-polyfill.md), this never short-circuits — a
rejected input doesn't stop the function from waiting for the rest; it
just changes that one slot's shape in the output.

## Input

`promises`: an iterable (e.g. an array) of `Promise`s and/or plain
(non-promise) values, of length `n >= 0`.

## Output

A single `Promise` that **always resolves** (never rejects) to an array
of length `n`, where `results[i]` is:
- `{ status: 'fulfilled', value: <resolved value of promises[i]> }`, or
- `{ status: 'rejected', reason: <rejection reason of promises[i]> }`

in input order, once every single input promise has settled (whether
successfully or not).

## Constraints

- Must preserve input order in the output array, regardless of
  settlement order.
- Must wait for **every** input to settle before resolving — a
  rejection must never cause early resolution/rejection of the overall
  result, which is the key behavioral difference from `Promise.all`.
- Must handle non-promise values by treating them as already-fulfilled.
- An empty input (`n = 0`) must resolve immediately with `[]`.
- The returned promise must never itself reject, no matter how many (or
  all) of the inputs reject.
- Must not use the real `Promise.allSettled` internally.

## Examples

| Input | Behavior | Why |
|---|---|---|
| `[Promise.resolve(1), Promise.resolve(2)]` | Resolves to `[{status:'fulfilled', value:1}, {status:'fulfilled', value:2}]` | Both inputs succeed, so both entries are fulfilled records |
| `[Promise.resolve(1), Promise.reject('boom'), delay(20, 'c')]` | Resolves (does not reject!) to `[{status:'fulfilled', value:1}, {status:'rejected', reason:'boom'}, {status:'fulfilled', value:'c'}]`, only once ALL THREE have settled, including waiting the full 20ms for the third | The rejection at index 1 does not short-circuit; the function still waits for index 2's delay |
| `[]` | Resolves immediately to `[]` | No inputs to wait on |
| `[1, Promise.reject('x')]` (mix of plain value and rejecting promise) | Resolves to `[{status:'fulfilled', value:1}, {status:'rejected', reason:'x'}]` | Plain values are treated as already-fulfilled; the rejection still produces a normal array entry, not a thrown/rejected outer promise |

## Edge Cases

- Empty array → resolves to `[]` immediately.
- Every single input rejects → still **resolves** (not rejects) with an
  array entirely of `{status: 'rejected', ...}` entries — this is the
  detail most likely to be gotten wrong by someone pattern-matching off
  `Promise.all`'s fail-fast behavior.
- All inputs are plain (non-promise) values → resolves once each has
  been normalized through `Promise.resolve`, all as `fulfilled` entries.
- A single input that's not iterable → should throw synchronously,
  matching `Promise.allSettled`'s native behavior for a non-iterable
  argument.
- A promise that never settles → the overall `promiseAllSettled` result
  also never settles (there's no way around this — "wait for all" means
  waiting for literally all of them).

## Hints

1. Structurally this is extremely close to
   [`promiseAll`](promise-all-polyfill.md) — same indexed-write-into-a-
   pre-sized-array approach, same settled counter — so start there and
   ask: what specifically needs to change about the rejection path?
2. Instead of calling the outer `reject` when an individual promise
   rejects, treat rejection as just another kind of *settlement* —
   write a `{status: 'rejected', reason}` object into that index and
   increment the same "settled count" used for fulfillments, rather
   than short-circuiting.
3. Because both branches (fulfilled and rejected) now do "write to an
   index, then increment a shared counter, then check if we're done,"
   you can attach a single `.then(onFulfilled, onRejected)` — or even
   just one `.finally`-adjacent combined handler — where both paths
   funnel into the same completion check, instead of the two
   structurally different paths `promiseAll` needs (one that resolves,
   one that immediately rejects the outer promise).

## Algorithm

**Pattern:** promise coordination via a counter and indexed writes,
same skeleton as `Promise.all`, but with rejection treated as a normal
settlement outcome rather than an early-exit signal.
**Core insight:** `Promise.allSettled`'s entire behavioral difference
from `Promise.all` boils down to one change: what happens when an
individual promise rejects. Where `Promise.all` calls the outer
`reject` immediately, `allSettled` instead *catches* that rejection,
wraps it in a `{status: 'rejected', reason}` record, writes it to that
promise's own index, and continues counting toward "everything has
settled" exactly the same way a fulfillment does. Because both outcomes
now feed the same completion counter, the outer promise only ever
resolves — once every one of the `n` inputs, successful or not, has
produced a status record at its index.
**Invariant:** at any point after `k` inputs have settled (by either
outcome), `results` holds correctly-shaped status objects at exactly
those `k` indices; the outer promise resolves the instant `k` reaches
`n`, and never rejects regardless of how many of those `k` outcomes were
rejections.

## Dry Run

**Input:** `promiseAllSettled([delay(30, 'a'), Promise.reject('fail-b'),
delay(10, 'c')])`.

| Real time | Event | settledCount | results |
|---|---|---|---|
| t=0 | Attaches handlers to all 3 immediately | 0 | `[empty, empty, empty]` |
| t=0 (next microtask) | index 1 rejects immediately (`'fail-b'`) | 1 | `[empty, {status:'rejected', reason:'fail-b'}, empty]` |
| t=10 | index 2 resolves (`'c'`) | 2 | `[empty, {rejected,'fail-b'}, {status:'fulfilled', value:'c'}]` |
| t=30 | index 0 resolves (`'a'`); `settledCount` reaches `n=3` → outer promise **resolves** | 3 | `[{fulfilled,'a'}, {rejected,'fail-b'}, {fulfilled,'c'}]` |

**Result:** resolves (never rejects) to the full array of status
records, only once every input — including the one that rejected at
t=0 — has settled; the rejection at index 1 did not cut the wait short
for index 0's 30ms delay.

## JavaScript Solution

```js
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    // Note: no `reject` parameter is ever needed — this promise only resolves.
    const items = Array.from(promises);
    const n = items.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results = new Array(n);
    let settledCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = { status: 'fulfilled', value };
          settledCount += 1;
          if (settledCount === n) resolve(results);
        },
        (reason) => {
          // A rejection is just another kind of settlement here —
          // it never calls an outer `reject`.
          results[index] = { status: 'rejected', reason };
          settledCount += 1;
          if (settledCount === n) resolve(results);
        },
      );
    });
  });
}
```

## TypeScript Solution

```ts
type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: unknown };

function promiseAllSettled<T>(
  promises: Iterable<T | Promise<T>>,
): Promise<SettledResult<T>[]> {
  return new Promise<SettledResult<T>[]>((resolve) => {
    const items = Array.from(promises);
    const n = items.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results: SettledResult<T>[] = new Array(n);
    let settledCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = { status: 'fulfilled', value };
          settledCount += 1;
          if (settledCount === n) resolve(results);
        },
        (reason: unknown) => {
          results[index] = { status: 'rejected', reason };
          settledCount += 1;
          if (settledCount === n) resolve(results);
        },
      );
    });
  });
}
```

## Time Complexity

O(n) — each of the n inputs gets one `.then` attachment and one O(1)
indexed write on settlement, regardless of how many succeed vs. fail.

## Space Complexity

O(n) — the `items` and `results` arrays are both proportional to input
size; each `results[i]` is a small fixed-shape status object.

## Common Mistakes

- Copy-pasting the `promiseAll` implementation and forgetting to remove
  the `reject(reason)` call in the rejection branch — this silently
  turns the polyfill back into `Promise.all`'s fail-fast behavior,
  defeating the entire point of `allSettled`.
- Wrapping a rejection's `reason` in the wrong key (`error` instead of
  `reason`, or putting the value under `result` instead of `value`) —
  the exact shape (`{status, value}` / `{status, reason}`) matches the
  real spec and consumers often destructure these keys by name.
- Forgetting that the outer `Promise` constructor here doesn't need a
  `reject` parameter at all — including it and never calling it isn't
  wrong, but omitting it entirely is a good signal that the candidate
  understands `allSettled` structurally never rejects.
- Not accounting for plain (non-promise) values in the input — same
  fix as `Promise.all`: route every item through `Promise.resolve(item)`
  first so both promises and plain values funnel through the same
  `.then` path.
- Missing the empty-array short-circuit — without it, `n = 0` means the
  `forEach` loop never runs, so `settledCount` never reaches `n` via any
  callback, and the returned promise hangs forever instead of resolving
  to `[]`.

## Interview Follow-up Questions

1. How does this compare structurally to your `Promise.all` polyfill —
   what's the single line of behavioral difference, and why does that
   one change ripple through the "does this ever reject" answer?
2. How would you implement `Promise.any` — which settles on the first
   *fulfillment* and only rejects if literally everything rejects (with
   an `AggregateError`)?
3. When would you actually reach for `allSettled` over `all` in a real
   frontend codebase — what's a concrete scenario (e.g. "submit 5
   independent form sections, show which ones failed without blocking
   the ones that succeeded")?
4. How would you add a concurrency limit to this, similar to the async
   task runner — what changes, given rejections no longer stop new work
   from starting?
5. Given the returned array's status objects, how would you write a
   helper that partitions it into `fulfilledValues` and
   `rejectedReasons` arrays for easier consumption?

## Similar Questions

- [Implement Promise.all (Polyfill)](promise-all-polyfill.md)
- Implement `Promise.race` (Polyfill)
- Implement `Promise.any` (Polyfill)
- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md)

---
[← Back to 61-javascript-coding](README.md)
