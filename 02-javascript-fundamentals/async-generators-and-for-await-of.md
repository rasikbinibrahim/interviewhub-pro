# S6042 · Async Generators and for await...of

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

Generators that yield Promises, consumed with the for await...of loop.

## Expected Answer

Async generators combine await and yield to lazily produce a sequence of asynchronously-resolved values, consumed cleanly via for await...of.

## Deep Explanation

An async generator (`async function*`) can use both `await` and `yield` in its body, producing a stream of values that each resolve asynchronously. It's consumed with `for await (const val of asyncGen())`, which automatically awaits each yielded Promise before assigning it to the loop variable — ideal for paginated API results or streaming data.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Async Generators and for await...of.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is the idiomatic way to model infinite or paginated data sources (e.g. 'fetch the next page only when the consumer asks for it') without loading everything into memory upfront — the consumer drives the pace via the loop, and each `yield` naturally backpressures against network calls.

## Related Topics

- JavaScript Fundamentals
