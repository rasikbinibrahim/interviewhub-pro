# QHOOKS007 · useContext Subscription Mechanics and Context Splitting

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Uber, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useContext, Context Provider, Re-render scope, Context splitting, Context selectors  

## Expected Answer

useContext subscribes a component to a Context Provider. When provider value changes (Object.is), ALL consuming components automatically re-render regardless of React.memo.

## Deep Explanation

React builds a dependency linked list on consuming fibers when useContext is invoked. When Context Provider value changes, React scans the fiber tree starting from the provider, marking all descendant subscriber fibers as needing update. To prevent unnecessary re-renders of components consuming only sub-parts of context, developers split contexts into separate providers.

## Production Example

A single monolithic AppContext containing user auth, theme, and cart items causes the entire app navbar to re-render every time cart item count increments.

## Best Practices

- Split large contexts into separate focused providers (e.g. AuthContext, ThemeContext)
- Memoize the context provider value object with useMemo

## Trade-offs

- Context eliminates prop drilling but couples subtrees to provider boundaries
- Changing context value re-renders all subscribers regardless of memoization

## Common Mistakes

- Passing an un-memoized object literal directly as Provider value prop
- Using context for high-frequency state updates like mouse positions or animation frames

## Follow-up Questions

1. How does React 19 allow using <Context> directly instead of <Context.Provider>?
2. How can useSyncExternalStore replace Context for high-frequency global state?

## Related Topics

- React 19 use API
- Zustand vs Redux Architecture
