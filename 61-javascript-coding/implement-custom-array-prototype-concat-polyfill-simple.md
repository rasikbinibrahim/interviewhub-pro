# QJSC062 · Implement Custom Array prototype concat Polyfill Simple

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** array spreading vs. appending, `Symbol.isConcatSpreadable`, shallow copy, variadic arguments

## Problem Statement

Implement `customConcat(array, ...items)`, a polyfill for
`Array.prototype.concat`. It must build and return a **new** array
containing every element of `array`, followed by each argument in
`items` — arrays among those arguments are *spread* (their elements are
appended individually), while non-array values are appended as a single
element each. `array` itself must never be mutated.

## Input

- `array`: the base array
- `items`: zero or more additional arguments, each either a single value
  or another array to spread in

## Output

A new array: `array`'s elements, followed by each item in `items` —
spread if that item is an array, appended whole otherwise.

## Constraints

- Must not mutate `array` or any array passed in `items`.
- A plain value argument (number, string, object, etc.) is appended as a
  single element, never spread.
- An array argument is spread one level deep only — nested arrays inside
  it are *not* further flattened (`concat([1], [[2]])` produces `[1,
  [2]]`, not `[1, 2]`).
- An array-like object (has `length` and indices, but isn't an array and
  doesn't opt in via `Symbol.isConcatSpreadable`) is appended as a
  single element, not spread — only real arrays (or objects explicitly
  marked spreadable) get spread.

## Examples

| `array` | `items` | Output | Why |
|---|---|---|---|
| `[1, 2]` | `[3, 4]` | `[1, 2, 3, 4]` | The array argument is spread element-by-element |
| `[1, 2]` | `3` | `[1, 2, 3]` | A non-array argument is appended as a single element |
| `[1, 2]` | `[3, 4], 5` | `[1, 2, 3, 4, 5]` | Multiple arguments: the array is spread, the plain value is appended, in call order |

## Edge Cases

- No `items` at all (`customConcat([1, 2])`) → `[1, 2]`, a *new* array
  that is a shallow copy of `array`, not the same reference.
- Nested arrays (`customConcat([1], [[2, 3]])`) → `[1, [2, 3]]` — only
  one level of spreading, the inner array stays intact as a single
  element.
- An `items` argument that is itself an empty array (`customConcat([1],
  [])`) → `[1]` — spreading an empty array contributes nothing.
- `array` is empty (`customConcat([], [1, 2])`) → `[1, 2]`.
- Object with `[Symbol.isConcatSpreadable] = true` but not an array →
  spread anyway (the real spec explicitly supports this opt-in); without
  that flag, array-like objects are appended whole.

## Hints

1. Start the result as a fresh copy of `array` — `concat` never mutates
   its receiver, so the very first step is producing an independent new
   array, not modifying `array` in place.
2. For each argument in `items`, you need to decide "spread it in, or
   append it whole?" — what check distinguishes "this is an array" (or
   explicitly opted-in via `Symbol.isConcatSpreadable`) from "this is
   just a value"?
3. Once you know an argument should be spread, appending each of its
   elements one at a time (a simple loop, not a nested `concat` call) is
   both correct and avoids implementing spreading recursively — spreading
   is exactly one level deep, never more.

## Algorithm

**Pattern:** shallow-copy-then-append, with a per-argument spreadability
check.
**Core insight:** `concat` never mutates anything — it always starts
from a brand-new array. From there, each of the variadic arguments is
classified independently: if it's an array (or has opted in via
`Symbol.isConcatSpreadable`), its own elements — not the array object
itself — are pushed one at a time into the result; otherwise, the
argument itself, whatever it is, is pushed as a single new element.
Because spreadability is checked per-argument rather than recursively,
the "flatten one level only" rule falls out naturally: an inner array's
own array-valued elements are never inspected during that spreading
step.
**Invariant:** at every point in the loop, `result` contains exactly the
processed elements-or-arguments seen so far, in original order, and
`array`/every array in `items` remains byte-for-byte unchanged.

## Dry Run

**Input:** `customConcat([1, 2], [3, 4], 5)`

