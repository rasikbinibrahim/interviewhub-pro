# T1003 · `useEffect` Lifecycle Rules & Custom Hook Abstractions

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Airbnb, Uber  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, useeffect, custom-hooks, dependency-array, stale-closures, cleanup-function  

## Question

What are the exact execution rules of `useEffect` in React, how do cleanup functions prevent memory leaks, how do stale closures occur inside effects, and how do you encapsulate complex stateful logic into clean, reusable Custom Hooks?

## Expected Answer

1. **`useEffect` Lifecycle Rules**:
   - Runs asynchronously **AFTER** the browser paint step (non-blocking).
   - Empty dependency array `[]`: Runs once after initial mount; cleanup runs on unmount.
   - Specified dependency array `[a, b]`: Runs on mount and after any re-render where `a` or `b` changed by `Object.is()` comparison.
   - Omitted dependency array (no array): Runs after **EVERY** render pass.
2. **Cleanup Function**: Returned function executes before the component unmounts AND before re-running the effect on subsequent dependency changes.
3. **Stale Closure Bug**: Occurs when an effect callback captures state or props from an earlier render pass because the state variable was omitted from the dependency array, causing the effect to reference outdated values.

## Deep Explanation

### Custom Hook Abstraction Architecture

Custom Hooks are JavaScript functions whose names start with `use` and can call other React hooks. They do not alter React's underlying rendering behavior; they extract reusable stateful logic out of components for unit testing and modularity.

## Production Example

```jsx
import { useState, useEffect } from 'react';

// Custom Hook: useWindowSize with Cleanup & Throttle
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId = null;

    function handleResize() {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        timeoutId = null;
      }, 150); // Throttled to 150ms
    }

    window.addEventListener('resize', handleResize);

    // CRITICAL: Cleanup function prevents memory leaks on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // Empty deps: Setup listener once on mount

  return windowSize;
}

// Component Consumption
export function ResponsiveHeader() {
  const { width } = useWindowSize();

  return (
    <header className="header">
      <h1>Dashboard</h1>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
    </header>
  );
}
```

## Best Practices

- Enable `eslint-plugin-react-hooks` with `exhaustive-deps` rule to automatically catch missing dependencies.
- Pass functional updater forms `setCount(c => c + 1)` inside `useEffect` when calculating state based on previous state to avoid adding state variables into dependency arrays unnecessarily.

## Common Mistakes

- Performing data fetching inside `useEffect` without an AbortController (`controller.abort()`), leading to race conditions when fast tab switches trigger out-of-order response resolutions.
- Omitting functions or objects created inside component bodies from the `useEffect` dependency array without wrapping them in `useCallback` or `useMemo`.

## Follow-up Questions

1. How does React 18 Strict Mode double-invoke effects in development mode to help surface missing cleanup functions?
2. What is the difference between `useEffect` and `useSyncExternalStore` when subscribing to external non-React state stores?

## Related Topics

- React Fiber Architecture & Diffing Algorithm
- TanStack Query Caching & Optimistic Mutations
