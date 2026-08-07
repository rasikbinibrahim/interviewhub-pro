# S6021 · Getters and Setters

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

Defining computed properties that run code on read or write access.

## Expected Answer

Getters and setters let property access (`obj.prop` / `obj.prop = x`) transparently trigger custom logic instead of exposing a raw field.

## Deep Explanation

`get`/`set` accessors let a property look like a normal field from the outside while actually running a function on read (`get`) or write (`set`). They're defined in object literals or classes and are useful for validation, computed/derived values, or lazily computing expensive results.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Getters and Setters.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A getter with no matching setter effectively creates a read-only property from the outside — assigning to it silently fails in non-strict mode or throws a TypeError in strict mode/classes, which is a clean way to expose derived state without extra boilerplate.

## Related Topics

- JavaScript Fundamentals
