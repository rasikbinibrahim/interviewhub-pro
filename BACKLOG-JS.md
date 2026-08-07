# JavaScript Content Backlog

250 JavaScript topics were authored in a prior version of this repo (as
structured Q&A data, not markdown) — real, technically-reviewed content:
core concept explanations, senior-level nuance, and runnable code examples
with expected output for every single one. Rather than lose that work in
the rebuild, this file is the conversion backlog: everything below still
needs to become a proper markdown topic page under
[02-javascript-fundamentals](02-javascript-fundamentals) or
[03-advanced-javascript](03-advanced-javascript) following
[TEMPLATE.md](TEMPLATE.md), but the underlying research/writing is already
done — this is a formatting/expansion pass, not a from-zero research pass.

**✅ = converted to a full topic page already.** Everything else is
unconverted but source-available in [`_salvage/`](_salvage) — the raw
core-concept explanation, senior-nuance note, and working code example for
every title below already exists there, keyed by id; converting one is a
formatting/expansion pass against that source, not a from-zero write-up.

## Core Concepts

- [x] var vs let vs const → [var-let-const.md](02-javascript-fundamentals/var-let-const.md)
- [x] this keyword, call(), apply(), bind() → [this-call-apply-bind.md](02-javascript-fundamentals/this-call-apply-bind.md)
- [x] Prototype, Prototype Chain, Constructor Functions, Inheritance → [prototypes-and-inheritance.md](02-javascript-fundamentals/prototypes-and-inheritance.md)
- [x] Closures → [closures.md](02-javascript-fundamentals/closures.md)
- [x] Event Loop, Callback Queue, Microtask Queue, Macrotask Queue → [event-loop-and-async.md](03-advanced-javascript/event-loop-and-async.md)
- [x] Promises → [promise-internals.md](03-advanced-javascript/promise-internals.md)
- [x] Hoisting → [hoisting.md](02-javascript-fundamentals/hoisting.md)
- [x] Scope, Scope Chain, Lexical Environment → [scope-and-lexical-environment.md](02-javascript-fundamentals/scope-and-lexical-environment.md)
- [ ] What is JavaScript?
- [x] Data Types → [data-types.md](02-javascript-fundamentals/data-types.md)
- [x] undefined vs null → [undefined-vs-null.md](02-javascript-fundamentals/undefined-vs-null.md)
- [x] NaN → [nan.md](02-javascript-fundamentals/nan.md)
- [x] typeof → [typeof-operator.md](02-javascript-fundamentals/typeof-operator.md)
- [x] Truthy vs Falsy → [truthy-falsy.md](02-javascript-fundamentals/truthy-falsy.md)
- [x] Arrow Functions → [arrow-functions.md](02-javascript-fundamentals/arrow-functions.md)
- [ ] Function Declaration vs Expression
- [x] Destructuring → [destructuring.md](02-javascript-fundamentals/destructuring.md)
- [ ] Spread Operator
- [ ] Rest Operator
- [ ] Optional Chaining
- [x] Higher Order Functions → [higher-order-functions.md](02-javascript-fundamentals/higher-order-functions.md)
- [ ] Callback Functions
- [x] async/await → [async-await.md](03-advanced-javascript/async-await.md)
- [x] Execution Context → [execution-context-and-call-stack.md](03-advanced-javascript/execution-context-and-call-stack.md)
- [x] Call Stack → [execution-context-and-call-stack.md](03-advanced-javascript/execution-context-and-call-stack.md) (covered together with Execution Context — the two are one interview question in practice)
- [ ] ES6 Classes
- [ ] Encapsulation
- [ ] Polymorphism
- [ ] Error Handling
- [ ] V8 Engine
- [ ] Garbage Collection
- [ ] Mark & Sweep
- [ ] Hidden Classes
- [ ] JIT Compilation
- [ ] Browser Rendering Pipeline
- [ ] Reflow vs Repaint
- [ ] Memory Leaks
- [ ] SharedArrayBuffer
- [ ] Atomics
- [ ] Concurrent JavaScript
- [ ] Reactive Programming
- [ ] RxJS
- [ ] Scheduler Design
- [ ] Runtime Optimization

## Execution & Memory Model

- [ ] Stack Memory vs Heap Memory
- [ ] Temporal Dead Zone (TDZ)
- [ ] Execution Context Phases (Creation vs Execution)
- [ ] Global Execution Context vs Function Execution Context
- [ ] Call Stack Overflow & Recursion Limits
- [ ] Generational Garbage Collection (Scavenger Algorithm)
- [ ] WeakRef and FinalizationRegistry

