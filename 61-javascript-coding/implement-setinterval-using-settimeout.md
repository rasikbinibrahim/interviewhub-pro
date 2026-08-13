# QADVJS055 · Implement setInterval Using setTimeout

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Uber, Microsoft
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Async Control Flow / Timers
**Concepts:** recursive `setTimeout` scheduling, handle/ID management, drift and overlap avoidance under main-thread load

## Problem Statement

Implement `mySetInterval(fn, intervalMs)` using **only** `setTimeout`
(no calling the real `setInterval` internally). It should behave like
native `setInterval`: `fn` runs repeatedly, roughly every `intervalMs`,
until cancelled. Return a handle that a paired `myClearInterval(handle)`
function can use to stop future executions. This is a very common
"implement X using only Y" interview question, and the interesting part
isn't just making it work — it's explaining *why* chaining `setTimeout`
calls recursively is actually the technique real-world polling/heartbeat
code prefers over native `setInterval`, not merely a workaround for not
having `setInterval` available.

## Input

- `fn`: a zero-argument function to run repeatedly.
- `intervalMs`: a non-negative number, the target milliseconds between
  the *end* of one run and the *start* of scheduling the next.

`myClearInterval(handle)` takes whatever handle `mySetInterval` returned.

## Output

`mySetInterval` returns a handle (any value that uniquely identifies
this interval — an object, a number, a `Symbol`, etc.) that can later be
passed to `myClearInterval` to stop further executions. `fn` itself
returns nothing meaningful to the caller.

## Constraints

- After `myClearInterval(handle)` is called, `fn` must never run again
  for that handle, including a call that was already scheduled but
  hasn't fired yet.
- Must not call `fn` again until the *previous* call has returned (for
  synchronous `fn`) — chained `setTimeout` cannot overlap the way
  native `setInterval` can queue up backlogged callbacks; this
  non-overlapping property should be explicitly preserved, not
  accidentally lost.
- `intervalMs >= 0`.
- Calling `myClearInterval` with an already-cleared or invalid handle
  must not throw.
- Must not use the real `setInterval`/`clearInterval` anywhere in the
  implementation.

## Examples

| Scenario | Behavior |
|---|---|
| `const handle = mySetInterval(tick, 100);` left running | `tick` runs at approximately t=100, 200, 300, 400ms, and so on, indefinitely |
| `myClearInterval(handle)` called at t=250, right after the t=200 run | No further runs occur — the timer that would have fired at t=300 never gets scheduled (or is cancelled before it fires) |
| `mySetInterval(tick, 0)` | `tick` runs as fast as `setTimeout(fn, 0)` allows back-to-back — still asynchronous, still non-overlapping, but with minimal delay between runs |
| `tick` itself takes 50ms to execute synchronously, `intervalMs = 100` | Runs are spaced ~150ms apart in real time (50ms of work + 100ms of delay) — this implementation measures the interval *after* each run finishes, not from when it started |

## Edge Cases

- `myClearInterval` called before the very first scheduled run has
  fired → that first run never happens.
