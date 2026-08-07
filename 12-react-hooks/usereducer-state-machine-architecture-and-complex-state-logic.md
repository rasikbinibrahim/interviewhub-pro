# QHOOKS006 · useReducer State Machine Architecture and Complex State Logic

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Amazon, Redux users  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useReducer, Reducer pattern, Action dispatch, State machines, Complex local state  

## Expected Answer

useReducer manages complex state logic using a pure reducer function (state, action) => newState. It decouples state transition logic from component event handlers.

## Deep Explanation

useReducer provides a deterministic state transition mechanism. The reducer function receives current state and dispatched action, returning next state immutably. Dispatching an action pushes a work unit onto the fiber update queue. Passing dispatch down component trees is performance-optimal because dispatch identity is guaranteed stable across renders.

## Production Example

Managing multi-step form state with 15 interdependent fields using useState creates fragile setter chains; useReducer centralizes form validation and step transitions cleanly.

## Best Practices

- Use useReducer when state logic involves multiple sub-values or next state depends on previous state
- Keep reducer functions strictly pure with zero side effects

## Trade-offs

- Requires upfront action type and reducer setup boilerplate
- Provides predictable, centralized, easily unit-testable state transitions

## Common Mistakes

- Performing side effects (API calls, timers) inside the reducer function
- Mutating state directly within the reducer instead of returning new state copies

## Follow-up Questions

1. How can useReducer replace Redux for local component subtree state?
2. Why is dispatch identity guaranteed stable across component re-renders?

## Related Topics

- Redux Toolkit createSlice
- State Colocation Principle
