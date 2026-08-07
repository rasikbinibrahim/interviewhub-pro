# Q503 · Implement a Deep Clone

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft, Meta, Adobe, Oracle, PayPal
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Objects / Recursion
**Concepts:** recursion, reference-cycle detection, `WeakMap`, type checking

## Problem Statement

Implement `deepClone(value)`, which returns a full, independent copy of
`value` — for arrays and plain objects, nested arrays/objects must also
be copied recursively, not just shallowly referenced, so mutating the
clone never affects the original (and vice versa). The input may contain
circular references (an object that, through some chain of properties,
refers back to itself); the clone must handle this without infinitely
recursing.

## Input

`value: any` — may be a primitive, `null`, a plain object, an array, a
`Date`, a `Map`, a `Set`, or an object graph containing circular
references.

## Output

A deep copy of `value` with the same shape and data, but sharing no
mutable object references with the original (except where a value is a
primitive, which is copied by value anyway).

## Constraints

- Must correctly clone nested arrays and plain objects to arbitrary
  depth.
- Must not infinitely recurse on circular references — the clone should
  reproduce the same cycle structure, not crash or hang.
- Must not use `JSON.parse(JSON.stringify(value))` — that approach
  silently drops `undefined`, functions, `Date` correctness (turns dates
  into strings), and can't handle circular references at all, which
  defeats the purpose of the exercise.
- `Date` objects should clone into new `Date` instances with the same
  time value, not string representations.

## Examples

| Input | Behavior |
|---|---|
| `{ a: 1, b: { c: 2 } }` | Returns a new object; mutating `clone.b.c` does not affect `original.b.c` |
| `[1, [2, 3], { a: 4 }]` | Returns a new array with independently-cloned nested array and object |
| `const obj = {}; obj.self = obj;` (circular) | Returns a new object `clone` where `clone.self === clone` (the cycle is preserved, pointing at the *clone*, not the original) |
| `new Date('2024-01-01')` | Returns a new `Date` instance with the same timestamp, `clone !== original` but `clone.getTime() === original.getTime()` |

## Edge Cases

- `null` and primitives (`number`, `string`, `boolean`, `undefined`,
  `symbol`, `bigint`) → returned as-is; nothing to clone, no wrapping.
- Circular reference (object referencing itself directly or through a
  chain) → must terminate and preserve the cycle in the clone.
- The *same* nested object referenced from two different places in the
  input (not circular, just shared) → ideally cloned once and both
  clone-side references point to that single clone, preserving the
  original's sharing structure rather than producing two independent
  copies (this matters for correctness, not just performance).
- Empty object/array (`{}`, `[]`) → returns a new empty object/array,
  not the same reference.
- Arrays with holes/mixed types → cloned faithfully, index by index.

## Hints

1. For primitives and `null`, there's nothing to clone — return the
   value itself immediately; this is also the recursion's base case.
2. For objects/arrays, you need to visit every own property/element and
   recursively clone each one — what's the natural way to walk a nested
   structure of unknown depth without knowing its shape in advance?
3. To handle circular references (and shared references) correctly, keep
   a lookup of "original object → its clone" that you check *before*
   recursing into an object, and populate *before* recursing into its
   children — a `WeakMap` is ideal here since it doesn't prevent garbage
   collection of objects no longer referenced elsewhere.

## Algorithm

**Pattern:** recursion with a visited-map for cycle/shared-reference
handling.
**Core insight:** deep cloning is recursive by nature — clone the
container, then clone each of its contents the same way. The only thing
that breaks naive recursion is a cycle, which would recurse forever. The
fix is to record each object's clone in a `WeakMap` the moment its clone
is *created* (before recursing into its properties) — so if recursion
later revisits the same original object (because of a cycle or shared
reference), it finds the already-created clone instead of recursing
again, both terminating the cycle and preserving shared structure.
**Invariant:** every distinct object encountered in the input is cloned
exactly once; every subsequent encounter of that same object (via a
cycle or a second reference) resolves to the same clone instance via the
`WeakMap`.

## Dry Run

**Input:** `const obj = { a: 1 }; obj.self = obj;` (a circular
reference: `obj.self` points back to `obj` itself)

