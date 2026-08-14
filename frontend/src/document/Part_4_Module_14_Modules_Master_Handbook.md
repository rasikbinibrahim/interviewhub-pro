# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 14 — Modules

**Questions 291–305**

**Audience:** 0–2 Years → 8+ Years  
**Focus:** CommonJS, ES Modules, import/export, dynamic import, tree shaking, circular dependencies, barrel files, module scope, lazy loading, performance, browser and Node.js behavior, production architecture, and interview coding.

---

# Module Objective

JavaScript modules provide boundaries for code organization, dependency management, encapsulation, testing, reuse, and build optimization.

This module covers:

- CommonJS
- ES Modules
- `import`
- `export`
- default exports
- named exports
- dynamic `import()`
- tree shaking
- circular dependencies
- barrel files
- module scope
- lazy loading
- browser modules
- Node.js modules
- bundlers
- module resolution
- performance
- production architecture
- migration strategies
- coding exercises
- output-based interview questions
- senior/staff/principal follow-ups

---

# Question 291 — What Is CommonJS?

**Difficulty:** ⭐ Easy  
**Experience:** 0–2 Years

CommonJS is a module system historically associated with Node.js.

It uses:

```js
require()
module.exports
exports
```

Example:

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = {
  add
};
```

Consumer:

```js
// app.js
const { add } = require("./math");

console.log(add(2, 3));
```

Output:

```text
5
```

### Characteristics

CommonJS modules traditionally use:

```text
require()
module.exports
exports
```

The dependency loading model is commonly described as synchronous.

### Production use

CommonJS remains important when maintaining:

- older Node.js services
- legacy tooling
- older test configurations
- existing npm packages

Modern frontend applications generally prefer ESM when the toolchain supports it.

---

# Question 292 — What Are ES Modules?

**Difficulty:** ⭐ Easy

ES Modules, or ESM, are the standardized JavaScript module system defined by ECMAScript.

They use:

```js
export
import
```

Example:

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

```js
// app.js
import { add } from "./math.js";

console.log(add(2, 3));
```

Output:

```text
5
```

### Why ESM matters

ESM provides:

- standardized module syntax
- module scope
- static import/export structure
- live bindings
- tooling-friendly dependency graphs
- tree-shaking opportunities
- browser support
- modern Node.js support

### Browser

```html
<script type="module" src="/app.js"></script>
```

---

# Question 293 — What Is the Difference Between CommonJS and ESM?

**Difficulty:** ⭐⭐ Medium

| Feature | CommonJS | ESM |
|---|---|---|
| Import | `require()` | `import` |
| Export | `module.exports` | `export` |
| Standard | Node ecosystem convention | ECMAScript standard |
| Static analysis | More limited | Strong |
| Tree shaking | Less natural | Excellent tooling support |
| Browser native support | No native CommonJS | Yes |
| Typical loading model | Synchronous `require()` | Static module graph + async module loading in browsers |
| Top-level await | Not as an ESM feature | Supported |
| Live bindings | Different CommonJS semantics | Yes |
| Modern frontend | Less common | Preferred |

### Interview answer

Do not simply say:

> "CommonJS is old and ESM is new."

A stronger answer explains their module semantics, loading behavior, interoperability, static analysis, tooling and runtime differences.

---

# Question 294 — What Is `import`?

**Difficulty:** ⭐ Easy

`import` consumes exported bindings from an ES module.

### Named import

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

### Multiple imports

```js
import {
  add,
  subtract
} from "./math.js";
```

### Namespace import

```js
import * as math from "./math.js";

console.log(math.add(2, 3));
```

### Default import

```js
import UserService from "./UserService.js";
```

### Side-effect import

```js
import "./analytics.js";
```

This loads the module for its side effects without importing a binding.

### Important

Static imports must be declared at module top level:

```js
import { add } from "./math.js";
```

Use dynamic import when loading must happen conditionally.

---

# Question 295 — What Is `export`?

**Difficulty:** ⭐ Easy

`export` exposes module bindings.

### Named export

```js
export function add(a, b) {
  return a + b;
}
```

### Export after declaration

```js
function subtract(a, b) {
  return a - b;
}

