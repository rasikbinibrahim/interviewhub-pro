# T901 · WCAG 2.1 Guidelines, ARIA Roles & Keyboard Focus Management

**Difficulty:** Medium  
**Companies Asked:** Microsoft, Google, Apple, Airbnb, Salesforce  
**Interview Frequency:** ★★★★☆  
**Category:** Accessibility  
**Concepts:** wcag, aria-roles, focus-management, keyboard-navigation, a11y  

## Question

What are the four core principles of WCAG (POUR), when is it appropriate to use ARIA attributes, and how do you programmatically manage focus and create accessible keyboard interaction loops for modal dialogs and dropdown menus?

## Expected Answer

1. **WCAG Principles (POUR)**:
   - **Perceivable**: Content must be available via vision, hearing, or touch (e.g. text alternatives `alt`, contrast ratios).
   - **Operable**: UI components must be operable via keyboard alone without timing traps.
   - **Understandable**: Text and navigation must be predictable and intuitive.
   - **Robust**: Markup must be compatible with current and future assistive technologies.
2. **First Rule of ARIA**: Do not use ARIA if a native HTML element (`<button>`, `<a href>`, `<dialog>`, `<input>`) already provides the required semantic role and keyboard behavior.
3. **Focus Management**: When a modal opens, programmatically save the trigger element's focus, move focus inside the modal (`dialog.focus()`), trap `Tab` navigation within the modal boundary, and restore focus to the original trigger upon pressing `Escape` or closing.

## Deep Explanation

### 1. Color Contrast Ratios (WCAG 2.1 Level AA)
- **Normal Text (< 18pt / 24px)**: Minimum 4.5:1 contrast ratio against background.
- **Large Text (≥ 18pt / 24px bold)**: Minimum 3.0:1 contrast ratio.
- **UI Components & Graphical Objects**: Minimum 3.0:1 contrast ratio.

### 2. Common ARIA Misconceptions
ARIA adds semantics to the Accessibility Tree; **ARIA does NOT add keyboard functionality or focusability**. For example, adding `role="button"` to a `<div>` does NOT make it focusable by `Tab` key or clickable via `Enter`/`Space` — you must explicitly add `tabIndex={0}` and a keydown listener.

### 3. Accessible Focus Trap Pattern
For custom modal overlays, focus must stay constrained inside the container until closed:
- `KeyDown` Listener: Intercepts `Tab` key.
- If `Shift + Tab` on first focusable element -> Wrap to last focusable element.
- If `Tab` on last focusable element -> Wrap to first focusable element.
- `Escape` Key Listener: Close modal immediately and restore focus.

## Production Example

```typescript
import React, { useEffect, useRef } from 'react';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AccessibleModal({ isOpen, onClose, title, children }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Save currently focused element to restore later
      triggerRef.current = document.activeElement as HTMLElement;

      // 2. Focus modal container on mount
      modalRef.current?.focus();

      // 3. Keydown listener for Escape and Tab trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // 4. Restore focus on unmount
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog">
            &times;
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
```

## Best Practices

- Always test your application using keyboard navigation alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Arrow Keys`).
- Run automated accessibility audits (axe-core, Lighthouse) in your CI/CD pipeline.
- Use `sr-only` utility classes for visual-only status icons that require screen-reader text.

## Common Mistakes

- Setting `outline: none` in CSS without providing a visible `:focus-visible` replacement style.
- Using `tabIndex > 0`, which disrupts natural DOM tab order and causes focus jumping.

## Follow-up Questions

1. How do `aria-live="polite"` vs `aria-live="assertive"` regions announce dynamic content updates?
2. What are the key differences between `aria-hidden="true"` and `hidden` attribute in HTML?

## Related Topics

- Semantic HTML5 Elements & Document Structure
- Accessible Component Design: Headless UI & Radix Primitives
