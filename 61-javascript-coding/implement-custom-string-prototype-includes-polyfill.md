# QJSC047 · Implement Custom String prototype includes Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual substring search, `fromIndex` offset, RegExp rejection (`TypeError`)

## Problem Statement

Implement `myIncludes(str, searchString, fromIndex)`, a polyfill for
`String.prototype.includes`. It should return `true` if `searchString`
occurs anywhere within `str` at or after `fromIndex`, and `false`
otherwise. Matching the real spec's behavior, it must throw a
`TypeError` immediately if `searchString` is a `RegExp` — `includes` is
defined only for literal substring search, unlike `String.prototype.match`
or `.replace`, which do accept patterns. You may not call the real
`.includes()` internally.

## Input

- `str`: the string being searched (`this` value in the real method)
- `searchString`: the substring to search for
- `fromIndex` (optional): a number; start searching at or after this
  index. Defaults to `0` when omitted.

## Output

A boolean: `true` if `searchString` is found at some position `>=
fromIndex`, `false` otherwise. Throws `TypeError` if `searchString` is a
`RegExp`.

## Constraints

- `fromIndex` is clamped into `[0, str.length]` (negative → `0`, greater
  than `str.length` → `str.length`).
- Comparison is case-sensitive.
- An empty `searchString` always returns `true` (as long as `fromIndex
  <= str.length`), matching the spec.
- Must throw synchronously — not return `false` — when `searchString` is
  a `RegExp` instance.

## Examples

| Input | Output | Why |
|---|---|---|
| `myIncludes("Hello world", "world")` | `true` | `"world"` occurs starting at index 6, which is `>= 0` |
| `myIncludes("Hello world", "Hello", 1)` | `false` | `"Hello"` only occurs at index 0, which is before `fromIndex = 1` — the search window starts too late to see it |
| `myIncludes("Hello world", /world/)` | throws `TypeError` | Real `includes` explicitly rejects `RegExp` search values — it is not a pattern-matching method |

## Edge Cases

