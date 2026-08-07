# Q5915 · Accessible Autocomplete Typeahead Combobox Component

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, Uber
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, typeahead, combobox, debounce, accessibility

## Problem Statement

Implement an `Autocomplete` component —
`Autocomplete({ fetchSuggestions })` — that debounces user input,
fetches suggestions, and follows the WAI-ARIA combobox pattern: the
suggestion list is a `listbox` the input describes itself as
controlling, `ArrowDown`/`ArrowUp` move a highlighted option (wrapping
at the ends) without moving text focus out of the input, `Enter` selects
the highlighted option, and `Escape` closes the suggestion list.

## Input

`fetchSuggestions`: `(query: string) => Promise<string[]>`, called with
the current (debounced) input text.

## Output

Renders a text input; while suggestions exist, renders a listbox of
options below it, with one option visually and programmatically
highlighted at a time.

## Constraints

Debounce delay of 300ms before calling `fetchSuggestions`

## Examples

```tsx
<Autocomplete fetchSuggestions={(q) => api.searchCities(q)} />
// Typing "lon" (debounced 300ms) calls fetchSuggestions("lon"), which
// might resolve to ["London", "Long Beach", "Londonderry"]. ArrowDown
// highlights "London" without moving input focus; Enter fills the
// input with "London" and closes the list.
```

## Edge Cases

- Empty or whitespace-only query → suggestions cleared, list closed, no
  fetch call made
- `fetchSuggestions` resolves to an empty array → list stays closed
- `ArrowDown` pressed while on the last option → wraps to the first
  option, not stuck at the end
- A slower-in-flight fetch resolving *after* a newer one (out-of-order
  network responses) → only the debounce timer's cleanup on each
  keystroke matters here, since only one fetch is ever scheduled at a
  time per keystroke burst
- `Escape` pressed while the list is open → closes the list without
  clearing the typed query

## Hints

1. `aria-expanded` on the input is a start, but the WAI-ARIA combobox
   pattern needs more: the input should describe itself as a
   `role="combobox"` controlling a `role="listbox"`, and needs a way to
   tell assistive technology *which option is currently highlighted*
   without moving actual DOM focus away from the input — what ARIA
   attribute exists specifically for that?
2. `aria-activedescendant` on the input, set to the `id` of the
   currently highlighted `role="option"` element, lets a screen reader
   announce the highlighted option while focus visually and
   programmatically stays in the text input the whole time.
3. Track a `highlightedIndex` in state, updated by `ArrowDown`/
   `ArrowUp` (with wraparound), and use it both to compute
   `aria-activedescendant`'s value and to determine which option
   `Enter` should select.

## Algorithm

