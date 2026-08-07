# T216 · Event Propagation Architecture: Capturing, Target, Bubbling & Event Delegation

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** event-delegation, event-bubbling, event-capturing, event-propagation, dom  

## Question

What are the 3 phases of **DOM Event Propagation** (**Capturing**, **Target**, and **Bubbling**), how do `event.stopPropagation()`, `event.stopImmediatePropagation()`, and `event.preventDefault()` differ, and how does **Event Delegation** attach a single event listener to a parent element (`e.target.closest()`) to handle thousands of dynamic child nodes efficiently?

## Expected Answer

1. **The 3 DOM Event Propagation Phases**:
   - **Phase 1: Capturing Phase (Trickling)**: Event travels down from the `Window` root through parent ancestors to the target element (`addEventListener('click', fn, true)`).
   - **Phase 2: Target Phase**: Event arrives at the actual `e.target` element.
   - **Phase 3: Bubbling Phase**: Event bubbles back up from the target element through parent ancestors to `Window` (`addEventListener('click', fn, false)`). Default phase for event handlers.
2. **Event Cancellation**:
   - `e.stopPropagation()`: Stops event from bubbling further up (or capturing down) the DOM tree.
   - `e.stopImmediatePropagation()`: Stops event propagation AND prevents other event handlers attached to the **SAME element** from firing.
   - `e.preventDefault()`: Cancels browser default behavior (e.g. link navigation, form submission) without stopping propagation.
3. **Event Delegation**:
   - Instead of binding 1,000 separate event listeners to 1,000 list items (`<li>`), attach **ONE single listener to the parent container (`<ul>`)**. Inspect `e.target.closest('.item-class')` to identify which child was clicked!

## Deep Explanation

### DOM Event Propagation Diagram

```
Window ──► Document ──► Body ──► [ Parent Container ] ──► [ Target <li> ]
  │                                    │                      │
  └────────── CAPTURING PHASE ─────────┴───────── TARGET ─────┘
                                                     │
Window ◄── Document ◄── Body ◄── [ Parent Container ] ◄──────┘
  │                                    │
  └────────── BUBBLING PHASE ──────────┘
```

## Production Example

```javascript
// Production Event Delegation Pattern: Single Parent Listener for Dynamic Lists
export function setupDynamicListDelegation(parentContainerId) {
  const container = document.getElementById(parentContainerId);
  if (!container) return;

  container.addEventListener('click', (event) => {
    // Locate target button using e.target.closest()
    const deleteBtn = event.target.closest('.btn-delete');
    const editBtn = event.target.closest('.btn-edit');

    if (deleteBtn) {
      const rowId = deleteBtn.dataset.id;
      console.log(`[Event Delegation] Deleting row ID: ${rowId}`);
      deleteRow(rowId);
      return;
    }

    if (editBtn) {
      const rowId = editBtn.dataset.id;
      console.log(`[Event Delegation] Editing row ID: ${rowId}`);
      editRow(rowId);
      return;
    }
  });
}
```

## Best Practices

- Always use Event Delegation for dynamic tables, infinite scroll feeds, and large lists to save memory and avoid memory leaks from detached DOM nodes.
- Use `e.target.closest(selector)` instead of `e.target.matches()` to catch clicks on nested child elements inside buttons (e.g. `<button><svg><path></path></svg></button>`).

## Common Mistakes

- Assuming all DOM events bubble up — events like `focus`, `blur`, `mouseenter`, `mouseleave`, and `scroll` do **NOT** bubble by default.

## Follow-up Questions

1. How do React Synthetic Events implement Event Delegation at the root container level in React 17+?

## Related Topics

- Web APIs: MutationObserver, IntersectionObserver & ResizeObserver
- Accessible Autocomplete Combobox Component
