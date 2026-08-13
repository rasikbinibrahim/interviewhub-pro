# QJS326 · Implement a Promise Polyfill from Scratch

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** Promise states (pending/fulfilled/rejected), microtask queueing, `.then` chaining, thenable resolution, callback queueing for the pending state

## Problem Statement

Implement a `MyPromise` class that reimplements the core behavior of
the native `Promise`, from scratch — no using the real `Promise`
anywhere internally. The constructor takes an "executor" function,
`(resolve, reject) => { ... }`, called synchronously. `MyPromise` has
three states — pending, fulfilled, or rejected — and once settled
(fulfilled or rejected), the state and value are **permanent** and can
never change again. It must expose a working `.then(onFulfilled,
onRejected)` that returns a **new** `MyPromise`, correctly handling:
calling `.then` on an already-settled promise, calling `.then` multiple
times on a still-pending promise (queueing every callback), a `.then`
handler that itself returns another promise (which must be "flattened"
into the chain, not nested), and running every callback asynchronously
via the microtask queue — even if the promise was already settled
*before* `.then` was called. This is one of the most common and highest-
depth JavaScript interview questions; a correct, complete answer is a
strong signal.

## Input

- The executor function passed to `new MyPromise((resolve, reject) => {
  ... })`, itself calling `resolve(value)` or `reject(reason)`
  (synchronously or asynchronously, exactly once — subsequent calls are
  no-ops).
- Calls to `.then(onFulfilled, onRejected)`, each returning a new
  `MyPromise`, `onFulfilled`/`onRejected` each optional.

## Output

A `MyPromise` instance whose `.then()` method returns a new
`MyPromise`, chainable indefinitely (`p.then(...).then(...).then(...)`),
resolving/rejecting based on what each handler in the chain returns (or
throws, or resolves to, if it returns another thenable).

## Constraints

- State transitions only pending → fulfilled or pending → rejected,
  never the reverse, and never fulfilled ↔ rejected — once settled, the
  value/reason is permanent (calling `resolve`/`reject` again after
  settlement must be a silent no-op).
- `.then` callbacks must **never** run synchronously, even if the
  promise is already settled at the moment `.then` is called — they
  must always be deferred to the microtask queue (`queueMicrotask`),
  matching real Promise/A+ semantics.
- If `onFulfilled`/`onRejected` is omitted, the value/reason must pass
  through unchanged to the next link in the chain (`.then()` with no
  arguments is effectively a pass-through).
- If a `.then` handler returns a thenable (including another
  `MyPromise`), the promise returned by `.then` must adopt *that*
  thenable's eventual state/value — not wrap it as a nested promise.
- If a `.then` handler throws, the promise returned by `.then` must
  reject with the thrown value.
- Multiple `.then` calls on the same still-pending promise must all
  eventually run, each with the same settled value/reason, once that
  promise settles.

## Examples

| Code | Behavior | Why |
|---|---|---|
| `new MyPromise((resolve) => resolve(1)).then(v => console.log(v))` | Logs `1`, but only *after* the current synchronous script finishes (as a microtask), not immediately | Callbacks are always deferred, even for an executor that resolves synchronously |
| `const p = new MyPromise((resolve) => setTimeout(() => resolve('done'), 100)); p.then(a); p.then(b);` | Both `a` and `b` run, each with `'done'`, once the promise settles at t=100 | Multiple `.then` calls on the same pending promise all get queued and all eventually fire |
| `MyPromise.resolve(1).then(v => MyPromise.resolve(v + 1)).then(v => console.log(v))` | Logs `2`, not a promise object | A handler returning a thenable causes the *outer* chain to adopt that thenable's eventual value, "flattening" one level of nesting |
| `MyPromise.resolve(1).then(v => { throw new Error('boom'); }).then(null, e => console.log(e.message))` | Logs `'boom'` | A thrown error inside a handler routes to the next `onRejected` in the chain, skipping any intermediate `onFulfilled`-only links |

## Edge Cases

- `resolve` called with another `MyPromise`/thenable as its value (not
  from inside `.then`, but directly in the executor) — the outer
  promise must wait for and adopt *that* thenable's eventual state,
  not immediately fulfill with the thenable object itself.
- `resolve`/`reject` called more than once, or both called — only the
  first call has any effect; every subsequent call is a no-op.
- `.then()` called with no arguments at all, or with non-function
  arguments — must pass the value/reason through unchanged to the next
  link (this is what makes `.catch` implementable as `.then(undefined,
  onRejected)`).
- The executor itself throws synchronously — must be caught and treated
  as an immediate `reject` with the thrown value.
