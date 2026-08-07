# S6105 · Array.prototype.flat and flatMap

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Flattening nested arrays natively, with or without a preceding map step.

## Expected Answer

flat(depth) flattens nested arrays up to a given depth, and flatMap(fn) combines a map step with a one-level flatten in a single pass.

## Deep Explanation

`arr.flat(depth)` flattens nested arrays up to the given depth (default 1; `Infinity` flattens fully). `arr.flatMap(fn)` is equivalent to `arr.map(fn).flat(1)` but performs both in a single, slightly more efficient pass — commonly used when a mapping function itself returns an array per element (e.g. splitting each string into words).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array.prototype.flat and flatMap.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. flatMap is the idiomatic way to both filter and map in one step when a callback can return an empty array to 'drop' an element and a single-item array to 'keep/transform' it — avoiding a separate `.filter().map()` chain for that specific pattern.

## Related Topics

- JavaScript Fundamentals
