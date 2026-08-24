// Python + DSA Interview Handbook — Module 9: FastAPI Fundamentals.
// Hand-authored technical questions covering backend/HTTP/REST fundamentals,
// the FastAPI/Starlette/Pydantic/ASGI architecture, project setup, routing,
// status codes, and automatic OpenAPI documentation — with genuine FastAPI
// code, request/response examples, and production reasoning. Mirrors the
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
    id: 'python-m9-1',
    number: 'PY-M9-1',
    title: 'HTTP, REST, and the client/server request/response model',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Web Backend Fundamentals',
    expectedAnswer:
      'HTTP is a stateless, text-based (now binary-framed in HTTP/2+) request/response protocol: a client sends a request (method + URL + headers + optional body) and a server returns a response (status code + headers + optional body). REST (REpresentational State Transfer) is an architectural style built on top of HTTP that models a system as a set of addressable RESOURCES (nouns, e.g. `/users/42`) manipulated via a small set of standard HTTP methods (verbs) — it is not a protocol or a library, it is a set of constraints (statelessness, uniform interface, resource-based URLs, self-descriptive messages) that make an API predictable and cacheable.',
    deepExplanation:
      'Anatomy of a request:\n\n```text\nPOST /api/v1/users HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOi...\n\n{"email": "a@b.com", "name": "Ada"}\n```\n\nAnatomy of a response:\n\n```text\nHTTP/1.1 201 Created\nContent-Type: application/json\nLocation: /api/v1/users/42\n\n{"id": 42, "email": "a@b.com", "name": "Ada"}\n```\n\n"Stateless" specifically means the SERVER stores no client session context between requests — every request must carry everything needed to process it (auth token, needed IDs, etc). This is what makes horizontal scaling trivial: any server instance behind a load balancer can handle any request, since there is no session affinity requirement. (Contrast with an old-school server that keeps session state in server memory — that forces "sticky sessions", a scaling anti-pattern.)\n\nA RESTful resource model maps CRUD to HTTP verbs on nouns, not verbs in the URL:\n\n```text\nGET    /users        -> list users\nGET    /users/42     -> get one user\nPOST   /users        -> create a user\nPUT    /users/42     -> replace user 42 entirely\nPATCH  /users/42     -> partially update user 42\nDELETE /users/42     -> delete user 42\n```\n\nversus the common anti-pattern `/getUser?id=42` or `/deleteUser` (RPC-style verbs baked into the URL), which works but is not RESTful and loses the self-descriptive, cacheable, uniform-interface properties REST is designed to give you.',
    productionExample:
      'A payments API exposing `POST /payments` (create a charge, idempotent via an `Idempotency-Key` header) and `GET /payments/{id}` (poll status) is a textbook REST resource design — the client never needs server-side session state, so the API can be scaled horizontally behind a plain round-robin load balancer with zero session-affinity configuration.',
    bestPractices: [
      'Model URLs around resources (nouns), not actions (verbs) — let the HTTP method carry the verb.',
      'Never rely on server-side session state to make an API "work" between requests — every request should be self-sufficient (bearer token, not a server-memory session).',
      'Use plural nouns and consistent nesting (`/users/42/orders`) to represent resource relationships, rather than ad hoc query-string encodings of the same idea.',
    ],
    tradeOffs:
      'Strict REST (statelessness, resource-based URLs) trades a small amount of per-request overhead (re-sending auth on every call) for enormous operational simplicity — any instance can serve any request, which is what makes REST APIs trivially horizontally scalable compared to stateful protocols that pin a client to a specific server.',
    commonMistakes: [
      'Baking verbs into URLs (`/createUser`, `/deleteOrder`) instead of using the HTTP method to express the action on a resource noun.',
      'Storing per-user request state in server memory (in-process session dict) instead of a token/database, which breaks the moment you run more than one server instance.',
      'Confusing "REST" with "returns JSON" — REST is about the architectural constraints (statelessness, uniform interface, resource orientation), not the serialization format.',
    ],
    followUpQuestions: [
      'Why does statelessness matter specifically for horizontal scaling behind a load balancer?',
      'What is the practical difference between PUT and PATCH, and why does that distinction matter for idempotency?',
      'How would you design a URL scheme for a nested resource like "comments on a specific post owned by a specific user"?',
    ],
    relatedTopics: ['HTTP', 'REST', 'Statelessness', 'Client/Server Architecture', 'Resource Modeling'],
  },
  {
    id: 'python-m9-2',
    number: 'PY-M9-2',
    title: 'HTTP methods, idempotency, and safety',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Web Backend Fundamentals',
    expectedAnswer:
      'GET, HEAD, OPTIONS are "safe" (must never change server state) and, along with PUT and DELETE, are "idempotent" (calling them N times has the same effect as calling them once). POST is neither safe nor idempotent by default (each call typically creates a new resource). PATCH is technically not guaranteed idempotent (it depends on the patch semantics — replacing a field is idempotent, "increment a counter" is not).',
    deepExplanation:
      '```text\nMethod   Safe   Idempotent   Typical use\n------   ----   ----------   -----------\nGET      yes    yes          fetch a resource / list, never mutates\nHEAD     yes    yes          like GET but headers only, no body\nOPTIONS  yes    yes          discover allowed methods (also used for CORS preflight)\nPUT      no     yes          replace a resource entirely (idempotent: PUT same body twice = same end state)\nDELETE   no     yes          delete a resource (idempotent: deleting twice still ends with it gone)\nPATCH    no     usually no   partially update a resource (idempotent only if the patch itself is idempotent)\nPOST     no     no           create a resource / trigger a non-idempotent action\n```\n\nWhy idempotency matters concretely: a client on a flaky network that times out waiting for a response cannot safely know whether the request actually reached the server. For an idempotent method (PUT/DELETE), it is always safe to just retry — the end state is the same either way. For a non-idempotent method (POST), blindly retrying a "charge $50" request on timeout risks a DOUBLE CHARGE — which is exactly why production POST endpoints for money/critical mutations implement an `Idempotency-Key` header (client generates a UUID once per logical operation; server deduplicates on that key) to make an inherently non-idempotent operation SAFE to retry.\n\n```python\nfrom fastapi import FastAPI, Header, HTTPException\n\napp = FastAPI()\n_seen_idempotency_keys: dict[str, dict] = {}\n\n@app.post("/payments")\nasync def create_payment(payload: dict, idempotency_key: str = Header(...)):\n    if idempotency_key in _seen_idempotency_keys:\n        return _seen_idempotency_keys[idempotency_key]   # replay the original result, do not double-charge\n    result = {"id": "pay_123", "status": "succeeded", **payload}\n    _seen_idempotency_keys[idempotency_key] = result\n    return result\n```',
    productionExample:
      'Stripe\'s payments API requires an `Idempotency-Key` header on every `POST /charges` call precisely because POST is not idempotent — retry logic in client SDKs is only safe to auto-retry on timeouts because the server deduplicates by that key, turning an inherently unsafe-to-retry operation into a safe one.',
    bestPractices: [
      'Never perform a state-mutating side effect inside a GET/HEAD handler — clients, proxies, and crawlers may call GET speculatively/repeatedly, assuming safety.',
      'Implement idempotency keys for any POST endpoint representing a critical, hard-to-undo action (payments, order placement, irreversible emails).',
      'Use PUT only when the client sends the COMPLETE resource representation; use PATCH for partial updates, and be explicit in API docs about whether a given PATCH endpoint is idempotent.',
    ],
    tradeOffs:
      'Designing for idempotency (idempotency keys, PUT-based full replacement) adds implementation complexity (dedup storage, key expiry policy) but is the only way to make retries on unreliable networks safe — the alternative (no idempotency) pushes double-submission risk onto the business logic itself, which is far more expensive to fix after the fact (e.g. reconciling duplicate charges).',
    commonMistakes: [
      'Implementing a GET endpoint that increments a view counter or logs an action as a side effect, violating the "safe method" guarantee that HTTP intermediaries (caches, prefetchers) rely on.',
      'Assuming PATCH is always idempotent — a PATCH body like `{"balance_delta": 10}` is NOT idempotent (applying it twice adds 20), unlike `{"balance": 110}` which is.',
      'Blindly auto-retrying POST requests on timeout without an idempotency key, risking duplicate resource creation / duplicate charges.',
    ],
    followUpQuestions: [
      'Why is DELETE considered idempotent even though the second call returns 404 instead of 200/204?',
      'How would you design idempotency-key storage so keys eventually expire without risking a legitimate NEW request being rejected as a duplicate?',
      'Give an example of a PATCH body that IS idempotent and one that is NOT, and explain the difference.',
    ],
    relatedTopics: ['HTTP Methods', 'Idempotency', 'Safety', 'Idempotency Keys', 'Retries'],
  },
  {
    id: 'python-m9-3',
    number: 'PY-M9-3',
    title: 'ASGI vs WSGI, and how Uvicorn/Starlette/FastAPI/Pydantic fit together',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Architecture',
    expectedAnswer:
      'WSGI (Web Server Gateway Interface, used by Flask/Django classic) is a SYNCHRONOUS interface between a Python web app and a server — one worker thread/process blocks per request, so it cannot natively support `async def`, WebSockets, or long-lived streaming connections. ASGI (Asynchronous Server Gateway Interface) is its async successor: a single worker can juggle thousands of concurrent connections cooperatively via `async`/`await`, natively supporting HTTP, WebSockets, and lifespan events. FastAPI is built ON TOP of Starlette (the ASGI toolkit that provides routing, middleware, WebSockets, and the ASGI protocol implementation) and Pydantic (which provides request/response data validation and serialization from type hints); Uvicorn is the ASGI SERVER (built on `uvloop`/`asyncio`) that actually accepts TCP connections and drives the ASGI application.',
    deepExplanation:
      'Layered architecture, each layer with a distinct job:\n\n```text\nUvicorn      — ASGI server: accepts TCP/HTTP connections, speaks the ASGI protocol to the app\nStarlette    — ASGI framework: routing, middleware, WebSockets, background tasks, ASGI plumbing\nFastAPI      — adds: Pydantic-based request/response validation, dependency injection, automatic OpenAPI docs\nPydantic     — data validation/serialization layer used by FastAPI for request bodies, query params, response models\n```\n\nFastAPI itself is a thin, opinionated layer over Starlette — nearly every Starlette feature (routing, middleware, `Request`/`Response`, WebSockets, background tasks, exception handling) is directly reused or re-exported, with FastAPI\'s main additions being the Pydantic-driven validation/serialization and the automatic OpenAPI schema generation.\n\nThe async advantage concretely: under WSGI (sync), 100 concurrent slow requests (e.g. each waiting 2s on a downstream API) tie up 100 OS threads/processes. Under ASGI with `async def` endpoints using an async HTTP client, those same 100 requests can be handled by a SINGLE event-loop worker, since while any one request is awaiting I/O, the event loop is free to make progress on the others — dramatically better concurrency for I/O-bound workloads with the same hardware.\n\n```python\n# WSGI-style (Flask, sync) — blocks the whole worker while waiting\n@app.route("/slow")\ndef slow():\n    time.sleep(2)          # blocks this worker/thread entirely\n    return {"ok": True}\n\n# ASGI-style (FastAPI, async) — yields control back to the event loop while waiting\n@app.get("/slow")\nasync def slow():\n    await asyncio.sleep(2)  # other requests are served concurrently on the SAME worker\n    return {"ok": True}\n```',
    productionExample:
      'A FastAPI service that proxies to three downstream microservices per request (e.g. fetch user, fetch inventory, fetch pricing) can issue those three calls concurrently with `asyncio.gather` and serve hundreds of concurrent client requests per worker — the same logic under a sync WSGI framework would need proportionally many more worker processes/threads to achieve comparable throughput, directly translating to more memory and infrastructure cost.',
    bestPractices: [
      'Run FastAPI behind Uvicorn (or Uvicorn workers managed by Gunicorn, `gunicorn -k uvicorn.workers.UvicornWorker`) in production, never Uvicorn\'s single-process dev server alone.',
      'Only mark an endpoint `async def` if everything it awaits is genuinely async (async DB driver, `httpx.AsyncClient`, etc) — mixing in blocking calls inside an `async def` endpoint blocks the ENTIRE event loop, not just that request (see the "blocking code in async endpoints" question).',
      'Understand that FastAPI does not replace Starlette — it is safe and common to reach for Starlette primitives (`Request`, `Response`, `BackgroundTasks`, middleware base classes) directly when FastAPI\'s higher-level API does not cover a case.',
    ],
    tradeOffs:
      'ASGI/async buys dramatically better I/O-bound concurrency per worker process, at the cost of a stricter mental model (you must avoid blocking calls inside the event loop) and a smaller, younger ecosystem of async-native libraries (async DB drivers, async HTTP clients) compared to the mature sync ecosystem WSGI apps can use freely.',
    commonMistakes: [
      'Believing FastAPI is "faster than Flask" in a vacuum — the real driver of the speedup is ASGI async I/O concurrency for I/O-bound workloads; CPU-bound work sees no such benefit from async alone.',
      'Running a raw single Uvicorn process with no process manager/worker count tuning in production, leaving CPU cores idle.',
      'Assuming Pydantic validation is "part of ASGI" — it is a FastAPI-specific layer; a bare Starlette app has no automatic request validation.',
    ],
    followUpQuestions: [
      'What specifically breaks if you call a blocking, synchronous `requests.get()` inside an `async def` FastAPI endpoint?',
      'Why can Starlette exist as a framework independent of FastAPI, and when might you reach for it directly?',
      'How does Uvicorn achieve high concurrency under the hood (hint: `asyncio`/`uvloop` event loop, not OS threads per connection)?',
    ],
    relatedTopics: ['ASGI', 'WSGI', 'Uvicorn', 'Starlette', 'Pydantic', 'Async I/O', 'Concurrency'],
  },
  {
    id: 'python-m9-4',
    number: 'PY-M9-4',
    title: 'The FastAPI request lifecycle, from socket to response',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Architecture',
    expectedAnswer:
      'A request flows: Uvicorn accepts the raw connection and translates it into an ASGI `scope`/`receive`/`send` call -> Starlette\'s ASGI app dispatches through registered middleware (outer to inner) -> the router matches the path/method to a path operation -> FastAPI resolves that operation\'s dependencies (recursively, caching per-request) -> request data (path/query/body/headers) is validated against the declared Pydantic types/parameters -> the endpoint function runs -> its return value is serialized against `response_model` (if any) -> the response passes back OUT through middleware (inner to outer) -> Uvicorn writes bytes back to the socket.',
    deepExplanation:
      '```text\nClient\n  |  raw TCP/HTTP bytes\nUvicorn (ASGI server)\n  |  scope / receive / send\nStarlette ASGI app\n  |\nMiddleware chain (outer -> inner), e.g. CORS -> GZip -> custom logging\n  |\nRouting (match method + path to a path operation, incl. path params)\n  |\nDependency resolution (Depends(...) graph, resolved depth-first, cached per-request)\n  |\nRequest validation (path/query/header/cookie params + body, all against declared types/Pydantic models)\n  |\nEndpoint function body executes\n  |\nResponse serialization (response_model filtering/coercion, JSON encoding)\n  |\nMiddleware chain (inner -> outer, response now flows back OUT)\n  |\nUvicorn writes the HTTP response bytes\n  |\nClient\n```\n\nA concrete, observable example of ordering:\n\n```python\nfrom fastapi import FastAPI, Depends\n\napp = FastAPI()\n\n@app.middleware("http")\nasync def log_middleware(request, call_next):\n    print("1. middleware: before")\n    response = await call_next(request)   # everything downstream runs HERE\n    print("5. middleware: after")\n    return response\n\ndef dep_a():\n    print("2. dependency A")\n    return "a"\n\ndef dep_b(a: str = Depends(dep_a)):\n    print("3. dependency B (depends on A)")\n    return "b"\n\n@app.get("/demo")\nasync def demo(b: str = Depends(dep_b)):\n    print("4. endpoint body")\n    return {"b": b}\n\n# GET /demo prints, in order: 1, 2, 3, 4, 5\n```\n\nThe critical mental model: middleware WRAPS everything downstream — code before `await call_next(request)` runs on the way IN, code after runs on the way OUT, which is why middleware is the right place for cross-cutting concerns (timing, request IDs, auth short-circuiting) that need to see both the request and the eventual response.',
    productionExample:
      'A request-timing middleware that records `time.perf_counter()` before `call_next` and computes the delta after it is the standard way production FastAPI services measure true end-to-end latency (including all dependency resolution and validation), which is then attached as an `X-Response-Time` header or emitted to a metrics system.',
    bestPractices: [
      'Put cross-cutting concerns that need to see BOTH the request and response (timing, logging, request IDs, auth short-circuiting) in middleware, not in a dependency — middleware naturally wraps the whole pipeline.',
      'Put per-endpoint, reusable, request-scoped concerns (current user, DB session, pagination params) in dependencies, not middleware — dependencies are declaratively scoped to only the endpoints that need them.',
      'Remember dependency results are cached PER REQUEST by default (same dependency called from two places in one request\'s dependency graph runs once) — do not assume it reruns for each reference.',
    ],
    tradeOffs:
      'Middleware runs for EVERY request regardless of route (broad, always-on cost) while dependencies are opt-in per path operation (targeted, zero cost for routes that do not declare them) — choosing the wrong layer either adds needless overhead to unrelated routes (middleware misuse) or forces you to repeat the same `Depends(...)` everywhere (dependency misuse for something that is really global).',
    commonMistakes: [
      'Assuming a `Depends()` dependency used twice in the same request\'s graph runs twice — by default FastAPI caches it per request (override with `Depends(fn, use_cache=False)` if you genuinely need fresh calls).',
      'Doing expensive, unconditional work in HTTP middleware that only a handful of routes actually need, silently slowing down every single request in the app.',
      'Forgetting that code after `await call_next(request)` in middleware still needs to handle the case where the endpoint raised an exception, unless a global exception handler already converted it to a response before middleware sees it.',
    ],
    followUpQuestions: [
      'In what order do multiple registered middlewares execute relative to each other, on the way in versus the way out?',
      'Why is per-request dependency caching important for correctness when several dependencies in the same graph both depend on, say, a shared DB session dependency?',
      'Where in this lifecycle does Pydantic validation actually happen, and what response code/body does FastAPI produce automatically when it fails?',
    ],
    relatedTopics: ['Request Lifecycle', 'Middleware', 'Dependency Injection', 'ASGI', 'Routing'],
  },
  {
    id: 'python-m9-5',
    number: 'PY-M9-5',
    title: 'FastAPI vs Flask vs Django/DRF vs Express vs Spring Boot',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Architecture',
    expectedAnswer:
      'FastAPI is a lightweight, async-first, type-hint-driven micro-framework: batteries for routing/validation/docs are built in, but ORM, admin panel, and auth are BYO (bring your own), similar in philosophy to Flask but async-native with automatic validation/docs. Django (and DRF on top of it) is a full "batteries-included" framework (ORM, admin panel, forms, auth, migrations) that is historically synchronous (ASGI support exists but the ecosystem is still largely sync-oriented). Express (Node.js) is FastAPI\'s closest cross-language analogue: minimal, async-native by default (Node\'s event loop), but with no built-in request validation or auto-docs (needs libraries like `zod`/`joi` + `swagger-jsdoc`). Spring Boot (Java) is the "enterprise batteries-included, statically typed, JVM" equivalent of Django — heavier, more boilerplate, but very mature for large regulated codebases.',
    deepExplanation:
      '```text\nFramework     Async-native   Validation/docs         "Batteries"        Typical fit\n---------     ------------   ----------------         -----------        -----------\nFlask         no (opt-in)    manual (marshmallow etc)  minimal            small APIs, full control, sync OK\nFastAPI       yes            built-in (Pydantic+OpenAPI) minimal          async I/O-heavy APIs, microservices\nDjango+DRF    partial        built-in (DRF serializers) maximal (ORM, admin) content-heavy apps, admin needed\nExpress       yes            manual (zod/joi)          minimal            Node.js shops, thin API layer\nSpring Boot   yes (reactive) built-in (Bean Validation) maximal            large JVM enterprise systems\n```\n\nThe decision in practice usually comes down to THREE questions, not a popularity contest: (1) Is the workload I/O-bound and would benefit meaningfully from async concurrency? (FastAPI/Express/Spring WebFlux win) (2) Do I need an admin panel / ORM / batteries out of the box for a content-heavy app? (Django wins) (3) What does the team already know and what is the existing polyglot stack? (often decides more than any technical merit).\n\nFastAPI specifically differentiates itself from Flask (its closest Python sibling) via TWO things Flask does not give you for free: (a) automatic request/response validation and serialization from plain Python type hints via Pydantic, and (b) automatically generated, always-in-sync OpenAPI/Swagger documentation derived from those same type hints — meaning the code IS the API contract, not a separately maintained doc.',
    productionExample:
      'A team building a small, I/O-heavy internal microservice (call three downstream APIs, aggregate, return JSON) with a small team and a need for auto-generated client-consumable docs typically reaches for FastAPI; a team building a content-management-heavy product needing an admin UI, complex relational models, and built-in auth/permissions machinery typically reaches for Django, even at some async-concurrency cost.',
    bestPractices: [
      'Choose based on the actual workload shape (I/O-bound vs needing a full CMS/admin) and team familiarity, not framework popularity alone.',
      'If choosing FastAPI specifically FOR the automatic docs/validation, actually invest in writing good Pydantic models/descriptions — the docs are only as good as the type hints and `Field(description=...)` metadata you provide.',
      'Do not assume "async framework" automatically means "faster" for a CPU-bound or a small-scale, low-concurrency workload — the difference is negligible there.',
    ],
    tradeOffs:
      'FastAPI trades Django\'s all-in-one convenience (ORM, admin, auth, migrations all pre-integrated) for a smaller, more composable core that you assemble yourself from best-of-breed pieces (SQLAlchemy, Alembic, a JWT library) — more initial setup decisions, but less framework lock-in and a leaner footprint for API-only services.',
    commonMistakes: [
      'Choosing FastAPI for a project that actually needs a Django-style admin panel, then re-building an ad hoc admin UI from scratch later.',
      'Choosing Django for a high-concurrency, I/O-heavy microservice and then fighting the sync ORM/ecosystem to bolt on async behavior.',
      'Treating the framework choice as purely about raw benchmark throughput numbers rather than the actual shape of the workload and team constraints.',
    ],
    followUpQuestions: [
      'When would you choose Django REST Framework over FastAPI even for a pure API (no admin/templates needed)?',
      'What does FastAPI give you "for free" compared to Flask, specifically?',
      'How would you evaluate whether your workload actually benefits from an async-native framework before committing to one?',
    ],
    relatedTopics: ['Flask', 'Django', 'DRF', 'Express', 'Spring Boot', 'Framework Comparison'],
  },
  {
    id: 'python-m9-6',
    number: 'PY-M9-6',
    title: 'Project setup: virtual environments, running Uvicorn, dev vs production mode',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'FastAPI Project Setup',
    expectedAnswer:
      'A production-sane FastAPI project isolates dependencies in a virtual environment, pins them (via `requirements.txt`/`pyproject.toml` + a lockfile), and runs with different Uvicorn invocations for development (`--reload`, single process, verbose logs) versus production (no reload, multiple workers via a process manager, structured logging, no debug leakage).',
    deepExplanation:
      '```bash\n# 1. isolate dependencies\npython -m venv .venv\nsource .venv/bin/activate          # .venv\\Scripts\\activate on Windows\n\n# 2. install\npip install "fastapi[standard]" uvicorn\n\n# 3. minimal app (main.py)\n```\n```python\nfrom fastapi import FastAPI\n\napp = FastAPI(title="Demo API", version="1.0.0")\n\n@app.get("/")\nasync def root():\n    return {"message": "Hello World"}\n```\n```bash\n# 4a. development — auto-reload on file change, single worker, verbose\nuvicorn main:app --reload --host 127.0.0.1 --port 8000\n\n# 4b. production — no reload, multiple worker processes, bound for a reverse proxy in front\nuvicorn main:app --host 0.0.0.0 --port 8000 --workers 4\n# or, more commonly, Gunicorn managing Uvicorn workers for robust process supervision:\ngunicorn main:app -k uvicorn.workers.UvicornWorker --workers 4 --bind 0.0.0.0:8000\n```\nEvery line of the minimal app explained: `FastAPI()` constructs the ASGI application object (also the container for metadata used in the OpenAPI docs — `title`/`version`/`description`); `@app.get("/")` registers a PATH OPERATION — a decorator binding the HTTP method GET and path `/` to the function below it; `async def root()` is the endpoint (async because FastAPI natively supports both sync and async endpoint functions — sync ones are automatically run in a thread pool so they never block the event loop); the `return {"message": "Hello World"}` dict is automatically serialized to a JSON response body with `Content-Type: application/json` and status 200, with zero manual `json.dumps` or response-object construction needed.\n\n`--reload` in dev watches the filesystem and restarts the whole process on change — never enable it in production (extra file-watching overhead, and it silently only supports a single worker). `--workers N` in production spreads incoming connections across N separate OS processes (each with its own event loop), which is how you use multiple CPU cores, since a single asyncio event loop is inherently one process/one core.',
    productionExample:
      'A production FastAPI deployment typically runs behind Nginx or a cloud load balancer (TLS termination, static asset serving, request buffering) in front of several Uvicorn worker processes managed by Gunicorn (for its mature process-supervision: worker restarts on crash, graceful reloads) or, on Kubernetes, several separate pod replicas each running a single Uvicorn process, letting the orchestrator handle process-level scaling instead.',
    bestPractices: [
      'Always develop inside a virtual environment (`venv`, `poetry`, or `uv`) — never install project dependencies into the system Python.',
      'Pin dependency versions (lockfile) so production installs are reproducible, and separate dev-only dependencies (test/lint tools) from runtime dependencies.',
      'Never run `--reload` in production, and never bind `--host 0.0.0.0` directly to the public internet without a reverse proxy handling TLS in front.',
    ],
    tradeOffs:
      'Running Uvicorn directly with `--workers N` is simpler to configure but Gunicorn-managed Uvicorn workers add mature process supervision (auto-restart a crashed worker, graceful rolling reloads) at the cost of one more moving part — the right choice depends on whether your deployment platform (e.g. Kubernetes) already provides process supervision at the orchestration layer, making Gunicorn partially redundant there.',
    commonMistakes: [
      'Running `--reload` in production, silently limiting the deployment to a single worker process and adding filesystem-watching overhead.',
      'Forgetting to pin dependency versions, causing "works on my machine" drift between development and production installs.',
      'Binding directly to `0.0.0.0` with no reverse proxy/TLS in front in a public-facing deployment.',
    ],
    followUpQuestions: [
      'Why does a single Uvicorn worker only use one CPU core, and how do you use more?',
      'What specifically does `--reload` cost you that makes it inappropriate for production?',
      'How would you structure environment-specific configuration (dev/staging/prod) for the same codebase?',
    ],
    relatedTopics: ['Uvicorn', 'Virtual Environments', 'Gunicorn', 'Deployment', 'Process Management'],
  },
  {
    id: 'python-m9-7',
    number: 'PY-M9-7',
    title: 'Routing, path operations, APIRouter, prefixes, tags, and API versioning',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Routing',
    expectedAnswer:
      '`APIRouter` lets you split path operations across modules (e.g. `users.py`, `products.py`) and mount them onto the main `FastAPI()` app via `app.include_router(router, prefix=..., tags=[...])`, which is essential for any non-trivial API — a single flat `main.py` with every endpoint does not scale past a handful of routes. URL-based versioning (`/api/v1/...`) is the most common, simplest versioning strategy in FastAPI, typically implemented by giving each version its own `APIRouter` with a version-specific prefix.',
    deepExplanation:
      '```python\n# app/api/v1/users.py\nfrom fastapi import APIRouter\n\nrouter = APIRouter(prefix="/users", tags=["Users"])\n\n@router.get("/")\nasync def list_users():\n    return [{"id": 1, "name": "Ada"}]\n\n@router.get("/{user_id}")\nasync def get_user(user_id: int):\n    return {"id": user_id, "name": "Ada"}\n\n# app/api/v1/__init__.py\nfrom fastapi import APIRouter\nfrom app.api.v1 import users, products, orders\n\nrouter = APIRouter(prefix="/api/v1")\nrouter.include_router(users.router)\nrouter.include_router(products.router)\nrouter.include_router(orders.router)\n\n# main.py\nfrom fastapi import FastAPI\nfrom app.api.v1 import router as v1_router\n\napp = FastAPI(title="Demo API")\napp.include_router(v1_router)\n# resulting route: GET /api/v1/users/{user_id}\n```\n\nRoute ORDERING matters for path parameters: FastAPI matches routes in REGISTRATION order, and a generic `/{user_id}` registered before a more specific literal path like `/me` would incorrectly swallow requests to `/users/me` (treating "me" as a `user_id`). The fix is registering more specific literal routes BEFORE parameterized ones:\n\n```python\n@router.get("/me")            # must come FIRST\nasync def get_current_user():\n    ...\n\n@router.get("/{user_id}")     # generic catch-all comes AFTER\nasync def get_user(user_id: int):\n    ...\n```\n\n`tags=["Users"]` groups the endpoint under a labeled section in the generated Swagger UI/ReDoc, purely a documentation/organization aid with no effect on routing behavior. `prefix` is applied to every route registered on that router, letting you change `/api/v1` to `/api/v2` for an entirely new router (a second, near-duplicate set of endpoint modules) to support versioned, backward-compatible API evolution.',
    productionExample:
      'A production FastAPI codebase typically structures `app/api/v1/` and (once a breaking change is needed) `app/api/v2/` as parallel router packages, both mounted on the same `FastAPI()` app simultaneously during a deprecation window — existing v1 clients keep working unmodified while new clients adopt v2, and v1 is only removed once usage metrics/logging confirm no more traffic hits it.',
    bestPractices: [
      'Split routes into one `APIRouter` per resource/domain area (`users.py`, `products.py`, `orders.py`), never one giant `main.py` with every path operation.',
      'Register more specific literal path segments (`/me`, `/search`) BEFORE generic parameterized ones (`/{id}`) on the same router to avoid the catch-all shadowing bug.',
      'Use `tags` consistently to keep the generated Swagger UI organized and navigable as the API grows past a handful of endpoints.',
    ],
    tradeOffs:
      'URL-based versioning (`/api/v1`, `/api/v2`) is simple, cacheable, and immediately visible in logs/monitoring, but requires maintaining parallel router code during the deprecation window; header-based versioning (`Accept: application/vnd.api.v2+json`) keeps URLs stable across versions but is less discoverable/debuggable and harder to test manually (e.g. in a browser) or route with simple path-based infra rules.',
    commonMistakes: [
      'Registering a parameterized route (`/{user_id}`) before a literal one (`/me`) on the same router, causing the literal route to never match (silently "shadowed").',
      'Putting every endpoint directly on the main `FastAPI()` app instance instead of using `APIRouter`, making the codebase unmanageable past a small number of routes.',
      'Forgetting that `prefix` on `APIRouter` should not have a trailing slash (`prefix="/users"`, not `"/users/"`), which can produce accidental double slashes when combined with route paths.',
    ],
    followUpQuestions: [
      'How would you support both URL-based and header-based versioning simultaneously if a migration required it?',
      'Why does FastAPI match routes in registration order rather than "most specific first" automatically?',
      'How would you deprecate a v1 endpoint gracefully (hint: deprecation warnings in OpenAPI docs, response headers, logging/metrics on continued v1 usage)?',
    ],
    relatedTopics: ['APIRouter', 'Routing', 'API Versioning', 'Route Ordering', 'OpenAPI Tags'],
  },
  {
    id: 'python-m9-8',
    number: 'PY-M9-8',
    title: 'Choosing the right HTTP status code in a FastAPI API',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'HTTP Status Codes',
    expectedAnswer:
      'FastAPI defaults every path operation to 200 OK (except 201 conventions you set explicitly), but a well-designed API should return the status code that precisely communicates the outcome: 201 for successful resource creation, 204 for a successful action with no response body, 400 for malformed client input the framework itself did not catch, 401 for missing/invalid auth, 403 for authenticated-but-forbidden, 404 for a missing resource, 409 for a conflicting state change, 422 (FastAPI\'s automatic default) for Pydantic validation failures, and 429 for rate limiting.',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI, HTTPException, status\n\napp = FastAPI()\n\n@app.post("/users", status_code=status.HTTP_201_CREATED)\nasync def create_user(payload: dict):\n    return {"id": 1, **payload}\n\n@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)\nasync def delete_user(user_id: int):\n    return None   # 204 must not carry a response body\n\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int):\n    user = None\n    if user is None:\n        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")\n    return user\n\n@app.post("/users/{user_id}/activate")\nasync def activate_user(user_id: int):\n    already_active = True\n    if already_active:\n        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already active")\n    return {"status": "activated"}\n```\n\nStatus-code decision table for common real API situations:\n\n```text\nSituation                                          Code\n---------                                          ----\nGET/PUT/PATCH succeeded, body returned             200\nPOST created a new resource                        201\nRequest accepted for async/background processing   202\nDELETE (or any) succeeded, nothing to return        204\nClient sent malformed data caught by app logic      400\nMissing/invalid credentials                         401\nAuthenticated but not allowed to do this            403\nResource does not exist (or hidden for privacy)     404\nMethod not supported on this path                  405\nState conflict (duplicate email, version mismatch)  409\nRequest well-formed JSON, but fails Pydantic schema 422 (FastAPI default, automatic)\nToo many requests (rate limited)                    429\nUnhandled server-side exception                     500\nUpstream/dependency service failure                 502/503/504\n```\n\nA subtlety worth naming explicitly in interviews: FastAPI returns 422 (not 400) automatically when Pydantic validation fails on a request body/query/path parameter — this is a deliberate REST convention distinction (400 = fundamentally malformed request the server cannot even parse the intent of; 422 Unprocessable Entity = well-formed request that fails semantic/schema validation), and FastAPI\'s automatic behavior already follows it correctly without any extra code from you.',
    productionExample:
      'An e-commerce checkout API returns 409 Conflict specifically (not a generic 400) when a client tries to purchase the last unit of a product that just sold out between page load and checkout submission — that precise status code lets the frontend distinguish "your request was malformed" (fixable by the client) from "the world changed under you, please refresh and retry" (needs a re-fetch, not a code fix).',
    bestPractices: [
      'Set `status_code=` explicitly on the path operation decorator for anything other than a plain 200 GET — do not rely on manually constructing response objects just to change the status.',
      'Reserve 500 exclusively for genuinely unexpected server bugs — any anticipated failure mode (not found, conflict, forbidden) should get its own specific 4xx code, never a blanket 500.',
      'Return 204 with an empty body (not `{}` or `null`) for successful no-content actions — some HTTP clients treat a non-empty 204 body as a protocol violation.',
    ],
    tradeOffs:
      'Being precise with status codes (409 vs 400 vs 422) costs a small amount of extra endpoint-by-endpoint thought but pays off enormously in client-side error handling — a frontend or third-party API consumer can branch reliably on status code alone instead of parsing error message TEXT, which is fragile and prone to breaking on message wording changes.',
    commonMistakes: [
      'Returning 200 with an `{"error": "..."}` body for a failure instead of an actual non-2xx status code, forcing every client to inspect the body to know if a request even succeeded.',
      'Using 500 as a catch-all for known, anticipated error conditions (not found, validation, conflict) instead of the specific code that condition deserves.',
      'Returning a non-empty body alongside a 204 status code, which violates the HTTP spec\'s expectation for that status.',
    ],
    followUpQuestions: [
      'Why does FastAPI use 422 rather than 400 for Pydantic validation failures, and is that choice actually meaningful or just convention?',
      'When would you use 202 Accepted instead of 200/201, and what does the client typically do next after receiving it?',
      'How would you decide between 403 and 404 when a user tries to access a resource they are not authorized to see (hint: information leakage considerations)?',
    ],
    relatedTopics: ['HTTP Status Codes', 'HTTPException', 'REST API Design', 'Error Handling'],
  },
  {
    id: 'python-m9-9',
    number: 'PY-M9-9',
    title: 'Automatic OpenAPI docs: Swagger UI, ReDoc, and API metadata',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'FastAPI Documentation',
    expectedAnswer:
      'FastAPI introspects every path operation\'s type hints, Pydantic models, and docstrings at STARTUP to generate a full OpenAPI 3.x JSON schema (served at `/openapi.json` by default), which then powers two auto-generated, interactive documentation UIs out of the box: Swagger UI at `/docs` (try-it-out request execution) and ReDoc at `/redoc` (clean read-only reference). No separate documentation-writing step is needed — the code IS the source of truth.',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI(\n    title="Demo API",\n    description="A demo API for the docs example.",\n    version="1.2.0",\n    contact={"name": "API Team", "email": "api@example.com"},\n)\n\nclass UserCreate(BaseModel):\n    email: str = Field(..., description="User\'s email address", examples=["ada@example.com"])\n    age: int = Field(..., ge=0, le=130, description="Age in years")\n\n@app.post(\n    "/users",\n    summary="Create a new user",\n    description="Creates a user record and returns it with a generated id.",\n    response_description="The newly created user",\n    tags=["Users"],\n)\nasync def create_user(payload: UserCreate):\n    """Business-logic docstring: also shown in the docs if no `description=` is set."""\n    return {"id": 1, **payload.model_dump()}\n```\n\nWhat FastAPI derives automatically, with zero extra annotation, purely from the function signature and Pydantic model: the request body schema (field names, types, which are required vs optional, and any `Field(...)` constraints like `ge=0, le=130` rendered as visible min/max in the docs), the response schema (from `response_model` if set, else inferred from the return type hint), and per-field descriptions/examples (from `Field(description=..., examples=...)`).\n\nThe `/openapi.json` schema is also what powers CLIENT CODE GENERATION — tools like `openapi-generator` or `openapi-typescript` can consume that schema to generate a fully typed frontend API client automatically, meaning a well-annotated FastAPI backend gives you free, always-in-sync typed clients with zero hand-written glue code.\n\nSwagger UI (`/docs`) is interactive — you can execute real requests against the running server directly from the browser (useful for manual testing/demos); ReDoc (`/redoc`) is a cleaner, three-panel READ-ONLY reference more suited to external API consumer documentation. Both can be disabled in production (`FastAPI(docs_url=None, redoc_url=None)`) if you do not want to expose the API surface publicly.',
    productionExample:
      'A platform team publishing an internal API for other teams to consume typically keeps `/docs` enabled in staging (for exploration/manual testing) but disables it in the public-facing production deployment (`docs_url=None`), while still generating `/openapi.json` internally at build time to feed an automated TypeScript client generator that keeps the frontend and backend contracts in sync without manual duplication.',
    bestPractices: [
      'Write meaningful `Field(description=..., examples=[...])` on every Pydantic model field — the auto-generated docs are only as useful as the metadata you actually provide.',
      'Use `response_model` on every path operation so the documented response schema matches what actually gets serialized and returned, not just what the function happens to return internally.',
      'Consider disabling `/docs`/`/redoc` in production for public-facing APIs where exposing the full schema is a information-disclosure concern, while still generating the OpenAPI JSON for internal tooling.',
    ],
    tradeOffs:
      'Auto-generated docs guarantee the documentation can never silently drift out of sync with the actual code (a chronic problem with hand-maintained API docs), at the cost of the docs only being as rich/well-written as the type hints and `Field`/docstring metadata the team actually bothers to add — an under-annotated FastAPI app produces correct but sparse docs.',
    commonMistakes: [
      'Omitting `response_model`, leaving the documented response schema to be loosely inferred (or missing) instead of an explicit, precise contract.',
      'Leaving every Pydantic field with no `description`/`examples`, producing technically-correct but practically unhelpful auto-generated docs for API consumers.',
      'Leaving `/docs` publicly enabled on a production API that should not disclose its full internal endpoint surface and schema to unauthenticated visitors.',
    ],
    followUpQuestions: [
      'How would you exclude a specific internal-only endpoint from the public OpenAPI schema while keeping it functional?',
      'How does `response_model` affect what gets serialized, beyond just what shows up in the docs?',
      'How would you use the generated `/openapi.json` to auto-generate a typed frontend client, and what does that buy a full-stack team?',
    ],
    relatedTopics: ['OpenAPI', 'Swagger UI', 'ReDoc', 'API Documentation', 'response_model'],
  },
  {
    id: 'python-m9-10',
    number: 'PY-M9-10',
    title: 'Coding: a mini REST API — router-based User/Product CRUD with pagination, filtering, sorting',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A realistic "mini REST API" exercise combines everything in this module: `APIRouter`-based structure, versioned prefix, full CRUD on a resource, correct status codes per operation, and query-parameter-driven pagination/filtering/sorting on the list endpoint — all backed by an in-memory store for the exercise (a real app would swap this for a database repository without changing the router/endpoint shape).',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, FastAPI, HTTPException, Query, status\nfrom pydantic import BaseModel\n\nclass ProductIn(BaseModel):\n    name: str\n    price: float\n    category: str\n\nclass Product(ProductIn):\n    id: int\n\nrouter = APIRouter(prefix="/api/v1/products", tags=["Products"])\n_db: dict[int, Product] = {}\n_next_id = 1\n\n@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)\nasync def create_product(payload: ProductIn):\n    global _next_id\n    product = Product(id=_next_id, **payload.model_dump())\n    _db[_next_id] = product\n    _next_id += 1\n    return product\n\n@router.get("/", response_model=list[Product])\nasync def list_products(\n    page: int = Query(1, ge=1),\n    limit: int = Query(20, ge=1, le=100),\n    category: str | None = Query(None, description="Filter by category"),\n    sort_by: str = Query("id", pattern="^(id|name|price)$"),\n):\n    items = list(_db.values())\n    if category:\n        items = [p for p in items if p.category == category]\n    items.sort(key=lambda p: getattr(p, sort_by))\n    start = (page - 1) * limit\n    return items[start : start + limit]\n\n@router.get("/{product_id}", response_model=Product)\nasync def get_product(product_id: int):\n    product = _db.get(product_id)\n    if product is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Product not found")\n    return product\n\n@router.put("/{product_id}", response_model=Product)\nasync def replace_product(product_id: int, payload: ProductIn):\n    if product_id not in _db:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Product not found")\n    product = Product(id=product_id, **payload.model_dump())\n    _db[product_id] = product\n    return product\n\n@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)\nasync def delete_product(product_id: int):\n    if product_id not in _db:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Product not found")\n    del _db[product_id]\n\napp = FastAPI(title="Mini Product API")\napp.include_router(router)\n```\n\nAPI example — creating then listing:\n\n```text\nPOST /api/v1/products/\nBody: {"name": "Laptop", "price": 999.0, "category": "Electronics"}\n-> 201 {"id": 1, "name": "Laptop", "price": 999.0, "category": "Electronics"}\n\nGET /api/v1/products/?category=Electronics&sort_by=price&page=1&limit=20\n-> 200 [{"id": 1, "name": "Laptop", "price": 999.0, "category": "Electronics"}]\n\nGET /api/v1/products/999\n-> 404 {"detail": "Product not found"}\n```',
    productionExample:
      'This exact router/endpoint shape (CRUD + `response_model` + `Query(...)`-validated list params) is what a real production repository-backed resource module looks like at the ROUTER layer — the only change swapping the in-memory `_db` dict for a real database is inside a service/repository layer the router calls into, meaning this exercise\'s structure is directly production-representative, not a toy shortcut.',
    bestPractices: [
      'Validate query parameters at the FRAMEWORK layer (`Query(1, ge=1)`, `pattern=...` for an allow-listed `sort_by`) rather than manually checking them inside the function body — invalid input never even reaches your logic.',
      'Use `response_model` on every endpoint so the returned shape is both documented and enforced/filtered consistently, independent of what the internal store object happens to contain.',
      'Check existence (404) BEFORE attempting a mutating operation (PUT/DELETE) so failures are reported precisely rather than as a generic exception.',
    ],
    tradeOffs:
      'Offset-based pagination (`page`/`limit` -> `start = (page-1)*limit`) shown here is simple and supports "jump to page N", but becomes O(n) per page deep into a large, frequently-changing dataset and can skip/duplicate items if rows are inserted/deleted between page requests — cursor-based pagination (see the pagination question in Module 10) avoids both issues at the cost of losing arbitrary "jump to page N" access.',
    commonMistakes: [
      'Allowing `sort_by` to be an arbitrary unvalidated string and passing it straight to `getattr`/an ORM `order_by`, which is both a correctness risk (typo silently no-ops or crashes) and, with a real ORM, a potential injection-adjacent risk if ever concatenated into raw SQL.',
      'Forgetting `status_code=status.HTTP_201_CREATED` on the create endpoint and `HTTP_204_NO_CONTENT` on delete, leaving both defaulting to a semantically wrong 200.',
      'Validating query parameter RANGES (`ge=1, le=100` for `limit`) is often skipped, allowing a client to request an unbounded page size and pull the entire dataset in one call.',
    ],
    followUpQuestions: [
      'How would you convert this in-memory store to a real async database-backed repository without changing the router\'s public shape?',
      'How would you add a full-text `search` query parameter alongside the existing `category` filter and `sort_by`?',
      'What would you change about this design to support cursor-based pagination instead of offset-based?',
    ],
    relatedTopics: ['APIRouter', 'CRUD', 'Pagination', 'Filtering', 'Sorting', 'response_model', 'Query Validation'],
  },
];

export const MOCK_PYTHON_MODULE9_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
