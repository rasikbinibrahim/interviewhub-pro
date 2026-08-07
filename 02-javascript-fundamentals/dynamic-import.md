# S6026 · Dynamic import()

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

Loading a module on demand at runtime instead of at the top of the file.

## Expected Answer

import() dynamically and asynchronously loads a module at runtime, returning a Promise, unlike the statically-analyzed top-level import statement.

## Deep Explanation

`import()` is a function-like operator that asynchronously loads a module and returns a Promise resolving to its module namespace object. Unlike static `import` statements, it can be called conditionally, inside functions, or with a runtime-computed path — the foundation of code-splitting and lazy loading in bundlers.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Dynamic import().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because it's a real expression (not a statement), dynamic import can be conditioned on runtime logic — e.g. loading a heavy chart library only when a user navigates to the analytics tab — which is exactly how React.lazy() and most router-level code splitting are implemented under the hood.

## Related Topics

- JavaScript Fundamentals
