// Python + DSA Interview Handbook — Module 11: Pydantic & Data Validation.
// Hand-authored technical questions covering Pydantic v2 fundamentals, the
// full type system (Optional/Union/Literal/Enum/UUID/datetime/Decimal/
// EmailStr), Field constraints, nested models, custom field/model
// validators, request-vs-response schema separation, and Pydantic Settings
// for environment-driven configuration — with genuine FastAPI/Pydantic code
// and concrete valid/invalid input examples. Mirrors the
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
    id: 'python-m11-1',
    number: 'PY-M11-1',
    title: 'What Pydantic is, and why FastAPI is built around it',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Pydantic Fundamentals',
    expectedAnswer:
      'Pydantic is a data-validation and settings-management library that turns plain Python type hints into runtime-enforced schemas: a `BaseModel` subclass declares fields with types, and instantiating it VALIDATES and COERCES raw input (dict/JSON) into typed Python objects, raising a structured `ValidationError` on mismatch. FastAPI uses Pydantic models as the single source of truth for request bodies, query/path parameter types, and response shapes — the same type hints simultaneously drive runtime validation, JSON serialization, and the automatically generated OpenAPI schema, eliminating the need to hand-write and maintain a separate validation layer.',
    deepExplanation:
      '```python\nfrom pydantic import BaseModel, ValidationError\n\nclass User(BaseModel):\n    id: int\n    name: str\n    is_active: bool = True   # field with a default -> optional in input\n\n# deserialization: raw dict/JSON -> validated, typed Python object\nuser = User(id="42", name="Ada")   # note: "42" is a STRING in the input\nprint(user)                         # id=42 name=\'Ada\' is_active=True\nprint(type(user.id))                # <class \'int\'> — Pydantic COERCED "42" to 42\n\n# serialization: typed Python object -> plain dict / JSON\nprint(user.model_dump())            # {\'id\': 42, \'name\': \'Ada\', \'is_active\': True}\nprint(user.model_dump_json())       # \'{"id":42,"name":"Ada","is_active":true}\'\n\n# invalid input raises a structured, machine-readable error\ntry:\n    User(id="not-a-number", name="Ada")\nexcept ValidationError as exc:\n    print(exc.errors())\n    # [{\'type\': \'int_parsing\', \'loc\': (\'id\',), \'msg\': \'Input should be a valid integer, \'\n    #   \'unable to parse string as an integer\', \'input\': \'not-a-number\'}]\n```\n\n`ValidationError.errors()` is exactly the structured payload FastAPI converts into its automatic 422 response body (`{"detail": [...]}`) — this is the DIRECT mechanical link between "Pydantic validation failed" and "the client gets a precise, field-by-field 422 explaining what was wrong," with zero glue code written by the API author.\n\nKey distinction worth stating precisely: DESERIALIZATION is untrusted-input-in, validated-object-out (`User(**raw_dict)`); SERIALIZATION is validated-object-in, plain-dict/JSON-out (`user.model_dump()`) — FastAPI performs deserialization automatically on the request body against your declared parameter type, and serialization automatically on your endpoint\'s return value against `response_model` (or the inferred return type).',
    productionExample:
      'A production FastAPI endpoint declaring `async def create_order(payload: OrderCreate)` gets, for free and with zero manual code: JSON body parsing, type coercion/validation against every field in `OrderCreate`, a precise 422 error response on any mismatch, and a fully-typed `payload` object with IDE autocomplete inside the function body — replacing what would otherwise be dozens of lines of manual `request.json()` + hand-rolled `if`/`raise` validation logic per endpoint.',
    bestPractices: [
      'Always type request bodies as Pydantic models (never raw `dict`) so FastAPI can validate, document, and autocomplete them — a raw `dict` parameter bypasses all of this.',
      'Use `model_dump()` (not manual dict-building) to convert a validated model back to a plain dict for downstream code (ORM inserts, cache keys, logging).',
      'Treat a caught `ValidationError.errors()` structure as the canonical shape for field-level error reporting — do not re-derive your own ad hoc error format when Pydantic already gives you one.',
    ],
    tradeOffs:
      'Pydantic validation adds a small but real per-request CPU cost (parsing + coercion + constraint checks) compared to skipping validation entirely, but the alternative — hand-rolled validation scattered across endpoints, or worse, no validation and trusting client input directly — is both slower to write correctly and a direct security/data-integrity risk; the validation cost is well worth paying at any realistic API scale.',
    commonMistakes: [
      'Declaring a request body parameter as a raw `dict` instead of a Pydantic model, silently losing automatic validation, docs, and IDE type support.',
      'Assuming Pydantic performs STRICT type checking by default — by default it COERCES compatible types (e.g. `"42"` -> `42` for an `int` field); strict mode must be opted into explicitly (`Field(strict=True)` or `model_config = ConfigDict(strict=True)`) if silent coercion is undesirable.',
      'Confusing `model_dump()` (Python dict, with Python-native types like `datetime` objects) with `model_dump_json()` (a JSON string, with all types already JSON-serialized) and using the wrong one for a given downstream consumer.',
    ],
    followUpQuestions: [
      'What is the practical difference between Pydantic\'s default "lax" coercion mode and strict mode, and when would you want strict mode?',
      'How does a `ValidationError` raised inside a Pydantic model become a 422 HTTP response in FastAPI — what is the actual mechanism?',
      'Why does FastAPI use the SAME Pydantic model system for request validation, response serialization, AND OpenAPI schema generation, rather than three separate systems?',
    ],
    relatedTopics: ['Pydantic', 'BaseModel', 'Validation', 'Serialization', 'Deserialization', 'ValidationError'],
  },
  {
    id: 'python-m11-2',
    number: 'PY-M11-2',
    title: 'The Pydantic type system: Optional/Union/Literal, Enum, UUID, dates, Decimal, EmailStr',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Pydantic Types',
    expectedAnswer:
      'Pydantic validates against the full range of Python\'s typing system, each carrying different runtime semantics: `Optional[X]`/`X | None` allows `None` specifically; `Union[X, Y]` accepts either type (validated in order, or via a smart/discriminated mode); `Literal[...]` restricts a field to an exact enumerated set of literal values (stricter than a plain `str`); `Enum` subclasses give named, documented, IDE-autocompletable choices; `UUID`, `datetime`/`date`, and `Decimal` parse and validate their respective formats/precision automatically; `EmailStr` (via the `email-validator` extra) validates RFC-compliant email syntax at the type level.',
    deepExplanation:
      '```python\nfrom datetime import date, datetime\nfrom decimal import Decimal\nfrom enum import Enum\nfrom typing import Literal\nfrom uuid import UUID\nfrom pydantic import BaseModel, EmailStr\n\nclass Role(str, Enum):\n    ADMIN = "admin"\n    USER = "user"\n    GUEST = "guest"\n\nclass Product(BaseModel):\n    id: UUID                                  # accepts "550e8400-e29b-41d4-a716-446655440000" or a UUID object\n    sku: str\n    price: Decimal                            # exact decimal precision — never use float for money\n    status: Literal["draft", "published", "archived"]   # exact allow-list, not a free-form str\n    role: Role                                # Enum — invalid value raises, valid renders as "admin" in JSON\n    email: EmailStr | None = None             # RFC-validated email syntax, or None\n    created_at: datetime                      # ISO 8601 string -> datetime object\n    launch_date: date | None = None           # date-only, no time component\n\n# valid input — note the STRING inputs Pydantic coerces automatically\nproduct = Product(\n    id="550e8400-e29b-41d4-a716-446655440000",\n    sku="SKU-1",\n    price="19.99",                # str -> Decimal, exact, no float rounding error\n    status="published",\n    role="admin",\n    email="a@b.com",\n    created_at="2026-08-20T10:00:00Z",\n)\nprint(product.price * 3)          # Decimal(\'59.97\') — EXACT, unlike float(19.99) * 3 == 59.96999999999999\n\n# invalid input examples and the resulting errors:\nProduct(id="not-a-uuid", ...)              # -> "Input should be a valid UUID"\nProduct(status="pending", ...)             # -> "Input should be \'draft\', \'published\' or \'archived\'"\nProduct(role="superadmin", ...)            # -> "Input should be \'admin\', \'user\' or \'guest\'"\nProduct(email="not-an-email", ...)         # -> "value is not a valid email address"\n```\n\nWhy `Decimal` (not `float`) for money is a real production correctness issue, not pedantry: `float(0.1) + float(0.2) != 0.3` due to binary floating-point representation — a monetary field declared as `float` will accumulate silent rounding errors over many operations, while `Decimal` performs exact base-10 arithmetic matching how currency actually behaves.\n\n`Literal[...]` vs `Enum`: `Literal` is lighter-weight (no separate class needed) and works well for a small closed set used in exactly one place; `Enum` is preferable when the same set of values is reused across multiple models/functions, needs named references in code (`Role.ADMIN` instead of the magic string `"admin"`), or benefits from IDE autocomplete and refactor-safety.',
    productionExample:
      'A billing service models `amount: Decimal` (never `float`) for every monetary field, and a `currency: Literal["USD", "EUR", "GBP"]` allow-list rather than a free-form string — together these two type choices alone eliminate an entire class of financial-precision bugs and invalid-currency-code bugs before any business logic even runs.',
    bestPractices: [
      'Always use `Decimal` (never `float`) for monetary amounts, to get exact base-10 arithmetic instead of binary floating-point rounding error.',
      'Prefer `Literal[...]` or `Enum` over a bare `str` for any field with a known, closed set of valid values — it turns a whole class of "invalid string" bugs into a validation-time 422 instead of a runtime surprise deep in business logic.',
      'Install and use `EmailStr` (the `pydantic[email]` extra) for any email field rather than a bare `str` plus a hand-rolled regex — it is a well-tested, RFC-aware validator maintained upstream.',
    ],
    tradeOffs:
      '`Literal` is simpler and needs no separate class but does not give you a reusable, importable symbol elsewhere in the codebase; `Enum` requires defining and importing a class but gives named references (`Role.ADMIN`), IDE autocomplete, and a single place to add/remove valid values used consistently across many models — for anything beyond a single one-off field, `Enum` usually wins despite the extra boilerplate.',
    commonMistakes: [
      'Using `float` for monetary fields and later discovering accumulated rounding errors in production financial calculations.',
      'Using a bare `str` for a field with a known closed set of values (like `status`), letting typos or unexpected values slip through until they cause a bug much later in the pipeline.',
      'Forgetting the `email-validator` package must be installed separately for `EmailStr` to work — `pip install fastapi` alone does NOT include it; it is an optional extra (`pip install "pydantic[email]"` or `"fastapi[standard]"`).',
    ],
    followUpQuestions: [
      'Why does `float` arithmetic silently produce imprecise results for money, and how does `Decimal` avoid that?',
      'When would you choose `Literal[...]` over a full `Enum` class, and vice versa?',
      'How does Pydantic validate a `Union[X, Y]` field — does it try types in order, and what is "smart union" mode?',
    ],
    relatedTopics: ['Pydantic Types', 'Enum', 'Literal', 'Decimal', 'UUID', 'EmailStr', 'datetime'],
  },
  {
    id: 'python-m11-3',
    number: 'PY-M11-3',
    title: 'Field constraints: gt/ge/lt/le, length, pattern, and required vs default vs default_factory',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Field Validation',
    expectedAnswer:
      '`Field(...)` attaches per-field metadata AND validation constraints beyond the bare type: numeric bounds (`gt`/`ge`/`lt`/`le`), string/collection length (`min_length`/`max_length`), regex (`pattern`), and documentation metadata (`description`, `examples`). A field with `...` (Ellipsis) as its default (or no default at all with a type annotation) is REQUIRED; a field with a concrete default value is optional; a field needing a freshly-computed default per instance (a list, a UUID, a timestamp) must use `default_factory` — using a plain mutable default would incorrectly SHARE one object across every model instance.',
    deepExplanation:
      '```python\nfrom uuid import UUID, uuid4\nfrom datetime import datetime, timezone\nfrom pydantic import BaseModel, Field\n\nclass ProductCreate(BaseModel):\n    id: UUID = Field(default_factory=uuid4)                       # fresh UUID per instance\n    name: str = Field(..., min_length=1, max_length=100)          # required, length-bounded\n    sku: str = Field(..., pattern=r"^[A-Z]{3}-\\d{4}$")             # required, must match SKU-1234 shape\n    price: float = Field(..., gt=0, description="Must be positive")\n    quantity: int = Field(0, ge=0, le=100_000)                    # optional, defaults to 0, bounded\n    tags: list[str] = Field(default_factory=list)                 # fresh empty list per instance\n    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))\n\n# valid\nProductCreate(name="Laptop", sku="ABC-1234", price=999.99)\n\n# invalid — each raises a distinct, precise ValidationError\nProductCreate(name="", sku="ABC-1234", price=999.99)          # min_length=1 violated: "String should have at least 1 character"\nProductCreate(name="Laptop", sku="abc-1234", price=999.99)    # pattern violated (lowercase): "String should match pattern"\nProductCreate(name="Laptop", sku="ABC-1234", price=-5)         # gt=0 violated: "Input should be greater than 0"\nProductCreate(name="Laptop", sku="ABC-1234", price=999.99, quantity=200_000)  # le=100000 violated\n```\n\nThe mutable-default trap `Field` solves — this is a genuine, easy-to-miss Python (not just Pydantic) pitfall:\n\n```python\nclass Bad(BaseModel):\n    tags: list[str] = []     # Pydantic actually guards against this specific case and raises an error,\n                              # but the underlying reason default_factory exists is the general Python\n                              # gotcha: a plain mutable default argument/attribute is created ONCE and\n                              # SHARED across every instance that does not override it, unless a factory\n                              # is used to produce a fresh object per instance.\n\nclass Good(BaseModel):\n    tags: list[str] = Field(default_factory=list)   # a NEW empty list is created for every instance\n```\n\nRequired-vs-optional is determined purely by whether a default (or `default_factory`) is present, not by any special "required" flag: `name: str` (no default at all) and `name: str = Field(...)` are both required; `name: str = Field("Unnamed")` is optional with that default.',
    productionExample:
      'A production `ProductCreate` schema enforcing `price: float = Field(..., gt=0)` and `sku: str = Field(..., pattern=r"^[A-Z]{3}-\\d{4}$")` rejects malformed or nonsensical product data (negative prices, malformed SKUs) at the API boundary with a precise field-level 422 error, before that data ever reaches the database — cheaper and safer than discovering the bad data via a downstream reporting bug weeks later.',
    bestPractices: [
      'Always use `default_factory` (never a bare mutable literal) for any field whose default is a list/dict/set or needs a fresh per-instance value (UUID, current timestamp).',
      'Prefer `Field(..., gt=0)`/`pattern=...` constraints over manually re-validating the same rule inside the endpoint body — push validation as close to the type declaration as possible so it is enforced consistently everywhere the model is used.',
      'Use `Field(description=..., examples=[...])` liberally — this metadata flows directly into the auto-generated OpenAPI docs, making the constraint visible to API consumers, not just enforced silently.',
    ],
    tradeOffs:
      'Field-level constraints centralize validation logic on the schema itself (enforced identically everywhere the model is used, and self-documenting in OpenAPI) versus scattering the same checks as `if` statements inside endpoint functions (easy to forget in one of several endpoints using the "same" data, and invisible to the auto-generated docs) — the Field-based approach has a small learning-curve cost but is unambiguously more maintainable at any real scale.',
    commonMistakes: [
      'Using a bare mutable literal (`tags: list[str] = []`) instead of `default_factory=list`, which is not just non-idiomatic but is guarded against and rejected by Pydantic specifically because of the classic Python shared-mutable-default bug.',
      'Re-validating a constraint (e.g. `if price <= 0: raise ...`) manually inside the endpoint body when `Field(gt=0)` already enforces it at the schema level — redundant, and the two can silently drift out of sync.',
      'Confusing `Field(None)` (optional, defaults to `None`) with `Field(...)` (Ellipsis — REQUIRED, no default) — a very easy typo/misunderstanding that silently changes whether a field is mandatory.',
    ],
    followUpQuestions: [
      'Why does Pydantic specifically guard against bare mutable default values, and what Python-level bug is it protecting you from?',
      'How would you add a constraint that depends on TWO fields at once (e.g. "end_date must be after start_date") — is `Field(...)` alone sufficient?',
      'What is the difference between `Field(None)` and `Field(default=None)` versus omitting a default entirely, in terms of what becomes required?',
    ],
    relatedTopics: ['Field', 'Constraints', 'default_factory', 'Required Fields', 'Mutable Default Argument'],
  },
  {
    id: 'python-m11-4',
    number: 'PY-M11-4',
    title: 'Nested models: User with Address and Profile, and nested validation error paths',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Nested Models',
    expectedAnswer:
      'Pydantic models can be nested as field types (a `User` model containing an `Address` model, or a `list[Address]`) and validation recurses fully into every nested level — a validation failure deep inside a nested/list field produces a `ValidationError` whose `loc` tuple gives the EXACT path to the failing field (e.g. `("addresses", 1, "zip_code")` for the second address in a list), which is essential for giving API clients precise, actionable error messages on complex nested payloads.',
    deepExplanation:
      '```python\nfrom pydantic import BaseModel, Field, EmailStr, ValidationError\n\nclass Address(BaseModel):\n    street: str\n    city: str\n    zip_code: str = Field(..., pattern=r"^\\d{5}(-\\d{4})?$")\n    country: str = "US"\n\nclass Profile(BaseModel):\n    bio: str | None = None\n    website: str | None = None\n\nclass User(BaseModel):\n    name: str\n    email: EmailStr\n    addresses: list[Address] = Field(default_factory=list, max_length=5)\n    profile: Profile = Field(default_factory=Profile)\n\n# valid nested input\nuser = User(\n    name="Ada",\n    email="ada@example.com",\n    addresses=[\n        {"street": "1 Infinite Loop", "city": "Cupertino", "zip_code": "95014"},\n        {"street": "10 Downing St", "city": "London", "zip_code": "abcde"},  # invalid — will fail below\n    ],\n    profile={"bio": "Engineer"},\n)\n```\n```python\ntry:\n    User(\n        name="Ada", email="ada@example.com",\n        addresses=[{"street": "10 Downing St", "city": "London", "zip_code": "abcde"}],\n    )\nexcept ValidationError as exc:\n    for err in exc.errors():\n        print(err["loc"], "->", err["msg"])\n    # (\'addresses\', 0, \'zip_code\') -> String should match pattern \'^\\\\d{5}(-\\\\d{4})?$\'\n```\n\nThe `loc` tuple `("addresses", 0, "zip_code")` is exactly what a well-built frontend form needs to highlight the SPECIFIC invalid field in the SPECIFIC list item — this precision is a direct consequence of validation recursing fully into nested models/lists rather than treating them as an opaque blob, and it is exactly the payload shape FastAPI\'s automatic 422 response exposes to API clients.\n\nA nested model can also be reused across multiple parent models (`Address` might appear on both `User` and `Order`), giving a single source of truth for that sub-schema\'s validation rules and its representation in the generated OpenAPI `components/schemas` section (nested models get their own named schema, referenced via `$ref`, rather than being inlined redundantly everywhere they are used).',
    productionExample:
      'A checkout API accepting `{"shipping_address": {...}, "billing_address": {...}, "items": [{...}, {...}]}` relies entirely on nested-model validation recursing correctly into each address and each line item — a malformed ZIP code on the SECOND item in a multi-item order produces a precise `loc` pointing at exactly that field, letting the frontend surface a targeted, in-context error instead of a vague "something in your order is wrong" message.',
    bestPractices: [
      'Extract genuinely reusable sub-structures (an address, a monetary amount, a contact) into their own named Pydantic models rather than inlining the same fields repeatedly across multiple parent models.',
      'Rely on the `loc` path in `ValidationError.errors()` (surfaced automatically via FastAPI\'s 422 response) to build precise, field-targeted frontend error UIs instead of showing one generic error banner for the whole form.',
      'Bound list-type nested fields with `Field(max_length=N)` (e.g. `addresses: list[Address] = Field(max_length=5)`) to prevent a client from submitting an unreasonably large nested payload.',
    ],
    tradeOffs:
      'Deeply nested Pydantic models give precise, structured validation and self-documenting OpenAPI schemas, but very deep nesting (4+ levels) can make both the error `loc` paths and the generated docs harder for API consumers to visually parse — for very complex payloads, flattening some structure or splitting into multiple simpler endpoints is sometimes the better API design choice even though Pydantic could technically validate the deep nesting correctly.',
    commonMistakes: [
      'Flattening what is conceptually a nested structure (address fields directly on `User` as `address_street`, `address_city`, ...) instead of a proper nested `Address` model, losing reusability and making the schema harder to extend.',
      'Not bounding list-type nested fields (`addresses: list[Address]` with no `max_length`), allowing a client to submit an arbitrarily large nested array and inflate request processing cost.',
      'Assuming a `ValidationError` on a nested field aborts validation of SIBLING fields too — by default Pydantic collects and reports ALL validation errors across the whole payload in one pass, not just the first one encountered.',
    ],
    followUpQuestions: [
      'How does Pydantic represent a reused nested model (like `Address` used in both `User` and `Order`) in the generated OpenAPI schema — is it duplicated or referenced?',
      'Why is it valuable that Pydantic collects ALL validation errors in one pass rather than stopping at the first one, from an API client\'s perspective?',
      'How would you write a custom validator that needs to check something across the WHOLE nested `User` object (e.g. "at least one address must be marked as default"), not just a single field?',
    ],
    relatedTopics: ['Nested Models', 'Validation Error Paths', 'BaseModel Composition', 'OpenAPI Schemas'],
  },
  {
    id: 'python-m11-5',
    number: 'PY-M11-5',
    title: 'Custom validators: field_validator, model_validator, and cross-field validation',
    difficulty: 'Hard',
    experienceLevel: '2–4 Years',
    category: 'Custom Validators',
    expectedAnswer:
      '`@field_validator("field_name")` attaches custom logic to a SINGLE field (transform/normalize it, or raise `ValueError` to reject it) and runs after Pydantic\'s built-in type coercion by default (`mode="after"`) or before it (`mode="before"`, useful for pre-normalizing raw input like stripping whitespace before type checking). `@model_validator(mode="after")` runs once the WHOLE model has been built, giving access to every field simultaneously — the correct tool for CROSS-FIELD validation (e.g. "password and password_confirm must match") that no single-field validator can express.',
    deepExplanation:
      '```python\nfrom pydantic import BaseModel, field_validator, model_validator\n\nclass SignupRequest(BaseModel):\n    username: str\n    password: str\n    password_confirm: str\n    email: str\n\n    @field_validator("username")\n    @classmethod\n    def username_must_be_alnum(cls, value: str) -> str:\n        cleaned = value.strip()\n        if not cleaned.isalnum():\n            raise ValueError("username must contain only letters and numbers")\n        return cleaned.lower()   # validators can also NORMALIZE/transform the value, not just check it\n\n    @field_validator("password")\n    @classmethod\n    def password_strength(cls, value: str) -> str:\n        if len(value) < 8:\n            raise ValueError("password must be at least 8 characters")\n        if not any(c.isdigit() for c in value):\n            raise ValueError("password must contain at least one digit")\n        return value\n\n    @model_validator(mode="after")\n    def passwords_must_match(self) -> "SignupRequest":\n        if self.password != self.password_confirm:\n            raise ValueError("password and password_confirm do not match")\n        return self\n\n# valid\nSignupRequest(username="Ada99", password="secret123", password_confirm="secret123", email="a@b.com")\n\n# invalid examples and their errors:\nSignupRequest(username="Ada 99", password="secret123", password_confirm="secret123", email="a@b.com")\n# -> loc=(\'username\',) msg=\'Value error, username must contain only letters and numbers\'\n\nSignupRequest(username="Ada99", password="short", password_confirm="short", email="a@b.com")\n# -> loc=(\'password\',) msg=\'Value error, password must be at least 8 characters\'\n\nSignupRequest(username="Ada99", password="secret123", password_confirm="different", email="a@b.com")\n# -> loc=(\'__root__\',) or loc=() depending on version, msg=\'Value error, password and password_confirm do not match\'\n```\n\n`mode="before"` vs `mode="after"` on `field_validator`: `mode="after"` (the default) receives the value AFTER Pydantic\'s own type coercion has already run (so a declared `int` field is already an `int` by the time your validator sees it); `mode="before"` receives the RAW input before coercion, useful for normalizing messy input (e.g. stripping currency symbols from a string BEFORE Pydantic tries to parse it as a `Decimal`).\n\nWhy `model_validator(mode="after")` (not a field validator) is the only correct tool for `passwords_must_match`: a field validator only ever sees ONE field\'s value in isolation — it structurally cannot compare `password` against `password_confirm`, since it has no access to the rest of the model\'s data. `model_validator(mode="after")` runs once every individual field has already passed its own validation, with `self` giving access to the fully-typed model.',
    productionExample:
      'A production signup endpoint uses exactly this `field_validator` (per-field normalization/strength rules) plus `model_validator` (password-confirmation cross-check) combination to reject weak or mismatched signups with precise, field-targeted error messages BEFORE any password hashing or database write is attempted — validation failing fast and cheaply at the schema layer, before any expensive/side-effecting work runs.',
    bestPractices: [
      'Use `@field_validator` for single-field rules (format, strength, normalization) and reserve `@model_validator(mode="after")` specifically for rules that genuinely need MULTIPLE fields at once.',
      'Raise plain `ValueError` (not a custom exception type) inside validators — Pydantic specifically catches `ValueError`/`TypeError`/`AssertionError` and converts them into a proper `ValidationError` entry; other exception types propagate uncaught and crash the whole validation.',
      'Use validators to NORMALIZE (lowercase an email, strip whitespace, trim a string) as well as to reject — a validator can both validate AND transform the value it returns.',
    ],
    tradeOffs:
      'Pushing business rules into Pydantic validators keeps them co-located with the schema and automatically enforced everywhere that schema is used, but validators are still fundamentally SCHEMA-layer concerns — rules that need external state (e.g. "username must not already exist in the database") cannot live in a Pydantic validator at all (no DB access at validation time) and must instead be checked in the service/endpoint layer after basic schema validation passes.',
    commonMistakes: [
      'Raising a custom exception class instead of `ValueError` inside a validator, which Pydantic does not catch, causing an unhandled 500 instead of the expected structured 422.',
      'Trying to implement cross-field validation (like password confirmation) inside a `@field_validator`, which structurally cannot see other fields — leading to convoluted workarounds instead of just using `@model_validator(mode="after")`.',
      'Attempting database-dependent checks (uniqueness, existence) inside a Pydantic validator — validators run synchronously with no DB session available; such checks belong in the endpoint/service layer, not the schema.',
    ],
    followUpQuestions: [
      'Why does Pydantic only catch `ValueError`/`TypeError`/`AssertionError` from a validator and not arbitrary exceptions?',
      'How would you validate something that requires an async database lookup (like username uniqueness) given that Pydantic validators are synchronous?',
      'What is the difference between `mode="before"` and `mode="after"` on `@model_validator`, and when would you need the "before" variant at the model level?',
    ],
    relatedTopics: ['field_validator', 'model_validator', 'Cross-Field Validation', 'Custom Error Messages', 'ValueError'],
  },
  {
    id: 'python-m11-6',
    number: 'PY-M11-6',
    title: 'Why response models must never be your database model: UserCreate/UserUpdate/UserResponse/UserDatabase',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Schema Separation',
    expectedAnswer:
      'A single "User" model reused for both request input and response output is a serious, common data-leak vector — returning a raw database-backed model directly risks serializing fields like `hashed_password`, internal flags, or audit metadata straight into the HTTP response. The fix is separating schemas by PURPOSE: `UserCreate` (fields a client may set on creation, e.g. plaintext `password`), `UserUpdate` (a partial-update variant, typically all-optional fields), `UserResponse` (only fields safe to expose publicly — explicitly excludes `hashed_password` and other internals), and `UserDatabase`/ORM model (the full internal representation, including sensitive fields, never returned directly).',
    deepExplanation:
      '```python\nfrom pydantic import BaseModel, EmailStr, ConfigDict\nfrom datetime import datetime\nfrom uuid import UUID\n\n# what a CLIENT may send when creating a user\nclass UserCreate(BaseModel):\n    email: EmailStr\n    password: str        # plaintext, received once, immediately hashed and discarded — never stored/returned as-is\n\n# what a CLIENT may send when partially updating a user (all optional — see the PATCH question)\nclass UserUpdate(BaseModel):\n    email: EmailStr | None = None\n    password: str | None = None\n\n# the FULL internal representation — mirrors the database row, includes SENSITIVE fields\nclass UserDatabase(BaseModel):\n    model_config = ConfigDict(from_attributes=True)   # allows building this from an ORM object\n    id: UUID\n    email: EmailStr\n    hashed_password: str      # NEVER present in any response schema\n    is_superuser: bool\n    failed_login_attempts: int\n    created_at: datetime\n\n# what is actually safe to return to a CLIENT — deliberately narrow\nclass UserResponse(BaseModel):\n    model_config = ConfigDict(from_attributes=True)\n    id: UUID\n    email: EmailStr\n    created_at: datetime\n    # note: hashed_password, is_superuser, failed_login_attempts are ALL deliberately absent\n\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.post("/users", response_model=UserResponse)   # <-- this is the actual safety mechanism\nasync def create_user(payload: UserCreate) -> UserDatabase:\n    hashed = f"hashed({payload.password})"   # real code: passlib/argon2, see Module 13\n    db_user = UserDatabase(\n        id="...", email=payload.email, hashed_password=hashed,\n        is_superuser=False, failed_login_attempts=0, created_at="2026-08-20T00:00:00Z",\n    )\n    return db_user   # FastAPI serializes this THROUGH response_model=UserResponse, dropping unlisted fields\n```\n\nThe critical mechanism to understand precisely: `response_model=UserResponse` on the path operation is what makes this SAFE even though the function returns a full `UserDatabase` object — FastAPI serializes the return value THROUGH the declared `response_model` schema, silently dropping any field not declared on `UserResponse` (including `hashed_password`). If `response_model` were omitted (or mistakenly set to `UserDatabase`), the endpoint would leak the password hash directly in the JSON response — a real, high-severity vulnerability class in APIs that skip this separation.',
    productionExample:
      'A real credential leak: an early version of a hypothetical internal admin API returned the ORM user object directly with no `response_model` set, and `GET /admin/users` leaked every user\'s `hashed_password` field in the JSON response body — trivially exploitable via offline hash-cracking; the fix was exactly this four-schema separation pattern, enforced via `response_model` on every user-related endpoint.',
    bestPractices: [
      'Always declare `response_model` explicitly on every path operation returning user (or any sensitive-adjacent) data — never rely on "the function just happens to return the right shape."',
      'Maintain distinct Create/Update/Response/Database schemas per resource as a default pattern, not just for `User` — apply the same separation to any resource with fields that should not always be both settable and visible.',
      'Use `ConfigDict(from_attributes=True)` (formerly `orm_mode`) on schemas that need to be constructed FROM an ORM/database object, so `Model.model_validate(orm_instance)` works directly.',
    ],
    tradeOffs:
      'Maintaining four separate schemas per resource is more upfront boilerplate than reusing one model everywhere, but the alternative — one shared model for input, storage, AND output — makes an accidental sensitive-field leak a matter of when, not if, as the model inevitably grows new internal-only fields over time; the boilerplate cost is a worthwhile, one-time investment against a high-severity, recurring risk class.',
    commonMistakes: [
      'Omitting `response_model` entirely and just returning the raw ORM/database object, trusting that "it looked fine when I tested it" — new sensitive fields added later silently leak with zero warning.',
      'Using the SAME model for both `UserCreate` and `UserResponse`, which either forces the response to require a client-supplied `password` field (nonsensical) or accidentally exposes it in responses.',
      'Assuming `response_model` merely documents the response shape rather than ACTIVELY filtering it — it is an enforced serialization contract, not just a doc-generation hint.',
    ],
    followUpQuestions: [
      'What actually happens, mechanically, if an endpoint returns an object with MORE fields than `response_model` declares — does FastAPI raise an error or silently drop them?',
      'How would you handle a field that should be settable on create but NEVER updatable afterward (e.g. `email` might be immutable after verification) using this schema-separation pattern?',
      'Why is `response_model_exclude`/`response_model_include` generally considered a weaker safety mechanism than maintaining a fully separate, deliberately narrow response schema?',
    ],
    relatedTopics: ['Schema Separation', 'response_model', 'Sensitive Data', 'Security', 'ORM Mode', 'from_attributes'],
  },
  {
    id: 'python-m11-7',
    number: 'PY-M11-7',
    title: 'Pydantic Settings: environment variables, .env files, and validating configuration at startup',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Pydantic Settings',
    expectedAnswer:
      '`pydantic-settings`\'s `BaseSettings` is a `BaseModel` variant specialized for application CONFIGURATION: it automatically reads values from environment variables (and, via `SettingsConfigDict(env_file=".env")`, from a `.env` file) instead of from a request body, applying the exact same type validation/coercion as any other Pydantic model — meaning a missing required setting, or one with the wrong type (e.g. a non-integer `PORT`), fails LOUDLY at application STARTUP rather than silently or deep inside request handling.',
    deepExplanation:
      '```python\nfrom pydantic import Field, field_validator\nfrom pydantic_settings import BaseSettings, SettingsConfigDict\n\nclass Settings(BaseSettings):\n    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)\n\n    app_name: str = "Demo API"\n    debug: bool = False\n    database_url: str                    # required — no default -> app refuses to start without it\n    secret_key: str = Field(..., min_length=32)   # required, and must be sufficiently long\n    allowed_origins: list[str] = Field(default_factory=list)\n    environment: str = "development"\n\n    @field_validator("secret_key")\n    @classmethod\n    def secret_key_not_placeholder(cls, value: str) -> str:\n        if value in {"changeme", "secret", "your-secret-key-here"}:\n            raise ValueError("SECRET_KEY must not be a placeholder value in any environment")\n        return value\n\nsettings = Settings()   # reads DATABASE_URL, SECRET_KEY, etc. from the environment / .env — raises\n                          # a ValidationError IMMEDIATELY on import if anything required is missing/invalid\n```\n```text\n# .env (never committed to version control — see security considerations)\nDATABASE_URL=postgresql+asyncpg://user:pass@localhost/mydb\nSECRET_KEY=a-genuinely-long-random-production-secret-key-value\nDEBUG=false\nALLOWED_ORIGINS=["https://app.example.com","https://admin.example.com"]\n```\n\nUsed as a FastAPI dependency (see Module 12) so it can be overridden cleanly in tests:\n\n```python\nfrom fastapi import Depends\nfrom functools import lru_cache\n\n@lru_cache   # settings are expensive-ish to build (file I/O) and never change during the process lifetime\ndef get_settings() -> Settings:\n    return Settings()\n\n@app.get("/config-check")\nasync def config_check(settings: Settings = Depends(get_settings)):\n    return {"app_name": settings.app_name, "environment": settings.environment}\n```\n\nWhy failing fast at STARTUP matters enormously in production: without this, a missing `DATABASE_URL` might not surface as an error until the first request that actually touches the database — potentially minutes or hours after a bad deploy, and only once real traffic hits the broken code path, versus `BaseSettings()` raising a `ValidationError` and CRASHING THE PROCESS IMMEDIATELY on startup, which container orchestrators (Kubernetes, ECS) interpret as "deployment failed" and can auto-rollback.',
    productionExample:
      'A Kubernetes deployment\'s readiness/liveness probes fail immediately (rather than accepting traffic into a half-broken instance) when a `Settings()` instantiation fails at import time due to a missing `SECRET_KEY` in a misconfigured environment — the orchestrator sees the pod crash-loop and can automatically halt the rollout, preventing a bad config from ever serving real user traffic.',
    bestPractices: [
      'Never commit `.env` files containing real secrets to version control — commit an `.env.example` template with placeholder values instead, and load real secrets via a secrets manager in production (see Module 13).',
      'Make genuinely required configuration values (database URL, secret key) have NO default, so `Settings()` fails loudly at startup if they are missing, rather than silently falling back to an insecure default.',
      'Cache the `Settings()` instance (e.g. `@lru_cache`) rather than re-reading environment variables/`.env` on every request — configuration does not change during a running process\'s lifetime.',
    ],
    tradeOffs:
      'Failing fast at startup (no defaults for critical secrets) means a misconfigured deployment never even starts serving traffic, which is exactly the desired behavior for critical secrets, but means every environment (including local dev, CI, and every developer\'s machine) MUST provide a complete `.env`/environment — a minor ongoing friction cost worth paying to eliminate the far worse failure mode of a production deployment silently running with a missing or default (insecure) secret.',
    commonMistakes: [
      'Giving a real placeholder default to `SECRET_KEY` (like `"changeme"`) "to make local dev easier," which then gets accidentally deployed to production unchanged if an environment variable is not properly overridden.',
      'Committing a `.env` file containing real credentials to version control, permanently leaking them into git history even if later removed.',
      'Re-instantiating `Settings()` on every request instead of caching it once, adding unnecessary repeated file I/O and environment-variable parsing overhead to every request.',
    ],
    followUpQuestions: [
      'How would you validate that `DATABASE_URL` is actually reachable at startup, beyond just checking it is a syntactically valid string?',
      'How would you structure `Settings` to support different values per environment (dev/staging/prod) without duplicating the whole class three times?',
      'Why is failing fast at startup (an unhandled `ValidationError` crashing the process) actually the DESIRED behavior for a misconfigured required secret, rather than something to catch and work around?',
    ],
    relatedTopics: ['Pydantic Settings', 'BaseSettings', 'Environment Variables', '.env Files', 'Configuration', 'Secrets Management'],
  },
  {
    id: 'python-m11-8',
    number: 'PY-M11-8',
    title: 'Coding: nested User + Address + Profile validation model with custom validators',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A realistic user-registration schema combines nested models (`Address`, `Profile`), `Field` constraints, and custom validators (normalization + cross-field checks) into one cohesive, production-representative example — exercising every technique from this module in a single, coherent shape.',
    deepExplanation:
      '```python\nfrom pydantic import BaseModel, EmailStr, Field, field_validator, model_validator\n\nclass Address(BaseModel):\n    street: str = Field(..., min_length=1)\n    city: str = Field(..., min_length=1)\n    zip_code: str = Field(..., pattern=r"^\\d{5}(-\\d{4})?$")\n    country: str = Field("US", min_length=2, max_length=2)\n\n    @field_validator("country")\n    @classmethod\n    def uppercase_country(cls, value: str) -> str:\n        return value.upper()\n\nclass Profile(BaseModel):\n    bio: str | None = Field(None, max_length=280)\n    birth_year: int | None = Field(None, ge=1900, le=2026)\n\n    @model_validator(mode="after")\n    def check_reasonable_age(self) -> "Profile":\n        if self.birth_year is not None and (2026 - self.birth_year) < 13:\n            raise ValueError("user must be at least 13 years old")\n        return self\n\nclass UserRegistration(BaseModel):\n    name: str = Field(..., min_length=1, max_length=100)\n    email: EmailStr\n    addresses: list[Address] = Field(..., min_length=1, max_length=3)\n    profile: Profile = Field(default_factory=Profile)\n\n    @field_validator("name")\n    @classmethod\n    def normalize_name(cls, value: str) -> str:\n        return " ".join(value.split())   # collapse internal whitespace, trim ends\n\n# valid registration\nUserRegistration(\n    name="  Ada   Lovelace ",\n    email="ada@example.com",\n    addresses=[{"street": "1 Infinite Loop", "city": "Cupertino", "zip_code": "95014", "country": "us"}],\n    profile={"bio": "Mathematician", "birth_year": 1990},\n)\n# -> name == "Ada Lovelace" (normalized), addresses[0].country == "US" (uppercased)\n\n# invalid — empty addresses list violates min_length=1\nUserRegistration(name="Ada", email="ada@example.com", addresses=[])\n# -> loc=(\'addresses\',) msg=\'List should have at least 1 item after validation, not 0\'\n\n# invalid — nested cross-field check inside Profile\nUserRegistration(\n    name="Ada", email="ada@example.com",\n    addresses=[{"street": "1 Loop", "city": "X", "zip_code": "95014"}],\n    profile={"birth_year": 2020},\n)\n# -> loc=(\'profile\',) msg=\'Value error, user must be at least 13 years old\'\n```',
    productionExample:
      'This exact composition — a top-level schema with a required, bounded list of nested `Address` models, an optional nested `Profile` with its own cross-field validator, and field-level normalization on the parent — is the realistic shape of a production signup/onboarding schema, not a simplified toy example; the same pattern scales directly to more complex resources (orders with multiple line items, organizations with multiple members).',
    bestPractices: [
      'Keep validators close to the field/model they belong to (put the age check inside `Profile`, not hoisted up into `UserRegistration`) so each schema remains independently correct and testable.',
      'Normalize input (whitespace collapsing, case normalization) in `@field_validator` rather than expecting callers to always send pre-cleaned data.',
      'Bound every list-type field with explicit `min_length`/`max_length` rather than leaving it unbounded, even when "no one would ever send 1000 addresses" feels obvious.',
    ],
    tradeOffs:
      'Putting the age-validation cross-field check inside the nested `Profile` model (rather than in the top-level `UserRegistration`) keeps `Profile` independently valid/reusable on its own, at the cost of the top-level model not having a single place listing every validation rule — for most codebases this locality trade-off favors correctness and reuse over a single centralized (but harder-to-maintain) validation file.',
    commonMistakes: [
      'Skipping `min_length=1` on the required `addresses` list, allowing a technically-valid-but-useless empty-list registration to pass.',
      'Putting the `check_reasonable_age` cross-field logic in the wrong model (e.g. trying to reference `self.profile.birth_year` from a `UserRegistration`-level validator instead of keeping it local to `Profile`), unnecessarily coupling the two schemas.',
      'Forgetting `model_validator(mode="after")` returns `self` — omitting the `return self` line causes the validator to implicitly return `None`, which Pydantic will reject as an invalid replacement for the model instance.',
    ],
    followUpQuestions: [
      'How would you extend this schema to require exactly one address be marked as the "primary" shipping address?',
      'How would you write a test asserting the precise `loc` path of a specific nested validation failure?',
      'How would you reuse the `Address` model in a separate `Order` schema while keeping both independently valid?',
    ],
    relatedTopics: ['Nested Models', 'Custom Validators', 'Field Constraints', 'model_validator', 'field_validator'],
  },
  {
    id: 'python-m11-9',
    number: 'PY-M11-9',
    title: 'Coding: password confirmation and strength validation with custom error messages',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A production-grade password schema combines a per-field strength validator (length, character-class requirements) with a model-level cross-field confirmation check, surfacing distinct, actionable error messages for each specific failure mode rather than one generic "invalid password" message.',
    deepExplanation:
      '```python\nimport re\nfrom pydantic import BaseModel, model_validator, field_validator\n\nclass PasswordChangeRequest(BaseModel):\n    current_password: str\n    new_password: str\n    new_password_confirm: str\n\n    @field_validator("new_password")\n    @classmethod\n    def validate_strength(cls, value: str) -> str:\n        errors = []\n        if len(value) < 10:\n            errors.append("at least 10 characters")\n        if not re.search(r"[A-Z]", value):\n            errors.append("one uppercase letter")\n        if not re.search(r"[a-z]", value):\n            errors.append("one lowercase letter")\n        if not re.search(r"\\d", value):\n            errors.append("one digit")\n        if not re.search(r"[^\\w\\s]", value):\n            errors.append("one special character")\n        if errors:\n            raise ValueError(f"password must contain: {\', \'.join(errors)}")\n        return value\n\n    @model_validator(mode="after")\n    def check_confirmation_and_reuse(self) -> "PasswordChangeRequest":\n        if self.new_password != self.new_password_confirm:\n            raise ValueError("new_password and new_password_confirm do not match")\n        if self.new_password == self.current_password:\n            raise ValueError("new_password must be different from current_password")\n        return self\n\n# valid\nPasswordChangeRequest(\n    current_password="OldPass1!",\n    new_password="NewPass99!",\n    new_password_confirm="NewPass99!",\n)\n\n# invalid — weak password, caught by the field validator BEFORE the model validator even runs\nPasswordChangeRequest(current_password="x", new_password="weak", new_password_confirm="weak")\n# -> loc=(\'new_password\',) msg=\'Value error, password must contain: at least 10 characters, \'\n#    \'one uppercase letter, one digit, one special character\'\n\n# invalid — strong enough individually, but mismatched confirmation (caught by model_validator)\nPasswordChangeRequest(\n    current_password="OldPass1!", new_password="NewPass99!", new_password_confirm="Different99!",\n)\n# -> msg=\'Value error, new_password and new_password_confirm do not match\'\n```\n\nOrdering matters: FIELD validators run first (per-field), and only once ALL fields individually pass do MODEL validators run — so a weak `new_password` is reported via the specific `new_password` field-level error, never masked by a generic model-level "passwords don\'t match" message that would be misleading if the passwords were never even compared due to the weak one already failing.\n\nNever log or store `new_password`/`current_password` anywhere (application logs, error trackers) — treat any exception containing these fields\' raw values as a field that must be redacted before logging (see Module 13 for full password-handling security practice, including hashing on the way INTO storage).',
    productionExample:
      'A production "change password" endpoint uses exactly this two-layer validation (field-level strength, then model-level confirmation-and-reuse check) to reject weak or mismatched password changes with a precise, actionable message BEFORE the request ever reaches the password-hashing/database-write logic — cheap, fast-failing validation ahead of any expensive or side-effecting work.',
    bestPractices: [
      'Report ALL missing strength requirements in one message (as shown) rather than raising on the first missing requirement — lets the user fix everything in one pass instead of playing error-message whack-a-mole.',
      'Never include the actual password VALUE in any error message, log line, or exception trace — only describe what requirement was violated.',
      'Check "new password differs from current password" as a distinct rule from "passwords match each other" — both are real UX and security requirements worth surfacing separately.',
    ],
    tradeOffs:
      'Enforcing a strict, multi-requirement password policy (length + all character classes) improves resistance to naive brute-force/dictionary attacks but adds real user friction and does not, by itself, protect against credential-stuffing (reused passwords from other breaches) — for genuinely strong protection, this schema-level policy should be paired with breach-database checking (e.g. HaveIBeenPwned\'s k-anonymity API) at the service layer, which a Pydantic validator alone cannot provide.',
    commonMistakes: [
      'Comparing `new_password` to `new_password_confirm` inside a `@field_validator` on one of the two fields, which cannot reliably see the other field\'s value depending on field declaration order — this must be a `@model_validator`.',
      'Logging the full request body (including plaintext passwords) on a validation failure for debugging purposes, creating a sensitive-data leak in log storage.',
      'Only checking password strength on SIGNUP but not on password CHANGE/RESET flows, leaving a bypass for weak passwords via the reset path.',
    ],
    followUpQuestions: [
      'How would you integrate a breach-database check (e.g. via the HaveIBeenPwned k-anonymity API) into this validation flow, given it requires an async network call?',
      'Why must `current_password` verification (checking it matches what is actually stored, hashed) happen in the SERVICE layer rather than in this Pydantic schema?',
      'How would you redact password fields from structured application logs automatically, so a developer cannot accidentally log them even if they tried?',
    ],
    relatedTopics: ['Password Validation', 'Cross-Field Validation', 'model_validator', 'Security', 'Custom Error Messages'],
  },
  {
    id: 'python-m11-10',
    number: 'PY-M11-10',
    title: 'Coding: partial-update (PATCH) schemas with all-optional fields and exclude_unset',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A PATCH endpoint needs a schema where every field is genuinely OPTIONAL (unset fields must be distinguishable from fields explicitly set to `None`), and the update logic must apply only the fields the client actually SENT — using `model_dump(exclude_unset=True)` to get only the explicitly-provided fields, rather than blindly overwriting every field (which would wrongly reset unsent fields to their schema defaults).',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, HTTPException, status\nfrom pydantic import BaseModel\n\nclass UserUpdate(BaseModel):\n    name: str | None = None\n    email: str | None = None\n    bio: str | None = None\n    # every field optional — a PATCH request may include ANY SUBSET of these\n\n_db = {1: {"id": 1, "name": "Ada", "email": "ada@old.com", "bio": "Old bio"}}\nrouter = APIRouter(prefix="/users")\n\n@router.patch("/{user_id}")\nasync def update_user(user_id: int, payload: UserUpdate):\n    if user_id not in _db:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")\n\n    # exclude_unset=True -> ONLY the fields the client actually included in the request body\n    update_data = payload.model_dump(exclude_unset=True)\n    _db[user_id].update(update_data)\n    return _db[user_id]\n\n# Client sends: PATCH /users/1  {"bio": "New bio"}\n# update_data = {"bio": "New bio"}   -- NOT {"name": None, "email": None, "bio": "New bio"}\n# result: {"id": 1, "name": "Ada", "email": "ada@old.com", "bio": "New bio"}\n#   name and email are UNTOUCHED, exactly as intended for a partial update\n```\n\nThe bug this avoids, made concrete — using plain `model_dump()` (no `exclude_unset`) instead:\n\n```python\nupdate_data = payload.model_dump()   # WRONG for PATCH\n# -> {\'name\': None, \'email\': None, \'bio\': \'New bio\'}\n# _db[user_id].update(update_data) would WIPE OUT name and email to None,\n# even though the client never mentioned them — a real, silent data-loss bug.\n```\n\n`exclude_unset=True` distinguishes three genuinely different client intents that a naive all-optional schema alone cannot: (1) field omitted entirely from the request -> leave untouched; (2) field explicitly sent as `null`/`None` -> the client wants to CLEAR it; (3) field sent with a real value -> update to that value. Case (2) is why `exclude_unset` (which fields were SET, regardless of what they were set TO) is the right tool, not `exclude_none` (which would also incorrectly drop a legitimate "clear this field to null" request).\n\nContrast with PUT: a PUT handler for the same resource would use the FULL (non-optional, all-required) `UserCreate`-shaped schema and simply overwrite every field unconditionally — that is the correct, expected "replace the entire resource" semantics for PUT, versus PATCH\'s "apply only what was sent" semantics.',
    productionExample:
      'A production user-settings PATCH endpoint uses exactly `exclude_unset=True` to let a mobile app update only a user\'s notification preference without accidentally wiping their display name or avatar URL to `null` — a bug class that has caused real, hard-to-reproduce data-loss incidents in APIs that used plain `model_dump()` on an all-optional PATCH schema.',
    bestPractices: [
      'Always use `model_dump(exclude_unset=True)` (never a plain `model_dump()`) when applying a PATCH payload to existing data, so omitted fields are genuinely left untouched.',
      'Reserve `None` in a PATCH schema field to mean "the client explicitly wants to clear this field" — never conflate "omitted" and "set to null" by using a bare optional field with no way to distinguish the two if that distinction matters for the resource.',
      'Keep a separate, all-required schema for POST/PUT (full create/replace) and a separate, all-optional schema for PATCH — do not try to reuse one schema for both operations.',
    ],
    tradeOffs:
      'All-optional PATCH schemas correctly support true partial updates but lose the compile-time/validation-time guarantee that "this object has all its required fields" — some teams instead choose to only support PUT (full replacement) for simplicity, accepting the larger payload size on every update in exchange for never needing `exclude_unset` reasoning at all; PATCH is worth the added complexity specifically when partial updates from bandwidth-constrained or UI-driven clients (mobile apps editing one field at a time) are a real requirement.',
    commonMistakes: [
      'Using plain `model_dump()` (without `exclude_unset=True`) to build the update dict, silently resetting every field the client did not mention back to `None`/its default — a serious, easy-to-miss data-loss bug.',
      'Confusing `exclude_unset` with `exclude_none` — the latter would ALSO strip out a field the client legitimately set to `null` to intentionally clear it, which is a different (and often wrong) behavior for PATCH semantics.',
      'Reusing the exact same schema for both POST (create, all required) and PATCH (update, all optional), forcing an awkward "everything is optional even though it should be required on create" compromise.',
    ],
    followUpQuestions: [
      'How would you allow a client to explicitly clear a field to `null` via PATCH while still leaving genuinely omitted fields untouched — does the current schema support that, and how would you verify it?',
      'How does this pattern change if the underlying update target is an ORM object instead of a plain dict — would you still use `model_dump(exclude_unset=True)`?',
      'Why is PUT expected to be idempotent while a naive PATCH implementation (as shown) might not be — under what payload would this specific PATCH implementation NOT be idempotent?',
    ],
    relatedTopics: ['PATCH', 'Partial Update', 'exclude_unset', 'model_dump', 'PUT vs PATCH'],
  },
  {
    id: 'python-m11-11',
    number: 'PY-M11-11',
    title: 'Coding: sensitive-field filtering end-to-end — UserDatabase never leaks hashed_password',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A complete, runnable end-to-end demonstration that `response_model` genuinely filters sensitive fields at serialization time — showing an endpoint that internally works with (and even logs, carefully) a full `UserDatabase` object containing `hashed_password`, while the actual HTTP response, driven entirely by `response_model=UserResponse`, never contains it.',
    deepExplanation:
      '```python\nfrom fastapi import APIRouter, FastAPI\nfrom pydantic import BaseModel, EmailStr, ConfigDict\nfrom datetime import datetime, timezone\n\nclass UserDatabase(BaseModel):\n    model_config = ConfigDict(from_attributes=True)\n    id: int\n    email: EmailStr\n    hashed_password: str\n    created_at: datetime\n\nclass UserResponse(BaseModel):\n    model_config = ConfigDict(from_attributes=True)\n    id: int\n    email: EmailStr\n    created_at: datetime\n\n_db: dict[int, UserDatabase] = {\n    1: UserDatabase(\n        id=1, email="ada@example.com",\n        hashed_password="$argon2id$v=19$...redacted...",\n        created_at=datetime.now(timezone.utc),\n    )\n}\n\nrouter = APIRouter(prefix="/users")\n\n@router.get("/{user_id}", response_model=UserResponse)   # <-- the enforcement point\nasync def get_user(user_id: int) -> UserDatabase:\n    return _db[user_id]   # returns the FULL object, including hashed_password\n\napp = FastAPI()\napp.include_router(router)\n```\n\nWhat actually happens on the wire — this is the part worth demonstrating concretely, not just asserting:\n\n```text\nGET /users/1\n\n200 OK\n{\n  "id": 1,\n  "email": "ada@example.com",\n  "created_at": "2026-08-20T00:00:00Z"\n}\n# NOTE: hashed_password is NOT present, even though the endpoint function\n# returned a UserDatabase object that DOES contain it — response_model\n# performed the filtering during serialization, transparently.\n```\n\nA test asserting this contract explicitly (this is exactly what should be in the test suite for any endpoint like this — see the Testing section):\n\n```python\nfrom fastapi.testclient import TestClient\n\nclient = TestClient(app)\n\ndef test_get_user_never_leaks_password_hash():\n    response = client.get("/users/1")\n    assert response.status_code == 200\n    body = response.json()\n    assert "hashed_password" not in body\n    assert set(body.keys()) == {"id", "email", "created_at"}\n```\n\nThe critical insight for a senior interview: this safety is a property of the DECLARED `response_model`, not of what the function body happens to return or how carefully a developer remembers to manually strip fields — which is exactly why it is robust against future carelessness (a new sensitive field added to `UserDatabase` later is automatically excluded from `UserResponse` unless someone deliberately adds it there too).',
    productionExample:
      'This exact pattern — and specifically the test asserting `"hashed_password" not in body`, run in CI on every PR — is the standard way production teams gain confidence that a sensitive-field leak cannot silently reappear as the `User`-adjacent schemas evolve over time, since any accidental widening of `UserResponse` to include a sensitive field would be caught by an assertion like `set(body.keys()) == {...}` failing immediately.',
    bestPractices: [
      'Write an explicit test asserting the EXACT set of keys present in a sensitive endpoint\'s response, not just that the endpoint returns 200 — a set-equality assertion catches both leaks (extra keys) and regressions (missing expected keys).',
      'Treat `response_model` as the actual security boundary it is, and code-review changes to any Response schema with the same scrutiny as changes to authorization logic.',
      'Never manually strip sensitive fields inside the endpoint body ("just delete hashed_password before returning") as an alternative to `response_model` — that pattern is fragile and easy to forget on a NEW endpoint returning the same object.',
    ],
    tradeOffs:
      'Relying on `response_model` as the single enforcement point is both simpler and structurally safer than manual field-stripping, but it does mean every new endpoint returning user data MUST remember to declare the correct `response_model` — there is no framework-level default that forces this; the safety is opt-in per endpoint, which is why the explicit "assert the leaked field is absent" test is worth writing even though `response_model` should already prevent it.',
    commonMistakes: [
      'Forgetting to set `response_model` on a NEW endpoint that happens to return the same `UserDatabase`-shaped object as an existing, correctly-configured endpoint, silently reintroducing the leak on just that one new route.',
      'Testing only the happy-path status code and a couple of expected fields being PRESENT, without ever asserting that sensitive fields are ABSENT — a test suite with no negative assertion on this specific risk provides false confidence.',
      'Logging the full `UserDatabase` object (including `hashed_password`) via a generic "log the response" debug statement, leaking it into application logs even though the HTTP response itself is correctly filtered.',
    ],
    followUpQuestions: [
      'How would you write a lint rule or code-review checklist item to catch a new user-related endpoint missing `response_model`?',
      'Beyond hashed passwords, what other fields on a typical `UserDatabase` model would you also want to guarantee are never in `UserResponse` (hint: internal flags, audit/security metadata)?',
      'How would `response_model_exclude={"hashed_password"}` compare to the fully-separate-schema approach shown here, in terms of long-term safety as the model grows?',
    ],
    relatedTopics: ['response_model', 'Sensitive Data', 'Security', 'Schema Separation', 'API Testing'],
  },
  {
    id: 'python-m11-12',
    number: 'PY-M11-12',
    title: 'Coding: a Pydantic Settings class for a real app — DATABASE_URL, SECRET_KEY, DEBUG, ALLOWED_ORIGINS',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A production-shaped `Settings` class loads a realistic configuration surface (database connection, secret key, debug flag, CORS allow-list) from environment variables/`.env`, with type coercion (a comma-separated env string parsed into a `list[str]`), required-vs-optional fields chosen deliberately per setting, and a custom validator enforcing an environment-appropriate invariant (`debug` must be `False` whenever `environment == "production"`).',
    deepExplanation:
      '```python\nfrom pydantic import Field, field_validator, model_validator\nfrom pydantic_settings import BaseSettings, SettingsConfigDict\n\nclass Settings(BaseSettings):\n    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")\n\n    environment: str = Field("development", pattern="^(development|staging|production)$")\n    debug: bool = False\n    database_url: str                                        # required, no default\n    secret_key: str = Field(..., min_length=32)               # required, minimum length enforced\n    allowed_origins: list[str] = Field(default_factory=list)  # parsed from a comma-separated env var\n    request_timeout_seconds: float = Field(30.0, gt=0, le=300)\n\n    @field_validator("allowed_origins", mode="before")\n    @classmethod\n    def split_comma_separated(cls, value: str | list[str]) -> list[str]:\n        if isinstance(value, str):\n            return [origin.strip() for origin in value.split(",") if origin.strip()]\n        return value\n\n    @model_validator(mode="after")\n    def debug_forbidden_in_production(self) -> "Settings":\n        if self.environment == "production" and self.debug:\n            raise ValueError("DEBUG must be False when ENVIRONMENT=production")\n        return self\n\n# .env\n# ENVIRONMENT=production\n# DEBUG=false\n# DATABASE_URL=postgresql+asyncpg://user:pass@db.internal/prod\n# SECRET_KEY=<a genuinely long, random, per-environment secret>\n# ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com\n# REQUEST_TIMEOUT_SECONDS=15\n\nsettings = Settings()\nprint(settings.allowed_origins)   # [\'https://app.example.com\', \'https://admin.example.com\']\n\n# a genuinely MISCONFIGURED production environment raises IMMEDIATELY on import:\n# ENVIRONMENT=production DEBUG=true DATABASE_URL=... SECRET_KEY=... python -c "from settings import settings"\n# -> pydantic_core.ValidationError: 1 validation error for Settings\n#    Value error, DEBUG must be False when ENVIRONMENT=production\n```\n\nUsage wiring `allowed_origins` directly into CORS middleware (Module 14), demonstrating settings are not just inert config but drive real app behavior:\n\n```python\nfrom fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI(debug=settings.debug)\napp.add_middleware(CORSMiddleware, allow_origins=settings.allowed_origins, allow_methods=["*"], allow_headers=["*"])\n```\n\nThe `mode="before"` field validator on `allowed_origins` is necessary specifically because environment variables are ALWAYS raw strings — there is no native way to store a Python list directly in an env var, so the comma-separated-string-to-list parsing must happen BEFORE Pydantic\'s normal `list[str]` type validation runs on the value.',
    productionExample:
      'A real incident class this exact `debug_forbidden_in_production` validator prevents: a Django/Flask/FastAPI app accidentally deployed to production with `DEBUG=True` can leak full stack traces (including source code snippets, local variable values, and sometimes secrets) to any client that triggers a 500 error — enforcing this invariant at the Settings-validation layer makes that misconfiguration IMPOSSIBLE to deploy, rather than relying on a manual deployment checklist to catch it.',
    bestPractices: [
      'Encode cross-setting SAFETY invariants (like "no debug mode in production") directly as `model_validator` checks on `Settings`, so a misconfiguration crashes the deployment instead of silently shipping an insecure configuration.',
      'Parse comma-separated or otherwise non-native-typed environment variables via a `mode="before"` field validator, since env vars are always raw strings.',
      'Constrain free-form string settings that represent a closed set (like `environment`) with `pattern=...` rather than leaving them as an arbitrary string, catching typos like `"produciton"` at startup instead of silently treating it as "not production."',
    ],
    tradeOffs:
      'Encoding safety invariants as Settings validators (crash-on-misconfiguration) is stricter than logging a warning and continuing with a degraded/insecure configuration, but that strictness is exactly the point for security-relevant settings — a crashed deployment that never serves traffic is a far better failure mode than a running deployment silently serving with `DEBUG=True` in production.',
    commonMistakes: [
      'Storing `ALLOWED_ORIGINS` as a native Python list default without a `mode="before"` parser for the string-from-env case, causing it to work in tests (where you might construct `Settings` directly with a list) but break in real deployment (where it only ever arrives as a raw string).',
      'Using `pattern=...` on `environment` but then comparing against a differently-cased string elsewhere in the codebase (`"Production"` vs `"production"`), causing the cross-setting validator to silently never trigger.',
      'Putting `SECRET_KEY` in the codebase\'s `.env.example` with anything other than an obvious placeholder (like a real-looking but fake key), risking someone mistaking it for a usable value.',
    ],
    followUpQuestions: [
      'How would you support loading DIFFERENT `.env` files per environment (`.env.production`, `.env.staging`) with the same `Settings` class?',
      'How would you validate `DATABASE_URL` is actually reachable (not just syntactically valid) as part of application startup, and would that belong in this Settings class or elsewhere?',
      'How would secrets like `SECRET_KEY` be sourced in a real cloud deployment instead of a `.env` file (hint: AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault — injected as env vars at container start)?',
    ],
    relatedTopics: ['Pydantic Settings', 'BaseSettings', 'Environment Variables', 'CORS', 'Configuration Validation', 'Production Safety'],
  },
];

export const MOCK_PYTHON_MODULE11_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
