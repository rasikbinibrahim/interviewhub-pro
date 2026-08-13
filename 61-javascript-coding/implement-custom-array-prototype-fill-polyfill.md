# QJSC028 · Implement a Custom Array.prototype.fill Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Array Method Polyfills
**Concepts:** in-place mutation, negative-index normalization, range clamping

## Problem Statement

Implement `myFill`, a polyfill for `Array.prototype.fill`, attached as
`Array.prototype.myFill`. Called as `array.myFill(value, start, end)`,
it overwrites every index in the half-open range `[start, end)` with
`value`, mutating the array in place and returning that same array
(not a copy). `start` defaults to `0` and `end` defaults to the array's
`length`. Both may be negative, meaning "counted back from the end,"
exactly like the native method, and both must be clamped into valid
bounds no matter how far out of range they're given.

## Input

- The array `myFill` is called on.
- `value`: the value written into every index in range.
- `start` (optional, default `0`): starting index, may be negative.
- `end` (optional, default `array.length`): ending index (exclusive),
  may be negative.

## Output

The same array reference, mutated in place.

## Constraints

- `0 <= array.length <= 10^5`
- `start`/`end` may be negative, zero, positive, or out of range in
  either direction — all must be normalized and clamped into `[0,
  length]`.
- Must mutate the original array and return that same reference, not a
  new array.
- Unlike `map`/`filter`/`every`/`some`, `fill` takes no callback and
  does **not** skip holes — every index in range gets `value` written
  directly, including holes, which become real elements as a result.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3, 4].myFill(0)` | `[0, 0, 0, 0]` | no `start`/`end` given, so the entire array is overwritten |
| `[1, 2, 3, 4, 5].myFill(9, 1, 3)` | `[1, 9, 9, 4, 5]` | fills indices 1 and 2 only — `end` is exclusive, so index 3 is untouched |
| `[1, 2, 3, 4, 5].myFill(9, -3, -1)` | `[1, 2, 9, 9, 5]` | negative indices count from the end: `-3` → index 2, `-1` → index 4, filling `[2, 4)` |

## Edge Cases

- `start > end` after normalization → no indices are in range; the
  array is returned completely unchanged.
- Wildly out-of-bounds negative `start` (e.g. `start = -100` on a
  length-5 array) → clamps to `0`, not left negative.
- `end` beyond `length` → clamps to `length`.
- Called on an empty array → returns the same empty array, loop body
  never runs.
- Called on a sparse array within the fill range → holes are converted
  into real, present elements holding `value` (fill does not skip them,
  since there's no callback whose invocation could be "skipped" — it's
  a direct index write).

## Hints

1. Normalize `start` and `end` the same way, independently: if a value
   is negative, add `length` to it first; then clamp the result into
   `[0, length]` regardless of how far out of range it still is.
2. There's no callback here at all, so the hole-skipping logic that
   `every`/`some`/`map`/`filter` need doesn't apply — every index in the
   normalized range gets written to directly, whether or not it existed
   before.
3. After computing the normalized `from`/`to`, a single `for` loop
   writing `this[index] = value` from `from` up to (not including) `to`
   is the entire mutation — then return `this`.

## Algorithm

**Pattern:** index-range normalization followed by a direct in-place
write loop.
**Core insight:** the only real complexity in `fill` is converting
possibly-negative, possibly-out-of-range `start`/`end` arguments into
concrete, valid, in-bounds integer indices. Once both are normalized the
same way (add `length` if negative, then clamp to `[0, length]`), the
mutation itself is a trivial loop with no callback and no hole-awareness
to worry about.
**Invariant:** after the loop, every index `i` with `from <= i < to`
holds `value`; every index outside that range is untouched from
whatever it held before the call.

## Dry Run

**Input:** `[1, 2, 3, 4, 5].myFill(9, -3, -1)` (`length = 5`)

| Step | Raw argument | Normalization | Result |
|---|---|---|---|
| `start` | `-3` | negative → `5 + (-3) = 2`; clamp `Math.max(0, Math.min(2, 5))` | `from = 2` |
| `end` | `-1` | negative → `5 + (-1) = 4`; clamp `Math.max(0, Math.min(4, 5))` | `to = 4` |
| loop index 2 | — | `this[2] = 9` | array is now `[1, 2, 9, 4, 5]` |
| loop index 3 | — | `this[3] = 9` | array is now `[1, 2, 9, 9, 5]` |
| loop index 4 | — | `4 < to (4)` is false, loop stops | — |

**Result:** `[1, 2, 9, 9, 5]` — matches the expected output; index 4
(`5`) is untouched because `end = -1` normalized to the exclusive bound
`4`, not `5`.

## JavaScript Solution

```js
Array.prototype.myFill = function (value, start = 0, end = this.length) {
  const length = this.length;

  // Both start and end are normalized the same way: negative values
  // count back from the end, then everything is clamped into [0, length]
  // no matter how far out of range the raw argument was.
  const normalizeIndex = (rawIndex) => {
    const relative = rawIndex < 0 ? length + rawIndex : rawIndex;
    return Math.max(0, Math.min(relative, length));
  };

  const from = normalizeIndex(start);
  const to = normalizeIndex(end);

  for (let index = from; index < to; index += 1) {
    this[index] = value; // direct write — fill has no callback and skips no holes
  }

  return this; // fill mutates and returns the SAME array reference
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFill(value: T, start?: number, end?: number): this;
}

