# T1011 · React Context API Performance: Context Splitting, Selector Patterns & Memoization

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, context-api, performance, re-renders, context-splitting  

## Question

Why does updating a single value inside a monolithic React Context trigger mandatory re-renders across **ALL consumer components** regardless of whether they consume that specific updated property, and how do Context Splitting, Memoized Provider Values, and `use-context-selector` patterns eliminate unnecessary re-renders?

## Expected Answer

1. **The Context Re-render Problem**:
   - When a Context Provider's `value` reference changes (`value={{ user, theme, cart }}`), React marks **EVERY component calling `useContext(MyContext)` as stale**, forcing them to re-render.
   - React's `useContext` hook does **NOT** support property-level subscription filtering out of the box.
2. **Optimization Techniques**:
   - **Context Splitting**: Split monolithic state into multiple single-purpose contexts (`StateContext` and `DispatchContext`, or `UserContext` and `ThemeContext`).
   - **Memoizing Provider Values**: Wrap provider value objects in `useMemo` so reference equality remains stable across parent component re-renders.
   - **Context Selector Libraries**: Use `use-context-selector` or migrate to Zustand / Jotai for fine-grained atomic selector subscriptions (`useStore(state => state.user.name)`).

## Deep Explanation

### Monolithic vs Split Context Re-render Scope

```
Monolithic Context Update (theme updates):
[ Root Provider (user, theme, cart) ]
       ├── UserWidget (Re-renders unnecessarily!)
       ├── CartBadge (Re-renders unnecessarily!)
       └── ThemeToggle (Re-renders correctly)

Split Context Architecture (ThemeContext updates):
[ ThemeContext.Provider ] ─────────► ThemeToggle (ONLY ThemeToggle Re-renders!)
[ UserContext.Provider ]  ─────────► UserWidget (No Re-render!)
```

## Production Example

```jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// 1. Separate State & Dispatch Contexts to prevent dispatchers from re-rendering!
const ThemeStateContext = createContext(null);
const ThemeDispatchContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Memoize state value to ensure stable reference!
  const stateValue = useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}

// Custom Hooks
export function useTheme() {
  const context = useContext(ThemeStateContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export function useToggleTheme() {
  const context = useContext(ThemeDispatchContext);
  if (!context) throw new Error('useToggleTheme must be used within ThemeProvider');
  return context;
}
```

## Best Practices

- Always separate state values (`DataContext`) from state dispatcher functions (`DispatchContext`).
- Wrap inline provider objects in `useMemo(() => ({ a, b }), [a, b])` to avoid creating new object references on every parent render pass.

## Common Mistakes

- Using Context API as a global state store for rapidly changing data (e.g. real-time mouse coordinates or high-frequency input values), causing mass re-render bottlenecks across the component tree.

## Follow-up Questions

1. How does Zustand's use of external stores with `useSyncExternalStore` achieve zero re-render atomic selector subscriptions?

## Related Topics

- React State Management: Context API vs Zustand vs Redux
- `useMemo` & `useCallback`: Performance Optimization & Referencing Rules
