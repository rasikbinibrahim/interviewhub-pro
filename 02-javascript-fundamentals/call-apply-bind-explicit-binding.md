# T217 · Explicit Binding: `call()`, `apply()`, and `bind()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** call, apply, bind, this-binding, explicit-binding  

## Question

How do `Function.prototype.call()`, `Function.prototype.apply()`, and `Function.prototype.bind()` work, and how do they differ in argument passing and execution timing?

## Expected Answer

- **`call(thisArg, arg1, arg2, ...)`**: Invokes the function immediately with explicit `this` binding and comma-separated arguments.
- **`apply(thisArg, [argsArray])`**: Invokes the function immediately with explicit `this` binding and arguments passed as an array.
- **`bind(thisArg, arg1, ...)`**: Returns a **new bound function** with fixed `this` binding and optional pre-filled partial arguments without immediate execution.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'Alice' };

console.log(greet.call(user, 'Hello', '!')); // Hello, Alice!
console.log(greet.apply(user, ['Hi', '.']));  // Hi, Alice.

const boundGreet = greet.bind(user, 'Hey');
console.log(boundGreet('?'));                // Hey, Alice?
```
