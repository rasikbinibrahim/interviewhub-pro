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
      "expectedAnswer": "A prototype is an object that another object can use for inherited property and method lookup.",
      "deepExplanation": "Example: Typical output: Conceptually: The prototype is not the same thing as the object's own properties.",
      "productionExample": "Work through the accompanying code example for \"What Is a Prototype?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "The prototype chain is the sequence of objects JavaScript searches when a property is not found directly on an object.",
      "deepExplanation": "Example: Output: Lookup: If the property is not found, lookup continues until the chain reaches `null`.",
      "productionExample": "Work through the accompanying code example for \"What Is the Prototype Chain?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`__proto__` is a legacy accessor for an object's internal `[[Prototype]]`.",
      "deepExplanation": "Example: Output: Prefer the standardized APIs: rather than relying on `__proto__`.",
      "productionExample": "Work through the accompanying code example for \"What Is `__proto__`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Functions used as constructors commonly have a `prototype` property.",
      "deepExplanation": "Output: Methods can be placed on the constructor's prototype: Output: Diagram:",
      "productionExample": "Work through the accompanying code example for \"What Is the `prototype` Property?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Constructor functions normally have a `prototype` object whose `constructor` property points back to the function.",
      "deepExplanation": "Output: Example: Output: `constructor` is inherited and can be shadowed. Do not use `obj.constructor` as an unquestionable security or type-validation mechanism.",
      "productionExample": "Work through the accompanying code example for \"What Is the Constructor Property?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`Object.create(proto)` creates an object whose internal prototype is `proto`.",
      "deepExplanation": "Output: Prototype check: Output:",
      "productionExample": "Work through the accompanying code example for \"How Does `Object.create()` Work With Prototypes?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "A child object can inherit methods from a prototype object.",
      "deepExplanation": "Output: Diagram:",
      "productionExample": "Work through the accompanying code example for \"How Does Prototype Inheritance Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Shadowing happens when an object has its own property with the same name as an inherited property.",
      "deepExplanation": "Output: Before assignment: After assignment:",
      "productionExample": "Work through the accompanying code example for \"What Is Property Shadowing?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "For a normal property read: the engine conceptually searches:",
      "deepExplanation": "Example: Output:",
      "productionExample": "Work through the accompanying code example for \"How Does Property Lookup Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "JavaScript built-in objects have prototype objects containing commonly shared methods.",
      "deepExplanation": "Examples: Example: Output:",
      "productionExample": "Work through the accompanying code example for \"What Are Built-in Prototypes?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`Array.prototype` contains methods shared by array instances.",
      "deepExplanation": "Examples: These methods are generally not copied into every array as independent function values. Conceptually: This shared-method design reduces duplication.",
      "productionExample": "Work through the accompanying code example for \"What Is `Array.prototype`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Functions are objects, and function objects inherit from `Function.prototype`.",
      "deepExplanation": "Output: Methods such as: are associated with function behavior through `Function.prototype`.",
      "productionExample": "Work through the accompanying code example for \"What Is `Function.prototype`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`Object.prototype` is near the top of the ordinary object prototype chain.",
      "deepExplanation": "Common inherited methods include: Example: Output is a string representation such as: The exact behavior depends on whether the object overrides `toString()`.",
      "productionExample": "Work through the accompanying code example for \"What Is `Object.prototype`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Use an object as a shared prototype.",
      "deepExplanation": "Output: This is useful when several objects share behavior without duplicating methods.",
      "productionExample": "Work through the accompanying code example for \"How Do You Create a Custom Prototype?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Prototype pollution is a security vulnerability where attacker-controlled input causes unexpected modifications to an object's prototype or inherited properties.",
      "deepExplanation": "Conceptually: Risky application code often involves unsafe recursive merging of untrusted keys. validate untrusted keys avoid unsafe deep merge implementations keep dependencies updated understand `__proto__`, `constructor`, and `prototype` use `Object.create(null)` for appropriate dictionary use cases do not rely on inherited properties for authorization use `Object.hasOwn()` for own-property checks when appropriate Example: Output:",
      "productionExample": "Work through the accompanying code example for \"What Is Prototype Pollution?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Yes, objects that inherit from that prototype can observe the change.",
      "deepExplanation": "Output: However, modifying built-in prototypes globally is generally discouraged.",
      "productionExample": "Work through the accompanying code example for \"Does Modifying a Prototype Affect Existing Objects?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Avoid patterns such as: Problems include: namespace collisions unexpected behavior compatibility issues library conflicts debugging complexity surprising behavior across the application",
      "deepExplanation": "Modern applications should generally prefer standalone utilities, modules, or explicit abstractions. Polyfill questions may intentionally ask you to modify a prototype to demonstrate how a feature could be implemented.",
      "productionExample": "Work through the accompanying code example for \"Why Is Modifying Built-in Prototypes Usually Discouraged?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Classes provide cleaner syntax, but JavaScript class inheritance is still based on prototypes.",
      "deepExplanation": "Classes provide cleaner syntax, but JavaScript class inheritance is still based on prototypes.",
      "productionExample": "Work through the accompanying code example for \"ES5 Prototype Inheritance vs ES6 Classes\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "JavaScript engines optimize property access aggressively.",
      "deepExplanation": "Consistent object structures can help engines optimize access. Avoid unnecessary runtime prototype mutation: in hot paths. Why? Changing prototype relationships can invalidate assumptions made by the engine and can reduce optimization opportunities. Do not claim that every prototype operation is slow. Measure with profiling. Useful tools include: Chrome DevTools Performance Chrome DevTools Memory Node.js profiling production telemetry",
      "productionExample": "Work through the accompanying code example for \"What Are the Performance Considerations of Prototypes?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Use: Example: You can also use browser developer tools to inspect an object's prototype.",
      "deepExplanation": "Useful checks: Difference:",
      "productionExample": "Work through the accompanying code example for \"How Do You Debug the Prototype Chain?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "This is one of the most common interview questions.",
      "deepExplanation": "Concept – Meaning `obj.[[Prototype]]` – Internal prototype relationship `Object.getPrototypeOf(obj)` – Standard way to read it `Object.setPrototypeOf(obj, proto)` – Standard way to change it `obj.__proto__` – Legacy accessor for prototype `Constructor.prototype` – Object used as prototype for instances created with `new Constructor()` Example: Output: But: is different from: because `User` itself is a function object.",
      "productionExample": "Work through the accompanying code example for \"What Is the Difference Between `prototype` and `__proto__`?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "`instanceof` checks whether a constructor's `prototype` occurs in the object's prototype chain.",
      "deepExplanation": "Output: Conceptually: The operation checks whether `User.prototype` is reachable through the object's prototype chain. `instanceof` is not a universal way to validate arbitrary data received from APIs. For untrusted external data, validate structure and values explicitly.",
      "productionExample": "Work through the accompanying code example for \"How Does `instanceof` Use Prototypes?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "It checks whether an object exists in another object's prototype chain.",
      "deepExplanation": "Output: This can be useful when explicitly working with prototype relationships.",
      "productionExample": "Work through the accompanying code example for \"How Does `Object.isPrototypeOf()` Work?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Educational implementation: Output: If the prototype chain has height `h`:",
      "deepExplanation": "This is an educational approximation and does not reproduce every ECMAScript edge case.",
      "productionExample": "Work through the accompanying code example for \"How Do You Implement a Simple `instanceof`-like Function?\" and verify the documented output before generalizing the behavior to production code.",
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
      "expectedAnswer": "Understand the prototype chain. Prefer classes or object composition when they improve readability. Use `Object.getPrototypeOf()` instead of `__proto__`. Avoid unnecessary `Object.setPrototypeOf()` in hot paths. Avoid modifying built-in prototypes. Keep shared methods on prototypes when appropriate. Use `Object.hasOwn()` for own-property checks. Treat `instanceof` carefully across realms. Protect dynamic object merging from prototype pollution. Profile before making performance claims. Prefer composition when inheritance becomes deep or rigid. Document unusual prototype manipulation.",
      "deepExplanation": "Understand the prototype chain. Prefer classes or object composition when they improve readability. Use `Object.getPrototypeOf()` instead of `__proto__`. Avoid unnecessary `Object.setPrototypeOf()` in hot paths. Avoid modifying built-in prototypes. Keep shared methods on prototypes when appropriate. Use `Object.hasOwn()` for own-property checks. Treat `instanceof` carefully across realms. Protect dynamic object merging from prototype pollution. Profile before making performance claims. Prefer composition when inheritance becomes deep or rigid. Document unusual prototype manipulation.",
      "productionExample": "Work through the accompanying code example for \"What Are the Best Practices for Prototypes?\" and verify the documented output before generalizing the behavior to production code.",
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
