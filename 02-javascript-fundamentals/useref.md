# S123 · useRef

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** React.js  
**Concepts:** React.js  

## Question

Access DOM elements or persist values without re-renders.

## Expected Answer

Access DOM elements or persist values without re-renders.

## Deep Explanation

useRef is a hook that returns a mutable ref object whose .current property persists across re-renders. Modifying .current does NOT trigger a re-render. It is commonly used to access DOM nodes directly.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying useRef.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- React.js Fundamentals
