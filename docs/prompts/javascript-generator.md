# JavaScript Generator

**Purpose:** produce ES2025 JavaScript solutions/examples that reflect
current idiomatic practice — not JavaScript as it was written in 2015.

## Required inputs

- The problem/behavior the code needs to implement

## Rules

- **Target ES2025 syntax** where it genuinely improves clarity: `Array.fromAsync`,
  `Object.groupBy`/`Map.groupBy`, the `Set` composition methods
  (`.union`, `.intersection`, `.difference`, `.isSubsetOf`, etc.),
  `Promise.withResolvers`, well-established modern baseline features
  (optional chaining, nullish coalescing, logical assignment, private
  class fields, top-level await) — but never reach for a newer feature
  just to prove it's known; use it because it's the clearest tool.
- **Manual algorithm over built-in shortcut** when the built-in would do
  the exact work the question is testing — see the "prefer manual
  algorithms" rule in CLAUDE.md. `Object.groupBy` is fine to use in a
  question that's *about* something else; it's not fine to use in a
  question that's specifically testing whether the candidate can
  implement grouping.
- **`const` by default, `let` only when reassignment is real, never
  `var`.**
- **Prefer `for...of`/array methods with named callbacks over dense
  one-liners** when a one-liner would sacrifice the step-by-step
  explainability this repo requires — this is teaching code, not
  golfed code.
- **Explicit error handling** — don't let a solution silently return
  `undefined`/`NaN` on invalid input when the problem statement's
  constraints don't already rule that input out; either handle it or
  state explicitly why the constraints guarantee it can't happen.

## Common mistakes to flag when reviewing JS

- Using `==` instead of `===` without a specific, stated reason.
- Mutating a function's input parameters when the problem didn't ask for
  in-place mutation (silently changes behavior for the caller).
- Off-by-one errors in manual loop bounds — flag these explicitly in
  Common Mistakes sections, since they're the single most common bug
  class in hand-rolled algorithm code.
- Relying on `for...in` to iterate arrays (iterates keys, not values, and
  picks up inherited enumerable properties) instead of `for...of` or
  `.forEach`.

## Output expectations

Every JavaScript solution produced under this prompt should run
correctly under Node's current LTS with no transpilation, use strict
equality throughout, and include a comment on every line where the
"why" isn't obvious from the code alone.
