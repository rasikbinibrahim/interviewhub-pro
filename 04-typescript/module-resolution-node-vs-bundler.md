# T425 · TSConfig Module Resolution Strategies (`node16`, `nodenext`, `bundler`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft, Vercel  
**Category:** TypeScript  
**Concepts:** tsconfig, module-resolution, bundler, node16  

## Question

How do TypeScript module resolution strategies (`"moduleResolution": "bundler"` vs `"node16"` / `"nodenext"`) resolve package exports, subpath exports (`package.json#exports`), and extension requirements?

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true
  }
}
```