- A handler returns a thenable that *never* settles — the resulting
  chain promise correctly stays pending forever too (there's no way
  around this; matches native behavior).

## Hints

1. Give the promise internal state (`#state`, `#value`) and, critically,
   two **arrays** of queued callbacks (`#onFulfilledCallbacks`,
   `#onRejectedCallbacks`) — these arrays exist specifically to handle
   `.then` being called while the promise is still pending: since there's
   no value yet to call the handler with, the handler has to be stored
   and only actually invoked once `resolve`/`reject` eventually runs.
2. `resolve`/`reject` need a guard (e.g. checking `#state !== 'pending'`
   and returning early) to enforce the "settle exactly once" rule, and
   once they do transition the state, they must drain and run
   *every* queued callback array entry — not just the first — since
   multiple `.then` calls can each have added their own callback.
3. For the "handler returns a thenable" requirement, after calling
   `onFulfilled(value)` and getting some `result` back, check whether
   `result` has a callable `.then` method; if so, call
   `result.then(resolve, reject)` using the *new* promise's own
   `resolve`/`reject` (this is what "adopts" the inner thenable's
   eventual outcome instead of nesting it) — this exact check-and-adopt
   step is usually called the Promise Resolution Procedure and is the
   single trickiest part of a correct implementation.

## Algorithm

**Pattern:** a state machine (pending/fulfilled/rejected) with two
callback queues for the pending case, wired together by a `.then` that
always returns a brand-new promise and always defers execution to the
microtask queue.
**Core insight:** the entire implementation rests on one structural
fact — `.then` cannot know, at the time it's called, whether the
promise it's attached to has already settled or will settle later, so
it must handle both cases through the *same* mechanism. The trick is to
treat "already settled" as simply having its callback run on the next
microtask instead of queued for later: whether `.then` is called before
or after settlement, the handler is *always* scheduled via
`queueMicrotask`, either immediately (if already settled) or later,
when `resolve`/`reject` eventually drains the queued-callbacks arrays
(each queued entry itself schedules its own microtask at drain time).
This uniform "always go through a microtask" rule is also *why* real
Promises never run callbacks synchronously even for already-resolved
promises — it guarantees a promise's `.then` handler is never called
in the exact same synchronous tick that created it, which is essential
for predictable ordering in real code. Chaining works because every
`.then` call constructs and returns a *new* `MyPromise`, whose own
executor-equivalent logic settles based on: catching whatever the
current handler returns or throws, and — if that return value is
itself thenable — deferring to it via the Promise Resolution Procedure
(hint 3) rather than settling immediately with the thenable object
itself.
**Invariant:** once `#state` transitions away from `'pending'`, it
never changes again, and every callback ever queued for that promise
(regardless of when `.then` was called relative to settlement) runs
exactly once, asynchronously, with the same settled value/reason.

## Dry Run

**Input:**
```js
const p = new MyPromise((resolve) => {
  setTimeout(() => resolve(10), 50);
});

p.then((value) => value * 2).then((value) => console.log('Result:', value));
```

