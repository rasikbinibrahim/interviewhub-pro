# S6003 · Execution Context Phases (Creation vs Execution)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

The two-pass process the engine runs for every execution context.

## Expected Answer

Creation phase sets up memory (hoisting, this, scope chain); execution phase runs code and assigns values.

## Deep Explanation

Every execution context runs in two phases. The Creation phase sets up the lexical environment, hoists var (as undefined) and function declarations, creates the TDZ for let/const, and determines the value of `this`. The Execution phase then runs the code line by line, assigning real values.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Execution Context Phases (Creation vs Execution).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Function declarations are fully hoisted (name and body) in the creation phase, which is why you can call a function declared with `function` syntax before its line in the source — but a `const fn = () => {}` is only hoisted as a TDZ binding.

## Related Topics

- JavaScript Fundamentals
