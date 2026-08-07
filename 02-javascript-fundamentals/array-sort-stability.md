# S6115 · Array Sort Stability

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Array Methods  

## Question

Whether elements with equal comparator values retain their original relative order.

## Expected Answer

A stable sort preserves the relative order of elements considered equal by the comparator; modern JS engines (ES2019+) guarantee Array.prototype.sort() is always stable.

## Deep Explanation

A sort is 'stable' if two elements considered equal by the comparator function retain their original relative order after sorting. As of ES2019, `Array.prototype.sort()` is required by spec to be stable in all conforming engines — this wasn't always guaranteed in older engines/versions, which caused subtle bugs when sorting by one field after already having sorted by another.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array Sort Stability.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Stability is what enables multi-level sorting by chaining single-key sorts — sort by `lastName` first, then stably sort by `department`, and within each department the names remain alphabetically ordered — a common real-world pattern for building sortable data tables without a compound comparator.

## Related Topics

- JavaScript Fundamentals
