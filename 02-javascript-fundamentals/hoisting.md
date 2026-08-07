# Hoisting

> Core-depth topic — see [TEMPLATE.md](../TEMPLATE.md) for the full-depth
> section list. For the Temporal Dead Zone specifically, see
> [var-let-const.md](var-let-const.md), which covers it in depth as part
> of comparing the three declaration keywords — this page focuses on
> hoisting mechanics broadly.

## Theory

Hoisting is the JavaScript engine's behavior of processing all
declarations in a scope during the **creation phase** (see
[Execution Context Phases in 03-advanced-javascript](../03-advanced-javascript))
before any code actually runs. Only the *declaration* is hoisted, never
the *initialization* — what varies is exactly how much of the
declaration gets set up in advance:

| Declaration type | What's hoisted | Accessible before the line? |
|---|---|---|
| `var` | Binding, initialized to `undefined` | Yes, reads as `undefined` |
| `function foo() {}` | Binding **and** the full function body | Yes, fully callable |
| `let` / `const` | Binding only, uninitialized (TDZ) | No — throws `ReferenceError` |
| `class` | Binding only, uninitialized (TDZ) | No — throws `ReferenceError`, same as let/const |

Function declarations are the special case worth remembering: unlike
`var`, the entire function — not just the name — is hoisted, which is
why calling a function declared with `function foo() {}` above its
line in the source works correctly.

## Real-world Example

```js
console.log(typeof sayHi); // 'function' — fully hoisted, callable
console.log(count);        // undefined — var hoisted, not yet assigned

function sayHi() { return 'hi'; }
var count = 0;

console.log(status); // ReferenceError: Cannot access 'status' before initialization
let status = 'ready';
```

## A classic interview trap: function vs. var hoisting priority

```js
console.log(foo); // [Function: foo] — function hoisting wins
var foo = 'Bar';
function foo() {
  return 'Foo';
}
console.log(foo); // 'Bar' — the later assignment overwrites it at runtime
```

Function declarations are hoisted *before* `var` declarations in the
same scope, so a `function` and a `var` sharing a name initially resolve
to the function — but a `var` assignment later in the code still
overwrites it once execution reaches that line, since hoisting only
governs what happens *before* the code runs, not the assignment order
after.

## Interview Questions — Basic

1. What does "hoisting" actually mean — what gets moved, and what doesn't?
2. What is the value of a `var` variable if you read it before its
   declaration line?
3. Why does calling a `function`-declared function above its line in the
   source work, but calling an arrow function assigned to a `const`
   the same way doesn't?

## Interview Questions — Medium

1. Walk through the "function vs. var hoisting priority" example above —
   explain both console.log outputs.
2. Are `let` and `const` hoisted at all? (Trick question — see the note
   below.)
3. Is a `class` declaration hoisted the same way as a `function`
   declaration? What's the practical difference?

## Interview Questions — Advanced

1. Explain hoisting in terms of the two-phase execution model (creation
   phase vs. execution phase) — what specifically happens to each
   declaration type during the creation phase?
2. Function *expressions* (`var foo = function() {}`) are not hoisted the
   same way as function *declarations* — what's the practical
   consequence, and how would you demonstrate it with a code example
   that throws?
3. How does hoisting interact with block scope — does a function
   declaration *inside* an `if` block get hoisted to the top of the
   block, the enclosing function, or somewhere else? (Answer varies by
   strict/non-strict mode — this is a genuinely subtle spec detail worth
   knowing exists, even if the exact behavior is rarely relied upon.)

## Common Mistakes

- Saying "`let` and `const` are not hoisted" — they are; they're hoisted
  into the Temporal Dead Zone, which is *why* accessing them early
  throws instead of returning `undefined`. Not being hoisted at all
  would mean a plain `ReferenceError: x is not defined`, which is a
  different error message than what TDZ actually produces
  (`Cannot access 'x' before initialization`) — the distinction is a
  strong signal of real understanding versus memorized rules.
- Assuming a function expression (`var greet = function() {}`) behaves
  like a function declaration for hoisting purposes — only the `var`
  binding hoists (as `undefined`), not the function body, so calling it
  early throws `TypeError: greet is not a function`, not a
  `ReferenceError`.
- Writing code that relies on hoisting for readability (e.g., calling a
  helper function before it's defined further down the file) — legal,
  but reduces readability for anyone reading top-to-bottom; most style
  guides recommend declaring before use regardless of what hoisting
  permits.

## Best Practices

- Default to `const`/`let` and declare variables at the top of the
  scope they're used in — this sidesteps hoisting confusion entirely by
  never relying on it.
- Keep relying on function-declaration hoisting for genuinely
  order-independent helpers (e.g., a file of pure utility functions
  that call each other) — it's a legitimate, idiomatic use of hoisting,
  not just a footgun to avoid at all costs.
- Never mix a `var` and a `function` declaration with the same name in
  the same scope — the interaction between their hoisting priorities is
  exactly the kind of subtle bug shown in the example above.

## Senior-level Discussion

The bar here is being able to explain hoisting *mechanically* — in terms
of the creation-phase/execution-phase model — rather than reciting "var
is hoisted, let and const are not" as a memorized rule. A senior
candidate should be able to correctly predict the output of the
function-vs-var priority example above without running it, and should
know precisely *why* the TDZ produces a different error message than a
truly undeclared variable — that's the detail that separates "read about
hoisting" from "has reasoned through the execution model."

## References

- [MDN — Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [ECMA-262 — Function/Variable/Lexical Declaration Instantiation](https://tc39.es/ecma262/#sec-declaration-instantiation)

---
[← Back to 02-javascript-fundamentals](README.md)
