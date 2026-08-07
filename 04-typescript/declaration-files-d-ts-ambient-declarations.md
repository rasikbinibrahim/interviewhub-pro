# T426 · Declaration Files (`.d.ts`) & Ambient Module Declarations

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** TypeScript  
**Concepts:** d-ts, declaration-files, ambient-declarations, definitely-typed  

## Question

How do TypeScript declaration files (`.d.ts`) provide type definitions for untyped JavaScript libraries and static assets (`declare module '*.png'`)?

```typescript
// global.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
```