**Pattern:** debounced fetch plus a WAI-ARIA combobox with a virtual
(non-DOM-focus-moving) highlight.
**Core insight:** a combobox is unusual among composite ARIA widgets
because keyboard focus never actually leaves the text input — arrow
keys instead move a *virtual* highlight among the listbox's options,
communicated to assistive technology via `aria-activedescendant`
(rather than by literally moving DOM focus, as tabs or a menu would).
This lets a user keep typing to refine the query while still being able
to arrow through and select a suggestion. Debouncing the fetch (waiting
300ms of typing inactivity before calling `fetchSuggestions`, and
canceling any pending timer on each new keystroke) avoids firing a
network request on every single keystroke.
**Invariant:** at any point while the list is open, `highlightedIndex`
is always a valid index into `suggestions` (or `-1` for "nothing
highlighted"), and `aria-activedescendant` always matches whichever
option that index currently points to.

## Dry Run

**Input:** user types `"lo"`, waits, list opens with
`["London", "Long Beach", "Londonderry"]`, presses `ArrowDown` twice,
then `Enter`

| Step | Action | highlightedIndex | aria-activedescendant |
|---|---|---|---|
| 1 | debounce timer fires 300ms after last keystroke | -1 | (none) |
| 2 | `fetchSuggestions("lo")` resolves | -1 | (none) |
| 3 | `ArrowDown` | 0 | `option-0` (London) |
| 4 | `ArrowDown` | 1 | `option-1` (Long Beach) |
| 5 | `Enter` | — | selects `suggestions[1]` = "Long Beach" |

**Result:** query becomes `"Long Beach"`, list closes — matches expected
combobox behavior.

## JavaScript Solution

```jsx
import React, { useEffect, useRef, useState } from 'react';

export function Autocomplete({ fetchSuggestions }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query).then((results) => {
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setHighlightedIndex(-1);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  function selectOption(index) {
    setQuery(suggestions[index]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      selectOption(highlightedIndex);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div style={{ position: 'relative', width: 300 }}>
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-listbox"
        aria-autocomplete="list"
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{ width: '100%', padding: 8 }}
      />
      {isOpen && (
        <ul
          id="autocomplete-listbox"
          role="listbox"
          style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ccc', margin: 0, padding: 0, listStyle: 'none' }}
        >
          {suggestions.map((item, idx) => (
            <li
              key={item}
              id={`option-${idx}`}
              role="option"
              aria-selected={idx === highlightedIndex}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => selectOption(idx)}
              style={{ padding: 8, cursor: 'pointer', background: idx === highlightedIndex ? '#eef4ff' : 'transparent' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useEffect, useRef, useState } from 'react';

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query).then((results) => {
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setHighlightedIndex(-1);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  function selectOption(index: number): void {
    setQuery(suggestions[index]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      selectOption(highlightedIndex);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div style={{ position: 'relative', width: 300 }}>
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-listbox"
        aria-autocomplete="list"
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{ width: '100%', padding: 8 }}
      />
      {isOpen && (
        <ul
          id="autocomplete-listbox"
          role="listbox"
          style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ccc', margin: 0, padding: 0, listStyle: 'none' }}
        >
          {suggestions.map((item, idx) => (
            <li
              key={item}
              id={`option-${idx}`}
              role="option"
              aria-selected={idx === highlightedIndex}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => selectOption(idx)}
              style={{ padding: 8, cursor: 'pointer', background: idx === highlightedIndex ? '#eef4ff' : 'transparent' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Time Complexity

O(1) per keystroke for the debounce bookkeeping (starting/clearing a
timer); the fetch itself is bounded by network latency, outside the
component's control. Rendering the suggestion list is O(k), where k is
the number of suggestions returned.

## Space Complexity

O(k) — the current suggestions array, where k is the number returned by
`fetchSuggestions`.

## Common Mistakes

- Debouncing by calling `fetchSuggestions` immediately and only
  debouncing something else (or not canceling the previous timer) —
  without `clearTimeout` in the effect's cleanup, every keystroke
  schedules an additional fetch that still fires later, causing bursts
  of redundant network calls and potential out-of-order suggestion
  updates.
- Moving real DOM focus to each option as the user arrows through the
  list — breaks the combobox pattern's core UX: the user should be able
  to keep typing at any point without needing to tab back into the
  input; `aria-activedescendant` exists specifically so the highlight
  can be communicated without moving focus.
- Forgetting `(prev - 1 + suggestions.length) % suggestions.length` for
  `ArrowUp`'s wraparound — using plain `(prev - 1) % suggestions.length`
  produces a negative index when `prev` is `0`, since JavaScript's `%`
  preserves the dividend's sign.

## Interview Follow-up Questions

1. How would you handle out-of-order network responses — a fetch for an
   earlier, shorter query resolving *after* a fetch for a more recent
   one, potentially showing stale suggestions?
2. How would you add loading and "no results found" states to the
   listbox?
3. How would you make this work with a virtualized list of suggestions,
   for a dataset too large to render as plain DOM nodes?

## Similar Questions

- Accessible Custom Tabs Component (see [custom-tabs-accessible-component.md](custom-tabs-accessible-component.md))
- Custom Infinite Scroll Feed Component (see [custom-infinite-scroll-feed-component.md](custom-infinite-scroll-feed-component.md))
