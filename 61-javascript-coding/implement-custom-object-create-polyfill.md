# QJSC041 · Implement a Custom Object.create Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures / Prototypes
**Concepts:** prototype chain, constructor-function `.prototype` trick, `Object.setPrototypeOf`, `Object.defineProperties`

## Problem Statement

Implement `myObjectCreate(proto, propertiesObject)`. It should return a
brand-new object whose `[[Prototype]]` is `proto` — meaning property
lookups on the returned object that miss its own properties fall
through to `proto`. If a second argument is given, it's a property
descriptor map (the same shape `Object.defineProperties` accepts) that
should be applied to the new object before it's returned.

## Input

- `proto`: the object the new object's prototype should be linked to,
  or `null` for an object with no prototype at all.
- `propertiesObject` *(optional)*: a plain object mapping property names
  to property descriptors, applied to the newly created object.

## Output

A new object whose `[[Prototype]]` is `proto`, with any descriptors from
`propertiesObject` applied as its own properties.

## Constraints

- `proto` must be either `null` or an object (including a function,
  since functions are objects) — any other value (`undefined`, a
  number, a string, `true`, …) must throw a `TypeError`.
- When `proto` is `null`, the returned object must have **no**
  prototype at all — not even `Object.prototype` (so it has no
  inherited `toString`, `hasOwnProperty`, etc.).
- `propertiesObject`, when given, must be applied using real property
  descriptors (respecting `writable`/`enumerable`/`configurable`/
  `get`/`set`), not just copied as plain values.
- Must not call the native `Object.create` internally.

## Examples

| Call | Result | Why |
|---|---|---|
| `const proto = { greet() { return 'hi'; } }; myObjectCreate(proto).greet()` | `'hi'` | The returned object has no own `greet`, but inherits it via the prototype link to `proto` |
| `Object.getPrototypeOf(myObjectCreate(null))` | `null` | Passing `null` produces an object with no prototype chain at all |
| `myObjectCreate({}, {x: {value: 42, enumerable: true}}).x` | `42` | The descriptor map's `x` entry is applied as an own property via the same mechanism `Object.defineProperties` uses |

## Edge Cases

- `myObjectCreate(undefined)` → throws `TypeError` — `undefined` is
  neither `null` nor an object, so it's not a valid prototype value.
- `myObjectCreate(5)` or `myObjectCreate('text')` → throws `TypeError`
  for the same reason.
- `myObjectCreate(proto)` with `propertiesObject` omitted → returns an
  object linked to `proto` with **no** additional own properties.
- `myObjectCreate(null, {x: {value: 1, enumerable: true}})` → both
  behaviors combine: a prototype-less object that still owns `x`.
- Right after creation (before any descriptors are applied),
  `Object.keys(obj)` is empty even though `obj.greet` resolves and
  works — own properties and inherited properties are genuinely
  different things, and this distinction is the crux of the question.

## Hints

1. `Object.create`'s core behavior is entirely about the `[[Prototype]]`
   link. What plain-JS mechanism lets you construct an object with a
   `[[Prototype]]` of your choosing, using `new` together with a
   constructor function's `.prototype` property?
2. That constructor-function trick has one gap: setting a constructor's
   `.prototype` to `null` and then calling `new` on it does *not*
   produce a null-prototype object — the engine silently falls back to
   `Object.prototype` instead. What dedicated API exists specifically
   for changing an already-created object's prototype, that you could
   reach for only in this one special case?
