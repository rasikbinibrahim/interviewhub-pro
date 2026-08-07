# Q2301 · Implement a FlatList-based Infinite Scroll List

**Difficulty:** Medium
**Companies Asked:** Meta, Uber, Airbnb, Shopify, Walmart
**Interview Frequency:** ★★★★☆
**Category:** React Native Coding → Lists & Performance
**Concepts:** `FlatList`, `onEndReached`/`onEndReachedThreshold`, pagination state, loading footer, duplicate-fetch guarding

## Problem Statement

Implement an `InfiniteList` component that renders a paginated feed using
`FlatList`. Each time the user scrolls near the bottom, the component
should fetch the next page from a provided `fetchPage(pageNumber)`
function, append the results to the currently rendered list, and show a
loading spinner in the list footer while a fetch is in flight. The
component must never trigger two overlapping fetches for the same page,
and must stop requesting more pages once the data source reports there's
nothing left.

This is a single reusable component, not a full app screen — assume the
caller owns the actual API/data-fetching implementation and only hands
`InfiniteList` a `fetchPage` function plus a way to render each item.

## Input

- `fetchPage: (pageNumber: number) => Promise<{ items: T[]; hasMore: boolean }>` —
  caller-supplied page loader; `pageNumber` starts at `1`.
- `renderItem: (item: T) => ReactElement` — how to render a single row.
- `keyExtractor: (item: T) => string` — stable unique key per item.

## Output

A `FlatList`-backed component that renders all loaded items, a loading
footer while a page fetch is in flight, and stops requesting further
pages once `hasMore` is `false`.

## Constraints

- Must not fire a second `fetchPage` call while one is already pending
  (no duplicate/overlapping requests from rapid scroll events).
- Must not fetch again after `hasMore` becomes `false`.
- Must use `FlatList`, not `ScrollView` (see Algorithm for why this
  matters for this specific problem).
- `onEndReachedThreshold` must be tunable but default to a sane value
  (`0.5`).

## Examples

| Scenario | Behavior | Why |
|---|---|---|
| Initial mount | `fetchPage(1)` is called once automatically; results render, footer spinner shows until it resolves | The list needs an initial page before the user can scroll at all |
| User scrolls to within the threshold of the bottom, page 1 already loaded, `hasMore: true` | `fetchPage(2)` fires, footer spinner appears, new items append below existing ones | This is the core infinite-scroll behavior the question is testing |
| User scrolls rapidly, triggering multiple `onEndReached` events before page 2's fetch resolves | Only one `fetchPage(2)` call is made — subsequent `onEndReached` events while `isLoading` is `true` are ignored | `onEndReached` can fire more than once for the same scroll position; a naive implementation double-fetches |

## Edge Cases

- `fetchPage` rejects (network error) → the component must surface an
  error state (not crash, not spin forever) and allow a retry rather than
  silently getting stuck with `isLoading: true`.
- Last page returns `hasMore: false` with zero new items → footer spinner
  disappears and no further `onEndReached` calls trigger a fetch.
- Empty result on the very first page (`items: []`, `hasMore: false`) →
  render an empty-state message, not an empty `FlatList` with no
  feedback.
- Component unmounts while a `fetchPage` call is still pending → the
  resolved promise must not call `setState` on the unmounted component.
- `onEndReached` fires before the first page has finished loading (fast
  scroll flick before initial data lands) → must be ignored the same way
  as any other fetch-in-flight case.

## Hints

1. You need a piece of state that answers "is a fetch currently in
   flight" — `onEndReached`'s handler should check that state and bail
   out immediately if it's already `true`, before calling `fetchPage`.
2. Track the next page number and a `hasMore` flag separately from the
   items array itself — `onEndReached` should refuse to fire a request at
   all once `hasMore` is `false`, regardless of the loading flag.
3. `FlatList`'s `ListFooterComponent` prop is where the loading spinner
   belongs — it renders inline at the end of the scrollable content,
   which is what makes it feel like part of the list rather than an
   overlay.

## Algorithm

