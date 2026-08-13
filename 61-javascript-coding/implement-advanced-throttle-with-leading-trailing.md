# QADVJS069 · Implement an Advanced Throttle with Leading/Trailing Control

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Uber, Adobe
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Async Control Flow / Higher-Order Functions
**Concepts:** closures, `setTimeout`, timestamps, configurable edge-firing policy, combinatorial edge-case handling

## Problem Statement

This is a harder variant of [Implement Throttle](throttle.md) — read
that page first; its baseline implementation always fires on both the
leading and trailing edge, which is only *one* of four possible
policies. Extend `throttle(fn, intervalMs, options)` to accept `options
= { leading: boolean, trailing: boolean }` (default `{ leading: true,
trailing: true }`, matching the baseline) that independently control
whether `fn` fires on the **leading edge** (immediately, the moment a
throttle window opens) and/or the **trailing edge** (at the end of the
window, with the most recent call's arguments, if any calls arrived
during the window after the leading call). All four combinations must
behave correctly — including `{ leading: false, trailing: false }`,
which is a degenerate but valid case (see Edge Cases).

## Input

- `fn`, `intervalMs`: same as the baseline throttle.
- `options: { leading?: boolean, trailing?: boolean }` — both default
  to `true` if omitted, matching the baseline's existing behavior when
  called with no options at all.

## Output

Same shape as the baseline: a new function with `fn`'s call signature,
whose firing behavior now depends on `options`.

## Constraints

- `{ leading: true, trailing: true }` (default) → identical behavior to
  the baseline throttle.
- `{ leading: false, trailing: true }` → the *first* call in a burst
  does **not** fire immediately; instead, it only sets up the trailing
  timer, and `fn` fires once at the end of the window (unless no
  further distinguishing call arrives — see edge cases for the single-
  call case, which is where this option most visibly changes behavior).
- `{ leading: true, trailing: false }` → the first call in a burst
  fires immediately; any subsequent calls within the same window are
  simply dropped — no trailing call ever fires for that window.
- `{ leading: false, trailing: false }` → `fn` never fires (degenerate,
  but must not throw or hang — just does nothing, ever).
