# S6012 · Named Function Expressions

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Scope & Closures  

## Question

Why giving a function expression an internal name helps with recursion and stack traces.

## Expected Answer

Naming a function expression makes that name available for recursive self-calls inside the function body without polluting the outer scope.

## Deep Explanation

A named function expression like `const fact = function factorial(n) {...}` binds the name (`factorial`) only inside the function's own scope, not in the enclosing scope — the outer scope must still use `fact` to call it. This internal name is useful for self-recursion and shows up clearly in stack traces and debuggers.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Named Function Expressions.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Anonymous function expressions assigned to `const fact = function(n) {...}` show as '(anonymous)' in stack traces and can't reference themselves without reaching for the outer binding, which breaks if the function is later reassigned — the named form is immune to that.

## Related Topics

- JavaScript Fundamentals
