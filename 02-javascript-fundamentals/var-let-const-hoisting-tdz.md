# T219 · Scope & Hoisting: `var`, `let`, `const`, and Temporal Dead Zone (TDZ)

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** var, let, const, hoisting, tdz, scope  

## Question

How do `var`, `let`, and `const` differ in scope (function vs block), hoisting initialization, re-declaration, and the Temporal Dead Zone (TDZ)?

## Expected Answer

- **`var`**: Function-scoped, hoisted and initialized to `undefined`, allows re-declaration.
- **`let` / `const`**: Block-scoped (`{}`), hoisted but NOT initialized (triggers `ReferenceError` inside TDZ), forbids re-declaration.
- **Temporal Dead Zone (TDZ)**: Period between entering scope and reaching variable declaration line.

```javascript
console.log(a); // undefined (hoisted!)
var a = 10;

// console.log(b); // Uncaught ReferenceError: Cannot access 'b' before initialization (TDZ!)
let b = 20;
```
