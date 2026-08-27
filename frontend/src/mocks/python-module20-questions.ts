// Python + DSA Interview Handbook — Module 20: Advanced MongoDB.
// Hand-authored technical questions covering senior/staff-level MongoDB
// database engineering: access-pattern-driven data modeling, embedding vs
// referencing, the aggregation framework ($match/$group/$lookup/$facet and
// beyond), index internals (compound indexes, ESR guideline, covered
// queries), .explain() query-plan diagnosis, multi-document transactions,
// optimistic concurrency, replica sets, read/write concern, sharding and
// shard-key selection, TTL indexes, change streams, and MongoDB security
// (RBAC, NoSQL injection) — with genuine MongoDB shell + Python (PyMongo)
// code and production reasoning. Mirrors the MockTechnicalQuestion shape
// defined in @/mocks/questions.

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
    id: 'python-m20-1',
    number: 'PY-M20-1',
    title: 'Access-pattern-driven data modeling — model around queries, not normalized theory',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Data Modeling',
    expectedAnswer:
      'MongoDB schema design starts from "how will the application actually READ and WRITE this data" (the access patterns), not from relational normalization rules — the same logical entities can and often should be modeled very differently depending on whether the dominant pattern is "fetch this whole aggregate together" versus "query these pieces independently at very different rates." Getting the document boundaries right up front is the single highest-leverage MongoDB design decision, because it determines whether later queries are cheap single-document fetches or expensive multi-collection joins.',
    deepExplanation:
      "The design process, concretely, in order:\n\n```text\n1. List the application\\\n\nStep 1 — Understand the topic.\nTopic: Access-pattern-driven data modeling — model around queries, not normalized theory\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndocument = collection.find_one({\n    \"_id\": object_id\n})\n\nprint(document)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ndocument = collection.find_one({\n    \"active\": True,\n})\n```\n\nStep 5 — Example result:\n```text\nmatching document\n```\n\nStep 6 — Complexity / trade-off:\nModel from access patterns and inspect explain plans for hot queries.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A social media platform initially modeled `posts` and `comments` as fully separate, foreign-keyed collections (the relational instinct) and found every feed-rendering request needed N+1 queries (one for the posts, then one per post for its comments); the redesign EMBEDDED a bounded, recent subset of comments directly in the post document (with a separate `comments` collection only for the \"view all comments\" cold path beyond that bounded preview) — collapsing the feed-render query from N+1 round trips to exactly one.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Access-pattern-driven data modeling — model around queries, not normalized theory**.",
    bestPractices: [
      'Start data modeling from the application\'s actual QUERIES, not an ER diagram of entities and their theoretical relationships.',
      'Group fields that are read together and change together into one document; split fields that are queried independently, grow unboundedly, or are shared across many parents into their own collection.',
      'Revisit and be willing to RESHAPE a document boundary decision once real production query patterns reveal it was wrong — MongoDB schema design is iterative, not a one-time upfront exercise.',
    ],
    tradeOffs:
      'Access-pattern-driven modeling optimizes the COMMON, hot-path queries at the cost of sometimes needing extra work (a second query, a `$lookup`, or deliberate duplication) for the rarer, cold-path queries that touch data across document boundaries — this is the correct tradeoff precisely because it matches actual usage frequency, but it does require genuinely knowing your access patterns in advance, which is harder for a new product with unclear or rapidly-evolving query needs.',
    commonMistakes: [
      'Reflexively normalizing a MongoDB schema into many small, foreign-keyed collections out of relational habit, then discovering the application now needs N+1 queries or many `$lookup` stages to reconstruct data that used to be one JOIN away in SQL.',
      'Designing the schema before enumerating the application\'s actual queries, resulting in a "theoretically clean" but practically expensive-to-query document layout.',
      'Treating an initial schema design as permanent rather than revisiting document boundaries once real production access patterns are observed.',
    ],
    followUpQuestions: [
      'Walk through how you would model a "product with reviews" scenario differently if reviews are rarely read (embed a small preview, reference the rest) versus if reviews are the PRIMARY thing being queried (their own collection, referenced from the product).',
      'What signals in production (query patterns, document growth, `$lookup` frequency) would tell you a schema decision needs to be revisited?',
      'How would you migrate a live collection from an embedded design to a referenced design (or vice versa) with minimal downtime?',
    ],
    relatedTopics: ['Data Modeling', 'Access Patterns', 'Schema Design', 'Document Boundaries', 'Denormalization'],
  },
  {
    id: 'python-m20-2',
    number: 'PY-M20-2',
    title: 'Embedding vs referencing — one-to-few, one-to-many, and one-to-squillions',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Embedding vs Referencing',
    expectedAnswer:
      'Embed when the related data is BOUNDED, read together with the parent, and does not need to be queried independently at scale (one-to-few, e.g. a customer\'s few shipping addresses); reference when the related data is UNBOUNDED, grows without a practical limit, needs independent querying, or is shared across many parents (one-to-many/one-to-squillions, e.g. an order\'s payment transactions, or a product\'s many thousands of reviews) — the deciding factors are document size growth, update frequency/independence, and query pattern, not just the conceptual "is this a relationship" question.',
    deepExplanation:
      "Worked comparison, an order/customer schema, THREE relationship shapes side by side:\n\n```javascript\n// ONE-TO-FEW: a customer\\\n\nStep 1 — Understand the topic.\nTopic: Embedding vs referencing — one-to-few, one-to-many, and one-to-squillions\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndocument = collection.find_one({\n    \"_id\": object_id\n})\n\nprint(document)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ndocument = collection.find_one({\n    \"active\": True,\n})\n```\n\nStep 5 — Example result:\n```text\nmatching document\n```\n\nStep 6 — Complexity / trade-off:\nModel from access patterns and inspect explain plans for hot queries.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce platform originally embedded ALL of a product\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Embedding vs referencing — one-to-few, one-to-many, and one-to-squillions**.",
    bestPractices: [
      'Treat "is this relationship BOUNDED or UNBOUNDED in size" as the single most decisive question when choosing between embedding and referencing — unbounded growth is close to a hard rule against embedding.',
      'Embed data that is always read together with its parent and rarely/never queried independently; reference data that needs independent pagination, filtering, sorting, or is shared across many parent documents.',
      'Watch for embedded arrays that grow WITHOUT a natural, enforced bound (activity logs, comments, reviews, messages) as a red flag requiring a referenced design, even if the array is small today.',
    ],
    tradeOffs:
      'Embedding gives single-document, zero-`$lookup` reads (fast, atomic within one document) but risks unbounded document growth and the 16MB hard limit, plus forces every parent read to carry the full embedded payload even when only a subset is needed; referencing keeps documents small and supports independent querying/pagination of the related data, at the cost of needing an extra query (or `$lookup`) to reconstruct the full picture when both pieces genuinely are needed together.',
    commonMistakes: [
      'Embedding an unboundedly-growing array (reviews, comments, event logs) directly on a parent document, eventually hitting the 16MB document size limit or severely degrading parent-read performance well before that limit.',
      'Referencing data that is ALWAYS read together with its parent and rarely queried independently (e.g. a customer\'s few shipping addresses), needlessly forcing an extra query/`$lookup` for data that should simply be embedded.',
      'Treating "is this conceptually a separate entity" as the deciding factor instead of the actual access pattern and growth bound — conceptual entity boundaries and optimal document boundaries are frequently different things in MongoDB.',
    ],
    followUpQuestions: [
      'How would you migrate an already-embedded, now-too-large array (e.g. reviews) out to its own referenced collection on a live production system with minimal downtime?',
      'For an order\'s line items (one-to-many but bounded), why is embedding still correct even though it is technically a "many" relationship?',
      'How would you handle a case where you need FAST access to a summary of unbounded related data (e.g. "average rating" of a product with squillions of reviews) without embedding the full collection?',
    ],
    relatedTopics: ['Embedding', 'Referencing', 'Schema Design', 'Document Size Limit', 'One-to-Many', 'Data Modeling'],
  },
  {
    id: 'python-m20-3',
    number: 'PY-M20-3',
    title: 'The aggregation framework — pipeline fundamentals with a worked revenue-by-customer example',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Aggregation Framework',
    expectedAnswer:
      'The aggregation framework processes documents through an ordered PIPELINE of stages, each taking the previous stage\'s output as its input and transforming it — `$match` filters documents (like a SQL WHERE, ideally placed early to reduce the working set), `$group` aggregates documents into buckets by a key (like GROUP BY), `$project`/`$addFields` reshape/compute fields (like a SELECT expression list), `$sort`/`$limit`/`$skip` order and paginate results, and `$unwind` flattens an array field into one output document per array element.',
    deepExplanation:
      "Worked example — \"total revenue per customer, for orders placed in 2026, customers with more than $500 in orders\", given sample `orders` documents:\n\n```javascript\n// sample input documents in the `orders` collection\n{ _id: 1, customer_id: \"c1\", total: 300, placed_at: ISODate(\"2026-01-05\") }\n{ _id: 2, customer_id: \"c1\", total: 250, placed_at: ISODate(\"2026-02-10\") }\n{ _id: 3, customer_id: \"c2\", total: 150, placed_at: ISODate(\"2026-01-20\") }\n{ _id: 4, customer_id: \"c1\", total: 100, placed_at: ISODate(\"2025-12-01\") }   // excluded: not 2026\n\ndb.orders.aggregate([\n  { $match: { placed_at: { $gte: ISODate(\"2026-01-01\"), $lt: ISODate(\"2027-01-01\") } } },\n  // after $match: documents 1, 2, 3 remain (document 4 is filtered out — placed in 2025)\n\n  { $group: { _id: \"$customer_id\", total_revenue: { $sum: \"$total\" }, order_count: { $sum: 1 } } },\n  // after $group: { _id: \"c1\", total_revenue: 550, order_count: 2 }\n  //               { _id: \"c2\", total_revenue: 150, order_count: 1 }\n\n  { $match: { total_revenue: { $gt: 500 } } },\n  // after this SECOND $match (filtering the GROUPED result, like SQL HAVING): only c1 remains\n\n  { $project: { _id: 0, customer_id: \"$_id\", total_revenue: 1, order_count: 1 } },\n  // reshapes the output document, renaming _id to customer_id and dropping the raw _id field\n\n  { $sort: { total_revenue: -1 } },\n  { $limit: 10 },\n]);\n\n// FINAL expected output:\n// [ { customer_id: \"c1\", total_revenue: 550, order_count: 2 } ]\n```\n\nEquivalent Python (PyMongo):\n\n```python\npipeline = [\n    {\"$match\": {\"placed_at\": {\"$gte\": datetime(2026, 1, 1), \"$lt\": datetime(2027, 1, 1)}}},\n    {\"$group\": {\"_id\": \"$customer_id\", \"total_revenue\": {\"$sum\": \"$total\"}, \"order_count\": {\"$sum\": 1}}},\n    {\"$match\": {\"total_revenue\": {\"$gt\": 500}}},\n    {\"$project\": {\"_id\": 0, \"customer_id\": \"$_id\", \"total_revenue\": 1, \"order_count\": 1}},\n    {\"$sort\": {\"total_revenue\": -1}},\n    {\"$limit\": 10},\n]\nresults = list(db.orders.aggregate(pipeline))\n```\n\nA critical performance principle: place `$match` stages as EARLY as possible in the pipeline (ideally first) — an early `$match` on an indexed field lets MongoDB use that index to filter documents BEFORE any expensive `$group`/`$unwind`/`$lookup` work happens, dramatically reducing the number of documents flowing through the rest of the pipeline; a `$match` placed late (after a `$group`, for instance) can only filter the already-computed, already-expensive aggregated results (which is exactly the \"SQL HAVING\" role the second `$match` plays above — filtering GROUPS, which necessarily must happen after `$group`, but any filter that CAN be expressed on raw documents should be pushed to the very first stage).\n\n`$unwind` deserves special mention: given a document with an array field `{tags: [\"a\", \"b\", \"c\"]}`, `{$unwind: \"$tags\"}` produces THREE separate output documents, each with `tags` replaced by a single string value (`\"a\"`, `\"b\"`, or `\"c\"`) — this is the standard technique for then `$group`-ing or filtering by individual array elements, but it multiplies document count through the pipeline and should be used deliberately, not habitually.\n\nStep 1 — Understand the topic.\nTopic: The aggregation framework — pipeline fundamentals with a worked revenue-by-customer example\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\npipeline = [\n    {\"$match\": {\"status\": \"paid\"}},\n    {\n        \"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }\n    },\n    {\"$sort\": {\"revenue\": -1}},\n]\n\nresult = list(\n    collection.aggregate(pipeline)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = list(\n    collection.aggregate([\n        {\"$match\": {\"status\": \"paid\"}},\n        {\"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }},\n    ])\n)\n```\n\nStep 5 — Example result:\n```text\ncustomers grouped by paid revenue\n```\n\nStep 6 — Complexity / trade-off:\nPush filtering early in the pipeline and index the match fields.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A financial reporting dashboard\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **The aggregation framework — pipeline fundamentals with a worked revenue-by-customer example**.",
    bestPractices: [
      'Place `$match` stages as early as possible in the pipeline (ideally as stage one) so MongoDB can use an index to reduce the document count before any expensive downstream stage.',
      'Use a SECOND `$match` after `$group` specifically when the filter condition depends on an AGGREGATED value (the SQL HAVING equivalent) — this cannot be pushed earlier since the aggregate does not exist yet.',
      'Use `$unwind` deliberately and only when genuinely needed (per-element grouping/filtering) — it multiplies the document count flowing through the rest of the pipeline and should not be reached for by habit.',
    ],
    tradeOffs:
      'The aggregation framework is far more expressive and composable than simple `find()` queries (supporting joins, grouping, reshaping, and complex expressions in one server-side pipeline), but that expressiveness costs more CPU/memory per query than a simple indexed `find()` — for hot, simple, frequently-repeated lookups, a plain `find()` (or a pre-computed/cached aggregation result, as in the production example) is usually the better choice over running a non-trivial pipeline on every single request.',
    commonMistakes: [
      'Placing `$match` late in the pipeline (or omitting an early filter entirely) when the SAME filter could have been applied as the very first stage, forcing expensive downstream stages to process far more documents than necessary.',
      'Confusing the TWO valid uses of `$match` — filtering raw documents (should be early, index-usable) versus filtering aggregated/grouped results (must be after `$group`, the HAVING-equivalent role) — and being surprised when an early filter cannot reference a field that only exists after `$group`.',
      'Using `$unwind` reflexively on every array field even when the actual goal does not require per-element processing, unnecessarily multiplying the pipeline\'s document throughput.',
    ],
    followUpQuestions: [
      'Why must a filter on an AGGREGATED value (like `total_revenue > 500` above) be a SECOND `$match` after `$group`, rather than combined into the first `$match`?',
      'How would you rewrite this pipeline to ALSO include customers with zero matching 2026 orders (hint: this requires starting from the `customers` collection with a `$lookup`, not starting from `orders`)?',
      'When would you choose to pre-compute and cache an aggregation result (as in the production example) instead of running the pipeline live on every request?',
    ],
    relatedTopics: ['Aggregation Framework', '$match', '$group', '$project', '$unwind', 'Pipeline Optimization'],
  },
  {
    id: 'python-m20-4',
    number: 'PY-M20-4',
    title: '$lookup, $facet, $bucket, and other advanced aggregation stages — MongoDB joins',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: '$lookup',
    expectedAnswer:
      '`$lookup` performs a LEFT OUTER JOIN-style operation against another collection in the SAME database, either in its basic form (simple equality on a local/foreign field) or the more powerful PIPELINE form (a full sub-pipeline, supporting multiple/complex join conditions — a "correlated" lookup); other stages like `$addFields`/`$set`, `$facet` (run multiple sub-pipelines over the SAME input and combine their results), `$bucket` (group documents into defined numeric/date ranges), and `$replaceRoot` round out the framework\'s ability to reshape and combine data across collections without leaving the database.',
    deepExplanation:
      "Basic `$lookup` — a simple equality join, `orders` to `customers`:\n\n```javascript\ndb.orders.aggregate([\n  { $match: { _id: 101 } },\n  {\n    $lookup: {\n      from: \"customers\",\n      localField: \"customer_id\",\n      foreignField: \"_id\",\n      as: \"customer\",           // result is an ARRAY field, even for a to-one relationship\n    },\n  },\n  { $unwind: \"$customer\" },     // flatten the single-element array into a plain sub-document\n]);\n// input order: { _id: 101, customer_id: \"c1\", total: 550 }\n// input customer: { _id: \"c1\", name: \"Ada Lovelace\", email: \"ada@example.com\" }\n// OUTPUT: { _id: 101, customer_id: \"c1\", total: 550, customer: { _id: \"c1\", name: \"Ada Lovelace\", email: \"ada@...\" } }\n```\n\nPIPELINE `$lookup` — needed for correlated conditions beyond simple equality (e.g. \"the customer\\\n\nStep 1 — Understand the topic.\nTopic: $lookup, $facet, $bucket, and other advanced aggregation stages — MongoDB joins\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\npipeline = [\n    {\"$match\": {\"status\": \"paid\"}},\n    {\n        \"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }\n    },\n    {\"$sort\": {\"revenue\": -1}},\n]\n\nresult = list(\n    collection.aggregate(pipeline)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = list(\n    collection.aggregate([\n        {\"$match\": {\"status\": \"paid\"}},\n        {\"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }},\n    ])\n)\n```\n\nStep 5 — Example result:\n```text\ncustomers grouped by paid revenue\n```\n\nStep 6 — Complexity / trade-off:\nPush filtering early in the pipeline and index the match fields.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A product catalog page needs BOTH a page of sorted, filtered results AND the total matching count for pagination UI — using `$facet` computes both in ONE aggregation round trip instead of two separate queries (a `find().sort().skip().limit()` plus a separate `count_documents()`), reducing round-trip overhead on a high-traffic listing endpoint at the cost of a slightly more complex pipeline to construct and parse.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **$lookup, $facet, $bucket, and other advanced aggregation stages — MongoDB joins**.",
    bestPractices: [
      'Always ensure the FOREIGN field used in `$lookup` (the field on the "from" collection being matched against) is indexed — an unindexed `$lookup` foreign field forces a full collection scan of the foreign collection for every input document, which scales extremely poorly.',
      'Reach for the pipeline form of `$lookup` (with `let`/`pipeline`) whenever the join condition is more than simple equality (e.g. needs sorting, limiting, or multiple conditions on the joined side) — basic `$lookup` cannot express these.',
      'Use `$facet` to combine a paginated result set with its total count in a single aggregation call, avoiding a separate round trip for the count.',
    ],
    tradeOffs:
      '`$lookup` lets you avoid full application-level N+1 queries by performing the join server-side, but it is generally more expensive than a well-tuned relational JOIN for large, unindexed, or high-cardinality foreign collections — for genuinely relational, JOIN-heavy access patterns at scale, this is one of the strongest arguments for choosing PostgreSQL over MongoDB in the first place (or, in a polyglot system, keeping that specific data relationally modeled).',
    commonMistakes: [
      'Using `$lookup` against a large foreign collection with NO index on the foreign field, causing a full collection scan per input document and severe aggregation slowdown.',
      'Attempting a correlated join (limit/sort per matched group) using basic `$lookup`\'s `localField`/`foreignField` form, when only the pipeline form (`let`/`pipeline`) can express that logic.',
      'Running a separate `count_documents()` query alongside a paginated `find()` when `$facet` could combine both into one aggregation call.',
    ],
    followUpQuestions: [
      'Why does `$lookup` always produce an array field (`as: "customer"`) even for a clear one-to-one relationship, and what is the idiomatic way to flatten it?',
      'At what scale/collection-size does `$lookup` performance become a genuine concern compared to keeping the data embedded, and how would you detect that transition happening in production?',
      'How would you use `$bucket` versus `$group` to build a price-range histogram, and why is `$bucket` the more natural fit?',
    ],
    relatedTopics: ['$lookup', '$facet', '$bucket', 'Aggregation Pipeline', 'Joins', 'Pagination'],
  },
  {
    id: 'python-m20-5',
    number: 'PY-M20-5',
    title: 'Aggregation expressions and accumulators — a worked "top products per category" example',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Aggregation Framework',
    expectedAnswer:
      'Aggregation EXPRESSIONS (`$cond`, `$ifNull`, `$map`, `$filter`, `$reduce`, arithmetic/comparison/string/date operators) compute new values from existing fields inside `$project`/`$addFields`/`$group`, while ACCUMULATORS (`$sum`, `$avg`, `$min`, `$max`, `$first`, `$last`, `$push`, `$addToSet`) are the special operators usable specifically inside `$group` to combine MULTIPLE documents in a group into one summary value — combining both is how you build genuinely analytical queries like "top N products per category" entirely inside the database.',
    deepExplanation:
      "Worked example — \"the single top-selling product per category, by total quantity sold\", given sample `order_items` documents:\n\n```javascript\n// sample input\n{ product: \"Laptop\", category: \"electronics\", quantity: 3 }\n{ product: \"Mouse\", category: \"electronics\", quantity: 10 }\n{ product: \"Novel\", category: \"books\", quantity: 7 }\n{ product: \"Textbook\", category: \"books\", quantity: 2 }\n\ndb.order_items.aggregate([\n  {\n    $group: {\n      _id: { category: \"$category\", product: \"$product\" },\n      total_quantity: { $sum: \"$quantity\" },\n    },\n  },\n  // after this $group: one document per (category, product) pair with its summed quantity\n\n  { $sort: { \"_id.category\": 1, total_quantity: -1 } },\n  // sorted so the highest-quantity product comes FIRST within each category\n\n  {\n    $group: {\n      _id: \"$_id.category\",\n      top_product: { $first: \"$_id.product\" },      // $first picks from the CURRENT sort order within the group\n      top_quantity: { $first: \"$total_quantity\" },\n    },\n  },\n  // after this SECOND $group (grouping by category alone, relying on the prior sort):\n  // { _id: \"electronics\", top_product: \"Mouse\", top_quantity: 10 }\n  // { _id: \"books\", top_product: \"Novel\", top_quantity: 7 }\n]);\n```\n\nWhy `$first`/`$last` depend on SORT ORDER, precisely: unlike `$sum`/`$avg`/`$min`/`$max` (which are order-independent — the sum is the sum regardless of document order), `$first` and `$last` return whichever document happens to be first/last in the order the accumulator STAGE actually receives documents — which, WITHIN one `$group` stage, is the incoming pipeline order, i.e. the order established by any `$sort` stage placed immediately before it. This is precisely why the pipeline above sorts BEFORE the second `$group` — omitting that sort would make `$first`/`$last` return an ARBITRARY (whatever order the previous stage happened to produce) result, a very common, subtle aggregation bug.\n\nExpression operators inside `$project`/`$addFields`, a few worked examples:\n\n```javascript\ndb.orders.aggregate([\n  {\n    $addFields: {\n      // $cond: inline if/then/else\n      tier: { $cond: { if: { $gte: [\"$total\", 1000] }, then: \"VIP\", else: \"Standard\" } },\n      // $ifNull: fallback for a missing/null field\n      display_name: { $ifNull: [\"$customer_nickname\", \"Guest\"] },\n      // $map: transform every element of an array\n      item_names: { $map: { input: \"$items\", as: \"item\", in: \"$$item.name\" } },\n      // $filter: keep only array elements matching a condition\n      expensive_items: { $filter: { input: \"$items\", as: \"item\", cond: { $gt: [\"$$item.price\", 100] } } },\n    },\n  },\n]);\n```\n\nStep 1 — Understand the topic.\nTopic: Aggregation expressions and accumulators — a worked \"top products per category\" example\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\npipeline = [\n    {\"$match\": {\"status\": \"paid\"}},\n    {\n        \"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }\n    },\n    {\"$sort\": {\"revenue\": -1}},\n]\n\nresult = list(\n    collection.aggregate(pipeline)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = list(\n    collection.aggregate([\n        {\"$match\": {\"status\": \"paid\"}},\n        {\"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }},\n    ])\n)\n```\n\nStep 5 — Example result:\n```text\ncustomers grouped by paid revenue\n```\n\nStep 6 — Complexity / trade-off:\nPush filtering early in the pipeline and index the match fields.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A \"top-selling product per category\" merchandising report on an e-commerce admin dashboard runs almost exactly the double-`$group` pattern above nightly — a naive alternative (running a separate query PER category to find its top product, in a loop from application code) would require one round trip per category; the single aggregation pipeline computes all categories\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Aggregation expressions and accumulators — a worked \"top products per category\" example**.",
    bestPractices: [
      'Always place an explicit `$sort` immediately before a `$group` stage that uses `$first`/`$last`, since those accumulators depend entirely on incoming document order and are otherwise effectively non-deterministic.',
      'Use `$sum`/`$avg`/`$min`/`$max` freely without worrying about input order — they are the ONLY accumulators that are genuinely order-independent.',
      'Prefer `$cond`/`$ifNull`/`$map`/`$filter` computed server-side in the aggregation pipeline over fetching raw documents and doing the equivalent transformation in application Python code, when the transformation is part of a larger pipeline already touching the database.',
    ],
    tradeOffs:
      'Computing "top N per group" style analytics entirely within an aggregation pipeline (as shown) avoids transferring and post-processing large amounts of raw data in application code, but the resulting pipelines (double `$group`, careful sort-then-group sequencing) are noticeably harder to read, write, and debug than the equivalent application-level loop — for infrequent, low-volume reporting needs, doing the grouping in application code after a simpler query may be the more maintainable choice, reserving pipeline-level sophistication for genuinely hot, high-volume analytical queries.',
    commonMistakes: [
      'Using `$first`/`$last` inside a `$group` without a preceding `$sort`, producing effectively arbitrary (order-undefined) results that may look correct in small test datasets but are not actually deterministic.',
      'Attempting to compute "top N per group" (N > 1) using only `$first`/`$last`, which only give you the single first/last element — genuine top-N-per-group requires `$group` with `$push` (collecting an array) followed by `$slice`, or `$setWindowFields` in modern MongoDB versions.',
      'Reaching for a complex multi-stage aggregation pipeline for a simple, infrequent, low-volume report where a straightforward query plus application-level Python grouping would be far more readable and just as fast in practice.',
    ],
    followUpQuestions: [
      'How would you extend this pipeline to return the TOP 3 products per category (not just the single top one)?',
      'Why is `$sum` safe to use without worrying about document order, while `$first` is not — what does that reveal about how MongoDB actually implements these accumulators?',
      'How does `$setWindowFields` (a more modern aggregation stage) provide a cleaner alternative to the double-`$group`-with-sort pattern for per-group ranking?',
    ],
    relatedTopics: ['Aggregation Expressions', 'Accumulators', '$group', '$first', '$cond', 'Analytics'],
  },
  {
    id: 'python-m20-6',
    number: 'PY-M20-6',
    title: 'Index types deep dive — single-field, multikey, text, TTL, unique, sparse, partial, wildcard',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Indexes',
    expectedAnswer:
      'MongoDB indexes are B-tree-style structures (like a relational database\'s index) that map field VALUES to document locations, avoiding a full collection scan; beyond the basic single-field index, MongoDB offers several specialized variants — MULTIKEY (automatic, for array fields — one index entry per array element), TEXT (basic full-text search), TTL (auto-expiring documents), UNIQUE (enforces no-duplicates), SPARSE (only indexes documents where the field exists), PARTIAL (only indexes documents matching a filter expression — the modern, more flexible replacement for most sparse-index use cases), and WILDCARD (indexes an unknown/dynamic set of fields, useful for genuinely schema-flexible sub-documents).',
    deepExplanation:
      "```javascript\n// single-field index — the basic building block, same B-tree structure as PostgreSQL\ndb.users.createIndex({ email: 1 })\n\n// multikey index — created AUTOMATICALLY when you index an array field; one index\n// entry is created PER ARRAY ELEMENT, letting queries on individual elements use the index\ndb.products.createIndex({ tags: 1 })   // products with tags: [\"a\",\"b\",\"c\"] get 3 index entries, one per tag\n\n// text index — basic full-text search support (tokenizes, stems, supports relevance scoring)\ndb.articles.createIndex({ title: \"text\", body: \"text\" })\ndb.articles.find({ $text: { $search: \"mongodb performance\" } })\n\n// TTL index — documents are automatically deleted once `expires_at` is in the past\ndb.sessions.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })\n// a background task runs roughly every 60 seconds and deletes expired documents —\n// NOT instantaneous; a document can persist briefly past its expiry time\n\n// unique index — rejects any insert/update that would create a duplicate value\ndb.users.createIndex({ email: 1 }, { unique: true })\n\n// sparse index — only includes documents where the indexed field actually EXISTS\ndb.users.createIndex({ phone: 1 }, { sparse: true })   // documents with no `phone` field are excluded from the index\n\n// partial index — the modern, more flexible generalization of sparse: only indexes\n// documents matching an arbitrary filter expression (not just \"field exists\")\ndb.users.createIndex(\n  { email: 1 },\n  { unique: true, partialFilterExpression: { is_deleted: { $ne: true } } }\n)\n\n// wildcard index — indexes an unknown/dynamic set of sub-fields, e.g. a flexible `metadata` object\ndb.products.createIndex({ \"metadata.$**\": 1 })\n```\n\nWhy multikey indexes matter operationally: they make array-element queries (`db.products.find({tags: \"electronics\"})`) efficient WITHOUT any special query syntax — from the query author\\\n\nStep 1 — Understand the topic.\nTopic: Index types deep dive — single-field, multikey, text, TTL, unique, sparse, partial, wildcard\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndb.sessions.create_index(\n    \"expires_at\",\n    expireAfterSeconds=0,\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nstream = collection.watch()\n\nfor change in stream:\n    print(change[\"operationType\"])\n```\n\nStep 5 — Example result:\n```text\nautomatic expiry / change event\n```\n\nStep 6 — Complexity / trade-off:\nTTL automates expiry; change streams provide ordered collection/database event feeds.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A SaaS platform\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Index types deep dive — single-field, multikey, text, TTL, unique, sparse, partial, wildcard**.",
    bestPractices: [
      'Prefer PARTIAL indexes over SPARSE indexes in new schema designs — partial indexes can express any filter condition (including but not limited to "field exists"), making them strictly more flexible.',
      'Rely on multikey indexes transparently for array-field equality/range queries — no special query syntax is needed, just index the array field normally.',
      'Use a TTL index for any collection where documents have a genuine, well-defined expiry (sessions, OTPs, temporary tokens) rather than implementing expiry cleanup manually with a cron job.',
    ],
    tradeOffs:
      'Specialized index types (text, TTL, partial, wildcard) solve specific problems elegantly but each adds its own operational nuance to understand (text index relevance scoring is not a full search engine; TTL deletion is eventually-consistent, not instant; wildcard indexes can index MORE fields than intended if not scoped carefully) — reaching for a specialized index type should be a deliberate choice tied to a genuine corresponding need, not a default.',
    commonMistakes: [
      'Attempting to create a compound index where more than one field is an array in the same document, hitting MongoDB\'s "cannot index parallel arrays" restriction.',
      'Assuming a TTL index deletes documents INSTANTLY at their expiry timestamp, when in fact a background process runs periodically (roughly every 60 seconds) — code relying on immediate deletion at the exact expiry moment will occasionally see stale documents.',
      'Using a plain `text` index and expecting production-search-engine-grade relevance/typo-tolerance/faceting, when a dedicated search system would be the appropriate tool for those requirements.',
    ],
    followUpQuestions: [
      'Why can MongoDB not support a compound index across two array fields in the same document?',
      'What specific problem does a partial index solve that a sparse index cannot?',
      'How would you decide when a basic `text` index is sufficient search functionality versus when you genuinely need a dedicated search engine?',
    ],
    relatedTopics: ['Indexes', 'Multikey Index', 'TTL Index', 'Partial Index', 'Text Index', 'Unique Index'],
  },
  {
    id: 'python-m20-7',
    number: 'PY-M20-7',
    title: 'Compound indexes and the ESR (Equality, Sort, Range) guideline',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Compound Indexes',
    expectedAnswer:
      'A compound index (multiple fields in one index) can satisfy an equality filter, a sort, and a range filter TOGETHER in a single index scan — but only if the fields are ordered correctly, and the widely-used ESR (Equality, Sort, Range) guideline gives a strong starting heuristic for that ordering: put EQUALITY-filtered fields first, then the SORT field(s), then RANGE-filtered fields last. It is explicitly a GUIDELINE, not an absolute rule — the query planner\'s actual behavior for a specific query shape should always be confirmed with `.explain()`, since real-world query patterns and selectivity can make deviations from strict ESR the better choice.',
    deepExplanation:
      "Worked example — a query filtering orders by status (equality), sorting by date (sort), and filtering by a price range (range):\n\n```javascript\n// the query this index needs to support:\ndb.orders.find({\n  status: \"shipped\",                          // EQUALITY\n  total: { $gte: 100, $lte: 1000 },            // RANGE\n}).sort({ placed_at: -1 })                     // SORT\n\n// following ESR: Equality field first, then Sort field, then Range field last\ndb.orders.createIndex({ status: 1, placed_at: -1, total: 1 })\n```\n\nWhy this exact ORDER matters, mechanically: a compound index is one physically sorted structure, sorted first by the first field, then by the second field WITHIN each value of the first, and so on. Putting `status` (equality) FIRST means MongoDB can jump directly to the \"shipped\" section of the index. Putting `placed_at` (sort) SECOND means that, WITHIN the \"shipped\" section, entries are already in the exact order the query wants to sort by — so no separate in-memory sort step is needed. Putting `total` (range) LAST is correct because a RANGE condition on an index field breaks the \"everything after this point in the index is still usefully ordered for the NEXT field\" property — once you introduce a range scan on a field, any FURTHER fields in the index after it can no longer be used to satisfy an additional equality/sort efficiently, which is why range fields belong last, not before other fields you still need to filter/sort by.\n\nA concrete illustration of getting the order WRONG: `db.orders.createIndex({ total: 1, status: 1, placed_at: -1 })` (range field first) forces MongoDB to scan across the WHOLE range of `total` values within the index, unable to narrow first by the more selective equality condition on `status` — this is a meaningfully less efficient index for the SAME query, even though it contains the exact same three fields.\n\nWhy ESR is a GUIDELINE, not gospel: `.explain()` can reveal cases where deviating helps — for instance, if the range condition is actually extremely SELECTIVE (narrows the result set dramatically) while the equality condition is not very selective at all (matches most documents), the \"optimal\" field order for that SPECIFIC data distribution can differ from the general ESR heuristic. The only way to know for certain is to test the actual query against the actual data\\\n\nStep 1 — Understand the topic.\nTopic: Compound indexes and the ESR (Equality, Sort, Range) guideline\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndb.orders.create_index(\n    [\n        (\"customer_id\", 1),\n        (\"status\", 1),\n        (\"created_at\", -1),\n    ]\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ndb.orders.create_index(\n    [\n        (\"customer_id\", 1),\n        (\"created_at\", -1),\n    ]\n)\n```\n\nStep 5 — Example result:\n```text\ncompound index\n```\n\nStep 6 — Complexity / trade-off:\nBuild compound indexes around Equality, Sort, Range/query-prefix patterns.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An orders dashboard query filtering by `status` and a `placed_at` date range, sorted by `placed_at`, initially had an index built in field-declaration order rather than ESR order — `.explain()` revealed the query was still performing a costly in-memory SORT stage despite an index existing; rebuilding the index as `{status: 1, placed_at: -1}` (equality then sort, with the range condition ALSO on `placed_at` handled naturally since it is the same field as the sort) eliminated the in-memory sort entirely and cut query latency by over 90%.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Compound indexes and the ESR (Equality, Sort, Range) guideline**.",
    bestPractices: [
      'Use ESR (Equality, Sort, Range) as your STARTING heuristic for compound index field order, then verify the actual resulting query plan with `.explain("executionStats")` rather than assuming it is automatically optimal.',
      'Build ONE compound index that supports a query\'s full filter+sort shape together, rather than several separate single-field indexes that each only cover part of the query.',
      'Re-evaluate compound index field ordering when a query\'s actual data selectivity is known to deviate significantly from typical assumptions (e.g. a normally-selective equality field that, in this specific dataset, barely narrows the result at all).',
    ],
    tradeOffs:
      'A well-ordered compound index can satisfy an equality+sort+range query in a single efficient index scan with zero in-memory sort, but designing and maintaining the RIGHT compound index per hot query shape requires ongoing analysis (as query patterns evolve) and adds write overhead for every additional field included — over-indexing (building a compound index for every conceivable query permutation) trades write performance and storage for read performance that may never actually be exercised.',
    commonMistakes: [
      'Building a compound index in field-declaration order (or an arbitrary order) rather than deliberately following equality-sort-range, then being confused why `.explain()` still shows an in-memory SORT stage.',
      'Treating ESR as an absolute rule that never needs verification, rather than a strong starting heuristic that should always be confirmed against the query planner\'s actual chosen plan for the real data.',
      'Building several separate single-field indexes to cover a filter+sort query instead of one well-ordered compound index that covers the whole query shape in a single scan.',
    ],
    followUpQuestions: [
      'Walk through, mechanically, why a RANGE-filtered field must come LAST in a compound index rather than before an equality or sort field.',
      'Give a concrete scenario where following ESR strictly would actually produce a WORSE plan than a different field ordering, and explain why.',
      'How would you design a single compound index to support TWO different query shapes that share some but not all of their filter/sort fields?',
    ],
    relatedTopics: ['Compound Indexes', 'ESR Guideline', 'Index Ordering', 'Query Planner', 'explain()'],
  },
  {
    id: 'python-m20-8',
    number: 'PY-M20-8',
    title: 'Index performance — selectivity, covered queries, index intersection, and when Mongo ignores an index',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Query Performance',
    expectedAnswer:
      'SELECTIVITY (how much an index narrows down the result set) determines whether an index actually helps — a low-selectivity index (e.g. on a boolean field with only two possible values across millions of documents) may not meaningfully beat a collection scan and the planner may simply ignore it; a COVERED QUERY (where every field in both the filter AND the projection is present in a single index) lets MongoDB answer entirely from the index without touching the underlying document at all, the fastest possible read; INDEX INTERSECTION (using two separate single-field indexes together for one query) exists but is generally less efficient than one well-designed compound index covering the same query.',
    deepExplanation:
      "Selectivity, concretely: an index on `is_active: boolean` across 10 million users, where 9.5 million are active, gives the query planner almost NO useful narrowing for `find({is_active: true})` — it would still need to examine roughly 9.5 million index entries, arguably WORSE than a plain collection scan due to the extra index-traversal overhead on top of reading nearly all matching documents anyway; the planner may reasonably choose a COLLSCAN over using that low-selectivity index. Contrast with an index on `email` (near-unique per document) — extremely high selectivity, an index lookup for one email narrows to essentially one document immediately.\n\nCovered query, worked example:\n\n```javascript\ndb.users.createIndex({ status: 1, email: 1 })\n\n// this query is FULLY COVERED: both the filter field (status) and the\n// projected fields (email) are present in the index — MongoDB never touches\n// the actual documents on disk/in the collection\ndb.users.find({ status: \"active\" }, { email: 1, _id: 0 })\n// .explain() would show totalDocsExamined: 0 for a truly covered query\n```\n\nIndex intersection — MongoDB CAN combine two separate single-field indexes to satisfy one query (using both, then intersecting the resulting document-id sets), but this is generally a FALLBACK the planner uses when no single compound index exists to cover the query well, and is typically less efficient than a purpose-built compound index would be for the same query shape — you should not deliberately DESIGN around relying on index intersection; build the right compound index instead.\n\nWrite overhead, precisely: every additional index on a collection means every INSERT/UPDATE/DELETE must also update that index\\\n\nStep 1 — Understand the topic.\nTopic: Index performance — selectivity, covered queries, index intersection, and when Mongo ignores an index\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndocument = collection.find_one({\n    \"_id\": object_id\n})\n\nprint(document)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ndocument = collection.find_one({\n    \"active\": True,\n})\n```\n\nStep 5 — Example result:\n```text\nmatching document\n```\n\nStep 6 — Complexity / trade-off:\nModel from access patterns and inspect explain plans for hot queries.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A `users` collection had accumulated 18 indexes over time (many added speculatively \"just in case\", several never actually used by any real query) — write latency on user updates had crept up noticeably; auditing actual query patterns against `$indexStats` revealed 7 of the 18 indexes had near-zero usage, and dropping them measurably improved write throughput with zero impact on any real query, since nothing was actually relying on the unused indexes.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Index performance — selectivity, covered queries, index intersection, and when Mongo ignores an index**.",
    bestPractices: [
      'Evaluate index candidates by actual SELECTIVITY on real data — a low-selectivity field (few distinct values relative to collection size) is often a poor standalone index candidate.',
      'Design for COVERED QUERIES on genuinely hot, high-volume read paths where the projection is narrow and stable — the totalDocsExamined: 0 result in `.explain()` is the clearest possible confirmation.',
      'Periodically audit index usage (e.g. via `$indexStats` in MongoDB) and drop indexes with negligible real usage — every unused index is pure write-overhead and cache-memory cost with zero read benefit.',
    ],
    tradeOffs:
      'More indexes generally improve READ performance for the specific query shapes they support, at a real, cumulative cost to WRITE performance and memory/storage for every index maintained — the right number of indexes is the minimum set that covers your actual observed hot query patterns, not a maximal set covering every conceivable query.',
    commonMistakes: [
      'Adding a low-selectivity index (e.g. on a boolean or small-enum field) expecting a meaningful performance win, when the planner may reasonably ignore it in favor of a collection scan for exactly that reason.',
      'Assuming a query is "covered" just because SOME relevant index exists, without verifying via `.explain()` that BOTH the filter and projection fields are fully present in that one index.',
      'Accumulating indexes speculatively over time without ever auditing actual usage, silently paying ongoing write-performance and memory cost for indexes nothing actually queries against anymore.',
    ],
    followUpQuestions: [
      'How would you use `.explain("executionStats")` to confirm whether a specific query is genuinely a covered query?',
      'Why might the query planner choose a full collection scan over using an available but low-selectivity index?',
      'How would you identify and safely remove genuinely unused indexes from a large, actively-written production collection?',
    ],
    relatedTopics: ['Index Selectivity', 'Covered Query', 'Index Intersection', 'Query Performance', 'Write Overhead'],
  },
  {
    id: 'python-m20-9',
    number: 'PY-M20-9',
    title: '.explain() deep dive — diagnosing COLLSCAN vs IXSCAN and fixing a slow query',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Query Performance',
    expectedAnswer:
      '`.explain("executionStats")` reveals exactly HOW MongoDB executed (or would execute) a query: the `winningPlan` shows the chosen strategy (a `COLLSCAN` — full collection scan — versus an `IXSCAN` — index scan — as the key signal of whether an index was used at all), and `executionStats` gives concrete numbers (`totalDocsExamined`, `totalKeysExamined`, `nReturned`, `executionTimeMillis`) that reveal EXACTLY how much wasted work the query performed relative to what it actually needed to return.',
    deepExplanation:
      "Diagnosing a slow query, before and after adding an index — given an `orders` collection with 5 million documents and NO index on `status`:\n\n```javascript\ndb.orders.find({ status: \"cancelled\" }).explain(\"executionStats\")\n\n// BEFORE (no index) — relevant excerpt of the output:\n// {\n//   \"winningPlan\": { \"stage\": \"COLLSCAN\" },   // <- full collection scan, the red flag\n//   \"executionStats\": {\n//     \"nReturned\": 1200,                       // only 1,200 documents actually matched\n//     \"totalDocsExamined\": 5000000,            // but ALL 5 MILLION were examined to find them\n//     \"totalKeysExamined\": 0,                  // no index was used at all\n//     \"executionTimeMillis\": 1840               // slow: nearly 2 full seconds\n//   }\n// }\n\ndb.orders.createIndex({ status: 1 })\ndb.orders.find({ status: \"cancelled\" }).explain(\"executionStats\")\n\n// AFTER (with the index) — relevant excerpt:\n// {\n//   \"winningPlan\": { \"stage\": \"FETCH\", \"inputStage\": { \"stage\": \"IXSCAN\", \"indexName\": \"status_1\" } },\n//   \"executionStats\": {\n//     \"nReturned\": 1200,\n//     \"totalDocsExamined\": 1200,                // now examines EXACTLY the matching documents\n//     \"totalKeysExamined\": 1200,                 // index entries examined matches documents returned — ideal\n//     \"executionTimeMillis\": 4                   // dramatically faster: milliseconds, not seconds\n//   }\n// }\n```\n\nThe key diagnostic RATIO to internalize: `totalDocsExamined` (or `totalKeysExamined`) compared to `nReturned` — in the BEFORE case, the ratio is 5,000,000 : 1,200 (over 4,000x more work than strictly necessary); in the AFTER case, the ratio is 1,200 : 1,200 (a PERFECT ratio — every document examined was actually returned, meaning zero wasted work). A large gap between examined-vs-returned is the single most reliable, at-a-glance signal that a query needs a better (or any) supporting index, regardless of the specific numbers involved.\n\n`FETCH` vs pure `IXSCAN`: the AFTER plan shows a `FETCH` stage wrapping the `IXSCAN` — this means the index scan identified the matching document LOCATIONS, and then MongoDB had to go FETCH the actual documents from the collection\\\n\nStep 1 — Understand the topic.\nTopic: .explain() deep dive — diagnosing COLLSCAN vs IXSCAN and fixing a slow query\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nplan = collection.find(\n    {\"status\": \"paid\"}\n).explain()\n\nprint(\n    plan[\"queryPlanner\"]\n    [\"winningPlan\"]\n    [\"stage\"]\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nplan = collection.find(\n    {\"status\": \"paid\"}\n).explain(\"executionStats\")\n```\n\nStep 5 — Example result:\n```text\nwinning plan stage\n```\n\nStep 6 — Complexity / trade-off:\nCompare COLLSCAN vs IXSCAN and examined vs returned documents.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An on-call engineer investigating a \"slow orders page\" incident ran `.explain(\"executionStats\")` on the exact query the endpoint issued, immediately spotted `\"stage\": \"COLLSCAN\"` and a `totalDocsExamined` in the millions against an `nReturned` in the hundreds — the fifteen-minute diagnosis (versus much longer without `.explain()`, guessing at possible causes) directly identified the missing index as the root cause, and adding it resolved the incident.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **.explain() deep dive — diagnosing COLLSCAN vs IXSCAN and fixing a slow query**.",
    bestPractices: [
      'Make `.explain("executionStats")` (not just `.explain()`, which by default only shows the query planner\'s stage without ACTUALLY running the query to get real numbers) the first diagnostic step for any suspected slow query.',
      'Focus on the `totalDocsExamined`-to-`nReturned` ratio as the primary at-a-glance signal — a large gap almost always means a missing or poorly-targeted index.',
      'Distinguish `COLLSCAN` (definitely no index used) from `IXSCAN` wrapped in `FETCH` (an index was used, but the query still needed to read full documents) from a genuinely covered query (`IXSCAN` alone, `totalDocsExamined: 0`) — each tells a different, actionable story.',
    ],
    tradeOffs:
      '`.explain("executionStats")` actually EXECUTES the query to gather real statistics (unlike the lighter-weight default `.explain()` which only shows the intended plan without running it) — this makes it slightly invasive to run against a genuinely slow, expensive query in a live production system, so it is often safer to first reproduce the slow query against a staging replica or a read-preference-secondary connection before running the full executionStats diagnostic against primary production traffic.',
    commonMistakes: [
      'Running bare `.explain()` (no `"executionStats"` argument) and only looking at the theoretical `winningPlan` without the concrete execution numbers that reveal HOW MUCH wasted work actually occurred.',
      'Seeing an `IXSCAN` in the winning plan and assuming the query is therefore fully optimized, without checking whether a `FETCH` stage (and thus non-zero `totalDocsExamined`) means it is not actually a covered query.',
      'Running `.explain("executionStats")` directly against a live, already-struggling PRIMARY production database for a suspected extremely expensive query, adding further load rather than diagnosing against a safer replica/staging environment first.',
    ],
    followUpQuestions: [
      'What is the practical difference between `.explain()`, `.explain("queryPlanner")`, and `.explain("executionStats")`, and when would you reach for each?',
      'How would `.explain()` output differ for a query using index intersection (two single-field indexes combined) versus one compound index?',
      'How would you safely run an expensive diagnostic `.explain("executionStats")` against a query without adding load to a struggling production primary?',
    ],
    relatedTopics: ['explain()', 'COLLSCAN', 'IXSCAN', 'Query Performance', 'Covered Query', 'Debugging'],
  },
  {
    id: 'python-m20-10',
    number: 'PY-M20-10',
    title: 'Multi-document transactions — sessions, commit/abort, and retry-on-transient-error',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Transactions',
    expectedAnswer:
      'A single document write in MongoDB is ALWAYS atomic (even if it modifies deeply nested fields/arrays within that one document) with no special syntax needed; when an operation must atomically span MULTIPLE documents (potentially across multiple collections), MongoDB supports full ACID multi-document transactions via a client SESSION — `start_session()`, `with_transaction()` (or manual `start_transaction()`/`commit_transaction()`/`abort_transaction()`), which, like a PostgreSQL transaction, ensures all operations succeed together or are entirely rolled back, but carries meaningfully more performance overhead than MongoDB\'s natural single-document atomic operations and requires explicit RETRY handling for certain transient errors.',
    deepExplanation:
      "A worked \"create order, reduce inventory, create payment\" transaction, atomically or not at all:\n\n```python\nfrom pymongo.errors import ConnectionFailure, OperationFailure\n\ndef place_order(client, customer_id, items, payment_info):\n    with client.start_session() as session:\n        def callback(session):\n            db = client[\"shop\"]\n            # 1. create the order\n            order_result = db.orders.insert_one(\n                {\"customer_id\": customer_id, \"items\": items, \"status\": \"pending\"},\n                session=session,\n            )\n            # 2. atomically decrement inventory, FAILING the whole transaction if stock is insufficient\n            for item in items:\n                result = db.inventory.update_one(\n                    {\"product_id\": item[\"product_id\"], \"quantity\": {\"$gte\": item[\"quantity\"]}},\n                    {\"$inc\": {\"quantity\": -item[\"quantity\"]}},\n                    session=session,\n                )\n                if result.matched_count == 0:\n                    # insufficient stock — raising here triggers an ABORT of the ENTIRE transaction,\n                    # rolling back the order insert from step 1 as well\n                    raise ValueError(f\"Insufficient stock for product {item[\\\n\nStep 1 — Understand the topic.\nTopic: Multi-document transactions — sessions, commit/abort, and retry-on-transient-error\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nwith client.start_session() as session:\n    with session.start_transaction():\n        db.accounts.update_one(\n            {\"_id\": 1},\n            {\"$inc\": {\"balance\": -100}},\n            session=session,\n        )\n        db.accounts.update_one(\n            {\"_id\": 2},\n            {\"$inc\": {\"balance\": 100}},\n            session=session,\n        )\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nwith client.start_session() as session:\n    with session.start_transaction():\n        do_step_one(session)\n        do_step_two(session)\n```\n\nStep 5 — Example result:\n```text\nboth updates commit or abort together\n```\n\nStep 6 — Complexity / trade-off:\nUse multi-document transactions for invariants that cannot be represented in one atomic document update.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce checkout flow uses a multi-document transaction spanning `orders`, `inventory`, and `payments` (three collections, per the design principles in this module — these are separate because inventory and payments are queried/updated independently and at very different rates than orders) specifically to guarantee that a failed inventory decrement (insufficient stock) NEVER leaves an orphaned order or a payment charged without a corresponding successful order — exactly the failure mode a transaction exists to prevent.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Multi-document transactions — sessions, commit/abort, and retry-on-transient-error**.",
    bestPractices: [
      'Use `with_transaction()` (the driver-managed convenience wrapper) rather than manually calling `start_transaction`/`commit_transaction`/`abort_transaction`, since it correctly implements MongoDB\'s recommended transient-error retry logic.',
      'Design your schema FIRST to minimize the NEED for multi-document transactions (via the embedding principles covered earlier in this module) — reach for a transaction only for genuinely cross-collection atomic operations that cannot reasonably be modeled as a single-document update.',
      'Keep transactions SHORT and touching as few documents/collections as practically possible — long-running or very broad transactions increase the chance of contention and transient errors under concurrent load.',
    ],
    tradeOffs:
      'Multi-document transactions give the exact same ACID guarantee MongoDB\'s single-document atomicity provides, extended across collection boundaries, at a real performance cost (transactions require additional coordination overhead compared to MongoDB\'s natural single-document atomic writes) — this is precisely why good MongoDB schema design tries to minimize genuine transaction NEED via careful document boundary choices, reserving transactions for the cases that truly require cross-document atomicity rather than using them as a default tool the way one might in a relational schema.',
    commonMistakes: [
      'Manually implementing commit/abort logic without the transient-error retry loop that `with_transaction()` provides automatically, causing occasional, hard-to-reproduce transaction failures under normal replica set operations like elections.',
      'Reaching for a multi-document transaction as a DEFAULT tool (relational habit) rather than first considering whether better document design (embedding related, together-changing data) would eliminate the need for one entirely.',
      'Designing overly long or broad transactions touching many documents/collections, increasing contention and the likelihood of transient errors under concurrent production load.',
    ],
    followUpQuestions: [
      'Why does good MongoDB schema design tend to REDUCE the need for multi-document transactions compared to an equivalent relational schema?',
      'What specific class of error does `with_transaction()`\'s automatic retry logic handle, and why is a replica set election a legitimate reason for a transaction to need retrying?',
      'How would you decide whether a given cross-collection operation genuinely needs a transaction versus can be redesigned to avoid needing one?',
    ],
    relatedTopics: ['Transactions', 'Sessions', 'ACID', 'with_transaction', 'Multi-Document Atomicity', 'Retry Logic'],
  },
  {
    id: 'python-m20-11',
    number: 'PY-M20-11',
    title: 'Concurrency and optimistic locking — fixing an inventory-decrement race condition',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Transactions',
    expectedAnswer:
      'Atomic update operators (`$inc`, `$set` combined with a query CONDITION on the current value) are MongoDB\'s primary tool for safe concurrent updates, avoiding read-modify-write races entirely for simple cases; for more complex conditional updates where the "is this still valid" check cannot be expressed as a single atomic operator alone, OPTIMISTIC CONCURRENCY CONTROL via an explicit version field (check the expected version in the query filter, increment it in the update, and retry if the update matched zero documents) provides safe concurrent updates without holding any lock.',
    deepExplanation:
      "The WRONG way to decrement inventory (a classic read-modify-write race):\n\n```python\n# RACE CONDITION: two concurrent requests can both read quantity=1, both decide\n# \"stock is available\", and both proceed to sell — resulting in quantity=-1 (oversold)\ndef buy_product_UNSAFE(product_id, quantity_requested):\n    product = db.products.find_one({\"_id\": product_id})\n    if product[\"quantity\"] >= quantity_requested:\n        db.products.update_one({\"_id\": product_id}, {\"$inc\": {\"quantity\": -quantity_requested}})\n        return True\n    return False\n```\n\nThe CORRECT, atomic-condition fix — put the stock-sufficiency check directly IN the query filter, so the check-and-decrement happens as ONE atomic operation:\n\n```python\ndef buy_product_SAFE(product_id, quantity_requested):\n    result = db.products.update_one(\n        {\"_id\": product_id, \"quantity\": {\"$gte\": quantity_requested}},   # condition checked ATOMICALLY\n        {\"$inc\": {\"quantity\": -quantity_requested}},\n    )\n    return result.matched_count == 1   # False means either the product does not exist OR stock was insufficient\n```\n\nThis works because MongoDB evaluates the ENTIRE query filter and applies the update as a single atomic document-level operation — there is no window between \"check\" and \"write\" for a concurrent request to interleave, unlike the unsafe version\\\n\nStep 1 — Understand the topic.\nTopic: Concurrency and optimistic locking — fixing an inventory-decrement race condition\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nresult = collection.update_one(\n    {\n        \"_id\": item_id,\n        \"version\": expected_version,\n    },\n    {\n        \"$inc\": {\"stock\": -1, \"version\": 1},\n    },\n)\n\nif result.modified_count != 1:\n    raise ValueError(\"concurrent update\")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ncollection.update_one(\n    {\"_id\": item_id},\n    {\"$inc\": {\"stock\": -1}},\n)\n```\n\nStep 5 — Example result:\n```text\n1 modified row = success; 0 = conflict\n```\n\nStep 6 — Complexity / trade-off:\nOptimistic version checks avoid blind overwrites under concurrent writers.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A flash-sale feature selling a strictly limited quantity of a popular product uses the atomic condition-in-filter pattern (`{\"_id\": product_id, \"quantity\": {\"$gte\": requested}}`) directly, rather than a separate read-then-write — under a burst of thousands of concurrent purchase attempts in the sale\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Concurrency and optimistic locking — fixing an inventory-decrement race condition**.",
    bestPractices: [
      'Prefer embedding the validity CONDITION directly in the update\'s query filter (as in `buy_product_SAFE`) whenever the condition can be expressed that way — this is simpler and more efficient than a general version-field pattern.',
      'Reach for explicit version-field optimistic concurrency control for more general "only update if nothing else has changed this document since I read it" cases that cannot be expressed as a single field-comparison condition.',
      'Always check `matched_count`/`modified_count` on the update result to know whether the atomic condition/version check actually succeeded, and implement a bounded retry loop for the optimistic-locking case.',
    ],
    tradeOffs:
      'Optimistic concurrency control (retry on conflict) performs excellently under LOW-to-moderate contention (conflicts are rare, so most operations succeed on the first attempt with no locking overhead at all), but degrades under VERY HIGH contention on the same document (many concurrent updates to the exact same hot document can cause a cascade of retries) — for extremely hot, highly-contended individual documents, a different design (e.g. sharding the counter across multiple sub-documents, or a dedicated queue-based serialization of updates to that specific document) may be needed instead.',
    commonMistakes: [
      'Implementing a stock/inventory check as a separate `find_one` read followed by a conditional `update_one`, introducing a classic read-modify-write race condition under concurrent requests.',
      'Forgetting to check `matched_count`/`modified_count` after an atomic-condition or version-checked update, silently treating a FAILED (conflicting) update as if it had succeeded.',
      'Omitting a bounded retry limit on an optimistic-locking retry loop, risking an unbounded retry storm under sustained high contention on the same document.',
    ],
    followUpQuestions: [
      'Why does putting the stock condition directly in the update\'s query filter eliminate the race condition that a separate read-then-write has?',
      'How would you handle a case where the SAME highly-contended document (e.g. a single global counter) is updated so frequently that optimistic-locking retries themselves become a bottleneck?',
      'What is the practical difference between MongoDB\'s optimistic-concurrency idioms and PostgreSQL\'s `SELECT FOR UPDATE` pessimistic locking, and why does MongoDB lean toward the former?',
    ],
    relatedTopics: ['Concurrency', 'Optimistic Locking', 'Race Conditions', 'Atomic Updates', 'Version Field'],
  },
  {
    id: 'python-m20-12',
    number: 'PY-M20-12',
    title: 'Replica sets — primary/secondary, elections, oplog, and read preference',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Replica Sets',
    expectedAnswer:
      'A MongoDB replica set is a group of `mongod` instances holding the same data, with exactly one PRIMARY (accepts all writes) and one or more SECONDARIES (continuously replicate the primary\'s changes via the OPLOG, a capped collection recording every write); if the primary becomes unavailable, the remaining members hold an ELECTION (based on heartbeats detecting the primary\'s absence) to promote a new primary automatically, providing high availability without manual intervention. READ PREFERENCE (`primary`, `primaryPreferred`, `secondary`, `secondaryPreferred`, `nearest`) controls whether reads go to the primary (always fully up to date) or can be served by secondaries (offloads read traffic, but risks replication-lag staleness).',
    deepExplanation:
      "```text\n          Primary  (accepts ALL writes; also serves reads by default)\n         /       \\\\\n        v         v\n Secondary     Secondary   (continuously replicate from the primary\\\n\nStep 1 — Understand the topic.\nTopic: Replica sets — primary/secondary, elections, oplog, and read preference\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nclient = MongoClient(\n    URI,\n    readPreference=\"primaryPreferred\",\n)\n\ncollection.find_one({\n    \"_id\": object_id,\n})\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ncollection.with_options(\n    read_preference=ReadPreference.SECONDARY\n).find_one({})\n```\n\nStep 5 — Example result:\n```text\nread from selected topology\n```\n\nStep 6 — Complexity / trade-off:\nRead preference trades consistency/latency characteristics against replica availability.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An analytics dashboard querying aggregated reporting data uses `read_preference=secondaryPreferred` to offload that (read-heavy, staleness-tolerant) traffic away from the primary, which is reserved for the transactional write-heavy checkout flow — while the checkout flow\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Replica sets — primary/secondary, elections, oplog, and read preference**.",
    bestPractices: [
      'Use `primary` (the default) for any read where staleness would cause a correctness problem (auth checks, financial balances, anything immediately following a related write).',
      'Use `secondaryPreferred`/`nearest` deliberately for read-heavy, staleness-tolerant workloads (analytics, reporting, "recently viewed" style features) to offload traffic from the primary.',
      'Monitor replication lag directly (e.g. via `rs.printSecondaryReplicationInfo()` or equivalent driver/ops tooling) whenever secondary reads are in use, since the acceptable staleness tolerance is only as good as your visibility into actual current lag.',
    ],
    tradeOffs:
      'Reading from secondaries offloads the primary and can reduce read latency for geographically distributed deployments (via `nearest`), at the direct cost of potential staleness proportional to current replication lag — the right read preference is a deliberate per-query decision balancing how CRITICAL up-to-the-millisecond consistency is for that specific read against how much read-scaling benefit is actually needed.',
    commonMistakes: [
      'Using a stale-tolerant read preference (`secondary`/`secondaryPreferred`) for a read that is immediately consistency-critical (e.g. reading a value right after writing it in the same logical operation), causing intermittent, hard-to-reproduce "read my own write" bugs.',
      'Assuming replica set elections are instantaneous — there is a real, if typically brief, window during an election where the set has no primary and cannot accept writes.',
      'Not monitoring actual replication lag when relying on secondary reads, discovering staleness problems only after they have already caused a user-visible inconsistency.',
    ],
    followUpQuestions: [
      'Why can a replica set briefly have NO primary during an election, and what should application code do during that window?',
      'How would you design a feature that needs strong consistency for one part of a request but can tolerate staleness for another, using read preference per-query rather than per-connection?',
      'What specifically causes replication lag to grow, and how would you diagnose which secondary is lagging and why?',
    ],
    relatedTopics: ['Replica Sets', 'Primary/Secondary', 'Oplog', 'Elections', 'Read Preference', 'Replication Lag'],
  },
  {
    id: 'python-m20-13',
    number: 'PY-M20-13',
    title: 'Write concern and read concern — durability, acknowledgement, and consistency tradeoffs',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Read/Write Concern',
    expectedAnswer:
      'WRITE CONCERN (`w`, `j`, `wtimeout`) controls how many replica set members must ACKNOWLEDGE a write (and whether it must be journaled) before the driver considers it successful — `w: "majority"` (the modern recommended default for most production workloads) waits for a majority of voting members to confirm, trading a small amount of write latency for strong durability against a primary failure immediately after the write. READ CONCERN (`local`, `available`, `majority`, `linearizable`, `snapshot`) controls what consistency guarantee a READ provides regarding whether the data it returns could later be ROLLED BACK by a replica set failover.',
    deepExplanation:
      "```python\nfrom pymongo import WriteConcern, ReadConcern\n\n# write concern: wait for a MAJORITY of replica set members to acknowledge, with journal confirmation\ndb.orders.with_options(write_concern=WriteConcern(w=\"majority\", j=True)).insert_one({\n    \"customer_id\": \"c1\", \"total\": 550\n})\n\n# w=1 (the historical default): only the PRIMARY needs to acknowledge — fastest, but\n# a primary crash immediately after acknowledging (before replicating to any secondary)\n# could lose that write entirely if the crashed primary never recovers\ndb.logs.with_options(write_concern=WriteConcern(w=1)).insert_one({\"event\": \"page_view\"})\n\n# read concern: \"majority\" guarantees the data returned has been acknowledged by a majority\n# and will NOT be rolled back even if the current primary subsequently fails\ncollection = db.orders.with_options(read_concern=ReadConcern(\"majority\"))\norder = collection.find_one({\"_id\": order_id})\n```\n\nThe durability-vs-performance tradeoff, made concrete: `w: 1` (acknowledge as soon as the PRIMARY alone has applied the write, no journal wait) is the fastest possible write, but carries genuine data-loss risk — if the primary crashes before that write has replicated to ANY secondary, and the primary\\\n\nStep 1 — Understand the topic.\nTopic: Write concern and read concern — durability, acknowledgement, and consistency tradeoffs\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ncollection.with_options(\n    write_concern=WriteConcern(\n        w=\"majority\"\n    )\n).insert_one({\n    \"sku\": \"A\"\n})\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ncollection.with_options(\n    read_concern=ReadConcern(\"majority\")\n).find_one({\n    \"sku\": \"A\"\n})\n```\n\nStep 5 — Example result:\n```text\ndurable majority-aware operation\n```\n\nStep 6 — Complexity / trade-off:\nConcerns are consistency/durability controls, not generic performance switches.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A payments service writes every transaction with `w: \"majority\", j: True` (durability is non-negotiable for money) but a separate, high-volume clickstream-analytics service writes page-view events with `w: 1` (occasionally losing an event during a rare primary failure is an acceptable tradeoff for the analytics service\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Write concern and read concern — durability, acknowledgement, and consistency tradeoffs**.",
    bestPractices: [
      'Use `w: "majority"` (with `j: true` for the strongest durability guarantee) as the default write concern for any write where data loss would be a real business problem — treat weaker write concerns as a deliberate, justified exception, not the default.',
      'Use `read_concern="majority"` for reads that inform subsequent user-facing decisions or writes, to avoid acting on data that could later be rolled back by a failover.',
      'Reserve weak write concerns (`w: 1` or `w: 0`) explicitly and only for genuinely disposable, high-volume, loss-tolerant data where the throughput gain is worth the durability risk.',
    ],
    tradeOffs:
      'Stronger write/read concern levels (`majority`) give real durability and rollback-safety guarantees at the cost of additional latency (waiting for replica acknowledgement) on every write, and slightly more conservative (marginally lagged) reads; weaker levels (`w: 1`, default read concern) are faster but expose the application to a genuine, if rare, risk of acknowledged-then-lost writes during a primary failure — the right choice is data-criticality-dependent, not a single blanket setting for an entire application.',
    commonMistakes: [
      'Using the historical default write concern (`w: 1`) for genuinely critical data (payments, orders) without realizing it does not guarantee the write survives an immediate primary failure.',
      'Reading with the default (non-majority) read concern for data that will inform an immediate subsequent decision, risking acting on data that a later failover could roll back.',
      'Applying `w: "majority", j: true` blanket-wide to every single write in the application, including genuinely disposable high-volume data, needlessly paying the latency cost where it provides no real business value.',
    ],
    followUpQuestions: [
      'Walk through, step by step, exactly how a write acknowledged with `w: 1` could be permanently lost after being read and acted upon by a client.',
      'Why does `read_concern="majority"` protect against reading data that could later be rolled back, mechanically?',
      'How would you decide, collection by collection, which write concern level is appropriate for a given production system?',
    ],
    relatedTopics: ['Write Concern', 'Read Concern', 'Durability', 'Majority Acknowledgement', 'Rollback', 'Replica Sets'],
  },
  {
    id: 'python-m20-14',
    number: 'PY-M20-14',
    title: 'Sharding — shard keys, chunks, the balancer, and the hot-shard problem',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Sharding',
    expectedAnswer:
      'Sharding horizontally partitions a collection\'s data across multiple `mongod` shards, routed transparently by `mongos` using metadata stored on CONFIG SERVERS; the SHARD KEY (a field or fields chosen at collection creation) determines how documents are distributed into CHUNKS, which the BALANCER automatically redistributes across shards to keep them roughly even. A GOOD shard key has high CARDINALITY (many distinct values), even FREQUENCY (no single value dominates), and avoids MONOTONICITY (a key that always increases, like a timestamp or auto-incrementing ObjectId used as-is, concentrates ALL new writes on a single shard — the "hot shard" problem) — HASHED sharding is the standard fix for an otherwise-monotonic natural key.',
    deepExplanation:
      "```text\n                    mongos            (stateless query router; consults config servers for chunk locations)\n                      |\n             Config Servers        (store cluster metadata: which chunks live on which shard)\n                      |\n          +-----------+-----------+\n          v                       v\n       Shard 1                 Shard 2      (each shard is itself typically its own replica set)\n     (chunks A-M)             (chunks N-Z)\n```\n\nThe HOT SHARD problem, worked concretely — a naive choice of `_id` (ObjectId, which is roughly chronologically increasing) or `created_at` as a RANGE shard key:\n\n```javascript\n// BAD shard key for a high-write-volume collection: MONOTONICALLY increasing\nsh.shardCollection(\"shop.events\", { created_at: 1 })\n// every NEW document has a created_at GREATER than all prior ones — so every single\n// new INSERT lands in the chunk holding the highest range, which lives on exactly\n// ONE shard — that one shard absorbs 100% of write traffic while every other shard sits idle\n```\n\nThe fix — HASHED sharding, which distributes documents essentially randomly (via a hash of the key) across shards, completely destroying the monotonic ordering that caused the hot shard:\n\n```javascript\nsh.shardCollection(\"shop.events\", { created_at: \"hashed\" })\n// now writes are spread roughly evenly across ALL shards, since a hash of a\n// continuously-increasing timestamp is effectively uniformly distributed\n```\n\nThe explicit tradeoff hashed sharding introduces: you gain even write distribution, but LOSE the ability to do efficient RANGE queries across the shard key (e.g. \"all events between two dates\") without hitting every shard (a \"scatter-gather\" query), since hashed values no longer preserve the original field\\\n\nStep 1 — Understand the topic.\nTopic: Sharding — shard keys, chunks, the balancer, and the hot-shard problem\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nsh.enableSharding(\"shop\")\n\nsh.shardCollection(\n    \"shop.orders\",\n    {\"customer_id\": \"hashed\"},\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nsh.shardCollection(\n    \"shop.orders\",\n    {\"created_at\": 1},\n)\n```\n\nStep 5 — Example result:\n```text\ncollection sharded\n```\n\nStep 6 — Complexity / trade-off:\nChoose a shard key for distribution, query targeting, growth, and avoidance of hot shards.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A multi-tenant SaaS platform\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Sharding — shard keys, chunks, the balancer, and the hot-shard problem**.",
    bestPractices: [
      'Evaluate a candidate shard key against all three criteria explicitly — cardinality, frequency (even distribution), and monotonicity — before committing to it, since changing a shard key on an already-sharded, populated collection is a significant operational undertaking.',
      'Use hashed sharding specifically to neutralize an otherwise-monotonic natural key\'s hot-shard risk, accepting the loss of efficient native range queries on that field as the explicit tradeoff.',
      'Consider a COMPOUND shard key (a high-cardinality, evenly-distributed field plus a naturally range-queried field) when both even write distribution AND range-query locality genuinely matter for the collection\'s dominant access pattern.',
    ],
    tradeOffs:
      'Range sharding preserves efficient range queries but is vulnerable to hot shards for monotonic keys; hashed sharding guarantees even write distribution but sacrifices efficient native range queries (forcing scatter-gather across all shards for a range condition on the hashed field) — the correct choice depends entirely on whether the collection\'s dominant real-world access pattern favors even write throughput or efficient range scans, and a compound key is often the way to get both for the RIGHT combination of fields.',
    commonMistakes: [
      'Choosing a monotonically-increasing field (timestamp, or ObjectId/auto-increment used directly) as a RANGE shard key for a high-write-volume collection, concentrating all new writes onto a single shard.',
      'Choosing a low-cardinality or unevenly-distributed field (a boolean, or a field where one value dominates) as a shard key, preventing the balancer from ever creating a genuinely even distribution.',
      'Switching to hashed sharding to fix a hot-shard problem without recognizing the resulting loss of efficient native range queries on that field, then being surprised by slow, scatter-gather range queries afterward.',
    ],
    followUpQuestions: [
      'Walk through exactly why a monotonically increasing shard key concentrates all new writes on a single shard, mechanically, in terms of how chunk ranges are assigned.',
      'How would a compound shard key like `{tenant_id: 1, created_at: 1}` avoid both the hot-shard problem AND the loss of range-query efficiency that pure hashed sharding introduces?',
      'What operational challenges arise when you need to CHANGE the shard key of an already-large, already-sharded, actively-written production collection?',
    ],
    relatedTopics: ['Sharding', 'Shard Key', 'Hot Shard', 'Hashed Sharding', 'Range Sharding', 'Balancer', 'mongos'],
  },
  {
    id: 'python-m20-15',
    number: 'PY-M20-15',
    title: 'TTL indexes and change streams — automatic expiry and real-time event notification',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'TTL & Change Streams',
    expectedAnswer:
      'A TTL (Time To Live) index automatically deletes documents once a designated date field is in the past — implemented as a background job that runs roughly every 60 seconds, meaning expiry is EVENTUAL, not instantaneous, which matters for anything relying on precise-to-the-second deletion timing. CHANGE STREAMS let application code subscribe to a real-time feed of insert/update/delete/replace events on a collection (built on the same oplog mechanism replica sets use internally), commonly used to drive notification systems, cache invalidation, or search-index synchronization without polling.',
    deepExplanation:
      "TTL index — automatic session/OTP expiry, exactly the pattern from Module 19 revisited with its precise limitations:\n\n```python\ndb.sessions.create_index(\"expires_at\", expireAfterSeconds=0)\n# documents are deleted once `expires_at` (an actual Date field) is in the PAST\n# — the background TTL monitor thread runs approximately every 60 seconds, so a\n# document can persist for up to roughly a minute PAST its nominal expiry time\n\ndb.otp_codes.create_index(\"created_at\", expireAfterSeconds=300)\n# an alternative form: expire exactly N seconds after a FIXED point in time (created_at),\n# rather than requiring the application to compute and store an explicit expires_at field\n```\n\nTTL LIMITATIONS worth naming explicitly for an interview: (1) not instantaneous — never rely on a TTL index for anything requiring precise, guaranteed-immediate deletion (e.g. a security-critical \"this token must be unusable within milliseconds of expiry\" requirement needs an explicit expiry CHECK in application logic, with the TTL index as a cleanup mechanism, not the sole enforcement); (2) TTL indexes cannot be COMPOUND (only a single field); (3) they do not fire on capped collections.\n\nChange streams — a Python worker reacting to new orders in real time:\n\n```python\nfrom pymongo import MongoClient\n\nclient = MongoClient(\"mongodb://localhost:27017/?replicaSet=rs0\")   # change streams require a replica set (or sharded cluster)\ndb = client[\"shop\"]\n\nresume_token = None\ntry:\n    with db.orders.watch([{\"$match\": {\"operationType\": \"insert\"}}]) as stream:\n        for change in stream:\n            resume_token = change[\"_id\"]                       # save this after EVERY processed event\n            new_order = change[\"fullDocument\"]\n            send_order_confirmation_notification(new_order)      # react to the event in real time\nexcept Exception:\n    # on a dropped connection, RESUME exactly where you left off using the saved token —\n    # this is what makes change streams reliable rather than \"best effort\"\n    with db.orders.watch([{\"$match\": {\"operationType\": \"insert\"}}], resume_after=resume_token) as stream:\n        for change in stream:\n            ...\n```\n\nWhy the RESUME TOKEN matters, precisely: a change stream is a live, ongoing subscription — if the worker process crashes, or the network connection drops, events that occurred during the outage would otherwise be LOST forever with no way to know what was missed. Persisting the resume token after each processed event (to a durable store, not just in-process memory) and passing `resume_after=<token>` when re-establishing the stream after a restart guarantees the worker picks up EXACTLY where it left off, with no gap and no duplicate processing (beyond the usual at-least-once semantics inherent to resuming — a worker crash between processing an event and persisting its resume token could reprocess that one event, so downstream handlers should be idempotent).\n\nChange streams vs polling: the alternative to change streams (an application periodically running `find({updated_at: {$gt: last_poll_time}})` on a timer) is simpler to implement but introduces real latency (bounded by the poll interval) and wasted work (most polls find nothing new) — change streams push events with near-real-time latency and no wasted polling, at the cost of needing a replica set (or sharded cluster; NOT available on a lone standalone `mongod`) and the added operational complexity of correct resume-token handling for reliability.\n\nStep 1 — Understand the topic.\nTopic: TTL indexes and change streams — automatic expiry and real-time event notification\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndb.sessions.create_index(\n    \"expires_at\",\n    expireAfterSeconds=0,\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nstream = collection.watch()\n\nfor change in stream:\n    print(change[\"operationType\"])\n```\n\nStep 5 — Example result:\n```text\nautomatic expiry / change event\n```\n\nStep 6 — Complexity / trade-off:\nTTL automates expiry; change streams provide ordered collection/database event feeds.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A search-index synchronization service uses a change stream on the `products` collection to push every insert/update/delete into an Elasticsearch index in near-real-time, persisting its resume token to a small durable state collection after each processed batch — this replaced an earlier design that periodically re-indexed the ENTIRE products collection on a timer, eliminating both the staleness window and the wasted work of re-processing unchanged documents on every cycle.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **TTL indexes and change streams — automatic expiry and real-time event notification**.",
    bestPractices: [
      'Never rely on a TTL index for time-sensitive security enforcement (e.g. "this token must be unusable the instant it expires") — check expiry explicitly in application logic and use the TTL index purely as an eventual cleanup mechanism.',
      'Always persist a change stream\'s resume token durably (not just in memory) after processing each event, and use `resume_after` to recover cleanly from a dropped connection or worker restart with no gap.',
      'Design change-stream event handlers to be IDEMPOTENT, since a crash between processing an event and persisting its resume token can cause that one event to be delivered again on resume.',
    ],
    tradeOffs:
      'Change streams give near-real-time, low-overhead event notification without polling, but require a replica set (or sharded cluster) deployment and correct resume-token handling for true reliability — for a simple, low-frequency, latency-tolerant use case, a periodic polling query is genuinely simpler to implement and operate correctly, and the added complexity of change streams is only clearly worth it once real-time responsiveness or avoiding wasted polling work actually matters.',
    commonMistakes: [
      'Relying on a TTL index\'s expiry timing for something requiring precise, immediate enforcement, being surprised that expired-but-not-yet-TTL-deleted documents can still be read for up to roughly a minute.',
      'Running a change stream without persisting (or without ever using) a resume token, silently losing events that occurred during any connection drop or worker restart.',
      'Writing non-idempotent change-stream event handlers, causing incorrect duplicate processing on the rare occasion an event is redelivered after a resume.',
    ],
    followUpQuestions: [
      'Why do change streams require a replica set (or sharded cluster) and not work on a standalone `mongod`?',
      'How would you design a change-stream consumer to guarantee at-least-once (not at-most-once) event processing, and why does that require idempotent handlers?',
      'What would you use instead of (or in addition to) a TTL index if you needed genuinely instantaneous expiry enforcement?',
    ],
    relatedTopics: ['TTL Index', 'Change Streams', 'Resume Token', 'Real-Time Events', 'Idempotency'],
  },
  {
    id: 'python-m20-16',
    number: 'PY-M20-16',
    title: 'MongoDB security and NoSQL injection — RBAC, least privilege, and safe query construction',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'MongoDB Security',
    expectedAnswer:
      'MongoDB security follows the same core principles as any production database: RBAC (role-based access control, scoped per-user, least-privilege), TLS in transit, and authentication always enabled (never run with `--noauth` in production) — but MongoDB additionally has a NoSQL-specific injection vector: because a MongoDB query filter is itself a live DATA STRUCTURE (a dict/BSON document, not a string that gets parsed like SQL), passing UNSANITIZED user input directly as part of a query filter can let an attacker inject MongoDB OPERATORS (like `$gt`, `$ne`, `$where`) instead of a plain value, fundamentally changing the query\'s meaning.',
    deepExplanation:
      "RBAC/least-privilege setup, mirroring the PostgreSQL pattern from Module 15:\n\n```javascript\n// application role: only the CRUD privileges the app actually needs, on a specific database\ndb.createRole({\n  role: \"appReadWrite\",\n  privileges: [{ resource: { db: \"shop\", collection: \"\" }, actions: [\"find\", \"insert\", \"update\", \"remove\"] }],\n  roles: [],\n})\ndb.createUser({ user: \"app_user\", pwd: \"s3cret\", roles: [{ role: \"appReadWrite\", db: \"shop\" }] })\n\n// read-only reporting role — cannot write at all\ndb.createUser({ user: \"readonly_reporting\", pwd: \"r3port\", roles: [{ role: \"read\", db: \"shop\" }] })\n```\n\nThe NoSQL injection vulnerability, concretely — a login endpoint that naively builds a query filter from raw request input:\n\n```python\n# VULNERABLE: request.json is used DIRECTLY as (part of) the MongoDB query filter\n@app.post(\"/login\")\nasync def login_unsafe(request: Request):\n    body = await request.json()\n    user = db.users.find_one({\"username\": body[\"username\"], \"password\": body[\"password\"]})\n    # if an attacker sends {\"username\": \"admin\", \"password\": {\"$ne\": \"\"}}\n    # the query filter BECOMES: {\"username\": \"admin\", \"password\": {\"$ne\": \"\"}}\n    # which matches ANY user named \"admin\" whose password is not an empty string —\n    # i.e., ALMOST CERTAINLY MATCHES, completely bypassing the password check entirely!\n    if user:\n        return {\"token\": create_token(user)}\n```\n\nThe SAFE fix — explicit type validation via Pydantic BEFORE the value ever touches a query, guaranteeing it can only ever be the plain scalar type expected, never an operator dict:\n\n```python\nfrom pydantic import BaseModel\n\nclass LoginRequest(BaseModel):\n    username: str      # Pydantic REJECTS a dict/object here — {\"$ne\": \"\"} fails validation with a 422,\n    password: str       # never reaching the database query at all\n\n@app.post(\"/login\")\nasync def login_safe(payload: LoginRequest):\n    user = db.users.find_one({\"username\": payload.username})   # only username in the filter\n    if user is None or not verify_password(payload.password, user[\"password_hash\"]):\n        raise HTTPException(status_code=401, detail=\"Invalid credentials\")\n    return {\"token\": create_token(user)}\n```\n\nThe core lesson, stated generally: NEVER pass a raw, user-controlled dict/object directly as (or into) a MongoDB query filter — always pass it through explicit type validation (Pydantic models with concrete field types) first, which structurally guarantees a client cannot smuggle an operator object where a plain scalar was expected. This is conceptually the exact same DEFENSE as SQL parameterized queries (Module 18) — never let attacker-controlled input influence the STRUCTURE of a query, only its scalar VALUES.\n\nA second, related injection vector worth naming: the (mostly legacy, and disabled by default in modern MongoDB configurations) `$where` operator executes arbitrary JavaScript server-side — accepting user input into a `$where` clause is a direct remote-code-execution-adjacent risk and should never be done; modern MongoDB deployments should have `$where`/server-side JavaScript execution disabled entirely unless there is a very specific, carefully audited need for it.\n\nStep 1 — Understand the topic.\nTopic: MongoDB security and NoSQL injection — RBAC, least privilege, and safe query construction\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nsafe_filter = {\n    \"email\": user_email,\n}\n\ndocument = collection.find_one(\n    safe_filter\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\ndocument = collection.find_one({\n    \"email\": user_email\n})\n```\n\nStep 5 — Example result:\n```text\ndocument lookup by exact field\n```\n\nStep 6 — Complexity / trade-off:\nNever pass untrusted operators or arbitrary field paths directly into MongoDB queries.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A security audit of a legacy internal admin tool found a search endpoint building `db.users.find(json.loads(request.args[\"filter\"]))` directly from a raw, fully user-controlled JSON query string — an attacker could pass an ENTIRELY ARBITRARY MongoDB query filter (including `$where` if enabled), effectively giving them unrestricted read access to the collection; the remediation replaced the raw filter with an explicit, narrow ALLOWLIST of specific supported search fields, each validated to a concrete scalar type via Pydantic before being assembled into the actual query.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **MongoDB security and NoSQL injection — RBAC, least privilege, and safe query construction**.",
    bestPractices: [
      'Always validate user-supplied values through explicit, concretely-typed Pydantic models (or equivalent) BEFORE they are used to construct any part of a MongoDB query filter — never pass a raw user-controlled dict/JSON object directly into a query.',
      'Never expose `$where` (server-side JavaScript execution) to any path influenced by user input, and disable it entirely in production deployments unless a specific, carefully-audited need exists.',
      'Apply the same least-privilege RBAC discipline to MongoDB as to any production database — scoped application roles, a separate read-only reporting role, and never running the application against an admin-level account.',
    ],
    tradeOffs:
      'Strict per-field type validation before every query adds a small amount of upfront schema/validation code for every user-input-influenced endpoint, but is the ONLY reliable structural defense against NoSQL operator injection — allowing any "flexible" raw-filter-passthrough endpoint (even for legitimate internal tooling convenience) trades that safety for developer convenience in a way that is very difficult to retrofit safely once such a pattern is established across a codebase.',
    commonMistakes: [
      'Passing raw, user-supplied request body/query-string content directly into a MongoDB query filter without type validation, allowing operator injection (`{"$ne": ""}`, `{"$gt": ""}`) to bypass intended query semantics entirely.',
      'Leaving `$where`/server-side JavaScript execution enabled in production with no specific need for it, expanding the attack surface unnecessarily.',
      'Running the production application against an over-privileged MongoDB account (e.g. one with admin/cluster-management privileges) instead of a narrowly-scoped application role.',
    ],
    followUpQuestions: [
      'Walk through exactly how `{"password": {"$ne": ""}}` bypasses a naive login check, step by step, in terms of how MongoDB interprets the resulting query filter.',
      'Why does explicit Pydantic type validation structurally prevent NoSQL operator injection, in a way that manual "sanitization" attempts (e.g. stripping `$` characters) do not reliably achieve?',
      'How would you design a "flexible search" admin feature that lets users filter by several fields WITHOUT exposing raw, unrestricted query-filter passthrough?',
    ],
    relatedTopics: ['MongoDB Security', 'NoSQL Injection', 'RBAC', 'Least Privilege', 'Pydantic Validation', '$where'],
  },
  {
    id: 'python-m20-17',
    number: 'PY-M20-17',
    title: 'Coding: a full aggregation pipeline — monthly revenue by category with top customer per category',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Aggregation Framework',
    expectedAnswer:
      'A realistic senior-level analytics exercise combines this module\'s aggregation skills end to end: `$match` to scope the time window, `$unwind` to expand order line items, `$group` (twice — once per customer-per-category, once collapsing to category-level with `$push`/`$slice` for the top customer), and `$sort`/`$project` to shape the final report — exactly the kind of pipeline that would back a "monthly revenue by category" merchandising dashboard.',
    deepExplanation:
      "```javascript\n// sample input `orders` documents\n{ _id: 1, customer: \"c1\", placed_at: ISODate(\"2026-01-05\"), items: [\n    { category: \"electronics\", product: \"Laptop\", subtotal: 999 },\n    { category: \"books\", product: \"Novel\", subtotal: 20 },\n]}\n{ _id: 2, customer: \"c2\", placed_at: ISODate(\"2026-01-10\"), items: [\n    { category: \"electronics\", product: \"Mouse\", subtotal: 25 },\n]}\n{ _id: 3, customer: \"c1\", placed_at: ISODate(\"2026-01-20\"), items: [\n    { category: \"electronics\", product: \"Keyboard\", subtotal: 45 },\n]}\n\ndb.orders.aggregate([\n  { $match: { placed_at: { $gte: ISODate(\"2026-01-01\"), $lt: ISODate(\"2026-02-01\") } } },\n  { $unwind: \"$items\" },\n  // after $unwind: one document per (order, line item) pair, e.g.\n  // { customer: \"c1\", placed_at: ..., items: { category: \"electronics\", product: \"Laptop\", subtotal: 999 } }\n\n  {\n    $group: {\n      _id: { category: \"$items.category\", customer: \"$customer\" },\n      customer_spend: { $sum: \"$items.subtotal\" },\n    },\n  },\n  // after this $group: revenue per (category, customer) pair —\n  // { _id: { category: \"electronics\", customer: \"c1\" }, customer_spend: 1044 }\n  // { _id: { category: \"electronics\", customer: \"c2\" }, customer_spend: 25 }\n  // { _id: { category: \"books\", customer: \"c1\" }, customer_spend: 20 }\n\n  { $sort: { customer_spend: -1 } },\n\n  {\n    $group: {\n      _id: \"$_id.category\",\n      total_revenue: { $sum: \"$customer_spend\" },\n      top_customer: { $first: \"$_id.customer\" },       // relies on the preceding $sort\n      top_customer_spend: { $first: \"$customer_spend\" },\n    },\n  },\n  // after this SECOND $group:\n  // { _id: \"electronics\", total_revenue: 1069, top_customer: \"c1\", top_customer_spend: 1044 }\n  // { _id: \"books\", total_revenue: 20, top_customer: \"c1\", top_customer_spend: 20 }\n\n  { $sort: { total_revenue: -1 } },\n  {\n    $project: {\n      _id: 0,\n      category: \"$_id\",\n      total_revenue: 1,\n      top_customer: 1,\n      top_customer_spend: 1,\n    },\n  },\n]);\n\n// EXACT expected output:\n// [\n//   { category: \"electronics\", total_revenue: 1069, top_customer: \"c1\", top_customer_spend: 1044 },\n//   { category: \"books\", total_revenue: 20, top_customer: \"c1\", top_customer_spend: 20 }\n// ]\n```\n\nEquivalent Python:\n\n```python\nfrom datetime import datetime\n\npipeline = [\n    {\"$match\": {\"placed_at\": {\"$gte\": datetime(2026, 1, 1), \"$lt\": datetime(2026, 2, 1)}}},\n    {\"$unwind\": \"$items\"},\n    {\"$group\": {\"_id\": {\"category\": \"$items.category\", \"customer\": \"$customer\"}, \"customer_spend\": {\"$sum\": \"$items.subtotal\"}}},\n    {\"$sort\": {\"customer_spend\": -1}},\n    {\"$group\": {\"_id\": \"$_id.category\", \"total_revenue\": {\"$sum\": \"$customer_spend\"}, \"top_customer\": {\"$first\": \"$_id.customer\"}, \"top_customer_spend\": {\"$first\": \"$customer_spend\"}}},\n    {\"$sort\": {\"total_revenue\": -1}},\n    {\"$project\": {\"_id\": 0, \"category\": \"$_id\", \"total_revenue\": 1, \"top_customer\": 1, \"top_customer_spend\": 1}},\n]\nreport = list(db.orders.aggregate(pipeline))\n```\n\nIndex recommendation for this pipeline\\\n\nStep 1 — Understand the topic.\nTopic: Coding: a full aggregation pipeline — monthly revenue by category with top customer per category\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\npipeline = [\n    {\"$match\": {\"status\": \"paid\"}},\n    {\n        \"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }\n    },\n    {\"$sort\": {\"revenue\": -1}},\n]\n\nresult = list(\n    collection.aggregate(pipeline)\n)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nresult = list(\n    collection.aggregate([\n        {\"$match\": {\"status\": \"paid\"}},\n        {\"$group\": {\n            \"_id\": \"$customer_id\",\n            \"revenue\": {\"$sum\": \"$total\"},\n        }},\n    ])\n)\n```\n\nStep 5 — Example result:\n```text\ncustomers grouped by paid revenue\n```\n\nStep 6 — Complexity / trade-off:\nPush filtering early in the pipeline and index the match fields.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact pipeline shape backs a monthly merchandising report showing category performance and each category\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: a full aggregation pipeline — monthly revenue by category with top customer per category**.",
    bestPractices: [
      'Push the time-window `$match` to the very first pipeline stage (before the expensive `$unwind`), and back it with an index on the matched field, to minimize how many documents flow into the costlier downstream stages.',
      'Always place the `$sort` immediately before any `$group` stage relying on `$first`/`$last`, since those accumulators are order-dependent.',
      'Consider pre-computing and caching genuinely expensive, multi-stage analytical pipelines like this one (via a scheduled job) rather than running them live on every dashboard request.',
    ],
    tradeOffs:
      'This pipeline is expressive enough to compute a genuinely non-trivial analytical report entirely server-side in one round trip, but the `$unwind` stage (expanding every order into one document per line item) and double `$group` add real CPU/memory cost proportional to total line-item volume in the matched date range — for a very large `orders` collection, pre-aggregating and caching the result (as in the production example) is usually the right call over running this live per request.',
    commonMistakes: [
      'Omitting the `$sort` before the second `$group`, causing `top_customer`/`top_customer_spend` to reflect an arbitrary (non-deterministic) customer rather than the genuinely highest-spending one.',
      'Placing the `$match` time-window filter AFTER the `$unwind` stage instead of before it, forcing the expensive unwind to process far more documents (including ones outside the desired date range) than necessary.',
      'Running this multi-stage pipeline live on every dashboard page load for a large collection instead of pre-computing and caching the result on a schedule.',
    ],
    followUpQuestions: [
      'How would you extend this pipeline to show the TOP 3 customers per category, not just the single top one?',
      'How would you incorporate a `$lookup` to also include each top customer\'s email address in the final report output?',
      'How would `.explain()` on this pipeline reveal whether the initial `$match` is actually using the `placed_at` index as intended?',
    ],
    relatedTopics: ['Aggregation Pipeline', '$unwind', '$group', '$first', 'Analytics', 'Pipeline Optimization'],
  },
];

export const MOCK_PYTHON_MODULE20_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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