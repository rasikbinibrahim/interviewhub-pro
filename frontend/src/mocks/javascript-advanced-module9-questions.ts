// Derived from frontend/src/document/Part_4_Module_9_Functions_Master_Handbook.md.
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

const CATEGORY = 'Functions';

const CONCEPTS = [
  'First-class functions',
  'Higher-order functions',
  'Callbacks',
  'IIFE',
  'Arrow functions',
  'Rest/spread parameters',
  'Default parameters',
  'Generators',
  'Async functions',
  'Pure functions',
  'Function composition',
  'Currying',
  'Partial application',
  'Memoization',
  'Debounce/throttle',
  'call/apply/bind',
];

const BEST_PRACTICES = [
  'Keep functions focused',
  'Prefer descriptive names',
  'Minimize hidden side effects',
  'Validate external input',
  'Keep parameter counts manageable',
  'Prefer composition over duplicated logic',
  'Avoid unnecessary mutation',
  'Use pure functions for domain transformations where practical',
  'Keep async error handling explicit',
  'Avoid accidental closure retention',
  'Avoid creating functions repeatedly inside hot paths unless necessary',
  'Do not overuse memoization',
  'Use debounce/throttle intentionally',
  'Document non-obvious contracts',
  'Keep functions easy to test',
];

const COMMON_MISTAKES = [
  'Interview trap: Choosing an arrow function for an object method that needs dynamic `this`',
  'Interview trap: Assuming `greet(null)` falls back to a default parameter (only `undefined` does)',
  'Interview trap: Reading a function expression before its initialization (TDZ), unlike a hoisted declaration',
  'Interview trap: Missing a base case in recursion, causing a stack overflow',
  'Interview trap: Using `call`/`apply`/`bind` to override an arrow function\'s lexical `this`',
  'Interview trap: Letting a naive memoize cache grow unbounded or key on unstable `JSON.stringify()` output',
  'Interview trap: Assuming debouncing cancels an already-sent network request',
];

const TRADE_OFFS =
  'Advantages: first-class, higher-order functions enable callbacks, composition, currying, and dependency injection without extra language machinery, and techniques like memoization, debounce, and throttle give direct control over expensive or noisy execution. Disadvantages: closures and memoized caches can retain memory longer than expected, curried/composed pipelines can hurt readability if overused, and debounce/throttle/memoize all require deliberate tuning (delay, cache eviction, key stability) or they cause subtle production bugs.';

const FOLLOW_UP_QUESTIONS = [
  'When would you choose a regular function over an arrow function?',
  'How does hoisting differ between function declarations and function expressions?',
  'What is the practical difference between debounce and throttle, and when would you pick each?',
  'How would you make a memoize implementation safe for object arguments?',
  'What is the difference between currying and partial application?',
  'Why does an `async` function always return a Promise, even for a plain return value?',
  'How would you isolate side effects from pure domain logic in a real codebase?',
  'What happens to `this` when a regular function is passed as a callback without binding?',
  'How do generators enable lazy sequences or custom iterators?',
  'What risks come with deep function chaining or heavy composition pipelines?',
];

