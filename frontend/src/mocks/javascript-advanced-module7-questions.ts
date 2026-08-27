// Auto-generated from frontend/src/document/Part_4_Module_7_Prototypes_Master_Handbook.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions —
// regenerate with scripts kept alongside the handbook rather than hand-editing.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_ADVANCED_MODULE7_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "jsadv-m7-131",
      "questionNumber": "JSADV-M7-131",
      "title": "What Is a Prototype?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What Is a Prototype?"
    },
    "answer": {
      "expectedAnswer": "**What Is a Prototype?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is a Prototype?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is a Prototype?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-132",
      "questionNumber": "JSADV-M7-132",
      "title": "What Is the Prototype Chain?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What Is the Prototype Chain?"
    },
    "answer": {
      "expectedAnswer": "**What Is the Prototype Chain?** should explain prototype lookup as walking `[[Prototype]]` links until a property is found or `null` is reached.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is the Prototype Chain?** should explain prototype lookup as walking `[[Prototype]]` links until a property is found or `null` is reached.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is the Prototype Chain?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-133",
      "questionNumber": "JSADV-M7-133",
      "title": "What Is `__proto__`?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is `__proto__`?"
    },
    "answer": {
      "expectedAnswer": "**What Is `__proto__`?** should explain `__proto__` as a legacy accessor for an object's prototype and prefer `Object.getPrototypeOf()` / `Object.setPrototypeOf()` when explicit prototype operations are required.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is `__proto__`?** should explain `__proto__` as a legacy accessor for an object's prototype and prefer `Object.getPrototypeOf()` / `Object.setPrototypeOf()` when explicit prototype operations are required.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is `__proto__`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-134",
      "questionNumber": "JSADV-M7-134",
      "title": "What Is the `prototype` Property?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is the `prototype` Property?"
    },
    "answer": {
      "expectedAnswer": "**What Is the `prototype` Property?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is the `prototype` Property?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is the `prototype` Property?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-135",
      "questionNumber": "JSADV-M7-135",
      "title": "What Is the Constructor Property?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is the Constructor Property?"
    },
    "answer": {
      "expectedAnswer": "**What Is the Constructor Property?** should distinguish constructor functions, instance properties, prototype methods, and the behavior of `new`.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is the Constructor Property?** should distinguish constructor functions, instance properties, prototype methods, and the behavior of `new`.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is the Constructor Property?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-136",
      "questionNumber": "JSADV-M7-136",
      "title": "How Does `Object.create()` Work With Prototypes?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does `Object.create()` Work With Prototypes?"
    },
    "answer": {
      "expectedAnswer": "**How Does `Object.create()` Work With Prototypes?** should explain `Object.create()` as direct prototype selection and when a null-prototype dictionary is useful.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `Object.create()` Work With Prototypes?** should explain `Object.create()` as direct prototype selection and when a null-prototype dictionary is useful.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `Object.create()` Work With Prototypes?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-137",
      "questionNumber": "JSADV-M7-137",
      "title": "How Does Prototype Inheritance Work?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does Prototype Inheritance Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does Prototype Inheritance Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does Prototype Inheritance Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does Prototype Inheritance Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-138",
      "questionNumber": "JSADV-M7-138",
      "title": "What Is Property Shadowing?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is Property Shadowing?"
    },
    "answer": {
      "expectedAnswer": "**What Is Property Shadowing?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is Property Shadowing?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is Property Shadowing?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-139",
      "questionNumber": "JSADV-M7-139",
      "title": "How Does Property Lookup Work?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Does Property Lookup Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does Property Lookup Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does Property Lookup Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does Property Lookup Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-140",
      "questionNumber": "JSADV-M7-140",
      "title": "What Are Built-in Prototypes?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What Are Built-in Prototypes?"
    },
    "answer": {
      "expectedAnswer": "**What Are Built-in Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Are Built-in Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Are Built-in Prototypes?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-141",
      "questionNumber": "JSADV-M7-141",
      "title": "What Is `Array.prototype`?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is `Array.prototype`?"
    },
    "answer": {
      "expectedAnswer": "**What Is `Array.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is `Array.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is `Array.prototype`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-142",
      "questionNumber": "JSADV-M7-142",
      "title": "What Is `Function.prototype`?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Is `Function.prototype`?"
    },
    "answer": {
      "expectedAnswer": "**What Is `Function.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is `Function.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is `Function.prototype`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-143",
      "questionNumber": "JSADV-M7-143",
      "title": "What Is `Object.prototype`?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What Is `Object.prototype`?"
    },
    "answer": {
      "expectedAnswer": "**What Is `Object.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is `Object.prototype`?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is `Object.prototype`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-144",
      "questionNumber": "JSADV-M7-144",
      "title": "How Do You Create a Custom Prototype?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Do You Create a Custom Prototype?"
    },
    "answer": {
      "expectedAnswer": "**How Do You Create a Custom Prototype?** should explain `Object.create()` as direct prototype selection and when a null-prototype dictionary is useful.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Do You Create a Custom Prototype?** should explain `Object.create()` as direct prototype selection and when a null-prototype dictionary is useful.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Do You Create a Custom Prototype?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-145",
      "questionNumber": "JSADV-M7-145",
      "title": "What Is Prototype Pollution?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years+",
      "question": "What Is Prototype Pollution?"
    },
    "answer": {
      "expectedAnswer": "**What Is Prototype Pollution?** should explain how unsafe dynamic keys can alter inherited object behavior and how to use allow-lists, null-prototype objects, or `Map` safely.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is Prototype Pollution?** should explain how unsafe dynamic keys can alter inherited object behavior and how to use allow-lists, null-prototype objects, or `Map` safely.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is Prototype Pollution?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-146",
      "questionNumber": "JSADV-M7-146",
      "title": "Does Modifying a Prototype Affect Existing Objects?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Does Modifying a Prototype Affect Existing Objects?"
    },
    "answer": {
      "expectedAnswer": "**Does Modifying a Prototype Affect Existing Objects?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Does Modifying a Prototype Affect Existing Objects?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Does Modifying a Prototype Affect Existing Objects?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-147",
      "questionNumber": "JSADV-M7-147",
      "title": "Why Is Modifying Built-in Prototypes Usually Discouraged?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Why Is Modifying Built-in Prototypes Usually Discouraged?"
    },
    "answer": {
      "expectedAnswer": "**Why Is Modifying Built-in Prototypes Usually Discouraged?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**Why Is Modifying Built-in Prototypes Usually Discouraged?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **Why Is Modifying Built-in Prototypes Usually Discouraged?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-148",
      "questionNumber": "JSADV-M7-148",
      "title": "ES5 Prototype Inheritance vs ES6 Classes",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "ES5 Prototype Inheritance vs ES6 Classes"
    },
    "answer": {
      "expectedAnswer": "**ES5 Prototype Inheritance vs ES6 Classes** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**ES5 Prototype Inheritance vs ES6 Classes** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **ES5 Prototype Inheritance vs ES6 Classes** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-149",
      "questionNumber": "JSADV-M7-149",
      "title": "What Are the Performance Considerations of Prototypes?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "What Are the Performance Considerations of Prototypes?"
    },
    "answer": {
      "expectedAnswer": "**What Are the Performance Considerations of Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Are the Performance Considerations of Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Are the Performance Considerations of Prototypes?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-150",
      "questionNumber": "JSADV-M7-150",
      "title": "How Do You Debug the Prototype Chain?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Do You Debug the Prototype Chain?"
    },
    "answer": {
      "expectedAnswer": "**How Do You Debug the Prototype Chain?** should explain prototype lookup as walking `[[Prototype]]` links until a property is found or `null` is reached.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Do You Debug the Prototype Chain?** should explain prototype lookup as walking `[[Prototype]]` links until a property is found or `null` is reached.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Do You Debug the Prototype Chain?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-151",
      "questionNumber": "JSADV-M7-151",
      "title": "What Is the Difference Between `prototype` and `__proto__`?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "What Is the Difference Between `prototype` and `__proto__`?"
    },
    "answer": {
      "expectedAnswer": "**What Is the Difference Between `prototype` and `__proto__`?** should explain `__proto__` as a legacy accessor for an object's prototype and prefer `Object.getPrototypeOf()` / `Object.setPrototypeOf()` when explicit prototype operations are required.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Is the Difference Between `prototype` and `__proto__`?** should explain `__proto__` as a legacy accessor for an object's prototype and prefer `Object.getPrototypeOf()` / `Object.setPrototypeOf()` when explicit prototype operations are required.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Is the Difference Between `prototype` and `__proto__`?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-152",
      "questionNumber": "JSADV-M7-152",
      "title": "How Does `instanceof` Use Prototypes?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Does `instanceof` Use Prototypes?"
    },
    "answer": {
      "expectedAnswer": "**How Does `instanceof` Use Prototypes?** should explain that `instanceof` checks prototype-chain relationships and can be surprising across different realms.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `instanceof` Use Prototypes?** should explain that `instanceof` checks prototype-chain relationships and can be surprising across different realms.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `instanceof` Use Prototypes?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-153",
      "questionNumber": "JSADV-M7-153",
      "title": "How Does `Object.isPrototypeOf()` Work?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How Does `Object.isPrototypeOf()` Work?"
    },
    "answer": {
      "expectedAnswer": "**How Does `Object.isPrototypeOf()` Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Does `Object.isPrototypeOf()` Work?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Does `Object.isPrototypeOf()` Work?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-154",
      "questionNumber": "JSADV-M7-154",
      "title": "How Do You Implement a Simple `instanceof`-like Function?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "How Do You Implement a Simple `instanceof`-like Function?"
    },
    "answer": {
      "expectedAnswer": "**How Do You Implement a Simple `instanceof`-like Function?** should explain that `instanceof` checks prototype-chain relationships and can be surprising across different realms.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**How Do You Implement a Simple `instanceof`-like Function?** should explain that `instanceof` checks prototype-chain relationships and can be surprising across different realms.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **How Do You Implement a Simple `instanceof`-like Function?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  },
  {
    "detail": {
      "id": "jsadv-m7-155",
      "questionNumber": "JSADV-M7-155",
      "title": "What Are the Best Practices for Prototypes?",
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
      "category": "Prototypes",
      "part": "Advanced JS",
      "concepts": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What Are the Best Practices for Prototypes?"
    },
    "answer": {
      "expectedAnswer": "**What Are the Best Practices for Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.",
      "deepExplanation": "Step 1 — Understand the mechanism.\n\n**What Are the Best Practices for Prototypes?** should explain prototypes as objects used for inherited property/method lookup and distinguish an object's `[[Prototype]]` from a constructor's `.prototype` property.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction hasInPrototype(\n  value: object,\n  name: string,\n): boolean {\n  let current: object | null = value;\n\n  while (current !== null) {\n    if (Object.prototype.hasOwnProperty.call(current, name)) {\n      return true;\n    }\n\n    current = Object.getPrototypeOf(current);\n  }\n\n  return false;\n}\n\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = hasInPrototype(user, \"role\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { role: \"admin\" };\nconst user = Object.create(base);\n\nconst found = \"role\" in user;\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.",
      "productionExample": "Use the runtime rule from **What Are the Best Practices for Prototypes?** in production only when it makes the behavior more predictable and testable.",
      "bestPractices": [
        "Understand the prototype chain",
        "Prefer classes or object composition when they improve readability",
        "Use `Object.getPrototypeOf()` instead of `__proto__`",
        "Avoid unnecessary `Object.setPrototypeOf()` in hot paths",
        "Avoid modifying built-in prototypes",
        "Keep shared methods on prototypes when appropriate",
        "Use `Object.hasOwn()` for own-property checks",
        "Treat `instanceof` carefully across realms",
        "Protect dynamic object merging from prototype pollution",
        "Profile before making performance claims",
        "Prefer composition when inheritance becomes deep or rigid",
        "Document unusual prototype manipulation"
      ],
      "tradeOffs": "Advantages: prototype-based shared methods avoid duplicating behavior per instance, and `Object.create()`/classes give predictable inheritance chains ending in `null`. Disadvantages: mutating `__proto__` or built-in prototypes at runtime is slow and fragile, `instanceof` can be unreliable across realms, and merging untrusted keys into an object can pollute `Object.prototype` for the entire application.",
      "commonMistakes": [
        "Interview trap: Using `__proto__`",
        "Interview trap: Modifying Native Prototypes"
      ],
      "followUpQuestions": [
        "Explain `prototype` vs `[[Prototype]]`",
        "Why is `__proto__` discouraged?",
        "How does `new` establish the prototype relationship?",
        "How does property lookup traverse prototypes?",
        "What is shadowing?",
        "How does `instanceof` work?",
        "What happens when a prototype is changed?",
        "Why can prototype mutation affect performance?",
        "Why are class methods shared?",
        "What is prototype pollution?",
        "How do you defend against prototype pollution?",
        "What happens across different browser realms?",
        "Why can `instanceof` fail across realms?",
        "When would `Object.create(null)` be useful?",
        "When would composition be preferable to inheritance?"
      ],
      "relatedTopics": [
        "Prototype chain",
        "[[Prototype]]",
        "__proto__",
        "Object.create()",
        "Object.getPrototypeOf()",
        "instanceof",
        "Classes",
        "Inheritance",
        "Prototype pollution",
        "Object.hasOwn()"
      ]
    }
  }
];