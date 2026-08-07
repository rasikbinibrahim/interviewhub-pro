# T205 · Event Bubbling, Event Capturing & Event Delegation Pattern

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe, Uber  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** dom, events, event-bubbling, event-capturing, event-delegation  

## Question

What are the 3 phases of the DOM Event Propagation flow (Capturing, Target, Bubbling), how does Event Delegation optimize memory usage and dynamic element handling, and what are the exact differences between `e.target`, `e.currentTarget`, `e.stopPropagation()`, and `e.stopImmediatePropagation()`?

## Expected Answer

1. **Event Propagation Phases**:
   - **Phase 1: Capturing (Trickling)**: Event travels down from `window` through parent elements to the target element (`addEventListener(type, listener, true)`).
   - **Phase 2: Target**: Event reaches the target element where the user interacted.
   - **Phase 3: Bubbling**: Event bubbles up from the target element through parent elements to `window` (`addEventListener(type, listener, false)` default).
2. **Event Delegation**: Attaching a single event listener to a parent container instead of attaching separate listeners to hundreds of child elements. Uses `e.target` to identify which child element triggered the event. Reduces memory usage and automatically handles dynamically added child elements.
3. **Event Properties & Methods**:
   - `e.target`: The actual DOM node where the event originated (e.g. `<button>` clicked inside a container).
   - `e.currentTarget`: The DOM node to which the event listener is attached (`this`).
   - `e.stopPropagation()`: Stops the event from bubbling further up (or capturing down) the DOM tree.
   - `e.stopImmediatePropagation()`: Stops event bubbling AND prevents other listeners attached to the SAME element from executing.

## Deep Explanation

### Event Propagation Diagram

```
WINDOW -> DOCUMENT -> HTML -> BODY -> TABLE -> TBODY -> TR -> TD (Click Target)
  |                                                           |
  +--- Capturing Phase (Phase 1)                              |
                                                              v
WINDOW <- DOCUMENT <- HTML <- BODY <- TABLE <- TBODY <- TR <- TD (Click Target)
  |
  +--- Bubbling Phase (Phase 3)
```

## Production Example

```javascript
// High-Performance Dynamic Data Table using Event Delegation
const userTableBody = document.getElementById('user-table-body');

userTableBody.addEventListener('click', function (event) {
  // Find closest button ancestor matching dataset action
  const deleteBtn = event.target.closest('[data-action="delete"]');
  const editBtn = event.target.closest('[data-action="edit"]');

  // Verify click originated inside the current delegate container
  if (!this.contains(deleteBtn) && !this.contains(editBtn)) return;

  if (deleteBtn) {
    const userId = deleteBtn.dataset.userId;
    console.log(`Deleting user ID: ${userId}`);
    deleteUserRow(userId);
  } else if (editBtn) {
    const userId = editBtn.dataset.userId;
    console.log(`Editing user ID: ${userId}`);
    openEditModal(userId);
  }
});
```

## Best Practices

- Use `Element.prototype.closest(selector)` inside event delegation handlers to cleanly match nested icon or text spans inside target buttons.
- Use `e.preventDefault()` to stop browser default actions (like form submissions or link navigation) without breaking event propagation.

## Common Mistakes

- Forgetting that non-bubbling events like `focus`, `blur`, `mouseenter`, and `mouseleave` do not bubble by default (use `focusin` / `focusout` for delegation).

## Follow-up Questions

1. Why do modern frameworks like React attach synthetic event listeners to the root container (`#root`) using event delegation?
2. What are passive event listeners (`{ passive: true }`), and how do they improve touch scrolling performance?

## Related Topics

- DOM MutationObserver, ResizeObserver & IntersectionObserver
- Synthetic Event System in React
