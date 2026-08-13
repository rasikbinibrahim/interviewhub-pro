# QADVJS060 · Implement JSON.parse from Scratch

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Microsoft, Amazon
**Interview Frequency:** ★★★☆☆
**Category:** JavaScript → Parsing / Recursive Descent
**Concepts:** recursive descent parsing, cursor-based scanning, string escape handling, JSON number grammar

## Problem Statement

Implement `parseJSON(jsonString)`, a function that takes a JSON-formatted
string and returns the equivalent JavaScript value — object, array, string,
number, boolean, or `null` — **without calling the native `JSON.parse`**.
The parser must correctly handle arbitrarily nested objects and arrays,
string escape sequences (`\"`, `\\`, `\/`, `\n`, `\t`, `\r`, `\b`, `\f`, and
`\uXXXX` unicode escapes), numbers in every valid JSON form (integers,
negative numbers, decimals, and exponent notation like `1e10` or `-2.5E-3`),
and insignificant whitespace between tokens. Malformed input should throw,
the same way native `JSON.parse` does.

## Input

A single string, `jsonString`, expected to contain one valid JSON value at
the top level (an object, array, string, number, `true`, `false`, or
`null`).

## Output

The parsed JavaScript value corresponding to `jsonString`: a plain object,
an array, a string, a number, a boolean, or `null` — mirroring exactly what
`JSON.parse(jsonString)` would return for well-formed input.

## Constraints

- Input is assumed to be a single top-level JSON value; trailing
  non-whitespace characters after that value are invalid and must throw.
- Whitespace (spaces, tabs, newlines, carriage returns) may appear between
  any two tokens and must be ignored — not just leading/trailing whitespace.
- This implementation assumes reasonably well-formed input per the JSON
  grammar; it does not need to reproduce every last validation the spec
  requires (e.g. rejecting a leading zero like `01`) as long as it correctly
  parses standard, valid JSON and throws on the malformed inputs explicitly
  covered in Edge Cases below.
- No use of the native `JSON.parse` anywhere in the implementation.

## Examples

