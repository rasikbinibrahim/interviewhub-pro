// React extra technical questions bank.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_REACT_EXTRA_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    detail: {
      id: "reactx1-1",
      questionNumber: "REACTX1-001",
      title: "Functional vs Class Components",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      frequency: 5,
      category: "Components",
      part: "React Fundamentals",
      concepts: ["function components", "class components", "hooks", "this binding", "render method", "component lifecycle"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What is the difference between functional and class components in React?"
    },
    answer: {
      expectedAnswer: "Functional components are plain JavaScript functions that accept props and return JSX; since React 16.8 they can hold state and side effects via hooks (useState, useEffect, etc.). Class components extend React.Component, hold state on `this.state`, use lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount), and require binding `this` in event handlers. Functional components with hooks are now the standard because they are more concise, avoid `this` pitfalls, and make logic reuse easier via custom hooks.",
      deepExplanation: "Under the hood, a class component instance persists across renders, so `this.state` and instance methods survive between renders naturally, but `this` binding in callbacks must be managed explicitly (via bind in the constructor or arrow class fields). A functional component re-runs its entire function body on every render; hooks work because React keeps a per-fiber list of hook 'slots' indexed by call order, which is why hooks cannot be called conditionally or inside loops. Lifecycle behavior that used to be split across componentDidMount/componentDidUpdate/componentWillUnmount is unified in useEffect, whose dependency array controls when it re-runs. Class components also require `super(props)` in the constructor before touching `this`, and error boundaries (componentDidCatch/getDerivedStateFromError) currently have no hook equivalent, so they remain the one case where a class component is still required.\n\n```jsx\n// Class component\nclass Counter extends React.Component {\n  state = { count: 0 };\n  increment = () => this.setState(s => ({ count: s.count + 1 }));\n  render() {\n    return <button onClick={this.increment}>{this.state.count}</button>;\n  }\n}\n\n// Equivalent functional component\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}\n```",
      productionExample: "Modern production React codebases (Next.js apps, design systems at companies like Meta and Airbnb) are written almost entirely with functional components and hooks, reserving classes only for legacy code or error boundaries. Migrating a large class-based app to hooks is typically done incrementally, component by component, since both styles interoperate freely in the same tree.",
      bestPractices: [
        "Default to functional components with hooks for all new code",
        "Only use a class component when you need an error boundary",
        "Extract repeated stateful logic into custom hooks instead of HOCs/mixins",
        "Keep functional components pure with respect to props and state during render",
        "Avoid mixing lifecycle-style side effects directly in the render body",
        "Use TypeScript prop types/interfaces instead of runtime PropTypes where possible"
      ],
      tradeOffs: "Advantages of functional components: less boilerplate, no `this` binding issues, easier logic reuse via custom hooks, better tree-shaking and smaller bundles. Disadvantages: hooks have strict rules (top-level only, consistent order) that are easy to violate; stale closures in effects/callbacks can cause subtle bugs. Advantages of class components: familiar OOP structure, explicit lifecycle methods, still required for error boundaries. Disadvantages: verbose, `this` binding footguns, harder to share logic without HOCs/render props which can cause wrapper hell.",
      commonMistakes: [
        "Forgetting to call `super(props)` in a class component constructor",
        "Not binding event handler methods, causing `this` to be undefined",
        "Interview trap: assuming hooks can be called conditionally, inside loops, or after an early return — they must always run in the same order every render",
        "Mixing hooks and class lifecycle patterns in the same component unnecessarily",
        "Forgetting that class components still need an error boundary — there's no hook equivalent for componentDidCatch",
        "Treating functional components as if they persist state between renders without useState/useRef"
      ],
      followUpQuestions: [
        "Why can't hooks be called conditionally?",
        "How do you implement an error boundary without a class component?",
        "How does React associate hook state with a specific component instance across renders?",
        "What lifecycle method has no direct hook equivalent?",
        "How would you migrate a large class-based codebase to hooks incrementally?"
      ],
      relatedTopics: ["hooks", "fiber reconciliation", "error boundaries", "custom hooks", "component lifecycle", "JSX"]
    }
  },
  {
    detail: {
      id: "reactx1-2",
      questionNumber: "REACTX1-002",
      title: "JSX vs Regular JavaScript",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Netflix", "Adobe", "Zoho"],
      frequency: 5,
      category: "Components",
      part: "React Fundamentals",
      concepts: ["JSX", "Babel transpilation", "React.createElement", "virtual DOM", "expressions vs statements"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How does JSX differ from regular JavaScript?"
    },
    answer: {
      expectedAnswer: "JSX is a syntax extension that looks like HTML but is not valid JavaScript on its own; Babel (or the TypeScript compiler) transpiles it into nested `React.createElement(type, props, children)` calls (or `jsx()` calls with the automatic runtime) before it reaches the browser. Because it compiles down to function calls, JSX only allows expressions (not statements like `if` or `for`) inside `{}`, and every element must ultimately resolve to a single returned tree.",
      deepExplanation: "JSX itself is not understood by browsers; a build step (Babel/SWC/TypeScript) parses the `<Tag>` syntax into `React.createElement('tag', props, ...children)` calls, which produce plain JavaScript objects called React elements describing what should appear on screen. Because `{}` inside JSX is evaluated as a JavaScript expression, you can embed variables, function calls, ternaries, and `&&` short-circuits, but not `if/else` or `for` loops directly — those must be expressed as expressions (ternaries) or computed above the JSX and referenced inside it. JSX also differs from HTML in naming (`className` instead of `class`, `htmlFor` instead of `for`, camelCase event handlers like `onClick`), and self-closing tags are required for void elements. With the newer automatic JSX runtime, the compiler imports `jsx`/`jsxs` from `react/jsx-runtime` instead of requiring `React` to be in scope for every file.",
      productionExample: "Every React component in production is authored in JSX and compiled at build time by tools like Vite, webpack+Babel, or the Next.js compiler; the output shipped to the browser is plain JavaScript object-creation calls, not the JSX markup itself, which keeps runtime overhead minimal.",
      bestPractices: [
        "Keep JSX expressions simple; move complex logic into variables or helper functions above the return",
        "Use ternaries or logical && for conditional rendering, not if/else inside JSX",
        "Always provide a stable `key` when rendering arrays of JSX elements",
        "Prefer the automatic JSX runtime to avoid needing `import React` in every file",
        "Use fragments (`<>...</>`) instead of unnecessary wrapper divs",
        "Escape user-provided strings are already auto-escaped by JSX — don't bypass this with dangerouslySetInnerHTML unless necessary"
      ],
      tradeOffs: "Advantages: declarative and readable, colocates markup with logic, compiles to efficient element-creation calls, strong tooling/IDE support with type-checking. Disadvantages: requires a build step (no native browser support), restricted to expressions not statements, can encourage overly large component render methods if not decomposed, mixing markup and logic can reduce separation of concerns for teams used to templates.",
      commonMistakes: [
        "Trying to use `if` statements directly inside JSX curly braces",
        "Forgetting `className` instead of `class`, causing the attribute to be silently ignored",
        "Interview trap: believing JSX 'is HTML' — it's syntactic sugar for `React.createElement`/`jsx()` calls, and only one root element (or a Fragment) can be returned",
        "Not memoizing or hoisting expensive computations used inside JSX, recalculating them every render",
        "Rendering `0` unintentionally when using `count && <Component />` because `0` is falsy but still renders as text",
        "Assuming JSX runs in the browser without a compiler step"
      ],
      followUpQuestions: [
        "What does JSX compile down to?",
        "Why can't you put an if statement inside JSX curly braces?",
        "What's the difference between the classic and automatic JSX runtime?",
        "Why does `{0 && <Component />}` render '0' on screen?",
        "How do React elements relate to the virtual DOM?"
      ],
      relatedTopics: ["React.createElement", "virtual DOM", "Babel/SWC transpilation", "fragments", "conditional rendering"]
    }
  },
  {
    detail: {
      id: "reactx1-3",
      questionNumber: "REACTX1-003",
      title: "Using Props in Functional vs Class Components",
      difficulty: "Easy",
      companies: ["Meta", "Amazon", "Microsoft", "Uber", "Flipkart"],
      frequency: 4,
      category: "Components",
      part: "React Fundamentals",
      concepts: ["props", "destructuring", "this.props", "component parameters", "read-only data flow"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "Can you explain how to use props in a functional component versus a class component?"
    },
    answer: {
      expectedAnswer: "In a functional component, props arrive as the single function argument and are typically destructured directly in the parameter list. In a class component, props are accessed via `this.props` inside instance methods and `render()`, and must be passed to `super(props)` in the constructor if you need `this.props` available there. In both cases props are read-only — a component must never mutate its own props.",
      deepExplanation: "Functional components receive props as a plain object argument: `function Greeting({ name }) { return <p>Hi {name}</p>; }`. Class components receive props through the constructor and store a reference on the instance as `this.props`, which React itself manages and updates on every re-render; the constructor must call `super(props)` before referencing `this.props`, otherwise `this.props` is undefined until the first render. Both component types must treat props as immutable — React relies on this to determine when to re-render via shallow comparison in structures like `React.memo` or `PureComponent`. If new props are passed by a parent, functional components simply get called again with the new argument object, while class components have their existing instance's `this.props` updated and lifecycle methods like componentDidUpdate fire.\n\n```jsx\n// Functional\nfunction UserCard({ name, age }) {\n  return <div>{name} ({age})</div>;\n}\n\n// Class\nclass UserCard extends React.Component {\n  render() {\n    const { name, age } = this.props;\n    return <div>{name} ({age})</div>;\n  }\n}\n```",
      productionExample: "Design-system component libraries expose typed prop interfaces (via TypeScript or PropTypes) consumed the same way regardless of whether the underlying implementation is a function or class, which is part of why teams can freely mix both styles during an incremental hooks migration.",
      bestPractices: [
        "Destructure props at the top of functional components for readability",
        "Never mutate props directly; treat them as read-only input",
        "Always call `super(props)` in a class component constructor before using `this.props`",
        "Provide default values via default parameters (functional) or defaultProps/static defaultProps (class)",
        "Type props explicitly with TypeScript interfaces instead of relying on implicit any",
        "Keep prop drilling shallow — use Context or state management if props pass through many layers"
      ],
      tradeOffs: "Advantages of functional props access: simpler syntax, no `this` context concerns, works naturally with destructuring and default parameters. Disadvantages: none significant versus classes for prop access itself. Advantages of class prop access: explicit `this.props` can be clearer to engineers from OOP backgrounds. Disadvantages: forgetting `super(props)` is a common source of bugs, and `this` binding adds cognitive overhead when passing prop-derived callbacks.",
      commonMistakes: [
        "Forgetting `super(props)` in a class constructor, leaving `this.props` undefined inside the constructor",
        "Mutating a prop object or array in place instead of creating a new one",
        "Interview trap: assuming props changes automatically trigger a re-render of children wrapped in React.memo/PureComponent even when the new prop is referentially equal but deeply different",
        "Not providing default values, leading to undefined checks scattered through the component",
        "Passing unnecessary props down through many layers instead of using Context",
        "Confusing props (owner-provided, read-only) with state (component-owned, mutable via setState)"
      ],
      followUpQuestions: [
        "Why must you call super(props) in a class component constructor?",
        "What happens if you mutate a prop directly?",
        "How does React.memo decide whether to re-render on new props?",
        "What's the difference between props and state?",
        "How would you avoid deep prop drilling?"
      ],
      relatedTopics: ["props", "state", "React.memo", "PureComponent", "Context API", "TypeScript prop typing"]
    }
  },
  {
    detail: {
      id: "reactx1-4",
      questionNumber: "REACTX1-004",
      title: "Passing Props from Parent to Child",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Netflix", "Flipkart", "Zoho"],
      frequency: 5,
      category: "Props",
      part: "React Fundamentals",
      concepts: ["unidirectional data flow", "props", "JSX attributes", "spread operator", "children"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you pass props from a parent to a child component?"
    },
    answer: {
      expectedAnswer: "A parent passes data to a child by writing attributes on the child's JSX tag, e.g. `<Child name=\"Alex\" onSave={handleSave} />`; React collects these into a single props object passed to the child function/class. Data only flows one direction — parent to child — so a child that needs to communicate upward must be given a callback prop by the parent to invoke.",
      deepExplanation: "JSX attributes become key-value pairs on the props object React passes to the child; any JavaScript value can be passed, including primitives, objects, arrays, and functions (callbacks). This is React's unidirectional ('one-way') data flow model: state lives in some ancestor component and flows down as props, and children never modify their parent's state directly — they call a function prop the parent gave them, and the parent decides how to update its own state in response. The `{...props}` spread syntax can forward an entire object as multiple props at once, which is common in wrapper/HOC components. `children` is a special implicit prop populated by whatever is nested between a component's opening and closing JSX tags.\n\n```jsx\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onIncrement={() => setCount(c => c + 1)} />;\n}\n\nfunction Child({ count, onIncrement }) {\n  return <button onClick={onIncrement}>Count: {count}</button>;\n}\n```",
      productionExample: "Component libraries pass configuration and event callbacks down through many layers this way; for cross-cutting concerns that would require excessive prop drilling (theme, auth user, locale) teams switch to Context or a state library instead of threading props through every intermediate component.",
      bestPractices: [
        "Keep the prop interface minimal — pass only what the child actually needs",
        "Use callback props for child-to-parent communication instead of trying to mutate parent state directly",
        "Destructure props in the child's signature for clarity",
        "Use the spread operator sparingly and intentionally, not to hide unclear prop contracts",
        "Type props explicitly so mismatched or missing props are caught at compile time",
        "Avoid deeply nested prop drilling — lift state or use Context when many layers need the same data"
      ],
      tradeOffs: "Advantages: predictable, easy-to-trace unidirectional data flow; explicit contracts between components; easy to test components in isolation by passing different props. Disadvantages: prop drilling through many intermediate layers becomes verbose and brittle to refactor; every intermediate component must forward props it doesn't itself use.",
      commonMistakes: [
        "Trying to have a child directly modify a prop it received (props are read-only)",
        "Passing a new inline object/array/function literal as a prop every render, breaking memoization in the child",
        "Interview trap: assuming a child can 'push' data up to a parent without being given a callback prop by that parent — React has no built-in upward binding",
        "Excessive prop drilling instead of reaching for Context at the right threshold",
        "Forgetting to forward `children` when building a wrapper component",
        "Spreading unknown props onto DOM elements, causing React 'unknown prop' warnings"
      ],
      followUpQuestions: [
        "How does a child component communicate back to its parent?",
        "What happens if you pass a new function literal as a prop every render?",
        "When would you replace prop drilling with Context?",
        "What is the `children` prop and how is it populated?",
        "How would you type a component's props with TypeScript?"
      ],
      relatedTopics: ["unidirectional data flow", "callback props", "children prop", "Context API", "prop drilling"]
    }
  },
  {
    detail: {
      id: "reactx1-5",
      questionNumber: "REACTX1-005",
      title: "Default Props",
      difficulty: "Easy",
      companies: ["Meta", "Microsoft", "Adobe", "Atlassian"],
      frequency: 4,
      category: "Props",
      part: "React Fundamentals",
      concepts: ["defaultProps", "default parameters", "fallback values", "optional props"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What are default props, and how are they useful?"
    },
    answer: {
      expectedAnswer: "Default props are fallback values React applies to a prop when the parent doesn't supply it (or supplies `undefined`). In class components this was done with a static `defaultProps` object; in modern functional components with TypeScript/JavaScript, the same effect is achieved with ES6 default parameter values in the destructured argument. They're useful for making components resilient to optional configuration and avoiding scattered `prop ?? fallback` checks in the component body.",
      deepExplanation: "For class components, React reads `ComponentName.defaultProps` and merges it in for any prop not explicitly passed (or explicitly `undefined` — note that passing `null` does NOT trigger the default, only `undefined` does). Functional components achieve the same behavior natively through JavaScript default parameter syntax: `function Button({ variant = 'primary' }) {}`. As of React 18.3+/19, `defaultProps` on function components is deprecated in favor of default parameters, since defaultProps on functions was only ever a React-specific convention layered on top of plain JS functions. Default props reduce null/undefined checks scattered through JSX and give consumers of a component clear, self-documenting defaults.\n\n```jsx\nfunction Alert({ type = 'info', dismissible = true }) {\n  return <div className={`alert alert-${type}`}>{dismissible && <CloseButton />}</div>;\n}\n```",
      productionExample: "Design system libraries (buttons, alerts, badges) rely heavily on default props/parameters so consumers only need to override the props relevant to their use case, e.g. `<Button>Save</Button>` renders a sensible default without specifying variant, size, or color.",
      bestPractices: [
        "Prefer ES6 default parameters over static defaultProps on function components",
        "Document default values in TypeScript prop interfaces via JSDoc or comments",
        "Only default truly optional configuration, not required data props",
        "Remember defaults apply only when the prop is undefined, not null",
        "Keep default values primitive or stable references to avoid unnecessary re-renders",
        "Avoid defaulting to a new object/array/function literal inline, which creates a new reference each render"
      ],
      tradeOffs: "Advantages: self-documenting components, fewer null checks, more resilient to missing configuration, better DX for consumers. Disadvantages: can mask a caller forgetting to pass a required prop; defaultProps on function components is deprecated, so teams must migrate legacy usages; defaulting to non-primitive values can create new references each render if not memoized.",
      commonMistakes: [
        "Assuming passing `null` triggers the default value — only `undefined` does",
        "Interview trap: using `ComponentName.defaultProps = {...}` on a function component in a modern React version, which is deprecated and eventually removed — default parameters should be used instead",
        "Defaulting to a new inline object/array each render, which defeats memoization",
        "Forgetting defaultProps only applies to the props object itself, not to nested fields within an object prop",
        "Using default props to silently paper over a genuinely required prop being missing",
        "Not keeping default values in sync with PropTypes/TypeScript optionality"
      ],
      followUpQuestions: [
        "Does passing null trigger a default prop value?",
        "Why is defaultProps deprecated on function components?",
        "How would you default a nested object prop safely?",
        "What's the difference between defaultProps and default parameters?",
        "How do default props interact with PropTypes required validation?"
      ],
      relatedTopics: ["default parameters", "PropTypes", "TypeScript optional props", "component API design"]
    }
  },
  {
    detail: {
      id: "reactx1-6",
      questionNumber: "REACTX1-006",
      title: "PropTypes and Type Safety",
      difficulty: "Easy",
      companies: ["Amazon", "Netflix", "Uber", "Stripe"],
      frequency: 3,
      category: "Props",
      part: "React Fundamentals",
      concepts: ["PropTypes", "runtime validation", "TypeScript", "prop contracts"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What are PropTypes, and how do they help in ensuring type safety?"
    },
    answer: {
      expectedAnswer: "PropTypes is a separate runtime type-checking library (`prop-types`) that lets you declare the expected shape of a component's props (e.g. `PropTypes.string.isRequired`); React logs a console warning in development if a prop doesn't match, but it performs no checking in production and doesn't affect runtime behavior. It provides basic type safety without a build-time type system, though most modern codebases prefer TypeScript, which catches mismatches at compile time instead of at runtime in dev.",
      deepExplanation: "You attach a `propTypes` static object to a component, mapping each prop name to a validator like `PropTypes.number`, `PropTypes.arrayOf(PropTypes.string)`, `PropTypes.shape({...})`, or `PropTypes.oneOf([...])`, optionally chained with `.isRequired`. React calls these validators only in development builds; in production the checks are stripped out entirely for performance, meaning PropTypes provide zero protection at runtime in production and are purely a development-time linting aid. This is fundamentally different from TypeScript, which is a static type checker that runs at compile time, catches errors before the code ever runs, supports generics/unions, and integrates with editor tooling for autocomplete — but has zero runtime cost or safety net once compiled, since types are erased.\n\n```jsx\nimport PropTypes from 'prop-types';\n\nfunction UserCard({ name, age }) {\n  return <div>{name} - {age}</div>;\n}\n\nUserCard.propTypes = {\n  name: PropTypes.string.isRequired,\n  age: PropTypes.number\n};\n```",
      productionExample: "Older React codebases predating widespread TypeScript adoption still use PropTypes for basic prop validation and console warnings during development; most greenfield projects today skip PropTypes entirely and rely on TypeScript for both compile-time and editor-level safety.",
      bestPractices: [
        "Prefer TypeScript over PropTypes for new projects — it catches errors earlier and doesn't rely on triggering a render to surface a warning",
        "Mark genuinely required props with `.isRequired`",
        "Use `PropTypes.shape` or `PropTypes.exact` for structured object props instead of a generic `object`",
        "Don't rely on PropTypes for production safety — it's dev-only",
        "Keep propTypes declarations near the component for discoverability",
        "If migrating to TypeScript, remove PropTypes once equivalent interfaces exist to avoid duplicate, potentially drifting contracts"
      ],
      tradeOffs: "Advantages of PropTypes: no build tooling required beyond the library, works with plain JS, immediate console feedback during development. Disadvantages: no compile-time checking, no IDE autocomplete, zero-cost but also zero-protection in production, easy for the two prop contracts (implementation vs propTypes) to drift out of sync. TypeScript's advantage is catching mismatches before code ships and providing rich tooling; its disadvantage is requiring a build/compile step and a learning curve for generics/advanced types.",
      commonMistakes: [
        "Assuming PropTypes provide runtime safety in production — the checks are stripped out of production builds",
        "Interview trap: expecting a PropTypes violation to throw an error — it only logs a console.error warning, execution continues normally",
        "Forgetting `.isRequired` on props that are actually mandatory",
        "Letting the propTypes declaration drift out of sync with the component's actual prop usage",
        "Using generic `PropTypes.object`/`PropTypes.array` instead of more specific shape/arrayOf validators",
        "Maintaining both PropTypes and TypeScript interfaces redundantly after a TS migration"
      ],
      followUpQuestions: [
        "Does a PropTypes mismatch throw an error or just warn?",
        "Are PropTypes checks present in production builds?",
        "How does PropTypes compare to TypeScript for type safety?",
        "How would you validate a prop that must be one of a fixed set of strings?",
        "Would you introduce PropTypes into a project that already uses TypeScript?"
      ],
      relatedTopics: ["TypeScript", "runtime validation", "component contracts", "prop-types library", "static typing"]
    }
  },
  {
    detail: {
      id: "reactx1-7",
      questionNumber: "REACTX1-007",
      title: "How useState Works",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      frequency: 5,
      category: "State",
      part: "React Fundamentals",
      concepts: ["useState", "hooks", "fiber hook list", "batched updates", "functional updates"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How does the useState hook work in functional components?"
    },
    answer: {
      expectedAnswer: "`useState(initialValue)` returns a `[value, setValue]` pair; calling the setter schedules a re-render with the new value. React stores each component's hook state in an ordered linked list attached to that component's fiber, matching hook calls to their stored slot purely by call order across renders — which is why hooks must always be called unconditionally in the same order.",
      deepExplanation: "On first render, React creates a new hook state entry in the fiber's memoizedState linked list initialized to `initialValue` (or the return value of `initialValue()` if a function is passed — the 'lazy initializer' pattern, which avoids expensive recomputation on every render). Calling the setter doesn't mutate state synchronously; it enqueues an update and schedules a re-render. On the next render, React walks the hook list in the same call order and returns the updated value for that slot. Multiple setState calls within the same event handler are batched into a single re-render (React 18 extends this batching to promises, timeouts, and native event handlers via automatic batching). If you need to compute the next value from the previous one, pass a function to the setter (`setCount(c => c + 1)`) rather than referencing the outer variable, since the outer variable may be stale by the time multiple updates are applied.\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const incrementTwice = () => {\n    setCount(c => c + 1);\n    setCount(c => c + 1); // functional form avoids stale closure, results in +2\n  };\n  return <button onClick={incrementTwice}>{count}</button>;\n}\n```",
      productionExample: "useState backs the vast majority of local UI state in production React apps — form inputs, toggles, modal open/closed flags — while more complex, interdependent state transitions are typically moved to useReducer or a state library once the update logic grows past a few related setState calls.",
      bestPractices: [
        "Use the functional updater form when the new state depends on the previous state",
        "Pass a function (lazy initializer) for expensive initial state computation",
        "Split unrelated pieces of state into separate useState calls rather than one large object",
        "Never mutate state directly — always create a new value/object/array",
        "Keep state as minimal and derived-value-free as possible (don't store what can be computed from existing state/props)",
        "Move to useReducer when several setState calls always change together"
      ],
      tradeOffs: "Advantages: simple API for isolated pieces of state, integrates naturally with React's scheduling and batching, no extra concepts beyond hooks. Disadvantages: state updates are asynchronous/scheduled so relying on the variable immediately after calling the setter reads the stale value; call-order dependency makes conditional hook calls illegal; many related useState calls can become unwieldy compared to useReducer.",
      commonMistakes: [
        "Interview trap: reading the state variable immediately after calling its setter and expecting the updated value — updates are scheduled, not synchronous",
        "Calling useState conditionally or inside a loop, breaking React's hook-order matching",
        "Directly mutating an array/object held in state instead of creating a new reference",
        "Using the non-functional form when the new value depends on the previous one inside a loop/rapid sequence of updates",
        "Storing derived data in state instead of computing it during render",
        "Passing an expensive computation directly as the initial value instead of a lazy initializer function, recomputing it every render even though it's only used once"
      ],
      followUpQuestions: [
        "Why does state not update immediately after calling the setter?",
        "What is the lazy initializer pattern and when would you use it?",
        "How does React know which hook state belongs to which useState call across renders?",
        "When would you replace useState with useReducer?",
        "What is automatic batching in React 18?"
      ],
      relatedTopics: ["hooks rules", "useReducer", "fiber architecture", "batched updates", "lazy initialization"]
    }
  },
  {
    detail: {
      id: "reactx1-8",
      questionNumber: "REACTX1-008",
      title: "Managing State in Class Components",
      difficulty: "Easy",
      companies: ["Microsoft", "Adobe", "Atlassian", "Flipkart"],
      frequency: 4,
      category: "State",
      part: "React Fundamentals",
      concepts: ["this.state", "setState", "state merging", "asynchronous updates"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you manage state in class components?"
    },
    answer: {
      expectedAnswer: "Class component state is initialized as an object on `this.state` (typically in the constructor or as a class field) and updated exclusively through `this.setState(partialState)` or `this.setState(updaterFn)` — never by assigning to `this.state` directly. `setState` shallow-merges the object you pass with existing state and schedules a re-render; it is asynchronous/batched within React event handlers.",
      deepExplanation: "Unlike useState (which replaces the value for that slot entirely), `this.setState({ a: 1 })` shallow-merges the given object into the existing state object, leaving other keys untouched — this is a key API difference. Because setState is asynchronous and batched, calling it multiple times in the same handler with an object argument based on `this.state` can use stale values; the functional updater form `this.setState((prevState, props) => ({...}))` guarantees you're working off the most current pending state. `setState` also accepts an optional second callback argument invoked after the update has been applied and the component re-rendered, useful for logic that must run only after the DOM reflects the new state.\n\n```jsx\nclass Counter extends React.Component {\n  state = { count: 0 };\n  increment = () => {\n    this.setState(prev => ({ count: prev.count + 1 }));\n  };\n  render() {\n    return <button onClick={this.increment}>{this.state.count}</button>;\n  }\n}\n```",
      productionExample: "Legacy production class components (still common in codebases pre-dating React 16.8) use this.setState for everything from form field tracking to modal visibility; teams migrating to hooks replace this.state/setState with one or more useState/useReducer calls that mirror the same shape.",
      bestPractices: [
        "Never mutate `this.state` directly; always go through setState",
        "Use the functional updater form when new state depends on previous state",
        "Keep state initialization in the constructor or as a class field for clarity",
        "Avoid putting non-serializable or derivable values in state",
        "Use the setState callback only for logic that must run after the DOM updates, not as a general 'wait for async' mechanism",
        "Split large state objects logically instead of one giant catch-all object"
      ],
      tradeOffs: "Advantages: shallow-merge behavior lets you update a single field without spreading the rest of state; the second callback argument gives an explicit post-update hook. Disadvantages: shallow merging can hide bugs when nested objects/arrays aren't updated immutably; asynchronous batching inside class methods can surprise developers expecting synchronous updates; verbose compared to useState's simpler per-slot model.",
      commonMistakes: [
        "Mutating `this.state` directly (`this.state.count = 1`) instead of calling setState — this won't trigger a re-render",
        "Interview trap: calling `this.setState({count: this.state.count + 1})` twice in a row expecting +2 — because of batching, both calls may read the same stale `this.state.count`, resulting in only +1; the functional form is required for reliable sequential updates",
        "Forgetting setState only shallow-merges at the top level, so mutating a nested object in place still won't be detected as a change",
        "Assuming setState is synchronous when called inside a React event handler",
        "Not using the setState callback when logic genuinely needs to run after the re-render/DOM update",
        "Overloading a single state object with unrelated concerns instead of decomposing components"
      ],
      followUpQuestions: [
        "Does setState replace or merge with the existing state object?",
        "Why might two sequential setState calls with object arguments not produce the expected cumulative result?",
        "When would you use the setState callback argument?",
        "Is setState synchronous or asynchronous, and does that ever change?",
        "How would you convert this.state/setState to useState?"
      ],
      relatedTopics: ["useState", "batched updates", "shallow merge", "PureComponent", "shouldComponentUpdate"]
    }
  },
  {
    detail: {
      id: "reactx1-9",
      questionNumber: "REACTX1-009",
      title: "Immutable State in React",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Stripe", "Uber"],
      frequency: 4,
      category: "State",
      part: "React Fundamentals",
      concepts: ["immutability", "shallow comparison", "reference equality", "reconciliation", "PureComponent"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What is immutable state, and why is it important in React?"
    },
    answer: {
      expectedAnswer: "Immutable state means you never mutate an existing state object/array in place; instead, every update creates a new object/array with the changed values. React (and optimizations like PureComponent, React.memo, and useMemo/useCallback dependency arrays) rely on cheap reference equality checks (`Object.is`/`===`) to detect changes, so mutating state in place produces the same reference and causes React to think nothing changed, silently breaking re-renders and memoized comparisons.",
      deepExplanation: "React's reconciliation and its optimization primitives are built around shallow, reference-based equality rather than deep value comparison, because deep comparison would be too expensive to run on every render. When you call `setState`/a state setter with the same object reference you mutated in place, React can't tell the value changed, so a component wrapped in `React.memo` or extending `PureComponent` may not re-render even though the underlying data did change — while a plain component that always re-renders on setState may render correctly by accident but has just masked the underlying bug. Immutability also enables cheap 'has anything changed' checks in libraries like Redux and in useEffect/useMemo dependency arrays, and it makes state changes easier to trace/debug and to implement features like undo/redo, since old snapshots remain untouched.\n\n```jsx\n// Wrong: mutates state in place\nconst addItem = (item) => {\n  todos.push(item); // same reference, memoized children won't re-render\n  setTodos(todos);\n};\n\n// Correct: creates a new array\nconst addItem = (item) => {\n  setTodos(prev => [...prev, item]);\n};\n```",
      productionExample: "Redux reducers and React state updates for lists/objects (todo lists, form state, normalized entity caches) are always written to spread/copy the existing structure and apply changes to the copy, which is also why libraries like Immer exist — to let developers write what looks like mutating code while producing a new immutable structure under the hood.",
      bestPractices: [
        "Always create new objects/arrays for updates: use spread syntax, `.map`, `.filter`, `.concat` instead of push/splice/direct assignment",
        "Use a library like Immer when update logic gets deeply nested and hard to express immutably by hand",
        "Keep state normalized (flat, keyed by id) to make immutable updates to nested structures easier",
        "Rely on reference equality checks (memo, useMemo, useCallback deps) only when you're disciplined about immutability everywhere",
        "Avoid storing mutable class instances or DOM nodes directly in state",
        "Write reducers as pure functions that return new state rather than mutating the draft argument (unless using Immer's produce)"
      ],
      tradeOffs: "Advantages: enables fast reference-equality optimizations (memo, PureComponent, useMemo), predictable and traceable state transitions, straightforward undo/redo and time-travel debugging. Disadvantages: naive immutable updates on deeply nested state require verbose spreading at every level; creates additional short-lived objects, adding minor GC pressure; requires discipline/tooling (Immer, Redux Toolkit) to avoid accidental mutation bugs.",
      commonMistakes: [
        "Interview trap: calling array mutator methods (push, splice, sort, reverse) directly on state and then calling the setter with the same reference — React sees no change and may skip re-rendering memoized descendants",
        "Deeply nested state updates that only shallow-copy the top level, leaving inner objects/arrays still mutated by reference",
        "Assuming JSON.parse(JSON.stringify(x)) is a safe general-purpose deep clone (it breaks on functions, Dates, Maps, undefined values, etc.)",
        "Forgetting sort()/reverse() mutate the array in place even when used inside what looks like an otherwise immutable update chain",
        "Not updating dependency arrays correctly because a mutated object's reference never changes, so useEffect/useMemo never re-runs",
        "Treating Redux Toolkit's Immer-powered 'mutating' syntax inside createSlice as a general license to mutate state elsewhere in the app"
      ],
      followUpQuestions: [
        "Why does React rely on reference equality rather than deep equality?",
        "What breaks if you mutate an array in state and then call the setter with the same reference?",
        "How does Immer let you write 'mutating' code that's actually immutable?",
        "How would you immutably update a deeply nested object in state?",
        "How does immutability relate to implementing undo/redo?"
      ],
      relatedTopics: ["React.memo", "PureComponent", "Immer", "Redux", "reconciliation", "reference equality"]
    }
  },
  {
    detail: {
      id: "reactx1-10",
      questionNumber: "REACTX1-010",
      title: "componentDidMount Use Cases",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Microsoft"],
      frequency: 4,
      category: "Lifecycle Methods",
      part: "React Fundamentals",
      concepts: ["componentDidMount", "mounting phase", "data fetching", "DOM access", "subscriptions"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "When would you use componentDidMount, and why is it important?"
    },
    answer: {
      expectedAnswer: "componentDidMount fires once, immediately after a class component's first render, once the real DOM nodes exist. It's the right place for side effects that need the DOM to exist or should only run once on mount: fetching initial data, setting up subscriptions/timers, or integrating third-party DOM libraries — because it's guaranteed to run after the browser has painted the initial markup.",
      deepExplanation: "React's mount phase runs render() to produce the element tree, commits it to the real DOM, and only then invokes componentDidMount — so refs to DOM nodes are guaranteed to be attached by the time this method runs, unlike the constructor or render itself. It runs exactly once per component instance (unlike componentDidUpdate, which runs on every subsequent update), making it ideal for one-time setup: initial API calls, WebSocket/subscription setup, measuring DOM node dimensions, or initializing non-React libraries (chart libraries, map widgets) that need a real DOM node to attach to. Any subscription or timer started here should be torn down in componentWillUnmount to avoid leaks. Calling setState inside componentDidMount is allowed and will trigger an extra render before the browser paints, which is intentional for cases like measuring layout and adjusting state accordingly.\n\n```jsx\nclass UserProfile extends React.Component {\n  state = { user: null };\n  componentDidMount() {\n    fetchUser(this.props.userId).then(user => this.setState({ user }));\n  }\n  render() {\n    return this.state.user ? <div>{this.state.user.name}</div> : <Spinner />;\n  }\n}\n```",
      productionExample: "Analytics/telemetry initialization, initial data fetches for a detail page, and third-party widget mounting (maps, charts, video players) are classic componentDidMount use cases in production class components; the functional-component equivalent is `useEffect(() => {...}, [])`.",
      bestPractices: [
        "Use componentDidMount for one-time setup that requires the DOM or should only happen once",
        "Always pair subscriptions/timers/listeners started here with cleanup in componentWillUnmount",
        "Avoid unnecessary setState calls that aren't tied to actual mount-time data",
        "Prefer fetching only the data needed for initial render, not everything eagerly",
        "Guard against setting state after the component has unmounted (e.g. a slow fetch resolving late) to avoid warnings/leaks",
        "In hooks-based code, use `useEffect(fn, [])` as the direct equivalent"
      ],
      tradeOffs: "Advantages: guarantees the DOM exists, runs exactly once, ideal for imperative integrations. Disadvantages: doesn't exist in functional components (must convert to a hook), pairs with componentWillUnmount which is easy to forget, and calling setState here causes an extra synchronous render before paint which can be a minor performance cost if overused.",
      commonMistakes: [
        "Fetching data in the constructor or render instead of componentDidMount, before the DOM exists or on every render",
        "Interview trap: forgetting that a fetch started in componentDidMount can resolve after the component has already unmounted, causing a 'setState on an unmounted component' warning/memory leak if not guarded or cancelled",
        "Not cleaning up subscriptions/timers started in componentDidMount inside componentWillUnmount",
        "Assuming componentDidMount runs before the DOM is attached — it runs after",
        "Doing expensive synchronous work here that blocks the initial paint",
        "Forgetting componentDidMount doesn't exist for functional components — useEffect with an empty dependency array is the equivalent, but timing differs slightly for layout-sensitive work (useLayoutEffect may be needed instead)"
      ],
      followUpQuestions: [
        "What guarantees does componentDidMount give you about the DOM?",
        "What's the functional-hooks equivalent of componentDidMount?",
        "How do you prevent a late-resolving fetch from causing a setState-after-unmount warning?",
        "Why might calling setState in componentDidMount be necessary despite causing an extra render?",
        "How does componentDidMount interact with componentWillUnmount for cleanup?"
      ],
      relatedTopics: ["useEffect", "componentWillUnmount", "mounting phase", "subscriptions", "data fetching"]
    }
  },
  {
    detail: {
      id: "reactx1-11",
      questionNumber: "REACTX1-011",
      title: "componentDidUpdate vs componentWillUpdate",
      difficulty: "Medium",
      companies: ["Amazon", "Netflix", "Adobe", "Atlassian"],
      frequency: 3,
      category: "Lifecycle Methods",
      part: "React Fundamentals",
      concepts: ["componentDidUpdate", "componentWillUpdate", "UNSAFE lifecycle methods", "prevProps", "prevState"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does componentDidUpdate differ from componentWillUpdate?"
    },
    answer: {
      expectedAnswer: "componentDidUpdate(prevProps, prevState, snapshot) runs after a re-render has been committed to the DOM, so it's safe to read the updated DOM and to call setState conditionally (guarded to avoid infinite loops). componentWillUpdate(nextProps, nextState) ran before the render/commit, was renamed UNSAFE_componentWillUpdate, and is deprecated because it encouraged side effects before render that broke React's ability to interrupt/pause rendering under concurrent features.",
      deepExplanation: "componentDidUpdate is the update-phase counterpart to componentDidMount — it runs after every re-render (except the initial mount) once the DOM reflects the new state/props, receiving `prevProps` and `prevState` so you can diff what changed and react accordingly (e.g. refetch data if an id prop changed). It's commonly paired with `getSnapshotBeforeUpdate`, which runs right before the DOM is mutated and can capture information (like scroll position) that's then passed as the third argument to componentDidUpdate. `componentWillUpdate`/`UNSAFE_componentWillUpdate`, by contrast, fired before rendering, and was marked unsafe because React's concurrent rendering model may call pre-commit lifecycle methods multiple times or abandon a render entirely, making any side effect performed there unreliable and hard to reason about — DOM mutations or subscriptions started there could be duplicated or leaked. Because of this, componentWillUpdate/UNSAFE_componentWillUpdate is deprecated in favor of getSnapshotBeforeUpdate (post-render, pre-commit) or simply doing the check inside componentDidUpdate.\n\n```jsx\ncomponentDidUpdate(prevProps) {\n  if (prevProps.userId !== this.props.userId) {\n    this.fetchUser(this.props.userId);\n  }\n}\n```",
      productionExample: "componentDidUpdate is commonly used to refetch data when an id prop changes, sync a component with an external non-React library after prop changes, or restore scroll position (using getSnapshotBeforeUpdate) after a list prepends new items — componentWillUpdate is essentially absent from modern production code.",
      bestPractices: [
        "Always guard setState calls inside componentDidUpdate with a condition to avoid infinite render loops",
        "Compare prevProps/prevState against current props/state to detect what actually changed",
        "Use getSnapshotBeforeUpdate + componentDidUpdate's third argument instead of any pre-render side effect",
        "Avoid UNSAFE_componentWillUpdate/componentWillUpdate entirely in new code",
        "Prefer useEffect with a dependency array in functional components as the direct replacement",
        "Keep update-phase side effects narrowly scoped to the specific prop/state change that triggered them"
      ],
      tradeOffs: "Advantages of componentDidUpdate: safe to read the DOM, works correctly with concurrent rendering, supports conditional refetching/syncing. Disadvantages: must manually guard against infinite setState loops; runs on every update unless conditionally skipped, which can be less efficient than declarative dependency-array-based hooks. componentWillUpdate's only 'advantage' was running before render, but this made it unsafe under React's async rendering model, hence its deprecation.",
      commonMistakes: [
        "Interview trap: calling setState unconditionally inside componentDidUpdate, causing an infinite update loop since the setState itself triggers another componentDidUpdate call",
        "Still using componentWillUpdate/UNSAFE_componentWillUpdate in new code despite it being deprecated",
        "Performing DOM mutations or side effects in a pre-render lifecycle method that concurrent rendering may call multiple times",
        "Not comparing prevProps/prevState before acting, causing the effect logic to run on every update regardless of relevance",
        "Forgetting getSnapshotBeforeUpdate must return a value (or null) and pairs specifically with componentDidUpdate's third parameter",
        "Assuming componentDidUpdate runs on the initial mount — it does not"
      ],
      followUpQuestions: [
        "Why was componentWillUpdate marked UNSAFE and deprecated?",
        "How do you avoid an infinite loop when calling setState in componentDidUpdate?",
        "What is getSnapshotBeforeUpdate used for?",
        "What's the functional hooks equivalent of componentDidUpdate?",
        "Does componentDidUpdate run after the initial mount?"
      ],
      relatedTopics: ["getSnapshotBeforeUpdate", "UNSAFE lifecycle methods", "concurrent rendering", "useEffect", "componentDidMount"]
    }
  },
  {
    detail: {
      id: "reactx1-12",
      questionNumber: "REACTX1-012",
      title: "Cleanup in componentWillUnmount",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Uber", "Stripe"],
      frequency: 4,
      category: "Lifecycle Methods",
      part: "React Fundamentals",
      concepts: ["componentWillUnmount", "cleanup", "memory leaks", "event listeners", "subscriptions", "timers"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What cleanup tasks are typically handled in componentWillUnmount?"
    },
    answer: {
      expectedAnswer: "componentWillUnmount fires once, right before a component is removed from the DOM, and is where you tear down anything that outlives a single render: clearing timers/intervals, unsubscribing from external stores or WebSocket/event-emitter subscriptions, removing manually-added DOM event listeners, and cancelling in-flight network requests to prevent 'setState on unmounted component' warnings.",
      deepExplanation: "React invokes componentWillUnmount synchronously right before actually detaching the component's DOM nodes and destroying its instance, so this is the last reliable chance to release any resource tied to the component's lifetime. Anything set up imperatively outside React's own render cycle — `setInterval`/`setTimeout`, `addEventListener` on `window`/`document`, subscriptions to an external store (Redux store.subscribe, WebSocket connections, RxJS subscriptions) — will otherwise keep running and holding a reference to the unmounted component's closure, causing a memory leak and, if it eventually calls setState, a runtime warning. Because componentWillUnmount only runs once, cleanup logic doesn't need conditionals — but it must precisely mirror whatever was set up in componentDidMount (same listener reference, same interval id) or the removal won't actually take effect. In hooks, the equivalent is the cleanup function optionally returned from useEffect, which runs both before the effect re-runs and on unmount.\n\n```jsx\ncomponentDidMount() {\n  window.addEventListener('resize', this.handleResize);\n  this.timerId = setInterval(this.tick, 1000);\n}\ncomponentWillUnmount() {\n  window.removeEventListener('resize', this.handleResize);\n  clearInterval(this.timerId);\n}\n```",
      productionExample: "Production apps rely on this pattern for cleaning up WebSocket connections in chat features, clearing polling intervals for live dashboards, removing scroll/resize listeners, and cancelling pending fetch requests (via AbortController) when a user navigates away before a request resolves.",
      bestPractices: [
        "Pair every subscription/listener/timer set up in componentDidMount with matching teardown here",
        "Store references (listener function, interval/timeout id, subscription object) on the instance so they're accessible for cleanup",
        "Use AbortController to cancel in-flight fetches on unmount",
        "Guard any pending async setState calls, or better, cancel the underlying request so setState is never called after unmount",
        "Don't rely on componentWillUnmount for state persistence — it only cleans up, it can't prevent unmounting",
        "In functional components, return a cleanup function from useEffect mirroring this pattern"
      ],
      tradeOffs: "Advantages: single guaranteed teardown point, runs exactly once per instance, prevents leaks and stale updates. Disadvantages: must be manually kept in sync with whatever componentDidMount set up — easy to forget one listener; doesn't exist in functional components (must be modeled via useEffect's cleanup return); can't prevent an unmount from happening, only react to it after the fact.",
      commonMistakes: [
        "Interview trap: forgetting to remove an event listener or clear an interval, causing it to keep firing (and referencing a stale, unmounted component's closure) after the component is gone — a classic memory leak",
        "Removing a listener with a different function reference than the one originally added (removeEventListener requires the exact same reference)",
        "Not cancelling in-flight fetch requests, leading to 'Can't perform a React state update on an unmounted component' warnings",
        "Assuming componentWillUnmount can prevent or cancel the unmount itself — it cannot",
        "Forgetting the hooks equivalent requires returning a function from useEffect, not calling cleanup logic directly in the effect body",
        "Doing expensive synchronous work in componentWillUnmount that blocks the unmount from completing quickly"
      ],
      followUpQuestions: [
        "How do you cancel an in-flight fetch request when a component unmounts?",
        "What happens if you forget to remove an event listener added in componentDidMount?",
        "What's the hooks equivalent of componentWillUnmount cleanup?",
        "Can componentWillUnmount prevent a component from unmounting?",
        "How would you clean up a WebSocket subscription safely?"
      ],
      relatedTopics: ["useEffect cleanup", "AbortController", "memory leaks", "event listeners", "componentDidMount", "subscriptions"]
    }
  },
  {
    detail: {
      id: "reactx1-13",
      questionNumber: "REACTX1-013",
      title: "useState vs Class State Management",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Flipkart"],
      frequency: 5,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useState", "this.state", "state merging", "per-slot state", "hooks"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How does useState differ from state management in class components?"
    },
    answer: {
      expectedAnswer: "useState manages one independent piece of state per call, and its setter *replaces* the value for that slot entirely — it does not merge like class setState does with the state object. Class components store all state fields together on a single `this.state` object, and `this.setState(partial)` shallow-merges the partial object into it, so updating one field doesn't require re-specifying the others.",
      deepExplanation: "This merge-vs-replace difference is the most important practical distinction: `this.setState({ b: 2 })` on `{a: 1, b: 1}` yields `{a: 1, b: 2}` automatically, but `setB(2)` from a `useState` hook simply sets that hook's own independent value — if you want an object-shaped state updated partially with useState, you must spread the previous object yourself: `setState(prev => ({...prev, b: 2}))`. Internally, class state is one object on the fiber's instance; hook state is a linked list of independent slots on the fiber, matched by call order, so multiple useState calls are genuinely separate pieces of state rather than fields of one object — this also means you can freely add/remove/reorganize which pieces of state exist as separate hooks without needing to restructure a monolithic state object.\n\n```jsx\n// Class: shallow merge\nthis.setState({ b: 2 }); // {a:1,b:1} -> {a:1,b:2}\n\n// Hooks: full replace per slot\nconst [state, setState] = useState({ a: 1, b: 1 });\nsetState({ b: 2 }); // becomes {b:2} entirely, 'a' is lost unless spread\nsetState(prev => ({ ...prev, b: 2 })); // correct partial update\n```",
      productionExample: "Teams migrating class components to hooks commonly split one this.state object into several independent useState calls (one per concern) rather than one big object, both because it maps more naturally to hooks' per-slot model and because it avoids unnecessary re-renders tied to unrelated field changes when combined with fine-grained memoization.",
      bestPractices: [
        "Prefer several small useState calls over one large state object when fields are independent",
        "When you do use an object with useState, always spread the previous state to merge manually",
        "Use useReducer instead of a large multi-field useState object when updates are interdependent",
        "Don't assume useState merges like class setState does — this is the #1 migration bug",
        "Use the functional updater form for both APIs when the new value depends on the previous one",
        "Keep hook call order stable and unconditional to preserve the mapping between hooks and their stored state"
      ],
      tradeOffs: "Advantages of useState's per-slot model: simpler mental model for independent state, easier to add/remove pieces of state without touching a shared object, works well with the rules of hooks. Disadvantages: object/array state must be manually merged, which is an easy mistake when migrating from class components. Advantages of class setState's merge behavior: convenient for object-shaped state without spreading. Disadvantages: encourages one large state object, can trigger re-renders for unrelated changes, and the merge is only shallow (one level deep).",
      commonMistakes: [
        "Interview trap: migrating from class setState to useState and assuming useState also shallow-merges an object — it fully replaces the value, silently dropping other fields",
        "Using one giant object in useState purely out of class-component habit instead of splitting into independent hooks",
        "Forgetting the functional updater form when new state depends on the previous state in rapid succession",
        "Assuming hook call order doesn't matter since 'it's just state', when in fact order determines which stored slot each hook call maps to",
        "Not spreading previous state when partially updating an object stored in useState",
        "Conflating useReducer's action-based merge semantics with useState's plain replace semantics"
      ],
      followUpQuestions: [
        "Does useState merge or replace the previous value?",
        "How would you convert a class component's this.state object into hooks?",
        "When would you choose one large useState object versus several separate ones?",
        "How does React associate each useState call with its stored value across renders?",
        "When should useReducer replace multiple related useState calls?"
      ],
      relatedTopics: ["useReducer", "this.setState", "shallow merge", "hooks call order", "fiber architecture"]
    }
  },
  {
    detail: {
      id: "reactx1-14",
      questionNumber: "REACTX1-014",
      title: "useEffect for Side Effects",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Uber"],
      frequency: 5,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useEffect", "side effects", "dependency array", "cleanup function", "effect timing"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you use useEffect for side effects, and what are some common use cases?"
    },
    answer: {
      expectedAnswer: "useEffect(callback, deps) runs `callback` after the browser has painted, and re-runs it whenever any value in the `deps` array changes since the last render (running once on mount if `deps` is `[]`, or after every render if `deps` is omitted). Common use cases are data fetching, subscribing to external stores/events, manually interacting with the DOM, and syncing React state with something outside React — with an optional returned cleanup function to undo the effect before it re-runs or when the component unmounts.",
      deepExplanation: "React schedules effects to run asynchronously after the commit/paint (unlike useLayoutEffect, which runs synchronously before paint), so useEffect never blocks the browser from showing the new UI. The dependency array is compared via `Object.is` against the previous render's values; if any entry differs, the previous effect's cleanup runs first, then the new effect body runs. Omitting the array entirely re-runs the effect after every render (rarely desired); an empty array `[]` runs it once, effectively mimicking componentDidMount + componentWillUnmount combined. The returned cleanup function is essential for anything with an ongoing lifetime — subscriptions, timers, listeners — since it fires both before the next effect run and on unmount, mirroring componentWillUnmount but scoped per-effect rather than per-component.\n\n```jsx\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    let cancelled = false;\n    fetchUser(userId).then(data => { if (!cancelled) setUser(data); });\n    return () => { cancelled = true; }; // cleanup avoids setState after unmount/stale response\n  }, [userId]);\n  return user ? <div>{user.name}</div> : <Spinner />;\n}\n```",
      productionExample: "useEffect powers data fetching on prop/param change, syncing document.title, subscribing to WebSocket/Redux store updates, setting up analytics event listeners, and integrating third-party non-React libraries — essentially any 'do something outside of pure rendering' logic in a functional component.",
      bestPractices: [
        "Always list every reactive value the effect reads in the dependency array (enforced by the exhaustive-deps ESLint rule)",
        "Return a cleanup function for any subscription, timer, or listener started in the effect",
        "Split unrelated concerns into separate useEffect calls instead of one large effect",
        "Guard async work with a cancellation flag or AbortController to avoid acting on stale/late responses",
        "Avoid effects for logic that can be computed directly during render (derived state doesn't need an effect)",
        "Use the dependency array intentionally — don't suppress the linter just to force a specific run pattern"
      ],
      tradeOffs: "Advantages: unifies mount/update/unmount side-effect logic into one declarative API scoped to the data it depends on; runs after paint so it doesn't block visual updates. Disadvantages: dependency array footguns (missing deps cause stale closures, over-inclusive deps cause effect loops); effects run after paint so DOM-measurement-then-update work can cause a visible flicker (useLayoutEffect fixes that specific case); overusing effects for logic that belongs in event handlers or render leads to unnecessary re-renders and complexity.",
      commonMistakes: [
        "Interview trap: omitting a variable used inside the effect from the dependency array, causing the effect to close over a stale value from the render it was created in (a 'stale closure')",
        "Forgetting to return a cleanup function for subscriptions/timers, causing leaks or duplicate side effects across re-renders",
        "Using an empty dependency array to 'run once' even though the effect reads props/state that can change, causing bugs when that value updates but the effect doesn't re-run",
        "Fetching data directly in the render body instead of inside useEffect, causing an infinite fetch loop",
        "Not guarding against race conditions when multiple fetches can be in flight (rapid prop changes) — the newest request isn't guaranteed to resolve last",
        "Using useEffect to derive/compute state that could simply be calculated during render, causing an extra render pass"
      ],
      followUpQuestions: [
        "What happens if you omit a value from the dependency array that the effect actually uses?",
        "How would you avoid a race condition when userId changes rapidly and triggers multiple fetches?",
        "What does an empty dependency array actually guarantee?",
        "When does the cleanup function run relative to the next effect execution?",
        "Why might you choose useLayoutEffect instead of useEffect for a specific case?"
      ],
      relatedTopics: ["useLayoutEffect", "dependency arrays", "stale closures", "cleanup functions", "componentDidMount/componentWillUnmount", "AbortController"]
    }
  },
  {
    detail: {
      id: "reactx1-15",
      questionNumber: "REACTX1-015",
      title: "Purpose of useContext",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Adobe", "Uber"],
      frequency: 5,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useContext", "Context API", "prop drilling", "context provider", "re-render propagation"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What is the purpose of useContext, and how does it simplify state management?"
    },
    answer: {
      expectedAnswer: "useContext(MyContext) reads the current value of the nearest matching `<MyContext.Provider>` above the calling component in the tree, letting components consume shared data (theme, auth user, locale) directly without it being threaded through props at every intermediate level. It replaces the older `<MyContext.Consumer>` render-prop pattern with a plain hook call, simplifying access to context inside functional components.",
      deepExplanation: "Context solves prop drilling: instead of passing a value through every intermediate component that doesn't itself need it, a Provider higher in the tree supplies a value that any descendant can read via useContext, regardless of nesting depth. Internally, when a Provider's `value` prop changes (compared by reference, so a new object/array literal on every render counts as 'changed'), React re-renders every consuming component that calls useContext for that context, even if they're wrapped in React.memo — memoization only protects against prop changes, not context changes. This is why context providers commonly memoize their value with useMemo, and why splitting one large context into several smaller, more targeted contexts (or combining context with a reducer, `useContext` + `useReducer`) is a common performance pattern to avoid over-broad re-renders.\n\n```jsx\nconst ThemeContext = createContext('light');\n\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n  return (\n    <ThemeContext.Provider value={value}>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  const { theme } = useContext(ThemeContext); // no prop drilling through intermediate components\n  return <div className={theme}>...</div>;\n}\n```",
      productionExample: "Theme, authenticated-user, and localization/i18n data are classic context use cases in production apps; global app state that changes frequently (large lists, form state) is usually kept in a dedicated state library instead, since broad context re-renders don't scale well to high-frequency updates.",
      bestPractices: [
        "Memoize the Provider's value prop with useMemo to avoid unnecessary consumer re-renders",
        "Split large contexts into smaller, more targeted ones by concern",
        "Reserve context for genuinely cross-cutting, infrequently-changing data (theme, auth, locale)",
        "Avoid using context as a replacement for a proper state management solution for high-frequency, complex state",
        "Co-locate a context and its Provider with a custom hook (`useTheme()`) that wraps useContext for a cleaner consumer API",
        "Provide a sensible default value to createContext for components rendered outside any Provider"
      ],
      tradeOffs: "Advantages: eliminates prop drilling, simple hook-based consumption API, works naturally with any descendant depth. Disadvantages: every consumer re-renders on any Provider value change regardless of which part of the value it actually uses, React.memo doesn't protect against context updates, and overusing context for frequently-changing state can cause broad, hard-to-trace re-render cascades.",
      commonMistakes: [
        "Interview trap: assuming React.memo prevents a component from re-rendering due to a context change — memo only checks props, not context, so a memoized component still re-renders when a context it consumes changes",
        "Passing a new object/array literal as the Provider's value on every render, causing all consumers to re-render even when the meaningful data didn't change",
        "Using a single giant context for all app state instead of splitting by concern, causing unrelated consumers to re-render together",
        "Forgetting to provide a Provider higher in the tree and getting the default value silently instead of an error",
        "Using context for high-frequency updates (e.g. mouse position, form keystrokes) where a state library or local state would perform far better",
        "Not memoizing derived values computed from context, recomputing them on every consumer render"
      ],
      followUpQuestions: [
        "Does React.memo prevent re-renders caused by context changes?",
        "How would you avoid unnecessary consumer re-renders when a context's value object changes reference every render?",
        "When would you split one context into multiple smaller contexts?",
        "How does useContext compare to the older Context.Consumer render-prop pattern?",
        "When would you reach for Redux/Zustand instead of Context for state management?"
      ],
      relatedTopics: ["Context API", "prop drilling", "useMemo", "React.memo", "Redux", "createContext"]
    }
  },
  {
    detail: {
      id: "reactx1-16",
      questionNumber: "REACTX1-016",
      title: "useReducer vs useState",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Stripe"],
      frequency: 4,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useReducer", "reducer function", "actions", "dispatch", "complex state transitions"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does useReducer compare to useState, and when would you use it?"
    },
    answer: {
      expectedAnswer: "useReducer(reducer, initialState) manages state via a pure `(state, action) => newState` function and a `dispatch(action)` call, rather than a direct setter — it's better suited than useState when several sub-values change together, when the next state depends on complex logic derived from the action type, or when you want update logic centralized and easily testable outside the component.",
      deepExplanation: "useState is really implemented on top of the same primitive as useReducer internally (a simplified reducer that just replaces the value), so useReducer is the more general tool. The reducer function must be pure — no side effects, no mutation of the state argument, always returning a new state object — and React calls it with the current state and the dispatched action to compute the next state, then triggers a re-render if the reference differs. `dispatch` has a stable identity across renders (unlike a useState setter closed over specific state, though that's also stable), so it can be passed deep into child components or context without triggering extra re-renders from an unstable reference. useReducer shines when multiple fields update together in response to the same event (e.g. form validation setting both a value and an error simultaneously), or when the same state shape is updated from many different places and you want one auditable place (the reducer) that fully describes all valid transitions — this also makes reducers trivially unit-testable since they're pure functions.\n\n```jsx\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    case 'reset': return { count: 0 };\n    default: throw new Error('Unknown action: ' + action.type);\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return <button onClick={() => dispatch({ type: 'increment' })}>{state.count}</button>;\n}\n```",
      productionExample: "Complex forms with interdependent field validation, multi-step wizards, and shopping-cart-style state (add/remove/update quantity, all affecting totals together) commonly use useReducer, often paired with useContext to provide both state and dispatch to a subtree without prop drilling — effectively a lightweight local Redux.",
      bestPractices: [
        "Keep the reducer function pure — no API calls, timers, or mutation inside it",
        "Model state transitions as explicit, named action types rather than ad-hoc partial updates",
        "Use a default case that throws for unhandled action types to catch typos early",
        "Combine useReducer with useContext to share state and dispatch across a subtree without prop drilling",
        "Extract complex initial state computation into a lazy third argument (useReducer's init function) rather than computing it inline",
        "Prefer useReducer over several interdependent useState calls once update logic branches by more than a couple of conditions"
      ],
      tradeOffs: "Advantages: centralizes and documents all valid state transitions in one testable pure function, dispatch has a stable reference well-suited for passing to memoized children/context, scales better than useState for complex interdependent updates. Disadvantages: more boilerplate for simple state, requires defining action types/shapes upfront, less immediately readable for small components with one or two independent values.",
      commonMistakes: [
        "Interview trap: performing a side effect (API call, timer) directly inside the reducer function instead of dispatching after the effect completes — reducers must stay pure and side-effect-free",
        "Mutating the state argument passed into the reducer instead of returning a new object",
        "Reaching for useReducer for trivial independent state that useState would handle more simply",
        "Not handling an unknown action type, silently returning the current state and masking a typo in the action type string",
        "Assuming dispatch triggers a synchronous state update readable immediately after calling it",
        "Overcomplicating a reducer with deeply nested conditional logic instead of splitting it into helper functions"
      ],
      followUpQuestions: [
        "Why must the reducer function be pure?",
        "How would you combine useReducer with useContext to avoid prop drilling of dispatch?",
        "When would you choose useReducer over several useState calls?",
        "How does useReducer's lazy initialization (third argument) work?",
        "Is dispatch's identity stable across re-renders?"
      ],
      relatedTopics: ["pure functions", "dispatch", "Redux", "useContext", "state machines", "action types"]
    }
  },
  {
    detail: {
      id: "reactx1-17",
      questionNumber: "REACTX1-017",
      title: "useCallback and useMemo for Performance",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Stripe", "Uber"],
      frequency: 5,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useCallback", "useMemo", "referential equality", "memoization", "React.memo", "dependency arrays"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "What are useCallback and useMemo, and how do they optimize performance?"
    },
    answer: {
      expectedAnswer: "useMemo(fn, deps) memoizes a computed *value*, re-running `fn` only when a dependency changes and returning the cached result otherwise; useCallback(fn, deps) memoizes a *function reference* itself (it's equivalent to `useMemo(() => fn, deps)`). Both exist to preserve referential equality across renders — useMemo avoids expensive recalculation, and useCallback avoids passing a new function reference to memoized children or effect dependency arrays, which would otherwise defeat React.memo or re-trigger effects unnecessarily.",
      deepExplanation: "Without memoization, every render of a component creates brand-new function and object literals; if that reference is passed as a prop to a child wrapped in `React.memo`, the child's shallow prop comparison sees a 'new' function every time and re-renders anyway, defeating the memoization. useCallback returns the *same* function reference across renders as long as its dependencies haven't changed, letting React.memo's comparison succeed and skip re-rendering the child. useMemo similarly avoids recomputation of expensive derived values (filtering/sorting large lists, complex calculations) and, like useCallback, avoids handing a new object/array reference to something checking equality (a memoized child, or another hook's dependency array). Both should be used deliberately, not reflexively — for cheap computations or components that always re-render anyway, the memoization bookkeeping itself has overhead and can be a net loss.\n\n```jsx\nconst ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {\n  console.log('rendered');\n  return items.map(i => <Item key={i.id} item={i} onSelect={onSelect} />);\n});\n\nfunction Parent({ items }) {\n  const [query, setQuery] = useState('');\n  const filtered = useMemo(() => items.filter(i => i.name.includes(query)), [items, query]);\n  const handleSelect = useCallback((id) => console.log(id), []); // stable reference\n  return <ExpensiveList items={filtered} onSelect={handleSelect} />;\n}\n```",
      productionExample: "Large virtualized/filterable lists, expensive chart data transformations, and any component tree using React.memo extensively for large sibling lists rely on useCallback/useMemo to keep prop references stable so memoization actually prevents re-renders; React DevTools Profiler is typically used to confirm the optimization is actually reducing renders before committing to it.",
      bestPractices: [
        "Only reach for useMemo/useCallback when you've measured a real performance problem, not preemptively everywhere",
        "Pair useCallback with React.memo on the receiving child — useCallback alone does nothing to prevent the memoized component's own re-render logic",
        "Keep dependency arrays exhaustive and accurate — use the exhaustive-deps ESLint rule",
        "Prefer moving state down or using composition to avoid needing memoization at all where possible",
        "Use useMemo for genuinely expensive computations (large array processing), not trivial arithmetic",
        "Consider the React Compiler / automatic memoization tooling where available instead of hand-rolled useMemo/useCallback everywhere"
      ],
      tradeOffs: "Advantages: preserves referential equality to enable React.memo and stable effect dependencies, avoids recomputing expensive derived values. Disadvantages: adds memory overhead (caching previous deps/result) and computational overhead for the comparison itself; overusing them on cheap operations or components that re-render anyway is a net performance loss and adds cognitive/code overhead; incorrect dependency arrays reintroduce stale-closure bugs identical to useEffect's.",
      commonMistakes: [
        "Interview trap: wrapping a callback in useCallback but passing it to a child that isn't wrapped in React.memo — the child re-renders regardless, so the memoization achieves nothing",
        "Using useMemo/useCallback everywhere reflexively, adding overhead without measurable benefit ('premature optimization')",
        "Omitting a dependency from the array, causing the memoized function/value to close over a stale variable",
        "Assuming useMemo guarantees the computation never re-runs — React may still discard the cached value and recompute in some cases (e.g. under memory pressure in future concurrent features), so it should not be relied on for correctness, only performance",
        "Memoizing a value that's cheap to compute, where the memoization bookkeeping costs more than just recalculating",
        "Not memoizing the dependencies (objects/arrays) passed into these hooks, causing them to appear 'changed' every render anyway"
      ],
      followUpQuestions: [
        "Why doesn't useCallback alone prevent a child from re-rendering?",
        "When is useMemo/useCallback actually worth the overhead versus not using it at all?",
        "How would you verify with React DevTools Profiler that a memoization actually reduced renders?",
        "What's the relationship between useCallback and useMemo internally?",
        "Should you rely on useMemo for correctness, or only for performance?"
      ],
      relatedTopics: ["React.memo", "referential equality", "React DevTools Profiler", "dependency arrays", "React Compiler"]
    }
  },
  {
    detail: {
      id: "reactx1-18",
      questionNumber: "REACTX1-018",
      title: "useRef and Its Use Cases",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Microsoft", "Netflix"],
      frequency: 4,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useRef", "mutable refs", "DOM refs", "persisting values without re-render"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does useRef work, and what are its typical use cases?"
    },
    answer: {
      expectedAnswer: "useRef(initialValue) returns a mutable `{ current: initialValue }` object that persists identically across the component's entire lifetime without causing a re-render when `.current` is mutated. Its two main uses are holding a reference to a DOM node (via the `ref` attribute) and storing any mutable value you want to keep between renders without triggering React's render cycle (timer ids, previous prop values, instance-like flags).",
      deepExplanation: "Unlike useState, mutating `ref.current` does not schedule a re-render and is read synchronously — there's no batching or scheduling involved, it's a plain mutable object. When passed to a JSX element's `ref` attribute, React populates `.current` with the underlying DOM node after the commit phase, giving imperative access to call methods like `.focus()` or measure `.getBoundingClientRect()`. Because the same ref object identity persists across renders, it's also commonly used to store 'instance variables' that class components used to keep on `this` — like a previous value for comparison, a mutable flag, or a setInterval id — without those changes causing the component to re-render every time they change (which is exactly what you want, since re-rendering isn't tied to their change).\n\n```jsx\nfunction TextInputWithFocusButton() {\n  const inputRef = useRef(null);\n  const focus = () => inputRef.current.focus();\n  return (\n    <>\n      <input ref={inputRef} />\n      <button onClick={focus}>Focus input</button>\n    </>\n  );\n}\n```",
      productionExample: "Refs are used in production for managing focus (accessibility flows, form validation), integrating imperative third-party DOM libraries (charting libraries, video players), storing previous prop/state values for comparison in effects, and holding mutable ids for timers/intervals/WebSocket connections that don't need to trigger re-renders.",
      bestPractices: [
        "Use refs for imperative DOM access (focus, scroll, measure), not for storing data that should drive rendering",
        "Don't read or write ref.current during render — it should only be accessed in effects or event handlers to avoid inconsistent behavior under concurrent rendering",
        "Use a ref to store a mutable value across renders when changes to it shouldn't cause a re-render",
        "Prefer state (useState) over a ref whenever the value's change should be reflected in the UI",
        "Combine useRef with useEffect for storing previous values ('usePrevious' custom hook pattern)",
        "Clean up any resources referenced via a ref (timers, subscriptions) in the corresponding effect's cleanup"
      ],
      tradeOffs: "Advantages: persists across renders without re-render overhead, provides direct imperative DOM access, ideal for values that are logically 'instance state' rather than UI-driving state. Disadvantages: mutating a ref doesn't trigger a re-render, so UI can silently get out of sync if a ref value should actually be reflected visually; reading/writing during render breaks React's purity assumptions and can behave unpredictably under Strict Mode/concurrent features.",
      commonMistakes: [
        "Interview trap: storing a value in a ref that should actually drive the UI, then being confused why the screen doesn't update when it changes — refs don't trigger re-renders by design",
        "Reading/mutating ref.current directly inside the render body instead of in an effect or event handler",
        "Assuming ref.current is populated immediately after the component function returns JSX — it's only set after the DOM commit, so it's not available synchronously during render",
        "Forgetting to null-check ref.current, since it starts as the given initial value (often null) before the DOM node mounts",
        "Using a ref instead of state purely to 'avoid a re-render' when the value genuinely needs to be shown in the UI",
        "Not cleaning up resources tracked in a ref (interval ids, subscriptions) on unmount"
      ],
      followUpQuestions: [
        "Why doesn't mutating a ref's current value trigger a re-render?",
        "When is ref.current guaranteed to be populated for a DOM node?",
        "How would you implement a 'usePrevious' custom hook using useRef?",
        "Why shouldn't you read or write ref.current during the render body itself?",
        "When would you choose a ref over state for a given piece of data?"
      ],
      relatedTopics: ["DOM refs", "forwardRef", "useImperativeHandle", "instance variables", "useEffect"]
    }
  },
  {
    detail: {
      id: "reactx1-19",
      questionNumber: "REACTX1-019",
      title: "useImperativeHandle Use Cases",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Adobe", "Atlassian"],
      frequency: 3,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useImperativeHandle", "forwardRef", "imperative API", "ref customization"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "What is useImperativeHandle, and when would you use it?"
    },
    answer: {
      expectedAnswer: "useImperativeHandle(ref, createHandle, deps), used together with forwardRef (or a component that accepts `ref` as a prop in React 19+), lets a child component customize exactly what a parent's ref exposes — instead of the parent getting the raw DOM node, it gets a curated object with only the specific imperative methods the child chooses to expose. It's used sparingly, for cases like exposing `focus()`, `scrollIntoView()`, or `reset()` methods from a complex custom input component without leaking its internal DOM structure.",
      deepExplanation: "Normally, forwarding a ref to a child gives the parent direct access to whatever DOM node (or class instance) is attached at the bottom, which tightly couples the parent to the child's internal implementation. useImperativeHandle intercepts that and lets the child return a custom object instead — so the parent's `ref.current` becomes exactly what the child's createHandle function returns, encapsulating internal DOM structure and exposing a deliberate, minimal imperative API. This is one of the few remaining hooks-era patterns that pairs with forwardRef (in React 19, function components can receive `ref` directly as a prop without forwardRef, simplifying this). It should be reserved for genuinely imperative needs — focus management, scrolling, measuring, triggering an animation — because it breaks React's declarative, data-flows-down model and should not be used as a general communication channel between components.\n\n```jsx\nconst FancyInput = forwardRef(function FancyInput(props, ref) {\n  const inputRef = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current.focus(),\n    clear: () => { inputRef.current.value = ''; }\n  }));\n  return <input ref={inputRef} {...props} />;\n});\n\n// Parent\nconst fancyRef = useRef(null);\n<FancyInput ref={fancyRef} />;\n<button onClick={() => fancyRef.current.focus()}>Focus</button>;\n```",
      productionExample: "Reusable form-input component libraries expose a curated imperative API (`focus`, `reset`, `validate`) via useImperativeHandle so consumers can trigger these actions without needing raw DOM access, while modal/dialog components commonly expose `open()`/`close()` methods the same way.",
      bestPractices: [
        "Reserve useImperativeHandle for genuinely imperative concerns (focus, scroll, animation triggers), not general state communication",
        "Expose the smallest possible API surface — only the methods consumers actually need",
        "Pair with forwardRef (or React 19's ref-as-prop) consistently",
        "Prefer declarative props/state for anything that can be expressed that way instead",
        "Document the exposed imperative methods clearly since they aren't part of the normal props contract",
        "Keep the createHandle function's dependency array accurate if it captures values from the closure"
      ],
      tradeOffs: "Advantages: encapsulates internal DOM structure while still allowing necessary imperative access; gives fine control over exactly what a ref exposes. Disadvantages: breaks React's declarative data flow, adds indirection that's harder to trace than props, easy to overuse as a shortcut instead of proper state/prop design, requires pairing with forwardRef which adds boilerplate.",
      commonMistakes: [
        "Interview trap: using useImperativeHandle as a general-purpose way to pass data between components instead of props/context — it should be reserved for imperative actions, not data flow",
        "Forgetting to wrap the component in forwardRef (pre–React 19), so the ref prop is never received",
        "Exposing too large an API surface (essentially the whole internal DOM node) instead of a minimal, purposeful set of methods",
        "Not including a dependency array, causing the handle object to be recreated unnecessarily every render",
        "Reaching for this pattern before trying to solve the problem declaratively with props and state",
        "Assuming this hook is commonly needed — in practice it's rare and mostly reserved for library/reusable-component authors"
      ],
      followUpQuestions: [
        "Why would you use useImperativeHandle instead of exposing the raw DOM node via ref?",
        "How does React 19 change the need for forwardRef with this pattern?",
        "What's a real-world example where an imperative API is genuinely necessary?",
        "What are the downsides of relying on imperative refs versus declarative props?",
        "How would you decide the minimal API surface to expose from a custom handle?"
      ],
      relatedTopics: ["forwardRef", "useRef", "imperative APIs", "ref-as-prop (React 19)", "component encapsulation"]
    }
  },
  {
    detail: {
      id: "reactx1-20",
      questionNumber: "REACTX1-020",
      title: "useLayoutEffect vs useEffect",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Stripe"],
      frequency: 4,
      category: "Hooks",
      part: "React Fundamentals",
      concepts: ["useLayoutEffect", "useEffect", "browser paint timing", "synchronous DOM measurement", "flicker"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How does useLayoutEffect differ from useEffect?"
    },
    answer: {
      expectedAnswer: "Both run after React commits changes to the DOM, but useLayoutEffect fires synchronously before the browser paints the updated frame, while useEffect fires asynchronously after paint. useLayoutEffect is needed when you must measure the DOM and synchronously apply a visual change before the user ever sees the intermediate state — otherwise useEffect is preferred since it doesn't block painting.",
      deepExplanation: "React's commit phase mutates the actual DOM, then runs layout effects synchronously (blocking the browser from painting), and only after that does the browser paint the frame and React run passive effects (useEffect) asynchronously. This means anything in useLayoutEffect that reads layout (getBoundingClientRect, scrollHeight) and then calls setState to adjust styling/positioning happens before the user ever sees a flash of the 'wrong' layout — a classic use case is measuring a tooltip's size to reposition it so it doesn't overflow the viewport, without a visible jump. Using useEffect for the same task would let the browser paint the initial (wrong) position first, then a moment later reposition it, causing a visible flicker. Because useLayoutEffect blocks paint, it should be used sparingly — only for effects that genuinely must run before the browser paints. On the server, neither runs during SSR, but React will warn if useLayoutEffect is used in an SSR component since there's no DOM to measure; useEffect is safe (it simply doesn't run server-side) or `useEffect`'s effect can be conditionally swapped to a no-op during SSR.\n\n```jsx\nfunction Tooltip({ targetRect }) {\n  const ref = useRef(null);\n  const [style, setStyle] = useState({});\n  useLayoutEffect(() => {\n    const { height } = ref.current.getBoundingClientRect();\n    setStyle({ top: targetRect.top - height }); // applied before paint, no flicker\n  }, [targetRect]);\n  return <div ref={ref} style={style}>Tooltip content</div>;\n}\n```",
      productionExample: "Tooltip/popover positioning libraries (e.g. Floating UI, Radix), drag-and-drop libraries measuring element bounds mid-gesture, and animation libraries synchronizing a starting position before paint all rely on useLayoutEffect to avoid visible flicker; the vast majority of other side effects (data fetching, subscriptions, logging) use plain useEffect.",
      bestPractices: [
        "Default to useEffect; only reach for useLayoutEffect when a visible flicker from paint-then-adjust is an actual, observed problem",
        "Keep useLayoutEffect work minimal and fast since it blocks the browser from painting",
        "Use useLayoutEffect specifically for DOM measurement immediately followed by a synchronous visual correction",
        "Avoid useLayoutEffect for data fetching, subscriptions, or logging — those belong in useEffect",
        "Be aware useLayoutEffect triggers an SSR warning since there's no DOM to measure server-side",
        "Profile with React DevTools if unsure whether a flicker is actually occurring before reaching for useLayoutEffect"
      ],
      tradeOffs: "Advantages of useLayoutEffect: eliminates visible flicker for measure-then-adjust DOM work, guarantees the DOM is updated before the user sees the frame. Disadvantages: synchronously blocks painting, so overuse degrades perceived performance; not available/safe during SSR. Advantages of useEffect: doesn't block paint, better default for the vast majority of side effects, safe no-op during SSR. Disadvantages: can't prevent a one-frame flicker for measure-then-adjust visual work.",
      commonMistakes: [
        "Interview trap: using useEffect for DOM measurement that immediately repositions an element, causing a visible one-frame flicker that useLayoutEffect would have prevented",
        "Using useLayoutEffect by default for everything, unnecessarily blocking paint and hurting perceived performance",
        "Using useLayoutEffect in server-rendered components without guarding against the 'useLayoutEffect does nothing on the server' warning",
        "Doing expensive computation inside useLayoutEffect, which delays paint noticeably",
        "Assuming useLayoutEffect runs before the DOM is updated — it runs after the DOM mutation but before paint, not before the mutation itself",
        "Not recognizing that both hooks skip the initial server-render pass entirely (effects only run on the client)"
      ],
      followUpQuestions: [
        "Why does useLayoutEffect prevent flicker where useEffect doesn't?",
        "Why is useLayoutEffect unsafe/warned against during server-side rendering?",
        "Give a concrete example where useLayoutEffect is necessary.",
        "What's the performance cost of overusing useLayoutEffect?",
        "How do both hooks behave differently during React's commit phase?"
      ],
      relatedTopics: ["commit phase", "browser paint cycle", "SSR", "DOM measurement", "useEffect", "React scheduling"]
    }
  },
  {
    detail: {
      id: "reactx1-21",
      questionNumber: "REACTX1-021",
      title: "Handling Events in Functional Components",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Flipkart", "Zoho"],
      frequency: 4,
      category: "Event Handling",
      part: "React Fundamentals",
      concepts: ["synthetic events", "onClick", "event handlers", "closures"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you handle events in functional components?"
    },
    answer: {
      expectedAnswer: "You attach camelCase event props (onClick, onChange, onSubmit) directly to JSX elements, pointing to a function defined in the component — either declared inline or as a named function that closes over the component's props/state via normal JavaScript closures. React wraps the native event in a SyntheticEvent object for cross-browser consistency, and handler functions naturally have access to the latest state/props from that render via closures.",
      deepExplanation: "Because a functional component is just a function that re-runs on every render, event handlers defined inside it are recreated each render and close over that render's specific props/state values — this is different from a class component's persistent instance methods, and is exactly why hooks like useCallback exist (to keep a stable reference when needed) and why stale closures can occur if an old handler reference is retained (e.g. in a ref or a stale setTimeout) instead of always using the latest one. React attaches a single event listener at the root of the app (rather than one per element) and simulates bubbling through its own synthetic event system, normalizing browser differences and pooling event objects in older React versions (pooling was removed in React 17+, so persisting an event asynchronously is now safe without calling `event.persist()`).\n\n```jsx\nfunction LikeButton({ postId, onLike }) {\n  const [liked, setLiked] = useState(false);\n  const handleClick = () => {\n    setLiked(true);\n    onLike(postId);\n  };\n  return <button onClick={handleClick}>{liked ? 'Liked' : 'Like'}</button>;\n}\n```",
      productionExample: "Every interactive UI element in a production React app — buttons, form inputs, custom dropdowns — wires up handlers this way; performance-sensitive lists sometimes pass a single handler down and read the item id from a data attribute or closure argument rather than creating a new inline function per row, though this is a micro-optimization.",
      bestPractices: [
        "Name handler functions descriptively (handleClick, handleSubmit) instead of anonymous inline functions for complex logic",
        "Extract shared handler logic into custom hooks when reused across components",
        "Avoid unnecessary re-creation of handlers passed to memoized children — use useCallback there specifically",
        "Prevent default form submission behavior explicitly with event.preventDefault() when needed",
        "Type event handler parameters explicitly in TypeScript (e.g. React.ChangeEvent<HTMLInputElement>)",
        "Don't rely on the synthetic event object outside the handler's synchronous execution without capturing needed fields first (in very old React versions with event pooling)"
      ],
      tradeOffs: "Advantages: closures naturally give handlers access to current props/state without extra binding, consistent SyntheticEvent API across browsers, single delegated listener improves memory efficiency at scale. Disadvantages: new function references are created every render unless memoized, which can matter for deeply memoized child trees; relying on stale closures inside timers/async callbacks is an easy source of bugs.",
      commonMistakes: [
        "Calling the handler immediately instead of passing a reference, e.g. `onClick={handleClick()}` instead of `onClick={handleClick}`",
        "Interview trap: an event handler set up in one render capturing (closing over) that render's state value, then being invoked later (e.g. via a stale setTimeout or an old ref) and reading outdated state instead of the latest",
        "Forgetting to call preventDefault() on form submission, causing an unwanted full page reload",
        "Passing a new inline arrow function to every list item unnecessarily when performance profiling shows it matters",
        "Assuming SyntheticEvent behaves identically to the native event in every respect (some rarely-used native properties may differ)",
        "Not typing event parameters in TypeScript, losing autocomplete and type safety on event.target"
      ],
      followUpQuestions: [
        "What is a SyntheticEvent and why does React use it?",
        "How does React handle event delegation internally?",
        "How can a stale closure occur in an event handler?",
        "Was event pooling removed in modern React, and what did that change?",
        "When would you memoize an event handler with useCallback?"
      ],
      relatedTopics: ["SyntheticEvent", "event delegation", "closures", "useCallback", "preventDefault"]
    }
  },
  {
    detail: {
      id: "reactx1-22",
      questionNumber: "REACTX1-022",
      title: "Event Handling: Functional vs Class Components",
      difficulty: "Easy",
      companies: ["Meta", "Microsoft", "Netflix"],
      frequency: 3,
      category: "Event Handling",
      part: "React Fundamentals",
      concepts: ["this binding", "class fields", "closures", "bind in constructor"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What are the differences in event handling between functional and class components?"
    },
    answer: {
      expectedAnswer: "In class components, event handler methods lose their `this` binding when passed as a callback (since JavaScript doesn't auto-bind methods), so you must bind them in the constructor, use arrow-function class fields, or wrap them in an inline arrow function at render time. In functional components, there's no `this` at all — handlers are just regular functions or closures that access props/state directly, eliminating the whole class of binding bugs.",
      deepExplanation: "A class method like `handleClick() { this.setState(...) }` is just a plain function property on the prototype; when passed as `onClick={this.handleClick}`, it's detached from the instance, so calling it later has `this` as `undefined` (in strict mode/ES modules) rather than the component instance, causing a runtime error the moment it tries to access `this.state` or `this.setState`. The three traditional fixes are: binding in the constructor (`this.handleClick = this.handleClick.bind(this)`), declaring the handler as an arrow function class field (`handleClick = () => {...}`, which captures `this` lexically at define-time via the surrounding class), or wrapping the reference in an inline arrow function in JSX (`onClick={() => this.handleClick()}`, which creates a new function every render but preserves `this` through the closure). Functional components sidestep this entirely: since there's no instance and no `this`, a handler defined inside the function body is just a closure over that render's props/state — no binding step is ever needed.\n\n```jsx\nclass Toggle extends React.Component {\n  state = { on: false };\n  // Arrow function class field avoids needing to bind in the constructor\n  handleClick = () => this.setState(s => ({ on: !s.on }));\n  render() {\n    return <button onClick={this.handleClick}>{this.state.on ? 'On' : 'Off'}</button>;\n  }\n}\n```",
      productionExample: "Legacy class-based codebases are full of constructor-bound handlers (`this.handleX = this.handleX.bind(this)` boilerplate) or arrow-function class fields; this entire category of bugs and boilerplate simply disappears once a codebase migrates to functional components with hooks.",
      bestPractices: [
        "Prefer functional components with hooks to avoid this-binding issues entirely",
        "If maintaining class components, use arrow-function class fields instead of binding in the constructor for less boilerplate",
        "Avoid inline arrow functions in render solely as a binding workaround when a bound method already exists, to reduce unnecessary re-creation",
        "Be consistent about the chosen binding strategy across a class-based codebase",
        "In functional components, memoize handlers with useCallback only when passed to memoized children",
        "Never assume a class method reference passed as a callback retains 'this' automatically"
      ],
      tradeOffs: "Advantages of functional handlers: no binding boilerplate, no risk of the classic 'this is undefined' bug, simpler mental model. Disadvantages: a new closure is created each render unless deliberately memoized. Advantages of class method handlers: explicit, familiar to OOP-background engineers. Disadvantages: binding boilerplate in the constructor, or subtly different performance/reference characteristics between bind-in-constructor versus arrow-class-field versus inline-arrow-in-render.",
      commonMistakes: [
        "Interview trap: passing `onClick={this.handleClick}` without binding, then hitting 'Cannot read property of undefined' when the handler tries to use `this.state` or `this.setState`",
        "Binding the same method in the constructor and also declaring it as an arrow function class field (redundant, only one is needed)",
        "Using `onClick={this.handleClick()}` (calling it immediately) instead of passing a reference",
        "Believing functional components need any equivalent binding step — they never do",
        "Creating a new inline arrow function in render for every list item purely out of binding habit carried over from class components",
        "Forgetting that arrow-function class fields require a class-properties transform (standard now, but historically needed a Babel plugin)"
      ],
      followUpQuestions: [
        "Why does `this` become undefined in an unbound class method passed as a callback?",
        "What are the three common ways to fix `this` binding in a class component?",
        "Why do functional components never need to bind `this`?",
        "What's the performance implication of binding in the constructor versus an inline arrow function in render?",
        "How would you convert a bound class event handler to a functional component hook equivalent?"
      ],
      relatedTopics: ["this binding", "class fields", "closures", "arrow functions", "hooks migration"]
    }
  },
  {
    detail: {
      id: "reactx1-23",
      questionNumber: "REACTX1-023",
      title: "Conditional Rendering with If Statements",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Netflix", "Zoho"],
      frequency: 3,
      category: "Conditional Rendering",
      part: "React Fundamentals",
      concepts: ["conditional rendering", "early return", "JSX expressions"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you implement conditional rendering using if statements?"
    },
    answer: {
      expectedAnswer: "Since `if` is a statement (not an expression), it can't be written directly inside JSX curly braces; instead you either use an early return from the component function based on a condition, or compute the JSX to render into a variable using an if/else block above the return statement, then reference that variable in the JSX.",
      deepExplanation: "JSX curly braces `{}` only accept expressions that evaluate to a value (a string, number, element, array, or null/undefined which renders nothing) — an `if` statement itself produces no value, so it cannot be embedded inline. The two idiomatic patterns are: (1) an early return, exiting the function entirely before reaching the main JSX when a condition is met (great for loading/error/empty states); and (2) assigning a JSX expression to a local variable via if/else before the final return, then interpolating that variable. Returning `null` from a component is valid and intentionally renders nothing to the DOM, which is the standard way to conditionally render 'nothing at all' rather than an empty string or false (though `false`, `null`, and `undefined` are all treated as 'render nothing' by React).\n\n```jsx\nfunction UserGreeting({ user, loading }) {\n  if (loading) return <Spinner />;\n  if (!user) return null; // render nothing\n\n  let content;\n  if (user.isAdmin) {\n    content = <AdminPanel />;\n  } else {\n    content = <UserPanel />;\n  }\n  return <div>{content}</div>;\n}\n```",
      productionExample: "Loading/error/empty-state guard clauses at the top of data-fetching components are the most common production use of early-return conditional rendering, keeping the main render path focused on the 'happy path' UI.",
      bestPractices: [
        "Use early returns for loading/error/empty states to keep the main render logic focused",
        "Assign computed JSX to a clearly-named variable when the condition can't be expressed as a simple early return",
        "Return null explicitly (not undefined implicitly) when a component should render nothing, for clarity",
        "Avoid deeply nested if/else chains — consider extracting a small helper component instead",
        "Keep conditional branches easy to scan — don't bury critical UI logic in complex nested conditionals",
        "Prefer ternary/&& for simple inline conditions and reserve if statements for more complex branching logic outside JSX"
      ],
      tradeOffs: "Advantages: clear, readable branching logic for complex conditions, early returns keep the main render path simple. Disadvantages: can't be written inline inside JSX, requiring extra variables or early returns which add a bit of structural overhead compared to a simple inline ternary for basic cases.",
      commonMistakes: [
        "Interview trap: trying to write `{if (x) { <A/> } else { <B/> }}` directly inside JSX, which is a syntax error since if is a statement, not an expression",
        "Returning `undefined` implicitly (forgetting a return value) from a component instead of explicitly returning null",
        "Nesting many if/else branches directly affecting readability instead of extracting logic into a helper function or component",
        "Forgetting an early return actually exits the whole function, potentially skipping hook calls below it and violating the rules of hooks if hooks are placed after a conditional return",
        "Using if/else for trivial single-condition rendering where a ternary or && would be simpler",
        "Not handling the loading/error/empty branches at all, assuming data is always present"
      ],
      followUpQuestions: [
        "Why can't you write an if statement directly inside JSX curly braces?",
        "What's the difference in behavior between returning null, undefined, and false from a component?",
        "Why must hooks be called before any conditional early return in a component?",
        "When would you prefer an early return over a ternary for conditional rendering?",
        "How would you refactor a deeply nested conditional render into something more readable?"
      ],
      relatedTopics: ["ternary operator", "logical && operator", "early return pattern", "rules of hooks", "rendering null"]
    }
  },
  {
    detail: {
      id: "reactx1-24",
      questionNumber: "REACTX1-024",
      title: "Ternary vs Logical && for Conditional Rendering",
      difficulty: "Easy",
      companies: ["Meta", "Amazon", "Uber", "Flipkart"],
      frequency: 4,
      category: "Conditional Rendering",
      part: "React Fundamentals",
      concepts: ["ternary operator", "logical AND operator", "short-circuit evaluation", "falsy values"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What is the difference between using ternary operators and the logical && operator for conditional rendering?"
    },
    answer: {
      expectedAnswer: "The ternary operator `condition ? <A/> : <B/>` renders one of two branches (including an explicit 'else' case, which can be null), while `condition && <A/>` renders `<A/>` only when condition is truthy and otherwise renders whatever the condition evaluates to when falsy — which is a problem if that falsy value is `0` or `''`, since React will render those as visible text rather than nothing.",
      deepExplanation: "`&&` relies on short-circuit evaluation: JavaScript evaluates the left operand, and if it's falsy, the expression evaluates to that falsy value without evaluating the right side at all; React then tries to render whatever that value is. `null`, `undefined`, `false`, and `true` all render as nothing when returned from JSX, which is why `&&` mostly appears to 'just work' for boolean conditions — but `0` and `''` are also falsy while being valid, renderable values, so `count && <Badge count={count} />` renders the literal text '0' on screen when count is 0, which is a very common real bug. The ternary operator doesn't have this trap because you explicitly control both branches, e.g. `count > 0 ? <Badge count={count} /> : null`, and it also supports genuinely different content in both branches rather than only an 'add or nothing' case.\n\n```jsx\n// Buggy: renders literal \"0\" when count is 0\n{count && <span>{count} items</span>}\n\n// Correct: explicit boolean condition\n{count > 0 && <span>{count} items</span>}\n\n// Ternary: explicit both branches\n{count > 0 ? <span>{count} items</span> : <span>No items</span>}\n```",
      productionExample: "Badge/counter components, conditional banners, and toggled UI sections in production apps use && for simple show/hide-based-on-boolean cases and ternaries when there's a genuine alternate branch to render (e.g. showing a login button vs a user avatar).",
      bestPractices: [
        "Coerce numeric conditions to an explicit boolean (e.g. `count > 0 &&`) before using && to avoid rendering 0",
        "Use && only for true 'render or render nothing' cases, not for two genuinely different branches",
        "Use a ternary when both the truthy and falsy branches render meaningful content",
        "Extract complex conditional trees into a small helper component or variable rather than nesting ternaries",
        "Be consistent about the team's preferred pattern for simple boolean toggles",
        "Watch for the same falsy-value issue with empty strings, not just 0"
      ],
      tradeOffs: "Advantages of &&: concise for simple show/hide cases. Disadvantages: silently renders 0/'' as visible text, a very common and hard-to-spot bug; can't express a real 'else' branch. Advantages of ternary: explicit control over both branches, avoids the falsy-render trap entirely when the else branch is null. Disadvantages: slightly more verbose for a pure show/hide toggle, and nested ternaries quickly become unreadable.",
      commonMistakes: [
        "Interview trap: writing `{count && <Badge/>}` and being surprised the page displays a stray '0' when count is 0, since 0 is falsy but still a renderable value in JSX",
        "Nesting multiple ternaries, producing hard-to-read conditional logic",
        "Using && when a real else-branch is needed, forcing an awkward second && expression instead of a ternary",
        "Forgetting empty string ('') is also falsy and subject to the same rendering trap as 0",
        "Assuming && always safely renders 'nothing' for any falsy left-hand value",
        "Overusing inline ternaries for complex multi-branch logic instead of extracting a helper function/component"
      ],
      followUpQuestions: [
        "Why does `{count && <Badge/>}` sometimes render a stray '0'?",
        "How would you fix the falsy-render bug in a count && element pattern?",
        "When would you choose a ternary over &&?",
        "What other falsy values besides 0 can cause the same issue?",
        "How would you refactor deeply nested ternaries for readability?"
      ],
      relatedTopics: ["short-circuit evaluation", "falsy values", "JSX rendering rules", "ternary operator", "conditional rendering patterns"]
    }
  },
  {
    detail: {
      id: "reactx1-25",
      questionNumber: "REACTX1-025",
      title: "Rendering Lists of Items",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Flipkart"],
      frequency: 5,
      category: "Lists and Keys",
      part: "React Fundamentals",
      concepts: ["array.map", "keys", "list rendering", "fragments"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you render a list of items in React?"
    },
    answer: {
      expectedAnswer: "You call `.map()` on an array of data, returning a JSX element for each item, and embed the resulting array of elements inside `{}` in your JSX — each element must be given a unique, stable `key` prop so React can efficiently track it across re-renders.",
      deepExplanation: "React accepts an array of elements as a valid child anywhere a single element is valid, since `.map()` returns a new array and JSX simply spreads that array into the tree at render time. Each element in that array needs a `key` prop, which React uses internally (not passed down as an actual prop to the component) during reconciliation to match elements between renders — without stable keys, React falls back to matching by array index, which breaks down when the list is reordered, filtered, or items are inserted/removed anywhere but the end. If you need to return multiple sibling elements per item without an extra wrapping DOM node, you use `<React.Fragment key={id}>` (the shorthand `<>` cannot take a key, so the explicit Fragment form is required when keys are needed).\n\n```jsx\nfunction TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>{todo.text}</li>\n      ))}\n    </ul>\n  );\n}\n```",
      productionExample: "Every list-driven UI in production — search results, product grids, comment threads, notification feeds — is rendered this way; for very long lists, virtualization libraries (react-window, react-virtualized) are layered on top to only render the visible subset of DOM nodes for performance.",
      bestPractices: [
        "Always provide a stable, unique key derived from the data itself (an id), not the array index",
        "Use React.Fragment with an explicit key when returning multiple elements per list item",
        "Filter/transform the source array before mapping rather than conditionally returning null mid-map when possible",
        "Consider list virtualization for very large lists (thousands of items) to avoid rendering excessive DOM nodes",
        "Keep the map callback simple; extract complex per-item rendering into a separate list-item component",
        "Ensure keys are unique only among siblings in that specific list, not globally across the whole app"
      ],
      tradeOffs: "Advantages: declarative, works naturally with any array transformation before rendering, integrates with React's reconciliation via keys for efficient updates. Disadvantages: rendering very large lists without virtualization creates excessive DOM nodes and hurts performance; incorrect or missing keys silently degrade correctness and performance without throwing an error (only a console warning if keys are missing entirely).",
      commonMistakes: [
        "Interview trap: using the array index as the key for a list that can be reordered, filtered, or have items inserted/removed from the middle — this causes React to misattribute component state/DOM nodes to the wrong items after a reorder",
        "Omitting keys entirely, triggering a console warning and defaulting to index-based reconciliation",
        "Using Math.random() or a newly generated id as a key on every render, defeating the purpose of stable keys entirely by making every item look 'new' each render",
        "Forgetting the shorthand `<>` fragment syntax can't carry a key — the explicit `<React.Fragment key={...}>` is required when keys are needed",
        "Mapping over data without first filtering out items that shouldn't render, then trying to return null awkwardly inside the map",
        "Not memoizing expensive per-item computations inside a large list's map callback"
      ],
      followUpQuestions: [
        "Why is using the array index as a key problematic when the list can be reordered?",
        "What does the key prop actually get used for internally by React?",
        "How would you render multiple elements per list item without an extra wrapper div?",
        "When would you introduce list virtualization?",
        "What happens if two sibling elements share the same key?"
      ],
      relatedTopics: ["reconciliation", "keys", "React.Fragment", "list virtualization", "array.map"]
    }
  },
  {
    detail: {
      id: "reactx1-26",
      questionNumber: "REACTX1-026",
      title: "Why Keys Matter in React Lists",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Microsoft", "Netflix"],
      frequency: 5,
      category: "Lists and Keys",
      part: "React Fundamentals",
      concepts: ["reconciliation", "diffing algorithm", "keys", "index as key anti-pattern"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "Why are keys important in React lists, and how should they be used?"
    },
    answer: {
      expectedAnswer: "Keys give React a stable identity for each element in a list across renders, so its diffing algorithm can tell which items were added, removed, reordered, or updated in place, rather than assuming positional (index-based) correspondence. Keys should be a unique, stable value derived from the actual data (an id), never the array index for lists that can reorder, filter, or have items inserted/removed mid-list.",
      deepExplanation: "React's reconciliation algorithm diffs sibling elements by key when keys are provided: it matches old and new elements with the same key and only updates what actually changed about that element, preserving component state and avoiding unnecessary DOM node recreation (and its side effects, like losing input focus or animation state). Without keys (or with index-based keys on a reorderable list), React falls back to comparing elements purely by position — so if you reorder or remove an item from the middle, React may think the *content* of several positions changed rather than recognizing that one specific item moved or disappeared, leading to state (like a focused input's cursor position, or a child's internal useState) getting attached to the wrong visual item, plus unnecessary re-renders/DOM mutations for items that didn't actually change.\n\n```jsx\n// Bug: index as key with a reorderable list\n{items.map((item, index) => <ListItem key={index} item={item} />)}\n// After sorting/removing an item, ListItem's internal state can end up attached to the wrong row\n\n// Correct: stable id from the data\n{items.map(item => <ListItem key={item.id} item={item} />)}\n```",
      productionExample: "Drag-and-drop reorderable lists, filterable/sortable tables, and todo/task apps are the classic production cases where an incorrect index-based key causes visible bugs — input fields retaining the wrong value after a reorder, or checkbox states appearing to 'jump' between rows.",
      bestPractices: [
        "Always use a stable, unique identifier from the data itself as the key",
        "Never use array index as key for lists that can be reordered, filtered, or have items added/removed from the middle",
        "Only use index as key as a last resort for a genuinely static, never-reordered, never-filtered list",
        "Keep keys unique only among immediate siblings, not globally across the app",
        "Don't generate a new key value on every render (e.g. Math.random()) — this defeats the entire purpose of keys",
        "When combining multiple data sources into one list, ensure the combined keys remain unique across all of them"
      ],
      tradeOffs: "Advantages of proper stable keys: correct reconciliation, preserved component state and DOM identity across reorders, fewer unnecessary re-renders and DOM mutations. Disadvantages: requires the data to have (or be given) a genuinely stable unique id, which isn't always readily available (e.g. lists generated fresh each render without ids need one assigned upstream).",
      commonMistakes: [
        "Interview trap: using array index as key on a sortable/filterable list, causing component state (like a controlled input's value) to attach to the wrong row after reordering",
        "Generating a new random key on every render, which makes React treat every item as brand new each time, destroying all component state and hurting performance",
        "Assuming keys are passed down to the component as a regular prop — they are stripped out and used internally by React only",
        "Using non-unique keys (e.g. a category name shared by multiple items) causing React to only render one of the colliding items or log a duplicate-key warning",
        "Not providing any key at all, resulting in a console warning and defaulting to index-based diffing",
        "Assuming keys need to be globally unique across the entire application rather than just among siblings"
      ],
      followUpQuestions: [
        "What specifically goes wrong when you use array index as key on a reorderable list?",
        "Are keys passed to the component as a prop?",
        "What happens if two sibling elements share the same key?",
        "When, if ever, is using index as key acceptable?",
        "How does React's diffing algorithm use keys during reconciliation?"
      ],
      relatedTopics: ["reconciliation algorithm", "diffing", "component state preservation", "list rendering", "fiber architecture"]
    }
  },
  {
    detail: {
      id: "reactx1-27",
      questionNumber: "REACTX1-027",
      title: "Reusing Components Effectively",
      difficulty: "Easy",
      companies: ["Meta", "Amazon", "Adobe", "Atlassian"],
      frequency: 3,
      category: "Component Composition",
      part: "React Fundamentals",
      concepts: ["reusability", "props-driven configuration", "composition", "single responsibility"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you reuse components effectively in React?"
    },
    answer: {
      expectedAnswer: "Effective reuse comes from designing components around a single, well-defined responsibility and configuring their variation entirely through props (and children) rather than hardcoding behavior — so the same component works across contexts by receiving different data/callbacks/render content, plus extracting shared non-visual logic into custom hooks.",
      deepExplanation: "A reusable component should have a minimal, clearly-typed prop API that expresses everything the consumer needs to customize (content via children/render props, appearance via variant/size props, behavior via callback props) without needing internal knowledge of implementation details. Reuse comes in two flavors: reusing UI structure (a Button, Card, Modal component parameterized by props) and reusing behavior/logic without UI (a custom hook like useDebounce or useFetch that any component can call). Composition — building complex UI by nesting simpler components and passing content through `children` — is generally preferred over configuration-heavy components with dozens of boolean/variant props, since composition scales better as requirements grow and keeps individual components simple.\n\n```jsx\nfunction Card({ title, children, footer }) {\n  return (\n    <div className=\"card\">\n      <h3>{title}</h3>\n      <div className=\"card-body\">{children}</div>\n      {footer && <div className=\"card-footer\">{footer}</div>}\n    </div>\n  );\n}\n\n// Reused across the app with entirely different content\n<Card title=\"Profile\" footer={<SaveButton />}><ProfileForm /></Card>\n<Card title=\"Stats\"><StatsChart /></Card>\n```",
      productionExample: "Design systems (Material UI, Chakra, internal component libraries) are built entirely around this principle — a single Button, Modal, or Table component reused across dozens of product surfaces, configured via props, with shared non-visual logic (form validation, pagination, data fetching) extracted into custom hooks used across many features.",
      bestPractices: [
        "Give components a single clear responsibility rather than many unrelated concerns",
        "Prefer children/composition over an ever-growing list of boolean configuration props",
        "Extract shared non-visual logic into custom hooks rather than duplicating it or wrapping it in HOCs",
        "Type the prop API clearly so reuse across teams is discoverable and safe",
        "Avoid premature abstraction — extract a reusable component once a real second use case appears, not speculatively",
        "Keep reusable components free of app-specific business logic; push that to the consuming feature code"
      ],
      tradeOffs: "Advantages: less duplicated code, consistent UI/behavior across the app, easier to test and maintain in one place. Disadvantages: over-abstracting too early can produce an overly generic component with a confusing prop API trying to serve too many unrelated use cases; composition-heavy designs require consumers to understand how to assemble pieces rather than use one big configurable component.",
      commonMistakes: [
        "Interview trap: adding more and more boolean props (isLarge, isPrimary, hasIcon, isRounded...) to a single component instead of using composition or a variant prop, leading to an unmaintainable combinatorial prop API",
        "Extracting a 'reusable' component after only one use case, guessing at future requirements incorrectly",
        "Baking app-specific business logic into a component meant to be generic/reusable",
        "Duplicating the same logic across components instead of extracting a shared custom hook",
        "Over-composing trivial components that add indirection without meaningful reuse benefit",
        "Not typing props clearly, making the reusable component's contract unclear to other consumers"
      ],
      followUpQuestions: [
        "When would you choose composition (children) over a configuration prop?",
        "How do custom hooks help with reuse beyond just UI components?",
        "How do you avoid over-abstracting a component too early?",
        "What's an example of a component with too many boolean props, and how would you refactor it?",
        "How does composition relate to the 'avoid prop drilling' principle?"
      ],
      relatedTopics: ["composition", "custom hooks", "children prop", "design systems", "single responsibility principle"]
    }
  },
  {
    detail: {
      id: "reactx1-28",
      questionNumber: "REACTX1-028",
      title: "Children Props and Component Composition",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Netflix", "Stripe"],
      frequency: 4,
      category: "Component Composition",
      part: "React Fundamentals",
      concepts: ["children prop", "composition", "slot pattern", "props.children"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What are children props, and how do they enable component composition?"
    },
    answer: {
      expectedAnswer: "`children` is a special, implicit prop populated automatically with whatever JSX is nested between a component's opening and closing tags; a wrapper component can render `{children}` (or `props.children`) wherever it wants that nested content to appear. This enables composition — a generic layout/wrapper component (Card, Modal, Layout) can be reused with completely different inner content without needing to know what that content is ahead of time.",
      deepExplanation: "When you write `<Wrapper><Content /></Wrapper>`, React sets `props.children` on Wrapper to the `<Content />` element (or an array of elements if there are multiple children, or a string for text children); Wrapper decides where and whether to render it. This is the mechanism behind slot-like patterns: a `Modal` component can render a fixed header/footer chrome around whatever body content the consumer passes as children, without Modal ever needing prop-level knowledge of that content's shape. It scales further with named 'slot' props (passing multiple pieces of content as separate props like `header`, `footer`, alongside `children` for the main body) when a component needs more than one content region. Composition via children is generally favored over configuration-heavy props or inheritance, because it keeps each component simple and lets consumers assemble exactly the structure they need.\n\n```jsx\nfunction Modal({ children, onClose }) {\n  return (\n    <div className=\"modal-overlay\">\n      <div className=\"modal\">\n        <button onClick={onClose}>x</button>\n        {children}\n      </div>\n    </div>\n  );\n}\n\n<Modal onClose={close}>\n  <h2>Confirm delete</h2>\n  <p>This cannot be undone.</p>\n</Modal>\n```",
      productionExample: "Layout components (page shells, cards, modals, accordions), and higher-level composition patterns like React Router's `<Route>` or context providers wrapping an app tree, all rely on children to let arbitrary nested content flow through a fixed structural wrapper.",
      bestPractices: [
        "Use children for the primary/default content region of a wrapper component",
        "Use additional named props (header, footer, actions) for secondary content regions beyond the main children slot",
        "Don't assume children is always a single element — it can be an array, string, or even a function (render props)",
        "Keep wrapper components agnostic about what their children actually are",
        "Use React.Children utilities cautiously and only when you truly need to iterate/transform children (rare, mostly needed for advanced library code)",
        "Prefer composition via children over deeply nested configuration props for structural flexibility"
      ],
      tradeOffs: "Advantages: maximum flexibility for consumers, decouples the wrapper's structure/chrome from its content, avoids configuration-prop explosion. Disadvantages: less type-safe/discoverable than explicit named props unless carefully typed; a wrapper has less control over the exact shape of its children unless it inspects/clones them (which is itself fragile and discouraged in most cases).",
      commonMistakes: [
        "Interview trap: assuming `children` is always a single React element — it can be undefined, a string, an array, or multiple elements, and code that assumes a single element (e.g. calling React.Children.only) will throw if that assumption is violated",
        "Cloning/mutating children with React.cloneElement in ways that create fragile, hard-to-maintain coupling between parent and child implementation details",
        "Overusing children for content that would be clearer as an explicit, well-named prop (e.g. a fixed 'title' region)",
        "Forgetting a wrapper component actually needs to render {children} somewhere — an easy omission that silently drops nested content",
        "Not handling the case where children is falsy/empty gracefully",
        "Using children where a render prop or slot-style named prop would be clearer for multiple distinct content regions"
      ],
      followUpQuestions: [
        "What types of values can the children prop actually be?",
        "How would you support multiple named content regions beyond a single children slot?",
        "When would you use React.Children utilities, and why are they generally discouraged?",
        "How does the children pattern compare to the render props pattern?",
        "What happens if a wrapper component forgets to render {children}?"
      ],
      relatedTopics: ["composition", "render props", "React.cloneElement", "slot pattern", "props.children"]
    }
  },
  {
    detail: {
      id: "reactx1-29",
      questionNumber: "REACTX1-029",
      title: "Composition vs Inheritance in React",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Microsoft"],
      frequency: 4,
      category: "Component Composition",
      part: "React Fundamentals",
      concepts: ["composition over inheritance", "children", "props", "HOCs", "hooks"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What is the difference between composition and inheritance in React?"
    },
    answer: {
      expectedAnswer: "Composition builds complex UI by combining smaller, independent components together (via props and children), while inheritance would mean one component extending another's implementation to inherit and override its behavior, class-style. React's official guidance is that there is no good use case for component inheritance — composition (props, children, custom hooks, HOCs, render props) covers every scenario inheritance might be used for, more flexibly and with less coupling.",
      deepExplanation: "Class components technically can use JavaScript's `extends` to inherit from another component class, but the React team has never found a legitimate use case for this in practice and actively recommends against it — inheriting from a shared base component class tightly couples the child to the parent's exact implementation, making both harder to change independently and reintroducing many of the classic OOP fragile-base-class problems. Composition instead achieves the same specialization/reuse goals by having one component render another and pass in configuration/content: a `SpecializedButton` isn't a subclass of `Button`, it's a component that renders `<Button variant=\"danger\">{children}</Button>` internally, fully encapsulating and hiding the fact that Button is used at all. This applies equally to functional components, where there's no `extends` mechanism at all — reuse instead happens through composition (children/props), custom hooks (sharing stateful logic without a component hierarchy), and to a lesser extent HOCs/render props for cross-cutting UI concerns.\n\n```jsx\n// Not idiomatic: inheritance\nclass DangerButton extends Button { /* fragile, avoid */ }\n\n// Idiomatic: composition\nfunction DangerButton(props) {\n  return <Button variant=\"danger\" {...props} />;\n}\n```",
      productionExample: "Design systems build specialized variants (PrimaryButton, IconButton, LinkButton) by composing/wrapping a base Button component and passing preset props, never by subclassing it; shared stateful logic (form state, pagination, auth checks) is extracted into custom hooks reused across many unrelated components instead of a shared base class.",
      bestPractices: [
        "Never use class inheritance (extends) between your own components — compose instead",
        "Specialize components by wrapping and pre-configuring a more general one via props",
        "Use custom hooks to share stateful logic across otherwise unrelated components",
        "Use children/render props for flexible content injection instead of overriding methods",
        "Reserve HOCs for genuinely cross-cutting concerns where hooks don't fit cleanly (e.g. wrapping third-party class components)",
        "Keep each component's implementation details encapsulated rather than exposed for a 'subclass' to override"
      ],
      tradeOffs: "Advantages of composition: loose coupling, components remain independently understandable and testable, no fragile-base-class problem, works uniformly for both function and class components. Disadvantages: can require slightly more boilerplate (wrapper components) than a one-line class extension would; deeply composed trees can occasionally be harder to trace than a straightforward override chain for engineers used to OOP.",
      commonMistakes: [
        "Interview trap: reaching for `class Foo extends Bar` between two custom components as a way to 'share behavior', when React explicitly recommends composition instead — this is considered an anti-pattern in React",
        "Confusing extending React.Component (required for any class component) with inheriting behavior from another custom component (not recommended)",
        "Overusing HOCs for logic sharing when a custom hook would be simpler and avoid wrapper-hell/prop-name collisions",
        "Building overly generic 'god components' instead of composing several focused ones",
        "Assuming functional components have some inheritance mechanism — they don't; composition and hooks are the only tools",
        "Tightly coupling a specialized component to a base component's internal implementation details instead of just its public prop API"
      ],
      followUpQuestions: [
        "Why does the React team recommend against component inheritance?",
        "How would you specialize a Button component using composition instead of inheritance?",
        "How do custom hooks provide a form of logic reuse that doesn't require a component hierarchy at all?",
        "What problems does the 'fragile base class' pattern cause?",
        "When, if ever, might a HOC still be justified over a custom hook?"
      ],
      relatedTopics: ["composition over inheritance", "custom hooks", "higher-order components", "children prop", "design systems"]
    }
  },
  {
    detail: {
      id: "reactx1-30",
      questionNumber: "REACTX1-030",
      title: "Creating a Higher-Order Component",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Adobe"],
      frequency: 4,
      category: "Higher-Order Components",
      part: "Advanced React",
      concepts: ["HOC", "component wrapping", "prop forwarding", "displayName", "static hoisting"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How do you create a Higher-Order Component (HOC) in React?"
    },
    answer: {
      expectedAnswer: "A HOC is a plain function that takes a component and returns a new component wrapping it — `const Enhanced = withSomething(WrappedComponent)`. Inside, it renders `WrappedComponent` with a combination of the props it received plus any additional props/state/logic it injects, and typically forwards refs and hoists non-React static properties for full compatibility with the wrapped component.",
      deepExplanation: "The core pattern is `function withX(Component) { return function Enhanced(props) { /* extra logic/state */ return <Component {...props} extra={value} />; }; }`. It's purely a function composition technique — nothing magic, just a function returning a component. Proper HOCs pass through all unrelated props via spread so the wrapped component's own prop API isn't broken, set a `displayName` (e.g. `withX(${Component.displayName || Component.name})`) so React DevTools shows a meaningful name instead of 'Enhanced', and use `hoist-non-react-statics` to copy over any static methods/properties the original component defined (since a function wrapping another function doesn't automatically inherit its statics). Refs don't pass through props automatically, so a HOC exposing ref access to the wrapped component needs `forwardRef` explicitly. Most cross-cutting concerns HOCs used to solve (subscribing to data, injecting theme/context) are now more idiomatically solved with custom hooks in functional components, but HOCs remain relevant for wrapping components you can't modify, or for patterns needing to intercept rendering itself (e.g. React Router's older withRouter).\n\n```jsx\nfunction withLoading(WrappedComponent) {\n  function WithLoading({ isLoading, ...rest }) {\n    if (isLoading) return <Spinner />;\n    return <WrappedComponent {...rest} />;\n  }\n  WithLoading.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;\n  return WithLoading;\n}\n\nconst UserListWithLoading = withLoading(UserList);\n```",
      productionExample: "Older React codebases used HOCs like `connect()` from react-redux, `withRouter` from react-router, and custom `withAuth`/`withTheme` wrappers; most of these libraries now expose equivalent hooks (useSelector/useDispatch, useNavigate/useLocation, useContext) as the preferred modern API, with the HOC versions kept mainly for legacy class-component compatibility.",
      bestPractices: [
        "Forward all unrelated props via spread so the wrapped component's API stays intact",
        "Set a meaningful displayName for easier debugging in React DevTools",
        "Hoist non-React static properties/methods from the wrapped component",
        "Use forwardRef in the HOC if consumers need to access the wrapped component's ref",
        "Don't mutate the passed-in component; always return a new wrapping component",
        "Prefer a custom hook instead of a new HOC when the cross-cutting logic doesn't need to inject rendering behavior around the component"
      ],
      tradeOffs: "Advantages: works with both function and class components, can intercept props/rendering entirely, well-established pattern predating hooks. Disadvantages: composing multiple HOCs creates 'wrapper hell' in DevTools and can cause prop name collisions between different HOCs; statics and refs don't pass through automatically and require extra handling; largely superseded by custom hooks for logic reuse in functional components.",
      commonMistakes: [
        "Interview trap: forgetting that a HOC wrapping a component does not automatically forward refs — a ref attached to the HOC's output points to the wrapper, not the inner component, unless forwardRef is used explicitly",
        "Not spreading through unrelated props, silently breaking the wrapped component's existing prop API",
        "Composing many HOCs together, causing naming collisions between injected props from different HOCs and a deeply nested 'wrapper hell' in the component tree/DevTools",
        "Forgetting to hoist static methods/properties, breaking code that relies on `Component.someStaticMethod`",
        "Creating a new HOC-wrapped component inside another component's render method, causing the wrapped component to remount (and lose state) on every parent render",
        "Reaching for a HOC when a simple custom hook would solve the same problem more simply in modern functional-component code"
      ],
      followUpQuestions: [
        "Why don't refs pass through a HOC automatically, and how do you fix that?",
        "What is 'wrapper hell' and how do multiple stacked HOCs cause it?",
        "Why must a HOC be defined outside of another component's render function?",
        "How do custom hooks replace many traditional HOC use cases?",
        "How would you hoist static properties from a wrapped component?"
      ],
      relatedTopics: ["render props", "custom hooks", "forwardRef", "hoist-non-react-statics", "connect() (react-redux)"]
    }
  },
  {
    detail: {
      id: "reactx1-31",
      questionNumber: "REACTX1-031",
      title: "Common Use Cases for HOCs",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Uber"],
      frequency: 3,
      category: "Higher-Order Components",
      part: "Advanced React",
      concepts: ["cross-cutting concerns", "authentication guards", "data fetching HOCs", "connect()"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What are some common use cases for HOCs?"
    },
    answer: {
      expectedAnswer: "HOCs are traditionally used for cross-cutting concerns that many unrelated components need: injecting Redux state/dispatch (`connect()`), route information (`withRouter`), authentication/authorization guards that redirect unauthenticated users, injecting theme/context values into class components, and wrapping components with loading/error boundary behavior.",
      deepExplanation: "Because a HOC can intercept props before they reach the wrapped component and inject additional props, conditionally render something else entirely (a spinner, a redirect, an error state), or wrap the output with additional markup, they were the primary pattern for adding this kind of behavior to class components before hooks existed. `connect(mapStateToProps, mapDispatchToProps)(Component)` from react-redux is the canonical historical example: it subscribes to the Redux store and injects the relevant slice of state plus dispatch-bound action creators as props. An auth-guard HOC (`withAuth(Component)`) checks an auth condition and either renders the wrapped component or redirects/renders a fallback, letting many route components share the same protection logic without duplicating it. In modern functional-component codebases, most of these are replaced by hooks — `useSelector`/`useDispatch`, `useContext`, a custom `useAuth()` hook combined with a `<ProtectedRoute>` wrapper component rendered declaratively in the router config — since hooks avoid prop injection entirely and let the consuming component read exactly what it needs.\n\n```jsx\nfunction withAuth(Component) {\n  return function Protected(props) {\n    const { user } = useAuth();\n    if (!user) return <Navigate to=\"/login\" />;\n    return <Component {...props} />;\n  };\n}\n```",
      productionExample: "react-redux's `connect()` remains widely used in large legacy codebases even though `useSelector`/`useDispatch` are now preferred for new code; auth-guard HOCs/wrapper route components are still common in production route configuration to gate entire sections of an app behind a login check.",
      bestPractices: [
        "Reach for a custom hook first; use a HOC only when you need to intercept rendering itself (redirect, conditional render) or wrap a component you can't modify",
        "Keep each HOC focused on one cross-cutting concern",
        "Avoid stacking many HOCs on one component — prefer composing a smaller number of well-scoped ones",
        "Document what props a HOC injects so consumers of the wrapped component understand the full prop contract",
        "Prefer declarative wrapper components (e.g. <ProtectedRoute>) over prop-injecting HOCs for route-level guards in modern routers",
        "Keep injected prop names unlikely to collide with the wrapped component's own props"
      ],
      tradeOffs: "Advantages: can intercept/redirect rendering entirely (not just inject data), works for both class and function components, well-understood established pattern. Disadvantages: injected props are implicit and not visible in the wrapped component's own type signature unless carefully typed; stacking multiple HOCs causes wrapper hell and potential prop collisions; largely superseded by hooks for pure data/logic injection use cases.",
      commonMistakes: [
        "Interview trap: using a data-injecting HOC purely to avoid prop drilling one level, when a simple prop pass-through or Context would be simpler and more explicit",
        "Not typing the injected props clearly in TypeScript, making the wrapped component's true prop requirements unclear",
        "Stacking many unrelated HOCs on a single component instead of consolidating cross-cutting concerns",
        "Using a class-only pattern (HOC + connect) in a purely functional-component codebase where hooks would be simpler",
        "Forgetting an auth-guard HOC needs to handle the loading/unknown auth state, not just authenticated/unauthenticated",
        "Not memoizing the return value of a HOC factory call, accidentally recreating the wrapped component type on every render and causing remounts"
      ],
      followUpQuestions: [
        "How would you rewrite a withAuth HOC as a hook plus a declarative route wrapper?",
        "Why is connect() from react-redux still seen in production despite useSelector/useDispatch existing?",
        "What's the risk of stacking multiple HOCs on the same component?",
        "How do you type the props injected by a HOC in TypeScript?",
        "When does a HOC still make more sense than a hook?"
      ],
      relatedTopics: ["connect() (react-redux)", "custom hooks", "route guards", "Context API", "wrapper hell"]
    }
  },
  {
    detail: {
      id: "reactx1-32",
      questionNumber: "REACTX1-032",
      title: "Implementing the Render Props Pattern",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Netflix", "Stripe"],
      frequency: 3,
      category: "Render Props",
      part: "Advanced React",
      concepts: ["render props", "function as children", "logic sharing", "prop function"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How do you implement the render props pattern in React?"
    },
    answer: {
      expectedAnswer: "A render prop is a prop whose value is a function that a component calls during its own render, passing it whatever internal state/data the consumer needs — the consumer supplies that function to control exactly what gets rendered, while the component supplies the reusable logic/state. It's commonly implemented either as a named prop (e.g. `render`) or by using `children` itself as a function.",
      deepExplanation: "Instead of a HOC injecting props into a fixed wrapped component, a render-props component holds some reusable stateful logic internally and, in its own render/return, invokes a function prop passed in by the consumer, handing that function the relevant data — the consumer's function returns whatever JSX it wants based on that data, giving full control over rendering while reusing the logic. This avoids the implicit-prop-injection and naming-collision issues of HOCs, since everything the consumer receives is explicit as function arguments at the exact call site, and there's no wrapper component obscuring the component tree in DevTools the way stacked HOCs do. The pattern still works identically in a functional-component world, but is largely superseded there by custom hooks, which achieve the same logic-sharing goal without needing an extra layer of JSX nesting at all.\n\n```jsx\nfunction MouseTracker({ render }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return (\n    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>\n      {render(pos)}\n    </div>\n  );\n}\n\n<MouseTracker render={({ x, y }) => <p>Mouse at {x}, {y}</p>} />\n\n// children-as-function variant\n<MouseTracker>{({ x, y }) => <p>Mouse at {x}, {y}</p>}</MouseTracker>\n```",
      productionExample: "Older libraries like react-motion, downshift, and Formik's `<Field>` popularized render props for sharing stateful logic (animation values, autocomplete state, form field state) without dictating markup; most of these libraries or their modern equivalents now expose the same logic as custom hooks (e.g. useField, useFormik) as the primary API.",
      bestPractices: [
        "Prefer a custom hook over render props for new functional-component code when possible",
        "Keep the function prop's argument shape well-documented/typed",
        "Use children-as-function when the component's primary purpose is exposing render control, to keep the JSX visually cleaner",
        "Avoid deeply nesting multiple render-props components ('callback hell' in JSX), which hurts readability",
        "Memoize the render function passed in if it's expensive to reconstruct and passed to a component sensitive to reference identity",
        "Name the render prop clearly (render, children) rather than something ambiguous"
      ],
      tradeOffs: "Advantages: explicit data flow at the exact call site (no implicit prop injection or naming collisions like HOCs), works for both function and class components, avoids extra wrapper components in the tree. Disadvantages: nesting multiple render-props components creates deeply indented, harder-to-read JSX ('callback hell'); a new render function passed inline every render can defeat memoization inside the render-props component; mostly superseded by custom hooks for pure logic-sharing needs in modern functional codebases.",
      commonMistakes: [
        "Interview trap: passing a brand-new inline arrow function as the render prop every render, which can break memoization inside the render-props component if it depends on that function's identity",
        "Nesting several render-props components inside each other, producing hard-to-read deeply indented JSX",
        "Reaching for render props for a case that a simple custom hook would solve far more directly in a functional-component codebase",
        "Not typing the shape of the data passed into the render function, leading to unclear consumer contracts",
        "Confusing render props with children used purely for static content (render props specifically means children/prop is a function)",
        "Overusing the pattern when a component's logic doesn't actually need to be shared across multiple different renderings"
      ],
      followUpQuestions: [
        "How would you convert a render-props component into an equivalent custom hook?",
        "What is 'callback hell' in the context of nested render-props components, and how would you avoid it?",
        "How does render props avoid the prop-collision problem that stacked HOCs can have?",
        "Why might passing a new inline function every render matter for a render-props component?",
        "When would render props still be preferable to a hook?"
      ],
      relatedTopics: ["custom hooks", "children as function", "HOCs", "logic reuse patterns", "component composition"]
    }
  },
  {
    detail: {
      id: "reactx1-33",
      questionNumber: "REACTX1-033",
      title: "Render Props vs HOCs",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Adobe", "Atlassian"],
      frequency: 3,
      category: "Render Props",
      part: "Advanced React",
      concepts: ["render props", "HOCs", "wrapper hell", "explicit data flow", "custom hooks"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "What are the advantages of using render props over HOCs?"
    },
    answer: {
      expectedAnswer: "Render props make the shared data explicit at the exact call site as function arguments, rather than implicitly injected as props by a wrapper — this avoids prop-name collisions between multiple pieces of shared logic, avoids the extra anonymous wrapper components ('wrapper hell') that stacked HOCs add to the component tree, and makes it visually obvious in the JSX exactly what data a given piece of rendered UI depends on.",
      deepExplanation: "With HOCs, `withA(withB(withC(Component)))` injects props from three different sources into Component, and if any two of them happen to use the same prop name, one silently overwrites the other with no compile-time or runtime warning; the consumer of Component also can't tell from Component's own definition which props are 'real' versus HOC-injected without tracing back through each wrapper. Render props sidestep this because the data is passed as an explicit function argument exactly where it's consumed, so there's no possibility of name collision across unrelated pieces of shared logic, and React DevTools shows one component instead of a chain of anonymous wrapper components for each HOC layer. The trade-off is render props can lead to deep JSX nesting when multiple pieces of shared state are composed together, which HOCs handled slightly more compactly (each wrap is just one more function call around the component reference, not nested JSX) — though in practice, both patterns have been largely superseded by custom hooks in functional-component code, which achieve the explicitness of render props without any extra component nesting in the tree at all.",
      productionExample: "Teams that previously composed several HOCs (connect, withRouter, withTheme) around a single class component often hit exactly this prop-collision/wrapper-hell problem, which was one of the concrete motivations for the React team introducing hooks — hooks let the same three concerns (Redux state, routing, theming) be consumed via useSelector/useLocation/useContext directly inside the component with zero extra wrapping.",
      bestPractices: [
        "Prefer explicit data flow (render props, or better, hooks) over implicit prop injection when avoiding naming collisions matters",
        "Use hooks over both patterns in new functional-component code when the shared concern doesn't require intercepting rendering itself",
        "If using render props, keep nesting shallow — compose at most one or two levels deep before refactoring",
        "Document the exact shape of data passed to a render prop function",
        "Avoid mixing HOCs and render props for the same concern within one codebase — pick one consistent pattern",
        "Recognize when a custom hook fully replaces the need for either pattern"
      ],
      tradeOffs: "Advantages of render props over HOCs: explicit call-site data flow, no prop-name collisions, no extra anonymous wrapper components cluttering the component tree. Disadvantages: multiple composed render-props components nest more deeply in JSX than the equivalent stacked HOC calls, and inline function props can be recreated every render. HOCs' advantage is a flatter JSX tree (composition happens outside JSX, at the function-call level) but this is offset by wrapper-hell in DevTools and prop injection ambiguity.",
      commonMistakes: [
        "Interview trap: composing multiple HOCs that each inject a prop with the same name, causing one to silently clobber another with no warning — render props (and hooks) avoid this entirely by making data explicit at the usage site",
        "Assuming render props are strictly 'better' in all cases rather than recognizing hooks now solve most of what motivated the comparison in the first place",
        "Deeply nesting several render-props components without recognizing the readability cost versus refactoring to hooks",
        "Not considering DevTools tree readability as a real trade-off when choosing between HOCs and render props",
        "Mixing both patterns inconsistently for similar concerns across a codebase",
        "Continuing to write new HOC/render-props code in a fully hooks-based codebase when a custom hook would be simpler"
      ],
      followUpQuestions: [
        "How do render props avoid the prop-collision problem HOCs can have?",
        "Why do stacked HOCs create 'wrapper hell' in DevTools?",
        "How do custom hooks compare to both patterns for solving the same underlying problem?",
        "What's the readability trade-off between nested render props and stacked HOCs?",
        "Would you introduce a new HOC or render-props component in a modern hooks-based codebase?"
      ],
      relatedTopics: ["higher-order components", "custom hooks", "wrapper hell", "explicit vs implicit data flow", "React DevTools"]
    }
  },
  {
    detail: {
      id: "reactx1-34",
      questionNumber: "REACTX1-034",
      title: "Setting Up Routing with BrowserRouter",
      difficulty: "Easy",
      companies: ["Meta", "Amazon", "Flipkart", "Uber"],
      frequency: 4,
      category: "React Router",
      part: "React Fundamentals",
      concepts: ["BrowserRouter", "HTML5 history API", "client-side routing", "React Router setup"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you set up routing in a React application using BrowserRouter?"
    },
    answer: {
      expectedAnswer: "You wrap the app's root in `<BrowserRouter>` (from react-router-dom), which uses the HTML5 History API (pushState/popState) to keep the UI in sync with the URL without full page reloads; inside it, you declare `<Routes>` containing `<Route path=\"...\" element={<Component/>} />` entries that map URL paths to components to render.",
      deepExplanation: "BrowserRouter creates a history object backed by the browser's native History API, listens for navigation events (both programmatic and back/forward button presses), and provides routing context down the tree via React Context so nested `<Routes>`/`<Route>`/`<Link>` components can read the current location and render accordingly — all without the browser making a real network request/full page reload, since the URL is only manipulated client-side via pushState. This requires server configuration to always serve the same `index.html` for any path (a 'catch-all' rewrite), since a direct browser navigation or refresh to a nested client-side route is a real HTTP request the server must handle by returning the SPA shell rather than a 404. The alternative, HashRouter, uses the URL's hash fragment instead and needs no server configuration, but produces less clean URLs (with a `#`) and is generally used only when server rewrite rules aren't possible.\n\n```jsx\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n```",
      productionExample: "Every client-side-routed single page application in production (dashboards, e-commerce sites, admin panels) wraps its root in BrowserRouter (or an equivalent data router like createBrowserRouter), paired with server/CDN rewrite rules so any deep link resolves to the SPA shell instead of a 404.",
      bestPractices: [
        "Configure the server/CDN to rewrite all unmatched paths to index.html so deep links and refreshes work",
        "Place BrowserRouter as high as possible in the tree, typically wrapping the entire App",
        "Use nested <Routes>/<Route> for layout-sharing route hierarchies instead of duplicating layout markup",
        "Prefer the newer data router APIs (createBrowserRouter + RouterProvider) for apps needing loaders/actions",
        "Avoid rendering more than one Router in an app — nested routers cause conflicting history management",
        "Use relative paths within nested routes for maintainability"
      ],
      tradeOffs: "Advantages: clean URLs without a hash fragment, uses the real browser History API so back/forward and bookmarking work naturally. Disadvantages: requires server-side rewrite configuration to avoid 404s on refresh/direct navigation to nested routes, unlike HashRouter which needs no server config but produces uglier URLs.",
      commonMistakes: [
        "Interview trap: deploying a BrowserRouter-based SPA without configuring the server to serve index.html for all paths, causing a 404 on any direct navigation or refresh to a nested route",
        "Nesting multiple Router components in the same app, causing conflicting/duplicated history management",
        "Confusing BrowserRouter's client-side navigation with a full page reload — Link/navigate never trigger a real HTTP request for in-app navigation",
        "Using absolute hrefs (<a href>) for internal navigation instead of <Link>, causing unnecessary full page reloads",
        "Forgetting to wrap Routes in a single Router ancestor, causing 'useNavigate/useLocation must be used within a Router' errors",
        "Not considering HashRouter as a fallback when server rewrite configuration genuinely isn't available (e.g. static file hosting without rewrite support)"
      ],
      followUpQuestions: [
        "Why does refreshing a deep client-side route 404 without server configuration?",
        "What's the difference between BrowserRouter and HashRouter?",
        "How does BrowserRouter avoid full page reloads on navigation?",
        "What's the difference between the classic Routes/Route API and the newer data router (createBrowserRouter) API?",
        "Can you nest multiple Router components in one app?"
      ],
      relatedTopics: ["HTML5 History API", "HashRouter", "createBrowserRouter", "client-side routing", "server rewrite rules"]
    }
  },
  {
    detail: {
      id: "reactx1-35",
      questionNumber: "REACTX1-035",
      title: "Route, Link, and Switch Components",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Netflix", "Flipkart"],
      frequency: 4,
      category: "React Router",
      part: "React Fundamentals",
      concepts: ["Route", "Link", "Switch/Routes", "exact matching", "client-side navigation"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What is the purpose of the Route, Link, and Switch components?"
    },
    answer: {
      expectedAnswer: "`Route` maps a URL path to the component that should render for it; `Link` renders an anchor tag that navigates client-side (via the History API) instead of triggering a full page reload; `Switch` (React Router v5, replaced by `Routes` in v6+) renders only the first matching Route among its children instead of every Route whose path happens to match.",
      deepExplanation: "In React Router v5, `<Switch>` wraps a set of `<Route>` elements and renders only the first one whose path matches the current URL, which was necessary because without it, every Route with a matching (even partial, non-exact) path would render simultaneously. v6+ replaced Switch with `<Routes>`, which changed the matching algorithm to always pick the single best/most-specific match automatically (no longer needing the `exact` prop that v5 required to prevent partial-path routes like `/users` from also matching `/users/1`). `Link` renders an `<a>` tag under the hood but intercepts the click to call `history.pushState` and update the app's routing context instead of letting the browser perform a real navigation/page reload, while still supporting things like right-click 'open in new tab' correctly since it's a real anchor element with a real href.\n\n```jsx\n// v6+\nimport { Routes, Route, Link } from 'react-router-dom';\n\n<Routes>\n  <Route path=\"/users\" element={<Users />} />\n  <Route path=\"/users/:id\" element={<UserDetail />} />\n</Routes>\n\n<Link to=\"/users\">Users</Link>\n```",
      productionExample: "Every route table in a React Router–based production app is built from Routes/Route (or Switch/Route in older v5 codebases), with Link used throughout the navigation UI (nav bars, breadcrumbs, in-content links) instead of raw anchor tags to preserve SPA behavior.",
      bestPractices: [
        "Use Link (or NavLink for active-state styling) instead of raw <a> tags for all internal navigation",
        "Migrate Switch + exact to Routes when upgrading to React Router v6+, since v6's matching no longer needs exact",
        "Order more specific routes appropriately if using v5's Switch, since it picks the first match top-to-bottom",
        "Use nested Route elements for shared layouts instead of duplicating layout markup per route",
        "Use route parameters (:id) for dynamic segments rather than query strings when the value identifies a specific resource",
        "Keep the route table centralized and readable rather than scattering Route definitions across the codebase"
      ],
      tradeOffs: "Advantages of Switch/Routes: prevents multiple Route matches from rendering simultaneously, v6's Routes further removes the need for manual `exact` and ordering-sensitive matching. Disadvantages: v5's Switch requires careful route ordering and the `exact` prop to avoid partial-match bugs; migrating between v5 and v6 routing APIs requires touching most route definitions in an app.",
      commonMistakes: [
        "Interview trap: forgetting the `exact` prop in React Router v5, causing `/users` to also match and render for `/users/123` since v5 does partial matching by default without it",
        "Using a raw <a href> for internal navigation, causing an unwanted full page reload and loss of client-side app state",
        "Wrapping Route elements in Switch/Routes incorrectly, or omitting the wrapper entirely so multiple routes render simultaneously",
        "Not upgrading route matching logic when migrating from v5's Switch to v6's Routes, since the matching algorithm and prop names (component vs element) both changed",
        "Ordering routes incorrectly in v5's Switch, causing a broader route to shadow a more specific one listed after it",
        "Assuming Link never results in a real network request — it still needs the initial page load and asset bundle to already be present"
      ],
      followUpQuestions: [
        "Why did React Router v6 replace Switch with Routes?",
        "What problem does the exact prop solve in React Router v5?",
        "How does Link avoid a full page reload while still rendering as a real anchor tag?",
        "How would you set up nested routes sharing a common layout?",
        "What changed about route matching precision between v5 and v6?"
      ],
      relatedTopics: ["React Router v6 migration", "NavLink", "nested routes", "route matching", "History API"]
    }
  },
  {
    detail: {
      id: "reactx1-36",
      questionNumber: "REACTX1-036",
      title: "Handling Route Parameters",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Uber", "Zoho"],
      frequency: 4,
      category: "React Router",
      part: "React Fundamentals",
      concepts: ["useParams", "dynamic segments", "route parameters", "query strings", "useSearchParams"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you handle route parameters in React Router?"
    },
    answer: {
      expectedAnswer: "You define a dynamic segment in the route path with a colon (`<Route path=\"/users/:userId\" element={<User/>} />`), and read its current value inside the matched component with the `useParams()` hook, which returns an object keyed by parameter name (all values are strings). Query string parameters (?search=abc) are handled separately via `useSearchParams()`.",
      deepExplanation: "React Router parses the actual URL against the declared path pattern and extracts whatever segment lines up with `:userId` into the params object, so navigating to `/users/42` gives `useParams()` returning `{ userId: '42' }` — note it's always a string, so numeric ids need explicit parsing/coercion if used for comparisons or API calls expecting a number. Multiple dynamic segments can appear in one path (`/users/:userId/posts/:postId`), and optional/wildcard segments are supported with `?`/`*` in modern versions. Query parameters are conceptually different from path params — they're for optional, non-identifying state (filters, pagination, sort order) rather than identifying a specific resource — and are read/written via `useSearchParams()`, which returns a URLSearchParams-like object plus a setter, keeping that state synced with the URL so it's shareable/bookmarkable and survives a refresh.\n\n```jsx\n<Route path=\"/users/:userId\" element={<UserDetail />} />\n\nfunction UserDetail() {\n  const { userId } = useParams(); // string, e.g. \"42\"\n  const [searchParams] = useSearchParams();\n  const tab = searchParams.get('tab'); // e.g. \"posts\"\n  useEffect(() => { fetchUser(Number(userId)); }, [userId]);\n  return <div>User {userId}, tab: {tab}</div>;\n}\n```",
      productionExample: "Product detail pages (`/products/:id`), user profiles (`/users/:username`), and paginated/filterable list views (using query params for page/sort/filter state) are the standard production patterns for route and query parameters respectively.",
      bestPractices: [
        "Use path params for identifying a specific resource, query params for optional filter/display state",
        "Explicitly coerce numeric-looking param strings (Number(id)) before comparisons or API calls expecting a number",
        "Keep filter/sort/pagination state in the URL via useSearchParams so it's shareable and survives refresh",
        "Validate/guard against malformed or missing params before using them (e.g. NaN after parsing)",
        "Use nested routes with shared params rather than re-declaring the same dynamic segment repeatedly",
        "Sync form/filter UI state with useSearchParams rather than maintaining a separate parallel useState"
      ],
      tradeOffs: "Advantages: path/query param separation cleanly distinguishes identity from optional display state; params are always available via a simple hook without prop drilling. Disadvantages: params are always strings requiring manual coercion/validation; keeping complex filter state fully synced with the URL via useSearchParams adds some boilerplate compared to plain local state.",
      commonMistakes: [
        "Interview trap: comparing a route param directly to a number (`userId === 42`) without coercion, which always fails since useParams values are strings",
        "Using a path param for genuinely optional state (like a filter) instead of a query param, producing awkward URL structures",
        "Not validating a param before using it in a fetch call, causing requests like /api/users/undefined when the param is missing/malformed",
        "Forgetting useSearchParams triggers a re-render whenever the search string changes, similar to any other reactive router state",
        "Hardcoding parameter names inconsistently between the Route path and the useParams destructure, causing a silent undefined",
        "Not handling the case where an optional param segment is absent"
      ],
      followUpQuestions: [
        "Why are useParams values always strings, and how would you safely convert one to a number?",
        "When would you use a route/path param versus a query param?",
        "How does useSearchParams help keep filter state shareable via URL?",
        "How would you handle multiple dynamic segments in one route?",
        "What happens if a required param is missing from the URL?"
      ],
      relatedTopics: ["useParams", "useSearchParams", "dynamic routing", "nested routes", "URL state management"]
    }
  },
  {
    detail: {
      id: "reactx1-37",
      questionNumber: "REACTX1-037",
      title: "Programmatic Navigation with useHistory",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Stripe"],
      frequency: 3,
      category: "Navigation",
      part: "React Fundamentals",
      concepts: ["useHistory", "useNavigate", "programmatic navigation", "push vs replace"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you navigate programmatically using the useHistory hook?"
    },
    answer: {
      expectedAnswer: "In React Router v5, `useHistory()` returns the router's history object, and calling `history.push('/path')` navigates to a new URL (adding a new entry to the browser history stack) while `history.replace('/path')` navigates without adding a new entry (replacing the current one). In React Router v6+, `useHistory` was removed in favor of `useNavigate()`, which is called as `navigate('/path')` or `navigate('/path', { replace: true })`.",
      deepExplanation: "Programmatic navigation is needed whenever a redirect should happen as a result of code (form submission success, an auth check failing, a timed redirect) rather than a user clicking a Link. `history.push` mimics a normal Link click, adding a new browser history entry so the back button returns to the previous page; `history.replace` swaps the current entry, which is preferable after actions like a successful login or a redirect from a now-invalid URL, so the back button doesn't return the user to a page that no longer makes sense (like a submitted form or a redirect-away 404). React Router v6 consolidated this into a single `useNavigate()` hook returning a `navigate` function that takes either a path string or a delta number (e.g. `navigate(-1)` to go back), with an options object for `replace` and `state` (to pass non-URL data to the destination route, accessible there via `useLocation().state`).\n\n```jsx\n// v5\nconst history = useHistory();\nconst onSubmit = async () => {\n  await saveForm();\n  history.replace('/success');\n};\n\n// v6+\nconst navigate = useNavigate();\nconst onSubmit = async () => {\n  await saveForm();\n  navigate('/success', { replace: true });\n};\n```",
      productionExample: "Post-login redirects, post-form-submission navigation, and auth-guard redirects to a login page (often preserving the originally intended destination via location state) are the standard production uses of programmatic navigation.",
      bestPractices: [
        "Use replace instead of push for redirects that shouldn't be revisited via the back button (post-login, post-submit)",
        "Migrate from useHistory to useNavigate when upgrading to React Router v6+",
        "Pass necessary context via the navigate options' state parameter rather than encoding everything into the URL",
        "Avoid navigating inside the render body directly — trigger navigation from an event handler or effect",
        "Guard navigation calls with proper conditionals to avoid redirect loops",
        "Preserve the originally intended destination when redirecting to a login page so users land back where they meant to go"
      ],
      tradeOffs: "Advantages: enables navigation as a direct consequence of application logic (not just user clicks), replace avoids polluting history with transient/redirect states. Disadvantages: useHistory is removed entirely in React Router v6+, requiring a migration; navigating inside render (rather than an effect/handler) can cause React warnings and unpredictable behavior.",
      commonMistakes: [
        "Interview trap: using push for a post-login redirect, leaving a stale, no-longer-relevant login page in the back-button history that redirects the user right back to the app when pressed",
        "Calling navigate()/history.push() directly in the render body instead of inside an event handler or useEffect, causing 'Cannot update a component while rendering a different component' warnings",
        "Continuing to use useHistory after upgrading to React Router v6+, where the hook no longer exists",
        "Forgetting to guard a conditional navigate call in an effect, causing an infinite redirect loop",
        "Encoding sensitive or large data into the navigate state expecting it to persist across a full page refresh (state is lost on refresh, unlike URL params)",
        "Not distinguishing when push vs replace is semantically correct for a given navigation"
      ],
      followUpQuestions: [
        "What's the difference between history.push and history.replace?",
        "Why was useHistory replaced by useNavigate in React Router v6?",
        "Why shouldn't you call navigate() directly in a component's render body?",
        "How would you preserve the originally intended destination through a login redirect?",
        "Does navigation state survive a full page refresh?"
      ],
      relatedTopics: ["useNavigate", "React Router v6 migration", "useLocation", "redirect patterns", "browser history stack"]
    }
  },
  {
    detail: {
      id: "reactx1-38",
      questionNumber: "REACTX1-038",
      title: "Accessing Route Information with useLocation",
      difficulty: "Medium",
      companies: ["Meta", "Netflix", "Adobe", "Flipkart"],
      frequency: 3,
      category: "Navigation",
      part: "React Fundamentals",
      concepts: ["useLocation", "pathname", "search", "location state", "route change effects"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does the useLocation hook help in accessing route information?"
    },
    answer: {
      expectedAnswer: "useLocation() returns the current location object — `{ pathname, search, hash, state, key }` — describing exactly where the app is currently routed, and it triggers a re-render of the calling component whenever the location changes, making it useful for reading the current path, query string, or any custom state passed via navigate/Link.",
      deepExplanation: "Unlike useParams (which extracts named dynamic segments matched against a specific Route's path pattern) or useSearchParams (a convenience wrapper specifically for the query string), useLocation gives the raw, complete picture of the current URL plus any non-URL `state` payload that was passed alongside a programmatic navigation or a Link's `state` prop — useful for things like showing a success banner only when arriving from a specific action, without encoding that flag into the URL itself. Because it re-renders on every location change, it's commonly used in effects that need to run logic whenever the route changes generally (e.g. sending a page-view analytics event, scrolling to top on navigation) regardless of which specific route matched. `location.key` is a unique identifier per navigation entry, useful for resetting component state (e.g. as a React `key` on a wrapping element) precisely when the route changes.\n\n```jsx\nfunction PageViewTracker() {\n  const location = useLocation();\n  useEffect(() => {\n    analytics.trackPageView(location.pathname + location.search);\n  }, [location]);\n  return null;\n}\n\n// Reading state passed via navigate\nconst location = useLocation();\nconst justLoggedIn = location.state?.from === 'login';\n```",
      productionExample: "Analytics page-view tracking, scroll-to-top-on-navigation behavior, and conditionally showing a 'redirected from' banner (e.g. after an auth redirect) are common production uses of useLocation, typically implemented as a small always-mounted component near the router root.",
      bestPractices: [
        "Use useLocation for cross-cutting, route-change-driven side effects (analytics, scroll reset) rather than route-specific logic",
        "Prefer useParams/useSearchParams for their specific, narrower purposes rather than manually parsing location.pathname/search",
        "Guard access to location.state with optional chaining since it can be undefined on direct navigation/refresh",
        "Use location.key as a React key when you need to force-remount a subtree on every route change",
        "Don't rely on location.state surviving a page refresh — it's only available for in-app navigations",
        "Keep pageview-tracking or route-change effects in one centralized component rather than duplicating them per route"
      ],
      tradeOffs: "Advantages: gives full route context in one hook, re-renders reliably on any navigation, supports passing arbitrary non-URL state between routes. Disadvantages: state is ephemeral and lost on refresh/direct navigation, requiring careful handling of the undefined case; using it for logic better served by useParams/useSearchParams adds unnecessary manual parsing.",
      commonMistakes: [
        "Interview trap: reading location.state without guarding for undefined, and having the app crash or misbehave when the route is reached via a direct URL/refresh instead of an in-app navigation that set state",
        "Manually parsing location.search with string methods instead of using useSearchParams/URLSearchParams",
        "Forgetting an effect keyed on the full location object re-runs on any change (path OR query OR hash), which may be broader than intended",
        "Assuming location.state persists across a full browser refresh",
        "Not using location.key when a subtree genuinely needs to fully reset/remount on each navigation",
        "Duplicating page-view tracking logic per route instead of centralizing it in one location-driven effect"
      ],
      followUpQuestions: [
        "How is location.state different from a route or query parameter?",
        "Why is location.state undefined after a page refresh?",
        "How would you implement scroll-to-top-on-navigation using useLocation?",
        "What's the purpose of location.key?",
        "When would an effect dependent on the full location object re-run versus one dependent only on pathname?"
      ],
      relatedTopics: ["useParams", "useSearchParams", "navigate state", "analytics tracking", "route change effects"]
    }
  },
  {
    detail: {
      id: "reactx1-39",
      questionNumber: "REACTX1-039",
      title: "Creating and Consuming Context",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Netflix"],
      frequency: 4,
      category: "Context API",
      part: "React Fundamentals",
      concepts: ["createContext", "Provider", "Consumer", "useContext", "default value"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you create and consume context in React?"
    },
    answer: {
      expectedAnswer: "You create a context object with `const MyContext = createContext(defaultValue)`, wrap the part of the tree that should share data in `<MyContext.Provider value={...}>`, and consume it in any descendant with the `useContext(MyContext)` hook (or the older `<MyContext.Consumer>` render-prop for class components).",
      deepExplanation: "`createContext(defaultValue)` returns an object with `.Provider` and `.Consumer` properties; the `defaultValue` is only used by a component that calls useContext without any matching Provider above it in the tree — it's a fallback, not an initial value that a Provider inherits. The Provider's `value` prop is what every descendant consuming that context actually receives; when it changes (by reference), every consumer re-renders. Class components can't call useContext (hooks are function-only), so they consume context via `static contextType = MyContext` (single context only) followed by `this.context`, or the `<MyContext.Consumer>{value => ...}</MyContext.Consumer>` render-prop pattern for consuming multiple contexts. It's common to wrap the Provider and a custom consuming hook together in one module (e.g. a `ThemeProvider` component plus a `useTheme()` hook that calls useContext internally and throws a clear error if used outside the Provider), giving a cleaner, safer public API than exposing the raw context object.\n\n```jsx\nconst ThemeContext = createContext(undefined);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction useTheme() {\n  const ctx = useContext(ThemeContext);\n  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');\n  return ctx;\n}\n```",
      productionExample: "Theme, authenticated user session, locale/i18n, and feature-flag context are standard production examples, typically each wrapped in its own Provider + custom hook pair rather than one monolithic app-wide context.",
      bestPractices: [
        "Wrap createContext + Provider + a custom consuming hook together as one cohesive module",
        "Throw a clear error from the custom hook when used outside its Provider instead of returning the default value silently",
        "Keep each context focused on one concern rather than one giant global context",
        "Memoize the Provider's value to avoid unnecessary consumer re-renders",
        "Only pass createContext a default value that makes sense as a true fallback, or explicitly use undefined and guard against it",
        "Avoid exposing the raw context object publicly if a custom hook can enforce correct usage instead"
      ],
      tradeOffs: "Advantages: eliminates prop drilling, works with any nesting depth, integrates cleanly with hooks via useContext. Disadvantages: every consumer re-renders on any value change regardless of which part it uses; class components need the older, more limited contextType/Consumer APIs; overusing context for frequently changing data hurts performance versus a dedicated state library.",
      commonMistakes: [
        "Interview trap: assuming createContext's default value acts as an initial shared value used by a Provider — it's only used when there's no Provider above the consumer at all",
        "Not guarding the custom consuming hook against being used outside its Provider, leading to silent bugs from the default value being used unexpectedly",
        "Creating a new value object literal on every Provider render without memoization, causing unnecessary consumer re-renders",
        "Using static contextType to consume more than one context in a class component (it only supports a single context)",
        "Making one giant context for the whole app instead of splitting by concern",
        "Forgetting Consumer's render-prop child must be a function, not a plain element"
      ],
      followUpQuestions: [
        "When is a context's default value actually used?",
        "How would you enforce that a custom hook is only used within its Provider?",
        "How do class components consume context differently from function components?",
        "How would you avoid unnecessary consumer re-renders from a Provider's value?",
        "Why might you split one large context into several smaller ones?"
      ],
      relatedTopics: ["useContext", "Provider pattern", "custom hooks", "prop drilling", "contextType"]
    }
  },
  {
    detail: {
      id: "reactx1-40",
      questionNumber: "REACTX1-040",
      title: "How useContext Simplifies Context Consumption",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Uber", "Stripe"],
      frequency: 4,
      category: "Context API",
      part: "React Fundamentals",
      concepts: ["useContext", "Context.Consumer", "render props elimination", "hook-based consumption"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does the useContext hook simplify accessing context values?"
    },
    answer: {
      expectedAnswer: "useContext(MyContext) lets a function component read a context's current value with a single hook call, replacing the older `<MyContext.Consumer>{value => (...)}</MyContext.Consumer>` render-prop pattern, which required an extra layer of JSX nesting and a function body just to access the value. It also composes naturally with other hooks and lets a component consume several different contexts side by side without nested Consumer wrapping.",
      deepExplanation: "Before hooks, consuming context in a function component required either the Context.Consumer render-prop pattern or converting to a class component with `static contextType`, both of which are more verbose and, in the multi-context case, force deeply nested Consumer wrappers (`<A.Consumer>{a => <B.Consumer>{b => (...)}</B.Consumer>}</A.Consumer>`) purely to read a couple of values. useContext flattens all of that into plain variable assignments at the top of the function body, exactly like any other hook, and can be called multiple times for multiple different contexts without any nesting. It subscribes the calling component to that context specifically, so it re-renders whenever the nearest matching Provider's value changes — same underlying subscription mechanism as Consumer, just exposed through a much simpler API.\n\n```jsx\n// Before: Consumer render-prop nesting\n<ThemeContext.Consumer>\n  {theme => (\n    <UserContext.Consumer>\n      {user => <Profile theme={theme} user={user} />}\n    </UserContext.Consumer>\n  )}\n</ThemeContext.Consumer>\n\n// After: useContext\nfunction Profile() {\n  const theme = useContext(ThemeContext);\n  const user = useContext(UserContext);\n  return <div className={theme}>{user.name}</div>;\n}\n```",
      productionExample: "Modern functional-component codebases universally use useContext instead of Consumer render props; libraries wrap it in a dedicated custom hook (useTheme, useAuth) so consumers never interact with the raw Context object or useContext call directly.",
      bestPractices: [
        "Use useContext directly instead of the Consumer render-prop pattern in any function component",
        "Wrap useContext calls in a dedicated custom hook for a cleaner public API and built-in usage guards",
        "Call useContext at the top level of the component, following the standard rules of hooks",
        "Avoid unnecessarily nesting multiple Consumers when useContext can flatten them into simple variables",
        "Keep consumed contexts narrowly scoped to reduce unrelated re-renders",
        "Remember useContext only works in function components — class components still need contextType/Consumer"
      ],
      tradeOffs: "Advantages: flattens deeply nested Consumer render-prop trees into simple variable declarations, composes cleanly with multiple contexts and other hooks. Disadvantages: only usable in function components (classes still need the older API), and like Consumer, still re-renders on every value change regardless of which part of the value is actually used.",
      commonMistakes: [
        "Interview trap: still reaching for the Context.Consumer render-prop pattern in new function-component code purely out of habit, when useContext is strictly simpler for the same result",
        "Calling useContext conditionally, violating the rules of hooks",
        "Assuming useContext works in class components — it does not, since hooks are function-component-only",
        "Not memoizing derived values computed from a useContext result, recomputing them every render unnecessarily",
        "Consuming an overly broad context via useContext instead of narrowing to a smaller context focused on just the needed data",
        "Forgetting the component still needs a matching Provider above it, or it silently receives the default value"
      ],
      followUpQuestions: [
        "How does useContext compare to the Context.Consumer render-prop pattern for consuming multiple contexts?",
        "Can class components use useContext?",
        "Does useContext avoid re-rendering when unrelated parts of a context value change?",
        "How would you wrap useContext in a custom hook with better guarantees?",
        "What are the rules of hooks that apply to calling useContext?"
      ],
      relatedTopics: ["Context.Consumer", "contextType", "custom hooks", "rules of hooks", "Provider pattern"]
    }
  },
  {
    detail: {
      id: "reactx1-41",
      questionNumber: "REACTX1-041",
      title: "Redux Actions, Reducers, and Store",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      frequency: 4,
      category: "Redux",
      part: "Redux/State",
      concepts: ["actions", "reducers", "store", "dispatch", "unidirectional data flow"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What are actions, reducers, and the store in Redux?"
    },
    answer: {
      expectedAnswer: "An action is a plain object describing what happened (`{ type: 'ADD_TODO', payload: {...} }`); a reducer is a pure function `(state, action) => newState` that computes the next state given the current state and an action, without mutating the current state; the store holds the single source-of-truth state tree, exposes `dispatch(action)` to trigger updates, `getState()` to read the current state, and `subscribe(listener)` to be notified of changes.",
      deepExplanation: "Redux's data flow is strictly unidirectional: a UI event calls `dispatch(action)`, the store passes the current state and that action to the root reducer, the reducer computes and returns a new state object (never mutating the old one, so equality checks work for detecting changes), the store replaces its internal state with that result, and every subscribed listener (including React bindings like useSelector) is notified so connected components can re-render with the new state. Real apps typically compose many small reducers with `combineReducers`, each owning one slice of the overall state tree, keyed by that slice's name. Actions commonly follow the Flux Standard Action shape (`type`, `payload`, optionally `error`/`meta`), and are often created via action creator functions rather than written as raw object literals inline for maintainability and typing. Redux Toolkit (the now-standard way to write Redux) wraps createSlice around this, generating action creators and using Immer internally so reducers can be written with 'mutating' syntax that's actually translated into safe immutable updates.\n\n```jsx\n// Action\nconst addTodo = (text) => ({ type: 'ADD_TODO', payload: { text } });\n\n// Reducer\nfunction todosReducer(state = [], action) {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return [...state, { text: action.payload.text, done: false }];\n    default:\n      return state;\n  }\n}\n\n// Store\nconst store = createStore(todosReducer);\nstore.dispatch(addTodo('Buy milk'));\n```",
      productionExample: "Large enterprise apps with complex, cross-feature shared state (e-commerce carts, dashboards, collaborative editing tools) use Redux (typically via Redux Toolkit) to centralize state transitions in a predictable, testable, and debuggable way, often paired with the Redux DevTools extension for time-travel debugging.",
      bestPractices: [
        "Use Redux Toolkit's createSlice instead of hand-writing action types/creators/reducers",
        "Keep reducers pure — no API calls, timers, or randomness inside them",
        "Normalize complex nested state (entities keyed by id) rather than deeply nested structures",
        "Use combineReducers (or createSlice's built-in slicing) to keep each reducer focused on one concern",
        "Handle async logic (API calls) in thunks/middleware, not inside reducers",
        "Only put genuinely shared, cross-component state in Redux — keep local UI state in component state"
      ],
      tradeOffs: "Advantages: single predictable source of truth, pure reducers are easy to test and reason about, time-travel debugging via DevTools, well-established patterns for large teams. Disadvantages: more boilerplate and ceremony than local state or Context for simple cases (though Redux Toolkit reduces this significantly); requires understanding several new concepts (actions, reducers, middleware, selectors) before being productive.",
      commonMistakes: [
        "Interview trap: mutating the state argument directly inside a reducer instead of returning a new object — this breaks Redux's ability to detect changes via reference equality (unless using Redux Toolkit's Immer-powered createSlice, which specifically allows 'mutating' syntax safely)",
        "Performing side effects (API calls, dispatching other actions asynchronously) directly inside a reducer instead of in middleware/thunks",
        "Storing derived data in Redux state instead of computing it via selectors",
        "Forgetting a reducer must return the current state unchanged for unrecognized action types (the default case)",
        "Putting every piece of state in Redux instead of keeping genuinely local UI state in component state",
        "Not memoizing selectors (e.g. with reselect) for expensive derived computations, recomputing them on every state change"
      ],
      followUpQuestions: [
        "Why must reducers be pure functions?",
        "How does Redux Toolkit's createSlice let you write 'mutating' code safely?",
        "Where should asynchronous logic like API calls live in a Redux app?",
        "How would you normalize a deeply nested state shape in Redux?",
        "What state should stay local to a component instead of living in Redux?"
      ],
      relatedTopics: ["Redux Toolkit", "combineReducers", "Redux middleware", "thunks", "reselect", "normalized state"]
    }
  },
  {
    detail: {
      id: "reactx1-42",
      questionNumber: "REACTX1-042",
      title: "Connecting Components with connect()",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Adobe", "Flipkart"],
      frequency: 4,
      category: "Redux",
      part: "Redux/State",
      concepts: ["connect()", "mapStateToProps", "mapDispatchToProps", "react-redux", "useSelector/useDispatch"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you connect a React component to Redux using the connect function?"
    },
    answer: {
      expectedAnswer: "`connect(mapStateToProps, mapDispatchToProps)(Component)` from react-redux is a HOC that subscribes to the store, computes props from the current state via `mapStateToProps(state)`, wraps action creators as dispatch-ready callbacks via `mapDispatchToProps`, and injects both alongside the component's own props into the wrapped component — re-rendering it whenever the relevant slice of state changes. Modern code typically uses the `useSelector`/`useDispatch` hooks instead, which achieve the same result without a HOC.",
      deepExplanation: "`mapStateToProps(state, ownProps)` returns a plain object of props derived from the Redux state, and connect subscribes to the store so that on every dispatch, it re-runs mapStateToProps and does a shallow comparison of the result against the previous props — only re-rendering the wrapped component if something actually changed, which is a built-in performance optimization connect provides automatically. `mapDispatchToProps` can be an object of action creators (auto-wrapped in dispatch calls) or a function receiving `dispatch` directly, giving the wrapped component pre-bound dispatch functions as props instead of needing to call `store.dispatch(actionCreator())` manually. `useSelector(selector)` and `useDispatch()` provide the equivalent hooks-based API: useSelector subscribes to just the piece of state the selector returns (with the same automatic shallow-equality re-render optimization, and support for a custom equality function), and useDispatch simply returns the store's dispatch function directly for calling with any action.\n\n```jsx\n// connect() HOC style\nconst mapStateToProps = (state) => ({ count: state.counter.value });\nconst mapDispatchToProps = { increment };\nexport default connect(mapStateToProps, mapDispatchToProps)(Counter);\n\n// Modern hooks equivalent\nfunction Counter() {\n  const count = useSelector(state => state.counter.value);\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch(increment())}>{count}</button>;\n}\n```",
      productionExample: "Large legacy Redux codebases still contain many connect()-wrapped class and function components; new feature code in the same codebases typically uses useSelector/useDispatch instead, with both patterns coexisting safely since they talk to the same underlying store.",
      bestPractices: [
        "Prefer useSelector/useDispatch for new code over connect() unless working within an existing class-component codebase",
        "Select only the specific slice of state a component needs in mapStateToProps/useSelector, not the entire state tree",
        "Memoize expensive derived selectors with reselect (or useMemo alongside useSelector) to avoid recomputation on every state change",
        "Use the object shorthand for mapDispatchToProps when action creators need no extra logic",
        "Avoid selecting a new object/array reference on every call in useSelector (causes unnecessary re-renders) — return primitive values or memoized derived data",
        "Keep connect/useSelector usage narrowly scoped to components that actually need Redux state, not the whole tree"
      ],
      tradeOffs: "Advantages of connect(): automatic shallow-equality re-render optimization, works with class components, well-established pattern in legacy code. Disadvantages: HOC-based, adds indirection and wrapper components, injected props aren't obvious from the wrapped component's own definition. Advantages of useSelector/useDispatch: no wrapper component, explicit at the call site, works only in function components. Disadvantages: requires careful selector design to avoid returning new references every call, which can cause needless re-renders without an equality function.",
      commonMistakes: [
        "Interview trap: writing a useSelector selector that returns a brand-new object/array literal every call (e.g. `useSelector(state => ({ a: state.a, b: state.b }))`), causing the component to re-render on every store update since the returned reference is always 'new' by default shallow-equality",
        "Selecting the entire state object instead of the specific slice needed, causing unnecessary re-renders on unrelated state changes",
        "Performing side effects inside mapStateToProps or a selector function, which must remain pure",
        "Forgetting mapDispatchToProps as an object automatically wraps each action creator in a dispatch call — manually dispatching again on top of that double-dispatches",
        "Mixing connect() and hooks inconsistently within the same component instead of picking one API",
        "Not memoizing expensive derived selectors, recomputing them on every single state change even when irrelevant slices changed"
      ],
      followUpQuestions: [
        "Why does connect() automatically optimize re-renders via mapStateToProps?",
        "What happens if a useSelector selector returns a new object reference every call?",
        "How would you memoize an expensive derived selector?",
        "What's the difference between the object and function forms of mapDispatchToProps?",
        "Would you introduce connect() in a codebase already using useSelector/useDispatch elsewhere?"
      ],
      relatedTopics: ["useSelector", "useDispatch", "reselect", "mapStateToProps", "react-redux", "shallow equality"]
    }
  },
  {
    detail: {
      id: "reactx1-43",
      questionNumber: "REACTX1-043",
      title: "Handling Form Data in React",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Flipkart"],
      frequency: 5,
      category: "Forms",
      part: "React Fundamentals",
      concepts: ["controlled inputs", "onChange", "form state", "form libraries"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you handle form data in React?"
    },
    answer: {
      expectedAnswer: "The idiomatic approach is controlled inputs: store each field's current value in state, set the input's `value` prop from that state, and update the state in an `onChange` handler on every keystroke — making React state the single source of truth for the form. For larger/complex forms, a library like React Hook Form or Formik manages this bookkeeping (including validation and submission state) more efficiently.",
      deepExplanation: "A controlled input's displayed value is always driven by React state, not by the DOM's own internal input state — every keystroke fires onChange, which updates state, which re-renders the input with the new value, creating a full round-trip on every character. This gives full programmatic control (validation on every keystroke, formatting, conditionally disabling submission) at the cost of a render per keystroke, which for very large forms with many fields can add up; React Hook Form specifically addresses this by keeping most field values in uncontrolled refs internally and only re-rendering on validation/submission, trading some of the 'always in sync' convenience for significantly better performance on large forms. A single onChange handler is commonly shared across multiple fields by keying off `event.target.name` and updating one shared state object, rather than writing a separate handler per field.\n\n```jsx\nfunction SignupForm() {\n  const [form, setForm] = useState({ email: '', password: '' });\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setForm(prev => ({ ...prev, [name]: value }));\n  };\n  return (\n    <form onSubmit={e => { e.preventDefault(); submit(form); }}>\n      <input name=\"email\" value={form.email} onChange={handleChange} />\n      <input name=\"password\" type=\"password\" value={form.password} onChange={handleChange} />\n    </form>\n  );\n}\n```",
      productionExample: "Simple forms (login, search bars, short settings forms) are commonly hand-rolled with controlled inputs and useState; larger production forms (checkout flows, multi-step signup, admin data entry) typically use React Hook Form or Formik combined with a schema validation library like Zod or Yup for both performance and maintainability.",
      bestPractices: [
        "Use a single shared onChange handler keyed by input name for forms with many fields",
        "Always call event.preventDefault() in the submit handler to avoid a full page reload",
        "Reach for React Hook Form/Formik once a form grows past a handful of fields or needs complex validation",
        "Pair form state with a schema validation library (Zod, Yup) for consistent client and server-shared validation rules",
        "Debounce expensive validation/async checks (like username availability) rather than running them on every keystroke",
        "Keep form state normalized and serializable so it's easy to submit as a single payload"
      ],
      tradeOffs: "Advantages of controlled inputs: full programmatic control, React state always reflects the true current value, easy to validate/format inline. Disadvantages: a render on every keystroke, which can hurt performance on very large forms; more boilerplate for many fields unless abstracted. Uncontrolled inputs (via refs) trade away that fine-grained control for better performance and less boilerplate, at the cost of needing to read values imperatively (e.g. on submit) rather than always having them in state.",
      commonMistakes: [
        "Interview trap: setting an input's value prop without also providing an onChange handler, making the field a 'read-only' controlled input that can't be typed into (and triggers a React warning)",
        "Forgetting event.preventDefault() in the submit handler, causing an unwanted full page reload",
        "Storing all form fields as separate useState calls instead of one object, causing unwieldy per-field handler duplication",
        "Running expensive synchronous validation on every keystroke instead of debouncing it",
        "Mixing controlled and uncontrolled patterns for the same input (sometimes passing value, sometimes not), causing React's 'a component is changing an uncontrolled input to be controlled' warning",
        "Not resetting form state after a successful submission when appropriate"
      ],
      followUpQuestions: [
        "What warning does React give if you provide a value prop without an onChange handler?",
        "When would you reach for React Hook Form instead of hand-rolled controlled inputs?",
        "How would you handle many form fields without writing a separate handler for each?",
        "How would you debounce expensive validation logic tied to form input?",
        "What's the performance cost of controlled inputs on very large forms?"
      ],
      relatedTopics: ["controlled vs uncontrolled components", "React Hook Form", "Formik", "form validation", "Zod/Yup schema validation"]
    }
  },
  {
    detail: {
      id: "reactx1-44",
      questionNumber: "REACTX1-044",
      title: "Controlled vs Uncontrolled Components",
      difficulty: "Easy",
      companies: ["Google", "Meta", "Amazon", "Microsoft", "Uber"],
      frequency: 5,
      category: "Forms",
      part: "React Fundamentals",
      concepts: ["controlled components", "uncontrolled components", "refs", "defaultValue"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What is the difference between controlled and uncontrolled components in forms?"
    },
    answer: {
      expectedAnswer: "A controlled component's value is fully driven by React state — you set `value` and update it via `onChange`, so React is the single source of truth. An uncontrolled component lets the DOM manage its own internal value; React only reads it imperatively when needed, typically via a `ref` and an initial `defaultValue`, rather than re-rendering on every keystroke.",
      deepExplanation: "With a controlled input, every keystroke triggers onChange, which updates state, which re-renders the input with `value` set from that state — this round-trip is what gives React full programmatic control (instant validation, formatting, conditional disabling) but means a render happens on every character across every field with its own state. With an uncontrolled input, the DOM node itself holds the current value in its normal browser-native way; React sets only an initial `defaultValue` (not `value`) and reads the current value later via a ref (`inputRef.current.value`), typically at submit time — no re-render occurs as the user types, which is significantly cheaper for very large forms. File inputs (`<input type=\"file\">`) must always be uncontrolled, since their value is programmatically read-only in the DOM and can't be set via React's value prop for security reasons. Switching a single input between controlled and uncontrolled across renders (e.g. value going from a real string to undefined) triggers a specific React warning, since the input's fundamental behavior model can't safely change mid-lifecycle.\n\n```jsx\n// Controlled\nfunction Controlled() {\n  const [value, setValue] = useState('');\n  return <input value={value} onChange={e => setValue(e.target.value)} />;\n}\n\n// Uncontrolled\nfunction Uncontrolled() {\n  const ref = useRef(null);\n  const handleSubmit = () => console.log(ref.current.value);\n  return <input ref={ref} defaultValue=\"\" />;\n}\n```",
      productionExample: "Login/search forms with real-time validation or formatting use controlled inputs; large, performance-sensitive forms (React Hook Form under the hood) and simple one-shot forms without live validation needs often use uncontrolled inputs read at submit time for better performance and less boilerplate.",
      bestPractices: [
        "Use controlled inputs when you need the current value for live validation, formatting, or conditional UI",
        "Use uncontrolled inputs (with refs) for large forms or simple one-shot value capture where live re-rendering isn't needed",
        "Always use defaultValue (not value) to set an initial value on an uncontrolled input",
        "Never switch a single input between controlled and uncontrolled across its lifetime",
        "File inputs must always be uncontrolled — read their value via a ref",
        "Consider React Hook Form, which uses uncontrolled inputs internally for performance while still exposing a controlled-feeling API"
      ],
      tradeOffs: "Advantages of controlled: single source of truth, easy live validation/formatting, predictable state. Disadvantages: a render per keystroke, more boilerplate. Advantages of uncontrolled: better performance for large forms, less boilerplate, closer to native DOM behavior. Disadvantages: harder to validate/react to changes in real time, values must be read imperatively rather than always being available in state.",
      commonMistakes: [
        "Interview trap: passing `value={undefined}` initially and a real string later (or vice versa), causing React's 'a component is changing an uncontrolled input to be controlled' warning because the input's behavioral model changed mid-lifecycle",
        "Setting both value and defaultValue on the same input, which is contradictory and only value takes effect while React warns",
        "Trying to set a file input's value programmatically via React's value prop, which the DOM disallows for security reasons",
        "Providing value without onChange, unintentionally making a field impossible to type into",
        "Assuming an uncontrolled input's current value is available without explicitly reading ref.current.value",
        "Mixing controlled and uncontrolled patterns inconsistently across fields in the same form without a clear reason"
      ],
      followUpQuestions: [
        "What warning appears if you switch an input from uncontrolled to controlled mid-lifecycle?",
        "Why must file inputs always be uncontrolled?",
        "How does React Hook Form achieve good performance while still supporting validation?",
        "When would you choose an uncontrolled input over a controlled one?",
        "How would you read the current value of an uncontrolled input at submit time?"
      ],
      relatedTopics: ["useRef", "defaultValue", "React Hook Form", "form validation", "DOM input behavior"]
    }
  },
  {
    detail: {
      id: "reactx1-45",
      questionNumber: "REACTX1-045",
      title: "Data Fetching with useEffect",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      frequency: 5,
      category: "Side Effects",
      part: "Advanced React",
      concepts: ["useEffect", "data fetching", "race conditions", "loading/error state", "AbortController"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you use useEffect for data fetching in React?"
    },
    answer: {
      expectedAnswer: "You call the fetch inside `useEffect(() => {...}, [dep])`, updating loading/data/error state as the request progresses, with the dependency array (e.g. `[userId]`) controlling when a refetch happens. Since `useEffect`'s callback can't itself be async, you define an async function inside the effect and call it, and you guard against race conditions/setting state after unmount using a cancellation flag or AbortController.",
      deepExplanation: "useEffect's callback must return either nothing or a cleanup function — never a Promise — so making the callback itself `async` breaks that contract (an async function always returns a Promise). The standard pattern defines an inner async function and invokes it immediately. The two failure modes to guard against are: (1) setting state after the component has unmounted (fixed with a cancellation flag checked before each setState, or by aborting the fetch via AbortController's signal, which also actually cancels the underlying network request rather than just ignoring its result), and (2) race conditions where a fast-changing dependency (e.g. rapid search input) fires multiple overlapping requests and an older, slower response resolves after a newer one, overwriting the correct data with stale data — solved the same way, by checking a cancellation flag/aborting before applying results. Modern codebases increasingly reach for a dedicated data-fetching library (TanStack Query, SWR, RTK Query) instead of hand-rolling this in useEffect, since these solve caching, deduplication, race conditions, and refetch-on-focus/reconnect out of the box.\n\n```jsx\nfunction UserProfile({ userId }) {\n  const [state, setState] = useState({ data: null, loading: true, error: null });\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setState(s => ({ ...s, loading: true }));\n    fetch(`/api/users/${userId}`, { signal: controller.signal })\n      .then(res => res.json())\n      .then(data => setState({ data, loading: false, error: null }))\n      .catch(err => {\n        if (err.name !== 'AbortError') setState({ data: null, loading: false, error: err });\n      });\n    return () => controller.abort();\n  }, [userId]);\n\n  if (state.loading) return <Spinner />;\n  if (state.error) return <ErrorMessage error={state.error} />;\n  return <div>{state.data.name}</div>;\n}\n```",
      productionExample: "Nearly every detail-page/component that fetches data on mount or when an id prop changes used this pattern before dedicated fetching libraries became standard; production apps today largely migrate this logic to TanStack Query/SWR, which wrap the same core useEffect-based approach with caching, deduplication, and background refetching built in.",
      bestPractices: [
        "Never make the useEffect callback itself async — define and call an inner async function instead",
        "Always guard against setting state after unmount or after a stale request resolves, via AbortController or a cancellation flag",
        "Include every value the fetch depends on in the dependency array (e.g. userId)",
        "Track loading and error state explicitly, not just the data",
        "Prefer a dedicated data-fetching library (TanStack Query, SWR) over hand-rolled useEffect fetching for production apps at scale",
        "Avoid fetch waterfalls by fetching independent data in parallel rather than sequentially in nested effects"
      ],
      tradeOffs: "Advantages: no extra dependency needed, full control over the exact fetching logic, works for simple one-off cases. Disadvantages: race conditions, cancellation, caching, and deduplication must all be hand-rolled and are easy to get subtly wrong; doesn't share cached results across components without extra plumbing (Context or a library).",
      commonMistakes: [
        "Interview trap: making the useEffect callback directly `async` (`useEffect(async () => {...}, [])`), which is invalid since React expects either nothing or a cleanup function returned, not a Promise",
        "Not handling the race condition where a fast-changing dependency triggers overlapping requests and an older response overwrites a newer one",
        "Forgetting to guard against setState calls after the component has unmounted, causing warnings/leaks",
        "Fetching in the component body directly instead of inside useEffect, causing an infinite render loop",
        "Not resetting loading/error state when the dependency changes and a new fetch begins",
        "Hand-rolling caching/deduplication logic that a library like TanStack Query already solves robustly"
      ],
      followUpQuestions: [
        "Why can't the useEffect callback itself be an async function?",
        "How would you prevent a race condition when the fetch dependency changes rapidly?",
        "How does AbortController help beyond just ignoring a stale response?",
        "When would you introduce TanStack Query/SWR instead of hand-rolled useEffect fetching?",
        "How would you avoid a fetch waterfall for two independent pieces of data?"
      ],
      relatedTopics: ["AbortController", "race conditions", "TanStack Query", "SWR", "loading/error state", "cleanup functions"]
    }
  },
  {
    detail: {
      id: "reactx1-46",
      questionNumber: "REACTX1-046",
      title: "Cleanup Importance in useEffect",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Stripe", "Netflix"],
      frequency: 5,
      category: "Side Effects",
      part: "Advanced React",
      concepts: ["useEffect cleanup", "memory leaks", "stale closures", "subscriptions", "Strict Mode double-invoke"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What is the importance of cleanup in useEffect, and how do you implement it?"
    },
    answer: {
      expectedAnswer: "Cleanup runs the function returned from an effect's callback, executed right before the effect re-runs (when a dependency changes) and again on unmount — it's essential for undoing anything with an ongoing lifetime (subscriptions, timers, listeners) so the previous effect's resources don't leak or keep acting on stale data after the component moves on.",
      deepExplanation: "Every time a dependency changes, React first calls the *previous* effect's cleanup function (if any), then runs the new effect body — this ordering matters because it guarantees exactly one active 'version' of the effect's resources exists at a time (e.g. exactly one active subscription for the current userId, not an accumulating pile of stale ones for every previous userId the component ever had). On unmount, the last cleanup runs one final time. Since React 18's Strict Mode in development, effects are deliberately mounted, cleaned up, and re-mounted immediately once on initial mount specifically to surface effects that aren't properly idempotent/cleanup-safe — an effect that leaks or breaks under this double-invocation almost certainly has a real cleanup bug that would eventually bite in production (e.g. under fast remounts from Suspense/concurrent features), even though it looks like 'just a dev-mode quirk'.\n\n```jsx\nuseEffect(() => {\n  const subscription = chatRoom.subscribe(roomId, handleMessage);\n  return () => subscription.unsubscribe(); // prevents duplicate/leaked subscriptions\n}, [roomId]);\n```",
      productionExample: "WebSocket/chat room subscriptions, window/document event listeners, setInterval polling, and IntersectionObserver/ResizeObserver instances all rely on effect cleanup in production to avoid duplicate listeners piling up across re-renders and memory leaking after unmount.",
      bestPractices: [
        "Return a cleanup function for anything with an ongoing lifetime: subscriptions, timers, listeners, observers",
        "Treat React 18 Strict Mode's double-invoke in development as a real bug signal, not something to suppress",
        "Make effects idempotent — safe to run, clean up, and run again without side effects accumulating",
        "Match exactly what was set up in the effect body when tearing it down (same listener reference, same subscription object)",
        "Use a cancellation flag or AbortController for async work inside effects that lack a natural 'unsubscribe' API",
        "Keep effects narrowly scoped so their cleanup logic stays simple and easy to verify is complete"
      ],
      tradeOffs: "Advantages: prevents leaked subscriptions/listeners and stale-data bugs, keeps exactly one active version of an effect's resources at a time. Disadvantages: easy to forget or get subtly wrong (mismatched listener references, missing async guards); Strict Mode's double-invocation in development can be confusing if a team doesn't understand why it exists.",
      commonMistakes: [
        "Interview trap: forgetting to return a cleanup function for a subscription/listener set up in useEffect, causing duplicate listeners to accumulate on every re-run and a leaked listener referencing a stale closure after unmount",
        "Suppressing or 'fixing' React 18 Strict Mode's double-invoke behavior instead of treating it as a signal of a real missing-cleanup bug",
        "Removing a listener with a different function reference than the one that was added, so removeEventListener silently does nothing",
        "Not cancelling in-flight async work in cleanup, letting a stale response's setState call fire after the effect has already moved on",
        "Assuming cleanup only runs on unmount — it also runs before every re-run of the effect when dependencies change",
        "Writing effect logic that isn't idempotent, so running it twice back-to-back (as Strict Mode does) produces incorrect duplicated state"
      ],
      followUpQuestions: [
        "When exactly does an effect's cleanup function run, relative to re-renders and unmount?",
        "Why does React 18 Strict Mode intentionally double-invoke effects in development?",
        "What happens if you forget to remove a listener that was added in the effect?",
        "How would you clean up an in-flight async fetch inside an effect?",
        "What does it mean for an effect to be 'idempotent', and why does that matter?"
      ],
      relatedTopics: ["React 18 Strict Mode", "memory leaks", "AbortController", "subscriptions", "componentWillUnmount", "idempotency"]
    }
  },
  {
    detail: {
      id: "reactx1-47",
      questionNumber: "REACTX1-047",
      title: "AJAX Requests with the Fetch API",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Zoho", "Flipkart"],
      frequency: 3,
      category: "AJAX Requests",
      part: "React Fundamentals",
      concepts: ["Fetch API", "Promises", "async/await", "error handling"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you perform AJAX requests using the Fetch API in React?"
    },
    answer: {
      expectedAnswer: "`fetch(url)` returns a Promise that resolves to a Response object once headers arrive; you call `.json()` (or `.text()`, `.blob()`, etc.) — itself another Promise — to parse the body, and chain `.then()`/`.catch()` or use `async/await` inside a `useEffect` (or an event handler) to trigger the request and update component state with the result.",
      deepExplanation: "A crucial Fetch API gotcha: the fetch Promise only rejects on network failures (DNS errors, no connectivity, CORS blocking) — it does NOT reject for HTTP error status codes like 404 or 500. You must explicitly check `response.ok` (or `response.status`) and throw an error yourself if the request wasn't successful, otherwise a failed request silently 'succeeds' as far as your `.then()` chain is concerned and you'll try to parse an error page's body as JSON. Fetch also doesn't automatically serialize a request body or set Content-Type for you — POST/PUT requests need an explicit `method`, `headers: {'Content-Type': 'application/json'}`, and `body: JSON.stringify(data)`. For cancellation, an AbortController's signal can be passed in the options and used to cancel the request if the component unmounts or the dependency changes before it resolves.\n\n```jsx\nasync function fetchUser(id, signal) {\n  const response = await fetch(`/api/users/${id}`, { signal });\n  if (!response.ok) {\n    throw new Error(`Request failed with status ${response.status}`);\n  }\n  return response.json();\n}\n\nuseEffect(() => {\n  const controller = new AbortController();\n  fetchUser(userId, controller.signal)\n    .then(setUser)\n    .catch(err => { if (err.name !== 'AbortError') setError(err); });\n  return () => controller.abort();\n}, [userId]);\n```",
      productionExample: "Fetch is used directly in smaller apps or wrapped in a thin API-client abstraction in larger ones; production apps commonly layer a data-fetching library (TanStack Query, SWR) or a typed API client (generated from OpenAPI/GraphQL schemas) on top of raw fetch calls for caching, retries, and consistent error handling.",
      bestPractices: [
        "Always check response.ok before parsing the body, since fetch doesn't reject on HTTP error status codes",
        "Set Content-Type and stringify the body explicitly for POST/PUT/PATCH requests",
        "Use AbortController to support cancellation on unmount or dependency change",
        "Centralize error handling and base URL/headers configuration in a small API client wrapper instead of duplicating fetch calls everywhere",
        "Handle network errors and HTTP errors distinctly if the UI needs to respond to them differently",
        "Parse the response body only once — response.json() consumes the stream and can't be called twice"
      ],
      tradeOffs: "Advantages: built into the browser/Node with no extra dependency, Promise-based and works naturally with async/await, flexible low-level control. Disadvantages: doesn't reject on HTTP error codes (a common source of bugs), no built-in request/response interceptors, timeout, or automatic retries — all of which libraries like Axios or a fetch wrapper provide out of the box.",
      commonMistakes: [
        "Interview trap: assuming fetch's Promise rejects for a 404/500 response — it only rejects for network-level failures, so error handling requires an explicit response.ok check and manual throw",
        "Forgetting to set Content-Type and stringify the body on POST/PUT requests, sending a malformed request",
        "Calling response.json() more than once on the same response, which throws since the body stream is already consumed",
        "Not handling AbortError separately in the catch block, treating an intentional cancellation as a real error",
        "Forgetting fetch has no built-in timeout — a hung request will wait indefinitely unless AbortController is used with a timeout",
        "Not URL-encoding query parameters manually when building the request URL"
      ],
      followUpQuestions: [
        "Does the fetch Promise reject for a 404 or 500 response?",
        "How would you add a timeout to a fetch request?",
        "How do you send a JSON POST body with fetch?",
        "How would you cancel a fetch request when a component unmounts?",
        "What are the advantages of using Axios or a fetch wrapper instead of raw fetch?"
      ],
      relatedTopics: ["Axios", "AbortController", "async/await", "TanStack Query", "response.ok"]
    }
  },
  {
    detail: {
      id: "reactx1-48",
      questionNumber: "REACTX1-048",
      title: "Axios vs Fetch API",
      difficulty: "Easy",
      companies: ["Meta", "Netflix", "Uber", "Adobe"],
      frequency: 3,
      category: "AJAX Requests",
      part: "React Fundamentals",
      concepts: ["Axios", "Fetch API", "interceptors", "automatic JSON transform", "request cancellation"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How does Axios differ from Fetch, and when would you use it?"
    },
    answer: {
      expectedAnswer: "Axios is a third-party HTTP client library built on top of XMLHttpRequest/fetch that automatically parses JSON responses, rejects its Promise on non-2xx HTTP status codes (unlike fetch), and provides built-in request/response interceptors, timeout support, and automatic request cancellation via a token/AbortController integration — all of which fetch requires manual code to replicate. You'd reach for Axios when you want that convenience/consistency without hand-rolling a fetch wrapper, or need interceptors for things like attaching an auth token to every request globally.",
      deepExplanation: "Fetch is a native browser/Node API requiring no dependency but giving you low-level control with several manual responsibilities: checking response.ok yourself, calling .json() explicitly, setting headers/serializing the body yourself, and implementing timeout/cancellation via AbortController. Axios wraps all of this: `axios.get(url)` automatically parses JSON into `response.data`, throws (rejects) automatically for non-2xx statuses (accessible on the caught error's `error.response`), lets you configure a `timeout` directly, and supports request/response interceptors — functions that run on every outgoing request or incoming response, commonly used to attach an Authorization header globally or centrally handle 401s by redirecting to login. Both support cancellation, though Axios's API historically used its own CancelToken before also adopting the standard AbortController signal.\n\n```jsx\n// Axios\nimport axios from 'axios';\nconst api = axios.create({ baseURL: '/api', timeout: 5000 });\napi.interceptors.request.use(config => {\n  config.headers.Authorization = `Bearer ${getToken()}`;\n  return config;\n});\ntry {\n  const { data } = await api.get(`/users/${id}`);\n} catch (err) {\n  console.error(err.response?.status); // available automatically\n}\n```",
      productionExample: "Production apps with many API calls and cross-cutting request concerns (auth headers, centralized 401 handling, request/response logging) commonly standardize on an Axios instance configured once with interceptors; apps preferring zero extra dependencies, or already using a typed fetch-based client generated from an API schema, stick with fetch.",
      bestPractices: [
        "Configure a single Axios instance (baseURL, timeout, interceptors) rather than importing the raw axios object everywhere",
        "Use interceptors to centralize cross-cutting concerns like auth headers and global error handling",
        "Don't add Axios purely out of habit if the app is small and fetch's manual boilerplate is minimal",
        "Handle Axios errors via error.response (HTTP errors) versus error.request (no response received) versus a generic error for setup issues",
        "Use AbortController (or Axios's signal support) consistently for cancellation across both approaches",
        "Keep API client configuration centralized regardless of which library is used"
      ],
      tradeOffs: "Advantages of Axios: automatic JSON parsing, automatic HTTP-error rejection, built-in interceptors/timeout/cancellation, consistent cross-browser/Node behavior. Disadvantages: an added dependency and bundle size cost. Advantages of fetch: zero dependency, native browser/Node support, full low-level control. Disadvantages: more manual boilerplate for common needs (error checking, timeout, interceсвоceptor-like behavior must be hand-rolled).",
      commonMistakes: [
        "Interview trap: assuming fetch behaves like Axios and rejects automatically on a 404/500 — it does not, this is one of the most commonly confused differences between the two",
        "Adding Axios as a dependency purely out of habit for a tiny app where fetch's extra boilerplate would be trivial",
        "Not centralizing Axios configuration (baseURL, interceptors) and instead repeating auth header logic in every call site",
        "Forgetting Axios errors distinguish error.response (server responded with an error status) from error.request (no response received) from a generic setup error",
        "Assuming Axios and fetch handle request cancellation identically without checking the current API for each",
        "Not setting a timeout with either library, allowing a hung request to wait indefinitely by default"
      ],
      followUpQuestions: [
        "Does Axios automatically reject on a 404 or 500 response, unlike fetch?",
        "What are interceptors used for in Axios?",
        "How would you replicate Axios's automatic JSON parsing and HTTP-error rejection using fetch?",
        "How does Axios distinguish network errors from HTTP error responses?",
        "When would you choose fetch over Axios despite its extra manual boilerplate?"
      ],
      relatedTopics: ["Fetch API", "interceptors", "TanStack Query", "AbortController", "HTTP client configuration"]
    }
  },
  {
    detail: {
      id: "reactx1-49",
      questionNumber: "REACTX1-049",
      title: "Error Boundaries with componentDidCatch",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Stripe"],
      frequency: 4,
      category: "Error Boundaries",
      part: "Advanced React",
      concepts: ["componentDidCatch", "getDerivedStateFromError", "error boundaries", "render tree failure isolation"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How do you implement error boundaries using componentDidCatch in class components?"
    },
    answer: {
      expectedAnswer: "A class component implementing `static getDerivedStateFromError(error)` (to update state and trigger a fallback render) and/or `componentDidCatch(error, info)` (to log the error, e.g. to an error-reporting service) becomes an error boundary — any error thrown during rendering, in a lifecycle method, or in a constructor anywhere in its child tree gets caught, and the boundary renders its fallback UI instead of the crashed tree. Critically, this does NOT catch errors in event handlers, async code (setTimeout, promises), server-side rendering, or errors thrown in the error boundary itself.",
      deepExplanation: "getDerivedStateFromError is called during the render phase (it must be a pure static method, no side effects allowed) and its return value updates state, which the boundary then uses to render a fallback instead of children — this is the piece responsible for what the UI shows. componentDidCatch is called during the commit phase, after the fallback has been rendered, and is where actual side effects like logging to Sentry/Bugsnag belong, since it receives both the error and a `componentStack` string identifying exactly where in the component tree it originated. The critical, frequently-missed limitation: error boundaries only catch errors during React's normal rendering/lifecycle/constructor work for their descendant tree — an error thrown inside an onClick handler, inside a setTimeout callback, inside an async function after an await, or during server-side rendering will NOT be caught by any error boundary, because none of those execute within React's render phase; those need their own try/catch or global handlers. There is still no hooks equivalent for implementing an error boundary itself — only class components can define these two lifecycle members — though libraries like react-error-boundary provide a reusable class-based ErrorBoundary component with a function-friendly API around it.\n\n```jsx\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    logErrorToService(error, info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return this.props.fallback;\n    return this.props.children;\n  }\n}\n\n<ErrorBoundary fallback={<ErrorPage />}>\n  <Dashboard />\n</ErrorBoundary>\n```",
      productionExample: "Production apps wrap major route/feature boundaries (e.g. one ErrorBoundary per route, or around a risky third-party widget) so a bug in one part of the UI shows a contained fallback instead of crashing the entire app to a white screen; the caught errors are typically forwarded to an error-monitoring service like Sentry via componentDidCatch.",
      bestPractices: [
        "Place error boundaries at meaningful granularity — around routes or risky isolated features, not just one giant boundary around the whole app",
        "Use getDerivedStateFromError purely to update state for the fallback UI; keep side effects (logging) in componentDidCatch",
        "Always log the error and componentStack to an error-monitoring service in componentDidCatch",
        "Wrap event handlers and async code in explicit try/catch since error boundaries won't catch those",
        "Use a library like react-error-boundary for a reusable, function-component-friendly wrapper instead of reimplementing the class each time",
        "Provide a meaningful, actionable fallback UI rather than a generic blank error message"
      ],
      tradeOffs: "Advantages: contains rendering failures to a subtree instead of crashing the whole app, centralizes error logging for render-phase failures, simple to compose around risky sections. Disadvantages: only class components can implement one (no hooks equivalent for the boundary definition itself); doesn't catch event handler or async errors at all, which is a very common source of confusion and unhandled crashes if teams assume broader coverage than actually exists.",
      commonMistakes: [
        "Interview trap: assuming an error boundary catches an error thrown inside an onClick handler or inside a promise/async function — it only catches errors during rendering, lifecycle methods, and constructors, not event handlers or async code",
        "Putting side-effectful logging code in getDerivedStateFromError instead of componentDidCatch, violating its required purity",
        "Wrapping the entire app in a single error boundary, so any failure anywhere blanks the whole UI instead of just the affected section",
        "Assuming a functional component can define an error boundary using hooks — there is still no hook equivalent to getDerivedStateFromError/componentDidCatch",
        "Not logging the componentStack, losing valuable debugging context about exactly where the failure occurred",
        "Forgetting an error boundary won't catch an error it throws itself while rendering its own fallback — that requires a second, outer boundary"
      ],
      followUpQuestions: [
        "What kinds of errors does an error boundary NOT catch?",
        "Why must getDerivedStateFromError stay pure, with side effects only in componentDidCatch?",
        "Why is there still no hooks equivalent for defining an error boundary?",
        "How would you structure error boundaries across a large app for good failure isolation?",
        "How would you catch and handle an error thrown inside an event handler?"
      ],
      relatedTopics: ["getDerivedStateFromError", "react-error-boundary", "Sentry error monitoring", "render phase vs commit phase", "try/catch in event handlers"]
    }
  },
  {
    detail: {
      id: "reactx1-50",
      questionNumber: "REACTX1-050",
      title: "Error Boundaries in Functional Components",
      difficulty: "Hard",
      companies: ["Meta", "Amazon", "Stripe", "Atlassian"],
      frequency: 3,
      category: "Error Boundaries",
      part: "Advanced React",
      concepts: ["react-error-boundary", "class-component requirement", "fallback UI", "resetErrorBoundary"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How do you create an ErrorBoundary component in functional components?"
    },
    answer: {
      expectedAnswer: "You can't implement the error-catching mechanism itself in a functional component — there's no hook equivalent to getDerivedStateFromError/componentDidCatch — so in a hooks-based codebase you use a small library like `react-error-boundary`, which internally implements the required class component but exposes a fully function-component-friendly API: `<ErrorBoundary fallback={...} onError={...}>{children}</ErrorBoundary>`, plus hooks like `useErrorBoundary()` to trigger a boundary from event handler/async code.",
      deepExplanation: "react-error-boundary's `<ErrorBoundary>` wraps the same class-based getDerivedStateFromError/componentDidCatch mechanism under the hood, but exposes props like `FallbackComponent` (or a `fallbackRender` function receiving the error and a `resetErrorBoundary` function), `onError` (for logging), and `onReset` (to run cleanup when the boundary is reset, e.g. clearing bad state before retrying). It also exports `useErrorBoundary()`, a hook usable inside any descendant functional component that lets you manually trigger the nearest boundary's fallback from code error boundaries otherwise wouldn't catch — like an event handler or an async callback — by calling `showBoundary(error)` explicitly, effectively bridging the gap for those uncaught cases. This is the practical, idiomatic way React teams add error boundary behavior to modern hooks-based codebases without hand-writing and maintaining their own class component.\n\n```jsx\nimport { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';\n\nfunction Fallback({ error, resetErrorBoundary }) {\n  return (\n    <div>\n      <p>Something went wrong: {error.message}</p>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  );\n}\n\n<ErrorBoundary FallbackComponent={Fallback} onError={logErrorToService} onReset={() => refetch()}>\n  <Dashboard />\n</ErrorBoundary>\n\n// Bridging an async error into the boundary from inside a descendant\nfunction SaveButton() {\n  const { showBoundary } = useErrorBoundary();\n  const onClick = async () => {\n    try { await save(); } catch (err) { showBoundary(err); }\n  };\n  return <button onClick={onClick}>Save</button>;\n}\n```",
      productionExample: "Most modern hooks-based React apps depend on react-error-boundary (rather than hand-rolling a class) for route-level and feature-level failure isolation, and use its useErrorBoundary hook to funnel async/event-handler errors (which native error boundaries can't catch) into the same fallback UI and error-reporting pipeline.",
      bestPractices: [
        "Use react-error-boundary instead of writing and maintaining a custom class-based boundary",
        "Provide resetErrorBoundary/onReset logic so users can recover without a full page reload",
        "Use useErrorBoundary() to funnel event handler and async errors into the same fallback/logging pipeline",
        "Log errors via the onError prop to your monitoring service",
        "Place boundaries at meaningful granularity, same as with a hand-written class boundary",
        "Reset relevant state (via onReset) so retrying doesn't immediately re-trigger the same failure"
      ],
      tradeOffs: "Advantages: gives a fully function-component-friendly API without hand-maintaining a class, adds a bridge (useErrorBoundary) for the async/event-handler gap native boundaries can't cover, includes reset/retry ergonomics out of the box. Disadvantages: adds a small dependency; still fundamentally implemented as a class under the hood since React itself provides no hook for the underlying mechanism, and manually triggered boundary errors via useErrorBoundary require explicit try/catch wiring at each call site rather than being automatic.",
      commonMistakes: [
        "Interview trap: trying to implement an error boundary purely with hooks (e.g. a try/catch inside a component body or a custom hook) and expecting it to catch rendering errors thrown by children — hooks cannot replicate getDerivedStateFromError/componentDidCatch's render-phase interception",
        "Assuming react-error-boundary or any wrapper magically catches event handler/async errors without explicitly calling showBoundary from useErrorBoundary",
        "Not providing reset/retry logic, forcing users to reload the whole page to recover from a caught error",
        "Placing the FallbackComponent's declaration inline in a way that recreates it every render unnecessarily",
        "Forgetting onReset needs to clear whatever bad state caused the original error, or the same error will just recur immediately",
        "Not logging caught errors at all, losing production visibility into real user-facing crashes"
      ],
      followUpQuestions: [
        "Why can't a plain functional component/hook implement the actual error-catching mechanism itself?",
        "How does react-error-boundary's useErrorBoundary help with errors that native boundaries can't catch?",
        "What's the purpose of the onReset callback?",
        "How would you funnel an async/event-handler error into an error boundary's fallback UI?",
        "What granularity would you choose for placing error boundaries across a large app?"
      ],
      relatedTopics: ["react-error-boundary", "componentDidCatch", "getDerivedStateFromError", "async error handling", "fallback UI design"]
    }
  },
  {
    detail: {
      id: "reactx1-51",
      questionNumber: "REACTX1-051",
      title: "Unit Testing React Components with Jest",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Uber"],
      frequency: 4,
      category: "React Testing",
      part: "Testing",
      concepts: ["Jest", "test runner", "mocking", "snapshot testing", "assertions"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you write unit tests for React components using Jest?"
    },
    answer: {
      expectedAnswer: "Jest is the test runner/assertion framework (test/describe/expect, mocking via jest.fn()/jest.mock(), snapshot testing) that typically pairs with React Testing Library to actually render components and interact with them; a test renders the component, simulates user interaction or asserts on rendered output, and uses expect() matchers to verify the result.",
      deepExplanation: "Jest itself provides the test structure (`describe`/`test`/`it`), assertion matchers (`expect(x).toBe(y)`, `.toEqual()`, `.toHaveBeenCalledWith()`), and a mocking system (`jest.fn()` for spy functions, `jest.mock()` for mocking entire modules like an API client) — but it doesn't know how to render a React component or simulate a browser DOM by itself; that's provided by jsdom (Jest's default test environment, simulating a browser DOM in Node) combined with React Testing Library, which handles actually rendering components into that simulated DOM and querying/interacting with them. A typical test renders the component, uses RTL queries (getByRole, getByText) to find elements, fires user events, and asserts on the resulting DOM state or on mock function calls (e.g. verifying an onSubmit callback was called with the right arguments). Snapshot testing (`expect(tree).toMatchSnapshot()`) captures a serialized render output and fails future test runs if it changes unexpectedly, useful for catching accidental UI regressions but easy to overuse into low-value 'update the snapshot without reading it' habits.\n\n```jsx\nimport { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport LoginForm from './LoginForm';\n\ntest('calls onSubmit with entered credentials', async () => {\n  const handleSubmit = jest.fn();\n  render(<LoginForm onSubmit={handleSubmit} />);\n  await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');\n  await userEvent.type(screen.getByLabelText(/password/i), 'secret');\n  await userEvent.click(screen.getByRole('button', { name: /log in/i }));\n  expect(handleSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'secret' });\n});\n```",
      productionExample: "CI pipelines run Jest (or increasingly Vitest, a faster drop-in-compatible alternative) as part of every pull request, gating merges on passing unit and component tests; production teams typically combine Jest+React Testing Library for component-level tests with a separate end-to-end tool (Cypress/Playwright) for full user-flow coverage.",
      bestPractices: [
        "Test behavior and rendered output from a user's perspective, not internal implementation details",
        "Use jest.fn() to assert a callback prop was called with the expected arguments, rather than reaching into internals",
        "Keep snapshot tests small and intentional rather than snapshotting large trees no one actually reviews on change",
        "Mock external dependencies (API calls, timers) explicitly rather than letting tests hit real network/timing",
        "Use userEvent (not fireEvent) for realistic interaction simulation including focus/hover side effects",
        "Group related tests with describe blocks and use clear, behavior-describing test names"
      ],
      tradeOffs: "Advantages: fast feedback loop, catches regressions before code review/production, integrates directly into CI. Disadvantages: over-mocking can make tests pass while the real integration is broken; snapshot tests can become noise if teams blindly update them without review; testing implementation details instead of behavior makes tests brittle to harmless refactors.",
      commonMistakes: [
        "Interview trap: writing tests that assert on component internal state or implementation details (e.g. checking a class instance's this.state directly) instead of observable rendered output/behavior, making tests break on harmless refactors",
        "Blindly running `jest --updateSnapshot` when a snapshot test fails without reviewing whether the change was actually intentional",
        "Mocking so much of the system that the test no longer verifies real integration behavior",
        "Using fireEvent instead of userEvent for interactions that have real browser side effects (like focus events before typing)",
        "Not resetting mocks between tests (jest.clearAllMocks()), causing state to leak across test cases",
        "Testing every internal helper function individually instead of testing the component's actual observable behavior"
      ],
      followUpQuestions: [
        "What's the difference between Jest and React Testing Library's responsibilities?",
        "Why is snapshot testing sometimes considered low-value if misused?",
        "How would you test that a component correctly calls a callback prop?",
        "What's the difference between fireEvent and userEvent?",
        "How do you mock an API call in a Jest test?"
      ],
      relatedTopics: ["React Testing Library", "jsdom", "mocking", "snapshot testing", "userEvent", "CI pipelines"]
    }
  },
  {
    detail: {
      id: "reactx1-52",
      questionNumber: "REACTX1-052",
      title: "React Testing Library vs Enzyme",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Adobe"],
      frequency: 4,
      category: "React Testing",
      part: "Testing",
      concepts: ["React Testing Library", "Enzyme", "shallow rendering", "user-centric testing", "implementation details"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What is React Testing Library, and how does it differ from Enzyme?"
    },
    answer: {
      expectedAnswer: "React Testing Library (RTL) renders components into a real (jsdom-simulated) DOM and encourages querying/asserting on them the way a user would — by visible text, label, or role — rather than reaching into component internals. Enzyme (older, no longer actively maintained for modern React) supported shallow rendering and direct inspection of component instances/state/props, which encouraged tests coupled to implementation details that break on harmless refactors.",
      deepExplanation: "Enzyme's shallow rendering renders only one level deep, stubbing out child components entirely, and exposes APIs like `.find(Component).state('value')` or `.instance().someMethod()` that let tests directly poke at a component's internal state, props, or call its methods — this made it easy to test implementation details, which is exactly what testing best practice (and RTL's guiding philosophy, 'test the way a user would use the app') advises against, since a test coupled to internals breaks even when a refactor doesn't change any actual observable behavior. RTL deliberately provides no API to access component internals at all — you can only query the actual rendered DOM (`getByRole`, `getByLabelText`, `getByText`) and fire real events (`userEvent.click`), which forces tests to validate what a user would actually see and do, making them far more resilient to internal refactors and, in practice, better indicators of real regressions. Enzyme's shallow rendering and adapter-based approach to hooking into React's internals has also struggled to keep pace with newer React versions (concurrent features, newer hook patterns), which is why RTL is now the de facto standard in the React ecosystem, actively maintained and recommended in React's own documentation.",
      productionExample: "Nearly all modern React codebases starting fresh use React Testing Library (bundled by default with Create React App and most starter templates); legacy codebases predating RTL's dominance may still have substantial Enzyme test suites that teams gradually migrate away from during larger refactors.",
      bestPractices: [
        "Query elements the way a user would locate them: getByRole, getByLabelText, getByText — avoid test-id queries as a first resort",
        "Never reach for component internals (state, instance methods) in tests — RTL intentionally doesn't expose this",
        "Prefer RTL over Enzyme for any new test suite given Enzyme's reduced maintenance and shallow-rendering limitations",
        "Use userEvent for realistic interaction simulation over lower-level fireEvent when possible",
        "Write tests that would still pass after a harmless internal refactor that doesn't change observable behavior",
        "Migrate legacy Enzyme suites incrementally rather than as one large, risky rewrite"
      ],
      tradeOffs: "Advantages of RTL: resilient to internal refactors, encourages accessible, user-centric markup (since queries favor roles/labels), actively maintained and aligned with modern React. Disadvantages: no shallow rendering option, so testing a component fully in isolation from its children requires more mocking effort. Advantages of Enzyme: shallow rendering isolates a component from its children cheaply, direct internal access can be convenient for quick debugging. Disadvantages: encourages implementation-detail coupling, brittle to harmless refactors, reduced compatibility/maintenance with modern React versions.",
      commonMistakes: [
        "Interview trap: assuming shallow rendering (Enzyme's headline feature) is a testing best practice — modern guidance (and RTL's design) actively discourages it in favor of rendering the full tree and testing observable behavior",
        "Reaching for a wrapper.state()/instance() equivalent workaround in RTL when no such API is intentionally provided",
        "Overusing getByTestId in RTL instead of accessible queries like getByRole, missing an opportunity to catch accessibility issues via the tests themselves",
        "Starting a brand-new test suite with Enzyme in a modern React version despite its reduced compatibility/maintenance",
        "Testing implementation details that make otherwise-safe refactors falsely appear to break functionality",
        "Not understanding why RTL deliberately withholds internal-state access as a design philosophy, not a missing feature"
      ],
      followUpQuestions: [
        "Why does RTL deliberately avoid exposing component internal state/instance access?",
        "What is shallow rendering, and why is it discouraged by RTL's philosophy?",
        "Why has Enzyme fallen out of favor for modern React testing?",
        "How would you query an element by accessible role instead of a test id?",
        "How does RTL's approach make tests more resilient to refactors?"
      ],
      relatedTopics: ["shallow rendering", "getByRole queries", "accessibility testing", "userEvent", "test resilience to refactors"]
    }
  },
  {
    detail: {
      id: "reactx1-53",
      questionNumber: "REACTX1-053",
      title: "Memoization for Performance Optimization",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Netflix", "Stripe", "Uber"],
      frequency: 5,
      category: "React Optimization",
      part: "Performance",
      concepts: ["React.memo", "useMemo", "useCallback", "shallow comparison", "referential equality"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "How do you use memoization to optimize React components?"
    },
    answer: {
      expectedAnswer: "React.memo(Component) skips a component's re-render when its props are shallowly equal to the previous render's props, useMemo caches an expensive computed value across renders, and useCallback caches a function's identity — all three work together by preserving referential equality so React can cheaply skip work instead of re-rendering or recomputing on every render.",
      deepExplanation: "React.memo wraps a component and, before re-rendering it, does a shallow (`Object.is` per key) comparison between the previous and new props; if all are equal, it reuses the previous render output entirely and skips re-invoking the component function. This only helps if the props actually stay referentially stable across parent re-renders — passing a new inline object, array, or function literal as a prop defeats it every time, which is exactly why useMemo/useCallback exist: to give the parent stable references to hand down. A custom comparison function can be passed as React.memo's second argument for cases where shallow equality isn't sufficient (e.g. deep-equality needs, though this is rarer and has its own performance cost). None of this should be applied reflexively — measuring with React DevTools Profiler first is essential, since wrapping every component in memo and every value in useMemo/useCallback adds real overhead (extra comparisons, extra memory for cached values) that can be a net loss for cheap components that would re-render fast anyway.\n\n```jsx\nconst ListItem = React.memo(function ListItem({ item, onSelect }) {\n  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;\n});\n\nfunction List({ items }) {\n  const handleSelect = useCallback((id) => console.log(id), []);\n  return items.map(item => <ListItem key={item.id} item={item} onSelect={handleSelect} />);\n}\n```",
      productionExample: "Large tables/lists, dashboards with many independently-updating widgets, and drag-and-drop interfaces commonly rely on React.memo plus stable useCallback/useMemo references to avoid re-rendering hundreds of unaffected sibling components whenever one small piece of state changes; teams verify the win with the Profiler rather than assuming it.",
      bestPractices: [
        "Measure with React DevTools Profiler before adding memoization, not preemptively",
        "Pair React.memo on the child with useCallback/useMemo on the parent for props passed down — one without the other often achieves nothing",
        "Keep memo comparisons cheap by passing primitive or genuinely stable references, not deeply nested objects",
        "Consider moving state down (colocating it closer to where it's used) as an alternative to memoization for isolating re-renders",
        "Avoid custom comparison functions unless shallow equality genuinely isn't sufficient, since they add per-render cost too",
        "Reassess memoization when React Compiler / automatic memoization tooling becomes available, which may reduce the need for hand-written memo/useMemo/useCallback"
      ],
      tradeOffs: "Advantages: can dramatically cut down unnecessary re-renders/recomputation in large or complex UI trees, works with plain reference-equality checks that are cheap to run. Disadvantages: overusing memoization on cheap components/values adds comparison and memory overhead that can be a net loss; requires disciplined referential stability throughout the tree (one unstable prop breaks the optimization); adds cognitive overhead and can hide correctness bugs if dependency arrays are wrong.",
      commonMistakes: [
        "Interview trap: wrapping a component in React.memo but still passing it a new inline object/array/function literal as a prop every render from the parent, which defeats the memoization entirely since the prop is never referentially equal",
        "Memoizing every component and value reflexively without measuring, adding net overhead instead of a net win",
        "Assuming useCallback alone prevents a child's re-render — it only helps if the child is itself wrapped in React.memo",
        "Using a custom, expensive deep-equality comparison function in React.memo for props that could have simply been kept referentially stable instead",
        "Not re-evaluating memoization decisions as the codebase evolves and prop shapes change",
        "Confusing memoization (skipping recomputation/re-render) with actual algorithmic performance improvements — memoization doesn't fix an inherently slow computation, it just avoids redundant repeats of it"
      ],
      followUpQuestions: [
        "Why does React.memo sometimes fail to prevent a re-render even when it looks correctly applied?",
        "How would you verify with the Profiler that a memoization actually helped?",
        "What's the relationship between useCallback and React.memo?",
        "When would a custom comparison function in React.memo be justified?",
        "How might the React Compiler change the need for manual memoization in the future?"
      ],
      relatedTopics: ["React.memo", "useMemo", "useCallback", "React DevTools Profiler", "React Compiler", "referential equality"]
    }
  },
  {
    detail: {
      id: "reactx1-54",
      questionNumber: "REACTX1-054",
      title: "Profiling and Performance Monitoring Tools",
      difficulty: "Hard",
      companies: ["Google", "Meta", "Amazon", "Netflix"],
      frequency: 4,
      category: "React Optimization",
      part: "Performance",
      concepts: ["React DevTools Profiler", "Chrome Performance panel", "Web Vitals", "flame graphs", "why-did-you-render"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "5–8 Years",
      question: "What tools and techniques do you use for profiling and performance monitoring in React?"
    },
    answer: {
      expectedAnswer: "React DevTools' Profiler tab records renders and shows a flame graph of which components rendered, how long each took, and why (via the 'Why did this render?' info), while the Chrome DevTools Performance panel captures broader browser-level metrics (scripting, layout, painting) including React's own render/commit phases. For production monitoring, Core Web Vitals (LCP, INP, CLS) tracked via the web-vitals library plus real-user-monitoring tools (e.g. Sentry Performance, Datadog RUM) reveal actual user-experienced performance beyond local profiling.",
      deepExplanation: "The React DevTools Profiler records a session (or one commit) and visualizes it as a flame graph where each bar is a component, sized by render duration and colored by relative cost; clicking a component shows why it re-rendered (props changed, state changed, parent re-rendered, hooks changed) which directly surfaces missing memoization or unstable references. The Chrome Performance panel operates one level below React's abstraction, showing the actual browser main-thread timeline — useful for spotting long tasks that block interactivity, excessive layout thrashing from DOM reads/writes interleaved badly, or garbage collection pauses that React's own Profiler wouldn't directly attribute. Core Web Vitals are the standardized, user-experience-anchored metrics Google uses for real-world performance assessment: LCP (Largest Contentful Paint, loading), INP (Interaction to Next Paint, responsiveness — replaced FID in 2024), and CLS (Cumulative Layout Shift, visual stability); measuring these in production via the web-vitals library and forwarding them to an analytics/RUM pipeline reveals real user experience across varied devices/networks that local profiling on a fast dev machine can miss entirely.\n\n```jsx\nimport { onLCP, onINP, onCLS } from 'web-vitals';\nonLCP(metric => sendToAnalytics(metric));\nonINP(metric => sendToAnalytics(metric));\nonCLS(metric => sendToAnalytics(metric));\n```",
      productionExample: "Production teams gate performance regressions in CI using Lighthouse budgets, monitor real-user Core Web Vitals via RUM dashboards (Datadog, Sentry, or Google's own CrUX data), and use the React Profiler locally during development to diagnose specific slow-render reports before shipping a fix.",
      bestPractices: [
        "Profile before optimizing — never guess where the bottleneck is without measuring",
        "Use React DevTools Profiler's 'why did this render' feature to find missing memoization or unstable prop references",
        "Track Core Web Vitals in production via the web-vitals library, not just local dev-machine measurements",
        "Use the Chrome Performance panel for browser-level issues (long tasks, layout thrashing) that React's own Profiler doesn't attribute",
        "Set performance budgets in CI (via Lighthouse CI or similar) to catch regressions before they ship",
        "Combine synthetic (Lighthouse) and real-user (RUM) monitoring since lab conditions rarely reflect real-world device/network diversity"
      ],
      tradeOffs: "Advantages: React DevTools Profiler gives component-level attribution that's hard to get from generic browser tools; Web Vitals/RUM capture real-world user experience across diverse devices/networks rather than an idealized dev environment. Disadvantages: profiling adds its own overhead and can distort timing slightly; local dev-machine profiling can significantly understate real-world slowness on low-end devices/networks, making production RUM data essential rather than optional.",
      commonMistakes: [
        "Interview trap: optimizing based only on how fast the app feels on a developer's high-end machine over a fast connection, missing real-world slowness experienced by users on low-end devices or poor networks",
        "Adding memoization or other optimizations speculatively without first profiling to confirm where the actual bottleneck is",
        "Confusing React's own render/commit timing with total perceived performance, which also includes network, parsing, and layout/paint costs outside React's control",
        "Not distinguishing INP from the deprecated FID metric when discussing responsiveness in 2024+ context",
        "Ignoring CLS (visual stability) while focused only on load-time metrics like LCP",
        "Not setting up any production performance monitoring at all, relying solely on local profiling that never reflects real user conditions"
      ],
      followUpQuestions: [
        "What does the React DevTools Profiler's 'why did this render' feature show you?",
        "What replaced FID as a Core Web Vital, and why?",
        "Why is production RUM data important even if local profiling looks fine?",
        "How would you set a performance budget in CI to prevent regressions?",
        "What's the difference between what the React Profiler measures versus the Chrome Performance panel?"
      ],
      relatedTopics: ["Core Web Vitals", "Lighthouse CI", "React DevTools Profiler", "real-user monitoring", "Chrome Performance panel", "INP"]
    }
  },
  {
    detail: {
      id: "reactx1-55",
      questionNumber: "REACTX1-055",
      title: "Creating a React App with Create React App",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Zoho", "Flipkart"],
      frequency: 3,
      category: "Build and Deployment",
      part: "DevOps/Cloud",
      concepts: ["Create React App", "build tooling", "webpack abstraction", "Vite alternative"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you create a React app using Create React App (CRA)?"
    },
    answer: {
      expectedAnswer: "Historically, `npx create-react-app my-app` scaffolded a new React project with a pre-configured webpack build, Babel transpilation, dev server, and test runner (Jest) hidden behind npm scripts (`start`, `build`, `test`), so you never had to hand-configure webpack. CRA is now deprecated/no longer actively recommended by the React team — new projects are directed toward Vite, Next.js, or Remix/React Router's framework mode instead, which offer faster dev-server startup and more modern tooling.",
      deepExplanation: "CRA's core value proposition was 'zero config' — `react-scripts` bundled a preconfigured webpack setup, Babel presets, ESLint config, and Jest test runner, exposing only `npm start` (dev server with hot reload), `npm run build` (production bundle), `npm test`, and `npm run eject` (to permanently unpack the hidden configuration if you needed to customize it beyond what CRA exposed). Its main drawbacks that led to its decline were slow cold-start and rebuild times on larger projects (webpack bundling the entire dependency graph before serving anything), and years without meaningful updates or official React team endorsement, culminating in the React docs removing CRA from their recommended starting points in 2023. Vite addressed the speed problem by leveraging native ES modules during development (only transforming/serving files as the browser actually requests them, via esbuild for pre-bundling dependencies) instead of bundling everything upfront, giving near-instant dev server startup regardless of project size; frameworks like Next.js additionally provide server-side rendering, file-based routing, and API routes out of the box, which CRA (a pure client-side SPA tool) never offered.\n\n```bash\n# Legacy\nnpx create-react-app my-app\n\n# Modern equivalents\nnpm create vite@latest my-app -- --template react-ts\nnpx create-next-app@latest my-app\n```",
      productionExample: "New production React projects today are scaffolded with Vite (for SPAs) or Next.js (when SSR/SSG/file-based routing is needed); CRA remains present only in older codebases that haven't yet migrated to a modern build tool.",
      bestPractices: [
        "Use Vite for new client-side-only SPAs instead of CRA",
        "Use Next.js (or Remix/React Router framework mode) when server-side rendering, file-based routing, or API routes are needed",
        "Migrate existing CRA projects to Vite incrementally rather than as a risky big-bang rewrite",
        "Avoid `npm run eject` unless truly necessary — it's a one-way operation that permanently exposes and freezes the underlying config",
        "Keep build tooling choices aligned with actual project needs (pure SPA vs SSR vs static site)",
        "Check current React documentation for the currently recommended starting point, since CRA's deprecated status is a relatively recent (2023+) change"
      ],
      tradeOffs: "Advantages CRA offered at its peak: zero-config setup, one command to a working dev environment, widely known and documented. Disadvantages: slow dev server start/rebuild on larger apps due to full webpack bundling, no longer actively maintained/recommended, no built-in SSR support. Vite's advantages: near-instant dev server via native ESM + esbuild, actively maintained, flexible plugin ecosystem. Disadvantages: still a pure build tool (no built-in routing/SSR), requiring a framework layered on top for those needs.",
      commonMistakes: [
        "Interview trap: recommending Create React App for a new production project without mentioning it's deprecated and no longer the React team's recommended starting point as of 2023",
        "Running npm run eject without understanding it's irreversible and permanently exposes the full webpack/Babel config",
        "Assuming CRA supports server-side rendering out of the box — it's purely client-side rendered",
        "Not considering Next.js/Remix when a project actually needs SSR, static generation, or file-based routing",
        "Migrating from CRA to Vite without adjusting environment variable prefixes (REACT_APP_ vs VITE_) and other CRA-specific conventions",
        "Assuming Vite alone provides routing or SSR — it's a build tool, not a full framework"
      ],
      followUpQuestions: [
        "Why is Create React App no longer recommended by the React team?",
        "How does Vite achieve much faster dev server startup than webpack-based CRA?",
        "When would you choose Next.js over a plain Vite SPA?",
        "What does 'ejecting' from CRA actually do, and why is it irreversible?",
        "How would you migrate an existing CRA project to Vite?"
      ],
      relatedTopics: ["Vite", "Next.js", "webpack", "esbuild", "server-side rendering", "build tooling migration"]
    }
  },
  {
    detail: {
      id: "reactx1-56",
      questionNumber: "REACTX1-056",
      title: "Best Practices for Production Builds",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Stripe"],
      frequency: 4,
      category: "Build and Deployment",
      part: "DevOps/Cloud",
      concepts: ["minification", "code splitting", "tree shaking", "source maps", "bundle analysis"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What are some best practices for creating production builds?"
    },
    answer: {
      expectedAnswer: "A good production build minifies and tree-shakes JS/CSS to cut bundle size, code-splits routes/heavy features so users only download what a given page needs (via dynamic import()/React.lazy), sets production-mode environment variables (React strips dev-only warnings/checks when NODE_ENV=production), generates source maps for error-tracking without exposing them publicly, and enables long-term caching via content-hashed filenames.",
      deepExplanation: "React's own bundle behaves very differently in development versus production mode: dev builds include extra runtime checks, PropTypes validation, and warning messages that meaningfully slow down rendering and bloat bundle size, all of which are stripped when the build tooling sets `NODE_ENV=production` — forgetting this (e.g. testing performance against a dev build) is a very common false-negative source when someone believes 'React is slow'. Code splitting via `React.lazy(() => import('./Route'))` combined with `<Suspense>` lets the initial bundle contain only what's needed for the first paint, deferring route-specific code until it's actually navigated to, which meaningfully improves Largest Contentful Paint on larger apps. Content-hashed filenames (`main.a3f9c2.js`) let a CDN cache assets indefinitely since any code change produces a new filename, avoiding both stale-cache bugs and unnecessary re-downloads of unchanged files. Source maps should be generated for error-tracking tools (Sentry) to symbolicate minified stack traces, but typically uploaded privately to the monitoring service rather than served publicly alongside the production bundle, to avoid exposing original source code.\n\n```jsx\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Dashboard />\n    </Suspense>\n  );\n}\n```",
      productionExample: "Production CI pipelines run `vite build`/`next build`, analyze bundle size with tools like `rollup-plugin-visualizer` or `next-bundle-analyzer` to catch regressions, upload source maps privately to Sentry for error symbolication, and deploy content-hashed assets behind a CDN with long cache lifetimes plus a short-lived cache for the HTML entry point.",
      bestPractices: [
        "Ensure the build tool sets NODE_ENV=production so React strips dev-only warnings and checks",
        "Code-split by route (and heavy rarely-used features) with React.lazy + Suspense",
        "Analyze bundle size regularly (bundle analyzer) and set a size budget in CI",
        "Use content-hashed filenames with long-lived CDN caching for static assets",
        "Upload source maps privately to an error-monitoring service rather than serving them publicly",
        "Tree-shake unused code by preferring named ES module imports over importing entire libraries"
      ],
      tradeOffs: "Advantages: significantly smaller initial bundle and faster load times, better caching behavior, safer production error tracking. Disadvantages: code splitting adds complexity (Suspense boundaries, loading states) and can introduce a visible loading flash for split chunks if not designed carefully; publicly exposing source maps by mistake is a real security/IP risk that must be actively guarded against.",
      commonMistakes: [
        "Interview trap: benchmarking React's performance against a development build instead of a production build, drawing false conclusions since dev builds include significant extra overhead (PropTypes checks, warnings) that production builds strip out entirely",
        "Publicly serving source maps in production without uploading them privately to an error-tracking service, exposing original source code",
        "Not code-splitting large, rarely-visited routes/features, bloating the initial bundle unnecessarily",
        "Importing an entire library instead of only the specific named exports needed, defeating tree-shaking",
        "Not setting a bundle size budget/monitoring, letting bundle size creep up unnoticed over time",
        "Caching the HTML entry point aggressively at the CDN level, causing users to load a stale shell referencing assets that no longer exist"
      ],
      followUpQuestions: [
        "What specifically changes about React's own behavior between development and production mode?",
        "How would you set up route-based code splitting with React.lazy and Suspense?",
        "Why should source maps not be served publicly in production?",
        "How does content hashing enable safe long-term CDN caching?",
        "How would you detect and prevent bundle size regressions in CI?"
      ],
      relatedTopics: ["React.lazy", "Suspense", "code splitting", "bundle analysis", "CDN caching", "Sentry source maps"]
    }
  },
  {
    detail: {
      id: "reactx1-57",
      questionNumber: "REACTX1-057",
      title: "Deploying a React Application",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Netflix", "Uber"],
      frequency: 3,
      category: "Build and Deployment",
      part: "DevOps/Cloud",
      concepts: ["static hosting", "CDN", "SPA rewrite rules", "CI/CD", "SSR deployment"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How do you deploy a React application?"
    },
    answer: {
      expectedAnswer: "For a pure client-side SPA, you run the production build (generating static HTML/JS/CSS), upload the resulting files to a static host/CDN (Netlify, Vercel, S3+CloudFront, GitHub Pages), and configure a rewrite rule so any deep-link path serves index.html so client-side routing can take over. For an SSR framework like Next.js, deployment instead requires a Node.js server (or a serverless/edge runtime) capable of running the framework's server code on each request, typically via a platform like Vercel that's built specifically around it.",
      deepExplanation: "A pure client-rendered SPA produces static assets that can be served from any CDN with no server-side runtime required at all — the crucial extra step beyond just uploading files is the catch-all rewrite rule (serve index.html for any unmatched path with a 200, not a 404) so that direct navigation or a refresh on a client-side route like `/users/42` doesn't hit the CDN's default 404 behavior. An SSR/hybrid framework changes this fundamentally: pages can be rendered per-request on a server (or edge function), meaning the deployment target needs an actual runtime, not just static file hosting — this is why frameworks like Next.js are commonly deployed to platforms (Vercel, or self-hosted Node servers/containers) that specifically support running its server-side rendering pipeline, with static generation (SSG) used selectively for pages that don't need per-request data. CI/CD pipelines typically run the production build and tests on every push, then deploy automatically to a preview environment for pull requests and to production on merge to main, often using immutable, content-hashed asset deployments so rollbacks are just a matter of pointing back at a previous build's manifest.",
      productionExample: "SPA-only apps commonly deploy static builds to Netlify/Vercel/S3+CloudFront with SPA rewrite rules configured; SSR Next.js apps deploy to Vercel (or a self-hosted Node/Docker setup on AWS/GCP) where each request can be server-rendered; most teams wire this into CI/CD so every merged PR triggers an automated build, test run, and deploy with preview URLs for review.",
      bestPractices: [
        "Configure a catch-all SPA rewrite rule (serve index.html for unmatched paths) for any pure client-rendered app",
        "Use content-hashed filenames with immutable long-cache headers for static assets, and short/no-cache for the HTML entry point",
        "Automate build, test, and deploy via CI/CD rather than manual uploads",
        "Choose a hosting platform that matches the app's rendering model (static CDN for SPA, Node/edge runtime for SSR)",
        "Use preview deployments per pull request to review changes before merging to production",
        "Set up rollback capability via immutable, versioned deployments"
      ],
      tradeOffs: "Advantages of pure static SPA hosting: cheap, simple, infinitely scalable via CDN with no server to manage. Disadvantages: no server-side rendering means slower first meaningful paint and worse SEO for content-heavy sites unless client-rendered content is acceptable. Advantages of SSR deployment: better perceived performance and SEO for content-driven pages. Disadvantages: requires a running server/edge runtime (more operational complexity and cost) and careful cache strategy per route depending on whether it's static, server-rendered, or a mix.",
      commonMistakes: [
        "Interview trap: deploying a pure client-rendered SPA to a static host without configuring the catch-all rewrite rule, causing every deep-linked route to 404 on direct navigation or refresh",
        "Assuming any static file host can serve an SSR framework's app without a running server/edge runtime for its server-side code",
        "Caching the HTML entry point as aggressively as the hashed static assets, serving a stale shell that references assets that no longer exist after a new deploy",
        "Not automating deploys via CI/CD, relying on manual, error-prone upload steps",
        "Ignoring environment-specific configuration (API base URLs, feature flags) differing between preview and production deployments",
        "Not setting up rollback capability, making a bad deploy hard to quickly reverse"
      ],
      followUpQuestions: [
        "Why does a pure SPA need a catch-all rewrite rule when deployed to a static host?",
        "What changes about deployment requirements when moving from a pure SPA to an SSR framework like Next.js?",
        "How would you set up preview deployments for pull requests?",
        "What caching strategy would you use for the HTML entry point versus static assets?",
        "How would you implement a quick rollback if a production deploy introduced a bug?"
      ],
      relatedTopics: ["CDN", "SPA rewrite rules", "CI/CD pipelines", "Vercel/Netlify", "server-side rendering deployment", "cache headers"]
    }
  },
  {
    detail: {
      id: "reactx1-58",
      questionNumber: "REACTX1-058",
      title: "Styling with Styled-components",
      difficulty: "Easy",
      companies: ["Meta", "Netflix", "Stripe", "Uber"],
      frequency: 3,
      category: "Styling Libraries",
      part: "React Fundamentals",
      concepts: ["CSS-in-JS", "styled-components", "scoped styles", "theming", "dynamic styling via props"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you style components using Styled-components?"
    },
    answer: {
      expectedAnswer: "styled-components is a CSS-in-JS library where you write actual CSS inside a tagged template literal attached to a JavaScript component: `const Button = styled.button\\`...\\`` generates a real React component that renders a uniquely-classed DOM element with that CSS scoped to it, avoiding global class name collisions and letting styles respond directly to props.",
      deepExplanation: "Under the hood, styled-components generates a unique, hashed class name per styled component definition and injects the corresponding CSS rule into a `<style>` tag at runtime, so styles are automatically scoped and never leak or collide across components the way plain global CSS class names can. Because the template literal is genuine JavaScript, it can interpolate props directly to produce dynamic styles (`background: ${props => props.primary ? 'blue' : 'gray'}`), eliminating the need for manually toggling CSS class names based on state/props. It supports a `ThemeProvider` (built on Context) to make a shared theme object (colors, spacing, typography) available to every styled component in the tree via the `theme` prop automatically. The main trade-off versus compile-time CSS solutions (CSS Modules, Tailwind, vanilla-extract) is runtime cost: styled-components computes and injects styles at runtime on the client (though newer versions and compiler-based CSS-in-JS libraries have worked to reduce this), which adds some JS bundle size and can have a measurable performance cost for very large component trees with heavily dynamic styles.\n\n```jsx\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  padding: 8px 16px;\n  border-radius: 4px;\n  background: ${props => props.primary ? '#3b82f6' : '#e5e7eb'};\n  color: ${props => props.primary ? 'white' : 'black'};\n`;\n\n<Button primary>Save</Button>\n```",
      productionExample: "Component libraries and product teams favoring colocated styles-with-logic (avoiding separate CSS files entirely) commonly use styled-components or Emotion; design systems layer a ThemeProvider on top to enforce consistent tokens (colors, spacing) across every styled component.",
      bestPractices: [
        "Use ThemeProvider and theme tokens instead of hardcoding colors/spacing values across styled components",
        "Avoid excessive prop-driven dynamic styles on very large lists where runtime style computation could add up",
        "Keep styled component definitions colocated with the component that uses them, or in a clearly organized styles file",
        "Use the babel/SWC plugin for styled-components in production builds to get better class names and minification",
        "Consider a compile-time CSS-in-JS alternative (vanilla-extract, Panda CSS) if runtime style-injection performance becomes a measured concern",
        "Avoid deeply nested selector overrides that fight against the component's own scoped styles"
      ],
      tradeOffs: "Advantages: fully scoped styles with zero global collision risk, styles can respond directly to props/theme, colocates styling with the component. Disadvantages: runtime style injection adds JS bundle size and a small performance cost versus compile-time CSS solutions; can make it harder to use plain CSS tooling (browser DevTools style editing can be less intuitive with generated hashed class names); adds a build/runtime dependency.",
      commonMistakes: [
        "Interview trap: assuming styled-components has zero runtime cost like CSS Modules — it computes and injects styles client-side at runtime, which is a real (if often small) performance consideration for very large or highly dynamic trees",
        "Hardcoding color/spacing values directly in styled components instead of pulling from a shared theme",
        "Recreating a styled component definition inside another component's render function, causing it to be redefined (and its cached styles invalidated) on every render",
        "Not using the styled-components babel/SWC plugin in production, missing out on better debugging class names and dead code elimination",
        "Overusing deeply prop-driven conditional styling that becomes hard to read compared to simpler variant-based approaches",
        "Mixing styled-components with global CSS inconsistently, causing specificity conflicts"
      ],
      followUpQuestions: [
        "How does styled-components scope styles to avoid class name collisions?",
        "What's the runtime performance trade-off of CSS-in-JS versus compile-time CSS solutions?",
        "How would you implement theming across an app using styled-components?",
        "Why shouldn't you define a styled component inside another component's render function?",
        "How does styled-components compare to CSS Modules or Tailwind?"
      ],
      relatedTopics: ["CSS-in-JS", "ThemeProvider", "CSS Modules", "Tailwind CSS", "Emotion", "vanilla-extract"]
    }
  },
  {
    detail: {
      id: "reactx1-59",
      questionNumber: "REACTX1-059",
      title: "CSS Modules vs Traditional CSS",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Adobe", "Zoho"],
      frequency: 3,
      category: "Styling Libraries",
      part: "React Fundamentals",
      concepts: ["CSS Modules", "local scoping", "class name hashing", "build-time CSS"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What are CSS Modules, and how do they differ from traditional CSS?"
    },
    answer: {
      expectedAnswer: "A CSS Module (`Button.module.css`) is a regular CSS file whose class names are automatically scoped locally to the component that imports it — the build tool rewrites each class name to a unique hashed identifier at build time, so `.button` in one module can never collide with `.button` defined in a completely different file, unlike traditional global CSS where every class name shares one single global namespace.",
      deepExplanation: "With traditional CSS, every stylesheet contributes to one flat global namespace of class names, so two unrelated components both using `.button` or `.active` can unintentionally override each other depending on stylesheet load order and specificity — a problem that scales badly as a codebase grows and is traditionally worked around with naming conventions like BEM. CSS Modules solve this at build time (not runtime, unlike CSS-in-JS): the bundler (webpack/Vite) processes the file, generates a unique class name per selector (e.g. `.button` becomes `.Button_button__a1b2c`), and exports a JS object mapping the original class names to their generated ones, which you import and reference (`styles.button`) in your component — the actual CSS shipped to the browser is entirely ordinary, statically-generated CSS with zero runtime JS cost, unlike styled-components/Emotion. Since it's plain CSS syntax underneath, all normal CSS tooling (autoprefixing, linting, browser DevTools style editing) works normally, and there's no extra JS bundle size for a styling runtime.\n\n```css\n/* Button.module.css */\n.button {\n  padding: 8px 16px;\n  border-radius: 4px;\n}\n```\n```jsx\nimport styles from './Button.module.css';\nfunction Button({ children }) {\n  return <button className={styles.button}>{children}</button>;\n}\n```",
      productionExample: "Next.js supports CSS Modules out of the box with zero configuration, and many production apps use them specifically to get scoped styles without any CSS-in-JS runtime cost, often combined with a small set of global utility classes (e.g. Tailwind or a handful of global reset styles) for cross-cutting concerns.",
      bestPractices: [
        "Use CSS Modules for scoped component styles with zero runtime cost when CSS-in-JS's dynamic capabilities aren't needed",
        "Name files consistently (Component.module.css) so the build tool recognizes them as modules",
        "Use `composes` to share common style rules between classes within CSS Modules instead of duplicating declarations",
        "Combine with a small set of truly global styles (resets, typography base) outside the modules system intentionally",
        "Avoid overly generic class names inside a module purely out of old global-CSS habit, since scoping already prevents collisions",
        "Prefer CSS Modules over CSS-in-JS specifically when avoiding a styling runtime cost is a priority"
      ],
      tradeOffs: "Advantages: zero runtime JS cost (styles are plain, statically generated CSS), no global class name collisions, all standard CSS tooling works unmodified. Disadvantages: dynamic, prop-driven styling requires conditionally toggling class names yourself rather than interpolating values directly in a template literal like CSS-in-JS allows; less colocated with component logic than CSS-in-JS by default.",
      commonMistakes: [
        "Interview trap: assuming CSS Modules and CSS-in-JS (styled-components) are the same thing — CSS Modules resolve scoping entirely at build time with zero runtime cost, while CSS-in-JS injects styles at runtime and supports direct prop interpolation that CSS Modules don't",
        "Naming a file .css instead of .module.css and being confused why class names aren't being locally scoped",
        "Duplicating shared style rules across multiple module files instead of using `composes` to share them",
        "Trying to reference a CSS Modules class name as a plain string instead of importing and using the generated styles object",
        "Assuming dynamic/conditional styling works the same way as CSS-in-JS's prop interpolation without writing the conditional class logic yourself",
        "Mixing global and modular CSS inconsistently, leading to unclear ownership of certain class names"
      ],
      followUpQuestions: [
        "How do CSS Modules avoid global class name collisions without any runtime cost?",
        "How does CSS Modules' scoping mechanism differ from styled-components' approach?",
        "How would you implement dynamic/conditional styling using CSS Modules?",
        "What does the `composes` feature do in CSS Modules?",
        "When would you choose CSS Modules over CSS-in-JS?"
      ],
      relatedTopics: ["scoped styling", "styled-components", "BEM naming convention", "build-time CSS processing", "Tailwind CSS"]
    }
  },
  {
    detail: {
      id: "reactx1-60",
      questionNumber: "REACTX1-060",
      title: "Redux vs MobX for State Management",
      difficulty: "Medium",
      companies: ["Meta", "Amazon", "Netflix", "Uber"],
      frequency: 3,
      category: "State Management Libraries",
      part: "Redux/State",
      concepts: ["Redux", "MobX", "immutability", "observables", "unidirectional vs reactive state"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "How does Redux compare to MobX for state management in React?"
    },
    answer: {
      expectedAnswer: "Redux centers on a single immutable state tree updated only through pure reducer functions in response to dispatched actions, favoring explicit, predictable, easily-debuggable state transitions. MobX centers on observable state objects that can be mutated directly, automatically tracking which components read which observable values and re-rendering only those components when the specific data they used actually changes — a more implicit, 'reactive' model with noticeably less boilerplate for simple cases.",
      deepExplanation: "Redux's philosophy is explicitness and predictability: every state change is described by a plain action object and computed by a pure function, making the entire history of state transitions traceable/replayable (time-travel debugging) and every reducer independently unit-testable with plain input/output assertions. MobX's philosophy is different: state is held in observable objects/classes, and any component that reads an observable value inside its render (when wrapped in `observer()`) is automatically subscribed to exactly that value — mutating the observable directly (`store.count++`) triggers re-renders only in components that actually read `count`, with no action/reducer ceremony required, using JavaScript Proxies under the hood to intercept reads/writes. This makes MobX feel closer to 'just mutate normal-looking JavaScript objects and the UI updates itself', which is less boilerplate for straightforward cases but trades away some of Redux's explicitness — it can be harder to trace exactly why/where a particular piece of state changed across a large codebase without Redux's centralized, action-log-driven model. Redux's ecosystem (Redux DevTools time-travel debugging, Redux Toolkit reducing boilerplate significantly, extensive middleware ecosystem) remains the more dominant choice for large teams needing strict predictability and auditability.",
      productionExample: "Large enterprise apps with complex cross-team state and strict debugging/auditability needs often choose Redux (via Redux Toolkit); teams prioritizing minimal boilerplate and comfortable with a more implicit reactive mutation model choose MobX, common in some real-time collaborative or highly interactive apps where fine-grained automatic reactivity is valued.",
      bestPractices: [
        "Choose Redux when explicit, traceable, testable state transitions and time-travel debugging matter for the team/app scale",
        "Choose MobX when minimal boilerplate and direct mutation ergonomics matter more, and the team is comfortable with implicit reactivity",
        "Use Redux Toolkit to significantly cut Redux's traditional boilerplate if choosing Redux",
        "Wrap MobX-consuming components in observer() consistently to get the automatic fine-grained re-render tracking",
        "Avoid mixing both libraries within the same app without a very clear reason and boundary",
        "Evaluate lighter alternatives (Zustand, Jotai) for cases where neither Redux's structure nor MobX's reactivity model is strictly needed"
      ],
      tradeOffs: "Advantages of Redux: highly predictable and traceable state transitions, mature DevTools with time-travel debugging, pure reducers are trivially unit-testable, huge ecosystem/middleware support. Disadvantages: more setup/boilerplate (though Redux Toolkit reduces this substantially), explicit action dispatching required for every change. Advantages of MobX: minimal boilerplate, automatic fine-grained reactivity, feels like plain JavaScript object mutation. Disadvantages: more implicit — can be harder to trace exactly why/where state changed across a large codebase, relies on Proxies which have their own subtle edge cases (e.g. destructuring an observable can break reactivity tracking if not done carefully).",
      commonMistakes: [
        "Interview trap: assuming MobX's automatic reactivity means you can mutate state anywhere without consequence — mutating an observable outside of an action (when 'enforceActions' is configured, which is recommended) is disallowed or discouraged for the same predictability reasons Redux enforces via reducers",
        "Assuming Redux always requires massive boilerplate — Redux Toolkit substantially reduces this and is now the standard way to write Redux",
        "Destructuring MobX observable properties in a way that breaks their reactivity tracking (accessing via the object itself inside the render, not a destructured stale copy)",
        "Forgetting to wrap a MobX-consuming component in observer(), causing it to silently never re-render on observable changes",
        "Choosing Redux or MobX by default without evaluating whether a lighter tool (Zustand, Jotai) or even just React's built-in state/Context would suffice",
        "Mixing Redux and MobX in the same app without clear justification, adding unnecessary complexity"
      ],
      followUpQuestions: [
        "Why does Redux enforce state changes through pure reducers rather than direct mutation?",
        "How does MobX's observer() function achieve fine-grained automatic re-rendering?",
        "What are the debugging/traceability trade-offs between the two approaches?",
        "How does Redux Toolkit address Redux's traditional boilerplate criticism?",
        "When might a lighter tool like Zustand or Jotai be preferable to either Redux or MobX?"
      ],
      relatedTopics: ["Redux Toolkit", "MobX observer()", "Proxies", "time-travel debugging", "Zustand", "Jotai"]
    }
  },
  {
    detail: {
      id: "reactx1-61",
      questionNumber: "REACTX1-061",
      title: "Advantages of MobX over Redux",
      difficulty: "Medium",
      companies: ["Google", "Meta", "Adobe", "Stripe"],
      frequency: 3,
      category: "State Management Libraries",
      part: "Redux/State",
      concepts: ["MobX", "observables", "less boilerplate", "fine-grained reactivity", "observer()"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "2–5 Years",
      question: "What are some advantages of using MobX over Redux?"
    },
    answer: {
      expectedAnswer: "MobX requires significantly less boilerplate for typical state updates — you mutate an observable directly instead of dispatching an action through a reducer — and it automatically tracks fine-grained dependencies, so a component wrapped in `observer()` only re-renders when a specific observable value it actually read changes, without needing manual selector/memoization work to achieve the same granularity Redux requires more deliberate effort for.",
      deepExplanation: "In Redux, connecting a component to a specific slice of state and avoiding unnecessary re-renders on unrelated state changes is something you have to design for explicitly — via careful mapStateToProps/useSelector selectors, often paired with reselect for memoized derived data. MobX achieves comparable fine-grained re-rendering automatically as a core feature of its design: because observables are implemented via Proxies (or getter/setter definitions) that record which observer-wrapped component read which specific property during render, any mutation to that exact property notifies only the components that actually depend on it — no selector design, memoization, or shallow-equality bookkeeping required from the developer. For simple state (a form, a UI toggle, a small feature's local-but-shared state), this often means writing store classes with plain fields and normal-looking mutator methods instead of action types, action creators, and a reducer switch statement, which is a meaningful reduction in ceremony for less complex use cases. This isn't strictly 'better' in every dimension — Redux's explicitness is itself valuable for large teams needing traceability — but as a raw developer-ergonomics and boilerplate comparison for typical CRUD-shaped state, MobX genuinely requires less code to achieve the same result.\n\n```js\n// MobX: mutate directly, no action/reducer ceremony\nclass TodoStore {\n  todos = [];\n  constructor() { makeAutoObservable(this); }\n  addTodo(text) { this.todos.push({ text, done: false }); }\n}\n\n// Consuming component only re-renders when todos actually changes\nconst TodoList = observer(({ store }) => (\n  <ul>{store.todos.map(t => <li key={t.text}>{t.text}</li>)}</ul>\n));\n```",
      productionExample: "Teams building highly interactive, state-heavy UIs (rich editors, real-time dashboards with many independently updating widgets) sometimes favor MobX specifically for its automatic fine-grained reactivity, avoiding the manual selector/memoization design work Redux would otherwise require to hit the same re-render granularity.",
      bestPractices: [
        "Use makeAutoObservable (or class field decorators) to declare observables concisely rather than manual getter/setter boilerplate",
        "Always wrap components consuming observables in observer() to get automatic re-render tracking",
        "Enable enforceActions in stricter setups if you still want a degree of Redux-like discipline over where mutations happen",
        "Keep derived/computed values as MobX computed properties instead of recalculating them manually in components",
        "Structure MobX stores by domain/feature, similar to how Redux slices are organized",
        "Evaluate whether the reduced boilerplate is worth trading away some of Redux's centralized action-log traceability for your team's scale"
      ],
      tradeOffs: "Advantages: dramatically less boilerplate for typical state updates, automatic fine-grained re-render tracking without manual selector design, feels like writing plain JavaScript classes/objects. Disadvantages: more implicit control flow makes large-scale changes harder to trace/audit without extra discipline (enforceActions); Proxy-based reactivity has subtle edge cases (destructuring breaking tracking, needing observer() wrapping consistently); smaller ecosystem/community and less standardized DevTools/time-travel debugging support compared to Redux.",
      commonMistakes: [
        "Interview trap: framing MobX as strictly 'better' than Redux without acknowledging the real trade-off — MobX's implicitness reduces boilerplate but can make large-scale state changes harder to trace/audit compared to Redux's centralized, action-log-driven model",
        "Forgetting to wrap a component in observer(), silently losing all automatic reactivity for that component",
        "Destructuring an observable object's properties in a way that detaches them from MobX's dependency tracking",
        "Not using enforceActions, allowing state mutations from anywhere in the codebase with no centralized record of what changed and why",
        "Assuming MobX has equally mature DevTools/time-travel debugging support as Redux out of the box",
        "Choosing MobX purely for less boilerplate without considering whether the team's scale actually benefits from Redux's stricter traceability"
      ],
      followUpQuestions: [
        "How does MobX achieve fine-grained reactivity without manual selector design?",
        "What does enforceActions do, and why might you still want it in a MobX app?",
        "What debugging/traceability capability does Redux offer that MobX doesn't have as standard?",
        "How does destructuring an observable risk breaking MobX's reactivity tracking?",
        "When would Redux's explicitness be worth the extra boilerplate over MobX?"
      ],
      relatedTopics: ["observer()", "makeAutoObservable", "Proxies", "enforceActions", "Redux DevTools", "computed properties"]
    }
  },
  {
    detail: {
      id: "reactx1-62",
      questionNumber: "REACTX1-062",
      title: "React Router vs Reach Router",
      difficulty: "Easy",
      companies: ["Meta", "Amazon", "Zoho"],
      frequency: 3,
      category: "Routing Libraries",
      part: "React Fundamentals",
      concepts: ["React Router", "Reach Router", "library merger", "accessibility-first routing"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "What are the key differences between React Router and Reach Router?"
    },
    answer: {
      expectedAnswer: "Reach Router was a separate, smaller routing library built with accessibility as a first-class concern (automatic focus management on navigation, built-in accessible route announcements) and a simpler API than React Router had at the time; the two projects officially merged in 2019, with Reach Router's accessibility features and API ideas folded into React Router v6, so Reach Router is no longer maintained as a separate library and React Router is the single actively-developed choice today.",
      deepExplanation: "Before the merger, the practical differences were real: Reach Router shipped automatic focus management (moving focus to the newly rendered route's heading on navigation, important for screen reader users who wouldn't otherwise know navigation occurred) and accessible route change announcements out of the box, while React Router (at v4/v5) required manual work to achieve equivalent accessibility. Reach Router also had a simpler, more implicit route-matching API at the time. The two teams announced in 2019 that they'd combine efforts, merging Reach Router's ideas — including its focus on accessibility and some of its simpler API ergonomics — into what became React Router v6's ranked, automatic best-match route matching (removing the need for the old `exact` prop and Switch component). As a practical matter for any current interview or project, Reach Router should not be newly adopted; React Router (now on v6/v7, including its data-router APIs) is the actively maintained, single choice, and understanding this history mainly matters for recognizing why React Router v6's matching algorithm and accessibility posture changed the way it did.",
      productionExample: "No current production project should be introducing Reach Router as a new dependency; any codebase still using it is running unmaintained legacy code that should be migrated to modern React Router, which now includes the accessibility-conscious design principles Reach Router originally pioneered.",
      bestPractices: [
        "Use React Router (current major version) for any new routing needs — Reach Router is not maintained as a standalone library anymore",
        "If maintaining a legacy Reach Router codebase, plan a migration to React Router v6+",
        "Take advantage of React Router v6's accessibility improvements that trace back to Reach Router's influence",
        "Manually verify focus management and route-change announcements even in React Router, since accessibility still requires deliberate attention",
        "Understand the historical merger mainly as context, not as an active choice between two competing libraries today",
        "Check the current React Router major version's docs, since routing APIs have changed significantly across v5/v6/v7"
      ],
      tradeOffs: "Advantages Reach Router historically offered: simpler API, accessibility-first defaults (focus management, announcements) that React Router lacked at the time. Disadvantages: no longer maintained as a standalone project post-merger, so choosing it today means adopting genuinely unmaintained code. React Router's advantage post-merger: it's the single actively maintained library incorporating Reach Router's best ideas, with a much larger ecosystem and ongoing development (data routers, loaders/actions).",
      commonMistakes: [
        "Interview trap: discussing React Router vs Reach Router as if they're two actively competing, currently maintained options — they merged in 2019, and Reach Router is not separately maintained anymore",
        "Adopting Reach Router in a new project, unaware it's effectively deprecated",
        "Assuming React Router automatically handles all accessibility concerns just because it absorbed Reach Router's influence — deliberate focus/announcement handling is still often needed",
        "Not recognizing why React Router v6 removed the exact prop and Switch component — this traces directly to the post-merger redesign",
        "Confusing the historical API differences with the current state of either project",
        "Recommending a migration plan without acknowledging how significantly the API has changed across React Router's own major versions since the merger"
      ],
      followUpQuestions: [
        "What happened to Reach Router, and why shouldn't it be used in a new project today?",
        "What accessibility features did Reach Router pioneer that influenced React Router v6?",
        "Why did React Router v6 remove the need for the exact prop and Switch component?",
        "How would you migrate a legacy Reach Router codebase to modern React Router?",
        "What accessibility considerations still require manual attention even in modern React Router?"
      ],
      relatedTopics: ["React Router v6/v7", "accessibility in SPAs", "focus management", "route matching algorithm", "library mergers"]
    }
  },
  {
    detail: {
      id: "reactx1-63",
      questionNumber: "REACTX1-063",
      title: "Choosing a Routing Library",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Netflix", "Flipkart"],
      frequency: 3,
      category: "Routing Libraries",
      part: "React Fundamentals",
      concepts: ["React Router", "Next.js file-based routing", "TanStack Router", "routing decision criteria"],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: "technical",
      experienceLevel: "0–2 Years",
      question: "How do you decide which routing library to use in a project?"
    },
    answer: {
      expectedAnswer: "The decision mostly follows from the broader framework choice and rendering strategy: a Next.js/Remix app uses its built-in file-based routing (App Router/Pages Router, or Remix's route conventions), while a plain Vite/CRA-style SPA typically adds React Router (the de facto standard) or, increasingly, TanStack Router for projects wanting fully type-safe routes and built-in data loading with excellent TypeScript inference.",
      deepExplanation: "If the project is already built on a full-stack React framework (Next.js, Remix/React Router's framework mode), the routing library isn't really a separate choice — it's baked into the framework's file-based conventions and tightly integrated with its data-fetching and rendering model (server components, loaders/actions, streaming), and introducing a second routing library on top would be redundant and conflict with the framework's own router. For a pure client-side SPA without a meta-framework, React Router remains the dominant, most battle-tested choice with the largest ecosystem and community knowledge, now offering its own data-router APIs (createBrowserRouter with loaders/actions) that bring some framework-router capabilities to a plain SPA. TanStack Router is a newer alternative gaining traction specifically for projects that want first-class, fully type-safe route definitions (route params, search params, and loader data are all inferred and type-checked end-to-end) and a more modern built-in data-loading/caching model, at the cost of a smaller community and less accumulated real-world usage than React Router.",
      productionExample: "A marketing site or content-heavy app typically picks Next.js for its file-based routing plus SSR/SSG; an internal admin dashboard or SPA-style product often picks Vite + React Router; teams especially focused on end-to-end type safety across routing and data loading increasingly evaluate TanStack Router as an alternative to React Router within that same SPA setup.",
      bestPractices: [
        "Let the framework choice (Next.js/Remix vs plain SPA) drive the routing decision, not the other way around",
        "Default to React Router for a plain SPA given its maturity, ecosystem, and community knowledge",
        "Evaluate TanStack Router specifically when end-to-end type safety for routes/params/loaders is a priority",
        "Avoid introducing a second routing library on top of a framework that already has its own router",
        "Consider the team's existing familiarity and the project's data-loading needs, not just raw feature comparisons",
        "Revisit the choice if the project's needs evolve significantly (e.g. a growing SPA eventually wanting SSR)"
      ],
      tradeOffs: "Advantages of React Router: mature, huge community, extensive real-world battle-testing, now includes data-router APIs. Disadvantages: route type-safety historically weaker than newer alternatives without extra tooling. Advantages of TanStack Router: strong end-to-end type inference for routes/params/loaders, modern built-in caching model. Disadvantages: smaller community, less accumulated production usage. Framework-integrated routing (Next.js/Remix): deeply integrated with SSR/data-loading, but only relevant if you're already committed to that framework.",
      commonMistakes: [
        "Interview trap: comparing routing libraries in isolation without first anchoring the decision on whether the project already uses a full-stack framework with its own built-in router, which usually makes the choice a non-decision",
        "Adding React Router on top of a Next.js/Remix app that already has its own routing system, causing conflicts and redundant complexity",
        "Choosing a niche routing library purely for a feature comparison table without weighing community size/ecosystem maturity for a production team",
        "Ignoring the project's data-loading needs when comparing routers, when this is often the more consequential differentiator today",
        "Assuming all routing libraries provide equivalent type safety by default without checking",
        "Not revisiting the decision as the project's requirements (e.g. adding SSR later) evolve significantly"
      ],
      followUpQuestions: [
        "Why does a framework choice like Next.js typically make the routing-library decision for you?",
        "What does TanStack Router offer that React Router historically didn't, in terms of type safety?",
        "When would you avoid adding React Router to a project entirely?",
        "How do data-router APIs (loaders/actions) change the routing decision compared to older React Router versions?",
        "What would make you reconsider a routing choice mid-project?"
      ],
      relatedTopics: ["Next.js App Router", "Remix", "TanStack Router", "React Router data APIs", "file-based routing"]
    }
  }
];
