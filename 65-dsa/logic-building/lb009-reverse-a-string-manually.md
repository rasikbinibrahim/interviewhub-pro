# LB009 · Reverse a String Manually

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon
**Interview Frequency:** ★★★★★
**Category:** Logic Building
**Concepts:** two pointers, manual character swapping

## Problem Statement

Write a function `reverseStringManually(s)` that returns `s` reversed,
without using the built-in `.split('').reverse().join('')` idiom or
`Array.prototype.reverse()` — build the reversal using explicit
character-by-character logic instead.

## Input

`s`: a string.

## Output

A new string: `s` with its characters in reverse order.

## Constraints

`0 <= s.length <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "hello"` | `"olleh"` | Characters in reverse order |
| `s = ""` | `""` | Empty string reversed is still empty |
| `s = "a"` | `"a"` | Single character is its own reverse |

## Edge Cases

- Empty string → `""`
- Single character → unchanged
- String with repeated characters (`"aabb"`) → still reverses correctly
  to `"bbaa"`, no special handling needed for duplicates

## Hints

1. Since JS strings are immutable, you can't swap characters in place
   the way you could with an array — what intermediate structure lets
   you build the result character by character?
2. Iterating from the *last* character to the *first*, appending each
   one to a growing result, naturally produces the reversed order.
3. Alternatively, convert to a character array first, then use two
   pointers (one at each end) to swap characters toward the middle — the
   same in-place technique used for reversing an array — before joining
   back into a string.

## Algorithm

**Pattern:** manual iteration building a new string in reverse order
(or two-pointer in-place swap on a character array).
**Core insight:** since strings are immutable in JavaScript, "reversing"
really means constructing an entirely new string. Walking the original
string from its last index down to its first and appending each
character to an accumulator directly produces the characters in
reversed order — no separate reversal step is needed afterward, since
the order emerges naturally from the direction of iteration.
**Invariant:** after processing index `i` (walking backward from the
end), `result` holds every character from `s[i..end]`, already in
correct reversed order.

## Dry Run

**Input:** `s = "hello"`

| i (from end) | s[i] | result after append |
|---|---|---|
| 4 | `o` | `"o"` |
| 3 | `l` | `"ol"` |
| 2 | `l` | `"oll"` |
| 1 | `e` | `"olle"` |
| 0 | `h` | `"olleh"` |

**Result:** `"olleh"` — matches expected output.

## JavaScript Solution

```js
function reverseStringManually(s) {
  let result = '';

  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }

  return result;
}
```

## TypeScript Solution

```ts
function reverseStringManually(s: string): string {
  let result = '';

  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }

  return result;
}
```

## Time Complexity

O(n) — every character is visited and appended exactly once.

## Space Complexity

O(n) — the result string holds all `n` characters.

## Common Mistakes

- Using `.split('').reverse().join('')` — works, but relies on the exact
  built-in the exercise asks you to avoid, and doesn't demonstrate manual
  character-level manipulation.
- Building the result with repeated string concatenation in a
  performance-sensitive, very-large-string context without recognizing
  that some engines handle this less efficiently than an array-join
  approach — worth mentioning as a real-world scaling consideration.
- Off-by-one on the starting index — `s.length - 1` is the last valid
  index, not `s.length`.

## Interview Follow-up Questions

1. How would you reverse the string in-place using a mutable character
   array and two pointers, instead of building a new string via
   concatenation?
2. How would you reverse only the words in a sentence, keeping each
   word's own letters in order? (See [Reverse Words in a String](../strings/reverse-words-in-a-string.md).)
3. How would Unicode surrogate pairs (characters outside the Basic
   Multilingual Plane) complicate a naive character-by-character
   reversal?

## Similar Questions

- Reverse Words in a String (see [../strings/reverse-words-in-a-string.md](../strings/reverse-words-in-a-string.md))
- Valid Palindrome (see [../strings/valid-palindrome.md](../strings/valid-palindrome.md))
- Rotate Array (see [../arrays/rotate-array.md](../arrays/rotate-array.md))

---
[← Back to 65-dsa](../README.md)