3. `propertiesObject`'s entries aren't plain values to copy onto the
   object directly — they're descriptor objects (`{value, writable,
   enumerable, configurable}` or `{get, set, ...}`) that need to be
   applied through the same descriptor-based mechanism the rest of the
   language's property-definition APIs use.

## Algorithm

**Pattern:** constructor-function `.prototype` trick + descriptor
application.
**Core insight:** every object created with `new SomeCtor()` gets its
`[[Prototype]]` set to whatever `SomeCtor.prototype` currently is at
call time — so declaring a throwaway constructor function, pointing its
`.prototype` at the desired `proto`, and calling `new` on it produces an
object linked to exactly that prototype, without ever touching the
native `Object.create`. The one case this trick can't handle is
`proto === null`: assigning a non-object value (including `null`) to a
constructor's `.prototype` is simply ignored by `new`, which falls back
to `Object.prototype`. For that specific case, the object is created
first and then explicitly re-pointed to a `null` prototype via
`Object.setPrototypeOf` — a distinct, legitimate API from `Object.create`
itself, not the mechanism under test. Once the object's prototype is
correctly established, any `propertiesObject` is applied via
`Object.defineProperties`, which is exactly the descriptor-aware
mechanism `Object.create`'s real second argument relies on internally.
**Invariant:** by the time the function returns, the object's
`[[Prototype]]` exactly matches `proto` (or is `null`), and its own
properties exactly match whatever `propertiesObject` described — nothing
more, nothing less.

## Dry Run

**Input:** `const proto = { greet() { return 'hi'; } }; myObjectCreate(proto)`

| Step | Action | State |
|---|---|---|
| 1 | Validate `proto` — it's a non-null object, so it passes | continue |
| 2 | `proto !== null`, so declare `function Ctor() {}` and set `Ctor.prototype = proto` | `Ctor.prototype === proto` |
| 3 | `createdObject = new Ctor()` — the engine links `createdObject`'s `[[Prototype]]` to `Ctor.prototype`, which is `proto` | `createdObject`'s prototype is `proto` |
| 4 | `propertiesObject` is `undefined` → skip `Object.defineProperties` | `createdObject` has no own properties |
| 5 | Return `createdObject` | — |

Calling `createdObject.greet()` afterward: the engine looks for an own
`greet` property on `createdObject` (none), then walks up to its
`[[Prototype]]` (`proto`), finds `greet` there, and invokes it.
**Result:** `'hi'`.

## JavaScript Solution

```js
function myObjectCreate(proto, propertiesObject) {
  if (proto !== null && typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null: ' + proto);
  }

  let createdObject;

  if (proto === null) {
    // The constructor-function trick can't produce a null-prototype
    // object directly — assigning a constructor's .prototype to null
    // is ignored by `new`. setPrototypeOf is the one legitimate escape
    // hatch here, since it's a distinct API from Object.create itself.
    createdObject = {};
    Object.setPrototypeOf(createdObject, null);
  } else {
    function Ctor() {}
    Ctor.prototype = proto; // whatever new Ctor() creates will link to this
    createdObject = new Ctor();
  }

  if (propertiesObject !== undefined) {
    // defineProperties (not a plain assignment loop) preserves
    // writable/enumerable/configurable and getter/setter semantics.
    Object.defineProperties(createdObject, propertiesObject);
  }

  return createdObject;
}
```

## TypeScript Solution

```ts
function myObjectCreate<T extends object | null>(
  proto: T,
  propertiesObject?: PropertyDescriptorMap,
): T extends null ? Record<PropertyKey, unknown> : T {
  if (proto !== null && typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError(`Object prototype may only be an Object or null: ${String(proto)}`);
  }

  let createdObject: Record<PropertyKey, unknown>;

  if (proto === null) {
    createdObject = {};
    Object.setPrototypeOf(createdObject, null);
  } else {
    function Ctor(this: unknown) {}
    Ctor.prototype = proto;
    createdObject = new (Ctor as unknown as new () => Record<PropertyKey, unknown>)();
  }

  if (propertiesObject !== undefined) {
    Object.defineProperties(createdObject, propertiesObject);
  }

  return createdObject as T extends null ? Record<PropertyKey, unknown> : T;
}
```

## Time Complexity

O(k), where k is the number of descriptors in `propertiesObject` (each
descriptor is applied once via `Object.defineProperties`); creating the
prototype link itself is O(1) regardless of `proto`'s size.

## Space Complexity

O(k) — the returned object stores one own property per descriptor
applied; the prototype link itself adds no additional space, since it's
a reference to the existing `proto` object, not a copy of it.

## Common Mistakes

- Calling the native `Object.create` inside the polyfill as a shortcut —
  this "solves" the exercise by delegating to the exact API it's meant
  to reimplement.
- Assuming `SomeCtor.prototype = null; new SomeCtor()` produces a
  null-prototype object — the engine silently ignores a non-object
  `.prototype` value and falls back to `Object.prototype`, which
  silently produces the *wrong* result for `myObjectCreate(null)` if
  not special-cased.
- Skipping validation of `proto` entirely, allowing a number, string, or
  `undefined` to be silently accepted instead of throwing a `TypeError`
  — this diverges from the native contract that callers may rely on.
- Copying `propertiesObject`'s entries onto the new object with a plain
  `for...in` assignment loop instead of `Object.defineProperties` — this
  silently drops descriptor flags like `enumerable: false` and doesn't
  support getter/setter-based descriptors at all.

## Interview Follow-up Questions

1. How does `Object.create(proto)` compare, performance-wise, to `const
   obj = {}; Object.setPrototypeOf(obj, proto);` — why is
   `setPrototypeOf` on an already-created object generally discouraged
   in hot code paths despite producing an equivalent end result?
2. The classic pre-ES6 inheritance pattern is `Child.prototype =
   Object.create(Parent.prototype)`. Walk through what breaks if you
   instead wrote `Child.prototype = Parent.prototype` directly (sharing
   one prototype object instead of linking to a distinct one).
3. What's the practical difference between `Object.create(null)` and
   `{}` when building a "dictionary" object meant to hold arbitrary
   string keys supplied by untrusted input — why might the null-
   prototype version be the safer choice?
4. What should happen if an entry in `propertiesObject` mixes a `value`
   key with a `get`/`set` key — i.e. describes both a data descriptor
   and an accessor descriptor at once? How does the native
   `defineProperty` handle that, and does your implementation need to
   guard against it explicitly?

## Similar Questions

- [Implement an Object Property Descriptor Utility](implement-object-property-descriptor-utility.md)
- [Implement Function.prototype.bind (Polyfill)](function-bind-polyfill.md)
- [Implement Custom Object.assign Polyfill](implement-custom-object-assign-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
