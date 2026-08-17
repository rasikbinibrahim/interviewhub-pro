// Hand-authored additions to the Frontend Machine Coding bank, sourced from a
// "Frontend Machine Coding Cheat-Sheet" covering search, listing, API calls,
// event handling, debouncing/throttling, responsive design, modals, polling,
// random numbers and date handling. Only topics not already covered by
// frontend-machine-coding-module1..20-questions.ts are included here (e.g.
// basic modal, infinite scroll, debounced/throttled search and ARIA combobox
// already exist there and are intentionally skipped).
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

export const MOCK_FRONTEND_MACHINE_CODING_EXTRA_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    detail: {
      id: 'mcx-1',
      questionNumber: 'MCX-001',
      title: 'Search an array of objects with includes() vs RegExp',
      difficulty: 'Easy',
      companies: COMPANIES.slice(0, 6),
      frequency: 5,
      category: 'Search Logic',
      part: 'Machine Coding',
      concepts: ['Array.prototype.filter', 'Array.prototype.includes', 'RegExp', 'case-insensitive search'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How would you implement a search/filter over an array of objects, and what is the difference between using Array.prototype.includes() and a RegExp for matching?',
    },
    answer: {
      expectedAnswer:
        'Filter the array and, for each item, test whether the search term appears in one or more of its fields. `includes()` does a plain case-sensitive substring check, so the search term is usually lower-cased first. A RegExp built with the `i` flag gives case-insensitivity for free and can be extended to match whole words, prefixes, or multiple fields with alternation.',
      deepExplanation:
        "`Array.prototype.includes()` is the simplest option: it does exact substring containment and nothing else, so you must normalize case yourself. Building a `RegExp` from the raw search term is more flexible (word-boundary matching, escaping special characters, highlighting matched ranges) but user input must be escaped before being interpolated into a `RegExp`, otherwise characters like `.`, `*`, `(` are interpreted as regex syntax and can throw or produce unintended matches.\n\n```js\nconst data = [\n  { name: \"Alice Johnson\", role: \"Developer\" },\n  { name: \"Bob Smith\", role: \"Designer\" },\n  { name: \"Charlie Brown\", role: \"Project Manager\" },\n];\n\n// Using includes() — must lower-case both sides for case-insensitivity\nfunction searchWithIncludes(term) {\n  const t = term.toLowerCase();\n  return data.filter(\n    (item) => item.name.toLowerCase().includes(t) || item.role.toLowerCase().includes(t)\n  );\n}\n\n// Using RegExp — case-insensitive via the 'i' flag, term must be escaped\nfunction escapeRegExp(str) {\n  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n}\nfunction searchWithRegExp(term) {\n  const regex = new RegExp(escapeRegExp(term), \"i\");\n  return data.filter((item) => regex.test(item.name) || regex.test(item.role));\n}\n```",
      productionExample:
        'This is the core of most client-side "type-ahead" filters over an already-fetched list (settings search, command palettes, small user pickers). For large or server-backed datasets, the same filtering logic moves server-side and the client only sends the debounced search term.',
      bestPractices: [
        'Lower-case (or use the `i` flag) so search is case-insensitive by default',
        'Escape user input before building a RegExp to avoid ReDoS-style or malformed patterns',
        'Search across all relevant fields, not just the first one',
        'Trim whitespace and ignore empty search terms (return the full list)',
        'Debounce the input handler so filtering does not run on every keystroke for large lists',
        'Memoize the filtered result when the component re-renders for unrelated reasons',
      ],
      tradeOffs:
        'Advantages: `includes()` is simple, fast and has no injection risk; RegExp supports word-boundary, prefix and multi-term matching and can highlight matches. Disadvantages: `includes()` cannot do partial/fuzzy or word-boundary matching; unescaped RegExp from user input is a correctness and, in pathological patterns, a performance risk.',
      commonMistakes: [
        'Forgetting to lower-case both the term and the field when using includes()',
        'Interpolating raw user input into `new RegExp()` without escaping special characters',
        'Only searching one field when the UI implies searching "everything"',
        'Re-filtering a huge array on every keystroke without debouncing',
        'Interview trap: `new RegExp(userInput)` can throw a SyntaxError on malformed input (e.g. an unmatched `(`) — this must be handled',
        'Interview trap: RegExp objects with the `g` flag are stateful (`lastIndex`) and reusing one across `.test()` calls can silently skip matches',
      ],
      followUpQuestions: [
        'How would you highlight the matched substring in the UI?',
        'How would you support multi-word or fuzzy search?',
        'How would you move this to a debounced, server-backed search?',
        'How would you make the search accessible to screen reader users?',
      ],
      relatedTopics: ['Debouncing', 'Type-ahead search', 'Accessibility', 'RegExp', 'Array methods'],
    },
  },
  {
    detail: {
      id: 'mcx-2',
      questionNumber: 'MCX-002',
      title: 'Responsive listing layout with Flexbox vs CSS Grid',
      difficulty: 'Easy',
      companies: COMPANIES.slice(1, 7),
      frequency: 4,
      category: 'Listing Logic',
      part: 'Machine Coding',
      concepts: ['Flexbox', 'CSS Grid', 'auto-fill', 'minmax', 'responsive layout'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How would you build a responsive card listing using Flexbox versus CSS Grid, and when would you pick one over the other?',
    },
    answer: {
      expectedAnswer:
        'Flexbox with `flex-wrap: wrap` and a fixed card width naturally reflows cards onto new rows as the viewport shrinks. CSS Grid with `repeat(auto-fill, minmax(220px, 1fr))` achieves the same reflow without JavaScript or media queries, while also keeping columns evenly sized within each row — which Flexbox cannot guarantee once wrapping happens.',
      deepExplanation:
        "Flexbox lays items out along one axis; wrapping just starts a new flex line once items no longer fit, but each line is sized independently, so column edges do not align across rows when card content heights differ. Grid's `auto-fill`/`auto-fit` with `minmax()` defines a track template once, and the browser recomputes the column count as space changes, with true 2D alignment across both rows and columns.\n\n```html\n<div class=\"flex-container\" id=\"flexList\"></div>\n```\n```css\n.flex-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  justify-content: center;\n}\n.flex-card {\n  width: 200px;\n  padding: 1rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n}\n```\n```css\n/* Grid variant — no fixed card count, no media queries needed */\n.catalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 1.5rem;\n}\n```",
      productionExample:
        'Grid with `auto-fill`/`minmax` is the standard approach for product catalogs and dashboard card grids because it stays responsive without JavaScript resize listeners or a matrix of media-query breakpoints; Flexbox remains the right tool for one-dimensional layouts like toolbars, tag lists and nav bars.',
      bestPractices: [
        'Prefer CSS Grid with `auto-fill`/`auto-fit` + `minmax()` for 2D card grids',
        'Use `auto-fit` instead of `auto-fill` when you want remaining columns to stretch instead of leaving empty tracks',
        'Use Flexbox for one-dimensional groups (toolbars, chip lists, nav items)',
        'Set a `gap` instead of margins to avoid uneven spacing at row/column edges',
        'Combine with `object-fit: cover` on images so varying aspect ratios do not distort the grid',
      ],
      tradeOffs:
        'Advantages: Grid gives true 2D alignment and needs no JS/media queries for reflow; Flexbox is simpler and better suited to 1D layouts and content-driven sizing. Disadvantages: Grid has a steeper learning curve (track sizing, auto-fill vs auto-fit); Flexbox wrapping does not align items across lines, which looks inconsistent with variable-height cards.',
      commonMistakes: [
        'Using Flexbox for a card grid and being surprised that rows do not align when card heights differ',
        'Forgetting `minmax()`, which lets Grid tracks either overflow or collapse to zero width',
        'Not setting `object-fit` on images, causing them to stretch and break the grid rhythm',
        'Interview trap: confusing `auto-fill` (keeps empty tracks, useful with a fixed max-width container) with `auto-fit` (collapses empty tracks and stretches existing items)',
      ],
      followUpQuestions: [
        'How would this layout behave with 1 item versus 100 items?',
        'How would you add masonry-style variable card heights?',
        'How would you virtualize this list if it had 10,000 items?',
        'How does this interact with container queries versus media queries?',
      ],
      relatedTopics: ['CSS Grid', 'Flexbox', 'Responsive design', 'Product catalog UI', 'Virtualization'],
    },
  },
  {
    detail: {
      id: 'mcx-3',
      questionNumber: 'MCX-003',
      title: 'Fetch API: GET, POST and PATCH requests',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 7),
      frequency: 5,
      category: 'API Calls',
      part: 'Machine Coding',
      concepts: ['fetch', 'async/await', 'HTTP methods', 'error handling', 'response.ok'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How do you perform GET, POST and PATCH requests with the Fetch API, and how do you correctly handle errors?',
    },
    answer: {
      expectedAnswer:
        '`fetch(url)` defaults to GET; POST/PATCH pass a `method`, a `headers: { "Content-Type": "application/json" }` header and a `body: JSON.stringify(payload)`. Fetch only rejects on network failure — an HTTP error status (404, 500) still resolves successfully, so `response.ok` (or `response.status`) must be checked explicitly and a real `Error` thrown so it lands in the `catch` block.',
      deepExplanation:
        "```js\nasync function getPosts() {\n  const response = await fetch(\"/api/posts?_limit=5\");\n  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);\n  return response.json();\n}\n\nasync function createPost(title, body) {\n  const response = await fetch(\"/api/posts\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ title, body, userId: 1 }),\n  });\n  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);\n  return response.json();\n}\n\nasync function updatePost(id, patch) {\n  const response = await fetch(`/api/posts/${id}`, {\n    method: \"PATCH\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(patch),\n  });\n  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);\n  return response.json();\n}\n```\nPATCH differs from PUT in intent: PATCH sends a partial update (only changed fields), while PUT is expected to replace the whole resource.",
      productionExample:
        'Wrapping these three calls behind a small typed API client (with a shared base URL, auth header injection, and a single `handleResponse` helper) is the standard pattern so every call site does not repeat the same `response.ok` check.',
      bestPractices: [
        'Always check `response.ok` before calling `.json()`',
        'Set `Content-Type: application/json` explicitly when sending a JSON body',
        'Centralize error handling in one helper instead of repeating it per call site',
        'Distinguish network errors (fetch rejects) from HTTP errors (fetch resolves, status is non-2xx)',
        'Use PATCH for partial updates and PUT only when replacing the full resource',
        'Never trust `response.json()` to succeed blindly — a non-JSON error body will throw inside the try/catch',
      ],
      tradeOffs:
        'Advantages: Fetch is a native, promise-based API with no extra dependency, works with async/await cleanly, and supports streaming/AbortController. Disadvantages: no automatic JSON parsing/error throwing on bad status codes, no built-in request/response interceptors or timeout, so libraries like Axios or a thin wrapper are often added on top.',
      commonMistakes: [
        'Assuming fetch throws on a 404/500 response the way Axios does — it does not',
        'Forgetting the `Content-Type` header, causing the server to fail to parse the JSON body',
        'Not JSON.stringify-ing the body before sending it',
        'Interview trap: `await fetch(url)` "succeeding" (resolving) is not the same as the request succeeding — you must check `response.ok`',
        'Swallowing errors silently instead of surfacing them to the UI',
      ],
      followUpQuestions: [
        'How would you add a request timeout using AbortController?',
        'How would you retry a failed request with backoff?',
        'How would you centralize auth-token injection for every request?',
        'What is the difference between PATCH and PUT semantically?',
      ],
      relatedTopics: ['AbortController', 'Promise.all', 'REST APIs', 'Error handling', 'Async/await'],
    },
  },
  {
    detail: {
      id: 'mcx-4',
      questionNumber: 'MCX-004',
      title: 'Parallel API calls with Promise.all()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 6),
      frequency: 5,
      category: 'API Calls',
      part: 'Machine Coding',
      concepts: ['Promise.all', 'parallel requests', 'fail-fast', 'async/await'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question:
        'How would you fetch multiple independent resources in parallel using Promise.all(), and what happens if one of the requests fails?',
    },
    answer: {
      expectedAnswer:
        '`Promise.all()` runs all requests concurrently (not sequentially awaited one-by-one) and resolves with an array of results once every promise resolves — but it is fail-fast: if any single promise rejects, `Promise.all` immediately rejects with that reason and the successful results of the other requests are discarded from the resolved value.',
      deepExplanation:
        "```js\nasync function fetchDashboardData() {\n  try {\n    const [posts, users] = await Promise.all([\n      fetch(\"/api/posts\").then((res) => res.json()),\n      fetch(\"/api/users\").then((res) => res.json()),\n    ]);\n    return { posts, users };\n  } catch (error) {\n    // Fails as soon as ANY one request rejects — the other's result is lost here\n    console.error(\"One of the parallel requests failed:\", error.message);\n    throw error;\n  }\n}\n```\nBecause the requests are started together (not `await`ed one at a time), total latency is roughly the slowest single request rather than the sum of all of them — the key win over sequential awaiting.",
      productionExample:
        'Dashboard/landing pages that need several independent datasets (user profile, notifications, feed) fire them with `Promise.all` to minimize time-to-render, then fall back to `Promise.allSettled` when partial data is acceptable and one failing widget should not block the rest of the page.',
      bestPractices: [
        'Use `Promise.all` only when every result is required for the UI to be meaningful',
        'Start independent requests together instead of awaiting them sequentially',
        'Add per-request error context so a rejection is traceable to which call failed',
        'Consider `Promise.allSettled` when partial success is acceptable',
        'Set a timeout/AbortController per request so one hanging call cannot stall the whole group',
      ],
      tradeOffs:
        'Advantages: minimizes total latency versus sequential awaits; simple all-or-nothing semantics. Disadvantages: fail-fast behavior discards successful results when even one request fails, which is often not what a dashboard actually wants.',
      commonMistakes: [
        'Awaiting requests one at a time (`await a(); await b();`) instead of starting them together, turning parallel work sequential',
        'Assuming `Promise.all` gives you the successful results even when one promise rejects — it does not',
        'Not handling which specific request failed, since the caught error only carries the first rejection reason',
        'Interview trap: `Promise.all([...])` starts all promises immediately when the array is constructed, not when `Promise.all` is called — the "parallel" behavior comes from not awaiting each one individually',
      ],
      followUpQuestions: [
        'How does this differ from Promise.allSettled?',
        'How would you add a per-request timeout?',
        'How would you retry only the failed request instead of all of them?',
        'How does Promise.race differ from Promise.all here?',
      ],
      relatedTopics: ['Promise.allSettled', 'Promise.race', 'AbortController', 'Concurrent requests'],
    },
  },
  {
    detail: {
      id: 'mcx-5',
      questionNumber: 'MCX-005',
      title: 'Parallel API calls with Promise.allSettled()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(2, 8),
      frequency: 4,
      category: 'API Calls',
      part: 'Machine Coding',
      concepts: ['Promise.allSettled', 'partial failure', 'status: fulfilled/rejected'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question:
        'How would you fetch multiple independent resources where some requests are allowed to fail, using Promise.allSettled()?',
    },
    answer: {
      expectedAnswer:
        '`Promise.allSettled()` waits for every promise to complete (either resolve or reject) and never rejects itself — it resolves with an array of `{ status: "fulfilled", value }` or `{ status: "rejected", reason }` objects, one per input promise, in the same order, so each result must be checked individually.',
      deepExplanation:
        '```js\nasync function fetchDashboardWidgets() {\n  const results = await Promise.allSettled([\n    fetch("/api/posts").then((res) => res.json()),\n    fetch("/api/users").then((res) => res.json()),\n    fetch("/api/invalid-endpoint").then((res) => {\n      if (!res.ok) throw new Error("Invalid endpoint");\n      return res.json();\n    }),\n  ]);\n\n  results.forEach((result, index) => {\n    if (result.status === "fulfilled") {\n      console.log(`Widget ${index + 1} loaded:`, result.value);\n    } else {\n      console.warn(`Widget ${index + 1} failed:`, result.reason.message);\n    }\n  });\n}\n```\nUnlike `Promise.all`, a single failing widget does not prevent the other, successful widgets from being used to render the page.',
      productionExample:
        "Dashboards composed of independent widgets typically use `allSettled` so a broken analytics API doesn't blank out the rest of the page — each widget renders its own data or its own error/empty state based on that entry's status.",
      bestPractices: [
        'Use `allSettled` whenever partial data is more useful to the user than no data',
        'Always branch on `result.status` before touching `.value`/`.reason`',
        'Render an explicit error/empty state per failed widget rather than silently omitting it',
        'Log `result.reason` for failed entries to keep failures observable',
        'Keep the input array order stable so results map back to the right widget by index',
      ],
      tradeOffs:
        'Advantages: never short-circuits on a single failure, gives full visibility into which requests succeeded or failed. Disadvantages: more verbose per-result handling than `Promise.all`; not appropriate when every result really is required (e.g. auth check) since a "successful" resolve does not mean all data is present.',
      commonMistakes: [
        'Treating `Promise.allSettled` results like `Promise.all` results and accessing `.value` without checking `status` first',
        'Not surfacing which specific widget failed to the user',
        'Using `allSettled` for requests that are actually all-or-nothing (e.g. dependent writes), where `Promise.all` fail-fast is the correct semantics',
        'Interview trap: `Promise.allSettled` itself never rejects — wrapping it in try/catch is unnecessary unless the promises array construction itself can throw',
      ],
      followUpQuestions: [
        'When would you choose allSettled over Promise.all?',
        'How would you retry only the rejected entries?',
        'How would you surface partial failures in the UI without alarming the user?',
        'How does this compare to Promise.any?',
      ],
      relatedTopics: ['Promise.all', 'Promise.any', 'Error boundaries', 'Dashboard architecture'],
    },
  },
  {
    detail: {
      id: 'mcx-6',
      questionNumber: 'MCX-006',
      title: 'DOM event handling fundamentals',
      difficulty: 'Easy',
      companies: COMPANIES.slice(0, 6),
      frequency: 4,
      category: 'DOM Event Handling',
      part: 'Machine Coding',
      concepts: ['addEventListener', 'click', 'dblclick', 'keydown', 'mousemove'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How do you wire up click, double-click, keydown and mousemove event listeners, and what should you watch out for with high-frequency events like mousemove?',
    },
    answer: {
      expectedAnswer:
        'Attach listeners with `addEventListener(type, handler)` on the relevant element (or `document` for global key/mouse tracking). Discrete events like `click`/`dblclick`/`keydown` fire once per interaction and are cheap to handle directly; continuous events like `mousemove`/`scroll`/`resize` can fire dozens of times per second and should be throttled or debounced before doing expensive work in the handler.',
      deepExplanation:
        '```js\ndocument.getElementById("clickBtn").addEventListener("click", () => {\n  console.log("Button Clicked");\n});\n\ndocument.getElementById("dblClickBtn").addEventListener("dblclick", () => {\n  console.log("Button Double Clicked");\n});\n\ndocument.addEventListener("keydown", (e) => {\n  console.log(`Key Pressed: "${e.key}"`);\n});\n\n// mousemove is noisy — throttle it before doing real work\nlet lastLog = 0;\ndocument.addEventListener("mousemove", (e) => {\n  const now = Date.now();\n  if (now - lastLog < 100) return; // throttle to ~10 events/sec\n  lastLog = now;\n  console.log(`Mouse at X: ${e.clientX}, Y: ${e.clientY}`);\n});\n```\n`e.key` (not the deprecated `e.keyCode`) is the standard way to read which key was pressed; comparing against the string value (`"Enter"`, `"Escape"`, `"ArrowDown"`) is portable across keyboard layouts.',
      productionExample:
        'Drag-to-reorder UIs, custom cursors and hover-preview components all listen to `mousemove`, but throttle or use `requestAnimationFrame` to batch the resulting DOM writes so they stay in sync with the browser paint cycle instead of layout-thrashing on every pixel of movement.',
      bestPractices: [
        'Use `e.key` instead of the deprecated `e.keyCode`/`e.which`',
        'Throttle or `requestAnimationFrame`-batch high-frequency events like mousemove/scroll/resize',
        'Remove listeners (`removeEventListener`) when a component unmounts to avoid leaks',
        'Attach global key listeners on `document`, but element-scoped ones on the element itself',
        'Avoid doing synchronous layout reads/writes inside a mousemove handler (causes layout thrashing)',
      ],
      tradeOffs:
        'Advantages: native, dependency-free, precise control over what runs per event type. Disadvantages: unthrottled high-frequency listeners can visibly degrade scroll/paint performance; forgetting cleanup causes listener leaks in SPA navigation.',
      commonMistakes: [
        'Doing expensive DOM work directly inside an unthrottled mousemove/scroll handler',
        'Using `e.keyCode` instead of `e.key`, which breaks for many international keyboard layouts',
        'Forgetting to remove listeners when the element is removed, leaking memory in long-lived SPAs',
        'Interview trap: `dblclick` fires two `click` events first, then the `dblclick` event — handlers on both can double-fire logic if not designed for it',
      ],
      followUpQuestions: [
        'How would you throttle mousemove using requestAnimationFrame instead of a timer?',
        'How would you clean up listeners in a React component?',
        'What is the difference between event capturing and bubbling here?',
        'How would you detect a long-press versus a click?',
      ],
      relatedTopics: ['Throttling', 'Event delegation', 'requestAnimationFrame', 'Keyboard accessibility'],
    },
  },
  {
    detail: {
      id: 'mcx-7',
      questionNumber: 'MCX-007',
      title: 'Event delegation for a dynamic grid of cards',
      difficulty: 'Medium',
      companies: COMPANIES.slice(1, 7),
      frequency: 5,
      category: 'DOM Event Handling',
      part: 'Machine Coding',
      concepts: ['Event delegation', 'event bubbling', 'closest()', 'dataset'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question:
        'How would you handle clicks on a large, dynamically-changing grid of cards using event delegation instead of attaching a listener per card?',
    },
    answer: {
      expectedAnswer:
        "Attach a single click listener on the stable parent container, and inside it use `event.target.closest(\".card\")` to find which card (if any) was actually clicked, reading identifying data from `dataset`. This relies on event bubbling: a click on a descendant of `.card` still bubbles up to the container's listener.",
      deepExplanation:
        '```js\nconst grid = document.getElementById("grid");\n\ngrid.addEventListener("click", (event) => {\n  const card = event.target.closest(".card");\n  if (!card) return; // click landed outside any card (e.g. the gap)\n  const id = card.dataset.id;\n  console.log(`You clicked on Card ${id}`);\n});\n```\n`closest()` walks up from the actual click target through ancestors until it finds a match (or returns `null`), which correctly handles clicks on nested children inside a card (an icon, a span of text) — a plain `event.target === card` check would miss those.',
      productionExample:
        "Delegation is the standard pattern for lists/grids/tables whose rows are added, removed or re-rendered dynamically (virtualized lists, live search results, task boards): one listener survives DOM churn, versus re-attaching per-row listeners on every render which is both slower and leak-prone.",
      bestPractices: [
        'Attach the listener on a stable ancestor, not on items that get re-created',
        'Use `event.target.closest(selector)` rather than `event.target === el` to handle clicks on nested children',
        'Store identifiers in `data-*` attributes and read them via `.dataset`',
        'Bail out early (`if (!card) return`) when the click did not land on a matching element',
        'Prefer delegation over per-item listeners whenever the list can be large or dynamic',
      ],
      tradeOffs:
        'Advantages: one listener regardless of item count, automatically works for items added later, avoids per-item listener leaks. Disadvantages: requires bubbling (breaks for events that do not bubble, e.g. `focus`/`blur` without using their bubbling counterparts `focusin`/`focusout`); slightly more indirection than a direct per-item handler.',
      commonMistakes: [
        'Attaching a new listener to every card on every render instead of delegating once to the parent',
        'Checking `event.target === card` instead of `closest()`, missing clicks on a child element inside the card',
        'Forgetting that some events (`focus`, `blur`, `mouseenter`, `mouseleave`) do not bubble and need their bubbling variants for delegation',
        'Interview trap: `event.target` is the deepest element actually clicked, while `event.currentTarget` is the element the listener is attached to — mixing these up gives the wrong node',
      ],
      followUpQuestions: [
        'Which events do not bubble, and how do you delegate for them anyway?',
        'How would you support keyboard activation (Enter/Space) alongside click delegation?',
        'How does this interact with `stopPropagation()` called by a child element?',
        'How would you delegate for both click and touch in one handler?',
      ],
      relatedTopics: ['Event bubbling', 'Event capturing', 'closest()', 'Virtualized lists'],
    },
  },
  {
    detail: {
      id: 'mcx-8',
      questionNumber: 'MCX-008',
      title: 'Mobile-first responsive design with media queries',
      difficulty: 'Easy',
      companies: COMPANIES.slice(0, 5),
      frequency: 4,
      category: 'Responsive Design',
      part: 'Machine Coding',
      concepts: ['@media', 'mobile-first', 'min-width', 'breakpoints'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How do you implement a mobile-first responsive layout using CSS media queries, and why is min-width generally preferred over max-width?',
    },
    answer: {
      expectedAnswer:
        'Write the base (unqualified) styles for the smallest viewport first, then progressively layer on `@media (min-width: ...)` blocks that override or extend styles as the viewport grows. This is "mobile-first" because the default styles — the ones every browser downloads and parses first, including on mobile — are the lightweight mobile styles, and larger-screen enhancements are opt-in additions rather than the default.',
      deepExplanation:
        '```css\n/* Default (mobile) styles */\n.box {\n  background-color: blue;\n  font-size: 1rem;\n}\n\n/* Tablet: 501px and up */\n@media (min-width: 501px) {\n  .box {\n    background-color: green;\n    font-size: 1.2rem;\n  }\n}\n\n/* Desktop: 701px and up */\n@media (min-width: 701px) {\n  .box {\n    background-color: red;\n    font-size: 1.5rem;\n  }\n}\n```\nWith `min-width`, each breakpoint only needs to declare what changes going *up* in size, since it inherits everything from the base rules below it (normal CSS cascade). A `max-width`-first approach instead has to declare the full desktop layout as the default and then override it downward for every smaller breakpoint, which tends to fight the cascade and duplicate more rules.',
      productionExample:
        "Design systems typically define a small set of shared breakpoint tokens (e.g. 640px/768px/1024px/1280px) used consistently via min-width media queries (or container queries for component-level responsiveness) so layout logic stays centralized instead of ad hoc per component.",
      bestPractices: [
        'Define base styles for the smallest/mobile viewport with no media query',
        'Layer larger-screen styles with `min-width` media queries as progressive enhancement',
        'Centralize breakpoint values (CSS custom properties or a shared token) instead of hardcoding pixel values everywhere',
        'Prefer relative units (rem, %, fr) inside breakpoints so scaling stays consistent',
        'Consider container queries for components whose layout should depend on their container, not the viewport',
      ],
      tradeOffs:
        'Advantages: mobile-first + min-width matches how most traffic loads (mobile-heavy) and keeps the cascade additive rather than overriding; easier to reason about incremental enhancement. Disadvantages: legacy desktop-first codebases using max-width require more rework to migrate; very complex layouts can still end up with many breakpoint-specific overrides regardless of direction.',
      commonMistakes: [
        'Writing desktop styles as the default and trying to squeeze them down with max-width overrides for mobile',
        'Using inconsistent, one-off pixel breakpoints scattered across files instead of shared tokens',
        'Testing only at a couple of exact device widths instead of resizing continuously to catch awkward in-between ranges',
        'Interview trap: `@media (min-width: 501px)` and `@media (min-width: 500px)` in the same stylesheet with overlapping rules can produce off-by-one flicker at the boundary — pick boundary values deliberately',
      ],
      followUpQuestions: [
        'How do container queries differ from media queries?',
        'How would you avoid a "flash" of unstyled mobile layout on a fast desktop connection?',
        'How would you test this across many device sizes efficiently?',
        'When would you reach for JavaScript-based responsive logic (matchMedia) instead of pure CSS?',
      ],
      relatedTopics: ['window.matchMedia', 'Container queries', 'CSS Grid', 'Design tokens'],
    },
  },
  {
    detail: {
      id: 'mcx-9',
      questionNumber: 'MCX-009',
      title: 'API data polling with setInterval',
      difficulty: 'Medium',
      companies: COMPANIES.slice(2, 8),
      frequency: 4,
      category: 'API Data Polling',
      part: 'Machine Coding',
      concepts: ['setInterval', 'clearInterval', 'polling', 'immediate-then-interval'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question:
        'How would you implement polling of an API endpoint on a fixed interval, including starting, stopping and handling in-flight failures?',
    },
    answer: {
      expectedAnswer:
        'Call the fetch immediately on start (so the UI is not stale for the first interval), then schedule repeated calls with `setInterval`, keeping the interval ID so it can be cleared. Guard against overlapping calls if a request can take longer than the interval, and decide explicitly whether a failed poll should stop polling or just log and retry on the next tick.',
      deepExplanation:
        '```js\nlet pollingId = null;\n\nfunction startPolling(url, interval = 5000) {\n  if (pollingId) clearInterval(pollingId); // avoid stacking multiple intervals\n\n  const poll = async () => {\n    try {\n      const response = await fetch(url);\n      const data = await response.json();\n      console.log("Polled Data:", data.title);\n    } catch (error) {\n      console.error("Polling error:", error);\n      // Decide deliberately: keep polling, or clearInterval(pollingId) to stop on error\n    }\n  };\n\n  poll(); // fire immediately instead of waiting one full interval\n  pollingId = setInterval(poll, interval);\n}\n\nfunction stopPolling() {\n  if (pollingId) {\n    clearInterval(pollingId);\n    pollingId = null;\n  }\n}\n```\nA subtler production concern: `setInterval` schedules the next call regardless of whether the previous fetch has resolved, so a slow endpoint can lead to overlapping in-flight requests — a recursive `setTimeout` that only reschedules after the previous call finishes avoids this.',
      productionExample:
        'Live dashboards, notification badges and job-status screens (e.g. "your export is processing") poll an endpoint until a terminal state is reached, then stop — usually with capped/backoff intervals and a hard timeout so a stuck backend does not poll forever.',
      bestPractices: [
        'Fire the first request immediately, not after waiting one full interval',
        'Store the interval/timeout ID so polling can be explicitly stopped',
        'Prefer a self-rescheduling `setTimeout` over `setInterval` when a request could exceed the interval, to avoid overlap',
        'Stop polling when the component unmounts or the tab is hidden (`document.visibilitychange`) to save resources',
        'Add a max retry count or backoff for consecutive failures instead of polling forever on a broken endpoint',
      ],
      tradeOffs:
        'Advantages: simple way to keep UI reasonably fresh without a persistent connection; works everywhere fetch works. Disadvantages: wastes requests/battery compared to WebSockets or SSE for truly real-time needs; naive `setInterval` can overlap requests under slow networks.',
      commonMistakes: [
        'Forgetting to call `clearInterval` on unmount/navigation, leaking a background timer that keeps hitting the API',
        'Calling `startPolling` multiple times without clearing the previous interval first, causing duplicate concurrent polls',
        'Using `setInterval` for a slow/variable-latency endpoint where requests can overlap and arrive out of order',
        'Interview trap: `setInterval(fn, ms)` schedules the next call `ms` after the previous call *started*, not after it finished — this is the overlap risk a recursive setTimeout avoids',
      ],
      followUpQuestions: [
        'How would you switch this to a self-rescheduling setTimeout to avoid overlap?',
        'How would you pause polling when the browser tab is backgrounded?',
        'How would you add exponential backoff on repeated failures?',
        'When would you use WebSockets or Server-Sent Events instead of polling?',
      ],
      relatedTopics: ['setTimeout vs setInterval', 'WebSockets', 'Server-Sent Events', 'Page Visibility API'],
    },
  },
  {
    detail: {
      id: 'mcx-10',
      questionNumber: 'MCX-010',
      title: 'Random number generation (integer range and float range)',
      difficulty: 'Easy',
      companies: COMPANIES.slice(0, 5),
      frequency: 3,
      category: 'Random Number Generation',
      part: 'Machine Coding',
      concepts: ['Math.random', 'Math.floor', 'Math.ceil', 'inclusive range'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'How would you generate a random integer within an inclusive range, and a random floating-point number within a range?',
    },
    answer: {
      expectedAnswer:
        '`Math.random()` returns a float in `[0, 1)`. Scaling it by `(max - min + 1)`, flooring, then adding `min` gives a uniformly distributed integer inclusive of both `min` and `max`. For a float range, scaling by `(max - min)` and adding `min` (no flooring) gives a value in `[min, max)`.',
      deepExplanation:
        '```js\nfunction getRandomInteger(min, max) {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  // Both min and max are inclusive\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nconsole.log(getRandomInteger(1, 100)); // e.g. 35\n\nfunction getRandomFloat(min, max) {\n  return Math.random() * (max - min) + min;\n}\nconsole.log(getRandomFloat(1, 10)); // e.g. 4.6345...\n```\nThe `+1` in the integer version is what makes `max` reachable: without it, `Math.floor(Math.random() * (max - min)) + min` can never produce `max` itself, since `Math.random()` never returns exactly `1`. `Math.ceil`/`Math.floor` on the inputs guard against non-integer `min`/`max` being passed in.',
      productionExample:
        'Used for jittering retry/backoff delays (avoiding thundering-herd retries), shuffling arrays (Fisher–Yates draws a random index each pass), sampling mock/demo data, and generating non-cryptographic IDs for UI-only purposes.',
      bestPractices: [
        'Always add 1 in the integer formula so the upper bound is actually reachable',
        'Normalize `min`/`max` with `Math.ceil`/`Math.floor` in case non-integers are passed',
        'Never use `Math.random()` for anything security-sensitive (tokens, passwords) — use `crypto.getRandomValues()` instead',
        'Validate `min <= max` before generating to avoid silently wrong ranges',
        'Document whether a range is inclusive or exclusive at both ends in the function name/docs',
      ],
      tradeOffs:
        'Advantages: `Math.random()` is simple, synchronous, available everywhere. Disadvantages: not cryptographically secure and not guaranteed uniformly random across all engines at the bit level — unsuitable for security or fairness-critical randomness (lotteries, tokens).',
      commonMistakes: [
        'Forgetting the `+1`, which makes the maximum value unreachable',
        'Using `Math.random()` to generate security tokens or passwords',
        'Not handling `min > max` being passed by mistake',
        'Interview trap: `Math.round(Math.random() * (max - min)) + min` looks correct but skews the distribution — the endpoints get roughly half the probability of the middle values compared to using `Math.floor` with the `+1` adjustment',
      ],
      followUpQuestions: [
        'How would you generate a cryptographically secure random number instead?',
        'How would you generate a random number that excludes certain values?',
        'How would you shuffle an array using this (Fisher–Yates)?',
        'How would you test that this function is uniformly distributed?',
      ],
      relatedTopics: ['crypto.getRandomValues', 'Fisher–Yates shuffle', 'Exponential backoff jitter'],
    },
  },
  {
    detail: {
      id: 'mcx-11',
      questionNumber: 'MCX-011',
      title: 'Date difference and locale-aware date formatting',
      difficulty: 'Medium',
      companies: COMPANIES.slice(1, 7),
      frequency: 4,
      category: 'Date Handling',
      part: 'Machine Coding',
      concepts: ['Date arithmetic', 'toLocaleDateString', 'Intl.DateTimeFormat', 'milliseconds'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question:
        'How would you compute the difference between two dates in days/hours/minutes, and how would you format a date for display in a locale-aware way?',
    },
    answer: {
      expectedAnswer:
        "Subtracting one `Date` from another (or `.getTime()`) yields a millisecond difference; `Math.abs` handles either date being earlier, and dividing down through hours/minutes/days with `Math.floor`/modulo breaks that total into a human-readable breakdown. For display, `toLocaleDateString()`/`toLocaleTimeString()` give quick locale-aware formatting, while `Intl.DateTimeFormat` gives full control over which parts (weekday, month name, etc.) are shown.",
      deepExplanation:
        '```js\nfunction getDateDifference(date1, date2) {\n  const diffMs = Math.abs(date2 - date1); // Date - Date = milliseconds\n  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));\n  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);\n  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);\n  return { days, hours, minutes };\n}\n\nconst d1 = new Date("2025-06-10T10:00:00");\nconst d2 = new Date("2025-06-13T12:30:00");\nconsole.log(getDateDifference(d1, d2)); // { days: 3, hours: 2, minutes: 30 }\n\n// Locale-aware formatting\nconst now = new Date();\nconsole.log(now.toLocaleDateString()); // e.g. "10/3/2025" (en-US)\nconsole.log(now.toLocaleTimeString()); // e.g. "2:34:59 AM"\n\nconst options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };\nconsole.log(new Intl.DateTimeFormat("en-US", options).format(now));\n// e.g. "Friday, October 3, 2025"\n```\n`Date - Date` works because subtraction coerces both operands via `valueOf()` (milliseconds since epoch); template-literal or string concatenation would instead coerce via `toString()` and produce garbage.',
      productionExample:
        'Relative-time UI ("3 days ago", "starts in 2h 30m") and countdown/scheduling features compute this millisecond delta, while any user-facing date label goes through `Intl.DateTimeFormat` (or a library built on it) so it respects the viewer\'s locale and timezone instead of a hardcoded format.',
      bestPractices: [
        'Use `Math.abs()` on the millisecond difference so argument order does not flip the sign unexpectedly',
        'Prefer `Intl.DateTimeFormat` over manual string building for locale-correct output',
        'Be explicit about timezone (`timeZone` option) when the audience is not all in the same one',
        'Avoid parsing ambiguous date strings (`"06/10/2025"`) — prefer ISO 8601 (`"2025-06-10"`) to avoid locale-dependent parsing bugs',
        'For relative time ("2 days ago"), use `Intl.RelativeTimeFormat` instead of hand-rolled logic',
      ],
      tradeOffs:
        'Advantages: native Date/Intl APIs need no dependency and handle locale/timezone formatting correctly. Disadvantages: the native `Date` API is famously awkward for arithmetic beyond simple diffs (month-length edge cases, DST transitions) — complex calendar math is usually better served by a library (date-fns, Luxon).',
      commonMistakes: [
        'Concatenating dates into strings for arithmetic instead of subtracting `Date` objects/timestamps',
        'Not calling `Math.abs()`, producing a negative day count when arguments are passed in the "wrong" order',
        'Parsing locale-formatted strings (`"06/10/2025"`) with `new Date(...)`, which is ambiguous (MM/DD vs DD/MM) and engine-dependent',
        'Interview trap: subtracting two Date objects (`date2 - date1`) works because of numeric coercion, but `` `${date2 - date1}` `` inside a template literal without the subtraction already done separately can trip people up on operator precedence',
      ],
      followUpQuestions: [
        'How would you handle Daylight Saving Time transitions in this calculation?',
        'How would you display this as relative time ("3 days ago")?',
        'How would you make the formatting respect a specific timezone, not the browser\'s local one?',
        'Why is parsing "06/10/2025" with `new Date()` risky?',
      ],
      relatedTopics: ['Intl.RelativeTimeFormat', 'Timezone handling', 'date-fns', 'ISO 8601'],
    },
  },
];
