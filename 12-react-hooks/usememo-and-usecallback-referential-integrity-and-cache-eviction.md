# QHOOKS004 · useMemo and useCallback Referential Integrity and Cache Eviction

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Google, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useMemo, useCallback, Referential integrity, Dependency array, Memoization overhead  

## Expected Answer

useMemo caches calculated values across re-renders; useCallback caches function instance references. Both preserve referential integrity to prevent unnecessary child component re-renders.

## Deep Explanation

Components pass object and function references as props. On re-render, inline object literals ({}) and arrow functions (() => {}) create new memory references. Wraping callbacks with useCallback and objects with useMemo preserves reference equality (Object.is) between renders, allowing child components wrapped in React.memo to skip re-rendering.

## Production Example

Passing an un-memoized inline callback prop to a heavy virtualized list component breaks React.memo optimizations, causing 10,000 list rows to re-render on every parent state change.

## Best Practices

- Pair useCallback and useMemo with React.memo on downstream children
- Do not over-memoize trivial primitive calculations where memoization overhead exceeds savings

## Trade-offs

- Memoization preserves referential integrity but increases memory usage and hook dependency comparison overhead
- React 19 Compiler automates this memoization natively

## Common Mistakes

- Using useCallback on a function passed to a standard HTML <button> (which doesn't use React.memo)
- Forgetting to list referenced variables in the dependency array

## Follow-up Questions

1. How will the React Compiler (React Forget) impact the need for manual useMemo/useCallback?
2. What is the memory overhead of storing memoization tuples on fiber nodes?

## Related Topics

- React Compiler Automemoization
- React Memo Component Optimization
