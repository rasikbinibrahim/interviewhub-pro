# Q301 · Group Anagrams

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Microsoft, Uber, Salesforce
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Hashing
**Concepts:** canonical-key hashing, grouping by derived signature

## Problem Statement

Given an array of strings `strs`, group the anagrams together. An
anagram is a word formed by rearranging the letters of another word,
using all the original letters exactly once. Return the groups in any
order.

## Input

`strs`: an array of strings.

## Output

An array of arrays of strings — each inner array is one anagram group.

## Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters only.

## Examples

| Input | Output | Why |
|---|---|---|
| `["eat","tea","tan","ate","nat","bat"]` | `[["eat","tea","ate"],["tan","nat"],["bat"]]` | "eat"/"tea"/"ate" share the same letters; "tan"/"nat" share theirs; "bat" is alone |
| `[""]` | `[[""]]` | A single empty string forms its own group |
| `["a"]` | `[["a"]]` | A single character forms its own group |

## Edge Cases

- Empty string in the input array → groups with other empty strings, or
  alone if it's the only one
- All strings are anagrams of each other → single group containing
  everything
- No two strings are anagrams → every string is its own group of one
- Strings of different lengths can never be anagrams of each other →
  must not accidentally group them

## Hints

1. Two strings are anagrams if and only if some canonical
   transformation of both produces the identical result — what
   transformation of a string is invariant to the order of its
   characters?
2. Sorting a string's characters produces a canonical form: any anagram
   of it sorts to that exact same string. What data structure lets you
   group original strings by a computed key like this efficiently?
3. Use a hash map keyed by the canonical form, with each value being the
   list of original strings that produced that key.

## Algorithm

**Pattern:** hashing with a canonical/derived key.
**Core insight:** anagram-equality is really "these two strings become
identical under some fixed transformation." Sorting a string's
characters is exactly such a transformation — it's invariant to
character order, so every anagram of a given word sorts to the exact
same string. That sorted string becomes the hash map key; all original
strings sharing a key are one anagram group.
**Invariant:** after processing the first `i` strings, `groups` maps
every distinct canonical key seen so far to the complete list of
original strings (from those `i`) that produced it.

## Dry Run

**Input:** `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`

| str | sorted key | groups after this step |
|---|---|---|
| "eat" | "aet" | `{ "aet": ["eat"] }` |
| "tea" | "aet" | `{ "aet": ["eat", "tea"] }` |
| "tan" | "ant" | `{ "aet": [...], "ant": ["tan"] }` |
| "ate" | "aet" | `{ "aet": ["eat", "tea", "ate"], "ant": ["tan"] }` |
| "nat" | "ant" | `{ "aet": [...], "ant": ["tan", "nat"] }` |
| "bat" | "abt" | `{ "aet": [...], "ant": [...], "abt": ["bat"] }` |

**Result:** `[["eat","tea","ate"], ["tan","nat"], ["bat"]]` (order of
groups/values may vary) — matches expected output.

## JavaScript Solution

```js
function groupAnagrams(strs) {
  const groups = new Map(); // sorted-key -> array of original strings

  for (const str of strs) {
    // The canonical key: same for every anagram of this string.
    const key = str.split('').sort().join('');

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(str);
  }

  return Array.from(groups.values());
}
```

## TypeScript Solution

```ts
function groupAnagrams(strs: readonly string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const str of strs) {
    const key = str.split('').sort().join('');

    const existing = groups.get(key);
    if (existing) {
      existing.push(str);
    } else {
      groups.set(key, [str]);
    }
  }

  return Array.from(groups.values());
}
```

## Time Complexity

O(n * k log k), where n is the number of strings and k is the maximum
string length — each string is sorted for its key, and sorting a
k-character string costs O(k log k).

## Space Complexity

O(n * k) — storing every original string once, across all group arrays,
plus the map's keys.

## Common Mistakes

- Using an O(n²) approach — comparing every pair of strings directly for
  the anagram relationship — instead of the O(n · k log k) hashing
  approach; this is the exact naive-vs-optimized gap the question tests.
- Building the key by concatenating sorted character *counts* (a valid
  alternative that avoids the `log k` sort cost — see the follow-up
  below) but implementing the count array incorrectly, e.g. off-by-one
  on the alphabet index (`'a'.charCodeAt(0)`).
- Forgetting that an empty string is still a valid group member (key:
  the empty string itself).

## Interview Follow-up Questions

1. Can you get this to O(n · k) instead of O(n · k log k)? (Use a
   26-element character-count array as the key instead of sorting —
   trading a constant-factor larger key for avoiding the sort.)
2. What if the strings could contain Unicode characters, not just
   lowercase English letters — does the sorting-based key still work
   correctly?
3. How would you handle this at a scale where the full input can't fit
   in memory at once?

## Similar Questions

- Valid Anagram (the two-string special case of this problem)
- Find All Anagrams in a String
- Group Shifted Strings

---
[← Back to Hashing](README.md) · [← Back to 65-dsa](../README.md)
