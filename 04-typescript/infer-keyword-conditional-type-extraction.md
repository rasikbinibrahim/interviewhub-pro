# T430 · The `infer` Keyword & Type Extraction in Conditional Types

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** infer-keyword, conditional-types, type-extraction  

## Question

How does the **`infer` keyword** introduce type variables inside conditional types to extract function return types (`ReturnType<T>`), promise resolved types (`Awaited<T>`), or array element types (`Unpack<T>`)?

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
```
