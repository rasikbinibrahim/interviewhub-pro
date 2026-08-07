# T326 · Building a Custom A+ Compliant Promise from Scratch

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** promises, polyfills, microtasks, event-loop  

## Question

How do you implement a minimal **Promises/A+ Spec Compliant** `MyPromise` class with state transitions (`PENDING`, `FULFILLED`, `REJECTED`), asynchronous microtask execution (`queueMicrotask`), and `.then()` chaining?

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'PENDING';
    this.value = undefined;
    this.handlers = [];

    const resolve = (val) => {
      if (this.state !== 'PENDING') return;
      this.state = 'FULFILLED';
      this.value = val;
      queueMicrotask(() => this.handlers.forEach(h => h.onFulfilled(val)));
    };

    const reject = (reason) => {
      if (this.state !== 'PENDING') return;
      this.state = 'REJECTED';
      this.value = reason;
      queueMicrotask(() => this.handlers.forEach(h => h.onRejected(reason)));
    };

    try { executor(resolve, reject); }
    catch (err) { reject(err); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === 'FULFILLED') {
            resolve(onFulfilled ? onFulfilled(this.value) : this.value);
          } else if (this.state === 'REJECTED') {
            reject(onRejected ? onRejected(this.value) : this.value);
          }
        } catch (err) { reject(err); }
      };

      if (this.state === 'PENDING') {
        this.handlers.push({
          onFulfilled: () => handle(),
          onRejected: () => handle()
        });
      } else {
        queueMicrotask(handle);
      }
    });
  }
}
```
