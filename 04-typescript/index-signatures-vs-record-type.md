# T418 · Dynamic Objects: Index Signatures (`[key: string]`) vs `Record<K, T>`

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, index-signatures, record-type  

## Question

How do **Index Signatures** (`{ [key: string]: T }`) compare against the utility type `Record<K, T>` for typing dynamic dictionary objects?

## Expected Answer

```typescript
// 1. Index Signature
interface Dictionary {
  [key: string]: number;
}

// 2. Record Utility Type with Union Keys
type PageConfig = Record<'home' | 'about', { title: string }>;
```
