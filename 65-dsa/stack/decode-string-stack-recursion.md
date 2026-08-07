# Q6607 · Decode String (Stack Parsing & Expansion)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, recursion, string-parsing  

## Problem Statement

Given an encoded string `s`, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

## Input

- `s`: `string` — encoded format string

## Output

- `string` — decoded full string

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "3[a]2[bc]"` | `"aaabcbc"` | "a" repeated 3x + "bc" repeated 2x |
| `s = "3[a2[c]]"` | `"accaccacc"` | Nested expansion "a" + "cc" = "acc" repeated 3x |

## Algorithm

**Pattern:** Two Stack Symbol Parsing  
**Core Insight:** Use `countStack` to track multipliers $k$ and `strStack` to track outer partial strings when encountering `[`. Upon `]`, pop $k$ and previous outer string to append repeated string.

```javascript
function decodeString(s) {
  const countStack = [];
  const strStack = [];
  let currentStr = '';
  let currentNum = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + parseInt(char, 10);
    } else if (char === '[') {
      countStack.push(currentNum);
      strStack.push(currentStr);
      currentNum = 0;
      currentStr = '';
    } else if (char === ']') {
      const repeatCount = countStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr + currentStr.repeat(repeatCount);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N \cdot \text{maxK})` — string output construction time.
- **Space Complexity:** `O(N)` — stack depth space.
