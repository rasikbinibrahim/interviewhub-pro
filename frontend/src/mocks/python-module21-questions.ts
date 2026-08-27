// Python + DSA Interview Handbook — Module 21: MongoDB + Python + FastAPI.
// Hand-authored technical questions covering production MongoDB application
// development in Python: the modern Motor async driver, connection
// management, async CRUD, layered FastAPI architecture (router -> service ->
// repository), Pydantic v2 schema separation and ObjectId handling, error
// mapping, pagination/filtering, aggregation-backed analytics endpoints,
// multi-document transactions, auth data modeling with TTL indexes, async
// pitfalls, testing, and production project structure. Mirrors the
// MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m21-1',
    number: 'PY-M21-1',
    title: 'Motor vs PyMongo — the modern async driver landscape for FastAPI',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python MongoDB Driver',
    expectedAnswer:
      'PyMongo is MongoDB\'s synchronous, blocking Python driver — appropriate for scripts, batch jobs, and sync-framework apps. Motor is the official ASYNCIO-native driver (built on top of PyMongo\'s core) and is the current, recommended choice for any async FastAPI application: every operation returns an awaitable, so it integrates natively with `async def` endpoints without blocking the event loop. A FastAPI app should create exactly ONE `AsyncIOMotorClient` at process startup and reuse it for the lifetime of the app; the client already manages an internal connection pool, so per-request client creation is both unnecessary and actively harmful.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nUse async I/O end-to-end and share one client/pool per process instead of creating connections per request.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nasync def get_user(repository, user_id):\n    return await repository.get(user_id)\n\nprint(\"await repository.get(...)\")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nuser = await db.users.find_one(\n    {\"_id\": user_id}\n)\n```\n\nStep 5 — Example result:\n```text\nawaited database result\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A FastAPI service migrating from a sync Flask+PyMongo implementation to async FastAPI+Motor kept the exact same query/update logic shape (find_one, update_one, etc.) and only needed to add `await` in front of every driver call plus switch the client class — the query-building code itself was nearly unchanged, since Motor\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use Motor (`AsyncIOMotorClient`) for any FastAPI application with `async def` endpoints — never PyMongo\'s synchronous client inside an async endpoint (see the dedicated async-pitfalls question for why).',
      'Create exactly one `AsyncIOMotorClient` at application startup (via FastAPI\'s lifespan) and share it across all requests — never instantiate a new client per request or per endpoint call.',
      'Reserve PyMongo\'s sync client for genuinely synchronous contexts: one-off scripts, sync Celery/RQ worker tasks, or a sync-framework app — not for use inside async FastAPI request handlers.',
    ],
    tradeOffs:
      'Motor\'s async API requires every database call to be awaited and generally forces the entire call chain above it (service, repository) to also be async — a larger up-front architectural commitment than a simpler sync PyMongo app, but the payoff is dramatically better concurrency per worker process for the I/O-bound workload a typical CRUD API represents, mirroring the same ASGI/async tradeoff already covered for FastAPI itself in Module 9.',
    commonMistakes: [
      'Using PyMongo\'s synchronous `MongoClient` (or calling its blocking methods) inside an `async def` FastAPI endpoint, which blocks the entire event loop for every concurrent request while that one query runs.',
      'Instantiating a new `AsyncIOMotorClient` inside a request handler or dependency function instead of once at startup, causing connection-pool churn and, at scale, connection exhaustion against `mongod`.',
      'Assuming Motor is a lesser-maintained community wrapper rather than the officially supported, MongoDB-Inc-maintained async driver.',
    ],
    followUpQuestions: [
      'What specifically happens to concurrent request handling if a blocking PyMongo call is used inside one async FastAPI endpoint among many?',
      'How does `AsyncIOMotorClient`\'s internal connection pool interact with `maxPoolSize`, and how would you reason about sizing it for a given deployment?',
      'When, if ever, would it be legitimate to use PyMongo (sync) from within a FastAPI application?',
    ],
    relatedTopics: ['Motor', 'PyMongo', 'AsyncIOMotorClient', 'Async I/O', 'Connection Pooling'],
  },
  {
    id: 'python-m21-2',
    number: 'PY-M21-2',
    title: 'Production-safe MongoDB connection management with FastAPI lifespan',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Connection Management',
    expectedAnswer:
      'The connection URI (with credentials sourced from environment variables/a secrets manager, never hard-coded) is used to construct a single `AsyncIOMotorClient` inside FastAPI\'s `lifespan` async context manager: the client connects on startup and is explicitly closed on shutdown, with pool size (`maxPoolSize`/`minPoolSize`) and timeout settings (`serverSelectionTimeoutMS`, `connectTimeoutMS`) tuned for the deployment, and the live client/database handle stored on `app.state` for dependency injection into request handlers.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Manage the MongoDB client\'s full lifecycle (connect on startup, close on shutdown) via FastAPI\'s `lifespan` context manager, never ad hoc at import time or inside a request handler.',
      'Set an aggressive `serverSelectionTimeoutMS` (a few seconds, not the 30-second default) so requests fail fast and loudly when the database is unreachable, instead of hanging.',
      'Implement a genuine database health-check endpoint (pinging MongoDB, not just returning a static response) for use by orchestration-layer readiness probes.',
    ],
    tradeOffs:
      'A short `serverSelectionTimeoutMS` gives fast, clear failure signals during genuine outages, at the cost of being more sensitive to brief network blips (a transient 2-second hiccup could trip a 3-second timeout) — the right value balances "fail fast enough to protect user-facing latency" against "not so aggressive that normal network jitter causes spurious failures," typically tuned based on the actual observed network characteristics between the app and the database.',
    commonMistakes: [
      'Leaving `serverSelectionTimeoutMS` at its 30-second default in a request-serving API, causing requests to hang for half a minute during a database outage instead of failing fast with a clear error.',
      'Hard-coding the MongoDB connection URI (including credentials) directly in source code instead of loading it from environment variables or a secrets manager.',
      'Implementing a "health check" endpoint that only confirms the FastAPI process itself is running, without actually verifying connectivity to MongoDB — masking real database outages from orchestration-layer health probes.',
    ],
    followUpQuestions: [
      'How would you size `maxPoolSize` across a fleet of N running FastAPI instances against a MongoDB deployment with a known total connection budget?',
      'What is the difference between a "liveness" and a "readiness" check in a Kubernetes-style deployment, and which one should actually ping the database?',
      'How would you handle a scenario where MongoDB is reachable at startup but becomes unreachable later, mid-deployment lifetime?',
    ],
    relatedTopics: ['Connection Management', 'Lifespan', 'AsyncIOMotorClient', 'Health Checks', 'Connection Pooling'],
  },
  {
    id: 'python-m21-3',
    number: 'PY-M21-3',
    title: 'Async CRUD with Motor — awaiting operations and async cursor iteration',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python MongoDB Driver',
    expectedAnswer:
      'Every Motor operation that talks to the server returns an awaitable and must be `await`ed: `insert_one`/`insert_many`, `find_one`, `update_one`/`update_many`, `delete_one`/`delete_many`, and `bulk_write` all follow this pattern directly mirroring PyMongo\'s method names. `find()` (which returns a CURSOR, not a coroutine, in both drivers) is consumed in Motor via `async for` iteration or `.to_list(length=...)`, never by simply awaiting the cursor object itself.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nUse async I/O end-to-end and share one client/pool per process instead of creating connections per request.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nasync def get_user(repository, user_id):\n    return await repository.get(user_id)\n\nprint(\"await repository.get(...)\")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nuser = await db.users.find_one(\n    {\"_id\": user_id}\n)\n```\n\nStep 5 — Example result:\n```text\nawaited database result\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A CSV-export endpoint that streams a large collection to the client uses `async for document in collection.find(query)` (never `.to_list()` with no bound) specifically so the export can begin streaming the FIRST batch of results back to the client immediately, and so memory usage stays proportional to one batch of documents rather than the entire (potentially multi-gigabyte) result set.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Always `await` Motor operations that return a single result (`find_one`, `insert_one`, `update_one`, etc.) — forgetting `await` silently returns an unresolved coroutine object instead of raising an obvious error in some cases, which is a subtle and confusing bug.',
      'Consume a `find()` cursor via `async for` for potentially large or unbounded result sets, reserving `.to_list(length=N)` for cases with a known, small, explicitly bounded size.',
      'Use `bulk_write` for batches of heterogeneous operations (a mix of updates/deletes/inserts) that should be sent to the server in one round trip, rather than issuing them as separate awaited calls in a loop.',
    ],
    tradeOffs:
      '`async for` cursor iteration keeps memory usage bounded and lets processing begin on the first batch immediately, at the cost of slightly more verbose code than a single `.to_list()` call — for genuinely small, known-bounded result sets (a paginated list endpoint\'s single page of 20 items), `.to_list(length=page_size)` is simpler and perfectly appropriate; the choice should be driven by whether the result set size is actually bounded by the query itself (e.g. via `.limit()`).',
    commonMistakes: [
      'Forgetting to `await` a Motor CRUD call and being confused by the resulting coroutine object instead of the actual query result.',
      'Calling `.to_list(length=None)` (or omitting a bound) on a query that could match a very large number of documents, risking an out-of-memory crash under real production data volumes.',
      'Attempting to `await db.users.find({...})` directly (treating the cursor construction itself as awaitable) instead of iterating or materializing it correctly.',
    ],
    followUpQuestions: [
      'Why does constructing a `find()` cursor not itself trigger a network round trip, and when does the actual server communication happen?',
      'How would you process a multi-million-document collection in Motor without risking excessive memory usage?',
      'What does `bulk_write`\'s `ordered` parameter control, and how does that mirror `insert_many`\'s behavior from Module 19?',
    ],
    relatedTopics: ['Motor', 'Async CRUD', 'Cursors', 'bulk_write', 'Async Iteration'],
  },
  {
    id: 'python-m21-4',
    number: 'PY-M21-4',
    title: 'Full FastAPI + MongoDB layered CRUD — router, service, repository for /users',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI + MongoDB',
    expectedAnswer:
      'A production `/users` resource is implemented across three distinct layers: the ROUTER (HTTP concerns only — parsing the request, calling the service, choosing the status code), the SERVICE (business logic — validation rules, orchestration, translating domain outcomes into exceptions), and the REPOSITORY (pure data access — the only layer that actually talks to the `AsyncIOMotorCollection`) — mirroring the exact same layered architecture established for SQLAlchemy in Module 17, just with a MongoDB-backed repository underneath.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "When a team later needed to add caching in front of `get_user` (a Redis lookup before hitting MongoDB), the change was entirely contained inside `UserService.get_user` — neither the router nor the repository needed to change at all, which is the direct payoff of having enforced this layering discipline from the start.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Keep the repository as the ONLY layer that imports `ObjectId`/constructs MongoDB query filters — the service and router should work with plain strings/domain objects.',
      'Raise domain-specific exceptions (`UserNotFoundError`) from the service layer, and translate them to `HTTPException`/status codes only in the router — never let `HTTPException` leak into the service or repository.',
      'Inject the repository/service via FastAPI `Depends()` (see Module 12) so tests can override them with fakes, rather than instantiating them directly inside route handlers.',
    ],
    tradeOffs:
      'The three-layer split adds real boilerplate for a genuinely tiny CRUD resource (a single-file "just call Motor directly in the route handler" implementation would be shorter) but pays off substantially the moment ANY business logic, caching, cross-repository orchestration, or serious test coverage is needed — the right call is almost always to keep this structure for anything beyond a true throwaway prototype.',
    commonMistakes: [
      'Calling `db.users.find_one(...)` directly inside a route handler function, scattering MongoDB query logic across the API layer instead of centralizing it in a repository.',
      'Raising `HTTPException` from inside the repository or service layer, coupling data-access/business-logic code to FastAPI/HTTP concerns it should have no knowledge of.',
      'Instantiating `UserRepository`/`UserService` directly inside a route handler (`UserService(UserRepository(db))`) instead of via `Depends()`, making the endpoint impossible to test with a substituted fake.',
    ],
    followUpQuestions: [
      'How would you add a `list_users` endpoint with pagination and filtering to this same layered structure without breaking the separation of concerns?',
      'Where exactly would input validation belong if a rule depended on BOTH the request payload AND existing database state (e.g. "email must be unique")?',
      'How would you test the `UserService` in isolation without a real MongoDB connection?',
    ],
    relatedTopics: ['Repository Pattern', 'Service Layer', 'FastAPI Router', 'Layered Architecture', 'Dependency Injection'],
  },
  {
    id: 'python-m21-5',
    number: 'PY-M21-5',
    title: 'Pydantic v2 schemas for MongoDB — schema separation and the PyObjectId pattern',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Pydantic + ObjectId',
    expectedAnswer:
      'MongoDB-backed FastAPI apps need the same request/response schema separation established for SQL in Module 11 (`UserCreate` / `UserUpdate` / `UserResponse` / `UserInDB`, with `password_hash` living only in `UserInDB` and never in `UserResponse`), PLUS a specific solution to the fact that `bson.ObjectId` is not natively a Pydantic-understood type: a custom `PyObjectId` annotated type using Pydantic v2\'s `__get_pydantic_core_schema__` hook, which validates incoming strings as well-formed ObjectIds and serializes outgoing values back to plain strings.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A security review flagged an early version of this API that returned raw MongoDB documents directly (`return await db.users.find_one(...)`) via FastAPI\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Always convert a raw MongoDB document to an explicit response schema (never return the raw dict/document directly from a route or service method) — this is the single most important defense against accidentally leaking internal fields.',
      'Centralize the `PyObjectId` annotated type in one shared module and reuse it across every model that embeds an ObjectId field, rather than redefining the validator per model.',
      'Use `alias="_id"` + `populate_by_name=True` specifically on the INTERNAL, database-shaped model (`UserInDB`) — never on the outward-facing `UserResponse`, which should use a plain `id: str` field.',
    ],
    tradeOffs:
      'The full four-schema separation (`Create`/`Update`/`Response`/`InDB`) plus a custom `PyObjectId` type is meaningfully more code than just returning MongoDB documents as-is, but it is the only approach that reliably prevents sensitive-field leakage and keeps the API contract stable and explicit even as the underlying document shape evolves — for a genuinely internal-only admin tool with a small trusted user base, a lighter-weight approach might be tolerable, but it is not the right default for any externally-facing API.',
    commonMistakes: [
      'Returning a raw MongoDB document directly from a FastAPI endpoint (relying on default dict serialization), accidentally exposing `password_hash` or other internal-only fields.',
      'Forgetting the `serialization=core_schema.plain_serializer_function_ser_schema(str)` half of the `PyObjectId` schema, causing `ObjectId` values to fail to serialize when the model is returned as a JSON response.',
      'Reusing the SAME model for both storage (with `_id`/alias config) and API responses, coupling the wire format to the storage format and making it easy to leak internal fields.',
    ],
    followUpQuestions: [
      'Why does `ObjectId` need a custom Pydantic core schema at all, rather than Pydantic just handling it automatically like it does `int`/`str`?',
      'How would you extend `PyObjectId` to also accept and validate an already-constructed `ObjectId` instance, not just a string, without breaking either path?',
      'How would you handle a nested sub-document field (e.g. an embedded `Address`) that itself needs to round-trip cleanly between MongoDB and a Pydantic response model?',
    ],
    relatedTopics: ['Pydantic v2', 'ObjectId', 'Schema Separation', 'FastAPI Serialization', 'Security'],
  },
  {
    id: 'python-m21-6',
    number: 'PY-M21-6',
    title: 'The repository pattern for MongoDB — centralizing data access',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Repository Pattern',
    expectedAnswer:
      'A repository class wraps a single collection and exposes a small, well-named set of data-access methods (`create`, `get_by_id`, `get_by_email`, `list`, `update`, `delete`, `search`) — it is the ONLY place in the codebase that constructs a MongoDB query filter or touches an `AsyncIOMotorCollection` directly, which keeps query logic centralized, consistently indexed, testable in isolation, and swappable (e.g. for a different backing store, or a mock in tests) without touching any calling code.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "When a `users` collection needed to migrate its `status` field from a plain string to a more structured `{value, changed_at}` sub-document, the change touched exactly ONE file (`UserRepository`) — every service and route calling `get_by_id`/`list`/etc. was completely unaffected, because they never knew or cared about the internal document shape in the first place.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Make the repository the ONLY place in the codebase that imports `ObjectId` or constructs a raw MongoDB filter dict — every other layer works with domain concepts (ids as strings, typed models).',
      'Bake cross-cutting query concerns (soft-delete filtering, tenant scoping in a multi-tenant system) into EVERY relevant repository method by default, so no caller can accidentally forget them.',
      'Keep repository method names and signatures stable and business-meaningful (`get_by_email`, not a generic `find_one(filter)` passthrough) — this is what makes the repository a genuine abstraction rather than a thin, pointless wrapper.',
    ],
    tradeOffs:
      'A repository per collection adds a layer of indirection that a very small application might not strictly need (you could call Motor directly from the service layer), but it pays for itself the moment more than one place needs the same query logic, the soft-delete/tenant-scoping concern exists at all, or genuine unit testing (without a live database) becomes a priority — for anything beyond a true throwaway script, the indirection cost is low relative to the correctness and testability benefit.',
    commonMistakes: [
      'Exposing a generic, unopinionated `find(filter: dict)` passthrough method on the repository, which just relocates raw MongoDB query construction to the CALLER instead of actually encapsulating it.',
      'Forgetting to apply the soft-delete (or tenant-scoping) filter consistently across every repository read method, leaving some inconsistently un-scoped.',
      'Letting service or router code construct `ObjectId`/query filters directly "just this once" for convenience, gradually eroding the repository\'s status as the sole data-access layer.',
    ],
    followUpQuestions: [
      'How would you add a caching layer (e.g. Redis) in front of `get_by_id` without changing the repository\'s public interface as seen by the service layer?',
      'How would you unit test `UserService.get_user` using a fake `UserRepository`, without a real MongoDB connection at all?',
      'What would change about this repository\'s design in a genuinely multi-tenant system where every query must also be scoped to a `tenant_id`?',
    ],
    relatedTopics: ['Repository Pattern', 'Motor', 'Soft Delete', 'Testability', 'Layered Architecture'],
  },
  {
    id: 'python-m21-7',
    number: 'PY-M21-7',
    title: 'The service layer — what belongs where, between router and repository',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Service Layer',
    expectedAnswer:
      'The service layer holds BUSINESS LOGIC — validation rules that depend on more than one piece of data, orchestration across multiple repositories, decisions about what should happen and in what order — while the ROUTER stays limited to pure HTTP concerns (parsing input, choosing status codes, translating domain exceptions to `HTTPException`) and the REPOSITORY stays limited to pure data access (no business rules, no HTTP awareness at all). Getting this boundary right is what keeps each layer independently testable and prevents business logic from either leaking into HTTP handlers or leaking into what should be simple data-access code.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Push any decision that depends on MULTIPLE pieces of data, or coordinates across multiple repositories, into the service layer — never split that logic across the router and repository.',
      'Have the service layer raise plain Python domain exceptions (not `HTTPException`) so it remains completely independent of any specific web framework and is trivially unit-testable in isolation.',
      'Keep the router\'s only two jobs as: translate the request into typed input for the service, and translate the service\'s result/exception into the correct HTTP response — nothing more.',
    ],
    tradeOffs:
      'A disciplined service layer adds an extra file/class per resource compared to putting business logic directly in route handlers, but it is precisely what makes business rules reusable outside the HTTP context (a background job, a CLI admin tool, or a gRPC endpoint could all reuse the same `UserService` without duplicating validation/orchestration logic) and independently unit-testable without spinning up FastAPI\'s test client at all.',
    commonMistakes: [
      'Putting a uniqueness check or other business rule directly inside a route handler function, duplicating it if the same rule is later needed from a second entry point (e.g. an admin CLI tool or a background job).',
      'Letting the service layer raise `HTTPException` directly, coupling business logic to FastAPI/HTTP and making it impossible to reuse or test outside a web-request context.',
      'Putting cross-repository orchestration logic (e.g. "deactivating a user should also revoke sessions") inside the repository itself, which should have no knowledge of ANY other collection\'s existence.',
    ],
    followUpQuestions: [
      'Where would rate-limiting or authorization checks belong in this layering — router, service, or a dependency, and why?',
      'How would you structure `UserService` so its business logic is reusable from BOTH a FastAPI endpoint and a background worker/CLI script?',
      'What is the clearest single test you would write to verify the router/service/repository boundary is not being violated as the codebase grows?',
    ],
    relatedTopics: ['Service Layer', 'Business Logic', 'Repository Pattern', 'Domain Exceptions', 'Layered Architecture'],
  },
  {
    id: 'python-m21-8',
    number: 'PY-M21-8',
    title: 'Mapping MongoDB errors to correct HTTP status codes',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Error Handling',
    expectedAnswer:
      'A production MongoDB-backed API must catch driver-level exceptions (`InvalidId` from a malformed ObjectId string, `DuplicateKeyError` from a unique-index violation, `pymongo.errors.PyMongoError` subclasses for connection/timeout failures) and translate each into the semantically correct HTTP status code (400, 409, 503 respectively) via a centralized exception handler — never letting a raw driver exception propagate to the client as an opaque, information-leaking 500.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "During a real MongoDB primary election (a routine, expected event in any replica-set deployment, covered in Module 20), requests briefly raised `ServerSelectionTimeoutError` — because the API correctly mapped this to 503 (not 500), the on-call dashboard\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Register a specific `@app.exception_handler(...)` for each meaningfully distinct MongoDB/driver exception type, rather than one broad `except Exception` catch-all that loses the ability to return the right status code per failure mode.',
      'Map connectivity/timeout failures (database unreachable) to 503, deliberately distinct from 500 (application bug) — this distinction materially helps both client retry logic and incident triage.',
      'Log the full exception details server-side on any unexpected `PyMongoError`, while returning a generic, non-leaking message to the client.',
    ],
    tradeOffs:
      'Fine-grained per-exception-type handlers give precise, semantically correct status codes and much better observability/triage signal, at the cost of needing to actively maintain the mapping as new failure modes are discovered in production — a single broad `except Exception -> 500` handler is far less code but throws away exactly the signal (400 vs 404 vs 409 vs 503) that makes API errors actionable for both clients and on-call engineers.',
    commonMistakes: [
      'Letting a raw `DuplicateKeyError` (or any other driver exception) propagate unhandled, returning a generic 500 to the client for what is actually a well-understood, anticipated 409 Conflict situation.',
      'Mapping a database connectivity failure to 500 instead of 503, muddying the distinction between "our code has a bug" and "the database is temporarily unreachable" for both alerting and client retry behavior.',
      'Echoing the raw exception message (which can include internal details like connection strings or field names) directly back in the API response body instead of a sanitized, generic message.',
    ],
    followUpQuestions: [
      'Why is a database connectivity failure more correctly a 503 than a 500, and what practical difference does that distinction make for a client\'s retry logic?',
      'How would you distinguish a genuine `DuplicateKeyError` caused by a real business-rule violation (duplicate email) from one caused by a retried, already-successful write (an idempotency scenario)?',
      'How would you test that your exception handlers actually produce the correct status codes, without needing a real MongoDB outage to trigger the 503 path?',
    ],
    relatedTopics: ['Error Handling', 'Exception Handlers', 'DuplicateKeyError', 'HTTP Status Codes', 'Observability'],
  },
  {
    id: 'python-m21-9',
    number: 'PY-M21-9',
    title: 'Pagination and filtering in FastAPI — safe dynamic queries with an allowlist',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Pagination & Filtering',
    expectedAnswer:
      'A `GET /products?category=laptop&min_price=500&max_price=2000&sort=price&order=asc` endpoint builds its MongoDB filter dict from `Query()`-validated parameters and uses an explicit ALLOWLIST of sortable field names — never passing a client-supplied field name directly into `.sort(...)` — combined with `_id`-based cursor pagination (from Module 19) for the actual paging mechanism, keeping the endpoint both safe and scalable.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A product-catalog API originally accepted `sort` as a raw, unvalidated string passed straight to `.sort()` — a routine security review flagged that a client could pass `sort=internal_cost_price` (an internal-only field never meant to be client-visible even indirectly via ordering) and infer relative cost information purely from result ordering; adding the `SORTABLE_FIELDS` allowlist closed this information-disclosure gap immediately.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Always validate a client-supplied sort field against an explicit allowlist before using it to build a MongoDB sort specification — never pass the raw string through directly.',
      'Bound `limit` with `Query(20, ge=1, le=100)` (or similar) to prevent a client from requesting an unbounded page size that could pull the entire collection in one request.',
      'Remember the cursor comparison operator must flip (`$gt` vs `$lt`) based on the requested sort direction — test both ascending and descending pagination explicitly.',
    ],
    tradeOffs:
      'An explicit sort-field allowlist is a small amount of extra code (a set literal plus one validation check) that closes a real information-disclosure and correctness risk — there is essentially no legitimate reason to skip it, unlike some tradeoffs where "the safer option costs meaningfully more."',
    commonMistakes: [
      'Passing a client-supplied `sort` query parameter directly into `.sort({sort_field: direction})` without validating it against an allowlist, allowing a client to sort by (and thereby probe the relative ordering of) internal or sensitive fields.',
      'Forgetting to flip the cursor comparison operator (`$gt`/`$lt`) based on sort direction, silently breaking pagination for descending-sorted lists.',
      'Not bounding the `limit` query parameter, allowing a client to request an arbitrarily large page size in a single call.',
    ],
    followUpQuestions: [
      'How would you extend this endpoint to support MULTIPLE simultaneous filters combined with a compound cursor (e.g. sorting by price, tie-broken by `_id`), similar to Module 19\'s compound cursor pattern?',
      'What would happen, concretely, if the sort-field allowlist check were removed and a client passed a nested/dotted field name instead — what could that reveal?',
      'How would you design the supporting compound index for this endpoint\'s combination of category filter + price range + sort field?',
    ],
    relatedTopics: ['Pagination', 'Filtering', 'Cursor Pagination', 'Allowlisting', 'NoSQL Injection', 'Query Validation'],
  },
  {
    id: 'python-m21-10',
    number: 'PY-M21-10',
    title: 'Aggregation-backed analytics endpoints in FastAPI',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Aggregation in FastAPI',
    expectedAnswer:
      'A `GET /analytics/revenue` endpoint builds a MongoDB aggregation pipeline as a plain Python list of stage dicts, runs it via Motor\'s async `aggregate()` (which, like `find()`, returns a cursor consumed with `async for`/`to_list`), and shapes the raw aggregation output through a dedicated Pydantic response model — keeping the reporting-specific pipeline construction logic inside the repository/service layer, not the route handler.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A revenue dashboard originally computed monthly totals by fetching ALL matching order documents into Python and summing them in application code — moving the summation into a `$group` aggregation stage (letting MongoDB do the reduction server-side) cut both the network payload (thousands of documents down to a handful of monthly summary rows) and the total request latency dramatically, especially once the `orders` collection grew past a few hundred thousand documents.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Push aggregation/summarization work into MongoDB via the pipeline itself (`$group`, `$sum`) rather than fetching raw documents and reducing them in Python — this is almost always both faster and far less network-heavy.',
      'Put a `$match` stage FIRST in any aggregation pipeline whenever possible, backed by a supporting index, so MongoDB filters down the working set before more expensive stages (`$group`, `$lookup`) run.',
      'Reason explicitly, per pipeline, about whether the FINAL output is structurally bounded (safe for `to_list(length=None)`) or could grow with the underlying collection size (requiring `async for` streaming instead).',
    ],
    tradeOffs:
      'Building aggregation pipelines directly in Python code (as opposed to, say, a pre-built MongoDB view or a separate analytics/data-warehouse system) keeps reporting logic co-located with the application and easy to version-control and test, but complex multi-stage pipelines can become a genuine performance and readability burden on the primary transactional database — for heavy, frequent, complex analytics workloads, many production systems eventually offload reporting to a dedicated read replica or a separate analytical store rather than running everything against the primary.',
    commonMistakes: [
      'Fetching raw documents into Python and summing/grouping them in application code instead of letting a `$group` aggregation stage do the reduction server-side, wasting both network bandwidth and application CPU.',
      'Omitting or misordering the `$match` stage (not putting it first, or omitting a supporting index for it), causing the aggregation to scan far more documents than necessary before the pipeline even reaches the meaningful reduction stages.',
      'Blindly using `to_list(length=None)` on every aggregation without considering whether the SPECIFIC pipeline\'s output is actually structurally bounded.',
    ],
    followUpQuestions: [
      'How would you add a `$lookup` stage to this pipeline to also break revenue down by product category, joining against a `products` collection?',
      'What index would you create to make the `$match` stage in `revenue_by_month` as efficient as possible, and why?',
      'At what point would you consider moving heavy analytics workloads off the primary MongoDB deployment entirely, and to what kind of system?',
    ],
    relatedTopics: ['Aggregation Framework', 'Motor', '$group', '$match', 'Analytics', 'Performance'],
  },
  {
    id: 'python-m21-11',
    number: 'PY-M21-11',
    title: 'Multi-document transactions in FastAPI — the order-placement workflow',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Transactions',
    expectedAnswer:
      'A `POST /orders` endpoint that must validate the user, validate product availability, create the order, decrement inventory, and create a payment record ALL together (or not at all) wraps those steps in a Motor `AsyncIOMotorClientSession` transaction (`async with await client.start_session() as session: async with session.start_transaction(): ...`) — if any step raises, the entire transaction aborts and every write is rolled back; MongoDB additionally surfaces specific TRANSIENT transaction errors that the driver/application should retry rather than treat as a hard failure.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nDesign retries around idempotency or atomic state transitions so repeated delivery does not create duplicate effects.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef apply_once(key, seen):\n    if key in seen:\n        return False\n    seen.add(key)\n    return True\n\nseen = set()\nprint(apply_once(\"order-42\", seen))\nprint(apply_once(\"order-42\", seen))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nawait db.orders.update_one(\n    {\"idempotency_key\": key},\n    {\"$setOnInsert\": payload},\n    upsert=True,\n)\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "An early implementation of this order-placement flow forgot to pass `session=session` to the `products.update_one` inventory-decrement call — under normal operation this was invisible (the write still succeeded), but during a deliberately-triggered failure test (simulating a payment-creation failure), the inventory decrement was found to have PERSISTED even though the order itself was correctly rolled back, revealing the bug precisely because the transaction\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Pass `session=session` to every single database operation inside a transaction block, without exception — a forgotten one silently escapes the atomicity guarantee rather than raising an error.',
      'Use `session.with_transaction(callback)` (rather than manually managing `start_transaction()`) to get automatic, correct retry behavior on transient transaction errors for free.',
      'Reserve multi-document transactions for genuinely multi-step, must-be-atomic workflows — do not wrap single, already-atomic operations (a plain `update_one`) in a transaction, which adds real overhead for no benefit.',
    ],
    tradeOffs:
      'MongoDB multi-document transactions give the same all-or-nothing guarantee PostgreSQL transactions do, but carry meaningfully more overhead than MongoDB\'s default single-document atomic operations (Module 20 covers this distinction), and require every participating write to be within the SAME replica set/session — the right default remains "design the schema (via embedding) so a single-document atomic write suffices whenever possible," reaching for a full transaction only when the operation genuinely spans multiple documents/collections and partial completion would be unacceptable.',
    commonMistakes: [
      'Forgetting to pass `session=session` on one or more operations inside a transaction block, silently allowing that specific write to escape the transaction\'s atomicity guarantee.',
      'Manually retrying a transaction on ANY exception (including genuine business-logic failures like insufficient stock) instead of only retrying on transient errors — retrying a business-rule failure just fails identically every time and wastes resources.',
      'Reaching for a multi-document transaction for an operation that a well-designed single-document schema (via embedding) could have made atomic without a transaction at all.',
    ],
    followUpQuestions: [
      'What specifically distinguishes a `TransientTransactionError` from a hard failure, and why is it safe to blindly retry one but never the other?',
      'How would you test that this order-placement transaction genuinely rolls back inventory changes when the payment-creation step fails?',
      'How does MongoDB\'s transaction mechanism interact with a sharded cluster, compared to a single replica set?',
    ],
    relatedTopics: ['Transactions', 'Sessions', 'Atomicity', 'Rollback', 'Retryable Writes'],
  },
  {
    id: 'python-m21-12',
    number: 'PY-M21-12',
    title: 'Auth data modeling — users, refresh tokens, and TTL-indexed ephemeral collections',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Auth Data Modeling',
    expectedAnswer:
      'A production auth system typically uses a stable `users` collection PLUS several short-lived, high-churn collections (`refresh_tokens`, `password_reset_tokens`, `email_verification_tokens`) each carrying a TTL (time-to-live) index on their expiry timestamp field — letting MongoDB automatically and efficiently purge expired documents in a background process, rather than the application needing to remember to clean them up manually.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Store an absolute `expires_at` timestamp (not a relative duration) and pair it with a TTL index using `expireAfterSeconds: 0` for any collection of inherently short-lived, high-churn documents.',
      'Always ALSO explicitly check expiry in application code at the point of use — never rely on the TTL index alone for real-time security enforcement, since its background cleanup runs on a roughly 60-second interval, not instantaneously.',
      'Store only a HASH of any bearer token (refresh tokens, password reset tokens, email verification tokens), never the raw secret value, mirroring password-hashing discipline.',
    ],
    tradeOffs:
      'A TTL index gives fully automatic, low-maintenance cleanup of expired documents at the cost of imprecise timing (roughly a minute of slop) and zero control over the deletion ORDER/rate under heavy expiry volume — for use cases needing precise, immediate deletion timing or fine-grained control over cleanup batching, an explicit scheduled cleanup job might be preferred instead, but for the overwhelming majority of auth-token use cases, TTL indexes are simpler and sufficiently precise.',
    commonMistakes: [
      'Relying on the TTL index alone to ENFORCE token expiry, without also explicitly checking `expires_at` in the token-validation code path, incorrectly treating "eventually cleaned up" as "immediately invalid".',
      'Storing the raw token value directly instead of a hash, turning any exposure of the collection (backup leak, misconfigured access, injection) into an immediately usable set of live credentials.',
      'Storing a relative duration instead of an absolute `expires_at` timestamp, which does not work correctly with a TTL index (the index needs an actual Date value to compare against the current time).',
    ],
    followUpQuestions: [
      'Why does the TTL background monitor\'s roughly-60-second interval matter for how an application must ALSO enforce expiry itself?',
      'How would you implement "revoke all sessions for this user" (e.g. on a password change) using the `user_id` index on `refresh_tokens`?',
      'How would refresh token ROTATION (issuing a new token and invalidating the old one on every use, from Module 13) be implemented against this schema?',
    ],
    relatedTopics: ['TTL Index', 'Authentication', 'Refresh Tokens', 'Token Hashing', 'Schema Design'],
  },
  {
    id: 'python-m21-13',
    number: 'PY-M21-13',
    title: 'Async pitfalls — blocking the event loop, client sharing, and timeouts',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Async Patterns',
    expectedAnswer:
      'The single most damaging async mistake in a MongoDB+FastAPI app is calling a BLOCKING, synchronous operation (PyMongo\'s sync client, or any other blocking I/O/CPU-heavy call) inside an `async def` endpoint — this freezes the ENTIRE event loop, stalling every other concurrent request being served by that worker process, not just the one that made the blocking call. A single shared `AsyncIOMotorClient` is safe to use concurrently across many simultaneous requests (it manages its own pool internally), but per-request timeouts and cancellation still need deliberate handling.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nUse async I/O end-to-end and share one client/pool per process instead of creating connections per request.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nasync def get_user(repository, user_id):\n    return await repository.get(user_id)\n\nprint(\"await repository.get(...)\")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nuser = await db.users.find_one(\n    {\"_id\": user_id}\n)\n```\n\nStep 5 — Example result:\n```text\nawaited database result\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A production incident traced intermittent, seemingly random latency spikes across UNRELATED endpoints to a single legacy internal endpoint that called a synchronous, blocking third-party SDK method directly inside an `async def` handler — every other request hitting the SAME worker process during that blocking call stalled in lockstep, even though those requests had nothing to do with the slow endpoint; wrapping the blocking call in `asyncio.to_thread(...)` immediately resolved the cross-endpoint stalling.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Audit every `async def` endpoint for any accidental synchronous/blocking call (sync PyMongo, `requests` instead of an async HTTP client, plain `time.sleep`, CPU-heavy computation) — a single one anywhere can stall the entire worker\'s concurrency.',
      'Use `asyncio.to_thread(...)` to explicitly offload any genuinely unavoidable blocking call to a thread pool, rather than executing it inline on the event loop.',
      'Share exactly one `AsyncIOMotorClient` across the whole application process — it is designed for concurrent use and re-creating it per request is both unnecessary and harmful.',
    ],
    tradeOffs:
      'The async model rewards strict discipline (every I/O call in the chain must be genuinely async, all the way down) with dramatically better concurrency per process for I/O-bound workloads, but a single lapse (one blocking call anywhere in a hot path) has an outsized, all-or-nothing negative impact compared to the equivalent mistake in a sync/thread-per-request framework, where a slow request mostly only hurts itself.',
    commonMistakes: [
      'Using PyMongo\'s synchronous client (or any other blocking library call) inside an `async def` FastAPI endpoint, stalling every concurrent request on that worker, not just the slow one.',
      'Assuming client disconnection automatically and immediately halts an in-flight Motor operation without any explicit cancellation-aware code structure.',
      'Believing a shared `AsyncIOMotorClient` needs external locking or per-request instantiation "to be safe" under concurrency, when it is specifically designed to be shared and used concurrently.',
    ],
    followUpQuestions: [
      'Why does one blocking call inside a single FastAPI endpoint affect completely unrelated concurrent requests, in a way that would not happen under a traditional thread-per-request sync framework?',
      'How would you detect (via profiling or monitoring) that a blocking call is silently degrading concurrency in a production FastAPI+Motor service?',
      'How would you bound the maximum time a single Motor query is allowed to run, and what happens to the underlying MongoDB-side operation if the client gives up waiting?',
    ],
    relatedTopics: ['Async I/O', 'Event Loop', 'Motor', 'asyncio.to_thread', 'Cancellation', 'Concurrency'],
  },
  {
    id: 'python-m21-14',
    number: 'PY-M21-14',
    title: 'Testing MongoDB-backed FastAPI applications',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Testing',
    expectedAnswer:
      'A MongoDB-backed FastAPI app is tested at multiple levels: fast, isolated UNIT tests of the service layer against a fake/mock repository (no database at all); REPOSITORY-level integration tests against a real (dedicated, disposable) test MongoDB instance/database, verifying actual query behavior; and full END-TO-END API tests using FastAPI\'s `TestClient`/`httpx.AsyncClient` with `app.dependency_overrides` swapping in the test database — using `pytest-asyncio` throughout for the async test functions.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Test the service layer against a FAKE repository (no real database) for fast, isolated business-logic verification, and reserve real-database tests specifically for verifying actual repository query behavior.',
      'Use a dedicated, disposable TEST database/collection (dropped or reset between test runs) — never run tests against a shared development or, worse, production database.',
      'Assert that sensitive fields are genuinely absent from API test responses (not just "the test passed"), directly verifying the schema-separation discipline from the Pydantic+ObjectId question actually holds.',
    ],
    tradeOffs:
      'A three-tiered test strategy (fake-repository unit tests, real-database repository tests, full end-to-end API tests) gives the best combination of speed and confidence, but requires maintaining more test infrastructure (a fake repository implementation, a disposable test-database fixture, dependency-override plumbing) than a simpler, single-tier "just test everything against a real test database" approach — the investment pays off primarily as the test suite and team grow large enough that fast feedback loops start to matter.',
    commonMistakes: [
      'Running tests against a shared development (or, catastrophically, production) MongoDB instance instead of a dedicated, disposable test database, causing test pollution and flaky, order-dependent test results.',
      'Testing ONLY through the full API layer (`TestClient`), making the test suite slow and making it hard to pinpoint whether a failure is a router, service, or repository bug.',
      'Forgetting to assert on the ABSENCE of sensitive fields in API response tests, which would fail to catch a schema-separation regression like the one described in the Pydantic+ObjectId question.',
    ],
    followUpQuestions: [
      'How would you structure a fake repository so it stays a faithful enough substitute for the real one to catch genuine service-layer bugs, without becoming so complex it needs its own tests?',
      'How would you test the multi-document transaction workflow from the transactions question, including verifying that a mid-transaction failure genuinely rolls back all prior writes?',
      'How would you set up a CI pipeline to provision a real, disposable MongoDB instance for the repository/API integration test tier?',
    ],
    relatedTopics: ['Testing', 'pytest-asyncio', 'Dependency Overrides', 'Fakes vs Mocks', 'Integration Testing'],
  },
  {
    id: 'python-m21-15',
    number: 'PY-M21-15',
    title: 'Production architecture and project structure for a MongoDB + FastAPI service',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Production Architecture',
    expectedAnswer:
      'A production MongoDB-backed FastAPI deployment layers a CDN/load balancer in front of several stateless FastAPI instances, each sharing a Redis cache and talking to a MongoDB REPLICA SET (never a single standalone `mongod` in production, for the availability/durability reasons covered in Module 20) — with the codebase itself organized into clearly separated `api/schemas/services/repositories/database/security/middleware/tests` directories mirroring the layered architecture established throughout this module.',
    deepExplanation:
      "```text\n                    Client\n                       |\n                  Load Balancer\n                       |\n              +--------+--------+\n              |                 |\n          FastAPI 1         FastAPI 2      (stateless — any instance can serve any request)\n              |                 |\n              +--------+--------+\n                       |\n                    Redis           (cache-aside for hot reads; also useful for rate limiting / session data)\n                       |\n                    MongoDB\n                       |\n                  Replica Set        (Primary + Secondaries — durability + read scaling + automatic failover)\n                       |\n              Background Workers    (change-stream consumers, scheduled jobs, email/notification processing)\n```\n\n```text\napp/\n├── main.py                    — creates the FastAPI() app, registers routers/middleware/exception handlers\n├── config/\n│   ├── settings.py            — Pydantic Settings: MONGO_URI, pool sizes, JWT secret, all from environment\n│   └── logging.py             — structured logging configuration\n├── api/\n│   ├── dependencies.py        — get_database, get_current_user, shared Depends() providers\n│   └── v1/\n│       ├── users.py           — ROUTER: HTTP concerns only, one file per resource\n│       ├── products.py\n│       └── orders.py\n├── schemas/                   — Pydantic models: UserCreate/UserUpdate/UserResponse/UserInDB, PyObjectId, etc.\n│   ├── user.py\n│   ├── product.py\n│   └── order.py\n├── services/                  — business logic + orchestration, one class per resource/domain area\n│   ├── user_service.py\n│   ├── product_service.py\n│   └── order_service.py\n├── repositories/               — the ONLY layer that talks to Motor collections directly\n│   ├── user_repository.py\n│   ├── product_repository.py\n│   └── order_repository.py\n├── database/\n│   └── mongodb.py              — AsyncIOMotorClient creation, lifespan wiring, index setup on startup\n├── security/\n│   ├── auth.py                 — password hashing, get_current_user dependency\n│   └── jwt.py                  — token issuance/verification\n├── exceptions/\n│   └── handlers.py              — the centralized exception -> HTTP status code mapping\n├── middleware/\n│   ├── logging.py                — structured request logging\n│   └── request_id.py             — correlation id propagation\n└── tests/\n    ├── unit/                      — fake-repository service tests (fast, no database)\n    └── integration/               — real-test-database repository + full API tests\n```\n\nWhy every FastAPI instance is STATELESS (no in-memory session data, no per-instance caching that other instances do not share): this is the exact same reasoning established for HTTP statelessness generally back in Module 9 — any instance behind the load balancer can serve any request, which is what makes horizontal scaling (adding FastAPI 3, 4, 5...) trivially safe with zero session-affinity configuration required.\n\nWhy MongoDB is deployed as a REPLICA SET even before any sharding need arises: a replica set (Primary + at least two Secondaries, detailed in Module 20) gives automatic failover if the primary becomes unavailable and durability against single-node data loss — running a single standalone `mongod` in production has NO such protection and should be considered a development-only configuration, never a production one, regardless of how small the current data volume is.\n\nWHY this directory structure specifically mirrors the FastAPI+SQLAlchemy structure from Module 17: the layering PRINCIPLE (router -> service -> repository -> driver -> database) is entirely database-agnostic — the exact same architectural discipline applies whether the underlying store is PostgreSQL+SQLAlchemy or MongoDB+Motor, which is precisely why a team building a POLYGLOT system (Module 20\\\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team migrating from a single-instance, single-`mongod` prototype to production deliberately introduced a MongoDB replica set and a Redis cache-aside layer BEFORE the first real launch, specifically because retrofitting replica-set failover and caching into an already-live system under real traffic is considerably riskier and more disruptive than provisioning them correctly from day one.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Run MongoDB as a replica set in any production deployment, never a standalone single `mongod` instance, regardless of current data volume — the availability guarantee matters from day one.',
      'Keep every FastAPI instance completely stateless so the load balancer can freely route any request to any instance, enabling trivial horizontal scaling.',
      'Mirror the same layered directory structure (api/schemas/services/repositories) across every resource, and across different backing stores in a polyglot system, so the architectural pattern stays consistent and predictable for the whole team.',
    ],
    tradeOffs:
      'A fully layered, multi-directory project structure is more upfront organizational overhead than a flatter "everything in main.py" prototype, but it is precisely what makes a growing codebase navigable, independently testable, and safe to hand off across a larger team — the investment is clearly worth it for anything beyond a genuine short-lived prototype, mirroring the exact same tradeoff already established for the FastAPI+SQLAlchemy structure in Module 17.',
    commonMistakes: [
      'Deploying a single standalone `mongod` instance to production "because the data volume is small right now", with no replica-set failover protection at all.',
      'Storing any per-instance in-memory state (session data, local caches not backed by Redis) on a FastAPI instance, breaking the statelessness assumption the load balancer and horizontal scaling depend on.',
      'Letting the project structure drift inconsistently between resources (one resource has a clean repository/service split, another has logic scattered directly in the router), eroding the architectural discipline over time.',
    ],
    followUpQuestions: [
      'What specifically would break (or degrade) if a FastAPI instance in this architecture DID keep meaningful state in local memory?',
      'How would background workers (change-stream consumers, scheduled jobs) fit into this directory structure, and what would their dependency on the repository layer look like?',
      'How would this architecture need to change to support a genuinely polyglot system using BOTH PostgreSQL and MongoDB for different parts of the data model?',
    ],
    relatedTopics: ['Production Architecture', 'Replica Sets', 'Statelessness', 'Project Structure', 'Horizontal Scaling'],
  },
  {
    id: 'python-m21-16',
    number: 'PY-M21-16',
    title: 'Coding: a complete production UserRepository + UserService + FastAPI router (full CRUD, paginated, error-safe)',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'MongoDB Coding',
    expectedAnswer:
      'A complete, cohesive worked example ties every technique from this module together: a Motor-backed `UserRepository` (pure data access, soft-delete-aware, cursor-paginated `list`), a `UserService` (business rules — email uniqueness, password hashing, domain exceptions), and a FastAPI router (HTTP concerns only, proper status codes, Pydantic schema separation) — the production-shape trio referenced throughout this module\'s other questions, assembled here as one runnable whole.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "This exact trio — repository/service/router, with soft delete, cursor pagination, and schema separation all composed together — is the concrete, runnable shape every individual technique in this module (Pydantic+ObjectId, repository pattern, service layer, error handling, pagination) was building toward; a real production `users` resource looks almost exactly like this, with the addition of authentication dependencies (Module 13) and the auth-token collections (the auth data modeling question) layered on top.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Treat "malformed id" and "well-formed id but not found" as the SAME outcome from the service\'s perspective (both raise `UserNotFoundError`) so the router only needs one `except` clause and always returns a clean 404 either way.',
      'Keep the soft-delete filter baked into every repository read method by default, so no future endpoint can accidentally forget it.',
      'Build the response via an explicit `UserResponse.from_db()` conversion at every single point data leaves the repository/service layer — never return a raw document directly from any router.',
    ],
    tradeOffs:
      'This fully layered implementation is substantially more code than a single-file "just call Motor in the route handler" version, but it is exactly the shape that stays maintainable, testable (per the dedicated testing question), and safe from sensitive-field leakage as the resource grows more complex over time — the right default for any resource expected to survive past an initial prototype.',
    commonMistakes: [
      'Returning `service.get(user_id)`\'s raw MongoDB document directly from the router instead of converting it through `UserResponse.from_db()`, risking a sensitive-field leak.',
      'Handling "malformed id string" and "document not found" as two different error paths in the router, when collapsing them into one `UserNotFoundError` (as done here) keeps the router simpler with no loss of correctness.',
      'Forgetting `limit=1` (or any bound) validation on the list endpoint, allowing an unbounded or absurdly large page size request.',
    ],
    followUpQuestions: [
      'How would you add a `PATCH /users/{user_id}` endpoint to this trio, including which layer should own the "what fields are actually allowed to be updated" decision?',
      'How would you add authentication (requiring the caller to be an admin to list all users) to this router using the dependency patterns from Module 13?',
      'How would you extend `UserService.register` to send a welcome email as a background task (Module 14) without blocking the API response on that email actually being sent?',
    ],
    relatedTopics: ['Repository Pattern', 'Service Layer', 'FastAPI Router', 'Cursor Pagination', 'Pydantic v2', 'Soft Delete'],
  },
];

export const MOCK_PYTHON_MODULE21_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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