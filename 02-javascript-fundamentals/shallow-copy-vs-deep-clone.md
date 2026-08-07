# S6079 · Shallow Copy vs Deep Clone

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

Why spread/Object.assign only copy one level deep, and when a true deep clone is needed.

## Expected Answer

A shallow copy duplicates only the top level and still shares nested object references with the original; a deep clone recursively duplicates every level so nothing is shared.

## Deep Explanation

A shallow copy (`{...obj}`, `Object.assign({}, obj)`, `Array.from(arr)`) creates a new top-level container but nested objects/arrays inside it are still the *same references* as in the original — mutating a nested value affects both copies. A deep clone recursively copies every nested level, producing a fully independent structure with no shared references at any depth.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Shallow Copy vs Deep Clone.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is a very common production bug source in state management — a reducer that does `{...state, user: state.user}` (forgetting to also copy `user`) can pass a strict-equality check that hides a mutation bug, since `newState.user === oldState.user` remains true even after `newState.user.name` was changed elsewhere.

## Related Topics

- JavaScript Fundamentals
