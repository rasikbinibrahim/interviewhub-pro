# T225 · Arrow Functions vs Regular Functions: Lexical `this` & Prototype Differences

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** arrow-functions, this-binding, prototype, constructors  

## Question

What are the 5 major differences between ES6 **Arrow Functions** (`() => {}`) and **Regular Functions** (`function() {}`) regarding `this` binding, `arguments` object, `prototype`, constructor usage (`new`), and `super` keyword?

## Expected Answer

1. **Lexical `this`**: Arrow functions do NOT define their own `this`; they inherit `this` from enclosing scope.
2. **No `arguments` Object**: Arrow functions lack `arguments`; use Rest Parameters (`...args`).
3. **Not Constructible**: Arrow functions cannot be called with `new` (lack internal `[[Construct]]` method).
4. **No `prototype`**: Arrow functions do not have a `.prototype` property.
5. **No `duplicate` named parameters** in non-strict mode.

```javascript
const obj = {
  name: 'Widget',
  regularFn: function() { console.log(this.name); },
  arrowFn: () => { console.log(this.name); }, // Lexical window/undefined this!
};

obj.regularFn(); // Widget
obj.arrowFn();   // undefined
```
