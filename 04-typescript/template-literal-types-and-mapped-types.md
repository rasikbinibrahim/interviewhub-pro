# T407 · Template Literal Types & Advanced Mapped Types

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Stripe, Airbnb, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** TypeScript  
**Concepts:** typescript, template-literal-types, mapped-types, key-remapping, intrinsic-string-manipulation  

## Question

How do Template Literal Types (`${T}_${U}`) enable compile-time string manipulation in TypeScript, how do Key Remapping in Mapped Types (`[K in keyof T as NewKey]`) modify property names, and how do intrinsic helpers (`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`) operate?

## Expected Answer

1. **Template Literal Types**: Build new string literal types out of existing literal unions via template literal string interpolation syntax (`type Event = `${Domain}:${Action}``).
2. **Intrinsic String Manipulations**: Built-in compiler type primitives for modifying string casing at compile-time: `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>`.
3. **Key Remapping in Mapped Types (`as`)**: Allows filtering or renaming keys during mapped type iteration using `as NewKey`. You can re-map keys to `never` to strip properties from an interface conditionally.

## Deep Explanation

### Event Emitter & Getter Remapping Patterns

```typescript
// 1. Domain Action Template Union Generation
type Domain = 'user' | 'order';
type Action = 'create' | 'update' | 'delete';

// Produces 6 String Literal Union Combinations:
// 'user:create' | 'user:update' | 'user:delete' | 'order:create' | 'order:update' | 'order:delete'
export type EventName = `${Domain}:${Action}`;

// 2. Automated Getter Interface Remapping
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// 3. Filter Properties by Type using Key Remapping to `never`
export type StringPropertiesOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
```

## Production Example

```typescript
import { Getters, StringPropertiesOnly, EventName } from './typeTransformations';

interface Person {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// 1. Automatically Generated Strongly-Typed Getter Interface
type PersonGetters = Getters<Person>;
/*
Resulting Interface:
{
  getId: () => number;
  getName: () => string;
  getEmail: () => string;
  getIsActive: () => boolean;
}
*/

// 2. Extract String Properties Only
type PersonStrings = StringPropertiesOnly<Person>;
/*
Resulting Interface:
{
  name: string;
  email: string;
}
*/

// Strongly-Typed Event Handler Signature
function addEventListener(event: EventName, callback: (payload: any) => void) {
  console.log(`Subscribed to ${event}`);
}

addEventListener('user:create', () => {}); // Valid!
// addEventListener('invalid:event', () => {}); // Compile Error!
```

## Best Practices

- Use template literal types for design system CSS tokens (e.g. `type Margin = `margin-${'top' | 'right' | 'bottom' | 'left'}``) to guarantee type-safe style object props.
- Combine `as K extends ... ? K : never` to strip unneeded property types dynamically from complex generic parameters.

## Common Mistakes

- Creating combinatory template literal unions over extremely large unions ($100 \times 100$), which explodes the compiler type union space ($10,000$ string literals), slowing down IDE IntelliSense performance.

## Follow-up Questions

1. How do Recursive Template Literal Types parse and extract query string parameters from route paths (`'/users/:id/posts/:postId'`) at compile time?

## Related Topics

- Advanced Conditional Types & The `infer` Keyword
- Type Transformations: `keyof`, `typeof`, `[K]` Indexed Access & Type Assertions
