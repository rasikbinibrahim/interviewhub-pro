# T427 · Type Assertions (`as`) vs Runtime Type Casting

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** TypeScript  
**Concepts:** type-assertion, type-casting, as-keyword, double-assertion  

## Question

Why are TypeScript **Type Assertions** (`val as string`) pure compile-time overrides that do NOT alter runtime object representations, and why is double assertion (`val as unknown as Target`) a code smell?

```typescript
const input = document.getElementById('search') as HTMLInputElement;
console.log(input.value); // TS assumes non-null HTMLInputElement!
```
