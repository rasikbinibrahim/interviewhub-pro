# QADVJS067 · Implement an EventEmitter with Wildcard Listeners

**Difficulty:** Medium
**Companies Asked:** Meta, Uber, Netflix, Atlassian
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Design Patterns / Event Handling
**Concepts:** observer pattern, wildcard/catch-all subscription, dispatch-order guarantees between specific and wildcard listeners

## Problem Statement

This is a harder variant of
[Implement a Custom EventEmitter](event-emitter.md) — read that page
first for the baseline `on`/`off`/`emit`/`once` behavior, which this
page assumes and does not re-explain. Add support for a special
wildcard event name, `'*'`: a listener registered via `emitter.on('*',
listener)` must be called on **every** `emit`, for **every** event
name, receiving the event name as an extra leading argument
(`listener(eventName, ...args)`), in addition to (not instead of) any
listeners registered for that specific event name.

## Input

Same method calls as the baseline (`on`, `off`, `once`, `emit`), plus
`on('*', listener)`/`off('*', listener)`/`once('*', listener)` used
with the reserved wildcard event name.

## Output

Same as the baseline for specific-event listeners. For a wildcard
listener specifically: called once per `emit(eventName, ...args)` call,
with `listener(eventName, ...args)` — the emitted event's name prepended
to the original arguments.

## Constraints

- Every `emit(eventName, ...args)` call must invoke: (1) every listener
  registered specifically for `eventName`, with `...args`, **and** (2)
  every listener registered for `'*'`, with `(eventName, ...args)` — a
  single `emit` call fans out to both groups, not one or the other.
- Emitting the literal event name `'*'` itself (`emitter.emit('*',
  ...)`) is allowed but should not double-invoke wildcard listeners —
  they should still only run once each per `emit` call, the same as
  for any other event name (worth stating as an explicit design
  decision — see Common Mistakes for the double-count trap this
  invites).
- `off('*', listener)` removes a wildcard listener the same way `off`
  removes any other — exact reference match, one entry per call.
- `once('*', listener)` behaves like `once` for any other event —
  auto-removes after its first firing (across *any* emitted event, not
  just one specific one).
- Order between the specific-event listeners and the wildcard listeners
  for the same `emit` call: this implementation runs specific listeners
  first, then wildcard listeners, and states that explicitly (a
  reasonable interviewer will accept either order as long as it's
  documented and consistent).

## Examples

| Setup | Calls | Result | Why |
|---|---|---|---|
| `bus.on('login', (u) => log('login', u)); bus.on('*', (name, ...args) => log('wild', name, args));` | `bus.emit('login', 'Rasik')` | Logs `"login Rasik"` then `"wild login ['Rasik']"` | Both the specific listener and the wildcard listener fire for the same `emit` call |
| `bus.on('*', logAll);` | `bus.emit('a', 1); bus.emit('b', 2);` | `logAll` is called twice: `('a', 1)` then `('b', 2)` | The wildcard listener fires for every distinct event name emitted |
| `bus.once('*', logOnce);` | `bus.emit('x'); bus.emit('y');` | `logOnce` fires only for `'x'`, not `'y'` | `once` on a wildcard listener still means "at most one firing total," across any event |
| No wildcard listener registered | `bus.emit('news', 'hi')` | Only `'news'`-specific listeners run; no error, no wildcard overhead | Wildcard support is additive — it doesn't change behavior when unused |

## Edge Cases

- No wildcard listener registered at all → identical behavior to the
  baseline `EventEmitter`, no extra dispatch, no throw.
- `emit('*', ...)` (emitting the wildcard name itself as a real event)
  → wildcard listeners fire once each (as they would for any `emit`
  call), not twice — they are not *also* treated as "specific"
  listeners for the event name `'*'` in a way that double-invokes them.
- A wildcard listener registered via `once` that also happens to match
  a specific `off('*', ...)` call → removed correctly, same reference-
  identity rules as the baseline.
- Multiple wildcard listeners registered → all of them fire, in
  registration order, same as multiple specific listeners would.
