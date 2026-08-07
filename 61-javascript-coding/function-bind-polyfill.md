# Q504 · Implement Function.prototype.bind (Polyfill)

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft, Meta, Adobe, LinkedIn
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → `this` Binding / Prototypes
**Concepts:** `this` binding, `apply`/`call`, partial application, `new` interaction with bound functions

## Problem Statement

Implement `myBind`, a polyfill for `Function.prototype.bind`. Attached
to `Function.prototype`, `fn.myBind(thisArg, ...boundArgs)` must return
a new function that, when called, invokes `fn` with `this` permanently
set to `thisArg` and `boundArgs` prepended to whatever arguments the
returned function is called with — and any of those must not be
overridable later (e.g. calling `.call()` on the bound function must not
change its `this`).

## Input

Called as a method on a function: `fn.myBind(thisArg, arg1, arg2, ...)`.

- `thisArg`: the value `this` should be permanently bound to inside `fn`
- `...boundArgs`: zero or more arguments to permanently prepend to every
  call

## Output

A new function. Calling `boundFn(a, b)` invokes `fn` with
`this = thisArg` and arguments `[...boundArgs, a, b]`.

## Constraints

- `this` inside `fn` must be `thisArg` on every call to the bound
  function, regardless of how the bound function is later called
  (including via `.call()`/`.apply()` on the bound function itself,
  which must have no effect on `this`).
- Arguments passed at bind time and arguments passed at call time must
  both reach `fn`, in that order (bound args first).
- The bound function must work correctly when used as a constructor with
  `new` — in that case, `this` inside `fn` should be the newly created
  instance, not `thisArg` (this is real `bind` behavior, and the
  trickiest part of the polyfill).
- Must not use the real `Function.prototype.bind` internally.

## Examples

| Setup | Call | Result |
|---|---|---|
| `const obj = { x: 42 }; function getX() { return this.x; } const bound = getX.myBind(obj);` | `bound()` | `42` |
| `function add(a, b) { return a + b; } const add5 = add.myBind(null, 5);` | `add5(3)` | `8` (bound arg `5` + call arg `3`) |
| `const bound = getX.myBind(obj);` | `bound.call({ x: 99 })` | `42` — `.call()` cannot override an already-bound `this` |
| `function Point(x, y) { this.x = x; this.y = y; } const BoundPoint = Point.myBind(null, 1);` | `new BoundPoint(2)` | a new object with `x: 1, y: 2` — `new` overrides the bound `this`, using the new instance instead |

## Edge Cases

- Bound function called with `new` → `this` must be the newly
  constructed instance, *not* `thisArg` — this is the one case where the
  "permanent" binding is intentionally overridden by JS's own `new`
  semantics, and is the part most naive polyfills get wrong.
- No `boundArgs` provided at bind time → call-time arguments alone are
  forwarded, unchanged.
- `thisArg` is `null`/`undefined` (non-strict-mode functions would
  normally default `this` to the global object in that case) — the
  polyfill should just forward `thisArg` as given via `apply`, matching
  native `bind`'s behavior.
- Binding an already-bound function (`fn.myBind(a).myBind(b)`) → the
  *first* bind wins; the second bind cannot change `this` again (native
  `bind` has this property too, since the second call binds the
  already-`this`-locked wrapper).

## Hints

1. The core of `bind` is a closure: return a new function that, when
   eventually called, uses `fn.apply(thisArg, mergedArgs)` — where do
   `fn` and `thisArg` need to be captured so the returned function can
   still see them later?
2. Merging arguments means concatenating the args captured at bind time
   with whatever args the returned function receives when it's actually
   called — two separate `arguments`/rest-parameter captures, joined.
3. To detect "was this called with `new`?" inside the returned function,
   check `this instanceof boundFn` — when a function is called with
   `new`, `this` inside it is a fresh object whose prototype chain
   includes the function being constructed, which is exactly what that
   check detects; when *not* called with `new`, fall back to
   `fn.apply(thisArg, mergedArgs)` instead.

## Algorithm

**Pattern:** closures + `apply` + a runtime check for `new`-invocation.
**Core insight:** `bind`'s "permanent `this`" is just a closure capturing
`thisArg` once and always using it via `apply` — the interesting part is
that `new` needs to be able to override that. Since `new fn()` sets
`this` inside the *bound* function to a fresh object linked to the bound
function's own prototype, checking `this instanceof boundFn` inside the
returned function reliably distinguishes "called with `new`" (this
check is true) from "called normally" (this check is false, since a
plain call's `this` isn't an instance of anything related to `boundFn`).
For the `new` path, the original `fn` needs to run *as a constructor*
against the same new instance, which `Reflect.construct` (or, in an
ES5-style polyfill, manipulating the prototype chain manually) handles
correctly, including using the new instance's `this` rather than
`thisArg`.
**Invariant:** every call to the bound function forwards to `fn` with
bound arguments first, then call-time arguments — the only thing that
varies per call is which `this` value is used, decided by whether the
call was made with `new`.

## Dry Run