| Input | Output | Why |
|---|---|---|
| `'{"x":1,"y":[2,3]}'` | `{ x: 1, y: [2, 3] }` | A nested object containing a number and an array, parsed recursively |
| `'"line1\\nline2"'` | `'line1\nline2'` | The `\n` escape sequence inside the JSON string must become an actual newline character, not the two literal characters `\` and `n` |
| `'[-1.5e2, true, null]'` | `[-150, true, null]` | Exponent notation is evaluated to its numeric value, and the JSON literals `true`/`null` become their JS equivalents |

## Edge Cases

- Empty object (`'{}'`) and empty array (`'[]'`) → return `{}` / `[]`
  without attempting to parse any key/value or element.
- Deeply nested structures (`'{"a":{"b":{"c":[1,2,[3,4]]}}}'`) → recursion
  must correctly return control to the right enclosing parser at each level.
- Unicode escapes (`'"\\u00e9"'` → `'é'`) → the four hex digits following
  `\u` must be parsed and converted to the corresponding character.
- Whitespace scattered between every kind of token, not just around the
  outside (`'{ "a" : 1 , "b" : 2 }'`) → must parse identically to the
  tightly-packed equivalent.
- Malformed input (unterminated string, mismatched brackets, trailing comma,
  missing colon, trailing garbage after a valid value) → must throw a
  `SyntaxError`, matching native `JSON.parse`'s behavior of failing loudly
  rather than returning a partial or best-effort result.

## Hints

1. Rather than one large function trying to handle every case, write one
   function per JSON value type (object, array, string, number, literal)
   plus a single "parse whatever value comes next" dispatcher — what shared
   piece of state do all of these functions need to coordinate through as
   they consume the string?
2. The dispatcher's job is simple: look at the next non-whitespace
   character to decide which value type is starting (`{` → object, `[` →
   array, `"` → string, a digit or `-` → number, otherwise check for the
   literal words `true`/`false`/`null`), then delegate to that type's parser
   and let it consume exactly the characters that belong to it.
3. Objects and arrays are inherently recursive — every value found inside
   `{...}` or `[...]` should be parsed by calling the *same* "parse any
   value" dispatcher again. That single recursive call is what lets deeply
   nested structures "just work" without special-casing depth anywhere.

## Algorithm

**Pattern:** recursive descent parsing over a shared, mutable cursor
position — no separate tokenizing pass is needed first, since JSON's
grammar is simple enough to parse directly, character by character, against
a single shared `index` variable closed over by every helper function.
**Core insight:** every JSON value starts with a character (or word) that
uniquely identifies its type — `{`, `[`, `"`, a digit/`-`, or the literals
`true`/`false`/`null` — so a single dispatcher function, `parseValue`, can
always tell which specialized parser to call next just by looking at the
current character. Each specialized parser (`parseObject`, `parseArray`,
`parseString`, `parseNumber`) is responsible for consuming *exactly* the
characters that belong to its value and advancing the shared cursor past
them — no more, no less — so that whichever function called it can
correctly continue from exactly where it left off. `parseObject` and
`parseArray` are the recursive cases: every key's value, and every array
element, is parsed by calling `parseValue` again, which is what lets the
same small set of functions handle arbitrarily deep nesting.
**Invariant:** immediately before and after every parser function runs, the
shared cursor points at the first character that has *not yet* been
consumed — no function ever leaves the cursor in the middle of a token it
was responsible for.

## Dry Run

**Input:** `'{"x":1,"y":[2,3]}'`

| Step | Cursor before | Action | Value produced | Cursor after |
|---|---|---|---|---|
| 1 | 0 (`{`) | `parseValue` sees `{` → delegates to `parseObject`; consume `{` | — | 1 |
| 2 | 1 (`"`) | `parseString` consumes `"x"` | key `'x'` | 4 |
| 3 | 4 (`:`) | consume `:` | — | 5 |
| 4 | 5 (`1`) | `parseValue` → `parseNumber` consumes `1` | `1` | 6 |
| 5 | 6 (`,`) | consume `,`, loop for next key | — | 7 |
| 6 | 7 (`"`) | `parseString` consumes `"y"` | key `'y'` | 10 |
| 7 | 10 (`:`) | consume `:` | — | 11 |
| 8 | 11 (`[`) | `parseValue` sees `[` → delegates to `parseArray`; consume `[` | — | 12 |
| 9 | 12 (`2`) | `parseValue` → `parseNumber` consumes `2` | `2` | 13 |
| 10 | 13 (`,`) | consume `,`, loop for next element | — | 14 |
| 11 | 14 (`3`) | `parseValue` → `parseNumber` consumes `3` | `3` | 15 |
| 12 | 15 (`]`) | consume `]`, array complete → `[2, 3]` | `[2, 3]` | 16 |
| 13 | 16 (`}`) | consume `}`, object complete | `{ x: 1, y: [2, 3] }` | 17 |
| 14 | 17 (end) | top level: no non-whitespace characters remain | — | — |

**Result:** `{ x: 1, y: [2, 3] }` — matches `JSON.parse('{"x":1,"y":[2,3]}')`.

## JavaScript Solution

```js
function parseJSON(jsonString) {
  let index = 0; // shared cursor, closed over by every helper below

  function parseValue() {
    skipWhitespace();
    const char = jsonString[index];

    if (char === '{') return parseObject();
    if (char === '[') return parseArray();
    if (char === '"') return parseString();
    if (char === '-' || isDigit(char)) return parseNumber();
    if (jsonString.startsWith('true', index)) {
      index += 4;
      return true;
    }
    if (jsonString.startsWith('false', index)) {
      index += 5;
      return false;
    }
    if (jsonString.startsWith('null', index)) {
      index += 4;
      return null;
    }

    throw new SyntaxError(`Unexpected token '${char}' at position ${index}`);
  }

  function parseObject() {
    const result = {};
    index++; // consume '{'
    skipWhitespace();

    if (jsonString[index] === '}') {
      index++;
      return result;
    }

    while (true) {
      skipWhitespace();
      const key = parseString(); // object keys are always JSON strings
      skipWhitespace();

      if (jsonString[index] !== ':') {
        throw new SyntaxError(`Expected ':' at position ${index}`);
      }
      index++; // consume ':'

      result[key] = parseValue(); // recursive case
      skipWhitespace();

      if (jsonString[index] === ',') {
        index++;
        continue;
      }
      if (jsonString[index] === '}') {
        index++;
        break;
      }
      throw new SyntaxError(`Expected ',' or '}' at position ${index}`);
    }

    return result;
  }

  function parseArray() {
    const result = [];
    index++; // consume '['
    skipWhitespace();

    if (jsonString[index] === ']') {
      index++;
      return result;
    }

    while (true) {
      result.push(parseValue()); // recursive case
      skipWhitespace();

      if (jsonString[index] === ',') {
        index++;
        continue;
      }
      if (jsonString[index] === ']') {
        index++;
        break;
      }
      throw new SyntaxError(`Expected ',' or ']' at position ${index}`);
    }

    return result;
  }

  function parseString() {
    if (jsonString[index] !== '"') {
      throw new SyntaxError(`Expected '"' at position ${index}`);
    }
    index++; // consume opening quote

    let result = '';
    while (jsonString[index] !== '"') {
      if (index >= jsonString.length) {
        throw new SyntaxError('Unterminated string in JSON');
      }

      const char = jsonString[index];
      if (char === '\\') {
        index++; // move past the backslash, onto the escape character
        const escapeChar = jsonString[index];
        switch (escapeChar) {
          case '"': result += '"'; break;
          case '\\': result += '\\'; break;
          case '/': result += '/'; break;
          case 'n': result += '\n'; break;
          case 't': result += '\t'; break;
          case 'r': result += '\r'; break;
          case 'b': result += '\b'; break;
          case 'f': result += '\f'; break;
          case 'u': {
            const hexDigits = jsonString.slice(index + 1, index + 5);
            result += String.fromCharCode(parseInt(hexDigits, 16));
            index += 4; // move past the 4 hex digits (loop's index++ below covers the 'u')
            break;
          }
          default:
            throw new SyntaxError(`Invalid escape character '\\${escapeChar}'`);
        }
        index++; // move past the escape character itself
      } else {
        result += char;
        index++;
      }
    }

    index++; // consume closing quote
    return result;
  }

  function parseNumber() {
    const start = index;

    if (jsonString[index] === '-') index++;
    while (isDigit(jsonString[index])) index++;

    if (jsonString[index] === '.') {
      index++;
      while (isDigit(jsonString[index])) index++;
    }

    if (jsonString[index] === 'e' || jsonString[index] === 'E') {
      index++;
      if (jsonString[index] === '+' || jsonString[index] === '-') index++;
      while (isDigit(jsonString[index])) index++;
    }

    // The manual scan above is what's actually being tested — it fully
    // determines and validates the substring boundaries; Number() here is
    // just the incidental final string-to-number conversion of an already
    // validated numeric substring, not a shortcut around the parsing logic.
    return Number(jsonString.slice(start, index));
  }

  function isDigit(char) {
    return char >= '0' && char <= '9';
  }

  function skipWhitespace() {
    while (index < jsonString.length && /\s/.test(jsonString[index])) {
      index++;
    }
  }

  const result = parseValue();
  skipWhitespace();
  if (index !== jsonString.length) {
    throw new SyntaxError(`Unexpected trailing characters at position ${index}`);
  }
  return result;
}
```

## TypeScript Solution

```ts
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

function parseJSON(jsonString: string): JSONValue {
  let index = 0;

  function parseValue(): JSONValue {
    skipWhitespace();
    const char = jsonString[index];

    if (char === '{') return parseObject();
    if (char === '[') return parseArray();
    if (char === '"') return parseString();
    if (char === '-' || (char !== undefined && isDigit(char))) return parseNumber();
    if (jsonString.startsWith('true', index)) {
      index += 4;
      return true;
    }
    if (jsonString.startsWith('false', index)) {
      index += 5;
      return false;
    }
    if (jsonString.startsWith('null', index)) {
      index += 4;
      return null;
    }

    throw new SyntaxError(`Unexpected token '${String(char)}' at position ${index}`);
  }

  function parseObject(): { [key: string]: JSONValue } {
    const result: { [key: string]: JSONValue } = {};
    index++;
    skipWhitespace();

    if (jsonString[index] === '}') {
      index++;
      return result;
    }

    while (true) {
      skipWhitespace();
      const key = parseString();
      skipWhitespace();

      if (jsonString[index] !== ':') {
        throw new SyntaxError(`Expected ':' at position ${index}`);
      }
      index++;

      result[key] = parseValue();
      skipWhitespace();

      if (jsonString[index] === ',') {
        index++;
        continue;
      }
      if (jsonString[index] === '}') {
        index++;
        break;
      }
      throw new SyntaxError(`Expected ',' or '}' at position ${index}`);
    }

    return result;
  }

  function parseArray(): JSONValue[] {
    const result: JSONValue[] = [];
    index++;
    skipWhitespace();

    if (jsonString[index] === ']') {
      index++;
      return result;
    }

    while (true) {
      result.push(parseValue());
      skipWhitespace();

      if (jsonString[index] === ',') {
        index++;
        continue;
      }
      if (jsonString[index] === ']') {
        index++;
        break;
      }
      throw new SyntaxError(`Expected ',' or ']' at position ${index}`);
    }

    return result;
  }

  function parseString(): string {
    if (jsonString[index] !== '"') {
      throw new SyntaxError(`Expected '"' at position ${index}`);
    }
    index++;

    let result = '';
    while (jsonString[index] !== '"') {
      if (index >= jsonString.length) {
        throw new SyntaxError('Unterminated string in JSON');
      }

      const char = jsonString[index];
      if (char === '\\') {
        index++;
        const escapeChar = jsonString[index];
        switch (escapeChar) {
          case '"': result += '"'; break;
          case '\\': result += '\\'; break;
          case '/': result += '/'; break;
          case 'n': result += '\n'; break;
          case 't': result += '\t'; break;
          case 'r': result += '\r'; break;
          case 'b': result += '\b'; break;
          case 'f': result += '\f'; break;
          case 'u': {
            const hexDigits = jsonString.slice(index + 1, index + 5);
            result += String.fromCharCode(parseInt(hexDigits, 16));
            index += 4;
            break;
          }
          default:
            throw new SyntaxError(`Invalid escape character '\\${String(escapeChar)}'`);
        }
        index++;
      } else {
        result += char;
        index++;
      }
    }

    index++;
    return result;
  }

  function parseNumber(): number {
    const start = index;

    if (jsonString[index] === '-') index++;
    while (isDigit(jsonString[index])) index++;

    if (jsonString[index] === '.') {
      index++;
      while (isDigit(jsonString[index])) index++;
    }

    if (jsonString[index] === 'e' || jsonString[index] === 'E') {
      index++;
      if (jsonString[index] === '+' || jsonString[index] === '-') index++;
      while (isDigit(jsonString[index])) index++;
    }

    return Number(jsonString.slice(start, index));
  }

  function isDigit(char: string | undefined): boolean {
    return char !== undefined && char >= '0' && char <= '9';
  }

  function skipWhitespace(): void {
    while (index < jsonString.length && /\s/.test(jsonString[index] as string)) {
      index++;
    }
  }

  const result = parseValue();
  skipWhitespace();
  if (index !== jsonString.length) {
    throw new SyntaxError(`Unexpected trailing characters at position ${index}`);
  }
  return result;
}
```

## Time Complexity

O(n), where n is the length of `jsonString` — the cursor only ever moves
forward, and every character is examined a constant number of times across
`skipWhitespace` and whichever single value-parser consumes it. No
character is ever re-scanned from an earlier position.

## Space Complexity

O(n + d), where n is the size of the resulting parsed structure (objects,
arrays, and strings all need space proportional to their contents) and d is
the maximum nesting depth of the input — each level of nested object/array
adds one frame to the recursive call stack (`parseValue` → `parseObject`/
`parseArray` → `parseValue` → ...).

## Common Mistakes

- Mishandling escape sequences — forgetting `\"` lets an escaped quote
  prematurely end a string; forgetting `\uXXXX` unicode escapes silently
  produces garbled output instead of the correct character.
- Off-by-one cursor bugs — forgetting to advance past *both* the backslash
  and the character it escapes, or forgetting to advance past a consumed
  delimiter (`,`, `:`, `}`, `]`), which desyncs every subsequent parse step.
- Matching numbers with a single greedy regex instead of manually walking
  the JSON number grammar — easy to silently mishandle exponent notation
  (`1e10`) or a leading `-`, especially when mixed with a decimal point.
- Skipping whitespace only around the outermost value instead of between
  every token — valid-but-loosely-formatted JSON like `'{ "a" : 1 }'` then
  fails to parse even though it's perfectly legal.
- Not verifying the *entire* input was consumed at the end — silently
  accepting `'{"a":1}garbage'` as if the trailing text weren't there,
  instead of throwing like native `JSON.parse` does.

## Interview Follow-up Questions

1. How would you enhance error messages to report a line and column number
   instead of a raw character index?
2. How would you support a `reviver` function, like native
   `JSON.parse(text, reviver)`, that transforms each parsed value bottom-up
   before it's attached to its parent?
3. How would you turn this into a streaming/incremental parser that can
   consume a JSON value from chunks of a `ReadableStream` without holding
   the entire string in memory at once?
4. What's the architectural difference between this single-pass, character-
   driven recursive descent parser and a proper two-phase design (a
   separate tokenizer producing a token stream, then a parser consuming
   tokens) — when would the two-phase version be worth the extra
   complexity?
5. What does native `JSON.parse` do with duplicate keys in an object (e.g.
   `'{"a":1,"a":2}'`), and does this implementation match that behavior?

## Similar Questions

- [Implement JSON.stringify from Scratch](implement-json-stringify-from-scratch.md)
- [Implement a Mini HTML Tokenizer](implement-mini-html-tokenizer.md)
- Implement a simple arithmetic expression parser/evaluator (recursive
  descent over `+`, `-`, `*`, `/`, and parentheses)

---
[← Back to 61-javascript-coding](README.md)
