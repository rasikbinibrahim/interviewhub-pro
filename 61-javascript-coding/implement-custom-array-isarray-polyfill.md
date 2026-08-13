# QJSC044 · Implement Custom Array isArray Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** `Object.prototype.toString.call`, internal class tag inspection, array-like vs. true array, `Symbol.toStringTag` edge case

## Problem Statement

Implement `customIsArray(value)`, a polyfill for `Array.isArray`. It
should return `true` only for genuine arrays — including arrays created
in a different realm (e.g. inside an iframe) — and `false` for
everything else, including plain objects, `arguments` objects, and
"array-like" objects (objects that merely have a numeric `length` and
indexed properties, like `{ 0: 'a', 1: 'b', length: 2 }`).

## Input

A single value of any type — array, plain object, array-like object,
`arguments` object, primitive, `null`, or `undefined`.

## Output

A boolean: `true` if `value` is a genuine array, `false` otherwise.

## Constraints

- Must not call the native `Array.isArray` internally.
- Must not rely on `value instanceof Array` as the sole check — it must
  still work for arrays constructed in a different realm (a different
  `window`/iframe/worker has its own `Array` constructor and prototype,
  so `instanceof` against the *local* `Array` fails for those).
- Must return `false` for array-like objects and for the `arguments`
  object, even though both have a numeric `length` property.
- Must not throw for `null`, `undefined`, or any primitive input.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3]` | `true` | A genuine array literal |
| `{ 0: 'a', 1: 'b', length: 2 }` | `false` | Array-*like* — has indices and `length`, but was never constructed as an array |
| `(function () { return arguments; })(1, 2)` | `false` | The `arguments` object also has indices and `length`, but is a distinct exotic object type, not an array |

## Edge Cases

- `null` / `undefined` → `false`, no throw.
- A subclass instance (`class MyArray extends Array {}`, then `new
  MyArray()`) → `true` — subclassing still produces a genuine array
  under the hood.
- A cross-realm array (created via an iframe's `contentWindow.Array`)
  → `true` with the internal-tag approach below; `false` with a naive
  `instanceof Array` check, which is exactly why `instanceof` is
  disqualified as the mechanism.
- A real array with `Symbol.toStringTag` explicitly overridden (e.g.
  `arr[Symbol.toStringTag] = 'Foo'`) → this is a genuine, documented
  limitation of the classic approach below; see Common Mistakes.

## Hints

1. `instanceof` walks a prototype chain, and every realm (iframe,
   worker, etc.) has its *own* `Array` constructor and prototype — so
   `instanceof Array` silently fails for arrays from another realm. You
   need a check that doesn't depend on which realm's `Array` created the
   value.
2. Every JS value carries an internal object tag readable via
   `Object.prototype.toString.call(value)` — not `Array.prototype.toString`
   or `value.toString()`, but the base `Object.prototype` version called
   with `value` as `this`. It returns strings like `'[object Array]'`,
   `'[object Object]'`, `'[object Arguments]'`, `'[object Null]'`.
3. This tag is derived from the value's actual internal type, not its
   prototype chain, so it's realm-independent — compare the returned
   string against the literal `'[object Array]'`.

## Algorithm

**Pattern:** internal class-tag inspection via `Object.prototype.toString`.
**Core insight:** `Object.prototype.toString.call(value)` reads a tag off
`value`'s internal type — arrays report `'[object Array]'`, plain
objects `'[object Object]'`, the `arguments` object `'[object
Arguments]'`, `null` `'[object Null]'`, and so on — entirely independent
of which realm constructed the value or what its prototype chain looks
like. That's exactly what makes it survive the cross-realm case that
breaks `instanceof`, and exactly what makes it correctly reject
array-like objects (they're still ordinary objects internally, so they
tag as `'[object Object]'` regardless of having a `length` property).
**Known limitation:** since ES2015, `Object.prototype.toString` first
checks whether the value has an own or inherited `Symbol.toStringTag`
property, and uses *that* string instead of the built-in tag if present.
So a genuine array with `arr[Symbol.toStringTag] = 'Foo'` reports
`'[object Foo]'`, not `'[object Array]'` — this polyfill would
(incorrectly) say `false` for it. The real, engine-native `Array.isArray`
is immune to this because it inspects the array's internal `[[Array]]`
exotic-object slot directly, before any `@@toStringTag` lookup even
happens — a check that isn't exposed to pure userland JS at all. This is
worth stating explicitly in an interview rather than pretending the
polyfill is 100% equivalent to the native method.

