// Python + DSA Interview Handbook — Module 24: Architecture + System Design.
// Hand-authored technical questions covering how to actually REASON about
// software architecture and system design — architecture vs design vs
// coding, core principles and when they're overused, monolith vs modular
// monolith vs microservices (and when NOT to use microservices), Clean/
// Hexagonal/layered architecture and DDD bounded contexts, the system-design
// interview framework and capacity estimation, API Gateway vs load balancer,
// sync vs async communication and event-driven architecture, CQRS/event
// sourcing, distributed-systems fundamentals (partial failures, consensus),
// caching failure modes, database scaling in a system-design context,
// further architecture patterns (Strangler Fig, Sidecar, BFF), ADRs,
// architecture anti-patterns, production-grade coding for a rate limiter/
// LRU cache/distributed lock, and fully worked system-design case studies
// (URL shortener, real-time chat) applying the complete framework end to
// end. Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

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

interface QuestionSeed {
  id: string;
  number: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  experienceLevel: string;
  category: string;
  expectedAnswer: string;
  deepExplanation: string;
  productionExample: string;
  bestPractices: string[];
  tradeOffs: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  relatedTopics: string[];
}

const FREQUENCY_BY_DIFFICULTY: Record<QuestionSeed['difficulty'], number> = {
  Easy: 5,
  Medium: 4,
  Hard: 3,
};

