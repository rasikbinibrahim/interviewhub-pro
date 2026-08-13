# QADVJS068 · Implement an Advanced Debounce with Cancel and Flush

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Adobe, Atlassian
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Async Control Flow / Higher-Order Functions
**Concepts:** closures, `setTimeout`/`clearTimeout`, method attachment on a returned function, pending-call tracking

## Problem Statement

This is a harder variant of [Implement Debounce](debounce.md) — read
that page first for the baseline `debounce(fn, delayMs)` behavior; this
page only covers what's *added* on top of it, not the core debounce
mechanics again. Extend `debounce(fn, delayMs)` so the returned
debounced function also exposes two extra methods, Lodash-style:

- `debounced.cancel()` — cancels any currently pending scheduled call,
  with no side effect (`fn` never runs for that pending call).
- `debounced.flush()` — if a call is currently pending, invoke `fn`
  **immediately**, right now, with the most recently provided arguments
  and `this`, and cancel the timer (so it doesn't *also* fire later on
  its own). If nothing is pending, `flush()` is a no-op.

## Input

Same as basic debounce (`fn`, `delayMs`), plus calls to the returned
function's `.cancel()` and `.flush()` methods, which take no arguments.

## Output

Same callable debounced function as the baseline, but the function
object itself now also has `.cancel` and `.flush` methods attached.

## Constraints

- `.cancel()` must clear the pending timer and must not call `fn`.
- `.flush()` must call `fn` synchronously, right when `.flush()` is
  invoked, using the arguments/`this` from the most recent debounced
  call — and must also clear the timer so `fn` doesn't run a second
  time later.
- Calling `.cancel()` or `.flush()` when nothing is pending must be a
  safe no-op (no throw, no calling `fn`).
