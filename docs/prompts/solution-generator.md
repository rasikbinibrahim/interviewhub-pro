# Solution Generator

**Purpose:** given a problem statement (algorithmic or implementation-
style), produce JavaScript and TypeScript solutions that satisfy the
[Coding Rules](../../CLAUDE.md#coding-rules) in CLAUDE.md.

## Required inputs

- The problem statement, constraints, and at least one example
- Whether a brute-force pass should be shown (default: yes, briefly,
  before the optimized solution — per "always optimize solutions")

## Process

1. **Brute-force first, briefly.** State the naive approach and its
   complexity in 2-4 sentences — don't fully implement it unless it's
   pedagogically useful to contrast with the optimized version. The goal
   is showing the reasoning path, not padding the answer.
2. **Identify the key insight** that gets you from brute-force to
   optimal — name it explicitly ("this problem is a sliding window
   because the constraint is a *contiguous* subarray and the target
   condition is monotonic as the window grows").
3. **Implement the optimized JavaScript solution.**
   - ES2025 syntax.
   - Manual algorithm — no reaching for a built-in that does the actual
     work being tested (see Coding Rules).
   - Meaningful variable names.
   - A comment on every non-obvious line explaining *why*, not *what*.
   - Handle every edge case identified for this problem — don't let the
     "happy path" implementation silently mishandle them.
4. **Implement the optimized TypeScript solution.**
   - Strict-mode clean: no `any`, no implicit `any`, no unchecked
     `undefined`/`null` access.
   - Use generics where the function is legitimately generic — not
     decoratively.
   - Prefer precise types (`ReadonlyArray<number>`, discriminated unions)
     over `object`/`unknown` when the shape is actually known.
5. **State final complexity** (time and space) for the optimized
   solution — this feeds [complexity-analyzer.md](complexity-analyzer.md)
   if a full breakdown is also needed.

## Hard constraints

- Both solutions must actually run and produce correct output for every
  stated example — don't hand-wave.
- If JS and TS solutions would be identical apart from type annotations,
  say so explicitly rather than pretending they're meaningfully
  different — but still provide both in full, since the TS version's
  type signature is itself part of what's being demonstrated (strict
  mode discipline).
- Never silently drop an edge case from the brute-force reasoning when
  writing the optimized version.

## Output skeleton

```markdown
**Brute-force approach:** ... (O(?) time, O(?) space)

**Key insight:** ...

**JavaScript Solution**
```js
/**
 * ...
 */
function solve(...) {
  // why, not what
}
```

**TypeScript Solution**
```ts
function solve(...): ReturnType {
  // why, not what
}
```
```
