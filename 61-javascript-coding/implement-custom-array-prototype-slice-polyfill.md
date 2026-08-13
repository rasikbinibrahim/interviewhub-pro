# QJSC021 · Implement Custom Array prototype slice Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** non-mutating shallow copy, negative-index normalization, half-open range `[start, end)`

## Problem Statement

Implement `customSlice(array, start, end)`, a polyfill for
`Array.prototype.slice`. It must return a **new** array containing a
shallow copy of the elements from index `start` up to, but not
including, index `end` — without ever mutating `array` — and it must
support negative `start`/`end` values, which count from the end of the
array.

## Input

- `array`: the array to slice from
- `start`: optional integer, defaults to `0`; may be negative
- `end`: optional integer, defaults to `array.length`; may be negative

## Output

A new array holding the selected elements, in order. `array` itself is
never modified.

## Constraints

- Must not mutate `array`.
- `start`/`end` may be omitted, positive, negative, or out of range in
  either direction — all must be normalized/clamped, never thrown on.
- The selected range is half-open: `[start, end)` — the element at
  `end` itself is excluded.
- If, after normalization, `start >= end`, the result is an empty array
  (not an error).
- Must not use the native `Array.prototype.slice` internally.

## Examples

| `array` | `start`, `end` | Output | Why |
|---|---|---|---|
| `[1, 2, 3, 4, 5]` | `1, 3` | `[2, 3]` | Elements at indices 1 and 2 — index 3 is excluded (half-open range) |
| `[1, 2, 3, 4, 5]` | `-2` (no `end`) | `[4, 5]` | Negative start counts from the end: last two elements to the end of the array |
| `[1, 2, 3, 4, 5]` | (no args) | `[1, 2, 3, 4, 5]` | No `start`/`end` defaults to the whole array — but as a *new* array, not the same reference |

## Edge Cases

- `start` omitted → defaults to `0`.
- `end` omitted (or `undefined`) → defaults to `array.length`.
- `start` beyond `array.length` (e.g. `10` on a 5-element array) →
  empty array (no elements exist at or beyond that position).
- Negative `start` more negative than `-array.length` (e.g. `-100` on a
  5-element array) → clamps to `0`, not left negative.
- `start >= end` after normalization (e.g. `slice(array, 3, 1)`) →
  empty array, never a "reversed" selection.
- `customSlice(array)` result must be `!==` `array` (a genuinely new
  array), even though its contents are identical.

## Hints

1. Negative `start`/`end` mean "counted from the end" — exactly the same
   normalization idea as `Array.prototype.at`: add `array.length` to a
   negative value to convert it into an equivalent non-negative index.
2. After normalizing negatives, both `start` and `end` still need
   clamping into the valid `[0, array.length]` range — a very negative
   input normalizes to a number that's still negative, and a too-large
   positive input should be capped at `array.length`.
3. Once `start` and `end` are both valid, non-negative indices within
   range, the rest is a simple forward loop from `start` up to (not
   including) `end`, pushing each `array[i]` into a fresh result array.

## Algorithm

**Pattern:** index normalization + clamping, then a bounded copy loop.
**Core insight:** `slice`'s entire complexity lives in correctly turning
whatever `start`/`end` were given — omitted, positive, negative, or out
of range — into two clean, valid, non-negative indices describing a
half-open range within `[0, array.length]`. Once that normalization is
done, the actual extraction is just "copy every element from the
normalized `start` up to but not including the normalized `end`" — a
plain forward loop building a brand-new array, never touching `array`
itself.
**Invariant:** after normalization, `0 <= normalizedStart <=
normalizedEnd <= array.length` always holds — negative inputs have been
converted and clamped, and any inversion (`start` past `end`) has
collapsed to an empty range rather than being treated as an error or a
reversed selection.

## Dry Run

**Input:** `customSlice([10, 20, 30, 40, 50], -3, -1)`

