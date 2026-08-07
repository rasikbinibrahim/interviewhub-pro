# S6072 · WeakMap Use Cases

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Collections (Map/Set/WeakMap/WeakSet)  

## Question

A Map variant whose object keys don't prevent garbage collection.

## Expected Answer

WeakMap only accepts object keys and holds weak references to them, so entries are automatically garbage collected once their key object is no longer referenced elsewhere.

## Deep Explanation

A `WeakMap` only accepts objects as keys, and holds a 'weak' reference to them — if a key object has no other references anywhere in the program, it (and its associated value) is eligible for garbage collection, and the entry silently disappears from the WeakMap. It's also non-enumerable — there's no way to iterate or get the size of a WeakMap.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying WeakMap Use Cases.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The canonical use case is attaching private metadata to an object without preventing that object from being garbage collected when the rest of the app is done with it — e.g. storing DOM-element-to-event-handler mappings, or a component instance's private state, without creating a memory leak if the element/instance is later removed.

## Related Topics

- JavaScript Fundamentals
