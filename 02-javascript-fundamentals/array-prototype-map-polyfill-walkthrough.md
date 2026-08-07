# S6096 · Array.prototype.map Polyfill Walkthrough

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Polyfills  

## Question

Implementing map() from scratch, matching its exact native signature and behavior.

## Expected Answer

A correct map() polyfill iterates by length, calls back with (element, index, array), skips holes in sparse arrays, supports a thisArg, and returns a new array without mutating the original.

## Deep Explanation

A faithful `map()` polyfill must: iterate using the array's actual `length` (not assume it's dense), invoke the callback with `(element, index, array)`, skip holes in sparse arrays (native map does not call the callback for empty slots), respect an optional `thisArg` second argument, and return a new array of the same length without mutating the original.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array.prototype.map Polyfill Walkthrough.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The sparse-array-skipping detail is the one most hand-rolled polyfills get wrong — `[1, , 3].map(x => x * 2)` on the real `map()` produces `[2, <1 empty item>, 6]`, preserving the hole, not `[2, NaN, 6]` or `[2, 0, 6]` — checking `i in this` before invoking the callback is what real engines do.

## Related Topics

- JavaScript Fundamentals
