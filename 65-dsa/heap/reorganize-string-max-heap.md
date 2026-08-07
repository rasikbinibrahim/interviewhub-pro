# Q6579 · Reorganize String (Max-Heap Greedy String Rearrangement)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, greedy, hash-map, string-rearrangement  

## Problem Statement

Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are **not the same**.

Return any possible rearrange of `s` or return `""` if not possible.

## Input

- `s`: `string` — input string

## Output

- `string` — rearranged valid string, or `""` if impossible

## Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "aab"` | `"aba"` | No adjacent characters are identical |
| `s = "aaab"` | `""` | Character 'a' appears 3 times in string of length 4 (impossible) |

## Edge Cases

- `maxFreq > Math.ceil(s.length / 2)` -> **MUST BE IMPOSSIBLE!** Return `""`.

## Hints

1. **Pigeonhole Principle Check**:
   - Count character frequencies. If any character frequency exceeds `Math.ceil(s.length / 2)`, return `""`.
2. **Greedy Max-Heap / Alternating Placement**:
   - Populate frequency map into Max-Heap ordered by frequency count.
   - Pop 2 most frequent characters `(char1, freq1)` and `(char2, freq2)`.
   - Append `char1` then `char2` to output.
   - Decrement frequencies and push back into Max-Heap if `freq > 0`.
3. Alternative $O(N)$ Even/Odd Index Placement: Place most frequent character at even indices `0, 2, 4...`, then fill remaining characters.

## Algorithm

**Pattern:** Alternating Top-2 Max-Heap Character Placement  
**Core Insight:** Repeatedly pairing the two most frequent remaining characters guarantees that adjacent output characters differ without starving less frequent letters.

## Dry Run

`s = "aab"`:
- Frequencies: `a: 2, b: 1`. `maxFreq = 2 <= ceil(3/2) = 2`. Valid!
- Max-Heap: `[(a, 2), (b, 1)]`.
- Pop top 2: `(a, 2)` and `(b, 1)`.
- Append `"a"`, then `"b"`. Output: `"ab"`.
- Decrement `a`: `(a, 1)`. `b` becomes 0. Push `(a, 1)` to Heap.
- Pop remaining `(a, 1)`. Append `"a"`.
- Output: `"aba"`. Return `"aba"`.

## JavaScript Solution

```js
function reorganizeString(s) {
  const freq = new Map();
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Fast Fail Check
  const maxFreq = Math.max(...freq.values());
  if (maxFreq > Math.ceil(s.length / 2)) {
    return "";
  }

  // Frequency array sorting as Max-Heap replacement
  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
  const result = new Array(s.length);

  let idx = 0;
  for (const [char, count] of sorted) {
    for (let c = 0; c < count; c++) {
      if (idx >= s.length) {
        idx = 1; // Transition from even indices (0, 2, 4) to odd indices (1, 3, 5)
      }
      result[idx] = char;
      idx += 2;
    }
  }

  return result.join('');
}
```

## TypeScript Solution

```ts
function reorganizeString(s: string): string {
  const freq = new Map<string, number>();
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  const maxFreq = Math.max(...freq.values());
  if (maxFreq > Math.ceil(s.length / 2)) {
    return "";
  }

  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
  const result: string[] = new Array(s.length);

  let idx = 0;
  for (const [char, count] of sorted) {
    for (let c = 0; c < count; c++) {
      if (idx >= s.length) {
        idx = 1;
      }
      result[idx] = char;
      idx += 2;
    }
  }

  return result.join('');
}
```

## Time Complexity

`O(N + A log A)` — where $A \le 26$ English lowercase letters ($O(N)$ overall).

## Space Complexity

`O(N)` — to store output array and frequency maps.

## Common Mistakes

- Placing the most frequent character after odd index transitions, causing adjacent identical character collisions.

## Follow-Up Questions

1. How would you solve Task Scheduler using similar greedy frequency placement logic?

## Similar Questions

- Task Scheduler
- Rearrange String k Distance Apart