## Scope & Closures (beyond the flagship page)

- [ ] IIFE (Immediately Invoked Function Expressions)
- [ ] Module Pattern using Closures
- [ ] Closures Inside Loops (var vs let Pitfall)
- [ ] Block Scope vs Function Scope
- [ ] Named Function Expressions

## this, bind, call & apply (beyond the core page)

- [ ] this in Arrow Functions vs Regular Functions
- [ ] Losing this Context (Common Bugs & Fixes)
- [ ] What Really Happens with the new Keyword
- [ ] Partial Application with bind()

## Prototypes & OOP (beyond the core page)

- [ ] Object.create()
- [ ] Prototypal Inheritance vs Classical Inheritance
- [ ] Static Methods and Properties
- [ ] Private Class Fields (#)
- [ ] Getters and Setters
- [ ] Mixins in JavaScript
- [ ] instanceof Operator Internals

## Modules

- [ ] CommonJS vs ES Modules
- [ ] Named Exports vs Default Exports
- [ ] Dynamic import()
- [ ] Top-level await
- [ ] Circular Module Dependencies
- [ ] Tree Shaking and Module Design

## Async & Promises (beyond the core page)

- [ ] Building a Custom Promise from Scratch
- [ ] Promise Chaining Pitfalls
- [ ] Microtask vs Macrotask Ordering (Advanced Cases)
- [ ] async/await Error Handling Patterns
- [ ] Sequential vs Parallel Async Execution
- [ ] queueMicrotask()
- [ ] Promise Internal States Explained
- [ ] Unhandled Promise Rejections

## Generators & Iterators

- [ ] Generators Basics
- [ ] Iterators and the Iterable Protocol
- [ ] Symbol.iterator
- [ ] yield* Delegation
- [ ] Async Generators and for await...of
- [ ] Building Infinite Sequences with Generators

## Functional Programming

- [ ] Currying (Concept & Use Cases)
- [ ] Partial Application vs Currying
- [ ] Function Composition (compose & pipe)
- [ ] Pure Functions and Side Effects
- [ ] Immutability Patterns in JavaScript
- [ ] Memoization (Concept & Trade-offs)
- [ ] Point-Free Style Programming

## Performance Patterns

- [ ] Debouncing (Concept)
- [ ] Throttling (Concept)
- [ ] Debounce vs Throttle: When to Use Which
- [ ] requestAnimationFrame-based Throttling

## Event Handling

- [ ] Event Delegation
- [ ] Event Bubbling vs Capturing
- [ ] stopPropagation vs preventDefault
- [ ] Custom Events (CustomEvent API)

## Design Patterns

- [ ] Observer Pattern (Concept)
- [ ] Pub/Sub Pattern (Concept)
- [ ] Singleton Pattern in JavaScript
- [ ] Factory Pattern in JavaScript
- [ ] Revealing Module Pattern
- [ ] Decorator Pattern in JavaScript

## Meta-programming

- [ ] Proxy Object Fundamentals
- [ ] Reflect API
- [ ] Proxy Traps Deep Dive (get/set/has/deleteProperty)
- [ ] Symbol Type and Well-Known Symbols
- [ ] Symbol.toPrimitive

## Collections (Map/Set/WeakMap/WeakSet)

- [ ] Map vs Plain Object
- [ ] Set vs Array for Uniqueness
- [ ] WeakMap Use Cases
- [ ] WeakSet Use Cases
- [ ] WeakMap vs Map: Key Differences

## Object Internals

- [ ] Property Descriptors (writable, enumerable, configurable)
- [ ] Object.freeze()
- [ ] Object.seal()
- [ ] Object.freeze vs Object.seal vs Object.preventExtensions
- [ ] Shallow Copy vs Deep Clone
- [ ] structuredClone() API
- [ ] Object.is() vs ===
- [ ] Object.assign() Pitfalls

## Type Coercion

- [ ] Type Coercion Rules in JavaScript
- [ ] == vs === Edge Cases
- [ ] Falsy Values: The Complete List
- [ ] Array.isArray() vs typeof for Arrays
- [ ] NaN Comparisons and Number.isNaN()

## Browser & Runtime APIs

- [ ] Web Workers
- [ ] Worker Threads in Node.js
- [ ] Service Workers
- [ ] Streams API (ReadableStream/WritableStream)
- [ ] AbortController and AbortSignal
- [ ] Fetch API vs XMLHttpRequest
- [ ] requestIdleCallback

## Polyfills

- [ ] Writing Polyfills: General Approach
- [ ] Array.prototype.map Polyfill Walkthrough
- [ ] Polyfill vs Transpile: What's the Difference

## Error Handling

- [ ] Custom Error Classes
- [ ] try/catch/finally Nuances
- [ ] Optional Catch Binding

## Modern Syntax

- [ ] Nullish Coalescing Operator (??)
- [ ] Logical Assignment Operators (&&=, ||=, ??=)
- [ ] Tagged Template Literals
- [ ] BigInt
- [ ] Array.prototype.flat and flatMap
- [ ] Array Destructuring Advanced Patterns
- [ ] Object Destructuring with Renaming and Defaults
- [ ] globalThis
- [ ] Array Holes and Sparse Arrays

## Node.js Event Loop

- [ ] process.nextTick vs Promise Microtasks (Node.js)
- [ ] Node.js Event Loop Phases
- [ ] setTimeout vs setImmediate (Node.js)

## Array Methods

- [ ] reduce() Advanced Use Cases
- [ ] map() vs forEach(): Performance & Semantics
- [ ] Array Sort Stability
- [ ] Array-like Objects vs True Arrays
- [ ] Converting Array-like Objects to Arrays

## String Handling

- [ ] String Immutability
- [ ] Template Literals vs String Concatenation
- [ ] String.raw

## Recursion & Algorithms

- [ ] Tail Call Optimization
- [ ] Recursion vs Iteration Trade-offs

## Concurrency Model

- [ ] Single-Threaded Nature of JavaScript
- [ ] Concurrency vs Parallelism in JavaScript

## Advanced OOP

- [ ] Simulating Abstract Classes in JavaScript
- [ ] Method Overriding in JavaScript Classes
- [ ] The super Keyword: Mechanics

## JSON

- [ ] JSON.stringify() Edge Cases
- [ ] JSON.parse() Reviver Function
- [ ] Handling Circular References in JSON

## Senior Differentiators

- [ ] Currying with Placeholder Arguments
- [ ] Function.length and Function.name
- [ ] arguments Object vs Rest Parameters
- [ ] Strict Mode ('use strict')
- [ ] Array Destructuring with Swapping Variables
- [ ] Symbol.asyncIterator
- [ ] Object Property Order Guarantees
- [ ] Structured Clone Algorithm vs JSON Deep Clone

## Coding Problems → belongs in [61-javascript-coding](61-javascript-coding)

**✅ 5 converted to full [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)
entries:** [Debounce Implementation](61-javascript-coding/debounce.md),
[Throttle Implementation](61-javascript-coding/throttle.md),
[Deep Clone Implementation](61-javascript-coding/deep-clone.md),
the `bind()` portion of call/apply/bind Polyfills →
[Function.prototype.bind Polyfill](61-javascript-coding/function-bind-polyfill.md),
and the `all` portion of Promise.all/race/any/allSettled Polyfills →
[Promise.all Polyfill](61-javascript-coding/promise-all-polyfill.md).
`call`/`apply` polyfills and `Promise.race`/`any`/`allSettled` polyfills
are still open (each is listed as a follow-up question on the converted
pages above).

Still unconverted: Reverse a String, Palindrome Check, Character Count,
Count Vowels, Remove Duplicates, Sum of Array, Find Maximum, Find
Minimum, Second Largest, Move Zeros, Missing Number, Odd Even Count,
Factorial, Fibonacci, Prime Number, Reverse Number, Object Keys, Object
Values, Merge Objects, Nested Property Access, Two Sum Problem, Three
Sum, Rotate Array, Product Except Self, Group Anagrams, Longest
Substring Without Repeating Characters, Valid Parentheses, String
Compression, Anagram Check, Deep Compare, Object Flattening, Curry
Function, Memoization, Compose Function, Pipe Function, Once Function,
Sequential API Calls, Parallel API Calls, Retry Failed API, `call`/
`apply` Polyfills, `Promise.race`/`any`/`allSettled` Polyfills,
EventEmitter Implementation, Pub/Sub System, Observer Pattern, Async
Queue, Concurrency Limiter, Retry Utility, Scheduler, State Machine —
each of these previously had full test cases and a working solution;
that data lives in the salvage copy referenced below and still needs
migrating into the coding-problem format used by
[61-javascript-coding](61-javascript-coding). (Note: Two Sum, Three Sum,
Product Except Self, Group Anagrams, and Longest Substring Without
Repeating Characters are already done, but live in
[65-dsa](65-dsa) instead, since they're DSA-pattern problems rather than
JS-language-utility problems — see [PROGRESS.md](PROGRESS.md).)