const RELATED_TOPICS = [
  'First-class functions',
  'Higher-order functions',
  'Callbacks',
  'IIFE',
  'Arrow functions',
  'Rest and spread',
  'Default parameters',
  'Generators',
  'Async functions',
  'Pure functions and side effects',
  'Composition, currying, partial application',
  'Memoization',
  'Debounce and throttle',
  'call, apply, bind',
  'Recursion',
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
    id: 'jsadv-m9-176',
    number: 'JSADV-M9-176',
    title: 'What Are First-Class Functions?',
    difficulty: 'Easy',
    expectedAnswer:
      'In JavaScript, functions are first-class values that can be assigned to variables, passed as arguments, returned from other functions, and stored in objects or arrays.',
    deepExplanation:
      "`const fn = greet; fn('Rasik')` still returns `Hello Rasik` because assigning a function to `fn` just copies the reference. This is what enables callbacks, higher-order functions, functional programming, event handlers, middleware, composition, and dependency injection.",
  },
  {
    id: 'jsadv-m9-177',
    number: 'JSADV-M9-177',
    title: 'What Is a Higher-Order Function?',
    difficulty: 'Medium',
    expectedAnswer: 'A higher-order function either accepts a function as an argument or returns a function.',
    deepExplanation:
      '`calculate(10, 20, add)` accepts a function argument and returns `30`. `multiplier(2)` returns a new function `double`, and `double(10)` returns `20` — demonstrating both directions: accepting a function and returning one.',
  },
  {
    id: 'jsadv-m9-178',
    number: 'JSADV-M9-178',
    title: 'What Is a Callback Function?',
    difficulty: 'Easy',
    expectedAnswer: 'A callback is a function supplied to another function so it can be invoked later or during an operation.',
    deepExplanation:
      "`processUser('Rasik', (message) => message.toUpperCase())` returns `HELLO RASIK` because `processUser` invokes the supplied callback. Callbacks are common in array methods, browser events, timers, and async/Node.js APIs — a callback does not necessarily mean asynchronous execution, e.g. `[1, 2, 3].map((value) => value * 2)` runs its callback synchronously.",
  },
  {
    id: 'jsadv-m9-179',
    number: 'JSADV-M9-179',
    title: 'What Is the Difference Between Anonymous and Named Functions?',
    difficulty: 'Easy',
    expectedAnswer:
      "An anonymous function expression has no name, while a named function expression carries a name usable inside its own body and in stack traces.",
    deepExplanation:
      "`const greet = function (name) {...}` is anonymous, while `const greet = function greetUser(name) {...}` is named. A name improves stack traces, debugging, and recursive function expressions — e.g. `const factorial = function calculateFactorial(n) { ... return n * calculateFactorial(n - 1); }` can recurse via its own name even though the outer binding is `factorial`, returning `120` for `factorial(5)`.",
  },
  {
    id: 'jsadv-m9-180',
    number: 'JSADV-M9-180',
    title: 'What Is an IIFE?',
    difficulty: 'Medium',
    expectedAnswer:
      'IIFE stands for Immediately Invoked Function Expression — a function that is created and executed immediately.',
    deepExplanation:
      "`(function () { const secret = 'private'; console.log(secret); })();` logs `private` right away, with `secret` scoped only to the IIFE. IIFEs (including arrow-function IIFEs) were widely used before ES modules to create private scopes; today, a block scope (`{ const privateValue = 42; }`) or ES modules are generally preferred for the same encapsulation.",
  },
  {
    id: 'jsadv-m9-181',
    number: 'JSADV-M9-181',
    title: 'What Are Arrow Functions?',
    difficulty: 'Easy',
    expectedAnswer: 'Arrow functions provide concise function syntax and capture `this` lexically from their enclosing scope.',
    deepExplanation:
      "`const add = (a, b) => a + b; add(10, 20)` returns `30`. Unlike regular functions, arrow functions do not have their own `this`, do not have their own `arguments`, cannot be used as constructors with `new`, and do not have a `prototype` property.",
  },
  {
    id: 'jsadv-m9-182',
    number: 'JSADV-M9-182',
    title: 'What Is the Difference Between Arrow Functions and Regular Functions?',
    difficulty: 'Hard',
    expectedAnswer:
      "Regular functions have their own `this`, `arguments`, and `prototype`, and can be used as constructors; arrow functions have none of those and instead capture `this` lexically.",
    deepExplanation:
      "In `{ name: 'Rasik', regular() { return this.name; }, arrow: () => { return this.name; } }`, `user.regular()` returns `'Rasik'` because a regular method's `this` is the calling object, while `user.arrow()` does not receive `this` from the object — it uses whatever `this` was lexically in scope where the object literal was written. Interview trap: do not choose arrow functions for object methods merely because they are shorter.",
  },
  {
    id: 'jsadv-m9-183',
    number: 'JSADV-M9-183',
    title: 'What Are Rest Parameters?',
    difficulty: 'Easy',
    expectedAnswer: 'Rest parameters collect the remaining arguments passed to a function into a real array.',
    deepExplanation:
      "`function sum(...numbers) { return numbers.reduce((total, number) => total + number, 0); } sum(10, 20, 30)` returns `60`, whether implemented with `reduce()` or a manual `for...of` loop. Rest is useful whenever the number of arguments is dynamic.",
  },
  {
    id: 'jsadv-m9-184',
    number: 'JSADV-M9-184',
    title: 'What Are Spread Parameters?',
    difficulty: 'Easy',
    expectedAnswer: 'Spread syntax expands an iterable or object into individual values or properties.',
    deepExplanation:
      "`Math.max(...[10, 20, 30])` returns `30`, and `add(...[10, 20, 30])` for `function add(a, b, c)` returns `60`. Rest and spread are conceptual inverses: rest gathers `arguments` into `[10, 20, 30]`, while spread expands `[10, 20, 30]` back into individual `10, 20, 30` values.",
  },
  {
    id: 'jsadv-m9-185',
    number: 'JSADV-M9-185',
    title: 'What Are Default Parameters?',
    difficulty: 'Easy',
    expectedAnswer: "Default parameters provide a fallback value when an argument is `undefined`.",
    deepExplanation:
      "`function greet(name = 'Guest') { ... } greet()` logs `Hello Guest` and `greet('Rasik')` logs `Hello Rasik`. Interview trap: calling `greet(undefined)` uses the default, but calling `greet(null)` does not — `null` is a real value, not a missing one.",
  },
  {
    id: 'jsadv-m9-186',
    number: 'JSADV-M9-186',
    title: 'Function Declaration vs Function Expression',
    difficulty: 'Medium',
    expectedAnswer:
      'A function declaration (`function add() {}`) is fully hoisted and callable before its line runs; a function expression (`const add = function () {}`) is only hoisted as a binding and is in the temporal dead zone until its assignment executes.',
    deepExplanation:
      "Calling `add(2, 3)` before a `function add(a, b) { return a + b; }` declaration works because declarations are initialized during execution-context setup. Calling `add(2, 3)` before `const add = function (a, b) { return a + b; }` throws, because `add` sits in the TDZ until the `const` assignment runs.",
  },
  {
    id: 'jsadv-m9-187',
    number: 'JSADV-M9-187',
    title: 'What Are Generator Functions?',
    difficulty: 'Hard',
    expectedAnswer: "Generator functions, declared with `function*` and using `yield`, can pause and resume execution, producing a sequence of values on demand.",
    deepExplanation:
      "Calling `numbers()` for `function* numbers() { yield 1; yield 2; yield 3; }` returns an iterator; each `.next()` call resumes execution to the next `yield`, producing `{ value: 1, done: false }`, `{ value: 2, done: false }`, `{ value: 3, done: false }`, then `{ value: undefined, done: true }`. Generators are useful for custom iterators, lazy sequences, controlled execution, state machines, and advanced async abstractions.",
  },
  {
    id: 'jsadv-m9-188',
    number: 'JSADV-M9-188',
    title: 'What Are Async Functions?',
    difficulty: 'Medium',
    expectedAnswer: 'An `async` function always returns a Promise, even when its body returns a plain value.',
    deepExplanation:
      "`async function getUser() { return { id: 1, name: 'Rasik' }; } getUser().then(console.log)` logs `{ id: 1, name: 'Rasik' }` because JavaScript wraps the returned object in a resolved Promise. Conceptually, `async function getUser() { return value; }` behaves like `function getUser() { return Promise.resolve(value); }`.",
  },
  {
    id: 'jsadv-m9-189',
    number: 'JSADV-M9-189',
    title: 'What Is a Pure Function?',
    difficulty: 'Medium',
    expectedAnswer: 'A pure function produces the same output for the same input and has no observable side effects.',
    deepExplanation:
      "`function add(a, b) { return a + b; }` is pure — `add(2, 3)` always returns `5`. By contrast, `addToTotal(value)` that mutates an outer `total` variable is impure, since its result depends on external mutable state. Pure functions are easier to test, reason about, cache, reuse, conceptually parallelize, and debug.",
  },
  {
    id: 'jsadv-m9-190',
    number: 'JSADV-M9-190',
    title: 'What Are Side Effects?',
    difficulty: 'Medium',
    expectedAnswer: "A side effect is an observable interaction outside a function's local computation.",
    deepExplanation:
      "Examples include modifying global state, changing the DOM, network requests, writing storage, logging, mutating external objects, and timers — e.g. `saveUser(user)` calling `localStorage.setItem(...)` performs a storage side effect. Side effects are not automatically bad; production applications need them — the goal is to isolate and control them, keeping pure domain logic separate from an explicit side-effect boundary (API/DOM/storage).",
  },
  {
    id: 'jsadv-m9-191',
    number: 'JSADV-M9-191',
    title: 'What Is Function Composition?',
    difficulty: 'Medium',
    expectedAnswer: 'Composition combines smaller functions to build a larger operation, feeding the output of one into the input of the next.',
    deepExplanation:
      "`compose(double, increment)` builds `transform`, so `transform(5)` first applies `increment` (→ `6`) then `double` (→ `12`), matching `f(g(value))`.",
  },
  {
    id: 'jsadv-m9-192',
    number: 'JSADV-M9-192',
    title: 'What Is Currying?',
    difficulty: 'Hard',
    expectedAnswer: 'Currying transforms a multi-argument function into a sequence of nested one-argument functions.',
    deepExplanation:
      "Instead of `add(a, b, c) { return a + b + c; }` called as `add(1, 2, 3)`, a curried form `const add = (a) => (b) => (c) => a + b + c;` is called as `add(1)(2)(3)`, also returning `6`. Currying is useful for creating specialized functions, e.g. `const addGST = addTax(0.18); addGST(100)` returns `118`.",
  },
  {
    id: 'jsadv-m9-193',
    number: 'JSADV-M9-193',
    title: 'What Is Partial Application?',
    difficulty: 'Hard',
    expectedAnswer: 'Partial application fixes some arguments of a function up front and returns a new function awaiting the rest.',
    deepExplanation:
      "`partialMultiply(2, 3)` fixes `a` and `b` for `multiply(a, b, c)`, returning `multiplyBySix`; calling `multiplyBySix(4)` returns `24`. Unlike currying's one-argument-at-a-time nested calls (`f(a)(b)(c)`), partial application fixes a batch of arguments at once and produces a single specialized function (`partial(f, a, b)(c)`).",
  },
  {
    id: 'jsadv-m9-194',
    number: 'JSADV-M9-194',
    title: 'What Is Memoization?',
    difficulty: 'Hard',
    expectedAnswer: 'Memoization caches a function\'s results keyed by its arguments so repeated calls with the same input can be returned from cache.',
    deepExplanation:
      "A `memoize(fn)` wrapper stores results in a `Map` keyed by `JSON.stringify(args)`; calling `square(10)` twice logs `100` both times, with the second call served from cache. The naive implementation has real limitations — `JSON.stringify()` can be expensive, object-argument identity may be inappropriate, cache growth can be unbounded, and stale values can persist indefinitely — so production use may need a bounded cache, TTL, `WeakMap` keys for objects, stable key generation, and explicit invalidation.",
  },
  {
    id: 'jsadv-m9-195',
    number: 'JSADV-M9-195',
    title: 'What Is Debouncing?',
    difficulty: 'Hard',
    expectedAnswer: 'Debouncing delays a function\'s execution until activity has stopped for a specified period.',
    deepExplanation:
      "Each call to a debounced `search(query)` clears the previous timer and starts a new one; only after 300ms of no further calls does the underlying function actually run — so rapid calls like `search('r')`, `search('re')`, `search('rea')`, `search('react')` end up triggering just one execution for `'react'`. Common uses: autocomplete, search, resize handling, expensive validation, and filtering. Debouncing does not cancel a request already sent to the server — combine it with `AbortController` or request identity handling for network operations.",
  },
  {
    id: 'jsadv-m9-196',
    number: 'JSADV-M9-196',
    title: 'What Is Throttling?',
    difficulty: 'Hard',
    expectedAnswer: 'Throttling limits how often a function can execute within a given period, regardless of how often it is invoked.',
    deepExplanation:
      "A throttled `handleScroll` tracks `lastExecution` and only runs `fn` again once at least `delay` (e.g. 200ms) has passed since the last run, ignoring calls in between. Debounce waits for activity to stop and suits input/search, while throttle executes at controlled intervals and suits continuous events like scroll/resize.",
  },
  {
    id: 'jsadv-m9-197',
    number: 'JSADV-M9-197',
    title: 'What Is the Difference Between `call`, `apply`, and `bind`?',
    difficulty: 'Hard',
    expectedAnswer: '`call` and `apply` invoke a function immediately with an explicit `this` (comma-separated args vs an array), while `bind` returns a new function permanently bound to a given `this`.',
    deepExplanation:
      "`greet.call(user, 'Coimbatore', 'India')` and `greet.apply(user, ['Coimbatore', 'India'])` both invoke `greet` immediately with `this` set to `user`; `greet.bind(user, 'Coimbatore', 'India')` instead returns `boundGreet`, callable later as `boundGreet()`. Arrow functions do not have their own `this`, so `call`, `apply`, and `bind` cannot override their lexical `this`.",
  },
  {
    id: 'jsadv-m9-198',
    number: 'JSADV-M9-198',
    title: 'What Is Recursion?',
    difficulty: 'Medium',
    expectedAnswer: 'Recursion occurs when a function calls itself, typically progressing toward a base case that stops the recursive calls.',
    deepExplanation:
      "`factorial(5)` calls `factorial(4)`, then `factorial(3)`, `factorial(2)`, and `factorial(1)`, which returns `1` and lets each stacked call multiply its way back up to `120`. A common mistake is missing a base case, which causes unbounded recursion and a stack overflow.",
  },
  {
    id: 'jsadv-m9-199',
    number: 'JSADV-M9-199',
    title: 'What Is Function Chaining?',
    difficulty: 'Hard',
    expectedAnswer: 'Function chaining lets successive method calls run on the same object by having each method return `this` (or another chainable value).',
    deepExplanation:
      "`new Calculator(10).add(5).multiply(2).subtract(4)` works because `add()`, `multiply()`, and `subtract()` each mutate `this.value` and `return this`, giving `10 → 15 → 30 → 26`. Modern code can also achieve a similar effect with pipelines or explicit composition patterns, depending on project tooling and language support.",
  },
  {
    id: 'jsadv-m9-200',
    number: 'JSADV-M9-200',
    title: 'What Are Function Best Practices?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: 'Production functions stay focused, minimize hidden side effects, validate external input, and keep parameter counts and contracts manageable.',
    deepExplanation:
      "Splitting a monolithic `process(data, a, b, c, d, e, f)` into focused functions — `validateOrder(order)`, `calculateOrderTotal(order)`, `saveOrder(order)`, and an orchestrating `async function createOrder(order)` that calls each in turn — illustrates the guideline: prefer composition over duplicated logic, avoid unnecessary mutation, use pure functions for domain transformations where practical, keep async error handling explicit, avoid accidental closure retention, avoid creating functions repeatedly inside hot paths unless necessary, don't overuse memoization, use debounce/throttle intentionally, document non-obvious contracts, and keep functions easy to test.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE9_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
  (seed) => ({
    detail: {
      id: seed.id,
      questionNumber: seed.number,
      title: seed.title,
      difficulty: seed.difficulty,
      companies: COMPANIES,
      frequency: FREQUENCY_BY_DIFFICULTY[seed.difficulty],
      category: CATEGORY,
      part: 'Advanced JS',
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
