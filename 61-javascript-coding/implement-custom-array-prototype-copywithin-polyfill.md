# QJS352 · Implement Custom Array prototype copyWithin Polyfill

**Difficulty:** Medium
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★☆☆
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** in-place mutation, negative-index normalization, overlapping-range copy direction (`memmove`-style, not naive `memcpy`)

## Problem Statement

Implement `customCopyWithin(array, target, start, end)`, a polyfill for
`Array.prototype.copyWithin`. It copies a sequence of elements from
`array` itself — the slice `[start, end)` — to the position beginning
at `target`, **mutating `array` in place**, overwriting whatever was
there. `array.length` never changes. The source and destination ranges
may overlap, and the copy must behave correctly even then — like a
`memmove`, not a naive `memcpy` that would silently corrupt overlapping
data.

## Input

- `array`: the array to mutate
- `target`: integer index to start writing at; may be negative
- `start`: optional integer, defaults to `0`; start of the range to
  copy from; may be negative
- `end`: optional integer, defaults to `array.length`; end (exclusive)
  of the range to copy from; may be negative

## Output

The same `array` reference, mutated in place.

## Constraints

- Must mutate `array` in place and return the same reference —
  `array.length` never changes, no elements are added or removed, only
  overwritten.
- `target`, `start`, and `end` may each be negative, meaning "counted
  from the end" (same convention as `slice`/`at`), and must be
  normalized and clamped into valid bounds.
- The source range `[start, end)` and the destination range (starting at
  `target`, the same length as the source range, clamped to not run past
  `array.length`) may overlap — the copy must produce the same result a
  correct `memmove` would, not corrupt data the way a naive
  left-to-right copy can when source and destination overlap.
- Must not use the native `Array.prototype.copyWithin` internally.

## Examples

| `array` | `target, start, end` | Output | Why |
|---|---|---|---|
| `[1, 2, 3, 4, 5]` | `0, 3` | `[4, 5, 3, 4, 5]` | Elements from index 3 to the end (`[4, 5]`) copied to index 0, overwriting `1, 2` |
| `[1, 2, 3, 4, 5]` | `0, 3, 4` | `[4, 2, 3, 4, 5]` | Only index 3 (`[4]`, since `end` excludes index 4) copied to index 0 |
| `[1, 2, 3, 4, 5]` | `-2, 0, 3` | `[1, 2, 3, 1, 2]` | Negative `target` (`-2` → index 3): elements `[1, 2, 3]` copied starting at index 3, but clamped to the array's remaining length, so only `1, 2` actually fit and get written |

## Edge Cases

- `target === start` → no-op; copying a range onto itself changes
  nothing.
- Overlapping ranges where `target < start` (copying toward the front,
  e.g. `copyWithin(array, 0, 3)` on a 5-element array) — the destination
  positions being written are *before* some not-yet-read source
  positions in a left-to-right pass, so a naive forward copy is actually
  safe here (destination trails behind source); still must be verified,
  not assumed.
- Overlapping ranges where `target > start` (copying toward the back,
  e.g. `copyWithin(array, 3, 0)` on a 5-element array) — a naive
  forward copy here overwrites source elements before they've been read
  (destination is ahead of, and will catch up to, source), and *must*
  be copied back-to-front to be correct — this is the classic `memmove`
  trap.
- `target`, `start`, or `end` beyond `array.length`, or more negative
  than `-array.length` → clamp into `[0, array.length]`, never throw.
- The copy naturally truncates at `array.length` — if the source range
  is longer than the room remaining after `target`, only as many
  elements as fit are copied (see Example 3 above).

## Hints

1. `target`, `start`, and `end` all need the same negative-index
   normalization as `slice`: add `array.length` to a negative value,
   then clamp the result into `[0, array.length]`.
2. Copying overlapping ranges the "obvious" way (a simple left-to-right
   loop) is only safe in *one* of the two overlap directions — think
   about what happens if the destination range starts *after* the
   source range starts and they overlap: does a forward copy read a
   value before or after it's already been overwritten?
3. When `target > start` (destination is ahead of and overlaps the
   source), copy from the **end of the range backward** instead —
   writing the last element first, then working toward the first,
   guarantees every source value is read before that same position
   could ever be overwritten.

## Algorithm

**Pattern:** `memmove`-style overlap-safe copy, direction chosen based
on the relative position of `target` versus `start`.
**Core insight:** `copyWithin` isn't just "loop and copy" — because
source and destination live in the *same* array, an overlapping range
copied in the wrong direction silently corrupts data: if `target` is
greater than `start` (the destination range starts further right than
the source and they overlap), copying left-to-right would overwrite
source elements with already-copied values before the loop ever reads
them. The fix mirrors how a real `memmove` works: copy **backward**
(from the last element of the range to the first) whenever the
destination overlaps and starts after the source, so every read happens
before that same array slot could possibly be overwritten by the copy.
When `target` is less than or equal to `start`, a forward (left-to-right)
copy is always safe, because the destination trails behind (or equals)
the source, so nothing gets overwritten before it's read.
**Invariant:** at every step of the copy, the next source element to be
read has not yet been overwritten by a previous write in this same
operation — this is the property that "pick the right direction"
guarantees, and a naive single-direction copy does not.

## Dry Run

**Input:** `customCopyWithin([1, 2, 3, 4, 5], 2, 0, 3)` — copy indices
`0..2` (`[1, 2, 3]`) to start at index `2`; source `[0, 3)` and
destination `[2, 5)` overlap, and `target (2) > start (0)`, so the copy
must run **backward**.

