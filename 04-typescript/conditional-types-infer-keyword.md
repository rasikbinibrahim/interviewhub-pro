# T406 · Advanced Conditional Types & The `infer` Keyword (`Awaited`, `ReturnType`)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** typescript, conditional-types, infer, Distributive-conditional-types, type-transformations  

## Question

How do Conditional Types (`T extends U ? X : Y`) work in TypeScript, what are Distributive Conditional Types when applied to unions, and how does the `infer` keyword extract nested types within conditional type signatures (e.g., implementing `ReturnType<T>`, `UnwrapPromise<T>`, `Parameters<T>`)?

## Expected Answer

1. **Conditional Types**: Express non-trivial type relationships based on type assignability tests (`T extends U ? X : Y`).
2. **Distributive Behavior**: When a naked type parameter `T` is given a union type (`A | B`) in a conditional type, TypeScript automatically distributes the condition over each member of the union: `(A extends U ? X : Y) | (B extends U ? X : Y)`.
3. **The `infer` Keyword**: Used inside the `extends` clause of a conditional type to declare a pattern-matched type variable `P` that TypeScript automatically infers from the input structure.

## Deep Explanation

### Custom Utility Types with `infer`

```typescript
// 1. Re-implementation of ReturnType<T>
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

// 2. Re-implementation of Parameters<T>
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never;

// 3. Re-implementation of Awaited<T> (Unwraps Nested Promises)
type MyAwaited<T> =
  T extends Promise<infer U> ? MyAwaited<U> : T;

// 4. Extract Element Type of Array
type ElementOf<T> = T extends (infer E)[] ? E : T;
```

## Production Example

```typescript
import { MyReturnType, MyParameters, MyAwaited, ElementOf } from './typeUtils';

// Example Async Function
async function fetchUserProfile(userId: string, options: { verbose: boolean }) {
  return { id: userId, name: 'Alice', role: 'admin' };
}

// Derived Types using `infer`
type FetchReturn = MyReturnType<typeof fetchUserProfile>; 
// Promise<{ id: string; name: string; role: string; }>

type UnwrappedUser = MyAwaited<FetchReturn>; 
// { id: string; name: string; role: string; }

type FetchArgs = MyParameters<typeof fetchUserProfile>; 
// [userId: string, options: { verbose: boolean }]

type StringArrayItem = ElementOf<string[]>; 
// string
```

## Best Practices

- Prevent unwanted distributive union behavior by wrapping `T` and `U` in tuple brackets: `[T] extends [U] ? X : Y`.
- Combine `infer` with recursive type aliases to flatten nested promises or arrays safely.

## Common Mistakes

- Using `infer` outside of a conditional type `extends` clause, causing a `SyntaxError`.

## Follow-up Questions

1. How do distributive conditional types allow `Exclude<T, U>` (`T extends U ? never : T`) to filter member types out of union types?

## Related Topics

- TypeScript Generics & Mapped Utility Types
- Type Narrowing, Type Guards (`is`), and Discriminated Unions
