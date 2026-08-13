# QJSC011 · Implement a Custom Deep Equal Comparison

**Difficulty:** Medium
**Companies Asked:** Meta, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures / Equality
**Concepts:** recursive structural comparison, type checking, SameValueZero semantics, own-key-set comparison, circular reference awareness

## Problem Statement

Implement `deepEqual(a, b)`, a function that returns `true` if two values
are *structurally* equivalent rather than merely reference-equal.
Primitives should be compared the way `Array.prototype.includes` compares
them (SameValueZero) rather than with `===` — the one practical
difference being that `NaN` must be considered equal to `NaN`. Plain
objects and arrays should be compared recursively: same "kind" (both
arrays or both plain objects), same own keys, and every value at each
key deep-equal to its counterpart — regardless of whether `a` and `b`
are the same reference in memory.

## Input

Two arbitrary JavaScript values `a` and `b` — primitives, arrays, plain
objects, or arbitrarily nested combinations of the two.

## Output

A single boolean: `true` if `a` and `b` are structurally equal, `false`
otherwise.

## Constraints

- Must compare nested arrays/objects to arbitrary depth.
- `NaN` must be treated as equal to `NaN` (unlike `===`).
- Values of different types (e.g. `1` vs `'1'`) are never equal.
- An array and a plain object are never equal, even if their enumerable
  keys happen to look similar (`[1, 2]` vs `{0: 1, 1: 2}`).
- Only own enumerable keys are compared — inherited properties are not
  considered.
- Circular references are not required to be handled by the core
  solution, but must be discussed (see Interview Follow-up Questions).

## Examples

| Input | Output | Why |
|---|---|---|
| `deepEqual({x: 1, y: [1, 2]}, {x: 1, y: [1, 2]})` | `true` | Same structure and values throughout, even though they're two separate objects in memory |
| `deepEqual(NaN, NaN)` | `true` | SameValueZero treats `NaN` as equal to itself, unlike `===`, which reports `NaN === NaN` as `false` |
| `deepEqual({a: 1, b: 2}, {a: 1, b: 2, c: 3})` | `false` | `b` has an extra own key (`c`) that `a` doesn't have — different key sets can never be structurally equal |

## Edge Cases

- `deepEqual([1, 2], {0: 1, 1: 2})` → `false` (an array and a plain
  object are never equal, regardless of matching indices)
- `deepEqual({a: 1, b: 2}, {b: 2, a: 1})` → `true` (key *order* doesn't
  matter — only the key/value pairs)
- `deepEqual(null, undefined)` → `false` (both are falsy but are
  distinct types/values, not structurally equal)
- `deepEqual(a, a)` (the exact same reference, including `NaN`) → `true`
  immediately, via the fast reference-equality path, without recursing
- `deepEqual([1, [2, 3]], [1, [2, 3, 4]])` → `false` (nested arrays of
  different lengths can never be equal)
- A circular reference (`const a = {}; a.self = a;`) compared against
  another circular structure → not required to be solved by the base
  implementation, but a naive recursive solution will recurse forever
  and throw `RangeError: Maximum call stack size exceeded` — call this
  out explicitly rather than silently ignoring it

## Hints

1. Start with a fast path: if `a` and `b` are the exact same primitive
   value or the exact same object reference, they're equal without
   needing to recurse at all — the one adjustment needed over plain
   `===` is making `NaN` compare equal to itself.
2. Once the fast path is ruled out, anything that isn't a non-null
   object can no longer be equal — check that both sides are non-null
   objects of the *same kind* (both arrays, or both plain objects)
   before attempting to recurse into their contents.
3. Compare the two objects' key sets before comparing their values —
   checking `Object.keys(a).length === Object.keys(b).length` first (or
   arrays' `.length`) lets you fail fast on a key-count mismatch instead
   of only discovering a missing key mid-recursion.

## Algorithm

**Pattern:** recursive structural comparison over a value graph.
**Core insight:** deep equality reduces to a single question asked
recursively at every level: "are these two values the same kind, and do
all their parts match?" Primitives are compared directly (with a
special case so `NaN` counts as equal to itself, matching
`Array.prototype.includes`'s SameValueZero behavior rather than `===`'s
IEEE-754 comparison). Non-primitives are compared by first checking
they're the same *kind* (array vs. plain object), then checking they
have exactly the same set of own keys, then recursively deep-equaling
the value at each shared key — if every key's values are deep-equal and
no key set differs, the structures are equal.
**Invariant:** at each recursive call, `deepEqual(a, b)` returns `true`
only if every reachable primitive value in `a`'s structure has a
matching counterpart at the same path in `b`'s structure, and vice versa
(no extra keys on either side).

## Dry Run

**Input:** `deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})`

| Call | a | b | Fast path? | Kind check | Key-set check | Result |
|---|---|---|---|---|---|---|
| Outer call | `{a: 1, b: {c: 2}}` | `{a: 1, b: {c: 2}}` | No (different references) | both plain objects | `['a','b']` vs `['a','b']` — same length | recurse into `a` and `b` keys |
| Compare key `a` | `1` | `1` | Yes, `1 === 1` | — | — | `true` |
| Compare key `b` | `{c: 2}` | `{c: 2}` | No (different references) | both plain objects | `['c']` vs `['c']` — same length | recurse into `c` |
| Compare key `c` (nested) | `2` | `2` | Yes, `2 === 2` | — | — | `true` |

