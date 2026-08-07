# S6117 · Converting Array-like Objects to Arrays

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Array Methods  

## Question

The standard techniques for turning arguments/NodeList/HTMLCollection into a real array.

## Expected Answer

Array.from() and spread syntax [...x] are the modern ways to convert an array-like or iterable object into a true array, replacing the older Array.prototype.slice.call() idiom.

## Deep Explanation

The three standard conversion techniques are: `Array.from(arrayLike)` (most explicit and readable, also accepts an optional map function as a second argument), spread syntax `[...arrayLike]` (requires the object to be iterable, not just array-like — works for NodeList but not for `arguments` in the same way as Array.from with older engines), and `Array.prototype.slice.call(arrayLike)` (the pre-ES6 idiom, rarely needed today).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Converting Array-like Objects to Arrays.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `Array.from()` is preferred over spread specifically because it works on array-like objects that aren't iterable at all (something with just numeric keys and `.length` but no `Symbol.iterator`), whereas spread syntax strictly requires the iterable protocol — making `Array.from` the more universally-safe choice.

## Related Topics

- JavaScript Fundamentals
