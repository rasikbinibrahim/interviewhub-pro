# T206 · The `this` Keyword: Call, Apply, Bind & Arrow Function Binding Rules

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe, Uber  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** this-binding, call, apply, bind, arrow-functions, execution-context  

## Question

How does JavaScript determine the value of the `this` keyword across Implicit Binding, Explicit Binding (`call`, `apply`, `bind`), `new` Binding, and Arrow Function Lexical Scope? What are the implementation differences between `Function.prototype.call`, `Function.prototype.apply`, and `Function.prototype.bind`?

## Expected Answer

1. **The 4 Rules of `this` Resolution (In Order of Precedence)**:
   - **Rule 1: `new` Binding**: When invoked with `new User()`, `this` refers to the newly created instance object.
   - **Rule 2: Explicit Binding**: `fn.call(context, arg1, arg2)`, `fn.apply(context, [arg1, arg2])`, or `fn.bind(context)` explicitly sets `this` to `context`.
   - **Rule 3: Implicit Binding**: When invoked as a method `obj.fn()`, `this` refers to the object preceding the dot (`obj`).
   - **Rule 4: Default Binding**: Plain function call `fn()` sets `this` to `window` / `globalThis` (or `undefined` in ES strict mode `'use strict'`).
2. **Arrow Functions Exception**: Arrow functions **completely bypass** these 4 rules. They inherit `this` lexically from their enclosing scope at definition time. Calling `call()`, `apply()`, or `bind()` on an arrow function has zero effect on its `this` binding.
3. **`call` vs `apply` vs `bind`**:
   - `call(thisArg, arg1, arg2)`: Executes function immediately with comma-separated arguments.
   - `apply(thisArg, [arg1, arg2])`: Executes function immediately with arguments passed as an array.
   - `bind(thisArg, arg1, arg2)`: **Returns a new bound function** with fixed `this` and partially applied arguments without executing immediately.

## Deep Explanation

### Custom `Function.prototype.bind` Polyfill

```javascript
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (thisArg, ...boundArgs) {
    const fn = this;
    if (typeof fn !== 'function') {
      throw new TypeError('Function.prototype.bind - item is not callable');
    }

    return function (...args) {
      // Execute original function with merged boundArgs and runtime args
      return fn.apply(thisArg, [...boundArgs, ...args]);
    };
  };
}
```

## Production Example

```javascript
const logger = {
  prefix: '[APP LOG]',
  log(message, level = 'INFO') {
    console.log(`${this.prefix} [${level}]: ${message}`);
  },
};

// 1. Lost Implicit Binding (Passing method as callback)
const logFn = logger.log;
// logFn('User logged in'); // Output: undefined [INFO]: User logged in (Lost `this`!)

// 2. Fix with `bind()`
const boundLogFn = logger.log.bind(logger);
boundLogFn('User logged in'); // Output: [APP LOG] [INFO]: User logged in

// 3. Partial Application with `bind()`
const logError = logger.log.bind(logger, 'Database connection failed', 'ERROR');
logError(); // Output: [APP LOG] [ERROR]: Database connection failed

// 4. `call` vs `apply`
logger.log.call(logger, 'Payment processed', 'SUCCESS');
logger.log.apply(logger, ['Payment processed', 'SUCCESS']);
```

## Best Practices

- Use `bind()` to preserve method context when passing callbacks to event handlers or timers in non-arrow method definitions.
- Prefer class field arrow methods `handleClick = () => {}` in React class components or event handlers to avoid manual `constructor` binding.

## Common Mistakes

- Attempting to re-bind `this` on an Arrow Function using `.bind(newContext)`, expecting it to change `this`.
- Invoking a method stored in a variable `const fn = obj.method; fn()` without binding, causing subtle `TypeError: Cannot read properties of undefined` in strict mode.

## Follow-up Questions

1. What happens when a function bound with `bind()` is instantiated with the `new` operator (`new BoundFn()`)? (The `new` binding overrides the `bind()` context!).

## Related Topics

- Function Declaration vs Function Expression vs Arrow Functions
- Scope, Scope Chain & Lexical Environment