| Step | Copying source index → destination index | `array[dest]` before | `array[dest]` after |
|---|---|---|---|
| 1 (last pair first) | `2 → 4` | `5` | `3` (copied from `array[2]`, read *before* being overwritten) |
| 2 | `1 → 3` | `4` | `2` (copied from `array[1]`) |
| 3 | `0 → 2` | `3` (already overwritten in step 1, but not read again) | `1` (copied from `array[0]`) |

**Result:** `[1, 2, 1, 2, 3]` — note that a naive **forward** copy on
this same input would have instead produced `[1, 2, 1, 2, 1]`
(incorrect: at destination index 4, it would copy the already-mutated
`array[2]`, which is `1` by then, not the original `3`), which is
exactly the corruption a `memmove`-style backward copy avoids.

## JavaScript Solution

```js
function customCopyWithin(array, target, start, end) {
  const length = array.length;

  const normalize = (value, fallback) => {
    let index = value === undefined ? fallback : Math.trunc(value);
    if (index < 0) {
      index += length;
    }
    return Math.max(0, Math.min(index, length));
  };

  const normalizedTarget = normalize(target, 0);
  const normalizedStart = normalize(start, 0);
  const normalizedEnd = normalize(end, length);

  // How many elements are actually available to copy, further clamped
  // so the write never runs past the end of the array.
  const rangeLength = Math.min(
    normalizedEnd - normalizedStart,
    length - normalizedTarget,
  );

  if (rangeLength <= 0) {
    return array; // nothing to copy
  }

  if (normalizedTarget <= normalizedStart) {
    // Destination trails behind (or equals) the source — safe to copy
    // forward; every source element is read before it could be
    // overwritten by this operation.
    for (let offset = 0; offset < rangeLength; offset += 1) {
      array[normalizedTarget + offset] = array[normalizedStart + offset];
    }
  } else {
    // Destination is ahead of and overlaps the source — copy backward
    // (memmove-style): write the LAST element of the range first, so
    // every read happens before that source slot could be clobbered.
    for (let offset = rangeLength - 1; offset >= 0; offset -= 1) {
      array[normalizedTarget + offset] = array[normalizedStart + offset];
    }
  }

  return array;
}
```

## TypeScript Solution

```ts
function customCopyWithin<T>(
  array: T[],
  target: number,
  start?: number,
  end?: number,
): T[] {
  const length = array.length;

  const normalize = (value: number | undefined, fallback: number): number => {
    let index = value === undefined ? fallback : Math.trunc(value);
    if (index < 0) {
      index += length;
    }
    return Math.max(0, Math.min(index, length));
  };

  const normalizedTarget = normalize(target, 0);
  const normalizedStart = normalize(start, 0);
  const normalizedEnd = normalize(end, length);

  const rangeLength = Math.min(
    normalizedEnd - normalizedStart,
    length - normalizedTarget,
  );

  if (rangeLength <= 0) {
    return array;
  }

  if (normalizedTarget <= normalizedStart) {
    for (let offset = 0; offset < rangeLength; offset += 1) {
      array[normalizedTarget + offset] = array[normalizedStart + offset] as T;
    }
  } else {
    for (let offset = rangeLength - 1; offset >= 0; offset -= 1) {
      array[normalizedTarget + offset] = array[normalizedStart + offset] as T;
    }
  }

  return array;
}
```

## Time Complexity

O(k), where k is `rangeLength` (the number of elements actually copied)
— normalization is O(1); the copy loop, in either direction, touches
each of the k positions exactly once.

## Space Complexity

O(1) — the copy happens entirely in place on `array`; only a handful of
scalar index variables are used, none scaling with `array`'s size.

## Common Mistakes

- Always copying left-to-right regardless of overlap direction — this
  is the single most important bug in this problem: when `target >
  start` and the ranges overlap, a forward copy overwrites source
  elements with already-copied values before they've been read,
  silently corrupting the result (see the Dry Run's contrast with a
  naive forward copy).
- Copying into a temporary array first (`const temp = array.slice(start,
  end); ...write temp back...`) to sidestep the overlap problem —
  this actually produces a *correct* result, but at O(k) extra space,
  which misses the point of the question: a true `memmove`-style
  solution does it in O(1) space by choosing the safe direction, not by
  avoiding the issue with a copy.
- Forgetting to clamp `rangeLength` against `length - normalizedTarget`
  — without this, the loop can attempt to write past `array.length`,
  silently growing the array with extra elements instead of the
  spec-correct behavior of truncating the copy to fit.
- Mishandling the negative-index normalization for `target` — since
  `target` gets the *same* treatment as `start`/`end`, forgetting to
  normalize and clamp it independently is an easy oversight.

## Interview Follow-up Questions

1. Why is `copyWithin` a genuinely different problem from `slice` +
   manual reassignment, given both involve copying a range of elements?
2. Can you describe, in general terms (not specific to this problem),
   when a `memcpy`-style forward copy is safe for overlapping memory
   regions, and when a `memmove`-style direction-aware copy is required?
3. How would you test this implementation specifically for the
   overlapping-range case, to catch a regression where someone
   "simplifies" it back to a naive forward-only copy?
4. What's the real-world use case for `copyWithin` — why would someone
   choose an in-place, mutating range-copy over building a new array?

## Similar Questions

- [Implement Custom Array prototype slice Polyfill](implement-custom-array-prototype-slice-polyfill.md)
  (shares the same negative-index normalization, but never mutates)
- [Implement Custom Array prototype fill Polyfill](implement-custom-array-prototype-fill-polyfill.md)
- Implement `memmove` semantics for a typed array / buffer

---
[← Back to 61-javascript-coding](README.md)
