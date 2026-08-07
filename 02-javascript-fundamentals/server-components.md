# S152 · Server Components

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** React.js  
**Concepts:** React.js  

## Question

Zero-bundle server-side components in React.

## Expected Answer

Zero-bundle server-side components in React.

## Deep Explanation

React Server Components (RSC) are components that render exclusively on the server. They do not ship any JavaScript to the client (reducing bundle size) and can fetch database resources directly.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Server Components.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- React.js Fundamentals
