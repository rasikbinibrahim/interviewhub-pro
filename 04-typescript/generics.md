# Generics

> Technical question — follows [TECHNICAL_QUESTION_TEMPLATE.md](../TECHNICAL_QUESTION_TEMPLATE.md)'s
> 13-field format.

**Question:** What are generics in TypeScript, and why would you use
`function first<T>(arr: T[]): T | undefined` instead of typing the
parameter as `any[]`?

**Difficulty:** Medium
**Experience Level:** Mid-to-Senior (3-7 YOE) — the baseline "what are
generics" answer is expected earlier; the trade-off discussion below
(constraints, variance, inference limits) is what separates a senior
answer.
**Companies:** Google, Microsoft, Amazon, Stripe
**Interview Frequency:** ★★★★★

## Expected Answer

Generics let a function, interface, or class be written once and work
correctly across many concrete types, while TypeScript still tracks and
enforces the *relationship* between those types — unlike `any`, which
discards type information entirely. `function first<T>(arr: T[]): T |
undefined` says "whatever type of array comes in, that's the type of
element that comes out" — call it with `number[]` and you get `number |
undefined` back, fully checked; call it with `any[]` and you get
`any` back, with no safety at the call site at all.

## Detailed Explanation

`T` is a **type parameter** — a placeholder TypeScript resolves to a
concrete type at each call site, either from an explicit argument
(`first<string>(arr)`) or, far more commonly, inferred automatically
from the arguments passed in. The critical difference from `any` is that
a generic *preserves the relationship between input and output types*:

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const a = first([1, 2, 3]);       // inferred: number | undefined
const b = first(['x', 'y']);      // inferred: string | undefined
const c = first<string | number>([1, 'y']); // explicit type argument
```

Compare with `any`:

```ts
function firstAny(arr: any[]): any {
  return arr[0];
}

const d = firstAny([1, 2, 3]); // type is `any` — no safety, no autocomplete,
                                // and `any` silently propagates into
                                // everything `d` touches afterward
```

**Constraints** narrow what a type parameter is allowed to be, using
`extends`:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length; // safe — T is guaranteed to have .length
}

getLength('hello');   // ok — string has .length
getLength([1, 2, 3]); // ok — array has .length
getLength(42);         // Error — number has no .length
```

**Multiple type parameters** model relationships between several
independent types at once:

```ts
function mapObject<T, R>(obj: Record<string, T>, fn: (value: T) => R): Record<string, R> {
  const result: Record<string, R> = {};
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
}

const lengths = mapObject({ a: 'hi', b: 'world' }, (v) => v.length);
// lengths: Record<string, number>
```

## Production Example

A real API client layer is where generics earn their keep — one
`request` function, fully type-safe for every distinct response shape,
instead of either duplicating the function per endpoint or losing type
safety with `any`:

```ts
async function apiRequest<TResponse>(path: string): Promise<TResponse> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<TResponse>;
}

interface User { id: string; name: string; }
interface Question { id: string; title: string; difficulty: string; }

const user = await apiRequest<User>('/api/v1/me');           // user: User
const question = await apiRequest<Question>('/api/v1/q/1');  // question: Question
```

This is exactly the pattern this repo's own [API_GUIDE.md](../API_GUIDE.md)
implies for the RTK Query layer once a real backend exists — one generic
request helper, typed per call site, rather than one copy-pasted
function per resource.

## Best Practices

- Let TypeScript **infer** the type argument from the function's
  arguments whenever possible (`first([1, 2, 3])`) rather than always
  specifying it explicitly (`first<number>([1, 2, 3])`) — inference is
  usually just as safe and far less verbose.
- Add a **constraint** (`T extends ...`) the moment you need to access
  any property or method on a generic value inside the function body —
  an unconstrained `T` only supports operations valid for *every*
  possible type, which in practice means almost nothing.
- Don't reach for a generic when a plain union type would do — a
  function that only ever needs to accept `string | number`, not an
  open-ended type relationship, doesn't need `<T>` at all.

## Trade-offs

Generics add real cognitive overhead — a function signature with two or
three type parameters and constraints is measurably harder to read at a
glance than a concrete-typed one, even when it's the objectively more
correct design. The trade-off is almost always worth it for genuinely
reusable utilities (a `first` helper, an API client, a state-management
hook) and rarely worth it for one-off application code where the
concrete type is already known and fixed.

## Common Mistakes

- Using `any` where a generic was actually needed — this is the single
  most common generics-related mistake, and it silently defeats type
  checking not just at that call site but for everything downstream
  that touches the `any`-typed result.
- Adding a type parameter that's only ever used once, with no
  relationship to any other parameter or the return type — if `T`
  appears in exactly one place, it's very likely doing nothing that a
  concrete type or `unknown` wouldn't do just as well.
- Forgetting a constraint and then working around the resulting compiler
  errors with type assertions (`as any`, `as T`) instead of just adding
  `extends` — this reintroduces the exact unsafety generics exist to
  prevent.

## Follow-up Questions

1. What's the difference between `T extends U` in a generic constraint
   versus in a conditional type (`T extends U ? X : Y`)?
2. When would you use a generic *interface* (`interface Box<T> { value:
   T }`) instead of a generic function?
3. Why might `Array<T>` be preferable to `T[]` in some contexts, and are
   they otherwise equivalent?
4. How do default type parameters work (`function foo<T = string>(...)`),
   and when are they useful?

## Related Topics

- Conditional Types (planned, not yet written)
- Mapped Types (planned, not yet written)
- [docs/prompts/typescript-generator.md](../docs/prompts/typescript-generator.md) — this repo's own standing rules for writing generic TypeScript

---
[← Back to 04-typescript](README.md)
