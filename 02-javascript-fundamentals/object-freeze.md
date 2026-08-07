# S6076 · Object.freeze()

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

Making an object's own top-level properties immutable.

## Expected Answer

Object.freeze() makes an object's own top-level properties immutable (no add/delete/reassign), but nested objects inside it remain fully mutable.

## Deep Explanation

`Object.freeze(obj)` prevents adding new properties, deleting existing ones, and reassigning existing property values on `obj` — attempts silently fail in non-strict mode or throw a TypeError in strict mode. Crucially, it's shallow: freezing an object does not freeze nested objects referenced by its properties.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.freeze().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The shallow nature is the classic gotcha — `Object.freeze({ user: { name: 'A' } })` still allows `frozen.user.name = 'B'` to succeed, since only the outer object is frozen; deep-freezing requires recursively freezing every nested object yourself.

## Related Topics

- JavaScript Fundamentals
