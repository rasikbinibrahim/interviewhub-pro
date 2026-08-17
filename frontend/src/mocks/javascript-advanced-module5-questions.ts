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
      "expectedAnswer": "`this` is a special value available during function execution that usually refers to the receiver or execution context determined by the call site.",
      "deepExplanation": "Example: Output: Here: `this` is a runtime value whose meaning depends primarily on how a function is invoked. For normal functions it can be determined by the call site, while arrow functions inherit `this` lexically from their surrounding scope.",
      "productionExample": "Work through the accompanying code example for \"What is `this`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Global `this` differs between environments.",
      "deepExplanation": "In a browser script: Typically: In an ES module: Top-level `this` is: In Node.js, top-level behavior differs between CommonJS and ES modules. Do not say: `this` always means window. That is incorrect.",
      "productionExample": "Work through the accompanying code example for \"What is Global `this`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "In strict mode: Output: Without strict mode, browser behavior can provide the global object for a simple function call.",
      "deepExplanation": "In strict mode: Output: Without strict mode, browser behavior can provide the global object for a simple function call.",
      "productionExample": "Work through the accompanying code example for \"What is `this` in a Normal Function?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Output: The call expression: provides the receiver `user`.",
      "deepExplanation": "Therefore:",
      "productionExample": "Work through the accompanying code example for \"What is `this` in an Object Method?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "The method has been extracted from the object.",
      "deepExplanation": "The receiver information from: is lost. With strict mode, `this` becomes `undefined`. Output:",
      "productionExample": "Work through the accompanying code example for \"What Happens When a Method Is Detached?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Implicit binding occurs when a function is called as a property of an object.",
      "deepExplanation": "Conceptually: The object before the dot is normally the receiver for that call.",
      "productionExample": "Work through the accompanying code example for \"What is Implicit Binding?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "For a normal function called without a receiver: Strict mode:",
      "deepExplanation": "Output: Non-strict behavior may resolve `this` to the global object.",
      "productionExample": "Work through the accompanying code example for \"What is Default Binding?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "JavaScript provides: `call` `apply` `bind`",
      "deepExplanation": "Example: Output: The receiver is explicitly supplied.",
      "productionExample": "Work through the accompanying code example for \"What is Explicit Binding?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "How Does `call()` Work — see the accompanying code example in this `this` Keyword module for a concrete demonstration and its expected output.",
      "deepExplanation": "Output: Syntax:",
      "productionExample": "Work through the accompanying code example for \"How Does `call()` Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`apply()` is similar to `call()`, but arguments are supplied as an array-like value.",
      "deepExplanation": "Output: Method – Arguments `call()` – Individual arguments `apply()` – Array-like argument collection `bind()` – Returns a new bound function",
      "productionExample": "Work through the accompanying code example for \"How Does `apply()` Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`bind()` returns a new function whose `this` is fixed to the supplied value.",
      "deepExplanation": "Output: Important: does not execute the function immediately.",
      "productionExample": "Work through the accompanying code example for \"How Does `bind()` Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`call()` vs `apply()` vs `bind()` — see the accompanying code example in this `this` Keyword module for a concrete demonstration and its expected output.",
      "deepExplanation": "Feature – `call` – `apply` – `bind` Executes immediately – Yes – Yes – No Sets `this` – Yes – Yes – Yes Arguments – Separate – Array-like – Separate / partial Returns – Function result – Function result – New function Partial application – Possible – Possible – Common Example:",
      "productionExample": "Work through the accompanying code example for \"`call()` vs `apply()` vs `bind()`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Arrow functions do not have their own `this`.",
      "deepExplanation": "They capture `this` from the surrounding lexical scope. Output: The arrow function inherits the `this` of `greet()`.",
      "productionExample": "Work through the accompanying code example for \"What is Arrow Function `this`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`call()` cannot dynamically replace the lexical `this` of an arrow function.",
      "deepExplanation": "`call()` cannot dynamically replace the lexical `this` of an arrow function.",
      "productionExample": "Work through the accompanying code example for \"Why Doesn't `call()` Change Arrow `this`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "When a function is invoked with `new`, a new object is created and becomes the function's `this`.",
      "deepExplanation": "Output: Conceptually:",
      "productionExample": "Work through the accompanying code example for \"Constructor `this`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Output: Class methods are still normal functions with call-site-dependent `this`.",
      "deepExplanation": "Output: Class methods are still normal functions with call-site-dependent `this`.",
      "productionExample": "Work through the accompanying code example for \"`this` in Classes\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Output: `this` identifies the instance.",
      "deepExplanation": "The `#balance` field provides stronger language-level encapsulation than a conventional underscored property.",
      "productionExample": "Work through the accompanying code example for \"Private Class Fields and `this`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "With a traditional event listener function: Output: For a traditional DOM event listener, `this` is generally the element on which the listener is registered.",
      "deepExplanation": "The arrow does not receive its own DOM-event `this`.",
      "productionExample": "Work through the accompanying code example for \"DOM Event `this`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Modern React function components generally use lexical closures instead of class-based `this`.",
      "deepExplanation": "There is no need to write: in function components. Legacy class components often required:",
      "productionExample": "Work through the accompanying code example for \"`this` in React Event Handlers\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "The callback is a separate normal function call.",
      "deepExplanation": "The object receiver from: does not automatically transfer to the callback. The arrow inherits `this` from `greet()`.",
      "productionExample": "Work through the accompanying code example for \"Why Is `this` Lost in Callbacks?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`bind(this)` creates a function whose `this` is fixed to the current `greet()` receiver.",
      "deepExplanation": "`bind(this)` creates a function whose `this` is fixed to the current `greet()` receiver.",
      "productionExample": "Work through the accompanying code example for \"Fix Lost `this` with `bind()`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Hard binding means creating a permanently bound function.",
      "deepExplanation": "Attempts to change the receiver during normal invocation do not replace the bound `this`. Output:",
      "productionExample": "Work through the accompanying code example for \"Hard Binding\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "A simplified educational implementation: Output: This is an interview-oriented simplified polyfill.",
      "deepExplanation": "A full native-quality `bind()` implementation must also account for: constructor behavior prototype semantics function length function name callable/constructable distinctions edge cases involving `new`",
      "productionExample": "Work through the accompanying code example for \"Implement `bind()` Without the Built-in\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Educational implementation: Output: The implementation is useful for demonstrating the mechanism, but production code should use the native method rather than modifying `Function.prototype`.",
      "deepExplanation": "Educational implementation: Output: The implementation is useful for demonstrating the mechanism, but production code should use the native method rather than modifying `Function.prototype`.",
      "productionExample": "Work through the accompanying code example for \"Implement `call()` Without Built-in `call()`\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Implement `apply()` Without Built-in `apply()` — see the accompanying code example in this `this` Keyword module for a concrete demonstration and its expected output.",
      "deepExplanation": "Output:",
      "productionExample": "Work through the accompanying code example for \"Implement `apply()` Without Built-in `apply()`\" and verify the documented output before generalizing the behavior to production code.",
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
