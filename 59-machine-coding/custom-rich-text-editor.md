# Q5912 · Custom Rich Text Editor Component (`contentEditable` / `execCommand`)

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Notion, Slack
**Interview Frequency:** ★★★☆☆
**Category:** Machine Coding
**Concepts:** machine-coding, rich-text-editor, contenteditable, DOM

## Problem Statement

Implement a `RichTextEditor` component — `RichTextEditor({ onChange })`
— with a toolbar of Bold/Italic/Underline buttons and a
`contentEditable` region: clicking a toolbar button applies that
formatting to the current text selection, and `onChange` fires with the
editor's current HTML whenever its content changes (via typing or via a
toolbar action).

## Input

`onChange`: optional `(html: string) => void`, called with the editor's
current inner HTML.

## Output

Renders a toolbar and an editable region; typing or applying formatting
updates the editable region's content and invokes `onChange`.

## Constraints

Targets browsers that support `contentEditable` and `execCommand` (see
Common Mistakes for the caveat on the latter)

## Examples

```tsx
<RichTextEditor onChange={(html) => console.log(html)} />
// Typing "Hello world" and selecting "world", then clicking the Bold
// button, calls onChange with something like:
// "Hello <b>world</b>"
```

## Edge Cases

- No text selected when a toolbar button is clicked → `execCommand`
  applies to the caret position (formatting affects whatever is typed
  next), rather than to any existing text
- Toolbar button clicked, then focus never returns to the editable
  region → the formatting command still applies to the browser's most
  recent selection within the editor, since `execCommand` operates on
  the document's current selection, not on explicit editor focus
- Empty editor → `onChange` still fires correctly (with empty or
  whitespace-only HTML) as the user starts typing
- Nested/overlapping formatting (bold text within already-italic text)
  → handled by the browser's own `execCommand` implementation, not by
  any logic in this component

## Hints

1. A `contentEditable` element already lets a user type and see
   formatted text — the missing piece is connecting the toolbar buttons
   to actually *apply* formatting to whatever's currently selected
   inside it.
2. `document.execCommand(commandName, false, value)` applies a
   formatting command (like `'bold'`, `'italic'`, `'underline'`) to the
   browser's current text selection — calling it from a toolbar button's
   click handler is enough to format whatever was selected just before
   the click.
3. Both typing (`onInput` on the editable region) and clicking a
   toolbar button change the editor's content — both paths need to read
   `editorRef.current.innerHTML` and pass it to `onChange`, so the
   parent always has the up-to-date HTML regardless of which path
   triggered the change.

## Algorithm

**Pattern:** `contentEditable` region plus `document.execCommand` for
toolbar-triggered formatting.
**Core insight:** `contentEditable` delegates the actual text-editing
behavior (typing, cursor movement, basic selection) entirely to the
browser, so this component's job is narrower than it might first
appear: it only needs to (1) render the editable region and a toolbar,
and (2) wire toolbar clicks to `execCommand`, which applies formatting
to whatever the browser's current selection happens to be at the moment
the command runs — no manual DOM manipulation or selection tracking is
needed for the basic bold/italic/underline commands.
**Invariant:** after any user action that changes the editor's visible
content — typing or a toolbar click — `onChange` is called with the
editable region's current `innerHTML`, so the parent's copy of the
content never falls out of sync with what's actually displayed.

## Dry Run

**Input:** user types `"Hello world"`, selects `"world"`, clicks Bold