- Must preserve `this` and forward the correct arguments (leading
  call uses that call's own args; trailing call uses the most recent
  call's args before the window closed).

## Examples

| Options | Calls | Behavior | Why |
|---|---|---|---|
| `{ leading: true, trailing: true }` (default) | Same as baseline throttle's dry run | Identical to [throttle.md](throttle.md) | No behavior change from the baseline when using defaults |
| `{ leading: false, trailing: true }` | Single call at t=0, `intervalMs=200`, no follow-up calls | `fn` fires once, at t=200 (not immediately at t=0) | With `leading: false`, even a lone call waits for the trailing edge, since there's no leading fire to skip to |
| `{ leading: true, trailing: false }` | Calls at t=0, t=50, t=150; `intervalMs=200` | `fn` fires once, at t=0 only, with the t=0 call's args | Leading fire happens immediately; the t=50/t=150 calls fall inside the same window and are simply dropped, since trailing is disabled |
| `{ leading: false, trailing: false }` | Any calls at all | `fn` never fires | Both edges disabled — a valid, if unusual, "fully suppressed" configuration |

## Edge Cases

- `{ leading: false, trailing: true }` with only a **single** call and
  no follow-up → still must fire once, at the trailing edge — this is
  the trickiest edge case, since a naive implementation that only
  schedules a trailing call "if more calls arrive" would incorrectly
  never fire at all for a single call.
- `{ leading: true, trailing: false }` with only a single call → fires
  once, immediately, and that's it — no trailing timer should even be
  scheduled, since trailing is disabled.
- `{ leading: false, trailing: false }` → must not throw, must not
  schedule any timer that ever calls `fn` — a true no-op configuration.
- Calls arriving in rapid succession across *multiple* consecutive
  windows (not just one) → each window independently respects the same
  leading/trailing policy; the policy doesn't "carry over" state
  between windows incorrectly (e.g. a suppressed leading call in window
  1 must not suppress window 2's leading call too).
- Both `leading` and `trailing` explicitly set to `true` but `fn` is
  only called once, right at a window boundary → must not double-fire
  (same boundary care as the baseline).

## Hints

1. Keep the same two-piece state as the baseline (`lastRan` timestamp,
   `trailingTimerId` + `trailingArgs`), but gate each *effect*
   (immediate call vs. trailing schedule) behind the corresponding
   option flag — the overall timestamp/remaining-time logic barely
   changes; what changes is whether each branch actually calls `fn` or
   just updates bookkeeping.
2. The trickiest interaction is `{ leading: false, trailing: true }`
   with no `lastRan` yet (the very first call ever) — since there's no
   "leading fire" to anchor `lastRan`, you still need to schedule a
   trailing call for `intervalMs` from now, and that trailing call
   still needs to actually run even if it turns out to be the *only*
   call in that window.
3. When `trailing` is `false`, don't schedule a trailing timer at all
   — a call that arrives mid-window when `trailing: false` should just
   update nothing (or only update timing bookkeeping), never enqueue a
   call for later, since there's no trailing edge to fire on.

## Algorithm

**Pattern:** same timestamp-gated closure as the baseline throttle, but
with the leading-edge call and the trailing-edge scheduling each made
conditional on their respective option flag.
**Core insight:** the baseline throttle already separates "enough time
has passed → act now" from "not enough time has passed → schedule a
trailing call" into two branches; adding `leading`/`trailing` options
is a matter of guarding *what "act now" and "schedule a trailing call"
actually do* with the corresponding flag, rather than restructuring the
control flow. The one genuinely new piece of logic is: when `leading:
false`, the very first call in a sequence must still start the
`intervalMs` countdown (so a trailing call, if enabled, has something
to fire from) without actually invoking `fn` — this requires tracking
"is a window currently open" independently of "has `fn` been called
yet," since with `leading: false` a window can be open with zero calls
to `fn` having happened inside it yet.
**Invariant:** across any window, `fn` fires at most twice (once for
each edge that's both enabled and actually reached), at most once per
edge, and never for an edge whose option flag is `false`.

## Dry Run

**Input:** `throttle(fn, 200, { leading: false, trailing: true })`;
calls at t=0 (`'a'`), t=50 (`'b'`), t=150 (`'c'`), then silence.

| Call | t (ms) | leading fires? | Action | trailing pending |
|---|---|---|---|---|
| `throttled('a')` | 0 | no (`leading: false`) | No immediate call; schedule trailing timer for t=200 with args `'a'`; mark window as open | args=`'a'`, fires t=200 |
| `throttled('b')` | 50 | no (already inside the open window) | Overwrite pending trailing args with `'b'` (do not add a second timer) | args=`'b'`, fires t=200 |
| `throttled('c')` | 150 | no | Overwrite pending trailing args with `'c'` | args=`'c'`, fires t=200 |
| — trailing fires — | 200 | — | `trailing: true`, so runs `fn('c')` | cleared |

**Result:** `fn` runs exactly once, with `'c'`, at t=200 — no leading
call ever happened (as expected with `leading: false`), and the single
trailing call correctly used the most recent args seen before the
window closed.

## JavaScript Solution

```js
function throttle(fn, intervalMs, options = {}) {
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  let lastRan = -Infinity;
  let trailingTimerId;
  let trailingArgs;
  let trailingThis;

  function runTrailing() {
    trailingTimerId = undefined;
    lastRan = Date.now();
    if (trailing) {
      fn.apply(trailingThis, trailingArgs);
    }
    trailingArgs = undefined;
    trailingThis = undefined;
  }

  return function throttled(...args) {
    const now = Date.now();
    const remaining = intervalMs - (now - lastRan);

    // Always remember the latest args/this — needed if a trailing call
    // ends up firing, regardless of which branch below runs.
    trailingArgs = args;
    trailingThis = this;

    if (remaining <= 0 && !trailingTimerId) {
      // Enough time has passed and no window is currently open.
      clearTimeout(trailingTimerId);
      if (leading) {
        lastRan = now;
        fn.apply(this, args);
        trailingArgs = undefined; // leading call already consumed these args
        trailingThis = undefined;
      } else if (trailing) {
        // leading disabled: open a window anchored at `now`, but don't
        // call fn yet — only the trailing edge (if enabled) will.
        trailingTimerId = setTimeout(runTrailing, intervalMs);
      } else {
        // Both edges disabled: nothing to do, ever.
        lastRan = now;
      }
    } else if (trailing && !trailingTimerId) {
      // Still inside the current window; ensure exactly one trailing
      // call is scheduled for when it closes (only if enabled).
      trailingTimerId = setTimeout(runTrailing, Math.max(remaining, 0));
    }
    // If trailing is false and we're mid-window, this call is simply
    // dropped (its args were still recorded above for consistency,
    // but no timer consumes them).
  };
}
```

## TypeScript Solution

```ts
interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  intervalMs: number,
  options: ThrottleOptions = {},
): (...args: Args) => void {
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  let lastRan = -Infinity;
  let trailingTimerId: ReturnType<typeof setTimeout> | undefined;
  let trailingArgs: Args | undefined;
  let trailingThis: unknown;

  function runTrailing(): void {
    trailingTimerId = undefined;
    lastRan = Date.now();
    if (trailing && trailingArgs) {
      fn.apply(trailingThis, trailingArgs);
    }
    trailingArgs = undefined;
    trailingThis = undefined;
  }

  return function throttled(this: unknown, ...args: Args): void {
    const now = Date.now();
    const remaining = intervalMs - (now - lastRan);

    trailingArgs = args;
    trailingThis = this;

    if (remaining <= 0 && !trailingTimerId) {
      if (leading) {
        lastRan = now;
        fn.apply(this, args);
        trailingArgs = undefined;
        trailingThis = undefined;
      } else if (trailing) {
        trailingTimerId = setTimeout(runTrailing, intervalMs);
      } else {
        lastRan = now;
      }
    } else if (trailing && !trailingTimerId) {
      trailingTimerId = setTimeout(runTrailing, Math.max(remaining, 0));
    }
  };
}
```

## Time Complexity

O(1) per call — the same constant-time timestamp comparison and at most
one `setTimeout` as the baseline; the option checks are simple boolean
reads, adding no asymptotic cost.

## Space Complexity

O(1) — the same fixed set of closure variables as the baseline, plus
two small booleans read once from `options` at creation time.

## Common Mistakes

- Treating `{ leading: false, trailing: true }` as "just skip the
  immediate call" without also correctly opening a window — if the
  timer isn't scheduled *at all* until a second call arrives, a single
  isolated call with `leading: false` never fires `fn`, which is wrong
  (see the single-call edge case above).
- Letting `{ leading: true, trailing: false }` still schedule a
  trailing timer "just in case" — with `trailing: false`, no timer
  should ever be created for calls arriving mid-window; they must be
  silently dropped, not deferred.
- Defaulting the options object itself to `undefined` handling
  incorrectly (e.g. `options.leading` throwing because `options` is
  `undefined`) — always default the whole `options` parameter to `{}`
  first, then read `leading`/`trailing` off of that with `??` defaults.
- Not resetting `trailingArgs`/`trailingThis` after a leading call
  consumes them — if left stale, a later trailing timer (from a
  *different*, later window) could fire with old, incorrect arguments.
- Forgetting the fully-disabled case (`{ leading: false, trailing:
  false }`) entirely — some implementations don't explicitly handle it
  and end up accidentally still calling `fn` through a code path that
  assumed at least one option was `true`.

## Interview Follow-up Questions

1. Walk through all four `{leading, trailing}` combinations for the
   exact same sequence of calls — how does the *count* of times `fn`
   fires differ across all four?
2. How would you unit test all four combinations deterministically with
   fake timers, asserting both call count and arguments per
   configuration?
3. How does Lodash's actual `_.throttle` implement this (it's built on
   top of `_.debounce` with a `maxWait` internally) — what's the
   trade-off of that approach vs. this standalone one?
4. In a real UI, when would you actually want `leading: false`? (Hint:
   think about a "fetch on scroll" handler where the very first scroll
   event firing an immediate fetch might be wasteful if the user is
   about to keep scrolling anyway.)
5. How would you generalize this and the earlier debounce-with-cancel-
   and-flush into one shared underlying utility, since they share so
   much of the same closure/timer bookkeeping?

## Similar Questions

- [Implement Throttle](throttle.md) — the baseline this extends
- [Implement an Advanced Debounce with Cancel and Flush](implement-advanced-debounce-with-cancel-and-flush.md)
- Implement `requestAnimationFrame`-based throttling for scroll/resize
  handlers

---
[← Back to 61-javascript-coding](README.md)
