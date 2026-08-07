// One-time scaffolding script for the repo's 100-folder structure.
// Run with: node scripts/scaffold.cjs
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const SECTIONS = [
  ['00', 'roadmap', 'Roadmap', 'How to use this repo by experience level (3/5/7/10+ yrs, Staff, Principal) and by goal (FAANG, product co, startup).'],
  ['01', 'programming-fundamentals', 'Programming Fundamentals', 'Language-agnostic foundations: data structures, complexity, paradigms, memory models.'],
  ['02', 'javascript-fundamentals', 'JavaScript Fundamentals', 'Core JS every engineer must know cold: scope, closures, this, prototypes, async basics.'],
  ['03', 'advanced-javascript', 'Advanced JavaScript', 'Engine internals, meta-programming, memory, concurrency, and modern ES features.'],
  ['04', 'typescript', 'TypeScript', 'Type system depth: generics, conditional/mapped types, inference, compiler, large-project structure.'],
  ['05', 'browser-internals', 'Browser Internals', 'Rendering pipeline, JS engine internals, networking stack, storage, security primitives.'],
  ['06', 'html', 'HTML', 'Semantic markup, forms, media, document structure, SEO-relevant fundamentals.'],
  ['07', 'css', 'CSS', 'Layout systems, cascade/specificity, modern CSS features, architecture at scale.'],
  ['08', 'responsive-design', 'Responsive Design', 'Fluid layout, breakpoints, container queries, device/viewport strategy.'],
  ['09', 'accessibility', 'Accessibility', 'WCAG, ARIA, keyboard/screen-reader UX, accessible component patterns, auditing.'],
  ['10', 'react', 'React', 'Core React model: rendering, hooks, composition, data flow.'],
  ['11', 'react-patterns', 'React Patterns', 'Compound components, render props, HOCs, headless UI, controlled/uncontrolled.'],
  ['12', 'react-hooks', 'React Hooks', 'Every built-in hook in depth, plus custom hook design.'],
  ['13', 'react-performance', 'React Performance', 'Memoization, virtualization, profiling, avoiding re-renders, bundle splitting.'],
  ['14', 'react-internals', 'React Internals', 'Fiber, reconciliation, concurrent rendering, the React Compiler.'],
  ['15', 'react-router', 'React Router', 'Routing patterns, data loading, nested routes, code-splitting by route.'],
  ['16', 'redux', 'Redux', 'Core Redux: store, actions, reducers, middleware, architecture at scale.'],
  ['17', 'redux-toolkit', 'Redux Toolkit', 'Slices, createAsyncThunk, entity adapters, modern idiomatic Redux.'],
  ['18', 'rtk-query', 'RTK Query', 'Data fetching/caching layer, cache invalidation, optimistic updates.'],
  ['19', 'zustand', 'Zustand', 'Minimal state management, patterns, when to choose it over Redux.'],
  ['20', 'react-query', 'React Query / TanStack Query', 'Server-state caching, invalidation, mutations, offline support.'],
  ['21', 'mobx', 'MobX', 'Observable state, reactions, comparison with Redux-style flux.'],
  ['22', 'nextjs', 'Next.js', 'App Router, Server Components, rendering strategies (SSR/SSG/ISR), streaming.'],
  ['23', 'react-native', 'React Native', 'Architecture (Fabric/JSI/TurboModules), navigation, performance, native modules.'],
  ['24', 'expo', 'Expo', 'Managed workflow, EAS build/submit, OTA updates, config plugins.'],
  ['25', 'nodejs-basics', 'Node.js Basics', 'Runtime model, event loop, streams, module system, building APIs.'],
  ['26', 'rest-api', 'REST API', 'Resource design, status codes, versioning, pagination, idempotency.'],
  ['27', 'graphql', 'GraphQL', 'Schema design, resolvers, caching, N+1 problem, client integration.'],
  ['28', 'websockets', 'WebSockets', 'Real-time transport, reconnection strategy, scaling, alternatives (SSE, long polling).'],
  ['29', 'authentication', 'Authentication', 'Session vs token auth, OAuth2/OIDC, JWT pitfalls, refresh flows.'],
  ['30', 'authorization', 'Authorization', 'RBAC/ABAC, route/component guards, permission modeling on the frontend.'],
  ['31', 'security', 'Security', 'XSS, CSRF, CSP, dependency risk, secure storage, OWASP frontend top risks.'],
  ['32', 'performance', 'Performance', 'Core Web Vitals, profiling, loading strategy, runtime performance.'],
  ['33', 'caching', 'Caching', 'HTTP caching, CDN, service worker caching, client-side cache strategies.'],
  ['34', 'networking', 'Networking', 'HTTP/1.1 vs 2 vs 3, TLS handshake, DNS, connection reuse.'],
  ['35', 'vite', 'Vite', 'Dev server model, plugin system, build config, migrating from other bundlers.'],
  ['36', 'webpack', 'Webpack', 'Module resolution, loaders/plugins, code splitting, optimization.'],
  ['37', 'babel', 'Babel', 'AST transforms, presets/plugins, polyfill strategy.'],
  ['38', 'npm', 'npm', 'Package resolution, lockfiles, scripts, publishing, workspaces.'],
  ['39', 'yarn', 'Yarn', 'Yarn Classic vs Berry, PnP, workspaces, comparison with npm/pnpm.'],
  ['40', 'pnpm', 'pnpm', 'Content-addressable store, strict node_modules, monorepo ergonomics.'],
  ['41', 'monorepo', 'Monorepo', 'Workspace design, shared config, versioning strategy, CI implications.'],
  ['42', 'turborepo', 'Turborepo', 'Task graph, remote caching, pipeline config.'],
  ['43', 'nx', 'Nx', 'Project graph, generators, affected commands, module boundaries.'],
  ['44', 'design-patterns', 'Design Patterns', 'GoF patterns applied to frontend: observer, factory, decorator, strategy, etc.'],
  ['45', 'clean-code', 'Clean Code', 'Naming, function design, readability, refactoring heuristics.'],
  ['46', 'solid-principles', 'SOLID Principles', 'SRP/OCP/LSP/ISP/DIP applied to components, hooks, and modules.'],
  ['47', 'frontend-architecture', 'Frontend Architecture', 'Layering, feature-based structure, boundaries, dependency direction.'],
  ['48', 'micro-frontends', 'Micro Frontends', 'Composition strategies, isolation, shared shell, ownership boundaries.'],
  ['49', 'module-federation', 'Module Federation', 'Runtime code sharing, remotes/hosts, versioning across teams.'],
  ['50', 'testing', 'Testing', 'Jest/Vitest, RTL, Playwright/Cypress, MSW, mocking, coverage strategy.'],
  ['51', 'ci-cd', 'CI/CD', 'Pipeline design, build caching, preview deploys, release gating.'],
  ['52', 'docker', 'Docker', 'Images/layers, multi-stage builds, containerizing a frontend app.'],
  ['53', 'kubernetes-basics', 'Kubernetes Basics', 'Pods/services/deployments as they matter for frontend delivery.'],
  ['54', 'cloud-basics', 'Cloud Basics', 'Core cloud concepts every frontend engineer should know.'],
  ['55', 'aws-frontend', 'AWS for Frontend', 'S3/CloudFront/Amplify, deployment patterns.'],
  ['56', 'azure-frontend', 'Azure for Frontend', 'Static Web Apps, CDN, deployment patterns.'],
  ['57', 'firebase', 'Firebase', 'Hosting, Auth, Firestore, real-time data for frontend apps.'],
  ['58', 'supabase', 'Supabase', 'Postgres-backed BaaS, Auth, Row Level Security, realtime.'],
  ['59', 'machine-coding', 'Machine Coding', 'Build-a-feature interview rounds: full component implementations.'],
  ['60', 'frontend-system-design', 'Frontend System Design', 'Whiteboard-level design for large-scale frontend products.'],
  ['61', 'javascript-coding', 'JavaScript Coding', 'Language-level coding problems (polyfills, utilities, async control flow).'],
  ['62', 'typescript-coding', 'TypeScript Coding', 'Type-level and implementation coding problems.'],
  ['63', 'react-coding', 'React Coding', 'Component-level coding problems and exercises.'],
  ['64', 'react-native-coding', 'React Native Coding', 'Mobile-specific coding problems and exercises.'],
  ['65', 'dsa', 'Data Structures & Algorithms', 'Arrays through DP/graphs, organized by pattern, with real interview questions.'],
  ['66', 'sql-basics', 'SQL Basics', 'Core query skills a frontend engineer is expected to have.'],
  ['67', 'nosql-basics', 'NoSQL Basics', 'Document/key-value stores, when NoSQL fits frontend-adjacent use cases.'],
  ['68', 'git', 'Git', 'Branching strategy, rebase vs merge, bisect, recovering from mistakes.'],
  ['69', 'github', 'GitHub', 'PR workflow, Actions, code owners, review practices.'],
  ['70', 'linux', 'Linux', 'Shell fluency expected of senior engineers: processes, permissions, networking basics.'],
  ['71', 'vscode', 'VS Code', 'Productive setup, debugging config, extensions worth knowing.'],
  ['72', 'debugging', 'Debugging', 'Systematic debugging method, browser devtools mastery, source maps.'],
  ['73', 'monitoring', 'Monitoring', 'RUM, synthetic monitoring, alerting for frontend systems.'],
  ['74', 'logging', 'Logging', 'Structured logging, client-side log pipelines, correlation IDs.'],
  ['75', 'error-tracking', 'Error Tracking', 'Sentry-style tooling, source-mapped stack traces, triage workflow.'],
  ['76', 'analytics', 'Analytics', 'Event taxonomy, privacy-aware tracking, product analytics for frontend.'],
  ['77', 'behavioral', 'Behavioral', 'STAR-method answers, common behavioral prompts, how seniority changes the answer.'],
  ['78', 'leadership', 'Leadership', 'Technical leadership without authority, driving decisions, mentoring.'],
  ['79', 'mock-interviews', 'Mock Interviews', 'Full mock interview scripts across rounds, with rubrics.'],
  ['80', 'resume-preparation', 'Resume Preparation', 'Resume structure for senior/staff/principal frontend roles.'],
  ['81', 'hr-questions', 'HR Questions', 'Recruiter-round questions and how to answer them.'],
  ['82', 'salary-negotiation', 'Salary Negotiation', 'Comp structure at levels, negotiation tactics, leveling calibration.'],
  ['83', 'cheat-sheets', 'Cheat Sheets', 'One-page references per major topic for last-minute review.'],
  ['84', 'revision-notes', 'Revision Notes', 'Condensed, high-density notes for spaced-repetition style review.'],
  ['85', 'company-wise-questions', 'Company-wise Questions', 'Index into the company-specific question sets below.'],
  ['86', 'faang-questions', 'FAANG Questions', 'Google, Meta, Amazon, Apple, Netflix question patterns.'],
  ['87', 'product-company-questions', 'Product Company Questions', 'Stripe, LinkedIn, Adobe, Atlassian, Salesforce, Shopify, and similar.'],
  ['88', 'mnc-questions', 'MNC Questions', 'Oracle, Walmart Global Tech, ServiceNow, Bloomberg-style question patterns.'],
  ['89', 'senior-engineer-questions', 'Senior Engineer Questions', 'What changes about the bar at the senior (5-7 yr) level.'],
  ['90', 'staff-engineer-questions', 'Staff Engineer Questions', 'Cross-team scope, technical strategy, ambiguous problem framing.'],
  ['91', 'principal-engineer-questions', 'Principal Engineer Questions', 'Org-level influence, multi-year technical vision, build-vs-buy calls.'],
  ['92', 'interview-experiences', 'Interview Experiences', 'Real, anonymized interview loop write-ups by company and level.'],
  ['93', 'coding-challenges', 'Coding Challenges', 'Timed practice sets that combine DSA + machine coding under pressure.'],
  ['94', 'projects', 'Projects', 'Full sample applications (dashboard, e-commerce, chat, etc.) built to a production standard.'],
  ['95', 'open-source', 'Open Source', 'How to build a credible OSS portfolio; contribution workflow.'],
  ['96', 'ai-for-frontend', 'AI for Frontend', 'Using AI tooling in the frontend workflow; what interviewers now expect.'],
  ['97', 'mcp', 'MCP (Model Context Protocol)', 'What MCP is, how it relates to frontend/AI-tool integration work.'],
  ['98', 'llm-integration', 'LLM Integration', 'Building UI features on top of LLMs: streaming, tool calls, guardrails.'],
  ['99', 'career-guide', 'Career Guide', 'Leveling frameworks, promotion cases, choosing your next move.'],
];

