# T419 · Subtyping Variance: Covariance, Contravariance & Strict Function Types

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Stripe  
**Category:** TypeScript  
**Concepts:** typescript, covariance, contravariance, strictFunctionTypes  

## Question

What are **Covariance** (preserving subtyping direction), **Contravariance** (reversing subtyping direction in function parameters), and `strictFunctionTypes` in TypeScript?

## Expected Answer

- **Covariance (Return Types)**: Function return types are covariant (`Sub` can be assigned where `Super` is expected).
- **Contravariance (Function Arguments)**: Under `strictFunctionTypes`, function parameter types are contravariant (`Super` parameter function can accept `Sub` parameter function).

```typescript
class Animal { name = 'Animal'; }
class Dog extends Animal { bark() {} }

type Fn<in Arg, out Ret> = (arg: Arg) => Ret;
```
