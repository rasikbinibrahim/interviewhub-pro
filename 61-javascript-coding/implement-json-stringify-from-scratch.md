# QADVJS059 · Implement JSON.stringify from Scratch

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Stripe
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Serialization / Recursion
**Concepts:** recursive tree serialization, string escaping, type dispatch, cycle detection (DFS "on-path" set)

## Problem Statement

Implement `stringifyJSON(value)`, a function that takes any JavaScript
value and returns its JSON string representation — **without calling the
native `JSON.stringify`**. It must correctly handle nested objects and
arrays, string escaping, numbers, booleans, and `null`; `undefined` and
functions must be **omitted entirely** from plain object properties but
turned into `null` when they appear as array elements (array order/length
must be preserved); and a genuinely circular reference must throw a
`TypeError`, exactly like the native implementation does — that's the
*correct*, expected behavior to replicate, not a bug to work around.

## Input

`value`: any JavaScript value — a primitive (`number`, `string`, `boolean`,
`null`, `undefined`), a plain object, or an array, possibly containing any
of those nested to arbitrary depth.

## Output

A string: the JSON-formatted representation of `value`, or `undefined` if
`value` itself is not serializable at the top level (e.g. `value` is itself
a bare function or `undefined`) — matching native `JSON.stringify`'s actual
return type in that case.

## Constraints

- Circular references must be detected and must throw a `TypeError`, not
  hang in infinite recursion and not silently produce broken output.
- `undefined`, functions, and `Symbol` values are omitted from object
  properties, but become `null` inside arrays.
- `NaN`, `Infinity`, and `-Infinity` serialize as the string `'null'` —
  this is genuine, spec-mandated `JSON.stringify` behavior to replicate,
  not an error case to reject.
- No use of the native `JSON.stringify` anywhere in the implementation.

## Examples

| Input | Output | Why |
|---|---|---|
| `stringifyJSON({ a: 1, b: 'hi' })` | `'{"a":1,"b":"hi"}'` | Straightforward nested serialization of a number and a string property |
| `stringifyJSON([1, undefined, function () {}, 2])` | `'[1,null,null,2]'` | Inside an **array**, non-serializable values (`undefined`, functions) become `null` so the array's length and positions are preserved |
| `stringifyJSON({ a: 1, b: undefined, fn: function () {} })` | `'{"a":1}'` | Inside a plain **object**, non-serializable property values are dropped entirely — `b` and `fn` don't appear at all, not even as `null` |

## Edge Cases

- A genuinely circular reference (`const obj = {}; obj.self = obj;`) →
  throws `TypeError: Converting circular structure to JSON`, matching
  native behavior exactly.
- The *same* object referenced twice as **siblings**, not an ancestor of
  itself (`const shared = { x: 1 }; stringifyJSON({ a: shared, b: shared })`)
  → this is **not** circular and must serialize normally to
  `'{"a":{"x":1},"b":{"x":1}}'` — a naive "have I seen this object
  anywhere" check would incorrectly throw here.
- `NaN`/`Infinity`/`-Infinity` as a value → `'null'`, not an error and not
  omitted.
- Empty object/array (`{}` / `[]`) → `'{}'` / `'[]'`.
- A string containing quotes, backslashes, or control characters (e.g. a
  raw newline) → must be escaped correctly so the output is valid,
  re-parseable JSON.

## Hints

1. The core recursive rule is: figure out *which kind* of value you're
   looking at first (number, string, boolean, `null`, array, plain object,
   or "not serializable" like `undefined`/a function), then handle each
   kind with its own logic. What should the "not serializable" case return
   to its caller, so that different callers can react to it differently?
2. Arrays and plain objects need to react to "not serializable"
   differently: an array **must** keep its slot (as `null`, since order and
   length matter), while an object simply **omits** the whole key. A single
   sentinel return value from the recursive step — used one way by the
   array branch and another way by the object branch — is enough to support
   both rules with one shared helper function.
3. Cycle detection needs to answer "am I already in the middle of
   stringifying this exact object, somewhere up the current call stack" —
   not "have I ever seen this object anywhere in the whole structure."
   Think of the same technique used to detect a cycle in a directed graph
   via DFS: track which nodes are currently "open" (added on entry, removed
   right before returning), not which nodes have ever been visited.

## Algorithm

