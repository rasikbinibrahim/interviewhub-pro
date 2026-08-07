# Q205 · Reverse Words in a String

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Meta, Adobe
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Strings
**Concepts:** manual tokenization, reverse-word-order, whitespace normalization

## Problem Statement

Given an input string `s`, reverse the order of the words. A word is a
maximal run of non-space characters. Return a string with the words in
reverse order, joined by a single space, with no leading or trailing
spaces and no runs of multiple spaces between words — even if the input
has irregular spacing.

## Input

- `s`: a string containing letters, digits, and spaces

## Output

A string with the words in reverse order, single-space-separated, no
leading/trailing spaces.

## Constraints

- `1 <= s.length <= 10^4`
- `s` contains English letters (upper/lowercase), digits, and spaces
  `' '`.
- `s` contains at least one non-space character.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "the sky is blue"` | `"blue is sky the"` | Words reversed, spacing already regular |
| `s = "  hello world  "` | `"world hello"` | Leading/trailing spaces are stripped |
| `s = "a good   example"` | `"example good a"` | Multiple internal spaces collapse to one |

## Edge Cases

- Leading and/or trailing spaces → must not appear in the output
- Multiple consecutive spaces between words → collapse to exactly one
  space in the output
- A single word with no spaces at all → returned unchanged
- All spaces except one word in the middle → same as any other input,
  just fewer words to reverse

## Hints

1. `s.split(' ')` alone doesn't handle irregular spacing — consecutive
   spaces produce empty-string "words" that need to be filtered out
   somehow.
2. Rather than relying on a built-in split-and-clean, think about
   scanning the string manually from one end, identifying word
   boundaries by hand.
3. Scanning from the *end* of the string toward the start naturally
   produces words in reverse order as you find them — no separate
   reversal step needed afterward, and skipping runs of spaces (in
   either direction) is the same logic applied wherever you encounter
   them.

## Algorithm

**Pattern:** manual right-to-left tokenization.
**Core insight:** scanning the string from its last character toward
its first, and collecting each maximal non-space run as a word, produces
the words in reverse order *as a side effect of the scan direction* —
no separate "reverse the word list" step is needed. Spaces (single or
in runs, leading or trailing) are simply skipped wherever the scan
encounters them, which handles irregular spacing uniformly without a
separate cleanup pass.
**Invariant:** at any point during the scan, `result` holds every word
found so far, already in final (reversed) order, and the pointer never
revisits a character once it's been consumed as part of a word or a
skipped space run.

## Dry Run

**Input:** `s = "  the sky is  blue  "`

| Step | Action | words collected so far |
|---|---|---|
| 1 | Skip trailing spaces (indices for `"  "` at the end) | `[]` |
| 2 | Collect word `"blue"` (scanning right to left) | `["blue"]` |
| 3 | Skip the double space before `"blue"` | `["blue"]` |
| 4 | Collect word `"is"` | `["blue", "is"]` |
| 5 | Skip single space | `["blue", "is"]` |
| 6 | Collect word `"sky"` | `["blue", "is", "sky"]` |
| 7 | Skip single space | `["blue", "is", "sky"]` |
| 8 | Collect word `"the"` | `["blue", "is", "sky", "the"]` |
| 9 | Skip leading spaces, reach start of string | done |

**Result:** `"blue is sky the"` — matches expected output.

## JavaScript Solution

```js
function reverseWords(s) {
  const words = [];
  let end = s.length - 1;

  while (end >= 0) {
    // Skip any run of spaces before the next word (from the right).
    while (end >= 0 && s[end] === ' ') {
      end--;
    }
    if (end < 0) break;

    // end now points at the last character of a word; scan left to
    // find where that word starts.
    let start = end;
    while (start >= 0 && s[start] !== ' ') {
      start--;
    }

    words.push(s.slice(start + 1, end + 1));
    end = start;
  }

  return words.join(' ');
}
```

## TypeScript Solution

```ts
function reverseWords(s: string): string {
  const words: string[] = [];
  let end = s.length - 1;

  while (end >= 0) {
    while (end >= 0 && s[end] === ' ') {
      end--;
    }
    if (end < 0) break;

    let start = end;
    while (start >= 0 && s[start] !== ' ') {
      start--;
    }

    words.push(s.slice(start + 1, end + 1));
    end = start;
  }

  return words.join(' ');
}
```

## Time Complexity

O(n) — every character is visited at most once across both the
space-skipping and word-collecting scans.

## Space Complexity

O(n) — the `words` array and the joined result together hold every
non-space character from the input once.

## Common Mistakes

- Using `s.split(' ')` directly — produces empty-string entries for
  every run of consecutive spaces, which then need extra filtering.
- Forgetting to strip leading/trailing spaces before or after
  processing, leaving stray spaces in the final joined result.
- Reversing the string character-by-character (`[...s].reverse()`) —
  this reverses each word's own letters too (`"blue"` becomes
  `"eulb"`), not just the word order.

## Interview Follow-up Questions

1. How would you solve this in-place with O(1) extra space, given a
   mutable character array instead of an immutable string — hint: this
   is the same "reverse the whole thing, then reverse each part" trick
   as [Rotate Array](../arrays/rotate-array.md), applied here as
   "reverse the whole string, then reverse each word back."
2. How would you handle other whitespace characters (tabs, newlines),
   not just the space character?
3. How would you reverse only the *characters* within each word while
   keeping word order unchanged (a related but distinct transformation)?

## Similar Questions

- Rotate Array (see [arrays/rotate-array.md](../arrays/rotate-array.md) —
  shares the reversal-trick family)
- Valid Palindrome (see [valid-palindrome.md](valid-palindrome.md))
- Reverse String

---
[← Back to Strings](README.md) · [← Back to 65-dsa](../README.md)
