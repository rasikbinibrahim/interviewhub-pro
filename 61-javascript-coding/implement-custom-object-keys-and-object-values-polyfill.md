# QJSC022 · Implement Custom Object.keys and Object.values Polyfills

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures
**Concepts:** own enumerable string-keyed properties, `hasOwnProperty` filtering, `for...in` semantics

## Problem Statement

Implement `myObjectKeys(obj)` and `myObjectValues(obj)`.
`myObjectKeys` should return an array of `obj`'s own enumerable
*string*-keyed property names — not properties inherited via the
prototype chain, and not `Symbol`-keyed properties. `myObjectValues`
should return the corresponding array of values, in the same order.

## Input

`obj`: any value. Objects and arrays are the primary case; primitives
are boxed the same way the native versions do (so a string input yields
its index characters as keys/values). `null`/`undefined` are invalid.

## Output

- `myObjectKeys`: an array of strings — `obj`'s own enumerable
  string-keyed property names.
- `myObjectValues`: an array of the corresponding values, in the same
  key order `myObjectKeys` would produce.

## Constraints

- Only **own** properties are included — anything reachable only via
  the prototype chain must be excluded.
- Only **enumerable** properties are included — a property defined with
  `enumerable: false` must be excluded.
- Only **string**-keyed properties are included — `Symbol`-keyed own
  properties must never appear in either result.
- `obj` being `null` or `undefined` must throw a `TypeError`, matching
  native `Object.keys`/`Object.values`.
- `myObjectValues`'s output order must correspond exactly to
  `myObjectKeys`'s output order for the same input.

## Examples

| Call | Result | Why |
|---|---|---|
| `myObjectKeys({a: 1, b: 2})` | `['a', 'b']` | Both are own, enumerable, string-keyed properties |
| `myObjectValues({a: 1, b: 2})` | `[1, 2]` | Values follow the same key order as `myObjectKeys` |
| `const proto = {inherited: 1}; const obj = Object.create(proto); obj.own = 2; myObjectKeys(obj)` | `['own']` | `inherited` lives on the prototype, not on `obj` itself, so it's excluded |

## Edge Cases

- `obj` has `Symbol`-keyed own properties → excluded from both results,
  even though they're perfectly valid own properties.
- `myObjectKeys(null)` / `myObjectKeys(undefined)` → throws `TypeError`.
- `obj` is an array (`['x', 'y']`) → `myObjectKeys` returns `['0', '1']`
  (indices as strings, not numbers) and `myObjectValues` returns
  `['x', 'y']`.
- `obj` has a non-enumerable own property (via `Object.defineProperty(obj,
  'hidden', {value: 1, enumerable: false})`) → `hidden` is excluded from
  both results.
- A primitive string input (`myObjectKeys('ab')`) → boxes to a `String`
  wrapper with enumerable index properties, producing `['0', '1']` for
  keys and `['a', 'b']` for values — a real, if surprising, native
  behavior worth reproducing faithfully.

## Hints

1. What language construct iterates over enumerable properties by
   *name*, but — unlike `Object.keys` — also walks up the entire
   prototype chain, meaning it needs one more check to match `Object.
   keys`'s "own properties only" contract?
2. `hasOwnProperty` is exactly the filter that turns "every enumerable
   property, including inherited ones" into "only this object's own
   enumerable properties."
3. Once you have a correct list of own enumerable keys, `Object.values`
   is just "map each of those keys to `obj[key]`" — you don't need a
   second, independent traversal; reuse the keys implementation.

## Algorithm

**Pattern:** `for...in` traversal with an own-property filter.
**Core insight:** `for...in` already does most of the work — it
enumerates every enumerable property by string name, walking up the
prototype chain, and (unlike `Object.getOwnPropertyNames`) it naturally
never yields `Symbol`-keyed properties at all, since `for...in` only
ever visits string keys. The one gap between `for...in`'s behavior and
`Object.keys`'s contract is that `for...in` also yields *inherited*
enumerable properties — `hasOwnProperty` closes that gap by filtering
out anything not owned directly by `obj`. Once `myObjectKeys` correctly
produces this filtered list, `myObjectValues` is not a second traversal
at all — it's simply mapping each of those already-correct keys to
`obj[key]`, guaranteeing the two functions agree on order by
construction rather than by coincidence.
**Invariant:** at the end of the `for...in` loop, `keys` contains every
string key that is both enumerable and owned directly by `obj`, in the
same relative order `for...in` visited them — no inherited keys, no
`Symbol` keys.

