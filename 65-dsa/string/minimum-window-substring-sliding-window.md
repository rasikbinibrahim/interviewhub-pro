# Q6622 · Minimum Window Substring (Sliding Window Frequency Map)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** String  
**Concepts:** string, sliding-window, hash-map, two-pointers  

## Problem Statement

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

## Algorithm

**Pattern:** Frequency Map Two-Pointer Sliding Window Expansion/Contraction  

```javascript
function minWindow(s, t) {
  if (s.length < t.length) return '';

  const map = new Map();
  for (const char of t) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  let count = map.size;
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char)) {
      map.set(char, map.get(char) - 1);
      if (map.get(char) === 0) count--;
    }

    while (count === 0) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left];
      if (map.has(leftChar)) {
        map.set(leftChar, map.get(leftChar) + 1);
        if (map.get(leftChar) > 0) count++;
      }
      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}
```

## Time & Space Complexity

- **Time Complexity:** `O(M + N)` — linear sliding window pass.
- **Space Complexity:** `O(N)` — Hash Map frequency storage.