**Pattern:** paginated data fetching driven by a scroll-position
callback, guarded by an in-flight flag.
**Core insight:** `FlatList` (unlike `ScrollView`) only renders the rows
currently near the viewport — it virtualizes, mounting and unmounting
off-screen rows as the user scrolls. For a list that can grow unbounded
(infinite scroll, by definition), this is not an optimization but a
correctness-adjacent requirement: a `ScrollView` mounts every row's real
native view up front, so a feed with a few thousand loaded items would
eventually exhaust memory and tank frame rate on a real device, whereas
`FlatList` keeps the number of mounted native views roughly constant
regardless of how many pages have been loaded. `onEndReached` fires when
the user has scrolled within `onEndReachedThreshold` (a fraction of the
visible viewport length, e.g. `0.5` = half a screen) of the content's
end — it's a proximity signal, not a "reached the exact bottom" signal,
which is intentional: it gives the fetch a head start so the next page is
likely ready before the user actually hits the end and sees a stall.
**Invariant:** at most one `fetchPage` call is in flight at any time, and
no call is made once `hasMore` is `false` — both guarded by checking
`isLoading`/`hasMore` synchronously before starting a new fetch, inside
the same handler that would trigger one.

## Dry Run

**Input:** `fetchPage` returns 2 items per page; page 1 and page 2 both
have `hasMore: true`; page 3 returns `hasMore: false`.

| Event | isLoading before | hasMore | Action taken | items after | isLoading after |
|---|---|---|---|---|---|
| Mount | `false` | `true` | `fetchPage(1)` called, `isLoading → true` | `[]` (pending) | `true` |
| `fetchPage(1)` resolves | `true` | `true` | append 2 items, `page → 2`, `isLoading → false` | 2 items | `false` |
| `onEndReached` fires | `false` | `true` | not loading, has more → `fetchPage(2)` called, `isLoading → true` | 2 items (pending) | `true` |
| `onEndReached` fires again (fast scroll) | `true` | `true` | `isLoading` is `true` → **ignored**, no second fetch | 2 items | `true` |
| `fetchPage(2)` resolves | `true` | `true` | append 2 items, `page → 3`, `isLoading → false` | 4 items | `false` |
| `onEndReached` fires | `false` | `true` | `fetchPage(3)` called | 4 items (pending) | `true` |
| `fetchPage(3)` resolves with `hasMore: false` | `true` | `true → false` | append 2 items, `hasMore → false`, `isLoading → false` | 6 items | `false` |
| `onEndReached` fires again | `false` | `false` | `hasMore` is `false` → **ignored**, no fetch | 6 items | `false` |

**Result:** exactly 3 `fetchPage` calls total (pages 1, 2, 3), no
duplicate call despite the extra `onEndReached` event mid-fetch, and no
call after `hasMore` became `false`.

## JavaScript Solution

```jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function InfiniteList({ fetchPage, renderItem, keyExtractor }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const nextPageRef = useRef(1);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      // Guard against setState firing after unmount if a fetch resolves late.
      isMountedRef.current = false;
    };
  }, []);

  const loadNextPage = useCallback(async () => {
    // Bail out if a fetch is already in flight or there's nothing left —
    // this is the check that makes the whole component duplicate-safe.
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const page = nextPageRef.current;
      const result = await fetchPage(page);

      if (!isMountedRef.current) {
        return;
      }

      setItems((previousItems) => [...previousItems, ...result.items]);
      setHasMore(result.hasMore);
      nextPageRef.current = page + 1;
    } catch (fetchError) {
      if (isMountedRef.current) {
        setError(fetchError);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [fetchPage, isLoading, hasMore]);

  useEffect(() => {
    loadNextPage();
    // Intentionally runs once on mount to load page 1 — subsequent pages
    // are driven by onEndReached, not by this effect re-running.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = () => {
    if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.errorText}>Failed to load more. Pull down or scroll to retry.</Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (isLoading) {
      return null;
    }
    return (
      <View style={styles.empty}>
        <Text>No items to show.</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => renderItem(item)}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#c0392b',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
});

export default InfiniteList;
```

## TypeScript Solution

