# Q5908 · Accessible Custom Accordion Component

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, accordion, accessibility, WAI-ARIA

## Problem Statement

Implement an `Accordion` component — `Accordion({ items, allowMultiple
})`, where each item is `{ id, title, content }` — that expands/
collapses each item's content on click, with proper `aria-expanded`/
`aria-controls` wiring. When `allowMultiple` is `false` (the default),
opening one item closes any other currently-open item; when `true`,
any number of items can be open simultaneously.

## Input

`items`: an array of `{ id: string, title: string, content: string }`.
`allowMultiple`: optional boolean, defaults to `false`.

## Output

Renders a list of collapsible sections; clicking a section's header
toggles whether its content is shown.

## Constraints

`items` may be empty (renders nothing)

## Examples

```tsx
<Accordion
  items={[
    { id: 'faq1', title: 'What is your return policy?', content: '30 days, no questions asked.' },
    { id: 'faq2', title: 'Do you ship internationally?', content: 'Yes, to over 50 countries.' },
  ]}
/>
// Clicking "What is your return policy?" reveals its content and sets
// aria-expanded="true" on that button. Clicking "Do you ship
// internationally?" next closes the first item (allowMultiple is
// false by default) and opens the second.
```

## Edge Cases

- `allowMultiple = false` (default), an already-open item clicked again
  → closes it, leaving nothing open
- `allowMultiple = false`, a *different* item clicked while one is open
  → the previously open item closes as the new one opens
- `allowMultiple = true` → any number of items can be open at once,
  independently
- Empty `items` array → renders an empty container, no error

## Hints

1. Native `<button>` elements already handle `Enter`/`Space` activation
   for free — what ARIA attributes does the *button* itself need so
   assistive technology knows it toggles a collapsible section, and what
   does the *content panel* need so technology knows which button
   controls it?
2. `aria-expanded` on the button (reflecting whether this item's content
   is currently shown) and `aria-controls` (pointing at the content
   panel's `id`) form the link between trigger and panel — the panel
   itself doesn't need special ARIA beyond a matching `id`.
3. Whether opening one item should close others depends entirely on
   `allowMultiple` — model the currently-open items as an array of ids,
   and let the toggle logic branch on that flag: replace the whole array
   with just the clicked id (single-open mode), or add/remove the
   clicked id from the existing array (multi-open mode).

## Algorithm

**Pattern:** array-of-open-ids state, with click-handler logic branching
on `allowMultiple`.
**Core insight:** representing "which items are open" as an array of ids
(rather than, say, a single `activeId` or a map of booleans) naturally
supports both modes with one piece of state: in single-open mode,
toggling replaces the array with either `[]` (closing) or `[id]`
(opening exactly that one, implicitly closing any other); in
multi-open mode, toggling adds or removes just that one id from the
array, leaving every other open item untouched. Each item's open/closed
render state then reduces to a single `openIds.includes(item.id)`
check.
**Invariant:** whenever `allowMultiple` is `false`, `openIds` never
holds more than one id at a time; whenever `allowMultiple` is `true`,
`openIds` holds exactly the set of items the user has explicitly opened
and not yet closed.

## Dry Run

**Input:** `allowMultiple = false`, click "faq1", then click "faq2",
then click "faq2" again

| Step | Action | openIds before | openIds after |
|---|---|---|---|
| 1 | click faq1 | `[]` | `['faq1']` (not present → becomes the sole open item) |
| 2 | click faq2 | `['faq1']` | `['faq2']` (single-open mode: replaces, not appends) |
| 3 | click faq2 again | `['faq2']` | `[]` (already open → closes) |

**Result:** matches expected single-open-at-a-time accordion behavior.

## JavaScript Solution

```jsx
import React, { useState } from 'react';

export function Accordion({ items, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="accordion-item" style={{ borderBottom: '1px solid #ccc' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`content_${item.id}`}
              onClick={() => toggleItem(item.id)}
              style={{
                width: '100%',
                padding: 12,
                textAlign: 'left',
                fontWeight: 'bold',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {item.title} {isOpen ? '▲' : '▼'}
            </button>
            {isOpen && (
              <div id={`content_${item.id}`} role="region" style={{ padding: 12, background: '#fafafa' }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export const Accordion: React.FC<{ items: AccordionItem[]; allowMultiple?: boolean }> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="accordion-item" style={{ borderBottom: '1px solid #ccc' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`content_${item.id}`}
              onClick={() => toggleItem(item.id)}
              style={{
                width: '100%',
                padding: 12,
                textAlign: 'left',
                fontWeight: 'bold',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {item.title} {isOpen ? '▲' : '▼'}
            </button>
            {isOpen && (
              <div id={`content_${item.id}`} role="region" style={{ padding: 12, background: '#fafafa' }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

## Time Complexity

O(1) per toggle (an `includes`/`filter` over `openIds`, which is bounded
by how many items are simultaneously open, not the total item count) —
O(n) per render to map over all `items`.

## Space Complexity

O(k), where k is the number of currently-open items (at most 1 when
`allowMultiple` is `false`, up to n when `true`).

## Common Mistakes

- Modeling open/closed state as a single `activeId` (or boolean per
  item stored in a separate object) instead of an array of open ids —
  works for single-open mode, but doesn't cleanly extend to
  `allowMultiple`, usually requiring a second, parallel data structure.
- Conditionally rendering the content panel's DOM node entirely on
  `isOpen` (as shown here) versus toggling its visibility with CSS
  (`display: none` / `hidden`) — the mounted-only-when-open approach
  used here is simpler, but loses any internal state the content
  might have (like a scroll position or a partially-filled form) when
  the panel closes; toggling visibility with CSS instead would preserve
  it, at the cost of always rendering hidden content into the DOM.
- Forgetting `aria-controls` (or letting the `content_${id}` /
  `id={content_${id}}` pairing drift out of sync) — breaks the
  programmatic link between the trigger button and the panel it
  controls, even though the panel remains visually correct.

## Interview Follow-up Questions

1. How would you animate the open/close transition (height animation)
   given that the content's height isn't known ahead of time?
2. How would you support keyboard navigation *between* accordion headers
   (`ArrowUp`/`ArrowDown` moving focus among them), similar to the Tabs
   component?
3. How would you make an item open by default (e.g. via a `defaultOpen`
   prop), and how would that interact with `allowMultiple`?

## Similar Questions

- Accessible Custom Tabs Component (see [custom-tabs-accessible-component.md](custom-tabs-accessible-component.md))
- Accessible Modal Dialog Component with Focus Trap (see [custom-modal-dialog-focus-trap.md](custom-modal-dialog-focus-trap.md))
