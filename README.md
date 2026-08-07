# Frontend Interview Master

An all-in-one coding and interview preparation platform for frontend
engineers at every level — 3, 5, 7, 10+ years, Staff, and Principal —
aimed at FAANG, product companies, unicorns, and enterprise MNCs. Target scope: **~17,000–18,000 curated questions** across 11 major categories (see [INTERVIEWHUB_CONTENT_SPECIFICATION.md](INTERVIEWHUB_CONTENT_SPECIFICATION.md)).

This is not a list of trivia answers. Every coding question works toward
[QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md) and every technical question
toward [TECHNICAL_QUESTION_TEMPLATE.md](TECHNICAL_QUESTION_TEMPLATE.md):
theory, diagrams, real and production-grade examples, dry runs,
complexity analysis, common mistakes, best practices, and what changes
about the answer at Senior vs Staff vs Principal level. Broader concept
pages (outside the coding/technical question format) still follow
[TEMPLATE.md](TEMPLATE.md).

> **Honest status:** this is a large, ongoing effort — see
> [PROGRESS.md](PROGRESS.md) for exactly what's written versus scaffolded
> today. A repo claiming to be complete at this scope on day one would be
> lying to you. This one tells you where it actually stands.

## Installation

The content (this markdown knowledge base) needs no install — read it
directly on GitHub or in any editor.

