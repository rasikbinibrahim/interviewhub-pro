# QJS344 · Implement Custom String prototype replaceAll Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual delimiter scanning, replacing every occurrence (vs. `.replace()`'s single-match default), empty search-value edge case

## Problem Statement

Implement `myReplaceAll(str, searchValue, replaceValue)`, a polyfill for
`String.prototype.replaceAll`, **scoped to a string `searchValue`** (the
real method also accepts a `RegExp` with the global `g` flag — that
distinction is discussed below, not silently ignored). It should return
a new string with **every** non-overlapping occurrence of `searchValue`
replaced by `replaceValue` — unlike `String.prototype.replace()` with a
plain string pattern, which only replaces the *first* occurrence. You
may not call the real `.replaceAll()` internally.

## Input

- `str`: the source string
- `searchValue`: the literal substring to find and replace (may be `""`)
- `replaceValue`: the string to substitute in for each match

## Output

A new string with every occurrence of `searchValue` replaced by
`replaceValue`. `str` itself is never mutated.

## Constraints

- Replaces **all** non-overlapping occurrences, left to right — not just
  the first one (that's the key distinction from `.replace()` with a
  string pattern).
- Matches are found on the *original* string's content as scanning
  proceeds; a match is not re-scanned for further occurrences of
  `searchValue` that only appear because of a previous replacement
  (i.e. no cascading re-matches into freshly-inserted text).
- `searchValue = ""` is a defined edge case: native `replaceAll` inserts
  `replaceValue` between every character (and at both ends), rather than
  throwing or being a no-op.
