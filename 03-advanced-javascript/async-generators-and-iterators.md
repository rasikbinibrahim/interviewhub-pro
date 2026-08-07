# T307 · Iterators, Generators (`function*`) & Async Iterables (`for await...of`)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** generators, iterators, async-iterators, iterable-protocol, streaming  

## Question

How do the **Iterable Protocol** and **Iterator Protocol** work in JavaScript, how do Generator functions (`function*`) pause and resume execution using `yield`, and how do Async Generators (`async function*`) enable memory-efficient streaming processing using `for await...of`?

## Expected Answer

1. **Iterable & Iterator Protocols**:
   - **Iterable**: An object that implements the `Symbol.iterator` method, returning an Iterator.
   - **Iterator**: An object with a `next()` method returning `{ value: any, done: boolean }`.
2. **Generators (`function*`)**: Functions that can pause execution at `yield` statements and resume later when `.next()` is called. Generators return a Generator Object implementing both the Iterable and Iterator protocols.
3. **Async Generators (`async function*`)**: Combine Async/Await with Generators. They yield Promises, allowing memory-efficient streaming of chunked HTTP response streams or large data pipelines using `for await (const chunk of stream)`.

## Deep Explanation

### Generator Execution Flow

```
Caller calls genObj.next() --------> Generator Function starts/resumes
                                             │
                                    Executes until `yield value`
                                             │
Caller receives { value, done } <---- Pauses execution at `yield`
```

## Production Example

```javascript
// Production Streaming Fetch Iterator using Async Generator
async function* fetchPaginatedUsers(apiUrl) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${apiUrl}?page=${page}&limit=50`);
    if (!response.ok) throw new Error('API Request Failed');

    const data = await response.json();
    
    // Yield array of items for current page
    yield data.items;

    hasMore = page < data.totalPages;
    page++;
  }
}

// Consumer using `for await...of` loop
async function processAllUsers() {
  const userStream = fetchPaginatedUsers('/api/v1/users');

  for await (const userBatch of userStream) {
    console.log(`Processing batch of ${userBatch.length} users...`);
    // Process items page-by-page without loading entire 100,000 items into memory at once!
  }
}
```

## Best Practices

- Use Async Generators when processing large CSV files, LLM token streams (Server-Sent Events), or paginated REST endpoints to keep memory overhead at $O(1)$ constant chunk space.
- Use `try...finally` inside generator functions to ensure cleanup code executes when a consumer breaks early out of a `for...of` loop.

## Common Mistakes

- Forgetting `*` in generator function definitions (`function foo() { yield 1; }` causes `SyntaxError: Unexpected identifier`).
- Forgetting `await` in `for await...of` loops, causing the loop to receive unresolved Promise objects.

## Follow-up Questions

1. How do Redux-Saga side-effect middleware libraries leverage Generators (`yield call()`, `yield put()`) for testable asynchronous action flows?

## Related Topics

- Event Loop Mechanics: Call Stack, Microtasks & Macrotasks
- Promises Under the Hood: States, Chaining & `Promise.all` Polyfill
