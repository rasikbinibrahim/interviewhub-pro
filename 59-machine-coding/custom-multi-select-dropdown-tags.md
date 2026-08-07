# Q5905 · Accessible Multi-Select Dropdown with Tag Pills Component

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Airbnb, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** machine-coding, multi-select, dropdown, tag-pills, accessibility, keyboard-navigation  

## Problem Statement

Build a production-ready, accessible **Multi-Select Dropdown with Tag Pills** component in React/TypeScript.

### Key Requirements
1. Render selected items as **removable Tag Pills** (`[ Tag ✕ ]`).
2. Search input filtering matching options in real-time.
3. Full Keyboard Navigation (`ArrowDown` / `ArrowUp` to navigate options, `Enter` / `Space` to toggle selection, `Backspace` on empty input to remove last tag, `Escape` to close).
4. Outside click handling to close dropdown automatically.
5. WAI-ARIA Combobox compliance (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`).

## Code Solution

```tsx
import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedIds?: string[];
  onChange?: (selected: Option[]) => void;
  placeholder?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  options,
  selectedIds = [],
  onChange,
  placeholder = 'Select options...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Option[]>(
    options.filter((opt) => selectedIds.includes(opt.id))
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      !selected.some((s) => s.id === opt.id) &&
      opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: Option) => {
    let next: Option[];
    if (selected.some((s) => s.id === option.id)) {
      next = selected.filter((s) => s.id !== option.id);
    } else {
      next = [...selected, option];
    }
    setSelected(next);
    setSearch('');
    if (onChange) onChange(next);
  };

  const removeTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = selected.filter((s) => s.id !== id);
    setSelected(next);
    if (onChange) onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => (prev + 1) % Math.max(1, filteredOptions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % Math.max(1, filteredOptions.length));
    } else if (e.key === 'Enter' && isOpen && filteredOptions[highlightedIndex]) {
      e.preventDefault();
      toggleOption(filteredOptions[highlightedIndex]);
    } else if (e.key === 'Backspace' && search === '' && selected.length > 0) {
      // Remove last tag on Backspace when search is empty
      const next = selected.slice(0, -1);
      setSelected(next);
      if (onChange) onChange(next);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="multi-select-container"
      style={{ position: 'relative', width: 320 }}
    >
      <div
        className="multi-select-input-wrapper"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          padding: 8,
          border: '1px solid #ccc',
          borderRadius: 6,
          cursor: 'text',
          background: '#fff',
        }}
      >
        {selected.map((item) => (
          <span
            key={item.id}
            className="tag-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              background: '#e0e0e0',
              borderRadius: 12,
              fontSize: 14,
            }}
          >
            {item.label}
            <button
              type="button"
              onClick={(e) => removeTag(item.id, e)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
              aria-label={`Remove ${item.label}`}
            >
              ✕
            </button>
          </span>
        ))}

        <input
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          placeholder={selected.length === 0 ? placeholder : ''}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          style={{ border: 'none', outline: 'none', flex: 1, minWidth: 80, fontSize: 14 }}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: 200,
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 6,
            margin: '4px 0 0 0',
            padding: 0,
            listStyle: 'none',
            zIndex: 10,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {filteredOptions.map((option, idx) => (
            <li
              key={option.id}
              role="option"
              aria-selected={idx === highlightedIndex}
              onClick={() => toggleOption(option)}
              onMouseEnter={() => setHighlightedIndex(idx)}
              style={{
                padding: '8px 12px',
                background: idx === highlightedIndex ? '#f0f0f0' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Best Practices

- Allow deleting the last tag pill when pressing `Backspace` on an empty search input for fast power-user keyboard navigation.
- Use `aria-selected` and `aria-expanded` attributes to convey selection status to screen readers.

## Common Mistakes

- Forgetting outside click listeners, causing open dropdown listboxes to stay floating on screen when users click away.

## Related Topics

- Accessible Autocomplete Combobox Component
- Accessible Custom ContentEditable Rich Text Editor Component
