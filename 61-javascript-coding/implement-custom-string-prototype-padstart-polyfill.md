# QJSC026 · Implement Custom String prototype padStart Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** target-length padding, multi-character pad-string repetition and truncation, no-op short-circuiting

## Problem Statement

Implement `myPadStart(str, targetLength, padString)`, a polyfill for
`String.prototype.padStart`. It should prepend copies of `padString` to
the beginning of `str` until the result reaches `targetLength`
characters. If `str` is already at least `targetLength` characters long,
it's returned unchanged. `padString` defaults to a single space when
omitted, and may itself be more than one character — in that case it
must be repeated and then truncated so the final result is *exactly*
`targetLength` characters, never longer. You may not call the real
`.padStart()` internally.

## Input

- `str`: the string to pad
- `targetLength`: the desired minimum final length
- `padString` (optional): the string to pad with, repeated as needed.
  Defaults to `" "`.

## Output

A new string, at least `str.length` characters and exactly
`Math.max(str.length, targetLength)` characters long, with the padding
at the *front*.

## Constraints

- If `targetLength <= str.length`, return `str` unchanged.
- `padString` may be multiple characters; the padding must be built by
  repeating it and then cut to fit exactly, never overshooting
  `targetLength`.
- An empty `padString` means no padding can be added — `str` is returned
  unchanged regardless of `targetLength`.
- `padString` defaults to `" "` (a single space) when omitted.
- When truncating an over-long padding buffer, the truncation must keep
  the buffer's *own* first characters (so the pad pattern reads
  correctly right up against `str`), not its last characters.

## Examples

| Input | Output | Why |
|---|---|---|
| `myPadStart("5", 3, "0")` | `"005"` | 2 characters of padding needed; `"0"` repeated twice fits exactly, placed before `str` |
| `myPadStart("abc", 7, "12")` | `"1212abc"` | 4 characters of padding needed; `"12"` repeated twice (`"1212"`) is exactly 4 characters, placed before `str` |
| `myPadStart("abc", 6, "12")` | `"121abc"` | 3 characters of padding needed; `"12"` repeated gives `"1212"` (4 chars), truncated to its first 3 characters (`"121"`) — note the *front* of the pad buffer is kept, so the padding still starts cleanly with `"1"` |

## Edge Cases

- `targetLength <= str.length` → `str` returned unchanged.
- `padString = ""` → no padding possible; `str` returned unchanged.
- `padString` omitted → defaults to `" "`.
- `padString` longer than the needed padding amount → truncated down to
  fit, keeping its own leading characters.
- `str = ""` → the entire result is built from padding, up to
  `targetLength`.
- Common real-world use: zero-padding numbers for display (e.g.
  `myPadStart(String(5), 2, "0")` → `"05"`).

## Hints

1. Compute `needed = targetLength - str.length` first. If `needed <= 0`,
   return `str` unchanged immediately — there's nothing more to do.
2. Grow a padding buffer by repeatedly appending `padString` to itself
   until its length is `>= needed`, exactly like `padEnd` — the growth
   step is identical between the two methods.
3. The only real difference from `padEnd` is *where* the truncated
   padding buffer ends up: `padEnd` appends it after `str`; `padStart`
   prepends it before `str`. Keep the padding buffer's own *first*
   `needed` characters when truncating in both cases — for `padStart`
   this keeps the pattern's start aligned against the left edge of the
   final result.

## Algorithm

**Pattern:** compute needed length, grow a padding buffer by repetition,
truncate to fit, then prepend.
**Core insight:** structurally identical to `padEnd` — the only
difference is which side of `str` the finished padding buffer attaches
to. Growing the buffer by repeated concatenation until it's long enough,
then slicing its first `needed` characters, produces a buffer that's
exactly the right length regardless of whether `padString`'s length
evenly divides `needed`.
**Invariant:** at the end of the growth loop, the buffer's length is
always `>= needed`, so truncating to `needed` characters is always safe;
prepending that exact-length buffer to `str` guarantees the final result
is exactly `Math.max(str.length, targetLength)` characters.

## Dry Run

**Input:** `myPadStart("abc", 6, "12")`

| Step | Value | Notes |
|---|---|---|
| 1 | `needed = 6 - 3 = 3` | 3 characters of padding required |
| 2 | `needed > 0`, padding required | |
| 3 | `padBuffer = ""` | start empty |
| 4 | Append `"12"` → `padBuffer = "12"` (length 2, `< 3`) | keep growing |
| 5 | Append `"12"` again → `padBuffer = "1212"` (length 4, `>= 3`) | stop growing |
| 6 | Truncate to first 3 chars → `padBuffer = "121"` | keep the buffer's *leading* characters |
| 7 | Result = `padBuffer + str = "121" + "abc" = "121abc"` | padding goes *before* `str` |

**Result:** `"121abc"`, exactly 6 characters — matches the expected
output.

## JavaScript Solution

```js
function myPadStart(str, targetLength, padString) {
  const pad = padString === undefined ? ' ' : padString;
  const needed = targetLength - str.length;

  if (needed <= 0 || pad.length === 0) {
    return str;
  }

  // Grow a buffer by repeating `pad` until it's at least `needed` long.
  let padBuffer = '';
  while (padBuffer.length < needed) {
    padBuffer += pad;
  }

  // Keep the buffer's own leading `needed` characters, then prepend.
  const exactPadding = padBuffer.slice(0, needed);

  return exactPadding + str;
}
```

## TypeScript Solution

```ts
function myPadStart(
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

  return exactPadding + str;
}
```

## Time Complexity

O(targetLength) — the padding buffer grows by `pad.length` characters
per iteration until it reaches at least `needed` characters; total work
is linear in the amount of padding added.

## Space Complexity

O(targetLength) — the result string (and the intermediate padding
buffer) is proportional to `targetLength` in the worst case.

## Common Mistakes

- Truncating the over-long padding buffer from its *end* instead of its
  *start* (e.g. `padBuffer.slice(-needed)` instead of
  `padBuffer.slice(0, needed)`) — for a non-evenly-dividing `padString`
  this produces a different (and wrong, relative to spec) sequence of
  characters, since the visual pattern should read naturally from where
  it meets `str`'s left edge.
- Reusing the `padEnd` function and just swapping concatenation order
  without re-checking the truncation direction — the growth logic is
  identical, but this is exactly the kind of copy-paste bug this
  distinction is designed to catch.
- Not handling `padString = ""`, causing an infinite loop in the growth
  step (buffer length never increases).
- Forgetting the `needed <= 0` short-circuit and instead letting
  `str.length >= targetLength` fall through into padding logic that
  happens to produce zero-length padding anyway — works, but is fragile
  and does unnecessary work compared to an explicit early return.

## Interview Follow-up Questions

1. Real-world usage: how would you use `padStart` to format a number as
   a 2-digit clock display value (e.g. `5` → `"05"`)?
2. How would credit-card-style masking (`"************1234"`) be
   implemented using `padStart` with a longer `padString`?
3. What happens with a `padString` containing multi-byte Unicode
   characters (like emoji) if the truncation cuts through the middle of
   a surrogate pair — how would you detect and avoid that?
4. Why might a codebase choose `padStart` over manually building the
   padded string with a loop and template literals — what does the
   built-in guarantee that hand-rolled code might get subtly wrong?

## Similar Questions

- [Implement String.prototype.padEnd Polyfill](implement-custom-string-prototype-padend-polyfill.md)
- [Implement String.prototype.repeat Polyfill](implement-custom-string-prototype-repeat-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