export { subtract };
```

### Multiple exports

```js
export const API_URL = "/api";

export function fetchUsers() {
  // implementation
}
```

### Re-export

```js
export { add } from "./math.js";
```

### Export all

```js
export * from "./math.js";
```

Use `export *` carefully because it can make public APIs less explicit.

---

# Question 296 — What Is the Difference Between Default and Named Exports?

**Difficulty:** ⭐⭐ Medium

### Named export

```js
export function formatDate(date) {
  return date.toISOString();
}
```

Consumer:

```js
import { formatDate } from "./date.js";
```

The name is part of the exported interface.

### Default export

```js
export default function formatDate(date) {
  return date.toISOString();
}
```

Consumer:

```js
import formatDate from "./date.js";
```

The consumer can choose the local name.

### Comparison

| Named | Default |
|---|---|
| Can have multiple | One default per module |
| Imported with `{}` | Imported without `{}` |
| Explicit API names | Flexible local naming |
| Good for utility modules | Useful for primary module value |

### Senior recommendation

Choose a convention and apply it consistently across the codebase. Consistency is usually more valuable than debating one universally correct style.

---

# Question 297 — What Is Dynamic `import()`?

**Difficulty:** ⭐⭐ Medium

Dynamic import loads a module asynchronously and returns a Promise.

```js
async function loadAnalytics() {
  const analytics = await import("./analytics.js");

  analytics.initialize();
}
```

Conceptual flow:

```text
Application
    ↓
import("./analytics.js")
    ↓
Module Loader
    ↓
Network / Cache
    ↓
Module Evaluation
    ↓
Promise fulfilled
    ↓
Feature executes
```

### Conditional loading

```js
if (user.isAdmin) {
  const { AdminPanel } =
    await import("./AdminPanel.js");

  AdminPanel.mount();
}
```

### Production use

Dynamic imports are useful for:

- route-level code splitting
- admin functionality
- heavy charts
- editors
- PDF viewers
- rarely used workflows

### Error handling

```js
try {
  const module = await import("./feature.js");

  module.start();
} catch (error) {
  console.error("Feature loading failed", error);
}
```

---

# Question 298 — What Is Tree Shaking?

**Difficulty:** ⭐⭐ Medium

Tree shaking removes unused exports from production bundles when tooling can statically determine they are unused.

Example:

```js
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}
```

Application:

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

A capable production bundler may remove unused functions.

### Why ESM helps

ESM has statically analyzable import/export declarations.

Conceptually:

```text
ESM
 ↓
Dependency Graph
 ↓
Used Exports
 ↓
Unused Exports
 ↓
Dead Code Elimination
 ↓
Smaller Bundle
```

### Important

Tree shaking is not magic.

It can be affected by:

- side effects
- CommonJS modules
- dynamic behavior
- package configuration
- bundler configuration
- library structure

---

# Question 299 — What Are Circular Dependencies?

**Difficulty:** ⭐⭐⭐ Hard

A circular dependency occurs when modules depend on each other directly or indirectly.

```text
A
↓
B
↓
A
```

Example:

```js
// a.js
import { valueB } from "./b.js";

export const valueA = valueB + 1;
```

```js
// b.js
import { valueA } from "./a.js";

