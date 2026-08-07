# T410 · Advanced TypeScript Generics: Generic Constraints (`extends`), `infer` Keyword & Utility Type Derivations

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** typescript, generics, generic-constraints, infer, conditional-types  

## Question

How do Generic Constraints (`T extends Constraint`) restrict generic parameters, how does the **`infer`** keyword extract nested inner types inside conditional statements, and how do you implement custom polyfills for `ReturnType<T>`, `Parameters<T>`, and `UnwrapPromise<T>`?

## Expected Answer

1. **Generic Constraints (`extends`)**:
   - Limits acceptable generic arguments to types that fulfill specific shape structural constraints (`function getProperty<T, K extends keyof T>(obj: T, key: K)`).
2. **The `infer` Keyword**:
   - Introduces an auto-inferred type variable inside the true branch of a conditional type (`T extends (...args: any[]) => infer R ? R : any`).
   - Allows type introspection into function return types, array element types, or wrapped Promises.

## Deep Explanation

### Custom Utility Types Built with `infer`

```typescript
// 1. Polyfill for ReturnType<T>
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

// 2. Polyfill for Parameters<T>
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never;

// 3. Recursive UnwrapPromise<T> (Awaited<T>)
type UnwrapPromise<T> =
  T extends Promise<infer U> ? UnwrapPromise<U> : T;
```

## Production Example

```typescript
import { MyReturnType, MyParameters, UnwrapPromise } from './typeUtils';

// Sample Target Function
function createUserSession(username: string, age: number) {
  return Promise.resolve({
    sessionId: 'sess_123',
    user: { username, age },
    active: true,
  });
}

// 1. Extract Parameters Tuple Type
type SessionFnParams = MyParameters<typeof createUserSession>;
// Result: [username: string, age: number]

// 2. Extract Raw Return Type (Promise object)
type SessionFnReturnPromise = MyReturnType<typeof createUserSession>;
// Result: Promise<{ sessionId: string; user: { username: string; age: number; }; active: boolean; }>

// 3. Unwrap Nested Promise Result
type SessionData = UnwrapPromise<SessionFnReturnPromise>;
// Result: { sessionId: string; user: { username: string; age: number; }; active: boolean; }
```

## Best Practices

- Always add generic constraints (`K extends keyof T`) to prevent users from passing arbitrary invalid parameter strings.
- Use `infer` when building library utility wrappers where exact function signatures or promise resolutions must be preserved.

## Common Mistakes

- Using `infer` outside conditional type expressions — `infer` can ONLY be declared within the `extends` clause of a conditional type.

## Follow-up Questions

1. How does `infer` extract tuple array element types in `[infer First, ...infer Rest]` pattern matching?

## Related Topics

- Advanced Conditional Types & `infer` Keyword
- The `satisfies` Operator vs Type Annotations
