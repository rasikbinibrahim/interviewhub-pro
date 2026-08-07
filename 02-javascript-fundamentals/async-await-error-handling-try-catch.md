# T228 · Async/Await Syntactic Sugar & Robust Error Handling Patterns

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** async-await, promises, error-handling, try-catch  

## Question

How does `async/await` wrap Promise execution under generator syntactic sugar, and how do safe wrapper functions (`to(promise)`) avoid verbose `try/catch` nesting?

```javascript
// Safe Async Error Wrapper Pattern
async function safeAwait(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

const [err, user] = await safeAwait(fetchUser());
if (err) console.error('Fetch failed:', err);
```
