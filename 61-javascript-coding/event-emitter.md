# Q520 · Implement a Custom EventEmitter

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, Uber, Atlassian
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Design Patterns / Event Handling
**Concepts:** observer pattern, event-to-listeners map, listener lifecycle (`on`/`off`/`once`), synchronous dispatch

## Problem Statement

Implement an `EventEmitter` class from scratch — no importing Node's
built-in `events` module, no relying on the DOM's `EventTarget`. It
must support:

- `on(eventName, listener)` — register `listener` to run every time
  `eventName` is emitted; return the emitter itself (so calls can
  chain).
- `off(eventName, listener)` — remove that specific `listener` from
  `eventName`'s registered listeners.
- `emit(eventName, ...args)` — synchronously invoke every listener
  currently registered for `eventName`, in the order they were added,
  each with `...args`.
- `once(eventName, listener)` — like `on`, but the listener is
  automatically removed right after it fires for the first time.

## Input

A sequence of method calls on an `EventEmitter` instance: `on`/`off`/
`once` to manage listeners, `emit` to fire an event with zero or more
arguments.

## Output

`emit` has no return value of its own significance (or returns whether
any listener existed, per implementation choice) — its effect is
*calling* every currently-registered listener for that event, in
registration order, synchronously, with the arguments `emit` was given.

## Constraints

- Multiple listeners can be registered for the same event name; all of
  them run, in the order they were added, on `emit`.
- `off` removes only the exact listener reference passed in — it must
  not remove other listeners registered for the same event.
- Emitting an event with no registered listeners must not throw — it's
  simply a no-op.
- A listener registered via `once` must never run more than once, even
  if `emit` is called for that event many times.
- A listener that removes *itself* (or another listener) via `off`
  while it's currently running (i.e. from inside its own callback
  during `emit`) must not corrupt the current dispatch or crash — this
  is the trickiest edge case in a naive implementation.

## Examples

| Setup | Calls | Result | Why |
|---|---|---|---|
| `const bus = new EventEmitter(); bus.on('login', (user) => console.log(`Hi ${user}`));` | `bus.emit('login', 'Rasik')` | Logs `"Hi Rasik"` | The listener runs synchronously with the emitted argument |
| `const handler = () => count++; bus.on('tick', handler); bus.on('tick', handler);` then `bus.off('tick', handler);` | `bus.emit('tick')` | `count` stays `0` | `off` removes the listener reference — even though it was added twice here for illustration, `off` removes one registered occurrence; calling `off` twice (once per `on`) removes both |
| `bus.once('ready', () => count++);` | `bus.emit('ready'); bus.emit('ready');` | `count === 1` | `once`'s listener self-unregisters after its first firing, so the second `emit` finds no listeners left |

## Edge Cases

- `emit` called for an event with zero registered listeners → no-op, no
  throw.
- `off` called with a listener that was never registered (or already
  removed) → no-op, no throw.
- The same listener function registered twice via `on` for the same
  event (`on('x', fn); on('x', fn);`) → both registrations are
  independent entries; `emit` calls `fn` twice; a single `off('x', fn)`
  removes only one of the two entries (matches Node's `EventEmitter`
  behavior).
- A listener throws when called during `emit` → per this implementation
  (documented in Common Mistakes), one listener throwing should not
  prevent the remaining listeners for that same `emit` from still
  running.
- A listener calls `off` on itself or on a not-yet-run listener for the
  *same* event, from inside its own callback during an in-progress
  `emit` → the currently-executing dispatch iterates over a snapshot of
  listeners taken at the start of `emit`, so it isn't corrupted by
  concurrent mutation of the live listener list.

## Hints

1. The core data structure is a map from event name to an array (or
   `Set`) of listener functions — what built-in gives you that
   name-to-list-of-values shape directly?
2. `off` needs to find and remove one specific function reference from
   that event's list — how do you compare function references for
   equality in JS (hint: it's not by name or by "looks the same," it's
   strict reference identity)?
