# T209 · Polyfilling `Promise.allSettled`, `Promise.race` & `Promise.any`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** promises, promise-combinators, polyfills, async-control-flow  

## Question

How do the four standard ECMAScript Promise combinator methods (`Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`) differ in resolution and rejection semantics, and how do you implement production polyfills for `Promise.allSettled` and `Promise.any`?

## Expected Answer

1. **Promise Combinator Semantics Comparison**:
   - `Promise.all(promises)`: Short-circuits on **FIRST rejection** (Fail Fast). Resolves with array of values only if ALL promises fulfill.
   - `Promise.allSettled(promises)`: **NEVER rejects** (unless iterable is invalid). Waits for all input promises to settle, returning an array of objects `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`.
   - `Promise.race(promises)`: Settles (resolves OR rejects) as soon as the **FIRST promise** settles.
   - `Promise.any(promises)`: Resolves as soon as the **FIRST promise fulfills**. Rejects only if ALL input promises reject, returning an `AggregateError`.

## Deep Explanation

### Custom Polyfill Implementations

```javascript
// 1. Polyfill for Promise.allSettled
if (!Promise.myAllSettled) {
  Promise.myAllSettled = function (promises) {
    return Promise.all(
      Array.from(promises).map((p) =>
        Promise.resolve(p).then(
          (value) => ({ status: 'fulfilled', value }),
          (reason) => ({ status: 'rejected', reason })
        )
      )
    );
  };
}

// 2. Polyfill for Promise.any
if (!Promise.myAny) {
  Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
      const promiseArray = Array.from(promises);
      if (promiseArray.length === 0) {
        return reject(new AggregateError([], 'All promises were rejected'));
      }

      const errors = [];
      let rejectedCount = 0;

      promiseArray.forEach((p, index) => {
        Promise.resolve(p)
          .then((val) => {
            resolve(val); // Resolve on FIRST fulfillment!
          })
          .catch((err) => {
            errors[index] = err;
            rejectedCount++;
            if (rejectedCount === promiseArray.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          });
      });
    });
  };
}
```

## Production Example

```javascript
const pSlowSuccess = new Promise((res) => setTimeout(() => res('Slow Winner'), 500));
const pFastFail = new Promise((_, rej) => setTimeout(() => rej('Fast Error'), 100));

// 1. Promise.allSettled (Gathers analytics regardless of failure)
Promise.myAllSettled([pSlowSuccess, pFastFail]).then((results) => {
  console.log(results);
  /* Output:
  [
    { status: 'fulfilled', value: 'Slow Winner' },
    { status: 'rejected', reason: 'Fast Error' }
  ]
  */
});

// 2. Promise.any (Fastest resilient CDN fallback lookup)
Promise.myAny([pFastFail, pSlowSuccess]).then((firstSuccess) => {
  console.log(firstSuccess); // Output: "Slow Winner" (Bypasses fast failure!)
});
```

## Best Practices

- Use `Promise.allSettled` when rendering independent dashboard widgets where individual widget failures must not crash the entire view.
- Always wrap non-promise values inside `Promise.resolve(p)` inside polyfill loops to handle mixed array elements safely.

## Common Mistakes

- Using `Promise.all` for critical parallel API batching without individual `.catch()` handlers, causing one minor non-critical endpoint failure to abort the entire batch.

## Follow-up Questions

1. What is an `AggregateError` in JavaScript and how do you access individual rejection reasons from `err.errors`?

## Related Topics

- Promises Under the Hood: States, Chaining & `Promise.all` Polyfill
- Async Generators & Stream Processing
