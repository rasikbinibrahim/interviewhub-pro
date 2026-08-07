# T416 · `type` Aliases vs `interface` & Declaration Merging

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, type-vs-interface, declaration-merging  

## Question

How do `type` aliases and `interface` declarations differ in extensibility (`extends` vs `&`), primitives support, and **Declaration Merging**?

## Expected Answer

- **`interface`**: Can be merged automatically via multiple declarations (**Declaration Merging**). Ideal for OOP and public library APIs.
- **`type`**: Supports primitives, union types (`type ID = string | number`), tuples, and mapped types. Cannot undergo declaration merging.

```typescript
// Interface Declaration Merging
interface User { name: string; }
interface User { age: number; } // Merges into { name: string; age: number; }
```
