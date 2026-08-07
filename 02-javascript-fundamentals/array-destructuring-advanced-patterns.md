# S6106 · Array Destructuring Advanced Patterns

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Skipping elements, default values, nested patterns, and rest collection in destructuring.

## Expected Answer

Array destructuring can skip elements with blank commas, apply default values, destructure nested arrays, and collect remaining elements with a rest pattern, all in one expression.

## Deep Explanation

Array destructuring supports skipping elements with empty commas (`const [, second] = arr`), default values for missing/undefined elements (`const [a = 10] = arr`), nested destructuring (`const [[a, b]] = [[1, 2]]`), and collecting the remainder with rest (`const [first, ...rest] = arr`) — all combinable in a single pattern.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array Destructuring Advanced Patterns.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A frequently-missed detail: default values only kick in for `undefined`, not for other falsy values or `null` — `const [a = 5] = [null]` gives `a === null`, not `5`, which is the same semantic as default function parameters and a common source of confusion when API data might explicitly contain `null`.

## Related Topics

- JavaScript Fundamentals
