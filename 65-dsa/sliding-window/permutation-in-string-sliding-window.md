# Q6567 · Permutation in String (Fixed Sliding Window Frequency Match)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Sliding Window  
**Concepts:** sliding-window, strings, hash-map, frequency-match  

## Problem Statement

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is the **substring** of `s2`.

## Input

- `s1`: `string` — string pattern
- `s2`: `string` — target string to search within

## Output

- `boolean` — `true` if permutation of `s1` is inside `s2`, `false` otherwise

## Constraints

- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s1 = "ab", s2 = "eidbaooo"` | `true` | `s2` contains `"ba"` which is a permutation of `"ab"` |
| `s1 = "ab", s2 = "eidboaoo"` | `false` | No permutation of `"ab"` exists as a substring |

## Edge Cases

- `s1.length > s2.length` -> returns `false`
- `s1 === s2` -> returns `true`

## Hints

1. **Fixed Sliding Window of Size `L = s1.length`**:
   - Count character frequencies of `s1` into `count1` (26-element array).
2. Initialize fixed window of size `L` on `s2` into `count2`.
3. Track number of matching character frequencies `matches` (0 to 26).
4. Slide window across `s2` one character at a time:
   - Add new character at `right`: update `count2` and `matches`.
   - Remove old character at `left`: update `count2` and `matches`.
5. If `matches === 26` at any point, return `true`.

## Algorithm

**Pattern:** Fixed-Size Sliding Window Character Frequency Matches  
**Core Insight:** Maintaining an exact window size of `s1.length` and updating 26-element frequency match counts incrementally allows $O(N)$ permutation detection.

## Dry Run

`s1 = "ab", s2 = "eidbaooo"`:
- `L1 = 2`. `count1 = {a:1, b:1}`.
- Initial window `"ei"`: `count2 = {e:1, i:1}`. Matches = 24.
- Slide window to `"id"`: Matches = 24.
- Slide window to `"db"`: Matches = 24.
- Slide window to `"ba"`: `count2 = {a:1, b:1}`. Matches = 26! Return `true`.

## JavaScript Solution

```js
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }

  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches === 26) return true;

    const r = s2.charCodeAt(i + s1.length) - 97;
    const l = s2.charCodeAt(i) - 97;

    // Add right char
    count2[r]++;
    if (count1[r] === count2[r]) {
      matches++;
    } else if (count1[r] + 1 === count2[r]) {
      matches--;
    }

    // Remove left char
    count2[l]--;
    if (count1[l] === count2[l]) {
      matches++;
    } else if (count1[l] - 1 === count2[l]) {
      matches--;
    }
  }

  return matches === 26;
}
```

## TypeScript Solution

```ts
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const count1: number[] = new Array(26).fill(0);
  const count2: number[] = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }

  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches === 26) return true;

    const r = s2.charCodeAt(i + s1.length) - 97;
    const l = s2.charCodeAt(i) - 97;

    count2[r]++;
    if (count1[r] === count2[r]) {
      matches++;
    } else if (count1[r] + 1 === count2[r]) {
      matches--;
    }

    count2[l]--;
    if (count1[l] === count2[l]) {
      matches++;
    } else if (count1[l] - 1 === count2[l]) {
      matches--;
    }
  }

  return matches === 26;
}
```

## Time Complexity

`O(N)` — where `N = s2.length`.

## Space Complexity

`O(1)` — fixed 26-element array space.

## Common Mistakes

- Re-sorting or re-comparing full array strings on every window step ($O(26 \times N)$), which is slower than maintaining an active `matches` counter.

## Follow-Up Questions

1. How does this problem relate to Find All Anagrams in a String?

## Similar Questions

- Find All Anagrams in a String
- Minimum Window Substring
