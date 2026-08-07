# TypeScript Generator

**Purpose:** produce or convert a solution/example into strict-mode
TypeScript that would pass review in a TypeScript-first codebase — not
JavaScript with type annotations sprinkled on top.

## Required inputs

- The problem/behavior the code needs to implement, or existing
  JavaScript to convert

## Rules

- **Strict mode is non-negotiable**: no `any`, no implicit `any`
  (untyped parameters), no unchecked access into possibly-`undefined`
  values.
- **Type the shape you actually have**, not the loosest type that
  compiles. `unknown` + a type guard beats `any`; a discriminated union
  beats a loose `object` with optional fields when the variants are
  actually distinct.
- **Use generics when the function is genuinely generic** — a function
  whose logic doesn't depend on the specific type of its input/output
  should be generic (`function first<T>(arr: T[]): T | undefined`), not
  hardcoded to one type and duplicated.
- **Prefer `readonly`** on parameters/properties that the function
  doesn't mutate — this documents intent and catches accidental mutation
  at compile time.
- **Narrow before you use** — `if (typeof x === 'string')`,
  `Array.isArray(x)`, discriminated union tags — never a type assertion
  (`as T`) as a substitute for an actual runtime check, unless the
  assertion is provably safe and that's stated explicitly.
- **Utility types over hand-rolled duplicates** — `Partial<T>`,
  `Pick<T, K>`, `Omit<T, K>`, `ReturnType<typeof fn>` instead of
  re-declaring a near-identical interface by hand.
- **Return types are explicit** on exported/public functions — don't
  rely on inference for anything that's part of a public API surface,
  even though TS could infer it; explicit return types are a contract
  and catch accidental signature drift.

## Common mistakes to flag when reviewing TS

- `as any` used to silence an error instead of fixing the underlying
  type mismatch.
- Non-null assertions (`value!`) used defensively instead of narrowing —
  a silent runtime crash waiting to happen if the assumption is ever
  wrong.
- Overly generic types (`Record<string, any>`) where the actual shape
  was knowable and should have been modeled precisely.
- Enums used where a union of string literals would be simpler and
  tree-shake better, unless the specific features of `enum` (reverse
  mapping, `const enum`) are actually needed.

## Output expectations

Every TypeScript solution produced under this prompt must compile under:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

If a solution can't reasonably satisfy `noUncheckedIndexedAccess` (e.g. an
algorithm that indexes an array it just bounds-checked), add the specific,
narrow reasoning inline as a comment — not a blanket `!`.
