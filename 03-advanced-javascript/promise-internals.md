# Promise Internals

> Core-depth topic — see [TEMPLATE.md](../TEMPLATE.md) for the full-depth
> section list.

## Theory

A Promise is a state machine with exactly three states — **pending**,
**fulfilled**, **rejected** — that starts pending and can transition
**exactly once** to fulfilled or rejected (collectively, "settled"). Once
settled, its value/reason is permanently locked; further `resolve`/`reject`
calls are silently ignored. `.then()` callbacks always run asynchronously,
via the microtask queue, even if the Promise was already settled when
`.then()` was called.

## Real-world Example: implementing a minimal Promise

```js
class MyPromise {
  #state = 'pending';
  #value;
  #callbacks = [];

  constructor(executor) {
    const resolve = (val) => this.#settle('fulfilled', val);
    const reject = (err) => this.#settle('rejected', err);
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  #settle(state, value) {
    if (this.#state !== 'pending') return; // one-shot: ignore further calls
    this.#state = state;
    this.#value = value;
    queueMicrotask(() => this.#callbacks.forEach((cb) => cb()));
  }

  then(onFulfilled, onRejected) {
    const run = () => {
      if (this.#state === 'fulfilled') onFulfilled?.(this.#value);
      if (this.#state === 'rejected') onRejected?.(this.#value);
    };
    if (this.#state === 'pending') this.#callbacks.push(run);
    else queueMicrotask(run); // still async, even if already settled
  }
}

new MyPromise((resolve) => resolve(42)).then(console.log); // 42
```

The two details every hand-rolled implementation has to get right: (1)
`resolve`/`reject` must be idempotent, and (2) callbacks registered
*after* the Promise already settled still have to fire asynchronously —
never synchronously, even though the value is already known.

## Interview Questions — Basic

1. What are the three states of a Promise, and can it move between them
   more than once?
2. What happens if `resolve()` is called twice?
3. Does `.then()` always run asynchronously, even on an already-resolved
   Promise?

## Interview Questions — Medium

1. Implement `Promise.all` from scratch (resolves with all values in
   order, rejects as soon as any one input rejects).
2. What's the difference in behavior between `Promise.all`,
   `Promise.allSettled`, `Promise.race`, and `Promise.any`?
3. Why must a `.then()` handler `return` a value (or another Promise) to
   pass it down the chain — what happens if it forgets to?

## Interview Questions — Advanced

1. Implement the `MyPromise` class above from memory, including the
   microtask-timing requirement — most incomplete implementations get the
   "callbacks must always be async" detail wrong.
2. Explain exactly why returning a Promise from inside a `.then()`
   handler "flattens" the chain — what is the engine doing with that
   returned Promise before calling the next handler?
3. An unhandled Promise rejection with no `.catch()` anywhere in the chain
   triggers `unhandledrejection` in browsers. Design a global handling
   strategy for a production app, and explain its limits (it's a safety
   net for bugs, not a substitute for handling errors at the call site).

## Common Mistakes

- Forgetting `return` inside a `.then()` handler that kicks off further
  async work — the next `.then()` in the chain runs with the wrong
  (already-resolved-to-`undefined`) value instead of waiting.
- Nesting `.then()` calls instead of chaining them — reintroduces
  callback-pyramid complexity and breaks linear error propagation.
- Calling an `async` function without `await`-ing or `.catch()`-ing it
  ("fire and forget") — any rejection inside it becomes an unhandled
  rejection, silently.

## Best Practices

- Always `return` from `.then()` handlers that produce a value or start
  further async work — this is what makes the chain "flatten" correctly.
- Prefer `Promise.all`/`allSettled` over sequentially `await`-ing
  independent async calls in a loop — the latter needlessly serializes
  work that could run concurrently.
- Attach a global `unhandledrejection` (browser) or
  `process.on('unhandledRejection', ...)` (Node) handler in production as
  a last-resort logging net — never as your primary error-handling
  strategy.

## Senior-level Discussion

Being able to implement a minimal Promise from scratch — correctly,
including the async-callback-on-already-settled-Promise detail — is one
of the more discriminating "advanced JS" interview exercises, because it's
easy to get 90% right and still miss the one detail (always-async
callbacks) that proves real understanding versus memorized Promise usage.

## References

- [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promises/A+ specification](https://promisesaplus.com/)
- [ECMA-262 — Promise Objects](https://tc39.es/ecma262/#sec-promise-objects)

---
[← Back to 03-advanced-javascript](README.md)
