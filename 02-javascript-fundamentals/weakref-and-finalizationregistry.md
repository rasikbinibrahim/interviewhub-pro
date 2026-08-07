# S6007 · WeakRef and FinalizationRegistry

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

Holding a reference to an object without preventing it from being garbage collected.

## Expected Answer

WeakRef holds a non-owning reference to an object so it can still be garbage collected, and FinalizationRegistry lets you run cleanup code after that collection happens.

## Deep Explanation

A WeakRef wraps an object so that the reference does not count toward keeping it alive — the engine may still collect it. FinalizationRegistry lets you register a callback that runs (at an unspecified, GC-driven time) after an object has been collected, useful for cleanup like releasing native resources tied to a JS object.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying WeakRef and FinalizationRegistry.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Both are explicitly documented as not-guaranteed-to-run-promptly (or at all, e.g. at page unload) — never use FinalizationRegistry for correctness-critical logic like releasing a lock; it's strictly a memory-optimization / debugging aid, and caching is the far more common legitimate use case for WeakRef.

## Related Topics

- JavaScript Fundamentals
