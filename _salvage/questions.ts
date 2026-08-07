export interface Question {
  id: number;
  topic: string;
  subTopic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Coding';
  title: string;
  description: string;
  time: number;
}

export const QUESTIONS_DATA: Question[] = [
  {
    "id": 5001,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "What is JavaScript?",
    "description": "Interview questions and core concepts related to What is JavaScript? under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 6,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Data Types",
    "description": "Primitives are copied by value, objects by reference.",
    "time": 12
  },
  {
    "id": 1,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "var vs let vs const",
    "description": "Understand variable declarations and their scoping rules in JavaScript.",
    "time": 14
  },
  {
    "id": 5002,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "undefined vs null",
    "description": "Interview questions and core concepts related to undefined vs null under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5003,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "NaN",
    "description": "Interview questions and core concepts related to NaN under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5004,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "typeof",
    "description": "Interview questions and core concepts related to typeof under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5005,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Truthy vs Falsy",
    "description": "Interview questions and core concepts related to Truthy vs Falsy under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Scope",
    "description": "Explains lexical, block, and function scope.",
    "time": 15
  },
  {
    "id": 2,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Hoisting",
    "description": "JS moves declarations to the top of their scope before execution.",
    "time": 19
  },
  {
    "id": 4,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Closures",
    "description": "A closure gives access to an outer function's scope from an inner function.",
    "time": 20
  },
  {
    "id": 12,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Arrow Functions",
    "description": "Shorter syntax for functions and no own `this` binding.",
    "time": 17
  },
  {
    "id": 5006,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Function Declaration vs Expression",
    "description": "Interview questions and core concepts related to Function Declaration vs Expression under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 11,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Destructuring",
    "description": "Extract values from arrays or properties from objects into variables.",
    "time": 16
  },
  {
    "id": 5007,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Spread Operator",
    "description": "Interview questions and core concepts related to Spread Operator under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 10,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Rest Operator",
    "description": "Spread expands iterables; rest collects arguments into an array.",
    "time": 14
  },
  {
    "id": 5008,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Optional Chaining",
    "description": "Interview questions and core concepts related to Optional Chaining under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5009,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Higher Order Functions",
    "description": "Interview questions and core concepts related to Higher Order Functions under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 5010,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Callback Functions",
    "description": "Interview questions and core concepts related to Callback Functions under JavaScript (Easy).",
    "time": 15
  },
  {
    "id": 14,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "Promises",
    "description": "Objects representing eventual completion or failure of async operations.",
    "time": 25
  },
  {
    "id": 15,
    "topic": "JavaScript",
    "difficulty": "Easy",
    "title": "async/await",
    "description": "Syntactic sugar over Promises for cleaner async code.",
    "time": 20
  },
  {
    "id": 5011,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Execution Context",
    "description": "Interview questions and core concepts related to Execution Context under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5012,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Call Stack",
    "description": "Interview questions and core concepts related to Call Stack under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5013,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Scope Chain",
    "description": "Interview questions and core concepts related to Scope Chain under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5014,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Lexical Environment",
    "description": "Interview questions and core concepts related to Lexical Environment under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 21,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Event Loop",
    "description": "How JS handles async code using call stack, callback queue, and microtask queue.",
    "time": 30
  },
  {
    "id": 5015,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Callback Queue",
    "description": "Interview questions and core concepts related to Callback Queue under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5016,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Microtask Queue",
    "description": "Interview questions and core concepts related to Microtask Queue under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 22,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Macrotask Queue",
    "description": "Microtasks (Promises) run before macrotasks (setTimeout) in each event loop tick.",
    "time": 25
  },
  {
    "id": 29,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "call()",
    "description": "Methods to control the `this` context of a function.",
    "time": 24
  },
  {
    "id": 5017,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "apply()",
    "description": "Interview questions and core concepts related to apply() under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5018,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "bind()",
    "description": "Interview questions and core concepts related to bind() under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5019,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "this keyword",
    "description": "Interview questions and core concepts related to this keyword under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 28,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Prototype",
    "description": "Objects inherit properties through the prototype chain.",
    "time": 30
  },
  {
    "id": 5020,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Prototype Chain",
    "description": "Interview questions and core concepts related to Prototype Chain under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5021,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Constructor Functions",
    "description": "Interview questions and core concepts related to Constructor Functions under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5022,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "ES6 Classes",
    "description": "Interview questions and core concepts related to ES6 Classes under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5023,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Inheritance",
    "description": "Interview questions and core concepts related to Inheritance under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5024,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Encapsulation",
    "description": "Interview questions and core concepts related to Encapsulation under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5025,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Polymorphism",
    "description": "Interview questions and core concepts related to Polymorphism under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 5026,
    "topic": "JavaScript",
    "difficulty": "Medium",
    "title": "Error Handling",
    "description": "Interview questions and core concepts related to Error Handling under JavaScript (Medium).",
    "time": 15
  },
  {
    "id": 41,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "V8 Engine",
    "description": "How V8 parses, compiles, and optimizes JavaScript code.",
    "time": 45
  },
  {
    "id": 42,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Garbage Collection",
    "description": "Mark-and-sweep, generational GC, and memory management.",
    "time": 40
  },
  {
    "id": 5027,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Mark & Sweep",
    "description": "Interview questions and core concepts related to Mark & Sweep under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 43,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Hidden Classes",
    "description": "V8 optimizes object property access using hidden class transitions.",
    "time": 35
  },
  {
    "id": 5028,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "JIT Compilation",
    "description": "Interview questions and core concepts related to JIT Compilation under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5029,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Browser Rendering Pipeline",
    "description": "Interview questions and core concepts related to Browser Rendering Pipeline under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5030,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Reflow vs Repaint",
    "description": "Interview questions and core concepts related to Reflow vs Repaint under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5031,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Memory Leaks",
    "description": "Interview questions and core concepts related to Memory Leaks under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5032,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "SharedArrayBuffer",
    "description": "Interview questions and core concepts related to SharedArrayBuffer under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5033,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Atomics",
    "description": "Interview questions and core concepts related to Atomics under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5034,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Concurrent JavaScript",
    "description": "Interview questions and core concepts related to Concurrent JavaScript under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 54,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Reactive Programming",
    "description": "Observables, operators, and streams in reactive paradigm.",
    "time": 45
  },
  {
    "id": 5035,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "RxJS",
    "description": "Interview questions and core concepts related to RxJS under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 5036,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Scheduler Design",
    "description": "Interview questions and core concepts related to Scheduler Design under JavaScript (Hard).",
    "time": 15
  },
  {
    "id": 49,
    "topic": "JavaScript",
    "difficulty": "Hard",
    "title": "Runtime Optimization",
    "description": "JIT compilation, inline caching, and hidden class optimization.",
    "time": 50
  },
  {
    "id": 71,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "What is TypeScript?",
    "description": "TypeScript is a typed superset of JavaScript that compiles to plain JS.",
    "time": 12
  },
  {
    "id": 5037,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "JS vs TS",
    "description": "Interview questions and core concepts related to JS vs TS under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 78,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Type Inference",
    "description": "TypeScript automatically infers types when not explicitly annotated.",
    "time": 12
  },
  {
    "id": 5038,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "string",
    "description": "Interview questions and core concepts related to string under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 5039,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "number",
    "description": "Interview questions and core concepts related to number under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 5040,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "boolean",
    "description": "Interview questions and core concepts related to boolean under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 73,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "any",
    "description": "any disables type checking, unknown requires narrowing, never is unreachable.",
    "time": 18
  },
  {
    "id": 5041,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "unknown",
    "description": "Interview questions and core concepts related to unknown under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 5042,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "never",
    "description": "Interview questions and core concepts related to never under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 5043,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "void",
    "description": "Interview questions and core concepts related to void under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 72,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Interface",
    "description": "Both define shapes; interfaces are extendable, types more flexible.",
    "time": 15
  },
  {
    "id": 5044,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Type Alias",
    "description": "Interview questions and core concepts related to Type Alias under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 74,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Union Types",
    "description": "A type that can be one of several types: string | number.",
    "time": 12
  },
  {
    "id": 5045,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Intersection Types",
    "description": "Interview questions and core concepts related to Intersection Types under TypeScript (Easy).",
    "time": 15
  },
  {
    "id": 81,
    "topic": "TypeScript",
    "difficulty": "Easy",
    "title": "Generics Basics",
    "description": "Write reusable code that works with any type.",
    "time": 28
  },
  {
    "id": 82,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "keyof",
    "description": "Get all keys of a type as a union.",
    "time": 20
  },
  {
    "id": 86,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Type Guards",
    "description": "Runtime checks that narrow types in TypeScript.",
    "time": 22
  },
  {
    "id": 5046,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Type Narrowing",
    "description": "Interview questions and core concepts related to Type Narrowing under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 5047,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Generic Constraints",
    "description": "Interview questions and core concepts related to Generic Constraints under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 83,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Utility Types",
    "description": "Built-in types: Partial, Required, Readonly, Record, etc.",
    "time": 25
  },
  {
    "id": 106,
    "topic": "TypeScript",
    "difficulty": "Coding",
    "title": "Implement Partial<T>",
    "description": "Make all properties optional.",
    "time": 20
  },
  {
    "id": 5048,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Required",
    "description": "Interview questions and core concepts related to Required under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 92,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Readonly",
    "description": "Make all nested properties readonly recursively.",
    "time": 28
  },
  {
    "id": 108,
    "topic": "TypeScript",
    "difficulty": "Coding",
    "title": "Implement Pick<T, K>",
    "description": "Select specified keys from a type.",
    "time": 20
  },
  {
    "id": 107,
    "topic": "TypeScript",
    "difficulty": "Coding",
    "title": "Implement Omit<T, K>",
    "description": "Remove specified keys from a type.",
    "time": 22
  },
  {
    "id": 5049,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Record",
    "description": "Interview questions and core concepts related to Record under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 5050,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Exclude",
    "description": "Interview questions and core concepts related to Exclude under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 5051,
    "topic": "TypeScript",
    "difficulty": "Medium",
    "title": "Extract",
    "description": "Interview questions and core concepts related to Extract under TypeScript (Medium).",
    "time": 15
  },
  {
    "id": 5052,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Conditional Types",
    "description": "Interview questions and core concepts related to Conditional Types under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 109,
    "topic": "TypeScript",
    "difficulty": "Coding",
    "title": "Implement ReturnType<T>",
    "description": "Extract the return type of a function type.",
    "time": 25
  },
  {
    "id": 5053,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Recursive Types",
    "description": "Interview questions and core concepts related to Recursive Types under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 99,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Recursive Mapped Types",
    "description": "Apply transformations recursively through type structures.",
    "time": 45
  },
  {
    "id": 5054,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Variadic Tuple Types",
    "description": "Interview questions and core concepts related to Variadic Tuple Types under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 104,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Branded Types",
    "description": "Nominal typing in TypeScript using brands.",
    "time": 40
  },
  {
    "id": 5055,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Declaration Files",
    "description": "Interview questions and core concepts related to Declaration Files under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 5056,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Module Augmentation",
    "description": "Interview questions and core concepts related to Module Augmentation under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 110,
    "topic": "TypeScript",
    "difficulty": "Coding",
    "title": "DeepReadonly Implementation",
    "description": "Recursively make all properties readonly.",
    "time": 28
  },
  {
    "id": 5057,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "DeepPartial",
    "description": "Interview questions and core concepts related to DeepPartial under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 5058,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Decorators",
    "description": "Interview questions and core concepts related to Decorators under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 5059,
    "topic": "TypeScript",
    "difficulty": "Hard",
    "title": "Type-safe Architecture",
    "description": "Interview questions and core concepts related to Type-safe Architecture under TypeScript (Hard).",
    "time": 15
  },
  {
    "id": 116,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "What is React?",
    "description": "A JavaScript library for building user interfaces.",
    "time": 12
  },
  {
    "id": 120,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Virtual DOM",
    "description": "An in-memory representation of the real DOM for efficient updates.",
    "time": 18
  },
  {
    "id": 117,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "JSX",
    "description": "JavaScript XML syntax extension for writing React elements.",
    "time": 12
  },
  {
    "id": 118,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Components",
    "description": "Reusable UI building blocks (functional and class-based).",
    "time": 15
  },
  {
    "id": 119,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Props",
    "description": "Props are external inputs; state is internal mutable data.",
    "time": 15
  },
  {
    "id": 121,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "State",
    "description": "Manage local component state in functional components.",
    "time": 15
  },
  {
    "id": 5060,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Props vs State",
    "description": "Interview questions and core concepts related to Props vs State under React.js (Easy).",
    "time": 15
  },
  {
    "id": 5061,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "useState",
    "description": "Interview questions and core concepts related to useState under React.js (Easy).",
    "time": 15
  },
  {
    "id": 122,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "useEffect",
    "description": "Handle side effects like data fetching and subscriptions.",
    "time": 20
  },
  {
    "id": 125,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Event Handling",
    "description": "Synthetic events and handling user interactions.",
    "time": 14
  },
  {
    "id": 128,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Forms",
    "description": "Handling form submissions and input validation.",
    "time": 20
  },
  {
    "id": 127,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "Controlled Components",
    "description": "Form elements driven by state vs native DOM state.",
    "time": 18
  },
  {
    "id": 5062,
    "topic": "React.js",
    "difficulty": "Easy",
    "title": "React Router",
    "description": "Interview questions and core concepts related to React Router under React.js (Easy).",
    "time": 15
  },
  {
    "id": 134,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "useMemo",
    "description": "Memoize values vs functions for performance optimization.",
    "time": 25
  },
  {
    "id": 5063,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "useCallback",
    "description": "Interview questions and core concepts related to useCallback under React.js (Medium).",
    "time": 15
  },
  {
    "id": 123,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "useRef",
    "description": "Access DOM elements or persist values without re-renders.",
    "time": 15
  },
  {
    "id": 140,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Custom Hooks",
    "description": "Extract reusable stateful logic into custom hook functions.",
    "time": 28
  },
  {
    "id": 133,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "React.memo",
    "description": "Memoize functional components to prevent unnecessary re-renders.",
    "time": 22
  },
  {
    "id": 136,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Lazy Loading",
    "description": "Split code at component level and load on demand.",
    "time": 22
  },
  {
    "id": 135,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Suspense",
    "description": "Declaratively wait for async data with fallback UI.",
    "time": 28
  },
  {
    "id": 176,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Redux",
    "description": "Single source of truth, state is read-only, pure reducers.",
    "time": 15
  },
  {
    "id": 179,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Redux Toolkit",
    "description": "Official opinionated toolset for efficient Redux development.",
    "time": 20
  },
  {
    "id": 190,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "RTK Query",
    "description": "Powerful data fetching and caching solution.",
    "time": 35
  },
  {
    "id": 5064,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "React Query",
    "description": "Interview questions and core concepts related to React Query under React.js (Medium).",
    "time": 15
  },
  {
    "id": 131,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Reconciliation",
    "description": "How React efficiently updates the DOM using diffing algorithm.",
    "time": 30
  },
  {
    "id": 5065,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "Diffing Algorithm",
    "description": "Interview questions and core concepts related to Diffing Algorithm under React.js (Medium).",
    "time": 15
  },
  {
    "id": 162,
    "topic": "React.js",
    "difficulty": "Medium",
    "title": "useReducer",
    "description": "Build a counter using useReducer hook.",
    "time": 20
  },
  {
    "id": 5066,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Fiber Architecture",
    "description": "Interview questions and core concepts related to Fiber Architecture under React.js (Hard).",
    "time": 15
  },
  {
    "id": 146,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Concurrent Rendering",
    "description": "React 18's concurrent mode and rendering interruption.",
    "time": 50
  },
  {
    "id": 148,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Scheduler",
    "description": "Priority-based task scheduling in React internals.",
    "time": 55
  },
  {
    "id": 147,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "SSR",
    "description": "Attaching React to server-rendered HTML.",
    "time": 45
  },
  {
    "id": 5067,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "CSR",
    "description": "Interview questions and core concepts related to CSR under React.js (Hard).",
    "time": 15
  },
  {
    "id": 5068,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Hydration",
    "description": "Interview questions and core concepts related to Hydration under React.js (Hard).",
    "time": 15
  },
  {
    "id": 5069,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Streaming SSR",
    "description": "Interview questions and core concepts related to Streaming SSR under React.js (Hard).",
    "time": 15
  },
  {
    "id": 152,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Server Components",
    "description": "Zero-bundle server-side components in React.",
    "time": 55
  },
  {
    "id": 5070,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "React Compiler",
    "description": "Interview questions and core concepts related to React Compiler under React.js (Hard).",
    "time": 15
  },
  {
    "id": 150,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "useOptimistic",
    "description": "Mark state updates as non-urgent for smoother UX.",
    "time": 40
  },
  {
    "id": 5071,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Module Federation",
    "description": "Interview questions and core concepts related to Module Federation under React.js (Hard).",
    "time": 15
  },
  {
    "id": 155,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Micro Frontends",
    "description": "Module federation and composing independent React apps.",
    "time": 65
  },
  {
    "id": 5072,
    "topic": "React.js",
    "difficulty": "Hard",
    "title": "Enterprise Architecture",
    "description": "Interview questions and core concepts related to Enterprise Architecture under React.js (Hard).",
    "time": 15
  },
  {
    "id": 216,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "React Native Introduction",
    "description": "Cross-platform mobile app development with React.",
    "time": 15
  },
  {
    "id": 217,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "Components",
    "description": "Core UI primitives in React Native.",
    "time": 14
  },
  {
    "id": 219,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "Flexbox",
    "description": "StyleSheet API, flexbox, and platform-specific styles.",
    "time": 18
  },
  {
    "id": 220,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "Navigation",
    "description": "Stack, tab, and drawer navigation.",
    "time": 20
  },
  {
    "id": 221,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "AsyncStorage",
    "description": "Simple key-value storage for React Native.",
    "time": 15
  },
  {
    "id": 5073,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "Axios",
    "description": "Interview questions and core concepts related to Axios under React Native (Easy).",
    "time": 15
  },
  {
    "id": 218,
    "topic": "React Native",
    "difficulty": "Easy",
    "title": "FlatList",
    "description": "FlatList for large lists; ScrollView for small content.",
    "time": 18
  },
  {
    "id": 234,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Performance Optimization",
    "description": "Avoiding JS thread blockage and improving frame rate.",
    "time": 35
  },
  {
    "id": 233,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Deep Linking",
    "description": "Handle URL schemes and universal links.",
    "time": 28
  },
  {
    "id": 228,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Push Notifications",
    "description": "FCM/APNs integration for push notifications.",
    "time": 35
  },
  {
    "id": 231,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "SQLite",
    "description": "MMKV, SQLite, Realm for offline-first apps.",
    "time": 30
  },
  {
    "id": 5074,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Offline Storage",
    "description": "Interview questions and core concepts related to Offline Storage under React Native (Medium).",
    "time": 15
  },
  {
    "id": 230,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Camera",
    "description": "react-native-camera or expo-camera usage.",
    "time": 28
  },
  {
    "id": 5075,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Image Picker",
    "description": "Interview questions and core concepts related to Image Picker under React Native (Medium).",
    "time": 15
  },
  {
    "id": 5076,
    "topic": "React Native",
    "difficulty": "Medium",
    "title": "Redux Toolkit",
    "description": "Interview questions and core concepts related to Redux Toolkit under React Native (Medium).",
    "time": 15
  },
  {
    "id": 239,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Native Modules",
    "description": "Write native iOS/Android code accessible from JS.",
    "time": 55
  },
  {
    "id": 236,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Bridging",
    "description": "JS ↔ Native communication through the bridge.",
    "time": 55
  },
  {
    "id": 5077,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "JSI",
    "description": "Interview questions and core concepts related to JSI under React Native (Hard).",
    "time": 15
  },
  {
    "id": 238,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Fabric",
    "description": "React Native's reimagined rendering system.",
    "time": 60
  },
  {
    "id": 240,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "TurboModules",
    "description": "Lazy, type-safe, JSI-based native modules.",
    "time": 60
  },
  {
    "id": 237,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Hermes Engine",
    "description": "Lightweight JS engine optimized for React Native.",
    "time": 45
  },
  {
    "id": 5078,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "New Architecture",
    "description": "Interview questions and core concepts related to New Architecture under React Native (Hard).",
    "time": 15
  },
  {
    "id": 5079,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Thread Management",
    "description": "Interview questions and core concepts related to Thread Management under React Native (Hard).",
    "time": 15
  },
  {
    "id": 241,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Offline-first Architecture",
    "description": "Local-first data sync with conflict resolution.",
    "time": 65
  },
  {
    "id": 5080,
    "topic": "React Native",
    "difficulty": "Hard",
    "title": "Mobile Security",
    "description": "Interview questions and core concepts related to Mobile Security under React Native (Hard).",
    "time": 15
  },
  {
    "id": 56,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Reverse a String",
    "description": "Write a function to reverse a string without using .reverse().",
    "time": 10
  },
  {
    "id": 57,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Palindrome Check",
    "description": "Check if a string reads the same forward and backward.",
    "time": 12
  },
  {
    "id": 1001,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Character Count",
    "description": "Write a robust, optimized algorithm for the Character Count problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 4001,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Count Vowels",
    "description": "Write a robust, optimized algorithm for the Count Vowels problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1084,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Remove Duplicates",
    "description": "Write a robust, optimized algorithm for the Remove Duplicates problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1046,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Sum of Array",
    "description": "Write a robust, optimized algorithm for the Sum of Array problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1080,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Find Maximum",
    "description": "Write a robust, optimized algorithm for the Find Maximum problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1081,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Find Minimum",
    "description": "Write a robust, optimized algorithm for the Find Minimum problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1023,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Second Largest",
    "description": "Write a robust, optimized algorithm for the Second Largest problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1017,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Move Zeros",
    "description": "Write a robust, optimized algorithm for the Move Zeros problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1018,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Missing Number",
    "description": "Write a robust, optimized algorithm for the Missing Number problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1083,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Odd Even Count",
    "description": "Write a robust, optimized algorithm for the Odd Even Count problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1033,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Factorial",
    "description": "Write a robust, optimized algorithm for the Factorial problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1032,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Fibonacci",
    "description": "Write a robust, optimized algorithm for the Fibonacci problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1034,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Prime Number",
    "description": "Write a robust, optimized algorithm for the Prime Number problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1036,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Reverse Number",
    "description": "Write a robust, optimized algorithm for the Reverse Number problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1116,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Object Keys",
    "description": "Write a robust, optimized algorithm for the Object Keys problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 4002,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Object Values",
    "description": "Write a robust, optimized algorithm for the Object Values problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1053,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Merge Objects",
    "description": "Write a robust, optimized algorithm for the Merge Objects problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1097,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Nested Property Access",
    "description": "Write a robust, optimized algorithm for the Nested Property Access problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 58,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Two Sum Problem",
    "description": "Find two indices that add up to a target value.",
    "time": 20
  },
  {
    "id": 1015,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Three Sum",
    "description": "Write a robust, optimized algorithm for the Three Sum problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1020,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Rotate Array",
    "description": "Write a robust, optimized algorithm for the Rotate Array problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 59,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Product Except Self",
    "description": "Return an array where each element is the product of all others.",
    "time": 25
  },
  {
    "id": 62,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Group Anagrams",
    "description": "Group strings that are anagrams of each other.",
    "time": 22
  },
  {
    "id": 60,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Longest Substring Without Repeating Characters",
    "description": "Find length of longest substring with no repeating characters.",
    "time": 28
  },
  {
    "id": 61,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Valid Parentheses",
    "description": "Check if bracket sequence is valid using a stack.",
    "time": 18
  },
  {
    "id": 1005,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "String Compression",
    "description": "Write a robust, optimized algorithm for the String Compression problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1079,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Anagram Check",
    "description": "Write a robust, optimized algorithm for the Anagram Check problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 63,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Deep Clone Implementation",
    "description": "Implement a deep clone function handling all edge cases.",
    "time": 25
  },
  {
    "id": 1049,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Deep Compare",
    "description": "Write a robust, optimized algorithm for the Deep Compare problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1050,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Object Flattening",
    "description": "Write a robust, optimized algorithm for the Object Flattening problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 64,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Debounce Implementation",
    "description": "Write a debounce utility function from scratch.",
    "time": 20
  },
  {
    "id": 65,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Throttle Implementation",
    "description": "Write a throttle utility function from scratch.",
    "time": 20
  },
  {
    "id": 1056,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Curry Function",
    "description": "Write a robust, optimized algorithm for the Curry Function problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1057,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Memoization",
    "description": "Write a robust, optimized algorithm for the Memoization problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1059,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Compose Function",
    "description": "Write a robust, optimized algorithm for the Compose Function problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1058,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Pipe Function",
    "description": "Write a robust, optimized algorithm for the Pipe Function problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1060,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Once Function",
    "description": "Write a robust, optimized algorithm for the Once Function problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1100,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Sequential API Calls",
    "description": "Write a robust, optimized algorithm for the Sequential API Calls problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1101,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Parallel API Calls",
    "description": "Write a robust, optimized algorithm for the Parallel API Calls problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1109,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Retry Failed API",
    "description": "Write a robust, optimized algorithm for the Retry Failed API problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 66,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Promise.all Polyfill",
    "description": "Implement Promise.all without using the native method.",
    "time": 30
  },
  {
    "id": 1072,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Promise.race Polyfill",
    "description": "Write a robust, optimized algorithm for the Promise.race Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1073,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Promise.any Polyfill",
    "description": "Write a robust, optimized algorithm for the Promise.any Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1074,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Promise.allSettled Polyfill",
    "description": "Write a robust, optimized algorithm for the Promise.allSettled Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1069,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "call Polyfill",
    "description": "Write a robust, optimized algorithm for the call Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1070,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "apply Polyfill",
    "description": "Write a robust, optimized algorithm for the apply Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1071,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "bind Polyfill",
    "description": "Write a robust, optimized algorithm for the bind Polyfill problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 67,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "EventEmitter Implementation",
    "description": "Build a class with on/off/emit/once methods.",
    "time": 28
  },
  {
    "id": 1103,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Pub/Sub System",
    "description": "Write a robust, optimized algorithm for the Pub/Sub System problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1130,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Observer Pattern",
    "description": "Write a robust, optimized algorithm for the Observer Pattern problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1102,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Async Queue",
    "description": "Write a robust, optimized algorithm for the Async Queue problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1119,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Concurrency Limiter",
    "description": "Write a robust, optimized algorithm for the Concurrency Limiter problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 289,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Retry Utility",
    "description": "Retry async function N times with exponential backoff.",
    "time": 25
  },
  {
    "id": 1105,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "Scheduler",
    "description": "Write a robust, optimized algorithm for the Scheduler problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 1132,
    "topic": "JavaScript",
    "difficulty": "Coding",
    "title": "State Machine",
    "description": "Write a robust, optimized algorithm for the State Machine problem, satisfying all constraints.",
    "time": 20
  },
  {
    "id": 6001,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Medium",
    "title": "Stack Memory vs Heap Memory",
    "description": "How JavaScript engines allocate primitives on the stack and objects on the heap.",
    "time": 16
  },
  {
    "id": 6002,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Medium",
    "title": "Temporal Dead Zone (TDZ)",
    "description": "The state between entering scope and the let/const declaration being initialized.",
    "time": 17
  },
  {
    "id": 6003,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Medium",
    "title": "Execution Context Phases (Creation vs Execution)",
    "description": "The two-pass process the engine runs for every execution context.",
    "time": 16
  },
  {
    "id": 6004,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Easy",
    "title": "Global Execution Context vs Function Execution Context",
    "description": "How the base context differs from the context created on each function call.",
    "time": 13
  },
  {
    "id": 6005,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Medium",
    "title": "Call Stack Overflow & Recursion Limits",
    "description": "Why deep or unbounded recursion crashes with RangeError: Maximum call stack size exceeded.",
    "time": 15
  },
  {
    "id": 6006,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Hard",
    "title": "Generational Garbage Collection (Scavenger Algorithm)",
    "description": "How V8 splits the heap into young and old generations for faster collection.",
    "time": 22
  },
  {
    "id": 6007,
    "topic": "JavaScript",
    "subTopic": "Execution & Memory Model",
    "difficulty": "Hard",
    "title": "WeakRef and FinalizationRegistry",
    "description": "Holding a reference to an object without preventing it from being garbage collected.",
    "time": 21
  },
  {
    "id": 6008,
    "topic": "JavaScript",
    "subTopic": "Scope & Closures",
    "difficulty": "Easy",
    "title": "IIFE (Immediately Invoked Function Expressions)",
    "description": "A function that executes as soon as it is defined, used to create private scope.",
    "time": 13
  },
  {
    "id": 6009,
    "topic": "JavaScript",
    "subTopic": "Scope & Closures",
    "difficulty": "Medium",
    "title": "Module Pattern using Closures",
    "description": "Using an IIFE and closures to expose a controlled public API while hiding internal state.",
    "time": 17
  },
  {
    "id": 6010,
    "topic": "JavaScript",
    "subTopic": "Scope & Closures",
    "difficulty": "Medium",
    "title": "Closures Inside Loops (var vs let Pitfall)",
    "description": "The classic bug where setTimeout callbacks in a var loop all log the same final value.",
    "time": 18
  },
  {
    "id": 6011,
    "topic": "JavaScript",
    "subTopic": "Scope & Closures",
    "difficulty": "Easy",
    "title": "Block Scope vs Function Scope",
    "description": "How {} blocks create scope for let/const but not for var.",
    "time": 12
  },
  {
    "id": 6012,
    "topic": "JavaScript",
    "subTopic": "Scope & Closures",
    "difficulty": "Easy",
    "title": "Named Function Expressions",
    "description": "Why giving a function expression an internal name helps with recursion and stack traces.",
    "time": 13
  },
  {
    "id": 6013,
    "topic": "JavaScript",
    "subTopic": "this, bind, call & apply",
    "difficulty": "Medium",
    "title": "this in Arrow Functions vs Regular Functions",
    "description": "Why arrow functions don't have their own `this` binding.",
    "time": 16
  },
  {
    "id": 6014,
    "topic": "JavaScript",
    "subTopic": "this, bind, call & apply",
    "difficulty": "Medium",
    "title": "Losing this Context (Common Bugs & Fixes)",
    "description": "Why extracting a method from an object and calling it standalone breaks `this`.",
    "time": 16
  },
  {
    "id": 6015,
    "topic": "JavaScript",
    "subTopic": "this, bind, call & apply",
    "difficulty": "Medium",
    "title": "What Really Happens with the new Keyword",
    "description": "The four steps the engine performs when a function is invoked with `new`.",
    "time": 17
  },
  {
    "id": 6016,
    "topic": "JavaScript",
    "subTopic": "this, bind, call & apply",
    "difficulty": "Medium",
    "title": "Partial Application with bind()",
    "description": "Using bind() to pre-fill some arguments of a function ahead of time.",
    "time": 16
  },
  {
    "id": 6017,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Medium",
    "title": "Object.create()",
    "description": "Creating an object with an explicit prototype instead of via a constructor.",
    "time": 16
  },
  {
    "id": 6018,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Medium",
    "title": "Prototypal Inheritance vs Classical Inheritance",
    "description": "How JS's object-to-object delegation model differs from class-based inheritance in languages like Java.",
    "time": 17
  },
  {
    "id": 6019,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Easy",
    "title": "Static Methods and Properties",
    "description": "Members that live on the class itself rather than on instances.",
    "time": 14
  },
  {
    "id": 6020,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Medium",
    "title": "Private Class Fields (#)",
    "description": "True encapsulation in classes using the # syntax, enforced by the engine itself.",
    "time": 17
  },
  {
    "id": 6021,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Easy",
    "title": "Getters and Setters",
    "description": "Defining computed properties that run code on read or write access.",
    "time": 14
  },
  {
    "id": 6022,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Medium",
    "title": "Mixins in JavaScript",
    "description": "Composing reusable behavior into classes without traditional multi-inheritance.",
    "time": 17
  },
  {
    "id": 6023,
    "topic": "JavaScript",
    "subTopic": "Prototypes & OOP",
    "difficulty": "Medium",
    "title": "instanceof Operator Internals",
    "description": "How instanceof actually walks the prototype chain under the hood.",
    "time": 16
  },
  {
    "id": 6024,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Medium",
    "title": "CommonJS vs ES Modules",
    "description": "Comparing Node's original require/module.exports system with the native ESM standard.",
    "time": 17
  },
  {
    "id": 6025,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Easy",
    "title": "Named Exports vs Default Exports",
    "description": "The two export styles ES Modules support and their trade-offs.",
    "time": 13
  },
  {
    "id": 6026,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Medium",
    "title": "Dynamic import()",
    "description": "Loading a module on demand at runtime instead of at the top of the file.",
    "time": 17
  },
  {
    "id": 6027,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Medium",
    "title": "Top-level await",
    "description": "Using await directly in a module body without wrapping it in an async function.",
    "time": 16
  },
  {
    "id": 6028,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Hard",
    "title": "Circular Module Dependencies",
    "description": "What happens when module A imports module B and B imports A.",
    "time": 22
  },
  {
    "id": 6029,
    "topic": "JavaScript",
    "subTopic": "Modules",
    "difficulty": "Hard",
    "title": "Tree Shaking and Module Design",
    "description": "How to structure exports so bundlers can eliminate unused code.",
    "time": 20
  },
  {
    "id": 6030,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Hard",
    "title": "Building a Custom Promise from Scratch",
    "description": "Implementing the core Promise state machine (pending/fulfilled/rejected) manually.",
    "time": 24
  },
  {
    "id": 6031,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "Promise Chaining Pitfalls",
    "description": "Common mistakes that break the guarantees of a .then() chain.",
    "time": 17
  },
  {
    "id": 6032,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Hard",
    "title": "Microtask vs Macrotask Ordering (Advanced Cases)",
    "description": "Predicting console output order across nested promises, setTimeout, and synchronous code.",
    "time": 22
  },
  {
    "id": 6033,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "async/await Error Handling Patterns",
    "description": "The idiomatic ways to catch rejected promises when using await.",
    "time": 17
  },
  {
    "id": 6034,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "Sequential vs Parallel Async Execution",
    "description": "Why awaiting in a loop is slower than firing all requests first with Promise.all.",
    "time": 17
  },
  {
    "id": 6035,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "queueMicrotask()",
    "description": "Scheduling a callback directly on the microtask queue without wrapping it in a Promise.",
    "time": 15
  },
  {
    "id": 6036,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "Promise Internal States Explained",
    "description": "The pending/fulfilled/rejected state machine and why it's one-way and one-shot.",
    "time": 16
  },
  {
    "id": 6037,
    "topic": "JavaScript",
    "subTopic": "Async & Promises",
    "difficulty": "Medium",
    "title": "Unhandled Promise Rejections",
    "description": "What happens when a rejected promise has no .catch() or try/catch attached.",
    "time": 17
  },
  {
    "id": 6038,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Medium",
    "title": "Generators Basics",
    "description": "Functions that can pause and resume execution, yielding multiple values over time.",
    "time": 17
  },
  {
    "id": 6039,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Medium",
    "title": "Iterators and the Iterable Protocol",
    "description": "The two-protocol system (iterable + iterator) that powers for...of and spread syntax.",
    "time": 17
  },
  {
    "id": 6040,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Medium",
    "title": "Symbol.iterator",
    "description": "The well-known symbol that marks an object's default iteration behavior.",
    "time": 16
  },
  {
    "id": 6041,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Hard",
    "title": "yield* Delegation",
    "description": "Delegating part of a generator's work to another iterable or generator.",
    "time": 20
  },
  {
    "id": 6042,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Hard",
    "title": "Async Generators and for await...of",
    "description": "Generators that yield Promises, consumed with the for await...of loop.",
    "time": 20
  },
  {
    "id": 6043,
    "topic": "JavaScript",
    "subTopic": "Generators & Iterators",
    "difficulty": "Medium",
    "title": "Building Infinite Sequences with Generators",
    "description": "Lazily generating unbounded sequences (e.g. Fibonacci) without blowing up memory.",
    "time": 18
  },
  {
    "id": 6044,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Medium",
    "title": "Currying (Concept & Use Cases)",
    "description": "Transforming a multi-argument function into a chain of single-argument functions.",
    "time": 17
  },
  {
    "id": 6045,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Medium",
    "title": "Partial Application vs Currying",
    "description": "Distinguishing fixing some arguments at once from transforming into unary chained calls.",
    "time": 16
  },
  {
    "id": 6046,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Medium",
    "title": "Function Composition (compose & pipe)",
    "description": "Combining small single-purpose functions into a single pipeline.",
    "time": 16
  },
  {
    "id": 6047,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Easy",
    "title": "Pure Functions and Side Effects",
    "description": "Functions whose output depends only on their input and cause no observable changes elsewhere.",
    "time": 14
  },
  {
    "id": 6048,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Medium",
    "title": "Immutability Patterns in JavaScript",
    "description": "Techniques for updating state without mutating the original data structure.",
    "time": 17
  },
  {
    "id": 6049,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Medium",
    "title": "Memoization (Concept & Trade-offs)",
    "description": "Caching a function's results by its arguments to avoid recomputation.",
    "time": 17
  },
  {
    "id": 6050,
    "topic": "JavaScript",
    "subTopic": "Functional Programming",
    "difficulty": "Hard",
    "title": "Point-Free Style Programming",
    "description": "Writing functions that never explicitly mention their arguments.",
    "time": 20
  },
  {
    "id": 6051,
    "topic": "JavaScript",
    "subTopic": "Performance Patterns",
    "difficulty": "Easy",
    "title": "Debouncing (Concept)",
    "description": "Delaying execution until a burst of calls has stopped for a set period.",
    "time": 15
  },
  {
    "id": 6052,
    "topic": "JavaScript",
    "subTopic": "Performance Patterns",
    "difficulty": "Easy",
    "title": "Throttling (Concept)",
    "description": "Guaranteeing a function runs at most once per fixed time interval.",
    "time": 15
  },
  {
    "id": 6053,
    "topic": "JavaScript",
    "subTopic": "Performance Patterns",
    "difficulty": "Medium",
    "title": "Debounce vs Throttle: When to Use Which",
    "description": "Choosing the right rate-limiting strategy for a given UI interaction.",
    "time": 16
  },
  {
    "id": 6054,
    "topic": "JavaScript",
    "subTopic": "Performance Patterns",
    "difficulty": "Medium",
    "title": "requestAnimationFrame-based Throttling",
    "description": "Syncing high-frequency event handling to the browser's paint cycle instead of a fixed timer.",
    "time": 17
  },
  {
    "id": 6055,
    "topic": "JavaScript",
    "subTopic": "Event Handling",
    "difficulty": "Medium",
    "title": "Event Delegation",
    "description": "Attaching a single listener to a parent element to handle events from many children.",
    "time": 17
  },
  {
    "id": 6056,
    "topic": "JavaScript",
    "subTopic": "Event Handling",
    "difficulty": "Medium",
    "title": "Event Bubbling vs Capturing",
    "description": "The two phases a DOM event travels through: down to the target, then back up.",
    "time": 16
  },
  {
    "id": 6057,
    "topic": "JavaScript",
    "subTopic": "Event Handling",
    "difficulty": "Easy",
    "title": "stopPropagation vs preventDefault",
    "description": "Two distinct event methods that are frequently confused.",
    "time": 14
  },
  {
    "id": 6058,
    "topic": "JavaScript",
    "subTopic": "Event Handling",
    "difficulty": "Medium",
    "title": "Custom Events (CustomEvent API)",
    "description": "Dispatching your own application-specific events on DOM elements.",
    "time": 16
  },
  {
    "id": 6059,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Medium",
    "title": "Observer Pattern (Concept)",
    "description": "Subjects notifying a list of subscribed observers whenever their state changes.",
    "time": 17
  },
  {
    "id": 6060,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Medium",
    "title": "Pub/Sub Pattern (Concept)",
    "description": "Decoupling publishers and subscribers through a shared event broker/channel.",
    "time": 17
  },
  {
    "id": 6061,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Easy",
    "title": "Singleton Pattern in JavaScript",
    "description": "Ensuring a class or module has exactly one shared instance across the app.",
    "time": 14
  },
  {
    "id": 6062,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Medium",
    "title": "Factory Pattern in JavaScript",
    "description": "Centralizing object creation logic behind a function instead of direct constructors.",
    "time": 16
  },
  {
    "id": 6063,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Medium",
    "title": "Revealing Module Pattern",
    "description": "A refined module pattern that clearly maps private implementation to a public API.",
    "time": 16
  },
  {
    "id": 6064,
    "topic": "JavaScript",
    "subTopic": "Design Patterns",
    "difficulty": "Hard",
    "title": "Decorator Pattern in JavaScript",
    "description": "Wrapping a function or object to add behavior without modifying its original source.",
    "time": 20
  },
  {
    "id": 6065,
    "topic": "JavaScript",
    "subTopic": "Meta-programming",
    "difficulty": "Medium",
    "title": "Proxy Object Fundamentals",
    "description": "Intercepting and customizing fundamental operations on an object using Proxy.",
    "time": 18
  },
  {
    "id": 6066,
    "topic": "JavaScript",
    "subTopic": "Meta-programming",
    "difficulty": "Medium",
    "title": "Reflect API",
    "description": "A built-in object providing default, spec-compliant implementations for the same operations Proxy traps intercept.",
    "time": 17
  },
  {
    "id": 6067,
    "topic": "JavaScript",
    "subTopic": "Meta-programming",
    "difficulty": "Hard",
    "title": "Proxy Traps Deep Dive (get/set/has/deleteProperty)",
    "description": "Common Proxy traps and real-world use cases for each.",
    "time": 20
  },
  {
    "id": 6068,
    "topic": "JavaScript",
    "subTopic": "Meta-programming",
    "difficulty": "Medium",
    "title": "Symbol Type and Well-Known Symbols",
    "description": "A primitive type guaranteeing unique property keys, plus the engine's own internal hook symbols.",
    "time": 17
  },
  {
    "id": 6069,
    "topic": "JavaScript",
    "subTopic": "Meta-programming",
    "difficulty": "Hard",
    "title": "Symbol.toPrimitive",
    "description": "Customizing how an object converts to a primitive in numeric, string, or default contexts.",
    "time": 19
  },
  {
    "id": 6070,
    "topic": "JavaScript",
    "subTopic": "Collections (Map/Set/WeakMap/WeakSet)",
    "difficulty": "Easy",
    "title": "Map vs Plain Object",
    "description": "When a Map is the better choice over a regular object for key-value storage.",
    "time": 14
  },
  {
    "id": 6071,
    "topic": "JavaScript",
    "subTopic": "Collections (Map/Set/WeakMap/WeakSet)",
    "difficulty": "Easy",
    "title": "Set vs Array for Uniqueness",
    "description": "Using Set to guarantee unique values and get O(1) membership checks.",
    "time": 14
  },
  {
    "id": 6072,
    "topic": "JavaScript",
    "subTopic": "Collections (Map/Set/WeakMap/WeakSet)",
    "difficulty": "Medium",
    "title": "WeakMap Use Cases",
    "description": "A Map variant whose object keys don't prevent garbage collection.",
    "time": 17
  },
  {
    "id": 6073,
    "topic": "JavaScript",
    "subTopic": "Collections (Map/Set/WeakMap/WeakSet)",
    "difficulty": "Medium",
    "title": "WeakSet Use Cases",
    "description": "A Set variant that only holds objects and doesn't prevent them from being garbage collected.",
    "time": 16
  },
  {
    "id": 6074,
    "topic": "JavaScript",
    "subTopic": "Collections (Map/Set/WeakMap/WeakSet)",
    "difficulty": "Medium",
    "title": "WeakMap vs Map: Key Differences",
    "description": "Comparing garbage collection behavior, key types, and iterability side by side.",
    "time": 16
  },
  {
    "id": 6075,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "Property Descriptors (writable, enumerable, configurable)",
    "description": "The hidden metadata every object property carries, controllable via Object.defineProperty.",
    "time": 18
  },
  {
    "id": 6076,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Easy",
    "title": "Object.freeze()",
    "description": "Making an object's own top-level properties immutable.",
    "time": 14
  },
  {
    "id": 6077,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Easy",
    "title": "Object.seal()",
    "description": "Preventing new/removed properties while still allowing existing values to change.",
    "time": 14
  },
  {
    "id": 6078,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "Object.freeze vs Object.seal vs Object.preventExtensions",
    "description": "Three progressively looser levels of restricting an object's mutability.",
    "time": 16
  },
  {
    "id": 6079,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "Shallow Copy vs Deep Clone",
    "description": "Why spread/Object.assign only copy one level deep, and when a true deep clone is needed.",
    "time": 17
  },
  {
    "id": 6080,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "structuredClone() API",
    "description": "The native browser/Node API for deep-cloning most JavaScript values.",
    "time": 16
  },
  {
    "id": 6081,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "Object.is() vs ===",
    "description": "The subtle edge cases where strict equality and Object.is disagree.",
    "time": 16
  },
  {
    "id": 6082,
    "topic": "JavaScript",
    "subTopic": "Object Internals",
    "difficulty": "Medium",
    "title": "Object.assign() Pitfalls",
    "description": "Common mistakes when merging objects with Object.assign — mutation and shallow merging.",
    "time": 16
  },
  {
    "id": 6083,
    "topic": "JavaScript",
    "subTopic": "Type Coercion",
    "difficulty": "Medium",
    "title": "Type Coercion Rules in JavaScript",
    "description": "How JS implicitly converts values between types in operators and comparisons.",
    "time": 17
  },
  {
    "id": 6084,
    "topic": "JavaScript",
    "subTopic": "Type Coercion",
    "difficulty": "Medium",
    "title": "== vs === Edge Cases",
    "description": "The specific coercion rules loose equality applies before comparing.",
    "time": 16
  },
  {
    "id": 6085,
    "topic": "JavaScript",
    "subTopic": "Type Coercion",
    "difficulty": "Easy",
    "title": "Falsy Values: The Complete List",
    "description": "The exact eight values that evaluate to false in a boolean context.",
    "time": 13
  },
  {
    "id": 6086,
    "topic": "JavaScript",
    "subTopic": "Type Coercion",
    "difficulty": "Easy",
    "title": "Array.isArray() vs typeof for Arrays",
    "description": "Why typeof cannot reliably distinguish arrays from plain objects.",
    "time": 13
  },
  {
    "id": 6087,
    "topic": "JavaScript",
    "subTopic": "Type Coercion",
    "difficulty": "Easy",
    "title": "NaN Comparisons and Number.isNaN()",
    "description": "Why NaN never equals itself, and how to safely check for it.",
    "time": 13
  },
  {
    "id": 6088,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Medium",
    "title": "Web Workers",
    "description": "Running JavaScript on a separate background thread to avoid blocking the UI.",
    "time": 18
  },
  {
    "id": 6089,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Hard",
    "title": "Worker Threads in Node.js",
    "description": "Node's equivalent of Web Workers for true multi-threaded CPU-bound work.",
    "time": 20
  },
  {
    "id": 6090,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Hard",
    "title": "Service Workers",
    "description": "A programmable network proxy that runs independently of any page, enabling offline support.",
    "time": 21
  },
  {
    "id": 6091,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Hard",
    "title": "Streams API (ReadableStream/WritableStream)",
    "description": "Processing data incrementally in chunks instead of loading it all into memory at once.",
    "time": 20
  },
  {
    "id": 6092,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Medium",
    "title": "AbortController and AbortSignal",
    "description": "The standard API for cancelling in-flight async operations like fetch requests.",
    "time": 17
  },
  {
    "id": 6093,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Easy",
    "title": "Fetch API vs XMLHttpRequest",
    "description": "Comparing the modern Promise-based HTTP client to the legacy event-based one.",
    "time": 14
  },
  {
    "id": 6094,
    "topic": "JavaScript",
    "subTopic": "Browser & Runtime APIs",
    "difficulty": "Medium",
    "title": "requestIdleCallback",
    "description": "Scheduling low-priority work to run only when the browser is otherwise idle.",
    "time": 16
  },
  {
    "id": 6095,
    "topic": "JavaScript",
    "subTopic": "Polyfills",
    "difficulty": "Medium",
    "title": "Writing Polyfills: General Approach",
    "description": "The standard defensive pattern for implementing a missing built-in method.",
    "time": 17
  },
  {
    "id": 6096,
    "topic": "JavaScript",
    "subTopic": "Polyfills",
    "difficulty": "Medium",
    "title": "Array.prototype.map Polyfill Walkthrough",
    "description": "Implementing map() from scratch, matching its exact native signature and behavior.",
    "time": 18
  },
  {
    "id": 6097,
    "topic": "JavaScript",
    "subTopic": "Polyfills",
    "difficulty": "Easy",
    "title": "Polyfill vs Transpile: What's the Difference",
    "description": "Two distinct strategies for supporting older browsers/environments.",
    "time": 14
  },
  {
    "id": 6098,
    "topic": "JavaScript",
    "subTopic": "Error Handling",
    "difficulty": "Medium",
    "title": "Custom Error Classes",
    "description": "Extending the built-in Error class to create domain-specific, identifiable error types.",
    "time": 17
  },
  {
    "id": 6099,
    "topic": "JavaScript",
    "subTopic": "Error Handling",
    "difficulty": "Medium",
    "title": "try/catch/finally Nuances",
    "description": "Execution order guarantees and edge cases in exception handling blocks.",
    "time": 16
  },
  {
    "id": 6100,
    "topic": "JavaScript",
    "subTopic": "Error Handling",
    "difficulty": "Easy",
    "title": "Optional Catch Binding",
    "description": "Omitting the error parameter in a catch block when it isn't needed.",
    "time": 13
  },
  {
    "id": 6101,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Easy",
    "title": "Nullish Coalescing Operator (??)",
    "description": "Providing a default value only for null/undefined, not for other falsy values.",
    "time": 13
  },
  {
    "id": 6102,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Medium",
    "title": "Logical Assignment Operators (&&=, ||=, ??=)",
    "description": "Combining a logical operator with assignment for concise conditional updates.",
    "time": 15
  },
  {
    "id": 6103,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Medium",
    "title": "Tagged Template Literals",
    "description": "Passing a template literal through a custom function to process its parts before final output.",
    "time": 16
  },
  {
    "id": 6104,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Medium",
    "title": "BigInt",
    "description": "A numeric primitive for integers beyond Number's safe precision limit.",
    "time": 16
  },
  {
    "id": 6105,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Easy",
    "title": "Array.prototype.flat and flatMap",
    "description": "Flattening nested arrays natively, with or without a preceding map step.",
    "time": 14
  },
  {
    "id": 6106,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Medium",
    "title": "Array Destructuring Advanced Patterns",
    "description": "Skipping elements, default values, nested patterns, and rest collection in destructuring.",
    "time": 17
  },
  {
    "id": 6107,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Easy",
    "title": "Object Destructuring with Renaming and Defaults",
    "description": "Extracting properties under new local names while providing fallback values.",
    "time": 14
  },
  {
    "id": 6108,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Easy",
    "title": "globalThis",
    "description": "A standardized way to access the global object across every JavaScript environment.",
    "time": 13
  },
  {
    "id": 6109,
    "topic": "JavaScript",
    "subTopic": "Modern Syntax",
    "difficulty": "Medium",
    "title": "Array Holes and Sparse Arrays",
    "description": "How arrays with missing indices behave differently from dense arrays.",
    "time": 16
  },
  {
    "id": 6110,
    "topic": "JavaScript",
    "subTopic": "Node.js Event Loop",
    "difficulty": "Hard",
    "title": "process.nextTick vs Promise Microtasks (Node.js)",
    "description": "Node's additional, even-higher-priority queue that runs before regular microtasks.",
    "time": 21
  },
  {
    "id": 6111,
    "topic": "JavaScript",
    "subTopic": "Node.js Event Loop",
    "difficulty": "Hard",
    "title": "Node.js Event Loop Phases",
    "description": "The distinct phases Node cycles through, unlike the browser's simpler task/microtask model.",
    "time": 22
  },
  {
    "id": 6112,
    "topic": "JavaScript",
    "subTopic": "Node.js Event Loop",
    "difficulty": "Medium",
    "title": "setTimeout vs setImmediate (Node.js)",
    "description": "Two similarly-purposed Node APIs for deferring work, with different event-loop-phase guarantees.",
    "time": 16
  },
  {
    "id": 6113,
    "topic": "JavaScript",
    "subTopic": "Array Methods",
    "difficulty": "Medium",
    "title": "reduce() Advanced Use Cases",
    "description": "Using reduce for more than summing — building objects, grouping, and composing pipelines.",
    "time": 17
  },
  {
    "id": 6114,
    "topic": "JavaScript",
    "subTopic": "Array Methods",
    "difficulty": "Easy",
    "title": "map() vs forEach(): Performance & Semantics",
    "description": "Why map returns a new array while forEach doesn't, and when to use each.",
    "time": 14
  },
  {
    "id": 6115,
    "topic": "JavaScript",
    "subTopic": "Array Methods",
    "difficulty": "Medium",
    "title": "Array Sort Stability",
    "description": "Whether elements with equal comparator values retain their original relative order.",
    "time": 16
  },
  {
    "id": 6116,
    "topic": "JavaScript",
    "subTopic": "Array Methods",
    "difficulty": "Medium",
    "title": "Array-like Objects vs True Arrays",
    "description": "Objects with a length property and indexed keys that aren't real Array instances.",
    "time": 16
  },
  {
    "id": 6117,
    "topic": "JavaScript",
    "subTopic": "Array Methods",
    "difficulty": "Easy",
    "title": "Converting Array-like Objects to Arrays",
    "description": "The standard techniques for turning arguments/NodeList/HTMLCollection into a real array.",
    "time": 14
  },
  {
    "id": 6118,
    "topic": "JavaScript",
    "subTopic": "String Handling",
    "difficulty": "Easy",
    "title": "String Immutability",
    "description": "Why string methods always return a new string instead of modifying the original.",
    "time": 13
  },
  {
    "id": 6119,
    "topic": "JavaScript",
    "subTopic": "String Handling",
    "difficulty": "Easy",
    "title": "Template Literals vs String Concatenation",
    "description": "Comparing backtick interpolation to the traditional + operator for building strings.",
    "time": 13
  },
  {
    "id": 6120,
    "topic": "JavaScript",
    "subTopic": "String Handling",
    "difficulty": "Medium",
    "title": "String.raw",
    "description": "A built-in tag function that returns the literal, unescaped text of a template string.",
    "time": 15
  },
  {
    "id": 6121,
    "topic": "JavaScript",
    "subTopic": "Recursion & Algorithms",
    "difficulty": "Hard",
    "title": "Tail Call Optimization",
    "description": "Why JS engines mostly don't optimize away stack frames for recursive tail calls, despite the spec allowing it.",
    "time": 20
  },
  {
    "id": 6122,
    "topic": "JavaScript",
    "subTopic": "Recursion & Algorithms",
    "difficulty": "Medium",
    "title": "Recursion vs Iteration Trade-offs",
    "description": "When recursive elegance is worth the stack-depth risk versus an explicit loop.",
    "time": 16
  },
  {
    "id": 6123,
    "topic": "JavaScript",
    "subTopic": "Concurrency Model",
    "difficulty": "Easy",
    "title": "Single-Threaded Nature of JavaScript",
    "description": "Why JS can only execute one piece of code at a time, and how async work still happens.",
    "time": 14
  },
  {
    "id": 6124,
    "topic": "JavaScript",
    "subTopic": "Concurrency Model",
    "difficulty": "Medium",
    "title": "Concurrency vs Parallelism in JavaScript",
    "description": "Distinguishing interleaved single-threaded async work from truly simultaneous multi-thread execution.",
    "time": 16
  },
  {
    "id": 6125,
    "topic": "JavaScript",
    "subTopic": "Advanced OOP",
    "difficulty": "Medium",
    "title": "Simulating Abstract Classes in JavaScript",
    "description": "JS has no native 'abstract class' keyword — how to enforce the pattern manually.",
    "time": 17
  },
  {
    "id": 6126,
    "topic": "JavaScript",
    "subTopic": "Advanced OOP",
    "difficulty": "Easy",
    "title": "Method Overriding in JavaScript Classes",
    "description": "A subclass redefining a method it inherits from its parent class.",
    "time": 14
  },
  {
    "id": 6127,
    "topic": "JavaScript",
    "subTopic": "Advanced OOP",
    "difficulty": "Medium",
    "title": "The super Keyword: Mechanics",
    "description": "How super works differently in constructors versus regular methods.",
    "time": 16
  },
  {
    "id": 6128,
    "topic": "JavaScript",
    "subTopic": "JSON",
    "difficulty": "Medium",
    "title": "JSON.stringify() Edge Cases",
    "description": "How stringify handles functions, undefined, symbols, circular references, and custom toJSON.",
    "time": 17
  },
  {
    "id": 6129,
    "topic": "JavaScript",
    "subTopic": "JSON",
    "difficulty": "Medium",
    "title": "JSON.parse() Reviver Function",
    "description": "Transforming parsed values on the fly as JSON.parse walks the resulting structure.",
    "time": 16
  },
  {
    "id": 6130,
    "topic": "JavaScript",
    "subTopic": "JSON",
    "difficulty": "Hard",
    "title": "Handling Circular References in JSON",
    "description": "Why JSON.stringify throws on circular objects, and how to work around it.",
    "time": 19
  },
  {
    "id": 6131,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Hard",
    "title": "Currying with Placeholder Arguments",
    "description": "Building a curry helper that allows skipping arguments to fill in later, like Lodash's _.",
    "time": 19
  },
  {
    "id": 6132,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Easy",
    "title": "Function.length and Function.name",
    "description": "Two introspective properties every function carries about its own signature.",
    "time": 14
  },
  {
    "id": 6133,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Easy",
    "title": "arguments Object vs Rest Parameters",
    "description": "Comparing the legacy array-like arguments object to the modern rest parameter syntax.",
    "time": 14
  },
  {
    "id": 6134,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Easy",
    "title": "Strict Mode ('use strict')",
    "description": "The opt-in restricted variant of JS that eliminates silent errors and unsafe features.",
    "time": 13
  },
  {
    "id": 6135,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Easy",
    "title": "Array Destructuring with Swapping Variables",
    "description": "Swapping two variables' values in one line without a temporary variable.",
    "time": 13
  },
  {
    "id": 6136,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Hard",
    "title": "Symbol.asyncIterator",
    "description": "The well-known symbol that marks an object as asynchronously iterable, powering for await...of on custom objects.",
    "time": 20
  },
  {
    "id": 6137,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Medium",
    "title": "Object Property Order Guarantees",
    "description": "The specific, spec-defined order in which object keys are enumerated.",
    "time": 16
  },
  {
    "id": 6138,
    "topic": "JavaScript",
    "subTopic": "Senior Differentiators",
    "difficulty": "Medium",
    "title": "Structured Clone Algorithm vs JSON Deep Clone",
    "description": "Comparing the native structuredClone/postMessage algorithm against the classic JSON round-trip hack.",
    "time": 17
  }
];

export const TOPICS = [
  "All Topics",
  "JavaScript",
  "TypeScript",
  "React.js",
  "React Native"
];

export const DIFFICULTIES = ["All", "Easy", "Medium", "Hard", "Coding"];

export const TOPIC_ICONS: Record<string, string> = {
  "JavaScript": "⚡",
  "TypeScript": "🔷",
  "React.js": "⚛️",
  "React Native": "📱"
};
