# T324 · Common JavaScript Memory Leaks: Detached DOM Nodes, Uncleared Timers & Closure Retentions

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** Advanced JavaScript  
**Concepts:** memory-leaks, garbage-collection, detached-dom, closures, event-listeners  

## Question

What are the 4 primary sources of memory leaks in single-page web applications (**Accidental Global Variables**, **Uncleared Timers/Intervals**, **Detached DOM Tree References**, and **Stale Event Listeners/Closures**), and how do you diagnose them using Chrome DevTools Heap Snapshots?

## Expected Answer

1. **Uncleared Timers**: `setInterval()` callbacks holding references to unmounted components.
2. **Detached DOM Nodes**: Keeping JS array references to DOM nodes removed from document tree.
3. **Stale Event Listeners**: Forgetting `removeEventListener()` on unmount.
4. **Closure Retentions**: Large arrays retained inside long-lived closure scopes.

```javascript
// Memory Leak Example: Detached DOM Node
let detachedElement;

function createLeak() {
  const div = document.createElement('div');
  div.id = 'leaked-node';
  document.body.appendChild(div);
  
  detachedElement = div; // JS holds reference!
  document.body.removeChild(div); // Removed from DOM tree, but retained in memory!
}
```