| Step | Call | visited map before | Action | visited map after |
|---|---|---|---|---|
| 1 | `deepClone(obj)` | `{}` | not a primitive, not visited yet → create `clone = {}`, **record `visited.set(obj, clone)` immediately** | `{ obj → clone }` |
| 2 | clone `obj.a` (= `1`) | — | primitive → `clone.a = 1` | — |
| 3 | clone `obj.self` (= `obj`) | `{ obj → clone }` | `obj` is already in `visited` → reuse existing clone: `clone.self = visited.get(obj)` (= `clone` itself) | unchanged |

**Result:** `clone.self === clone` — the cycle is faithfully reproduced
in the clone, and recursion terminated at step 3 instead of looping
forever, because the clone was recorded in the map *before* its
properties were visited.

## JavaScript Solution

```js
function deepClone(value, visited = new WeakMap()) {
  // Primitives and null need no cloning — they're copied by value already.
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Dates are objects but have no enumerable own properties worth
  // recursing into — clone by timestamp instead.
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Already cloned this exact object earlier in this call — reuse that
  // clone. This is what breaks circular references and preserves
  // shared references instead of duplicating them.
  if (visited.has(value)) {
    return visited.get(value);
  }

  const clone = Array.isArray(value) ? [] : {};

  // Record the clone BEFORE recursing into children — if a child (or a
  // deeper descendant) refers back to `value`, this lookup is what
  // stops the recursion from looping forever.
  visited.set(value, clone);

  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], visited);
  }

  return clone;
}
```

## TypeScript Solution

```ts
function deepClone<T>(value: T, visited: WeakMap<object, unknown> = new WeakMap()): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (visited.has(value as object)) {
    return visited.get(value as object) as T;
  }

  const clone: unknown = Array.isArray(value) ? [] : {};
  visited.set(value as object, clone);

  for (const key of Object.keys(value as object)) {
    (clone as Record<string, unknown>)[key] = deepClone(
      (value as Record<string, unknown>)[key],
      visited,
    );
  }

  return clone as T;
}
```

## Time Complexity

O(n), where n is the total number of properties/elements across the
entire object graph (each is visited and cloned exactly once, since the
`visited` map prevents re-processing shared or circular references).

## Space Complexity

O(n) for the clone itself (proportional to the input's total size) plus
O(d) recursion-stack depth, where d is the maximum nesting depth, plus
O(n) for the `visited` map in the worst case (every object is distinct).

## Common Mistakes

- Using `JSON.parse(JSON.stringify(value))` — silently drops
  `undefined` values and functions, converts `Date`s to strings, throws
  on circular references, and can't clone `Map`/`Set`/`RegExp` — a
  common "works until it doesn't" shortcut that fails exactly the cases
  this question is testing.
- Doing a shallow copy (`{ ...value }` or `Object.assign({}, value)`) and
  calling it done — nested objects still share references with the
  original, so mutating a nested property in the "clone" mutates the
  original too.
- Recording the clone in the `visited` map *after* recursing into its
  children instead of before — this defeats cycle detection entirely,
  since the recursive call that would hit the cycle happens before the
  map entry exists.
- Forgetting `Date` (or other built-in object types like `RegExp`,
  `Map`, `Set`) as a special case and letting the generic object-clone
  path treat it as a plain object — a cloned `Date` handled generically
  loses its actual date behavior (no enumerable own properties to copy).

## Interview Follow-up Questions

1. How would you extend this to correctly clone `Map`, `Set`, and
   `RegExp` as well?
2. `structuredClone()` is now a built-in in modern JS runtimes — what
   does it handle that this hand-written version doesn't (and vice
   versa, e.g. functions)?
3. How would you clone an object that contains functions, given
   functions generally shouldn't (and often can't meaningfully) be
   deep-cloned?
4. What would change about this solution if you needed to preserve
   `Object.getPrototypeOf(value)` on the clone (i.e. clone class
   instances, not just plain objects)?

## Similar Questions

- Implement a shallow clone / `Object.assign` polyfill
- Deep Equal — compare two values for structural equality
- Flatten a nested object into dot-notation keys

---
[← Back to 61-javascript-coding](README.md)
