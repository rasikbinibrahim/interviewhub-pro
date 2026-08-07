# Q6529 · Group Anagrams (Frequency Key Hashing)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, hashing, hash-map, frequency-counter  

## Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Input

- `strs`: `string[]` — array of input strings

## Output

- `string[][]` — 2D array of grouped anagram strings

## Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `strs = ["eat","tea","tan","ate","nat","bat"]` | `[["bat"],["nat","tan"],["ate","eat","tea"]]` | Strings grouped by anagram equivalence |
| `strs = [""]` | `[[""]]` | Empty string group |
| `strs = ["a"]` | `[["a"]]` | Single character |

## Edge Cases

- Empty array or strings of length 0 `[""]`
- All unique strings with no anagram pairs `["a", "b", "c"]`

## Hints

1. **Hash Key Design**: Anagrams have identical character frequency counts.
2. For each string, construct a unique hash key representation.
   - Approach A: Sort the string characters (`str.split('').sort().join('')`), taking $O(K \log K)$ per string.
   - Approach B: Build a 26-element character frequency tuple/string (e.g. `#1#0#0...`), taking $O(K)$ per string.
3. Store groups in a `Map<string, string[]>` mapping `key -> [matching strings]`.
4. Return `Array.from(map.values())`.

## Algorithm

**Pattern:** Hash Key Normalization Grouping  
**Core Insight:** Translating every string into a canonical frequency key allows $O(1)$ Hash Map lookup and grouping.

## Dry Run

`strs = ["eat", "tea", "tan"]`:
- `"eat"` -> sorted key `"aet"`. `map["aet"] = ["eat"]`.
- `"tea"` -> sorted key `"aet"`. `map["aet"] = ["eat", "tea"]`.
- `"tan"` -> sorted key `"ant"`. `map["ant"] = ["tan"]`.
- Result: `[["eat", "tea"], ["tan"]]`.

## JavaScript Solution

```js
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Construct frequency tuple key
    const count = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 97]++;
    }

    const key = count.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }
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
    const count: number[] = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 97]++;
    }

    const key = count.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}
```

## Time Complexity

`O(N * K)` — where `N` is `strs.length` and `K` is max string length.

## Space Complexity

`O(N * K)` — space for Hash Map and grouped output strings.

## Common Mistakes

- Using `count.join('')` without delimiters, causing collision bugs like `"11"` (`1 'a', 1 'b'`) matching `"11"` (`11 'a's`). Use delimiters like `#`.

## Follow-Up Questions

1. When is sorting key (`O(N * K log K)`) preferred over frequency key (`O(N * K)`)? (When `K` is very small or alphabet set is arbitrary Unicode).

## Similar Questions

- Valid Anagram
- Group Shifted Strings
