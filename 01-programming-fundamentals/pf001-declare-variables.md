# PF001 · Declare Variables

**Difficulty:** Easy  
**Experience Level:** Fresher (0–1 YOE)  
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Deloitte  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Subcategory:** Variables & Declarations  
**Concepts Tested:** `var`, `let`, `const`, declaration vs initialization, scope creation  

## Problem Statement

Write a function `declareAndReturn(name, age)` that declares three variables:
1. `userName` initialized with `name` using `const`.
2. `userAge` initialized with `age` using `let`.
3. `isStudent` declared using `var` and initialized to `true`.

## Input

- `name`: `string` — user name string
- `age`: `number` — user age integer

## Output

- `{ userName: string, userAge: number, isStudent: boolean }` — object containing configured bindings.

## Constraints

- Must use `const` for `userName`
- Must use `let` for `userAge`
- Must use `var` for `isStudent`

## Examples

| Input | Output | Why |
|---|---|---|
| `name = "Alice", age = 22` | `{ userName: "Alice", userAge: 22, isStudent: true }` | Standard initialization matching rules |

## Hints

1. Three different declaration keywords are required — what's the core
   difference between `const`, `let`, and `var` that determines which
   one fits each of the three variables described?
2. `userName` never changes after being set, which is exactly what
   `const` is for. `userAge` is also only ever assigned once here, but
   the exercise specifically asks for `let` — a fine choice too, just a
   reassignable one.
3. `var isStudent = true;` must include the initializer directly in the
   declaration — unlike `let`, a `const` declared without one is a
   syntax error, which is exactly the bug in the code below.

## Algorithm

**Pattern:** Explicit Binding Declaration  
**Core insight:** Use `const` for immutable bindings, `let` for block-scoped reassignable bindings, and `var` for function-scoped legacy bindings.

## Dry Run

| Input | `userName` (const) | `userAge` (let) | `isStudent` (var) | Returned Object |
|---|---|---|---|---|
| `("Alice", 22)` | `"Alice"` | `22` | `true` | `{ userName: "Alice", userAge: 22, isStudent: true }` |

## Buggy Code (Where Applicable)

```js
function declareAndReturnBuggy(name, age) {
  userName = name; // Bug: Implicit global variable declaration!
  let userAge;
  const isStudent; // Bug: const declared without initializer!
  
  userAge = age;
  isStudent = true; // Bug: Reassigning const binding!

  return { userName, userAge, isStudent };
}
```

## Expected Output

For `declareAndReturn("Alice", 22)`:
`{ userName: "Alice", userAge: 22, isStudent: true }`

## Root Cause Analysis

1. `userName = name;` assigns a value without a keyword (`var`/`let`/`const`), creating an implicit global property on `window`/`globalThis` (and throwing a `ReferenceError` in ES strict mode).
2. `const isStudent;` violates the ECMAScript specification requirement that `const` declarations MUST have an initializer at declaration time (`SyntaxError: Missing initializer in const declaration`).
3. Reassigning `isStudent = true;` after `const` declaration throws a `TypeError: Assignment to constant variable`.

## Step-by-Step Debugging Process

1. **Step 1:** Replace `userName = name;` with `const userName = name;` to create a block-scoped immutable binding.
2. **Step 2:** Replace `const isStudent;` with `var isStudent = true;` to satisfy the requirement for `var` declaration and initialization.
3. **Step 3:** Ensure `userAge` is declared and assigned with `let userAge = age;`.
4. **Step 4:** Verify that returning `{ userName, userAge, isStudent }` produces the exact requested object shape without leaking global scope variables.



## JavaScript Solution

```js
function declareAndReturn(name, age) {
  const userName = name;
  let userAge = age;
  var isStudent = true;

  return {
    userName,
    userAge,
    isStudent,
  };
}
```

## TypeScript Solution

```ts
interface UserDeclaration {
  userName: string;
  userAge: number;
  isStudent: boolean;
}

function declareAndReturn(name: string, age: number): UserDeclaration {
  const userName: string = name;
  let userAge: number = age;
  var isStudent: boolean = true;

  return {
    userName,
    userAge,
    isStudent,
  };
}
```

## Time Complexity

O(1) — Variable allocations and object creation run in constant time.

## Space Complexity

O(1) — Uses fixed auxiliary stack space for three variable bindings.

## Common Mistakes

- Omitting `var`/`let`/`const` keywords, accidentally polluting the global scope.
- Declaring `const` without an initial value.
- Confusing `let` reassignment rules with `const` binding immutability.

## Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Empty string name (`""`) | Returns `{ userName: "", userAge: 22, isStudent: true }` |
| Zero age (`0`) | Returns `{ userName: "Bob", userAge: 0, isStudent: true }` |
| Negative age (`-1`) | Variable holds `-1` without throwing runtime errors |

## Interview Follow-up Questions

1. What happens if you declare a variable with `var` inside an `if` block versus `let`?
2. What is the difference between declaring a variable without any keyword in non-strict mode vs strict mode?
3. Why does `const obj = {}` allow `obj.key = "val"` without throwing an error?

## Related Problems

- `PF002` Variable Scope
- `PF003` Constants
- `PF012` `let` vs `var` vs `const`

## Revision Notes

- `const`: Block-scoped, immutable binding, **must** be initialized immediately.
- `let`: Block-scoped, reassignable binding, can be initialized later.
- `var`: Function-scoped (or global), hoisted with `undefined`, re-declarable.

---
[← Back to Programming Fundamentals](README.md)
