// Auto-generated from frontend/src/document/Part_4_Module_5_this_Keyword_Master_Handbook.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions —
// regenerate with scripts kept alongside the handbook rather than hand-editing.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_ADVANCED_MODULE5_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "jsadv-m5-86",
      "questionNumber": "JSADV-M5-086",
      "title": "What is `this`?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is `this`?"
    },
    "answer": {
      "expectedAnswer": "**What is `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is `this`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-87",
      "questionNumber": "JSADV-M5-087",
      "title": "What is Global `this`?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is Global `this`?"
    },
    "answer": {
      "expectedAnswer": "**What is Global `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is Global `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is Global `this`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-88",
      "questionNumber": "JSADV-M5-088",
      "title": "What is `this` in a Normal Function?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is `this` in a Normal Function?"
    },
    "answer": {
      "expectedAnswer": "**What is `this` in a Normal Function?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is `this` in a Normal Function?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is `this` in a Normal Function?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-89",
      "questionNumber": "JSADV-M5-089",
      "title": "What is `this` in an Object Method?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is `this` in an Object Method?"
    },
    "answer": {
      "expectedAnswer": "**What is `this` in an Object Method?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is `this` in an Object Method?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is `this` in an Object Method?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-90",
      "questionNumber": "JSADV-M5-090",
      "title": "What Happens When a Method Is Detached?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Happens When a Method Is Detached?"
    },
    "answer": {
      "expectedAnswer": "**What Happens When a Method Is Detached?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Happens When a Method Is Detached?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Happens When a Method Is Detached?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-91",
      "questionNumber": "JSADV-M5-091",
      "title": "What is Implicit Binding?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is Implicit Binding?"
    },
    "answer": {
      "expectedAnswer": "**What is Implicit Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is Implicit Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is Implicit Binding?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-92",
      "questionNumber": "JSADV-M5-092",
      "title": "What is Default Binding?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is Default Binding?"
    },
    "answer": {
      "expectedAnswer": "**What is Default Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is Default Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is Default Binding?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-93",
      "questionNumber": "JSADV-M5-093",
      "title": "What is Explicit Binding?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is Explicit Binding?"
    },
    "answer": {
      "expectedAnswer": "**What is Explicit Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is Explicit Binding?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is Explicit Binding?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-94",
      "questionNumber": "JSADV-M5-094",
      "title": "How Does `call()` Work?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does `call()` Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does `call()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `call()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `call()` Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-95",
      "questionNumber": "JSADV-M5-095",
      "title": "How Does `apply()` Work?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does `apply()` Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does `apply()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `apply()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `apply()` Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-96",
      "questionNumber": "JSADV-M5-096",
      "title": "How Does `bind()` Work?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does `bind()` Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does `bind()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `bind()` Work?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `bind()` Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-97",
      "questionNumber": "JSADV-M5-097",
      "title": "`call()` vs `apply()` vs `bind()`",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "`call()` vs `apply()` vs `bind()`"
    },
    "answer": {
      "expectedAnswer": "**`call()` vs `apply()` vs `bind()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**`call()` vs `apply()` vs `bind()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **`call()` vs `apply()` vs `bind()`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-98",
      "questionNumber": "JSADV-M5-098",
      "title": "What is Arrow Function `this`?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is Arrow Function `this`?"
    },
    "answer": {
      "expectedAnswer": "**What is Arrow Function `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What is Arrow Function `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What is Arrow Function `this`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-99",
      "questionNumber": "JSADV-M5-099",
      "title": "Why Doesn't `call()` Change Arrow `this`?",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Why Doesn't `call()` Change Arrow `this`?"
    },
    "answer": {
      "expectedAnswer": "**Why Doesn't `call()` Change Arrow `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Why Doesn't `call()` Change Arrow `this`?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Why Doesn't `call()` Change Arrow `this`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-100",
      "questionNumber": "JSADV-M5-100",
      "title": "Constructor `this`",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Constructor `this`"
    },
    "answer": {
      "expectedAnswer": "**Constructor `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Constructor `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Constructor `this`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-101",
      "questionNumber": "JSADV-M5-101",
      "title": "`this` in Classes",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "`this` in Classes"
    },
    "answer": {
      "expectedAnswer": "**`this` in Classes** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**`this` in Classes** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **`this` in Classes** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-102",
      "questionNumber": "JSADV-M5-102",
      "title": "Private Class Fields and `this`",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Private Class Fields and `this`"
    },
    "answer": {
      "expectedAnswer": "**Private Class Fields and `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Private Class Fields and `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Private Class Fields and `this`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-103",
      "questionNumber": "JSADV-M5-103",
      "title": "DOM Event `this`",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "DOM Event `this`"
    },
    "answer": {
      "expectedAnswer": "**DOM Event `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**DOM Event `this`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **DOM Event `this`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-104",
      "questionNumber": "JSADV-M5-104",
      "title": "`this` in React Event Handlers",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "`this` in React Event Handlers"
    },
    "answer": {
      "expectedAnswer": "**`this` in React Event Handlers** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**`this` in React Event Handlers** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **`this` in React Event Handlers** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-105",
      "questionNumber": "JSADV-M5-105",
      "title": "Why Is `this` Lost in Callbacks?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Why Is `this` Lost in Callbacks?"
    },
    "answer": {
      "expectedAnswer": "**Why Is `this` Lost in Callbacks?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Why Is `this` Lost in Callbacks?** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Why Is `this` Lost in Callbacks?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-106",
      "questionNumber": "JSADV-M5-106",
      "title": "Fix Lost `this` with `bind()`",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Fix Lost `this` with `bind()`"
    },
    "answer": {
      "expectedAnswer": "**Fix Lost `this` with `bind()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Fix Lost `this` with `bind()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Fix Lost `this` with `bind()`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-107",
      "questionNumber": "JSADV-M5-107",
      "title": "Hard Binding",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Hard Binding"
    },
    "answer": {
      "expectedAnswer": "**Hard Binding** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Hard Binding** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Hard Binding** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-108",
      "questionNumber": "JSADV-M5-108",
      "title": "Implement `bind()` Without the Built-in",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Implement `bind()` Without the Built-in"
    },
    "answer": {
      "expectedAnswer": "**Implement `bind()` Without the Built-in** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Implement `bind()` Without the Built-in** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction bindLike<T, A extends unknown[], R>(\n  fn: (this: T, ...args: A) => R,\n  receiver: T,\n  ...bound: A,\n) {\n  return (...rest: A) =>\n    fn.apply(receiver, [...bound, ...rest] as A);\n}\n\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst bound = bindLike(greet, { name: \"Rasik\" }, \"!\");\nconst value = bound();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst greet = function (\n  this: { name: string },\n  suffix: string,\n): string {\n  return this.name + suffix;\n};\n\nconst value = greet.call(\n  { name: \"Rasik\" },\n  \"!\",\n);\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Implement `bind()` Without the Built-in** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-109",
      "questionNumber": "JSADV-M5-109",
      "title": "Implement `call()` Without Built-in `call()`",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Implement `call()` Without Built-in `call()`"
    },
    "answer": {
      "expectedAnswer": "**Implement `call()` Without Built-in `call()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Implement `call()` Without Built-in `call()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Implement `call()` Without Built-in `call()`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m5-110",
      "questionNumber": "JSADV-M5-110",
      "title": "Implement `apply()` Without Built-in `apply()`",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "`this` Keyword",
      "part": "Advanced JS",
      "concepts": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Implement `apply()` Without Built-in `apply()`"
    },
    "answer": {
      "expectedAnswer": "**Implement `apply()` Without Built-in `apply()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Implement `apply()` Without Built-in `apply()`** should explain that `this` is determined by call-site/receiver rules for normal functions, while arrow functions capture lexical `this`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n  greet(this: User): string;\n}\n\nconst user: User = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet() {\n    return this.name;\n  },\n};\n\nconst value = user.greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Implement `apply()` Without Built-in `apply()`** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Determine `this` from the call site, not from where the function is defined.",
        "Prefer arrow functions for callbacks that should retain the enclosing lexical `this`.",
        "Use `bind()` (or an arrow class field) when passing a method as a detached callback or event handler.",
        "Avoid arrow functions as object methods when the method needs a dynamic receiver.",
        "Use `call()`/`apply()` deliberately when a function must run with an explicit receiver.",
        "Understand default binding: an unbound `this` is `undefined` in strict mode, not the global object.",
        "Be explicit about `this` in constructors and class methods rather than relying on implicit binding.",
        "Test event handlers and React handlers for correct `this`/closure behavior, not just output.",
        "Avoid re-binding an already-bound or arrow function — it has no effect on arrow functions.",
        "Document any intentional dynamic-`this` design (e.g. prototype methods) so it isn't 'fixed' into an arrow function later."
      ],
      "tradeOffs": "Advantages: `this` lets the same method run with a different receiver depending on how it's called, and `call`/`apply`/`bind` give explicit control when that's required. Arrow functions remove `this` confusion for callbacks by capturing it lexically. Disadvantages: implicit binding is easy to lose when a method is detached (passed as a callback, destructured, or reassigned), and arrow functions used as object methods or class prototype methods silently break dynamic-receiver expectations.",
      "commonMistakes": [
        "Interview trap: Detached Method",
        "Interview trap: Arrow Function as Object Method When Dynamic Receiver Is Needed",
        "Interview trap: Rebinding an Arrow Function"
      ],
      "followUpQuestions": [
        "Why is `this` dynamic for normal functions?",
        "Why is arrow `this` lexical?",
        "What is the difference between lexical scope and `this`?",
        "Why does method extraction lose `this`?",
        "Why does `bind()` create a new function?",
        "What happens when a bound function is called with `call()`?",
        "What happens when a bound function is called with `new`?",
        "How does `this` work in class methods?",
        "How does DOM event listener `this` differ from arrow callbacks?",
        "How does React change the relevance of `this`?",
        "How would you implement `bind()`?",
        "How would you test a `bind()` polyfill?",
        "What are the performance implications of repeated binding?",
        "How would you debug a lost-`this` production bug?"
      ],
      "relatedTopics": [
        "this",
        "call()",
        "apply()",
        "bind()",
        "Implicit binding",
        "Explicit binding",
        "Default binding",
        "Constructor binding",
        "Arrow functions",
        "Lexical this"
      ]
    }
  }
];