- `myClearInterval` called from *inside* `fn` itself (a common "run N
  times then stop" pattern) → must take effect immediately; the next
  `setTimeout` must not even be scheduled.
- `myClearInterval` called twice with the same handle, or with a handle
  from an interval that already stopped itself → no-op both times, no
  throw.
- `fn` throws synchronously → per this implementation (see Common
  Mistakes), a thrown error should propagate as an uncaught exception in
  that scheduled callback (matching what would happen with native
  `setInterval`), and by default should NOT silently cancel future runs
  — worth discussing explicitly, since "should one failure stop the
  whole interval" is a real design choice.

## Hints

1. The core mechanism is: schedule `fn` with `setTimeout`; when that
   timeout fires, run `fn`, then — if not cancelled — immediately
   schedule *another* `setTimeout` for the same delay. What state needs
   to persist across each of those scheduled calls so a later
   `myClearInterval` can stop the *next* one from ever being scheduled?
2. A single mutable "is this interval still active" flag (or storing
   the *current* pending `setTimeout` ID somewhere `myClearInterval`
   can reach) is enough — `myClearInterval` either flips that flag to
   false (checked before scheduling the next round) or calls the real
   `clearTimeout` on whatever timeout ID is currently pending.
3. Return a handle that wraps whatever internal state `myClearInterval`
   needs — e.g. an object `{ cleared: false }` that both the recursive
   scheduler and `myClearInterval` share a reference to — rather than
   trying to expose the raw, ever-changing `setTimeout` ID directly
   (since a *new* one is created on every cycle, the "current" ID alone
   isn't a stable handle across the interval's lifetime).

## Algorithm

**Pattern:** recursive/self-rescheduling `setTimeout`, gated by a
shared cancellation flag.
**Core insight:** `setInterval` doesn't actually need a native timer
primitive that "repeats" — a `setTimeout` that, upon firing, runs `fn`
and then schedules *itself again* achieves the same repeating effect,
as long as the cancellation check happens before each reschedule. This
recursive approach has a genuinely important advantage over native
`setInterval` under load: native `setInterval` schedules callbacks on a
fixed wall-clock cadence regardless of whether the previous callback
has finished — if the main thread is busy (e.g. `fn` itself is slow, or
something else blocks the thread), multiple `setInterval` callbacks can
pile up and then fire in a rapid burst once the thread frees up,
because the browser's timer queue doesn't wait for the previous
callback to finish before queuing the next tick. Chained `setTimeout`,
by contrast, only schedules the *next* call after the *current* one has
completed, so it can never overlap or "catch up" in a burst — the
actual spacing between runs may drift longer than `intervalMs` under
load, but it can never compress into overlapping/rapid-fire execution,
which is usually the more dangerous failure mode (e.g. for a polling
function that itself makes a network request — overlapping calls could
mean dozens of in-flight requests stacking up).
**Invariant:** at any moment, at most one `setTimeout` is pending for a
given interval, and no new one is ever scheduled once
`myClearInterval` has been called for that handle.

## Dry Run

**Input:** `const handle = mySetInterval(tick, 100)`, then
`myClearInterval(handle)` called at t=250 (right after the run that
fires at t=200).

| Real time | Event | handle.cleared | Action |
|---|---|---|---|
| t=0 | `mySetInterval` called | `false` | Schedules first `setTimeout(scheduleNext, 100)` |
| t=100 | Timeout fires | `false` | Runs `tick()`; not cleared, so schedules the next `setTimeout(scheduleNext, 100)` for t=200 |
| t=200 | Timeout fires | `false` | Runs `tick()`; not cleared, so schedules the next one for t=300 |
| t=250 | `myClearInterval(handle)` called | `false → true` | Flips the shared flag; also clears whatever `setTimeout` is currently pending (the one scheduled for t=300) |
| t=300 | (would have fired, but was cleared) | `true` | Nothing happens — no `tick()` call, no further scheduling |

**Result:** `tick` runs exactly twice, at t=100 and t=200. The run that
would have happened at t=300 never occurs, because clearing at t=250
both cancels the pending timeout directly and prevents any future
reschedule via the flag check.

## JavaScript Solution

```js
function mySetInterval(fn, intervalMs) {
  const handle = {
    cleared: false,
    timeoutId: undefined,
  };

  function scheduleNext() {
    handle.timeoutId = setTimeout(() => {
      if (handle.cleared) return; // cancelled while this timeout was pending

      fn();

      // Only schedule the NEXT run after this one has fully finished —
      // this is what prevents overlapping executions under load.
      if (!handle.cleared) {
        scheduleNext();
      }
    }, intervalMs);
  }

  scheduleNext();
  return handle;
}

function myClearInterval(handle) {
  if (!handle || handle.cleared) return; // no-op for invalid/already-cleared handles
  handle.cleared = true;
  clearTimeout(handle.timeoutId); // cancel whatever is currently pending
}
```

## TypeScript Solution

```ts
interface IntervalHandle {
  cleared: boolean;
  timeoutId: ReturnType<typeof setTimeout> | undefined;
}

function mySetInterval(fn: () => void, intervalMs: number): IntervalHandle {
  const handle: IntervalHandle = {
    cleared: false,
    timeoutId: undefined,
  };

  function scheduleNext(): void {
    handle.timeoutId = setTimeout(() => {
      if (handle.cleared) return;

      fn();

      if (!handle.cleared) {
        scheduleNext();
      }
    }, intervalMs);
  }

  scheduleNext();
  return handle;
}

function myClearInterval(handle: IntervalHandle | undefined): void {
  if (!handle || handle.cleared) return;
  handle.cleared = true;
  clearTimeout(handle.timeoutId);
}
```

## Time Complexity

O(1) per tick — each fired timeout does a flag check, one `fn()` call,
and one `setTimeout` reschedule, independent of how many ticks have
already occurred.

## Space Complexity

O(1) — a single shared `handle` object (two fields) persists for the
lifetime of the interval, regardless of how many times it has ticked.

## Common Mistakes

- Not tracking the *current* `timeoutId` and only flipping a boolean
  flag — this correctly prevents *future* reschedules but leaves the
  currently-pending `setTimeout` free to still fire once (it'll check
  the flag and no-op `fn()`, which is "safe" but wastes a full
  `intervalMs` wait doing nothing when `clearTimeout` could have
  cancelled it outright); both the ID-based `clearTimeout` and the flag
  check are worth including together for a clean, immediate cancel.
- Scheduling the *next* `setTimeout` before calling `fn()`, instead of
  after — this reintroduces the overlap risk this whole approach is
  supposed to avoid: if `fn` is slow, the next call could already be
  queued to fire mid-execution of the current one.
- Treating the raw `setTimeout` return value as a stable "handle" for
  the whole interval — a new timeout ID is generated on every cycle;
  the actual handle returned to the caller needs to be a stable wrapper
  object/reference that both the scheduler and `myClearInterval` share,
  not the ever-changing timeout ID itself.
- Assuming this produces *exact* `intervalMs` spacing — because the
  next `setTimeout` is only scheduled after `fn()` finishes, real
  spacing is `intervalMs + fn`'s own execution time, which is a
  deliberate, explainable trade-off (see Algorithm), not a bug to "fix."
- Forgetting the `myClearInterval` no-op guard for invalid/already-
  cleared handles — calling `clearTimeout(undefined)` is harmless in
  practice, but explicitly guarding communicates intent and avoids
  relying on that incidental leniency.

## Interview Follow-up Questions

1. Why might a monitoring/heartbeat system specifically prefer this
   recursive-`setTimeout` pattern over native `setInterval`, even when
   `setInterval` is perfectly available?
2. How would you change this so the interval "catches up" and fires
   immediately if a scheduled tick is significantly overdue (the
   opposite trade-off from what's implemented here) — would you ever
   actually want that?
3. How would you implement this so `intervalMs` is measured from the
   *start* of the previous run rather than its end (i.e. accounting for
   `fn`'s own duration by subtracting it from the next delay, similar to
   throttle's timestamp-based approach)?
4. What happens if `fn` itself schedules a `Promise`/microtask that
   outlives the synchronous portion of the call — does this
   implementation wait for that async work before scheduling the next
   tick, and should it?
5. How would you unit test this deterministically with fake timers,
   asserting both the call count and that cancellation actually stops
   further ticks?

## Similar Questions

- [Implement Debounce](debounce.md) / [Implement Throttle](throttle.md)
  — other `setTimeout`-based utilities, though for rate-limiting rather
  than repeated execution
- [Implement a Promise Retry Utility with Exponential Backoff](implement-promise-retry-with-exponential-backoff.md)
- Implement a polling function that stops once a condition is met

---
[← Back to 61-javascript-coding](README.md)
