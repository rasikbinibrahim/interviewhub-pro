// Python + DSA Interview Handbook — Module 15: PostgreSQL Fundamentals.
// Hand-authored technical questions covering relational database basics,
// PostgreSQL architecture and comparison to other databases, connection
// strings, SQL data types, DDL/constraints, CRUD, SELECT clauses, sorting
// and pagination, and built-in SQL functions — with genuine, runnable SQL
// and production reasoning. Mirrors the MockTechnicalQuestion shape defined
// in @/mocks/questions.

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
    id: 'python-m15-1',
    number: 'PY-M15-1',
    title: 'What is an RDBMS, and how does PostgreSQL\'s process architecture work?',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Database Fundamentals',
    expectedAnswer:
      'An RDBMS (Relational Database Management System) stores data in structured TABLES of rows/columns with declared relationships (foreign keys) and enforces integrity constraints, ACID transactions, and a query language (SQL) — as opposed to a document/key-value store that gives up some of this structure for schema flexibility. PostgreSQL specifically uses a multi-PROCESS architecture (not threads): one postmaster supervisor process forks a dedicated backend process per client connection, plus background processes (WAL writer, autovacuum, checkpointer, background writer) that maintain the database independent of any single client.',
    deepExplanation:
      "PostgreSQL\\\n\nStep 1 — Understand the topic.\nTopic: What is an RDBMS, and how does PostgreSQL\\\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production API server typically never connects directly to PostgreSQL per request — it goes through a connection pool (SQLAlchemy\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **What is an RDBMS, and how does PostgreSQL\\**.",
    bestPractices: [
      'Always use connection pooling in production (SQLAlchemy engine pool at minimum, PgBouncer for very high connection-churn workloads) rather than opening a fresh connection per request.',
      'Understand PostgreSQL\'s default `max_connections` (typically 100) is a HARD ceiling shared across your entire application fleet — size your pools with this in mind, not per-instance in isolation.',
      'Use schemas (`CREATE SCHEMA analytics;`) to logically separate concerns within one database rather than always reaching for entirely separate databases, which cannot easily JOIN across each other.',
    ],
    tradeOffs:
      'PostgreSQL\'s process-per-connection model gives strong isolation (one connection crashing cannot corrupt another\'s memory) at the cost of higher per-connection overhead versus a thread-per-connection model (like some other databases) — this tradeoff is precisely why connection pooling is not optional tuning but a near-mandatory architectural requirement for PostgreSQL at scale.',
    commonMistakes: [
      'Opening a new raw database connection per HTTP request with no pooling, quickly exhausting `max_connections` under real traffic.',
      'Confusing "schema" (a namespace inside one database) with "database" (a fully separate, non-joinable namespace) when designing multi-tenant systems.',
      'Assuming PostgreSQL connections are as cheap as opening a file handle — they are comparatively expensive (a forked process) and should be treated as a scarce, pooled resource.',
    ],
    followUpQuestions: [
      'Why does PostgreSQL fork a full OS process per connection instead of using threads, and what does that cost you?',
      'What is the difference between PgBouncer\'s "session", "transaction", and "statement" pooling modes, and why does transaction mode not work with session-level features like prepared statements or advisory locks by default?',
      'How would you decide `max_connections` and your application pool size together for a fleet of 10 API instances?',
    ],
    relatedTopics: ['RDBMS', 'PostgreSQL Architecture', 'Connection Pooling', 'Process Model', 'Schema vs Database'],
  },
  {
    id: 'python-m15-2',
    number: 'PY-M15-2',
    title: 'PostgreSQL vs MySQL vs SQLite vs MongoDB — choosing the right database',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Database Fundamentals',
    expectedAnswer:
      'PostgreSQL is a general-purpose, strongly-standards-compliant RDBMS with rich data types (JSONB, arrays, ranges), strong concurrency via MVCC, and extensibility (extensions like PostGIS); MySQL (InnoDB) is simpler and historically faster for pure read-heavy simple-schema workloads but has historically weaker standards compliance and fewer advanced features; SQLite is an embedded, single-file, zero-server database ideal for local/mobile/small apps but not built for concurrent multi-client production write workloads; MongoDB is a document store trading relational integrity/JOINs for flexible, denormalized schemas that fit naturally with deeply nested, evolving object shapes.',
    deepExplanation:
      "```text\n              PostgreSQL      MySQL          SQLite         MongoDB\nModel         Relational      Relational     Relational     Document (JSON-like)\nServer        Client/server   Client/server  Embedded/file  Client/server\nConcurrency   MVCC (strong)   MVCC (InnoDB)  Limited writes MVCC-like (WiredTiger)\nJOINs         Rich, standard  Standard       Standard       Manual ($lookup, limited)\nJSON support  JSONB (indexed) JSON (limited) JSON1 ext      Native (it IS JSON)\nBest for      General purpose,\n              complex queries,\n              data integrity     Simple web apps,\n                                  read-heavy         Local/embedded,\n                                                      mobile, tests   Flexible/evolving\n                                                                      schemas, high write\n                                                                      throughput on simple\n                                                                      document access\n```\n\nThe interview-relevant decision framework is NOT \"which is more popular\" but: (1) Does your data have strong RELATIONAL structure with many-to-many relationships and a need for JOINs and referential integrity (foreign keys)? -> favors PostgreSQL/MySQL. (2) Does your data look like naturally nested, per-entity documents that rarely need to be JOINed against other entities, with a schema that changes often? -> MongoDB becomes attractive, at the cost of giving up cross-document transactional guarantees historically (modern MongoDB does support multi-document transactions, but at a performance cost that goes against the grain of its design). (3) Is this a single-process embedded use case (mobile app, CLI tool, test fixture) with no concurrent multi-writer requirement? -> SQLite. (4) Do you specifically need advanced features — full JSONB with GIN indexing, PostGIS geospatial, window functions, CTEs, strict ACID, extensions — while still wanting relational integrity? -> PostgreSQL is usually the strongest general default in modern backend engineering.\n\nA common, very real hybrid pattern: use PostgreSQL as the system of record for relational entities (users, orders, payments) while storing a JSONB column for a genuinely variable/sparse attribute set (e.g. `product.metadata`) — this gets you PostgreSQL\\\n\nStep 1 — Understand the topic.\nTopic: PostgreSQL vs MySQL vs SQLite vs MongoDB — choosing the right database\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A payments platform uses PostgreSQL as the source of truth for accounts/transactions (needs strict ACID + foreign keys + row locking for balance updates) while using a JSONB column on the `events` table to store variable third-party webhook payloads whose shape differs per provider — avoiding a second database system just for that flexible slice of data.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **PostgreSQL vs MySQL vs SQLite vs MongoDB — choosing the right database**.",
    bestPractices: [
      'Default to PostgreSQL for new backend services unless a SPECIFIC, articulable requirement (embedded/local-only, or genuinely document-shaped data with no relational needs) points elsewhere.',
      'Use PostgreSQL\'s JSONB column type for genuinely variable/sparse attributes INSIDE an otherwise relational schema, rather than reaching for a second database system.',
      'Benchmark with YOUR actual workload before choosing on "performance" alone — published benchmarks rarely match your specific read/write mix, data size, and query patterns.',
    ],
    tradeOffs:
      'PostgreSQL\'s relational rigor (foreign keys, JOINs, strict schema) buys strong data integrity guarantees and rich query power, at the cost of needing explicit schema migrations for structural changes — a document store\'s schema flexibility removes that migration friction but pushes data-integrity enforcement (and eventual "what shape is this document actually in" complexity) into application code instead.',
    commonMistakes: [
      'Choosing MongoDB "because it is web-scale" for a workload that is fundamentally relational (many-to-many entities needing JOINs and referential integrity), then re-implementing JOIN logic and integrity checks manually in application code.',
      'Using SQLite in a production multi-instance web service expecting concurrent writers, hitting its single-writer-at-a-time limitation under real load.',
      'Assuming "PostgreSQL is always slower than MySQL for reads" as a blanket statement — the actual answer depends heavily on schema, indexing, and query shape, and is often false for anything beyond trivial single-table lookups.',
    ],
    followUpQuestions: [
      'When would you legitimately need BOTH a relational database and a document store in the same system, and how would you keep them consistent?',
      'What does PostgreSQL\'s JSONB give you that a plain JSON column (or MySQL\'s JSON type) does not (hint: binary storage format + GIN indexing)?',
      'What are the real limitations of SQLite for a production web service, beyond "it doesn\'t scale"?',
    ],
    relatedTopics: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Database Selection', 'JSONB'],
  },
  {
    id: 'python-m15-3',
    number: 'PY-M15-3',
    title: 'Connection strings, roles, and PostgreSQL authentication',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'PostgreSQL Setup',
    expectedAnswer:
      'A PostgreSQL connection string (`postgresql://user:password@host:port/database`) encodes everything needed to establish a session: WHO is connecting (role/user + password), WHERE the server is (host + port, default 5432), and WHICH logical database to connect to. PostgreSQL uses "roles" for both users and groups (a role can log in directly, or be granted to other roles) — access is controlled via `GRANT`/`REVOKE` on specific privileges (SELECT, INSERT, UPDATE, DELETE, etc.) per role per object, following the principle of least privilege.',
    deepExplanation:
      "```text\npostgresql://appuser:s3cret@db.internal.example.com:5432/orders_production?sslmode=require\n            \\\\______/ \\\\____/ \\\\____________________________/ \\\\___/ \\\\________________/ \\\\_____________/\n              user   password              host              port     database          extra options (TLS enforcement here)\n```\n\nRole/permission setup, following least privilege (never connect production application traffic as the PostgreSQL superuser):\n\n```sql\n-- create a role that can log in (a \"user\")\nCREATE ROLE app_user WITH LOGIN PASSWORD \\\n\nStep 1 — Understand the topic.\nTopic: Connection strings, roles, and PostgreSQL authentication\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nCREATE TABLE users (\n    id BIGSERIAL PRIMARY KEY,\n    email TEXT UNIQUE NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nINSERT INTO users(email)\nVALUES ('ada@example.com');\n\nSELECT *\nFROM users\nWHERE email = 'ada@example.com';\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nINSERT INTO users(email)\nVALUES ('ada@example.com')\nON CONFLICT (email) DO NOTHING;\n```\n\nStep 5 — Example result:\n```text\none valid user row\n```\n\nStep 6 — Complexity / trade-off:\nPush integrity into constraints and use parameterized SQL for values.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production deployment typically has at least THREE distinct roles hitting the same database: a scoped `app_user` role for the API service (CRUD only, no DDL/schema-changing rights), a `migration_user` role used only by CI/CD during deploys (has DDL rights, never used by the running application), and a `readonly_reporting` role for BI tools/analysts — this separation means a compromised API credential cannot drop tables or alter schema, limiting blast radius.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Connection strings, roles, and PostgreSQL authentication**.",
    bestPractices: [
      'Never run production application traffic as the PostgreSQL superuser (`postgres`) — create a scoped role with only the privileges the application actually needs.',
      'Store connection strings/passwords in a secrets manager or environment variables injected at deploy time, never hard-coded in source control.',
      'Enforce `sslmode=require` (or `verify-full` with certificate pinning for the strictest setups) for any connection crossing a network boundary, not just within a trusted VPC.',
    ],
    tradeOffs:
      'Fine-grained per-role privilege separation (app role vs migration role vs readonly role) adds operational setup overhead (more roles/grants to manage and keep in sync) but sharply limits the blast radius of a leaked credential — a compromised read-only reporting password cannot mutate data, and a compromised app-user password cannot alter schema.',
    commonMistakes: [
      'Connecting the production API with the PostgreSQL superuser role "because it is simpler", eliminating any meaningful privilege boundary if that credential leaks.',
      'Committing a connection string with an embedded password directly into source control or a Dockerfile `ENV` instruction.',
      'Forgetting `GRANT ... ON ALL SEQUENCES` alongside table grants, causing confusing "permission denied for sequence" errors on inserts into tables with `SERIAL`/`IDENTITY` primary keys.',
    ],
    followUpQuestions: [
      'What is the difference between a PostgreSQL "role" and a "user", concretely?',
      'How would you rotate a database password with zero downtime for a running fleet of application instances?',
      'What does `pg_hba.conf` control, and how does it interact with the authentication method specified in a client\'s connection string?',
    ],
    relatedTopics: ['Connection Strings', 'Roles', 'GRANT/REVOKE', 'Authentication', 'Least Privilege'],
  },
  {
    id: 'python-m15-4',
    number: 'PY-M15-4',
    title: 'SQL execution order — why SELECT is not really "first"',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'SQL Fundamentals',
    expectedAnswer:
      'SQL is WRITTEN in the order `SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT`, but LOGICALLY EXECUTED in a different order: `FROM/JOIN` (build the working row set) -> `WHERE` (filter individual rows) -> `GROUP BY` (aggregate into groups) -> `HAVING` (filter GROUPS) -> `SELECT` (compute the output columns/expressions) -> `DISTINCT` -> `ORDER BY` -> `LIMIT/OFFSET`. This ordering explains several "why can\'t I do that" SQL rules that otherwise seem arbitrary.',
    deepExplanation:
      "```text\nWritten order:    SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT\nLogical execution: FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET\n```\n\nThis execution order directly explains several classic SQL \"gotchas\":\n\n1. **Why WHERE cannot reference a column alias defined in SELECT**: `SELECT price * 1.1 AS total_price FROM products WHERE total_price > 100` is INVALID in standard PostgreSQL SQL, because WHERE executes BEFORE SELECT logically — `total_price` does not exist yet at the point WHERE runs. You must repeat the expression: `WHERE price * 1.1 > 100`.\n\n2. **Why HAVING can reference aggregates but WHERE cannot**: `WHERE` filters individual rows before any grouping/aggregation has happened, so `WHERE COUNT(*) > 5` is invalid — `COUNT(*)` does not exist yet. `HAVING COUNT(*) > 5` is valid because HAVING runs AFTER GROUP BY has produced aggregated groups.\n\n3. **Why ORDER BY CAN reference a SELECT alias**: `ORDER BY` runs AFTER `SELECT` logically, so by the time it runs, output column aliases already exist — `SELECT price * 1.1 AS total_price FROM products ORDER BY total_price` IS valid.\n\n```sql\n-- valid: HAVING filters the aggregated GROUP, after GROUP BY has run\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 5\nORDER BY order_count DESC;\n\n-- invalid: WHERE cannot see the aggregate — must use HAVING instead\n-- SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id WHERE order_count > 5;  -- ERROR\n```\n\nUnderstanding this logical order (not the physical execution the query PLANNER actually chooses, which can reorder/optimize freely as long as the RESULT matches this logical semantics) is one of the most reliable \"do you actually understand SQL, or have you memorized syntax\" signals in a database interview.\n\nStep 1 — Understand the topic.\nTopic: SQL execution order — why SELECT is not really \"first\"\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "Debugging a \"column total_price does not exist\" error in a WHERE clause on a junior engineer\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **SQL execution order — why SELECT is not really \"first\"**.",
    bestPractices: [
      'Use a CTE or subquery to "materialize" a computed SELECT alias BEFORE filtering on it, if you want WHERE-like filtering on a derived value: `WITH priced AS (SELECT *, price*1.1 AS total_price FROM products) SELECT * FROM priced WHERE total_price > 100;`',
      'Reach for HAVING specifically (and only) when filtering on an AGGREGATE result of a GROUP BY — use WHERE for filtering individual rows before aggregation whenever possible, since it is evaluated earlier and can often use an index.',
      'When teaching or reviewing SQL, always reason in LOGICAL execution order, not the order the clauses are typed in — it resolves most "why doesn\'t this work" confusion instantly.',
    ],
    tradeOffs:
      'Filtering as early as possible in the logical pipeline (WHERE before GROUP BY, rather than filtering post-aggregation with HAVING when a WHERE-equivalent condition would suffice) reduces the number of rows the expensive GROUP BY/aggregation step has to process — pushing a filter into WHERE instead of HAVING wherever the condition does not actually depend on the aggregate is a real, measurable performance best practice, not just a style preference.',
    commonMistakes: [
      'Referencing a SELECT column alias inside the SAME query\'s WHERE clause and being confused by the "column does not exist" error.',
      'Using HAVING for a condition that does not actually involve an aggregate (e.g. `HAVING customer_id = 5` instead of `WHERE customer_id = 5`), needlessly deferring a cheap per-row filter until after an expensive aggregation step.',
      'Assuming the LOGICAL execution order described here is literally how the query planner physically executes the query — the planner is free to reorder operations (e.g. push a WHERE filter down before a JOIN) as long as the final result is equivalent; the logical order is a reasoning model, not a literal execution trace.',
    ],
    followUpQuestions: [
      'Why can ORDER BY reference a SELECT alias but WHERE cannot?',
      'How would you filter on an aggregate value from a subquery instead of using HAVING, and would that ever be necessary?',
      'Does the query PLANNER always execute FROM/JOIN before WHERE physically, or can it reorder for optimization while preserving the logical result?',
    ],
    relatedTopics: ['SQL Execution Order', 'WHERE vs HAVING', 'Query Semantics', 'CTEs', 'Aggregation'],
  },
  {
    id: 'python-m15-5',
    number: 'PY-M15-5',
    title: 'Choosing PostgreSQL data types: numeric, character, date/time, UUID, and JSONB',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Data Types',
    expectedAnswer:
      'PostgreSQL data type choice is a real design decision with performance and correctness consequences: use `INTEGER`/`BIGINT` for whole numbers (never `NUMERIC` for things you will do fast arithmetic on at scale), `NUMERIC(p,s)` for exact decimal values like money (never `REAL`/`DOUBLE PRECISION`, which are binary floating point and cannot represent decimal fractions exactly), `TEXT` over `VARCHAR(n)` unless you have a genuine, enforced length business rule (PostgreSQL\'s `TEXT` has no meaningful performance penalty over `VARCHAR`), `TIMESTAMPTZ` (never plain `TIMESTAMP`) for anything representing a real-world instant, and `JSONB` (never plain `JSON`) for structured-but-flexible data you intend to query/index.',
    deepExplanation:
      "```sql\nCREATE TABLE orders (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    customer_id BIGINT NOT NULL REFERENCES customers(id),\n    status order_status NOT NULL DEFAULT \\\n\nStep 1 — Understand the topic.\nTopic: Choosing PostgreSQL data types: numeric, character, date/time, UUID, and JSONB\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nWITH totals AS (\n    SELECT customer_id,\n           SUM(total) AS revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT *\nFROM totals\nWHERE revenue > 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nWITH totals AS (\n    SELECT customer_id, SUM(total) revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT * FROM totals;\n```\n\nStep 5 — Example result:\n```text\naggregated customer totals\n```\n\nStep 6 — Complexity / trade-off:\nCTEs improve query decomposition; recursive CTEs solve hierarchical traversal.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A billing system that used `DOUBLE PRECISION` for invoice line-item amounts discovered, after processing millions of transactions, that summed totals drifted by cents from the true value due to accumulated floating-point rounding error — migrating the column to `NUMERIC(12,2)` (an ALTER TABLE with an explicit cast, requiring careful production migration planning) permanently fixed the drift, illustrating why the type decision should be made correctly upfront rather than retrofitted.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Choosing PostgreSQL data types: numeric, character, date/time, UUID, and JSONB**.",
    bestPractices: [
      'Use `NUMERIC(p,s)` for any monetary or exact-decimal value, never `REAL`/`DOUBLE PRECISION`.',
      'Use `TIMESTAMPTZ` for every timestamp representing a real-world instant (created_at, updated_at, placed_at), never bare `TIMESTAMP`.',
      'Default to `TEXT` over `VARCHAR(n)` unless a genuine business rule caps the length — `VARCHAR(n)` provides no storage/performance advantage in PostgreSQL.',
      'Use `JSONB` (not `JSON`) whenever you intend to query, filter, or index into the structured data, reserving genuinely `JSON` only for rare cases needing exact byte-for-byte preservation of the original input.',
    ],
    tradeOffs:
      '`NUMERIC` guarantees exact decimal arithmetic at some CPU cost versus `REAL`/`DOUBLE PRECISION`\'s faster-but-approximate binary floating point — for money and any value where exactness matters (billing, accounting, inventory counts with fractional units), that cost is non-negotiable; for genuinely approximate scientific/sensor data where a small margin of error is acceptable, floating point remains the appropriate, faster choice.',
    commonMistakes: [
      'Using `REAL`/`DOUBLE PRECISION` (or, worse, `FLOAT` in application code) for currency amounts, introducing silent rounding errors that compound over many transactions.',
      'Using bare `TIMESTAMP` (no timezone) for event/audit timestamps, producing subtly wrong comparisons the moment the application or its users span more than one timezone.',
      'Habitually reaching for `VARCHAR(255)` on every text column "because that is what I always do", adding an artificial and often eventually-wrong length constraint with zero actual storage benefit.',
    ],
    followUpQuestions: [
      'Why does `TIMESTAMPTZ` avoid timezone bugs even though PostgreSQL does not actually store a timezone name alongside the value?',
      'What is the actual performance/storage difference (if any) between `TEXT` and `VARCHAR(50)` in PostgreSQL internally?',
      'When would `JSON` (not `JSONB`) actually be the correct choice over `JSONB`?',
    ],
    relatedTopics: ['Data Types', 'NUMERIC', 'TIMESTAMPTZ', 'JSONB', 'ENUM', 'Schema Design'],
  },
  {
    id: 'python-m15-6',
    number: 'PY-M15-6',
    title: 'CREATE TABLE, constraints, and foreign key actions (CASCADE, SET NULL, RESTRICT)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'DDL & Constraints',
    expectedAnswer:
      'A `CREATE TABLE` statement declares columns, their types, and CONSTRAINTS that PostgreSQL enforces on every write: `PRIMARY KEY` (unique + not-null identity), `FOREIGN KEY` (referential integrity to another table\'s key), `UNIQUE` (no duplicate values), `NOT NULL` (value required), `CHECK` (arbitrary boolean business rule), and `DEFAULT` (value used when omitted). Foreign keys additionally specify an `ON DELETE`/`ON UPDATE` ACTION (`CASCADE`, `SET NULL`, `RESTRICT`, `NO ACTION`) controlling what happens to dependent rows when the referenced row is deleted/changed.',
    deepExplanation:
      "```sql\nCREATE TABLE customers (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE,\n    age INTEGER CHECK (age >= 0 AND age < 150),\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE orders (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,\n    -- deleting a customer deletes ALL their orders too — appropriate when orders\n    -- have no meaning/value independent of their customer\n    shipping_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,\n    -- deleting an address just nulls the reference on the order — the order\n    -- itself should still exist as a historical record\n    total NUMERIC(12,2) NOT NULL CHECK (total >= 0)\n);\n\nCREATE TABLE order_items (\n    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,\n    -- RESTRICT: you CANNOT delete a product while any order_item still references it —\n    -- forces an explicit business decision (archive the product instead of deleting it)\n    quantity INTEGER NOT NULL CHECK (quantity > 0),\n    unit_price NUMERIC(12,2) NOT NULL,\n    PRIMARY KEY (order_id, product_id)   -- composite primary key: this pair must be unique\n);\n\nALTER TABLE customers ADD COLUMN phone VARCHAR(20);\nALTER TABLE customers ALTER COLUMN age SET NOT NULL;    -- fails if any existing row has NULL age\nDROP TABLE order_items;                                   -- permanently removes table + data + definition\nTRUNCATE TABLE orders;                                    -- fast-deletes ALL rows, keeps table structure, resets any owned sequence\n```\n\nForeign key action semantics, precisely:\n\n```text\nCASCADE     — deleting/updating the parent automatically deletes/updates dependent child rows too\nSET NULL    — deleting/updating the parent sets the child\\\n\nStep 1 — Understand the topic.\nTopic: CREATE TABLE, constraints, and foreign key actions (CASCADE, SET NULL, RESTRICT)\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nCREATE TABLE users (\n    id BIGSERIAL PRIMARY KEY,\n    email TEXT UNIQUE NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nINSERT INTO users(email)\nVALUES ('ada@example.com');\n\nSELECT *\nFROM users\nWHERE email = 'ada@example.com';\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nINSERT INTO users(email)\nVALUES ('ada@example.com')\nON CONFLICT (email) DO NOTHING;\n```\n\nStep 5 — Example result:\n```text\none valid user row\n```\n\nStep 6 — Complexity / trade-off:\nPush integrity into constraints and use parameterized SQL for values.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce schema uses `ON DELETE CASCADE` from `order_items` to `orders` (an order item is meaningless without its order) but `ON DELETE RESTRICT` from `order_items` to `products` (you must never be able to accidentally delete a product that has ever appeared in a real, placed order — the correct operation is to mark the product `discontinued`, not delete its row) — this single design decision, encoded declaratively in the schema itself, prevents an entire category of historical-data-loss bugs that would otherwise require careful application-code discipline to avoid.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **CREATE TABLE, constraints, and foreign key actions (CASCADE, SET NULL, RESTRICT)**.",
    bestPractices: [
      'Choose the FK action deliberately per relationship based on the actual business meaning of "what should happen to dependents when the parent is removed" — never default to CASCADE everywhere without thinking it through.',
      'Prefer RESTRICT (or NO ACTION, the SQL-standard default) for relationships where deleting the parent should force an explicit, considered decision, rather than silently cascading data loss.',
      'Use `CHECK` constraints to encode simple, stable business invariants (quantity > 0, age within a sane range) directly in the schema — this makes them impossible to violate even from a buggy or malicious direct SQL client, not just from well-behaved application code.',
    ],
    tradeOffs:
      'Enforcing invariants at the DATABASE layer (constraints, FK actions) guarantees correctness regardless of which application code path writes the data (including ad hoc scripts, migrations, or a future service you have not written yet), at the cost of constraints being somewhat less flexible/dynamic to change than equivalent application-level validation — the right answer for STABLE, fundamental invariants is almost always the database constraint; fast-changing, UI-specific validation belongs in application code.',
    commonMistakes: [
      'Using `ON DELETE CASCADE` on every foreign key reflexively, leading to surprising, silent, large-scale data loss when a seemingly small delete cascades much further than intended.',
      'Forgetting that `RESTRICT`/`NO ACTION` will actively BLOCK a delete (raising a foreign key violation error) rather than silently succeeding — a common source of confusing "why can\'t I delete this row" bugs when the actual cause is an un-investigated dependent table.',
      'Using `TRUNCATE` on a table other code assumes will just be emptied without also considering it resets owned identity sequences (unless `CONTINUE IDENTITY` is specified) and requires elevated privileges plus `CASCADE` if other tables reference it.',
    ],
    followUpQuestions: [
      'When would `SET DEFAULT` be a more appropriate foreign key action than `SET NULL`?',
      'What is the practical difference between `RESTRICT` and `NO ACTION`, given both block the operation by default?',
      'How would you safely add a `NOT NULL` constraint to an existing large production table with some NULL values already present, without significant downtime?',
    ],
    relatedTopics: ['DDL', 'Constraints', 'Foreign Keys', 'CASCADE', 'TRUNCATE', 'Schema Design'],
  },
  {
    id: 'python-m15-7',
    number: 'PY-M15-7',
    title: 'CRUD in SQL — INSERT, UPDATE, DELETE with real performance implications',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'CRUD',
    expectedAnswer:
      '`INSERT`, `UPDATE`, and `DELETE` are the mutating SQL statements; each has both a single-row form and a BULK form, and the bulk forms are dramatically more efficient than looping single-row statements from application code because they avoid per-statement network round-trip and per-statement transaction/planning overhead — a difference that becomes critical at any real production data volume.',
    deepExplanation:
      "```sql\n-- single-row insert\nINSERT INTO products (name, price, category) VALUES (\\\n\nStep 1 — Understand the topic.\nTopic: CRUD in SQL — INSERT, UPDATE, DELETE with real performance implications\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nCREATE TABLE users (\n    id BIGSERIAL PRIMARY KEY,\n    email TEXT UNIQUE NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nINSERT INTO users(email)\nVALUES ('ada@example.com');\n\nSELECT *\nFROM users\nWHERE email = 'ada@example.com';\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nINSERT INTO users(email)\nVALUES ('ada@example.com')\nON CONFLICT (email) DO NOTHING;\n```\n\nStep 5 — Example result:\n```text\none valid user row\n```\n\nStep 6 — Complexity / trade-off:\nPush integrity into constraints and use parameterized SQL for values.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A data-import pipeline that originally looped 50,000 individual `INSERT` statements (taking over 10 minutes due to round-trip latency) was rewritten to batch rows into multi-row `INSERT` statements of 1,000 rows at a time (finishing in under 15 seconds) — the SAME logical data was written, only the batching strategy changed, illustrating that bulk operation shape is often a bigger performance lever than any individual query optimization.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **CRUD in SQL — INSERT, UPDATE, DELETE with real performance implications**.",
    bestPractices: [
      'Batch bulk writes (multi-row INSERT, or PostgreSQL `COPY` for very large imports) instead of looping single-row statements from application code.',
      'Always use `WHERE` on `UPDATE`/`DELETE` unless you deliberately intend to affect every row in the table — an accidentally omitted WHERE clause is one of the most common and most damaging production incident causes.',
      'Use `ON CONFLICT ... DO UPDATE` (UPSERT) instead of a manual SELECT-then-INSERT-or-UPDATE pattern to avoid race conditions under concurrent writers.',
    ],
    tradeOffs:
      'Bulk operations trade a bit of query complexity (constructing a multi-row VALUES list, or a joined UPDATE-from-VALUES) for a large reduction in round-trip and per-statement overhead — for genuinely large data volumes (tens of thousands of rows+), `COPY` goes even further, bypassing much of the standard INSERT machinery entirely, at the cost of a less flexible interface (no per-row conflict handling within a single COPY).',
    commonMistakes: [
      'Running an `UPDATE`/`DELETE` without a `WHERE` clause by accident (often from a missed line in a script, or forgetting to highlight the WHERE clause in a manual SQL client), silently affecting the entire table.',
      'Looping individual single-row INSERT/UPDATE statements from application code for a bulk operation instead of batching, causing dramatically worse throughput at scale.',
      'Using a manual SELECT-then-conditionally-INSERT-or-UPDATE pattern instead of `ON CONFLICT`, introducing a race condition where two concurrent requests can both see "does not exist yet" and both attempt an INSERT, one of which fails on the unique constraint.',
    ],
    followUpQuestions: [
      'How does `COPY` differ from a bulk multi-row `INSERT`, and when would you reach for one over the other?',
      'How would you safely delete millions of old rows from a large production table without causing a long-held lock or WAL/replication spike (hint: batching the delete in smaller chunks)?',
      'How does `ON CONFLICT ... DO UPDATE` actually avoid the race condition a naive check-then-write approach has, at the implementation level?',
    ],
    relatedTopics: ['INSERT', 'UPDATE', 'DELETE', 'UPSERT', 'Bulk Operations', 'COPY', 'Race Conditions'],
  },
  {
    id: 'python-m15-8',
    number: 'PY-M15-8',
    title: 'SELECT deep dive — filtering with WHERE, LIKE/ILIKE, IN, BETWEEN, CASE, and COALESCE',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'SQL Fundamentals',
    expectedAnswer:
      'The `WHERE` clause combines boolean predicates (`AND`/`OR`/`NOT`, `IN`, `BETWEEN`, `LIKE`/`ILIKE` for pattern matching, `IS NULL`/`IS NOT NULL`) to filter rows; `CASE` provides inline conditional expressions in the SELECT list; `COALESCE` returns the first non-NULL argument (essential for providing fallback/default display values); `NULLIF` returns NULL if two expressions are equal (useful for avoiding division-by-zero and similar edge cases).',
    deepExplanation:
      "```sql\n-- pattern matching: LIKE is case-sensitive, ILIKE is case-insensitive (PostgreSQL extension)\nSELECT * FROM customers WHERE email LIKE \\\n\nStep 1 — Understand the topic.\nTopic: SELECT deep dive — filtering with WHERE, LIKE/ILIKE, IN, BETWEEN, CASE, and COALESCE\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A customer support search feature using `WHERE email ILIKE \\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **SELECT deep dive — filtering with WHERE, LIKE/ILIKE, IN, BETWEEN, CASE, and COALESCE**.",
    bestPractices: [
      'Always use `IS NULL`/`IS NOT NULL` to test for NULL, never `= NULL`/`!= NULL`, which silently never match due to three-valued logic.',
      'Prefer `IN (...)` over a long chain of `OR` conditions for readability and to let the query planner optimize the set membership check.',
      'Avoid leading-wildcard `LIKE`/`ILIKE` patterns on large tables without a trigram (`pg_trgm`) index — a standard B-tree index cannot accelerate a `%prefix` search.',
    ],
    tradeOffs:
      '`ILIKE` (case-insensitive) is more forgiving for user-facing search but cannot use a plain B-tree index efficiently for prefix matches the way case-sensitive equality/prefix `LIKE` can (unless a functional index on `LOWER(column)` or a citext column type is used) — choosing case-insensitivity is a genuine tradeoff between user experience and straightforward indexability that needs an explicit indexing strategy to resolve.',
    commonMistakes: [
      'Writing `WHERE column = NULL` (or `!= NULL`) expecting it to match/exclude NULL rows, when it silently never matches anything due to SQL\'s three-valued logic.',
      'Using a leading-wildcard `LIKE \'%term%\'` on a large, unindexed column and being surprised by a slow sequential scan.',
      'Dividing by a column that can be zero without wrapping the denominator in `NULLIF(column, 0)`, causing a runtime "division by zero" error instead of a graceful NULL result.',
    ],
    followUpQuestions: [
      'Why does `NULL = NULL` evaluate to NULL (unknown) rather than TRUE or FALSE, and what does that mean for `NOT IN` queries containing a NULL?',
      'How would you make a case-insensitive prefix search efficient using an index (hint: functional index on LOWER(), or the citext extension)?',
      'What is a genuinely dangerous pitfall of using `NOT IN` with a subquery that might return NULL values?',
    ],
    relatedTopics: ['WHERE Clause', 'NULL Handling', 'LIKE/ILIKE', 'CASE', 'COALESCE', 'NULLIF', 'pg_trgm'],
  },
  {
    id: 'python-m15-9',
    number: 'PY-M15-9',
    title: 'ORDER BY, LIMIT/OFFSET pagination, and why large OFFSET values get slow',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Sorting & Pagination',
    expectedAnswer:
      '`ORDER BY ... LIMIT n OFFSET m` (offset/page-number pagination) is simple to implement but fundamentally does not scale: PostgreSQL must still SCAN AND DISCARD the first `m` rows every single time before returning the next page, so a request for page 10,000 does roughly the same amount of work as page 1 plus 10,000 pages of wasted scanning. Keyset (cursor) pagination avoids this entirely by filtering `WHERE (sort_column, id) > (last_seen_value, last_seen_id)` instead of skipping rows, turning an O(offset) operation into an O(page size) operation regardless of how deep into the result set you are.',
    deepExplanation:
      "```sql\n-- offset pagination — simple, but O(offset + limit) work on every request\nSELECT id, name, created_at FROM products\nORDER BY created_at DESC, id DESC\nLIMIT 20 OFFSET 10000;   -- PostgreSQL must still count past the first 10,000 matching rows\n\n-- keyset (cursor) pagination — O(limit) work regardless of how \"deep\" you are\n-- client stores the (created_at, id) of the LAST row seen on the current page, sends it back as the cursor\nSELECT id, name, created_at FROM products\nWHERE (created_at, id) < (\\\n\nStep 1 — Understand the topic.\nTopic: ORDER BY, LIMIT/OFFSET pagination, and why large OFFSET values get slow\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT id, created_at\nFROM orders\nORDER BY created_at DESC\nLIMIT 20 OFFSET 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT id, created_at\nFROM orders\nWHERE created_at < :cursor\nORDER BY created_at DESC\nLIMIT 20;\n```\n\nStep 5 — Example result:\n```text\n20 rows after cursor\n```\n\nStep 6 — Complexity / trade-off:\nLarge OFFSET scans and discards many rows; cursor pagination uses a stable ordered key.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A social media feed API originally used `OFFSET`-based pagination and saw response times balloon past 2 seconds once users scrolled deep into their history (large offsets on a multi-million-row posts table); switching to keyset pagination using `(created_at, id)` as the cursor brought EVERY page — regardless of scroll depth — back to a consistent ~10ms response time, because each request became a simple indexed range scan instead of a skip-then-scan.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **ORDER BY, LIMIT/OFFSET pagination, and why large OFFSET values get slow**.",
    bestPractices: [
      'Default to keyset (cursor) pagination for any large or frequently-growing table, especially infinite-scroll feeds and public APIs — reserve OFFSET pagination for small, bounded, rarely-deep result sets (e.g. an admin table capped at a few hundred rows).',
      'Always include a unique tiebreaker column (typically the primary key) alongside the sort column in BOTH the ORDER BY and the composite index, to guarantee a stable, total order for correct keyset comparisons.',
      'Build a composite index matching the exact `ORDER BY`/cursor columns (`(created_at, id)`) so the keyset WHERE predicate can be satisfied by a pure index range scan.',
    ],
    tradeOffs:
      'Keyset pagination is dramatically more scalable (O(limit) regardless of depth) but gives up true "jump to page N" random access and requires the client to carry an opaque cursor forward between requests instead of a simple page number — for UIs that genuinely need numbered page jumping (rare in practice, common in legacy admin table designs), a hybrid approach (offset pagination capped to a shallow maximum depth, or a pre-computed approximate row-count estimate) is sometimes used instead.',
    commonMistakes: [
      'Using `OFFSET` pagination on a large, growing, publicly-facing dataset and being surprised when deep-page requests become slow and eventually timeout under load.',
      'Implementing keyset pagination with only the (non-unique) sort column as the cursor, without a tiebreaker — causing rows with duplicate sort-column values to be silently skipped or duplicated across page boundaries.',
      'Building the composite index in the wrong column order relative to the ORDER BY/cursor predicate, defeating the index\'s ability to satisfy the query with a pure range scan.',
    ],
    followUpQuestions: [
      'Why can an index not "skip directly" to logical row N the way an array can jump to index N?',
      'How would you support a "jump to an approximate page number" UI feature on top of a keyset-paginated API, if a product requirement truly demanded it?',
      'How does keyset pagination behave correctly (or not) if rows can be inserted/deleted between two consecutive page requests, compared to offset pagination under the same conditions?',
    ],
    relatedTopics: ['Pagination', 'Keyset Pagination', 'Cursor Pagination', 'OFFSET', 'Index Scans', 'Composite Indexes'],
  },
  {
    id: 'python-m15-10',
    number: 'PY-M15-10',
    title: 'Aggregate functions and built-in SQL functions — COUNT, SUM, AVG, string/date functions',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'SQL Functions',
    expectedAnswer:
      'PostgreSQL provides aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) that collapse many rows into one value (typically combined with `GROUP BY`), plus a large library of scalar functions for strings (`LENGTH`, `LOWER`, `UPPER`, `CONCAT`/`||`, `TRIM`), numbers (`ROUND`, `CEIL`, `FLOOR`), and dates (`NOW()`, `DATE_TRUNC`, `EXTRACT`, `AGE`) — understanding the subtle difference between `COUNT(*)` and `COUNT(column)` (the latter excludes NULLs) is a frequent, genuinely important interview detail.',
    deepExplanation:
      "```sql\n-- COUNT(*) counts ALL rows (including ones with NULLs anywhere); COUNT(column) counts only non-NULL values of that column\nSELECT\n    COUNT(*) AS total_customers,               -- every row\n    COUNT(phone) AS customers_with_phone,        -- only rows where phone IS NOT NULL\n    COUNT(DISTINCT country) AS distinct_countries\nFROM customers;\n\n-- aggregate + GROUP BY: revenue per customer\nSELECT customer_id, SUM(total) AS lifetime_value, AVG(total) AS avg_order_value, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nORDER BY lifetime_value DESC;\n\n-- string functions\nSELECT\n    LENGTH(email) AS email_length,\n    LOWER(email) AS normalized_email,\n    TRIM(BOTH \\\n\nStep 1 — Understand the topic.\nTopic: Aggregate functions and built-in SQL functions — COUNT, SUM, AVG, string/date functions\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT COUNT(*) AS users,\n       AVG(age) AS avg_age\nFROM users;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT COUNT(*), SUM(total)\nFROM orders;\n```\n\nStep 5 — Example result:\n```text\naggregated metrics\n```\n\nStep 6 — Complexity / trade-off:\nBuilt-in aggregate functions are clearer and usually faster than application-side aggregation.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A \"monthly active users\" dashboard query that used `COUNT(user_id)` instead of `COUNT(DISTINCT user_id)` silently double/triple-counted users with multiple events per month for weeks before anyone noticed the inflated numbers — a direct real-world illustration of why the exact semantics of aggregate functions (not just \"which one sounds right\") matter for reporting correctness.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Aggregate functions and built-in SQL functions — COUNT, SUM, AVG, string/date functions**.",
    bestPractices: [
      'Use `COUNT(*)` when you want a row count regardless of NULLs, and `COUNT(specific_column)` (or `COUNT(DISTINCT column)`) only when you specifically need to exclude NULLs or duplicates — be deliberate about which one a metric actually needs.',
      'Wrap aggregates that might operate over an empty group in `COALESCE(..., 0)` when a NULL result would be misleading (e.g. "this customer has $NULL in lifetime value" instead of the correct "$0").',
      'Use `DATE_TRUNC` for time-bucketed reporting GROUP BYs rather than manually extracting and reassembling year/month components.',
    ],
    tradeOffs:
      '`COUNT(DISTINCT column)` gives an exact distinct count but is meaningfully more expensive than a plain `COUNT(*)` on large tables (it typically requires a sort or hash-based deduplication step internally) — for very large-scale approximate distinct counting (e.g. "roughly how many unique visitors"), a probabilistic structure like HyperLogLog (via an extension) trades exactness for dramatically lower memory/CPU cost.',
    commonMistakes: [
      'Using `COUNT(some_column)` when the intent was actually "count every row", silently undercounting whenever that column can be NULL.',
      'Forgetting that aggregates over zero matching rows return NULL, not 0, causing NULL values to leak into downstream calculations or UI display ("$NULL" instead of "$0").',
      'Confusing `COUNT(column)` with `COUNT(DISTINCT column)`, producing inflated counts when duplicate values matter (a classic MAU/DAU reporting bug).',
    ],
    followUpQuestions: [
      'Why does `SUM()` over zero rows return NULL instead of 0, and what does that imply about how you should write revenue/total queries?',
      'How would you compute an APPROXIMATE distinct count efficiently on a very large table, if exact `COUNT(DISTINCT ...)` becomes too slow?',
      'What is the difference between `DATE_TRUNC(\'week\', ts)` and manually extracting the ISO week number with `EXTRACT`, and when would each be more appropriate?',
    ],
    relatedTopics: ['Aggregate Functions', 'COUNT', 'GROUP BY', 'Date Functions', 'String Functions', 'NULL Handling'],
  },
  {
    id: 'python-m15-11',
    number: 'PY-M15-11',
    title: 'Coding: schema design and CRUD for a Users table with search, filtering, sorting, and pagination',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'SQL Coding',
    expectedAnswer:
      'A realistic "users" exercise combines this module\'s core skills end to end: a well-typed `CREATE TABLE` with appropriate constraints, parameterized CRUD statements, and a single, efficient list query supporting search + filter + sort + keyset pagination together — the kind of query that backs a typical admin "users" screen or API list endpoint.',
    deepExplanation:
      "```sql\n-- schema\nCREATE TABLE users (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE,\n    full_name TEXT NOT NULL,\n    status TEXT NOT NULL DEFAULT \\\n\nStep 1 — Understand the topic.\nTopic: Coding: schema design and CRUD for a Users table with search, filtering, sorting, and pagination\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT id, created_at\nFROM orders\nORDER BY created_at DESC\nLIMIT 20 OFFSET 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT id, created_at\nFROM orders\nWHERE created_at < :cursor\nORDER BY created_at DESC\nLIMIT 20;\n```\n\nStep 5 — Example result:\n```text\n20 rows after cursor\n```\n\nStep 6 — Complexity / trade-off:\nLarge OFFSET scans and discards many rows; cursor pagination uses a stable ordered key.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact query shape — status filter, optional ILIKE search across two columns, keyset cursor, indexed ORDER BY — is what a production \"list users\" admin API endpoint looks like once optimized past a naive `SELECT * FROM users OFFSET n LIMIT 20`, and is directly composable with the `idx_users_created_at_id` and `idx_users_status` indexes so the planner can satisfy it efficiently even at millions of rows.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: schema design and CRUD for a Users table with search, filtering, sorting, and pagination**.",
    bestPractices: [
      'Build the composite index to match the exact ORDER BY / cursor columns used by the list query, so pagination stays a fast index range scan at any table size.',
      'Always bind search/filter values as parameters, never interpolate them into the SQL string — this is both a correctness and a critical security practice.',
      'Prefer a soft-delete `status`/`deleted_at` column over a hard `DELETE` for user records specifically, since user data is frequently subject to audit, recovery, and referential-integrity requirements from other tables.',
    ],
    tradeOffs:
      'Combining search (`ILIKE`) with keyset pagination in one query is straightforward for small-to-medium tables, but a leading/trailing-wildcard ILIKE search does not benefit from the same B-tree index used for the cursor — at large scale, the search portion specifically would need a `pg_trgm` GIN index (or a move to a dedicated search engine) independent of the pagination strategy, which remains keyset-based regardless.',
    commonMistakes: [
      'Building the list query with OFFSET-based pagination "because it is simpler to implement first" and only discovering the deep-page performance cliff once the table grows in production.',
      'Interpolating the search term directly into the SQL string (`"...ILIKE \'%" + query + "%\'"`) instead of using a bound parameter, opening a SQL injection vulnerability.',
      'Forgetting to include the tiebreaker `id` in both the composite index and the keyset WHERE/ORDER BY, risking skipped or duplicated rows for users sharing the same `created_at` value.',
    ],
    followUpQuestions: [
      'How would you add a `pg_trgm` index to make the ILIKE search portion of this query efficient at scale?',
      'How would you extend this query to support sorting by a DIFFERENT column (e.g. `full_name`) while keeping keyset pagination correct?',
      'What changes would you make to this schema/query if "deleted" users needed to be fully excluded from ALL normal queries by default, without repeating the status filter everywhere (hint: a view, or a partial index)?',
    ],
    relatedTopics: ['CRUD', 'Search', 'Filtering', 'Sorting', 'Keyset Pagination', 'Parameterized Queries', 'Indexing'],
  },
];

export const MOCK_PYTHON_MODULE15_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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