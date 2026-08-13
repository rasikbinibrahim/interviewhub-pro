# QJSC049 · Implement Custom String prototype endsWith Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual character-by-character comparison, optional `endPosition` truncation, string immutability

## Problem Statement

Implement `myEndsWith(str, searchString, endPosition)`, a polyfill for
`String.prototype.endsWith`. It should return `true` if `str` ends with
`searchString`, and `false` otherwise. If the optional `endPosition`
argument is given, the check must behave as if `str` were truncated to
only its first `endPosition` characters before checking — `searchString`
is compared against the *end of that truncated view*, not the end of the
full string. You may not call the real `.endsWith()` internally.

## Input

- `str`: the string being checked (`this` value in the real method)
- `searchString`: the string to look for at the end
- `endPosition` (optional): a number; treat `str` as if it were only this
  long. Defaults to `str.length` when omitted.

## Output

A boolean: `true` if the (possibly truncated) string ends with
`searchString`, `false` otherwise.

## Constraints

- `0 <= endPosition <= str.length` when provided; values outside that
  range should be clamped the way the spec clamps them (negative/`NaN`
  treated as `0`, values greater than `str.length` treated as
  `str.length`).
- Comparison is case-sensitive and exact — no locale-aware folding.
- `searchString` longer than the truncated portion of `str` always
  yields `false` (there's nowhere left for it to fit).
- An empty `searchString` always yields `true`, matching the spec (an
  empty string "ends" every string).

## Examples

| Input | Output | Why |
|---|---|---|
| `myEndsWith("Hello world", "world")` | `true` | The full string genuinely ends with `"world"` |
| `myEndsWith("Hello world", "Hello", 5)` | `true` | With `endPosition = 5`, the check runs against `"Hello"` (the string truncated to 5 chars), which does end with `"Hello"` |
| `myEndsWith("Hello world", "world", 5)` | `false` | Truncated to `"Hello"`, which does not end with `"world"` |

## Edge Cases

- `searchString = ""` → `true` for any `str`/`endPosition` (nothing to
  match, vacuously satisfied).
- `searchString` longer than `str` (or the truncated view) → `false`
  immediately, since it can't possibly fit.
- `endPosition = 0` → the truncated view is `""`; only an empty
  `searchString` returns `true`.
- `endPosition` greater than `str.length` → clamp to `str.length` (same
  as omitting it).
- `str === searchString` exactly, with no `endPosition` → `true`.

## Hints

1. `endPosition` doesn't mean "only search within the last N
   characters" — it means "pretend the string is shorter." Figure out
   the *effective length* first, before you think about matching at
   all.
2. Once you know the effective length, endsWith reduces to: "does
   `searchString` appear starting at index `effectiveLength -
   searchString.length`?" — if that start index is negative, the answer
   is immediately `false`.
3. Compare character-by-character in a loop (`str[start + i] ===
   searchString[i]`) rather than reaching for `.includes()`,
   `.indexOf()`, or `.endsWith()` — those either hide the exact logic
   being tested or would be circular.

## Algorithm

**Pattern:** compute an effective end boundary, then do a fixed-window
manual character comparison.
**Core insight:** `endsWith` with an `endPosition` is really just
"regular endsWith, but on a virtual substring." Rather than materializing
that substring, it's enough to compute where it would end
(`effectiveLength = clamp(endPosition, 0, str.length)`) and where the
candidate match would have to start
(`start = effectiveLength - searchString.length`). If `start` is
negative, `searchString` can't fit before `effectiveLength`, so the
answer is `false` without any character comparison. Otherwise, walk
`searchString` index by index and compare `str[start + i]` against
`searchString[i]`; the first mismatch means `false`, and reaching the
end of `searchString` without a mismatch means `true`.
**Invariant:** at any point during the comparison loop, every character
checked so far has matched — so a `false` result can be returned the
instant a single character disagrees, without checking the rest.

## Dry Run

**Input:** `myEndsWith("Hello world", "Hello", 5)`

| Step | Value | Notes |
|---|---|---|
| 1 | `effectiveLength = clamp(5, 0, 11) = 5` | Treat the string as if it were only `"Hello"` |
| 2 | `start = effectiveLength - searchString.length = 5 - 5 = 0` | `searchString` would have to start at index 0 |
| 3 | `start >= 0`, so begin character comparison | |
| 4 | `i = 0`: `str[0] = 'H'` vs `searchString[0] = 'H'` → match | |
| 5 | `i = 1`: `str[1] = 'e'` vs `searchString[1] = 'e'` → match | |
| 6 | `i = 2`: `str[2] = 'l'` vs `searchString[2] = 'l'` → match | |
| 7 | `i = 3`: `str[3] = 'l'` vs `searchString[3] = 'l'` → match | |
| 8 | `i = 4`: `str[4] = 'o'` vs `searchString[4] = 'o'` → match | |
| 9 | Loop exhausted, no mismatch | |

**Result:** `true` — `"Hello world"`, truncated to its first 5
characters, is exactly `"Hello"`, which ends with `"Hello"`.

## JavaScript Solution

```js
function myEndsWith(str, searchString, endPosition) {
  const length = str.length;

  // Normalize/clamp endPosition into a valid effective length.
  let effectiveLength = endPosition === undefined ? length : endPosition;
  if (Number.isNaN(effectiveLength) || effectiveLength < 0) {
    effectiveLength = 0;
  } else if (effectiveLength > length) {
    effectiveLength = length;
  }

  const searchLength = searchString.length;
  const start = effectiveLength - searchLength;

  // searchString can't fit before effectiveLength at all.
  if (start < 0) {
    return false;
  }

  // Manual character-by-character comparison — no built-in search method.
  for (let i = 0; i < searchLength; i += 1) {
    if (str[start + i] !== searchString[i]) {
      return false;
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function myEndsWith(
  str: string,
  searchString: string,
  endPosition?: number,
): boolean {
  const length: number = str.length;

  let effectiveLength: number = endPosition === undefined ? length : endPosition;
  if (Number.isNaN(effectiveLength) || effectiveLength < 0) {
    effectiveLength = 0;
  } else if (effectiveLength > length) {
    effectiveLength = length;
  }

  const searchLength: number = searchString.length;
  const start: number = effectiveLength - searchLength;

  if (start < 0) {
    return false;
  }

  for (let i = 0; i < searchLength; i += 1) {
    if (str[start + i] !== searchString[i]) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

O(m), where m is `searchString.length` — the comparison loop runs at
most once per character of `searchString`, independent of `str`'s
length (computing `effectiveLength` and `start` is O(1)).

## Space Complexity

O(1) — only a fixed number of scalar variables; no substring is ever
materialized.

## Common Mistakes

- Treating `endPosition` as "only search the last N characters" instead
  of "pretend the string is only N characters long" — these give
  different answers whenever `searchString` doesn't reach all the way to
  `effectiveLength`.
- Using `str.slice(0, endPosition).endsWith(searchString)` — calls the
  real method being polyfilled, defeating the exercise.
- Forgetting to clamp `endPosition` (e.g. a negative value or a value
  greater than `str.length`) before using it in arithmetic, which can
  produce an incorrect `start` index instead of the spec's clamped
  behavior.
- Not short-circuiting when `start < 0` and instead letting the
  comparison loop read `str[negativeIndex]`, which is `undefined` in JS
  and happens to never equal any real character — masking the bug rather
  than surfacing it, since it still returns `false` but for the wrong
  reason (fragile if the loop logic changes later).

## Interview Follow-up Questions

1. How would you make this case-insensitive without allocating a
   lowercased copy of the entire string first?
2. The real `String.prototype.endsWith` throws a `TypeError` if
   `searchString` is a regular expression — why do you think the spec
   authors made that choice, and how would you add that check here?
3. How would you adapt this logic to implement `startsWith` — what
   changes, and what stays the same?
4. How would Unicode surrogate pairs (e.g. emoji) affect a
   character-by-character implementation like this one?

## Similar Questions

- [Implement String.prototype.startsWith Polyfill](implement-custom-string-prototype-startswith-polyfill.md)
- [Implement String.prototype.includes Polyfill](implement-custom-string-prototype-includes-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
