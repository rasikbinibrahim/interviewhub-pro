// Python + DSA Interview Handbook — Module 22: Database Architecture &
// Selection. Hand-authored technical questions covering how to actually
// DECIDE on database architecture in production systems — layering and
// coupling, the requirements/access-pattern-driven selection framework,
// PostgreSQL vs MongoDB decision criteria, normalization vs denormalization,
// CAP/PACELC, ACID and when transactions are/aren't needed, horizontal
// scaling (replicas/sharding), caching architecture, event-driven data
// patterns (outbox/CDC), polyglot persistence and database-per-service,
// distributed transactions (saga), idempotency, multi-tenancy, and a worked
// system-design case study — with genuine architecture reasoning, not just
// feature comparisons. Mirrors the MockTechnicalQuestion shape defined in
// @/mocks/questions.

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
    id: 'python-m22-1',
    number: 'PY-M22-1',
    title: 'Database architecture layers, and why business logic should not live in the database',
    difficulty: 'Medium',
    experienceLevel: '4+ Years',
    category: 'Database Architecture Fundamentals',
    expectedAnswer:
      'A well-layered backend keeps the DATABASE responsible only for durable storage, integrity constraints, and efficient querying, while BUSINESS LOGIC lives in the application\'s service layer — the database is treated as a replaceable implementation detail behind a repository interface, not as the place where the application\'s rules live. This separation is what makes it possible to test business logic without a real database, evolve the schema without rewriting business rules, and (in principle, even if rarely exercised) swap the underlying database technology without touching the service layer.',
    deepExplanation:
      '```text\nClient\n  |\nAPI (FastAPI router)         — HTTP concerns only: parsing, status codes, auth extraction\n  |\nBusiness Logic (Service)      — the actual RULES: "an order cannot ship before payment clears"\n  |\nPersistence Layer (Repository) — translates domain operations to queries; the ONLY layer that\n  |                                 knows about SQLAlchemy/PyMongo/collection names/table schemas\nDatabase (PostgreSQL/MongoDB)\n  |\nStorage (disk, WiredTiger/heap files, WAL)\n```\n\nWhat belongs where, concretely: the DATABASE enforces INVARIANTS that must hold regardless of which code path writes the data (foreign keys, `CHECK` constraints, unique indexes) — these are the rules a malicious or buggy direct SQL client could otherwise violate; the SERVICE layer enforces BUSINESS RULES that are about the current use case and change with product requirements ("a user can have at most 3 active carts", "an order over $10,000 requires manager approval") — these are not fundamental data-integrity invariants, they are policy, and policy changes far more often than schema does.\n\nWhy NOT put business logic in the database (stored procedures/triggers) as a default: it becomes invisible to the application\'s test suite, version control history gets split across migration files and application code, it is harder to unit test in isolation (requires a real database connection), and it ties business-rule changes to a DATABASE DEPLOYMENT rather than an application deployment — for a small, stable set of hard invariants (e.g. an audit trigger, or a `CHECK` constraint), this cost is worth paying; for evolving business POLICY, it almost never is.\n\nWhy the repository/persistence layer specifically matters: it is the ONLY place that imports `sqlalchemy`/`pymongo` and knows what a "row" or "document" looks like — the service layer above it works with plain domain objects/Pydantic models, meaning a service-layer UNIT TEST can inject a fake/in-memory repository (via dependency injection, as covered in Module 12/21) and verify business logic completely independent of any real database, running in milliseconds instead of requiring a live PostgreSQL/MongoDB instance.',
    productionExample:
      'A payments service enforces "an order cannot ship before payment clears" in the ORDER SERVICE (business policy, subject to change — e.g. a future "ship on approval" tier), while enforcing "an order_item.quantity must be positive" as a database `CHECK` constraint (a fundamental invariant that should be true regardless of which code path — API, admin script, data migration — ever writes an order_item) — mixing these up (putting the shipping-gate rule in a trigger, or relying purely on application code for the quantity invariant) would either make the shipping policy invisible to code review/testing, or leave a hole where a buggy migration script could insert a negative quantity.',
    bestPractices: [
      'Enforce fundamental, rarely-changing DATA INVARIANTS (referential integrity, basic value constraints) at the database layer via constraints — they apply no matter which code path writes the data.',
      'Keep evolving BUSINESS POLICY in the application service layer, where it is version-controlled alongside the rest of the application, unit-testable in isolation, and deployed with normal application releases.',
      'Never let the router/API layer or the service layer import the database driver directly — route all actual queries through a repository so the persistence technology stays swappable and mockable.',
    ],
    tradeOffs:
      'Strict layering (router -> service -> repository -> database) adds a small amount of ceremony/indirection for simple CRUD operations, but pays for itself the moment business logic needs to be unit-tested independent of a real database, or the moment two different persistence technologies (PostgreSQL AND MongoDB, per Module 22\'s polyglot-persistence topic) need to sit behind the same service — a flat "route handler talks directly to the ORM" design works fine for small, single-database toy projects but becomes a genuine liability as the system and team grow.',
    commonMistakes: [
      'Scattering raw SQLAlchemy/PyMongo queries directly inside FastAPI route handlers, making business logic untestable without a live database and impossible to reuse across multiple entry points (HTTP API, background worker, CLI script).',
      'Pushing evolving business POLICY into database triggers/stored procedures, making it invisible to the application\'s normal code review, testing, and deployment process.',
      'Conflating "this must always be true" (a database invariant) with "this is our current business rule" (application policy) and enforcing both the same way, making the stable invariants harder to see and the changing policy harder to evolve.',
    ],
    followUpQuestions: [
      'Give a concrete example of a rule that should be a database CHECK constraint versus one that should be application-layer business logic, and explain the distinguishing principle.',
      'How does the repository pattern specifically enable unit-testing business logic without a real database connection?',
      'When, if ever, would you deliberately reach for a database trigger instead of application code, and why?',
    ],
    relatedTopics: ['Layered Architecture', 'Repository Pattern', 'Service Layer', 'Database Constraints', 'Separation of Concerns'],
  },
  {
    id: 'python-m22-2',
    number: 'PY-M22-2',
    title: 'Database categories — relational, document, key-value, wide-column, graph, search, time-series',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Database Categories',
    expectedAnswer:
      'Each database category optimizes for a different SHAPE of data and access pattern: relational (PostgreSQL) for structured data with rich relationships and ad hoc queries; document (MongoDB) for self-contained, flexibly-shaped aggregates; key-value (Redis) for the simplest possible O(1) lookups by a known key, usually in-memory; wide-column (Cassandra-style) for very high write throughput at massive scale with denormalized, query-shaped tables; graph (Neo4j-style) for deep, multi-hop relationship traversal; search engines (Elasticsearch/OpenSearch) for relevance-ranked full-text search and faceted filtering; time-series (TimescaleDB/InfluxDB-style) for append-mostly, time-ordered metrics with time-windowed aggregation as the primary query shape.',
    deepExplanation:
      '```text\nCategory       Example(s)          Optimized for                          Weak at\n--------       -----------          --------------                          -------\nRelational     PostgreSQL, MySQL    ad hoc joins, strong transactions,       horizontal write scaling,\n                                    structured/normalized data                extremely flexible schemas\nDocument       MongoDB              flexible, self-contained aggregates,     deep multi-hop relationship\n                                    read/write as a whole unit                 traversal, complex ad hoc joins\nKey-value      Redis                O(1) lookup by key, caching,             anything needing rich queries\n                                    ephemeral/session state, rate limits       or relationships\nWide-column    Cassandra-style      extremely high write throughput,         ad hoc query flexibility\n                                    time-ordered/denormalized query tables     (queries must match table design)\nGraph          Neo4j-style          multi-hop relationship traversal          bulk analytical aggregation,\n                                    ("friends of friends", fraud rings)        simple CRUD at massive scale\nSearch engine  Elasticsearch/       relevance-ranked full-text search,        transactional writes,\n               OpenSearch           faceted filtering, typo tolerance         strong consistency\nTime-series    TimescaleDB,         append-mostly time-ordered data,          ad hoc relational queries\n               InfluxDB-style       time-bucketed aggregation, retention      unrelated to time\n```\n\nThe practical, interview-relevant framing: NONE of these categories is a strict superset of another, and the "right" choice is always workload-dependent, never popularity-dependent. A graph database can technically store the same data as PostgreSQL, but a "find all products this user\'s 2nd-degree social connections purchased" query is a few lines of graph traversal versus a genuinely painful recursive multi-join in SQL; conversely, "give me the exact total revenue for Q3, broken down by region and product category, joined against a dozen dimension tables" is exactly what a relational/analytical engine excels at and a graph database is a poor fit for.\n\nA senior-level nuance worth stating explicitly: most real production SYSTEMS use MULTIPLE categories together (polyglot persistence, covered later in this module) — e.g. PostgreSQL as the transactional source of truth, Redis for caching/sessions, Elasticsearch for search, and possibly a time-series store for metrics/monitoring — rather than forcing every workload through one general-purpose database.',
    productionExample:
      'An e-commerce platform uses PostgreSQL for orders/inventory/payments (strong transactions, relational integrity), Redis for session state and hot product-page caching (sub-millisecond key lookups), and Elasticsearch for the product search bar (relevance ranking, typo tolerance, faceted category/price filters) — each category chosen specifically because the corresponding workload plays to that category\'s strength, not because one database was deemed "the best" overall.',
    bestPractices: [
      'Match the database CATEGORY to the actual shape of the data and its access pattern first, before comparing specific products within a category.',
      'Expect and design for MULTIPLE database categories coexisting in one real production system rather than assuming a single database must serve every workload.',
      'When a workload genuinely does not fit well in your primary database\'s category (e.g. full-text relevance search in a pure relational store), introduce the RIGHT specialized tool rather than forcing an awkward workaround.',
    ],
    tradeOffs:
      'Specialized database categories give dramatically better performance/ergonomics for their target workload, at the cost of OPERATIONAL COMPLEXITY — every additional database technology in a system is another thing to deploy, monitor, back up, secure, and keep a team skilled in; the senior-level judgment call is knowing when a workload\'s mismatch with your primary database is painful ENOUGH to justify that added complexity, versus when a slightly awkward but "good enough" fit in your existing database is the pragmatic choice.',
    commonMistakes: [
      'Assuming one database category (often whichever is most familiar to the team) should handle every workload in a system, forcing poor-fit use cases (e.g. relevance-ranked search) into a technology not designed for them.',
      'Introducing a new database category for every workload that is even slightly awkward in the existing database, without weighing the real operational cost of each additional technology.',
      'Treating category comparisons as "which is objectively best" rather than "which fits this specific access pattern" — there is no universal ranking across categories.',
    ],
    followUpQuestions: [
      'Give a concrete query that is easy in a graph database but painful in a relational one, and explain why structurally.',
      'When would introducing Elasticsearch alongside PostgreSQL be premature, versus clearly justified?',
      'How would you decide whether a wide-column store (Cassandra-style) is warranted over PostgreSQL for a given high-write workload?',
    ],
    relatedTopics: ['Database Categories', 'Polyglot Persistence', 'NoSQL', 'Search Engines', 'Graph Databases', 'Time-Series Databases'],
  },
  {
    id: 'python-m22-3',
    number: 'PY-M22-3',
    title: 'The database selection framework — requirements to final choice, stage by stage',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Selection Framework',
    expectedAnswer:
      'Database selection should be a systematic, requirements-driven process — starting from FUNCTIONAL and NON-FUNCTIONAL requirements, then the DATA MODEL and ACCESS PATTERNS the application actually needs, then CONSISTENCY and TRANSACTION requirements, then SCALE/LATENCY/AVAILABILITY targets, and only THEN comparing specific candidate technologies — rather than starting from "which database do I already know" or "which database is trending", which is the single most common cause of a poor-fit database choice discovered only after significant production pain.',
    deepExplanation:
      '```text\nRequirements Analysis      — what does the system actually need to do, and NOT do?\n        |\nData Model                 — is the data naturally relational, document-shaped, key-value, graph-like?\n        |\nAccess Patterns             — point lookups? range queries? complex joins? full-text search? aggregations?\n        |\nConsistency Requirements    — does this data need STRONG consistency, or is eventual consistency acceptable?\n        |\nTransaction Requirements    — do operations need multi-step atomicity, or are single-document writes enough?\n        |\nScale (current AND projected) — thousands, millions, or billions of records/requests?\n        |\nLatency Requirements         — sub-millisecond? tens of milliseconds? seconds acceptable?\n        |\nAvailability Requirements    — what uptime SLA, and what does downtime actually cost the business?\n        |\nDurability Requirements      — can ANY data loss ever be acceptable (e.g. best-effort analytics events)?\n        |\nQuery Complexity             — simple key lookups, or ad hoc multi-table joins and aggregations?\n        |\nOperational Requirements     — team\'s existing expertise, managed-service availability, on-call burden\n        |\nCost                         — licensing, infrastructure, and (often underweighted) ENGINEERING TIME cost\n        |\nSecurity/Compliance          — encryption, data residency, audit requirements (e.g. financial regulations)\n        |\nFinal Database Choice\n```\n\nA worked example applying the framework, briefly: a "payment ledger" requirement — functional requirement: record every debit/credit with full auditability; access pattern: mostly point lookups by account, occasional range queries by date; consistency: STRONG (a balance must never be double-counted or lost); transactions: YES, multi-step (debit + credit + audit row must all succeed or all fail together); scale: moderate (millions, not billions, of rows for most businesses); latency: tens of milliseconds acceptable; durability: NO data loss ever acceptable; query complexity: moderate (joins against accounts/customers for reporting); operational requirements: team likely already knows SQL. Running through this framework arrives cleanly at PostgreSQL (or another strongly-consistent relational database) WITHOUT ever needing a "PostgreSQL vs MongoDB feature comparison table" — the requirements themselves point directly at the answer.\n\nThe senior-level insight this framework encodes: database selection interviews are not testing "do you know MongoDB has $lookup" — they are testing whether you REASON from requirements to conclusion in a structured, defensible way, because that is the actual skill a staff/principal engineer needs when a real, ambiguous production decision is on the table.',
    productionExample:
      'A team building a new "user notification preferences" feature initially defaulted to "we already use MongoDB for everything, so it goes there" — running the requirements framework instead revealed the actual access pattern was almost entirely simple key lookups by user_id with no complex queries or need for cross-entity joins, meaning EITHER database would have worked fine, and the actual deciding factor should have been operational simplicity (reusing the existing PostgreSQL instance already running migrations/backups/monitoring) rather than reflexively spinning up a new MongoDB collection "because that is what we use for flexible data".',
    bestPractices: [
      'Always start database selection from REQUIREMENTS and ACCESS PATTERNS, never from "which database is popular" or "which database do I already know" as the primary driver.',
      'Explicitly separate CURRENT scale from PROJECTED scale in the requirements analysis — over-engineering for hypothetical future scale is as real a mistake as under-engineering for known near-term growth.',
      'Weight OPERATIONAL cost (team expertise, on-call burden, managed-service availability) as seriously as raw technical fit — the "best" database on paper that nobody on the team can operate confidently is often the wrong practical choice.',
    ],
    tradeOffs:
      'A rigorous, staged requirements-first selection process takes more upfront time than "just pick the database we already use", but dramatically reduces the risk of discovering a fundamental workload mismatch only after significant production investment — the tradeoff is analysis time paid early versus (potentially much larger) migration/rework cost paid late.',
    commonMistakes: [
      'Choosing a database based on team familiarity or industry popularity without first working through the actual requirements and access patterns.',
      'Skipping explicit consistency/transaction-requirement analysis and discovering only in production that a workload needed strong guarantees the chosen database does not provide by default.',
      'Treating "scale" as a single number rather than distinguishing current scale, near-term projected scale, and speculative long-term scale — each warrants a different amount of design weight.',
    ],
    followUpQuestions: [
      'Walk through this framework for a "product catalog with variants and flexible attributes" requirement, and explain where it points and why.',
      'At what point in this framework would a requirement for full-text search meaningfully change the outcome?',
      'How would you push back, in an interview or in real design review, on a stakeholder who has already decided on a database before requirements are gathered?',
    ],
    relatedTopics: ['Database Selection', 'Requirements Analysis', 'Access Patterns', 'System Design', 'Architecture Decision-Making'],
  },
  {
    id: 'python-m22-4',
    number: 'PY-M22-4',
    title: 'PostgreSQL vs MongoDB — decision criteria, not a feature checklist',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'PostgreSQL vs MongoDB',
    expectedAnswer:
      'Neither PostgreSQL nor MongoDB is universally "better" — PostgreSQL wins when the data is genuinely relational (many entities queried and joined from many different angles) and/or strong multi-step transactional consistency is the DEFAULT mode of operation the workload needs (banking, payments, inventory with hard invariants); MongoDB wins when data is naturally document-shaped and mostly read/written as a whole aggregate, schemas evolve frequently and heterogeneously, and horizontal write scaling via native sharding is a genuine anticipated need — the deciding factor should always be the SPECIFIC workload\'s access patterns and consistency needs, not a general feature-comparison table.',
    deepExplanation:
      '```text\nCategory              PostgreSQL                          MongoDB\n--------              ----------                          -------\nData model            Relational (rows/tables)             Document (BSON, nested/embedded)\nSchema                Enforced, structured                 Flexible, evolves per-document if desired\nRelationships          Excellent (foreign keys, JOINs)       Embed for bounded, reference for large/shared\nJoins                  Native, flexible, ad hoc              $lookup — works, but not as flexible/optimized\n                                                              for arbitrary ad hoc multi-collection joins\nTransactions           Strong, the DEFAULT mode              Supported (multi-doc), but the exception,\n                                                              not the lightest-weight default write path\nComplex analytical SQL Excellent (window functions, CTEs)    Aggregation pipeline — powerful, more verbose\nJSON/flexible fields   JSONB (great, but "bolted on")         Native (the document itself IS the flexible part)\nHorizontal scaling     Possible (Citus, manual sharding)      Native, first-class sharding\nStrong consistency     Excellent, default                    Configurable — achievable, must be deliberate\n```\n\nThe decision criteria, stated as concrete diagnostic QUESTIONS rather than a scorecard: (1) "Does the SAME piece of data get queried and joined from MANY DIFFERENT angles across the application?" — a strong YES points to PostgreSQL, because a document model optimized for ONE primary access pattern (the embedding decision) becomes awkward when a second, very different access pattern emerges later. (2) "Does correctness fundamentally REQUIRE multi-step atomicity as the common case, not the exception?" (debit+credit+audit must succeed/fail together, EVERY time) — points strongly to PostgreSQL, where transactions are the default, well-optimized mode; MongoDB CAN do this but it is working against the grain of the tool. (3) "Does the data\'s SHAPE genuinely vary a lot between instances, or evolve frequently in ways that would require constant migrations in a rigid schema?" — points to MongoDB. (4) "Is write throughput at a scale where a SINGLE PostgreSQL primary (even with read replicas) will become the bottleneck, and horizontal WRITE scaling is a near-term real requirement?" — points to MongoDB\'s native sharding (or a distributed SQL variant, a more advanced option outside this module\'s scope).\n\nA senior-level answer to "which is better" should EXPLICITLY reject the premise of a universal ranking and instead walk the interviewer through 2-3 of these diagnostic questions applied to the SPECIFIC scenario given — this is precisely what separates a memorized comparison table from genuine architectural judgment.',
    productionExample:
      'A fintech company runs its core ledger (accounts, transactions, balances — strong consistency, transactions are the default mode, heavily joined/reported-on data) on PostgreSQL, while running its customer-support ticketing system (highly variable ticket metadata that differs wildly by support category, rarely joined against other entities, evolves its shape every quarter as new support workflows are added) on MongoDB — both choices are correct for their respective workloads within the SAME company, illustrating that the decision is per-workload, not a single company-wide database philosophy.',
    bestPractices: [
      'Answer "PostgreSQL or MongoDB" questions by walking through 2-3 concrete diagnostic questions about the SPECIFIC workload, never with a blanket universal preference.',
      'Weight how many DIFFERENT access patterns/query angles the same data needs to support — highly relational, multi-angle access patterns favor PostgreSQL even if the data could technically be modeled as documents.',
      'Weight whether multi-step atomicity is the COMMON case or a rare exception for the workload — common-case atomicity favors PostgreSQL; rare/exceptional need for it is workable in either.',
    ],
    tradeOffs:
      'PostgreSQL gives you flexible, ad hoc relational querying and default-strong transactional consistency at the cost of needing explicit migrations for structural schema changes and comparatively more manual work to scale writes horizontally; MongoDB gives you schema flexibility and native horizontal write scaling at the cost of needing more deliberate design (embedding vs referencing decisions, explicit transaction usage) to achieve the SAME relational query flexibility and default consistency PostgreSQL gives you essentially for free.',
    commonMistakes: [
      'Answering a database-choice interview question with a memorized feature-comparison table instead of reasoning from the specific scenario\'s access patterns and consistency needs.',
      'Assuming "MongoDB does not support transactions" (outdated) or "PostgreSQL cannot handle flexible/semi-structured data" (JSONB handles this reasonably well) — both are common, dated misconceptions.',
      'Choosing based on which database is more fashionable/currently trending rather than the concrete diagnostic questions relevant to the actual workload.',
    ],
    followUpQuestions: [
      'For a multi-tenant SaaS billing system, walk through which of the diagnostic questions above would matter most, and what they point to.',
      'When would a workload legitimately need BOTH PostgreSQL and MongoDB simultaneously, and how would you decide what goes where?',
      'How would your answer change if the workload\'s consistency requirement shifted from "eventual consistency is fine" to "must be linearizable"?',
    ],
    relatedTopics: ['PostgreSQL', 'MongoDB', 'Database Selection', 'Consistency', 'Transactions', 'Data Modeling'],
  },
  {
    id: 'python-m22-5',
    number: 'PY-M22-5',
    title: 'Normalization vs denormalization — anomalies, duplication, and when to break the rules',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Normalization vs Denormalization',
    expectedAnswer:
      'Normalization (1NF/2NF/3NF) organizes relational data to eliminate redundancy by ensuring each fact is stored in exactly ONE place, which prevents UPDATE anomalies (updating a fact in one row but not a duplicate elsewhere), INSERT anomalies (unable to record a fact without also recording an unrelated one), and DELETE anomalies (deleting a row accidentally destroys an unrelated fact that happened to live only in that row). Denormalization deliberately reintroduces controlled redundancy to optimize READ performance for a specific, known access pattern, at the cost of needing to keep the duplicated data consistent on every write.',
    deepExplanation:
      'A classic anomaly-prone UNNORMALIZED design:\n\n```text\norders_unnormalized\n| order_id | customer_name | customer_email      | product_name | product_price |\n|----------|----------------|----------------------|--------------|----------------|\n| 1        | Ada Lovelace   | ada@example.com      | Laptop       | 999.00         |\n| 2        | Ada Lovelace   | ada@exmaple.com      | Mouse        | 25.00          |   <- TYPO, now inconsistent!\n```\n\nThis exhibits all three anomalies: UPDATE anomaly (Ada changes her email — you must remember to update EVERY order row, and row 2 above shows exactly what happens when you miss one); INSERT anomaly (you cannot record a new customer who has not placed an order yet, since customer data only exists attached to an order row); DELETE anomaly (deleting order 1, if it were Ada\'s only order, would silently delete the fact that "Ada Lovelace" exists as a customer at all).\n\nThe NORMALIZED (3NF) fix — each fact lives in exactly one place:\n\n```sql\nCREATE TABLE customers (id BIGINT PRIMARY KEY, name TEXT, email TEXT UNIQUE);\nCREATE TABLE products  (id BIGINT PRIMARY KEY, name TEXT, price NUMERIC(12,2));\nCREATE TABLE orders    (id BIGINT PRIMARY KEY, customer_id BIGINT REFERENCES customers(id));\nCREATE TABLE order_items (order_id BIGINT REFERENCES orders(id), product_id BIGINT REFERENCES products(id), quantity INT);\n```\n\nNow Ada\'s email exists in exactly one row, updatable in exactly one place, with no anomaly possible.\n\nWhy DENORMALIZE deliberately, despite understanding all of the above: a reporting dashboard that needs "order_id, customer_name, total" for millions of historical orders, rendered thousands of times per second, pays a real JOIN cost on every single read if it always joins `orders` -> `customers` at query time — storing a DENORMALIZED `customer_name_snapshot` directly on the `orders` row (deliberately duplicating data that ALSO lives in `customers`) trades a small, controlled amount of redundancy (and the discipline of knowing this snapshot represents the name AT ORDER TIME, not necessarily the customer\'s CURRENT name — often actually the CORRECT business semantic for a historical order record) for eliminating that JOIN on the hot read path entirely.\n\nThe senior-level framing: normalization is the DEFAULT correct starting point (it is what prevents anomalies and keeps the schema honest); denormalization is a DELIBERATE, targeted optimization applied to a SPECIFIC, measured hot read path, with a clear-eyed understanding of exactly what consistency guarantee is being traded away and why that tradeoff is acceptable for that specific field.',
    productionExample:
      'An order-history table stores a denormalized `customer_name` and `customer_email` snapshot directly on each `orders` row (duplicating data from `customers`) specifically because a historical order record SHOULD show the name/email as they were AT THE TIME OF THE ORDER, not whatever the customer\'s profile currently says — this is a case where denormalization is not just a performance optimization but is actually the semantically CORRECT design, since "what was this order billed to" is a different fact from "what is this customer\'s current profile".',
    bestPractices: [
      'Default to a normalized (3NF) schema as the starting point for any new relational design — it is what prevents update/insert/delete anomalies and keeps facts honestly represented in exactly one place.',
      'Denormalize deliberately and narrowly, targeting a SPECIFIC, measured hot read path, not preemptively "for performance" across the whole schema.',
      'When denormalizing, be explicit (in code comments/documentation) about WHETHER the duplicated field is meant to be a point-in-time snapshot (like an order\'s billed customer name) or a live-synced cache (which requires an active strategy — trigger, application code, or event-driven update — to keep in sync).',
    ],
    tradeOffs:
      'Normalization guarantees consistency and eliminates anomalies but costs JOIN overhead on every read that needs data spanning multiple tables; denormalization eliminates that JOIN cost for a specific read pattern but introduces the ongoing burden of keeping duplicated data consistent (or deliberately accepting it as a point-in-time snapshot that is NOT meant to stay in sync) — the right choice is workload-specific, and applying denormalization broadly "by default" reintroduces exactly the anomaly risks normalization exists to prevent.',
    commonMistakes: [
      'Denormalizing broadly and preemptively across an entire schema "for performance" before any actual read-path bottleneck has been measured, reintroducing anomaly risk with no proven benefit.',
      'Denormalizing a field intended to be a LIVE-SYNCED cache (e.g. a running total) without building any mechanism to actually keep it in sync, letting it silently drift out of correctness over time.',
      'Confusing "this data is duplicated" with "this is automatically a bug" — a point-in-time snapshot (like a historical order\'s billed customer name) is CORRECTLY duplicated by design, not an oversight.',
    ],
    followUpQuestions: [
      'Give an example of a denormalized field that should be a point-in-time snapshot, and one that should be a live-synced cache, and explain how you would keep the live-synced one consistent.',
      'How does MongoDB\'s embedding pattern relate to relational denormalization — is it the "same idea" or a genuinely different concept?',
      'How would you detect, in a live production system, that a denormalized field has drifted out of sync with its source of truth?',
    ],
    relatedTopics: ['Normalization', 'Denormalization', 'Data Modeling', 'Update Anomalies', 'Schema Design'],
  },
  {
    id: 'python-m22-6',
    number: 'PY-M22-6',
    title: 'CAP theorem — the real distributed-systems trade-off, not "pick two of three"',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'CAP Theorem & Consistency',
    expectedAnswer:
      'The CAP theorem states that during an actual NETWORK PARTITION (nodes cannot communicate), a distributed system must choose between CONSISTENCY (every node sees the same, most recent data) and AVAILABILITY (every request gets a response, even if it might be stale) — it is NOT a general "pick 2 of 3 features to design around" menu, because Partition tolerance is not actually optional for any REAL distributed system running over an unreliable network: partitions WILL happen, so the only genuine choice is what the system does WHEN one occurs, not whether to "have" partition tolerance.',
    deepExplanation:
      'The common oversimplification ("pick two of C, A, P") is misleading because P is not a feature you can opt out of — any system with more than one node, communicating over a real network, WILL eventually experience a partition (a dropped connection, a network split, a slow/timed-out link) whether it wants to or not. The theorem\'s ACTUAL content is narrower and sharper: **when a partition is actually happening**, you must choose between:\n\n```text\nCP (Consistent, sacrifices Availability during a partition)\n  — during the partition, the system REFUSES to serve some requests (or blocks/times out)\n    rather than risk returning stale or conflicting data.\n  — example posture: a majority-write-concern MongoDB configuration, or a strongly-consistent\n    PostgreSQL primary that simply becomes unreachable/unwritable if it cannot reach a quorum.\n\nAP (Available, sacrifices strong Consistency during a partition)\n  — during the partition, the system KEEPS SERVING requests on every reachable node,\n    accepting that different nodes may temporarily return different (stale) answers.\n  — example posture: a read replica that keeps serving reads even while cut off from the\n    primary, potentially returning data that is seconds/minutes out of date.\n```\n\nOutside of an actual partition (the normal, healthy operating state, which is the VAST majority of the time), a well-designed system can and should offer BOTH strong consistency and high availability simultaneously — CAP says NOTHING about the normal case; it is specifically and only about behavior DURING a partition. This is precisely why the oversimplified "pick two of three" framing is actively misleading: it implies you permanently give up one property, when the real tradeoff is scoped narrowly to partition events, which (for a well-operated system) are a small fraction of total uptime.\n\nA concrete PostgreSQL/MongoDB framing: PostgreSQL with synchronous replication to a standby is, during a partition that isolates the primary from that standby, effectively CP-leaning (it can be configured to block writes rather than risk data loss/divergence); a MongoDB replica set configured with `w: majority` write concern is similarly CP-leaning (a write is not acknowledged unless a majority of nodes have it, so during a partition where a majority cannot be reached, writes block/fail rather than risk inconsistency); either system can instead be configured to favor availability during a partition (async replication, `w: 1` write concern) at the cost of a real risk of returning or accepting stale/conflicting data.',
    productionExample:
      'A banking system configures its database replication for CP behavior (synchronous replication, majority write concern) — during a network partition, it would rather REJECT new transactions entirely than risk two isolated nodes both accepting conflicting balance updates that could not later be reconciled; a social media "like counter", by contrast, is configured for AP behavior — during a partition, every reachable node keeps accepting and displaying like counts, accepting that the count might be briefly inconsistent across replicas, because a stale like count is a vastly cheaper failure mode than the feature becoming entirely unavailable.',
    bestPractices: [
      'Explain CAP as being SPECIFICALLY about behavior during an actual network partition, not as a permanent, always-in-effect tradeoff — a system can be both consistent and available in the normal, non-partitioned case.',
      'Choose CP vs AP posture per WORKLOAD based on which failure mode is cheaper for that specific data: rejecting requests (CP) or serving possibly-stale data (AP) — do not apply one posture blanket-wide across an entire system.',
      'Configure the actual replication/write-concern settings (synchronous vs async replication, majority vs w:1 write concern) deliberately to match the intended CP/AP posture — the theorem is realized through concrete configuration choices, not an abstract label.',
    ],
    tradeOffs:
      'A CP-leaning configuration guarantees no stale/conflicting reads at the cost of some requests failing/blocking during a partition (an availability cost); an AP-leaning configuration guarantees every request gets SOME answer at the cost of that answer potentially being stale or, in a write-write conflict scenario, requiring an explicit conflict-resolution strategy after the partition heals — the correct choice depends entirely on which failure mode (temporary unavailability vs temporary staleness) is cheaper for the specific data involved.',
    commonMistakes: [
      'Reciting "CAP means pick two of three" as if Partition tolerance were an optional feature you could simply choose not to have, rather than an unavoidable reality of any real distributed system.',
      'Applying a single CP or AP posture uniformly across an entire system\'s data, when different pieces of data (account balances vs. like counts) genuinely warrant different postures.',
      'Confusing CAP\'s narrow "during a partition" scope with a claim about NORMAL, healthy-network operating behavior, where strong consistency and high availability are usually both achievable simultaneously.',
    ],
    followUpQuestions: [
      'Why is "partition tolerance" not actually an optional design choice for a real, multi-node distributed system?',
      'Give an example of two different pieces of data in the SAME application that would warrant different CP/AP postures, and explain why.',
      'How does PACELC extend CAP\'s reasoning to the NON-partitioned, normal operating case?',
    ],
    relatedTopics: ['CAP Theorem', 'Distributed Systems', 'Consistency', 'Availability', 'Network Partitions', 'Replication'],
  },
  {
    id: 'python-m22-7',
    number: 'PY-M22-7',
    title: 'PACELC — extending CAP to the normal, non-partitioned case',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'CAP Theorem & Consistency',
    expectedAnswer:
      'PACELC extends CAP by explicitly addressing what CAP leaves unstated: "if there is a Partition (P), the system trades off Availability vs Consistency (A/C) — Else (E, the normal, non-partitioned case), it trades off Latency vs Consistency (L/C)." This closes CAP\'s biggest practical gap: CAP only describes rare partition events, but PACELC acknowledges that EVEN DURING NORMAL OPERATION, a system that wants the strongest consistency (e.g. synchronously confirming a write on every replica before acknowledging it) pays a real LATENCY cost compared to a system willing to acknowledge a write before all replicas have it.',
    deepExplanation:
      '```text\nPACELC:\n  P  — IF there is a network Partition...\n  A/C — ...trade off Availability vs Consistency (this part IS just CAP)\n  E  — ELSE (the normal, non-partitioned, common case)...\n  L/C — ...trade off Latency vs Consistency\n```\n\nWhy the "Else, Latency vs Consistency" half matters so much in practice: it is the tradeoff a system makes essentially ALL THE TIME (partitions are comparatively rare; normal operation is the overwhelming majority of a system\'s life), so it deserves at least as much design attention as the CAP partition scenario, if not more. Concretely: a database configured to WAIT for synchronous acknowledgment from every replica before confirming a write to the client (PC — favoring Consistency, even in the normal case) will have HIGHER write latency than one that acknowledges as soon as the PRIMARY has the write and asynchronously propagates to replicas (PL — favoring Latency, even in the normal case) — this tradeoff exists independent of any partition ever actually occurring.\n\nMapping real systems onto the PACELC classification: a PostgreSQL primary with SYNCHRONOUS replication to standbys is PC/EC-leaning (favors Consistency both during a partition AND in the normal case, at a latency cost on every write); a PostgreSQL primary with ASYNCHRONOUS replication (the more common default configuration) is closer to PA/EL-leaning (favors lower latency in the normal case, accepting that a crashed primary could lose the last few unreplicated writes); MongoDB with `w: majority` write concern behaves similarly to the synchronous case (higher latency, stronger durability guarantee); MongoDB with `w: 1` write concern favors lower latency at the cost of a weaker durability/consistency guarantee if the primary fails before replicating that write.\n\nThe senior-level, interview-differentiating insight PACELC surfaces that CAP alone does not: even a system that NEVER experiences a meaningful partition still has to make an explicit, deliberate Latency-vs-Consistency choice on every single write, and that choice (synchronous vs asynchronous replication, write concern level) is one of the most consequential, concrete configuration decisions a backend/database architect actually makes in practice.',
    productionExample:
      'A high-frequency trading or banking transaction system configures synchronous replication (favoring the EC/Consistency side of PACELC\'s "Else" case) despite the real latency cost on every write, because a lost transaction due to async-replication data loss is categorically unacceptable; a high-traffic "page view counter" or analytics-ingestion pipeline instead configures asynchronous replication / a weaker write concern (favoring EL/Latency), because sub-millisecond write latency matters far more than the small risk of losing the last few counter increments if the primary crashes at an unlucky moment.',
    bestPractices: [
      'Evaluate the Latency-vs-Consistency ("Else") tradeoff for EVERY write-heavy workload explicitly, not just the rarer partition-time tradeoff CAP alone describes.',
      'Configure replication mode (synchronous vs asynchronous) and write concern level deliberately per workload, matching the actual cost of a lost/stale write against the actual cost of added write latency for that specific data.',
      'When discussing database architecture in a senior interview, invoke PACELC (not just CAP) to demonstrate awareness that the consistency/performance tradeoff is not confined to rare failure scenarios.',
    ],
    tradeOffs:
      'Favoring Consistency in the normal case (synchronous replication, majority write concern) guarantees no data loss/staleness at the cost of higher latency on every write, borne on 100% of operations; favoring Latency (async replication, weaker write concern) keeps writes fast at the cost of a real, quantifiable window of potential data loss/staleness if a failure happens to occur during that unreplicated window — the right choice is a direct function of how expensive a lost/stale write actually is for the specific data, weighed against how latency-sensitive the workload is.',
    commonMistakes: [
      'Reasoning only about CAP\'s partition-time tradeoff and never explicitly considering the Latency-vs-Consistency tradeoff that applies during NORMAL operation, which is the vast majority of a system\'s actual runtime.',
      'Configuring synchronous replication/majority write concern for latency-sensitive, loss-tolerant workloads (e.g. analytics events) where the added latency cost is not justified by the marginal durability benefit.',
      'Configuring asynchronous replication/weak write concern for correctness-critical workloads (financial transactions) purely for latency, without weighing the real cost of the data-loss window this creates.',
    ],
    followUpQuestions: [
      'Classify PostgreSQL with synchronous replication, and MongoDB with `w: 1`, on the PACELC framework, and justify each classification.',
      'Why does PACELC matter more in day-to-day system design than CAP alone, given how rare true network partitions are for most systems?',
      'How would you decide, for a specific new feature, whether the added write latency of synchronous replication is worth the durability guarantee it buys?',
    ],
    relatedTopics: ['PACELC', 'CAP Theorem', 'Replication', 'Latency', 'Consistency', 'Write Concern'],
  },
  {
    id: 'python-m22-8',
    number: 'PY-M22-8',
    title: 'ACID transactions and identifying when an operation actually needs one',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Transactions',
    expectedAnswer:
      'ACID (Atomicity, Consistency, Isolation, Durability) describes the guarantees a transaction provides: Atomicity (all steps succeed or none do — no partial application), Consistency (the database moves between valid states, respecting all constraints), Isolation (concurrent transactions do not see each other\'s uncommitted intermediate state), Durability (once committed, the result survives a crash). An operation NEEDS a transaction specifically when it involves MULTIPLE steps that must succeed or fail TOGETHER as a unit — a single, atomic write to one row/document generally does not need an explicit transaction wrapper, since the database already guarantees atomicity for that single operation on its own.',
    deepExplanation:
      'Worked bank-transfer example, showing exactly what atomicity protects against:\n\n```sql\nBEGIN;\n  UPDATE accounts SET balance = balance - 100 WHERE id = \'A\';   -- debit\n  UPDATE accounts SET balance = balance + 100 WHERE id = \'B\';   -- credit\n  INSERT INTO audit_log (account_id, change, reason) VALUES (\'A\', -100, \'transfer to B\');\nCOMMIT;\n-- if the CREDIT step (or the audit insert) fails for ANY reason (constraint violation,\n-- connection drop, application crash) AFTER the debit already ran, ROLLBACK undoes\n-- the debit too — the account is never left in a state where money vanished\n```\n\nWithout the transaction wrapper, a crash between the debit and the credit would leave $100 permanently vanished from the system — Account A debited, Account B never credited, no way to reconcile which step actually completed without extremely careful manual investigation.\n\nA practical checklist for "does THIS operation need an explicit transaction":\n\n```text\nNEEDS a transaction (multiple steps, must succeed/fail together):\n  - Payment: debit source + credit destination + write audit record\n  - Order creation: create order + create order_items + decrement inventory\n  - Account transfer: as shown above\n  - User registration (in some designs): create user row + create default settings row + send welcome-email OUTBOX event\n\nDOES NOT need an explicit transaction (a single atomic operation already IS atomic):\n  - A single UPDATE to one row/document (the database guarantees this is atomic on its own)\n  - An analytics event insert (loss-tolerant, no multi-step dependency, often fine to fire-and-forget)\n  - A cache write to Redis (typically not treated as requiring the same durability guarantees as the source of truth)\n```\n\nThe genuinely senior-level judgment call is not "do I know the syntax for BEGIN/COMMIT/ROLLBACK" — it is correctly IDENTIFYING which real-world operations decompose into multiple steps with a "must all succeed together" requirement versus which ones are naturally single-step (or where eventual consistency between steps, via an outbox/event-driven pattern covered later in this module, is an acceptable and often BETTER alternative to a long-held transaction spanning multiple services).',
    productionExample:
      'An order-placement flow wraps "create order row" + "create order_items rows" + "decrement product inventory" in a single database transaction (all three MUST succeed together, or none should — an order that exists with no inventory decremented, or inventory decremented with no order recorded, are both corrupt states), but deliberately does NOT include "send order confirmation email" inside that same transaction — instead using the outbox pattern (an event row written in the SAME transaction, published to a message broker afterward) so a slow/failing email provider can never cause the entire order transaction to roll back or hold a database lock longer than necessary.',
    bestPractices: [
      'Wrap operations in a transaction specifically when MULTIPLE steps must succeed or fail TOGETHER as an indivisible unit — not reflexively around every multi-statement operation.',
      'Keep transactions as SHORT and FOCUSED as possible — include only the steps that genuinely require atomicity together, moving slow/external operations (sending an email, calling a third-party API) OUTSIDE the transaction (often via the outbox pattern).',
      'Explicitly identify, for each new feature, which steps are "must succeed together" versus "can be eventually consistent" — this single judgment call is what separates correct transaction boundaries from either under- or over-using transactions.',
    ],
    tradeOffs:
      'Wrapping more steps in a transaction increases correctness guarantees but HOLDS DATABASE LOCKS for longer (reducing concurrency/throughput) and, when a slow external call is included inside the transaction, can turn a brief lock into a long-held one that blocks other transactions — the right transaction boundary includes exactly the steps that need atomicity together and nothing more, deliberately pushing everything else (especially slow I/O to external systems) outside it.',
    commonMistakes: [
      'Omitting a transaction around genuinely multi-step, must-succeed-together operations (like the bank transfer above), risking a corrupt partial state on any mid-sequence failure.',
      'Including slow external calls (sending an email, calling a third-party payment gateway) INSIDE a database transaction, needlessly holding locks for the duration of that slow external call and hurting concurrency.',
      'Wrapping every single-row update in an explicit transaction "just to be safe", when the database already guarantees atomicity for a single write on its own — unnecessary code complexity with no added correctness benefit.',
    ],
    followUpQuestions: [
      'Why should a slow external API call (e.g. sending an email) generally be excluded from a database transaction, even if it is logically "part of" the same business operation?',
      'How would you handle the "order creation + inventory decrement + send confirmation email" flow using the outbox pattern instead of one long transaction spanning the email send?',
      'Give an example of an operation that LOOKS like it needs a transaction but actually does not, and explain why.',
    ],
    relatedTopics: ['ACID', 'Transactions', 'Atomicity', 'Transaction Boundaries', 'Outbox Pattern', 'Concurrency'],
  },
  {
    id: 'python-m22-9',
    number: 'PY-M22-9',
    title: 'Horizontal scaling — read replicas vs sharding, and when each is the right lever',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Scalability',
    expectedAnswer:
      'READ REPLICAS scale READ throughput by copying data to additional nodes that serve read-only queries (the WRITE path still goes through one primary, so replicas do not help write scaling at all); SHARDING scales BOTH read and write throughput by partitioning data across multiple independent nodes, each owning a distinct subset of the data — the correct lever depends entirely on whether the bottleneck is READS (replicas suffice, and are operationally much simpler) or WRITES (sharding is required, and is a significantly more complex, higher-commitment architectural change).',
    deepExplanation:
      '```text\nRead replicas (scales READS only):\n              Primary  (all writes go here)\n             /       \\\n            v         v\n       Replica 1   Replica 2   (reads distributed across these, plus optionally the primary)\n\nSharding (scales READS and WRITES):\n                mongos / router\n                      |\n           +----------+----------+\n           v                     v\n        Shard 1                Shard 2   (each shard owns a DISTINCT subset of the data,\n     (users A-M)              (users N-Z)  handling both reads AND writes for its subset)\n```\n\nThe decisive diagnostic question: "Is my bottleneck read throughput, write throughput, or total data volume exceeding what fits comfortably on one node?" — if reads dominate (a common pattern: most applications read far more than they write), read replicas are the simpler, lower-risk first lever, and should almost always be reached for BEFORE sharding. Sharding is a substantially larger architectural commitment: it requires choosing a SHARD KEY (a decision that is difficult to change later without a major data migration), it makes CROSS-SHARD queries/joins/transactions significantly harder or impossible in the general case, and it adds real operational complexity (a routing layer, rebalancing, monitoring per-shard health) — sharding should be adopted only once write throughput or total data volume genuinely cannot be handled by a single (even vertically-scaled) primary, not preemptively "for future scale".\n\nA critical, frequently-missed nuance about read replicas: REPLICATION LAG means a read from a replica can return DATA THAT IS SLIGHTLY STALE compared to the primary — a classic bug is a user submitting a write (routed to the primary) and then IMMEDIATELY reading it back (routed to a replica that has not yet received that write), seeing their own change appear to have "not saved". The standard fixes are: read-your-own-writes routing (route a user\'s own immediate post-write reads to the primary, or a replica confirmed to be caught up), or accepting a brief "eventually consistent" UX for that specific read path.\n\nPostgreSQL vs MongoDB horizontal scaling framing: PostgreSQL scales reads natively and easily via streaming replication to read replicas; PostgreSQL write-scaling via sharding is NOT a first-class built-in feature (it requires an extension like Citus, or manual application-level partitioning across separate PostgreSQL instances) — this is a genuine, real limitation worth stating plainly. MongoDB, by contrast, has NATIVE, first-class sharding built into the core product, making write-scaling a more natural, better-supported path — this is one of MongoDB\'s clearest genuine architectural advantages over vanilla PostgreSQL for a workload that truly needs horizontal write scaling.',
    productionExample:
      'A content platform with a 50:1 read-to-write ratio (heavy article/page reads, comparatively rare content creation) scaled entirely via PostgreSQL read replicas — three replicas behind a read-only connection pool handled the read load easily, with zero sharding complexity, because the actual bottleneck was reads, not writes; a high-write-volume IoT ingestion platform (millions of sensor events per minute) instead needed MongoDB sharding by device_id, because no single primary — however many read replicas sat behind it — could have absorbed that WRITE volume alone.',
    bestPractices: [
      'Always reach for read replicas FIRST when the bottleneck is reads — it is operationally far simpler than sharding and reversible/adjustable with much lower risk.',
      'Only adopt sharding once write throughput or total data volume genuinely cannot be handled by a single (even vertically-scaled) node — treat it as a significant, hard-to-reverse architectural commitment, not a default scaling strategy.',
      'Explicitly design for read-your-own-writes when routing reads to replicas — decide per read path whether serving a slightly-stale replica read is acceptable, or whether that specific read must go to the primary.',
    ],
    tradeOffs:
      'Read replicas are simple to add/remove and require no change to the data model, but only scale reads and introduce replication lag as a real consistency concern; sharding scales both reads and writes and total data capacity, but requires an early, hard-to-reverse shard key decision, complicates cross-shard queries/transactions significantly, and adds meaningful operational complexity — reach for sharding only when replicas genuinely cannot solve the actual bottleneck.',
    commonMistakes: [
      'Reaching for sharding prematurely, before confirming that read replicas (a much simpler lever) could not have solved the actual observed bottleneck.',
      'Assuming read replicas eliminate replication lag risk, and routing a user\'s post-write read to a replica without considering the "why did my change disappear" read-your-own-writes bug this can cause.',
      'Choosing a shard key without carefully considering write distribution (risking a hot shard, covered in Module 20) — the shard key decision is extremely costly to change after data has already been distributed.',
    ],
    followUpQuestions: [
      'Walk through exactly how read-replica replication lag can cause a "my change disappeared" bug, and describe two different ways to fix it.',
      'Why is PostgreSQL\'s native write-scaling story weaker than MongoDB\'s, and what are the practical options (e.g. Citus) for a PostgreSQL-committed team that genuinely needs to scale writes horizontally?',
      'What makes a shard key decision so difficult to reverse once a system is in production and shards are already populated?',
    ],
    relatedTopics: ['Read Replicas', 'Sharding', 'Horizontal Scaling', 'Replication Lag', 'Shard Key', 'Vertical Scaling'],
  },
  {
    id: 'python-m22-10',
    number: 'PY-M22-10',
    title: 'Caching architecture — strategies, and why cache invalidation is genuinely hard',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Caching Architecture',
    expectedAnswer:
      'A cache (typically Redis) sits in front of (or alongside) the primary database to serve hot reads with lower latency and reduced database load, using one of several established strategies — CACHE-ASIDE (application checks cache, on miss reads the database and populates the cache) is the most common and flexible default; READ-THROUGH/WRITE-THROUGH push cache-population logic into a caching layer/library rather than application code; WRITE-BACK writes to the cache first and asynchronously flushes to the database later (fastest writes, real durability risk). The genuinely hard part — as the famous quote acknowledges — is INVALIDATION: correctly and promptly removing or updating stale cached data when the underlying source of truth changes.',
    deepExplanation:
      '```text\nCache-aside (most common, application-managed):\n  read:  app checks Redis -> HIT: return cached value\n                          -> MISS: app reads PostgreSQL/MongoDB, writes result into Redis, returns it\n  write: app writes to PostgreSQL/MongoDB, then explicitly INVALIDATES (deletes) the cache key\n         (never just writes the new value directly into the cache on a write — see invalidation below)\n\nRead-through (cache library/layer handles population transparently):\n  app always reads FROM the cache; on a miss, the CACHE ITSELF (not app code) fetches from the DB\n\nWrite-through (writes go through the cache, which synchronously writes to the DB too):\n  app writes to the cache; the cache synchronously also writes to the DB before acknowledging\n\nWrite-back / write-behind (fastest writes, real durability risk):\n  app writes to the cache; the cache ASYNCHRONOUSLY flushes to the DB later\n  -> if the cache crashes before flushing, that write is LOST — rarely appropriate for\n     anything beyond metrics/counters where some loss is genuinely tolerable\n```\n\nWhy cache invalidation is genuinely hard, not just an implementation detail: a cache entry can become stale through ANY write path that touches the underlying data — a direct database update from an admin script, a background job, ANOTHER service in a microservices architecture — and every single one of those paths must remember to also invalidate the relevant cache key(s), or the cache silently serves stale data indefinitely. The three practical invalidation strategies, each with a real tradeoff:\n\n```text\nTTL (time-to-live)         — simplest: cache entries expire automatically after N seconds.\n                              Tradeoff: guarantees EVENTUAL freshness but tolerates staleness\n                              for up to the full TTL window on every write.\n\nExplicit invalidation       — application code deletes/updates the cache key immediately\n                              on write. Tradeoff: fresher, but requires EVERY write path\n                              (including ones you might forget — a background job, an admin\n                              script) to remember to invalidate correctly.\n\nEvent-based invalidation    — a change event (from CDC/change streams/an outbox event) triggers\n                              invalidation automatically, regardless of WHICH code path wrote\n                              the change. Tradeoff: most robust (catches every write path\n                              automatically) but requires the event-driven infrastructure\n                              (covered later in this module) to already exist.\n```\n\nA senior-level, non-obvious point: caching is actively HARMFUL, not just unhelpful, in specific scenarios — for data that changes on EVERY read (making the cache hit rate near zero, all cost no benefit), for data requiring strict read-your-own-writes consistency where a stale cache read would be a genuine correctness bug (not just a UX annoyance), or when the "fix" for a slow query is really a missing database index — caching a symptom of an unindexed query just hides the underlying performance problem rather than solving it.',
    productionExample:
      'A product-detail page caches product data in Redis with a 60-second TTL (cache-aside, TTL-based invalidation is acceptable here — a product price being up to 60 seconds stale is a tolerable business risk), but a user\'s OWN account balance is never cached this way (or is cached with immediate explicit invalidation on every balance-changing write) because a stale balance reading is not a tolerable UX gap — it is a correctness bug users would immediately notice and distrust.',
    bestPractices: [
      'Default to cache-aside with explicit invalidation on write as the standard starting strategy — reach for write-back only for genuinely loss-tolerant data (metrics, counters).',
      'Prefer EVENT-BASED invalidation over relying purely on application code remembering to invalidate, once multiple write paths (background jobs, other services, admin tools) can touch the same underlying data.',
      'Recognize when caching is the wrong fix entirely — a consistently slow, unindexed query should be fixed with an index, not papered over with a cache that just hides the underlying problem.',
    ],
    tradeOffs:
      'TTL-based invalidation is the simplest to implement correctly (nothing to forget) but tolerates a bounded window of staleness on every write; explicit invalidation is fresher but requires disciplined correctness across every write path; event-based invalidation is the most robust against forgotten write paths but requires event-driven infrastructure (CDC/outbox) to already be in place — the right choice scales with how many distinct write paths can touch the cached data and how costly staleness actually is for that specific data.',
    commonMistakes: [
      'Writing the NEW value directly into the cache on every application write (instead of invalidating/deleting the key and letting the next read repopulate it), risking the cache and database diverging if the write to the database itself later fails or is retried inconsistently.',
      'Forgetting to invalidate a cache key from a SECONDARY write path (an admin script, a background job, another microservice) that also mutates the underlying data, leaving the cache silently stale.',
      'Reaching for caching as a fix for a slow query without first checking whether a missing index is the actual root cause — caching a symptom instead of fixing the underlying performance problem.',
    ],
    followUpQuestions: [
      'Why is "write the new value directly into the cache on write" (as opposed to invalidating and letting the next read repopulate it) a riskier pattern, specifically around write failures/retries?',
      'How would event-based cache invalidation via the outbox pattern or change streams work end to end, concretely?',
      'Give a concrete example of data where caching would be actively harmful, and explain why.',
    ],
    relatedTopics: ['Caching', 'Cache-Aside', 'Cache Invalidation', 'Redis', 'TTL', 'CDC'],
  },
  {
    id: 'python-m22-11',
    number: 'PY-M22-11',
    title: 'Search architecture — database search vs a dedicated search engine, and eventual consistency',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Search Architecture',
    expectedAnswer:
      'PostgreSQL (`ILIKE`/`pg_trgm`/built-in full-text search) and MongoDB (text indexes) both offer BASIC search capability sufficient for simple, moderate-scale needs, but a DEDICATED search engine (Elasticsearch/OpenSearch) becomes worth the added operational complexity once the requirement includes relevance RANKING (not just matching), typo tolerance/fuzzy matching, faceted filtering across many dimensions, or search-query volume/latency demands beyond what the primary transactional database comfortably handles — introducing a search engine means accepting an EVENTUALLY CONSISTENT search index, since it is populated asynchronously from the primary database rather than being the source of truth itself.',
    deepExplanation:
      '```text\nCapability                PostgreSQL (pg_trgm/FTS)   MongoDB (text index)   Elasticsearch/OpenSearch\n----------                ------------------------   --------------------   ------------------------\nBasic substring match      yes (pg_trgm)               limited                yes\nFull-text (stemming, etc)  yes (tsvector/tsquery)      yes (basic)            yes, richer\nRelevance ranking          basic (ts_rank)              basic (textScore)      excellent, highly tunable\nTypo tolerance/fuzzy       limited                      no                     yes (native)\nFaceted filtering          possible, more manual         possible, more manual  excellent, first-class\nScale (huge search volume) moderate                      moderate               built for this specifically\n```\n\nThe architecture once a dedicated search engine is warranted:\n\n```text\nApplication write (e.g. "update product")\n    |\nPrimary Database (PostgreSQL/MongoDB — the SOURCE OF TRUTH)\n    |\nEvent / Queue  (via CDC, change streams, or the outbox pattern — see below)\n    |\nSearch Index (Elasticsearch/OpenSearch — a DERIVED, secondary representation of the data)\n```\n\nWhy this introduces EVENTUAL consistency, unavoidably: a write to the primary database and its corresponding update to the search index are two SEPARATE operations, connected by an asynchronous pipeline — there is necessarily a window (typically milliseconds to a few seconds in a well-built pipeline, but never truly zero) during which the primary database has the new/updated data but the search index does not yet. This is an accepted, deliberate tradeoff: search results being a few seconds behind the absolute latest write is a UX gap most products can tolerate, in exchange for dramatically better search relevance/performance than the primary transactional database could offer directly.\n\nThe decision framing, precisely: start with the database\'s BUILT-IN search capability (PostgreSQL `pg_trgm`/full-text search, or MongoDB text indexes) as the default, and introduce a dedicated search engine only once a SPECIFIC, articulable gap emerges — relevance ranking quality genuinely matters to the product, typo tolerance is a real user need, or search query volume/complexity is measurably straining the primary database — never introduce Elasticsearch preemptively "because search engines are what serious products use".',
    productionExample:
      'An e-commerce platform starts with PostgreSQL `pg_trgm` search for its product catalog (adequate for a few thousand products with simple substring matching), then migrates to Elasticsearch once the catalog grows to hundreds of thousands of products and the product team specifically requests relevance-ranked results, typo tolerance ("labtop" should still find "laptop"), and faceted filtering (price range + category + brand simultaneously) — a concrete, measured gap in capability, not a preemptive architecture choice.',
    bestPractices: [
      'Start with the primary database\'s built-in search capability (PostgreSQL full-text/pg_trgm, or MongoDB text indexes) and introduce a dedicated search engine only once a specific, articulable gap emerges.',
      'Design the primary database as the unambiguous SOURCE OF TRUTH, with the search index treated as a derived, rebuildable-from-scratch secondary representation — never let the search engine become the only place a piece of data lives.',
      'Make the eventual-consistency window between a write and its visibility in search results an explicit, understood product/UX decision, not an accidental side effect discovered later.',
    ],
    tradeOffs:
      'A dedicated search engine gives dramatically better relevance ranking, typo tolerance, and faceted search performance at the cost of a second, EVENTUALLY CONSISTENT data store to operate, monitor, and keep in sync via an asynchronous pipeline — for search needs that are genuinely simple (basic substring/keyword match, small dataset), this added complexity is not worth paying, and the primary database\'s built-in search capability remains the right, simpler choice.',
    commonMistakes: [
      'Introducing Elasticsearch/OpenSearch preemptively for a small-scale, simple search need that the primary database\'s built-in search capability would have handled adequately.',
      'Treating the search index as a second source of truth (writing data there that does not also exist in the primary database), losing the ability to rebuild the index from scratch if it ever becomes corrupted or needs reindexing.',
      'Failing to communicate the eventual-consistency window (a newly created item not yet appearing in search results) as an expected, designed-for behavior, leading to confused bug reports about "missing" data that is actually just not-yet-indexed.',
    ],
    followUpQuestions: [
      'What specific product requirement would justify introducing a dedicated search engine over PostgreSQL\'s built-in full-text search?',
      'How would you rebuild a search index from scratch if it became corrupted, given the primary database is the true source of truth?',
      'How would you communicate or design around the eventual-consistency window between a write and its visibility in search results?',
    ],
    relatedTopics: ['Search Architecture', 'Elasticsearch', 'Eventual Consistency', 'CDC', 'Full-Text Search'],
  },
  {
    id: 'python-m22-12',
    number: 'PY-M22-12',
    title: 'The outbox pattern — solving the dual-write problem for event-driven architecture',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Event-Driven Data Architecture',
    expectedAnswer:
      'The DUAL-WRITE PROBLEM occurs when an operation must both update a database AND publish a message to an external broker (Kafka/RabbitMQ) — since these are two SEPARATE systems, there is no way to atomically guarantee both happen together: the database write can succeed while the message publish fails (or vice versa), leaving the system in an inconsistent state with no automatic recovery. The OUTBOX PATTERN solves this by writing the event as a row in an "outbox" TABLE within the SAME database transaction as the business data change (a single-database transaction IS atomic), then having a separate, reliable process (a poller or CDC-based publisher) read unpublished outbox rows and publish them to the message broker, retrying until confirmed.',
    deepExplanation:
      '```text\nWITHOUT the outbox pattern (the dual-write problem):\n  BEGIN\n    INSERT INTO orders (...)          -- database write #1\n  COMMIT\n  publish_to_kafka("order_created")   -- SEPARATE system, SEPARATE operation — can fail independently!\n  -- if the process crashes between COMMIT and publish, the order exists but NO event was ever sent —\n  -- downstream consumers (inventory service, notification service) never find out\n\nWITH the outbox pattern:\n  BEGIN\n    INSERT INTO orders (...)                                    -- business data\n    INSERT INTO outbox_events (type, payload, published) \n      VALUES (\'order_created\', \'{...}\', false)                  -- event row, SAME transaction\n  COMMIT\n  -- both rows are committed atomically TOGETHER, or neither is — no dual-write gap possible\n\n  -- separately, a reliable publisher process (polling, or CDC/change-stream based):\n  SELECT * FROM outbox_events WHERE published = false ORDER BY created_at LIMIT 100;\n  -- for each row: publish to Kafka/RabbitMQ, then UPDATE outbox_events SET published = true WHERE id = ...\n  -- if the publish step itself fails, the row simply stays unpublished and is retried on the next poll —\n  -- eventual delivery is guaranteed, and publishing is naturally idempotent-safe since \n  -- the event row has a stable, retryable identity\n```\n\nWhy this specifically prevents the dual-write problem: the ONLY atomic operation in the whole flow is the single database transaction that writes BOTH the business data AND the outbox event row together — since this is one transaction against one database, it genuinely IS atomic (all-or-nothing) using ordinary ACID guarantees, no distributed transaction protocol needed. The SEPARATE step (publishing the outbox row to the broker) is decoupled from the original request entirely — if it fails, it simply retries later, and because the event row persists durably in the database until marked published, NO EVENT IS EVER SILENTLY LOST, even across process crashes.\n\nA more advanced, lower-latency variant uses CHANGE DATA CAPTURE (reading the database\'s own replication log/oplog, e.g. via Debezium for PostgreSQL, or MongoDB change streams) to detect new outbox rows and publish them near-instantly, rather than polling on an interval — trading a small amount of added infrastructure complexity for lower event-publishing latency.\n\nThe consumer side must handle "at-least-once" delivery correctly: because the publisher retries until confirmed, a consumer might occasionally receive the SAME event more than once (e.g. if the publish succeeded but marking `published = true` failed before a crash) — consumers must be IDEMPOTENT (processing the same event twice has the same effect as processing it once), typically by tracking already-processed event IDs.',
    productionExample:
      'An order-placement flow writes the `orders` row and an `outbox_events` row (`order_created`) in the SAME PostgreSQL transaction; a separate lightweight worker polls `outbox_events` every second, publishes unpublished rows to Kafka, and marks them published — the inventory service and notification service both consume from Kafka and are built idempotently (tracking processed event IDs) so an occasional duplicate delivery from the at-least-once outbox publisher never causes a double inventory decrement or a duplicate notification.',
    bestPractices: [
      'Always write the event/outbox row in the SAME database transaction as the business data change it describes — this single-transaction atomicity is the entire mechanism that prevents the dual-write problem.',
      'Build consumers of outbox-published events to be IDEMPOTENT (safe to process the same event more than once), since the pattern guarantees at-least-once delivery, not exactly-once.',
      'Consider a CDC-based publisher (reading the database\'s replication log) instead of interval polling once low-latency event delivery becomes a genuine requirement, at the cost of additional infrastructure.',
    ],
    tradeOffs:
      'The outbox pattern trades a small amount of added schema/infrastructure (an outbox table, a publisher process) for a genuine, provable guarantee against the dual-write problem — the alternative, publishing directly to a message broker from application code right after a database commit, is simpler to write but has NO way to guarantee the two operations happen together, and WILL eventually lose or duplicate events under real-world failure conditions (crashes, network issues) at any meaningful scale/uptime.',
    commonMistakes: [
      'Publishing to a message broker directly in application code immediately after a database commit, with no outbox table, leaving a genuine gap where a crash between the two operations silently loses the event.',
      'Building consumers that are NOT idempotent, assuming events are delivered exactly once, when the outbox pattern (and most real message brokers) only guarantee AT-LEAST-once delivery.',
      'Letting the outbox table grow unboundedly by never cleaning up already-published rows, rather than archiving/purging them after a retention window once they are confirmed delivered.',
    ],
    followUpQuestions: [
      'Why does writing the business data and the outbox event in the SAME transaction eliminate the dual-write problem, mechanically?',
      'How would you design a consumer to be idempotent against duplicate event delivery from an at-least-once outbox publisher?',
      'What are the tradeoffs of a polling-based outbox publisher versus a CDC-based one (e.g. using Debezium or MongoDB change streams)?',
    ],
    relatedTopics: ['Outbox Pattern', 'Dual-Write Problem', 'CDC', 'Change Data Capture', 'Message Queues', 'Idempotency'],
  },
  {
    id: 'python-m22-13',
    number: 'PY-M22-13',
    title: 'Polyglot persistence and database-per-service — which data belongs where',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Polyglot Persistence',
    expectedAnswer:
      'Polyglot persistence is the deliberate use of MULTIPLE database technologies within one system, each chosen for the specific workload it serves best (PostgreSQL for transactional core data, MongoDB for flexible documents, Redis for caching, a search engine for search) — it is justified when different parts of the system genuinely have different data-shape and consistency needs, NOT adopted reflexively. In a microservices architecture, "database-per-service" (each service owns its own database, accessed only through that service\'s API) is the standard extension of this idea, trading the simplicity of one shared database for strong service ownership boundaries and independent deployability.',
    deepExplanation:
      '```text\nPolyglot persistence in one service (or a small system):\n                 FastAPI Service\n                       |\n                Service Layer\n                /      |      \\\n               v       v       v\n         PostgreSQL  MongoDB  Redis\n         (orders,    (product  (sessions,\n          payments)   catalog)  hot cache)\n\nDatabase-per-service in microservices:\n     User Service -> User DB (PostgreSQL)\n     Order Service -> Order DB (PostgreSQL)\n     Catalog Service -> Catalog DB (MongoDB)\n     -- NO service ever reaches directly into another service\'s database\n```\n\nWhich data belongs where, as a concrete worked decision: order/payment data (strong transactions, relational integrity, auditability) belongs in PostgreSQL; product catalog data (flexible attributes varying per category, read-heavy, mostly whole-document access) belongs in MongoDB; session/rate-limit/hot-cache data (ephemeral, simple key-value, sub-millisecond latency) belongs in Redis — the deciding factor for EACH piece of data is its own access pattern and consistency need, evaluated independently, not a single system-wide database philosophy.\n\nThe hard parts of polyglot persistence, stated explicitly (these are exactly what makes it a real architectural tradeoff, not a free win): SYNCHRONIZATION — if the SAME logical entity needs to be reflected in more than one store (e.g. a product exists in MongoDB but its price also needs to show up in a PostgreSQL order line item at order time), you need an explicit strategy (event-driven sync via the outbox pattern, or accepting a denormalized snapshot) for keeping them consistent; CONSISTENCY — cross-database transactions are NOT possible with ordinary ACID guarantees (there is no single transaction manager spanning PostgreSQL and MongoDB), so any operation touching both must either accept eventual consistency or use a saga-style compensating-action pattern (Module 22\'s distributed-transactions topic); FAILURE HANDLING — what happens if the write to database A succeeds but the corresponding write/sync to database B fails? (this is exactly the dual-write problem, and the outbox pattern is the standard mitigation); OPERATIONAL COMPLEXITY — every additional database technology is another thing to deploy, back up, monitor, secure, and staff expertise for.\n\nWhy database-per-service specifically (in microservices) rather than a shared database across services: a SHARED database creates hidden coupling — any service can accidentally depend on another service\'s internal schema, making independent deployment/schema evolution dangerous (a schema change for Service A can silently break Service B if it was reading A\'s tables directly) — database-per-service enforces that all cross-service data access goes through the OWNING service\'s API, which is slower for cross-entity queries (no direct JOIN across services\' databases) but preserves genuine service independence and deployability.',
    productionExample:
      'An e-commerce platform runs PostgreSQL for orders/payments (owned by the Order Service and Payment Service, each with its OWN PostgreSQL database — not a shared one), MongoDB for the product catalog (owned by the Catalog Service), and Redis for session/cart caching shared across services via a well-defined caching contract — when the Order Service needs current product pricing, it calls the Catalog Service\'s API (never queries MongoDB directly), preserving the ownership boundary even at the cost of an extra network call compared to a direct cross-database JOIN.',
    bestPractices: [
      'Justify each additional database technology by a SPECIFIC workload\'s genuine mismatch with the primary database, never by "more options are always better" or technology enthusiasm.',
      'In a microservices architecture, enforce database-per-service strictly — never let one service reach directly into another service\'s database tables/collections, even when it seems convenient.',
      'Explicitly design the synchronization/consistency strategy (event-driven sync via outbox, accepted eventual consistency, or a saga pattern) BEFORE building a feature that spans two different databases — do not discover the gap after the fact.',
    ],
    tradeOffs:
      'Polyglot persistence and database-per-service give each workload its best-fit technology and each service genuine deployment/schema independence, at the cost of losing the simplicity of ordinary cross-entity SQL JOINs and single-database ACID transactions spanning the whole system — cross-cutting queries and operations now require either an API call to the owning service, an eventually-consistent event-driven sync, or a saga-style compensating-action pattern, all of which are more complex to build and reason about than a plain JOIN.',
    commonMistakes: [
      'Adopting additional database technologies reflexively (polyglot persistence "because it is a best practice") without a specific, articulable workload mismatch justifying each one.',
      'Allowing a service to query another service\'s database directly "just this once for convenience", quietly recreating the shared-database coupling problem database-per-service exists to prevent.',
      'Building a feature spanning two databases without an explicit synchronization/consistency strategy, discovering the dual-write problem only after data has already drifted out of sync in production.',
    ],
    followUpQuestions: [
      'How would you keep product pricing consistent between a MongoDB catalog service and a PostgreSQL order service, given no cross-database transaction is possible?',
      'What specific problems does database-per-service prevent that a shared database across microservices would create?',
      'At what point does polyglot persistence\'s operational complexity outweigh its per-workload technical benefits for a smaller team?',
    ],
    relatedTopics: ['Polyglot Persistence', 'Database-per-Service', 'Microservices', 'Dual-Write Problem', 'Service Boundaries', 'Data Ownership'],
  },
  {
    id: 'python-m22-14',
    number: 'PY-M22-14',
    title: 'Distributed transactions — 2PC concepts and the saga pattern',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Distributed Transactions',
    expectedAnswer:
      'Two-Phase Commit (2PC) is a protocol for atomically committing a transaction across multiple independent systems (a coordinator asks all participants to "prepare", then, only if ALL agree, tells them all to "commit") — it provides strong atomicity but at the cost of BLOCKING (participants hold locks while waiting for the coordinator\'s decision) and a single point of failure (a coordinator crash mid-protocol can leave participants blocked indefinitely), making it a poor fit for most modern distributed/microservices systems. The SAGA PATTERN is the alternative most production systems actually use: a sequence of LOCAL transactions, each in a different service, where a FAILURE at any step triggers COMPENSATING ACTIONS that semantically "undo" the already-completed prior steps — trading true atomicity for eventual consistency achieved through explicit, application-level compensation logic.',
    deepExplanation:
      '```text\nTwo-Phase Commit (2PC) — rarely used in modern microservices, but foundational to understand:\n  Coordinator -> "PREPARE" -> Participant A, Participant B, Participant C\n  (each participant locks its resources, votes YES/NO it CAN commit)\n  Coordinator collects votes:\n    ALL YES -> Coordinator sends "COMMIT" to all participants\n    ANY NO  -> Coordinator sends "ABORT" to all participants\n  Problem: participants hold LOCKS the entire time between PREPARE and the coordinator\'s\n  final decision — if the coordinator crashes after PREPARE but before deciding, participants\n  can be left BLOCKED, holding locks, indefinitely (the classic 2PC failure mode)\n\nSaga pattern — a sequence of independent LOCAL transactions with compensating actions:\n  Order Service:      create order (local transaction)          -- step 1\n  Payment Service:     charge payment (local transaction)         -- step 2\n  Inventory Service:   reserve inventory (local transaction)      -- step 3\n  Shipping Service:    schedule shipment (local transaction)      -- step 4\n\n  IF step 3 (reserve inventory) FAILS:\n    Payment Service:  REFUND the payment (compensating action for step 2)\n    Order Service:    CANCEL the order (compensating action for step 1)\n    -- step 4 never runs; steps 1 and 2 are explicitly UNDONE via compensation,\n    -- not via a distributed rollback (there is no such thing across independent services)\n```\n\nORCHESTRATION vs CHOREOGRAPHY, the two ways to coordinate a saga: ORCHESTRATION uses a central coordinator service that explicitly calls each step in sequence and explicitly triggers compensating actions on failure — easier to understand/debug/monitor (the whole flow lives in one place) but introduces a new central component and a degree of coupling to it. CHOREOGRAPHY has each service listen for events and react independently (Order Service publishes "order_created", Payment Service listens and reacts, publishes "payment_charged", Inventory Service listens and reacts, etc., with each service also independently listening for FAILURE events to trigger its own compensation) — more decoupled, no single central component, but the overall flow becomes genuinely harder to trace/debug/reason about since it is implicit in a web of event subscriptions rather than explicit in one place.\n\nWhy compensating actions are NOT the same as a database rollback, and why this matters: a compensating action UNDOES the observable EFFECT of a prior step, but cannot always perfectly restore the exact prior state — refunding a payment is not literally "the charge never happened" (a refund transaction now exists in the payment history, visible to the customer and to reporting); this is an inherent, unavoidable property of saga-based compensation that must be designed for explicitly (e.g. showing "charged then refunded" clearly to the customer, rather than pretending the charge never occurred).',
    productionExample:
      'An order-checkout flow spanning Order, Payment, Inventory, and Shipping microservices uses ORCHESTRATION (a dedicated "checkout saga" coordinator service) specifically because the team wanted the entire multi-step flow, its failure handling, and its compensating actions to be visible and debuggable in ONE place during incident response, rather than distributed implicitly across four services\' independent event listeners — a deliberate tradeoff of an extra coordinating component in exchange for operational clarity during the (rare but high-stakes) failure scenarios this flow needs to handle correctly.',
    bestPractices: [
      'Prefer the saga pattern (orchestration or choreography) over 2PC for distributed operations spanning independent microservices/databases — 2PC\'s blocking behavior and coordinator single-point-of-failure make it a poor fit for most modern systems.',
      'Design EVERY step in a saga with an explicit, well-tested compensating action from the start, not as an afterthought once a failure scenario is first encountered in production.',
      'Choose orchestration when a flow\'s failure handling needs to be centrally visible/debuggable; choose choreography when maximizing service decoupling matters more than centralized flow visibility.',
    ],
    tradeOffs:
      '2PC provides genuine atomicity across systems but at a real availability/liveness cost (blocking, coordinator single point of failure) that is rarely acceptable in a modern, highly-available distributed system; the saga pattern avoids blocking and coordinator SPOF entirely, achieving eventual consistency through explicit compensation, at the cost of the compensating actions being visible, observable side effects (a refund, not an erased charge) rather than a true, invisible rollback — a real UX/business-process consideration, not just an implementation detail.',
    commonMistakes: [
      'Reaching for 2PC (or attempting to simulate it manually) across independent microservices/databases, introducing blocking behavior and a coordinator single point of failure that undermines the availability benefits of a distributed architecture in the first place.',
      'Designing a saga\'s "happy path" steps without designing the corresponding compensating actions up front, discovering the gap only when a real production failure occurs mid-saga.',
      'Treating a compensating action as if it perfectly erases the prior step\'s effect, rather than designing for the fact that it is a visible, observable UNDO action (a refund, a cancellation notice) with its own downstream implications.',
    ],
    followUpQuestions: [
      'Why does 2PC\'s blocking behavior make it a poor fit for a highly-available distributed system, specifically?',
      'Walk through how you would design the compensating action for a "reserve inventory" step that later needs to be undone.',
      'When would you choose choreography over orchestration for a saga, and what specific debugging/operational cost does that choice introduce?',
    ],
    relatedTopics: ['Distributed Transactions', 'Two-Phase Commit', 'Saga Pattern', 'Orchestration', 'Choreography', 'Compensating Actions', 'Microservices'],
  },
  {
    id: 'python-m22-15',
    number: 'PY-M22-15',
    title: 'Idempotency and distributed locks — safe retries in a distributed system',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Data Consistency Patterns',
    expectedAnswer:
      'Idempotency means processing the SAME logical request more than once has the same effect as processing it exactly once — essential in any distributed system where retries (from a client timeout, a network blip, a message broker\'s at-least-once delivery guarantee) are a normal, expected occurrence, not a rare edge case. A DISTRIBUTED LOCK (via Redis or a database advisory lock) coordinates exclusive access to a shared resource ACROSS multiple processes/servers, but carries real, well-documented dangers (lock expiry racing with the operation it protects, a crashed lock-holder never releasing the lock) that make it a tool to reach for carefully, not by default.',
    deepExplanation:
      '```python\n# idempotency-key pattern — the standard, robust way to make a non-idempotent\n# operation (like "charge $50") safe to retry\nfrom fastapi import FastAPI, Header, HTTPException\n\napp = FastAPI()\n\n@app.post("/payments")\nasync def create_payment(payload: dict, idempotency_key: str = Header(...)):\n    existing = await db.idempotency_keys.find_one({"key": idempotency_key})\n    if existing:\n        return existing["response"]           # REPLAY the original result — never charge twice\n    result = await charge_payment_provider(payload)\n    await db.idempotency_keys.insert_one({"key": idempotency_key, "response": result})\n    return result\n# a client that times out waiting for a response can SAFELY retry with the SAME\n# idempotency key — the server recognizes the key and replays the original result\n# instead of creating a second charge\n```\n\nDistributed locks — the Redis-based pattern, and its real dangers, stated precisely:\n\n```python\nimport redis\nr = redis.Redis()\n\n# acquire a lock with a TTL (so a crashed holder does not block the resource FOREVER)\nlock_acquired = r.set("lock:inventory:product_42", "worker_1", nx=True, ex=10)\nif lock_acquired:\n    try:\n        decrement_inventory(product_id=42)\n    finally:\n        r.delete("lock:inventory:product_42")   # release — but see the danger below\n```\n\nThe well-known dangers of this pattern, precisely: (1) LOCK EXPIRY RACE — if the protected operation takes LONGER than the lock\'s TTL, the lock can expire and be acquired by a SECOND worker WHILE the first worker is still (incorrectly) assuming it holds exclusive access — both workers now believe they have exclusive access simultaneously, defeating the entire purpose of the lock; the standard mitigation is using a lock value unique per holder (not just any value) and only releasing/renewing if you can verify you still hold YOUR OWN lock, plus setting the TTL comfortably longer than the expected operation duration. (2) CRASHED HOLDER — if a worker crashes after acquiring the lock but before releasing it, the TTL is what eventually frees the resource (this is exactly WHY a distributed lock should ALWAYS have a TTL, never be held indefinitely without one) — but this means there is an unavoidable window where the resource is genuinely unavailable to other workers even though the original holder is gone. (3) NOT A SUBSTITUTE FOR ATOMIC OPERATIONS — for many use cases (like an inventory decrement), an ATOMIC database operation (`$inc`, or `UPDATE ... SET stock = stock - 1 WHERE stock >= 1`) is a SIMPLER, SAFER alternative that avoids needing a distributed lock at all — reach for a distributed lock only when the operation genuinely cannot be expressed as a single atomic database operation.\n\nThe senior-level judgment: idempotency keys should be the DEFAULT tool for making retries safe (broadly applicable, no lock-expiry-race danger); distributed locks are a narrower, riskier tool reserved for cases where coordination genuinely cannot be achieved through an atomic database operation alone.',
    productionExample:
      'A payment API requires an `Idempotency-Key` header on every charge request specifically so that client-side retry logic (triggered by a network timeout where the client genuinely cannot tell whether the original request succeeded) is always SAFE — the server recognizes a repeated key and replays the original charge result instead of charging twice; a separate inventory-reservation flow avoids a distributed lock entirely by using an atomic `UPDATE inventory SET stock = stock - 1 WHERE product_id = 42 AND stock >= 1` (checking `matched_count` to detect "not enough stock" rather than lock-then-check-then-decrement), sidestepping the lock-expiry-race danger altogether.',
    bestPractices: [
      'Default to idempotency keys (not distributed locks) for making client-facing operations safe to retry — it is broadly applicable and does not carry the lock-expiry-race danger.',
      'Prefer an ATOMIC database operation (`$inc`, a conditional `UPDATE ... WHERE`) over a distributed lock whenever the coordination need can be expressed that way — it is simpler and immune to the lock-expiry race.',
      'If a distributed lock genuinely is necessary, always set a TTL (never hold indefinitely) and use a unique-per-holder lock value so a worker only releases/renews a lock it can verify is still its own.',
    ],
    tradeOffs:
      'Idempotency keys add a small amount of storage/lookup overhead (tracking processed keys) but make retries safe with no risk of the classic distributed-lock failure modes; distributed locks provide genuine mutual exclusion across processes but carry real, well-documented danger (the expiry race, the crashed-holder window) that requires careful, deliberate implementation to avoid — reaching for a lock when an atomic operation or an idempotency key would have sufficed adds risk without added benefit.',
    commonMistakes: [
      'Implementing a "check if it exists, then create" flow without an idempotency key, leaving the operation unsafe to retry and vulnerable to duplicate creation under concurrent/retried requests.',
      'Acquiring a distributed lock with no TTL, risking the protected resource becoming permanently unavailable if the lock-holding process crashes before releasing it.',
      'Reaching for a distributed lock for a coordination need (like an inventory decrement) that a single atomic database operation could have handled more simply and more safely.',
    ],
    followUpQuestions: [
      'Walk through exactly how the lock-expiry race condition can cause TWO workers to believe they hold exclusive access simultaneously, and how a unique-per-holder lock value helps mitigate it.',
      'How would you design idempotency-key storage so keys eventually expire without risking a legitimate new request being incorrectly treated as a duplicate?',
      'Give an example of a coordination problem that genuinely CANNOT be solved with a single atomic database operation and actually requires a distributed lock.',
    ],
    relatedTopics: ['Idempotency', 'Distributed Locks', 'Retries', 'Atomic Operations', 'Redis', 'Concurrency'],
  },
  {
    id: 'python-m22-16',
    number: 'PY-M22-16',
    title: 'Multi-tenant database architecture — shared tables vs shared-schema-per-tenant vs database-per-tenant',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Multi-Tenant Architecture',
    expectedAnswer:
      'Multi-tenant SaaS data isolation has three standard models with increasing isolation and increasing operational cost: (1) SHARED DATABASE + SHARED TABLES (every tenant\'s rows live together, distinguished by a `tenant_id` column) — cheapest and simplest to operate, weakest isolation; (2) SHARED DATABASE + SCHEMA-PER-TENANT (each tenant gets its own PostgreSQL schema within one database) — stronger isolation, moderate operational cost, but does not scale well past a few hundred/thousand tenants due to per-schema migration/connection overhead; (3) DATABASE-PER-TENANT (each tenant gets an entirely separate database/instance) — strongest isolation and easiest per-tenant backup/restore/compliance, but the highest operational and infrastructure cost, typically reserved for enterprise tenants with strict isolation/compliance requirements.',
    deepExplanation:
      '```text\nModel 1: Shared database + shared tables (tenant_id column)\n  orders table: id | tenant_id | customer_id | total | ...\n  EVERY query MUST filter by tenant_id — a single missing WHERE tenant_id = ? is a\n  cross-tenant DATA LEAK, one of the most dangerous classes of multi-tenant bugs\n\nModel 2: Shared database + schema-per-tenant\n  tenant_acme.orders, tenant_widgetco.orders, ... (same database, different PostgreSQL schemas)\n  isolation enforced at the SCHEMA level (a connection scoped to one schema literally\n  cannot see another tenant\'s tables without deliberately cross-schema querying)\n\nModel 3: Database-per-tenant\n  acme_production database, widgetco_production database, ... (fully separate databases,\n  possibly even separate physical instances for the largest/most sensitive tenants)\n```\n\nComparison across the dimensions that actually matter for this decision:\n\n```text\n                    Shared tables    Schema-per-tenant   Database-per-tenant\nCost                lowest            moderate             highest\nIsolation           weakest           strong               strongest\nScaling (# tenants) excellent         moderate (100s-1000s) poor (10s-100s typically)\nSecurity risk        HIGH if a query   lower (schema         lowest (physical\n                    forgets tenant_id  boundary helps)       separation)\nOperations          simplest           moderate migration    highest — N databases to\n                                        overhead (N schemas   back up/monitor/upgrade\n                                        to migrate)\nBackup/restore       per-tenant is      per-tenant possible   trivial — restore exactly\n                    HARD (must filter  via schema dump        one tenant\'s database\n                    from shared data)\n```\n\nA FastAPI implementation sketch for Model 1 (shared tables, the most common starting point), showing the critical enforcement point:\n\n```python\nasync def get_tenant_id(x_tenant_id: str = Header(...)) -> str:\n    # resolved from an authenticated session/JWT claim in a real system, not a raw header\n    return x_tenant_id\n\nasync def list_orders(tenant_id: str = Depends(get_tenant_id)):\n    # EVERY query in EVERY repository method must filter by tenant_id — this is\n    # the single most safety-critical line in a shared-table multi-tenant system\n    return await db.orders.find({"tenant_id": tenant_id}).to_list(length=100)\n```\n\nThe senior-level decision framing: most SaaS products correctly START with Model 1 (shared tables) for cost/simplicity, and migrate specific high-value or compliance-sensitive tenants to Model 3 (database-per-tenant) SELECTIVELY, rather than choosing one model uniformly for the entire tenant base — a hybrid approach (shared infrastructure for the long tail of small tenants, dedicated databases for the largest enterprise tenants with contractual isolation requirements) is extremely common in practice.',
    productionExample:
      'A B2B SaaS platform runs the vast majority of its ~5,000 small-to-medium tenants on a shared-tables model (cost-efficient, easy to operate at that scale) but provisions a fully separate database-per-tenant for its handful of largest enterprise customers whose contracts specifically require physical data isolation and independent backup/restore capability for compliance reasons — a deliberate hybrid strategy rather than a single uniform model across the entire tenant base.',
    bestPractices: [
      'Start with the shared-tables model for cost and operational simplicity unless a specific, known compliance/isolation requirement demands stronger separation from day one.',
      'Enforce tenant filtering at the LOWEST possible layer (e.g. a repository base class that automatically injects `tenant_id` into every query) rather than relying on every individual query author to remember it manually — this is the single highest-leverage defense against cross-tenant data leaks.',
      'Consider a HYBRID strategy — shared infrastructure for most tenants, dedicated database-per-tenant selectively for the largest/most compliance-sensitive ones — rather than forcing one uniform model across an entire diverse tenant base.',
    ],
    tradeOffs:
      'Stronger isolation models (schema-per-tenant, database-per-tenant) sharply reduce the risk and blast radius of a cross-tenant data leak and simplify per-tenant backup/compliance, at a real, scaling operational cost (N schemas/databases to migrate, monitor, and back up) — the shared-tables model scales to far more tenants at far lower cost, but places the ENTIRE isolation burden on disciplined, correct query-level `tenant_id` filtering, with a single missed filter being a serious security incident.',
    commonMistakes: [
      'Writing even one query in a shared-tables multi-tenant system that forgets to filter by `tenant_id`, causing a cross-tenant data leak — one of the most damaging classes of bugs in SaaS systems.',
      'Choosing database-per-tenant uniformly for a large number of small tenants, incurring operational cost (N databases to migrate/monitor/back up) far beyond what the actual isolation requirement justifies.',
      'Relying on manual discipline (every developer remembering to add the tenant filter) instead of enforcing it structurally at the repository/query-building layer, where a single missed instance is far more likely to occur than a systemic, layer-enforced guarantee failing.',
    ],
    followUpQuestions: [
      'How would you structurally enforce tenant_id filtering at the repository layer so it is impossible (not just unlikely) for a query to accidentally omit it?',
      'How would you migrate a specific tenant from the shared-tables model to a dedicated database once their contract requires stronger isolation, with minimal downtime?',
      'What additional row-level security mechanisms (e.g. PostgreSQL RLS) could provide a database-level backstop against a forgotten tenant_id filter in application code?',
    ],
    relatedTopics: ['Multi-Tenancy', 'Tenant Isolation', 'Row-Level Security', 'SaaS Architecture', 'Schema Design', 'Data Security'],
  },
  {
    id: 'python-m22-17',
    number: 'PY-M22-17',
    title: 'Case study: designing the database architecture for an e-commerce platform end to end',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database System Design',
    expectedAnswer:
      'A complete e-commerce database architecture applies this module\'s entire framework in one worked example: PostgreSQL as the transactional source of truth for orders/inventory/payments (strong consistency, ACID transactions are the common case), MongoDB for the flexible product catalog (varying attributes per category, mostly whole-document reads), Redis for session/cart caching and rate limiting, a search engine for product search/relevance, object storage for product images, and an outbox-pattern-driven event pipeline connecting them — each component justified by the SPECIFIC access pattern and consistency need of the data it holds, not chosen uniformly.',
    deepExplanation:
      'The architecture, component by component, with the reasoning behind each choice:\n\n```text\n                              Client\n                                |\n                          FastAPI (API layer)\n                                |\n                          Service Layer\n            /        |          |          |          \\\n           v          v          v          v           v\n        Redis      PostgreSQL   MongoDB   Search       Object\n     (sessions,    (orders,    (product   Engine       Storage\n      cart cache,   payments,   catalog,  (product     (product\n      rate limits)  inventory)  reviews)   search)      images)\n           ^                        |          ^\n           |                        v          |\n           +------ Outbox events -> Message Broker -----+\n                    (keep search index + cache in sync\n                     with the PostgreSQL/MongoDB sources of truth)\n```\n\nWHY each component, applying the module\'s decision criteria: **PostgreSQL** for orders/payments/inventory — this data has the MOST relational structure (orders reference customers, addresses, payment methods; order_items reference products) and the MOST common-case need for multi-step atomicity (place order = create order + create order_items + decrement inventory + create payment record, all together) — exactly the PostgreSQL-favoring pattern from this module\'s PostgreSQL-vs-MongoDB question. **MongoDB** for the product catalog — product attributes vary WILDLY by category (a laptop\'s spec fields are nothing like a t-shirt\'s size/color fields), the catalog is read far more than written, and each product is naturally read/written as one whole document on a product page — exactly the MongoDB-favoring pattern. **Redis** for sessions/cart/rate-limiting — ephemeral, simple key-value, needs sub-millisecond latency, does not need to survive being lost (a cart can be rebuilt; a session can require re-login) — a workload that plays directly to Redis\'s strengths and would be a poor, over-engineered fit for either primary database. **Search engine** for product search — once the catalog is large enough that relevance ranking/typo tolerance/faceted filtering genuinely matter (this module\'s search-architecture question), populated asynchronously from MongoDB via the outbox/CDC pattern. **Object storage** for product images — large binary files that should never live directly in PostgreSQL/MongoDB (this module\'s database-vs-object-storage principle), with the DATABASE storing only a URL/reference to the object storage location.\n\nThe CONSISTENCY story tying it together: PostgreSQL and MongoDB are each the unambiguous source of truth for THEIR OWN data; Redis and the search index are explicitly DERIVED, eventually-consistent caches/projections, kept in sync via outbox-pattern events — this means a Redis or search-index outage is a degraded-performance incident (cache misses fall through to the source of truth), never a DATA LOSS incident, because nothing is EVER stored ONLY in the derived stores.',
    productionExample:
      'A mid-size e-commerce company runs exactly this architecture, and specifically credits the outbox-pattern event pipeline (connecting PostgreSQL/MongoDB writes to search-index and cache updates) as the single decision that let them recover cleanly from a real production incident where their Elasticsearch cluster became corrupted — because the search index was always treated as a REBUILDABLE, derived projection (never a source of truth), the team simply replayed outbox events from the retention window to rebuild the entire search index from scratch, with zero permanent data loss.',
    bestPractices: [
      'Justify each database technology in a polyglot architecture by the SPECIFIC access pattern and consistency need of the data it holds, applying this module\'s decision framework to each piece of data independently.',
      'Maintain a clear, explicit distinction between SOURCE-OF-TRUTH stores (PostgreSQL, MongoDB here) and DERIVED/PROJECTION stores (Redis cache, search index) — an outage or corruption in a derived store should never mean permanent data loss.',
      'Connect source-of-truth writes to derived-store updates via the outbox pattern (or CDC), never via a fragile direct dual-write from application code.',
    ],
    tradeOffs:
      'This multi-database architecture gives each workload its best-fit technology and strong resilience (derived stores are always rebuildable) at the cost of significant operational complexity — five distinct technologies to deploy, monitor, secure, and staff expertise for, plus an event-driven synchronization pipeline that itself needs monitoring — a tradeoff that is clearly justified at meaningful e-commerce scale, but would be substantial over-engineering for a small catalog/low-traffic store, where a single PostgreSQL database with JSONB for flexible product attributes might be the entirely appropriate, simpler starting point.',
    commonMistakes: [
      'Building this full five-technology architecture prematurely for a small-scale store, incurring operational complexity far beyond what the actual traffic/data volume justifies.',
      'Letting a derived store (search index, cache) become a de facto source of truth by storing data there that does not ALSO exist in PostgreSQL/MongoDB, losing the ability to rebuild it from scratch after corruption.',
      'Connecting the source-of-truth databases to the derived stores via direct application-code dual writes instead of the outbox pattern, reintroducing the dual-write problem this module specifically addresses.',
    ],
    followUpQuestions: [
      'How would you scale this architecture DOWN for a small store with a few hundred products and modest traffic, and at what growth point would you introduce each additional component?',
      'Walk through exactly how you would rebuild the Elasticsearch index from scratch if it became corrupted, using the outbox event history.',
      'How would you handle a scenario where a customer places an order for a product whose price changed in MongoDB between when they added it to their cart and when they checked out?',
    ],
    relatedTopics: ['System Design', 'Polyglot Persistence', 'E-Commerce Architecture', 'Outbox Pattern', 'Object Storage', 'Search Architecture'],
  },
];

export const MOCK_PYTHON_MODULE22_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