Array.prototype.myFill = function <T>(
  this: T[],
  value: T,
  start = 0,
  end: number = this.length,
): T[] {
  const length = this.length;

  const normalizeIndex = (rawIndex: number): number => {
    const relative = rawIndex < 0 ? length + rawIndex : rawIndex;
    return Math.max(0, Math.min(relative, length));
  };

  const from = normalizeIndex(start);
  const to = normalizeIndex(end);

  for (let index = from; index < to; index += 1) {
    this[index] = value;
  }

  return this;
};
```

## Time Complexity

O(k), where `k = to - from` is the number of indices actually written —
worst case O(n) when the whole array is filled.

## Space Complexity

O(1) — the array is mutated in place; only a fixed number of scalar
index variables are used regardless of array size.

## Common Mistakes

- Forgetting to clamp *after* adding `length` for a very negative
  `start` (e.g. `start = -100` on a length-5 array) — without the
  `Math.max(0, ...)` clamp, the loop would start from a negative index,
  producing wrong or no fills instead of clamping to `0`.
- Returning a new array instead of the mutated original — `fill` is an
  in-place, mutating method; any caller relying on `array === array.fill(...)`
  being `true` would break.
- Treating `end` as inclusive instead of exclusive — an off-by-one that
  fills one index too many.
- Assuming `fill` skips holes the way `map`/`filter`/`every`/`some` do —
  it doesn't, because there's no callback to skip invoking; every index
  in range gets overwritten, holes included.

## Interview Follow-up Questions

1. Why doesn't `fill` accept a callback like `map`/`filter` do — what
   does always writing a single fixed `value` imply about using it with
   objects or arrays (e.g. `new Array(3).myFill([])`)?
2. What actually happens if you call `array.fill({})` on a length-3
   array — do all three indices end up pointing to the *same* object
   reference, or three separate ones? Why does that matter?
3. How would you extend this to accept a factory function instead of a
   static value, to sidestep the shared-reference issue above?
4. How does `fill`'s hole-handling differ conceptually from
   `map`/`filter`/`every`/`some`'s hole-skipping, and why is that
   difference inherent to what `fill` does (no callback at all)?
5. How would `fill`'s index-normalization logic reappear in
   `copyWithin`, `slice`, or `splice` — is this the same normalization
   pattern repeated across several array methods?

## Similar Questions

- [Implement a Custom Array.prototype.indexOf Polyfill](implement-custom-array-prototype-indexof-polyfill.md) (same negative-`fromIndex` normalization pattern)
- [Implement a Custom Array.prototype.includes Polyfill](implement-custom-array-prototype-includes-polyfill.md)
- Implement `Array.prototype.copyWithin` polyfill (same start/end
  normalization, but copies a sub-range instead of overwriting it with a
  constant)

---
[← Back to 61-javascript-coding](README.md)
