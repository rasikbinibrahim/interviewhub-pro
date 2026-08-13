# QJSC035 · Implement Custom Array prototype unshift Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** in-place mutation, variadic arguments, right-to-left index shifting, insertion at the front

## Problem Statement

Implement `customUnshift(array, ...items)`, a polyfill for
`Array.prototype.unshift`. It must insert every value in `items`, in
the order given, at the **front** of `array` — mutating `array` in
place, shifting all existing elements up by `items.length` positions —
and return `array`'s new length.

## Input

- `array`: the array to mutate
- `items`: zero or more values to insert at the front

## Output

A number: `array.length` after all items have been inserted.

## Constraints

- Must mutate `array` directly, in place — no new array is created or
  returned.
- All existing elements must shift toward higher indices by exactly
  `items.length` positions, preserving their relative order.
- The inserted items must appear at the front in the *same order* they
  were passed (`customUnshift([3], 1, 2)` produces `[1, 2, 3]`, not `[2,
  1, 3]`).
- Calling with zero items is valid and simply returns the current
  (unchanged) length.
- Must not use the native `Array.prototype.unshift` internally.

## Examples

| `array` before | `items` | Returned | `array` after | Why |
|---|---|---|---|---|
| `[3, 4]` | `1, 2` | `4` | `[1, 2, 3, 4]` | Both items inserted at the front, in call order; length grows by 2 |
| `[1, 2]` | (none) | `2` | `[1, 2]` | Nothing to insert; length unchanged |
| `[]` | `'a'` | `1` | `['a']` | Inserting into an empty array |

## Edge Cases

- Empty `array`, one or more items → items become the array's first
  (and, if `array` was empty, only) elements.
- No items at all → returns `array.length` unchanged, `array` untouched.
- Multiple items — order of insertion must exactly match the order the
  items were passed as arguments, not reversed.
- Large `array` — every existing element must shift, making this
  inherently O(n) regardless of how many items are inserted, similar to
  `shift`'s cost profile.

## Hints

1. Unlike `push`, you can't just write to the next free index — the
   *existing* elements are in the way and need to move first to make
   room at the front.
2. Making room means shifting every existing element up by
   `items.length` positions — and that shift must happen **right to
   left** (from the last existing element toward the first), or later
   elements will overwrite earlier ones before they've been read.
3. Once the gap at the front is open, copy `items` into positions `0`
   through `items.length - 1`, in the same order they were passed.

## Algorithm

**Pattern:** right-to-left shift to open a gap, then front-fill.
**Core insight:** inserting at the front requires first making room —
every existing element needs to move `items.length` positions toward
the end. That shift must be processed from the *highest* existing index
down to the lowest (right to left); shifting left-to-right instead would
overwrite a not-yet-moved element with an already-moved one, corrupting
data, because the destination index for an early element and the source
index for a later element can overlap. Once every existing element has
been relocated, the now-empty positions `0` through `items.length - 1`
are simply filled with `items`, in order.
**Invariant:** at each step of the right-to-left shift, every index at
or above the current write position already holds its final,
post-insertion value; nothing below that position has been touched yet
and still holds its original value, safe to read.

## Dry Run

**Input:** `customUnshift([30, 40], 10, 20)`

| Step | Action | `array` state |
|---|---|---|
| 1 | `itemsCount = 2`; original length `2`; new length will be `4` | `[30, 40]` |
| 2 | Shift right-to-left: copy `array[1]` (`40`) to `array[1 + 2] = array[3]` | `[30, 40, _, 40]` (index 2 still stale) |
| 3 | Copy `array[0]` (`30`) to `array[0 + 2] = array[2]` | `[30, 40, 30, 40]` |
| 4 | Front-fill: `array[0] = 10` | `[10, 40, 30, 40]` |
| 5 | `array[1] = 20` | `[10, 20, 30, 40]` |

**Result:** returns `4`, and `array` is mutated in place to `[10, 20,
30, 40]` — `items` at the front in call order, followed by the original
elements in their original relative order.

## JavaScript Solution

```js
function customUnshift(array, ...items) {
  const itemsCount = items.length;
  const originalLength = array.length;

  // Shift existing elements right by itemsCount positions.
  // MUST go right-to-left: otherwise an early write could clobber a
  // later element before it's been read and moved.
  for (let index = originalLength - 1; index >= 0; index -= 1) {
    array[index + itemsCount] = array[index];
  }

  // Front-fill the now-open gap with items, in the order given.
  for (let index = 0; index < itemsCount; index += 1) {
    array[index] = items[index];
  }

  return array.length; // length auto-updated by the highest index written above
}
```

## TypeScript Solution

```ts
function customUnshift<T>(array: T[], ...items: T[]): number {
  const itemsCount = items.length;
  const originalLength = array.length;

  for (let index = originalLength - 1; index >= 0; index -= 1) {
    array[index + itemsCount] = array[index] as T;
  }

  for (let index = 0; index < itemsCount; index += 1) {
    array[index] = items[index] as T;
  }

  return array.length;
}
```

## Time Complexity

O(n + k), where n is `array`'s original length (every existing element
shifts) and k is `items.length` (every new item is written once) —
dominated by the O(n) shift, making `unshift` inherently expensive on
large arrays regardless of how few items are inserted.

## Space Complexity

O(1) additional space — the shift and insertion both happen in place on
`array` itself; no auxiliary array is allocated.

## Common Mistakes

- Shifting elements **left-to-right** instead of right-to-left — copying
  `array[0]` to `array[itemsCount]` before `array[1]` has been read and
  moved overwrites data that hasn't been relocated yet, corrupting the
  array. This is the mirror-image mistake of `shift`'s "must go
  left-to-right," and mixing the two up is an easy trap.
- Inserting `items` in reversed order (e.g. by using `unshift`-style
  single-item insertion in a loop without tracking position correctly)
  — `customUnshift([3], 1, 2)` must produce `[1, 2, 3]`, not `[2, 1,
  3]`.
- Forgetting that the array must grow by `items.length`, not by a fixed
  `1` — a hardcoded shift-by-one only works when exactly one item is
  passed.
- Assuming `unshift` is as cheap as `push` — like `shift`, it's O(n)
  because every existing element must move, unlike `push`'s O(1)
  amortized append.

## Interview Follow-up Questions

1. Why must the element-shifting loop run right-to-left here, while
   `shift`'s equivalent loop runs left-to-right — what's the general
   rule for picking a safe direction when shifting elements in place?
2. What's the combined cost of calling `unshift` once with k items,
   versus calling it k separate times with one item each — are they the
   same Big-O, and does the constant factor differ?
3. How would you implement this using `array.splice(0, 0, ...items)`
   instead — what does `splice` do internally that mirrors this exact
   logic?
4. If you needed to repeatedly insert at the front of a large collection
   in a hot path, what data structure would you reach for instead of a
   plain array, and why?

## Similar Questions

- [Implement Custom Array prototype shift Polyfill](implement-custom-array-prototype-shift-polyfill.md)
- [Implement Custom Array prototype push Polyfill](implement-custom-array-prototype-push-polyfill.md)
- Implement a Deque (double-ended queue) with O(1) operations at both ends

---
[← Back to 61-javascript-coding](README.md)
