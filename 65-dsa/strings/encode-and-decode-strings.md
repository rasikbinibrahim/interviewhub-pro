# Q6539 · Encode and Decode Strings (Length-Prefix Encoding)

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, design, encoding, decoding, length-prefix  

## Problem Statement

Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and decoded back to the original list of strings.

Please implement `encode` and `decode`:
- `encode(strs)`: Converts `string[]` into a single serialized `string`.
- `decode(s)`: Converts the serialized `string` back into `string[]`.

## Input

- `strs`: `string[]` — array of input strings (can contain any ASCII characters including spaces, commas, numbers, or symbols)

## Output

- `string[]` — original reconstructed array of strings

## Constraints

- `0 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of any valid UTF-8/ASCII characters.

## Examples

| Input | Output | Why |
|---|---|---|
| `strs = ["lint","code","love","you"]` | `["lint","code","love","you"]` | Encodes to `"4#lint4#code4#love3#you"`, decodes back accurately |
| `strs = ["we", "say", ":", "yes"]` | `["we", "say", ":", "yes"]` | Handles special delimiter characters inside strings |
| `strs = [""]` | `[""]` | Handles empty string in list |

## Edge Cases

- Empty input array `[]`
- Array containing empty strings `["", ""]`
- Strings containing numeric digits and `#` symbols (`["4#lint", "code#"]`)

## Hints

1. **Delimiter Escaping Flaw**: Naive joiners like `strs.join(',')` fail when string elements themselves contain commas `,`.
2. **Length-Prefix Encoding Pattern**: Prefix each string element with its character length followed by a non-numeric delimiter like `#`.
   - Format: `<length>#<string>`
   - Example: `["hello", "world"]` -> `"5#hello5#world"`.
3. **Decoding**: Parse the integer length before `#`, jump ahead by `<length>` characters to slice the substring, and repeat.

## Algorithm

**Pattern:** Stateless Length-Prefix Framing Protocol  
**Core Insight:** Encoding the length integer before a delimiter guarantees that decoding reads exactly the intended number of bytes, making the encoding immune to arbitrary symbols inside string content.

## Dry Run

`strs = ["4#lint", "code"]`:
- `encode`: `"6#4#lint4#code"`.
- `decode("6#4#lint4#code")`:
  - Find `#` at index 1 -> length = 6. Slice 6 chars from index 2 (`"4#lint"`). Push `"4#lint"`.
  - Next index = 8. Find `#` at index 9 -> length = 4. Slice 4 chars from index 10 (`"code"`). Push `"code"`.
- Result: `["4#lint", "code"]`.

## JavaScript Solution

```js
function encode(strs) {
  let result = '';
  for (const str of strs) {
    result += `${str.length}#${str}`;
  }
  return result;
}

function decode(s) {
  const result = [];
  let i = 0;

  while (i < s.length) {
    const hashIndex = s.indexOf('#', i);
    const length = parseInt(s.substring(i, hashIndex), 10);
    
    const str = s.substring(hashIndex + 1, hashIndex + 1 + length);
    result.push(str);

    i = hashIndex + 1 + length;
  }

  return result;
}
```

## TypeScript Solution

```ts
function encode(strs: string[]): string {
  let result = '';
  for (const str of strs) {
    result += `${str.length}#${str}`;
  }
  return result;
}

function decode(s: string): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < s.length) {
    const hashIndex = s.indexOf('#', i);
    const length = parseInt(s.substring(i, hashIndex), 10);

    const str = s.substring(hashIndex + 1, hashIndex + 1 + length);
    result.push(str);

    i = hashIndex + 1 + length;
  }

  return result;
}
```

## Time Complexity

`O(N)` — where `N` is the total character count across all strings.

## Space Complexity

`O(N)` — space to store encoded string and decoded output array.

## Common Mistakes

- Using simple character splitting `s.split(',')` which corrupts array items containing commas `,`.

## Follow-Up Questions

1. How do network transport protocols like HTTP/2 (Chunked Transfer Encoding) use length-prefix frames?

## Similar Questions

- Serialize and Deserialize Binary Tree
- Decode String
