# QJSC037 · Implement Custom String prototype split Polyfill

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual delimiter scanning, empty-separator character splitting, `limit` truncation

## Problem Statement

Implement `mySplit(str, separator, limit)`, a polyfill for
`String.prototype.split`, **scoped to string separators** (the real
method also accepts a `RegExp` separator — that's a documented
extension, not silently ignored; see the note below). It should break
`str` into an array of substrings wherever `separator` occurs, with
`separator` itself removed from the output. If `limit` is given, the
returned array contains at most `limit` elements — later pieces beyond
that count are simply dropped, not merged into the last element. You may
not call the real `.split()` internally.

> **Scope note:** full `RegExp` separator support (matching patterns
> rather than literal strings, capturing groups appearing in the output,
> etc.) is out of scope for this manual implementation and is listed as
> a follow-up/extension below — it is a materially different algorithm
> (pattern scanning vs. literal substring scanning), not an oversight.

## Input

- `str`: the string to split
- `separator`: a string to split on (may be `""`, meaning "split into
  individual characters"); if omitted, the whole string is not split at
  all
- `limit` (optional): a non-negative integer capping the number of
  elements in the result

## Output

An array of strings — the pieces of `str` between occurrences of
`separator`, capped at `limit` elements if provided.

## Constraints

- `separator = ""` splits `str` into an array of its individual
  characters.
- `separator` omitted (`undefined`) → the result is `[str]` (a
  single-element array containing the whole string, unsplit) — matches
  native behavior.
- `limit`, when provided, truncates the *result array*, not the input
  scanning — pieces past the limit are dropped entirely, never
  concatenated back together.
- Consecutive occurrences of `separator` (e.g. `"a,,b".split(",")`)
  produce empty-string elements in the output, not collapsed gaps.

## Examples

| Input | Output | Why |
|---|---|---|
| `mySplit("a,b,c", ",")` | `["a", "b", "c"]` | Three pieces, split at each comma, commas removed |
| `mySplit("hello", "")` | `["h", "e", "l", "l", "o"]` | Empty separator splits into individual characters |
| `mySplit("a,b,c,d", ",", 2)` | `["a", "b"]` | Splitting produces `["a","b","c","d"]`, but `limit = 2` truncates to just the first 2 elements — `"c"` and `"d"` are dropped, not merged into `"b"` |

## Edge Cases

- `separator` not found anywhere in `str` → `[str]` (the whole string,
  unsplit, as a single-element array).
- `separator === str` exactly → `["", ""]` (an empty piece before and
  after the single, whole-string match).
- Consecutive separators (e.g. `"a,,b"` split on `","`) → `["a", "",
  "b"]` — the empty piece between them is preserved, not skipped.
- `limit = 0` → `[]` (an empty array — zero elements requested, so
  scanning can stop before even finding the first piece).
- `str = ""` with a non-empty `separator` → `[""]` (one empty-string
  element, since there's exactly one "piece" — nothing — with no
  separator occurrences to split on).

## Hints

1. Handle the two special separator cases first, before any scanning
   logic: `separator === undefined` → return `[str]`; `separator ===
   ""` → return an array of `str`'s individual characters (just iterate
   and push each character).
2. For a non-empty string separator, scan `str` left to right looking
   for the next occurrence of `separator` (a manual substring search,
   same idea as `includes`). Each time you find one, the piece since the
   last cut point becomes the next array element, and the scan resumes
   right after the separator.
3. Apply `limit` as a final truncation step on the fully-built result
   array (`result.slice(0, limit)`), rather than trying to stop scanning
   early — stopping early is a valid optimization but easy to get wrong
   first; get correctness with the simple "build everything, then
   truncate" approach before optimizing.

## Algorithm

**Pattern:** manual left-to-right delimiter scanning with a "cut point"
tracker, plus special-cased empty/undefined separators.
**Core insight:** splitting on a literal string separator is a
repeated "find the next occurrand, on it, everything since the last cut
becomes a piece" — since there's no pattern matching involved (unlike a
`RegExp` separator), a straightforward manual substring search
(comparable to the `includes`/`indexOf` logic) is enough to find each
occurrence. Tracking a `cutStart` index that advances past each found
separator, and appending `str.slice(cutStart, foundIndex)` before
resuming the scan, produces the pieces in order without ever needing to
look backward.
**Invariant:** at any point in the scan, every character of `str` before
`cutStart` has already been assigned to some element of `result` — so
when the scan reaches the end of `str`, the one remaining piece (from
`cutStart` to the end) is exactly the final element.

## Dry Run

**Input:** `mySplit("a,b,c", ",")`

