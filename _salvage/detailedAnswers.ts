import { type Question } from './questions';

export interface DetailedAnswer {
  coreConcept: string;
  guideline?: string;
  features?: Array<{ name: string; concept: string; code?: string }>;
  interviewQuestion?: { title: string; code: string; output: string };
  oneLineAnswer?: string;
  bestPractice?: string;
  seniorNuance?: string;
  codeBuiltin?: string;
  codeCustom?: string;
}

export const DETAILED_ANSWERS: Record<number, DetailedAnswer> = {
  1: {
    "coreConcept": "var is function-scoped, can be redeclared and reassigned, and is hoisted with undefined initialization.\n\nlet is block-scoped, can be reassigned but not redeclared, and is hoisted but remains in the Temporal Dead Zone until initialized.\n\nconst is block-scoped, cannot be redeclared or reassigned, must be initialized during declaration, and for objects/arrays the reference is fixed but internal values can still be modified.",
    "guideline": "In modern JavaScript, we generally use:\n- const by default\n- let when value changes\n- avoid var in production code",
    "oneLineAnswer": "var is function-scoped with undefined hoisting. let is block-scoped and reassignable with TDZ hoisting. const is block-scoped, non-reassignable, and requires initialization.",
    "bestPractice": "const API_URL = \"https://api.com\"; // default\nlet count = 0; // if value changes\n// avoid var",
    "seniorNuance": "let and const still hoist! They just hoist into a \"Temporal Dead Zone\" (TDZ).",
    "features": [
        {
            "name": "var",
            "concept": "Function scope: var variables are scoped to the function they are declared in, not blocks. Redeclaration and reassignment are allowed. Hoisted with undefined initialization.",
            "code": "// Function Scope\nfunction test() {\n  var name = \"Rasik\";\n  console.log(name);\n}\ntest(); // Rasik\nconsole.log(name); // Error\n\n// Redeclare & Reassign\nvar age = 25;\nvar age = 30; // Redeclare allowed\nage = 35;     // Reassign allowed\nconsole.log(age); // 35\n\n// Hoisting\nconsole.log(a); // undefined\nvar a = 10;"
        },
        {
            "name": "let",
            "concept": "Block scope: let variables are scoped to the nearest enclosing block {}. Reassignment is allowed, but redeclaration in the same scope is a SyntaxError. Hoisted but remains in the Temporal Dead Zone (TDZ) until the declaration is executed.",
            "code": "// Block Scope\nif (true) {\n  let city = \"Chennai\";\n}\nconsole.log(city); // Error\n\n// Reassign Allowed\nlet age = 25;\nage = 30;\nconsole.log(age); // 30\n\n// Redeclare Not Allowed\nlet score = 25;\nlet score = 30; // Error\n\n// TDZ\nconsole.log(a); // Error\nlet a = 10;"
        },
        {
            "name": "const",
            "concept": "Block scope: const variables are scoped to blocks. Reassignment is a TypeError. Must be initialized immediately at declaration. For objects/arrays, the reference binding is immutable, but the object/array contents can be mutated.",
            "code": "// Must Initialize\nconst PI = 3.14;\nconst PI_ERR; // Error\n\n// Cannot Reassign\nconst RATE = 3.14;\nRATE = 4; // Error\n\n// Object Can Change\nconst user = { name: \"Rasik\" };\nuser.name = \"Nizam\";\nconsole.log(user.name); // Nizam\n\n// Cannot Change Reference\nconst config = { name: \"Rasik\" };\nconfig = {}; // Error"
        }
    ],
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// var (Uses shared function scope binding)\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Output: 3, 3, 3\n\n// let (Creates a new block scoped binding per iteration)\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Output: 0, 1, 2",
        "output": "3\n3\n3\n0\n1\n2"
    }
},
  2: {
    "coreConcept": "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope before code execution. This applies to variable declarations (var, let, const), function declarations, and class declarations. Crucially, only the declarations are hoisted, not the initializations.",
    "guideline": "Write code that declares variables at the top of their respective scopes, or use ES6 modules and block scoping (let/const) to avoid bugs related to hoisting.",
    "oneLineAnswer": "Hoisting is the compiler mechanism where variable and function declarations are put into memory during compilation, making them accessible before code execution.",
    "bestPractice": "Always use let and const instead of var to ensure variables cannot be accessed before their declaration (avoiding temporal dead zone bugs).",
    "seniorNuance": "Class declarations are hoisted but remain uninitialized, exactly like let and const.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(foo); // [Function: foo] - Functions are hoisted first and take priority\nvar foo = \"Bar\";\nfunction foo() {\n  return \"Foo\";\n}\nconsole.log(foo); // \"Bar\" - Reassignment during runtime overrides function",
        "output": "[Function: foo]\nBar"
    }
},
  4: {
    "coreConcept": "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In short: a function remembers and accesses its outer variables even after the outer function has finished executing.",
    "seniorNuance": "Closures can lead to memory leaks if not handled carefully. If a large object is retained in a closure's lexical environment and the inner function lives on globally (like in an event listener), that memory cannot be garbage collected.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    console.log(count);\n  };\n}\nconst counter = createCounter();\ncounter();\ncounter();",
        "output": "1\n2"
    }
},
  5: {
    "coreConcept": "Scope determines the accessibility and visibility of variables, objects, and functions in different parts of your code. JavaScript has three types of scope:\n1. Global Scope: Accessible everywhere.\n2. Function Scope: Declared inside a function, accessible only within that function.\n3. Block Scope: Declared with let/const inside a block {}, accessible only within that block.",
    "oneLineAnswer": "Scope defines the visibility and accessibility boundaries of variables and functions in JavaScript.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "if (true) {\n  var globalVar = \"var is function-scoped\";\n  let blockVar = \"let is block-scoped\";\n}\nconsole.log(globalVar); // \"var is function-scoped\"\nconsole.log(blockVar);  // ReferenceError: blockVar is not defined",
        "output": "var is function-scoped\nReferenceError: blockVar is not defined"
    }
},
  6: {
    "coreConcept": "JavaScript data types are divided into two main categories:\n1. Primitives: Immutable values copied by value. These include string, number, boolean, undefined, null, symbol, and bigint.\n2. Objects: Mutable structures containing properties, copied by reference. These include objects, arrays, functions, dates, etc.",
    "oneLineAnswer": "Primitives are immutable values copied by value, while Objects are mutable structures copied by reference.",
    "seniorNuance": "Comparing two identical primitives (5 === 5) evaluates to true. Comparing two structurally identical reference types ({} === {}) evaluates to false because they point to different memory addresses.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Primitive Copy\nlet a = 10;\nlet b = a;\nb = 20;\nconsole.log(a); // 10\n\n// Object Copy\nlet obj1 = { name: \"Rasik\" };\nlet obj2 = obj1;\nobj2.name = \"Nizam\";\nconsole.log(obj1.name); // \"Nizam\"",
        "output": "10\nNizam"
    }
},
  10: {
    "coreConcept": "The rest parameter syntax (...) allows a function to accept an indefinite number of arguments as an array, or destructures remaining elements of arrays/objects. It must always be the last parameter in the destructuring/function parameter list.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4));",
        "output": "10"
    }
},
  11: {
    "coreConcept": "Destructuring assignment is a special syntax that allows unpacking values from arrays or properties from objects into distinct variables in a highly readable manner.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const user = { name: \"Alice\", age: 25 };\nconst { name, age } = user;\nconsole.log(name, age);\n\nconst colors = [\"red\", \"blue\"];\nconst [first] = colors;\nconsole.log(first);",
        "output": "Alice 25\nred"
    }
},
  12: {
    "coreConcept": "Arrow functions provide a shorter syntax for writing function expressions. They do not have their own binding for the 'this' keyword, arguments object, super, or new.target; instead, they inherit 'this' lexically from their enclosing scope. They cannot be used as constructor functions.",
    "seniorNuance": "Because they lack their own this, arrow functions cannot be used as constructors (calling them with new throws a TypeError), and methods like .bind(), .call(), or .apply() have no effect on their this context.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const add = (a, b) => a + b;\nconsole.log(add(5, 3));",
        "output": "8"
    }
},
  14: {
    "coreConcept": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be in one of three states:\n1. Pending: Initial state, neither fulfilled nor rejected.\n2. Fulfilled: The operation completed successfully.\n3. Rejected: The operation failed with an error.",
    "oneLineAnswer": "A Promise is an object that handles asynchronous computations, resolving to a value or rejecting with an error.",
    "seniorNuance": "Once a Promise settles, its state is immutable. You can attach multiple .then() handlers to the same promise, and they will all execute cleanly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const promise = new Promise((resolve) => resolve(10));\npromise\n  .then(val => val * 2)\n  .then(val => console.log(val));",
        "output": "20"
    }
},
  15: {
    "coreConcept": "async/await is syntactic sugar built on top of Promises. An async function automatically returns a Promise, and the await keyword pauses the execution of the async function until the awaited Promise settles (resolves or rejects), making async code read like synchronous code.",
    "oneLineAnswer": "async/await is a modern syntax to write cleaner, synchronous-looking asynchronous code based on Promises.",
    "seniorNuance": "await pauses the execution of the async function, yielding control back to the event loop pool. It does not block the entire main browser thread.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "async function fetchData() {\n  return \"Fetched Data\";\n}\nfetchData().then(console.log);",
        "output": "Fetched Data"
    }
},
  21: {
    "coreConcept": "The Event Loop is the mechanism that allows JavaScript to perform non-blocking, concurrent executions despite being single-threaded. It constantly monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it pushes the first task from the queue onto the Call Stack for execution, prioritizing the Microtask Queue over the Macrotask Queue.",
    "oneLineAnswer": "The Event Loop is the loop that handles asynchronous callbacks by pushing them from queues onto the Call Stack when it is empty.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Start\");\nsetTimeout(() => console.log(\"Timeout (Macrotask)\"), 0);\nPromise.resolve().then(() => console.log(\"Promise (Microtask)\"));\nconsole.log(\"End\");",
        "output": "Start\nEnd\nPromise (Microtask)\nTimeout (Macrotask)"
    }
},
  22: {
    "coreConcept": "The Macrotask Queue holds events and callbacks for timers, UI rendering events, and user inputs. The event loop pulls one macrotask from the queue, runs it, then clears all microtasks before fetching the next macrotask.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "setTimeout(() => console.log(\"Macrotask\"), 0);",
        "output": "Macrotask"
    }
},
  28: {
    "coreConcept": "The Prototype Chain is JavaScript's mechanism for inheritance. Every object has an internal link to another object called its prototype (accessible via Object.getPrototypeOf or __proto__). When accessing a property or method, JS checks the object itself; if not found, it traverses up the prototype chain until it finds the property or reaches null.",
    "oneLineAnswer": "The Prototype Chain is a linked list of prototype objects that JavaScript traverses to look up properties and support inheritance.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const parent = { hair: \"black\" };\nconst child = Object.create(parent);\nchild.eyes = \"blue\";\nconsole.log(child.eyes); // \"blue\" (own property)\nconsole.log(child.hair); // \"black\" (inherited property)",
        "output": "blue\nblack"
    }
},
  29: {
    "coreConcept": "call(), apply(), and bind() are methods used to control the 'this' context of a function:\n- call(): Invokes the function immediately, passing arguments individually.\n- apply(): Invokes the function immediately, passing arguments as an array.\n- bind(): Returns a new function with the 'this' context bound, to be called later.",
    "oneLineAnswer": "call and apply invoke a function with custom 'this' context immediately, while bind returns a new function with bound context.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const person = { name: \"Alice\" };\nfunction greet(greeting, punctuation) {\n  return greeting + \", \" + this.name + punctuation;\n}\nconsole.log(greet.call(person, \"Hello\", \"!\"));\nconsole.log(greet.apply(person, [\"Hi\", \".\"]));\nconst bound = greet.bind(person, \"Hey\");\nconsole.log(bound(\"?\"));",
        "output": "Hello, Alice!\nHi, Alice.\nHey, Alice?"
    }
},
  41: {
    "coreConcept": "The V8 Engine is Google's open-source high-performance JavaScript and WebAssembly engine, written in C++. It compiles JavaScript code directly into native machine code before executing it, using JIT (Just-In-Time) compilation. It manages memory heap allocation and performs garbage collection.",
    "oneLineAnswer": "V8 is a high-performance C++ engine that JIT-compiles JavaScript directly to machine code for browsers and Node.js.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function Point(x, y) {\n  this.x = x;\n  this.y = y;\n}\nconst p1 = new Point(1, 2);\nconst p2 = new Point(3, 4);\n// Keeping the shape/hidden class of objects identical helps V8 optimize JIT execution.",
        "output": "Objects initialized in the same order share a hidden class, optimizing performance."
    }
},
  42: {
    "coreConcept": "Garbage Collection (GC) is JavaScript's automatic memory management system. It periodically sweeps the memory heap to free up memory allocated to objects that are no longer reachable from the root execution contexts.",
    "oneLineAnswer": "Garbage Collection automatically frees memory of unreachable objects using the Mark-and-Sweep algorithm.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let user = { name: \"John\" };\nuser = null; // The { name: \"John\" } object is now unreachable from the global root and will be garbage collected.",
        "output": "Unreachable object memory is reclaimed automatically."
    }
},
  43: {
    "coreConcept": "Hidden Classes (or Shapes) are V8's internal optimization technique. Since JS is dynamically typed and properties can be added dynamically, lookup is slow. V8 assigns a hidden class to objects. If objects share the same properties added in the same order, they share the same hidden class, allowing fast lookup via inline caching.",
    "oneLineAnswer": "Hidden Classes are V8 structures that group objects with the same layout/shape to optimize property access.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj1 = {}; obj1.a = 1; obj1.b = 2;\nconst obj2 = {}; obj2.b = 2; obj2.a = 1;\n// obj1 and obj2 have different hidden class transition paths because properties were added in a different order!",
        "output": "Adding properties in different orders creates separate hidden classes, slowing access."
    }
},
  49: {
    "coreConcept": "Runtime Optimization involves writing JS code in a way that helps compilation engines optimize it. Practices include monomorphic function invocation, avoiding 'delete' operators (which alters shapes), and reusing objects to minimize GC pauses.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Avoid delete\nconst obj = { x: 1 };\nobj.x = undefined; // Better than delete obj.x",
        "output": "Shape preserved, inline caching active."
    }
},
  54: {
    "coreConcept": "Reactive Programming is a declarative programming paradigm concerned with data streams and the propagation of change. Elements emit events over time, and observers react to changes dynamically.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Emulating data streams\nconst stream = {\n  subscribe: (cb) => { setTimeout(() => cb(1), 10); }\n};\nstream.subscribe(console.log);",
        "output": "1"
    }
},
  56: {
    "coreConcept": "Write a function reverseString(str) that takes a string and returns it reversed.",
    "codeBuiltin": "function reverseStringBuiltIn(str) {\n    return str.split('').reverse().join('');\n}",
    "codeCustom": "function reverseStringCustom(str) {\n    let reversed = '';\n    for (let i = str.length - 1; i >= 0; i--) {\n        reversed += str[i];\n    }\n    return reversed;\n}"
},
  57: {
    "coreConcept": "Check if a string reads the same forward and backward.",
    "codeBuiltin": "function isPalindromeBuiltIn(str) {\n    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();\n    return cleaned === cleaned.split('').reverse().join('');\n}",
    "codeCustom": "function isPalindromeCustom(str) {\n    let left = 0;\n    let right = str.length - 1;\n    \n    while (left < right) {\n        if (str[left].toLowerCase() !== str[right].toLowerCase()) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n}"
},
  58: {
    "coreConcept": "Find two indices that add up to a target value.",
    "codeBuiltin": "function twoSumBuiltIn(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
    "codeCustom": "function twoSumCustom(nums, target) {\n    for (let i = 0; i < nums.length; i++) {\n        for (let j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] === target) {\n                return [i, j];\n            }\n        }\n    }\n    return [];\n}"
},
  59: {
    "coreConcept": "Return an array where each element is the product of all others except self.",
    "codeBuiltin": "function productExceptSelfBuiltIn(nums) {\n    return nums.map((_, i) => \n        nums.reduce((acc, val, j) => i === j ? acc : acc * val, 1)\n    );\n}",
    "codeCustom": "function productExceptSelfCustom(nums) {\n    const length = nums.length;\n    const answer = new Array(length);\n    \n    answer[0] = 1;\n    for (let i = 1; i < length; i++) {\n        answer[i] = nums[i - 1] * answer[i - 1];\n    }\n    \n    let rightProduct = 1;\n    for (let i = length - 1; i >= 0; i--) {\n        answer[i] = answer[i] * rightProduct;\n        rightProduct *= nums[i];\n    }\n    \n    return answer;\n}"
},
  60: {
    "coreConcept": "Find length of longest substring with no repeating characters.",
    "codeBuiltin": "function lengthOfLongestSubstringBuiltIn(s) {\n    let set = new Set();\n    let left = 0, maxLength = 0;\n    \n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[right]);\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    return maxLength;\n}",
    "codeCustom": "function lengthOfLongestSubstringCustom(s) {\n    const charMap = {};\n    let maxLength = 0;\n    let left = 0;\n    \n    for (let right = 0; right < s.length; right++) {\n        const currentChar = s[right];\n        \n        if (charMap[currentChar] !== undefined && charMap[currentChar] >= left) {\n            left = charMap[currentChar] + 1;\n        }\n        \n        charMap[currentChar] = right;\n        let currentWindowLength = right - left + 1;\n        if (currentWindowLength > maxLength) {\n            maxLength = currentWindowLength;\n        }\n    }\n    return maxLength;\n}"
},
  61: {
    "coreConcept": "Check if bracket sequence is valid using a stack.",
    "codeBuiltin": "function isValidBuiltIn(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    \n    for (let char of s) {\n        if (char === '(' || char === '{' || char === '[') {\n            stack.push(char);\n        } else if (stack.pop() !== map[char]) {\n            return false;\n        }\n    }\n    return stack.length === 0;\n}",
    "codeCustom": "function isValidCustom(s) {\n    const stack = new Array(s.length);\n    let top = -1;\n    \n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (char === '(' || char === '{' || char === '[') {\n            stack[++top] = char;\n        } else {\n            if (top === -1) return false;\n            const last = stack[top--];\n            if (char === ')' && last !== '(') return false;\n            if (char === '}' && last !== '{') return false;\n            if (char === ']' && last !== '[') return false;\n        }\n    }\n    return top === -1;\n}"
},
  62: {
    "coreConcept": "Group strings that are anagrams of each other.",
    "codeBuiltin": "function groupAnagramsBuiltIn(strs) {\n    const map = new Map();\n    for (let str of strs) {\n        const sorted = str.split('').sort().join('');\n        if (!map.has(sorted)) map.set(sorted, []);\n        map.get(sorted).push(str);\n    }\n    return Array.from(map.values());\n}",
    "codeCustom": "function groupAnagramsCustom(strs) {\n    const groups = {};\n    \n    for (let i = 0; i < strs.length; i++) {\n        const str = strs[i];\n        const counts = new Array(26);\n        for (let k = 0; k < 26; k++) counts[k] = 0;\n        \n        for (let j = 0; j < str.length; j++) {\n            counts[str.charCodeAt(j) - 97]++;\n        }\n        \n        let key = '';\n        for (let c = 0; c < 26; c++) {\n            key += '#' + counts[c];\n        }\n        \n        if (!groups[key]) {\n            groups[key] = [];\n        }\n        groups[key].push(str);\n    }\n    \n    const result = [];\n    for (let key in groups) {\n        result.push(groups[key]);\n    }\n    return result;\n}"
},
  63: {
    "coreConcept": "Implement a deep clone function handling nested structures.",
    "codeBuiltin": "function deepCloneBuiltIn(obj) {\n    return structuredClone(obj);\n}",
    "codeCustom": "function deepCloneCustom(obj) {\n    if (obj === null || typeof obj !== 'object') return obj;\n    \n    if (obj instanceof Date) return new Date(obj.getTime());\n    if (obj instanceof RegExp) return new RegExp(obj);\n    \n    const clone = Array.isArray(obj) ? [] : {};\n    for (let key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            clone[key] = deepCloneCustom(obj[key]);\n        }\n    }\n    return clone;\n}"
},
  64: {
    "coreConcept": "Write a debounce utility function from scratch.",
    "codeBuiltin": "function debounceBuiltIn(func, delay) {\n    let timeoutId;\n    return function (...args) {\n        clearTimeout(timeoutId);\n        timeoutId = setTimeout(() => func.apply(this, args), delay);\n    };\n}",
    "codeCustom": "function debounceCustom(func, delay) {\n    let timer = null;\n    return function() {\n        const context = this;\n        const args = arguments;\n        if (timer) {\n            clearTimeout(timer);\n        }\n        timer = setTimeout(function() {\n            func.apply(context, args);\n        }, delay);\n    };\n}"
},
  65: {
    "coreConcept": "Write a throttle utility function from scratch.",
    "codeBuiltin": "function throttleBuiltIn(func, limit) {\n    let inThrottle;\n    return function (...args) {\n        if (!inThrottle) {\n            func.apply(this, args);\n            inThrottle = true;\n            setTimeout(() => inThrottle = false, limit);\n        }\n    };\n}",
    "codeCustom": "function throttleCustom(func, limit) {\n    let lastFunc;\n    let lastRan;\n    return function() {\n        const context = this;\n        const args = arguments;\n        if (!lastRan) {\n            func.apply(context, args);\n            lastRan = Date.now();\n        } else {\n            clearTimeout(lastFunc);\n            lastFunc = setTimeout(function() {\n                if ((Date.now() - lastRan) >= limit) {\n                    func.apply(context, args);\n                    lastRan = Date.now();\n                }\n            }, limit - (Date.now() - lastRan));\n        }\n    };\n}"
},
  66: {
    "coreConcept": "Implement Promise.all polyfill.",
    "codeBuiltin": "function promiseAllBuiltIn(promises) {\n    return Promise.all(promises);\n}",
    "codeCustom": "function promiseAllCustom(promises) {\n    return new Promise((resolve, reject) => {\n        if (!Array.isArray(promises)) {\n            return reject(new TypeError('Arguments must be an array'));\n        }\n        \n        const results = [];\n        let completedPromises = 0;\n        \n        if (promises.length === 0) {\n            return resolve(results);\n        }\n        \n        for (let i = 0; i < promises.length; i++) {\n            Promise.resolve(promises[i])\n                .then((value) => {\n                    results[i] = value;\n                    completedPromises++;\n                    \n                    if (completedPromises === promises.length) {\n                        resolve(results);\n                    }\n                })\n                .catch((error) => {\n                    reject(error);\n                });\n        }\n    });\n}"
},
  67: {
    "coreConcept": "Build a class with on/off/emit/once methods.",
    "codeBuiltin": "class EventEmitterBuiltIn {\n    constructor() { this.events = new Map(); }\n    on(name, fn) {\n        if (!this.events.has(name)) this.events.set(name, []);\n        this.events.get(name).push(fn);\n    }\n    emit(name, ...args) {\n        if (this.events.has(name)) this.events.get(name).forEach(fn => fn(...args));\n    }\n}",
    "codeCustom": "function EventEmitterCustom() {\n    this.events = {};\n}\n\nEventEmitterCustom.prototype.on = function(eventName, listener) {\n    if (!this.events[eventName]) {\n        this.events[eventName] = [];\n    }\n    this.events[eventName].push(listener);\n};\n\nEventEmitterCustom.prototype.emit = function(eventName) {\n    const listeners = this.events[eventName];\n    if (!listeners) return;\n    \n    const args = [];\n    for (let i = 1; i < arguments.length; i++) {\n        args.push(arguments[i]);\n    }\n    \n    for (let i = 0; i < listeners.length; i++) {\n        listeners[i].apply(null, args);\n    }\n};"
},
  71: {
    "coreConcept": "TypeScript is a strongly typed, open-source programming language built on top of JavaScript. It is a superset of JavaScript, meaning all JS code is valid TS. TypeScript adds static type declarations to find errors at compile time, compiling down to standard JavaScript.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let name: string = \"Rasik\";\n// name = 42; // Compile error!\nconsole.log(name);",
        "output": "Rasik"
    }
},
  72: {
    "coreConcept": "An Interface defines a type contract for object shapes. Interfaces can be extended (inheritance) and merged automatically by declaring them multiple times under the same name.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "interface User {\n  id: number;\n}\ninterface Admin extends User {\n  role: string;\n}\nconst a: Admin = { id: 1, role: \"admin\" };\nconsole.log(a);",
        "output": "{ id: 1, role: 'admin' }"
    }
},
  73: {
    "coreConcept": "The 'any' type tells TypeScript to bypass static type-checking for that variable. It allows assigning any value and accessing any property on it, matching vanilla JavaScript behavior but removing type safety.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let data: any = 42;\ndata = \"string\";\nconsole.log(data);",
        "output": "string"
    }
},
  74: {
    "coreConcept": "Union Types allow a variable to hold values of multiple specified types. The vertical bar (|) is used to separate the permitted types.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let value: string | number = 42;\nvalue = \"forty-two\";\nconsole.log(value);",
        "output": "forty-two"
    }
},
  78: {
    "coreConcept": "Type Inference is TypeScript's ability to automatically guess and assign types to variables based on their initialization values when no explicit type annotation is provided.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let message = \"Hello TS\"; // inferred as string\n// message = 10; // Error\nconsole.log(typeof message);",
        "output": "string"
    }
},
  81: {
    "coreConcept": "Generics allow creating reusable components and functions that work over a variety of types rather than a single one, preserving type safety by letting the user specify the type variable during invocation.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function identity<T>(arg: T): T {\n  return arg;\n}\nconsole.log(identity<string>(\"Hello Generics\"));\nconsole.log(identity<number>(42));",
        "output": "Hello Generics\n42"
    }
},
  82: {
    "coreConcept": "The 'keyof' operator takes an object type and produces a union of its string or numeric literal keys.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "interface Point { x: number; y: number; }\ntype PointKeys = keyof Point; // \"x\" | \"y\"\nconst key: PointKeys = \"x\";\nconsole.log(key);",
        "output": "x"
    }
},
  83: {
    "coreConcept": "TypeScript provides global utility types to facilitate common type transformations. Examples include Partial, Required, Readonly, Pick, Omit, Record, Exclude, and Extract.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "interface User { id: number; name: string; }\ntype ReadonlyUser = Readonly<User>;\n// const u: ReadonlyUser = { id: 1, name: \"A\" };\n// u.id = 2; // Error!\nconsole.log(\"ReadOnly active\");",
        "output": "ReadOnly active"
    }
},
  86: {
    "coreConcept": "Type Guards are expressions that perform runtime checks to narrow down type unions. Methods include 'typeof', 'instanceof', and user-defined type predicates using the 'is' keyword.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function printLength(val: string | number) {\n  if (typeof val === \"string\") {\n    console.log(val.length);\n  } else {\n    console.log(val.toFixed(2));\n  }\n}\nprintLength(\"abc\");",
        "output": "3"
    }
},
  92: {
    "coreConcept": "Readonly<T> constructs a type with all properties of T set to readonly, preventing reassignment of properties.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "interface Item { title: string; }\nconst item: Readonly<Item> = { title: \"book\" };\n// item.title = \"new\"; // Error\nconsole.log(item.title);",
        "output": "book"
    }
},
  99: {
    "coreConcept": "Recursive Mapped Types apply modifiers or mappings deeply to objects (like DeepReadonly or DeepPartial) by recursively evaluating nested properties.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// A mapped type that goes recursive\ntype DeepReadonly<T> = {\n  readonly [P in keyof T]: DeepReadonly<T[P]>;\n};\nconsole.log(\"Recursive maps evaluated\");",
        "output": "Recursive maps evaluated"
    }
},
  104: {
    "coreConcept": "Branded Types (or Nominal typing helpers) are compile-time markers attached to types to distinguish between values with identical structures, preventing accidental mixing (e.g. USD vs EUR currency numbers).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type USD = number & { readonly __brand: unique symbol };\nconst makeUSD = (val: number) => val as USD;\nconsole.log(makeUSD(100));",
        "output": "100"
    }
},
  116: {
    "coreConcept": "React is a declarative, component-based, open-source JavaScript library developed by Meta for building user interfaces, primarily for single-page applications. It allows developers to build reusable UI elements that manage their own state.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// React component declaration\nfunction App() {\n  return <h1>Hello React!</h1>;\n}\nconsole.log(typeof App);",
        "output": "function"
    }
},
  117: {
    "coreConcept": "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows writing HTML-like markup directly inside React components, compiling down to standard React.createElement calls.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// JSX: <div>Hello</div>\n// Compiles to:\n// React.createElement(\"div\", null, \"Hello\");\nconsole.log(\"JSX compiles to React element factory calls\");",
        "output": "JSX compiles to React element factory calls"
    }
},
  118: {
    "coreConcept": "React Native components are primitive UI wrappers that map to native host components. Core examples include View (maps to UIView/ViewGroup), Text (maps to TextView), Image, TextInput, ScrollView, and StyleSheet.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import { StyleSheet, View } from 'react-native';\nconst styles = StyleSheet.create({\n  container: { flex: 1 }\n});",
        "output": "Styles compiled and cached for layout engine."
    }
},
  119: {
    "coreConcept": "Props (Properties) are read-only attributes passed from parent components to child components to configure them. They are immutable from the perspective of the child component.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function Child(props) {\n  return \"Name: \" + props.name;\n}\nconsole.log(Child({ name: \"Alice\" }));",
        "output": "Name: Alice"
    }
},
  120: {
    "coreConcept": "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When component state changes, React updates the Virtual DOM, performs diffing between the new Virtual DOM and the previous snapshot, and updates only the changed nodes in the real DOM (Reconciliation).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const virtualNode = { type: \"h1\", props: { children: \"Hello\" } };\nconsole.log(virtualNode.type);",
        "output": "h1"
    }
},
  121: {
    "coreConcept": "State is a mutable, local data store managed inside a React component. Unlike props, state is private to the component and changes to state trigger component re-rendering.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const [count, setCount] = useState(0);\nconsole.log(\"State manages component re-render triggers\");",
        "output": "State manages component re-render triggers"
    }
},
  122: {
    "coreConcept": "useEffect is the React Hook used to perform side effects in functional components, such as data fetching, subscriptions, manual DOM updates, and timers. It runs after layout and paint, and can return a cleanup function to clean up side effects before the component unmounts or before the effect runs again.",
    "guideline": "Always return cleanup callbacks (like clearing timers or unsubscribing) to prevent memory leaks, and declare complete dependency arrays to avoid stale closures.",
    "oneLineAnswer": "useEffect executes side-effect scripts post-render and registers cleanups to prevent resource leaks.",
    "bestPractice": "useEffect(() => { const timer = setTimeout(cb, 100); return () => clearTimeout(timer); }, []);",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Inside a React Component:\n// useEffect(() => {\n//   console.log(\"Effect mounted\");\n//   return () => console.log(\"Effect unmounted\");\n// }, []);\nconsole.log(\"Effect registered\");",
        "output": "Effect registered"
    }
},
  123: {
    "coreConcept": "useRef is a hook that returns a mutable ref object whose .current property persists across re-renders. Modifying .current does NOT trigger a re-render. It is commonly used to access DOM nodes directly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const inputRef = useRef(null);\n// inputRef.current.focus();\nconsole.log(\"useRef holds mutable references without re-rendering\");",
        "output": "useRef holds mutable references without re-rendering"
    }
},
  125: {
    "coreConcept": "Event Handling in React is done using camelCase event attributes (like onClick and onChange). React uses SyntheticEvents—cross-browser wrappers around the browser's native events to ensure identical behavior.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// <button onClick={(e) => console.log(e.target)}>Click</button>\nconsole.log(\"Synthetic events wrap native events\");",
        "output": "Synthetic events wrap native events"
    }
},
  127: {
    "coreConcept": "A Controlled Component is an input form element whose value is fully driven and controlled by React component state. Any change triggers a handler that updates the state.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// value={state} onChange={handleChange}",
        "output": "React state acts as the single source of truth for the input."
    }
},
  128: {
    "coreConcept": "Forms in React are typically handled using Controlled Components (where state drives input values) or Uncontrolled Components (where refs read values directly from the DOM).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Controlled: <input value={val} onChange={e => setVal(e.target.value)} />",
        "output": "Controlled values bind directly to state."
    }
},
  131: {
    "coreConcept": "Reconciliation is React's algorithm for comparing two Virtual DOM trees (the diffing algorithm) and updating only what has changed in the real DOM to maintain rendering speed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Reconciliation processes element updates based on keys and types\");",
        "output": "Reconciliation processes element updates based on keys and types"
    }
},
  133: {
    "coreConcept": "React.memo is a higher-order component that wraps functional components to memoize their rendering result, preventing re-renders if the incoming props remain shallowly unchanged.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const MemoComponent = React.memo(MyComponent);\nconsole.log(\"React.memo skips render on unchanged props\");",
        "output": "React.memo skips render on unchanged props"
    }
},
  134: {
    "coreConcept": "useMemo is a hook that memoizes the result of a computationally expensive function, recomputing it only when the dependencies change, preventing redundant computations during re-renders.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const memoValue = useMemo(() => expensiveFunc(a, b), [a, b]);\nconsole.log(\"useMemo caches values between renders\");",
        "output": "useMemo caches values between renders"
    }
},
  135: {
    "coreConcept": "Suspense is a React component that lets you show a loading fallback spinner or message while child components are waiting for asynchronous operations (like lazy loading or data fetching) to resolve.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// <Suspense fallback={<Loading />}><LazyComponent /></Suspense>",
        "output": "Suspense handles visual state transitions for async components."
    }
},
  136: {
    "coreConcept": "Lazy Loading is an optimization technique that defers loading of non-critical component bundles until they are actually needed, reducing the initial load bundle size.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const LazyComp = React.lazy(() => import('./LazyComp'));\nconsole.log(\"Lazy loading splits bundle files dynamically\");",
        "output": "Lazy loading splits bundle files dynamically"
    }
},
  140: {
    "coreConcept": "Custom Hooks are reusable JavaScript functions whose names start with 'use' and that can invoke other React hooks, abstracting complex stateful logic out of components.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Custom hook example\nfunction useBoolean(init = false) {\n  // return [val, toggle];\n}\nconsole.log(\"Custom Hooks wrap state logic\");",
        "output": "Custom Hooks wrap state logic"
    }
},
  146: {
    "coreConcept": "Concurrent Rendering allows React to work on multiple UI updates simultaneously. It lets React prepare a new UI draft in the background without blocking the browser thread, enabling features like transition states and selective hydration.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// useTransition() allows marking updates as non-blocking transition tasks",
        "output": "Transition state enables interruptible background rendering."
    }
},
  147: {
    "coreConcept": "Server-Side Rendering (SSR) is the process of generating HTML on the server for each request and sending it to the client, providing faster Initial Page Load (FCP) and excellent SEO.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// server.js\n// const html = ReactDOMServer.renderToString(<App />);",
        "output": "Rendered HTML sent to browser immediately."
    }
},
  148: {
    "coreConcept": "The React Scheduler is a cooperative scheduling package that manages the priority of executing work loop tasks in Fiber. It splits work by priority: Immediate, UserBlocking, Normal, Low, and Idle.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Scheduler executes work loop tasks in time slices (~5ms)\");",
        "output": "Scheduler executes work loop tasks in time slices (~5ms)"
    }
},
  150: {
    "coreConcept": "useOptimistic is a hook that allows displaying an optimistic UI state during asynchronous mutations (like forms), showing the expected success state immediately while the actual async server request completes.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const [optimisticState, addOptimisticState] = useOptimistic(state, updateFn);",
        "output": "Optimistic UI immediately renders state before database returns."
    }
},
  152: {
    "coreConcept": "React Server Components (RSC) are components that render exclusively on the server. They do not ship any JavaScript to the client (reducing bundle size) and can fetch database resources directly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Default component in Next.js App Router (runs only on server)\nasync function UserProfile() {\n  const user = await db.getUser(); // direct DB call\n  return <div>{user.name}</div>;\n}",
        "output": "Component rendered on server, zero client bundle overhead."
    }
},
  155: {
    "coreConcept": "Micro Frontends is an architectural style where independently deliverable frontend applications are composed into a unified whole, allowing separate team pipelines for different sections of the app.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Shell container imports Host and Checkout micro apps at runtime",
        "output": "Micro apps operate independently and assemble dynamically."
    }
},
  162: {
    "coreConcept": "useReducer is a React Hook designed for managing state transitions in components with complex local state logic. It operates on a reducer pattern: (state, action) => newState, returning the current state paired with a dispatch function to dispatch actions.",
    "guideline": "Prefer useReducer over useState when managing state objects with multiple sub-values or when the next state depends heavily on the previous state and action types.",
    "oneLineAnswer": "useReducer manages complex state transitions in components via deterministic reducer action dispatching.",
    "bestPractice": "dispatch({ type: 'increment' });",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const counterReducer = (state, action) => {\n  switch(action.type) {\n    case \"increment\": return { count: state.count + 1 };\n    default: return state;\n  }\n};\n// const [state, dispatch] = useReducer(counterReducer, { count: 0 });\n// dispatch({ type: \"increment\" });\nconsole.log(\"useReducer dispatch registered\");",
        "output": "useReducer dispatch registered"
    }
},
  176: {
    "coreConcept": "Redux is a predictable state container for JavaScript apps. It manages global state via a single centralized Store, where state updates are triggered by dispatching Actions and computed synchronously by Reducers.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// action: { type: 'INCREMENT' }\n// reducer: (state, action) => newState\nconsole.log(\"Redux uses unidirectional data flow\");",
        "output": "Redux uses unidirectional data flow"
    }
},
  179: {
    "coreConcept": "Redux Toolkit (RTK) is the official, opinionated, battery-included toolset for efficient Redux development. It simplifies store configuration, boilerplate, and includes Immer to write mutable-style reducer logic safely.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const slice = createSlice({ name: 'counter', reducers: { ... } });\nconsole.log(\"RTK simplifies store configuration\");",
        "output": "RTK simplifies store configuration"
    }
},
  190: {
    "coreConcept": "RTK Query is a powerful data fetching and caching tool built on top of Redux Toolkit. It generates React hooks that automatically handle loading, caching, polling, and cache invalidation for API requests.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const { useFetchDataQuery } = apiSlices;\nconsole.log(\"RTK Query generates hooks for endpoints\");",
        "output": "RTK Query generates hooks for endpoints"
    }
},
  216: {
    "coreConcept": "React Native is an open-source framework developed by Meta for building native mobile applications for iOS and Android using JavaScript and React. It compiles to native platform UI components rather than rendering in a WebView.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import { Text, View } from 'react-native';\nfunction App() {\n  return <View><Text>Hello RN!</Text></View>;\n}",
        "output": "Native UI View component containing Text is rendered."
    }
},
  217: {
    "coreConcept": "React Native components are primitive UI wrappers that map to native host components. Core examples include View (maps to UIView/ViewGroup), Text (maps to TextView), Image, TextInput, ScrollView, and StyleSheet.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import { StyleSheet, View } from 'react-native';\nconst styles = StyleSheet.create({\n  container: { flex: 1 }\n});",
        "output": "Styles compiled and cached for layout engine."
    }
},
  218: {
    "coreConcept": "FlatList is a performant component for rendering list data. It lazily renders elements as they enter the screen, recycling off-screen row layouts to maintain a stable, low memory footprint.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// <FlatList data={data} renderItem={({ item }) => <Text>{item.name}</Text>} />",
        "output": "Lazy list renders only visible elements, recycling offscreen nodes."
    }
},
  219: {
    "coreConcept": "Flexbox is the default layout engine in React Native. It uses a CSS-like layout model, but with defaults: flexDirection defaults to 'column', flexWrap defaults to 'nowrap', and only Flexbox layouts are supported (no grid or absolute margins).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// container: { flex: 1, flexDirection: 'row', justifyContent: 'center' }",
        "output": "Flexbox aligns children horizontally and centers them."
    }
},
  220: {
    "coreConcept": "Navigation in React Native is handled via libraries like React Navigation or Expo Router, translating route configurations into native stack transitions or tab controllers.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// <Stack.Screen name=\"Home\" component={HomeScreen} />",
        "output": "Native navigation controller manages stack history."
    }
},
  221: {
    "coreConcept": "AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system for React Native, typically backed by SQLite or local files on the device.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import AsyncStorage from '@react-native-async-storage/async-storage';\nawait AsyncStorage.setItem('key', 'value');\nconsole.log(await AsyncStorage.getItem('key'));",
        "output": "value"
    }
},
  228: {
    "coreConcept": "Push Notifications are alert messages sent from a remote server to the user's mobile device via Apple Push Notification service (APNs) or Firebase Cloud Messaging (FCM), popping up even when the app is closed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// FCMToken register listener\nconsole.log(\"FCM listener registered\");",
        "output": "FCM listener registered"
    }
},
  230: {
    "coreConcept": "Camera integration is achieved using libraries like expo-camera or react-native-vision-camera, interfacing directly with native iOS/Android camera APIs and requiring camera permission requests.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const [hasPermission, requestPermission] = useCameraPermissions();",
        "output": "Camera permissions requested and checked."
    }
},
  231: {
    "coreConcept": "SQLite is a lightweight, relational, SQL database engine embedded directly inside the mobile app, providing fast structured query capabilities and robust offline local data storage.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// db.transaction(tx => { tx.executeSql(\"SELECT * FROM users\", []); });",
        "output": "SQL query executed locally on SQLite storage database."
    }
},
  233: {
    "coreConcept": "Deep Linking allows a mobile application to open from a specific URL or custom URI scheme (like myapp://details/5), routing the user directly to a specific section of the app.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// custom scheme: myapp://profile/123",
        "output": "URI parsed -> application launched -> routed to Profile Screen."
    }
},
  234: {
    "coreConcept": "React Native performance optimization involves practices like avoiding inline styles, optimizing images, using FlatList with getItemLayout, memoizing list items, using Hermes engine, and offloading animations to the UI thread using useNativeDriver.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// useNativeDriver: true offloads animation calculations to native drivers",
        "output": "Animations run smoothly at 60 FPS on the native thread."
    }
},
  236: {
    "coreConcept": "Bridging is the asynchronous, JSON-serialized message channel React Native used in its legacy architecture to pass data and events between the JavaScript thread and the Native Main thread.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"JSON messages serialized, queued, and sent across the bridge async\");",
        "output": "JSON messages serialized, queued, and sent across the bridge async"
    }
},
  237: {
    "coreConcept": "Hermes is Google/Meta's lightweight JavaScript engine optimized for running React Native apps. It compiles JavaScript code into bytecode during the app build process (AOT compilation), speeding up startup time and reducing memory usage.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Hermes runs pre-compiled bytecode directly, saving load time\");",
        "output": "Hermes runs pre-compiled bytecode directly, saving load time"
    }
},
  238: {
    "coreConcept": "Fabric is the new React Native rendering system. It uses C++ to render UI components directly, improving UI synchronization, responsiveness, and rendering execution speed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Fabric layout engine computes native view boundaries directly in C++\");",
        "output": "Fabric layout engine computes native view boundaries directly in C++"
    }
},
  239: {
    "coreConcept": "Native Modules allow React Native JavaScript code to call native platform-specific methods (Objective-C/Swift for iOS, Java/Kotlin for Android) by registering the module bridge.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import { NativeModules } from 'react-native';\n// NativeModules.MyCustomBridge.showToast(\"Hello\");",
        "output": "Native platform toast message invoked."
    }
},
  240: {
    "coreConcept": "TurboModules are the Native Modules in React Native's New Architecture. They utilize JSI to load lazily on demand, letting JS invoke native APIs synchronously without serialization overhead.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"TurboModules loaded lazily on demand over JSI\");",
        "output": "TurboModules loaded lazily on demand over JSI"
    }
},
  241: {
    "coreConcept": "Offline-first Architecture involves designing mobile apps to use local storage (like SQLite) as their primary database, syncing changes asynchronously with the cloud when connection is restored.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Data operations execute on SQLite, sync queues update remote server\");",
        "output": "Data operations execute on SQLite, sync queues update remote server"
    }
},
  5001: {
    "coreConcept": "JavaScript is a high-level, interpreted, dynamically typed programming language primarily used to create interactive and dynamic web applications. It runs in web browsers and can also run on servers using environments such as Node.js. It supports multiple programming paradigms, including OOP, Functional, and Event-Driven programming, and is one of the core technologies of the Web.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Hello, World!\");\nconsole.log(\"JavaScript is active.\");",
        "output": "Hello, World!\nJavaScript is active."
    }
},
  5002: {
    "coreConcept": "undefined means a variable has been declared but has not yet been assigned a value. It is JavaScript's default value. null is an assignment value that represents the intentional absence of any object value. typeof undefined is 'undefined', while typeof null is 'object' (a historical bug).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let a;\nlet b = null;\nconsole.log(a === undefined);\nconsole.log(b === null);\nconsole.log(typeof a, typeof b);",
        "output": "true\ntrue\nundefined object"
    }
},
  5003: {
    "coreConcept": "NaN stands for 'Not-a-Number'. It is a special value of the Number type returned when a mathematical operation yields an undefined or unrepresentable numerical result (e.g. dividing a string by a number). NaN is unique because it is not equal to anything, including itself. Use Number.isNaN() to check for it safely.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const result = \"hello\" / 2;\nconsole.log(result);\nconsole.log(result === NaN);\nconsole.log(Number.isNaN(result));",
        "output": "NaN\nfalse\ntrue"
    }
},
  5004: {
    "coreConcept": "typeof is a unary operator that returns a string indicating the type of the unevaluated operand. It returns 'string', 'number', 'boolean', 'undefined', 'object' (for objects, arrays, null), 'function', 'symbol', or 'bigint'.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(typeof \"hello\");\nconsole.log(typeof (() => {}));\nconsole.log(typeof {});",
        "output": "string\nfunction\nobject"
    }
},
  5005: {
    "coreConcept": "In JavaScript, a falsy value is a value that translates to false when evaluated in a boolean context. There are exactly 8 falsy values: false, 0, -0, 0n (BigInt zero), '', null, undefined, and NaN. All other values are truthy, including empty arrays [] and empty objects {}.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(Boolean(\"\"));\nconsole.log(Boolean([]));\nconsole.log(Boolean(0));",
        "output": "false\ntrue\nfalse"
    }
},
  5006: {
    "coreConcept": "A Function Declaration is defined with the 'function' keyword and is hoisted to the top of its scope, meaning it can be called before it is defined. A Function Expression is assigned to a variable, is not hoisted, and cannot be invoked before the variable assignment code is executed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Declaration (hoisted)\ngreet();\nfunction greet() { console.log(\"Hello Declarative!\"); }\n\n// Expression (not hoisted)\ntest(); // TypeError or ReferenceError\nvar test = function() { console.log(\"Hello Expression!\"); };",
        "output": "Hello Declarative!"
    }
},
  5007: {
    "coreConcept": "The spread operator (...) allows an iterable (like an array or string) or an object to be expanded in places where zero or more arguments or elements are expected, making copying and merging arrays/objects extremely simple.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconsole.log(arr2);\n\nconst obj1 = { a: 1 };\nconst obj2 = { ...obj1, b: 2 };\nconsole.log(obj2);",
        "output": "[1, 2, 3, 4]\n{ a: 1, b: 2 }"
    }
},
  5008: {
    "coreConcept": "Optional chaining (?.) allows reading the value of a property located deep within a chain of connected objects without having to explicitly validate that each reference in the chain is valid. If a reference is null or undefined, the expression short-circuits and returns undefined.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const user = { profile: { name: \"Alice\" } };\nconsole.log(user.profile?.name);\nconsole.log(user.address?.street);",
        "output": "Alice\nundefined"
    }
},
  5009: {
    "coreConcept": "A Higher-Order Function (HOF) is a function that takes one or more functions as arguments, returns a function as its result, or both. Common examples include array methods like map(), filter(), and reduce().",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const double = (x) => x * 2;\nconst applyOp = (val, op) => op(val);\nconsole.log(applyOp(5, double));",
        "output": "10"
    }
},
  5010: {
    "coreConcept": "A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some routine or asynchronous action.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function execute(cb) {\n  console.log(\"Executing...\");\n  cb();\n}\nexecute(() => console.log(\"Done.\"));",
        "output": "Executing...\nDone."
    }
},
  5011: {
    "coreConcept": "An Execution Context is an abstract environment in which JavaScript code is evaluated and executed. Every execution context has two phases: a Creation Phase (where the scope chain, variable object, and 'this' are set up) and an Execution Phase (where code is executed line-by-line). There is a Global Execution Context and a Function Execution Context for each function call.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const x = 10;\nfunction foo() {\n  const y = 20;\n  console.log(x + y);\n}\nfoo();",
        "output": "30"
    }
},
  5012: {
    "coreConcept": "The Call Stack is a LIFO (Last In, First Out) stack structure used by JavaScript to keep track of execution contexts during runtime. When a function is called, its context is pushed onto the stack, and when it returns, its context is popped off.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function first() { second(); }\nfunction second() { console.log(\"Second called\"); }\nfirst();",
        "output": "Second called"
    }
},
  5013: {
    "coreConcept": "The Scope Chain is the collection of scopes that JavaScript searches to resolve variable names. When a variable is accessed, the JS engine looks in the local scope, then traverses up through nested outer lexical environments until it finds the variable or hits the global scope.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const g = \"global\";\nfunction outer() {\n  const o = \"outer\";\n  function inner() {\n    console.log(g, o);\n  }\n  inner();\n}\nouter();",
        "output": "global outer"
    }
},
  5014: {
    "coreConcept": "A Lexical Environment is a internal structure that holds identifier-variable mappings and a reference to its outer lexical environment. It defines where variables and blocks are physically authored in the source code, dictating scoping boundaries at compile time.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function makeAdder(x) {\n  return function(y) { return x + y; };\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(2));",
        "output": "7"
    }
},
  5015: {
    "coreConcept": "The Callback Queue (or Macrotask Queue) is a queue holding asynchronous callbacks (like setTimeout, setInterval, or I/O operations) that are ready to run once the Call Stack becomes completely empty.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "setTimeout(() => console.log(\"Callback Queue task\"), 10);\nconsole.log(\"Main line execution\");",
        "output": "Main line execution\nCallback Queue task"
    }
},
  5016: {
    "coreConcept": "The Microtask Queue is a queue specifically for lightweight tasks (like Promise callbacks and queueMicrotask) that must be executed immediately after the current script executes and before the browser yields control to rendering or macrotasks.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "Promise.resolve().then(() => console.log(\"Microtask\"));\nconsole.log(\"Sync script\");",
        "output": "Sync script\nMicrotask"
    }
},
  5017: {
    "coreConcept": "The apply() method calls a function with a given 'this' value and arguments provided as an array. This is useful when the number of arguments is dynamic or already in an array structure.",
    "guideline": "Use apply() when arguments are dynamically computed as an array, otherwise prefer call() or the spread operator with normal function invocation.",
    "oneLineAnswer": "apply() invokes a function immediately, setting its 'this' context and mapping an array of arguments to parameters.",
    "bestPractice": "introduce.apply(person, [28, 'Boston']);",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function introduce(age, city) {\n  console.log(\"I am \" + this.name + \", \" + age + \" years old from \" + city);\n}\nconst person = { name: \"Bob\" };\nintroduce.apply(person, [28, \"Boston\"]);",
        "output": "I am Bob, 28 years old from Boston"
    }
},
  5018: {
    "coreConcept": "The bind() method creates a new function that, when called, has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.",
    "guideline": "Use bind() to bind event handler contexts in older React class components or when setting up callbacks to be invoked in different execution scopes.",
    "oneLineAnswer": "bind() returns a new function with its 'this' context permanently bound to the provided object for deferred execution.",
    "bestPractice": "const boundGetX = unboundGetX.bind(module);",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const moduleObj = {\n  x: 42,\n  getX: function() {\n    return this.x;\n  }\n};\nconst unboundGetX = moduleObj.getX;\nconst boundGetX = unboundGetX.bind(moduleObj);\nconsole.log(boundGetX());",
        "output": "42"
    }
},
  5019: {
    "coreConcept": "In JavaScript, the 'this' keyword refers to the object that is executing the current function. Its value is determined at runtime based on the invocation context: the owner object in method calls, the global object (or undefined in strict mode) in simple calls, the new instance in constructor calls, or the explicitly bound object in call/apply/bind.",
    "guideline": "Understand invocation rules: method call sets 'this' to the object, standard call sets it to global/undefined, constructors set it to the new instance, and arrow functions resolve it lexically.",
    "oneLineAnswer": "this is a runtime reference pointing to the execution context object that invoked the current function.",
    "bestPractice": "const user = { username: 'admin', showName() { console.log(this.username); } };",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const user = {\n  username: \"admin\",\n  showName() {\n    console.log(this.username);\n  }\n};\nuser.showName();",
        "output": "admin"
    }
},
  5020: {
    "coreConcept": "The Prototype Chain is JavaScript's mechanism for inheritance. When trying to access a property or method of an object, JavaScript will first search the object itself. If not found, it traverses up the __proto__ links of the prototype chain until it either finds the property or reaches null.",
    "guideline": "Leverage prototypal inheritance for memory efficiency by attaching shared methods to constructor/class prototype chains rather than instances.",
    "oneLineAnswer": "The Prototype Chain is a lookup path of linked objects used to resolve properties and support inheritance in JavaScript.",
    "bestPractice": "const rabbit = Object.create(animal);",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const animal = { eats: true };\nconst rabbit = Object.create(animal);\nrabbit.jumps = true;\nconsole.log(rabbit.jumps);\nconsole.log(rabbit.eats);",
        "output": "true\ntrue"
    }
},
  5021: {
    "coreConcept": "Constructor Functions are functions used as templates to create objects. They are invoked with the 'new' operator, which sets the 'this' context of the constructor function to a newly created empty object and implicitly returns it.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function Person(name) {\n  this.name = name;\n}\nconst p = new Person(\"Alice\");\nconsole.log(p.name);\nconsole.log(p instanceof Person);",
        "output": "Alice\ntrue"
    }
},
  5022: {
    "coreConcept": "ES6 Classes are syntactic sugar over JavaScript's existing prototype-based inheritance model. They offer a cleaner, object-oriented syntax to declare constructors, inheritance (extends), static methods, and instance methods.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + \" makes a noise.\"; }\n}\nconst dog = new Animal(\"Dog\");\nconsole.log(dog.speak());",
        "output": "Dog makes a noise."
    }
},
  5023: {
    "coreConcept": "Inheritance in JavaScript is implemented via prototype delegation. In ES6, the 'extends' keyword sets up prototype chaining between classes, and the 'super()' function must be called in constructors to invoke the parent constructor.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Parent { constructor() { this.type = \"Parent\"; } }\nclass Child extends Parent {}\nconst c = new Child();\nconsole.log(c.type);",
        "output": "Parent"
    }
},
  5024: {
    "coreConcept": "Encapsulation restricts direct access to some of an object's details and groups methods with data. In modern JS, private class fields are declared using the hash '#' symbol, preventing external code from reading or modifying them directly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class BankAccount {\n  #balance = 1000;\n  getBalance() { return this.#balance; }\n}\nconst acc = new BankAccount();\nconsole.log(acc.getBalance());\nconsole.log(acc.balance);",
        "output": "1000\nundefined"
    }
},
  5025: {
    "coreConcept": "Polymorphism allows subclasses to define custom implementations of methods shared with parent classes (method overriding). Methods with the same name behave differently depending on the class instance invoking them.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Speaker { speak() { return \"hello\"; } }\nclass Dog extends Speaker { speak() { return \"woof\"; } }\nconst speakers = [new Speaker(), new Dog()];\nspeakers.forEach(s => console.log(s.speak()));",
        "output": "hello\nwoof"
    }
},
  5026: {
    "coreConcept": "Error Handling uses try...catch...finally blocks to catch errors thrown during execution and prevent crashes. The throw statement is used to trigger custom exceptions.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "try {\n  throw new Error(\"Something went wrong\");\n} catch (err) {\n  console.log(err.message);\n} finally {\n  console.log(\"Cleanup complete\");\n}",
        "output": "Something went wrong\nCleanup complete"
    }
},
  5027: {
    "coreConcept": "Mark-and-Sweep is the standard garbage collection algorithm used by modern JavaScript engines like V8. The engine starts at designated root references (like window or active variables on the stack) and 'marks' all objects reachable from them. It then 'sweeps' the remaining memory, reclaiming any unmarked objects that are unreachable.",
    "guideline": "Avoid memory leaks by severing reference paths (like clearing intervals or listeners) so that unused objects become unreachable and markable for garbage collection.",
    "oneLineAnswer": "Mark-and-Sweep traverses active object references to mark reachable objects and sweep unreachable ones from memory heap.",
    "bestPractice": "let root = { data: 'active' };\nroot = null; // object reclaimed",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let rootObj = { data: \"active\" };\nlet tempObj = { data: \"discarded\" };\ntempObj = null; // The second object becomes unreachable and is garbage collected during sweep.",
        "output": "Unreachable memory reclaimed by GC."
    }
},
  5028: {
    "coreConcept": "Just-In-Time (JIT) Compilation combines compiling and interpreting. Modern JS engines compile JS bytecode into machine code at runtime as it executes. Hot functions (frequently run code) are compiled to highly optimized machine code (using profiling data), and de-optimized back to interpreter bytecode if shapes change.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function add(a, b) { return a + b; }\nfor(let i=0; i<10000; i++) add(1, 2);\n// add is compiled into optimized native code by V8's JIT compiler.",
        "output": "Loop compiled and optimized by JIT Compiler."
    }
},
  5029: {
    "coreConcept": "The Browser Rendering Pipeline turns HTML, CSS, and JS into visible pixels. It follows a sequence: DOM tree creation, CSSOM tree creation, Render Tree creation, Layout (calculating coordinates/geometries), and Painting (drawing pixels onto layers), followed by Compositing.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// DOM modification triggers rendering pipeline steps\ndocument.body.innerHTML = \"<h1>New Content</h1>\";",
        "output": "DOM updated -> Layout recalculation -> Painting -> Compositing"
    }
},
  5030: {
    "coreConcept": "Reflow (or Layout) is the calculation of geometries and positions of elements, triggered by modifications to layout-affecting properties (width, height, display, padding, margins, font size). Repaint is drawing updated pixels onto the screen, triggered by cosmetic properties (color, background-color, visibility) without layout changes. Reflow is significantly more expensive than Repaint.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const el = document.createElement(\"div\");\nel.style.width = \"100px\"; // Triggers Reflow (Layout change)\nel.style.color = \"red\";    // Triggers Repaint only",
        "output": "Reflow recalculates structure. Repaint updates color pixels."
    }
},
  5031: {
    "coreConcept": "A Memory Leak is memory that was allocated by the application but is no longer needed and has not been returned to the operating system. Common sources include accidental global variables, forgotten timers/intervals, detached DOM nodes, and closures.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Accidental Global Variable Leak\nfunction leak() {\n  accidentalGlobal = new Array(1000000);\n}\nleak();",
        "output": "Memory remains allocated on global object, leaking space."
    }
},
  5032: {
    "coreConcept": "SharedArrayBuffer is a shared memory object that permits sharing bytes of memory directly between the main thread and Web Workers without overhead. To prevent data races, it is manipulated using Atomics.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// main.js\nconst sab = new SharedArrayBuffer(1024);\nconsole.log(sab.byteLength);",
        "output": "1024"
    }
},
  5033: {
    "coreConcept": "Atomics is a global object providing static thread-safe operations (add, sub, load, store, wait, notify) for SharedArrayBuffer typed arrays, ensuring synchronized memory operations and preventing race conditions in multi-threaded JS.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const sab = new SharedArrayBuffer(1024);\nconst ia = new Int32Array(sab);\nAtomics.store(ia, 0, 123);\nconsole.log(Atomics.load(ia, 0));",
        "output": "123"
    }
},
  5034: {
    "coreConcept": "Concurrency in JavaScript is achieved using Web Workers, Service Workers, and asynchronous event loops. Web Workers run in separate OS threads, executing scripts concurrently with the main UI thread and communicating via postMessage.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Main thread instantiates worker\n// const worker = new Worker('worker.js');\n// worker.postMessage('hello');\nconsole.log(\"Concurrently spawned worker task\");",
        "output": "Concurrently spawned worker task"
    }
},
  5035: {
    "coreConcept": "RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs using observable sequences, operators (map, filter, switchMap), and schedulers.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Emulating Observable\nconst observable = {\n  subscribe: (observer) => {\n    observer.next(\"RxJS Stream active\");\n  }\n};\nobservable.subscribe({ next: console.log });",
        "output": "RxJS Stream active"
    }
},
  5036: {
    "coreConcept": "Scheduler Design involves building loops to schedule and slice execution blocks (like React Fiber Scheduler). It prioritizes tasks (urgent vs background) using requestAnimationFrame or message channels to prevent blocking the main thread.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Slicing task execution using setTimeout\nfunction scheduleTask(task) {\n  setTimeout(task, 0);\n}\nscheduleTask(() => console.log(\"Task executed in next tick\"));",
        "output": "Task executed in next tick"
    }
},
  5037: {
    "coreConcept": "JavaScript is a dynamic, weakly typed language where variables can hold any type and errors are caught at runtime. TypeScript is static and strongly typed, allowing developers to define contracts for parameters and objects, catching type errors during development/compilation.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// TS contract validation\ninterface User { id: number; }\nconst u: User = { id: 1 };\nconsole.log(u.id);",
        "output": "1"
    }
},
  5038: {
    "coreConcept": "The 'string' type in TypeScript represents textual data, supporting single quotes, double quotes, and template literals.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const name: string = \"Alice\";\nconsole.log(name);",
        "output": "Alice"
    }
},
  5039: {
    "coreConcept": "The 'number' type in TypeScript represents all numerical values, including floating-point numbers, integers, hexadecimal, binary, octal, and special values like NaN.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const val: number = 42.5;\nconsole.log(val);",
        "output": "42.5"
    }
},
  5040: {
    "coreConcept": "The 'boolean' type in TypeScript represents a simple binary value: true or false.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const flag: boolean = true;\nconsole.log(flag);",
        "output": "true"
    }
},
  5041: {
    "coreConcept": "The 'unknown' type is a type-safe counterpart of 'any'. Anything can be assigned to 'unknown', but accessing any properties or invoking methods is forbidden until the type is narrowed or asserted via Type Guards.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let val: unknown = \"hello\";\n// val.toUpperCase(); // Error!\nif (typeof val === \"string\") {\n  console.log(val.toUpperCase());\n}",
        "output": "HELLO"
    }
},
  5042: {
    "coreConcept": "The 'never' type represents values that will never occur. It is returned by functions that throw exceptions or enter infinite loops, and is used in conditional types to filter out impossible conditions.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function throwErr(msg: string): never {\n  throw new Error(msg);\n}\ntry { throwErr(\"Crash\"); } catch(e) { console.log(\"Caught\"); }",
        "output": "Caught"
    }
},
  5043: {
    "coreConcept": "The 'void' type represents the absence of any return value in a function. It is commonly used as the return type of functions that execute side effects without returning a value.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function logMessage(msg: string): void {\n  console.log(msg);\n}\nlogMessage(\"Void return\");",
        "output": "Void return"
    }
},
  5044: {
    "coreConcept": "A Type Alias creates a new name for any type, including primitives, unions, intersections, tuples, and object shapes. Unlike interfaces, they cannot be merged after declaration.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type ID = string | number;\nconst u1: ID = 123;\nconst u2: ID = \"ABC\";\nconsole.log(u1, u2);",
        "output": "123 ABC"
    }
},
  5045: {
    "coreConcept": "Intersection Types combine multiple types into one, using the ampersand (&). An object of an intersection type must satisfy all properties of the combined types.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type Person = { name: string };\ntype Employee = { id: number };\ntype Staff = Person & Employee;\nconst s: Staff = { name: \"Bob\", id: 101 };\nconsole.log(s.name, s.id);",
        "output": "Bob 101"
    }
},
  5046: {
    "coreConcept": "Type Narrowing is TypeScript's analyzer mechanism where types are refined to more specific types as code branch conditions are checked (such as in if/else clauses, switch statements, and truthiness checks).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function process(x: string | null) {\n  if (x) {\n    // type narrowed to string (null filtered out)\n    console.log(x.toUpperCase());\n  }\n}\nprocess(\"narrowed\");",
        "output": "NARROWED"
    }
},
  5047: {
    "coreConcept": "Generic Constraints restrict the types that can be passed to a generic type parameter, using the 'extends' keyword inside type parameter declarations.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function logLen<T extends { length: number }>(arg: T): void {\n  console.log(arg.length);\n}\nlogLen([1, 2, 3]);\nlogLen(\"string\");",
        "output": "3\n6"
    }
},
  5048: {
    "coreConcept": "Required<T> constructs a type consisting of all properties of T set to required. It removes optional modifiers from T's keys.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "interface Props { a?: number; b?: string; }\ntype ActiveProps = Required<Props>;\nconst p: ActiveProps = { a: 1, b: \"hello\" };\nconsole.log(p);",
        "output": "{ a: 1, b: 'hello' }"
    }
},
  5049: {
    "coreConcept": "Record<K, T> constructs an object type whose property keys are K and property values are T, mapping keys of one type to another.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type PageInfo = { title: string };\ntype Pages = Record<\"home\" | \"about\", PageInfo>;\nconst site: Pages = {\n  home: { title: \"Home\" },\n  about: { title: \"About Us\" }\n};\nconsole.log(site.home.title);",
        "output": "Home"
    }
},
  5050: {
    "coreConcept": "Exclude<T, U> constructs a type by excluding from T all union members that are assignable to U.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type T = \"a\" | \"b\" | \"c\";\ntype U = Exclude<T, \"a\">; // \"b\" | \"c\"\nconst val: U = \"b\";\nconsole.log(val);",
        "output": "b"
    }
},
  5051: {
    "coreConcept": "Extract<T, U> constructs a type by extracting from T all union members that are assignable to U.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type T = \"a\" | \"b\" | \"c\";\ntype U = Extract<T, \"a\" | \"f\">; // \"a\"\nconst val: U = \"a\";\nconsole.log(val);",
        "output": "a"
    }
},
  5052: {
    "coreConcept": "Conditional Types choose one of two types based on a relation test, using a syntax similar to ternary operators: T extends U ? X : Y.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type IsString<T> = T extends string ? true : false;\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false\nconsole.log(\"Conditional types compiled\");",
        "output": "Conditional types compiled"
    }
},
  5053: {
    "coreConcept": "Recursive Types are types that refer to themselves in their own definition, useful to model nested hierarchical data structures like nested arrays or JSON objects.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type NestedArray<T> = T | NestedArray<T>[];\nconst arr: NestedArray<number> = [1, [2, [3]]];\nconsole.log(arr.length);",
        "output": "2"
    }
},
  5054: {
    "coreConcept": "Variadic Tuple Types allow representing tuple shapes with spread elements (...) whose type parameters can be generic and dynamically computed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type Concatenate<T extends unknown[], U extends unknown[]> = [...T, ...U];\ntype Result = Concatenate<[string], [number, boolean]>;\n// Result is [string, number, boolean]\nconsole.log(\"Variadic tuples compiled\");",
        "output": "Variadic tuples compiled"
    }
},
  5055: {
    "coreConcept": "Declaration Files (.d.ts) contain type declarations for JavaScript code, letting TypeScript understand the API contract of third-party JS modules without compiling actual JS implementation.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// example.d.ts\n// declare function greet(name: string): string;\nconsole.log(\"d.ts files reference type descriptors\");",
        "output": "d.ts files reference type descriptors"
    }
},
  5056: {
    "coreConcept": "Module Augmentation allows adding new declarations to existing declared modules or objects in different scopes (e.g., adding properties to window or express Request objects).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Augmenting local module interface\n// declare global { interface Window { customToken: string; } }\nconsole.log(\"Window contract augmented\");",
        "output": "Window contract augmented"
    }
},
  5057: {
    "coreConcept": "DeepPartial<T> recursively maps all properties of an object and its nested properties to be optional, resolving nested partial configuration updates.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "type DeepPartial<T> = {\n  [P in keyof T]?: DeepPartial<T[P]>;\n};\nconsole.log(\"DeepPartial type compiled\");",
        "output": "DeepPartial type compiled"
    }
},
  5058: {
    "coreConcept": "Decorators are dynamic annotations that can be attached to classes, methods, accessors, properties, or parameters. They execute at runtime and can observe or modify class declarations.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// ES Decorator emulated\n// @logClass\n// class Item {}\nconsole.log(\"Decorators active under experimentalDecorators\");",
        "output": "Decorators active under experimentalDecorators"
    }
},
  5059: {
    "coreConcept": "Type-safe Architecture involves configuring TypeScript compiler flags (strict: true, noImplicitAny, exactOptionalPropertyTypes) to enforce structural validation at system boundaries (like database responses and API clients).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Strict TS flags prevent type degradation\");",
        "output": "Strict TS flags prevent type degradation"
    }
},
  5060: {
    "coreConcept": "Props are external configuration parameters passed down from parent components and are read-only (immutable). State is private, internal data managed within the component itself that can change over time (mutable). Both trigger a re-render when they change.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Props: input data\n// State: internal counter, toggles, form states",
        "output": "Props = Immutable input. State = Mutable local state."
    }
},
  5061: {
    "coreConcept": "useState is the fundamental React Hook for managing local component state in functional components. It accepts an initial state and returns a state variable along with a setter function that updates the value and schedules a re-render of the component.",
    "guideline": "Always use updater functions (setCount(prev => prev + 1)) when computing next state values based on previous state values to avoid closure/stale state bugs.",
    "oneLineAnswer": "useState is a hook that registers mutable state variables inside functional React components and triggers re-renders on update.",
    "bestPractice": "const [count, setCount] = useState(0);\nsetCount(prev => prev + 1);",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Inside a React component:\n// const [isOpen, setIsOpen] = useState(false);\n// setIsOpen(prev => !prev);\nconsole.log(\"useState registered state successfully\");",
        "output": "useState registered state successfully"
    }
},
  5062: {
    "coreConcept": "React Router is the standard routing library for React. It enables client-side routing and dynamic URL navigation within a Single Page Application without reloading the web page.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// <Route path=\"/about\" element={<About />} />\nconsole.log(\"Client-side routing active\");",
        "output": "Client-side routing active"
    }
},
  5063: {
    "coreConcept": "useCallback is a hook that memoizes a function definition itself between renders, preventing function recreation and avoiding unnecessary re-renders of child components that depend on function props.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const handleClick = useCallback(() => doWork(), [dep]);\nconsole.log(\"useCallback prevents function recreation\");",
        "output": "useCallback prevents function recreation"
    }
},
  5064: {
    "coreConcept": "React Query (or TanStack Query) is a declarative asynchronous state management library for React. It manages server state fetching, caching, synchronization, and updating without requiring Redux boilerplate.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });\nconsole.log(\"React Query simplifies server-state lifecycle\");",
        "output": "React Query simplifies server-state lifecycle"
    }
},
  5065: {
    "coreConcept": "The Diffing Algorithm is the O(N) heuristic algorithm React uses for reconciliation. It relies on assumptions: elements of different types generate different trees, and lists of child elements can be tracked across renders using unique 'key' attributes.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Keys must be unique and stable\n// <li key={item.id}>{item.text}</li>",
        "output": "Stable keys prevent duplicate re-render layouts."
    }
},
  5066: {
    "coreConcept": "React Fiber is React's rendering core rewrite introduced in React 16. It enables incremental rendering, which splits rendering work into chunks and spreads it across multiple frames, allowing React to pause, discard, or resume updates to keep the main thread responsive.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"React Fiber uses a linked list of fibers representing components\");",
        "output": "React Fiber uses a linked list of fibers representing components"
    }
},
  5067: {
    "coreConcept": "Client-Side Rendering (CSR) renders the application directly in the browser. The server returns a bare HTML skeleton and a JavaScript bundle. The browser executes the JavaScript to render DOM elements dynamically.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// index.html skeleton loaded, then bundle.js renders DOM nodes",
        "output": "Client execution builds UI on the fly."
    }
},
  5068: {
    "coreConcept": "Hydration is the client-side process where React attaches event listeners to the static HTML structure sent by the server, turning the static page into a fully interactive React application.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// ReactDOM.hydrateRoot(document.getElementById('root'), <App />);",
        "output": "Event listeners attached to pre-rendered server HTML."
    }
},
  5069: {
    "coreConcept": "Streaming SSR allows sending HTML chunk-by-chunk from the server to the client using Node streams. Components wrapped in Suspense are streamed down as they load, rendering content progressively.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// pipeToWebWritable / pipeToNodeWritable",
        "output": "Progressive HTML streaming speeds up page loading."
    }
},
  5070: {
    "coreConcept": "React Compiler (React Forget) is an automatic memoization compiler. It compiles React code to automatically cache hook dependencies and component outputs, removing the need for manual useMemo and useCallback hooks.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"React Compiler automatically inserts memoization checks during build\");",
        "output": "React Compiler automatically inserts memoization checks during build"
    }
},
  5071: {
    "coreConcept": "Module Federation is a Webpack 5 feature that allows a JavaScript application to dynamically run code from another build at runtime, enabling micro frontends to share components without sharing a build pipeline.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Module federation loads federated bundles at runtime\");",
        "output": "Module federation loads federated bundles at runtime"
    }
},
  5072: {
    "coreConcept": "Enterprise Architecture involves configuring codebases with clean layering (presentation, domain, infrastructure), monorepos, caching strategies, and strict code boundaries to support scale.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Clean architecture structures business logic separate from framework\");",
        "output": "Clean architecture structures business logic separate from framework"
    }
},
  5073: {
    "coreConcept": "Axios is a popular promise-based HTTP client for making API requests in JavaScript, frequently used in React Native apps due to interceptor support, automatic JSON transformations, and clean request configurations.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "import axios from 'axios';\nconst res = await axios.get('https://api.com/user');\nconsole.log(res.data);",
        "output": "{ user: 'details' }"
    }
},
  5074: {
    "coreConcept": "Offline Storage strategies maintain app usability without network connectivity. Methods include storing state in AsyncStorage, syncing local SQLite/WatermelonDB, and utilizing redux-persist or RTK Query offline caching.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Local offline caches serve fallback records\");",
        "output": "Local offline caches serve fallback records"
    }
},
  5075: {
    "coreConcept": "Image Picker integration is achieved via libraries like react-native-image-picker or expo-image-picker, letting users select photos from their library or snap a photo directly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const result = await ImagePicker.launchImageLibraryAsync();",
        "output": "Image picker gallery UI displayed."
    }
},
  5076: {
    "coreConcept": "Redux Toolkit (RTK) is the official, opinionated, battery-included toolset for efficient Redux development. It simplifies store configuration, boilerplate, and includes Immer to write mutable-style reducer logic safely.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// const slice = createSlice({ name: 'counter', reducers: { ... } });\nconsole.log(\"RTK simplifies store configuration\");",
        "output": "RTK simplifies store configuration"
    }
},
  5077: {
    "coreConcept": "JavaScript Interface (JSI) is the foundation of React Native's New Architecture. It replaces the bridge with a C++ layer, allowing the JavaScript engine to hold direct C++ references to native objects, permitting synchronous direct execution.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"JSI permits direct synchronous native calls from JS\");",
        "output": "JSI permits direct synchronous native calls from JS"
    }
},
  5078: {
    "coreConcept": "The New Architecture of React Native includes the JSI, Fabric renderer, TurboModules, and Codegen (which generates C++ code contracts from type annotations), removing the asynchronous JSON bridge.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"New Architecture utilizes JSI, Fabric, and TurboModules\");",
        "output": "New Architecture utilizes JSI, Fabric, and TurboModules"
    }
},
  5079: {
    "coreConcept": "React Native operates 3 primary threads: JS Thread (runs JS code/Hermes), Native UI Thread (handles layouts and drawing UI), and Shadow Queue Thread (computes Flexbox layouts before drawing).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(\"Shadow thread translates JS layouts to native nodes\");",
        "output": "Shadow thread translates JS layouts to native nodes"
    }
},
  5080: {
    "coreConcept": "Mobile Security in React Native involves using secure storage (Keychain for iOS, Keystore for Android) to store tokens, obfuscating code, checking for root/jailbreak devices, and enforcing SSL pinning.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// SecureStore.setItemAsync('token', token);\nconsole.log(\"Tokens stored securely\");",
        "output": "Tokens stored securely"
    }
},
  6001: {
    "coreConcept": "The call stack stores execution contexts and primitive values (numbers, strings, booleans, undefined, null) because their size is known at compile time. Objects, arrays, and functions are stored on the heap — an unstructured region for dynamic memory — and the stack only holds a reference (pointer) to their heap location.",
    "oneLineAnswer": "Primitives live on the stack (fixed size, fast); objects live on the heap (dynamic size, accessed by reference).",
    "seniorNuance": "This is why primitives are copied by value and objects by reference — assigning an object copies the stack pointer, not the heap data, so both variables mutate the same underlying structure.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let a = 10;\nlet b = a; // copies the value\nb = 20;\nconsole.log(a); // 10\n\nconst obj1 = { val: 10 };\nconst obj2 = obj1; // copies the reference\nobj2.val = 20;\nconsole.log(obj1.val); // 20",
        "output": "10\n20"
    }
},
  6002: {
    "coreConcept": "The TDZ is the period from the start of a block until a let/const declaration is evaluated. The binding exists (it was hoisted) but is uninitialized, so any access throws a ReferenceError instead of returning undefined like var would.",
    "oneLineAnswer": "TDZ is the time window where a let/const variable is hoisted but not yet initialized, so referencing it throws instead of returning undefined.",
    "seniorNuance": "typeof on a TDZ variable also throws, unlike typeof on a truly undeclared variable — this trips up engineers who assume typeof is always a safe existence check.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(typeof undeclaredVar); // 'undefined' - safe\nconsole.log(typeof tdzVar); // throws ReferenceError\nlet tdzVar = 5;",
        "output": "undefined\nUncaught ReferenceError: Cannot access 'tdzVar' before initialization"
    }
},
  6003: {
    "coreConcept": "Every execution context runs in two phases. The Creation phase sets up the lexical environment, hoists var (as undefined) and function declarations, creates the TDZ for let/const, and determines the value of `this`. The Execution phase then runs the code line by line, assigning real values.",
    "oneLineAnswer": "Creation phase sets up memory (hoisting, this, scope chain); execution phase runs code and assigns values.",
    "seniorNuance": "Function declarations are fully hoisted (name and body) in the creation phase, which is why you can call a function declared with `function` syntax before its line in the source — but a `const fn = () => {}` is only hoisted as a TDZ binding.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(greet()); // works — fully hoisted\nconsole.log(typeof sayHi); // 'undefined' — var hoisted, not yet assigned\n\nfunction greet() { return 'hi'; }\nvar sayHi = function () {};",
        "output": "hi\nundefined"
    }
},
  6004: {
    "coreConcept": "The Global Execution Context (GEC) is created once when the script starts — it creates the global object (window/globalThis) and binds `this` to it in non-strict mode. A new Function Execution Context (FEC) is pushed onto the call stack every time a function is invoked, each with its own variable environment, scope chain, and `this` binding.",
    "oneLineAnswer": "There is exactly one Global Execution Context per program, but a new Function Execution Context is created on every function invocation.",
    "seniorNuance": "Each FEC keeps a reference to its outer lexical environment at the time the function was *defined*, not called — that reference chain is what makes closures possible.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(this === window); // true (browser, non-strict, top-level)\nfunction show() { console.log('new FEC pushed'); }\nshow();",
        "output": "true\nnew FEC pushed"
    }
},
  6005: {
    "coreConcept": "The call stack has a fixed size (engine and platform dependent, typically ~10k-15k frames in V8). Each recursive call pushes a new frame; if a base case is missing or the recursion is too deep, the stack exceeds its limit and the engine throws a RangeError.",
    "oneLineAnswer": "Stack overflow happens when recursive calls push more frames than the fixed-size call stack can hold, usually from a missing or unreachable base case.",
    "seniorNuance": "JavaScript does not guarantee tail-call optimization in production engines (it was in the ES6 spec but only Safari ever shipped it), so converting recursion to an explicit loop or trampoline is the practical fix for deep recursion, not just adding a tail call.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function recurse(n) { return recurse(n + 1); }\ntry {\n  recurse(0);\n} catch (e) {\n  console.log(e instanceof RangeError, e.message);\n}",
        "output": "true Maximum call stack size exceeded"
    }
},
  6006: {
    "coreConcept": "V8 splits the heap into a small 'young generation' (further split into 'nursery' and 'intermediate' spaces) and a larger 'old generation'. Most objects die young, so the young generation is collected frequently with a fast copying algorithm called Scavenger. Objects that survive two GC cycles are promoted to the old generation, which is collected less often using the slower mark-sweep-compact algorithm.",
    "oneLineAnswer": "V8 collects short-lived objects cheaply in a young generation (Scavenger) and long-lived survivors less often in an old generation (mark-sweep-compact).",
    "seniorNuance": "This generational hypothesis — 'most objects die young' — is why creating throwaway objects in hot loops (e.g. inside render functions) is usually cheap, but accidentally keeping references alive (closures, caches, global arrays) forces promotion to the old generation, which is far more expensive to collect.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Pseudocode illustrating the generational split\n// Young Gen (Scavenger, frequent, cheap)\nfunction createTempObjects() {\n  for (let i = 0; i < 1000; i++) {\n    const obj = { i }; // dies immediately, collected fast\n  }\n}\n// Old Gen (Mark-Sweep-Compact, infrequent, expensive)\nconst cache = []; // survives, eventually promoted",
        "output": "// No runtime output — describes V8 internal heap management"
    }
},
  6007: {
    "coreConcept": "A WeakRef wraps an object so that the reference does not count toward keeping it alive — the engine may still collect it. FinalizationRegistry lets you register a callback that runs (at an unspecified, GC-driven time) after an object has been collected, useful for cleanup like releasing native resources tied to a JS object.",
    "oneLineAnswer": "WeakRef holds a non-owning reference to an object so it can still be garbage collected, and FinalizationRegistry lets you run cleanup code after that collection happens.",
    "seniorNuance": "Both are explicitly documented as not-guaranteed-to-run-promptly (or at all, e.g. at page unload) — never use FinalizationRegistry for correctness-critical logic like releasing a lock; it's strictly a memory-optimization / debugging aid, and caching is the far more common legitimate use case for WeakRef.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let obj = { data: 'large payload' };\nconst ref = new WeakRef(obj);\nconsole.log(ref.deref()?.data); // 'large payload' while still alive\nobj = null; // now eligible for GC\n// later, ref.deref() may return undefined once collected",
        "output": "large payload"
    }
},
  6008: {
    "coreConcept": "An IIFE is a function expression that is invoked immediately after being defined, wrapped in parentheses so the parser treats it as an expression rather than a declaration. Before ES6 modules and block scoping, IIFEs were the primary way to create a private scope and avoid polluting the global namespace.",
    "oneLineAnswer": "An IIFE is a function defined and executed in one step, historically used to create an isolated private scope.",
    "seniorNuance": "IIFEs are largely obsolete for scoping now that `let`/`const`/block scope and ES modules exist, but they're still used for one-off async setup at the top level (`(async () => { await init(); })()`) in environments without top-level await.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const counter = (function () {\n  let count = 0;\n  return () => ++count;\n})();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
        "output": "1\n2"
    }
},
  6009: {
    "coreConcept": "The module pattern uses an IIFE that returns an object literal. Variables declared inside the IIFE but not returned remain private, accessible only through the closures formed by the returned methods — giving true encapsulation before ES modules or private class fields existed.",
    "oneLineAnswer": "The module pattern uses an IIFE's closure to keep internal state private while exposing only selected methods on the returned object.",
    "seniorNuance": "Every property on the returned object is a fresh closure holding a reference to the same shared lexical environment, so all exposed methods can read/mutate the same private state without any of it leaking to the global scope.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const BankAccount = (function () {\n  let balance = 0;\n  return {\n    deposit: (amt) => (balance += amt),\n    getBalance: () => balance,\n  };\n})();\nBankAccount.deposit(100);\nconsole.log(BankAccount.getBalance()); // 100\nconsole.log(BankAccount.balance); // undefined — truly private",
        "output": "100\nundefined"
    }
},
  6010: {
    "coreConcept": "With `var`, there is a single function-scoped binding shared across every loop iteration, so by the time an async callback (like setTimeout) runs, the loop has finished and the variable holds its final value. With `let`, each iteration gets a fresh block-scoped binding, so each closure captures its own snapshot of the loop variable.",
    "oneLineAnswer": "var shares one binding across all iterations so async callbacks see the final value; let creates a new binding per iteration so each closure sees its own value.",
    "seniorNuance": "The pre-ES6 fix was wrapping the loop body in an IIFE to force a new scope per iteration — knowing that history is often asked as a follow-up to test whether a candidate understands *why* let fixes it, not just *that* it does.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log('var', i), 0);\n}\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log('let', j), 0);\n}",
        "output": "var 3\nvar 3\nvar 3\nlet 0\nlet 1\nlet 2"
    }
},
  6011: {
    "coreConcept": "`var` declarations are scoped to the nearest enclosing function (or the global scope if outside any function) and ignore block boundaries like `if`, `for`, or bare `{}`. `let` and `const` are scoped to the nearest enclosing block, meaning they only exist within the `{}` they were declared in.",
    "oneLineAnswer": "var is visible throughout its enclosing function regardless of blocks; let/const are only visible inside the block where they're declared.",
    "seniorNuance": "This is exactly why `var` in an `if` block can leak into the surrounding function and silently overwrite an outer variable of the same name — a common source of bugs in large, un-linted legacy codebases.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "if (true) {\n  var x = 1;\n  let y = 2;\n}\nconsole.log(x); // 1 — leaked out of the block\nconsole.log(typeof y); // 'undefined' — y doesn't exist here (ReferenceError if not typeof)",
        "output": "1\nundefined"
    }
},
  6012: {
    "coreConcept": "A named function expression like `const fact = function factorial(n) {...}` binds the name (`factorial`) only inside the function's own scope, not in the enclosing scope — the outer scope must still use `fact` to call it. This internal name is useful for self-recursion and shows up clearly in stack traces and debuggers.",
    "oneLineAnswer": "Naming a function expression makes that name available for recursive self-calls inside the function body without polluting the outer scope.",
    "seniorNuance": "Anonymous function expressions assigned to `const fact = function(n) {...}` show as '(anonymous)' in stack traces and can't reference themselves without reaching for the outer binding, which breaks if the function is later reassigned — the named form is immune to that.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const fact = function factorial(n) {\n  return n <= 1 ? 1 : n * factorial(n - 1);\n};\nconsole.log(fact(5)); // 120\nconsole.log(typeof factorial); // 'undefined' outside the function",
        "output": "120\nundefined"
    }
},
  6013: {
    "coreConcept": "Regular functions get their own `this`, determined dynamically by how they are called (implicit binding on the receiver object, or global/undefined in strict mode). Arrow functions have no `this` of their own — they lexically capture `this` from the enclosing scope at definition time, and it can never be changed by call(), apply(), bind(), or a new call-site.",
    "oneLineAnswer": "Regular functions bind `this` based on how they're called; arrow functions inherit `this` lexically from where they were defined and it's fixed forever.",
    "seniorNuance": "This is exactly why arrow functions are preferred for callbacks inside class methods or object methods (e.g. event handlers, array callbacks) — they naturally preserve the outer `this` without needing `.bind(this)` or a `that = this` closure workaround.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj = {\n  name: 'Rasik',\n  regular: function () { return this.name; },\n  arrow: () => { return this?.name; },\n};\nconsole.log(obj.regular()); // 'Rasik'\nconsole.log(obj.arrow()); // undefined — inherits outer (module/global) this",
        "output": "Rasik\nundefined"
    }
},
  6014: {
    "coreConcept": "`this` is determined by the call-site, not where the function was defined. When a method is detached from its object — passed as a callback, destructured, or reassigned to a variable — it loses its implicit binding and `this` falls back to undefined (strict mode) or the global object.",
    "oneLineAnswer": "A method loses its `this` binding whenever it's called without its owning object as the receiver, e.g. when passed as a bare callback.",
    "seniorNuance": "The three standard fixes are: bind it explicitly (`el.addEventListener('click', obj.method.bind(obj))`), wrap it in an arrow function (`() => obj.method()`), or convert the method to an arrow-function class field so it's bound once per instance at construction time.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj = { name: 'Rasik', greet() { return `Hi ${this.name}`; } };\nconst fn = obj.greet;\ntry { console.log(fn()); } catch (e) { console.log('this.name failed'); }\nconst bound = obj.greet.bind(obj);\nconsole.log(bound()); // 'Hi Rasik'",
        "output": "this.name failed\nHi Rasik"
    }
},
  6015: {
    "coreConcept": "Calling `new Fn()` does four things in order: (1) creates a brand-new plain object, (2) sets that object's internal [[Prototype]] to Fn.prototype, (3) invokes Fn with `this` bound to the new object, and (4) returns the new object automatically — unless Fn explicitly returns its own object, in which case that object is returned instead.",
    "oneLineAnswer": "`new` creates an object linked to the constructor's prototype, runs the constructor with `this` set to it, and returns that object unless the constructor returns another object itself.",
    "seniorNuance": "If a constructor returns a primitive (string, number, etc.), that return value is ignored and the newly created object is returned anyway — only an explicit object return value overrides the default `this`.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function Person(name) {\n  this.name = name;\n  return 'ignored'; // primitive return is ignored\n}\nconst p = new Person('Rasik');\nconsole.log(p.name); // 'Rasik'\nconsole.log(p instanceof Person); // true",
        "output": "Rasik\ntrue"
    }
},
  6016: {
    "coreConcept": "`Function.prototype.bind()` accepts a `this` value plus any number of leading arguments, returning a new function that always calls the original with those arguments pre-filled. Any arguments passed to the bound function are appended after the pre-bound ones — a lightweight, native form of partial application.",
    "oneLineAnswer": "bind() can pre-fill leading arguments in addition to `this`, producing a new function with some parameters already locked in.",
    "seniorNuance": "Unlike a hand-rolled curry function, bind()'s partial application is fixed-arity and one-shot — you can't chain further partial bind() calls to inspect how many arguments remain, which is why libraries implement full currying separately instead of layering bind() calls.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function multiply(a, b) { return a * b; }\nconst double = multiply.bind(null, 2);\nconsole.log(double(5)); // 10\nconsole.log(double(10)); // 20",
        "output": "10\n20"
    }
},
  6017: {
    "coreConcept": "`Object.create(proto)` creates a brand-new object whose internal [[Prototype]] is set directly to the `proto` argument, without invoking any constructor function. Passing `null` creates a truly prototype-less object with no inherited methods at all (not even `toString`).",
    "oneLineAnswer": "Object.create(proto) builds a new object linked directly to the given prototype, bypassing constructors entirely.",
    "seniorNuance": "`Object.create(null)` is the standard way to build a 'dictionary' object immune to prototype pollution attacks (no inherited `__proto__`, `hasOwnProperty`, etc.), which matters when the object's keys come from untrusted user input.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const animal = { speak() { return 'generic sound'; } };\nconst dog = Object.create(animal);\ndog.speak = function () { return 'Woof'; };\nconsole.log(dog.speak()); // 'Woof'\nconsole.log(Object.getPrototypeOf(dog) === animal); // true\n\nconst dict = Object.create(null);\nconsole.log(dict.toString); // undefined — no inherited methods",
        "output": "Woof\ntrue\nundefined"
    }
},
  6018: {
    "coreConcept": "Classical inheritance (Java, C++) copies behavior from a class blueprint into instances at creation time, forming a rigid class hierarchy. JavaScript's prototypal inheritance instead links objects directly to other *objects* via the [[Prototype]] chain — property lookups delegate up the chain at access time, and any object can serve as a prototype for another, dynamically.",
    "oneLineAnswer": "Classical inheritance copies behavior from classes into instances; prototypal inheritance delegates property lookups between live objects at runtime.",
    "seniorNuance": "ES6 `class` syntax is syntactic sugar over the exact same prototype chain — `class Dog extends Animal` still produces `Dog.prototype.__proto__ === Animal.prototype` under the hood, so understanding prototypes is still required to reason about `class` behavior correctly (e.g. static inheritance, method resolution order).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Animal { speak() { return 'sound'; } }\nclass Dog extends Animal {}\nconsole.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true",
        "output": "true"
    }
},
  6019: {
    "coreConcept": "The `static` keyword attaches a method or property directly to the class/constructor function, not to `prototype`. Static members are called on the class itself (`ClassName.method()`) and are not accessible on instances, making them ideal for utility/factory functions related to the class but not tied to a specific instance's state.",
    "oneLineAnswer": "static members belong to the class itself, not to instances, and are typically used for factory methods or class-level utilities/constants.",
    "seniorNuance": "Static members participate in inheritance too — a subclass can call an inherited static method via `Subclass.staticMethod()`, and `this` inside a static method refers to the class that was used to invoke it (useful for static factory methods that must work correctly across subclasses).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Circle {\n  static unit = 'radians';\n  static fromDiameter(d) { return new Circle(d / 2); }\n  constructor(r) { this.r = r; }\n}\nconst c = Circle.fromDiameter(10);\nconsole.log(c.r, Circle.unit); // 5 'radians'",
        "output": "5 radians"
    }
},
  6020: {
    "coreConcept": "Fields and methods prefixed with `#` are private to the class — they can only be accessed from inside the class body, not from outside, subclasses, or even via bracket notation or reflection. Unlike the old convention of naming a field `_field` (which is just a hint), `#field` access from outside throws a real SyntaxError/TypeError.",
    "oneLineAnswer": "#field syntax creates truly private class members enforced by the language itself, unlike the `_field` naming convention which is only a soft signal.",
    "seniorNuance": "Because private fields aren't real properties, `'#balance' in obj` doesn't work and `obj.hasOwnProperty('#balance')` returns false — the correct existence check uses the `#field in obj` ergonomic brand-check syntax introduced alongside private fields.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Account {\n  #balance = 0;\n  deposit(amt) { this.#balance += amt; return this.#balance; }\n}\nconst acc = new Account();\nconsole.log(acc.deposit(100)); // 100\nconsole.log(acc.balance); // undefined — not accessible from outside",
        "output": "100\nundefined"
    }
},
  6021: {
    "coreConcept": "`get`/`set` accessors let a property look like a normal field from the outside while actually running a function on read (`get`) or write (`set`). They're defined in object literals or classes and are useful for validation, computed/derived values, or lazily computing expensive results.",
    "oneLineAnswer": "Getters and setters let property access (`obj.prop` / `obj.prop = x`) transparently trigger custom logic instead of exposing a raw field.",
    "seniorNuance": "A getter with no matching setter effectively creates a read-only property from the outside — assigning to it silently fails in non-strict mode or throws a TypeError in strict mode/classes, which is a clean way to expose derived state without extra boilerplate.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Rectangle {\n  constructor(w, h) { this.width = w; this.height = h; }\n  get area() { return this.width * this.height; }\n  set width(w) { if (w <= 0) throw new Error('invalid'); this._width = w; }\n  get width() { return this._width; }\n}\nconst r = new Rectangle(4, 5);\nconsole.log(r.area); // 20",
        "output": "20"
    }
},
  6022: {
    "coreConcept": "Since JS classes only support single inheritance (`extends` one class), mixins let you compose behavior by writing functions that take a base class and return an extended subclass with extra methods mixed in. Multiple mixins can be applied by chaining: `class Foo extends Serializable(Comparable(Base)) {}`.",
    "oneLineAnswer": "A mixin is a function that takes a class and returns a new subclass with additional methods, used to share behavior across unrelated class hierarchies.",
    "seniorNuance": "Mixins solve the diamond-problem-free composition JS lacks natively, but because each mixin adds a layer to the prototype chain, overusing them can make `instanceof` checks and debugging the method resolution order harder to follow than plain composition (favor-composition-over-inheritance still applies).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const Serializable = (Base) => class extends Base {\n  serialize() { return JSON.stringify(this); }\n};\nclass Point { constructor(x, y) { this.x = x; this.y = y; } }\nclass SerializablePoint extends Serializable(Point) {}\nconsole.log(new SerializablePoint(1, 2).serialize()); // '{\"x\":1,\"y\":2}'",
        "output": "{\"x\":1,\"y\":2}"
    }
},
  6023: {
    "coreConcept": "`obj instanceof Ctor` checks whether `Ctor.prototype` appears anywhere in `obj`'s [[Prototype]] chain, by repeatedly walking `Object.getPrototypeOf(obj)` until it either finds a match (true) or reaches `null` (false). It does not check the constructor's name or any tag — only the actual prototype object reference.",
    "oneLineAnswer": "instanceof walks up an object's prototype chain looking for a reference match to Constructor.prototype, not by comparing constructor names.",
    "seniorNuance": "Because instanceof compares against `Ctor.prototype` by reference, reassigning `Ctor.prototype = {}` after instances were created breaks instanceof for those older instances, and values from a different realm (e.g. an array from an iframe) will fail `instanceof Array` even though they behave like arrays — `Array.isArray()` exists specifically to sidestep that cross-realm issue.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function Foo() {}\nconst f = new Foo();\nconsole.log(f instanceof Foo); // true\nFoo.prototype = {}; // reassigned after instance creation\nconsole.log(f instanceof Foo); // false — chain no longer matches",
        "output": "true\nfalse"
    }
},
  6024: {
    "coreConcept": "CommonJS (CJS) uses `require()`/`module.exports`, loads modules synchronously, and exports a mutable copy of the exports object at require-time. ES Modules (ESM) use `import`/`export`, are loaded asynchronously (allowing static analysis and tree-shaking), and export live, read-only bindings — if the exporting module updates a variable, importers see the updated value.",
    "oneLineAnswer": "CommonJS is synchronous with copied exports; ES Modules are asynchronous, statically analyzable, and export live bindings.",
    "seniorNuance": "Because ESM imports are static (resolved at parse time, not runtime), bundlers can tree-shake unused exports — something impossible with CJS's dynamic `require()` calls, which is a major reason modern bundlers push ESM as the primary format even when targeting Node.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// esm-module.js\nexport let counter = 0;\nexport const inc = () => counter++;\n\n// consumer.js\nimport { counter, inc } from './esm-module.js';\nconsole.log(counter); // 0\ninc();\nconsole.log(counter); // 1 — live binding reflects the update",
        "output": "0\n1"
    }
},
  6025: {
    "coreConcept": "A module can export multiple named bindings (`export const foo`) which must be imported with matching names (optionally aliased), and/or a single default export (`export default`) which the importer can name anything. Named exports are explicit and tree-shakeable per-binding; default exports are convenient for a module's single primary value but harder to statically analyze and rename-refactor safely.",
    "oneLineAnswer": "Named exports expose multiple explicitly-named bindings; a default export exposes one unnamed value that the importer can call whatever it wants.",
    "seniorNuance": "Default exports make automated refactoring tools and tree-shaking slightly weaker (the imported name carries no semantic link back to the source), which is why many style guides (e.g. Airbnb's for utility libraries) prefer named exports exclusively, reserving default exports for framework conventions like a single React component per file.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// utils.js\nexport const add = (a, b) => a + b;\nexport default function multiply(a, b) { return a * b; }\n\n// consumer.js\nimport multiply, { add } from './utils.js';\nconsole.log(add(2, 3), multiply(2, 3)); // 5 6",
        "output": "5 6"
    }
},
  6026: {
    "coreConcept": "`import()` is a function-like operator that asynchronously loads a module and returns a Promise resolving to its module namespace object. Unlike static `import` statements, it can be called conditionally, inside functions, or with a runtime-computed path — the foundation of code-splitting and lazy loading in bundlers.",
    "oneLineAnswer": "import() dynamically and asynchronously loads a module at runtime, returning a Promise, unlike the statically-analyzed top-level import statement.",
    "seniorNuance": "Because it's a real expression (not a statement), dynamic import can be conditioned on runtime logic — e.g. loading a heavy chart library only when a user navigates to the analytics tab — which is exactly how React.lazy() and most router-level code splitting are implemented under the hood.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "async function loadFormatter() {\n  const { formatCurrency } = await import('./formatter.js');\n  return formatCurrency(1000);\n}\n// Loaded on demand, enabling bundle code-splitting",
        "output": "// Module fetched lazily only when loadFormatter() is invoked"
    }
},
  6027: {
    "coreConcept": "In ES modules (not scripts, and not CommonJS), `await` can be used directly at the top level of the module body. The importing modules will wait for that top-level Promise to settle before their own execution continues, effectively making module evaluation itself asynchronous.",
    "oneLineAnswer": "Top-level await lets a module await a Promise directly in its body, and any module importing it will wait for that Promise to resolve before proceeding.",
    "seniorNuance": "This can create real load-order hazards in large dependency graphs — if module A does a slow top-level await, every module that transitively imports A is blocked until it resolves, so it should be reserved for essential startup dependencies (e.g. fetching a remote config) rather than convenience.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// config.js (ESM)\nconst res = await fetch('/api/config');\nexport const config = await res.json();\n\n// main.js\nimport { config } from './config.js'; // waits for config.js to finish\nconsole.log(config);",
        "output": "// main.js only runs after config.js's fetch + json parsing resolve"
    }
},
  6028: {
    "coreConcept": "When modules form a cycle, the engine breaks the loop by returning a partially-populated module for whichever side is still being evaluated when the cycle is detected. In ESM, thanks to live bindings, the importing side sees an initial `undefined`/TDZ-like state for values not yet assigned, but the binding updates automatically once the exporting module finishes running.",
    "oneLineAnswer": "Circular imports resolve to a partially-initialized module on one side of the cycle; ESM's live bindings mean that value updates once the cycle finishes evaluating, while CJS may permanently see a stale snapshot.",
    "seniorNuance": "CommonJS handles this worse than ESM: because CJS exports a value snapshot at require-time, a circular require can capture `module.exports` before the other module finished populating it, silently freezing in an incomplete/empty object — a classic source of 'why is this export undefined' bugs in large Node codebases.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// a.js (CJS)\nconsole.log('a starting');\nexports.done = false;\nconst b = require('./b');\nexports.done = true;\n\n// b.js (CJS)\nconsole.log('b starting');\nconst a = require('./a');\nconsole.log('a.done seen from b:', a.done); // false — a hasn't finished yet",
        "output": "a starting\nb starting\na.done seen from b: false"
    }
},
  6029: {
    "coreConcept": "Tree shaking is dead-code elimination performed by bundlers (Rollup, Webpack, esbuild) that statically analyzes ESM `import`/`export` graphs to strip exports that are never actually used, shrinking the final bundle. It relies on ESM's static, side-effect-analyzable structure — the bundler must be able to prove that removing an export has no observable effect.",
    "oneLineAnswer": "Tree shaking removes unused exports from the final bundle by statically analyzing ESM import/export graphs, which only works reliably with side-effect-free, ESM-authored modules.",
    "seniorNuance": "Barrel files (`export * from './x'` re-export index files) and modules with top-level side effects (e.g. `console.log()` or global CSS imports at module scope) are the two most common things that defeat tree shaking — a `sideEffects: false` flag in package.json and avoiding broad barrel re-exports are standard senior-level fixes for bloated bundles.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// utils.js\nexport const used = () => 'used';\nexport const unused = () => 'unused'; // eliminated if never imported\n\n// main.js\nimport { used } from './utils.js';\nconsole.log(used()); // 'unused' never ships in the final bundle",
        "output": "used"
    }
},
  6030: {
    "coreConcept": "A minimal Promise implementation is a state machine with three states (pending, fulfilled, rejected) that starts pending, can transition exactly once to fulfilled or rejected, stores an internal value/reason, and queues `.then()` callbacks to run asynchronously (via microtask, e.g. queueMicrotask) once settled — or immediately-but-still-async if already settled when `.then()` is called.",
    "oneLineAnswer": "A custom Promise tracks pending/fulfilled/rejected state, locks in a value on the first resolve/reject call, and always invokes .then() callbacks asynchronously via the microtask queue.",
    "seniorNuance": "The trickiest correctness detail interviewers probe is that resolve/reject must be idempotent (only the first call has any effect) and that callbacks registered via `.then()` after the promise has already settled must still fire asynchronously, not synchronously — violating that breaks the guaranteed ordering the real spec provides.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class MyPromise {\n  #state = 'pending'; #value; #callbacks = [];\n  constructor(executor) {\n    const resolve = (val) => this.#settle('fulfilled', val);\n    const reject = (err) => this.#settle('rejected', err);\n    try { executor(resolve, reject); } catch (e) { reject(e); }\n  }\n  #settle(state, value) {\n    if (this.#state !== 'pending') return;\n    this.#state = state; this.#value = value;\n    queueMicrotask(() => this.#callbacks.forEach((cb) => cb()));\n  }\n  then(onFulfilled, onRejected) {\n    const run = () => {\n      if (this.#state === 'fulfilled') onFulfilled?.(this.#value);\n      if (this.#state === 'rejected') onRejected?.(this.#value);\n    };\n    if (this.#state === 'pending') this.#callbacks.push(run);\n    else queueMicrotask(run);\n  }\n}\nnew MyPromise((res) => res(42)).then(console.log); // 42",
        "output": "42"
    }
},
  6031: {
    "coreConcept": "Each `.then()` returns a new Promise, so chains must explicitly `return` a value or Promise from each handler to pass it forward — forgetting to return silently produces `undefined` in the next `.then()`. A second common pitfall is nesting `.then()` calls instead of chaining, which reintroduces callback-pyramid complexity and breaks the linear error-propagation chain.",
    "oneLineAnswer": "Forgetting to `return` inside a .then() handler, or nesting .then() calls instead of flattening them, are the two most common ways developers accidentally break a promise chain.",
    "seniorNuance": "Returning a Promise from inside a `.then()` automatically 'flattens' it — the outer chain waits for that inner Promise to settle before continuing — so nested async work should always be `return`ed, never fired-and-forgotten inside a handler.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "fetchUser(1)\n  .then((user) => { fetchPosts(user.id); }) // BUG: missing return\n  .then((posts) => console.log(posts)); // undefined — didn't wait for fetchPosts\n\nfetchUser(1)\n  .then((user) => fetchPosts(user.id)) // fixed: returns the inner promise\n  .then((posts) => console.log(posts)); // actual posts array",
        "output": "undefined\n[ ...posts ]"
    }
},
  6032: {
    "coreConcept": "After each single macrotask (a script run, a timer callback, an I/O callback) finishes, the engine fully drains the entire microtask queue — including any new microtasks scheduled by earlier microtasks — before rendering or moving to the next macrotask. Synchronous code always runs first, then all queued microtasks (Promise callbacks, queueMicrotask) in FIFO order, then the next macrotask.",
    "oneLineAnswer": "Sync code runs first, then the entire microtask queue is drained (even microtasks scheduled by other microtasks), and only then does the next macrotask (like a setTimeout callback) run.",
    "seniorNuance": "This is the classic senior-level trap question: a Promise chain of any length will always finish executing before a `setTimeout(fn, 0)` scheduled earlier in the same tick, because the whole microtask queue empties before the event loop even considers the macrotask/timer queue.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log('1 sync');\nsetTimeout(() => console.log('2 macrotask'), 0);\nPromise.resolve()\n  .then(() => console.log('3 microtask'))\n  .then(() => console.log('4 microtask (chained)'));\nconsole.log('5 sync');",
        "output": "1 sync\n5 sync\n3 microtask\n4 microtask (chained)\n2 macrotask"
    }
},
  6033: {
    "coreConcept": "A rejected awaited Promise throws inside the async function, so it can be caught with a normal `try/catch`. An alternative, popular in senior codebases, is a helper that wraps a Promise and returns a `[error, data]` tuple (similar to Go's error handling), avoiding nested try/catch blocks entirely for sequential async calls.",
    "oneLineAnswer": "await turns a Promise rejection into a thrown exception, catchable with try/catch, or teams use a [error, data] tuple helper to avoid try/catch nesting.",
    "seniorNuance": "An uncaught rejection inside an async function that isn't awaited anywhere becomes an unhandled promise rejection — a common production bug is calling an async function without awaiting or `.catch()`-ing it ('fire and forget'), silently swallowing errors that should have surfaced.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "async function to(promise) {\n  try { return [null, await promise]; }\n  catch (err) { return [err, null]; }\n}\nasync function run() {\n  const [err, data] = await to(fetch('/api/data'));\n  if (err) return console.log('handled:', err.message);\n  console.log(data);\n}",
        "output": "// Resolves either 'handled: <message>' or the fetched data, never an unhandled rejection"
    }
},
  6034: {
    "coreConcept": "Awaiting each async call inside a `for` loop runs them strictly one after another — the total time is the sum of all individual durations. Starting all the Promises first (without awaiting immediately) and only then awaiting them together (e.g. via `Promise.all`) runs them concurrently, so total time is roughly the duration of the slowest single call.",
    "oneLineAnswer": "await inside a loop serializes independent async calls; kicking them all off first and awaiting together with Promise.all runs them concurrently instead.",
    "seniorNuance": "Sequential awaiting is only correct when each call genuinely depends on the previous one's result — blindly parallelizing independent calls is a very common, very impactful performance fix senior engineers are expected to spot in code review.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Sequential: ~300ms total (100ms each, one after another)\nfor (const id of [1, 2, 3]) { await fetchUser(id); }\n\n// Parallel: ~100ms total (all fired at once)\nawait Promise.all([1, 2, 3].map((id) => fetchUser(id)));",
        "output": "// Same results, but parallel version is ~3x faster for independent calls"
    }
},
  6035: {
    "coreConcept": "`queueMicrotask(fn)` schedules `fn` to run as a microtask, using the exact same queue that Promise `.then()` callbacks use, but without the overhead or semantics of creating an actual Promise object. It's useful when you need microtask-priority timing (before any macrotask/render) without needing a value to be passed forward.",
    "oneLineAnswer": "queueMicrotask() runs a callback on the same microtask queue as Promise .then(), but without creating an actual Promise.",
    "seniorNuance": "It's the standard low-level primitive libraries use to defer a callback 'just enough' to let synchronous batching finish first — e.g. deferring a DOM update or state flush until all synchronous handlers in the current tick have run, before yielding to the next paint/macrotask.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log('1');\nqueueMicrotask(() => console.log('3 microtask'));\nconsole.log('2');",
        "output": "1\n2\n3 microtask"
    }
},
  6036: {
    "coreConcept": "A Promise starts in the 'pending' state and can transition exactly once to either 'fulfilled' (with a value) or 'rejected' (with a reason) — collectively these two are called 'settled'. Once settled, a Promise's state and value are permanently locked; calling resolve/reject again has no effect.",
    "oneLineAnswer": "A Promise moves one-way from pending to either fulfilled or rejected exactly once, and further resolve/reject calls after that are silently ignored.",
    "seniorNuance": "This immutability-after-settling guarantee is what makes `.then()` safe to call multiple times on the same Promise (e.g. from different consumers) — each call always sees the same final value/error, regardless of timing, rather than racing against further state changes.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const p = new Promise((resolve, reject) => {\n  resolve('first');\n  resolve('second'); // ignored — already settled\n  reject('error'); // also ignored\n});\np.then(console.log); // 'first'",
        "output": "first"
    }
},
  6037: {
    "coreConcept": "If a Promise rejects and no `.catch()` handler (or awaiting try/catch) is ever attached to it, the runtime raises an 'unhandledrejection' event (browser) or crashes the process with a warning/error (Node, depending on version) once it determines no handler will ever be added.",
    "oneLineAnswer": "A rejected Promise with no attached error handler triggers an unhandledrejection event in the browser, or can crash a Node process, since the runtime assumes the error was never dealt with.",
    "seniorNuance": "In production, teams attach a global `window.addEventListener('unhandledrejection', ...)` or Node's `process.on('unhandledRejection', ...)` as a last-resort logging/monitoring net, but that's a safety net for bugs, not a substitute for handling rejections at the call site.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Browser\nwindow.addEventListener('unhandledrejection', (event) => {\n  console.error('Unhandled:', event.reason);\n  event.preventDefault();\n});\nPromise.reject(new Error('boom')); // triggers the listener above",
        "output": "Unhandled: Error: boom"
    }
},
  6038: {
    "coreConcept": "A generator function (`function*`) returns a Generator object without running its body immediately. Calling `.next()` runs the body until the next `yield` expression, pausing execution there and returning `{ value, done }`; calling `.next()` again resumes exactly where it left off, preserving all local state across pauses.",
    "oneLineAnswer": "A generator function can pause at yield and resume later via .next(), producing a sequence of values lazily instead of computing them all at once.",
    "seniorNuance": "Because state is preserved across `yield` pauses without any closures or manual bookkeeping, generators are the underlying mechanism async/await is desugared to in some transpilers (Babel's regenerator), and they're the natural tool for implementing custom iterables and cooperative task scheduling.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function* idGenerator() {\n  let id = 1;\n  while (true) yield id++;\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2\nconsole.log(gen.next().value); // 3",
        "output": "1\n2\n3"
    }
},
  6039: {
    "coreConcept": "An object is 'iterable' if it implements `[Symbol.iterator]()`, returning an 'iterator' — an object with a `.next()` method that returns `{ value, done }`. `for...of`, spread syntax (`...`), destructuring, and `Array.from()` all work by calling this protocol, which is why they work uniformly on arrays, strings, Maps, Sets, and any custom object that implements it.",
    "oneLineAnswer": "An object becomes iterable by implementing Symbol.iterator, which returns a .next()-based iterator; that single protocol powers for...of, spread, and destructuring for any data type.",
    "seniorNuance": "Implementing the iterable protocol on a custom class is what unlocks native language ergonomics for it — `for (const x of myCollection)` and `[...myCollection]` work automatically without needing a special library method, purely because the class defines `[Symbol.iterator]`.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Range {\n  constructor(start, end) { this.start = start; this.end = end; }\n  [Symbol.iterator]() {\n    let current = this.start, last = this.end;\n    return { next: () => current <= last ? { value: current++, done: false } : { value: undefined, done: true } };\n  }\n}\nconsole.log([...new Range(1, 4)]); // [1, 2, 3, 4]",
        "output": "[ 1, 2, 3, 4 ]"
    }
},
  6040: {
    "coreConcept": "`Symbol.iterator` is a special, globally-unique built-in Symbol used as a property key. Any object with a method at `obj[Symbol.iterator]` returning a valid iterator is considered iterable by the language itself — arrays, strings, Maps, and Sets all define it natively, and generator functions automatically satisfy it.",
    "oneLineAnswer": "Symbol.iterator is the well-known symbol key the language looks for to determine whether an object supports for...of and spread iteration.",
    "seniorNuance": "Because generator objects are themselves iterators *and* iterable (a generator's `[Symbol.iterator]` returns itself), the easiest way to make a custom class iterable is often to implement `[Symbol.iterator]` as a generator method (`*[Symbol.iterator]() { yield ...; }`) instead of hand-writing a `.next()` object.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Collection {\n  #items = [1, 2, 3];\n  *[Symbol.iterator]() {\n    for (const item of this.#items) yield item * 10;\n  }\n}\nconsole.log([...new Collection()]); // [10, 20, 30]",
        "output": "[ 10, 20, 30 ]"
    }
},
  6041: {
    "coreConcept": "`yield*` delegates iteration to another iterable (array, string, or another generator), yielding each of its values one by one as if they were yielded directly by the outer generator. It also forwards `.next()`, `.throw()`, and `.return()` calls to the inner iterator, and its own expression value is the inner generator's final `return` value.",
    "oneLineAnswer": "yield* forwards iteration (and next/throw/return calls) to another iterable or generator, flattening its yielded values into the outer generator's sequence.",
    "seniorNuance": "yield* is the cleanest way to compose generators — e.g. flattening a tree structure by having each node's generator `yield*` its children's generators recursively — without manually re-implementing forwarding logic for every nested `.next()` call.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function* inner() { yield 'a'; yield 'b'; return 'inner done'; }\nfunction* outer() {\n  const result = yield* inner();\n  yield result;\n}\nconsole.log([...outer()]); // ['a', 'b', 'inner done']",
        "output": "[ 'a', 'b', 'inner done' ]"
    }
},
  6042: {
    "coreConcept": "An async generator (`async function*`) can use both `await` and `yield` in its body, producing a stream of values that each resolve asynchronously. It's consumed with `for await (const val of asyncGen())`, which automatically awaits each yielded Promise before assigning it to the loop variable — ideal for paginated API results or streaming data.",
    "oneLineAnswer": "Async generators combine await and yield to lazily produce a sequence of asynchronously-resolved values, consumed cleanly via for await...of.",
    "seniorNuance": "This is the idiomatic way to model infinite or paginated data sources (e.g. 'fetch the next page only when the consumer asks for it') without loading everything into memory upfront — the consumer drives the pace via the loop, and each `yield` naturally backpressures against network calls.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "async function* fetchPages(url) {\n  let next = url;\n  while (next) {\n    const res = await fetch(next);\n    const page = await res.json();\n    yield page.items;\n    next = page.nextUrl;\n  }\n}\nfor await (const items of fetchPages('/api/items')) {\n  console.log(items);\n}",
        "output": "// Logs each page's items array as it's fetched, one at a time"
    }
},
  6043: {
    "coreConcept": "Because a generator only computes the next value when `.next()` is called, it can represent conceptually infinite sequences (natural numbers, Fibonacci, primes) using a `while (true)` loop with `yield`, without ever materializing the whole sequence in memory. Consumers pull only as many values as they need, e.g. via `take(gen, n)` helpers or breaking out of a `for...of` loop.",
    "oneLineAnswer": "A generator with an unbounded while(true) loop can lazily represent an infinite sequence, since values are only computed on demand as the consumer pulls them.",
    "seniorNuance": "This lazy-pull model is the same fundamental idea behind reactive streams and iterators in functional languages — it decouples 'how a sequence is produced' from 'how much of it is consumed', letting the same generator serve both a `take(5)` caller and a `take(1000)` caller without any change.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function* fibonacci() {\n  let [a, b] = [0, 1];\n  while (true) { yield a; [a, b] = [b, a + b]; }\n}\nfunction take(gen, n) {\n  const result = [];\n  for (const val of gen) { if (result.length >= n) break; result.push(val); }\n  return result;\n}\nconsole.log(take(fibonacci(), 6)); // [0, 1, 1, 2, 3, 5]",
        "output": "[ 0, 1, 1, 2, 3, 5 ]"
    }
},
  6044: {
    "coreConcept": "Currying converts a function `f(a, b, c)` into `f(a)(b)(c)`, where each call takes exactly one argument and returns a new function until all arguments have been supplied, at which point the original function runs. It's a way to build specialized functions incrementally by fixing arguments one at a time.",
    "oneLineAnswer": "Currying transforms f(a, b, c) into f(a)(b)(c), returning a new function after each argument until the function has everything it needs to execute.",
    "seniorNuance": "Currying shines for building reusable, composable pipelines — e.g. `curriedFilter(predicate)(array)` lets you partially apply `predicate` once and reuse the resulting function across many arrays, which is the basis for point-free functional utilities like Ramda's.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const curry = (fn) => (...args) =>\n  args.length >= fn.length ? fn(...args) : (...more) => curry(fn)(...args, ...more);\nconst add3 = curry((a, b, c) => a + b + c);\nconsole.log(add3(1)(2)(3)); // 6\nconsole.log(add3(1, 2)(3)); // 6\nconsole.log(add3(1, 2, 3)); // 6",
        "output": "6\n6\n6"
    }
},
  6045: {
    "coreConcept": "Partial application fixes any number of a function's arguments in one call, returning a new function that accepts the rest all at once (`partial(f, a)(b, c)`). Currying strictly transforms a function into a chain of unary (single-argument) calls. Every curried function is trivially partially-applicable, but not every partial application is a curry.",
    "oneLineAnswer": "Partial application pre-fills some arguments and takes the rest in one call; currying breaks the function into a strict chain of one-argument-at-a-time calls.",
    "seniorNuance": "Interviewers often use this distinction to check depth — a candidate who says 'currying and partial application are the same thing' hasn't internalized that arity matters: `bind()` is partial application, not true currying, since the bound function still accepts multiple remaining arguments at once.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const partial = (fn, ...fixed) => (...rest) => fn(...fixed, ...rest);\nconst add3 = (a, b, c) => a + b + c;\nconst addTo5 = partial(add3, 5);\nconsole.log(addTo5(2, 3)); // 10 — remaining args passed together, not one by one",
        "output": "10"
    }
},
  6046: {
    "coreConcept": "`compose` combines functions right-to-left (`compose(f, g)(x) === f(g(x))`), matching mathematical function composition notation. `pipe` combines left-to-right (`pipe(f, g)(x) === g(f(x))`), often considered more readable since it matches the order functions are listed and data flows. Both build a single function out of many small, reusable, single-purpose ones.",
    "oneLineAnswer": "compose applies functions right-to-left and pipe applies them left-to-right, both building one function out of many small reusable ones.",
    "seniorNuance": "Composition only works cleanly when every function in the chain is unary (accepts exactly one argument) — this is precisely why currying and composition are almost always taught and used together in functional-style codebases.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);\nconst compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);\nconst double = (n) => n * 2;\nconst inc = (n) => n + 1;\nconsole.log(pipe(double, inc)(5)); // (5*2)+1 = 11\nconsole.log(compose(double, inc)(5)); // (5+1)*2 = 12",
        "output": "11\n12"
    }
},
  6047: {
    "coreConcept": "A pure function always returns the same output for the same input and produces no side effects — it doesn't mutate arguments, external state, the DOM, or perform I/O. Anything that touches state outside its own scope (logging, network calls, mutating a passed-in object, reading Date.now()) makes a function impure.",
    "oneLineAnswer": "A pure function's output depends only on its inputs and it causes zero observable side effects outside its own scope.",
    "seniorNuance": "Purity is what makes memoization, easy unit testing, and predictable state management (like Redux reducers, which must be pure) possible — a reducer that mutates the store directly or calls an API breaks time-travel debugging and predictable re-renders.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Impure — mutates the argument (a side effect)\nconst addItemImpure = (arr, item) => { arr.push(item); return arr; };\n\n// Pure — same input always produces same output, no mutation\nconst addItemPure = (arr, item) => [...arr, item];\nconst original = [1, 2];\nconsole.log(addItemPure(original, 3), original); // [1,2,3] [1,2] — original untouched",
        "output": "[ 1, 2, 3 ] [ 1, 2 ]"
    }
},
  6048: {
    "coreConcept": "Immutable updates create a new copy with the change applied instead of modifying the original — using spread syntax for shallow copies (`{...obj, key: newVal}`, `[...arr, newItem]`), `Object.freeze()` for shallow runtime enforcement, or structural-sharing libraries (Immer, Immutable.js) for deep updates that stay efficient by reusing unchanged branches of the data.",
    "oneLineAnswer": "Immutability means producing a new copy on every change instead of mutating in place, typically via spread syntax, Object.freeze, or structural-sharing libraries like Immer.",
    "seniorNuance": "Immutability is what makes cheap reference-equality checks (`prevState !== nextState`) a valid way to detect changes — this is exactly why React and Redux rely on it for `shouldComponentUpdate`/`memo` performance optimizations; mutating state directly breaks that check silently (no re-render happens even though data changed).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const state = { user: { name: 'Rasik' }, items: [1, 2] };\nconst next = { ...state, items: [...state.items, 3] };\nconsole.log(next.items); // [1, 2, 3]\nconsole.log(state.items); // [1, 2] — original unchanged\nconsole.log(next.user === state.user); // true — shallow copy reuses unchanged reference",
        "output": "[ 1, 2, 3 ]\n[ 1, 2 ]\ntrue"
    }
},
  6049: {
    "coreConcept": "Memoization wraps a pure function with a cache (usually a Map keyed by serialized/stringified arguments) — on each call, it first checks whether that argument combination was already computed and returns the cached result instead of recomputing. It only works correctly for pure functions, since it assumes identical inputs always produce identical outputs.",
    "oneLineAnswer": "Memoization caches a pure function's return value by its input arguments so repeated calls with the same arguments skip recomputation.",
    "seniorNuance": "The trade-off is memory for speed — an unbounded cache on a function called with many unique argument combinations (e.g. keyed by user-specific data) can leak memory in a long-lived process, so production memoization typically uses an LRU cache or WeakMap (for object keys) with a bounded size instead of a plain growing Map.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function memoize(fn) {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}\nconst slowSquare = memoize((n) => n * n);\nconsole.log(slowSquare(5)); // 25 (computed)\nconsole.log(slowSquare(5)); // 25 (from cache)",
        "output": "25\n25"
    }
},
  6050: {
    "coreConcept": "Point-free (tacit) style defines functions purely by composing other functions, without naming the data ('points') they operate on. Instead of `const double = (arr) => arr.map(x => x * 2)`, a point-free version composes `map` with the multiplier directly: `const double = map(multiply(2))` — no `arr` parameter is ever named.",
    "oneLineAnswer": "Point-free style builds functions by composing other functions without ever naming the arguments they'll eventually operate on.",
    "seniorNuance": "Point-free code can become a readability liability when overused — heavily composed point-free chains are harder to debug (no intermediate named values to inspect) and can obscure intent, so most senior engineers apply it selectively for small, well-named utility compositions rather than entire business-logic pipelines.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const map = (fn) => (arr) => arr.map(fn);\nconst multiply = (n) => (x) => x * n;\n\n// Pointful — names 'arr' explicitly\nconst doublePointful = (arr) => arr.map((x) => x * 2);\n\n// Point-free — never names the array argument\nconst doublePointFree = map(multiply(2));\nconsole.log(doublePointFree([1, 2, 3])); // [2, 4, 6]",
        "output": "[ 2, 4, 6 ]"
    }
},
  6051: {
    "coreConcept": "Debouncing wraps a function so that calling it repeatedly resets a timer each time — the wrapped function only actually executes once the calls stop for the full delay period. It collapses a rapid burst of events (keystrokes, resize events) into a single trailing invocation.",
    "oneLineAnswer": "Debouncing delays a function's execution until a specified time has passed with no further calls, collapsing a burst of events into one.",
    "seniorNuance": "The classic real-world use is a search-as-you-type input: debouncing the API call by ~300ms means a network request only fires once the user pauses typing, instead of firing on every keystroke — a direct, measurable reduction in backend load and race conditions from out-of-order responses.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst search = debounce((q) => console.log('Searching:', q), 300);\nsearch('r'); search('re'); search('rea'); // only 'rea' search fires, after 300ms of silence",
        "output": "Searching: rea"
    }
},
  6052: {
    "coreConcept": "Throttling wraps a function so that no matter how many times it's called, it only actually executes at most once every `interval` milliseconds — extra calls during the cooldown are either dropped or scheduled for the next allowed slot. Unlike debouncing, throttling guarantees regular, periodic execution even during a continuous burst of calls.",
    "oneLineAnswer": "Throttling ensures a function executes at most once per fixed time interval, regardless of how many times it's actually invoked during that interval.",
    "seniorNuance": "Throttling is preferred over debouncing for continuous-feedback scenarios like scroll or drag handlers, where you want periodic updates *during* the event (e.g. updating a progress bar as the user scrolls), not just a single update after the user stops.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function throttle(fn, interval) {\n  let lastCall = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - lastCall >= interval) { lastCall = now; fn(...args); }\n  };\n}\nconst onScroll = throttle(() => console.log('scroll handled'), 200);\n// Fires at most once every 200ms even if the scroll event fires 60 times/sec",
        "output": "// 'scroll handled' logs at most every 200ms during continuous scrolling"
    }
},
  6053: {
    "coreConcept": "Debounce is right when you only care about the *final* state after activity stops — search input, form validation, window resize 'settle' handlers. Throttle is right when you need *periodic* feedback during ongoing activity — infinite scroll position checks, drag-to-resize previews, mousemove-based tooltips, or rate-limiting button clicks.",
    "oneLineAnswer": "Use debounce when you only need the result after activity stops (search input); use throttle when you need regular updates while activity is still happening (scroll, drag).",
    "seniorNuance": "A common production bug is using debounce for infinite scroll — because the user keeps scrolling continuously, the debounced handler may never fire until they stop, which feels laggy; throttle is the correct choice there since it fires periodically during continuous scrolling.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Search input -> debounce (only care about final query)\nsearchInput.addEventListener('input', debounce(fetchResults, 300));\n\n// Scroll position tracking -> throttle (need periodic updates)\nwindow.addEventListener('scroll', throttle(updateScrollProgress, 100));",
        "output": "// Conceptual comparison — no runtime output"
    }
},
  6054: {
    "coreConcept": "Instead of throttling with a fixed millisecond interval via setTimeout, rAF-based throttling schedules the handler with `requestAnimationFrame`, which runs right before the browser's next repaint (typically ~16.6ms at 60fps). This ensures visual updates (like following mousemove for a custom cursor) never run more often than the screen can actually display, avoiding wasted work.",
    "oneLineAnswer": "rAF-based throttling schedules a handler to run once per browser repaint via requestAnimationFrame, instead of an arbitrary fixed millisecond interval.",
    "seniorNuance": "This technique automatically adapts to the device's actual refresh rate (60Hz, 120Hz, or throttled when the tab is backgrounded) and is paused entirely when the tab isn't visible, which a naive setInterval/setTimeout-based throttle doesn't do — making it the correct choice for visual/animation-driven updates specifically.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function rafThrottle(fn) {\n  let scheduled = false;\n  return (...args) => {\n    if (scheduled) return;\n    scheduled = true;\n    requestAnimationFrame(() => { fn(...args); scheduled = false; });\n  };\n}\nwindow.addEventListener('mousemove', rafThrottle((e) => updateCursor(e.clientX, e.clientY)));",
        "output": "// updateCursor runs at most once per animation frame, in sync with repaints"
    }
},
  6055: {
    "coreConcept": "Event delegation relies on event bubbling — instead of attaching a listener to every individual child element, you attach one listener to a common ancestor and inspect `event.target` to determine which child actually triggered it. This scales efficiently to dynamically added children (no re-binding needed) and drastically reduces the number of listeners in the DOM.",
    "oneLineAnswer": "Event delegation attaches one listener to a parent and uses event.target to identify which child triggered it, instead of binding a listener to every child individually.",
    "seniorNuance": "This is essential for lists that render/re-render dynamically (e.g. a virtualized table or infinite-scroll list) — binding per-row listeners means constantly adding/removing handlers as rows mount/unmount, while delegation on the container needs to be set up exactly once, regardless of how many rows come and go.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "document.getElementById('list').addEventListener('click', (e) => {\n  if (e.target.matches('li.item')) {\n    console.log('Clicked item:', e.target.textContent);\n  }\n});\n// Works even for <li> elements added to the list after this listener was attached",
        "output": "// Logs 'Clicked item: <text>' for any current or future .item child"
    }
},
  6056: {
    "coreConcept": "A DOM event fires in three phases: capturing (from `window` down to the target element), target (on the element itself), then bubbling (back up from the target to `window`). By default, `addEventListener` listens during the bubbling phase; passing `{ capture: true }` as the third argument listens during the capturing phase instead.",
    "oneLineAnswer": "Events travel down from the root to the target in the capturing phase, then back up to the root in the bubbling phase; listeners default to the bubbling phase unless { capture: true } is set.",
    "seniorNuance": "Capturing-phase listeners are useful for intercepting an event *before* it reaches a child that might call `stopPropagation()` — e.g. a top-level analytics click tracker registered with `{ capture: true }` will still fire even if a deeply nested button stops the event from bubbling further.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "document.body.addEventListener('click', () => console.log('capture: body'), { capture: true });\ndocument.getElementById('btn').addEventListener('click', () => console.log('target: btn'));\ndocument.body.addEventListener('click', () => console.log('bubble: body'));\n// Clicking #btn logs, in order:",
        "output": "capture: body\ntarget: btn\nbubble: body"
    }
},
  6057: {
    "coreConcept": "`event.stopPropagation()` prevents the event from continuing to bubble (or capture) to ancestor elements, but does not stop the browser's default action for that element. `event.preventDefault()` cancels the browser's default behavior for the event (like following a link or submitting a form), but does not stop the event from still propagating to parent listeners.",
    "oneLineAnswer": "stopPropagation() stops the event from reaching other listeners up (or down) the DOM tree; preventDefault() cancels the browser's built-in default action, and neither implies the other.",
    "seniorNuance": "A common bug is calling `stopPropagation()` when the intent was actually `preventDefault()` (e.g. trying to stop a form from submitting) — that leaves the default browser action untouched while breaking unrelated delegated listeners on ancestor elements that legitimately needed to observe the event.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "form.addEventListener('submit', (e) => {\n  e.preventDefault(); // stops the page from reloading\n  // event still bubbles up to any listener on document\n  validateAndSubmit(e.target);\n});",
        "output": "// Form submission's default reload is cancelled, but the event still bubbles"
    }
},
  6058: {
    "coreConcept": "`new CustomEvent(name, { detail, bubbles })` creates an event carrying arbitrary application data in `event.detail`, which can then be dispatched on any DOM node with `element.dispatchEvent(event)` and listened for with the normal `addEventListener`. This lets decoupled parts of a UI communicate through the DOM's native event system instead of a custom pub/sub layer.",
    "oneLineAnswer": "CustomEvent lets you create and dispatch application-specific events (with custom data in event.detail) using the browser's native DOM event system.",
    "seniorNuance": "Setting `bubbles: true` lets a custom event be caught via delegation on an ancestor, making it a genuinely useful lightweight cross-component communication channel in vanilla-JS widgets or Web Components, without needing to reach for an external event bus library.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const cartUpdated = new CustomEvent('cart:updated', { detail: { itemCount: 3 }, bubbles: true });\ndocument.addEventListener('cart:updated', (e) => console.log('Cart items:', e.detail.itemCount));\ndocument.getElementById('cart-icon').dispatchEvent(cartUpdated);",
        "output": "Cart items: 3"
    }
},
  6059: {
    "coreConcept": "The Observer pattern defines a one-to-many dependency: a 'subject' maintains a list of 'observer' callbacks and notifies all of them automatically whenever its internal state changes. Observers subscribe/unsubscribe without the subject needing to know anything about who they are.",
    "oneLineAnswer": "In the Observer pattern, a subject maintains a list of dependent observers and automatically notifies all of them whenever its state changes.",
    "seniorNuance": "This is the conceptual foundation of both DOM events (`addEventListener` is literally the Observer pattern) and reactive state libraries (RxJS Subjects, MobX observables) — recognizing that connection is often the actual point of the interview question, not just reciting the GoF definition.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Subject {\n  #observers = [];\n  subscribe(fn) { this.#observers.push(fn); }\n  notify(data) { this.#observers.forEach((fn) => fn(data)); }\n}\nconst temperature = new Subject();\ntemperature.subscribe((t) => console.log('Display A:', t));\ntemperature.subscribe((t) => console.log('Display B:', t));\ntemperature.notify(25);",
        "output": "Display A: 25\nDisplay B: 25"
    }
},
  6060: {
    "coreConcept": "Publish/Subscribe is similar to Observer but adds a layer of indirection — publishers emit named events to a shared broker (event bus/emitter), and subscribers register interest in event names on that same broker, without publishers and subscribers ever referencing each other directly. This is looser coupling than Observer, where the subject holds direct references to its observers.",
    "oneLineAnswer": "Pub/Sub routes events through a shared broker by name, so publishers and subscribers never hold direct references to each other, unlike the more tightly-coupled Observer pattern.",
    "seniorNuance": "In frontend architecture, Pub/Sub is the standard way to let unrelated features communicate (e.g. a 'cart' module and a 'notifications' module) without creating a direct import dependency between them — critical for micro-frontend or plugin-based architectures where modules must stay independently deployable.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class EventBus {\n  #events = {};\n  on(event, cb) { (this.#events[event] ??= []).push(cb); }\n  emit(event, data) { this.#events[event]?.forEach((cb) => cb(data)); }\n}\nconst bus = new EventBus();\nbus.on('user:login', (user) => console.log('Welcome', user.name));\nbus.emit('user:login', { name: 'Rasik' });",
        "output": "Welcome Rasik"
    }
},
  6061: {
    "coreConcept": "A Singleton guarantees only one instance of a class ever exists, typically by caching the instance on first creation and returning that same cached instance on subsequent construction attempts. In JavaScript, ES modules already provide this naturally — a module's top-level exported object is instantiated once and shared by every importer, no special class pattern required.",
    "oneLineAnswer": "A Singleton restricts a class to a single shared instance; in JavaScript, this is usually achieved simply by exporting a pre-instantiated object from an ES module, since modules are cached and shared.",
    "seniorNuance": "Overusing singletons for mutable application state (a shared config or cache object) can make testing painful, since state persists across otherwise-independent test cases unless explicitly reset — many teams avoid the pattern for exactly this reason and prefer dependency injection instead.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class ConfigManager {\n  static #instance;\n  constructor() { if (ConfigManager.#instance) return ConfigManager.#instance; ConfigManager.#instance = this; this.settings = {}; }\n}\nconst a = new ConfigManager();\nconst b = new ConfigManager();\nconsole.log(a === b); // true — same instance",
        "output": "true"
    }
},
  6062: {
    "coreConcept": "A factory function encapsulates the logic for deciding *which* type of object to create and how to configure it, returning a fully-formed object without the caller needing to know the concrete class or constructor details. This decouples object creation from usage, making it easy to swap implementations or add new variants in one place.",
    "oneLineAnswer": "A factory function centralizes object-creation logic, deciding what kind of object to build and how to configure it, so callers don't need to know constructor details.",
    "seniorNuance": "Factories are especially valuable when object creation involves conditional logic based on runtime data (e.g. creating different UI-element classes based on a `type` field from an API response) — hardcoding `new` calls with `if/else` chains scattered across the codebase is exactly what a factory consolidates into one place.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function createNotification(type, message) {\n  const base = { message, timestamp: Date.now() };\n  switch (type) {\n    case 'error': return { ...base, icon: '\\u274c', priority: 'high' };\n    case 'success': return { ...base, icon: '\\u2705', priority: 'low' };\n    default: return { ...base, icon: '\\u2139\\ufe0f', priority: 'normal' };\n  }\n}\nconsole.log(createNotification('error', 'Failed').icon); // '\\u274c'",
        "output": "❌"
    }
},
  6063: {
    "coreConcept": "The Revealing Module Pattern is the module pattern with a stylistic rule: define all functions and variables privately inside the closure, and at the very end, return an object literal that maps public names directly to those already-defined private references — making the public API's shape immediately obvious in one place, rather than scattered `return { key: function(){...} }` definitions.",
    "oneLineAnswer": "The Revealing Module Pattern defines everything privately first, then reveals the public API as a single object that just points to the already-defined private functions.",
    "seniorNuance": "The main benefit over the plain module pattern is readability — anyone can scan the final `return {}` block and immediately see the entire public surface area of the module without scrolling through implementation details, which is genuinely useful in large single-file utility modules.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const Calculator = (function () {\n  let total = 0;\n  function add(n) { total += n; return total; }\n  function reset() { total = 0; }\n  function getTotal() { return total; }\n  return { add, reset, getTotal }; // public API clearly revealed here\n})();\nCalculator.add(5);\nconsole.log(Calculator.getTotal()); // 5",
        "output": "5"
    }
},
  6064: {
    "coreConcept": "The Decorator pattern wraps an existing function/object with another function/object that adds new behavior (logging, caching, validation, timing) before or after delegating to the original — without altering the original's source code. In JavaScript, higher-order functions naturally implement this: `withLogging(fn)` returns a new function that logs, then calls `fn`.",
    "oneLineAnswer": "The Decorator pattern wraps a function or object with additional behavior while delegating to the original, without modifying its source code.",
    "seniorNuance": "This is exactly how middleware in Express or Redux works — each middleware decorates the request/dispatch pipeline with extra behavior (auth, logging) and calls `next()`/the original dispatch, composing many decorators around one core function without ever touching its implementation.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function withLogging(fn) {\n  return (...args) => {\n    console.log('Calling with:', args);\n    const result = fn(...args);\n    console.log('Result:', result);\n    return result;\n  };\n}\nconst add = (a, b) => a + b;\nconst loggedAdd = withLogging(add);\nloggedAdd(2, 3);",
        "output": "Calling with: [ 2, 3 ]\nResult: 5"
    }
},
  6065: {
    "coreConcept": "`new Proxy(target, handler)` creates a wrapper around `target` where the `handler` object's 'traps' (like `get`, `set`, `has`, `deleteProperty`) intercept and can customize fundamental operations performed on the proxy — reading a property, assigning one, checking `in`, deleting a key — before optionally forwarding to the real target via `Reflect`.",
    "oneLineAnswer": "Proxy wraps an object and lets you intercept fundamental operations (get, set, has, delete, etc.) via trap functions defined on a handler object.",
    "seniorNuance": "Proxy is the mechanism Vue 3's reactivity system is built on — instead of Vue 2's `Object.defineProperty`-based getter/setter injection (which couldn't detect new property additions or array index assignments), a Proxy's `get`/`set` traps transparently observe *any* property access, including ones added after the object was created.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const user = { name: 'Rasik' };\nconst proxy = new Proxy(user, {\n  get(target, prop) { console.log('Reading', prop); return target[prop]; },\n  set(target, prop, value) { console.log('Setting', prop, 'to', value); target[prop] = value; return true; },\n});\nproxy.name; // logs 'Reading name'\nproxy.age = 30; // logs 'Setting age to 30'",
        "output": "Reading name\nSetting age to 30"
    }
},
  6066: {
    "coreConcept": "`Reflect` is a built-in object whose methods (`Reflect.get`, `Reflect.set`, `Reflect.has`, `Reflect.deleteProperty`, etc.) mirror the internal operations that Proxy traps intercept, exposing them as regular callable functions. It exists mainly as the correct way to forward a trapped operation to the original target from inside a Proxy handler, guaranteeing spec-correct default behavior.",
    "oneLineAnswer": "Reflect provides method equivalents of the low-level object operations Proxy traps intercept, and is the recommended way to forward those operations to the original target inside a trap.",
    "seniorNuance": "Using `target[prop] = value` instead of `Reflect.set(target, prop, value, receiver)` inside a Proxy `set` trap subtly breaks correctness for inherited proxies (where `this`/`receiver` differs from `target`) — `Reflect` methods correctly propagate the `receiver`, which manual property access does not.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const handler = {\n  get(target, prop, receiver) {\n    console.log('trap fired for', prop);\n    return Reflect.get(target, prop, receiver); // correct forwarding\n  },\n};\nconst proxy = new Proxy({ x: 10 }, handler);\nconsole.log(proxy.x);",
        "output": "trap fired for x\n10"
    }
},
  6067: {
    "coreConcept": "`get`/`set` intercept property reads/writes (useful for validation, reactivity, computed properties). `has` intercepts the `in` operator (useful for hiding certain keys from existence checks, e.g. private-ish fields). `deleteProperty` intercepts `delete obj.key` (useful for protecting specific keys from removal, or logging deletions for an audit trail).",
    "oneLineAnswer": "get/set intercept property read/write, has intercepts the `in` operator, and deleteProperty intercepts `delete` — each can be customized to add validation, hide keys, or block operations.",
    "seniorNuance": "Combining `set` (for validation) with `deleteProperty` (to block removal of required fields) is a common way to build a lightweight runtime schema-enforcement wrapper around a plain object, without needing a full validation library, especially useful for guarding config objects passed between modules.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const protectedFields = new Set(['id']);\nconst safeObj = new Proxy({ id: 1, name: 'Rasik' }, {\n  set(target, prop, value) {\n    if (prop === 'id') throw new Error('id is read-only');\n    target[prop] = value; return true;\n  },\n  deleteProperty(target, prop) {\n    if (protectedFields.has(prop)) throw new Error(`Cannot delete ${prop}`);\n    delete target[prop]; return true;\n  },\n});\ntry { safeObj.id = 2; } catch (e) { console.log(e.message); }",
        "output": "id is read-only"
    }
},
  6068: {
    "coreConcept": "`Symbol()` creates a unique, immutable primitive value guaranteed never to equal any other symbol, even one created with the same description — making it ideal for property keys that must never collide with string keys or other symbols. 'Well-known symbols' (`Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`, etc.) are engine-defined symbols used as hooks the language itself looks for to customize built-in behavior.",
    "oneLineAnswer": "Symbol() creates guaranteed-unique property keys, and well-known symbols like Symbol.iterator are special built-in symbols the language uses as hooks to customize object behavior.",
    "seniorNuance": "Symbol-keyed properties are excluded from `for...in`, `Object.keys()`, and `JSON.stringify()` by default (though `Object.getOwnPropertySymbols()` can still find them), which makes symbols useful for attaching 'hidden' metadata to an object without it leaking into normal enumeration or serialization.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const id = Symbol('id');\nconst id2 = Symbol('id');\nconsole.log(id === id2); // false — always unique\nconst user = { name: 'Rasik', [id]: 123 };\nconsole.log(Object.keys(user)); // ['name'] — symbol key excluded\nconsole.log(JSON.stringify(user)); // '{\"name\":\"Rasik\"}' — symbol key excluded",
        "output": "false\n[ 'name' ]\n{\"name\":\"Rasik\"}"
    }
},
  6069: {
    "coreConcept": "When JavaScript needs to coerce an object to a primitive (e.g. using it in `+`, template literals, or comparisons), it checks for a `[Symbol.toPrimitive]` method first. That method receives a `hint` ('number', 'string', or 'default') and can return a completely custom primitive value for each context, overriding the default `valueOf`/`toString` fallback chain entirely.",
    "oneLineAnswer": "Symbol.toPrimitive lets an object define exactly how it converts to a primitive for numeric, string, or default coercion contexts, overriding valueOf/toString.",
    "seniorNuance": "This is how libraries implement objects that behave naturally in arithmetic and string contexts simultaneously — e.g. a `Money` class that returns cents as a number in numeric contexts but a formatted currency string in string contexts, from the same object.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Money {\n  constructor(cents) { this.cents = cents; }\n  [Symbol.toPrimitive](hint) {\n    if (hint === 'number') return this.cents;\n    if (hint === 'string') return `$${(this.cents / 100).toFixed(2)}`;\n    return `Money(${this.cents})`;\n  }\n}\nconst price = new Money(1999);\nconsole.log(+price); // 1999\nconsole.log(`Price: ${price}`); // 'Price: $19.99'",
        "output": "1999\nPrice: $19.99"
    }
},
  6070: {
    "coreConcept": "A `Map` allows any value (including objects and functions) as a key, preserves insertion order reliably, provides a direct `.size` property, and is optimized for frequent additions/removals. A plain object only allows string/symbol keys (numbers get coerced to strings), inherits prototype properties that can collide with data keys, and requires `Object.keys(obj).length` to get a count.",
    "oneLineAnswer": "Map supports any key type, guarantees insertion order, and has a direct .size property; plain objects only support string/symbol keys and inherit prototype properties that can collide with data.",
    "seniorNuance": "The prototype-pollution risk is the sharpest practical difference — a plain object used as a lookup table is vulnerable to a malicious key like `__proto__` or `constructor` corrupting the prototype chain, while a Map has no such inherited surface, which is why Map is the safer default for dictionaries built from untrusted keys.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const map = new Map();\nconst objKey = { id: 1 };\nmap.set(objKey, 'value for object key');\nconsole.log(map.get(objKey)); // 'value for object key'\nconsole.log(map.size); // 1\nconsole.log([...map.keys()][0] === objKey); // true — object identity preserved as key",
        "output": "value for object key\n1\ntrue"
    }
},
  6071: {
    "coreConcept": "A `Set` stores only unique values (using SameValueZero equality, so duplicates are automatically discarded on insertion) and provides O(1) average-time `.has()` lookups, compared to an array's O(n) `.includes()` scan. It's the natural choice for deduplication and fast membership testing.",
    "oneLineAnswer": "Set automatically enforces value uniqueness and provides O(1) has() lookups, whereas checking uniqueness or membership in an array requires an O(n) scan.",
    "seniorNuance": "`[...new Set(array)]` is the standard one-liner for deduplicating an array of primitives, but it's worth remembering Set uses reference equality for objects — `new Set([{a:1}, {a:1}])` still has size 2, since the two object literals are different references even though they look identical.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const nums = [1, 2, 2, 3, 3, 3];\nconst unique = [...new Set(nums)];\nconsole.log(unique); // [1, 2, 3]\nconst s = new Set(unique);\nconsole.log(s.has(3)); // true — O(1) lookup",
        "output": "[ 1, 2, 3 ]\ntrue"
    }
},
  6072: {
    "coreConcept": "A `WeakMap` only accepts objects as keys, and holds a 'weak' reference to them — if a key object has no other references anywhere in the program, it (and its associated value) is eligible for garbage collection, and the entry silently disappears from the WeakMap. It's also non-enumerable — there's no way to iterate or get the size of a WeakMap.",
    "oneLineAnswer": "WeakMap only accepts object keys and holds weak references to them, so entries are automatically garbage collected once their key object is no longer referenced elsewhere.",
    "seniorNuance": "The canonical use case is attaching private metadata to an object without preventing that object from being garbage collected when the rest of the app is done with it — e.g. storing DOM-element-to-event-handler mappings, or a component instance's private state, without creating a memory leak if the element/instance is later removed.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const privateData = new WeakMap();\nfunction Component(el) {\n  privateData.set(el, { renderCount: 0 });\n}\nlet el = { id: 'div1' };\nComponent(el);\nconsole.log(privateData.get(el).renderCount); // 0\nel = null; // entry becomes eligible for GC — no leak, no manual cleanup needed",
        "output": "0"
    }
},
  6073: {
    "coreConcept": "A `WeakSet` stores only objects (no primitives), holds them weakly (they can still be garbage collected if unreferenced elsewhere), and is non-enumerable/non-iterable — you can only `add`, `has`, and `delete`, never list or count its contents. It's commonly used to mark or tag objects (e.g. 'has this object already been processed?') without leaking memory.",
    "oneLineAnswer": "WeakSet stores objects weakly (allowing garbage collection) and supports only add/has/delete — no iteration — commonly used to tag objects as 'already processed' without leaking memory.",
    "seniorNuance": "A practical pattern is using a WeakSet to prevent processing the same object twice in a recursive traversal (e.g. detecting circular references while walking a graph/tree) without needing to manually clean up the tracking set afterward — once the objects go out of scope, the WeakSet entries vanish on their own.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const visited = new WeakSet();\nfunction traverse(node) {\n  if (visited.has(node)) return console.log('cycle detected, skipping');\n  visited.add(node);\n  node.children?.forEach(traverse);\n}\nconst a = {}; a.self = a; // circular reference\ntraverse(a);\ntraverse(a.self);",
        "output": "cycle detected, skipping"
    }
},
  6074: {
    "coreConcept": "Map accepts any value as a key (primitives or objects), holds strong references (keys stay alive as long as the Map exists), and is fully iterable with a `.size` property. WeakMap only accepts objects as keys, holds weak references (doesn't prevent garbage collection), and is deliberately non-iterable with no `.size` — a direct trade-off between introspectability and automatic memory safety.",
    "oneLineAnswer": "Map is iterable and holds strong references to any key type; WeakMap only accepts object keys, holds weak references so entries can be garbage collected, and is intentionally non-iterable.",
    "seniorNuance": "WeakMap's lack of iteration isn't an oversight — it's a deliberate spec decision, because if you could enumerate a WeakMap's keys, you could observe exactly when garbage collection happened (a non-deterministic, engine-specific detail), which the spec intentionally hides from JavaScript code.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const strong = new Map();\nconst weak = new WeakMap();\nconsole.log(typeof strong.size, typeof weak.size); // 'number' 'undefined'\ntry { [...weak]; } catch (e) { console.log('WeakMap is not iterable'); }",
        "output": "number undefined\nWeakMap is not iterable"
    }
},
  6075: {
    "coreConcept": "Every object property has an associated descriptor with `writable` (can its value be changed?), `enumerable` (does it show up in for...in/Object.keys/JSON.stringify?), and `configurable` (can the descriptor itself be changed or the property deleted?), in addition to `value`. `Object.defineProperty()` lets you set these explicitly instead of relying on the default (all `true`) that normal assignment produces.",
    "oneLineAnswer": "Every property has writable/enumerable/configurable flags controlling whether it can change, appear in enumeration, or be redefined/deleted — set explicitly via Object.defineProperty.",
    "seniorNuance": "This is the exact mechanism Vue 2's older reactivity system and many ORMs use to create 'hidden' internal properties (`enumerable: false`) that exist on an object for bookkeeping but never leak into `JSON.stringify()` output or `for...in` loops that consuming code might run.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj = {};\nObject.defineProperty(obj, 'id', { value: 1, writable: false, enumerable: false, configurable: false });\nobj.id = 999; // silently fails (or throws in strict mode)\nconsole.log(obj.id); // 1 — unchanged\nconsole.log(Object.keys(obj)); // [] — hidden from enumeration",
        "output": "1\n[]"
    }
},
  6076: {
    "coreConcept": "`Object.freeze(obj)` prevents adding new properties, deleting existing ones, and reassigning existing property values on `obj` — attempts silently fail in non-strict mode or throw a TypeError in strict mode. Crucially, it's shallow: freezing an object does not freeze nested objects referenced by its properties.",
    "oneLineAnswer": "Object.freeze() makes an object's own top-level properties immutable (no add/delete/reassign), but nested objects inside it remain fully mutable.",
    "seniorNuance": "The shallow nature is the classic gotcha — `Object.freeze({ user: { name: 'A' } })` still allows `frozen.user.name = 'B'` to succeed, since only the outer object is frozen; deep-freezing requires recursively freezing every nested object yourself.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const config = Object.freeze({ env: 'prod', nested: { debug: false } });\nconfig.env = 'dev'; // silently fails\nconfig.nested.debug = true; // succeeds — nested object is NOT frozen\nconsole.log(config.env, config.nested.debug); // 'prod' true",
        "output": "prod true"
    }
},
  6077: {
    "coreConcept": "`Object.seal(obj)` prevents adding new properties and deleting existing ones (marks all properties `configurable: false`), but unlike `freeze`, existing property values can still be reassigned as long as they were originally `writable`. It's a middle ground between a fully open object and a fully frozen one.",
    "oneLineAnswer": "Object.seal() locks an object's shape (no new/deleted properties) but still allows existing writable properties to have their values changed.",
    "seniorNuance": "Sealing is the right tool when you want to lock a config object's *shape* (guarantee no typo'd or extra keys get added downstream) while still allowing legitimate value updates — freeze is overkill (and wrong) if the object's values are genuinely meant to be mutable during the app's lifecycle.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const settings = Object.seal({ volume: 50 });\nsettings.volume = 80; // allowed — value change on existing property\nsettings.brightness = 100; // silently ignored — new property blocked\ndelete settings.volume; // silently ignored — deletion blocked\nconsole.log(settings); // { volume: 80 }",
        "output": "{ volume: 80 }"
    }
},
  6078: {
    "coreConcept": "`Object.preventExtensions()` only blocks adding new properties — existing ones can still be modified or deleted. `Object.seal()` additionally blocks deletion (but allows value changes on existing writable properties). `Object.freeze()` is the strictest — it also blocks value changes, making existing properties fully read-only. Each is a strict superset of restrictions over the previous.",
    "oneLineAnswer": "preventExtensions blocks new properties only; seal additionally blocks deletion; freeze additionally blocks value changes too — each level is strictly more restrictive than the last.",
    "seniorNuance": "All three checks can be queried at runtime with `Object.isExtensible()`, `Object.isSealed()`, and `Object.isFrozen()` respectively — useful in defensive code or tests that need to assert an object's mutability guarantees haven't been accidentally weakened somewhere else in the codebase.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const a = Object.preventExtensions({ x: 1 });\nconst b = Object.seal({ x: 1 });\nconst c = Object.freeze({ x: 1 });\na.x = 99; b.x = 99; c.x = 99; // a and b succeed, c silently fails\nconsole.log(a.x, b.x, c.x); // 99 99 1",
        "output": "99 99 1"
    }
},
  6079: {
    "coreConcept": "A shallow copy (`{...obj}`, `Object.assign({}, obj)`, `Array.from(arr)`) creates a new top-level container but nested objects/arrays inside it are still the *same references* as in the original — mutating a nested value affects both copies. A deep clone recursively copies every nested level, producing a fully independent structure with no shared references at any depth.",
    "oneLineAnswer": "A shallow copy duplicates only the top level and still shares nested object references with the original; a deep clone recursively duplicates every level so nothing is shared.",
    "seniorNuance": "This is a very common production bug source in state management — a reducer that does `{...state, user: state.user}` (forgetting to also copy `user`) can pass a strict-equality check that hides a mutation bug, since `newState.user === oldState.user` remains true even after `newState.user.name` was changed elsewhere.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const original = { name: 'Rasik', address: { city: 'Chennai' } };\nconst shallow = { ...original };\nshallow.address.city = 'Bangalore';\nconsole.log(original.address.city); // 'Bangalore' — nested object was shared!\n\nconst deep = structuredClone(original);\ndeep.address.city = 'Mumbai';\nconsole.log(original.address.city); // still 'Bangalore' — fully independent",
        "output": "Bangalore\nBangalore"
    }
},
  6080: {
    "coreConcept": "`structuredClone(value)` is a built-in global function that performs a true deep clone using the structured clone algorithm — the same algorithm used internally by `postMessage` and IndexedDB. It handles nested objects, arrays, Maps, Sets, Dates, and circular references correctly, without needing `JSON.parse(JSON.stringify(x))`.",
    "oneLineAnswer": "structuredClone() natively deep-clones objects (including circular references, Maps, Sets, and Dates) without the limitations of the old JSON.stringify/parse trick.",
    "seniorNuance": "Unlike the JSON round-trip hack, structuredClone correctly handles circular references and preserves types like Date and Map — but it still can't clone functions, DOM nodes, or class instances with private fields/prototypes (it throws a DataCloneError), so it's not a universal replacement for every deep-clone scenario.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const circular = { name: 'Node' };\ncircular.self = circular;\nconst cloned = structuredClone(circular);\nconsole.log(cloned.self === cloned); // true — circular reference preserved correctly\nconsole.log(cloned !== circular); // true — fully independent copy",
        "output": "true\ntrue"
    }
},
  6081: {
    "coreConcept": "`Object.is()` behaves like `===` for almost all values, but differs in two specific edge cases: `Object.is(NaN, NaN)` returns `true` (whereas `NaN === NaN` is famously `false`), and `Object.is(0, -0)` returns `false` (whereas `0 === -0` is `true`). This makes Object.is useful anywhere you need mathematically precise identity rather than IEEE-754 equality semantics.",
    "oneLineAnswer": "Object.is() matches === for all values except NaN (Object.is(NaN, NaN) is true) and signed zero (Object.is(0, -0) is false), where it's more mathematically precise.",
    "seniorNuance": "React's internal `Object.is`-based comparison (used in `useState`'s bailout check and dependency array comparisons) is exactly why setting state to `NaN` twice in a row *does* correctly bail out of a re-render, whereas a naive `===` check would treat every `NaN` update as a change.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(NaN === NaN); // false\nconsole.log(Object.is(NaN, NaN)); // true\nconsole.log(0 === -0); // true\nconsole.log(Object.is(0, -0)); // false",
        "output": "false\ntrue\ntrue\nfalse"
    }
},
  6082: {
    "coreConcept": "`Object.assign(target, ...sources)` copies enumerable own properties from each source into `target`, mutating and returning `target` itself. The two common pitfalls are: (1) forgetting `target` is mutated in place — passing an existing object instead of `{}` silently corrupts it — and (2) it only performs a shallow merge, so nested objects with the same key are fully overwritten, not deeply merged.",
    "oneLineAnswer": "Object.assign() mutates its first argument in place (pass {} to avoid corrupting an existing object) and only shallow-merges, so nested keys are overwritten wholesale, not merged.",
    "seniorNuance": "The 'forgot to pass an empty target' bug is subtle because it doesn't throw — `Object.assign(defaults, overrides)` silently mutates the shared `defaults` object, which can then leak stale overridden values into the *next* unrelated call that reuses `defaults`, a classic hard-to-trace production bug.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const defaults = { theme: 'light', nested: { size: 'md' } };\nconst merged = Object.assign({}, defaults, { theme: 'dark', nested: { color: 'blue' } });\nconsole.log(merged.nested); // { color: 'blue' } — 'size' was NOT preserved, shallow overwrite\nconsole.log(defaults.theme); // 'light' — safe, because {} was passed as target",
        "output": "{ color: 'blue' }\nlight"
    }
},
  6083: {
    "coreConcept": "JavaScript implicitly converts operand types to make an operation valid — the `+` operator prefers string concatenation if either operand is a string (or converts via `toPrimitive` with a 'default' hint), while `-`, `*`, `/` always coerce both operands toward numbers. Objects are converted to primitives via `valueOf()`/`toString()` before these rules apply.",
    "oneLineAnswer": "JS coerces operand types based on the operator: + prefers string concatenation if either side is a string, while -, *, / always coerce toward numbers, with objects first converted via valueOf/toString.",
    "seniorNuance": "The interview-classic `[] + []` (empty string) vs `[] + {}` ('[object Object]') both stem from the same rule: both operands are converted to primitives (arrays via join to '', plain objects via default toString to '[object Object]'), then concatenated as strings since `+` saw at least one string-like operand.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(1 + '2'); // '12' — number coerced to string\nconsole.log('5' - 2); // 3 — string coerced to number\nconsole.log([] + []); // '' — both arrays -> ''\nconsole.log([] + {}); // '[object Object]'",
        "output": "12\n3\n\n[object Object]"
    }
},
  6084: {
    "coreConcept": "`===` never coerces — different types are always unequal. `==` applies a specific coercion algorithm: null == undefined (true, only to each other), number vs string coerces the string to a number, boolean is always converted to a number first, and object vs primitive converts the object via toPrimitive before comparing.",
    "oneLineAnswer": "=== never coerces types before comparing; == follows a defined coercion algorithm (null only equals undefined, booleans become numbers, objects convert via toPrimitive) that produces some famously surprising results.",
    "seniorNuance": "The often-quoted `[] == ![]` evaluating to `true` is a great filter question: `![]` is `false` (arrays are truthy, so negating gives false) which coerces to `0`; `[]` coerces via toPrimitive to `''` which coerces to `0` — `0 == 0` is true. The senior-level takeaway is: use === always, and understand == well enough to explain legacy code, not to write new code with it.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(null == undefined); // true\nconsole.log(null === undefined); // false\nconsole.log('' == 0); // true — '' -> 0\nconsole.log([] == ![]); // true — classic gotcha",
        "output": "true\nfalse\ntrue\ntrue"
    }
},
  6085: {
    "coreConcept": "JavaScript has exactly eight falsy values: `false`, `0`, `-0`, `0n` (BigInt zero), `''` (empty string), `null`, `undefined`, and `NaN`. Every other value — including `'0'`, `'false'`, empty arrays `[]`, and empty objects `{}` — is truthy.",
    "oneLineAnswer": "The only falsy values in JavaScript are false, 0, -0, 0n, '', null, undefined, and NaN — everything else, including [] and {}, is truthy.",
    "seniorNuance": "The fact that `[]` and `{}` are truthy trips up many candidates when writing conditionals like `if (someArray)` intending to check emptiness — that only checks reference existence, not length; the correct check is `if (someArray.length)`.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];\nconsole.log(falsyValues.every((v) => !v)); // true\nconsole.log(Boolean([])); // true — empty array is truthy!\nconsole.log(Boolean({})); // true — empty object is truthy!",
        "output": "true\ntrue\ntrue"
    }
},
  6086: {
    "coreConcept": "`typeof []` returns `'object'`, exactly the same as `typeof {}`, because arrays are technically a specialized kind of object internally — `typeof` cannot tell them apart. `Array.isArray()` correctly identifies arrays by checking their internal `[[Class]]`, and unlike `instanceof Array`, it works correctly even across different realms (e.g. an array created inside an iframe).",
    "oneLineAnswer": "typeof returns 'object' for both arrays and plain objects, so Array.isArray() is the only reliable way to check for an array — and it also works correctly across iframes/realms, unlike instanceof.",
    "seniorNuance": "This cross-realm correctness is the real reason `Array.isArray()` exists rather than everyone just using `instanceof Array` — an array constructed in a different `window`/realm has a different `Array` constructor reference, so `instanceof` fails there even though `Array.isArray()` still correctly returns true.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(typeof []); // 'object'\nconsole.log(typeof {}); // 'object' — indistinguishable via typeof\nconsole.log(Array.isArray([])); // true\nconsole.log(Array.isArray({})); // false",
        "output": "object\nobject\ntrue\nfalse"
    }
},
  6087: {
    "coreConcept": "`NaN` (Not-a-Number) is the only value in JavaScript that is not equal to itself under any comparison operator, per the IEEE 754 floating-point spec — `NaN === NaN` and `NaN == NaN` are both `false`. The global `isNaN()` coerces its argument to a number first (so `isNaN('hello')` is confusingly `true`), while `Number.isNaN()` checks strictly, without coercion, returning `true` only for the actual value `NaN`.",
    "oneLineAnswer": "NaN never equals itself under any comparison; use Number.isNaN() (not the coercing global isNaN()) for a reliable, type-safe check, or Number.isNaN(x) / Object.is(x, NaN).",
    "seniorNuance": "The global `isNaN()` function is a well-known footgun precisely because of its coercion — `isNaN('foo')` returns `true` since `'foo'` becomes `NaN` when coerced to a number, which has nothing to do with the input actually *being* NaN; `Number.isNaN('foo')` correctly returns `false`.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(NaN === NaN); // false\nconsole.log(isNaN('hello')); // true — coerces 'hello' to NaN first, misleading\nconsole.log(Number.isNaN('hello')); // false — no coercion, correct\nconsole.log(Number.isNaN(NaN)); // true",
        "output": "false\ntrue\nfalse\ntrue"
    }
},
  6088: {
    "coreConcept": "A Web Worker runs a script in a separate OS-level thread with its own global scope, isolated from the main thread — it has no access to the DOM, `window`, or the main thread's variables. Communication happens exclusively through asynchronous message passing (`postMessage`/`onmessage`), where data is copied via the structured clone algorithm (not shared by reference).",
    "oneLineAnswer": "Web Workers run scripts on a separate thread with no DOM access, communicating with the main thread only via postMessage, which keeps expensive computation from blocking the UI.",
    "seniorNuance": "Because data is copied (not shared) on every postMessage, large payloads (e.g. big typed arrays for image/audio processing) can be expensive to transfer — `Transferable` objects (like ArrayBuffer) can be moved instead of copied via the second argument to postMessage, transferring ownership with zero copy cost.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ numbers: [1, 2, 3, 4, 5] });\nworker.onmessage = (e) => console.log('Sum from worker:', e.data);\n\n// worker.js\nself.onmessage = (e) => {\n  const sum = e.data.numbers.reduce((a, b) => a + b, 0);\n  self.postMessage(sum);\n};",
        "output": "Sum from worker: 15"
    }
},
  6089: {
    "coreConcept": "Node.js's `worker_threads` module runs JavaScript in parallel OS threads within the same process, each with its own V8 instance and event loop, communicating via message passing (like Web Workers) or optionally via `SharedArrayBuffer` for true shared memory. It's the correct tool for CPU-bound work (image processing, heavy computation) that would otherwise block Node's single main event loop.",
    "oneLineAnswer": "worker_threads lets Node.js run genuinely parallel JavaScript on separate threads (communicating via messages or SharedArrayBuffer), used specifically to offload CPU-bound work off the main event loop.",
    "seniorNuance": "Worker threads should be reserved for CPU-bound tasks, not I/O-bound ones — I/O (file reads, network calls, database queries) is already handled efficiently and non-blockingly by libuv's thread pool under the hood, so spinning up a worker thread for a database query is unnecessary overhead compared to just awaiting the async I/O call.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\nif (isMainThread) {\n  const worker = new Worker(__filename, { workerData: 40 });\n  worker.on('message', (result) => console.log('Fibonacci:', result));\n} else {\n  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));\n  parentPort.postMessage(fib(workerData));\n}",
        "output": "Fibonacci: 102334155"
    }
},
  6090: {
    "coreConcept": "A Service Worker is a special kind of Web Worker that sits between the browser and the network, able to intercept `fetch` requests, serve cached responses, and run even when no page using it is open (it has its own lifecycle: install, activate, fetch/message events). It's the foundation of offline-capable web apps and Progressive Web Apps (PWAs).",
    "oneLineAnswer": "A Service Worker is a background network proxy script that can intercept requests and serve cached responses, enabling offline support and push notifications independent of any open page.",
    "seniorNuance": "Service Worker lifecycle management is the tricky part in production — a new Service Worker version installs alongside the old one and only 'activates' (taking control of pages) once all old pages using the previous version are closed, unless you explicitly call `self.skipWaiting()` and `clients.claim()` to force immediate takeover, which itself risks version-mismatch bugs mid-session.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// sw.js\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then((cached) => cached || fetch(event.request))\n  );\n});\n// main.js\nnavigator.serviceWorker.register('/sw.js');",
        "output": "// Requests are served from cache when available, falling back to the network"
    }
},
  6091: {
    "coreConcept": "The Streams API models data as a sequence of chunks that can be produced (`ReadableStream`), consumed (`WritableStream`), or transformed (`TransformStream`) incrementally, without needing to buffer the entire payload in memory first. `fetch()` response bodies are ReadableStreams, letting you process a large download (or generate a large upload) chunk-by-chunk as it arrives.",
    "oneLineAnswer": "Streams model data as incrementally-produced/consumed chunks (Readable/Writable/TransformStream) so large payloads can be processed without buffering everything in memory at once.",
    "seniorNuance": "Streaming is what makes progressive rendering possible — e.g. React's streaming SSR (renderToReadableStream) sends HTML chunks to the browser as they're ready rather than waiting for the entire page to render server-side first, directly improving Time To First Byte for large pages.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const response = await fetch('/large-file');\nconst reader = response.body.getReader();\nlet received = 0;\nwhile (true) {\n  const { done, value } = await reader.read();\n  if (done) break;\n  received += value.length;\n}\nconsole.log('Total bytes received:', received);",
        "output": "// Logs the total byte count after processing the stream chunk by chunk"
    }
},
  6092: {
    "coreConcept": "`AbortController` creates a controller with a `.signal` property (an `AbortSignal`) that can be passed to cancellable APIs like `fetch()`. Calling `controller.abort()` triggers the signal, which causes the associated operation to reject with an `AbortError` (or, for custom async code, fires an 'abort' event the code can listen for and react to manually).",
    "oneLineAnswer": "AbortController provides a signal you can pass to cancellable APIs like fetch(); calling abort() cancels the operation and rejects it with an AbortError.",
    "seniorNuance": "The most important production use case is cleaning up stale requests in React's useEffect — creating a new AbortController per effect run and calling `.abort()` in the cleanup function prevents a slow, outdated request from overwriting state with stale data after the component has already re-rendered for newer props.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const controller = new AbortController();\nfetch('/api/search?q=react', { signal: controller.signal })\n  .then((res) => res.json())\n  .catch((err) => { if (err.name === 'AbortError') console.log('Request cancelled'); });\nsetTimeout(() => controller.abort(), 100); // cancels if not resolved within 100ms",
        "output": "Request cancelled"
    }
},
  6093: {
    "coreConcept": "`fetch()` is Promise-based, has a cleaner streaming-friendly API, and integrates naturally with async/await. `XMLHttpRequest` (XHR) is event-based (`onload`, `onerror`, `onprogress`) and predates Promises entirely, but it natively supports upload progress tracking and request cancellation via `.abort()` without needing a separate controller — capabilities `fetch()` only gained later via AbortController and manual stream reading.",
    "oneLineAnswer": "fetch() is a modern Promise-based API with cleaner async/await ergonomics; XHR is the older event-based API that still natively supports upload progress tracking, which fetch requires extra work to replicate.",
    "seniorNuance": "A subtle but important fetch gotcha: `fetch()` does not reject on HTTP error status codes (404, 500) — it only rejects on network failure — so checking `response.ok` (or `response.status`) manually is required; forgetting this is a very common bug where error responses are silently treated as success.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const res = await fetch('/api/not-found'); // 404\nconsole.log(res.ok); // false — but the promise did NOT reject\nif (!res.ok) throw new Error(`HTTP ${res.status}`); // must check manually",
        "output": "false"
    }
},
  6094: {
    "coreConcept": "`requestIdleCallback(fn)` schedules `fn` to run during a browser idle period — after layout, paint, and any higher-priority tasks have completed — receiving a deadline object (`.timeRemaining()`) so the callback can do incremental work and yield back before it starves the next frame. It's designed for non-urgent background work like analytics batching or pre-fetching.",
    "oneLineAnswer": "requestIdleCallback schedules low-priority work to run only when the browser has spare idle time, checking a deadline so it doesn't block rendering.",
    "seniorNuance": "React's Fiber scheduler was originally inspired by (though ultimately implemented its own version of) this idle-time-yielding concept for cooperative scheduling — breaking a large render into small units of work that can be interrupted between idle-time chunks is exactly the same core idea as concurrent rendering's time-slicing.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "requestIdleCallback((deadline) => {\n  while (deadline.timeRemaining() > 0 && tasks.length > 0) {\n    processTask(tasks.pop());\n  }\n  if (tasks.length > 0) requestIdleCallback(arguments.callee);\n});",
        "output": "// Processes queued tasks only during idle browser time, yielding before blocking a frame"
    }
},
  6095: {
    "coreConcept": "A polyfill checks whether a feature already exists (`if (!Array.prototype.myMethod)`) before defining it, ensuring native implementations are always preferred over the polyfill (native is faster and more spec-compliant). It's then attached to the appropriate prototype so it behaves exactly like a real built-in method for any instance.",
    "oneLineAnswer": "A polyfill checks for the feature's existence first, then defines a spec-matching implementation on the relevant prototype only if it's missing, so native support always takes priority.",
    "seniorNuance": "A correct polyfill should replicate the *exact* spec behavior including edge cases (e.g. sparse arrays, `this` context, thisArg parameter support) — interviewers use polyfill questions specifically to check whether a candidate reads the spec carefully or just approximates the happy path.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "if (!Array.prototype.myIncludes) {\n  Array.prototype.myIncludes = function (searchElement) {\n    for (let i = 0; i < this.length; i++) {\n      if (this[i] === searchElement) return true;\n    }\n    return false;\n  };\n}\nconsole.log([1, 2, 3].myIncludes(2)); // true",
        "output": "true"
    }
},
  6096: {
    "coreConcept": "A faithful `map()` polyfill must: iterate using the array's actual `length` (not assume it's dense), invoke the callback with `(element, index, array)`, skip holes in sparse arrays (native map does not call the callback for empty slots), respect an optional `thisArg` second argument, and return a new array of the same length without mutating the original.",
    "oneLineAnswer": "A correct map() polyfill iterates by length, calls back with (element, index, array), skips holes in sparse arrays, supports a thisArg, and returns a new array without mutating the original.",
    "seniorNuance": "The sparse-array-skipping detail is the one most hand-rolled polyfills get wrong — `[1, , 3].map(x => x * 2)` on the real `map()` produces `[2, <1 empty item>, 6]`, preserving the hole, not `[2, NaN, 6]` or `[2, 0, 6]` — checking `i in this` before invoking the callback is what real engines do.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "Array.prototype.myMap = function (callback, thisArg) {\n  const result = new Array(this.length);\n  for (let i = 0; i < this.length; i++) {\n    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);\n  }\n  return result;\n};\nconsole.log([1, 2, 3].myMap((x) => x * 10)); // [10, 20, 30]",
        "output": "[ 10, 20, 30 ]"
    }
},
  6097: {
    "coreConcept": "A polyfill adds a missing *runtime feature* (a function/API that doesn't exist yet, like `Array.prototype.flat` or `fetch`) by defining it in JavaScript. Transpiling converts new *syntax* (arrow functions, optional chaining, class fields) that an older parser can't even understand into equivalent older syntax, at build time — Babel is the standard transpiler, `core-js` is the standard polyfill library.",
    "oneLineAnswer": "Polyfills add missing runtime features/APIs in JS; transpilers rewrite new syntax into older, equivalent syntax at build time — they solve different problems and are typically used together.",
    "seniorNuance": "A common mistake is assuming Babel alone provides full legacy support — Babel only handles syntax transformation; without also including `core-js` polyfills (or `@babel/preset-env`'s `useBuiltIns` option), code using `Promise`, `Array.prototype.includes`, or `fetch` will still throw a runtime error on older browsers, since the syntax was transpiled but the API was never actually added.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Syntax the parser can't understand -> needs TRANSPILING\nconst greet = (name) => `Hi ${name}`;\n\n// A missing runtime API -> needs POLYFILLING\nif (!Array.prototype.flat) { /* define it */ }\n\n// Babel handles the first; core-js handles the second",
        "output": "// Conceptual comparison — no runtime output"
    }
},
  6098: {
    "coreConcept": "Extending `Error` (`class ValidationError extends Error`) lets you create named, identifiable error types that still work with `instanceof`, carry a proper `.stack` trace, and can attach extra structured metadata (error codes, field names) beyond the plain `.message` string. The constructor must call `super(message)` first to correctly initialize the base Error's message and stack.",
    "oneLineAnswer": "Custom error classes extend Error to create identifiable, instanceof-checkable error types that can carry extra structured metadata beyond a plain message string.",
    "seniorNuance": "In transpiled/older-target builds (targeting ES5), `class CustomError extends Error` can break `instanceof` checks unless `Object.setPrototypeOf(this, CustomError.prototype)` is explicitly called in the constructor — a well-known TypeScript/Babel gotcha worth knowing when debugging why `err instanceof ValidationError` unexpectedly returns false in a compiled bundle.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\ntry {\n  throw new ValidationError('Email is required', 'email');\n} catch (e) {\n  console.log(e instanceof ValidationError, e.field); // true 'email'\n}",
        "output": "true email"
    }
},
  6099: {
    "coreConcept": "`finally` always runs, whether the `try` block succeeds, throws (and is caught), or even if `return` is called inside `try` or `catch` — it runs after the return value is computed but before the function actually returns. If `finally` itself contains a `return` statement, it overrides any pending return value or thrown error from `try`/`catch`.",
    "oneLineAnswer": "finally always executes regardless of try/catch outcome, including overriding pending returns — and a return inside finally silently discards any error or return value from try/catch.",
    "seniorNuance": "The `return` inside `finally` overriding an in-flight exception is a genuinely dangerous footgun — if `try` throws but `finally` has its own `return`, the exception is silently swallowed entirely, with no trace of it ever having happened, which is why linters commonly flag `return`/`throw` inside `finally` blocks.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function test() {\n  try { throw new Error('original error'); }\n  finally { return 'overridden'; } // swallows the exception entirely\n}\nconsole.log(test()); // 'overridden' — the thrown error vanished silently",
        "output": "overridden"
    }
},
  6100: {
    "coreConcept": "Since ES2019, `catch` no longer requires a bound parameter — `catch { ... }` is valid when the handler doesn't need to inspect the error object itself, only needs to know that an error occurred (e.g. falling back to a default value). Previously, `catch (e) { ... }` was mandatory even if `e` went unused.",
    "oneLineAnswer": "Optional catch binding lets you write `catch { }` without an error parameter when the handler doesn't need to inspect the caught error object.",
    "seniorNuance": "This is commonly used in feature-detection patterns — e.g. `try { JSON.parse(input); } catch { return false; }` — where the specific error details are irrelevant and forcing an unused `(e)` parameter would just trigger an unused-variable lint warning for no benefit.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function isValidJSON(str) {\n  try { JSON.parse(str); return true; }\n  catch { return false; } // no error parameter needed\n}\nconsole.log(isValidJSON('{\"a\":1}')); // true\nconsole.log(isValidJSON('not json')); // false",
        "output": "true\nfalse"
    }
},
  6101: {
    "coreConcept": "`a ?? b` evaluates to `b` only when `a` is strictly `null` or `undefined` — unlike `||`, it does not treat other falsy values (`0`, `''`, `false`, `NaN`) as reasons to fall back to the default. This fixes the classic `||`-based default-value bug where a legitimately falsy value gets incorrectly overridden.",
    "oneLineAnswer": "?? falls back to its right side only when the left side is null or undefined, unlike || which falls back for any falsy value — fixing bugs where 0, '', or false get wrongly overridden.",
    "seniorNuance": "The go-to interview example is a quantity or count field: `const qty = input.quantity || 10` incorrectly resets a legitimate `quantity: 0` to `10`, while `input.quantity ?? 10` correctly preserves the explicit zero — a subtle but real production bug class that `??` was specifically introduced to eliminate.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const settings = { quantity: 0, name: '' };\nconsole.log(settings.quantity || 10); // 10 — wrong! 0 is a valid value\nconsole.log(settings.quantity ?? 10); // 0 — correct\nconsole.log(settings.missing ?? 'default'); // 'default'",
        "output": "10\n0\ndefault"
    }
},
  6102: {
    "coreConcept": "`x ||= y` assigns `y` to `x` only if `x` is currently falsy (equivalent to `x || (x = y)`). `x &&= y` assigns only if `x` is currently truthy. `x ??= y` assigns only if `x` is currently `null`/`undefined`. All three are short-circuiting — the right-hand side is only evaluated if the assignment will actually happen, which matters if it has side effects.",
    "oneLineAnswer": "||=, &&=, and ??= combine a logical check with assignment, only performing the assignment (and evaluating its right side) when the corresponding logical condition on the left side holds.",
    "seniorNuance": "The short-circuiting behavior means `obj.value ??= computeExpensiveDefault()` only calls the expensive function when `obj.value` actually needs a default — a genuinely useful lazy-initialization pattern that a naive `obj.value = obj.value ?? computeExpensiveDefault()` doesn't provide (that version always evaluates the right side).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const cache = {};\ncache.data ??= expensiveCompute(); // only runs expensiveCompute() once, on first miss\nconsole.log(cache.data);\ncache.data ??= expensiveCompute(); // skipped entirely — cache.data already set",
        "output": "// Logs the computed value; expensiveCompute() only runs on the first call"
    }
},
  6103: {
    "coreConcept": "A tagged template literal (`tagFn\\`Hello ${name}\\``) calls `tagFn` with the literal's static string parts as the first argument (an array) and each interpolated expression's evaluated value as the remaining arguments, letting the function fully control how the final string (or any other value) is constructed — including escaping, formatting, or internationalization.",
    "oneLineAnswer": "Tagging a template literal passes its static string segments and interpolated values separately into a custom function, which can then build and return any custom output — not just a string.",
    "seniorNuance": "This is exactly how styled-components parses CSS-in-JS (`styled.div\\`color: ${props => props.color};\\``) and how GraphQL client libraries parse `gql\\`query {...}\\`` — the tag function receives the raw query/style text and interpolated variables separately, letting it build an AST or sanitize values before final use.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function highlight(strings, ...values) {\n  return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `<b>${values[i]}</b>` : ''}`, '');\n}\nconst name = 'Rasik', role = 'Engineer';\nconsole.log(highlight`Name: ${name}, Role: ${role}`);",
        "output": "Name: <b>Rasik</b>, Role: <b>Engineer</b>"
    }
},
  6104: {
    "coreConcept": "`BigInt` represents arbitrary-precision integers (suffix `n`, e.g. `123n`, or `BigInt(123)`), able to safely represent integers far larger than `Number.MAX_SAFE_INTEGER` (2^53 - 1) without losing precision. BigInts cannot be mixed with regular numbers in arithmetic operations directly — `1n + 1` throws a TypeError — one side must be explicitly converted first.",
    "oneLineAnswer": "BigInt safely represents arbitrarily large integers beyond Number's 2^53 precision limit, but cannot be mixed with regular numbers in arithmetic without explicit conversion.",
    "seniorNuance": "BigInt is essential when working with 64-bit IDs from systems like Twitter/Snowflake IDs or precise financial calculations in cents at large scale, where converting through `Number` would silently lose precision — a subtle correctness bug that's easy to miss until values get large enough in production.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991\nconsole.log(9007199254740991 + 2); // 9007199254740992 — WRONG, precision lost\nconsole.log(9007199254740991n + 2n); // 9007199254740993n — correct",
        "output": "9007199254740991\n9007199254740992\n9007199254740993n"
    }
},
  6105: {
    "coreConcept": "`arr.flat(depth)` flattens nested arrays up to the given depth (default 1; `Infinity` flattens fully). `arr.flatMap(fn)` is equivalent to `arr.map(fn).flat(1)` but performs both in a single, slightly more efficient pass — commonly used when a mapping function itself returns an array per element (e.g. splitting each string into words).",
    "oneLineAnswer": "flat(depth) flattens nested arrays up to a given depth, and flatMap(fn) combines a map step with a one-level flatten in a single pass.",
    "seniorNuance": "flatMap is the idiomatic way to both filter and map in one step when a callback can return an empty array to 'drop' an element and a single-item array to 'keep/transform' it — avoiding a separate `.filter().map()` chain for that specific pattern.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log([1, [2, 3], [4, [5, 6]]].flat()); // [1, 2, 3, 4, [5, 6]]\nconsole.log([1, [2, [3, [4]]]].flat(Infinity)); // [1, 2, 3, 4]\nconsole.log(['hello world', 'foo bar'].flatMap((s) => s.split(' ')));",
        "output": "[ 1, 2, 3, 4, [ 5, 6 ] ]\n[ 1, 2, 3, 4 ]\n[ 'hello', 'world', 'foo', 'bar' ]"
    }
},
  6106: {
    "coreConcept": "Array destructuring supports skipping elements with empty commas (`const [, second] = arr`), default values for missing/undefined elements (`const [a = 10] = arr`), nested destructuring (`const [[a, b]] = [[1, 2]]`), and collecting the remainder with rest (`const [first, ...rest] = arr`) — all combinable in a single pattern.",
    "oneLineAnswer": "Array destructuring can skip elements with blank commas, apply default values, destructure nested arrays, and collect remaining elements with a rest pattern, all in one expression.",
    "seniorNuance": "A frequently-missed detail: default values only kick in for `undefined`, not for other falsy values or `null` — `const [a = 5] = [null]` gives `a === null`, not `5`, which is the same semantic as default function parameters and a common source of confusion when API data might explicitly contain `null`.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const [, second, ...rest] = [1, 2, 3, 4];\nconsole.log(second, rest); // 2 [3, 4]\nconst [a = 5] = [undefined];\nconst [b = 5] = [null];\nconsole.log(a, b); // 5 null — default only applies to undefined",
        "output": "2 [ 3, 4 ]\n5 null"
    }
},
  6107: {
    "coreConcept": "Object destructuring supports renaming a property to a different local variable name (`const { name: userName } = obj`), combining renaming with a default value (`const { age: userAge = 18 } = obj`), and nested destructuring for deeply structured objects — all in one concise declaration, commonly used for cleanly extracting function parameters or API response fields.",
    "oneLineAnswer": "Object destructuring can rename extracted properties to new local variable names and supply default values simultaneously, useful for avoiding naming collisions or handling optional API fields.",
    "seniorNuance": "Renaming with defaults is especially valuable when destructuring function parameters directly in the signature — `function Card({ title: cardTitle, subtitle = 'N/A' }) {}` — since it avoids intermediate variables while still guarding against missing optional props, a pattern used constantly in React component signatures.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const response = { user_name: 'Rasik' };\nconst { user_name: userName, role = 'guest' } = response;\nconsole.log(userName, role); // 'Rasik' 'guest'",
        "output": "Rasik guest"
    }
},
  6108: {
    "coreConcept": "Before `globalThis`, accessing the global object required different syntax per environment — `window` in browsers, `self` in workers, `global` in Node.js, and none of these existed universally. `globalThis` is a standardized ES2020 property that always refers to the global object, regardless of which environment the code is running in.",
    "oneLineAnswer": "globalThis is a single, standardized reference to the global object that works consistently across browsers, Web Workers, and Node.js, replacing the need for environment-specific checks like window/self/global.",
    "seniorNuance": "This matters most for isomorphic libraries that must run identically in Node and the browser — code that previously needed `typeof window !== 'undefined' ? window : global` feature-detection boilerplate can now just reference `globalThis` directly and trust it resolves correctly everywhere.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(typeof globalThis); // 'object' — works in browser, Node, or Worker\nglobalThis.myGlobalFlag = true;\nconsole.log(globalThis.myGlobalFlag); // true",
        "output": "object\ntrue"
    }
},
  6109: {
    "coreConcept": "A sparse array has 'holes' — indices with no actual value assigned, distinct from an index explicitly set to `undefined`. Methods like `forEach`, `map`, and `filter` skip holes entirely (never invoking the callback for them), while `for` loops and `.length` still count them, which is why `[1, , 3].length` is `3` but `[1, , 3].forEach()` only fires twice.",
    "oneLineAnswer": "Array holes (missing indices, e.g. from [1, , 3] or `new Array(3)`) are skipped by iteration methods like map/forEach/filter but still count toward .length, unlike an index explicitly set to undefined.",
    "seniorNuance": "`new Array(3)` creates a sparse array of length 3 with zero actual elements — calling `.map()` on it does nothing (all holes are skipped), which is why `new Array(3).fill(0).map(...)` (fill first, to convert holes into real values) is the standard idiom for generating a sequence, not `new Array(3).map(...)` directly.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const sparse = [1, , 3];\nconsole.log(sparse.length); // 3\nconsole.log(1 in sparse); // false — index 1 is a hole, not just undefined\nsparse.forEach((v) => console.log('visited', v)); // only fires for indices 0 and 2",
        "output": "3\nfalse\nvisited 1\nvisited 3"
    }
},
  6110: {
    "coreConcept": "In Node.js, `process.nextTick()` schedules a callback on its own queue that is fully drained *before* the regular Promise microtask queue, after every phase of the event loop (and even between microtasks currently being processed). This makes `process.nextTick` callbacks run with strictly higher priority than `Promise.then()` callbacks.",
    "oneLineAnswer": "process.nextTick() runs on a Node-specific queue with higher priority than Promise microtasks — it's fully drained before the Promise microtask queue gets a turn.",
    "seniorNuance": "Recursive/excessive use of `process.nextTick()` can starve the event loop entirely (a classic Node.js production incident) — since its queue is drained completely before moving on, a callback that keeps re-scheduling itself via nextTick can block I/O callbacks and timers indefinitely, unlike setImmediate which always yields to the next event loop phase.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log('1 sync');\nprocess.nextTick(() => console.log('2 nextTick'));\nPromise.resolve().then(() => console.log('3 promise microtask'));\nconsole.log('4 sync');",
        "output": "1 sync\n4 sync\n2 nextTick\n3 promise microtask"
    }
},
  6111: {
    "coreConcept": "Node's event loop (via libuv) cycles through named phases each iteration: timers (setTimeout/setInterval callbacks whose time has elapsed), pending callbacks, poll (retrieving new I/O events, executing I/O callbacks), check (setImmediate callbacks), and close callbacks — with the full microtask queue (Promises + process.nextTick) drained between every single phase transition, not just once per full loop.",
    "oneLineAnswer": "Node's event loop runs distinct phases (timers, pending callbacks, poll, check, close) via libuv, draining the entire microtask queue between each phase transition — a more granular model than the browser's single task/microtask split.",
    "seniorNuance": "This is why `setTimeout(fn, 0)` vs `setImmediate(fn)` ordering is famously non-deterministic when called from the top-level script (depends on process performance/timing), but deterministic (setImmediate always wins) when both are called from *within* an I/O callback, since that callback runs in the poll phase and setImmediate's check phase is guaranteed to run next, before the event loop cycles back to timers.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const fs = require('fs');\nfs.readFile(__filename, () => {\n  setTimeout(() => console.log('timeout'), 0);\n  setImmediate(() => console.log('immediate'));\n});\n// Inside an I/O callback, setImmediate always fires before the next setTimeout(0)",
        "output": "immediate\ntimeout"
    }
},
  6112: {
    "coreConcept": "`setTimeout(fn, 0)` schedules `fn` for the timers phase, requiring at least the specified delay (clamped to a minimum) to have elapsed. `setImmediate(fn)` schedules `fn` specifically for the check phase, which runs immediately after the current poll phase completes — designed explicitly to run 'as soon as possible after I/O', distinct from a timer-based delay.",
    "oneLineAnswer": "setTimeout(fn, 0) waits for the timers phase after at least a minimal delay; setImmediate(fn) runs in the check phase right after the current poll/I/O phase, which is Node's intended way to defer work until 'right after I/O finishes'.",
    "seniorNuance": "setImmediate is generally preferred over setTimeout(fn, 0) for 'defer to next tick after I/O' use cases specifically because its semantics are the accurate match for that intent — setTimeout(0) is really 'run this after roughly 1ms', an implementation detail of the timers phase, not a true 'run immediately after I/O' guarantee.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const fs = require('fs');\nfs.readFile(__filename, () => {\n  setImmediate(() => console.log('runs right after this I/O callback'));\n  setTimeout(() => console.log('may run later, timer-phase dependent'), 0);\n});",
        "output": "runs right after this I/O callback\nmay run later, timer-phase dependent"
    }
},
  6113: {
    "coreConcept": "`reduce()` is a general-purpose fold that can implement essentially any other array method — grouping items into an object by a key, flattening nested arrays, counting occurrences, or even implementing `map`/`filter` themselves — by choosing the right initial accumulator type (object, array, Map) instead of always assuming a number.",
    "oneLineAnswer": "reduce() is a general-purpose fold that can build any accumulator shape (object, array, Map), making it powerful enough to implement grouping, counting, flattening, or even map/filter themselves.",
    "seniorNuance": "Overusing reduce() for logic that a dedicated method (map/filter/find) already expresses more clearly is a common code-review pushback — reduce is powerful but less readable for simple transformations, so senior engineers reserve it for genuinely fold-shaped problems like grouping or building a lookup object.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const orders = [{ status: 'done' }, { status: 'pending' }, { status: 'done' }];\nconst grouped = orders.reduce((acc, order) => {\n  (acc[order.status] ??= []).push(order);\n  return acc;\n}, {});\nconsole.log(grouped); // { done: [...2 items], pending: [...1 item] }",
        "output": "{ done: [ { status: 'done' }, { status: 'done' } ], pending: [ { status: 'pending' } ] }"
    }
},
  6114: {
    "coreConcept": "`map()` returns a brand-new array built from the callback's return values, and is intended for transforming data immutably. `forEach()` always returns `undefined` and exists purely for running side effects per element — using `map()` when you discard the result (not assigning it) is a semantic mismatch that misleads readers into thinking a transformation is happening.",
    "oneLineAnswer": "map() returns a new transformed array and should be used when you need that array; forEach() returns undefined and exists purely for side effects, with no transformation intent.",
    "seniorNuance": "Using `map()` purely for side effects (and ignoring the returned array) is a common code-smell flagged in reviews — it implies to readers that a new array is being produced and used somewhere, when really `forEach()` (or a plain `for...of` loop, which also supports `break`/`continue`, unlike either array method) communicates intent more accurately.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const nums = [1, 2, 3];\nconst doubled = nums.map((n) => n * 2); // intent: produce a new array\nconsole.log(doubled); // [2, 4, 6]\nnums.forEach((n) => console.log('side effect:', n)); // intent: just iterate",
        "output": "[ 2, 4, 6 ]\nside effect: 1\nside effect: 2\nside effect: 3"
    }
},
  6115: {
    "coreConcept": "A sort is 'stable' if two elements considered equal by the comparator function retain their original relative order after sorting. As of ES2019, `Array.prototype.sort()` is required by spec to be stable in all conforming engines — this wasn't always guaranteed in older engines/versions, which caused subtle bugs when sorting by one field after already having sorted by another.",
    "oneLineAnswer": "A stable sort preserves the relative order of elements considered equal by the comparator; modern JS engines (ES2019+) guarantee Array.prototype.sort() is always stable.",
    "seniorNuance": "Stability is what enables multi-level sorting by chaining single-key sorts — sort by `lastName` first, then stably sort by `department`, and within each department the names remain alphabetically ordered — a common real-world pattern for building sortable data tables without a compound comparator.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const people = [\n  { name: 'Bob', dept: 'Eng' },\n  { name: 'Amy', dept: 'Sales' },\n  { name: 'Cara', dept: 'Eng' },\n];\nconst byName = [...people].sort((a, b) => a.name.localeCompare(b.name));\nconst byDept = byName.sort((a, b) => a.dept.localeCompare(b.dept));\nconsole.log(byDept.map((p) => p.name)); // ['Bob', 'Cara', 'Amy'] — Eng names stay alphabetical",
        "output": "[ 'Bob', 'Cara', 'Amy' ]"
    }
},
  6116: {
    "coreConcept": "An array-like object has numeric-string keys (`0`, `1`, `2`, ...) and a `length` property, but is not an actual `Array` instance and doesn't have array methods on its prototype — `arguments`, `NodeList`, and `HTMLCollection` are common examples. They can't directly call `.map()`, `.filter()`, etc., without first being converted to a real array.",
    "oneLineAnswer": "Array-like objects (arguments, NodeList, HTMLCollection) have indexed keys and a length property but aren't true Arrays and lack array prototype methods until explicitly converted.",
    "seniorNuance": "`NodeList` from `querySelectorAll` is iterable (supports `for...of` and spread) but is still not a true array and lacks `.map()`/`.filter()` — a very common real-world bug is calling `.map()` directly on a `querySelectorAll()` result and getting a TypeError, requiring `Array.from()` or spread first.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function sum() {\n  console.log(Array.isArray(arguments)); // false — array-like, not a real array\n  return Array.from(arguments).reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3)); // 6",
        "output": "false\n6"
    }
},
  6117: {
    "coreConcept": "The three standard conversion techniques are: `Array.from(arrayLike)` (most explicit and readable, also accepts an optional map function as a second argument), spread syntax `[...arrayLike]` (requires the object to be iterable, not just array-like — works for NodeList but not for `arguments` in the same way as Array.from with older engines), and `Array.prototype.slice.call(arrayLike)` (the pre-ES6 idiom, rarely needed today).",
    "oneLineAnswer": "Array.from() and spread syntax [...x] are the modern ways to convert an array-like or iterable object into a true array, replacing the older Array.prototype.slice.call() idiom.",
    "seniorNuance": "`Array.from()` is preferred over spread specifically because it works on array-like objects that aren't iterable at all (something with just numeric keys and `.length` but no `Symbol.iterator`), whereas spread syntax strictly requires the iterable protocol — making `Array.from` the more universally-safe choice.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const nodeList = document.querySelectorAll('div'); // NodeList, iterable\nconst arr1 = Array.from(nodeList);\nconst arr2 = [...nodeList];\nconst arr3 = Array.from({ length: 3 }, (_, i) => i * 2); // works with plain array-like too\nconsole.log(arr3); // [0, 2, 4]",
        "output": "[ 0, 2, 4 ]"
    }
},
  6118: {
    "coreConcept": "Strings are a primitive type in JavaScript, and primitives are immutable — no method (`.toUpperCase()`, `.slice()`, `.replace()`, etc.) can change a string's existing characters in place. Every string-transforming method returns a brand-new string, leaving the original completely untouched.",
    "oneLineAnswer": "Strings are immutable primitives, so every string method returns a new string rather than modifying the original in place.",
    "seniorNuance": "This is why `str[0] = 'X'` silently does nothing (no error, no effect) — bracket notation on a string only reads a character, it can never assign one, which surprises engineers coming from languages where strings are mutable character arrays (like C).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let str = 'hello';\nstr[0] = 'H'; // silently does nothing\nconsole.log(str); // 'hello' — unchanged\nconst upper = str.toUpperCase(); // returns a NEW string\nconsole.log(str, upper); // 'hello' 'HELLO'",
        "output": "hello\nhello HELLO"
    }
},
  6119: {
    "coreConcept": "Template literals (backtick strings with `${expr}` interpolation) embed expressions directly and support multi-line strings without escape characters, improving readability over chained `+` concatenation. They also support tagged templates for custom processing, something plain concatenation has no equivalent for.",
    "oneLineAnswer": "Template literals embed expressions directly with ${} and support real multi-line strings, making them more readable than chained + concatenation, which also has no equivalent of tagged-template processing.",
    "seniorNuance": "Beyond readability, template literals avoid a common concatenation bug where `+` unexpectedly performs numeric addition instead of string concatenation depending on operand order/type (`1 + 1 + 'px'` is `'2px'`, but `'px' + 1 + 1` is `'px11'`) — interpolation makes the intended string boundaries explicit and unambiguous.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const name = 'Rasik', years = 7;\nconst old = 'Hi ' + name + ', you have ' + years + ' years of experience.';\nconst modern = `Hi ${name}, you have ${years} years of experience.`;\nconsole.log(old === modern); // true — same result, but template literal is clearer to write",
        "output": "true"
    }
},
  6120: {
    "coreConcept": "`String.raw` is a tag function that returns a template literal's raw string content exactly as typed, without processing escape sequences like `\\n` or `\\t` — `String.raw\\`\\n\\`` produces the two literal characters `\\` and `n`, not an actual newline. It's the standard tool for writing Windows file paths or regex patterns without double-escaping backslashes.",
    "oneLineAnswer": "String.raw returns a template literal's raw, unprocessed text — escape sequences like \\n stay as literal backslash-n characters instead of being interpreted.",
    "seniorNuance": "This is exactly why Windows path strings are much cleaner with String.raw: `String.raw\\`C:\\Users\\name\\`` works correctly without doubling every backslash, whereas a normal template literal would try to interpret `\\U`, `\\n`, etc. as (invalid or unintended) escape sequences.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log(`Line1\\nLine2`.length); // 11 — \\n is an actual newline character\nconsole.log(String.raw`Line1\\nLine2`.length); // 12 — \\ and n are two separate literal characters\nconsole.log(String.raw`C:\\Users\\name`); // 'C:\\Users\\name' — backslashes preserved as-is",
        "output": "11\n12\nC:\\Users\\name"
    }
},
  6121: {
    "coreConcept": "A tail call is a function call that is the very last action in a function, with its result returned directly (no further computation after it). Proper Tail Call Optimization (PTCO) would let the engine reuse the current stack frame instead of pushing a new one, letting tail-recursive functions run in constant stack space. Although ES6 specifies PTCO, only Safari's JavaScriptCore has ever shipped it — V8 (Chrome/Node) and SpiderMonkey (Firefox) deliberately did not implement it.",
    "oneLineAnswer": "Tail call optimization would let a properly tail-recursive function run in constant stack space, and while ES6 specifies it, only Safari actually implements it — V8 and Firefox do not, so deep tail recursion still risks a real stack overflow in most environments.",
    "seniorNuance": "Because you can't rely on TCO across engines, the practical senior-level fix for genuinely deep recursion (not just refactoring to be 'tail-call shaped') is converting to an explicit iterative loop or a trampoline pattern (returning a thunk instead of recursing, with an outer loop 'bouncing' through thunks) rather than trusting the engine to optimize it away.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Tail-recursive shape — but NOT optimized in V8/Node\nfunction factorial(n, acc = 1) {\n  if (n <= 1) return acc;\n  return factorial(n - 1, n * acc); // tail position, but still pushes a new frame in V8\n}\n// factorial(100000) still throws RangeError in Node, despite being tail-recursive",
        "output": "// RangeError: Maximum call stack size exceeded in V8/Node for large n"
    }
},
  6122: {
    "coreConcept": "Recursion often expresses tree/graph traversal and divide-and-conquer algorithms far more naturally and readably than an equivalent iterative version with a manual stack. Iteration avoids the risk of a stack overflow on deep/unbounded input and typically has lower per-call overhead (no new stack frame, no function-call bookkeeping) than recursion.",
    "oneLineAnswer": "Recursion is more readable for naturally recursive structures like trees, but iteration avoids stack-overflow risk on deep input and has lower call overhead — the choice trades clarity for robustness/performance.",
    "seniorNuance": "The senior-level decision framework: use recursion when the input depth is bounded and known-small (e.g. a UI component tree, a fixed-depth config object), and prefer iteration (or an explicit stack) whenever input depth is attacker-controlled or unbounded — like recursively parsing arbitrary user-submitted JSON, which could otherwise be used to crash the process via a maliciously deep structure.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Recursive — clean, but risks stack overflow on deep trees\nfunction sumTreeRecursive(node) {\n  if (!node) return 0;\n  return node.value + node.children.reduce((s, c) => s + sumTreeRecursive(c), 0);\n}\n\n// Iterative — safe for arbitrary depth, uses an explicit stack\nfunction sumTreeIterative(root) {\n  let sum = 0; const stack = [root];\n  while (stack.length) {\n    const node = stack.pop();\n    sum += node.value;\n    stack.push(...node.children);\n  }\n  return sum;\n}",
        "output": "// Both produce the same sum; the iterative version scales to arbitrary tree depth safely"
    }
},
  6123: {
    "coreConcept": "The JavaScript engine itself runs on a single thread — only one line of JS code executes at any given moment, with no true parallel execution of JS logic within one realm. Asynchronous behavior (timers, network requests, file I/O) is handled by the surrounding runtime environment (browser Web APIs, or libuv in Node), which runs those operations off-thread and queues their callbacks to run on the single JS thread once ready.",
    "oneLineAnswer": "JavaScript itself executes on a single thread, one operation at a time; the illusion of concurrency for async work comes from the runtime (browser/Node) handling I/O off-thread and queueing callbacks for the event loop.",
    "seniorNuance": "This single-threaded nature is exactly why a long-running synchronous computation (a huge loop, JSON.parse on a massive string) freezes the entire UI — there's no other thread to keep handling clicks or repaints while that one thread is busy, which is the core motivation for Web Workers and chunking expensive work.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "console.log('start');\nsetTimeout(() => console.log('async, runs later'), 0);\nfor (let i = 0; i < 1e9; i++) {} // blocks the single thread — UI frozen during this loop\nconsole.log('end');",
        "output": "start\nend\nasync, runs later"
    }
},
  6124: {
    "coreConcept": "Concurrency is about *managing* multiple tasks over overlapping time periods — JS achieves this on a single thread via the event loop interleaving callbacks (async/await, Promises), giving the appearance of tasks progressing together without ever literally running at the same instant. Parallelism is *actually* executing multiple tasks simultaneously on separate CPU cores, which in JS requires genuinely separate threads — Web Workers or Node's worker_threads.",
    "oneLineAnswer": "Concurrency (JS's default, via the event loop) interleaves multiple async tasks on one thread without true simultaneity; parallelism requires genuinely separate threads (Web Workers / worker_threads) to run tasks at the exact same instant.",
    "seniorNuance": "A very common conflation in interviews: `Promise.all()` runs async I/O-bound tasks *concurrently*, not in parallel — the network requests happen concurrently at the I/O level (off-thread), but the JS callback code handling each response still executes one at a time on the single main thread; true CPU parallelism for JS logic itself only comes from actual worker threads.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "// Concurrency — interleaved on one thread, NOT parallel\nawait Promise.all([fetchA(), fetchB()]); // I/O happens concurrently, JS callbacks run one at a time\n\n// Parallelism — genuinely simultaneous, separate threads\nconst worker1 = new Worker('heavy-calc.js');\nconst worker2 = new Worker('heavy-calc.js'); // runs on a real separate CPU core",
        "output": "// Conceptual comparison — no runtime output"
    }
},
  6125: {
    "coreConcept": "JavaScript classes have no built-in `abstract` modifier, so an 'abstract base class' is simulated by checking `new.target` (or `this.constructor`) in the base constructor to throw an error if the base class is instantiated directly, and by defining methods that throw 'not implemented' errors, forcing subclasses to override them.",
    "oneLineAnswer": "JavaScript simulates abstract classes by throwing in the constructor if the base class is instantiated directly (checking new.target) and having placeholder methods throw unless a subclass overrides them.",
    "seniorNuance": "TypeScript has a real `abstract` keyword that enforces this at compile time with zero runtime cost, which is one concrete, practical reason many senior engineers prefer TypeScript for larger OOP-heavy codebases — the abstract-class contract stops being a runtime convention and becomes a build-time guarantee.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Shape {\n  constructor() {\n    if (new.target === Shape) throw new TypeError('Cannot instantiate abstract class Shape');\n  }\n  area() { throw new Error('area() must be implemented by subclass'); }\n}\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}\ntry { new Shape(); } catch (e) { console.log(e.message); }\nconsole.log(new Circle(2).area().toFixed(2));",
        "output": "Cannot instantiate abstract class Shape\n12.57"
    }
},
  6126: {
    "coreConcept": "When a subclass defines a method with the same name as one on its parent class, the subclass's version takes priority for instances of the subclass — this is method overriding, resolved through the prototype chain at call time (the engine finds the closest matching method walking up from the instance). The original parent implementation is still accessible via `super.methodName()`.",
    "oneLineAnswer": "A subclass method with the same name as a parent method overrides it for that subclass's instances, with the parent version still reachable through super.methodName().",
    "seniorNuance": "Unlike some statically-typed OOP languages, JavaScript performs no signature checking when overriding — a subclass can override a method with a completely different number/type of parameters with no compiler warning, which is exactly the kind of contract violation TypeScript's type system exists to catch.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Animal { speak() { return 'Some sound'; } }\nclass Dog extends Animal {\n  speak() { return `${super.speak()} -> Woof!`; } // calls parent, then extends it\n}\nconsole.log(new Dog().speak()); // 'Some sound -> Woof!'",
        "output": "Some sound -> Woof!"
    }
},
  6127: {
    "coreConcept": "Inside a subclass constructor, `super(...)` must be called before accessing `this`, and it invokes the parent class's constructor, initializing the inherited portion of the instance. Inside a regular method, `super.methodName()` looks up and calls the parent class's version of that method with `this` still correctly bound to the current instance, not the parent.",
    "oneLineAnswer": "super(...) in a constructor calls the parent constructor and must run before `this` is used; super.method() in a regular method calls the parent's version of that method with `this` still bound to the current instance.",
    "seniorNuance": "Forgetting `super()` in a subclass constructor that accesses `this` throws a ReferenceError ('Must call super before accessing this') — this isn't a style preference, it's a hard runtime requirement, because `this` is genuinely uninitialized in a derived class constructor until the parent constructor has run.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Base { constructor(name) { this.name = name; } }\nclass Derived extends Base {\n  constructor(name, extra) {\n    // this.extra = extra; // would throw here — super() must come first\n    super(name);\n    this.extra = extra;\n  }\n}\nconsole.log(new Derived('Rasik', 'Senior').name); // 'Rasik'",
        "output": "Rasik"
    }
},
  6128: {
    "coreConcept": "`JSON.stringify()` silently omits `undefined` values, functions, and symbol-keyed properties (or converts them to `null` inside arrays), throws a TypeError on circular references, and calls a `toJSON()` method on an object first if one is defined, using its return value instead of the object's raw properties.",
    "oneLineAnswer": "JSON.stringify() silently drops undefined/function/symbol values (or nulls them in arrays), throws on circular structures, and defers to a custom toJSON() method if the object defines one.",
    "seniorNuance": "The `toJSON()` hook is how `Date` objects serialize as ISO strings automatically — `Date.prototype.toJSON` exists specifically for this — and it's the standard extension point for controlling exactly how a custom class serializes (e.g. omitting sensitive fields like a password hash) without needing a separate serialization function everywhere the object is stringified.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj = { a: undefined, b: function () {}, c: 1, toJSON() { return { c: this.c, custom: true }; } };\nconsole.log(JSON.stringify(obj)); // uses toJSON() override entirely\nconsole.log(JSON.stringify([undefined, function () {}, 1])); // [null,null,1] — nulled in arrays",
        "output": "{\"c\":1,\"custom\":true}\n[null,null,1]"
    }
},
  6129: {
    "coreConcept": "`JSON.parse(text, reviver)` accepts an optional second argument — a function called for every key-value pair in the parsed structure, bottom-up, whose return value replaces the original parsed value. Returning `undefined` deletes that key entirely; it's commonly used to revive date strings back into real `Date` objects or filter out unwanted fields during parsing.",
    "oneLineAnswer": "JSON.parse's optional reviver function is called for every parsed key-value pair (bottom-up) and can transform, replace, or delete values as the final object is built.",
    "seniorNuance": "Because the reviver runs bottom-up (children before their parent object), it can correctly transform deeply nested date strings into real Date instances before the containing object is ever handed to the reviver call for that parent key — making it the standard technique to counter the fact that JSON has no native Date type.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const json = '{\"name\":\"Rasik\",\"joined\":\"2024-01-15T00:00:00.000Z\"}';\nconst parsed = JSON.parse(json, (key, value) => {\n  if (key === 'joined') return new Date(value);\n  return value;\n});\nconsole.log(parsed.joined instanceof Date); // true",
        "output": "true"
    }
},
  6130: {
    "coreConcept": "`JSON.stringify()` throws a TypeError ('Converting circular structure to JSON') because JSON has no concept of object references — it can only represent a tree, not a graph, so an object that (directly or indirectly) references itself has no valid finite JSON representation. Workarounds include a custom replacer function that tracks visited objects (replacing repeats with a placeholder), or using `structuredClone`/dedicated libraries that support cycles natively.",
    "oneLineAnswer": "JSON.stringify() throws on circular references because JSON can only represent tree structures, not graphs with self-references — fixed with a visited-tracking replacer function or by switching to structuredClone for actual cloning needs.",
    "seniorNuance": "For serialization (not cloning) specifically, the common production pattern is a WeakSet-based replacer that replaces already-seen object references with a `'[Circular]'` marker string, preserving a debuggable output instead of crashing — useful for logging deeply nested app state that may legitimately contain cycles (e.g. React fiber nodes, DOM references).",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function safeStringify(obj) {\n  const seen = new WeakSet();\n  return JSON.stringify(obj, (key, value) => {\n    if (typeof value === 'object' && value !== null) {\n      if (seen.has(value)) return '[Circular]';\n      seen.add(value);\n    }\n    return value;\n  });\n}\nconst a = { name: 'Node' }; a.self = a;\nconsole.log(safeStringify(a)); // '{\"name\":\"Node\",\"self\":\"[Circular]\"}'",
        "output": "{\"name\":\"Node\",\"self\":\"[Circular]\"}"
    }
},
  6131: {
    "coreConcept": "A placeholder-aware curry implementation lets you call a curried function with a special marker (commonly `_`) in place of an argument you want to supply later, out of order — `add(_, 2)(1)` fills the first argument (`1`) after the second (`2`) was already given, useful for partially applying a non-first parameter without wrapping in an extra arrow function.",
    "oneLineAnswer": "A placeholder-aware curry lets you skip an argument with a marker value and supply it in a later call, enabling partial application of non-leading parameters without an extra wrapper function.",
    "seniorNuance": "This is exactly the mechanism behind Lodash's `_.curry` and its exported `_` placeholder — it's a genuinely useful production pattern for building specialized functions from a general one where the parameter you want to fix isn't the first one, e.g. `divideBy = curriedDivide(_, 2)` fixing the divisor while leaving the dividend open.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const _ = Symbol('placeholder');\nconst curry = (fn) => {\n  return function curried(...args) {\n    if (args.length >= fn.length && !args.includes(_)) return fn(...args);\n    return (...next) => {\n      const merged = args.map((a) => (a === _ ? next.shift() : a)).concat(next);\n      return curried(...merged);\n    };\n  };\n};\nconst add = curry((a, b, c) => a + b + c);\nconsole.log(add(_, 2, 3)(1)); // 6 — first argument filled in later",
        "output": "6"
    }
},
  6132: {
    "coreConcept": "`fn.length` returns the number of declared parameters *before* the first one with a default value or a rest parameter (default/rest params and everything after them are excluded from the count). `fn.name` returns the function's name — inferred automatically from a variable/property assignment for anonymous functions/arrow functions (`const foo = () => {}` gives `foo.name === 'foo'`).",
    "oneLineAnswer": "fn.length counts parameters before the first default/rest parameter; fn.name returns its name, which is auto-inferred from the assignment target for anonymous and arrow functions.",
    "seniorNuance": "`fn.length` is exactly what a generic curry implementation relies on to know how many arguments to wait for before invoking the underlying function — which is also why a curried function with default parameters silently breaks (its `.length` undercounts), a subtle gotcha worth knowing when debugging a currying utility.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function greet(name, greeting = 'Hi', ...rest) {}\nconsole.log(greet.length); // 1 — only counts 'name'; default/rest excluded\nconst myArrow = () => {};\nconsole.log(myArrow.name); // 'myArrow' — inferred from assignment",
        "output": "1\nmyArrow"
    }
},
  6133: {
    "coreConcept": "`arguments` is an implicit, array-like (not a real array) object available in regular (non-arrow) functions, containing every argument passed regardless of the declared parameters. Rest parameters (`function f(...args)`) collect only the extra arguments beyond the named ones into a true `Array`, and — unlike `arguments` — are also available inside arrow functions.",
    "oneLineAnswer": "arguments is a legacy array-like object available only in regular functions containing all passed arguments; rest parameters produce a real Array of just the extra arguments, and work in arrow functions too, unlike arguments.",
    "seniorNuance": "Arrow functions have no `arguments` object of their own at all — referencing `arguments` inside an arrow function resolves to the nearest enclosing regular function's `arguments` (lexical, just like `this`), which is a frequent source of confusion when converting a regular function to an arrow function without adjusting for this.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "function withArgs() { return arguments.length; }\nfunction withRest(...args) { return args.length; }\nconsole.log(withArgs(1, 2, 3)); // 3\nconsole.log(withRest(1, 2, 3)); // 3\nconsole.log(Array.isArray(withRest(1, 2, 3))); // false, testing .length not the array itself",
        "output": "3\n3\nfalse"
    }
},
  6134: {
    "coreConcept": "`'use strict'` (automatically implied inside ES6 classes and modules) turns several previously-silent mistakes into thrown errors — assigning to an undeclared variable, assigning to a read-only or non-existent property, deleting an undeletable property — and disables problematic features like `this` defaulting to the global object in a plain function call (it becomes `undefined` instead).",
    "oneLineAnswer": "Strict mode converts several silent JS mistakes into thrown errors (undeclared variable assignment, invalid property writes) and changes `this` in plain function calls from the global object to undefined.",
    "seniorNuance": "Because ES modules and class bodies are strict mode automatically (no directive needed), most modern codebases are already strict by default without anyone writing `'use strict'` explicitly — it's mainly relevant to know about when debugging older non-module `<script>` tags or CommonJS files that were written pre-ES6.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "'use strict';\nfunction test() {\n  undeclaredVar = 5; // throws in strict mode instead of silently creating a global\n}\ntry { test(); } catch (e) { console.log(e instanceof ReferenceError); }",
        "output": "true"
    }
},
  6135: {
    "coreConcept": "Array destructuring can swap two variables' values directly — `[a, b] = [b, a]` — because the right-hand side array literal `[b, a]` is fully evaluated first (capturing both original values), and only then destructured into `a` and `b` on the left, eliminating the need for a manual temporary variable.",
    "oneLineAnswer": "[a, b] = [b, a] swaps two variables in a single expression because the right-hand array is evaluated completely before any assignment happens, removing the need for a temp variable.",
    "seniorNuance": "This pattern generalizes cleanly beyond two variables — `[a, b, c] = [c, a, b]` performs a three-way rotation just as easily — which is worth mentioning in an interview to show you understand *why* it works (evaluation order), not just that it's a memorized trick.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "let a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2 1 — swapped without a temp variable",
        "output": "2 1"
    }
},
  6136: {
    "coreConcept": "`Symbol.asyncIterator` is the async counterpart to `Symbol.iterator` — an object implementing `[Symbol.asyncIterator]()` returns an async iterator whose `.next()` returns a Promise resolving to `{ value, done }`, enabling `for await (const x of obj)` on custom classes, not just async generators. Async generator methods (`async *[Symbol.asyncIterator]() {}`) are the most common way to implement it.",
    "oneLineAnswer": "Symbol.asyncIterator marks an object as usable in for await...of loops by returning an async iterator whose next() resolves to { value, done }, the async equivalent of Symbol.iterator.",
    "seniorNuance": "Implementing this manually (rather than via an async generator method) is occasionally necessary when you need fine control over backpressure or need the iterator object itself to expose extra methods (like `.return()` for early cleanup on `break`) beyond what a generator function conveniently provides.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "class Paginator {\n  constructor(pages) { this.pages = pages; }\n  [Symbol.asyncIterator]() {\n    let i = 0;\n    const pages = this.pages;\n    return { next: async () => i < pages.length ? { value: pages[i++], done: false } : { value: undefined, done: true } };\n  }\n}\nfor await (const page of new Paginator(['p1', 'p2'])) console.log(page);",
        "output": "p1\np2"
    }
},
  6137: {
    "coreConcept": "Since ES2015, the spec guarantees a precise enumeration order for own properties: all integer-like keys first (sorted ascending numerically, e.g. '0', '1', '2'), then string keys in insertion order, then symbol keys in insertion order. This applies to `Object.keys()`, `for...in`, `JSON.stringify()`, and `Object.entries()`.",
    "oneLineAnswer": "Object key order is spec-guaranteed as: numeric-like keys first (ascending), then string keys in insertion order, then symbol keys in insertion order — not arbitrary, despite older folklore claiming objects have 'no guaranteed order'.",
    "seniorNuance": "The 'integer keys always come first, sorted numerically' rule is the part almost everyone forgets and gets bitten by — inserting `{b: 1, 2: 'two', a: 3}` still enumerates as `2, b, a`, not insertion order, which matters when relying on object order for anything numerically-keyed, like a sparse lookup table.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const obj = { b: 1, 2: 'two', a: 3, 1: 'one' };\nconsole.log(Object.keys(obj)); // ['1', '2', 'b', 'a'] — numeric keys sorted first, then insertion order",
        "output": "[ '1', '2', 'b', 'a' ]"
    }
},
  6138: {
    "coreConcept": "The `JSON.parse(JSON.stringify(x))` trick deep-clones only JSON-safe data — it silently drops `undefined`, functions, and symbols, converts `Date` objects into strings (losing the Date type), and throws on circular references. The structured clone algorithm (used by `structuredClone()`, `postMessage`, and IndexedDB) correctly preserves `Date`, `Map`, `Set`, `RegExp`, typed arrays, and circular references, but still cannot clone functions or DOM nodes.",
    "oneLineAnswer": "JSON round-tripping only deep-clones plain JSON-safe data (breaking on Dates, circular refs, undefined, functions); structuredClone() correctly preserves richer types like Date/Map/Set/circular references but still can't clone functions or DOM nodes.",
    "seniorNuance": "The Date-to-string silent conversion in the JSON trick is a particularly sneaky production bug — code that clones state containing a `Date` field and later calls `.getMonth()` on it will crash after a JSON-based deep clone (it's now a string), while the exact same code works fine with `structuredClone()`, since the Date type survives intact.",
    "interviewQuestion": {
        "title": "Simple Example",
        "code": "const original = { when: new Date(), tags: new Set(['a', 'b']) };\nconst jsonClone = JSON.parse(JSON.stringify(original));\nconsole.log(jsonClone.when instanceof Date); // false — became a string\nconsole.log(jsonClone.tags); // {} — Set became an empty object\n\nconst realClone = structuredClone(original);\nconsole.log(realClone.when instanceof Date); // true\nconsole.log(realClone.tags instanceof Set); // true",
        "output": "false\n{}\ntrue\ntrue"
    }
},
};

export function getDetailedAnswer(questionId: number, question: Question): DetailedAnswer {
  return DETAILED_ANSWERS[questionId] || {
    coreConcept: question.description,
    oneLineAnswer: "No detailed answer compiled yet."
  };
}
