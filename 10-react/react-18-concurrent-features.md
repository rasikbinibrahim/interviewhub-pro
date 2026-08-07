# T1006 · React 18 Concurrent Rendering: `useTransition`, `useDeferredValue` & Automatic Batching

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react-18, concurrent-mode, usetransition, usedeferredvalue, automatic-batching  

## Question

How does React 18 Concurrent Rendering break away from synchronous rendering constraints, what is the difference between urgent updates and non-urgent transition updates, how do `useTransition` and `useDeferredValue` prioritize UI responsiveness, and how does Automatic Batching work?

## Expected Answer

1. **Concurrent Rendering Core**: Allows React to pause, resume, or abort rendering work on large component trees when higher-priority events (e.g. typing, clicking) arrive, keeping the browser main thread responsive.
2. **Urgent vs Non-Urgent (Transitions)**:
   - **Urgent Updates**: Direct user interactions (typing in input, clicking tabs). Must render immediately to avoid input lag.
   - **Non-Urgent Updates (Transitions)**: Secondary view transitions (filtering long lists, switching complex dashboard charts). Marked via `startTransition(() => setState(...))` or `useDeferredValue(value)`.
3. **Automatic Batching**: In React 18, all state updates inside promises, `setTimeout`, native event handlers, or fetch callbacks are automatically batched into a single re-render pass (previously, React only batched updates inside React event handlers).

## Deep Explanation

### Urgent vs Transition Priority Priority Queue

```
User Action: Types 'A' in Search Input
  ├── 1. Urgent Update: setInputValue('A') ---> Renders Input Value (Immediate 60fps)
  └── 2. Transition Update: startTransition(() => setQuery('A'))
          v
       Fiber WorkInProgress Tree Filtering 10,000 Items (Interruptible!)
          v
       If user types 'B' mid-render -> Aborts 'A' filtering and restarts with 'B'!
```

## Production Example

```jsx
import React, { useState, useTransition, useDeferredValue } from 'react';

// Demo: Heavy Filtering List
function HeavyList({ text }) {
  const items = Array.from({ length: 5000 }, (_, i) => `${text} Item #${i}`);
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function ConcurrentSearchDashboard() {
  const [inputVal, setInputVal] = useState('');
  const [isPending, startTransition] = useTransition();

  // Alternative Concurrent Hook: Defers value update when component is unmanaged
  const deferredInput = useDeferredValue(inputVal);

  function handleChange(e) {
    // 1. Immediate Urgent Update for input field responsiveness
    setInputVal(e.target.value);

    // 2. Non-urgent Transition for heavy filtering
    startTransition(() => {
      // Transition work executed asynchronously without blocking input typing
    });
  }

  return (
    <div>
      <input value={inputVal} onChange={handleChange} placeholder="Type fast..." />
      {isPending && <span>Updating heavy list in background...</span>}

      {/* Render heavy list with deferred value */}
      <HeavyList text={deferredInput} />
    </div>
  );
}
```

## Best Practices

- Wrap state updates that trigger heavy component tree re-renders or API tab switching inside `startTransition` to preserve instant input response.
- Use `useDeferredValue` when passing props to third-party memoized components where you do not own the `setState` handler.

## Common Mistakes

- Wrapping input controlled state `setInputVal(e.target.value)` inside `startTransition`, causing typing input lag and cursor flickering.

## Follow-up Questions

1. What is the role of `flushSync` when you must force React to escape Automatic Batching and execute an instant synchronous DOM mutation?

## Related Topics

- React Fiber Architecture & Diffing Algorithm
- `useMemo` & `useCallback`: Performance Optimization & Referencing Rules
