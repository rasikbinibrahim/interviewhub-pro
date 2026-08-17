// Hand-authored supplementary JavaScript technical question bank.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_EXTRA_PART1_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    detail: {
      id: 'jsx1-1',
      questionNumber: 'JSX1-001',
      title: 'Closures',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix'],
      frequency: 5,
      category: 'Core JavaScript Concepts',
      part: 'Advanced JS',
      concepts: ['closures', 'lexical scope', 'execution context', 'garbage collection', 'variable environment'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What are closures, and how do they work in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'A closure is a function bundled together with references to its surrounding lexical scope, so the function keeps access to variables from the scope in which it was defined even after that outer scope has finished executing. Every function created in JavaScript forms a closure over the variables in scope at its creation point. This lets a function "remember" state across multiple invocations, which is the basis for patterns like counters, memoization, and module-style encapsulation.',
      deepExplanation:
        'When a function is defined, the engine attaches a reference to its lexical environment (the scope chain at that point), not the current values of the variables. When the outer function returns, its execution context is popped off the call stack, but if an inner function still references variables from that context, the JS engine cannot garbage-collect that variable environment — it stays alive as long as something reachable references it. This is why closures capture variables by reference, not by value: if the outer variable is reassigned after the inner function is created, the inner function sees the updated value, not a snapshot. The classic loop-with-var pitfall demonstrates this: `var` is function-scoped, so all closures created in a `for` loop share the same binding, and by the time any callback runs the loop variable has already reached its final value. Switching to `let` fixes this because each loop iteration gets its own fresh binding in the block scope. Internally, V8 optimizes closures by only keeping alive the specific variables actually referenced by the inner function (via escape analysis) rather than the entire outer scope, though this is an implementation detail, not a spec guarantee.',
      productionExample:
        'Closures power React hook implementations (each render "closes over" that render\'s props/state), event handler factories that need per-instance state, debounce/throttle utilities that retain a timer id between calls, and module patterns that expose a public API while keeping implementation details in private variables.',
      bestPractices: [
        'Use closures deliberately for encapsulation, not accidentally through careless variable capture',
        'Prefer `let`/`const` in loops to avoid shared-binding bugs with async callbacks',
        'Be aware that long-lived closures over large objects can prevent garbage collection and cause memory leaks',
        'Use closures for memoization/caching only when cache size is bounded or invalidated',
        'Name closure factory functions clearly (`createCounter`, `makeDebouncer`) to signal state-holding intent',
        'Avoid capturing more of the outer scope than necessary — destructure only what you need',
      ],
      tradeOffs:
        'Advantages: Enables data privacy and encapsulation without classes; supports powerful functional patterns like currying and memoization; keeps state alive across async callbacks. Disadvantages: Can cause subtle memory leaks if captured references outlive their usefulness; can make debugging harder since state is hidden inside a scope chain rather than an object; overuse can obscure control flow for readers unfamiliar with the closure.',
      commonMistakes: [
        'Assuming closures capture a variable\'s value at creation time rather than a live reference',
        'Using `var` inside loops and expecting each iteration to capture its own value',
        'Interview trap: believing closures copy variables — they actually hold references to the binding, so mutations after closure creation are visible',
        'Creating unnecessary closures inside hot render loops, hurting performance',
        'Not releasing references to large captured objects, causing memory retention',
        'Interview trap: confusing closures with the module pattern — closures are the mechanism, the module pattern is one application of it',
      ],
      followUpQuestions: [
        'Why does using `var` instead of `let` in a loop with setTimeout produce unexpected output?',
        'How would you implement a private counter using a closure?',
        'Can closures cause memory leaks? How would you avoid them?',
        'How do closures relate to the module pattern and IIFEs?',
        'How does the JS engine decide what to keep alive in a closure?',
      ],
      relatedTopics: ['lexical scope', 'scope chain', 'IIFE', 'module pattern', 'memoization', 'garbage collection', 'execution context'],
    },
  },
  {
    detail: {
      id: 'jsx1-2',
      questionNumber: 'JSX1-002',
      title: 'Hoisting',
      difficulty: 'Easy',
      companies: ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Zoho'],
      frequency: 5,
      category: 'Core JavaScript Concepts',
      part: 'Advanced JS',
      concepts: ['hoisting', 'temporal dead zone', 'var', 'let/const', 'function declarations'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Can you explain hoisting and how it affects variables and functions?',
    },
    answer: {
      expectedAnswer:
        'Hoisting is the JS engine\'s behavior of allocating memory for variable and function declarations during the compile/creation phase, before code actually executes, so identifiers appear "moved to the top" of their scope. `var` declarations are hoisted and initialized to `undefined`, function declarations are hoisted with their full body, but `let`/`const` are hoisted into a Temporal Dead Zone (TDZ) where accessing them before the declaration line throws a ReferenceError.',
      deepExplanation:
        'The JS engine runs a two-phase process for each execution context: a creation phase where it scans the code, sets up the scope, and pre-allocates bindings for `var`, `let`, `const`, and function declarations, followed by an execution phase where code actually runs top to bottom. For `var`, the binding is created and immediately initialized to `undefined`, so reading it before its assignment gives `undefined` rather than an error. Function declarations (`function foo(){}`) are hoisted along with their entire definition, so they can be called before their textual position. `let` and `const` are hoisted in the sense that the engine knows about the binding, but the binding stays uninitialized in the TDZ from the start of the block until the declaration statement executes; accessing it in that window throws a ReferenceError, which is a deliberate spec choice to catch bugs early. Function expressions and arrow functions assigned to `var`/`let`/`const` follow the hoisting rules of the variable, not of a function declaration — the variable is hoisted, but the function value is only assigned at execution time, so calling it early throws or gives `undefined is not a function`. `class` declarations behave like `let`/`const`: hoisted but in the TDZ, so they cannot be used before definition.',
      productionExample:
        'Understanding hoisting explains why mutually recursive function declarations can call each other regardless of order, why `let`/`const` scoped to blocks (like inside `if` or `for`) prevent accidental leakage, and why linters flag "no-use-before-define" to catch TDZ or undefined-at-runtime bugs before they reach production.',
      bestPractices: [
        'Always declare variables at the top of their scope for clarity, even though hoisting makes strict ordering unnecessary for `var`',
        'Prefer `let`/`const` over `var` to get TDZ safety and block scoping',
        'Avoid relying on function-declaration hoisting for readability — define helper functions before use where practical',
        'Enable ESLint rules like `no-use-before-define` to catch order-dependent bugs',
        'Never rely on `var`\'s `undefined`-before-assignment behavior as an intentional pattern',
      ],
      tradeOffs:
        'Advantages: Function declaration hoisting enables natural top-down code organization and mutual recursion; hoisting rules are well-specified and predictable once understood. Disadvantages: `var` hoisting can mask bugs by silently returning `undefined` instead of erroring; TDZ errors with `let`/`const` can confuse developers unfamiliar with the mechanism; mixing declaration styles increases cognitive load when reasoning about a scope.',
      commonMistakes: [
        'Assuming `let`/`const` are not hoisted at all — they are hoisted but land in the TDZ',
        'Interview trap: "hoisting moves code to the top" — nothing physically moves; only the binding is created early',
        'Expecting a function expression assigned to a hoisted `var` to be callable before the assignment line',
        'Not realizing `typeof` on a TDZ variable still throws, unlike `typeof` on an undeclared variable',
        'Assuming `class` declarations behave like function declarations (they don\'t — no full hoisting of the body)',
        'Overusing `var` and running into scope leakage across `if`/`for` blocks',
      ],
      followUpQuestions: [
        'What is the Temporal Dead Zone and why does it exist?',
        'What does `typeof` return for a variable in the TDZ versus an undeclared variable?',
        'Are function expressions hoisted the same way as function declarations?',
        'How does hoisting interact with block scoping in `if`/`for` statements?',
        'Why do `class` declarations behave like `let` rather than `function`?',
      ],
      relatedTopics: ['temporal dead zone', 'var vs let vs const', 'scope', 'execution context', 'function declarations vs expressions'],
    },
  },
  {
    detail: {
      id: 'jsx1-3',
      questionNumber: 'JSX1-003',
      title: 'Global, function, and block scope',
      difficulty: 'Easy',
      companies: ['Meta', 'Amazon', 'Adobe', 'Uber', 'Zoho'],
      frequency: 4,
      category: 'Core JavaScript Concepts',
      part: 'Advanced JS',
      concepts: ['global scope', 'function scope', 'block scope', 'scope chain', 'var/let/const'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Describe the different types of scopes in JavaScript: global, function, and block.',
    },
    answer: {
      expectedAnswer:
        'Global scope holds variables accessible anywhere in the program and lives for the life of the page/process. Function scope contains variables declared with `var` inside a function, visible anywhere within that function regardless of nested blocks. Block scope, introduced by `let`/`const` in ES6, confines a variable to the nearest enclosing `{}` (if, for, while, or a bare block), which `var` ignores entirely.',
      deepExplanation:
        'Scope determines where an identifier is visible and resolvable, and JavaScript resolves identifiers using a scope chain: when a variable is referenced, the engine looks in the current scope, then walks outward through enclosing scopes until it finds the binding or reaches global scope, throwing a ReferenceError if not found. Global scope in a browser attaches `var` declarations and function declarations as properties on the `window` object (in non-module scripts), which is a common source of naming collisions across scripts. Function scope means a `var` declared anywhere inside a function — even nested three `if` blocks deep — is accessible throughout the entire function due to hoisting, which historically caused variable leakage bugs. Block scope, added with `let` and `const`, creates a new lexical environment for each `{}` block, so a `let` inside an `if` block is inaccessible outside it; this is implemented by the engine creating a distinct environment record per block execution, which is also why each loop iteration with `let i` gets its own binding. ES modules and strict mode change some global-scope behavior — top-level `this` is `undefined` in modules rather than the global object, and undeclared assignments throw instead of silently creating globals.',
      productionExample:
        'Block scoping is essential for correct closures inside loops (e.g., attaching N click handlers each referencing its own index), for guarding temporary variables inside `if`/`switch` branches without leaking them, and for module-level encapsulation where each ES module has its own top-level scope instead of polluting the global namespace.',
      bestPractices: [
        'Minimize global scope pollution — use modules or IIFEs instead of relying on implicit globals',
        'Default to `const`, use `let` only when reassignment is needed, and avoid `var` in new code',
        'Keep variables scoped as tightly as possible to reduce accidental reuse across branches',
        'Use strict mode (or ES modules, which are strict by default) to catch accidental global creation',
        'Be explicit about intentional globals (e.g., `window.APP_CONFIG`) rather than leaking them accidentally',
      ],
      tradeOffs:
        'Advantages: Block scoping with `let`/`const` reduces bugs from variable leakage and shadowing; global scope enables shared application-wide state and libraries; function scope is simple and predictable for `var`-based legacy code. Disadvantages: Global scope is prone to naming collisions and hard-to-trace mutations; function scope with `var` can leak variables across logical blocks; too many nested block scopes can make variable shadowing confusing to trace.',
      commonMistakes: [
        'Declaring variables in global scope unintentionally by omitting `var`/`let`/`const` in non-strict mode',
        'Assuming a `var` declared inside an `if` block is scoped to that block',
        'Interview trap: shadowing an outer variable with the same name inside a block using `let`, then being surprised the outer one is untouched',
        'Not realizing top-level `var`/function declarations in browser scripts attach to `window`',
        'Forgetting that `catch` block parameters have their own block scope',
        'Confusing lexical (author-time) scope with dynamic scope, which JavaScript does not have',
      ],
      followUpQuestions: [
        'What happens if you access a `var` before its declaration versus a `let`?',
        'How does the scope chain resolve a variable lookup?',
        'What is variable shadowing and how does it interact with scope?',
        'How does module scope differ from classic script global scope?',
        'Why do `let` in a `for` loop create a new binding per iteration?',
      ],
      relatedTopics: ['scope chain', 'lexical scope', 'hoisting', 'closures', 'strict mode', 'ES modules'],
    },
  },
  {
    detail: {
      id: 'jsx1-4',
      questionNumber: 'JSX1-004',
      title: 'Execution context and the call stack',
      difficulty: 'Medium',
      companies: ['Google', 'Microsoft', 'Netflix', 'Stripe', 'Atlassian'],
      frequency: 4,
      category: 'Core JavaScript Concepts',
      part: 'Advanced JS',
      concepts: ['execution context', 'call stack', 'variable environment', 'this binding', 'stack overflow'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the execution context, and how does the call stack work in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'An execution context is the environment in which JavaScript code is evaluated and run — it bundles the variable environment (bindings), the scope chain, and the value of `this`. The engine creates a Global Execution Context first, then pushes a new Function Execution Context onto the call stack every time a function is invoked; the call stack is a LIFO structure that tracks which context is currently executing, popping a context off when its function returns.',
      deepExplanation:
        'Each execution context goes through a creation phase (hoisting variables/functions, determining `this`, setting up the scope chain) and an execution phase (running statements line by line). The call stack starts with the Global Execution Context at the bottom; every function call pushes a new Function Execution Context on top, and that function becomes the "active" context until it returns or throws, at which point its context is popped and control resumes in the caller\'s context. Because the stack has a finite size, deep recursion without a base case (or without tail-call elimination, which most engines don\'t implement despite it being in the ES6 spec) triggers a "Maximum call stack size exceeded" RangeError. Async operations don\'t block the stack: when you call `setTimeout` or an async function hits an `await`, the synchronous portion completes and the context is popped, while the deferred continuation is scheduled via the event loop and gets a fresh execution context pushed only when it actually runs. Arrow functions don\'t create their own `this` binding in their execution context — they inherit `this` lexically from the enclosing context, which is why they\'re commonly used to preserve `this` in callbacks.',
      productionExample:
        'Stack traces shown in browser DevTools and error monitoring tools (Sentry, Datadog) are a direct visualization of the call stack at the moment an error was thrown, which is why understanding execution context ordering is critical for debugging production crashes and recursive-function stack overflows.',
      bestPractices: [
        'Keep recursive functions bounded or convert deep recursion to iteration to avoid stack overflow',
        'Use arrow functions when you want to inherit `this` from the enclosing context, and regular functions when you need dynamic `this`',
        'Read stack traces bottom-to-top (or top-to-bottom depending on tool) to trace the actual call chain during debugging',
        'Avoid deeply nested synchronous call chains in hot paths — they add both stack depth and cognitive overhead',
        'Understand that async callbacks run in a new context, so `this` and local variables from the triggering context aren\'t automatically preserved unless captured via closure',
      ],
      tradeOffs:
        'Advantages: The call stack model gives predictable, easy-to-reason-about synchronous execution order; execution contexts cleanly isolate variables and `this` per invocation. Disadvantages: Fixed stack size limits recursion depth; lack of guaranteed tail-call optimization in most engines forces iterative rewrites for deep recursion; debugging async stack traces across event-loop boundaries is harder since the "stack" isn\'t continuous.',
      commonMistakes: [
        'Assuming JavaScript is multi-threaded because async code appears to run "in parallel"',
        'Interview trap: believing `setTimeout(fn, 0)` runs immediately — it still waits for the current stack to clear and macrotask queue to be reached',
        'Writing unbounded recursion and hitting stack overflow in production with large inputs',
        'Assuming arrow functions have their own `this` execution binding',
        'Not realizing each function call creates a distinct execution context even for recursive calls to the same function',
        'Confusing the call stack (execution order) with the scope chain (variable lookup)',
      ],
      followUpQuestions: [
        'What causes a "Maximum call stack size exceeded" error and how would you fix it?',
        'How does `this` get determined in a new execution context?',
        'How do async functions interact with the call stack and the event loop?',
        'Does JavaScript support tail-call optimization?',
        'How would you convert a deep recursive function into an iterative one?',
      ],
      relatedTopics: ['event loop', 'this binding', 'recursion', 'stack overflow', 'scope chain', 'hoisting'],
    },
  },
  {
    detail: {
      id: 'jsx1-5',
      questionNumber: 'JSX1-005',
      title: 'Event loop, task queue, and microtasks',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Stripe'],
      frequency: 5,
      category: 'Core JavaScript Concepts',
      part: 'Advanced JS',
      concepts: ['event loop', 'microtask queue', 'macrotask queue', 'call stack', 'promises', 'setTimeout'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How does the event loop work in JavaScript? Can you explain the concept of the task queue and microtasks?',
    },
    answer: {
      expectedAnswer:
        'The event loop is the mechanism that lets single-threaded JavaScript handle async work: it continuously checks whether the call stack is empty, and if so, pulls the next task from a queue and pushes it onto the stack to run. There are two queue types — the microtask queue (Promise `.then`/`.catch`/`.finally`, `queueMicrotask`, `MutationObserver`) and the macrotask/task queue (`setTimeout`, `setInterval`, I/O, UI events) — and the engine fully drains the microtask queue after every single macrotask (and after the initial synchronous script) before moving to the next macrotask or repainting.',
      deepExplanation:
        'Execution order is: run all synchronous code (the initial script is itself a macrotask), then before picking up any new macrotask, drain the microtask queue completely — including any new microtasks scheduled by currently-running microtasks — then run exactly one macrotask, then drain microtasks again, and repeat; in browsers, rendering/paint typically happens between macrotasks after the microtask queue is empty. This ordering explains why `Promise.resolve().then(cb)` always runs before a `setTimeout(cb, 0)`, even though both are scheduled "immediately," because promise callbacks are microtasks and get priority over the next macrotask. `async`/`await` is syntactic sugar over promises: code after an `await` is scheduled as a microtask continuation, so an `async function` runs synchronously up to the first `await`, then yields control back to the caller. Starvation is a real risk — if a microtask recursively schedules another microtask indefinitely, the event loop never reaches the macrotask queue or repaints, freezing the UI, whereas a similar pattern with `setTimeout` recursion at least yields between iterations. Node.js has additional queue types beyond the browser model — `process.nextTick` runs before other microtasks, and Node\'s event loop has distinct phases (timers, pending callbacks, poll, check, close callbacks) that interact with `setImmediate` differently than browsers handle macrotasks.',
      productionExample:
        'Understanding microtask vs macrotask ordering is essential when debugging race conditions between state updates and DOM reads/writes, when batching multiple promise-based API calls, and when diagnosing why a UI freezes due to a runaway `.then()` chain that never yields to the browser\'s render or input-handling steps.',
      bestPractices: [
        'Avoid recursively scheduling microtasks without a yield point, which can starve rendering and user input',
        'Use `async`/`await` for readability but remember it doesn\'t change the underlying microtask scheduling semantics',
        'Break up long synchronous work with `setTimeout(fn, 0)` or `requestIdleCallback` to let the browser repaint and respond to input',
        'Be explicit about ordering expectations in tests that mix promises and timers — use fake timers plus `await Promise.resolve()` flushes',
        'In Node.js, understand `process.nextTick` runs before other microtasks and can also cause starvation if misused',
      ],
      tradeOffs:
        'Advantages: Single-threaded event-loop model avoids race conditions and locking complexity common in multi-threaded code; microtask prioritization ensures promise chains resolve promptly and consistently. Disadvantages: Easy to accidentally starve rendering/input with runaway microtask chains; ordering subtleties between timers, promises, and I/O callbacks are a frequent source of hard-to-reproduce bugs; behavior differs between browsers and Node.js in queue phase details.',
      commonMistakes: [
        'Assuming `setTimeout(fn, 0)` executes before promise callbacks',
        'Interview trap: assuming all async operations use the same queue — microtasks always drain fully before the next macrotask',
        'Not realizing an `async function` runs synchronously until its first `await`',
        'Writing recursive `.then()` chains that never yield, freezing the UI',
        'Confusing Node.js\'s `process.nextTick`/`setImmediate` ordering with browser microtask/macrotask ordering',
        'Assuming the event loop runs on a separate thread from the main JS execution thread',
      ],
      followUpQuestions: [
        'What is the output order of a script mixing `console.log`, `setTimeout`, and `Promise.then`?',
        'How does `async`/`await` map onto the microtask queue?',
        'What is `process.nextTick` in Node.js and how does it differ from `queueMicrotask`?',
        'How can a runaway microtask chain freeze a page, and how would you detect it?',
        'How does the event loop interact with browser rendering/repaint?',
      ],
      relatedTopics: ['microtasks', 'macrotasks', 'call stack', 'promises', 'async/await', 'requestAnimationFrame', 'Node.js event loop phases'],
    },
  },
  {
    detail: {
      id: 'jsx1-6',
      questionNumber: 'JSX1-006',
      title: 'Polyfilling Promise.all, Promise.race, and Promise.any',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Uber', 'Stripe'],
      frequency: 5,
      category: 'Promises & Asynchronous JavaScript',
      part: 'Advanced JS',
      concepts: ['promises', 'Promise.all', 'Promise.race', 'Promise.any', 'polyfills', 'AggregateError'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'How would you create a polyfill for Promise.all, Promise.race, and Promise.any?',
    },
    answer: {
      expectedAnswer:
        'Promise.all resolves with an array of all results once every input promise resolves, and rejects immediately with the first rejection. Promise.race settles (resolve or reject) as soon as the first input promise settles, in either direction. Promise.any resolves as soon as the first input promise resolves, and only rejects if all inputs reject, in which case it rejects with an AggregateError containing all the individual errors.',
      deepExplanation:
        'All three combinators wrap a `new Promise(...)` executor and call `.then(onFulfilled, onRejected)` on each input, but they differ in how they aggregate settlement. `Promise.all` needs a results array plus a counter of remaining unresolved promises so it can preserve input order even though promises resolve out of order — it resolves the outer promise only when the counter reaches zero, and rejects (short-circuits) on the first rejection. `Promise.race` simply attaches both success and failure handlers to every promise and calls `resolve`/`reject` on the outer promise the first time any handler fires — whichever settles first "wins," and slower promises are effectively ignored (not cancelled, since native promises aren\'t cancellable). `Promise.any` is the inverse of `all`: it resolves on the first success and only rejects once every promise has rejected, collecting all errors into an `AggregateError`. All implementations must also handle non-promise values in the input iterable (wrap with `Promise.resolve`) and an empty input array (`all` resolves to `[]` immediately, `any` rejects immediately with an empty AggregateError).',
      productionExample:
        'Promise.all is used to parallelize independent API calls (e.g., fetching user profile, settings, and notifications concurrently before rendering a dashboard); Promise.race is used to implement request timeouts by racing a fetch against a timer promise; Promise.any is used for redundant data sources, like querying multiple CDN mirrors and using whichever responds successfully first.',
      bestPractices: [
        'Preserve input order in results even when promises settle out of order (index-based assignment, not push)',
        'Handle non-promise values in the input via `Promise.resolve(value)` so `all`/`race`/`any` work with mixed iterables',
        'Handle the empty-array edge case explicitly for each combinator',
        'Use `Promise.allSettled` instead of `all` when you need every result regardless of individual failures',
        'Avoid manually reimplementing these in production code — use the native implementations, and reserve a hand-rolled version for interviews or environments lacking support',
        'When racing for timeouts, always clear the timer once the real operation settles to avoid leaking timers',
      ],
      tradeOffs:
        'Advantages: Native combinators are highly optimized, spec-compliant, and handle edge cases correctly; understanding the polyfill deepens grasp of promise internals and settlement semantics. Disadvantages: `Promise.all` fails fast and discards successful results if one promise rejects, which can be wasteful; `Promise.race`/`any` cannot truly cancel the losing promises, so unwanted work may still complete in the background; polyfills add bundle size and risk subtle spec-deviation bugs if not carefully tested.',
      commonMistakes: [
        'Using `.push()` for `Promise.all` results instead of index assignment, breaking result ordering',
        'Interview trap: forgetting `Promise.all` short-circuits on the first rejection, discarding other in-flight results',
        'Forgetting to handle non-promise values in the input array',
        'Not handling the empty-array case for `any` (should reject with an empty AggregateError, not hang forever)',
        'Interview trap: confusing `Promise.race` (first settle, success or failure) with `Promise.any` (first success only)',
        'Assuming losing promises in `race`/`any` are cancelled — they continue executing since native promises have no cancellation',
      ],
      followUpQuestions: [
        'What does Promise.all do if the input array is empty?',
        'How would you implement Promise.allSettled?',
        'How would you add a timeout to a fetch call using Promise.race?',
        'What is an AggregateError and when is it thrown natively?',
        'How would you limit concurrency instead of running all promises in parallel?',
      ],
      relatedTopics: ['Promise.allSettled', 'AggregateError', 'concurrency control', 'async/await', 'microtasks', 'fetch timeouts'],
    },
  },
  {
    detail: {
      id: 'jsx1-7',
      questionNumber: 'JSX1-007',
      title: 'Retry mechanism for async operations',
      difficulty: 'Medium',
      companies: ['Amazon', 'Microsoft', 'Netflix', 'Uber', 'Flipkart'],
      frequency: 4,
      category: 'Promises & Asynchronous JavaScript',
      part: 'Advanced JS',
      concepts: ['retry logic', 'exponential backoff', 'promises', 'async/await', 'error handling'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you implement a retry mechanism for an asynchronous operation with N retries?',
    },
    answer: {
      expectedAnswer:
        'Wrap the async operation in a loop (or recursive function) that catches a rejection, checks whether attempts remain, and if so waits (optionally with exponential backoff and jitter) before trying again; if all N attempts fail, it rethrows the last error. The core idea is turning a single fallible async call into a bounded retry loop that still returns a single promise to the caller.',
      deepExplanation:
        'A robust retry wrapper needs to track attempt count, decide which errors are retryable (e.g., network timeouts and 5xx responses, but not 4xx client errors), and apply a delay strategy between attempts — a fixed delay is simplest, but exponential backoff (delay = base * 2^attempt) combined with random jitter avoids thundering-herd problems when many clients retry simultaneously after a shared outage. The implementation should be async-function-based so each retry naturally awaits both the operation and the backoff delay, and it should preserve the original error (or wrap it with attempt metadata) when retries are exhausted so callers can diagnose the failure. For operations with side effects (like POST requests), retries must also consider idempotency — retrying a non-idempotent write can cause duplicate side effects unless the API supports idempotency keys.',
      productionExample: `\`\`\`js
async function withRetry(fn, { retries = 3, baseDelayMs = 300, isRetryable = () => true } = {}) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > retries || !isRetryable(err)) throw err;
      const jitter = Math.random() * baseDelayMs;
      const delay = baseDelayMs * 2 ** (attempt - 1) + jitter;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
\`\`\`
This pattern is used for flaky network calls (fetch/axios wrappers), retrying failed WebSocket reconnects, and resilient background sync jobs that must tolerate transient server or connectivity errors.`,
      bestPractices: [
        'Only retry idempotent operations, or use idempotency keys for retried writes',
        'Use exponential backoff with jitter to avoid synchronized retry storms across clients',
        'Cap the maximum retry count and maximum total wait time to avoid hanging indefinitely',
        'Distinguish retryable errors (timeouts, 5xx, network failures) from non-retryable ones (4xx, validation errors)',
        'Log or surface retry attempts for observability without spamming logs on every attempt',
        'Support cancellation (e.g., via AbortController) so retries stop if the caller no longer needs the result',
      ],
      tradeOffs:
        'Advantages: Improves resilience against transient failures without requiring caller-side retry logic; exponential backoff reduces load on a recovering downstream service. Disadvantages: Naive retries can amplify load during outages (retry storms); retrying non-idempotent operations risks duplicate side effects; added latency on the failure path can degrade user-perceived responsiveness if not bounded.',
      commonMistakes: [
        'Retrying immediately without backoff, worsening load during an outage',
        'Retrying non-idempotent requests (like payment submission) without idempotency protection',
        'Interview trap: forgetting to rethrow the final error after retries are exhausted, silently swallowing failures',
        'Not distinguishing retryable vs non-retryable errors, wasting time retrying a guaranteed-to-fail 400 request',
        'Missing jitter, causing synchronized retry spikes ("thundering herd") across many clients',
        'Not providing a way to cancel in-flight retries when the caller no longer needs the result',
      ],
      followUpQuestions: [
        'How would you add exponential backoff with jitter to this retry function?',
        'How do you decide which errors are safe to retry?',
        'How would you make the retry logic cancellable with an AbortController?',
        'How does idempotency affect whether an operation is safe to retry?',
        'How would you test a retry function without waiting for real delays?',
      ],
      relatedTopics: ['exponential backoff', 'idempotency', 'AbortController', 'circuit breaker pattern', 'error handling', 'network resilience'],
    },
  },
  {
    detail: {
      id: 'jsx1-8',
      questionNumber: 'JSX1-008',
      title: 'Promise.all vs Promise.race vs Promise.any',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Adobe', 'Atlassian', 'Zoho'],
      frequency: 4,
      category: 'Promises & Asynchronous JavaScript',
      part: 'Advanced JS',
      concepts: ['Promise.all', 'Promise.race', 'Promise.any', 'Promise.allSettled', 'AggregateError'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Can you explain the differences between Promise.all, Promise.race, and Promise.any?',
    },
    answer: {
      expectedAnswer:
        'Promise.all waits for every promise to resolve and returns their results in order, but rejects immediately if any one rejects. Promise.race settles as soon as the first promise settles, whether it fulfills or rejects. Promise.any resolves as soon as the first promise fulfills, ignoring earlier rejections, and only rejects (with an AggregateError) if every promise rejects.',
      deepExplanation:
        'These combinators differ along two axes: whether they wait for all inputs or just the first, and whether they care about success versus any settlement. `Promise.all` is "all must succeed" — it\'s useful when every result is required to proceed, but its fail-fast behavior means one failure discards the rest, which is why `Promise.allSettled` exists for cases where you want every outcome regardless of success/failure. `Promise.race` is settlement-order-agnostic — the first promise to settle, for better or worse, determines the outcome, making it ideal for timeout patterns but risky if you don\'t realize a rejection can "win" the race just as easily as a resolution. `Promise.any` inverts `race`\'s indifference: it specifically waits for the first success, tolerating any number of early failures, only failing itself if literally every input fails, at which point it aggregates all the individual errors into a single `AggregateError` with an `.errors` array. A useful mental model: `all` = AND (all succeed), `any` = OR (at least one succeeds), `race` = FIRST (whoever finishes first, success or failure), and `allSettled` = REPORT (give me everything, don\'t short-circuit).',
      productionExample:
        'A dashboard fetching multiple widgets in parallel uses `Promise.all` when every widget is required to render, `Promise.allSettled` when partial data is acceptable, `Promise.any` when querying redundant mirrored endpoints for the fastest successful response, and `Promise.race` to implement a request timeout by racing the real request against a rejecting timer promise.',
      bestPractices: [
        'Use Promise.all only when every result is truly required; otherwise prefer allSettled',
        'Use Promise.any for redundant/fallback data sources where any success is acceptable',
        'Use Promise.race carefully — remember a rejection can win the race just like a resolution',
        'Always add a `.catch` or try/catch around Promise.all in production to handle partial failures gracefully',
        'When racing for a timeout, ensure the losing timer is cleared to avoid leaking a pending timeout',
      ],
      tradeOffs:
        'Advantages: Each combinator expresses a distinct, common concurrency intent concisely without manual bookkeeping. Disadvantages: Promise.all\'s fail-fast behavior can discard useful partial results; Promise.race and Promise.any cannot cancel the "losing" promises, so unwanted work may still run to completion; choosing the wrong combinator is a subtle source of bugs (e.g., using race when allSettled was intended).',
      commonMistakes: [
        'Interview trap: assuming Promise.race only resolves — it settles on the first result regardless of success or failure',
        'Confusing Promise.any (first success) with Promise.race (first settle)',
        'Using Promise.all when partial failures should be tolerated, losing all successful results to one failure',
        'Forgetting Promise.any throws an AggregateError, not a single Error, when all inputs reject',
        'Assuming losing promises in a race are automatically cancelled',
      ],
      followUpQuestions: [
        'When would you choose Promise.allSettled over Promise.all?',
        'How would you implement a fetch timeout using Promise.race?',
        'What does the AggregateError from Promise.any contain?',
        'How do these combinators behave with an empty array input?',
        'How would you limit concurrency when running many promises together?',
      ],
      relatedTopics: ['Promise.allSettled', 'AggregateError', 'concurrency patterns', 'timeouts', 'error handling'],
    },
  },
  {
    detail: {
      id: 'jsx1-9',
      questionNumber: 'JSX1-009',
      title: 'async/await fundamentals',
      difficulty: 'Easy',
      companies: ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Zoho'],
      frequency: 5,
      category: 'Promises & Asynchronous JavaScript',
      part: 'Advanced JS',
      concepts: ['async/await', 'promises', 'microtasks', 'error handling', 'try/catch'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'How does async/await work in JavaScript, and how does it improve the readability of asynchronous code?',
    },
    answer: {
      expectedAnswer:
        'async/await is syntactic sugar over promises: an `async function` always returns a promise, and `await` pauses execution of that function (without blocking the thread) until the awaited promise settles, then resumes with the resolved value or throws the rejection. It lets asynchronous code be written and read like synchronous, top-to-bottom code, including using ordinary `try`/`catch` for error handling instead of chained `.then`/`.catch` callbacks.',
      deepExplanation:
        'Under the hood, `await expr` is roughly equivalent to `expr.then(value => /* resume here */)`, with the rest of the async function\'s body becoming a microtask continuation scheduled once the promise settles — this means execution of the async function genuinely yields control back to the caller at each `await`, letting other code (including other microtasks) run in between. The engine desugars async functions using a state machine similar to generators, resuming at the correct point with the resolved value bound to the `await` expression. Errors are unified: a rejected awaited promise throws inside the async function, which a surrounding `try`/`catch` can catch just like a synchronous throw, and an uncaught rejection turns into an unhandled promise rejection just as if you\'d thrown from a `.then` chain. Because `await` only pauses the current async function, not the whole program, unrelated synchronous code and other promises continue running; sequential `await`s inside a loop are also a common performance trap since each one blocks the next iteration until it resolves, whereas `Promise.all` runs them concurrently.',
      productionExample:
        'async/await is the standard pattern for sequential data-fetching logic in components and API layers — e.g., `const user = await fetchUser(id); const posts = await fetchPosts(user.id);` — and is used with `try/catch` to centralize error handling for API calls, form submissions, and data loaders in frameworks like React and Next.js.',
      bestPractices: [
        'Use `Promise.all` to run independent async operations concurrently instead of awaiting them sequentially',
        'Always wrap awaited calls in try/catch (or handle rejections at a boundary) to avoid unhandled promise rejections',
        'Avoid `await` inside loops when operations are independent — batch them instead',
        'Remember an `async function` always returns a promise, even if you `return` a plain value',
        'Don\'t mix `.then()` chains and `await` in the same function — pick one style for consistency',
        'Use `AbortController` alongside async/await to support cancellable operations like fetch requests',
      ],
      tradeOffs:
        'Advantages: Dramatically improves readability over nested `.then()` chains ("callback hell" successor); unifies sync and async error handling via try/catch; makes control flow (loops, conditionals) around async code much easier to express. Disadvantages: Easy to accidentally serialize independent async operations by awaiting them one after another; hides the underlying microtask scheduling, which can confuse debugging of execution order; overusing top-level awaits or sequential awaits can hurt performance.',
      commonMistakes: [
        'Awaiting independent operations sequentially instead of using Promise.all for concurrency',
        'Interview trap: forgetting an async function always returns a promise, so its return value must be awaited or `.then`-ed by the caller',
        'Not catching rejected awaited promises, causing unhandled promise rejection warnings/crashes',
        'Using `await` inside `.forEach()`, which does not actually wait since forEach ignores returned promises',
        'Mixing synchronous throws and rejected promises inconsistently across a codebase',
        'Assuming `await` blocks the entire JS thread rather than just pausing the current async function',
      ],
      followUpQuestions: [
        'What does an async function return if you don\'t explicitly return a promise?',
        'Why does `await` inside `Array.prototype.forEach` not work as expected?',
        'How would you run multiple awaited operations concurrently instead of sequentially?',
        'How do you handle errors from an awaited promise?',
        'How is async/await implemented under the hood in terms of the event loop?',
      ],
      relatedTopics: ['promises', 'microtasks', 'generators', 'try/catch', 'Promise.all', 'AbortController'],
    },
  },
  {
    detail: {
      id: 'jsx1-10',
      questionNumber: 'JSX1-010',
      title: 'Microtasks vs macrotasks',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Netflix', 'Uber', 'Stripe'],
      frequency: 4,
      category: 'Promises & Asynchronous JavaScript',
      part: 'Advanced JS',
      concepts: ['microtasks', 'macrotasks', 'event loop', 'promises', 'setTimeout'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What are the differences between microtasks and macrotasks in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Microtasks (promise callbacks, `queueMicrotask`, `MutationObserver`) have higher priority and the entire microtask queue is drained completely before the event loop proceeds to the next macrotask. Macrotasks (`setTimeout`, `setInterval`, I/O callbacks, UI events, the initial script) are processed one at a time, with a full microtask-queue drain happening after each individual macrotask.',
      deepExplanation:
        'The event loop\'s ordering guarantee is: execute one macrotask (or the initial script), then drain the microtask queue completely — including any microtasks scheduled by other microtasks during that drain — before picking up the next macrotask or allowing the browser to repaint. This is why `Promise.resolve().then(...)` always logs before a `setTimeout(..., 0)` scheduled at the same point: the promise callback is queued as a microtask and gets to run before the engine even considers the next macrotask. Because microtasks can recursively schedule more microtasks, and the queue must be fully drained before moving on, a chain of promise callbacks that keeps scheduling more work can starve macrotasks (timers) and browser rendering indefinitely — an important production risk. `requestAnimationFrame` callbacks run before a repaint but are not classified as microtasks; they execute at a specific point in the browser\'s rendering pipeline, distinct from both the microtask queue and the macrotask/task queue used for timers and I/O.',
      productionExample:
        'This ordering matters when synchronizing DOM reads/writes with data from a promise (e.g., ensuring a `.then()` callback that updates the DOM runs before the browser\'s next repaint), and when diagnosing production bugs where a chain of nested `.then()` calls unexpectedly delays a `setTimeout`-scheduled UI update.',
      bestPractices: [
        'Use `queueMicrotask` sparingly and only when you specifically need microtask-priority scheduling',
        'Avoid unbounded recursive microtask scheduling that could starve timers and rendering',
        'When precise ordering matters in tests, explicitly flush microtasks (e.g., `await Promise.resolve()`) alongside fake timers',
        'Remember that `async`/`await` continuations are microtasks, so long await chains still run before the next `setTimeout`',
        'Use `setTimeout(fn, 0)` intentionally when you need to yield to macrotasks/rendering, not microtasks',
      ],
      tradeOffs:
        'Advantages: Microtask priority ensures promise-based logic completes promptly and consistently relative to timers; the clear two-tier queue model gives deterministic, well-specified ordering. Disadvantages: The priority difference is a frequent source of subtle bugs and confusing interview "predict the output" puzzles; unbounded microtask chains can starve the UI; ordering differences between browsers and Node.js (which adds `process.nextTick`) add extra complexity.',
      commonMistakes: [
        'Interview trap: assuming setTimeout(fn, 0) runs before a Promise.then scheduled at the same time — microtasks always win',
        'Not realizing microtasks scheduled during a microtask drain still run in the same drain, before any macrotask',
        'Assuming requestAnimationFrame is a microtask (it isn\'t — it\'s tied to the rendering pipeline)',
        'Writing recursive .then() chains that never yield, blocking timers and rendering indefinitely',
        'Confusing Node.js process.nextTick priority (higher than promise microtasks) with browser microtask semantics',
      ],
      followUpQuestions: [
        'What is the exact output order for a script mixing console.log, setTimeout, and Promise.then?',
        'Where does requestAnimationFrame fit relative to microtasks and macrotasks?',
        'How does Node.js\'s process.nextTick differ from the browser microtask queue?',
        'Can a microtask chain starve macrotasks? How would you detect that in production?',
        'How does async/await map onto the microtask queue?',
      ],
      relatedTopics: ['event loop', 'call stack', 'promises', 'requestAnimationFrame', 'Node.js event loop phases', 'process.nextTick'],
    },
  },
  {
    detail: {
      id: 'jsx1-11',
      questionNumber: 'JSX1-011',
      title: 'Currying',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Adobe', 'Flipkart'],
      frequency: 5,
      category: 'Advanced Function Concepts',
      part: 'Advanced JS',
      concepts: ['currying', 'higher-order functions', 'closures', 'function.length', 'arity'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is currying, and how would you implement it in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Currying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument, returning a new function until all arguments are collected, at which point the original function is invoked. For example, `add(1)(2)(3)` instead of `add(1, 2, 3)`, where each call returns a new function closing over the arguments seen so far.',
      deepExplanation:
        'A curried function relies entirely on closures: each returned function captures the arguments accumulated so far in its lexical scope, and only invokes the original function once enough arguments have been collected. A generic curry helper typically inspects the target function\'s declared arity via `fn.length` and recursively returns new functions until the accumulated arguments array reaches that length, at which point it calls `fn(...args)`. True currying is strictly one-argument-at-a-time; a more flexible variant (sometimes loosely also called "currying" in JS libraries like lodash\'s `_.curry`) allows multiple arguments per call as long as the total eventually satisfies the arity, which technically blurs into partial application. Currying composes well with functional pipelines because a curried function with some arguments already applied becomes a reusable, specialized function.',
      productionExample: `\`\`\`js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...next) => curried.apply(this, args.concat(next));
  };
}

const add3 = curry((a, b, c) => a + b + c);
add3(1)(2)(3); // 6
add3(1, 2)(3); // 6
add3(1)(2, 3); // 6
\`\`\`
Currying is used in functional-style event handler factories (e.g., \`curry(handleFieldChange)(fieldName)\` to produce a per-field onChange handler), in libraries like Ramda/lodash/fp for building reusable data-transformation pipelines, and in Redux-style action creators that pre-bind some arguments.`,
      bestPractices: [
        'Use `fn.length` carefully — it doesn\'t count rest parameters or parameters with default values, so specify arity explicitly for those cases',
        'Prefer well-tested library implementations (lodash `curry`) over hand-rolled versions in production',
        'Keep curried functions pure so partially-applied versions remain predictable and reusable',
        'Document the expected argument order since currying makes call sites less self-descriptive than named parameters',
        'Avoid over-currying trivial functions where it adds indirection without real reuse benefit',
      ],
      tradeOffs:
        'Advantages: Enables reusable, specialized functions from a general one; composes cleanly in functional pipelines; reduces repetition when the same early arguments are reused across calls. Disadvantages: Can reduce readability for developers unfamiliar with the pattern; debugging stack traces through several curried closures is harder; `fn.length`-based auto-currying breaks with default parameters, rest parameters, or variadic functions.',
      commonMistakes: [
        'Interview trap: confusing currying (strictly unary chained calls) with partial application (fixing some arguments, calling with the rest at once)',
        'Relying on `fn.length` for arity when the function has default or rest parameters, which `fn.length` excludes',
        'Writing a curry implementation that doesn\'t support calling with multiple arguments per step when that flexibility is expected',
        'Forgetting to preserve `this` binding using `.apply`/`.call` inside the curried wrapper',
        'Over-applying currying to APIs where it hurts call-site readability more than it helps reuse',
      ],
      followUpQuestions: [
        'How does currying differ from partial application?',
        'How would you handle variadic functions when auto-currying based on fn.length?',
        'How would you implement a curry function that supports both add(1)(2)(3) and add(1,2)(3)?',
        'Where have you used currying in a real codebase?',
        'How does currying relate to function composition?',
      ],
      relatedTopics: ['partial application', 'higher-order functions', 'closures', 'function composition', 'point-free style'],
    },
  },
  {
    detail: {
      id: 'jsx1-12',
      questionNumber: 'JSX1-012',
      title: 'Partial application',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Adobe', 'Atlassian', 'Zoho'],
      frequency: 3,
      category: 'Advanced Function Concepts',
      part: 'Advanced JS',
      concepts: ['partial application', 'bind', 'closures', 'currying', 'higher-order functions'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Can you explain partial application and provide an example?',
    },
    answer: {
      expectedAnswer:
        'Partial application is fixing (pre-filling) some number of a function\'s arguments up front, producing a new function that takes the remaining arguments and can be called with them all at once — unlike currying, it doesn\'t require calling with exactly one argument at a time. For example, `partial(multiply, 2)` returns a function that takes the remaining argument(s) and multiplies by 2.',
      deepExplanation:
        'Partial application uses a closure to capture the pre-filled arguments and returns a new function that, when called with the rest, concatenates both argument sets and invokes the original. It differs from currying in shape: currying always decomposes a function into a strict chain of unary functions regardless of how many arguments you supply per call, whereas partial application produces exactly one new function with some arguments locked in, and that function can accept any number of the remaining arguments in a single call. `Function.prototype.bind` is JavaScript\'s built-in partial-application mechanism when used with extra arguments beyond `thisArg` — `fn.bind(null, arg1)` returns a new function with `arg1` pre-applied. Partial application is especially useful for specializing generic utility functions into named, reusable ones without writing new wrapper functions by hand each time.',
      productionExample: `\`\`\`js
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

const multiply = (a, b, c) => a * b * c;
const double = partial(multiply, 2);
double(3, 4); // 24

// Built-in equivalent via bind:
const triple = multiply.bind(null, 3);
triple(2, 4); // 24
\`\`\`
Partial application is common for creating specialized API clients (e.g., \`partial(request, '/api/users')\` to fix the base path), pre-binding event handlers with a stable identifier, and building logging utilities where the log level or module name is fixed once.`,
      bestPractices: [
        'Use `bind` for simple partial application when currying\'s full chained-call behavior isn\'t needed',
        'Name partially-applied functions descriptively (e.g., `logAsWarning` from `partial(log, "warn")`) to keep call sites readable',
        'Keep the underlying function pure so partial application produces predictable, reusable specializations',
        'Avoid deeply nested partial application chains that obscure how many arguments remain',
        'Prefer explicit named wrapper functions over partial application when it improves clarity for a team unfamiliar with FP patterns',
      ],
      tradeOffs:
        'Advantages: Reduces repetition by specializing general-purpose functions; simpler mental model than full currying since remaining arguments can be passed together; `bind` gives a zero-dependency built-in mechanism. Disadvantages: Less composable than strict currying for building unary pipelines; overuse can make call sites less self-documenting; `bind`-based partial application permanently fixes `this`, which can surprise if the function relied on dynamic `this`.',
      commonMistakes: [
        'Interview trap: calling any argument pre-filling "currying" without distinguishing it from true currying',
        'Using `bind` for partial application without realizing it also permanently fixes `this`',
        'Assuming partial application requires exactly one argument per call like currying does',
        'Not handling the case where the original function is variadic (rest parameters)',
        'Losing track of argument order across multiple layers of partial application',
      ],
      followUpQuestions: [
        'How is partial application different from currying?',
        'How does Function.prototype.bind implement partial application?',
        'When would you choose partial application over currying in a real codebase?',
        'How would you implement a generic `partial` helper function?',
        'What happens to `this` when using bind for partial application?',
      ],
      relatedTopics: ['currying', 'Function.prototype.bind', 'closures', 'higher-order functions', 'point-free style'],
    },
  },
  {
    detail: {
      id: 'jsx1-13',
      questionNumber: 'JSX1-013',
      title: 'Polyfilling compose() and pipe()',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Netflix', 'Stripe', 'Uber'],
      frequency: 4,
      category: 'Advanced Function Concepts',
      part: 'Advanced JS',
      concepts: ['function composition', 'reduce', 'higher-order functions', 'point-free style', 'closures'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'How would you create a polyfill for compose() and pipe() functions in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Both `compose` and `pipe` take a list of unary functions and return a single function that runs them all against an input, threading each function\'s output into the next. `compose` applies functions right-to-left (`compose(f, g, h)(x)` = `f(g(h(x)))`), matching mathematical function composition, while `pipe` applies them left-to-right (`pipe(f, g, h)(x)` = `h(g(f(x)))`), reading in the order the data actually flows.',
      deepExplanation:
        'Both are implemented with `Array.prototype.reduce`, differing only in whether they reduce left-to-right or right-to-left. `pipe` uses a plain `reduce`, feeding the accumulator (starting as the initial input) through each function left to right, matching the intuitive "data flows through a pipeline" reading order. `compose` uses `reduceRight`, so the rightmost function runs first, mirroring mathematical notation where `(f ∘ g)(x) = f(g(x))`. Both should only work with unary functions in the chain after the first call (only the very first function in the chain can meaningfully accept multiple arguments, since every subsequent function receives exactly the single return value of the previous one). A production-grade version should handle an empty function list (return the identity function) and support async functions by threading promises through `await` in an async reduce if the pipeline mixes sync and async steps.',
      productionExample: `\`\`\`js
const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input);
const compose = (...fns) => (input) => fns.reduceRight((acc, fn) => fn(acc), input);

const clean = pipe(
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/\\s+/g, '-')
);
clean('  Hello World  '); // 'hello-world'
\`\`\`
compose/pipe are used to build middleware pipelines (Redux middleware is literally composed via \`compose\`), form-value sanitization/validation chains, and data-transformation pipelines in state management and API response normalization layers.`,
      bestPractices: [
        'Keep each function in the chain pure and unary so composition behaves predictably',
        'Handle the zero-function case by returning the identity function',
        'For pipelines mixing sync and async steps, use an async-aware reduce that awaits each stage',
        'Name intermediate composed pipelines descriptively so debugging a failing stage is easier',
        'Prefer `pipe` for pipelines describing a left-to-right data flow, and `compose` when matching mathematical/Redux-style conventions',
        'Add error boundaries or try/catch around a composed pipeline if any stage can throw, since one failing stage aborts the rest',
      ],
      tradeOffs:
        'Advantages: Produces highly readable, declarative transformation pipelines; encourages small, single-purpose, testable functions; widely used and understood in functional-style codebases and libraries like Redux. Disadvantages: Debugging a failing stage inside a long composed chain can be harder than stepping through explicit sequential code; only works cleanly with unary functions, forcing extra wrapping for multi-argument steps; stack traces through many composed closures can be noisy.',
      commonMistakes: [
        'Interview trap: swapping compose and pipe execution order — compose is right-to-left, pipe is left-to-right',
        'Passing multi-argument functions into the middle of a chain, where only the first argument survives',
        'Not handling an empty function list, causing a runtime error instead of returning the identity function',
        'Trying to use a sync reduce-based pipe with async functions and getting a chain of unresolved promises instead of awaited values',
        'Forgetting composed functions abort entirely if one stage throws, with no partial result',
      ],
      followUpQuestions: [
        'What is the difference in execution order between compose and pipe?',
        'How would you make a pipe/compose implementation support async functions?',
        'How is compose used inside Redux middleware?',
        'How would you handle errors thrown mid-pipeline?',
        'How would you compose functions that take multiple arguments?',
      ],
      relatedTopics: ['function composition', 'reduce/reduceRight', 'Redux middleware', 'point-free style', 'currying', 'pure functions'],
    },
  },
  {
    detail: {
      id: 'jsx1-14',
      questionNumber: 'JSX1-014',
      title: 'Custom debounce and throttle',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Flipkart'],
      frequency: 5,
      category: 'Advanced Function Concepts',
      part: 'Advanced JS',
      concepts: ['debounce', 'throttle', 'closures', 'setTimeout', 'rate limiting', 'performance optimization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How do you implement a custom debounce function? How about a throttle function?',
    },
    answer: {
      expectedAnswer:
        'Debounce delays invoking a function until a period of inactivity has passed — every new call resets the timer, so the function only runs once calls stop for the specified delay (useful for search-input handlers). Throttle ensures a function runs at most once per fixed time interval regardless of how many times it\'s called, guaranteeing a steady, rate-limited execution cadence (useful for scroll/resize handlers).',
      deepExplanation:
        'Debounce works by clearing any pending timer on every invocation and scheduling a new one; only if no new call arrives before the timer fires does the wrapped function actually execute, which means a continuous stream of calls (like fast typing) can indefinitely postpone execution until the stream pauses. Throttle instead tracks whether it\'s currently "in cooldown"; the leading-edge variant runs the function immediately on the first call and then ignores subsequent calls until the interval elapses, while a trailing-edge variant (or leading+trailing) also fires once more at the end of the window if calls occurred during cooldown, ensuring the final state isn\'t lost. Both rely on closures to keep timer/flag state across calls to the same wrapped function instance. The key conceptual difference: debounce guarantees "quiet period before firing" (good when only the final state matters, e.g. autosave after typing stops), while throttle guarantees "regular cadence regardless of burst size" (good when you need periodic updates during continuous activity, e.g. scroll-position tracking).',
      productionExample: `\`\`\`js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inCooldown = false;
  let lastArgs;
  return function (...args) {
    lastArgs = args;
    if (!inCooldown) {
      fn.apply(this, lastArgs);
      inCooldown = true;
      setTimeout(() => {
        inCooldown = false;
      }, limit);
    }
  };
}
\`\`\`
Debounce is used for search-as-you-type autocomplete, form validation, and window-resize-triggered layout recalculation; throttle is used for infinite-scroll position checks, mouse-move drag handlers, and rate-limiting analytics event dispatch.`,
      bestPractices: [
        'Clear pending debounce timers on component unmount to avoid calling a stale/unmounted handler',
        'Choose debounce for "wait until activity stops" use cases and throttle for "run periodically during activity" use cases',
        'Preserve `this` and forward all arguments correctly using `.apply`',
        'Consider a leading-edge option for throttle when the first event should respond immediately (e.g., button click protection)',
        'Use well-tested library implementations (lodash debounce/throttle) in production for edge cases like `maxWait`',
        'Make the delay/interval configurable rather than hardcoding magic numbers',
      ],
      tradeOffs:
        'Advantages: Both dramatically reduce unnecessary function calls and improve performance for high-frequency events (typing, scrolling, resizing); simple to implement and reason about with closures. Disadvantages: Debounce can indefinitely delay execution under continuous input, which is wrong for cases needing periodic feedback; throttle can miss the truly final event unless a trailing-edge call is included; both introduce latency that must be tuned against responsiveness needs.',
      commonMistakes: [
        'Interview trap: using debounce for scroll-position tracking, causing it to never fire during continuous scrolling',
        'Interview trap: using throttle for a search box, causing wasted API calls on incomplete keystrokes instead of waiting for a pause',
        'Not clearing timers on unmount/cleanup, leading to calls on stale closures or unmounted components',
        'Forgetting to preserve `this` and arguments when wrapping the original function',
        'Omitting the trailing-edge call in throttle, losing the final event\'s data',
        'Hardcoding delay values instead of exposing them as configurable parameters',
      ],
      followUpQuestions: [
        'What is the difference between leading-edge and trailing-edge throttling?',
        'When would you use debounce versus throttle for a given UI interaction?',
        'How would you cancel a pending debounced call?',
        'How would you implement throttle with both leading and trailing invocations?',
        'How do these interact with React component lifecycle/unmounting?',
      ],
      relatedTopics: ['closures', 'setTimeout', 'rate limiting', 'performance optimization', 'event handling', 'React useEffect cleanup'],
    },
  },
  {
    detail: {
      id: 'jsx1-15',
      questionNumber: 'JSX1-015',
      title: 'Function declaration vs function expression',
      difficulty: 'Easy',
      companies: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart', 'Zoho'],
      frequency: 4,
      category: 'Advanced Function Concepts',
      part: 'Advanced JS',
      concepts: ['function declaration', 'function expression', 'hoisting', 'named function expressions', 'arrow functions'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is the difference between function declaration and function expression?',
    },
    answer: {
      expectedAnswer:
        'A function declaration (`function foo() {}`) is hoisted with its entire definition and can be called before its position in the code. A function expression (`const foo = function() {}` or `const foo = () => {}`) assigns a function to a variable, and only the variable binding is hoisted (or not, for `let`/`const`, which stay in the TDZ) — the function itself isn\'t callable until the assignment line executes.',
      deepExplanation:
        'Syntactically, a function declaration is a standalone statement starting with `function` and requires a name; it\'s fully hoisted during the creation phase, meaning both the binding and the function body are available before execution reaches that line. A function expression is any function used as a value — assigned to a variable, passed as an argument, or returned — and its hoisting follows the hoisting rules of whatever it\'s assigned to: with `var`, the variable is hoisted as `undefined` (calling it early throws "is not a function"), and with `let`/`const` the variable is in the TDZ until the line executes. Function expressions can be anonymous or named; a named function expression (`const foo = function bar() {}`) gives the function a self-reference (`bar`) usable for recursion inside its own body without polluting the outer scope, and it also shows up more usefully in stack traces than an anonymous function. Function declarations inside blocks (like inside an `if`) have historically inconsistent hoisting behavior across engines pre-ES6 ("Annex B" legacy web compatibility semantics), which is one more reason to prefer function expressions or arrow functions inside conditional blocks for predictable behavior.',
      productionExample:
        'Function declarations are commonly used for top-level utility functions and mutually recursive helpers where hoisting order doesn\'t matter; function expressions (especially arrow functions) are the default for callbacks, object methods, and anything assigned conditionally or passed inline, since they avoid unintentional hoisting-related bugs and integrate cleanly with `const`.',
      bestPractices: [
        'Use function declarations for top-level, always-available utility functions',
        'Use function expressions (often arrow functions) for callbacks and values passed around, especially when conditional definition matters',
        'Avoid relying on the legacy Annex B hoisting behavior of function declarations inside blocks — use `let`/const with function expressions instead',
        'Name function expressions used for recursion to avoid relying on the outer variable binding, which could be reassigned',
        'Be consistent within a codebase/style guide about when to use declarations vs expressions',
      ],
      tradeOffs:
        'Advantages: Function declarations offer flexible ordering via hoisting, useful for mutual recursion and top-down readability; function expressions offer more control over scope and are required for conditional/dynamic function creation. Disadvantages: Function declaration hoisting can hide bugs from misordered code; function expressions cannot be called before their assignment, which can confuse developers expecting declaration-like hoisting; block-scoped function declarations have historically inconsistent cross-engine behavior.',
      commonMistakes: [
        'Interview trap: assuming a function expression assigned with `var` is callable before its assignment line, since only the variable (not the function value) is hoisted',
        'Declaring a function conditionally inside an `if` block and expecting consistent hoisting across environments',
        'Confusing arrow function expressions with function declarations regarding `this` binding and hoisting',
        'Not naming function expressions used recursively, then breaking recursion if the outer binding is reassigned',
        'Assuming all functions are hoisted the same way regardless of how they were defined',
      ],
      followUpQuestions: [
        'Are arrow functions considered function declarations or function expressions?',
        'What happens if you call a function expression before its assignment line?',
        'What is a named function expression and why would you use one?',
        'How does hoisting differ for function declarations inside a block versus at the top level?',
        'How do function declarations and expressions differ in how they\'re treated by tools like Babel/webpack tree-shaking?',
      ],
      relatedTopics: ['hoisting', 'temporal dead zone', 'arrow functions', 'named function expressions', 'IIFE'],
    },
  },
  {
    detail: {
      id: 'jsx1-16',
      questionNumber: 'JSX1-016',
      title: 'Singleton pattern',
      difficulty: 'Medium',
      companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Stripe'],
      frequency: 5,
      category: 'Design Patterns & Architecture',
      part: 'Advanced JS',
      concepts: ['singleton pattern', 'modules', 'closures', 'lazy initialization', 'design patterns'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the Singleton pattern, and how would you implement it in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'The Singleton pattern ensures a class or module has exactly one instance and provides a single, global point of access to it. In JavaScript, this is most naturally implemented using an ES module (since module exports are cached and shared across all importers) or a class with a static instance check that returns the existing instance instead of creating a new one.',
      deepExplanation:
        'Because ES modules are evaluated once and cached by the module loader, exporting an object literal or a module-level instance from a file is itself an idiomatic singleton — every import of that module gets the same reference. When a class-based singleton is required (e.g., to support lazy initialization or constructor arguments on first use), the pattern stores the instance in a module-scoped or static variable, and the constructor (or a static `getInstance()` method) checks whether an instance already exists, returning it if so instead of constructing a new object. Lazy initialization defers creating the instance until it\'s first requested, saving startup cost if the singleton is never used. Care is needed in module bundling: if a "singleton" module is duplicated across multiple bundles (e.g., due to package hoisting mismatches or being published from two different package versions), each bundle gets its own separate "singleton" instance, defeating the pattern silently.',
      productionExample:
        'Singletons back application-wide services like a single Redux/Zustand store instance, a shared Axios client with pre-configured interceptors, a logging service, a WebSocket connection manager, and configuration objects loaded once and reused across the app rather than re-fetched or reconstructed per component.',
      bestPractices: [
        'Prefer a module-level export as the singleton mechanism in modern JS/TS rather than manually managing a static instance flag',
        'Use lazy initialization if constructing the singleton is expensive and it may not always be needed',
        'Make the singleton\'s state as minimal and well-encapsulated as possible to avoid it becoming a dumping ground for global mutable state',
        'Be cautious with singletons in server-side rendering / multi-tenant Node processes, where sharing one instance across requests can leak state between users',
        'Write the singleton to be testable — allow resetting or injecting a mock instance in tests',
        'Watch for accidental duplicate singleton instances caused by bundler/module resolution mismatches',
      ],
      tradeOffs:
        'Advantages: Guarantees a single shared instance and access point, useful for expensive-to-create shared resources like connections or caches; simple to implement via ES module caching. Disadvantages: Introduces global mutable state, making testing and reasoning about side effects harder; can hide dependencies (code depends on the singleton implicitly rather than via explicit injection); dangerous in server environments where per-request isolation is needed, since singleton state can leak across requests.',
      commonMistakes: [
        'Interview trap: treating every module-level `export const x = {}` as automatically thread-safe or request-safe on a server, when Node.js can share module state across concurrent requests in the same process',
        'Overusing singletons for state that should actually be scoped per component/request',
        'Not providing a way to reset the singleton between tests, causing test pollution',
        'Assuming a class-based singleton with a private constructor check actually prevents `new` from being called externally (it must explicitly guard against that)',
        'Duplicating the "singleton" module across separate bundles unintentionally, breaking the single-instance guarantee',
      ],
      followUpQuestions: [
        'Why are ES modules a natural way to implement singletons in JavaScript?',
        'What problems can singletons cause in a server-side Node.js application handling concurrent requests?',
        'How would you make a singleton lazily initialized?',
        'How would you unit test code that depends on a singleton?',
        'How can bundler configuration accidentally break the singleton guarantee?',
      ],
      relatedTopics: ['ES modules', 'lazy initialization', 'dependency injection', 'global state management', 'design patterns'],
    },
  },
  {
    detail: {
      id: 'jsx1-17',
      questionNumber: 'JSX1-017',
      title: 'Factory pattern',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Netflix', 'Atlassian', 'Uber'],
      frequency: 3,
      category: 'Design Patterns & Architecture',
      part: 'Advanced JS',
      concepts: ['factory pattern', 'object creation', 'encapsulation', 'polymorphism', 'design patterns'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How does the Factory pattern work? Can you provide a JavaScript implementation?',
    },
    answer: {
      expectedAnswer:
        'The Factory pattern encapsulates object creation logic inside a dedicated function (or method) that decides which concrete object/type to instantiate and returns it, so calling code depends on the factory\'s interface rather than on specific constructors. This decouples "how an object is created" from "how it\'s used," making it easy to swap or extend the underlying implementations.',
      deepExplanation:
        'Instead of calling `new SomeClass(...)` directly throughout a codebase, a factory function centralizes the decision logic — often a switch/if-else on a type parameter or configuration — and returns the appropriate object shape or class instance. This is especially useful in JavaScript because object creation doesn\'t require classes at all: a factory can simply build and return a plain object literal with the desired methods/properties (an approach sometimes called the "factory function" pattern, distinct from class-based factories), which sidesteps `this`-binding pitfalls entirely since there\'s no `new`/`this` involved. In more structured systems, factories implement polymorphic creation, where the returned objects share a common interface (e.g., a `Shape` interface with `.area()`) but differ in implementation (`Circle`, `Square`), letting client code work uniformly regardless of the concrete type. Factories also centralize validation and default-value logic for object construction, avoiding duplicated setup code at every call site.',
      productionExample: `\`\`\`js
function createUser(type, data) {
  switch (type) {
    case 'admin':
      return { ...data, role: 'admin', permissions: ['read', 'write', 'delete'] };
    case 'guest':
      return { ...data, role: 'guest', permissions: ['read'] };
    default:
      return { ...data, role: 'member', permissions: ['read', 'write'] };
  }
}
\`\`\`
Factories are used to build UI component variants based on a config object (e.g., a form-field factory returning the right input type), to construct API client instances configured per environment (dev/staging/prod), and in testing to generate mock data objects (\`createMockUser\`) with sensible defaults.`,
      bestPractices: [
        'Keep the factory\'s decision logic (type dispatch) simple and centralized rather than scattered across the codebase',
        'Return objects/instances that share a consistent interface so client code doesn\'t need to know the concrete type',
        'Use factory functions (returning plain objects) instead of classes when you don\'t need prototype-based inheritance',
        'Validate and apply sensible defaults inside the factory rather than at every call site',
        'Keep factories testable by avoiding hidden side effects during object creation',
      ],
      tradeOffs:
        'Advantages: Decouples object creation from usage, easing future changes to how objects are built; centralizes validation/defaults; supports polymorphic object creation cleanly without `new`/`this` pitfalls. Disadvantages: Adds a layer of indirection that can obscure which concrete type is actually created; can become a large, unwieldy switch statement if types proliferate; unnecessary for simple object creation where a factory adds ceremony without real benefit.',
      commonMistakes: [
        'Interview trap: confusing a factory function with the constructor/`new` pattern — a factory doesn\'t require `new` and returns whatever object it likes',
        'Building a factory whose switch/if-else grows unmanageably as new types are added instead of using a registry/map',
        'Coupling the factory to concrete implementation details that leak out to callers, defeating the decoupling purpose',
        'Using a factory for trivial object creation where a plain object literal would be clearer',
        'Not keeping the returned objects\' interfaces consistent, forcing callers to type-check the result anyway',
      ],
      followUpQuestions: [
        'How does the Factory pattern differ from calling a constructor directly with `new`?',
        'How would you refactor a growing switch-based factory into something more scalable?',
        'When would you choose a factory function over a class hierarchy?',
        'How does the Factory pattern relate to the Abstract Factory pattern?',
        'Where have you used a factory pattern in a real frontend codebase?',
      ],
      relatedTopics: ['object creation patterns', 'polymorphism', 'encapsulation', 'abstract factory', 'dependency injection'],
    },
  },
  {
    detail: {
      id: 'jsx1-18',
      questionNumber: 'JSX1-018',
      title: 'Publisher-Subscriber (Pub-Sub) pattern',
      difficulty: 'Medium',
      companies: ['Google', 'Amazon', 'Microsoft', 'Netflix', 'Uber'],
      frequency: 4,
      category: 'Design Patterns & Architecture',
      part: 'Advanced JS',
      concepts: ['pub-sub pattern', 'event emitter', 'decoupling', 'observer pattern', 'design patterns'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Explain the Publisher-Subscriber (Pub-Sub) pattern and how to implement it in JavaScript.',
    },
    answer: {
      expectedAnswer:
        'Pub-Sub is a messaging pattern where publishers emit named events without knowing who (if anyone) is listening, and subscribers register interest in specific event names without knowing who publishes them; a central event bus (broker) mediates between them, decoupling publishers and subscribers entirely. This differs from direct callback passing because neither side holds a reference to the other — they only know about the shared channel/topic name.',
      deepExplanation:
        'The core implementation is a broker object holding a map from event names to arrays of subscriber callbacks: `subscribe(event, callback)` pushes a callback into that event\'s list and returns an unsubscribe function; `publish(event, payload)` looks up all callbacks registered for that event and invokes each with the payload, typically synchronously in order of registration. Because publishers and subscribers never reference each other directly — only the shared event name — new subscribers can be added or removed without any change to the publisher, and vice versa, which is the pattern\'s key decoupling benefit over direct callback wiring. Memory leaks are a real risk: subscribers that are never unsubscribed (e.g., a component that subscribes on mount but forgets to unsubscribe on unmount) keep being invoked and keep their captured closures alive indefinitely, so a robust implementation must always return (and callers must always call) an unsubscribe function.',
      productionExample: `\`\`\`js
function createEventBus() {
  const listeners = new Map();
  return {
    subscribe(event, callback) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(callback);
      return () => listeners.get(event).delete(callback);
    },
    publish(event, payload) {
      listeners.get(event)?.forEach((cb) => cb(payload));
    },
  };
}
\`\`\`
Pub-Sub underlies DOM \`CustomEvent\`/\`EventTarget\` usage, Node.js's \`EventEmitter\`, cross-component communication in apps without a shared state manager, WebSocket message routing by message type, and analytics event dispatching where many independent listeners react to the same tracked events.`,
      bestPractices: [
        'Always provide and call an unsubscribe function to prevent memory leaks from lingering listeners',
        'Namespace or type event names carefully to avoid collisions between unrelated features',
        'Keep subscriber callbacks fast and non-blocking; offload heavy work asynchronously',
        'Avoid using Pub-Sub as a substitute for well-structured state management when explicit data flow would be clearer',
        'Document which events exist and their payload shape, since the decoupling that makes Pub-Sub flexible also makes it easy to lose track of who\'s listening',
        'Guard against a subscriber throwing and breaking the publish loop for other subscribers',
      ],
      tradeOffs:
        'Advantages: Strong decoupling between producers and consumers of events; easy to add new subscribers without touching publisher code; well suited for cross-cutting concerns like logging/analytics. Disadvantages: Implicit data flow makes it harder to trace "who reacts to this event" by reading code alone; easy to introduce memory leaks via forgotten unsubscriptions; can lead to fragile systems where side effects are scattered and hard to reason about compared to explicit state management.',
      commonMistakes: [
        'Interview trap: conflating Pub-Sub with the Observer pattern — Pub-Sub always goes through a broker/mediator, Observer typically has direct subject-observer references',
        'Forgetting to unsubscribe listeners on component unmount, causing memory leaks and stale-closure bugs',
        'Letting one subscriber\'s thrown error prevent other subscribers from being notified',
        'Using overly generic event names that collide across unrelated features',
        'Overusing Pub-Sub for state that would be better managed by a predictable store (Redux/Zustand)',
      ],
      followUpQuestions: [
        'How does Pub-Sub differ from the Observer pattern?',
        'How would you prevent memory leaks in a Pub-Sub implementation?',
        'How would you handle an error thrown inside one subscriber without breaking others?',
        'How does the DOM\'s CustomEvent/EventTarget relate to Pub-Sub?',
        'When would you choose Pub-Sub over a centralized state store?',
      ],
      relatedTopics: ['observer pattern', 'EventEmitter', 'CustomEvent', 'decoupled architecture', 'memory leaks', 'event-driven design'],
    },
  },
  {
    detail: {
      id: 'jsx1-19',
      questionNumber: 'JSX1-019',
      title: 'Observer pattern vs Pub-Sub',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Adobe', 'Flipkart', 'Zoho'],
      frequency: 3,
      category: 'Design Patterns & Architecture',
      part: 'Advanced JS',
      concepts: ['observer pattern', 'pub-sub pattern', 'subject-observer', 'event broker', 'design patterns'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the Observer pattern, and how does it differ from the Pub-Sub pattern?',
    },
    answer: {
      expectedAnswer:
        'The Observer pattern has a "subject" that maintains a list of observers directly and notifies them all when its state changes, meaning the subject knows about its observers (holds direct references) even though observers don\'t need to know about each other. Pub-Sub adds a third party — a broker/event bus — so publishers and subscribers have no direct reference to each other at all, only to the shared channel/topic.',
      deepExplanation:
        'In classic Observer, the subject exposes `subscribe(observer)`/`notify()` methods and keeps its own internal list of registered observers, calling a defined method (e.g., `update()`) on each when its state changes — this is tight coupling between subject and observer interface, but loose coupling in that the subject doesn\'t care what the observers do with the notification. Pub-Sub decouples this further: the publisher calls `broker.publish(topic, data)` without knowing who\'s subscribed, and the broker is the only entity holding subscriber references, which means publishers and subscribers can be developed, deployed, and reasoned about entirely independently, and can even be swapped for asynchronous/distributed transport (e.g., a message queue) without changing either side\'s code. A useful distinguishing question: "does the source of the event hold direct references to its listeners?" — yes means Observer, no (mediated through a broker) means Pub-Sub. In practice, many JS libraries blur the line — an `EventEmitter` is often called both, since the emitter instance is technically a broker but is also frequently directly referenced like a subject.',
      productionExample:
        'Observer is the model behind reactive state libraries where a store notifies directly-registered subscriber functions on state change (e.g., a simple observable store\'s `.subscribe(listener)`), while Pub-Sub is the model behind app-wide event buses, WebSocket-based real-time systems, and message-queue-based microservice communication where publishers and subscribers are fully decoupled processes.',
      bestPractices: [
        'Choose Observer when the relationship is naturally one subject with directly interested observers (e.g., a single store or model)',
        'Choose Pub-Sub when you need many independent, decoupled producers and consumers that shouldn\'t know about each other',
        'Be precise with terminology in system design discussions — interviewers often probe whether you understand the direct-reference distinction',
        'Ensure whichever pattern you use provides an unsubscribe mechanism to avoid leaks',
        'Consider whether cross-module/cross-service decoupling (favoring Pub-Sub) or tight, well-defined state ownership (favoring Observer) better fits the problem',
      ],
      tradeOffs:
        'Advantages: Observer offers a simpler, more traceable relationship since the subject directly owns its observer list; Pub-Sub offers maximum decoupling, letting subsystems evolve independently and even scale across processes. Disadvantages: Observer\'s direct references mean subject and observer interfaces are more tightly coupled; Pub-Sub\'s indirection makes tracing "who listens to what" harder without discipline; both risk memory leaks from unremoved listeners.',
      commonMistakes: [
        'Interview trap: using "Observer" and "Pub-Sub" interchangeably without acknowledging the direct-reference vs broker-mediated distinction',
        'Assuming RxJS Observables are the same as the classic GoF Observer pattern — they add operators/composition on top of the core notify concept',
        'Not considering that Pub-Sub\'s decoupling can make debugging "why did this run" harder due to indirect event flow',
        'Building an Observer-based subject that never removes disposed observers, leaking memory',
        'Conflating an EventEmitter (broker-like) with a plain Observer subject when explaining the architecture',
      ],
      followUpQuestions: [
        'How would you decide between Observer and Pub-Sub for a given feature?',
        'How does RxJS relate to the classic Observer pattern?',
        'What memory leak risks exist in both patterns, and how do you mitigate them?',
        'How does a state management library like Redux relate to the Observer pattern?',
        'Can you give an example where Pub-Sub is clearly preferable to direct Observer wiring?',
      ],
      relatedTopics: ['pub-sub pattern', 'EventEmitter', 'RxJS observables', 'reactive programming', 'decoupled architecture'],
    },
  },
  {
    detail: {
      id: 'jsx1-20',
      questionNumber: 'JSX1-020',
      title: 'Decorator and Strategy patterns',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Microsoft', 'Adobe', 'Stripe'],
      frequency: 3,
      category: 'Design Patterns & Architecture',
      part: 'Advanced JS',
      concepts: ['decorator pattern', 'strategy pattern', 'higher-order functions', 'composition', 'design patterns'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Can you explain the Decorator and Strategy patterns and their use cases in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'The Decorator pattern wraps an object or function to add new behavior or responsibilities without modifying its original code, typically by composing wrapper functions/objects that call through to the wrapped one and add logic before/after. The Strategy pattern defines a family of interchangeable algorithms/behaviors behind a common interface, letting the caller swap which concrete strategy is used at runtime without changing the calling code.',
      deepExplanation:
        'In JavaScript, decorators are naturally expressed as higher-order functions: a decorator takes a function and returns a new function that wraps it, adding behavior like logging, caching, timing, or retry logic while delegating to the original for the core work — this composes cleanly, since multiple decorators can be layered (`withLogging(withCache(fetchData))`). The TC39 decorator proposal/TypeScript\'s experimental decorators bring similar wrapping semantics to classes and methods via `@decorator` syntax, but the underlying idea — wrap and extend without modifying the original — is the same. The Strategy pattern instead focuses on interchangeable *algorithms* rather than added behavior: a context object holds a reference to a strategy (a function or object implementing a common interface) and delegates the actual work to it, so switching strategies at runtime changes *what* computation happens, not *whether* extra behavior wraps around it. The key distinction: Decorator augments behavior around an unchanged core algorithm (open/closed principle in action — extend without modifying), while Strategy swaps out the core algorithm itself while the surrounding structure (the context) stays the same.',
      productionExample: `\`\`\`js
// Decorator: wraps behavior around a function
const withLogging = (fn) => (...args) => {
  console.log('calling with', args);
  return fn(...args);
};
const loggedFetch = withLogging(fetchData);

// Strategy: swappable algorithm behind a common interface
const strategies = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
};
function sort(arr, strategyName) {
  return strategies[strategyName](arr);
}
\`\`\`
Decorator is used for HOCs and middleware in React/Redux (wrapping a component or reducer with added behavior), API client wrappers adding retry/caching/auth headers; Strategy is used for pluggable validation rules, payment-method processing (Stripe/PayPal/etc. behind a common \`process()\` interface), and sorting/formatting logic selected by user preference or config.`,
      bestPractices: [
        'Keep decorators composable and order-independent where possible, or clearly document required ordering',
        'Ensure each decorator has a single, well-defined responsibility (logging, caching, retrying) rather than mixing concerns',
        'Define a clear common interface for all strategies so the context can swap them transparently',
        'Prefer function-based decorators/strategies in JS over class-based ones unless the codebase is already class-heavy',
        'Avoid overusing Decorator for logic that would be clearer as a straightforward conditional inside the function',
        'Test each strategy independently against the shared interface contract',
      ],
      tradeOffs:
        'Advantages: Decorator supports the open/closed principle, adding behavior without touching existing code; Strategy makes algorithms swappable and testable in isolation, avoiding large conditional blocks. Disadvantages: Layering many decorators can make debugging and stack traces harder to follow; Strategy adds indirection and boilerplate for simple cases with only one or two variants; both patterns can be over-applied, adding abstraction where a simple function would suffice.',
      commonMistakes: [
        'Interview trap: confusing Decorator (adds behavior around unchanged core logic) with Strategy (swaps the core algorithm itself)',
        'Stacking decorators in an order that produces subtly wrong behavior (e.g., caching wrapped around logging vs. the reverse)',
        'Implementing strategies without a truly common interface, forcing the context to special-case each one',
        'Overusing class-based decorators/strategies in JS when plain higher-order functions would be simpler',
        'Not considering performance overhead when many decorators wrap a hot-path function',
      ],
      followUpQuestions: [
        'How would you implement a decorator that adds caching to an existing function?',
        'How does Strategy differ from simply using if/else or a switch statement?',
        'How do JavaScript/TypeScript class decorators relate to the function-wrapping Decorator pattern?',
        'How would you test code that depends on a swappable strategy?',
        'Can you give a real example from a codebase where you used one of these patterns?',
      ],
      relatedTopics: ['higher-order functions', 'HOCs', 'middleware pattern', 'open/closed principle', 'composition over inheritance', 'TC39 decorators'],
    },
  },
  {
    detail: {
      id: 'jsx1-21',
      questionNumber: 'JSX1-021',
      title: 'Polyfilling map, filter, reduce, forEach',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Flipkart'],
      frequency: 5,
      category: 'Mastering Array Methods',
      part: 'Advanced JS',
      concepts: ['array methods', 'polyfills', 'Array.prototype', 'higher-order functions', 'callback parameters'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you create polyfills for common array methods like map, filter, reduce, and forEach?',
    },
    answer: {
      expectedAnswer:
        'Each polyfill is added to `Array.prototype` (guarded so it doesn\'t overwrite a native implementation) and internally loops over `this` using an index, calling the provided callback with `(element, index, array)` and building up the appropriate result: `map` collects transformed values into a new array, `filter` collects elements for which the callback is truthy, `forEach` just invokes the callback for side effects and returns `undefined`, and `reduce` accumulates a single value across all elements, optionally seeded with an initial value.',
      deepExplanation:
        'All four methods share the same iteration shape but differ in what they do with each callback result. `map` and `filter` build a new array (`map` always same length as input, `filter` only appending when the predicate is truthy) and must call the callback with `thisArg` support via `.call(thisArg, el, i, arr)`. `forEach` has no return value and exists purely for side effects, so its polyfill is the simplest — just loop and invoke. `reduce` is the most subtle: if no initial value is provided, the first array element becomes the initial accumulator and iteration starts from index 1; if the array is empty and no initial value is given, it must throw a `TypeError` (`Reduce of empty array with no initial value`), matching native behavior. All should skip holes in sparse arrays for full spec fidelity (native `map`/`filter`/`forEach` skip unassigned indices in sparse arrays), though most interview-level polyfills simplify this. Correctness also requires reading `array.length` once (or being careful about mutation during iteration) and using `array[i]` access rather than assuming dense, zero-indexed content.',
      productionExample: `\`\`\`js
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  if (acc === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    acc = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};
\`\`\`
Understanding these polyfills is directly useful for writing custom data-transformation utilities in environments needing backward compatibility, and for correctly reasoning about \`reduce\`-based state machines and accumulation logic used throughout data-normalization and Redux reducer code.`,
      bestPractices: [
        'Guard polyfills with `if (!Array.prototype.map) { ... }` to avoid overwriting native, more optimized implementations',
        'Support `thisArg` as the optional second/third parameter matching native method signatures',
        'Throw a TypeError for reduce on an empty array with no initial value, matching spec behavior',
        'Never rely on hand-rolled polyfills in production — use native methods or a vetted polyfill library like core-js',
        'Preserve holes-in-sparse-arrays behavior if full spec fidelity matters for your use case',
        'Avoid mutating the array being iterated inside the callback, which can cause unpredictable results',
      ],
      tradeOffs:
        'Advantages: Writing these polyfills builds a precise mental model of array-method semantics and edge cases (empty arrays, sparse arrays, thisArg); useful in constrained/legacy environments lacking native support. Disadvantages: Hand-rolled polyfills are slower than native, highly optimized engine implementations; easy to miss subtle spec edge cases (holes, empty-reduce TypeError); maintaining custom polyfills adds risk and bundle size versus using standard, tested ones.',
      commonMistakes: [
        'Interview trap: forgetting reduce must throw a TypeError for an empty array with no initial value rather than silently returning undefined',
        'Not supporting the optional `thisArg` parameter that native array methods accept',
        'Off-by-one errors when reduce has no initial value (starting iteration at the wrong index)',
        'Not preserving the `(element, index, array)` callback signature that other code may rely on',
        'Mutating the array while iterating over it inside the callback, causing skipped or repeated elements',
        'Overwriting the native method instead of guarding, which can break other code relying on native behavior/performance',
      ],
      followUpQuestions: [
        'What does native reduce do differently when no initial value is provided?',
        'How would you support the optional thisArg parameter in your polyfill?',
        'How do these methods behave with sparse arrays (arrays with holes)?',
        'How would you implement Array.prototype.some or every as a polyfill?',
        'Why should you guard a polyfill instead of unconditionally assigning to the prototype?',
      ],
      relatedTopics: ['Array.prototype', 'reduce edge cases', 'sparse arrays', 'thisArg', 'core-js', 'Redux reducers'],
    },
  },
  {
    detail: {
      id: 'jsx1-22',
      questionNumber: 'JSX1-022',
      title: 'splice vs slice',
      difficulty: 'Easy',
      companies: ['Amazon', 'Microsoft', 'Adobe', 'Uber', 'Zoho'],
      frequency: 4,
      category: 'Mastering Array Methods',
      part: 'Advanced JS',
      concepts: ['splice', 'slice', 'mutability', 'array methods', 'shallow copy'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is the difference between splice and slice in JavaScript?',
    },
    answer: {
      expectedAnswer:
        '`slice(start, end)` returns a new shallow-copied array containing the selected elements without modifying the original array. `splice(start, deleteCount, ...items)` mutates the original array in place — removing, replacing, or inserting elements — and returns an array of the removed elements (not the modified array itself).',
      deepExplanation:
        '`slice` is non-destructive: it takes optional start and end indices (end exclusive, both can be negative to count from the array\'s end) and returns a new array referencing the same elements (a shallow copy — nested objects/arrays are still shared references, not deep-cloned). `splice` is destructive and far more versatile: its first argument is the start index, the second is how many elements to delete from that point, and any further arguments are items to insert at that position, all performed in place on the original array; calling `splice(index, 0, item)` inserts without deleting, and `splice(index, 1)` deletes without inserting, making it a general-purpose "remove and/or insert" operation. Because `slice` doesn\'t mutate, it\'s the natural choice in immutable-update patterns (React state, Redux reducers), whereas `splice`\'s in-place mutation makes it risky to use directly on state that must remain referentially stable for change detection — using it on React state without copying first will mutate the array without triggering a re-render, since the reference itself doesn\'t change.',
      productionExample:
        '`slice` is used constantly for immutable array operations — pagination (`items.slice(0, pageSize)`), creating a copy before sorting (`[...arr].sort()` or `arr.slice().sort()`), and extracting substrings of an array for rendering; `splice` is used when in-place mutation is intentional, such as removing a single item from a local mutable working array before wrapping the result in a new array for state updates.',
      bestPractices: [
        'Use slice (or spread) when you need an immutable copy, especially for React/Redux state updates',
        'Never call splice directly on state you don\'t own or that must remain referentially unchanged for change detection',
        'When you do need splice\'s remove/insert power on state, splice a copy (`const copy = [...arr]; copy.splice(...)`) not the original',
        'Remember splice returns the removed elements, not the mutated array — don\'t assign its return value expecting the updated array',
        'Use negative indices in slice deliberately and document intent, since they\'re easy to misread',
      ],
      tradeOffs:
        'Advantages: slice is safe and predictable for extracting data without side effects, fitting functional/immutable patterns well; splice is powerful and efficient for in-place removal/insertion when mutation is genuinely intended. Disadvantages: splice\'s mutation can cause hard-to-trace bugs if the original array is shared/referenced elsewhere; slice\'s shallow copy can still lead to unintended shared-reference mutations on nested objects; splice\'s combined delete+insert signature is easy to misuse or misread.',
      commonMistakes: [
        'Interview trap: assuming both methods return the same kind of result — splice returns removed elements, slice returns the extracted subset',
        'Calling splice directly on React/Redux state, mutating it without triggering a re-render or reducer-detected change',
        'Confusing the argument order/meaning of splice\'s deleteCount versus slice\'s end index',
        'Assuming slice performs a deep copy when it only shallow-copies references',
        'Forgetting splice mutates the original array length and indices, which can break concurrent loop iteration over the same array',
      ],
      followUpQuestions: [
        'What does splice return versus what slice returns?',
        'How would you remove an item from a React state array without using splice directly on state?',
        'Does slice perform a deep or shallow copy?',
        'How would you use splice to insert an item without removing anything?',
        'What happens if you call splice while iterating over the same array with a for loop?',
      ],
      relatedTopics: ['immutability', 'shallow copy', 'array mutation', 'React state updates', 'Redux reducers'],
    },
  },
  {
    detail: {
      id: 'jsx1-23',
      questionNumber: 'JSX1-023',
      title: 'Implementing Array.prototype.flat',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Netflix', 'Stripe', 'Flipkart'],
      frequency: 3,
      category: 'Mastering Array Methods',
      part: 'Advanced JS',
      concepts: ['Array.prototype.flat', 'recursion', 'nested arrays', 'reduce', 'depth parameter'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you implement the Array.prototype.flat method in JavaScript?',
    },
    answer: {
      expectedAnswer:
        '`flat(depth = 1)` returns a new array with nested sub-arrays flattened up to the given depth; a depth of `Infinity` fully flattens arbitrarily nested arrays. It\'s implemented by recursively checking each element — if it\'s an array and remaining depth is greater than zero, recurse into it and flatten with depth decremented by one; otherwise, keep the element as-is — collecting results into a new array without mutating the original.',
      deepExplanation:
        'The recursive approach reduces over the input array, and for each element checks `Array.isArray(el) && depth > 0`; if true, it recursively flattens that sub-array with `depth - 1` and spreads/concats the result into the accumulator, otherwise it pushes the element directly. Base case: when `depth` reaches `0`, arrays are no longer flattened further and are pushed as-is (nested as a sub-array). For full (`Infinity`) flattening, depth never reaches zero, so the recursion continues until every nested array has been unwrapped. Native `flat` also skips holes in sparse arrays (like `map`/`filter`), and it\'s commonly paired with `flatMap`, which is a `map` immediately followed by a `flat(1)` but implemented as a single, more efficient pass rather than two separate array traversals. An iterative alternative using an explicit stack avoids recursion-depth limits for extremely deeply nested inputs, which the recursive version could hit for pathological inputs.',
      productionExample: `\`\`\`js
function myFlat(arr, depth = 1) {
  return arr.reduce((acc, el) => {
    if (Array.isArray(el) && depth > 0) {
      acc.push(...myFlat(el, depth - 1));
    } else {
      acc.push(el);
    }
    return acc;
  }, []);
}

myFlat([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
myFlat([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
\`\`\`
flat/flatMap are used to normalize nested API response structures (e.g., categories containing sub-category arrays) into a single list for rendering, to merge grouped/paginated data fetched in chunks, and to simplify tree-like data (comment threads, nested menus) into flat lists for search/filtering.`,
      bestPractices: [
        'Default depth to 1 to match native `flat` semantics unless full flattening is explicitly needed',
        'Use `flatMap` instead of separate `.map().flat()` calls for a single, more efficient traversal when depth is 1',
        'Guard against extremely deep nesting causing stack overflow in a recursive implementation; consider an iterative stack-based approach for untrusted/deep input',
        'Use `Infinity` explicitly and intentionally when full flattening is required, documenting why',
        'Avoid mutating the original nested array — always build and return a new array',
      ],
      tradeOffs:
        'Advantages: Simplifies working with nested/tree-like data structures into linear lists for iteration, search, and rendering; native implementation is highly optimized and simple to use with a depth parameter. Disadvantages: Deep or unbounded flattening can be expensive for very large/deeply nested structures; recursive implementations risk stack overflow on pathological inputs; flattening can lose structural information (e.g., which items originally belonged to which sub-array) unless tracked separately.',
      commonMistakes: [
        'Interview trap: forgetting the default depth for flat() is 1, not Infinity',
        'Using recursion without a depth-based base case, causing full flattening even when a shallow flatten was requested',
        'Mutating the original array instead of returning a new flattened one',
        'Not considering stack-overflow risk for very deeply nested arrays in a naive recursive implementation',
        'Using `.map().flat()` instead of `.flatMap()` when only depth-1 flattening is needed, causing an extra unnecessary array pass',
      ],
      followUpQuestions: [
        'What is the default depth for Array.prototype.flat?',
        'How does flatMap differ from calling map then flat separately?',
        'How would you flatten a deeply nested array without risking a stack overflow?',
        'How would you flatten an array while also transforming each element?',
        'How does flat handle holes in sparse arrays?',
      ],
      relatedTopics: ['flatMap', 'recursion', 'reduce', 'tree flattening', 'sparse arrays', 'stack overflow'],
    },
  },
  {
    detail: {
      id: 'jsx1-24',
      questionNumber: 'JSX1-024',
      title: 'Higher-order array functions and readability',
      difficulty: 'Easy',
      companies: ['Meta', 'Amazon', 'Adobe', 'Flipkart', 'Zoho'],
      frequency: 4,
      category: 'Mastering Array Methods',
      part: 'Advanced JS',
      concepts: ['higher-order functions', 'map/filter/reduce', 'declarative code', 'method chaining', 'readability'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'How do higher-order array functions improve the readability and functionality of your code?',
    },
    answer: {
      expectedAnswer:
        'Higher-order array functions (`map`, `filter`, `reduce`, `find`, `some`, `every`, etc.) replace manual `for` loops with declarative, intention-revealing calls — the method name itself communicates what\'s happening (transforming, selecting, aggregating) instead of requiring the reader to trace loop mechanics to infer intent. They also compose naturally via chaining, letting complex data transformations be expressed as a readable pipeline of small, focused steps.',
      deepExplanation:
        'A `for` loop describes *how* to iterate (initialize a counter, check a condition, increment) but says nothing about *why*, forcing readers to mentally execute the loop to understand its purpose; `array.filter(isActive).map(toDisplayName)` states the intent directly in the method names, shifting the code from imperative to declarative. This also reduces bug surface: hand-written loops are prone to off-by-one errors, forgotten `break`/`continue`, and accidental mutation of loop variables, whereas built-in array methods are correctly implemented once and reused everywhere, and each method\'s contract (map preserves length, filter never adds elements, reduce always returns exactly one value) constrains what the code can be doing, making review faster. The trade-off is performance and debugging: each chained call (`.filter().map()`) creates an intermediate array and traverses the data multiple times, which can matter for very large datasets or hot paths, and stepping through a long chain in a debugger is less straightforward than stepping through explicit loop iterations line by line.',
      productionExample:
        'Data-transformation pipelines in UI code commonly chain `filter` (remove inactive/deleted items), `map` (shape data for rendering), and `sort` before rendering a list; `reduce` is used to aggregate totals, group items by key, or build lookup maps from arrays fetched from an API, all more concisely and safely than manually managed loop variables.',
      bestPractices: [
        'Use map/filter/reduce/find/some/every when they directly express the intent, rather than a generic for loop',
        'Extract named predicate/transform functions (e.g., `isActive`, `toDisplayName`) to keep chains self-documenting',
        'Be mindful of performance when chaining multiple array methods over very large datasets — consider a single loop or `reduce` for hot paths',
        'Avoid overusing reduce for logic that would be clearer as separate map/filter steps',
        'Keep chains reasonably short; extremely long method chains can become as hard to read as an unclear loop',
      ],
      tradeOffs:
        'Advantages: Declarative, self-documenting code that reduces common loop-related bugs; composes cleanly into readable pipelines; each method\'s narrow contract makes code review and reasoning easier. Disadvantages: Chained calls create intermediate arrays and traverse data multiple times, which can hurt performance on very large arrays; debugging a long chain is less linear than stepping through an explicit loop; overusing reduce for everything can hurt readability instead of helping it.',
      commonMistakes: [
        'Interview trap: claiming higher-order functions are always faster than a for loop — they\'re often slower due to intermediate arrays and function call overhead, though usually negligible at typical UI data sizes',
        'Chaining too many array methods together, creating multiple full-array passes when a single loop or reduce would be more efficient',
        'Using reduce for logic that would be clearer as a plain map or filter',
        'Mutating shared state inside a map/filter callback, breaking the assumption of pure transformation',
        'Not naming intermediate transform/predicate functions, leaving inline arrow functions that obscure intent in a long chain',
      ],
      followUpQuestions: [
        'When would a plain for loop be preferable to chained array methods?',
        'How would you optimize a long chain of map/filter/reduce calls over a large array?',
        'How do higher-order array methods affect debugging compared to explicit loops?',
        'Can you give an example where reduce is overused and a simpler approach is clearer?',
        'How does immutability relate to using these higher-order methods?',
      ],
      relatedTopics: ['declarative programming', 'method chaining', 'pure functions', 'performance optimization', 'immutability'],
    },
  },
  {
    detail: {
      id: 'jsx1-25',
      questionNumber: 'JSX1-025',
      title: 'Immutability with arrays',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Stripe'],
      frequency: 4,
      category: 'Mastering Array Methods',
      part: 'Advanced JS',
      concepts: ['immutability', 'spread operator', 'shallow copy', 'deep copy', 'React state updates'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Can you explain the concept of immutability when working with arrays?',
    },
    answer: {
      expectedAnswer:
        'Immutability means never modifying an existing array in place — instead, any "update" produces a new array (or new nested structure) while the original is left untouched, typically using non-mutating methods (`map`, `filter`, `slice`, spread `[...arr]`) instead of mutating ones (`push`, `splice`, `sort`, direct index assignment). This matters because it enables reliable reference-based change detection and predictable state history, which frameworks like React and Redux depend on.',
      deepExplanation:
        'JavaScript arrays are mutable by default — methods like `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse` all mutate the array in place and return either the mutated array or some other value, while `map`, `filter`, `slice`, `concat`, and the spread operator all return new arrays without touching the original. Immutability is a discipline, not a language guarantee (short of `Object.freeze`, which only shallow-freezes and can be bypassed in non-strict mode silently), so it depends on consistently choosing non-mutating operations and copying (`[...arr]`, `structuredClone`, or a library like Immer) before making changes. This matters most acutely in React: state/props comparisons (in `useMemo`, `React.memo`, `shouldComponentUpdate`) use reference equality (`===`), so mutating an array in place keeps the same reference and silently fails to trigger a re-render even though the data changed, whereas creating a new array with the same values but a new reference correctly signals "this changed." True immutability with nested arrays/objects requires deep copying or new references at every level that changed (`{...state, items: state.items.map(...)}`), since a shallow spread only creates a new top-level array while nested objects inside it remain shared references — mutating a nested object after a shallow copy still mutates the original.',
      productionExample:
        'Redux reducers must return new state objects/arrays rather than mutating the existing store (enforced conceptually, and by tools like Redux Toolkit\'s Immer-based `produce` which lets you write mutation-looking code that\'s translated into immutable updates under the hood); React list rendering relies on immutable updates (`setItems(prev => [...prev, newItem])`) to correctly trigger re-renders and enable time-travel debugging/undo-redo features.',
      bestPractices: [
        'Use non-mutating methods (map, filter, slice, spread) instead of push/splice/sort when updating array-based state',
        'When sorting or reversing state arrays, copy first (`[...arr].sort()`), since `sort`/`reverse` mutate in place',
        'For deeply nested state, use a library like Immer (or manually spread every changed level) to avoid missing a nested mutation',
        'Use `Object.freeze` in development to catch accidental mutations early, understanding it\'s shallow and can be silently ignored in non-strict contexts',
        'Prefer `structuredClone` or a proper deep-clone utility over `JSON.parse(JSON.stringify(...))` for correctness with dates, Maps, etc.',
        'Rely on reference equality checks (`===`) only when you\'re certain the codebase consistently follows immutable update patterns',
      ],
      tradeOffs:
        'Advantages: Enables fast reference-equality change detection for memoization and re-render optimization; supports predictable state history, undo/redo, and easier debugging/time-travel; avoids a whole class of bugs from unexpected shared mutation. Disadvantages: Copying arrays/objects on every update has memory and CPU overhead, especially for large or deeply nested structures; requires discipline across a codebase/team since JS doesn\'t enforce immutability natively; deeply nested immutable updates can produce verbose, error-prone spread chains without a helper library.',
      commonMistakes: [
        'Interview trap: assuming spread (`[...arr]`) performs a deep copy — it\'s a shallow copy, so nested objects/arrays are still shared references',
        'Mutating React/Redux state directly with push/splice/sort, causing missed re-renders due to unchanged references',
        'Forgetting sort() and reverse() mutate the original array, unlike most other commonly chained array methods',
        'Using JSON.parse(JSON.stringify(...)) for deep cloning and silently losing Dates, functions, undefined values, or Maps/Sets',
        'Assuming Object.freeze makes an array fully immutable when it only shallow-freezes the top level',
        'Not copying a nested level when only the top-level array was spread, mutating a shared nested object anyway',
      ],
      followUpQuestions: [
        'What is the difference between a shallow copy and a deep copy of an array?',
        'Why does mutating state directly break React\'s re-render optimization?',
        'How does Immer let you write "mutating" code that produces immutable updates?',
        'What are the limitations of Object.freeze for enforcing immutability?',
        'How would you deeply clone an array containing nested objects safely?',
      ],
      relatedTopics: ['shallow copy vs deep copy', 'Redux reducers', 'React re-render optimization', 'Immer', 'Object.freeze', 'structuredClone'],
    },
  },
];
