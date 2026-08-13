# QADVJS045 · WeakMap and WeakSet Garbage Collection Mechanics

**Difficulty:** Medium  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** WeakMap, WeakSet, Weak references, Garbage collection, Object keying

## Expected Answer

A regular `Map` or `Set` holds a strong reference to every key (and, for `Map`, retains the associated value) — as long as the `Map`/`Set` itself is reachable, every key it holds is kept alive by the garbage collector, even if nothing else in the program still references that key. `WeakMap` and `WeakSet` instead hold weak references to their keys, which must be objects rather than primitives: once a key object has no other strong references anywhere in the program, the garbage collector is free to reclaim it, and its entry is automatically removed. Neither type can be iterated, and neither exposes a `size`, specifically because entries can disappear at GC-determined, non-deterministic times.

## Deep Explanation

Under reachability-based garbage collection (mark-and-sweep), the collector deliberately does not count a `WeakMap`/`WeakSet`'s reference to a key toward that object's reachability — so a key object with no other strong references becomes eligible for collection even while it's still, at that instant, present as a key. Its entry is cleaned up as part of collecting the key itself. This is also why `WeakMap`/`WeakSet` deliberately expose no `.size`, `.keys()`, or `.forEach()`: enumeration would require the engine to guarantee a consistent snapshot of currently-alive entries at a specific moment, which conflicts with the GC being free to run and reclaim entries at unpredictable times. `WeakMap` keys must be objects (or, more recently, registered symbols) because a primitive like a string has no independent identity for the engine to garbage-collect separately from other equal values — there's no single object whose lifetime the weak reference could track.

## Production Example

Attaching private or per-instance metadata to an object without extending its lifetime is a classic real use case — a library caching computed data about DOM elements (element sizes, event-listener bookkeeping, an "already initialized" flag) keyed by the actual element object in a `WeakMap`. If that DOM element is later removed from the document and every other reference to it drops, the `WeakMap` entry doesn't keep it alive the way a regular `Map` would. Using a regular `Map` for this would silently leak every DOM node the library ever touched, growing memory forever in a long-lived single-page app that creates and destroys many elements over its session — exactly the kind of leak that's easy to miss in development and only shows up as slow memory growth in production after hours of real usage.

## Best Practices

- Default to `WeakMap`/`WeakSet` specifically when the key set is "objects whose lifetime you don't control and don't want to influence" — DOM nodes, objects passed in by consuming code, class instances managed elsewhere.
- Use a regular `Map`/`Set` when enumeration, size tracking, or primitive keys are genuinely needed, or when the collection is meant to keep its entries alive deliberately, such as a true singleton registry meant to last the program's lifetime.
- Don't reach for `WeakMap` as a default cache replacement for `Map` without a deliberate reason — the lack of enumeration and size is a real capability loss that should be a conscious trade for leak-avoidance, not a reflexive habit.

## Trade-offs

`WeakMap`/`WeakSet` trade away enumerability, size tracking, and iteration — real, sometimes-needed capabilities — specifically to gain automatic, leak-free lifetime coupling to the key object. For the DOM-metadata/private-state use case this is a strict win, but for a use case that genuinely needs to list everything currently cached (a debug panel showing "here's everything in the cache right now"), `WeakMap` is structurally the wrong tool, since that list cannot be extracted from it. Regular `Map`/`Set` are simpler and more capable but require manual eviction discipline to avoid unbounded growth, which is easy to forget.

## Common Mistakes

- Assuming `WeakMap` entries are removed the instant a key becomes unreferenced — removal actually happens whenever the garbage collector runs and decides to collect that object, which is non-deterministic and not something code should rely on for timing; claiming this is synchronous is a common wrong answer.
- Trying to iterate, get the size of, or list the keys of a `WeakMap`/`WeakSet`, forgetting these operations don't exist by design.
- Using `WeakMap` with primitive keys (strings, numbers) — this throws, since `WeakMap` requires object keys.
- Using a regular `Map` for a large, long-lived DOM-node-keyed cache and being surprised by a slow memory leak that only appears after extended real usage.

## Follow-up Questions

1. Why does `WeakMap` not support `.size` or iteration, when `Map` does?
2. Exactly when is a `WeakMap` entry actually removed — is it synchronous with the key becoming unreferenced?
3. Why must `WeakMap` keys be objects and not primitives?
4. Give a real example where using `Map` instead of `WeakMap` would cause a memory leak.
5. How do `WeakRef` and `FinalizationRegistry` relate to, and differ from, `WeakMap`/`WeakSet`?

## Related Topics

- Memoization pattern and cache eviction strategies (03-advanced-javascript)
- Garbage collection fundamentals (mark-and-sweep reachability)
- Immutability mechanics and `Object.freeze` (02-javascript-fundamentals)
- Proxy and Reflect API for metaprogramming (03-advanced-javascript)