**Pattern:** recursive tree serialization, with cycle detection via the
classic DFS "currently on the call stack" (`ancestors`) set — the same
technique used to detect a cycle in a directed graph.
**Core insight:** every value is dispatched by `typeof`/`Array.isArray`
into exactly one serialization rule, and the "can't serialize this" case
(`undefined`, function, `Symbol`) is represented by the helper returning
the *actual* JS `undefined` — a value that can never be confused with a
real JSON output string. That sentinel lets the array branch say "if the
recursive call returned `undefined`, use `'null'` in this slot instead" and
the object branch say "if the recursive call returned `undefined`, skip
this key entirely" — two different rules, driven by one shared signal.
Cycle detection adds the current object/array reference to an `ancestors`
set the moment recursion enters it, and removes it right before returning
— so `ancestors` always reflects exactly the objects whose serialization is
currently in progress somewhere up the call stack. If recursion ever
re-enters an object that's *still* in that set, that's a genuine cycle (the
object contains itself, directly or transitively); an object appearing
twice from unrelated, already-finished branches is not a cycle, because
it's been removed from `ancestors` by the time the second reference is
reached.
**Invariant:** at any point during recursion, `ancestors` contains exactly
the object/array references whose `stringify` call has started but not yet
returned.

## Dry Run

**Input:** `stringifyJSON({ a: 1, b: undefined, c: [2, undefined] })`

| Step | Call | Action | Result of this step |
|---|---|---|---|
| 1 | `stringify(topObject)` | not null, `typeof` is `'object'`, not an array → add `topObject` to `ancestors` | (in progress) |
| 2 | key `'a'`: `stringify(1)` | number, finite → `'1'` | `entries = ['"a":1']` |
| 3 | key `'b'`: `stringify(undefined)` | `typeof` is `'undefined'` → returns `undefined` | property skipped entirely — `b` never appears |
| 4 | key `'c'`: `stringify([2, undefined])` | `Array.isArray` true → add array to `ancestors` | (in progress) |
| 4a | element `2`: `stringify(2)` | number → `'2'` | kept as-is: `'2'` |
| 4b | element `undefined`: `stringify(undefined)` | returns `undefined` | array slot replaced with `'null'` (order preserved) |
| 4c | — | remove array from `ancestors`, join items | returns `'[2,null]'` |
| 5 | — | `'[2,null]' !== undefined` → keep | `entries = ['"a":1', '"c":[2,null]']` |
| 6 | — | remove `topObject` from `ancestors`, join entries | returns `'{"a":1,"c":[2,null]}'` |

**Result:** `'{"a":1,"c":[2,null]}'` — `b` is omitted (object rule), `c`'s
`undefined` element becomes `null` (array rule).

## JavaScript Solution

```js
function stringifyJSON(value) {
  const ancestors = new Set(); // objects/arrays currently "open" on the current recursion path

  function stringify(current) {
    if (current === null) return 'null';

    const type = typeof current;

    if (type === 'number') {
      // NaN/Infinity/-Infinity serialize as 'null' — genuine JSON.stringify behavior
      return Number.isFinite(current) ? String(current) : 'null';
    }
    if (type === 'boolean') return String(current);
    if (type === 'string') return stringifyString(current);
    if (type === 'undefined' || type === 'function' || type === 'symbol') {
      return undefined; // signals "not serializable" to the caller
    }

    if (Array.isArray(current)) {
      if (ancestors.has(current)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      ancestors.add(current);

      const items = current.map((item) => {
        const itemString = stringify(item);
        return itemString === undefined ? 'null' : itemString; // arrays keep their slot
      });

      ancestors.delete(current); // done with this subtree — no longer "open"
      return `[${items.join(',')}]`;
    }

    // Remaining case: a plain object.
    if (ancestors.has(current)) {
      throw new TypeError('Converting circular structure to JSON');
    }
    ancestors.add(current);

    const entries = [];
    for (const key of Object.keys(current)) {
      const propertyString = stringify(current[key]);
      if (propertyString !== undefined) {
        entries.push(`${stringifyString(key)}:${propertyString}`); // objects drop the key entirely
      }
    }

    ancestors.delete(current);
    return `{${entries.join(',')}}`;
  }

  return stringify(value);
}

function stringifyString(str) {
  let result = '"';
  for (const char of str) {
    switch (char) {
      case '"': result += '\\"'; break;
      case '\\': result += '\\\\'; break;
      case '\n': result += '\\n'; break;
      case '\t': result += '\\t'; break;
      case '\r': result += '\\r'; break;
      case '\b': result += '\\b'; break;
      case '\f': result += '\\f'; break;
      default: {
        const code = char.charCodeAt(0);
        // Any other control character (< 0x20) must be \u-escaped too.
        result += code < 0x20 ? `\\u${code.toString(16).padStart(4, '0')}` : char;
      }
    }
  }
  result += '"';
  return result;
}
```

