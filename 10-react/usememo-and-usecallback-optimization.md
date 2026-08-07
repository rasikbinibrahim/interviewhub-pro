# T1005 · `useMemo` & `useCallback`: Performance Optimization & Referencing Rules

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, usememo, usecallback, memoization, referential-equality, re-renders  

## Question

What is the difference between `useMemo` and `useCallback` in React, how do they preserve referential equality across render passes to prevent unnecessary child component re-renders (when combined with `React.memo`), and why is premature over-use of memoization hooks an anti-pattern?

## Expected Answer

1. **`useMemo`**: Caches the **RESULT** of a calculation between renders (`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`).
2. **`useCallback`**: Caches a **FUNCTION DEFINITION** between renders (`const memoizedCallback = useCallback(() => { doSomething(a); }, [a])`). `useCallback(fn, deps)` is syntactically equivalent to `useMemo(() => fn, deps)`.
3. **Referential Equality**: In JS, `{}` !== `{}` and `(() => {}) !== (() => {})`. Passing new un-memoized object literals or inline functions as props to a child wrapped in `React.memo` breaks prop equality checks, causing the child to re-render anyway.

## Deep Explanation

### Referential Equality Flow

```
Parent Render Pass (State Update)
  ├── inlineFn = () => {}  (New Reference in Memory!)
  v
<ChildMemoized callback={inlineFn} />
  v
React.memo checks: Object.is(prevProps.callback, nextProps.callback) === false
  v
Child RE-RENDERS! (Optimization invalidated)

WITH useCallback:
Parent Render Pass (State Update)
  ├── memoizedFn = useCallback(() => {}, [deps]) (Same Reference preserved!)
  v
<ChildMemoized callback={memoizedFn} />
  v
React.memo checks: Object.is(prevProps.callback, nextProps.callback) === true
  v
Child SKIPS RE-RENDER! (Optimization successful)
```

## Production Example

```jsx
import React, { useState, useMemo, useCallback } from 'react';

// Expensive Child Component wrapped in React.memo
const ExpensiveDataGrid = React.memo(function DataGrid({ items, onItemSelect }) {
  console.log('ExpensiveDataGrid Rendered');
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => onItemSelect(item.id)}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
});

export function ProductCatalog({ products }) {
  const [filterText, setFilterText] = useState('');
  const [theme, setTheme] = useState('light');

  // 1. useMemo caches heavy array filtering
  const filteredProducts = useMemo(() => {
    console.log('Computing filtered products...');
    return products.filter((p) => p.name.includes(filterText));
  }, [products, filterText]);

  // 2. useCallback preserves function reference across theme toggles
  const handleSelect = useCallback((id) => {
    console.log('Selected product ID:', id);
  }, []); // Empty deps: Function reference never changes

  return (
    <div className={`theme-${theme}`}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme ({theme})
      </button>
      <input value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      
      {/* Changing theme re-renders Parent, but ExpensiveDataGrid DOES NOT re-render! */}
      <ExpensiveDataGrid items={filteredProducts} onItemSelect={handleSelect} />
    </div>
  );
}
```

## Best Practices

- Combine `useCallback` or `useMemo` with `React.memo` on the child component — using `useCallback` alone without `React.memo` on the child yields zero re-render reduction benefits.
- Move static objects and functions OUTSIDE the component rendering scope entirely when they do not depend on props or state.

## Common Mistakes

- Wrapping cheap, trivial calculations (`useMemo(() => a + b, [a, b])`) in `useMemo`, where the overhead of instantiating hook memory arrays and comparing dependency arrays costs more CPU than the calculation itself.

## Follow-up Questions

1. How does the React Compiler (React 19) automatically memoize component JSX, props, and hooks without requiring manual `useMemo` / `useCallback` / `React.memo` annotations?

## Related Topics

- React Fiber Architecture & Diffing Algorithm
- `useEffect` Lifecycle Rules & Custom Hook Abstractions
