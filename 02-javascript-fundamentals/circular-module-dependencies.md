# S6028 · Circular Module Dependencies

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

What happens when module A imports module B and B imports A.

## Expected Answer

Circular imports resolve to a partially-initialized module on one side of the cycle; ESM's live bindings mean that value updates once the cycle finishes evaluating, while CJS may permanently see a stale snapshot.

## Deep Explanation

When modules form a cycle, the engine breaks the loop by returning a partially-populated module for whichever side is still being evaluated when the cycle is detected. In ESM, thanks to live bindings, the importing side sees an initial `undefined`/TDZ-like state for values not yet assigned, but the binding updates automatically once the exporting module finishes running.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Circular Module Dependencies.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. CommonJS handles this worse than ESM: because CJS exports a value snapshot at require-time, a circular require can capture `module.exports` before the other module finished populating it, silently freezing in an incomplete/empty object — a classic source of 'why is this undefined' bugs in large Node codebases.

## Related Topics

- JavaScript Fundamentals
