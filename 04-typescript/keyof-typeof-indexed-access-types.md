# T404 · Type Transformations: `keyof`, `typeof`, `[K]` Indexed Access & Type Assertions

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** TypeScript  
**Concepts:** typescript, keyof, typeof, indexed-access, type-transformations, type-assertions  

## Question

How do the `keyof`, `typeof`, and Indexed Access (`T[K]`) operators interact in TypeScript to create dynamic type safety from JavaScript objects and runtime configurations, and why should `as` type assertions be minimized in favor of Type Guards?

## Expected Answer

1. **`typeof` Operator (Type Context)**: Queries the TypeScript type of a JavaScript variable, object, or function constant at compile-time (`type Config = typeof defaultConfig`).
2. **`keyof` Operator**: Takes an object type and produces a string or numeric literal union of its keys (`type ConfigKeys = keyof Config`).
3. **Indexed Access Types (`T[K]`)**: Looks up the type of a specific property `K` on type `T` (`type AgeType = Person['age']` or `type Values = Person[keyof Person]`).
4. **Type Assertions (`as TargetType`)**: Tells the TypeScript compiler "trust me, I know the type better than you". It bypasses static type checking without performing any runtime validation. If wrong, it leads to silent runtime crashes.

## Deep Explanation

### Type Transformation Flow

```
JS Const Object: const config = { env: 'prod', timeout: 5000 }
       │
       ▼  typeof config
Type Definition: { env: string; timeout: number }
       │
       ▼  keyof typeof config
Union Type: 'env' | 'timeout'
       │
       ▼  (typeof config)[keyof typeof config]
Value Union: string | number
```

## Production Example

```typescript
// 1. Single Source of Truth Runtime Config Object
export const APP_CONFIG = {
  apiEndpoint: 'https://api.example.com',
  maxRetries: 3,
  enableAnalytics: true,
} as const; // `as const` makes properties readonly string/number literals!

// 2. Derive Types automatically using typeof, keyof, and Indexed Access
export type AppConfig = typeof APP_CONFIG;
export type ConfigKey = keyof typeof APP_CONFIG; // 'apiEndpoint' | 'maxRetries' | 'enableAnalytics'
export type ConfigValue = (typeof APP_CONFIG)[ConfigKey]; // string | number | boolean

// 3. Strongly-typed getter function guaranteed to reject invalid key strings
export function getConfigValue<K extends ConfigKey>(key: K): AppConfig[K] {
  return APP_CONFIG[key];
}

// Valid Call: Return type inferred automatically as string!
const endpoint = getConfigValue('apiEndpoint');

// Invalid Call: Compile-Time Type Error!
// const invalid = getConfigValue('invalidKey'); // Error: Argument of type '"invalidKey"' is not assignable to parameter of type 'ConfigKey'
```

## Best Practices

- Use `as const` on static configuration objects to freeze literal type inferences for keys and values.
- Prefer type inference (`typeof obj`) for single-source-of-truth configuration objects to avoid maintaining duplicate interface declarations manually.

## Common Mistakes

- Using `as any` or `as UnknownType` to force code to compile instead of writing generic constraints (`<K extends keyof T>`) or proper Type Guards.

## Follow-up Questions

1. How do Template Literal Types (`type Event = `${Domain}:${Action}``) interact with `keyof` to build dynamic event emitter signatures?

## Related Topics

- TypeScript Generics & Mapped Utility Types
- Type Narrowing, Type Guards (`is`), and Discriminated Unions
