# QJSC015 · Implement a Custom Array.prototype.includes Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** SameValueZero comparison, `NaN` self-equality, negative `fromIndex` normalization

## Problem Statement

Implement `myIncludes`, a polyfill for `Array.prototype.includes`,
attached as `Array.prototype.myIncludes`. Called as
`array.myIncludes(searchElement, fromIndex)`, it returns `true` if
`searchElement` is present anywhere in the array at or after
`fromIndex`, using **SameValueZero** comparison — not strict equality —
so that, unlike `indexOf`, it correctly reports `NaN` as found when
searching for `NaN`. `fromIndex` defaults to `0` and may be negative,
counted back from the end of the array exactly like other array methods
that accept it.

## Input

- The array `myIncludes` is called on.
- `searchElement`: the value being searched for.
- `fromIndex` (optional, default `0`): index to start searching from,
  may be negative.

## Output

A boolean: `true` if `searchElement` is found via SameValueZero
comparison at or after the (normalized) `fromIndex`, `false` otherwise.

## Constraints

- `0 <= array.length <= 10^5`
- Must use SameValueZero comparison, not `===` — the only observable
  difference from `===` is that `NaN` must be considered equal to
  itself.
- `fromIndex` may be negative; normalize by adding `length`, then clamp
  to `0` if still negative.
- Must not call the native `Array.prototype.includes` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, NaN].myIncludes(NaN)` | `true` | SameValueZero treats `NaN` as equal to itself — this is the entire reason `includes` exists alongside `indexOf` |
| `[1, 2, 3, 2].myIncludes(2, 2)` | `true` | `fromIndex = 2` starts the search at index 2 (`3`); the match at index 3 (`2`) is still within the search window |
| `[1, 2, 3].myIncludes(1, -1)` | `false` | `fromIndex = -1` normalizes to `length + (-1) = 2`; the search window is only `[3]`, so `1` — which does exist earlier in the array — is never even considered |

## Edge Cases

- `fromIndex >= length` → `false` immediately; there's no valid index
  left to search.
- `fromIndex` more negative than `-length` (e.g. `-100` on a length-3
  array) → clamps to `0`, searching the whole array.
- Empty array → `false` regardless of `searchElement`.
- A hole in a sparse array, e.g. `[1, , 3].myIncludes(undefined)` →
  `true` — `includes` treats a hole as if it held `undefined`; it does
  **not** skip holes the way `indexOf`/`filter`/`map`/`every`/`some` do.
  This is the classic contrast with
  [indexOf](implement-custom-array-prototype-indexof-polyfill.md), which
  *does* skip holes.
- `[-0].myIncludes(0)` → `true` — SameValueZero treats `+0` and `-0` as
  equal (same as `===` already does for these two), so no special
  handling is needed for signed zero, only for `NaN`.

## Hints

1. The only functional difference between SameValueZero and `===` is
   how they treat `NaN` — `===` says `NaN === NaN` is `false`, but
   SameValueZero says they're equal. Everything else (including `+0`
   vs. `-0`) behaves the same as `===`.
2. You don't need `Object.is` or any built-in equality helper — the
   classic trick `value !== value` is `true` if and only if `value` is
   `NaN` (it's the one value in JS that isn't equal to itself), so you
   can build SameValueZero from two plain comparisons.
3. Normalize `fromIndex` the same way negative indices are normalized
   elsewhere: if negative, add `length`; then clamp to `0` if the result
   is still negative. If the normalized start is `>= length`, there's
   nothing left to search.

## Algorithm

**Pattern:** linear scan with a custom SameValueZero comparator and a
normalized starting index.
**Core insight:** `includes` differs from `indexOf` in exactly one way —
its equality check. Building a small helper (or inlining the check)
that says "equal if `===` says so, OR both sides are `NaN`" is
sufficient to reproduce SameValueZero without needing `Object.is` (which
would actually be wrong here anyway, since `Object.is` distinguishes
`+0`/`-0`, while SameValueZero and `includes` do not).
**Invariant:** at each step of the scan, every index strictly before the
current one — starting from the normalized `fromIndex` — has already
been checked and did not SameValueZero-match `searchElement`.

## Dry Run

**Input:** `[1, 2, NaN].myIncludes(NaN)` (`fromIndex` defaults to `0`)

| Step | index | element | `element === NaN`? | Both sides `NaN`? | Match? |
|---|---|---|---|---|---|
| 1 | 0 | `1` | `false` | `false` (1 is not NaN) | no, continue |
| 2 | 1 | `2` | `false` | `false` | no, continue |
| 3 | 2 | `NaN` | `false` (`NaN === NaN` is always `false`) | `true` (`NaN !== NaN` and `NaN !== NaN`, both hold) | **yes** — return `true` |

**Result:** `true` — found via the `NaN`-equals-`NaN` branch of
SameValueZero, something a plain `===` scan could never report.

## JavaScript Solution

```js
Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
  const length = this.length;
  if (length === 0) {
    return false;
  }

  // Negative fromIndex counts back from the end; clamp to 0 if it's
  // still negative after that (mirrors indexOf/fill's normalization).
  const startIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;

  for (let index = startIndex; index < length; index += 1) {
    const current = this[index]; // holes read as `undefined` here — NOT skipped

    // SameValueZero: identical to === except NaN is considered equal
    // to itself. `x !== x` is true only when x is NaN.
    const isSameValueZero =
      current === searchElement || (current !== current && searchElement !== searchElement);

    if (isSameValueZero) {
      return true;
    }
  }

  return false;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myIncludes(searchElement: T, fromIndex?: number): boolean;
}

