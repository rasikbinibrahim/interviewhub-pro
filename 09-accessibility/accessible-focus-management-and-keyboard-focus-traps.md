# QA11Y002 · Accessible Focus Management and Keyboard Focus Traps

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Microsoft, Apple, Deloitte  
**Interview Frequency:** ★★★★★  
**Category:** Accessibility  
**Concepts:** Focus Trap, Keyboard Navigation, Tabindex, ARIA Modal, Event Listeners  

## Expected Answer

A Focus Trap restricts keyboard focus (Tab / Shift+Tab) strictly inside an active modal dialog or drawer overlay, preventing users from inadvertently tabbing into underlying background page content while the modal is open.

## Deep Explanation

When a modal opens, focus should immediately move to the modal container or its first interactive element. Keydown events monitor the Tab key: if tabbing forward on the last tabbable element, focus loops to the first tabbable element; if tabbing backward on the first, focus loops to the last. Upon closing, focus must return to the original trigger element.

## Production Example

A screen reader user interacting with a checkout confirmation modal tabs past the "Pay Now" button and unexpectedly begins filling out hidden background form fields, causing unintended state changes.

## Best Practices

- Store document.activeElement before opening modal to restore focus on teardown
- Listen for the Escape key to close active overlays gracefully

## Trade-offs

- Manual focus trap implementations require comprehensive querying of visible tabbable selectors
- Improper focus management causes frustrating focus loss bugs

## Common Mistakes

- Removing outline styling (outline: none) without providing a custom visible :focus-visible indicator
- Failing to restore focus to the triggering element when closing a dialog

## Follow-up Questions

1. How does the HTML5 <dialog> element natively handle focus trapping with showModal()?
2. What is the difference between tabindex="0" and tabindex="-1"?

## Related Topics

- Accessible Modal Dialog
- WCAG Standards
