# T1020 · Memoization Optimization: `useMemo()`, `useCallback()`, and `React.memo()`

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react, usememo, usecallback, react-memo, performance  

## Question

When should you use **`useMemo()`**, **`useCallback()`**, and **`React.memo()`**, and why is premature over-memoization anti-pattern in React applications?

## Expected Answer

- **`React.memo(Component)`**: Prevents re-rendering child components if props remain shallowly equal (`===`).
- **`useMemo(() => computeHeavy(a), [a])`**: Caches expensive calculation results across render passes.
- **`useCallback(fn, [deps])`**: Caches function references across render passes to satisfy `React.memo` reference equality.

```jsx
const memoizedFn = useCallback(() => {
  doSomething(id);
}, [id]);

const memoizedData = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```
