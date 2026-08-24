// Python + DSA Interview Handbook — Module 12: FastAPI Dependency Injection.
// Hand-authored technical questions covering Depends()-based dependency
// injection: database session dependencies, layered authentication/
// authorization dependencies, nested dependency graphs, dependency
// overrides for testing, class-based dependencies, and the yield-based
// dependency lifecycle — with genuine FastAPI code and request-flow
// examples. Mirrors the MockTechnicalQuestion shape defined in
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
    id: 'python-m12-1',
    number: 'PY-M12-1',
    title: 'What dependency injection is, and why FastAPI builds it in via Depends()',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Dependency Injection Fundamentals',
    expectedAnswer:
      'Dependency injection means an endpoint DECLARES what it needs (a DB session, the current user, pagination params) as parameters, and the FRAMEWORK is responsible for constructing and supplying those values before the endpoint runs — instead of the endpoint function reaching out and constructing them itself. `Depends(callable)` is FastAPI\'s mechanism for this: it inspects the callable\'s own signature (which may itself use `Depends`, recursively), resolves the whole graph, and injects the results as arguments.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI\n\napp = FastAPI()\n\n# WITHOUT dependency injection — every endpoint manually constructs what it needs\n@app.get("/without-di")\nasync def without_di():\n    db = connect_to_database()   # endpoint owns construction, teardown, and error handling\n    try:\n        return db.query_something()\n    finally:\n        db.close()\n\n# WITH dependency injection — the endpoint just DECLARES what it needs\ndef get_db():\n    db = connect_to_database()\n    try:\n        yield db\n    finally:\n        db.close()\n\n@app.get("/with-di")\nasync def with_di(db=Depends(get_db)):\n    return db.query_something()\n```\n\nThe practical payoff is threefold: REUSE (`get_db` is written once, referenced by every endpoint that needs a session, instead of copy-pasted connect/close boilerplate everywhere), TESTABILITY (a test can swap `get_db` for an in-memory fake via `app.dependency_overrides` without touching endpoint code — see the dedicated question on this), and DECLARATIVE DOCUMENTATION (an endpoint\'s signature alone tells you everything it depends on — DB access, auth requirements, pagination — without reading its body).\n\n`Depends()` accepts ANY callable: a plain function, a class (FastAPI calls it, and `__init__` parameters are themselves resolved as dependencies), or a bound method. FastAPI resolves the dependency by calling it (or iterating it, for generator/yield dependencies) with its OWN parameters supplied recursively the same way — this is what makes NESTED dependency graphs (a dependency that itself depends on another dependency) work automatically.',
    productionExample:
      'A production FastAPI codebase typically has a small library of shared dependencies (`get_db`, `get_current_user`, `get_settings`, `PaginationParams`) defined once in `app/api/dependencies.py` and referenced via `Depends(...)` across dozens of endpoints — changing how the database session is constructed (e.g. switching connection pooling strategy) means editing ONE function, not every endpoint that touches the database.',
    bestPractices: [
      'Extract anything an endpoint needs but does not itself construct (DB session, current user, shared config, pagination params) into a `Depends()`-based dependency rather than inlining setup logic in the endpoint body.',
      'Keep dependency functions small and single-purpose (one thing: "give me a DB session", "give me the current user") so they compose cleanly into larger dependency chains.',
      'Name dependency functions descriptively (`get_current_user`, `get_db`) since the name is what shows up in stack traces and, implicitly, in how readable the endpoint signature is.',
    ],
    tradeOffs:
      'Dependency injection adds a small layer of indirection (you must trace `Depends(get_db)` to `get_db`\'s definition to see what actually happens) compared to inline construction, but this is a clear net win once more than a couple of endpoints share the same setup/teardown logic — the alternative is copy-pasted boilerplate that drifts out of sync across endpoints over time.',
    commonMistakes: [
      'Manually constructing resources (DB connections, HTTP clients) inside endpoint bodies instead of extracting them into a reusable dependency, leading to duplicated and inconsistent setup/teardown logic.',
      'Believing `Depends()` requires a class or special FastAPI base type — any plain callable works, including simple functions and lambdas (though named functions are far more readable and testable).',
      'Not realizing dependency parameters are resolved the SAME way as endpoint parameters (path/query/body validation all apply inside a dependency function too), so a dependency can itself validate query parameters just like an endpoint can.',
    ],
    followUpQuestions: [
      'What is the practical difference between putting shared logic in a dependency versus a plain helper function called manually inside the endpoint?',
      'Can a dependency function accept path or query parameters, and how does FastAPI know where those values come from?',
      'How does FastAPI decide the order in which nested dependencies are resolved?',
    ],
    relatedTopics: ['Dependency Injection', 'Depends', 'FastAPI Architecture', 'Testability', 'Code Reuse'],
  },
  {
    id: 'python-m12-2',
    number: 'PY-M12-2',
    title: 'The get_db() yield-dependency pattern: request -> session -> endpoint -> guaranteed cleanup',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Database Dependencies',
    expectedAnswer:
      'A "yield dependency" (a generator function used with `Depends`) lets FastAPI run setup code before the endpoint and teardown code after the response has been built, functioning like a context manager for the request\'s lifetime. The standard `get_db()` pattern opens a database session, `yield`s it to the endpoint, and closes it in a `finally` block — guaranteeing the session is released even if the endpoint raises an exception.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI\nfrom sqlalchemy.orm import sessionmaker, Session\nfrom sqlalchemy import create_engine\n\nengine = create_engine("postgresql://user:pass@localhost/db")\nSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db          # (1) control passes to the endpoint here, with `db` as the value\n    finally:\n        db.close()         # (3) runs AFTER the endpoint returns/raises — cleanup is guaranteed\n\napp = FastAPI()\n\n@app.get("/users/{user_id}")\ndef get_user(user_id: int, db: Session = Depends(get_db)):\n    # (2) endpoint body runs here, using the yielded session\n    user = db.query(User).filter(User.id == user_id).first()\n    if user is None:\n        raise HTTPException(404, "User not found")   # even on this raise, (3) still runs\n    return user\n```\n\nWhy `finally` (not just code after the `try` block) is essential: if the endpoint body raises (a business-logic error, an unexpected bug, or an `HTTPException`), execution unwinds back through the `yield` point as an exception INSIDE the generator — without `finally`, `db.close()` would be skipped entirely, leaking the connection back to the pool as "still checked out," which under sustained traffic exhausts the connection pool (see the connection-pool-exhaustion debugging scenario in Module 14).\n\nThe execution order is precise and worth stating explicitly in an interview: (1) FastAPI calls `get_db()`, which is a generator — calling it does not run any code yet, it returns a generator object; FastAPI then advances it to the first `yield`, which DOES run the `db = SessionLocal()` line and pauses at `yield db`; (2) the yielded `db` value is injected into the endpoint, which runs to completion (or raises); (3) FastAPI resumes the generator (either by calling `next()` again on success, or via `.throw()` if the endpoint raised), which runs the `finally: db.close()` block.',
    productionExample:
      'Every production FastAPI service with a relational database uses exactly this `get_db()` yield-dependency pattern (or an async equivalent with `AsyncSession`) — it is the single most copy-pasted piece of FastAPI boilerplate precisely because it correctly solves "one session per request, always released" with almost no code, which is why understanding WHY it works (not just how to write it) is a strong signal in a senior interview.',
    bestPractices: [
      'Always release request-scoped resources (DB sessions, file handles, HTTP client connections) in a `finally` block inside a yield dependency, never just as code after `yield` with no exception handling.',
      'Keep one session per REQUEST (not per query) — pass the same `db` dependency into every function within a request that needs it, rather than opening multiple sessions.',
      'For async database drivers, use the async equivalent (`async def get_db(): ... yield session ...` with `AsyncSession`) so the session lifecycle does not block the event loop.',
    ],
    tradeOffs:
      'Yield dependencies add slightly more code than a plain `return`-based dependency, but are the ONLY correct way to guarantee cleanup runs regardless of how the endpoint terminates — a `Depends(lambda: SessionLocal())` with no yield/finally would leak a session on every exception, which is a real production connection-pool-exhaustion bug waiting to happen.',
    commonMistakes: [
      'Using a plain `return db` dependency (no `yield`/`finally`) for a resource that needs cleanup, silently leaking it whenever the endpoint raises.',
      'Opening a NEW database session inside the endpoint body (or inside a nested function) instead of reusing the one injected via `Depends(get_db)`, defeating the "one session per request" guarantee and risking inconsistent reads within a single request.',
      'Forgetting that code after `yield` in the generator runs even on the HAPPY path (not just on error) — it always runs exactly once per request, right after the endpoint (and any response-model serialization for a returned ORM object) completes.',
    ],
    followUpQuestions: [
      'What specifically happens to the connection pool if `db.close()` is skipped on every request that raises an exception?',
      'How would you additionally commit or rollback a transaction in this pattern, and where exactly would that code go?',
      'Why is `yield` needed at all — why can\'t a dependency just return the session and rely on garbage collection to eventually close it?',
    ],
    relatedTopics: ['Yield Dependencies', 'Database Sessions', 'SQLAlchemy', 'Resource Cleanup', 'Connection Pooling'],
  },
  {
    id: 'python-m12-3',
    number: 'PY-M12-3',
    title: 'Layered authentication dependencies: get_current_user -> get_current_active_user -> get_current_admin',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Authentication Dependencies',
    expectedAnswer:
      'A layered chain of small, composable dependencies — each one BUILDING on the previous via its own `Depends()` — lets you express increasingly specific authorization requirements without duplicating logic: `get_current_user` extracts and validates identity from a token, `get_current_active_user` additionally checks the account is not disabled, and `get_current_admin` additionally checks a role, each layer simply depending on (and reusing) the one below it.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\n\noauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")\napp = FastAPI()\n\ndef get_current_user(token: str = Depends(oauth2_scheme)) -> "User":\n    user = decode_and_load_user(token)   # raises HTTPException(401) internally on a bad/expired token\n    if user is None:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid authentication credentials")\n    return user\n\ndef get_current_active_user(user: "User" = Depends(get_current_user)) -> "User":\n    if not user.is_active:\n        raise HTTPException(status.HTTP_403_FORBIDDEN, "Inactive user")\n    return user\n\ndef get_current_admin(user: "User" = Depends(get_current_active_user)) -> "User":\n    if user.role != "admin":\n        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin privileges required")\n    return user\n\n@app.get("/profile")\ndef read_profile(user: "User" = Depends(get_current_active_user)):\n    return {"email": user.email}\n\n@app.delete("/users/{user_id}")\ndef delete_user(user_id: int, admin: "User" = Depends(get_current_admin)):\n    ...   # only reached if the token is valid AND the account is active AND the role is admin\n```\n\nWhat makes this pattern powerful is that each layer FAILS FAST and short-circuits: if `get_current_user` raises 401 (bad token), `get_current_active_user` and `get_current_admin` never even execute — the exception propagates immediately, so `delete_user` never gets a chance to run with an unauthenticated caller. Each endpoint then simply picks the LAYER of the chain matching what it needs, without re-implementing token decoding or active-status checks — `read_profile` needs only "logged in and active", `delete_user` needs the full admin chain.\n\nThis composability is the key interview insight: you are not writing one big monolithic "check everything" function per protected endpoint — you are building a small vocabulary of reusable checks and composing them per-endpoint via which dependency you choose to depend on.',
    productionExample:
      'A production FastAPI admin panel API exposes `Depends(get_current_active_user)` on ordinary user-facing endpoints and `Depends(get_current_admin)` on destructive/administrative ones (user deletion, refunds, feature-flag toggles) — the SAME token-decoding and active-status logic is reused everywhere via the shared chain, so a bug fix in token validation (e.g. handling a new claim) is made once and applies uniformly across the entire authorization surface.',
    bestPractices: [
      'Build authorization checks as a CHAIN of small, single-purpose dependencies (identity -> active status -> role) rather than one large function repeating logic for every combination of requirements.',
      'Fail with the most SPECIFIC applicable status code at each layer (401 for missing/invalid credentials, 403 for authenticated-but-not-allowed) rather than collapsing everything to a generic 401 or 403.',
      'Let each endpoint depend on the LOWEST layer of the chain that satisfies its actual requirement, rather than always depending on the strictest (e.g. do not require `get_current_admin` on an endpoint that only needs "any authenticated user").',
    ],
    tradeOffs:
      'A layered dependency chain trades a small amount of indirection (tracing through several small functions to understand full authorization requirements for the strictest endpoints) for eliminating duplicated auth logic and making each endpoint\'s EXACT authorization requirement visible and self-documenting directly in its signature.',
    commonMistakes: [
      'Duplicating "is the user active" and "is the user an admin" checks inline inside individual endpoints instead of composing them through a shared dependency chain, causing drift when the logic needs to change.',
      'Returning 401 for an authorization failure (user IS authenticated but lacks the required role) instead of 403, conflating "who are you" failures with "you are not allowed to do this" failures.',
      'Forgetting that a chain like this executes top-to-bottom on EVERY matching request — an expensive check placed too early in the chain (e.g. a slow DB lookup in `get_current_user`) affects every endpoint that depends on it, even lightweight ones.',
    ],
    followUpQuestions: [
      'How would you add a fourth layer for "must own this specific resource" (e.g. only the order\'s owner or an admin can view it) on top of this chain?',
      'Why does raising an exception INSIDE a dependency stop the rest of the dependency graph and the endpoint from running at all?',
      'How would you avoid re-querying the database for the same user if both `get_current_active_user` and a resource-ownership dependency both need the current user in the same request?',
    ],
    relatedTopics: ['Authentication', 'Authorization', 'Dependency Chains', 'OAuth2PasswordBearer', 'RBAC'],
  },
  {
    id: 'python-m12-4',
    number: 'PY-M12-4',
    title: 'Nested dependency graphs and per-request dependency caching',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Nested Dependencies',
    expectedAnswer:
      'When a dependency itself depends on another dependency (via its own `Depends()` parameters), FastAPI resolves the whole graph depth-first, starting from the deepest/leaf dependencies and working back up to the endpoint. By default, FastAPI CACHES the result of each dependency callable for the lifetime of a single request — so if two different branches of the graph both depend on the same underlying dependency (e.g. both `get_current_user` and a separate permission check both need `get_db`), that shared dependency executes only ONCE per request, and both branches receive the same cached result.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\n\napp = FastAPI()\n\ndef get_db():\n    print("get_db called")\n    return "db-session"\n\ndef get_current_user(db=Depends(get_db)):\n    print("get_current_user called")\n    return {"id": 1, "role": "editor"}\n\ndef require_permission(resource: str):\n    def checker(\n        user=Depends(get_current_user),\n        db=Depends(get_db),          # same underlying dependency as inside get_current_user\n    ):\n        print("permission checker called")\n        if resource not in PERMISSIONS.get(user["role"], []):\n            raise HTTPException(status.HTTP_403_FORBIDDEN, f"Missing permission for {resource}")\n        return user\n    return checker\n\nPERMISSIONS = {"editor": ["posts:write"]}\n\n@app.post("/posts")\ndef create_post(user=Depends(require_permission("posts:write"))):\n    return {"author": user["id"]}\n\n# Calling POST /posts prints, in order:\n# get_db called                <- resolved once\n# get_current_user called      <- depends on the already-resolved get_db\n# permission checker called    <- reuses the CACHED get_db result, does not call it again\n```\n\nThe resolution order is depth-first: FastAPI walks `create_post`\'s parameters, finds `require_permission(...)`\'s returned `checker`, sees IT depends on `get_current_user` and `get_db`, recurses into `get_current_user` first (since it is declared first), which itself depends on `get_db` — resolving `get_db` there. When the resolver later reaches `checker`\'s own `get_db` parameter, it recognizes the SAME callable was already resolved this request and reuses the cached value instead of calling `get_db` again.\n\nThis caching is not just a performance optimization — it is a CORRECTNESS guarantee: if `get_db` were called twice, `get_current_user` and `checker` could end up operating on two DIFFERENT database sessions/transactions within the same logical request, which could produce inconsistent reads or, with a session that has pending uncommitted writes, one branch simply not seeing the other\'s in-flight changes. `Depends(fn, use_cache=False)` explicitly opts OUT of this caching for the rare case where you genuinely need a fresh call (e.g. a dependency that must re-check something dynamic even within the same request).',
    productionExample:
      'A production endpoint that depends on both `get_current_user` (for identity) and a separate `check_rate_limit` dependency (for throttling) — where BOTH internally depend on the same Redis client dependency — relies on per-request caching to guarantee only one Redis client/connection is checked out per request, rather than one per dependency that happens to need it.',
    bestPractices: [
      'Design shared, low-level dependencies (`get_db`, `get_redis`, `get_settings`) to be safely reusable across multiple branches of a request\'s dependency graph, relying on FastAPI\'s per-request caching rather than manually threading the same value through every function signature.',
      'Only use `Depends(fn, use_cache=False)` when a dependency has an intentional, understood reason to run multiple times per request — treat it as an explicit, rare opt-out, not a default.',
      'When debugging unexpected dependency call counts, add a print/log statement inside the dependency itself — the CALL COUNT is the most reliable way to verify caching behavior empirically rather than reasoning about it abstractly.',
    ],
    tradeOffs:
      'Per-request dependency caching is the correct default for consistency (one shared DB session/config per request) but means a dependency with SIDE EFFECTS beyond returning a value (e.g. a rate-limit-incrementing dependency) must be deliberately placed and reasoned about carefully — depending on it from two different branches of the same request graph increments the counter only ONCE (from caching), which is very likely the desired behavior, but is easy to get wrong if not understood.',
    commonMistakes: [
      'Assuming a dependency referenced from two different places in the same request runs (and has its side effects applied) twice, when by default it runs exactly once and the second reference reuses the cached result.',
      'Passing `use_cache=False` reflexively "to be safe" without understanding what invalidating the cache would actually change/break for dependencies further down the graph that also rely on the cached value.',
      'Not realizing dependency resolution order is DEPTH-FIRST based on declaration order, leading to confusion about which dependency\'s print/log statements should appear first when debugging.',
    ],
    followUpQuestions: [
      'What would break, concretely, if `get_db` were called twice within the same request and each call opened a genuinely separate database connection?',
      'How would you design a rate-limiting dependency so it is guaranteed to run exactly once per request even if referenced from multiple places in the dependency graph?',
      'Is dependency caching scoped per-request only, or does it ever persist across multiple requests — and why does that scoping matter?',
    ],
    relatedTopics: ['Dependency Injection', 'Nested Dependencies', 'Dependency Caching', 'use_cache', 'Request Scope'],
  },
  {
    id: 'python-m12-5',
    number: 'PY-M12-5',
    title: 'Dependency overrides for testing: swapping the database and auth in tests',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Dependency Overrides',
    expectedAnswer:
      '`app.dependency_overrides` is a dict mapping an original dependency callable to a REPLACEMENT callable — FastAPI checks this dict before resolving any dependency, so tests can swap out `get_db` for an in-memory/test-database session, or `get_current_user` for a fake authenticated user, without touching any endpoint or route code. This is the primary mechanism that makes FastAPI endpoints unit-testable in isolation from real infrastructure.',
    deepExplanation:
      '```python\n# app/dependencies.py\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\ndef get_current_user(token: str = Depends(oauth2_scheme)):\n    return decode_and_load_user(token)\n\n# tests/test_users.py\nimport pytest\nfrom fastapi.testclient import TestClient\nfrom app.main import app\nfrom app.dependencies import get_db, get_current_user\n\ndef override_get_db():\n    db = TestingSessionLocal()   # points at an isolated test/SQLite database\n    try:\n        yield db\n    finally:\n        db.close()\n\ndef override_get_current_user():\n    return {"id": 1, "email": "test@example.com", "role": "admin"}   # no real token needed\n\napp.dependency_overrides[get_db] = override_get_db\napp.dependency_overrides[get_current_user] = override_get_current_user\n\nclient = TestClient(app)\n\ndef test_create_post_as_authenticated_user():\n    response = client.post("/posts", json={"title": "Hello"})\n    assert response.status_code == 201\n    assert response.json()["author"] == 1\n\n# cleanup — restore real dependencies for tests that need them, or clear after the whole module\n@pytest.fixture(autouse=True)\ndef _clear_overrides():\n    yield\n    app.dependency_overrides.clear()\n```\n\nThe override dict works at the level of the CALLABLE OBJECT, not by name — `app.dependency_overrides[get_db] = override_get_db` means "wherever any endpoint\'s dependency graph references THIS exact `get_db` function object, substitute `override_get_db` instead", which is why you must import the exact same function object the app uses, not redefine an unrelated function with the same name.\n\nThe override applies for the LIFETIME of the `app` object (typically for the whole test session/module) until explicitly cleared — which is why `app.dependency_overrides.clear()` in a fixture teardown (or scoping overrides per-test) matters: leaving a stale override in place can silently make unrelated later tests pass against fake data instead of the real dependency, masking bugs.',
    productionExample:
      'A production FastAPI test suite typically sets up ONE shared `override_get_db` pointing at a throwaway SQLite (or a dedicated test Postgres schema, reset between tests) in a `conftest.py` fixture, and additionally provides per-test `override_get_current_user` variants (regular user, admin, unauthenticated) to exercise every authorization branch of an endpoint without needing to mint real JWTs in every single test.',
    bestPractices: [
      'Import and override the EXACT dependency function object the application code uses — the override dict is keyed by object identity, not by name/string.',
      'Clear `app.dependency_overrides` after each test (or scope it tightly with a fixture) to avoid one test\'s fake dependencies silently leaking into unrelated later tests.',
      'Use dependency overrides to test authorization branches directly (override `get_current_user` to return a non-admin user and assert a 403) rather than trying to mint real tokens for every permission combination.',
    ],
    tradeOffs:
      'Dependency overrides let you test endpoint logic (routing, validation, response shape, authorization branching) in complete isolation from real infrastructure — fast, deterministic, no network — at the cost of NOT exercising the real dependency implementation itself (a bug specifically inside the real `get_db` connection logic, for instance, would not be caught by tests that always override it); a healthy test suite therefore also needs a smaller set of integration tests against the REAL dependencies.',
    commonMistakes: [
      'Forgetting to clear overrides between tests, causing one test\'s fake `get_current_user` to silently bleed into a later test that assumed real authentication was in effect.',
      'Overriding a dependency by redefining a same-named function in the test file instead of importing and overriding the actual object the app references, resulting in the override silently having no effect.',
      'Relying ONLY on overridden-dependency unit tests with no integration test coverage of the real `get_db`/`get_current_user` implementations, missing bugs that live specifically in that real infrastructure code.',
    ],
    followUpQuestions: [
      'Why does `app.dependency_overrides` need to be keyed by the function object rather than a string name?',
      'How would you structure fixtures so different tests can use different overridden users (regular vs admin) without manually managing the override dict in every test function?',
      'What kinds of bugs can dependency-override-based unit tests never catch, and how do you cover those with a smaller set of integration tests?',
    ],
    relatedTopics: ['Testing', 'dependency_overrides', 'TestClient', 'pytest', 'Mocking'],
  },
  {
    id: 'python-m12-6',
    number: 'PY-M12-6',
    title: 'Class-based dependencies: a callable PermissionChecker and Pagination class',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Class-Based Dependencies',
    expectedAnswer:
      'FastAPI can use any CALLABLE as a dependency, including a class — `Depends(SomeClass)` calls `SomeClass()` (its `__init__` parameters are resolved as dependencies, exactly like a function\'s), and if the class instance is itself callable (defines `__call__`), an INSTANCE of the class (constructed with fixed configuration, e.g. `PermissionChecker(["posts:write"])`) can be used as `Depends(...)` directly, with `__call__`\'s parameters resolved per-request the same way a function\'s would be.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI, HTTPException, Query, status\n\napp = FastAPI()\n\nclass PermissionChecker:\n    """Configured ONCE per required-permission set, reused across many endpoints."""\n    def __init__(self, required_permissions: list[str]):\n        self.required_permissions = required_permissions   # fixed at construction time, not per-request\n\n    def __call__(self, user=Depends(get_current_active_user)):\n        # this part runs PER REQUEST, with `user` resolved fresh (or cached) each time\n        user_permissions = PERMISSIONS.get(user["role"], [])\n        missing = set(self.required_permissions) - set(user_permissions)\n        if missing:\n            raise HTTPException(status.HTTP_403_FORBIDDEN, f"Missing permissions: {missing}")\n        return user\n\nrequire_write = PermissionChecker(["posts:write"])   # instance built once, at import time\nrequire_delete = PermissionChecker(["posts:delete"])\n\n@app.post("/posts")\ndef create_post(user=Depends(require_write)):\n    ...\n\n@app.delete("/posts/{post_id}")\ndef delete_post(post_id: int, user=Depends(require_delete)):\n    ...\n\nclass Pagination:\n    """Class-based dependency with its OWN Depends()-resolved parameters, like a function would have."""\n    def __init__(\n        self,\n        page: int = Query(1, ge=1),\n        limit: int = Query(20, ge=1, le=100),\n        sort_by: str = Query("id"),\n    ):\n        self.page = page\n        self.limit = limit\n        self.sort_by = sort_by\n        self.offset = (page - 1) * limit\n\n@app.get("/posts")\ndef list_posts(pagination: Pagination = Depends(Pagination)):\n    return {"page": pagination.page, "offset": pagination.offset, "sort_by": pagination.sort_by}\n```\n\nTwo distinct patterns shown here, worth distinguishing precisely: `Depends(Pagination)` uses the CLASS itself — FastAPI calls `Pagination(page=..., limit=..., sort_by=...)`, with those parameters resolved from the query string exactly as they would be for a plain function\'s parameters, giving you a typed, reusable, auto-validated "bag of query params" object instead of three separate loose parameters repeated on every list endpoint. `Depends(require_write)` uses an INSTANCE, pre-configured with fixed constructor arguments (`["posts:write"]`) at IMPORT time — the instance\'s `__call__` method is what actually runs per-request, letting you PARAMETERIZE a reusable dependency (different required-permission sets) without writing a separate function for every permission combination.',
    productionExample:
      'A production FastAPI codebase with many list endpoints (`GET /posts`, `GET /users`, `GET /orders`) typically defines ONE `Pagination` (or `CommonQueryParams`) class-based dependency reused across all of them, and a parameterized `PermissionChecker`/`RoleChecker` class instantiated once per required permission/role set — both patterns avoid either repeating three loose query parameters everywhere, or writing a near-duplicate permission-check function for every distinct role requirement.',
    bestPractices: [
      'Use a class-based dependency (like `Pagination`) whenever several related query/header parameters are repeated together across multiple endpoints, to get a single typed object instead of N loose parameters.',
      'Use a PARAMETERIZED class instance (constructed once with fixed config, like `PermissionChecker(["posts:write"])`) when you need many variations of essentially the same dependency logic, instead of writing a near-duplicate function per variation.',
      'Keep `__init__` for FIXED, request-independent configuration and `__call__`\'s own parameters for per-request, `Depends()`-resolved values — do not mix the two roles.',
    ],
    tradeOffs:
      'Class-based dependencies add a small amount of extra structure (a class definition instead of a plain function) but pay off specifically when you need PARAMETERIZED reuse (many permission sets, many pagination-flavored endpoints) — for a single, non-parameterized dependency with no repeated variations, a plain function remains simpler and is the right default.',
    commonMistakes: [
      'Writing a near-duplicate function for every required-permission combination instead of parameterizing a single `PermissionChecker` class with different constructor arguments.',
      'Confusing `Depends(SomeClass)` (FastAPI constructs a fresh instance per request, resolving `__init__` params from the request) with `Depends(some_instance)` (a PRE-BUILT instance whose `__call__` is invoked per request) — these are semantically different and mixing them up leads to unexpected per-request state.',
      'Putting per-request state into `__init__` instead of `__call__`\'s parameters when using the parameterized-instance pattern, accidentally sharing that state across ALL requests since the instance is constructed only once at import time.',
    ],
    followUpQuestions: [
      'What would go wrong if you accidentally stored per-request data as an instance attribute inside a shared `PermissionChecker` instance\'s `__call__` method?',
      'How would you unit test the `Pagination` class-based dependency directly, independent of any FastAPI endpoint?',
      'When would a class-based dependency actually be the WRONG choice compared to a plain function?',
    ],
    relatedTopics: ['Class-Based Dependencies', 'Depends', 'Callable Classes', 'Pagination', 'Permission Checking'],
  },
  {
    id: 'python-m12-7',
    number: 'PY-M12-7',
    title: 'The full yield-dependency lifecycle: setup, teardown, and exception propagation',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Dependency Lifecycle',
    expectedAnswer:
      'A yield dependency behaves like a context manager wrapped around the endpoint call: FastAPI advances the generator to its `yield` (running setup), injects the yielded value, runs the endpoint (and, on success, response-model serialization), then resumes the generator — either normally (if nothing raised) or via `generator.throw(exc)` (if the endpoint or a later dependency raised), meaning teardown code can observe and react to the exception via a `try/except/finally` around the `yield`.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI, HTTPException\n\napp = FastAPI()\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n        db.commit()          # only reached if the endpoint did NOT raise\n    except Exception:\n        db.rollback()         # runs specifically when the endpoint (or a later dependency) raised\n        raise                 # re-raise — do not swallow the original error\n    finally:\n        db.close()            # ALWAYS runs, on both the success and failure paths\n\n@app.post("/orders")\ndef create_order(payload: dict, db=Depends(get_db)):\n    order = create_order_record(db, payload)\n    if order.total <= 0:\n        raise HTTPException(400, "Invalid order total")   # propagates back INTO get_db as an exception at yield\n    return order\n```\n\nPrecise step-by-step for the FAILURE path (`HTTPException` raised in the endpoint): (1) FastAPI has already advanced `get_db()` to `yield db`, handing `db` to the endpoint; (2) the endpoint raises; (3) FastAPI resumes the generator by calling `.throw(HTTPException(...))` AT the `yield` point — meaning the exception surfaces as if it were raised by the `yield db` line itself inside `get_db`; (4) the `except Exception:` block catches it, runs `db.rollback()`, then `raise` re-raises the SAME exception (critical: `raise` alone, not `raise SomeOtherError`, preserves the original exception for FastAPI\'s exception handlers to process correctly); (5) the `finally: db.close()` block still runs regardless; (6) the re-raised `HTTPException` then propagates up to FastAPI\'s exception-handling machinery, which converts it into the actual 400 HTTP response sent to the client.\n\nA subtlety that trips up even experienced developers: if a yield dependency\'s cleanup code ITSELF raises a new exception without first re-raising or preserving the original, the original endpoint error can be masked/replaced by the cleanup error — always prefer bare `raise` (re-raising the caught exception) over accidentally swallowing it or raising an unrelated new one from within `except`/`finally`.',
    productionExample:
      'Production database-session dependencies almost universally implement this exact commit-on-success/rollback-on-exception/always-close pattern — it is the mechanism that guarantees a partially-completed multi-statement business operation (e.g. "debit account A, credit account B") is fully rolled back as a unit if ANY step raises, rather than leaving the database in an inconsistent half-applied state.',
    bestPractices: [
      'Structure yield-dependency cleanup as `try: yield ...; except Exception: rollback/cleanup; raise; finally: always-run cleanup` to correctly distinguish success-path, failure-path, and always-run logic.',
      'Always re-raise (`raise`, not swallowing or replacing) inside the `except` block of a yield dependency, so the original error still reaches FastAPI\'s exception handlers and, ultimately, the client/logs.',
      'Keep yield-dependency bodies focused purely on resource lifecycle (open/commit-or-rollback/close) — do not put unrelated business logic inside them, since exception handling here is specifically about resource safety, not application logic.',
    ],
    tradeOffs:
      'Handling commit/rollback inside the shared `get_db` dependency centralizes transaction-boundary logic in one place (every endpoint gets consistent commit-on-success/rollback-on-failure for free) at the cost of assuming EVERY endpoint using this dependency wants exactly one transaction spanning the whole request — an endpoint needing more granular, multi-transaction control within a single request would need a different, more explicit dependency instead.',
    commonMistakes: [
      'Omitting the `except`/rollback branch entirely and only having `try: yield; finally: close()`, which correctly avoids leaking the connection but leaves a failed transaction UNCOMMITTED-BUT-NOT-ROLLED-BACK depending on the database driver\'s default behavior on connection close.',
      'Catching the exception in a yield dependency\'s cleanup and NOT re-raising it, silently converting what should have been a 400/500 error response into an apparently successful request from the client\'s perspective.',
      'Assuming yield-dependency cleanup only ever runs on the happy path, and therefore never testing what happens to shared resources when an endpoint deliberately raises during a test.',
    ],
    followUpQuestions: [
      'What is the difference between `.throw()` and simply calling `next()` again on a generator, in terms of how the yield dependency observes the endpoint\'s outcome?',
      'How would you write an integration test that specifically verifies a failed request correctly triggers a rollback rather than leaving a partial write committed?',
      'What would happen if a yield dependency\'s cleanup code itself raised a NEW exception without first handling or re-raising the original one?',
    ],
    relatedTopics: ['Yield Dependencies', 'Dependency Lifecycle', 'Exception Propagation', 'Transactions', 'Resource Cleanup'],
  },
  {
    id: 'python-m12-8',
    number: 'PY-M12-8',
    title: 'Coding: a protected admin endpoint wired through the full get_db + get_current_user + get_current_admin chain',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A realistic protected admin endpoint composes the database dependency, the authentication dependency chain, and the endpoint\'s own business logic — with each dependency doing exactly one job (session management, identity, authorization) and the endpoint body remaining focused purely on the actual admin action once all three have already succeeded.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, Depends, FastAPI, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\nfrom pydantic import BaseModel\n\noauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\ndef get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):\n    user = decode_token_and_load_user(db, token)\n    if user is None:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")\n    return user\n\ndef get_current_admin(user=Depends(get_current_user)):\n    if user.role != "admin":\n        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin privileges required")\n    return user\n\nclass UserOut(BaseModel):\n    id: int\n    email: str\n    is_active: bool\n\nrouter = APIRouter(prefix="/api/v1/admin", tags=["Admin"])\n\n@router.get("/users", response_model=list[UserOut])\ndef list_all_users(admin=Depends(get_current_admin), db=Depends(get_db)):\n    return db.query(User).all()\n\n@router.post("/users/{user_id}/deactivate", response_model=UserOut)\ndef deactivate_user(user_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):\n    target = db.query(User).filter(User.id == user_id).first()\n    if target is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")\n    if target.id == admin.id:\n        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot deactivate your own admin account")\n    target.is_active = False\n    db.commit()\n    db.refresh(target)\n    return target\n\napp = FastAPI()\napp.include_router(router)\n```\n\nAPI examples:\n\n```text\nGET /api/v1/admin/users\nHeaders: Authorization: Bearer <non-admin-token>\n-> 403 {"detail": "Admin privileges required"}\n\nPOST /api/v1/admin/users/7/deactivate\nHeaders: Authorization: Bearer <admin-token>\n-> 200 {"id": 7, "email": "user7@example.com", "is_active": false}\n\nPOST /api/v1/admin/users/<own-admin-id>/deactivate\nHeaders: Authorization: Bearer <admin-token>\n-> 400 {"detail": "Cannot deactivate your own admin account"}\n```',
    productionExample:
      'This exact three-dependency composition (`get_db` + `get_current_user` + `get_current_admin`) protecting a business action, PLUS an explicit business-rule check inside the endpoint body ("cannot deactivate yourself") is representative of how real admin-surface endpoints layer generic authorization dependencies with endpoint-specific business rules that only make sense in that one context.',
    bestPractices: [
      'Keep generic, reusable authorization concerns (role checking) in dependencies, and endpoint-SPECIFIC business rules (cannot deactivate your own account) inside the endpoint body where they are only relevant once.',
      'Check for resource existence (404) separately from and after authorization (403) — a request should fail on WHO is asking before checking WHAT they are asking about, to avoid leaking existence information to unauthorized callers unnecessarily.',
      'Commit and refresh explicitly after a mutation (`db.commit()`, `db.refresh(target)`) so the returned `response_model`-serialized object reflects the persisted state, not just the in-memory pre-commit object.',
    ],
    tradeOffs:
      'Depending on `get_current_admin` (the strictest layer) directly, rather than composing an ad hoc combination of checks per endpoint, keeps every admin endpoint\'s authorization requirement uniform and easy to audit at a glance — the cost is that if a FUTURE admin endpoint needs a slightly different check (e.g. "admin OR the resource owner"), it cannot simply reuse `get_current_admin` and needs its own dependency, which is the correct trade-off (explicit new dependency) rather than making `get_current_admin` itself more complicated to serve multiple different needs.',
    commonMistakes: [
      'Checking business rules (like "cannot deactivate yourself") inside a shared dependency instead of the specific endpoint, making that dependency less reusable for other admin actions that do not have the same restriction.',
      'Forgetting `db.commit()` after a mutation, silently returning a response that reflects an in-memory change never actually persisted to the database.',
      'Checking resource existence (404) BEFORE authorization (403), which can leak information about which resource IDs exist to callers who should not even know that much.',
    ],
    followUpQuestions: [
      'How would you extend this so an admin can deactivate any user EXCEPT another admin of equal or higher rank?',
      'How would you write a test suite covering all three failure branches (401, 403, 404, 400) plus the success path for `deactivate_user`?',
      'How would you add audit logging (who deactivated whom, when) to this endpoint without duplicating that logic across every admin action?',
    ],
    relatedTopics: ['Dependency Chains', 'Authorization', 'APIRouter', 'response_model', 'Admin Endpoints'],
  },
  {
    id: 'python-m12-9',
    number: 'PY-M12-9',
    title: 'Coding: a reusable Pagination dependency shared across multiple list endpoints',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'Extracting `page`/`limit`/`sort_by` into a single class-based (or dataclass-based) dependency lets every list endpoint in the API share identical, centrally-validated pagination behavior instead of repeating the same three `Query(...)` parameters (and their validation constraints) on every endpoint individually.',
    deepExplanation:
      '```python\nfrom dataclasses import dataclass\nfrom fastapi import APIRouter, Depends, FastAPI, Query\n\n@dataclass\nclass PaginationParams:\n    page: int = 1\n    limit: int = 20\n    sort_by: str = "id"\n\n    @property\n    def offset(self) -> int:\n        return (self.page - 1) * self.limit\n\ndef get_pagination(\n    page: int = Query(1, ge=1, description="1-indexed page number"),\n    limit: int = Query(20, ge=1, le=100, description="Items per page, max 100"),\n    sort_by: str = Query("id", description="Field to sort by"),\n) -> PaginationParams:\n    return PaginationParams(page=page, limit=limit, sort_by=sort_by)\n\nrouter = APIRouter(prefix="/api/v1")\n\n@router.get("/users")\ndef list_users(pagination: PaginationParams = Depends(get_pagination)):\n    items = ALL_USERS[pagination.offset : pagination.offset + pagination.limit]\n    return {"page": pagination.page, "limit": pagination.limit, "items": items}\n\n@router.get("/products")\ndef list_products(pagination: PaginationParams = Depends(get_pagination)):\n    items = ALL_PRODUCTS[pagination.offset : pagination.offset + pagination.limit]\n    return {"page": pagination.page, "limit": pagination.limit, "items": items}\n\n@router.get("/orders")\ndef list_orders(pagination: PaginationParams = Depends(get_pagination)):\n    items = ALL_ORDERS[pagination.offset : pagination.offset + pagination.limit]\n    return {"page": pagination.page, "limit": pagination.limit, "items": items}\n\napp = FastAPI()\napp.include_router(router)\n```\n\nAPI example:\n\n```text\nGET /api/v1/users?page=2&limit=10&sort_by=email\n-> 200 {"page": 2, "limit": 10, "items": [...10 users, offset 10...]}\n\nGET /api/v1/products?limit=500\n-> 422 {"detail": [{"loc": ["query", "limit"], "msg": "Input should be less than or equal to 100", ...}]}\n```\n\nThree endpoints share ONE definition of what "valid pagination" means (`ge=1` for page, `1 <= limit <= 100`) — if the max page size policy later changes from 100 to 50, that is a ONE-LINE change in `get_pagination`, automatically applied everywhere it is used, versus needing to hunt down and update every individual endpoint\'s inline `Query(...)` constraints.',
    productionExample:
      'A production API with dozens of list endpoints (users, products, orders, audit logs, notifications) defines exactly one shared pagination dependency like this — new list endpoints added later automatically inherit consistent pagination behavior and validation just by depending on it, with zero additional pagination-specific code.',
    bestPractices: [
      'Centralize shared query-parameter GROUPS (pagination, common filters, sort options) into one dependency reused across every endpoint that needs that exact shape, rather than repeating `Query(...)` declarations.',
      'Enforce a sane MAXIMUM `limit` (e.g. `le=100`) at the dependency/framework validation layer, not as a manual check inside every endpoint body, to prevent any endpoint from accidentally allowing an unbounded page size.',
      'Expose a computed `offset` property on the pagination object rather than making every endpoint separately recompute `(page - 1) * limit`.',
    ],
    tradeOffs:
      'A single shared `PaginationParams`/`get_pagination` dependency is simpler and DRY but assumes every list endpoint wants the exact same pagination shape and limits — an endpoint with genuinely different pagination needs (e.g. a much smaller max `limit` for an expensive aggregation endpoint) should compose a SEPARATE, differently-configured pagination dependency rather than special-casing the shared one with extra parameters.',
    commonMistakes: [
      'Repeating `page: int = Query(1, ge=1)` and `limit: int = Query(20, ge=1, le=100)` individually on every list endpoint, causing the validation rules to silently drift out of sync when one endpoint is updated and others are forgotten.',
      'Computing `offset` inline in every endpoint instead of exposing it as a property/method on the shared pagination object, duplicating the same arithmetic everywhere.',
      'Not setting an upper bound (`le=...`) on `limit`, allowing a client to request an unbounded number of rows in a single request.',
    ],
    followUpQuestions: [
      'How would you extend this dependency to also validate `sort_by` against an explicit allow-list of sortable fields, and why does that matter?',
      'How would you return pagination METADATA (total count, total pages, has_next) alongside the items, and where would that logic live?',
      'How would you support cursor-based pagination as an alternative mode of the same dependency, for endpoints where offset pagination is unsuitable?',
    ],
    relatedTopics: ['Pagination', 'Class-Based Dependencies', 'Query Parameters', 'Code Reuse', 'Validation'],
  },
  {
    id: 'python-m12-10',
    number: 'PY-M12-10',
    title: 'Coding: an API-key header dependency protecting an entire router',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A dependency can be attached at the ROUTER level (`APIRouter(dependencies=[Depends(...)])`) rather than repeated on every individual path operation, applying it uniformly to every route registered on that router — the standard pattern for protecting an entire group of endpoints (e.g. an internal/partner API) behind a single API-key check.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, Depends, FastAPI, Header, HTTPException, status\n\nVALID_API_KEYS = {"key-abc-123": "partner-a", "key-def-456": "partner-b"}\n\ndef verify_api_key(x_api_key: str = Header(..., alias="X-API-Key")) -> str:\n    partner = VALID_API_KEYS.get(x_api_key)\n    if partner is None:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or missing API key")\n    return partner\n\n# router-level dependency — applies to EVERY route below, without repeating Depends() on each one\nrouter = APIRouter(\n    prefix="/api/v1/partner",\n    tags=["Partner API"],\n    dependencies=[Depends(verify_api_key)],\n)\n\n@router.get("/inventory")\ndef get_inventory():\n    # verify_api_key already ran and raised before this point if the key were invalid —\n    # this endpoint does not even need to reference the dependency to be protected by it\n    return {"items": [...]}\n\n@router.get("/orders")\ndef get_orders():\n    return {"orders": [...]}\n\n# a route that ALSO needs the identified partner\'s name uses Depends() directly instead\n@router.get("/account")\ndef get_account(partner: str = Depends(verify_api_key)):\n    return {"partner": partner}\n\napp = FastAPI()\napp.include_router(router)\n```\n\nAPI examples:\n\n```text\nGET /api/v1/partner/inventory\n(no X-API-Key header)\n-> 401 {"detail": "Invalid or missing API key"}\n\nGET /api/v1/partner/inventory\nHeaders: X-API-Key: key-abc-123\n-> 200 {"items": [...]}\n\nGET /api/v1/partner/account\nHeaders: X-API-Key: key-abc-123\n-> 200 {"partner": "partner-a"}\n```\n\nTwo distinct usages of the SAME dependency function are shown: `dependencies=[Depends(verify_api_key)]` at the router level runs the check for its side effect (raise-on-failure) on every route, WITHOUT injecting its return value into the endpoint\'s parameters (routes like `/inventory` and `/orders` never see the `partner` value, and do not need to); an endpoint that additionally NEEDS the check\'s return value (`/account`, which needs to know WHICH partner) instead declares `Depends(verify_api_key)` directly as a parameter — thanks to per-request caching, this does not re-run the check a second time if it already ran at the router level for that request.',
    productionExample:
      'A production partner-facing API surface (distinct from the main user-facing API) is commonly implemented as its own `APIRouter` with a single `dependencies=[Depends(verify_api_key)]` declaration, so every current AND future endpoint added under that router prefix is automatically protected — a new endpoint added by a teammate cannot accidentally ship unauthenticated, since protection is structural (router-level) rather than something each endpoint author must remember to add individually.',
    bestPractices: [
      'Use router-level `dependencies=[...]` for a check that EVERY route in that group needs but whose return value most of those routes do not actually need to use.',
      'Use per-endpoint `Depends(...)` as a parameter specifically when the endpoint needs the dependency\'s RETURN VALUE, not just its side effect/guard behavior.',
      'Prefer a custom header name via `Header(..., alias="X-API-Key")` over reusing a generic `Authorization` header for API-key auth, to keep it visually and semantically distinct from bearer-token authentication used elsewhere in the same API.',
    ],
    tradeOffs:
      'Router-level dependencies make protection structural and impossible to forget on new routes within that group, at the cost of being all-or-nothing for that router — an endpoint within the SAME router that genuinely needs to be public would have to be moved to a different, unprotected router rather than being individually excluded from the router-level dependency.',
    commonMistakes: [
      'Repeating `Depends(verify_api_key)` on every single endpoint in a router instead of declaring it once at the router level, risking a newly added endpoint being accidentally left unprotected.',
      'Comparing API keys with a naive `==` on a raw dict lookup in a way vulnerable to timing attacks in genuinely security-sensitive contexts — production code should use a constant-time comparison (`hmac.compare_digest`) for secret comparison.',
      'Using the generic `Authorization` header for API-key auth without a clear scheme prefix, creating ambiguity with bearer-token-based user authentication used elsewhere in the same API surface.',
    ],
    followUpQuestions: [
      'How would you rate-limit each partner individually based on the identified `partner` value from this same dependency?',
      'Why might a timing-attack-safe comparison matter here, and how would you implement one for the API-key check?',
      'How would you support per-partner scoped permissions (partner A can read inventory but not orders) building on this same dependency?',
    ],
    relatedTopics: ['API Key Authentication', 'Router-Level Dependencies', 'APIRouter', 'Header', 'Security'],
  },
  {
    id: 'python-m12-11',
    number: 'PY-M12-11',
    title: 'Coding: a parameterized class-based RoleChecker supporting multiple required roles',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A `RoleChecker` class constructed with a LIST of acceptable roles (rather than a single hardcoded role) lets one reusable dependency implementation express "any of these roles may access this endpoint" — instantiated differently per endpoint (`RoleChecker(["admin"])`, `RoleChecker(["admin", "editor"])`) without writing a new function for every role combination needed across the API.',
    deepExplanation:
      '```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\n\nclass RoleChecker:\n    def __init__(self, allowed_roles: list[str]):\n        self.allowed_roles = allowed_roles   # fixed per-instance, chosen at declaration time\n\n    def __call__(self, user=Depends(get_current_active_user)):\n        if user.role not in self.allowed_roles:\n            raise HTTPException(\n                status.HTTP_403_FORBIDDEN,\n                f"Role \'{user.role}\' not permitted; requires one of {self.allowed_roles}",\n            )\n        return user\n\n# one instance per required-role SET, declared once, reused across endpoints\nallow_admin_only = RoleChecker(["admin"])\nallow_staff = RoleChecker(["admin", "editor", "moderator"])\n\napp = FastAPI()\n\n@app.delete("/users/{user_id}")\ndef delete_user(user_id: int, user=Depends(allow_admin_only)):\n    return {"deleted": user_id}\n\n@app.post("/posts/{post_id}/publish")\ndef publish_post(post_id: int, user=Depends(allow_staff)):\n    return {"published": post_id, "by": user.id}\n\n@app.get("/posts/{post_id}/comments")\ndef list_comments(post_id: int, user=Depends(get_current_active_user)):\n    return {"comments": []}   # any authenticated active user, no role restriction at all\n```\n\nAPI examples:\n\n```text\nDELETE /users/42\n(user has role "editor")\n-> 403 {"detail": "Role \'editor\' not permitted; requires one of [\'admin\']"}\n\nPOST /posts/5/publish\n(user has role "editor")\n-> 200 {"published": 5, "by": 17}\n\nDELETE /users/42\n(user has role "admin")\n-> 200 {"deleted": 42}\n```\n\nThe key architectural point: this ONE `RoleChecker` class serves an UNBOUNDED number of role-combination requirements across the whole API — adding a new endpoint that needs "admin or billing" access just means `RoleChecker(["admin", "billing"])` at declaration time, no new function, no change to `RoleChecker` itself, and no change to the underlying `get_current_active_user` dependency it builds on.',
    productionExample:
      'A production API with more than two or three distinct role combinations (viewer/editor/moderator/admin, in various endpoint-specific allowed-combinations) uses exactly this parameterized-class pattern rather than either a giant if/elif ladder inside one mega-dependency, or a proliferation of near-identical `require_admin`, `require_admin_or_editor`, `require_staff` functions that all repeat the same comparison logic.',
    bestPractices: [
      'Parameterize a single role/permission-checking class with the allowed set at declaration time, rather than writing one dependency function per distinct role combination.',
      'Keep the underlying identity dependency (`get_current_active_user`) separate from the role-comparison logic (`RoleChecker`), so identity resolution logic is not duplicated across every role-checking variant.',
      'Include the actual required roles (or at least a generic message) in the 403 detail to aid debugging, without leaking sensitive internal role names to end users if that is a concern for the specific API\'s threat model.',
    ],
    tradeOffs:
      'A parameterized `RoleChecker` class trades a small amount of indirection (you must look at where an instance was CONSTRUCTED, e.g. `RoleChecker(["admin"])`, to know what it actually enforces, rather than reading a self-descriptively-named function) for eliminating an unbounded proliferation of near-identical role-check functions as the number of distinct role combinations grows across a real API.',
    commonMistakes: [
      'Writing a new dependency function for every new role combination needed (`require_admin_or_billing`, `require_admin_or_support`, ...) instead of parameterizing one reusable checker class.',
      'Constructing a NEW `RoleChecker` instance inline inside every endpoint signature (`Depends(RoleChecker(["admin"]))`) repeatedly for the SAME role set across many endpoints, instead of defining one shared, named instance and reusing it — functionally equivalent but harder to grep/audit for "which endpoints require admin".',
      'Forgetting that role names are case-sensitive strings compared directly — a mismatch between how roles are stored ("Admin" vs "admin") silently breaks the check without raising any error.',
    ],
    followUpQuestions: [
      'How would you extend `RoleChecker` to support "must have ALL of these roles" in addition to the current "any of these roles" semantics?',
      'How would you unit test `RoleChecker` directly, independent of any FastAPI endpoint or the real `get_current_active_user` dependency?',
      'How would this design change if roles needed to be loaded dynamically from a database/config instead of being a fixed hardcoded list?',
    ],
    relatedTopics: ['RBAC', 'Class-Based Dependencies', 'Authorization', 'Parameterized Dependencies', 'Callable Classes'],
  },
  {
    id: 'python-m12-12',
    number: 'PY-M12-12',
    title: 'Coding: pytest + TestClient tests using dependency_overrides to fake the DB and current user',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A complete test file demonstrates fixtures that override `get_db` with an isolated in-memory SQLite session and `get_current_user` with a fixed fake user, letting tests exercise real endpoint/routing/validation logic against the `TestClient` while remaining fast, deterministic, and independent of any real database or authentication infrastructure.',
    deepExplanation:
      '```python\n# tests/conftest.py\nimport pytest\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom fastapi.testclient import TestClient\n\nfrom app.main import app\nfrom app.database import Base\nfrom app.dependencies import get_db, get_current_active_user\n\nTEST_ENGINE = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})\nTestingSessionLocal = sessionmaker(bind=TEST_ENGINE, autoflush=False, autocommit=False)\n\n@pytest.fixture()\ndef db_session():\n    Base.metadata.create_all(bind=TEST_ENGINE)   # fresh schema per test\n    session = TestingSessionLocal()\n    try:\n        yield session\n    finally:\n        session.close()\n        Base.metadata.drop_all(bind=TEST_ENGINE)   # isolate tests from each other\n\n@pytest.fixture()\ndef client(db_session):\n    def override_get_db():\n        yield db_session\n\n    def override_get_current_user():\n        return FakeUser(id=1, email="test@example.com", role="admin", is_active=True)\n\n    app.dependency_overrides[get_db] = override_get_db\n    app.dependency_overrides[get_current_active_user] = override_get_current_user\n    with TestClient(app) as test_client:\n        yield test_client\n    app.dependency_overrides.clear()   # always reset — do not leak overrides into other tests\n\n# tests/test_posts.py\ndef test_create_post_returns_201(client):\n    response = client.post("/posts", json={"title": "Hello", "body": "World"})\n    assert response.status_code == 201\n    body = response.json()\n    assert body["title"] == "Hello"\n    assert body["author_id"] == 1   # matches the overridden fake user\'s id\n\ndef test_create_post_rejects_empty_title(client):\n    response = client.post("/posts", json={"title": "", "body": "World"})\n    assert response.status_code == 422   # Pydantic validation, not business logic — still runs normally\n\ndef test_delete_post_forbidden_for_non_owner(client, monkeypatch):\n    from app.dependencies import get_current_active_user\n    app.dependency_overrides[get_current_active_user] = lambda: FakeUser(id=999, role="user", is_active=True)\n    response = client.delete("/posts/1")\n    assert response.status_code == 403\n```\n\nWhy the `db_session` fixture creates and drops the schema PER TEST (not once for the whole test session): sharing one persistent in-memory database across tests would let earlier tests\' data leak into later ones (e.g. a `test_list_posts_returns_empty_list` test failing because an earlier test\'s post is still there) — per-test isolation is what makes tests independent and order-agnostic, a core property of a trustworthy test suite.\n\nThe `client` fixture depending on `db_session` (not creating its own) ensures the SAME session instance used inside the test IS the one injected into the app via the override — critical if a test wants to directly query/assert against `db_session` after making a request through `client`, to verify the actual persisted state rather than only the HTTP response body.',
    productionExample:
      'This exact fixture layering (isolated in-memory test database per test + overridden fake authenticated user, composed via pytest fixture dependencies) is the standard shape of a production FastAPI test suite\'s `conftest.py` — new test files across the whole codebase reuse the same `client`/`db_session` fixtures rather than each reinventing override/teardown boilerplate.',
    bestPractices: [
      'Isolate each test\'s database state (fresh schema per test, or a transaction rolled back after each test) so tests never depend on execution order or leak data between each other.',
      'Compose fixtures (`client` depending on `db_session`) so the exact session object used by the override is the same one accessible for direct assertions inside the test, not two independently-created sessions.',
      'Always clear `app.dependency_overrides` in fixture teardown, even though the fixture ends normally — an exception mid-test should not prevent cleanup, which is exactly what fixture teardown (code after `yield` in a fixture) guarantees.',
    ],
    tradeOffs:
      'An in-memory SQLite test database is fast and requires no external services, but does not perfectly replicate production-database-specific behavior (SQL dialect differences, certain constraint enforcement) — a mature test suite pairs many fast SQLite-backed unit/integration tests like these with a smaller number of tests run against a real Postgres instance (e.g. in CI via a service container) to catch dialect-specific issues the fast suite cannot.',
    commonMistakes: [
      'Sharing one persistent database/session across all tests in a module without resetting state between them, causing order-dependent test failures that are painful to debug.',
      'Forgetting to clear `app.dependency_overrides` after a test that intentionally overrides a DIFFERENT user (like the "forbidden for non-owner" test), silently affecting unrelated tests that run afterward in the same session.',
      'Testing only the HTTP response body and never asserting against the actual database state via `db_session` directly, missing bugs where the response looks correct but nothing was actually persisted.',
    ],
    followUpQuestions: [
      'How would you test an endpoint that uses BackgroundTasks, given that TestClient runs background tasks synchronously by default in some FastAPI versions?',
      'How would you structure fixtures to test the SAME endpoint under multiple different fake user roles without duplicating the client fixture?',
      'What would you change about this setup to run tests against a real (containerized) Postgres instead of in-memory SQLite, and why might that be worth the added complexity?',
    ],
    relatedTopics: ['Testing', 'pytest Fixtures', 'dependency_overrides', 'TestClient', 'Test Isolation'],
  },
];

export const MOCK_PYTHON_MODULE12_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
