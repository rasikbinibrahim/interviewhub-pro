# S6086 · Array.isArray() vs typeof for Arrays

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Type Coercion  

## Question

Why typeof cannot reliably distinguish arrays from plain objects.

## Expected Answer

typeof returns 'object' for both arrays and plain objects, so Array.isArray() is the only reliable way to check for an array — and it also works correctly across iframes/realms, unlike instanceof.

## Deep Explanation

`typeof []` returns `'object'`, exactly the same as `typeof {}`, because arrays are technically a specialized kind of object internally — `typeof` cannot tell them apart. `Array.isArray()` correctly identifies arrays by checking their internal `[[Class]]`, and unlike `instanceof Array`, it works correctly even across different realms (e.g. an array created inside an iframe).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array.isArray() vs typeof for Arrays.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This cross-realm correctness is the real reason `Array.isArray()` exists rather than everyone just using `instanceof Array` — an array constructed in a different `window`/realm has a different `Array` constructor reference, so `instanceof` fails there even though `Array.isArray()` still correctly returns true.

## Related Topics

- JavaScript Fundamentals
