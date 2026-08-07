# S29 · call()

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Methods to control the `this` context of a function.

## Expected Answer

call and apply invoke a function with custom 'this' context immediately, while bind returns a new function with bound context.

## Deep Explanation

call(), apply(), and bind() are methods used to control the 'this' context of a function:
- call(): Invokes the function immediately, passing arguments individually.
- apply(): Invokes the function immediately, passing arguments as an array.
- bind(): Returns a new function with the 'this' context bound, to be called later.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying call().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
