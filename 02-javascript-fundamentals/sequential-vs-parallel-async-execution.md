# S6034 · Sequential vs Parallel Async Execution

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

Why awaiting in a loop is slower than firing all requests first with Promise.all.

## Expected Answer

await inside a loop serializes independent async calls; kicking them all off first and awaiting together with Promise.all runs them concurrently instead.

## Deep Explanation

Awaiting each async call inside a `for` loop runs them strictly one after another — the total time is the sum of all individual durations. Starting all the Promises first (without awaiting immediately) and only then awaiting them together (e.g. via `Promise.all`) runs them concurrently, so total time is roughly the duration of the slowest single call.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Sequential vs Parallel Async Execution.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Sequential awaiting is only correct when each call genuinely depends on the previous one's result — blindly parallelizing independent calls is a very common, very impactful performance fix senior engineers are expected to spot in code review.

## Related Topics

- JavaScript Fundamentals
