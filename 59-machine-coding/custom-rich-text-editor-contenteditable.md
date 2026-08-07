# Q5903 · Accessible Custom ContentEditable Rich Text Editor Component

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Notion, Slack, Atlassian, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** machine-coding, contenteditable, rich-text-editor, dom-manipulation, selection-api, accessibility  

## Problem Statement

Build a lightweight, accessible **Custom Rich Text Editor** component in React/TypeScript without third-party editor frameworks (Draft.js, Slate, Quill).

### Key Requirements
1. Use an editable container element (`contentEditable="true"`).
2. Floating/Toolbar controls: **Bold** (`Ctrl+B`), *Italic* (`Ctrl+I`), Underline (`Ctrl+U`), Heading levels (`H1`, `H2`), Bullet List (`ul`), and Blockquote (`blockquote`).
3. Preserve active formatting button state indicators based on current cursor selection (`Selection` / `Range` API).
4. Export clean HTML payload output (`editorRef.current.innerHTML`).
5. Ensure keyboard navigation accessibility and WAI-ARIA roles (`role="textbox"`, `aria-multiline="true"`).

## Input Props

- `initialHtml`: `string` — starting HTML content
- `onChange`: `(html: string) => void` — change callback

## Code Solution

```tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  initialHtml?: string;
  onChange?: (html: string) => void;
}

export const CustomRichTextEditor: React.FC<RichTextEditorProps> = ({
  initialHtml = '<p>Start typing your content here...</p>',
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Execute formatting command via document.execCommand (or Selection Range fallback)
  const formatCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleSelectionChange();
      triggerChange();
    }
  };

  const triggerChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Inspect Selection API to update active toolbar button toggles
  const handleSelectionChange = useCallback(() => {
    const formats = new Set<string>();

    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul');

    const blockType = document.queryCommandValue('formatBlock');
    if (blockType) formats.add(blockType.toLowerCase());

    setActiveFormats(formats);
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        formatCommand('bold');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        formatCommand('italic');
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        formatCommand('underline');
      }
    }
  };

  return (
    <div className="rte-wrapper" style={{ border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden' }}>
      {/* Toolbar Controls */}
      <div className="rte-toolbar" style={{ display: 'flex', gap: 8, padding: 8, background: '#f5f5f5', borderBottom: '1px solid #ccc' }}>
        <button
          type="button"
          aria-pressed={activeFormats.has('bold')}
          onClick={() => formatCommand('bold')}
          style={{ fontWeight: activeFormats.has('bold') ? 'bold' : 'normal' }}
        >
          B
        </button>
        <button
          type="button"
          aria-pressed={activeFormats.has('italic')}
          onClick={() => formatCommand('italic')}
          style={{ fontStyle: activeFormats.has('italic') ? 'italic' : 'normal' }}
        >
          I
        </button>
        <button
          type="button"
          aria-pressed={activeFormats.has('underline')}
          onClick={() => formatCommand('underline')}
          style={{ textDecoration: activeFormats.has('underline') ? 'underline' : 'none' }}
        >
          U
        </button>
        <button
          type="button"
          aria-pressed={activeFormats.has('h1')}
          onClick={() => formatCommand('formatBlock', '<h1>')}
        >
          H1
        </button>
        <button
          type="button"
          aria-pressed={activeFormats.has('h2')}
          onClick={() => formatCommand('formatBlock', '<h2>')}
        >
          H2
        </button>
        <button
          type="button"
          aria-pressed={activeFormats.has('ul')}
          onClick={() => formatCommand('insertUnorderedList')}
        >
          • List
        </button>
      </div>

      {/* Editable Input Area */}
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Rich Text Editor"
        onInput={triggerChange}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
        style={{ minHeight: 200, padding: 16, outline: 'none' }}
      />
    </div>
  );
};
```

## Best Practices

- Always add `aria-pressed={isActive}` to toolbar toggle buttons for screen reader accessibility.
- Intercept keyboard shortcuts (`Ctrl+B`, `Ctrl+I`) explicitly to provide consistent cross-browser editing behavior.

## Common Mistakes

- Binding `innerHTML` directly to component state on every `onInput` event without handling cursor selection offsets, causing the caret cursor to jump to the start of the line on every keystroke.

## Related Topics

- Accessible Autocomplete Combobox Component
- Cross-Site Scripting (XSS) Mitigation: DOMPurify
