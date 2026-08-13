# QJSC025 · Implement a Custom Recursive Object.freeze (Deep Freeze)

**Difficulty:** Medium
**Companies Asked:** Meta, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures / Immutability
**Concepts:** recursive traversal, shallow-vs-deep freezing, circular-reference-safe recursion via `WeakSet`, `Reflect.ownKeys`

## Problem Statement

Native `Object.freeze(obj)` only locks `obj`'s own top-level properties
— any object or array *nested inside* `obj` remains fully mutable.
Implement `deepFreeze(value)`, which recursively freezes `value` and
every object/array reachable from it, at every depth, without looping
forever if the structure contains a circular reference (an object that,
directly or indirectly, refers back to itself).

## Input

Any JavaScript value: a primitive (passed through unchanged), or an
object/array with arbitrary nesting — potentially including circular
references.

## Output

The same reference that was passed in, now deeply frozen: `value`
itself and every nested object/array reachable from it are frozen, so
no further mutation anywhere in the structure is possible.

## Constraints

- Primitives (numbers, strings, booleans, `null`, `undefined`,
  `Symbol`s, `BigInt`s) are already immutable — passed through as-is,
  no error.
- Every plain object and array reachable from `value`, at any depth,
  must end up frozen — not just `value` itself.
- Must terminate on circular references instead of recursing infinitely.
- The same nested object reachable through multiple paths (e.g. two
  sibling properties pointing at the same shared object) must only be
  processed once, not repeatedly.
- Must not mutate the *shape* of the structure — only its mutability.

## Examples

| Call | Behavior | Why |
|---|---|---|
| `const obj = deepFreeze({a: {b: 1}}); obj.a.b = 2;` (then read `obj.a.b`) | `obj.a.b` is still `1` | The nested object `{b: 1}` was itself frozen, not just the outer object |
| `const arr = deepFreeze([1, [2, 3]]); arr[1][0] = 99;` (then read `arr[1][0]`) | `arr[1][0]` is still `2` | The nested array is frozen too — arrays are objects and are walked the same way as plain objects |
| `const shared = {x: 1}; deepFreeze({p: shared, q: shared}); Object.isFrozen(shared)` | `true` | `shared` is reachable through two different paths but is only frozen (and visited) once |

## Edge Cases

- A circular reference (`const node = {}; node.self = node;
  deepFreeze(node)`) → must terminate normally; `node` ends up frozen,
  including its self-referential `self` property.
- `deepFreeze(5)` or `deepFreeze(null)` → returns the value unchanged,
  no error — there's nothing to freeze.
- An object nested inside an array, several levels deep → must be
  frozen too, not just the array container itself.
- An object with only getter-defined accessor properties → freezing
  must not throw; the getter continues to work exactly as before (only
  the property's own configurability/writability changes, not its
  ability to compute and return a value).
- Two sibling branches of the structure sharing one nested object
  reference → that shared object is visited (and frozen) exactly once,
  not once per path that leads to it.

## Hints

1. Since native `Object.freeze` only affects one object's own top-level
   properties, freezing `value` itself is only step one — what needs to
   happen to every property value of `value` that is *itself* an
   object, and how would that naturally become a recursive call?
2. What stops this recursion from looping forever when a nested object
   refers back to something already being processed (`a → b → a`)?
   Think about what you'd need to remember about objects you've already
   started freezing.
3. A `WeakSet` of "already visited" object references, checked *before*
   recursing into any nested value, both prevents infinite loops on
   cycles and avoids redundant work when the same object is reachable
   through more than one path.

## Algorithm

**Pattern:** recursive tree/graph traversal with a visited-set guard.
**Core insight:** native `Object.freeze` is the *correct* tool for
locking a single object's own top-level properties — that part isn't
being reimplemented here, since re-deriving the engine's actual
immutability semantics (making writes silently fail or throw in strict
mode) manually isn't realistic or what this question tests. What
`Object.freeze` does *not* do is recurse, so `deepFreeze` adds exactly
that: for every object/array reachable from `value`, call
`Object.freeze` on it individually, then walk its own keys (via
`Reflect.ownKeys`, which covers both string and `Symbol` keys) and
recurse into every value that is itself an object. Because the input
may contain cycles, a `WeakSet` tracks every reference already
processed — before recursing into any object, the traversal checks
(and records into) this set, so a reference already being handled is
never processed a second time, which is exactly what breaks the
infinite loop a naive version would fall into.
**Invariant:** once `deepFreeze(value)` returns, every object/array
reachable from `value` — including `value` itself — has been frozen
exactly once, regardless of how many paths lead to it or whether the
structure contains cycles.

## Dry Run

