# PF018 · Count Character Frequencies in a String

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** strings, hash-map, frequency-counter

## Problem Statement

Write a function `charFrequency(str)` that returns an object mapping
each character in `str` to the number of times it occurs.

## Input

`str`: a string (may be empty).

## Output

An object whose keys are the distinct characters of `str` and whose
values are their occurrence counts.

## Constraints

`0 <= str.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `"aabbbc"` | `{ a: 2, b: 3, c: 1 }` | `a` appears twice, `b` three times, `c` once |
| `""` | `{}` | No characters to count |
| `"xyz"` | `{ x: 1, y: 1, z: 1 }` | Every character is distinct, each occurring once |

## Edge Cases

- Empty string → an empty object, not `null`/`undefined`
- Single-character string → that one character mapped to `1`
- String with repeated whitespace (`"a a"`) → the space character itself
  is counted like any other character
- Case sensitivity: `"Aa"` produces two separate keys (`A: 1, a: 1`),
  not one merged count — the function does not normalize case

## Hints

1. You need to visit every character exactly once and keep a running
   count per distinct character — what data structure gives you O(1)
   lookup and update by key?
2. A plain object (or a `Map`) works as the frequency table: use each
   character as the key.
3. For each character, the update is always the same two-step idea:
   "if I haven't seen this character before, start it at 0; then add
   one" — which is exactly what `freq[char] = (freq[char] || 0) + 1`
   expresses in a single line.

## Algorithm

**Pattern:** single-pass frequency counting with a hash map.
**Core insight:** iterating the string once and maintaining a map from
character to running count avoids any nested comparison between
characters — each character only ever needs to update its own count,
independent of every other character.
**Invariant:** after processing index `i`, `freq` correctly holds the
occurrence count of every character within `str[0..i]`.

## Dry Run

**Input:** `"aabbbc"`

| Step | char | freq before | freq after |
|---|---|---|---|
| 1 | `a` | `{}` | `{ a: 1 }` |
| 2 | `a` | `{ a: 1 }` | `{ a: 2 }` |
| 3 | `b` | `{ a: 2 }` | `{ a: 2, b: 1 }` |
| 4 | `b` | `{ a: 2, b: 1 }` | `{ a: 2, b: 2 }` |
| 5 | `b` | `{ a: 2, b: 2 }` | `{ a: 2, b: 3 }` |
| 6 | `c` | `{ a: 2, b: 3 }` | `{ a: 2, b: 3, c: 1 }` |

Loop ends. **Result:** `{ a: 2, b: 3, c: 1 }` — matches expected output.

## JavaScript Solution

```js
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
```

## TypeScript Solution

```ts
function charFrequency(str: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
```

## Time Complexity

O(n) — one pass over the string, and each character update is O(1).

## Space Complexity

O(k) — where k is the number of distinct characters (at most the
alphabet size for typical text, or O(n) in the worst case of an
all-distinct-character string).

## Common Mistakes

- Using a plain object without accounting for JavaScript's built-in
  object prototype keys (e.g. a string containing the literal substring
  `"constructor"` as characters is harmless here since single characters
  never collide with prototype property names, but this is a real trap
  in similar-looking problems — prefer `Object.create(null)` or a `Map`
  when the input could plausibly contain full prototype-like keys).
- Forgetting the `|| 0` default, causing `freq[char] + 1` to evaluate to
  `NaN` on a character's first occurrence (`undefined + 1 === NaN`).
- Assuming case-insensitivity — `"Aa"` is two distinct keys here unless
  the input is explicitly normalized to one case first.

## Interview Follow-up Questions

1. How would you find the single most frequent character (and handle a
   tie)?
2. How would you make this case-insensitive without losing the original
   casing in the output keys?
3. How would you extend this to count frequencies across a stream of
   text that arrives in chunks, rather than one complete string?

## Similar Questions

- Check Valid Anagram Strings (see [pf028-check-anagram-strings.md](pf028-check-anagram-strings.md))
- Count Words in a Sentence (see [pf027-count-words-in-sentence.md](pf027-count-words-in-sentence.md))

---
[← Back to Programming Fundamentals](README.md)
