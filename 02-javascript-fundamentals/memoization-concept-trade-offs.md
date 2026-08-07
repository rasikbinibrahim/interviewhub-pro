# S6049 · Memoization (Concept & Trade-offs)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Functional Programming  

## Question

Caching a function's results by its arguments to avoid recomputation.

## Expected Answer

Memoization caches a pure function's return value by its input arguments so repeated calls with the same arguments skip recomputation.

## Deep Explanation

Memoization wraps a pure function with a cache (usually a Map keyed by serialized/stringified arguments) — on each call, it first checks whether that argument combination was already computed and returns the cached result instead of recomputing. It only works correctly for pure functions, since it assumes identical inputs always produce identical outputs.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Memoization (Concept & Trade-offs).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The trade-off is memory for speed — an unbounded cache on a function called with many unique argument combinations (e.g. keyed by user-specific data) can leak memory in a long-lived process, so production memoization typically uses an LRU cache or WeakMap (for object keys) with a bounded size instead of a plain growing Map.

## Related Topics

- JavaScript Fundamentals
