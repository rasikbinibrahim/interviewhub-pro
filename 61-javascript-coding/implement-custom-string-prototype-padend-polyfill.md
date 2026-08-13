# QJSC027 · Implement Custom String prototype padEnd Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** target-length padding, multi-character pad-string repetition and truncation, no-op short-circuiting

## Problem Statement

Implement `myPadEnd(str, targetLength, padString)`, a polyfill for
`String.prototype.padEnd`. It should append copies of `padString` to the
end of `str` until the result reaches `targetLength` characters. If
`str` is already at least `targetLength` characters long, it's returned
unchanged. `padString` defaults to a single space when omitted, and may
itself be more than one character — in that case it must be repeated and
then truncated so the final result is *exactly* `targetLength`
characters, never longer. You may not call the real `.padEnd()`
internally.

## Input

- `str`: the string to pad
- `targetLength`: the desired minimum final length
- `padString` (optional): the string to pad with, repeated as needed.
  Defaults to `" "`.

## Output

A new string, at least `str.length` characters and exactly
`Math.max(str.length, targetLength)` characters long.

## Constraints

- If `targetLength <= str.length`, return `str` unchanged (no
  truncation of the original string ever happens — padding never
  shortens).
- `padString` may be multiple characters; the padding must be built by
  repeating it and then cut to fit exactly, never overshooting
  `targetLength`.
- An empty `padString` means no padding can be added — `str` is returned
  unchanged regardless of `targetLength`.
- `padString` defaults to `" "` (a single space) when omitted.

## Examples

| Input | Output | Why |
|---|---|---|
| `myPadEnd("5", 3, "0")` | `"500"` | 2 characters of padding needed to reach length 3; `"0"` repeated twice fits exactly |
| `myPadEnd("abc", 7, "12")` | `"abc1212"` | 4 characters of padding needed; `"12"` repeated twice (`"1212"`) is exactly 4 characters — no truncation needed here, but the mechanism is repeat-then-fit |
| `myPadEnd("abc", 6, "12")` | `"abc121"` | 3 characters of padding needed; `"12"` repeated twice gives `"1212"` (4 chars), which must be truncated to the first 3 characters (`"121"`) to land exactly on length 6 |

## Edge Cases

- `targetLength <= str.length` → `str` returned unchanged; this includes
  `targetLength` being negative or `0`.
- `padString = ""` → no padding possible; `str` returned unchanged even
  if `targetLength > str.length` (there is nothing to repeat).
- `padString` omitted → defaults to `" "`, so padding is spaces.
- `padString` longer than the needed padding amount → truncate it down,
  don't repeat it at all (repeating once already overshoots, so it's cut
  to fit).
- `str = ""` → padding fills the entire result from scratch, up to
  `targetLength`.

## Hints

1. Start by computing how many characters actually need to be added:
   `targetLength - str.length`. If that's `<= 0`, you're done — return
   `str` as-is immediately.
2. Build up a padding string by repeatedly appending `padString` to
   itself in a loop until it's *at least* as long as the amount still
   needed — don't try to compute the exact repeat count with division
   up front; growing it and checking each time is simpler and just as
   correct.
3. Once the accumulated padding is long enough (or longer), cut it down
   to *exactly* the needed length before appending it to `str` — this is
   what makes multi-character `padString`s that don't divide evenly
   work correctly.

## Algorithm

**Pattern:** compute needed length, grow a padding buffer by repetition,
truncate to fit, then append.
**Core insight:** the padding never has to be *exactly* a whole number
of `padString` repetitions — it has to be exactly `targetLength -
str.length` characters, built from *as many* copies of `padString` as
needed and then cut off mid-repetition if it doesn't divide evenly. The
simplest correct approach is to keep doubling/appending `padString` to a
growing buffer until that buffer's length is `>=` the needed amount,
then slice the first `needed` characters off it.
**Invariant:** at the end of the padding-growth loop, the buffer's
length is always `>= needed` — so cutting it down to exactly `needed`
characters is always a valid (non-negative-length) truncation, never an
attempt to pad the padding itself.

## Dry Run

**Input:** `myPadEnd("abc", 6, "12")`

