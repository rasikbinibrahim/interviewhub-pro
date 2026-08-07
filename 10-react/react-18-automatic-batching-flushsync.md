# T1015 · React 18 Automatic Batching vs `flushSync` Event Loop Bypassing

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, react-18, automatic-batching, flushsync, re-renders  

## Question

How does **React 18 Automatic Batching** group multiple state updates into a single re-render pass across asynchronous Promises, `setTimeout`, and native DOM event handlers, and how does **`flushSync`** opt out of batching to force immediate synchronous DOM updates?

## Expected Answer

1. **Automatic Batching in React 18**:
   - In React 17 and earlier, React ONLY batched multiple state updates inside React Synthetic Event handlers (`onClick`). Updates inside `fetch()`, `setTimeout`, or native event listeners triggered multiple separate re-renders.
   - React 18 introduces **Automatic Batching**: ALL state updates triggered inside async microtasks, timeouts, promises, or native event handlers are grouped into **a single unified re-render pass**!
2. **Opting out with `flushSync`**:
   - `ReactDOM.flushSync(() => { setState(val); })` forces React to flush pending updates synchronously to the real DOM immediately.
   - Required when subsequent code relies on measuring DOM dimensions (`element.getBoundingClientRect()`) modified by the immediate state update.

## Deep Explanation

### React 17 vs React 18 Batching Behavior

```javascript
// Example Async Fetch Callback:
fetchData().then(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
});

// React 17: Triggers TWO separate re-render passes!
// React 18: Automatically Batched into ONE single re-render pass!
```

## Production Example

```jsx
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

export function ScrollContainer() {
  const [items, setItems] = useState([1, 2, 3]);
  const [highlightLast, setHighlightLast] = useState(false);

  const handleAddItem = () => {
    // 1. Force React to flush DOM update synchronously NOW!
    flushSync(() => {
      setItems((prev) => [...prev, prev.length + 1]);
    });

    // 2. DOM is guaranteed to be updated synchronously here!
    const listElement = document.getElementById('item-list');
    if (listElement) {
      listElement.scrollTop = listElement.scrollHeight; // Measure updated DOM height!
    }

    setHighlightLast(true); // Batched in subsequent render pass
  };

  return (
    <div>
      <button onClick={handleAddItem}>Add Item & Scroll</button>
      <ul id="item-list" style={{ height: 100, overflowY: 'scroll' }}>
        {items.map((item) => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Best Practices

- Allow React 18 Automatic Batching to handle state grouping by default for optimal performance.
- Use `flushSync` sparingly ONLY when immediate DOM measurements (scroll position, element widths) are required synchronously before the next browser paint.

## Common Mistakes

- Wrapping multiple state setters inside `flushSync` unnecessarily, causing performance degradation due to forced synchronous Virtual DOM diffing.

## Follow-up Questions

1. How does `flushSync` interact with React 18 `useTransition` pending state updates?

## Related Topics

- React 18 Concurrent Rendering: `useTransition` & `useDeferredValue`
- Event Loop Execution Order: Macrotasks vs Microtasks
