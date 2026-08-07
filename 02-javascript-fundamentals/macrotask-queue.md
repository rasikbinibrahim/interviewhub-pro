# S22 · Macrotask Queue

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Microtasks (Promises) run before macrotasks (setTimeout) in each event loop tick.

## Expected Answer

Microtasks (Promises) run before macrotasks (setTimeout) in each event loop tick.

## Deep Explanation

The Macrotask Queue holds events and callbacks for timers, UI rendering events, and user inputs. The event loop pulls one macrotask from the queue, runs it, then clears all microtasks before fetching the next macrotask.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Macrotask Queue.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
