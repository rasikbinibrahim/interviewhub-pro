# T214 · Advanced Function Currying & Infinite Currying (`add(1)(2)(3)...()`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** currying, closures, higher-order-functions, infinite-currying  

## Question

What is **Function Currying**, how does it transform a function taking multiple arguments `fn(a, b, c)` into a sequence of unary functions `fn(a)(b)(c)`, how do you build a generic `curry()` polyfill for functions with fixed arity, and how do you implement **Infinite Currying** (`add(1)(2)(3)...()`)?

## Expected Answer

1. **Currying Definition**: Currying is a functional programming technique where a function with multiple arguments is transformed into a series of nested functions, each accepting a single argument.
2. **Fixed Arity Polyfill (`curry(fn)`)**:
   - Compares accumulated arguments length against `fn.length` (expected parameters count).
   - If accumulated args $\ge$ `fn.length`: Invoke original function `fn(...args)`.
   - Else: Return a new function collecting remaining arguments.
3. **Infinite Currying (`add(1)(2)(3)...()`)**:
   - Returns a recursive function until an empty invocation `()` is received, which triggers sum evaluation.

## Deep Explanation

### Currying Transformation Flow

```
Standard Function: sum(1, 2, 3) ──► Returns 6

Curried Version:   sum(1)(2)(3) ──► Returns 6
                   ├── Accepts 1 -> returns inner fn
                   ├── Accepts 2 -> returns inner fn
                   └── Accepts 3 -> calculates sum!
```

## Production Example

```javascript
// 1. Generic Curry Polyfill for Fixed Arity Functions
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 2. Infinite Currying Implementation
export function add(a) {
  return function (b) {
    if (b !== undefined) {
      return add(a + b); // Continue chaining!
    }
    return a; // Terminal empty invocation returns accumulated sum!
  };
}

// 3. Alternative ValueOf / ToString Infinite Currying
export function addImplicit(a) {
  let sum = a;
  function inner(b) {
    sum += b;
    return inner;
  }
  inner.valueOf = () => sum;
  inner.toString = () => String(sum);
  return inner;
}
```

```javascript
// Usage Examples
const sum3 = (a, b, c) => a + b + c;
const curriedSum = curry(sum3);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6

console.log(add(1)(2)(3)(4)());   // 10
console.log(+addImplicit(1)(2)(3)); // 6 (via valueOf coercion!)
```

## Best Practices

- Use currying for partial application of configuration settings (e.g., pre-configuring logger namespaces or API endpoint base URLs).
- Use `fn.length` to detect function arity dynamically when writing higher-order utility wrappers.

## Common Mistakes

- Forgetting to handle empty arguments `()` in infinite currying patterns, causing function references to be returned instead of evaluated primitive values.

## Follow-up Questions

1. How does Partial Application differ from Function Currying? (Partial application binds a fixed subset of arguments at once, while currying strictly transforms functions into single-argument chains).

## Related Topics

- Real-World Closure Use Cases: Private Variables & Module Pattern
- Type Coercion: `valueOf()` vs `toString()`
