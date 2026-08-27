// Python + DSA Interview Handbook — Module 14: Advanced FastAPI (Production
// & Senior Level). Hand-authored technical questions covering custom
// middleware, centralized exception handling, background tasks, lifespan
// startup/shutdown, WebSockets, CORS, streaming responses, API versioning
// at production depth, performance, and full production architecture —
// with genuine, idiomatic modern FastAPI code and senior-level reasoning.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m14-1',
    number: 'PY-M14-1',
    title: 'Custom middleware: @app.middleware("http") vs BaseHTTPMiddleware',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Middleware',
    expectedAnswer:
      'Middleware wraps every request/response pair passing through the app. `@app.middleware("http")` is a quick decorator form for a single function-based middleware; `BaseHTTPMiddleware` (from Starlette) is a class-based form that composes more cleanly when you need multiple middlewares with explicit ordering, constructor arguments, or shared state — both ultimately run code before and after `call_next(request)`, wrapping the entire downstream pipeline (routing, dependencies, validation, the endpoint itself).',
    deepExplanation:
      "```python\nimport time\nimport uuid\nimport logging\nfrom starlette.middleware.base import BaseHTTPMiddleware\nfrom fastapi import FastAPI, Request\n\nlogger = logging.getLogger(\"api\")\napp = FastAPI()\n\n# function-based — quick, single middleware\n@app.middleware(\"http\")\nasync def add_request_id(request: Request, call_next):\n    request_id = str(uuid.uuid4())\n    request.state.request_id = request_id      # stash on request.state for downstream access\n    response = await call_next(request)\n    response.headers[\"X-Request-ID\"] = request_id\n    return response\n\n# class-based — composes cleanly, supports constructor config\nclass TimingMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request: Request, call_next):\n        start = time.perf_counter()\n        response = await call_next(request)\n        duration_ms = (time.perf_counter() - start) * 1000\n        response.headers[\"X-Response-Time-Ms\"] = f\"{duration_ms:.2f}\"\n        logger.info(\n            \"request completed\",\n            extra={\n                \"request_id\": getattr(request.state, \"request_id\", None),\n                \"path\": request.url.path,\n                \"method\": request.method,\n                \"status_code\": response.status_code,\n                \"duration_ms\": round(duration_ms, 2),\n            },\n        )\n        return response\n\napp.add_middleware(TimingMiddleware)\n```\n\nOrdering is the subtlety interviewers probe: middlewares added via `add_middleware()` execute OUTER-to-inner in REVERSE registration order on the way in (the LAST one added is the OUTERMOST, running first) and inner-to-outer (unwinding) on the way out — so `add_middleware(A)` then `add_middleware(B)` yields execution order B(in) -> A(in) -> route -> A(out) -> B(out). Getting this backwards is a common source of \"why does my request-ID header show up empty in my logging middleware\" bugs when the logging middleware is registered so it runs BEFORE the request-ID one attaches `request.state.request_id`.\n\nStep 1 — Understand the topic.\nTopic: Custom middleware: @app.middleware(\"http\") vs BaseHTTPMiddleware\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def middleware(request, call_next):\n    request_id = create_request_id()\n    request.state.request_id = request_id\n\n    response = await call_next(request)\n    response.headers[\"X-Request-ID\"] = request_id\n    return response\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp.add_middleware(\n    TimingMiddleware,\n    logger=logger,\n)\n```\n\nStep 5 — Example result:\n```text\nrequest -> downstream -> response\n```\n\nStep 6 — Complexity / trade-off:\nMiddleware is ideal for cross-cutting request/response concerns but runs on every request.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production FastAPI service typically stacks, outermost to innermost: CORS -> GZip compression -> request-ID assignment -> structured request/response logging -> timing — each middleware only touching the concern it owns, composable and independently testable, which is exactly the separation `add_middleware()` composition is designed to support.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Custom middleware: @app.middleware(\"http\") vs BaseHTTPMiddleware**.",
    bestPractices: [
      'Use class-based `BaseHTTPMiddleware` subclasses (not the function decorator) once you have more than one middleware, so ordering via repeated `add_middleware()` calls is explicit and each middleware can take constructor configuration.',
      'Stash cross-cutting per-request values (request ID, authenticated user, trace context) on `request.state`, not module-level globals — `request.state` is correctly scoped per request even under concurrent async execution.',
      'Register the request-ID middleware BEFORE (outer to) any logging middleware that needs to read it, remembering registration order is reversed for the "on the way in" pass.',
    ],
    tradeOffs:
      'Middleware is the only mechanism that can inspect/modify BOTH the raw incoming request and the final outgoing response uniformly across every route, but that same universality means it runs on every single request including ones that do not need it (e.g. a health-check endpoint still pays for logging middleware overhead) — unlike a dependency, middleware cannot be selectively opted out of per route without extra conditional logic inside it.',
    commonMistakes: [
      'Assuming `add_middleware()` calls execute in the order they were written — the LAST registered middleware is actually the OUTERMOST and runs first on the way in.',
      'Doing blocking, CPU-heavy, or slow I/O work directly inside `dispatch()`/the middleware function without `await`, which stalls every single request passing through the app, not just one.',
      'Forgetting that an exception raised inside the endpoint propagates back UP through middleware\'s `call_next()` call — middleware that does not wrap it in try/except can crash before response-side logic (like closing the timing measurement) ever runs.',
    ],
    followUpQuestions: [
      'Why is the middleware registered LAST the one that runs FIRST on the incoming side?',
      'How would you make a middleware apply to only a subset of routes without moving that logic into a dependency?',
      'What happens to your timing/logging middleware if the endpoint raises an unhandled exception — does your `X-Response-Time-Ms` header still get set?',
    ],
    relatedTopics: ['Middleware', 'BaseHTTPMiddleware', 'Request State', 'Structured Logging', 'ASGI'],
  },
  {
    id: 'python-m14-2',
    number: 'PY-M14-2',
    title: 'Centralized exception handling: HTTPException, custom exceptions, and global handlers',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Exception Handling',
    expectedAnswer:
      'FastAPI lets you register `@app.exception_handler(ExceptionType)` handlers that convert ANY raised exception type — `HTTPException`, a domain-specific custom exception, Pydantic\'s `RequestValidationError`, or an unhandled `Exception` — into a consistent JSON error response, centralizing what would otherwise be scattered try/except blocks across every endpoint. This is essential in production both for a consistent client-facing error CONTRACT and for making sure raw exception details/stack traces never leak to the client.',
    deepExplanation:
      "```python\nimport logging\nfrom fastapi import FastAPI, HTTPException, Request, status\nfrom fastapi.exceptions import RequestValidationError\nfrom fastapi.responses import JSONResponse\n\nlogger = logging.getLogger(\"api\")\napp = FastAPI()\n\nclass DomainError(Exception):\n    def __init__(self, message: str, code: str, status_code: int = status.HTTP_400_BAD_REQUEST):\n        self.message, self.code, self.status_code = message, code, status_code\n\nclass ResourceNotFoundError(DomainError):\n    def __init__(self, resource: str, resource_id):\n        super().__init__(f\"{resource} {resource_id} not found\", \"NOT_FOUND\", status.HTTP_404_NOT_FOUND)\n\ndef error_envelope(code: str, message: str, request_id: str | None = None) -> dict:\n    return {\"error\": {\"code\": code, \"message\": message, \"request_id\": request_id}}\n\n@app.exception_handler(DomainError)\nasync def handle_domain_error(request: Request, exc: DomainError):\n    return JSONResponse(\n        status_code=exc.status_code,\n        content=error_envelope(exc.code, exc.message, getattr(request.state, \"request_id\", None)),\n    )\n\n@app.exception_handler(HTTPException)\nasync def handle_http_exception(request: Request, exc: HTTPException):\n    return JSONResponse(\n        status_code=exc.status_code,\n        content=error_envelope(\"HTTP_ERROR\", str(exc.detail), getattr(request.state, \"request_id\", None)),\n    )\n\n@app.exception_handler(RequestValidationError)\nasync def handle_validation_error(request: Request, exc: RequestValidationError):\n    return JSONResponse(\n        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,\n        content=error_envelope(\"VALIDATION_ERROR\", \"Invalid request data\", getattr(request.state, \"request_id\", None))\n        | {\"details\": exc.errors()},\n    )\n\n@app.exception_handler(Exception)\nasync def handle_unexpected(request: Request, exc: Exception):\n    logger.exception(\"unhandled exception\", extra={\"path\": request.url.path})   # log full traceback SERVER-SIDE only\n    return JSONResponse(\n        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,\n        content=error_envelope(\"INTERNAL_ERROR\", \"An unexpected error occurred\", getattr(request.state, \"request_id\", None)),\n    )\n\n@app.get(\"/users/{user_id}\")\nasync def get_user(user_id: int):\n    if user_id != 1:\n        raise ResourceNotFoundError(\"User\", user_id)\n    return {\"id\": 1, \"name\": \"Ada\"}\n```\n\nThe critical security discipline: the generic `Exception` handler LOGS the full exception (with `logger.exception`, capturing the traceback) but returns only a generic, non-revealing message to the client — never `str(exc)` or the traceback itself in the response body, since that can leak internal implementation details (file paths, library versions, SQL fragments) useful to an attacker.\n\nStep 1 — Understand the topic.\nTopic: Centralized exception handling: HTTPException, custom exceptions, and global handlers\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nclass DomainError(Exception):\n    pass\n\n@app.exception_handler(DomainError)\nasync def handle_domain_error(request, exc):\n    return JSONResponse(\n        status_code=400,\n        content={\n            \"code\": \"DOMAIN_ERROR\",\n            \"message\": str(exc),\n        },\n    )\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nraise HTTPException(\n    status_code=404,\n    detail=\"User not found\",\n)\n```\n\nStep 5 — Example result:\n```text\n{\"code\":\"DOMAIN_ERROR\",\"message\":\"...\"}\n```\n\nStep 6 — Complexity / trade-off:\nUse global handlers for stable error envelopes; keep endpoint code focused on business flow.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production API defines a small hierarchy of domain exceptions (`ResourceNotFoundError`, `PermissionDeniedError`, `ConflictError`) that business/service-layer code raises directly without any knowledge of HTTP — a SINGLE set of exception handlers at the app level translates them to the correct status code and a consistent envelope, keeping HTTP concerns entirely out of the service layer and making that layer trivially reusable outside a web context (e.g. from a CLI or background worker).\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Centralized exception handling: HTTPException, custom exceptions, and global handlers**.",
    bestPractices: [
      'Define a small hierarchy of domain-specific exceptions that carry a status code and machine-readable error code, and let a handful of centralized `@app.exception_handler` functions do the HTTP translation — never scatter `try/except -> HTTPException` in every endpoint.',
      'Always log the full exception server-side (with traceback) in the generic `Exception` handler, while returning a generic, non-leaking message to the client.',
      'Return a CONSISTENT error envelope shape across every handler (`{"error": {"code", "message", ...}}`) so client-side error handling can be written once, generically.',
    ],
    tradeOffs:
      'Centralized exception handlers trade a small amount of upfront design (defining the exception hierarchy and envelope shape) for eliminating repetitive, inconsistent, easy-to-forget try/except blocks in every endpoint — the risk of a stray endpoint leaking a raw traceback drops to near zero once the generic `Exception` handler is the sole last-resort safety net.',
    commonMistakes: [
      'Returning `str(exc)` or an exception\'s `__traceback__` directly in a client-facing response, leaking internal implementation details.',
      'Registering an exception handler for a PARENT exception class but expecting it to also catch instances raised as a totally unrelated type — handler dispatch matches by exact/`isinstance` type, so the hierarchy must be designed deliberately.',
      'Forgetting to also handle `RequestValidationError` explicitly, leaving Pydantic\'s default (already reasonable, but inconsistent with your custom envelope) 422 response shape mismatched against your other error responses.',
    ],
    followUpQuestions: [
      'Why must the catch-all `Exception` handler avoid returning the actual exception message or traceback to the client?',
      'How would you attach the same `request_id` used in your logging middleware to every error response consistently?',
      'How does exception-handler dispatch decide which handler to call when an exception has multiple matching registered types in its MRO?',
    ],
    relatedTopics: ['Exception Handling', 'HTTPException', 'RequestValidationError', 'Error Envelope', 'Security'],
  },
  {
    id: 'python-m14-3',
    number: 'PY-M14-3',
    title: 'BackgroundTasks: fire-and-forget work vs a real task queue',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Background Tasks',
    expectedAnswer:
      '`BackgroundTasks` runs a function AFTER the response has been sent to the client, inside the SAME process/worker — appropriate for cheap, best-effort, non-critical work (sending a confirmation email, writing an audit log line) where losing the task on a crash or restart is acceptable. It is NOT a durable queue: there is no retry, no persistence, no distribution across workers, and a long-running background task still consumes that worker\'s resources — genuinely important, retryable, or heavy work belongs in a real task queue (Celery, RQ, arq, Dramatiq) backed by a broker like Redis/RabbitMQ.',
    deepExplanation:
      "```python\nimport logging\nfrom fastapi import BackgroundTasks, FastAPI\n\napp = FastAPI()\nlogger = logging.getLogger(\"api\")\n\ndef send_confirmation_email(to: str, order_id: int) -> None:\n    # best-effort: if this fails or the process crashes mid-flight, the email is just lost\n    logger.info(\"sending confirmation email to=%s order_id=%s\", to, order_id)\n\ndef write_audit_log(action: str, actor_id: int) -> None:\n    logger.info(\"audit action=%s actor_id=%s\", action, actor_id)\n\n@app.post(\"/orders\")\nasync def create_order(email: str, background_tasks: BackgroundTasks):\n    order_id = 123   # ... real order creation happens synchronously, in the request/response path ...\n    background_tasks.add_task(send_confirmation_email, email, order_id)\n    background_tasks.add_task(write_audit_log, \"order_created\", actor_id=order_id)\n    return {\"order_id\": order_id, \"status\": \"created\"}   # client gets this response IMMEDIATELY\n    # both background tasks run AFTER this response is sent, before the worker picks up its next request\n```\n\nWhy `BackgroundTasks` is fundamentally NOT a job queue: it executes within the same ASGI worker process that handled the request, on the same event loop, sequentially, right after the response is sent — there is no separate worker pool, no broker, no persistence of pending tasks anywhere. If the process crashes or restarts between \"response sent\" and \"background task completes\", that task is silently gone with NO record it was ever supposed to run and no automatic retry.\n\n```python\n# when the work genuinely needs durability/retry/distribution, reach for a real queue instead:\nfrom celery import Celery\n\ncelery_app = Celery(\"worker\", broker=\"redis://localhost:6379/0\")\n\n@celery_app.task(bind=True, max_retries=3, default_retry_delay=30)\ndef send_confirmation_email_task(self, to: str, order_id: int):\n    try:\n        ...  # actual email send\n    except Exception as exc:\n        raise self.retry(exc=exc)\n\n# in the FastAPI endpoint:\n@app.post(\"/orders\")\nasync def create_order(email: str):\n    order_id = 123\n    send_confirmation_email_task.delay(email, order_id)   # enqueued to Redis, run by a SEPARATE worker process, with retries\n    return {\"order_id\": order_id, \"status\": \"created\"}\n```\n\nStep 1 — Understand the topic.\nTopic: BackgroundTasks: fire-and-forget work vs a real task queue\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef write_audit_log(event):\n    audit_store.append(event)\n\n@app.post(\"/orders\")\nasync def create_order(\n    background_tasks: BackgroundTasks,\n):\n    order = create_order_now()\n    background_tasks.add_task(\n        write_audit_log,\n        order.id,\n    )\n    return order\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nbackground_tasks.add_task(\n    send_email,\n    user.email,\n)\n```\n\nStep 5 — Example result:\n```text\nresponse returns before audit task completes\n```\n\nStep 6 — Complexity / trade-off:\nBackgroundTasks are fine for short in-process follow-up work, not durable queues or long-running jobs.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production checkout flow uses `BackgroundTasks` for a cheap, non-critical action like emitting an analytics event, but routes the actual \"send order confirmation email\" and \"charge the payment provider\" work through Celery/RQ specifically because those need guaranteed-at-least-once delivery with retries — losing an analytics ping silently is acceptable, silently losing a payment confirmation email or a retry-needing payment charge is not.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **BackgroundTasks: fire-and-forget work vs a real task queue**.",
    bestPractices: [
      'Use `BackgroundTasks` only for cheap, non-critical, best-effort work where silent loss on a crash/restart is an acceptable outcome.',
      'Route anything that needs guaranteed delivery, retries, rate limiting, scheduling, or cross-process distribution (emails, payment webhooks, heavy file processing) to a real task queue with a durable broker, not `BackgroundTasks`.',
      'Never do CPU-heavy synchronous work inside a `BackgroundTasks` function on an async worker — it still blocks that worker\'s event loop just like a blocking call inside an `async def` endpoint would.',
    ],
    tradeOffs:
      '`BackgroundTasks` costs zero extra infrastructure (no broker, no separate worker deployment) and is trivial to wire up, but provides no durability/retry/observability guarantees; a real task queue (Celery/RQ/arq) gives you all of that at the cost of running and operating an entirely separate piece of infrastructure (broker + worker processes) that must itself be monitored and scaled.',
    commonMistakes: [
      'Using `BackgroundTasks` for payment processing, order fulfillment, or any action where silent loss on a worker crash/restart is unacceptable.',
      'Assuming `BackgroundTasks` runs on a separate thread/process — it runs on the SAME event loop as request handling, so a slow or blocking background task delays that worker\'s ability to serve its next request.',
      'Forgetting that `BackgroundTasks` has no retry mechanism at all — an exception inside a background task is simply logged (or silently swallowed depending on configuration) with no automatic re-attempt.',
    ],
    followUpQuestions: [
      'What specifically happens to a pending `BackgroundTasks` task if the Uvicorn worker process is killed mid-execution?',
      'How would you decide, for a new feature, whether `BackgroundTasks` or a real task queue is the right tool?',
      'How does a Celery/RQ worker\'s process model differ from a FastAPI ASGI worker\'s, and why does that matter for CPU-bound background work?',
    ],
    relatedTopics: ['BackgroundTasks', 'Celery', 'Task Queues', 'Durability', 'Async I/O'],
  },
  {
    id: 'python-m14-4',
    number: 'PY-M14-4',
    title: 'Lifespan events: startup/shutdown resource management the modern way',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Lifespan',
    expectedAnswer:
      'The `lifespan` async context manager (passed to `FastAPI(lifespan=...)`) is the modern, recommended way to run startup and shutdown code — everything before `yield` runs once when the app starts (e.g. open a DB connection pool, warm a cache), everything after `yield` runs once when the app shuts down (e.g. close that pool gracefully), and the value yielded becomes available to every request via `request.state`. It replaces the older `@app.on_event("startup")`/`@app.on_event("shutdown")` decorators, which are deprecated because splitting startup/shutdown logic across two separate, unrelated functions made it easy to forget to release something acquired at startup.',
    deepExplanation:
      "```python\nimport logging\nfrom contextlib import asynccontextmanager\nfrom fastapi import FastAPI, Request\nimport asyncpg\nfrom redis.asyncio import Redis\n\nlogger = logging.getLogger(\"api\")\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # --- STARTUP: runs once, before the app accepts any requests ---\n    logger.info(\"starting up: creating db pool and redis client\")\n    db_pool = await asyncpg.create_pool(dsn=\"postgresql://user:pass@localhost/db\", min_size=5, max_size=20)\n    redis_client = Redis.from_url(\"redis://localhost:6379/0\")\n    app.state.db_pool = db_pool\n    app.state.redis = redis_client\n\n    yield   # --- the app runs and serves requests for as long as this generator is paused here ---\n\n    # --- SHUTDOWN: runs once, after the app stops accepting new requests ---\n    logger.info(\"shutting down: closing db pool and redis client\")\n    await db_pool.close()\n    await redis_client.aclose()\n\napp = FastAPI(lifespan=lifespan)\n\n@app.get(\"/users/{user_id}\")\nasync def get_user(user_id: int, request: Request):\n    async with request.app.state.db_pool.acquire() as conn:\n        row = await conn.fetchrow(\"SELECT id, name FROM users WHERE id = $1\", user_id)\n    return dict(row) if row else {\"error\": \"not found\"}\n```\n\nWhy this beats `@app.on_event`: the `try`/`finally`-like structure of a single generator function GUARANTEES the shutdown code is co-located with, and conceptually tied to, the exact resource it is cleaning up — with the old split-decorator approach, it was easy to add a NEW resource at startup and simply forget to add matching cleanup in the separate shutdown function, since nothing in the code structure forces you to think about both together. A generator naturally pairs \"acquire, then release\" the way a `with` block or `try/finally` does.\n\nFor MULTIPLE independent resources, you can nest `async with` blocks or use `contextlib.AsyncExitStack` inside the same `lifespan` function to keep acquire/release pairing explicit even as the number of resources grows.\n\nStep 1 — Understand the topic.\nTopic: Lifespan events: startup/shutdown resource management the modern way\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\n@asynccontextmanager\nasync def lifespan(app):\n    app.state.redis = await create_redis()\n    try:\n        yield\n    finally:\n        await app.state.redis.close()\n\napp = FastAPI(lifespan=lifespan)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp = FastAPI(lifespan=lifespan)\n```\n\nStep 5 — Example result:\n```text\nstartup resource available; shutdown cleanup runs\n```\n\nStep 6 — Complexity / trade-off:\nKeep shared resources in lifespan with deterministic startup/shutdown cleanup.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production FastAPI service uses `lifespan` to establish its database connection pool, Redis client, and any long-lived HTTP client (`httpx.AsyncClient`, reused across requests instead of recreated per-request for connection-pooling efficiency) once at startup, and to close all three cleanly on shutdown — critical for Kubernetes deployments, where a pod receiving SIGTERM needs its shutdown handler to finish in-flight requests and release connections before the pod is forcibly killed.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Lifespan events: startup/shutdown resource management the modern way**.",
    bestPractices: [
      'Use `lifespan` (not `@app.on_event`) for all startup/shutdown resource management in new code — it is the current, recommended API and the old decorators are deprecated.',
      'Store shared resources (DB pool, cache client, long-lived HTTP client) on `app.state`, accessed via `request.app.state` in endpoints, rather than module-level globals — this keeps resource lifetime explicitly tied to the app instance, which matters for testing (each test can construct its own app with its own lifespan).',
      'Always release every resource acquired before `yield` in the code AFTER `yield`, even under abnormal shutdown, to avoid leaking connections/file handles across restarts.',
    ],
    tradeOffs:
      'A single `lifespan` function that manages several independent resources keeps acquire/release visually paired but can grow unwieldy as more resources are added; splitting each resource into its own small async context manager (composed via `AsyncExitStack`) keeps individual concerns isolated and testable at the cost of slightly more boilerplate to wire them together.',
    commonMistakes: [
      'Still using the deprecated `@app.on_event("startup")`/`@app.on_event("shutdown")` decorators in new code, especially by splitting related setup/teardown logic across two functions where it is easy to forget matching cleanup.',
      'Storing a DB pool or client as a plain module-level global instead of on `app.state`, which makes it awkward to construct isolated app instances for testing.',
      'Creating a new `httpx.AsyncClient` (or DB connection) PER REQUEST inside the endpoint instead of once at startup via `lifespan` and reusing it — defeating connection pooling and adding needless per-request connection-setup latency.',
    ],
    followUpQuestions: [
      'What would go wrong if you opened your database pool inside an endpoint function instead of in `lifespan`?',
      'How does `lifespan` interact with `--reload` in development — does startup/shutdown run once or repeatedly?',
      'How would you write a test that overrides the resources normally created in `lifespan` with test doubles?',
    ],
    relatedTopics: ['Lifespan', 'Startup/Shutdown', 'Connection Pooling', 'app.state', 'Resource Management'],
  },
  {
    id: 'python-m14-5',
    number: 'PY-M14-5',
    title: 'Coding: WebSocket real-time chat with a ConnectionManager, rooms, and auth',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'WebSockets',
    expectedAnswer:
      'A WebSocket connection starts as an HTTP request that gets upgraded to a persistent, full-duplex TCP-backed connection; FastAPI exposes this via `@app.websocket(...)` and a `WebSocket` object with `accept()`, `send_text()`/`send_json()`, `receive_text()`/`receive_json()`, and disconnect handling via `WebSocketDisconnect`. Real-time features like chat need a `ConnectionManager` that tracks live connections (commonly grouped by room) so a message from one client can be BROADCAST to every other connected client in the same room.',
    deepExplanation:
      "```python\nfrom collections import defaultdict\nfrom fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query, status\n\napp = FastAPI()\n\nclass ConnectionManager:\n    def __init__(self):\n        self._rooms: dict[str, set[WebSocket]] = defaultdict(set)\n\n    async def connect(self, room: str, websocket: WebSocket) -> None:\n        await websocket.accept()          # completes the HTTP -> WebSocket upgrade handshake\n        self._rooms[room].add(websocket)\n\n    def disconnect(self, room: str, websocket: WebSocket) -> None:\n        self._rooms[room].discard(websocket)\n        if not self._rooms[room]:\n            del self._rooms[room]\n\n    async def broadcast(self, room: str, message: dict, exclude: WebSocket | None = None) -> None:\n        dead: list[WebSocket] = []\n        for connection in self._rooms.get(room, set()):\n            if connection is exclude:\n                continue\n            try:\n                await connection.send_json(message)\n            except Exception:\n                dead.append(connection)         # connection went away mid-broadcast\n        for connection in dead:\n            self._rooms[room].discard(connection)\n\nmanager = ConnectionManager()\n\nasync def authenticate(token: str) -> str | None:\n    # in production: verify a JWT (see Module 13) and return the username/subject, or None if invalid\n    return \"ada\" if token == \"valid-token\" else None\n\n@app.websocket(\"/ws/chat/{room}\")\nasync def chat_endpoint(websocket: WebSocket, room: str, token: str = Query(...)):\n    user = await authenticate(token)\n    if user is None:\n        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)   # reject BEFORE accept() completes the handshake\n        return\n    await manager.connect(room, websocket)\n    await manager.broadcast(room, {\"type\": \"system\", \"message\": f\"{user} joined\"}, exclude=websocket)\n    try:\n        while True:\n            data = await websocket.receive_json()\n            await manager.broadcast(room, {\"type\": \"message\", \"user\": user, \"text\": data[\"text\"]})\n    except WebSocketDisconnect:\n        manager.disconnect(room, websocket)\n        await manager.broadcast(room, {\"type\": \"system\", \"message\": f\"{user} left\"})\n```\n\nKey design points worth calling out: authentication happens BEFORE `websocket.accept()` — a WebSocket token is commonly passed as a query parameter (`?token=...`) rather than a header, because many browser WebSocket clients cannot set custom headers on the initial handshake request; closing with a specific close code (`WS_1008_POLICY_VIOLATION`) communicates WHY the connection was rejected, which a well-behaved client can inspect. The `try/except WebSocketDisconnect` around the `while True: receive` loop is mandatory — a client closing the tab raises exactly this exception, and without catching it the server would raise an unhandled exception for every client that simply navigates away.\n\nBroadcasting iterates a COPY-safe structure and collects dead connections rather than mutating `self._rooms[room]` while iterating it (which would raise `RuntimeError: set changed size during iteration` in Python) — a subtle but important correctness detail for any fan-out broadcast implementation.\n\nStep 1 — Understand the topic.\nTopic: Coding: WebSocket real-time chat with a ConnectionManager, rooms, and auth\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nclass ConnectionManager:\n    def __init__(self):\n        self.connections = []\n\n    async def connect(self, socket):\n        await socket.accept()\n        self.connections.append(socket)\n\n    async def broadcast(self, message):\n        for socket in self.connections:\n            await socket.send_text(message)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nawait manager.broadcast(\n    \"hello room\"\n)\n```\n\nStep 5 — Example result:\n```text\nconnected clients receive the message\n```\n\nStep 6 — Complexity / trade-off:\nWebSockets require auth, disconnect cleanup, backpressure, and room/lifecycle management.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production real-time chat/notifications service typically layers Redis Pub/Sub (or a dedicated message broker) UNDER a `ConnectionManager` like this one once the service runs on more than one server instance — a single in-process `ConnectionManager` set only tracks connections on ITS OWN process, so a message from a client connected to server A would never reach a client connected to server B without a shared broadcast layer between instances.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: WebSocket real-time chat with a ConnectionManager, rooms, and auth**.",
    bestPractices: [
      'Authenticate a WebSocket connection BEFORE calling `accept()` (or immediately after, closing right away on failure) — never accept first and validate later, which briefly gives an unauthenticated client a live connection.',
      'Always wrap the receive loop in `try/except WebSocketDisconnect` and clean up the connection from your manager\'s tracking structure in that handler — leaking dead connection references is a slow memory/resource leak.',
      'When broadcasting, never mutate the connection collection while iterating it directly — collect exceptions/dead connections separately and remove them after the iteration completes.',
    ],
    tradeOffs:
      'An in-process `ConnectionManager` (as shown) is simple and needs no extra infrastructure, but only works correctly for a SINGLE server instance — scaling to multiple instances requires a shared broadcast layer (Redis Pub/Sub, a message broker) so messages can fan out across processes, adding real operational complexity in exchange for horizontal scalability.',
    commonMistakes: [
      'Accepting the WebSocket connection before validating the auth token, briefly exposing a live, unauthenticated bidirectional channel.',
      'Not catching `WebSocketDisconnect`, causing an unhandled exception (and a noisy stack trace / potential resource leak) every time any client simply closes their browser tab.',
      'Building a single in-process `ConnectionManager` and assuming it will "just scale" once the service is deployed across multiple replicas, without a shared broadcast mechanism between them.',
    ],
    followUpQuestions: [
      'How would you scale this ConnectionManager to work correctly across multiple FastAPI server instances (hint: Redis Pub/Sub)?',
      'Why must WebSocket auth tokens often be passed as query parameters instead of an Authorization header?',
      'How would you implement a heartbeat/ping-pong mechanism to detect and clean up dead connections that never raise `WebSocketDisconnect` (e.g. a client that lost network without a clean close)?',
    ],
    relatedTopics: ['WebSockets', 'ConnectionManager', 'Broadcasting', 'Real-Time', 'Authentication', 'Redis Pub/Sub'],
  },
  {
    id: 'python-m14-6',
    number: 'PY-M14-6',
    title: 'CORS in depth: same-origin policy, preflight, and secure CORSMiddleware configuration',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'CORS',
    expectedAnswer:
      'Browsers enforce the same-origin policy: JavaScript running on `https://app.example.com` cannot read a response from `https://api.example.com` unless the API explicitly opts in via CORS response headers. For "non-simple" requests (custom headers like `Authorization`, methods like PUT/DELETE, or `Content-Type: application/json` in some cases), the browser first sends an automatic `OPTIONS` preflight request asking permission before sending the real one. FastAPI\'s `CORSMiddleware` answers both the preflight and the actual request with the appropriate `Access-Control-*` headers — but `allow_origins=["*"]` combined with `allow_credentials=True` is explicitly forbidden by the CORS spec (and rejected by browsers), because it would let literally ANY website make authenticated, cookie-bearing requests to your API on a logged-in user\'s behalf.',
    deepExplanation:
      "```python\nfrom fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI()\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"https://app.example.com\", \"https://staging.example.com\"],   # explicit allow-list, never \"*\" with credentials\n    allow_credentials=True,        # allows cookies / Authorization header to be sent cross-origin\n    allow_methods=[\"GET\", \"POST\", \"PUT\", \"DELETE\"],\n    allow_headers=[\"Authorization\", \"Content-Type\"],\n)\n```\n\nWhat actually happens on the wire for a cross-origin `PUT` request with a custom header, in order:\n\n```text\n1. Browser sends a preflight:\n   OPTIONS /api/v1/users/42 HTTP/1.1\n   Origin: https://app.example.com\n   Access-Control-Request-Method: PUT\n   Access-Control-Request-Headers: authorization, content-type\n\n2. Server (CORSMiddleware) responds, WITHOUT running your endpoint code at all:\n   HTTP/1.1 200 OK\n   Access-Control-Allow-Origin: https://app.example.com\n   Access-Control-Allow-Methods: GET, POST, PUT, DELETE\n   Access-Control-Allow-Headers: Authorization, Content-Type\n   Access-Control-Allow-Credentials: true\n\n3. ONLY if the preflight response permits it, the browser sends the real request:\n   PUT /api/v1/users/42 HTTP/1.1\n   Origin: https://app.example.com\n   Authorization: Bearer ...\n   {...}\n```\n\nWhy `allow_origins=[\"*\"]` + `allow_credentials=True` is a real vulnerability, not just a spec technicality: if the browser allowed a wildcard origin to also send credentials (cookies, `Authorization` headers), then ANY malicious website the logged-in user happens to visit could silently issue authenticated requests to your API using the victim\\\n\nStep 1 — Understand the topic.\nTopic: CORS in depth: same-origin policy, preflight, and secure CORSMiddleware configuration\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def middleware(request, call_next):\n    request_id = create_request_id()\n    request.state.request_id = request_id\n\n    response = await call_next(request)\n    response.headers[\"X-Request-ID\"] = request_id\n    return response\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp.add_middleware(\n    TimingMiddleware,\n    logger=logger,\n)\n```\n\nStep 5 — Example result:\n```text\nrequest -> downstream -> response\n```\n\nStep 6 — Complexity / trade-off:\nMiddleware is ideal for cross-cutting request/response concerns but runs on every request.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production API serving both a marketing site (`example.com`, no auth needed, safe to leave open) and an authenticated dashboard (`app.example.com`, needs credentials) typically configures TWO different CORS policies — either two separate deployments/paths, or dynamic origin validation in a custom origin-checking function — rather than one blanket wildcard policy that would be both insecure for the authenticated part and unnecessarily restrictive for the public part.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **CORS in depth: same-origin policy, preflight, and secure CORSMiddleware configuration**.",
    bestPractices: [
      'Always use an explicit `allow_origins` allow-list of real frontend origins in production — never `["*"]` for any API that also sets `allow_credentials=True`.',
      'Scope `allow_methods`/`allow_headers` to only what your frontend actually needs, rather than allowing everything by default, to keep the API surface exposed to browsers minimal.',
      'Remember CORS is a BROWSER-enforced protection, not a server-side authorization mechanism — it does nothing to stop non-browser clients (curl, another backend service, a mobile app) from calling your API directly; real authorization still needs to happen via auth tokens/permissions.',
    ],
    tradeOffs:
      'A tight, explicit CORS origin allow-list is more secure but requires updating the middleware configuration (or a dynamic origin-validation callback) every time a new legitimate frontend origin is added (a new staging environment, a new subdomain) — a wildcard is more convenient during early development but is never appropriate once the API handles any authenticated/credentialed traffic.',
    commonMistakes: [
      'Setting `allow_origins=["*"]` together with `allow_credentials=True`, which browsers will actually reject/ignore, silently breaking cross-origin authenticated requests in a confusing way.',
      'Believing CORS headers are what "secure" an API from unauthorized cross-origin access — CORS only restricts what BROWSER JavaScript can read, not what any HTTP client can send; real security still requires server-side auth checks.',
      'Forgetting that a misconfigured preflight response (missing an allowed custom header or method) causes the browser to block the REAL request entirely, producing a confusing client-side "CORS error" that has nothing to do with the actual endpoint logic.',
    ],
    followUpQuestions: [
      'Why does a preflight OPTIONS request never reach your actual endpoint function?',
      'What is the concrete attack CORS credential restrictions prevent, in terms of a real victim/attacker scenario?',
      'How would you support a dynamic set of allowed origins (e.g. any `*.example.com` subdomain) rather than a fixed list?',
    ],
    relatedTopics: ['CORS', 'Same-Origin Policy', 'Preflight', 'CORSMiddleware', 'Security'],
  },
  {
    id: 'python-m14-7',
    number: 'PY-M14-7',
    title: 'Streaming responses: StreamingResponse, chunked transfer, and Server-Sent Events',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Streaming',
    expectedAnswer:
      '`StreamingResponse` sends a response body incrementally from an (async) generator instead of building the entire payload in memory first — essential for large file downloads, CSV/report exports, or any response too large (or too slow to fully compute) to buffer entirely before the first byte is sent. Server-Sent Events (SSE) build on the same streaming mechanism with a specific `text/event-stream` content type and `data: ...\\n\\n` framing, giving a simple one-way (server-to-client) real-time push channel over plain HTTP — a lighter-weight alternative to WebSockets when the client never needs to send messages back.',
    deepExplanation:
      "```python\nimport asyncio\nimport csv\nimport io\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\n\napp = FastAPI()\n\nasync def generate_large_csv():\n    header = io.StringIO()\n    csv.writer(header).writerow([\"id\", \"name\", \"email\"])\n    yield header.getvalue()\n    for i in range(1, 100_001):                 # simulate 100k rows without holding them all in memory\n        row = io.StringIO()\n        csv.writer(row).writerow([i, f\"user{i}\", f\"user{i}@example.com\"])\n        yield row.getvalue()\n        if i % 10_000 == 0:\n            await asyncio.sleep(0)               # yield control back to the event loop periodically\n\n@app.get(\"/export/users.csv\")\nasync def export_users():\n    return StreamingResponse(\n        generate_large_csv(),\n        media_type=\"text/csv\",\n        headers={\"Content-Disposition\": \"attachment; filename=users.csv\"},\n    )\n\nasync def event_stream():\n    counter = 0\n    while True:\n        counter += 1\n        yield f\"data: {{\\\"tick\\\": {counter}}}\\\n\\\n\"   # SSE framing: \\\"data: <payload>\\\\\\\n\\\\\\\n\\\"\n        await asyncio.sleep(1)\n\n@app.get(\"/events\")\nasync def sse_endpoint():\n    return StreamingResponse(event_stream(), media_type=\"text/event-stream\")\n```\n\nWhy streaming matters for memory: a naive `return {\"rows\": [build_all_100k_rows()]}` endpoint must construct the ENTIRE response body in process memory before FastAPI can send even the first byte, which for a genuinely large export can spike memory usage dramatically and delays time-to-first-byte until the whole thing is ready. `StreamingResponse` instead sends each chunk as soon as the generator yields it, using HTTP\\\n\nStep 1 — Understand the topic.\nTopic: Streaming responses: StreamingResponse, chunked transfer, and Server-Sent Events\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef rows():\n    yield \"id,name\\n\"\n    for row in load_rows():\n        yield f'{row[\"id\"]},{row[\"name\"]}\\n'\n\nreturn StreamingResponse(\n    rows(),\n    media_type=\"text/csv\",\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nreturn StreamingResponse(\n    rows(),\n    media_type=\"text/csv\",\n)\n```\n\nStep 5 — Example result:\n```text\nstreamed rows\n```\n\nStep 6 — Complexity / trade-off:\nStreaming bounds memory and is appropriate for large downloads or event streams.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production analytics dashboard uses SSE for \"live metric updates\" (server pushes new numbers as they compute, client never sends anything back) precisely because it avoids WebSocket connection-management complexity while still getting real-time push, whereas the export-to-CSV feature on the same product uses `StreamingResponse` specifically to avoid buffering potentially hundreds of megabytes of report data in a single worker\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Streaming responses: StreamingResponse, chunked transfer, and Server-Sent Events**.",
    bestPractices: [
      'Use `StreamingResponse` for any response whose full size is large or unknown upfront (big exports, proxied downloads) instead of building the complete body in memory first.',
      'Prefer SSE over WebSockets whenever communication is genuinely one-directional (server push only) — it is simpler to implement, works over plain HTTP, and browsers auto-reconnect `EventSource` natively.',
      'Periodically `await asyncio.sleep(0)` (or otherwise yield control) inside a long-running streaming generator doing CPU work, so it does not monopolize the event loop and starve other concurrent requests on the same worker.',
    ],
    tradeOffs:
      'Streaming trades a slightly more complex generator-based implementation (and the loss of easy retrying/buffering the WHOLE response, since it is being sent incrementally) for dramatically lower memory usage and faster time-to-first-byte on large responses — for small, fully-computable-instantly payloads, a normal JSON response is simpler and the streaming complexity is not worth it.',
    commonMistakes: [
      'Building the entire response in a list and yielding it all at once from the generator (`yield full_data` in one shot), which defeats the entire memory-saving purpose of streaming.',
      'Forgetting the exact SSE framing (`data: <payload>\\n\\n`, a blank line terminator) — malformed framing causes browser `EventSource` clients to silently fail to parse events.',
      'Using a synchronous, CPU-heavy generator with no `await` points inside a `StreamingResponse` on an async worker, blocking the event loop for the entire duration of the stream.',
    ],
    followUpQuestions: [
      'Why does `StreamingResponse` help memory usage even though the total bytes sent over the network are the same either way?',
      'When would you choose SSE over a WebSocket, and when would that choice actually hurt you?',
      'How would a client detect that a stream was cut off partway through (e.g. a network failure mid-export)?',
    ],
    relatedTopics: ['StreamingResponse', 'Server-Sent Events', 'Chunked Transfer Encoding', 'Memory Efficiency', 'WebSockets'],
  },
  {
    id: 'python-m14-8',
    number: 'PY-M14-8',
    title: 'API versioning and deprecation strategy at production depth',
    difficulty: 'Medium',
    experienceLevel: '4+ Years',
    category: 'API Versioning',
    expectedAnswer:
      'Beyond just picking URL-based (`/api/v1`, `/api/v2`) versus header-based versioning, a production deprecation strategy needs a communicated timeline, machine-readable deprecation signals (`Deprecation`/`Sunset` response headers), and observability into who is still calling the old version — so an old version can be safely retired with evidence, not guesswork.',
    deepExplanation:
      "```python\nfrom datetime import datetime, timezone\nfrom fastapi import APIRouter, FastAPI, Request\nimport logging\n\nlogger = logging.getLogger(\"api.deprecation\")\nv1_router = APIRouter(prefix=\"/api/v1\", tags=[\"v1 (deprecated)\"], deprecated=True)   # marks EVERY v1 route as deprecated in the OpenAPI docs\nv2_router = APIRouter(prefix=\"/api/v2\", tags=[\"v2\"])\n\nSUNSET_DATE = \"Wed, 01 Apr 2026 00:00:00 GMT\"\n\n@v1_router.get(\"/users/{user_id}\")\nasync def get_user_v1(user_id: int, request: Request):\n    logger.warning(\"deprecated v1 endpoint called\", extra={\"path\": request.url.path, \"ua\": request.headers.get(\"user-agent\")})\n    return {\"id\": user_id, \"name\": \"Ada\"}   # old, less complete shape\n\n@v2_router.get(\"/users/{user_id}\")\nasync def get_user_v2(user_id: int):\n    return {\"id\": user_id, \"name\": \"Ada\", \"email\": \"ada@example.com\", \"created_at\": \"2024-01-01T00:00:00Z\"}   # richer v2 shape\n\napp = FastAPI()\n\n@app.middleware(\"http\")\nasync def add_deprecation_headers(request: Request, call_next):\n    response = await call_next(request)\n    if request.url.path.startswith(\"/api/v1\"):\n        response.headers[\"Deprecation\"] = \"true\"\n        response.headers[\"Sunset\"] = SUNSET_DATE\n        response.headers[\"Link\"] = \\\n\nStep 1 — Understand the topic.\nTopic: API versioning and deprecation strategy at production depth\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\n@app.get(\"/health\")\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 5 — Example result:\n```text\n{\"status\":\"ok\"}\n```\n\nStep 6 — Complexity / trade-off:\nProduction architecture separates CDN/load balancer, API workers, databases, caches, and durable background workers.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A payments platform maintaining a public API typically gives partner integrators a MINIMUM 6–12 month deprecation window once a version is marked deprecated, backed by per-API-key usage dashboards so the platform team can proactively reach out to the specific partners still on the old version before the sunset date, rather than breaking them with no warning.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **API versioning and deprecation strategy at production depth**.",
    bestPractices: [
      'Emit standardized `Deprecation`/`Sunset` response headers (not just a changelog entry) so automated tooling and client SDKs can detect impending breakage programmatically.',
      'Instrument deprecated-version usage with structured logs/metrics keyed by caller identity (API key, user-agent) so you have actual EVIDENCE of who still depends on the old version before removing it.',
      'Never remove an old API version on a fixed calendar date alone — gate the actual removal on usage metrics showing traffic has genuinely dropped to (near) zero, not just on the calendar having advanced.',
    ],
    tradeOffs:
      'Running two full parallel versions (v1 and v2 routers, potentially two sets of service-layer code if the data shapes diverge significantly) during a deprecation window costs real maintenance overhead and doubled surface area for bugs/security patches, but is the only way to give existing integrators a genuine non-breaking migration path — skipping this and forcing an immediate cutover trades that cost for real breakage risk to every consumer who has not yet migrated.',
    commonMistakes: [
      'Removing an old API version purely based on a calendar deadline without checking actual usage telemetry, breaking integrators who were never actually notified or who missed the notice.',
      'Only communicating deprecation via a changelog/email instead of also emitting machine-readable `Deprecation`/`Sunset` headers that automated client tooling can act on.',
      'Letting the v1 and v2 codepaths silently diverge in BUG behavior (not just intentional feature differences) by patching v2 but forgetting the same fix is also needed in the still-live v1.',
    ],
    followUpQuestions: [
      'How would you identify which specific external callers/partners are still using a deprecated endpoint before removing it?',
      'What is the practical difference between the `Deprecation` and `Sunset` HTTP headers, and how should a well-behaved client react to each?',
      'How would you handle a bug found in shared logic that both a deprecated v1 and current v2 depend on?',
    ],
    relatedTopics: ['API Versioning', 'Deprecation', 'Sunset Header', 'Backward Compatibility', 'Observability'],
  },
  {
    id: 'python-m14-9',
    number: 'PY-M14-9',
    title: 'Performance: blocking calls in async endpoints, pooling, caching, and compression',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Performance',
    expectedAnswer:
      'The single most damaging FastAPI performance bug is calling a BLOCKING, synchronous function (a sync DB driver call, `requests.get()`, `time.sleep()`, heavy CPU work) directly inside an `async def` endpoint — it freezes the entire event loop, stalling EVERY other concurrent request on that worker, not just the one that made the call. Beyond that single footgun, production performance work centers on connection pooling (never open a new DB/HTTP connection per request), caching hot reads (Redis), and response compression (`GZipMiddleware`) for large payloads.',
    deepExplanation:
      "```python\nimport time\nimport httpx\nfrom fastapi import FastAPI\nfrom fastapi.middleware.gzip import GZipMiddleware\n\napp = FastAPI()\napp.add_middleware(GZipMiddleware, minimum_size=1000)   # only compress responses above 1000 bytes — skip overhead for tiny ones\n\n# THE CLASSIC FOOTGUN — blocks the entire event loop, not just this request:\n@app.get(\"/bad\")\nasync def bad_endpoint():\n    time.sleep(2)                       # BLOCKING — every other request on this worker freezes for 2s too\n    return {\"ok\": True}\n\n# fix 1: use the genuinely async equivalent\n@app.get(\"/good-async\")\nasync def good_async_endpoint():\n    import asyncio\n    await asyncio.sleep(2)              # yields control back to the event loop — other requests proceed\n    return {\"ok\": True}\n\n# fix 2: if you MUST call a blocking library, offload it to a thread pool explicitly\n@app.get(\"/good-threaded\")\nasync def good_threaded_endpoint():\n    import anyio\n    result = await anyio.to_thread.run_sync(some_blocking_sync_function)\n    return {\"result\": result}\n\n# fix 3: or just declare the endpoint `def` (not `async def`) — FastAPI automatically\n# runs SYNC endpoints in a worker thread pool, so a blocking call there does not freeze the event loop\n@app.get(\"/good-sync-endpoint\")\ndef good_sync_endpoint():\n    time.sleep(2)                       # fine here — this runs in a thread pool, not the event loop\n    return {\"ok\": True}\n\n# connection pooling — create ONCE at startup (lifespan), reuse across every request\nhttp_client: httpx.AsyncClient | None = None\n\n@app.get(\"/proxy\")\nasync def proxy_call():\n    response = await http_client.get(\"https://downstream.example.com/data\")   # pooled connection, no per-request handshake\n    return response.json()\n```\n\nWhy `async def` + a blocking call is uniquely dangerous compared to the equivalent bug in a sync framework: a sync WSGI worker handling ONE request per thread only blocks that ONE thread when it calls a blocking function — other threads/processes are unaffected. An `async def` FastAPI endpoint runs on a SHARED single-threaded event loop; a blocking call there halts progress on every OTHER in-flight coroutine on that same worker until the blocking call returns, which is a strictly worse failure mode (one slow request degrades the whole worker\\\n\nStep 1 — Understand the topic.\nTopic: Performance: blocking calls in async endpoints, pooling, caching, and compression\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef classify_work(is_blocking: bool) -> str:\n    return (\n        \"thread/process\"\n        if is_blocking\n        else \"async-safe\"\n    )\n\nprint(classify_work(True))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = await asyncio.to_thread(\n    blocking_call\n)\n```\n\nStep 5 — Example result:\n```text\nthread/process\n```\n\nStep 6 — Complexity / trade-off:\nNever execute blocking CPU/I/O work directly inside an async event-loop path.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production incident postmortem pattern that recurs across companies: p99 latency spikes and the whole service appears to \"hang\" under moderate load, traced back to one endpoint calling a synchronous, non-async-aware ORM or HTTP library function directly inside `async def` — the fix (either switching to an async driver, offloading via `anyio.to_thread.run_sync`, or simply making the endpoint a plain `def`) resolves the incident immediately once identified, which is exactly why \"does every `async def` endpoint\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Performance: blocking calls in async endpoints, pooling, caching, and compression**.",
    bestPractices: [
      'Audit every `async def` endpoint\'s full call chain (including dependencies) to confirm nothing blocking is called synchronously — if you must call a blocking library, either offload it with `anyio.to_thread.run_sync` or simply make the endpoint a plain `def` (FastAPI runs those in a thread pool automatically).',
      'Create connection-pooled clients (DB pool, `httpx.AsyncClient`) ONCE in `lifespan` and reuse them across every request — never construct a fresh connection/client per request.',
      'Cache expensive, frequently-read, rarely-changing data in Redis with an appropriate TTL, and enable `GZipMiddleware` for endpoints returning non-trivial JSON/text payloads.',
    ],
    tradeOffs:
      'Chasing every last blocking call out of async endpoints is high-value but requires ongoing vigilance (a new dependency added later can silently reintroduce the issue) — some teams mitigate this with automated linting/tracing that flags blocking calls inside coroutines, trading a bit of tooling setup for much earlier detection than "notice it in a production incident".',
    commonMistakes: [
      'Calling a synchronous DB driver, `requests.get()`, or `time.sleep()` directly inside `async def`, silently stalling every concurrent request on that worker.',
      'Creating a new database connection or `httpx.Client()` inside the endpoint function body on every single request instead of reusing a pooled client created once at startup.',
      'Enabling `GZipMiddleware` globally with a very low `minimum_size`, adding needless CPU compression overhead to tiny responses where compression is not worth its own cost.',
    ],
    followUpQuestions: [
      'Why does a blocking call inside `async def` cause a strictly worse failure mode than the same blocking call in a sync framework?',
      'How would you detect, via monitoring/tracing, that a specific endpoint is silently blocking the event loop in production?',
      'When would you choose to declare an endpoint as plain `def` instead of `async def` on purpose?',
    ],
    relatedTopics: ['Performance', 'Blocking I/O', 'Event Loop', 'Connection Pooling', 'Caching', 'GZipMiddleware'],
  },
  {
    id: 'python-m14-10',
    number: 'PY-M14-10',
    title: 'Production architecture: the full request path from CDN to background workers',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Production Architecture',
    expectedAnswer:
      'A production FastAPI deployment is rarely just "Uvicorn" — it typically sits behind a CDN/WAF (static assets, DDoS/bot filtering), a load balancer (TLS termination, distributing traffic across instances), multiple horizontally-scaled FastAPI instances (each stateless, so any instance can serve any request), a shared cache (Redis, for both caching and cross-instance coordination), one or more databases (relational for transactional data, document for flexible/high-write data), and an async message queue feeding separate background worker processes for anything too slow/unreliable for the request/response path.',
    deepExplanation:
      "```text\n                    Client\n                       |\n                  CDN / WAF            <- static assets, DDoS/bot mitigation, edge caching\n                       |\n                 Load Balancer          <- TLS termination, health-check-based routing, round-robin/least-conn\n                       |\n              +--------+--------+\n              |                 |\n          FastAPI 1          FastAPI 2   <- stateless ASGI instances, horizontally scaled, no local session state\n              |                 |\n              +--------+--------+\n                       |\n                     Redis              <- shared cache (hot reads), rate-limit counters, pub/sub for WebSocket fan-out\n                       |\n              +--------+--------+\n              |                 |\n         PostgreSQL          MongoDB    <- transactional/relational data vs flexible/high-write document data\n              |\n          Message Queue                 <- durable job queue (e.g. Redis-backed Celery/RQ, or RabbitMQ/SQS)\n              |\n       Background Workers               <- separate processes: email, heavy processing, retries, scheduled jobs\n```\n\nWhy each layer exists, concretely: the CDN/WAF absorbs traffic BEFORE it ever reaches your compute (serves cached static assets at the edge, filters obvious malicious/bot traffic, blunts volumetric attacks) — cheaper and faster than handling that load in your own FastAPI instances. The load balancer is what makes STATELESSNESS actually pay off: because no FastAPI instance holds session state, the balancer can route each request to whichever instance is least loaded, and instances can be added/removed/restarted without any client-visible disruption. Redis sits in the middle as shared, fast, cross-instance state — both for caching (avoiding redundant expensive DB reads across many instances) and for cross-instance coordination that in-process memory cannot provide (e.g. the WebSocket ConnectionManager broadcast problem from earlier in this module, or centralized rate-limit counters). The message queue + background workers exist because request/response handlers must stay FAST — anything slow, retryable, or that can fail and needs a retry policy (email delivery, image processing, report generation) is handed off asynchronously rather than making the client wait for it synchronously.\n\nThe database split (PostgreSQL + MongoDB) is a common but NOT universal pattern — it reflects choosing the right storage model per workload (strong relational consistency/transactions for orders/payments in Postgres, flexible/high-write schemas like activity logs or product catalogs with varying attributes in Mongo) rather than \"always use both\"; many production systems are entirely fine on a single well-chosen database.\n\nStep 1 — Understand the topic.\nTopic: Production architecture: the full request path from CDN to background workers\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\n@app.get(\"/health\")\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 5 — Example result:\n```text\n{\"status\":\"ok\"}\n```\n\nStep 6 — Complexity / trade-off:\nProduction architecture separates CDN/load balancer, API workers, databases, caches, and durable background workers.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A mid-size SaaS platform typically runs 3–10 FastAPI pod replicas behind a managed load balancer (e.g. a cloud provider\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Production architecture: the full request path from CDN to background workers**.",
    bestPractices: [
      'Keep every FastAPI instance fully stateless (no in-memory session data, no in-process-only caches that other instances cannot see) so the load balancer can route traffic to any instance interchangeably and instances can be scaled/restarted freely.',
      'Push anything slow, retryable, or non-critical-to-the-immediate-response out of the request/response path and into a durable background queue, keeping API latency low and predictable.',
      'Choose each data store (relational vs document vs cache) based on the actual access pattern and consistency needs of that specific workload, rather than defaulting to "one database for everything" or over-engineering multiple stores where one would suffice.',
    ],
    tradeOffs:
      'Each additional layer in this architecture (CDN, load balancer, cache, queue, multiple databases) adds real operational surface area — more systems to monitor, secure, and reason about failure modes for — in exchange for scalability, resilience, and latency characteristics a simpler single-server deployment cannot achieve; a small internal tool with low traffic legitimately does not need most of this stack, and adding it prematurely is pure overhead without a corresponding scaling need.',
    commonMistakes: [
      'Storing any session/request-scoped state in FastAPI process memory (a module-level dict, an in-process cache with no cross-instance sync) that silently breaks the moment traffic is routed to a second instance.',
      'Putting genuinely slow or unreliable work (third-party API calls with unpredictable latency, heavy report generation) directly in the request/response path instead of a background queue, causing client-visible timeouts under load.',
      'Adding infrastructure complexity (a second database, a message queue, a CDN) before there is an actual, measured need driving it — premature infrastructure investment that outpaces the team\'s ability to operate it well.',
    ],
    followUpQuestions: [
      'Why does statelessness across FastAPI instances matter specifically for how the load balancer can route traffic?',
      'How would you decide whether a given piece of work belongs in the synchronous request path versus a background queue?',
      'What would you monitor to know when it is time to add a caching layer, versus when it is premature?',
    ],
    relatedTopics: ['Production Architecture', 'Load Balancing', 'Horizontal Scaling', 'Caching', 'Message Queues', 'Statelessness'],
  },
  {
    id: 'python-m14-11',
    number: 'PY-M14-11',
    title: 'Coding: a full middleware stack — request ID, timing, and structured logging',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A production-shaped middleware stack composes three small, single-purpose middlewares — request-ID assignment, timing, and structured logging — registered in the correct order so each has access to what the one before it produced, demonstrating the outer-to-inner/inner-to-outer execution model in a realistic, runnable example.',
    deepExplanation:
      "```python\nimport json\nimport logging\nimport time\nimport uuid\nfrom starlette.middleware.base import BaseHTTPMiddleware\nfrom fastapi import FastAPI, Request\n\nlogger = logging.getLogger(\"api\")\nlogging.basicConfig(level=logging.INFO)\n\nclass RequestIDMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request: Request, call_next):\n        request.state.request_id = request.headers.get(\"X-Request-ID\", str(uuid.uuid4()))\n        response = await call_next(request)\n        response.headers[\"X-Request-ID\"] = request.state.request_id\n        return response\n\nclass TimingMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request: Request, call_next):\n        start = time.perf_counter()\n        response = await call_next(request)\n        request.state.duration_ms = round((time.perf_counter() - start) * 1000, 2)\n        response.headers[\"X-Response-Time-Ms\"] = str(request.state.duration_ms)\n        return response\n\nclass StructuredLoggingMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request: Request, call_next):\n        response = await call_next(request)\n        logger.info(json.dumps({\n            \"request_id\": getattr(request.state, \"request_id\", None),\n            \"method\": request.method,\n            \"path\": request.url.path,\n            \"status_code\": response.status_code,\n            \"duration_ms\": getattr(request.state, \"duration_ms\", None),\n        }))\n        return response\n\napp = FastAPI()\n# registered LAST-to-FIRST becomes execution order FIRST-to-LAST on the way IN:\napp.add_middleware(StructuredLoggingMiddleware)   # outermost: needs duration_ms and request_id already set on the way OUT\napp.add_middleware(TimingMiddleware)              # middle: must wrap everything it is timing\napp.add_middleware(RequestIDMiddleware)           # innermost: assigns request_id before anything else needs it\n\n@app.get(\"/health\")\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nWhy this specific registration order: `StructuredLoggingMiddleware`, added LAST, becomes the OUTERMOST layer — its `call_next()` call runs everything else (timing, request-ID assignment, routing, the endpoint), so by the time it reaches its own logging line AFTER `call_next()` returns, both `request.state.request_id` and `request.state.duration_ms` have already been set by the middlewares nested inside it. Getting the registration order backwards (e.g. adding logging FIRST) would mean the logging middleware runs its logging line before `TimingMiddleware`/`RequestIDMiddleware` even execute, logging `None` for both fields.\n\nStep 1 — Understand the topic.\nTopic: Coding: a full middleware stack — request ID, timing, and structured logging\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def middleware(request, call_next):\n    request_id = create_request_id()\n    request.state.request_id = request_id\n\n    response = await call_next(request)\n    response.headers[\"X-Request-ID\"] = request_id\n    return response\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp.add_middleware(\n    TimingMiddleware,\n    logger=logger,\n)\n```\n\nStep 5 — Example result:\n```text\nrequest -> downstream -> response\n```\n\nStep 6 — Complexity / trade-off:\nMiddleware is ideal for cross-cutting request/response concerns but runs on every request.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact three-middleware composition (request ID + timing + structured JSON logging) is close to what most production FastAPI services run as a baseline observability layer, typically feeding the structured log lines into a log aggregation system (e.g. an ELK stack or a cloud logging service) where `request_id` becomes the join key for correlating a single request across multiple log lines and even across downstream service calls if propagated via an outgoing header.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: a full middleware stack — request ID, timing, and structured logging**.",
    bestPractices: [
      'Accept an incoming `X-Request-ID` header if the caller already provided one (e.g. propagated from an upstream service) instead of always generating a fresh one, to preserve request correlation across service boundaries.',
      'Keep each middleware focused on exactly one concern (ID assignment, timing, logging) rather than one monolithic middleware doing all three, so each is independently testable and reusable.',
      'Reason explicitly about registration order whenever one middleware depends on state set by another — the outermost-registered-last rule is easy to get backwards under time pressure.',
    ],
    tradeOffs:
      'Composing three small middlewares (versus one combined middleware doing everything) is slightly more verbose and requires understanding the registration-order rule correctly, but each piece becomes independently testable, reusable across different projects, and easier to reason about in isolation — a reasonable trade for any codebase beyond a small toy example.',
    commonMistakes: [
      'Registering the logging middleware before the timing/request-ID middlewares, causing it to log `None` for fields that had not been set yet at that point in execution order.',
      'Regenerating a fresh request ID even when the caller already supplied one via an incoming header, breaking cross-service request correlation.',
      'Logging via plain `print()` or unstructured string formatting instead of structured (JSON) logs, making the log lines much harder to query/filter in a real log aggregation system.',
    ],
    followUpQuestions: [
      'How would you propagate the same request ID to an outgoing HTTP call this service makes to a downstream API?',
      'What would happen to the logged `status_code` if the endpoint raised an unhandled exception and no exception handler converted it to a response before these middlewares saw it?',
      'How would you test that these middlewares set the expected response headers, using FastAPI\'s TestClient?',
    ],
    relatedTopics: ['Middleware', 'Request ID', 'Structured Logging', 'Observability', 'BaseHTTPMiddleware'],
  },
  {
    id: 'python-m14-12',
    number: 'PY-M14-12',
    title: 'Coding: global exception handlers producing a consistent JSON error envelope',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A complete, runnable global-exception-handling setup registers three handlers — `HTTPException`, `RequestValidationError`, and a catch-all `Exception` — each translating its input into the SAME JSON envelope shape, so client-side code can parse errors generically regardless of which layer produced them.',
    deepExplanation:
      "```python\nimport logging\nfrom fastapi import FastAPI, HTTPException, Request, status\nfrom fastapi.exceptions import RequestValidationError\nfrom fastapi.responses import JSONResponse\nfrom pydantic import BaseModel\n\nlogger = logging.getLogger(\"api\")\napp = FastAPI()\n\nclass ErrorDetail(BaseModel):\n    code: str\n    message: str\n\nclass ErrorResponse(BaseModel):\n    error: ErrorDetail\n\ndef envelope(code: str, message: str) -> dict:\n    return ErrorResponse(error=ErrorDetail(code=code, message=message)).model_dump()\n\n@app.exception_handler(HTTPException)\nasync def http_exception_handler(request: Request, exc: HTTPException):\n    return JSONResponse(status_code=exc.status_code, content=envelope(f\"HTTP_{exc.status_code}\", str(exc.detail)))\n\n@app.exception_handler(RequestValidationError)\nasync def validation_exception_handler(request: Request, exc: RequestValidationError):\n    first_error = exc.errors()[0] if exc.errors() else {}\n    field = \".\".join(str(loc) for loc in first_error.get(\"loc\", []))\n    message = f\"{field}: {first_error.get(\\\n\nStep 1 — Understand the topic.\nTopic: Coding: global exception handlers producing a consistent JSON error envelope\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\n@app.get(\"/health\")\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 5 — Example result:\n```text\n{\"status\":\"ok\"}\n```\n\nStep 6 — Complexity / trade-off:\nProduction architecture separates CDN/load balancer, API workers, databases, caches, and durable background workers.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A frontend team consuming this API writes exactly ONE generic error-parsing function (`const { code, message } = response.error`) that works uniformly whether the failure was a validation error, a business-logic 400/409, or an unexpected 500 — eliminating the need for endpoint-by-endpoint special-case error parsing that a less disciplined API would force on every consumer.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: global exception handlers producing a consistent JSON error envelope**.",
    bestPractices: [
      'Model the error envelope itself as a Pydantic model, not a raw dict, so its shape is validated and can be documented via `responses={...}` on path operations.',
      'Extract a human-readable field path from `RequestValidationError.errors()[0]["loc"]` rather than dumping the entire raw Pydantic error list to the client, keeping messages concise and consumer-friendly.',
      'Always log the full exception server-side in the catch-all handler before returning the generic client-facing message — never skip logging just because the client response is generic.',
    ],
    tradeOffs:
      'Returning only the FIRST validation error (rather than the full list) is simpler and cleaner for typical client UX (show one error at a time) but means a client submitting a form with THREE invalid fields only learns about the first one per request-response round trip — some APIs deliberately return the full `exc.errors()` list instead to let a frontend highlight every invalid field at once, at the cost of a more complex envelope shape.',
    commonMistakes: [
      'Returning the raw `exc.errors()` list directly from Pydantic without any envelope wrapping, producing an inconsistent shape compared to the other two handlers.',
      'Forgetting `responses={...}` documentation on path operations, leaving the generated OpenAPI docs silent about what error shapes a client should actually expect to handle.',
      'Not logging in the catch-all `Exception` handler, losing all server-side visibility into unexpected failures because the client-facing message is deliberately generic.',
    ],
    followUpQuestions: [
      'How would you extend this to return ALL validation errors at once instead of just the first?',
      'How would you attach the request ID from Module 14\'s middleware examples to every one of these error responses?',
      'How would you unit test that a malformed request body produces exactly the expected error envelope shape?',
    ],
    relatedTopics: ['Exception Handling', 'Error Envelope', 'RequestValidationError', 'OpenAPI', 'API Contract'],
  },
  {
    id: 'python-m14-13',
    number: 'PY-M14-13',
    title: 'Coding: lifespan-managed database pool and Redis cache with graceful startup/shutdown',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A complete, runnable example wires an async database connection pool and a Redis cache client through `lifespan`, exposes both to endpoints via `request.app.state`, and demonstrates a cache-aside pattern (check cache, fall back to DB, populate cache) — the standard shape of a production data-access endpoint.',
    deepExplanation:
      "```python\nimport json\nimport logging\nfrom contextlib import asynccontextmanager\nfrom fastapi import FastAPI, HTTPException, Request, status\nimport asyncpg\nfrom redis.asyncio import Redis\n\nlogger = logging.getLogger(\"api\")\nCACHE_TTL_SECONDS = 60\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    logger.info(\"startup: connecting to postgres and redis\")\n    app.state.db_pool = await asyncpg.create_pool(\n        dsn=\"postgresql://user:pass@localhost:5432/appdb\", min_size=5, max_size=20, command_timeout=10,\n    )\n    app.state.redis = Redis.from_url(\"redis://localhost:6379/0\", decode_responses=True)\n    await app.state.redis.ping()   # fail fast at startup if redis is unreachable, rather than on the first request\n    logger.info(\"startup complete\")\n\n    yield\n\n    logger.info(\"shutdown: closing postgres pool and redis client\")\n    await app.state.db_pool.close()\n    await app.state.redis.aclose()\n    logger.info(\"shutdown complete\")\n\napp = FastAPI(lifespan=lifespan)\n\n@app.get(\"/users/{user_id}\")\nasync def get_user(user_id: int, request: Request):\n    redis = request.app.state.redis\n    cache_key = f\"user:{user_id}\"\n\n    cached = await redis.get(cache_key)\n    if cached is not None:\n        return json.loads(cached)                       # cache HIT — never touches postgres\n\n    async with request.app.state.db_pool.acquire() as conn:\n        row = await conn.fetchrow(\"SELECT id, name, email FROM users WHERE id = $1\", user_id)\n    if row is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=\"User not found\")\n\n    user = dict(row)\n    await redis.set(cache_key, json.dumps(user), ex=CACHE_TTL_SECONDS)   # populate cache for next read\n    return user\n\n@app.put(\"/users/{user_id}\")\nasync def update_user(user_id: int, name: str, request: Request):\n    async with request.app.state.db_pool.acquire() as conn:\n        row = await conn.fetchrow(\n            \"UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email\", name, user_id,\n        )\n    if row is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=\"User not found\")\n    await request.app.state.redis.delete(f\"user:{user_id}\")   # invalidate the stale cache entry on write\n    return dict(row)\n\n@app.get(\"/health\")\nasync def health(request: Request):\n    async with request.app.state.db_pool.acquire() as conn:\n        await conn.fetchval(\"SELECT 1\")\n    await request.app.state.redis.ping()\n    return {\"status\": \"healthy\"}\n```\n\nTwo production-critical details this example deliberately shows: (1) `await app.state.redis.ping()` INSIDE `lifespan`, before `yield` — failing fast at STARTUP if Redis is unreachable (crashing the process immediately, which a container orchestrator can detect and act on) is far preferable to discovering the problem lazily on the first user-facing request. (2) `update_user` explicitly deletes the cache entry (`redis.delete(...)`) after a successful write — this is the mandatory OTHER HALF of the cache-aside pattern; populating a cache on read without invalidating it on write leaves the cache silently serving STALE data for up to `CACHE_TTL_SECONDS` after any update.\n\nStep 1 — Understand the topic.\nTopic: Coding: lifespan-managed database pool and Redis cache with graceful startup/shutdown\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\n@asynccontextmanager\nasync def lifespan(app):\n    app.state.redis = await create_redis()\n    try:\n        yield\n    finally:\n        await app.state.redis.close()\n\napp = FastAPI(lifespan=lifespan)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp = FastAPI(lifespan=lifespan)\n```\n\nStep 5 — Example result:\n```text\nstartup resource available; shutdown cleanup runs\n```\n\nStep 6 — Complexity / trade-off:\nKeep shared resources in lifespan with deterministic startup/shutdown cleanup.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact cache-aside shape (check Redis, fall back to Postgres, populate Redis, invalidate on write) is the default data-access pattern for any \"hot\" read-heavy resource in a production FastAPI service — user profiles, product catalogs, feature flags — and the `lifespan`-based pool/client setup shown here is what makes the DB pool and Redis connection safely SHARED and reused across every concurrent request on a worker, rather than reconnected per request.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: lifespan-managed database pool and Redis cache with graceful startup/shutdown**.",
    bestPractices: [
      'Fail fast at startup (`await redis.ping()`, or an equivalent DB check) inside `lifespan` rather than discovering a broken dependency lazily on the first request.',
      'Always pair cache POPULATION on read with cache INVALIDATION on write for the same key — a cache-aside implementation missing the invalidation half silently serves stale data.',
      'Expose shared resources via `request.app.state` (not module-level globals) so tests can construct an app with its own isolated `lifespan`/state for mocking.',
    ],
    tradeOffs:
      'A short cache TTL (e.g. 60s, as shown) bounds the maximum staleness window automatically even if an invalidation is ever missed, at the cost of more frequent cache misses (and thus more DB load) than a longer TTL would produce — the right TTL is a direct trade between staleness tolerance and DB load reduction for that specific resource\'s read/write ratio.',
    commonMistakes: [
      'Populating the cache on read but never invalidating it on write, leaving updated data invisible to readers until the TTL naturally expires.',
      'Constructing a new `asyncpg` pool or Redis client per request instead of once in `lifespan`, defeating connection pooling entirely and adding per-request connection-setup latency.',
      'Not handling the case where Redis is temporarily unavailable mid-request (e.g. a network blip) — a cache read/write failure should typically degrade gracefully to hitting the database directly, not crash the whole request.',
    ],
    followUpQuestions: [
      'What would you change if Redis became temporarily unavailable mid-request — should the endpoint fail entirely or degrade to database-only?',
      'How would you handle cache invalidation for a resource that can be updated from MULTIPLE different endpoints/code paths?',
      'How would you test the cache-hit and cache-miss code paths independently using FastAPI\'s dependency override mechanism?',
    ],
    relatedTopics: ['Lifespan', 'Connection Pooling', 'Redis', 'Cache-Aside Pattern', 'Cache Invalidation', 'app.state'],
  },
  {
    id: 'python-m14-14',
    number: 'PY-M14-14',
    title: 'Coding: health, readiness, and liveness endpoints with graceful shutdown',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A Kubernetes-style deployment needs THREE distinct health signals, not one generic "/health": liveness ("is the process alive and should NOT be restarted") checks nothing external and stays cheap/fast; readiness ("is this instance ready to receive traffic RIGHT NOW") checks actual dependencies (DB, cache) and can legitimately flip to unhealthy temporarily; and graceful shutdown must stop accepting NEW traffic while letting IN-FLIGHT requests finish before the process actually exits, coordinated with the orchestrator\'s SIGTERM handling.',
    deepExplanation:
      "```python\nimport asyncio\nimport logging\nfrom contextlib import asynccontextmanager\nfrom fastapi import FastAPI, Response, status\n\nlogger = logging.getLogger(\"api\")\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    app.state.db_pool = \"pretend-pool\"   # in real code: await asyncpg.create_pool(...)\n    app.state.redis = \"pretend-redis\"    # in real code: Redis.from_url(...)\n    app.state.shutting_down = False\n    logger.info(\"app is up and ready\")\n\n    yield\n\n    # SHUTDOWN begins here — Kubernetes has already sent SIGTERM and stopped routing NEW traffic to this pod,\n    # but in-flight requests may still be executing; give them a grace period before closing shared resources\n    app.state.shutting_down = True\n    logger.info(\"draining: waiting for in-flight requests before closing connections\")\n    await asyncio.sleep(5)               # simplistic drain window; production systems track actual in-flight count\n    logger.info(\"closing db pool and redis client\")\n    # await app.state.db_pool.close() ; await app.state.redis.aclose()\n\napp = FastAPI(lifespan=lifespan)\n\n@app.get(\"/health/live\")\nasync def liveness():\n    # deliberately CHEAP and dependency-free: only answers \"is this process alive and not deadlocked\"\n    # Kubernetes restarts the pod if this ever fails or times out — must never depend on the DB/cache being up\n    return {\"status\": \"alive\"}\n\n@app.get(\"/health/ready\")\nasync def readiness(response: Response):\n    # checks actual dependencies — Kubernetes stops ROUTING traffic here (without restarting the pod) if this fails\n    if app_state_shutting_down():\n        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE\n        return {\"status\": \"shutting_down\"}\n    checks = {\"database\": True, \"redis\": True}   # in real code: actually ping each dependency with a short timeout\n    healthy = all(checks.values())\n    response.status_code = status.HTTP_200_OK if healthy else status.HTTP_503_SERVICE_UNAVAILABLE\n    return {\"status\": \"ready\" if healthy else \"not_ready\", \"checks\": checks}\n\ndef app_state_shutting_down() -> bool:\n    return getattr(app.state, \"shutting_down\", False)\n```\n\n```yaml\n# matching Kubernetes pod spec excerpt\nlivenessProbe:\n  httpGet: { path: /health/live, port: 8000 }\n  periodSeconds: 10\n  failureThreshold: 3        # restart the pod only after 3 consecutive failures — avoid flapping restarts\nreadinessProbe:\n  httpGet: { path: /health/ready, port: 8000 }\n  periodSeconds: 5\n  failureThreshold: 2\nterminationGracePeriodSeconds: 30   # kubernetes waits this long after SIGTERM before force-killing the pod\n```\n\nThe critical distinction interviewers are checking for: LIVENESS answering \"not ready\" should be RARE and mean \"this process is unrecoverable, restart it\" (a deadlock, an unrecoverable internal error) — it must never depend on external services, because a temporary database outage would then cause Kubernetes to needlessly restart every pod, which does nothing to fix a database that is down and just adds restart churn on top of an existing outage. READINESS, by contrast, is EXPECTED to flip unhealthy during a transient dependency outage — that is its entire purpose: temporarily stop routing new traffic to instances that cannot currently serve it correctly, without killing/restarting the process itself (since the process is fine — the dependency is what is degraded).\n\nStep 1 — Understand the topic.\nTopic: Coding: health, readiness, and liveness endpoints with graceful shutdown\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\n@app.get(\"/health\")\nasync def health():\n    return {\"status\": \"ok\"}\n```\n\nStep 5 — Example result:\n```text\n{\"status\":\"ok\"}\n```\n\nStep 6 — Complexity / trade-off:\nProduction architecture separates CDN/load balancer, API workers, databases, caches, and durable background workers.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production incident where a downstream database briefly became unreachable was handled cleanly because readiness probes correctly flipped to 503 (Kubernetes stopped routing new traffic to affected pods, requests failed fast against the LOAD BALANCER instead of timing out against overwhelmed pods) while liveness probes stayed green (no unnecessary pod restarts compounding the outage) — the system recovered automatically the moment the database came back, with zero manual intervention, purely because the two probes were correctly separated.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: health, readiness, and liveness endpoints with graceful shutdown**.",
    bestPractices: [
      'Keep the liveness check dependency-free and cheap — it should only ever fail for genuinely unrecoverable, restart-fixable process-level problems, never for a downstream dependency being temporarily down.',
      'Make the readiness check actually verify real dependencies (DB, cache) with a SHORT timeout, so it fails fast and accurately reflects whether this instance can currently serve traffic correctly.',
      'Flip readiness to unhealthy proactively as soon as graceful shutdown begins, so the load balancer stops routing new traffic to a draining instance before its connections are actually closed.',
    ],
    tradeOffs:
      'A more thorough readiness check (verifying every dependency on every probe) gives more accurate traffic routing decisions but adds load to those dependencies on every probe interval and a longer probe latency; a lighter readiness check is cheaper but risks routing traffic to an instance that will actually fail once it tries to use a degraded dependency — the right balance depends on probe interval and dependency check cost.',
    commonMistakes: [
      'Making the liveness probe check the database, causing Kubernetes to restart every pod in the fleet during a database outage — restarts that do nothing to fix the actual problem and add unnecessary churn.',
      'Using a single generic `/health` endpoint for both liveness and readiness purposes, losing the ability to distinguish "restart me" from "stop routing to me temporarily".',
      'Not flipping readiness to unhealthy at the START of graceful shutdown, causing the load balancer to keep sending new requests to an instance that is already in the process of closing its connections.',
    ],
    followUpQuestions: [
      'Why must a liveness probe never depend on an external service like a database?',
      'What actually happens between a Kubernetes pod receiving SIGTERM and being force-killed, and how does `terminationGracePeriodSeconds` relate to your lifespan shutdown code?',
      'How would you track the actual number of in-flight requests to make the shutdown drain period precise instead of a fixed `asyncio.sleep(5)`?',
    ],
    relatedTopics: ['Health Checks', 'Readiness Probe', 'Liveness Probe', 'Graceful Shutdown', 'Kubernetes', 'Lifespan'],
  },
];

export const MOCK_PYTHON_MODULE14_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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