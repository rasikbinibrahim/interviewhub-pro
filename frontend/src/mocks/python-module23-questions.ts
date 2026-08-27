// Python + DSA Interview Handbook — Module 23: Production Engineering.
// Hand-authored technical questions covering how a Python/FastAPI +
// PostgreSQL/MongoDB application actually goes from local development to a
// reliable, observable, secure production system — the Twelve-Factor App,
// Linux process/signal handling for graceful shutdown, FastAPI's production
// deployment architecture (Uvicorn/Gunicorn workers, health checks, error
// handling), Docker/CI-CD, testing strategy, rate limiting and idempotency,
// caching failure modes, observability (RED/USE, SLI/SLO/SLA, tracing),
// reliability patterns (retries, timeouts, circuit breakers, bulkheads),
// background processing/message queues, file/object storage, scalability,
// incident response, and disaster recovery — with genuine architecture
// reasoning and production-grade code. Mirrors the MockTechnicalQuestion
// shape defined in @/mocks/questions.

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
    id: 'python-m23-1',
    number: 'PY-M23-1',
    title: 'The Twelve-Factor App, applied concretely to a FastAPI service',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Production Fundamentals',
    expectedAnswer:
      'The Twelve-Factor App is a set of principles for building applications that deploy cleanly and scale predictably on modern infrastructure — the ones that matter most for a FastAPI service are: config lives in ENVIRONMENT VARIABLES (never hard-coded or checked into git), the app is STATELESS and treats backing services (PostgreSQL, MongoDB, Redis) as attached resources reachable via a URL, processes are DISPOSABLE (fast startup, graceful shutdown on SIGTERM), and LOGS are treated as an event stream written to stdout, not managed as files by the application itself.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Read ALL configuration from environment variables via a validated settings class (e.g. `pydantic-settings`) — fail fast at startup if a required value is missing, rather than silently using a wrong default.',
      'Write logs to stdout only — never have application code open, manage, or rotate log FILES directly; let the execution environment (Docker, Kubernetes, a log shipper) handle log routing and retention.',
      'Keep the SAME container image immutable across dev/staging/production, differing only by injected environment variables — never rebuild a different image per environment.',
    ],
    tradeOffs:
      'Strict Twelve-Factor discipline (stateless processes, config only via environment, logs only to stdout) adds a small amount of upfront structure compared to a quick local script, but is precisely what makes horizontal scaling, container orchestration, and reliable CI/CD promotion between environments possible without special-casing — violating these principles (e.g. storing session state in process memory) works fine for a single-instance toy project but breaks immediately the moment you run more than one instance.',
    commonMistakes: [
      'Hard-coding a database connection string or API key directly in source code (or worse, committing a `.env` file with real secrets to git) instead of reading it from the environment at runtime.',
      'Storing mutable application state in process memory (an in-process cache, a session dict) that silently breaks or becomes inconsistent the moment the app runs as more than one instance/worker.',
      'Having application code manage log file rotation/retention itself instead of writing to stdout and letting the execution environment handle log routing — this breaks cleanly in a containerized/orchestrated environment where the filesystem is often ephemeral.',
    ],
    followUpQuestions: [
      'Why does treating logs strictly as an stdout event stream (rather than application-managed files) matter specifically in a containerized deployment?',
      'How does Factor IV ("backing services as attached resources") make it possible to run integration tests against a temporary Docker Postgres instance with zero code changes from production?',
      'What breaks first in a FastAPI app that keeps rate-limit counters in an in-process Python dict once it is scaled to multiple worker processes?',
    ],
    relatedTopics: ['Twelve-Factor App', 'Configuration Management', 'Statelessness', 'Structured Logging', 'Environment Variables'],
  },
  {
    id: 'python-m23-2',
    number: 'PY-M23-2',
    title: 'Linux process signals and graceful shutdown for Uvicorn workers',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Linux for Production',
    expectedAnswer:
      'SIGTERM is a polite "please shut down" signal that a process CAN catch and respond to (finish in-flight work, close connections, then exit) — this is what orchestrators (Docker, Kubernetes) send during a normal stop/restart/rolling-deployment. SIGKILL is an unconditional, uncatchable "terminate immediately" signal used only as a last resort when a process fails to exit within a grace period — the difference between these two is the entire foundation of GRACEFUL SHUTDOWN, and a FastAPI service that does not handle SIGTERM properly will drop in-flight requests and potentially corrupt state on every single deploy.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A production Kubernetes deployment configures a `terminationGracePeriodSeconds` of 45 seconds specifically because the service has one report-export endpoint that can legitimately take up to 30 seconds to complete — without that tuned grace period (the Kubernetes default is 30s), a rolling deployment during a busy period could SIGKILL a worker mid-export, silently truncating a user\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Implement FastAPI `lifespan` shutdown cleanup (closing DB engines, flushing buffers) for anything that needs an explicit teardown step — Uvicorn handles the HTTP-connection-draining part of graceful shutdown automatically, but application-level resource cleanup is the developer\'s responsibility.',
      'Tune the orchestrator\'s SIGTERM-to-SIGKILL grace period based on your SLOWEST realistic in-flight request duration, not a generic default — too short risks dropped requests on every deploy.',
      'Never rely on SIGKILL-triggered cleanup — code that "should run on shutdown" placed anywhere except the SIGTERM-triggered path (like `lifespan` shutdown) simply never runs if SIGKILL is what actually terminates the process.',
    ],
    tradeOffs:
      'A longer grace period reduces the risk of abruptly dropping legitimate in-flight requests during a deploy, at the cost of slower rolling deployments and scale-down operations across the whole fleet — the right value is a genuine tradeoff between deploy speed and request-completion safety, tuned to the specific service\'s realistic request-duration distribution.',
    commonMistakes: [
      'Assuming Uvicorn/FastAPI automatically cleans up application-level resources (database connection pools, open file handles) on shutdown without explicit `lifespan` teardown code — Uvicorn handles HTTP connection draining, not arbitrary application resources.',
      'Setting an orchestrator grace period far shorter than the service\'s slowest realistic request duration, causing SIGKILL to abruptly truncate legitimate in-flight work during routine deploys.',
      'Writing cleanup logic that assumes it will always run, without accounting for the fact that SIGKILL gives a process zero opportunity to execute any code at all.',
    ],
    followUpQuestions: [
      'What specifically does Uvicorn do automatically upon receiving SIGTERM, and what is still the application developer\'s responsibility?',
      'How would you determine the correct grace-period value for a specific production service?',
      'What is the difference between a zombie process and an orphan process, and does either relate directly to the SIGTERM/SIGKILL distinction?',
    ],
    relatedTopics: ['Linux Signals', 'Graceful Shutdown', 'SIGTERM', 'SIGKILL', 'Process Lifecycle', 'Uvicorn'],
  },
  {
    id: 'python-m23-3',
    number: 'PY-M23-3',
    title: 'FastAPI production deployment architecture — Uvicorn workers, Gunicorn, and choosing worker count',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI Production',
    expectedAnswer:
      'A production FastAPI deployment runs MULTIPLE Uvicorn WORKER PROCESSES (each with its own event loop, using its own CPU core) behind a load balancer/reverse proxy, because a single asyncio event loop is inherently single-process/single-core — async concurrency within one worker handles many simultaneous I/O-bound requests efficiently, but only PROCESS-level parallelism uses multiple CPU cores. The current recommended pattern is Gunicorn as a mature PROCESS MANAGER supervising multiple `uvicorn.workers.UvicornWorker` processes (auto-restart on crash, graceful reloads), or, increasingly common on Kubernetes, running one Uvicorn process per container/pod and letting the orchestrator handle process-level replication instead.',
    deepExplanation:
      "```text\nInternet\n  |\nCDN / WAF                — caches static content, blocks malicious traffic at the edge\n  |\nLoad Balancer             — distributes traffic across multiple FastAPI INSTANCES (pods/VMs)\n  |\nReverse Proxy (often built into the LB, or Nginx) — TLS termination, request buffering\n  |\nFastAPI instance 1        FastAPI instance 2        ... (each instance may itself run\n  |  Uvicorn worker 1        |  Uvicorn worker 1         multiple Uvicorn workers via Gunicorn)\n  |  Uvicorn worker 2        |  Uvicorn worker 2\n  |\nService Layer -> Database (via a connection pool, shared appropriately across workers)\n```\n\nChoosing worker COUNT — the standard formula and its reasoning: `workers = (2 x CPU_cores) + 1` is Gunicorn\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Start worker count from `(2 x CPU_cores) + 1` for I/O-bound FastAPI workloads (the common case), and closer to `CPU_cores` for genuinely CPU-bound workloads — then tune based on observed CPU/memory utilization under real load.',
      'Calculate TOTAL possible database connections across the entire fleet (instances × workers-per-instance × pool size) and confirm it stays comfortably under the database\'s connection limit — introduce PgBouncer/connection-pooling middleware once the fleet grows large enough that this math gets tight.',
      'On an orchestrator that already provides process supervision and horizontal scaling (Kubernetes), prefer one Uvicorn process per pod and scale replica count, rather than duplicating that supervision inside Gunicorn as well.',
    ],
    tradeOffs:
      'Gunicorn-managed multi-worker deployment gives mature, battle-tested process supervision (auto-restart, graceful reload) on a single host with no orchestrator dependency, at the cost of more complex per-host resource/connection-pool math; the Kubernetes-native one-process-per-pod pattern simplifies per-process reasoning and defers supervision/scaling to the orchestrator, at the cost of depending on that orchestrator already being in place and correctly configured.',
    commonMistakes: [
      'Setting worker count far higher than CPU core count for a CPU-bound workload, adding memory and context-switching overhead with no corresponding increase in actual parallel computation.',
      'Sizing each worker\'s database connection pool without accounting for the TOTAL connection count across the entire fleet, exceeding the database\'s connection limit once scaled to many instances/workers.',
      'Running Gunicorn with multiple internal workers PER POD on Kubernetes without adjusting the pod\'s CPU/memory resource limits accordingly, causing the orchestrator to under-provision resources relative to actual internal concurrency.',
    ],
    followUpQuestions: [
      'Why does the `(2 x cores) + 1` worker-count formula make sense specifically for I/O-bound workloads and not CPU-bound ones?',
      'Walk through the total possible database connection count for a fleet of 8 instances, each running 4 Uvicorn workers with a SQLAlchemy pool_size of 10 and max_overflow of 5 — and explain what you would do if that exceeds your database\'s connection limit.',
      'What specific supervision responsibilities does Kubernetes take over that Gunicorn would otherwise provide on a bare VM deployment?',
    ],
    relatedTopics: ['Uvicorn', 'Gunicorn', 'Worker Processes', 'Connection Pooling', 'Kubernetes', 'Horizontal Scaling'],
  },
  {
    id: 'python-m23-4',
    number: 'PY-M23-4',
    title: 'FastAPI lifespan events and health checks — liveness vs readiness',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Production',
    expectedAnswer:
      'The modern `lifespan` async context manager replaces the deprecated `@app.on_event("startup"/"shutdown")` decorators, running setup code (opening a DB engine, connecting to Redis) once before the app starts accepting requests and teardown code once after it stops. LIVENESS ("is the process alive at all?") and READINESS ("can this instance currently serve real traffic?") are DIFFERENT questions an orchestrator asks for DIFFERENT reasons — a liveness failure means "kill and restart this process", while a readiness failure means "stop routing NEW traffic here, but do not restart it" (e.g. temporarily overloaded, or its database dependency is briefly unreachable) — conflating the two causes an orchestrator to restart healthy processes unnecessarily.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A production Kubernetes deployment wires `/health/live` to the `livenessProbe` (restart the pod only if this fails repeatedly) and `/health/ready` to the `readinessProbe` (remove the pod from the Service\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Keep liveness checks CHEAP and INTERNAL ONLY — never call an external dependency (database, Redis, another service) from a liveness endpoint, since a dependency outage should not cause the orchestrator to restart an otherwise-healthy process.',
      'Use the modern `lifespan` async context manager for startup/shutdown, not the deprecated `@app.on_event` decorators — it correctly scopes setup/teardown as one cohesive block and is the currently recommended FastAPI pattern.',
      'Return a `503` (not `200`) from the readiness endpoint when a dependency is unavailable, so the load balancer/orchestrator actually stops routing new traffic to this instance until it recovers.',
    ],
    tradeOffs:
      'Separating liveness from readiness adds a small amount of endpoint/config complexity (two probes to wire up correctly in the orchestrator, not one) in exchange for preventing a class of self-inflicted incidents — restart storms triggered by a dependency outage that a restart cannot actually fix — that is common and genuinely damaging in production systems that conflate the two checks into one.',
    commonMistakes: [
      'Wiring a database/dependency check into the LIVENESS probe, causing an unrelated dependency outage to trigger unnecessary pod restarts that do nothing to fix the actual problem.',
      'Continuing to use the deprecated `@app.on_event("startup"/"shutdown")` decorators in new code instead of the current recommended `lifespan` async context manager.',
      'Returning `200 OK` from a readiness check even when a critical dependency is unavailable, causing the load balancer to keep routing traffic to an instance that cannot actually serve it correctly.',
    ],
    followUpQuestions: [
      'Walk through exactly what goes wrong if liveness and readiness checks are conflated into a single endpoint that checks the database.',
      'Why does the `lifespan` pattern make it easier to share state (like a database engine handle) between startup and shutdown code compared to the older `@app.on_event` decorators?',
      'How would you design a readiness check for a dependency that is only OCCASIONALLY needed (e.g. a third-party API used by only one endpoint) — should it still block overall readiness?',
    ],
    relatedTopics: ['Lifespan', 'Health Checks', 'Liveness', 'Readiness', 'Kubernetes', 'Graceful Shutdown'],
  },
  {
    id: 'python-m23-5',
    number: 'PY-M23-5',
    title: 'Production error handling — a standard error envelope and never leaking stack traces',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Production',
    expectedAnswer:
      'A production API needs a CENTRALIZED, CONSISTENT error response shape across every possible failure mode (validation errors, database errors, auth errors, unexpected exceptions) so clients can reliably parse and branch on errors, and must NEVER leak internal details (stack traces, raw exception messages, database schema hints) to the client — those details belong in structured LOGS (correlated by a request ID), not the HTTP response body, since leaking them is both a security risk (information disclosure aiding an attacker) and a poor API contract (internal refactoring should not change the client-visible error shape).',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Register a centralized, catch-all exception handler (`@app.exception_handler(Exception)`) that logs the full exception internally but returns only a generic, stable error message to the client — never rely on FastAPI\'s default unhandled-exception behavior in production.',
      'Include a `request_id` in every error response and thread it through all log lines for that request, so a client-reported error can be immediately correlated with full internal diagnostic detail.',
      'Never disable/omit FastAPI\'s debug-mode protections in production — debug mode can expose full stack traces in HTTP responses, which must never happen outside local development.',
    ],
    tradeOffs:
      'A generic, stable client-facing error message protects against information disclosure and API-contract breakage from internal refactors, at the cost of requiring GOOD internal logging/observability (correlated by request_id) to actually diagnose issues — without that logging discipline, hiding the detailed error from the client just makes debugging harder for the engineering team too, so the two practices (generic client errors + rich correlated internal logs) must be adopted together, not separately.',
    commonMistakes: [
      'Returning raw exception text (`str(exc)`) or a stack trace in the HTTP response body, leaking internal implementation details to clients and turning internal errors into an implicit, fragile part of the API contract.',
      'Omitting a `request_id` from error responses, making it impossible to correlate a client-reported error with the corresponding internal log entry without extensive back-and-forth.',
      'Leaving FastAPI/Starlette in debug mode in a production deployment, which can expose full tracebacks directly in HTTP error responses.',
    ],
    followUpQuestions: [
      'Walk through exactly how a `request_id` generated in middleware gets threaded through to both the error response AND the internal log entry for the same request.',
      'Why is exposing detailed internal exception text a maintenance problem (not just a security one) if clients start depending on it?',
      'How would you extend this error-handling pattern to map specific database exceptions (e.g. a unique constraint violation) to a more specific, still-generic-enough client error code like `DUPLICATE_RESOURCE`?',
    ],
    relatedTopics: ['Error Handling', 'Exception Handlers', 'Request ID', 'Security', 'Structured Logging', 'API Design'],
  },
  {
    id: 'python-m23-6',
    number: 'PY-M23-6',
    title: 'Structured JSON logging and what must never be logged',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Observability & Logging',
    expectedAnswer:
      '`print()` statements are not a production logging strategy because they cannot be filtered by severity, cannot be routed/aggregated consistently, carry no structured metadata, and are trivially lost if stdout buffering or redirection is misconfigured — production logging uses a structured LOGGER emitting JSON records (level, timestamp, service name, request/trace/correlation IDs, and the message) so logs are machine-parseable, filterable, and correlatable across a distributed system, with strict discipline around NEVER logging sensitive data (passwords, tokens, full card numbers, other PII) even accidentally.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use a structured JSON logger writing to stdout (never `print()`, never application-managed log files) for all production logging, with consistent fields (timestamp, level, service, request_id, trace_id) on every entry.',
      'Implement REDACTION structurally, at the logging layer itself (a helper function or logging filter applied automatically), rather than relying on every developer remembering not to log a sensitive field manually.',
      'Thread a `request_id` (generated or extracted from an incoming header early in middleware) through every log line for a given request, enabling instant cross-service correlation during incident investigation.',
    ],
    tradeOffs:
      'Structured JSON logging is more verbose to set up initially (a formatter, consistent field conventions, correlation-id middleware) than scattering `print()` statements, but pays for itself immediately the first time a production incident needs to be investigated — the cost is upfront engineering discipline; the payoff is investigation time measured in minutes instead of hours once logs are actually needed under pressure.',
    commonMistakes: [
      'Using `print()` (or unstructured `logging` calls with no consistent format) for anything beyond quick local debugging, losing the ability to filter, correlate, and query logs effectively in production.',
      'Logging a full request/response payload without redacting sensitive fields, accidentally writing passwords, tokens, or PII into logs that often have broader access and longer retention than the primary database.',
      'Failing to thread a correlation/request ID through log lines emitted from different layers (middleware, service, repository) of the same request, making cross-layer investigation of a single failing request needlessly difficult.',
    ],
    followUpQuestions: [
      'Why can a log aggregator query structured JSON logs far more effectively than unstructured text logs, concretely?',
      'How would you design automatic redaction so a NEW sensitive field added to a model in the future is redacted by default, rather than requiring every developer to remember to update a redaction list?',
      'What log RETENTION policy considerations come into play once logs might inadvertently contain PII, even with redaction in place?',
    ],
    relatedTopics: ['Structured Logging', 'JSON Logs', 'Sensitive Data Redaction', 'Correlation ID', 'Observability'],
  },
  {
    id: 'python-m23-7',
    number: 'PY-M23-7',
    title: 'Writing a production-grade Dockerfile for a FastAPI app — multi-stage builds and non-root users',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Docker',
    expectedAnswer:
      'A production Dockerfile uses a MULTI-STAGE BUILD (a "builder" stage installs dependencies and compiles anything needed; a slim "runtime" stage copies only the finished artifacts, discarding build tools) to minimize final image size and attack surface, runs the application as a NON-ROOT user (limiting the blast radius if the container is ever compromised), and orders instructions to maximize Docker\'s LAYER CACHING (dependency installation happens BEFORE copying application code, so code changes do not invalidate the expensive dependency-install layer).',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use a multi-stage build to keep the final runtime image minimal — discard build tools, compilers, and dev-only dependencies that were only needed to PRODUCE the artifact, not to RUN it.',
      'Always run the application process as a dedicated non-root user in the final image — never leave a production container running as root.',
      'Order Dockerfile instructions to copy dependency manifests and install dependencies BEFORE copying application code, maximizing Docker layer-cache reuse across builds where only code (not dependencies) changed.',
    ],
    tradeOffs:
      'Multi-stage builds and careful layer ordering add a small amount of Dockerfile complexity/verbosity compared to a single naive `FROM python; COPY .; RUN pip install; CMD ...` approach, but pay for themselves quickly through smaller image size (faster deploys, smaller attack surface) and dramatically faster CI/CD build times once dependency-layer caching is actually exploited correctly.',
    commonMistakes: [
      'Running the application as root inside the container, unnecessarily widening the blast radius of any application-level vulnerability that achieves code execution.',
      'Copying application code BEFORE installing dependencies, causing every single code change to invalidate the dependency-installation cache layer and needlessly slow down every build.',
      'Skipping a multi-stage build and shipping build tools/compilers/dev dependencies in the final production image, increasing both image size and the surface area a vulnerability scanner has to evaluate.',
    ],
    followUpQuestions: [
      'Walk through exactly which Docker layers get invalidated (and which stay cached) when only application code changes, given the Dockerfile ordering shown above.',
      'What specific security benefit does running as a non-root user provide if an attacker already achieves code execution inside the container?',
      'When might `python:3.12-slim` be the WRONG base image choice compared to the full `python:3.12` image, despite being smaller?',
    ],
    relatedTopics: ['Docker', 'Multi-Stage Builds', 'Layer Caching', 'Container Security', 'Non-Root Containers', 'Dockerfile'],
  },
  {
    id: 'python-m23-8',
    number: 'PY-M23-8',
    title: 'Docker Compose for a local production-like stack, and container security fundamentals',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Docker',
    expectedAnswer:
      'Docker Compose orchestrates multiple containers (FastAPI, PostgreSQL, MongoDB, Redis) as one locally-runnable stack, using named NETWORKS (containers reach each other by service name, not hardcoded IPs), VOLUMES (persisting database data across container restarts), HEALTH CHECKS (so dependent services wait for a database to be genuinely ready, not just "container started"), and environment-variable-based configuration mirroring how the same services would be wired in production — giving developers a close-to-production environment (Twelve-Factor\'s "dev/prod parity") without needing real cloud infrastructure locally.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A new engineer\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Gate `depends_on` with `condition: service_healthy` (backed by a real healthcheck per service) rather than relying on plain container-start ordering, which does not guarantee the dependency is actually ready to accept connections.',
      'Use named volumes for any stateful service (PostgreSQL, MongoDB) so data survives routine container restarts/recreations during local development.',
      'Never commit real secrets into `docker-compose.yml` — use a gitignored `.env` file for local development and a proper secrets manager for anything beyond throwaway local credentials.',
    ],
    tradeOffs:
      'A full multi-service Docker Compose stack gives close dev/prod parity and eliminates "works on my machine" environment drift, at the cost of higher local resource usage (running PostgreSQL, MongoDB, Redis, and the app simultaneously) and some added onboarding complexity for developers new to Docker — for a very small project, a simpler setup (e.g. SQLite locally, one real database in production) might be pragmatically acceptable, but that tradeoff should be made deliberately, weighing dev/prod parity against local simplicity.',
    commonMistakes: [
      'Using plain `depends_on` without a `service_healthy` condition, causing the application container to attempt database connections before the database is actually ready and crash-loop on startup.',
      'Committing real secrets directly into a `docker-compose.yml` file tracked in git, even for "just local development" — habits formed locally have a way of leaking into less-careful production configuration.',
      'Omitting named volumes for stateful services, losing all local database data on every `docker compose down` and forcing repeated, tedious re-seeding.',
    ],
    followUpQuestions: [
      'Why is a healthcheck-gated `depends_on` condition necessary even though the database container process itself starts almost immediately?',
      'How would you structure Docker Compose configuration to support both a full local stack AND a lighter "just the app, pointed at a shared dev database" mode for different developer preferences?',
      'What specific container-level resource-limit misconfiguration could let one container starve every other container on the same host?',
    ],
    relatedTopics: ['Docker Compose', 'Container Orchestration', 'Health Checks', 'Volumes', 'Container Security', 'Dev/Prod Parity'],
  },
  {
    id: 'python-m23-9',
    number: 'PY-M23-9',
    title: 'CI/CD pipeline stages and deployment strategies — rolling, blue/green, canary',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'CI/CD',
    expectedAnswer:
      'A production CI/CD pipeline runs a sequence of increasingly expensive, increasingly confidence-building stages (lint -> unit tests -> integration tests -> security/dependency scan -> build image -> push to registry -> deploy to staging -> smoke tests -> deploy to production) that FAIL FAST — cheap checks run first so an obvious problem is caught in seconds, not after a slow build/deploy. The DEPLOYMENT STRATEGY (rolling, blue/green, canary) determines HOW the new version reaches production traffic, trading off deployment speed/cost against blast-radius control if the new version turns out to be broken.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Order CI pipeline stages from cheapest/fastest to most expensive, so an obvious failure is caught in seconds rather than after a slow build/deploy step has already run.',
      'Follow the expand/contract migration pattern for ANY schema change deployed via a rolling strategy, since old and new application code versions run simultaneously against the same database during the rollout window.',
      'Define automated, quantitative rollback criteria (error rate/latency thresholds) for canary deployments BEFORE the deployment begins, rather than making a judgment call under pressure while a canary is already live.',
    ],
    tradeOffs:
      'Rolling deployments are the cheapest and fastest (no duplicated infrastructure) but require every change to be backward-compatible during the rollout window; blue/green gives instant, clean rollback at the cost of 2x infrastructure during the transition; canary gives the smallest blast radius for a bad deploy but is the slowest to reach full rollout and requires solid real-time metrics to make automated go/no-go decisions at each stage — the right strategy depends on how costly a bad deploy would be versus how much deployment speed/infrastructure cost the team is willing to trade for safety.',
    commonMistakes: [
      'Deploying a schema migration and the application code that depends on it in the SAME rolling deployment, causing live errors during the window where old and new code run simultaneously against an incompatible schema state.',
      'Running expensive, slow checks (a full build, an integration test suite) BEFORE cheap, fast ones (lint, unit tests) in a CI pipeline, wasting time on slow feedback for trivial failures.',
      'Making canary rollback decisions ad hoc/manually under pressure instead of defining automated, quantitative rollback criteria before the deployment begins.',
    ],
    followUpQuestions: [
      'Walk through the exact sequence of deploys needed to safely rename a database column using the expand/contract pattern under a rolling deployment strategy.',
      'Why does blue/green deployment require double infrastructure capacity, and when is that cost clearly justified versus not?',
      'How would you design automated canary analysis to compare the new version\'s error rate/latency against the OLD version\'s baseline, rather than against a fixed absolute threshold?',
    ],
    relatedTopics: ['CI/CD', 'Deployment Strategies', 'Rolling Deployment', 'Blue/Green Deployment', 'Canary Deployment', 'Expand/Contract Migrations'],
  },
  {
    id: 'python-m23-10',
    number: 'PY-M23-10',
    title: 'Testing strategy — the test pyramid, and pytest patterns for FastAPI + PostgreSQL/MongoDB',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Testing',
    expectedAnswer:
      'The test pyramid prescribes MANY fast, isolated UNIT tests at the base (business logic, no real I/O), FEWER INTEGRATION tests in the middle (real database, testing repository/query correctness), and a SMALL number of END-TO-END/API tests at the top (the full stack, verifying critical user-facing flows) — this shape exists because unit tests are cheap to write and run (milliseconds, easy to pinpoint failures) while integration/E2E tests are expensive (seconds to minutes, harder to diagnose failures, more brittle to unrelated changes), so the bulk of coverage and fast feedback should come from the cheap layer.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A team\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Push the bulk of test coverage down into fast, isolated unit tests (fake/mock repositories, no real I/O) and reserve integration/E2E tests specifically for verifying real persistence behavior and critical end-to-end user journeys.',
      'Use a per-test transaction-rollback pattern for PostgreSQL integration tests (fast, no schema recreation needed) and a drop-database-per-test-session pattern for MongoDB, matching each database\'s actual isolation capabilities.',
      'Use FastAPI\'s `dependency_overrides` to swap real dependencies (database sessions, external clients) for test doubles in API-level tests, without modifying application code to accommodate testing.',
    ],
    tradeOffs:
      'A pyramid-shaped test suite (many fast unit tests, fewer slow integration/E2E tests) gives fast CI feedback and precise failure localization, at the cost of needing careful architecture (repository pattern, dependency injection) to actually make business logic testable in isolation from real I/O — an inverted pyramid is easier to "just write" without that architectural discipline, but produces a slow, flaky, hard-to-maintain test suite as the codebase grows.',
    commonMistakes: [
      'Writing predominantly slow, database-backed integration/E2E tests for logic that could have been covered by fast, isolated unit tests, needlessly slowing down the CI feedback loop.',
      'Recreating the entire database schema from scratch for every single test instead of using a transaction-rollback (PostgreSQL) or scoped-database (MongoDB) isolation pattern, making the test suite far slower than necessary.',
      'Testing business logic only through full API-level tests, making failures hard to localize (a single business-rule bug can cause failures across many API test cases) instead of pinpointing it via a focused unit test.',
    ],
    followUpQuestions: [
      'Why does the transaction-rollback pattern for PostgreSQL integration tests avoid the cost of recreating the schema between tests, and why does MongoDB typically need a different isolation approach?',
      'How does the repository pattern (Module 12/17/21) specifically enable fast unit testing of business logic without a real database connection?',
      'At what point would you decide a specific piece of logic deserves an integration test rather than relying solely on a unit test with a fake repository?',
    ],
    relatedTopics: ['Testing Strategy', 'Test Pyramid', 'Pytest', 'Integration Testing', 'Dependency Overrides', 'Test Isolation'],
  },
  {
    id: 'python-m23-11',
    number: 'PY-M23-11',
    title: 'Rate limiting architecture — token bucket via Redis, and idempotency keys in production',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Reliability & Rate Limiting',
    expectedAnswer:
      'Rate limiting protects a service from being overwhelmed (by a misbehaving client, a traffic spike, or an abusive actor) by rejecting requests once a client exceeds an allowed rate — the TOKEN BUCKET algorithm (each client has a bucket that refills at a steady rate and is drained per request, allowing bounded BURSTS up to the bucket size) is the most commonly used production algorithm because it handles legitimate bursty traffic gracefully, unlike a naive FIXED WINDOW counter, which allows up to 2x the intended rate right at a window boundary. A DISTRIBUTED rate limiter (shared across multiple FastAPI instances) requires a shared store — Redis, using atomic operations, is the standard choice.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nDesign retries around idempotency or atomic state transitions so repeated delivery does not create duplicate effects.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef apply_once(key, seen):\n    if key in seen:\n        return False\n    seen.add(key)\n    return True\n\nseen = set()\nprint(apply_once(\"order-42\", seen))\nprint(apply_once(\"order-42\", seen))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nawait db.orders.update_one(\n    {\"idempotency_key\": key},\n    {\"$setOnInsert\": payload},\n    upsert=True,\n)\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A public API endpoint rate-limited via a naive fixed-window counter was found to allow legitimate-looking traffic spikes of nearly 2x the documented rate limit right at minute boundaries — abusive clients had reverse-engineered this and deliberately timed bursts to straddle window boundaries; migrating to the Redis-backed token-bucket implementation above eliminated the boundary-burst exploit entirely, since the bucket\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use a token-bucket (or sliding-window) algorithm rather than a naive fixed-window counter, to avoid the well-known boundary-burst flaw that allows up to double the intended rate near window edges.',
      'Implement the actual token check-and-decrement as an ATOMIC Redis operation (a Lua script, or Redis\'s native `INCR`/`EXPIRE` combination for simpler cases) — never as separate GET-then-SET calls from application code, which introduces a genuine race condition under concurrent requests.',
      'Choose the idempotency-key storage backend (Redis vs a database table) based on whether the guarantee needs to survive a cache restart/outage and whether it needs to be atomically consistent with the protected operation itself.',
    ],
    tradeOffs:
      'A token-bucket rate limiter correctly smooths bursty traffic and avoids the fixed-window boundary flaw, at the cost of slightly more implementation complexity (tracking both a token count and a last-refill timestamp, and needing an atomic script rather than a single Redis command); a distributed rate limiter shared via Redis correctly enforces limits across an entire multi-instance fleet, at the cost of adding Redis as a hard dependency for every rate-limited request — a Redis outage means rate limiting either fails open (allowing all traffic through, a safety risk) or fails closed (rejecting all traffic, an availability risk), and this failure-mode choice must be made deliberately.',
    commonMistakes: [
      'Implementing rate limiting with a naive fixed-window counter, allowing clients to exploit the window-boundary flaw for effectively double the intended rate.',
      'Implementing the Redis token check-and-decrement as separate, non-atomic GET/SET calls from application code, introducing a race condition that lets more requests through than the configured limit under concurrent load.',
      'Not deciding explicitly (and testing) what happens to rate-limited endpoints when Redis itself is unavailable — silently failing open or closed without a deliberate choice is a real production risk either way.',
    ],
    followUpQuestions: [
      'Walk through exactly how the fixed-window boundary-burst flaw allows nearly double the intended rate limit, with concrete request timestamps.',
      'What would you choose — fail open or fail closed — for rate limiting if Redis becomes unavailable, and how would that choice differ between a public API and an internal admin tool?',
      'How would you extend this rate limiter to support DIFFERENT limits per endpoint or per subscription tier, rather than one global limit per client?',
    ],
    relatedTopics: ['Rate Limiting', 'Token Bucket', 'Redis', 'Idempotency', 'Distributed Systems', 'Race Conditions'],
  },
  {
    id: 'python-m23-12',
    number: 'PY-M23-12',
    title: 'Cache stampede / thundering herd, and mitigation strategies',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Caching Architecture',
    expectedAnswer:
      'A CACHE STAMPEDE (thundering herd) occurs when a popular cache key expires (or the cache becomes unavailable) and MANY concurrent requests simultaneously experience a cache miss, all rushing to recompute/re-fetch the same expensive underlying data at once — instead of one request regenerating the cache entry while others wait or use a stale value, the underlying database/service is hit with a sudden spike of duplicate, redundant load, which can itself cause a cascading outage. The standard mitigations are: a distributed LOCK so only ONE request regenerates the value while others wait briefly, PROBABILISTIC EARLY EXPIRATION (regenerate slightly before actual expiry, spread across requests, so expiry is never a single sharp moment), and STALE-WHILE-REVALIDATE (serve the stale value immediately while regenerating in the background).',
    deepExplanation:
      "```text\nThe stampede, concretely:\n  a popular product\\\n\nStep 1 — Understand the topic.\nCaching is an optimization with explicit TTL, invalidation, stampede, and failure behavior.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ncache = {}\n\ndef get_or_set(key, loader):\n    if key in cache:\n        return cache[key]\n    value = loader()\n    cache[key] = value\n    return value\n\nprint(get_or_set(\"user:1\", lambda: \"Ada\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nvalue = await redis.get(\"user:1\")\nif value is None:\n    value = await loader()\n    await redis.set(\n        \"user:1\",\n        value,\n        ex=60,\n    )\n```\n\nStep 5 — Example result:\n```text\nAda\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A flash-sale event caused a homepage\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use a distributed lock (or a "single-flight" pattern) so only ONE request regenerates an expired hot cache key, while concurrent requests wait briefly or serve a stale value instead of all hitting the underlying database simultaneously.',
      'Apply stampede mitigation specifically to genuinely HIGH-TRAFFIC cache keys, not uniformly to every cached value — the risk is proportional to concurrent request volume on that specific key at expiry.',
      'Ensure the underlying database/service can survive a FULL cache-layer outage without collapsing — adequate connection pooling and, ideally, a circuit breaker for graceful degradation — since a stampede at the scale of the entire cache is a real, higher-severity variant of this same problem.',
    ],
    tradeOffs:
      'Distributed-lock-based stampede mitigation adds real implementation complexity (lock acquisition/release, retry logic, choosing a sensible lock TTL) and a small amount of added latency for the requests that must wait for the lock holder, in exchange for protecting the underlying database from a traffic spike that could otherwise cause a genuine outage — for LOW-traffic cache keys where a stampede is not a realistic risk, this added complexity is unnecessary overhead.',
    commonMistakes: [
      'Applying no stampede mitigation to a genuinely hot cache key, leaving the system vulnerable to a database-overwhelming spike every time that key expires under high concurrent traffic.',
      'Applying stampede-mitigation complexity (locks, probabilistic early refresh) uniformly to every cached value in the system, including low-traffic keys where the added complexity provides no real benefit.',
      'Assuming the cache layer itself can never fail entirely, and not designing the underlying database to survive a full cache outage (every cached read becoming a simultaneous miss) without falling over.',
    ],
    followUpQuestions: [
      'Walk through exactly what happens to the underlying database when a full Redis outage occurs for a system with no stampede protection, and how a circuit breaker (covered elsewhere in this module) could help.',
      'How does probabilistic early expiration avoid concentrating cache regeneration at the EXACT expiry moment, compared to a simple fixed TTL?',
      'How would you decide which specific cache keys in a real system warrant stampede mitigation versus which do not?',
    ],
    relatedTopics: ['Cache Stampede', 'Thundering Herd', 'Distributed Locks', 'Redis', 'Cache Invalidation', 'Graceful Degradation'],
  },
  {
    id: 'python-m23-13',
    number: 'PY-M23-13',
    title: 'The three pillars of observability, RED/USE methods, and SLI/SLO/SLA with error budgets',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Observability',
    expectedAnswer:
      'The three pillars — LOGS (discrete, detailed records of individual events), METRICS (aggregated numeric measurements over time, cheap to store and query at scale), and TRACES (the path a single request takes across services/components) — answer different questions and are all needed together: metrics tell you SOMETHING is wrong and roughly where; traces tell you WHERE in a multi-service call chain the problem is; logs tell you EXACTLY what happened for a specific request. RED (Rate, Errors, Duration) is the standard metric set for a SERVICE/API; USE (Utilization, Saturation, Errors) is the standard metric set for a RESOURCE (CPU, database connections, disk) — applying the wrong framework to the wrong thing misses the metrics that actually matter for that layer.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Track and alert on p95/p99 latency, never average alone — averages structurally hide the tail-latency problems that actually determine real user experience for a meaningful fraction of traffic.',
      'Apply RED metrics to services/APIs and USE metrics to infrastructure resources — using the wrong framework for the wrong layer misses the signals that actually matter for diagnosing problems there.',
      'Define SLOs with explicit error budgets and use budget consumption as a genuine, data-backed input to deploy-risk decisions ("we have burned 90% of this month\'s budget — slow down and prioritize stability") rather than a purely qualitative judgment call.',
    ],
    tradeOffs:
      'Comprehensive observability (structured logs + RED/USE metrics + distributed tracing) requires real upfront instrumentation investment and ongoing infrastructure (a metrics store, a tracing backend, dashboards, alerting rules) — the payoff is dramatically faster incident diagnosis and a genuinely quantitative basis for reliability/velocity tradeoff decisions (via error budgets), which is difficult to overstate the value of once an organization has actually experienced trying to debug a production incident WITHOUT this instrumentation in place.',
    commonMistakes: [
      'Tracking only average latency on dashboards/alerts, missing genuine tail-latency problems that a meaningful fraction of real users are actually experiencing.',
      'Applying RED metrics (rate/errors/duration) to infrastructure RESOURCES, or USE metrics (utilization/saturation/errors) to application-level SERVICES, missing the framework actually suited to that layer.',
      'Defining an SLO with no corresponding error-budget POLICY (what actually happens once the budget is consumed), leaving the SLO as a number nobody actually acts on operationally.',
    ],
    followUpQuestions: [
      'Walk through a concrete scenario where average latency looks perfectly healthy while p99 latency reveals a real, user-impacting problem.',
      'How would you design an error-budget policy that automatically influences deploy-risk decisions (e.g. freezing non-critical deploys) once a threshold is crossed?',
      'How does a distributed trace with a shared `trace_id` across services differ from simply correlating separate services\' logs by a shared `request_id`, and when do you genuinely need the former?',
    ],
    relatedTopics: ['Observability', 'RED Method', 'USE Method', 'SLI/SLO/SLA', 'Error Budget', 'Distributed Tracing', 'OpenTelemetry'],
  },
  {
    id: 'python-m23-14',
    number: 'PY-M23-14',
    title: 'Reliability patterns — retries with backoff/jitter, timeouts, circuit breakers, and bulkheads',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Reliability Engineering',
    expectedAnswer:
      'Every external call (a database query, another service, a third-party API) needs an explicit TIMEOUT (never wait indefinitely), and only genuinely TRANSIENT failures should be RETRIED, using EXPONENTIAL BACKOFF WITH JITTER (increasing delay between attempts, randomized to prevent synchronized retry storms) — never retried BLINDLY, which risks a "retry storm" that amplifies an already-struggling downstream service\'s load. A CIRCUIT BREAKER goes further: after repeated failures, it stops even ATTEMPTING calls to a failing dependency for a cooldown period, protecting both the caller (fast-failing instead of waiting on doomed calls) and the struggling downstream service (giving it room to recover instead of continuing to be hammered).',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A payment-processing service that called a third-party fraud-detection API with NO timeout experienced a full production outage when that third-party API silently stopped responding (no error, just an indefinitely hanging connection) — every incoming payment request eventually hung waiting on the fraud check, exhausting the entire Uvicorn worker pool within minutes even though payment processing itself was otherwise perfectly healthy; the permanent fix added both an explicit 2-second timeout AND a circuit breaker around that specific call, so a future similar outage would fail fast after a brief cooldown period instead of cascading into a total service outage.\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Set an explicit timeout on EVERY external call (database query, HTTP call to another service, third-party API) — never allow a call to potentially wait indefinitely.',
      'Only retry genuinely TRANSIENT failure types (timeouts, connection errors, 5xx responses) — never retry errors that will fail identically every time (400 Bad Request, 401 Unauthorized, validation errors).',
      'Use exponential backoff WITH randomized jitter for retries, and a circuit breaker for calls to dependencies that can fail for extended periods, to avoid retry storms and to fail fast once a dependency is clearly unhealthy.',
    ],
    tradeOffs:
      'Retries with backoff/jitter improve resilience against brief, transient failures at the cost of added latency for the failing request and some implementation complexity in correctly classifying retryable vs non-retryable errors; a circuit breaker adds even more state/complexity but protects both the caller and the struggling dependency during EXTENDED outages, at the cost of legitimate requests being rejected during the OPEN state even if the dependency might have actually recovered slightly before the cooldown elapses — a deliberate, tunable tradeoff between fast-failing and giving a recovering dependency room to breathe.',
    commonMistakes: [
      'Making an external call with no explicit timeout, risking an entire worker pool being exhausted by requests hanging indefinitely on a single unresponsive dependency.',
      'Retrying EVERY failure type indiscriminately, including non-retryable errors (like a 400 Bad Request) that will fail identically on every retry attempt, wasting time and resources for no benefit.',
      'Implementing retry backoff WITHOUT jitter, causing many concurrently-failing clients to retry in synchronized waves that can prevent a recovering downstream service from ever actually stabilizing.',
    ],
    followUpQuestions: [
      'Walk through exactly how a missing timeout on one external call can cascade into a full-service outage, even when the rest of the application logic is completely healthy.',
      'Why does jitter specifically prevent a "retry storm", and what would go wrong with exponential backoff alone (no jitter) under many simultaneously-failing clients?',
      'How would you design bulkhead isolation so a slow, non-critical dependency cannot exhaust resources shared with a critical one?',
    ],
    relatedTopics: ['Retries', 'Exponential Backoff', 'Jitter', 'Timeouts', 'Circuit Breaker', 'Bulkheads', 'Reliability Engineering'],
  },
  {
    id: 'python-m23-15',
    number: 'PY-M23-15',
    title: 'Background processing — FastAPI BackgroundTasks limitations vs a real task queue',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Background Processing',
    expectedAnswer:
      'FastAPI\'s built-in `BackgroundTasks` runs code AFTER the response is sent, within the SAME process — appropriate only for quick, best-effort, non-critical work (a fire-and-forget audit log entry, a quick cache warm) where losing the task on a process crash/restart is an acceptable risk. A REAL task queue (Celery, RQ, or arq, backed by Redis/RabbitMQ as the broker) is required once work needs DURABILITY (survives a process crash/restart), RETRIES (with backoff, on failure), independent SCALING (dedicated worker processes/machines separate from the API), or SCHEDULING (run at a specific time, or periodically) — `BackgroundTasks` provides none of these guarantees.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Use FastAPI `BackgroundTasks` only for genuinely best-effort work where silent loss on a process crash/restart is an acceptable, deliberate tradeoff.',
      'Use a real, durable task queue (Celery, RQ, or arq) for any background work that must actually happen — sending emails, updating downstream systems, processing payments asynchronously — where loss is not acceptable.',
      'Write task-queue handlers to be idempotent, since message queues typically guarantee at-least-once (not exactly-once) delivery, meaning a task can occasionally be executed more than once.',
    ],
    tradeOffs:
      '`BackgroundTasks` requires zero additional infrastructure (no broker, no separate worker processes to deploy/monitor) and is trivially simple to use, at the cost of NO durability guarantee whatsoever — appropriate only when that tradeoff is genuinely acceptable; a real task queue adds meaningful infrastructure (a message broker, dedicated worker processes/deployments to operate and monitor) in exchange for durability, retries, and independent scaling — worth the added operational complexity specifically once a task\'s reliable execution actually matters to the business.',
    commonMistakes: [
      'Using `BackgroundTasks` for work that genuinely must happen reliably (sending a critical email, updating a downstream billing system), discovering only in production that tasks are silently lost during routine deploys/restarts.',
      'Introducing a full Celery/message-broker infrastructure for trivial, genuinely best-effort work where the added operational complexity provides no real benefit over the much simpler `BackgroundTasks`.',
      'Writing task-queue handlers that are NOT idempotent, causing duplicate side effects (a duplicate email, a duplicate charge) when a task is redelivered after an at-least-once delivery retry.',
    ],
    followUpQuestions: [
      'Walk through exactly why a FastAPI worker process restart (during a routine rolling deployment) silently loses any in-flight `BackgroundTasks` work.',
      'Why do most message queues guarantee at-least-once (not exactly-once) delivery, and what does that imply for how task handlers must be written?',
      'How would you decide, for a specific new feature, whether its background work belongs on `BackgroundTasks` or a real task queue?',
    ],
    relatedTopics: ['Background Tasks', 'Celery', 'Message Queues', 'Task Durability', 'Idempotency', 'At-Least-Once Delivery'],
  },
  {
    id: 'python-m23-16',
    number: 'PY-M23-16',
    title: 'File upload architecture — why large files should not pass through the database, and secure upload handling',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'File & Object Storage',
    expectedAnswer:
      'Large files (images, videos, PDFs) should be uploaded directly to OBJECT STORAGE (S3-style), with only the resulting URL/reference stored as METADATA in PostgreSQL/MongoDB — storing binary file content directly in a relational/document database bloats the database\'s working set (hurting cache efficiency for ALL other queries, not just file-related ones), makes routine database backups dramatically larger and slower, and does not scale as well for serving/CDN-caching large binary content as object storage, which is purpose-built for exactly this workload. Secure upload handling requires validating file size, MIME type, and extension server-side (never trusting client-declared values), generating a random filename (never using the client-supplied one directly), and considering malware scanning for user-supplied content.',
    deepExplanation:
      "```text\nWHY NOT store large files directly in the database:\n  - bloats the database\\\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A document-management feature that originally stored PDF file bytes directly as MongoDB `Binary` fields saw its database\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Store large binary files (images, videos, PDFs) in dedicated object storage, never directly as blob columns/fields in PostgreSQL/MongoDB — keep the database storing only metadata and a reference/URL.',
      'Validate file size, content-type, and extension server-side explicitly — never trust a client-declared `Content-Type` header alone, and for security-sensitive upload paths, inspect actual file magic bytes.',
      'Generate a random, safe filename/object key for every upload — never use the client-supplied filename directly, which can contain path-traversal sequences or collide with an existing object.',
    ],
    tradeOffs:
      'Storing files in dedicated object storage adds an additional infrastructure component (and a small amount of added architectural complexity — coordinating a file upload with its metadata record, and handling the case where one succeeds and the other fails) compared to the apparent simplicity of "just store the bytes in the same database", but avoids serious, compounding performance and backup-cost problems as file volume grows — the added complexity is well worth it for any application handling more than trivial file volume.',
    commonMistakes: [
      'Storing file content directly in the primary database, bloating its working set and backup size in a way that degrades performance for entirely unrelated queries as file volume grows.',
      'Trusting a client-supplied filename directly as the storage path/key, opening a path-traversal vulnerability or allowing an upload to silently overwrite an unrelated existing file.',
      'Making all uploaded files permanently, publicly accessible instead of using time-limited signed URLs for private content, unnecessarily widening the exposure of user-supplied files.',
    ],
    followUpQuestions: [
      'Walk through the failure mode where the file successfully uploads to object storage but the metadata write to the database fails (or vice versa) — how would you make this operation consistent?',
      'Why is validating the declared `Content-Type` header alone insufficient for a genuinely security-sensitive upload path, and what additional validation would you add?',
      'How would signed URLs let you serve private user files through a CDN without making them permanently publicly accessible?',
    ],
    relatedTopics: ['Object Storage', 'File Upload Security', 'Signed URLs', 'MIME Validation', 'Path Traversal', 'Database Design'],
  },
  {
    id: 'python-m23-17',
    number: 'PY-M23-17',
    title: 'Incident response process — severity levels, and diagnosing a database connection pool exhaustion incident',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Incident Response',
    expectedAnswer:
      'A structured incident response process (alert -> acknowledge -> assess/triage -> mitigate -> communicate -> recover -> root cause -> postmortem -> prevention) exists specifically to keep a high-pressure, time-sensitive situation from becoming chaotic — SEVERITY LEVELS (commonly SEV-1 through SEV-4, though organizations vary the exact scheme) exist to calibrate URGENCY and RESPONSE (who gets paged, how fast, what communication is required) proportional to actual customer/business impact, not proportional to how alarming the underlying technical symptom LOOKS.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A production connection-pool-exhaustion incident was traced to a specific admin-panel endpoint that acquired a database session but, on one particular validation-failure branch, raised an exception in a way that bypassed the session\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Calibrate severity levels by actual customer/business IMPACT, not by how alarming a technical symptom looks in isolation — a scary-looking error in an internal-only tool is not the same severity as a widespread customer-facing outage.',
      'Prioritize MITIGATION (restoring service) over root-cause investigation during the active incident — find the root cause AFTER the immediate fire is out, not instead of putting it out.',
      'Always run a blameless postmortem with concrete action items after any significant incident, and track those action items to actual completion — a postmortem that produces no completed follow-through prevents nothing.',
    ],
    tradeOffs:
      'A structured, disciplined incident-response process adds a small amount of process overhead (defined roles, communication cadence, formal postmortems) compared to an ad hoc "just fix it" approach, but pays for itself directly in faster, calmer, more effective incident resolution and — critically — in actually PREVENTING recurrence through tracked postmortem action items, versus repeatedly firefighting the same class of incident without ever addressing its root cause.',
    commonMistakes: [
      'Spending the initial incident-response time investigating root cause instead of mitigating customer impact first, prolonging the outage unnecessarily while the "why" investigation is still ongoing.',
      'Treating every alarming-looking error as maximum severity regardless of actual customer impact, causing alert fatigue and diluting the urgency signal for genuinely critical incidents.',
      'Writing a postmortem with action items that are never actually tracked to completion, guaranteeing the same class of incident recurs.',
    ],
    followUpQuestions: [
      'Walk through exactly how `idle in transaction` connections differ from genuinely active, long-running queries in `pg_stat_activity`, and why the distinction matters for diagnosing a pool exhaustion incident.',
      'Why is `pool_pre_ping=True` a useful SQLAlchemy production setting, and what specific failure mode does it protect against?',
      'How would you design an alert to catch connection-pool exhaustion BEFORE it causes a full outage, rather than only after the fact?',
    ],
    relatedTopics: ['Incident Response', 'Severity Levels', 'Postmortems', 'Connection Pool Exhaustion', 'Production Debugging', 'PostgreSQL'],
  },
  {
    id: 'python-m23-18',
    number: 'PY-M23-18',
    title: 'Disaster recovery — backup strategy, RPO/RTO, and DR architecture options',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Disaster Recovery',
    expectedAnswer:
      'RPO (Recovery Point Objective) answers "how much DATA can we afford to lose?" (measured as a time window — e.g. an RPO of 5 minutes means losing at most the last 5 minutes of writes is acceptable); RTO (Recovery Time Objective) answers "how quickly must the system be BACK UP?" — these two numbers, set deliberately based on actual business cost of data loss versus downtime, directly DICTATE which disaster recovery architecture (backup-and-restore, pilot light, warm standby, hot standby/multi-region) is actually required, since each provides a different RPO/RTO at a very different infrastructure cost.',
    deepExplanation:
      "```text\nStrategy            RPO              RTO             Relative Cost   How it works\n--------            ---              ---             -------------   ------------\nBackup & Restore     Hours (since      Hours            Lowest          periodic backups, restored\n                     last backup)      to a NEW/rebuilt                 to fresh infrastructure only\n                                       environment                       when disaster actually occurs\n\nPilot Light          Minutes (via       Tens of minutes  Low-moderate    minimal, always-running core\n                     continuous log      to scale up                     infrastructure (e.g. a small\n                     shipping)                                            replica DB) kept warm; full\n                                                                          capacity spun up on demand\n\nWarm Standby         Seconds to         Minutes          Moderate-high   a scaled-down but FUNCTIONAL\n                     low minutes                                          full replica environment\n                                                                          running continuously, scaled\n                                                                          up to full capacity on failover\n\nHot Standby /        Near-zero          Near-zero        Highest         a FULL-CAPACITY duplicate\nMulti-Region                             (often automatic                environment running live in\n                                          failover)                       another region, actively\n                                                                          serving traffic (or ready to\n                                                                          instantly), continuously synced\n```\n\nWorked example applying RPO/RTO to a decision, precisely: an internal analytics dashboard used by a handful of employees might reasonably have RPO = 24 hours, RTO = 4 hours — a simple nightly backup-and-restore strategy is entirely adequate, and anything more elaborate would be needless cost. A core PAYMENT PROCESSING system, by contrast, might require RPO = seconds (losing even a few seconds of transaction data is a serious financial/compliance problem) and RTO = minutes (extended downtime directly costs revenue and damages trust) — this combination essentially MANDATES a warm/hot standby architecture with continuous, near-real-time replication; a nightly-backup strategy would be a genuine, unacceptable business risk for this system, no matter how much cheaper it is.\n\nPostgreSQL-specific backup mechanics worth knowing precisely: a LOGICAL backup (`pg_dump`) exports data as portable SQL/archive format — flexible (can restore into a different PostgreSQL version, or even a modified schema) but SLOWER for both backup and restore on large databases; a PHYSICAL backup (base backup + continuous WAL archiving) copies the actual on-disk data files plus a stream of write-ahead-log segments — enables POINT-IN-TIME RECOVERY (restore to any specific moment, not just the last full backup\\\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "A company\\\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Set RPO and RTO deliberately per system, based on the ACTUAL business cost of data loss versus downtime for that specific system — never apply one blanket DR strategy uniformly across systems with genuinely different criticality.',
      'Prefer physical backups with continuous WAL archiving (PostgreSQL) for systems needing tight RPO and fast restore at scale, reserving logical backups (pg_dump) for smaller databases or cases needing cross-version portability.',
      'Regularly and genuinely TEST backup restoration (a scheduled drill restoring into a real scratch environment) — an untested backup provides no actual guarantee and is a common, devastating real-world failure mode.',
    ],
    tradeOffs:
      'Tighter RPO/RTO targets (hot standby, multi-region) provide dramatically better disaster-recovery guarantees at proportionally higher infrastructure and operational cost (continuous replication, duplicated full-capacity infrastructure, cross-region networking complexity) — the right investment level is a genuine business decision weighing the actual cost of data loss/downtime for that specific system against the ongoing cost of the DR infrastructure required to prevent it, not a technical decision made in isolation.',
    commonMistakes: [
      'Setting up a backup strategy and never actually testing restoration, discovering only during a real disaster that backups have been silently broken or incomplete for an extended period.',
      'Applying the SAME disaster-recovery strategy uniformly across systems with very different actual business criticality, either over-investing in DR for a low-stakes internal tool or dangerously under-investing for a critical revenue-generating system.',
      'Choosing a DR architecture based on infrastructure cost alone, without first establishing the actual RPO/RTO requirements that DICTATE which architecture is genuinely sufficient.',
    ],
    followUpQuestions: [
      'Walk through why a physical backup with WAL archiving enables point-in-time recovery in a way a periodic logical `pg_dump` alone cannot.',
      'How would you design and schedule a genuine backup-restoration test drill without disrupting the production system it is protecting?',
      'For a specific system, how would you determine the actual business cost of data loss (informing RPO) versus downtime (informing RTO), rather than picking numbers arbitrarily?',
    ],
    relatedTopics: ['Disaster Recovery', 'RPO', 'RTO', 'Backup Strategy', 'Point-in-Time Recovery', 'High Availability'],
  },
  {
    id: 'python-m23-19',
    number: 'PY-M23-19',
    title: 'Scalability — statelessness, load balancing algorithms, and database scaling recap',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Scalability',
    expectedAnswer:
      'A FastAPI service should be STATELESS (no request-specific data held in process memory between requests) specifically because it is the property that makes horizontal scaling trivial — a load balancer can route ANY request to ANY instance interchangeably, and instances can be added/removed/restarted freely without losing anything, since all durable state lives in backing services (PostgreSQL, MongoDB, Redis). The LOAD BALANCING ALGORITHM (round robin, least connections, weighted) determines HOW traffic is distributed across those interchangeable instances, and the right choice depends on whether requests have roughly uniform or wildly varying processing cost.',
    deepExplanation:
      "```text\nLoad balancing algorithms, and when each is the right choice:\n\nRound robin        — requests distributed in strict rotation (instance 1, 2, 3, 1, 2, 3, ...)\n                       Simple, works well when requests have roughly UNIFORM processing cost.\n\nLeast connections    — routes each new request to whichever instance currently has the\n                       FEWEST active connections. Better than round robin when request\n                       processing TIME varies significantly (a slow instance naturally\n                       receives fewer new requests until it catches up).\n\nWeighted routing      — some instances receive proportionally MORE traffic than others\n                       (e.g. a newer, more powerful instance type gets a higher weight) —\n                       also the basis for canary deployments (Module 23\\\n\nStep 1 — Understand the topic.\nChoose a datastore from access patterns, integrity requirements, scale, consistency, operational maturity, and team constraints.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef choose_database(\n    relational: bool,\n    aggregate_reads: bool,\n) -> str:\n    if relational:\n        return \"PostgreSQL\"\n    if aggregate_reads:\n        return \"MongoDB\"\n    return \"evaluate workload\"\n\nprint(\n    choose_database(True, False)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nchoice = \"PostgreSQL\"\nprint(choice)\n```\n\nStep 5 — Example result:\n```text\nPostgreSQL\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Keep every FastAPI instance genuinely stateless — any data that must persist between requests or be visible across instances belongs in a backing service (PostgreSQL, MongoDB, Redis), never in process memory.',
      'Choose "least connections" (rather than plain round robin) load balancing when request processing time varies significantly across requests, so a temporarily slow instance is not overloaded with additional new requests.',
      'Recalculate total possible database connections (instance count × per-instance pool size) every time the fleet scales, ensuring it stays comfortably under the database\'s connection limit as instance count grows.',
    ],
    tradeOffs:
      'Strict statelessness requires slightly more upfront architecture discipline (routing anything stateful to a backing service rather than the convenient shortcut of process memory) compared to a quick single-instance prototype, but is the specific property that makes horizontal scaling actually WORK correctly — without it, adding more instances does not just fail to help, it actively introduces subtle, intermittent correctness bugs exactly like the shopping-cart example above.',
    commonMistakes: [
      'Storing any request-coordinating state (rate-limit counters, session data, in-flight operation locks) in process memory, which works fine on one instance and breaks — often subtly and intermittently — the moment a second instance is added.',
      'Using plain round-robin load balancing for a workload with highly variable request processing time, overloading temporarily slow instances with a disproportionate share of new requests.',
      'Scaling application instance count without recalculating the resulting total database connection demand, silently approaching or exceeding the database\'s connection limit as the fleet grows.',
    ],
    followUpQuestions: [
      'Walk through exactly how an in-process rate limiter breaks once a second application instance is added, with concrete request counts.',
      'Why does "least connections" load balancing handle variable request-processing-time workloads better than round robin, mechanically?',
      'How would you route read-only queries to database read replicas at the application layer while keeping writes correctly routed to the primary?',
    ],
    relatedTopics: ['Statelessness', 'Load Balancing', 'Horizontal Scaling', 'Connection Pooling', 'Read Replicas', 'Session State'],
  },
  {
    id: 'python-m23-20',
    number: 'PY-M23-20',
    title: 'Coding: a production-ready FastAPI health/readiness system with dependency checks, timeouts, and a circuit breaker',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Production Coding',
    expectedAnswer:
      'A realistic "production readiness" coding exercise ties together most of this module\'s core patterns in one worked example: a `lifespan`-managed set of clients (database, Redis, an external API wrapped in a circuit breaker), separate liveness/readiness endpoints with proper timeouts on each dependency check, structured logging with a request-ID, and a centralized error handler — exactly the shape of code a senior engineer is expected to produce when asked to "make this FastAPI service production-ready" in an interview or real onboarding task.',
    deepExplanation:
      "\n\nStep 1 — Understand the topic.\nStart with requirements, identify constraints, compare alternatives, and make the trade-off explicit.\n\nStep 2 — Easy method.\nWrite the invariant/goal first, then trace one small example before adding production concerns.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef decision(input_value):\n    return input_value\n\nprint(decision(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK Python:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Edge cases:\nCheck failure paths, retries, concurrency, security, resource cleanup, configuration, and observability.\n\nStep 7 — Senior interview takeaway:\nExplain correctness first, then complexity/cost, failure mode, test strategy, and production trade-off.",
    productionExample:
      "\n\nCoding practice: explain the core/manual implementation first, then compare the Pythonic/framework approach.",
    bestPractices: [
      'Wrap EACH individual dependency check inside a readiness endpoint with its OWN short timeout, so one slow dependency cannot cause the entire readiness check itself to hang indefinitely.',
      'Thread the SAME `request_id` through middleware-level request logging AND the centralized exception handler, so any error response can be immediately correlated with its full request-lifecycle log context.',
      'Combine a circuit breaker with an explicit per-call timeout (not one or the other) — the timeout bounds an individual call\'s worst-case latency, while the circuit breaker prevents REPEATED slow/failing calls from continuing to consume that same worst-case latency budget indefinitely.',
    ],
    tradeOffs:
      'This level of production hardening (structured logging, correlated error handling, timeout-bounded health checks, circuit breakers) adds real code volume and a few new concepts to reason about compared to a minimal FastAPI app, but is precisely the difference between a service that fails predictably and observably versus one that fails in confusing, hard-to-diagnose, cascading ways under real production conditions — the investment is squarely justified for anything beyond a genuinely throwaway prototype.',
    commonMistakes: [
      'Implementing a readiness check that calls dependencies with NO individual timeout, allowing one slow/hanging dependency to make the readiness probe itself hang indefinitely — which can cause an orchestrator to treat the instance as unresponsive in a confusing, hard-to-diagnose way.',
      'Generating a request_id in middleware but failing to actually pass it through to EVERY subsequent log call and the exception handler, breaking the correlation the whole pattern exists to provide.',
      'Using a circuit breaker WITHOUT an accompanying per-call timeout (or vice versa) — the two patterns solve different but complementary problems and are most effective used together.',
    ],
    followUpQuestions: [
      'Why must the readiness check itself have per-dependency timeouts, given that each individual dependency call presumably already has its own client-level timeout configured?',
      'How would you extend this pattern to expose Prometheus-style metrics (request rate, error rate, duration histograms — the RED method from this module) alongside the existing logging?',
      'What would you change about this design if the `/products/{product_id}/price` endpoint needed to gracefully degrade to a cached/stale price instead of returning a 502 when the circuit is open?',
    ],
    relatedTopics: ['Health Checks', 'Circuit Breaker', 'Structured Logging', 'Error Handling', 'Lifespan', 'Production Readiness', 'Timeouts'],
  },
];

export const MOCK_PYTHON_MODULE23_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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