export const valueB = valueA + 1;
```

This can result in:

- initialization-order problems
- partially initialized bindings
- runtime errors
- difficult debugging
- architectural coupling

### Important ESM behavior

ESM imports are live bindings, and module evaluation follows dependency ordering. A circular graph is not automatically invalid, but accessing a binding before its initialization can cause a `ReferenceError`.

### Better architecture

Instead of:

```text
A ↔ B
```

prefer:

```text
A → shared module ← B
```

or extract shared behavior into a lower-level abstraction.

---

# Question 300 — What Are Barrel Files?

**Difficulty:** ⭐⭐ Medium

A barrel file re-exports multiple modules from a central entry point.

Example:

```js
// components/index.js
export { Button } from "./Button.js";
export { Modal } from "./Modal.js";
export { Input } from "./Input.js";
```

Consumer:

```js
import {
  Button,
  Modal
} from "./components/index.js";
```

### Advantages

- convenient imports
- centralized public API
- cleaner package boundaries
- easier discoverability

### Disadvantages

Poorly designed barrel files can:

- increase dependency graph complexity
- create circular dependencies
- make module boundaries unclear
- affect bundling in some configurations
- expose internal modules unintentionally

### Enterprise recommendation

Use barrels for deliberate public APIs, not automatically in every folder.

---

# Question 301 — What Is Module Scope?

**Difficulty:** ⭐ Easy

Variables declared in an ES module are scoped to that module.

```js
// module.js
const secret = "private";

export function getSecret() {
  return secret;
}
```

Another module cannot directly access:

```js
secret;
```

unless it is exported.

### Module scope diagram

```text
Application
│
├── module-a.js
│   ├── privateA
│   └── exportA
│
├── module-b.js
│   ├── privateB
│   └── exportB
│
└── app.js
    ├── imports exportA
    └── imports exportB
```

ES modules are also strict-mode code by definition.

### Production benefit

Module scope provides natural encapsulation without relying on global variables.

---

# Question 302 — What Is Lazy Loading?

**Difficulty:** ⭐⭐ Medium

Lazy loading means loading code only when it is needed.

```js
async function openReports() {
  const { Reports } =
    await import("./Reports.js");

  Reports.open();
}
```

### Eager loading

```text
Application startup
 ↓
Load everything
 ↓
Parse everything
 ↓
Execute everything
```

### Lazy loading

```text
Application startup
 ↓
Load critical code
 ↓
User requests Reports
 ↓
Download Reports chunk
 ↓
Parse
 ↓
Execute
```

### Benefits

- smaller initial JavaScript
- faster startup
- lower initial parse/compile work
- reduced memory pressure

### Trade-off

Lazy loading can introduce a delay when the user first requests the feature.

Use:

- prefetching
- preloading where appropriate
- route-based splitting
- intelligent caching

to reduce the perceived delay.

---

# Question 303 — How Do Modules Work in the Browser?

**Difficulty:** ⭐⭐ Medium

Browser ESM is enabled with:

```html
<script type="module" src="/src/main.js"></script>
```

The browser:

```text
HTML
 ↓
Module Script
 ↓
Resolve imports
 ↓
Fetch dependency graph
 ↓
Parse modules
 ↓
Instantiate
 ↓
Evaluate
 ↓
Application executes
```

### Important browser behavior

Module scripts are deferred by default.

Conceptually:

```html
<script type="module" src="/app.js"></script>
```

does not block HTML parsing in the same way a classic synchronous script can.

### Module URLs

Browsers resolve module specifiers as URLs.

Relative:

```js
import { add } from "./math.js";
```

Absolute:

```js
import { add } from "/assets/math.js";
```

Bare specifiers usually require tooling/import maps or an environment that resolves them.

---

# Question 304 — How Do Modules Work in Node.js?

**Difficulty:** ⭐⭐ Medium

Node.js supports both CommonJS and ESM.

### CommonJS

```js
const fs = require("node:fs");
```

### ESM

```js
import fs from "node:fs";
```

Project configuration can influence how `.js` files are interpreted.

For example:

```json
{
  "type": "module"
}
```

tells Node.js to treat `.js` files as ESM by default within that package scope.

### Node ESM considerations

- module resolution differs from browsers
- package `exports` affects public entry points
- file extensions may matter
- CommonJS/ESM interoperability has rules
- `import()` works for asynchronous loading

### Interview trap

Do not say:

> "Node.js only supports CommonJS."

Modern Node.js supports ESM as well.

---

# Question 305 — What Are Module Resolution, Bundling and Production Module Architecture?

**Difficulty:** ⭐⭐⭐ Hard  
**Experience:** 5–8 Years+

Module resolution determines which module a specifier refers to.

Example:

```js
import { Button } from "@company/ui";
```

A toolchain may resolve:

```text
Source code
    ↓
