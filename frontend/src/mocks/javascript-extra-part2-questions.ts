// Hand-authored supplementary JavaScript technical question bank (part 2).
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_JAVASCRIPT_EXTRA_PART2_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "jsx2-1",
      "questionNumber": "JSX2-001",
      "title": "Implementing Function.prototype.bind/call/apply polyfills",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Adobe", "Stripe"],
      "frequency": 5,
      "category": "Function Prototypes",
      "part": "Advanced JS",
      "concepts": ["this binding", "Function.prototype", "arguments object", "spread syntax", "Symbol properties", "new operator"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How would you implement polyfills for Function.prototype.bind, call, and apply?"
    },
    "answer": {
      "expectedAnswer": "call/apply invoke the function immediately with a given `this` and either individual arguments (call) or an array of arguments (apply). bind returns a new function with `this` permanently fixed, which can be invoked later, and it also supports partial application of leading arguments. All three are implemented by temporarily attaching the function as a property on the target `this` object (or a unique Symbol key to avoid collisions), invoking it, then deleting the property so the object isn't polluted.",
      "deepExplanation": "The core trick for call/apply is that `obj.fn()` sets `this` to `obj` inside `fn`, so a polyfill assigns the function onto the context object under a unique key, calls it via that property access, captures the result, and removes the key. The context defaults to `globalThis` when `thisArg` is null/undefined (non-strict semantics). bind is trickier because it must return a *new* function that (a) works correctly when called normally, (b) supports currying/partial args, and (c) still allows `new boundFn()` to work, in which case the bound `this` must be ignored and the newly created instance's prototype chain must point to the original function's prototype. That's why a correct bind polyfill checks `this instanceof boundFn` inside the wrapper to detect construction and falls back to invoking the original function with `new`-created `this` in that branch.\n\n```js\nFunction.prototype.myCall = function (context, ...args) {\n  context = context ?? globalThis;\n  const key = Symbol('fn');\n  context[key] = this;\n  const result = context[key](...args);\n  delete context[key];\n  return result;\n};\n\nFunction.prototype.myApply = function (context, args = []) {\n  context = context ?? globalThis;\n  const key = Symbol('fn');\n  context[key] = this;\n  const result = context[key](...args);\n  delete context[key];\n  return result;\n};\n\nFunction.prototype.myBind = function (context, ...boundArgs) {\n  const originalFn = this;\n  function bound(...callArgs) {\n    const isNew = this instanceof bound;\n    return originalFn.apply(isNew ? this : context, [...boundArgs, ...callArgs]);\n  }\n  bound.prototype = Object.create(originalFn.prototype || {});\n  return bound;\n};\n```\nUsing `Symbol()` instead of a string key avoids clobbering an existing property with the same name. Deleting the temporary key afterward keeps the polyfill non-mutating from the caller's perspective (aside from the momentary side effect).",
      "productionExample": "Polyfills like this matter when supporting legacy engines (old Android WebViews, embedded browsers) that lack ES5 Function.prototype methods, or in sandboxed/interview environments testing understanding of `this`. In real codebases, `.bind` is commonly used to lock `this` for class event handlers (`this.handleClick = this.handleClick.bind(this)`) before hooks/arrow-function class fields became standard.",
      "bestPractices": [
        "Use a Symbol key (not a string) for the temporary property to avoid collisions with real properties",
        "Default `thisArg` to globalThis when null/undefined, matching non-strict-mode call/apply semantics",
        "Preserve the prototype chain in bind so `instanceof` still works on bound functions",
        "Handle the `new boundFn()` case by checking `this instanceof bound` inside the wrapper",
        "Support partial application by concatenating bound args with call-time args in bind",
        "Always clean up (delete) the temporary property, even if the call throws — use try/finally in production code",
        "Prefer native bind/call/apply in real code; only hand-roll for interviews or genuine polyfill needs"
      ],
      "tradeOffs": "Advantages: Deepens understanding of `this` binding and the function invocation model; demonstrates mastery of prototype chains and Symbol usage; portable polyfill for very old environments. Disadvantages: Native implementations are more optimized by the engine; manual property attachment has edge cases (getters/setters, frozen objects) that are easy to miss; reimplementing built-ins in production code adds maintenance risk for little benefit.",
      "commonMistakes": [
        "Forgetting to handle `thisArg` being null/undefined",
        "Using a plain string key like '__fn__' that can collide with real properties",
        "Not deleting the temporary property after invocation, leaking it onto the object",
        "Bind polyfill breaking `new boundFn()` because it always forces the bound context",
        "Not preserving the function's prototype in the bind polyfill, breaking instanceof checks",
        "Interview trap: forgetting call/apply must invoke immediately while bind must NOT invoke immediately",
        "Interview trap: bind's partial arguments must come before call-time arguments, not after",
        "Failing on primitive `thisArg` values (numbers/strings) which should be boxed in non-strict mode"
      ],
      "followUpQuestions": [
        "How would you make your bind polyfill support currying across multiple bind calls?",
        "Why does using `new` on a bound function ignore the bound `this`?",
        "How does strict mode change the default `this` value for call/apply?",
        "What happens if the object you attach the function to is frozen?",
        "How would you avoid the Symbol property being enumerable in for...in loops?"
      ],
      "relatedTopics": ["this binding", "prototype chain", "Symbol", "currying", "partial application", "strict mode", "constructor functions"]
    }
  },
  {
    "detail": {
      "id": "jsx2-2",
      "questionNumber": "JSX2-002",
      "title": "Prototype inheritance in JavaScript",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Flipkart", "Zoho"],
      "frequency": 5,
      "category": "Function Prototypes",
      "part": "Advanced JS",
      "concepts": ["prototype chain", "__proto__", "Object.create", "constructor functions", "class syntax", "property lookup"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Can you explain prototype inheritance in JavaScript with examples?"
    },
    "answer": {
      "expectedAnswer": "Every JavaScript object has an internal `[[Prototype]]` link (exposed as `__proto__`) to another object; when a property isn't found on the object itself, the engine walks up this chain until it finds the property or reaches `null`. Functions have a `prototype` property used as the `[[Prototype]]` of objects created via `new Fn()`, which is how method sharing across instances works without copying methods onto each instance.",
      "deepExplanation": "Prototype inheritance is delegation-based rather than copy-based: instances don't get their own copy of methods, they delegate lookups up the chain. `const dog = { bark(){} }; const puppy = Object.create(dog);` makes `puppy.__proto__ === dog`, so `puppy.bark()` works via delegation even though `puppy` has no own `bark` property. Constructor functions achieve the same thing implicitly: `function Dog(){}; Dog.prototype.bark = function(){}; const d = new Dog();` sets `d.__proto__ === Dog.prototype`. ES6 `class` syntax is sugar over this exact mechanism — `class Dog { bark(){} }` still populates `Dog.prototype.bark`, and `class Puppy extends Dog` sets `Puppy.prototype.__proto__ = Dog.prototype`. Property writes never traverse the chain: `puppy.name = 'Rex'` always creates an own property on `puppy`, it never mutates `dog`. This is the key distinction from classical inheritance where instance state is copied at creation. The chain terminates at `Object.prototype`, whose own `[[Prototype]]` is `null`.",
      "productionExample": "Prototype inheritance underlies every built-in type: arrays inherit `map`/`filter` from `Array.prototype`, and every object inherits `toString`/`hasOwnProperty` from `Object.prototype`. Framework internals (e.g., React class components extending `React.Component`) rely on this chain for `this.setState` and lifecycle methods to be available without duplicating code per instance.",
      "bestPractices": [
        "Prefer `class` syntax over manual prototype manipulation for readability",
        "Use `Object.create(proto)` when you need delegation without a constructor function",
        "Avoid mutating `Object.prototype` or other built-in prototypes (monkey-patching)",
        "Use `hasOwnProperty` (or `Object.hasOwn`) to distinguish own vs inherited properties when iterating",
        "Prefer `Object.getPrototypeOf`/`Object.setPrototypeOf` over the deprecated `__proto__` accessor",
        "Keep prototype chains shallow for predictable lookup performance"
      ],
      "tradeOffs": "Advantages: Memory-efficient method sharing across many instances; dynamic — changing a prototype method affects all existing instances immediately; flexible delegation model supports mixins and composition. Disadvantages: Lookup cost grows with chain depth; accidental shared mutable state on a prototype (e.g., an array property) leaks across instances; less familiar to developers coming from classical OOP languages, causing confusion about `this` and shared state.",
      "commonMistakes": [
        "Defining object/array properties directly on `Fn.prototype`, causing shared mutable state across instances",
        "Confusing `__proto__` (the actual link) with `prototype` (a property that only exists on functions)",
        "Assuming setting a property on an instance mutates the prototype",
        "Forgetting `Object.create(null)` produces an object with no prototype at all (no `toString`, etc.)",
        "Interview trap: `for...in` iterates inherited enumerable properties too, not just own ones",
        "Interview trap: reassigning `Fn.prototype = {}` after instances already exist doesn't retroactively change their `[[Prototype]]`",
        "Not resetting `constructor` when manually replacing a prototype object"
      ],
      "followUpQuestions": [
        "What's the difference between `prototype` and `__proto__`?",
        "How does `class extends` set up the prototype chain?",
        "What happens when you assign to a property that only exists on the prototype?",
        "How would you implement multiple inheritance-like behavior using prototypes?",
        "What is Object.create(null) used for?"
      ],
      "relatedTopics": ["prototype chain", "Object.create", "constructor functions", "class syntax", "delegation", "Object.prototype"]
    }
  },
  {
    "detail": {
      "id": "jsx2-3",
      "questionNumber": "JSX2-003",
      "title": "How `this` behaves in different invocation contexts",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Uber", "Flipkart"],
      "frequency": 5,
      "category": "Function Prototypes",
      "part": "Advanced JS",
      "concepts": ["this binding", "implicit binding", "explicit binding", "arrow functions", "strict mode", "call/apply/bind"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does the this keyword work in different contexts (global, object, function)?"
    },
    "answer": {
      "expectedAnswer": "`this` is determined by how a function is *called*, not where it's defined (except for arrow functions). In the global scope it refers to `globalThis` (or `window` in browsers); as a plain function call in non-strict mode it defaults to `globalThis`, but is `undefined` in strict mode; as a method call (`obj.method()`) it's the object before the dot; and it can be explicitly set via `call`/`apply`/`bind` or implicitly via `new`. Arrow functions have no own `this` — they lexically inherit it from their enclosing scope.",
      "deepExplanation": "JavaScript resolves `this` at call time using a precedence order: (1) `new Fn()` — `this` is the newly created object; (2) explicit binding via `call`/`apply`/`bind` — `this` is whatever is passed; (3) implicit binding via method call `obj.method()` — `this` is `obj`; (4) default binding — `globalThis` in sloppy mode, `undefined` in strict mode. Arrow functions are outside this system entirely: they capture `this` lexically from the enclosing non-arrow scope at definition time and it can never be reassigned, even with `call`/`apply`/`bind` (those only affect arguments passed to the arrow, not `this`). This is why arrow functions are preferred for callbacks inside class methods — `array.forEach(item => this.process(item))` correctly keeps `this` as the class instance, whereas a regular function passed to forEach would lose that binding unless explicitly bound. A common gotcha: destructuring a method off an object (`const { method } = obj; method()`) loses the implicit binding because the call is now a plain function call, not a method call — `this` becomes `undefined` in strict mode or `globalThis` otherwise.",
      "productionExample": "In React class components, `onClick={this.handleClick}` detaches the method from `this`, so codebases either bind in the constructor, use arrow function class fields, or wrap in an inline arrow in JSX. Event listener callbacks (`element.addEventListener('click', handler)`) set `this` to the DOM element that received the event unless the handler is an arrow function, which is a frequent source of bugs when developers assume `this` refers to a class instance.",
      "bestPractices": [
        "Use arrow functions for callbacks that need to preserve the enclosing `this`",
        "Bind methods explicitly in constructors or use class field arrow functions for event handlers",
        "Avoid destructuring methods off objects if you plan to call them standalone",
        "Enable strict mode (`'use strict'` or ES modules, which are strict by default) to avoid accidental global `this`",
        "Never use `call`/`apply`/`bind` on arrow functions expecting to change their `this` — it has no effect",
        "Be explicit with `.bind(this)` when passing class methods as callbacks to third-party APIs"
      ],
      "tradeOffs": "Advantages: Dynamic `this` binding enables flexible method reuse across objects and powerful patterns like mixins and borrowing methods via call/apply. Disadvantages: The rules are context-dependent and easy to get wrong, especially when passing methods as callbacks; arrow functions solve lexical binding but can't be reused as constructors or object methods relying on dynamic `this`.",
      "commonMistakes": [
        "Passing `this.method` as a callback without binding, losing the implicit binding",
        "Using an arrow function as an object literal method, expecting `this` to be the object",
        "Assuming strict mode's `this === undefined` behavior applies globally when it's actually per-function based on definition context",
        "Interview trap: `setTimeout(this.method, 1000)` calls `method` as a plain function, not as a method — `this` is lost",
        "Interview trap: arrow functions defined at the top level of a module have `this === undefined` (module scope), not `window`",
        "Forgetting `new` in front of a constructor call silently makes `this` refer to globalThis (sloppy mode) instead of throwing",
        "Assuming `call`/`apply` work on arrow functions to override `this`"
      ],
      "followUpQuestions": [
        "What does `this` refer to inside a regular function called without any context, in strict vs sloppy mode?",
        "Why can't you change an arrow function's `this` with `.bind()`?",
        "How does `this` behave inside a class field arrow function vs a class method?",
        "What happens to `this` inside a nested regular function inside a method?",
        "How does the `new` keyword affect `this` binding, and what does it return if the constructor explicitly returns an object?"
      ],
      "relatedTopics": ["this binding", "arrow functions", "strict mode", "call/apply/bind", "lexical scope", "execution context"]
    }
  },
  {
    "detail": {
      "id": "jsx2-4",
      "questionNumber": "JSX2-004",
      "title": "Prototypal vs classical inheritance",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Zoho"],
      "frequency": 4,
      "category": "Function Prototypes",
      "part": "Advanced JS",
      "concepts": ["prototypal inheritance", "classical inheritance", "delegation", "class syntax", "object composition"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the difference between prototypal and classical inheritance?"
    },
    "answer": {
      "expectedAnswer": "Classical inheritance (Java, C++) defines rigid classes as blueprints; instances are created by instantiating a class, and subclassing copies/extends behavior at compile time through a fixed hierarchy. Prototypal inheritance (JavaScript) has no real classes at the engine level — objects inherit directly from other live objects via a `[[Prototype]]` chain, and that chain can be modified at runtime, including creating an object that inherits from another object with no constructor involved at all.",
      "deepExplanation": "In classical languages, a class is a static template; an object's type is fixed at instantiation and can't change. In JavaScript, objects delegate to other objects, and that delegation link can be reassigned dynamically with `Object.setPrototypeOf`. `class` in ES6 is purely syntactic sugar over prototype-based delegation — under the hood `class Dog extends Animal` still builds a prototype chain (`Dog.prototype.__proto__ === Animal.prototype`) rather than doing template-based instantiation. This means JavaScript supports patterns classical languages don't easily allow, like creating one-off objects that inherit from another specific object (`Object.create(specificObject)`) without any class definition at all. Another difference: in classical inheritance, instance fields are typically copied per-instance at construction; in prototypal inheritance, shared behavior lives on the prototype object itself and is looked up dynamically, so changing a method on the prototype after instances exist retroactively changes behavior for all of them.",
      "productionExample": "Understanding this distinction matters when debugging why mutating a prototype method affects every existing instance immediately (a footgun classical-language developers don't expect), and when deciding between class-based component models versus object-composition/mixin patterns common in JS libraries (e.g., composing behavior via `Object.assign(target, mixin)`).",
      "bestPractices": [
        "Use `class` syntax for team readability while understanding it's sugar over prototypes",
        "Prefer composition (mixins, `Object.assign`) over deep prototype/class hierarchies",
        "Don't rely on classical-inheritance mental models (e.g., private fields, method overriding rules) without verifying JS semantics",
        "Use `Object.create` directly when you want delegation without the ceremony of a class",
        "Keep prototype chains shallow to avoid slow lookups and hard-to-trace behavior",
        "Document intentional prototype mutation since it's invisible at the call site"
      ],
      "tradeOffs": "Advantages of prototypal: dynamic, flexible, memory-efficient (shared methods, not copied), supports runtime reconfiguration. Advantages of classical: predictable, statically checkable hierarchies, familiar to most engineers, better tooling support in typed languages. Disadvantages of prototypal: mutable shared state can cause subtle bugs, less intuitive for newcomers. Disadvantages of classical: rigid, harder to compose behavior across unrelated hierarchies, no runtime flexibility.",
      "commonMistakes": [
        "Assuming JS `class` creates a rigid classical-style template like Java",
        "Not realizing prototype mutation affects all existing instances retroactively",
        "Treating `extends` as copying the parent's methods instead of chaining prototypes",
        "Interview trap: JavaScript has no true 'private' class-level encapsulation without `#` private fields (ES2022) or closures",
        "Assuming instanceof checks are equivalent to classical type checks when they're really just chain traversal",
        "Forgetting that `class` fields declared as objects/arrays are per-instance, unlike prototype-level property assignment"
      ],
      "followUpQuestions": [
        "Is JavaScript's `class` keyword real inheritance or syntactic sugar?",
        "How would you implement multiple inheritance-like behavior in JavaScript?",
        "What are the performance implications of deep prototype chains?",
        "How does `instanceof` actually work under the hood?",
        "What's the difference between composition and inheritance, and when would you choose each?"
      ],
      "relatedTopics": ["prototype chain", "class syntax", "Object.create", "composition over inheritance", "delegation"]
    }
  },
  {
    "detail": {
      "id": "jsx2-5",
      "questionNumber": "JSX2-005",
      "title": "How Object.create() works and its role in inheritance",
      "difficulty": "Medium",
      "companies": ["Google", "Amazon", "Microsoft", "Adobe", "Flipkart"],
      "frequency": 4,
      "category": "Function Prototypes",
      "part": "Advanced JS",
      "concepts": ["Object.create", "prototype chain", "property descriptors", "null prototype", "delegation"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does Object.create() work, and how is it used in inheritance?"
    },
    "answer": {
      "expectedAnswer": "`Object.create(proto, propertiesObject?)` creates a brand-new object whose `[[Prototype]]` is set directly to `proto`, without invoking any constructor function. The optional second argument lets you define own properties on the new object using property-descriptor syntax (same shape as `Object.defineProperties`). It's the most direct way to set up prototypal inheritance because it lets you specify the exact prototype object rather than relying on a function's implicit `.prototype`.",
      "deepExplanation": "`Object.create(proto)` is roughly equivalent to `{ __proto__: proto }` but works even in environments where `__proto__` isn't exposed, and it's the standard, spec-sanctioned way to set a prototype at creation time (as opposed to `Object.setPrototypeOf`, which mutates an existing object's prototype and is slower because it can deoptimize engine object-shape caches). A classic pattern for prototypal inheritance without classes is: `const animal = { speak() { return 'generic sound'; } }; const dog = Object.create(animal); dog.speak = function() { return 'Woof'; };` — `dog` now overrides `speak` as an own property while still delegating other lookups to `animal`. `Object.create(null)` produces an object with *no* prototype at all — not even `Object.prototype` — which is useful for creating a 'pure' dictionary/map object immune to prototype pollution attacks and without inherited methods like `toString`/`hasOwnProperty` cluttering `for...in` or key lookups. Historically, before ES6 `class extends`, `Object.create(Parent.prototype)` was the standard way to correctly set up constructor-function-based inheritance: `Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child;` — this was preferred over `Child.prototype = new Parent()` because the latter actually executes the parent constructor unnecessarily.",
      "productionExample": "`Object.create(null)` is commonly used for building safe lookup tables/caches (e.g., a memoization cache keyed by arbitrary strings) to avoid prototype pollution vulnerabilities where an attacker-controlled key like `'__proto__'` could otherwise corrupt `Object.prototype`. Many pre-ES6 utility/library codebases still use `Object.create(Parent.prototype)` for inheritance setup.",
      "bestPractices": [
        "Use `Object.create(null)` for pure dictionary objects to avoid prototype pollution and unwanted inherited methods",
        "Prefer `Object.create` over `Object.setPrototypeOf` when creating a new object, since setting the prototype at creation avoids engine deoptimization",
        "Use property descriptors in the second argument when you need non-enumerable or read-only properties",
        "Remember to reset `.constructor` when manually rewiring prototype chains via Object.create",
        "Prefer `class extends` in modern code for readability; reserve `Object.create` for object-based delegation patterns",
        "Avoid `Object.create(null)` objects with code expecting `.toString`/`.hasOwnProperty` to exist"
      ],
      "tradeOffs": "Advantages: Precise control over the prototype without invoking constructors; supports property descriptors for fine-grained property configuration; `Object.create(null)` gives a safe, clean dictionary object. Disadvantages: Less familiar/readable than `class` syntax for typical OOP hierarchies; `Object.create(null)` objects lack convenience methods and can break code (like template libraries) that assumes `Object.prototype` methods exist; changing prototypes after creation (`setPrototypeOf`) is a known performance anti-pattern.",
      "commonMistakes": [
        "Forgetting to reset `.constructor` after `Child.prototype = Object.create(Parent.prototype)`",
        "Using `Object.setPrototypeOf` in hot code paths, not realizing it deoptimizes object shapes",
        "Assuming `Object.create({})` and `{}` behave identically — `Object.create({})` inherits from a plain object, not `Object.prototype` directly through that object",
        "Interview trap: `Object.create(null)` objects don't have `.hasOwnProperty` — must use `Object.prototype.hasOwnProperty.call(obj, key)` or `Object.hasOwn(obj, key)`",
        "Forgetting the second argument uses property-descriptor syntax, not plain values, so `Object.create(proto, { x: 5 })` throws because `5` isn't a valid descriptor",
        "Using `new Parent()` instead of `Object.create(Parent.prototype)` for pre-ES6 inheritance, unnecessarily running the parent constructor"
      ],
      "followUpQuestions": [
        "What's the difference between Object.create and Object.setPrototypeOf?",
        "Why is Object.create(null) useful for security-sensitive dictionaries?",
        "How did developers implement inheritance with Object.create before ES6 classes?",
        "What's the performance cost of changing an object's prototype after creation?",
        "How do property descriptors passed to Object.create differ from plain object literals?"
      ],
      "relatedTopics": ["prototype chain", "property descriptors", "prototype pollution", "class syntax", "Object.setPrototypeOf"]
    }
  },
  {
    "detail": {
      "id": "jsx2-6",
      "questionNumber": "JSX2-006",
      "title": "Browser rendering pipeline and JavaScript's impact",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Adobe", "Netflix"],
      "frequency": 4,
      "category": "JavaScript in the Browser",
      "part": "Browser/Web APIs",
      "concepts": ["critical rendering path", "reflow", "repaint", "layout", "paint", "composite", "DOM"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Can you explain the rendering pipeline in the browser and how JavaScript affects it?"
    },
    "answer": {
      "expectedAnswer": "The browser turns HTML/CSS into pixels through: parse HTML into a DOM tree, parse CSS into a CSSOM, combine them into a Render Tree, compute Layout (geometry/position of every element), Paint (fill in pixels for each layer), and Composite (combine layers on the GPU). JavaScript can trigger this pipeline at any point — reading layout-dependent properties (like `offsetHeight`) forces a synchronous Layout recalculation, and DOM/style mutations invalidate Layout, Paint, or just Composite depending on what changed.",
      "deepExplanation": "The critical rendering path is: DOM construction (parse HTML) → CSSOM construction (parse CSS, render-blocking) → Render Tree (DOM + CSSOM, excludes display:none nodes) → Layout/Reflow (compute exact size and position of every render tree node) → Paint (rasterize each layer's pixels) → Composite (layer the painted results together, done on the GPU compositor thread, cheapest stage). JavaScript execution is also render-blocking by default because it can synchronously mutate the DOM — the parser pauses at a `<script>` tag unless it has `async`/`defer`. JavaScript triggers different costs depending on what it changes: changing `width`/`display`/adding-removing nodes forces Layout (expensive, cascades to descendants and sometimes ancestors/siblings); changing `color`/`background` triggers Paint only (skips Layout); changing `transform`/`opacity` can be composite-only, skipping both Layout and Paint, because those properties can be handled entirely on GPU compositor layers. 'Layout thrashing' happens when JS reads a layout-dependent property (`offsetWidth`, `getComputedStyle`) right after writing a style change, forcing the browser to synchronously flush pending layout work instead of batching it — doing this in a loop is a classic performance bug.",
      "productionExample": "Performance-critical UI (animations, drag interactions) is written to only touch `transform`/`opacity` so the browser can skip Layout and Paint and run entirely on the compositor thread at 60fps. Profiling tools like Chrome DevTools' Performance tab visualize this pipeline directly, showing Layout/Paint/Composite as distinct colored blocks so engineers can spot layout thrashing or excessive paint areas.",
      "bestPractices": [
        "Animate `transform` and `opacity` instead of `top`/`left`/`width`/`height` to stay compositor-only",
        "Batch DOM reads and writes separately to avoid layout thrashing (read all, then write all)",
        "Use `will-change` sparingly to hint the browser to promote an element to its own compositor layer",
        "Defer or async non-critical `<script>` tags to avoid blocking HTML parsing",
        "Minimize CSSOM size/complexity since CSS parsing is render-blocking",
        "Use `requestAnimationFrame` for visual updates so they align with the browser's paint cycle",
        "Profile with DevTools' Performance/Rendering panels rather than guessing which stage is the bottleneck"
      ],
      "tradeOffs": "Advantages: Understanding the pipeline lets you write code that skips expensive stages (Layout/Paint) for smooth 60fps interactions; enables targeted profiling rather than blind optimization. Disadvantages: Over-optimizing (e.g., promoting too many elements to their own compositor layers via will-change) increases GPU memory usage and can paradoxically hurt performance; the pipeline's exact behavior varies slightly across browser engines.",
      "commonMistakes": [
        "Reading layout properties (offsetHeight, getComputedStyle) immediately after a style write in a loop, causing forced synchronous layout thrashing",
        "Animating width/height/top/left instead of transform, incurring Layout + Paint every frame",
        "Assuming all DOM changes are equally expensive when composite-only changes are far cheaper",
        "Overusing `will-change` on many elements, bloating GPU memory",
        "Interview trap: `display:none` removes an element from the render tree entirely (no layout box) while `visibility:hidden` still occupies layout space",
        "Blocking the parser with synchronous `<script>` tags in the `<head>` without async/defer",
        "Not realizing JavaScript execution and rendering share the main thread, so long JS tasks delay paint"
      ],
      "followUpQuestions": [
        "Why do transform and opacity animations perform better than top/left animations?",
        "What is layout thrashing and how would you fix it?",
        "How does the compositor thread relate to the main thread?",
        "What's the difference between reflow and repaint?",
        "How do async and defer scripts affect the rendering pipeline differently?"
      ],
      "relatedTopics": ["critical rendering path", "reflow/layout", "repaint", "compositor thread", "requestAnimationFrame", "CSSOM"]
    }
  },
  {
    "detail": {
      "id": "jsx2-7",
      "questionNumber": "JSX2-007",
      "title": "Event delegation and its performance benefits",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Flipkart", "Zoho"],
      "frequency": 5,
      "category": "JavaScript in the Browser",
      "part": "Browser/Web APIs",
      "concepts": ["event delegation", "event bubbling", "event.target", "listener performance", "dynamic elements"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is event delegation, and how does it improve performance?"
    },
    "answer": {
      "expectedAnswer": "Event delegation means attaching a single event listener to a common ancestor instead of individual listeners on each child, then using `event.target` inside the handler to determine which specific child triggered the event. It works because events bubble up the DOM tree by default, so the ancestor's listener still fires for events originating on its descendants.",
      "deepExplanation": "Instead of attaching a click listener to every `<li>` in a list of 1000 items, you attach one listener to the `<ul>` parent. When any `<li>` is clicked, the event bubbles from the `<li>` up through the `<ul>`, triggering the single listener, which inspects `event.target` (the actual clicked element) — often combined with `event.target.closest('li')` to handle clicks on nested elements inside the `<li>` — to determine which item was clicked and act accordingly. This reduces memory usage (one listener object instead of thousands) and setup/teardown cost, and — critically — it automatically works for elements added to the DOM *later*, since the listener lives on the parent, not the (possibly not-yet-existing) children. Without delegation, dynamically added elements need their listeners re-attached manually every time new nodes are inserted.",
      "productionExample": "Virtualized/infinite-scroll lists, table row actions, and dynamic UIs commonly delegate a single listener on the container rather than binding per-row, both for the automatic handling of newly rendered rows and for reduced memory footprint. Libraries like React actually delegate all synthetic events to the root container (historically `document`, now the root DOM node) under the hood for exactly this reason.",
      "bestPractices": [
        "Attach the delegated listener to the closest stable ancestor, not always `document`, to limit bubbling distance",
        "Use `event.target.closest(selector)` to correctly identify the intended target even when clicking nested child elements",
        "Guard handlers to ignore irrelevant targets rather than assuming event.target is always the expected element",
        "Remember delegation only works for bubbling events — some events (like `focus`/`blur` in their original form) don't bubble and need `focusin`/`focusout` instead",
        "Avoid delegation for events that need to stop propagation early for legitimate reasons — understand it can interact with `stopPropagation` calls in between",
        "Use delegation especially for lists/tables with many repeated child elements or elements added dynamically"
      ],
      "tradeOffs": "Advantages: Fewer listener objects (lower memory), simpler cleanup (one listener to remove), automatically handles dynamically added children without rebinding. Disadvantages: Requires extra logic (target matching, closest()) inside the handler; can be harder to reason about which element 'owns' the behavior; doesn't work for non-bubbling events without using their bubbling equivalents (focusin/focusout).",
      "commonMistakes": [
        "Attaching the listener too high (e.g., always on document) causing unnecessary bubbling distance and potential conflicts with other delegated handlers",
        "Forgetting to use closest() and instead relying on event.target directly, breaking when clicking a nested icon/span inside the intended element",
        "Trying to delegate non-bubbling events like the classic `focus`/`blur` without switching to `focusin`/`focusout`",
        "Interview trap: `event.currentTarget` is the element the listener is attached to; `event.target` is the actual element that triggered the event — mixing these up is a frequent bug",
        "Not accounting for event.stopPropagation() calls on inner elements that prevent the delegated handler from ever firing",
        "Re-querying the DOM for the clicked element instead of using event.target, which is slower and redundant"
      ],
      "followUpQuestions": [
        "What's the difference between event.target and event.currentTarget?",
        "Which events don't bubble, and how do you delegate them anyway?",
        "How does React implement its synthetic event system using delegation?",
        "How would you delegate events for a deeply nested, dynamically rendered table?",
        "What happens if a child calls stopPropagation — how does that affect delegation?"
      ],
      "relatedTopics": ["event bubbling", "event.target vs currentTarget", "DOM events", "synthetic events", "closest()"]
    }
  },
  {
    "detail": {
      "id": "jsx2-8",
      "questionNumber": "JSX2-008",
      "title": "Event capturing and bubbling phases",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Netflix", "Uber"],
      "frequency": 5,
      "category": "JavaScript in the Browser",
      "part": "Browser/Web APIs",
      "concepts": ["event capturing", "event bubbling", "event target phase", "addEventListener options", "DOM event flow"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do event capturing and bubbling work in the DOM?"
    },
    "answer": {
      "expectedAnswer": "The DOM event flow has three phases, in order: capturing (the event travels from `window`/`document` down to the target's parent), target (the event fires on the actual target element), and bubbling (the event travels back up from the target to `window`). By default, `addEventListener` listeners run during the bubbling phase; passing `{ capture: true }` (or `true` as the third argument) makes a listener run during the capturing phase instead.",
      "deepExplanation": "When a user clicks a deeply nested element, the browser first runs any capturing-phase listeners on ancestors starting from the outermost (window → document → ... → target's parent), then fires the target-phase listeners directly on the clicked element, then runs bubbling-phase listeners on ancestors from the target's parent back out to window. This three-phase model lets you intercept events before they reach their target (capturing — useful for things like a modal that needs to close on any outside click before the click reaches inner handlers) or react after the target has handled it (bubbling — the default and far more commonly used, since it enables event delegation). `event.stopPropagation()` halts further movement through remaining phases (whether called during capture or bubble); `event.stopImmediatePropagation()` additionally prevents other listeners registered on the *same* element/phase from running. Not all events bubble — e.g., `focus`/`blur`/`load` on media elements don't bubble by default, though bubbling equivalents like `focusin`/`focusout` exist.",
      "productionExample": "Modal/dropdown 'click outside to close' logic often uses a capturing-phase listener on `document` to detect the click before any of the modal's internal bubbling handlers fire, avoiding race conditions with stopPropagation calls inside the modal. Analytics/tracking scripts frequently attach a single capturing listener at the document root to observe every click across the app regardless of individual components calling stopPropagation.",
      "bestPractices": [
        "Default to bubbling-phase listeners (the standard `addEventListener(type, fn)`) unless you specifically need to intercept before the target handles it",
        "Use capturing-phase listeners for cross-cutting concerns like global click-outside detection or analytics that shouldn't be blocked by stopPropagation calls in bubbling handlers",
        "Prefer stopPropagation only when truly necessary — it can silently break delegation patterns elsewhere in the app",
        "Use stopImmediatePropagation only when you need to prevent sibling listeners on the same element, which is rare",
        "Always test event handling with nested interactive elements to confirm the intended phase behavior",
        "Remember passive listeners (`{ passive: true }`) for scroll/touch events to avoid blocking scrolling performance"
      ],
      "tradeOffs": "Advantages: The two-phase model (capture + bubble) gives fine-grained control over interception order, enabling powerful patterns like delegation and global interceptors. Disadvantages: Mixing capturing and bubbling listeners across a large codebase makes execution order hard to reason about; overuse of stopPropagation breaks other code's delegated listeners in non-obvious ways.",
      "commonMistakes": [
        "Assuming all events go through both phases when some don't bubble at all",
        "Forgetting the third argument to addEventListener defaults to bubbling (`false`/`{capture:false}`), not capturing",
        "Calling stopPropagation() thinking it also calls preventDefault(), when they are unrelated",
        "Interview trap: order of execution across phases is capture (outer→inner) then target then bubble (inner→outer) — many candidates get the capture direction backwards",
        "Overusing stopPropagation, silently breaking unrelated delegated listeners higher in the tree",
        "Not realizing stopImmediatePropagation also blocks other listeners on the same element/same phase, not just ancestors",
        "Assuming removeEventListener works without matching the exact capture flag used when it was added"
      ],
      "followUpQuestions": [
        "In what order do capturing and bubbling listeners fire relative to each other on the same click?",
        "Which native events don't bubble, and what are their bubbling equivalents?",
        "What's the difference between stopPropagation and stopImmediatePropagation?",
        "How would you implement a 'click outside to close' dropdown using capturing?",
        "How do passive event listeners interact with capturing/bubbling?"
      ],
      "relatedTopics": ["event flow", "addEventListener options", "stopPropagation", "event delegation", "passive listeners"]
    }
  },
  {
    "detail": {
      "id": "jsx2-9",
      "questionNumber": "JSX2-009",
      "title": "preventDefault() vs stopPropagation()",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Zoho", "Flipkart"],
      "frequency": 4,
      "category": "JavaScript in the Browser",
      "part": "Browser/Web APIs",
      "concepts": ["preventDefault", "stopPropagation", "default browser behavior", "event bubbling"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the difference between event.preventDefault() and event.stopPropagation()?"
    },
    "answer": {
      "expectedAnswer": "`preventDefault()` cancels the browser's default action for that event (e.g., stops a form from submitting, a link from navigating, or a checkbox from toggling) but does nothing to stop the event from continuing to propagate to other listeners. `stopPropagation()` stops the event from continuing to travel through the capturing/bubbling phases to reach other listeners on ancestor (or descendant, for capturing) elements, but does nothing to prevent the browser's default action. They're independent and can be combined.",
      "deepExplanation": "Every DOM event has two separate concerns the spec handles independently: what the browser does by default in response to the event (its 'default action', like navigating on an anchor click or submitting on a form's submit event), and how the event object continues moving through the DOM tree to reach other registered listeners. `preventDefault()` only cancels the former; a form's submit listener calling `preventDefault()` stops the page from reloading, but the event still bubbles up and any ancestor's submit/click listeners still fire. `stopPropagation()` only cancels the latter; it stops other elements' listeners from being invoked, but if the event is on a link, the browser will still navigate unless preventDefault() was also called. A common real bug: calling only stopPropagation() on a submit button click expecting to stop form submission — it doesn't, because form submission is a default action, not a propagation concern; you need preventDefault() for that.",
      "productionExample": "Custom-styled checkboxes/toggles call preventDefault() on click to suppress native rendering while implementing their own visual state. Nested clickable widgets (e.g., a delete icon inside a clickable card) call stopPropagation() on the icon's click handler so the card's own click handler (e.g., navigate to detail page) doesn't also fire.",
      "bestPractices": [
        "Call preventDefault() specifically to cancel browser default actions (navigation, form submit, context menu, etc.)",
        "Call stopPropagation() specifically to prevent other listeners from receiving the event, not as a way to cancel default behavior",
        "Avoid calling stopPropagation() reflexively — it can silently break delegation patterns elsewhere in the app",
        "Check `event.cancelable` before relying on preventDefault() working, since some events aren't cancelable",
        "Use passive listeners for scroll/touch handlers that never call preventDefault(), to avoid blocking scroll performance",
        "Document why stopPropagation is used at a given call site since its effects are non-local"
      ],
      "tradeOffs": "Advantages: Having two independent, composable methods gives precise control over both browser behavior and propagation separately. Disadvantages: Their independence is a common source of confusion for beginners who expect one to imply the other, leading to bugs where only one is called when both were needed (or vice versa, unintentionally breaking sibling functionality).",
      "commonMistakes": [
        "Calling stopPropagation() when the goal was actually to prevent a form submit or link navigation (needed preventDefault instead)",
        "Assuming preventDefault() stops the event from bubbling to parent listeners",
        "Calling preventDefault() on a non-cancelable event and expecting it to have an effect",
        "Interview trap: calling preventDefault() inside a passive event listener does nothing and may log a console warning",
        "Overusing stopPropagation() and accidentally breaking a parent's delegated click handler",
        "Not realizing you often need both together, e.g., a custom dropdown item that shouldn't navigate AND shouldn't trigger an outer click-away handler"
      ],
      "followUpQuestions": [
        "Can you give an example where you'd need both preventDefault and stopPropagation together?",
        "What does event.cancelable mean and how do you check it?",
        "Why doesn't preventDefault() work in a passive listener?",
        "How does stopImmediatePropagation differ from stopPropagation?",
        "What's the default action for a form's submit event, and how do SPAs typically handle it?"
      ],
      "relatedTopics": ["default browser actions", "event propagation", "passive event listeners", "form submission", "event.cancelable"]
    }
  },
  {
    "detail": {
      "id": "jsx2-10",
      "questionNumber": "JSX2-010",
      "title": "requestAnimationFrame and its timing model",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Adobe", "Netflix", "Uber"],
      "frequency": 4,
      "category": "JavaScript in the Browser",
      "part": "Browser/Web APIs",
      "concepts": ["requestAnimationFrame", "refresh rate", "animation timing", "compositor", "throttling in background tabs"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does requestAnimationFrame() work, and when should you use it?"
    },
    "answer": {
      "expectedAnswer": "`requestAnimationFrame(callback)` schedules `callback` to run right before the browser's next repaint, typically synced to the display's refresh rate (commonly ~60Hz, i.e. every ~16.7ms), and passes a high-resolution timestamp as its argument. It's the right tool for any visual/animation update because it avoids wasted work (frames that would never actually be rendered) and automatically pauses when the tab is backgrounded, unlike `setTimeout`/`setInterval`.",
      "deepExplanation": "Unlike setTimeout, which schedules a callback after a minimum delay with no awareness of the rendering pipeline, requestAnimationFrame callbacks are batched and run by the browser right before it performs layout/paint for the next frame — so DOM changes made inside the callback are picked up in that same upcoming frame instead of possibly being delayed or causing an extra unnecessary paint. Because it's tied to the actual display refresh rate rather than a fixed timer, it naturally adapts to 90Hz/120Hz displays and avoids the jank that comes from setInterval firing at times that don't align with paint cycles. The browser automatically throttles or fully suspends rAF callbacks in background/inactive tabs to save CPU/battery, which is exactly the desired behavior for animations (no point animating something invisible) but would be wrong behavior for logic that must keep running regardless of tab visibility. For continuous animation, you re-invoke it recursively: `function loop(ts) { update(ts); requestAnimationFrame(loop); } requestAnimationFrame(loop);` — and you must explicitly call `cancelAnimationFrame(id)` to stop it, similar to clearTimeout.",
      "productionExample": "Games, drag-and-drop reordering, smooth scroll libraries, and chart libraries doing custom canvas rendering all use rAF loops to synchronize visual updates with the display's paint cycle. It's also commonly combined with requestIdleCallback in scheduling libraries (like React's Scheduler) to interleave rendering work with browser idle time without blocking user interactions.",
      "bestPractices": [
        "Use requestAnimationFrame for any DOM/canvas visual update tied to animation, not setTimeout/setInterval",
        "Use the timestamp argument passed to the callback for frame-rate-independent animation math rather than assuming a fixed 16.7ms delta",
        "Always store the returned id and call cancelAnimationFrame on cleanup (e.g., component unmount) to avoid leaks",
        "Batch multiple DOM reads/writes inside a single rAF callback to avoid layout thrashing",
        "Don't rely on rAF for background/non-visual timing since it's throttled or paused in inactive tabs",
        "Combine with requestIdleCallback for non-urgent work that shouldn't compete with rendering"
      ],
      "tradeOffs": "Advantages: Synced to actual display refresh, avoiding wasted renders and visual jank; automatically pauses in background tabs saving battery/CPU; timestamp argument supports precise frame-independent animation. Disadvantages: Not guaranteed to fire at an exact interval (varies with display refresh rate and system load); unsuitable for logic that must run even when the tab is hidden (use Web Workers or setTimeout with visibility handling for that); recursive scheduling pattern requires manual cleanup to avoid orphaned loops.",
      "commonMistakes": [
        "Using setInterval for animations instead of requestAnimationFrame, causing frame misalignment and jank",
        "Forgetting to cancel the animation frame loop on component unmount, causing it to keep running against a detached DOM",
        "Assuming the callback timestamp increments by a fixed 16.7ms rather than computing actual deltas",
        "Interview trap: rAF callbacks are throttled/paused when the tab is in the background, so timers relying on rAF for real elapsed time will drift or stop",
        "Doing expensive synchronous work inside the rAF callback that itself causes the frame to miss its deadline, creating jank",
        "Not batching DOM reads and writes inside the callback, causing layout thrashing even within a single rAF"
      ],
      "followUpQuestions": [
        "How would you build a frame-rate-independent animation using the timestamp argument?",
        "Why does requestAnimationFrame pause in background tabs, and how would you handle logic that must keep running?",
        "How does requestAnimationFrame relate to requestIdleCallback?",
        "What happens if your rAF callback takes longer than one frame budget to execute?",
        "How would you throttle a scroll handler using requestAnimationFrame instead of a fixed timer?"
      ],
      "relatedTopics": ["animation timing", "event loop", "requestIdleCallback", "layout thrashing", "compositor thread", "cancelAnimationFrame"]
    }
  },
  {
    "detail": {
      "id": "jsx2-11",
      "questionNumber": "JSX2-011",
      "title": "Implementing memoization for performance",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Uber"],
      "frequency": 5,
      "category": "Optimization Techniques",
      "part": "Performance",
      "concepts": ["memoization", "caching", "pure functions", "closures", "Map", "cache invalidation"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How would you implement memoization in JavaScript to optimize performance?"
    },
    "answer": {
      "expectedAnswer": "Memoization wraps a pure function so that results for previously seen arguments are cached and returned instantly instead of recomputed, trading memory for CPU time. A generic implementation uses a closure over a `Map` keyed by a serialized representation of the arguments (or the raw argument for single-primitive-argument functions), checking the cache before invoking the underlying function and storing the result after.",
      "deepExplanation": "Memoization only works correctly for pure functions — same input always produces same output, no side effects — because the cache assumes a cached result is still valid indefinitely (or until explicitly invalidated). A generic memoizer needs a cache-key strategy: for a single primitive argument, the argument itself works as a Map key; for multiple or object/array arguments, you typically `JSON.stringify(args)` (works for simple serializable values but breaks for functions, circular refs, or objects where key order differs) or, more robustly, build a nested Map/WeakMap tree keyed by each argument in sequence. Using a `Map` instead of a plain object avoids prototype-pollution-style key collisions (e.g., a `'constructor'` key) and supports non-string keys directly for the single-argument case.\n\n```js\nfunction memoize(fn, resolver) {\n  const cache = new Map();\n  return function (...args) {\n    const key = resolver ? resolver(...args) : JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\n// classic use case: memoized fibonacci\nconst fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));\n```\nUnbounded caches are a memory leak risk in long-running processes, so production memoizers often add an LRU eviction policy (cap the Map at N entries, evict least-recently-used) or use a `WeakMap` when the argument is an object, so cache entries are garbage-collected automatically once the key object is no longer referenced elsewhere.",
      "productionExample": "React's `useMemo`/`useCallback` and `React.memo` are memoization primitives applied to render output and prop references. Expensive pure computations like parsing large datasets, recursive algorithms (Fibonacci, dynamic programming), or repeated API-response transformations are commonly memoized to avoid redundant CPU work on re-renders or repeated calls with the same input.",
      "bestPractices": [
        "Only memoize pure, deterministic functions with no side effects",
        "Use WeakMap for object-keyed caches to let unused entries be garbage collected automatically",
        "Cap cache size with an LRU or TTL eviction strategy to avoid unbounded memory growth",
        "Choose a reliable cache-key strategy — JSON.stringify is a decent default but breaks for non-serializable args like functions or Dates with differing formats",
        "Provide a custom resolver function for cache-key generation when default serialization is insufficient",
        "Measure before memoizing — memoization overhead can outweigh benefits for cheap functions"
      ],
      "tradeOffs": "Advantages: Dramatic speedup for expensive, repeatedly-called pure functions (e.g., recursive algorithms go from exponential to linear time); simple to add via a wrapper without changing the function's logic. Disadvantages: Increases memory usage, potentially unbounded without eviction; incorrect for impure functions or ones depending on external mutable state; JSON.stringify-based keys can be slow for large argument objects and don't handle all types correctly (undefined, functions, Symbols, circular structures).",
      "commonMistakes": [
        "Memoizing an impure function (e.g., one reading Date.now() or external mutable state), returning stale cached results",
        "Using a plain object as the cache and accidentally colliding with inherited keys like 'toString' or 'constructor'",
        "Never evicting cache entries, causing unbounded memory growth in long-running processes",
        "Interview trap: JSON.stringify(args) produces different strings for objects with the same keys in a different order, causing unnecessary cache misses",
        "Forgetting to preserve `this` binding when wrapping methods (use fn.apply(this, args))",
        "Using memoization on cheap functions where the caching overhead outweighs the savings",
        "Not handling functions/undefined/Symbol arguments which JSON.stringify silently drops or mishandles"
      ],
      "followUpQuestions": [
        "How would you implement an LRU cache eviction policy for a memoizer?",
        "Why is WeakMap preferable to Map for object-keyed caches?",
        "How does React's useMemo differ from a general-purpose memoize function?",
        "What cache-key strategy would you use for a function accepting complex nested objects?",
        "How would memoization interact with recursive functions and stack depth?"
      ],
      "relatedTopics": ["pure functions", "closures", "Map vs WeakMap", "LRU cache", "dynamic programming", "React.useMemo"]
    }
  },
  {
    "detail": {
      "id": "jsx2-12",
      "questionNumber": "JSX2-012",
      "title": "Lazy loading and its performance benefits",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Flipkart", "Zoho"],
      "frequency": 4,
      "category": "Optimization Techniques",
      "part": "Performance",
      "concepts": ["lazy loading", "code splitting", "IntersectionObserver", "dynamic import", "critical path"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is lazy loading, and how does it help improve performance?"
    },
    "answer": {
      "expectedAnswer": "Lazy loading defers fetching or rendering a resource (images, components, routes, scripts) until it's actually needed — typically when it's about to enter the viewport or the user navigates to the route that requires it — instead of loading everything up front. This reduces initial bundle size and time-to-interactive since the browser only downloads and parses what's immediately necessary for the first paint.",
      "deepExplanation": "For images, lazy loading is achieved natively via `<img loading=\"lazy\">` (browser defers download until the image nears the viewport) or manually via `IntersectionObserver`, which fires a callback when an element crosses a visibility threshold, at which point you swap a placeholder for the real `src`. For JavaScript, lazy loading is implemented via dynamic `import()`, which returns a promise resolving to the module and is bundler-recognized as a code-splitting boundary — e.g., `const Modal = React.lazy(() => import('./Modal'))` tells the bundler to emit `Modal` and its dependencies as a separate chunk, only fetched when that component actually renders (React reads a `<Suspense>` boundary to show a fallback while the chunk loads). Route-based lazy loading applies the same dynamic import per route so users downloading the app only pay for the code of the page they're on, not the entire app upfront.",
      "productionExample": "Large SPAs lazy-load route components and heavy third-party widgets (rich text editors, chart libraries, modals) so the initial JS bundle stays small and Time to Interactive improves. E-commerce product listing pages lazy-load below-the-fold product images so the browser doesn't spend bandwidth on images the user may never scroll to.",
      "bestPractices": [
        "Use native `loading=\"lazy\"` on images/iframes before reaching for a custom IntersectionObserver implementation",
        "Lazy-load routes and heavy, rarely-used components (modals, editors, charts) via dynamic import",
        "Pair React.lazy with Suspense and a lightweight fallback/skeleton to avoid layout shift",
        "Preload (not lazy-load) resources that are likely needed imminently, using `<link rel=\"preload\">` or prefetching on hover/intent",
        "Don't lazy-load above-the-fold critical content — it delays what users see first",
        "Set explicit width/height on lazy images to avoid cumulative layout shift while they load"
      ],
      "tradeOffs": "Advantages: Smaller initial bundle/faster first paint and time-to-interactive; reduced bandwidth usage for content users never reach; better Core Web Vitals scores. Disadvantages: Adds a loading delay (and often a loading state/spinner) the first time a lazy resource is actually needed; overuse can cause layout shift or a flash of missing content if not paired with placeholders; adds complexity (Suspense boundaries, error boundaries for failed chunk loads).",
      "commonMistakes": [
        "Lazy-loading above-the-fold content, delaying what the user sees immediately on load",
        "Not reserving space (width/height) for lazy images, causing layout shift when they load",
        "Forgetting to handle dynamic import() failures (e.g., a chunk fails to load after a deploy invalidates old chunk URLs) with an error boundary or retry",
        "Interview trap: `loading=\"lazy\"` on an image that's already in the initial viewport has no effect — the browser loads it immediately regardless",
        "Lazy-loading extremely small components where the network request overhead outweighs the bundle-size savings",
        "Not using a Suspense fallback with React.lazy, causing a blank screen while the chunk downloads"
      ],
      "followUpQuestions": [
        "How does React.lazy work together with Suspense?",
        "How would you lazy-load images without native loading=\"lazy\" support?",
        "What's the difference between lazy loading and code splitting?",
        "How would you handle a failed dynamic import after a new deployment invalidates old chunk hashes?",
        "When would preloading be better than lazy loading?"
      ],
      "relatedTopics": ["code splitting", "IntersectionObserver", "dynamic import", "React.lazy/Suspense", "Core Web Vitals", "prefetching"]
    }
  },
  {
    "detail": {
      "id": "jsx2-13",
      "questionNumber": "JSX2-013",
      "title": "Code splitting strategies in JavaScript projects",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Netflix", "Flipkart"],
      "frequency": 4,
      "category": "Optimization Techniques",
      "part": "Performance",
      "concepts": ["code splitting", "dynamic import", "bundlers", "chunking", "tree shaking", "route-based splitting"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Can you explain code splitting and how it can be implemented in a JavaScript project?"
    },
    "answer": {
      "expectedAnswer": "Code splitting breaks a single large JavaScript bundle into multiple smaller chunks that are loaded on demand rather than all at once, so users only download the code needed for the part of the app they're currently using. It's implemented via dynamic `import()` syntax, which bundlers like Webpack/Vite/Rollup recognize as a split point and emit as a separate lazily-fetched chunk.",
      "deepExplanation": "The three common strategies are: (1) route-based splitting — each page/route is its own chunk, loaded when the user navigates there, the highest-impact and most common approach in SPAs; (2) component-based splitting — heavy, conditionally-rendered components (modals, rich editors, charts) are split individually via `React.lazy(() => import('./Chart'))`; (3) vendor/library splitting — separating rarely-changing third-party dependencies into their own chunk so browser caching persists across app deploys even when app code changes. Bundlers build a dependency graph and, on encountering `import()`, emit a separate chunk containing that module and its unique dependencies, replacing the call site with runtime code that fetches the chunk (via a `<script>` tag insertion or module fetch) and resolves the returned promise once loaded. Shared dependencies between chunks are typically deduplicated into a common chunk to avoid downloading the same library twice. This pairs with tree-shaking (removing unused exports) as a separate but complementary optimization — code splitting controls *when* code loads, tree-shaking controls *whether* it's included at all.",
      "productionExample": "Large dashboards split each major feature area (settings, analytics, billing) into its own route chunk so the initial login/dashboard shell loads fast, with feature code fetched only when navigated to. E-commerce sites split checkout flow code separately from browsing/catalog code since most visitors never reach checkout.",
      "bestPractices": [
        "Split at route boundaries first — it has the highest impact for the least complexity",
        "Split heavy, conditionally-used components (modals, editors, charts, maps) individually",
        "Extract stable, rarely-changing vendor dependencies into a separate cacheable chunk",
        "Use Suspense/loading fallbacks or route-level loaders to handle the async chunk-fetch delay gracefully",
        "Monitor bundle size with tools like webpack-bundle-analyzer to find high-impact split candidates",
        "Avoid over-splitting into too many tiny chunks — each chunk has network request overhead"
      ],
      "tradeOffs": "Advantages: Smaller initial bundle and faster first load/time-to-interactive; better long-term caching since unchanged vendor chunks aren't re-downloaded on every deploy; scales well for large apps with many rarely-visited sections. Disadvantages: Adds runtime complexity (loading states, error boundaries for failed chunk fetches); too many small chunks increases HTTP request overhead and can hurt performance under certain network conditions; requires careful dependency graph management to avoid duplicate code across chunks.",
      "commonMistakes": [
        "Over-splitting into excessively small chunks, adding network overhead that outweighs savings",
        "Not handling chunk-load failures after a deployment invalidates old chunk hashes (users on a stale page get 404s on dynamic import)",
        "Splitting shared utility code without deduplication, causing the same code to ship in multiple chunks",
        "Interview trap: code splitting doesn't reduce total code shipped over a full user session — it defers when it's downloaded, so a user who visits every route eventually downloads it all anyway",
        "Forgetting a loading fallback, causing a jarring blank screen during chunk fetch",
        "Splitting vendor libraries that are used on every route, providing no caching benefit while adding a request"
      ],
      "followUpQuestions": [
        "How does route-based splitting differ from component-based splitting?",
        "How would you handle a dynamic import() failure caused by a new deployment invalidating chunk hashes?",
        "How does code splitting interact with tree shaking?",
        "How would you decide what NOT to split?",
        "How do bundlers deduplicate shared dependencies across multiple chunks?"
      ],
      "relatedTopics": ["dynamic import", "bundler chunking", "tree shaking", "route-based splitting", "React.lazy", "vendor chunk caching"]
    }
  },
  {
    "detail": {
      "id": "jsx2-14",
      "questionNumber": "JSX2-014",
      "title": "Optimizing loops and iterations",
      "difficulty": "Medium",
      "companies": ["Google", "Amazon", "Microsoft", "Uber", "Zoho"],
      "frequency": 3,
      "category": "Optimization Techniques",
      "part": "Performance",
      "concepts": ["loop optimization", "time complexity", "array methods", "V8 engine optimization", "caching length"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you optimize loops and iterations in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "The biggest win is almost always algorithmic — reducing time complexity (e.g., using a Set/Map for O(1) lookups instead of nested loops doing O(n) `.includes()` checks) rather than micro-optimizing loop syntax. After that, practical wins include avoiding repeated expensive work inside the loop body (like recomputing `array.length` or re-querying the DOM), choosing the right iteration construct for the job, and minimizing unnecessary intermediate array allocations from chained methods on very large datasets.",
      "deepExplanation": "Nested loops that check membership (`for (a of arr1) for (b of arr2) if (a === b)`) are O(n*m); converting `arr2` to a `Set` first drops the inner check to O(1), making the whole operation O(n+m) — this is the highest-leverage optimization and should be the first thing considered before anything else. For simple numeric iteration, a classic `for` loop is generally the fastest construct because it has the least per-iteration overhead (no iterator protocol, no callback invocation), followed by `for...of` (uses the iterator protocol, some overhead), with `.forEach`/`.map`/`.filter` typically slightly slower due to callback invocation overhead per element — though modern JIT engines optimize all of these well enough that this rarely matters outside hot paths processing millions of elements. Chaining multiple array methods (`arr.filter(...).map(...).reduce(...)`) is very readable but creates an intermediate array at each step; for very large arrays in a hot path, a single loop doing filter+map+reduce logic in one pass avoids those extra allocations. Inside any loop, hoist invariant computations (values that don't change per iteration, like `array.length` in older engines, DOM lookups, or regex compilation) out of the loop body so they run once instead of N times.",
      "productionExample": "Data-processing pipelines transforming large API responses (thousands+ rows) benefit from combining filter/map/reduce logic into a single pass, and from using Set/Map-based lookups instead of nested array searches, to keep response-rendering time low. Real-time UI updates (e.g., updating thousands of table cells) avoid DOM queries or style reads inside the loop, batching them instead.",
      "bestPractices": [
        "Optimize algorithmic complexity first — replace nested-loop lookups with Set/Map for O(1) membership checks",
        "Hoist invariant computations (DOM queries, regex compilation, expensive function calls) outside the loop",
        "Avoid unnecessary intermediate array allocations from long method chains on very large datasets in hot paths",
        "Use a plain for loop for maximum performance only when profiling shows it actually matters",
        "Avoid array/object mutation patterns inside loops that trigger unnecessary re-renders or reflows",
        "Profile with DevTools before micro-optimizing loop syntax — premature optimization often targets the wrong bottleneck"
      ],
      "tradeOffs": "Advantages: Algorithmic improvements (Set/Map lookups) can turn quadratic operations into linear ones, a massive real win; readable array methods (map/filter/reduce) are usually fast enough and much more maintainable. Disadvantages: Combining multiple operations into a single manual loop for performance sacrifices readability; over-optimizing loop syntax for micro-gains the JIT already handles is wasted engineering effort and can hurt code clarity for no measurable benefit.",
      "commonMistakes": [
        "Using nested loops for lookups instead of a Set/Map, causing O(n*m) complexity",
        "Recomputing expensive values (DOM queries, regex, length in old engines) on every iteration instead of hoisting them",
        "Chaining many array methods on huge arrays in hot paths, creating unnecessary intermediate arrays",
        "Interview trap: `array.length` caching matters far less in modern engines than commonly believed — the real win is almost always algorithmic complexity, not micro-syntax",
        "Micro-optimizing loop syntax (for vs forEach) without profiling first, wasting effort on something that isn't the actual bottleneck",
        "Mutating the array being iterated over, causing skipped or repeated elements",
        "Doing synchronous heavy work in a loop that blocks the main thread instead of chunking it"
      ],
      "followUpQuestions": [
        "How would you optimize a nested loop checking for common elements between two arrays?",
        "When would you choose a manual for loop over array methods like map/filter/reduce?",
        "How would you process a very large array without blocking the main thread?",
        "What's the time complexity difference between using .includes() in a loop vs a Set?",
        "How do you profile a slow loop to find the actual bottleneck?"
      ],
      "relatedTopics": ["time complexity", "Set/Map lookups", "array methods", "V8 JIT optimization", "main thread blocking", "profiling"]
    }
  },
  {
    "detail": {
      "id": "jsx2-15",
      "questionNumber": "JSX2-015",
      "title": "Reducing DOM manipulations for better performance",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Adobe", "Flipkart"],
      "frequency": 4,
      "category": "Optimization Techniques",
      "part": "Performance",
      "concepts": ["DocumentFragment", "batching DOM writes", "reflow/repaint", "virtual DOM", "debouncing DOM updates"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What strategies can you use to reduce DOM manipulations for better performance?"
    },
    "answer": {
      "expectedAnswer": "The core strategy is batching: build up changes off-DOM (in memory, via a DocumentFragment, or via a virtual DOM diff) and apply them to the live DOM in as few operations as possible, rather than touching the DOM repeatedly inside a loop where each mutation can trigger layout/paint work. Separating DOM reads from DOM writes also avoids forced synchronous layout ('layout thrashing').",
      "deepExplanation": "Each direct DOM mutation (appendChild, style change, attribute change) can invalidate layout and paint state; doing this N times in a loop, especially when interleaved with layout reads (offsetHeight, getComputedStyle), forces the browser to synchronously recompute layout on every iteration instead of batching the work into a single pass before the next paint. Concrete techniques: build new nodes into a `DocumentFragment` (an off-DOM, lightweight container) and append the fragment once, so the live DOM only sees one insertion instead of N; use `innerHTML` assignment for bulk static content instead of many `appendChild` calls (weighing against its XSS risk for untrusted content); detach a subtree (`element.remove()` or clone it), make many mutations off-DOM, then reattach it, so intermediate mutations don't trigger layout on a connected tree; batch reads then batch writes (`const heights = elements.map(el => el.offsetHeight); elements.forEach((el, i) => el.style.height = heights[i] + 'px')`) instead of interleaving them; and use `requestAnimationFrame` to align visual updates with the browser's paint cycle instead of firing DOM writes synchronously from high-frequency event handlers like scroll/resize (usually combined with debouncing/throttling). Virtual DOM libraries (React) formalize this pattern automatically — component updates are diffed in memory and applied to the real DOM as one batched commit.",
      "productionExample": "Rendering a large list from an API response builds all `<li>` nodes into a DocumentFragment and appends it once, rather than calling appendChild per item, avoiding a reflow per insertion. Virtualized list libraries (react-window, react-virtualized) take this further by only ever mounting the DOM nodes currently visible in the viewport, keeping the live DOM node count small regardless of total data size.",
      "bestPractices": [
        "Batch DOM insertions using DocumentFragment instead of appending nodes one at a time in a loop",
        "Separate DOM reads and DOM writes into distinct passes to avoid layout thrashing",
        "Detach a subtree before making many mutations, then reattach it once complete",
        "Use requestAnimationFrame to align visual DOM writes with the browser's paint cycle",
        "Debounce or throttle high-frequency DOM updates triggered by scroll/resize/input events",
        "Use list virtualization for very large lists so only visible items exist in the DOM",
        "Prefer a single innerHTML assignment over many individual appendChild calls for large static bulk content, being mindful of XSS with untrusted input"
      ],
      "tradeOffs": "Advantages: Dramatically reduces reflow/repaint work, especially for large bulk updates, improving perceived responsiveness and frame rate. Disadvantages: Batching techniques add code complexity (building fragments, separating read/write phases); detach/reattach patterns can cause a visible flash if not handled carefully; innerHTML-based bulk insertion risks XSS if content isn't properly sanitized.",
      "commonMistakes": [
        "Appending nodes to the live DOM one at a time in a loop instead of batching via DocumentFragment",
        "Interleaving DOM reads and writes inside a loop, forcing synchronous layout recalculation on every iteration",
        "Not virtualizing extremely large lists, mounting thousands of DOM nodes that are never visible",
        "Interview trap: reading offsetHeight/offsetWidth/getComputedStyle right after a style write forces a synchronous 'layout thrashing' flush even outside a loop",
        "Using innerHTML with unsanitized user input while trying to batch updates, introducing an XSS vulnerability",
        "Firing DOM writes directly inside scroll/resize handlers without debouncing/throttling or requestAnimationFrame",
        "Assuming a virtual DOM library eliminates the need to think about batching — excessive re-renders still cause real DOM churn"
      ],
      "followUpQuestions": [
        "What is layout thrashing and how would you detect it in DevTools?",
        "How does DocumentFragment avoid triggering multiple reflows?",
        "How does React's reconciliation process minimize real DOM operations?",
        "When would you choose list virtualization over simple batching?",
        "How would you safely use innerHTML for bulk updates without introducing XSS risk?"
      ],
      "relatedTopics": ["DocumentFragment", "layout thrashing", "reflow/repaint", "virtual DOM", "list virtualization", "requestAnimationFrame"]
    }
  },
  {
    "detail": {
      "id": "jsx2-16",
      "questionNumber": "JSX2-016",
      "title": "Deep copies vs shallow copies",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Zoho"],
      "frequency": 5,
      "category": "Object Handling",
      "part": "Advanced JS",
      "concepts": ["deep copy", "shallow copy", "reference vs value", "spread operator", "Object.assign", "structuredClone"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the difference between deep and shallow copies in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "A shallow copy creates a new top-level object/array, but any nested objects/arrays inside it are still shared references with the original — mutating a nested value affects both copies. A deep copy recursively duplicates every nested level, producing a completely independent structure where no mutation on the copy can affect the original at any depth.",
      "deepExplanation": "`Object.assign({}, obj)` and the spread operator `{ ...obj }` both perform shallow copies: they copy each own enumerable property's value, but for reference types (objects/arrays), the 'value' copied is the reference itself, not the data it points to. So `const copy = { ...original }; copy.nested.x = 1;` also changes `original.nested.x` because `copy.nested` and `original.nested` are the exact same object in memory. To get a true deep copy, every nested reference must also be recursively duplicated. Common approaches: `structuredClone(obj)` (native, modern, handles circular references, Dates, Maps, Sets, but not functions or DOM nodes); `JSON.parse(JSON.stringify(obj))` (widely used but silently drops functions/undefined/Symbols, converts Dates to strings, and throws on circular references); or a hand-written recursive clone function for full control. Primitives (numbers, strings, booleans, null, undefined) are always copied by value regardless of shallow or deep copying, since they aren't references — this distinction only matters for objects and arrays.",
      "productionExample": "Redux and other immutable-state patterns rely on shallow copies (spread) at the level being updated, combined with the convention of never mutating nested state directly, which is why libraries like Immer exist — to let developers write mutation-looking code that's actually translated into correct structural sharing under the hood. Form libraries deep-clone initial values so resetting a form doesn't accidentally reference (and later mutate) the original data source.",
      "bestPractices": [
        "Use structuredClone() for deep clones in modern environments — it's native, fast, and handles more types correctly than JSON tricks",
        "Use spread/Object.assign for shallow copies when you know you're only changing top-level properties",
        "Never rely on JSON.parse(JSON.stringify()) for objects containing functions, undefined, Symbols, Dates, or circular references",
        "Prefer immutable update patterns (or a library like Immer) over manual deep cloning for deeply nested state updates",
        "Be explicit in code review about whether a copy needs to be shallow or deep — this is a very common source of subtle bugs",
        "Test copy behavior with nested mutations to confirm the copy actually behaves as intended"
      ],
      "tradeOffs": "Advantages of shallow copy: fast, cheap, sufficient when only top-level properties change. Advantages of deep copy: full independence, safe for arbitrarily nested mutation. Disadvantages of shallow copy: silent shared-reference bugs when nested data is mutated. Disadvantages of deep copy: more expensive (time and memory), and naive implementations (JSON tricks) lose data fidelity for non-JSON-safe types.",
      "commonMistakes": [
        "Assuming spread/Object.assign performs a deep copy",
        "Using JSON.parse(JSON.stringify(obj)) on objects containing Dates, functions, undefined, or circular references and getting silently wrong/broken results",
        "Mutating a shallow-copied nested object and being surprised the original changed too",
        "Interview trap: `[...arr]` on an array of objects still shares references to those objects — only the array container itself is new",
        "Not handling circular references in a hand-written deep clone, causing infinite recursion",
        "Assuming structuredClone works for functions or DOM nodes — it throws a DataCloneError for those"
      ],
      "followUpQuestions": [
        "Why does JSON.parse(JSON.stringify()) fail on circular references?",
        "How does structuredClone differ from a hand-written recursive deep clone?",
        "What types does structuredClone NOT support?",
        "How does Immer let you write mutating-looking code while preserving immutability?",
        "How would you deep copy an object containing a Map or Set?"
      ],
      "relatedTopics": ["reference types", "structuredClone", "spread operator", "immutability", "Immer", "circular references"]
    }
  },
  {
    "detail": {
      "id": "jsx2-17",
      "questionNumber": "JSX2-017",
      "title": "Implementing a deep clone function",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Stripe"],
      "frequency": 5,
      "category": "Object Handling",
      "part": "Advanced JS",
      "concepts": ["recursion", "deep clone", "WeakMap", "circular references", "type checking", "structuredClone"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How would you implement a deep clone function in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "A correct deep clone recursively walks the input, creating a new container (object/array/Map/Set/Date/etc.) for each reference type encountered and recursively cloning its contents, while using a `WeakMap` to track already-cloned objects so that circular references and objects appearing multiple times in the structure are handled correctly instead of causing infinite recursion or duplicated clones.",
      "deepExplanation": "The recursive-descent algorithm: if the value is a primitive (or `null`), return it as-is since primitives are already immutable and copied by value. Otherwise, check the `WeakMap` cache first — if this exact reference was already cloned, return the cached clone instead of recursing again (this is what makes circular references safe, since the second time you encounter the same object you short-circuit instead of infinitely recursing). If not cached, create the appropriate empty container based on type (`[]` for arrays, `{}` for plain objects, `new Map()`, `new Set()`, `new Date(value.getTime())`), store it in the cache immediately (before recursing into children — this is the critical step that breaks cycles, since a child referencing the parent will find the parent's in-progress clone already in the cache), then recursively clone and assign each property/element/entry.\n\n```js\nfunction deepClone(value, cache = new WeakMap()) {\n  if (value === null || typeof value !== 'object') return value;\n  if (cache.has(value)) return cache.get(value);\n\n  if (value instanceof Date) return new Date(value.getTime());\n  if (value instanceof RegExp) return new RegExp(value.source, value.flags);\n\n  if (Array.isArray(value)) {\n    const result = [];\n    cache.set(value, result);\n    value.forEach((item, i) => { result[i] = deepClone(item, cache); });\n    return result;\n  }\n\n  if (value instanceof Map) {\n    const result = new Map();\n    cache.set(value, result);\n    value.forEach((v, k) => result.set(deepClone(k, cache), deepClone(v, cache)));\n    return result;\n  }\n\n  if (value instanceof Set) {\n    const result = new Set();\n    cache.set(value, result);\n    value.forEach((v) => result.add(deepClone(v, cache)));\n    return result;\n  }\n\n  const result = Object.create(Object.getPrototypeOf(value));\n  cache.set(value, result);\n  for (const key of Reflect.ownKeys(value)) {\n    result[key] = deepClone(value[key], cache);\n  }\n  return result;\n}\n```\nUsing a `WeakMap` (not a `Map`) for the cache is deliberate — it doesn't prevent garbage collection of the original objects once cloning is done and the map itself goes out of scope, and it only accepts object keys, which is exactly what's needed here.",
      "productionExample": "State-management libraries and form libraries deep-clone default/initial values so later mutations to working state never leak back into the original source data. The native `structuredClone()` API (available in modern browsers and Node 17+) now covers most real-world use cases and handles circular references, Map/Set/Date/RegExp/TypedArrays out of the box, making hand-rolled deep clones mostly an interview/legacy-support topic today.",
      "bestPractices": [
        "Use the native structuredClone() in modern environments instead of hand-rolling this in production code",
        "Cache each object in a WeakMap immediately after creating its empty shell, before recursing into its children, to correctly handle cycles",
        "Handle special built-in types explicitly: Date, RegExp, Map, Set, TypedArrays — a naive {...obj} spread-style recursive clone mishandles all of these",
        "Preserve the prototype chain with Object.create(Object.getPrototypeOf(value)) rather than always creating a plain {}",
        "Use Reflect.ownKeys (or Object.getOwnPropertyNames + getOwnPropertySymbols) to include Symbol-keyed properties, not just Object.keys",
        "Explicitly decide (and document) what happens to functions — most deep clone implementations intentionally skip/copy-by-reference them"
      ],
      "tradeOffs": "Advantages: Full control over exactly how each type is cloned; can support custom classes or non-standard types structuredClone doesn't handle. Disadvantages: Recursive implementation risks stack overflow on extremely deep structures; more code to maintain and test correctly (circular refs, special types, Symbol keys) versus just calling the native structuredClone; slower than the native, C++-implemented structuredClone for large objects.",
      "commonMistakes": [
        "Not caching the in-progress clone before recursing into children, causing infinite recursion on circular references",
        "Using a plain Map instead of WeakMap for the cache, preventing garbage collection of large temporary structures",
        "Forgetting special-case handling for Date/RegExp/Map/Set, silently turning them into plain objects",
        "Interview trap: JSON.parse(JSON.stringify()) is not a real answer to 'implement deep clone' — interviewers are testing recursion + cycle handling, not knowledge of a lossy shortcut",
        "Using Object.keys instead of Reflect.ownKeys, silently dropping Symbol-keyed properties",
        "Not preserving the prototype, turning class instances into plain objects and breaking instanceof checks",
        "Ignoring stack depth limits for very deeply nested structures, causing a RangeError"
      ],
      "followUpQuestions": [
        "How does your implementation handle circular references, and why does caching order matter?",
        "How would you deep clone a class instance while preserving its prototype and methods?",
        "How would you avoid a stack overflow for extremely deeply nested objects?",
        "What does structuredClone() do differently or better than a hand-written version?",
        "How would you clone a Map whose keys are themselves objects?"
      ],
      "relatedTopics": ["WeakMap", "recursion", "structuredClone", "circular references", "prototype chain", "Reflect.ownKeys"]
    }
  },
  {
    "detail": {
      "id": "jsx2-18",
      "questionNumber": "JSX2-018",
      "title": "Risks of object mutation and maintaining immutability",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      "frequency": 4,
      "category": "Object Handling",
      "part": "Advanced JS",
      "concepts": ["mutation", "immutability", "Object.freeze", "shared references", "pure functions", "Immer"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are the risks of mutating objects and how can immutability be maintained?"
    },
    "answer": {
      "expectedAnswer": "Because objects/arrays are passed and stored by reference, mutating one copy of a shared reference silently affects every other place holding that same reference — including framework internals (React state/props comparisons), which often rely on reference equality to detect changes. This causes hard-to-trace bugs like a component not re-rendering because React sees the same reference, or two unrelated parts of an app unexpectedly influencing each other's data.",
      "deepExplanation": "The risk is fundamentally about shared state: `const b = a; b.x = 1;` also changes `a.x` because `a` and `b` point to the same object in memory — there's no copy involved in a plain assignment. This becomes dangerous in larger systems where a reference is passed through several layers (props, function arguments, cached values) and a mutation deep in one layer silently corrupts state relied upon elsewhere, often surfacing as a bug far from its actual cause. React specifically relies on reference (`Object.is`) comparison in `useState`/`useMemo`/`React.memo`/reducer diffing to decide whether to re-render; mutating state directly (`state.items.push(x)`) keeps the same array reference, so React thinks nothing changed and skips the re-render, even though the underlying data did change. The fix is enforcing immutable update patterns: always create new containers (`{...obj, x: 1}`, `[...arr, item]`, `arr.map(...)`) instead of mutating in place, propagating that new reference up through state. `Object.freeze(obj)` provides a runtime guard — mutation attempts silently fail in non-strict mode or throw in strict mode — but it's shallow, so nested objects inside a frozen object remain mutable unless recursively frozen. Libraries like Immer solve the ergonomics problem: you write code that reads like direct mutation (`draft.items.push(x)`) but Immer, using a Proxy internally, actually produces a new immutable structure with structural sharing (unchanged parts of the tree keep the same reference for cheap equality checks) behind the scenes.",
      "productionExample": "Redux reducers and React state updates require immutable patterns for change detection to work; a common real bug is `state.list.push(newItem); return state;` in a reducer, which mutates in place and returns the same reference, causing connected components to silently not re-render. Immer is used in Redux Toolkit specifically to let developers write natural mutation syntax while Redux Toolkit still enforces true immutability under the hood.",
      "bestPractices": [
        "Always create new objects/arrays for updates (spread, map, filter, concat) instead of mutating in place",
        "Use Object.freeze (recursively if needed) to catch accidental mutations at runtime during development",
        "Adopt Immer (or Redux Toolkit, which bundles it) for complex nested state updates to keep code readable without sacrificing immutability",
        "Avoid passing mutable objects into functions that shouldn't be able to modify the caller's data — clone defensively at boundaries when needed",
        "Rely on reference-equality-aware tools (React DevTools, why-did-you-render) to catch missed immutability bugs",
        "Document and lint against direct array-mutating methods (push, splice, sort in place) on state objects"
      ],
      "tradeOffs": "Advantages: Immutability makes change detection cheap and reliable (reference comparison instead of deep equality), enables time-travel debugging/undo-redo, and eliminates whole classes of shared-mutable-state bugs. Disadvantages: Creating new objects/arrays for every update has a real (usually negligible, but not zero) memory/GC cost; naive immutable updates on deeply nested state are verbose without a helper library like Immer; Object.freeze's shallow nature can give a false sense of safety.",
      "commonMistakes": [
        "Mutating React state directly (state.items.push(x)) and being confused why the UI doesn't update",
        "Assuming Object.freeze deeply freezes nested objects when it only freezes the top level",
        "Passing a shared object into multiple parts of an app and having one mutate it, silently corrupting the others",
        "Interview trap: Object.freeze fails silently in non-strict mode — mutation attempts don't throw, they just quietly do nothing, which can mask bugs during development",
        "Using array methods like sort()/reverse()/splice() that mutate in place when an immutable copy was intended",
        "Forgetting that spreading only performs a shallow copy, so nested mutation still leaks through even after 'immutably' updating the top level"
      ],
      "followUpQuestions": [
        "Why does React fail to re-render when state is mutated directly?",
        "How does Immer achieve structural sharing under the hood?",
        "What's the difference between Object.freeze and true deep immutability?",
        "How would you enforce immutability across a large team's codebase?",
        "What's the performance cost of creating new objects on every state update versus mutating in place?"
      ],
      "relatedTopics": ["reference equality", "Object.freeze", "Immer", "Redux", "structural sharing", "pure functions"]
    }
  },
  {
    "detail": {
      "id": "jsx2-19",
      "questionNumber": "JSX2-019",
      "title": "Handling circular references in deep cloning",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Microsoft", "Amazon", "Stripe"],
      "frequency": 4,
      "category": "Object Handling",
      "part": "Advanced JS",
      "concepts": ["circular references", "WeakMap", "structuredClone", "recursion", "stack overflow"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "How do you handle circular references in deep cloning?"
    },
    "answer": {
      "expectedAnswer": "A circular reference occurs when an object (directly or transitively) references itself, e.g. `a.self = a`, or `a.b = b; b.a = a`. Naively recursing over such a structure never terminates, so a correct deep-clone implementation must track already-visited objects — typically via a `WeakMap` mapping original references to their in-progress clones — and, on encountering a reference already in that map, reuse the existing clone instead of recursing again.",
      "deepExplanation": "The key insight is *when* you register the mapping: the clone of an object must be added to the tracking map immediately after the empty container is created, but *before* recursing into that object's properties. If you wait until after fully cloning all properties to record the mapping, a property that circularly points back to the same object will recurse infinitely because the map lookup will always miss. By registering early, when the recursive call reaches the circular property, it finds the (still being populated) clone already in the map and returns that reference directly, correctly reproducing the cycle in the cloned structure without infinite recursion. `JSON.stringify` throws `TypeError: Converting circular structure to JSON` because it has no such tracking mechanism — it's a fundamental limitation of that approach, not just an edge case. The native `structuredClone()` API handles circular references correctly out of the box using this same conceptual approach internally (it's part of the structured clone algorithm used for postMessage, IndexedDB, etc., which was designed from the start to support cycles).",
      "productionExample": "Data structures like linked lists, trees with parent pointers, and certain UI framework internals (e.g., a DOM node's parentNode/childNodes forming a cycle) are naturally circular. Any general-purpose serialization/cloning utility in a library used broadly across a codebase must handle this correctly or it becomes a latent crash waiting for the first circular input.",
      "bestPractices": [
        "Register the clone in the tracking WeakMap immediately after creating the empty container, before recursing into properties",
        "Prefer the native structuredClone() which already handles cycles correctly, over hand-rolling this logic in production code",
        "Never use JSON.parse(JSON.stringify()) on data that might contain cycles — it throws",
        "Use WeakMap rather than Map for the tracking structure so temporary clone state doesn't prevent garbage collection",
        "Write an explicit test case with a self-referencing object when implementing or reviewing any custom clone/serialize utility",
        "Consider whether the domain actually needs to preserve cycles, or whether breaking them (e.g., replacing back-references with IDs) is acceptable for the use case"
      ],
      "tradeOffs": "Advantages: Correctly handling cycles makes a clone utility genuinely general-purpose and crash-proof against real-world graph-like data. Disadvantages: The tracking map adds a small amount of memory and bookkeeping overhead even for the common case of non-circular data; detecting and correctly reproducing cycles adds meaningful implementation complexity compared to a naive recursive clone.",
      "commonMistakes": [
        "Registering the clone in the tracking map only after all its properties are cloned, which fails to break the cycle and still causes infinite recursion",
        "Using JSON.parse(JSON.stringify()) on potentially circular data and being surprised by the runtime TypeError",
        "Using a regular Map instead of WeakMap, unintentionally keeping large object graphs alive longer than necessary",
        "Interview trap: candidates often mention 'just check for cycles' without explaining the specific mechanism (early registration before recursion) that actually prevents infinite recursion",
        "Not testing the implementation against a genuinely circular structure, only against nested-but-acyclic ones",
        "Assuming Object.assign/spread naturally 'handles' cycles because they're shallow — they do, but only because they don't recurse at all, which isn't the same as correctly cloning a cyclic deep structure"
      ],
      "followUpQuestions": [
        "Why must the clone be registered before recursing into its properties, not after?",
        "How does structuredClone handle circular references internally?",
        "What happens if you use JSON.stringify on a circular object, and how would you detect that ahead of time?",
        "How would you serialize (not just clone) a circular structure to a string, e.g. for logging?",
        "Would a WeakSet instead of a WeakMap work for cycle detection — why or why not?"
      ],
      "relatedTopics": ["WeakMap", "structuredClone", "recursion", "graph traversal", "JSON.stringify limitations"]
    }
  },
  {
    "detail": {
      "id": "jsx2-20",
      "questionNumber": "JSX2-020",
      "title": "Best practices for object creation and manipulation",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Zoho", "Flipkart"],
      "frequency": 3,
      "category": "Object Handling",
      "part": "Advanced JS",
      "concepts": ["object literals", "Object.freeze", "factory functions", "property descriptors", "immutability", "destructuring"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are some best practices for object creation and manipulation?"
    },
    "answer": {
      "expectedAnswer": "Prefer object literals or factory functions over `new` with mutable constructors for simple data objects; use `const` to prevent accidental rebinding; treat objects as immutable by default (spread/create new copies rather than mutating); and use `Object.freeze` and property descriptors when you need to enforce read-only or non-enumerable behavior explicitly. Also validate/guard object shape at boundaries (function params, API responses) rather than assuming structure.",
      "deepExplanation": "For simple data, object literals (`{ id, name }`) are simpler and more predictable than constructor functions or classes, and pair naturally with destructuring for clean extraction (`const { id, name } = user;`) and with the spread operator for immutable updates (`const updated = { ...user, name: 'New' };`). When an object's structure needs enforcement — e.g., preventing accidental new properties, or making certain properties non-enumerable/read-only — `Object.defineProperty`/`Object.defineProperties` give explicit control via property descriptors (`writable`, `enumerable`, `configurable`), and `Object.freeze` locks the top level entirely (though, being shallow, nested objects still need their own freeze call if full immutability is required — `Object.isFrozen` can verify). Using `Object.create(null)` avoids prototype-chain surprises for pure dictionary-style objects. For creating multiple similarly-shaped objects, factory functions (`function createUser(name) { return { name, greet() {...} }; }`) avoid the pitfalls of `this`-binding and prototype confusion that constructor functions/classes can introduce for simpler use cases, at the cost of each instance getting its own copy of any methods (no prototype sharing) unless you explicitly structure it otherwise.",
      "productionExample": "API response validation layers (e.g., using Zod or manual guards) check shape before trusting an object's structure, since JavaScript won't enforce it for you. Configuration objects are frequently frozen (`Object.freeze(config)`) at startup to guarantee no part of the app can accidentally mutate shared settings at runtime.",
      "bestPractices": [
        "Default to object literals and factory functions for simple, non-inheritance data structures",
        "Treat objects as immutable by convention — always produce new objects for updates rather than mutating",
        "Use Object.freeze for objects that must never change after creation (e.g., config, constants)",
        "Validate external/API-sourced object shapes at the boundary rather than assuming they match expectations",
        "Use property descriptors (Object.defineProperty) when you need non-enumerable or read-only fields specifically",
        "Use Object.create(null) for pure key-value dictionaries to avoid prototype-chain pitfalls",
        "Use optional chaining (?.) and nullish coalescing (??) when accessing potentially missing nested properties"
      ],
      "tradeOffs": "Advantages: Object literals and factory functions are simple, avoid `this`-binding footguns, and are easy to reason about; enforcing immutability catches bugs early and makes state changes traceable. Disadvantages: Factory functions duplicate methods per instance (no prototype sharing), costing more memory at scale compared to class-based prototype methods; strict immutability/freezing adds ceremony and can be too rigid for objects that legitimately need frequent, high-performance in-place updates (e.g., game loop state).",
      "commonMistakes": [
        "Using classes/constructors for simple data objects that don't need inheritance or shared prototype methods",
        "Assuming an API response always matches the expected TypeScript interface without runtime validation",
        "Forgetting Object.freeze is shallow, leaving nested objects mutable despite freezing the parent",
        "Interview trap: Object.freeze does not throw in non-strict mode when a mutation is attempted — it fails silently, which can hide bugs",
        "Directly mutating objects passed as function arguments, surprising the caller",
        "Overusing factory functions for large numbers of instances where prototype-based method sharing would be far more memory-efficient"
      ],
      "followUpQuestions": [
        "When would you choose a factory function over a class for creating objects?",
        "How would you enforce deep immutability beyond what Object.freeze provides?",
        "What's the memory trade-off between factory functions and prototype-based classes at scale?",
        "How would you validate the shape of an object received from an external API at runtime?",
        "What's the difference between configurable, enumerable, and writable property descriptor flags?"
      ],
      "relatedTopics": ["object literals", "factory functions", "Object.freeze", "property descriptors", "immutability", "runtime validation"]
    }
  },
  {
    "detail": {
      "id": "jsx2-21",
      "questionNumber": "JSX2-021",
      "title": "Implementing a clearAllTimeout() function",
      "difficulty": "Medium",
      "companies": ["Google", "Amazon", "Microsoft", "Uber", "Flipkart"],
      "frequency": 3,
      "category": "Timers and Events",
      "part": "Browser/Web APIs",
      "concepts": ["setTimeout", "clearTimeout", "timer id tracking", "closures", "cleanup patterns"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How would you implement a clearAllTimeout() function in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "There's no built-in way to enumerate active timers, so you must track every timer id yourself at creation time (e.g., by wrapping `setTimeout` to push each returned id into a Set or array), then implement `clearAllTimeout()` to iterate that collection and call `clearTimeout(id)` on each one, finally clearing the tracking collection itself.",
      "deepExplanation": "`setTimeout` returns an opaque numeric (in browsers) or Timeout object (in Node) id, and the only way to cancel it is to pass that exact id to `clearTimeout`. Since the browser/runtime doesn't expose a list of currently pending timers, a 'clear all' utility has to maintain its own registry: wrap the native `setTimeout` so every call is intercepted, the real timer is scheduled, and its id is stored; when the timer naturally fires, remove its id from the registry (otherwise the registry accumulates stale ids for timers that already completed); `clearAllTimeout()` then loops over the remaining ids, calls the real `clearTimeout` on each, and empties the registry.\n\n```js\nfunction createTimerManager() {\n  const activeIds = new Set();\n\n  function trackedSetTimeout(fn, delay, ...args) {\n    const id = setTimeout(() => {\n      activeIds.delete(id);\n      fn(...args);\n    }, delay);\n    activeIds.add(id);\n    return id;\n  }\n\n  function trackedClearTimeout(id) {\n    clearTimeout(id);\n    activeIds.delete(id);\n  }\n\n  function clearAllTimeout() {\n    activeIds.forEach((id) => clearTimeout(id));\n    activeIds.clear();\n  }\n\n  return { setTimeout: trackedSetTimeout, clearTimeout: trackedClearTimeout, clearAllTimeout };\n}\n```\nRemoving the id from the registry when the callback actually fires (not just when manually cleared) is essential — otherwise the Set grows unbounded over the life of a long-running app, and calling clearTimeout on an already-fired id is harmless but wasteful.",
      "productionExample": "SPAs commonly need this pattern on route change or component unmount — cancel every pending timer (toast auto-dismiss timers, polling retries, debounce timers) associated with the page being torn down to avoid callbacks firing against unmounted state. Test suites often use a similar timer registry to guarantee no timer leaks between test cases when using fake timers.",
      "bestPractices": [
        "Always remove a timer's id from the tracking registry when it naturally fires, not just when manually cleared, to avoid unbounded growth",
        "Wrap setTimeout/clearTimeout consistently everywhere in the module so no timer is created outside the tracked registry",
        "Scope the registry per relevant lifetime (e.g., per component, per request) rather than one global registry for the whole app",
        "Prefer framework-level cleanup (React's useEffect cleanup function) over global manual tracking when working within a component framework",
        "Use a Set rather than an array for O(1) add/remove of timer ids",
        "Consider AbortController-based cancellation patterns as a more modern alternative for cancelable async work generally"
      ],
      "tradeOffs": "Advantages: Gives centralized control to cancel all pending work at once (e.g., on unmount/logout), preventing stale callbacks from firing against torn-down state. Disadvantages: Requires disciplined wrapping of every setTimeout call — any direct native setTimeout call bypasses tracking; adds a small bookkeeping overhead per timer; a single global registry can become a maintenance/coupling hazard in a large app compared to scoped, per-feature registries.",
      "commonMistakes": [
        "Forgetting to remove a timer's id from the registry when it fires naturally, causing the Set to grow indefinitely over a long-running session",
        "Mixing tracked and untracked (native) setTimeout calls, so clearAllTimeout misses some timers",
        "Interview trap: clearTimeout on an id that has already fired or was never valid is a safe no-op, not an error — candidates sometimes over-engineer defensive checks that aren't needed",
        "Using a global registry shared across unrelated features, causing one feature's cleanup to unintentionally cancel another's timers",
        "Not considering setInterval alongside setTimeout if the app also needs a clearAllInterval-style utility",
        "Assuming timer ids are sequential/predictable and trying to guess them instead of tracking real return values"
      ],
      "followUpQuestions": [
        "How would you extend this to also manage setInterval timers?",
        "How would you scope timer tracking per component instead of globally?",
        "What happens if you call clearTimeout with an id that already fired?",
        "How does this pattern compare to using AbortController for cancellation?",
        "How would you test that clearAllTimeout actually prevents pending callbacks from firing?"
      ],
      "relatedTopics": ["setTimeout/clearTimeout", "timer registries", "cleanup patterns", "AbortController", "React useEffect cleanup"]
    }
  },
  {
    "detail": {
      "id": "jsx2-22",
      "questionNumber": "JSX2-022",
      "title": "The event loop and asynchronous operation management",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      "frequency": 5,
      "category": "Timers and Events",
      "part": "Browser/Web APIs",
      "concepts": ["event loop", "call stack", "callback queue", "microtask queue", "Web APIs", "single-threaded execution"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Can you explain the event loop in JavaScript and how it manages asynchronous operations?"
    },
    "answer": {
      "expectedAnswer": "JavaScript runs on a single thread with one call stack, so asynchronous work (timers, network requests, DOM events) is delegated to Web APIs (or libuv in Node) provided by the host environment; when that work completes, its callback is placed into a queue rather than run immediately. The event loop's job is to continuously check whether the call stack is empty and, if so, pull the next callback from a queue and push it onto the stack to execute — always fully draining the microtask queue before processing the next macrotask.",
      "deepExplanation": "The mental model has four pieces: the call stack (synchronous execution), Web/Node APIs (where async operations like timers, fetch, and I/O actually run outside the main thread), the macrotask queue (setTimeout/setInterval callbacks, I/O callbacks, UI events), and the microtask queue (Promise `.then`/`.catch`/`.finally` callbacks, `queueMicrotask`, and `MutationObserver`). The event loop's algorithm per iteration ('tick') is: run the current synchronous code to completion (stack empties), then drain the *entire* microtask queue — including any new microtasks scheduled by microtasks already running — before doing anything else, then run exactly one macrotask from the macrotask queue, then repeat (drain microtasks again, then browsers typically render if needed, then next macrotask). This ordering is why `Promise.resolve().then(() => console.log('microtask'))` always logs before a `setTimeout(() => console.log('macrotask'), 0)` even though both were scheduled 'immediately' — the entire microtask queue is exhausted before the event loop even looks at the macrotask queue. `async`/`await` is syntactic sugar over promises, so `await` pauses the function and schedules its continuation as a microtask exactly like `.then` would.",
      "productionExample": "Understanding this ordering is essential for debugging race conditions in UI code — e.g., a state update inside a `.then()` running before a `setTimeout`-scheduled cleanup, or a rendering framework's batched update mechanism (like React's) relying on microtask timing to flush updates before the browser paints. Node.js server code relies on the same model (with an additional 'immediate'/'nextTick' phase distinction) to keep I/O-bound servers responsive on a single thread.",
      "bestPractices": [
        "Never assume setTimeout(fn, 0) runs 'immediately' — it always runs after the current synchronous code and all pending microtasks",
        "Understand that a long-running synchronous task blocks the entire event loop, freezing UI/network handling — break up heavy work with chunking or Web Workers",
        "Use microtasks (Promises) intentionally when you need a callback to run as soon as possible after the current task but before any macrotask",
        "Be aware that infinitely recursive microtask scheduling (a promise that resolves another promise scheduling in a loop) can starve macrotasks and freeze rendering, even though it doesn't technically block the call stack in the traditional sense",
        "Use DevTools' Performance panel to visualize actual task/microtask ordering when debugging timing bugs",
        "Remember Node's event loop has additional phases (timers, I/O callbacks, check/setImmediate) beyond the simplified browser model"
      ],
      "tradeOffs": "Advantages: Single-threaded event-loop model avoids the complexity of shared-memory concurrency bugs (race conditions, locks) that multi-threaded languages face. Disadvantages: A single long synchronous task blocks everything else, including rendering and user input; the microtask-before-macrotask ordering, while well-defined, is a frequent source of subtle bugs and confusing interview questions when developers haven't internalized it.",
      "commonMistakes": [
        "Assuming setTimeout(fn, 0) executes before or in parallel with the current synchronous code",
        "Not realizing ALL pending microtasks run before the next macrotask, including ones scheduled by other microtasks during the drain",
        "Interview trap: async/await 'pausing' a function doesn't block the main thread — it yields control back to the event loop via the microtask queue, letting other code run in between",
        "Writing CPU-heavy synchronous loops that block the event loop and freeze the UI, then trying to 'fix' it with setTimeout(fn, 0) which doesn't actually free up mid-task",
        "Confusing the render step (paint) with a queue — rendering happens at specific points in the loop, not as a queued task itself",
        "Assuming Node.js and browser event loops are identical — Node has additional phases like process.nextTick and setImmediate with their own ordering rules"
      ],
      "followUpQuestions": [
        "Why does a Promise.then callback run before a setTimeout(fn, 0) callback?",
        "What happens if a microtask keeps scheduling more microtasks forever?",
        "How does async/await map onto the microtask queue under the hood?",
        "How does Node.js's event loop differ from the browser's, particularly around process.nextTick?",
        "How would you keep the UI responsive while processing a very large synchronous computation?"
      ],
      "relatedTopics": ["call stack", "microtask queue", "macrotask queue", "Promises", "async/await", "Web Workers", "Node.js event loop phases"]
    }
  },
  {
    "detail": {
      "id": "jsx2-23",
      "questionNumber": "JSX2-023",
      "title": "setTimeout vs setInterval",
      "difficulty": "Easy",
      "companies": ["Google", "Meta", "Amazon", "Flipkart", "Zoho"],
      "frequency": 5,
      "category": "Timers and Events",
      "part": "Browser/Web APIs",
      "concepts": ["setTimeout", "setInterval", "timer drift", "recursive setTimeout", "clearInterval"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is the difference between setTimeout and setInterval, and when would you use each?"
    },
    "answer": {
      "expectedAnswer": "`setTimeout(fn, delay)` schedules `fn` to run once, after at least `delay` milliseconds. `setInterval(fn, delay)` schedules `fn` to run repeatedly, roughly every `delay` milliseconds, until explicitly cancelled with `clearInterval`. Use setTimeout for one-off delayed actions (or to build a self-correcting repeating pattern), and setInterval only when you genuinely need fixed, ongoing repetition and are comfortable with its timing caveats.",
      "deepExplanation": "Both delays are minimums, not guarantees — the callback is only queued once the delay elapses, but it still has to wait for the call stack to be empty and (for setInterval specifically) for the previous tick's queued callback to have actually run; if the main thread is busy, callbacks are delayed and setInterval does *not* queue up multiple pending calls to 'catch up' — it effectively skips ticks that were blocked. A well-known problem with setInterval is drift/overlap: if `fn` itself takes longer to run than `delay`, invocations can queue up back-to-back with no gap, or worse, overlap in intent if `fn` does async work. The standard fix is 'recursive setTimeout': call `setTimeout` again from *inside* the callback after it finishes, which guarantees the next call is scheduled only after the previous one completes, naturally adapting to slow execution instead of piling up. Both return an id that must be passed to the correctly-paired clear function (`clearTimeout`/`clearInterval` — though in practice either clears either in most browser implementations, relying on that is not standards-guaranteed behavior to depend on).",
      "productionExample": "Polling an API for status updates is typically implemented with recursive setTimeout (schedule the next poll only after the current request resolves) rather than setInterval, to avoid overlapping requests if the network is slow. Simple, fixed-cadence UI updates like a digital clock's seconds display are a reasonable, low-risk use of setInterval since the callback work is trivial and fast.",
      "bestPractices": [
        "Prefer recursive setTimeout over setInterval when the callback does async or variable-duration work, to avoid overlap",
        "Always store the timer id and clear it (clearTimeout/clearInterval) during cleanup (component unmount, page navigation) to avoid leaks",
        "Don't assume the delay is exact — treat it as a lower bound, especially under main-thread load",
        "Use setInterval only for simple, fast, synchronous, fixed-cadence callbacks where drift is acceptable",
        "For polling, prefer recursive setTimeout or a dedicated interval-with-backoff utility over raw setInterval",
        "Clear timers proactively in error paths too, not just the happy path, to avoid orphaned callbacks"
      ],
      "tradeOffs": "Advantages of setInterval: simpler one-line setup for repeated fixed-cadence work. Advantages of recursive setTimeout: no overlap risk, naturally adapts if the callback takes longer than the delay, easier to make truly cancellable mid-cycle. Disadvantages of setInterval: can queue/overlap invocations if the callback is slow or async, harder to reason about under load. Disadvantages of recursive setTimeout: slightly more code/boilerplate than a single setInterval call.",
      "commonMistakes": [
        "Using setInterval with an async callback, allowing multiple overlapping invocations if requests are slow",
        "Forgetting to clearInterval, causing the callback to keep firing against unmounted/stale state indefinitely",
        "Assuming the delay is a precise, guaranteed interval rather than a minimum",
        "Interview trap: setInterval does not queue up 'missed' ticks to catch up after the main thread was blocked — it just resumes on the next available tick, effectively dropping the missed ones",
        "Not handling the case where the interval callback throws, which can silently stop future ticks in some environments or leave state inconsistent",
        "Mixing up which clear function pairs with which scheduler out of habit rather than correctness"
      ],
      "followUpQuestions": [
        "Why is recursive setTimeout often preferred over setInterval for polling?",
        "What happens to a setInterval timer if the main thread is blocked for longer than the delay?",
        "How would you implement a self-correcting interval that accounts for drift over time?",
        "How do you ensure a timer is always cleaned up, even on an error path?",
        "What's the minimum delay clamping behavior for nested/background timers in browsers?"
      ],
      "relatedTopics": ["timer drift", "polling patterns", "clearTimeout/clearInterval", "event loop", "background tab throttling"]
    }
  },
  {
    "detail": {
      "id": "jsx2-24",
      "questionNumber": "JSX2-024",
      "title": "Debouncing and throttling with timers",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Uber", "Flipkart"],
      "frequency": 5,
      "category": "Timers and Events",
      "part": "Browser/Web APIs",
      "concepts": ["debounce", "throttle", "setTimeout", "rate limiting", "closures", "trailing/leading edge"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How does debouncing and throttling work with timers?"
    },
    "answer": {
      "expectedAnswer": "Debouncing delays invoking a function until a burst of calls goes quiet for a specified duration — each new call resets the timer, so the function only runs once after the last event in the burst (e.g., search-input suggestions firing only after the user stops typing). Throttling guarantees a function runs at most once per fixed time window regardless of how many times it's called during that window, giving a steady, capped invocation rate (e.g., a scroll handler firing at most every 200ms during continuous scrolling).",
      "deepExplanation": "A debounce implementation clears any pending timer on every call and schedules a new one for `delay` ms later; only if `delay` ms pass with no further calls does the timer actually fire, so a continuous stream of calls (keystrokes) keeps resetting it indefinitely and the wrapped function fires exactly once, after the burst ends.\n\n```js\nfunction debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n```\nA throttle implementation instead tracks whether it's currently within a 'cooldown' window; the first call in a window runs immediately (or on a trailing edge, depending on variant) and sets a flag/timer for `delay` ms, during which further calls are ignored (or the last one is queued to run once the window ends, for a 'trailing edge' variant); once the window elapses, the next call is allowed through again.\n\n```js\nfunction throttle(fn, limit) {\n  let inCooldown = false;\n  return function (...args) {\n    if (inCooldown) return;\n    fn.apply(this, args);\n    inCooldown = true;\n    setTimeout(() => { inCooldown = false; }, limit);\n  };\n}\n```\nThe key conceptual difference: debounce guarantees the function fires once *after* activity stops (good for 'settled state' actions like search or auto-save); throttle guarantees the function fires at a bounded, regular *rate* even during continuous activity (good for keeping something responsive but not overwhelming, like scroll/resize handlers or drag updates).",
      "productionExample": "Search-as-you-type autocomplete debounces the API call so it only fires after the user pauses typing, avoiding a request per keystroke. Infinite-scroll pagination and window-resize-triggered layout recalculations are throttled so expensive work runs at a bounded rate (e.g., max once per 100-200ms) instead of on every single scroll/resize event, which can fire dozens of times per second.",
      "bestPractices": [
        "Use debounce for 'wait until the user is done' scenarios: search input, form validation, auto-save",
        "Use throttle for 'stay responsive but bounded' scenarios: scroll, resize, mousemove, drag handlers",
        "Choose leading-edge vs trailing-edge (or both) throttle behavior deliberately based on whether the first or last event in a burst matters more",
        "Clean up pending debounce/throttle timers on component unmount to avoid stale callbacks firing against torn-down state",
        "Use a well-tested utility (lodash's debounce/throttle) in production rather than hand-rolling unless the requirements are simple",
        "Pick delay values based on actual UX testing, not arbitrary guesses — too long feels laggy, too short defeats the purpose"
      ],
      "tradeOffs": "Advantages of debounce: minimizes redundant work to exactly one call per burst, ideal for expensive operations tied to a 'final' user action. Advantages of throttle: keeps a handler responsive throughout continuous activity while capping frequency, ideal for visual feedback during ongoing interaction. Disadvantages of debounce: no feedback during the burst itself — nothing happens until the user stops, which can feel unresponsive if misapplied to visual updates. Disadvantages of throttle: still allows a burst of activity beyond the first bounded rate, giving up some of the aggressiveness of debounce's reduction.",
      "commonMistakes": [
        "Using debounce for scroll/resize handlers where the user wants continuous feedback, not a single delayed call",
        "Using throttle for search-input suggestions, still firing multiple redundant API calls during a burst of typing",
        "Not clearing the debounce timer on unmount, causing a callback to run against a component that no longer exists",
        "Interview trap: confusing debounce and throttle definitions is extremely common — debounce = wait for quiet, throttle = cap the rate, they are not interchangeable",
        "Losing the correct `this` binding or arguments when wrapping a method, forgetting to use fn.apply(this, args)",
        "Setting a debounce/throttle delay far too long or short without empirically testing the actual UX impact"
      ],
      "followUpQuestions": [
        "Can you implement a throttle function that supports both leading and trailing edge invocation?",
        "How would you cancel a pending debounced call manually (e.g., a cancel() method)?",
        "When would you combine debounce and throttle in the same feature?",
        "How does React's batching interact with debounced state updates?",
        "How would you unit test a debounce/throttle implementation using fake timers?"
      ],
      "relatedTopics": ["debounce", "throttle", "rate limiting", "closures", "lodash utilities", "leading/trailing edge"]
    }
  },
  {
    "detail": {
      "id": "jsx2-25",
      "questionNumber": "JSX2-025",
      "title": "Microtasks vs macrotasks",
      "difficulty": "Hard",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      "frequency": 5,
      "category": "Timers and Events",
      "part": "Browser/Web APIs",
      "concepts": ["microtask queue", "macrotask queue", "Promise", "queueMicrotask", "event loop ordering"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "What is the difference between microtasks and macrotasks in the context of event handling?"
    },
    "answer": {
      "expectedAnswer": "Microtasks (Promise `.then`/`.catch`/`.finally` callbacks, `queueMicrotask`, `MutationObserver` callbacks) are processed with higher priority than macrotasks (setTimeout/setInterval callbacks, I/O, UI events, `postMessage`): after each macrotask, the event loop fully drains the entire microtask queue — including any new microtasks scheduled while draining — before running the next macrotask or letting the browser repaint. This means microtask callbacks always run sooner than macrotask callbacks scheduled around the same time, and can even starve rendering if scheduled recursively without bound.",
      "deepExplanation": "The event loop processes exactly one macrotask per loop iteration, then drains the microtask queue to *completion* — not just the microtasks present at that moment, but any additional ones scheduled by microtasks that ran during the drain, recursively, until the queue is truly empty — before moving to the next macrotask or rendering. This is why `console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4');` logs `1, 4, 3, 2` — the synchronous code runs first (1, 4), then the microtask queue is drained (3), and only then does the event loop pick up the macrotask (2). `async`/`await` uses this same microtask mechanism: everything after an `await` is effectively wrapped in a `.then()`, so it's scheduled as a microtask once the awaited promise settles. A practical danger: because the microtask queue must be fully drained before anything else happens, a microtask that keeps scheduling more microtasks (e.g., a recursive `Promise.resolve().then(loop)`) can starve the event loop entirely, blocking macrotasks and rendering indefinitely — a subtly different failure mode from a synchronous infinite loop, but with a similarly frozen-UI symptom. `queueMicrotask()` gives direct access to schedule an arbitrary microtask without going through a Promise. Node.js additionally has `process.nextTick`, which runs with even higher priority than the Promise microtask queue, draining fully before Promise microtasks are processed at all — a Node-specific wrinkle beyond the standard browser model.",
      "productionExample": "React's state-update batching and some rendering-library internals rely on microtask timing to flush a batch of updates 'as soon as possible' after the current synchronous work, without waiting for a full macrotask turn, which keeps updates feeling instantaneous while still batching multiple state changes into one render pass. Understanding this ordering is essential when debugging why a UI update inside a `.then()` appears before a sibling `setTimeout`-scheduled log, which otherwise looks like a race condition.",
      "bestPractices": [
        "Reason explicitly about micro vs macrotask ordering when debugging timing-sensitive async code rather than guessing",
        "Avoid unbounded recursive microtask scheduling, which can starve rendering and macrotasks entirely",
        "Use queueMicrotask directly when you need microtask timing without wrapping in an unnecessary Promise",
        "Remember async/await callbacks run as microtasks, so 'await'-ing something already-resolved still yields to the microtask queue, not synchronously",
        "In Node.js, be aware process.nextTick runs before Promise microtasks, which can cause different ordering than in browsers",
        "Use browser DevTools' async stack traces and performance timeline to verify actual observed ordering when in doubt"
      ],
      "tradeOffs": "Advantages: Microtasks let async code resolve results as promptly as possible (right after the current synchronous task) without waiting a full event-loop turn, which keeps promise chains and async/await feeling fast and predictable. Disadvantages: The strict 'drain fully before continuing' rule is a subtle, frequently-tested-in-interviews source of confusion, and unbounded microtask recursion is a real production footgun that can freeze an app in a way that's harder to spot than a plain infinite loop.",
      "commonMistakes": [
        "Assuming setTimeout(fn, 0) and Promise.resolve().then(fn) run in the order they were written rather than by queue priority",
        "Not realizing the microtask queue drain includes newly-scheduled microtasks, not just the ones present at drain start",
        "Interview trap: forgetting that await effectively schedules the rest of an async function as a microtask, so code 'after await' does not run synchronously even if the awaited value is already resolved",
        "Writing recursive microtask scheduling without a termination condition, silently freezing the UI while looking like the app is 'still running'",
        "Assuming Node.js and browsers order microtasks identically, ignoring process.nextTick's higher priority in Node",
        "Confusing MutationObserver callbacks (microtask-based) with regular DOM event callbacks (macrotask-based)"
      ],
      "followUpQuestions": [
        "Trace through the exact console.log output order for a mix of sync code, setTimeout, and Promise.then calls.",
        "How does process.nextTick differ in priority from the Promise microtask queue in Node.js?",
        "How can a recursive microtask starve macrotasks and rendering — what would that look like in DevTools?",
        "How does async/await map onto microtask scheduling under the hood?",
        "What's the priority relationship between microtasks, macrotasks, and browser rendering?"
      ],
      "relatedTopics": ["event loop", "Promise", "async/await", "queueMicrotask", "process.nextTick", "rendering pipeline"]
    }
  },
  {
    "detail": {
      "id": "jsx2-26",
      "questionNumber": "JSX2-026",
      "title": "Preventing Cross-Site Scripting (XSS) attacks",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Adobe"],
      "frequency": 5,
      "category": "Security in JavaScript",
      "part": "Security",
      "concepts": ["XSS", "input sanitization", "output encoding", "innerHTML", "Content Security Policy", "DOM-based XSS"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you prevent Cross-Site Scripting (XSS) attacks in JavaScript applications?"
    },
    "answer": {
      "expectedAnswer": "XSS happens when attacker-controlled input is rendered as executable HTML/JS in a victim's browser, so prevention centers on never inserting untrusted data as raw HTML — use text-setting APIs (`textContent`, framework text bindings) by default, escape/encode any data that must be rendered as HTML, sanitize with a vetted library (like DOMPurify) when rich HTML from users is genuinely required, and layer on a Content Security Policy as defense-in-depth in case an escaping mistake slips through.",
      "deepExplanation": "There are three main XSS categories: stored (malicious script saved server-side, e.g., in a comment, and served to every later viewer), reflected (malicious script embedded in a URL/query param and echoed back directly into the page's HTML by the server), and DOM-based (entirely client-side — JavaScript itself takes untrusted input, such as `location.hash` or a URL param, and unsafely writes it into the DOM via `innerHTML`, `document.write`, or similar sinks, without any server involvement). The fix is consistent across all three: never assign untrusted strings to HTML-interpreting sinks (`innerHTML`, `outerHTML`, `document.write`, `insertAdjacentHTML`, `dangerouslySetInnerHTML` in React, `eval`/`Function` constructor on untrusted strings, `href`/`src` with `javascript:` URLs). Setting `element.textContent = userInput` is always safe because it treats the value as plain text, never parsed as markup. When you genuinely need to render user-provided rich HTML (a WYSIWYG comment), pass it through a dedicated sanitizer library (DOMPurify) that strips dangerous tags/attributes/event handlers (`<script>`, `onerror=`, `javascript:` URLs) while preserving safe formatting tags, rather than attempting to hand-roll a regex-based filter, which is notoriously easy to bypass. A Content Security Policy header restricting `script-src` to trusted origins (and disallowing `unsafe-inline`) acts as a second line of defense — even if malicious markup somehow gets injected, the browser will refuse to execute inline or untrusted-origin scripts.",
      "productionExample": "React escapes all values rendered via JSX expressions (`{userInput}`) by default, which is why `dangerouslySetInnerHTML` is deliberately named to call out that it bypasses this protection and requires explicit sanitization before use. Rich-text editors and comment/markdown-rendering features in production apps universally run output through DOMPurify (or an equivalent) before insertion, and pair it with a strict CSP as defense-in-depth against sanitizer bugs.",
      "bestPractices": [
        "Default to textContent or framework text bindings for any untrusted data; never build HTML strings via concatenation with user input",
        "Sanitize with a maintained library (DOMPurify) — never hand-roll regex-based HTML sanitization",
        "Set a strict Content Security Policy disallowing unsafe-inline scripts, as defense-in-depth",
        "Treat any use of innerHTML, dangerouslySetInnerHTML, document.write, or eval on user-influenced data as a required security review point",
        "Validate/encode data appropriately for its actual output context (HTML body, HTML attribute, URL, JS string) — the correct encoding differs per context",
        "Use HttpOnly cookies for session tokens so even a successful XSS can't read them via document.cookie",
        "Audit third-party scripts/widgets, since they run with the same privileges as first-party code and are a common XSS vector"
      ],
      "tradeOffs": "Advantages: Defaulting to safe text-rendering APIs and sanitization eliminates the most common and severe class of client-side vulnerabilities with relatively low ongoing cost once established as a team convention. Disadvantages: Rich content features (comments with formatting, markdown preview) require real sanitization infrastructure and ongoing maintenance as sanitizer libraries patch new bypass techniques; overly strict CSPs can break legitimate third-party integrations and require careful tuning.",
      "commonMistakes": [
        "Using innerHTML with unsanitized user input to render dynamic content",
        "Writing a custom regex-based HTML filter instead of using a maintained sanitization library — these are almost always bypassable",
        "Using dangerouslySetInnerHTML in React without running the content through a sanitizer first",
        "Interview trap: escaping data correctly for HTML body context doesn't automatically make it safe in an HTML attribute or URL context — each output context needs its own appropriate encoding",
        "Trusting client-side validation alone and skipping server-side sanitization/escaping, since attackers can bypass the client entirely",
        "Storing sensitive tokens in localStorage/regular cookies where an XSS payload can read them via JavaScript, instead of HttpOnly cookies",
        "Forgetting DOM-based XSS sinks like location.hash, document.write, and postMessage handlers that never touch the server at all"
      ],
      "followUpQuestions": [
        "What's the difference between stored, reflected, and DOM-based XSS?",
        "Why is a custom regex-based sanitizer generally unsafe compared to a library like DOMPurify?",
        "How does a Content Security Policy provide defense-in-depth against XSS?",
        "Why should session tokens be stored in HttpOnly cookies rather than localStorage?",
        "How would you safely render user-submitted markdown with formatting?"
      ],
      "relatedTopics": ["DOMPurify", "Content Security Policy", "output encoding", "HttpOnly cookies", "dangerouslySetInnerHTML", "DOM-based XSS"]
    }
  },
  {
    "detail": {
      "id": "jsx2-27",
      "questionNumber": "JSX2-027",
      "title": "Best practices for securely consuming APIs",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Stripe", "Uber", "Zoho"],
      "frequency": 4,
      "category": "Security in JavaScript",
      "part": "Security",
      "concepts": ["HTTPS", "authentication tokens", "CORS", "rate limiting", "input validation", "secrets management"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are the best practices for consuming APIs securely in JavaScript?"
    },
    "answer": {
      "expectedAnswer": "Always call APIs over HTTPS, never embed secret API keys directly in client-side JavaScript (anything shipped to the browser is fully readable by any user), store auth tokens in HttpOnly, Secure, SameSite cookies rather than localStorage where possible, validate and handle both success and error responses defensively, and rely on the server to enforce authorization rather than trusting any client-side checks.",
      "deepExplanation": "Client-side JavaScript is fundamentally public — anything in the bundle, including a hardcoded API key, is trivially extractable by any user via DevTools, so secret credentials (private API keys, database credentials) must never live in frontend code; instead, sensitive third-party calls should be proxied through your own backend, which holds the real secret and applies its own authorization. For user authentication, storing tokens in `localStorage`/`sessionStorage` exposes them to any successful XSS (since JS can read them directly), whereas an `HttpOnly` cookie is inaccessible to JavaScript entirely, closing that attack vector; pairing it with `Secure` (HTTPS-only) and `SameSite=Strict/Lax` mitigates CSRF and cookie-theft-over-plaintext risks respectively. CORS is a browser-enforced restriction on which origins can read a cross-origin response — it protects users, not the API itself, so a public/no-CORS-restricted endpoint is not inherently 'protected' by CORS; real authorization must happen server-side regardless of what the CORS policy allows. Client code should also validate/sanitize what it sends (don't trust that only your own frontend will ever call the API) and treat every response defensively (unexpected shapes, error codes, rate-limit responses) since a compromised or malicious actor could be calling the same endpoints directly, bypassing the UI entirely.",
      "productionExample": "SPAs commonly implement a backend-for-frontend (BFF) proxy layer specifically so that third-party API keys (payment processors, maps, analytics) never ship to the browser — the frontend calls its own backend, which attaches the real secret server-side. Production auth systems increasingly favor HttpOnly refresh-token cookies with short-lived access tokens kept only in memory, precisely to limit the blast radius of a successful XSS.",
      "bestPractices": [
        "Never embed secret API keys or credentials in client-side JavaScript — proxy sensitive calls through your own backend",
        "Store authentication tokens in HttpOnly, Secure, SameSite cookies instead of localStorage/sessionStorage when possible",
        "Always use HTTPS for all API traffic, including in development where feasible, to catch mixed-content issues early",
        "Enforce authorization server-side regardless of what the client sends or what CORS allows",
        "Validate and handle error responses (4xx/5xx, malformed payloads, rate limiting) defensively on the client",
        "Rotate and scope API keys minimally (least privilege) for any key that must exist client-side (e.g., public, domain-restricted keys)",
        "Set reasonable request timeouts and implement retry/backoff logic that respects rate-limit headers"
      ],
      "tradeOffs": "Advantages: Proxying sensitive calls and using HttpOnly cookies substantially reduces the impact of both credential leakage and XSS, at a relatively small architectural cost (one extra backend hop). Disadvantages: A BFF proxy layer adds infrastructure and latency; HttpOnly cookies complicate some SPA patterns like reading the token client-side for display or manually attaching it to non-cookie-based requests (e.g., WebSocket auth), requiring extra design work.",
      "commonMistakes": [
        "Hardcoding a private API key directly in frontend JavaScript, assuming minification hides it",
        "Storing auth tokens in localStorage, exposing them to theft via any XSS vulnerability",
        "Assuming CORS restrictions protect an API from unauthorized access — CORS only restricts browser-based cross-origin reads, not direct API calls from tools like curl or Postman",
        "Interview trap: a 'public' key with domain restrictions is not equivalent to a truly secret key — it's still visible to anyone, just constrained in where it can be used",
        "Trusting client-side authorization checks (hiding a button) as a substitute for server-side enforcement",
        "Not handling rate-limit (429) responses gracefully, hammering the API with retries",
        "Sending overly permissive data in requests (entire objects) instead of only the fields actually needed"
      ],
      "followUpQuestions": [
        "Why doesn't CORS actually protect an API from unauthorized access?",
        "How would you design a proxy layer to keep a third-party API key secret?",
        "What's the security trade-off between storing tokens in HttpOnly cookies versus localStorage?",
        "How would you handle token refresh securely in a single-page app?",
        "How would you implement client-side rate-limit backoff correctly?"
      ],
      "relatedTopics": ["HttpOnly cookies", "CORS", "backend-for-frontend", "rate limiting", "least privilege", "HTTPS"]
    }
  },
  {
    "detail": {
      "id": "jsx2-28",
      "questionNumber": "JSX2-028",
      "title": "Sanitizing user inputs to prevent vulnerabilities",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Stripe"],
      "frequency": 4,
      "category": "Security in JavaScript",
      "part": "Security",
      "concepts": ["input sanitization", "input validation", "allowlisting", "SQL injection", "XSS", "output encoding"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How do you sanitize user inputs to prevent security vulnerabilities?"
    },
    "answer": {
      "expectedAnswer": "Validate input against a strict allowlist of what's expected (type, format, length, character set) and reject anything that doesn't match, rather than trying to blocklist known-bad patterns, which is always incomplete. Separately, sanitize/encode the input appropriately for the specific context it will be used in (HTML output, a database query, a shell command, a URL) since the same raw string can be dangerous in one context and perfectly safe in another.",
      "deepExplanation": "Validation and sanitization are related but distinct: validation decides whether to accept input at all (e.g., 'this must be a valid email matching this pattern, under 254 characters'), while sanitization/encoding transforms input to be safe for a specific downstream use even if it was accepted. Allowlisting (defining exactly what's permitted) is fundamentally more secure than blocklisting (trying to enumerate and block known-bad patterns), because attackers routinely find encoding tricks, alternate syntaxes, or entirely new payloads that a blocklist didn't anticipate — an allowlist has no such gap since anything not explicitly permitted is rejected by default. Critically, sanitization must be context-aware: data destined for an HTML body needs HTML entity encoding; the same data destined for a SQL query needs to go through a parameterized query / prepared statement (never string concatenation, no amount of 'escaping' a string for SQL is as safe as parameterization); data destined for a shell command needs shell-argument escaping or, better, avoiding shell invocation entirely in favor of an API that takes arguments as an array; data destined for a URL needs `encodeURIComponent`. Using the wrong context's sanitization (e.g., HTML-escaping something before putting it in a SQL query) provides no real protection for the actual destination.",
      "productionExample": "Signup/registration forms validate email format, phone number patterns, and length limits with allowlist regex/schema validation (often via a library like Zod or Yup) before ever touching a database. Backend ORMs enforce parameterized queries by default specifically so raw user input is never directly concatenated into SQL, closing off SQL injection regardless of what sanitization the frontend attempts (which should never be trusted as the only line of defense anyway).",
      "bestPractices": [
        "Validate with allowlists (expected format/type/length/charset) rather than blocklists of known-bad patterns",
        "Apply context-specific encoding: HTML entity encoding for HTML output, parameterized queries for SQL, encodeURIComponent for URLs",
        "Never build SQL queries via string concatenation with user input — always use parameterized queries/prepared statements",
        "Never trust client-side validation alone — always re-validate and sanitize on the server, since clients can be bypassed entirely",
        "Use established validation libraries (Zod, Yup, Joi) rather than hand-rolled regex validation for complex shapes",
        "Reject invalid input outright rather than silently 'cleaning' it in ways that could still leave a dangerous residual payload",
        "Limit input length and enforce type constraints early to reduce the attack surface before deeper processing"
      ],
      "tradeOffs": "Advantages: Allowlisting plus context-aware encoding closes off entire vulnerability classes (XSS, SQL injection, command injection) systematically rather than reactively patching individual payloads. Disadvantages: Strict allowlisting can reject legitimate edge-case input (unusual but valid names, international characters) if the allowlist is too narrow; maintaining context-aware sanitization correctly across many different output sinks requires discipline and can be easy to get subtly wrong.",
      "commonMistakes": [
        "Using a blocklist of known-bad strings/patterns instead of an allowlist, leaving gaps for novel attack payloads",
        "Concatenating user input directly into SQL query strings instead of using parameterized queries",
        "Applying HTML-escaping as a universal 'sanitize' step regardless of the actual output context (SQL, shell, URL)",
        "Interview trap: 'sanitizing' input once at the point of receipt doesn't protect every downstream use — the same value may need different encoding depending on where it's eventually used",
        "Relying solely on client-side validation and skipping server-side re-validation",
        "Silently stripping/mutating suspicious input instead of rejecting it outright, which can leave a subtly-still-dangerous residual string",
        "Not limiting input length, allowing extremely large payloads that enable denial-of-service via resource exhaustion"
      ],
      "followUpQuestions": [
        "Why is allowlisting generally more secure than blocklisting?",
        "Why doesn't HTML-escaping protect against SQL injection?",
        "How do parameterized queries prevent SQL injection at a mechanical level?",
        "Why can't client-side validation alone be trusted as a security boundary?",
        "How would you validate and sanitize a user-submitted file upload?"
      ],
      "relatedTopics": ["allowlisting", "parameterized queries", "output encoding", "SQL injection", "schema validation libraries", "server-side validation"]
    }
  },
  {
    "detail": {
      "id": "jsx2-29",
      "questionNumber": "JSX2-029",
      "title": "Content Security Policy (CSP) fundamentals",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Microsoft", "Adobe", "Stripe"],
      "frequency": 4,
      "category": "Security in JavaScript",
      "part": "Security",
      "concepts": ["Content Security Policy", "script-src", "nonce", "unsafe-inline", "XSS mitigation", "CSP reporting"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "What are Content Security Policies (CSP) and how do they protect JavaScript applications?"
    },
    "answer": {
      "expectedAnswer": "A Content Security Policy is an HTTP response header (`Content-Security-Policy`) that tells the browser exactly which sources are allowed to load and execute scripts, styles, images, fonts, and other resources on a page. It acts as browser-enforced defense-in-depth against XSS: even if an attacker manages to inject a malicious `<script>` tag or inline handler, the browser will refuse to execute it unless it matches an explicitly allowed source in the policy.",
      "deepExplanation": "CSP works by specifying directives like `script-src 'self' https://trusted-cdn.com`, which restricts executable scripts to same-origin files and one trusted CDN, blocking inline `<script>` tags, `onclick=` attributes, `javascript:` URLs, and `eval()`-style dynamic code execution by default unless explicitly allowed. Other directives cover other resource types: `style-src`, `img-src`, `connect-src` (for fetch/XHR/WebSocket destinations), `frame-ancestors` (controls who can iframe your site, mitigating clickjacking), and `object-src` (Flash/plugins). The critical directive for XSS mitigation is disallowing `'unsafe-inline'` for scripts — this alone blocks the vast majority of real-world XSS payloads, which rely on injecting inline `<script>` tags or event-handler attributes, because the browser simply won't execute inline script regardless of how it got into the DOM. For apps that legitimately need some inline scripts (rare in modern bundler-based apps), a per-request cryptographic `nonce` (`script-src 'nonce-<random-value>'`, with the same random value added as an attribute on the allowed script tags) or a hash of the exact script content can allowlist specific inline scripts without opening the door to arbitrary injected ones. CSP can run in enforcing mode (blocks violations) or report-only mode (`Content-Security-Policy-Report-Only`, logs violations without blocking, useful for testing a new policy before rolling it out) and can be configured to POST violation reports to an endpoint (`report-uri`/`report-to`) for monitoring.",
      "productionExample": "Financial and healthcare applications commonly deploy strict CSPs disallowing `unsafe-inline` and `unsafe-eval`, combined with nonce-based script allowlisting for any necessary inline bootstrapping code, specifically to blunt the impact of any XSS vulnerability that slips past input sanitization. Many companies roll out a new or tightened CSP in report-only mode first, monitoring violation reports for weeks to catch legitimate resources that would otherwise break, before switching to full enforcement.",
      "bestPractices": [
        "Disallow 'unsafe-inline' and 'unsafe-eval' in script-src wherever possible — this blocks the majority of real-world XSS payloads",
        "Use nonces or hashes to allowlist specific necessary inline scripts instead of broadly permitting all inline script",
        "Roll out a new or changed CSP in report-only mode first, monitor violation reports, then switch to enforcing",
        "Scope script-src/style-src/connect-src to only the specific trusted origins actually needed, not wildcard domains",
        "Set frame-ancestors to prevent clickjacking via unauthorized iframing of your site",
        "Treat CSP as defense-in-depth, not a replacement for proper input sanitization and output encoding",
        "Regularly audit and tighten the policy as third-party dependencies change"
      ],
      "tradeOffs": "Advantages: Provides strong, browser-enforced protection against the execution of injected scripts even if sanitization fails somewhere, and mitigates clickjacking via frame-ancestors. Disadvantages: A strict CSP can break legitimate functionality (third-party widgets, inline analytics snippets, certain bundler outputs) if not carefully scoped and tested; maintaining nonces/hashes for necessary inline scripts adds build/deployment complexity; overly permissive policies (broad wildcards, unsafe-inline left enabled) provide a false sense of security.",
      "commonMistakes": [
        "Including 'unsafe-inline' in script-src, which defeats most of CSP's XSS-mitigation value",
        "Using wildcard source lists (e.g., *.example.com or https:) that are too permissive to meaningfully restrict anything",
        "Deploying a new strict CSP directly to enforcing mode without testing in report-only mode first, breaking production",
        "Interview trap: CSP is a mitigation/defense-in-depth layer, not a substitute for actually fixing the underlying injection vulnerability through sanitization",
        "Forgetting that CSP applies per-response header and must be present on every response, not just the main HTML document, for full coverage",
        "Not setting frame-ancestors, leaving the site vulnerable to being iframed for clickjacking despite having a script-src policy",
        "Using a static nonce value repeated across requests instead of generating a fresh one per response, which defeats its purpose"
      ],
      "followUpQuestions": [
        "How does a nonce-based CSP allow specific inline scripts without opening up XSS generally?",
        "Why should you roll out a new CSP in report-only mode before enforcing it?",
        "How does frame-ancestors help prevent clickjacking?",
        "What's the difference between script-src and connect-src?",
        "Why is disallowing unsafe-eval important, and what legitimate code patterns does it break?"
      ],
      "relatedTopics": ["script-src directive", "nonce-based CSP", "clickjacking", "frame-ancestors", "report-only mode", "XSS defense-in-depth"]
    }
  },
  {
    "detail": {
      "id": "jsx2-30",
      "questionNumber": "JSX2-030",
      "title": "Protecting against CSRF attacks",
      "difficulty": "Medium",
      "companies": ["Google", "Meta", "Amazon", "Microsoft", "Stripe"],
      "frequency": 4,
      "category": "Security in JavaScript",
      "part": "Security",
      "concepts": ["CSRF", "SameSite cookies", "CSRF tokens", "state-changing requests", "same-origin policy"],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "How can you protect your application against CSRF (Cross-Site Request Forgery) attacks?"
    },
    "answer": {
      "expectedAnswer": "CSRF tricks a logged-in user's browser into sending an authenticated, state-changing request to your site from a malicious third-party page, exploiting the fact that browsers automatically attach cookies to same-site requests regardless of which page initiated them. Defenses are layered: set authentication cookies with `SameSite=Lax` or `Strict` so they aren't sent on cross-site requests, and additionally require a unique, unpredictable CSRF token (submitted in the request body or a custom header, not a cookie) that the server validates against the value tied to the user's session.",
      "deepExplanation": "The attack works because cookie-based auth is automatic: if a user is logged into `bank.com` and visits a malicious `evil.com` page containing a hidden auto-submitting form that POSTs to `bank.com/transfer`, the browser will attach the user's `bank.com` session cookie to that request just like any legitimate request, and if the server only checks 'is there a valid session cookie', it can't distinguish a real user action from a forged one. The `SameSite` cookie attribute is the modern first line of defense: `SameSite=Strict` never sends the cookie on any cross-site request (even top-level navigation), `SameSite=Lax` (the current browser default when unspecified) sends it on top-level GET navigations but not on cross-site POST/fetch/form-submission-triggered requests, which blocks the classic CSRF pattern while still allowing normal link-following. Because SameSite alone doesn't cover every edge case (e.g., subdomain takeover scenarios, or when Lax is needed for legitimate cross-site GET navigation flows), the traditional synchronizer-token pattern remains important defense-in-depth: the server generates a random, unpredictable CSRF token tied to the user's session, embeds it in forms/API responses, and requires the client to send it back in the request body or a custom header on every state-changing request; since a third-party attacker page has no way to read that token (same-origin policy prevents it from fetching your page's content), it can't include a valid token in its forged request, so the server rejects it. Custom headers alone (e.g., requiring `X-Requested-With`) also provide some protection because simple cross-site form submissions can't set arbitrary headers, only fetch/XHR from the same origin can (again enforced by CORS/same-origin policy).",
      "productionExample": "Modern frameworks (Django, Rails, ASP.NET, and most Node.js frameworks) ship built-in CSRF token middleware that auto-injects a token into forms and validates it on submission. Banking and payment applications layer both SameSite=Strict cookies and explicit synchronizer tokens for state-changing actions like fund transfers, treating either mechanism alone as insufficient for high-value operations.",
      "bestPractices": [
        "Set authentication cookies with SameSite=Lax or Strict as the first line of defense against CSRF",
        "Implement synchronizer CSRF tokens for state-changing requests (POST/PUT/DELETE) as defense-in-depth beyond SameSite",
        "Never rely on GET requests for state-changing operations — CSRF and SameSite=Lax both specifically target unsafe methods",
        "Validate the CSRF token server-side against the session on every state-changing request, not just presence-check it",
        "Require custom headers (e.g., X-Requested-With) for AJAX state-changing calls, since forged cross-site form submissions can't set them",
        "Use framework-provided CSRF protection middleware rather than hand-rolling token generation/validation",
        "Re-verify sensitive actions (password change, fund transfer) with re-authentication as an additional layer beyond CSRF tokens"
      ],
      "tradeOffs": "Advantages: SameSite cookies plus synchronizer tokens together provide strong, well-understood, widely-supported protection against CSRF with minimal performance cost. Disadvantages: SameSite=Strict can break legitimate cross-site linking flows (e.g., arriving at a logged-in state via an external link) unless carefully chosen between Strict and Lax; token-based defenses add implementation complexity (token generation, storage, rotation, and validation on every relevant endpoint) and can complicate purely stateless API designs.",
      "commonMistakes": [
        "Relying on cookies alone for authentication with no SameSite attribute set, leaving the classic CSRF vector fully open",
        "Using GET requests for state-changing actions, which bypasses SameSite=Lax's protection (Lax still allows top-level GET navigation)",
        "Checking only for the presence of a CSRF token without validating it matches the session's expected value",
        "Interview trap: CSRF and XSS are different vulnerability classes with different defenses — a CSRF token doesn't protect against XSS, and CSP doesn't protect against CSRF; conflating them is a common interview mistake",
        "Storing the CSRF token in a regular (non-HttpOnly is fine, but non-SameSite-protected) cookie that gets auto-sent, defeating the point of requiring it be explicitly included by legitimate same-origin JS",
        "Assuming CORS protects against CSRF — CORS controls whether a cross-origin script can read a response, but a forged form submission doesn't need to read the response at all, only trigger the side effect",
        "Not applying CSRF protection uniformly across all state-changing endpoints, leaving gaps"
      ],
      "followUpQuestions": [
        "Why doesn't CORS protect against CSRF even though both involve cross-origin requests?",
        "What's the difference between SameSite=Strict and SameSite=Lax in terms of what they actually block?",
        "How does the synchronizer token pattern prevent an attacker from forging a valid request?",
        "Why is using GET for state-changing actions dangerous with respect to CSRF?",
        "How would you protect a purely stateless, token-based (non-cookie) API against CSRF?"
      ],
      "relatedTopics": ["SameSite cookies", "synchronizer token pattern", "same-origin policy", "CORS", "XSS vs CSRF", "state-changing requests"]
    }
  }
];