# QJSC008 · Implement Custom Promise race and Promise any

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** Promise coordination, first-to-settle vs. first-to-fulfill semantics, `AggregateError`

## Problem Statement

Implement two related promise-combinator polyfills, `promiseRace(promises)`
and `promiseAny(promises)`, and be able to explain precisely how their
settlement rules differ:

- `promiseRace(promises)` settles as soon as **any** input promise
  settles — whether that first settlement is a fulfillment or a
  rejection, the returned promise mirrors it immediately.
- `promiseAny(promises)` fulfills as soon as **any** input promise
  fulfills, but only rejects if **every** input promise rejects — and
  when it does reject, it rejects with an `AggregateError` wrapping all
  of the individual rejection reasons, not just the last one.

You may not call the real `Promise.race`/`Promise.any` internally.

## Input

`promises`: an iterable (e.g. an array) of `Promise`s and/or plain
(non-promise) values, of length `n >= 0`.

## Output

- `promiseRace`: a single `Promise` that settles (fulfilled or rejected)
  to match whichever input settles first, in real time.
- `promiseAny`: a single `Promise` that fulfills with the value of
  whichever input fulfills first, or rejects with an `AggregateError`
  (containing every rejection reason, in input order) if *all* inputs
  reject. For `n = 0`, rejects immediately with an `AggregateError`
  wrapping an empty array (matches native `Promise.any([])` behavior).

## Constraints

- Both must attach handlers to *all* input promises concurrently (not
  sequentially) — settlement order in real time determines the outcome,
  not input order.
- `promiseRace` never waits past the first settlement, fulfillment or
  rejection alike.
- `promiseAny` must **not** reject just because *one* input rejects — it
  keeps waiting until either a fulfillment arrives, or every single input
  has rejected.
- Non-promise values in the input are treated as already-fulfilled
  (`Promise.resolve(value)`).
- `promiseRace([])` never settles (matches native `Promise.race([])`,
  which returns a promise that stays pending forever — worth calling out
  explicitly since it's a common surprise). `promiseAny([])` rejects
  immediately with an `AggregateError`.

## Examples

| Input | `promiseRace` result | `promiseAny` result |
|---|---|---|
| `[delay(30,'a'), delay(10,'b'), delay(20,'c')]` (all fulfill) | Settles (fulfills) with `'b'` at t=10, the fastest | Fulfills with `'b'` at t=10 — same as race here, since the fastest one happens to fulfill |
| `[reject(10,'err'), delay(30,'ok')]` (first one rejects fast) | Rejects with `'err'` at t=10 — race doesn't care that it's a rejection, only that it's first | Ignores the rejection at t=10 and keeps waiting; fulfills with `'ok'` at t=30 |
| `[reject(10,'e1'), reject(20,'e2')]` (both reject) | Rejects with `'e1'` at t=10 — first to settle, regardless of outcome | Waits for both, then rejects at t=20 with `AggregateError([e1, e2])` — only rejects once *everything* has failed |

## Edge Cases

- All inputs reject → `promiseRace` rejects with the *first* rejection
  reason (by settlement time); `promiseAny` rejects with an
  `AggregateError` wrapping *all* reasons, only after the *last* one
  settles.
- All inputs fulfill → both resolve with the fastest-settling value;
  behave identically in this case.
- `promises = []` → `promiseRace` returns a promise that never settles;
  `promiseAny` rejects immediately with `AggregateError([])`.
- A single input promise → both `promiseRace` and `promiseAny` simply
  mirror that one promise's eventual outcome.
- Mixed plain values and promises → plain values are "already settled"
  (fulfilled) the instant the combinator runs, so they win any race
  against a promise that hasn't resolved yet by the time the combinator
  is called.

## Hints

1. Both combinators start the same way: wrap `promises` in `Promise.resolve()`
   per item (to normalize plain values) and attach a handler to *every*
   item immediately, so they all race concurrently — sequential
   `await`s in a loop would defeat the entire point.
2. For `promiseRace`, the *outer* promise's `resolve`/`reject` can be
   passed directly as both the fulfillment and rejection handler for
   every input — whichever settles first "wins" naturally, since a
   promise's `resolve`/`reject` only has an effect the first time it's
   called.
3. For `promiseAny`, a single rejection must **not** call the outer
   `reject` — instead, collect rejection reasons into a results array
   (indexed by original position, so the `AggregateError` reports them
   in input order) and only call `reject(new AggregateError(errors))`
   once a rejection *counter* reaches `n`, mirroring how `promiseAll`
   tracks a *resolved* counter but inverted to track failures.

## Algorithm

**`promiseRace` — Pattern:** race-to-first-settlement via shared
`resolve`/`reject`.
**Core insight:** because a promise executor's `resolve`/`reject` are
each meaningful only on their *first* call, simply forwarding every
input's fulfillment to the outer `resolve` and every rejection to the
outer `reject` automatically implements "first to settle wins" — no
manual bookkeeping of "have we already settled?" is needed, the promise
machinery itself enforces it.

**`promiseAny` — Pattern:** inverted `promiseAll` — count failures
instead of successes, short-circuit on the first *success* instead of
the first *failure*.
**Core insight:** `promiseAny` is `promiseAll`'s mirror image: where
`promiseAll` resolves on the *last* success and rejects on the *first*
failure, `promiseAny` resolves on the *first* success and rejects on the
*last* failure (i.e. only once every single input has failed). This
means every rejection handler writes its reason into an indexed
`errors` array (so final ordering matches input order, not settlement
order) and increments a `rejectedCount`; only when `rejectedCount === n`
does the outer promise reject, bundling all reasons into an
`AggregateError`.
**Invariant (`promiseAny`):** at any point where `rejectedCount < n`,
there is still at least one input that hasn't yet rejected — so it's
never correct to give up early; the outer promise can only reject once
every single possibility has been exhausted.

## Dry Run

**Input:** `promiseAny([rejectAfter(10, 'e1'), delayFulfill(30, 'ok'), rejectAfter(20, 'e2')])`

| Real time | Event | rejectedCount | errors | Outer promise |
|---|---|---|---|---|
| t=0 | All 3 handlers attached concurrently | 0 | `[empty, empty, empty]` | pending |
| t=10 | index 0 rejects with `'e1'` | 1 | `['e1', empty, empty]` | still pending — only 1 of 3 has failed |
| t=20 | index 2 rejects with `'e2'` | 2 | `['e1', empty, 'e2']` | still pending — index 1 hasn't settled yet |
| t=30 | index 1 **fulfills** with `'ok'` | — | — | **fulfills with `'ok'`** — the first success wins immediately, regardless of the two prior rejections |

**Result:** `promiseAny` fulfills with `'ok'` at t=30. Contrast with
`promiseRace` on the same input, which would have rejected with `'e1'`
at t=10 — the very first settlement, full stop.

## JavaScript Solution

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);

    // Every input races concurrently; resolve/reject only ever "takes"
    // on the first call, so whichever settles first wins automatically.
    items.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);
    const n = items.length;

    if (n === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    const errors = new Array(n);
    let rejectedCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          // First fulfillment wins immediately — no need to wait for
          // the rest, unlike promiseAll's "every one must succeed" rule.
          resolve(value);
        },
        (reason) => {
          errors[index] = reason; // keep input order for the final error
          rejectedCount += 1;

          if (rejectedCount === n) {
            // Only once EVERY input has failed do we give up.
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        },
      );
    });
  });
}
```

## TypeScript Solution

```ts
function promiseRace<T>(promises: Iterable<T | Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const items = Array.from(promises);

    items.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}