| Step | cutStart | Scan finds `,` at index | Piece extracted | result after |
|---|---|---|---|---|
| 1 | 0 | index 1 | `str.slice(0, 1) = "a"` | `["a"]` |
| 2 | 2 (just past the comma) | index 3 | `str.slice(2, 3) = "b"` | `["a", "b"]` |
| 3 | 4 | no more `,` found | remaining piece `str.slice(4) = "c"` | `["a", "b", "c"]` |

**Result:** `["a", "b", "c"]` — matches the expected output.

## JavaScript Solution

```js
function mySplit(str, separator, limit) {
  // No separator at all — the whole string is the only "piece".
  if (separator === undefined) {
    return [str];
  }

  let result = [];

  if (separator === '') {
    // Empty separator: split into individual characters.
    for (let i = 0; i < str.length; i += 1) {
      result.push(str[i]);
    }
  } else {
    // Manual left-to-right scan for each occurrence of `separator`.
    let cutStart = 0;

    while (cutStart <= str.length) {
      const foundIndex = manualIndexOf(str, separator, cutStart);

      if (foundIndex === -1) {
        // No more separators — the remaining tail is the last piece.
        result.push(str.slice(cutStart));
        break;
      }

      result.push(str.slice(cutStart, foundIndex));
      cutStart = foundIndex + separator.length;
    }
  }

  // limit truncates the finished array — extra pieces are dropped,
  // never merged back together.
  if (limit !== undefined) {
    result = result.slice(0, limit);
  }

  return result;
}

// Manual substring search — deliberately not the built-in indexOf(),
// since split's own scanning logic is what's being tested here.
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

function mySplit(str: string, separator?: string, limit?: number): string[] {
  if (separator === undefined) {
    return [str];
  }

  let result: string[] = [];

  if (separator === '') {
    for (let i = 0; i < str.length; i += 1) {
      result.push(str[i]);
    }
  } else {
    let cutStart = 0;

    while (cutStart <= str.length) {
      const foundIndex: number = manualIndexOf(str, separator, cutStart);

      if (foundIndex === -1) {
        result.push(str.slice(cutStart));
        break;
      }

      result.push(str.slice(cutStart, foundIndex));
      cutStart = foundIndex + separator.length;
    }
  }

  if (limit !== undefined) {
    result = result.slice(0, limit);
  }

  return result;
}
```

## Time Complexity

O(n * m) worst case, where n is `str.length` and m is
`separator.length` — each scan step for the next occurrence can cost up
to O(m) per position checked, over up to O(n) positions; the
empty-separator character-split path is O(n).

## Space Complexity

O(n) — the result array's elements collectively contain every character
of `str` (minus the separator occurrences), so total output size is
O(n); truncating for `limit` only ever shrinks this.

## Common Mistakes

- Applying `limit` by stopping the *scan* early instead of truncating
  the finished array — this is a valid optimization but easy to get
  subtly wrong (e.g. off-by-one on whether the `limit`-th piece is
  included); building the full result first and slicing is the safer
  baseline to reach for under interview pressure.
- Not special-casing `separator = ""` and instead letting the general
  scanning loop run with a zero-length separator — `manualIndexOf` with
  an empty `searchString` matches at every position with zero-length
  advance, causing an infinite loop (`cutStart` never moves forward).
- Silently treating a `RegExp` separator as if it were its
  `.toString()` (e.g. splitting on the literal text `"/,/"` instead of
  recognizing the pattern) — this is exactly the scope boundary called
  out above; the right answer under interview pressure is to state the
  limitation explicitly, not to guess at partial regex support.
- Merging leftover pieces into the last retained element when `limit` is
  reached — native `split` simply drops everything past `limit`; the
  `limit`-th element is not a concatenation of the remaining pieces.

## Interview Follow-up Questions

1. How would you extend this to support a `RegExp` separator with no
   capturing groups — what has to change structurally versus the
   literal-string scan here?
2. Real `split` includes captured groups from a regex separator directly
   in the output array — why do you think the spec does that, and what
   would break in your algorithm if you naively added it?
3. How would you implement this using `indexOf` (a real built-in) if an
   interviewer said "the constraint is no `.split()`, but other string
   built-ins are fine" — how does that change the amount of code you'd
   need to write?
4. What's the time complexity difference between this brute-force scan
   and using a proper string-search algorithm (like KMP) for very long
   separators?

## Similar Questions

- [Implement String.prototype.includes Polyfill](implement-custom-string-prototype-includes-polyfill.md)
- [Implement String.prototype.slice Polyfill](implement-custom-string-prototype-slice-polyfill.md)
- [Implement Array.prototype.flat Polyfill (Iterative)](implement-custom-array-prototype-flat-polyfill-iterative.md)

---
[← Back to 61-javascript-coding](README.md)
