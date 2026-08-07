# T422 · Polyfilling Built-In TypeScript Utility Types (`Partial`, `Required`, `Pick`, `Omit`, `Readonly`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, utility-types, mapped-types  

## Question

How are TypeScript built-in utility types (`MyPartial<T>`, `MyRequired<T>`, `MyReadonly<T>`, `MyPick<T, K>`, `MyOmit<T, K>`) defined under the hood using Mapped Types?

```typescript
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
