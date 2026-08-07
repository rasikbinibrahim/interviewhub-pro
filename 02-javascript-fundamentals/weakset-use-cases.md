# S6073 · WeakSet Use Cases

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Collections (Map/Set/WeakMap/WeakSet)  

## Question

A Set variant that only holds objects and doesn't prevent them from being garbage collected.

## Expected Answer

WeakSet stores objects weakly (allowing garbage collection) and supports only add/has/delete — no iteration — commonly used to tag objects as 'already processed' without leaking memory.

## Deep Explanation

A `WeakSet` stores only objects (no primitives), holds them weakly (they can still be garbage collected if unreferenced elsewhere), and is non-enumerable/non-iterable — you can only `add`, `has`, and `delete`, never list or count its contents. It's commonly used to mark or tag objects (e.g. 'has this object already been processed?') without leaking memory.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying WeakSet Use Cases.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A practical pattern is using a WeakSet to prevent processing the same object twice in a recursive traversal (e.g. detecting circular references while walking a graph/tree) without needing to manually clean up the tracking set afterward — once the objects go out of scope, the WeakSet entries vanish on their own.

## Related Topics

- JavaScript Fundamentals
