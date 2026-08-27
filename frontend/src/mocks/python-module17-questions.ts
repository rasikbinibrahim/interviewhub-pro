// Python + DSA Interview Handbook — Module 17: SQLAlchemy 2.x + PostgreSQL.
// Hand-authored technical questions covering modern SQLAlchemy 2.x (Core vs
// ORM, engines/pooling, declarative models, relationships, sessions, select()
// queries, the repository pattern, async SQLAlchemy, the N+1 problem and
// loading strategies, transactions, and Alembic migrations) — with genuine,
// runnable SQLAlchemy 2.x + FastAPI code and production reasoning. Mirrors
// the MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m17-1',
    number: 'PY-M17-1',
    title: 'SQLAlchemy Core vs ORM, and where it sits in a layered FastAPI architecture',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'SQLAlchemy Fundamentals',
    expectedAnswer:
      'SQLAlchemy Core is a SQL expression toolkit — you build queries as Python objects (`select()`, `insert()`, table/column constructs) that compile to SQL, without any notion of mapped Python classes or object identity. The ORM is built ON TOP of Core: it maps Python classes to tables (`Mapped`/`mapped_column`), tracks object state via the identity map/unit-of-work, and lets you work with objects instead of raw rows — while still using Core\'s `select()` under the hood for actually querying. In a layered FastAPI app, SQLAlchemy sits at the bottom: `FastAPI (router) -> Service (business logic) -> Repository (data access) -> SQLAlchemy (ORM/Core) -> PostgreSQL`.',
    deepExplanation:
      "```text\nFastAPI router     — HTTP concerns only: parse request, call service, shape response\n  |\nService           — business logic, orchestrates one or more repositories, enforces rules\n  |\nRepository        — data-access abstraction: create/get/update/delete/list for ONE entity\n  |\nSQLAlchemy (ORM)  — maps Python objects <-> rows, builds SQL via select()/insert()/etc, manages Session\n  |\nPostgreSQL        — actual storage/execution engine\n```\n\n```python\nfrom sqlalchemy import select\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\n\nclass Base(DeclarativeBase):\n    pass\n\nclass User(Base):\n    __tablename__ = \"users\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(unique=True)\n\n# ORM query — returns actual User objects, tracked by the session\\\n\nStep 1 — Understand the topic.\nTopic: SQLAlchemy Core vs ORM, and where it sits in a layered FastAPI architecture\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nstmt = select(User).where(\n    User.email == \"ada@example.com\"\n)\n\nresult = session.execute(stmt)\nuser = result.scalar_one_or_none()\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nuser = session.scalar(\n    select(User).where(\n        User.email == \"ada@example.com\"\n    )\n)\n```\n\nStep 5 — Example result:\n```text\nUser object or None\n```\n\nStep 6 — Complexity / trade-off:\nORM adds identity/relationship tracking; Core is useful for SQL-shaped reporting queries.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production repository layer typically uses the ORM\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **SQLAlchemy Core vs ORM, and where it sits in a layered FastAPI architecture**.",
    bestPractices: [
      'Default to the ORM for entity-shaped CRUD and relationship-heavy data access; reach for Core-level queries for reporting/analytics queries whose result does not map to a single entity.',
      'Keep SQLAlchemy usage (models, Session, `select()`) entirely inside the Repository layer — Services and routers should never import SQLAlchemy directly, so the data-access technology can be swapped/tested in isolation.',
      'Use `Mapped`/`mapped_column` (SQLAlchemy 2.x style) for all new models — never the legacy `Column(...)`-only declarative style, which lacks static type-checking support.',
    ],
    tradeOffs:
      'The ORM\'s object identity/relationship tracking buys significant productivity for typical entity CRUD (traverse `order.customer.email` instead of manually joining), at the cost of some overhead (identity map bookkeeping, potential N+1 query pitfalls) that a hand-written Core/raw-SQL query avoids entirely — for a query executed millions of times per day where every microsecond matters, dropping to Core or raw SQL is a legitimate, deliberate optimization.',
    commonMistakes: [
      'Importing SQLAlchemy models/Session directly into FastAPI routers or service functions, collapsing the layered architecture and making the data-access technology impossible to swap or unit-test in isolation.',
      'Using the ORM for a complex, multi-table reporting query where the returned "object" would not correspond to any real entity, when a plain Core `select()` over specific columns would be clearer and faster.',
      'Mixing legacy `Column()` declarative syntax with new `Mapped`/`mapped_column()` syntax inconsistently across a codebase, losing the static-typing benefits the modern style is meant to provide.',
    ],
    followUpQuestions: [
      'What does the ORM\'s "identity map" actually give you that a Core-only query does not?',
      'When would you choose to write a raw `text()` SQL query instead of either Core or ORM constructs?',
      'How would you structure a repository so it could be swapped from SQLAlchemy to a different data-access library without touching the service layer?',
    ],
    relatedTopics: ['SQLAlchemy Core', 'SQLAlchemy ORM', 'Layered Architecture', 'Repository Pattern', 'Declarative Models'],
  },
  {
    id: 'python-m17-2',
    number: 'PY-M17-2',
    title: 'Engines, async engines, and connection pool configuration',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Engine & Connection Pooling',
    expectedAnswer:
      'An `Engine` (or `AsyncEngine`) is SQLAlchemy\'s central object managing a CONNECTION POOL to the database — it is created ONCE at application startup (never per-request) and handed out connections on demand. Pool configuration (`pool_size`, `max_overflow`, `pool_timeout`, `pool_recycle`, `pool_pre_ping`) tunes how many connections are kept warm, how many extra can burst above that, how long a caller waits for one to free up, and how staleness/dead connections are detected and avoided.',
    deepExplanation:
      "```python\nfrom sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker\n\nengine = create_async_engine(\n    \"postgresql+asyncpg://app_user:secret@db.internal:5432/orders_production\",\n    pool_size=10,        # steady-state number of connections kept open and ready\n    max_overflow=5,       # extra connections allowed above pool_size under a burst (total ceiling: 15)\n    pool_timeout=30,      # seconds a caller waits for a free connection before raising TimeoutError\n    pool_recycle=1800,     # recycle (close + reopen) connections older than 30 min, avoiding stale/firewall-dropped ones\n    pool_pre_ping=True,    # issue a lightweight \"SELECT 1\" before handing out a pooled connection, to detect dead ones\n    echo=False,            # True logs every SQL statement — useful in dev, never in production (log volume + secrets)\n)\n\nasync_session_factory = async_sessionmaker(engine, expire_on_commit=False)\n\n# created ONCE at application startup, reused for the life of the process — never per-request\n```\n\nConnection lifecycle: a caller \"checks out\" a connection from the pool (`async with engine.connect() as conn` or, more commonly at the ORM layer, `async with async_session_factory() as session`), uses it for one unit of work, then \"checks it in\" back to the pool on exit (via context manager) rather than truly closing the underlying TCP/PostgreSQL backend connection — this reuse is exactly what avoids the expensive PostgreSQL process-fork cost on every single request (see Module 15\\\n\nStep 1 — Understand the topic.\nTopic: Engines, async engines, and connection pool configuration\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nengine = create_engine(\n    DATABASE_URL,\n    pool_size=10,\n    max_overflow=20,\n)\n\nwith engine.connect() as connection:\n    connection.execute(\n        text(\"SELECT 1\")\n    )\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nengine = create_async_engine(\n    DATABASE_URL,\n    pool_size=10,\n)\n```\n\nStep 5 — Example result:\n```text\nconnection reused from pool\n```\n\nStep 6 — Complexity / trade-off:\nPool size must be designed against total application instances and PostgreSQL max_connections.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A service that mistakenly created a new `create_async_engine(...)` inside a FastAPI dependency function (instead of once at module/app startup) silently opened a brand-new connection pool on EVERY request, exhausting `max_connections` within minutes under real traffic — the fix was moving engine creation to application startup (a `lifespan` context manager) and injecting the single shared engine/session-factory into request handling via dependency injection.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Engines, async engines, and connection pool configuration**.",
    bestPractices: [
      'Create the engine exactly ONCE at application startup (in a FastAPI `lifespan` handler), never inside a request handler or dependency function.',
      'Set `pool_recycle` to a value comfortably below any known network/firewall idle-connection timeout in your infrastructure, and enable `pool_pre_ping` as a cheap safety net against stale connections.',
      'Size `pool_size + max_overflow` per instance with the WHOLE fleet and PostgreSQL\'s `max_connections` in mind, not in isolation.',
    ],
    tradeOffs:
      '`pool_pre_ping=True` adds a small latency cost (one extra lightweight round trip) to every connection checkout in exchange for reliably avoiding "connection already closed" errors surfacing all the way up to application code — for most production services this small, constant cost is well worth the reliability gain, though it can be omitted for latency-ultra-sensitive paths that instead rely purely on well-tuned `pool_recycle`.',
    commonMistakes: [
      'Creating a new engine/pool per request (or per dependency call) instead of once at startup, exhausting the database\'s connection limit almost immediately under load.',
      'Setting `pool_size`/`max_overflow` generously per instance without accounting for how many instances run concurrently, collectively exceeding PostgreSQL\'s `max_connections`.',
      'Leaving `echo=True` enabled in production, flooding logs with every SQL statement (and, depending on the query, potentially leaking sensitive parameter values into logs).',
    ],
    followUpQuestions: [
      'What specifically causes a pooled connection to silently go stale, and how do `pool_recycle` and `pool_pre_ping` address two different aspects of that problem?',
      'How would you size the connection pool for a fleet of 10 FastAPI instances against a PostgreSQL server with `max_connections=100`, accounting for a migration role and monitoring tools too?',
      'What is the difference between the connection pool timing out (`pool_timeout`) and the database itself refusing a new connection because `max_connections` is exhausted?',
    ],
    relatedTopics: ['Engine', 'AsyncEngine', 'Connection Pooling', 'pool_recycle', 'pool_pre_ping', 'FastAPI Lifespan'],
  },
  {
    id: 'python-m17-3',
    number: 'PY-M17-3',
    title: 'Modern declarative models with Mapped and mapped_column, line by line',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Declarative Models',
    expectedAnswer:
      'SQLAlchemy 2.x models inherit from `DeclarativeBase` and declare columns as `Mapped[T]` type-annotated attributes assigned to `mapped_column(...)` — the `Mapped[T]` annotation drives BOTH the Python-level static type (for mypy/IDE support) and, by default, the inferred SQL column type, while `mapped_column(...)` provides the actual column-level configuration (primary key, uniqueness, defaults, foreign keys, indexes).',
    deepExplanation:
      "```python\nfrom datetime import datetime\nfrom sqlalchemy import String, func\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\n\nclass Base(DeclarativeBase):\n    pass\n\nclass User(Base):\n    __tablename__ = \"users\"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    # Mapped[int] -> Python int type AND inferred SQL INTEGER; primary_key=True adds PRIMARY KEY + implicit NOT NULL\n\n    email: Mapped[str] = mapped_column(String(255), unique=True)\n    # String(255) overrides the inferred type (plain `str` would default to an unbounded TEXT-like type);\n    # unique=True adds a UNIQUE constraint\n\n    full_name: Mapped[str]\n    # bare Mapped[str] with no mapped_column() at all is shorthand for a required (NOT NULL) text column\n\n    bio: Mapped[str | None] = mapped_column(default=None)\n    # Mapped[str | None] -> nullable column; default=None is a PYTHON-side default (applied by SQLAlchemy before INSERT)\n\n    is_active: Mapped[bool] = mapped_column(default=True)\n\n    created_at: Mapped[datetime] = mapped_column(server_default=func.now())\n    # server_default -> a DATABASE-side default (DEFAULT NOW() in the DDL) — applies even to rows inserted\n    # by tools OTHER than this SQLAlchemy application (raw SQL, another service, a migration backfill)\n```\n\nThe `default=` vs `server_default=` distinction is a genuinely important, frequently-tested detail: `default=` is evaluated in PYTHON, by SQLAlchemy, before the INSERT statement is even sent — meaning a raw `INSERT` executed outside this application (a manual `psql` session, a different microservice, a data migration script) will NOT get that default applied, and the column would need to allow NULL or the raw INSERT would need to specify a value explicitly. `server_default=` is baked into the actual table DDL (`DEFAULT NOW()`) — PostgreSQL itself applies it for ANY INSERT that omits the column, regardless of what wrote it, making it the correct choice for values (like `created_at`) that must always be correct no matter what inserted the row.\n\n`Mapped[str]` alone (no `mapped_column()` call at all) is valid shorthand SQLAlchemy infers a sensible column purely from the type annotation — useful for the common case, but you still need an explicit `mapped_column(...)` call the moment you need ANY extra configuration (length, uniqueness, index, foreign key, server_default).\n\nStep 1 — Understand the topic.\nTopic: Modern declarative models with Mapped and mapped_column, line by line\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nclass User(Base):\n    __tablename__ = \"users\"\n\n    id: Mapped[int] = mapped_column(\n        primary_key=True\n    )\n    email: Mapped[str] = mapped_column(\n        unique=True\n    )\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nclass User(Base):\n    __tablename__ = \"users\"\n    id: Mapped[int] = mapped_column(\n        primary_key=True\n    )\n```\n\nStep 5 — Example result:\n```text\ntyped ORM model\n```\n\nStep 6 — Complexity / trade-off:\nSQLAlchemy 2.x Mapped/mapped_column gives a typed declarative model.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production `orders` table using `created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)` (Python-side default) discovered that rows inserted directly by a data-migration script (which used raw `INSERT` statements, bypassing the ORM) had `NULL` `created_at` values — switching to `server_default=func.now()` fixed it permanently, since the default then lives in the database schema itself rather than in this one application\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Modern declarative models with Mapped and mapped_column, line by line**.",
    bestPractices: [
      'Use `server_default=func.now()` (not Python-side `default=datetime.utcnow`) for timestamp columns that must be correct regardless of what process performs the insert.',
      'Add explicit type overrides (`String(255)`, `Numeric(12, 2)`) via `mapped_column()` whenever the bare Python type annotation would infer the wrong or an unconstrained SQL type for the actual business requirement.',
      'Use `Mapped[T | None]` (not `Mapped[T]` with a nullable-looking default) to make a column\'s nullability explicit and statically checkable at the type level.',
    ],
    tradeOffs:
      'Python-side `default=` is more flexible (can call arbitrary Python callables, access application state) but only applies when SQLAlchemy itself performs the insert; database-side `server_default=`/`server_onupdate=` is less flexible (limited to SQL expressions the database understands) but is guaranteed correct regardless of the writing process — for anything that must hold as a genuine database-level invariant (not just an application convenience), server-side is the correct choice.',
    commonMistakes: [
      'Using `default=` for a value (like `created_at`) that must be correct even for rows inserted outside this application\'s ORM layer, then being surprised by NULL values from migrations or other services.',
      'Forgetting to override the inferred column type (e.g. leaving a `Mapped[str]` price-like field instead of an explicit `mapped_column(Numeric(12, 2))`), silently getting an unconstrained/incorrect underlying SQL type.',
      'Confusing `Mapped[str | None]` with actually specifying `nullable=True`/`nullable=False` explicitly — while the type annotation does drive nullability by default, mixing both without understanding the interaction can produce mismatched, confusing declarations.',
    ],
    followUpQuestions: [
      'Why would a raw SQL migration script bypass a Python-side `default=` but respect a `server_default=`?',
      'How does `Mapped[str | None]` interact with `mapped_column(nullable=...)` if both are specified — which wins?',
      'When would you need `server_onupdate=` in addition to `server_default=` for an `updated_at` column?',
    ],
    relatedTopics: ['DeclarativeBase', 'Mapped', 'mapped_column', 'server_default', 'Column Types', 'Schema Design'],
  },
  {
    id: 'python-m17-4',
    number: 'PY-M17-4',
    title: 'Relationships — one-to-many, many-to-many, back_populates, and cascade behavior',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Relationships',
    expectedAnswer:
      '`relationship()` links two mapped classes at the PYTHON/ORM level, built on top of an actual `ForeignKey` at the SQL level: one-to-many uses a single FK on the "many" side; many-to-many requires an explicit ASSOCIATION TABLE with two FKs; `back_populates` (explicit, requires declaring the relationship on BOTH sides, keeping them in sync automatically) is the modern recommended alternative to the older, more "magic" `backref` (which auto-creates the reverse side implicitly). `cascade="all, delete-orphan"` controls what happens to CHILD ORM objects when the parent is deleted OR when a child is removed from the parent\'s collection — it is an ORM-level behavior, distinct from (and in addition to) any database-level `ON DELETE` foreign key action.',
    deepExplanation:
      "```python\nfrom sqlalchemy import ForeignKey, Table, Column\nfrom sqlalchemy.orm import Mapped, mapped_column, relationship\n\nclass User(Base):\n    __tablename__ = \"users\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(unique=True)\n\n    # one-to-many: a user has many orders\n    orders: Mapped[list[\"Order\"]] = relationship(back_populates=\"customer\", cascade=\"all, delete-orphan\")\n\nclass Order(Base):\n    __tablename__ = \"orders\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    customer_id: Mapped[int] = mapped_column(ForeignKey(\"users.id\"))\n    total: Mapped[float]\n\n    # many-to-one: the reverse side of User.orders — MUST be declared for back_populates to work\n    customer: Mapped[\"User\"] = relationship(back_populates=\"orders\")\n\n    # one-to-many: an order has many order_items\n    items: Mapped[list[\"OrderItem\"]] = relationship(back_populates=\"order\", cascade=\"all, delete-orphan\")\n\n# many-to-many needs an explicit ASSOCIATION TABLE (or an association-object CLASS for extra columns)\nproduct_tag = Table(\n    \"product_tag\",\n    Base.metadata,\n    Column(\"product_id\", ForeignKey(\"products.id\"), primary_key=True),\n    Column(\"tag_id\", ForeignKey(\"tags.id\"), primary_key=True),\n)\n\nclass Product(Base):\n    __tablename__ = \"products\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str]\n    tags: Mapped[list[\"Tag\"]] = relationship(secondary=product_tag, back_populates=\"products\")\n\nclass Tag(Base):\n    __tablename__ = \"tags\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str] = mapped_column(unique=True)\n    products: Mapped[list[\"Product\"]] = relationship(secondary=product_tag, back_populates=\"tags\")\n```\n\n`back_populates` vs `backref`: `back_populates=\"orders\"` on `Order.customer` explicitly pairs with `back_populates=\"customer\"` on `User.orders` — BOTH sides are declared, and SQLAlchemy keeps them synchronized in memory (appending to `user.orders` automatically sets `order.customer`, and vice versa). `backref=\"orders\"` (legacy style, declared on ONLY one side) auto-generates the reverse attribute implicitly — it works but is considered less explicit/harder to trace in a large codebase, which is why `back_populates` is the modern recommended default.\n\n`cascade=\"all, delete-orphan\"` precisely: `\"all\"` is shorthand enabling several cascade behaviors together (save-update, merge, refresh-expire, expunge, delete); `\"delete-orphan\"` additionally means that removing a child from the parent\\\n\nStep 1 — Understand the topic.\nTopic: Relationships — one-to-many, many-to-many, back_populates, and cascade behavior\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nclass Order(Base):\n    __tablename__ = \"orders\"\n\n    id: Mapped[int] = mapped_column(\n        primary_key=True\n    )\n\n    items: Mapped[list[\"OrderItem\"]] = (\n        relationship(\n            back_populates=\"order\"\n        )\n    )\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\norders = relationship(\n    \"Order\",\n    back_populates=\"items\",\n    cascade=\"all, delete-orphan\",\n)\n```\n\nStep 5 — Example result:\n```text\norder -> items relationship\n```\n\nStep 6 — Complexity / trade-off:\nRelationship loading and cascade behavior should match ownership semantics.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An order-management system uses `cascade=\"all, delete-orphan\"` from `Order` to `OrderItem` (an order item genuinely cannot exist without its order, matching the business domain) but deliberately does NOT cascade-delete from `Order` to `Customer` in the reverse direction — deleting a customer record (a rare, carefully-gated admin operation) does not automatically delete their historical orders, which remain as an audit trail with the FK simply pointing at a (soft-deleted, not hard-deleted) customer record.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Relationships — one-to-many, many-to-many, back_populates, and cascade behavior**.",
    bestPractices: [
      'Prefer `back_populates` over `backref` for new code — declaring both sides explicitly is more traceable/greppable in a large codebase, even though it requires slightly more boilerplate.',
      'Only apply `cascade="all, delete-orphan"` where the child genuinely has NO independent existence without the parent (order items, not orders themselves relative to customers) — apply it deliberately per relationship, not as a blanket default.',
      'For many-to-many relationships that need EXTRA columns on the association itself (e.g. `added_at` on a product-tag link), use an explicit association-object CLASS (a full mapped model for the join table) instead of a bare `Table`, since a plain `secondary=` table cannot carry additional mapped attributes.',
    ],
    tradeOffs:
      'ORM-level cascade (`delete-orphan`) gives you Python-object-level cascading behavior that works even for objects not yet flushed to the database, but requires the ORM to actually load the child objects into the session to cascade correctly — a database-level `ON DELETE CASCADE` foreign key action works even for deletes issued OUTSIDE the ORM (raw SQL, another service) but will not fire for "remove from collection without deleting parent" ORM-level orphaning; a robust production system typically defines BOTH, kept intentionally consistent with each other.',
    commonMistakes: [
      'Declaring a `relationship()` on only one side while trying to use `back_populates` (which requires the SYMMETRIC declaration on both classes), causing a mapper configuration error at application startup.',
      'Applying `cascade="all, delete-orphan"` to a relationship where the child has independent business meaning (e.g. cascading from `Category` to `Product` when products should survive their category being deleted), causing unintended data loss.',
      'Assuming a database-level `ON DELETE CASCADE` and an ORM-level `cascade="all, delete-orphan"` are redundant/interchangeable, when they actually cover different trigger paths (raw SQL deletes vs ORM collection manipulation) and ideally should both be configured consistently.',
    ],
    followUpQuestions: [
      'Why does `back_populates` require declaring the relationship symmetrically on both classes, while `backref` does not?',
      'When would you need an association-object CLASS instead of a plain `secondary=` table for a many-to-many relationship?',
      'How would ORM-level `delete-orphan` cascade interact with a database-level `ON DELETE RESTRICT` foreign key on the same relationship — which would actually win, and in what scenario would each fire?',
    ],
    relatedTopics: ['relationship()', 'ForeignKey', 'back_populates', 'Cascade', 'Many-to-Many', 'Association Table'],
  },
  {
    id: 'python-m17-5',
    number: 'PY-M17-5',
    title: 'Session lifecycle — add, flush, commit, rollback, and the identity map',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Sessions',
    expectedAnswer:
      'A `Session` (or `AsyncSession`) is SQLAlchemy\'s unit-of-work object: it tracks every object you `add()` or load, batches pending changes, and only actually talks to the database on `flush()` (send pending SQL, but stay inside the current transaction) or `commit()` (flush AND end the transaction, making changes permanent). The Session\'s IDENTITY MAP guarantees that loading the same row twice within one session returns the SAME Python object instance, not two separate copies — critical for correctly tracking in-memory mutations.',
    deepExplanation:
      "```python\nasync with async_session_factory() as session:\n    user = User(email=\"ada@example.com\", full_name=\"Ada Lovelace\")\n    session.add(user)            # registers the object as PENDING — no SQL sent yet\n    session.add_all([user2, user3])   # register multiple objects at once\n\n    await session.flush()         # sends the pending INSERT(s) now, still inside the open transaction;\n                                    # user.id is now populated (from the DB-generated identity/sequence)\n\n    await session.refresh(user)   # re-SELECTs the row from the DB, refreshing all attributes\n                                    # (e.g. to pick up a server_default value computed by the database)\n\n    await session.commit()        # flushes any remaining pending changes AND commits the transaction —\n                                    # changes are now permanent and visible to OTHER sessions/connections\n\n    # if anything raised an exception before commit:\n    # await session.rollback()    # discards ALL pending changes in this session, reverting to last commit\n```\n\n`flush()` vs `commit()`, precisely: `flush()` sends pending SQL (INSERT/UPDATE/DELETE) to the database so subsequent queries WITHIN THE SAME transaction can see the effects (e.g. a foreign key needing a just-inserted parent\\\n\nStep 1 — Understand the topic.\nTopic: Session lifecycle — add, flush, commit, rollback, and the identity map\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nuser = User(email=\"ada@example.com\")\nsession.add(user)\nsession.flush()\n\nprint(user.id)\n\nsession.commit()\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nwith Session(engine) as session:\n    session.add(User(email=\"ada@example.com\"))\n    session.commit()\n```\n\nStep 5 — Example result:\n```text\nrow persisted\n```\n\nStep 6 — Complexity / trade-off:\nFlush sends SQL; commit finalizes the transaction; rollback restores consistency.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A checkout flow that needs the newly-created order\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Session lifecycle — add, flush, commit, rollback, and the identity map**.",
    bestPractices: [
      'Let autoflush handle the common case; call `flush()` explicitly only when you need a generated value (PK, server_default) before continuing further work in the SAME transaction.',
      'Scope one Session per logical unit of work (typically one HTTP request in a FastAPI app, via a `Depends`-injected session) — never share one Session instance across concurrent requests/tasks.',
      'Always wrap multi-step mutations in a single Session/transaction so a failure partway through triggers one clean `rollback()` rather than leaving partial changes committed.',
    ],
    tradeOffs:
      'Relying on autoflush is convenient (correct-by-default reads of your own pending writes) but means a query can trigger an implicit flush (and therefore SQL execution + possible constraint errors) at a point in your code that did not obviously look like a database call — for latency-critical or error-handling-sensitive code paths, an explicit `flush()` at a deliberate point makes the SQL execution timing visible and intentional instead of implicit.',
    commonMistakes: [
      'Confusing `flush()` with `commit()` and assuming flushed-but-not-committed changes are already durable/visible to other sessions or connections.',
      'Sharing a single `AsyncSession` instance across multiple concurrent `asyncio` tasks/requests, corrupting its internal state — a Session is NOT safe for concurrent use from multiple coroutines simultaneously.',
      'Forgetting to `rollback()` (or exit the `async with` block, which does it automatically) after an exception, leaving the session\'s transaction in a failed/unusable state for any subsequent operation on it.',
    ],
    followUpQuestions: [
      'Why is a Session not safe to share across concurrent asyncio tasks, even though Python asyncio is single-threaded?',
      'What specifically triggers an autoflush, and can you give an example where autoflush timing would surprise someone unfamiliar with it?',
      'How does the identity map behave across two different Session instances querying the same row — do they see the same object?',
    ],
    relatedTopics: ['Session', 'AsyncSession', 'flush vs commit', 'Identity Map', 'Autoflush', 'Unit of Work'],
  },
  {
    id: 'python-m17-6',
    number: 'PY-M17-6',
    title: 'Modern select() queries — where, join, group_by, and scalars() vs execute()',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'SQLAlchemy 2.x Queries',
    expectedAnswer:
      'SQLAlchemy 2.x uses a single unified `select()` construct (replacing the legacy `session.query()` API) for both Core and ORM queries — you build a `Select` object with `.where()`, `.order_by()`, `.join()`, `.group_by()`, `.having()`, `.limit()`/`.offset()`, then execute it via `await session.execute(stmt)`. The RESULT object exposes rows; `.scalars()` unwraps each row down to just its single mapped-entity column (the common case when selecting one whole ORM class), while plain `.execute()` without `.scalars()` gives you full `Row` tuples (needed when selecting multiple columns/entities at once).',
    deepExplanation:
      "```python\nfrom sqlalchemy import select, func\n\n# select a full ORM entity — .scalars() unwraps Row(User,) -> User directly\nstmt = select(User).where(User.email.ilike(\"%@example.com\")).order_by(User.id).limit(20)\nresult = await session.execute(stmt)\nusers: list[User] = result.scalars().all()          # list[User], not list[Row]\n\n# select a SINGLE scalar value\ncount_stmt = select(func.count()).select_from(User)\ntotal = (await session.execute(count_stmt)).scalar_one()   # int directly\n\n# select MULTIPLE columns/expressions — do NOT use .scalars() here, you want the full Row tuples\nstmt = (\n    select(User.id, User.email, func.count(Order.id).label(\"order_count\"))\n    .join(Order, Order.customer_id == User.id, isouter=True)   # LEFT JOIN — keep users with zero orders\n    .group_by(User.id, User.email)\n    .having(func.count(Order.id) > 0)\n    .order_by(func.count(Order.id).desc())\n)\nresult = await session.execute(stmt)\nfor row in result:            # each `row` is a Row: row.id, row.email, row.order_count\n    print(row.id, row.email, row.order_count)\n\n# common shortcuts\nuser = (await session.execute(select(User).where(User.id == 1))).scalar_one_or_none()  # User | None\nfirst_match = (await session.execute(select(User).limit(1))).scalars().first()          # User | None, no error if 0 rows\n```\n\nExpected result shape example — the LEFT JOIN + GROUP BY + HAVING query above, given users Ada (2 orders), Grace (0 orders), Alan (5 orders):\n\n```text\nid | email               | order_count\n---+---------------------+------------\n2  | alan@example.com    | 5\n1  | ada@example.com     | 2\n-- Grace is excluded: HAVING count(Order.id) > 0 filters her out (she has 0 orders)\n```\n\n`.scalars()` vs plain `.execute()`, the rule of thumb: if your `select()` targets exactly ONE mapped entity/column (`select(User)`, `select(User.email)`), use `.scalars()` to get clean Python values/objects directly instead of one-tuple `Row` wrappers. If you select MULTIPLE things (`select(User.id, User.email, ...)`), do NOT use `.scalars()` — you want the `Row` objects, which support both attribute access (`row.email`) and tuple unpacking.\n\n`scalar_one()` raises if there is not EXACTLY one row (useful for a `COUNT` or a lookup you are certain must exist); `scalar_one_or_none()` returns `None` instead of raising if there are zero rows (raises only if there is more than one — the correct choice for \"get by unique key, might not exist\"); `.first()` returns `None` on zero rows and silently takes just the first on multiple, with no error either way — useful when you deliberately only care about one arbitrary/ordered match.\n\nStep 1 — Understand the topic.\nTopic: Modern select() queries — where, join, group_by, and scalars() vs execute()\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nstmt = (\n    select(User)\n    .where(User.active.is_(True))\n)\n\nresult = session.execute(stmt)\nusers = result.scalars().all()\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nusers = session.scalars(\n    select(User).where(\n        User.active.is_(True)\n    )\n).all()\n```\n\nStep 5 — Example result:\n```text\ntyped User objects\n```\n\nStep 6 — Complexity / trade-off:\nUse scalars() when you want ORM entities rather than Row tuples.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A \"top customers by order count\" admin report endpoint uses exactly the LEFT JOIN + GROUP BY + HAVING + multi-column select shown above, executed via plain `session.execute(stmt)` (not `.scalars()`, since it selects multiple columns) and iterated as `Row` objects to build the JSON response — a direct, unmodified production pattern for any aggregated multi-entity report.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Modern select() queries — where, join, group_by, and scalars() vs execute()**.",
    bestPractices: [
      'Use `select()` (SQLAlchemy 2.x style) exclusively — never the legacy `session.query(...)` API in new code, which is considered legacy style even though still supported.',
      'Reach for `.scalars()` when selecting a single entity/column, and plain `Row`-based `.execute()` iteration when selecting multiple columns/expressions together.',
      'Choose `scalar_one_or_none()` over `scalar_one()` for any lookup where "not found" is an expected, valid outcome rather than a bug — let the exception-raising variant signal a genuine invariant violation.',
    ],
    tradeOffs:
      'Building queries with the unified `select()` construct (usable for both Core and ORM) is more verbose per-call than the older `session.query(Model).filter(...)` shorthand, but it composes far more predictably with Core-level constructs (subqueries, CTEs, window functions) and is the actively maintained, forward-compatible SQLAlchemy 2.x style — the verbosity is a deliberate, worthwhile tradeoff for consistency and long-term maintainability.',
    commonMistakes: [
      'Calling `.scalars()` on a multi-column `select()` result and getting only the FIRST column\'s values back, silently dropping the rest.',
      'Using `scalar_one()` for a lookup where "not found" is an expected possibility, causing an unhandled exception instead of a clean `None`/404 code path.',
      'Forgetting `isouter=True` on a `.join()` when the query needs a LEFT JOIN (e.g. "users including those with zero orders"), silently turning it into an INNER JOIN that excludes exactly the rows the query was meant to include.',
    ],
    followUpQuestions: [
      'Why does SQLAlchemy 2.x deprecate the legacy `session.query()` API in favor of a single unified `select()` construct?',
      'What is the practical difference between `.first()`, `.scalar_one()`, and `.scalar_one_or_none()`, and when would using the wrong one cause a bug rather than just a style issue?',
      'How would you add a window function (e.g. `ROW_NUMBER() OVER (...)`) to a modern `select()` query?',
    ],
    relatedTopics: ['select()', 'scalars()', 'JOIN', 'GROUP BY', 'HAVING', 'SQLAlchemy 2.x'],
  },
  {
    id: 'python-m17-7',
    number: 'PY-M17-7',
    title: 'Coding: a UserRepository with create/get/update/delete/list/search/paginate',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Repository Pattern',
    expectedAnswer:
      'A repository wraps all SQLAlchemy access for ONE entity behind a small, focused interface (`create`, `get_by_id`, `update`, `delete`, `list` with search/filter/sort/pagination) — this is what lets services (and, in tests, mocks) depend on a stable contract instead of scattering raw `select()`/session calls throughout business logic.',
    deepExplanation:
      "```python\nfrom sqlalchemy import select, func\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\nclass UserRepository:\n    def __init__(self, session: AsyncSession):\n        self._session = session\n\n    async def create(self, *, email: str, full_name: str) -> User:\n        user = User(email=email, full_name=full_name)\n        self._session.add(user)\n        await self._session.flush()      # populate user.id without committing yet — service layer decides commit\n        return user\n\n    async def get_by_id(self, user_id: int) -> User | None:\n        return await self._session.get(User, user_id)   # identity-map-aware PK lookup, no explicit select() needed\n\n    async def update(self, user_id: int, **fields) -> User | None:\n        user = await self.get_by_id(user_id)\n        if user is None:\n            return None\n        for key, value in fields.items():\n            setattr(user, key, value)     # mutate the tracked ORM object — autoflush handles the UPDATE\n        return user\n\n    async def delete(self, user_id: int) -> bool:\n        user = await self.get_by_id(user_id)\n        if user is None:\n            return False\n        await self._session.delete(user)\n        return True\n\n    async def list(\n        self,\n        *,\n        search: str | None = None,\n        status: str | None = None,\n        cursor: tuple[str, int] | None = None,\n        limit: int = 20,\n    ) -> list[User]:\n        stmt = select(User)\n        if status:\n            stmt = stmt.where(User.status == status)\n        if search:\n            stmt = stmt.where(User.full_name.ilike(f\"%{search}%\") | User.email.ilike(f\"%{search}%\"))\n        if cursor:\n            created_at, last_id = cursor\n            stmt = stmt.where((User.created_at, User.id) < (created_at, last_id))\n        stmt = stmt.order_by(User.created_at.desc(), User.id.desc()).limit(limit)\n        return list((await self._session.execute(stmt)).scalars().all())\n\n    async def count(self, *, status: str | None = None) -> int:\n        stmt = select(func.count()).select_from(User)\n        if status:\n            stmt = stmt.where(User.status == status)\n        return (await self._session.execute(stmt)).scalar_one()\n```\n\nNote the DELIBERATE design choice: `create()`/`update()`/`delete()` call `flush()` but never `commit()` — commit boundaries belong to the SERVICE layer (or a request-scoped `Depends` in FastAPI), since a service may need to coordinate MULTIPLE repository calls (e.g. create an order AND update inventory) as one atomic transaction. If the repository itself committed, that atomicity guarantee would be impossible to compose.\n\nStep 1 — Understand the topic.\nTopic: Coding: a UserRepository with create/get/update/delete/list/search/paginate\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A FastAPI `PATCH /users/{id}` endpoint calls `user_service.update_user(id, **payload.model_dump(exclude_unset=True))`, which internally calls `UserRepository.update(...)` then the FastAPI session dependency commits once at the end of the request (on successful response) — this exact repository shape, reused identically for `ProductRepository`/`OrderRepository`, is the standard data-access layer of a production FastAPI + SQLAlchemy application.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: a UserRepository with create/get/update/delete/list/search/paginate**.",
    bestPractices: [
      'Keep commit/rollback decisions in the service layer or the request-scoped session dependency — never call `session.commit()` inside a repository method, so multiple repository calls can be composed into one atomic transaction.',
      'Return `None`/`False` (not raise) from repository lookups/deletes on "not found" — let the SERVICE layer decide whether that is a 404, a no-op, or something else, keeping the repository free of HTTP-specific concerns.',
      'Use `session.get(Model, pk)` for primary-key lookups (identity-map-aware, and SQLAlchemy may skip the round trip entirely if already loaded) rather than `select(Model).where(Model.id == pk)`.',
    ],
    tradeOffs:
      'Keeping the repository commit-free (deferring to the caller) gives correct composability for multi-repository atomic transactions, at the cost of every repository method needing to be used carefully within an active session/transaction context rather than being usable as a fully self-contained "fire and forget" call — this is a deliberate, standard tradeoff in layered architectures, not an oversight.',
    commonMistakes: [
      'Calling `session.commit()` inside individual repository methods, making it impossible to compose several repository calls into one atomic multi-step transaction from the service layer.',
      'Using `select(Model).where(Model.id == pk)` instead of `session.get(Model, pk)` for simple primary-key lookups, missing the identity-map short-circuit and writing more verbose code for no benefit.',
      'Letting search input flow into an f-string ILIKE pattern without using SQLAlchemy\'s parameterized `.ilike()` (which safely binds the parameter) — always build the pattern as shown, never via raw string-formatted SQL.',
    ],
    followUpQuestions: [
      'Why should commit/rollback decisions live outside the repository rather than inside each method?',
      'How would you add a `search_count` method that returns the total matching row count for a search, to support "showing 1-20 of 143 results" UI text alongside keyset pagination (which cannot directly answer "how many total")?',
      'How would you unit test this repository without hitting a real PostgreSQL database?',
    ],
    relatedTopics: ['Repository Pattern', 'CRUD', 'session.get()', 'Pagination', 'Search', 'Service Layer'],
  },
  {
    id: 'python-m17-8',
    number: 'PY-M17-8',
    title: 'Coding: a full FastAPI + SQLAlchemy layered example — router, service, repository, session',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI + SQLAlchemy',
    expectedAnswer:
      'A production request flow wires together: a `Depends`-injected, request-scoped `AsyncSession` -> a service constructed with that session -> a repository constructed by the service -> the ORM/PostgreSQL — with the router staying entirely HTTP-shaped (Pydantic schemas in/out) and never touching SQLAlchemy directly.',
    deepExplanation:
      "```python\n# database.py\nfrom sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine\n\nengine = create_async_engine(\"postgresql+asyncpg://app_user:secret@db:5432/app\", pool_size=10)\nasync_session_factory = async_sessionmaker(engine, expire_on_commit=False)\n\nasync def get_db() -> AsyncGenerator[AsyncSession, None]:\n    async with async_session_factory() as session:\n        try:\n            yield session\n            await session.commit()      # commit once, at the END of a successful request\n        except Exception:\n            await session.rollback()\n            raise\n\n# schemas.py\nfrom pydantic import BaseModel, EmailStr\n\nclass UserCreate(BaseModel):\n    email: EmailStr\n    full_name: str\n\nclass UserResponse(BaseModel):\n    id: int\n    email: str\n    full_name: str\n    model_config = {\"from_attributes\": True}   # allows UserResponse.model_validate(orm_user_object)\n\n# service.py\nclass UserService:\n    def __init__(self, session: AsyncSession):\n        self._repo = UserRepository(session)\n\n    async def register_user(self, data: UserCreate) -> User:\n        existing = await self._repo.list(search=data.email, limit=1)\n        if existing:\n            raise ValueError(\"Email already registered\")\n        return await self._repo.create(email=data.email, full_name=data.full_name)\n\n    async def get_user(self, user_id: int) -> User | None:\n        return await self._repo.get_by_id(user_id)\n\n# routers/users.py\nfrom fastapi import APIRouter, Depends, HTTPException, status\n\nrouter = APIRouter(prefix=\"/api/v1/users\", tags=[\"Users\"])\n\ndef get_user_service(session: AsyncSession = Depends(get_db)) -> UserService:\n    return UserService(session)\n\n@router.post(\"/\", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\nasync def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)):\n    try:\n        user = await service.register_user(payload)\n    except ValueError as exc:\n        raise HTTPException(status.HTTP_409_CONFLICT, detail=str(exc))\n    return user   # response_model + from_attributes serializes the ORM object directly\n\n@router.get(\"/{user_id}\", response_model=UserResponse)\nasync def get_user(user_id: int, service: UserService = Depends(get_user_service)):\n    user = await service.get_user(user_id)\n    if user is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=\"User not found\")\n    return user\n```\n\nThe request-scoped `get_db()` dependency committing exactly ONCE, at the very end of a successful request (not inside the repository, not inside the service) is the key architectural decision that makes the whole request one atomic transaction by default — any exception anywhere in the router/service/repository chain propagates up, is caught by `get_db()`\\\n\nStep 1 — Understand the topic.\nTopic: Coding: a full FastAPI + SQLAlchemy layered example — router, service, repository, session\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact `get_db` -> Service -> Repository wiring, with `response_model` + `from_attributes` for ORM-to-Pydantic serialization, is the standard skeleton of nearly every production FastAPI + SQLAlchemy service — the only things that change between endpoints/entities are the specific schemas, service business rules, and repository queries.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: a full FastAPI + SQLAlchemy layered example — router, service, repository, session**.",
    bestPractices: [
      'Commit exactly once, in the session dependency itself, at the end of a successful request — this makes the whole request atomic by construction, without every endpoint needing to remember to commit.',
      'Use `model_config = {"from_attributes": True}` on response schemas so FastAPI can serialize ORM objects directly via `response_model`, without a manual `.model_dump()`/dict-building step in every endpoint.',
      'Keep exception-to-HTTP-status translation (`ValueError` -> 409, `None` -> 404) in the ROUTER, not the service — the service should raise/return domain-shaped signals, agnostic of HTTP.',
    ],
    tradeOffs:
      'Committing once per request (rather than per repository call) gives simple, correct request-level atomicity by default, but means a single request can only ever be "all or nothing" — a workflow genuinely needing PARTIAL success/failure within one HTTP request (rare, but real for some batch-import endpoints) would need explicit `session.begin_nested()` savepoints around the parts that should be independently recoverable.',
    commonMistakes: [
      'Committing inside the service or repository layer as well as in `get_db()`, causing confusing double-commit behavior or committing partial work before an error later in the same request can roll it back.',
      'Letting the router import and touch `AsyncSession`/SQLAlchemy constructs directly instead of going through the service, collapsing the layering this architecture is meant to provide.',
      'Forgetting `model_config = {"from_attributes": True}` on response schemas, then either manually converting ORM objects to dicts in every endpoint or getting a serialization error.',
    ],
    followUpQuestions: [
      'What would you change if ONE endpoint genuinely needed multiple independent, partially-recoverable steps within a single request (hint: savepoints via `session.begin_nested()`)?',
      'How would `get_db()` need to change to support a read-only endpoint that should never commit anything, for a small performance/clarity gain?',
      'How would you unit test the `UserService` without needing a real database connection?',
    ],
    relatedTopics: ['FastAPI', 'Dependency Injection', 'Service Layer', 'Repository Pattern', 'response_model', 'Transactions'],
  },
  {
    id: 'python-m17-9',
    number: 'PY-M17-9',
    title: 'AsyncSession, async_sessionmaker, and common async SQLAlchemy mistakes',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Async SQLAlchemy',
    expectedAnswer:
      '`AsyncSession` is the async counterpart of `Session`, requiring `await` on every I/O-performing call (`execute`, `commit`, `flush`, `refresh`, `delete` when it needs to check state); `async_sessionmaker(engine)` is a factory that produces new `AsyncSession` instances bound to a given `AsyncEngine`. The most common async SQLAlchemy mistakes all stem from treating it like sync SQLAlchemy: forgetting `await`, mixing a sync engine/driver with async code, or sharing one session across concurrent tasks.',
    deepExplanation:
      "```python\nfrom sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession\n\n# CORRECT: an async driver (asyncpg) with create_async_engine\nengine = create_async_engine(\"postgresql+asyncpg://user:pass@host/db\")\nasync_session_factory = async_sessionmaker(engine, expire_on_commit=False)\n\nasync def example():\n    async with async_session_factory() as session:   # AsyncSession as an async context manager\n        result = await session.execute(select(User))  # MUST await — this performs real I/O\n        users = result.scalars().all()                  # .scalars()/.all() are NOT awaited — they operate\n                                                            # on the already-fetched Result object in memory\n        await session.commit()\n\n# WRONG #1 — mixing a SYNC driver string with create_async_engine (or vice versa)\n# create_async_engine(\"postgresql://...\")  # missing +asyncpg -> fails immediately, wrong driver\n\n# WRONG #2 — forgetting await on an I/O call\n# result = session.execute(select(User))   # returns a coroutine object, NEVER actually runs the query!\n\n# WRONG #3 — sharing ONE session across concurrent tasks (a real, common, subtle bug)\nasync def broken_concurrent_fetch(session: AsyncSession):\n    user_task = session.execute(select(User).where(User.id == 1))\n    order_task = session.execute(select(Order).where(Order.customer_id == 1))\n    # gathering these concurrently on the SAME session corrupts its internal state —\n    # AsyncSession (like sync Session) is NOT safe for concurrent use from multiple coroutines\n    users, orders = await asyncio.gather(user_task, order_task)   # BUG: undefined/corrupted behavior\n\nasync def correct_concurrent_fetch(session_factory):\n    async def fetch_users():\n        async with session_factory() as s:\n            return (await s.execute(select(User).where(User.id == 1))).scalars().all()\n    async def fetch_orders():\n        async with session_factory() as s:\n            return (await s.execute(select(Order).where(Order.customer_id == 1))).scalars().all()\n    # each coroutine gets its OWN session from the factory — safe to run concurrently\n    users, orders = await asyncio.gather(fetch_users(), fetch_orders())\n```\n\nWhy forgetting `await` is an especially sneaky bug: `session.execute(stmt)` returns a coroutine object immediately without error — Python does not raise until (if ever) you try to use the un-awaited coroutine, and a linter/type-checker warning is your only real defense; the query silently NEVER RUNS, which can manifest as bizarre \"why is this data missing\" bugs far from the actual mistake.\n\n`expire_on_commit=False` on the `async_sessionmaker` is a very common, important production setting: by default, after `commit()`, SQLAlchemy EXPIRES all objects in the session (marks their attributes stale, forcing a re-SELECT on next access) — in an ASYNC context, that re-SELECT-on-attribute-access cannot happen implicitly (attribute access is synchronous, but the reload would need to be async), so accessing an expired object\\\n\nStep 1 — Understand the topic.\nTopic: AsyncSession, async_sessionmaker, and common async SQLAlchemy mistakes\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A service that fanned out several independent lookups via `asyncio.gather()` all sharing one injected `AsyncSession` (reused from the FastAPI request dependency) intermittently produced corrupted/incorrect query results under load — the fix was giving each concurrent lookup its OWN session from the session factory (or simply not parallelizing DB calls within one request, since one session cannot truly do concurrent I/O anyway) rather than fanning out on a single shared session.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **AsyncSession, async_sessionmaker, and common async SQLAlchemy mistakes**.",
    bestPractices: [
      'Set `expire_on_commit=False` on `async_sessionmaker` for FastAPI request-scoped sessions, so ORM objects remain safely readable after commit for building the HTTP response.',
      'Never share one `AsyncSession` across concurrently-running coroutines/tasks — give each concurrent unit of work its own session from the factory, or simply do not parallelize database I/O within a single session\'s scope.',
      'Enable strict linting/type-checking (or at minimum careful code review) specifically around every `session.execute(...)`/`.commit()`/`.flush()` call to catch a missing `await`, since it fails silently rather than raising.',
    ],
    tradeOffs:
      'Giving every concurrent unit of work its own session (to enable true concurrent database I/O) uses more connections from the pool simultaneously versus doing DB calls sequentially on one shared session — for most request-scoped work the sequential-on-one-session pattern is simpler and sufficient (a single request rarely benefits meaningfully from parallel DB queries anyway, since they all hit the same database), while genuinely independent background/batch work benefits more from the multi-session concurrent approach.',
    commonMistakes: [
      'Forgetting `await` before `session.execute(...)`/`.commit()`/`.flush()`, silently producing an unused coroutine object and a query that never actually runs.',
      'Sharing one `AsyncSession` across concurrent `asyncio.gather()` tasks, corrupting its internal state in ways that can be intermittent and hard to reproduce.',
      'Leaving `expire_on_commit` at its default (`True`) in an async FastAPI session factory, then hitting confusing errors when accessing an ORM object\'s attributes after `commit()` inside the same request.',
    ],
    followUpQuestions: [
      'Why does a missing `await` on `session.execute(...)` not raise an immediate, obvious error?',
      'Why is `AsyncSession` unsafe for concurrent use even though Python\'s asyncio event loop is fundamentally single-threaded?',
      'What does `expire_on_commit=False` actually trade away, and when might you WANT the default expiring behavior instead?',
    ],
    relatedTopics: ['AsyncSession', 'async_sessionmaker', 'asyncio.gather', 'expire_on_commit', 'Async Mistakes'],
  },
  {
    id: 'python-m17-10',
    number: 'PY-M17-10',
    title: 'The N+1 query problem, and fixing it with selectinload vs joinedload',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'N+1 Problem',
    expectedAnswer:
      'The N+1 problem happens when code loads N parent rows with one query, then LAZILY triggers a SEPARATE query per parent to load each one\'s related child rows — 1 query for 100 users plus 100 additional queries for each user\'s orders equals 101 total queries instead of 1 or 2. `selectinload()` fixes it with a SECOND, single `WHERE parent_id IN (...)` query covering ALL parents at once (2 queries total, no matter how many parents); `joinedload()` fixes it with ONE query using a LEFT JOIN to fetch parents and children together (1 query, but the parent\'s columns are duplicated once per child row in the result set).',
    deepExplanation:
      "```python\n# THE BUG — N+1 queries\nusers = (await session.execute(select(User).limit(100))).scalars().all()   # query #1: 100 users\nfor user in users:\n    print(user.orders)   # LAZY LOAD: each access triggers its OWN separate query — 100 MORE queries!\n# total: 1 + 100 = 101 queries for what should be a simple report\n\n# FIX #1 — selectinload: 2 queries total, regardless of how many users\nfrom sqlalchemy.orm import selectinload\n\nstmt = select(User).options(selectinload(User.orders)).limit(100)\nusers = (await session.execute(stmt)).scalars().all()\n# query #1: SELECT * FROM users LIMIT 100\n# query #2: SELECT * FROM orders WHERE customer_id IN (1, 2, 3, ..., 100)  -- ONE query for ALL users\\\n\nStep 1 — Understand the topic.\nTopic: The N+1 query problem, and fixing it with selectinload vs joinedload\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nstmt = select(Order).options(\n    selectinload(Order.items)\n)\n\norders = session.scalars(stmt).all()\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nstmt = select(Order).options(\n    joinedload(Order.customer)\n)\n```\n\nStep 5 — Example result:\n```text\nrelated data loaded intentionally\n```\n\nStep 6 — Complexity / trade-off:\nChoose loading strategy from cardinality/query shape and inspect SQL rather than guessing.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An admin dashboard listing \"100 recent orders with their customer and line items\" originally took 3-4 seconds due to N+1 queries (1 for orders, 100 for each order\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **The N+1 query problem, and fixing it with selectinload vs joinedload**.",
    bestPractices: [
      'Default to `selectinload()` for one-to-many/many-to-many relationships, especially when combined with `LIMIT`/pagination on the parent query — it composes safely and avoids row-count inflation.',
      'Reserve `joinedload()` for many-to-one/one-to-one relationships (where there is no row-multiplication risk) or small, bounded one-to-many relationships where a single round trip is worth the duplicated columns.',
      'Enable `lazy="raise"` on relationships in async models (or simply always eager-load explicitly) so an accidental lazy-load attempt fails LOUDLY at development time instead of silently causing an N+1 (or, in pure async, an actual runtime error, since implicit lazy loading does not work correctly with AsyncSession at all without `AsyncAttrs`/explicit awaiting).',
    ],
    tradeOffs:
      '`selectinload` trades one extra round trip (2 queries instead of 1) for a result set with NO row multiplication and safe composition with LIMIT — for most one-to-many cases at any real scale, that extra round trip is a negligible cost compared to either the N+1 disaster or joinedload\'s row-inflation/LIMIT risk, which is why it is the generally recommended default over `joinedload` for one-to-many relationships specifically.',
    commonMistakes: [
      'Accessing a lazily-loaded relationship attribute inside a loop over many parent objects, silently causing N+1 queries that only become visible under load/at scale, not in quick manual testing with a handful of rows.',
      'Using `joinedload()` on a one-to-many relationship together with `LIMIT` on the parent query, silently truncating the wrong thing (limiting joined ROWS, not distinct parents) and returning fewer parents than expected.',
      'Forgetting `.unique()` on a `joinedload()` result for a one-to-many relationship, ending up with duplicate parent entries in the returned list.',
    ],
    followUpQuestions: [
      'Why does `joinedload()` combined with `LIMIT` on the parent query risk returning fewer distinct parents than requested?',
      'How would you detect N+1 queries in an existing codebase before they cause a production incident (hint: SQL query-count assertions in tests, or APM/query logging in staging)?',
      'What is `lazy="raise"`, and why is it a good default for models used primarily in an async codebase?',
    ],
    relatedTopics: ['N+1 Problem', 'selectinload', 'joinedload', 'Eager Loading', 'Performance', 'Relationships'],
  },
  {
    id: 'python-m17-11',
    number: 'PY-M17-11',
    title: 'Loading strategies in full — lazy, joined, selectin, and explicit loading',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Loading Strategies',
    expectedAnswer:
      'SQLAlchemy supports four relationship loading strategies: LAZY (the default — loads on first attribute access, via a separate query; problematic/unsupported in a pure async context without extra handling), JOINED (one query via LEFT/INNER JOIN), SELECTIN (two queries, second one batched via `IN (...)`), and EXPLICIT (you write a completely separate, manual query yourself, with full control). Choosing the right one per relationship, per query, based on cardinality and access pattern is a core SQLAlchemy performance skill.',
    deepExplanation:
      "```python\nfrom sqlalchemy.orm import relationship, selectinload, joinedload, lazyload\n\nclass User(Base):\n    __tablename__ = \"users\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    # DEFAULT strategy set on the relationship itself (can be overridden per-query with .options())\n    orders: Mapped[list[\"Order\"]] = relationship(back_populates=\"customer\", lazy=\"raise\")\n    # lazy=\"raise\" -> accessing user.orders WITHOUT having explicitly eager-loaded it raises an error\n    # immediately at development time, rather than silently causing lazy-load/async issues in production\n\n# per-query override of the default strategy\nstmt = select(User).options(selectinload(User.orders))            # SELECTIN for this query only\nstmt2 = select(User).options(joinedload(User.orders))               # JOINED for this query only\nstmt3 = select(User).options(lazyload(User.orders))                  # explicit LAZY for this query only\n\n# EXPLICIT loading: no relationship configured/traversed at all — just two independent, manual queries\nusers = (await session.execute(select(User).limit(20))).scalars().all()\nuser_ids = [u.id for u in users]\norders_by_user: dict[int, list[Order]] = {}\norders = (await session.execute(select(Order).where(Order.customer_id.in_(user_ids)))).scalars().all()\nfor order in orders:\n    orders_by_user.setdefault(order.customer_id, []).append(order)\n# functionally very similar to what selectinload does automatically, but you control the exact\n# query shape, filtering, and result assembly yourself\n```\n\nDecision guide by relationship shape and access pattern:\n\n```text\nStrategy    Queries   Row inflation?   Best for\n---------   -------   --------------   --------\nLAZY        1 + N     no               rarely appropriate in async; fine in a sync script/REPL/one-off\nJOINED      1         yes (1-to-many)  many-to-one / one-to-one, or small bounded 1-to-many, no LIMIT concerns\nSELECTIN    2         no               one-to-many / many-to-many, especially combined with LIMIT/pagination\nEXPLICIT    2 (manual) no              when you need custom filtering/shaping the built-in strategies cannot express\n```\n\nWhy plain LAZY loading is specifically problematic in an ASYNC codebase: a lazy load, when triggered, needs to execute a NEW query — but that requires an `await`, and simple Python attribute access (`user.orders`) is inherently SYNCHRONOUS, so SQLAlchemy cannot silently perform async I/O inside a plain attribute getter. By default this raises a `MissingGreenlet`-style error in an async context, which is precisely why setting `lazy=\"raise\"` (making the failure explicit and immediate, rather than a confusing runtime error) or always eager-loading explicitly is the standard async SQLAlchemy practice.\n\nStep 1 — Understand the topic.\nTopic: Loading strategies in full — lazy, joined, selectin, and explicit loading\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A codebase migrating from sync SQLAlchemy/Flask to async SQLAlchemy/FastAPI set `lazy=\"raise\"` on every relationship as part of the migration specifically to surface every place the old code relied on implicit lazy loading — each resulting error pointed at exactly one call site that needed an explicit `selectinload()`/`joinedload()` added, turning what would have been a set of confusing runtime failures in production into a clean, exhaustive compile-time-adjacent checklist during the migration itself.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Loading strategies in full — lazy, joined, selectin, and explicit loading**.",
    bestPractices: [
      'Set `lazy="raise"` as the model-level default for relationships in an async codebase, forcing every access path to explicitly declare its loading strategy per query.',
      'Choose SELECTIN as the default explicit strategy for one-to-many/many-to-many, reserving JOINED for many-to-one/one-to-one or small, LIMIT-free one-to-many cases.',
      'Reach for EXPLICIT (fully manual, separate queries) when you need custom filtering on the related rows themselves (e.g. "only the user\'s last 5 orders") that the built-in eager-loading options cannot directly express.',
    ],
    tradeOffs:
      'Setting `lazy="raise"` model-wide is a strict, "fail loudly and early" default that requires every query touching a relationship to be explicit about its loading strategy — more upfront discipline per query, in exchange for eliminating an entire class of silent N+1/async-incompatibility bugs that would otherwise only surface under real production load or in a genuinely async call path.',
    commonMistakes: [
      'Leaving relationships at the SQLAlchemy default (implicit LAZY) in an async codebase and being surprised by `MissingGreenlet`-style errors the first time a relationship is accessed outside of an eager-loaded query.',
      'Using JOINED loading for a one-to-many relationship where the "many" side can be large, causing a much bigger result set (and network transfer) than necessary compared to SELECTIN.',
      'Reimplementing what SELECTIN already does for free via a manual EXPLICIT query, when no custom filtering is actually needed — unnecessary code for no benefit.',
    ],
    followUpQuestions: [
      'Why does plain lazy loading fundamentally not work correctly in a pure async SQLAlchemy context without extra support?',
      'When would EXPLICIT loading genuinely be necessary instead of any of the three built-in strategies?',
      'How would you eager-load a relationship of a relationship (e.g. `Order.items.product`) in one query?',
    ],
    relatedTopics: ['Loading Strategies', 'lazy="raise"', 'selectinload', 'joinedload', 'Explicit Loading', 'Async SQLAlchemy'],
  },
  {
    id: 'python-m17-12',
    number: 'PY-M17-12',
    title: 'Coding: an atomic multi-step transaction — order, order items, inventory, and payment',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Transactions',
    expectedAnswer:
      'A checkout flow (create order -> create order items -> decrement inventory -> create payment record) must be ATOMIC: if any step fails (e.g. insufficient inventory), EVERY earlier step in the same request must be undone via `rollback()`, never left partially applied. In SQLAlchemy this falls out naturally from keeping the whole sequence inside ONE session\'s transaction and only committing once, at the very end, after every step has succeeded.',
    deepExplanation:
      "```python\nclass InsufficientInventoryError(Exception):\n    pass\n\nclass CheckoutService:\n    def __init__(self, session: AsyncSession):\n        self._session = session\n\n    async def checkout(self, customer_id: int, items: list[tuple[int, int]]) -> Order:\n        # items: list of (product_id, quantity)\n        order = Order(customer_id=customer_id, total=0, status=\"pending\")\n        self._session.add(order)\n        await self._session.flush()   # populate order.id for the order_items\\\n\nStep 1 — Understand the topic.\nTopic: Coding: an atomic multi-step transaction — order, order items, inventory, and payment\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce checkout endpoint uses exactly this pattern — `with_for_update()` row locking plus a single commit at the end of the request — to guarantee that a flash-sale item with exactly 1 unit of stock can never be sold to two different concurrent customers, even under a traffic spike where hundreds of checkout requests arrive within the same second.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: an atomic multi-step transaction — order, order items, inventory, and payment**.",
    bestPractices: [
      'Perform the entire multi-step business operation within ONE session/transaction, committing exactly once at the end, so a failure at any step rolls back everything automatically.',
      'Use `with_for_update()` (pessimistic locking) specifically for inventory/balance-style "check then decrement" operations under real concurrency risk — a plain read-then-write without locking is a race condition.',
      'Raise a specific, catchable domain exception (`InsufficientInventoryError`) rather than letting a generic exception propagate, so the router layer can map it to the correct HTTP status (409, not 500).',
    ],
    tradeOffs:
      '`with_for_update()` guarantees correctness under concurrency but makes concurrent checkouts of the SAME product serialize (wait on each other) rather than run in parallel — for a normal-traffic product this cost is negligible, but for a genuinely hot, high-concurrency flash-sale item, this row lock becomes a deliberate, necessary throughput bottleneck that trades some parallelism for correctness (oversell prevention), which is the right tradeoff for inventory.',
    commonMistakes: [
      'Committing after EACH step (order, then each item, then inventory, then payment) instead of once at the end, leaving partial state committed if a later step fails.',
      'Reading inventory quantity WITHOUT `with_for_update()`, creating a race condition where concurrent checkouts can both pass the stock check and jointly oversell.',
      'Catching the domain exception too broadly (a bare `except Exception`) inside the service itself and swallowing it instead of letting it propagate to trigger the session-level rollback.',
    ],
    followUpQuestions: [
      'What would change about this design if you wanted the inventory check to fail FAST (immediately, not waiting on a lock) instead of blocking behind a concurrent transaction — hint: `with_for_update(nowait=True)` or `skip_locked=True`?',
      'How would you extend this to support a PARTIAL success (e.g. "these 2 items succeeded, this 1 failed") using savepoints instead of an all-or-nothing rollback?',
      'How would you write a test that reliably reproduces the overselling race condition WITHOUT the lock, to prove the fix actually matters?',
    ],
    relatedTopics: ['Transactions', 'Pessimistic Locking', 'with_for_update', 'Rollback', 'Atomicity', 'Race Conditions'],
  },
  {
    id: 'python-m17-13',
    number: 'PY-M17-13',
    title: 'Alembic migrations — revision, upgrade, downgrade, autogenerate, and safe production strategy',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Alembic',
    expectedAnswer:
      'Alembic is SQLAlchemy\'s migration tool: it tracks an ordered chain of "revisions" (each a Python file with `upgrade()`/`downgrade()` functions containing schema-change operations), applied via `alembic upgrade head` and reversible via `alembic downgrade -1`. `alembic revision --autogenerate` compares your current ORM models against the live database schema and drafts a migration automatically — a huge time-saver, but one that MUST be reviewed by hand, since autogenerate cannot detect every kind of change (data migrations, some renames, certain constraint changes) correctly on its own.',
    deepExplanation:
      "```bash\nalembic init alembic                          # one-time: sets up the migrations/ directory + alembic.ini\nalembic revision --autogenerate -m \"add phone to users\"   # drafts a new revision by diffing models vs DB\nalembic upgrade head                           # applies all pending revisions, up to the latest\nalembic downgrade -1                            # reverts exactly one revision\nalembic history                                  # shows the full revision chain\n```\n\n```python\n\"\"\"add phone to users\n\nRevision ID: a1b2c3d4e5f6\nRevises: 9f8e7d6c5b4a\n\"\"\"\nfrom alembic import op\nimport sqlalchemy as sa\n\nrevision = \"a1b2c3d4e5f6\"\ndown_revision = \"9f8e7d6c5b4a\"\n\ndef upgrade() -> None:\n    op.add_column(\"users\", sa.Column(\"phone\", sa.String(20), nullable=True))\n\ndef downgrade() -> None:\n    op.drop_column(\"users\", \"phone\")\n```\n\nSafely adding a `NOT NULL` column to a large, already-populated production table (a classic \"how would you do this without downtime\" senior question) requires MULTIPLE separate migrations/deploys, not one:\n\n```python\n# migration 1: add the column as NULLABLE first — instant, no table rewrite/lock in modern PostgreSQL\ndef upgrade():\n    op.add_column(\"users\", sa.Column(\"phone\", sa.String(20), nullable=True))\n\n# (deploy application code that starts WRITING phone on every new/updated row, backfill existing rows\n#  in BATCHES via a separate script — not a single giant UPDATE that locks the whole table)\n\n# migration 2 (LATER, once 100% of rows are confirmed backfilled): enforce NOT NULL\ndef upgrade():\n    op.alter_column(\"users\", \"phone\", nullable=False)\n```\n\nMigration CONFLICTS in a team setting happen when two developers each branch off the same `down_revision` and create migrations independently — Alembic detects this as multiple \"heads\" (`alembic heads` shows more than one), and the fix is either manually editing one migration\\\n\nStep 1 — Understand the topic.\nTopic: Alembic migrations — revision, upgrade, downgrade, autogenerate, and safe production strategy\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\n# Generate a migration\nalembic revision --autogenerate -m \"add users\"\n\n# Apply migrations\nalembic upgrade head\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nalembic upgrade head\n```\n\nStep 5 — Example result:\n```text\ndatabase reaches latest migration\n```\n\nStep 6 — Complexity / trade-off:\nReview autogenerated SQL and make production-safe, reversible migration steps explicit.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production team renaming `users.name` to `users.full_name` ran `alembic revision --autogenerate`, got a migration that DROPPED the `name` column and ADDED a new empty `full_name` column (autogenerate\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Alembic migrations — revision, upgrade, downgrade, autogenerate, and safe production strategy**.",
    bestPractices: [
      'Always manually review an autogenerated migration before applying it — never trust it blindly, especially for anything that could be a rename (which autogenerate sees as drop+add) or a data-affecting constraint change.',
      'Add a `NOT NULL` constraint to an existing large table in multiple separate migrations/deploys (nullable column -> backfill in batches -> enforce NOT NULL), never as one migration that would lock/rewrite the whole table at once.',
      'Resolve multi-head situations from parallel team branches with an explicit `alembic merge heads` (or manual `down_revision` editing) rather than force-applying one branch\'s migrations and losing track of the other.',
    ],
    tradeOffs:
      'Splitting a schema change into multiple careful migrations (nullable -> backfill -> NOT NULL) takes more deploys and calendar time than a single blunt `ALTER TABLE ... ADD COLUMN ... NOT NULL`, but avoids taking a long-held lock (and, on older PostgreSQL versions, a full table rewrite) on a large production table — for any table with meaningful size/traffic, the multi-step approach is the only production-safe option, while the single-step approach remains acceptable for small tables early in a project\'s life.',
    commonMistakes: [
      'Applying an autogenerated migration without review, silently dropping and losing data on what was actually intended as a simple column rename.',
      'Adding a `NOT NULL` column directly to a large, already-populated production table in one step, causing a long-held table lock (and, on some PostgreSQL versions, a full table rewrite) that blocks other traffic.',
      'Ignoring a multi-head warning from `alembic heads` and manually forcing one branch\'s migration through, silently losing track of the other team member\'s schema change.',
    ],
    followUpQuestions: [
      'Why does adding a NULLABLE column to a PostgreSQL table not require rewriting the whole table, while adding one with a non-constant `DEFAULT` historically did (and how has this improved in modern PostgreSQL)?',
      'How would you write the data-backfill script for the phone-number example so it does not lock the table for an extended period on a very large dataset?',
      'What is the difference between `alembic downgrade -1` and `alembic downgrade <revision_id>`, and when would you use the latter?',
    ],
    relatedTopics: ['Alembic', 'Migrations', 'Autogenerate', 'Production Migration Strategy', 'Schema Evolution'],
  },
  {
    id: 'python-m17-14',
    number: 'PY-M17-14',
    title: 'Coding: soft delete and audit fields via a reusable SQLAlchemy mixin',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'SQLAlchemy Coding',
    expectedAnswer:
      'A soft-delete + audit-fields MIXIN class (`created_at`, `updated_at`, `deleted_at`) can be composed into any model via multiple inheritance, giving consistent auditability across every entity without repeating the same three columns everywhere — combined with a repository base class that automatically filters out soft-deleted rows unless explicitly asked not to.',
    deepExplanation:
      "```python\nfrom datetime import datetime\nfrom sqlalchemy import func\nfrom sqlalchemy.orm import Mapped, mapped_column, declared_attr\n\nclass AuditMixin:\n    created_at: Mapped[datetime] = mapped_column(server_default=func.now())\n    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())\n    # onupdate=func.now() -> SQLAlchemy automatically sets this on every UPDATE issued through the ORM\n    # (note: this is an ORM-level hook, not a DB-level trigger — a raw SQL UPDATE bypassing the ORM\n    # would NOT update it; a DB trigger is needed for that guarantee, see Module 16\\\n\nStep 1 — Understand the topic.\nTopic: Coding: soft delete and audit fields via a reusable SQLAlchemy mixin\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A `products` table using this exact mixin pattern lets customer-support tooling \"undelete\" an accidentally-removed product with a single `restore()` call (impossible with a real `DELETE`, which destroys the row permanently) while the normal storefront `ProductRepository.list()` transparently excludes soft-deleted products from customer-facing results by default, with no risk of a developer forgetting the filter on any NEW query method added to that repository going forward.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: soft delete and audit fields via a reusable SQLAlchemy mixin**.",
    bestPractices: [
      'Centralize the soft-delete filter in a shared base repository method (`_base_query`) rather than repeating `.where(deleted_at.is_(None))` in every individual query — this is the difference between "impossible to forget" and "easy to forget in one new method".',
      'Use `onupdate=func.now()` for `updated_at` when all writes genuinely go through the ORM, but add a real database TRIGGER instead (or in addition) if any writer might bypass the ORM (raw SQL scripts, another service).',
      'Pair soft-delete columns with a PARTIAL index (`WHERE deleted_at IS NULL`) so the overwhelmingly common "active rows only" queries stay fast even as the soft-deleted row count grows over time.',
    ],
    tradeOffs:
      'Soft delete preserves auditability and recoverability (critical for regulated data, and for graceful "undo" UX) at the cost of every future query author needing to remember the filter (mitigated, but not eliminated, by centralizing it in a repository base class) and the table growing unboundedly with rows that will never be queried in the normal path — a real hard-delete (or periodic archival of very old soft-deleted rows to cold storage) is often paired with soft delete for data that does not need to be kept forever.',
    commonMistakes: [
      'Forgetting the `deleted_at IS NULL` filter in a NEW query method added later, silently leaking soft-deleted rows into a customer-facing result.',
      'Relying on `onupdate=func.now()` (an ORM-level hook) to guarantee `updated_at` correctness, then being surprised when a raw SQL script or a different service updates the row and `updated_at` does not change.',
      'Treating soft-deleted rows as if they no longer participate in foreign key relationships or unique constraints — they still fully exist in the database and can still, for example, violate a UNIQUE constraint against a "new" row with the same value.',
    ],
    followUpQuestions: [
      'Why might a UNIQUE constraint on `email` need to be a PARTIAL unique index (`WHERE deleted_at IS NULL`) rather than a plain table-wide unique constraint, once soft delete is introduced?',
      'How would you implement a periodic job to permanently purge soft-deleted rows older than some retention period, safely and without locking the table?',
      'How would you make `updated_at` correctness guaranteed even for writes that bypass the ORM entirely (hint: a database trigger, covered in Module 16)?',
    ],
    relatedTopics: ['Soft Delete', 'Audit Fields', 'Mixins', 'Repository Pattern', 'Partial Index', 'onupdate'],
  },
  {
    id: 'python-m17-15',
    number: 'PY-M17-15',
    title: 'Coding: optimistic locking with a version column to detect concurrent update conflicts',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'SQLAlchemy Coding',
    expectedAnswer:
      'Optimistic locking detects (rather than prevents) concurrent conflicting updates: every row carries a `version` integer; an UPDATE always includes `WHERE id = :id AND version = :expected_version` and increments the version, and if ZERO rows are affected, that means someone else updated the row first — the application raises a conflict error instead of silently overwriting their change. SQLAlchemy has built-in support for this via `mapped_column(..., ...)` combined with the `__mapper_args__ = {"version_id_col": ...}` configuration, which automates the check-and-increment on every ORM-level UPDATE.',
    deepExplanation:
      "```python\nclass Product(Base):\n    __tablename__ = \"products\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str]\n    price: Mapped[float]\n    version: Mapped[int] = mapped_column(default=1)\n\n    __mapper_args__ = {\"version_id_col\": version}\n    # tells SQLAlchemy: on every UPDATE to this entity, automatically include\n    # \"AND version = :current_version\" in the WHERE clause, and \"SET version = version + 1\"\n\nfrom sqlalchemy.orm.exc import StaleDataError\n\nasync def update_price(session: AsyncSession, product_id: int, new_price: float) -> Product:\n    product = await session.get(Product, product_id)\n    if product is None:\n        raise ValueError(\"Product not found\")\n\n    product.price = new_price   # tracked mutation\n    try:\n        await session.flush()    # issues: UPDATE products SET price=:p, version=version+1\n                                    #         WHERE id=:id AND version=:expected_version\n    except StaleDataError:\n        # UPDATE affected 0 rows — someone else updated (and incremented the version) first\n        await session.rollback()\n        raise ConflictError(f\"Product {product_id} was modified concurrently — please retry\") from None\n    return product\n```\n\nConcrete conflict scenario: two admins both load `Product(id=1, price=100, version=5)` at nearly the same time. Admin A submits `price=90`; their UPDATE runs `WHERE id=1 AND version=5`, succeeds (1 row affected), and the row becomes `price=90, version=6`. Admin B, still holding their STALE in-memory `version=5`, submits `price=80`; their UPDATE also runs `WHERE id=1 AND version=5` — but the row is NOW at `version=6`, so ZERO rows match that WHERE clause, SQLAlchemy detects the affected-row-count mismatch and raises `StaleDataError`. Admin B\\\n\nStep 1 — Understand the topic.\nTopic: Coding: optimistic locking with a version column to detect concurrent update conflicts\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nUPDATE users\nSET name = :name,\n    version = version + 1\nWHERE id = :id\n  AND version = :version\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = session.execute(\n    update(User)\n    .where(\n        User.id == user_id,\n        User.version == version,\n    )\n    .values(\n        name=name,\n        version=User.version + 1,\n    )\n)\n```\n\nStep 5 — Example result:\n```text\nrowcount 1 = success; 0 = conflict\n```\n\nStep 6 — Complexity / trade-off:\nOptimistic locking detects concurrent updates without holding long database locks.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A CMS-style admin panel where two editors might occasionally, rarely, both open the same page for editing uses optimistic locking: if editor B saves after editor A already saved, editor B gets a \"this content was changed by someone else — reload and reapply your edits\" error instead of silently clobbering editor A\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: optimistic locking with a version column to detect concurrent update conflicts**.",
    bestPractices: [
      'Use optimistic locking (`version_id_col`) for LOW-CONTENTION resources where conflicts are rare and a retry/reload is an acceptable user experience; reserve pessimistic locking (`with_for_update`) for HIGH-CONTENTION resources like inventory counters where blocking briefly is cheaper than a conflict.',
      'Always catch `StaleDataError` explicitly at the boundary where a conflict is expected and translate it into a clear, actionable error for the caller/user, rather than letting it surface as a generic 500.',
      'Return the row\'s CURRENT (post-conflict) state alongside the conflict error where practical, so the client can show the user what actually changed and let them decide how to reapply their edit.',
    ],
    tradeOffs:
      'Optimistic locking has zero locking/blocking overhead in the common (no-conflict) case, but pushes the responsibility of handling a detected conflict (retry? surface to the user? merge?) onto the application — pessimistic locking guarantees no conflict can ever occur at the cost of making concurrent writers wait on each other even when, in practice, most of the time there would have been no actual conflict.',
    commonMistakes: [
      'Implementing a manual "check version, then update" pattern as two SEPARATE statements (a SELECT then an UPDATE) instead of one atomic `UPDATE ... WHERE version = :expected`, reintroducing the exact race condition optimistic locking is meant to prevent.',
      'Not catching `StaleDataError` at all, letting a legitimate, expected concurrent-edit conflict surface to the user as a confusing generic 500 error instead of an actionable "please reload and retry" message.',
      'Using optimistic locking for a genuinely high-contention resource (like inventory during a flash sale), where the conflict rate is so high that most write attempts fail and need retrying — pessimistic locking would perform and behave far better there.',
    ],
    followUpQuestions: [
      'Why must the version check and the update happen in the SAME atomic SQL statement, rather than as a separate SELECT followed by an UPDATE?',
      'How would you implement automatic retry-on-conflict for optimistic locking, and what are the risks of retrying blindly without limit?',
      'When would you choose optimistic locking over pessimistic locking for the checkout/inventory example from the transactions question, if at all?',
    ],
    relatedTopics: ['Optimistic Locking', 'version_id_col', 'StaleDataError', 'Pessimistic Locking', 'Concurrency', 'Race Conditions'],
  },
];

export const MOCK_PYTHON_MODULE17_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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