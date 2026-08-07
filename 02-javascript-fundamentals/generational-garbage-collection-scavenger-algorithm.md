# S6006 · Generational Garbage Collection (Scavenger Algorithm)

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

How V8 splits the heap into young and old generations for faster collection.

## Expected Answer

V8 collects short-lived objects cheaply in a young generation (Scavenger) and long-lived survivors less often in an old generation (mark-sweep-compact).

## Deep Explanation

V8 splits the heap into a small 'young generation' (further split into 'nursery' and 'intermediate' spaces) and a larger 'old generation'. Most objects die young, so the young generation is collected frequently with a fast copying algorithm called Scavenger. Objects that survive two GC cycles are promoted to the old generation, which is collected less often using the slower mark-sweep-compact algorithm.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Generational Garbage Collection (Scavenger Algorithm).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This generational hypothesis — 'most objects die young' — is why creating throwaway objects in hot loops (e.g. inside render functions) is usually cheap, but accidentally keeping references alive (closures, caches, global arrays) forces promotion to the old generation, which is far more expensive to collect.

## Related Topics

- JavaScript Fundamentals
