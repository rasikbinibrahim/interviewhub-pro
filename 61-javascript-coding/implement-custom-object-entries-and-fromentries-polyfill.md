# QJS342 · Implement Custom Object.entries and Object.fromEntries Polyfills

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures
**Concepts:** own enumerable key/value pairing, the iterable protocol, "last write wins" merge precedence

## Problem Statement

Implement two inverse utilities. `myObjectEntries(obj)` should return an
array of `[key, value]` pairs, one per own enumerable string-keyed
property of `obj` — exactly the same set of keys `Object.keys` would
return, each paired with its value. `myObjectFromEntries(iterable)`
should do the reverse: given *any* iterable of `[key, value]`-shaped
pairs (an array of pairs, a `Map`, a generator — not just arrays),
build and return a new plain object from them.

## Input

- `myObjectEntries`: `obj`, any value (objects are the primary case;
  `null`/`undefined` are invalid).
- `myObjectFromEntries`: `iterable`, anything implementing the iterable
  protocol, where each yielded item is itself an iterable with at least
  two elements (a key and a value).

## Output

- `myObjectEntries`: an array of two-element arrays, `[key, value]`, one
  per own enumerable string-keyed property.
- `myObjectFromEntries`: a new plain object built from the given pairs.

## Constraints

- `myObjectEntries` includes only **own**, **enumerable**,
  **string**-keyed properties — the same rules `Object.keys` follows
  (no inherited properties, no `Symbol` keys).
- `myObjectEntries(null)`/`myObjectEntries(undefined)` must throw a
  `TypeError`.
- `myObjectFromEntries` must accept any iterable, not only arrays.
- `myObjectFromEntries` with duplicate keys across entries must let the
  **last** occurrence win, matching `Object.assign`'s merge precedence.
- Each entry may have more than two elements; only the first two
  (key, value) are used.

## Examples

| Call | Result | Why |
|---|---|---|
| `myObjectEntries({a: 1, b: 2})` | `[['a', 1], ['b', 2]]` | Each own enumerable key is paired with its value |
| `myObjectFromEntries([['a', 1], ['b', 2]])` | `{a: 1, b: 2}` | The inverse operation — pairs become key/value properties |
| `myObjectFromEntries(new Map([['x', 10], ['y', 20]]))` | `{x: 10, y: 20}` | `Map` is iterable and yields `[key, value]` pairs directly — `fromEntries` accepts any iterable, not just arrays |

## Edge Cases

- `myObjectEntries({})` → `[]`.
- `myObjectEntries` on an object with `Symbol`-keyed or non-enumerable
  properties → both are excluded, same as `Object.keys`.
- `myObjectFromEntries([])` → `{}`.
- `myObjectFromEntries([['a', 1], ['a', 2]])` → `{a: 2}` — the **later**
  entry for a duplicate key wins.
- `myObjectFromEntries([['a', 1, 'ignored']])` → `{a: 1}` — only the
  first two elements of each entry are used; extras are silently ignored.
- `myObjectFromEntries(myObjectEntries(obj))` → a **new** plain object
  with the same own enumerable string-keyed data as `obj`, not the same
  reference (and without any inherited/`Symbol`-keyed data `obj` may
  have had).

## Hints

1. `Object.entries` is `Object.keys` with one extra step per key — what
   do you need to pair each key with, to turn a list of keys into a
   list of `[key, value]` pairs?
2. `Object.fromEntries` must accept *any* iterable, not just arrays —
   what language construct lets you loop over anything implementing the
   iterable protocol (arrays, `Map`s, `Set`s, generators) uniformly,
   without assuming array-specific methods like `.map`?
3. When building the result object from entries, later entries for the
   same key should overwrite earlier ones — a single plain assignment
   inside the loop (`result[key] = value`) gives you that "last write
   wins" behavior automatically, as long as entries are processed in
   iteration order.

## Algorithm

