# T320 · Polyfilling Promise Combinators: `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** promise-combinators, promise-allsettled, promise-race, promise-any, polyfills  

## Question

How do you implement production polyfills for `Promise.allSettled`, `Promise.race`, and `Promise.any`, and how do their resolution/rejection criteria differ?

## Expected Answer

- **`Promise.allSettled(promises)`**: Resolves when ALL promises settle (fulfill or reject). Never rejects! Returns array of `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`.
- **`Promise.race(promises)`**: Settles (fulfills or rejects) as soon as the FIRST promise settles.
- **`Promise.any(promises)`**: Fulfills as soon as the FIRST promise fulfills. Rejects ONLY if ALL promises reject (with an `AggregateError`).

```javascript
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p).then(
        (value) => ({ status: 'fulfilled', value }),
        (reason) => ({ status: 'rejected', reason })
      )
    )
  );
};

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
};
```
