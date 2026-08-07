# T403 · Type Narrowing, Type Guards (`is`), and Discriminated Unions

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** typescript, type-narrowing, type-guards, discriminated-unions, exhaustive-checking  

## Question

How does TypeScript narrow broad union types (`string | number | User`) down to specific concrete types using Control Flow Analysis, custom User-Defined Type Guards (`param is Type`), and Discriminated Unions with Exhaustive Checking (`never` type)?

## Expected Answer

1. **Control Flow Analysis**: TypeScript analyzes `typeof`, `instanceof`, `in`, and equality checks (`===`) to narrow types automatically inside conditional blocks.
2. **User-Defined Type Guards (`is`)**: Functions that return a boolean and have a return type signature `param is TargetType`. When the function returns `true`, TypeScript narrows `param` to `TargetType` in the calling scope.
3. **Discriminated Unions (Tagged Unions)**: A pattern where multiple object types share a common singleton literal property (the "discriminant" or "tag", e.g. `kind: 'success'`).
4. **Exhaustive Checking**: Assigning unhandled union cases to a variable of type `never` in a `default` switch case. If a new case is added to the union without updating the switch statement, TypeScript raises a compile-time error.

## Deep Explanation

### Discriminated Union Architecture

```typescript
// 1. Discriminated Union State Definitions
export type APIState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// 2. Custom User-Defined Type Guard
export function isErrorState<T>(state: APIState<T>): state is { status: 'error'; error: Error } {
  return state.status === 'error';
}

// 3. Exhaustive Check Helper
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`);
}
```

## Production Example

```typescript
import { APIState, isErrorState, assertNever } from './state';

export function renderComponent<T>(state: APIState<T>): string {
  // Pattern 1: Automatic Type Narrowing via Switch Discriminant
  switch (state.status) {
    case 'idle':
      return 'Component Ready';
    case 'loading':
      return 'Loading Spinner...';
    case 'success':
      // TypeScript automatically narrows `state` to { status: 'success'; data: T }
      return `Data: ${JSON.stringify(state.data)}`;
    case 'error':
      // TypeScript automatically narrows `state` to { status: 'error'; error: Error }
      return `Error: ${state.error.message}`;
    default:
      // Pattern 2: Exhaustive Check guarantees compile error if a new status is added
      return assertNever(state);
  }
}

// Pattern 3: Custom Type Guard Function Usage
function handleError<T>(state: APIState<T>) {
  if (isErrorState(state)) {
    // Narrowed to error state! Safe access to `state.error`
    console.error('Logged Error:', state.error.stack);
  }
}
```

## Best Practices

- Use Discriminated Unions for modeling complex application state, API responses, and Redux/React actions.
- Use `assertNever(val: never)` in default switch branches to enforce compile-time exhaustive checking when extending state unions.

## Common Mistakes

- Using unsafe type assertions (`as TargetType`) instead of proper runtime type guards, bypassing type safety.

## Follow-up Questions

1. How do `asserts condition` assertion signatures differ from `param is Type` predicate type guards?

## Related Topics

- TypeScript Generics & Mapped Utility Types
- TypeScript Strict Null Checks & Type Narrowing
