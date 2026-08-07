# S6008 · IIFE (Immediately Invoked Function Expressions)

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Scope & Closures  

## Question

A function that executes as soon as it is defined, used to create private scope.

## Expected Answer

An IIFE is a function defined and executed in one step, historically used to create an isolated private scope.

## Deep Explanation

An IIFE is a function expression that is invoked immediately after being defined, wrapped in parentheses so the parser treats it as an expression rather than a declaration. Before ES6 modules and block scoping, IIFEs were the primary way to create a private scope and avoid polluting the global namespace.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying IIFE (Immediately Invoked Function Expressions).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. IIFEs are largely obsolete for scoping now that `let`/`const`/block scope and ES modules exist, but they're still used for one-off async setup at the top level (`(async () => { await init(); })()`) in environments without top-level await.

## Related Topics

- JavaScript Fundamentals
