# PF028 · Check Valid Anagram Strings

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** strings, anagrams, frequency-counter

## Problem Statement

Write a function `isAnagram(s, t)` that returns `true` if `t` is an
anagram of `s` — the same characters, the same number of times, in any
order — and `false` otherwise.

## Input

`s`, `t`: two strings.

## Output

A boolean: `true` if `t` is an anagram of `s`, `false` otherwise.

## Constraints

`1 <= s.length, t.length <= 10^5`, lowercase English letters

## Examples

| Input | Output | Why |
|---|---|---|
| `s="anagram", t="nagaram"` | `true` | Same letters, same counts, different order |
| `s="rat", t="car"` | `false` | Different letters entirely |
| `s="a", t="ab"` | `false` | Different lengths can never be anagrams |

## Edge Cases

- Different lengths → immediately `false`, no need to count anything
- Identical strings (`s === t`) → trivially `true`, every count nets to
  zero
- Single-character strings → `true` only if the characters match exactly
- Strings with repeated characters → counts must match per character,
  not just the *set* of distinct characters

## Hints

1. If the two strings have different lengths, they can never be
   anagrams — check that first, before doing any real work.
2. An anagram check is really a "do these two strings have identical
   character frequency profiles" check — what if you incremented a
   count for every character in `s` and decremented for every character
   in `t`, using the *same* counter object?
3. If `t` is truly an anagram of `s`, every net count in that shared
   counter should end up at exactly zero — no character was left over
   from either string.

## Algorithm

**Pattern:** single shared frequency counter, incremented and
decremented in one pass.
**Core insight:** instead of building two separate frequency maps and
comparing them afterward, you can use *one* counter: add 1 for each
character seen in `s`, subtract 1 for each character seen in `t`, at the
same index, in the same pass. If `s` and `t` are truly anagrams, every
character's net contribution cancels out to exactly zero — any nonzero
count means some character appears a different number of times in the
two strings.
**Invariant:** after processing index `i`, `count[c]` holds
`(occurrences of c in s[0..i]) - (occurrences of c in t[0..i])` for
every character `c` seen so far.

## Dry Run

**Input:** `s = "rat", t = "car"`

Length check: both length 3, proceed.

| i | s[i] | t[i] | count after |
|---|---|---|---|
| 0 | `r` | `c` | `{ r: 1, c: -1 }` |
| 1 | `a` | `a` | `{ r: 1, c: -1, a: 0 }` |
| 2 | `t` | `r` | `{ r: 0, c: -1, a: 0, t: 1 }` |

Final check: `count['c'] === -1 !== 0` → return `false` immediately.

**Result:** `false` — matches expected output.

## JavaScript Solution

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};

  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
    count[t[i]] = (count[t[i]] || 0) - 1;
  }

  for (const key in count) {
    if (count[key] !== 0) return false;
  }

  return true;
}
```

## TypeScript Solution

```ts
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count: Record<string, number> = {};

  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
    count[t[i]] = (count[t[i]] || 0) - 1;
  }

  for (const key in count) {
    if (count[key] !== 0) return false;
  }

  return true;
}
```

## Time Complexity

O(n) — one pass to build the combined count, one pass over the (at most
26, for lowercase English letters) distinct keys to verify they're all
zero.

## Space Complexity

O(k) — where k is the number of distinct characters across both strings
(bounded by the alphabet size for typical text).

## Common Mistakes

- Skipping the length check — without it, a shorter `t` could still
  produce all-zero counts if its characters happen to be a subset that
  cancels out, when in fact the strings can't be anagrams of different
  lengths (this specific solution's early-return length check prevents
  this, but it's an easy step to accidentally omit).
- Sorting both strings and comparing (`s.split('').sort().join('') ===
  t.split('').sort().join('')`) — correct, but O(n log n) instead of
  O(n).
- Using two separate frequency maps and comparing them key-by-key
  afterward — also correct, but doubles the bookkeeping compared to one
  shared increment/decrement counter.

## Interview Follow-up Questions

1. How would you adapt this to be case-insensitive, or to ignore spaces
   and punctuation?
2. How would you check whether `t` is an anagram of *any substring* of
   `s` (the "find all anagrams in a string" problem)?
3. How would this change for Unicode strings where a single visual
   character can be represented by multiple UTF-16 code units?

## Similar Questions

- Count Character Frequencies in a String (see [pf018-count-character-frequencies-in-string.md](pf018-count-character-frequencies-in-string.md))
- Count Words in a Sentence (see [pf027-count-words-in-sentence.md](pf027-count-words-in-sentence.md))

---
[← Back to Programming Fundamentals](README.md)
