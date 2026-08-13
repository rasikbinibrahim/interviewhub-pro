# QJSC032 · Implement Custom Array prototype push Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** in-place mutation, variadic arguments, `.length` as write target

## Problem Statement

Implement `customPush(array, ...items)`, a polyfill for
`Array.prototype.push`. It must append every value in `items`, in the
order given, to the end of `array`, mutating `array` in place, and
return `array`'s new length.

## Input

- `array`: the array to mutate
- `items`: zero or more values to append

## Output

A number: `array.length` after all items have been appended.

## Constraints

- Must mutate `array` directly — no new array is created or returned.
- Multiple arguments must all be appended, in the order they were
  passed, not just the first one.
- Calling with zero additional arguments (`customPush(array)`) is valid
  and simply returns the current (unchanged) length.
- Must not use the native `Array.prototype.push` internally.

## Examples

| `array` before | `items` | Returned | `array` after | Why |
|---|---|---|---|---|
| `[1, 2]` | `3` | `3` | `[1, 2, 3]` | One item appended; new length is 3 |
| `[1, 2]` | `3, 4, 5` | `5` | `[1, 2, 3, 4, 5]` | Multiple items appended in call order; new length is 5 |
| `[]` | (none) | `0` | `[]` | No items to append; length unchanged at 0 |

## Edge Cases

- Empty `array`, at least one item → item(s) become the array's first
  element(s); length becomes the count of items appended.
- No items at all → returns `array.length` unchanged, `array` untouched.
- `undefined` explicitly passed as one of the items (`customPush(array,
  undefined)`) → appended as a real stored `undefined` value (not a
  hole), and counted normally toward the new length.
- Very large `items` list — every item must be appended in order; none
  skipped.

## Hints

1. Each new item belongs at the position exactly one past the array's
   *current* end — and that position is always `array.length` itself
   (writing to index `array.length` on an array is exactly how you
   extend it by one).
2. Assigning to `array[array.length]` and then re-reading `array.length`
   for the *next* item works, but there's a cleaner way: `array.length`
   auto-updates after every indexed write past the current end, so
   writing item after item at successively increasing indices naturally
   grows `.length` for you as you go.
3. Since `items` may contain more than one value, loop over it in order,
   appending each one using the same "write, then move to the next
   index" step.

## Algorithm

**Pattern:** sequential end-of-array writes, relying on `.length`'s
self-updating behavior.
**Core insight:** in JS, writing to `array[array.length]` isn't out of
bounds — it's exactly how you append: the engine automatically extends
`array.length` to `index + 1` whenever you assign to an index at or
beyond the current length. So appending every item in `items`, one at a
time, each at the array's *current* `.length` at the moment of that
write, naturally grows the array by exactly `items.length` elements
without any separate bookkeeping — reading `array.length` again after
each write already reflects the previous append.
**Invariant:** immediately before appending the k-th item in `items`,
`array.length` equals its original length plus `k - 1` — i.e. exactly
the number of items already appended so far.

## Dry Run

**Input:** `customPush([1, 2], 3, 4)`

| Step | item | `array.length` before write | Write | `array` after | `array.length` after |
|---|---|---|---|---|---|
| 1 | `3` | `2` | `array[2] = 3` | `[1, 2, 3]` | `3` |
| 2 | `4` | `3` | `array[3] = 4` | `[1, 2, 3, 4]` | `4` |

**Result:** returns `4` (the final length), and `array` — the same
reference — now holds `[1, 2, 3, 4]`.

## JavaScript Solution

```js
function customPush(array, ...items) {
  for (const item of items) {
    // Writing at index === current length extends the array by one —
    // array.length updates automatically after this assignment.
    array[array.length] = item;
  }
  return array.length;
}
```

## TypeScript Solution

```ts
function customPush<T>(array: T[], ...items: T[]): number {
  for (const item of items) {
    array[array.length] = item;
  }
  return array.length;
}
```

## Time Complexity

O(k), where k is the number of items being pushed — each item is a
single O(1) indexed write, and there are k of them; independent of
`array`'s pre-existing size.

## Space Complexity

O(1) additional space — no new array or auxiliary structure is
allocated; growth happens in `array` itself.

## Common Mistakes

- Only appending `items[0]` and ignoring the rest — `push` is variadic
  and must append *every* argument, in order, not just the first.
- Building a brand-new array (`[...array, ...items]`) and reassigning
  the caller's variable to it — this doesn't mutate the *original*
  array object, so any other reference to the same array elsewhere in
  the program won't see the update, which breaks `push`'s in-place
  contract.
- Returning `items.length` or `array.length` captured *before* the
  loop, instead of the length *after* all items have been appended —
  `push` must return the final, post-append length.
- Manually tracking a separate counter variable instead of trusting
  `array.length` to update itself after each write — not wrong per se,
  but a common source of off-by-one bugs if the counter and the array's
  real length drift apart.

## Interview Follow-up Questions

1. Why does assigning to `array[array.length]` automatically grow the
   array, when assigning to `array[100]` on a 3-element array also
   "works" but leaves holes — what's actually happening internally in
   both cases?
2. How would you implement `unshift` (insert at the *front*) using
   similar direct-index-assignment thinking, and why is it more
   expensive than `push`?
3. What's the amortized time complexity of repeatedly calling `push` one
   item at a time on a growing array, across many calls — and why is it
   still considered O(1) amortized despite occasional internal
   reallocation?
4. How would you implement a fixed-capacity ring buffer's `push`
   differently from this unbounded version?

## Similar Questions

- [Implement Custom Array prototype pop Polyfill](implement-custom-array-prototype-pop-polyfill.md)
- [Implement Custom Array prototype unshift Polyfill](implement-custom-array-prototype-unshift-polyfill.md)
- [Implement Custom Array prototype shift Polyfill](implement-custom-array-prototype-shift-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
