# S6114 · map() vs forEach(): Performance & Semantics

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Array Methods  

## Question

Why map returns a new array while forEach doesn't, and when to use each.

## Expected Answer

map() returns a new transformed array and should be used when you need that array; forEach() returns undefined and exists purely for side effects, with no transformation intent.

## Deep Explanation

`map()` returns a brand-new array built from the callback's return values, and is intended for transforming data immutably. `forEach()` always returns `undefined` and exists purely for running side effects per element — using `map()` when you discard the result (not assigning it) is a semantic mismatch that misleads readers into thinking a transformation is happening.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying map() vs forEach(): Performance & Semantics.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Using `map()` purely for side effects (and ignoring the returned array) is a common code-smell flagged in reviews — it implies to readers that a new array is being produced and used somewhere, when really `forEach()` (or a plain `for...of` loop, which also supports `break`/`continue`, unlike either array method) communicates intent more accurately.

## Related Topics

- JavaScript Fundamentals
