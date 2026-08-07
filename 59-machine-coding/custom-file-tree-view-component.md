# Q5911 · Accessible Custom Recursive File Tree View Component

**Difficulty:** Hard
**Companies Asked:** Microsoft (VS Code), GitHub, Google, Amazon
**Interview Frequency:** ★★★★☆
**Category:** Machine Coding
**Concepts:** machine-coding, file-tree, recursion, accessibility

## Problem Statement

Implement a `FileTree` component — `FileTree({ node })`, where `node` is
`{ id, name, isFolder?, children? }` — that recursively renders a
folder/file tree: files render as a leaf label, folders render as a
toggle button that expands or collapses their children, and every level
carries the WAI-ARIA tree roles (`tree`/`treeitem`/`group`) so the
structure is announced correctly to assistive technology.

## Input

`node`: the root `FileNode` to render — `{ id: string, name: string,
isFolder?: boolean, children?: FileNode[] }`.

## Output

Renders the node (and, for folders, recursively renders its children
once expanded) as a nested tree structure.

## Constraints

A folder node's `children` may be empty or omitted (renders as an
expandable folder with nothing inside)

## Examples

```tsx
<FileTree
  node={{
    id: 'root',
    name: 'src',
    isFolder: true,
    children: [
      { id: '1', name: 'index.ts' },
      { id: '2', name: 'components', isFolder: true, children: [
        { id: '3', name: 'Button.tsx' },
      ] },
    ],
  }}
/>
// Renders "📁 src" collapsed by default. Clicking it reveals
// "📄 index.ts" and "📁 components"; clicking "components" reveals
// "📄 Button.tsx" nested one level deeper.
```

## Edge Cases

- A file node (`isFolder` falsy) → renders as a plain leaf label, no
  toggle button, no children handling
- A folder with no `children` (or an empty array) → still renders as an
  expandable toggle; expanding it just reveals nothing
- Deeply nested folders → each recursive `FileTree` call manages its
  *own* `isOpen` state independently, so collapsing a parent folder and
  reopening it doesn't reset which of its descendants were expanded
- The root node itself → gets `role="tree"` (the outer container),
  while every node at every level beneath it gets `role="treeitem"`

## Hints

1. Each recursive call renders one node — a file is a simple leaf, but a
   folder needs to track its own open/closed state *and*, when open,
   recursively render a `FileTree` for each of its children. What single
   piece of local state does each folder-level call need?
2. The WAI-ARIA tree pattern expects exactly one `role="tree"` at the
   very outermost level, with every node beneath it (file or folder)
   carrying `role="treeitem"`, and any folder's set of children wrapped
   in `role="group"`. Since this component calls itself recursively for
   every level, it needs a way to know "am I the root of the whole tree,
   or a nested node" so it emits the right role.
3. Pass a prop like `isRoot` (defaulting to `true` for the initial call)
   and explicitly set it to `false` on every recursive call for a
   child — that flag decides whether a given render emits
   `role="tree"` or `role="treeitem"`.

## Algorithm

**Pattern:** recursive component rendering, one level of state per
folder node.
**Core insight:** a tree of arbitrary depth is naturally expressed by a
component that renders itself for each child — no manual stack or queue
needed, since the call stack itself mirrors the tree structure. Each
folder node's expand/collapse state is *local* to that specific
recursive call (not lifted to a shared parent state), which is what
lets sibling and descendant folders open and close completely
independently of each other. The `isRoot` flag threading through every
recursive call exists purely to satisfy the WAI-ARIA tree pattern's
requirement that `role="tree"` appear exactly once, at the true root,
while every actual node (at any depth) is a `role="treeitem"`.
**Invariant:** at any point, a folder's children are rendered (and thus
present in the DOM, wrapped in `role="group"`) if and only if that
specific folder's own `isOpen` state is `true` — parent and sibling
state never affects it.

## Dry Run

**Input:** the tree from the Examples section; user clicks "src", then
clicks "components"

