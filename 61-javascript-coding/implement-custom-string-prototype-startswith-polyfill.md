# QJSC048 · Implement Custom String prototype startsWith Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual character-by-character comparison, optional `position` offset, `TypeError` on RegExp

## Problem Statement

Implement `myStartsWith(str, searchString, position)`, a polyfill for
`String.prototype.startsWith`. It should return `true` if `str` begins
with `searchString`, starting the check from index `position` instead of
index `0` when `position` is given. Matching the real spec's behavior,
it must throw a `TypeError` immediately if `searchString` is a `RegExp`.
You may not call the real `.startsWith()` internally.

## Input

- `str`: the string being checked
- `searchString`: the string to look for at the start
- `position` (optional): a number; begin the check at this index instead
  of `0`. Defaults to `0` when omitted.

## Output

A boolean: `true` if the characters of `str` starting at `position`
match `searchString`, `false` otherwise. Throws `TypeError` if
`searchString` is a `RegExp`.

## Constraints

- `position` is clamped into `[0, str.length]` (negative → `0`, greater
  than `str.length` → `str.length`).
- Comparison is case-sensitive and exact.
- An empty `searchString` always returns `true` for any valid
  `position` (nothing to fail to match).
- Must throw synchronously when `searchString` is a `RegExp` instance,
  before any comparison happens.

## Examples

| Input | Output | Why |
|---|---|---|
| `myStartsWith("Hello world", "Hello")` | `true` | The string genuinely begins with `"Hello"` at index 0 |
| `myStartsWith("Hello world", "world", 6)` | `true` | With `position = 6`, the check effectively starts at `"world"` (index 6 onward), which does begin with `"world"` |
| `myStartsWith("Hello world", "Hello", 1)` | `false` | Starting the check from index 1 means comparing against `"ello world"`, which does not begin with `"Hello"` |

## Edge Cases

- `searchString = ""` → `true` for any `str`/`position`.
- `position` beyond `str.length` → the check window is empty; only
  `searchString = ""` can still return `true`.
- `position` negative → clamped to `0`, same as omitting it.
- `searchString` longer than the remaining characters after `position`
  → `false`, it can't possibly fit.
- `searchString` a `RegExp` → `TypeError`, never a boolean, regardless
  of `position`.

## Hints

1. Guard against a `RegExp` `searchString` first, before touching
   `position` at all — `searchString instanceof RegExp` should throw
   immediately.
2. Normalize `position` by clamping it into `[0, str.length]`, then the
   question reduces to: "starting at index `position`, does every
   character of `searchString` match the corresponding character of
   `str`?"
3. Compare character-by-character in a loop (`str[position + i] ===
   searchString[i]`), stopping and returning `false` at the first
   mismatch — don't reach for `.indexOf(searchString) === position`,
   which technically works but hides the exact per-character logic this
   question is testing.

## Algorithm

**Pattern:** upfront type guard, then a fixed-window manual character
comparison starting from a normalized offset.
**Core insight:** `startsWith` with a `position` argument is exactly
"does `searchString` match `str` starting right at index `position`" —
no searching is needed, unlike `includes`, because the starting point is
already known. This makes the check a single pass: walk `searchString`
index by index and compare `str[position + i]` against
`searchString[i]`, failing fast on the first mismatch.
**Invariant:** at any point in the comparison loop, every character
compared so far has matched — so returning `false` the instant one
doesn't is always safe and never skips a character that should have been
checked.

## Dry Run

**Input:** `myStartsWith("Hello world", "world", 6)`

| Step | Value | Notes |
|---|---|---|
| 1 | `searchString` is a plain string, not `RegExp` — no throw | |
| 2 | `position = clamp(6, 0, 11) = 6` | valid, no adjustment needed |
| 3 | `i = 0`: `str[6] = 'w'` vs `searchString[0] = 'w'` → match | |
| 4 | `i = 1`: `str[7] = 'o'` vs `searchString[1] = 'o'` → match | |
| 5 | `i = 2`: `str[8] = 'r'` vs `searchString[2] = 'r'` → match | |
| 6 | `i = 3`: `str[9] = 'l'` vs `searchString[3] = 'l'` → match | |
| 7 | `i = 4`: `str[10] = 'd'` vs `searchString[4] = 'd'` → match | |
| 8 | Loop exhausted, no mismatch | |

**Result:** `true` — `"Hello world"` starting at index 6 is exactly
`"world"`.

## JavaScript Solution

```js
function myStartsWith(str, searchString, position) {
  // startsWith() throws on a RegExp — it is not a pattern-search method.
  if (searchString instanceof RegExp) {
    throw new TypeError(
      'First argument to String.prototype.startsWith must not be a regular expression',
    );
  }

  const length = str.length;

  let start = position === undefined ? 0 : position;
  if (Number.isNaN(start) || start < 0) {
    start = 0;
  } else if (start > length) {
    start = length;
  }

  const searchLength = searchString.length;

  // Manual character-by-character comparison from `start`.
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
function myStartsWith(
  str: string,
  searchString: string,
  position?: number,
): boolean {
  if (searchString instanceof RegExp) {
    throw new TypeError(
      'First argument to String.prototype.startsWith must not be a regular expression',
    );
  }

  const length: number = str.length;

  let start: number = position === undefined ? 0 : position;
  if (Number.isNaN(start) || start < 0) {
    start = 0;
  } else if (start > length) {
    start = length;
  }

  const searchLength: number = searchString.length;

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
most once per character of `searchString`, independent of `str`'s total
length.

## Space Complexity

O(1) — only a fixed number of scalar variables; no substring is
materialized.

## Common Mistakes

- Forgetting to clamp `position` before using it — a negative or
  out-of-range `position` used directly in `str[position + i]` produces
  incorrect (or `undefined`-comparison) results instead of the spec's
  clamped behavior.
- Not checking for `RegExp` at all, or checking it only after starting
  the comparison loop — the type check must happen first, unconditionally.
- Reading past the end of `str` without it mattering functionally (`
  str[outOfRangeIndex]` is `undefined` in JS, which never equals a real
  character) but not being able to explain *why* that's safe if asked —
  interviewers will probe whether this was a deliberate choice or an
  accident.
- Confusing `startsWith`'s `position` argument with `slice`'s
  index-truncation semantics — `position` only changes *where the check
  begins*, it does not truncate or view a shorter version of `str` the
  way `endsWith`'s `endPosition` does.

## Interview Follow-up Questions

1. How would you adapt this exact logic to implement `endsWith` — what
   changes, and why is `endsWith`'s `endPosition` conceptually different
   from `startsWith`'s `position`?
2. Why does the spec throw `TypeError` for a `RegExp` searchString
   instead of just calling `.toString()` on it and comparing literally?
3. How would you make this case-insensitive without allocating a
   lowercased copy of the whole string up front?
4. Where have you used `startsWith` in real frontend code (hint: route
   matching, URL prefix checks, feature-flag key namespacing)?

## Similar Questions

- [Implement String.prototype.endsWith Polyfill](implement-custom-string-prototype-endswith-polyfill.md)
- [Implement String.prototype.includes Polyfill](implement-custom-string-prototype-includes-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