Every key at every level matched, so the outer call returns `true`.
**Result:** `deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})` → `true`.

## JavaScript Solution

```js
function deepEqual(a, b) {
  // Fast path: identical primitives and identical references. NaN is
  // special-cased here so two NaNs compare equal (SameValueZero),
  // instead of `===`, under which `NaN === NaN` is false.
  if (a === b) {
    return true;
  }
  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // Past this point, only non-null objects can still possibly be equal
  // — any primitive mismatch (including type mismatches) is caught here.
  const aIsObject = typeof a === 'object' && a !== null;
  const bIsObject = typeof b === 'object' && b !== null;
  if (!aIsObject || !bIsObject) {
    return false;
  }

  // An array and a plain object are never structurally equal, even if
  // their enumerable keys happen to overlap.
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) {
    return false;
  }

  if (aIsArray) {
    if (a.length !== b.length) {
      return false; // different lengths can never hold equal contents
    }
    for (let index = 0; index < a.length; index++) {
      if (!deepEqual(a[index], b[index])) {
        return false;
      }
    }
    return true;
  }

  // Plain object comparison: same number of own keys, and every key on
  // `a` exists on `b` with a deep-equal value.
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false; // fail fast before recursing into any values
  }

  for (const key of keysA) {
    // Guards against `b` inheriting `key` from its prototype chain
    // rather than owning it directly.
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }
  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  const aIsObject = typeof a === 'object' && a !== null;
  const bIsObject = typeof b === 'object' && b !== null;
  if (!aIsObject || !bIsObject) {
    return false;
  }

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) {
    return false;
  }

  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    for (let index = 0; index < a.length; index++) {
      if (!deepEqual(a[index], b[index])) {
        return false;
      }
    }
    return true;
  }

  const objectA = a as Record<string, unknown>;
  const objectB = b as Record<string, unknown>;
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objectB, key)) {
      return false;
    }
    if (!deepEqual(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

O(n), where n is the total number of primitive values and keys across
both structures — every reachable value is visited and compared at most
once (key-set length checks let mismatches fail fast before an
unnecessary full traversal).

## Space Complexity

O(d + k), where d is the maximum nesting depth (the recursion call
stack) and k is the largest number of keys/elements at any single level
(the transient `Object.keys` arrays created per call). For a roughly
balanced structure this is well under the total input size; for a
deeply linear chain, d dominates and approaches O(n).

## Common Mistakes

- Comparing with `JSON.stringify(a) === JSON.stringify(b)` — the classic
  lazy "solution" that's actually wrong: it's sensitive to key
  *insertion order* even though order shouldn't matter for equality, it
  silently drops keys whose value is `undefined` (so `{a: undefined}`
  and `{}` serialize identically), it turns `NaN` and `Infinity` into
  `null`, it can't compare functions or `Symbol` values at all, and it
  throws on circular references instead of failing gracefully.
- Forgetting the `keysA.length === keysB.length` check before the loop —
  without it, an object with *extra* keys that don't exist on `a` still
  "passes," since the loop only ever iterates `a`'s keys.
- Treating `[1, 2]` and `{0: 1, 1: 2}` as equal because both produce the
  same `Object.keys` output (`['0', '1']`) — the kind check
  (`Array.isArray`) must happen before falling into the generic
  object-comparison branch, not be skipped as "close enough."
- Using plain `a === b` for the primitive fast path without the `NaN`
  special case, which silently makes `deepEqual(NaN, NaN)` return
  `false` — a direct violation of the SameValueZero requirement this
  question is testing.

## Interview Follow-up Questions

1. How would you handle circular references (an object that references
   itself, directly or through a cycle) without infinite recursion or a
   stack overflow? (Expect: track visited pairs in a `WeakMap`/`WeakSet`
   keyed by reference, and short-circuit to `true` if the same pair is
   revisited mid-comparison.)
2. How would you extend this to correctly compare `Map`, `Set`, `Date`,
   and `RegExp` instances, which `Object.keys` doesn't meaningfully
   iterate?
3. Should `deepEqual(0, -0)` be `true` or `false`? What do lodash's
   `isEqual` and Node's `assert.deepStrictEqual` each decide, and why
   might that choice matter for a caller?
4. How would you rewrite this iteratively (using an explicit stack)
   instead of recursively, to avoid stack overflow on very deeply
   nested — but non-circular — input?
5. How does your implementation behave when comparing two objects
   created with `Object.create(null)`, which have no prototype at all?

## Similar Questions

- [Implement Custom Object.is Polyfill](implement-custom-object-is-polyfill.md)
- [Implement a Deep Clone](deep-clone.md)
- [Implement a Custom Object Deep Merge Utility](implement-custom-object-deep-merge-utility.md)
- [Implement a Deep Omit Utility](implement-deep-omit-utility.md)

---
[← Back to 61-javascript-coding](README.md)
