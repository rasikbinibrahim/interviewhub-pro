# T421 · TypeScript 4.9+ `satisfies` Operator vs Type Annotations

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, satisfies, type-checking, inference  

## Question

How does the `satisfies` operator validate that an object matches a target type WITHOUT widening the inferred literal types of properties?

```typescript
type RGB = [number, number, number];
type Color = string | RGB;

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, Color>;

// Infers exact string type for green, enabling .toUpperCase()!
palette.green.toUpperCase();
```
