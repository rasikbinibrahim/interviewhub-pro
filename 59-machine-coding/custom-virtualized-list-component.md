# Q5914 · Custom Virtualized Windowed List Component from Scratch

**Difficulty:** Hard
**Companies Asked:** Meta, Google, Amazon, Twitter, LinkedIn
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, virtualization, react-window, performance

## Problem Statement

Implement a `VirtualizedList` component —
`VirtualizedList({ itemCount, itemHeight, height, renderItem })`, all
items the same fixed height — that renders only the items currently
visible within the scrollable viewport (plus a small overscan buffer),
regardless of how large `itemCount` is, while still allowing the list to
scroll as if every item were actually rendered.

## Input

`itemCount`: total number of items. `itemHeight`: fixed height (px) of
every item. `height`: the visible viewport height (px). `renderItem`:
`(index: number) => ReactNode`, renders a single item's content.

## Output

A scrollable container of height `height`; scrolling through it reveals
every item from `0` to `itemCount - 1`, but only a small window of items
near the current scroll position is ever actually mounted in the DOM.

## Constraints

`itemCount` may be very large (tens of thousands+); every item shares
the same fixed `itemHeight`

## Examples

```tsx
<VirtualizedList
  itemCount={100000}
  itemHeight={50}
  height={500}
  renderItem={(index) => <div>Row {index}</div>}
/>
// Only renders roughly 10-14 <div> elements at any given scroll
// position (the ~10 rows that fit in the 500px viewport, plus a
// couple rows of overscan buffer on each side) — never all 100,000.
```

## Edge Cases

- `itemCount = 0` → renders an empty scroll container, no items, no
  errors
- Scrolled to the very top (`scrollTop = 0`) → `startIndex` clamps to
  `0`, not negative
- Scrolled to the very bottom → `endIndex` clamps to `itemCount - 1`,
  not past the end
- `itemCount` small enough that every item already fits in `height` →
  `startIndex` and `endIndex` naturally cover the whole list, so
  behavior is equivalent to rendering everything, just via the same
  windowing logic

## Hints

1. If every item has the same fixed height, you can compute exactly
   which item index is at any given pixel offset with simple
   arithmetic (`offset / itemHeight`) — no need to actually measure
   rendered DOM nodes to know where scroll position `scrollTop`
   corresponds to.
2. Track `scrollTop` in state, updated on the container's `onScroll`.
   From it, compute the *range* of item indices currently visible:
   `floor(scrollTop / itemHeight)` through
   `ceil((scrollTop + height) / itemHeight)`.
3. To make the container's scrollbar behave correctly (proportional
   thumb size, correct total scrollable distance) even though only a
   handful of items are actually rendered, give an *inner* wrapper an
   explicit height equal to `itemCount * itemHeight`, and
   absolutely-position each rendered item at `top: index * itemHeight`
   within it.

## Algorithm

**Pattern:** fixed-height windowing with absolute positioning and an
overscan buffer.
**Core insight:** because every item has the same known height, the
relationship between scroll position and visible item indices is pure
arithmetic — no need to render (or even measure) items outside the
viewport to know where they'd be. An inner element sized to
`itemCount * itemHeight` gives the browser's native scrollbar the
correct total scrollable range "for free," while each actually-rendered
item is absolutely positioned at `index * itemHeight` within that inner
element — so removing (virtualizing away) items outside the visible
range doesn't affect the position of the items that remain, since
position is computed from index, not from DOM layout flow. A small
overscan buffer (rendering a couple of extra items just outside the
visible range) hides the brief flash of blank space that would
otherwise appear at the edges during fast scrolling, before React has a
chance to re-render with the new range.
**Invariant:** at any scroll position, the set of currently-rendered
items always includes every item whose position overlaps the visible
viewport (plus the overscan buffer) — never fewer, which would cause a
gap, though it may render a few extra items just outside the viewport,
which is the intended overscan.

## Dry Run

**Input:** `itemCount = 1000`, `itemHeight = 50`, `height = 500`,
`scrollTop = 1000`

| Step | Computation | Result |
|---|---|---|
| `startIndex` | `max(0, floor(1000 / 50) - 2)` | `max(0, 20 - 2) = 18` |
| `endIndex` | `min(999, ceil((1000 + 500) / 50) + 2)` | `min(999, 30 + 2) = 32` |
| items rendered | indices 18 through 32 | 15 items, each `<div>` positioned at `top: index * 50` |

**Result:** only 15 of the 1000 total items are actually mounted in the
DOM at this scroll position, yet the scrollbar and scroll range behave
exactly as if all 1000 were rendered — matches expected virtualization
behavior.

## JavaScript Solution

```jsx
import React, { useState } from 'react';

export function VirtualizedList({ itemCount, itemHeight, height, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + height) / itemHeight) + 2);

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          width: '100%',
        }}
      >
        {renderItem(i)}
      </div>
    );
  }

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height, overflowY: 'auto', position: 'relative', border: '1px solid #ccc' }}
    >
      <div style={{ height: itemCount * itemHeight, position: 'relative' }}>
        {visibleItems}
      </div>
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useState } from 'react';

interface VirtualizedListProps {
  itemCount: number;
  itemHeight: number;
  height: number;
  renderItem: (index: number) => React.ReactNode;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  itemCount,
  itemHeight,
  height,
  renderItem,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + height) / itemHeight) + 2);

  const visibleItems: React.ReactNode[] = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          width: '100%',
        }}
      >
        {renderItem(i)}
      </div>
    );
  }

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height, overflowY: 'auto', position: 'relative', border: '1px solid #ccc' }}
    >
      <div style={{ height: itemCount * itemHeight, position: 'relative' }}>
        {visibleItems}
      </div>
    </div>
  );
};
```

## Time Complexity

O(v) per render, where v is the number of currently-visible-plus-
overscan items (`height / itemHeight`, a small constant independent of
`itemCount`) — not O(itemCount), which is the entire point of
virtualization.

## Space Complexity

O(v) for the mounted DOM nodes at any moment — dramatically less than
O(itemCount) for a naively-rendered full list, which is what makes this
technique viable for very large lists.

## Common Mistakes

- Rendering every item and using CSS (`overflow: hidden` or similar) to
  visually hide off-screen ones — defeats the entire purpose; every
  item still exists as a real, expensive DOM node, so this provides
  none of virtualization's performance benefit.
- Forgetting the inner "spacer" element sized to `itemCount *
  itemHeight` — without it, the scroll container's native scrollbar has
  no way to know the *total* scrollable distance, since only a handful
  of items (of the true total) are ever actually present to give the
  browser that information via layout.
- Omitting the overscan buffer (rendering exactly the visible range,
  with zero extra items on each side) — causes a visible flash of blank
  space at the leading edge during fast scrolling, since there's a
  brief window between the scroll event firing and React finishing the
  re-render with the newly-needed items.

## Interview Follow-up Questions

1. How would this need to change if items had *variable*, not fixed,
   heights — what becomes harder about computing `startIndex`/
   `endIndex`?
2. How would you virtualize a *horizontally* scrolling list, or a 2D
   grid (virtualizing both rows and columns)?
3. How does this compare to how a production library like
   `react-window` or `react-virtualized` implements the same idea —
   what edge cases might they handle that this simplified version
   doesn't?

## Similar Questions

- Custom Infinite Scroll Feed Component (see [custom-infinite-scroll-feed-component.md](custom-infinite-scroll-feed-component.md))
- Accessible Custom Recursive File Tree View Component (see [custom-file-tree-view-component.md](custom-file-tree-view-component.md))
