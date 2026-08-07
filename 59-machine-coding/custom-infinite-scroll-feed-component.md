# Q5909 · Custom Infinite Scroll Feed Component (`IntersectionObserver`)

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon, Twitter, LinkedIn
**Interview Frequency:** ★★★★★
**Category:** Machine Coding
**Concepts:** machine-coding, infinite-scroll, intersection-observer, performance

## Problem Statement

Implement an `InfiniteScrollFeed` component —
`InfiniteScrollFeed({ fetchMore })` — that renders a growing feed of
items, automatically fetching and appending the next page whenever the
user scrolls near the bottom, using `IntersectionObserver` rather than a
manual `scroll` event listener.

## Input

`fetchMore`: `(page: number) => Promise<string[]>`, called with the next
page number to fetch.

## Output

Renders every loaded item in order, followed by a sentinel loading
region that triggers the next page fetch once it scrolls into view.

## Constraints

`fetchMore` is assumed to resolve with the requested page's items (an
empty array signals no more content, though this component doesn't
special-case that — see Common Mistakes)

## Examples

```tsx
<InfiniteScrollFeed fetchMore={(page) => api.getFeedPage(page)} />
// Initially empty; as soon as the (empty) loader region is visible in
// the viewport, fetchMore(1) is called. As the user scrolls down and
// the loader region re-enters view after each batch renders,
// fetchMore(2), fetchMore(3), etc. are called in turn.
```

## Edge Cases

- Component just mounted, loader region already visible (short page,
  nothing scrolled yet) → the very first `fetchMore(1)` fires
  immediately without requiring any actual scrolling
- User scrolls quickly past the loader region and back → the observer
  only cares about *current* intersection state, not scroll velocity, so
  this behaves the same as scrolling slowly
- A fetch is already in flight when the loader re-enters view → guarded
  by the `loading` flag, so a second fetch for the same page isn't
  triggered
- `fetchMore` returns an empty array (no more content left) → items stop
  growing, but the loader region remains in the DOM and would keep
  attempting to fetch further pages indefinitely (see Common Mistakes)

## Hints

1. A `scroll` event listener that checks `scrollTop`/`scrollHeight` on
   every scroll fires very frequently and needs manual throttling —
   what browser API exists specifically to efficiently detect "this
   element has become visible in the viewport," without listening to
   scroll events at all?
2. Place an empty "sentinel" element at the very end of the feed, and
   observe *it* with an `IntersectionObserver` — when the sentinel
   scrolls into view, that's the signal to fetch the next page (since it
   means the user has scrolled through everything currently loaded).
3. Guard the fetch with a `loading` flag so the observer's callback
   (which can fire multiple times while the sentinel remains visible)
   doesn't trigger overlapping duplicate fetches for the same page.

## Algorithm

**Pattern:** `IntersectionObserver` watching a trailing sentinel
element.
**Core insight:** rather than computing scroll position manually (and
needing to throttle a high-frequency `scroll` event), placing an
observed sentinel element at the bottom of the rendered feed turns "has
the user scrolled near the end" into a simple visibility question the
browser answers efficiently and natively. Each time a new page of items
renders, the sentinel moves further down the page (since it's still the
last element), so it naturally leaves and re-enters the viewport as the
user continues scrolling — each re-entry is the signal to fetch the
next page.
**Invariant:** at any point, at most one `fetchMore` call is in flight
at a time — the `loading` flag, checked before starting a new fetch and
cleared only once the previous one resolves, prevents the observer's
callback from starting a second overlapping fetch while one is already
pending.

## Dry Run

**Input:** `fetchMore` resolves `["A","B"]` for page 1, `["C","D"]` for
page 2

| Step | Event | items | page | loading |
|---|---|---|---|---|
| 1 | mount, sentinel visible | `[]` | 1 | `false → true` |
| 2 | `fetchMore(1)` resolves | `["A","B"]` | `2` | `false` |
| 3 | user scrolls, sentinel re-enters view | `["A","B"]` | 2 | `false → true` |
| 4 | `fetchMore(2)` resolves | `["A","B","C","D"]` | `3` | `false` |

