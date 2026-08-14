// Derived from frontend/src/document/Part_4_Module_13_ES6_Plus_Features_Master_Handbook.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Netflix',
  'Adobe',
  'Atlassian',
  'Stripe',
  'Uber',
  'Flipkart',
  'Zoho',
];

const CATEGORY = 'ES6+ Features';

const CONCEPTS = [
  'let/const',
  'Template literals',
  'Destructuring',
  'Spread/rest',
  'Optional chaining',
  'Nullish coalescing',
  'Symbols',
  'BigInt',
  'ES modules',
  'Dynamic import',
  'Set/Map',
  'WeakMap/WeakSet',
  'Iterators and generators',
  'Proxy',
  'Reflect',
  'Object.entries/values/fromEntries',
];

const BEST_PRACTICES = [
  'Use `const` by default, `let` when reassignment is required, and avoid `var` in modern code',
  'Prefer template literals over string concatenation',
  'Use destructuring for explicit, readable data extraction',
  'Remember spread cloning is shallow — nested objects are still shared',
  'Use optional chaining (`?.`) only where a value may genuinely be missing',
  "Use `??` instead of `||` when falsy values like `0`, `false`, or `''` must be preserved",
  'Choose `Map`/`Set` for keyed lookups and uniqueness rather than plain objects/arrays when appropriate',
  'Use `WeakMap`/`WeakSet` when associated metadata should not keep an object alive',
  'Delegate Proxy trap handlers to `Reflect` to preserve correct receiver semantics',
  'Confirm target browser/Node.js support and add polyfills or transpilation before relying on a new feature',
  'Measure before assuming a modern syntax choice is a performance win or loss',
];

const COMMON_MISTAKES = [
  'Interview trap: Assuming `const` makes an object immutable — it only prevents reassigning the binding',
  'Interview trap: Assuming spread (`{ ...original }`) deep-clones nested objects',
  'Interview trap: Assuming optional chaining makes an entire expression safe instead of just the part it is applied to',
  'Interview trap: Using `||` for defaults when a valid falsy value like `0` needs to be preserved',
  'Interview trap: Mixing `BigInt` and `Number` directly (`10n + 10`) instead of converting to a matching type',
  'Interview trap: Assuming `JSON.stringify()` can serialize a `BigInt` without explicit conversion',
  'Interview trap: Assuming transpilation alone provides a missing runtime/browser API without a polyfill',
  'Interview trap: Reaching for `Proxy` for its own sake without weighing its overhead and debugging cost',
];

const TRADE_OFFS =
  "Advantages: ES6+ features make scoping predictable (`let`/`const`), data extraction and defaults concise (destructuring, `??`, optional chaining), collections purpose-built (`Map`/`Set`/`WeakMap`/`WeakSet`), and code splitting straightforward (dynamic `import()`). Disadvantages: none of this is free — spread/destructuring copies are shallow, `Proxy` adds real overhead and debugging complexity, `BigInt` cannot mix with `Number` or serialize through `JSON.stringify()` without care, and every feature still needs a browser/Node.js compatibility check (transpilation covers syntax, not missing runtime APIs).";

const FOLLOW_UP_QUESTIONS = [
  'Why does `const user = {}; user.name = "Sam";` work while `user = {}` throws?',
  'Why is spread/rest cloning shallow, and when does that matter?',
  'What is the difference between `||` and `??`, and when would each produce a different result?',
  'When would you choose `Map` over a plain object, or `WeakMap` over `Map`?',
  'How does a `Proxy` trap typically delegate to `Reflect`, and why?',
  'What is the practical difference between `for...in` and `for...of`?',
  'How would you safely transform an object using `Object.entries()`/`Object.fromEntries()`?',
  'What should you check before shipping a modern JavaScript feature to production?',
  'Why can mixing `BigInt` and `Number` throw a `TypeError`?',
  'How would you modernize a legacy codebase using `var`, CommonJS, and `eval` incrementally?',
];

