// Python + DSA Interview Handbook — Module 10: FastAPI Request & Response.
// Hand-authored technical questions covering path/query parameters, request
// bodies, headers, cookies, file uploads, response models, and pagination
// strategies — with genuine FastAPI/Pydantic code, request/response examples,
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
    id: 'python-m10-1',
    number: 'PY-M10-1',
    title: 'Path parameters: typed params, UUID, Enum, validation, multiple params',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Path Parameters',
    expectedAnswer:
      'A path parameter is declared simply by naming it in the route string (`/{user_id}`) and giving the function argument of the same name a type hint — FastAPI parses, converts, and validates it automatically before your function ever runs, and returns 422 for anything that does not match. Beyond plain `int`/`str`, path parameters can be typed as `UUID` (auto-parsed and validated as a real UUID) or a Python `Enum` (restricting the value to a fixed, documented set of choices, rejecting anything else with 422).',
    deepExplanation:
      '```python\nfrom enum import Enum\nfrom uuid import UUID\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\nclass OrderStatus(str, Enum):\n    pending = "pending"\n    shipped = "shipped"\n    delivered = "delivered"\n\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int):          # "42" -> int(42); "abc" -> 422 automatically\n    return {"user_id": user_id}\n\n@app.get("/orders/{order_id}")\nasync def get_order(order_id: UUID):        # validates real UUID format, converts to a UUID object\n    return {"order_id": str(order_id)}\n\n@app.get("/orders/status/{status}")\nasync def orders_by_status(status: OrderStatus):   # only pending/shipped/delivered accepted\n    return {"status": status.value}\n\n@app.get("/users/{user_id}/orders/{order_id}")     # multiple path params in one route\nasync def get_user_order(user_id: int, order_id: UUID):\n    return {"user_id": user_id, "order_id": str(order_id)}\n```\n\nRequest/response examples:\n\n```text\nGET /users/42            -> 200 {"user_id": 42}\nGET /users/abc           -> 422 {"detail": [{"loc": ["path", "user_id"], "msg": "Input should be a valid integer", ...}]}\nGET /orders/not-a-uuid   -> 422 {"detail": [{"loc": ["path", "order_id"], "msg": "Input should be a valid UUID", ...}]}\nGET /orders/status/lost  -> 422 {"detail": [{"loc": ["path", "status"], "msg": "Input should be \\\n\nStep 1 — Understand the topic.\nTopic: Path parameters: typed params, UUID, Enum, validation, multiple params\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom enum import Enum\nfrom uuid import UUID\nfrom fastapi import FastAPI\n\nclass OrderStatus(str, Enum):\n    pending = "pending"\n    shipped = "shipped"\n\napp = FastAPI()\n\n@app.get("/orders/{order_id}")\nasync def get_order(order_id: UUID):\n    return {"order_id": str(order_id)}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/orders/{order_id}")\nasync def get_order(order_id: UUID):\n    return {"order_id": str(order_id)}\n```\n\nStep 5 — Example result:\n```text\ninvalid UUID -> 422\n```\n\nStep 6 — Complexity / trade-off:\nTyped path parameters move parsing/validation to FastAPI.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A logistics API using `Enum` path/query parameters for shipment status (`pending`/`shipped`/`delivered`) gets free input validation AND free, accurate Swagger UI documentation (a dropdown of exactly the valid values) — eliminating an entire class of "typo in status string" bugs that a plain unvalidated `str` parameter would silently accept and only fail deep inside business logic.\n\nCoding practice: first explain the core/manual approach for **Path parameters: typed params, UUID, Enum, validation, multiple params**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always give path parameters a real type hint (`int`, `UUID`, an `Enum`) rather than leaving them as untyped `str` — this pushes validation to the framework boundary instead of your function body.',
      'Use `str, Enum` (not a plain `Enum`) for any enum used as a FastAPI parameter, so it serializes as a plain string and matches JSON expectations naturally.',
      'Order path segments so more specific literal routes are registered before parameterized ones on the same prefix, to avoid the parameterized route shadowing a literal one (see Module 9\'s routing question).',
    ],
    tradeOffs:
      'Typed path parameters (int/UUID/Enum) push validation to the framework, giving consistent 422 errors and accurate docs for free, at the cost of needing a real conversion/validation rule for every parameter — for genuinely freeform path segments (e.g. a URL-safe slug with no fixed format) a plain `str` with a regex `Path(pattern=...)` constraint is more appropriate than trying to force a stricter type.',
    commonMistakes: [
      'Leaving path parameters as untyped, unvalidated `str` and manually parsing/validating them inside the function body, duplicating what the framework would do automatically and less consistently.',
      'Using a plain `Enum` instead of `str, Enum`, which then does not serialize as a clean JSON string and can behave unexpectedly in the auto-generated docs.',
      'Forgetting that path parameters are always REQUIRED by definition (there is no way to have an "optional" path segment) — an optional value belongs in a query parameter instead.',
    ],
    followUpQuestions: [
      'What HTTP status code and body does FastAPI return automatically when a path parameter fails type conversion, and can you customize that response?',
      'Why must a path parameter always be required, unlike a query parameter?',
      'How would you add extra constraints to a path parameter (e.g. `user_id` must be positive) beyond just its type?',
    ],
    relatedTopics: ['Path Parameters', 'Type Hints', 'Enum', 'UUID', 'Automatic Validation'],
  },
  {
    id: 'python-m10-2',
    number: 'PY-M10-2',
    title: 'Query parameters: optional/required, defaults, booleans, lists, and Query() validation',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Query Parameters',
    expectedAnswer:
      'Any function parameter that is not part of the path and is a plain type (not a Pydantic model) is automatically treated as a QUERY parameter. Giving it a default value makes it optional; using `...` (Ellipsis) as the default (or omitting a default with `Query(...)`) makes it required. `Query(...)` also lets you attach validation (`ge`/`le`/`min_length`/`max_length`/`pattern`), descriptions for the docs, and declare LIST-valued query parameters (repeated `?tag=a&tag=b`).',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI, Query\n\napp = FastAPI()\n\n@app.get("/products")\nasync def list_products(\n    q: str | None = Query(None, min_length=2, max_length=50, description="Free-text search term"),\n    in_stock: bool = Query(False, description="Only return in-stock products"),\n    tags: list[str] = Query([], description="Filter by one or more tags, e.g. ?tags=sale&tags=new"),\n    min_price: float = Query(0, ge=0),\n    max_price: float | None = Query(None, gt=0),\n    category: str = Query(..., description="Required — category slug"),   # required query param\n):\n    return {\n        "q": q, "in_stock": in_stock, "tags": tags,\n        "min_price": min_price, "max_price": max_price, "category": category,\n    }\n```\n\nRequest/response examples:\n\n```text\nGET /products?category=electronics\n-> 200 {"q": null, "in_stock": false, "tags": [], "min_price": 0, "max_price": null, "category": "electronics"}\n\nGET /products?category=electronics&in_stock=true&tags=sale&tags=new&min_price=10&max_price=500\n-> 200 {"q": null, "in_stock": true, "tags": ["sale", "new"], "min_price": 10, "max_price": 500, "category": "electronics"}\n\nGET /products\n-> 422 {"detail": [{"loc": ["query", "category"], "msg": "Field required", ...}]}\n\nGET /products?category=electronics&in_stock=notabool\n-> 422 {"detail": [{"loc": ["query", "in_stock"], "msg": "Input should be a valid boolean", ...}]}\n```\n\nBoolean query parameters accept a generous set of truthy/falsy string representations out of the box (`true`/`false`/`1`/`0`/`on`/`off`/`yes`/`no`, case-insensitive) — you do not need to hand-parse `"true"` vs `"True"` vs `"1"` yourself. List query parameters use REPEATED keys (`?tags=a&tags=b`), not a single comma-separated value — a very common point of confusion for developers coming from other ecosystems that expect `?tags=a,b`.\n\nStep 1 — Understand the topic.\nTopic: Query parameters: optional/required, defaults, booleans, lists, and Query() validation\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom fastapi import FastAPI, Query\n\napp = FastAPI()\n\n@app.get("/users")\nasync def users(\n    active: bool = True,\n    limit: int = Query(20, ge=1, le=100),\n):\n    return {\n        "active": active,\n        "limit": limit,\n    }\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\n@app.get("/users")\nasync def users(\n    limit: int = Query(20, le=100),\n):\n    return {"limit": limit}\n```\n\nStep 5 — Example result:\n```text\nGET /users?active=true&limit=20\n```\n\nStep 6 — Complexity / trade-off:\nUse Query constraints to validate input at the HTTP boundary.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A product-search endpoint accepting `q`, `category`, `tags` (multi-value), `min_price`/`max_price`, and pagination params entirely through `Query(...)`-validated parameters is exactly what a production e-commerce search endpoint looks like — every constraint (price must be non-negative, search term has a sane length bound) is enforced before a single line of business logic runs, and the whole contract is self-documenting in Swagger UI.\n\nCoding practice: first explain the core/manual approach for **Query parameters: optional/required, defaults, booleans, lists, and Query() validation**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `Query(...)` (or simply no default) to make a query parameter explicitly required, and a real default value (not `None` disguised as "optional-but-actually-required-downstream") to make it genuinely optional.',
      'Always bound numeric query parameters with `ge`/`le`/`gt`/`lt` where a sane range exists (e.g. `limit` should never be unbounded) — this is cheap, framework-level protection against abuse.',
      'Remember list-valued query parameters use repeated keys (`?tag=a&tag=b`), and document that clearly since it differs from some other frameworks\' comma-separated convention.',
    ],
    tradeOffs:
      'Declaring query parameters individually (as shown here) keeps each one\'s validation rule explicit and visible in the function signature/docs, but for endpoints with MANY optional filters, grouping them into a Pydantic model (via `Depends()`, covered in Module 12) reduces signature clutter at the cost of one extra level of indirection to read.',
    commonMistakes: [
      'Expecting a comma-separated list (`?tags=a,b`) to work for a `list[str]` query parameter by default — FastAPI expects repeated keys instead, unless you manually split a single string parameter.',
      'Forgetting that an "optional" parameter with default `None` still needs `str | None` (not just `str`) as its type hint, or type checkers/Pydantic will flag the mismatch.',
      'Leaving numeric filters like `limit`/`page_size` completely unbounded, allowing a client to request an unreasonably large page in one call.',
    ],
    followUpQuestions: [
      'How would you accept a comma-separated `?tags=a,b,c` value instead of repeated keys, if a client insists on that format?',
      'What is the difference between `Query(None, ...)` and `Query(default_factory=list, ...)` for a list-valued parameter?',
      'How would you group a large number of related optional filters into a single reusable dependency instead of a long parameter list?',
    ],
    relatedTopics: ['Query Parameters', 'Query()', 'Validation', 'Boolean Parsing', 'List Query Params'],
  },
  {
    id: 'python-m10-3',
    number: 'PY-M10-3',
    title: 'Request body: Pydantic models, nested models, optional/required fields, lists/dicts/enums',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Request Body',
    expectedAnswer:
      'Any endpoint parameter typed as a Pydantic `BaseModel` subclass is automatically read from the JSON request body, validated field-by-field against the model\'s declared types/constraints, and available as a fully-typed Python object inside the function — no manual `await request.json()` or manual validation code is needed. Nested Pydantic models, lists, dicts, and enums inside the body model are validated recursively, including nested validation errors reported with a precise field path.',
    deepExplanation:
      '```python\nfrom enum import Enum\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nclass Role(str, Enum):\n    admin = "admin"\n    member = "member"\n\nclass Address(BaseModel):\n    street: str\n    city: str\n    zip_code: str = Field(..., pattern=r"^\\\\d{5}$")\n\nclass UserCreate(BaseModel):\n    email: str\n    name: str\n    role: Role = Role.member                    # optional, has a default\n    address: Address                             # nested model, required\n    tags: list[str] = []                         # optional list, defaults empty\n    metadata: dict[str, str] = {}                 # optional dict\n\n@app.post("/users")\nasync def create_user(payload: UserCreate):\n    return {"id": 1, **payload.model_dump()}\n```\n\nRequest/response examples:\n\n```text\nPOST /users\nBody: {\n  "email": "ada@example.com",\n  "name": "Ada Lovelace",\n  "address": {"street": "1 Analytical Engine Way", "city": "London", "zip_code": "90210"},\n  "tags": ["vip"]\n}\n-> 201-worthy body accepted, role defaults to "member", metadata defaults to {}\n-> 200 {"id": 1, "email": "ada@example.com", "name": "Ada Lovelace", "role": "member",\n        "address": {"street": "...", "city": "London", "zip_code": "90210"}, "tags": ["vip"], "metadata": {}}\n\nPOST /users\nBody: {"email": "ada@example.com", "name": "Ada", "address": {"street": "x", "city": "y", "zip_code": "abc"}}\n-> 422 {"detail": [{"loc": ["body", "address", "zip_code"], "msg": "String should match pattern \\\n\nStep 1 — Understand the topic.\nTopic: Request body: Pydantic models, nested models, optional/required fields, lists/dicts/enums\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom pydantic import BaseModel\n\nclass Product(BaseModel):\n    name: str\n    price: float\n    tags: list[str] = []\n\ndef create_product(product: Product):\n    return product.model_dump()\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nclass Product(BaseModel):\n    name: str\n    price: float\n\npayload = Product(\n    name="Keyboard",\n    price=99.0,\n)\nprint(payload.model_dump())\n```\n\nStep 5 — Example result:\n```text\n{"name":"Keyboard","price":99.0,"tags":[]}\n```\n\nStep 6 — Complexity / trade-off:\nSeparate input validation models from persistence/domain models when their responsibilities diverge.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A user-registration endpoint with a nested `address` object, an `role` enum with a safe default, and optional `tags`/`metadata` is a realistic production shape — the nested-path validation errors let a frontend map `body.address.zip_code` directly onto the corresponding form field\\\n\nCoding practice: first explain the core/manual approach for **Request body: Pydantic models, nested models, optional/required fields, lists/dicts/enums**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Model genuinely structured sub-data (like an address) as its OWN nested `BaseModel`, not a flat dict of loosely-related fields on the parent model — this gives you validation, reuse, and precise nested error paths for free.',
      'Give optional fields real, sensible defaults (`[]`, `{}`, an enum default) rather than `None`, when `None` is not actually a meaningful state for that field — reduces null-checking downstream.',
      'Use an `Enum` field (with a default) for any bounded set of valid string values instead of a plain `str`, to reject typos at the validation boundary.',
    ],
    tradeOffs:
      'Deeply nested request models give precise, structured validation and a rich OpenAPI schema, but every level of nesting adds a corresponding level of indirection when constructing/mapping the data on both the client and inside your service layer — for very simple, flat payloads, over-nesting can add more ceremony than value.',
    commonMistakes: [
      'Accepting a raw `dict` as the request body parameter type instead of a proper Pydantic model, throwing away automatic validation, docs generation, and type safety inside the function.',
      'Making every field truly required with no sensible default, forcing every API client to always send a fully-populated payload even for fields that could reasonably default.',
      'Forgetting that a `BaseModel` field with a mutable default like `[]` or `{}` is handled safely by Pydantic (unlike a plain Python function default), but assuming the same safety applies to plain dataclasses/functions elsewhere in the codebase.',
    ],
    followUpQuestions: [
      'How does FastAPI decide whether a parameter is a path param, query param, or request body, when there is no explicit `Body(...)`/`Query(...)` marker?',
      'How would you accept MULTIPLE separate Pydantic models as parts of the same request body (e.g. both a `user: UserCreate` and a `meta: RequestMeta`)?',
      'How would you version a request schema (e.g. `UserCreateV2` with a new required field) while keeping the v1 endpoint working unchanged?',
    ],
    relatedTopics: ['Request Body', 'Pydantic', 'Nested Models', 'BaseModel', 'Validation Errors'],
  },
  {
    id: 'python-m10-4',
    number: 'PY-M10-4',
    title: 'Reading headers: custom headers, Authorization, User-Agent, and a request-ID pattern',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Headers & Cookies',
    expectedAnswer:
      'Declaring a function parameter with `Header(...)` reads an HTTP header by name — FastAPI automatically converts the conventional hyphenated header name (e.g. `X-Request-ID`) to the matching underscored Python parameter name (`x_request_id`) unless told otherwise, and supports the same `Query`-style validation/defaults/required-vs-optional semantics.',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI, Header, HTTPException\n\napp = FastAPI()\n\n@app.get("/whoami")\nasync def whoami(\n    authorization: str | None = Header(None),             # reads "Authorization" header\n    user_agent: str | None = Header(None),                # reads "User-Agent" header\n    x_request_id: str | None = Header(None, alias="X-Request-ID"),  # explicit alias for clarity\n):\n    if authorization is None or not authorization.startswith("Bearer "):\n        raise HTTPException(status_code=401, detail="Missing or malformed Authorization header")\n    token = authorization.removeprefix("Bearer ")\n    return {"token_prefix": token[:8], "user_agent": user_agent, "request_id": x_request_id}\n```\n\nRequest/response examples:\n\n```text\nGET /whoami\nHeaders: Authorization: Bearer abcdef123456, User-Agent: curl/8.0, X-Request-ID: req-9f2a\n-> 200 {"token_prefix": "abcdef12", "user_agent": "curl/8.0", "request_id": "req-9f2a"}\n\nGET /whoami\nHeaders: (none)\n-> 401 {"detail": "Missing or malformed Authorization header"}\n```\n\nBy default FastAPI auto-converts `x_request_id` (the Python parameter name) to look for the header `X-Request-Id` (hyphenated, title-cased) — this "convert underscores" behavior is convenient but can be made explicit (or disabled) via `alias=` when the exact header casing matters or the header name is not a valid Python identifier shape at all (e.g. a header containing a dot). HTTP header names are case-INSENSITIVE per spec, and FastAPI/Starlette handle that correctly regardless of how the client capitalizes them.\n\nIn practice, raw `Authorization` header parsing like this is normally wrapped in a reusable DEPENDENCY (`Depends(get_current_user)`, covered in Module 12/13) rather than repeated inline in every endpoint — this question isolates the header-reading mechanism itself before that abstraction is introduced.\n\nStep 1 — Understand the topic.\nTopic: Reading headers: custom headers, Authorization, User-Agent, and a request-ID pattern\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom fastapi import FastAPI, Header\n\napp = FastAPI()\n\n@app.get("/debug")\nasync def debug(\n    user_agent: str | None = Header(default=None),\n):\n    return {"user_agent": user_agent}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\n@app.get("/debug")\nasync def debug(\n    request_id: str = Header(...),\n):\n    return {"request_id": request_id}\n```\n\nStep 5 — Example result:\n```text\nheader -> validated endpoint argument\n```\n\nStep 6 — Complexity / trade-off:\nTreat header input as untrusted and avoid logging sensitive authorization credentials.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A distributed tracing setup reads an inbound `X-Request-ID` header (generating one if absent) and threads it through every downstream service call and log line for that request — this is the standard mechanism that lets an engineer grep logs across multiple microservices for a single end-to-end request using one correlation ID.\n\nCoding practice: first explain the core/manual approach for **Reading headers: custom headers, Authorization, User-Agent, and a request-ID pattern**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `Header(None, alias="Exact-Header-Name")` whenever the exact header casing/format matters, rather than relying purely on the automatic underscore-to-hyphen conversion.',
      'Wrap repeated header-based auth parsing (like `Authorization` Bearer extraction) into a shared `Depends()` dependency rather than duplicating the parsing logic across many endpoints.',
      'Treat all header values as untrusted client input requiring validation, exactly like query parameters or body fields — never assume a header is well-formed just because it "usually" is.',
    ],
    tradeOffs:
      'Reading headers directly with `Header(...)` per endpoint is simple and explicit for a one-off need, but for anything auth-related it should almost always be centralized in a dependency — repeating raw header-parsing logic across many endpoints is a maintenance and security-consistency risk (a fix/hardening applied to one copy can easily be missed in another).',
    commonMistakes: [
      'Assuming header names are case-SENSITIVE when reading or setting them, leading to subtle bugs when a client or proxy changes casing (HTTP headers are case-insensitive by spec).',
      'Not handling the "header absent" case explicitly (`Header(None)` and then checking for `None`) and instead letting a required `Header(...)` produce a generic 422 with no domain-specific error message.',
      'Duplicating Authorization-header-parsing logic inline across many endpoints instead of centralizing it in one dependency, causing inconsistent auth handling as the API grows.',
    ],
    followUpQuestions: [
      'Why does FastAPI convert underscores to hyphens in header parameter names by default, and when would you want to disable that?',
      'How would you make a header required and have FastAPI return a custom 401 (rather than the default 422) when it is missing?',
      'How would you propagate an incoming X-Request-ID header to outbound calls made to downstream services from within the same request?',
    ],
    relatedTopics: ['Headers', 'Header()', 'Authorization Header', 'Request Tracing', 'Correlation ID'],
  },
  {
    id: 'python-m10-5',
    number: 'PY-M10-5',
    title: 'Cookies: reading, setting, deleting, and Secure/HttpOnly/SameSite flags',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Headers & Cookies',
    expectedAnswer:
      'Reading a cookie uses `Cookie(...)` as a parameter default, identical in shape to `Query()`/`Header()`. Setting or deleting a cookie requires access to the `Response` object (either as an injected parameter or via a `JSONResponse`/`Response` return value) and its `set_cookie()`/`delete_cookie()` methods, where `httponly=True` (JavaScript cannot read it, mitigating XSS token theft), `secure=True` (only sent over HTTPS), and `samesite="lax"`/`"strict"` (mitigating CSRF by restricting cross-site sending) are the essential security flags for any session/auth cookie.',
    deepExplanation:
      '```python\nfrom fastapi import Cookie, FastAPI, Response\n\napp = FastAPI()\n\n@app.get("/session")\nasync def read_session(session_id: str | None = Cookie(None)):\n    return {"session_id": session_id}\n\n@app.post("/login")\nasync def login(response: Response):\n    response.set_cookie(\n        key="session_id",\n        value="abc123",\n        max_age=3600,           # expires in 1 hour\n        httponly=True,           # JavaScript (document.cookie) cannot read this cookie\n        secure=True,              # only ever sent over HTTPS, never plain HTTP\n        samesite="lax",           # sent on top-level navigation, blocked on most cross-site requests\n    )\n    return {"status": "logged in"}\n\n@app.post("/logout")\nasync def logout(response: Response):\n    response.delete_cookie(key="session_id")   # instructs the browser to expire/remove it\n    return {"status": "logged out"}\n```\n\nRequest/response examples:\n\n```text\nPOST /login\n-> 200, response header: Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600\n\nGET /session\nHeaders: Cookie: session_id=abc123\n-> 200 {"session_id": "abc123"}\n\nPOST /logout\n-> 200, response header: Set-Cookie: session_id=""; Max-Age=0   (browser removes the cookie)\n```\n\nWhy each flag matters, precisely: `httponly` blocks `document.cookie` access from JavaScript, so even a successful XSS injection cannot directly exfiltrate the session token — a critical defense-in-depth layer, not a substitute for actually preventing XSS. `secure` prevents the cookie from ever being sent over an unencrypted HTTP connection, closing off network-level interception. `samesite="lax"` (the sane default for most session cookies) blocks the cookie from being sent on cross-site SUBREQUESTS (e.g. an `<img>`/fetch from evil.com to your API) while still allowing it on top-level navigation (clicking a link to your site) — `"strict"` is even tighter (blocks it even on top-level cross-site navigation, which can break legitimate flows like arriving via an external link while still logged in) and `"none"` disables the protection entirely (only appropriate for a deliberately cross-site embedded widget, and requires `secure=True` when used).\n\nStep 1 — Understand the topic.\nTopic: Cookies: reading, setting, deleting, and Secure/HttpOnly/SameSite flags\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom fastapi import FastAPI, Response\n\napp = FastAPI()\n\n@app.post("/login")\nasync def login(response: Response):\n    response.set_cookie(\n        "session",\n        "opaque-token",\n        httponly=True,\n        secure=True,\n        samesite="lax",\n    )\n    return {"ok": True}\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nresponse.set_cookie(\n    "session",\n    "opaque-token",\n    httponly=True,\n    secure=True,\n)\n```\n\nStep 5 — Example result:\n```text\ncookie set\n```\n\nStep 6 — Complexity / trade-off:\nUse Secure/HttpOnly/SameSite appropriately and never store sensitive auth values in unsafe client-readable cookies.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A production authentication flow issuing a session or refresh-token cookie always sets `httponly=True; secure=True; samesite=Lax` (or `Strict` for especially sensitive flows) as the non-negotiable minimum — omitting any one of these three flags is a commonly-flagged finding in real security audits of session-cookie-based APIs.\n\nCoding practice: first explain the core/manual approach for **Cookies: reading, setting, deleting, and Secure/HttpOnly/SameSite flags**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always set `httponly=True` on any cookie carrying a session token or credential — there is essentially never a legitimate reason for client-side JavaScript to read an auth cookie directly.',
      'Always set `secure=True` in production (HTTPS-only deployments) so the cookie is never transmitted in plaintext over an accidental HTTP connection.',
      'Default to `samesite="lax"` for session cookies unless you have a specific, understood reason to use `"strict"` or the rarer, riskier `"none"`.',
    ],
    tradeOffs:
      'Cookie-based session auth (with `httponly`/`secure`/`samesite`) is simpler for traditional browser-based apps (the browser handles attaching it automatically) but is awkward for pure API clients (mobile apps, server-to-server) that do not have a cookie jar — a bearer-token-in-header scheme (see Module 13\'s JWT question) is more portable across client types at the cost of the client needing to manage token storage/attachment itself.',
    commonMistakes: [
      'Forgetting `httponly=True` on a session cookie, leaving it readable (and stealable) by any successful XSS injection on the page.',
      'Deploying to production without `secure=True`, allowing the cookie to leak over an accidentally-unencrypted connection or a misconfigured proxy hop.',
      'Using `samesite="none"` "to make things work" without also setting `secure=True` (browsers reject `SameSite=None` cookies that are not also `Secure`) and without understanding the CSRF exposure that choice reintroduces.',
    ],
    followUpQuestions: [
      'Why does `httponly` not fully protect against session hijacking, and what else does it need to be paired with?',
      'What breaks for the end user if you set `samesite="strict"` on a session cookie for a site that receives a meaningful amount of traffic from external links?',
      'How would you implement a refresh-token rotation scheme using an httponly cookie for the refresh token and an in-memory access token on the client?',
    ],
    relatedTopics: ['Cookies', 'HttpOnly', 'Secure Flag', 'SameSite', 'Session Auth', 'CSRF', 'XSS'],
  },
  {
    id: 'python-m10-6',
    number: 'PY-M10-6',
    title: 'File uploads: UploadFile vs File, multiple files, validating size and MIME type',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'File Uploads',
    expectedAnswer:
      '`UploadFile` (from `fastapi`) is the correct type for real file uploads: it wraps a `SpooledTemporaryFile`, meaning FastAPI spools the content to disk automatically once it exceeds an in-memory threshold, so large uploads do not blow up server memory — it also exposes `.filename`, `.content_type`, and async `.read()`/`.write()`/`.seek()` methods. `File(...)` is the parameter marker (analogous to `Query`/`Body`) used when you want the raw `bytes` of a small file loaded entirely into memory instead. Multiple files are accepted via `list[UploadFile]`.',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI, File, HTTPException, UploadFile\n\napp = FastAPI()\n\nMAX_FILE_SIZE = 5 * 1024 * 1024   # 5 MB\nALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}\n\n@app.post("/avatar")\nasync def upload_avatar(file: UploadFile):\n    if file.content_type not in ALLOWED_CONTENT_TYPES:\n        raise HTTPException(status_code=415, detail=f"Unsupported content type: {file.content_type}")\n\n    size = 0\n    chunks = []\n    while chunk := await file.read(1024 * 1024):     # read in 1 MB chunks, never load unbounded data at once\n        size += len(chunk)\n        if size > MAX_FILE_SIZE:\n            raise HTTPException(status_code=413, detail="File too large (max 5 MB)")\n        chunks.append(chunk)\n\n    # ... persist chunks to storage (S3, disk) ...\n    return {"filename": file.filename, "content_type": file.content_type, "size_bytes": size}\n\n@app.post("/documents")\nasync def upload_documents(files: list[UploadFile]):        # multiple files\n    return [{"filename": f.filename, "content_type": f.content_type} for f in files]\n\n@app.post("/small-config")\nasync def upload_small_config(raw: bytes = File(...)):       # whole file loaded into memory as bytes\n    return {"size_bytes": len(raw)}\n```\n\nAPI example:\n\n```text\nPOST /avatar\nContent-Type: multipart/form-data; boundary=...\n(file field "file" = photo.png, image/png, 2.1 MB)\n-> 200 {"filename": "photo.png", "content_type": "image/png", "size_bytes": 2202009}\n\nPOST /avatar   (file field is a 10 MB image)\n-> 413 {"detail": "File too large (max 5 MB)"}\n\nPOST /avatar   (file field is a .pdf)\n-> 415 {"detail": "Unsupported content type: application/pdf"}\n```\n\nA critical, commonly-tested security nuance: `file.content_type` (the client-supplied `Content-Type` in the multipart part) is CLIENT-CONTROLLED and can be trivially spoofed — validating it alone is a first filter, not a real content-type guarantee. Production systems that need to actually TRUST a file\\\n\nStep 1 — Understand the topic.\nTopic: File uploads: UploadFile vs File, multiple files, validating size and MIME type\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom fastapi import FastAPI, UploadFile, File\n\napp = FastAPI()\n\n@app.post("/upload")\nasync def upload(\n    file: UploadFile = File(...),\n):\n    content = await file.read()\n    if len(content) > 5_000_000:\n        return {"error": "file too large"}\n    return {\n        "filename": file.filename,\n        "size": len(content),\n    }\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\n# FastAPI/Starlette handles multipart parsing:\n@app.post("/upload")\nasync def upload(\n    file: UploadFile = File(...),\n):\n    return {"filename": file.filename}\n```\n\nStep 5 — Example result:\n```text\n{"filename":"photo.jpg","size":...}\n```\n\nStep 6 — Complexity / trade-off:\nValidate size/MIME/type and avoid trusting client-supplied names.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A profile-photo upload feature enforces both a max size (checked incrementally, chunk-by-chunk, so a malicious multi-gigabyte upload is rejected early rather than after being fully buffered) and a real magic-byte content-type check before ever handing the file to an image-processing pipeline — both defenses matter because a naive size-only or declared-Content-Type-only check can be bypassed by a crafted upload.\n\nCoding practice: first explain the core/manual approach for **File uploads: UploadFile vs File, multiple files, validating size and MIME type**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `UploadFile` (not `bytes = File(...)`) for anything that could plausibly be large — it spools to disk past a memory threshold instead of loading the entire file into RAM.',
      'Enforce a maximum size by reading in bounded chunks and aborting early once the running total exceeds the limit, rather than reading the whole file first and checking its size after.',
      'Never trust the client-supplied `content_type` alone for security-sensitive validation — verify actual file content (magic bytes) when the distinction matters (e.g. rejecting an executable disguised as an image).',
    ],
    tradeOffs:
      '`UploadFile` (spooled, streaming-friendly) is the right default for user-facing uploads of unknown/variable size, at the cost of slightly more code (manual chunked reading) versus `bytes = File(...)` which is simpler to write but loads the ENTIRE file into memory up front — acceptable only for small, tightly-bounded files (e.g. a small JSON/YAML config upload) where memory usage is a non-issue.',
    commonMistakes: [
      'Using `bytes = File(...)` for potentially large uploads, risking memory exhaustion under concurrent large-file uploads.',
      'Trusting `file.content_type` as a security boundary without verifying actual file content via magic bytes, allowing a renamed/mislabeled malicious file through.',
      'Reading the entire file into memory BEFORE checking its size, defeating the purpose of a size limit meant to protect against oversized uploads in the first place.',
    ],
    followUpQuestions: [
      'How would you enforce the file-size limit at the reverse proxy/ASGI server level as a first line of defense, before your endpoint code even runs?',
      'How would you stream an uploaded file directly to S3/object storage without buffering the whole thing in the FastAPI process at all?',
      'Why is checking magic bytes more reliable than checking the file extension or the declared Content-Type header?',
    ],
    relatedTopics: ['File Uploads', 'UploadFile', 'Multipart Form Data', 'File Validation', 'Security'],
  },
  {
    id: 'python-m10-7',
    number: 'PY-M10-7',
    title: 'Response models: response_model, excluding sensitive fields, and different request vs response schemas',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Response Models',
    expectedAnswer:
      '`response_model=` on a path operation declares the OUTPUT schema explicitly and independently of whatever the endpoint function actually returns internally — FastAPI filters/coerces the return value down to exactly that schema before serializing it, which is the standard mechanism for guaranteeing a sensitive internal field (like a password hash) can NEVER leak into an API response, even if the underlying object happens to carry it.',
    deepExplanation:
      '```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel, EmailStr\n\napp = FastAPI()\n\nclass UserInDB(BaseModel):          # the FULL internal representation, as loaded from the database\n    id: int\n    email: EmailStr\n    name: str\n    hashed_password: str            # must NEVER be exposed via the API\n\nclass UserResponse(BaseModel):      # the PUBLIC-safe response schema — deliberately excludes hashed_password\n    id: int\n    email: EmailStr\n    name: str\n\n@app.get("/users/{user_id}", response_model=UserResponse)\nasync def get_user(user_id: int) -> UserInDB:\n    # even though this returns the FULL UserInDB object (with hashed_password!),\n    # FastAPI filters the response down to only UserResponse\\\n\nStep 1 — Understand the topic.\nTopic: Response models: response_model, excluding sensitive fields, and different request vs response schemas\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom pydantic import BaseModel\nfrom fastapi import FastAPI\n\nclass UserOut(BaseModel):\n    id: int\n    name: str\n\napp = FastAPI()\n\n@app.get("/users/{user_id}", response_model=UserOut)\nasync def get_user(user_id: int):\n    return {\n        "id": user_id,\n        "name": "Ada",\n        "password_hash": "hidden",\n    }\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nclass UserOut(BaseModel):\n    id: int\n    name: str\n\nprint(UserOut(\n    id=1,\n    name="Ada",\n).model_dump())\n```\n\nStep 5 — Example result:\n```text\n{"id":1,"name":"Ada"}\n```\n\nStep 6 — Complexity / trade-off:\nResponse models enforce the external contract and can prevent accidental exposure of sensitive fields.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A real user-service endpoint returns a full ORM-backed object (with `hashed_password`, internal audit timestamps, feature-flag fields, etc) directly from the database layer up to the router, relying ENTIRELY on `response_model=UserResponse` to strip everything not meant for public consumption — this is deliberately safer than requiring every developer to remember to manually build a "safe" dict by hand on every single endpoint, since the filtering happens structurally and automatically.\n\nCoding practice: first explain the core/manual approach for **Response models: response_model, excluding sensitive fields, and different request vs response schemas**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always define a dedicated response schema distinct from any internal/database model, and set `response_model=` explicitly on every path operation that returns data.',
      'Never rely on manually remembering to strip sensitive fields before returning — let `response_model` enforce it structurally so a forgotten field can never leak.',
      'Keep request (`*Create`/`*Update`), response (`*Response`/`*Out`), and internal (`*InDB`) schemas as clearly named, separate models, even when they overlap heavily in fields.',
    ],
    tradeOffs:
      'Separating request/response/internal schemas adds a small amount of boilerplate (multiple near-identical classes) compared to reusing one model everywhere, but is the difference between a sensitive-field leak being STRUCTURALLY IMPOSSIBLE (enforced by `response_model`) versus merely "unlikely if everyone remembers" — for anything touching credentials or PII, that tradeoff is not close.',
    commonMistakes: [
      'Returning the raw internal/database object with no `response_model` set, trusting that "the frontend just will not display" a sensitive field that is actually present in the JSON payload (fully visible in devtools/network tab regardless).',
      'Reusing a single `User` model for both request input and response output, forcing awkward workarounds (making `id`/`hashed_password` all `Optional` on a model that is supposed to represent a complete stored user) instead of separate schemas.',
      'Assuming `response_model` prevents the sensitive field from ever being COMPUTED/loaded at all — it only prevents it from being SERIALIZED in the response; the data still exists in memory during request handling and could still leak via logging the raw object, for instance.',
    ],
    followUpQuestions: [
      'Does `response_model` filtering happen before or after your endpoint function runs, and what does that imply about logging the raw return value?',
      'How would you design an `UserUpdate` schema where every field is optional (a true PATCH), while `UserCreate` keeps required fields?',
      'How would you handle a case where two different endpoints need to expose slightly different SUBSETS of the same underlying user data?',
    ],
    relatedTopics: ['response_model', 'Pydantic', 'Schema Separation', 'Sensitive Data', 'Serialization'],
  },
  {
    id: 'python-m10-8',
    number: 'PY-M10-8',
    title: 'Pagination strategies: offset, page/limit, and cursor-based pagination',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Pagination',
    expectedAnswer:
      'Offset pagination (`?offset=40&limit=20`, or the equivalent `?page=3&limit=20`) is simple and supports jumping to an arbitrary page, but requires the database to SCAN AND DISCARD all preceding rows (increasingly expensive deep into a large table) and can skip or duplicate rows if data is inserted/deleted between page requests. Cursor pagination (`?after=<opaque_cursor>&limit=20`) uses a stable, indexed column (or combination, e.g. `created_at` + `id` as a tiebreaker) as the cursor, giving consistent O(limit) performance at any depth and immunity to the insert/delete skew problem, at the cost of losing random "jump to page N" access.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, Query\nfrom pydantic import BaseModel\nimport base64\n\nrouter = APIRouter(prefix="/api/v1/products")\n\nclass Product(BaseModel):\n    id: int\n    name: str\n    created_at: str\n\n_db: list[Product] = []   # assume sorted by (created_at, id) ascending, backing a real indexed query\n\n# --- Offset pagination: simple, but O(offset) work discarded server-side on every deep page ---\n@router.get("/offset")\nasync def list_offset(offset: int = Query(0, ge=0), limit: int = Query(20, ge=1, le=100)):\n    page = _db[offset : offset + limit]\n    return {"items": page, "total": len(_db), "offset": offset, "limit": limit}\n\n# --- Cursor pagination: stable, O(limit) at any depth, immune to insert/delete skew ---\ndef _encode_cursor(product: Product) -> str:\n    raw = f"{product.created_at}|{product.id}"\n    return base64.urlsafe_b64encode(raw.encode()).decode()\n\ndef _decode_cursor(cursor: str) -> tuple[str, int]:\n    raw = base64.urlsafe_b64decode(cursor.encode()).decode()\n    created_at, id_str = raw.split("|")\n    return created_at, int(id_str)\n\n@router.get("/cursor")\nasync def list_cursor(after: str | None = Query(None), limit: int = Query(20, ge=1, le=100)):\n    items = _db\n    if after:\n        after_created_at, after_id = _decode_cursor(after)\n        items = [p for p in items if (p.created_at, p.id) > (after_created_at, after_id)]\n    page = items[:limit]\n    next_cursor = _encode_cursor(page[-1]) if len(page) == limit else None\n    return {"items": page, "next_cursor": next_cursor}\n```\n\nAPI example — cursor pagination in practice:\n\n```text\nGET /api/v1/products/cursor?limit=2\n-> 200 {"items": [{"id":1,...}, {"id":2,...}], "next_cursor": "MjAyNC0wMS0wMnwy"}\n\nGET /api/v1/products/cursor?after=MjAyNC0wMS0wMnwy&limit=2\n-> 200 {"items": [{"id":3,...}, {"id":4,...}], "next_cursor": "..."}\n```\n\nWhy offset pagination can silently skip/duplicate rows: if a row is DELETED from an earlier page while a client is between page 2 and page 3, every subsequent row shifts back by one position — the client\\\n\nStep 1 — Understand the topic.\nTopic: Pagination strategies: offset, page/limit, and cursor-based pagination\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef paginate(\n    items: list[int],\n    offset: int,\n    limit: int,\n) -> list[int]:\n    return items[offset:offset + limit]\n\nprint(paginate(\n    list(range(1, 11)),\n    3,\n    4,\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(\n    list(range(1, 11))[3:7]\n)\n```\n\nStep 5 — Example result:\n```text\n[4, 5, 6, 7]\n```\n\nStep 6 — Complexity / trade-off:\nOffset is simple but can become expensive/inconsistent for deep changing datasets; cursor pagination is better for stable high-volume feeds.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A social-media-style infinite-scroll feed (Twitter/Instagram-style) always uses cursor pagination, never offset — at feed depths of thousands of posts with constant inserts, offset pagination would be both slow (scanning/discarding thousands of prior rows per page) and visibly buggy (skipped or duplicated posts as new content is inserted between page loads), while cursor pagination stays fast and consistent regardless of feed depth or concurrent writes.\n\nCoding practice: first explain the core/manual approach for **Pagination strategies: offset, page/limit, and cursor-based pagination**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Default to cursor-based pagination for any endpoint expected to be paged deeply or under high write concurrency (feeds, logs, activity streams).',
      'Use offset/page-based pagination only for smaller, relatively static datasets where "jump to page N" / total-page-count UI is a genuine product requirement (e.g. an admin table with a page-number control).',
      'Encode cursors as OPAQUE tokens (base64 of an internal composite key) rather than exposing raw internal IDs/timestamps directly, so the pagination implementation can change without breaking the API contract.',
    ],
    tradeOffs:
      'Cursor pagination gives consistent O(limit) performance and correctness under concurrent writes, but gives up the ability to jump to an arbitrary page number or show a total page count cheaply (computing "how many total pages" still requires a separate, potentially expensive COUNT query) — offset pagination gives you both of those UI conveniences cheaply, at the cost of degrading performance and correctness at depth.',
    commonMistakes: [
      'Using offset pagination for a large, frequently-written table (like a live activity feed) and being surprised by skipped/duplicated items reported by users scrolling during concurrent writes.',
      'Using a single non-unique column (like `created_at` alone, with possible duplicate timestamps) as a cursor without a tiebreaker column (like `id`), causing rows with identical timestamps to be skipped or repeated.',
      'Exposing raw internal IDs directly as the cursor value instead of an opaque encoded token, coupling the API contract to internal implementation details.',
    ],
    followUpQuestions: [
      'Why does a cursor need a tiebreaker column (like `id`) in addition to a timestamp, and what goes wrong without one?',
      'How would you support both "next page" and "previous page" navigation with cursor pagination?',
      'How would you cheaply provide an approximate "total count" alongside cursor pagination without an expensive full COUNT query on every request?',
    ],
    relatedTopics: ['Pagination', 'Offset Pagination', 'Cursor Pagination', 'Database Performance', 'API Design'],
  },
  {
    id: 'python-m10-9',
    number: 'PY-M10-9',
    title: 'Coding: an update-product endpoint combining path, query, body, and header validation',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A realistic PATCH endpoint typically needs all four request-data sources at once: a path parameter identifying the resource, a request body carrying the partial update, an `Authorization` header identifying the actor, and query flags controlling response shape — demonstrating how FastAPI composes all of these cleanly in one function signature with each piece independently validated.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, Header, HTTPException, Query, status\nfrom pydantic import BaseModel, Field\n\nrouter = APIRouter(prefix="/api/v1/products", tags=["Products"])\n\nclass ProductUpdate(BaseModel):\n    name: str | None = None\n    price: float | None = Field(None, gt=0)\n    category: str | None = None\n\nclass Product(BaseModel):\n    id: int\n    name: str\n    price: float\n    category: str\n\n_db: dict[int, Product] = {\n    1: Product(id=1, name="Laptop", price=999.0, category="Electronics"),\n}\n\ndef _require_bearer(authorization: str | None) -> str:\n    if authorization is None or not authorization.startswith("Bearer "):\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")\n    return authorization.removeprefix("Bearer ")\n\n@router.patch("/{product_id}", response_model=Product)\nasync def update_product(\n    product_id: int,\n    payload: ProductUpdate,\n    authorization: str | None = Header(None),\n    notify: bool = Query(False, description="Send a notification about this change"),\n):\n    _require_bearer(authorization)\n\n    product = _db.get(product_id)\n    if product is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Product not found")\n\n    update_data = payload.model_dump(exclude_unset=True)   # only fields the client actually sent\n    updated = product.model_copy(update=update_data)\n    _db[product_id] = updated\n\n    if notify:\n        pass   # would enqueue a notification — see Module 14\\\n\nStep 1 — Understand the topic.\nTopic: Coding: an update-product endpoint combining path, query, body, and header validation\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom pydantic import BaseModel\n\nclass ProductUpdate(BaseModel):\n    name: str\n    price: float\n\ndef update_product(\n    product_id: int,\n    product: ProductUpdate,\n    request_id: str,\n):\n    return {\n        "id": product_id,\n        **product.model_dump(),\n        "request_id": request_id,\n    }\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\npayload = ProductUpdate(\n    name="Keyboard",\n    price=99.0,\n)\n\nprint(payload.model_dump())\n```\n\nStep 5 — Example result:\n```text\n{"id":42,"name":"Keyboard","price":99.0,"request_id":"abc"}\n```\n\nStep 6 — Complexity / trade-off:\nValidate path, query/body schema, and required headers at the boundary.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'This exact pattern (path id + auth header + partial-update body + `exclude_unset=True` merge) is the standard shape of a real production PATCH endpoint anywhere partial resource updates with authenticated actors are needed — the `exclude_unset` merge technique specifically is one of the most commonly missed correctness details in real FastAPI PATCH implementations.\n\nCoding practice: first explain the core/manual approach for **Coding: an update-product endpoint combining path, query, body, and header validation**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always use `model_dump(exclude_unset=True)` (or `exclude_none=True` if `None` is never a legitimate value to explicitly set) when merging a partial-update Pydantic model onto an existing object, to avoid accidentally nulling out untouched fields.',
      'Validate authentication/authorization BEFORE checking resource existence, so an unauthenticated caller learns "you are not authorized" rather than being able to probe whether a given resource ID exists via a 404 vs 401 distinction (information-leakage consideration explored further in Module 13).',
      'Keep the update schema (`ProductUpdate`, all-optional fields) structurally distinct from the full resource schema (`Product`, all-required) rather than reusing one model for both.',
    ],
    tradeOffs:
      'Composing path/query/body/header parameters directly in the function signature (as shown) keeps a single endpoint\'s full contract visible in one place, but as the number of cross-cutting concerns grows (auth, tracing, pagination) it becomes worth extracting the repeated pieces (like `_require_bearer`) into shared dependencies (Module 12) rather than reimplementing them per endpoint.',
    commonMistakes: [
      'Forgetting `exclude_unset=True` on a partial-update merge, silently nulling out fields the client did not intend to touch.',
      'Checking resource existence before authentication, leaking via status-code distinction whether a given ID exists to unauthenticated callers.',
      'Not validating `price: float | None = Field(None, gt=0)`-style constraints on optional update fields, allowing a client to PATCH a price to zero or negative through the partial-update path even though creation correctly rejects it.',
    ],
    followUpQuestions: [
      'How would this endpoint change if you wanted to support optimistic concurrency control (reject the update if the resource changed since the client last fetched it)?',
      'How would you refactor the repeated `_require_bearer` logic into a reusable dependency shared across many endpoints?',
      'What would change if `notify=true` needed to trigger a genuinely slow operation (e.g. sending an email) without delaying the response to the client?',
    ],
    relatedTopics: ['PATCH', 'Partial Updates', 'exclude_unset', 'Path Parameters', 'Query Parameters', 'Headers', 'Authentication'],
  },
  {
    id: 'python-m10-10',
    number: 'PY-M10-10',
    title: 'Coding: multi-file upload endpoint with size/MIME validation and per-file error reporting',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A production-grade multi-file upload endpoint validates EACH file independently (size, content type), continues processing the rest even if one file fails, and returns a per-file result list so the client can show which specific files succeeded or failed — rather than failing the entire request (and losing all progress) the moment any single file is invalid.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, UploadFile\nfrom pydantic import BaseModel\n\nrouter = APIRouter(prefix="/api/v1/documents", tags=["Documents"])\n\nMAX_FILE_SIZE = 10 * 1024 * 1024   # 10 MB per file\nALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg"}\nMAX_FILES_PER_REQUEST = 5\n\nclass UploadResult(BaseModel):\n    filename: str\n    status: str            # "success" | "rejected"\n    reason: str | None = None\n    size_bytes: int | None = None\n\n@router.post("/bulk-upload", response_model=list[UploadResult])\nasync def bulk_upload(files: list[UploadFile]):\n    if len(files) > MAX_FILES_PER_REQUEST:\n        return [UploadResult(filename="*", status="rejected",\n                              reason=f"Too many files (max {MAX_FILES_PER_REQUEST})")]\n\n    results: list[UploadResult] = []\n    for f in files:\n        if f.content_type not in ALLOWED_TYPES:\n            results.append(UploadResult(filename=f.filename, status="rejected",\n                                         reason=f"Unsupported type: {f.content_type}"))\n            continue\n\n        size = 0\n        too_large = False\n        while chunk := await f.read(1024 * 1024):\n            size += len(chunk)\n            if size > MAX_FILE_SIZE:\n                too_large = True\n                break\n        if too_large:\n            results.append(UploadResult(filename=f.filename, status="rejected",\n                                         reason="File exceeds 10 MB limit"))\n            continue\n\n        # ... persist the valid file to storage here ...\n        results.append(UploadResult(filename=f.filename, status="success", size_bytes=size))\n\n    return results\n```\n\nAPI example:\n\n```text\nPOST /api/v1/documents/bulk-upload\nContent-Type: multipart/form-data\n(files: report.pdf [2 MB, application/pdf], virus.exe [1 MB, application/x-msdownload], huge.png [15 MB, image/png])\n\n-> 200 [\n  {"filename": "report.pdf", "status": "success", "reason": null, "size_bytes": 2097152},\n  {"filename": "virus.exe", "status": "rejected", "reason": "Unsupported type: application/x-msdownload", "size_bytes": null},\n  {"filename": "huge.png", "status": "rejected", "reason": "File exceeds 10 MB limit", "size_bytes": null}\n]\n```\n\nReturning 200 with a MIXED per-file result list (rather than a single 4xx for the whole batch) is a deliberate API design choice: the request as a WHOLE was well-formed and processed, even though some individual files within it failed business validation — this lets the client render a clear per-file success/failure UI without needing to re-submit the entire batch, including the files that already succeeded.\n\nStep 1 — Understand the topic.\nTopic: Coding: multi-file upload endpoint with size/MIME validation and per-file error reporting\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nALLOWED = {"image/jpeg", "image/png"}\nMAX_SIZE = 5_000_000\n\ndef validate_file(\n    filename: str,\n    content_type: str,\n    size: int,\n):\n    if content_type not in ALLOWED:\n        return "invalid MIME"\n    if size > MAX_SIZE:\n        return "too large"\n    return "ok"\n\nprint(validate_file(\n    "photo.jpg",\n    "image/jpeg",\n    1000,\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(\n    "image/jpeg" in {"image/jpeg", "image/png"}\n    and 1000 <= 5_000_000\n)\n```\n\nStep 5 — Example result:\n```text\nok\n```\n\nStep 6 — Complexity / trade-off:\nValidate each file independently so one invalid file does not hide the errors of the others.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A document-management product\\\n\nCoding practice: first explain the core/manual approach for **Coding: multi-file upload endpoint with size/MIME validation and per-file error reporting**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Validate and process each file independently in a loop, catching failures per-file rather than letting one bad file abort the entire batch.',
      'Cap the number of files accepted per request explicitly (`MAX_FILES_PER_REQUEST`) in addition to per-file size limits, to bound total request processing cost.',
      'Return a structured per-item result (status + reason) rather than a single boolean/error string, so the client can render precise per-file feedback.',
    ],
    tradeOffs:
      'Partial-success batch processing (this pattern) gives a much better UX for multi-file uploads at the cost of the endpoint no longer being representable by a single HTTP status code for "did it work" — the client MUST inspect the per-item results, which is a slightly more complex client-side contract than a simple all-or-nothing 200/400.',
    commonMistakes: [
      'Failing the entire batch (and discarding already-processed valid files) the moment one file fails validation, forcing the user to retry the whole set.',
      'Not capping the total number of files per request, allowing a client to submit an unbounded batch that ties up server resources processing it.',
      'Returning only an aggregate success/failure boolean instead of per-file detail, leaving the client unable to tell the user WHICH file(s) need fixing.',
    ],
    followUpQuestions: [
      'How would you make this endpoint process files CONCURRENTLY (e.g. concurrent uploads to S3) rather than sequentially, while still collecting per-file results correctly?',
      'How would you add a total-request-body-size limit (across all files combined), not just a per-file limit?',
      'How would you handle a client that disconnects mid-upload — what cleanup does `UploadFile` need, if any?',
    ],
    relatedTopics: ['File Uploads', 'UploadFile', 'Batch Processing', 'Partial Success', 'API Design'],
  },
  {
    id: 'python-m10-11',
    number: 'PY-M10-11',
    title: 'Coding: a streaming CSV export endpoint using StreamingResponse',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      '`StreamingResponse` accepts any (async or sync) generator/iterator and streams its output to the client chunk by chunk as it is produced, instead of building the entire response body in memory first — essential for large exports (CSV/JSON dumps, big file downloads) where materializing the whole payload in memory would be slow to first byte and/or risk exhausting server memory for very large datasets.',
    deepExplanation:
      '```python\nimport csv\nimport io\nfrom typing import AsyncIterator\n\nfrom fastapi import APIRouter\nfrom starlette.responses import StreamingResponse\n\nrouter = APIRouter(prefix="/api/v1/products", tags=["Products"])\n\nasync def _fetch_products_in_batches(batch_size: int = 500) -> AsyncIterator[list[dict]]:\n    # stands in for a real paginated/cursor-based async database query\n    total = 2000\n    for offset in range(0, total, batch_size):\n        yield [{"id": i, "name": f"Product {i}", "price": 9.99 + i} for i in range(offset, offset + batch_size)]\n\nasync def _generate_csv_rows() -> AsyncIterator[str]:\n    buffer = io.StringIO()\n    writer = csv.writer(buffer)\n    writer.writerow(["id", "name", "price"])   # header row\n    yield buffer.getvalue()\n    buffer.seek(0)\n    buffer.truncate(0)\n\n    async for batch in _fetch_products_in_batches():\n        for row in batch:\n            writer.writerow([row["id"], row["name"], row["price"]])\n        yield buffer.getvalue()          # yield ONLY the newly written rows, not the whole file so far\n        buffer.seek(0)\n        buffer.truncate(0)               # reset the buffer so memory stays O(batch_size), not O(total rows)\n\n@router.get("/export.csv")\nasync def export_products_csv():\n    return StreamingResponse(\n        _generate_csv_rows(),\n        media_type="text/csv",\n        headers={"Content-Disposition": "attachment; filename=products.csv"},\n    )\n```\n\nAPI example:\n\n```text\nGET /api/v1/products/export.csv\n-> 200, Content-Type: text/csv, Content-Disposition: attachment; filename=products.csv\nBody (streamed in chunks as generated, not buffered):\nid,name,price\n0,Product 0,9.99\n1,Product 1,10.99\n...\n1999,Product 1999,2008.99\n```\n\nThe critical memory detail: `buffer.seek(0); buffer.truncate(0)` after each `yield` resets the `StringIO` buffer so each yielded chunk contains only the NEWLY written rows — without this reset, `buffer.getvalue()` would return the ENTIRE accumulated CSV so far on every yield, re-sending already-streamed data repeatedly and making memory usage grow unboundedly with the row count, completely defeating the purpose of streaming. `Content-Disposition: attachment; filename=...` is what makes the browser treat the response as a downloadable file rather than attempting to render it inline.\n\nStep 1 — Understand the topic.\nTopic: Coding: a streaming CSV export endpoint using StreamingResponse\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef csv_lines(rows):\n    yield "id,name\\n"\n    for row in rows:\n        yield f\'{row["id"]},{row["name"]}\\n\'\n\nprint("".join(csv_lines([\n    {"id": 1, "name": "Ada"},\n    {"id": 2, "name": "Bo"},\n])))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom fastapi.responses import StreamingResponse\n\nresponse = StreamingResponse(\n    csv_lines(rows),\n    media_type="text/csv",\n    headers={\n        "Content-Disposition":\n            \'attachment; filename="users.csv"\'\n    },\n)\n```\n\nStep 5 — Example result:\n```text\nid,name\\n1,Ada\\n2,Bo\\n\n```\n\nStep 6 — Complexity / trade-off:\nStreaming keeps large exports bounded in memory.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A billing dashboard\\\n\nCoding practice: first explain the core/manual approach for **Coding: a streaming CSV export endpoint using StreamingResponse**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always fetch and yield data in bounded BATCHES from the underlying data source (never load the entire result set into memory before starting to yield), so both the database query and the response streaming stay memory-bounded.',
      'Reset any reusable string/byte buffer after each yield so accumulated content is not re-sent on every subsequent chunk.',
      'Set `Content-Disposition: attachment; filename=...` for anything meant to be downloaded/saved rather than rendered inline by the browser.',
    ],
    tradeOffs:
      '`StreamingResponse` trades the simplicity of building a response body normally (`return {"data": [...]}`, fully in memory) for constant, bounded memory usage and a much faster time-to-first-byte on large payloads — at the cost of losing the ability to easily set `Content-Length` upfront (the total size is not known until streaming completes) and needing more careful error handling, since a failure partway through streaming can leave the client with a truncated, partially-received file.',
    commonMistakes: [
      'Forgetting to reset the buffer between yields, causing each chunk to resend all previously-streamed content and making memory/bandwidth usage grow quadratically with row count.',
      'Fetching the ENTIRE dataset into memory before starting the generator (e.g. `rows = await db.fetch_all(...)` up front), which defeats the purpose of streaming even though `StreamingResponse` is technically being used.',
      'Not setting `Content-Disposition`, causing browsers to attempt to render a large CSV/binary inline instead of prompting a file download.',
    ],
    followUpQuestions: [
      'How would you propagate a mid-stream database error to the client in a way that is at least somewhat detectable, given headers are already sent by the time streaming starts?',
      'How does this pattern relate to Server-Sent Events, and what would need to change to turn this into a live SSE progress stream instead of a file download?',
      'How would you add gzip compression to a streamed response without buffering the entire output first?',
    ],
    relatedTopics: ['StreamingResponse', 'Generators', 'Async Iterators', 'CSV Export', 'Memory Efficiency', 'Content-Disposition'],
  },
  {
    id: 'python-m10-12',
    number: 'PY-M10-12',
    title: 'Coding: cursor-paginated search endpoint combining filtering, sorting, and an opaque cursor',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A production search/listing endpoint typically needs filtering (by category/status), a fixed sort order (required for cursor pagination to be well-defined), and a cursor derived from the LAST item of the previous page — this exercise assembles all three into one endpoint, showing how filtering and cursor pagination compose without breaking each other\'s correctness.',
    deepExplanation:
      '```python\nimport base64\nimport json\nfrom fastapi import APIRouter, HTTPException, Query, status\nfrom pydantic import BaseModel\n\nrouter = APIRouter(prefix="/api/v1/orders", tags=["Orders"])\n\nclass Order(BaseModel):\n    id: int\n    status: str\n    created_at: str   # ISO-8601, sortable as a string\n    total: float\n\n# assume sorted ascending by (created_at, id) — the stable sort order the cursor relies on\n_db: list[Order] = [\n    Order(id=1, status="paid", created_at="2024-01-01T00:00:00", total=50.0),\n    Order(id=2, status="pending", created_at="2024-01-02T00:00:00", total=75.0),\n    Order(id=3, status="paid", created_at="2024-01-03T00:00:00", total=20.0),\n]\n\ndef _encode_cursor(order: Order) -> str:\n    payload = json.dumps({"created_at": order.created_at, "id": order.id})\n    return base64.urlsafe_b64encode(payload.encode()).decode()\n\ndef _decode_cursor(cursor: str) -> tuple[str, int]:\n    try:\n        payload = json.loads(base64.urlsafe_b64decode(cursor.encode()))\n        return payload["created_at"], payload["id"]\n    except Exception:\n        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid cursor")\n\n@router.get("/search")\nasync def search_orders(\n    status_filter: str | None = Query(None, alias="status"),\n    after: str | None = Query(None, description="Opaque cursor from a previous page\\\n\nStep 1 — Understand the topic.\nTopic: Coding: cursor-paginated search endpoint combining filtering, sorting, and an opaque cursor\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nimport base64\nimport json\n\ndef encode_cursor(position: int) -> str:\n    payload = json.dumps({"position": position})\n    return base64.urlsafe_b64encode(\n        payload.encode()\n    ).decode()\n\ndef decode_cursor(cursor: str) -> int:\n    payload = base64.urlsafe_b64decode(\n        cursor.encode()\n    )\n    return json.loads(payload)["position"]\n\ncursor = encode_cursor(20)\nprint(decode_cursor(cursor))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\ncursor = base64.urlsafe_b64encode(\n    json.dumps({"position": 20}).encode()\n).decode()\n\nprint(\n    json.loads(\n        base64.urlsafe_b64decode(\n            cursor.encode()\n        )\n    )["position"]\n)\n```\n\nStep 5 — Example result:\n```text\n20\n```\n\nStep 6 — Complexity / trade-off:\nOpaque cursors hide implementation details and are safer than exposing raw database offsets.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A support-ticket search UI combining a status filter with infinite-scroll pagination uses exactly this filter-then-cursor composition — real production systems back this with a database query like `WHERE status = %s AND (created_at, id) > (%s, %s) ORDER BY created_at, id LIMIT %s`, where the filter and the cursor comparison are combined in a single indexed query rather than the in-memory list-filtering shown here for the exercise.\n\nCoding practice: first explain the core/manual approach for **Coding: cursor-paginated search endpoint combining filtering, sorting, and an opaque cursor**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Apply filters BEFORE applying the cursor comparison, and ensure the cursor\'s comparison key exactly matches the query\'s actual sort order — any mismatch silently produces incorrect pages.',
      'Signal "no more pages" via a shorter-than-requested page (or an explicit `next_cursor: null`) rather than a separate potentially-expensive existence/count check.',
      'Validate and gracefully reject a malformed/tampered cursor (400, not a 500 crash) since cursors are client-supplied, opaque-but-not-secret values that could be corrupted or hand-edited.',
    ],
    tradeOffs:
      'Combining a filter with cursor pagination is straightforward when the filter and the cursor key are independent, but becomes considerably more complex if the SORT ORDER itself needs to vary by request (e.g. "sort by price" vs "sort by date") — each distinct sort order effectively needs its own cursor encoding scheme, since the cursor is fundamentally tied to "position within a specific ordering," not a universal bookmark.',
    commonMistakes: [
      'Letting the cursor comparison run on a DIFFERENT key than the one actually used to sort/order the underlying query, producing pages that silently skip or repeat rows.',
      'Trusting a decoded cursor without validating its shape, allowing a malformed cursor to crash the endpoint with an unhandled exception (500) instead of a clean 400.',
      'Computing `next_cursor` from the wrong item (e.g. the first item of the current page instead of the last), causing the next request to re-fetch already-seen rows or skip unseen ones.',
    ],
    followUpQuestions: [
      'How would you support a request to sort by a DIFFERENT column (e.g. `total` instead of `created_at`) while keeping cursor pagination correct?',
      'How would you make the cursor tamper-evident (detect if a client hand-edited it) without making it a full authentication mechanism?',
      'How would you translate this in-memory filtering/cursor logic into an actual indexed SQL query for a real database-backed implementation?',
    ],
    relatedTopics: ['Cursor Pagination', 'Filtering', 'Sorting', 'Search Endpoint', 'Stable Sort Order', 'API Design'],
  },
];

export const MOCK_PYTHON_MODULE10_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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