| Step | Value | Notes |
|---|---|---|
| 1 | `needed = targetLength - str.length = 6 - 3 = 3` | 3 characters of padding must be added |
| 2 | `needed > 0`, so padding is required (not a no-op) | |
| 3 | `padBuffer = ""` | start empty |
| 4 | Append `"12"` → `padBuffer = "12"` (length 2, still `< 3`) | keep growing |
| 5 | Append `"12"` again → `padBuffer = "1212"` (length 4, now `>= 3`) | stop growing |
| 6 | Truncate to first 3 chars → `padBuffer = "121"` | exact fit |
| 7 | Result = `str + padBuffer = "abc" + "121" = "abc121"` | |

**Result:** `"abc121"`, exactly 6 characters — matches the expected
output.

## JavaScript Solution

```js
function myPadEnd(str, targetLength, padString) {
  const pad = padString === undefined ? ' ' : padString;
  const needed = targetLength - str.length;

  // Already long enough (or padString is empty, or targetLength <= 0
  // effectively) — nothing to add.
  if (needed <= 0 || pad.length === 0) {
    return str;
  }

  // Grow a buffer by repeating `pad` until it's at least `needed` long.
  let padBuffer = '';
  while (padBuffer.length < needed) {
    padBuffer += pad;
  }

  // Cut the buffer down to exactly the needed length before appending.
  const exactPadding = padBuffer.slice(0, needed);

  return str + exactPadding;
}
```

## TypeScript Solution

```ts
function myPadEnd(
  str: string,
  targetLength: number,
  padString?: string,
): string {
  const pad: string = padString === undefined ? ' ' : padString;
  const needed: number = targetLength - str.length;

  if (needed <= 0 || pad.length === 0) {
    return str;
  }

  let padBuffer = '';
  while (padBuffer.length < needed) {
    padBuffer += pad;
  }

  const exactPadding: string = padBuffer.slice(0, needed);

  return str + exactPadding;
}
```

## Time Complexity

O(targetLength) — the padding buffer grows by `pad.length` characters
per iteration until it reaches at least `needed` characters, so the loop
runs O(needed / pad.length) times, and each concatenation copies up to
that many characters; overall work is linear in the amount of padding
added.

## Space Complexity

O(targetLength) — the result string (and the intermediate padding
buffer) is proportional to `targetLength` in the worst case.

## Common Mistakes

- Computing a repeat count with `Math.ceil(needed / pad.length)` and
  using `pad.repeat(count)` — functionally fine, but if a candidate
  implements `repeat` incorrectly (or the interviewer wants a from-
  scratch loop instead of leaning on another built-in), the
  grow-and-truncate loop is the more defensible manual approach here.
- Forgetting to truncate the padding buffer to *exactly* `needed`
  characters when `pad.length` doesn't evenly divide `needed` — this
  overshoots `targetLength`, which is a direct spec violation (`padEnd`
  guarantees the *exact* final length, never longer).
- Not handling `padString = ""` — an infinite loop results if the
  "append `pad` until long enough" loop runs with a zero-length `pad`,
  since `padBuffer.length` never increases.
- Not short-circuiting when `needed <= 0` — attempting to pad a string
  that's already long enough should return it completely unchanged, not
  run the (harmless but wasteful) padding logic anyway.

## Interview Follow-up Questions

1. How would you implement `padStart` by reusing most of this logic —
   what's the one meaningful difference?
2. How would you handle Unicode astral characters (surrogate pairs) in
   `padString` so a multi-byte character doesn't get truncated mid-pair
   when the padding is cut to fit?
3. Why does `padEnd` take the *needed* length rather than a repeat
   *count* as its main argument — what's more useful about that API
   shape for the caller (e.g. aligning columns of text)?
4. Where have you seen `padStart`/`padEnd` used in real frontend code
   (hint: formatting numbers, timestamps, or IDs with leading zeros)?

## Similar Questions

- [Implement String.prototype.padStart Polyfill](implement-custom-string-prototype-padstart-polyfill.md)
- [Implement String.prototype.repeat Polyfill](implement-custom-string-prototype-repeat-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
