# S6095 · Writing Polyfills: General Approach

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Polyfills  

## Question

The standard defensive pattern for implementing a missing built-in method.

## Expected Answer

A polyfill checks for the feature's existence first, then defines a spec-matching implementation on the relevant prototype only if it's missing, so native support always takes priority.

## Deep Explanation

A polyfill checks whether a feature already exists (`if (!Array.prototype.myMethod)`) before defining it, ensuring native implementations are always preferred over the polyfill (native is faster and more spec-compliant). It's then attached to the appropriate prototype so it behaves exactly like a real built-in method for any instance.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Writing Polyfills: General Approach.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A correct polyfill should replicate the *exact* spec behavior including edge cases (e.g. sparse arrays, `this` context, thisArg parameter support) — interviewers use polyfill questions specifically to check whether a candidate reads the spec carefully or just approximates the happy path.

## Related Topics

- JavaScript Fundamentals
