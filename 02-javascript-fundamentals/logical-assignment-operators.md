# S6102 · Logical Assignment Operators (&&=, ||=, ??=)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Combining a logical operator with assignment for concise conditional updates.

## Expected Answer

||=, &&=, and ??= combine a logical check with assignment, only performing the assignment (and evaluating its right side) when the corresponding logical condition on the left side holds.

## Deep Explanation

`x ||= y` assigns `y` to `x` only if `x` is currently falsy (equivalent to `x || (x = y)`). `x &&= y` assigns only if `x` is currently truthy. `x ??= y` assigns only if `x` is currently `null`/`undefined`. All three are short-circuiting — the right-hand side is only evaluated if the assignment will actually happen, which matters if it has side effects.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Logical Assignment Operators (&&=, ||=, ??=).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The short-circuiting behavior means `obj.value ??= computeExpensiveDefault()` only calls the expensive function when `obj.value` actually needs a default — a genuinely useful lazy-initialization pattern that a naive `obj.value = obj.value ?? computeExpensiveDefault()` doesn't provide (that version always evaluates the right side).

## Related Topics

- JavaScript Fundamentals
