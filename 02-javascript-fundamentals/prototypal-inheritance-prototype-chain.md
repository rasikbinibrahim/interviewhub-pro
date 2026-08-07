# T230 · Prototypal Inheritance & The Prototype Chain (`__proto__` vs `prototype`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** prototype, prototypal-inheritance, prototype-chain, object-create  

## Question

How does JavaScript implement **Prototypal Inheritance** via internal `[[Prototype]]` delegation links, and how do `Function.prototype` and `Object.prototype` terminate the prototype chain at `null`?

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound.`;
};

const dog = new Animal('Rex');
console.log(dog.speak()); // Rex makes a sound.
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (Chain terminates!)
```
