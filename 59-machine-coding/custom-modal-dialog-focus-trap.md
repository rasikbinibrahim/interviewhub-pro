# Q5916 · Accessible Modal Dialog Component with Focus Trap & Portal

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, modal, focus-trap, portal, accessibility

## Problem Statement

Implement a `Modal` component — `Modal({ isOpen, onClose, children })` —
rendered through a portal, that: closes on `Escape`, closes when the
backdrop is clicked, and **traps keyboard focus** inside itself while
open (`Tab`/`Shift+Tab` cycle only through the modal's own focusable
elements, never escaping to the page behind it), restoring focus to
whatever element had it before the modal opened once it closes.

## Input

`isOpen`: boolean, whether the modal is currently shown. `onClose`: a
callback invoked when the modal should close. `children`: the modal's
content.

## Output

Renders nothing when `isOpen` is `false`. When `isOpen` is `true`,
renders a backdrop and dialog into `document.body` via a portal, with
focus trapped inside the dialog until it closes.

## Constraints

The dialog must always contain at least one focusable element while
open (as guaranteed by the required close button)

## Examples

```tsx
function App() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Confirm action</h2>
        <button>Confirm</button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </Modal>
    </>
  );
}
// Opening the modal moves focus into it; Tab/Shift+Tab cycle only among
// its buttons; Escape (or the backdrop, or "Cancel") closes it and
// returns focus to the "Open dialog" button.
```

## Edge Cases

- `isOpen` becomes `true` → focus moves into the modal (to its first
  focusable element), not left on whatever was focused on the page
  behind it
- `isOpen` becomes `false` (however it happened — Escape, backdrop
  click, or a button inside) → focus returns to the element that
  triggered the modal, not lost to `document.body`
- `Tab` pressed while focus is on the *last* focusable element inside
  the modal → wraps to the *first* focusable element, not out to the
  page
- `Shift+Tab` pressed while focus is on the *first* focusable element →
  wraps to the *last*, not out to the page
- Clicking the backdrop (outside the dialog box itself) → closes the
  modal, same as Escape

## Hints

1. `aria-modal="true"` and `role="dialog"` describe the modal to
   assistive technology, but they don't actually *prevent* a sighted
   keyboard user from tabbing past the dialog into the page behind it —
   that behavior has to be implemented explicitly.
2. On every `Tab` keydown while the modal is open, query all focusable
   elements *within the modal* (`querySelectorAll` for buttons, links,
   inputs, and anything with a non-negative `tabindex`), and if focus is
   about to leave that set at either end, redirect it back to the other
   end with `.focus()` and `preventDefault()`.
3. Focus management has two halves, both needed: moving focus *into*
   the modal when it opens (so a keyboard user isn't left stranded on a
   now-hidden trigger), and restoring focus *back* to wherever it was
   when the modal closes (so closing a dialog doesn't strand focus at
   `document.body`).

## Algorithm

**Pattern:** effect-driven focus management, keyed on `isOpen`, plus a
`Tab`-key interceptor that cycles among the modal's own focusable
elements.
**Core insight:** a real focus trap requires two separate, complementary
mechanisms working together. First, an entry/exit effect: when `isOpen`
flips to `true`, remember `document.activeElement` (whatever had focus
just before opening) and move focus into the dialog; when it flips back
to `false`, restore focus to that remembered element. Second, a live
keydown interceptor for `Tab`: since the browser's native tab order has
no awareness of "stay inside this dialog," the component must
explicitly compute the dialog's focusable elements on every `Tab`
press and, when focus is about to move past the first or last one,
redirect it back to the other end instead of letting the browser's
default tab order take over.
**Invariant:** whenever `isOpen` is `true`, focus is guaranteed to be
somewhere inside the modal's DOM subtree — every `Tab`/`Shift+Tab` press
either moves focus to another focusable element still inside the modal,
or wraps back to one that is.

## Dry Run

**Interaction:** click "Open dialog" → modal opens with a "Confirm" and
"Cancel" button inside → press `Tab` twice → press `Shift+Tab` twice →
press `Escape`

| Step | Action | Focus after |
|---|---|---|
| 1 | Click "Open dialog" | `isOpen` becomes `true`; effect saves the trigger button as `previouslyFocused`, moves focus to the close button (✕) |
| 2 | `Tab` | "Confirm" button |
| 3 | `Tab` | "Cancel" button (last focusable element) |
| 4 | `Shift+Tab` | "Confirm" button |
| 5 | `Shift+Tab` | close button (✕) — wrapped back from the *first* element |
| 6 | `Escape` | `onClose()` fires, `isOpen` becomes `false`; effect restores focus to the "Open dialog" trigger button |

**Result:** focus never escapes the modal while it's open, and correctly
returns to the trigger once it closes — matches the expected behavior.

## JavaScript Solution

```jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    const focusables = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusables.length > 0) focusables[0].focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedRef.current) previouslyFocusedRef.current.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', padding: 24, borderRadius: 8, maxWidth: 500, width: '100%' }}
      >
        <button onClick={onClose} style={{ float: 'right' }} aria-label="Close dialog">✕</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## TypeScript Solution

```tsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const focusables = dialogRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables.length > 0) focusables[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(dialogRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', padding: 24, borderRadius: 8, maxWidth: 500, width: '100%' }}
      >
        <button onClick={onClose} style={{ float: 'right' }} aria-label="Close dialog">✕</button>
        {children}
      </div>
    </div>,
    document.body
  );
};
```

## Time Complexity

O(f) per keystroke, where f is the number of focusable elements inside
the modal — each `Tab` press re-queries the DOM for focusable elements;
f is typically small (a handful of buttons/inputs) so this is
effectively O(1) in practice.

## Space Complexity

O(f) for the queried focusable-elements list, plus O(1) for the two refs
(`dialogRef`, `previouslyFocusedRef`).

## Common Mistakes

- Adding `role="dialog"` and `aria-modal="true"` and considering the
  accessibility work done — these attributes describe the modal to
  screen readers, but do nothing to prevent sighted keyboard users from
  tabbing straight through it into the page behind; the actual trap has
  to be implemented in JavaScript.
- Moving focus into the modal on open but never restoring it on close —
  leaves keyboard users stranded at `document.body` after closing,
  forcing them to tab from the very top of the page again.
- Re-querying focusable elements only once (e.g. on mount) instead of on
  every `Tab` press — if the modal's content changes while open (e.g. a
  form that reveals more fields), a stale focusable-elements list
  produces incorrect wrap-around behavior.

## Interview Follow-up Questions

1. How would you handle a modal whose content has *zero* focusable
   elements — what should Tab do then?
2. How would you support *nested* modals (a modal opened from within
   another modal), and what would focus restoration need to account
   for?
3. Why is rendering through a portal (`ReactDOM.createPortal`) important
   here, beyond just visual stacking — what CSS/layout problems does it
   sidestep?

## Similar Questions

- Accessible Custom Tabs Component (see [custom-tabs-accessible-component.md](custom-tabs-accessible-component.md))
- Accessible Custom Accordion Component (see [custom-accordion-accessible-component.md](custom-accordion-accessible-component.md))
