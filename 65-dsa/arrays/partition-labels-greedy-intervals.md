# Q6588 · Partition Labels (Greedy String Interval Splitting)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, greedy, two-pointers, strings, intervals  

## Problem Statement

You are given a string `s`. We want to partition the string into as many parts as possible so that **each letter appears in at most one part**.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`.

Return a list of integers representing the **size of these parts**.

## Input

- `s`: `string` — string to partition

## Output

- `number[]` — array of partition substring lengths

## Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "ababcbacadefegdehijhklj"` | `[9,7,8]` | Partitions: `"ababcbaca"` (len 9), `"defegde"` (len 7), `"hijhklj"` (len 8) |
| `s = "eccbbbbdec"` | `[10]` | Entire string forms a single partition |

## Edge Cases

- All characters distinct `"abc"` -> returns `[1, 1, 1]`

## Hints

1. **Last Occurrence Mapping**:
   - Store the **last index** of each character in `s` using a Hash Map or 26-element array `lastMap`.
2. Iterate `i` from `0` to `s.length - 1`:
   - Extend current partition boundary `end = Math.max(end, lastMap[s[i]])`.
   - If current index reaches boundary `i === end`:
     - Partition complete! Append length `end - start + 1` to `result`.
     - Reset `start = i + 1`.

## Algorithm

**Pattern:** Last Occurrence Greedy Boundary Expansion  
**Core Insight:** Tracking the furthest rightmost occurrence of characters in the active window expands partition boundaries greedy-style until no contained characters appear further right in the string.

## Dry Run

`s = "ababcbacadefegdehijhklj"`:
- `lastMap['a'] = 8, lastMap['b'] = 5, lastMap['c'] = 7, lastMap['d'] = 14...`
- `i = 0 ('a')`: `end = max(0, 8) = 8`.
- `i = 1...7`: `end` stays 8.
- `i = 8 ('a')`: `i === end (8)`. Append length `8 - 0 + 1 = 9`. Reset `start = 9`.
- Process next section `"defegde"` -> len 7.
- Process next section `"hijhklj"` -> len 8.
- Return `[9, 7, 8]`.

## JavaScript Solution

```js
function partitionLabels(s) {
  const lastMap = new Array(26).fill(0);

  // Step 1: Record last index of each character
  for (let i = 0; i < s.length; i++) {
    lastMap[s.charCodeAt(i) - 97] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  // Step 2: Greedy boundary expansion
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastMap[s.charCodeAt(i) - 97]);

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function partitionLabels(s: string): number[] {
  const lastMap: number[] = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    lastMap[s.charCodeAt(i) - 97] = i;
  }

  const result: number[] = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastMap[s.charCodeAt(i) - 97]);

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
}
```

## Time Complexity

`O(N)` — two linear passes through string of length $N$.

## Space Complexity

`O(1)` — fixed 26-element array space.

## Common Mistakes

- Setting `start = i` instead of `start = i + 1` after completing a partition, causing off-by-one length errors.

## Follow-Up Questions

1. How can Merge Overlapping Intervals solve this problem by converting characters into `[firstIndex, lastIndex]` intervals?

## Similar Questions

- Merge Intervals
- Non-overlapping Intervals
