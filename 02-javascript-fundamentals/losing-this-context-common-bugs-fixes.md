# S6014 · Losing this Context (Common Bugs & Fixes)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** this, bind, call & apply  

## Question

Why extracting a method from an object and calling it standalone breaks `this`.

## Expected Answer

A method loses its `this` binding whenever it's called without its owning object as the receiver, e.g. when passed as a bare callback.

## Deep Explanation

`this` is determined by the call-site, not where the function was defined. When a method is detached from its object — passed as a callback, destructured, or reassigned to a variable — it loses its implicit binding and `this` falls back to undefined (strict mode) or the global object.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Losing this Context (Common Bugs & Fixes).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The three standard fixes are: bind it explicitly (`el.addEventListener('click', obj.method.bind(obj))`), wrap it in an arrow function (`() => obj.method()`), or convert the method to an arrow-function class field so it's bound once per instance at construction time.

## Related Topics

- JavaScript Fundamentals
