# T1008 · React Portals (`createPortal`) & WAI-ARIA Modal Accessibility Patterns

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Airbnb, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, portals, createportal, accessibility, aria, Focus-trap  

## Question

How does `ReactDOM.createPortal` render children into a DOM node outside the parent component's DOM hierarchy while preserving React Event Bubbling, and what are the essential WAI-ARIA accessibility requirements for production modal dialogs (Focus Trapping, `aria-modal`, `Escape` key handlers)?

## Expected Answer

1. **`ReactDOM.createPortal(children, container)`**:
   - **DOM Hierarchy**: Appends rendered DOM elements directly into a designated container (e.g. `document.body` or `#modal-root`), escaping parent CSS `overflow: hidden` or `z-index` stacking context constraints.
   - **React Tree Preservation**: The portaled component remains a child node in the **React Virtual DOM Tree**. It has access to React Context and prop updates, and synthetic events bubble up through the **React component tree** (not the physical DOM tree).
2. **WAI-ARIA Accessibility Requirements**:
   - `role="dialog"` and `aria-modal="true"`.
   - `aria-labelledby` pointing to the modal title ID and `aria-describedby` pointing to the description ID.
   - **Focus Trap**: Focus must be constrained inside the modal container when open (`Tab` / `Shift+Tab`).
   - **Focus Restoration**: Focus must return to the trigger element that opened the modal when it closes.
   - Close modal on `Escape` key press.

## Deep Explanation

### Physical DOM vs Virtual DOM Portal Tree

```
Physical DOM Hierarchy:
<body>
  <div id="root">
    <main><button>Open Modal</button></main>
  </div>
  <div id="modal-root">
    <div class="modal">Portaled Dialog Content</div> <!-- Rendered Here in DOM! -->
  </div>
</body>

React Component Virtual Tree:
App -> Layout -> Main -> OpenButton -> AccessibleModalPortal -> ModalDialog
(Events bubble up through Main -> Layout -> App in React!)
```

## Production Example

```jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export function AccessibleModal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(document.activeElement); // Store trigger element

  useEffect(() => {
    if (!isOpen) return;

    // Focus Trap & Keyboard Handlers
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Focus first focusable inside modal
    modalRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to original trigger on close
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root') || document.body;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        tabIndex={-1}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close modal">✕</button>
      </div>
    </div>,
    modalRoot
  );
}
```

## Best Practices

- Always use React Portals for Modals, Tooltips, Popovers, and Dropdown menus to bypass parent container `z-index` and `overflow: hidden` bugs.
- Always implement focus trapping and `aria-modal="true"` to provide screen readers and keyboard users with an accessible experience.

## Common Mistakes

- Forgetting to restore focus back to the triggering button after the modal closes, leaving keyboard users lost at the top of `document.body`.

## Follow-up Questions

1. Why do React Synthetic Events bubble through Portals based on the React Virtual DOM hierarchy rather than the physical DOM node hierarchy?

## Related Topics

- WCAG 2.1 Guidelines, ARIA Roles & Keyboard UX
- React Fiber Architecture & Diffing Algorithm
