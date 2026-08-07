# S162 · useReducer

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** React.js  
**Concepts:** React.js  

## Question

Build a counter using useReducer hook.

## Expected Answer

useReducer manages complex state transitions in components via deterministic reducer action dispatching.

## Deep Explanation

useReducer is a React Hook designed for managing state transitions in components with complex local state logic. It operates on a reducer pattern: (state, action) => newState, returning the current state paired with a dispatch function to dispatch actions.

## Production Example

```js
dispatch({ type: 'increment' });
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying useReducer.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- React.js Fundamentals
