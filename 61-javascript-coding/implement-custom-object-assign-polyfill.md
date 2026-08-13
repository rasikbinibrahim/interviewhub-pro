# QJSC018 · Implement a Custom Object.assign Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures
**Concepts:** own enumerable property copying, `Symbol`-keyed properties, source precedence, in-place mutation

## Problem Statement

Implement `myObjectAssign(target, ...sources)`. It should copy every own
*enumerable* property — both string-keyed and `Symbol`-keyed — from each
source object into `target`, in the order the sources were given, and
return `target`. When two sources (or a source and `target` itself) both
define the same key, the value from whichever source came *later* in
the argument list wins.

## Input

- `target`: the object to copy properties into (mutated in place).
- `sources`: zero or more additional values to copy own enumerable
  properties from.

## Output

`target` itself (the same reference, now mutated to include every
source's own enumerable properties, later sources overriding earlier
ones on key conflicts).

## Constraints

- `target` being `null` or `undefined` must throw a `TypeError` — there
  is no object to copy into.
- A `null`/`undefined` source is silently skipped, not an error.
- Only *own* properties are copied — properties inherited via the
  prototype chain must not be copied.
- Only *enumerable* properties are copied — a property defined with
  `enumerable: false` must be skipped.
- Both string keys and `Symbol` keys must be copied, in each source's
  own key order.
- The function must return the exact same reference passed as `target`,
  not a new object.

## Examples

| Call | Result | Why |
|---|---|---|
| `myObjectAssign({a: 1}, {b: 2}, {c: 3})` | `{a: 1, b: 2, c: 3}` | Every source's own enumerable keys are merged into `target` |
| `myObjectAssign({a: 1}, {a: 2}, {a: 3})` | `{a: 3}` | For a conflicting key, whichever source is given *last* wins |
| `myObjectAssign({}, null, {x: 1}, undefined)` | `{x: 1}` | `null`/`undefined` sources are silently skipped — only the object source contributes |

## Edge Cases

- `myObjectAssign(null, {a: 1})` → throws `TypeError`, since `target`
  can't be converted to an object to copy into.
- A source with a non-enumerable property (`Object.defineProperty(source,
  'hidden', {value: 1, enumerable: false})`) → `hidden` must be skipped.
- A source with `Symbol`-keyed own properties → those must be copied too,
  not just string keys.
- Zero sources given (`myObjectAssign(target)`) → returns `target`
  completely unchanged, not an error.
- A *string* source (e.g. `myObjectAssign({}, 'ab')`) → strings have
  enumerable own index properties, so this produces `{0: 'a', 1: 'b'}` —
  a genuinely surprising edge case worth knowing, not a bug.

## Hints

1. `target` needs to be mutated and returned as the *same* reference,
   not rebuilt as a new object — what does that tell you about whether
   you should build a fresh result object internally?
2. What built-in lets you enumerate a source's own keys — both string
   *and* `Symbol` keys, in a single pass — that you can then filter down
   to only the enumerable ones using each key's property descriptor?
3. Because later sources must override earlier ones (and the target's
   pre-existing values), the sources must be processed strictly in the
   order they were passed in, copying each source's keys directly onto
   `target` (or its boxed form) as you go — not collected and merged
   afterward in some other order.

## Algorithm

**Pattern:** own-enumerable-key enumeration + in-place property copy.
**Core insight:** "assign" means mutate-and-return, not build-and-return
— so `target` (boxed via `Object(target)` so primitives behave the same
way the native version does) is both the accumulator and the eventual
return value. For each source, `Reflect.ownKeys(source)` returns every
own key regardless of type (string or `Symbol`) in definition order,
which is exactly what's needed since `for...in` would both miss `Symbol`
keys entirely and incorrectly walk the prototype chain. Each key's
descriptor is checked for `enumerable: true` before copying, since
`Object.assign`'s contract explicitly excludes non-enumerable
properties. Because sources are processed in argument order and each
copy directly overwrites whatever is already on `target`, later sources
naturally win any conflict without needing any special-case logic.
**Invariant:** after processing source *i*, `target` holds the correct
merged value for every key encountered so far, with the most recently
processed source always taking precedence for any repeated key.

