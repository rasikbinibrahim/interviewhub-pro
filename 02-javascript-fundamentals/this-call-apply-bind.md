# this, call, apply & bind

> Core-depth topic — see [TEMPLATE.md](../TEMPLATE.md) for the full-depth
> section list.

## Theory

`this` is not determined by where a function is *defined* — it's determined
by **how the function is called** (the call-site), with one major
exception: arrow functions, which have no `this` of their own and instead
inherit it lexically from the enclosing scope at definition time.

Resolution order for a regular function's `this`, highest-precedence first:

1. **`new` binding** — `new Fn()` binds `this` to the newly created object.
2. **Explicit binding** — `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)()`.
3. **Implicit binding** — `obj.method()` binds `this` to `obj`.
4. **Default binding** — a bare function call binds `this` to `undefined`
   in strict mode, or the global object in non-strict mode.

`call`, `apply`, and `bind` all let you *explicitly* set `this`:

```js
function greet(greeting) { return `${greeting}, ${this.name}`; }
const user = { name: 'Rasik' };

greet.call(user, 'Hi');            // args passed individually
greet.apply(user, ['Hi']);         // args passed as an array
const bound = greet.bind(user);    // returns a new function, doesn't call it
bound('Hi');
```

`bind` is the only one of the three that doesn't invoke the function
immediately — it returns a new function with `this` (and optionally
leading arguments) permanently fixed.

## Real-world Example

```js
class Toggle {
  #on = false;
  constructor(button) {
    // Without .bind(this), `this` inside handleClick would be the button
    // element (implicit binding from addEventListener's call-site), not
    // the Toggle instance.
    button.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick() {
    this.#on = !this.#on;
    console.log('Toggle is now', this.#on);
  }
}
```

The equivalent fix using an arrow function as a class field, which never
needs `.bind()` because it captures `this` lexically at the point the
field is defined (inside the constructor's scope, so `this` is the
instance):

```js
class Toggle {
  #on = false;
  handleClick = () => {
    this.#on = !this.#on;
    console.log('Toggle is now', this.#on);
  };
}
```

## Interview Questions — Basic

1. What determines the value of `this` in a regular function?
2. What's the difference between `call` and `apply`?
3. Does `bind` invoke the function immediately?

## Interview Questions — Medium

1. Why does extracting a method off an object and calling it standalone
   (`const fn = obj.method; fn();`) lose the correct `this`?
2. Why do arrow functions never need `.bind(this)` inside a class method?
3. What does `new Fn()` do to `this`, step by step?

## Interview Questions — Advanced

1. Implement `Function.prototype.myBind` from scratch, supporting partial
   application of leading arguments.
2. Given the four `this`-binding rules (default, implicit, explicit, `new`),
   construct an example where two rules could both apply, and explain
   which one wins and why.
3. Why does a constructor function that explicitly `return`s a primitive
   have that return value ignored, while returning an object overrides the
   default `this`?

## Common Mistakes

- Passing a method as a bare callback (`el.addEventListener('click',
  obj.method)`) and being surprised `this` isn't `obj` inside it.
- Using `apply`/`call` when the simpler, non-`this`-changing spread
  syntax would do (`fn(...args)` instead of `fn.apply(null, args)`, when
  you don't actually need to change `this`).
- Forgetting that arrow functions **cannot** have their `this` changed by
  `call`/`apply`/`bind` at all — those methods silently have no effect on
  an arrow function's `this`.

## Best Practices

- Prefer arrow-function class fields for event handlers/callbacks that
  need the instance's `this` — it's more consistent than remembering to
  `.bind()` every method in the constructor.
- Reserve `call`/`apply` for the genuine case of borrowing a method from
  one object/prototype to run against another (e.g. array-like objects
  borrowing `Array.prototype` methods).
- Never rely on default binding (`this === undefined`/global) —  it's a
  footgun, not a feature; treat any function relying on it as a bug.

## Senior-level Discussion

The signal at senior level isn't reciting the four binding rules — it's
recognizing *in someone else's code* where `this` is about to break (a
method handed off as a callback, a nested regular function inside a
method losing access to the outer `this`) and knowing the idiomatic fix
for the specific context (arrow field vs. explicit `.bind()` vs.
capturing `const self = this`, and why the codebase should standardize on
one of these rather than mixing all three).

## References

- [MDN — this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [MDN — Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [ECMA-262 — ResolveThisBinding](https://tc39.es/ecma262/#sec-resolvethisbinding)

---
[← Back to 02-javascript-fundamentals](README.md)