| Step | Argument being processed | Is it spreadable? | Action | `result` after |
|---|---|---|---|---|
| 1 | (start) | — | Copy `array`'s elements into `result` | `[1, 2]` |
| 2 | `[3, 4]` | Yes — it's a real array | Push `3`, then `4` individually | `[1, 2, 3, 4]` |
| 3 | `5` | No — not an array | Push `5` whole | `[1, 2, 3, 4, 5]` |

**Result:** `[1, 2, 3, 4, 5]` — matches native `[1, 2].concat([3, 4],
5)`, and `[1, 2]` (the original `array`) is untouched.

## JavaScript Solution

```js
function customConcat(array, ...items) {
  // concat never mutates — always start from a fresh shallow copy.
  const result = [];
  for (const element of array) {
    result.push(element);
  }

  const isSpreadable = (value) =>
    Array.isArray(value) ||
    (value !== null &&
      typeof value === 'object' &&
      value[Symbol.isConcatSpreadable] === true);

  for (const item of items) {
    if (isSpreadable(item)) {
      // Spread exactly one level: append each of item's own elements,
      // never recursing into elements that are themselves arrays.
      for (const element of item) {
        result.push(element);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function customConcat<T>(
  array: readonly T[],
  ...items: Array<T | readonly T[]>
): T[] {
  const result: T[] = [];
  for (const element of array) {
    result.push(element);
  }

  const isSpreadable = (value: unknown): value is readonly T[] =>
    Array.isArray(value) ||
    (value !== null &&
      typeof value === 'object' &&
      (value as { [Symbol.isConcatSpreadable]?: boolean })[
        Symbol.isConcatSpreadable
      ] === true);

  for (const item of items) {
    if (isSpreadable(item)) {
      for (const element of item) {
        result.push(element);
      }
    } else {
      result.push(item as T);
    }
  }

  return result;
}
```

## Time Complexity

O(n + m), where n is `array`'s length and m is the total number of
elements contributed across all `items` (spread arrays contribute their
length; plain values contribute 1 each) — every element is visited and
pushed exactly once.

## Space Complexity

O(n + m) — the new result array holds exactly n + m elements; no
additional structure scales with input size.

## Common Mistakes

- Mutating `array` directly with `array.push(...)` instead of building a
  separate `result` array — violates `concat`'s core non-mutating
  contract, which is the entire reason it exists alongside `push`.
- Spreading recursively (flattening nested arrays fully) instead of
  exactly one level — `concat([1], [[2, 3]])` must produce `[1, [2,
  3]]`, not `[1, 2, 3]`; that full-flatten behavior belongs to `flat()`,
  not `concat`.
- Checking spreadability with `typeof item === 'object'` alone —
  wrongly spreads plain objects and array-like objects that haven't
  opted in via `Symbol.isConcatSpreadable`, which should be appended as
  a single element instead.
- Forgetting the initial copy step and starting `result` as a reference
  to `array` itself (`const result = array`) — later pushes would
  mutate the original `array`.

## Interview Follow-up Questions

1. What is `Symbol.isConcatSpreadable` for, and can you give a realistic
   example of an object that isn't a real array but should still be
   spread by `concat`?
2. How is `concat`'s "spread exactly one level" behavior different from
   `Array.prototype.flat(1)`, given they sound similar?
3. How would you implement `concat` using only the spread operator
   (`[...array, ...items.flatMap(...)]`) — and why might an interviewer
   still want the manual loop version first?
4. What happens if `array` itself is sparse (has holes, e.g. `[1, , 3]`)
   — does your implementation preserve the holes, and does native
   `concat`?

## Similar Questions

- [Implement Custom Array isArray Polyfill](implement-custom-array-isarray-polyfill.md)
  (shares the array-vs-array-like distinction)
- [Implement Custom Array prototype slice Polyfill](implement-custom-array-prototype-slice-polyfill.md)
- Implement `Array.prototype.flat` (full recursive flattening, contrast
  with concat's one-level spread)

---
[← Back to 61-javascript-coding](README.md)
