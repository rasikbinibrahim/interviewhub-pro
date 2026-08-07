# Q5910 · Accessible Custom Tabs Component (WAI-ARIA Tablist)

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, tabs, accessibility, wai-aria, keyboard-navigation

## Problem Statement

Implement a `Tabs` component — `Tabs({ tabs })`, where each tab is
`{ id, label, content }` — following the WAI-ARIA Tabs pattern: clicking
a tab activates it, and with focus anywhere in the tablist, `ArrowLeft`
/`ArrowRight` move both focus *and* selection to the previous/next tab
(wrapping around at the ends), and `Home`/`End` jump to the first/last
tab.

## Input

`tabs`: an array of `{ id: string, label: string, content: ReactNode }`.

## Output

Renders a tablist of buttons and, below it, the content panel for
whichever tab is currently active.

## Constraints

`tabs` has at least one entry

## Examples

```tsx
<Tabs
  tabs={[
    { id: 'profile', label: 'Profile', content: <ProfilePanel /> },
    { id: 'settings', label: 'Settings', content: <SettingsPanel /> },
    { id: 'billing', label: 'Billing', content: <BillingPanel /> },
  ]}
/>
// Clicking "Settings" activates it. With focus on any tab, ArrowRight
// moves to and activates the next tab (wrapping from Billing back to
// Profile); Home jumps straight to Profile, End straight to Billing.
```

## Edge Cases

- Single tab → arrow keys have nowhere to move to; `ArrowLeft`/
  `ArrowRight` on the only tab just keep it focused and active
- Focus on the last tab, `ArrowRight` pressed → wraps around to the
  first tab, not stuck at the end
- Focus on the first tab, `ArrowLeft` pressed → wraps around to the
  last tab
- `Home`/`End` pressed → jump directly to the first/last tab regardless
  of which tab currently has focus

## Hints

1. `role="tab"`, `aria-selected`, and a roving `tabIndex` (`0` for the
   active tab, `-1` for the rest) are the static ARIA wiring — but the
   WAI-ARIA Tabs pattern also *requires* arrow-key navigation between
   tabs; without it, keyboard users can only reach whichever tab happens
   to be active via `Tab` key, and can't cycle through the others at
   all.
2. Attach a single `onKeyDown` handler to the tablist container (or each
   tab button) that checks `e.key` for `ArrowLeft`, `ArrowRight`,
   `Home`, and `End`, and computes the target tab's index from the
   currently active one.
3. Moving focus and updating the active tab need to happen together —
   when a new tab index is computed, both call `.focus()` on that tab's
   button element *and* update the active-tab state, so keyboard
   navigation and click activation stay in sync (this "automatic
   activation on arrow key" behavior, versus requiring a separate Enter
   press, is a deliberate, common choice for tabs specifically).

## Algorithm

**Pattern:** roving tabindex with wrapping arrow-key navigation.
**Core insight:** the WAI-ARIA Tabs pattern uses a "roving tabindex" —
only the active tab is in the normal Tab order (`tabIndex={0}`), while
every other tab is removed from it (`tabIndex={-1}`) but still
individually focusable via `.focus()` calls. Arrow keys move both
keyboard focus *and* the active selection together, computed as
`(currentIndex + direction + tabs.length) % tabs.length` — adding
`tabs.length` before the modulo ensures the wrap-around works correctly
even when `direction` is `-1` (JavaScript's `%` can return negative
results for negative operands otherwise).
**Invariant:** at all times, exactly one tab button has `tabIndex={0}`
and `aria-selected={true}` — the currently active tab — and it's always
the same tab whose panel is currently visible.

## Dry Run

**Input:** 3 tabs `[Profile, Settings, Billing]`, focus currently on
"Settings" (index 1)

| Key pressed | nextIndex computation | new active tab | focus moves to |
|---|---|---|---|
| `ArrowRight` | `(1 + 1 + 3) % 3 = 2` | Billing | Billing button |
| `ArrowRight` (again, now on Billing, index 2) | `(2 + 1 + 3) % 3 = 0` | Profile | Profile button (wrapped) |
| `ArrowLeft` (now on Profile, index 0) | `(0 - 1 + 3) % 3 = 2` | Billing | Billing button (wrapped the other way) |
| `Home` | jump to index `0` | Profile | Profile button |
| `End` | jump to index `tabs.length - 1 = 2` | Billing | Billing button |

