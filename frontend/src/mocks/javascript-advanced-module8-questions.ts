// Derived from frontend/src/document/Part_4_Module_8_Classes_and_OOP_Master_Handbook.md.
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

const CATEGORY = 'Classes & OOP';

const CONCEPTS = [
  'ES6 classes',
  'Constructors',
  'new',
  'super',
  'Inheritance',
  'Static members',
  'Private fields',
  'Getters/setters',
  'Encapsulation',
  'Abstraction',
  'Polymorphism',
  'Composition',
  'Mixins',
];

const BEST_PRACTICES = [
  'Prefer composition when inheritance is not necessary',
  'Keep classes small and focused',
  'Follow single-responsibility principles',
  'Keep public APIs minimal',
  'Use private fields for genuinely private state',
  'Validate constructor inputs',
  'Avoid mutable global state',
  'Avoid unnecessary prototype mutation',
  'Prefer dependency injection for external services',
  'Keep domain logic testable',
  'Use clear naming',
  'Document non-obvious invariants',
  'Avoid deep inheritance trees',
  'Profile before optimizing object creation',
  'Treat class syntax as a tool, not a requirement',
];

const COMMON_MISTAKES = [
  'Interview trap: Creating unnecessary deep inheritance',
  'Interview trap: Using classes when a plain object is enough',
  'Interview trap: Mutating shared prototype state unexpectedly',
  'Interview trap: Exposing internal state without validation',
  'Interview trap: Using inheritance when composition is more appropriate',
  'Interview trap: Overusing `instanceof` as universal runtime validation',
  'Interview trap: Overusing mixins',
  "Interview trap: Building large 'god classes'",
];

const TRADE_OFFS =
  'Advantages: classes package construction, state, and behavior into a documented shape, static members and private fields give clear boundaries, and inheritance/polymorphism let callers depend on a shared interface instead of concrete types. Disadvantages: deep inheritance hierarchies get rigid and hard to refactor, `super`/`new` semantics carry sharp edges (e.g. `super()` must run before `this` is used), and static or mutable class state can leak unexpected shared behavior across the whole application.';

const FOLLOW_UP_QUESTIONS = [
  'How does `new` construct an instance step by step?',
  'Why must `super()` be called before `this` in a derived constructor?',
  'How do static members differ from instance members at the prototype level?',
  'Why are `#private` fields stronger than an `_underscore` convention?',
  'When would you choose composition over inheritance?',
  'What problems can excessive mixin usage cause?',
  'How does class inheritance map onto the prototype chain?',
  'What are the risks of relying on `instanceof` for validation?',
  'How would you refactor a deep inheritance hierarchy?',
  'What makes a class violate single responsibility?',
  'How do getters/setters affect testability and predictability?',
  'When is a plain object preferable to a class?',
];

