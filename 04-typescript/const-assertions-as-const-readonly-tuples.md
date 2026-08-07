# T415 · TypeScript Const Assertions (`as const`) & Readonly Tuples

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, const-assertions, readonly, tuples  

## Question

How does `as const` lock down literal values, arrays, and objects into immutable `readonly` types with literal inference instead of wide types?

## Expected Answer

```typescript
// Without as const: inferred as string[]
const colorsWide = ['red', 'green'];

// With as const: inferred as readonly ['red', 'green'] (Tuple of literals!)
const colorsReadonly = ['red', 'green'] as const;

const config = {
  endpoint: 'https://api.com',
  port: 8080
} as const; // All fields become readonly literal values!
```