function promiseAny<T>(promises: Iterable<T | Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const items = Array.from(promises);
    const n = items.length;

    if (n === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    const errors: unknown[] = new Array(n);
    let rejectedCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          resolve(value);
        },
        (reason: unknown) => {
          errors[index] = reason;
          rejectedCount += 1;

          if (rejectedCount === n) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        },
      );
    });
  });
}
```

## Time Complexity

O(n) for both — each of the n input items gets one `.then`/`.catch`
attachment, which is O(1) work per item; total setup work is linear in
the number of inputs, independent of how long any individual promise
takes to settle.

## Space Complexity

O(n) for `promiseAny` (the `errors` array, sized to hold one reason per
input in the worst case where all reject); O(1) extra space for
`promiseRace` beyond the input itself (no accumulator is needed — it
simply forwards the first settlement).

## Common Mistakes

- Implementing `promiseAny` by copy-pasting `promiseRace` and just
  swapping which callback resolves vs. rejects — this produces
  "reject on the first failure" (which is `promiseAll`'s behavior, not
  `promiseAny`'s); the defining feature of `promiseAny` is that it
  *tolerates* early failures and only gives up once *all* have failed.
- Rejecting `promiseAny` with just the *last* error instead of an
  `AggregateError` wrapping *all* of them — callers need to see every
  failure reason to diagnose why nothing succeeded, not just the one
  that happened to finish last.
- Forgetting the `n === 0` edge case for `promiseAny` — without an
  explicit check, `rejectedCount === n` is trivially true before the
  loop even starts (since both are `0`), but the loop never runs to
  trigger the reject, so the returned promise would hang forever
  instead of correctly rejecting immediately.
- Assuming `promiseRace([])` should reject or behave like
  `promiseAny([])` — it doesn't; native `Promise.race([])` (and this
  polyfill) intentionally stays pending forever, which is a frequently
  mis-remembered detail.
- Not writing rejection reasons into `errors[index]` (using the
  original index) and instead pushing — this would report reasons in
  settlement order rather than input order, and it's a subtle failure
  mode a test wouldn't necessarily catch if timings happen to align with
  input order.

## Interview Follow-up Questions

1. How does `promiseAny`'s "give up only when everything fails" logic
   compare structurally to `promiseAll`'s "give up as soon as anything
   fails" logic — could you write both by parameterizing a single shared
   helper?
2. What real-world use case fits `promiseAny` well (hint: querying
   multiple redundant API mirrors/CDNs and taking whichever responds
   first, tolerating some being down)?
3. What real-world use case fits `promiseRace` well, including its
   common pairing with `delay` to implement a timeout (`promiseRace([actualRequest(), delay(5000).then(() => Promise.reject('timeout'))])`)?
4. How would you implement `Promise.allSettled`, and how does its
   "never rejects, always waits for everyone" contract differ from all
   three of `race`, `any`, and `all`?
5. What happens to the settlement of the *other*, still-pending promises
   once `promiseRace` or `promiseAny` has already settled — do they
   keep running, and could that cause unhandled-rejection warnings?

## Similar Questions

- [Implement Promise.all (Polyfill)](promise-all-polyfill.md)
- [Implement Custom Promise delay or sleep Utility](implement-custom-promise-delay-or-sleep-utility.md)
- Implement `Promise.allSettled` (Polyfill)

---
[← Back to 61-javascript-coding](README.md)
