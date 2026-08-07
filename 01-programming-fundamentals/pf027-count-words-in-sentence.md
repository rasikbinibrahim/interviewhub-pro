# PF027 · Count Words in a Sentence

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** strings, regex, word-count

## Problem Statement

Write a function `countWords(sentence)` that returns the number of
words in `sentence`, where words are separated by one or more
whitespace characters, correctly handling leading/trailing/extra spaces.

## Input

`sentence`: a string (may be empty, `null`, or contain irregular
spacing).

## Output

A non-negative integer: the number of words in `sentence`.

## Constraints

`0 <= sentence.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `"The quick brown fox"` | `4` | Four words separated by single spaces |
| `"  hello   world  "` | `2` | Leading/trailing/repeated spaces are ignored |
| `""` | `0` | An empty string has no words |

## Edge Cases

- Empty string → `0`
- String of only whitespace (`"   "`) → `0`, not `1` (after trimming,
  splitting an empty string would otherwise report a phantom word)
- `null`/`undefined` sentence → `0` (guarded explicitly, since calling
  `.trim()` on `null` would throw)
- Multiple consecutive spaces between words → collapsed, not counted as
  extra words

## Hints

1. `sentence.split(' ')` looks tempting, but breaks the moment there's
   more than one space between words, or leading/trailing spaces — what
   regex pattern matches "one or more whitespace characters" as a single
   separator?
2. Trim the string first, so leading and trailing whitespace don't
   produce empty-string entries at the start/end of the split result.
3. After trimming, explicitly check for the empty-string case *before*
   splitting — splitting an empty string still produces an array with
   one (empty) element, which would otherwise be miscounted as one word.

## Algorithm

**Pattern:** normalize-then-split with a whitespace regex.
**Core insight:** naively splitting on a single space character breaks
under irregular spacing (multiple spaces, leading/trailing spaces), so
the fix is twofold: trim the ends first (removing spaces that would
otherwise produce empty leading/trailing tokens), and split on the regex
`/\s+/` (one-or-more whitespace) instead of a literal `' '`, so runs of
multiple spaces are treated as a single separator rather than producing
empty strings between them.
**Invariant:** after trimming and the empty-string guard, every element
of `sentence.trim().split(/\s+/)` corresponds to exactly one real word,
with no empty-string artifacts.

## Dry Run

**Input:** `sentence = "  hello   world  "`

| Step | Operation | Result |
|---|---|---|
| 1 | `sentence.trim()` | `"hello   world"` |
| 2 | not empty, proceed | — |
| 3 | `.split(/\s+/)` | `["hello", "world"]` |
| 4 | `.length` | `2` |

**Result:** `2` — matches expected output.

## JavaScript Solution

```js
function countWords(sentence) {
  if (!sentence || sentence.trim() === '') return 0;
  return sentence.trim().split(/\s+/).length;
}
```

## TypeScript Solution

```ts
function countWords(sentence: string | null | undefined): number {
  if (!sentence || sentence.trim() === '') return 0;
  return sentence.trim().split(/\s+/).length;
}
```

## Time Complexity

O(n) — trimming and splitting are both linear scans of the string.

## Space Complexity

O(n) — the split produces an array holding every word.

## Common Mistakes

- Splitting on a literal `' '` instead of `/\s+/` — silently produces
  wrong (too-high) counts whenever there's more than one consecutive
  space between words.
- Forgetting to trim before splitting — a leading or trailing space
  produces an empty-string element at the start or end of the split
  result, inflating the count by one per stray boundary space.
- Not guarding the all-whitespace / empty-string case before splitting —
  `"".split(/\s+/)` returns `['']` (length `1`), which would incorrectly
  report one word for an empty sentence without the explicit early
  return.

## Interview Follow-up Questions

1. How would you also count the number of *sentences* (not just words),
   given punctuation like `.`, `!`, `?`?
2. How would you handle Unicode whitespace characters (like non-breaking
   spaces) that `\s` might not match consistently across environments?
3. How would you return the actual list of words, not just the count,
   while still handling all the same edge cases correctly?

## Similar Questions

- Count Character Frequencies in a String (see [pf018-count-character-frequencies-in-string.md](pf018-count-character-frequencies-in-string.md))
- Check Valid Anagram Strings (see [pf028-check-anagram-strings.md](pf028-check-anagram-strings.md))

---
[← Back to Programming Fundamentals](README.md)
