# QADVJS053 · Object Observer via Proxy Reactivity Engine

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Salesforce, Adobe, Shopify  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** Proxy traps, Nested object wrapping, Effect tracking

## Expected Answer

A Proxy-based reactivity system — the core mechanism behind Vue 3's reactivity, and conceptually similar to how MobX and Solid track dependencies — wraps a plain object in a `Proxy` with `get` and `set` traps. During a reactive effect (a component render, a computed property, a watcher), every property read passes through the `get` trap, which records "this effect depends on this property," building a dependency graph as a natural side effect of the code simply running — not through static analysis. When a `set` trap later fires on a tracked property, the system looks up which effects depend on exactly that property and re-runs only those. This is dependency tracking — precise and push-based — not polling, which would mean repeatedly checking every value on a timer for changes.

## Deep Explanation

The actual mechanism: a global "current effect" pointer is set before an effect function runs. Every reactive object's `get` trap checks whether an effect is currently running, and if so, adds it to a `Map<property, Set<Effect>>` "dep" map for that object. The `set` trap looks up that property's dependent effects and triggers them to re-run — which itself resets and rebuilds their dependency set, since which properties get read can differ between runs (a conditional branch might read different properties depending on state). Nested objects are wrapped in Proxies lazily, only when actually accessed, rather than eagerly at creation, to avoid the cost of wrapping properties that are never touched. This differs fundamentally from Vue 2's `Object.defineProperty`-based reactivity, which had to define getter/setter pairs property-by-property up front and, as a result, couldn't detect new properties added after object creation or array index/length changes without special-cased workarounds. Proxy's `set`/`deleteProperty`/`has` traps intercept all property operations generically — including new-property addition and deletion — which fixes that entire gotcha class in one step.

## Production Example

Vue 3's rewrite from `Object.defineProperty`-based reactivity to `Proxy`-based reactivity was driven specifically by that Vue 2 limitation: in Vue 2, `this.items.push(x)` or `this.newProp = 'x'` on a reactive object silently didn't trigger reactivity unless the developer explicitly used `Vue.set()` — a well-known, real gotcha every Vue 2 developer eventually had to learn and work around. Proxy-based reactivity in Vue 3 makes both cases "just work," because the `set`/`deleteProperty` traps fire generically for any property mutation, not only ones that were defined as getter/setter pairs ahead of time.

## Best Practices

- Wrap only objects that genuinely need reactivity — large, effectively read-only config or constant data doesn't need Proxy overhead.
- Understand that the dependency graph is rebuilt on every effect re-run, so stale dependencies from a previous run (a branch that's no longer taken) are cleaned up automatically — this is what makes conditional/dynamic property access correctly tracked without manually declared dependency lists, unlike a static dependency-array approach.
- Avoid destructuring a reactive object's properties into plain local variables early, since that breaks the Proxy's ability to intercept future reads/writes on those values — this is exactly why Vue's Composition API needs a `toRefs`/`.value` convention around destructured reactive state.

## Trade-offs

Proxy-based reactivity buys fine-grained, exact dependency tracking — only effects that actually read a given property re-run, and any mutation including new-property addition is caught generically — at the cost of real per-access overhead, since every property `get`/`set` now goes through a trap function rather than a direct property access, and building/rebuilding the dependency graph on every effect run has its own cost. It's also fundamentally incompatible with certain patterns: destructured primitive values lose their reactive connection, since primitives can't be wrapped in a Proxy, which pushes an explicit unwrapping convention (`ref()`/`.value`) onto the API surface.

## Common Mistakes

- Describing this as "polling" or "checking for changes on an interval" rather than push-based tracking via traps — reactivity systems built this way never poll.
- Assuming the entire object tree is deeply wrapped in Proxies eagerly at creation — real implementations wrap nested objects lazily, only when accessed, for performance.
- Forgetting that primitives (numbers, strings) can't be wrapped in a Proxy at all, which is exactly why frameworks built this way need a separate boxed-value wrapper (`ref`) for reactive primitives.
- Assuming destructuring a reactive object preserves reactivity on the destructured values — it doesn't, since the Proxy's traps are tied to property access on the original object, not to the extracted value.

## Follow-up Questions

1. Why does the dependency graph need to be rebuilt on every effect re-run, rather than computed once?
2. How does this Proxy-based approach fix Vue 2's "can't detect new-property/array-index changes" limitation?
3. Why can't primitive values be wrapped in a Proxy, and how do frameworks work around that?
4. What's the performance cost of wrapping every nested object in a Proxy, and how is it mitigated?
5. How does this dependency-tracking approach differ from React's explicit dependency arrays (`useEffect`)?

## Related Topics

- Proxy and Reflect API for metaprogramming (03-advanced-javascript — the general-purpose version of this pattern)
- React's explicit dependency model (`useEffect`)
- WeakMap and WeakSet garbage collection (used for dependency-map storage in real implementations)
- Virtual DOM diffing and patch algorithm fundamentals (03-advanced-javascript)
