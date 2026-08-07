# S6023 · instanceof Operator Internals

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

How instanceof actually walks the prototype chain under the hood.

## Expected Answer

instanceof walks up an object's prototype chain looking for a reference match to Constructor.prototype, not by comparing constructor names.

## Deep Explanation

`obj instanceof Ctor` checks whether `Ctor.prototype` appears anywhere in `obj`'s [[Prototype]] chain, by repeatedly walking `Object.getPrototypeOf(obj)` until it either finds a match (true) or reaches `null` (false). It does not check the constructor's name or any tag — only the actual prototype object reference.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying instanceof Operator Internals.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because instanceof compares against `Ctor.prototype` by reference, reassigning `Ctor.prototype = {}` after instances were created breaks instanceof for those older instances, and values from a different realm (e.g. an array from an iframe) will fail `instanceof Array` even though they behave like arrays — `Array.isArray()` exists specifically to sidestep that cross-realm issue.

## Related Topics

- JavaScript Fundamentals