| Step | Action | State change | Rendered |
|---|---|---|---|
| 1 | initial render | `src.isOpen = false` | `📁 src` only |
| 2 | click "src" | `src.isOpen → true` | `📁 src`, revealing children: `📄 index.ts`, `📁 components` (its own `isOpen = false`) |
| 3 | click "components" | `components.isOpen → true` (a *separate* state instance, local to that recursive call) | additionally reveals `📄 Button.tsx`, nested under `components` |

**Result:** each folder's expansion is independent — matches expected
recursive tree behavior.

## JavaScript Solution

```jsx
import React, { useState } from 'react';

export function FileTree({ node, isRoot = true }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!node.isFolder) {
    return (
      <div role="treeitem" aria-label={node.name} style={{ paddingLeft: 16 }}>
        📄 {node.name}
      </div>
    );
  }

  return (
    <div
      role={isRoot ? 'tree' : 'treeitem'}
      aria-label={node.name}
      aria-expanded={isOpen}
      className="folder-node"
      style={{ paddingLeft: 16 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        {isOpen ? '📂' : '📁'} {node.name}
      </button>
      {isOpen && node.children && (
        <div role="group" className="folder-children">
          {node.children.map((child) => (
            <FileTree key={child.id} node={child} isRoot={false} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useState } from 'react';

export interface FileNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: FileNode[];
}

interface FileTreeProps {
  node: FileNode;
  isRoot?: boolean;
}

export const FileTree: React.FC<FileTreeProps> = ({ node, isRoot = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!node.isFolder) {
    return (
      <div role="treeitem" aria-label={node.name} style={{ paddingLeft: 16 }}>
        📄 {node.name}
      </div>
    );
  }

  return (
    <div
      role={isRoot ? 'tree' : 'treeitem'}
      aria-label={node.name}
      aria-expanded={isOpen}
      className="folder-node"
      style={{ paddingLeft: 16 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        {isOpen ? '📂' : '📁'} {node.name}
      </button>
      {isOpen && node.children && (
        <div role="group" className="folder-children">
          {node.children.map((child) => (
            <FileTree key={child.id} node={child} isRoot={false} />
          ))}
        </div>
      )}
    </div>
  );
};
```

## Time Complexity

O(n) to fully render an expanded tree of n total nodes — each node is
rendered exactly once by its own recursive call; collapsed subtrees
contribute nothing, since their children are never rendered (and so
never recursed into) until expanded.

## Space Complexity

O(n) for the rendered DOM/component tree when fully expanded, plus O(h)
recursion (call) stack depth, where h is the tree's height.

## Common Mistakes

- Lifting all nodes' open/closed state into one shared object (e.g. a
  single `Set` of open ids in a top-level parent) instead of letting
  each recursive call own its own local state — works, but adds
  unnecessary coordination complexity, and this recursive-component
  approach gets the same independent-expansion behavior "for free" from
  React's component instance model.
- Rendering `role="tree"` at every level (or omitting it entirely)
  instead of exactly once at the true root — either produces incorrect
  or ambiguous tree structure for screen readers, which expect exactly
  one `tree` root with `treeitem`s nested beneath it.
- Recursing into `node.children` even when the folder is collapsed —
  wastes rendering work for large trees; this solution correctly guards
  the recursive map behind `isOpen &&`, so collapsed subtrees do no
  work at all until expanded.

## Interview Follow-up Questions

1. How would you add keyboard arrow-key navigation (`ArrowDown`/
   `ArrowUp` moving a highlighted node, `ArrowRight`/`ArrowLeft`
   expanding/collapsing or moving to a parent), per the full WAI-ARIA
   tree keyboard interaction pattern?
2. How would you support multi-select (checkboxes) alongside expand/
   collapse, and how would that change the ARIA roles needed?
3. For an extremely large or deep tree (tens of thousands of nodes), how
   would you avoid rendering every collapsed node's component instance
   at all, rather than just skipping their children?

## Similar Questions

- Custom Virtualized Windowed List Component (see [custom-virtualized-list-component.md](custom-virtualized-list-component.md))
- Accessible Custom Accordion Component (see [custom-accordion-accessible-component.md](custom-accordion-accessible-component.md))
