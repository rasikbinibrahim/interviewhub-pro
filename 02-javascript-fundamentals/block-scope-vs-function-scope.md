# S6011 · Block Scope vs Function Scope

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Scope & Closures  

## Question

How {} blocks create scope for let/const but not for var.

## Expected Answer

var is visible throughout its enclosing function regardless of blocks; let/const are only visible inside the block where they're declared.

## Deep Explanation

`var` declarations are scoped to the nearest enclosing function (or the global scope if outside any function) and ignore block boundaries like `if`, `for`, or bare `{}`. `let` and `const` are scoped to the nearest enclosing block, meaning they only exist within the `{}` they were declared in.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Block Scope vs Function Scope.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly why `var` in an `if` block can leak into the surrounding function and silently overwrite an outer variable of the same name — a common source of bugs in large, un-linted legacy codebases.

## Related Topics

- JavaScript Fundamentals
