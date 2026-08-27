// Python + DSA Interview Handbook — Module 13: FastAPI Authentication &
// Security. Hand-authored technical questions covering authentication vs
// authorization, password hashing, JWT, OAuth2, RBAC and fine-grained
// permissions, refresh token rotation/revocation, CORS/CSRF, rate limiting
// and brute-force protection, and secure file uploads — with genuine
// FastAPI + passlib + PyJWT code and explicit attack/defense reasoning for
// every entry. Mirrors the MockTechnicalQuestion shape defined in
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
    id: 'python-m13-1',
    number: 'PY-M13-1',
    title: 'Authentication vs authorization, and why conflating them is a security bug',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Authentication vs Authorization',
    expectedAnswer:
      'Authentication answers "who are you?" (verifying an identity — login, token validation); authorization answers "what are you allowed to do?" (permission checks against an already-established identity). They are sequential and distinct: a request must be authenticated BEFORE it can be meaningfully authorized, but a successfully authenticated user can still be unauthorized for a specific action (e.g. a logged-in regular user hitting an admin-only endpoint).',
    deepExplanation:
      "The classic production bug this distinction prevents: an endpoint that only checks \"is there a valid token\" (authentication) and forgets to also check \"is THIS user allowed to do THIS specific thing\" (authorization) — commonly called a Broken Access Control vulnerability (OWASP API Security Top 10, #1 category for years running).\n\n```python\nfrom fastapi import APIRouter, Depends, HTTPException, status\n\nrouter = APIRouter()\n\n# authentication ONLY — verifies the token is valid and resolves a user\ndef get_current_user(token: str = Depends(...)) -> dict:\n    ...  # decode/verify JWT, look up user — see the JWT question for the full implementation\n\n# BUG: this endpoint only authenticates, never authorizes — ANY logged-in user\n# can delete ANY other user\\\n\nStep 1 — Understand the topic.\nTopic: Authentication vs authorization, and why conflating them is a security bug\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef authorized(user_id: int, resource_owner_id: int) -> bool:\n    return user_id == resource_owner_id\n\nprint(authorized(10, 10))\nprint(authorized(10, 11))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ncurrent_user = Depends(get_current_user)\nallowed = current_user.id == resource.owner_id\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Complexity / trade-off:\nAuthenticate identity first, then authorize the requested resource/action.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A well-known class of real-world breaches (e.g. several fintech/social-app incidents disclosed via bug bounty programs) has come from exactly the BROKEN pattern above: an endpoint like `GET /api/invoices/{id}` correctly required a valid auth token (authentication enforced) but never checked that the invoice belonged to the requesting user (authorization missing) — letting any authenticated user read any other user\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Authentication vs authorization, and why conflating them is a security bug**.",
    bestPractices: [
      'Treat authentication and authorization as two DISTINCT, sequential dependency/check layers — never assume "has a valid token" implies "is allowed to do this".',
      'For any endpoint operating on a specific resource by id, explicitly verify the authenticated user OWNS or is otherwise permitted to act on THAT specific resource id (object-level authorization), not just that they are logged in at all.',
      'Default to DENY: require an explicit permission/ownership check to pass, rather than allowing an action unless some check happens to fail.',
    ],
    tradeOffs:
      'Separating authentication (a reusable dependency) from authorization (often resource-specific, sometimes needing a DB lookup to check ownership) means authorization checks cannot always be fully generic/reusable across every endpoint — this extra per-endpoint verification work is unavoidable overhead, but skipping it is exactly how Broken Object Level Authorization vulnerabilities happen in production.',
    commonMistakes: [
      'Assuming a valid JWT/session automatically means the request is authorized for the specific action/resource being requested (Broken Object Level Authorization).',
      'Implementing authorization checks only on some endpoints (e.g. the UI-visible ones) while forgetting a "hidden" or newer endpoint that operates on the same resource type.',
      'Checking authorization based on data the CLIENT supplied (e.g. trusting a `role` field sent in the request body) instead of data derived server-side from the authenticated user\'s record.',
    ],
    followUpQuestions: [
      'How would you design a reusable dependency that handles resource-level ownership checks without duplicating the same `if` logic across every endpoint?',
      'What is Broken Object Level Authorization (BOLA), and why does OWASP rank it as the top API security risk?',
      'How would you test for missing authorization checks systematically across a large API surface?',
    ],
    relatedTopics: ['Authentication', 'Authorization', 'Broken Object Level Authorization', 'OWASP API Security', 'Access Control'],
  },
  {
    id: 'python-m13-2',
    number: 'PY-M13-2',
    title: 'Password hashing: why hashing not encryption, salting, bcrypt vs Argon2',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Password Security',
    expectedAnswer:
      'Passwords must be HASHED, never encrypted — encryption is reversible (you can decrypt back to plaintext given the key, meaning a compromised key or server exposes every password), while a cryptographic password hash is deliberately one-way and deliberately SLOW (bcrypt/Argon2/scrypt use a tunable work factor), making brute-forcing/cracking a leaked hash database computationally expensive even if the hash function itself is public knowledge. A per-password random SALT (built into bcrypt/Argon2 automatically) defeats precomputed rainbow-table attacks by ensuring two users with the identical password get completely different stored hashes.',
    deepExplanation:
      "```python\nfrom passlib.context import CryptContext\n\n# CryptContext handles the salt generation, work-factor encoding, and future\n# algorithm migration (deprecated=\"auto\" upgrades old hashes transparently on next login)\npwd_context = CryptContext(schemes=[\"bcrypt\"], deprecated=\"auto\")\n\ndef hash_password(plain_password: str) -> str:\n    return pwd_context.hash(plain_password)\n\ndef verify_password(plain_password: str, hashed_password: str) -> bool:\n    return pwd_context.verify(plain_password, hashed_password)\n\n# stored value looks like:\n# $2b$12$KIXQ2Z8N5f5vQ8n1Y6z3XeJ9Z1z3X8Q9J1z3X8Q9J1z3X8Q9J1z3X8\n#  ^schema ^cost  ^22-char salt + 31-char hash, ALL in one string — no separate salt column needed\n```\n\nWhy NEVER roll your own hashing with a fast general-purpose hash (`hashlib.sha256(password)`): SHA-256 is designed to be FAST (good for checksums, bad for passwords) — modern GPUs compute billions of SHA-256 hashes per second, making brute-forcing a leaked SHA-256(password) database of common passwords trivial. bcrypt/Argon2/scrypt are deliberately slow and MEMORY-HARD (Argon2 specifically resists GPU/ASIC parallelization by requiring large amounts of memory per hash attempt, not just CPU time), directly countering the exact hardware attackers use to crack leaked hash dumps at scale.\n\nArgon2 (winner of the 2015 Password Hashing Competition) is now generally preferred over bcrypt for NEW systems specifically for its memory-hardness; bcrypt remains extremely widely deployed, battle-tested, and entirely acceptable when its cost factor is tuned appropriately (typically cost 12+ as of the 2020s, re-tuned upward as hardware improves):\n\n```python\npwd_context = CryptContext(schemes=[\"argon2\"], deprecated=\"auto\")\n```\n\nThe MOST important operational property, easy to miss: the hashing WORK FACTOR (bcrypt cost, Argon2 memory/time params) must be periodically increased as hardware gets faster — a cost factor that was \"slow enough\" in 2015 is meaningfully weaker against 2026 hardware. `CryptContext(deprecated=\"auto\")` is specifically designed to solve this: it transparently re-hashes a user\\\n\nStep 1 — Understand the topic.\nTopic: Password hashing: why hashing not encryption, salting, bcrypt vs Argon2\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nfrom pwdlib import PasswordHash\n\npassword_hash = PasswordHash.recommended()\n\nhashed = password_hash.hash(\"secret\")\nprint(password_hash.verify(\"secret\", hashed))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nhashed = password_hash.hash(\"secret\")\nprint(password_hash.verify(\"secret\", hashed))\n```\n\nStep 5 — Example result:\n```text\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nPasswords are hashed with a slow password-hashing function; never decrypt or store plaintext passwords.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "Every major breach post-mortem involving \"we stored SHA-1/MD5(password)\" (e.g. several large historical breaches) resulted in the vast majority of leaked passwords being cracked within days using commodity GPU rigs, precisely because those hash functions are fast — whereas breaches of properly bcrypt/Argon2-hashed password databases force attackers into a far slower, far more expensive brute-force, buying the affected company and its users critical time to force password resets before most accounts are compromised.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Password hashing: why hashing not encryption, salting, bcrypt vs Argon2**.",
    bestPractices: [
      'Use a purpose-built password-hashing library (passlib\'s `CryptContext`, or the `argon2-cffi` package directly) — never a general-purpose fast hash (MD5, SHA-1, SHA-256) for passwords.',
      'Let the library manage salting automatically (bcrypt/Argon2 embed the salt in the stored hash string) — never implement your own salt generation/storage scheme.',
      'Periodically re-tune the work factor upward and use `deprecated="auto"` so existing users are transparently migrated to stronger settings on their next successful login, with no forced reset.',
    ],
    tradeOffs:
      'A higher bcrypt cost factor / Argon2 memory parameter makes brute-forcing exponentially harder but also makes EVERY legitimate login slower (bcrypt is deliberately CPU-expensive per call) — the right setting is the highest cost your login endpoint can absorb without noticeably degrading legitimate user experience or overloading the server under peak login traffic, re-evaluated periodically as hardware improves.',
    commonMistakes: [
      'Storing passwords with a reversible cipher ("encrypted" passwords) instead of a one-way hash, meaning a leaked encryption key exposes every password in plaintext.',
      'Using a fast general-purpose hash function (MD5, SHA-1, plain SHA-256) for passwords, making leaked hash databases trivially crackable with commodity GPU hardware.',
      'Implementing manual salt generation/storage in a separate database column instead of using a library that embeds the salt in the hash string, risking salt/hash mismatch bugs.',
    ],
    followUpQuestions: [
      'Why does a fast hash function like SHA-256 make a POOR choice for password storage, even though it is cryptographically secure for other purposes like data integrity checksums?',
      'How would you migrate an existing user base from an old, weak hashing scheme to a new one without forcing every user to reset their password immediately?',
      'What is a rainbow table attack, and specifically how does per-password salting defeat it?',
    ],
    relatedTopics: ['Password Hashing', 'bcrypt', 'Argon2', 'Salting', 'passlib', 'Rainbow Tables'],
  },
  {
    id: 'python-m13-3',
    number: 'PY-M13-3',
    title: 'JWT structure, claims, and the full login-to-validated-request flow',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'JWT',
    expectedAnswer:
      'A JWT (JSON Web Token) is three base64url-encoded segments joined by dots: `header.payload.signature` — the header declares the signing algorithm, the payload carries claims (arbitrary key/value data, with standard reserved claims like `sub` (subject/user id), `iss` (issuer), `aud` (audience), `exp` (expiration), `iat` (issued-at)), and the signature is a cryptographic MAC/signature over the first two segments using a server-held secret (HMAC, e.g. HS256) or private key (RSA/EC, e.g. RS256) — the signature is what makes the token TAMPER-EVIDENT: any change to the header or payload invalidates the signature.',
    deepExplanation:
      "Critical fact often misunderstood: a JWT\\\n\nStep 1 — Understand the topic.\nTopic: JWT structure, claims, and the full login-to-validated-request flow\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nimport jwt\n\npayload = {\n    \"sub\": \"42\",\n    \"role\": \"admin\",\n}\n\ntoken = jwt.encode(\n    payload,\n    \"secret\",\n    algorithm=\"HS256\",\n)\n\ndecoded = jwt.decode(\n    token,\n    \"secret\",\n    algorithms=[\"HS256\"],\n)\n\nprint(decoded[\"sub\"])\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ntoken = jwt.encode(\n    {\"sub\": \"42\"},\n    \"secret\",\n    algorithm=\"HS256\",\n)\nprint(jwt.decode(\n    token,\n    \"secret\",\n    algorithms=[\"HS256\"],\n))\n```\n\nStep 5 — Example result:\n```text\n42\n```\n\nStep 6 — Complexity / trade-off:\nPin allowed algorithms and validate issuer/audience/expiry according to the token contract.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production API gateway validates the JWT signature and `exp`/`aud`/`iss` claims at the EDGE (API gateway or a shared middleware layer) before a request ever reaches business-logic services, so every downstream service can trust `request.user` without re-implementing token validation — this is the standard \"stateless authentication at the edge\" pattern that lets a microservices architecture avoid a shared session store.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **JWT structure, claims, and the full login-to-validated-request flow**.",
    bestPractices: [
      'Always set and enforce a short `exp` on access tokens, and always pass `algorithms=[...]` explicitly to `jwt.decode` — never accept whatever algorithm the token header claims (see algorithm-confusion attacks).',
      'Validate `aud` (audience) and `iss` (issuer) claims, not just the signature, especially in systems where the same signing infrastructure issues tokens for multiple different services/audiences.',
      'Never put sensitive data (passwords, full card numbers, PII beyond what is operationally necessary) in the JWT payload — it is readable by anyone who has the token, not just the server.',
    ],
    tradeOffs:
      'JWTs give you stateless authentication (no server-side session store lookup needed to validate a request, which scales trivially across many service instances), at the cost of NOT being trivially revocable — once issued and signed, a JWT remains valid until it expires no matter what the server "wants" afterward, which is why short expirations plus a separate refresh-token/revocation mechanism (see the refresh-token question) exist to bound this weakness.',
    commonMistakes: [
      'Believing a JWT is encrypted/confidential because it is not human-readable at a glance — it is only base64-encoded and trivially decodable by anyone.',
      'Issuing long-lived access tokens (days/weeks) "for convenience", massively increasing the damage window if one is ever stolen.',
      'Forgetting to explicitly pass `algorithms=[...]` when decoding, leaving the door open to algorithm-confusion attacks (see the OAuth2 question).',
    ],
    followUpQuestions: [
      'Why can a JWT not be truly "revoked" the way a server-side session can, and what practical mitigations exist for that limitation?',
      'What is the difference between the `aud` and `iss` claims, and why validate both rather than just the signature?',
      'How would you handle clock skew between servers when validating the `exp`/`iat` claims of a JWT issued by a different server?',
    ],
    relatedTopics: ['JWT', 'PyJWT', 'Claims', 'Access Tokens', 'Stateless Authentication', 'HMAC'],
  },
  {
    id: 'python-m13-4',
    number: 'PY-M13-4',
    title: 'OAuth2 in FastAPI: OAuth2PasswordBearer, scopes, and algorithm-confusion pitfalls',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'OAuth2',
    expectedAnswer:
      'FastAPI\'s `OAuth2PasswordBearer`/`OAuth2PasswordRequestForm` implement the OAuth2 "Resource Owner Password Credentials" grant SHAPE (a `/token` endpoint accepting `username`/`password` form data, returning a bearer token) purely as a convention for extracting the `Authorization: Bearer <token>` header and documenting it correctly in Swagger UI — FastAPI itself does not implement full third-party OAuth2 (Authorization Code flow with an external identity provider like Google/GitHub); that requires a dedicated library (e.g. Authlib) or an external identity provider\'s SDK. Scopes are optional, space-separated permission strings embedded in the token/request that let a single token carry FINE-GRAINED, limited permissions (e.g. `read:orders` without `write:orders`) rather than all-or-nothing access.',
    deepExplanation:
      "```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes\nimport jwt\n\napp = FastAPI()\n\n# tokenUrl tells Swagger UI where to POST username/password to get a token —\n# purely metadata for the docs\\\n\nStep 1 — Understand the topic.\nTopic: OAuth2 in FastAPI: OAuth2PasswordBearer, scopes, and algorithm-confusion pitfalls\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "Auth0/Okta/AWS Cognito and similar identity providers issue RS256-signed tokens specifically so that many downstream resource servers can each hold only the PUBLIC key (fetched from a `/.well-known/jwks.json` endpoint) and independently verify tokens without ever possessing the provider\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **OAuth2 in FastAPI: OAuth2PasswordBearer, scopes, and algorithm-confusion pitfalls**.",
    bestPractices: [
      'Always pass an explicit `algorithms=[...]` allowlist to `jwt.decode()` — never trust or derive the verification algorithm from the token\'s own (attacker-controlled) header.',
      'Use OAuth2 scopes to grant tokens the MINIMUM permission set actually needed for their purpose (principle of least privilege), rather than one all-powerful token per user.',
      'For genuine third-party login ("Sign in with Google"), use a maintained library (Authlib) or the provider\'s official SDK rather than hand-rolling the OAuth2 Authorization Code flow.',
    ],
    tradeOffs:
      'FastAPI\'s built-in OAuth2 utilities give you correct Swagger UI integration and a standard shape for a first-party username/password login endpoint with minimal code, but deliberately do NOT implement the full OAuth2 spec (Authorization Code + PKCE, refresh grant negotiation, third-party consent screens) — reaching for a dedicated library is the right trade-off the moment you need actual third-party identity federation rather than your own first-party login.',
    commonMistakes: [
      'Decoding a JWT without pinning `algorithms=[...]`, opening the door to algorithm-confusion attacks against asymmetrically-signed tokens.',
      'Treating FastAPI\'s `OAuth2PasswordBearer` as a full OAuth2 implementation and attempting to build "Sign in with Google" directly on top of it without a proper Authorization Code flow library.',
      'Embedding overly broad scopes ("full_access") in every issued token instead of granting only the specific scopes a given client/flow actually needs.',
    ],
    followUpQuestions: [
      'Walk through exactly how an algorithm-confusion attack against an RS256-issuing server would work if the verifier does not pin `algorithms=[...]`.',
      'What is the difference between the OAuth2 Authorization Code flow (with PKCE) and the Resource Owner Password Credentials flow FastAPI\'s tutorial demonstrates, and why is the latter discouraged for third-party clients?',
      'How would you design scope checking so that a token missing a required scope returns 403 (not 401) — why does that distinction matter?',
    ],
    relatedTopics: ['OAuth2', 'OAuth2PasswordBearer', 'Scopes', 'Algorithm Confusion', 'JWT Security', 'Bearer Tokens'],
  },
  {
    id: 'python-m13-5',
    number: 'PY-M13-5',
    title: 'Role-Based Access Control (RBAC) with a dependency-based permission checker',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'RBAC & Permissions',
    expectedAnswer:
      'RBAC assigns each user one (or more) coarse-grained ROLE (ADMIN, MANAGER, USER, GUEST) and grants/denies access based on that role membership, implemented cleanly in FastAPI as a small factory function that returns a `Depends`-compatible dependency parameterized by the required role(s) — reusable across every endpoint that needs role gating without duplicating the check logic.',
    deepExplanation:
      "```python\nfrom enum import Enum\nfrom fastapi import Depends, FastAPI, HTTPException, status\n\nclass Role(str, Enum):\n    ADMIN = \"admin\"\n    MANAGER = \"manager\"\n    USER = \"user\"\n    GUEST = \"guest\"\n\nROLE_RANK = {Role.GUEST: 0, Role.USER: 1, Role.MANAGER: 2, Role.ADMIN: 3}   # for \"at least this role\" checks\n\ndef require_role(minimum_role: Role):\n    \"\"\"Dependency FACTORY — returns a Depends-compatible callable closed over `minimum_role`.\"\"\"\n    async def checker(current_user: dict = Depends(get_current_user)) -> dict:\n        user_role = Role(current_user[\"role\"])\n        if ROLE_RANK[user_role] < ROLE_RANK[minimum_role]:\n            raise HTTPException(\n                status.HTTP_403_FORBIDDEN,\n                detail=f\"Requires at least \\\n\nStep 1 — Understand the topic.\nTopic: Role-Based Access Control (RBAC) with a dependency-based permission checker\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef can_manage(role: str) -> bool:\n    return role in {\"admin\", \"manager\"}\n\nprint(can_manage(\"admin\"))\nprint(can_manage(\"user\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nallowed = role in {\n    \"admin\",\n    \"manager\",\n}\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Complexity / trade-off:\nAuthorization should be deny-by-default and enforced server-side.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A B2B SaaS admin panel typically layers exactly this pattern: `require_role(Role.ADMIN)` gates billing/user-management endpoints, `require_role(Role.MANAGER)` gates team-level reporting endpoints accessible to both managers and admins, and plain `Depends(get_current_user)` (no role requirement) gates endpoints any authenticated user can reach — the SAME dependency factory pattern scales to dozens of endpoints without duplicated authorization logic.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Role-Based Access Control (RBAC) with a dependency-based permission checker**.",
    bestPractices: [
      'Implement role checks as a reusable dependency FACTORY parameterized by the required role, not as copy-pasted `if` blocks inside every endpoint.',
      'Store the authoritative role on the SERVER side (database record, or a claim inside a server-signed JWT) — never trust a role value the client claims in a request body/header.',
      'Use a numeric rank for genuinely hierarchical roles (ADMIN > MANAGER > USER), but switch to fine-grained permissions (next question) the moment roles stop being cleanly nested.',
    ],
    tradeOffs:
      'RBAC is simple to reason about and fast to implement for a small, stable set of hierarchical roles, but becomes awkward once real requirements need overlapping, non-hierarchical permission sets (e.g. "can approve expenses but cannot manage users" — not a clean superset/subset of any single role) — that is precisely when fine-grained resource:action permissions (next question) become the better model, at the cost of more setup complexity.',
    commonMistakes: [
      'Trusting a `role` field sent by the CLIENT in the request body/header instead of resolving it server-side from the authenticated user\'s stored record.',
      'Checking `user_role == required_role` (exact match) when the actual requirement is "at least this privilege level", incorrectly locking ADMIN users out of MANAGER-level endpoints.',
      'Duplicating near-identical role-check `if` blocks across many endpoints instead of factoring the logic into one reusable dependency factory.',
    ],
    followUpQuestions: [
      'How would you support a user having MULTIPLE roles simultaneously, rather than exactly one?',
      'When does a hierarchical RBAC model (ADMIN > MANAGER > USER) stop being sufficient, and what replaces it?',
      'How would you unit-test the `require_role` dependency in isolation without spinning up a full authenticated request?',
    ],
    relatedTopics: ['RBAC', 'Roles', 'Dependency Factory', 'Authorization', 'FastAPI Dependencies'],
  },
  {
    id: 'python-m13-6',
    number: 'PY-M13-6',
    title: 'Fine-grained permissions (resource:action) vs coarse roles',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'RBAC & Permissions',
    expectedAnswer:
      'Fine-grained permissions model access as explicit `resource:action` strings (`users:read`, `users:create`, `products:delete`) assigned to roles (or directly to users), rather than baking a fixed hierarchy of what each role can do directly into application code — this decouples "what can this role do" (data, changeable without a deploy) from "does this specific action require this specific permission" (a stable check in code), and cleanly supports non-hierarchical, overlapping permission sets that plain RBAC cannot express well.',
    deepExplanation:
      "```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\n\n# permission assignment would typically live in a database table (role_permissions),\n# modeled here as a plain dict for clarity\nROLE_PERMISSIONS: dict[str, set[str]] = {\n    \"admin\": {\"users:read\", \"users:create\", \"users:update\", \"users:delete\", \"products:read\", \"products:create\"},\n    \"support_agent\": {\"users:read\", \"products:read\"},           # can VIEW but never modify — a set RBAC alone models awkwardly\n    \"inventory_manager\": {\"products:read\", \"products:create\"},  # can manage products but has NO user-management access at all\n}\n\ndef require_permission(permission: str):\n    async def checker(current_user: dict = Depends(get_current_user)) -> dict:\n        granted = ROLE_PERMISSIONS.get(current_user[\"role\"], set())\n        if permission not in granted:\n            raise HTTPException(\n                status.HTTP_403_FORBIDDEN,\n                detail=f\"Missing required permission: {permission}\",\n            )\n        return current_user\n    return checker\n\napp = FastAPI()\n\n@app.delete(\"/users/{user_id}\", dependencies=[Depends(require_permission(\"users:delete\"))])\nasync def delete_user(user_id: int):\n    ...\n\n@app.post(\"/products\", dependencies=[Depends(require_permission(\"products:create\"))])\nasync def create_product(payload: dict):\n    ...\n```\n\nWhy `support_agent` and `inventory_manager` above CANNOT be expressed cleanly as points on a single ADMIN > MANAGER > USER hierarchy: `support_agent` needs READ on two unrelated resource types but WRITE on neither; `inventory_manager` needs READ+CREATE on products but NOTHING on users — neither is a strict subset/superset of the other, which is exactly the shape of real-world organizational permission requirements that plain hierarchical RBAC (previous question) cannot represent without either over-granting access or exploding into dozens of ad hoc role names.\n\nThe production-grade version of `ROLE_PERMISSIONS` lives in a database (a `role_permissions` many-to-many table), letting an admin UI grant/revoke specific permissions to a role WITHOUT a code deploy — this is the real operational advantage fine-grained permissions have over hardcoded role hierarchies: permission changes become a data change, not a code change.\n\nStep 1 — Understand the topic.\nTopic: Fine-grained permissions (resource:action) vs coarse roles\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef can_manage(role: str) -> bool:\n    return role in {\"admin\", \"manager\"}\n\nprint(can_manage(\"admin\"))\nprint(can_manage(\"user\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nallowed = role in {\n    \"admin\",\n    \"manager\",\n}\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Complexity / trade-off:\nAuthorization should be deny-by-default and enforced server-side.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "AWS IAM is the canonical large-scale example of exactly this model: policies are lists of `service:action` strings (`s3:GetObject`, `ec2:TerminateInstances`) attached to roles/users, letting an organization compose precise, auditable, non-hierarchical permission sets (e.g. \"can read S3 but never terminate EC2 instances\") that a fixed role hierarchy could never express cleanly at that scale.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Fine-grained permissions (resource:action) vs coarse roles**.",
    bestPractices: [
      'Store role-to-permission assignments as DATA (a database table), not hardcoded in application logic, so granting/revoking a permission is an admin-UI action, not a deploy.',
      'Name permissions consistently as `resource:action` so they read predictably and can be audited/listed systematically (e.g. "list every permission touching the users resource").',
      'Reach for fine-grained permissions specifically when you observe roles that are NOT clean subsets/supersets of each other — do not over-engineer permission granularity for a genuinely simple, hierarchical access model.',
    ],
    tradeOffs:
      'Fine-grained permissions model real-world non-hierarchical access needs precisely and support runtime (no-deploy) permission changes, at the cost of more moving parts (a permissions table/cache, more complex admin tooling to manage assignments) compared to a hardcoded role hierarchy — small applications with genuinely simple, nested roles should not pay this complexity cost.',
    commonMistakes: [
      'Building an ever-growing list of narrowly-scoped role NAMES ("support_agent_readonly_v2") to work around a hierarchy that cannot express real permission combinations, instead of switching to fine-grained permissions.',
      'Hardcoding permission-to-role mappings directly in application code, requiring a full deploy for every permission change an admin should reasonably be able to make themselves.',
      'Checking permissions with inconsistent naming (`can_delete_users` in one place, `users.delete` in another), making the permission set impossible to audit systematically.',
    ],
    followUpQuestions: [
      'How would you cache role-to-permission lookups to avoid a database query on every single authorized request, while still reflecting permission changes reasonably promptly?',
      'How would you support permission assignment directly to individual USERS (an override), not just to their role?',
      'At what point does a fine-grained permission system need a proper policy engine (e.g. an ABAC/OPA-style system) instead of a flat permission-string set?',
    ],
    relatedTopics: ['Fine-Grained Permissions', 'RBAC', 'Authorization', 'AWS IAM', 'Access Control Models'],
  },
  {
    id: 'python-m13-7',
    number: 'PY-M13-7',
    title: 'Refresh token rotation, storage, and revocation',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'JWT',
    expectedAnswer:
      'Access tokens are kept short-lived (minutes) to limit theft exposure; a longer-lived REFRESH token (hours/days/weeks) is used solely to obtain new access tokens without forcing the user to re-enter credentials repeatedly. Refresh token ROTATION means every use of a refresh token issues a brand-new refresh token AND immediately invalidates the old one — this turns refresh-token theft into a DETECTABLE event: if a stolen refresh token is ever used by an attacker, the legitimate user\'s NEXT attempt to use their (now-invalidated) original refresh token fails, signaling compromise and allowing the whole token family to be revoked.',
    deepExplanation:
      "```python\nimport secrets\nfrom datetime import datetime, timedelta, timezone\n\n# refresh tokens are opaque random strings (NOT JWTs) stored server-side, since\n# they need to be revocable/rotatable — a stateless JWT cannot be \"invalidated\" early\nclass RefreshTokenStore:\n    def __init__(self):\n        self._tokens: dict[str, dict] = {}   # token -> {user_id, family_id, expires_at, used}\n\n    def issue(self, user_id: int, family_id: str | None = None) -> str:\n        token = secrets.token_urlsafe(32)\n        self._tokens[token] = {\n            \"user_id\": user_id,\n            \"family_id\": family_id or secrets.token_urlsafe(8),   # groups all rotations of one login session\n            \"expires_at\": datetime.now(timezone.utc) + timedelta(days=30),\n            \"used\": False,\n        }\n        return token\n\n    def rotate(self, old_token: str) -> str:\n        record = self._tokens.get(old_token)\n        if record is None or record[\"used\"] or record[\"expires_at\"] < datetime.now(timezone.utc):\n            raise ValueError(\"invalid or reused refresh token\")\n        if record[\"used\"]:\n            # REUSE DETECTED: this token was already rotated once before — someone is\n            # replaying an old, stolen token. Revoke the ENTIRE family immediately.\n            self.revoke_family(record[\"family_id\"])\n            raise ValueError(\"refresh token reuse detected — session revoked\")\n        record[\"used\"] = True   # this exact token can now never be used again\n        return self.issue(record[\"user_id\"], family_id=record[\"family_id\"])\n\n    def revoke_family(self, family_id: str) -> None:\n        for record in self._tokens.values():\n            if record[\"family_id\"] == family_id:\n                record[\"used\"] = True\n```\n\n```python\nfrom fastapi import APIRouter, HTTPException, status\n\nrouter = APIRouter()\nstore = RefreshTokenStore()\n\n@router.post(\"/refresh\")\nasync def refresh_access_token(refresh_token: str):\n    try:\n        new_refresh_token = store.rotate(refresh_token)\n    except ValueError as exc:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=str(exc))\n    record = store._tokens[new_refresh_token]\n    new_access_token = create_access_token(record[\"user_id\"])\n    return {\"access_token\": new_access_token, \"refresh_token\": new_refresh_token, \"token_type\": \"bearer\"}\n```\n\nWhy the \"used\" flag plus family revocation is the critical defense (not just rotation alone): if an attacker steals a refresh token and uses it BEFORE the legitimate user does, the attacker gets a valid new token — but the legitimate user\\\n\nStep 1 — Understand the topic.\nTopic: Refresh token rotation, storage, and revocation\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef rotate(current: str, presented: str, replacement: str):\n    if current != presented:\n        raise ValueError(\"invalid refresh token\")\n    return replacement\n\nprint(rotate(\n    \"old\",\n    \"old\",\n    \"new\",\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nnew_refresh = issue_refresh_token()\nrevoke(old_refresh)\nstore(new_refresh)\n```\n\nStep 5 — Example result:\n```text\nnew\n```\n\nStep 6 — Complexity / trade-off:\nRotation reduces replay risk; revoke old tokens and protect storage.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact rotation-with-reuse-detection pattern is the industry-standard approach (documented explicitly in the OAuth 2.0 Security Best Current Practice RFC) used by major identity providers (Auth0, Okta, Google) for their refresh token implementations — reuse detection is specifically what elevates refresh tokens from \"long-lived bearer secret, single point of failure if stolen\" to \"self-healing, detectable-compromise credential\".\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Refresh token rotation, storage, and revocation**.",
    bestPractices: [
      'Rotate the refresh token on every use, and track a "family" of related rotations so a stolen-and-reused token can trigger revoking the whole session chain, not just itself.',
      'Store refresh tokens server-side (opaque random strings in a database/Redis, not JWTs) specifically because they must be revocable — never make a refresh token itself a long-lived stateless JWT.',
      'Bind refresh tokens to storage the client cannot easily exfiltrate via XSS (an httpOnly, Secure, SameSite cookie) rather than JavaScript-accessible storage — see the CORS/CSRF question for the full reasoning.',
    ],
    tradeOffs:
      'Refresh token rotation with reuse detection adds real implementation complexity (a token family model, a revocation store, careful handling of legitimate concurrent-request races where two tabs might race to refresh simultaneously) compared to a single static long-lived refresh token — but a static refresh token, once stolen, remains valid and undetectable for its ENTIRE lifetime, which is an unacceptable risk for any system handling sensitive data.',
    commonMistakes: [
      'Using a single, non-rotating, long-lived refresh token with no reuse detection — a stolen token then grants indefinite access with zero signal to the legitimate user or system.',
      'Storing refresh tokens as JWTs (stateless) instead of opaque server-tracked tokens, making them fundamentally impossible to revoke early.',
      'Not handling the legitimate race condition where a client with multiple tabs/requests might attempt to refresh the SAME token concurrently, incorrectly flagging a real user as a token-reuse attacker.',
    ],
    followUpQuestions: [
      'How would you handle the legitimate race condition of two concurrent requests both trying to rotate the same refresh token, without falsely triggering reuse-detection revocation?',
      'Why is it important that access tokens are NOT individually revocable, and how does keeping them short-lived compensate for that?',
      'How would you implement a "log out of all devices" feature using this token-family model?',
    ],
    relatedTopics: ['Refresh Tokens', 'Token Rotation', 'Revocation', 'JWT', 'Session Security'],
  },
  {
    id: 'python-m13-8',
    number: 'PY-M13-8',
    title: 'CORS, CSRF, and how bearer-header vs cookie-based auth changes your exposure',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'API Security',
    expectedAnswer:
      'CORS (Cross-Origin Resource Sharing) is a BROWSER-enforced relaxation of the same-origin policy: a server opts in to letting specific other origins read its responses via JavaScript `fetch`/`XHR`, using `Access-Control-Allow-Origin` and related headers — it protects the CLIENT/browser from a malicious page reading another site\'s authenticated responses. CSRF (Cross-Site Request Forgery) is a different attack: a malicious page tricks a victim\'s browser into SENDING a state-changing request (the browser auto-attaches cookies) to a site the victim is already authenticated to, WITHOUT the attacker ever reading the response — CORS does not prevent CSRF because CORS only gates whether JavaScript can READ the response, not whether the browser SENDS the request. Critically: storing an auth token in an httpOnly cookie (auto-sent by the browser) reintroduces CSRF exposure that a JS-attached `Authorization: Bearer` header (which a cross-site page cannot forge, since it cannot read/set that header on a request to another origin) does not have.',
    deepExplanation:
      "```python\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"https://app.example.com\"],   # explicit allowlist — never \"*\" if allow_credentials=True\n    allow_credentials=True,                        # required for cookies to be sent cross-origin at all\n    allow_methods=[\"GET\", \"POST\", \"PUT\", \"PATCH\", \"DELETE\"],\n    allow_headers=[\"Authorization\", \"Content-Type\"],\n)\n```\n\nWhy `allow_origins=[\"*\"]` combined with `allow_credentials=True` is REJECTED by browsers (and should never be attempted): the wildcard would mean \"any website in the world may make credentialed requests to my API and read the response\", which defeats the entire purpose of CORS as a protective boundary — browsers refuse this combination outright as a spec-level safety rail.\n\nThe two auth-transport models and their differing CSRF exposure:\n\n```text\nModel 1: Authorization: Bearer <token> header, token stored in JS memory/localStorage\n  - CSRF: NOT vulnerable — a malicious cross-site page has no way to attach a custom\n    Authorization header to a request it forges (browsers do not auto-attach it, unlike cookies)\n  - XSS: MORE exposed — any successful XSS on your own site can read localStorage/JS-memory tokens directly\n\nModel 2: token in an httpOnly, Secure, SameSite cookie, auto-sent by the browser\n  - CSRF: VULNERABLE unless mitigated — the browser auto-attaches the cookie to ANY request to\n    your domain, including ones forged by a malicious page, unless SameSite and/or a CSRF token defend it\n  - XSS: LESS exposed — httpOnly means client-side JavaScript (including injected XSS payloads)\n    cannot read the cookie value at all\n```\n\nThe standard, layered mitigation for cookie-based auth (Model 2) is `SameSite=Strict` or `SameSite=Lax` on the auth cookie (modern browsers block or restrict cross-site cookie attachment by default with this set) PLUS a separate CSRF token pattern (a random token embedded in the page, sent back in a custom header on state-changing requests, verified server-side — since a cross-site attacker\\\n\nStep 1 — Understand the topic.\nTopic: CORS, CSRF, and how bearer-header vs cookie-based auth changes your exposure\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef same_origin(request_origin: str, allowed: set[str]) -> bool:\n    return request_origin in allowed\n\nprint(same_origin(\n    \"https://app.example.com\",\n    {\"https://app.example.com\"},\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"https://app.example.com\"],\n    allow_credentials=True,\n)\n```\n\nStep 5 — Example result:\n```text\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nBearer headers and cookies have different browser attack surfaces; configure CORS/CSRF for the chosen auth transport.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A production SPA architecture commonly picks Model 1 (bearer header, token in memory, refreshed via a short-lived in-memory access token + an httpOnly refresh-token cookie used ONLY against a dedicated `/refresh` endpoint) specifically to get CSRF-by-default immunity on every regular API call while still gaining httpOnly protection for the more sensitive, long-lived refresh credential — a deliberate hybrid designed to minimize both XSS and CSRF blast radius simultaneously.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **CORS, CSRF, and how bearer-header vs cookie-based auth changes your exposure**.",
    bestPractices: [
      'Never combine `allow_origins=["*"]` with `allow_credentials=True` — always use an explicit origin allowlist when credentials (cookies/auth headers) are involved.',
      'If using cookie-based auth, set `SameSite=Lax` or `Strict` and implement a CSRF token (double-submit cookie or synchronizer token pattern) for state-changing requests — do not rely on SameSite alone as the only defense.',
      'If using bearer-header auth to sidestep CSRF, invest correspondingly harder in XSS defense (Content-Security-Policy, output encoding, dependency auditing) since a token in JS-accessible storage is fully exposed to any successful XSS.',
    ],
    tradeOffs:
      'Bearer-header auth trades CSRF immunity for greater XSS exposure (token readable by any injected script); httpOnly-cookie auth trades XSS-read immunity for CSRF exposure that must be separately mitigated (SameSite + CSRF tokens) — there is no single transport that is immune to both, so the choice should be driven by which threat is more realistically mitigated elsewhere in your specific application\'s defenses.',
    commonMistakes: [
      'Believing CORS prevents CSRF — CORS only governs whether a cross-origin script can READ a response, not whether the browser SENDS a forged request with auto-attached cookies in the first place.',
      'Setting `allow_origins=["*"]` on a credentialed API "to make it work," unintentionally opening every authenticated endpoint to any website on the internet.',
      'Relying on `SameSite=Lax/Strict` alone as complete CSRF protection without understanding it does not cover every request type (e.g. some legacy/edge-case browser behaviors, top-level GET navigations) a synchronizer/double-submit token still meaningfully hardens against.',
    ],
    followUpQuestions: [
      'Why does CORS not protect against CSRF, even though both are "cross-origin" security topics?',
      'Walk through exactly how the double-submit CSRF token pattern defeats a forged cross-site request, step by step.',
      'How would you design token storage to minimize BOTH XSS and CSRF exposure simultaneously, as in the hybrid production example?',
    ],
    relatedTopics: ['CORS', 'CSRF', 'XSS', 'SameSite Cookies', 'Same-Origin Policy', 'Bearer Tokens'],
  },
  {
    id: 'python-m13-9',
    number: 'PY-M13-9',
    title: 'Rate limiting and brute-force protection on authentication endpoints',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'API Security',
    expectedAnswer:
      'Login endpoints are a prime brute-force/credential-stuffing target specifically because a successful guess yields full account access — production defenses layer PER-IP and PER-ACCOUNT rate limiting (e.g. via a Redis-backed sliding window or token bucket), exponential backoff on repeated failures, and temporary account lockout after N consecutive failures, always paired with a response that does NOT reveal whether the failure was due to a wrong username or wrong password (to prevent username enumeration).',
    deepExplanation:
      "```python\nimport time\nfrom fastapi import APIRouter, HTTPException, Request, status\n\nrouter = APIRouter()\n_failed_attempts: dict[str, list[float]] = {}   # key -> list of failure timestamps (Redis in production)\nMAX_ATTEMPTS = 5\nWINDOW_SECONDS = 300   # 5 minutes\n\ndef _is_locked_out(key: str) -> bool:\n    now = time.time()\n    attempts = [t for t in _failed_attempts.get(key, []) if now - t < WINDOW_SECONDS]\n    _failed_attempts[key] = attempts\n    return len(attempts) >= MAX_ATTEMPTS\n\ndef _record_failure(key: str) -> None:\n    _failed_attempts.setdefault(key, []).append(time.time())\n\n@router.post(\"/login\")\nasync def login(request: Request, email: str, password: str):\n    client_ip = request.client.host\n    # rate-limit on BOTH dimensions: per-IP (stop a single attacker hammering many accounts)\n    # and per-account (stop distributed/botnet attacks targeting ONE specific account)\n    if _is_locked_out(f\"ip:{client_ip}\") or _is_locked_out(f\"account:{email}\"):\n        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, detail=\"Too many attempts, try again later\")\n\n    user = get_user_by_email(email)\n    # CONSTANT-TIME comparison / always run verify_password even for a nonexistent user, to avoid\n    # a timing side-channel revealing whether the EMAIL exists based on response latency alone\n    valid = verify_password(password, user.hashed_password) if user else verify_password(password, _DUMMY_HASH)\n    if not user or not valid:\n        _record_failure(f\"ip:{client_ip}\")\n        _record_failure(f\"account:{email}\")\n        # deliberately IDENTICAL error for \"no such user\" and \"wrong password\" — prevents\n        # an attacker from using the login endpoint to enumerate which emails are registered\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=\"Incorrect email or password\")\n\n    return {\"access_token\": create_access_token(user.id), \"token_type\": \"bearer\"}\n```\n\nTwo subtle defenses worth calling out explicitly (both are common interview follow-ups): (1) the IDENTICAL error message/status for \"email not found\" and \"email found but wrong password\" — returning a distinct message for each turns the login endpoint into a username-enumeration oracle an attacker can use to build a target list before a real credential-stuffing run; (2) running `verify_password` against a DUMMY precomputed hash even when the user does not exist at all — bcrypt/Argon2 verification takes a roughly constant, deliberately slow amount of time, so skipping it entirely for nonexistent users would make the endpoint respond MEASURABLY faster for \"no such user\" than for \"wrong password\", again leaking which emails are registered via a timing side channel.\n\nIn production, this counter/window state lives in Redis (`INCR` + `EXPIRE`, or a sliding-window log) rather than in-process memory, both because in-process state does not survive a restart/is not shared across multiple app instances, and because Redis-backed atomic increments avoid race conditions under concurrent requests that a naive in-process dict would have.\n\nStep 1 — Understand the topic.\nTopic: Rate limiting and brute-force protection on authentication endpoints\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef allow(attempts: int, limit: int = 5) -> bool:\n    return attempts < limit\n\nprint(allow(4))\nprint(allow(5))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nallowed = attempts < 5\nprint(allowed)\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Complexity / trade-off:\nUse bounded attempts, progressive delays, IP/user/device signals, and distributed state for multi-instance APIs.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "Most major consumer platforms (banking apps, large SaaS logins) implement exactly this layered defense — per-IP AND per-account limiting, identical error messaging, progressively increasing lockout duration on repeated failures, and often an additional CAPTCHA challenge triggered after a smaller threshold of failures than the hard lockout — specifically because credential-stuffing attacks (replaying leaked username/password pairs from OTHER breaches against your login endpoint) are one of the most common real-world account-takeover vectors, not exotic hypotheticals.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Rate limiting and brute-force protection on authentication endpoints**.",
    bestPractices: [
      'Rate-limit login attempts on BOTH the requesting IP and the target account/email — either alone misses a class of attack (distributed botnet vs single-account credential stuffing).',
      'Return an IDENTICAL error message and roughly identical response TIMING for "no such user" and "wrong password", to avoid turning the login endpoint into a username-enumeration or timing oracle.',
      'Back rate-limit counters with a shared store (Redis) in any multi-instance deployment — in-process counters are invisible to, and trivially bypassed by, requests hitting a different app instance.',
    ],
    tradeOffs:
      'Aggressive lockout thresholds meaningfully slow down brute-force/credential-stuffing attacks but can be weaponized as a DENIAL-OF-SERVICE vector against a specific legitimate user (an attacker deliberately fails login for a known email repeatedly to lock the real owner out) — mitigations like CAPTCHA-before-hard-lockout and notifying the account owner of repeated failures balance security against this self-inflicted availability risk.',
    commonMistakes: [
      'Returning distinct error messages ("no account with that email" vs "incorrect password"), turning the login endpoint into a trivial username-enumeration tool.',
      'Skipping password verification entirely (and thus responding faster) when the looked-up user does not exist, leaking account existence via a response-time side channel.',
      'Implementing rate-limit counters as in-process application state in a horizontally-scaled deployment, where each instance has its own blind, easily-bypassed counter.',
    ],
    followUpQuestions: [
      'Why does an identical response TIME matter in addition to an identical error MESSAGE for preventing user enumeration?',
      'How would you design lockout so it defends against brute force without becoming a denial-of-service vector against a legitimate targeted user?',
      'How would you extend this design to detect and respond to a distributed credential-stuffing attack spread across thousands of different IPs, where per-IP limiting alone is ineffective?',
    ],
    relatedTopics: ['Rate Limiting', 'Brute-Force Protection', 'Account Lockout', 'Timing Attacks', 'Credential Stuffing', 'Redis'],
  },
  {
    id: 'python-m13-10',
    number: 'PY-M13-10',
    title: 'Coding: register + login endpoints with password hashing and JWT issuance',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A complete, correctly-layered register/login pair: `POST /register` hashes the incoming password before ever persisting it and rejects duplicate emails with 409 (not a raw 500 from a DB constraint violation); `POST /login` verifies credentials against the stored hash, returns an identical error for both "no such user" and "wrong password", and issues a signed JWT access token on success — never returning the password hash (or anything password-related) in any response body.',
    deepExplanation:
      "```python\nfrom fastapi import APIRouter, HTTPException, status\nfrom pydantic import BaseModel, EmailStr, Field\nfrom passlib.context import CryptContext\nimport jwt\nfrom datetime import datetime, timedelta, timezone\n\nrouter = APIRouter(prefix=\"/auth\", tags=[\"Auth\"])\npwd_context = CryptContext(schemes=[\"bcrypt\"], deprecated=\"auto\")\nSECRET_KEY = \"loaded-from-env-never-hardcoded\"\n_users_by_email: dict[str, dict] = {}   # in-memory store for the exercise\n\nclass UserRegister(BaseModel):\n    email: EmailStr\n    password: str = Field(..., min_length=8)\n\nclass UserPublic(BaseModel):\n    id: int\n    email: EmailStr\n    # deliberately NO password/hashed_password field — this IS the request/response\n    # separation discussed in Module 11: never let a stored hash leak into a response schema\n\nclass TokenResponse(BaseModel):\n    access_token: str\n    token_type: str = \"bearer\"\n\n@router.post(\"/register\", response_model=UserPublic, status_code=status.HTTP_201_CREATED)\nasync def register(payload: UserRegister):\n    if payload.email in _users_by_email:\n        raise HTTPException(status.HTTP_409_CONFLICT, detail=\"Email already registered\")\n    user = {\n        \"id\": len(_users_by_email) + 1,\n        \"email\": payload.email,\n        \"hashed_password\": pwd_context.hash(payload.password),\n    }\n    _users_by_email[payload.email] = user\n    return user   # response_model=UserPublic strips hashed_password automatically before serialization\n\nclass UserLogin(BaseModel):\n    email: EmailStr\n    password: str\n\n@router.post(\"/login\", response_model=TokenResponse)\nasync def login(payload: UserLogin):\n    user = _users_by_email.get(payload.email)\n    valid = pwd_context.verify(payload.password, user[\"hashed_password\"]) if user else False\n    if not user or not valid:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=\"Incorrect email or password\")\n    now = datetime.now(timezone.utc)\n    token = jwt.encode(\n        {\"sub\": str(user[\"id\"]), \"exp\": now + timedelta(minutes=15), \"iat\": now},\n        SECRET_KEY,\n        algorithm=\"HS256\",\n    )\n    return TokenResponse(access_token=token)\n```\n\nAPI example:\n\n```text\nPOST /auth/register\nBody: {\"email\": \"ada@example.com\", \"password\": \"correct-horse-battery\"}\n-> 201 {\"id\": 1, \"email\": \"ada@example.com\"}\n\nPOST /auth/register  (same email again)\n-> 409 {\"detail\": \"Email already registered\"}\n\nPOST /auth/login\nBody: {\"email\": \"ada@example.com\", \"password\": \"correct-horse-battery\"}\n-> 200 {\"access_token\": \"eyJhbGciOi...\", \"token_type\": \"bearer\"}\n\nPOST /auth/login\nBody: {\"email\": \"ada@example.com\", \"password\": \"wrong\"}\n-> 401 {\"detail\": \"Incorrect email or password\"}\n```\n\nStep 1 — Understand the topic.\nTopic: Coding: register + login endpoints with password hashing and JWT issuance\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nfrom pwdlib import PasswordHash\n\npassword_hash = PasswordHash.recommended()\n\nhashed = password_hash.hash(\"secret\")\nprint(password_hash.verify(\"secret\", hashed))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nhashed = password_hash.hash(\"secret\")\nprint(password_hash.verify(\"secret\", hashed))\n```\n\nStep 5 — Example result:\n```text\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nPasswords are hashed with a slow password-hashing function; never decrypt or store plaintext passwords.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact register/login shape, with `response_model=UserPublic` guaranteeing the hashed password can never accidentally leak into a response even if a future refactor adds a field to the internal user dict, is the standard first-party auth pattern used before any OAuth2/SSO integration is layered on top — many production systems start here and add SSO later without changing this core contract.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: register + login endpoints with password hashing and JWT issuance**.",
    bestPractices: [
      'Always define a separate response schema (`UserPublic`) with `response_model` that structurally excludes the hashed password, rather than trusting yourself to remember to strip it manually in every endpoint.',
      'Hash the password INSIDE the registration handler, immediately, before any database write — never pass a plaintext password further than the hashing call.',
      'Return 409 (not 500) for a duplicate-email registration attempt, checked explicitly rather than letting a database unique-constraint error surface as an unhandled exception.',
    ],
    tradeOffs:
      'Enforcing `min_length=8` and similar password-strength rules via Pydantic `Field` constraints is simple and centralizes the policy, but a REAL production password policy typically also checks against breached-password lists (e.g. via the k-anonymity Have I Been Pwned API) and blocklists — that additional check does not fit cleanly into a declarative Pydantic field constraint and needs a custom validator making an external call, a meaningfully heavier dependency worth weighing against the marginal security gain for a given product\'s risk profile.',
    commonMistakes: [
      'Returning the full internal user object (including `hashed_password`) from the register endpoint instead of an explicit response schema that structurally excludes it.',
      'Letting a duplicate-email registration attempt surface as an unhandled database exception (500) instead of an explicit, checked 409 Conflict.',
      'Storing or logging the plaintext password anywhere (application logs, error-tracking breadcrumbs) even momentarily before hashing.',
    ],
    followUpQuestions: [
      'How would you add email verification (a "confirm your email" step) to this registration flow without allowing full login before confirmation?',
      'How would you extend the password field validation to check against a breached-password list?',
      'Why is checking `if not user or not valid` (rather than short-circuiting earlier when `user` is None) written this way, and what security property does it preserve?',
    ],
    relatedTopics: ['Registration', 'Login', 'Password Hashing', 'JWT', 'response_model', 'FastAPI Coding'],
  },
  {
    id: 'python-m13-11',
    number: 'PY-M13-11',
    title: 'Coding: get_current_user dependency with correct 401 handling for invalid/expired tokens',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A `get_current_user` dependency extracts the bearer token via `OAuth2PasswordBearer`, decodes/verifies it with an explicit `algorithms=[...]` allowlist, and distinguishes an EXPIRED token from an otherwise INVALID one only for logging/observability purposes — both must return the same 401 status to the client (with a `WWW-Authenticate: Bearer` header per the HTTP spec) so the API never leaks WHY a token was rejected in a way that could aid an attacker.',
    deepExplanation:
      "```python\nfrom fastapi import Depends, FastAPI, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\nimport jwt\n\napp = FastAPI()\noauth2_scheme = OAuth2PasswordBearer(tokenUrl=\"auth/login\")\nSECRET_KEY = \"loaded-from-env-never-hardcoded\"\n\n_credentials_exception = HTTPException(\n    status_code=status.HTTP_401_UNAUTHORIZED,\n    detail=\"Could not validate credentials\",\n    headers={\"WWW-Authenticate\": \"Bearer\"},   # per RFC 7235 — tells the client HOW to authenticate\n)\n\nasync def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:\n    try:\n        payload = jwt.decode(token, SECRET_KEY, algorithms=[\"HS256\"])\n    except jwt.ExpiredSignatureError:\n        raise _credentials_exception            # same response as any other invalid token — no distinction leaked\n    except jwt.InvalidTokenError:\n        raise _credentials_exception\n    user_id = payload.get(\"sub\")\n    if user_id is None:\n        raise _credentials_exception\n    user = get_user_by_id(int(user_id))\n    if user is None:\n        # token was validly signed but references a user that no longer exists\n        # (e.g. deleted after the token was issued) — still just 401, not a 500\n        raise _credentials_exception\n    return user\n\nasync def get_current_active_user(current_user: dict = Depends(get_current_user)) -> dict:\n    if current_user.get(\"disabled\"):\n        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=\"Account is disabled\")\n    return current_user\n\n@app.get(\"/users/me\")\nasync def read_current_user(current_user: dict = Depends(get_current_active_user)):\n    return {\"id\": current_user[\"id\"], \"email\": current_user[\"email\"]}\n```\n\nWhy `get_current_user` and `get_current_active_user` are separate, LAYERED dependencies rather than one combined function: this composes cleanly — endpoints needing only \"is this a valid, existing user\" use `get_current_user` directly, while endpoints that must additionally reject a disabled account use `get_current_active_user`, without duplicating the token-decoding logic. This mirrors the authentication-then-authorization sequencing established earlier in this module: token validation (authentication) is one layer, the account-status check (a form of authorization) is a distinct layer stacked on top.\n\nThe 403-vs-401 distinction matters here too: a disabled account still has a VALID, correctly-signed token (authentication succeeds — we know who they are), but the account\\\n\nStep 1 — Understand the topic.\nTopic: Coding: get_current_user dependency with correct 401 handling for invalid/expired tokens\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "FastAPI\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: get_current_user dependency with correct 401 handling for invalid/expired tokens**.",
    bestPractices: [
      'Return the identical 401 response (status, detail message, and `WWW-Authenticate` header) for every category of token failure — expired, malformed, invalid signature, unknown user — never let the client distinguish which.',
      'Layer `get_current_active_user` (and further role/permission dependencies) ON TOP of a base `get_current_user`, rather than duplicating token-decoding logic in every variant.',
      'Always pass `algorithms=[...]` explicitly to `jwt.decode` inside this dependency — this is the exact enforcement point for the algorithm-confusion defense discussed earlier in this module.',
    ],
    tradeOffs:
      'Collapsing every token-failure branch into an identical response is the secure default, but it does mean your server-side logs/metrics need to capture the DISTINCT underlying reason (expired vs malformed vs unknown user) separately from the response sent to the client — conflating logging detail with response detail would either leak information to attackers or lose useful operational visibility; keeping them separate avoids that trade-off entirely.',
    commonMistakes: [
      'Returning different error details for "token expired" versus "token invalid" in the actual HTTP response, giving an attacker probing with a stolen expired token useful confirmation that the token format/signature was otherwise valid.',
      'Forgetting the `WWW-Authenticate: Bearer` header on the 401 response, which is expected per HTTP spec and used by some clients/tools to correctly prompt for re-authentication.',
      'Not handling the case where `sub` in an otherwise validly-signed token no longer corresponds to any existing user (e.g. the account was deleted), letting a `None` propagate into a later crash instead of a clean 401.',
    ],
    followUpQuestions: [
      'Why must the response be identical for "expired" vs "malformed" tokens, even though your internal logs should still distinguish them?',
      'How would you extend `get_current_active_user` to also check the user\'s email has been verified, as a further layered dependency?',
      'What would you change here if `get_current_user` needed to check a token-revocation blacklist as well as signature/expiry validity?',
    ],
    relatedTopics: ['get_current_user', 'JWT Validation', 'Dependency Injection', '401 Unauthorized', 'FastAPI Coding'],
  },
  {
    id: 'python-m13-12',
    number: 'PY-M13-12',
    title: 'Coding: refresh-token endpoint implementing rotation',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'A `POST /auth/refresh` endpoint accepts a refresh token (typically via an httpOnly cookie, not a request body, to limit JS exposure), validates and ROTATES it via the reuse-detecting store from the earlier refresh-token question, and returns a fresh access token alongside the new refresh token — set again as an httpOnly cookie — while any reuse of an already-rotated token immediately revokes the whole session family and forces re-authentication.',
    deepExplanation:
      "```python\nfrom fastapi import APIRouter, Cookie, HTTPException, Response, status\n\nrouter = APIRouter(prefix=\"/auth\", tags=[\"Auth\"])\nstore = RefreshTokenStore()   # from the refresh-token rotation question earlier in this module\n\nCOOKIE_NAME = \"refresh_token\"\n\ndef _set_refresh_cookie(response: Response, token: str) -> None:\n    response.set_cookie(\n        key=COOKIE_NAME,\n        value=token,\n        httponly=True,     # not readable by JavaScript — mitigates XSS token theft\n        secure=True,        # only sent over HTTPS\n        samesite=\"strict\",  # mitigates CSRF — never auto-sent on a cross-site navigation/request\n        max_age=30 * 24 * 60 * 60,\n        path=\"/auth/refresh\",   # scope the cookie ONLY to the refresh endpoint — minimizes exposure surface\n    )\n\n@router.post(\"/login\")\nasync def login(payload: UserLogin, response: Response):\n    user = authenticate(payload.email, payload.password)   # 401 on failure, omitted here for brevity\n    access_token = create_access_token(user[\"id\"])\n    refresh_token = store.issue(user[\"id\"])\n    _set_refresh_cookie(response, refresh_token)\n    return {\"access_token\": access_token, \"token_type\": \"bearer\"}   # refresh token NEVER in the JSON body\n\n@router.post(\"/refresh\")\nasync def refresh(response: Response, refresh_token: str | None = Cookie(default=None, alias=COOKIE_NAME)):\n    if refresh_token is None:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=\"No refresh token provided\")\n    try:\n        new_refresh_token = store.rotate(refresh_token)\n    except ValueError as exc:\n        response.delete_cookie(COOKIE_NAME, path=\"/auth/refresh\")   # clear a compromised/invalid cookie\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=str(exc))\n    record = store._tokens[new_refresh_token]\n    _set_refresh_cookie(response, new_refresh_token)\n    return {\"access_token\": create_access_token(record[\"user_id\"]), \"token_type\": \"bearer\"}\n\n@router.post(\"/logout\", status_code=status.HTTP_204_NO_CONTENT)\nasync def logout(response: Response, refresh_token: str | None = Cookie(default=None, alias=COOKIE_NAME)):\n    if refresh_token:\n        record = store._tokens.get(refresh_token)\n        if record:\n            store.revoke_family(record[\"family_id\"])   # invalidate the whole session, not just this token\n    response.delete_cookie(COOKIE_NAME, path=\"/auth/refresh\")\n```\n\nAPI example:\n\n```text\nPOST /auth/login  {\"email\": \"...\", \"password\": \"...\"}\n-> 200 {\"access_token\": \"eyJ...\", \"token_type\": \"bearer\"}\n   Set-Cookie: refresh_token=abc123...; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh\n\nPOST /auth/refresh   (cookie sent automatically by the browser)\n-> 200 {\"access_token\": \"eyJ...NEW...\", \"token_type\": \"bearer\"}\n   Set-Cookie: refresh_token=def456...; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh\n\nPOST /auth/refresh   (replaying the now-rotated-away \"abc123...\" token again)\n-> 401 {\"detail\": \"refresh token reuse detected — session revoked\"}\n```\n\nScoping the cookie\\\n\nStep 1 — Understand the topic.\nTopic: Coding: refresh-token endpoint implementing rotation\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This login/refresh/logout triad — access token in the JSON body (client keeps it in memory), refresh token exclusively in a path-scoped httpOnly cookie with rotation and reuse detection — is a widely documented reference architecture for SPA authentication (e.g. described in the IETF OAuth 2.0 for Browser-Based Apps best-practice draft) precisely because it minimizes both XSS exposure (refresh token never JS-readable) and CSRF exposure (SameSite=Strict, plus the refresh endpoint itself performs no state-changing action a forged cross-site request would benefit from without also knowing the resulting access token).\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: refresh-token endpoint implementing rotation**.",
    bestPractices: [
      'Never return the refresh token in a JSON response body if it is also being set as an httpOnly cookie — pick one transport, and prefer the cookie for anything long-lived and sensitive.',
      'Scope the refresh-token cookie\'s `path` to just the refresh/logout endpoints, not the entire domain, to minimize how often it is actually transmitted.',
      'On logout, revoke the entire token FAMILY (not just delete the client-side cookie) — a client-side-only "logout" leaves the refresh token still valid server-side if it was ever captured beforehand.',
    ],
    tradeOffs:
      'Cookie-scoped refresh tokens add real implementation surface (cookie attribute correctness, CORS credential configuration, path scoping) compared to just returning both tokens in a JSON body for the client to store however it likes — but the JSON-body approach forces the client to choose its own storage (localStorage or JS memory), both of which carry meaningfully worse XSS exposure than an httpOnly cookie for a credential this long-lived and powerful.',
    commonMistakes: [
      'Returning the refresh token in the JSON response body in addition to setting it as a cookie, doubling the attack surface for no benefit.',
      'Implementing "logout" as only clearing the client-side cookie, leaving the server-side refresh token record still valid and exploitable if it was ever exfiltrated earlier.',
      'Forgetting `allow_credentials=True` in CORS configuration (and a specific, non-wildcard origin) when the refresh cookie needs to be sent cross-origin from a separately-hosted frontend.',
    ],
    followUpQuestions: [
      'Why is the refresh token deliberately kept OUT of the JSON response body once cookie-based storage is in place?',
      'How would this design need to change to support a mobile app client that cannot rely on browser cookie behavior at all?',
      'What would you monitor/alert on to detect an unusually high rate of refresh-token-reuse-detected events across your user base?',
    ],
    relatedTopics: ['Refresh Tokens', 'httpOnly Cookies', 'Token Rotation', 'SameSite', 'Logout', 'FastAPI Coding'],
  },
  {
    id: 'python-m13-13',
    number: 'PY-M13-13',
    title: 'Coding: RBAC-protected admin-only and multi-role endpoints',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'FastAPI Coding',
    expectedAnswer:
      'Using the `require_role`/`require_permission` dependency factories established earlier in this module, a realistic endpoint set demonstrates an admin-only action (user deletion), a multi-role action (both MANAGER and ADMIN can view team reports), and a self-or-admin pattern (a user can view/edit their OWN profile, or an admin can view/edit ANY profile) — the last of which is the object-level-authorization pattern from the very first question in this module, now combined with role checking.',
    deepExplanation:
      "```python\nfrom fastapi import APIRouter, Depends, HTTPException, status\n\nrouter = APIRouter(prefix=\"/users\", tags=[\"Users\"])\n\n# admin-only: only ADMIN may hard-delete a user account\n@router.delete(\"/{user_id}\", dependencies=[Depends(require_role(Role.ADMIN))], status_code=status.HTTP_204_NO_CONTENT)\nasync def delete_user(user_id: int):\n    delete_from_db(user_id)\n\n# multi-role: MANAGER and ADMIN both allowed (require_role\\\n\nStep 1 — Understand the topic.\nTopic: Coding: RBAC-protected admin-only and multi-role endpoints\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef can_manage(role: str) -> bool:\n    return role in {\"admin\", \"manager\"}\n\nprint(can_manage(\"admin\"))\nprint(can_manage(\"user\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nallowed = role in {\n    \"admin\",\n    \"manager\",\n}\n```\n\nStep 5 — Example result:\n```text\nTrue / False\n```\n\nStep 6 — Complexity / trade-off:\nAuthorization should be deny-by-default and enforced server-side.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This self-or-admin pattern is close to universal across production SaaS products — \"a user can manage their own settings; a support/admin role can manage anyone\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: RBAC-protected admin-only and multi-role endpoints**.",
    bestPractices: [
      'Use `dependencies=[Depends(...)]` on the path operation decorator (not a function parameter) when a dependency is purely a gate/check and its return value is not needed in the handler body.',
      'Explicitly test the boundary cases of an "or" authorization condition (self-but-not-admin, admin-but-not-self, neither) rather than only testing the fully-permitted and fully-denied cases.',
      'Keep role checks (coarse, "can this class of user do this class of action") and object-level ownership checks (fine, "can THIS user act on THIS specific resource") as clearly separate, composable conditions rather than merging them into one opaque check.',
    ],
    tradeOffs:
      'Writing the self-or-admin check inline (as shown) is simple and explicit for a small number of endpoints, but as an application grows this exact pattern tends to repeat across many resource types (a user\'s orders, a user\'s addresses, a user\'s payment methods) — at that point extracting a small reusable "owns-or-has-role" dependency factory reduces duplication at the cost of one more layer of indirection to reason about.',
    commonMistakes: [
      'Writing `is_self and is_admin` instead of `is_self or is_admin`, accidentally requiring a user to be BOTH themselves and an admin simultaneously — an impossible condition that locks everyone out except literally nobody.',
      'Forgetting the admin escape hatch entirely and only checking `is_self`, preventing legitimate admin/support access that the product actually requires.',
      'Using a function-parameter-bound `Depends()` when `dependencies=[Depends(...)]` would communicate intent more clearly, for checks whose return value the handler never uses.',
    ],
    followUpQuestions: [
      'How would you write an automated test suite that specifically exercises all four combinations of (is_self, is_admin) for the self-or-admin pattern?',
      'How would you extract the self-or-admin logic into a reusable dependency factory, parameterized by how to determine "self" for different resource types?',
      'Why is `dependencies=[Depends(...)]` preferred over an unused function parameter for a pure authorization gate?',
    ],
    relatedTopics: ['RBAC', 'Object-Level Authorization', 'Dependencies', 'FastAPI Coding', 'Access Control'],
  },
  {
    id: 'python-m13-14',
    number: 'PY-M13-14',
    title: 'Coding: secure file upload — extension/MIME allowlist, size limit, and path-traversal-safe filenames',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'API Security',
    expectedAnswer:
      'A secure upload endpoint never trusts the client-supplied filename or `Content-Type` at face value: it validates the file EXTENSION against an allowlist, sniffs the actual file content\'s magic bytes (not just the trusted-client `Content-Type` header) to confirm the real MIME type, enforces a maximum size by streaming and counting bytes (rather than loading the whole file into memory first), and always generates its OWN server-side filename (e.g. a UUID) rather than using any part of the client-supplied name — which is what prevents path traversal (`../../etc/passwd`-style filenames) and overwrite/collision attacks.',
    deepExplanation:
      "```python\nimport uuid\nfrom pathlib import Path\nfrom fastapi import APIRouter, HTTPException, UploadFile, status\n\nrouter = APIRouter(prefix=\"/uploads\", tags=[\"Uploads\"])\n\nALLOWED_EXTENSIONS = {\".jpg\", \".jpeg\", \".png\", \".pdf\"}\nALLOWED_MAGIC_BYTES = {\n    b\"\\\\xff\\\\xd8\\\\xff\": \".jpg\",         # JPEG\n    b\"\\\\x89PNG\\\\r\\\n\\\\x1a\\\n\": \".png\",    # PNG\n    b\"%PDF-\": \".pdf\",                  # PDF\n}\nMAX_FILE_SIZE = 5 * 1024 * 1024   # 5 MB\nUPLOAD_DIR = Path(\"/var/app/uploads\")   # never web-server-servable directly; served via a signed URL/proxy\n\ndef _sniff_extension(header_bytes: bytes) -> str | None:\n    for magic, ext in ALLOWED_MAGIC_BYTES.items():\n        if header_bytes.startswith(magic):\n            return ext\n    return None\n\n@router.post(\"/\", status_code=status.HTTP_201_CREATED)\nasync def upload_file(file: UploadFile):\n    # 1. extension allowlist check on the CLIENT-supplied name — a first, cheap filter only,\n    #    never trusted alone (an attacker can rename any file to end in .png)\n    client_ext = Path(file.filename or \"\").suffix.lower()\n    if client_ext not in ALLOWED_EXTENSIONS:\n        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail=\"Unsupported file extension\")\n\n    # 2. read a small header chunk and verify the REAL content via magic bytes —\n    #    this is what actually prevents a disguised executable/script from being accepted\n    header = await file.read(16)\n    sniffed_ext = _sniff_extension(header)\n    if sniffed_ext is None or sniffed_ext != client_ext:\n        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail=\"File content does not match its extension\")\n\n    # 3. stream the rest, enforcing a hard size cap WITHOUT ever buffering the whole file in memory\n    server_filename = f\"{uuid.uuid4().hex}{sniffed_ext}\"   # NEVER derived from the client filename\n    destination = UPLOAD_DIR / server_filename\n    size = len(header)\n    with destination.open(\"wb\") as out_file:\n        out_file.write(header)\n        while chunk := await file.read(1024 * 1024):\n            size += len(chunk)\n            if size > MAX_FILE_SIZE:\n                out_file.close()\n                destination.unlink(missing_ok=True)   # clean up the partial file\n                raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail=\"File too large\")\n            out_file.write(chunk)\n\n    return {\"filename\": server_filename, \"size\": size}\n```\n\nWhy the client-supplied filename must NEVER be used to build the server-side path directly: a filename like `\"../../../etc/crontab\"` or `\"..\\\\\\\\..\\\\\\\\Windows\\\\\\\\System32\\\\\\\\evil.dll\"` would, if naively joined onto `UPLOAD_DIR`, write OUTSIDE the intended upload directory entirely — a classic path traversal vulnerability. Generating a fresh server-side UUID filename (as shown) sidesteps this entire class of attack categorically, rather than trying to sanitize/escape the client filename (a much more error-prone approach that historically has had many bypass techniques found against naive sanitizers).\n\nWhy checking magic bytes matters beyond the extension/`Content-Type` header: both the filename extension and the `Content-Type` header are entirely CLIENT-CONTROLLED and trivially spoofed (any tool can set `Content-Type: image/png` while uploading an actual `.exe` or a malicious script renamed to `.png`) — verifying the actual byte signature of the file content is the only check that reflects what the file TRULY is, which matters enormously if uploaded files are ever later served back to other users (preventing a disguised HTML/SVG file with embedded script from being served as if it were an image and triggering stored XSS).\n\nStep 1 — Understand the topic.\nTopic: Coding: secure file upload — extension/MIME allowlist, size limit, and path-traversal-safe filenames\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "Major file-sharing/CDN platforms (and any product accepting user-uploaded avatars/attachments) implement exactly this layered validation — extension check, magic-byte/content sniffing, size limits enforced via streaming, and server-generated storage names — precisely because \"upload arbitrary file, disguised as an image, later served back to other users\" has been a real, repeatedly-exploited vector for stored XSS and, in extension-only-validated systems, for tricking a misconfigured web server into executing an uploaded file as a script.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: secure file upload — extension/MIME allowlist, size limit, and path-traversal-safe filenames**.",
    bestPractices: [
      'Generate the server-side storage filename yourself (UUID) — never use any part of the client-supplied filename to construct a filesystem path.',
      'Verify file content via magic-byte sniffing, not just the extension or client-supplied `Content-Type` header, both of which are trivially spoofable.',
      'Enforce the size limit while STREAMING the upload (checking cumulative bytes read as you go), not after buffering the entire file into memory — a naive "load it all, then check `len()`" approach is itself a memory-exhaustion denial-of-service vector for large uploads.',
    ],
    tradeOffs:
      'Magic-byte content sniffing meaningfully raises upload-handling implementation complexity (maintaining a signature table, handling multi-format files) compared to trusting the client-supplied extension/MIME type alone, but skipping it leaves a disguised-file-upload vulnerability that is trivial for any attacker to exploit with off-the-shelf tools — for any endpoint where uploaded files are ever served back to other users, this trade-off strongly favors doing the extra validation.',
    commonMistakes: [
      'Trusting the client-supplied `Content-Type` header or filename extension alone as proof of what a file actually is, without verifying the real content.',
      'Constructing the server-side file path directly from the client-supplied filename, opening a path traversal vulnerability.',
      'Buffering the entire upload into memory before checking its size, making the endpoint itself a denial-of-service vector against a large or maliciously oversized upload.',
    ],
    followUpQuestions: [
      'Why is magic-byte sniffing necessary even after already checking the file extension and `Content-Type` header?',
      'How would you extend this to also scan uploaded files for malware before making them available to other users?',
      'Where should uploaded files actually be SERVED from in production, and why should the upload directory typically not be directly web-accessible?',
    ],
    relatedTopics: ['File Upload Security', 'Path Traversal', 'Magic Bytes', 'UploadFile', 'Stored XSS', 'FastAPI Coding'],
  },
];

export const MOCK_PYTHON_MODULE13_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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