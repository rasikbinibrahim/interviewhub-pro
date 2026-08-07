# T223 · Rest Parameters (`...args`) vs Spread Operator (`...iterable`)

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** rest-parameters, spread-operator, es6  

## Question

How do **Rest Parameters** and the **Spread Operator** share identical `...` syntax while performing opposite data operations?

## Expected Answer

- **Rest Parameters (`...args`)**: Collects remaining individual arguments into a true Array inside function declarations. Must be final parameter.
- **Spread Operator (`...iterable`)**: Unpacks elements of an array/object into individual elements inside function calls or array/object literals.

```javascript
// Rest parameter collects arguments into an array
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

const nums = [1, 2, 3];
// Spread operator unpacks array into arguments
console.log(sum(...nums)); // 6
```
