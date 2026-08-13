# QADVJS043 · Proxy and Reflect API for Metaprogramming and Reactive State

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Salesforce, Adobe, Meta  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** Proxy, Reflect, Trap handlers, Reactivity engines, Metaprogramming

## Expected Answer

A `Proxy` wraps a target object and lets you intercept fundamental operations on it — property reads (`get`), writes (`set`), existence checks (`has`, for the `in` operator), deletion (`deleteProperty`), function calls (`apply`), and construction (`construct`), among others — via a handler object of trap functions. `Reflect` is a companion built-in providing the default implementation of each of those same operations as plain functions (`Reflect.get`, `Reflect.set`, and so on). Inside a Proxy trap, you typically call the matching `Reflect` method to forward the operation with its correct default behavior — including correctly preserving `this`/receiver semantics — rather than reimplementing that behavior by hand, which is easy to get subtly wrong.

## Deep Explanation

The real trap surface includes `get`, `set`, `has`, `deleteProperty`, `ownKeys`, `getOwnPropertyDescriptor`, `defineProperty`, `apply` (intercepting function calls), and `construct` (intercepting `new`). `Reflect.get(target, prop, receiver)` matters specifically because passing the correct `receiver` — the original proxy, not the raw target — ensures that if `target`'s own getter internally reads `this.otherProp`, that access is also correctly routed back through the proxy's traps rather than silently bypassing them; hand-written forwarding like `return target[prop]` gets this wrong in the presence of inherited getters/setters. The Proxy spec also enforces real invariants — a trap cannot report a non-configurable, non-writable property as having a different value than it actually has — and violating one throws a `TypeError`, which keeps the abstraction consistent with the object model even when a trap tries to lie about it.

## Production Example

Beyond reactive-state tracking (the specific application covered in this repo's Proxy-reactivity page), real uses include input validation — a `set` trap that rejects or throws on an assignment failing a schema check, centralizing validation instead of scattering `if` checks across every write site; logging and tracing — a `get`/`apply` trap that transparently logs every property access or function call on an object for debugging or auditing, without modifying the object's own source, useful for instrumenting a third-party library's object without forking it; and negative array indices — a Proxy whose `get` trap translates `arr[-1]` into `arr[arr.length - 1]`, a pattern some utility libraries use to add Python-like negative indexing without altering how the underlying array behaves for normal positive-index access.

## Best Practices

- Always use the matching `Reflect` method inside a trap to forward default behavior (`Reflect.get(target, prop, receiver)`) instead of hand-writing the equivalent, so `this`/receiver semantics and inherited accessors behave correctly.
- Keep traps narrowly scoped to one concern — validation, or logging, but not both bundled into a single Proxy — since combining unrelated behaviors into one wrapper becomes hard to reason about.
- Factor in that `Proxy` cannot be fully polyfilled for older environments, unlike most other modern JS features, because its interception happens at the object-operation level, which can't be emulated after the fact — this matters for browser-support decisions.

## Trade-offs

Proxy gives genuinely powerful interception that's otherwise impossible in JavaScript — there's no other way to intercept `get`/`set`/`has` on arbitrary, even not-yet-existing, properties, short of `Object.defineProperty`'s far more limited, per-property-only equivalent — at the cost of real per-operation performance overhead on every trapped operation, and reduced debuggability, since a Proxy shows up wrapped in a stack trace or DevTools object inspector, one more layer to reason through when something goes wrong. It also cannot be polyfilled, which rules it out for codebases that must support older engines lacking it.

## Common Mistakes

- Forwarding a trap's default behavior by directly accessing `target[prop]`/`target[prop] = value` instead of `Reflect.get`/`Reflect.set`, which breaks for objects with inherited getters/setters because `this` inside the getter resolves to `target`, not the original proxy.
- Forgetting that traps have real invariant constraints — a `get` trap can't report a different value than the real one for a non-configurable, non-writable property — and being surprised when a "clever" trap throws a `TypeError`.
- Conflating Proxy (interception of operations) with `Object.defineProperty` (defining a single property's getter/setter) as if they're the same mechanism at different verbosity — Proxy intercepts operations on properties that don't even exist yet, while `defineProperty` only affects properties explicitly defined.

## Follow-up Questions

1. Why should you use `Reflect.get` inside a `get` trap instead of directly returning `target[prop]`?
2. What invariant does the Proxy spec enforce around non-configurable properties, and what happens if a trap violates it?
3. How would you implement a validating Proxy that rejects invalid property assignments?
4. Why can't Proxy be polyfilled for older browsers the way most other ES2015+ features can?
5. What's the difference in capability between Proxy's `set` trap and `Object.defineProperty`'s setter?

## Related Topics

- Object Observer via Proxy Reactivity Engine (03-advanced-javascript — the reactivity-specific application of this API)
- Immutability mechanics and `Object.freeze` (02-javascript-fundamentals)
- WeakMap and WeakSet garbage collection mechanics (03-advanced-javascript)