## Dry Run

**Input:** `customIsArray({ 0: 'a', 1: 'b', length: 2 })`

| Step | Expression | Result |
|---|---|---|
| 1 | `value` | `{ 0: 'a', 1: 'b', length: 2 }` |
| 2 | `Object.prototype.toString.call(value)` | `'[object Object]'` — the value's internal tag is `Object`, because it was created as a plain object literal, not via `Array` |
| 3 | `'[object Object]' === '[object Array]'` | `false` |

**Result:** `false` — correctly rejected despite having `length` and
numeric indices, because the internal tag check looks at what the value
*actually is*, not what shape it happens to have.

## JavaScript Solution

```js
function customIsArray(value) {
  // Object.prototype.toString (NOT Array.prototype.toString, and NOT
  // value.toString()) reads value's internal type tag directly —
  // this is realm-independent, unlike `instanceof Array`.
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

## TypeScript Solution

```ts
function customIsArray(value: unknown): value is unknown[] {
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

The `value is unknown[]` return type is a type predicate — after a
`true` result, TypeScript narrows `value` to `unknown[]` at call sites,
just like the built-in `Array.isArray` type definition does.

## Time Complexity

O(1) — a single internal tag lookup and one string comparison,
regardless of the array's size (it never iterates the value's contents).

## Space Complexity

O(1) — no additional storage proportional to input size; the tag string
is a small fixed-size temporary.

## Common Mistakes

- Using `value instanceof Array` — fails for arrays created in a
  different realm (iframe, popup window, or worker), since each realm
  has its own global `Array` constructor and the value's prototype chain
  points at *that* realm's `Array.prototype`, not the local one.
- Checking `typeof value === 'object' && typeof value.length ===
  'number'` — misclassifies array-like objects and the `arguments`
  object as arrays, which is precisely the distinction this problem
  tests.
- Calling `Array.isArray` internally "to be safe" — defeats the purpose
  of writing the polyfill; an interviewer will immediately flag this.
- Treating this polyfill as a perfect drop-in replacement without
  acknowledging the `Symbol.toStringTag` override edge case — a strong
  answer states the limitation explicitly rather than presenting the
  polyfill as flawless.

## Interview Follow-up Questions

1. Why does `Array.isArray` correctly detect cross-realm arrays while
   `instanceof Array` does not?
2. Is there any pure-JavaScript way to make this polyfill immune to a
   `Symbol.toStringTag` override on a real array? Why or why not — tie
   your answer to what `Array.isArray` can access that userland code
   cannot.
3. How would `Object.prototype.toString.call` classify a `Proxy` that
   wraps a real array — and would this polyfill's answer match what
   `Array.isArray` reports for the same `Proxy`?
4. How would you write a more general `getInternalType(value)` utility
   using the same technique, returning `'Array'`, `'Object'`, `'Null'`,
   `'RegExp'`, etc.?

## Similar Questions

- Implement a generic `getType(value)` utility using
  `Object.prototype.toString`
- [Implement Custom Array prototype concat Polyfill](implement-custom-array-prototype-concat-polyfill-simple.md)
  (touches `Symbol.isConcatSpreadable`, a related tag-driven mechanism)
- Detect cross-realm object types without `instanceof`

---
[← Back to 61-javascript-coding](README.md)
