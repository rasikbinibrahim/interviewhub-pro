# T325 · Iterator Helpers Proposal: Lazy Evaluation Methods (`map`, `filter`, `take`, `drop`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** Advanced JavaScript  
**Concepts:** iterator-helpers, es-proposal, lazy-evaluation, iterators  

## Question

How do the **ECMAScript Iterator Helpers** extend JavaScript Iterators with lazy array-like processing methods (`iterator.map()`, `filter()`, `take()`, `drop()`, `flatMap()`) without allocating intermediate arrays?

## Expected Answer

- **Lazy Evaluation**: Processes values one element at a time on demand. Does not allocate full intermediate arrays in memory.
- **Infinite Stream Processing**: Works seamlessly on infinite generator streams.

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 5 even fibonacci numbers lazily!
const evenFibs = fibonacci()
  .filter((n) => n % 2 === 0)
  .take(5);

for (const num of evenFibs) {
  console.log(num);
}
```
