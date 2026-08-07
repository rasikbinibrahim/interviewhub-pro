# Prototypes & Inheritance

> Core-depth topic — see [TEMPLATE.md](../TEMPLATE.md) for the full-depth
> section list.

## Theory

Every JavaScript object has an internal `[[Prototype]]` link to another
object (or `null`). When you access a property that doesn't exist on the
object itself, the engine walks up this chain — object → its prototype →
that prototype's prototype → ... → `null` — looking for it. This is
**prototypal inheritance**: objects delegate to other *objects*, not to
class blueprints.

`class` syntax (ES6+) is sugar over the same mechanism:

```js
class Animal {
  speak() { return 'some sound'; }
}
class Dog extends Animal {}

const d = new Dog();
d.speak(); // 'some sound' — found by walking the prototype chain

Object.getPrototypeOf(Dog.prototype) === Animal.prototype; // true
```

`Object.create(proto)` builds an object linked directly to `proto`,
bypassing constructors entirely — the most explicit way to see the
mechanism with nothing else going on:

```js
const animal = { speak() { return 'sound'; } };
const dog = Object.create(animal);
dog.speak(); // 'sound' — delegated up the chain
```

## Real-world Example

```js
// instanceof walks the prototype chain looking for a reference match
function Vehicle() {}
const car = new Vehicle();

car instanceof Vehicle; // true

Vehicle.prototype = {}; // reassigned AFTER `car` was created
car instanceof Vehicle; // false — car's chain still points to the OLD prototype object
```

## Interview Questions — Basic

1. What is the prototype chain, and what happens when you access a
   property that isn't found on the object itself?
2. How does `class ... extends` relate to prototypes under the hood?
3. What does `Object.create(null)` give you that a plain `{}` doesn't?

## Interview Questions — Medium

1. Explain the `instanceof` example above — why does reassigning
   `Vehicle.prototype` after `car` was created break the check?
2. What's the difference between `Object.create(proto)` and
   `new Ctor()` for producing an object linked to `proto`?
3. Why is `Object.create(null)` used to build objects that will hold
   untrusted, user-controlled keys?

## Interview Questions — Advanced

1. `instanceof` checks a reference match against `Ctor.prototype`. What
   observable failure mode does that create for values crossing realms
   (e.g. an array constructed inside an iframe)? How does
   `Array.isArray()` avoid it?
2. Implement a `mixin` helper that composes multiple behaviors into a
   class via the prototype chain, without true multiple inheritance.
3. Explain method resolution when a subclass, its parent, and `Object.prototype`
   all define a property with the same name — which wins, and why.

## Common Mistakes

- Treating `class` as a fundamentally different inheritance model from
  prototypes, rather than syntax over the same chain — this breaks down
  the moment a candidate is asked about static inheritance or method
  resolution order.
- Mutating `Array.prototype`/`Object.prototype` directly ("monkey-patching
  built-ins") — a classic anti-pattern that silently affects every object
  in the program, including third-party code.
- Assuming `instanceof` is a robust type check across all contexts — it
  fails across realms/iframes; `Array.isArray()` exists specifically to
  route around that for arrays.

## Best Practices

- Prefer `class` syntax for anything with more than one or two methods —
  it communicates intent more clearly than a hand-rolled prototype chain,
  while being the exact same mechanism underneath.
- Use `Object.create(null)` for objects functioning as dictionaries keyed
  by untrusted input, to avoid prototype-pollution surface.
- Never modify built-in prototypes in application code — if you need
  shared behavior across unrelated types, use composition/mixins instead.

## Senior-level Discussion

The signal at senior level is being able to move fluidly between the
`class` syntax candidates are used to and the underlying prototype-chain
mechanics an interviewer might probe — e.g. explaining exactly what
`super.method()` does in terms of the chain, or why static members are
inherited too. Candidates who only know the `class` syntax without the
underlying model tend to get stuck the moment a question steps slightly
outside idiomatic usage.

## References

- [MDN — Object prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes)
- [MDN — instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
- [ECMA-262 — Ordinary Object Internal Methods and Internal Slots](https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots)

---
[← Back to 02-javascript-fundamentals](README.md)