- Only string `searchValue` is required; a `RegExp` `searchValue`
  without the global flag throws a `TypeError` natively (since
  `replaceAll` requires the `g` flag on any regex it's given) — full
  regex support is a documented follow-up, not silently ignored.

## Examples

| Input | Output | Why |
|---|---|---|
| `myReplaceAll("a-b-c-d", "-", "_")` | `"a_b_c_d"` | Every `"-"` is replaced, not just the first — contrast with `str.replace("-", "_")`, which would only fix the first one |
| `myReplaceAll("aaa", "a", "bb")` | `"bbbbbb"` | Three non-overlapping occurrences of `"a"`, each replaced by `"bb"` |
| `myReplaceAll("hello", "xyz", "!")` | `"hello"` | `searchValue` never occurs in `str`, so nothing changes — the function still returns a new string equal in content to the original |

## Edge Cases

- `searchValue` not found anywhere in `str` → `str`'s content returned
  unchanged (still a new string value).
- `searchValue = ""` → `replaceValue` is inserted between every pair of
  adjacent characters *and* at the very start and end (e.g.
  `myReplaceAll("ab", "", "-")` → `"-a-b-"`), matching native behavior —
  this is the trickiest edge case and worth testing explicitly.
- `searchValue === str` exactly → the entire string becomes
  `replaceValue` (one match spanning the whole input).
- Overlapping *potential* matches (e.g. `myReplaceAll("aaaa", "aa",
  "b")`) → matches are non-overlapping and found left to right, so
  `"aaaa"` becomes `"bb"` (two non-overlapping `"aa"` pairs), not three
  overlapping ones.
- `replaceValue = ""` → every occurrence of `searchValue` is effectively
  deleted from the result.

## Hints

1. This is structurally the same left-to-right scanning problem as
   `split` — repeatedly find the next occurrence of `searchValue`
   starting from wherever the last match ended, and build up a result
   string as you go.
2. Every time an occurrence is found, append everything *between* the
   last cut point and the match, then append `replaceValue` (instead of
   the matched text), then move the cut point to *just past* the match —
   this is what guarantees newly-inserted `replaceValue` text is never
   re-scanned for further matches.
3. Special-case `searchValue = ""` separately: since an empty search
   value would otherwise cause the "advance past the match" step to not
   advance at all (infinite loop), handle it by explicitly inserting
   `replaceValue` between every character (and at both ends) instead of
   running it through the general scanning loop.

## Algorithm

**Pattern:** manual left-to-right delimiter scanning (same core
mechanism as `split`), but building a replacement string instead of an
array of pieces.
**Core insight:** replacing "all" occurrences, rather than just the
first, is a matter of *not stopping* after the first match — keep
scanning from just past each match's end, appending the untouched text
before it plus `replaceValue` in place of it, until no more occurrences
are found, then append whatever text remains after the last match.
Because the scan always resumes *after* the just-inserted replacement
(not re-entering it), text introduced by `replaceValue` is never treated
as a candidate for further matching, even if it happens to contain
`searchValue` as a substring.
**Invariant:** at any point in the scan, everything in the result built
so far is exactly the correctly-replaced version of `str` up to the
current cut point — so once the scan reaches the end of `str`, the
result is the fully-replaced string.

## Dry Run

**Input:** `myReplaceAll("a-b-c", "-", "_")`

| Step | cutStart | Scan finds `-` at index | Appended | Result so far |
|---|---|---|---|---|
| 1 | 0 | index 1 | `str.slice(0,1) = "a"` then `"_"` | `"a_"` |
| 2 | 2 | index 3 | `str.slice(2,3) = "b"` then `"_"` | `"a_b_"` |
| 3 | 4 | no more `-` found | remaining `str.slice(4) = "c"` | `"a_b_c"` |

**Result:** `"a_b_c"` — matches the expected output; every `-` was
replaced, not just the first.

## JavaScript Solution

```js
function myReplaceAll(str, searchValue, replaceValue) {
  // Empty searchValue is a defined special case: insert replaceValue
  // between every character, and at both ends.
  if (searchValue === '') {
    let result = replaceValue;
    for (let i = 0; i < str.length; i += 1) {
      result += str[i] + replaceValue;
    }
    return result;
  }

  let result = '';
  let cutStart = 0;

  while (cutStart <= str.length) {
    const foundIndex = manualIndexOf(str, searchValue, cutStart);

    if (foundIndex === -1) {
      // No more matches — append whatever's left and stop.
      result += str.slice(cutStart);
      break;
    }

    // Untouched text before the match, then the replacement instead of
    // the matched text itself.
    result += str.slice(cutStart, foundIndex) + replaceValue;

    // Resume scanning strictly after the match, so replaceValue's own
    // text is never re-scanned for further occurrences.
    cutStart = foundIndex + searchValue.length;
  }

  return result;
}

// Manual substring search — deliberately not the built-in indexOf(),
// since scanning for each occurrence is what's being tested here.
function manualIndexOf(str, searchString, fromIndex) {
  const searchLength = searchString.length;

  for (let i = fromIndex; i <= str.length - searchLength; i += 1) {
    let matched = true;

    for (let j = 0; j < searchLength; j += 1) {
      if (str[i + j] !== searchString[j]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return i;
    }
  }

  return -1;
}
```

## TypeScript Solution

```ts
function manualIndexOf(str: string, searchString: string, fromIndex: number): number {
  const searchLength: number = searchString.length;

  for (let i = fromIndex; i <= str.length - searchLength; i += 1) {
    let matched = true;

    for (let j = 0; j < searchLength; j += 1) {
      if (str[i + j] !== searchString[j]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return i;
    }
  }

  return -1;
}

function myReplaceAll(
  str: string,
  searchValue: string,
  replaceValue: string,
): string {
  if (searchValue === '') {
    let result = replaceValue;
    for (let i = 0; i < str.length; i += 1) {
      result += str[i] + replaceValue;
    }
    return result;
  }

  let result = '';
  let cutStart = 0;

  while (cutStart <= str.length) {
    const foundIndex: number = manualIndexOf(str, searchValue, cutStart);

    if (foundIndex === -1) {
      result += str.slice(cutStart);
      break;
    }

    result += str.slice(cutStart, foundIndex) + replaceValue;
    cutStart = foundIndex + searchValue.length;
  }

  return result;
}
```

## Time Complexity

O(n * m), where n is `str.length` and m is `searchValue.length` — the
scan visits at most O(n) candidate starting positions, each costing up
to O(m) to verify a match; the empty-`searchValue` path is O(n).

## Space Complexity

O(n + k), where k accounts for the net change in length from replacing
matches with (potentially longer or shorter) `replaceValue` text — the
result string's size is proportional to the input plus the total size
difference introduced by all replacements.

## Common Mistakes

- Implementing this as "find the first match with `indexOf`, replace it,
  then call `indexOf` again starting from `0` on the *already-modified*
  string" — this can re-match text that was just inserted by
  `replaceValue` (if `replaceValue` happens to contain `searchValue`),
  producing infinite replacement or incorrect results; always resume
  scanning from *past* the match on the *original* remaining text, not
  restart from the beginning of a mutated string.
- Not special-casing `searchValue = ""` — feeding it through the general
  scanning loop causes `manualIndexOf` to match at every position with a
  zero-length advance, so `cutStart` never increases and the loop never
  terminates.
- Confusing this with `str.split(searchValue).join(replaceValue)` — that
  approach is a legitimate one-liner alternative worth mentioning, but
  candidates should be able to explain *why* it works (it's the same
  "cut on every occurrence" idea, expressed via two built-ins instead of
  one manual scan) rather than presenting it as if it were the "manual"
  solution being asked for here.
- Treating a `RegExp` `searchValue` the same as a string one without
  checking for the required global (`g`) flag — native `replaceAll`
  throws a `TypeError` for a non-global regex specifically to avoid the
  footgun of "did you mean `replace`?"; that check is out of scope for
  this string-only implementation but should be named explicitly rather
  than glossed over.

## Interview Follow-up Questions

1. How would you extend this to accept a `RegExp` `searchValue`,
   including validating that it has the global (`g`) flag and throwing a
   `TypeError` if not, matching native `replaceAll`'s contract?
2. How does `replaceValue` supporting special replacement patterns (like
   `$&` for "the matched substring", `$1` for capture groups) change the
   algorithm once regex support is added?
3. Why do you think `replace()` only replaces the first match by default
   for a string pattern, while `replaceAll()` was added as a *separate*
   method rather than just changing `replace()`'s default — what
   backward-compatibility concern does that reflect?
4. What's the simplest correct one-liner using existing built-ins
   (`str.split(searchValue).join(replaceValue)`), and what edge case
   (hint: `searchValue = ""`) does it need to be checked against to
   confirm it still matches native `replaceAll` behavior?

## Similar Questions

- [Implement String.prototype.split Polyfill](implement-custom-string-prototype-split-polyfill.md)
- [Implement String.prototype.includes Polyfill](implement-custom-string-prototype-includes-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