const QUESTION_SEEDS: QuestionSeed[] = [
  {
    id: 'python-m24-1',
    number: 'PY-M24-1',
    title: 'Coding vs design vs architecture vs system design — where each actually operates',
    difficulty: 'Medium',
    experienceLevel: '4+ Years',
    category: 'Architecture Fundamentals',
    expectedAnswer:
      'CODING is implementing a specific function/class correctly; SOFTWARE DESIGN is organizing code within a single application (classes, modules, patterns like the repository pattern); ARCHITECTURE is the set of high-level structural decisions about an application (layering, module boundaries, dependency direction) that are expensive to change later; SYSTEM DESIGN is architecture at the scale of MULTIPLE cooperating services/components (which datastore, how services communicate, how the whole system scales/fails) — the defining distinction across this whole spectrum is the COST OF CHANGE: a naming choice is cheap to change tomorrow, a database choice is expensive to change in six months, and a "monolith vs microservices" decision can be enormously expensive to reverse a year later.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Calibrate how much deliberation/review time a decision deserves proportional to its COST OF CHANGE, not its apparent complexity or how interesting it is to discuss.',
      'Explicitly identify which "level" (coding/design/architecture/system design) a decision actually sits at before debating it — arguing architecture-level tradeoffs about a coding-level naming choice wastes everyone\'s time.',
      'Treat system-design-level decisions (service boundaries, datastore choices, cross-service communication patterns) as warranting the MOST upfront analysis, since they are the hardest and most expensive to reverse.',
    ],
    tradeOffs:
      'Spending architecture/system-design-level deliberation on every decision (including cheap, easily-reversible ones) wastes engineering time and slows delivery; spending only coding-level deliberation on genuinely expensive-to-reverse decisions (a database choice, a service boundary) risks costly rework months later — the skill is correctly SORTING decisions by their actual cost of change and matching deliberation depth accordingly.',
    commonMistakes: [
      'Treating every technical decision with the same level of ceremony/deliberation regardless of how expensive it would actually be to reverse if wrong.',
      'Under-analyzing a genuinely expensive-to-reverse system-design decision (a service boundary, a datastore choice) because it "felt like" a quick call in the moment.',
      'Confusing a design-level pattern discussion (e.g. which design pattern to use inside one service) with an architecture-level or system-design-level decision, applying disproportionate ceremony to a cheaply-reversible choice.',
    ],
    followUpQuestions: [
      'Give an example of a decision that LOOKS like a system-design decision but is actually cheap to reverse, and one that looks like a coding decision but is actually expensive.',
      'How would you structure a design-review process so review depth scales with a decision\'s actual cost of change?',
      'Walk through the four levels (coding/design/architecture/system design) for a feature of your choosing.',
    ],
    relatedTopics: ['Software Architecture', 'System Design', 'Cost of Change', 'Decision-Making', 'Engineering Judgment'],
  },
  {
    id: 'python-m24-2',
    number: 'PY-M24-2',
    title: 'Architecture principles and when each is overused',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Architecture Fundamentals',
    expectedAnswer:
      'Principles like single responsibility, low coupling/high cohesion, DRY, KISS, and YAGNI are genuinely valuable DEFAULTS, but every one of them has a well-known failure mode when applied dogmatically past the point of diminishing returns — the senior-level skill is recognizing that these are HEURISTICS to guide judgment, not rules to apply mechanically without regard to the actual cost/benefit in a specific situation.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Apply an architecture principle because it is solving a REAL, currently-observable problem in the code, not because it is "the correct thing to do" in the abstract.',
      'Before sharing/abstracting two similar-looking pieces of code, ask whether they represent the SAME concept that should always change together, or merely coincidentally similar-looking code that may need to diverge — only the former genuinely warrants DRY.',
      'Periodically revisit early abstraction/indirection decisions (an interface with only one implementation, a plugin point never actually used for a second plugin) and remove them once it is clear the anticipated flexibility never materialized.',
    ],
    tradeOffs:
      'Every architecture principle trades some form of immediate simplicity for a longer-term benefit (easier future changes, less duplication, better testability) — applying it correctly means that tradeoff genuinely pays off; applying it past the point of diminishing returns means paying the complexity cost with NO corresponding benefit, which is strictly worse than not applying the principle at all.',
    commonMistakes: [
      'Merging two superficially similar but conceptually unrelated pieces of code into one shared function, only to have to un-merge them (at higher cost than the original duplication) once they need to diverge.',
      'Introducing an interface/abstraction layer for a dependency that will realistically only ever have one implementation, adding indirection with no future benefit ever realized.',
      'Splitting a cohesive piece of logic into so many small, single-responsibility pieces that understanding the overall behavior requires jumping across many files, actually hurting comprehension.',
    ],
    followUpQuestions: [
      'Give an example from your own experience of applying DRY (or another principle) in a way that later had to be un-applied, and explain what signal would have caught it earlier.',
      'How would you decide, in a code review, whether a proposed abstraction is solving a real problem versus adding premature indirection?',
      'What is the practical difference between YAGNI (don\'t build for hypothetical future needs) and under-building for a KNOWN near-term requirement?',
    ],
    relatedTopics: ['SOLID Principles', 'DRY', 'YAGNI', 'Coupling and Cohesion', 'Premature Abstraction', 'Engineering Judgment'],
  },
  {
    id: 'python-m24-3',
    number: 'PY-M24-3',
    title: 'Monolith vs modular monolith vs microservices — and when NOT to use microservices',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Architectural Styles',
    expectedAnswer:
      'A MONOLITH deploys and scales as one unit with no enforced internal module boundaries; a MODULAR MONOLITH deploys as one unit but enforces clear internal module boundaries (each module owns its own data access, communicates with other modules through defined interfaces, as if it were a microservice — WITHOUT the network/deployment overhead); MICROSERVICES deploy and scale each service INDEPENDENTLY, each owning its own database, communicating over the network — the modular monolith is frequently the right STARTING architecture, since it gets most of microservices\' organizational benefits (clear boundaries, enforced ownership) without paying the very real distributed-systems complexity tax until genuine, demonstrated need (independent scaling, independent deployment, independent team ownership at real organizational scale) justifies it.',
    deepExplanation:
      "```text\nMonolith (no internal boundaries):\n  Client -> [Users + Orders + Payments + Products, all tangled together] -> one Database\n  Advantage: simplest possible mental model, trivial local development, one deploy pipeline\n  Disadvantage: as it grows, module boundaries erode — ANY part of the code can (and\n  eventually will) reach into any other part\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Default to a modular monolith (clear, enforced internal module boundaries; one deployable) for a new system, rather than reflexively choosing microservices before genuine independent-scaling/deployment needs exist.',
      'Extract a module into a genuine standalone microservice only in response to a SPECIFIC, observed need (a real scaling mismatch, a real cross-team deployment-coordination bottleneck) — never preemptively based on anticipated future scale alone.',
      'When you DO adopt microservices, ensure service boundaries minimize SYNCHRONOUS, chatty coupling between them — a "distributed monolith" (network-separated services that are still tightly, synchronously coupled) captures microservices\' cost with none of the benefit.',
    ],
    tradeOffs:
      'A modular monolith is dramatically simpler to develop, test, deploy, and debug (one process, no network partial failures, trivial cross-module transactions using ordinary database transactions) but cannot independently scale or deploy individual modules; microservices give genuine independent scaling/deployment/team-ownership at the cost of real, ongoing distributed-systems complexity (network latency, partial failures, no free cross-service transactions, N times the operational surface to monitor/secure/back up) — the right choice is a function of ACTUAL organizational and scaling needs, not architectural fashion.',
    commonMistakes: [
      'Adopting microservices for a new, small-team project before any genuine independent-scaling or cross-team-deployment-coordination need exists, paying the full complexity cost for benefits that will not materialize for a long time, if ever.',
      'Splitting a system into services with tight, synchronous, chatty coupling between them ("a distributed monolith"), capturing microservices\' network/deployment complexity cost with none of the actual independence benefit.',
      'Building a boundary-less, tangled monolith with no enforced module structure, making a LATER split into either a modular monolith or genuine microservices far more painful than if clear boundaries had been maintained from the start.',
    ],
    followUpQuestions: [
      'What SPECIFIC, observable signals would tell you it is time to extract a module from a modular monolith into a genuine standalone microservice?',
      'How does a well-structured modular monolith make a LATER migration to microservices cheaper than starting from a boundary-less monolith?',
      'What makes a "distributed monolith" strictly worse than either a well-structured monolith OR genuine, loosely-coupled microservices?',
    ],
    relatedTopics: ['Monolith', 'Modular Monolith', 'Microservices', 'Distributed Monolith', 'Service Boundaries', 'Architectural Styles'],
  },
  {
    id: 'python-m24-4',
    number: 'PY-M24-4',
    title: 'Clean/Hexagonal/layered architecture and DDD bounded contexts, applied concretely',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Clean & Hexagonal Architecture',
    expectedAnswer:
      'Clean Architecture, Hexagonal (Ports & Adapters) Architecture, and a simple Layered Architecture all express the SAME core idea in slightly different vocabulary: business/domain logic should depend on NOTHING external (no direct FastAPI imports, no direct SQLAlchemy imports inside domain logic), while infrastructure (the web framework, the database driver) depends INWARD on the domain — this DEPENDENCY DIRECTION (always pointing toward the domain, never outward from it) is what makes the domain logic testable in complete isolation and swappable at the infrastructure edges without touching business rules. Domain-Driven Design\'s BOUNDED CONTEXT is the companion idea at the multi-module/multi-service level: different parts of a system can legitimately use the SAME word ("Customer") to mean different things, and DDD makes that explicit rather than forcing one shared, compromised definition everywhere.',
    deepExplanation:
      "```text\nLayered Architecture (the simplest expression, already used throughout Modules 9-23):\n  Router (HTTP concerns) -> Service (business logic) -> Repository (persistence) -> Database\n  Dependency points DOWNWARD: Router depends on Service, Service depends on Repository\n\nClean Architecture (same idea, more explicit about domain independence):\n  Presentation (FastAPI routes) -> Application (use cases/services)\n    -> Domain (pure business rules, entities — ZERO external dependencies)\n    <- Infrastructure (SQLAlchemy repositories, external API clients) implements interfaces\n       DEFINED by the domain/application layer\n  KEY DIFFERENCE from plain layered: Infrastructure DEPENDS ON the domain\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Keep domain/business logic free of ANY direct framework or ORM imports — define the interfaces (ports) the domain needs, and implement them in a separate infrastructure layer (adapters) that depends INWARD on the domain, never the reverse.',
      'When the SAME real-world concept (a "Customer", a "Product") means genuinely different things across different parts of a system, let each bounded context define its own appropriately-scoped model rather than forcing one shared, ever-growing god-model.',
      'Use bounded contexts to inform BOTH microservice boundaries (in a microservices architecture) and module boundaries (in a modular monolith) — the same DDD reasoning applies at either scale.',
    ],
    tradeOffs:
      'Clean/Hexagonal architecture\'s strict dependency inversion adds real upfront structure (defining interfaces, writing adapters) compared to letting business logic directly call SQLAlchemy wherever convenient, but pays off through genuinely isolated, fast unit testing and the ability to swap infrastructure choices without touching business rules — for a small, simple CRUD application with little genuine business logic complexity, this structure can be more ceremony than the actual benefit justifies; it earns its keep specifically once business logic complexity and the need for infrastructure flexibility/testability grow meaningfully.',
    commonMistakes: [
      'Letting domain/business-logic code directly import and depend on SQLAlchemy models or FastAPI request/response objects, making it impossible to unit test business rules without a real database/HTTP context.',
      'Forcing one shared model (a single `User`/`Customer` class) to serve every context\'s needs across an entire large system, producing an ever-growing god-object that no team feels safe modifying.',
      'Applying full Clean/Hexagonal architecture ceremony to a genuinely simple CRUD application with minimal business logic, where the added structure provides little benefit over its ceremony cost.',
    ],
    followUpQuestions: [
      'Walk through exactly how a domain entity with zero SQLAlchemy dependency can still be persisted, without the domain layer knowing anything about the database.',
      'Give a concrete example (beyond "Customer") of a concept that should legitimately have different models in different bounded contexts of the same system.',
      'At what point of business-logic complexity does the overhead of Clean/Hexagonal architecture start being clearly worth its cost, versus a simpler layered approach?',
    ],
    relatedTopics: ['Clean Architecture', 'Hexagonal Architecture', 'Ports and Adapters', 'Domain-Driven Design', 'Bounded Context', 'Dependency Inversion'],
  },
  {
    id: 'python-m24-5',
    number: 'PY-M24-5',
    title: 'The system design interview framework, and capacity estimation done correctly',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'System Design Interview Method',
    expectedAnswer:
      'A structured system design interview flow — clarify requirements, separate functional from non-functional requirements, estimate scale, define the API, choose the data model, sketch high-level architecture, deep-dive on 1-2 hard parts, then cover reliability/security/observability/trade-offs — exists to prevent the two most common interview failure modes: jumping straight to a specific technology ("we\'ll use Kafka!") before requirements justify it, and running out of time on breadth because too much time was spent perfecting one early section. Capacity estimation specifically exists to make LATER architecture decisions (does this need sharding? does this need a cache? does this need a CDN?) DEFENSIBLE with actual numbers, rather than guesses.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Always do capacity estimation with real arithmetic BEFORE proposing specific technologies — let the actual numbers justify (or rule out) sharding, caching, message queues, and CDNs, rather than reaching for impressive-sounding infrastructure by default.',
      'Explicitly reference your capacity estimation later in the design ("given ~4,000 reads/sec, a single cached PostgreSQL instance handles this comfortably") rather than computing it once and never using it to justify subsequent decisions.',
      'Budget interview/design-doc time deliberately across the framework\'s steps — spending disproportionate time perfecting the API definition while leaving no time for reliability/security/trade-offs is a common, avoidable failure mode.',
    ],
    tradeOffs:
      'Rigorous capacity estimation takes real time upfront (arithmetic, explicit assumptions) compared to jumping straight to a familiar or impressive-sounding architecture, but is precisely what makes subsequent architecture choices DEFENSIBLE with actual numbers — skipping it risks either over-engineering (paying real complexity cost for scale that does not exist) or under-engineering (an architecture that will not actually hold up once real numbers are worked through).',
    commonMistakes: [
      'Proposing a complex, "impressive" architecture (sharding, Kafka, multi-region) without first doing capacity estimation to confirm the actual scale justifies that complexity.',
      'Doing capacity estimation once at the start and then never referencing the resulting numbers again to justify (or rule out) subsequent architecture decisions.',
      'Spending disproportionate time perfecting one early framework step (e.g. the API definition) at the expense of leaving no time for reliability, security, and trade-off discussion later in the design.',
    ],
    followUpQuestions: [
      'Redo the URL shortener capacity estimation for 10x the stated scale, and explain what (if anything) about the architecture would need to change.',
      'How would you handle a system-design interview where the interviewer explicitly says "assume very large scale from day one" — how does that change your estimation and architecture approach?',
      'What is the risk of an estimation that assumes AVERAGE traffic only, with no peak/burst factor, and how would you build in appropriate headroom?',
    ],
    relatedTopics: ['System Design Interview', 'Capacity Estimation', 'Scale Estimation', 'Interview Framework', 'Architecture Decision-Making'],
  },
  {
    id: 'python-m24-6',
    number: 'PY-M24-6',
    title: 'API Gateway vs Load Balancer, and idempotency at the system-design level',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'API Architecture',
    expectedAnswer:
      'A LOAD BALANCER operates primarily at LAYER 4 (TCP, simple connection distribution) or basic LAYER 7 (HTTP-aware routing by path/host), distributing traffic across interchangeable backend instances with no deep application awareness; an API GATEWAY is a LAYER 7 component sitting in front of potentially MANY DIFFERENT services (not just interchangeable replicas of one service), additionally handling cross-cutting API concerns — authentication, rate limiting, request/response transformation, routing to the CORRECT service by API path, aggregating logging/metrics across all services — the two are complementary, not competing (an API Gateway typically sits behind or alongside a load balancer, routing to load-balanced pools of each backend service).',
    deepExplanation:
      "```text\nLoad Balancer (distributes traffic across INTERCHANGEABLE replicas of ONE service):\n  Client -> Load Balancer -> [FastAPI instance 1, instance 2, instance 3, ...]\n  (any request could go to ANY instance — they are all running the SAME service)\n\nAPI Gateway (routes to DIFFERENT services, plus cross-cutting API concerns):\n  Client -> API Gateway\n              ├── Authentication (verify JWT/API key ONCE, at the edge)\n              ├── Rate Limiting (per-client, applied consistently across ALL services)\n              ├── Routing (path-based: /users/* -> User Service, /orders/* -> Order Service)\n              ├── Request/response transformation (e.g. aggregating multiple backend\n              │    calls into one response for a mobile client — a Backend-for-Frontend\n              │    pattern, covered in this module\\\n\nStep 1 — Understand the topic.\nDesign retries around idempotency or atomic state transitions so repeated delivery does not create duplicate effects.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef apply_once(key, seen):\n    if key in seen:\n        return False\n    seen.add(key)\n    return True\n\nseen = set()\nprint(apply_once(\"order-42\", seen))\nprint(apply_once(\"order-42\", seen))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nawait db.orders.update_one(\n    {\"idempotency_key\": key},\n    {\"$setOnInsert\": payload},\n    upsert=True,\n)\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A platform migrating from direct client-to-service calls to a centralized API Gateway eliminated an entire class of inconsistent rate-limiting bugs where a client had been able to exceed its intended overall request budget by distributing calls across three different backend services, each enforcing its OWN independent, unaware-of-the-others rate limit — after centralizing both authentication AND rate limiting at the gateway, the client\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Centralize authentication and rate limiting at an API Gateway (a single, well-audited chokepoint) rather than duplicating that logic independently across every downstream service.',
      'Use path-based (or host-based) routing at the gateway to direct requests to the correct backend service, with each service still sitting behind its OWN load balancer for distributing traffic across ITS interchangeable replicas.',
      'Thread an idempotency key consistently through every hop of a multi-service request chain, and store/check it at the entry-point component responsible for that specific retryable operation, so a client retry cannot cause duplicate multi-service side effects.',
    ],
    tradeOffs:
      'An API Gateway centralizes cross-cutting concerns (simpler individual services, consistent enforcement) at the cost of introducing a new, critical, potentially-single-point-of-failure component that must itself be highly available and low-latency (since EVERY request now passes through it) — this is a genuine tradeoff worth stating explicitly: centralization improves consistency but concentrates risk, which is exactly why gateway infrastructure typically needs its own redundancy/scaling strategy commensurate with its critical, all-traffic-passing role.',
    commonMistakes: [
      'Implementing rate limiting independently per-service with no shared enforcement point, allowing a client to exceed its intended aggregate rate by spreading requests across multiple services.',
      'Confusing an API Gateway (routes to DIFFERENT services, handles cross-cutting concerns) with a load balancer (distributes traffic across INTERCHANGEABLE replicas of ONE service) — the two solve different problems and are typically used together, not as alternatives to each other.',
      'Failing to thread an idempotency key consistently across every hop of a multi-service request chain, allowing a client retry to cause duplicate side effects somewhere downstream even though the entry point correctly deduplicated the initial request.',
    ],
    followUpQuestions: [
      'Why must the API Gateway itself be highly available and low-latency, given its architectural position, and how would you design for that?',
      'How would you design idempotency-key propagation across a chain of three services, ensuring a retry at any point in the chain does not cause duplicate downstream effects?',
      'When might it make sense to enforce a rate limit BOTH at the gateway (aggregate, cross-service) AND within an individual service (a stricter limit specific to one expensive endpoint)?',
    ],
    relatedTopics: ['API Gateway', 'Load Balancer', 'Rate Limiting', 'Idempotency', 'Authentication', 'System Design'],
  },
  {
    id: 'python-m24-7',
    number: 'PY-M24-7',
    title: 'Synchronous vs asynchronous communication, and when event-driven architecture is genuinely justified',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Communication Patterns',
    expectedAnswer:
      'SYNCHRONOUS communication (REST/gRPC — the caller waits for a response) is simpler to reason about (a direct request-response, easy to trace, immediate error feedback) but couples the caller\'s AVAILABILITY to the callee\'s availability — if the downstream service is slow or down, the caller is directly affected. ASYNCHRONOUS communication (via a message queue/broker) decouples the two in TIME (the producer does not wait for the consumer to actually process the message) and AVAILABILITY (the consumer can be temporarily down without blocking the producer), at the cost of significantly more complexity: no immediate response/error feedback, message ordering/delivery guarantees to reason about, and eventual (not immediate) consistency between producer and consumer.',
    deepExplanation:
      "```text\nSynchronous (REST/gRPC):\n  Client -> Service A -- waits for response --> Service B\n  Service A is BLOCKED until Service B responds (or times out)\n  Advantage: simple mental model, immediate feedback (success/failure known right away),\n  easy to trace a single request through the call chain\n  Disadvantage: Service A\\\n\nStep 1 — Understand the topic.\nUse async I/O end-to-end and share one client/pool per process instead of creating connections per request.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nasync def get_user(repository, user_id):\n    return await repository.get(user_id)\n\nprint(\"await repository.get(...)\")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nuser = await db.users.find_one(\n    {\"_id\": user_id}\n)\n```\n\nStep 5 — Example result:\n```text\nawaited database result\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Choose synchronous communication when the caller genuinely needs the result before it can proceed; choose asynchronous when the caller does not need to wait for the operation to complete before responding to its own caller.',
      'Reach for event-driven architecture specifically when MULTIPLE, independently-evolving consumers need to react to the same underlying fact — not for a single fixed producer-consumer relationship that a direct call (sync or simple async) would serve just as well with less infrastructure.',
      'Never let a genuinely non-critical, best-effort dependency (analytics, a non-critical notification) be called SYNCHRONOUSLY in a way that can block or slow down a critical user-facing operation.',
    ],
    tradeOffs:
      'Synchronous communication is simpler to reason about and gives immediate feedback, at the cost of coupling caller availability/latency to callee availability/latency; asynchronous/event-driven communication decouples availability and enables independently-evolving consumers, at the cost of eventual (not immediate) consistency, no immediate feedback on async work\'s success/failure, and genuine new complexity around message ordering, deduplication, and delivery guarantees — the right choice is a function of whether the caller genuinely needs an immediate result, and whether multiple independent consumers genuinely exist or are expected to grow.',
    commonMistakes: [
      'Calling a non-critical downstream dependency (analytics, a best-effort notification) synchronously in a way that couples a critical user-facing operation\'s latency/availability to that non-critical dependency.',
      'Introducing a full message-broker infrastructure (Kafka/RabbitMQ) for a fixed, single producer-consumer relationship that a direct function/service call would have served with far less operational complexity.',
      'Treating asynchronous/event-driven communication as strictly "better" or more scalable in all cases, without weighing its real cost in eventual-consistency complexity and reduced immediate feedback against the specific problem it is meant to solve.',
    ],
    followUpQuestions: [
      'Walk through a concrete scenario where you would explicitly choose synchronous communication despite event-driven architecture being available and "fashionable" — justify the choice.',
      'How does event-driven architecture specifically avoid the producer needing to know about or coordinate with each individual consumer, compared to a producer directly calling multiple downstream services?',
      'What genuinely new complexity does asynchronous communication introduce that synchronous communication does not have to deal with at all?',
    ],
    relatedTopics: ['Synchronous Communication', 'Asynchronous Communication', 'Event-Driven Architecture', 'Message Queues', 'Kafka', 'Decoupling'],
  },
  {
    id: 'python-m24-8',
    number: 'PY-M24-8',
    title: 'CQRS and Event Sourcing — when genuinely useful, and when unnecessary complexity',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'CQRS & Event Sourcing',
    expectedAnswer:
      'CQRS (Command Query Responsibility Segregation) separates the WRITE model (optimized for correctly validating and applying changes) from the READ model (optimized for however queries actually need to shape data) — they can even live in DIFFERENT databases, updated asynchronously. Event Sourcing goes further: instead of storing the CURRENT state of an entity, it stores the full, ordered SEQUENCE of events that led to that state, with current state derived (or "projected") by replaying those events — both patterns are powerful for SPECIFIC problems (a genuinely complex read/write shape mismatch; a genuine need for a full audit history of every state change) but are significant, deliberate complexity additions that are frequently reached for prematurely, well past where simpler CRUD would have sufficed.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team adopted full event sourcing for a simple internal admin tool\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Reach for CQRS specifically when the read and write shapes are meaningfully, persistently different — never introduce it for a typical CRUD resource where reads and writes are basically the same shape.',
      'Reach for Event Sourcing specifically when a full, replayable audit history of every state change is a GENUINE, articulated business requirement — for most applications, a simpler audit-log table alongside ordinary CRUD satisfies the same need with far less complexity.',
      'Treat both patterns as deliberate, significant complexity additions that must be justified by a SPECIFIC problem, not adopted because they are architecturally interesting or "more correct" in the abstract.',
    ],
    tradeOffs:
      'CQRS/Event Sourcing genuinely solve real problems (read/write shape mismatch; full auditable history) that ordinary CRUD cannot elegantly solve, at the cost of significant added complexity: eventual consistency between write and read models to reason about, event schema evolution/versioning to manage over time, and (for event sourcing specifically) every read requiring either event replay or a carefully-maintained projection — this complexity is a clear net win for the specific problems these patterns solve, and a clear net loss when applied to a problem ordinary CRUD would have handled just as well.',
    commonMistakes: [
      'Adopting CQRS or Event Sourcing for a typical CRUD resource with no genuine read/write shape mismatch or auditable-history requirement, adding real complexity with no corresponding architectural benefit.',
      'Underestimating the ongoing complexity of keeping a CQRS read model eventually consistent with the write model, treating the synchronization step as a simple implementation detail rather than a genuine, recurring engineering concern.',
      'Choosing event sourcing without a plan for EVENT SCHEMA EVOLUTION (what happens when an event\'s shape needs to change, given old events in the store were written with the OLD shape and can never be rewritten).',
    ],
    followUpQuestions: [
      'Give a concrete example of a system where CQRS is clearly justified, and one where it clearly is not, and explain the distinguishing factor.',
      'How would you handle event schema evolution in an event-sourced system, given that old events already in the append-only store can never be retroactively rewritten?',
      'How does CQRS\'s read/write model separation relate to (or differ from) simply adding a read replica or a cache in front of an ordinary CRUD database?',
    ],
    relatedTopics: ['CQRS', 'Event Sourcing', 'Read/Write Model Separation', 'Event Store', 'Projections', 'Architecture Complexity'],
  },
  {
    id: 'python-m24-9',
    number: 'PY-M24-9',
    title: 'Distributed systems fundamentals — partial failures, clock skew, and consensus concepts',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Distributed Systems',
    expectedAnswer:
      'A distributed system introduces failure modes a single-process application never faces: PARTIAL failures (some components fail while others keep working — unlike a single process, which either runs or has crashed entirely), the impossibility of distinguishing "the other node is slow" from "the other node is dead" (both look identical from the caller\'s side — a timeout), clocks that DRIFT across machines (so "which event happened first" cannot always be answered by comparing timestamps alone), and messages that can be DUPLICATED, REORDERED, or LOST in transit — CONSENSUS algorithms (Raft, Paxos) exist specifically to let a group of nodes agree on a single, consistent value/decision (like "who is the current leader") despite all of these failure modes.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team running a 3-node database cluster experienced a network partition that isolated ONE node from the other two — the isolated single node, having no majority/quorum available to it, correctly refused to elect itself as leader or accept writes (remaining read-only/unavailable), while the two-node majority group correctly continued operating normally as the legitimate primary — this is the quorum mechanism working exactly as designed, preventing the catastrophic alternative (both sides believing they were the leader, accepting conflicting writes that could never later be reconciled).\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Design for partial failures explicitly — assume any component can be slow OR dead, indistinguishably, from the caller\'s perspective, and build in timeouts/retries/idempotency accordingly (directly connecting to Module 23\'s reliability patterns).',
      'Never rely on wall-clock timestamps recorded on DIFFERENT machines to determine event ordering when correctness genuinely depends on it — use a logical clock/monotonic sequence, or a database\'s own transaction ordering, instead.',
      'Understand that a replicated system\'s quorum/majority requirement (e.g. MongoDB needing a majority of replica-set members reachable to elect a primary) exists specifically to prevent split-brain, and configure replica-set/cluster sizing with this majority-math in mind (an even number of nodes, e.g. 4, provides WORSE split-brain resistance than an odd number like 5, since a 2-2 split has no majority on either side).',
    ],
    tradeOffs:
      'Consensus-based systems (majority quorum requirements) trade some AVAILABILITY (a minority partition cannot make progress, even though it might be perfectly healthy and just cut off from the majority) for a strong, provable CONSISTENCY guarantee (no split-brain) — this is precisely CAP theorem\'s CP-leaning choice (Module 22) made concrete at the mechanism level: the system chooses to sacrifice availability for the minority partition specifically to preserve consistency for the system as a whole.',
    commonMistakes: [
      'Assuming a lack of response from a remote call definitively means the remote operation failed/did not happen, when it may have succeeded and only the RESPONSE was lost — this ambiguity is exactly why idempotency (Module 22/23) matters so much for anything retried.',
      'Comparing wall-clock timestamps recorded on different machines to determine "what happened first" in a context where clock skew could plausibly produce an incorrect ordering.',
      'Configuring a replicated cluster with an EVEN number of nodes, which can produce a scenario with no clear majority on either side of a partition, worse for split-brain resistance than an odd-numbered cluster.',
    ],
    followUpQuestions: [
      'Why does a 5-node cluster provide better split-brain resistance during a network partition than a 4-node cluster?',
      'Walk through exactly why "the request timed out" cannot tell a caller whether the corresponding write actually happened on the server, and how idempotency addresses this ambiguity.',
      'How does MongoDB\'s replica-set primary election relate conceptually to the Raft consensus algorithm\'s leader-election mechanism?',
    ],
    relatedTopics: ['Distributed Systems', 'Partial Failures', 'Clock Skew', 'Consensus', 'Quorum', 'Split-Brain', 'Raft', 'Leader Election'],
  },
  {
    id: 'python-m24-10',
    number: 'PY-M24-10',
    title: 'Caching problems at the system-design level — penetration, avalanche, and choosing when Redis should NOT be used',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Caching Architecture',
    expectedAnswer:
      'Beyond cache stampede (Module 23), CACHE PENETRATION (repeated requests for a key that does NOT exist in either the cache or the database, bypassing the cache entirely on every single request since there is never anything to cache) and CACHE AVALANCHE (many DIFFERENT cache keys expiring at roughly the SAME time, causing a synchronized wave of database load — a stampede at the scale of many keys simultaneously, not just one) are two further, distinct caching failure modes each requiring their own specific mitigation. Redis is an excellent general-purpose cache/fast-datastore, but is NOT the right tool for large, cold, rarely-accessed data (better suited to cheaper, disk-backed storage) or for data requiring genuinely strong durability guarantees as its PRIMARY store (Redis persistence exists but is not what it is optimized for).',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nCaching is an optimization with explicit TTL, invalidation, stampede, and failure behavior.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ncache = {}\n\ndef get_or_set(key, loader):\n    if key in cache:\n        return cache[key]\n    value = loader()\n    cache[key] = value\n    return value\n\nprint(get_or_set(\"user:1\", lambda: \"Ada\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nvalue = await redis.get(\"user:1\")\nif value is None:\n    value = await loader()\n    await redis.set(\n        \"user:1\",\n        value,\n        ex=60,\n    )\n```\n\nStep 5 — Example result:\n```text\nAda\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A gaming platform\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Cache negative results (with a short TTL) to mitigate cache penetration from repeated lookups of non-existent keys, rather than letting every such lookup bypass the cache and hit the database directly.',
      'Add randomized jitter to cache TTLs, especially for entries populated in a bulk batch at the same time, to prevent a cache avalanche where many keys expire simultaneously.',
      'Reach for Redis specifically for fast, simple-access-pattern, hot/frequently-accessed data (caching, sessions, rate limiting, leaderboards) — not for large cold archival data, primary durable storage of critical records, or data needing complex ad hoc querying.',
    ],
    tradeOffs:
      'Caching negative results and jittering TTLs add a small amount of implementation nuance compared to a naive cache-aside implementation, but directly prevent two distinct, real production failure modes (penetration and avalanche) that a naive implementation is genuinely vulnerable to; choosing Redis specifically for the access patterns it excels at (rather than reflexively for everything) avoids paying its memory cost for workloads that would be served just as well, or better, by cheaper disk-backed storage.',
    commonMistakes: [
      'Not caching negative ("not found") results, leaving the system vulnerable to cache penetration from repeated lookups of non-existent keys bypassing the cache entirely.',
      'Setting a uniform TTL on a large batch of cache entries populated at the same time, creating a cache avalanche when they all expire simultaneously.',
      'Using Redis as the SOLE, primary store for critical data requiring strong durability, rather than as a cache/fast layer in front of a properly durable primary database.',
    ],
    followUpQuestions: [
      'How would a Bloom filter help mitigate cache penetration at a larger scale than simply caching individual negative results, and what tradeoff does it introduce?',
      'Walk through exactly how randomized TTL jitter prevents a cache avalanche, with a concrete example of cache-population timing.',
      'Give a concrete example of a workload where Redis\'s sorted-set data structure is a dramatically better fit than a general-purpose database\'s ORDER BY/LIMIT query, and explain why.',
    ],
    relatedTopics: ['Cache Penetration', 'Cache Avalanche', 'Redis', 'Caching Architecture', 'Leaderboards', 'Bloom Filters'],
  },
  {
    id: 'python-m24-11',
    number: 'PY-M24-11',
    title: 'Further architecture patterns — Strangler Fig, Sidecar, Backend-for-Frontend, and Service Mesh',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Architecture Patterns',
    expectedAnswer:
      'The STRANGLER FIG pattern migrates a legacy monolith to a new architecture INCREMENTALLY (routing traffic for specific, individual features to a new implementation one at a time, while the old monolith keeps serving everything not yet migrated) rather than a risky "big bang" rewrite. The SIDECAR pattern attaches a helper process alongside a main service (in the SAME deployment unit, e.g. the same Kubernetes pod) to handle a cross-cutting concern (TLS termination, logging, service-mesh networking) WITHOUT that concern\'s code living inside the main application itself. BACKEND-FOR-FRONTEND (BFF) creates a DEDICATED backend tailored to each specific CLIENT TYPE (a mobile app\'s needs differ from a web app\'s), avoiding one generic API trying to awkwardly serve every client equally well. A SERVICE MESH is infrastructure providing service-to-service networking concerns (mTLS, retries, load balancing, observability) UNIFORMLY across many microservices, typically implemented via sidecars.',
    deepExplanation:
      "```text\nStrangler Fig — incremental legacy migration (named after the strangler fig vine, which\ngrows AROUND a host tree, gradually replacing it without ever needing to cut it down first):\n\n  Client -> Router/Proxy -> [feature A: OLD monolith]\n                         -> [feature B: OLD monolith]  <- migrating feature B NEXT\n                         -> [feature C: NEW service]   <- already migrated\n\n  Migrate ONE feature at a time, routing its traffic to the new implementation while\n  everything else keeps flowing to the old monolith — each migrated slice is small,\n  independently testable/rollback-able, dramatically lower-risk than a full rewrite\n\nSidecar — a helper process in the SAME deployment unit as the main service:\n\n  Pod:\n    [Main Application Container] <-> [Sidecar Container: handles TLS, logging,\n                                       service-mesh proxy, metrics collection]\n\n  The main application code stays FOCUSED on business logic; cross-cutting concerns\n  live in the sidecar, upgraded/configured independently of application code deploys\n\nBackend-for-Frontend (BFF) — a dedicated backend PER client type:\n\n  Mobile App -> Mobile BFF -> [aggregates/shapes data FROM multiple backend services\n                                specifically for mobile\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Prefer the Strangler Fig pattern over a full rewrite for migrating a legacy system — incremental, independently-validatable, easily-reversible steps dramatically reduce migration risk compared to one large, hard-to-reverse cutover.',
      'Introduce a Backend-for-Frontend specifically when different client types (mobile vs web vs a partner API) have genuinely different data-shaping/latency/bandwidth needs that one generic API cannot serve equally well.',
      'Adopt a full service mesh only once a system has GENUINELY many microservices where implementing cross-cutting networking concerns (mTLS, retries, observability) consistently in every individual service\'s code would be significant duplicated effort — not as a default for a small number of services.',
    ],
    tradeOffs:
      'Strangler Fig trades migration speed (it takes longer than a hypothetical instant full rewrite) for dramatically lower risk (each step is small, validated, reversible); BFF trades having a single unified API (simpler to maintain ONE thing) for each client getting a genuinely well-shaped API (at the cost of maintaining multiple backend layers); a service mesh trades additional infrastructure complexity (a new, significant piece of the stack to operate) for centralized, consistent cross-cutting concerns across many services (avoiding N duplicated implementations of the same concern).',
    commonMistakes: [
      'Attempting a full "big bang" rewrite of a legacy system instead of an incremental Strangler Fig migration, concentrating migration risk into one enormous, high-stakes cutover.',
      'Building one generic API trying to serve fundamentally different client types (mobile and web) equally well, resulting in compromises that serve neither client optimally.',
      'Adopting a full service mesh for a system with only a handful of microservices, paying significant infrastructure/operational complexity for a benefit (centralizing cross-cutting concerns across MANY services) that does not yet meaningfully apply at that scale.',
    ],
    followUpQuestions: [
      'Walk through how you would plan a Strangler Fig migration for a specific legacy monolith feature, including how you would validate the new implementation before fully cutting over.',
      'How would you decide whether a new client type (e.g. a voice-assistant integration) warrants its own dedicated BFF, versus reusing an existing one?',
      'At roughly what number/complexity of microservices does adopting a service mesh typically become justified, and what specific pain points would signal that threshold has been reached?',
    ],
    relatedTopics: ['Strangler Fig Pattern', 'Sidecar Pattern', 'Backend-for-Frontend', 'Service Mesh', 'Legacy Migration', 'Microservices'],
  },
  {
    id: 'python-m24-12',
    number: 'PY-M24-12',
    title: 'Architecture Decision Records (ADRs) — capturing WHY, not just WHAT',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Architecture Decision Records',
    expectedAnswer:
      'An Architecture Decision Record is a short, durable, version-controlled document capturing a significant architecture decision — NOT just what was decided, but the CONTEXT that made it the right call at the time, the ALTERNATIVES that were considered and rejected (and why), and the CONSEQUENCES/trade-offs accepted — its entire value is answering "why did we do it this way?" for someone (often a future version of the SAME team) six months or two years later, when the original context and reasoning have otherwise been forgotten.',
    deepExplanation:
      "```text\nADR Title: Use PostgreSQL (not MongoDB) for the Order Service\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Write an ADR for any decision that is genuinely significant and hard to reverse (per Module 24\'s coding/design/architecture/system-design distinction) — not for every minor implementation choice.',
      'Always include the ALTERNATIVES that were considered and specifically WHY they were rejected — this is the highest-value content for a future reader trying to understand whether the original reasoning still holds.',
      'Explicitly state what would trigger REVISITING the decision (e.g. a specific capacity-estimation assumption changing) so future readers know when the ADR\'s conclusions might no longer apply.',
    ],
    tradeOffs:
      'Writing ADRs takes real time upfront (documenting context, alternatives, and trade-offs beyond just implementing the decision) compared to simply making the decision and moving on, but pays for itself the first time a future team member needs to understand WHY an existing architecture choice was made — without it, that reasoning is either lost entirely or exists only in the memory of whichever engineer happened to be involved at the time, which is a fragile, unreliable form of institutional knowledge.',
    commonMistakes: [
      'Writing an ADR that only documents WHAT was decided, omitting the alternatives considered and the specific reasoning for rejecting them — losing the actual valuable content a future reader needs.',
      'Writing ADRs for every minor, easily-reversible implementation decision, diluting their value and making genuinely significant ADRs harder to find among a flood of low-value ones.',
      'Never revisiting an ADR\'s stated assumptions (e.g. a capacity estimate) even after the underlying reality has clearly changed, letting an outdated decision persist purely due to inertia.',
    ],
    followUpQuestions: [
      'Write a short ADR for a database-selection decision from your own experience (or a hypothetical one), including at least one seriously-considered alternative that was rejected.',
      'How would you organize a growing collection of ADRs so a new team member can quickly find the reasoning behind a specific existing architecture choice?',
      'What would trigger you to write a NEW ADR that explicitly supersedes an old one, rather than simply changing the implementation without updating the record?',
    ],
    relatedTopics: ['Architecture Decision Records', 'ADR', 'Documentation', 'Decision-Making', 'Institutional Knowledge'],
  },
  {
    id: 'python-m24-13',
    number: 'PY-M24-13',
    title: 'Architecture anti-patterns — premature microservices, overusing Kafka/Redis, and under/over-engineering',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Architecture Anti-Patterns',
    expectedAnswer:
      'The recurring theme across this module\'s anti-patterns is reaching for POWERFUL, FASHIONABLE infrastructure (microservices, Kafka, Redis, CQRS) because it is available, impressive, or "what serious companies use" — rather than because a SPECIFIC, articulable requirement (worked through via this module\'s capacity-estimation and decision frameworks) actually demands it; the equally real, opposite failure — under-engineering past a point where genuine, demonstrated need exists — is just as damaging, and the actual skill being tested is correctly calibrating complexity to ACTUAL, current (not speculative future) requirements.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nCaching is an optimization with explicit TTL, invalidation, stampede, and failure behavior.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ncache = {}\n\ndef get_or_set(key, loader):\n    if key in cache:\n        return cache[key]\n    value = loader()\n    cache[key] = value\n    return value\n\nprint(get_or_set(\"user:1\", lambda: \"Ada\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nvalue = await redis.get(\"user:1\")\nif value is None:\n    value = await loader()\n    await redis.set(\n        \"user:1\",\n        value,\n        ex=60,\n    )\n```\n\nStep 5 — Example result:\n```text\nAda\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Before introducing any significant architectural complexity (a new service, a message broker, a cache layer, an async pattern), articulate the SPECIFIC, current, measured problem it solves — reject "it might help at scale someday" as sufficient justification on its own.',
      'Treat observability, basic reliability patterns (timeouts, retries), and a backup strategy as near-mandatory baseline investment for essentially ANY production system, regardless of scale — these are not "premature complexity" in the same sense as microservices/Kafka/CQRS.',
      'Periodically revisit early architecture decisions as the system\'s ACTUAL scale/requirements become clearer, adding justified complexity when a real, measured need emerges — rather than either freezing the original (possibly now-outdated) decision forever, or having preemptively over-built for scale that never arrived.',
    ],
    tradeOffs:
      'Every piece of architectural complexity has a real cost (more infrastructure to operate, more failure modes to reason about, slower initial delivery) that is only worth paying once a corresponding, CURRENT benefit justifies it — the risk of over-engineering is paying that cost for a benefit that may never materialize; the risk of under-engineering is deferring genuinely necessary complexity (especially reliability/observability/security) to the worst possible moment, a production incident, where the cost of NOT having had it is dramatically higher than the cost of having built it proactively.',
    commonMistakes: [
      'Adopting microservices, Kafka, Redis, or CQRS because they are fashionable/impressive rather than because a specific, current, measured requirement demands them, paying real complexity cost for no corresponding benefit.',
      'Treating observability, reliability patterns, and backup strategy as "extra complexity to add later if needed", rather than near-mandatory baseline investment for essentially any production system.',
      'Never revisiting an early architecture decision as the system\'s actual, real-world scale and requirements diverge from the original assumptions it was based on.',
    ],
    followUpQuestions: [
      'Give an example from this module\'s content where you would explicitly justify adding complexity (a service extraction, a cache, an async pattern) with a SPECIFIC, articulable current requirement, not a speculative future one.',
      'Why are observability and basic reliability patterns treated differently from microservices/Kafka/CQRS in this module\'s framing — why are they "almost never truly optional" even for a small system?',
      'How would you structure a periodic architecture review process to catch cases where an early decision has become outdated as the system\'s actual scale/requirements evolved?',
    ],
    relatedTopics: ['Architecture Anti-Patterns', 'Premature Optimization', 'Over-Engineering', 'Under-Engineering', 'YAGNI', 'Architecture Decision-Making'],
  },
  {
    id: 'python-m24-14',
    number: 'PY-M24-14',
    title: 'Coding: a production-grade in-process rate limiter (token bucket) and LRU cache, with tests',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Architecture Coding',
    expectedAnswer:
      'Both the token-bucket rate limiter and the LRU (Least Recently Used) cache are classic "architecture coding" interview problems specifically because they force you to reason about the SAME concerns as a real distributed system, in miniature: the rate limiter needs correct handling of TIME-based state; the LRU cache needs O(1) operations under a fixed capacity constraint, correctly evicting the LEAST recently used entry — both are genuinely useful building blocks (an in-process version for a single instance; the same core algorithm generalizes to the Redis-backed distributed version covered in Module 23).',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nCaching is an optimization with explicit TTL, invalidation, stampede, and failure behavior.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ncache = {}\n\ndef get_or_set(key, loader):\n    if key in cache:\n        return cache[key]\n    value = loader()\n    cache[key] = value\n    return value\n\nprint(get_or_set(\"user:1\", lambda: \"Ada\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nvalue = await redis.get(\"user:1\")\nif value is None:\n    value = await loader()\n    await redis.set(\n        \"user:1\",\n        value,\n        ex=60,\n    )\n```\n\nStep 5 — Example result:\n```text\nAda\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use `time.monotonic()` (never `time.time()`) for measuring ELAPSED duration in any rate limiter or timeout logic, since wall-clock time can jump backward/forward and corrupt duration calculations.',
      'Combine a hash map (for O(1) key lookup) with a doubly linked list (for O(1) recency-order maintenance) to achieve genuine O(1) get/put/evict for an LRU cache — neither structure alone achieves this combined property.',
      'Protect any shared, mutable rate-limiter/cache state with an explicit lock (or, in an async context, an `asyncio.Lock`) when accessed from multiple threads/coroutines concurrently, to avoid the same check-and-decrement race condition covered for the Redis-backed version in Module 23.',
    ],
    tradeOffs:
      'An in-process rate limiter/LRU cache is simple, fast (no network round trip), and requires no external infrastructure, but its state is PER-PROCESS — it does not coordinate across multiple application instances (exactly the limitation Module 23\'s Redis-backed distributed rate limiter exists to solve) and is lost entirely on process restart — appropriate for single-instance concerns or as a FIRST layer in front of a distributed store (an in-process LRU cache in front of Redis, itself in front of the database, is a common, legitimate multi-layer caching architecture).',
    commonMistakes: [
      'Using `time.time()` instead of `time.monotonic()` for elapsed-duration calculations in a rate limiter, risking corrupted token counts if the system wall clock ever jumps backward.',
      'Implementing an LRU cache with a single data structure (a plain dict with no ordering, or a plain list with O(n) lookup), failing to achieve genuine O(1) performance for both lookup and eviction.',
      'Forgetting thread-safety (or async-safety) for shared rate-limiter/cache state accessed concurrently, introducing the same check-and-decrement race condition covered for Redis in Module 23, now in-process.',
    ],
    followUpQuestions: [
      'How would you extend the in-process LRU cache to also support a per-entry TTL, expiring entries independent of their recency-based eviction?',
      'Walk through exactly why combining a hash map with a doubly linked list achieves O(1) for both get and put, where either structure alone would not.',
      'How would you adapt the in-process token-bucket rate limiter to work correctly in an `async def` FastAPI context using `asyncio.Lock` instead of `threading.Lock`?',
    ],
    relatedTopics: ['Rate Limiter', 'Token Bucket', 'LRU Cache', 'Data Structures', 'Concurrency', 'Architecture Coding'],
  },
  {
    id: 'python-m24-15',
    number: 'PY-M24-15',
    title: 'Worked system design: a URL shortener, applying the complete framework end to end',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'System Design Case Study',
    expectedAnswer:
      'A URL shortener is a classic, deceptively simple-looking system-design problem specifically because it exercises the FULL framework (requirements, estimation, API, data model, architecture, deep-dive, reliability, security, trade-offs) on a problem whose CORE mechanic — generating a short, unique code and mapping it back to the original URL — is genuinely simple, meaning a strong answer is distinguished entirely by how RIGOROUSLY the framework is applied, not by clever cleverness in the core algorithm.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A real production URL-shortener service explicitly documented (via an ADR, per this module\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Apply the full system-design framework (requirements -> estimation -> API -> data model -> architecture -> deep dive -> reliability -> security -> trade-offs) even to a "simple-sounding" problem — the framework\'s rigor, not the problem\'s inherent complexity, is what a strong answer actually demonstrates.',
      'Explicitly justify the database choice using the estimated scale and access pattern (Module 22\'s decision framework), rather than defaulting to a familiar or fashionable technology.',
      'Explicitly identify and reject over-engineered options (Kafka for this scale\'s analytics needs) with a stated reason, demonstrating calibrated judgment rather than just listing every possible technology.',
    ],
    tradeOffs:
      'This worked design deliberately chooses the SIMPLEST architecture that satisfies the estimated requirements (single PostgreSQL instance, Redis cache, no message broker) — at 100x the estimated scale, several of these choices would need revisiting (sharding the database by short_code hash, a proper event-driven analytics pipeline), and a strong system-design answer explicitly states this ("at current scale, here is my design; here is specifically what would need to change at 100x, and why") rather than either over-building for hypothetical scale now, or ignoring the question of what happens at much larger scale entirely.',
    commonMistakes: [
      'Jumping straight to a complex, distributed architecture (sharded databases, Kafka, multiple caching layers) without first doing the capacity estimation that would justify (or rule out) that complexity.',
      'Missing the SSRF/open-proxy security consideration specific to any "accept and redirect to a user-submitted URL" feature — validating the URL is well-FORMED is not the same as validating it does not point at internal infrastructure.',
      'Failing to explicitly state trade-offs and rejected alternatives (why NOT sequential IDs, why NOT MongoDB, why NOT Kafka) — merely presenting the chosen design without justifying it against alternatives misses a large part of what a system-design answer is meant to demonstrate.',
    ],
    followUpQuestions: [
      'How would this design change at 100x the estimated scale — walk through specifically what would need to be added or changed, and why.',
      'How would you add custom alias support (users choosing their own short code) without breaking the collision-avoidance guarantees of the random-code approach?',
      'How would you design click-count tracking to avoid a hot-key write-contention problem on very popular short URLs (hint: relates to Module 19\'s atomic $inc discussion, generalized)?',
    ],
    relatedTopics: ['System Design', 'URL Shortener', 'Capacity Estimation', 'Database Selection', 'Security', 'SSRF'],
  },
  {
    id: 'python-m24-16',
    number: 'PY-M24-16',
    title: 'Worked system design: real-time chat, applying WebSockets, presence, and message persistence',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'System Design Case Study',
    expectedAnswer:
      'A real-time chat system\'s defining design challenge is that WebSocket connections are STATEFUL and STICKY to whichever server instance accepted them — this directly conflicts with the statelessness principle this module and Module 23 otherwise recommend, and resolving that tension (via a message broker/pub-sub layer connecting WebSocket-holding instances to each other) is the actual "deep dive" this problem is designed to test, on top of the same requirements/estimation/data-model/architecture framework applied to every other system design.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A chat platform\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use a pub/sub layer (Redis Pub/Sub, or Kafka if durability/replay of the routing layer itself is separately needed) to bridge WebSocket connections held on DIFFERENT server instances — never assume one instance can directly reach a connection held by another.',
      'Always persist messages to a durable store BEFORE/alongside real-time delivery, so a message is never lost purely because the recipient happened to be offline at the moment it was sent.',
      'Use Redis (with TTL-based expiry) for presence tracking specifically because it is transient, best-effort data that does not need strong durability — avoid writing high-frequency presence updates to the primary durable database.',
    ],
    tradeOffs:
      'Routing messages between server instances via pub/sub adds real architectural complexity compared to a hypothetical single-instance chat server (which would have no cross-instance routing problem at all, but also could not scale beyond one instance\'s connection capacity), and choosing Redis Pub/Sub over Kafka for this specific routing layer trades message-durability-at-the-routing-layer (Pub/Sub messages are not persisted/replayable) for lower latency and simplicity — an acceptable trade specifically because durability is already independently guaranteed by the PostgreSQL persistence layer, not by the routing mechanism itself.',
    commonMistakes: [
      'Assuming a WebSocket-holding server instance can directly deliver a message to a recipient connected to a DIFFERENT instance, without a pub/sub or equivalent cross-instance routing layer.',
      'Relying solely on real-time WebSocket delivery for message durability, losing messages sent to a recipient who happened to be offline at that exact moment.',
      'Writing high-frequency, inherently transient presence updates directly to the primary durable database instead of a fast, TTL-based store like Redis, adding unnecessary load to the system of record.',
    ],
    followUpQuestions: [
      'How would you handle a graceful, non-disruptive rolling deployment for a fleet of WebSocket-holding server instances, given clients are actively connected during the deploy?',
      'Why is Kafka NOT the right choice for the instance-to-instance message-routing layer here, even though it is a legitimate, durable message broker?',
      'How would you extend this design to support group conversations (many participants) without the pub/sub fan-out becoming a bottleneck for very large groups?',
    ],
    relatedTopics: ['System Design', 'Real-Time Chat', 'WebSockets', 'Pub/Sub', 'Presence', 'Message Durability', 'Graceful Shutdown'],
  },
];

export const MOCK_PYTHON_MODULE24_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
  detail: {
    id: seed.id,
    questionNumber: seed.number,
    title: seed.title,
    difficulty: seed.difficulty,
    companies: COMPANIES,
    frequency: FREQUENCY_BY_DIFFICULTY[seed.difficulty],
    category: seed.category,
    part: 'Python',
    concepts: seed.relatedTopics,
    solved: false,
    attempted: false,
    bookmarked: false,
    questionType: 'technical',
    experienceLevel: seed.experienceLevel,
    question: seed.title,
  },
  answer: {
    expectedAnswer: seed.expectedAnswer,
    deepExplanation: seed.deepExplanation,
    productionExample: seed.productionExample,
    bestPractices: seed.bestPractices,
    tradeOffs: seed.tradeOffs,
    commonMistakes: seed.commonMistakes,
    followUpQuestions: seed.followUpQuestions,
    relatedTopics: seed.relatedTopics,
  },
}));