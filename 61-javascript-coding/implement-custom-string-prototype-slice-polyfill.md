# QJSC020 · Implement Custom String prototype slice Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** negative index normalization, manual substring extraction, string immutability

## Problem Statement

Implement `mySlice(str, start, end)`, a polyfill for
`String.prototype.slice`. It should return a new string containing the
characters of `str` from index `start` up to (but not including) index
`end`. Both `start` and `end` may be negative, meaning "counted from the
end of the string" (`-1` is the last character). You may not call the
real `.slice()` internally.

## Input

- `str`: the source string
- `start`: index to begin extraction (inclusive); may be negative
- `end` (optional): index to stop before (exclusive); may be negative.
  Defaults to `str.length` when omitted.

## Output

A new string containing the extracted characters. `str` itself is never
modified.

## Constraints

- Negative `start`/`end` are interpreted as `str.length + index`, then
  clamped to `[0, str.length]`.
- If, after normalization, `start >= end`, the result is `""` (not an
  error).
- `str` is never mutated — strings are primitives in JS and immutable by
  language design, so this is guaranteed structurally, but a correct
  implementation should still be explained in those terms rather than
  assumed.
- `end` omitted defaults to `str.length` (extract through the end of the
  string).

## Examples

| Input | Output | Why |
|---|---|---|
| `mySlice("hello world", 6)` | `"world"` | `end` omitted, so extraction runs from index 6 through the end |
| `mySlice("hello world", -5)` | `"world"` | Negative `start` counts from the end: `-5` normalizes to `11 - 5 = 6`, same result as the previous example |
| `mySlice("hello world", 0, -6)` | `"hello"` | Negative `end` normalizes to `11 - 6 = 5`; extracts indices `0` through `4` |

## Edge Cases

- `start > end` after normalization (e.g. `mySlice("abc", 2, 1)`) →
  `""`, not an error and not a reversed extraction.
- `start`/`end` far more negative than `-str.length` (e.g.
  `mySlice("abc", -100)`) → clamps to `0` after normalization, not an
  error.
- `start`/`end` beyond `str.length` (e.g. `mySlice("abc", 0, 100)`) →
  clamps to `str.length`.
- `start === end` (after normalization) → `""` (an empty but valid
  range, zero characters wide).
- Omitting both `start` and `end`-defaults behavior → effectively a full
  copy of `str` (though this question's signature requires `start`, the
  underlying logic should degrade gracefully to this case if `start =
  0`).

## Hints

1. Handle negative indices first, independently for `start` and `end`:
   if an index is negative, add `str.length` to it — then clamp the
   result into `[0, str.length]` so an index that's still negative after
   adding length (i.e. more negative than `-str.length`) becomes `0`.
2. After normalizing both indices, if `start >= end`, you already know
   the answer is `""` — no need to enter any extraction loop at all.
3. Extract by walking a loop from the normalized `start` up to (but not
   including) the normalized `end`, appending each character — this is
   the manual equivalent of what `.slice()` does internally, and avoids
   leaning on `.substring()` or `.slice()` itself.

## Algorithm

**Pattern:** normalize negative/out-of-range indices into a valid `[0,
str.length]` window, then manually copy the characters in that window.
**Core insight:** negative indices in `slice` are just syntactic sugar
for "counted from the end" — converting `start`/`end` to their
non-negative equivalents up front (`str.length + index` when negative,
then clamped) reduces the whole problem to a simple, always-valid
forward range `[normalizedStart, normalizedEnd)`, after which extraction
is a trivial linear copy.
**Invariant:** once normalization completes, `0 <= normalizedStart <=
str.length` and `0 <= normalizedEnd <= str.length` always hold — so the
extraction loop never needs its own bounds-checking, only the `start >=
end` empty-range check.

## Dry Run

**Input:** `mySlice("hello world", 0, -6)` (`str.length = 11`)

| Step | Value | Notes |
|---|---|---|
| 1 | `start = 0` | already non-negative, no adjustment |
| 2 | `end = -6` → `11 + (-6) = 5` | negative, so normalized by adding length |
| 3 | Clamp both into `[0, 11]` → `start = 0`, `end = 5` | already in range |
| 4 | `start (0) < end (5)`, so extraction proceeds | |
| 5 | Copy `str[0]` through `str[4]`: `'h','e','l','l','o'` | |

