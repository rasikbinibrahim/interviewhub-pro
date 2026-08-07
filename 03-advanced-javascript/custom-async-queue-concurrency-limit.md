# T332 · Building an Async Task Queue with Concurrency Limit (`p-limit`)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** async-queue, concurrency-limit, promises, rate-limiting  

## Question

How do you implement an **Async Task Queue with Concurrency Limit** (`p-limit`) that executes at most $K$ promises in parallel?

```javascript
function pLimit(concurrency) {
  const queue = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };

  return function (fn, ...args) {
    return new Promise((resolve, reject) => {
      const run = () => {
        activeCount++;
        fn(...args).then(resolve, reject).finally(next);
      };

      if (activeCount < concurrency) {
        run();
      } else {
        queue.push(run);
      }
    });
  };
}
```
