# QADVJS040 · Memoization Pattern and Cache Eviction Strategies

**Difficulty:** Medium  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Amazon, Meta  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** Memoization, Cache eviction, LRU Cache, WeakMap keying

## Expected Answer

Memoization caches the result of a pure function keyed by its arguments, so a repeated call with the same arguments returns the cached result instead of recomputing — a direct time-for-space trade. It's only correct for pure functions (same input always produces the same output, no reliance on or mutation of external state), since otherwise the cache can return a stale or wrong result. Real memoization always needs an eviction strategy, because an unbounded cache that never removes entries is a memory leak — it grows forever as new argument combinations are seen.

## Deep Explanation

An unbounded `Map`-based cache is the simplest form, but it grows without limit — a real risk if arguments are effectively unique per call (e.g., memoizing per-request computation in a long-lived server process). LRU (least-recently-used) eviction bounds memory to a fixed size by evicting the entry that hasn't been accessed longest whenever the cache is full; it needs real bookkeeping to track access order efficiently, typically a doubly-linked list combined with a hash map to get O(1) `get`/`put`. TTL (time-to-live) eviction expires entries after a fixed duration, which is the right model when the underlying data can go stale over time even though the function's inputs haven't changed — for example, memoizing a currency-conversion rate lookup for 60 seconds. WeakMap-keyed memoization, when the cache key is an object reference, lets entries be garbage collected automatically once nothing else references the key object, sidestepping manual eviction entirely for that specific shape of problem.

## Production Example

React's `useMemo`/`React.memo` memoize a computed value or a component's rendered output, keyed by a dependency array or props, to avoid expensive recomputation or re-rendering when nothing relevant changed. Redux's `reselect` library memoizes derived-state selectors — for example, a selector computing a filtered and sorted list from a large normalized store — keyed by reference equality of its inputs, so components subscribed via `useSelector` don't recompute or re-render when unrelated parts of the store change. Both are, functionally, small caches that typically remember only the last call's inputs rather than an unbounded history, which is a deliberate choice: most component re-renders only need to compare against the immediately previous render.

## Best Practices

- Memoize only genuinely pure, deterministic functions — memoizing something with side effects or non-deterministic output produces subtly wrong cached results that are hard to trace back to the cache.
- Choose the eviction strategy based on actual risk: unbounded is fine for a small, truly finite key space (memoizing Fibonacci by a bounded integer input); LRU or a size cap for high-cardinality or user-generated keys; TTL when the correct answer changes over time even for the same input.
- Measure before adding memoization — the bookkeeping and argument-comparison overhead per call can make an already-cheap function slower, not faster.

## Trade-offs

Memoization trades memory for CPU time — deliberately holding onto past results to avoid recomputation, which is a net win only when the function is expensive relative to cache lookup/storage cost and arguments repeat often enough to produce real cache hits. LRU adds real bookkeeping on every `get`/`put` compared to a plain unbounded `Map`, in exchange for bounded, predictable memory. TTL adds the cost of tracking timestamps and either a background sweep or per-access staleness check, in exchange for correctness on data that changes over time.

## Common Mistakes

- Memoizing an impure function — one with side effects or a result dependent on external mutable state — and getting subtly stale or wrong results.
- Using an unbounded cache for a function called with high-cardinality or effectively-infinite arguments (per-user-ID computation in a long-running server process) with no eviction at all, which is a real production memory leak.
- Forgetting that memoizing a function with object/array arguments defaults to reference-identity keys — two structurally-equal-but-different-reference objects are treated as distinct cache entries unless a value-based key (like `JSON.stringify(args)`) is deliberately implemented, which has its own cost and ordering pitfalls.
- Reaching for `useMemo` in React for genuinely cheap computations, where the dependency-array comparison overhead exceeds the cost of simply recomputing.

## Follow-up Questions

1. Why must the memoized function be pure for the cache to remain correct?
2. How would you implement an LRU cache with O(1) `get` and `put`?
3. When would you choose TTL-based eviction over LRU?
4. Why does `reselect`'s default memoization remember only the last call's inputs rather than caching every past call?
5. What cache-key strategy would you use for a function that takes an object as an argument?

## Related Topics

- WeakMap and WeakSet garbage collection mechanics (03-advanced-javascript)
- React re-render optimization and `useMemo`
- Redux and `reselect` derived-state selectors (63-react-coding)
- Dynamic programming / memoization as a DP technique (65-dsa)