const RELATED_TOPICS = [
  'let and const',
  'Template literals',
  'Destructuring',
  'Spread and rest',
  'Optional chaining and nullish coalescing',
  'Symbols and BigInt',
  'ES modules and dynamic import',
  'Set, Map, WeakMap, WeakSet',
  'Iterators and generators',
  'Proxy and Reflect',
  'Object.entries, Object.values, Object.fromEntries',
  'Browser compatibility and transpilation',
];

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface QuestionSeed {
  id: string;
  number: string;
  title: string;
  difficulty: Difficulty;
  experienceLevel?: string;
  expectedAnswer: string;
  deepExplanation: string;
}

const EXPERIENCE_BY_DIFFICULTY: Record<Difficulty, string> = {
  Easy: '0–2 Years',
  Medium: '2–5 Years',
  Hard: '5–8 Years / 8+ Years',
};

const FREQUENCY_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 5,
  Medium: 4,
  Hard: 3,
};

const QUESTION_SEEDS: QuestionSeed[] = [
  {
    id: 'jsadv-m13-266',
    number: 'JSADV-M13-266',
    title: 'What Are `let` and `const`?',
    difficulty: 'Easy',
    expectedAnswer: '`let` and `const` are block-scoped variable declarations introduced with ES6, replacing the function-scoped, hoisting-prone `var`.',
    deepExplanation:
      "`let count = 1; count = 2;` allows reassignment, while `const name = 'Rasik';` does not. A block like `{ let blockValue = 10; }` makes `blockValue` inaccessible outside the block (`ReferenceError`). `const` only prevents reassigning the binding, not mutating the value: `const user = { name: 'Alex' }; user.name = 'Sam';` succeeds and logs `Sam`, but `user = {}` throws a `TypeError`. Best practice: use `const` by default, `let` when reassignment is required, and avoid `var` in modern application code.",
  },
  {
    id: 'jsadv-m13-267',
    number: 'JSADV-M13-267',
    title: 'What Are Template Literals?',
    difficulty: 'Easy',
    expectedAnswer: 'Template literals, written with backticks, support string interpolation, multiline strings, and tagged templates.',
    deepExplanation:
      "`` `Hello ${name}, age ${age}` `` logs `Hello Alex, age 30`, replacing manual `'Hello ' + name + ', age ' + age` concatenation. They're useful for messages, URLs, safely constructed HTML fragments, logging, and parameterized query generation — but template literals never automatically sanitize untrusted HTML on their own.",
  },
  {
    id: 'jsadv-m13-268',
    number: 'JSADV-M13-268',
    title: 'What Is Destructuring?',
    difficulty: 'Easy',
    expectedAnswer: 'Destructuring extracts values from arrays or properties from objects into individual bindings in one expression.',
    deepExplanation:
      "`const { name, age } = user;` and `const [first, second] = colors;` pull values out directly. Destructuring also supports renaming (`const { name: userName } = user;`) and default values (`const { role = 'user' } = user;`), making data extraction explicit and readable compared to repeated property access.",
  },
  {
    id: 'jsadv-m13-269',
    number: 'JSADV-M13-269',
    title: 'What Are Spread and Rest Operators?',
    difficulty: 'Medium',
    expectedAnswer: 'Both use `...`, but spread expands values (e.g. into a new array/object) while rest collects remaining values into an array.',
    deepExplanation:
      "`[...first, ...second]` expands two arrays into a combined `[1, 2, 3, 4]`, while `function sum(...numbers)` collects all passed arguments into a `numbers` array. Important: spread cloning is shallow — `const copy = { ...original }; copy.nested.value = 2;` also changes `original.nested.value`, because the nested object reference is shared, not copied.",
  },
  {
    id: 'jsadv-m13-270',
    number: 'JSADV-M13-270',
    title: 'What Is Optional Chaining?',
    difficulty: 'Easy',
    expectedAnswer: 'Optional chaining (`?.`) short-circuits to `undefined` instead of throwing when accessing a property, calling a function, or indexing through a nullish value.',
    deepExplanation:
      "`user.profile?.address?.city` on `const user = {};` evaluates to `undefined` instead of throwing, unlike the unguarded `user.profile.address.city`. It also works for function calls (`user.logout?.()`) and array access (`users?.[0]?.name`). Important: optional chaining only protects the specific part of the expression it's applied to — it doesn't make every operation in the expression automatically safe.",
  },
  {
    id: 'jsadv-m13-271',
    number: 'JSADV-M13-271',
    title: 'What Is Nullish Coalescing?',
    difficulty: 'Easy',
    expectedAnswer: 'The `??` operator supplies a fallback only when the left side is `null` or `undefined`, unlike `||` which falls back on any falsy value.',
    deepExplanation:
      "`null ?? 'Guest'` logs `Guest`. Comparing `0 || 10` (logs `10`) with `0 ?? 10` (logs `0`) shows the key difference: `||` treats `0` as falsy and replaces it, while `??` preserves it since `0` is neither `null` nor `undefined`. Interview rule: use `??` when valid values such as `0`, `false`, and `''` must be preserved.",
  },
  {
    id: 'jsadv-m13-272',
    number: 'JSADV-M13-272',
    title: 'What Are Symbols?',
    difficulty: 'Medium',
    expectedAnswer: 'A Symbol is a unique primitive value, even when created with the same description, commonly used for unique object keys and language protocols.',
    deepExplanation:
      "`Symbol('id') === Symbol('id')` is `false` — each call produces a distinct Symbol. Using one as a computed property key (`{ [id]: 123 }`) creates a property that ordinary enumeration won't collide with. Well-known symbols like `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toPrimitive`, and `Symbol.toStringTag` let objects participate in built-in language protocols.",
  },
  {
    id: 'jsadv-m13-273',
    number: 'JSADV-M13-273',
    title: 'What Is BigInt?',
    difficulty: 'Medium',
    expectedAnswer: '`BigInt` represents integers beyond `Number.MAX_SAFE_INTEGER` (`9007199254740991`), written with a trailing `n`.',
    deepExplanation:
      "`const large = 9007199254740993n;` represents a value `Number` cannot represent exactly. `BigInt` and `Number` cannot be mixed directly — `10n + 10` throws a `TypeError`; use `10n + 10n` instead. `JSON.stringify({ value: 10n })` also throws unless the `BigInt` is explicitly converted/serialized first. Production uses include financial integer units, large identifiers, and counters exceeding `Number`'s safe integer range.",
  },
  {
    id: 'jsadv-m13-274',
    number: 'JSADV-M13-274',
    title: 'What Are JavaScript Modules?',
    difficulty: 'Easy',
    expectedAnswer: 'ES modules use `export`/`import` to define explicit, statically-analyzable dependency boundaries between files.',
    deepExplanation:
      "`export function add(a, b) { return a + b; }` in `math.js` and `import { add } from './math.js';` in `app.js` gives `add(2, 3)` → `5`. ES modules have their own module scope, static imports/exports, live bindings, strict-mode semantics by default, and tooling support for tree shaking; in the browser they're loaded via `<script type=\"module\" src=\"/app.js\"></script>`.",
  },
  {
    id: 'jsadv-m13-275',
    number: 'JSADV-M13-275',
    title: 'What Is Dynamic Import?',
    difficulty: 'Medium',
    expectedAnswer: '`import()` loads a module asynchronously and returns a Promise, enabling code splitting and lazy loading.',
    deepExplanation:
      "`const module = await import('./feature.js'); module.runFeature();` fetches and evaluates the module only when needed. Common production uses: route-level code splitting, feature-based lazy loading, optional libraries, heavy editor/chart modules, and admin-only functionality — e.g. React's `const AdminPanel = lazy(() => import('./AdminPanel.jsx'));`.",
  },
  {
    id: 'jsadv-m13-276',
    number: 'JSADV-M13-276',
    title: 'What Is a Set?',
    difficulty: 'Easy',
    expectedAnswer: 'A `Set` stores a collection of unique values, automatically discarding duplicates.',
    deepExplanation:
      "`new Set([1, 2, 2, 3])` spread back into an array gives `[1, 2, 3]`. Methods include `add()`, `has()`, `delete()`, and `.size`. A common idiom for deduplicating an array is `[...new Set(array)]`. Interview point: Set membership is designed for efficient lookup, but exact performance depends on the engine and workload — avoid promising strict O(1) without qualification.",
  },
  {
    id: 'jsadv-m13-277',
    number: 'JSADV-M13-277',
    title: 'What Is a Map?',
    difficulty: 'Easy',
    expectedAnswer: '`Map` stores key-value pairs and, unlike plain objects, allows keys of any type, including objects and functions.',
    deepExplanation:
      "`users.set(1, 'Alex'); users.get(1)` returns `'Alex'`. Using an object as a key — `map.set(objectKey, 'data'); map.get(objectKey)` — works directly, which plain object property keys cannot do (they coerce keys to strings). `Map` is useful for caches, lookup tables, object-keyed metadata, frequency maps, and graph algorithms.",
  },
  {
    id: 'jsadv-m13-278',
    number: 'JSADV-M13-278',
    title: 'What Are WeakMap and WeakSet?',
    difficulty: 'Hard',
    expectedAnswer: 'WeakMap and WeakSet hold weak references to their object keys/values, so entries do not prevent those objects from being garbage collected — but they are not enumerable and have no `.size`.',
    deepExplanation:
      "`metadata.set(element, { createdAt: Date.now() })` on a `WeakMap` associates data with `element` without keeping it alive once all other references (like setting `element = null`) are gone. Unlike `Map`, `WeakMap` is not iterable, has no `.size`, and cannot be enumerated — so it's suited to GC-friendly object association, not for cases where you need to list all entries.",
  },
  {
    id: 'jsadv-m13-279',
    number: 'JSADV-M13-279',
    title: 'What Are Iterators and Generators?',
    difficulty: 'Medium',
    expectedAnswer: 'An iterator exposes a `next()` method returning `{ value, done }`; a generator (`function*`/`yield`) is a convenient way to implement one with lazy sequence production.',
    deepExplanation:
      "`[10, 20][Symbol.iterator]()` produces an iterator whose `.next()` calls return `{ value: 10, done: false }`, `{ value: 20, done: false }`, then `{ value: undefined, done: true }`. A generator like `function* numbers() { yield 1; yield 2; yield 3; }` produces the same protocol lazily, pausing between `yield`s.",
  },
  {
    id: 'jsadv-m13-280',
    number: 'JSADV-M13-280',
    title: "What Is `for...of`?",
    difficulty: 'Easy',
    expectedAnswer: '`for...of` iterates over the *values* of any iterable (arrays, strings, Sets, Maps, generators, custom iterables), unlike `for...in`, which iterates enumerable property *keys*.',
    deepExplanation:
      "`for (const number of [10, 20, 30]) { console.log(number); }` logs `10`, `20`, `30`. Contrasting `for...in` and `for...of` over `['a', 'b']`: `for...in` logs the keys `0`, `1`, while `for...of` logs the values `a`, `b`.",
  },
  {
    id: 'jsadv-m13-281',
    number: 'JSADV-M13-281',
    title: 'What Is Proxy?',
    difficulty: 'Hard',
    expectedAnswer: '`Proxy` wraps an object and intercepts fundamental operations (get, set, has, deleteProperty, ownKeys, apply, construct, and more) through configurable traps.',
    deepExplanation:
      "`new Proxy(user, { get(target, property, receiver) { console.log(...); return Reflect.get(target, property, receiver); } })` logs `Reading: name` before returning `Alex` when `proxy.name` is accessed. Production use cases include reactive systems, validation, access control, logging, and metaprogramming — but Proxy can introduce overhead and complicate debugging, so it shouldn't be used simply because it's powerful.",
  },
  {
    id: 'jsadv-m13-282',
    number: 'JSADV-M13-282',
    title: 'What Is Reflect?',
    difficulty: 'Medium',
    expectedAnswer: '`Reflect` provides standardized, function-based methods (`get`, `set`, `has`, `deleteProperty`, `ownKeys`, `construct`, `apply`) for performing the same object operations that syntax normally performs.',
    deepExplanation:
      "`Reflect.get(user, 'name')` returns `Alex`, equivalent to `user.name`. Proxy trap handlers commonly delegate to `Reflect` (e.g. `get(target, property, receiver) { return Reflect.get(target, property, receiver); }`), which preserves correct receiver semantics and makes traps easier to reason about than reimplementing the operation manually.",
  },
  {
    id: 'jsadv-m13-283',
    number: 'JSADV-M13-283',
    title: 'What Are `Object.entries()` and `Object.values()`?',
    difficulty: 'Easy',
    expectedAnswer: "`Object.values()` returns an array of an object's own enumerable property values, and `Object.entries()` returns an array of `[key, value]` pairs.",
    deepExplanation:
      "For `{ name: 'Alex', age: 30 }`, `Object.values(user)` gives `['Alex', 30]` and `Object.entries(user)` gives `[['name', 'Alex'], ['age', 30]]`. A common pattern is `for (const [key, value] of Object.entries(user)) { console.log(\\`${key}: ${value}\\`); }`, logging `name: Alex` and `age: 30`. Both operate only on the object's own enumerable string-keyed properties.",
  },
  {
    id: 'jsadv-m13-284',
    number: 'JSADV-M13-284',
    title: "What Is `Object.fromEntries()`?",
    difficulty: 'Medium',
    expectedAnswer: '`Object.fromEntries()` converts an iterable of `[key, value]` pairs back into a plain object.',
    deepExplanation:
      "`Object.fromEntries([['name', 'Alex'], ['age', 30]])` produces `{ name: 'Alex', age: 30 }`. It composes naturally with `Object.entries()` for transformations, e.g. `Object.fromEntries(Object.entries(user).map(([key, value]) => [key.toUpperCase(), value]))` produces `{ NAME: 'Alex', AGE: 30 }`.",
  },
  {
    id: 'jsadv-m13-285',
    number: 'JSADV-M13-285',
    title: 'What Is the Relationship Between Entries, Values and FromEntries?',
    difficulty: 'Medium',
    expectedAnswer: '`Object.entries()`, array methods like `map`/`filter`, and `Object.fromEntries()` compose into a pipeline for immutable object transformation.',
    deepExplanation:
      "The pipeline is: object → `Object.entries()` → array of `[key, value]` pairs → `map`/`filter` → `Object.fromEntries()` → new object. For example, `Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'age'))` removes the `age` key while leaving `user` itself untouched, producing `{ name: 'Alex', active: true }` — a pattern common in immutable data transformation.",
  },
  {
    id: 'jsadv-m13-286',
    number: 'JSADV-M13-286',
    title: 'How Does ES6+ Improve JavaScript Code Quality?',
    difficulty: 'Medium',
    expectedAnswer: 'Modern JavaScript features improve readability, modularity, scoping safety, data transformation, asynchronous workflows, iteration, and metaprogramming — without being mandatory to use everywhere.',
    deepExplanation:
      "`const`/`let` give predictable scope, destructuring gives concise data extraction, modules give dependency boundaries, optional chaining gives safer property access, `??` gives correct defaults, `Map`/`Set` give specialized collections, `async`/`await` gives readable asynchronous workflows, and dynamic `import()` gives code splitting. The goal is not to use every feature — it's to use the feature that makes the specific design clearer.",
  },
  {
    id: 'jsadv-m13-287',
    number: 'JSADV-M13-287',
    title: 'How Does Modern JavaScript Affect Performance?',
    difficulty: 'Medium',
    expectedAnswer: 'Language features alone do not determine performance — algorithm complexity, allocation rate, object shape stability, GC pressure, DOM/network work, and bundle size matter far more.',
    deepExplanation:
      "A readable chain like `data.filter(isValid).map(transform).filter(isVisible)` is often fast enough despite creating intermediate arrays; replacing it with manual loops should only happen for genuinely hot paths, after measuring. The senior rule: readability first → measure → identify the bottleneck → optimize → measure again.",
  },
  {
    id: 'jsadv-m13-288',
    number: 'JSADV-M13-288',
    title: 'What Are Modern JavaScript Security Considerations?',
    difficulty: 'Medium',
    expectedAnswer: 'Modern syntax does not make code automatically secure — `innerHTML`, `eval`, and unchecked object merging remain unsafe regardless of how modern the surrounding code is.',
    deepExplanation:
      "`element.innerHTML = userInput` is dangerous; `element.textContent = userInput` is safer for plain text. Avoid `eval(userInput)` entirely, and don't treat `Object.assign(target, untrustedObject)` as automatically safe — prototype pollution and unsafe property handling can still occur depending on the data flow. Security principles: validate input → use safe DOM APIs → avoid eval → sanitize where HTML is genuinely required → use CSP → keep dependencies updated.",
  },
  {
    id: 'jsadv-m13-289',
    number: 'JSADV-M13-289',
    title: 'What Browser Compatibility Should You Consider?',
    difficulty: 'Medium',
    expectedAnswer: 'Before using a modern feature in production, check target browsers, mobile browser versions, WebViews, enterprise environments, and Node.js versions, and plan for transpilation/polyfills as needed.',
    deepExplanation:
      "A typical toolchain runs modern source through TypeScript/Babel/SWC, then a bundler, producing transpiled/optimized output for target browsers. Important: transpilation does not solve every runtime API compatibility issue — transforming syntax does not necessarily provide a missing browser API, so a polyfill or alternative implementation may still be required.",
  },
  {
    id: 'jsadv-m13-290',
    number: 'JSADV-M13-290',
    title: 'Final ES6+ Senior Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: 'Modernizing a legacy codebase (`var`, CommonJS everywhere, deep mutation, manual property checks, `eval`, `for...in` over arrays) should happen incrementally, not as a rewrite.',
    deepExplanation:
      "A strong plan: replace `var` with `const`/`let`; introduce ES modules gradually with clear module boundaries; replace unsafe dynamic code such as `eval`; use `Map`/`Set` for appropriate key/value and uniqueness workloads; replace unsafe nested access with optional chaining and `??` where falsy values must be preserved; introduce dynamic imports for large optional features; use `for...of` and `Object.entries()` for iteration/transformation; audit rather than indiscriminately add `Proxy`; add browser compatibility targets; measure bundle and runtime performance; add linting/code-quality rules; and migrate incrementally behind compatibility checks and tests rather than rewriting the entire application at once.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE13_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
  (seed) => ({
    detail: {
      id: seed.id,
      questionNumber: seed.number,
      title: seed.title,
      difficulty: seed.difficulty,
      companies: COMPANIES,
      frequency: FREQUENCY_BY_DIFFICULTY[seed.difficulty],
      category: CATEGORY,
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: seed.experienceLevel ?? EXPERIENCE_BY_DIFFICULTY[seed.difficulty],
      question: seed.title,
    },
    answer: {
      expectedAnswer: seed.expectedAnswer,
      deepExplanation: seed.deepExplanation,
      productionExample: `Work through the accompanying code example for "${seed.title}" and verify the documented output before generalizing the behavior to production code.`,
      bestPractices: BEST_PRACTICES,
      tradeOffs: TRADE_OFFS,
      commonMistakes: COMMON_MISTAKES,
      followUpQuestions: FOLLOW_UP_QUESTIONS,
      relatedTopics: RELATED_TOPICS,
    },
  }),
);
