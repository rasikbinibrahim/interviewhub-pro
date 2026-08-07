# S6074 · WeakMap vs Map: Key Differences

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Collections (Map/Set/WeakMap/WeakSet)  

## Question

Comparing garbage collection behavior, key types, and iterability side by side.

## Expected Answer

Map is iterable and holds strong references to any key type; WeakMap only accepts object keys, holds weak references so entries can be garbage collected, and is intentionally non-iterable.

## Deep Explanation

Map accepts any value as a key (primitives or objects), holds strong references (keys stay alive as long as the Map exists), and is fully iterable with a `.size` property. WeakMap only accepts objects as keys, holds weak references (doesn't prevent garbage collection), and is deliberately non-iterable with no `.size` — a direct trade-off between introspectability and automatic memory safety.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying WeakMap vs Map: Key Differences.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. WeakMap's lack of iteration isn't an oversight — it's a deliberate spec decision, because if you could enumerate a WeakMap's keys, you could observe exactly when garbage collection happened (a non-deterministic, engine-specific detail), which the spec intentionally hides from JavaScript code.

## Related Topics

- JavaScript Fundamentals
