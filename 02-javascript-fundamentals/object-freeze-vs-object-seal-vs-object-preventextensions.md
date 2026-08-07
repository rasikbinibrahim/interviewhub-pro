# S6078 · Object.freeze vs Object.seal vs Object.preventExtensions

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

Three progressively looser levels of restricting an object's mutability.

## Expected Answer

preventExtensions blocks new properties only; seal additionally blocks deletion; freeze additionally blocks value changes too — each level is strictly more restrictive than the last.

## Deep Explanation

`Object.preventExtensions()` only blocks adding new properties — existing ones can still be modified or deleted. `Object.seal()` additionally blocks deletion (but allows value changes on existing writable properties). `Object.freeze()` is the strictest — it also blocks value changes, making existing properties fully read-only. Each is a strict superset of restrictions over the previous.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.freeze vs Object.seal vs Object.preventExtensions.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. All three checks can be queried at runtime with `Object.isExtensible()`, `Object.isSealed()`, and `Object.isFrozen()` respectively — useful in defensive code or tests that need to assert an object's mutability guarantees haven't been accidentally weakened somewhere else in the codebase.

## Related Topics

- JavaScript Fundamentals
