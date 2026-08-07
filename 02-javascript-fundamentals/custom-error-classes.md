# S6098 · Custom Error Classes

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Error Handling  

## Question

Extending the built-in Error class to create domain-specific, identifiable error types.

## Expected Answer

Custom error classes extend Error to create identifiable, instanceof-checkable error types that can carry extra structured metadata beyond a plain message string.

## Deep Explanation

Extending `Error` (`class ValidationError extends Error`) lets you create named, identifiable error types that still work with `instanceof`, carry a proper `.stack` trace, and can attach extra structured metadata (error codes, field names) beyond the plain `.message` string. The constructor must call `super(message)` first to correctly initialize the base Error's message and stack.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Custom Error Classes.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. In transpiled/older-target builds (targeting ES5), `class CustomError extends Error` can break `instanceof` checks unless `Object.setPrototypeOf(this, CustomError.prototype)` is explicitly called in the constructor — a well-known TypeScript/Babel gotcha worth knowing when debugging why `err instanceof ValidationError` unexpectedly returns false in a compiled bundle.

## Related Topics

- JavaScript Fundamentals