- A wildcard listener throws → per the baseline's existing behavior
  (one listener throwing doesn't stop the rest), this must not prevent
  remaining specific or wildcard listeners from still running for that
  `emit` call.

## Hints

1. The baseline already stores listeners in a `Map<eventName,
   listener[]>` — treat `'*'` as just another key in that same map;
   no new data structure is needed, only new *dispatch* logic in
   `emit`.
2. `emit(eventName, ...args)` needs to look up **two** entries in the
   map on every call: `eventName`'s own listeners (called with `args`
   as before) and `'*'`'s listeners (called with `eventName` prepended
   to `args`) — both groups get dispatched from the same `emit`
   invocation, not selected between.
3. Guard against accidentally re-triggering wildcard dispatch when
   `eventName` itself *is* `'*'` — since `'*'`'s specific-listener
   lookup and its wildcard-listener lookup would otherwise resolve to
   the *same* map entry, naively dispatching both "specific" and
   "wildcard" listeners in that case would call every `'*'`-registered
   listener twice for a single `emit('*', ...)` call; dispatch each
   distinct listener array at most once per `emit`.

## Algorithm

**Pattern:** the same `Map<eventName, listener[]>` observer-pattern
core as the baseline, with `emit` extended to also dispatch to the
`'*'` bucket on every call.
**Core insight:** a wildcard listener is not conceptually different
from a normal listener — it's simply registered under a reserved key
(`'*'`) and *always* included in dispatch, regardless of which event
name was actually emitted. The only genuinely new logic lives entirely
inside `emit`: instead of looking up and running just
`eventName`'s listener list, it must also look up and run `'*'`'s
listener list (with the event name injected as an extra leading
argument), while being careful not to run the `'*'` bucket *twice* in
the special case where `eventName` itself happens to be `'*'` — since
in that case, the "specific" lookup and the "wildcard" lookup would
otherwise resolve to the exact same underlying array.
**Invariant:** for any `emit(eventName, ...args)` call, every listener
registered for `eventName` runs once with `args`, and every listener
registered for `'*'` runs once with `(eventName, ...args)` — each
listener list, even if `eventName === '*'`, is dispatched exactly once
per `emit` call.

## Dry Run

**Input:**
```js
const bus = new EventEmitter();
bus.on('login', (user) => console.log('specific:', user));
bus.on('*', (eventName, ...args) => console.log('wildcard:', eventName, args));

bus.emit('login', 'Rasik');
bus.emit('logout');
```

| Step | Call | `listeners.get('login')` | `listeners.get('*')` | Dispatch order | Output |
|---|---|---|---|---|---|
| 1 | `on('login', specificFn)` | `[specificFn]` | `undefined` | — | — |
| 2 | `on('*', wildcardFn)` | `[specificFn]` | `[wildcardFn]` | — | — |
| 3 | `emit('login', 'Rasik')` | `[specificFn]` | `[wildcardFn]` | specific first, then wildcard | `"specific: Rasik"` then `"wildcard: login ['Rasik']"` |
| 4 | `emit('logout')` | `undefined` (no listeners for `'logout'`) | `[wildcardFn]` | no specific listeners to run; wildcard still runs | `"wildcard: logout []"` |

**Result:** the specific `login` listener only fires for `'login'`, but
the wildcard listener fires for *every* emitted event, including
`'logout'`, which has no specific listeners of its own at all.

## JavaScript Solution

```js
const WILDCARD = '*';

class EventEmitter {
  #listeners = new Map(); // eventName (or WILDCARD) -> array of listener functions

  on(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, []);
    }
    this.#listeners.get(eventName).push(listener);
    return this;
  }

  off(eventName, listener) {
    const eventListeners = this.#listeners.get(eventName);
    if (!eventListeners) return this;

    const index = eventListeners.indexOf(listener);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
    return this;
  }

  emit(eventName, ...args) {
    let dispatched = false;

    const specificListeners = this.#listeners.get(eventName);
    if (specificListeners && specificListeners.length > 0) {
      // Snapshot before iterating, same reasoning as the baseline —
      // a listener may call on()/off() mid-dispatch.
      for (const listener of [...specificListeners]) {
        listener.apply(this, args);
      }
      dispatched = true;
    }

    // Only dispatch the wildcard bucket separately when eventName
    // isn't itself '*' — otherwise it's the SAME array as above, and
    // dispatching it again here would double-fire every listener.
    if (eventName !== WILDCARD) {
      const wildcardListeners = this.#listeners.get(WILDCARD);
      if (wildcardListeners && wildcardListeners.length > 0) {
        for (const listener of [...wildcardListeners]) {
          listener.apply(this, [eventName, ...args]);
        }
        dispatched = true;
      }
    }

    return dispatched;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };
    return this.on(eventName, wrapper);
  }
}
```

