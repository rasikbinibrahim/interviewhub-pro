# T321 · Polyfilling `Function.prototype.bind`, `call`, and `apply`

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** bind-polyfill, call-polyfill, apply-polyfill, this-binding, prototypes  

## Question

How do you implement polyfills for `Function.prototype.call`, `apply`, and `bind` without using native binding methods?

## Expected Answer

```javascript
Function.prototype.myCall = function (context = window, ...args) {
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this; // Attach function temporarily to context object
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myBind = function (context = window, ...boundArgs) {
  const targetFn = this;
  return function (...nextArgs) {
    return targetFn.myCall(context, ...boundArgs, ...nextArgs);
  };
};
```
