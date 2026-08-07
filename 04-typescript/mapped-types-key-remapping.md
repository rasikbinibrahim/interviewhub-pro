# T413 · TypeScript Mapped Types & Key Remapping via `as`

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, mapped-types, key-remapping, generics  

## Question

How do TypeScript **Mapped Types** (`{ [K in keyof T]: T[K] }`) iterate over keys, and how does key remapping via the `as` clause filter or rename object keys at compile time?

## Expected Answer

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
```