```tsx
import { useState, useCallback, useRef, useEffect, type ReactElement } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface PageResult<T> {
  items: T[];
  hasMore: boolean;
}

interface InfiniteListProps<T> {
  fetchPage: (pageNumber: number) => Promise<PageResult<T>>;
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
}

function InfiniteList<T>({
  fetchPage,
  renderItem,
  keyExtractor,
}: InfiniteListProps<T>): ReactElement {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const nextPageRef = useRef<number>(1);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const page = nextPageRef.current;
      const result = await fetchPage(page);

      if (!isMountedRef.current) {
        return;
      }

      setItems((previousItems) => [...previousItems, ...result.items]);
      setHasMore(result.hasMore);
      nextPageRef.current = page + 1;
    } catch (fetchError) {
      if (isMountedRef.current) {
        setError(fetchError instanceof Error ? fetchError : new Error('Unknown fetch error'));
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [fetchPage, isLoading, hasMore]);

  useEffect(() => {
    void loadNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = (): ReactElement | null => {
    if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.errorText}>Failed to load more. Pull down or scroll to retry.</Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return null;
  };

  const renderEmpty = (): ReactElement | null => {
    if (isLoading) {
      return null;
    }
    return (
      <View style={styles.empty}>
        <Text>No items to show.</Text>
      </View>
    );
  };

  return (
    <FlatList<T>
      data={items}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => renderItem(item)}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#c0392b',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
});

export default InfiniteList;
```

## Time Complexity

O(1) amortized per rendered row for scrolling itself — `FlatList`
virtualization means the cost of scrolling doesn't grow with total items
loaded, only with what's currently on screen. Each page fetch is O(k),
where k is the page size, for appending the new items to state.

## Space Complexity

O(n) for the `items` array, where n is the total number of items loaded
across all pages so far — this grows unbounded as the user keeps
scrolling, which is inherent to infinite scroll (unlike the constant
*rendering* cost `FlatList` provides). A production version would
typically cap `n` by windowing out old items once the list grows very
large; this implementation keeps all loaded items for simplicity, per
the interview scope of the question.

## Common Mistakes

- Using `ScrollView` instead of `FlatList` — `ScrollView` mounts every
  child's native view immediately regardless of scroll position, so an
  infinite (unbounded) list built on it degrades performance and memory
  usage as more pages load; `FlatList`'s windowed rendering is the whole
  reason this pattern works at scale.
- Forgetting `keyExtractor` (or reusing array index as the key) — without
  a stable unique key, `FlatList` can misattribute rows during
  re-renders/re-ordering, causing visual glitches or wrong item
  recycling.
- Not guarding against overlapping fetches — calling `fetchPage` directly
  from `onEndReached` with no `isLoading` check causes duplicate page
  requests, since `onEndReached` can fire multiple times for the same
  scroll region before the first fetch resolves.
- Checking `hasMore` but forgetting to also check `isLoading` (or vice
  versa) — both guards are independently necessary; either one missing
  reintroduces a duplicate-fetch or fetch-past-the-end bug.
- Missing the unmounted-component guard — resolving a fetch after the
  screen has been navigated away from and calling `setState` anyway logs
  a warning in React Native and can mask a real memory leak.

## Interview Follow-up Questions

1. How would you add pull-to-refresh (reset to page 1) on top of this
   without breaking the pagination state? (See
   [pull-to-refresh.md](pull-to-refresh.md).)
2. `onEndReachedThreshold` is a fraction of the viewport, not a pixel
   value — why might that be the right default API design for a
   cross-device library like `FlatList`?
3. How would you avoid unbounded memory growth if the user scrolls
   through tens of thousands of items in one session?
4. What's the tradeoff of `FlatList` versus `FlashList` (Shopify's
   drop-in replacement) for this exact use case?
5. How would you test `loadNextPage`'s duplicate-fetch guard without a
   real device or real network calls?

## Similar Questions

- Implement a Custom Pull-to-Refresh Component
  ([pull-to-refresh.md](pull-to-refresh.md))
- Implement `useAsyncStorage` Hook
  ([use-async-storage-hook.md](use-async-storage-hook.md)) — for caching
  a loaded page list locally
- Virtualized List (React web equivalent — planned for
  [63-react-coding](../63-react-coding/README.md), not yet written)

---
[← Back to 64-react-native-coding](README.md)