**Input:**
```js
function greet(greeting, name) {
  return `${greeting}, ${name}! I am ${this.role}.`;
}
const bound = greet.myBind({ role: 'assistant' }, 'Hello');
bound('Rasik');
```

| Step | What happens |
|---|---|
| 1 | `greet.myBind({ role: 'assistant' }, 'Hello')` captures `fn = greet`, `thisArg = { role: 'assistant' }`, `boundArgs = ['Hello']`, and returns a new `boundFn` closing over all three |
| 2 | `bound('Rasik')` calls `boundFn` normally (not with `new`) — the `this instanceof boundFn` check is false |
| 3 | `boundFn` merges args: `[...boundArgs, ...callArgs]` = `['Hello', 'Rasik']` |
| 4 | `boundFn` calls `fn.apply(thisArg, ['Hello', 'Rasik'])`, i.e. `greet.apply({ role: 'assistant' }, ['Hello', 'Rasik'])` |
| 5 | Inside `greet`, `this.role` = `'assistant'`, `greeting` = `'Hello'`, `name` = `'Rasik'` |

**Result:** `"Hello, Rasik! I am assistant."` — matches native `bind`'s
behavior for a non-`new` call.

## JavaScript Solution

```js
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalFn = this; // the function `.myBind` was called on

  function boundFn(...callArgs) {
    const allArgs = [...boundArgs, ...callArgs];

    // `new boundFn(...)` makes `this` an instance linked to boundFn's
    // prototype — that's exactly what `instanceof` detects here. In
    // that case, `new` must win over the bound `this`.
    if (this instanceof boundFn) {
      return Reflect.construct(originalFn, allArgs, boundFn);
    }

    // Normal call — always use the permanently bound `this`, ignoring
    // whatever `this` the caller tried to supply (e.g. via .call()).
    return originalFn.apply(thisArg, allArgs);
  }

  // So `new boundFn()` produces instances that are still `instanceof
  // originalFn`, matching native bind's prototype-chain behavior.
  boundFn.prototype = Object.create(originalFn.prototype || {});

  return boundFn;
};
```

## TypeScript Solution

```ts
interface Function {
  myBind<T, Args extends unknown[], Return>(
    this: (this: T, ...args: Args) => Return,
    thisArg: T,
    ...boundArgs: Partial<Args>
  ): (...rest: unknown[]) => Return;
}

Function.prototype.myBind = function (
  this: (...args: unknown[]) => unknown,
  thisArg: unknown,
  ...boundArgs: unknown[]
) {
  const originalFn = this;

  function boundFn(this: unknown, ...callArgs: unknown[]) {
    const allArgs = [...boundArgs, ...callArgs];

    if (this instanceof boundFn) {
      return Reflect.construct(
        originalFn as new (...args: unknown[]) => unknown,
        allArgs,
        boundFn as unknown as new (...args: unknown[]) => unknown,
      );
    }

    return originalFn.apply(thisArg, allArgs);
  }

  boundFn.prototype = Object.create(
    (originalFn as { prototype?: object }).prototype ?? {},
  );

  return boundFn;
};
```

## Time Complexity

O(k) per call, where k is the number of arguments being merged (bound +
call-time) — spreading and concatenating argument arrays is linear in
their combined length; everything else is O(1).

## Space Complexity

O(k) per call for the merged arguments array; O(1) additional fixed
state (`originalFn`, `thisArg`, `boundArgs`) captured once per `myBind`
call, shared across all future invocations of that particular bound
function.

## Common Mistakes

- Ignoring the `new` case entirely and always calling `fn.apply(thisArg,
  args)` — this works for normal calls but silently breaks using the
  bound function as a constructor, since the constructed instance would
  incorrectly get `thisArg`'s properties instead of being its own fresh
  object.
- Forgetting to set `boundFn.prototype` — without it, instances created
  via `new boundFn()` don't have the correct prototype chain, so
  `instanceof originalFn` checks on those instances fail.
- Not merging bound-time and call-time arguments in the correct order
  (bound args must come first) — reversing the order silently breaks any
  caller relying on partial application (`add.myBind(null, 5)` then
  calling with the remaining argument).
- Allowing `.call()`/`.apply()` on the *returned* bound function to
  override `thisArg` — this is exactly what real `bind` prevents, and a
  polyfill that just does `return fn.bind(...)`-style delegation without
  actually locking `this` down defeats the purpose of the exercise.

## Interview Follow-up Questions

1. How would you polyfill `Function.prototype.call` and
   `Function.prototype.apply` themselves (i.e. without using the native
   versions either)?
2. What's the difference between how `bind` and `call`/`apply` handle
   argument passing and *when* the function actually executes?
3. Why does `Reflect.construct` (or manual prototype manipulation) matter
   here instead of just `new originalFn(...allArgs)` directly?
4. How would partial application via `bind` compare to implementing a
   general-purpose `curry` function — where do the two overlap, and
   where do they differ?

## Similar Questions

- Implement `Function.prototype.call` (Polyfill)
- Implement `Function.prototype.apply` (Polyfill)
- Implement a `curry` function
- Implement `once(fn)` — a function that only ever runs `fn` on its
  first call

---
[← Back to 61-javascript-coding](README.md)
