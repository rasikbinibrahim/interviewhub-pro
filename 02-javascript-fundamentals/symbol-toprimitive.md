# S6069 · Symbol.toPrimitive

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Meta-programming  

## Question

Customizing how an object converts to a primitive in numeric, string, or default contexts.

## Expected Answer

Symbol.toPrimitive lets an object define exactly how it converts to a primitive for numeric, string, or default coercion contexts, overriding valueOf/toString.

## Deep Explanation

When JavaScript needs to coerce an object to a primitive (e.g. using it in `+`, template literals, or comparisons), it checks for a `[Symbol.toPrimitive]` method first. That method receives a `hint` ('number', 'string', or 'default') and can return a completely custom primitive value for each context, overriding the default `valueOf`/`toString` fallback chain entirely.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Symbol.toPrimitive.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is how libraries implement objects that behave naturally in arithmetic and string contexts simultaneously — e.g. a `Money` class that returns cents as a number in numeric contexts but a formatted currency string in string contexts, from the same object.

## Related Topics

- JavaScript Fundamentals
