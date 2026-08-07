# S6043 · Building Infinite Sequences with Generators

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

Lazily generating unbounded sequences (e.g. Fibonacci) without blowing up memory.

## Expected Answer

A generator with an unbounded while(true) loop can lazily represent an infinite sequence, since values are only computed on demand as the consumer pulls them.

## Deep Explanation

Because a generator only computes the next value when `.next()` is called, it can represent conceptually infinite sequences (natural numbers, Fibonacci, primes) using a `while (true)` loop with `yield`, without ever materializing the whole sequence in memory. Consumers pull only as many values as they need, e.g. via `take(gen, n)` helpers or breaking out of a `for...of` loop.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Building Infinite Sequences with Generators.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This lazy-pull model is the same fundamental idea behind reactive streams and iterators in functional languages — it decouples 'how a sequence is produced' from 'how much of it is consumed', letting the same generator serve both a `take(5)` caller and a `take(1000)` caller without any change.

## Related Topics

- JavaScript Fundamentals
