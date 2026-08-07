# T1012 · `useSyncExternalStore`: Concurrent Mode Safe State Subscriptions (Zustand, Redux, Window Listeners)

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, react-18, use-sync-external-store, concurrent-mode, tearing, state-management  

## Question

Why was the `useSyncExternalStore` hook introduced in React 18, what is **UI Tearing** during Concurrent Mode rendering, and how do modern state management libraries (Zustand, Redux Toolkit) use `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` to subscribe to non-React external stores safely?

## Expected Answer

1. **The UI Tearing Problem in Concurrent Mode**:
   - In React 18 Concurrent Mode, React can **pause and resume rendering** to prioritize urgent user interactions.
   - If an external non-React store (Redux, global window object, browser location) mutates while React is paused mid-render, different components on the screen might render data from different snapshots of the store, causing visual inconsistency known as **UI Tearing**.
2. **`useSyncExternalStore` Architecture**:
   - Forces React to read external store updates **synchronously** during rendering, guaranteeing zero UI tearing.
   - Parameters:
     1. `subscribe`: Function registering a callback for store updates. Returns un-subscribe cleanup.
     2. `getSnapshot`: Function returning the current snapshot of store state.
     3. `getServerSnapshot`: Function returning snapshot during Server-Side Rendering (SSR).

## Deep Explanation

### UI Tearing vs Synchronous External Store Hook

```
Without useSyncExternalStore (Concurrent Render Paused):
Render Component A (Store Val = 1) ──► [ Pause for User Input ] ──► Store Mutates (Val = 2) ──► Render Component B (Val = 2)
                                                                                               (TEARING BUG!)

With useSyncExternalStore:
Forces Synchronous Atomic Snapshot Reading across all components during render pass! (ZERO TEARING!)
```

## Production Example

```javascript
// Production Pattern: Custom Browser Window Online/Offline Hook using useSyncExternalStore
import { useSyncExternalStore } from 'react';

// 1. Subscribe Callback
function subscribeOnlineStatus(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 2. Snapshot Reader
function getOnlineStatusSnapshot() {
  return navigator.onLine;
}

// 3. Server SSR Snapshot Fallback
function getServerOnlineStatusSnapshot() {
  return true; // Default assume online during SSR
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribeOnlineStatus,
    getOnlineStatusSnapshot,
    getServerOnlineStatusSnapshot
  );
}
```

```jsx
// Usage inside React Component
export function NetworkBadge() {
  const isOnline = useOnlineStatus();

  return (
    <div className={`badge ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? '🟢 Connected' : '🔴 Offline'}
    </div>
  );
}
```

## Best Practices

- Always memoize or declare `getSnapshot` outside the component render body (or wrap with `useCallback`) to avoid infinite re-render loops.
- `getSnapshot` must return immutable values or primitive references. Returning a newly allocated inline object `{ ...store }` on every `getSnapshot` call will trigger maximum call stack loops.

## Common Mistakes

- Using `useEffect` + `useState` to listen to window resize or online/offline events in React 18, which causes double render flashes and potential tearing in concurrent trees.

## Follow-up Questions

1. How does `useSyncExternalStoreExtra` extend external store capabilities for selective deep selector subscriptions?

## Related Topics

- React 18 Concurrent Rendering: `useTransition` & `useDeferredValue`
- Redux Toolkit (RTK) vs Zustand: State Architecture
