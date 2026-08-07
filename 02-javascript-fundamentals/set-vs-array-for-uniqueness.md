# S6071 · Set vs Array for Uniqueness

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Collections (Map/Set/WeakMap/WeakSet)  

## Question

Using Set to guarantee unique values and get O(1) membership checks.

## Expected Answer

Set automatically enforces value uniqueness and provides O(1) has() lookups, whereas checking uniqueness or membership in an array requires an O(n) scan.

## Deep Explanation

A `Set` stores only unique values (using SameValueZero equality, so duplicates are automatically discarded on insertion) and provides O(1) average-time `.has()` lookups, compared to an array's O(n) `.includes()` scan. It's the natural choice for deduplication and fast membership testing.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Set vs Array for Uniqueness.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `[...new Set(array)]` is the standard one-liner for deduplicating an array of primitives, but it's worth remembering Set uses reference equality for objects — `new Set([{a:1}, {a:1}])` still has size 2, since the two object literals are different references even though they look identical.

## Related Topics

- JavaScript Fundamentals
