# T402 · TypeScript Generics & Mapped Utility Types (`Pick`, `Omit`, `Partial`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** generics, utility-types, mapped-types, conditional-types, type-inference  

## Question

How do Generics enable type-safe reusable abstractions in TypeScript, how are core built-in utility types (`Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`) implemented under the hood using Mapped Types (`keyof`, `in`, `indexed access`), and how do Conditional Types (`T extends U ? X : Y`) work?

## Expected Answer

1. **Generics (`<T>`)**: Provide type parameters allowing components, interfaces, and functions to capture and enforce caller-provided types without falling back to `any`.
2. **Mapped Types Mechanics**:
   - `keyof T`: Generates a union of all public property key strings of type `T`.
   - `[P in keyof T]`: Iterates over each key in the key union.
3. **Under the Hood Implementations**:
   - `Partial<T>` = `{ [P in keyof T]?: T[P] }`
   - `Required<T>` = `{ [P in keyof T]-?: T[P] }`
   - `Readonly<T>` = `{ readonly [P in keyof T]: T[P] }`
   - `Pick<T, K extends keyof T>` = `{ [P in K]: T[P] }`
   - `Omit<T, K extends keyof any>` = `Pick<T, Exclude<keyof T, K>>`

## Deep Explanation

### Custom Utility Type Re-implementation

```typescript
// Custom Re-implementation of Built-in Utility Types

// 1. Custom Partial
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// 2. Custom Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 3. Custom Exclude (Conditional Type)
type MyExclude<T, U> = T extends U ? never : T;

// 4. Custom Omit
type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>;
```

## Production Example

```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

// Creation DTO: Pick properties required at POST creation
export type CreateUserPayload = Pick<UserProfile, 'name' | 'email' | 'role'>;

// Update DTO: Partial properties allowed at PATCH update
export type UpdateUserPayload = Partial<CreateUserPayload>;

// Safe API Client Function using Generics
export async function apiRequest<TResponse, TPayload = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  payload?: TPayload
): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

// Type-safe execution:
async function testUserUpdate() {
  const updatedUser = await apiRequest<UserProfile, UpdateUserPayload>(
    '/api/users/123',
    'PATCH',
    { name: 'New Name' } // Enforces valid update fields
  );
  console.log(updatedUser.id);
}
```

## Best Practices

- Prefer constrained generics (`<T extends BaseType>`) over unconstrained `<T>` to guarantee access to required properties inside generic functions.
- Use `Readonly<T>` or `DeepReadonly<T>` for state management stores (Redux / Zustand) to prevent accidental direct state mutation.

## Common Mistakes

- Using `any` inside generic functions, bypassing TypeScript's static type checker.
- Forgetting `extends keyof T` constraints in `Pick` and `Omit` helper generic signatures, allowing callers to pass invalid non-existent key strings.

## Follow-up Questions

1. How does the `infer` keyword work in Conditional Types to extract return types (`ReturnType<T>`) or promise payload types (`Awaited<T>`)?
2. What is the difference between invariant, covariant, and contravariant generics in TypeScript type checking?

## Related Topics

- TypeScript Interfaces vs Type Aliases
- TypeScript Strict Null Checks & Type Narrowing
