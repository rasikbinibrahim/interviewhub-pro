# T304 · Promises Under the Hood: States, Chaining & `Promise.all` Implementation

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** promises, async-await, polyfill, promise-all, microtasks  

## Question

How do JavaScript Promises work internally across their 3 states (`pending`, `fulfilled`, `rejected`), how does `.then()` chaining return a new Promise, and how do you implement polyfills for `Promise.all()` and `Promise.allSettled()` from scratch?

## Expected Answer

1. **Promise Internal States**:
   - `pending`: Initial state; neither fulfilled nor rejected.
   - `fulfilled`: Operation completed successfully with a `value`. Transition is immutable.
   - `rejected`: Operation failed with a `reason`. Transition is immutable.
2. **`.then()` Chaining**: Calling `.then(onFulfilled, onRejected)` returns a **NEW Promise**. If `onFulfilled` returns a value `x`, the new promise resolves to `x`. If `onFulfilled` throws an exception `e`, the new promise rejects with `e`.
3. **`Promise.all(promises)` Mechanics**: Accepts an iterable of promises. Returns a single Promise that fulfills with an array of resolved values **ONLY when all input promises fulfill**. If any input promise rejects, `Promise.all` immediately rejects with that first rejection reason.

## Deep Explanation

### Custom Polyfill Implementation (`Promise.all`)

```javascript
// Polyfill for Promise.all
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const results = new Array(promises.length);
    let completedCount = 0;

    if (promises.length === 0) {
      return resolve([]);
    }

    promises.forEach((item, index) => {
      // Wrap non-promise values with Promise.resolve
      Promise.resolve(item)
        .then((value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results); // Resolve all results when array is filled
          }
        })
        .catch((error) => {
          reject(error); // Short-circuit rejection on first error
        });
    });
  });
}
```

## Production Example

```javascript
// Demonstrating Promise.all vs Promise.allSettled
const p1 = Promise.resolve(10);
const p2 = new Promise((res) => setTimeout(() => res(20), 100));
const p3 = Promise.reject(new Error("Network Failure"));

// Promise.all short-circuits on first error
promiseAll([p1, p2])
  .then((values) => console.log('Promise.all success:', values)) // [10, 20]
  .catch((err) => console.error('Promise.all error:', err));

// Promise.allSettled waits for all promises regardless of rejection
Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log('allSettled results:', results);
  /* Output:
     [
       { status: 'fulfilled', value: 10 },
       { status: 'fulfilled', value: 20 },
       { status: 'rejected', reason: Error: Network Failure }
     ]
  */
});
```

## Best Practices

- Use `Promise.allSettled` when executing batch API requests where individual failures should not cancel remaining independent requests.
- Always attach a `.catch()` handler or wrap `await` calls in `try...catch` blocks to prevent unhandled promise rejections.

## Common Mistakes

- Sequential `await` anti-pattern: `await fetchA(); await fetchB();` when `fetchA` and `fetchB` have no data dependencies. Use `await Promise.all([fetchA(), fetchB()])` to execute network requests in parallel.

## Follow-up Questions

1. How do you implement a `Promise.race()` and `Promise.any()` polyfill?
2. What happens when an unhandled Promise rejection occurs in Node.js vs a browser environment?

## Related Topics

- Event Loop Mechanics: Call Stack, Microtasks & Macrotasks
- Async/Await Error Handling Strategies
