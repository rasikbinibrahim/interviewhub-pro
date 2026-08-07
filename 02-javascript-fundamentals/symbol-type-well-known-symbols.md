# T231 · ES6 Symbols & Well-Known Symbols (`Symbol.iterator`, `Symbol.toPrimitive`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** symbol, well-known-symbols, metaprogramming  

## Question

How do **Symbols** (`Symbol('desc')`) create guaranteed unique property keys, and how do **Well-Known Symbols** (`Symbol.iterator`, `Symbol.hasInstance`, `Symbol.toPrimitive`) customize object metaprogramming behavior?

```javascript
const customIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.data[index++],
        done: index > this.data.length
      })
    };
  }
};

for (const val of customIterable) {
  console.log(val); // 10, 20, 30
}
```
