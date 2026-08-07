# S6116 · Array-like Objects vs True Arrays

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Array Methods  

## Question

Objects with a length property and indexed keys that aren't real Array instances.

## Expected Answer

Array-like objects (arguments, NodeList, HTMLCollection) have indexed keys and a length property but aren't true Arrays and lack array prototype methods until explicitly converted.

## Deep Explanation

An array-like object has numeric-string keys (`0`, `1`, `2`, ...) and a `length` property, but is not an actual `Array` instance and doesn't have array methods on its prototype — `arguments`, `NodeList`, and `HTMLCollection` are common examples. They can't directly call `.map()`, `.filter()`, etc., without first being converted to a real array.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array-like Objects vs True Arrays.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `NodeList` from `querySelectorAll` is iterable (supports `for...of` and spread) but is still not a true array and lacks `.map()`/`.filter()` — a very common real-world bug is calling `.map()` directly on a `querySelectorAll()` result and getting a TypeError, requiring `Array.from()` or spread first.

## Related Topics

- JavaScript Fundamentals