3. `once` doesn't need new dispatch logic — it can be implemented as a
   thin wrapper *around* `on`: register a wrapper listener that calls
   the real listener and then immediately calls `off` on itself, using
   the same map/removal machinery `on`/`off` already provide.

## Algorithm

**Pattern:** the observer pattern, backed by a `Map<eventName,
Set<listener>>` (or an object of arrays).
**Core insight:** every operation reduces to manipulating one
underlying structure — a mapping from event name to the collection of
functions subscribed to it. `on` appends to that collection, `off`
removes one specific function from it by reference, and `emit` iterates
a **snapshot** of the collection (not the live collection itself) and
calls each function with the emitted arguments — snapshotting matters
because a listener is allowed to call `off` (including on itself)
*during* dispatch, and iterating a live, mutating collection while
inside a `for...of` over it is a well-known source of skipped or
double-fired listeners. `once` is not a separate mechanism — it's `on`
with a listener that wraps the real one and calls `off` on itself right
after it fires.
**Invariant:** at the moment `emit(eventName, ...args)` is called,
exactly the listeners currently registered for `eventName` — as of that
moment — are the ones that run, once each, in registration order,
regardless of any `on`/`off` calls a listener makes to that same event
while dispatch is in progress.

## Dry Run

**Input:**
```js
const bus = new EventEmitter();

function logA(msg) { console.log('A:', msg); }
function logB(msg) { console.log('B:', msg); }

bus.on('news', logA);
bus.on('news', logB);
bus.once('news', () => console.log('one-time listener fired'));

bus.emit('news', 'first');
bus.emit('news', 'second');
```

| Step | Call | `listeners.get('news')` (before) | What happens | `listeners.get('news')` (after) |
|---|---|---|---|---|
| 1 | `on('news', logA)` | `undefined` | Creates entry, appends `logA` | `[logA]` |
| 2 | `on('news', logB)` | `[logA]` | Appends `logB` | `[logA, logB]` |
| 3 | `once('news', onceFn)` | `[logA, logB]` | Wraps the arrow function in a self-removing wrapper, appends it via `on` | `[logA, logB, onceWrapper]` |
| 4 | `emit('news', 'first')` | `[logA, logB, onceWrapper]` | Snapshot taken: `[logA, logB, onceWrapper]`; calls each with `'first'` — logs `"A: first"`, `"B: first"`, `"one-time listener fired"`; `onceWrapper` then calls `off('news', onceWrapper)` on itself | `[logA, logB]` |
| 5 | `emit('news', 'second')` | `[logA, logB]` | Snapshot: `[logA, logB]`; calls each with `'second'` — logs `"A: second"`, `"B: second"` (the once-listener does not fire again) | `[logA, logB]` |

**Result:** the once-listener fires exactly once, on the first `emit`;
`logA`/`logB` fire on every `emit`, confirming the persistent-vs-
one-shot distinction.

## JavaScript Solution

```js
class EventEmitter {
  #listeners = new Map(); // eventName -> array of listener functions

  on(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, []);
    }
    this.#listeners.get(eventName).push(listener);
    return this; // enables bus.on('a', fn1).on('b', fn2) chaining
  }

  off(eventName, listener) {
    const eventListeners = this.#listeners.get(eventName);
    if (!eventListeners) {
      return this; // nothing registered for this event — no-op
    }

    // Remove ONE occurrence of this exact function reference, not all
    // matches — mirrors Node's EventEmitter, which lets the same
    // listener be registered (and removed) more than once.
    const index = eventListeners.indexOf(listener);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
    return this;
  }

  emit(eventName, ...args) {
    const eventListeners = this.#listeners.get(eventName);
    if (!eventListeners || eventListeners.length === 0) {
      return false; // no one was listening
    }

    // Snapshot BEFORE iterating, so a listener that calls on()/off()
    // for this same event mid-dispatch doesn't corrupt this dispatch.
    const snapshot = [...eventListeners];
    for (const listener of snapshot) {
      listener.apply(this, args);
    }
    return true;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper); // self-remove before/after running
      listener.apply(this, args);
    };
    return this.on(eventName, wrapper);
  }
}
```

