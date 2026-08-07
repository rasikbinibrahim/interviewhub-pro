# PF040 · Valid Parentheses Expression Stack Matcher

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** stack, string, matching

## Problem Statement

Write a function `isValid(s)` that returns `true` if `s`, a string
containing only the characters `(){}[]`, has every bracket correctly
matched and properly nested, and `false` otherwise.

## Input

`s`: a string containing only `(`, `)`, `{`, `}`, `[`, `]`.

## Output

A boolean: `true` if every bracket is validly matched and nested,
`false` otherwise.

## Constraints

`0 <= s.length <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `"()[]{}"` | `true` | Every bracket type is opened and closed in order |
| `"(]"` | `false` | `(` is closed by the wrong bracket type, `]` |
| `"([)]"` | `false` | Brackets overlap incorrectly — `(` opens before `[` closes |

## Edge Cases

- Empty string → `true` (vacuously valid — nothing unmatched)
- A single opening bracket with no closer (`"("`) → `false`
- A single closing bracket with no opener (`")"`) → `false`
- Correctly matched but interleaved incorrectly (`"([)]"`) → `false`,
  since proper nesting (not just equal counts) is required

## Hints

1. Just counting opening and closing brackets isn't enough — `"([)]"`
   has equal counts of every bracket type but still isn't validly
   nested. What data structure naturally enforces "most recently opened,
   first closed" ordering?
2. Push every opening bracket onto a stack. When you see a closing
   bracket, it must match whatever is currently on *top* of the stack —
   the most recently opened, unclosed bracket.
3. At the very end, the stack must be completely empty — any bracket
   left on it means it was opened but never closed.

## Algorithm

**Pattern:** stack-based bracket matching.
**Core insight:** valid nesting means brackets close in the exact
reverse order they were opened — which is precisely the Last-In-
First-Out behavior a stack provides for free. Pushing every opening
bracket and, on each closing bracket, checking it against whatever is
currently on top of the stack (rather than just tallying counts)
correctly rejects interleaved-but-count-balanced strings like `"([)]"`,
because the top of the stack at the moment `)` is seen would be `[`, not
`(`, immediately signaling a mismatch.
**Invariant:** at any point during the scan, the stack (bottom to top)
holds exactly the sequence of opening brackets that have been seen but
not yet validly closed, in the order they were opened.

## Dry Run

**Input:** `s = "([)]"`

| char | is closing bracket? | stack before | check | result |
|---|---|---|---|---|
| `(` | no | `[]` | push `(` | stack: `['(']` |
| `[` | no | `['(']` | push `[` | stack: `['(', '[']` |
| `)` | yes | `['(', '[']` | pop `'['`, compare to `map[')'] = '('` → mismatch | return `false` |

**Result:** `false` — matches expected output (the `)` doesn't match the
most recently opened `[`).

## JavaScript Solution

```js
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
```

## TypeScript Solution

```ts
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
```

## Time Complexity

O(n) — a single pass through the string, with O(1) push/pop per
character.

## Space Complexity

O(n) — in the worst case (all opening brackets, e.g. `"((((("`), the
stack holds every character.

## Common Mistakes

- Counting opening and closing brackets separately and comparing totals
  — incorrectly accepts strings like `"([)]"`, which have balanced
  counts but invalid nesting order.
- Forgetting the `stack.length === 0` guard before popping — calling
  `.pop()` on an empty stack (e.g. for input `")"`, an unmatched closer
  with nothing pushed yet) returns `undefined`, which happens to not
  equal any real bracket, but relying on that implicitly instead of
  checking explicitly is fragile and easy to break during a refactor.
- Forgetting the final `stack.length === 0` check — without it, an
  input like `"((("` (only openers, never closed) would incorrectly
  return `true`, since the loop never hits a mismatch, but leaves
  brackets unclosed on the stack.

## Interview Follow-up Questions

1. How would you extend this to also validate other paired delimiters,
   like matching HTML tags?
2. How would you modify this to return the *index* of the first invalid
   or unmatched character, instead of just `true`/`false`?
3. How would you check validity for a string that may also contain other
   characters (letters, digits) interspersed among the brackets?

## Similar Questions

- Flatten Nested Array (Iterative Stack) (see [pf029-flatten-nested-array-iterative.md](pf029-flatten-nested-array-iterative.md))
- Min Stack Design (see [../65-dsa/stack/](../65-dsa/stack/))

---
[← Back to Programming Fundamentals](README.md)