Module specifier
    ↓
Package / alias / file resolution
    ↓
Dependency graph
    ↓
Bundler
    ↓
Chunks
    ↓
Minification
    ↓
Deployment
```

### Enterprise architecture

```text
                    Application
                         │
             ┌───────────┴───────────┐
             │                       │
         Features                Shared UI
             │                       │
         Services                Design System
             │                       │
          API Layer             Shared Utils
             │                       │
             └───────────┬───────────┘
                         │
                    Build Graph
                         │
               ┌─────────┴─────────┐
               │                   │
          Initial Chunk       Lazy Chunks
               │                   │
               └─────────┬─────────┘
                         ↓
                       CDN
```

### Senior design principles

1. Keep dependency direction intentional.
2. Avoid circular dependencies.
3. Define public package APIs.
4. Use ESM where practical.
5. Use dynamic imports for appropriate feature boundaries.
6. Keep shared packages stable.
7. Avoid giant barrel files.
8. Analyze bundle output.
9. Configure package `exports` where appropriate.
10. Document module ownership.

### Production example

A large React application could use:

```text
apps/
  web/

packages/
  ui/
  api/
  auth/
  config/
  utils/
  analytics/
```

The application imports public APIs rather than reaching into internal implementation paths.

### Architecture rule

```text
Feature
  ↓
Domain/API
  ↓
Shared infrastructure

not

Feature A ↔ Feature B ↔ Feature C
```

---

# Built-in vs Without-Built-in Coding

## Exercise 1 — Exported Utility

### Built-in / standard ESM approach

```js
// math.js
export const add = (a, b) => a + b;
```

```js
// app.js
import { add } from "./math.js";

console.log(add(10, 20));
```

Output:

```text
30
```

### Without module syntax

In a legacy global-script environment:

```js
// math.js
function add(a, b) {
  return a + b;
}

globalThis.AppMath = {
  add
};
```

```js
console.log(globalThis.AppMath.add(10, 20));
```

Output:

```text
30
```

### Interview discussion

The global approach creates global state and weaker dependency boundaries. ESM is preferred for modern applications.

---

# Exercise 2 — Barrel Export

### Standard

```js
// components/index.js
export { Button } from "./Button.js";
export { Input } from "./Input.js";
```

### Direct imports

```js
import { Button } from "./components/Button.js";
```

Discuss when direct imports are preferable to a barrel API.

---

# Exercise 3 — Dynamic Import

```js
async function loadReports() {
  const module = await import("./reports.js");

  return module.createReports();
}
```

Requirements:

- loading state
- retry
- error fallback
- telemetry
- cache behavior

---

# Exercise 4 — Manual Lazy Registry

Implement a simple module registry without dynamic import.

```js
const registry = new Map();

function register(name, factory) {
  registry.set(name, factory);
}

function load(name) {
  const factory = registry.get(name);

  if (!factory) {
    throw new Error(`Unknown module: ${name}`);
  }

  return factory();
}

register("reports", () => ({
  open() {
    console.log("Reports opened");
  }
}));

load("reports").open();
```

Output:

```text
Reports opened
```

### Comparison

```text
Dynamic import
→ actual code loading boundary