| Step | Time | Event | `p`'s `#state` | Callback queues |
|---|---|---|---|---|
| 1 | t=0 | `new MyPromise(...)` — executor runs synchronously, calls `setTimeout` (doesn't resolve yet) | `pending` | `[]` |
| 2 | t=0 | First `.then((v) => v*2)` called — `p` still pending, so the handler is pushed onto `p`'s `#onFulfilledCallbacks`; returns a new promise `p2` (also pending) | `pending` | `[handler1]` |
| 3 | t=0 | Second `.then((v) => console.log(...))` called on `p2` — `p2` is also still pending, so *that* handler is queued on `p2`'s own callback array | `pending` (both `p`, `p2`) | `p`: `[handler1]`, `p2`: `[handler2]` |
| 4 | t=50 | `setTimeout` fires, `resolve(10)` runs → `p.#state = 'fulfilled'`, `p.#value = 10`; drains `p`'s queue — schedules `handler1` via `queueMicrotask` | `fulfilled` | `p2`: `[handler2]` (still pending) |
| 5 | t=50 (microtask) | `handler1(10)` runs → returns `20`; this settles `p2` (`p2.#state = 'fulfilled'`, `p2.#value = 20`) and drains `p2`'s queue — schedules `handler2` via `queueMicrotask` | `p2: fulfilled` | `[]` |
| 6 | t=50 (next microtask) | `handler2(20)` runs → logs `"Result: 20"` | — | — |

**Result:** logs `"Result: 20"`, but only after two separate microtask
hops past the `setTimeout` firing — one for each link in the `.then`
chain — never synchronously, and never before `resolve(10)` actually
runs at t=50.

## JavaScript Solution

```js
const STATE = Object.freeze({
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
});

class MyPromise {
  #state = STATE.PENDING;
  #value;
  #onFulfilledCallbacks = []; // queued handlers, used only while pending
  #onRejectedCallbacks = [];

  constructor(executor) {
    const resolve = (value) => this.#settle(STATE.FULFILLED, value);
    const reject = (reason) => this.#settle(STATE.REJECTED, reason);

    try {
      executor(resolve, reject);
    } catch (error) {
      // A synchronous throw in the executor is treated as an immediate reject.
      reject(error);
    }
  }

  #settle(state, value) {
    if (this.#state !== STATE.PENDING) return; // settle exactly once

    // If resolving with a thenable, adopt ITS eventual outcome instead
    // of immediately fulfilling with the thenable object itself.
    if (state === STATE.FULFILLED && value && typeof value.then === 'function') {
      value.then(
        (innerValue) => this.#settle(STATE.FULFILLED, innerValue),
        (innerReason) => this.#settle(STATE.REJECTED, innerReason),
      );
      return;
    }

    this.#state = state;
    this.#value = value;

    const callbacks =
      state === STATE.FULFILLED ? this.#onFulfilledCallbacks : this.#onRejectedCallbacks;

    // Every callback queued while pending must now run, each on its own microtask.
    callbacks.forEach((callback) => queueMicrotask(callback));
    this.#onFulfilledCallbacks = [];
    this.#onRejectedCallbacks = [];
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          if (typeof onFulfilled === 'function') {
            resolve(onFulfilled(this.#value));
          } else {
            resolve(this.#value); // no handler: pass the value through unchanged
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = () => {
        try {
          if (typeof onRejected === 'function') {
            resolve(onRejected(this.#value));
          } else {
            reject(this.#value); // no handler: pass the reason through unchanged
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.#state === STATE.FULFILLED) {
        queueMicrotask(handleFulfilled); // already settled — still deferred
      } else if (this.#state === STATE.REJECTED) {
        queueMicrotask(handleRejected);
      } else {
        // Still pending — queue both; only the matching one will ever run,
        // once #settle() eventually schedules it.
        this.#onFulfilledCallbacks.push(() => queueMicrotask(handleFulfilled));
        this.#onRejectedCallbacks.push(() => queueMicrotask(handleRejected));
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally?.();
        return value;
      },
      (reason) => {
        onFinally?.();
        throw reason;
      },
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_resolve, reject) => reject(reason));
  }
}
```

## TypeScript Solution

```ts
type Executor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void,
) => void;

enum PromiseState {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

class MyPromise<T> {
  #state: PromiseState = PromiseState.Pending;
  #value: unknown;
  #onFulfilledCallbacks: Array<() => void> = [];
  #onRejectedCallbacks: Array<() => void> = [];

  constructor(executor: Executor<T>) {
    const resolve = (value: T | PromiseLike<T>): void =>
      this.#settle(PromiseState.Fulfilled, value);
    const reject = (reason?: unknown): void =>
      this.#settle(PromiseState.Rejected, reason);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #settle(state: PromiseState, value: unknown): void {
    if (this.#state !== PromiseState.Pending) return;

    if (
      state === PromiseState.Fulfilled &&
      value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      typeof (value as PromiseLike<unknown>).then === 'function'
    ) {
      (value as PromiseLike<unknown>).then(
        (innerValue: unknown) => this.#settle(PromiseState.Fulfilled, innerValue),
        (innerReason: unknown) => this.#settle(PromiseState.Rejected, innerReason),
      );
      return;
    }

    this.#state = state;
    this.#value = value;

    const callbacks =
      state === PromiseState.Fulfilled
        ? this.#onFulfilledCallbacks
        : this.#onRejectedCallbacks;

    callbacks.forEach((callback) => queueMicrotask(callback));
    this.#onFulfilledCallbacks = [];
    this.#onRejectedCallbacks = [];
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined,
    onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined,
  ): MyPromise<TResult1 | TResult2> {
    return new MyPromise<TResult1 | TResult2>((resolve, reject) => {
      const handleFulfilled = (): void => {
        try {
          if (typeof onFulfilled === 'function') {
            resolve(onFulfilled(this.#value as T));
          } else {
            resolve(this.#value as unknown as TResult1);
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (): void => {
        try {
          if (typeof onRejected === 'function') {
            resolve(onRejected(this.#value));
          } else {
            reject(this.#value);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.#state === PromiseState.Fulfilled) {
        queueMicrotask(handleFulfilled);
      } else if (this.#state === PromiseState.Rejected) {
        queueMicrotask(handleRejected);
      } else {
        this.#onFulfilledCallbacks.push(() => queueMicrotask(handleFulfilled));
        this.#onRejectedCallbacks.push(() => queueMicrotask(handleRejected));
      }
    });
  }

  catch<TResult = never>(
    onRejected?: (reason: unknown) => TResult | PromiseLike<TResult>,
  ): MyPromise<T | TResult> {
    return this.then(undefined, onRejected);
  }

  finally(onFinally?: () => void): MyPromise<T> {
    return this.then(
      (value) => {
        onFinally?.();
        return value;
      },
      (reason) => {
        onFinally?.();
        throw reason;
      },
    );
  }

  static resolve<T>(value: T | PromiseLike<T>): MyPromise<T> {
    if (value instanceof MyPromise) return value;
    return new MyPromise<T>((resolve) => resolve(value));
  }

  static reject<T = never>(reason?: unknown): MyPromise<T> {
    return new MyPromise<T>((_resolve, reject) => reject(reason));
  }
}
```

## Time Complexity

O(1) for `resolve`/`reject`/`.then` themselves in terms of algorithmic
steps, but settling a promise with `k` queued callbacks costs O(k) to
drain (each scheduled as its own microtask) — so a chain/fan-out of `n`
total `.then` calls across a promise graph does O(n) total work,
proportional to the number of registered callbacks, not the depth of
chaining alone.

## Space Complexity

O(n) — each pending promise retains its queued callback arrays until
settlement (proportional to how many `.then` calls were attached while
pending); each link in a chain also allocates one new `MyPromise`
instance, so a chain of length `n` holds O(n) promise objects.

## Common Mistakes

- Calling `onFulfilled`/`onRejected` **synchronously** inside `.then`
  when the promise is already settled, instead of always going through
  `queueMicrotask` — this breaks a real, load-bearing guarantee of the
  Promise spec (handlers never run in the same synchronous tick they
  were attached in), and it's the single most common way a "works in
  simple cases" polyfill fails once ordering actually matters (e.g.
  logging `"sync"` then `"promise"` instead of the reverse).
