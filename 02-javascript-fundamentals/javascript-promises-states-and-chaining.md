# T227 · JavaScript Promise States, Chaining & Microtask Scheduling

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** promises, microtasks, async, chaining  

## Question

What are the 3 states of a Promise (`pending`, `fulfilled`, `rejected`), how does `.then()` return a new Promise for chaining, and how are Promise callbacks scheduled on the Microtask Queue?

```javascript
const promise = new Promise((resolve) => {
  console.log('1: Sync Executor');
  resolve('2: Resolved Value');
});

promise.then((res) => {
  console.log(res); // Microtask!
});

console.log('3: Sync Main');
// Output: 1, 3, 2
```
