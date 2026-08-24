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
      '```python\n# PyMongo — synchronous, blocking. Fine for a one-off script or a sync Celery task.\nfrom pymongo import MongoClient\nclient = MongoClient("mongodb://localhost:27017")\ndb = client["shop"]\nuser = db.users.find_one({"email": "ada@example.com"})   # blocks the calling thread\n\n# Motor — asyncio-native. The correct choice for an async FastAPI application.\nfrom motor.motor_asyncio import AsyncIOMotorClient\nclient = AsyncIOMotorClient("mongodb://localhost:27017")\ndb = client["shop"]\nuser = await db.users.find_one({"email": "ada@example.com"})   # yields control back to the event loop while waiting\n```\n\nWhy exactly ONE client, created once at startup, not per request:\n\n```python\n# WRONG — creates a brand-new client (and a brand-new connection pool) on every single request\n@app.get("/users/{user_id}")\nasync def get_user(user_id: str):\n    client = AsyncIOMotorClient(settings.MONGO_URI)   # new pool every call — connection churn, latency, resource exhaustion\n    ...\n\n# RIGHT — one client, created once, stored on app.state (see the connection-management question for the full lifespan pattern)\n@app.get("/users/{user_id}")\nasync def get_user(user_id: str, db=Depends(get_database)):\n    return await db.users.find_one({"_id": ObjectId(user_id)})\n```\n\n`AsyncIOMotorClient` is internally THREAD/TASK-safe and already manages its own connection pool (sized via `maxPoolSize`, default 100) — it is explicitly DESIGNED to be shared across many concurrent coroutines/requests within one process, exactly analogous to how a SQLAlchemy `AsyncEngine` (Module 17) is created once and shared, never re-created per request. Creating a new client per request defeats connection pooling entirely (each one opens its own fresh set of connections, adding latency and, at scale, exhausting `mongod`\'s `max_connections`) — this is the MongoDB-driver equivalent of the "opening a raw connection per request" antipattern already established for PostgreSQL in Module 15.\n\nMotor wraps the same underlying C-extension-accelerated BSON encoding/decoding and wire protocol as PyMongo, and both are maintained by MongoDB Inc — Motor is not a lesser, community-maintained alternative, it is the officially supported answer to "how do I use MongoDB from an asyncio application."',
    productionExample:
      'A FastAPI service migrating from a sync Flask+PyMongo implementation to async FastAPI+Motor kept the exact same query/update logic shape (find_one, update_one, etc.) and only needed to add `await` in front of every driver call plus switch the client class — the query-building code itself was nearly unchanged, since Motor\'s API deliberately mirrors PyMongo\'s method names and semantics.',
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
      '```python\nfrom contextlib import asynccontextmanager\nfrom fastapi import FastAPI, Depends\nfrom motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase\n\nfrom app.config import settings\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    app.state.mongo_client = AsyncIOMotorClient(\n        settings.MONGO_URI,                 # e.g. "mongodb+srv://app_user:***@cluster0.example.mongodb.net"\n        maxPoolSize=50,                      # cap concurrent connections this process will open\n        minPoolSize=5,                       # keep a small warm pool ready, avoiding cold-start latency spikes\n        serverSelectionTimeoutMS=5000,       # fail fast (5s) if no server is reachable, rather than hanging indefinitely\n        connectTimeoutMS=10000,\n        retryWrites=True,\n    )\n    app.state.db: AsyncIOMotorDatabase = app.state.mongo_client[settings.MONGO_DB_NAME]\n    # fail fast at startup if the database is genuinely unreachable, rather than discovering it on the first request\n    await app.state.mongo_client.admin.command("ping")\n    yield\n    app.state.mongo_client.close()          # release the connection pool cleanly on shutdown\n\napp = FastAPI(lifespan=lifespan)\n\ndef get_database(request: Request = None) -> AsyncIOMotorDatabase:\n    return app.state.db\n\n@app.get("/health/db")\nasync def db_health_check(db: AsyncIOMotorDatabase = Depends(get_database)):\n    try:\n        await db.command("ping")\n        return {"status": "ok"}\n    except Exception:\n        raise HTTPException(status_code=503, detail="Database unavailable")\n```\n\nWhy each setting matters concretely: `serverSelectionTimeoutMS` bounds how long a request will hang before failing when MongoDB is unreachable (default 30s is far too long for a request-serving API — 3-5s gives a fast, clear failure instead of a slow one); `maxPoolSize` caps how many concurrent connections a SINGLE process will open (multiplied across every running instance, this must stay within `mongod`\'s overall connection budget, exactly as with PostgreSQL in Module 15); `minPoolSize` keeps a small number of connections warm so the FIRST requests after a quiet period do not pay a fresh-connection latency penalty; calling `.admin.command("ping")` at startup converts a misconfigured URI or unreachable cluster into an immediate, loud startup failure rather than a confusing first-request error in production.\n\nThe connection URI itself must NEVER be hard-coded — it is loaded from environment variables (or a secrets manager) via a Pydantic Settings class (the same pattern established for PostgreSQL config in Module 11), keeping credentials out of source control entirely.',
    productionExample:
      'A production FastAPI deployment adds a `/health/db` endpoint (pinging MongoDB, not just returning a static 200) specifically so a Kubernetes readiness probe can detect "the pod is running but cannot actually reach the database" and stop routing traffic to it, rather than a shallow health check that only confirms the process is alive.',
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
      '```python\nfrom bson import ObjectId\n\n# insert\nresult = await db.users.insert_one({"email": "ada@example.com", "name": "Ada Lovelace"})\nuser_id = result.inserted_id\n\nresults = await db.users.insert_many([\n    {"email": "grace@example.com", "name": "Grace Hopper"},\n    {"email": "alan@example.com", "name": "Alan Turing"},\n])\n\n# find_one — a single coroutine, awaited directly, returns a dict or None\nuser = await db.users.find_one({"_id": ObjectId(user_id)})\n\n# find — returns a CURSOR object immediately (NOT awaited itself); consume it with async for or to_list\nasync for user in db.users.find({"status": "active"}).sort("_id", 1).limit(100):\n    process(user)\n\n# or materialize the whole (bounded!) result into a list at once\nusers = await db.users.find({"status": "active"}).limit(20).to_list(length=20)\n\n# update\nresult = await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"name": "Ada L."}})\nprint(result.matched_count, result.modified_count)\n\nresult = await db.users.update_many({"status": "pending"}, {"$set": {"status": "active"}})\n\n# delete\nresult = await db.users.delete_one({"_id": ObjectId(user_id)})\n\n# bulk_write — multiple heterogeneous operations in one round trip, still awaited as one call\nfrom pymongo import UpdateOne, DeleteOne\nresult = await db.users.bulk_write([\n    UpdateOne({"_id": ObjectId(id1)}, {"$set": {"status": "active"}}),\n    DeleteOne({"_id": ObjectId(id2)}),\n])\n```\n\nWhy `find()` is NOT itself awaited: constructing a cursor (`db.users.find({...})`) does not actually contact the server at all — it just builds a query specification. The network round trip(s) happen lazily, batch by batch, as you ITERATE the cursor (`async for`) or explicitly materialize it (`.to_list(...)`). This mirrors PyMongo\'s sync cursor behavior exactly, just with an async iteration protocol instead of a sync one.\n\nA critical production caution: `.to_list(length=...)` REQUIRES an explicit length bound (or you must be certain the result set is small) — calling `.to_list(length=None)` (or an unbounded equivalent) on a query matching millions of documents will attempt to load the ENTIRE result set into memory at once, which is a direct route to an out-of-memory crash; `async for` iteration (processing documents one batch at a time as the cursor streams them) is the correct approach for potentially large result sets, exactly as a generator avoids materializing an entire sequence in Python generally.',
    productionExample:
      'A CSV-export endpoint that streams a large collection to the client uses `async for document in collection.find(query)` (never `.to_list()` with no bound) specifically so the export can begin streaming the FIRST batch of results back to the client immediately, and so memory usage stays proportional to one batch of documents rather than the entire (potentially multi-gigabyte) result set.',
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
      '```python\n# schemas/user.py — see the dedicated Pydantic+ObjectId question for PyObjectId details\nclass UserCreate(BaseModel):\n    email: EmailStr\n    name: str\n\nclass UserUpdate(BaseModel):\n    name: str | None = None\n    status: str | None = None\n\nclass UserResponse(BaseModel):\n    id: str\n    email: EmailStr\n    name: str\n    status: str\n\n# repositories/user_repository.py\nclass UserRepository:\n    def __init__(self, db: AsyncIOMotorDatabase):\n        self._collection = db["users"]\n\n    async def create(self, data: dict) -> dict:\n        result = await self._collection.insert_one(data)\n        return await self._collection.find_one({"_id": result.inserted_id})\n\n    async def get_by_id(self, user_id: ObjectId) -> dict | None:\n        return await self._collection.find_one({"_id": user_id})\n\n    async def update(self, user_id: ObjectId, updates: dict) -> dict | None:\n        await self._collection.update_one({"_id": user_id}, {"$set": updates})\n        return await self.get_by_id(user_id)\n\n    async def delete(self, user_id: ObjectId) -> bool:\n        result = await self._collection.delete_one({"_id": user_id})\n        return result.deleted_count == 1\n\n# services/user_service.py — orchestration + business rules, raises DOMAIN exceptions (not HTTPException)\nclass UserNotFoundError(Exception): ...\n\nclass UserService:\n    def __init__(self, repository: UserRepository):\n        self._repository = repository\n\n    async def create_user(self, payload: UserCreate) -> dict:\n        return await self._repository.create({**payload.model_dump(), "status": "active"})\n\n    async def get_user(self, user_id: str) -> dict:\n        if not ObjectId.is_valid(user_id):\n            raise UserNotFoundError(user_id)\n        user = await self._repository.get_by_id(ObjectId(user_id))\n        if user is None:\n            raise UserNotFoundError(user_id)\n        return user\n\n# api/v1/users.py — HTTP concerns ONLY: status codes, request/response shape, translating domain errors\nrouter = APIRouter(prefix="/users", tags=["Users"])\n\n@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\nasync def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)):\n    return await service.create_user(payload)\n\n@router.get("/{user_id}", response_model=UserResponse)\nasync def get_user(user_id: str, service: UserService = Depends(get_user_service)):\n    try:\n        return await service.get_user(user_id)\n    except UserNotFoundError:\n        raise HTTPException(status_code=404, detail="User not found")\n\n@router.patch("/{user_id}", response_model=UserResponse)\nasync def update_user(user_id: str, payload: UserUpdate, service: UserService = Depends(get_user_service)):\n    try:\n        return await service.update_user(user_id, payload)\n    except UserNotFoundError:\n        raise HTTPException(status_code=404, detail="User not found")\n\n@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)\nasync def delete_user(user_id: str, service: UserService = Depends(get_user_service)):\n    try:\n        await service.delete_user(user_id)\n    except UserNotFoundError:\n        raise HTTPException(status_code=404, detail="User not found")\n```\n\nThe key architectural discipline: the REPOSITORY never raises `HTTPException` (it knows nothing about HTTP), the SERVICE never touches `AsyncIOMotorCollection` directly or references FastAPI/Starlette types, and the ROUTER never constructs a MongoDB query filter itself — each layer has exactly one job, which is precisely what makes this trio independently unit-testable (see the dedicated testing question) and keeps MongoDB-specific concerns (ObjectId construction, query shape) from leaking into HTTP-layer code.',
    productionExample:
      'When a team later needed to add caching in front of `get_user` (a Redis lookup before hitting MongoDB), the change was entirely contained inside `UserService.get_user` — neither the router nor the repository needed to change at all, which is the direct payoff of having enforced this layering discipline from the start.',
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
      '```python\nfrom typing import Annotated, Any\nfrom bson import ObjectId\nfrom pydantic import BaseModel, EmailStr, Field, GetCoreSchemaHandler\nfrom pydantic_core import core_schema\n\nclass _ObjectIdPydanticAnnotation:\n    @classmethod\n    def __get_pydantic_core_schema__(cls, source_type: Any, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:\n        def validate(value: Any) -> ObjectId:\n            if isinstance(value, ObjectId):\n                return value\n            if isinstance(value, str) and ObjectId.is_valid(value):\n                return ObjectId(value)\n            raise ValueError("Invalid ObjectId")\n\n        return core_schema.no_info_plain_validator_function(\n            validate,\n            serialization=core_schema.plain_serializer_function_ser_schema(str),   # always serializes OUT as a plain string\n        )\n\nPyObjectId = Annotated[ObjectId, _ObjectIdPydanticAnnotation]\n\n# --- request schemas: only what the CLIENT is allowed to send ---\nclass UserCreate(BaseModel):\n    email: EmailStr\n    name: str\n    password: str = Field(min_length=8)\n\nclass UserUpdate(BaseModel):\n    name: str | None = None\n    status: str | None = None\n\n# --- the DATABASE-shaped model: includes internal fields NEVER sent to a client ---\nclass UserInDB(BaseModel):\n    id: PyObjectId = Field(alias="_id")\n    email: EmailStr\n    name: str\n    password_hash: str            # NEVER exposed in a response schema\n    status: str = "active"\n\n    model_config = {"populate_by_name": True, "arbitrary_types_allowed": True}\n\n# --- the RESPONSE schema: safe, client-facing shape only ---\nclass UserResponse(BaseModel):\n    id: str\n    email: EmailStr\n    name: str\n    status: str\n\n    @classmethod\n    def from_db(cls, doc: dict) -> "UserResponse":\n        return cls(id=str(doc["_id"]), email=doc["email"], name=doc["name"], status=doc["status"])\n```\n\nWhy `alias="_id"` + `populate_by_name=True` on `UserInDB`: MongoDB documents always key the identifier as `_id` (not `id`), which is not a legal Python identifier to use directly as a field name in the idiomatic style — the `alias` lets the model be constructed FROM a raw MongoDB document (`UserInDB(**doc)`, which sees `_id`) while `populate_by_name=True` also allows constructing it using the Python-friendly `id=` keyword directly, giving flexibility for both paths.\n\nWhy `UserResponse` builds its own plain `str` `id` rather than reusing `PyObjectId`: the RESPONSE model exists purely for JSON OUTPUT — by the time you are shaping the API response, there is no benefit to carrying the richer `ObjectId` type through; a plain `str` is simpler, and the explicit `from_db()` classmethod keeps the MongoDB-document-to-response-schema conversion in ONE clearly named place rather than scattered `str(doc["_id"])` calls throughout route handlers.\n\nThis is the direct MongoDB analogue of the `UserCreate`/`UserUpdate`/`UserResponse`/`UserDatabase` separation from Module 11 — the SAME reasoning (never let the raw storage-layer shape, including sensitive fields, leak directly into an API response) applies identically, with the added MongoDB-specific wrinkle of ObjectId\'s type handling.',
    productionExample:
      'A security review flagged an early version of this API that returned raw MongoDB documents directly (`return await db.users.find_one(...)`) via FastAPI\'s automatic dict-to-JSON serialization — this accidentally leaked `password_hash` and other internal fields to every client; introducing the explicit `UserResponse.from_db()` conversion closed the leak permanently by making "what fields go out" an explicit, reviewable allowlist rather than an implicit "whatever happens to be in the document."',
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
      '```python\nfrom motor.motor_asyncio import AsyncIOMotorDatabase\nfrom bson import ObjectId\n\nclass UserRepository:\n    def __init__(self, db: AsyncIOMotorDatabase):\n        self._collection = db["users"]\n\n    async def create(self, data: dict) -> dict:\n        result = await self._collection.insert_one(data)\n        created = await self._collection.find_one({"_id": result.inserted_id})\n        assert created is not None\n        return created\n\n    async def get_by_id(self, user_id: ObjectId) -> dict | None:\n        return await self._collection.find_one({"_id": user_id, "is_deleted": {"$ne": True}})\n\n    async def get_by_email(self, email: str) -> dict | None:\n        return await self._collection.find_one({"email": email, "is_deleted": {"$ne": True}})\n\n    async def list(self, status_filter: str | None, after_id: ObjectId | None, limit: int = 20) -> list[dict]:\n        query: dict = {"is_deleted": {"$ne": True}}\n        if status_filter:\n            query["status"] = status_filter\n        if after_id:\n            query["_id"] = {"$gt": after_id}\n        return await self._collection.find(query).sort("_id", 1).limit(limit).to_list(length=limit)\n\n    async def update(self, user_id: ObjectId, updates: dict) -> dict | None:\n        if not updates:\n            return await self.get_by_id(user_id)\n        await self._collection.update_one({"_id": user_id}, {"$set": updates})\n        return await self.get_by_id(user_id)\n\n    async def delete(self, user_id: ObjectId) -> bool:\n        result = await self._collection.update_one(\n            {"_id": user_id}, {"$set": {"is_deleted": True, "deleted_at": datetime.now(timezone.utc)}}\n        )\n        return result.matched_count == 1\n\n    async def search(self, query_text: str, limit: int = 20) -> list[dict]:\n        return await self._collection.find(\n            {"$text": {"$search": query_text}, "is_deleted": {"$ne": True}}\n        ).limit(limit).to_list(length=limit)\n```\n\nWhy this centralization matters beyond "clean code" aesthetics: the soft-delete filter (`{"is_deleted": {"$ne": True}}`) appears in EVERY read method here — if this logic were instead duplicated inline across a dozen different route handlers, a single forgotten instance of that filter (as flagged as a real risk back in Module 19\'s soft-delete question) would silently leak deleted records somewhere in the API. Centralizing it in the repository means there is exactly ONE place to get it right, and exactly one place to fix it if the soft-delete strategy ever changes.\n\nThe repository is also the natural seam for TESTING: a unit test of `UserService` can inject a fake/mock `UserRepository` (satisfying the same method signatures) without touching a real MongoDB instance at all, while a narrower "repository integration test" verifies the actual query behavior against a real (test) database — a clean separation of concerns for the test pyramid, covered further in the dedicated testing question.',
    productionExample:
      'When a `users` collection needed to migrate its `status` field from a plain string to a more structured `{value, changed_at}` sub-document, the change touched exactly ONE file (`UserRepository`) — every service and route calling `get_by_id`/`list`/etc. was completely unaffected, because they never knew or cared about the internal document shape in the first place.',
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
      '```python\nclass EmailAlreadyRegisteredError(Exception): ...\nclass UserNotFoundError(Exception): ...\n\nclass UserService:\n    def __init__(self, repository: UserRepository, password_hasher: PasswordHasher):\n        self._repository = repository\n        self._password_hasher = password_hasher\n\n    async def register_user(self, payload: UserCreate) -> dict:\n        # BUSINESS RULE: uniqueness is a domain concern, not a raw database constraint check —\n        # this method decides WHAT should happen (reject duplicates with a clear error), the\n        # repository just answers "does this exist" without any opinion about what to do next\n        existing = await self._repository.get_by_email(payload.email)\n        if existing is not None:\n            raise EmailAlreadyRegisteredError(payload.email)\n\n        # BUSINESS RULE: passwords are never stored in plaintext — hashing decisions belong here,\n        # not in the repository (which should not know or care what a "password" even is)\n        document = {\n            "email": payload.email,\n            "name": payload.name,\n            "password_hash": self._password_hasher.hash(payload.password),\n            "status": "active",\n            "created_at": datetime.now(timezone.utc),\n        }\n        return await self._repository.create(document)\n\n    async def deactivate_user(self, user_id: str, reason: str) -> dict:\n        user = await self._get_existing(user_id)\n        # ORCHESTRATION: a real deactivation might need to touch MULTIPLE repositories\n        # (revoke sessions, cancel subscriptions) — that coordination belongs in the service,\n        # never scattered across the router or duplicated inside a single repository method\n        updated = await self._repository.update(user["_id"], {"status": "deactivated", "deactivation_reason": reason})\n        await self._session_repository.revoke_all_for_user(user["_id"])\n        return updated\n\n    async def _get_existing(self, user_id: str) -> dict:\n        if not ObjectId.is_valid(user_id):\n            raise UserNotFoundError(user_id)\n        user = await self._repository.get_by_id(ObjectId(user_id))\n        if user is None:\n            raise UserNotFoundError(user_id)\n        return user\n```\n\nA precise litmus test for "does this logic belong in the service or the repository": if the logic requires knowing WHY something is happening or coordinating MULTIPLE pieces of data/multiple repositories to decide an outcome, it is a service concern; if the logic is purely "given this exact filter, fetch/write these exact documents" with no decision-making, it is a repository concern. Password hashing, uniqueness enforcement (as a business decision, distinct from a raw unique-index database error), and cross-repository orchestration (deactivating a user AND revoking their sessions) are unambiguously service-layer; constructing the actual MongoDB query/update documents is unambiguously repository-layer.\n\nThe ROUTER, in turn, should contain essentially ZERO business logic — its entire job is: parse the request into a Pydantic model, call exactly one service method, and translate whatever domain exception (or successful result) comes back into the correct HTTP status code and response schema. A router that itself checks `if existing_user: raise HTTPException(409, ...)` has business logic leaking into the wrong layer.',
    productionExample:
      'When the business later required "deactivating a user must ALSO cancel their active subscription" (a new cross-cutting requirement), the change was made entirely inside `UserService.deactivate_user` by injecting a `SubscriptionRepository` and adding one more orchestration step — neither the router\'s HTTP-handling code nor `UserRepository`\'s pure data-access methods needed to change at all, directly validating that the layering had correctly isolated where that kind of change belongs.',
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
      '```python\nfrom bson.errors import InvalidId\nfrom pymongo.errors import DuplicateKeyError, ServerSelectionTimeoutError, PyMongoError\nfrom fastapi import FastAPI, Request\nfrom fastapi.responses import JSONResponse\n\nclass DocumentNotFoundError(Exception):\n    def __init__(self, resource: str, identifier: str):\n        self.resource = resource\n        self.identifier = identifier\n\napp = FastAPI()\n\n@app.exception_handler(InvalidId)\nasync def invalid_id_handler(request: Request, exc: InvalidId):\n    return JSONResponse(status_code=400, content={"detail": "Malformed identifier"})\n\n@app.exception_handler(DocumentNotFoundError)\nasync def not_found_handler(request: Request, exc: DocumentNotFoundError):\n    return JSONResponse(status_code=404, content={"detail": f"{exc.resource} {exc.identifier} not found"})\n\n@app.exception_handler(DuplicateKeyError)\nasync def duplicate_key_handler(request: Request, exc: DuplicateKeyError):\n    return JSONResponse(status_code=409, content={"detail": "A resource with this value already exists"})\n\n@app.exception_handler(ServerSelectionTimeoutError)\nasync def db_unavailable_handler(request: Request, exc: ServerSelectionTimeoutError):\n    # the database is unreachable — this is a 503 (service unavailable), NOT a 500 (our code is not "broken")\n    return JSONResponse(status_code=503, content={"detail": "Service temporarily unavailable"})\n\n@app.exception_handler(PyMongoError)\nasync def generic_mongo_error_handler(request: Request, exc: PyMongoError):\n    # catch-all for any other driver-level failure — log the REAL exception server-side,\n    # but never leak internal details (connection strings, stack traces) to the client\n    logger.exception("Unhandled MongoDB error")\n    return JSONResponse(status_code=500, content={"detail": "Internal server error"})\n```\n\nThe precise status-code mapping and WHY each is correct: `InvalidId` (a client sent a malformed id string) is squarely a CLIENT error -> 400; `DocumentNotFoundError` (the id was well-formed but nothing matches) -> 404; `DuplicateKeyError` (the write conflicts with existing state due to a unique index) -> 409 Conflict, the same reasoning as the FastAPI 409 guidance from Module 9; `ServerSelectionTimeoutError`/connection-level `PyMongoError`s (MongoDB itself is unreachable or too slow) -> 503 Service Unavailable, deliberately NOT 500, because a 503 correctly signals "this is a transient infrastructure problem, retry later" rather than "the application has a bug" — a distinction that matters enormously for both automated client retry logic and on-call triage (a spike in 503s points immediately at infrastructure, not a code regression).\n\nThe generic `PyMongoError` handler exists as a safety net but should log the FULL exception details server-side (for debugging) while returning a deliberately generic message to the client — never echoing raw driver exception text (which can contain connection strings, internal field names, or other implementation details) back in an API response.',
    productionExample:
      'During a real MongoDB primary election (a routine, expected event in any replica-set deployment, covered in Module 20), requests briefly raised `ServerSelectionTimeoutError` — because the API correctly mapped this to 503 (not 500), the on-call dashboard\'s alerting immediately and correctly categorized it as an infrastructure event rather than triggering a "new bug in the latest deploy" investigation, saving significant triage time.',
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
      '```python\nfrom fastapi import APIRouter, Query, HTTPException\nfrom typing import Literal\n\nSORTABLE_FIELDS = {"price", "name", "created_at"}   # explicit allowlist — never trust a raw client string\n\nrouter = APIRouter(prefix="/products", tags=["Products"])\n\n@router.get("/")\nasync def list_products(\n    category: str | None = Query(None),\n    min_price: float | None = Query(None, ge=0),\n    max_price: float | None = Query(None, ge=0),\n    sort: str = Query("created_at"),\n    order: Literal["asc", "desc"] = Query("asc"),\n    after_id: str | None = Query(None, description="Cursor from the previous page"),\n    limit: int = Query(20, ge=1, le=100),\n    repository: ProductRepository = Depends(get_product_repository),\n):\n    if sort not in SORTABLE_FIELDS:\n        raise HTTPException(status_code=400, detail=f"Cannot sort by \'{sort}\'")\n\n    query: dict = {"is_deleted": {"$ne": True}}\n    if category:\n        query["category"] = category\n    if min_price is not None or max_price is not None:\n        price_filter: dict = {}\n        if min_price is not None:\n            price_filter["$gte"] = min_price\n        if max_price is not None:\n            price_filter["$lte"] = max_price\n        query["price"] = price_filter\n\n    if after_id:\n        if not ObjectId.is_valid(after_id):\n            raise HTTPException(status_code=400, detail="Invalid cursor")\n        cursor_op = "$gt" if order == "asc" else "$lt"\n        query["_id"] = {cursor_op: ObjectId(after_id)}\n\n    sort_direction = 1 if order == "asc" else -1\n    items = await repository.list(query, sort_field=sort, sort_direction=sort_direction, limit=limit)\n    next_cursor = str(items[-1]["_id"]) if len(items) == limit else None\n    return {"items": [ProductResponse.from_db(doc) for doc in items], "next_cursor": next_cursor}\n```\n\nWhy the `SORTABLE_FIELDS` allowlist is a genuine SECURITY/CORRECTNESS control, not just style: if `sort` were passed directly to `.sort({sort: direction})` without validation, a client could request `sort=password_hash` (probing for the EXISTENCE/relative ordering of a sensitive field it should never even know exists) or `sort=$where` (attempting to inject a MongoDB operator rather than a genuine field name) — the exact same "never trust client input as a raw field/operator name" principle that Module 15\'s SQL `sort_by` question established for PostgreSQL, and Module 20\'s NoSQL-injection topic develops in more depth.\n\nCursor direction must FLIP based on sort order (`$gt` for ascending, `$lt` for descending) — a very easy detail to get backwards, which would silently return the wrong "next page" (e.g. going backward instead of forward) rather than raising any visible error.',
    productionExample:
      'A product-catalog API originally accepted `sort` as a raw, unvalidated string passed straight to `.sort()` — a routine security review flagged that a client could pass `sort=internal_cost_price` (an internal-only field never meant to be client-visible even indirectly via ordering) and infer relative cost information purely from result ordering; adding the `SORTABLE_FIELDS` allowlist closed this information-disclosure gap immediately.',
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
      '```python\nclass RevenueByMonth(BaseModel):\n    month: str          # e.g. "2026-01"\n    total_revenue: float\n    order_count: int\n\nclass AnalyticsRepository:\n    def __init__(self, db: AsyncIOMotorDatabase):\n        self._orders = db["orders"]\n\n    async def revenue_by_month(self, start: datetime, end: datetime) -> list[dict]:\n        pipeline = [\n            {"$match": {"status": "paid", "placed_at": {"$gte": start, "$lt": end}}},\n            {\n                "$group": {\n                    "_id": {"$dateToString": {"format": "%Y-%m", "date": "$placed_at"}},\n                    "total_revenue": {"$sum": "$total"},\n                    "order_count": {"$sum": 1},\n                }\n            },\n            {"$sort": {"_id": 1}},\n            {"$project": {"_id": 0, "month": "$_id", "total_revenue": 1, "order_count": 1}},\n        ]\n        return await self._orders.aggregate(pipeline).to_list(length=None)   # bounded — at most 1 doc per month in range\n\nrouter = APIRouter(prefix="/analytics", tags=["Analytics"])\n\n@router.get("/revenue", response_model=list[RevenueByMonth])\nasync def get_revenue_report(\n    start: datetime = Query(...),\n    end: datetime = Query(...),\n    repository: AnalyticsRepository = Depends(get_analytics_repository),\n):\n    if end <= start:\n        raise HTTPException(status_code=400, detail="end must be after start")\n    return await repository.revenue_by_month(start, end)\n```\n\nAPI-shaped example:\n\n```text\nGET /analytics/revenue?start=2026-01-01T00:00:00Z&end=2026-04-01T00:00:00Z\n\n[\n  {"month": "2026-01", "total_revenue": 48250.0, "order_count": 312},\n  {"month": "2026-02", "total_revenue": 51100.5, "order_count": 340},\n  {"month": "2026-03", "total_revenue": 49830.0, "order_count": 298}\n]\n```\n\nWhy `.to_list(length=None)` is SAFE here specifically (unlike the general caution against unbounded `to_list` from an earlier question): the `$match` + `$group` pipeline structurally bounds the result to at most one document PER MONTH in the requested range — a genuinely small, predictable upper bound, regardless of how many underlying `orders` documents were scanned to produce it. This is exactly the kind of case-by-case reasoning ("is this result set structurally bounded, or could it grow unboundedly with the underlying data") that should drive the `to_list` vs `async for` decision, rather than a blanket rule.\n\nThe `$match` stage FIRST in the pipeline (filtering to `status: "paid"` and the date range) is both a correctness requirement and a performance one — it should be backed by a compound index (`{status: 1, placed_at: 1}`) so the aggregation\'s first stage can use an index scan rather than examining every document in a potentially large `orders` collection before the expensive `$group` stage even begins.',
    productionExample:
      'A revenue dashboard originally computed monthly totals by fetching ALL matching order documents into Python and summing them in application code — moving the summation into a `$group` aggregation stage (letting MongoDB do the reduction server-side) cut both the network payload (thousands of documents down to a handful of monthly summary rows) and the total request latency dramatically, especially once the `orders` collection grew past a few hundred thousand documents.',
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
      '```python\nfrom pymongo.errors import ConnectionFailure, OperationFailure\n\nclass OrderService:\n    def __init__(self, client: AsyncIOMotorClient, db: AsyncIOMotorDatabase):\n        self._client = client\n        self._db = db\n\n    async def place_order(self, user_id: ObjectId, items: list[dict]) -> dict:\n        async with await self._client.start_session() as session:\n            async with session.start_transaction():\n                # every operation below MUST pass session=session to participate in the transaction\n                user = await self._db.users.find_one({"_id": user_id}, session=session)\n                if user is None:\n                    raise UserNotFoundError(str(user_id))\n\n                order_items = []\n                total = 0.0\n                for item in items:\n                    product = await self._db.products.find_one({"_id": item["product_id"]}, session=session)\n                    if product is None or product["stock"] < item["quantity"]:\n                        raise InsufficientStockError(item["product_id"])   # raising here ABORTS the whole transaction\n                    order_items.append({"product_id": product["_id"], "quantity": item["quantity"], "unit_price": product["price"]})\n                    total += product["price"] * item["quantity"]\n\n                order_result = await self._db.orders.insert_one(\n                    {"user_id": user_id, "items": order_items, "total": total, "status": "pending"},\n                    session=session,\n                )\n                for item in order_items:\n                    await self._db.products.update_one(\n                        {"_id": item["product_id"]},\n                        {"$inc": {"stock": -item["quantity"]}},\n                        session=session,\n                    )\n                await self._db.payments.insert_one(\n                    {"order_id": order_result.inserted_id, "amount": total, "status": "pending"},\n                    session=session,\n                )\n                # no explicit commit call needed — `session.start_transaction()` commits\n                # automatically on clean exit of the `async with` block, and aborts on ANY exception\n\n            order = await self._db.orders.find_one({"_id": order_result.inserted_id})\n            return order\n```\n\nRaising `InsufficientStockError` (or any exception) INSIDE the `async with session.start_transaction():` block causes MongoDB to ABORT the entire transaction — none of the prior writes within it (the order document, any inventory decrements already applied to OTHER items in the same loop) are persisted, exactly matching the "if credit fails, the whole bank transfer rolls back" semantics established for PostgreSQL in Module 16.\n\nTRANSIENT transaction errors are a genuinely MongoDB-transaction-specific wrinkle worth knowing precisely: a transaction can fail with a `TransientTransactionError` label (e.g. due to a brief replica-set election happening mid-transaction) that is SAFE and CORRECT to simply retry from the beginning — this is different from a hard business-logic failure like `InsufficientStockError`, which should never be retried since retrying would just fail identically. Motor/PyMongo\'s driver exposes a `with_transaction()` convenience helper that handles this retry-on-transient-error logic automatically:\n\n```python\nasync def callback(session):\n    ... # the same operations as above, using session\n\nasync with await client.start_session() as session:\n    await session.with_transaction(callback)   # automatically retries on TransientTransactionError\n```\n\nEvery operation inside the transaction MUST explicitly pass `session=session` — a very easy mistake is forgetting this on even ONE call, which silently executes that operation OUTSIDE the transaction (not participating in the atomicity guarantee at all) rather than raising any obvious error.',
    productionExample:
      'An early implementation of this order-placement flow forgot to pass `session=session` to the `products.update_one` inventory-decrement call — under normal operation this was invisible (the write still succeeded), but during a deliberately-triggered failure test (simulating a payment-creation failure), the inventory decrement was found to have PERSISTED even though the order itself was correctly rolled back, revealing the bug precisely because the transaction\'s all-or-nothing guarantee had been silently broken for that one write.',
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
      '```javascript\n// users — the stable, long-lived collection\ndb.users.createIndex({ email: 1 }, { unique: true })\n\n// refresh_tokens — one document per issued refresh token, auto-expiring\ndb.refresh_tokens.createIndex({ token_hash: 1 }, { unique: true })   // looked up on every refresh request\ndb.refresh_tokens.createIndex({ user_id: 1 })                          // \"revoke all sessions for this user\"\ndb.refresh_tokens.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })   // TTL: MongoDB deletes the document once expires_at is in the past\n\n// password_reset_tokens — single-use, short-lived by design\ndb.password_reset_tokens.createIndex({ token_hash: 1 }, { unique: true })\ndb.password_reset_tokens.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })\n\n// email_verification_tokens — same pattern\ndb.email_verification_tokens.createIndex({ token_hash: 1 }, { unique: true })\ndb.email_verification_tokens.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })\n```\n\n```python\nasync def issue_refresh_token(db: AsyncIOMotorDatabase, user_id: ObjectId) -> str:\n    raw_token = secrets.token_urlsafe(32)\n    await db.refresh_tokens.insert_one({\n        "user_id": user_id,\n        "token_hash": hash_token(raw_token),   # NEVER store the raw token itself, same principle as password hashing\n        "expires_at": datetime.now(timezone.utc) + timedelta(days=30),\n        "created_at": datetime.now(timezone.utc),\n    })\n    return raw_token   # returned to the client ONCE; only the hash is ever persisted\n```\n\nWhy `expireAfterSeconds: 0` on the TTL index (paired with storing an absolute `expires_at` DATE, not a relative duration): this tells MongoDB\'s background TTL monitor thread to delete a document as soon as the CURRENT time passes the value already stored in `expires_at` — the "0" is not "expire after 0 seconds from insertion," it means "expire when `expires_at`\'s own stored timestamp is reached," with the actual expiry moment computed by the application at write time (`now + timedelta(days=30)` above) and stored directly in the field.\n\nA precise, frequently-tested limitation of TTL indexes worth knowing: the MongoDB TTL background monitor runs on a roughly 60-SECOND interval — a document is not guaranteed to be deleted the EXACT instant it expires, only within roughly a minute afterward (this is why "TTL documents not disappearing exactly on schedule" is a real, expected debugging scenario, not a bug, covered in Module 20). Because of this, an application MUST ALSO enforce the expiry check explicitly at read/use time (`if token.expires_at < now(): reject`) — the TTL index is a convenient AUTOMATIC CLEANUP mechanism, not a real-time enforcement guarantee, and relying on it alone for actual security enforcement (rather than storage hygiene) is a mistake.\n\nStoring `token_hash` (never the raw token) mirrors the exact same principle as password hashing from Module 13 — if the `refresh_tokens` collection were ever exposed via a backup leak or injection vulnerability, an attacker with only the hashes cannot reconstruct usable tokens.',
    productionExample:
      'A production auth system relies on the `refresh_tokens` TTL index purely for STORAGE hygiene (automatically pruning millions of expired tokens over time without a manual cron job), while the actual security-critical expiry check happens explicitly in the refresh-token validation code path (`if stored.expires_at < datetime.now(timezone.utc): reject`) — correctly treating the TTL index as "eventually cleans up," not "instantly and reliably enforces."',
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
      '```python\n# CATASTROPHIC — a single sync PyMongo call inside an async endpoint blocks the ENTIRE event loop,\n# freezing every other concurrent request this worker is currently handling, not just this one\n@app.get("/users/{user_id}")\nasync def get_user_BROKEN(user_id: str):\n    sync_client = pymongo.MongoClient(settings.MONGO_URI)   # also re-creates a client per request — doubly wrong\n    return sync_client.shop.users.find_one({"_id": ObjectId(user_id)})   # blocks synchronously\n\n# CORRECT — Motor\'s awaited call yields control back to the event loop while waiting on I/O,\n# letting other concurrent requests make progress during that wait\n@app.get("/users/{user_id}")\nasync def get_user_correct(user_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):\n    return await db.users.find_one({"_id": ObjectId(user_id)})\n```\n\nWhy this specific mistake is so damaging (and easy to make accidentally): a single blocking call inside ONE endpoint does not just slow down that one request — because the ASGI event loop is cooperatively single-threaded per worker (Module 9), a blocking call STOPS the loop from making progress on ANYTHING ELSE until it returns, meaning every other concurrent user hitting completely unrelated endpoints on that same worker process experiences a stall too. This is a much worse failure mode than it would be in a traditional sync-framework (Flask/WSGI) deployment, where each request already has its own dedicated worker thread/process and one slow request does not directly stall unrelated ones.\n\nIf a genuinely blocking/CPU-heavy operation is unavoidable (e.g. calling a legacy sync-only library), the correct escape hatch is running it in a thread pool via `asyncio.to_thread(...)` (or FastAPI\'s `run_in_threadpool`), explicitly moving the blocking work OFF the event loop rather than executing it inline:\n\n```python\nimport asyncio\n\nresult = await asyncio.to_thread(legacy_sync_function, arg1, arg2)\n```\n\nClient sharing: `AsyncIOMotorClient` is explicitly designed and documented to be safe for concurrent use across many simultaneously-running coroutines/requests — it is created ONCE (Module 21\'s connection-management question) and its internal connection pool handles concurrent operations correctly; there is no need (and it would be actively harmful, per the earlier driver-landscape question) to create a new client per request "for safety."\n\nTimeouts/cancellation: an individual Motor operation can be wrapped with `asyncio.wait_for(coro, timeout=...)` to bound how long a single request will wait on a slow query, and FastAPI/Starlette propagates client disconnects as task CANCELLATION — a long-running Motor operation whose surrounding request is cancelled (client disconnected) does not automatically stop querying MongoDB unless the code is structured to respect cancellation, which is worth being deliberate about for genuinely long-running operations (e.g. large aggregations) rather than assuming cancellation "just works" transparently everywhere.',
    productionExample:
      'A production incident traced intermittent, seemingly random latency spikes across UNRELATED endpoints to a single legacy internal endpoint that called a synchronous, blocking third-party SDK method directly inside an `async def` handler — every other request hitting the SAME worker process during that blocking call stalled in lockstep, even though those requests had nothing to do with the slow endpoint; wrapping the blocking call in `asyncio.to_thread(...)` immediately resolved the cross-endpoint stalling.',
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
      '```python\nimport pytest\nimport pytest_asyncio\nfrom httpx import AsyncClient, ASGITransport\nfrom motor.motor_asyncio import AsyncIOMotorClient\n\n# --- fixture: a real, dedicated, disposable test database (dropped after each test) ---\n@pytest_asyncio.fixture\nasync def test_db():\n    client = AsyncIOMotorClient("mongodb://localhost:27017")\n    db = client["test_shop_db"]\n    yield db\n    await client.drop_database("test_shop_db")   # leave no residue between test runs\n    client.close()\n\n# --- repository-level integration test: verifies REAL query behavior against a real database ---\n@pytest.mark.asyncio\nasync def test_user_repository_get_by_email(test_db):\n    repository = UserRepository(test_db)\n    await repository.create({"email": "ada@example.com", "name": "Ada", "status": "active"})\n\n    found = await repository.get_by_email("ada@example.com")\n\n    assert found is not None\n    assert found["name"] == "Ada"\n\n# --- service-level UNIT test: a fake repository, NO database involved at all — fast and isolated ---\nclass FakeUserRepository:\n    def __init__(self):\n        self._users: dict[str, dict] = {}\n\n    async def get_by_email(self, email: str) -> dict | None:\n        return self._users.get(email)\n\n    async def create(self, data: dict) -> dict:\n        self._users[data["email"]] = {**data, "_id": ObjectId()}\n        return self._users[data["email"]]\n\n@pytest.mark.asyncio\nasync def test_register_user_rejects_duplicate_email():\n    service = UserService(FakeUserRepository(), password_hasher=FakeHasher())\n    await service.register_user(UserCreate(email="ada@example.com", name="Ada", password="s3cret123"))\n\n    with pytest.raises(EmailAlreadyRegisteredError):\n        await service.register_user(UserCreate(email="ada@example.com", name="Ada 2", password="another123"))\n\n# --- full API test: FastAPI TestClient + dependency_overrides swapping in the test database ---\n@pytest_asyncio.fixture\nasync def client(test_db):\n    app.dependency_overrides[get_database] = lambda: test_db\n    transport = ASGITransport(app=app)\n    async with AsyncClient(transport=transport, base_url="http://test") as ac:\n        yield ac\n    app.dependency_overrides.clear()\n\n@pytest.mark.asyncio\nasync def test_create_user_endpoint(client):\n    response = await client.post("/users/", json={"email": "grace@example.com", "name": "Grace", "password": "s3cret123"})\n\n    assert response.status_code == 201\n    assert response.json()["email"] == "grace@example.com"\n    assert "password_hash" not in response.json()   # verifies the response schema correctly excludes it\n```\n\nThe test-pyramid reasoning: FAKE-repository unit tests (fastest, no I/O, run in milliseconds) verify business logic/orchestration correctness in the SERVICE layer in isolation; real-test-database repository tests (slower, real I/O) verify that the actual MongoDB QUERIES behave as intended (correct filter shape, correct index usage assumptions, correct handling of edge cases like duplicate keys); full API tests (slowest, exercise the whole stack) verify the ROUTER\'s HTTP-layer behavior (status codes, response schema shape, that sensitive fields are genuinely excluded) end to end. All three layers matter and each catches a DIFFERENT class of bug — relying only on the fastest layer (fakes) would miss real query-shape bugs, while relying only on slow, full end-to-end tests would make the test suite too slow to run frequently and make failures harder to localize.\n\n`app.dependency_overrides[get_database] = lambda: test_db` is the exact same FastAPI testing mechanism established generally in Module 12 — swapping the production database dependency for the disposable test database, with no change needed to the application code itself.',
    productionExample:
      'A team\'s CI pipeline runs the fake-repository unit test suite (hundreds of tests, completing in a few seconds) on EVERY commit, while the slower real-MongoDB repository/API integration test suite (spinning up a dockerized test MongoDB instance) runs on every pull request before merge — a tiered strategy that gives fast feedback for the common case while still catching real query-behavior regressions before they reach production.',
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
      '```text\n                    Client\n                       |\n                  Load Balancer\n                       |\n              +--------+--------+\n              |                 |\n          FastAPI 1         FastAPI 2      (stateless — any instance can serve any request)\n              |                 |\n              +--------+--------+\n                       |\n                    Redis           (cache-aside for hot reads; also useful for rate limiting / session data)\n                       |\n                    MongoDB\n                       |\n                  Replica Set        (Primary + Secondaries — durability + read scaling + automatic failover)\n                       |\n              Background Workers    (change-stream consumers, scheduled jobs, email/notification processing)\n```\n\n```text\napp/\n├── main.py                    — creates the FastAPI() app, registers routers/middleware/exception handlers\n├── config/\n│   ├── settings.py            — Pydantic Settings: MONGO_URI, pool sizes, JWT secret, all from environment\n│   └── logging.py             — structured logging configuration\n├── api/\n│   ├── dependencies.py        — get_database, get_current_user, shared Depends() providers\n│   └── v1/\n│       ├── users.py           — ROUTER: HTTP concerns only, one file per resource\n│       ├── products.py\n│       └── orders.py\n├── schemas/                   — Pydantic models: UserCreate/UserUpdate/UserResponse/UserInDB, PyObjectId, etc.\n│   ├── user.py\n│   ├── product.py\n│   └── order.py\n├── services/                  — business logic + orchestration, one class per resource/domain area\n│   ├── user_service.py\n│   ├── product_service.py\n│   └── order_service.py\n├── repositories/               — the ONLY layer that talks to Motor collections directly\n│   ├── user_repository.py\n│   ├── product_repository.py\n│   └── order_repository.py\n├── database/\n│   └── mongodb.py              — AsyncIOMotorClient creation, lifespan wiring, index setup on startup\n├── security/\n│   ├── auth.py                 — password hashing, get_current_user dependency\n│   └── jwt.py                  — token issuance/verification\n├── exceptions/\n│   └── handlers.py              — the centralized exception -> HTTP status code mapping\n├── middleware/\n│   ├── logging.py                — structured request logging\n│   └── request_id.py             — correlation id propagation\n└── tests/\n    ├── unit/                      — fake-repository service tests (fast, no database)\n    └── integration/               — real-test-database repository + full API tests\n```\n\nWhy every FastAPI instance is STATELESS (no in-memory session data, no per-instance caching that other instances do not share): this is the exact same reasoning established for HTTP statelessness generally back in Module 9 — any instance behind the load balancer can serve any request, which is what makes horizontal scaling (adding FastAPI 3, 4, 5...) trivially safe with zero session-affinity configuration required.\n\nWhy MongoDB is deployed as a REPLICA SET even before any sharding need arises: a replica set (Primary + at least two Secondaries, detailed in Module 20) gives automatic failover if the primary becomes unavailable and durability against single-node data loss — running a single standalone `mongod` in production has NO such protection and should be considered a development-only configuration, never a production one, regardless of how small the current data volume is.\n\nWHY this directory structure specifically mirrors the FastAPI+SQLAlchemy structure from Module 17: the layering PRINCIPLE (router -> service -> repository -> driver -> database) is entirely database-agnostic — the exact same architectural discipline applies whether the underlying store is PostgreSQL+SQLAlchemy or MongoDB+Motor, which is precisely why a team building a POLYGLOT system (Module 20\'s PostgreSQL-vs-MongoDB comparison) can reuse the same service/router conventions across both kinds of backing repositories.',
    productionExample:
      'A team migrating from a single-instance, single-`mongod` prototype to production deliberately introduced a MongoDB replica set and a Redis cache-aside layer BEFORE the first real launch, specifically because retrofitting replica-set failover and caching into an already-live system under real traffic is considerably riskier and more disruptive than provisioning them correctly from day one.',
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
      '```python\n# schemas/user.py\nfrom typing import Annotated, Any\nfrom datetime import datetime, timezone\nfrom bson import ObjectId\nfrom pydantic import BaseModel, EmailStr, Field, GetCoreSchemaHandler\nfrom pydantic_core import core_schema\n\nclass _ObjectIdAnnotation:\n    @classmethod\n    def __get_pydantic_core_schema__(cls, source_type: Any, handler: GetCoreSchemaHandler):\n        def validate(v: Any) -> ObjectId:\n            if isinstance(v, ObjectId):\n                return v\n            if isinstance(v, str) and ObjectId.is_valid(v):\n                return ObjectId(v)\n            raise ValueError("Invalid ObjectId")\n        return core_schema.no_info_plain_validator_function(\n            validate, serialization=core_schema.plain_serializer_function_ser_schema(str)\n        )\n\nPyObjectId = Annotated[ObjectId, _ObjectIdAnnotation]\n\nclass UserCreate(BaseModel):\n    email: EmailStr\n    name: str\n    password: str = Field(min_length=8)\n\nclass UserResponse(BaseModel):\n    id: str\n    email: EmailStr\n    name: str\n    status: str\n\n    @classmethod\n    def from_db(cls, doc: dict) -> "UserResponse":\n        return cls(id=str(doc["_id"]), email=doc["email"], name=doc["name"], status=doc["status"])\n\nclass UserListResponse(BaseModel):\n    items: list[UserResponse]\n    next_cursor: str | None\n\n# repositories/user_repository.py\nfrom motor.motor_asyncio import AsyncIOMotorDatabase\n\nclass UserRepository:\n    def __init__(self, db: AsyncIOMotorDatabase):\n        self._c = db["users"]\n\n    async def create(self, doc: dict) -> dict:\n        result = await self._c.insert_one(doc)\n        return await self._c.find_one({"_id": result.inserted_id})\n\n    async def get_by_email(self, email: str) -> dict | None:\n        return await self._c.find_one({"email": email, "is_deleted": {"$ne": True}})\n\n    async def get_by_id(self, user_id: ObjectId) -> dict | None:\n        return await self._c.find_one({"_id": user_id, "is_deleted": {"$ne": True}})\n\n    async def list(self, after_id: ObjectId | None, limit: int) -> list[dict]:\n        query: dict = {"is_deleted": {"$ne": True}}\n        if after_id:\n            query["_id"] = {"$gt": after_id}\n        return await self._c.find(query).sort("_id", 1).limit(limit).to_list(length=limit)\n\n    async def soft_delete(self, user_id: ObjectId) -> bool:\n        result = await self._c.update_one(\n            {"_id": user_id}, {"$set": {"is_deleted": True, "deleted_at": datetime.now(timezone.utc)}}\n        )\n        return result.matched_count == 1\n\n# services/user_service.py\nclass EmailAlreadyRegisteredError(Exception): ...\nclass UserNotFoundError(Exception): ...\n\nclass UserService:\n    def __init__(self, repository: UserRepository, hasher):\n        self._repository = repository\n        self._hasher = hasher\n\n    async def register(self, payload: UserCreate) -> dict:\n        if await self._repository.get_by_email(payload.email):\n            raise EmailAlreadyRegisteredError(payload.email)\n        doc = {\n            "email": payload.email, "name": payload.name,\n            "password_hash": self._hasher.hash(payload.password),\n            "status": "active", "created_at": datetime.now(timezone.utc),\n        }\n        return await self._repository.create(doc)\n\n    async def get(self, user_id: str) -> dict:\n        if not ObjectId.is_valid(user_id):\n            raise UserNotFoundError(user_id)\n        user = await self._repository.get_by_id(ObjectId(user_id))\n        if user is None:\n            raise UserNotFoundError(user_id)\n        return user\n\n    async def list(self, after_id: str | None, limit: int) -> tuple[list[dict], str | None]:\n        cursor = ObjectId(after_id) if after_id and ObjectId.is_valid(after_id) else None\n        docs = await self._repository.list(cursor, limit)\n        next_cursor = str(docs[-1]["_id"]) if len(docs) == limit else None\n        return docs, next_cursor\n\n    async def delete(self, user_id: str) -> None:\n        user = await self.get(user_id)   # raises UserNotFoundError if missing/malformed\n        await self._repository.soft_delete(user["_id"])\n\n# api/v1/users.py\nrouter = APIRouter(prefix="/users", tags=["Users"])\n\n@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\nasync def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)):\n    try:\n        doc = await service.register(payload)\n    except EmailAlreadyRegisteredError:\n        raise HTTPException(status_code=409, detail="Email already registered")\n    return UserResponse.from_db(doc)\n\n@router.get("/", response_model=UserListResponse)\nasync def list_users(\n    after: str | None = Query(None), limit: int = Query(20, ge=1, le=100),\n    service: UserService = Depends(get_user_service),\n):\n    docs, next_cursor = await service.list(after, limit)\n    return UserListResponse(items=[UserResponse.from_db(d) for d in docs], next_cursor=next_cursor)\n\n@router.get("/{user_id}", response_model=UserResponse)\nasync def get_user(user_id: str, service: UserService = Depends(get_user_service)):\n    try:\n        doc = await service.get(user_id)\n    except UserNotFoundError:\n        raise HTTPException(status_code=404, detail="User not found")\n    return UserResponse.from_db(doc)\n\n@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)\nasync def delete_user(user_id: str, service: UserService = Depends(get_user_service)):\n    try:\n        await service.delete(user_id)\n    except UserNotFoundError:\n        raise HTTPException(status_code=404, detail="User not found")\n```\n\nAPI-shaped example, end to end:\n\n```text\nPOST /users/  {"email": "ada@example.com", "name": "Ada", "password": "s3cret123"}\n-> 201 {"id": "65f1...", "email": "ada@example.com", "name": "Ada", "status": "active"}\n\nGET /users/?limit=1\n-> 200 {"items": [{"id": "65f1...", ...}], "next_cursor": "65f1..."}\n\nGET /users/not-a-real-id\n-> 404 {"detail": "User not found"}   (UserService.get treats a malformed id the same as \"not found\")\n```',
    productionExample:
      'This exact trio — repository/service/router, with soft delete, cursor pagination, and schema separation all composed together — is the concrete, runnable shape every individual technique in this module (Pydantic+ObjectId, repository pattern, service layer, error handling, pagination) was building toward; a real production `users` resource looks almost exactly like this, with the addition of authentication dependencies (Module 13) and the auth-token collections (the auth data modeling question) layered on top.',
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
