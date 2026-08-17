// Hand-authored tricky JavaScript output prediction questions bank.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_TRICKY_OUTPUT_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    detail: {
      id: 'jsout-tricky-1',
      questionNumber: 'JSTRICKY-001',
      title: 'Object.freeze vs Object.seal Mutation Behavior',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Uber'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['Object.freeze', 'Object.seal', 'mutability', 'object property descriptors', 'strict mode'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What will be logged by console.log(person1.location, person1.age) and console.log(person2.location, person2.age)?',
    },
    answer: {
      expectedAnswer: 'undefined 21 and undefined 53',
      deepExplanation:
        'Code:\n\n```js\nlet person1 = {\n    name: \'ravi\',\n    age: 21\n}\nlet person2 = {\n  name: "ram",\n  age: 43\n}\nperson1 = Object.freeze(person1)\nperson2 = Object.seal(person2)\n\nperson1.age = 31\nperson2.age = 53\n\nperson1.location = \'US\'\nperson2.location = \'UK\'\n\nconsole.log(person1.location, person1.age)\nconsole.log(person2.location, person2.age)\n```\n\n`Object.freeze(person1)` renders `person1` immutable: no properties can be added, deleted, or reassigned. `person1.age = 31` fails silently (in non-strict mode), leaving `age` as `21`. Adding `person1.location = "US"` also fails silently, keeping `location` `undefined`.\n\n`Object.seal(person2)` prevents property addition/deletion, but allows modifying existing writable properties. Therefore, `person2.age = 53` updates `age` to `53`, while `person2.location = "UK"` fails silently, keeping `location` `undefined`.',
      productionExample:
        'Use Object.freeze for top-level immutable configurations or constant dictionaries, and Object.seal when an object shape should remain fixed while allowing value updates.',
      bestPractices: [
        'Understand that Object.freeze and Object.seal are shallow operations',
        'In strict mode (\'use strict\'), attempting to mutate frozen or sealed objects throws a TypeError rather than failing silently',
        'Use TypeScript as Readonly<T> to catch immutability violations at compile time'
      ],
      tradeOffs:
        'Object.freeze gives stronger immutability guarantees but prevents modifying existing properties, whereas Object.seal locks object shape while allowing state updates.',
      commonMistakes: [
        'Assuming Object.seal prevents mutating existing properties',
        'Assuming Object.freeze works deeply on nested objects',
        'Expecting silent mutations to throw errors in non-strict mode'
      ],
      followUpQuestions: [
        'How would you implement deep freeze for nested objects?',
        'What happens when running this code in strict mode?'
      ],
      relatedTopics: ['Object.freeze', 'Object.seal', 'Object.preventExtensions', 'Property Descriptors']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-2',
      questionNumber: 'JSTRICKY-002',
      title: 'Adding Properties to Function Objects',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['functions as first-class objects', 'function properties', 'prototype chain'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What happens when you add a property directly to a function, like bark.animal = "dog"?',
    },
    answer: {
      expectedAnswer: 'bark.animal evaluates to "dog", and invoking bark() logs "Woof!". No error occurs.',
      deepExplanation:
        'Code:\n\n```js\nfunction bark() {\n  console.log(\'Woof!\');\n}\n\nbark.animal = \'dog\';\n```\n\nIn JavaScript, functions are first-class objects (instances of `Function`). Because functions are objects, properties can be dynamically assigned to them just like regular object literals. Adding `bark.animal = "dog"` attaches property `animal` to the `bark` function instance without affecting its callable behavior.',
      productionExample:
        'Library authors use function properties to attach helper utility methods or default options to a primary exported function (e.g. React.memo, axios.get).',
      bestPractices: [
        'Recognize that functions inherit from Function.prototype and Object.prototype',
        'Avoid attaching arbitrary custom properties to standard functions unless building deliberate API primitives (like static class methods or memoization caches)'
      ],
      tradeOffs:
        'Attaching properties to functions allows flexible API design, but overusing it can obscure object structure and pollute function instances.',
      commonMistakes: [
        'Believing functions cannot hold properties like normal objects',
        'Confusing function static properties with prototype methods'
      ],
      followUpQuestions: [
        'How does function memoization utilize properties attached to function objects?',
        'What is the difference between bark.animal and bark.prototype.animal?'
      ],
      relatedTopics: ['Functions as First-Class Objects', 'Function.prototype', 'Static Properties']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-3',
      questionNumber: 'JSTRICKY-003',
      title: 'Strict Mode and Undeclared Variables',
      difficulty: 'Easy',
      companies: ['Meta', 'Amazon', 'Microsoft'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['use strict', 'implicit globals', 'ReferenceError', 'lexical scope'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is logged or thrown when getAge() is executed under strict mode?',
    },
    answer: {
      expectedAnswer: 'Uncaught ReferenceError: age is not defined',
      deepExplanation:
        'Code:\n\n```js\nfunction getAge() {\n  \'use strict\';\n  age = 21;\n  console.log(age);\n}\n\ngetAge();\n```\n\nIn non-strict mode, assigning to an unmapped/undeclared variable (`age = 21`) creates a property on the global object (implicit global). In strict mode (`\'use strict\'`), assigning to an undeclared identifier throws a runtime `ReferenceError` to prevent accidental global scope pollution.',
      productionExample:
        'Modern ES modules and TypeScript default to strict mode automatically, preventing unintended global variable leaks.',
      bestPractices: [
        'Always use \'use strict\' or ES modules',
        'Always declare variables explicitly with let, const, or var'
      ],
      tradeOffs:
        'Strict mode catches silent failures and undeclared assignments early, throwing explicit errors rather than producing hidden bugs.',
      commonMistakes: [
        'Expecting strict mode to quietly create a global variable',
        'Confusing ReferenceError (undeclared binding) with TypeError'
      ],
      followUpQuestions: [
        'How does strict mode alter this binding inside plain function calls?',
        'What other silent errors does strict mode convert into throw exceptions?'
      ],
      relatedTopics: ['Strict Mode', 'Implicit Globals', 'ReferenceError', 'Scope']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-4',
      questionNumber: 'JSTRICKY-004',
      title: 'Immediately Invoked Arrow Function and typeof',
      difficulty: 'Easy',
      companies: ['Google', 'Amazon', 'Netflix'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['IIFE', 'arrow functions', 'typeof operator', 'return values'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What does console.log(typeof sayHi()) output?',
    },
    answer: {
      expectedAnswer: '"number"',
      deepExplanation:
        'Code:\n\n```js\nfunction sayHi() {\n  return (() => 0)();\n}\n\nconsole.log(typeof sayHi());\n```\n\nInside `sayHi()`, `(() => 0)()` is an Immediately Invoked Arrow Function Expression (IIFE). The arrow function returns `0` implicitly, and calling `()` invokes it immediately. `sayHi()` returns `0`. Evaluating `typeof 0` produces `"number"`.',
      productionExample:
        'IIFEs are used to execute inline logic or isolate temporary scope in single expressions.',
      bestPractices: [
        'Parenthesize IIFE function expressions to clarify immediate execution intent',
        'Ensure arrow function implicit returns are accurately typed'
      ],
      tradeOffs:
        'Inline IIFEs isolate evaluation logic in expressions but can hurt readability if deeply nested.',
      commonMistakes: [
        'Assuming typeof sayHi() returns "function"',
        'Misinterpreting arrow function implicit return syntax'
      ],
      followUpQuestions: [
        'What would typeof sayHi return if sayHi returned (() => 0) without the invoking parentheses ()?'
      ],
      relatedTopics: ['IIFE', 'Arrow Functions', 'typeof Operator']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-5',
      questionNumber: 'JSTRICKY-005',
      title: 'Sparse Array Allocation via Out-of-Bounds Indexing',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Uber'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['sparse arrays', 'array length property', 'empty slots', 'array iteration'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is logged when assigning an element beyond array bounds, like numbers[10] = 11?',
    },
    answer: {
      expectedAnswer: '[ 1, 2, 3, <7 empty items>, 11 ] (Array length becomes 11 with empty slots)',
      deepExplanation:
        'Code:\n\n```js\nconst numbers = [1, 2, 3];\nnumbers[10] = 11;\nconsole.log(numbers);\n```\n\nAssigning an index greater than or equal to an array\'s current `.length` automatically updates `.length` to `index + 1` (here 11). Indices 3 through 9 are not assigned values; they become "empty slots" (holes in sparse arrays). Reading an empty slot like `numbers[4]` returns `undefined`, but `numbers.hasOwnProperty(4)` returns `false`.',
      productionExample:
        'Sparse arrays can cause unexpected performance drops in V8 engines as arrays transition from fast packed elements to slow dictionary mode.',
      bestPractices: [
        'Avoid creating sparse arrays with missing slots',
        'Use Array.prototype.push or Array.from when dynamically expanding arrays'
      ],
      tradeOffs:
        'Sparse arrays save memory for huge unpopulated ranges but slow down high-throughput array iterations.',
      commonMistakes: [
        'Assuming unassigned slots are filled with explicit undefined values',
        'Expecting Array.prototype.map or forEach to execute over empty slots'
      ],
      followUpQuestions: [
        'How do forEach and map handle empty array slots versus explicit undefined values?',
        'How does V8 represent sparse arrays internally?'
      ],
      relatedTopics: ['Sparse Arrays', 'Array Length', 'Holes in Arrays', 'V8 Optimization']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-6',
      questionNumber: 'JSTRICKY-006',
      title: 'Chained Variable Assignment and Global Leaks',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Flipkart'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['chained assignment', 'global scope pollution', 'var function scope', 'typeof operator'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is logged by typeof b === "undefined" and typeof a === "undefined"?',
    },
    answer: {
      expectedAnswer: 'false and true',
      deepExplanation:
        'Code:\n\n```js\n{\n  function display() {\n    var a = (b = 10);\n  }\n  display();\n  console.log(typeof b === "undefined");\n  console.log(typeof a === "undefined");\n}\n```\n\nInside `display()`, `var a = (b = 10)` is evaluated from right to left:\n1. `b = 10`: `b` is assigned `10` without a `var`/`let`/`const` declaration. In non-strict mode, this attaches `b` to global scope (`window.b = 10`).\n2. `var a = b`: `a` is declared locally within `display()`\'s function scope and assigned `10`.\n\nOutside `display()`:\n- `b` exists globally as number `10`, so `typeof b` is `"number"`, making `typeof b === "undefined"` `false`.\n- `a` is function-scoped to `display()`, so `typeof a` outside evaluates to `"undefined"`, making `typeof a === "undefined"` `true`.',
      productionExample:
        'Chained assignments like `let a = b = 1` are a common interview trap and cause silent global state pollution in non-strict legacy codebases.',
      bestPractices: [
        'Never chain variable declarations (use separate declarations `let a = 10, b = 10`)',
        'Enforce strict mode or linters (ESLint no-implicit-globals / no-undef)'
      ],
      tradeOffs:
        'Chained assignment saves minimal keystrokes at the expense of severe scope bugs.',
      commonMistakes: [
        'Believing var applies to both a and b in var a = b = 10',
        'Thinking block scoping ({}) traps var declarations'
      ],
      followUpQuestions: [
        'How would let a = (b = 10) behave in strict mode?',
        'Does var respect block scope inside { ... }?'
      ],
      relatedTopics: ['Scope', 'Implicit Globals', 'Chained Assignment', 'var vs let']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-7',
      questionNumber: 'JSTRICKY-007',
      title: 'var in Loop with Asynchronous setTimeout',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['var hoisting', 'closures', 'event loop', 'let block scope'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What will be logged by the setTimeout callbacks in this loop?',
    },
    answer: {
      expectedAnswer: '3, 3, 3',
      deepExplanation:
        'Code:\n\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), i*10);\n}\n```\n\n`var i` is function-scoped (or global), creating a single variable shared across all iterations of the loop. The `for` loop runs synchronously to completion, incrementing `i` to `3`. When the `setTimeout` callbacks execute asynchronously from the event loop, all three arrow functions reference the same outer `i` variable, logging `3` three times.',
      productionExample:
        'This classic closure bug occurs when binding asynchronous event listeners inside loops without block-scoped iteration variables.',
      bestPractices: [
        'Use let in for loops to create a fresh binding per iteration',
        'Or create an explicit closure with an IIFE or helper function if using ES5'
      ],
      tradeOffs:
        'Block-scoped let in loops creates a separate memory binding per iteration, guaranteeing predictable asynchronous values.',
      commonMistakes: [
        'Expecting the loop to log 0, 1, 2',
        'Thinking setTimeout delay (i*10) preserves iteration values'
      ],
      followUpQuestions: [
        'How does replacing var i with let i solve this problem under the hood?',
        'How would you solve this using an IIFE in ES5?'
      ],
      relatedTopics: ['Event Loop', 'Closures', 'var vs let', 'Asynchronous JavaScript']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-8',
      questionNumber: 'JSTRICKY-008',
      title: 'Variable Redeclaration with var',
      difficulty: 'Easy',
      companies: ['Amazon', 'Microsoft', 'Adobe'],
      frequency: 3,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['var hoisting', 'redeclaration', 'variable shadowing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is logged when redeclaring var num in the same scope?',
    },
    answer: {
      expectedAnswer: '10',
      deepExplanation:
        'Code:\n\n```js\nvar num = 8;\nvar num = 10;\n\nconsole.log(num);\n```\n\nVariables declared with `var` allow duplicate declarations within the same scope. During the compilation/creation phase, `var num` is registered once in memory. At runtime execution phase, `num` is assigned `8` and then reassigned to `10`. The second `var num = 10` overwrites the first.',
      productionExample:
        'Accidental redeclarations with `var` in legacy codebases cause quiet state overwrites without syntax warnings.',
      bestPractices: [
        'Use const and let to prevent accidental variable redeclaration',
        'Enable ESLint no-redeclare rule'
      ],
      tradeOffs:
        'let and const throw SyntaxError on duplicate declarations, enforcing safer variable naming.',
      commonMistakes: [
        'Expecting a SyntaxError when redeclaring var',
        'Confusing var redeclaration with let/const TDZ errors'
      ],
      followUpQuestions: [
        'What happens if you replace var num = 10 with let num = 10 in the same scope?'
      ],
      relatedTopics: ['var', 'let', 'Redeclaration', 'Hoisting']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-9',
      questionNumber: 'JSTRICKY-009',
      title: 'Event Loop Execution Order with setTimeout',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon', 'Uber'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['call stack', 'event loop', 'macrotask queue', 'asynchronous execution'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'In what order will First, Second, and Third be logged?',
    },
    answer: {
      expectedAnswer: 'First, Third, Second',
      deepExplanation:
        'Code:\n\n```js\nconst foo = () => console.log(\'First\');\nconst bar = () => setTimeout(() => console.log(\'Second\'));\nconst baz = () => console.log(\'Third\');\n\nbar();\nfoo();\nbaz();\n```\n\n1. `bar()` runs: `setTimeout` delegates the callback `() => console.log(\'Second\')` to Web APIs, placing it into the Macrotask Queue.\n2. `foo()` runs synchronously: logs `First`.\n3. `baz()` runs synchronously: logs `Third`.\n4. Call stack empties. The event loop picks up the timer macrotask and logs `Second`.',
      productionExample:
        'Understanding timer macrotasks prevents UI thread blocking and ordering bugs in async data flow.',
      bestPractices: [
        'Do not rely on setTimeout(fn, 0) for exact execution timing',
        'Use Promises/queueMicrotask for high-priority task ordering'
      ],
      tradeOffs:
        'Macrotasks run after call stack completion and microtask queue exhaustion.',
      commonMistakes: [
        'Expecting setTimeout without delay to execute synchronously',
        'Confusing execution order of callbacks vs invocation order of bar()'
      ],
      followUpQuestions: [
        'How does queueMicrotask differ from setTimeout(fn, 0)?'
      ],
      relatedTopics: ['Event Loop', 'Macrotasks', 'Call Stack', 'Asynchronous JS']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-10',
      questionNumber: 'JSTRICKY-010',
      title: 'Programmatic Click Dispatch and Microtask Queue',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Netflix', 'Stripe'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['event listeners', 'button.click()', 'microtask queue', 'synchronous event dispatch'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'What is logged when button.click() is called programmatically?',
    },
    answer: {
      expectedAnswer: 'Listener 1, Listener 2, MicroTask 1, MicroTask 2',
      deepExplanation:
        'Code:\n\n```js\nbutton.addEventListener(\'click\', () => {\n  Promise.resolve().then(() => console.log(\'MicroTask 1\'))\n  console.log("Listener 1")\n})\nbutton.addEventListener(\'click\', () => {\n  Promise.resolve().then(() => console.log(\'MicroTask 2\'))\n  console.log("Listener 2")\n})\n\nbutton.click()\n```\n\nWhen `button.click()` is invoked programmatically via script:\n1. The event dispatch is **synchronous**. Listener 1 executes immediately on the call stack.\n2. Inside Listener 1, `Promise.resolve().then(...)` queues MicroTask 1. `"Listener 1"` is logged synchronously.\n3. Listener 2 executes immediately on the same call stack *before* control returns to the event loop. Inside Listener 2, MicroTask 2 is queued, and `"Listener 2"` is logged.\n4. The synchronous script stack clears. The event loop then flushes the microtask queue, logging `"MicroTask 1"` then `"MicroTask 2"`.\n\n*(Note: If triggered by an actual user hardware click, microtasks flush between separate event listener dispatches!)*',
      productionExample:
        'Distinguishing user-initiated UI events from programmatic DOM method calls (`.click()`, `.focus()`) is vital for predicting state update timing in frameworks.',
      bestPractices: [
        'Be aware that programmatic event dispatches run synchronously on the call stack',
        'Avoid depending on microtask execution order between event listeners'
      ],
      tradeOffs:
        'Script-triggered events execute all handlers synchronously before microtask flushing, whereas true user events yield microtask checks between listeners.',
      commonMistakes: [
        'Assuming MicroTask 1 runs before Listener 2 in programmatic click()',
        'Treating user clicks and button.click() as having identical microtask timing'
      ],
      followUpQuestions: [
        'How does execution order change if a user physically clicks the button instead of calling button.click()?'
      ],
      relatedTopics: ['Event Loop', 'Microtasks', 'DOM Events', 'Synchronous Dispatch']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-11',
      questionNumber: 'JSTRICKY-011',
      title: 'Microtasks vs Macrotasks Execution Priority',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['event loop', 'microtask queue', 'macrotask queue', 'Promise', 'setTimeout'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What order will one, two, three, four be logged?',
    },
    answer: {
      expectedAnswer: 'one, four, three, two',
      deepExplanation:
        'Code:\n\n```js\nconsole.log(\'one\');\nsetTimeout(function() {\n  console.log(\'two\');\n}, 0);\nPromise.resolve().then(function() {\n  console.log(\'three\');\n});\nconsole.log(\'four\');\n```\n\n1. Synchronous execution: `console.log(\'one\')` runs -> logs `one`.\n2. `setTimeout` registers callback in Macrotask queue.\n3. `Promise.resolve().then` registers callback in Microtask queue.\n4. Synchronous execution: `console.log(\'four\')` runs -> logs `four`.\n5. Call stack empties. Microtask queue is drained before any macrotask: `three` is logged.\n6. Macrotask queue is processed: `two` is logged.',
      productionExample:
        'Promise resolution callbacks take priority over timer callbacks, ensuring state updates flush before next paint/timer frame.',
      bestPractices: [
        'Use Promises / async await for immediate post-task asynchronous processing',
        'Reserve setTimeout for deferring tasks to subsequent event loop ticks'
      ],
      tradeOffs:
        'Microtask queues drain completely in a single tick before macro tasks, so infinite microtask loops can starve macrotasks and freeze rendering.',
      commonMistakes: [
        'Thinking setTimeout(..., 0) runs before Promise microtasks',
        'Expecting Promise.resolve().then to execute synchronously'
      ],
      followUpQuestions: [
        'What happens to macrotasks if a microtask recursively enqueues another microtask?'
      ],
      relatedTopics: ['Event Loop', 'Microtasks', 'Macrotasks', 'Promises', 'setTimeout']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-12',
      questionNumber: 'JSTRICKY-012',
      title: 'Block-Scoped Function Hoisting Annex B Semantics',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon'],
      frequency: 3,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['Annex B.3.3', 'block-scoped functions', 'hoisting', 'var scoping'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'What is logged by console.log(a) after execution of the if block?',
    },
    answer: {
      expectedAnswer: '10',
      deepExplanation:
        'Code:\n\n```js\nvar a = 1;\nif (true) {\n  function a() {}\n  var a = 10;\n}\nconsole.log(a);\n```\n\nIn Web browsers (non-strict mode), function declarations inside blocks follow ECMAScript Annex B.3.3 semantics:\n1. `var a = 1` sets outer `a` to `1`.\n2. Inside `if(true)`, `function a() {}` creates a block-scoped binding for `a` and also hoists a `var a` declaration to top-level scope.\n3. Reaching `var a = 10` inside the block overwrites `a` with `10` in the outer function/global scope.\n4. `console.log(a)` outputs `10`.',
      productionExample:
        'Avoid declaring function statements inside conditional blocks to prevent browser engine compatibility edge cases.',
      bestPractices: [
        'Never declare function statements inside if/else blocks; use function expressions (`const a = () => {}`) instead',
        'Use strict mode to enforce predictable block-scoped function behavior'
      ],
      tradeOffs:
        'Function expressions assigned to const/let obey standard block scope without Annex B hoisting side effects.',
      commonMistakes: [
        'Assuming function a() {} inside block overrides outer var to a function type permanently',
        'Confusing strict mode block function behavior with non-strict Annex B semantics'
      ],
      followUpQuestions: [
        'How does strict mode alter function declaration behavior inside block statements?'
      ],
      relatedTopics: ['Hoisting', 'Annex B.3.3', 'Block Scope', 'Functions in Blocks']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-13',
      questionNumber: 'JSTRICKY-013',
      title: 'Function Hoisting Precedence over var Declarations',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Adobe'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['function hoisting', 'var hoisting', 'typeof operator', 'variable reassignment'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is logged by the two console.log(typeof foo) calls?',
    },
    answer: {
      expectedAnswer: '"function" then "number"',
      deepExplanation:
        'Code:\n\n```js\nconsole.log(typeof foo);\n\nfunction foo() {\n  console.log("1");\n}\n\nvar foo = 9;\n\nconsole.log(typeof foo);\n```\n\n1. Compilation Phase: `function foo() {}` is hoisted first. The `var foo` declaration is ignored during hoisting because identifier `foo` is already bound to the function.\n2. Line 1: `console.log(typeof foo)` evaluates the hoisted function -> prints `"function"`.\n3. The function declaration line is skipped at runtime.\n4. `foo = 9` assigns the primitive number `9` to `foo`.\n5. Line 9: `console.log(typeof foo)` evaluates `typeof 9` -> prints `"number"`.',
      productionExample:
        'Shadowing functions with variable assignments of the same name leads to runtime TypeErrors when attempting to call the function later.',
      bestPractices: [
        'Do not reuse the same identifier for both function declarations and variables in the same scope',
        'Prefer const for function expressions to prevent accidental reassignments'
      ],
      tradeOffs:
        'Function declarations hoist both name and body, whereas var declarations hoist only the name initialized to undefined.',
      commonMistakes: [
        'Expecting typeof foo to be undefined on line 1',
        'Thinking var foo = 9 overwrites function hoisting during creation phase'
      ],
      followUpQuestions: [
        'What happens if you try to call foo() after var foo = 9?'
      ],
      relatedTopics: ['Hoisting', 'Function Declarations', 'var', 'typeof']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-14',
      questionNumber: 'JSTRICKY-014',
      title: 'Variable Shadowing and Hoisting inside Function Scope',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['variable shadowing', 'var hoisting', 'scope chain', 'undefined'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is logged by console.log(name) inside foo()?',
    },
    answer: {
      expectedAnswer: 'undefined',
      deepExplanation:
        'Code:\n\n```js\nvar name = "outer";\n\nfunction foo() {\n  console.log(name);\n  var name = "inner";\n}\nfoo();\n```\n\nInside `foo()`, `var name` is hoisted to the top of `foo`\'s local function scope. This local `name` shadows the outer `var name = "outer"`. At the moment `console.log(name)` runs, local variable `name` exists in memory but has not yet been assigned `"inner"`. Therefore, it logs `undefined`.',
      productionExample:
        'Variable shadowing combined with hoisting creates subtle bugs where outer scope variables are inadvertently hidden by local declarations below usages.',
      bestPractices: [
        'Declare all variables at the top of their scope or use let/const to leverage TDZ compile checks',
        'Avoid reusing outer variable names in inner scopes (shadowing)'
      ],
      tradeOffs:
        'let/const shadow variables safely by throwing ReferenceError if accessed before initialization, rather than returning undefined.',
      commonMistakes: [
        'Expecting "outer" to be logged',
        'Expecting "inner" to be logged'
      ],
      followUpQuestions: [
        'What error would occur if var name = "inner" were changed to let name = "inner"?'
      ],
      relatedTopics: ['Hoisting', 'Shadowing', 'Scope Chain', 'Temporal Dead Zone']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-15',
      questionNumber: 'JSTRICKY-015',
      title: 'Prototype Inheritance, Own Properties, and Property Deletion',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Uber'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['Object.create', 'prototype chain', 'own properties', 'delete operator'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is logged by b.foo initially, after assignment, and after delete b.foo?',
    },
    answer: {
      expectedAnswer: '123, 444, 123',
      deepExplanation:
        'Code:\n\n```js\nconst a = { foo: 123 };\nconst b = Object.create(a);\n\nconsole.log(b.foo);\nb.foo = 444;\nconsole.log(b.foo);\ndelete b.foo;\nconsole.log(b.foo);\n```\n\n1. `Object.create(a)` creates object `b` with prototype set to `a`. `console.log(b.foo)` delegates to `a.foo` -> logs `123`.\n2. `b.foo = 444` creates an *own property* `foo` directly on `b`, masking `a.foo` -> logs `444`.\n3. `delete b.foo` deletes the own property `foo` from `b`. It does **not** delete `a.foo` from prototype `a`.\n4. Subsequent lookup `b.foo` delegates back up the prototype chain to `a.foo` -> logs `123`.',
      productionExample:
        'Understanding prototype property lookup vs own property assignment prevents unexpected fallback state bugs when mutating inherited objects.',
      bestPractices: [
        'Use Object.hasOwn(obj, prop) to distinguish own properties from prototype properties',
        'Avoid relying on property deletion to expose fallback prototype values'
      ],
      tradeOffs:
        'Prototype inheritance enables cheap memory sharing of methods/defaults, but property assignments always write to the receiver instance (own property).',
      commonMistakes: [
        'Expecting delete b.foo to delete a.foo as well',
        'Thinking b.foo = 444 mutates object a'
      ],
      followUpQuestions: [
        'How would delete a.foo affect b.foo after delete b.foo has been run?'
      ],
      relatedTopics: ['Object.create', 'Prototype Chain', 'delete Operator', 'Own Properties']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-16',
      questionNumber: 'JSTRICKY-016',
      title: 'Implicit Method Binding with arguments Object',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Atlassian'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['arguments object', 'implicit binding', 'this keyword', 'function length'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'What is logged by this.length when callback is invoked via arguments[0]()?',
    },
    answer: {
      expectedAnswer: '3',
      deepExplanation:
        'Code:\n\n```js\nvar length = 4;\nfunction callback() {\n  console.log(this.length);\n}\nconst object = {\n  length: 5,\n  method() {\n    arguments[0]();\n  }\n};\nobject.method(callback, 1, 2);\n```\n\nWhen `object.method(callback, 1, 2)` is called, the `arguments` array-like object contains `[callback, 1, 2]` with `arguments.length = 3`.\nInvoking `arguments[0]()` uses array index syntax `obj[key]()`, which calls `callback` with `this` bound to the `arguments` object.\nTherefore, `this.length` inside `callback` evaluates to `arguments.length`, which is `3`.',
      productionExample:
        'Indirect function invocations via array/object indexing dynamically rebind `this`, leading to unexpected execution context changes.',
      bestPractices: [
        'Avoid accessing or invoking functions through the legacy arguments object',
        'Use rest parameters (...args) and explicit arrow functions or .bind() to preserve this binding'
      ],
      tradeOffs:
        'Method invocation syntax (`obj.fn()` or `obj[0]()`) implicitly sets `this` to the target container object.',
      commonMistakes: [
        'Expecting this.length to output global length (4)',
        'Expecting this.length to output object.length (5)'
      ],
      followUpQuestions: [
        'What would be logged if method used rest parameters method(...args) and called args[0]()?'
      ],
      relatedTopics: ['this Keyword', 'arguments Object', 'Implicit Binding', 'Function Invocations']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-17',
      questionNumber: 'JSTRICKY-017',
      title: 'Unbound Function Invocations and Global Scope Binding',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['this keyword', 'global object', 'default binding', 'window.length'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is logged by this.length when callback is invoked as a standalone function?',
    },
    answer: {
      expectedAnswer: '4',
      deepExplanation:
        'Code:\n\n```js\nvar length = 4;\nfunction callback() {\n  console.log(this.length);\n}\nconst object = {\n  length: 5,\n  method(callback) {\n    callback();\n  }\n};\nobject.method(callback, 1, 2);\n```\n\nInside `method(callback)`, `callback()` is invoked as a plain, standalone function call without dot or bracket notation. In non-strict mode, standalone function calls fall back to default binding, setting `this` to the global object (`window` / global context). `var length = 4` at global scope attaches `length: 4` to global object, so `this.length` prints `4`.',
      productionExample:
        'Passing object methods as un-bound callbacks to higher-order functions causes lost `this` context bugs.',
      bestPractices: [
        'Use arrow functions or .bind(this) when passing callbacks',
        'Use strict mode where standalone function calls set `this` to undefined rather than global object'
      ],
      tradeOffs:
        'Standalone function invocation drops caller context and falls back to global window object in non-strict mode.',
      commonMistakes: [
        'Assuming callback() retains object.length (5)',
        'Forgetting that var at top level creates properties on the global object in non-module scripts'
      ],
      followUpQuestions: [
        'What would callback() log in strict mode?'
      ],
      relatedTopics: ['this Keyword', 'Default Binding', 'Global Object', 'Callback Execution']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-18',
      questionNumber: 'JSTRICKY-018',
      title: 'Overwriting Duplicate Function Declarations in Same Scope',
      difficulty: 'Medium',
      companies: ['Google', 'Amazon', 'Microsoft'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['function hoisting', 'duplicate declarations', 'execution context creation phase'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What will function x() log when called?',
    },
    answer: {
      expectedAnswer: 'n, n, n',
      deepExplanation:
        'Code:\n\n```js\nfunction x() {\n    a()\n    function a() {console.log(\'m\')}\n    a()\n    function a() {console.log(\'n\')}\n    a()\n}\nx();\n```\n\nDuring the creation/compilation phase of `x()`, function declarations are hoisted to the top of `x`\'s scope. When multiple function declarations share the same identifier `a`, subsequent declarations overwrite prior ones in memory. Thus, `function a() { console.log(\'n\'); }` completely replaces the first `a`. During execution phase, all three invocations `a()` execute the final hoisted implementation, logging `n` three times.',
      productionExample:
        'Duplicate function declarations in large single-file scripts or legacy codebases overwrite earlier function implementations silently.',
      bestPractices: [
        'Never declare multiple functions with the same name in the same scope',
        'Use linters (ESLint no-func-assign / no-redeclare) or TypeScript to catch duplicate function signatures'
      ],
      tradeOffs:
        'Function declarations hoist completely before code execution, with the last declaration winning in collision cases.',
      commonMistakes: [
        'Expecting m, m, n or m, n, n output sequence',
        'Assuming function declarations execute sequentially in place'
      ],
      followUpQuestions: [
        'How would converting function a to var a = () => ... change the output sequence?'
      ],
      relatedTopics: ['Hoisting', 'Function Declarations', 'Scope', 'Compilation Phase']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-19',
      questionNumber: 'JSTRICKY-019',
      title: 'Async Function Execution Flow and Await Pause Semantics',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['async await', 'synchronous execution', 'Promise pause/resume', 'event loop'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'In what order are 1, 2, 3, and 4 logged in this async function snippet?',
    },
    answer: {
      expectedAnswer: '1, 3, 2, 4 (with a 1000ms delay before 4)',
      deepExplanation:
        'Code:\n\n```js\nasync function data(){\n    console.log("3")\n    await new Promise((res,rej)=>setTimeout(res,1000))\n    console.log("4")\n}\nconsole.log("1")\ndata()\nconsole.log("2")\n```\n\n1. Synchronous line `console.log("1")` runs -> logs `1`.\n2. `data()` is called synchronously: execution enters `data()` and runs `console.log("3")` -> logs `3`.\n3. `await new Promise(...)` starts a 1000ms timer. `await` pauses execution of `data()` and returns a pending Promise to the caller.\n4. Control returns to caller: synchronous line `console.log("2")` runs -> logs `2`.\n5. After 1000ms, the timer resolves the promise, queuing `data()` resumption in the microtask queue -> logs `4`.',
      productionExample:
        'Understanding that code inside an async function executes synchronously until the first `await` is key to preventing race conditions during component initialization.',
      bestPractices: [
        'Remember that async functions begin executing synchronously when invoked',
        'Always handle potential promise rejections after await expressions using try/catch'
      ],
      tradeOffs:
        'async/await provides readable sequential code while preserving non-blocking asynchronous event loop concurrency.',
      commonMistakes: [
        'Believing the entire async function runs asynchronously after the outer call stack',
        'Thinking 2 is logged before 3'
      ],
      followUpQuestions: [
        'When does an async function return its implicit Promise object to the caller?'
      ],
      relatedTopics: ['Async Await', 'Promises', 'Event Loop', 'Non-blocking I/O']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-20',
      questionNumber: 'JSTRICKY-020',
      title: 'Interleaved Promise Microtasks and Nested setTimeout Macrotasks',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix', 'Uber'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['event loop', 'microtasks', 'macrotasks', 'Promise.resolve', 'setTimeout'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'What is the output of this combined Promise and setTimeout script?',
    },
    answer: {
      expectedAnswer: 'Try programiz.pro, 1, 2, 5, 3, 4',
      deepExplanation:
        'Code:\n\n```js\nconsole.log("Try programiz.pro");\nconsole.log("1")\n\nsetTimeout(()=>{\n    console.log("3")\n})\n\nPromise.resolve("4").then((data)=> setTimeout(()=>{\n  console.log(\'4\') \n}))\nPromise.resolve("5").then((data)=>console.log(data))\n\nconsole.log("2")\n```\n\n1. Synchronous phase: logs `Try programiz.pro`, `1`, `2`.\n   - `setTimeout(log 3)` enqueues Macrotask 1.\n   - `Promise.resolve("4").then(...)` enqueues Microtask 1.\n   - `Promise.resolve("5").then(...)` enqueues Microtask 2.\n2. Microtask phase:\n   - Microtask 1 executes `setTimeout(log 4)` -> enqueues Macrotask 2.\n   - Microtask 2 executes `console.log("5")` -> logs `5`.\n3. Macrotask phase:\n   - Macrotask 1 executes `console.log("3")` -> logs `3`.\n   - Macrotask 2 executes `console.log("4")` -> logs `4`.',
      productionExample:
        'Analyzing complex microtask/macrotask interleaving is essential for debugging asynchronous UI state batching and animation frame scheduling.',
      bestPractices: [
        'Keep asynchronous side-effects predictable by avoiding deeply nested task scheduling',
        'Prefer async/await over raw mixed promise/timer chains'
      ],
      tradeOffs:
        'Microtasks run to completion immediately after synchronous execution, whereas macrotasks yield back to the event loop between tasks.',
      commonMistakes: [
        'Thinking Macrotask 2 (log 4) runs before Macrotask 1 (log 3)',
        'Misordering microtask queue draining with macrotask processing'
      ],
      followUpQuestions: [
        'Why does Macrotask 1 (log 3) execute before Macrotask 2 (log 4)?'
      ],
      relatedTopics: ['Event Loop', 'Microtasks', 'Macrotasks', 'Task Scheduling']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-21',
      questionNumber: 'JSTRICKY-021',
      title: 'Promise.all Rejection Handling and .catch Return Value',
      difficulty: 'Hard',
      companies: ['Google', 'Meta', 'Amazon', 'Stripe'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['Promise.all', 'Promise.reject', 'catch handler', 'async return values'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'What is logged by console.log(data) when getData() resolves?',
    },
    answer: {
      expectedAnswer: '232 then [[2, 4], undefined]',
      deepExplanation:
        'Code:\n\n```js\nlet prom1=Promise.resolve(2)\nlet prom2=Promise.resolve(4)\nlet prom3=Promise.reject("232");\nlet prom4=Promise.resolve(\'5\')\n\nasync function getData(){\n    let data1,data2\n    data1= await Promise.all([prom1,prom2])\n    data2= await Promise.all([prom3,prom3]).catch(ex=>{\n        console.log(ex)\n    })\n    return [data1,data2]\n}\n\n(async ()=>{\n  let data=await getData()\n  console.log(data)\n})()\n```\n\n1. `Promise.all([prom1, prom2])` resolves to `[2, 4]`. So `data1 = [2, 4]`.\n2. `Promise.all([prom3, prom3])` rejects immediately with `"232"`.\n3. The `.catch(ex => { console.log(ex) })` handler catches the rejection, logs `"232"`, and returns `undefined` (because there is no explicit return in the catch callback).\n4. `data2` becomes `undefined`.\n5. `getData()` returns `[[2, 4], undefined]`, which is logged by the outer IIFE.',
      productionExample:
        'Catching inner promise rejections inline transforms rejection states into resolved fallback values (like undefined), allowing Promise.all workflows to complete safely.',
      bestPractices: [
        'Return explicit fallback data from .catch() handlers if you want a default object instead of undefined',
        'Use Promise.allSettled when you want full inspection of all resolved and rejected items without early failure'
      ],
      tradeOffs:
        'Promise.all short-circuits on the first rejection, whereas attaching an inline .catch recovers from rejection and produces a resolved Promise.',
      commonMistakes: [
        'Expecting Promise.all([prom3, prom3]) to unhandled-reject the entire getData() function',
        'Forgetting that a .catch callback without a return statement resolves to undefined'
      ],
      followUpQuestions: [
        'How does Promise.allSettled differ from Promise.all in handling rejected promises?'
      ],
      relatedTopics: ['Promise.all', 'Promise.reject', 'Error Handling', 'Catch Handlers']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-22',
      questionNumber: 'JSTRICKY-022',
      title: 'Constructor Functions Invoked Without new Operator',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
      frequency: 5,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['constructor functions', 'new operator', 'this binding', 'undefined return'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What are the logged values of lydia and sarah?',
    },
    answer: {
      expectedAnswer: 'Person {firstName: "Lydia", lastName: "Hallie"} and undefined',
      deepExplanation:
        'Code:\n\n```js\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst lydia = new Person(\'Lydia\', \'Hallie\');\nconst sarah = Person(\'Sarah\', \'Smith\');\n\nconsole.log(lydia);\nconsole.log(sarah);\n```\n\n- `new Person(\'Lydia\', \'Hallie\')` invokes `Person` as a constructor: a new instance object is created, `this` is bound to it, and it is returned implicitly. `lydia` is `Person {firstName: "Lydia", lastName: "Hallie"}`.\n- `Person(\'Sarah\', \'Smith\')` is called as a regular function without `new`. In non-strict mode, `this` points to the global object (`window`). It attaches properties `firstName` and `lastName` to global scope, and returns `undefined` (since there is no explicit return). `sarah` is `undefined`.',
      productionExample:
        'ES6 `class` syntax was introduced partly to prevent this exact bug: calling a `class` constructor without `new` throws a TypeError immediately.',
      bestPractices: [
        'Use ES6 class syntax instead of ES5 constructor functions to enforce `new` instantiation',
        'Or use `new.target` inside constructor functions to check for `new` invocation'
      ],
      tradeOffs:
        'Constructor functions called without `new` silently fail to instantiate objects and pollute global scope in non-strict mode.',
      commonMistakes: [
        'Expecting sarah to return a Person instance',
        'Expecting an error when calling Person without new in non-strict mode'
      ],
      followUpQuestions: [
        'What error happens if you invoke an ES6 class constructor without the new keyword?'
      ],
      relatedTopics: ['Constructor Functions', 'new Operator', 'ES6 Classes', 'new.target']
    }
  },
  {
    detail: {
      id: 'jsout-tricky-23',
      questionNumber: 'JSTRICKY-023',
      title: 'Generator Iteration and yield vs return Values',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
      frequency: 4,
      category: 'javascript',
      part: 'JS Output',
      concepts: ['generators', 'yield', 'next()', 'iterator protocol'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What are the outputs of three sequential generator.next() calls?',
    },
    answer: {
      expectedAnswer: '{ value: 1, done: false }, { value: 2, done: false }, { value: 3, done: true }',
      deepExplanation:
        'Code:\n\n```js\nfunction* generatorFunction() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\nconst generator = generatorFunction();\n\nconsole.log(generator.next());\nconsole.log(generator.next());\nconsole.log(generator.next());\n```\n\n1. First `generator.next()`: pauses at `yield 1` -> returns `{ value: 1, done: false }`.\n2. Second `generator.next()`: pauses at `yield 2` -> returns `{ value: 2, done: false }`.\n3. Third `generator.next()`: reaches `return 3` -> returns `{ value: 3, done: true }`.\n\n*(Note: standard for...of loops iterate over yielded values and ignore the returned value when done is true!)*',
      productionExample:
        'Generators power async sagas (Redux Saga), custom iterators, and streaming pipelines where execution state is lazily paused and resumed.',
      bestPractices: [
        'Use yield for emitting iteration values, reserving return for generator termination',
        'Remember that for...of loops ignore return values from generators'
      ],
      tradeOffs:
        'Generators provide custom lazy iteration control, but returning values from a generator behaves differently in manual next() calls versus for...of iteration.',
      commonMistakes: [
        'Expecting return 3 to produce { value: 3, done: false }',
        'Believing for...of loops include the return value of a generator'
      ],
      followUpQuestions: [
        'What would a fourth generator.next() call return after return 3?'
      ],
      relatedTopics: ['Generators', 'yield', 'Iterator Protocol', 'Redux Saga']
    }
  }
];
