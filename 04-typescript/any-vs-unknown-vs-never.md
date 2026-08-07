# T417 · Top & Bottom Types: `any` vs `unknown` vs `never`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, any, unknown, never, type-safety  

## Question

What are the behavioral differences between **`any`** (type safety opt-out), **`unknown`** (type-safe top type requiring narrowing), and **`never`** (bottom type representing impossible states)?

## Expected Answer

- **`any`**: Disables compile-time type checking. Allows property access without checks.
- **`unknown`**: Accepts any value, but forbids property access or assignment until narrowed via `typeof` or type guards.
- **`never`**: Empty set of values. Represents functions that throw errors or infinite loops, or exhausted exhaustive switch checks.

```typescript
function processVal(val: unknown) {
  // val.foo(); // ERROR! Property 'foo' does not exist on type 'unknown'.
  if (typeof val === 'string') {
    console.log(val.toUpperCase()); // Narrowed to string safely!
  }
}
```