**Result:** focus and active selection move together, wrapping
correctly at both ends — matches the expected WAI-ARIA Tabs behavior.

## JavaScript Solution

```jsx
import React, { useRef, useState } from 'react';

export function Tabs({ tabs }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const tabRefs = useRef([]);

  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);

  function activateByIndex(index) {
    const nextTab = tabs[index];
    setActiveTabId(nextTab.id);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(e) {
    const count = tabs.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      activateByIndex((activeIndex + 1 + count) % count);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      activateByIndex((activeIndex - 1 + count) % count);
    } else if (e.key === 'Home') {
      e.preventDefault();
      activateByIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      activateByIndex(count - 1);
    }
  }

  return (
    <div className="tabs-wrapper">
      <div
        role="tablist"
        aria-label="Content Tabs"
        onKeyDown={handleKeyDown}
        style={{ display: 'flex', borderBottom: '1px solid #ccc' }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel_${tab.id}`}
              id={`tab_${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => activateByIndex(index)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderBottom: isActive ? '2px solid #0066ff' : 'none',
                background: 'transparent',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel_${tab.id}`}
          aria-labelledby={`tab_${tab.id}`}
          hidden={tab.id !== activeTabId}
          style={{ padding: 16 }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useRef, useState } from 'react';

export interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

export const Tabs: React.FC<{ tabs: TabData[] }> = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);

  function activateByIndex(index: number): void {
    const nextTab = tabs[index];
    setActiveTabId(nextTab.id);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    const count = tabs.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      activateByIndex((activeIndex + 1 + count) % count);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      activateByIndex((activeIndex - 1 + count) % count);
    } else if (e.key === 'Home') {
      e.preventDefault();
      activateByIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      activateByIndex(count - 1);
    }
  }

  return (
    <div className="tabs-wrapper">
      <div
        role="tablist"
        aria-label="Content Tabs"
        onKeyDown={handleKeyDown}
        style={{ display: 'flex', borderBottom: '1px solid #ccc' }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel_${tab.id}`}
              id={`tab_${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => activateByIndex(index)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderBottom: isActive ? '2px solid #0066ff' : 'none',
                background: 'transparent',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel_${tab.id}`}
          aria-labelledby={`tab_${tab.id}`}
          hidden={tab.id !== activeTabId}
          style={{ padding: 16 }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
```

## Time Complexity

O(1) per key press or click — index arithmetic and a single array
lookup, independent of the number of tabs (aside from the O(n)
`findIndex` per render, which is negligible for the small tab counts
this component is meant for).

## Space Complexity

O(n) — one ref per tab button, one panel per tab, where n is the number
of tabs.

## Common Mistakes

- Wiring up `role="tab"`/`aria-selected`/roving `tabIndex` but stopping
  there — this is the *static* half of the WAI-ARIA Tabs pattern; the
  spec also requires arrow-key navigation, without which keyboard users
  can't cycle between tabs at all (only `Tab`/`Shift+Tab` past the
  single reachable active tab).
- Moving focus without updating the active tab (or vice versa) — the
  WAI-ARIA Tabs pattern expects arrow-key navigation to activate the
  newly focused tab immediately, not require a separate `Enter`/`Space`
  press (that's the "automatic activation" model, the more common
  convention for tabs specifically, versus "manual activation" used by
  some other composite widgets).
- Using plain `(index + 1) % count` for `ArrowLeft` without first adding
  `count` — `(0 - 1) % 3` evaluates to `-1` in JavaScript, not `2`,
  since `%` preserves the sign of the dividend; the fix is
  `(index - 1 + count) % count`.

## Interview Follow-up Questions

1. How would you support vertical tabs, where `ArrowUp`/`ArrowDown`
   navigate instead of `ArrowLeft`/`ArrowRight`?
2. How would you implement "manual activation" instead (arrow keys move
   focus only; the tab activates on a separate `Enter`/`Space` press),
   and when is that the more appropriate choice?
3. How would you handle a tab being disabled — should arrow-key
   navigation skip over it?

## Similar Questions

- Accessible Custom Accordion Component (see [custom-accordion-accessible-component.md](custom-accordion-accessible-component.md))
- Accessible Modal Dialog Component with Focus Trap (see [custom-modal-dialog-focus-trap.md](custom-modal-dialog-focus-trap.md))
