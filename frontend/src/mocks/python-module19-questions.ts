// Python + DSA Interview Handbook — Module 19: MongoDB Fundamentals.
// Hand-authored technical questions covering NoSQL/document-database basics,
// MongoDB architecture (mongod/mongos/WiredTiger), BSON, ObjectId, database
// and collection operations, CRUD (insert/find/update/delete), query
// operators, nested documents and arrays, projection, sorting, pagination
// (including skip/limit's scaling limits and cursor pagination), and
// counting/distinct — with genuine MongoDB shell + Python (PyMongo) code and
// production reasoning. Mirrors the MockTechnicalQuestion shape defined in
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
    id: 'python-m19-1',
    number: 'PY-M19-1',
    title: 'NoSQL, document databases, and why/when MongoDB fits',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Database Fundamentals',
    expectedAnswer:
      'NoSQL databases give up some of the relational model\'s fixed schema and strong cross-table JOIN guarantees in exchange for flexible, application-shaped data models and easier horizontal scaling. MongoDB specifically is a DOCUMENT database: it stores self-contained, JSON-like BSON documents grouped into collections (a collection is analogous to a table, but with no enforced schema across documents), which fits naturally when data is read/written in whole "aggregate" chunks that mirror how the application actually uses it (a full user profile, a full order with its line items) rather than being decomposed into many normalized tables joined at read time.',
    deepExplanation:
      'The hierarchy, and its SQL analogy:\n\n```text\nMongoDB           SQL analogy\n-------           -----------\nMongoDB server -> database server\nDatabase       -> database\nCollection     -> table (but schema-flexible, not schema-enforced)\nDocument       -> row (but can be deeply nested, with embedded sub-documents/arrays)\nField          -> column\n```\n\nA document, for a blog post, illustrating the core difference from a relational design:\n\n```json\n{\n  "_id": ObjectId("65f1a2b3c4d5e6f7a8b9c0d1"),\n  "title": "Understanding MongoDB",\n  "author": { "name": "Ada Lovelace", "email": "ada@example.com" },\n  "tags": ["mongodb", "nosql", "databases"],\n  "comments": [\n    { "user": "grace", "text": "Great post!", "posted_at": ISODate("2026-01-05T10:00:00Z") }\n  ],\n  "published_at": ISODate("2026-01-01T00:00:00Z")\n}\n```\n\nIn a relational design, this would normally be FOUR normalized tables (posts, authors, tags/post_tags, comments) joined at read time; in MongoDB, the whole "aggregate" the application actually needs to render a blog post page is ONE document, fetched with a single `find_one` and no JOIN at all — this is the core "model around access patterns" philosophy that Module 20 develops further (embedding vs referencing).\n\nWhen MongoDB is a GOOD fit: data is naturally document-shaped and mostly read/written as a whole aggregate (a user profile with settings, a product with variants, an event log entry); the schema evolves frequently and heterogeneously (different documents in the same collection can have slightly different shapes without a migration); horizontal write scaling via sharding is a genuine anticipated need. When MongoDB is a POOR fit: the data is fundamentally relational with many-to-many relationships that need to be queried and joined FLEXIBLY from many different angles (ad hoc reporting/analytics across normalized entities); you need strong, cross-document, multi-table ACID guarantees as the DEFAULT mode of operation (MongoDB supports multi-document transactions, but they are the exception, not the natural mode, and carry a real performance cost); the data is fundamentally tabular/numeric and best served by SQL\'s mature analytical tooling.',
    productionExample:
      'A content-management/blogging platform models each blog post (with its embedded author snapshot, tags, and a bounded number of comments) as a single MongoDB document, because the application ALWAYS reads/writes a post as one cohesive unit on the page-render path — this eliminates the N+1-JOIN problem a normalized relational schema would otherwise require to render the same page, at the cost of some controlled data duplication (the author\'s name embedded in each post) that the application must be deliberate about keeping acceptably fresh.',
    bestPractices: [
      'Choose MongoDB based on your actual ACCESS PATTERNS (how the application reads/writes data), not on "NoSQL is more modern/scalable" as a blanket justification.',
      'Expect and design for schema EVOLUTION within a collection (new optional fields over time) rather than treating the schema-flexibility as license for genuinely inconsistent, undocumented document shapes.',
      'Keep a mental (and ideally, code-enforced via Pydantic models on the Python side) canonical schema per collection even though MongoDB itself does not enforce one — "schema-flexible" should not mean "no schema".',
    ],
    tradeOffs:
      'MongoDB\'s document model reduces JOIN-time complexity and impedance mismatch with application objects (a document often maps directly onto an application object graph), at the cost of pushing more of the "is this data consistent/normalized" responsibility onto the APPLICATION rather than the database\'s constraint system — a relational database enforces foreign-key integrity structurally; MongoDB requires the application (or careful use of features like transactions and schema validation) to maintain equivalent guarantees deliberately.',
    commonMistakes: [
      'Choosing MongoDB reflexively for a workload that is fundamentally relational (complex many-to-many queries needing flexible ad hoc JOINs across normalized entities), then re-implementing JOIN logic manually and painfully in application code.',
      'Treating "schema-less" as "no schema needed at all" and letting document shapes drift inconsistently across a collection with no shared contract, making the collection difficult to query and reason about.',
      'Assuming MongoDB "does not support transactions" (a common outdated belief) — modern MongoDB fully supports multi-document ACID transactions, just not as the default, lightest-weight mode of every write.',
    ],
    followUpQuestions: [
      'What does "schema-flexible" actually mean operationally, and how do you maintain a de facto schema without the database enforcing one for you?',
      'Give a concrete example of a workload where a document database is clearly the wrong choice, and explain why relationally.',
      'How would you decide, for a NEW service, whether to reach for PostgreSQL or MongoDB as the primary datastore?',
    ],
    relatedTopics: ['NoSQL', 'Document Database', 'MongoDB', 'Schema Design', 'Data Modeling'],
  },
  {
    id: 'python-m19-2',
    number: 'PY-M19-2',
    title: 'MongoDB architecture — mongod, WiredTiger, and the query lifecycle',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'MongoDB Architecture',
    expectedAnswer:
      '`mongod` is the core MongoDB server process that stores data and serves queries; `mongos` is a routing process used ONLY in a sharded cluster (it has no persistent data of its own — it routes each query to the correct shard(s) via the config servers\' metadata). WiredTiger is MongoDB\'s default storage engine: it manages an in-memory cache of frequently-accessed data, a write-ahead journal for crash recovery, and on-disk B-tree structures for both collections and indexes, with document-level concurrency control.',
    deepExplanation:
      '```text\nClient (PyMongo driver)\n  |  wire protocol request\nmongod  (or mongos, routing to the correct mongod, in a sharded cluster)\n  |\nQuery Parser        — parses the query document into an internal query shape\n  |\nQuery Planner       — evaluates candidate indexes, picks (or caches) a "winning plan"\n  |\nStorage Engine (WiredTiger)\n  |\nWiredTiger Cache (in-memory)  <-->  Disk (data files + indexes, B-tree structures)\n  |\nJournal (write-ahead log, for crash recovery — a write is not durable until journaled)\n```\n\nWiredTiger specifics worth knowing precisely: it uses MVCC-style (multi-version concurrency control) document-level locking — two writers targeting DIFFERENT documents in the same collection do not block each other (a major improvement over MongoDB\'s older MMAPv1 storage engine, which locked at a coarser granularity); it maintains an internal CACHE (by default sized to ~50% of (RAM - 1GB), tunable via `--wiredTigerCacheSizeGB`) holding the "working set" of hot data/indexes in memory — performance falls off sharply once your actively-queried working set exceeds this cache size, forcing disk reads on the hot path; and it periodically performs a CHECKPOINT (flushing an internally consistent snapshot of all data to disk) while the JOURNAL captures writes between checkpoints so a crash can replay from the last checkpoint + journal without data loss.\n\nThe query PLANNER specifically: for a query shape it has not seen recently, MongoDB runs several candidate plans (a "plan race") in parallel for a limited number of documents/time, picks the winner based on which examined the fewest documents to satisfy the query, and CACHES that winning plan for future queries with the same shape — this cached plan can occasionally become STALE if the underlying data distribution changes significantly (a classic "index not being used anymore" debugging scenario, covered in Module 20\'s EXPLAIN topic).',
    productionExample:
      'A production MongoDB deployment sizes its WiredTiger cache and instance memory specifically around the "working set" — e.g. a 200GB collection where 95% of queries only ever touch the most recent 20GB of documents (a common pattern for time-series/event data) can perform excellently on a machine with only ~24GB of RAM, because the ACTIVE working set fits in cache even though the full collection does not; monitoring the cache eviction rate and page-fault rate is how teams detect when the working set has outgrown available memory.',
    bestPractices: [
      'Size production MongoDB instances around your actual WORKING SET (hot, frequently-queried data + its indexes), not the total collection size, since WiredTiger cache performance is what dominates query latency.',
      'Understand `mongos` has no persistent storage of its own in a sharded deployment — it is a stateless routing layer, so scaling `mongos` instances is comparatively cheap and horizontal.',
      'Monitor for query PLAN CACHE staleness (via `.explain()` showing an unexpectedly poor plan) after major changes in data distribution, and know how to clear/force replan if needed.',
    ],
    tradeOffs:
      'WiredTiger\'s document-level MVCC locking gives far better write concurrency than MongoDB\'s legacy MMAPv1 engine (collection/database-level locking), at the cost of additional memory overhead for maintaining multiple document versions concurrently — this tradeoff (more memory for dramatically better concurrent write throughput) is exactly why WiredTiger has been the default engine for years and MMAPv1 is effectively deprecated/legacy at this point.',
    commonMistakes: [
      'Sizing MongoDB server memory around total collection/database size instead of the actual working set, leading to either wasted over-provisioning or, worse, thrashing under-provisioning.',
      'Confusing `mongos` (a stateless sharded-cluster router) with `mongod` (the actual data-holding server process) when reasoning about a sharded deployment\'s architecture.',
      'Assuming the query planner always picks the objectively optimal plan on every single query — it caches a "winning plan" per query SHAPE and can occasionally run a stale, suboptimal plan until the cache is invalidated or a plan re-race is triggered.',
    ],
    followUpQuestions: [
      'What specifically changed in write concurrency behavior when MongoDB moved from MMAPv1 to WiredTiger as the default storage engine?',
      'How would you diagnose whether your production workload\'s working set has outgrown the available WiredTiger cache?',
      'In a sharded cluster, what role do the config servers play, and what happens if they become unavailable?',
    ],
    relatedTopics: ['MongoDB Architecture', 'WiredTiger', 'mongod', 'mongos', 'Query Planner', 'Working Set'],
  },
  {
    id: 'python-m19-3',
    number: 'PY-M19-3',
    title: 'BSON vs JSON, and BSON\'s richer data types',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'BSON',
    expectedAnswer:
      'BSON ("Binary JSON") is MongoDB\'s binary-encoded superset of JSON: it adds types JSON lacks (a proper date/timestamp type, binary data, `Decimal128` for exact decimal arithmetic, a dedicated 64-bit integer/`Long` type, and `ObjectId`), stores a length prefix on every document/array/string enabling FAST traversal and field-skipping without a full parse, but sacrifices JSON\'s human-readability and adds a small amount of extra size versus minimal JSON text for simple documents.',
    deepExplanation:
      '```text\nJSON types:  string, number, boolean, null, object, array\nBSON types:  ...all of the above, PLUS:\n             ObjectId        — 12-byte unique identifier (see the dedicated ObjectId question)\n             Date            — 64-bit integer, milliseconds since Unix epoch (UTC), not a naive string\n             Timestamp       — internal type used for replication oplog entries, NOT the same as Date\n             Int32 / Int64   — distinct fixed-width integer types (JSON has just one ambiguous "number")\n             Double          — IEEE-754 64-bit float\n             Decimal128      — EXACT decimal type (128-bit), for money/financial values needing no rounding error\n             Binary          — raw binary data (e.g. small file blobs, encrypted fields)\n             Regular Expression — a native BSON type, not just a string pattern\n             Null            — same concept as JSON null\n```\n\nWhy BSON stores explicit LENGTH PREFIXES for documents/arrays/strings (a key structural difference from JSON): a JSON parser must scan character-by-character to find the end of a nested object or string; BSON encodes the byte-length up front, so the storage engine/driver can SKIP directly past a field or sub-document it does not need (e.g. during a projection that excludes certain fields) without fully parsing it — this is a meaningful performance advantage for large or deeply nested documents.\n\nA concrete, interview-relevant gotcha: because JSON has only one generic "number" type, a JSON payload like `{"price": 19.99}` is AMBIGUOUS about whether it should become a BSON `Double` or `Decimal128` — most JSON-to-BSON conversion paths (including a naive REST API accepting JSON and inserting it) will produce a `Double`, which is NOT exact for currency — this is exactly why, in Python, you explicitly wrap monetary values in `bson.Decimal128` (or better, `decimal.Decimal` converted via a Pydantic validator) before inserting, rather than trusting the default float conversion.\n\n```python\nfrom bson import Decimal128\nfrom decimal import Decimal\n\n# WRONG: inserting a Python float stores an imprecise BSON Double\ndb.orders.insert_one({"total": 19.99})\n\n# CORRECT: exact decimal storage for money\ndb.orders.insert_one({"total": Decimal128(str(Decimal("19.99")))})\n```',
    productionExample:
      'A billing system that stored order totals as plain floats (the default when inserting a Python `float` via PyMongo) discovered small but real rounding discrepancies when SUMMING totals across millions of orders in a reporting aggregation — migrating the field to `Decimal128` (and being careful to construct it FROM A STRING, not directly from a float, to avoid re-introducing the same imprecision at the conversion boundary) eliminated the drift.',
    bestPractices: [
      'Use `Decimal128` (constructed from a string or Python `Decimal`, never directly from a float) for any monetary/financial field, exactly as you would use `NUMERIC` in PostgreSQL.',
      'Store real-world instants as native BSON `Date` (which PyMongo maps to Python `datetime`), never as a formatted string — this preserves correct sorting, range-querying, and timezone-safe comparisons.',
      'Remember BSON\'s richer typing is exactly why "just send it as JSON over HTTP" is not equivalent to "store it in MongoDB unchanged" — the JSON-to-BSON conversion boundary (in your Pydantic models / driver layer) is where type precision decisions actually get made.',
    ],
    tradeOffs:
      'BSON\'s length-prefixed binary structure enables fast traversal/skipping and richer native types at the cost of being non-human-readable on disk/in transit (you need `mongosh`/Compass/a driver to inspect it meaningfully) and slightly larger on-wire size than a maximally compact JSON string for very small, simple documents — a tradeoff that is overwhelmingly worth it for a database\'s actual storage/query needs, even though it means you cannot just `cat` a BSON file and read it directly.',
    commonMistakes: [
      'Inserting Python `float` values for monetary fields and being surprised by tiny but real precision drift once aggregated at scale — the fix is `Decimal128`, constructed from a string/Decimal, not a float.',
      'Storing timestamps as formatted strings ("2026-01-01 10:00:00") instead of native BSON `Date`, losing correct range-querying/sorting and forcing error-prone string parsing everywhere the value is used.',
      'Confusing BSON\'s internal replication `Timestamp` type with the `Date` type used for application data — `Timestamp` is specifically for internal oplog ordering and should essentially never be used for your own application fields.',
    ],
    followUpQuestions: [
      'Why can a naive JSON-to-BSON conversion silently lose precision for a value like `19.99`, and how do you prevent that?',
      'What practical advantage does BSON\'s length-prefixing give the storage engine when performing a projection that only needs a few fields of a large document?',
      'What is the difference between BSON\'s `Date` and `Timestamp` types, and why should application code almost always use `Date`?',
    ],
    relatedTopics: ['BSON', 'JSON', 'Decimal128', 'Data Types', 'PyMongo'],
  },
  {
    id: 'python-m19-4',
    number: 'PY-M19-4',
    title: 'ObjectId — generation, structure, and correct handling in Python/FastAPI',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'ObjectId',
    expectedAnswer:
      'A MongoDB `ObjectId` is a 12-byte identifier auto-generated CLIENT-SIDE by the driver (not the server) by default: 4 bytes of Unix timestamp (seconds), 5 bytes of a random value (unique per process), and 3 bytes of an incrementing counter — this structure guarantees a very high probability of global uniqueness WITHOUT a central coordinator, and, unlike a random UUID, is roughly chronologically SORTABLE (documents inserted later generally get a "greater" ObjectId), which is exactly why it is the default `_id` and is directly usable for `_id`-based (keyset) pagination.',
    deepExplanation:
      '```text\nObjectId byte layout (12 bytes total):\n[ 4 bytes: Unix timestamp (seconds) ][ 5 bytes: random value, unique per process ][ 3 bytes: incrementing counter ]\n```\n\nBecause the timestamp is embedded in the FIRST 4 bytes, and ObjectIds sort byte-wise, `ObjectId`s are approximately chronologically ordered — a fact directly exploitable for cheap "give me documents created after this point" range queries and for `_id`-based pagination WITHOUT needing a separate `created_at` field or index:\n\n```python\nfrom bson import ObjectId\nfrom datetime import datetime, timezone\n\n# extract the embedded creation timestamp directly from an ObjectId — no separate field needed\noid = ObjectId("65f1a2b3c4d5e6f7a8b9c0d1")\ncreated_at: datetime = oid.generation_time   # timezone-aware datetime, derived from the embedded 4-byte timestamp\n\n# constructing an ObjectId bound to a specific point in time, for a range query\nstart_of_day = ObjectId.from_datetime(datetime(2026, 1, 1, tzinfo=timezone.utc))\ndb.events.find({"_id": {"$gte": start_of_day}})   # all documents created on/after 2026-01-01\n```\n\nCorrect FastAPI/Pydantic handling — the classic pitfall is that `ObjectId` is NOT JSON-serializable out of the box, and incoming path parameters arrive as plain strings that must be validated before use:\n\n```python\nfrom bson import ObjectId\nfrom bson.errors import InvalidId\nfrom fastapi import HTTPException\nfrom pydantic import GetCoreSchemaHandler\nfrom pydantic_core import core_schema\n\nclass PyObjectId(ObjectId):\n    @classmethod\n    def __get_pydantic_core_schema__(cls, source_type, handler: GetCoreSchemaHandler):\n        return core_schema.no_info_plain_validator_function(\n            cls.validate,\n            serialization=core_schema.plain_serializer_function_ser_schema(str),\n        )\n\n    @classmethod\n    def validate(cls, value):\n        if not ObjectId.is_valid(value):\n            raise ValueError("Invalid ObjectId")\n        return ObjectId(value)\n\n# in a path operation: validate the incoming string BEFORE querying, converting a driver-level\n# InvalidId exception into a clean, expected 400/404 instead of a raw 500\n@app.get("/users/{user_id}")\nasync def get_user(user_id: str):\n    if not ObjectId.is_valid(user_id):\n        raise HTTPException(status_code=400, detail="Invalid user id format")\n    user = await db.users.find_one({"_id": ObjectId(user_id)})\n    if user is None:\n        raise HTTPException(status_code=404, detail="User not found")\n    return {**user, "_id": str(user["_id"])}   # convert back to str for JSON serialization\n```\n\nObjectId vs UUID: a UUID (v4, fully random) has NO embedded timestamp and is not sortable by creation order, and is typically generated with no coordination guarantee beyond its 122 bits of randomness; ObjectId is smaller (12 bytes vs 16), embeds a usable creation timestamp, and sorts roughly chronologically — but a UUID is standardized/portable outside MongoDB (useful if the same identifier needs to mean the same thing across a polyglot-persistence system spanning MongoDB and, say, PostgreSQL), while ObjectId is MongoDB-specific.',
    productionExample:
      'A production FastAPI service that forgot to validate `user_id` as a well-formed ObjectId string before passing it to `find_one` would crash with an unhandled `bson.errors.InvalidId` (translating to a generic 500 Internal Server Error) whenever a client sent a malformed id (e.g. `/users/not-a-real-id` from a scraper or a buggy client) — the standard, correct fix is `ObjectId.is_valid(...)` (or a Pydantic validator like `PyObjectId` above) checked explicitly, converting that case into a clean 400 Bad Request instead of an opaque server error.',
    bestPractices: [
      'Always validate an incoming string as a well-formed ObjectId (`ObjectId.is_valid(...)`) BEFORE constructing `ObjectId(value)` or querying with it, converting malformed input into a clean 400/404 rather than an unhandled driver exception.',
      'Convert `ObjectId` to `str` explicitly at the API boundary (in your Pydantic response model\'s serialization) — it is never natively JSON-serializable, and forgetting this conversion is one of the single most common MongoDB+FastAPI errors.',
      'Exploit the embedded timestamp (`ObjectId.generation_time`, `ObjectId.from_datetime`) for cheap creation-time range queries or default `_id`-based pagination cursors when you do not already have (or need) a separate `created_at` field.',
    ],
    tradeOffs:
      'ObjectId\'s embedded timestamp gives you free, useful chronological ordering and range-querying with no extra field/index, at the cost of leaking approximate CREATION TIME information to anyone who can see the id (a minor information-disclosure consideration for public-facing ids) — a fully random UUID avoids that leakage but loses the free sortability and requires a separate `created_at` field/index for the same chronological queries.',
    commonMistakes: [
      'Returning a raw MongoDB document (with a `bson.ObjectId` `_id` field) directly from a FastAPI endpoint without converting it to `str`, causing a `TypeError`/serialization failure at response time.',
      'Constructing `ObjectId(user_supplied_string)` without first validating it with `ObjectId.is_valid(...)`, letting a malformed client input crash the request with an unhandled `InvalidId` exception instead of a clean 4xx response.',
      'Assuming ObjectId guarantees STRICT, unbroken monotonic ordering across all inserts — the timestamp component only has second-level granularity and the random/counter components mean two ObjectIds generated in the same second from different processes are not strictly comparable by true insertion order.',
    ],
    followUpQuestions: [
      'How would you extract the creation timestamp from an existing ObjectId without querying the database at all?',
      'Why is ObjectId only APPROXIMATELY chronologically sortable rather than strictly, and when would that matter?',
      'In what scenario would you deliberately choose a UUID over the default ObjectId for a MongoDB `_id` field?',
    ],
    relatedTopics: ['ObjectId', 'BSON', 'PyMongo', 'Pydantic', 'FastAPI Serialization', 'Pagination'],
  },
  {
    id: 'python-m19-5',
    number: 'PY-M19-5',
    title: 'Insert operations — insertOne/insertMany, ordered vs unordered, and duplicate key handling',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'CRUD',
    expectedAnswer:
      '`insertOne`/`insert_one` inserts a single document (auto-generating `_id` if omitted); `insertMany`/`insert_many` inserts multiple documents in one round trip and, by default, is ORDERED — meaning it stops at the FIRST error, leaving later documents in the batch un-inserted. Passing `ordered=False` continues inserting the remaining documents even after individual failures (e.g. a duplicate-key violation on one document among many), trading strict all-or-mostly-nothing sequencing for maximum throughput and partial-success resilience.',
    deepExplanation:
      '```python\nfrom pymongo.errors import BulkWriteError, DuplicateKeyError\n\n# single insert — result.inserted_id gives you back the generated (or provided) _id\nresult = db.users.insert_one({"email": "ada@example.com", "name": "Ada Lovelace"})\nprint(result.inserted_id)   # ObjectId(\'...\')\n\n# ordered bulk insert (default): stops at the FIRST failure, leaving later docs un-inserted\ntry:\n    db.users.insert_many([\n        {"email": "grace@example.com", "name": "Grace Hopper"},\n        {"email": "grace@example.com", "name": "Duplicate Grace"},  # violates a unique index on email\n        {"email": "alan@example.com", "name": "Alan Turing"},        # NEVER inserted — ordered stopped before reaching it\n    ])\nexcept BulkWriteError as exc:\n    print(exc.details["writeErrors"])   # details on exactly which document(s) failed and why\n\n# unordered bulk insert: continues past failures, maximizing successful inserts\ndb.users.insert_many(\n    [\n        {"email": "grace@example.com", "name": "Grace Hopper"},\n        {"email": "grace@example.com", "name": "Duplicate Grace"},  # this one fails\n        {"email": "alan@example.com", "name": "Alan Turing"},        # this one STILL succeeds despite the failure above\n    ],\n    ordered=False,\n)\n```\n\nWhy ordered is the default despite being slower: it matches the intuitive mental model of "insert these one after another, stop if something is wrong" — appropriate when documents have a meaningful sequential relationship or when you want fail-fast behavior for a batch that should conceptually succeed-or-fail together. `ordered=False` explicitly opts into "best effort, maximize successful writes, report all failures at the end" — the right choice for large, independent bulk-import batches where one bad row should not block the other 9,999 good ones.\n\nA `DuplicateKeyError` (raised on a single `insert_one`, or aggregated into a `BulkWriteError`\'s `writeErrors` for `insert_many`) means a UNIQUE index (e.g. on `email`) was violated — the correct application response is usually to catch it and translate it into a domain-appropriate error (e.g. an HTTP 409 Conflict "email already registered"), never to let it propagate as a raw 500.\n\nAtomicity note (foreshadowing the transactions module): each INDIVIDUAL document insert within `insert_many` is atomic on its own, but the BATCH as a whole is not atomic by default unless wrapped in an explicit multi-document transaction — an ordered `insert_many` that fails partway through leaves the successfully-inserted documents in the database even though the overall call raised an exception, which is a common source of confusion for developers expecting all-or-nothing semantics without opting into a transaction.',
    productionExample:
      'A bulk CSV-import feature for onboarding a batch of 50,000 customer records uses `insert_many(..., ordered=False)` specifically so that a handful of rows with duplicate emails (data quality issues in the source file) do not block the other 49,995+ valid rows from being inserted — the failed rows are collected from the resulting `BulkWriteError.details["writeErrors"]` and reported back to the uploading user as a downloadable "rows that failed" report.',
    bestPractices: [
      'Use `ordered=False` for large, independent bulk-import batches where partial success is acceptable and desirable; keep the default `ordered=True` when documents have a genuine sequential dependency or you want strict fail-fast behavior.',
      'Always catch `DuplicateKeyError`/`BulkWriteError` explicitly and translate them into a meaningful domain error (e.g. HTTP 409) rather than letting a raw database exception leak to the API response.',
      'Remember that even an ordered `insert_many` failure leaves earlier successful inserts IN the database — do not assume a caught exception means "nothing was written"; inspect `writeErrors`/`inserted_ids` to know the true state.',
    ],
    tradeOffs:
      '`ordered=True` gives simpler, more predictable fail-fast semantics but sacrifices throughput and partial-success resilience on large batches with occasional bad rows; `ordered=False` maximizes successful writes per batch and can be meaningfully faster (MongoDB can parallelize unordered writes internally) at the cost of requiring the application to carefully inspect and reconcile which specific documents failed after the fact.',
    commonMistakes: [
      'Assuming a caught `BulkWriteError` from an ordered `insert_many` means NOTHING was inserted, when in fact everything up to the first failure was already committed.',
      'Letting a raw `DuplicateKeyError` propagate to the API layer as an unhandled 500 instead of catching it and returning a clear, actionable 409 Conflict.',
      'Using `ordered=True` (the default) for a large bulk import where one bad row unnecessarily blocks thousands of otherwise-valid rows from being inserted.',
    ],
    followUpQuestions: [
      'How would you determine exactly which documents succeeded and which failed after catching a `BulkWriteError` from an unordered `insert_many`?',
      'Why is each individual document insert atomic, but a multi-document `insert_many` batch not atomic as a whole, by default?',
      'How would you make a batch of inserts genuinely all-or-nothing if that guarantee were actually required?',
    ],
    relatedTopics: ['insertOne', 'insertMany', 'Bulk Operations', 'DuplicateKeyError', 'PyMongo', 'Atomicity'],
  },
  {
    id: 'python-m19-6',
    number: 'PY-M19-6',
    title: 'Query operators deep dive — comparison, logical, array, and element operators',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Read Operations',
    expectedAnswer:
      'MongoDB query filters are built from operator families: comparison (`$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`), logical (`$and`, `$or`, `$nor`, `$not` — with implicit `AND` when multiple top-level fields are given), array-specific (`$all`, `$elemMatch`, `$size`), and element (`$exists`, `$type`) — combining these correctly (especially around implicit AND and array matching semantics) is one of the most heavily interview-tested MongoDB skills.',
    deepExplanation:
      '```javascript\n// comparison operators\ndb.products.find({ price: { $gt: 100, $lte: 500 } })          // 100 < price <= 500\ndb.products.find({ category: { $in: ["electronics", "books"] } })  // category is one of these\ndb.products.find({ category: { $nin: ["discontinued"] } })     // category is NOT one of these\n\n// implicit AND — multiple top-level fields are ANDed together automatically\ndb.products.find({ category: "electronics", price: { $lt: 1000 }, in_stock: true })\n\n// explicit $or / $and / $nor\ndb.products.find({\n  $or: [ { category: "electronics" }, { price: { $lt: 50 } } ]\n})\ndb.products.find({\n  $and: [ { price: { $gte: 100 } }, { $or: [ { category: "electronics" }, { featured: true } ] } ]\n})\n\n// element operators\ndb.users.find({ phone: { $exists: true } })          // field is present (regardless of value, even null)\ndb.users.find({ age: { $type: "int" } })              // field is specifically a BSON int32\n```\n\nArray operators, with a worked example against `{ "name": "Laptop", "tags": ["electronics", "computer", "work"] }`:\n\n```javascript\n// $all — document\'s array must contain EVERY listed value (order/other elements do not matter)\ndb.products.find({ tags: { $all: ["electronics", "work"] } })          // MATCHES the laptop above\n\n// a bare array field query WITHOUT $all matches if the array contains the value AT ALL (implicit "any element equals")\ndb.products.find({ tags: "electronics" })                                // MATCHES (equivalent to $elemMatch on scalars is unnecessary here)\n\n// $size — array must have EXACTLY this many elements\ndb.products.find({ tags: { $size: 3 } })                                  // MATCHES (exactly 3 tags)\n\n// $elemMatch — REQUIRED when an array holds SUB-DOCUMENTS and multiple conditions\n// must ALL be satisfied by the SAME array element (not just satisfied somewhere across different elements)\ndb.orders.find({\n  items: { $elemMatch: { product: "Laptop", quantity: { $gte: 2 } } }\n})\n```\n\nThe single most important, most commonly mis-tested array-matching subtlety: given a document `{ items: [ { product: "Mouse", quantity: 1 }, { product: "Laptop", quantity: 5 } ] }`, the query `db.orders.find({ "items.product": "Laptop", "items.quantity": { $gte: 2 } })` (WITHOUT `$elemMatch`) still MATCHES this document, even though the "Laptop" item does not itself have quantity >= 2 in a naive reading — because each condition is evaluated independently across the WHOLE array (product="Laptop" is satisfied by element 2, quantity>=2 is satisfied by element 2 as well in this example, but in a case like `[{product: "Mouse", quantity: 5}, {product: "Laptop", quantity: 1}]` it would STILL match incorrectly, since "product=Laptop" is satisfied by element 2 and "quantity>=2" is satisfied by element 1 — two DIFFERENT elements). `$elemMatch` fixes this by requiring ALL conditions to be satisfied by the SAME single array element.',
    productionExample:
      'An order-search feature that queried `{ "items.product": "Laptop", "items.quantity": { $gte": 2 } }` without `$elemMatch` returned orders where a customer bought ONE laptop and FIVE of something else entirely — a subtle correctness bug traced directly to the cross-element matching pitfall described above; wrapping the condition in `$elemMatch` fixed it by scoping both conditions to the same array element.',
    bestPractices: [
      'Always use `$elemMatch` when querying an array of sub-documents with MORE THAN ONE condition that must hold on the SAME element — a bare dot-path query across multiple conditions matches across different elements independently, which is almost never the intended semantics.',
      'Use `$in`/`$nin` instead of a chain of `$or` conditions on the same field for both clarity and consistency with how you would write the equivalent SQL `IN (...)`.',
      'Be precise about `$exists: true` vs a non-null value check — a field can `$exists: true` while its value is `null`, which is a different condition than "has a real value".',
    ],
    tradeOffs:
      '`$elemMatch` correctly scopes multi-condition array matching to a single element (correctness), but requires the query author to REMEMBER to use it — MongoDB will not warn you when a bare multi-condition dot-path query is probably not what you meant, unlike a statically-typed system that might catch such an ambiguity at compile time.',
    commonMistakes: [
      'Querying multiple conditions on array-of-subdocuments fields without `$elemMatch`, silently matching documents where the conditions are satisfied by DIFFERENT array elements rather than the same one.',
      'Confusing `$exists: true` with "the field has a meaningful/non-null value" — a document with `{"phone": null}` satisfies `$exists: true`.',
      'Writing a long chain of `$or` conditions on the SAME field instead of the clearer, equivalent `$in`.',
    ],
    followUpQuestions: [
      'Walk through exactly why a bare dot-path multi-condition query on an array of sub-documents can produce a false-positive match, with a concrete counter-example document.',
      'How would you query for documents where an array field is EMPTY versus does not exist at all?',
      'How does `$all` differ from `$elemMatch` when the array contains scalar values rather than sub-documents?',
    ],
    relatedTopics: ['Query Operators', '$elemMatch', '$all', '$in', 'Array Matching', 'Nested Documents'],
  },
  {
    id: 'python-m19-7',
    number: 'PY-M19-7',
    title: 'Update operators — $set, $inc, array updates, and upserts',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Update Operations',
    expectedAnswer:
      '`updateOne`/`updateMany` modify existing fields using update operators (`$set`, `$unset`, `$inc`, `$mul`, `$min`, `$max`, `$rename`, `$currentDate`) rather than replacing the whole document, and support ARRAY-specific operators (`$push`, `$pop`, `$pull`, `$addToSet`) for modifying array fields in place. `upsert: true` makes the operation insert a new document (built from the query filter plus the update) if no document matches, atomically handling the common "create if it doesn\'t exist, otherwise update" pattern.',
    deepExplanation:
      '```python\n# $set / $inc / $currentDate — partial field updates, NOT a full document replace\ndb.products.update_one(\n    {"_id": product_id},\n    {\n        "$set": {"name": "Gaming Laptop", "in_stock": True},\n        "$inc": {"view_count": 1},          # atomically increments — safe under concurrent writers, see below\n        "$currentDate": {"updated_at": True},\n    },\n)\n\n# $min / $max — only apply if the new value is actually lower/higher, atomically\ndb.products.update_one({"_id": product_id}, {"$max": {"highest_price_seen": 1299.00}})\n\n# array operators\ndb.products.update_one({"_id": product_id}, {"$push": {"tags": "sale"}})                 # append one value\ndb.products.update_one({"_id": product_id}, {"$addToSet": {"tags": "sale"}})              # append only if NOT already present (no duplicates)\ndb.products.update_one({"_id": product_id}, {"$pull": {"tags": "discontinued"}})          # remove all matching elements\ndb.products.update_one({"_id": product_id}, {"$pop": {"tags": 1}})                        # remove the LAST element (-1 removes the first)\n\n# positional $ operator — update the FIRST array element that matched the query filter\ndb.orders.update_one(\n    {"_id": order_id, "items.product_id": "p123"},\n    {"$set": {"items.$.quantity": 5}}       # updates ONLY the matched item, not the whole array\n)\n\n# arrayFilters — update ALL (or specifically identified) array elements matching a condition\ndb.orders.update_one(\n    {"_id": order_id},\n    {"$set": {"items.$[elem].shipped": True}},\n    array_filters=[{"elem.status": "packed"}]   # update every item where status == \"packed\"\n)\n\n# upsert — atomically \"create if missing, otherwise update\" (avoids a race-prone check-then-write)\ndb.page_views.update_one(\n    {"page": "/pricing", "date": "2026-01-15"},\n    {"$inc": {"views": 1}},\n    upsert=True,\n)\n```\n\nWhy `$inc` (and `$min`/`$max`) matter for CONCURRENCY specifically: `$inc` is an ATOMIC, server-side increment — two concurrent requests both calling `update_one({"_id": x}, {"$inc": {"view_count": 1}})` will correctly result in `view_count` increasing by exactly 2, with no lost update, because MongoDB applies the increment atomically at the document level. Contrast this with the WRONG approach of reading the current value in application code, adding 1 in Python, then writing the new value back with `$set` — that pattern has a classic read-modify-write RACE CONDITION where two concurrent requests can both read the same starting value and one increment gets silently lost.\n\nThe positional `$` operator updates only the FIRST array element matching the query\'s array condition; `arrayFilters` with the `$[identifier]` syntax is needed when you must update MULTIPLE matching elements (or a specifically identified one when several conditions could otherwise match) in a single atomic update call.',
    productionExample:
      'A page-view counter uses `update_one({"page": ..., "date": ...}, {"$inc": {"views": 1}}, upsert=True)` as a single atomic call handling both "first view of the day for this page" (creates the document) and "another view" (increments the existing document) — eliminating an entire class of race conditions and extra round trips a naive "check if exists, then insert or update" implementation would otherwise require.',
    bestPractices: [
      'Always use `$inc`/`$mul`/`$min`/`$max` for numeric updates that depend on the CURRENT value, rather than reading a value into application code and writing it back — the atomic operator eliminates the read-modify-write race condition entirely.',
      'Use `upsert=True` for "create if missing, else update" logic instead of a manual find-then-insert-or-update sequence, which is both slower (extra round trip) and race-prone under concurrent requests.',
      'Reach for `arrayFilters` (`$[identifier]`) when you need to update potentially MULTIPLE matching array elements in one call — the plain positional `$` operator only ever touches the first match.',
    ],
    tradeOffs:
      'Atomic update operators (`$inc`, `$push`, `arrayFilters`) push more logic into the DATABASE query itself (more complex update documents to write and reason about) in exchange for eliminating entire classes of application-level race conditions — the alternative (read into Python, modify, write back) is simpler to write per-call but is only safe under the assumption of no concurrent writers, which is rarely a safe assumption in a real production service.',
    commonMistakes: [
      'Implementing a counter/increment by reading the current value in application code, adding to it, and writing it back with `$set`, introducing a lost-update race condition under concurrent requests.',
      'Using the plain positional `$` operator when multiple array elements actually need updating, silently updating only the first match and leaving the others unchanged.',
      'Forgetting `upsert=True` on an update intended to double as a create, and instead writing brittle, race-prone "check if exists, then branch" application logic.',
    ],
    followUpQuestions: [
      'Walk through exactly how `$inc` avoids the lost-update race condition that a manual read-then-write increment has under concurrent requests.',
      'What is the difference between the positional `$` operator and `arrayFilters` with `$[identifier]`, concretely?',
      'How would `upsert: true` behave if the query filter itself contains operators like `$gt` — what fields actually end up in the newly inserted document?',
    ],
    relatedTopics: ['Update Operators', '$inc', '$push', 'Upsert', 'Array Filters', 'Race Conditions', 'Atomicity'],
  },
  {
    id: 'python-m19-8',
    number: 'PY-M19-8',
    title: 'Delete operations, soft delete design, and safe bulk deletion',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Delete Operations',
    expectedAnswer:
      '`deleteOne`/`deleteMany` permanently remove matching documents (a "hard delete") and, like update operations, require a filter — an empty or overly broad filter passed to `deleteMany` is one of the most dangerous, easy-to-make production mistakes. A SOFT delete (setting an `is_deleted: true` / `deleted_at: <timestamp>` field instead of actually removing the document) is the standard production alternative when audit history, recoverability, or referential consistency with other collections matters more than reclaiming storage immediately.',
    deepExplanation:
      '```python\n# hard delete — permanently removes the document(s); THINK CAREFULLY before running deleteMany\ndb.sessions.delete_one({"_id": session_id})\ndb.sessions.delete_many({"expires_at": {"$lt": datetime.now(timezone.utc)}})   # always scope with a real filter\n\n# soft delete pattern — the document stays, marked as logically deleted\ndb.products.update_one(\n    {"_id": product_id},\n    {"$set": {"is_deleted": True, "deleted_at": datetime.now(timezone.utc)}}\n)\n\n# every "normal" read path must now consistently EXCLUDE soft-deleted documents\ndb.products.find({"is_deleted": {"$ne": True}})\n\n# restoring a soft-deleted document is simply unsetting the flag — impossible after a hard delete\ndb.products.update_one({"_id": product_id}, {"$set": {"is_deleted": False}, "$unset": {"deleted_at": ""}})\n```\n\nSoft delete tradeoffs, precisely: ADVANTAGES — recoverability (undelete is trivial), audit trail (you can see WHEN and, with an added `deleted_by` field, WHO deleted something), and referential safety (other collections that reference this document\'s `_id` via `$lookup`/manual joins do not suddenly point at nothing). DISADVANTAGES — every single read query in the ENTIRE codebase must now remember to filter out soft-deleted documents (a single forgotten filter is a real, recurring bug class), the collection grows unboundedly unless a separate archival/purge job eventually hard-deletes old soft-deleted records, and UNIQUE indexes become awkward (if `email` has a unique index, a soft-deleted user cannot be "replaced" by a new signup with the same email without special handling, e.g. a PARTIAL unique index scoped to `is_deleted: false` only).\n\n```javascript\n// a partial index solves the "unique constraint conflicts with soft-deleted rows" problem directly:\n// uniqueness is enforced ONLY among non-deleted documents\ndb.users.createIndex(\n  { email: 1 },\n  { unique: true, partialFilterExpression: { is_deleted: { $ne: true } } }\n)\n```\n\nSafe bulk deletion in production practice: never run an unscoped or loosely-scoped `deleteMany` directly against production without first running the EQUIVALENT `find`/`countDocuments` query to confirm exactly how many/which documents would be affected — a filter typo (e.g. `{"status": "expired"}` when you meant `{"status": {"$ne": "active"}}`, which is a much broader match) can silently delete far more than intended.',
    productionExample:
      'An e-commerce platform uses soft delete (`is_deleted`/`deleted_at`) for `products` (a discontinued product must remain visible in historical order records and past-order `$lookup` joins) but a genuine hard delete for `sessions`/expired auth tokens (no audit or recovery value, and unbounded accumulation would be pure storage waste) — the two different deletion strategies applied deliberately per collection based on the actual business need for recoverability versus the cost of indefinite accumulation.',
    bestPractices: [
      'Choose hard delete vs soft delete PER COLLECTION based on whether recoverability/audit history/referential safety genuinely matters for that data — do not apply one strategy blanket-wide without considering the specific collection\'s needs.',
      'Use a PARTIAL unique index (`partialFilterExpression: {is_deleted: {$ne: true}}`) when combining soft delete with a uniqueness constraint, so a new document can reuse a value "freed" by an earlier soft-deleted one.',
      'Before running any `deleteMany` in production, first run the equivalent `find`/`countDocuments` with the SAME filter to confirm the exact scope of what will be deleted.',
    ],
    tradeOffs:
      'Soft delete buys recoverability and audit trail at the cost of EVERY read path in the codebase needing to consistently remember an exclusion filter (a real, recurring bug surface) and unbounded collection growth requiring a separate archival strategy — hard delete is simpler to reason about and keeps collections lean, but is permanent and offers no recovery path if a delete turns out to have been a mistake.',
    commonMistakes: [
      'Running `deleteMany` with a filter that is broader than intended (or, worst case, an accidentally empty `{}` filter matching every document), permanently destroying data with no recovery path.',
      'Implementing soft delete but forgetting to add the exclusion filter to one or more read paths, causing "deleted" records to still appear somewhere in the application.',
      'Adding a soft-delete flag alongside an existing plain unique index without switching to a partial index, causing new documents to be rejected because they collide with an old, logically-deleted (but still physically present) document.',
    ],
    followUpQuestions: [
      'How would you design an automated process to eventually hard-delete soft-deleted records after a retention period, without breaking historical references in other collections?',
      'How does a partial unique index solve the "soft-deleted document blocks a new document with the same unique value" problem, mechanically?',
      'What safeguards (application-level or database-level) would you put in place to prevent an accidental unscoped `deleteMany` in production?',
    ],
    relatedTopics: ['deleteOne', 'deleteMany', 'Soft Delete', 'Partial Index', 'Data Recovery', 'Auditing'],
  },
  {
    id: 'python-m19-9',
    number: 'PY-M19-9',
    title: 'Querying nested documents and dot notation',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Nested Documents',
    expectedAnswer:
      'MongoDB queries fields inside an embedded (nested) sub-document using DOT NOTATION (`"address.city"`), which works identically for filtering, projection, sorting, and updates — no special join or subquery syntax is needed since the nested data lives inside the same physical document.',
    deepExplanation:
      'Given `{ "name": "John", "address": { "city": "Chennai", "country": "India", "zip": "600001" } }`:\n\n```javascript\n// filter on a nested field — dot notation, as a plain string key\ndb.users.find({ "address.city": "Chennai" })\n\n// filter on MULTIPLE nested fields at once (implicit AND, as with top-level fields)\ndb.users.find({ "address.city": "Chennai", "address.country": "India" })\n\n// project only a specific nested field\ndb.users.find({ "address.city": "Chennai" }, { name: 1, "address.city": 1 })\n\n// update a nested field in place\ndb.users.update_one({ _id: user_id }, { "$set": { "address.zip": "600002" } })\n\n// sort by a nested field\ndb.users.find().sort({ "address.city": 1 })\n```\n\nA critical, frequently-tested distinction: querying `{ "address.city": "Chennai" }` (dot notation, matching a specific nested field) is fundamentally DIFFERENT from querying `{ "address": { "city": "Chennai" } }` (matching the ENTIRE embedded sub-document by exact equality) — the second form would FAIL to match the example document above, because it requires `address` to be EXACTLY `{ "city": "Chennai" }` with no other fields (`country`, `zip`) present at all. This "exact whole-object equality vs dot-path field match" distinction is one of the most common sources of "why doesn\'t my nested query match" confusion for developers new to MongoDB.\n\nIn Python (PyMongo), dot-notation keys are simply passed as regular string dictionary keys — there is no special syntax beyond using the dotted string:\n\n```python\ndb.users.find_one({"address.city": "Chennai"})\ndb.users.update_one({"_id": user_id}, {"$set": {"address.zip": "600002"}})\n```\n\nIndexing nested fields works the same way — `db.users.createIndex({"address.city": 1})` creates a standard single-field index on the nested value, usable exactly like an index on a top-level field for equality/range queries and sorts.',
    productionExample:
      'A user-search feature filtering by city (`{"address.city": "Chennai"}`) with a supporting index on `address.city` performs identically well to filtering on a top-level field — the fact that the data happens to be nested inside an `address` sub-document has essentially zero query-time cost difference from a flat schema, once the correct dot-notation index is in place.',
    bestPractices: [
      'Use dot notation (`"parent.child"`) for filtering/projecting/sorting/updating a specific nested field, never exact whole-sub-document equality unless you genuinely intend to match the ENTIRE nested object including every field.',
      'Index nested fields exactly as you would top-level fields (`{"address.city": 1}`) when they are queried/sorted frequently — nesting does not exempt a field from needing an index for performance.',
      'Keep nesting reasonably shallow (2-3 levels is usually the practical ceiling for comfortable querying/indexing) — very deep nesting makes both application code and index design increasingly awkward.',
    ],
    tradeOffs:
      'Dot-notation queries on nested fields are just as indexable and performant as top-level fields, but deeply nested structures make PROJECTION and PARTIAL UPDATES more verbose to write correctly (every dot-path must be spelled out precisely), and can make schema evolution (renaming/restructuring a nested field) more error-prone across a large codebase than an equivalent flat-field change would be.',
    commonMistakes: [
      'Querying `{"address": {"city": "Chennai"}}` expecting it to match on just the city, when it actually requires the ENTIRE `address` sub-document to equal exactly `{"city": "Chennai"}` with no other fields.',
      'Forgetting to index a frequently-queried nested field, assuming (incorrectly) that nesting alone changes how indexing works.',
      'Over-nesting data several levels deep "because it feels organized", making both queries and code that constructs/reads the structure unnecessarily verbose and fragile.',
    ],
    followUpQuestions: [
      'Why does `{"address": {"city": "Chennai"}}` fail to match a document whose address also has a `country` field, while `{"address.city": "Chennai"}` succeeds?',
      'How would you query for a nested field being present regardless of its parent object\'s other contents?',
      'How does indexing a nested field differ (if at all) from indexing a top-level field, in terms of index creation syntax and query-plan behavior?',
    ],
    relatedTopics: ['Nested Documents', 'Dot Notation', 'Embedded Documents', 'Indexing', 'Query Filters'],
  },
  {
    id: 'python-m19-10',
    number: 'PY-M19-10',
    title: 'Projection — including/excluding fields and why it matters for performance',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Projection',
    expectedAnswer:
      'A projection (the second argument to `find`) controls WHICH fields are returned per document: an INCLUSION projection (`{name: 1, email: 1}`) returns ONLY the listed fields (plus `_id` unless explicitly excluded), while an EXCLUSION projection (`{password_hash: 0}`) returns every field EXCEPT the listed ones — the two styles cannot generally be mixed (with the sole exception of explicitly excluding `_id` alongside an inclusion projection). Projecting only needed fields reduces network payload size and, when the projected fields are fully covered by an index, can let MongoDB satisfy the query without touching the underlying documents at all (a "covered query", detailed further in Module 20).',
    deepExplanation:
      '```javascript\n// inclusion projection — ONLY name and email are returned (plus _id, unless excluded)\ndb.users.find({}, { name: 1, email: 1 })\n\n// excluding just _id while otherwise including specific fields IS allowed (the one mixing exception)\ndb.users.find({}, { name: 1, email: 1, _id: 0 })\n\n// exclusion projection — every field EXCEPT password_hash is returned\ndb.users.find({}, { password_hash: 0 })\n\n// INVALID — cannot mix inclusion and exclusion for non-_id fields in the same projection\n// db.users.find({}, { name: 1, password_hash: 0 })  -> error\n```\n\nIn Python (PyMongo), the projection is passed the same way as the second positional argument or `projection=` keyword:\n\n```python\ndb.users.find({}, {"name": 1, "email": 1, "_id": 0})\n```\n\nWhy projection matters for PERFORMANCE, concretely: (1) NETWORK — a document with a large embedded array or binary blob field, fetched thousands of times per second by an endpoint that only actually needs `name`/`email`, wastes substantial bandwidth and driver-side deserialization work if the full document is transferred every time; (2) COVERED QUERIES — if every field referenced in BOTH the query filter and the projection is present in a single index, MongoDB can answer the entire query directly from the INDEX structure without ever reading the underlying document from the collection\'s data files (a "covered query"), which is dramatically faster, especially when the working set exceeds available cache; (3) SECURITY/CORRECTNESS — explicitly excluding sensitive fields (`password_hash`, internal-only fields) at the QUERY level, in addition to filtering them out in the API response schema, gives DEFENSE IN DEPTH — even if a developer forgets to strip a field in the Pydantic response model, it was never fetched from the database in the first place.',
    productionExample:
      'A user-list API endpoint that originally did `db.users.find({})` with no projection (returning full documents including `password_hash`, internal `audit_log` arrays, and other large fields never used by that endpoint) was optimized to `db.users.find({}, {"name": 1, "email": 1, "status": 1})` — cutting the average document payload size by over 90% and meaningfully reducing both network transfer time and driver-side BSON deserialization overhead for a high-traffic listing page.',
    bestPractices: [
      'Always project only the fields the specific query actually needs, especially for high-traffic or high-volume endpoints — do not habitually fetch full documents "just in case".',
      'Use projection to exclude sensitive fields (`password_hash`, internal secrets) as DEFENSE IN DEPTH, in addition to (never instead of) filtering them out in the API response schema.',
      'When chasing maximum read performance on a hot query, check whether the query filter + projection fields can be fully satisfied by a single index (a "covered query"), avoiding a document fetch entirely.',
    ],
    tradeOffs:
      'Aggressive, endpoint-specific projections reduce network/deserialization overhead and add a layer of defense-in-depth for sensitive fields, at the cost of needing to maintain MORE DISTINCT projection shapes across the codebase (one per actual use case) rather than always fetching and reusing one "full" document shape everywhere — a reasonable tradeoff for hot paths, often not worth the extra code for low-traffic internal/admin queries.',
    commonMistakes: [
      'Fetching full documents by default everywhere ("just in case a field is needed later"), unnecessarily bloating network payloads and deserialization cost on high-traffic endpoints.',
      'Attempting to mix inclusion and exclusion styles in one projection (beyond the single `_id: 0` exception) and being confused by the resulting error.',
      'Relying SOLELY on the API response schema to hide sensitive fields, when also excluding them at the query/projection level would provide a meaningfully stronger defense-in-depth guarantee.',
    ],
    followUpQuestions: [
      'What is a "covered query", and what specifically needs to be true about the query filter, projection, and available indexes for MongoDB to satisfy a query without touching the underlying document?',
      'Why can you mix `_id: 0` into an otherwise-inclusion projection, but not any other exclusion alongside inclusions?',
      'How would you design a repository method\'s API so that different callers can request different projections without duplicating query logic?',
    ],
    relatedTopics: ['Projection', 'Covered Query', 'Performance', 'Security', 'find()'],
  },
  {
    id: 'python-m19-11',
    number: 'PY-M19-11',
    title: 'Sorting, and why sort performance depends entirely on indexes',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Sorting',
    expectedAnswer:
      '`.sort({field: 1 | -1})` orders results ascending (`1`) or descending (`-1`); MongoDB can satisfy a sort EFFICIENTLY (by walking the index in order, requiring no separate in-memory sort step) ONLY if a matching index exists on the sort field(s) in a compatible order — without one, MongoDB must load all matching documents into memory and sort them there, which is both slower and subject to a hard 100MB memory limit (`allowDiskUse` can spill to disk for aggregation sorts, but a plain `find().sort()` without a supporting index simply errors out past that limit).',
    deepExplanation:
      '```javascript\n// with a supporting index on { created_at: -1 }, this sort is essentially FREE —\n// MongoDB just walks the index in its natural (already-sorted) order\ndb.orders.createIndex({ created_at: -1 })\ndb.orders.find({ status: "shipped" }).sort({ created_at: -1 })\n\n// WITHOUT a supporting index, MongoDB must fetch all matching documents into\n// memory and perform an in-memory sort (visible in .explain() as a "SORT" stage)\ndb.orders.find({ status: "shipped" }).sort({ shipped_weight: -1 })   // no index on shipped_weight\n```\n\nA compound index can support BOTH a filter AND a sort in a single index scan, if the field order is right — this is exactly what the ESR (Equality, Sort, Range) guideline from Module 20 formalizes:\n\n```javascript\n// this compound index supports BOTH the equality filter on status\n// AND the sort by created_at, in ONE index scan, with zero in-memory sort step\ndb.orders.createIndex({ status: 1, created_at: -1 })\ndb.orders.find({ status: "shipped" }).sort({ created_at: -1 })   // fully index-satisfied\n```\n\nThe 100MB in-memory sort limit is a hard, real production constraint worth knowing precisely: a `find().sort()` on an unindexed field, over a result set requiring more than 100MB to sort in memory, will raise an error (`Sort exceeded memory limit`) rather than silently degrading — this is MongoDB deliberately protecting server memory from unbounded operations, and the correct fix is ALWAYS adding the right supporting index, not increasing a memory limit (which for aggregation pipelines can be worked around with `allowDiskUse: true`, at a significant performance cost, but is not even available as an option for a plain `find().sort()`).\n\nSort direction interoperability: an index on `{field: 1}` (ascending) can ALSO efficiently satisfy a DESCENDING sort on that same field — MongoDB can walk a B-tree-style index in either direction with equal efficiency, so you generally do not need separate ascending AND descending indexes on the same single field just to support both sort directions (this becomes more nuanced for COMPOUND indexes with mixed directions across fields, covered in Module 20).',
    productionExample:
      'A "recent orders" admin dashboard query (`find({status: "shipped"}).sort({created_at: -1}).limit(50)`) that lacked a supporting compound index worked fine in development (small dataset, in-memory sort was cheap) but began throwing `Sort exceeded memory limit` errors in production once the orders collection grew past a few million documents — adding `createIndex({status: 1, created_at: -1})` eliminated the in-memory sort entirely and fixed both the error and the query\'s latency.',
    bestPractices: [
      'Build a supporting index for any sort used on a query against a large or growing collection — never rely on an in-memory sort scaling gracefully as data grows.',
      'When a query both filters and sorts, design ONE compound index that supports both operations together (following the ESR guideline covered in Module 20), rather than separate single-field indexes for the filter and the sort.',
      'Watch for "Sort exceeded memory limit" errors as a direct, unambiguous signal that a supporting index is missing — the fix is always adding the correct index, not raising a memory ceiling.',
    ],
    tradeOffs:
      'An index-satisfied sort is dramatically faster and has no memory ceiling risk, but every additional index also adds write overhead (every insert/update/delete must maintain it) and storage/cache memory cost — the right number and shape of sort-supporting indexes should be driven by actual, observed hot query patterns, not applied preemptively to every field that might conceivably be sorted on someday.',
    commonMistakes: [
      'Sorting on a field with no supporting index and being surprised by either poor performance or an outright "Sort exceeded memory limit" error once the collection grows past development-scale data volumes.',
      'Creating separate single-field indexes for a filter field and a sort field instead of one compound index that supports both together in a single index scan.',
      'Assuming an ascending index cannot efficiently support a descending sort on the same field — MongoDB (like a B-tree generally) can traverse the index structure in either direction.',
    ],
    followUpQuestions: [
      'Why does a single-field ascending index efficiently support both ascending AND descending sorts on that field, but this gets more nuanced for compound indexes?',
      'What options exist if you genuinely need to sort a very large result set on a field where adding an index is not feasible (hint: aggregation pipeline with `allowDiskUse`, though at a real performance cost)?',
      'How would `.explain()` reveal whether a given `find().sort()` query is using an index-satisfied sort versus an in-memory SORT stage?',
    ],
    relatedTopics: ['Sorting', 'Indexes', 'Compound Indexes', 'Performance', 'Memory Limits'],
  },
  {
    id: 'python-m19-12',
    number: 'PY-M19-12',
    title: 'Pagination — why skip()/limit() gets slow, and cursor/_id-based pagination',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Pagination',
    expectedAnswer:
      '`skip(n).limit(m)` (offset pagination) has the exact same fundamental scaling problem in MongoDB as `OFFSET` does in PostgreSQL: MongoDB must still walk past and discard the first `n` matching documents on every request, so `skip(100000)` does real, wasted work proportional to the offset, regardless of the index in use. Cursor (keyset) pagination — filtering `{_id: {$gt: last_seen_id}}` (or a compound cursor on a sort field plus `_id` as a tiebreaker) instead of skipping — turns pagination into an O(page size) operation independent of how deep into the result set you are, exactly mirroring the equivalent PostgreSQL technique.',
    deepExplanation:
      '```python\n# offset pagination — O(skip + limit) work on every single request, gets progressively slower\ndef list_products_offset(page: int, page_size: int = 20):\n    skip_count = (page - 1) * page_size\n    return list(db.products.find().sort("_id", 1).skip(skip_count).limit(page_size))\n\n# cursor (keyset) pagination using the built-in, naturally-sortable ObjectId — O(page size), constant regardless of depth\ndef list_products_cursor(after_id: str | None, page_size: int = 20):\n    query = {}\n    if after_id is not None:\n        query["_id"] = {"$gt": ObjectId(after_id)}\n    results = list(db.products.find(query).sort("_id", 1).limit(page_size))\n    next_cursor = str(results[-1]["_id"]) if results else None\n    return results, next_cursor\n\n# cursor pagination on a NON-_id sort field requires a compound cursor with a tiebreaker,\n# exactly like the PostgreSQL keyset pattern in Module 15\ndef list_products_by_price(after: tuple[float, str] | None, page_size: int = 20):\n    query = {}\n    if after is not None:\n        after_price, after_id = after\n        query["$or"] = [\n            {"price": {"$gt": after_price}},\n            {"price": after_price, "_id": {"$gt": ObjectId(after_id)}},\n        ]\n    return list(db.products.find(query).sort([("price", 1), ("_id", 1)]).limit(page_size))\n```\n\nWhy `skip()` is expensive, mechanically: even walking a perfect index, MongoDB\'s query execution still has to advance the CURSOR past the first `skip` matching index entries one by one before it can start returning documents — there is no way to jump directly to "the 100,000th matching document" the same way you cannot jump to "logical row 100,000" in a B-tree without literally counting through it. The DEEPER the skip value, the more wasted, discarded work every single request performs, even though the eventual `limit` only returns a small page.\n\nWhy `{_id: {$gt: last_seen_id}}` avoids this entirely: this is a genuine, sargable RANGE query — the index on `_id` (which exists by default on every collection) lets MongoDB seek DIRECTLY to the correct starting point via a normal indexed range scan, with cost proportional only to the page size requested, completely independent of how many pages have been consumed before it. This is the exact same underlying reasoning as PostgreSQL keyset pagination (Module 15) — the technique generalizes across relational and document databases because it addresses the SAME fundamental limitation (indexes cannot jump to an arbitrary ordinal position, only to a specific VALUE).\n\nThe practical tradeoff, precisely as in PostgreSQL: cursor pagination cannot jump directly to "page 47" — it only supports "give me the next page after this cursor" — which is the correct fit for infinite scroll and most production API pagination, but not for a UI that specifically needs numbered page-jump navigation over a large, frequently-changing dataset.',
    productionExample:
      'A product catalog API originally used `skip`/`limit` and measured response times climbing from ~15ms on page 1 to over 3 seconds by page 500 on a multi-million-document collection — switching to `_id`-based cursor pagination brought EVERY page back to a consistent ~15ms, since each request became a simple indexed range scan (`{_id: {$gt: cursor}}`) regardless of how deep into the catalog the client had paged.',
    bestPractices: [
      'Default to cursor (`_id`-based, or compound-field-plus-`_id`) pagination for any large, growing, or publicly-facing collection — reserve `skip`/`limit` for small, shallow, bounded result sets (e.g. an admin table capped at a few hundred rows).',
      'When paginating by a non-`_id` sort field, always include `_id` as a tiebreaker in both the sort and the cursor comparison, to guarantee a stable order when the sort field has duplicate values.',
      'Build (or rely on the default `_id`) an index matching the exact cursor/sort fields so the cursor query can be satisfied by a pure indexed range scan.',
    ],
    tradeOffs:
      'Cursor pagination gives consistent, scale-independent performance but gives up true "jump to page N" random access — for admin UIs that genuinely require numbered page navigation over a large dataset, a common compromise is capping `skip`-based pagination to a shallow maximum depth (e.g. "only the first 20 pages are directly jumpable, beyond that use next/previous cursor navigation") rather than allowing truly unbounded offset depth.',
    commonMistakes: [
      'Using `skip`/`limit` pagination on a large, growing, publicly-facing collection and being surprised when deep-page requests become slow or time out under real traffic.',
      'Implementing a cursor on a non-unique sort field without an `_id` tiebreaker, causing documents with duplicate sort-field values to be skipped or duplicated across page boundaries.',
      'Assuming `_id`-based pagination automatically "just works" for any sort order — it only directly supports sorting BY `_id`; sorting by another field needs a compound cursor as shown above.',
    ],
    followUpQuestions: [
      'Why can an index not "jump" directly to the Nth matching document the way an array can jump to index N?',
      'How would you build a compound cursor for a query that sorts by `created_at DESC, _id DESC` together, including handling ties on `created_at`?',
      'How would you support an "approximate page count" UI feature on top of a fully cursor-paginated API, if product requirements demanded it?',
    ],
    relatedTopics: ['Pagination', 'Cursor Pagination', 'skip/limit', 'ObjectId', 'Indexes', 'Performance'],
  },
  {
    id: 'python-m19-13',
    number: 'PY-M19-13',
    title: 'countDocuments vs estimatedDocumentCount, and distinct()',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Counting & Distinct',
    expectedAnswer:
      '`countDocuments(filter)` returns an EXACT count by actually executing the query (scanning matching documents or a supporting index) and supports an arbitrary filter, while `estimatedDocumentCount()` returns a fast, APPROXIMATE total-collection count derived directly from the collection\'s stored metadata (no scan at all) but does NOT accept a filter — the two exist because "how many documents match this specific condition" and "roughly how many documents are in this collection" are genuinely different questions with very different performance characteristics.',
    deepExplanation:
      '```python\n# exact count of documents matching a filter — actually executes the query\nactive_user_count = db.users.count_documents({"status": "active"})\n\n# exact count of the WHOLE collection is still possible, just pass an empty filter —\n# but this STILL performs a real scan/count operation, unlike estimatedDocumentCount\ntotal_count = db.users.count_documents({})\n\n# fast, approximate total collection count from stored metadata — no filter argument, no scan\napprox_total = db.users.estimated_document_count()\n\n# distinct — unique values of a field across the collection (optionally filtered)\ndistinct_countries = db.users.distinct("country")\ndistinct_active_countries = db.users.distinct("country", {"status": "active"})\n```\n\nWhen to use which, precisely: use `estimated_document_count()` for a dashboard/UI element like "~1.2M users" where perfect accuracy is unnecessary and speed matters (it is essentially instantaneous regardless of collection size, since it reads pre-maintained collection statistics rather than counting anything live); use `count_documents(filter)` whenever you need an EXACT number for a SPECIFIC condition (e.g. "how many orders does this customer have" for a business decision, or a paginated API\'s "total matching results" field) — accepting that it costs real query execution time proportional to how efficiently the filter can be satisfied by an index.\n\nA historical note worth knowing for interviews: older MongoDB driver versions exposed a single `count()` method that was DEPRECATED specifically because it conflated these two very different use cases (and had subtly inconsistent behavior with certain filter/index combinations) — modern PyMongo has intentionally split this into the two clearly-named, clearly-scoped methods above, and `count()` should be treated as a legacy pattern not to be used in new code.\n\n`distinct()` returns the unique VALUES of a field (not counts per value — for that, you need an aggregation `$group` with `$addToSet`/`COUNT`, covered in Module 20) and, like `countDocuments`, benefits enormously from a supporting index on the target field — without one, it must scan every matching document to collect the unique value set.',
    productionExample:
      'A user-facing dashboard shows "Over 2 million users" (using `estimated_document_count()`, essentially free) while an internal admin report showing "how many users signed up in the last 30 days" correctly uses `count_documents({"created_at": {"$gte": thirty_days_ago}})` — accepting the real query cost because that number needs to be exact and reflects a genuinely filtered condition that estimated counts cannot express at all.',
    bestPractices: [
      'Use `estimated_document_count()` for any UI/dashboard display of an approximate TOTAL collection size where speed matters more than perfect precision.',
      'Use `count_documents(filter)` whenever an exact count of a SPECIFIC filtered condition is genuinely required, and ensure the filter fields are indexed if this runs on a hot path.',
      'Never use the legacy, deprecated `count()` method in new code — always reach for the explicitly-named `count_documents`/`estimated_document_count` split.',
    ],
    tradeOffs:
      '`estimated_document_count()` is essentially free (reads pre-maintained metadata) but gives up both filtering ability and perfect real-time accuracy (the underlying statistics can lag slightly behind the true live count); `count_documents(filter)` is exact and flexible but costs real query time that scales with how selectively the filter can be satisfied by an index — choosing the wrong one for a given use case either wastes real query performance on a number that did not need to be exact, or silently returns an unfiltered/imprecise number where an exact filtered count was actually required.',
    commonMistakes: [
      'Calling `count_documents({})` on a very large collection purely to display an approximate "total users" UI number, paying real scan cost for a use case `estimated_document_count()` would serve essentially for free.',
      'Attempting to pass a filter to `estimated_document_count()` (it does not accept one) and being confused when the method signature does not support the intended use case.',
      'Continuing to use the legacy, deprecated `count()` method out of habit or outdated tutorials/examples, rather than the modern explicit `count_documents`/`estimated_document_count` split.',
    ],
    followUpQuestions: [
      'Why can `estimated_document_count()` return a number that is not perfectly in sync with the true live count of documents in the collection?',
      'How would you get a count of DISTINCT VALUES with their occurrence counts (not just the list of unique values), and why does `distinct()` alone not give you that?',
      'What indexing strategy would you use to make a frequent, filtered `count_documents()` call on a hot API path fast?',
    ],
    relatedTopics: ['countDocuments', 'estimatedDocumentCount', 'distinct', 'PyMongo', 'Performance'],
  },
  {
    id: 'python-m19-14',
    number: 'PY-M19-14',
    title: 'Coding: a mini Products API — CRUD, nested/array queries, projection, and cursor pagination in Python',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'MongoDB Coding',
    expectedAnswer:
      'A realistic "mini products" exercise combines this module\'s core skills end to end: PyMongo CRUD, filtering on nested fields and arrays, a scoped projection, and `_id`-based cursor pagination for the list operation — the kind of code that directly backs a typical product-catalog API endpoint.',
    deepExplanation:
      '```python\nfrom datetime import datetime, timezone\nfrom bson import ObjectId\nfrom pymongo import MongoClient\nfrom pymongo.collection import Collection\n\nclient = MongoClient("mongodb://localhost:27017")\nproducts: Collection = client["shop"]["products"]\nproducts.create_index([("category", 1), ("_id", 1)])   # supports the filtered, cursor-paginated list query\nproducts.create_index([("tags", 1)])                     # supports array-tag lookups (multikey index)\n\n# --- create ---\ndef create_product(name: str, price: float, category: str, tags: list[str]) -> str:\n    result = products.insert_one({\n        "name": name,\n        "price": price,\n        "category": category,\n        "tags": tags,\n        "specs": {"weight_kg": None, "warranty_years": 1},   # nested sub-document\n        "created_at": datetime.now(timezone.utc),\n    })\n    return str(result.inserted_id)\n\n# --- read one, with a scoped projection ---\ndef get_product(product_id: str) -> dict | None:\n    if not ObjectId.is_valid(product_id):\n        return None\n    doc = products.find_one(\n        {"_id": ObjectId(product_id)},\n        {"name": 1, "price": 1, "category": 1, "tags": 1, "specs.warranty_years": 1},\n    )\n    if doc:\n        doc["_id"] = str(doc["_id"])\n    return doc\n\n# --- filtered, cursor-paginated list, including an array (tag) filter ---\ndef list_products(category: str, tag: str | None, after_id: str | None, page_size: int = 20) -> dict:\n    query: dict = {"category": category}\n    if tag:\n        query["tags"] = tag                          # matches if tag is anywhere in the tags array\n    if after_id:\n        query["_id"] = {"$gt": ObjectId(after_id)}\n    docs = list(\n        products.find(query, {"name": 1, "price": 1, "tags": 1})\n        .sort("_id", 1)\n        .limit(page_size)\n    )\n    for doc in docs:\n        doc["_id"] = str(doc["_id"])\n    next_cursor = docs[-1]["_id"] if len(docs) == page_size else None\n    return {"items": docs, "next_cursor": next_cursor}\n\n# --- update: adjust price and add a tag atomically ---\ndef update_product(product_id: str, new_price: float, add_tag: str) -> bool:\n    result = products.update_one(\n        {"_id": ObjectId(product_id)},\n        {"$set": {"price": new_price}, "$addToSet": {"tags": add_tag}},\n    )\n    return result.matched_count == 1\n\n# --- soft delete ---\ndef delete_product(product_id: str) -> bool:\n    result = products.update_one(\n        {"_id": ObjectId(product_id)},\n        {"$set": {"is_deleted": True, "deleted_at": datetime.now(timezone.utc)}},\n    )\n    return result.matched_count == 1\n```\n\nAPI-shaped example (as this would be called from a FastAPI endpoint layered on top):\n\n```text\nRequest:  create a product\nInput:    name="Laptop", price=999.0, category="electronics", tags=["computer", "work"]\nOutput:   "65f1a2b3c4d5e6f7a8b9c0d1"   (the new product\'s _id as a string)\n\nRequest:  list electronics tagged "work", first page\nOutput:   {"items": [{"_id": "65f1...", "name": "Laptop", "price": 999.0, "tags": [...]}], "next_cursor": null}\n```',
    productionExample:
      'This exact function shape — CRUD + array/nested filtering + scoped projection + `_id` cursor pagination — is what a production MongoDB repository layer looks like at the DATA-ACCESS level before a service/router layer wraps it with business logic and HTTP concerns (Module 21 builds directly on this pattern with a formal `ProductRepository` class and FastAPI integration).',
    bestPractices: [
      'Build the compound index to match the exact filter + cursor fields used by the list query (`{category: 1, _id: 1}` here), so pagination stays a fast indexed operation at any collection size.',
      'Always validate an incoming id string with `ObjectId.is_valid(...)` before constructing an `ObjectId`, and always convert `ObjectId` back to `str` before returning data destined for JSON serialization.',
      'Use `$addToSet` (not `$push`) when adding a tag that should not be duplicated if the operation is retried or called again with the same value.',
    ],
    tradeOffs:
      'Filtering on an array field (`tags`) requires a MULTIKEY index (automatically created when you index an array field — MongoDB indexes each array element individually), which is more expensive to maintain on writes than a single-value field index but is essential for the tag-filter query to avoid a full collection scan; the alternative of NOT indexing `tags` would keep writes marginally cheaper but make tag-based filtering scale linearly with collection size.',
    commonMistakes: [
      'Forgetting to convert `ObjectId` to `str` before returning data from a function whose output is eventually JSON-serialized by a web framework, causing a serialization failure downstream.',
      'Building the list query\'s index in the wrong field order relative to the actual filter + cursor usage (e.g. indexing `{_id: 1, category: 1}` instead of `{category: 1, _id: 1}`), preventing the query from being satisfied by a single efficient index scan.',
      'Using `$push` instead of `$addToSet` for tags, allowing the same tag to be appended multiple times if the update is retried.',
    ],
    followUpQuestions: [
      'How would you extend this list query to ALSO support free-text search on the product name, and what indexing strategy would that require?',
      'How would you change the update function to use `arrayFilters` if `specs` needed to become an array of multiple variant sub-documents instead of a single nested object?',
      'How would you convert this synchronous PyMongo code to use Motor (the async MongoDB driver) for a FastAPI `async def` endpoint?',
    ],
    relatedTopics: ['PyMongo', 'CRUD', 'Cursor Pagination', 'Multikey Index', 'Projection', 'ObjectId', 'Repository Pattern'],
  },
];

export const MOCK_PYTHON_MODULE19_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
