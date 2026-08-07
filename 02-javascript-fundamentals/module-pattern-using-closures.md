# S6009 · Module Pattern using Closures

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Scope & Closures  

## Question

Using an IIFE and closures to expose a controlled public API while hiding internal state.

## Expected Answer

The module pattern uses an IIFE's closure to keep internal state private while exposing only selected methods on the returned object.

## Deep Explanation

The module pattern uses an IIFE that returns an object literal. Variables declared inside the IIFE but not returned remain private, accessible only through the closures formed by the returned methods — giving true encapsulation before ES modules or private class fields existed.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Module Pattern using Closures.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Every property on the returned object is a fresh closure holding a reference to the same shared lexical environment, so all exposed methods can read/mutate the same private state without any of it leaking to the global scope.

## Related Topics

- JavaScript Fundamentals
