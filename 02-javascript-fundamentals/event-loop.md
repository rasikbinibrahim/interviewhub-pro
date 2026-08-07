# S21 · Event Loop

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

How JS handles async code using call stack, callback queue, and microtask queue.

## Expected Answer

The Event Loop is the loop that handles asynchronous callbacks by pushing them from queues onto the Call Stack when it is empty.

## Deep Explanation

The Event Loop is the mechanism that allows JavaScript to perform non-blocking, concurrent executions despite being single-threaded. It constantly monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it pushes the first task from the queue onto the Call Stack for execution, prioritizing the Microtask Queue over the Macrotask Queue.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Event Loop.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