## TypeScript Solution

```ts
function stringifyJSON(value: unknown): string | undefined {
  const ancestors = new Set<object>();

  function stringify(current: unknown): string | undefined {
    if (current === null) return 'null';

    const type = typeof current;

    if (type === 'number') {
      const num = current as number;
      return Number.isFinite(num) ? String(num) : 'null';
    }
    if (type === 'boolean') return String(current);
    if (type === 'string') return stringifyString(current as string);
    if (type === 'undefined' || type === 'function' || type === 'symbol') {
      return undefined;
    }

    if (Array.isArray(current)) {
      if (ancestors.has(current)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      ancestors.add(current);

      const items = current.map((item: unknown) => {
        const itemString = stringify(item);
        return itemString === undefined ? 'null' : itemString;
      });

      ancestors.delete(current);
      return `[${items.join(',')}]`;
    }

    const obj = current as Record<string, unknown>;
    if (ancestors.has(obj)) {
      throw new TypeError('Converting circular structure to JSON');
    }
    ancestors.add(obj);

    const entries: string[] = [];
    for (const key of Object.keys(obj)) {
      const propertyString = stringify(obj[key]);
      if (propertyString !== undefined) {
        entries.push(`${stringifyString(key)}:${propertyString}`);
      }
    }

    ancestors.delete(obj);
    return `{${entries.join(',')}}`;
  }

  return stringify(value);
}

function stringifyString(str: string): string {
  let result = '"';
  for (const char of str) {
    switch (char) {
      case '"': result += '\\"'; break;
      case '\\': result += '\\\\'; break;
      case '\n': result += '\\n'; break;
      case '\t': result += '\\t'; break;
      case '\r': result += '\\r'; break;
      case '\b': result += '\\b'; break;
      case '\f': result += '\\f'; break;
      default: {
        const code = char.charCodeAt(0);
        result += code < 0x20 ? `\\u${code.toString(16).padStart(4, '0')}` : char;
      }
    }
  }
  result += '"';
  return result;
}
```

## Time Complexity

O(n), where n is the total size of the input structure — every value is
visited exactly once, and serializing each string is proportional to that
string's own length; the sum across the whole structure is linear in its
total content size.

## Space Complexity

O(n) for the output string being constructed (proportional to the total
serialized size), plus O(d) for the `ancestors` set and the recursive call
stack, where d is the maximum nesting depth of the input.

## Common Mistakes

- Treating "has this object been seen **anywhere**" as circular instead of
  "is this object still an open ancestor **on the current path**" —
  incorrectly throws on a legitimate, non-circular case where the same
  object is referenced twice as unrelated siblings.
- Turning `undefined`/functions into `null` inside a **plain object**
  instead of omitting the key — objects and arrays have genuinely
  different, spec-mandated rules here, and conflating them is the single
  most common mistake for this exact question.
- Forgetting that `NaN`/`Infinity`/`-Infinity` must serialize as the string
  `'null'` — not throwing, and not silently disappearing.
- Forgetting to remove an object from the `ancestors` set after finishing
  its subtree — leaves it permanently flagged as "in progress," so a later,
  completely unrelated reference to that same object is falsely reported
  as circular.
- Not escaping control characters (like a raw newline) inside strings —
  produces output that looks right in a console log but is invalid,
  unparseable JSON.

## Interview Follow-up Questions

1. How would you add support for a `replacer` function or array parameter,
   like native `JSON.stringify(value, replacer)`?
2. How would you add an indentation/`space` parameter for pretty-printing,
   like `JSON.stringify(value, null, 2)`?
3. Walk through a concrete example where a naive "has this object ever been
   seen" `Set` (instead of an ancestors-on-the-current-path set) gives the
   wrong answer.
4. How would you support serializing a `Date` or a class instance exposing
   a `.toJSON()` method, the way native `JSON.stringify` does?
5. What's the performance impact of building the output with string
   concatenation (`+=`) versus collecting parts in an array and joining
   once at the end, for a very large structure?

## Similar Questions

- [Implement JSON.parse from Scratch](implement-json-parse-from-scratch.md)
- [Implement a Deep Clone](deep-clone.md) — structural traversal with the
  same ancestor-based cycle-detection concern
- [Implement a Custom Deep Equal Comparison](implement-custom-deep-equal-comparison.md)

---
[← Back to 61-javascript-coding](README.md)