Manual registry
→ object/function selection boundary
```

They solve different problems.

---

# Exercise 5 — Circular Dependency Refactoring

Given:

```text
UserService → PermissionService
PermissionService → UserService
```

Refactor toward:

```text
UserService → PermissionRules
PermissionService → PermissionRules
```

Explain:

- dependency inversion
- initialization order
- testability
- architecture boundaries

---

# Exercise 6 — Module Dependency Graph

Given:

```text
App
├── Dashboard
│   ├── Charts
│   └── API
├── Admin
│   ├── Users
│   └── Permissions
└── Shared UI
```

Design:

- eager modules
- lazy modules
- public exports
- shared dependencies
- chunk boundaries

---

# Output-Based Interview Questions

## Output 1

```js
// counter.js
export let count = 0;

export function increment() {
  count++;
}
```

```js
import {
  count,
  increment
} from "./counter.js";

console.log(count);

increment();

console.log(count);
```

Expected:

```text
0
1
```

### Why?

ESM imports are live bindings rather than copied primitive snapshots.

---

## Output 2

```js
// math.js
export const value = 10;
```

```js
import { value } from "./math.js";

value = 20;
```

Expected:

```text
TypeError
```

Imported bindings are read-only from the importing module.

---

## Output 3

```js
import * as math from "./math.js";

console.log(typeof math);
```

Expected:

```text
object
```

The namespace import provides a module namespace object.

---

## Output 4

```js
console.log(
  typeof import("./math.js")
);
```

Expected:

```text
object
```

More precisely, the expression returns a Promise object.

---

## Output 5

```js
// a.js
export const value = 10;
```

```js
import { value as number } from "./a.js";

console.log(number);
```

Output:

```text
10
```

---

# MCQs

## MCQ 1

Which syntax creates an ES module in a browser?

A. `<script module>`  
B. `<script type="module">`  
C. `<module>`  
D. `<script esm>`

**Answer: B**

---

## MCQ 2

Which syntax performs dynamic module loading?

A. `require.lazy()`  
B. `load()`  
C. `import()`  
D. `module.load()`

**Answer: C**

---

## MCQ 3

Which feature enables strong static dependency analysis?

A. ESM static imports  
B. `eval()`  
C. `setTimeout()`  
D. DOM events

**Answer: A**

---

## MCQ 4

What does `module.exports` belong to?

A. ESM  
B. CommonJS  
C. DOM  
D. CSS Modules

**Answer: B**

---

## MCQ 5

What is a common risk of circular dependencies?

A. Faster startup  
B. Initialization-order problems  
C. Automatic tree shaking  
D. Better caching

**Answer: B**

---

# Scenario-Based Interview Questions

## Scenario 1 — Large React Application

Your application has:

```text
50+ feature areas
2000+ components
multiple teams
shared design system
```

How would you design module boundaries?

Discuss:

- feature modules
- public APIs
- barrel files
- package boundaries
- dependency direction
- circular dependency prevention
- ownership

---

## Scenario 2 — Slow Initial Load

A dashboard bundle is 4 MB compressed.

Identify a module strategy to reduce startup cost.

Expected discussion:

```text
Analyze bundle
 ↓
Identify heavy features
 ↓
Route-level splitting
 ↓
Dynamic imports
 ↓
Remove duplicate dependencies
 ↓
Tree shaking
 ↓
Cache chunks
 ↓
