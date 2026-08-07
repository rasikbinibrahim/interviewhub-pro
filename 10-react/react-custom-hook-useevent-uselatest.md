# T1018 · Stable Event Handlers Pattern: `useEvent()` / `useLatest()` Custom Hooks

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react-hooks, useevent, uselatest, memoization, event-handlers  

## Question

How does the **`useLatest()` / `useEvent()`** custom hook pattern solve effect dependency closure staleness without invalidating child component memoization?

## Expected Answer

```jsx
function useLatest(value) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

function useEvent(fn) {
  const fnRef = useLatest(fn);
  return useCallback((...args) => fnRef.current(...args), []);
}
```
