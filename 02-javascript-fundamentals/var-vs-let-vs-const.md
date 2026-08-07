# S1 · var vs let vs const

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Understand variable declarations and their scoping rules in JavaScript.

## Expected Answer

var is function-scoped with undefined hoisting. let is block-scoped and reassignable with TDZ hoisting. const is block-scoped, non-reassignable, and requires initialization.

## Deep Explanation

var is function-scoped, can be redeclared and reassigned, and is hoisted with undefined initialization.

let is block-scoped, can be reassigned but not redeclared, and is hoisted but remains in the Temporal Dead Zone until initialized.

const is block-scoped, cannot be redeclared or reassigned, must be initialized during declaration, and for objects/arrays the reference is fixed but internal values can still be modified.

## Production Example

```js
const API_URL = "https://api.com"; // default
let count = 0; // if value changes
// avoid var
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying var vs let vs const.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. let and const still hoist! They just hoist into a "Temporal Dead Zone" (TDZ).

## Related Topics

- JavaScript Fundamentals
