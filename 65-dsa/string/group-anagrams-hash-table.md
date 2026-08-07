# Q6639 · Group Anagrams (Sorted-Key Hash Map)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** String
**Concepts:** string, hash-table, sorting, anagrams

## Problem Statement

Write a function `groupAnagrams(strs)` that groups the strings in `strs`
so that every group contains only mutual anagrams of each other.

## Input

`strs`: an array of lowercase strings.

## Output

An array of groups (each an array of strings), where every string in a
group is an anagram of every other string in that same group.

## Constraints

`1 <= strs.length <= 10^4`, `0 <= strs[i].length <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `["eat","tea","tan","ate","nat","bat"]` | `[["eat","tea","ate"],["tan","nat"],["bat"]]` | Grouped by shared sorted-letter signature |
| `[""]` | `[[""]]` | A single empty string forms its own group |
| `["a"]` | `[["a"]]` | A single-character string forms its own trivial group |

## Edge Cases

- Empty string in the array → still grouped correctly (its sorted key
  is also the empty string, matching any other empty strings)
- All strings are anagrams of each other → a single group containing
  every string
- No two strings are anagrams of each other → every string ends up in
  its own singleton group
- Duplicate identical strings (not just anagrams, the exact same string
  repeated) → grouped together, since an identical string is trivially
  its own anagram

## Hints

1. Two strings are anagrams exactly when they contain the same
   characters the same number of times — what transformation of a
   string produces a value that's identical for every anagram of it, but
   different for non-anagrams?
2. Sorting a string's characters alphabetically produces exactly that:
   every anagram of a given string sorts to the *same* character
   sequence, which can be used as a hash map key.
3. Build a map from "sorted-character key" to "list of original strings
   that produced that key" — grouping every string by which key it maps
   to.

## Algorithm

**Pattern:** canonical-key hash map grouping.
**Core insight:** anagrams share the same multiset of characters, and
sorting a string's characters is a simple way to produce a canonical
representation that's identical for every anagram of that string (and
different for any non-anagram) — two strings are anagrams if and only if
their sorted forms are equal. Using that sorted form as a hash map key
means every string naturally groups itself with its anagrams as the
array is scanned once, with no need to compare strings pairwise.
**Invariant:** after processing any prefix of `strs`, `map` correctly
holds every string seen so far, grouped under the sorted-character key
shared by every anagram in that group.

## Dry Run

**Input:** `strs = ["eat","tea","tan","ate","nat","bat"]`

| str | sorted key | map after |
|---|---|---|
| `"eat"` | `"aet"` | `{aet: [eat]}` |
| `"tea"` | `"aet"` | `{aet: [eat, tea]}` |
| `"tan"` | `"ant"` | `{aet: [...], ant: [tan]}` |
| `"ate"` | `"aet"` | `{aet: [eat, tea, ate], ant: [tan]}` |
| `"nat"` | `"ant"` | `{aet: [...], ant: [tan, nat]}` |
| `"bat"` | `"abt"` | `{aet: [...], ant: [...], abt: [bat]}` |

**Result:** `[["eat","tea","ate"], ["tan","nat"], ["bat"]]` — matches
expected output.

## JavaScript Solution

```js
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
}
```

## TypeScript Solution

```ts
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const key: string = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}
```

## Time Complexity

O(n × L log L), where n is the number of strings and L is the maximum
string length — each string is sorted (O(L log L)) once.

## Space Complexity

O(n × L) — the map stores every original string, grouped by key.

## Common Mistakes

- Comparing every pair of strings directly to check if they're
  anagrams — O(n²) pairwise comparisons, far slower than a single
  hash-map pass.
- Using a *frequency-count string* (e.g. `"#1#0#0...#1..."` for 26
  letter counts) instead of a sorted string as the key — this is a
  genuinely faster O(L) alternative (versus O(L log L) for sorting) that
  avoids sorting each string, worth mentioning as an optimization for
  very long strings.
- Forgetting that an empty string is a valid input and sorts to itself —
  no special casing is actually needed, but it's worth verifying
  mentally that the sort-and-join approach handles it correctly (it
  does, trivially).

## Interview Follow-up Questions

1. How would you implement the frequency-count key approach instead of
   sorting, and when would it actually be faster in practice?
2. How would you group anagrams case-insensitively, treating `"Eat"` and
   `"tea"` as anagrams of each other?
3. How would this scale if `strs` were far too large to hold entirely in
   memory at once?

## Similar Questions

- Check Valid Anagram Strings (see [../../01-programming-fundamentals/pf028-check-anagram-strings.md](../../01-programming-fundamentals/pf028-check-anagram-strings.md))
- Longest Substring Without Repeating Characters (see [longest-substring-without-repeating-characters.md](longest-substring-without-repeating-characters.md))