The interactive practice platform has a real, running frontend today,
built against mocked data (no backend, no login, no cross-device sync
yet — see [PROGRESS.md](PROGRESS.md#implementation-phases)):

```bash
cd frontend
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build; `npm run lint` and `npx tsc -b` run the same checks CI would run.
There is no `backend/` yet — see [ARCHITECTURE.md](ARCHITECTURE.md) and
[DATABASE.md](DATABASE.md) for what that will look like once Phases 1-3
in `PROGRESS.md` are implemented.

## Study plan

See [ROADMAP.md](ROADMAP.md) for the full sequenced path — which phase
to start at based on your experience level, and what order to work
through Programming Fundamentals → DSA → Language/Framework depth →
Applied Interview Practice.

## How to use this repo

- **By topic** — browse the numbered sections below.
- **By experience level** — start at [ROADMAP.md](ROADMAP.md), which maps
  which phase matters most at 3/5/7/10+ years, Staff, and Principal.
- **By company** — [85-company-wise-questions](85-company-wise-questions)
  indexes into FAANG/product/MNC-specific question sets.
- **The night before an interview** — [83-cheat-sheets](83-cheat-sheets)
  and [84-revision-notes](84-revision-notes), plus each topic's own
  Revision Checklist section.

## Structure

Each numbered folder is one section. Every section has a `README.md` index;
topics within it are individual `.md` files.

<details>
<summary><strong>Language & Core</strong></summary>

| # | Section |
|---|---------|
| [01](01-programming-fundamentals) | Programming Fundamentals |
| [02](02-javascript-fundamentals) | JavaScript Fundamentals |
| [03](03-advanced-javascript) | Advanced JavaScript |
| [04](04-typescript) | TypeScript |
| [05](05-browser-internals) | Browser Internals |
| [06](06-html) | HTML |
| [07](07-css) | CSS |
| [08](08-responsive-design) | Responsive Design |
| [09](09-accessibility) | Accessibility |

</details>

<details>
<summary><strong>React Ecosystem</strong></summary>

| # | Section |
|---|---------|
| [10](10-react) | React |
| [11](11-react-patterns) | React Patterns |
| [12](12-react-hooks) | React Hooks |
| [13](13-react-performance) | React Performance |
| [14](14-react-internals) | React Internals |
| [15](15-react-router) | React Router |
| [22](22-nextjs) | Next.js |
| [23](23-react-native) | React Native |
| [24](24-expo) | Expo |

</details>

<details>
<summary><strong>State Management</strong></summary>

| # | Section |
|---|---------|
| [16](16-redux) | Redux |
| [17](17-redux-toolkit) | Redux Toolkit |
| [18](18-rtk-query) | RTK Query |
| [19](19-zustand) | Zustand |
| [20](20-react-query) | React Query |
| [21](21-mobx) | MobX |

</details>

<details>
<summary><strong>Backend-Adjacent & Networking</strong></summary>

| # | Section |
|---|---------|
| [25](25-nodejs-basics) | Node.js Basics |
| [26](26-rest-api) | REST API |
| [27](27-graphql) | GraphQL |
| [28](28-websockets) | WebSockets |
| [29](29-authentication) | Authentication |
| [30](30-authorization) | Authorization |
| [31](31-security) | Security |
| [32](32-performance) | Performance |
| [33](33-caching) | Caching |
| [34](34-networking) | Networking |

</details>

<details>
<summary><strong>Tooling & Build</strong></summary>

| # | Section |
|---|---------|
| [35](35-vite) | Vite |
| [36](36-webpack) | Webpack |
| [37](37-babel) | Babel |
| [38](38-npm) | npm |
| [39](39-yarn) | Yarn |
| [40](40-pnpm) | pnpm |
| [41](41-monorepo) | Monorepo |
| [42](42-turborepo) | TurboRepo |
| [43](43-nx) | Nx |

</details>

<details>
<summary><strong>Architecture & Engineering Practice</strong></summary>

| # | Section |
|---|---------|
| [44](44-design-patterns) | Design Patterns |
| [45](45-clean-code) | Clean Code |
| [46](46-solid-principles) | SOLID Principles |
| [47](47-frontend-architecture) | Frontend Architecture |
| [48](48-micro-frontends) | Micro Frontends |
| [49](49-module-federation) | Module Federation |
| [50](50-testing) | Testing |

</details>

<details>
<summary><strong>Infra & Cloud</strong></summary>

| # | Section |
|---|---------|
| [51](51-ci-cd) | CI/CD |
| [52](52-docker) | Docker |
| [53](53-kubernetes-basics) | Kubernetes Basics |
| [54](54-cloud-basics) | Cloud Basics |
| [55](55-aws-frontend) | AWS Frontend |
| [56](56-azure-frontend) | Azure Frontend |
| [57](57-firebase) | Firebase |
| [58](58-supabase) | Supabase |

</details>

<details>
<summary><strong>Practice: Machine Coding, System Design, DSA</strong></summary>

| # | Section |
|---|---------|
| [59](59-machine-coding) | Machine Coding |
| [60](60-frontend-system-design) | Frontend System Design |
| [61](61-javascript-coding) | JavaScript Coding |
| [62](62-typescript-coding) | TypeScript Coding |
| [63](63-react-coding) | React Coding |
| [64](64-react-native-coding) | React Native Coding |
| [65](65-dsa) | Data Structures & Algorithms |

</details>

<details>
<summary><strong>Data & Environment</strong></summary>

| # | Section |
|---|---------|
| [66](66-sql-basics) | SQL Basics |
| [67](67-nosql-basics) | NoSQL Basics |
| [68](68-git) | Git |
| [69](69-github) | GitHub |
| [70](70-linux) | Linux |
| [71](71-vscode) | VS Code |

</details>

<details>
<summary><strong>Operations</strong></summary>

| # | Section |
|---|---------|
| [72](72-debugging) | Debugging |
| [73](73-monitoring) | Monitoring |
| [74](74-logging) | Logging |
| [75](75-error-tracking) | Error Tracking |
| [76](76-analytics) | Analytics |

</details>

<details>
<summary><strong>Interview Preparation</strong></summary>

| # | Section |
|---|---------|
| [77](77-behavioral) | Behavioral |
| [78](78-leadership) | Leadership |
| [79](79-mock-interviews) | Mock Interviews |
| [80](80-resume-preparation) | Resume Preparation |
| [81](81-hr-questions) | HR Questions |
| [82](82-salary-negotiation) | Salary Negotiation |
| [83](83-cheat-sheets) | Cheat Sheets |
| [84](84-revision-notes) | Revision Notes |

</details>

<details>
<summary><strong>Company-Specific & Level-Specific</strong></summary>

| # | Section |
|---|---------|
| [85](85-company-wise-questions) | Company-wise Questions |
| [86](86-faang-questions) | FAANG Questions |
| [87](87-product-company-questions) | Product Company Questions |
| [88](88-mnc-questions) | MNC Questions |
| [89](89-senior-engineer-questions) | Senior Engineer Questions |
| [90](90-staff-engineer-questions) | Staff Engineer Questions |
| [91](91-principal-engineer-questions) | Principal Engineer Questions |
| [92](92-interview-experiences) | Interview Experiences |

</details>

<details>
<summary><strong>Applied Practice & Career</strong></summary>

| # | Section |
|---|---------|
| [93](93-coding-challenges) | Coding Challenges |
| [94](94-projects) | Projects |
| [95](95-open-source) | Open Source |
| [96](96-ai-for-frontend) | AI for Frontend |
| [97](97-mcp) | MCP (Model Context Protocol) |
| [98](98-llm-integration) | LLM Integration |
| [99](99-career-guide) | Career Guide |

</details>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the authoring template, quality
bar, and how to add a topic page.

## For Claude Code sessions

[CLAUDE.md](CLAUDE.md) holds the standing project rules (coding
standards, question templates, company tags, quality bar). Content
generation should go through the reusable prompts in
[docs/prompts/](docs/prompts/) rather than re-deriving these rules each
session.

## License

Add a license here before treating this as a public open-source repo —
none is set yet.
