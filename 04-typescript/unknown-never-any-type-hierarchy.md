# T405 · TypeScript Type Hierarchy: `unknown` vs `never` vs `any` vs `void`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** typescript, type-hierarchy, unknown, never, any, type-safety  

## Question

How does the TypeScript Top vs Bottom Type Hierarchy work, what are the structural differences between `any`, `unknown`, `never`, and `void`, and why is `unknown` considered the type-safe alternative to `any`?

## Expected Answer

1. **Type Hierarchy Spectrum**:
   - **`any` (Escape Hatch)**: Disables type checking entirely. Allows assigning anything to it, and calling any property/method without type checks.
   - **`unknown` (Top Type / Safe Universal Type)**: Accepts any assigned value, but **forbids calling properties, methods, or assigning to other typed variables** until explicitly narrowed via Type Guards or assertions.
   - **`void`**: Indicates a function that does not return a meaningful value (returns `undefined`).
   - **`never` (Bottom Type)**: Represents values that **NEVER occur**. Used for functions that throw errors, infinite loops, or impossible union branches after exhaustive narrowing.

## Deep Explanation

### Type System Hierarchy Diagram

```
                 [ any ] (Opt-out of Type Checking)
                    │
               [ unknown ] (Top Type - Everything is assignable TO unknown)
                    │
      ┌─────────────┼─────────────┐
  [ string ]    [ number ]    [ boolean ] ...
      └─────────────┬─────────────┘
                    │
                [ never ] (Bottom Type - Nothing is assignable TO never)
```

## Production Example

```typescript
// 1. Unsafe `any` vs Safe `unknown`
function processUnsafe(data: any) {
  // Compiles cleanly, but crashes at runtime if data is not an object!
  console.log(data.user.name.toUpperCase());
}

function processSafe(data: unknown) {
  // Compile Error: Object is of type 'unknown'
  // console.log(data.user.name);

  // Safe Execution: Force Narrowing before access
  if (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    typeof (data as any).user?.name === 'string'
  ) {
    console.log((data as { user: { name: string } }).user.name.toUpperCase());
  }
}

// 2. `never` Type for Impossible States & Exhaustive Validation
type Priority = 'low' | 'medium' | 'high';

function getPriorityScore(priority: Priority): number {
  switch (priority) {
    case 'low':
      return 1;
    case 'medium':
      return 2;
    case 'high':
      return 3;
    default:
      // If a new priority 'critical' is added, TS flags compile error here!
      const _exhaustiveCheck: never = priority;
      return _exhaustiveCheck;
  }
}
```

## Best Practices

- Always use `unknown` instead of `any` when handling untyped external inputs (JSON API responses, localStorage data, third-party events).
- Enable `noImplicitAny` in `tsconfig.json` to prevent implicit fallback to `any`.

## Common Mistakes

- Returning `any` from API helper functions, causing untyped `any` pollution to spread silently across the entire component codebase.

## Follow-up Questions

1. Why is `never` assigned to the intersection of incompatible primitive types (`string & number`)?

## Related Topics

- Type Narrowing, Type Guards (`is`), and Discriminated Unions
- TypeScript Generics & Mapped Utility Types
