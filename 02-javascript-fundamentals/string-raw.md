# S6120 · String.raw

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** String Handling  

## Question

A built-in tag function that returns the literal, unescaped text of a template string.

## Expected Answer

String.raw returns a template literal's raw, unprocessed text — escape sequences like \n stay as literal backslash-n characters instead of being interpreted.

## Deep Explanation

`String.raw` is a tag function that returns a template literal's raw string content exactly as typed, without processing escape sequences like `\n` or `\t` — `String.raw\`\n\`` produces the two literal characters `\` and `n`, not an actual newline. It's the standard tool for writing Windows file paths or regex patterns without double-escaping backslashes.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying String.raw.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly why Windows path strings are much cleaner with String.raw: `String.raw\`C:\Users\name\`` works correctly without doubling every backslash, whereas a normal template literal would try to interpret `\U`, `\n`, etc. as (invalid or unintended) escape sequences.

## Related Topics

- JavaScript Fundamentals
