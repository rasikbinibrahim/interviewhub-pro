# S6136 · Symbol.asyncIterator

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Senior Differentiators  

## Question

The well-known symbol that marks an object as asynchronously iterable, powering for await...of on custom objects.

## Expected Answer

Symbol.asyncIterator marks an object as usable in for await...of loops by returning an async iterator whose next() resolves to { value, done }, the async equivalent of Symbol.iterator.

## Deep Explanation

`Symbol.asyncIterator` is the async counterpart to `Symbol.iterator` — an object implementing `[Symbol.asyncIterator]()` returns an async iterator whose `.next()` returns a Promise resolving to `{ value, done }`, enabling `for await (const x of obj)` on custom classes, not just async generators. Async generator methods (`async *[Symbol.asyncIterator]() {}`) are the most common way to implement it.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Symbol.asyncIterator.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Implementing this manually (rather than via an async generator method) is occasionally necessary when you need fine control over backpressure or need the iterator object itself to expose extra methods (like `.return()` for early cleanup on `break`) beyond what a generator function conveniently provides.

## Related Topics

- JavaScript Fundamentals