## TypeScript Solution

```ts
const WILDCARD = '*' as const;

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
    if (!eventListeners) return this;

    const index = eventListeners.indexOf(listener);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
    return this;
  }

  emit(eventName: string, ...args: unknown[]): boolean {
    let dispatched = false;

    const specificListeners = this.#listeners.get(eventName);
    if (specificListeners && specificListeners.length > 0) {
      for (const listener of [...specificListeners]) {
        listener.apply(this, args);
      }
      dispatched = true;
    }

    if (eventName !== WILDCARD) {
      const wildcardListeners = this.#listeners.get(WILDCARD);
      if (wildcardListeners && wildcardListeners.length > 0) {
        for (const listener of [...wildcardListeners]) {
          listener.apply(this, [eventName, ...args]);
        }
        dispatched = true;
      }
    }

    return dispatched;
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

- `on`/`off`/`once`: unchanged from the baseline — O(1) amortized /
  O(k) / O(1) respectively, where k is that event's listener count.
- `emit`: O(k + w), where k is the number of listeners specific to
  `eventName` and w is the number of wildcard listeners — both groups
  are dispatched once each per `emit` call.

## Space Complexity

O(n + w), where n is the total listeners across all specific events and
w is the number registered on `'*'` — the wildcard bucket is just one
more entry in the same underlying map, not a separate structure.

## Common Mistakes

- Double-firing wildcard listeners when `eventName === '*'` is itself
  emitted — forgetting the `eventName !== WILDCARD` guard means the
  specific-listener dispatch and the wildcard dispatch both run against
  the exact same underlying array, calling every `'*'`-registered
  listener twice for one `emit('*', ...)` call.
- Passing the wildcard listener the same `args` as a specific listener,
  without prepending `eventName` — a wildcard listener has no other way
  to know *which* event just fired if the event name isn't passed
  along as an argument.
- Treating `'*'` registration/removal as needing entirely separate
  methods (`onAny`/`offAny`) instead of reusing the exact same `on`/
  `off`/`once` machinery with `'*'` as just another map key — adds
  needless surface area and risks the two code paths drifting out of
  sync.
- Not reusing the baseline's snapshot-before-iterating protection for
  the wildcard dispatch loop specifically — a wildcard listener that
  calls `off('*', ...)` on itself or another wildcard listener mid-
  dispatch would corrupt a live (non-snapshotted) iteration the same
  way the baseline's Common Mistakes section already warns about for
  specific listeners.
- Forgetting that `once('*', listener)` must remove itself from the
  `'*'` bucket specifically (not from whatever `eventName` happened to
  trigger it) — since a wildcard `once` listener can fire from *any*
  event, its self-removal must always target `'*'`, not the emitted
  event's own name.

## Interview Follow-up Questions

1. How would you support namespaced/prefix wildcards (e.g. `'user.*'`
   matching `'user.login'` and `'user.logout'` but not `'order.created'`),
   beyond just the single global `'*'`?
2. Would you change the dispatch order (specific listeners before
   wildcard, as implemented here, vs. wildcard first) in a logging/
   middleware use case — does the order actually matter for a real
   caller, and why might a logging wildcard listener specifically want
   to run *first*?
3. How would `listenerCount(eventName)` need to change to optionally
   include (or exclude) wildcard listeners in its count?
4. What's the performance impact of a wildcard listener on a very
   high-frequency event emitter (e.g. thousands of `emit` calls per
   second) — what would you measure, and how would you mitigate it if
   it became a bottleneck?
5. How does this compare to how Node's own `EventEmitter` handles the
   special `'newListener'`/`'removeListener'` meta-events — is that a
   similar pattern to a wildcard, or fundamentally different?

## Similar Questions

- [Implement a Custom EventEmitter](event-emitter.md) — the baseline
  this extends
- [Implement Debounce](debounce.md) / [Implement Throttle](throttle.md)
- Implement the Observer design pattern generically (subject/observer
  interfaces rather than a string-keyed event map)

---
[← Back to 61-javascript-coding](README.md)
