# S148 · Scheduler

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** React.js  
**Concepts:** React.js  

## Question

Priority-based task scheduling in React internals.

## Expected Answer

Priority-based task scheduling in React internals.

## Deep Explanation

The React Scheduler is a cooperative scheduling package that manages the priority of executing work loop tasks in Fiber. It splits work by priority: Immediate, UserBlocking, Normal, Low, and Idle.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Scheduler.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- React.js Fundamentals