Array.prototype.myIncludes = function <T>(
  this: T[],
  searchElement: T,
  fromIndex = 0,
): boolean {
  const length = this.length;
  if (length === 0) {
    return false;
  }

  const startIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;

  for (let index = startIndex; index < length; index += 1) {
    const current = this[index];

    const isSameValueZero =
      current === searchElement ||
      (current !== current && searchElement !== searchElement);

    if (isSameValueZero) {
      return true;
    }
  }

  return false;
};
```

## Time Complexity

O(n) worst case — the element is at the very end or absent entirely, so
the scan runs from `startIndex` to `length - 1`.

## Space Complexity

O(1) — only scalar locals (`length`, `startIndex`, `index`, `current`),
independent of array size.

## Common Mistakes

- Using plain `current === searchElement` alone — this is functionally
  `indexOf`'s equality check and will incorrectly report `false` for
  `[NaN].includes(NaN)`, defeating the entire reason this method exists
  separately from `indexOf`.
- Reaching for `Object.is(current, searchElement)` instead of building
  SameValueZero manually — `Object.is` also distinguishes `+0` from
  `-0` (`Object.is(0, -0)` is `false`), which is *not* how `includes`
  behaves (`[-0].includes(0)` is `true`).
- Skipping holes the way `indexOf`/`filter`/`map` do — `includes` must
  treat a hole as `undefined`, so `[1, , 3].includes(undefined)` should
  be `true`, not `false`.
- Mishandling very negative `fromIndex` by not clamping to `0` — an
  unclamped negative start index would make the loop's condition
  `index < length` true even for indices before `0`, depending on how
  the loop is written, or otherwise search extra/wrong positions.

## Interview Follow-up Questions

1. Walk through all three JS equality algorithms — `===`, `Object.is`,
   and SameValueZero — and give one example value pair where each pair
   of algorithms disagrees.
2. Why does `includes` use SameValueZero while `indexOf` uses strict
   equality — do you know (or can you guess) why they were specified
   differently, given `indexOf` (ES5) predates `includes` (ES2016)?
3. Why does `includes` treat holes as `undefined` while `indexOf` skips
   them entirely — what does that suggest about how each method's
   internal algorithm is specified?
4. How would you make repeated `includes` calls against the same large,
   unchanging array faster — what data structure trade-off would you
   make (e.g. building a `Set` once)?
5. How would `myIncludes` need to change to support deep/structural
   equality (e.g. treating two different object references with the
   same shape as "included") instead of SameValueZero?

## Similar Questions

- [Implement a Custom Array.prototype.indexOf Polyfill](implement-custom-array-prototype-indexof-polyfill.md)
- [Implement a Custom Array.prototype.lastIndexOf Polyfill](implement-custom-array-prototype-lastindexof-search.md)
- [Implement a Custom Array.prototype.some Polyfill](implement-custom-array-prototype-some-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