**Result:** items accumulate two at a time as the sentinel repeatedly
re-enters view — matches expected infinite-scroll behavior.

## JavaScript Solution

```jsx
import React, { useState, useEffect, useRef } from 'react';

export function InfiniteScrollFeed({ fetchMore }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          fetchMore(page).then((newItems) => {
            setItems((prev) => [...prev, ...newItems]);
            setPage((p) => p + 1);
            setLoading(false);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [page, loading, fetchMore]);

  return (
    <div className="feed-container">
      {items.map((item, idx) => (
        <div key={idx} style={{ padding: 16, borderBottom: '1px solid #eee' }}>{item}</div>
      ))}
      <div ref={loaderRef} style={{ padding: 20, textAlign: 'center' }}>
        {loading ? 'Loading more items...' : 'Scroll down to load more'}
      </div>
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useState, useEffect, useRef } from 'react';

interface InfiniteScrollFeedProps {
  fetchMore: (page: number) => Promise<string[]>;
}

export const InfiniteScrollFeed: React.FC<InfiniteScrollFeedProps> = ({ fetchMore }) => {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          fetchMore(page).then((newItems) => {
            setItems((prev) => [...prev, ...newItems]);
            setPage((p) => p + 1);
            setLoading(false);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [page, loading, fetchMore]);

  return (
    <div className="feed-container">
      {items.map((item, idx) => (
        <div key={idx} style={{ padding: 16, borderBottom: '1px solid #eee' }}>{item}</div>
      ))}
      <div ref={loaderRef} style={{ padding: 20, textAlign: 'center' }}>
        {loading ? 'Loading more items...' : 'Scroll down to load more'}
      </div>
    </div>
  );
};
```

## Time Complexity

O(1) per intersection event — the observer callback does a constant
amount of work (a flag check plus scheduling a fetch); rendering the
full feed is O(n) in the total number of loaded items.

## Space Complexity

O(n) — every loaded item is kept in `items` and remains mounted in the
DOM (this simple version doesn't windower/virtualize old items — see
`Custom Virtualized Windowed List Component` for that technique).

## Common Mistakes

- Using a `scroll` event listener with manual `scrollTop`/
  `scrollHeight`/`clientHeight` math instead of `IntersectionObserver` —
  works, but fires far more frequently and needs manual throttling/
  debouncing to avoid performance problems; `IntersectionObserver` is
  purpose-built for this and is far cheaper.
- Never handling the "no more items" case — if `fetchMore` eventually
  resolves with an empty array (or a signal that the feed is
  exhausted), this component keeps the sentinel observed indefinitely
  and will keep calling `fetchMore` for higher and higher page numbers
  forever; a real implementation needs a `hasMore` flag to stop
  observing once exhausted.
- Recreating the `IntersectionObserver` on every `page`/`loading` change
  (as this version does, since both are in the effect's dependency
  array) — functionally correct, but disconnects and reconnects the
  observer on every single page load; using refs for `page`/`loading`
  instead of effect dependencies would let the observer be created only
  once.

## Interview Follow-up Questions

1. How would you add a `hasMore` flag to stop observing once
   `fetchMore` signals there's no more content?
2. How would you handle a failed `fetchMore` call — show an error and a
   retry affordance, rather than silently leaving `loading` stuck at
   `true` forever?
3. How would you combine this with windowing/virtualization (see
   `Custom Virtualized Windowed List Component`) so an extremely long
   feed doesn't keep every past item mounted in the DOM?

## Similar Questions

- Custom Virtualized Windowed List Component (see [custom-virtualized-list-component.md](custom-virtualized-list-component.md))
- Accessible Autocomplete Typeahead Combobox Component (see [custom-autocomplete-typeahead-combobox.md](custom-autocomplete-typeahead-combobox.md))
