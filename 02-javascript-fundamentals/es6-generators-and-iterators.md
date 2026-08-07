# T221 · ES6 Iterators & Generator Functions (`function*`, `yield`, `next()`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** generators, iterators, yield, es6, async-generators  

## Question

How do **ES6 Generator Functions** (`function*`) pause and resume execution using `yield` and `generator.next()`, and how do Iterators conform to the `[Symbol.iterator]` protocol?

## Expected Answer

- **Generators**: Special functions that can be exited and re-entered. They return a `Generator` object conforming to both Iterable and Iterator protocols.
- **`yield`**: Pauses generator execution and sends a value back to the caller `{ value, done }`.
- **`next(inputVal)`**: Resumes execution, optionally passing an input value back into the generator where it paused.

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    const increment = yield id;
    id += increment || 1;
  }
}

const gen = idGenerator();
console.log(gen.next().value);   // 1
console.log(gen.next(5).value);  // 6
console.log(gen.next(10).value); // 16
```