**Input:** `const node = {}; node.self = node; deepFreeze(node);`

| Step | Current value | `frozenObjects` (before) | Action | `frozenObjects` (after) |
|---|---|---|---|---|
| 1 | `node` | `{}` (empty) | `node` is an object, not yet visited → add it | `{node}` |
| 2 | `node` | `{node}` | `Object.freeze(node)` — freezes `node`'s own top-level property (`self`) | `{node}` |
| 3 | `node.self` (which *is* `node`) | `{node}` | Recursive call `deepFreeze(node.self)` → `node` is already in `frozenObjects` → return immediately, no further recursion | `{node}` |

**Result:** the recursion terminates after one real level of work
despite the cycle; `node` (and, trivially, `node.self`, since it's the
same object) is fully frozen — `Object.isFrozen(node)` is `true`.

## JavaScript Solution

```js
function deepFreeze(value, frozenObjects = new WeakSet()) {
  // Only objects (including arrays and functions) can be frozen —
  // primitives are already immutable, so they pass through untouched.
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (frozenObjects.has(value)) {
    return value; // already visited on this call graph — breaks cycles
  }
  frozenObjects.add(value);

  // Freeze this one node's own top-level properties. Object.freeze is
  // exactly the right tool for a single level — what it doesn't do on
  // its own is recurse, which is what this function adds around it.
  Object.freeze(value);

  for (const key of Reflect.ownKeys(value)) {
    deepFreeze(value[key], frozenObjects);
  }

  return value;
}
```

## TypeScript Solution

```ts
function deepFreeze<T>(value: T, frozenObjects: WeakSet<object> = new WeakSet()): T {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const objectValue = value as object;
  if (frozenObjects.has(objectValue)) {
    return value;
  }
  frozenObjects.add(objectValue);

  Object.freeze(objectValue);

  const record = objectValue as Record<PropertyKey, unknown>;
  for (const key of Reflect.ownKeys(record)) {
    deepFreeze(record[key], frozenObjects);
  }

  return value;
}
```

## Time Complexity

O(n), where n is the total number of distinct reachable object nodes
plus the total number of own keys across all of them — the `WeakSet`
guard guarantees each distinct reachable object is frozen and expanded
exactly once, even in a structure with cycles or shared references.

## Space Complexity

O(n) for the `WeakSet` of visited references, plus O(d) for the
recursion call stack, where d is the maximum nesting depth of the
non-circular part of the structure.

## Common Mistakes

- Calling `Object.freeze(obj)` once at the top level and assuming
  nested objects are frozen too — they aren't; `Object.freeze` is
  shallow by specification, and this exact misconception is what the
  question is testing.
- Not guarding against circular references at all — a naive recursive
  deep-freeze without a visited-tracking structure recurses forever on
  a self-referential structure and blows the call stack.
- Type-checking with something like `value.constructor === Object`
  instead of `typeof value === 'object' && value !== null` — this
  misses arrays entirely (`Array`'s constructor isn't `Object`) and
  throws on values created via `Object.create(null)`, which have no
  `.constructor` at all.
- Iterating with `Object.keys` instead of `Reflect.ownKeys` — misses any
  `Symbol`-keyed nested values, leaving them unfrozen even though every
  string-keyed value was correctly handled.
- Using a plain `Set` instead of a `WeakSet` for the visited-tracking
  structure in a long-lived process — a `Set` holds strong references
  that prevent the tracked objects from ever being garbage collected,
  even long after the freeze call has returned.

## Interview Follow-up Questions

1. Why is `Object.freeze` shallow by design in the language spec, rather
   than deep — what would deep-by-default freezing cost in terms of
   performance for objects that are frozen far more often than they're
   ever nested?
2. How would you write a companion `deepIsFrozen(value)` check that
   verifies an *entire* structure — not just its top level — is frozen?
3. Does a deep freeze survive a round trip through `structuredClone` or
   `JSON.parse(JSON.stringify(value))`? Why or why not?
4. How does using a `WeakSet` (instead of a plain `Set`) for the
   visited-tracking structure specifically help avoid a memory leak in
   a process that calls `deepFreeze` on many short-lived structures?
5. In strict mode, mutating a frozen object throws a `TypeError`; in
   non-strict (sloppy) mode, the mutation silently fails instead. Which
   behavior would you want if `deepFreeze` were used to lock down a
   global application config object, and why?

## Similar Questions

- [Implement a Deep Clone](deep-clone.md)
- [Implement a Custom Object Deep Merge Utility](implement-custom-object-deep-merge-utility.md)
- [Implement Custom Object.keys and Object.values Polyfill](implement-custom-object-keys-and-object-values-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
