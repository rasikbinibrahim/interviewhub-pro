# S6130 · Handling Circular References in JSON

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JSON  

## Question

Why JSON.stringify throws on circular objects, and how to work around it.

## Expected Answer

JSON.stringify() throws on circular references because JSON can only represent tree structures, not graphs with self-references — fixed with a visited-tracking replacer function or by switching to structuredClone for actual cloning needs.

## Deep Explanation

`JSON.stringify()` throws a TypeError ('Converting circular structure to JSON') because JSON has no concept of object references — it can only represent a tree, not a graph, so an object that (directly or indirectly) references itself has no valid finite JSON representation. Workarounds include a custom replacer function that tracks visited objects (replacing repeats with a placeholder), or using `structuredClone`/dedicated libraries that support cycles natively.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Handling Circular References in JSON.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. For serialization (not cloning) specifically, the common production pattern is a WeakSet-based replacer that replaces already-seen object references with a `'[Circular]'` marker string, preserving a debuggable output instead of crashing — useful for logging deeply nested app state that may legitimately contain cycles (e.g. React fiber nodes, DOM references).

## Related Topics

- JavaScript Fundamentals