## TypeScript Solution

```ts
type Listener = (...args: unknown[]) => void;

class EventEmitter {
  #listeners = new Map<string, Listener[]>();

  on(eventName: string, listener: Listener): this {
    const eventListeners = this.#listeners.get(eventName) ?? [];
    eventListeners.push(listener);
    this.#listeners.set(eventName, eventListeners);
    return this;
  }

  off(eventName: string, listener: Listener): this {
    const eventListeners = this.#listeners.get(eventName);
    if (!eventListeners) {
      return this;
    }

    const index = eventListeners.indexOf(listener);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
    return this;
  }

  emit(eventName: string, ...args: unknown[]): boolean {
    const eventListeners = this.#listeners.get(eventName);
    if (!eventListeners || eventListeners.length === 0) {
      return false;
    }

    const snapshot = [...eventListeners];
    for (const listener of snapshot) {
      listener.apply(this, args);
    }
    return true;
  }

  once(eventName: string, listener: Listener): this {
    const wrapper: Listener = (...args: unknown[]) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };
    return this.on(eventName, wrapper);
  }
}
```

## Time Complexity

- `on`: O(1) amortized (array push).
- `off`: O(k), where k is the number of listeners registered for that
  event — `indexOf` + `splice` both scan/shift linearly.
- `emit`: O(k), where k is the number of listeners for that event —
  one snapshot copy plus one call per listener.
- `once`: O(1) to register (delegates to `on`).

## Space Complexity

O(n), where n is the total number of listeners registered across all
events — the `Map` holds one array entry per event, each sized to its
listener count; `emit`'s snapshot adds a temporary O(k) copy per call,
released after dispatch completes.

## Common Mistakes

- Iterating the *live* listeners array directly in `emit` (`for (const
  l of eventListeners)`) instead of a snapshot — if a listener calls
  `off` on a not-yet-visited listener during dispatch, the array shifts
  under the iterator and a listener can be silently skipped or
  double-visited, depending on the removed index.
- Implementing `once` by tracking a `hasFired` boolean checked *inside*
  the listener instead of actually removing it from the map — this
  makes the listener "run" forever internally (just becoming a no-op
  after the first time) rather than truly unregistering, which leaks
  memory if listeners are never explicitly cleaned up elsewhere.
- Using `eventListeners.filter(l => l !== listener)` for `off` when the
  same function was registered twice — `filter` removes *every*
  matching occurrence, not just one, which diverges from Node's actual
  `EventEmitter.off` (removes only the first match).
- Forgetting `return this` from `on`/`off` — breaks the common
  `emitter.on('a', fn).on('b', fn2)` chaining idiom that real
  `EventEmitter`-style APIs support.
- Not guarding `emit` for an event with no listeners — indexing into
  `undefined` or iterating `undefined` throws instead of the expected
  no-op.

## Interview Follow-up Questions

1. How is this different from the DOM's built-in `EventTarget`/
   `CustomEvent`, and when would you reach for one over the other in a
   browser context?
2. How would you support wildcard/namespaced events (e.g. listening to
   `user.*` to catch both `user.login` and `user.logout`)?
3. How would you make `emit` asynchronous — running listeners on the
   microtask queue instead of synchronously — and what would break for
   existing callers if you changed that behavior by default?
4. How does this relate to the Pub/Sub pattern — what's actually
   different between an `EventEmitter` and a Pub/Sub system, given they
   look similar on the surface?
5. How would you add a `listenerCount(eventName)` or `removeAllListeners
   (eventName)` method on top of this design?

## Similar Questions

- [Implement a Pub/Sub System](pub-sub-system.md) — a closely related
  but distinct pattern; see that page's Common Mistakes for the
  distinction from this one
- [Implement Debounce](debounce.md) / [Implement Throttle](throttle.md)
  — other function-wrapping utilities, though for timing rather than
  event dispatch
- Implement the Observer design pattern generically (subject/observer
  interfaces rather than a string-keyed event map)

---
[← Back to 61-javascript-coding](README.md)