- `searchString = ""` → `true`, as long as `fromIndex <= str.length`
  (matches the spec's "empty string is found everywhere" rule).
- `fromIndex` beyond `str.length` → search window is empty; only
  `searchString = ""` can still return `true` (and only if `fromIndex`
  clamps back down to `str.length`, which it does since it's clamped —
  so this actually stays consistent with the case above).
- `searchString` a `RegExp` (with or without the `g` flag) → `TypeError`,
  never a boolean.
- `searchString` longer than the remaining portion of `str` after
  `fromIndex` → `false`, it can never fit.
- Overlapping potential matches (e.g. `myIncludes("aaaa", "aa")`) → only
  needs to find one occurrence to return `true`; doesn't need to count
  them.

## Hints

1. Before anything else, check whether `searchString` is a `RegExp`
   (`searchString instanceof RegExp`) and throw a `TypeError` if so —
   that guard has to run before any search logic, even before touching
   `fromIndex`.
2. This is a classic "sliding window" substring search: try every
   possible starting index from `fromIndex` up to `str.length -
   searchString.length`, and at each one, compare characters manually.
3. You don't need a clever algorithm (like KMP) for an interview
   polyfill — a straightforward nested-loop search (outer loop over
   candidate start positions, inner loop comparing characters) is the
   expected, readable answer; only bring up KMP if the interviewer asks
   about optimizing for very large inputs.

## Algorithm

**Pattern:** brute-force substring search (sliding window + manual
character comparison), guarded by an upfront type check.
**Core insight:** "does `searchString` occur anywhere at or after
`fromIndex`" is equivalent to "does there exist some starting index `i`
(with `fromIndex <= i <= str.length - searchString.length`) such that
every character of `searchString` matches `str` starting at `i`." The
outer loop enumerates each candidate `i`; the inner loop verifies the
match character-by-character, bailing out on the first mismatch (no
point comparing further once one character disagrees).
**Invariant:** if the outer loop reaches candidate index `i` without
having returned `true`, then no valid match starts at any index in
`[fromIndex, i)` — so the search is exhaustive and correct once the
outer loop completes without success.

## Dry Run

**Input:** `myIncludes("Hello world", "world", 0)`

| Step | Candidate start `i` | Comparison | Result |
|---|---|---|---|
| 1 | `i = 0` | `str[0..4] = "Hello"` vs `"world"` → `'H' !== 'w'`, mismatch at first char | no match, advance `i` |
| 2 | `i = 1` | `str[1..5] = "ello "` vs `"world"` → `'e' !== 'w'` | no match |
| 3 | ... | (candidates `i = 2` through `i = 5` all mismatch on the first character) | no match |
| 4 | `i = 6` | `str[6..10] = "world"` vs `"world"` → every character matches | match found |

**Result:** `true`, found starting at index 6 — since a match was found,
the function returns immediately without checking `i = 7`.

## JavaScript Solution

```js
function myIncludes(str, searchString, fromIndex) {
  // includes() throws on a RegExp — it is not a pattern-search method.
  if (searchString instanceof RegExp) {
    throw new TypeError(
      'First argument to String.prototype.includes must not be a regular expression',
    );
  }

  const length = str.length;
  const searchLength = searchString.length;

  let start = fromIndex === undefined ? 0 : fromIndex;
  if (Number.isNaN(start) || start < 0) {
    start = 0;
  } else if (start > length) {
    start = length;
  }

  // Try every possible starting position from `start` onward.
  for (let i = start; i <= length - searchLength; i += 1) {
    let matched = true;

    // Manual character-by-character comparison for this window.
    for (let j = 0; j < searchLength; j += 1) {
      if (str[i + j] !== searchString[j]) {
        matched = false;
        break; // no point checking the rest of this window
      }
    }

    if (matched) {
      return true;
    }
  }

  return false;
}
```

## TypeScript Solution

```ts
function myIncludes(
  str: string,
  searchString: string,
  fromIndex?: number,
): boolean {
  if (searchString instanceof RegExp) {
    throw new TypeError(
      'First argument to String.prototype.includes must not be a regular expression',
    );
  }

  const length: number = str.length;
  const searchLength: number = searchString.length;

  let start: number = fromIndex === undefined ? 0 : fromIndex;
  if (Number.isNaN(start) || start < 0) {
    start = 0;
  } else if (start > length) {
    start = length;
  }

  for (let i = start; i <= length - searchLength; i += 1) {
    let matched = true;

    for (let j = 0; j < searchLength; j += 1) {
      if (str[i + j] !== searchString[j]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return true;
    }
  }

  return false;
}
```

## Time Complexity

O(n * m) worst case, where n is `str.length` and m is
`searchString.length` — for each of up to `n` candidate starting
positions, the inner loop can compare up to `m` characters (e.g.
searching `"aaaa...a"` for `"aaab"`, which mismatches only on its last
character every time).

## Space Complexity

O(1) — only a fixed number of scalar variables; no substrings or arrays
are allocated.

## Common Mistakes

- Checking for `RegExp` after already starting the search loop (or
  skipping the check entirely) — the real spec throws *before* doing any
  searching, and an interviewer will specifically test this.
- Looping `i` all the way to `length` instead of `length - searchLength`
  — this lets the inner loop read past the end of `str`, comparing
  against `undefined` instead of correctly recognizing there's no room
  left for a full match.
- Not breaking out of the inner loop on the first mismatch, which is
  still *correct* but silently turns an early-exit optimization into
  wasted work — worth mentioning even though it doesn't change
  correctness.
- Forgetting the empty-`searchString` case — with `searchLength = 0`,
  the loop condition `i <= length - 0` is still correct and the inner
  loop trivially matches (0 iterations, `matched` stays `true`), so this
  one actually falls out of the algorithm for free *if* the loop bounds
  are written correctly — but it's a common place to introduce an
  off-by-one if the bounds are wrong.

## Interview Follow-up Questions

1. How would you optimize this to O(n + m) using the Knuth-Morris-Pratt
   algorithm, and when would that optimization actually matter in a
   real frontend codebase?
2. Why do you think `includes`, `startsWith`, and `endsWith` all reject
   `RegExp` arguments while `match` and `replace` embrace them — what
   API design principle is being enforced?
3. How would you make the search case-insensitive without allocating a
   fully lowercased copy of `str` up front?
4. How does V8's actual native implementation likely differ from this
   O(n*m) approach for very large strings?

## Similar Questions

- [Implement String.prototype.startsWith Polyfill](implement-custom-string-prototype-startswith-polyfill.md)
- [Implement String.prototype.endsWith Polyfill](implement-custom-string-prototype-endswith-polyfill.md)
- [Implement String.prototype.split Polyfill](implement-custom-string-prototype-split-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