**Result:** `"hello"` — matches the expected output.

## JavaScript Solution

```js
function mySlice(str, start, end) {
  const length = str.length;

  const normalize = (index, fallback) => {
    let value = index === undefined ? fallback : index;

    if (value < 0) {
      value = length + value; // e.g. -5 on length 11 becomes 6
    }

    // Clamp into a valid [0, length] window.
    if (value < 0) {
      value = 0;
    } else if (value > length) {
      value = length;
    }

    return value;
  };

  const normalizedStart = normalize(start, 0);
  const normalizedEnd = normalize(end, length);

  if (normalizedStart >= normalizedEnd) {
    return ''; // empty (or inverted) range — nothing to extract
  }

  // Manual character-by-character copy — no .slice()/.substring() call.
  // str itself is never touched; a brand-new string is built here,
  // which is worth noting even though strings are immutable anyway.
  let result = '';
  for (let i = normalizedStart; i < normalizedEnd; i += 1) {
    result += str[i];
  }

  return result;
}
```

## TypeScript Solution

```ts
function mySlice(str: string, start: number, end?: number): string {
  const length: number = str.length;

  const normalize = (index: number | undefined, fallback: number): number => {
    let value: number = index === undefined ? fallback : index;

    if (value < 0) {
      value = length + value;
    }

    if (value < 0) {
      value = 0;
    } else if (value > length) {
      value = length;
    }

    return value;
  };

  const normalizedStart: number = normalize(start, 0);
  const normalizedEnd: number = normalize(end, length);

  if (normalizedStart >= normalizedEnd) {
    return '';
  }

  let result = '';
  for (let i = normalizedStart; i < normalizedEnd; i += 1) {
    result += str[i];
  }

  return result;
}
```

## Time Complexity

O(k), where k is the length of the extracted substring
(`normalizedEnd - normalizedStart`) — normalization is O(1), and the
copy loop visits each extracted character exactly once.

## Space Complexity

O(k) — the result string's length is exactly the number of characters
extracted.

## Common Mistakes

- Normalizing negative indices without clamping afterward — an index
  like `-100` on an 11-character string becomes `11 + (-100) = -89`,
  which is still negative and must then be clamped to `0`, not left
  negative (which would break the extraction loop's bounds).
- Not handling `start >= end` explicitly and instead letting the
  extraction loop's condition (`i < normalizedEnd`) naturally produce
  `""` — this actually works correctly *if* the loop is written right,
  but candidates often instead try to "reverse" the range when `start >
  end`, which is wrong: `slice` never reverses, unlike some other
  language's slice semantics.
- Confusing `slice`'s negative-index support with `substring`'s
  behavior — `substring` treats negative arguments as `0` and swaps
  `start`/`end` if `start > end`, which is a genuinely different
  (and commonly confused) contract worth contrasting in an interview.
- Mutating a working copy of `str` (e.g. via array conversion and
  in-place edits) and returning that — strings are immutable in JS, so
  this isn't possible to get wrong technically, but conceptually
  candidates should still be able to articulate *why* slice always
  returns a new string rather than a view into the old one.

## Interview Follow-up Questions

1. What's the difference between `slice`, `substring`, and `substr`
   (deprecated) — specifically around negative index handling?
2. How would this change if you were slicing an `Array` instead of a
   `string` — what has to change, and what stays identical (hint: very
   little changes structurally, since arrays support index access and
   length the same way)?
3. How do JS engines actually represent substrings internally — do they
   always copy, or can they sometimes share the original string's
   backing memory (rope/slice representations)?
4. How would you handle Unicode surrogate pairs so a slice boundary
   never lands in the middle of a multi-code-unit character?

## Similar Questions

- [Implement Array.prototype.slice Polyfill](implement-custom-array-prototype-slice-polyfill.md)
- [Implement String.prototype.split Polyfill](implement-custom-string-prototype-split-polyfill.md)
- [Implement String.prototype.includes Polyfill](implement-custom-string-prototype-includes-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