- Not queuing *multiple* pending `.then` callbacks — using a single
  `this.#onFulfilledCallback` variable (singular) instead of an array
  means only the *last* `.then` call attached while pending actually
  gets invoked; earlier ones are silently overwritten and never run.
- Forgetting the thenable-adoption step in `#settle` (or in `.then`'s
  handler) — resolving with another promise/thenable without unwrapping
  it produces a promise that fulfills with a *Promise object* as its
  value, instead of "flattening" into that inner promise's own eventual
  value — this is the classic "double-wrapped promise" bug.
- Not catching a thrown error inside `onFulfilled`/`onRejected` — a
  handler that throws must reject the *new* chained promise, not crash
  out of `.then()` entirely or silently swallow the error.
- Allowing `resolve`/`reject` to be called more than once (e.g. an
  executor that calls `resolve(1)` then later `resolve(2)`, or both
  `resolve` and `reject`) — without the `#state !== PENDING` guard at
  the top of `#settle`, later calls would overwrite an already-settled
  value, violating the "settle exactly once, permanently" rule that all
  downstream `.then` chains implicitly depend on.

## Interview Follow-up Questions

1. Why must `.then` callbacks always run asynchronously (as a
   microtask), even for an already-settled promise — what real bug
   would surface in ordinary code if they ran synchronously instead?
2. How would you implement `Promise.all`/`allSettled`/`race`/`any` on
   top of this `MyPromise` class rather than the native one?
3. What's the actual difference between the microtask queue
   (`queueMicrotask`, where real Promise callbacks run) and the macrotask
   queue (`setTimeout`), and why does that difference matter for
   ordering guarantees in real applications?
4. How would you add `async`/`await` support conceptually — what is
   `await` actually doing under the hood in terms of `.then`?
5. What is the Promise/A+ "thenable" concept, and why does the spec
   check for a callable `.then` method rather than checking
   `instanceof Promise` specifically — what real interop scenario does
   that enable?

## Similar Questions

- [Implement Promise.all (Polyfill)](promise-all-polyfill.md)
- [Implement Promise.allSettled (Polyfill)](implement-promise-allsettled-polyfill.md)
- Implement `Promise.race` / `Promise.any` (Polyfill)
- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md)

---
[← Back to 61-javascript-coding](README.md)