Measure Core Web Vitals
```

---

## Scenario 3 — CommonJS to ESM Migration

A large Node.js/React monorepo contains:

```text
60% CommonJS
40% ESM
```

How would you migrate safely?

Expected areas:

- dependency graph
- package boundaries
- tests
- tooling
- Node version
- package `type`
- package `exports`
- interoperability
- CI
- incremental migration

---

# Senior Follow-Up Questions

1. What are ESM live bindings?
2. Why are ESM imports statically analyzable?
3. Why does tree shaking work better with ESM?
4. What happens during module instantiation?
5. What happens during module evaluation?
6. How are circular ESM dependencies handled?
7. What causes a TDZ-like `ReferenceError` in circular modules?
8. How does CommonJS interoperate with ESM?
9. Why can barrel files affect dependency graphs?
10. When would you avoid a barrel file?
11. What is package `exports`?
12. What is the difference between `main` and `exports`?
13. How do browsers resolve module specifiers?
14. How does Node.js resolve package imports?
15. How does dynamic import affect caching?
16. How can lazy loading create a network waterfall?
17. How would you prefetch a lazy feature?
18. How would you detect circular dependencies?
19. How would you design module boundaries for a monorepo?
20. How would you migrate CommonJS to ESM without a big-bang rewrite?

---

# Staff Engineer Questions

1. Design module boundaries for a 1000-engineer frontend organization.
2. Define dependency direction rules for a monorepo.
3. Design an ESM migration strategy across hundreds of packages.
4. Establish standards for barrel files.
5. Design a package public API policy.
6. Design route-level and component-level code splitting.
7. Define when dynamic imports should be used.
8. Design dependency-cycle detection in CI.
9. Design a shared design-system package architecture.
10. Define bundle ownership across multiple frontend teams.

---

# Principal Engineer Questions

1. Design a module architecture for a multi-product frontend platform.
2. How would you prevent architecture erosion over five years?
3. How would you govern shared packages across 100+ teams?
4. How would you design module federation boundaries if micro frontends are required?
5. How would you migrate a legacy CommonJS ecosystem to ESM?
6. How would you control dependency graph complexity?
7. How would you optimize chunk boundaries globally?
8. How would you design package versioning and release governance?
9. How would you measure the cost of module coupling?
10. How would you define enterprise JavaScript module standards?

---

# 30-Second Interview Answer

> JavaScript modules provide explicit boundaries for dependencies, encapsulation and reuse. Modern applications should generally prefer ES Modules because `import` and `export` provide standardized syntax, static dependency analysis, live bindings and strong tooling support. CommonJS remains important for legacy Node.js systems. In production I use clear module boundaries, public APIs, controlled barrel files, dynamic imports for appropriate lazy features, and dependency-cycle detection.

---

# 2-Minute Interview Answer

> CommonJS and ESM are two important JavaScript module systems. CommonJS uses `require` and `module.exports` and is historically common in Node.js. ESM is the standardized ECMAScript module system and uses `import` and `export`.
>
> ESM has strong static structure, which helps bundlers perform tree shaking and dependency analysis. Dynamic `import()` provides asynchronous code loading and is useful for route-level or feature-level code splitting.
>
> At enterprise scale, module architecture is as important as syntax. I define dependency direction, public APIs, package boundaries and ownership rules, and I prevent circular dependencies. I also measure the effect of module boundaries on bundle size and runtime performance.

---

# 5-Minute Deep Explanation

A production module system should be considered at four levels:

```text
Language
   ↓
Runtime
   ↓
Build System
   ↓
Architecture
```

## 1. Language

```js
import
export
import()
```

## 2. Runtime

```text
Browser
Node.js
Web Workers
Server runtimes
```

## 3. Build system

```text
Modules
 ↓
Dependency graph
 ↓
Tree shaking
 ↓
Code splitting
 ↓
Chunks
 ↓
Minification
```

## 4. Architecture

```text
Application
 ↓
Features
 ↓
Domains
 ↓
Shared libraries
 ↓
Platform packages
```

A good architecture prevents:

```text
Feature A
   ↕
Feature B
   ↕
Feature C
```

and prefers:

```text
Feature A ──┐
Feature B ──┼──> Shared Domain/API
Feature C ──┘
```

This reduces coupling and makes large codebases easier to evolve.

---

# Production Best Practices

```text
□ Prefer ESM for new modern application code where supported
□ Use explicit public module APIs
□ Avoid global variables
□ Keep module responsibilities focused
□ Avoid circular dependencies
□ Use barrel files intentionally
□ Prefer direct imports when they improve dependency clarity
□ Use dynamic import for appropriate lazy features
□ Analyze generated chunks
□ Avoid excessive code splitting
□ Keep shared dependencies stable
□ Use package exports for controlled package surfaces
□ Define dependency direction
□ Detect cycles in CI
□ Document package ownership
□ Test modules independently
□ Keep side effects explicit
□ Avoid unnecessary top-level side effects
□ Measure bundle and startup performance
□ Use incremental migration for legacy systems
```

---

# Assignment 1 — ESM Migration

Convert:

```js
const {
  Button
} = require("./components");

