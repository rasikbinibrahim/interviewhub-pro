# S6052 · Throttling (Concept)

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Performance Patterns  

## Question

Guaranteeing a function runs at most once per fixed time interval.

## Expected Answer

Throttling ensures a function executes at most once per fixed time interval, regardless of how many times it's actually invoked during that interval.

## Deep Explanation

Throttling wraps a function so that no matter how many times it's called, it only actually executes at most once every `interval` milliseconds — extra calls during the cooldown are either dropped or scheduled for the next allowed slot. Unlike debouncing, throttling guarantees regular, periodic execution even during a continuous burst of calls.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Throttling (Concept).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Throttling is preferred over debouncing for continuous-feedback scenarios like scroll or drag handlers, where you want periodic updates *during* the event (e.g. updating a progress bar as the user scrolls), not just a single update after the user stops.

## Related Topics

- JavaScript Fundamentals
