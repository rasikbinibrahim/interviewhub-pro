# Q401 · Implement useDebounce

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Uber, Atlassian, Shopify
**Interview Frequency:** ★★★★★
**Category:** React Coding → Custom Hooks
**Concepts:** custom hooks, `useEffect` cleanup, timers, generics (TypeScript)

## Problem Statement

Implement a `useDebounce` custom hook that takes a value and a delay in
milliseconds, and returns a debounced version of that value — one that
only updates after the input value has stopped changing for the full
delay period. This is the standard building block behind a
search-as-you-type input that shouldn't fire an API call on every
keystroke.

## Input

`value: T` (any type — the hook must work for strings, numbers, or
objects), `delayMs: number`.

## Output

The debounced value, of the same type `T`, updated only after `delayMs`
has elapsed with no further changes to the input value.

## Constraints

- The hook must clean up its internal timer correctly on unmount and on
  every re-render where `value` or `delayMs` changes, to avoid a stale
  timer firing after the component has moved on.
- `delayMs >= 0`.
- Must not cause an infinite render loop.

## Examples

| Scenario | Behavior |
|---|---|
| User types "r", "re", "rea", "reac", "react" within 300ms, delay=300 | Hook returns `""` (or the initial value) through all keystrokes, then updates to `"react"` once 300ms passes with no further changes |
| Value never changes after mount | Hook returns the initial value immediately and never updates again |
| `delayMs` changes between renders (e.g. user changes a settings toggle) | The debounce timer restarts using the new delay |

## Edge Cases

- Component unmounts while a debounce timer is still pending → the timer
  must be cleared; it must never call `setState` on an unmounted
  component.
- `delayMs = 0` → the debounced value should update on (essentially) the
  next tick, not synchronously in the same render — still going through
  `setTimeout`, just with a 0ms delay.
- The same value is set repeatedly (no actual change) → should still
  behave correctly, though optionally this can be treated as an
  optimization opportunity (skip resetting the timer if the value is
  reference-equal to the last one).

## Hints

1. This needs two pieces of state conceptually: the live input value
   (changes immediately) and the debounced output value (changes only
   after the delay) — what hook tracks the second one?
2. Every time the input `value` changes, the *previous* pending timer
   needs to be cancelled before a new one starts — otherwise you'd get
   multiple timers racing, not one clean debounce.
3. `useEffect`'s cleanup function (the function you `return` from inside
   the effect) runs automatically before the effect re-runs *and* on
   unmount — that's exactly the mechanism for cancelling the previous
   timer.

## Algorithm

**Pattern:** custom hook wrapping `useState` + `useEffect` with cleanup.
**Core insight:** a debounced value is just internal state that lags
behind the real input, updated via a `setTimeout` that gets reset every
time the input changes. The `useEffect` cleanup function is what makes
this correct instead of leaky — without cancelling the previous timer,
every keystroke would schedule a new update, and old ones would still
fire, overwriting newer state with stale values.
**Invariant:** at most one pending timer exists at any time — a new
timer is only scheduled after the previous one has been cleared, which
`useEffect`'s cleanup guarantees happens before the effect runs again.

## Dry Run

**Input:** `value` changes `"" → "r" → "re" → "rea"` in rapid
succession (each change well within `delayMs = 300`), then stops.

| Render | value | Effect runs | Cleanup (cancels previous timer) | New timer scheduled | debouncedValue (state) |
|---|---|---|---|---|---|
| 1 | `""` | yes | n/a (first run) | fires in 300ms → sets `""` | `""` |
| 2 | `"r"` | yes | cancels timer from render 1 | fires in 300ms → sets `"r"` | `""` (unchanged yet) |
| 3 | `"re"` | yes | cancels timer from render 2 | fires in 300ms → sets `"re"` | `""` (unchanged yet) |
| 4 | `"rea"` | yes | cancels timer from render 3 | fires in 300ms → sets `"rea"` | `""` (unchanged yet) |
| — 300ms of silence — | | | | timer from render 4 fires | `"rea"` |

**Result:** `debouncedValue` only ever actually updates once, to
`"rea"` — every earlier timer was cancelled before it could fire.

## JavaScript Solution

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delayMs) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Schedule the update for after the delay.
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Runs before the NEXT effect (i.e. the next time `value` or
    // `delayMs` changes) or on unmount — cancels the pending timer so
    // only the most recent one is ever allowed to fire.
    return () => clearTimeout(timerId);
  }, [value, delayMs]);

  return debouncedValue;
}

// Usage:
function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // fetchResults(debouncedQuery) — only fires once typing pauses
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## TypeScript Solution

```tsx
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timerId);
  }, [value, delayMs]);

  return debouncedValue;
}

// Usage — T is inferred as string here, but the hook works for any type:
function SearchBox() {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // fetchResults(debouncedQuery)
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## Time Complexity

O(1) per render — one `setTimeout`/`clearTimeout` pair, regardless of
how frequently the input value changes.

## Space Complexity

O(1) — one timer ID and one piece of state, independent of input size or
change frequency.

## Common Mistakes

- Forgetting the cleanup function entirely — without `return () =>
  clearTimeout(timerId)`, every keystroke schedules an additional timer
  that still fires, and whichever one resolves *last* wins, not
  necessarily the most recent value — this can cause the debounced value
  to briefly flicker to a stale value.
- Missing `delayMs` from the `useEffect` dependency array — if `delayMs`
  can change at runtime (e.g. a user-configurable debounce interval) and
  isn't in the dependency array, changing it won't actually take effect
  until the next unrelated `value` change.
- Debouncing the *value* but not realizing the component re-renders on
  every keystroke regardless — `useDebounce` doesn't reduce render
  count, it only delays when *dependent* work (like an API call) runs;
  conflating the two is a common misunderstanding of what this hook
  actually optimizes.

## Interview Follow-up Questions

1. How would you implement `useThrottle` instead — what's the core
   difference in behavior, and how would the hook's internals change?
2. How would you unit test this hook, given it depends on real timers?
   (Expect: Vitest/Jest fake timers — `vi.useFakeTimers()` +
   `vi.advanceTimersByTime()`.)
3. What if the debounced callback itself needs to be cancellable from
   outside the hook (e.g. a manual "search now" button that should
   bypass the delay)? How would you extend the hook's API to support
   that?
4. Is there a meaningful difference between debouncing the *value*
   (this implementation) versus debouncing the *callback* directly
   (`useDebouncedCallback`)? When would you reach for one over the
   other?

## Similar Questions

- Implement `useThrottle`
- Implement `useDebouncedCallback`
- Debounce Implementation (plain JavaScript, non-hook version — see
  [BACKLOG-JS.md](../BACKLOG-JS.md))

---
[← Back to 63-react-coding](README.md)
