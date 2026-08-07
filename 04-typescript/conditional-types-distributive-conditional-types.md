# T411 · TypeScript Conditional Types & Distributive Conditional Types

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, conditional-types, generics, infer  

## Question

How do TypeScript **Conditional Types** (`T extends U ? X : Y`) evaluate type relationships, and why do naked type parameters distribute over union types (`Distributive Conditional Types`)?

## Expected Answer

- **Syntax**: `T extends U ? X : Y`
- **Distributive Property**: When `T` is a generic naked type parameter, union inputs `A | B` distribute as `(A extends U ? X : Y) | (B extends U ? X : Y)`.
- **Non-Distributive Opt-out**: Wrap `T` in tuple brackets `[T] extends [U]`.

```typescript
type ToArray<T> = T extends any ? T[] : never;
type Distributed = ToArray<string | number>; // string[] | number[]

type NonDistributed<T> = [T] extends [any] ? T[] : never;
type TupleResult = NonDistributed<string | number>; // (string | number)[]
```
