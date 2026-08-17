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
      'A JavaScript class is syntax for defining objects and their behavior using a constructor and methods.',
    deepExplanation:
      "Example: `class User { constructor(name) { this.name = name; } greet() { return \\`Hello ${this.name}\\`; } }` — `new User('Rasik').greet()` outputs `Hello Rasik`. Classes do not introduce a separate inheritance model; JavaScript remains prototype-based under the class syntax.",
  },
  {
    id: 'jsadv-m8-157',
    number: 'JSADV-M8-157',
    title: 'What Is a Constructor?',
    difficulty: 'Easy',
    expectedAnswer: 'A constructor initializes a newly created class instance.',
    deepExplanation:
      'The constructor runs automatically when the class is instantiated with `new`, assigning arguments such as `name` and `role` onto `this` so the resulting instance carries `employee.name` and `employee.role`.',
  },
  {
    id: 'jsadv-m8-158',
    number: 'JSADV-M8-158',
    title: 'What Happens When You Use `new` With a Class?',
    difficulty: 'Hard',
    expectedAnswer:
      "`new` creates a new object, links it to the class's prototype, invokes the constructor with that object as `this`, initializes its properties, and returns the instance.",
    deepExplanation:
      'Conceptually: create object → connect it to `User.prototype` → call the constructor with the new instance as `this` → initialize properties → return the instance. The resulting prototype chain is `user → User.prototype → Object.prototype → null`. Class constructors also cannot normally be called without `new`.',
  },
  {
    id: 'jsadv-m8-159',
    number: 'JSADV-M8-159',
    title: 'What Is Inheritance in JavaScript Classes?',
    difficulty: 'Medium',
    expectedAnswer: 'Inheritance allows a derived class to reuse behavior from a base class via `extends`.',
    deepExplanation:
      '`class Dog extends Animal {}` lets a `Dog` instance call both its own `bark()` and the inherited `speak()`, producing `Bruno makes a sound` then `Bruno barks`. The resulting chain is `dog → Dog.prototype → Animal.prototype → Object.prototype → null`.',
  },
  {
    id: 'jsadv-m8-160',
    number: 'JSADV-M8-160',
    title: 'What Is `super`?',
    difficulty: 'Medium',
    expectedAnswer:
      '`super` is used inside derived classes to access base-class behavior — both the parent constructor and parent methods.',
    deepExplanation:
      '`super(name)` in a derived constructor forwards arguments to the base constructor before `this.breed = breed` runs. `super.speak()` inside an overriding method calls the base implementation, producing `Animal sound + Bark`. Interview rule: in a derived constructor, `super()` must be called before `this` is accessed.',
  },
  {
    id: 'jsadv-m8-161',
    number: 'JSADV-M8-161',
    title: 'What Is Method Overriding?',
    difficulty: 'Medium',
    expectedAnswer:
      "A child class can provide its own implementation of an inherited method, replacing the parent's behavior for that class.",
    deepExplanation:
      "`CardPayment extends Payment` and redefines `process()`, so calling `process()` on a `CardPayment` instance returns `Processing card payment` instead of the generic implementation. This is one mechanism used to achieve polymorphic behavior.",
  },
  {
    id: 'jsadv-m8-162',
    number: 'JSADV-M8-162',
    title: 'What Are Static Methods?',
    difficulty: 'Medium',
    expectedAnswer: 'A static method belongs to the class itself rather than its instances.',
    deepExplanation:
      '`MathUtil.add(10, 20)` returns `30` because `add` is defined with `static`. Calling `util.add(10, 20)` on an instance throws a `TypeError`, since static members are not copied onto `MathUtil.prototype`.',
  },
  {
    id: 'jsadv-m8-163',
    number: 'JSADV-M8-163',
    title: 'What Are Static Fields and Static Initialization Blocks?',
    difficulty: 'Hard',
    expectedAnswer:
      'Modern JavaScript supports static fields and static initialization blocks that run once when the class itself is evaluated.',
    deepExplanation:
      "`static environment = 'production'` declares a class-level field, and a `static { ... }` block can run setup logic (e.g. reading `globalThis.APP_ENV`) once when the class is defined, before any instance exists. In browser code, avoid assuming `process.env` exists unless the build system provides it.",
  },
  {
    id: 'jsadv-m8-164',
    number: 'JSADV-M8-164',
    title: 'What Are Private Fields?',
    difficulty: 'Medium',
    expectedAnswer:
      'JavaScript supports true private class fields declared with a leading `#`, accessible only from inside the class body.',
    deepExplanation:
      '`#balance` on `BankAccount` can only be read or written through methods like `deposit()`/`getBalance()`; `account.#balance` from outside the class is a syntax error, not just a convention. This is stronger encapsulation than a `_balance` naming convention, which remains fully public.',
  },
  {
    id: 'jsadv-m8-165',
    number: 'JSADV-M8-165',
    title: 'What Are Getters and Setters?',
    difficulty: 'Medium',
    expectedAnswer: 'Getters expose computed, read-like access to a value, while setters intercept and control assignment.',
    deepExplanation:
      '`get fullName()` and `set fullName(value)` let `user.fullName` be read and written like a plain property while custom logic runs underneath (splitting/joining `firstName`/`lastName`). Interview trap: a getter is accessed as `user.fullName`, never called as `user.fullName()`.',
  },
  {
    id: 'jsadv-m8-166',
    number: 'JSADV-M8-166',
    title: 'What Is Encapsulation?',
    difficulty: 'Medium',
    expectedAnswer:
      'Encapsulation means keeping internal state and implementation details controlled behind a clear public interface.',
    deepExplanation:
      '`Counter` exposes `increment()` and a `value` getter while keeping `#count` private, so consumers can only change state through the public API — `counter.value` reads `2` after two `increment()` calls — rather than mutating internals directly.',
  },
  {
    id: 'jsadv-m8-167',
    number: 'JSADV-M8-167',
    title: 'What Is Abstraction?',
    difficulty: 'Medium',
    expectedAnswer: 'Abstraction exposes what an object does while hiding how it performs the operation.',
    deepExplanation:
      "`PaymentService.pay(amount)` is the only method a consumer calls; private `#validate()` and `#charge()` methods handle the details internally, so `service.pay(500)` produces `Charging 500` then `Payment successful` without the caller needing to know how validation or charging work.",
  },
  {
    id: 'jsadv-m8-168',
    number: 'JSADV-M8-168',
    title: 'What Is Polymorphism?',
    difficulty: 'Hard',
    expectedAnswer:
      'Polymorphism means a common interface can produce different behavior depending on the concrete object that implements it.',
    deepExplanation:
      '`EmailNotification` and `SmsNotification` both implement `send()` from a shared `Notification` base; `notify(notification)` calls `notification.send()` without knowing the concrete type, yielding `Sending email` and `Sending SMS` respectively. The caller depends on the `send()` contract, not a specific implementation.',
  },
  {
    id: 'jsadv-m8-169',
    number: 'JSADV-M8-169',
    title: 'What Is Composition?',
    difficulty: 'Medium',
    expectedAnswer: 'Composition combines independent behaviors into an object instead of building a deep inheritance hierarchy.',
    deepExplanation:
      "`Object.assign(this, canLog, canTrack)` in `UserService`'s constructor mixes in `log()` and `track()` from separate behavior objects, producing `[LOG] User loaded` and `[TRACK] user_viewed`. Prefer composition when behaviors are independent and inheritance would not represent a genuine 'is-a' relationship.",
  },
  {
    id: 'jsadv-m8-170',
    number: 'JSADV-M8-170',
    title: 'What Are Mixins?',
    difficulty: 'Hard',
    expectedAnswer: 'A mixin is a function that adds reusable behavior to a class by returning a new class extending a given base.',
    deepExplanation:
      '`Timestamped(Base)` and `Identifiable(Base)` each return a subclass adding one field; composing them as `class User extends Timestamped(Identifiable(Entity)) {}` gives instances both `id` (a string UUID) and `createdAt` (a `Date`). Mixins are powerful, but excessive mixin chains can make class relationships hard to follow.',
  },
  {
    id: 'jsadv-m8-171',
    number: 'JSADV-M8-171',
    title: 'What Is the Difference Between Objects and Classes?',
    difficulty: 'Medium',
    expectedAnswer:
      "An object is a concrete value that can hold data directly, while a class is blueprint-like syntax that defines construction and behavior — both remain prototype-based underneath.",
    deepExplanation:
      "An object literal like `{ name: 'Rasik', greet() {...} }` can be used immediately, while a class like `User` must be instantiated with `new` to produce an instance with the same shape. Neither is universally better — the choice depends on the domain: objects (or `Object.create()`) suit ad-hoc composition, classes suit structured, repeatedly-instantiated domain models.",
  },
  {
    id: 'jsadv-m8-172',
    number: 'JSADV-M8-172',
    title: 'What Are the Four Common OOP Principles?',
    difficulty: 'Medium',
    expectedAnswer:
      'The four commonly taught OOP principles are encapsulation, abstraction, inheritance, and polymorphism.',
    deepExplanation:
      "Encapsulation controls internal state, abstraction exposes a simple interface, inheritance reuses behavior through an 'is-a' relationship, and polymorphism lets a common interface produce different implementations. Modern JavaScript also benefits heavily from composition and functional techniques alongside these four.",
  },
  {
    id: 'jsadv-m8-173',
    number: 'JSADV-M8-173',
    title: 'How Does JavaScript Class Inheritance Relate to Prototypes?',
    difficulty: 'Hard',
    expectedAnswer:
      "Class syntax is built entirely on JavaScript's existing prototype model — `extends` wires up the prototype chain rather than introducing a separate inheritance mechanism.",
    deepExplanation:
      'For `class Dog extends Animal {}`, both `Object.getPrototypeOf(dog) === Dog.prototype` and `Object.getPrototypeOf(Dog.prototype) === Animal.prototype` evaluate to `true`. The resulting chain is `dog → Dog.prototype → Animal.prototype → Object.prototype → null`, directly connecting class inheritance to the prototype chain.',
  },
  {
    id: 'jsadv-m8-174',
    number: 'JSADV-M8-174',
    title: 'What Are Common OOP Mistakes in JavaScript?',
    difficulty: 'Hard',
    expectedAnswer:
      'Common mistakes include unnecessary deep inheritance, using classes where a plain object would do, mutating shared prototype state, exposing unvalidated internal state, and treating `instanceof` as universal runtime validation.',
    deepExplanation:
      "Other frequent mistakes: overusing getters/setters and mixins, ignoring error handling, assuming JavaScript classes behave exactly like Java/C++ classes, and building large 'god classes'. The better approach escalates design complexity only as needed: simple requirement → object/function → composition → class → inheritance, choosing the simplest design that satisfies the requirement.",
  },
  {
    id: 'jsadv-m8-175',
    number: 'JSADV-M8-175',
    title: 'What Are JavaScript OOP Best Practices?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer:
      'Production OOP code favors composition over inheritance, keeps classes small and single-responsibility, keeps public APIs minimal, and uses private fields and dependency injection deliberately.',
    deepExplanation:
      'Concretely: prefer composition when inheritance is not necessary, validate constructor inputs, avoid mutable global state and unnecessary prototype mutation, prefer dependency injection for external services, keep domain logic testable, use clear naming, document non-obvious invariants, avoid deep inheritance trees, profile before optimizing object creation, and treat class syntax as a tool rather than a requirement.',
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
