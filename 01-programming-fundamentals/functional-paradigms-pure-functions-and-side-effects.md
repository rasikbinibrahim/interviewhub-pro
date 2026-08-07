# QPF045 · Functional Paradigms: Pure Functions and Side Effects

**Difficulty:** Easy  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** Pure functions, Referencing transparency, Side effects, Immutability  

## Expected Answer

A pure function is deterministic (always returns the exact same output for given inputs) and produces zero side effects (does not mutate external state, perform I/O, or modify parameters). Pure functions guarantee referential transparency and simplify concurrency, caching, and testing.

## Deep Explanation

Referential transparency means a function call can be replaced with its return value without altering program behavior. Side effects include mutating global variables, modifying input arguments in-place, making HTTP requests, writing to console/disk, or reading non-deterministic values like Math.random() or Date.now().

## Production Example

Mutating component state or props in-place during React render phases causes unpredictable re-render cycles and breaks memoization optimizations like React.memo.

## Best Practices

- Treat all function inputs as immutable data structures
- Isolate side effects into dedicated lifecycle handlers or middleware

## Trade-offs

- Pure functions require copying objects for updates, which incurs minor memory allocation overhead
- Side-effect isolation requires explicit architecture structures like Redux saga or thunks

## Common Mistakes

- Modifying array parameters directly with Array.prototype.push or sort inside a function
- Relying on external global variables within logic functions

## Follow-up Questions

1. How does immutability enable fast structural comparison in virtual DOM diffing?
2. What is function memoization and what are its prerequisites?

## Related Topics

- Immutability Mechanics
- Function Composition
