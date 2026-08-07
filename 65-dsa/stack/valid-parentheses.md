# Q6520 · Valid Parentheses (Stack Pattern)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, strings, matching-brackets  

## Problem Statement

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Input

- `s`: `string` — input string of bracket characters

## Output

- `boolean` — `true` if valid, `false` otherwise

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "()"` | `true` | Single matching pair |
| `s = "()[]{}"` | `true` | Multiple adjacent valid pairs |
| `s = "(]"` | `false` | Mismatched closing bracket type |

## Edge Cases

- Odd length string (`s.length % 2 !== 0`) -> immediately return `false`
- Starts with closing bracket `")("` -> returns `false`

## Hints

1. Use a Stack (array with `.push()` and `.pop()`).
2. Iterate through characters in `s`.
3. If opening bracket (`'('`, `'{'`, `'['`), push its expected closing bracket (`')'`, `'}'`, `']'`) onto the stack.
4. If closing bracket, pop from stack and check if popped value matches current character. If not, return `false`.
5. At the end, return `stack.length === 0`.

## Algorithm

**Pattern:** Last-In-First-Out (LIFO) Stack Matching  
**Core Insight:** Push expected closing brackets onto the stack when encountering opening brackets. Matching closing brackets against the top of the stack enforces nested ordering rules.

## Dry Run

`s = "{[]}"`:
- `i = 0 ('{')`: push `'}'` -> `stack = ['}']`.
- `i = 1 ('[')`: push `']'` -> `stack = ['}', ']']`.
- `i = 2 (']')`: pop `']'`, matches `']'` -> `stack = ['}']`.
- `i = 3 ('}')`: pop `'}'`, matches `'}'` -> `stack = []`.
- Loop ends. `stack.length === 0` -> return `true`.

## JavaScript Solution

```js
function isValid(s) {
  if (s.length % 2 !== 0) {
    return false;
  }

  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (map[char]) {
      // Opening bracket: push matching closing bracket
      stack.push(map[char]);
    } else {
      // Closing bracket: pop and compare
      if (stack.pop() !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

## TypeScript Solution

```ts
function isValid(s: string): boolean {
  if (s.length % 2 !== 0) {
    return false;
  }

  const stack: string[] = [];
  const map: Record<string, string> = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (map[char]) {
      stack.push(map[char]);
    } else {
      if (stack.pop() !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

## Time Complexity

`O(N)` — single linear scan through input string `s`.

## Space Complexity

`O(N)` — worst-case stack space for string composed entirely of opening brackets (`"((((("`).

## Common Mistakes

- Forgetting to check `stack.length === 0` at the end, returning `true` for unclosed opening brackets like `"((("`.

## Follow-Up Questions

1. How would you solve Minimum Add to Make Parentheses Valid?

## Similar Questions

- Generate Parentheses
- Minimum Remove to Make Valid Parentheses
