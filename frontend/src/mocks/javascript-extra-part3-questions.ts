// Hand-authored technical question bank for JavaScript Extra Part 3.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_EXTRA_PART3_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "jsx3-1",
      "questionNumber": "JSX3-001",
      "title": "let, const, and var Differences",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      "frequency": 5,
      "category": "ES6+ Features",
      "part": "JS Fundamentals",
      "concepts": ["Hoisting", "Temporal dead zone", "Block scope", "Function scope", "Closures", "Redeclaration"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What are the differences between let, const, and var?"
    },
    "answer": {
      "expectedAnswer": "var is function-scoped, hoisted and initialized to undefined, and can be redeclared, which lets it leak out of blocks like if and for. let and const are block-scoped and hoisted into a temporal dead zone (TDZ), so referencing them before their declaration line throws a ReferenceError rather than returning undefined. const additionally locks the binding itself against reassignment, though the object or array it points to remains mutable.",
      "deepExplanation": "The three keywords differ along scope, hoisting, and mutability. var attaches to the nearest enclosing function (or the global object), so a var declared inside a for-loop body is visible after the loop ends and is shared across all iterations — this is the classic reason `for (var i...) { setTimeout(() => console.log(i)) }` logs the final value three times instead of 0, 1, 2. let and const are scoped to the nearest {} block, and critically each iteration of a let-based for-loop creates a fresh binding, which is why the same setTimeout pattern with let logs 0, 1, 2 correctly. All declarations are hoisted to the top of their scope during compilation, but var is hoisted with an initial value of undefined while let/const are hoisted but left uninitialized until the declaration statement actually runs — the gap between scope start and initialization is the temporal dead zone, and accessing the identifier during that gap throws. const forbids reassigning the binding (`x = ...` fails) but does not freeze the referenced value, so `const obj = {}; obj.a = 1;` is perfectly legal. Redeclaring a var in the same scope is a silent no-op overwrite, whereas redeclaring let/const in the same block is a SyntaxError caught at parse time.",
      "productionExample": "Modern codebases lint with eslint's no-var and prefer-const rules, so const is the default for imports, config objects, and React refs/state setters, with let reserved for loop counters and values that must be reassigned. var mostly survives only in legacy bundles, generated code, or old third-party scripts that predate ES2015 tooling.",
      "bestPractices": [
        "Default to const for every binding unless reassignment is required",
        "Use let only for counters, accumulators, and values reassigned in a loop",
        "Avoid var entirely in new code",
        "Enable eslint's no-var and prefer-const rules in CI",
        "Treat const as 'binding cannot be reassigned', never as 'value is frozen'",
        "Use Object.freeze (or a library like Immer) when true immutability of a const's contents is required",
        "Declare variables as close as possible to first use to avoid TDZ confusion"
      ],
      "tradeOffs": "Advantages: let/const enforce block scoping that matches lexical reading order; const communicates intent and prevents accidental reassignment bugs; the TDZ surfaces use-before-declaration mistakes immediately instead of silently returning undefined. Disadvantages: understanding legacy var-based code still requires knowing function-scope leakage rules; the TDZ can confuse newcomers debugging a ReferenceError that looks like a missing variable; const gives a false sense of full immutability to those unfamiliar with binding vs. value semantics.",
      "commonMistakes": [
        "Believing const makes an object or array immutable",
        "Using var inside a loop that creates closures over the loop variable",
        "Interview trap: assuming let is hoisted the same way as var (initialized to undefined) rather than left in the TDZ",
        "Redeclaring let/const in the same block and expecting it to silently succeed like var",
        "Not realizing every let-scoped for-loop iteration gets its own binding",
        "Interview trap: confusing block scope with function scope when reasoning about var declared inside an if-block"
      ],
      "followUpQuestions": [
        "What is the temporal dead zone and why does the spec define it that way?",
        "Why does a let-based for-loop behave differently than var with async callbacks?",
        "Does const make an object immutable? How would you achieve real immutability?",
        "How does hoisting differ between function declarations and let/const?",
        "How would you polyfill block scoping in an ES5-only environment?"
      ],
      "relatedTopics": ["Hoisting", "Temporal dead zone", "Block scope", "Closures", "Object.freeze", "Lexical scoping"]
    }
  },
  {
    "detail": {
      "id": "jsx3-2",
      "questionNumber": "JSX3-002",
      "title": "Destructuring Assignment and Its Benefits",
      "difficulty": "Easy",
      "companies": ["Meta", "Amazon", "Netflix", "Adobe", "Uber"],
      "frequency": 5,
      "category": "ES6+ Features",
      "part": "JS Fundamentals",
      "concepts": ["Array destructuring", "Object destructuring", "Default values", "Rest pattern", "Nested destructuring"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How does destructuring work in JavaScript, and what are its benefits?"
    },
    "answer": {
      "expectedAnswer": "Destructuring lets you unpack values from arrays or properties from objects into individual variables using a pattern that mirrors the source's shape, e.g. `const [a, b] = arr` or `const { x, y } = obj`. It reduces boilerplate compared to accessing each value individually, supports default values, renaming, nested patterns, and rest collection, and is heavily used for function parameters, module imports, and React hook returns like `const [state, setState] = useState()`.",
      "deepExplanation": "Array destructuring matches by position, so `const [first, , third] = arr` can skip elements with empty commas, and works on any iterable, not just arrays — it consumes the iterator protocol, so it also works on Strings, Maps, and Sets. Object destructuring matches by property key, so order doesn't matter: `const { b, a } = { a: 1, b: 2 }` works fine. Both forms support default values (`const { x = 10 } = obj`) which apply only when the extracted value is exactly undefined, not for null or falsy values. Renaming is done with a colon in object patterns: `const { data: userData } = response`. Patterns can nest arbitrarily, e.g. `const { user: { profile: { name } } } = state`, though deeply nested destructuring can hurt readability and should be flattened upstream when it gets excessive. The rest pattern collects remaining elements/properties: `const [head, ...tail] = arr` or `const { id, ...rest } = obj`, and combined with spread this enables immutable update patterns common in reducers. Destructuring is also legal in function parameter lists, letting a function declare `function fn({ id, name }) {}` instead of accessing `props.id` and `props.name` inside the body.",
      "productionExample": "Destructuring is idiomatic in React for props (`function Card({ title, onClick })`), for hook returns (`const [count, setCount] = useState(0)`), and for pulling specific fields out of API responses or Redux state without creating intermediate variables, which keeps component code terse and self-documenting.",
      "bestPractices": [
        "Destructure function parameters to make required fields self-documenting",
        "Provide default values for optional destructured fields instead of using || afterward",
        "Avoid destructuring more than 2-3 levels deep — extract intermediate variables instead",
        "Use rest patterns to omit specific keys immutably (`const { password, ...safeUser } = user`)",
        "Rename destructured variables when the source key would shadow an existing identifier",
        "Prefer destructuring imports (`import { useState } from 'react'`) over namespace imports when only a few exports are needed"
      ],
      "tradeOffs": "Advantages: less repetitive access code; self-documenting function signatures; built-in support for defaults, renaming and rest collection; works uniformly across arrays, objects and any iterable. Disadvantages: deeply nested patterns reduce readability and hide which fields are actually required; destructuring an undefined/null value throws a TypeError, requiring guard clauses or default objects; renamed variables can obscure the original source property name during debugging.",
      "commonMistakes": [
        "Destructuring a potentially null/undefined object without a guard or default (`const { x } = maybeNull` throws)",
        "Assuming default values apply to null — they only apply to undefined",
        "Interview trap: assuming destructuring order matters for objects the way it does for arrays",
        "Over-nesting destructuring patterns until they're harder to read than dot-access",
        "Forgetting that array destructuring relies on the iterator protocol, so it won't work on plain objects without Symbol.iterator",
        "Shadowing outer-scope variable names when destructuring without renaming"
      ],
      "followUpQuestions": [
        "How do default values interact with destructuring — when exactly do they apply?",
        "How would you safely destructure a value that might be null or undefined?",
        "What's the difference between destructuring with rename versus without?",
        "How does destructuring interact with the iterator protocol for arrays?",
        "How would you use destructuring to implement an immutable Redux reducer update?"
      ],
      "relatedTopics": ["Spread operator", "Rest parameters", "Iterator protocol", "Default parameters", "Immutable updates"]
    }
  },
  {
    "detail": {
      "id": "jsx3-3",
      "questionNumber": "JSX3-003",
      "title": "Template Literals vs String Concatenation",
      "difficulty": "Easy",
      "companies": ["Google", "Amazon", "Microsoft", "Flipkart", "Zoho"],
      "frequency": 4,
      "category": "ES6+ Features",
      "part": "JS Fundamentals",
      "concepts": ["Template literals", "Interpolation", "Multi-line strings", "Tagged templates", "String concatenation"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Can you explain template literals and how they differ from traditional string concatenation?"
    },
    "answer": {
      "expectedAnswer": "Template literals are strings delimited by backticks that support embedded expression interpolation with `${...}`, native multi-line text without escape characters, and tagged templates for custom string processing. Unlike `'a' + b + 'c'` concatenation, interpolation is evaluated in place, is easier to read for complex strings, and any expression (including function calls) can be embedded directly inside the placeholder.",
      "deepExplanation": "With traditional concatenation, building a string with multiple variables means chaining the + operator, manually inserting spaces and punctuation, and remembering to convert non-string values — a missing `+` or a misplaced quote is a common source of bugs. Template literals replace this with `${expression}` placeholders that are evaluated and coerced to strings automatically, so `` `Hello, ${user.name}! You have ${count} items` `` reads like the final output. They also preserve literal newlines, so multi-line strings no longer need `\\n` plus concatenation or array-join tricks. Tagged templates are a more advanced feature: prefixing a template literal with a function name (e.g. `` html`<div>${value}</div>` ``) calls that function with the literal string segments as an array and the interpolated values as separate arguments, enabling use cases like automatic HTML-escaping, CSS-in-JS (styled-components), SQL query building, or internationalization libraries. Under the hood a tagged template receives `(strings, ...values)` where `strings` has a `.raw` property giving access to the unescaped source text, which is how libraries implement custom escaping without double-processing. Performance-wise, both approaches compile to comparable bytecode in modern engines, so the choice is about readability and safety, not speed.",
      "productionExample": "Styled-components and other CSS-in-JS libraries use tagged templates to parse CSS written inline in components; GraphQL client libraries like Apollo use them to parse gql`` query strings; and template literals in general replace nearly all everyday string building in modern codebases, from log messages to dynamically constructed URLs.",
      "bestPractices": [
        "Use template literals for any string with more than one interpolated value",
        "Prefer template literals over \\n-based multi-line concatenation",
        "Use tagged templates for domain-specific escaping needs (HTML, SQL, CSS) rather than manual string building",
        "Avoid embedding complex logic inside ${} — extract to a named variable or function first",
        "Be mindful that objects interpolated directly will call toString()/valueOf(), which may not produce the intended output",
        "Use nested template literals sparingly; prefer composing smaller literals"
      ],
      "tradeOffs": "Advantages: readable interpolation, native multi-line support, tagged templates enable powerful DSLs, less error-prone than manual concatenation. Disadvantages: overusing complex expressions inside ${} hurts readability; tagged template internals (raw strings, cooked strings) have a learning curve; backtick-heavy code can be harder to lint/format consistently than plain string operators for very simple cases.",
      "commonMistakes": [
        "Interpolating an object directly and getting '[object Object]' instead of expected JSON",
        "Writing deeply nested template literals that become hard to parse visually",
        "Interview trap: forgetting tagged template functions receive the literal parts and values as separate arguments, not a single formatted string",
        "Using template literals for values that must be HTML-escaped without a proper tag function, risking XSS",
        "Not realizing .raw differs from the cooked string when escape sequences are present",
        "Mixing string concatenation and template literals inconsistently in the same codebase"
      ],
      "followUpQuestions": [
        "How would you implement a tagged template function for HTML escaping?",
        "What is the difference between the raw and cooked strings in a tagged template?",
        "How do styled-components use tagged templates internally?",
        "Are there performance differences between concatenation and template literals?",
        "How would you safely interpolate user input into a template literal used for HTML?"
      ],
      "relatedTopics": ["Tagged templates", "String.raw", "XSS prevention", "CSS-in-JS", "GraphQL gql tag"]
    }
  },
  {
    "detail": {
      "id": "jsx3-4",
      "questionNumber": "JSX3-004",
      "title": "Arrow Functions vs Regular Functions",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Stripe", "Uber"],
      "frequency": 5,
      "category": "ES6+ Features",
      "part": "JS Fundamentals",
      "concepts": ["this binding", "Lexical scope", "arguments object", "Constructors", "Implicit return", "Prototype"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What are arrow functions, and how do they differ from regular functions?"
    },
    "answer": {
      "expectedAnswer": "Arrow functions are a concise function syntax introduced in ES6 that do not have their own `this`, `arguments`, `super`, or `new.target` — they lexically inherit `this` from the enclosing scope at definition time. They also cannot be used as constructors (no `new`), have no `prototype` property, and support implicit single-expression returns without braces or a return keyword.",
      "deepExplanation": "A regular function's `this` is determined dynamically by how it's called — as a method (`obj.fn()` binds `this` to obj), as a plain call (`this` is undefined in strict mode or globalThis otherwise), or via `.call/.apply/.bind`. Arrow functions ignore all of that and instead capture `this` from the lexical scope in which they were written, which is precisely why they solved the classic 'this inside a callback' problem — `setTimeout(() => this.doThing(), 100)` inside a class method correctly refers to the class instance without needing `.bind(this)` or a `const self = this` workaround. Arrow functions also don't have their own `arguments` object; referencing `arguments` inside one resolves to the nearest enclosing regular function's arguments, so utilities relying on `arguments` must use a regular function or rest parameters (`...args`) instead. Because they have no internal [[Construct]] method, calling `new ArrowFn()` throws a TypeError, and since they have no prototype property, they can't be used to define classical prototype-based constructors. Arrow functions support a concise body — `const add = (a, b) => a + b` implicitly returns the expression's value — versus a block body `(a, b) => { return a + b; }` which requires an explicit return. They also cannot be used as generator functions (no `function*` arrow form) and don't get their own `super` binding, so inside a class field arrow method, `super` resolves lexically too.",
      "productionExample": "Arrow functions are the default choice for React event handlers and callbacks (`onClick={() => setOpen(true)}`) and class-field methods (`handleClick = () => { this.setState(...) }`) precisely because they avoid manual `.bind(this)` calls in constructors, which was a very common source of 'this is undefined' bugs in pre-hooks React class components.",
      "bestPractices": [
        "Use arrow functions for callbacks and inline handlers where lexical this is desired",
        "Use regular function declarations/methods for object methods that need dynamic this (e.g. event listeners bound via addEventListener where this should be the element)",
        "Never use arrow functions as object prototype methods that rely on this referring to the instance at call time",
        "Use rest parameters (...args) instead of arguments inside arrow functions",
        "Avoid arrow functions for constructors or anything invoked with new",
        "Use named regular functions for recursive functions when you need arguments.callee-free self-reference clarity",
        "Be consistent within a codebase/style guide about when to use each form"
      ],
      "tradeOffs": "Advantages: lexical this removes the need for bind/self workarounds; concise syntax reduces boilerplate for simple callbacks; predictable behavior since this can't be reassigned via call/apply/bind. Disadvantages: cannot be used as constructors or generators; no own arguments object surprises developers porting old code; lexical this makes them unsuitable for object methods or prototype methods that need dynamic binding; overuse of implicit returns can obscure control flow in code review.",
      "commonMistakes": [
        "Using an arrow function as an object method and expecting this to refer to the object",
        "Interview trap: defining a class prototype method as an arrow function property, breaking expected dynamic this semantics for inheritance",
        "Trying to call .bind(), .call(), or .apply() on an arrow function expecting it to change this — it silently has no effect on this",
        "Using arguments inside an arrow function expecting it to reflect the arrow's own arguments",
        "Attempting new ArrowFn() and being surprised by the TypeError",
        "Confusing implicit return of an object literal — (() => { a: 1 }) is parsed as a block, not an object; needs parentheses: (() => ({ a: 1 }))"
      ],
      "followUpQuestions": [
        "Why can't arrow functions be used as constructors?",
        "How does this resolve inside a nested arrow function within a regular method?",
        "What happens if you call .bind(newThis) on an arrow function?",
        "Why do you need parentheses to implicitly return an object literal from an arrow function?",
        "How would you convert a class component's bound methods to arrow function class fields?"
      ],
      "relatedTopics": ["this binding", "Lexical scoping", "Function.prototype.bind", "Class fields", "Closures"]
    }
  },
  {
    "detail": {
      "id": "jsx3-5",
      "questionNumber": "JSX3-005",
      "title": "JavaScript Modules: import and export",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Adobe", "Atlassian"],
      "frequency": 4,
      "category": "ES6+ Features",
      "part": "JS Fundamentals",
      "concepts": ["ES modules", "CommonJS", "Named exports", "Default exports", "Tree shaking", "Module scope"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do JavaScript modules work, and what are the benefits of using import and export?"
    },
    "answer": {
      "expectedAnswer": "ES modules let a file expose bindings via `export` (named or default) and consume them elsewhere via `import`, with each module having its own top-level scope so nothing leaks into the global namespace by default. Compared to global scripts or older systems like CommonJS, ES modules are statically analyzable, enabling bundlers to tree-shake unused exports, are asynchronously loadable in browsers via `<script type=\"module\">`, and live-bind exports so consumers always see the current value, not a copy.",
      "deepExplanation": "A named export (`export const add = ...` or `export { add }`) can be imported by name (`import { add } from './math'`), while a default export (`export default fn`) is imported without braces and can be renamed freely on import (`import myFn from './math'`). Because import/export declarations must appear at the top level and use static string literals for module specifiers (dynamic import() is the escape hatch), tools can build a static dependency graph at build time without executing code — this is what enables tree-shaking, where a bundler like Webpack or Rollup strips exports that are never imported anywhere in the graph. ES module bindings are live references, not copied values: if module A exports a mutable `let count` and increments it, a module B that imported `count` sees the updated value on next access, unlike CommonJS's `module.exports` which copies the value at require-time (for primitives). Module execution is also different: ES modules are evaluated once and cached by URL/path, executed in strict mode automatically, and circular imports are handled by exposing the live-binding mechanism rather than immediately-resolved snapshots, which reduces (but doesn't eliminate) certain circular-dependency bugs common in CommonJS. In Node.js, ES modules are opted into via `.mjs` extension or `\"type\": \"module\"` in package.json, and interop with CommonJS require() has specific rules (default export maps to module.exports, but named exports from CJS require static analysis or explicit __esModule markers).",
      "productionExample": "Production frontend bundlers (Webpack, Vite, esbuild, Rollup) rely on ES module static structure to tree-shake unused code (e.g. importing one function from lodash-es instead of the whole library) and to code-split via dynamic import() for route-based lazy loading in React apps.",
      "bestPractices": [
        "Prefer named exports for utility modules so tree-shaking can eliminate unused functions",
        "Reserve default exports for a module's single primary export (e.g. a React component)",
        "Avoid mixing many default exports across a large module graph — named exports are easier to refactor and rename safely with tooling",
        "Use dynamic import() for code-splitting large or rarely-used modules",
        "Keep module side effects (code that runs on import) minimal and explicit",
        "Avoid circular imports where possible; if unavoidable, keep them to type-only or lazily-accessed values"
      ],
      "tradeOffs": "Advantages: static structure enables tree-shaking and dead code elimination; live bindings keep cross-module state consistent; native browser and Node support removes the need for a module loader library; each module has isolated scope by default. Disadvantages: CommonJS interop can be error-prone (default vs named export mismatches); circular dependencies can still produce undefined values if accessed during initial evaluation; dynamic import() breaks fully static analysis for that boundary; migrating a large legacy CommonJS codebase to ESM is nontrivial.",
      "commonMistakes": [
        "Assuming CommonJS require() and ESM import are drop-in interchangeable",
        "Interview trap: assuming a named import gets a copied snapshot rather than a live binding",
        "Forgetting default exports need `export default`, not `export default { ... } as default`",
        "Creating circular import cycles and being surprised by an import evaluating to undefined",
        "Not realizing module-level code runs exactly once, even if imported from multiple files",
        "Overusing default exports on files with multiple meaningful exports, hurting refactor tooling"
      ],
      "followUpQuestions": [
        "What's the difference between a named export and a default export in terms of tooling support?",
        "How does tree-shaking rely on the static structure of ES modules?",
        "How do live bindings work, and how do they differ from CommonJS's copied exports?",
        "How does Node.js decide whether a file is CommonJS or an ES module?",
        "How would you handle a circular dependency between two ES modules?"
      ],
      "relatedTopics": ["CommonJS", "Tree shaking", "Dynamic import()", "Module bundlers", "Live bindings", "Code splitting"]
    }
  },
  {
    "detail": {
      "id": "jsx3-6",
      "questionNumber": "JSX3-006",
      "title": "Writing Unit Tests with Jest or Mocha",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Stripe", "Flipkart"],
      "frequency": 5,
      "category": "JavaScript Testing",
      "part": "Testing",
      "concepts": ["Jest", "Mocha", "Assertions", "Test runners", "describe/it blocks", "Chai"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How do you write unit tests using Jest or Mocha in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "A unit test isolates a single function or module and asserts its output for given inputs, typically structured with describe() to group related tests and it()/test() for individual cases, followed by an expect() assertion. Jest bundles a test runner, assertion library, and mocking utilities in one package, while Mocha is just a test runner that's paired with a separate assertion library like Chai and a mocking library like Sinon.",
      "deepExplanation": "In Jest, a typical unit test looks like `describe('sum', () => { it('adds two numbers', () => { expect(sum(2, 3)).toBe(5); }); });` — Jest auto-discovers `*.test.js` files, runs them in parallel worker processes, and provides matchers like toBe, toEqual, toThrow, and toHaveBeenCalledWith out of the box, plus built-in mocking via jest.fn() and jest.mock(). Mocha provides only the describe/it structure and test runner; assertions must come from an external library — Chai's expect/should/assert styles are the most common pairing — and mocking typically comes from Sinon.js for spies, stubs, and fakes. Both support lifecycle hooks (beforeEach, afterEach, beforeAll/before, afterAll/after) to set up and tear down shared fixtures, and both support async tests by returning a Promise or accepting a done callback. A good unit test follows the Arrange-Act-Assert pattern: set up inputs and mocks, call the function under test, then assert on the output or side effects, keeping each test focused on one behavior so failures are easy to diagnose. Code coverage tooling (Istanbul/nyc for Mocha, Jest's built-in --coverage) measures which lines/branches were executed by the test suite, which is a useful signal but not a sufficient one — 100% coverage doesn't guarantee correctness, only that lines executed.",
      "productionExample": "Most modern React/Node projects default to Jest (or Vitest, its API-compatible successor) because it needs zero extra configuration for mocking and assertions; Mocha+Chai+Sinon remains common in older Node backend codebases and libraries that want finer control over which assertion/mocking libraries to swap in.",
      "bestPractices": [
        "Follow Arrange-Act-Assert structure in every test",
        "Test one logical behavior per it()/test() block",
        "Use descriptive test names that state the expected behavior, not the implementation",
        "Reset mocks and shared state in beforeEach to avoid test interdependence",
        "Prefer testing observable behavior/output over internal implementation details",
        "Keep unit tests fast and isolated — mock out network, filesystem, and timers",
        "Use snapshot tests sparingly and review diffs carefully rather than blindly updating snapshots"
      ],
      "tradeOffs": "Advantages: Jest offers an all-in-one zero-config setup with fast parallel execution and built-in mocking; Mocha offers flexibility to mix and match assertion/mocking libraries and finer control over the test runner. Disadvantages: Jest's opinionated defaults (jsdom environment, module mocking magic) can be harder to customize for non-standard setups; Mocha requires assembling and configuring multiple libraries, increasing initial setup cost and config drift across projects.",
      "commonMistakes": [
        "Writing tests that assert on implementation details instead of observable output",
        "Not resetting mocks between tests, causing order-dependent test failures",
        "Interview trap: forgetting to return or await a Promise in an async test, causing Jest to report a false pass before the assertion runs",
        "Testing too much in one it() block, making failures hard to diagnose",
        "Relying entirely on snapshot tests without understanding what changed",
        "Chasing 100% coverage as a proxy for correctness"
      ],
      "followUpQuestions": [
        "How do you test asynchronous code correctly in Jest or Mocha?",
        "What's the difference between a mock, a stub, and a spy?",
        "How would you structure tests to avoid shared mutable state between test cases?",
        "What does code coverage actually measure, and what are its limits?",
        "How would you decide between Jest and Mocha for a new project?"
      ],
      "relatedTopics": ["Test-Driven Development", "Mocking and stubbing", "Code coverage", "Assertion libraries", "Sinon.js", "Chai"]
    }
  },
  {
    "detail": {
      "id": "jsx3-7",
      "questionNumber": "JSX3-007",
      "title": "Unit Testing vs Integration Testing",
      "difficulty": "Medium",
      "companies": ["Meta", "Amazon", "Netflix", "Atlassian", "Uber"],
      "frequency": 4,
      "category": "JavaScript Testing",
      "part": "Testing",
      "concepts": ["Unit tests", "Integration tests", "Test pyramid", "Mocking", "End-to-end tests"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is the difference between unit testing and integration testing?"
    },
    "answer": {
      "expectedAnswer": "Unit tests exercise a single function, class, or component in isolation, mocking out its dependencies, so failures point precisely at the broken unit. Integration tests exercise multiple units working together (e.g. a component plus its API calls, or a service plus its database), verifying that the pieces correctly interact, at the cost of being slower, more complex to set up, and having failures that require more investigation to localize.",
      "deepExplanation": "The distinction is about scope and what's mocked. A unit test for a checkout function would mock the payment gateway, database, and any other collaborators, asserting only that the function under test computes the right total given specific inputs. An integration test for the same feature might spin up an in-memory or test database, call the real service layer, and verify that data actually persists and that the pieces are wired correctly — catching bugs like mismatched API contracts, incorrect SQL, or misconfigured dependency injection that unit tests with mocks would never surface, because the mocks assume the contract is right. The 'test pyramid' heuristic recommends many fast, cheap unit tests at the base, fewer integration tests in the middle, and very few slow, brittle end-to-end tests at the top, because integration and E2E tests are more expensive to run and maintain but catch classes of bugs unit tests structurally cannot. In frontend testing specifically, tools like React Testing Library blur this line somewhat — a 'unit' test of a component that renders child components and simulates user interaction is arguably a small integration test, since it doesn't mock React's rendering or DOM behavior, which is intentional because it tests behavior closer to what a real user experiences.",
      "productionExample": "A typical CI pipeline runs thousands of unit tests on every commit in seconds, a smaller integration test suite against a test database/service mesh on each PR, and a handful of end-to-end tests (Cypress/Playwright) against a staging environment before a production deploy, balancing speed of feedback against confidence in the full system.",
      "bestPractices": [
        "Follow the test pyramid: most tests unit-level, fewer integration, fewest E2E",
        "Mock only true external boundaries (network, filesystem, time) in unit tests, not the code under test itself",
        "Use a real (or realistic in-memory) database in integration tests rather than mocking the ORM",
        "Keep integration tests focused on contracts between modules, not every edge case (leave that to unit tests)",
        "Run fast unit tests on every save/commit and slower integration/E2E tests in CI",
        "Isolate integration test data so tests can run in parallel without interfering"
      ],
      "tradeOffs": "Advantages of unit tests: fast, isolated, pinpoint failures precisely, cheap to write and maintain. Disadvantages of unit tests: mocks can hide real integration bugs and contract mismatches. Advantages of integration tests: catch wiring/contract issues unit tests miss, higher confidence the system works end-to-end. Disadvantages of integration tests: slower, more brittle to unrelated changes, harder to debug failures, more complex environment setup.",
      "commonMistakes": [
        "Mocking so much in a 'unit' test that it no longer tests meaningful behavior",
        "Treating integration tests as a substitute for unit tests instead of a complement",
        "Interview trap: assuming more integration tests always means more confidence — over-reliance on them slows CI and increases flakiness",
        "Not isolating integration test data, causing flaky tests when run in parallel",
        "Testing the same behavior redundantly at both the unit and integration level without added value",
        "Skipping integration tests entirely and only relying on unit tests with heavy mocking"
      ],
      "followUpQuestions": [
        "What does the test pyramid recommend and why?",
        "How would you decide what to mock in an integration test versus a unit test?",
        "How do you keep integration tests from becoming flaky?",
        "Where does component testing with React Testing Library fit on this spectrum?",
        "How would you structure CI to balance fast feedback with confidence?"
      ],
      "relatedTopics": ["Test pyramid", "End-to-end testing", "Mocking and stubbing", "React Testing Library", "CI/CD pipelines"]
    }
  },
  {
    "detail": {
      "id": "jsx3-8",
      "questionNumber": "JSX3-008",
      "title": "Test-Driven Development (TDD)",
      "difficulty": "Medium",
      "companies": ["Google", "Amazon", "Microsoft", "Adobe", "Zoho"],
      "frequency": 3,
      "category": "JavaScript Testing",
      "part": "Testing",
      "concepts": ["Red-Green-Refactor", "TDD", "Regression safety", "Design feedback"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does Test-Driven Development (TDD) work, and what are its advantages?"
    },
    "answer": {
      "expectedAnswer": "TDD is a development cycle where you write a failing test for the next small piece of behavior first (Red), write the minimum code to make it pass (Green), then improve the implementation while keeping tests passing (Refactor), repeating in short loops. Its advantages are a comprehensive regression suite built as a byproduct of development, tighter feedback on API design since you write the test as the first consumer of your code, and confidence to refactor freely.",
      "deepExplanation": "The Red-Green-Refactor loop starts by writing a test that describes a small unit of desired behavior and running it to confirm it fails for the right reason (e.g. function doesn't exist yet, or produces the wrong output) — this validates the test itself isn't a false positive. Then you write the simplest implementation that makes the test pass, resisting the urge to build more than what's needed. Finally you refactor the implementation (and sometimes the test) for clarity or performance, relying on the now-passing test as a safety net that catches regressions during the refactor. Because you write the test before the implementation, you're forced to think about the function's public API, inputs, and expected outputs from the caller's perspective first, which tends to produce more testable, decoupled designs — code that's hard to test in isolation is often a smell for tight coupling or hidden dependencies. Critics note that strict TDD can slow down initial exploratory development where the design isn't yet known, and that writing tests first doesn't guarantee good test quality — it's possible to TDD your way to tests that are brittle or that overspecify implementation details. In practice many teams use a pragmatic hybrid: TDD for well-understood business logic and bug fixes (write a failing test that reproduces the bug first), and a test-after approach for exploratory UI work where the shape of the solution is still being discovered.",
      "productionExample": "TDD is commonly applied to bug fixes across production codebases: reproduce the reported bug as a failing test first, then fix the code until it passes, which both confirms the root cause and prevents regression — a very common practice at companies with strict code review standards for backend services and payment/financial logic.",
      "bestPractices": [
        "Write the smallest possible failing test before any implementation code",
        "Confirm the test fails for the expected reason before making it pass",
        "Write only enough code to make the current test pass, resisting speculative generality",
        "Refactor with the safety net of green tests, running them after every small change",
        "Use TDD strategically for logic-heavy code and bug reproduction, not necessarily every UI tweak",
        "Keep each Red-Green-Refactor cycle short (minutes, not hours)"
      ],
      "tradeOffs": "Advantages: builds a regression suite as a natural byproduct; encourages decoupled, testable design; gives confidence to refactor; catches bugs early via reproduction-first fixes. Disadvantages: can slow down early exploratory work where requirements/design are still fluid; writing tests first doesn't guarantee well-designed or non-brittle tests; strict TDD discipline requires team buy-in and can be abandoned under deadline pressure, leaving an inconsistent suite.",
      "commonMistakes": [
        "Writing an overly broad test that isn't really testing one small unit of behavior",
        "Skipping the 'confirm it fails first' step and writing implementation and test together",
        "Interview trap: believing TDD guarantees good architecture — it guarantees testable code, which is necessary but not sufficient for good design",
        "Over-engineering the implementation beyond what the current test requires",
        "Writing tests so tightly coupled to implementation details that refactoring breaks them unnecessarily",
        "Applying strict TDD dogmatically to exploratory prototyping where requirements are still unknown"
      ],
      "followUpQuestions": [
        "Walk me through a Red-Green-Refactor cycle for a specific example.",
        "How does TDD influence API design decisions?",
        "When would you not use strict TDD?",
        "How do you avoid writing brittle, implementation-coupled tests under TDD?",
        "How would you use TDD to fix a reported production bug?"
      ],
      "relatedTopics": ["Regression testing", "Refactoring", "Behavior-Driven Development", "Test pyramid", "Continuous integration"]
    }
  },
  {
    "detail": {
      "id": "jsx3-9",
      "questionNumber": "JSX3-009",
      "title": "Mocking and Stubbing in Testing",
      "difficulty": "Medium",
      "companies": ["Meta", "Amazon", "Netflix", "Stripe", "Flipkart"],
      "frequency": 4,
      "category": "JavaScript Testing",
      "part": "Testing",
      "concepts": ["Mocks", "Stubs", "Spies", "Fakes", "Test doubles", "jest.fn()"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are mocking and stubbing in the context of testing?"
    },
    "answer": {
      "expectedAnswer": "Both are 'test doubles' that replace a real dependency during a test. A stub returns predetermined, canned responses to isolate the code under test from a real dependency's behavior (e.g. a stubbed API client always returns fixed data), while a mock additionally records how it was called and lets the test assert on that interaction (e.g. 'was this function called exactly once, with these arguments'). Spies wrap a real implementation while still recording calls, letting the real behavior run alongside call tracking.",
      "deepExplanation": "The test-double taxonomy (from Martin Fowler / Gerard Meszaros) distinguishes several kinds: a dummy is passed around but never actually used; a stub provides canned answers to calls made during the test, with no assertions on how it was called; a spy records information about calls (arguments, call count) while optionally still delegating to the real implementation; a mock is pre-programmed with expectations about which calls it should receive and fails the test if those expectations aren't met; a fake has a working but simplified implementation unsuitable for production (e.g. an in-memory database standing in for a real one). In Jest, jest.fn() creates a mock function that can be configured with mockReturnValue/mockResolvedValue (acting as a stub) and also tracks calls via mock.calls so you can assert toHaveBeenCalledWith (acting as a mock/spy). jest.spyOn(object, 'method') wraps an existing method, by default still calling through to the real implementation unless you also call .mockImplementation() to replace it. The key testing principle is to mock at the boundary of the system under test — network calls, timers, randomness, the filesystem — not the internal logic you're actually trying to verify, since over-mocking internal collaborators makes tests assert on implementation structure rather than behavior, causing them to break on harmless refactors.",
      "productionExample": "A component that calls a payment API is tested by mocking the API client so the test can force success, failure, and timeout branches deterministically without hitting a real network or payment sandbox, which would be slow, flaky, and could have side effects like actually charging a test card.",
      "bestPractices": [
        "Mock external boundaries (network, time, randomness, filesystem), not internal business logic",
        "Reset/restore mocks between tests (jest.restoreAllMocks or clearMocks config) to avoid test pollution",
        "Prefer jest.spyOn over manual reassignment when you need to both track and optionally override behavior",
        "Assert on behavior/output first; use call-count/argument assertions only when the interaction itself is the thing being tested",
        "Use fakes (like an in-memory store) over heavy mocking when the collaborator's behavior is simple enough to reimplement",
        "Avoid mocking so deeply that tests no longer catch real integration bugs"
      ],
      "tradeOffs": "Advantages: isolates the unit under test from slow, flaky, or side-effecting dependencies; makes edge cases (errors, timeouts) trivially reproducible; speeds up test suites significantly. Disadvantages: over-mocking can hide real bugs in how modules actually integrate; mocks can drift out of sync with the real dependency's contract, giving false confidence; tests that assert heavily on mock call arguments become brittle and break on harmless refactors.",
      "commonMistakes": [
        "Confusing a stub (canned response, no call assertions) with a mock (call assertions matter)",
        "Interview trap: mocking the function under test itself instead of its dependencies",
        "Not resetting mock state between tests, causing call counts to leak across test cases",
        "Over-asserting on exact call arguments/order when only the end result matters",
        "Letting mocked contracts drift from the real dependency's actual behavior over time",
        "Using jest.spyOn without restoring it, silently affecting later tests in the same file"
      ],
      "followUpQuestions": [
        "What's the difference between a stub, a mock, a spy, and a fake?",
        "When would over-mocking hurt your test suite's value?",
        "How do you keep a mocked API contract in sync with the real API?",
        "How would you test error-handling branches using mocks?",
        "How does jest.spyOn differ from jest.fn()?"
      ],
      "relatedTopics": ["Test doubles", "jest.fn()", "Dependency injection", "Contract testing", "Test isolation"]
    }
  },
  {
    "detail": {
      "id": "jsx3-10",
      "questionNumber": "JSX3-010",
      "title": "Testing Asynchronous JavaScript Code",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Netflix", "Uber"],
      "frequency": 4,
      "category": "JavaScript Testing",
      "part": "Testing",
      "concepts": ["async/await in tests", "Promises", "fake timers", "waitFor", "done callback"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you test asynchronous code in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "You either return the Promise from the test (or use async/await inside the test function) so the runner waits for it to settle before evaluating assertions, or use a done callback for callback-style APIs, calling done() when the async work completes. For code that depends on timers, mocking libraries provide fake timers (jest.useFakeTimers()) to advance time synchronously instead of actually waiting, and for UI updates, utilities like waitFor/findBy from React Testing Library poll until an assertion passes or times out.",
      "deepExplanation": "If a test function returns a Promise (or is declared async and awaits inside), Jest/Mocha hold off marking the test complete until that promise settles, so an assertion inside a .then() or after an await is properly caught if it throws — the most common bug is forgetting to return/await, which lets the test function return synchronously before the assertion has even run, producing a false-positive pass. For older callback-based APIs, the test function accepts a done parameter; the test doesn't complete until done() is called, and calling done(error) or throwing inside the callback fails the test — but forgetting to call done() at all causes the test to time out rather than fail fast, which is a classic minor debugging headache. When code depends on setTimeout/setInterval/Date, real timers make tests slow and occasionally flaky; jest.useFakeTimers() replaces the timer implementation so jest.advanceTimersByTime(ms) or jest.runAllTimers() can deterministically fast-forward virtual time within the same tick. Testing React components with async state updates (e.g. after a fetch resolves) requires waiting for the DOM to reflect the update — React Testing Library's waitFor(callback) polls the callback until it doesn't throw or a timeout is hit, and findBy* queries are async equivalents of getBy* that internally use waitFor. For rejected promises, expect(promise).rejects.toThrow() (with await) is the idiomatic Jest assertion, rather than wrapping in try/catch manually for every case.",
      "productionExample": "Testing a React component that fetches data on mount typically mocks the fetch/axios call to resolve with fixture data, renders the component, and uses `await screen.findByText(...)` to wait for the loading state to resolve into the final rendered content, verifying both the loading and success UI paths deterministically without real network calls.",
      "bestPractices": [
        "Always return or await the Promise in async test bodies",
        "Prefer async/await syntax over the done callback for Promise-based code",
        "Use fake timers for code depending on setTimeout/setInterval to keep tests fast and deterministic",
        "Use findBy/waitFor (not getBy) when asserting on UI that updates asynchronously",
        "Test both the resolved and rejected paths of a promise-returning function",
        "Set explicit, generous timeouts for genuinely slow operations rather than silently flaky short ones"
      ],
      "tradeOffs": "Advantages: async/await test syntax is clean and mirrors the code under test; fake timers make time-dependent tests fast and deterministic; rejects/resolves matchers make error-path testing concise. Disadvantages: fake timers can diverge from real timer edge cases (e.g. interactions with process.nextTick or real I/O); over-reliance on waitFor with generous timeouts can hide genuinely broken async flows behind a slow-but-passing test; done-callback tests fail silently (timeout) rather than clearly when done() is never invoked.",
      "commonMistakes": [
        "Forgetting to return/await a promise, causing a false-positive passing test",
        "Interview trap: assertions thrown inside a .then() without returning the chain are silently swallowed and don't fail the test",
        "Using getBy* for content that appears after an async update instead of findBy*/waitFor",
        "Not calling done() (or calling it twice) in callback-based async tests",
        "Using real timers for code with long setTimeout delays, making the suite slow",
        "Not testing the rejected/error path of async functions"
      ],
      "followUpQuestions": [
        "What happens if you forget to return a Promise from a Jest test?",
        "How do fake timers work, and what are their limitations?",
        "What's the difference between getBy, queryBy, and findBy in React Testing Library?",
        "How would you test a function that debounces API calls?",
        "How do you assert that a promise rejects with a specific error?"
      ],
      "relatedTopics": ["Promises", "async/await", "Fake timers", "React Testing Library", "Event loop", "Microtasks"]
    }
  },
  {
    "detail": {
      "id": "jsx3-11",
      "questionNumber": "JSX3-011",
      "title": "Fetch API and Error Handling",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Flipkart"],
      "frequency": 5,
      "category": "Working with APIs",
      "part": "Browser/Web APIs",
      "concepts": ["Fetch API", "Response object", "HTTP status codes", "Error handling", "AbortController"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How does the Fetch API work, and how do you handle errors?"
    },
    "answer": {
      "expectedAnswer": "fetch(url) returns a Promise that resolves with a Response object once headers are received — critically, it only rejects on network-level failures (DNS failure, no connectivity, CORS block), not on HTTP error statuses like 404 or 500, so you must explicitly check response.ok (or response.status) and throw/handle accordingly. The body is read separately and asynchronously via methods like response.json() or response.text(), which also return Promises.",
      "deepExplanation": "fetch's Promise resolves as soon as the server responds with headers, regardless of status code, which is the single most common gotcha: `fetch(url).then(res => res.json())` will happily try to parse a 404 error page's HTML as JSON and throw a confusing SyntaxError instead of a meaningful 'not found' error. The correct pattern checks `if (!response.ok) { throw new Error(...) }` before parsing the body, where response.ok is a convenience boolean for status codes 200-299. Network failures (DNS resolution failure, connection refused, CORS preflight rejection) do reject the fetch promise itself, so a complete error-handling strategy needs both a .catch()/try-catch for network-level failures and an explicit status check for HTTP-level failures. Request cancellation is handled via AbortController: create a controller, pass controller.signal in the fetch options, and call controller.abort() to cancel the in-flight request, which causes the fetch promise to reject with an AbortError — essential for cleaning up requests when a React component unmounts or a newer request supersedes an older one. fetch also doesn't automatically send cookies cross-origin (credentials: 'omit' by default for cross-origin requests since a spec change), so cross-origin authenticated requests need `credentials: 'include'` explicitly, and doesn't have built-in request/response interceptors, timeout, or automatic retry — those require wrapping fetch manually or using a library like axios or ky.",
      "productionExample": "Production data-fetching layers (React Query, SWR, or hand-rolled hooks) wrap fetch with status-code checking, JSON parsing, typed error objects, AbortController-based cancellation on unmount/refetch, and often exponential-backoff retry logic, since raw fetch provides none of that out of the box.",
      "bestPractices": [
        "Always check response.ok or response.status before parsing the body",
        "Wrap fetch in try/catch (or .catch) to handle network-level rejections separately from HTTP error statuses",
        "Use AbortController to cancel in-flight requests on component unmount or superseding requests",
        "Set credentials: 'include' explicitly when cross-origin requests need cookies",
        "Parse error response bodies when the API returns structured error details, not just the status code",
        "Centralize fetch wrapping (base URL, headers, error normalization) in one client module rather than duplicating logic"
      ],
      "tradeOffs": "Advantages: fetch is a native, promise-based, no-dependency API with a clean streaming-capable Response interface and first-class AbortController cancellation support. Disadvantages: fetch does not reject on HTTP error statuses (surprising default), has no built-in timeout, no automatic retries, no interceptors, and JSON parsing errors on non-JSON responses can be confusing without explicit status checks first.",
      "commonMistakes": [
        "Interview trap: assuming fetch's promise rejects on a 404 or 500 response — it only rejects on network failures",
        "Parsing response.json() before checking response.ok, producing a confusing parse error on HTML error pages",
        "Forgetting credentials: 'include' for cross-origin authenticated requests",
        "Not implementing a timeout, letting a hung request block the UI indefinitely",
        "Not cancelling stale requests, causing race conditions where an older response overwrites a newer one",
        "Assuming fetch automatically retries on transient failures"
      ],
      "followUpQuestions": [
        "Why doesn't fetch reject on a 404 or 500 status, and how do you handle that correctly?",
        "How would you implement a request timeout with fetch?",
        "How does AbortController work, and how would you use it to prevent race conditions?",
        "What's the difference between fetch's default credentials behavior for same-origin vs cross-origin requests?",
        "How would you build a retry-with-backoff wrapper around fetch?"
      ],
      "relatedTopics": ["Promises", "AbortController", "CORS", "HTTP status codes", "Response streaming", "Race conditions"]
    }
  },
  {
    "detail": {
      "id": "jsx3-12",
      "questionNumber": "JSX3-012",
      "title": "async/await vs Promise Chaining",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Adobe"],
      "frequency": 5,
      "category": "Working with APIs",
      "part": "Browser/Web APIs",
      "concepts": ["async/await", "Promise chaining", "try/catch", "Promise.all", "Error propagation"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are the advantages of using async/await over traditional promise chaining when handling asynchronous data?"
    },
    "answer": {
      "expectedAnswer": "async/await is syntactic sugar over Promises that lets asynchronous code read like synchronous code, using ordinary try/catch for error handling instead of chained .then/.catch, which is especially clearer for sequential dependent calls and conditional branching. It doesn't replace Promises — an async function still returns a Promise, and await simply pauses execution of that function (not the whole thread) until the awaited Promise settles.",
      "deepExplanation": "With .then() chaining, sequential dependent async steps require nesting or careful chaining, and mixing conditional logic (if/else, loops, try/catch) into a chain of .then() callbacks gets visually noisy fast — a for-loop of sequential awaited calls is trivial to write with async/await but awkward to express as a promise chain without recursion or reduce tricks. await pauses only the enclosing async function; it doesn't block the JS thread — control returns to the event loop, and other code (including other async functions, event handlers, timers) continues running while the awaited Promise is pending. Error handling with async/await uses standard try/catch, which naturally handles both synchronous throws and rejected Promises in one block, whereas a Promise chain needs a terminal .catch() and care about where in the chain a rejection is caught. A key subtlety: awaiting expressions sequentially inside a loop serializes them (each waits for the previous to finish), which is often not desired when the operations are independent — in that case you should fire all the Promises first (e.g. via Promise.all(items.map(fn))) and then await the aggregate, getting the same parallelism a chain of concurrent .then() calls would provide. Both styles are ultimately Promises underneath, so mixing them is completely valid — a common pattern is using async/await for control flow but still calling .then()-free utility functions that return Promises.",
      "productionExample": "Data-fetching hooks and API service layers overwhelmingly use async/await for readability, especially when a request depends on the result of a previous request (e.g. fetch user, then fetch that user's orders) or when the flow includes conditional branches and error recovery — patterns that get unwieldy fast in nested .then() chains.",
      "bestPractices": [
        "Use async/await for sequential, dependent asynchronous steps",
        "Use Promise.all/Promise.allSettled for independent operations you want to run concurrently rather than sequential await calls",
        "Wrap awaited calls in try/catch and handle/rethrow errors meaningfully rather than swallowing them",
        "Avoid unnecessary await on non-Promise values (harmless but unnecessary microtask overhead)",
        "Don't use async/await inside array methods like forEach expecting them to wait — they won't",
        "Return the awaited promise from async functions where the caller needs to chain further"
      ],
      "tradeOffs": "Advantages: reads like synchronous code, easier to follow control flow with loops/conditionals, unified error handling via try/catch, easier debugging with clearer stack traces and breakpoints. Disadvantages: naive sequential awaits inside loops can accidentally serialize otherwise-independent async work, hurting performance; overusing await can obscure where concurrency should have been used; still requires understanding the underlying Promise/microtask model to reason about ordering correctly.",
      "commonMistakes": [
        "Awaiting each item in a loop sequentially when the calls could run concurrently via Promise.all",
        "Interview trap: using async/await inside Array.prototype.forEach expecting it to pause the loop — forEach ignores returned promises entirely",
        "Forgetting try/catch, causing an unhandled promise rejection when the awaited call fails",
        "Assuming await blocks the entire JS thread rather than just pausing the enclosing async function",
        "Not marking a function async while still using await inside it (syntax error)",
        "Mixing .then() and await on the same promise chain in a confusing way"
      ],
      "followUpQuestions": [
        "Why doesn't await work correctly inside Array.prototype.forEach?",
        "How would you run several independent async operations concurrently with async/await?",
        "What's the difference between Promise.all and Promise.allSettled?",
        "Does await block the JavaScript thread? Explain what actually happens.",
        "How do unhandled promise rejections get surfaced, and how would you catch them globally?"
      ],
      "relatedTopics": ["Promises", "Event loop", "Microtask queue", "Promise.all", "Promise.allSettled", "Error handling"]
    }
  },
  {
    "detail": {
      "id": "jsx3-13",
      "questionNumber": "JSX3-013",
      "title": "Parsing and Handling JSON API Responses",
      "difficulty": "Easy",
      "companies": ["Amazon", "Microsoft", "Netflix", "Uber", "Zoho"],
      "frequency": 4,
      "category": "Working with APIs",
      "part": "Browser/Web APIs",
      "concepts": ["JSON.parse", "JSON.stringify", "Content-Type headers", "Response.json()", "Schema validation"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How do you parse and handle JSON responses from an API?"
    },
    "answer": {
      "expectedAnswer": "With fetch, `await response.json()` parses the response body as JSON and returns a Promise resolving to the resulting JS value; the equivalent lower-level tool is JSON.parse(text) for a raw string. Robust handling means checking the Content-Type header and response.ok before parsing, wrapping the parse in a try/catch since malformed JSON throws a SyntaxError, and ideally validating the parsed shape against an expected schema before trusting it in application logic.",
      "deepExplanation": "response.json() internally reads the response body stream to completion and calls JSON.parse on the text, so it can only be called once per response (the body stream is consumed) and it rejects if the body isn't valid JSON — which happens surprisingly often in production when an API error path returns an HTML error page or empty body with a 200 status, so a naive `.then(res => res.json())` chain can throw a confusing parse error unrelated to the real problem. JSON.parse itself only understands the JSON grammar: it doesn't revive Dates, Maps, Sets, undefined values, or functions, so API responses commonly represent dates as ISO strings that the client must explicitly convert with `new Date(str)`. JSON.parse accepts an optional reviver function `(key, value) => value` that runs bottom-up on every parsed key, letting you transform values (e.g. auto-parsing date strings) during parsing rather than in a separate pass. For outgoing requests, JSON.stringify serializes a JS value, silently dropping keys whose values are undefined or functions, converting NaN/Infinity to null, and it accepts an optional replacer and indentation argument for pretty-printing. Because API responses are external, untrusted input, production code increasingly validates the parsed shape with a schema library (Zod, io-ts, Yup) rather than trusting TypeScript types alone, since TypeScript types are erased at runtime and provide zero actual runtime safety against a backend returning an unexpected shape.",
      "productionExample": "A typed API client typically does: fetch → check response.ok → response.json() wrapped in try/catch → validate against a Zod schema → return a typed, guaranteed-shape object to the rest of the app, so a backend contract change fails loudly and early instead of causing a cryptic 'cannot read property of undefined' deep in a component.",
      "bestPractices": [
        "Check response.ok/status before attempting to parse the body as JSON",
        "Wrap JSON.parse / response.json() in try/catch to handle malformed or empty bodies gracefully",
        "Validate the parsed shape against a runtime schema (Zod/Yup) rather than trusting TypeScript types alone",
        "Explicitly convert date strings to Date objects rather than assuming JSON.parse does it",
        "Avoid calling response.json() more than once on the same Response (clone it first if needed)",
        "Use JSON.stringify's replacer/indent arguments for readable debug logging, not for production payloads"
      ],
      "tradeOffs": "Advantages: JSON.parse/stringify are fast, built-in, and universally supported; response.json() integrates cleanly with fetch's Promise-based flow. Disadvantages: JSON has no native Date/Map/Set/undefined representation, requiring manual conversion; a single malformed response throws rather than degrading gracefully; TypeScript types give no runtime guarantee that a parsed response actually matches the expected shape.",
      "commonMistakes": [
        "Interview trap: assuming response.json() can be called multiple times on the same Response object",
        "Not handling the case where the API returns a 200 with an empty body, which fails JSON.parse",
        "Trusting a TypeScript interface as if it were a runtime guarantee about API response shape",
        "Forgetting JSON.stringify drops undefined values and functions silently",
        "Not converting ISO date strings back into Date objects after parsing",
        "Assuming JSON.parse handles trailing commas or comments — it doesn't, unlike JSON5/JSONC"
      ],
      "followUpQuestions": [
        "Why can you only call response.json() once, and how would you work around that?",
        "How would you validate an API response's shape at runtime?",
        "How does JSON.parse's reviver argument work?",
        "What happens to undefined values and functions when you JSON.stringify an object?",
        "How would you handle a 200 response with an empty or non-JSON body?"
      ],
      "relatedTopics": ["Fetch API", "Runtime schema validation", "Zod", "Content negotiation", "Serialization"]
    }
  },
  {
    "detail": {
      "id": "jsx3-14",
      "questionNumber": "JSX3-014",
      "title": "CORS Issues and How to Handle Them",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Atlassian"],
      "frequency": 5,
      "category": "Working with APIs",
      "part": "Browser/Web APIs",
      "concepts": ["Same-origin policy", "CORS preflight", "Access-Control-Allow-Origin", "Simple vs preflighted requests", "Credentials"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are some common issues with CORS (Cross-Origin Resource Sharing), and how do you handle them?"
    },
    "answer": {
      "expectedAnswer": "CORS is a browser-enforced security mechanism that blocks a page from reading a cross-origin response unless the server explicitly opts in via Access-Control-Allow-Origin and related headers; it's a client-side (browser) restriction, not a server-side one, which is why tools like curl or Postman aren't affected by it. Common issues are missing/misconfigured Allow-Origin headers, failed preflight OPTIONS requests for non-simple requests, and credentials (cookies) requiring both Access-Control-Allow-Credentials: true on the server and credentials: 'include' on the client, with the origin header unable to be a wildcard in that case.",
      "deepExplanation": "The browser's same-origin policy blocks JavaScript from reading responses from a different origin (different scheme, host, or port) by default; CORS is the mechanism by which a server can relax that restriction for specific origins. 'Simple requests' (GET/HEAD/POST with only a few whitelisted headers and content types like text/plain, form-urlencoded, or multipart) go straight to the server, and the browser blocks reading the response only if the response is missing a matching Access-Control-Allow-Origin header — the request itself still reaches the server, which is a common point of confusion, since server logs show the request happened even though the client-side JS saw an error. Any other request — custom headers like Authorization or a Content-Type of application/json, or methods like PUT/DELETE/PATCH — triggers a 'preflight': the browser automatically sends an OPTIONS request first, asking the server which origins/methods/headers it allows via Access-Control-Allow-Methods and Access-Control-Allow-Headers, and only sends the real request if the preflight response permits it. Cookies and other credentials are not sent cross-origin by default; enabling them requires the client to set credentials: 'include' (or withCredentials: true for XHR) and the server to respond with Access-Control-Allow-Credentials: true and a specific (non-wildcard) Access-Control-Allow-Origin value, since the spec disallows combining credentials with a wildcard origin for security reasons. In development, a common workaround is a dev-server proxy (e.g. Vite/webpack-dev-server proxy config) that forwards API calls same-origin so CORS never triggers locally, mirroring what a production reverse proxy often does.",
      "productionExample": "A typical production setup puts the API behind a reverse proxy or gateway on the same origin/subdomain as the frontend (avoiding CORS entirely) or explicitly whitelists the frontend's origin(s) in the API's CORS middleware (e.g. Express's cors package, or API Gateway CORS config), being careful never to reflect an arbitrary Origin header back with credentials enabled, which would reopen a CSRF-adjacent vulnerability.",
      "bestPractices": [
        "Whitelist specific known origins rather than reflecting any Origin header back, especially with credentials enabled",
        "Never combine Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true — the spec forbids it and browsers will reject it",
        "Minimize preflight-triggering headers/methods where simple requests would suffice, to reduce extra round-trips",
        "Cache preflight results with Access-Control-Max-Age to avoid an OPTIONS request on every call",
        "Use a same-origin reverse proxy in production to sidestep CORS entirely where feasible",
        "Remember CORS is a browser-side protection, not a server-side authorization mechanism — still enforce auth server-side"
      ],
      "tradeOffs": "Advantages: CORS lets APIs safely opt in to controlled cross-origin access without disabling browser security entirely; fine-grained control over origins, methods, headers, and credentials. Disadvantages: preflight requests add an extra round-trip of latency for non-simple requests; misconfiguration is a very common source of confusing 'network error' bugs that are actually the browser silently blocking response reading; CORS is often mistaken for a server-security feature when it's purely a browser-enforced client protection.",
      "commonMistakes": [
        "Interview trap: believing a CORS error means the request never reached the server — for simple requests it usually did, only the response reading was blocked",
        "Setting Access-Control-Allow-Origin: * while also trying to send cookies/credentials",
        "Not realizing curl/Postman/server-to-server calls are unaffected by CORS since it's purely a browser mechanism",
        "Forgetting the preflight OPTIONS route needs to be handled/allowed on the server",
        "Reflecting the request's Origin header back verbatim for any origin, creating a security hole",
        "Assuming a CORS proxy in development is safe to also use in production"
      ],
      "followUpQuestions": [
        "Why does a CORS error still show the request in the server's access logs?",
        "What triggers a preflight request versus a simple request?",
        "Why can't Access-Control-Allow-Origin be * when using credentials?",
        "How would you configure CORS securely for an API serving multiple known frontend origins?",
        "Is CORS a substitute for server-side authentication/authorization? Why or why not?"
      ],
      "relatedTopics": ["Same-origin policy", "Preflight requests", "XSS vs CSRF", "Reverse proxy", "Access-Control headers"]
    }
  },
  {
    "detail": {
      "id": "jsx3-15",
      "questionNumber": "JSX3-015",
      "title": "Managing API Rate Limits and Retries",
      "difficulty": "Hard",
      "companies": ["Amazon", "Netflix", "Stripe", "Uber", "Flipkart"],
      "frequency": 3,
      "category": "Working with APIs",
      "part": "Browser/Web APIs",
      "concepts": ["Rate limiting", "Exponential backoff", "Retry-After header", "Idempotency", "Jitter", "Circuit breaker"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you manage API rate limits and retries in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "Detect rate-limit responses (typically HTTP 429, sometimes with a Retry-After header) and back off before retrying, using exponential backoff with jitter rather than fixed-interval retries to avoid a thundering herd of synchronized retries. Retries should only be applied to idempotent operations (or ones made safely idempotent via an idempotency key), be capped with a maximum attempt count, and only retry on transient errors (429, 502/503/504) not on client errors like 400/401/403/404.",
      "deepExplanation": "A naive retry loop that retries immediately or at a fixed interval on every failure can make a rate-limiting or outage situation worse by synchronizing many clients' retries into repeated bursts — exponential backoff (delay = base * 2^attempt, capped at a max) spreads retries out over time, and adding random jitter (e.g. delay * (0.5 + Math.random() * 0.5)) prevents many clients from retrying at exactly the same moments and re-triggering the same spike. When the server returns a Retry-After header (either as seconds or an HTTP date), that should take precedence over a locally computed backoff since the server has authoritative knowledge of when capacity will free up. Retries must be restricted to idempotent operations — GET is always safe to retry, but a POST creating a resource is not, unless the API supports an idempotency key (a client-generated UUID sent with the request that the server uses to deduplicate retried requests, common in payment APIs like Stripe) so a retried request after a timeout doesn't create a duplicate charge or record. A client-side token-bucket or leaky-bucket limiter can proactively throttle outgoing requests to stay under a known rate limit rather than reactively handling 429s after the fact, which is friendlier to shared API quotas. At a larger scale, a circuit breaker pattern stops sending requests entirely for a cooldown period after repeated failures, avoiding piling up doomed requests against a degraded downstream service, and gradually allows a trickle of test requests through (half-open state) before fully reopening.",
      "productionExample": "Payment and infrastructure SDKs (Stripe, AWS SDK, Google Cloud client libraries) implement exponential backoff with jitter and honor Retry-After/rate-limit-remaining headers out of the box, and services making high-volume calls to such APIs typically layer a client-side token-bucket limiter on top to stay comfortably under quota and avoid ever hitting 429s in normal operation.",
      "bestPractices": [
        "Use exponential backoff with jitter, not fixed-interval retries",
        "Honor a server-provided Retry-After header over a locally computed delay",
        "Only retry idempotent requests, or use an idempotency key for non-idempotent ones",
        "Cap the maximum number of retry attempts and total retry time",
        "Distinguish transient errors (429, 502/503/504) worth retrying from client errors (400/401/403/404) that won't succeed on retry",
        "Consider a circuit breaker to stop hammering a downstream service that's clearly failing",
        "Proactively rate-limit outgoing requests client-side when the API's limits are known"
      ],
      "tradeOffs": "Advantages: backoff-with-jitter retries improve resilience to transient failures and reduce the chance of worsening an outage; idempotency keys make retries safe for mutating operations; circuit breakers protect both the client and a struggling downstream service. Disadvantages: retry logic adds real complexity and more code paths to test; overly aggressive retrying can still contribute to cascading failures if not capped and jittered properly; idempotency keys require server-side support that not all APIs provide.",
      "commonMistakes": [
        "Retrying immediately in a tight loop on failure, worsening a rate-limit or outage situation",
        "Interview trap: retrying non-idempotent POST requests without an idempotency key, risking duplicate side effects (e.g. double charges)",
        "Ignoring a Retry-After header and using a shorter local backoff",
        "Retrying on 4xx client errors that will never succeed (e.g. 401 Unauthorized) instead of failing fast",
        "Not capping the number of retries, leading to requests that hang indefinitely",
        "No jitter, causing synchronized retry storms across many clients"
      ],
      "followUpQuestions": [
        "Why is jitter important in addition to exponential backoff?",
        "How would you make a non-idempotent request safely retryable?",
        "How does a circuit breaker differ from simple retry-with-backoff?",
        "Which HTTP status codes should and shouldn't be retried, and why?",
        "How would you design a client-side rate limiter to stay under a known API quota?"
      ],
      "relatedTopics": ["Exponential backoff", "Idempotency keys", "Circuit breaker pattern", "Token bucket algorithm", "HTTP 429", "Resilience engineering"]
    }
  },
  {
    "detail": {
      "id": "jsx3-16",
      "questionNumber": "JSX3-016",
      "title": "NPM vs Yarn",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Flipkart"],
      "frequency": 4,
      "category": "Package Management",
      "part": "DevOps/Cloud",
      "concepts": ["npm", "Yarn", "Lockfiles", "package.json", "Workspaces", "Deterministic installs"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the difference between NPM and Yarn, and when should you use each?"
    },
    "answer": {
      "expectedAnswer": "NPM is the default package manager bundled with Node.js, while Yarn is an alternative created originally to fix npm's early performance and determinism problems, both now converging on similar features (lockfiles, workspaces, offline caching). Modern versions of both are fast and reliable, so the choice today is mostly about team convention, monorepo tooling preferences (Yarn/pnpm workspaces are popular for large monorepos), and ecosystem integration rather than a hard technical necessity.",
      "deepExplanation": "npm (Node Package Manager) ships with every Node.js install and reads/writes package-lock.json to pin exact dependency versions and their resolved integrity hashes, ensuring reproducible installs across machines. Yarn was released by Facebook in 2016 specifically because early npm (v3-4) had slow, non-deterministic installs and no lockfile — Yarn introduced yarn.lock, parallelized downloads, and an offline cache, which pushed npm to add package-lock.json (npm 5+) and adopt a similar deterministic-install model. Yarn has since released 'Yarn Berry' (v2+) which introduced Plug'n'Play (PnP) — resolving dependencies without a node_modules folder at all, storing packages in a single cache and generating a resolution map — trading node_modules compatibility with some tools for significantly faster installs and less disk usage, though PnP requires tooling support and isn't universally compatible, so many teams stay on Yarn's 'node-modules' linker mode or use Yarn Classic (v1). Both support workspaces for monorepos, letting multiple packages in one repo share a single top-level node_modules and cross-link local packages without publishing. pnpm is a third contender worth mentioning: it uses a content-addressable global store and symlinks/hardlinks into each project's node_modules, avoiding duplicate copies of the same package version across projects and enforcing stricter dependency isolation (a package can't accidentally import a transitive dependency it never declared) — a problem npm/Yarn's flat node_modules structure can silently allow.",
      "productionExample": "Large monorepos (e.g. at companies running many internal packages) often pick Yarn or pnpm workspaces specifically for faster installs and stricter dependency isolation, while smaller projects and most open-source libraries default to npm since it requires zero extra tooling installation and every contributor already has it via Node.js.",
      "bestPractices": [
        "Commit the lockfile (package-lock.json or yarn.lock) to version control for reproducible installs",
        "Never manually edit a lockfile by hand",
        "Pick one package manager per repo and enforce it in CI (e.g. via engines/packageManager field or a preinstall check)",
        "Use workspaces for monorepos to avoid duplicated dependencies and enable local package cross-linking",
        "Run npm ci / yarn install --frozen-lockfile in CI to fail fast on lockfile drift rather than silently updating it",
        "Audit dependencies regularly (npm audit / yarn audit) as part of the security process"
      ],
      "tradeOffs": "Advantages of npm: zero extra install, ships with Node, huge ecosystem familiarity. Advantages of Yarn: historically faster installs, PnP mode eliminates node_modules bloat, strong workspaces support. Disadvantages: switching package managers mid-project causes lockfile conflicts and inconsistent installs across a team; Yarn PnP has compatibility friction with tools expecting a real node_modules folder; maintaining two lockfile types in one repo (if switching) is a common source of subtle version drift bugs.",
      "commonMistakes": [
        "Having both package-lock.json and yarn.lock in the same repo, causing version drift between contributors",
        "Interview trap: assuming Yarn is always faster than modern npm — recent npm versions have closed most of the original performance gap",
        "Manually editing a lockfile instead of letting the tool regenerate it",
        "Not running installs in --frozen/ci mode in CI, allowing silent lockfile updates to slip through",
        "Assuming Yarn PnP works identically to node_modules for every tool without checking compatibility",
        "Mixing global and local package manager versions without pinning via corepack/packageManager field"
      ],
      "followUpQuestions": [
        "What problem did Yarn originally solve that npm didn't have a solution for at the time?",
        "How does Yarn's Plug'n'Play mode differ from a traditional node_modules install?",
        "How does pnpm's dependency isolation differ from npm/Yarn's flat node_modules?",
        "Why should a lockfile be committed to version control?",
        "How would you enforce a single package manager across a team in CI?"
      ],
      "relatedTopics": ["Lockfiles", "Monorepo workspaces", "pnpm", "Semantic versioning", "Dependency resolution", "npm audit"]
    }
  },
  {
    "detail": {
      "id": "jsx3-17",
      "questionNumber": "JSX3-017",
      "title": "How Semantic Versioning Works",
      "difficulty": "Easy",
      "companies": ["Google", "Amazon", "Microsoft", "Adobe", "Zoho"],
      "frequency": 4,
      "category": "Package Management",
      "part": "DevOps/Cloud",
      "concepts": ["Semantic versioning", "Major/minor/patch", "Caret and tilde ranges", "Breaking changes"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How does semantic versioning work, and why is it important in package management?"
    },
    "answer": {
      "expectedAnswer": "Semantic versioning (semver) uses a MAJOR.MINOR.PATCH format where MAJOR increments for incompatible/breaking API changes, MINOR increments for backward-compatible new functionality, and PATCH increments for backward-compatible bug fixes. It matters because it lets package managers and developers reason about upgrade safety from the version number alone, and range specifiers like ^1.2.3 (compatible within the same major) or ~1.2.3 (compatible within the same minor) let dependencies auto-update safely without manual intervention for every release.",
      "deepExplanation": "Under strict semver, given a version X.Y.Z: X (major) must increment when you make incompatible API changes, Y (minor) increments when you add functionality in a backward-compatible manner, and Z (patch) increments for backward-compatible bug fixes, with the rule that minor and patch resets to 0 when a higher-order number increments. Versions below 1.0.0 (0.y.z) are considered initial development, where anything may change at any time and the public API shouldn't be considered stable — some ecosystems treat a 0.x minor bump as potentially breaking, deviating from the 1.x+ contract. npm's caret range (^1.2.3) allows updates that don't change the leftmost non-zero digit, so it's equivalent to >=1.2.3 <2.0.0, but for a 0.x version, ^0.2.3 only allows patch updates (>=0.2.3 <0.3.0) since minor bumps are unstable pre-1.0. The tilde range (~1.2.3) is narrower, allowing only patch-level changes (>=1.2.3 <1.3.0). Pre-release identifiers (1.0.0-alpha.1) and build metadata (1.0.0+20230101) are also part of the spec, with pre-release versions sorting lower than the corresponding release version. In practice, semver is a promise, not an enforced guarantee — a maintainer can accidentally publish a breaking change as a patch, which is why lockfiles, CI test suites, and tools like Renovate/Dependabot that run tests before merging version bumps exist as a safety net beyond trusting version numbers alone.",
      "productionExample": "Production dependency-update bots (Dependabot, Renovate) use semver ranges to automatically open PRs for patch/minor updates that should be safe by convention, running the full test suite before merge, while major version bumps are routed for manual review since they signal an intentional breaking change requiring code changes.",
      "bestPractices": [
        "Follow semver strictly when publishing a library: any breaking change bumps the major version, no exceptions",
        "Use caret ranges (^) for application dependencies to get safe minor/patch updates automatically",
        "Pin exact versions (or use a lockfile) for reproducible builds regardless of range specifiers in package.json",
        "Document breaking changes clearly in a changelog alongside every major bump",
        "Treat 0.x versions as unstable and expect potential breaking changes even in minor bumps",
        "Run the full test suite before accepting automated dependency-update PRs, don't trust semver blindly"
      ],
      "tradeOffs": "Advantages: predictable, machine-readable upgrade safety signaling; enables automated dependency updates and range-based installs; widely adopted convention across the JS ecosystem. Disadvantages: semver is only a social contract — nothing enforces that a published patch version is truly non-breaking; determining whether a change is 'breaking' is sometimes subjective (e.g. dropping support for an old Node version); pre-1.0 versions have looser guarantees that catch newcomers off guard.",
      "commonMistakes": [
        "Interview trap: assuming ^0.2.3 allows minor version updates the same way ^1.2.3 does — for 0.x versions, caret only allows patch bumps",
        "Publishing a breaking change as a minor or patch version by mistake",
        "Confusing caret (^) and tilde (~) range behavior",
        "Assuming a lockfile isn't needed because package.json ranges 'pin' versions closely enough",
        "Treating semver as an enforced runtime guarantee rather than a convention",
        "Not reading changelogs before accepting major version bumps in automated PRs"
      ],
      "followUpQuestions": [
        "How does the caret range behave differently for a 0.x version versus a 1.x version?",
        "What's the difference between ^ and ~ ranges?",
        "How would you decide whether a change to a public API counts as breaking?",
        "Why is semver described as a convention rather than an enforced guarantee?",
        "How do pre-release identifiers like -alpha.1 sort relative to the base version?"
      ],
      "relatedTopics": ["npm version ranges", "Lockfiles", "Changelogs", "Dependabot/Renovate", "Breaking changes", "API versioning"]
    }
  },
  {
    "detail": {
      "id": "jsx3-18",
      "questionNumber": "JSX3-018",
      "title": "Best Practices for Managing Dependencies",
      "difficulty": "Medium",
      "companies": ["Meta", "Amazon", "Netflix", "Stripe", "Atlassian"],
      "frequency": 3,
      "category": "Package Management",
      "part": "DevOps/Cloud",
      "concepts": ["Dependency hygiene", "devDependencies", "Bundle size", "Supply chain security", "npm audit"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are the best practices for managing dependencies in a JavaScript project?"
    },
    "answer": {
      "expectedAnswer": "Keep the dependency tree as small as necessary, correctly split dependencies vs devDependencies, pin versions via a committed lockfile for reproducibility, and regularly audit for known vulnerabilities and unused packages. Evaluate new dependencies for maintenance activity, bundle size impact, and license compatibility before adding them, since every dependency is both a supply-chain risk and an ongoing maintenance cost.",
      "deepExplanation": "Dependencies (runtime code shipped to production, e.g. react, lodash) must be distinguished from devDependencies (build/test tooling like jest, eslint, webpack) so production installs (npm install --production or equivalent) and bundle analysis correctly exclude tooling that's never shipped to users. A committed lockfile ensures every environment — developer machines, CI, production builds — resolves the exact same dependency tree, avoiding the classic 'works on my machine' class of bugs caused by a transitive dependency updating between installs. Before adding a new dependency, it's worth checking its bundle size impact (via a tool like bundlephobia or webpack-bundle-analyzer), how actively it's maintained (recent commits, open issue responsiveness), its license (GPL-family licenses can create legal obligations incompatible with proprietary codebases), and whether the functionality is small enough to just implement directly rather than pulling in a whole package for a few lines of logic. Regular auditing (npm audit, Snyk, GitHub Dependabot alerts) surfaces known CVEs in the dependency tree, including transitive dependencies several levels deep that the team never directly chose — supply-chain attacks (a compromised popular package pushing malicious code in a patch release) are a real and growing risk, which is part of why lockfiles with integrity hashes and tools that pin exact transitive versions matter. Periodically pruning unused dependencies (via tools like depcheck) keeps both the install size and the audit surface smaller.",
      "productionExample": "Enterprise frontend teams typically run Dependabot/Renovate for automated version-bump PRs gated by CI test runs, run npm audit / Snyk scans in the CI pipeline to block merges introducing known-vulnerable packages, and periodically run bundle analysis to catch dependency bloat before it ships to users on slow connections.",
      "bestPractices": [
        "Correctly categorize dependencies vs devDependencies",
        "Commit and never hand-edit the lockfile",
        "Audit for known vulnerabilities regularly (npm audit, Snyk, Dependabot alerts) as part of CI",
        "Evaluate a new dependency's bundle size, maintenance activity, and license before adding it",
        "Prune unused dependencies periodically (e.g. with depcheck)",
        "Prefer small, focused packages over large multi-purpose libraries when only a fraction of functionality is needed",
        "Pin exact versions for critical infra tooling where non-determinism is unacceptable"
      ],
      "tradeOffs": "Advantages: disciplined dependency management reduces bundle size, attack surface, and maintenance burden; automated audits catch known vulnerabilities early; correct dev/prod separation keeps production installs lean. Disadvantages: auditing and reviewing every dependency addition slows development velocity; being overly conservative about adding dependencies can lead to reinventing well-tested wheels; automated update bots still require human review time for major version bumps and can create PR noise.",
      "commonMistakes": [
        "Installing build tooling as a regular dependency instead of a devDependency, bloating production installs",
        "Interview trap: assuming a lockfile alone protects against supply-chain attacks — a compromised package can still be the version the lockfile pins to if it was compromised before install",
        "Adding a large dependency for a small amount of needed functionality",
        "Never auditing or updating dependencies, accumulating known CVEs over time",
        "Blindly merging automated dependency-update PRs without reviewing changelogs for major bumps",
        "Leaving unused dependencies in package.json indefinitely"
      ],
      "followUpQuestions": [
        "How do you decide whether something belongs in dependencies or devDependencies?",
        "How would you evaluate whether to add a new third-party dependency to a project?",
        "What is a supply-chain attack, and how does a lockfile help or not help against it?",
        "How would you find and remove unused dependencies in a large project?",
        "How would you set up automated dependency updates safely in CI?"
      ],
      "relatedTopics": ["npm audit", "Supply chain security", "Bundle size analysis", "Dependabot/Renovate", "License compatibility", "Lockfiles"]
    }
  },
  {
    "detail": {
      "id": "jsx3-19",
      "questionNumber": "JSX3-019",
      "title": "Updating Dependencies Safely",
      "difficulty": "Medium",
      "companies": ["Google", "Microsoft", "Netflix", "Uber", "Flipkart"],
      "frequency": 3,
      "category": "Package Management",
      "part": "DevOps/Cloud",
      "concepts": ["npm outdated", "Changelogs", "Canary/staged rollouts", "Breaking changes", "CI regression testing"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you update dependencies while ensuring compatibility?"
    },
    "answer": {
      "expectedAnswer": "Update incrementally rather than all at once — patch and minor updates first (usually low risk within a semver-respecting package), running the full automated test suite after each batch, then tackle major version bumps individually with their changelog/migration guide reviewed and manual verification of affected areas. Automated tools (Dependabot/Renovate) combined with strong CI coverage let most updates be validated automatically, reserving human review time for major bumps and any test failures.",
      "deepExplanation": "npm outdated (or yarn outdated) lists installed versions versus the latest available within and beyond the declared range, distinguishing 'wanted' (latest satisfying the current semver range) from 'latest' (newest published regardless of range) — updating within-range first is typically safe by the semver contract, while jumping to a new major requires deliberate action since it's excluded from the range by default. A disciplined update strategy batches low-risk patch/minor updates together (since they're individually low-effort to verify) and handles each major-version bump separately with its own PR, changelog review, and test run, since bundling multiple major bumps together makes it hard to isolate which change caused a regression if the test suite catches one. Reading the changelog/migration guide before a major bump is essential since semver only guarantees the version number signals a breaking change, not what that change is or how to adapt to it — many libraries publish a codemod or migration guide specifically to automate the mechanical parts of an upgrade. Strong CI coverage (unit, integration, and ideally some E2E smoke tests) is what actually makes safe automated updates possible; without it, teams either update rarely (accumulating security debt) or update carelessly (accumulating regressions). For particularly risky updates (a core framework version, a build tool), some teams roll out via a canary branch or staged deployment, watching error rates and performance metrics before merging to the main branch.",
      "productionExample": "A CI pipeline configured with Renovate groups low-risk patch/minor bumps into weekly batched PRs auto-merged if tests pass, while major version bumps (e.g. React 17 to 18, Node LTS upgrades) get their own dedicated PR with manual review, a migration checklist from the library's official guide, and often a canary deploy before full rollout.",
      "bestPractices": [
        "Update patch/minor versions frequently and in small batches, verified by CI",
        "Handle each major version bump as its own isolated, reviewed change",
        "Always read the changelog/migration guide before a major version update",
        "Rely on strong automated test coverage to catch regressions from updates quickly",
        "Use canary/staged rollouts for high-risk core dependency updates (framework, build tool)",
        "Keep dependencies reasonably current rather than deferring updates for years, which makes eventual major bumps far riskier"
      ],
      "tradeOffs": "Advantages: incremental, well-tested updates reduce the blast radius of any single regression and keep security patches flowing continuously. Disadvantages: frequent updating requires sustained CI investment and reviewer time; deferring updates reduces short-term effort but compounds risk into large, painful migrations later; automated merge-on-green for even patch updates carries some residual risk since tests can't cover every behavior.",
      "commonMistakes": [
        "Batching many major version bumps into one giant update, making regressions hard to isolate",
        "Interview trap: assuming a minor/patch update within a semver range is always 100% safe — it's a convention, not a guarantee",
        "Skipping the changelog before a major bump and discovering breaking changes only via test failures",
        "Letting dependencies go stale for years, turning routine maintenance into a high-risk big-bang migration",
        "Merging automated update PRs without CI actually passing due to misconfigured pipelines",
        "Not having enough test coverage to trust that green CI actually means safe to ship"
      ],
      "followUpQuestions": [
        "How would you prioritize which outdated dependencies to update first?",
        "What's the difference between npm outdated's 'wanted' and 'latest' columns?",
        "How would you approach a major framework version upgrade across a large codebase?",
        "What role does CI test coverage play in making frequent updates safe?",
        "How would you use a canary rollout to validate a risky dependency update in production?"
      ],
      "relatedTopics": ["Semantic versioning", "Renovate/Dependabot", "Migration guides", "CI/CD", "Canary deployments", "Regression testing"]
    }
  },
  {
    "detail": {
      "id": "jsx3-20",
      "questionNumber": "JSX3-020",
      "title": "Handling Peer Dependencies",
      "difficulty": "Hard",
      "companies": ["Meta", "Adobe", "Atlassian", "Stripe", "Zoho"],
      "frequency": 2,
      "category": "Package Management",
      "part": "DevOps/Cloud",
      "concepts": ["peerDependencies", "Version conflicts", "npm install --legacy-peer-deps", "Plugin ecosystems"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you handle peer dependencies in a package?"
    },
    "answer": {
      "expectedAnswer": "peerDependencies declare that a package expects the consuming application to provide a compatible version of another package itself, rather than bundling its own copy — typical for plugins/libraries built against a host framework like React, where having two different React copies in the tree would break things like hooks or context. You handle them by declaring an accurate version range in peerDependencies, listing the same package in devDependencies for local development/testing, and resolving conflicts by aligning the app's installed version with what the peer range allows, or negotiating a range update with the library maintainer.",
      "deepExplanation": "Unlike a regular dependency, npm doesn't automatically install a peerDependency for you — as of npm 7+, npm does auto-install compatible peer dependencies by default (behavior changed from npm 3-6 where it was left to the consumer), but it will still throw an ERESOLVE error if the installed version conflicts with what's declared, unless the consumer overrides with --legacy-peer-deps or --force, which is a common workaround-turned-footgun when a package hasn't updated its peer range for a newer major version of its host framework. Peer dependencies exist specifically to avoid 'diamond dependency' problems: if a React component library bundled its own copy of React as a regular dependency, an app using it would end up with two separate React instances in its bundle, and hooks like useContext would silently break across the boundary since React's internal module-scoped state wouldn't be shared. A library author declares peerDependencies with a range wide enough to support the versions they've actually tested against (e.g. \"react\": \">=17.0.0 <19.0.0\"), and separately lists the same package as a devDependency so their own test suite and build process has something to run against, since peerDependencies alone doesn't install anything for the library's own development environment. When a library hasn't yet published an updated peer range for a new major version of the host (e.g. it says react: \"^17.0.0\" but the app is on React 18), consumers hit an installation error even though the library often works fine in practice — the fix is either waiting for/contributing an upstream peer-range bump, or using an override mechanism (npm's overrides field, Yarn's resolutions) to force the version while accepting the small risk of untested compatibility.",
      "productionExample": "Nearly every React component library (Material UI, React Router, styled-components) declares react and react-dom as peerDependencies rather than bundling them, and plugin ecosystems like ESLint plugins declare eslint itself as a peer dependency so a single shared ESLint instance lints the whole project using all installed plugins consistently.",
      "bestPractices": [
        "Declare peerDependencies with the widest version range that's actually been tested to work",
        "Also list the same package as a devDependency for local development and testing",
        "Use npm's overrides / Yarn's resolutions field to force a specific transitive version when a peer range is outdated but compatibility is confirmed",
        "Avoid bundling a host framework (React, Vue) as a regular dependency in a library meant to plug into an app",
        "Prefer peerDependenciesMeta with optional: true for peers that aren't always required",
        "Test against the full supported peer version range in CI, not just the latest"
      ],
      "tradeOffs": "Advantages: avoids duplicate/conflicting instances of a shared host library (like React) in the final bundle; keeps the consuming app in control of which version of the shared dependency is used; smaller published package size since the peer isn't bundled. Disadvantages: peer range mismatches produce confusing install errors (ERESOLVE); --legacy-peer-deps/--force workarounds can mask genuinely incompatible version combinations; maintaining accurate peer ranges requires ongoing maintainer diligence as new major versions of the host library are released.",
      "commonMistakes": [
        "Bundling a framework like React as a regular dependency instead of a peer dependency, causing duplicate-instance bugs",
        "Interview trap: assuming npm automatically installs a compatible peer dependency version rather than erroring on a mismatch",
        "Using --legacy-peer-deps/--force as a permanent fix rather than a temporary workaround while awaiting an upstream fix",
        "Declaring an overly narrow peer range that blocks valid, working version combinations",
        "Forgetting to also add the peer as a devDependency, breaking local development/testing",
        "Not testing against the full declared peer range, only the latest version"
      ],
      "followUpQuestions": [
        "Why does React specifically get declared as a peerDependency instead of a regular dependency in component libraries?",
        "What's the difference in npm 7+'s peer dependency resolution behavior compared to npm 6?",
        "How would you resolve an ERESOLVE conflict caused by an outdated peer range in a third-party library?",
        "What's the difference between npm overrides and Yarn resolutions?",
        "When would you mark a peer dependency as optional?"
      ],
      "relatedTopics": ["Diamond dependency problem", "npm overrides", "Yarn resolutions", "Monorepos", "Plugin architecture", "ERESOLVE errors"]
    }
  },
  {
    "detail": {
      "id": "jsx3-21",
      "questionNumber": "JSX3-021",
      "title": "Console Methods for Debugging",
      "difficulty": "Easy",
      "companies": ["Google", "Amazon", "Microsoft", "Flipkart", "Zoho"],
      "frequency": 4,
      "category": "Debugging Techniques",
      "part": "Browser/Web APIs",
      "concepts": ["console.log", "console.table", "console.group", "console.trace", "console.time"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What are the different console methods available in JavaScript, and how do you use them for debugging?"
    },
    "answer": {
      "expectedAnswer": "Beyond console.log, the Console API offers console.error/warn/info for severity-tagged output, console.table for tabular inspection of arrays/objects, console.group/groupEnd for collapsible nested log sections, console.time/timeEnd for quick performance measurement, console.trace for a stack trace at a given point, console.assert for conditional logging, and console.count for tracking how many times a code path runs.",
      "deepExplanation": "console.error and console.warn are functionally similar to console.log but are styled distinctly by the browser and, importantly, are what most error-tracking/log-aggregation tools filter on, and console.error includes a stack trace in most browsers automatically. console.table(arrayOfObjects) renders a sortable grid with one row per array element and one column per object key, which is dramatically faster to scan than a wall of nested console.log output when debugging a list of API results. console.group(label)/console.groupEnd() creates a collapsible, indented section in DevTools, useful for organizing verbose logs from a specific function or loop iteration without losing surrounding context. console.time(label)/console.timeEnd(label) wraps a block of code with a start/stop timer, printing elapsed milliseconds — handy for a first-pass performance check before reaching for the full Performance panel or a profiler. console.trace() prints the current call stack, useful for answering 'who called this function' without setting a breakpoint. console.assert(condition, message) logs only when the condition is falsy, letting you leave lightweight sanity checks in code that stay silent in the normal case. console.count(label) increments and logs a named counter each time it's called, useful for verifying how many times a function/handler actually fires (e.g. catching an event listener attached multiple times). %c format specifiers let you apply CSS styling to console output for visually distinguishing custom log categories.",
      "productionExample": "During a debugging session on a data-heavy dashboard, a developer might use console.table to inspect a fetched array of records at a glance, console.group to nest logs per row of processing, and console.time/timeEnd to quickly confirm whether a slow render is caused by data fetching or a rendering bottleneck before opening the full Performance profiler.",
      "bestPractices": [
        "Use console.error/warn for genuine problems so they're visually distinct and filterable",
        "Use console.table for arrays of objects instead of manually scanning nested log output",
        "Remove or gate debug console.log calls behind a debug flag/env check before shipping to production",
        "Use console.group to keep related logs visually organized during multi-step debugging",
        "Prefer the debugger statement/breakpoints over console.log for deep step-through investigation",
        "Use console.assert for lightweight invariants that should stay silent unless violated"
      ],
      "tradeOffs": "Advantages: zero-setup, immediate feedback without attaching a debugger; console.table/group/time provide structured output far more scannable than plain log statements; works identically across browser and Node environments. Disadvantages: leftover console.log statements in production code leak information and clutter output; console-based debugging doesn't let you inspect live state or step through execution the way breakpoints do; excessive logging can itself slow down execution in hot code paths.",
      "commonMistakes": [
        "Leaving debug console.log statements in production code",
        "Interview trap: assuming console.log always shows a live snapshot of an object — for un-expanded objects, some browsers show a live reference that reflects later mutations, not the value at log time",
        "Using console.log for every case instead of console.error/warn, losing severity signal",
        "Not using console.table for tabular data, making array-of-object debugging much slower",
        "Relying solely on console methods when a breakpoint/debugger would answer the question faster",
        "Logging large objects/arrays repeatedly in a loop, flooding the console and slowing the page"
      ],
      "followUpQuestions": [
        "Why might a logged object show different data than what you expected when you expand it later?",
        "How does console.trace differ from setting a breakpoint?",
        "How would you gate debug logging so it doesn't ship to production?",
        "What's the difference between console.time and the Performance panel for profiling?",
        "How would you use console.count to debug a duplicated event listener?"
      ],
      "relatedTopics": ["Chrome DevTools", "Breakpoints", "Performance profiling", "Logging strategy", "debugger statement"]
    }
  },
  {
    "detail": {
      "id": "jsx3-22",
      "questionNumber": "JSX3-022",
      "title": "Debugging with Chrome DevTools",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      "frequency": 4,
      "category": "Debugging Techniques",
      "part": "Browser/Web APIs",
      "concepts": ["Sources panel", "Call stack", "Scope inspection", "Network panel", "Performance panel", "Source maps"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you debug JavaScript code using Chrome DevTools?"
    },
    "answer": {
      "expectedAnswer": "The Sources panel is the core tool: set breakpoints in your (source-mapped) code, use the call stack and scope panes to inspect variable state at each frame, and step through execution with step-over/into/out controls. Beyond breakpoints, the Console panel evaluates expressions live in the current paused context, the Network panel inspects requests/responses/timing, and the Performance panel profiles CPU/rendering work to find bottlenecks.",
      "deepExplanation": "In the Sources panel, clicking a line number sets a breakpoint that pauses execution when reached; conditional breakpoints (right-click a line) pause only when a given expression is truthy, which is invaluable inside a loop where you only care about one specific iteration. When paused, the Scope pane shows local, closure, and global variables at that exact point, and the Call Stack pane lets you click through parent frames to inspect their state too, with step-into (F11) descending into a called function, step-over (F10) executing the current line without entering called functions, and step-out (Shift+F11) running until the current function returns. Logpoints (right-click a line, 'Add logpoint') let you log an expression at a line without modifying code or pausing execution, effectively injecting a console.log without touching the source. The 'blackboxing' feature lets you tell DevTools to skip stepping into specific scripts (like a large vendor bundle), keeping step-through focused on your own code. XHR/fetch breakpoints and DOM mutation breakpoints (in the Elements panel) pause execution when a specific network request fires or a specific DOM node changes, useful when you don't know which code triggers a change but know what changes. Source maps let you debug against original TypeScript/JSX source even though the browser executes a transpiled/minified bundle — DevTools uses the .map file to translate breakpoints and stack traces back to original file/line coordinates, which requires the build to emit and correctly reference source maps (and ideally not ship them to production, or gate them behind auth). The Network panel's waterfall view shows request timing breakdown (DNS, connect, TTFB, download), and the Performance panel's flame chart shows exactly which function calls consumed CPU time during a recorded interaction, which is how you diagnose jank beyond guesswork.",
      "productionExample": "Diagnosing a production bug reported by a user often starts with reproducing it locally with source maps enabled, setting a conditional breakpoint at the suspected failure point, and inspecting the call stack/scope to find the actual state that triggered the bug, then using the Network panel to confirm whether an API response shape matches what the code expects.",
      "bestPractices": [
        "Use conditional breakpoints instead of manually stepping through every loop iteration",
        "Use logpoints for quick inspection without modifying source or pausing execution flow",
        "Blackbox vendor/minified bundles to keep step-through focused on your own code",
        "Ensure source maps are correctly generated and referenced for readable stack traces and breakpoints",
        "Use the Network panel's timing breakdown to distinguish server latency from client rendering issues",
        "Use the Performance panel's flame chart to find actual bottlenecks rather than guessing"
      ],
      "tradeOffs": "Advantages: DevTools gives live, in-context inspection of exact runtime state, far more precise than console.log guesswork; source maps let you debug against readable original code even in production-like minified builds; specialized breakpoints (conditional, XHR, DOM mutation) target specific triggers efficiently. Disadvantages: setting up source maps correctly for a complex build pipeline takes effort; stepping through deeply async code (promises, timers) can be harder to follow than synchronous code; DevTools debugging is inherently manual and doesn't scale to catching regressions the way automated tests do.",
      "commonMistakes": [
        "Debugging against minified code without source maps, making stack traces unreadable",
        "Interview trap: assuming step-over will skip an awaited async call the same way it skips a synchronous function — async boundaries can behave unexpectedly under a debugger depending on the engine/DevTools version",
        "Not using conditional breakpoints, wasting time manually stepping through irrelevant loop iterations",
        "Shipping source maps publicly for production code that shouldn't expose original source",
        "Ignoring the Network panel's timing breakdown and assuming a slow page load is always JS-caused",
        "Not blackboxing vendor bundles, making step-into painfully slow and irrelevant"
      ],
      "followUpQuestions": [
        "How do conditional breakpoints differ from logpoints, and when would you use each?",
        "How do source maps work, and what's the security consideration around shipping them to production?",
        "How would you use the Performance panel to diagnose UI jank?",
        "What's the difference between step-over, step-into, and step-out?",
        "How would you debug a bug that only reproduces in production but not locally?"
      ],
      "relatedTopics": ["Source maps", "Breakpoints", "Performance profiling", "Network panel", "Call stack", "Minification"]
    }
  },
  {
    "detail": {
      "id": "jsx3-23",
      "questionNumber": "JSX3-023",
      "title": "Breakpoints and Effective Debugging",
      "difficulty": "Medium",
      "companies": ["Meta", "Amazon", "Microsoft", "Adobe", "Uber"],
      "frequency": 3,
      "category": "Debugging Techniques",
      "part": "Browser/Web APIs",
      "concepts": ["Conditional breakpoints", "debugger statement", "XHR breakpoints", "DOM breakpoints", "Watch expressions"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are breakpoints, and how do you use them effectively in debugging?"
    },
    "answer": {
      "expectedAnswer": "A breakpoint pauses JavaScript execution at a specific point so you can inspect live variable state, the call stack, and step through subsequent execution instead of inferring behavior from log output. Effective use means favoring targeted breakpoint types — conditional breakpoints, DOM mutation breakpoints, XHR/fetch breakpoints, or event listener breakpoints — over blindly pausing on every line, so you land exactly at the moment relevant to the bug.",
      "deepExplanation": "A plain line breakpoint pauses every time that line executes, which is fine for code that runs rarely but wastes time in a hot loop or frequently-called function — a conditional breakpoint (right-click the line number, enter an expression) only pauses when that expression evaluates truthy, letting you target, for example, the exact iteration where an array index equals a specific failing value. The debugger statement achieves the same pause programmatically from source code, useful when you want the breakpoint to travel with the code (e.g. committed temporarily, or conditionally reached only under a feature flag) rather than being set manually in DevTools each session, though it should never be left in shipped production code since it will pause any user with DevTools open. DOM breakpoints (in the Elements panel, right-click a node → Break on → subtree/attribute/node removal modifications) pause execution the moment a specific DOM change happens, which is the fastest way to answer 'what code is mutating this element' without knowing which script to blame in advance. Similarly, XHR/fetch breakpoints pause whenever a request matching a URL substring fires, and event listener breakpoints pause on the next occurrence of a given event category (e.g. any 'click' anywhere), both useful when you know the trigger but not the source. Watch expressions let you pin custom expressions (not just existing variables) to continuously evaluate and display while stepping, useful for tracking a derived value across multiple steps. Effective debugging is largely about picking the breakpoint type that encodes as much of your hypothesis as possible up front, so you land at the exact relevant pause rather than manually stepping through unrelated code to get there.",
      "productionExample": "Tracking down an unexpected DOM node removal in a large React app is dramatically faster with a DOM 'subtree modifications' breakpoint on the parent element than trying to guess which of dozens of components might be responsible, since the debugger pauses with the exact call stack that performed the removal.",
      "bestPractices": [
        "Use conditional breakpoints to target a specific iteration/state instead of pausing on every hit",
        "Use DOM/XHR/event listener breakpoints when you know the symptom but not which code causes it",
        "Never leave debugger statements in code that ships to production",
        "Use watch expressions to track a derived value across multiple step-throughs",
        "Combine breakpoints with the call stack pane to understand how execution reached that point",
        "Remove or disable breakpoints you're done with rather than accumulating stale ones that slow debugging sessions"
      ],
      "tradeOffs": "Advantages: pausing execution gives exact, live insight into state that log statements can only approximate after the fact; specialized breakpoint types (conditional, DOM, XHR) dramatically narrow the search space for the responsible code. Disadvantages: breakpoints pause the entire page, which can be disruptive for time-sensitive code (animations, timers) whose behavior changes once paused; a debugger statement accidentally committed can pause execution unexpectedly for real users; heavy breakpoint use is a manual process that doesn't scale as a substitute for automated regression tests.",
      "commonMistakes": [
        "Interview trap: leaving a debugger statement in production code, unintentionally pausing execution for any user with DevTools open",
        "Setting a plain breakpoint inside a hot loop and manually stepping through hundreds of irrelevant iterations",
        "Not using DOM/XHR breakpoints when the trigger is unknown, wasting time guessing which script is responsible",
        "Forgetting that pausing execution can change timing-sensitive behavior (e.g. an animation or timeout appears to misbehave only because it was paused)",
        "Accumulating many stale breakpoints across a session, making it hard to track which one currently matters",
        "Not using watch expressions, forcing repeated manual re-evaluation of the same derived value"
      ],
      "followUpQuestions": [
        "How would you find which code is removing a specific DOM element without knowing which script to blame?",
        "Why is leaving a debugger statement in production code risky?",
        "How does pausing execution affect time-based code like animations or setTimeout?",
        "How would you set a breakpoint that only triggers on the 5th call to a function?",
        "What's the difference between a watch expression and simply inspecting the scope pane?"
      ],
      "relatedTopics": ["Chrome DevTools", "debugger statement", "Call stack", "Conditional breakpoints", "DOM mutation observers"]
    }
  },
  {
    "detail": {
      "id": "jsx3-24",
      "questionNumber": "JSX3-024",
      "title": "Best Practices for Error Handling and Logging",
      "difficulty": "Medium",
      "companies": ["Google", "Amazon", "Netflix", "Stripe", "Atlassian"],
      "frequency": 4,
      "category": "Debugging Techniques",
      "part": "Browser/Web APIs",
      "concepts": ["Error boundaries", "Structured logging", "Custom Error classes", "Error monitoring", "Global error handlers"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are some best practices for handling and logging errors in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "Catch errors at meaningful boundaries (not everywhere), use custom Error subclasses to carry structured context (error code, cause, metadata) rather than throwing plain strings, and log with enough context (stack trace, user/session id, relevant state) to actually diagnose the issue later without needing to reproduce it. In production, route errors to a monitoring service (Sentry, Datadog) with source maps applied, and set up global handlers (window.onerror, unhandledrejection) as a last-resort safety net, not a substitute for targeted try/catch.",
      "deepExplanation": "Errors should be caught where there's a meaningful recovery action to take — a network call failing should be caught at the call site to show a retry UI, while an unexpected programming error deep in rendering logic is often better left to propagate to a top-level boundary (like a React error boundary) that can show a fallback UI and report the crash, rather than being silently swallowed by an overly broad try/catch that hides the bug. Custom Error subclasses (`class ValidationError extends Error { constructor(message, field) { super(message); this.name = 'ValidationError'; this.field = field; } }`) let calling code distinguish error types via instanceof and carry structured, machine-readable context beyond a message string, which both improves programmatic error handling and produces far more useful log entries. The ES2022 Error cause option (`new Error('failed to save', { cause: originalError })`) preserves the original low-level error while adding higher-level context as it propagates up through layers, avoiding the classic anti-pattern of catching an error and only re-throwing a generic message that discards the root cause. Structured logging (logging a JSON object with fields like timestamp, severity, userId, requestId, stack, rather than an interpolated string) is what makes production log aggregation and search actually useful, since free-text log messages are hard to query and correlate across a distributed system. window.onerror and window.addEventListener('unhandledrejection', ...) catch errors and rejected promises that escape all application-level handling, which is valuable as a safety net feeding a monitoring service, but relying on them as the primary error-handling strategy means bugs are only discovered after they've already broken the user's experience — proactive try/catch at meaningful boundaries plus these global handlers together give both prevention and visibility.",
      "productionExample": "A production web app wraps the React tree in an error boundary reporting crashes to Sentry with source-mapped stack traces and user/session context attached, wraps individual API calls in try/catch to show inline retry UI on network failure, and registers a global unhandledrejection handler purely to catch anything that slips through, feeding the same monitoring pipeline for visibility into otherwise-silent failures.",
      "bestPractices": [
        "Catch errors at boundaries where you can take a meaningful recovery action",
        "Use custom Error subclasses to carry structured, typed error information",
        "Preserve the original error via the cause option (or manual chaining) when wrapping/rethrowing",
        "Log structured data (JSON with severity, context, stack) rather than free-text strings",
        "Route production errors to a monitoring service with source maps applied for readable stack traces",
        "Register global window.onerror/unhandledrejection handlers as a safety net, not the primary strategy",
        "Never silently swallow an error with an empty catch block"
      ],
      "tradeOffs": "Advantages: structured, contextual error handling makes production incidents diagnosable without needing to reproduce them locally; custom error types enable precise programmatic recovery; global handlers ensure nothing escapes visibility entirely. Disadvantages: over-catching errors everywhere can hide real bugs behind silent failures or generic fallback UI; structured logging and monitoring integration add setup and ongoing cost; relying too heavily on global handlers as the primary strategy means users experience the bug before it's ever caught.",
      "commonMistakes": [
        "Interview trap: catching an error and swallowing it silently (empty catch block), hiding bugs from both users and monitoring",
        "Throwing plain strings instead of Error objects, losing the stack trace entirely",
        "Re-throwing a generic error message without preserving the original cause",
        "Logging unstructured free-text messages that are hard to search/correlate in aggregate",
        "Catching errors far too broadly (e.g. wrapping an entire app in one try/catch) instead of at meaningful boundaries",
        "Shipping error monitoring without source maps, producing unreadable minified stack traces"
      ],
      "followUpQuestions": [
        "Why is throwing a string instead of an Error object a problem?",
        "How does the Error cause option help preserve context when rethrowing?",
        "Where should you catch an error versus let it propagate to a boundary?",
        "How would you set up production error monitoring with readable stack traces?",
        "What's the risk of relying solely on window.onerror as your error-handling strategy?"
      ],
      "relatedTopics": ["Error boundaries", "Custom Error classes", "Structured logging", "Sentry/Datadog", "unhandledrejection", "Error.cause"]
    }
  },
  {
    "detail": {
      "id": "jsx3-25",
      "questionNumber": "JSX3-025",
      "title": "Tracing Asynchronous Code Execution",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Netflix", "Uber", "Stripe"],
      "frequency": 3,
      "category": "Debugging Techniques",
      "part": "Browser/Web APIs",
      "concepts": ["Async stack traces", "Event loop", "Microtasks vs macrotasks", "Async call stack in DevTools"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you trace asynchronous code execution during debugging?"
    },
    "answer": {
      "expectedAnswer": "Chrome DevTools' Sources panel shows an 'Async' section in the call stack that reconstructs the logical chain across await/then/setTimeout boundaries, connecting a paused frame back to where the async operation was originally scheduled, even though the actual native call stack was unwound in between. Beyond breakpoints, correlating async operations across boundaries in production typically relies on structured logging with a shared correlation/request id, since raw stack traces alone lose the async chain once code returns to the event loop.",
      "deepExplanation": "Because JavaScript is single-threaded with an event loop, an async operation's continuation (the code after an await, or a .then() callback) doesn't execute on the same native call stack as the code that scheduled it — by the time a promise resolves, the original synchronous call stack that created it has already unwound and been discarded, so a plain synchronous stack trace captured inside a .then() callback would normally show only the microtask runner, not how you got there. DevTools solves this with 'async stack traces' (enabled via a checkbox or on by default in modern versions), which stitch together the logical chain by tracking where each Promise/timer/async function was scheduled, so a breakpoint inside a .then() callback shows both the immediate stack and a greyed-out '(async)' continuation back to the original triggering code, making it possible to answer 'what ultimately caused this to run' several async hops later. Understanding the event loop's task queues matters for tracing execution order: microtasks (Promise callbacks, queueMicrotask) all drain completely before the next macrotask (setTimeout, setInterval, I/O callbacks, UI rendering) runs, and within a single macrotask, all newly queued microtasks run before control returns to the event loop — this is why `Promise.resolve().then(fn)` always executes before a `setTimeout(fn, 0)` scheduled at the same point, even though both appear 'immediate'. In production (outside a live debugger), the equivalent technique is passing a correlation/trace id through an async chain (e.g. attaching it to a request context or AsyncLocalStorage in Node) so structured logs from every async step can be joined back together after the fact by searching for that id, since you can't attach a live debugger to a user's production session.",
      "productionExample": "Distributed tracing tools (OpenTelemetry, Datadog APM) propagate a trace id through async boundaries — HTTP calls, queue messages, database queries — so a single user request that fans out across many async operations and services can be reconstructed as one timeline after the fact, which is the production analog of DevTools' async stack trace feature.",
      "bestPractices": [
        "Enable/use DevTools async stack traces to see the logical chain across await/then/setTimeout boundaries",
        "Understand microtask vs macrotask ordering to predict execution sequence correctly",
        "Attach a correlation/trace id to logs across async boundaries for production debugging",
        "Use structured logging with timestamps to reconstruct async ordering after the fact",
        "Avoid deeply nested async chains that are hard to trace even with tooling — flatten with async/await where possible",
        "Use distributed tracing tools for cross-service async flows in production systems"
      ],
      "tradeOffs": "Advantages: async stack traces in DevTools make previously invisible causal chains visible during live debugging; microtask/macrotask understanding lets you predict execution order without guessing; correlation ids make production async chains reconstructable after the fact. Disadvantages: async stack traces have some performance overhead in DevTools and aren't available at all outside a live debugging session; production tracing requires deliberate instrumentation (correlation ids, distributed tracing) that must be built in ahead of time; deeply chained async code remains genuinely harder to reason about than synchronous code regardless of tooling.",
      "commonMistakes": [
        "Interview trap: assuming a stack trace captured inside a .then() callback naturally includes the synchronous code that scheduled it — it doesn't, without async stack trace support",
        "Assuming setTimeout(fn, 0) runs before a Promise.resolve().then(fn) scheduled at the same time — microtasks always drain first",
        "Not propagating a correlation id through async operations, making production issues impossible to reconstruct after the fact",
        "Debugging deeply nested async chains without leveraging DevTools' async call stack feature",
        "Assuming async code always executes in the order it appears in source, ignoring queue semantics",
        "Not distinguishing macrotask (setTimeout, I/O) boundaries from microtask (Promise) boundaries when reasoning about timing bugs"
      ],
      "followUpQuestions": [
        "Why does Promise.resolve().then(fn) run before setTimeout(fn, 0)?",
        "How do DevTools reconstruct an async stack trace when the native call stack was already unwound?",
        "How would you trace a single logical operation across multiple async hops in production?",
        "What is AsyncLocalStorage in Node.js, and how does it help with tracing?",
        "How would you debug a race condition between two competing async operations?"
      ],
      "relatedTopics": ["Event loop", "Microtask queue", "Macrotask queue", "Distributed tracing", "AsyncLocalStorage", "Chrome DevTools async stacks"]
    }
  },
  {
    "detail": {
      "id": "jsx3-26",
      "questionNumber": "JSX3-026",
      "title": "CSS-in-JS Libraries and JavaScript Integration",
      "difficulty": "Medium",
      "companies": ["Meta", "Netflix", "Adobe", "Uber", "Flipkart"],
      "frequency": 3,
      "category": "JavaScript and CSS",
      "part": "CSS",
      "concepts": ["CSS-in-JS", "styled-components", "Tagged templates", "Runtime vs zero-runtime", "Critical CSS"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are CSS-in-JS libraries, and how do they integrate with JavaScript?"
    },
    "answer": {
      "expectedAnswer": "CSS-in-JS libraries (styled-components, Emotion) let you author component-scoped styles directly in JavaScript/TypeScript files, typically via tagged template literals or object styles, generating uniquely-scoped class names at runtime or build time and injecting the corresponding CSS into the document. They integrate tightly with component props, enabling dynamic styles that respond to component state without manually toggling class names.",
      "deepExplanation": "A library like styled-components uses tagged template literals (`` const Button = styled.button`color: ${props => props.primary ? 'blue' : 'gray'};` ``) to parse the CSS string, generate a unique hashed class name for that specific style definition, and inject a <style> tag with the actual rules into the document head — the returned Button is a real React component that renders a button element with the generated class applied, and prop-based interpolations mean the same styled component can produce different actual CSS output depending on runtime props. This tight coupling between component logic and styling is CSS-in-JS's core value proposition: styles are colocated with the component that uses them, scoped automatically (no risk of a class name colliding elsewhere in a large codebase), and dead code elimination is straightforward since an unused styled component is just unused JavaScript. The cost is runtime overhead: traditional CSS-in-JS libraries parse/inject styles during render, which adds JS execution and style-recalculation work compared to a static stylesheet loaded once, and server-side rendering requires an extra step to extract and inject critical CSS into the initial HTML response to avoid a flash of unstyled content. This performance concern led to 'zero-runtime' CSS-in-JS approaches (vanilla-extract, Linaria, styled-components' babel-plugin partial static extraction, Panda CSS) that extract styles to real static CSS files at build time, keeping the developer ergonomics of colocated, typed styles while eliminating most or all runtime cost. Utility-first approaches like Tailwind CSS solve a similar 'styling near the component' goal without any JS-generated CSS at all, trading dynamic prop-driven styles for composable utility classes, which is why the CSS-in-JS vs utility-CSS debate is often really a runtime-cost vs authoring-ergonomics trade-off.",
      "productionExample": "Design-system-heavy React applications commonly use Emotion or styled-components (or increasingly a zero-runtime alternative) so that a Button component's variants (primary, danger, size) are expressed as typed props mapping directly to style logic, keeping style and behavior in one file and avoiding a parallel CSS file that can drift out of sync with the component's actual markup.",
      "bestPractices": [
        "Extract critical CSS during server-side rendering to avoid a flash of unstyled content",
        "Prefer a zero-runtime or partially-static CSS-in-JS solution for performance-sensitive applications",
        "Avoid excessive dynamic interpolation that regenerates styles on every render — memoize style objects/props where relevant",
        "Colocate styles with the component they belong to for discoverability",
        "Use theme providers/design tokens rather than hardcoded values scattered across styled components",
        "Measure the actual runtime cost (style recalculation, bundle size) before committing to a runtime CSS-in-JS library at scale"
      ],
      "tradeOffs": "Advantages: colocated, scoped styles eliminate class name collisions and unused CSS bloat; full access to JS logic (props, theme, conditionals) for dynamic styling; strong TypeScript integration for typed style props. Disadvantages: runtime CSS-in-JS adds JS execution and style injection overhead compared to static CSS; SSR requires extra critical-CSS extraction steps to avoid FOUC; larger bundle size from the library itself; can blur the separation of concerns some teams prefer between markup/logic and presentation.",
      "commonMistakes": [
        "Interview trap: assuming all CSS-in-JS libraries have zero build-time cost — many popular ones (styled-components, Emotion in default mode) do meaningful work at runtime",
        "Not extracting critical CSS for SSR, causing a flash of unstyled content",
        "Creating a new styled component definition inside a render function on every render, causing unnecessary style recalculation",
        "Overusing deeply dynamic prop-based styles where a simpler CSS class toggle would suffice",
        "Not measuring actual performance impact before adopting a runtime CSS-in-JS library at scale",
        "Mixing multiple CSS-in-JS libraries or CSS-in-JS with global stylesheets inconsistently across a codebase"
      ],
      "followUpQuestions": [
        "What's the performance difference between runtime and zero-runtime CSS-in-JS libraries?",
        "How do you avoid a flash of unstyled content when server-side rendering with CSS-in-JS?",
        "How does CSS-in-JS handle style scoping to avoid class name collisions?",
        "How would you compare CSS-in-JS to a utility-first approach like Tailwind CSS?",
        "What causes unnecessary style recalculation in a CSS-in-JS setup, and how would you avoid it?"
      ],
      "relatedTopics": ["styled-components", "Emotion", "Zero-runtime CSS-in-JS", "Server-side rendering", "Tailwind CSS", "Critical CSS"]
    }
  },
  {
    "detail": {
      "id": "jsx3-27",
      "questionNumber": "JSX3-027",
      "title": "Manipulating Styles with JavaScript",
      "difficulty": "Easy",
      "companies": ["Amazon", "Microsoft", "Adobe", "Flipkart", "Zoho"],
      "frequency": 3,
      "category": "JavaScript and CSS",
      "part": "CSS",
      "concepts": ["element.style", "classList", "CSS custom properties", "getComputedStyle", "Reflow/repaint"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How do you manipulate styles using JavaScript?"
    },
    "answer": {
      "expectedAnswer": "You can set inline styles directly via element.style.property (camelCase, e.g. element.style.backgroundColor), toggle predefined CSS classes via element.classList (add/remove/toggle/contains), read computed final styles with getComputedStyle(element), and update CSS custom properties (variables) via element.style.setProperty('--var-name', value) for theming-friendly dynamic values.",
      "deepExplanation": "element.style gives direct read/write access to that element's inline style attribute only — it does not reflect styles applied via external stylesheets or classes, so element.style.color will be empty even if a CSS class is coloring the text red; for that, getComputedStyle(element).color returns the actual resolved value after the cascade, inheritance, and browser defaults are all applied, though it returns computed (often normalized, e.g. colors as rgb()) rather than the originally-authored values. classList is generally preferable to direct style manipulation for anything beyond one-off dynamic values, since toggling a predefined class keeps styling logic in CSS (easier to theme, maintain, and reason about) rather than scattering property assignments through JS — classList.toggle('active', condition) even accepts a boolean force argument to explicitly set add/remove based on a condition in one call. CSS custom properties (--my-color: blue;) can be read and written from JS via getPropertyValue/setProperty, which is the modern way to pass dynamic values (a computed theme color, a drag position) from JavaScript into CSS without needing inline styles for every property — a component can set one custom property and let the actual visual styling live entirely in a stylesheet that references var(--my-color). A performance consideration applies to all of these: reading certain layout-dependent properties (offsetHeight, getComputedStyle values that depend on layout) immediately after writing a style forces a synchronous layout recalculation ('layout thrashing') if done repeatedly in a loop, since the browser must flush pending style changes before it can answer the read accurately — batching reads before writes (or using requestAnimationFrame) avoids repeated forced reflows.",
      "productionExample": "A drag-to-resize UI component typically sets a CSS custom property (--panel-width) via JS on every pointer move rather than toggling many discrete inline style properties, letting the actual layout/transition CSS live in a stylesheet while JS only supplies the one changing numeric value, which keeps the JS/CSS boundary clean and avoids inline style sprawl.",
      "bestPractices": [
        "Prefer toggling predefined CSS classes over setting many individual inline style properties from JS",
        "Use CSS custom properties to pass dynamic values into otherwise-static CSS",
        "Use getComputedStyle only when you need the final resolved value, not for reading values you just set yourself",
        "Batch DOM reads and writes separately to avoid forced synchronous layout thrashing",
        "Avoid manipulating layout-affecting properties in tight loops without requestAnimationFrame",
        "Keep animation-related style changes on transform/opacity where possible to avoid triggering layout"
      ],
      "tradeOffs": "Advantages: element.style/classList/custom properties give full dynamic control tied to component logic and state; CSS custom properties keep the JS/CSS boundary clean for theming and dynamic values. Disadvantages: excessive direct inline style manipulation scatters styling logic outside CSS, hurting maintainability; interleaved reads/writes of layout-dependent properties can cause performance-costly forced reflows; getComputedStyle values are normalized and don't always match the originally authored CSS syntax.",
      "commonMistakes": [
        "Interview trap: reading element.style.color and expecting it to reflect a color set via an external CSS class",
        "Interleaving DOM style writes and layout-dependent reads in a loop, causing repeated forced synchronous layout",
        "Setting many individual inline style properties instead of toggling one class",
        "Assuming getComputedStyle returns the exact syntax originally authored (it returns normalized/computed values)",
        "Manipulating layout-triggering properties (width, top) for animations instead of transform, hurting performance",
        "Forgetting camelCase property names are required for element.style (backgroundColor, not background-color)"
      ],
      "followUpQuestions": [
        "What's the difference between element.style and getComputedStyle?",
        "Why does interleaving style writes and layout reads cause performance problems?",
        "How would you use CSS custom properties to pass a dynamic value from JS into CSS?",
        "Why are transform and opacity preferred for JS-driven animations over width/top?",
        "How does classList.toggle's second argument work?"
      ],
      "relatedTopics": ["Reflow and repaint", "CSS custom properties", "requestAnimationFrame", "classList API", "Layout thrashing"]
    }
  },
  {
    "detail": {
      "id": "jsx3-28",
      "questionNumber": "JSX3-028",
      "title": "Ensuring Responsive Design with JavaScript",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Netflix", "Uber", "Flipkart"],
      "frequency": 3,
      "category": "JavaScript and CSS",
      "part": "CSS",
      "concepts": ["ResizeObserver", "matchMedia", "Viewport units", "Container queries", "Debounced resize handlers"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you ensure responsive design using JavaScript?"
    },
    "answer": {
      "expectedAnswer": "Prefer CSS-native responsive tools first (media queries, flexbox/grid, container queries, viewport units) since they're more performant and declarative; reach for JavaScript only when logic needs to actually branch on viewport/element size — using window.matchMedia to react to breakpoint changes, and ResizeObserver to react to an individual element's size changes (more robust than window resize listeners for component-level responsiveness).",
      "deepExplanation": "window.matchMedia('(min-width: 768px)') returns a MediaQueryList object whose .matches boolean reflects whether the query currently applies, and registering a 'change' listener on it lets JS react precisely when a breakpoint is crossed, rather than polling or recalculating on every pixel of a window resize — this is the correct tool when a component needs to render fundamentally different markup or logic (not just different CSS) at different viewport sizes, e.g. swapping a data table for a card list on mobile. ResizeObserver(callback) observes a specific DOM element and fires whenever that element's content box size changes, which is more accurate than a window resize listener for component-level responsiveness because an element can change size due to its container's layout (e.g. a sidebar collapsing) without the window itself resizing at all — before ResizeObserver, achieving this required expensive manual polling. Container queries (@container) are the CSS-native evolution of this same problem, letting a component's own CSS respond to its container's size rather than the viewport's, which is now broadly supported and often eliminates the need for a JS-based ResizeObserver purely for styling purposes — JS/ResizeObserver remains necessary when the *logic*, not just the styling, must branch (e.g. deciding how many chart data points to render based on available width). Legacy code often used a debounced/throttled window resize listener reading window.innerWidth, which works but is less precise (viewport-only, not per-element) and requires manual debounce/throttle to avoid firing dozens of times per second during a drag-resize, whereas ResizeObserver's callback is already naturally batched by the browser.",
      "productionExample": "A responsive data-visualization component (a chart library) commonly uses ResizeObserver on its own container to re-render the chart with an appropriately-sized SVG viewBox and adjusted tick density whenever the container resizes, whether from a window resize, a sidebar toggle, or a CSS grid reflow — none of which a window resize listener alone would reliably catch.",
      "bestPractices": [
        "Prefer CSS media queries and container queries over JS for purely visual responsiveness",
        "Use window.matchMedia when JS logic (not just styling) needs to react to breakpoint changes",
        "Use ResizeObserver instead of window resize listeners for component-level size responsiveness",
        "Debounce or throttle manual resize handlers if ResizeObserver isn't used, to avoid excessive re-renders",
        "Disconnect ResizeObserver/matchMedia listeners on component unmount to avoid memory leaks",
        "Reach for container queries first for component-scoped responsive styling before reaching for JS"
      ],
      "tradeOffs": "Advantages: matchMedia/ResizeObserver give precise, event-driven reactions to size changes without manual polling; ResizeObserver correctly handles component-level (not just viewport-level) size changes. Disadvantages: JS-based responsiveness adds complexity and a runtime cost CSS-only solutions avoid entirely; over-reliance on JS for what CSS could handle natively increases bundle size and re-render churn; ResizeObserver callbacks can trigger layout recalculation if not handled carefully, especially when they themselves cause further size changes (a well-known 'ResizeObserver loop limit exceeded' pitfall).",
      "commonMistakes": [
        "Using a window resize listener to detect an individual element's size changes instead of ResizeObserver",
        "Interview trap: not debouncing/throttling a manual resize listener, causing excessive re-renders during a drag-resize",
        "Reaching for JS-based responsiveness when a CSS media/container query would suffice",
        "Not disconnecting ResizeObserver/matchMedia listeners on unmount, leaking memory",
        "Causing a ResizeObserver loop by triggering a size change inside its own callback without guarding against it",
        "Reading window.innerWidth synchronously in a hot loop instead of caching/observing changes"
      ],
      "followUpQuestions": [
        "When would you reach for JavaScript-based responsiveness instead of CSS media/container queries?",
        "How does ResizeObserver differ from a window resize event listener?",
        "What causes a 'ResizeObserver loop limit exceeded' warning, and how would you avoid it?",
        "How would you clean up matchMedia/ResizeObserver listeners to avoid memory leaks?",
        "How do container queries change the need for JS-based component-level responsiveness?"
      ],
      "relatedTopics": ["ResizeObserver", "matchMedia", "Container queries", "Debouncing/throttling", "CSS media queries"]
    }
  },
  {
    "detail": {
      "id": "jsx3-29",
      "questionNumber": "JSX3-029",
      "title": "window.matchMedia and Media Queries in JS",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Adobe", "Uber"],
      "frequency": 3,
      "category": "JavaScript and CSS",
      "part": "CSS",
      "concepts": ["matchMedia", "MediaQueryList", "Change events", "prefers-color-scheme", "SSR hydration mismatch"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does window.matchMedia work, and how do you use it to handle media queries in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "window.matchMedia(query) evaluates a CSS media query string against the current environment and returns a live MediaQueryList object with a .matches boolean and a 'change' event that fires whenever the query's result flips, letting JS react to breakpoint or preference changes (like prefers-color-scheme) without polling. It's commonly wrapped in a custom hook in React apps to derive reactive state from a media query.",
      "deepExplanation": "Calling `const mql = window.matchMedia('(prefers-color-scheme: dark)')` immediately gives you mql.matches reflecting the current state, and `mql.addEventListener('change', handler)` (the modern API; the older addListener/removeListener is deprecated but still seen in older code) fires handler whenever the environment changes such that the query's result flips — this covers not just window resizing but also OS-level preference changes like toggling dark mode or 'prefers-reduced-motion' while the page is open, which a resize listener would never catch. The object returned is 'live' in the sense that .matches is always current if read again, but it does not itself trigger re-renders in a framework — integrating it into React requires a custom hook that reads matchMedia in useState's initializer and subscribes/unsubscribes the change listener in a useEffect, cleaning up on unmount to avoid leaking listeners. A well-known SSR gotcha is that window/matchMedia don't exist on the server, so a naive `useState(() => window.matchMedia(query).matches)` throws during server rendering — the common fix is defaulting to a safe assumption (e.g. false/desktop-first) on the server and reconciling the real value in a useEffect after mount, which necessarily causes one extra client-side render but avoids a hydration mismatch or SSR crash. Beyond viewport width, matchMedia supports any valid media feature query string — prefers-color-scheme, prefers-reduced-motion, orientation, hover, pointer — which is how a site can adapt to accessibility and interaction-capability preferences beyond just responsive breakpoints, e.g. disabling animations entirely for prefers-reduced-motion: reduce.",
      "productionExample": "A theme-aware React app commonly implements a useMediaQuery('(prefers-color-scheme: dark)') hook to pick a sensible default theme on load, combined with a manual override stored in localStorage, and separately checks prefers-reduced-motion to conditionally disable CSS transitions/animations for users who've requested reduced motion at the OS level.",
      "bestPractices": [
        "Use the modern addEventListener('change', ...) API over the deprecated addListener/removeListener",
        "Always remove the change listener on component unmount to avoid leaking subscriptions",
        "Guard against window being undefined during SSR before calling matchMedia",
        "Respect prefers-reduced-motion and prefers-color-scheme for accessibility, not just layout breakpoints",
        "Wrap matchMedia usage in a reusable hook/utility rather than duplicating logic across components",
        "Avoid recreating the MediaQueryList object on every render — memoize or create it once per query string"
      ],
      "tradeOffs": "Advantages: reacts to any media feature (not just width), including OS-level accessibility preferences that CSS alone can style for but JS logic needs to actually branch on; event-driven, no polling required. Disadvantages: doesn't exist during server-side rendering, requiring careful hydration handling; the older addListener/removeListener API is deprecated, creating compatibility churn in older codebases; doesn't itself integrate with a framework's reactivity, requiring manual wiring (hooks, subscriptions).",
      "commonMistakes": [
        "Interview trap: calling window.matchMedia during server-side rendering, throwing because window is undefined on the server",
        "Using the deprecated addListener/removeListener methods in new code instead of addEventListener/removeEventListener",
        "Forgetting to remove the change listener on unmount, leaking subscriptions",
        "Assuming matchMedia only covers width-based breakpoints, missing prefers-color-scheme/prefers-reduced-motion use cases",
        "Recreating a new MediaQueryList on every render instead of memoizing it",
        "Not reconciling the SSR default value with the real client value, causing a hydration mismatch"
      ],
      "followUpQuestions": [
        "How would you safely use matchMedia in a server-rendered React app without crashing on the server?",
        "What's the difference between the deprecated addListener and the modern addEventListener API on MediaQueryList?",
        "How would you build a reusable useMediaQuery hook?",
        "How would you respect prefers-reduced-motion in a component's animations?",
        "How does matchMedia differ from a CSS-only media query in terms of what it enables?"
      ],
      "relatedTopics": ["MediaQueryList", "prefers-color-scheme", "prefers-reduced-motion", "Server-side rendering", "Hydration mismatch", "Custom React hooks"]
    }
  },
  {
    "detail": {
      "id": "jsx3-30",
      "questionNumber": "JSX3-030",
      "title": "Inline Styles vs External Stylesheets",
      "difficulty": "Easy",
      "companies": ["Amazon", "Netflix", "Adobe", "Flipkart", "Zoho"],
      "frequency": 3,
      "category": "JavaScript and CSS",
      "part": "CSS",
      "concepts": ["Inline styles", "External stylesheets", "CSS specificity", "Caching", "Pseudo-classes"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What are the pros and cons of using inline styles versus external stylesheets in JavaScript projects?"
    },
    "answer": {
      "expectedAnswer": "Inline styles (React's style={{}} prop, or element.style) are convenient for one-off, highly dynamic values computed at runtime and guarantee the highest specificity, but they can't express pseudo-classes/pseudo-elements/media queries, aren't cached separately from markup, and scatter presentation logic through component code. External stylesheets support the full CSS feature set, are cached and parsed once by the browser independent of markup changes, and keep styling concerns separate, but require an extra class-name/selector layer to connect markup to styles and are less convenient for values only known at runtime.",
      "deepExplanation": "Inline styles are applied directly to the element's style attribute, which the CSS cascade treats as having the highest specificity short of !important, meaning they'll override almost any external stylesheet rule — useful for guaranteeing a dynamic override wins, but a maintenance hazard if used pervasively since it makes later overriding via CSS classes impossible without !important. Inline styles fundamentally cannot express hover/focus/active pseudo-classes, ::before/::after pseudo-elements, or media/container queries, since those require selector-based rules that don't exist in the inline style attribute's syntax — any of those requirements force a fallback to actual CSS regardless of how 'dynamic' the rest of the styling is. External stylesheets are fetched, parsed, and cached by the browser separately from HTML/JS, meaning a repeat visit (or navigation to another page using the same stylesheet) can reuse the cached, already-parsed CSS without re-downloading or re-parsing it, whereas inline styles are recomputed as part of every render/markup update since they're not a separate cacheable resource. Performance-wise, applying many different inline style values across many elements can also produce more distinct style objects for the browser's style engine to track compared to a shared class applied to many elements, though modern engines optimize this reasonably well; the more consistently cited cost of extensive inline styling in frameworks like React is the JS object allocation and prop diffing overhead of style objects created fresh on every render unless memoized. In practice, most production apps use external (or CSS-in-JS-generated) stylesheets for the bulk of static/interactive styling, reserving inline styles for genuinely per-instance dynamic values like a computed position, width percentage, or user-selected color that can't reasonably be expressed as a fixed set of CSS classes.",
      "productionExample": "A drag-and-drop UI typically sets inline styles for the dragged element's live x/y transform (a value that's different for every instance and changes every frame) while everything else about its appearance — borders, shadows, hover states, transitions — lives in an external stylesheet or CSS class, combining both approaches where each is strongest.",
      "bestPractices": [
        "Reserve inline styles for genuinely per-instance, runtime-computed values",
        "Use external stylesheets or CSS classes for anything involving pseudo-classes, pseudo-elements, or media queries",
        "Avoid using inline styles as a way to force overriding specificity — fix the underlying specificity/selector design instead",
        "Memoize style objects passed as inline styles in frameworks like React to avoid unnecessary re-renders/prop diffing",
        "Let stylesheets handle static, reusable styling to benefit from browser caching and parsing reuse",
        "Combine both approaches deliberately rather than defaulting entirely to one or the other"
      ],
      "tradeOffs": "Advantages of inline styles: highest specificity, colocated with dynamic runtime values, no extra selector indirection needed. Disadvantages of inline styles: can't express pseudo-classes/media queries, not cached separately, harder to override, scatters styling through markup/JS. Advantages of external stylesheets: full CSS feature support, browser caching and parse reuse, clean separation of concerns. Disadvantages of external stylesheets: requires a class-name bridge between markup and styles, less convenient for values only known at runtime, risk of unused/dead CSS accumulating over time.",
      "commonMistakes": [
        "Interview trap: assuming inline styles can express :hover or media queries — they structurally cannot",
        "Using inline styles broadly and then fighting specificity issues trying to override them from CSS",
        "Not memoizing dynamically-created inline style objects in React, causing unnecessary re-renders",
        "Assuming inline styles and stylesheet-based styles have identical caching/performance characteristics",
        "Overusing !important in stylesheets purely to fight inline style specificity, worsening long-term maintainability",
        "Mixing both approaches inconsistently across a codebase without a clear convention for when to use which"
      ],
      "followUpQuestions": [
        "Why can't inline styles express hover or focus states?",
        "How does inline style specificity compare to a class selector, and how would you override it if needed?",
        "What are the caching implications of inline styles versus external stylesheets?",
        "When would you deliberately choose an inline style over a CSS class?",
        "How would you avoid unnecessary re-renders caused by inline style objects in React?"
      ],
      "relatedTopics": ["CSS specificity", "Browser caching", "CSS-in-JS", "Pseudo-classes", "React style prop"]
    }
  },
  {
    "detail": {
      "id": "jsx3-31",
      "questionNumber": "JSX3-031",
      "title": "Configuring Webpack for a JavaScript Project",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Microsoft", "Adobe", "Atlassian"],
      "frequency": 4,
      "category": "Build Tools",
      "part": "DevOps/Cloud",
      "concepts": ["Entry/output", "Loaders", "Plugins", "Code splitting", "Module resolution"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you configure Webpack for a JavaScript project?"
    },
    "answer": {
      "expectedAnswer": "A Webpack config defines an entry point (or points) where bundling starts, an output location/filename pattern for the bundle(s), loaders to transform non-JS files (Babel for JS/JSX, css-loader/style-loader for CSS, file-loader/asset modules for images) as they're encountered in the module graph, and plugins for cross-cutting build steps (HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin for env vars). Mode (development/production) toggles built-in optimizations like minification and tree-shaking.",
      "deepExplanation": "Webpack treats every file as a module and builds a dependency graph starting from the entry point(s); loaders are per-file-type transforms applied in a pipeline (right-to-left/bottom-to-top execution order) so, for example, a .css file might go through css-loader (resolves @import/url()) then style-loader (injects a <style> tag) or MiniCssExtractPlugin's loader (extracts to a real .css file instead, preferred for production since it enables browser caching and parallel download of CSS separate from JS). Plugins hook into the broader compilation lifecycle rather than per-file transforms — HtmlWebpackPlugin generates an HTML file with the correct hashed bundle script tags injected automatically, DefinePlugin replaces global constants like process.env.NODE_ENV at build time (which is also what enables dead-code elimination of development-only branches), and in production mode Webpack automatically enables TerserPlugin-based minification and, since Webpack 4+, sensible default optimizations without extra config. Code splitting is achieved via dynamic import() syntax, which Webpack recognizes and automatically splits into a separate chunk loaded on demand, plus SplitChunksPlugin configuration to control how shared vendor code is deduplicated across entry points/chunks — critical for large apps where loading one massive bundle up front would hurt initial page load. Module resolution (resolve.alias, resolve.extensions) configures how bare import specifiers map to files, commonly used to set up path aliases like @/components instead of long relative paths. Source maps (devtool option) trade build speed against debuggability/accuracy, with different settings recommended for development (fast rebuild, less precise) versus production (slower build, precise, often uploaded to an error-monitoring service rather than shipped publicly).",
      "productionExample": "A production React app's Webpack config typically splits vendor code into a separate long-term-cacheable chunk via SplitChunksPlugin, code-splits routes via dynamic import() so users only download the JS for the page they're viewing, extracts CSS into hashed files via MiniCssExtractPlugin for parallel loading and caching, and generates production source maps uploaded privately to an error-tracking service rather than served publicly.",
      "bestPractices": [
        "Use mode: 'production' for optimized builds — don't hand-roll optimizations Webpack already provides",
        "Split code with dynamic import() for routes/heavy features rather than one monolithic bundle",
        "Extract CSS to separate files in production via MiniCssExtractPlugin instead of injecting via JS",
        "Configure SplitChunksPlugin to deduplicate shared vendor code across entry points",
        "Use content-hashed output filenames for effective long-term browser caching",
        "Keep loaders scoped narrowly (via include/exclude) to avoid unnecessarily processing files like node_modules",
        "Generate but don't publicly ship production source maps — upload them privately to error monitoring instead"
      ],
      "tradeOffs": "Advantages: highly configurable, mature plugin/loader ecosystem, fine-grained control over bundling, caching, and code splitting for large applications. Disadvantages: configuration complexity and maintenance burden is significant compared to newer zero-config-leaning tools (Vite, esbuild); build speed can be slower than esbuild/Rollup-based alternatives, especially in large monorepos; misconfiguration (e.g. missing include/exclude on loaders) can silently cause slow or broken builds.",
      "commonMistakes": [
        "Interview trap: confusing what loaders do (per-file transforms) with what plugins do (compilation-lifecycle hooks)",
        "Not code-splitting a large app, shipping one massive initial bundle",
        "Injecting CSS via JS (style-loader) in production instead of extracting to real cacheable files",
        "Forgetting include/exclude on loaders, causing them to slowly process node_modules unnecessarily",
        "Publicly shipping production source maps, exposing original source code",
        "Not configuring long-term caching via content hashes, invalidating the entire bundle on every deploy unnecessarily"
      ],
      "followUpQuestions": [
        "What's the difference between a loader and a plugin in Webpack?",
        "How does dynamic import() enable automatic code splitting?",
        "How would you configure SplitChunksPlugin to deduplicate vendor code across entry points?",
        "Why should production source maps not be served publicly, and how do you still get value from them?",
        "How does Webpack's tree-shaking rely on ES module static structure?"
      ],
      "relatedTopics": ["Code splitting", "Loaders vs plugins", "Tree shaking", "Source maps", "Module resolution", "Babel"]
    }
  },
  {
    "detail": {
      "id": "jsx3-32",
      "questionNumber": "JSX3-032",
      "title": "What Babel Is and Why It Matters",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      "frequency": 4,
      "category": "Build Tools",
      "part": "DevOps/Cloud",
      "concepts": ["Babel", "Transpilation", "AST", "Polyfills vs transforms", "browserslist"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is Babel, and why is it important in modern JavaScript development?"
    },
    "answer": {
      "expectedAnswer": "Babel is a JavaScript compiler (transpiler) that parses modern JS/JSX/TypeScript syntax into an AST, applies configurable plugin transforms, and generates equivalent code targeting older JS environments, so developers can write current-syntax code (optional chaining, JSX, class fields) while still supporting browsers that don't natively understand it. It's important because it decouples the syntax developers write from the runtime compatibility the shipped code needs to guarantee.",
      "deepExplanation": "Babel's pipeline is parse (source text to an Abstract Syntax Tree via @babel/parser) → transform (plugins visit and mutate AST nodes matching specific syntax patterns) → generate (AST back to source text) — this is the same general architecture as most compilers, just targeting JS-to-JS rather than JS-to-bytecode. @babel/preset-env is the most commonly used preset: given a browserslist target (a config specifying which browsers/versions to support), it automatically includes only the transforms actually needed for that target, so a project targeting only modern evergreen browsers ships far less transform-generated code than one supporting IE11. It's critical to distinguish syntax transforms from polyfills: Babel transforms syntax (arrow functions become function expressions, optional chaining becomes a conditional expression chain) but does not add missing runtime APIs (Promise, Array.prototype.flat, fetch) — that's the job of a separate polyfill strategy, historically core-js included via @babel/preset-env's useBuiltIns option, or more recently often handled by a CDN-served differential polyfill service that only serves what a given browser actually lacks. JSX transformation is itself just a Babel plugin (@babel/plugin-transform-react-jsx) that converts JSX syntax into React.createElement (or, with the newer automatic runtime, an auto-imported jsx() call) calls — JSX was never a JS or browser standard, it only ever existed as syntax Babel (or the TypeScript compiler) understands and compiles away. Babel is also the mechanism behind many non-standard-but-popular syntax features used before they reach a finished TC39 stage (decorators, for instance), letting teams use proposed syntax early at the cost of it potentially changing before finalization.",
      "productionExample": "Every Create React App/Next.js/typical React build pipeline runs Babel (or in newer/faster setups, a Babel-compatible tool like SWC) to compile JSX and modern syntax down to a browserslist-targeted output, paired with a polyfill strategy (often via core-js or a service like polyfill.io) so the shipped bundle works correctly across the project's actually-supported browser matrix.",
      "bestPractices": [
        "Define an accurate browserslist target so preset-env only includes transforms actually needed",
        "Separate syntax transforms (Babel) from runtime polyfills (core-js or similar) — Babel alone doesn't add missing APIs",
        "Avoid over-broad polyfill inclusion; use differential/targeted polyfilling where possible",
        "Keep Babel config centralized and consistent across a monorepo rather than duplicated per package",
        "Consider faster Babel-compatible alternatives (SWC, esbuild) for large codebases where build speed matters",
        "Periodically narrow the browserslist target as old browser usage drops, reducing shipped transform overhead"
      ],
      "tradeOffs": "Advantages: lets developers write current/proposed syntax while guaranteeing compatibility with a defined browser matrix; plugin architecture is highly extensible (custom transforms, JSX, TypeScript stripping); preset-env's browserslist integration avoids over-transforming for modern-only targets. Disadvantages: adds build time, especially at scale, compared to newer Rust/Go-based compilers (SWC, esbuild); syntax transforms alone don't solve missing runtime APIs, a common source of confusion; broad or misconfigured browserslist targets can bloat bundles with unnecessary transforms/polyfills.",
      "commonMistakes": [
        "Interview trap: assuming Babel automatically polyfills missing APIs like Promise or fetch — it only transforms syntax by default",
        "Using an overly conservative browserslist target that ships unnecessary transform overhead to modern browsers",
        "Not distinguishing between what Babel does and what the bundler (Webpack/Vite) does",
        "Forgetting JSX itself is not standard JS/browser syntax, only compiled-away Babel/TS syntax",
        "Duplicating inconsistent Babel configs across a monorepo's packages",
        "Ignoring Babel's build-time cost at scale when a faster alternative (SWC/esbuild) would suffice"
      ],
      "followUpQuestions": [
        "What's the difference between what Babel does and what a polyfill library does?",
        "How does @babel/preset-env decide which transforms to include for a given target?",
        "How is JSX actually compiled by Babel under the hood?",
        "Why might a team switch from Babel to SWC or esbuild?",
        "How would you set up differential polyfilling so modern browsers don't download unnecessary polyfills?"
      ],
      "relatedTopics": ["Abstract Syntax Tree", "browserslist", "core-js polyfills", "JSX transform", "SWC/esbuild", "TC39 proposal stages"]
    }
  },
  {
    "detail": {
      "id": "jsx3-33",
      "questionNumber": "JSX3-033",
      "title": "Setting Up ESLint and Prettier",
      "difficulty": "Easy",
      "companies": ["Meta", "Amazon", "Microsoft", "Netflix", "Zoho"],
      "frequency": 4,
      "category": "Build Tools",
      "part": "DevOps/Cloud",
      "concepts": ["ESLint rules", "Prettier formatting", "eslint-config-prettier", "Pre-commit hooks", "lint-staged"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "How do you set up ESLint and Prettier for consistent code formatting?"
    },
    "answer": {
      "expectedAnswer": "ESLint catches code-quality and correctness issues (unused variables, incorrect hook dependencies, potential bugs) via configurable rules, while Prettier is an opinionated formatter that only handles whitespace/style (indentation, quote style, line length) with no configurable rule debates. They're combined by installing eslint-config-prettier to disable any ESLint formatting rules that would conflict with Prettier's output, letting each tool own its distinct responsibility, then wiring both into pre-commit hooks (via Husky + lint-staged) and CI to enforce them automatically.",
      "deepExplanation": "ESLint parses code into an AST and runs configurable rule plugins against it, ranging from correctness rules (no-unused-vars, react-hooks/exhaustive-deps) to stylistic rules (though these overlap with what Prettier does) — a project typically extends a shared config (eslint-config-airbnb, eslint-config-react-app, or a custom one) rather than hand-picking every rule. Prettier deliberately has very few configuration options by design philosophy: it reformats code to a single consistent style regardless of how it was originally written, ending 'tabs vs spaces' or 'single vs double quote' debates entirely by removing the choice, and it's run either as a save-time editor action, a pre-commit hook, or a CI check that fails if code isn't already formatted. Running both together without configuration causes conflicts: some ESLint stylistic rules (e.g. requiring specific indentation) would fight with Prettier's own opinion on indentation, so eslint-config-prettier is included last in the ESLint config's extends array specifically to turn off all ESLint rules that overlap with Prettier's formatting domain, leaving ESLint to focus purely on code quality/correctness and Prettier to own 100% of formatting. Husky installs Git hooks (like pre-commit) and lint-staged runs linters/formatters only against the files actually staged for commit rather than the whole repo, which keeps commit-time checks fast even in a large codebase — a typical setup runs `eslint --fix` and `prettier --write` on staged files before allowing the commit to proceed, auto-fixing what can be auto-fixed and blocking the commit on remaining lint errors that need manual attention.",
      "productionExample": "A typical team setup runs ESLint+Prettier via lint-staged on every git commit (auto-fixing formatting and simple lint issues, blocking on real errors), and again as a required CI check on every pull request so formatting/lint issues can never be merged regardless of whether a contributor's local hooks were bypassed.",
      "bestPractices": [
        "Include eslint-config-prettier last in the ESLint extends array to disable conflicting formatting rules",
        "Let ESLint own correctness/code-quality rules and Prettier own 100% of formatting decisions",
        "Run lint/format checks via pre-commit hooks (Husky + lint-staged) scoped to staged files for speed",
        "Also enforce lint/format checks in CI, since local hooks can be bypassed with --no-verify",
        "Use a shared, versioned config (not per-developer editor settings) so formatting is consistent across the team",
        "Enable format-on-save in editors to keep the feedback loop fast and avoid large formatting-only diffs later"
      ],
      "tradeOffs": "Advantages: eliminates entire categories of code review debate (formatting style) and catches real bugs early via lint rules; automated pre-commit/CI enforcement keeps a large codebase consistent without manual review effort. Disadvantages: initial setup and config conflicts require care (eslint-config-prettier is a common trip-up if omitted); overly strict or unfamiliar rule sets can slow down new contributors; pre-commit hooks add friction to the commit flow if misconfigured or slow.",
      "commonMistakes": [
        "Not including eslint-config-prettier, causing ESLint and Prettier to fight over formatting rules",
        "Interview trap: assuming ESLint and Prettier serve the same purpose — ESLint is about code quality/correctness, Prettier is purely about formatting",
        "Only enforcing lint/format locally without a CI check, letting --no-verify commits slip through",
        "Running lint-staged/Husky against the entire repo instead of just staged files, slowing every commit",
        "Using inconsistent per-developer editor formatting settings instead of a shared committed config",
        "Ignoring lint warnings indefinitely until they accumulate into an unmanageable backlog"
      ],
      "followUpQuestions": [
        "What's the difference in responsibility between ESLint and Prettier?",
        "Why is eslint-config-prettier needed, and what does it actually do?",
        "How would you set up lint-staged to only check files staged for commit?",
        "Why is a CI lint check still necessary if pre-commit hooks are already enforced locally?",
        "How would you roll out a stricter ESLint rule set to a large existing codebase without blocking everyone's workflow?"
      ],
      "relatedTopics": ["Husky", "lint-staged", "eslint-config-prettier", "Pre-commit hooks", "CI/CD enforcement", "AST-based linting"]
    }
  },
  {
    "detail": {
      "id": "jsx3-34",
      "questionNumber": "JSX3-034",
      "title": "Benefits of Source Maps in Debugging",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Netflix", "Adobe", "Stripe"],
      "frequency": 3,
      "category": "Build Tools",
      "part": "DevOps/Cloud",
      "concepts": ["Source maps", "Minification", "devtool option", "Error monitoring integration", "Security of source maps"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are the benefits of using source maps in debugging?"
    },
    "answer": {
      "expectedAnswer": "A source map is a file that maps positions in transformed/minified/transpiled output code back to the corresponding position in the original source, letting browser DevTools and error-monitoring tools show readable original file names, line numbers, and variable names instead of an unreadable single-line minified bundle. This means breakpoints, stack traces, and console errors in production-built code can be debugged as if you were looking at the original TypeScript/JSX source.",
      "deepExplanation": "Without a source map, a production error's stack trace points to something like `bundle.js:1:48213`, which is functionally useless for diagnosis since minification strips whitespace, renames variables to single letters, and concatenates many original files into one line — a source map (a JSON file with a mapping encoding, typically referenced via a `//# sourceMappingURL=` comment at the end of the built file) lets tooling reverse that transformation, reconstructing the original file, line, column, and even original variable/function names for display. Build tools expose a devtool/source-map option with several strategies trading build speed against mapping accuracy and output size — eval-based source maps rebuild fast for local development but are less precise, while full external source maps (recommended for production) are slower to generate but give exact, high-fidelity mappings. The critical production consideration is that source maps should generally not be publicly served alongside the bundle, since they effectively expose your original, unminified source code (including comments, internal file structure, sometimes even accidentally-included secrets) to anyone who opens DevTools — the standard practice is generating source maps during the build, uploading them privately to an error-monitoring service (Sentry, Bugsnag, Datadog) via their build-integration API, and configuring the deployed bundle's sourceMappingURL to either point nowhere public or be stripped from the publicly served files entirely, so only the monitoring service (which authenticates the upload) can de-minify stack traces server-side when displaying an error report to the team.",
      "productionExample": "A CI/CD pipeline typically runs the production build with source maps enabled, immediately uploads the generated .map files to Sentry (associated with that exact release/version), and then deploys only the minified JS/CSS (without the .map files) to the public CDN — so a user's browser never has access to original source, but the team's Sentry dashboard shows fully readable, original-source stack traces for every production error.",
      "bestPractices": [
        "Generate source maps for production builds to enable readable error monitoring",
        "Never publicly serve production source maps — upload them privately to your error-monitoring service instead",
        "Associate uploaded source maps with a specific release/version so stack traces map correctly over time",
        "Use faster, less precise source map strategies for local development and precise ones for production builds",
        "Verify source maps are correctly generated and uploaded as part of the deploy pipeline, not as an afterthought",
        "Strip or gate sourceMappingURL references from publicly deployed bundle files"
      ],
      "tradeOffs": "Advantages: makes production debugging of minified/transpiled code tractable, turning meaningless minified stack traces into exact original-source locations; integrates directly with error-monitoring tooling for automatic de-minification. Disadvantages: publicly exposing source maps leaks original source code, a real security/IP consideration; generating high-fidelity source maps adds build time; keeping uploaded source maps correctly versioned against each deployed release requires disciplined CI/CD tooling.",
      "commonMistakes": [
        "Interview trap: publicly deploying production source maps alongside the bundle, exposing original source code to anyone",
        "Not uploading source maps to the error-monitoring service, leaving production stack traces unreadable",
        "Mismatching a source map's version against the actually-deployed bundle version, producing incorrect de-minified traces",
        "Using an inaccurate/fast source map strategy in production where precision actually matters",
        "Forgetting to regenerate and re-upload source maps on every deploy, not just the first one",
        "Assuming source maps are only relevant for JS, when they matter equally for minified/bundled CSS"
      ],
      "followUpQuestions": [
        "Why shouldn't production source maps be served publicly, and how do you still get their benefit?",
        "How would you associate an uploaded source map with a specific production release in an error-monitoring tool?",
        "What are the trade-offs between different devtool/source-map generation strategies in a build tool?",
        "How does a source map actually encode the mapping between minified and original positions?",
        "How would you debug a production error report that shows an unreadable minified stack trace?"
      ],
      "relatedTopics": ["Minification", "Error monitoring (Sentry)", "Webpack devtool option", "Release versioning", "Build pipeline security"]
    }
  },
  {
    "detail": {
      "id": "jsx3-35",
      "questionNumber": "JSX3-035",
      "title": "Optimizing Build Processes for Large Projects",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      "frequency": 3,
      "category": "Build Tools",
      "part": "DevOps/Cloud",
      "concepts": ["Incremental builds", "Build caching", "Parallelization", "Bundle analysis", "Monorepo build orchestration"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you optimize build processes for performance in large projects?"
    },
    "answer": {
      "expectedAnswer": "Optimize both build-time performance (faster CI/local builds) and output performance (smaller, better-cached bundles for end users): use build/module caching and incremental builds to avoid redoing unchanged work, parallelize independent build steps, code-split and tree-shake to reduce shipped bundle size, and, for monorepos, use a task orchestrator (Turborepo, Nx) that caches and parallelizes builds across packages based on actual dependency and change graphs.",
      "deepExplanation": "Build-time optimization starts with caching: most modern bundlers/compilers (Webpack's persistent cache, Turborepo/Nx's remote caching) can skip re-processing files/packages whose inputs haven't changed since the last build, turning a full rebuild into an incremental one that only touches what actually changed — in a monorepo this extends to skipping entire packages' builds/tests if neither their source nor their dependencies changed, verified via content hashing rather than timestamps for correctness. Parallelization matters at multiple levels: independent packages in a monorepo can build concurrently (bounded by CPU cores), and within a single bundler, some transform work (like Babel/TS transpilation) can be offloaded to worker threads (thread-loader, babel-loader's parallelization) rather than running single-threaded. On the output side, code splitting via dynamic import() plus a bundler's automatic vendor-chunk splitting reduces how much JS a user must download and parse before initial interactivity, and tree-shaking (which relies on ES module static structure) eliminates unused exports, both directly reducing shipped bytes rather than just build time. Bundle analysis tools (webpack-bundle-analyzer, source-map-explorer) visualize what's actually contributing to bundle size, which is usually the fastest way to find an unexpectedly large dependency, a duplicated package version, or an accidentally-bundled server-only module. For very large codebases, switching from a JS-based transpiler/bundler (Babel, Webpack) to a Rust/Go-based one (SWC, esbuild, Rspack, Turbopack) can produce order-of-magnitude build speed improvements since compiled-language tools avoid the JS interpreter/GC overhead the equivalent JS tooling incurs on every file. Continuous measurement matters as much as any single optimization — tracking build time and bundle size over time in CI (failing a PR that regresses bundle size beyond a budget) prevents slow regression back to a slow/bloated state after the initial optimization work.",
      "productionExample": "A large monorepo at scale typically combines Turborepo/Nx for cross-package build caching and parallelization, esbuild/SWC for fast individual package transpilation, dynamic import()-based route-level code splitting, and a CI bundle-size budget check that fails a PR if the main bundle grows beyond a set threshold without an explicit justification.",
      "bestPractices": [
        "Enable persistent/remote build caching so unchanged work is never redone",
        "Parallelize independent build steps and packages rather than building serially",
        "Code-split and tree-shake aggressively to reduce shipped bundle size, not just build time",
        "Use bundle analysis tooling regularly to catch unexpected size regressions",
        "Consider a Rust/Go-based build tool (esbuild, SWC) for large codebases where JS-based tooling is the bottleneck",
        "Set and enforce a bundle-size budget in CI to prevent silent regressions over time",
        "Use content-hash-based caching (not timestamps) for correctness in incremental/monorepo builds"
      ],
      "tradeOffs": "Advantages: caching, parallelization, and faster tooling meaningfully cut both developer iteration time and CI cost at scale; output-side optimization (code splitting, tree-shaking) directly improves real user load performance. Disadvantages: build caching correctness bugs (stale cache serving outdated output) are subtle and hard to debug; migrating to a faster build tool (esbuild/SWC) can surface plugin/feature compatibility gaps with the previous toolchain; monorepo build orchestration adds its own configuration and mental-model complexity.",
      "commonMistakes": [
        "Interview trap: conflating build-time optimization (faster CI) with output-size optimization (smaller bundles) — they require different techniques",
        "Using timestamp-based instead of content-hash-based caching, causing stale-cache correctness bugs",
        "Not measuring bundle size/build time trends over time, allowing silent regressions to accumulate",
        "Serially building independent monorepo packages instead of parallelizing based on the actual dependency graph",
        "Migrating to a faster build tool without verifying feature/plugin parity, breaking edge-case functionality",
        "Chasing build-speed optimization while ignoring shipped bundle size, which is what actually affects end users"
      ],
      "followUpQuestions": [
        "What's the difference between optimizing build time and optimizing output bundle size?",
        "How does content-hash-based build caching avoid the correctness pitfalls of timestamp-based caching?",
        "How would you find and fix an unexpectedly large dependency in a production bundle?",
        "What are the trade-offs of migrating from Webpack/Babel to esbuild/SWC for a large codebase?",
        "How would you enforce a bundle-size budget in CI?"
      ],
      "relatedTopics": ["Turborepo/Nx", "esbuild/SWC", "Tree shaking", "Bundle analysis", "Content-hash caching", "Code splitting"]
    }
  },
  {
    "detail": {
      "id": "jsx3-36",
      "questionNumber": "JSX3-036",
      "title": "Implementing a Custom Iterator",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      "frequency": 3,
      "category": "Iterators and Generators",
      "part": "Advanced JS",
      "concepts": ["Iterator protocol", "Symbol.iterator", "Iterable protocol", "for...of", "next() method"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How would you implement an iterator in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "An object is an iterator if it has a next() method returning { value, done } objects, and it's iterable if it implements Symbol.iterator, a method returning an iterator — implementing Symbol.iterator on an object lets it work with for...of, spread syntax, and destructuring. The simplest way to write one manually is to close over state and return an object with a next() method that returns the next value and a done flag once exhausted.",
      "deepExplanation": "The iterator protocol requires an object with a next() method that returns { value: any, done: boolean } on each call — done: false while values remain, and done: true (with value typically undefined) once exhausted; some iterators also implement an optional return()/throw() for cleanup when iteration stops early (e.g. a for...of loop broken with break). The separate iterable protocol requires an object to have a [Symbol.iterator]() method returning an iterator — this indirection (iterable produces an iterator, rather than being the iterator itself) is what allows the same iterable to be iterated multiple times independently, each for...of call requesting a fresh iterator. Arrays, Strings, Maps, Sets, and arguments are all built-in iterables; plain objects are not, which is precisely why for...of throws on a plain object but works on an array. To make a custom object iterable, you implement [Symbol.iterator] yourself, either manually maintaining next() state via closures, or — much more commonly in practice — using a generator function as the Symbol.iterator implementation, since generator objects automatically satisfy the iterator protocol.\n\n```js\nclass Range {\n  constructor(start, end) {\n    this.start = start;\n    this.end = end;\n  }\n  [Symbol.iterator]() {\n    let current = this.start;\n    const end = this.end;\n    return {\n      next() {\n        if (current < end) {\n          return { value: current++, done: false };\n        }\n        return { value: undefined, done: true };\n      },\n    };\n  }\n}\n\nfor (const n of new Range(1, 4)) {\n  console.log(n); // 1, 2, 3\n}\nconsole.log([...new Range(1, 4)]); // [1, 2, 3]\n```",
      "productionExample": "Custom data structures like a linked list, a paginated API result wrapper, or a tree traversal utility commonly implement Symbol.iterator so consumers can use natural for...of loops, spread syntax, and destructuring against them exactly as they would with a built-in array, rather than exposing a bespoke traversal method.",
      "bestPractices": [
        "Implement Symbol.iterator to return a fresh iterator each call so the iterable can be traversed multiple times independently",
        "Prefer a generator function as the Symbol.iterator implementation over hand-writing next() manually when possible",
        "Always return { value, done: true } once exhausted rather than throwing or returning undefined",
        "Implement an optional return() method if the iterator holds resources that need cleanup on early break",
        "Keep iterator state encapsulated via closures rather than exposing it as mutable object properties",
        "Test both full iteration (for...of) and early termination (break) paths"
      ],
      "tradeOffs": "Advantages: custom iterables integrate seamlessly with for...of, spread, destructuring, and any API expecting an iterable, without exposing internal data structure; lazy iterators can represent infinite or very large sequences without materializing them fully in memory. Disadvantages: hand-writing next()-based iterators manually is verbose and easy to get subtly wrong (forgetting the done flag, not resetting state per call); debugging manual iterator state machines is harder than reading a generator function's linear code.",
      "commonMistakes": [
        "Interview trap: implementing Symbol.iterator to return `this` when the object also holds the iteration state directly, breaking independent multiple iterations of the same object",
        "Forgetting to return done: true once exhausted, causing an infinite loop with for...of",
        "Confusing the iterator protocol (has next()) with the iterable protocol (has Symbol.iterator)",
        "Mutating shared state instead of closing over per-iterator local state, causing concurrent iterations to interfere",
        "Not handling early termination (break) via an optional return() method when cleanup is needed",
        "Assuming plain objects are iterable by default — they are not, without an explicit Symbol.iterator"
      ],
      "followUpQuestions": [
        "What's the difference between the iterator protocol and the iterable protocol?",
        "Why should Symbol.iterator return a new iterator each time rather than `this`?",
        "How would you implement an infinite iterator, and how would a consumer safely use it?",
        "What is the optional return() method for, and when does the engine call it?",
        "How do generators simplify implementing the iterator protocol compared to hand-writing next()?"
      ],
      "relatedTopics": ["Symbol.iterator", "for...of loops", "Generators", "Spread syntax", "Destructuring", "Lazy evaluation"]
    }
  },
  {
    "detail": {
      "id": "jsx3-37",
      "questionNumber": "JSX3-037",
      "title": "Generators vs Regular Functions",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Adobe", "Uber"],
      "frequency": 4,
      "category": "Iterators and Generators",
      "part": "Advanced JS",
      "concepts": ["function*", "yield", "Generator object", "Pausable execution", "Two-way communication"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are generators, and how do they differ from regular functions?"
    },
    "answer": {
      "expectedAnswer": "A generator, declared with `function*`, doesn't run to completion when called — calling it returns a generator object (which is both an iterator and iterable) without executing any body code, and execution only proceeds up to the next yield expression each time .next() is called, pausing there and resuming from that exact point on the following call. Regular functions run to completion in one go and can only return a single value once, while generators can produce (yield) a sequence of values over multiple resumable steps and can also receive values back into the paused yield expression.",
      "deepExplanation": "Calling a generator function immediately returns a generator object without executing any of the function body — execution only begins on the first call to .next(), running until it hits a yield expression, at which point it pauses, returns { value: <yielded value>, done: false } to the caller, and suspends with its entire local state (variables, call position) intact. The next .next() call resumes exactly where it paused, continuing until the next yield or a return statement, and any argument passed into that next() call becomes the value the previously-paused yield expression evaluates to, enabling genuine two-way communication between the generator and its caller — not just producing a sequence of values outward, but injecting values inward mid-execution. When the function body finally returns (explicitly or by falling off the end), the generator produces { value: <return value>, done: true }, and any subsequent .next() calls just return { value: undefined, done: true }. Generators also expose .throw(error) (resumes by throwing the error at the paused yield point, letting the generator's own try/catch handle it) and .return(value) (forces early completion, running any pending finally blocks). Because a generator object satisfies the iterator protocol (it has next()) and is itself iterable (it has Symbol.iterator returning itself), it works directly with for...of, spread, and destructuring, which is exactly why generators are the easiest way to implement Symbol.iterator manually.\n\n```js\nfunction* counter() {\n  let count = 0;\n  while (true) {\n    const reset = yield count; // receives value passed to next()\n    count = reset ? 0 : count + 1;\n  }\n}\n\nconst gen = counter();\nconsole.log(gen.next().value);      // 0\nconsole.log(gen.next().value);      // 1\nconsole.log(gen.next(true).value);  // 0 (reset)\n```",
      "productionExample": "Generators underpin Redux-Saga, where each saga is a generator function that yields plain effect descriptors (call an API, put an action) which the saga middleware interprets and resumes the generator with the result — this makes complex async side-effect orchestration synchronously testable, since a generator's yielded values can be asserted step-by-step without actually running async code.",
      "bestPractices": [
        "Use generators for lazily-produced sequences, especially ones that might be infinite or expensive to fully materialize",
        "Use generators to implement Symbol.iterator on custom iterables instead of hand-writing a next() state machine",
        "Use .throw()/.return() deliberately when you need to inject errors or force early cleanup into a paused generator",
        "Avoid generators for simple single-value-returning logic where a regular function is clearer",
        "Remember state closed over by a generator persists across pauses, which is both powerful and a potential memory-retention concern for long-lived generators",
        "Test generator functions by driving them with next() directly rather than converting to an array first when order/laziness matters"
      ],
      "tradeOffs": "Advantages: pausable, resumable execution enables lazy sequences, infinite iterables, and cooperative multitasking-like patterns; two-way communication via next(value) allows injecting data mid-execution; naturally satisfies the iterator protocol. Disadvantages: generator-based control flow is less familiar/readable to developers unused to the pattern; debugging paused generator state across many resumptions is harder than linear function execution; overusing generators for simple cases adds unnecessary complexity compared to a plain function or array.",
      "commonMistakes": [
        "Interview trap: assuming calling a generator function executes its body immediately like a regular function — it only returns a generator object until .next() is called",
        "Forgetting the value passed to next() becomes the result of the previously paused yield expression, not the next one",
        "Assuming a generator's returned value (done: true) is included when spreading/for...of iterating it — it's not, only yielded values are collected",
        "Not handling a generator that never terminates (infinite loop) being fully drained by a technique that requires completion, like [...gen] or Array.from",
        "Confusing yield (pauses and produces one value) with return (ends the generator entirely)",
        "Not accounting for closed-over state persisting in memory for the generator object's lifetime"
      ],
      "followUpQuestions": [
        "What exactly happens when you call a generator function versus calling next() on it?",
        "How does passing a value to next() communicate back into the generator's paused execution?",
        "What's the difference between a yielded value and a generator's final return value in terms of iteration?",
        "How would you safely consume an infinite generator?",
        "How do Redux-Saga or similar libraries use generators to make async logic testable?"
      ],
      "relatedTopics": ["Iterator protocol", "yield expressions", "Redux-Saga", "Coroutines", "Lazy evaluation", "Async generators"]
    }
  },
  {
    "detail": {
      "id": "jsx3-38",
      "questionNumber": "JSX3-038",
      "title": "Lazy Evaluation with Generators",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Netflix", "Stripe", "Uber"],
      "frequency": 3,
      "category": "Iterators and Generators",
      "part": "Advanced JS",
      "concepts": ["Lazy evaluation", "Infinite sequences", "Generator composition", "yield*", "Memory efficiency"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you use generators for lazy evaluation in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "Because a generator only computes the next value when .next() is actually called, it naturally supports lazy evaluation: values are produced on demand rather than all upfront, which lets you represent infinite or very large sequences and only pay the computation/memory cost for the values a consumer actually pulls, often combined with early termination via break to stop computing entirely once enough values are found.",
      "deepExplanation": "An eager approach to generating, say, the first N Fibonacci numbers under some condition would need to compute the whole array before filtering/limiting it, wasting work if the condition is checked after full materialization; a generator instead yields one Fibonacci number at a time, and a consumer using a for...of loop with a break (or a taking a fixed number of values via a small helper) only ever executes as many next() steps as it actually needs, leaving the rest of a conceptually infinite sequence uncomputed and unmaterialized in memory. This makes generators well suited to representing infinite sequences directly — `function* naturals() { let n = 1; while (true) yield n++; }` — which would be impossible to represent as a real array but is trivial as a lazy generator, since only the currently-requested value needs to exist in memory at any moment. Lazy generator pipelines can be composed by chaining generator functions that each take an iterable and yield transformed values on demand — a lazy `map`, `filter`, or `take` generator util processes one value through the whole pipeline before pulling the next input value, rather than eagerly transforming a full array through each stage as Array.prototype.map/filter would. yield* delegates iteration to another iterable/generator, forwarding its values one at a time as if they were yielded directly by the outer generator, which is the standard way to compose generators without manually re-implementing a nested loop — `function* flatten(iter) { for (const x of iter) { if (isIterable(x)) yield* flatten(x); else yield x; } }` is a common example. The main practical benefit over an eager array-based pipeline is avoiding intermediate array allocations for large datasets and enabling early termination to short-circuit expensive computation once enough results are found, at the cost of code that's less immediately readable than a chain of familiar array methods.",
      "productionExample": "A search or pagination feature that needs to find the first 10 results matching an expensive filter out of a potentially huge dataset can use a lazy generator pipeline (source generator → filter generator → take(10)) so filtering stops as soon as 10 matches are found, rather than eagerly filtering the entire dataset with Array.prototype.filter before slicing.",
      "bestPractices": [
        "Use generators to represent infinite or very large conceptual sequences instead of materializing arrays",
        "Combine lazy generators with early termination (break, or a take() helper) to avoid unnecessary computation",
        "Use yield* to compose/delegate to nested generators instead of manually re-implementing iteration",
        "Prefer lazy generator pipelines over chained array methods when working with very large datasets to avoid intermediate array allocations",
        "Keep each stage of a lazy pipeline as a small, focused generator function for readability",
        "Document/name lazy generator-based utilities clearly, since their evaluation order isn't as immediately obvious as array methods"
      ],
      "tradeOffs": "Advantages: computes only what's actually needed, supports genuinely infinite sequences, avoids intermediate array allocations in multi-stage pipelines, enables cheap early termination. Disadvantages: lazy generator pipelines are less immediately readable than familiar chained array methods for developers unfamiliar with the pattern; debugging requires understanding pause/resume semantics rather than inspecting a fully materialized intermediate array; composing many generator stages can be harder to step through than equivalent array method chains.",
      "commonMistakes": [
        "Interview trap: assuming Array.prototype.map/filter are lazy — they eagerly compute a full new array at each stage, unlike a generator pipeline",
        "Materializing an infinite generator into an array (e.g. [...infiniteGen()]) without a bound, causing an infinite loop/memory exhaustion",
        "Not using yield* and instead manually looping and yielding each sub-value, adding unnecessary boilerplate",
        "Forgetting that a lazy pipeline only executes as values are pulled — side effects inside it won't run until consumption happens",
        "Overusing generator-based laziness for small, finite datasets where it adds complexity without meaningful benefit",
        "Not providing an early-exit path (break/take) when working with a lazily infinite sequence"
      ],
      "followUpQuestions": [
        "How does a generator-based pipeline differ from chaining Array.prototype.map/filter in terms of when computation happens?",
        "How would you implement a lazy take(n) helper that works with any generator?",
        "What does yield* do, and how does it simplify generator composition?",
        "How would you safely represent and consume an infinite sequence?",
        "When would a lazy generator pipeline actually outperform an eager array-based one in practice?"
      ],
      "relatedTopics": ["yield* delegation", "Infinite sequences", "Generator composition", "Array method chaining", "Memory efficiency"]
    }
  },
  {
    "detail": {
      "id": "jsx3-39",
      "questionNumber": "JSX3-039",
      "title": "Async Generators and Their Use Cases",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Stripe"],
      "frequency": 3,
      "category": "Iterators and Generators",
      "part": "Advanced JS",
      "concepts": ["async function*", "for await...of", "Symbol.asyncIterator", "Streaming data", "Async iterator protocol"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "What are async generators, and when would you use them?"
    },
    "answer": {
      "expectedAnswer": "An async generator, declared with `async function*`, combines generators with promises: each yielded value can itself be awaited internally, and calling .next() returns a Promise resolving to { value, done } rather than that shape directly. Consumers iterate them with `for await...of`, making async generators the natural tool for representing streaming or paginated data sources where each 'next item' requires its own asynchronous fetch — think reading a paginated API result set, a readable stream, or a websocket message queue one chunk at a time.",
      "deepExplanation": "An async generator is both a generator and effectively an async function: inside its body you can use await for asynchronous work before yielding a value, and each call to .next() returns a Promise (not a plain { value, done } object) that resolves once the generator either yields the next value or completes — this makes it satisfy the async iterator protocol, whose object must implement [Symbol.asyncIterator] returning an object with an async next() method. `for await...of` is the syntax that consumes an async iterable, automatically awaiting each .next() Promise before processing the yielded value, which is the async analog of a plain for...of loop over a synchronous generator. A common real use case is paginating through an API: `async function* fetchAllPages(url) { let next = url; while (next) { const res = await fetch(next); const { items, nextUrl } = await res.json(); yield* items; next = nextUrl; } }` lets a consumer write `for await (const item of fetchAllPages(url)) { ... }` and process items as pages arrive, without manually managing pagination state or materializing the entire result set in memory before processing begins. Node.js Readable streams already implement Symbol.asyncIterator, so they can be consumed directly with for await...of instead of manual 'data'/'end' event listeners, which is a much cleaner style for sequential stream processing. Error handling works via standard try/catch around the for await...of loop (a rejected internal promise propagates as a thrown error at the corresponding iteration step), and early termination (break inside the loop) triggers the async generator's return(), letting it clean up any held resources (like closing a database cursor or file handle) in a finally block.\n\n```js\nasync function* paginate(url) {\n  let next = url;\n  while (next) {\n    const res = await fetch(next);\n    const { items, nextUrl } = await res.json();\n    yield* items;\n    next = nextUrl;\n  }\n}\n\nfor await (const item of paginate('/api/items?page=1')) {\n  console.log(item);\n}\n```",
      "productionExample": "GraphQL subscription clients, database cursor wrappers, and Node.js stream-processing pipelines commonly expose async generators/async iterables as their public API, letting consumers use a plain for await...of loop to process a potentially unbounded, arriving-over-time sequence of results without manually juggling callbacks, buffering, or backpressure themselves.",
      "bestPractices": [
        "Use async generators to model any source that produces items asynchronously and sequentially (pagination, streams, subscriptions)",
        "Consume async generators with for await...of rather than manually chaining .next() Promise calls",
        "Wrap for await...of loops in try/catch to handle rejected internal promises cleanly",
        "Implement cleanup in a finally block inside the generator so early break/return still releases held resources",
        "Use yield* to delegate to another async iterable within an async generator, exactly as with sync generators",
        "Avoid materializing the entire async sequence into an array unless you genuinely need random access to all items at once"
      ],
      "tradeOffs": "Advantages: elegantly models streaming/paginated async data sources without manual callback or buffering logic; integrates cleanly with Node streams and other async-iterable-based APIs; supports natural early termination with proper resource cleanup. Disadvantages: less familiar to many developers than plain async/await or Promise chains, raising the learning curve; each .next() call incurs a Promise's microtask overhead, which matters for extremely high-throughput scenarios; debugging paused async generator state across many awaited resumptions is more complex than linear async/await code.",
      "commonMistakes": [
        "Interview trap: assuming an async generator's .next() returns { value, done } synchronously rather than a Promise of that shape",
        "Using a plain for...of loop on an async generator instead of for await...of, getting Promise objects instead of resolved values",
        "Not handling errors thrown inside the generator, letting a rejection propagate unhandled",
        "Forgetting cleanup logic in a finally block, leaking resources when a consumer breaks out of the loop early",
        "Materializing an entire async generator's output into an array when true streaming/lazy processing was the actual goal",
        "Confusing Symbol.iterator (sync) with Symbol.asyncIterator (async) when implementing a custom async-iterable class"
      ],
      "followUpQuestions": [
        "How does for await...of differ from a plain for...of loop when consuming an async generator?",
        "What does an async generator's .next() actually return, precisely?",
        "How would you clean up a held resource (like a DB cursor) when a consumer breaks out of a for await...of loop early?",
        "How do Node.js Readable streams relate to the async iterator protocol?",
        "How would you implement a paginated API consumer as an async generator?"
      ],
      "relatedTopics": ["Symbol.asyncIterator", "for await...of", "Node.js streams", "Backpressure", "Promises", "yield* delegation"]
    }
  },
  {
    "detail": {
      "id": "jsx3-40",
      "questionNumber": "JSX3-040",
      "title": "Combining Iterators and Generators for Data Processing",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      "frequency": 2,
      "category": "Iterators and Generators",
      "part": "Advanced JS",
      "concepts": ["Generator composition", "Pipeline pattern", "yield*", "Lazy transformation chains", "Backpressure"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you combine iterators and generators for complex data processing tasks?"
    },
    "answer": {
      "expectedAnswer": "Build a pipeline of small generator functions, each taking an iterable as input and yielding transformed values, then chain them together (map(filter(take(source, n), predicate), transformFn)) so a single value flows through every stage before the next value is pulled from the source — this composes complex, memory-efficient, lazily-evaluated data processing out of small reusable pieces, and yield* lets one generator delegate to or flatten another cleanly.",
      "deepExplanation": "The core pattern is defining small, generic generator utilities that mirror Array.prototype.map/filter/take but operate lazily over any iterable rather than eagerly over an array: `function* map(iter, fn) { for (const x of iter) yield fn(x); }`, `function* filter(iter, pred) { for (const x of iter) if (pred(x)) yield x; }`, `function* take(iter, n) { let i = 0; for (const x of iter) { if (i++ >= n) return; yield x; } }`. Because each stage only pulls from its input generator when its own next() is called, chaining them (`take(filter(map(source, double), isEven), 5)`) produces a pipeline where a single source value is mapped, then filtered, then possibly yielded, entirely before the next source value is even requested — this means a source generator representing an unbounded stream (sensor readings, an infinite sequence, a paginated API) can be processed through a nontrivial pipeline while only ever holding one value in flight, and take(..., 5) causes the entire pipeline to stop pulling from the source the moment 5 results have been produced, which an eager array-based equivalent could never achieve without manually re-implementing early exit at every stage. yield* is the composition primitive for delegating to a nested iterable/generator without manually re-looping — used both for simple flattening (`function* flatten(iter) { for (const x of iter) isIterable(x) ? yield* flatten(x) : yield x; }`) and for one generator calling into another as a sub-routine while forwarding its yields transparently, including forwarding values passed into next() and errors passed into throw(). For genuinely async sources, the same composition pattern applies with async generators and for await...of, additionally requiring attention to backpressure — ensuring a fast-yielding source doesn't overwhelm a slow-consuming downstream stage, which Node.js streams handle via internal buffering/highWaterMark and which a hand-rolled async generator pipeline gets naturally for free since each stage only pulls the next value once it's ready to process it (the async generator protocol itself provides pull-based backpressure by construction).",
      "productionExample": "A log-processing pipeline reading a huge log file line-by-line as an async generator, piping it through a filter generator (only error-level lines), a parse generator (structured JSON), and a take generator (first N matches for a debugging session), processes gigabytes of data with constant memory usage and can stop early the moment enough matches are found, which an eager 'read everything into an array, then filter/map/slice' approach would never achieve on a file too large to fit in memory.",
      "bestPractices": [
        "Build small, single-responsibility generator utilities (map/filter/take/flatten) rather than one monolithic generator",
        "Chain generator stages so each value flows through the full pipeline before the next source value is pulled",
        "Use yield* for delegation/flattening instead of manually re-implementing nested iteration",
        "Rely on take()/early break to short-circuit a pipeline as soon as enough results are found",
        "For async sources, lean on the async generator protocol's natural pull-based backpressure rather than manual buffering",
        "Keep pipeline stages pure/side-effect-free where possible so ordering and laziness stay predictable"
      ],
      "tradeOffs": "Advantages: composes complex processing from small, testable, reusable generator functions; processes arbitrarily large or infinite sources with constant memory via laziness; naturally supports early termination and, for async pipelines, backpressure. Disadvantages: multi-stage generator pipelines are noticeably harder to read/debug than an equivalent chain of familiar array methods for developers unfamiliar with the pattern; performance for small, finite, already-in-memory datasets is often worse than a straightforward array method chain due to generator/iterator protocol overhead; composing many stages of yield* delegation can make stepping through execution in a debugger tedious.",
      "commonMistakes": [
        "Interview trap: assuming a generator pipeline processes all values through stage 1 first, then all through stage 2 (like array methods) rather than one value flowing through every stage before the next is pulled",
        "Reaching for a complex generator pipeline on small, finite, in-memory data where plain array methods would be simpler and clear enough",
        "Forgetting yield* forwards next()-injected values and thrown errors too, not just yielded output values",
        "Not accounting for backpressure in an async generator pipeline when one stage is much slower than another",
        "Building an eager intermediate array between pipeline stages, defeating the entire purpose of laziness",
        "Not providing an early-exit mechanism (take/break) when composing a pipeline over a genuinely unbounded source"
      ],
      "followUpQuestions": [
        "How does value-flow ordering differ between a generator pipeline and a chain of Array.prototype methods?",
        "How would you implement a reusable lazy take(n) or flatten utility as a generator?",
        "How does backpressure work naturally in an async generator pipeline versus a manually buffered stream?",
        "When would a generator-based pipeline actually perform worse than an eager array-based approach?",
        "How would you handle an error thrown partway through a multi-stage generator pipeline?"
      ],
      "relatedTopics": ["yield* delegation", "Pipeline/composition pattern", "Backpressure", "Node.js streams", "Lazy evaluation", "Async iterator protocol"]
    }
  }
];
