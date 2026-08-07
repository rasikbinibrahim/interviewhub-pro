# Q5902 · Accessible Autocomplete Combobox with Debouncing & Keyboard Navigation

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Uber, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** machine-coding, react, combobox, debouncing, accessibility, aria, keyboard-navigation  

## Problem Statement

Implement a production-grade, accessible **Autocomplete Combobox Component** in React.

Requirements:
1. **Debounced Fetch**: Debounce remote API search queries by `300ms` to prevent API rate limiting.
2. **Full Keyboard Navigation**: Support `ArrowDown`, `ArrowUp`, `Enter`, and `Escape` key controls.
3. **Accessibility**: Implement WAI-ARIA Combobox pattern (`role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-activedescendant`).
4. **Highlight Matching Text**: Highlight matching search query characters inside dropdown items.
5. **Loading & Empty States**: Render accessible loading indicators and zero-results fallback views.

## Input

- Props: `fetchSuggestions(query: string): Promise<Array<{ id: string; label: string }>>`, `onSelect(item): void`

## Output

- Interactive, fully accessible Autocomplete Combobox UI component

## Examples

```jsx
<AutocompleteCombobox
  fetchSuggestions={async (q) => fetch(`/api/search?q=${q}`).then((r) => r.json())}
  onSelect={(item) => console.log('Selected:', item)}
/>
```

## Edge Cases

- Rapid typing -> debounced fetch cancels or ignores previous out-of-order network responses (race conditions).
- Empty search string -> hides dropdown list.

## Solution Code

```jsx
import React, { useState, useEffect, useRef } from 'react';

export function AutocompleteCombobox({ fetchSuggestions, onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);

  // Debounced API Search with Race Condition Protection
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    let isCurrent = true;
    setIsLoading(true);

    const handler = setTimeout(async () => {
      try {
        const results = await fetchSuggestions(query);
        if (isCurrent) {
          setSuggestions(results);
          setIsOpen(results.length > 0);
          setActiveIndex(-1);
          setIsLoading(false);
        }
      } catch (err) {
        if (isCurrent) {
          setSuggestions([]);
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      isCurrent = false;
      clearTimeout(handler);
    };
  }, [query, fetchSuggestions]);

  function handleKeyDown(e) {
    if (!isOpen) {
      if (e.key === 'ArrowDown') setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          selectItem(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  function selectItem(item) {
    setQuery(item.label);
    onSelect(item);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  return (
    <div className="combobox-container">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-activedescendant={
          activeIndex >= 0 ? `suggestion-option-${activeIndex}` : undefined
        }
        aria-controls="suggestion-listbox"
        placeholder="Search..."
      />

      {isLoading && <div className="spinner">Loading...</div>}

      {isOpen && (
        <ul id="suggestion-listbox" role="listbox" className="dropdown-menu">
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              id={`suggestion-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`dropdown-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => selectItem(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Time & Space Complexity

- **Time Complexity**: $O(1)$ state updates per key stroke; $O(N)$ dropdown item rendering.
- **Space Complexity**: $O(N)$ memory storing current active suggestions.

## Key Takeaways

- Use `isCurrent` flag inside `useEffect` cleanup to drop stale out-of-order network responses.
- Always tie `aria-activedescendant` to `id="suggestion-option-${index}"` to ensure screen readers announce highlighted list items during keyboard navigation.
