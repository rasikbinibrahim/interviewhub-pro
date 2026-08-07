# S6040 · Symbol.iterator

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

The well-known symbol that marks an object's default iteration behavior.

## Expected Answer

Symbol.iterator is the well-known symbol key the language looks for to determine whether an object supports for...of and spread iteration.

## Deep Explanation

`Symbol.iterator` is a special, globally-unique built-in Symbol used as a property key. Any object with a method at `obj[Symbol.iterator]` returning a valid iterator is considered iterable by the language itself — arrays, strings, Maps, and Sets all define it natively, and generator functions automatically satisfy it.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Symbol.iterator.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because generator objects are themselves iterators *and* iterable (a generator's `[Symbol.iterator]` returns itself), the easiest way to make a custom class iterable is often to implement `[Symbol.iterator]` as a generator method (`*[Symbol.iterator]() { yield ...; }`) instead of hand-writing a `.next()` object.

## Related Topics

- JavaScript Fundamentals
