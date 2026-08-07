# T412 · TypeScript Template Literal Types & String Union Manipulations

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, template-literals, type-system  

## Question

How do TypeScript **Template Literal Types** (`type Event = `${Domain}:${Action}``) perform compile-time string manipulation and cross-product union expansions?

## Expected Answer

```typescript
type Domain = 'user' | 'post';
type Action = 'create' | 'delete';

// Cross-product union expansion!
type AuditEvent = `${Domain}_${Action}`;
// 'user_create' | 'user_delete' | 'post_create' | 'post_delete'

type Getter<T extends string> = `get${Capitalize<T>}`;
type UserGetter = Getter<'name'>; // 'getName'
```
