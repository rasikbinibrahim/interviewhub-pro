# S6039 · Iterators and the Iterable Protocol

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

The two-protocol system (iterable + iterator) that powers for...of and spread syntax.

## Expected Answer

An object becomes iterable by implementing Symbol.iterator, which returns a .next()-based iterator; that single protocol powers for...of, spread, and destructuring for any data type.

## Deep Explanation

An object is 'iterable' if it implements `[Symbol.iterator]()`, returning an 'iterator' — an object with a `.next()` method that returns `{ value, done }`. `for...of`, spread syntax (`...`), destructuring, and `Array.from()` all work by calling this protocol, which is why they work uniformly on arrays, strings, Maps, Sets, and any custom object that implements it.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Iterators and the Iterable Protocol.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Implementing the iterable protocol on a custom class is what unlocks native language ergonomics for it — `for (const x of myCollection)` and `[...myCollection]` work automatically without needing a special library method, purely because the class defines `[Symbol.iterator]`.

## Related Topics

- JavaScript Fundamentals
