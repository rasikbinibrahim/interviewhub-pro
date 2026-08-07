# T220 · JavaScript Data Types: Primitive Values vs Reference Objects

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** data-types, primitives, reference-types, stack-vs-heap  

## Question

What are the 7 Primitive Data Types in JavaScript, how are Primitive values stored on the Stack vs Reference objects on the Heap, and how does `typeof` handle null checks (`typeof null === 'object'`)?

## Expected Answer

- **7 Primitives**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. (Immutable, compared by value, stored on Stack).
- **Reference Types**: `Object`, `Array`, `Function`, `Date`, `RegExp`. (Mutable, compared by reference memory address, stored on Heap).
- **`typeof null === 'object'` Bug**: Historical artifact from JS 1.0 where object type tags used `000` bits, matching NULL pointer address representation.

```javascript
let x = 10;
let y = x; // Copy value (Stack)
y = 20;
console.log(x); // 10

let obj1 = { val: 10 };
let obj2 = obj1; // Copy reference address (Heap pointer)
obj2.val = 20;
console.log(obj1.val); // 20
```
