# QJSC013 · Implement String Trim Polyfill using Regex and Loop

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual whitespace detection, two-pointer boundary scanning, regex alternative

## Problem Statement

Implement `myTrim(str)`, a polyfill for `String.prototype.trim`. It
should return a new string with all whitespace characters removed from
both the beginning and the end of `str`, leaving any whitespace *inside*
the string untouched. The primary implementation here uses a manual,
character-by-character loop (no regex) so the whitespace-detection logic
itself is visible and testable — a one-line regex alternative is
discussed afterward as a valid, faster-to-write alternative. You may not
call the real `.trim()` internally.

## Input

`str`: the string to trim.

## Output

A new string with leading and trailing whitespace removed.

## Constraints

- "Whitespace" includes at least spaces, tabs (`\t`), and newlines
  (`\n`); a fully spec-correct implementation would also cover other
  Unicode whitespace and line-terminator characters, which is called out
  as a follow-up rather than silently ignored.
- Whitespace *inside* the string (between non-whitespace characters)
  must be preserved exactly, not collapsed or removed.
- A string that is entirely whitespace (or empty) trims to `""`.
- `str` itself is never mutated (strings are immutable in JS; the
  function always returns a new string).

## Examples

| Input | Output | Why |
|---|---|---|
| `myTrim("  hello  ")` | `"hello"` | Leading and trailing spaces removed; internal characters untouched |
| `myTrim("hello world")` | `"hello world"` | No leading/trailing whitespace to remove; the internal space between words is preserved |
| `myTrim("\n\t  hi  \t\n")` | `"hi"` | Mixed whitespace types (newline, tab, space) at both ends are all recognized and removed |

## Edge Cases

- `str = ""` → `""` (nothing to trim).
- `str` entirely whitespace (e.g. `"   \t\n  "`) → `""` (every character
  gets trimmed away, leaving nothing).
- `str` with no leading/trailing whitespace at all → returned unchanged
  (still a new string value, not the same reference, though this
  distinction rarely matters for primitives).
- Whitespace only on one side (e.g. `"  hi"` or `"hi  "`) → only that
  side is trimmed.
- Whitespace *inside* the string surrounded by non-whitespace on both
  sides (e.g. `"a   b"`) → fully preserved, since trim only touches the
  two ends.

## Hints

1. Trimming is really two independent boundary searches: find the index
   of the first non-whitespace character from the left, and the index of
   the last non-whitespace character from the right — then the answer is
   the substring between those two indices (inclusive).
2. Write a small helper that answers "is this one character whitespace?"
   by comparing it against a known set of whitespace characters (space,
   tab, newline, carriage return) — that helper is the "manual loop"
   version of what a regex character class like `\s` does in one symbol.
3. Walk two separate pointers: one starting at index `0` moving forward
   while the current character is whitespace, and one starting at
   `str.length - 1` moving backward while the current character is
   whitespace — once both stop, they bound the substring to keep.

## Algorithm

**Pattern:** two-pointer boundary scanning with a manual whitespace
predicate.
**Core insight:** trimming doesn't require touching every character in
the string — only the two ends need to be located. A `left` pointer
advances from the start while it's sitting on whitespace; a `right`
pointer retreats from the end while it's sitting on whitespace. Once
both pointers land on non-whitespace characters (or cross each other,
for an all-whitespace string), the substring from `left` to `right`
(inclusive) is exactly the trimmed result — no characters strictly
between the original ends are ever inspected or altered.
**Invariant:** every character before `left` (in the current scan state)
and every character after `right` is whitespace and has been correctly
excluded; every character from `left` to `right` inclusive is preserved
exactly as-is.

## Dry Run

**Input:** `myTrim("  hi  ")` (length 6: indices `0..5` are
`' ',' ','h','i',' ',' '`)

| Step | Pointer | Position | Character | Whitespace? | Action |
|---|---|---|---|---|---|
| 1 | `left` | 0 | `' '` | Yes | advance `left` to 1 |
| 2 | `left` | 1 | `' '` | Yes | advance `left` to 2 |
| 3 | `left` | 2 | `'h'` | No | stop advancing `left` |
| 4 | `right` | 5 | `' '` | Yes | retreat `right` to 4 |
| 5 | `right` | 4 | `' '` | Yes | retreat `right` to 3 |
| 6 | `right` | 3 | `'i'` | No | stop retreating `right` |

