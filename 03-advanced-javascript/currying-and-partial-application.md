# T308 · Function Currying, Infinite Currying & Partial Application Polyfills

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** currying, partial-application, higher-order-functions, closures, polyfill  

## Question

What is the difference between Function Currying and Partial Application, how do you implement a generic `curry(fn)` polyfill in JavaScript, and how do you write an Infinite Currying function (`add(1)(2)(3)...()`)?

## Expected Answer

1. **Currying vs Partial Application**:
   - **Currying**: Transforms a function taking $N$ arguments `f(a, b, c)` into a sequence of unary functions taking one argument at a time `f(a)(b)(c)`.
   - **Partial Application**: Fixes a subset of arguments (one or more) of a function `f(a, b, c)`, returning a new function that accepts the remaining un-supplied arguments `fBound(b, c)`.
2. **Infinite Currying**: A curried function that continues returning a callable function until invoked with no arguments `add()`, at which point it returns the accumulated total.

## Deep Explanation

### Generic Curry Implementation

```javascript
// Generic Curry Higher-Order Function
export function curry(fn) {
  return function curried(...args) {
    // If accumulated arguments match or exceed fn's arity, invoke original fn
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return new function accumulating further arguments
    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

// Infinite Currying Function
export function infiniteAdd(a) {
  return function (b) {
    if (b !== undefined) {
      return infiniteAdd(a + b);
    }
    return a;
  };
}
```

## Production Example

```javascript
import { curry, infiniteAdd } from './curryUtils';

// 1. Production Use Case: Curried API Logger
const log = curry((level, domain, message) => {
  console.log(`[${level.toUpperCase()}] [${domain}]: ${message}`);
});

// Reusable Partially Applied Specialized Loggers
const logError = log('error');
const logAuthError = logError('AUTH');

logAuthError('Invalid credentials provided'); // Output: [ERROR] [AUTH]: Invalid credentials provided
logAuthError('Token expired');               // Output: [ERROR] [AUTH]: Token expired

// 2. Infinite Currying Execution
console.log(infiniteAdd(1)(2)(3)(4)()); // Output: 10
console.log(infiniteAdd(5)(10)());      // Output: 15
```

## Best Practices

- Use currying in functional programming contexts to create reusable, specialized utility functions with pre-configured parameters.
- Use `fn.length` to inspect the expected arity (parameter count) of target functions inside generic curry polyfills.

## Common Mistakes

- Forgetting rest parameter defaults (`func(...args = [])`) or default parameters inside target functions, which alters `fn.length` to `0`, breaking automatic arity detection in curry wrappers.

## Follow-up Questions

1. How does `Function.prototype.bind` natively provide partial application in ES5?

## Related Topics

- Closures, Lexical Environments & Encapsulation Patterns
- Higher-Order Functions & Composition Patterns