**Pattern:** own-key enumeration paired with values (`entries`); iterable
consumption into an accumulator object (`fromEntries`).
**Core insight:** `myObjectEntries` reuses exactly the same traversal
`Object.keys` relies on — `for...in` filtered by `hasOwnProperty` — and
adds one step: instead of pushing just the key, it pushes `[key,
boxedObj[key]]`. `myObjectFromEntries` is the mirror operation, but its
input contract is deliberately broader than an array: because it must
accept *any* iterable (a `Map`'s entries, a `Set` of pairs, a generator),
the implementation uses `for...of`, which works uniformly across every
iterable in the language rather than assuming array methods are
available. Each entry is destructured to its first two elements (`[key,
value] = entry`), and assigned directly onto the accumulator object —
because the loop processes entries strictly in iteration order and each
assignment simply overwrites whatever was there before, "last entry for
a given key wins" falls out naturally without any special-case logic.
**Invariant:** after processing entry *i* in `myObjectFromEntries`, the
accumulator object holds the correct final value for every key seen in
entries `1..i`, with the most recently processed entry for any repeated
key always taking precedence.

## Dry Run

**Input:** `myObjectFromEntries([['a', 1], ['a', 2]])`

| Step | entry | key | value | result (before) | result (after) |
|---|---|---|---|---|---|
| 1 | `['a', 1]` | `'a'` | `1` | `{}` | `{a: 1}` |
| 2 | `['a', 2]` | `'a'` | `2` | `{a: 1}` | `{a: 2}` (overwritten) |

**Result:** `{a: 2}` — the second entry for `'a'` wins, matching the
expected "last write wins" behavior.

## JavaScript Solution

```js
function myObjectEntries(obj) {
  if (obj === null || obj === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const boxedObj = Object(obj); // primitives get boxed, matching native Object.entries
  const entries = [];

  for (const key in boxedObj) {
    if (Object.prototype.hasOwnProperty.call(boxedObj, key)) {
      entries.push([key, boxedObj[key]]);
    }
  }

  return entries;
}

function myObjectFromEntries(iterable) {
  const result = {};

  // for...of works uniformly over any iterable - arrays, Maps, Sets,
  // generators - not just arrays, which is exactly what fromEntries
  // needs to accept.
  for (const entry of iterable) {
    const [key, value] = entry; // only the first two elements of each entry matter
    result[key] = value; // later entries for the same key overwrite earlier ones
  }

  return result;
}
```

## TypeScript Solution

```ts
function myObjectEntries(obj: unknown): [string, unknown][] {
  if (obj === null || obj === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const boxedObj = Object(obj) as Record<string, unknown>;
  const entries: [string, unknown][] = [];

  for (const key in boxedObj) {
    if (Object.prototype.hasOwnProperty.call(boxedObj, key)) {
      entries.push([key, boxedObj[key]]);
    }
  }

  return entries;
}

function myObjectFromEntries<K extends PropertyKey, V>(iterable: Iterable<readonly [K, V]>): Record<K, V> {
  const result = {} as Record<K, V>;

  for (const entry of iterable) {
    const [key, value] = entry;
    result[key] = value;
  }

  return result;
}
```

## Time Complexity

- `myObjectEntries`: O(p), where p is the total number of enumerable
  properties across `obj`'s entire prototype chain (`for...in` must
  visit each to apply the `hasOwnProperty` filter).
- `myObjectFromEntries`: O(m), where m is the number of entries yielded
  by the iterable — one destructure and one assignment per entry.

## Space Complexity

- `myObjectEntries`: O(n), where n is the number of own enumerable
  string-keyed properties — one `[key, value]` pair per result entry.
- `myObjectFromEntries`: O(k), where k is the number of *distinct* keys
  across all entries — the result object stores at most one value per
  unique key, regardless of how many duplicate entries were given.

## Common Mistakes

- `myObjectEntries` using `for...in` without the `hasOwnProperty`
  guard — the same mistake as a naive `Object.keys` polyfill, silently
  including inherited enumerable properties.
- `myObjectFromEntries` assuming its input is always an array and
  calling `.map`/`.forEach` on it directly — this breaks entirely for a
  `Map`, a `Set`, or a generator, none of which have array methods;
  `for...of` (the iterable protocol) is required for correctness.
- `myObjectFromEntries` requiring each entry to have exactly two
  elements and throwing on extras, or trying to use a third element
  meaningfully — native `fromEntries` only ever reads the first two
  elements of each entry and silently ignores the rest.
- `myObjectFromEntries` building the result with `Object.assign(result,
  {[key]: value})` inside the loop instead of a direct `result[key] =
  value` assignment — functionally equivalent, but allocates a wasteful
  intermediate object per entry, hurting performance on large inputs
  without adding any correctness.
- Assuming the **first** entry for a duplicate key wins instead of the
  **last** — the opposite of both native `fromEntries` and
  `Object.assign`'s "later overrides earlier" convention.

## Interview Follow-up Questions

1. `Object.entries(obj).map(([key, value]) => [key, transform(value)])`
   is a common idiom for "map over an object's values while keeping its
   keys." How would `fromEntries` complete that round trip back into a
   plain object?
2. How would `myObjectEntries` need to change to also include
   `Symbol`-keyed properties, if that requirement were added — and what
   would you call the resulting function, given the real `Object.
   entries` never includes them by spec, so reusing the same name would
   be misleading?
3. What happens if an item yielded by the iterable in `myObjectFromEntries`
   isn't itself iterable (e.g. `myObjectFromEntries([1, 2, 3])`, where
   each element is a plain number rather than a pair)? Where would the
   failure occur in your implementation, and should it throw?
4. How would you implement `myObjectFromEntries` using `Array.from(iterable,
   ...)` or a `reduce` instead of an explicit `for...of` loop — what are
   the readability and performance trade-offs of each approach?

## Similar Questions

- [Implement Custom Object.keys and Object.values Polyfill](implement-custom-object-keys-and-object-values-polyfill.md)
- [Implement Custom Object.assign Polyfill](implement-custom-object-assign-polyfill.md)
- [Implement a Custom Object.is Polyfill](implement-custom-object-is-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
