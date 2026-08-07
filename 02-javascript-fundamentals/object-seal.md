# S6077 · Object.seal()

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

Preventing new/removed properties while still allowing existing values to change.

## Expected Answer

Object.seal() locks an object's shape (no new/deleted properties) but still allows existing writable properties to have their values changed.

## Deep Explanation

`Object.seal(obj)` prevents adding new properties and deleting existing ones (marks all properties `configurable: false`), but unlike `freeze`, existing property values can still be reassigned as long as they were originally `writable`. It's a middle ground between a fully open object and a fully frozen one.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.seal().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Sealing is the right tool when you want to lock a config object's *shape* (guarantee no typo'd or extra keys get added downstream) while still allowing legitimate value updates — freeze is overkill (and wrong) if the object's values are genuinely meant to be mutable during the app's lifecycle.

## Related Topics

- JavaScript Fundamentals