## Dry Run

**Input:** `myObjectAssign({a: 1}, {a: 2}, {a: 3})`

| Step | source | Reflect.ownKeys(source) | Action | target (after) |
|---|---|---|---|---|
| Start | — | — | `result = Object({a: 1})` | `{a: 1}` |
| Source 1 | `{a: 2}` | `['a']` | `a` is enumerable → `result.a = 2` | `{a: 2}` |
| Source 2 | `{a: 3}` | `['a']` | `a` is enumerable → `result.a = 3` | `{a: 3}` |

**Result:** `{a: 3}` — the last source's value for `a` wins, matching the
expected output for this example.

## JavaScript Solution

```js
function myObjectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const result = Object(target); // primitives get boxed, matching native Object.assign

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue; // null/undefined sources are silently skipped
    }

    const boxedSource = Object(source);

    // Reflect.ownKeys returns both string and Symbol own keys, in
    // definition order — for...in would miss Symbol keys entirely and
    // would also wrongly include inherited enumerable properties.
    for (const key of Reflect.ownKeys(boxedSource)) {
      const descriptor = Object.getOwnPropertyDescriptor(boxedSource, key);
      if (descriptor && descriptor.enumerable) {
        result[key] = boxedSource[key];
      }
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function myObjectAssign<T extends object, S extends object>(target: T, ...sources: S[]): T & S {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const result = Object(target) as T & S;

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    const boxedSource = Object(source) as Record<PropertyKey, unknown>;

    for (const key of Reflect.ownKeys(boxedSource)) {
      const descriptor = Object.getOwnPropertyDescriptor(boxedSource, key);
      if (descriptor?.enumerable) {
        (result as Record<PropertyKey, unknown>)[key] = boxedSource[key];
      }
    }
  }

  return result;
}
```

## Time Complexity

O(n), where n is the total number of own enumerable keys across every
source — each key is visited and copied exactly once, and
`Reflect.ownKeys` plus a descriptor lookup are both O(1) amortized per
key.

## Space Complexity

O(1) additional space beyond the mutated `target` — no intermediate
copies of the merged result are built; only a fixed number of loop
variables are allocated per key.

## Common Mistakes

- Iterating a source with `for...in` — this both misses every
  `Symbol`-keyed property entirely and incorrectly walks the prototype
  chain, copying inherited enumerable properties that `Object.assign`
  would never touch.
- Skipping the `descriptor.enumerable` check and copying every own key
  unconditionally — this copies properties the native version would
  deliberately skip, e.g. ones defined via `Object.defineProperty(obj,
  'hidden', {value: 1, enumerable: false})`.
- Building and returning a brand-new object instead of mutating and
  returning `target` — breaks any caller relying on reference identity
  (`myObjectAssign(target, source) === target`).
- Not throwing on a `null`/`undefined` `target` — silently returning
  something instead of matching the native `TypeError`, which callers
  may depend on for input validation.
- Assuming a string source contributes nothing — `Object.assign({}, 'ab')`
  actually produces `{0: 'a', 1: 'b'}`, since strings have enumerable own
  index properties once boxed.

## Interview Follow-up Questions

1. `Object.assign` triggers a source's getters and a target's setters
   during the copy, rather than copying raw stored values — what's the
   practical implication of that for an object with getter/setter-backed
   properties?
2. How would you implement a "safe" variant that performs a shallow
   clone-and-merge instead of mutating `target` in place?
3. What's the difference between this shallow merge and a deep merge —
   give a concrete example where shallow copying silently produces a
   wrong result (e.g. two sources sharing a nested object reference).
4. What happens if `target` has an existing property with
   `writable: false`, and a source tries to assign a new value to that
   same key — does the copy silently no-op, or throw? Under what mode?

## Similar Questions

- [Implement Custom Object.keys and Object.values Polyfill](implement-custom-object-keys-and-object-values-polyfill.md)
- [Implement a Custom Object Deep Merge Utility](implement-custom-object-deep-merge-utility.md)
- [Implement Custom Object.create Polyfill](implement-custom-object-create-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
