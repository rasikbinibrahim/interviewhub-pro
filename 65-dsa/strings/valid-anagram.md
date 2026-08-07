# Q6519 · Valid Anagram (Frequency Hash Map)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, hashing, frequency-map, sorting  

## Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Input

- `s`: `string` — first input string
- `t`: `string` — second input string

## Output

- `boolean` — `true` if `t` is an anagram of `s`, `false` otherwise

## Constraints

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "anagram", t = "nagaram"` | `true` | Both strings contain exact character frequencies (a:3, n:1, g:1, r:1, m:1) |
| `s = "rat", t = "car"` | `false` | Character counts differ |

## Edge Cases

- `s.length !== t.length` -> immediately return `false`
- Single character strings (`s = "a", t = "a"`)

## Hints

1. Check lengths first: if `s.length !== t.length`, return `false`.
2. Maintain a character frequency counter array of size 26 or a Map.
3. Increment counts for characters in `s`, decrement counts for characters in `t`.
4. If any count ends up non-zero, return `false`.

## Algorithm

**Pattern:** Frequency Counter / Fixed Array Hashing  
**Core Insight:** Anagrams have identical character frequency distributions. Using a fixed 26-element array for lowercase English letters avoids Map allocation overhead.

## Dry Run

`s = "rat", t = "car"`:
- `s.length === t.length === 3`.
- `s[0] = 'r'`: `count['r'] = 1`
- `s[1] = 'a'`: `count['a'] = 1`
- `s[2] = 't'`: `count['t'] = 1`
- `t[0] = 'c'`: `count['c'] = -1`
- `t[1] = 'a'`: `count['a'] = 0`
- `t[2] = 'r'`: `count['r'] = 0`
- Check counts: `count['t'] = 1` (non-zero) or `count['c'] = -1` (non-zero) -> return `false`.

## JavaScript Solution

```js
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const counts = new Array(26).fill(0);
  const codeA = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - codeA]++;
    counts[t.charCodeAt(i) - codeA]--;
  }

  for (let i = 0; i < 26; i++) {
    if (counts[i] !== 0) {
      return false;
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  const counts: number[] = new Array(26).fill(0);
  const codeA = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - codeA]++;
    counts[t.charCodeAt(i) - codeA]--;
  }

  for (let i = 0; i < 26; i++) {
    if (counts[i] !== 0) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

`O(N)` — single pass through strings of length `N`.

## Space Complexity

`O(1)` — fixed 26-element array auxiliary space.

## Common Mistakes

- Sorting both strings `s.split('').sort().join('') === t.split('').sort().join('')`, which runs in `O(N log N)` time instead of optimal `O(N)`.

## Follow-Up Questions

1. What if the inputs contain Unicode characters? (Use a JavaScript `Map<char, number>` instead of a fixed 26-element array).

## Similar Questions

- Group Anagrams
- Find All Anagrams in a String
