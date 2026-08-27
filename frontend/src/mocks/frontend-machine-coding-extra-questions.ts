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
        "`Array.prototype.includes()` is the simplest option: it does exact substring containment and nothing else, so you must normalize case yourself. Building a `RegExp` from the raw search term is more flexible (word-boundary matching, escaping special characters, highlighting matched ranges) but user input must be escaped before being interpolated into a `RegExp`, otherwise characters like `.`, `*`, `(` are interpreted as regex syntax and can throw or produce unintended matches.\n\n```js\nconst data = [\n  { name: \\\n\nStep 1 — Understand the topic.\nQuestion focus: Search an array of objects with includes() vs RegExp.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype Item = { name: string; role: string };\n\nfunction searchManual(\n  items: Item[],\n  term: string,\n): Item[] {\n  const query = term.trim().toLowerCase();\n  if (!query) return items;\n\n  const result: Item[] = [];\n\n  for (const item of items) {\n    if (\n      item.name.toLowerCase().includes(query) ||\n      item.role.toLowerCase().includes(query)\n    ) {\n      result.push(item);\n    }\n  }\n\n  return result;\n}\n\nconsole.log(\n  searchManual(\n    [\n      { name: \"Alice\", role: \"Developer\" },\n      { name: \"Bob\", role: \"Designer\" },\n    ],\n    \"dev\",\n  ),\n);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = items.filter(\n  ({ name, role }) =>\n    `${name} ${role}`\n      .toLowerCase()\n      .includes(searchTerm.trim().toLowerCase()),\n);\n```\n\nStep 5 — Example result:\n```text\n[{ name: \"Alice\", role: \"Developer\" }]\n```\n\nStep 6 — Complexity / trade-off:\nManual scan: O(n) time. RegExp can be more expressive, but escape user input before constructing it.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "This is the core of most client-side \"type-ahead\" filters over an already-fetched list (settings search, command palettes, small user pickers). For large or server-backed datasets, the same filtering logic moves server-side and the client only sends the debounced search term.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "Flexbox lays items out along one axis; wrapping just starts a new flex line once items no longer fit, but each line is sized independently, so column edges do not align across rows when card content heights differ. Grid's `auto-fill`/`auto-fit` with `minmax()` defines a track template once, and the browser recomputes the column count as space changes, with true 2D alignment across both rows and columns.\n\n```html\n<div class=\\\n\nStep 1 — Understand the topic.\nQuestion focus: Responsive listing layout with Flexbox vs CSS Grid.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype Card = {\n  id: number;\n  title: string;\n};\n\nfunction chunkCards(\n  cards: Card[],\n  columns: number,\n): Card[][] {\n  const rows: Card[][] = [];\n\n  for (let i = 0; i < cards.length; i += columns) {\n    const row: Card[] = [];\n\n    for (\n      let j = i;\n      j < i + columns && j < cards.length;\n      j += 1\n    ) {\n      row.push(cards[j]);\n    }\n\n    rows.push(row);\n  }\n\n  return rows;\n}\n\nconsole.log(\n  chunkCards(\n    [\n      { id: 1, title: \"A\" },\n      { id: 2, title: \"B\" },\n      { id: 3, title: \"C\" },\n    ],\n    2,\n  ),\n);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\n.catalog {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fill, minmax(220px, 1fr));\n  gap: 1rem;\n}\n```\n\nStep 5 — Example result:\n```text\n2-column layout with the last row containing one item\n```\n\nStep 6 — Complexity / trade-off:\nJavaScript should not calculate responsive layout; CSS Grid/Flexbox handles reflow more efficiently.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Grid with `auto-fill`/`minmax` is the standard approach for product catalogs and dashboard card grids because it stays responsive without JavaScript resize listeners or a matrix of media-query breakpoints; Flexbox remains the right tool for one-dimensional layouts like toolbars, tag lists and nav bars.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nasync function getPosts() {\n  const response = await fetch(\\\n\nStep 1 — Understand the topic.\nQuestion focus: Fetch API: GET, POST and PATCH requests.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype ApiResult = {\n  ok: boolean;\n  status: number;\n  json(): Promise<unknown>;\n};\n\nasync function request(\n  response: ApiResult,\n): Promise<unknown> {\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}`);\n  }\n\n  return response.json();\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst response = await fetch(\"/api/users\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n  },\n  body: JSON.stringify(payload),\n});\n\nif (!response.ok) {\n  throw new Error(`HTTP ${response.status}`);\n}\n\nconst data = await response.json();\n```\n\nStep 5 — Example result:\n```text\nsuccessful parsed response or thrown HTTP error\n```\n\nStep 6 — Complexity / trade-off:\nFetch is dependency-free; centralize response/error handling in a typed client.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Wrapping these three calls behind a small typed API client (with a shared base URL, auth header injection, and a single `handleResponse` helper) is the standard pattern so every call site does not repeat the same `response.ok` check.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nasync function fetchDashboardData() {\n  try {\n    const [posts, users] = await Promise.all([\n      fetch(\\\n\nStep 1 — Understand the topic.\nQuestion focus: Parallel API calls with Promise.all().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction promiseAllManual<T>(\n  promises: Array<Promise<T> | T>,\n): Promise<T[]> {\n  return new Promise((resolve, reject) => {\n    const results: T[] = [];\n    let completed = 0;\n\n    if (promises.length === 0) {\n      resolve([]);\n      return;\n    }\n\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise).then(\n        value => {\n          results[index] = value;\n          completed += 1;\n\n          if (completed === promises.length) {\n            resolve(results);\n          }\n        },\n        reject,\n      );\n    });\n  });\n}\n\npromiseAllManual([\n  Promise.resolve(10),\n  20,\n  Promise.resolve(30),\n]).then(console.log);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst [users, posts] =\n  await Promise.all([\n    fetchUsers(),\n    fetchPosts(),\n  ]);\n```\n\nStep 5 — Example result:\n```text\n[10, 20, 30]\n```\n\nStep 6 — Complexity / trade-off:\nFail-fast: one rejection rejects the combined promise. Results are kept in input order.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Dashboard/landing pages that need several independent datasets (user profile, notifications, feed) fire them with `Promise.all` to minimize time-to-render, then fall back to `Promise.allSettled` when partial data is acceptable and one failing widget should not block the rest of the page.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nasync function fetchDashboardWidgets() {\n  const results = await Promise.allSettled([\n    fetch(\"/api/posts\").then((res) => res.json()),\n    fetch(\"/api/users\").then((res) => res.json()),\n    fetch(\"/api/invalid-endpoint\").then((res) => {\n      if (!res.ok) throw new Error(\"Invalid endpoint\");\n      return res.json();\n    }),\n  ]);\n\n  results.forEach((result, index) => {\n    if (result.status === \"fulfilled\") {\n      console.log(`Widget ${index + 1} loaded:`, result.value);\n    } else {\n      console.warn(`Widget ${index + 1} failed:`, result.reason.message);\n    }\n  });\n}\n```\nUnlike `Promise.all`, a single failing widget does not prevent the other, successful widgets from being used to render the page.\n\nStep 1 — Understand the topic.\nQuestion focus: Parallel API calls with Promise.allSettled().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction allSettledManual<T>(\n  promises: Promise<T>[],\n): Promise<\n  PromiseSettledResult<T>[]\n> {\n  return Promise.all(\n    promises.map(promise =>\n      promise.then(\n        value => ({\n          status: \"fulfilled\" as const,\n          value,\n        }),\n        reason => ({\n          status: \"rejected\" as const,\n          reason,\n        }),\n      ),\n    ),\n  );\n}\n\nallSettledManual([\n  Promise.resolve(1),\n  Promise.reject(new Error(\"failed\")),\n]).then(console.log);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst results =\n  await Promise.allSettled([\n    fetchUsers(),\n    fetchPosts(),\n  ]);\n\nfor (const result of results) {\n  if (result.status === \"fulfilled\") {\n    console.log(result.value);\n  } else {\n    console.error(result.reason);\n  }\n}\n```\n\nStep 5 — Example result:\n```text\nfulfilled and rejected entries are both returned\n```\n\nStep 6 — Complexity / trade-off:\nO(n) result processing; prefer allSettled when partial success is acceptable.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Dashboards composed of independent widgets typically use `allSettled` so a broken analytics API doesn't blank out the rest of the page — each widget renders its own data or its own error/empty state based on that entry's status.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\ndocument.getElementById(\"clickBtn\").addEventListener(\"click\", () => {\n  console.log(\"Button Clicked\");\n});\n\ndocument.getElementById(\"dblClickBtn\").addEventListener(\"dblclick\", () => {\n  console.log(\"Button Double Clicked\");\n});\n\ndocument.addEventListener(\"keydown\", (e) => {\n  console.log(`Key Pressed: \"${e.key}\"`);\n});\n\n// mousemove is noisy — throttle it before doing real work\nlet lastLog = 0;\ndocument.addEventListener(\"mousemove\", (e) => {\n  const now = Date.now();\n  if (now - lastLog < 100) return; // throttle to ~10 events/sec\n  lastLog = now;\n  console.log(`Mouse at X: ${e.clientX}, Y: ${e.clientY}`);\n});\n```\n`e.key` (not the deprecated `e.keyCode`) is the standard way to read which key was pressed; comparing against the string value (`\"Enter\"`, `\"Escape\"`, `\"ArrowDown\"`) is portable across keyboard layouts.\n\nStep 1 — Understand the topic.\nQuestion focus: DOM event handling fundamentals.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype EventHandler = (event: MouseEvent) => void;\n\nfunction attachButtonHandler(\n  element: HTMLElement,\n  handler: EventHandler,\n): () => void {\n  element.addEventListener(\"click\", handler);\n\n  return () => {\n    element.removeEventListener(\"click\", handler);\n  };\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst cleanup = button.addEventListener(\n  \"click\",\n  handleClick,\n);\n\n// In real code keep the handler reference\n// and call removeEventListener during cleanup.\n```\n\nStep 5 — Example result:\n```text\nhandler attached; cleanup removes the same handler reference\n```\n\nStep 6 — Complexity / trade-off:\nHigh-frequency events such as mousemove/scroll should be throttled or batched with requestAnimationFrame.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Drag-to-reorder UIs, custom cursors and hover-preview components all listen to `mousemove`, but throttle or use `requestAnimationFrame` to batch the resulting DOM writes so they stay in sync with the browser paint cycle instead of layout-thrashing on every pixel of movement.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nconst grid = document.getElementById(\"grid\");\n\ngrid.addEventListener(\"click\", (event) => {\n  const card = event.target.closest(\".card\");\n  if (!card) return; // click landed outside any card (e.g. the gap)\n  const id = card.dataset.id;\n  console.log(`You clicked on Card ${id}`);\n});\n```\n`closest()` walks up from the actual click target through ancestors until it finds a match (or returns `null`), which correctly handles clicks on nested children inside a card (an icon, a span of text) — a plain `event.target === card` check would miss those.\n\nStep 1 — Understand the topic.\nQuestion focus: Event delegation for a dynamic grid of cards.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype CardElement = HTMLElement & {\n  dataset: DOMStringMap;\n};\n\nfunction handleGridClick(\n  event: Event,\n): void {\n  const target = event.target;\n\n  if (!(target instanceof Element)) {\n    return;\n  }\n\n  const card = target.closest<HTMLElement>(\n    \".card\",\n  );\n\n  if (!card) return;\n\n  console.log(card.dataset.id);\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\ngrid.addEventListener(\n  \"click\",\n  event => {\n    const card = (\n      event.target as Element\n    )?.closest(\".card\");\n\n    if (!card) return;\n\n    console.log(\n      (card as HTMLElement).dataset.id,\n    );\n  },\n);\n```\n\nStep 5 — Example result:\n```text\none parent listener handles current and future cards\n```\n\nStep 6 — Complexity / trade-off:\nEvent delegation reduces listeners for large dynamic lists but requires bubbling-aware events.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Delegation is the standard pattern for lists/grids/tables whose rows are added, removed or re-rendered dynamically (virtualized lists, live search results, task boards): one listener survives DOM churn, versus re-attaching per-row listeners on every render which is both slower and leak-prone.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```css\n/* Default (mobile) styles */\n.box {\n  background-color: blue;\n  font-size: 1rem;\n}\n\n/* Tablet: 501px and up */\n@media (min-width: 501px) {\n  .box {\n    background-color: green;\n    font-size: 1.2rem;\n  }\n}\n\n/* Desktop: 701px and up */\n@media (min-width: 701px) {\n  .box {\n    background-color: red;\n    font-size: 1.5rem;\n  }\n}\n```\nWith `min-width`, each breakpoint only needs to declare what changes going *up* in size, since it inherits everything from the base rules below it (normal CSS cascade). A `max-width`-first approach instead has to declare the full desktop layout as the default and then override it downward for every smaller breakpoint, which tends to fight the cascade and duplicate more rules.\n\nStep 1 — Understand the topic.\nQuestion focus: Mobile-first responsive design with media queries.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype Viewport = {\n  width: number;\n};\n\nfunction layout(viewport: Viewport): string {\n  if (viewport.width >= 1024) {\n    return \"desktop\";\n  }\n\n  if (viewport.width >= 768) {\n    return \"tablet\";\n  }\n\n  return \"mobile\";\n}\n\nconsole.log(layout({ width: 800 }));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\n.page {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .page {\n    grid-template-columns: 2fr 1fr;\n  }\n}\n```\n\nStep 5 — Example result:\n```text\ntablet\n```\n\nStep 6 — Complexity / trade-off:\nPrefer CSS media/container queries for layout; JavaScript matchMedia is for behavior that truly needs runtime knowledge.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Design systems typically define a small set of shared breakpoint tokens (e.g. 640px/768px/1024px/1280px) used consistently via min-width media queries (or container queries for component-level responsiveness) so layout logic stays centralized instead of ad hoc per component.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nlet pollingId = null;\n\nfunction startPolling(url, interval = 5000) {\n  if (pollingId) clearInterval(pollingId); // avoid stacking multiple intervals\n\n  const poll = async () => {\n    try {\n      const response = await fetch(url);\n      const data = await response.json();\n      console.log(\"Polled Data:\", data.title);\n    } catch (error) {\n      console.error(\"Polling error:\", error);\n      // Decide deliberately: keep polling, or clearInterval(pollingId) to stop on error\n    }\n  };\n\n  poll(); // fire immediately instead of waiting one full interval\n  pollingId = setInterval(poll, interval);\n}\n\nfunction stopPolling() {\n  if (pollingId) {\n    clearInterval(pollingId);\n    pollingId = null;\n  }\n}\n```\nA subtler production concern: `setInterval` schedules the next call regardless of whether the previous fetch has resolved, so a slow endpoint can lead to overlapping in-flight requests — a recursive `setTimeout` that only reschedules after the previous call finishes avoids this.\n\nStep 1 — Understand the topic.\nQuestion focus: API data polling with setInterval.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nlet timer: ReturnType<typeof setTimeout> | null = null;\nlet stopped = false;\n\nasync function poll(\n  request: () => Promise<void>,\n  delay: number,\n): Promise<void> {\n  if (stopped) return;\n\n  try {\n    await request();\n  } finally {\n    if (!stopped) {\n      timer = setTimeout(\n        () => void poll(request, delay),\n        delay,\n      );\n    }\n  }\n}\n\nfunction stopPolling(): void {\n  stopped = true;\n\n  if (timer !== null) {\n    clearTimeout(timer);\n    timer = null;\n  }\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nuseEffect(() => {\n  let cancelled = false;\n\n  const run = async () => {\n    if (cancelled) return;\n\n    await loadData();\n\n    if (!cancelled) {\n      timer = setTimeout(run, 5000);\n    }\n  };\n\n  void run();\n\n  return () => {\n    cancelled = true;\n    clearTimeout(timer);\n  };\n}, []);\n```\n\nStep 5 — Example result:\n```text\nimmediate request followed by non-overlapping retries\n```\n\nStep 6 — Complexity / trade-off:\nRecursive setTimeout avoids overlapping requests better than setInterval when latency varies.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Live dashboards, notification badges and job-status screens (e.g. \"your export is processing\") poll an endpoint until a terminal state is reached, then stop — usually with capped/backoff intervals and a hard timeout so a stuck backend does not poll forever.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nfunction getRandomInteger(min, max) {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  // Both min and max are inclusive\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nconsole.log(getRandomInteger(1, 100)); // e.g. 35\n\nfunction getRandomFloat(min, max) {\n  return Math.random() * (max - min) + min;\n}\nconsole.log(getRandomFloat(1, 10)); // e.g. 4.6345...\n```\nThe `+1` in the integer version is what makes `max` reachable: without it, `Math.floor(Math.random() * (max - min)) + min` can never produce `max` itself, since `Math.random()` never returns exactly `1`. `Math.ceil`/`Math.floor` on the inputs guard against non-integer `min`/`max` being passed in.\n\nStep 1 — Understand the topic.\nQuestion focus: Random number generation (integer range and float range).\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction randomInteger(\n  min: number,\n  max: number,\n): number {\n  if (min > max) {\n    throw new Error(\"min must be <= max\");\n  }\n\n  return (\n    Math.floor(\n      Math.random() * (max - min + 1),\n    ) + min\n  );\n}\n\nconsole.log(randomInteger(1, 10));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst value =\n  Math.floor(\n    Math.random() * 10,\n  ) + 1;\n```\n\nStep 5 — Example result:\n```text\nan integer from 1 through 10\n```\n\nStep 6 — Complexity / trade-off:\nMath.random() is not cryptographically secure; use crypto.getRandomValues() for security-sensitive randomness.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Used for jittering retry/backoff delays (avoiding thundering-herd retries), shuffling arrays (Fisher–Yates draws a random index each pass), sampling mock/demo data, and generating non-cryptographic IDs for UI-only purposes.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
        "```js\nfunction getDateDifference(date1, date2) {\n  const diffMs = Math.abs(date2 - date1); // Date - Date = milliseconds\n  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));\n  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);\n  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);\n  return { days, hours, minutes };\n}\n\nconst d1 = new Date(\"2025-06-10T10:00:00\");\nconst d2 = new Date(\"2025-06-13T12:30:00\");\nconsole.log(getDateDifference(d1, d2)); // { days: 3, hours: 2, minutes: 30 }\n\n// Locale-aware formatting\nconst now = new Date();\nconsole.log(now.toLocaleDateString()); // e.g. \"10/3/2025\" (en-US)\nconsole.log(now.toLocaleTimeString()); // e.g. \"2:34:59 AM\"\n\nconst options = { weekday: \"long\", year: \"numeric\", month: \"long\", day: \"numeric\" };\nconsole.log(new Intl.DateTimeFormat(\"en-US\", options).format(now));\n// e.g. \"Friday, October 3, 2025\"\n```\n`Date - Date` works because subtraction coerces both operands via `valueOf()` (milliseconds since epoch); template-literal or string concatenation would instead coerce via `toString()` and produce garbage.\n\nStep 1 — Understand the topic.\nQuestion focus: Date difference and locale-aware date formatting.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ntype DateDiff = {\n  days: number;\n  hours: number;\n  minutes: number;\n};\n\nfunction dateDifference(\n  first: Date,\n  second: Date,\n): DateDiff {\n  const diff = Math.abs(\n    second.getTime() - first.getTime(),\n  );\n\n  return {\n    days: Math.floor(\n      diff / (1000 * 60 * 60 * 24),\n    ),\n    hours: Math.floor(\n      diff / (1000 * 60 * 60),\n    ) % 24,\n    minutes: Math.floor(\n      diff / (1000 * 60),\n    ) % 60,\n  };\n}\n\nconsole.log(\n  dateDifference(\n    new Date(\"2025-06-10T10:00:00Z\"),\n    new Date(\"2025-06-13T12:30:00Z\"),\n  ),\n);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst formatted =\n  new Intl.DateTimeFormat(\"en-US\", {\n    dateStyle: \"medium\",\n    timeStyle: \"short\",\n    timeZone: \"UTC\",\n  }).format(new Date());\n\nconsole.log(formatted);\n```\n\nStep 5 — Example result:\n```text\n{ days: 3, hours: 2, minutes: 30 }\n```\n\nStep 6 — Complexity / trade-off:\nDate arithmetic is easy for elapsed time but calendar/time-zone rules can require Intl or a date library.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Relative-time UI (\"3 days ago\", \"starts in 2h 30m\") and countdown/scheduling features compute this millisecond delta, while any user-facing date label goes through `Intl.DateTimeFormat` (or a library built on it) so it respects the viewer\\\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
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
  {
    detail: {
      id: 'mcx-12',
      questionNumber: 'MCX-012',
      title: 'Polyfill for Promise.all()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 5),
      frequency: 5,
      category: 'Promises & Async',
      part: 'Machine Coding',
      concepts: ['Promise', 'Concurrency', 'Fail-fast', 'Polyfills'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you write a custom polyfill for Promise.all() in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Return a new Promise that takes an array of promises. Maintain a results array and a completed count. Iterate through the input array, wrapping each item in Promise.resolve() to handle non-promise values. Place each resolved value at its original index, increment the count, and resolve the main promise when count equals input length. If any input promise rejects, immediately reject the main promise.',
      deepExplanation:
        "```js\nfunction customPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    if (!Array.isArray(promises)) {\n      return reject(new TypeError(\"Argument must be an iterable array\"));\n    }\n    const results = [];\n    let completedCount = 0;\n    if (promises.length === 0) return resolve([]);\n\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise)\n        .then((val) => {\n          results[index] = val;\n          completedCount++;\n          if (completedCount === promises.length) {\n            resolve(results);\n          }\n        })\n        .catch(reject); // Fail-fast on first rejection\n    });\n  });\n}\n\n// Usage example:\nconst p1 = Promise.resolve(10);\nconst p2 = 20; // Non-promise primitive\nconst p3 = new Promise((res) => setTimeout(() => res(30), 100));\n\ncustomPromiseAll([p1, p2, p3]).then(console.log); // [10, 20, 30]\n```\nKey details to keep in mind during interviews:\n1. Array indexing: Preserving original order is essential (do not use `results.push()`).\n2. Primitive values: Inputs may not be Promises (e.g. numbers, strings), so `Promise.resolve(promise)` is mandatory.\n3. Fail-fast: Rejection must short-circuit immediately on the first error.\n\nStep 1 — Understand the topic.\nQuestion focus: Polyfill for Promise.all().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction promiseAllManual<T>(\n  promises: Array<Promise<T> | T>,\n): Promise<T[]> {\n  return new Promise((resolve, reject) => {\n    const results: T[] = [];\n    let completed = 0;\n\n    if (promises.length === 0) {\n      resolve([]);\n      return;\n    }\n\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise).then(\n        value => {\n          results[index] = value;\n          completed += 1;\n\n          if (completed === promises.length) {\n            resolve(results);\n          }\n        },\n        reject,\n      );\n    });\n  });\n}\n\npromiseAllManual([\n  Promise.resolve(10),\n  20,\n  Promise.resolve(30),\n]).then(console.log);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst [users, posts] =\n  await Promise.all([\n    fetchUsers(),\n    fetchPosts(),\n  ]);\n```\n\nStep 5 — Example result:\n```text\n[10, 20, 30]\n```\n\nStep 6 — Complexity / trade-off:\nFail-fast: one rejection rejects the combined promise. Results are kept in input order.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Understanding `Promise.all()` internals is crucial for writing custom data loading pipelines, handling bulk HTTP requests, and constructing resilient fallback mechanisms in modern React/Vite frontends.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Wrap every input element in Promise.resolve() to normalize primitives and Promises',
        'Store results by index (results[index] = val) rather than array push to maintain input ordering',
        'Check for empty array input immediately and resolve with []',
        'Reject immediately upon encountering the first error (fail-fast behavior)',
      ],
      tradeOffs:
        'Advantages: simple, linear time O(N) evaluation. Disadvantages: if one promise rejects, all other resolved results are discarded from the output value.',
      commonMistakes: [
        'Using results.push() instead of indexing results[index], breaking the order of resolved values when async tasks finish out of sequence',
        'Forgetting to resolve immediately on an empty input array []',
        'Failing to wrap non-promise primitives with Promise.resolve()',
      ],
      followUpQuestions: [
        'How does Promise.allSettled differ from Promise.all?',
        'How would you limit concurrency if the input array contains 10,000 requests?',
      ],
      relatedTopics: ['Promise.allSettled', 'Promise.race', 'Promise.any', 'Async/Await'],
    },
  },
  {
    detail: {
      id: 'mcx-13',
      questionNumber: 'MCX-013',
      title: 'Polyfill for Promise.race() and Promise.any()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(1, 6),
      frequency: 4,
      category: 'Promises & Async',
      part: 'Machine Coding',
      concepts: ['Promise.race', 'Promise.any', 'AggregateError', 'Polyfills'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you write polyfills for Promise.race() and Promise.any() in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Promise.race() resolves or rejects as soon as the first promise settles. Promise.any() resolves as soon as the first promise fulfills; if all promises reject, it rejects with an AggregateError containing all rejection reasons.',
      deepExplanation:
        "```js\n// Promise.race Polyfill\nfunction customPromiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    promises.forEach((promise) => {\n      Promise.resolve(promise).then(resolve, reject);\n    });\n  });\n}\n\n// Promise.any Polyfill\nfunction customPromiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    const errors = [];\n    let rejectedCount = 0;\n    if (promises.length === 0) {\n      return reject(new AggregateError([], \"All promises were rejected\"));\n    }\n\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise)\n        .then(resolve) // Resolve immediately on first fulfillment\n        .catch((err) => {\n          errors[index] = err;\n          rejectedCount++;\n          if (rejectedCount === promises.length) {\n            reject(new AggregateError(errors, \"All promises were rejected\"));\n          }\n        });\n    });\n  });\n}\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Polyfill for Promise.race() and Promise.any().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction promiseRace<T>(\n  values: Array<Promise<T> | T>,\n): Promise<T> {\n  return new Promise((resolve, reject) => {\n    for (const value of values) {\n      Promise.resolve(value).then(\n        resolve,\n        reject,\n      );\n    }\n  });\n}\n\nfunction promiseAny<T>(\n  values: Array<Promise<T> | T>,\n): Promise<T> {\n  return new Promise((resolve, reject) => {\n    const errors: unknown[] = [];\n    let rejected = 0;\n\n    if (values.length === 0) {\n      reject(new AggregateError([]));\n      return;\n    }\n\n    values.forEach((value, index) => {\n      Promise.resolve(value).then(\n        resolve,\n        error => {\n          errors[index] = error;\n          rejected += 1;\n\n          if (rejected === values.length) {\n            reject(new AggregateError(errors));\n          }\n        },\n      );\n    });\n  });\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst fastest = await Promise.race([\n  fetchPrimary(),\n  fetchBackup(),\n]);\n\nconst firstSuccess = await Promise.any([\n  fetchPrimary(),\n  fetchBackup(),\n]);\n```\n\nStep 5 — Example result:\n```text\nrace: first settled; any: first fulfilled\n```\n\nStep 6 — Complexity / trade-off:\nrace does not cancel losers; any rejects only after all inputs reject.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Promise.race is used for request timeouts (`Promise.race([fetchData(), timeoutPromise()])`), while Promise.any is ideal for redundant service calls (e.g. querying mirror CDN endpoints and taking the fastest successful response).\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Use AggregateError when all promises reject in Promise.any',
        'Wrap all items with Promise.resolve() for safe handling',
        'Handle empty input arrays correctly for both methods',
      ],
      tradeOffs:
        'Promise.race does not cancel losing in-flight operations; explicit AbortController usage is required for cancellation.',
      commonMistakes: [
        'Confusing Promise.race (settles on 1st resolve OR reject) with Promise.any (settles on 1st resolve, ignores early rejects)',
        'Not using AggregateError for Promise.any when all promises reject',
      ],
      followUpQuestions: [
        'How do you cancel pending fetch requests when Promise.race settles early?',
      ],
      relatedTopics: ['Promise.race', 'Promise.any', 'AggregateError', 'AbortController'],
    },
  },
  {
    detail: {
      id: 'mcx-14',
      questionNumber: 'MCX-014',
      title: 'Async Retry Mechanism with Exponential Backoff',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 6),
      frequency: 5,
      category: 'Promises & Async',
      part: 'Machine Coding',
      concepts: ['Async/Await', 'Retry Logic', 'Exponential Backoff', 'Error Handling'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you implement an asynchronous operation retry mechanism with N retries and exponential backoff?',
    },
    answer: {
      expectedAnswer:
        'Execute the asynchronous function inside a try block. If it fails and retries remain, wait for a calculated delay duration (`delay * 2^attempt`), then recursively call the function with `retries - 1`. If no retries remain, rethrow the final error.',
      deepExplanation:
        "```js\nasync function retryWithBackoff(fn, retries = 3, delay = 1000, backoffFactor = 2) {\n  try {\n    return await fn();\n  } catch (error) {\n    if (retries <= 0) throw error;\n    \n    // Add optional random jitter to prevent thundering herd\n    const jitter = Math.random() * 200;\n    const currentDelay = delay + jitter;\n    \n    console.warn(`Attempt failed. Retrying in ${Math.round(currentDelay)}ms... (${retries} retries left)`);\n    await new Promise((resolve) => setTimeout(resolve, currentDelay));\n    \n    return retryWithBackoff(fn, retries - 1, delay * backoffFactor, backoffFactor);\n  }\n}\n\n// Example usage:\nlet attempt = 0;\nconst flakyApi = async () => {\n  attempt++;\n  if (attempt < 3) throw new Error(\"Network Flake 503\");\n  return \"Data Loaded Successfully!\";\n};\n\nretryWithBackoff(flakyApi, 3, 500).then(console.log);\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Async Retry Mechanism with Exponential Backoff.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nasync function retry<T>(\n  operation: () => Promise<T>,\n  retries: number,\n  delayMs: number,\n): Promise<T> {\n  try {\n    return await operation();\n  } catch (error) {\n    if (retries === 0) throw error;\n\n    await new Promise(resolve =>\n      setTimeout(resolve, delayMs),\n    );\n\n    return retry(\n      operation,\n      retries - 1,\n      delayMs * 2,\n    );\n  }\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = await retry(\n  fetchData,\n  {\n    retries: 3,\n    onFailedAttempt: () => undefined,\n  },\n);\n```\n\nStep 5 — Example result:\n```text\neventual success or final thrown error\n```\n\nStep 6 — Complexity / trade-off:\nRetry only transient/idempotent failures; add exponential backoff and jitter.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Used in HTTP client wrappers (Axios interceptors, RTK Query baseQuery, custom fetch hooks) to gracefully handle transient network drops or 503 Service Unavailable API responses.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Multiply delay by a factor (usually 2) for exponential backoff',
        'Add random jitter to avoid thundering herd problem when many clients retry simultaneously',
        'Ensure the final error is thrown once retries are exhausted',
      ],
      tradeOffs:
        'Retrying non-idempotent HTTP requests (e.g. POST payments) can cause duplicate actions if not guarded by idempotency keys.',
      commonMistakes: [
        'Retrying infinitely without a upper retries limit',
        'Retrying 4xx client errors (e.g. 401 Unauthorized or 404 Not Found) which will never succeed on retry',
      ],
      followUpQuestions: [
        'How would you restrict retries to only 5xx or network errors?',
        'How would you add an AbortSignal to cancel pending retries?',
      ],
      relatedTopics: ['Exponential Backoff', 'Jitter', 'RTK Query', 'Axios Interceptors'],
    },
  },
  {
    detail: {
      id: 'mcx-15',
      questionNumber: 'MCX-015',
      title: 'Implement clearAllTimeout() in JavaScript',
      difficulty: 'Medium',
      companies: COMPANIES.slice(2, 7),
      frequency: 4,
      category: 'Timers and Events',
      part: 'Machine Coding',
      concepts: ['setTimeout', 'clearTimeout', 'Monkey Patching', 'Timer Tracking'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you implement a clearAllTimeout() function in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Monkey-patch `window.setTimeout` and `window.clearTimeout`. Store active timer IDs in a Set when created. Remove timer IDs when they complete or are cleared manually. `clearAllTimeout()` iterates through all active IDs in the Set, cancels each via native `clearTimeout`, and clears the Set.',
      deepExplanation:
        "```js\nconst TimerManager = (() => {\n  const activeTimerIds = new Set();\n  const originalSetTimeout = window.setTimeout;\n  const originalClearTimeout = window.clearTimeout;\n\n  window.setTimeout = function (callback, delay, ...args) {\n    let timerId;\n    const wrappedCallback = () => {\n      activeTimerIds.delete(timerId);\n      callback.apply(this, args);\n    };\n    timerId = originalSetTimeout(wrappedCallback, delay, ...args);\n    activeTimerIds.add(timerId);\n    return timerId;\n  };\n\n  window.clearTimeout = function (timerId) {\n    activeTimerIds.delete(timerId);\n    originalClearTimeout(timerId);\n  };\n\n  return {\n    clearAllTimeout() {\n      for (const id of activeTimerIds) {\n        originalClearTimeout(id);\n      }\n      activeTimerIds.clear();\n    }\n  };\n})();\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Implement clearAllTimeout() in JavaScript.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nconst activeTimers = new Set<\n  ReturnType<typeof setTimeout>\n>();\n\nfunction trackedTimeout(\n  callback: () => void,\n  delay: number,\n) {\n  const id = setTimeout(() => {\n    activeTimers.delete(id);\n    callback();\n  }, delay);\n\n  activeTimers.add(id);\n  return id;\n}\n\nfunction clearAllTimeouts(): void {\n  for (const id of activeTimers) {\n    clearTimeout(id);\n  }\n\n  activeTimers.clear();\n}\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst id = window.setTimeout(\n  handleTimeout,\n  1000,\n);\n\nwindow.clearTimeout(id);\n```\n\nStep 5 — Example result:\n```text\nall tracked timers are cancelled\n```\n\nStep 6 — Complexity / trade-off:\nPrefer owning cleanup locally in components/modules; global timer monkey-patching is powerful but intrusive.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Useful in single-page applications during route transitions or component unmounting to prevent memory leaks and unexpected state updates from pending timer callbacks.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Preserve argument forwarding (...args) and correct `this` context',
        'Clean up Set items when callbacks fire normally to prevent memory leaks',
        'Keep original references to native functions before overriding',
      ],
      tradeOffs:
        'Overriding native browser globals must be done with care in shared library environments.',
      commonMistakes: [
        'Forgetting to delete timer IDs from the tracking Set when the callback executes naturally',
        'Not passing extra arguments passed to setTimeout',
      ],
      followUpQuestions: [
        'How would you extend this approach to build clearAllInterval()?',
      ],
      relatedTopics: ['setTimeout', 'clearTimeout', 'Memory Leaks', 'SPA Lifecycle'],
    },
  },
  {
    detail: {
      id: 'mcx-16',
      questionNumber: 'MCX-016',
      title: 'Polyfill for Array.prototype.flat()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 5),
      frequency: 5,
      category: 'Mastering Array Methods',
      part: 'Machine Coding',
      concepts: ['Array.prototype.flat', 'Recursion', 'Array.prototype.reduce', 'Polyfills'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you write a custom polyfill for Array.prototype.flat() in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Use Array.prototype.reduce() to iterate over elements. For each element, if it is an Array and depth > 0, recursively call flat with depth - 1 and spread the result into the accumulator. Otherwise, push the element directly.',
      deepExplanation:
        "```js\nArray.prototype.customFlat = function (depth = 1) {\n  if (depth < 1) return this.slice();\n\n  return this.reduce((acc, val) => {\n    if (Array.isArray(val)) {\n      acc.push(...val.customFlat(depth - 1));\n    } else {\n      acc.push(val);\n    }\n    return acc;\n  }, []);\n};\n\n// Iterative alternative (handles Infinity depth without stack overflow):\nfunction flatDeepIterative(arr) {\n  const stack = [...arr];\n  const res = [];\n  while (stack.length) {\n    const next = stack.pop();\n    if (Array.isArray(next)) {\n      stack.push(...next);\n    } else {\n      res.push(next);\n    }\n  }\n  return res.reverse();\n}\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Polyfill for Array.prototype.flat().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction flatManual<T>(\n  input: unknown[],\n  depth = 1,\n): unknown[] {\n  if (depth < 1) return input.slice();\n\n  const result: unknown[] = [];\n\n  for (const item of input) {\n    if (Array.isArray(item)) {\n      result.push(\n        ...flatManual(item, depth - 1),\n      );\n    } else {\n      result.push(item);\n    }\n  }\n\n  return result;\n}\n\nconsole.log(\n  flatManual([1, [2, [3]]], 2),\n);\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result =\n  [1, [2, [3]]].flat(2);\n\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\n[1, 2, 3]\n```\n\nStep 6 — Complexity / trade-off:\nRecursive implementation is easy to understand; iterative stacks are safer for extreme nesting.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Flattening deeply nested API responses (such as comments threads or category trees) for flat list rendering in React components.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Support dynamic depth parameter defaulting to 1',
        'Handle depth === Infinity correctly',
        'Preserve sparse array handling if required by strict spec compliance',
      ],
      tradeOffs:
        'Recursive implementation can hit call stack limits on extremely deep nestings (> 10,000 levels); stack-based iterative approach is safer for arbitrary depth.',
      commonMistakes: [
        'Ignoring the depth parameter and flattening all levels unconditionally',
        'Mutating the original array instead of returning a new one',
      ],
      followUpQuestions: [
        'How does flatMap() differ from flat() followed by map()?',
      ],
      relatedTopics: ['Array.prototype.reduce', 'Recursion', 'Tree Flattening'],
    },
  },
  {
    detail: {
      id: 'mcx-17',
      questionNumber: 'MCX-017',
      title: 'Polyfill for Function.prototype.bind()',
      difficulty: 'Medium',
      companies: COMPANIES.slice(1, 6),
      frequency: 5,
      category: 'Function Prototypes',
      part: 'Machine Coding',
      concepts: ['Function.prototype.bind', 'this binding', 'Currying', 'Polyfills'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you write a custom polyfill for Function.prototype.bind() in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Return a new wrapper function that invokes the original target function using `apply()`, binding the context and combining preset argument parameters with newly passed arguments.',
      deepExplanation:
        "```js\nFunction.prototype.customBind = function (context, ...boundArgs) {\n  const targetFn = this;\n  if (typeof targetFn !== \"function\") {\n    throw new TypeError(\"Function.prototype.bind must be called on a function\");\n  }\n\n  return function (...callArgs) {\n    return targetFn.apply(context, [...boundArgs, ...callArgs]);\n  };\n};\n\n// Usage example:\nfunction greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\nconst user = { name: \"Alice\" };\nconst greetAlice = greet.customBind(user, \"Hello\");\nconsole.log(greetAlice(\"!\")); // \"Hello, Alice!\"\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Polyfill for Function.prototype.bind().\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Used in event handler context binding, partial function application, and legacy class component callback bindings.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Validate that the target object is a function',
        'Combine bound args and invocation call args cleanly',
        'Handle `new` keyword instantiation if supporting constructor bindings',
      ],
      tradeOffs:
        'Native bind is implemented in C++ in engines and optimized; custom polyfill adds a extra JS closure layer.',
      commonMistakes: [
        'Forgetting to combine bound args with newly passed arguments',
        'Not preserving the return value of the underlying function call',
      ],
      followUpQuestions: [
        'How do custom call() and apply() polyfills differ from bind()?',
      ],
      relatedTopics: ['Function.prototype.call', 'Function.prototype.apply', 'Lexical Context'],
    },
  },
  {
    detail: {
      id: 'mcx-18',
      questionNumber: 'MCX-018',
      title: 'Polyfill for compose() and pipe() Functions',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 5),
      frequency: 4,
      category: 'Advanced Function Concepts',
      part: 'Machine Coding',
      concepts: ['Functional Programming', 'compose', 'pipe', 'reduceRight'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you create compose() and pipe() utility functions in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'compose() executes functions right-to-left using `Array.prototype.reduceRight()`. pipe() executes functions left-to-right using `Array.prototype.reduce()`. Both take a list of functions and return a new function that passes the accumulated result from one function to the next.',
      deepExplanation:
        "```js\n// compose (Right to Left)\nconst compose = (...fns) => (initialValue) =>\n  fns.reduceRight((acc, fn) => fn(acc), initialValue);\n\n// pipe (Left to Right)\nconst pipe = (...fns) => (initialValue) =>\n  fns.reduce((acc, fn) => fn(acc), initialValue);\n\n// Usage example:\nconst add5 = (x) => x + 5;\nconst multiply2 = (x) => x * 2;\nconst square = (x) => x * x;\n\n// pipe: (2 + 5) = 7 -> (7 * 2) = 14 -> 14^2 = 196\nconsole.log(pipe(add5, multiply2, square)(2)); // 196\n\n// compose: 2^2 = 4 -> (4 * 2) = 8 -> 8 + 5 = 13\nconsole.log(compose(add5, multiply2, square)(2)); // 13\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Polyfill for compose() and pipe() Functions.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Widely used in Redux middleware chains, data transformation pipelines, and functional UI component wrappers (e.g. Higher-Order Components).\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Keep composed functions pure and single-arity',
        'Prefer pipe() for left-to-right readable data transformation flows',
      ],
      tradeOffs:
        'Deep function composition stacks can be harder to step through in devtools debugger compared to sequential variable assignments.',
      commonMistakes: [
        'Confusing evaluation order between compose (R-to-L) and pipe (L-to-R)',
        'Passing multi-argument functions into intermediate composition steps',
      ],
      followUpQuestions: [
        'How do Redux createStore enhancers use compose()?',
      ],
      relatedTopics: ['Higher-Order Functions', 'Functional Programming', 'Redux Compose'],
    },
  },
  {
    detail: {
      id: 'mcx-19',
      questionNumber: 'MCX-019',
      title: 'Publisher-Subscriber (Pub-Sub) Pattern Implementation',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 6),
      frequency: 5,
      category: 'Design Patterns & Architecture',
      part: 'Machine Coding',
      concepts: ['Pub-Sub Pattern', 'Event Emitter', 'Decoupling', 'Observer Pattern'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How would you implement a complete Pub-Sub (Event Emitter) pattern in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Create a PubSub class with an internal events Map. Implement subscribe(event, listener) to register callbacks and return an unsubscribe function. Implement publish(event, data) to trigger all registered callbacks for that event.',
      deepExplanation:
        "```js\nclass PubSub {\n  constructor() {\n    this.events = new Map();\n  }\n\n  subscribe(event, listener) {\n    if (!this.events.has(event)) {\n      this.events.set(event, []);\n    }\n    this.events.get(event).push(listener);\n\n    // Return cleanup unsubscribe function\n    return () => {\n      const listeners = this.events.get(event).filter((l) => l !== listener);\n      this.events.set(event, listeners);\n    };\n  }\n\n  publish(event, data) {\n    if (this.events.has(event)) {\n      this.events.get(event).forEach((listener) => listener(data));\n    }\n  }\n}\n\n// Usage example:\nconst hub = new PubSub();\nconst unsub = hub.subscribe(\"USER_LOGIN\", (user) => console.log(`Welcome ${user.name}`));\nhub.publish(\"USER_LOGIN\", { name: \"Sarah\" }); // Output: Welcome Sarah\nunsub(); // Clean up listener\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Publisher-Subscriber (Pub-Sub) Pattern Implementation.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Used in global micro-frontend event buses, notification toasts, and custom analytics loggers to decouple emitter components from consumers.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Return an unsubscribe callback from subscribe() to make cleanup in React useEffect trivial',
        'Use Map and Set for O(1) event lookups',
        'Safely clone listener arrays during publish to prevent issues if a listener unsubscribes while executing',
      ],
      tradeOffs:
        'Overuse can make global event flow harder to trace compared to explicit props or typed Redux state.',
      commonMistakes: [
        'Forgetting cleanup mechanism, causing memory leaks when components unmount',
        'Not handling non-existent event topics gracefully',
      ],
      followUpQuestions: [
        'How does Pub-Sub differ from the Observer pattern?',
        'How would you add once(event, callback) support?',
      ],
      relatedTopics: ['EventEmitter', 'Observer Pattern', 'Event Bus', 'Micro-frontends'],
    },
  },
  {
    detail: {
      id: 'mcx-20',
      questionNumber: 'MCX-020',
      title: 'Custom Debounce and Throttle Implementation',
      difficulty: 'Medium',
      companies: COMPANIES.slice(0, 6),
      frequency: 5,
      category: 'Optimization Techniques',
      part: 'Machine Coding',
      concepts: ['Debounce', 'Throttle', 'Higher-Order Functions', 'Timers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How do you implement custom debounce and throttle functions in JavaScript?',
    },
    answer: {
      expectedAnswer:
        'Debounce delays function execution until N ms have passed since the last call. Throttle ensures function execution occurs at most once every N ms.',
      deepExplanation:
        "```js\n// Debounce\nfunction debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// Throttle\nfunction throttle(fn, limit) {\n  let inThrottle = false;\n  return function (...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => {\n        inThrottle = false;\n      }, limit);\n    }\n  };\n}\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Custom Debounce and Throttle Implementation.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Debounce is used for autocomplete input queries and autosave fields. Throttle is used for scroll position handlers, window resize calculations, and drag events.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Preserve lexical context (`this`) and arguments (`...args`)',
        'Return cancel method on the returned debounced function if cleanup is needed',
      ],
      tradeOffs:
        'Debounce delays immediate feedback until typing stops; throttle fires immediately but skips intermediate updates.',
      commonMistakes: [
        'Creating a new debounced instance inside a React component render body without useMemo/useCallback',
      ],
      followUpQuestions: [
        'How would you implement leading and trailing options for debounce?',
      ],
      relatedTopics: ['Debounce', 'Throttle', 'Performance Optimization', 'Event Listeners'],
    },
  },
  {
    detail: {
      id: 'mcx-21',
      questionNumber: 'MCX-021',
      title: 'Block Scope vs Function Scope (let, const vs var)',
      difficulty: 'Easy',
      companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix'],
      frequency: 5,
      category: 'JS Mechanics',
      part: 'Machine Coding',
      concepts: ['Block scope', 'Function scope', 'Hoisting', 'Temporal Dead Zone', 'let', 'const', 'var'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'Explain Block Scope vs Function Scope in JavaScript with examples for let, const, var, loops, and nested blocks.',
    },
    answer: {
      expectedAnswer:
        'Block scope restricts a variable to the nearest enclosing `{ }` block when declared with `let` or `const`. `var` ignores blocks and is function-scoped (or globally scoped if declared outside a function).',
      deepExplanation:
        "```js\n// 1. Basic Block Scope with let and const\n{\n  let a = 10;\n  const b = 20;\n  console.log(a); // 10\n  console.log(b); // 20\n}\n// console.log(a); // ❌ ReferenceError: a is not defined\n// console.log(b); // ❌ ReferenceError: b is not defined\n\n// 2. Block vs Function Scope in conditional blocks\nif (true) {\n  let x = 10; // Block-scoped\n  var y = 20; // Function-scoped (hoisted to outer scope)\n}\n// console.log(x); // ❌ ReferenceError\nconsole.log(y);    // ✅ 20\n\n// 3. Loop Scoping\nfor (let i = 0; i < 3; i++) {\n  // Each iteration creates a new block binding for `i`\n}\n// console.log(i); // ❌ ReferenceError\n\nfor (var j = 0; j < 3; j++) {\n  // `j` is hoisted outside the loop\n}\nconsole.log(j);    // ✅ 3\n\n// 4. Nested Block Scoping\nlet name = \"Rasik\";\n{\n  let age = 25;\n  {\n    console.log(name); // ✅ \"Rasik\" (searches outer lexical scopes)\n    console.log(age);  // ✅ 25\n  }\n}\n// console.log(age); // ❌ ReferenceError: age is not defined\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Block Scope vs Function Scope (let, const vs var).\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Modern linter rules (ESLint `no-var`, `prefer-const`) enforce block-scoped variables to prevent unintended leakage across loop iterations and conditional branches.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      example: {
        code: "// 1. Basic Block Scope with let and const\n{\n  let a = 10;\n  const b = 20;\n  console.log(a); // 10\n  console.log(b); // 20\n}\n// console.log(a); // ❌ ReferenceError: a is not defined\n// console.log(b); // ❌ ReferenceError: b is not defined\n\n// 2. Block vs Function Scope in conditional blocks\nif (true) {\n  let x = 10; // Block-scoped\n  var y = 20; // Function-scoped (hoisted to outer scope)\n}\n// console.log(x); // ❌ ReferenceError\nconsole.log(y);    // ✅ 20\n\n// 3. Loop Scoping\nfor (let i = 0; i < 3; i++) {\n  // Each iteration creates a new block binding for `i`\n}\n// console.log(i); // ❌ ReferenceError\n\nfor (var j = 0; j < 3; j++) {\n  // `j` is hoisted outside the loop\n}\nconsole.log(j);    // ✅ 3\n\n// 4. Nested Block Scoping\nlet name = \"Rasik\";\n{\n  let age = 25;\n  {\n    console.log(name); // ✅ \"Rasik\" (searches outer lexical scopes)\n    console.log(age);  // ✅ 25\n  }\n}\n// console.log(age); // ❌ ReferenceError: age is not defined",
        output: "10",
        explanation: "Block scope restricts a variable to the nearest enclosing `{ }` block when declared with `let` or `const`. `var` ignores blocks and is function-scoped (or globally scoped if declared outside a function)."
      },
      bestPractices: [
        'Default to `const` for all variable declarations unless reassignment is required',
        'Use `let` only for reassigned loop variables or counters',
        'Avoid using `var` in modern JavaScript applications',
        'Keep variable scope as narrow as possible to improve readability and prevent side-effects',
      ],
      tradeOffs:
        'Block scoping with `let`/`const` prevents scope leakage bugs and enables cleaner closures in loops, but requires understanding Temporal Dead Zone (TDZ) rules.',
      commonMistakes: [
        'Expecting `var` declared inside an `if` block or `for` loop to stay private to that block',
        'Confusing `const` immutability of variable binding with immutability of object properties',
        'Referencing a `let` or `const` variable before its declaration line (TDZ ReferenceError)',
      ],
      followUpQuestions: [
        'What is the Temporal Dead Zone (TDZ) and how does it affect `let` and `const`?',
        'How does a `let`-based for loop handle asynchronous callbacks compared to `var`?',
      ],
      relatedTopics: ['Block Scope', 'Function Scope', 'Temporal Dead Zone', 'Hoisting'],
    },
  },
  {
    detail: {
      id: 'mcx-22',
      questionNumber: 'MCX-022',
      title: 'Array Operations & Custom Polyfills (forEach, push, pop)',
      difficulty: 'Medium',
      companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
      frequency: 5,
      category: 'Array Methods',
      part: 'Machine Coding',
      concepts: ['forEach', 'push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'Polyfill', 'Array.prototype'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'Explain core JavaScript array operations (forEach, push, pop, shift, unshift) and implement custom polyfills without using built-in array methods.',
    },
    answer: {
      expectedAnswer:
        '`push` appends elements to the end and returns the new length. `pop` removes and returns the last element. `forEach` executes a provided callback once for each array element. Custom polyfills can be attached to `Array.prototype`.',
      deepExplanation:
        "```js\n// 1. Custom Array.prototype.myForEach\nArray.prototype.myForEach = function (callback, thisArg) {\n  if (typeof callback !== \"function\") {\n    throw new TypeError(callback + \" is not a function\");\n  }\n  for (let i = 0; i < this.length; i++) {\n    if (i in this) {\n      callback.call(thisArg, this[i], i, this);\n    }\n  }\n};\n\n// 2. Custom Array.prototype.myPush\nArray.prototype.myPush = function (...items) {\n  for (let i = 0; i < items.length; i++) {\n    this[this.length] = items[i];\n  }\n  return this.length;\n};\n\n// 3. Custom Array.prototype.myPop\nArray.prototype.myPop = function () {\n  if (this.length === 0) return undefined;\n  const lastItem = this[this.length - 1];\n  delete this[this.length - 1];\n  this.length--;\n  return lastItem;\n};\n\n// Example Usage:\nconst nums = [1, 2, 3];\nnums.myPush(4, 5); // Returns 5, nums is now [1, 2, 3, 4, 5]\nconst popped = nums.myPop(); // Returns 5, nums is now [1, 2, 3, 4]\nnums.myForEach((val, idx) => console.log(`Index ${idx}: ${val}`));\n```\n\nStep 1 — Understand the topic.\nQuestion focus: Array Operations & Custom Polyfills (forEach, push, pop).\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Understanding array operation mutability (`push`/`pop` mutate in-place, `concat`/`slice` return new arrays) is critical for state immutability in React/Redux.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      bestPractices: [
        'Do not mutate state directly in React — use spread operators or immutable copy operations',
        'Verify `i in this` inside custom iteration polyfills to skip sparse/empty array slots',
        'Preserve proper `thisArg` context execution in array iteration methods',
      ],
      tradeOffs:
        'In-place mutating operations (`push`, `pop`, `shift`, `unshift`, `splice`) save memory but break immutable functional state paradigms.',
      commonMistakes: [
        'Confusing mutating array methods (`push`, `pop`, `splice`) with non-mutating methods (`slice`, `concat`, `map`)',
        'Forgetting that `push` returns the new array length, not the array itself',
        'Assuming `forEach` can be aborted early using `break` or `return` (use `some`, `every`, or `for...of` instead)',
      ],
      followUpQuestions: [
        'Why can you not stop or break a `forEach` loop early?',
        'What is the performance difference between `pop()` O(1) and `shift()` O(N)?',
      ],
      relatedTopics: ['Array.prototype', 'Polyfills', 'Mutation', 'Immutability', 'forEach'],
    },
  },
  {
    detail: {
      id: 'mcx-23',
      questionNumber: 'MCX-023',
      title: 'The "this" Keyword & Execution Context Rules',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'LinkedIn'],
      frequency: 5,
      category: 'JS Mechanics',
      part: 'Machine Coding',
      concepts: ['this', 'Execution Context', 'Implicit Binding', 'Explicit Binding', 'Lexical Scope', 'Arrow Functions'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question:
        'Explain how the `this` keyword behaves across global, object method, constructor, and arrow function contexts in JavaScript.',
    },
    answer: {
      expectedAnswer:
        'The value of `this` is determined by how a function is invoked at runtime. In regular functions, `this` points to the calling object (implicit binding), global object (or `undefined` in strict mode), or an explicitly bound context (`call`/`apply`/`bind`). Arrow functions inherit `this` lexically from their enclosing scope.',
      deepExplanation:
        "```js\n// 1. Global Context\nconsole.log(this); // window (Browser) or globalThis (Node.js)\n\n// 2. Object Method Context (Implicit Binding)\nconst person = {\n  name: \"Ravi\",\n  sayHello() {\n    console.log(`Hello, I am ${this.name}`);\n  }\n};\nperson.sayHello(); // \"Hello, I am Ravi\"\n\n// 3. Detached Method Loss\nconst unboundSay = person.sayHello;\nunboundSay(); // \"Hello, I am undefined\" (strict mode) or global object\n\n// 4. Explicit Binding (call, apply, bind)\nconst boundSay = person.sayHello.bind({ name: \"Ram\" });\nboundSay(); // \"Hello, I am Ram\"\n\n// 5. Constructor Context (new keyword)\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\nconst lydia = new Person(\"Lydia\", \"Hallie\"); // `this` is newly instantiated object\nconst sarah = Person(\"Sarah\", \"Smith\");    // Without `new`, `this` is global/undefined, returns undefined!\n\n// 6. Arrow Function Lexical `this`\nconst object = {\n  name: \"Lexical Demo\",\n  regularFunc: function() { console.log(this.name); },\n  arrowFunc: () => { console.log(this.name); }\n};\nobject.regularFunc(); // \"Lexical Demo\"\nobject.arrowFunc();   // undefined (inherits `this` from outer window/module scope)\n\n// 7. Indirect Invocation via arguments[0]()\nfunction callback() {\n  console.log(this.length);\n}\nconst callerObj = {\n  length: 5,\n  method() {\n    arguments[0](); // `this` is the `arguments` array object!\n  }\n};\ncallerObj.method(callback, 1, 2); // Output: 3 (arguments.length is 3)\n```\n\nStep 1 — Understand the topic.\nQuestion focus: The \"this\" Keyword & Execution Context Rules.\n\nStep 2 — Easy method.\nWrite the invariant/expected behavior first, trace one small example, then code the simplest correct version.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction solve<T>(value: T): T {\n  return value;\n}\n\nconsole.log(solve(\"example\"));\n```\n\nStep 4 — WITH BUILT-IN / PRACTICAL TypeScript:\n```ts\nconst result = \"example\".trim();\nconsole.log(result);\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual implementation for understanding, then the built-in/native API when it is clearer and correct.\n\nStep 7 — Edge cases:\nCheck empty input, invalid arguments, errors, cancellation/cleanup, large data, accessibility, and asynchronous race conditions where applicable.\n\nStep 8 — Senior interview takeaway:\nExplain the core mechanism, why the built-in/native version is preferred when appropriate, the performance characteristics, failure modes, testing strategy, and production trade-off.",
      productionExample:
        "Class methods passed as event listeners or React callbacks lose their `this` context if not explicitly bound or converted to arrow function properties.\n\nCoding practice note: first explain the core/manual approach, then show the built-in/native TypeScript approach and its trade-off.",
      example: {
        code: "// 1. Global Context\nconsole.log(this); // window (Browser) or globalThis (Node.js)\n\n// 2. Object Method Context (Implicit Binding)\nconst person = {\n  name: \"Ravi\",\n  sayHello() {\n    console.log(`Hello, I am ${this.name}`);\n  }\n};\nperson.sayHello(); // \"Hello, I am Ravi\"\n\n// 3. Detached Method Loss\nconst unboundSay = person.sayHello;\nunboundSay(); // \"Hello, I am undefined\" (strict mode) or global object\n\n// 4. Explicit Binding (call, apply, bind)\nconst boundSay = person.sayHello.bind({ name: \"Ram\" });\nboundSay(); // \"Hello, I am Ram\"\n\n// 5. Constructor Context (new keyword)\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\nconst lydia = new Person(\"Lydia\", \"Hallie\"); // `this` is newly instantiated object\nconst sarah = Person(\"Sarah\", \"Smith\");    // Without `new`, `this` is global/undefined, returns undefined!\n\n// 6. Arrow Function Lexical `this`\nconst object = {\n  name: \"Lexical Demo\",\n  regularFunc: function() { console.log(this.name); },\n  arrowFunc: () => { console.log(this.name); }\n};\nobject.regularFunc(); // \"Lexical Demo\"\nobject.arrowFunc();   // undefined (inherits `this` from outer window/module scope)\n\n// 7. Indirect Invocation via arguments[0]()\nfunction callback() {\n  console.log(this.length);\n}\nconst callerObj = {\n  length: 5,\n  method() {\n    arguments[0](); // `this` is the `arguments` array object!\n  }\n};\ncallerObj.method(callback, 1, 2); // Output: 3 (arguments.length is 3)",
        output: "window (Browser) or globalThis (Node.js)",
        explanation: "The value of `this` is determined by how a function is invoked at runtime. In regular functions, `this` points to the calling object (implicit binding), global object (or `undefined` in strict mode), or an explicitly bound context (`call`/`apply`/`bind`). Arrow functions inherit `this` lexically from their enclosing scope."
      },
      bestPractices: [
        'Use arrow functions for callbacks to automatically preserve outer lexical `this`',
        'Use explicit `.bind()`, `.call()`, or `.apply()` when delegating context to dynamically created functions',
        'Always instantiate constructor functions using the `new` keyword',
        'Avoid using arrow functions as object methods if you need access to the object via `this`',
      ],
      tradeOffs:
        'Arrow functions simplify callback context preserving but cannot be used as constructors and do not have their own `arguments` or `prototype`.',
      commonMistakes: [
        'Calling a constructor function without `new`, mutating global variables and returning `undefined`',
        'Assuming arrow functions have their own `this` that can be set using `bind`, `call`, or `apply`',
        'Invoking a method directly via `arguments[i]()` and expecting `this` to point to the parent object',
      ],
      followUpQuestions: [
        'What happens when `call` or `bind` is used on an arrow function?',
        'What are the 4 step-by-step operations performed by the `new` keyword?',
      ],
      relatedTopics: ['this Keyword', 'Execution Context', 'Implicit Binding', 'Explicit Binding', 'Arrow Functions'],
    },
  },
];