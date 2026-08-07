# Q6640 · Longest Substring Without Repeating Characters (Sliding Window)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** String
**Concepts:** string, sliding-window, hash-map, two-pointers

## Problem Statement

Write a function `lengthOfLongestSubstring(s)` that returns the length
of the longest contiguous substring of `s` that contains no repeated
characters.

## Input

`s`: a string.

## Output

A single number: the length of the longest substring with all distinct
characters.

## Constraints

`0 <= s.length <= 5*10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `"abcabcbb"` | `3` | `"abc"` is the longest substring with no repeats |
| `"bbbbb"` | `1` | Every substring longer than 1 character repeats `'b'` |
| `""` | `0` | An empty string has no substrings at all |

## Edge Cases

- Empty string → `0`
- Every character identical → `1`
- Every character distinct → the full string length
- Repeated character reappears *before* the current window's left
  boundary → must not incorrectly shrink the window, since that
  occurrence is no longer relevant to the current window

## Hints

1. Checking every substring for repeated characters is O(n²) or
   worse — what if you maintained a *window* of the current
   no-repeats substring and grew or shrank it as you scanned left to
   right?
2. Track the most recent index at which each character was seen. When
   you encounter a character you've seen before, and that previous
   occurrence is still *within* the current window, jump the window's
   left boundary to just past that previous occurrence.
3. After handling a potential repeat, update the character's most
   recent index and compare the current window's size against the best
   length found so far.

## Algorithm

**Pattern:** sliding window with a "last seen index" hash map.
**Core insight:** rather than shrinking the window one character at a
time whenever a repeat is found, you can jump the window's left boundary
directly to just after the repeated character's *previous* occurrence —
since every character between the old left boundary and that previous
occurrence is guaranteed not to be the repeat itself, and can safely
remain in the window. Crucially, the previous occurrence only matters if
it's still within the current window (`charMap.get(char) >= left`); an
old occurrence that's already outside the window (further left than the
current boundary) is irrelevant and must not trigger a jump.
**Invariant:** at all times, the substring `s[left..right]` contains no
repeated characters, and `maxLen` holds the length of the longest such
window found in `s[0..right]`.

## Dry Run

**Input:** `s = "abcabcbb"`

| right | char | seen before, within window? | left after | maxLen after |
|---|---|---|---|---|
| 0 | a | no | 0 | 1 |
| 1 | b | no | 0 | 2 |
| 2 | c | no | 0 | 3 |
| 3 | a | yes (index 0 ≥ left 0) | 1 | 3 |
| 4 | b | yes (index 1 ≥ left 1) | 2 | 3 |
| 5 | c | yes (index 2 ≥ left 2) | 3 | 3 |
| 6 | b | yes (index 4 ≥ left 3) | 5 | 3 |
| 7 | b | yes (index 6 ≥ left 5) | 7 | 3 |

**Result:** `maxLen = 3` — matches expected output (the window `"abc"`).

## JavaScript Solution

```js
function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }
    charMap.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## TypeScript Solution

```ts
function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char: string = s[right];
    if (charMap.has(char) && charMap.get(char)! >= left) {
      left = charMap.get(char)! + 1;
    }
    charMap.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## Time Complexity

O(n) — each character is visited once by the `right` pointer, with O(1)
map operations per character.

## Space Complexity

O(min(n, alphabet size)) — the map holds at most one entry per distinct
character encountered.

## Common Mistakes

- Checking every substring explicitly (e.g. two nested loops plus a
  set-based repeat check) — correct but O(n²) or O(n³), far slower than
  the sliding window's O(n).
- Forgetting the `charMap.get(char) >= left` check before jumping the
  window's left boundary — without it, an old occurrence of a character
  that's already outside the current window incorrectly forces the
  window to shrink, even though it isn't a real repeat within the
  current window.
- Shrinking the window one character at a time (incrementing `left`
  repeatedly in an inner loop) instead of jumping directly to just past
  the repeat's previous index — still correct and still O(n) amortized,
  but more code than the direct-jump version needs.

## Interview Follow-up Questions

1. How would you also return the actual longest substring, not just its
   length?
2. How would this change if you needed the longest substring with *at
   most k* repeated characters allowed, instead of zero?
3. How would you adapt this to work over a stream of characters, where
   you can't look back at earlier parts of the input?

## Similar Questions

- Group Anagrams (see [group-anagrams-hash-table.md](group-anagrams-hash-table.md))
- Sliding Window Maximum (see [../sliding-window/sliding-window-maximum-monotonic-deque.md](../sliding-window/sliding-window-maximum-monotonic-deque.md))
