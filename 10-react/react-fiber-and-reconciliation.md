# T1002 · React Fiber Architecture & Diffing Algorithm

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react-fiber, reconciliation, diffing-algorithm, concurrent-mode, WorkInProgress  

## Question

How does the React Fiber Architecture work under the hood, how does the 2-phase execution model (**Render Phase** vs **Commit Phase**) enable Concurrent React features (`useTransition`, `useDeferredValue`), and how does the Diffing Algorithm achieve $O(N)$ heuristic element comparisons using `key` props?

## Expected Answer

1. **Motivation for Fiber**: Prior to React 16 (Stack Reconciler), reconciliation was synchronous, recursive, and un-interruptible. Heavy component tree updates blocked the main browser thread, causing frame drops (jank). Fiber introduced a **singly-linked list virtual stack frame architecture** allowing work to be split into chunks, prioritized, paused, aborted, or reused.
2. **Two-Phase Architecture**:
   - **Render / Reconciliation Phase (Asynchronous & Interruptible)**: Builds the `workInProgress` tree, calculates diffs (side effects), and assigns `Flags` (Placement, Update, Deletion). Can be paused or aborted by higher-priority events (user input).
   - **Commit Phase (Synchronous & Un-interruptible)**: Reads the `effectList` / Fiber tree flags and applies DOM mutations, invokes `useLayoutEffect`, and schedules `useEffect`.
3. **$O(N)$ Heuristic Diffing**:
   - Compares elements level-by-level (same hierarchy depth).
   - Two elements of different types generate different trees (tears down old tree and builds new tree).
   - Uses unique `key` props to track element movements, insertions, and deletions across sibling lists.

## Deep Explanation

### Fiber Tree Linked List Structure

```
+-----------------------------------------------------------------+
| Fiber Node                                                      |
| - type: 'div' | Component                                       |
| - key: "header-key"                                             |
| - stateNode: HTMLDivElement                                     |
| - child: Fiber (First child node)                               |
| - sibling: Fiber (Next sibling node)                            |
| - return: Fiber (Parent return node)                            |
| - flags: Placement | Update | Deletion                         |
+-----------------------------------------------------------------+
```

## Production Example

```jsx
import React, { useState, useTransition } from 'react';

// Concurrent Rendering with useTransition
export function FilterableProductList({ products }) {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleInputChange(e) {
    // High Priority Update: Urgent UI feedback for user typing
    setQuery(e.target.value);

    // Low Priority Work: Interruptible Fiber reconciliation for heavy filtering
    startTransition(() => {
      setDeferredQuery(e.target.value);
    });
  }

  const filtered = products.filter(p => p.name.includes(deferredQuery));

  return (
    <div>
      <input value={query} onChange={handleInputChange} placeholder="Search..." />
      {isPending && <p className="spinner">Updating list...</p>}
      
      <ul>
        {filtered.map(item => (
          // Key prop guarantees O(N) stable Fiber node identity during re-orders
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Best Practices

- Always use stable, unique string/number IDs for `key` props (never `Math.random()` or array index `index` for lists that re-order or filter).
- Keep side-effects out of component render bodies — the Render Phase may be executed multiple times before committing.

## Common Mistakes

- Using array index `key={index}` on dynamic lists, causing React to misidentify Fiber nodes during deletion/sorting, leading to state corruption in form inputs.

## Follow-up Questions

1. How does `double buffering` (`current` vs `workInProgress` Fiber trees) prevent incomplete DOM UI states from being shown to users?
2. What is the difference between `useLayoutEffect` (synchronous in commit phase) and `useEffect` (passive asynchronous after paint)?

## Related Topics

- React Virtual DOM & Reconciliation
- useEffect Lifecycle Rules & Custom Hook Abstractions