const RELATED_TOPICS = [
  'ES6 classes',
  'Constructors',
  'super',
  'Static methods',
  'Private fields',
  'Getters and setters',
  'Encapsulation',
  'Abstraction',
  'Polymorphism',
  'Composition',
  'Mixins',
  'Prototype chain',
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
    id: 'jsadv-m8-156',
    number: 'JSADV-M8-156',
    title: 'What Are ES6 Classes?',
    difficulty: 'Easy',
    expectedAnswer:
      '**What Are ES6 Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are ES6 Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-157',
    number: 'JSADV-M8-157',
    title: 'What Is a Constructor?',
    difficulty: 'Easy',
    expectedAnswer: '**What Is a Constructor?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is a Constructor?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-158',
    number: 'JSADV-M8-158',
    title: 'What Happens When You Use `new` With a Class?',
    difficulty: 'Hard',
    expectedAnswer:
      '**What Happens When You Use `new` With a Class?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Happens When You Use `new` With a Class?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-159',
    number: 'JSADV-M8-159',
    title: 'What Is Inheritance in JavaScript Classes?',
    difficulty: 'Medium',
    expectedAnswer: '**What Is Inheritance in JavaScript Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Inheritance in JavaScript Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-160',
    number: 'JSADV-M8-160',
    title: 'What Is `super`?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Is `super`?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is `super`?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-161',
    number: 'JSADV-M8-161',
    title: 'What Is Method Overriding?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Is Method Overriding?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Method Overriding?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-162',
    number: 'JSADV-M8-162',
    title: 'What Are Static Methods?',
    difficulty: 'Medium',
    expectedAnswer: '**What Are Static Methods?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Static Methods?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-163',
    number: 'JSADV-M8-163',
    title: 'What Are Static Fields and Static Initialization Blocks?',
    difficulty: 'Hard',
    expectedAnswer:
      '**What Are Static Fields and Static Initialization Blocks?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Static Fields and Static Initialization Blocks?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-164',
    number: 'JSADV-M8-164',
    title: 'What Are Private Fields?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Are Private Fields?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Private Fields?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-165',
    number: 'JSADV-M8-165',
    title: 'What Are Getters and Setters?',
    difficulty: 'Medium',
    expectedAnswer: '**What Are Getters and Setters?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Getters and Setters?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-166',
    number: 'JSADV-M8-166',
    title: 'What Is Encapsulation?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Is Encapsulation?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Encapsulation?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-167',
    number: 'JSADV-M8-167',
    title: 'What Is Abstraction?',
    difficulty: 'Medium',
    expectedAnswer: '**What Is Abstraction?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Abstraction?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-168',
    number: 'JSADV-M8-168',
    title: 'What Is Polymorphism?',
    difficulty: 'Hard',
    expectedAnswer:
      '**What Is Polymorphism?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Polymorphism?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-169',
    number: 'JSADV-M8-169',
    title: 'What Is Composition?',
    difficulty: 'Medium',
    expectedAnswer: '**What Is Composition?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is Composition?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-170',
    number: 'JSADV-M8-170',
    title: 'What Are Mixins?',
    difficulty: 'Hard',
    expectedAnswer: '**What Are Mixins?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Mixins?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-171',
    number: 'JSADV-M8-171',
    title: 'What Is the Difference Between Objects and Classes?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Is the Difference Between Objects and Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Is the Difference Between Objects and Classes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-172',
    number: 'JSADV-M8-172',
    title: 'What Are the Four Common OOP Principles?',
    difficulty: 'Medium',
    expectedAnswer:
      '**What Are the Four Common OOP Principles?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are the Four Common OOP Principles?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-173',
    number: 'JSADV-M8-173',
    title: 'How Does JavaScript Class Inheritance Relate to Prototypes?',
    difficulty: 'Hard',
    expectedAnswer:
      '**How Does JavaScript Class Inheritance Relate to Prototypes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**How Does JavaScript Class Inheritance Relate to Prototypes?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-174',
    number: 'JSADV-M8-174',
    title: 'What Are Common OOP Mistakes in JavaScript?',
    difficulty: 'Hard',
    expectedAnswer:
      '**What Are Common OOP Mistakes in JavaScript?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are Common OOP Mistakes in JavaScript?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
  {
    id: 'jsadv-m8-175',
    number: 'JSADV-M8-175',
    title: 'What Are JavaScript OOP Best Practices?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer:
      '**What Are JavaScript OOP Best Practices?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.',
    deepExplanation:
      'Step 1 — Understand the mechanism.\n\n**What Are JavaScript OOP Best Practices?** should explain JavaScript class syntax as prototype-based behavior expressed with class declarations, constructors, methods, inheritance, static members, and private fields.\n\nStep 2 — Easy method:\nStart with the runtime rule, then walk through one small example and identify the visible output before discussing edge cases.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return "Hello " + this.name;\n  }\n}\n\nconst user = new User("Rasik");\nconst message = user.greet();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nclass User {\n  constructor(\n    public readonly name: string,\n  ) {}\n\n  greet(): string {\n    return `Hello ${this.name}`;\n  }\n}\n\nconst message =\n  new User("Rasik").greet();\n```\n\nStep 5 — Production example:\nKeep the binding/prototype/object/class boundary explicit, prefer predictable initialization, and test the behavior that callers depend on.\n\nStep 6 — Edge cases:\nCheck shadowing, null/undefined, detached methods, cross-realm behavior, mutation, lifecycle, and memory retention where relevant.\n\nStep 7 — Senior takeaway:\nExplain the runtime rule precisely, then connect it to maintainability, correctness, performance, and debugging.',
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE8_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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