module.exports = {
  render
};
```

to ESM.

Requirements:

- named exports
- explicit public API
- no global state
- tests
- migration notes

---

# Assignment 2 — Code Splitting Plan

A React application contains:

```text
Dashboard
Admin
Reports
Editor
Analytics
Help
```

Design an initial bundle and lazy chunks.

Explain:

- why each boundary exists
- expected user behavior
- caching
- prefetching
- error recovery

---

# Assignment 3 — Circular Dependency Audit

Given:

```text
auth → user
user → permissions
permissions → auth
```

Refactor the dependency graph.

Target:

```text
auth ───────┐
user ───────┼──> domain rules
permissions ┘
```

---

# Assignment 4 — Barrel File Review

Review:

```js
export * from "./Button.js";
export * from "./Modal.js";
export * from "./InternalDebug.js";
export * from "./Experimental.js";
```

Identify:

- public API leakage
- tree-shaking concerns
- ownership problems
- stability risks

---

# Mini Project — Enterprise Module Architecture

Build:

```text
src/
├── app/
├── features/
│   ├── auth/
│   ├── dashboard/
│   └── reports/
├── domains/
│   ├── user/
│   └── permissions/
├── shared/
│   ├── ui/
│   └── utils/
└── infrastructure/
    ├── api/
    └── analytics/
```

Requirements:

- ESM
- feature boundaries
- public `index.js` APIs where appropriate
- no circular dependencies
- lazy reports feature
- unit tests
- bundle analysis
- documentation

---

# Revision Notes

```text
CommonJS
→ require + module.exports

ESM
→ import + export

Named export
→ explicit exported binding

Default export
→ one default export per module

Dynamic import
→ Promise-based asynchronous module loading

Tree shaking
→ removal of statically unused code

Circular dependency
→ dependency graph cycle

Barrel
→ central re-export module

Module scope
→ module-local variables

Lazy loading
→ load code when needed

Browser module
→ <script type="module">

Node ESM
→ modern Node module system

Package exports
→ controlled package entry points

Dependency graph
→ relationship between modules
```

---

# Cheat Sheet

| Topic | Key Point |
|---|---|
| CommonJS | `require`, `module.exports` |
| ESM | `import`, `export` |
| Named export | Explicit named binding |
| Default export | One default per module |
| Dynamic import | Returns Promise |
| Tree shaking | Removes statically unused exports |
| Circular dependency | Dependency graph cycle |
| Barrel | Re-export entry point |
| Module scope | No accidental globals |
| Lazy loading | Load feature on demand |
| Browser ESM | `type="module"` |
| Node ESM | Supported alongside CommonJS |
| Live binding | Import reflects exported binding |
| Side effect import | `import "./analytics.js"` |
| Namespace import | `import * as x` |
| Package exports | Controls package public surface |
| Code splitting | Creates separate chunks |
| Dependency graph | Build/runtime module relationships |

---

# Final Module Interview Checklist

Before an interview, be able to explain without notes:

```text
□ CommonJS vs ESM
□ import / export
□ default vs named export
□ dynamic import
□ tree shaking
□ circular dependencies
□ barrel files
□ module scope
□ browser modules
□ Node.js modules
□ module resolution
□ package exports
□ code splitting
□ lazy loading
□ live bindings
□ module evaluation
□ module architecture
□ dependency direction
□ enterprise migration
□ performance trade-offs
```

---

# Module 14 Complete

**Part 4 → Module 14: Modules**

**Questions:** 291–305

**Previous:** Module 13 — ES6+ Features

**Next:** Module 15 — Error Handling