| Step | Action | editorRef.innerHTML | onChange called with |
|---|---|---|---|
| 1 | type "Hello world" | `"Hello world"` | `"Hello world"` (via `onInput`) |
| 2 | select "world" | (unchanged) | (not called — selection alone doesn't trigger onChange) |
| 3 | click Bold | `execCommand('bold')` wraps the selection | `"Hello <b>world</b>"` (via `format`'s explicit `onChange` call) |

**Result:** `onChange` reflects the newly bolded HTML — matches expected
behavior.

## JavaScript Solution

```jsx
import React, { useRef } from 'react';

export function RichTextEditor({ onChange }) {
  const editorRef = useRef(null);

  const format = (command, value = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="editor-container" style={{ border: '1px solid #ccc', borderRadius: 4 }}>
      <div className="toolbar" style={{ borderBottom: '1px solid #eee', padding: 8, gap: 8, display: 'flex' }}>
        <button type="button" onClick={() => format('bold')} aria-label="Bold"><b>B</b></button>
        <button type="button" onClick={() => format('italic')} aria-label="Italic"><i>I</i></button>
        <button type="button" onClick={() => format('underline')} aria-label="Underline"><u>U</u></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={() => onChange && editorRef.current && onChange(editorRef.current.innerHTML)}
        style={{ minHeight: 150, padding: 12, outline: 'none' }}
      />
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useRef } from 'react';

interface RichTextEditorProps {
  onChange?: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const format = (command: string, value: string = ''): void => {
    document.execCommand(command, false, value);
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="editor-container" style={{ border: '1px solid #ccc', borderRadius: 4 }}>
      <div className="toolbar" style={{ borderBottom: '1px solid #eee', padding: 8, gap: 8, display: 'flex' }}>
        <button type="button" onClick={() => format('bold')} aria-label="Bold"><b>B</b></button>
        <button type="button" onClick={() => format('italic')} aria-label="Italic"><i>I</i></button>
        <button type="button" onClick={() => format('underline')} aria-label="Underline"><u>U</u></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={() => onChange && editorRef.current && onChange(editorRef.current.innerHTML)}
        style={{ minHeight: 150, padding: 12, outline: 'none' }}
      />
    </div>
  );
};
```

## Time Complexity

O(1) per formatting command or keystroke — `execCommand` and reading
`innerHTML` are both handled internally by the browser's editing engine,
not by any per-character logic in this component.

## Space Complexity

O(c), where c is the length of the editor's current HTML content —
`innerHTML` is read out on every change.

## Common Mistakes

- Treating `document.execCommand` as a long-term, fully reliable
  foundation — it's officially deprecated (though still broadly
  supported today) and has known cross-browser inconsistencies in
  exactly what HTML it produces for a given command; production rich-
  text editors (Notion, Slack, Google Docs) implement their own
  selection/DOM manipulation logic or build on a dedicated editor
  framework (like Slate or ProseMirror) instead of relying on it,
  precisely to avoid this instability. Worth stating this trade-off
  explicitly in an interview rather than presenting `execCommand` as
  production-grade.
- Not calling `onChange` after `execCommand` — since the command
  mutates the DOM directly (not through React state), a component that
  only wires `onChange` to `onInput` would miss updates triggered purely
  by toolbar clicks (no typing involved).
- Storing the editor's content in React state and re-rendering the
  `contentEditable` element's children from it — this actively fights
  the browser's own cursor/selection management and commonly causes the
  cursor to jump to the start of the content on every keystroke; letting
  the DOM be the source of truth for content (only reading it out via
  `innerHTML`, never writing it back in via React state) avoids this.

## Interview Follow-up Questions

1. Why is directly controlling a `contentEditable` element's content via
   React state (re-rendering its children on every keystroke)
   problematic, and how does this solution avoid that trap?
2. How would you implement bold/italic/underline manually, without
   `execCommand`, using the `Selection` and `Range` DOM APIs directly?
3. How would you support keyboard shortcuts (`Ctrl+B` for bold, etc.) in
   addition to toolbar clicks?

## Similar Questions

- Accessible Autocomplete Typeahead Combobox Component (see [custom-autocomplete-typeahead-combobox.md](custom-autocomplete-typeahead-combobox.md))
- Accessible Modal Dialog Component with Focus Trap (see [custom-modal-dialog-focus-trap.md](custom-modal-dialog-focus-trap.md))
