# T420 · TSConfig Strict Mode Flags: `strictNullChecks`, `noImplicitAny` & `exactOptionalPropertyTypes`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** tsconfig, strict-mode, strictNullChecks, noImplicitAny  

## Question

What safety constraints are enforced by setting `"strict": true` in `tsconfig.json`, specifically `strictNullChecks`, `noImplicitAny`, `noImplicitThis`, and `exactOptionalPropertyTypes`?

## Expected Answer

- **`noImplicitAny`**: Errors on expressions/parameters inferred as `any`.
- **`strictNullChecks`**: Prevents assigning `null` or `undefined` to typed variables unless explicitly unioned (`string | null`).
- **`exactOptionalPropertyTypes`**: Forbids passing explicit `undefined` to optional properties (`prop?: string`).