| Step | Expression | Value |
|---|---|---|
| 1 | `array.length` | `5` |
| 2 | `start = -3` → negative, normalize | `5 + (-3) = 2` |
| 3 | `end = -1` → negative, normalize | `5 + (-1) = 4` |
| 4 | Clamp both into `[0, 5]` | `start = 2`, `end = 4` (already in range) |
| 5 | Loop `i` from `2` to `3` (exclusive of `4`), pushing `array[i]` | pushes `array[2] = 30`, then `array[3] = 40` |

**Result:** `[30, 40]` — indices 2 and 3, matching "third-from-last up
to but not including last," and `array` itself is untouched.

## JavaScript Solution

```js
function customSlice(array, start, end) {
  const length = array.length;

  // Default and normalize start.
  let normalizedStart = start === undefined ? 0 : Math.trunc(start);
  if (normalizedStart < 0) {
    normalizedStart += length;
  }
  normalizedStart = Math.max(0, Math.min(normalizedStart, length));

  // Default and normalize end.
  let normalizedEnd = end === undefined ? length : Math.trunc(end);
  if (normalizedEnd < 0) {
    normalizedEnd += length;
  }
  normalizedEnd = Math.max(0, Math.min(normalizedEnd, length));

  const result = [];
  for (let index = normalizedStart; index < normalizedEnd; index += 1) {
    result.push(array[index]);
  }

  return result;
}
```

## TypeScript Solution

```ts
function customSlice<T>(
  array: readonly T[],
  start?: number,
  end?: number,
): T[] {
  const length = array.length;

  let normalizedStart = start === undefined ? 0 : Math.trunc(start);
  if (normalizedStart < 0) {
    normalizedStart += length;
  }
  normalizedStart = Math.max(0, Math.min(normalizedStart, length));

  let normalizedEnd = end === undefined ? length : Math.trunc(end);
  if (normalizedEnd < 0) {
    normalizedEnd += length;
  }
  normalizedEnd = Math.max(0, Math.min(normalizedEnd, length));

  const result: T[] = [];
  for (let index = normalizedStart; index < normalizedEnd; index += 1) {
    result.push(array[index] as T);
  }

  return result;
}
```

## Time Complexity

O(k), where k is the number of elements in the resulting slice
(`normalizedEnd - normalizedStart`) — normalization itself is O(1); only
the copy loop scales, and it scales with the *output* size, not
`array`'s full length.

## Space Complexity

O(k) — the new result array holds exactly the sliced elements; no other
storage scales with input size.

## Common Mistakes

- Normalizing negative `start`/`end` but forgetting to clamp afterward
  — a `start` of `-100` on a 5-element array normalizes to `-95`, which
  is still an invalid negative index unless explicitly clamped to `0`.
- Treating `start >= end` (after normalization) as an error or trying to
  "reverse" the range — it should simply produce an empty array, exactly
  like the native method.
- Mutating `array` while building the result, or returning a reference
  into `array` rather than a genuinely new array — `slice`'s entire
  purpose (contrasted with `splice`) is that it never touches the
  original.
- Forgetting that `end` is *exclusive* — using `<=` instead of `<` in
  the copy loop includes one extra element that shouldn't be there.

## Interview Follow-up Questions

1. How is `slice`'s non-mutating, index-range-copying behavior different
   from `splice`, which sounds similar but does something entirely
   different?
2. How would you implement `slice` using `Array.prototype.map`/`filter`
   instead of a manual loop — what would be lost or gained doing it that
   way?
3. What does `slice()` (no arguments at all) get used for in real code,
   given it returns a value equal in content to the original array?
4. How does this negative-index normalization logic relate to what
   `Array.prototype.at` and `Array.prototype.splice` also need to do —
   could you factor it into one shared helper?

## Similar Questions

- [Implement Custom Array prototype at Index Getter](implement-custom-array-prototype-at-index-getter.md)
  (shares negative-index normalization)
- [Implement Custom Array prototype concat Polyfill](implement-custom-array-prototype-concat-polyfill-simple.md)
- Implement `Array.prototype.splice` (mutating counterpart)

---
[← Back to 61-javascript-coding](README.md)
