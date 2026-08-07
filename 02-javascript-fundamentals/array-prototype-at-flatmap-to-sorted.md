# T222 · Modern Array Prototype Methods: `at()`, `flatMap()`, `toSorted()`, and `toSpliced()`

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** array-methods, es2022, es2023, immutability  

## Question

How do modern ES2022/ES2023 Array methods (`arr.at(-1)`, `arr.flatMap()`, `arr.toSorted()`, `arr.toReversed()`, `arr.toSpliced()`) improve negative indexing, mapping flattening, and immutable array operations?

## Expected Answer

- **`at(index)`**: Allows negative index lookup (`arr.at(-1)` gets last element).
- **`flatMap(fn)`**: Maps elements and flattens result by 1 level in a single pass.
- **`toSorted()` / `toReversed()` / `toSpliced()`**: Non-mutating immutable copies of `sort`, `reverse`, and `splice`.

```javascript
const numbers = [3, 1, 4, 1, 5];

// Immutable sorting (does not mutate original numbers array!)
const sorted = numbers.toSorted((a, b) => a - b);
console.log(sorted);  // [1, 1, 3, 4, 5]
console.log(numbers); // [3, 1, 4, 1, 5]

console.log(numbers.at(-1)); // 5 (last element)
```