const TEMPLATE_CHECKLIST = `- [ ] Theory
- [ ] Visual diagram
- [ ] Architecture diagram
- [ ] Flow diagram
- [ ] Real-world example
- [ ] Production example
- [ ] Interview questions — Basic
- [ ] Interview questions — Medium
- [ ] Interview questions — Advanced
- [ ] Frequently asked questions
- [ ] Coding problems
- [ ] Hands-on exercises
- [ ] Mini project
- [ ] Full project
- [ ] Common mistakes
- [ ] Best practices
- [ ] Anti-patterns
- [ ] Debugging guide
- [ ] Performance tips
- [ ] Security considerations
- [ ] Accessibility notes
- [ ] Unit tests
- [ ] Integration tests
- [ ] Interview tips
- [ ] Senior-level discussion
- [ ] Staff-level discussion
- [ ] Principal-level discussion
- [ ] Company-specific notes
- [ ] References
- [ ] Revision checklist`;

let created = 0;
for (const [num, slug, title, blurb] of SECTIONS) {
  const dirName = `${num}-${slug}`;
  const dirPath = path.join(ROOT, dirName);
  fs.mkdirSync(dirPath, { recursive: true });
  const readmePath = path.join(dirPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const content = `# ${num} · ${title}

> ${blurb}

**Status:** 🚧 Planned — scaffolded, not yet written. See [PROGRESS.md](../PROGRESS.md) for what's real today.

## What belongs here

Every topic page in this section should eventually cover:

${TEMPLATE_CHECKLIST}

See [TEMPLATE.md](../TEMPLATE.md) for the full authoring template and [CONTRIBUTING.md](../CONTRIBUTING.md) for how to add a topic.

## Topics

_No topic pages written yet. This will become an index of \`.md\` files in this folder as they're added._

---
[← Back to root index](../README.md)
`;
    fs.writeFileSync(readmePath, content, 'utf8');
    created++;
  }
}

console.log(`Scaffolded ${created} folders (of ${SECTIONS.length} total sections).`);
