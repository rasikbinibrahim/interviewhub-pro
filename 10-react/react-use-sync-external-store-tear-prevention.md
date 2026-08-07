# T1029 · React 18 `useSyncExternalStore()` & Concurrent Tearing Prevention

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Redux  
**Category:** React  
**Concepts:** react-18, usesyncexternalstore, concurrent-mode, tearing, state  

## Question

How does **`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`** subscribe to non-React external stores (Redux, Zustand, `window.innerWidth`) while preventing visual Tearing in Concurrent React?

```jsx
function useWindowWidth() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth,
    () => 1024 // Server snapshot for SSR hydration!
  );
}
```
