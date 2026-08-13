# QJSC012 · Implement Custom Function.prototype.call and Function.prototype.apply Polyfills

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Functions / `this` Binding
**Concepts:** `this` binding mechanics, temporary method assignment, `Symbol`-keyed properties to avoid collisions, `thisArg` defaulting, `try`/`finally` cleanup

## Problem Statement

Implement `myCall` and `myApply` as polyfills on `Function.prototype`,
without using the native `Function.prototype.call`, `.apply`, or `.bind`
anywhere inside them (that would just delegate to the exact mechanism
being reimplemented). `myCall(thisArg, ...args)` should invoke the
function it's called on with `this` bound to `thisArg` and each
argument passed individually. `myApply(thisArg, argsArray)` should do
the same, but take its arguments as a single array (or omit them
entirely).

## Input

- `myCall`: `thisArg` (the value `this` should resolve to inside the
  function), followed by zero or more individual arguments.
- `myApply`: `thisArg`, followed by an array-like of arguments (or
  `null`/`undefined` to call with no arguments).
- Both are invoked *on* a function value, e.g. `someFn.myCall(obj, 1, 2)`.

## Output

Whatever the underlying function returns, invoked with `this` bound to
`thisArg` and the given arguments applied.

## Constraints

- Must not use the native `Function.prototype.call`, `.apply`, or
  `.bind` internally.
- `thisArg` being `null` or `undefined` must default to the global
  object (`globalThis`), matching native non-strict-mode `call`/`apply`
  behavior.
- `myApply`'s second argument may be omitted, `null`, or `undefined` —
  all three mean "call with no arguments."
- Must correctly forward however many arguments are given, in order.
- Must not permanently mutate the object `thisArg` resolves to — any
  temporary property used to make the call must be removed afterward,
  even if the underlying function throws.

## Examples

| Code | Result | Why |
|---|---|---|
| `function greet(greeting) { return `${greeting}, ${this.name}`; } greet.myCall({name: 'Ada'}, 'Hello')` | `'Hello, Ada'` | `this` is bound to `{name: 'Ada'}`; the single argument is forwarded individually |
| `greet.myApply({name: 'Ada'}, ['Hi'])` | `'Hi, Ada'` | Same binding, but the argument arrives as an array instead of individual parameters |
| `function whoAmI() { return this; } whoAmI.myCall(null) === globalThis` | `true` | A `null`/`undefined` `thisArg` defaults to the global object, matching native non-strict `call` |

## Edge Cases

- `thisArg` is `null` or `undefined` → defaults to `globalThis`, since
  you cannot attach a temporary property to `null`/`undefined` directly.
- `thisArg` already owns a property with the same name the polyfill
  would use internally → must not collide with or overwrite it (this is
  exactly why a `Symbol` key, not a string key, is used).
- `myApply` called with its second argument omitted entirely (`fn.myApply(obj)`)
  → equivalent to calling with zero arguments, not a thrown error.
- The underlying function throws → the temporary property attached to
  `thisArg` must still be removed before the error propagates, not left
  behind as a leak.
- `myCall`/`myApply` invoked on something that isn't callable (e.g.
  copied off `Function.prototype` and applied to a non-function `this`)
  → in a production polyfill this should throw a `TypeError`, matching
  native behavior; discussed further in Common Mistakes.

## Hints

1. For `this` to resolve correctly inside the invoked function, it must
   actually be called *as a method of* `thisArg` (`thisArg.fn(...)`),
   not called standalone — how could you temporarily attach the function
   to `thisArg` so you can call it that way?
2. Attaching it under an ordinary string key like `'fn'` risks silently
   overwriting a real property already on the caller's object — what
   kind of property key is guaranteed to never collide with anything a
   user could already have?
3. Whatever key you use has to be removed again after the call — even if
   the function throws partway through — otherwise every single call
   permanently pollutes `thisArg` with a leftover property.

## Algorithm

**Pattern:** temporary method assignment, using `Function.prototype`'s
own `this`-binding rule (calling `obj.method()` binds `this` to `obj`
for the duration of that call).
**Core insight:** JavaScript doesn't offer a direct way to say "invoke
this standalone function with `this` set to that other object" without
either the native `call`/`apply`/`bind` or this exact trick: attach the
function as a property *on* the target object, invoke it through that
property (which makes the engine bind `this` to the object naturally),
then remove the property. Using a `Symbol` as the property key, rather
than a string, guarantees it can never collide with — or overwrite — any
property the caller's object already has, since every `Symbol()` call
produces a value unique from every other value in the language.
**Invariant:** after `myCall`/`myApply` returns *or throws*, `thisArg`
(coerced to an object) is left in exactly the state it was in before the
call — the temporary `Symbol` property never survives past the `finally`
block.

## Dry Run

**Input:** `greet.myCall({name: 'Ada'}, 'Hello')`, where `greet` is
`function greet(greeting) { return `${greeting}, ${this.name}`; }`

| Step | Action | State |
|---|---|---|
| 1 | `thisArg = {name: 'Ada'}` — not `null`/`undefined`, so `context = Object({name: 'Ada'})` (already an object, unchanged) | `context = {name: 'Ada'}` |
| 2 | `fnKey = Symbol('fn')` — a fresh, guaranteed-unique key | `fnKey` created |
| 3 | `context[fnKey] = greet` — attach `greet` as a temporary method | `context = {name: 'Ada', [fnKey]: greet}` |
| 4 | Call `context[fnKey]('Hello')` — invoked as a method, so `this` resolves to `context` inside `greet` | returns `'Hello, Ada'` |
| 5 | `finally` block: `delete context[fnKey]` — cleanup runs regardless of success or throw | `context = {name: 'Ada'}` |

