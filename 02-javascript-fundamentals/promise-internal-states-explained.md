# S6036 · Promise Internal States Explained

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

The pending/fulfilled/rejected state machine and why it's one-way and one-shot.

## Expected Answer

A Promise moves one-way from pending to either fulfilled or rejected exactly once, and further resolve/reject calls after that are silently ignored.

## Deep Explanation

A Promise starts in the 'pending' state and can transition exactly once to either 'fulfilled' (with a value) or 'rejected' (with a reason) — collectively these two are called 'settled'. Once settled, a Promise's state and value are permanently locked; calling resolve/reject again has no effect.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Promise Internal States Explained.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This immutability-after-settling guarantee is what makes `.then()` safe to call multiple times on the same Promise (e.g. from different consumers) — each call always sees the same final value/error, regardless of timing, rather than racing against further state changes.

## Related Topics

- JavaScript Fundamentals