`left = 2`, `right = 3`. **Result:** characters from index 2 to 3
inclusive → `"hi"` — matches the expected output.

## JavaScript Solution

```js
// Manual whitespace check — the "loop" equivalent of a regex \s class.
function isWhitespaceChar(char) {
  return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}

function myTrim(str) {
  let left = 0;
  let right = str.length - 1;

  // Advance left past leading whitespace.
  while (left <= right && isWhitespaceChar(str[left])) {
    left += 1;
  }

  // Retreat right past trailing whitespace.
  while (right >= left && isWhitespaceChar(str[right])) {
    right -= 1;
  }

  // If left > right, every character was whitespace — nothing survives.
  if (left > right) {
    return '';
  }

  // Manual character-by-character copy of the surviving window.
  let result = '';
  for (let i = left; i <= right; i += 1) {
    result += str[i];
  }

  return result;
}
```

## TypeScript Solution

```ts
function isWhitespaceChar(char: string): boolean {
  return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}

function myTrim(str: string): string {
  let left = 0;
  let right: number = str.length - 1;

  while (left <= right && isWhitespaceChar(str[left])) {
    left += 1;
  }

  while (right >= left && isWhitespaceChar(str[right])) {
    right -= 1;
  }

  if (left > right) {
    return '';
  }

  let result = '';
  for (let i = left; i <= right; i += 1) {
    result += str[i];
  }

  return result;
}
```

## Time Complexity

O(n), where n is `str.length` — each boundary pointer visits only the
whitespace characters it skips over (at most n total between both
pointers), and the final copy loop visits each surviving character
exactly once; overall work is linear, never revisiting a character.

## Space Complexity

O(n) — the result string's length is at most `str.length` (the trimmed
substring never exceeds the original).

## Common Mistakes

- Using `str.trim()` or `str.trimStart()`/`str.trimEnd()` internally —
  calls the exact methods being polyfilled.
- Forgetting the `left <= right` guard on the boundary-scanning loops —
  without it, an all-whitespace string causes `left` to walk past
  `right` and then keep reading out-of-bounds indices (`undefined` in
  JS, which `isWhitespaceChar` would need to handle defensively, or the
  loop simply runs forever comparing `undefined` incorrectly).
- Defining `isWhitespaceChar` too narrowly (e.g. only checking `' '`)
  and missing tabs/newlines — this silently leaves tab- or
  newline-padded strings untrimmed, which is easy to miss without a test
  case like `"\n\thi\t\n"`.
- Reaching for the regex one-liner (`str.replace(/^\s+|\s+$/g, '')`)
  when an interviewer has specifically asked for the *manual* version —
  it's a perfectly valid production-quality answer, but it doesn't
  demonstrate the boundary-scanning logic the "using regex and loop"
  framing of this question is testing; see Optimization below for where
  it *does* belong in the discussion.

## Interview Follow-up Questions

1. The regex alternative — `str.replace(/^\s+|\s+$/g, '')` — is shorter
   and arguably just as readable; when would you actually prefer the
   manual loop version in real production code, if ever (hint: think
   about what a regex engine has to do versus a simple scan, and about
   codebases with restrictions on regex use for security/ReDoS
   reasons)?
2. What Unicode whitespace characters does your `isWhitespaceChar`
   helper miss compared to the real spec's `\s` definition (e.g.
   non-breaking space ` `, various Unicode space separators)?
3. How would you implement `trimStart`/`trimEnd` individually by reusing
   most of this logic?
4. Could you implement this with a single pointer instead of two,
   trimming in two separate passes — what would the tradeoffs be versus
   the two-pointer approach shown here?

## Similar Questions

- [Implement String.prototype.padStart Polyfill](implement-custom-string-prototype-padstart-polyfill.md)
- [Implement String.prototype.padEnd Polyfill](implement-custom-string-prototype-padend-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
