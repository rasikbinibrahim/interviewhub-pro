# S6075 · Property Descriptors (writable, enumerable, configurable)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

The hidden metadata every object property carries, controllable via Object.defineProperty.

## Expected Answer

Every property has writable/enumerable/configurable flags controlling whether it can change, appear in enumeration, or be redefined/deleted — set explicitly via Object.defineProperty.

## Deep Explanation

Every object property has an associated descriptor with `writable` (can its value be changed?), `enumerable` (does it show up in for...in/Object.keys/JSON.stringify?), and `configurable` (can the descriptor itself be changed or the property deleted?), in addition to `value`. `Object.defineProperty()` lets you set these explicitly instead of relying on the default (all `true`) that normal assignment produces.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Property Descriptors (writable, enumerable, configurable).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is the exact mechanism Vue 2's older reactivity system and many ORMs use to create 'hidden' internal properties (`enumerable: false`) that exist on an object for bookkeeping but never leak into `JSON.stringify()` output or `for...in` loops that consuming code might run.

## Related Topics

- JavaScript Fundamentals