## Dry Run

**Input:** `const proto = {inherited: 1}; const obj = Object.create(proto); obj.own = 2; myObjectKeys(obj)`

| Step | Key visited by `for...in` | `hasOwnProperty(obj, key)`? | Included in `keys`? |
|---|---|---|---|
| 1 | `'own'` | `true` — defined directly on `obj` | Yes → `keys = ['own']` |
| 2 | `'inherited'` | `false` — lives on `proto`, not `obj` | No — skipped |

**Result:** `myObjectKeys(obj)` → `['own']`; the inherited property is
correctly excluded even though `for...in` visited it.

## JavaScript Solution

```js
function myObjectKeys(obj) {
  if (obj === null || obj === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const boxedObj = Object(obj); // primitives get boxed, matching native Object.keys
  const keys = [];

  // for...in visits every enumerable string-keyed property, including
  // inherited ones — hasOwnProperty filters down to only obj's own.
  for (const key in boxedObj) {
    if (Object.prototype.hasOwnProperty.call(boxedObj, key)) {
      keys.push(key);
    }
  }

  return keys;
}

function myObjectValues(obj) {
  const boxedObj = Object(obj); // throws via myObjectKeys below if obj is null/undefined
  // Reuse the already-correct key list instead of re-deriving it —
  // guarantees keys and values stay in the same order by construction.
  return myObjectKeys(boxedObj).map((key) => boxedObj[key]);
}
```

## TypeScript Solution

```ts
function myObjectKeys(obj: unknown): string[] {
  if (obj === null || obj === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const boxedObj = Object(obj) as Record<string, unknown>;
  const keys: string[] = [];

  for (const key in boxedObj) {
    if (Object.prototype.hasOwnProperty.call(boxedObj, key)) {
      keys.push(key);
    }
  }

  return keys;
}

function myObjectValues<T>(obj: Record<string, T>): T[] {
  const boxedObj = Object(obj) as Record<string, T>;
  return myObjectKeys(boxedObj).map((key) => boxedObj[key]);
}
```

## Time Complexity

O(p), where p is the total number of enumerable properties across
`obj`'s *entire* prototype chain — `for...in` must visit each of them to
apply the `hasOwnProperty` filter, even though only own properties
(n ≤ p of them) end up in the result. `myObjectValues` adds a further
O(n) map over the already-computed keys.

## Space Complexity

O(n), where n is the number of own enumerable string-keyed properties —
one entry per result array element; no additional structures scale with
the size of the prototype chain itself.

## Common Mistakes

- Using `for...in` without the `hasOwnProperty` guard — silently
  includes inherited enumerable properties, which native `Object.keys`
  never does.
- Manually re-filtering for `typeof key === 'string'` under the
  assumption that `Symbol` keys might leak through `for...in` — they
  can't; `for...in` only ever yields string keys, so this check is
  unnecessary noise (though not incorrect) and signals a
  misunderstanding of what `for...in` actually enumerates.
- Skipping the explicit `null`/`undefined` check because `for...in` over
  `null`/`undefined` doesn't throw — it just silently iterates zero
  times, which diverges from native `Object.keys(null)`, which throws a
  `TypeError` outright.
- Implementing `myObjectValues` as an entirely separate traversal
  instead of mapping over `myObjectKeys`'s output — doubles the work and
  risks the two functions disagreeing on order if the traversals are
  ever written or maintained independently.

## Interview Follow-up Questions

1. What key ordering does the spec actually guarantee for `Object.
   keys`: integer-like keys first (in ascending numeric order), then
   string keys in insertion order. Does `for...in` in modern engines
   follow that same ordering, and does this implementation therefore
   preserve it?
2. How would you implement `Object.entries` on top of `myObjectKeys`,
   now that you have both a correct key list and a way to read each
   value?
3. Why does `for...in` need to traverse the *entire* prototype chain
   even though only own properties are ultimately kept — what's the
   performance implication for an object sitting on a very deep,
   heavily populated prototype chain?
4. Walk through why `myObjectKeys(['x', 'y'])` returns `['0', '1']`
   rather than `[0, 1]` — why does JavaScript represent array indices as
   string property keys internally?

## Similar Questions

- [Implement Custom Object.entries and Object.fromEntries Polyfill](implement-custom-object-entries-and-fromentries-polyfill.md)
- [Implement Custom Object.assign Polyfill](implement-custom-object-assign-polyfill.md)
- [Implement a Custom Object.is Polyfill](implement-custom-object-is-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
