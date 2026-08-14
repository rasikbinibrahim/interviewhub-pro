// Auto-generated from frontend/src/document/Part_4_Advanced_JavaScript_Master_Handbook_Module_1.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions —
// regenerate with scripts kept alongside the handbook rather than hand-editing.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_ADVANCED_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "jsadv1",
      "questionNumber": "JSADV-001",
      "title": "What is an Execution Context?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years → 8+ Years",
      "question": "What is an Execution Context?"
    },
    "answer": {
      "expectedAnswer": "An execution context is the ECMAScript specification-level state used while JavaScript code is evaluated.",
      "deepExplanation": "It provides the information needed for: evaluating code resolving identifiers accessing lexical environments handling `this` tracking execution state It is important not to equate an execution context directly with a physical stack frame. Engines are free to implement the specification using optimized internal structures. Top-level code begins evaluation. `name` is established as a binding. `greet` is available as a function binding. `greet(name)` is invoked. A function execution context becomes active. `user` receives `\"Rasik\"`. The return expression is evaluated. Control returns to the caller. ECMAScript specifies observable language behavior. V8, SpiderMonkey, and JavaScriptCore decide how to represent execution state internally. **Wrong:** “Every execution context is one stack frame.” **Better:** “An execution context is an ECMAScript abstraction. Engines commonly represent active execution with stack frames, but the concepts are not identical.” An execution context is the specification-level state in which JavaScript code executes. Function calls establish function execution contexts, which use lexical environments for identifier resolution. Engines commonly represent active execution with stack frames, but an execution context should not be treated as a literal physical stack frame. An execution context describes the state needed to evaluate JavaScript code. Top-level code executes in an appropriate global or module context, while function invocation establishes a function execution context. The context is associated with lexical environments and other execution state. This model explains scope, closures, `this`, and call-stack behavior. The most important senior-level distinction is between the ECMAScript abstract machine and the JavaScript engine. ECMAScript defines semantic concepts such as execution contexts and environment records. V8, SpiderMonkey, and JavaScriptCore implement those semantics using engine-specific data structures and optimizations. A closure may keep a lexical environment reachable after the original function has returned, while an active function call is commonly represented by an engine stack frame.",
      "productionExample": "Work through the accompanying code example for \"What is an Execution Context?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Every execution context is one stack frame.",
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv2",
      "questionNumber": "JSADV-002",
      "title": "What is the Global Execution Context?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the Global Execution Context?"
    },
    "answer": {
      "expectedAnswer": "The global execution context is associated with top-level script or module evaluation.",
      "deepExplanation": "Classic browser scripts and ES modules have important differences. Prefer modules: Avoid mutable global application state.",
      "productionExample": "Prefer modules: Avoid mutable global application state.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv3",
      "questionNumber": "JSADV-003",
      "title": "What is a Function Execution Context?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is a Function Execution Context?"
    },
    "answer": {
      "expectedAnswer": "A function execution context is established when a function begins execution.",
      "deepExplanation": "Conceptually:",
      "productionExample": "Work through the accompanying code example for \"What is a Function Execution Context?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv4",
      "questionNumber": "JSADV-004",
      "title": "What is the Creation Phase?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is the Creation Phase?"
    },
    "answer": {
      "expectedAnswer": "“Creation phase” is a useful teaching model. It should not be presented as a literal two-step engine algorithm mandated by ECMAScript.",
      "deepExplanation": "Conceptually, the runtime establishes the bindings and execution state required for evaluation. Conceptual model:",
      "productionExample": "Work through the accompanying code example for \"What is the Creation Phase?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv5",
      "questionNumber": "JSADV-005",
      "title": "What is the Execution Phase?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the Execution Phase?"
    },
    "answer": {
      "expectedAnswer": "The execution phase describes evaluation of executable statements and expressions.",
      "deepExplanation": "The execution phase describes evaluation of executable statements and expressions.",
      "productionExample": "Work through the accompanying code example for \"What is the Execution Phase?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv6",
      "questionNumber": "JSADV-006",
      "title": "What is a Lexical Environment?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "What is a Lexical Environment?"
    },
    "answer": {
      "expectedAnswer": "A lexical environment is an ECMAScript structure used to associate identifiers with bindings and maintain an outer-environment relationship.",
      "deepExplanation": "Lookup: Lexical environments are fundamental to: lexical scope closures shadowing module scope identifier resolution",
      "productionExample": "Work through the accompanying code example for \"What is a Lexical Environment?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv7",
      "questionNumber": "JSADV-007",
      "title": "What is the Variable Environment?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "What is the Variable Environment?"
    },
    "answer": {
      "expectedAnswer": "`VariableEnvironment` is an ECMAScript execution-context component and is useful when discussing declaration semantics historically and precisely.",
      "deepExplanation": "Modern JavaScript should not be reduced to the outdated statement that every variable is stored in one universal “variable object.” Interview answer: VariableEnvironment is part of the ECMAScript execution-context model used for variable bindings. Modern JavaScript has multiple environment records and declaration forms, so the simplified “variable object” model is incomplete.",
      "productionExample": "Work through the accompanying code example for \"What is the Variable Environment?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv8",
      "questionNumber": "JSADV-008",
      "title": "What is the Scope Chain?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is the Scope Chain?"
    },
    "answer": {
      "expectedAnswer": "The scope chain is the conceptual identifier lookup path through nested lexical environments.",
      "deepExplanation": "The scope chain is the conceptual identifier lookup path through nested lexical environments.",
      "productionExample": "Work through the accompanying code example for \"What is the Scope Chain?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv9",
      "questionNumber": "JSADV-009",
      "title": "How is Memory Allocated During Execution?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How is Memory Allocated During Execution?"
    },
    "answer": {
      "expectedAnswer": "JavaScript uses automatic memory management. Avoid the inaccurate rule:",
      "deepExplanation": "“Primitives are always on the stack and objects are always on the heap.” Actual engine implementations can use registers, stack slots, heap objects, tagged values, optimized representations, and other internal structures. Conceptual view:",
      "productionExample": "Work through the accompanying code example for \"How is Memory Allocated During Execution?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv10",
      "questionNumber": "JSADV-010",
      "title": "What is the Call Stack?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the Call Stack?"
    },
    "answer": {
      "expectedAnswer": "The call stack tracks active synchronous execution.",
      "deepExplanation": "At the deepest point: Recursive code can exhaust the call stack:",
      "productionExample": "Work through the accompanying code example for \"What is the Call Stack?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv11",
      "questionNumber": "JSADV-011",
      "title": "What is Context Switching?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is Context Switching?"
    },
    "answer": {
      "expectedAnswer": "When execution enters nested function calls, the active execution state changes.",
      "deepExplanation": "Engine implementation details vary, so interview answers should focus on observable semantics rather than claiming a specific CPU-level operation.",
      "productionExample": "Work through the accompanying code example for \"What is Context Switching?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv12",
      "questionNumber": "JSADV-012",
      "title": "How Does Strict Mode Affect Execution Context?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does Strict Mode Affect Execution Context?"
    },
    "answer": {
      "expectedAnswer": "Strict mode changes several JavaScript semantics.",
      "deepExplanation": "For a normal function call in strict mode, `this` is `undefined`. ES modules are implicitly strict. Strict mode also helps catch accidental assignments and disables certain legacy behaviors.",
      "productionExample": "Work through the accompanying code example for \"How Does Strict Mode Affect Execution Context?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv13",
      "questionNumber": "JSADV-013",
      "title": "What is the Global Object?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What is the Global Object?"
    },
    "answer": {
      "expectedAnswer": "The global object is provided by the host/runtime.",
      "deepExplanation": "Use `globalThis` for portable access: Browser environments commonly expose `window`; Node.js exposes Node-specific global facilities. `globalThis` provides a standardized cross-environment reference.",
      "productionExample": "Work through the accompanying code example for \"What is the Global Object?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv14",
      "questionNumber": "JSADV-014",
      "title": "How Does `this` Relate to Execution?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Does `this` Relate to Execution?"
    },
    "answer": {
      "expectedAnswer": "`this` depends on how a function is invoked.",
      "deepExplanation": "But: changes the invocation form. Arrow functions do not create their own `this`; they capture it lexically.",
      "productionExample": "Work through the accompanying code example for \"How Does `this` Relate to Execution?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv15",
      "questionNumber": "JSADV-015",
      "title": "How Does Memory Cleanup Work?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Does Memory Cleanup Work?"
    },
    "answer": {
      "expectedAnswer": "JavaScript uses automatic garbage collection.",
      "deepExplanation": "A closure does not automatically create a memory leak. `count` remains reachable through the returned function.",
      "productionExample": "Work through the accompanying code example for \"How Does Memory Cleanup Work?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv16",
      "questionNumber": "JSADV-016",
      "title": "Browser Runtime vs Node.js Runtime",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Browser Runtime vs Node.js Runtime"
    },
    "answer": {
      "expectedAnswer": "Key point: JavaScript is the language; the browser and Node.js are host/runtime environments.",
      "deepExplanation": "Area – Browser – Node.js Engine – V8 / SpiderMonkey / JavaScriptCore – V8 DOM – Yes – Not built in Rendering – Yes – No browser renderer `window` – Common browser global – No `globalThis` – Yes – Yes File system – Restricted Web APIs – Node APIs Event-driven APIs – Web APIs – Node APIs + libuv Fetch – Yes – Modern Node versions Workers – Web Workers – Worker Threads",
      "productionExample": "Work through the accompanying code example for \"Browser Runtime vs Node.js Runtime\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv17",
      "questionNumber": "JSADV-017",
      "title": "What Happens When JavaScript Runs?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "What Happens When JavaScript Runs?"
    },
    "answer": {
      "expectedAnswer": "A simplified engine pipeline: The exact pipeline differs across V8, SpiderMonkey, and JavaScriptCore.",
      "deepExplanation": "A simplified engine pipeline: The exact pipeline differs across V8, SpiderMonkey, and JavaScriptCore.",
      "productionExample": "Work through the accompanying code example for \"What Happens When JavaScript Runs?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv18",
      "questionNumber": "JSADV-018",
      "title": "How Do Execution Contexts Enable Closures?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Do Execution Contexts Enable Closures?"
    },
    "answer": {
      "expectedAnswer": "Conceptual model: The function retains access to the lexical environment required to resolve `secret`.",
      "deepExplanation": "Conceptual model: The function retains access to the lexical environment required to resolve `secret`.",
      "productionExample": "Work through the accompanying code example for \"How Do Execution Contexts Enable Closures?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv19",
      "questionNumber": "JSADV-019",
      "title": "Senior Scenario: Reading a Production Stack Trace",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Senior Scenario: Reading a Production Stack Trace"
    },
    "answer": {
      "expectedAnswer": "Example: A senior engineer should investigate: Where the invalid value originated. Whether the issue is deterministic. Whether async boundaries are involved. Whether source maps are correct. Whether telemetry includes useful context. Whether recovery is possible. Whether logging exposes sensitive information.",
      "deepExplanation": "A stack trace is evidence for reconstructing the execution path; it is not necessarily a complete description of all asynchronous work.",
      "productionExample": "Work through the accompanying code example for \"Senior Scenario: Reading a Production Stack Trace\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv20",
      "questionNumber": "JSADV-020",
      "title": "Staff/Principal: Is an Execution Context a Physical Object?",
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
      "category": "Execution Context",
      "concepts": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "8+ Years",
      "question": "Staff/Principal: Is an Execution Context a Physical Object?"
    },
    "answer": {
      "expectedAnswer": "**Answer:** No. Execution context is an ECMAScript abstraction. Engines can represent execution state using:",
      "deepExplanation": "registers stack slots heap objects optimized frames deoptimized frames engine-specific metadata Strong answer: I separate the ECMAScript abstract machine from engine implementation. Execution contexts and lexical environments describe language semantics, while V8, SpiderMonkey, and JavaScriptCore are free to optimize those concepts using implementation-specific structures.",
      "productionExample": "Work through the accompanying code example for \"Staff/Principal: Is an Execution Context a Physical Object?\" and verify the documented output before generalizing the behavior to other engines or hosts.",
      "bestPractices": [
        "Prefer ES modules over classic global scripts to avoid implicit global leakage.",
        "Use `globalThis` for portable cross-environment global access.",
        "Treat 'creation phase' and 'stack frame' as teaching models, not literal ECMAScript algorithms.",
        "Investigate closures for intentional state retention rather than assuming a memory leak.",
        "Separate ECMAScript language semantics from engine-specific implementation details when explaining behavior.",
        "Use strict mode / ES modules to avoid legacy `this` and global-object pitfalls."
      ],
      "tradeOffs": "Advantages: ECMAScript's execution-context and lexical-environment abstractions keep language behavior portable across engines, and they explain scoping, closures and `this` without engine internals. Disadvantages: over-literal mental models (execution context as a physical stack frame, primitives always on the stack, a single universal variable object) mislead debugging and interviews; concrete engine representations (V8, SpiderMonkey, JavaScriptCore) vary and should not be assumed.",
      "commonMistakes": [
        "Interview trap: Execution context equals stack frame.",
        "Interview trap: `let` and `const` are not hoisted.",
        "Interview trap: All objects are on the heap.",
        "Interview trap: Node.js is a JavaScript engine.",
        "Interview trap: Closures always cause memory leaks."
      ],
      "followUpQuestions": [
        "How does an engine optimize execution-context representation?",
        "How can closures retain memory after function return?",
        "How would you diagnose excessive call-stack depth?",
        "How does source-map quality affect production stack traces?",
        "What is the difference between language semantics and host behavior?",
        "How would you explain `this` without using the “owner object” model?",
        "How do modules change global scope behavior?",
        "How would you investigate a closure-related memory-retention issue?"
      ],
      "relatedTopics": [
        "Execution Context",
        "Global Context",
        "Function Context",
        "Lexical Environment",
        "Scope Chain",
        "Call Stack",
        "`this`",
        "Closure",
        "Browser",
        "Node.js",
        "Garbage Collection",
        "Engine Optimization"
      ]
    }
  }
];