- After `.flush()` or `.cancel()`, the debounced function must still be
  callable again normally afterward (it isn't "used up").
- Same `this`/argument-preservation requirements as the baseline
  debounce.

## Examples

| Scenario | Behavior | Why |
|---|---|---|
| `debounced('a')` called, then `.cancel()` called before `delayMs` elapses | `fn` never runs at all for that call | `.cancel()` clears the pending timer with no side effect |
| `debounced('a')` called, then `.flush()` called before `delayMs` elapses | `fn('a')` runs immediately, synchronously, at the moment `.flush()` is called — not later | `.flush()` forces immediate execution instead of waiting out the delay |
| `.flush()` called when nothing is pending (no call has been made, or the pending call already fired) | No-op — `fn` does not run | Nothing was scheduled to flush |
| `debounced('a')`, then `.flush()`, then `debounced('b')` | `fn('a')` runs immediately via flush; later, `fn('b')` runs normally after `delayMs` | Flushing doesn't "break" the debounced function for subsequent calls |

## Edge Cases

- `.cancel()` called when nothing is pending → no-op, no throw.
- `.flush()` called twice in a row with nothing newly scheduled between
  them → `fn` only runs once (the first `.flush()`); the second is a
  no-op since nothing is pending anymore.
- `.flush()` must use the args/`this` from the call that's *currently*
  pending at the moment `.flush()` runs, not some earlier superseded
  call (same "most recent call wins" rule as the base debounce already
  enforces for its normal timer-driven firing).
- A normal debounced call scheduled, its timer *naturally* fires (not
  via flush/cancel) → afterward, `.flush()`/`.cancel()` are safe no-ops,
  since nothing is pending anymore by that point.

## Hints

1. `.cancel` and `.flush` both need access to the *same* closure state
   the debounced function itself uses (`timerId`, plus now also the
   last-seen `args`/`this`) — so they must be defined inside the same
   closure/outer function as `debounced`, not as unrelated standalone
   functions, and then attached as properties on the returned function
   object before it's returned.
2. To make `.flush()` work, the debounced wrapper needs to remember not
   just *that* a call is pending, but the actual arguments/`this` of
   the most recent call — store them in outer-scoped variables
   (`lastArgs`, `lastThis`) every time the debounced function is
   invoked, the same moment it reschedules the timer.
3. `.flush()`'s job reduces to: "do exactly what the timer's callback
   would have done, right now, then clear the timer so it can't also
   fire later" — so it's cleanest to extract the timer's actual
   `() => fn.apply(...)` logic into a small named function that both
   the `setTimeout` callback *and* `.flush()` can call directly.

## Algorithm

**Pattern:** same closure-based debounce core as the baseline, extended
with two extra closure-scoped variables (the last call's `args`/`this`)
and a shared "run the pending call now" helper that both the natural
timer path and `.flush()` invoke.
**Core insight:** `.cancel` and `.flush` aren't new debounce logic —
they're just two different ways of *terminating* whatever's currently
pending: `.cancel` terminates it by discarding it (`clearTimeout`,
nothing runs), `.flush` terminates it by running it early
(`clearTimeout`, then run `fn` right now with the remembered args).
Because both need the same "currently pending call's data," the
debounced function must persist `lastArgs`/`lastThis` in the shared
closure on every invocation — not just the `timerId` the baseline
already tracks.
**Invariant:** at any moment, `timerId` is defined if and only if a
call is currently pending; `.flush()` and `.cancel()` are both correct
no-ops whenever `timerId` is `undefined`, and both leave `timerId`
`undefined` afterward.

## Dry Run

**Input:** `const debounced = debounce(fn, 300)`; `debounced('x')` at
t=0; `debounced.flush()` called at t=100.

| Time | Event | timerId | lastArgs | Action |
|---|---|---|---|---|
| t=0 | `debounced('x')` | `undefined → timer A` | `['x']` | Schedules `fn('x')` for t=300; records `lastArgs = ['x']` |
| t=100 | `debounced.flush()` | timer A present | `['x']` | `clearTimeout(timer A)`; immediately calls `fn('x')`; clears `timerId` to `undefined` |
| t=300 | (timer A would have fired, but was cleared) | `undefined` | — | Nothing happens — already flushed at t=100 |

**Result:** `fn('x')` runs exactly once, at t=100 (via flush), not at
t=300. The timer that would have fired at t=300 never runs, since
`.flush()` cleared it.

## JavaScript Solution

```js
function debounce(fn, delayMs) {
  let timerId;   // holds the pending timer, if any
  let lastArgs;  // most recent call's arguments, needed for flush()
  let lastThis;  // most recent call's `this`, needed for flush()

  function runPendingCall() {
    clearTimeout(timerId);
    timerId = undefined;
    fn.apply(lastThis, lastArgs);
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    clearTimeout(timerId);
    timerId = setTimeout(runPendingCall, delayMs);
  }

  debounced.cancel = function cancel() {
    clearTimeout(timerId);
    timerId = undefined; // discard — runPendingCall/fn is never called
  };

  debounced.flush = function flush() {
    if (timerId === undefined) return; // nothing pending — no-op
    runPendingCall(); // runs fn right now and clears the timer
  };

  return debounced;
}
```

## TypeScript Solution

```ts
interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void;
  cancel(): void;
  flush(): void;
}

function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delayMs: number,
): DebouncedFunction<Args> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Args | undefined;
  let lastThis: unknown;

  function runPendingCall(): void {
    clearTimeout(timerId);
    timerId = undefined;
    fn.apply(lastThis, lastArgs as Args);
  }

  function debounced(this: unknown, ...args: Args): void {
    lastArgs = args;
    lastThis = this;

    clearTimeout(timerId);
    timerId = setTimeout(runPendingCall, delayMs);
  }

  debounced.cancel = function cancel(): void {
    clearTimeout(timerId);
    timerId = undefined;
  };

  debounced.flush = function flush(): void {
    if (timerId === undefined) return;
    runPendingCall();
  };

  return debounced as DebouncedFunction<Args>;
}
```

## Time Complexity

O(1) for every operation — `debounced()`, `.cancel()`, and `.flush()`
each do a fixed, constant amount of work (a `clearTimeout`/`setTimeout`
pair or a direct `fn.apply`), independent of call history.

## Space Complexity

O(1) — a fixed handful of closure variables (`timerId`, `lastArgs`,
`lastThis`), regardless of how many times the debounced function has
been called, flushed, or cancelled.

## Common Mistakes

- Implementing `.flush()` by just calling `debounced(...lastArgs)`
  again instead of calling `fn` directly — this re-enters the debounce
  logic and schedules a *new* timer instead of running immediately,
  completely defeating the point of flush.
- Forgetting to clear `timerId` after `.flush()` runs `fn` — leaves a
  stale timer reference that, depending on implementation, could cause
  `fn` to run a *second* time when the original timer eventually fires,
  or breaks the "nothing pending" check for a subsequent `.cancel()`/
  `.flush()` call.
- Storing `lastArgs`/`lastThis` update logic separately from where the
  timer gets rescheduled — if they're not updated on *every* call in
  lockstep with the timer reset, `.flush()` can end up running `fn`
  with stale arguments from an earlier, already-superseded call.
- Not guarding `.flush()`/`.cancel()` for the "nothing pending" case —
  calling `fn` from `.flush()` even when no call was ever made (or the
  timer already fired naturally) violates the "flush is a no-op if
  nothing is pending" requirement.
- Attaching `.cancel`/`.flush` to the wrong object (e.g. to `fn` itself
  instead of to the returned `debounced` wrapper) — callers expect
  `debounced.cancel()`, not `fn.cancel()`.

## Interview Follow-up Questions

1. How would you add a `leading` option (fire on the first call
   immediately, in addition to or instead of the trailing call), and
   how would `.flush()`/`.cancel()` need to interact with that?
2. How would you add a `.pending()` method that lets a caller check
   whether a call is currently scheduled, without side effects?
3. What's the React-hook equivalent of this problem — how would
   `.cancel()` fit naturally into a `useEffect` cleanup function for a
   component-scoped debounced callback?
4. How does this compare to Lodash's actual `_.debounce` implementation
   — what additional options does Lodash support (`maxWait`, for
   instance) that this simplified version doesn't?
5. Why does `.flush()` need to *clear* the timer in addition to running
   `fn`, rather than just running `fn` and leaving the timer alone?

## Similar Questions

- [Implement Debounce](debounce.md) — the baseline this extends
- [Implement an Advanced Throttle with Leading/Trailing Control](implement-advanced-throttle-with-leading-trailing.md)
- Implement `useDebounce` (React hook version — see
  [63-react-coding/use-debounce-hook.md](../63-react-coding/use-debounce-hook.md))

---
[← Back to 61-javascript-coding](README.md)
