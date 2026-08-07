# T327 · Tail Call Optimization (TCO) & Stack Frame Elimination

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Apple  
**Category:** Advanced JavaScript  
**Concepts:** tco, tail-recursion, call-stack, recursion  

## Question

What is **Tail Call Optimization (TCO)** in ES6, how does placing a recursive call in direct tail position (`return factorial(n-1, acc*n)`) eliminate stack frame allocation, and how do you write a Trampoline helper to prevent stack overflow in non-TCO engines?

```javascript
// Trampoline Function Helper for Unlimited Stack Recursion
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

const factorial = trampoline(function self(n, acc = 1) {
  if (n <= 1) return acc;
  return () => self(n - 1, n * acc); // Returns thunk function!
});
```
