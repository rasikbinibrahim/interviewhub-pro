# T414 · Type Narrowing: Discriminated Unions & Custom Type Guards (`is`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, type-narrowing, discriminated-unions, type-guards  

## Question

How do **Discriminated Unions** (tagged union types with literal discriminant fields) and **Custom Type Guards** (`arg is Type`) narrow union types safely inside control flow branches?

## Expected Answer

```typescript
// 1. Discriminated Union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'square': return shape.size ** 2;
  }
}

// 2. Custom User-Defined Type Guard
function isCircle(shape: Shape): shape is { kind: 'circle'; radius: number } {
  return shape.kind === 'circle';
}
```