**Result:** `'Hello, Ada'` is returned, and `{name: 'Ada'}` is left
exactly as it started — no leftover property.

## JavaScript Solution

```js
Function.prototype.myCall = function (thisArg, ...args) {
  // A null/undefined thisArg defaults to the global object, matching
  // native non-strict-mode `call` behavior.
  const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

  // A Symbol key can never collide with an existing property name on
  // context, unlike a string key such as 'fn'.
  const fnKey = Symbol('fn');
  context[fnKey] = this; // `this` here is the function myCall was invoked on

  try {
    // Calling context[fnKey](...) makes the engine bind `this` inside
    // the function to `context` for the duration of this one call.
    return context[fnKey](...args);
  } finally {
    delete context[fnKey]; // clean up even if the call threw
  }
};

Function.prototype.myApply = function (thisArg, argsArray) {
  const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);
  const fnKey = Symbol('fn');
  context[fnKey] = this;

  // apply's second argument may be omitted, null, or undefined —
  // all three mean "call with no arguments."
  const args = argsArray === null || argsArray === undefined ? [] : Array.from(argsArray);

  try {
    return context[fnKey](...args);
  } finally {
    delete context[fnKey];
  }
};
```

## TypeScript Solution

```ts
interface Function {
  myCall<T, Args extends unknown[], R>(
    this: (this: T, ...args: Args) => R,
    thisArg: T,
    ...args: Args
  ): R;
  myApply<T, Args extends unknown[], R>(
    this: (this: T, ...args: Args) => R,
    thisArg: T,
    argsArray?: Args | null,
  ): R;
}

Function.prototype.myCall = function <T, Args extends unknown[], R>(
  this: (this: T, ...args: Args) => R,
  thisArg: T,
  ...args: Args
): R {
  const context = (thisArg === null || thisArg === undefined ? globalThis : Object(thisArg)) as T &
    Record<PropertyKey, unknown>;
  const fnKey = Symbol('fn');
  context[fnKey] = this;

  try {
    return (context[fnKey] as (...args: Args) => R)(...args);
  } finally {
    delete context[fnKey];
  }
};

Function.prototype.myApply = function <T, Args extends unknown[], R>(
  this: (this: T, ...args: Args) => R,
  thisArg: T,
  argsArray?: Args | null,
): R {
  const context = (thisArg === null || thisArg === undefined ? globalThis : Object(thisArg)) as T &
    Record<PropertyKey, unknown>;
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const args = (argsArray ?? ([] as unknown as Args)) as Args;

  try {
    return (context[fnKey] as (...args: Args) => R)(...args);
  } finally {
    delete context[fnKey];
  }
};
```

## Time Complexity

O(m), where m is the number of arguments being forwarded — attaching
and deleting the temporary property is O(1), and spreading/copying the
argument list is proportional to its length (the underlying function's
own execution time isn't counted as part of the polyfill's cost).

## Space Complexity

O(m) — one temporary property on `context` (O(1)) plus an argument
array/list of size m (`myApply`'s `Array.from(argsArray)`, or the
`...args` rest parameter in `myCall`).

## Common Mistakes

- Using a plain string key like `'fn'` instead of a `Symbol` — this can
  silently overwrite a real property of the same name that already
  existed on `thisArg`, and `delete`-ing it afterward permanently
  destroys the original value instead of restoring it (a `Symbol` key
  sidesteps the problem entirely, since it can never match an existing
  property name).
- Forgetting to default a `null`/`undefined` `thisArg` to `globalThis`
  before attaching the temporary property — assigning a property
  directly onto `null` or `undefined` throws a `TypeError` immediately.
- Omitting the `try`/`finally` — if the underlying function throws, the
  temporary property is never cleaned up, permanently leaking an
  internal `Symbol`-keyed property onto the caller's object.
- Implementing `myCall`/`myApply` by delegating to the native
  `Function.prototype.call`/`.apply`/`.bind` internally — this "solves"
  the exercise by calling the exact mechanism it's supposed to
  reimplement, which defeats the entire point of a polyfill question.
- For `myApply`, treating a missing/`undefined` second argument as an
  error instead of "call with zero arguments" — native `apply` accepts
  this and so must the polyfill.

## Interview Follow-up Questions

1. How would you implement `Function.prototype.bind` using this same
   temporary-method-assignment idea, and what's fundamentally different
   about `bind` (it returns a new function for later invocation instead
   of calling immediately, and supports partial application of
   arguments)?
2. Real (native) `call`/`apply` box a primitive `thisArg` (e.g. `5` or
   `'text'`) into a wrapper object (`Number`/`String`) in non-strict
   mode — how does `Object(thisArg)` in this solution already handle
   that, and what would change in strict mode?
3. Construct a concrete object where a naive string-key polyfill (using
   `'fn'` as the temporary key) would silently corrupt the caller's
   data — why does a `Symbol` key eliminate that entire class of bug?
4. How does strict mode change what `this` defaults to when `thisArg` is
   `null`/`undefined`? (Native `call`/`apply` pass `null`/`undefined`
   through as-is in strict-mode functions, rather than substituting the
   global object.)
5. Could this be implemented without ever mutating `thisArg`, e.g. using
   `Reflect.apply`? What would that trade off, given `Reflect.apply` is
   itself the modern built-in replacement for this exact mechanism?

## Similar Questions

- [Implement Function.prototype.bind (Polyfill)](function-bind-polyfill.md)
- [Implement a Custom EventEmitter](event-emitter.md) — another
  question centered on correct `this` handling across invocations
- [Implement Custom Object.create Polyfill](implement-custom-object-create-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
