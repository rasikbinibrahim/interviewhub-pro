# S6017 · Object.create()

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

Creating an object with an explicit prototype instead of via a constructor.

## Expected Answer

Object.create(proto) builds a new object linked directly to the given prototype, bypassing constructors entirely.

## Deep Explanation

`Object.create(proto)` creates a brand-new object whose internal [[Prototype]] is set directly to the `proto` argument, without invoking any constructor function. Passing `null` creates a truly prototype-less object with no inherited methods at all (not even `toString`).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.create().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `Object.create(null)` is the standard way to build a 'dictionary' object immune to prototype pollution attacks (no inherited `__proto__`, `hasOwnProperty`, etc.), which matters when the object's keys come from untrusted user input.

## Related Topics

- JavaScript Fundamentals
