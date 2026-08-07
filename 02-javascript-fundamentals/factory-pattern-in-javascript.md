# S6062 · Factory Pattern in JavaScript

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Design Patterns  

## Question

Centralizing object creation logic behind a function instead of direct constructors.

## Expected Answer

A factory function centralizes object-creation logic, deciding what kind of object to build and how to configure it, so callers don't need to know constructor details.

## Deep Explanation

A factory function encapsulates the logic for deciding *which* type of object to create and how to configure it, returning a fully-formed object without the caller needing to know the concrete class or constructor details. This decouples object creation from usage, making it easy to swap implementations or add new variants in one place.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Factory Pattern in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Factories are especially valuable when object creation involves conditional logic based on runtime data (e.g. creating different UI-element classes based on a `type` field from an API response) — hardcoding `new` calls with `if/else` chains scattered across the codebase is exactly what a factory consolidates into one place.

## Related Topics

- JavaScript Fundamentals
