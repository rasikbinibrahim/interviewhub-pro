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
      'The design process, concretely, in order:\n\n```text\n1. List the application\'s actual QUERIES (not just the entities) — e.g. "render a product page",\n   "list a customer\'s order history", "compute monthly revenue by category"\n2. For each query, ask: which fields are read/written TOGETHER, and how often does each piece change?\n3. Group fields that are read together and change together into ONE document (embed)\n4. Split fields that are queried/updated independently, grow unboundedly, or are shared\n   across many parents into SEPARATE collections (reference)\n5. Only THEN design indexes to support the resulting query shapes\n```\n\nA concrete illustration of why "normalize everything" (the relational instinct) is often wrong for MongoDB: a `product` document that separately normalizes `price_history` into its own always-referenced collection, when the ACTUAL access pattern is "always show the current price, rarely show history", forces an extra query/`$lookup` on the hot path (rendering a product) to serve a cold path (viewing price history) — the correct MongoDB-native design embeds only the CURRENT price directly on the product document and references a separate `price_history` collection only for the rare "show history" query, matching each piece\'s actual access frequency to its storage location.\n\nThe recurring anti-pattern this catches: engineers coming from a relational background often reflexively normalize MongoDB schemas into many small, foreign-keyed collections "because that is what correct design looks like" — but without the SQL JOIN engine\'s ability to cheaply recombine them at query time, this recreates the application-level N+1 query problem MongoDB\'s document model was specifically designed to avoid. The corrective mental model: "one document per THING the application actually fetches as a unit" beats "one collection per relational entity type."',
    productionExample:
      'A social media platform initially modeled `posts` and `comments` as fully separate, foreign-keyed collections (the relational instinct) and found every feed-rendering request needed N+1 queries (one for the posts, then one per post for its comments); the redesign EMBEDDED a bounded, recent subset of comments directly in the post document (with a separate `comments` collection only for the "view all comments" cold path beyond that bounded preview) — collapsing the feed-render query from N+1 round trips to exactly one.',
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
      'Worked comparison, an order/customer schema, THREE relationship shapes side by side:\n\n```javascript\n// ONE-TO-FEW: a customer\'s shipping addresses (bounded, rarely more than 2-3, always fetched\n// together with the customer) — EMBED directly, no separate collection needed\n{\n  _id: ObjectId("..."),\n  name: "Ada Lovelace",\n  email: "ada@example.com",\n  addresses: [\n    { label: "home", city: "London", zip: "SW1A" },\n    { label: "work", city: "London", zip: "EC1A" }\n  ]\n}\n\n// ONE-TO-MANY: an order\'s line items (bounded per order, typically under a few dozen,\n// always fetched together with the order) — EMBED, since items have no independent lifecycle\n{\n  _id: ObjectId("..."),\n  customer_id: ObjectId("..."),          // REFERENCE to the customer — orders queried independently of customer doc\n  items: [\n    { product_id: ObjectId("..."), name: "Laptop", quantity: 1, unit_price: 999.00 },\n    { product_id: ObjectId("..."), name: "Mouse", quantity: 2, unit_price: 25.00 }\n  ],\n  total: 1049.00,\n  placed_at: ISODate("2026-01-15T10:00:00Z")\n}\n\n// ONE-TO-SQUILLIONS: a product\'s reviews (UNBOUNDED — a popular product can have\n// hundreds of thousands) — REFERENCE, a separate `reviews` collection, never embed\n{\n  _id: ObjectId("..."),      // in the `reviews` collection\n  product_id: ObjectId("..."),   // reference back to the product\n  customer_id: ObjectId("..."),\n  rating: 5,\n  text: "Great laptop!",\n  posted_at: ISODate("2026-01-20T09:00:00Z")\n}\n// db.reviews.createIndex({ product_id: 1, posted_at: -1 })  -- supports "recent reviews for this product"\n```\n\nWhy "one-to-squillions" must never be embedded, concretely: MongoDB enforces a hard 16MB PER-DOCUMENT size limit — an unboundedly-growing embedded array (reviews, activity log entries, chat messages in a long-running conversation) will EVENTUALLY hit that ceiling and start failing writes, often not until the collection has been in production for months, making it a dangerous, delayed-onset failure mode rather than an immediately obvious design mistake. Beyond the hard limit, even well before hitting it, a large embedded array means every read of the PARENT document (e.g. loading a product page) transfers and deserializes the entire, ever-growing array even when only the first page of reviews is actually needed — a growing performance tax that scales with the array\'s size, not the page actually being displayed.\n\nThe decision framework, stated as a checklist: embed if (a) the related data is naturally BOUNDED (a hard, small ceiling — addresses, order line items), (b) it is ALWAYS or almost always read together with the parent, and (c) it does not need to be queried/paginated/sorted independently at scale. Reference if ANY of those fail — especially unbounded growth (squillions) or a genuine need for independent querying (reviews queried by rating, filtered, paginated, moderated independently of any one product page load).',
    productionExample:
      'An e-commerce platform originally embedded ALL of a product\'s reviews directly in the product document; once popular products accumulated tens of thousands of reviews, product-page load times degraded severely (megabytes of review text transferred on every page view) and a handful of extremely popular products began approaching the 16MB document limit — the fix moved reviews to a separate, indexed `reviews` collection referenced by `product_id`, with the product page now querying only the first page of reviews via `find({product_id}).sort({posted_at: -1}).limit(10)`.',
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
      'Worked example — "total revenue per customer, for orders placed in 2026, customers with more than $500 in orders", given sample `orders` documents:\n\n```javascript\n// sample input documents in the `orders` collection\n{ _id: 1, customer_id: "c1", total: 300, placed_at: ISODate("2026-01-05") }\n{ _id: 2, customer_id: "c1", total: 250, placed_at: ISODate("2026-02-10") }\n{ _id: 3, customer_id: "c2", total: 150, placed_at: ISODate("2026-01-20") }\n{ _id: 4, customer_id: "c1", total: 100, placed_at: ISODate("2025-12-01") }   // excluded: not 2026\n\ndb.orders.aggregate([\n  { $match: { placed_at: { $gte: ISODate("2026-01-01"), $lt: ISODate("2027-01-01") } } },\n  // after $match: documents 1, 2, 3 remain (document 4 is filtered out — placed in 2025)\n\n  { $group: { _id: "$customer_id", total_revenue: { $sum: "$total" }, order_count: { $sum: 1 } } },\n  // after $group: { _id: "c1", total_revenue: 550, order_count: 2 }\n  //               { _id: "c2", total_revenue: 150, order_count: 1 }\n\n  { $match: { total_revenue: { $gt: 500 } } },\n  // after this SECOND $match (filtering the GROUPED result, like SQL HAVING): only c1 remains\n\n  { $project: { _id: 0, customer_id: "$_id", total_revenue: 1, order_count: 1 } },\n  // reshapes the output document, renaming _id to customer_id and dropping the raw _id field\n\n  { $sort: { total_revenue: -1 } },\n  { $limit: 10 },\n]);\n\n// FINAL expected output:\n// [ { customer_id: "c1", total_revenue: 550, order_count: 2 } ]\n```\n\nEquivalent Python (PyMongo):\n\n```python\npipeline = [\n    {"$match": {"placed_at": {"$gte": datetime(2026, 1, 1), "$lt": datetime(2027, 1, 1)}}},\n    {"$group": {"_id": "$customer_id", "total_revenue": {"$sum": "$total"}, "order_count": {"$sum": 1}}},\n    {"$match": {"total_revenue": {"$gt": 500}}},\n    {"$project": {"_id": 0, "customer_id": "$_id", "total_revenue": 1, "order_count": 1}},\n    {"$sort": {"total_revenue": -1}},\n    {"$limit": 10},\n]\nresults = list(db.orders.aggregate(pipeline))\n```\n\nA critical performance principle: place `$match` stages as EARLY as possible in the pipeline (ideally first) — an early `$match` on an indexed field lets MongoDB use that index to filter documents BEFORE any expensive `$group`/`$unwind`/`$lookup` work happens, dramatically reducing the number of documents flowing through the rest of the pipeline; a `$match` placed late (after a `$group`, for instance) can only filter the already-computed, already-expensive aggregated results (which is exactly the "SQL HAVING" role the second `$match` plays above — filtering GROUPS, which necessarily must happen after `$group`, but any filter that CAN be expressed on raw documents should be pushed to the very first stage).\n\n`$unwind` deserves special mention: given a document with an array field `{tags: ["a", "b", "c"]}`, `{$unwind: "$tags"}` produces THREE separate output documents, each with `tags` replaced by a single string value (`"a"`, `"b"`, or `"c"`) — this is the standard technique for then `$group`-ing or filtering by individual array elements, but it multiplies document count through the pipeline and should be used deliberately, not habitually.',
    productionExample:
      'A financial reporting dashboard\'s "revenue by customer this quarter" feature runs almost exactly the pipeline shown above nightly, writing results to a small pre-aggregated `reports` collection that the dashboard actually queries at request time — computing the aggregation ONCE per night rather than on every dashboard page load, since the underlying `orders` collection aggregation, while indexed and reasonably fast, is still meaningfully more expensive than reading a few dozen pre-computed rows.',
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
      'Basic `$lookup` — a simple equality join, `orders` to `customers`:\n\n```javascript\ndb.orders.aggregate([\n  { $match: { _id: 101 } },\n  {\n    $lookup: {\n      from: "customers",\n      localField: "customer_id",\n      foreignField: "_id",\n      as: "customer",           // result is an ARRAY field, even for a to-one relationship\n    },\n  },\n  { $unwind: "$customer" },     // flatten the single-element array into a plain sub-document\n]);\n// input order: { _id: 101, customer_id: "c1", total: 550 }\n// input customer: { _id: "c1", name: "Ada Lovelace", email: "ada@example.com" }\n// OUTPUT: { _id: 101, customer_id: "c1", total: 550, customer: { _id: "c1", name: "Ada Lovelace", email: "ada@..." } }\n```\n\nPIPELINE `$lookup` — needed for correlated conditions beyond simple equality (e.g. "the customer\'s 3 MOST RECENT orders", not just a plain equi-join):\n\n```javascript\ndb.customers.aggregate([\n  {\n    $lookup: {\n      from: "orders",\n      let: { cust_id: "$_id" },\n      pipeline: [\n        { $match: { $expr: { $eq: ["$customer_id", "$$cust_id"] } } },\n        { $sort: { placed_at: -1 } },\n        { $limit: 3 },   // NOT expressible with basic $lookup — requires the pipeline form\n      ],\n      as: "recent_orders",\n    },\n  },\n]);\n```\n\n`$lookup` vs a SQL JOIN, precisely: conceptually similar (combining data across two collections/tables by a matching key), but `$lookup` is ALWAYS effectively a left-outer join (documents with no match get an empty array, never dropped) and, critically, runs the "join" logic at the APPLICATION-query layer inside a single `mongod`\'s aggregation engine rather than a purpose-built relational join optimizer — for LARGE foreign collections without a supporting index on the foreign field, a `$lookup` can be significantly more expensive than an equivalent well-indexed SQL JOIN, since MongoDB was not originally architected around cross-collection joins as a first-class, highly-optimized operation the way a relational engine is.\n\n`$facet` — running MULTIPLE independent sub-pipelines over the same input set and combining their outputs into one document, commonly used for "give me both the paginated results AND the total count" in a single round trip:\n\n```javascript\ndb.products.aggregate([\n  { $match: { category: "electronics" } },\n  {\n    $facet: {\n      results: [ { $sort: { price: 1 } }, { $skip: 0 }, { $limit: 20 } ],\n      total_count: [ { $count: "count" } ],\n    },\n  },\n]);\n// OUTPUT: { results: [ ...20 products... ], total_count: [ { count: 137 } ] }\n```\n\n`$bucket` groups documents into caller-defined RANGES (e.g. price bands for a histogram):\n\n```javascript\ndb.products.aggregate([\n  { $bucket: { groupBy: "$price", boundaries: [0, 100, 500, 1000, 5000], default: "5000+", output: { count: { $sum: 1 } } } },\n]);\n// OUTPUT: [ {_id: 0, count: 12}, {_id: 100, count: 45}, {_id: 500, count: 20}, {_id: 1000, count: 5}, {_id: "5000+", count: 2} ]\n```',
    productionExample:
      'A product catalog page needs BOTH a page of sorted, filtered results AND the total matching count for pagination UI — using `$facet` computes both in ONE aggregation round trip instead of two separate queries (a `find().sort().skip().limit()` plus a separate `count_documents()`), reducing round-trip overhead on a high-traffic listing endpoint at the cost of a slightly more complex pipeline to construct and parse.',
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
      'Worked example — "the single top-selling product per category, by total quantity sold", given sample `order_items` documents:\n\n```javascript\n// sample input\n{ product: "Laptop", category: "electronics", quantity: 3 }\n{ product: "Mouse", category: "electronics", quantity: 10 }\n{ product: "Novel", category: "books", quantity: 7 }\n{ product: "Textbook", category: "books", quantity: 2 }\n\ndb.order_items.aggregate([\n  {\n    $group: {\n      _id: { category: "$category", product: "$product" },\n      total_quantity: { $sum: "$quantity" },\n    },\n  },\n  // after this $group: one document per (category, product) pair with its summed quantity\n\n  { $sort: { "_id.category": 1, total_quantity: -1 } },\n  // sorted so the highest-quantity product comes FIRST within each category\n\n  {\n    $group: {\n      _id: "$_id.category",\n      top_product: { $first: "$_id.product" },      // $first picks from the CURRENT sort order within the group\n      top_quantity: { $first: "$total_quantity" },\n    },\n  },\n  // after this SECOND $group (grouping by category alone, relying on the prior sort):\n  // { _id: "electronics", top_product: "Mouse", top_quantity: 10 }\n  // { _id: "books", top_product: "Novel", top_quantity: 7 }\n]);\n```\n\nWhy `$first`/`$last` depend on SORT ORDER, precisely: unlike `$sum`/`$avg`/`$min`/`$max` (which are order-independent — the sum is the sum regardless of document order), `$first` and `$last` return whichever document happens to be first/last in the order the accumulator STAGE actually receives documents — which, WITHIN one `$group` stage, is the incoming pipeline order, i.e. the order established by any `$sort` stage placed immediately before it. This is precisely why the pipeline above sorts BEFORE the second `$group` — omitting that sort would make `$first`/`$last` return an ARBITRARY (whatever order the previous stage happened to produce) result, a very common, subtle aggregation bug.\n\nExpression operators inside `$project`/`$addFields`, a few worked examples:\n\n```javascript\ndb.orders.aggregate([\n  {\n    $addFields: {\n      // $cond: inline if/then/else\n      tier: { $cond: { if: { $gte: ["$total", 1000] }, then: "VIP", else: "Standard" } },\n      // $ifNull: fallback for a missing/null field\n      display_name: { $ifNull: ["$customer_nickname", "Guest"] },\n      // $map: transform every element of an array\n      item_names: { $map: { input: "$items", as: "item", in: "$$item.name" } },\n      // $filter: keep only array elements matching a condition\n      expensive_items: { $filter: { input: "$items", as: "item", cond: { $gt: ["$$item.price", 100] } } },\n    },\n  },\n]);\n```',
    productionExample:
      'A "top-selling product per category" merchandising report on an e-commerce admin dashboard runs almost exactly the double-`$group` pattern above nightly — a naive alternative (running a separate query PER category to find its top product, in a loop from application code) would require one round trip per category; the single aggregation pipeline computes all categories\' top products in ONE server-side pass.',
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
      '```javascript\n// single-field index — the basic building block, same B-tree structure as PostgreSQL\ndb.users.createIndex({ email: 1 })\n\n// multikey index — created AUTOMATICALLY when you index an array field; one index\n// entry is created PER ARRAY ELEMENT, letting queries on individual elements use the index\ndb.products.createIndex({ tags: 1 })   // products with tags: ["a","b","c"] get 3 index entries, one per tag\n\n// text index — basic full-text search support (tokenizes, stems, supports relevance scoring)\ndb.articles.createIndex({ title: "text", body: "text" })\ndb.articles.find({ $text: { $search: "mongodb performance" } })\n\n// TTL index — documents are automatically deleted once `expires_at` is in the past\ndb.sessions.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })\n// a background task runs roughly every 60 seconds and deletes expired documents —\n// NOT instantaneous; a document can persist briefly past its expiry time\n\n// unique index — rejects any insert/update that would create a duplicate value\ndb.users.createIndex({ email: 1 }, { unique: true })\n\n// sparse index — only includes documents where the indexed field actually EXISTS\ndb.users.createIndex({ phone: 1 }, { sparse: true })   // documents with no `phone` field are excluded from the index\n\n// partial index — the modern, more flexible generalization of sparse: only indexes\n// documents matching an arbitrary filter expression (not just "field exists")\ndb.users.createIndex(\n  { email: 1 },\n  { unique: true, partialFilterExpression: { is_deleted: { $ne: true } } }\n)\n\n// wildcard index — indexes an unknown/dynamic set of sub-fields, e.g. a flexible `metadata` object\ndb.products.createIndex({ "metadata.$**": 1 })\n```\n\nWhy multikey indexes matter operationally: they make array-element queries (`db.products.find({tags: "electronics"})`) efficient WITHOUT any special query syntax — from the query author\'s perspective it looks like a normal equality query, but MongoDB is silently using the fact that the index has one entry per array element. The important LIMITATION: MongoDB does not support a COMPOUND multikey index where MORE THAN ONE of the indexed fields is an array in the SAME document (this would cause a combinatorial explosion of index entries) — attempting to create such an index raises an error.\n\nPartial indexes are generally preferred over sparse indexes in modern MongoDB because they express an ARBITRARY filter condition (not just "field exists"), which is exactly what makes the soft-delete-safe unique index pattern (Module 19) possible — a sparse index alone cannot express "unique among non-deleted documents", but a partial index can.\n\nText indexes are appropriate for BASIC search needs (a single collection, moderate scale, simple relevance) — for serious full-text search requirements (typo tolerance, faceted search, complex relevance tuning, very high query volume), a dedicated search engine (Elasticsearch, Atlas Search) is the production-grade answer, a distinction covered further in Module 21\'s search topic.',
    productionExample:
      'A SaaS platform\'s `users` collection uses a PARTIAL unique index on `email` (scoped to `is_deleted: {$ne: true}`) specifically so a user who deletes their account (soft delete) and later signs up again with the same email address does not collide with their own old, soft-deleted record — a plain unique index (or even a sparse one) cannot express this "unique only among active records" condition, only a partial index can.',
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
      'Worked example — a query filtering orders by status (equality), sorting by date (sort), and filtering by a price range (range):\n\n```javascript\n// the query this index needs to support:\ndb.orders.find({\n  status: "shipped",                          // EQUALITY\n  total: { $gte: 100, $lte: 1000 },            // RANGE\n}).sort({ placed_at: -1 })                     // SORT\n\n// following ESR: Equality field first, then Sort field, then Range field last\ndb.orders.createIndex({ status: 1, placed_at: -1, total: 1 })\n```\n\nWhy this exact ORDER matters, mechanically: a compound index is one physically sorted structure, sorted first by the first field, then by the second field WITHIN each value of the first, and so on. Putting `status` (equality) FIRST means MongoDB can jump directly to the "shipped" section of the index. Putting `placed_at` (sort) SECOND means that, WITHIN the "shipped" section, entries are already in the exact order the query wants to sort by — so no separate in-memory sort step is needed. Putting `total` (range) LAST is correct because a RANGE condition on an index field breaks the "everything after this point in the index is still usefully ordered for the NEXT field" property — once you introduce a range scan on a field, any FURTHER fields in the index after it can no longer be used to satisfy an additional equality/sort efficiently, which is why range fields belong last, not before other fields you still need to filter/sort by.\n\nA concrete illustration of getting the order WRONG: `db.orders.createIndex({ total: 1, status: 1, placed_at: -1 })` (range field first) forces MongoDB to scan across the WHOLE range of `total` values within the index, unable to narrow first by the more selective equality condition on `status` — this is a meaningfully less efficient index for the SAME query, even though it contains the exact same three fields.\n\nWhy ESR is a GUIDELINE, not gospel: `.explain()` can reveal cases where deviating helps — for instance, if the range condition is actually extremely SELECTIVE (narrows the result set dramatically) while the equality condition is not very selective at all (matches most documents), the "optimal" field order for that SPECIFIC data distribution can differ from the general ESR heuristic. The only way to know for certain is to test the actual query against the actual data\'s cardinality/selectivity with `.explain("executionStats")`, not to apply ESR mechanically and assume it is automatically correct for every situation.',
    productionExample:
      'An orders dashboard query filtering by `status` and a `placed_at` date range, sorted by `placed_at`, initially had an index built in field-declaration order rather than ESR order — `.explain()` revealed the query was still performing a costly in-memory SORT stage despite an index existing; rebuilding the index as `{status: 1, placed_at: -1}` (equality then sort, with the range condition ALSO on `placed_at` handled naturally since it is the same field as the sort) eliminated the in-memory sort entirely and cut query latency by over 90%.',
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
      'Selectivity, concretely: an index on `is_active: boolean` across 10 million users, where 9.5 million are active, gives the query planner almost NO useful narrowing for `find({is_active: true})` — it would still need to examine roughly 9.5 million index entries, arguably WORSE than a plain collection scan due to the extra index-traversal overhead on top of reading nearly all matching documents anyway; the planner may reasonably choose a COLLSCAN over using that low-selectivity index. Contrast with an index on `email` (near-unique per document) — extremely high selectivity, an index lookup for one email narrows to essentially one document immediately.\n\nCovered query, worked example:\n\n```javascript\ndb.users.createIndex({ status: 1, email: 1 })\n\n// this query is FULLY COVERED: both the filter field (status) and the\n// projected fields (email) are present in the index — MongoDB never touches\n// the actual documents on disk/in the collection\ndb.users.find({ status: "active" }, { email: 1, _id: 0 })\n// .explain() would show totalDocsExamined: 0 for a truly covered query\n```\n\nIndex intersection — MongoDB CAN combine two separate single-field indexes to satisfy one query (using both, then intersecting the resulting document-id sets), but this is generally a FALLBACK the planner uses when no single compound index exists to cover the query well, and is typically less efficient than a purpose-built compound index would be for the same query shape — you should not deliberately DESIGN around relying on index intersection; build the right compound index instead.\n\nWrite overhead, precisely: every additional index on a collection means every INSERT/UPDATE/DELETE must also update that index\'s B-tree structure — a collection with 15 indexes pays a real, cumulative write-latency cost on every single write operation, and consumes additional WiredTiger cache memory to keep those indexes\' hot portions resident. This is exactly why "just add an index for every field that might ever be queried" is not free engineering — indexes should be added deliberately, in response to observed hot query patterns (confirmed via `.explain()` and, in production, tools like the MongoDB "unused indexes" reporting), not preemptively for every conceivable future query.',
    productionExample:
      'A `users` collection had accumulated 18 indexes over time (many added speculatively "just in case", several never actually used by any real query) — write latency on user updates had crept up noticeably; auditing actual query patterns against `$indexStats` revealed 7 of the 18 indexes had near-zero usage, and dropping them measurably improved write throughput with zero impact on any real query, since nothing was actually relying on the unused indexes.',
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
      'Diagnosing a slow query, before and after adding an index — given an `orders` collection with 5 million documents and NO index on `status`:\n\n```javascript\ndb.orders.find({ status: "cancelled" }).explain("executionStats")\n\n// BEFORE (no index) — relevant excerpt of the output:\n// {\n//   "winningPlan": { "stage": "COLLSCAN" },   // <- full collection scan, the red flag\n//   "executionStats": {\n//     "nReturned": 1200,                       // only 1,200 documents actually matched\n//     "totalDocsExamined": 5000000,            // but ALL 5 MILLION were examined to find them\n//     "totalKeysExamined": 0,                  // no index was used at all\n//     "executionTimeMillis": 1840               // slow: nearly 2 full seconds\n//   }\n// }\n\ndb.orders.createIndex({ status: 1 })\ndb.orders.find({ status: "cancelled" }).explain("executionStats")\n\n// AFTER (with the index) — relevant excerpt:\n// {\n//   "winningPlan": { "stage": "FETCH", "inputStage": { "stage": "IXSCAN", "indexName": "status_1" } },\n//   "executionStats": {\n//     "nReturned": 1200,\n//     "totalDocsExamined": 1200,                // now examines EXACTLY the matching documents\n//     "totalKeysExamined": 1200,                 // index entries examined matches documents returned — ideal\n//     "executionTimeMillis": 4                   // dramatically faster: milliseconds, not seconds\n//   }\n// }\n```\n\nThe key diagnostic RATIO to internalize: `totalDocsExamined` (or `totalKeysExamined`) compared to `nReturned` — in the BEFORE case, the ratio is 5,000,000 : 1,200 (over 4,000x more work than strictly necessary); in the AFTER case, the ratio is 1,200 : 1,200 (a PERFECT ratio — every document examined was actually returned, meaning zero wasted work). A large gap between examined-vs-returned is the single most reliable, at-a-glance signal that a query needs a better (or any) supporting index, regardless of the specific numbers involved.\n\n`FETCH` vs pure `IXSCAN`: the AFTER plan shows a `FETCH` stage wrapping the `IXSCAN` — this means the index scan identified the matching document LOCATIONS, and then MongoDB had to go FETCH the actual documents from the collection\'s data files (because the query needed fields beyond what the index itself stores) — a TRULY covered query (Module 20\'s prior question) would show NO `FETCH` stage at all, with `totalDocsExamined: 0`, since the index alone contained everything needed.\n\n`planningTimeMillis` (how long the planner itself spent choosing a plan) is usually negligible but worth knowing about separately from `executionTimeMillis` (the actual query execution time) — a query with unexpectedly high planning time relative to execution time can indicate an overly complex query shape or an excessive number of candidate indexes being evaluated.',
    productionExample:
      'An on-call engineer investigating a "slow orders page" incident ran `.explain("executionStats")` on the exact query the endpoint issued, immediately spotted `"stage": "COLLSCAN"` and a `totalDocsExamined` in the millions against an `nReturned` in the hundreds — the fifteen-minute diagnosis (versus much longer without `.explain()`, guessing at possible causes) directly identified the missing index as the root cause, and adding it resolved the incident.',
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
      'A worked "create order, reduce inventory, create payment" transaction, atomically or not at all:\n\n```python\nfrom pymongo.errors import ConnectionFailure, OperationFailure\n\ndef place_order(client, customer_id, items, payment_info):\n    with client.start_session() as session:\n        def callback(session):\n            db = client["shop"]\n            # 1. create the order\n            order_result = db.orders.insert_one(\n                {"customer_id": customer_id, "items": items, "status": "pending"},\n                session=session,\n            )\n            # 2. atomically decrement inventory, FAILING the whole transaction if stock is insufficient\n            for item in items:\n                result = db.inventory.update_one(\n                    {"product_id": item["product_id"], "quantity": {"$gte": item["quantity"]}},\n                    {"$inc": {"quantity": -item["quantity"]}},\n                    session=session,\n                )\n                if result.matched_count == 0:\n                    # insufficient stock — raising here triggers an ABORT of the ENTIRE transaction,\n                    # rolling back the order insert from step 1 as well\n                    raise ValueError(f"Insufficient stock for product {item[\'product_id\']}")\n            # 3. create the payment record\n            db.payments.insert_one(\n                {"order_id": order_result.inserted_id, **payment_info, "status": "captured"},\n                session=session,\n            )\n            return order_result.inserted_id\n\n        # with_transaction automatically COMMITS on success, ABORTS (rolls back everything) on any\n        # exception, and automatically RETRIES the whole callback on certain transient errors\n        # (e.g. a replica set election happening mid-transaction) per MongoDB driver recommendations\n        return session.with_transaction(callback)\n```\n\nWhy `with_transaction` (not manual `start_transaction`/`commit_transaction`) is the RECOMMENDED modern pattern: multi-document transactions can fail with specific TRANSIENT errors (e.g. `TransientTransactionError`, often caused by a replica set primary election happening mid-transaction) that are safe and expected to retry automatically — `with_transaction` implements this retry logic correctly out of the box (following MongoDB\'s official recommended retry loop), while hand-rolling manual commit/abort code risks missing this retry handling and failing user-facing operations on what should have been a transparent, automatic retry.\n\nComparison to PostgreSQL transactions, precisely: conceptually very similar (ACID: all-or-nothing, isolated from concurrent transactions, durable once committed), but the PRACTICAL usage pattern differs — in PostgreSQL, wrapping several statements in a transaction is the NATURAL, lightweight default for any multi-statement operation; in MongoDB, single-document atomicity already covers a large fraction of what would otherwise need a transaction in a relational schema (because MongoDB documents are often designed, per this module\'s data-modeling principles, to keep related data that changes TOGETHER inside one document specifically to AVOID needing a multi-document transaction) — multi-document transactions in MongoDB are reached for as the EXCEPTION, for cases (like the inventory example above, spanning genuinely separate collections) where the data truly cannot or should not be embedded together.',
    productionExample:
      'An e-commerce checkout flow uses a multi-document transaction spanning `orders`, `inventory`, and `payments` (three collections, per the design principles in this module — these are separate because inventory and payments are queried/updated independently and at very different rates than orders) specifically to guarantee that a failed inventory decrement (insufficient stock) NEVER leaves an orphaned order or a payment charged without a corresponding successful order — exactly the failure mode a transaction exists to prevent.',
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
      'The WRONG way to decrement inventory (a classic read-modify-write race):\n\n```python\n# RACE CONDITION: two concurrent requests can both read quantity=1, both decide\n# \"stock is available\", and both proceed to sell — resulting in quantity=-1 (oversold)\ndef buy_product_UNSAFE(product_id, quantity_requested):\n    product = db.products.find_one({"_id": product_id})\n    if product["quantity"] >= quantity_requested:\n        db.products.update_one({"_id": product_id}, {"$inc": {"quantity": -quantity_requested}})\n        return True\n    return False\n```\n\nThe CORRECT, atomic-condition fix — put the stock-sufficiency check directly IN the query filter, so the check-and-decrement happens as ONE atomic operation:\n\n```python\ndef buy_product_SAFE(product_id, quantity_requested):\n    result = db.products.update_one(\n        {"_id": product_id, "quantity": {"$gte": quantity_requested}},   # condition checked ATOMICALLY\n        {"$inc": {"quantity": -quantity_requested}},\n    )\n    return result.matched_count == 1   # False means either the product does not exist OR stock was insufficient\n```\n\nThis works because MongoDB evaluates the ENTIRE query filter and applies the update as a single atomic document-level operation — there is no window between "check" and "write" for a concurrent request to interleave, unlike the unsafe version\'s separate `find_one` then `update_one` calls.\n\nFor updates where the validity condition is MORE complex than a simple numeric comparison (e.g. "only update this document if it has not been modified since I last read it, for an arbitrary multi-field update"), explicit VERSION-FIELD optimistic concurrency control is the general-purpose pattern:\n\n```python\ndef update_profile_with_optimistic_lock(user_id, expected_version, updates, max_retries=3):\n    for attempt in range(max_retries):\n        result = db.users.update_one(\n            {"_id": user_id, "version": expected_version},          # only succeeds if version still matches\n            {"$set": {**updates, "version": expected_version + 1}}, # bump the version atomically\n        )\n        if result.matched_count == 1:\n            return True   # success — no conflicting concurrent update happened\n        # version mismatch means someone else updated the document first — re-read and retry\n        current = db.users.find_one({"_id": user_id}, {"version": 1})\n        expected_version = current["version"]\n    raise RuntimeError("Update failed after max retries due to concurrent modification")\n```\n\nWhy this is called "OPTIMISTIC": it assumes conflicts are RARE and proceeds without ever taking an explicit lock, only detecting and handling the rare conflict case (via the version mismatch causing `matched_count == 0`) with a retry — contrasted with PESSIMISTIC locking (holding an explicit lock, e.g. via `findAndModify`-style exclusive access patterns, or the equivalent of PostgreSQL\'s `SELECT FOR UPDATE`, which MongoDB does not have a direct native equivalent of, making optimistic concurrency the more idiomatic MongoDB pattern for this class of problem).',
    productionExample:
      'A flash-sale feature selling a strictly limited quantity of a popular product uses the atomic condition-in-filter pattern (`{"_id": product_id, "quantity": {"$gte": requested}}`) directly, rather than a separate read-then-write — under a burst of thousands of concurrent purchase attempts in the sale\'s first seconds, this guarantees the product can never be oversold, with `matched_count == 0` cleanly telling the losing requests "sold out" with no race window at all.',
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
      '```text\n          Primary  (accepts ALL writes; also serves reads by default)\n         /       \\\n        v         v\n Secondary     Secondary   (continuously replicate from the primary\'s OPLOG)\n```\n\nThe OPLOG (operations log) is a special, capped collection on the primary recording every write operation in order; secondaries continuously TAIL this oplog and apply the same operations to their own copy of the data — this is how replication actually happens, and it is why REPLICATION LAG exists at all: a secondary is only ever as up to date as however far behind it currently is in applying the oplog, which under normal conditions is milliseconds but can grow under heavy write load or network issues on a specific secondary.\n\nElection mechanics, at a useful level of detail for an interview: replica set members exchange HEARTBEATS continuously; if a majority of the set stops hearing from the primary within the configured timeout, the remaining eligible members hold an election (a Raft-like consensus protocol) and promote the member with the most up-to-date oplog (among eligible candidates) to primary — this typically completes within a few seconds, during which the replica set has NO primary and cannot accept writes (though reads from secondaries, depending on read preference, can continue).\n\nRead preference tradeoffs, precisely:\n\n```text\nprimary            — always read from primary; strongest consistency, no staleness, but no read scaling\nprimaryPreferred   — primary if available, else fall back to a secondary; mostly consistent, available during primary outages\nsecondary          — always read from a secondary; offloads primary, but reads can be STALE by the current replication lag\nsecondaryPreferred — secondary if available, else primary; favors offloading reads, tolerant of stale data\nnearest            — whichever member has the lowest network latency (primary or secondary); optimizes for latency over consistency\n```\n\nA concrete illustration of the staleness risk: a write to the primary (e.g. "user just changed their password") followed IMMEDIATELY by a read using `read_preference=SECONDARY` could, under replication lag, return the OLD password hash if that secondary has not yet applied the write — this is exactly why security/consistency-critical reads should use `primary` or `primaryPreferred`, while read-scaling-friendly, staleness-tolerant reads (e.g. an analytics dashboard, a "recently viewed" feed where a few-hundred-millisecond staleness is imperceptible) are excellent candidates for `secondaryPreferred`/`nearest`.',
    productionExample:
      'An analytics dashboard querying aggregated reporting data uses `read_preference=secondaryPreferred` to offload that (read-heavy, staleness-tolerant) traffic away from the primary, which is reserved for the transactional write-heavy checkout flow — while the checkout flow\'s own reads (e.g. "does this user\'s account still have this payment method") use the default `primary` preference, since stale reads there could cause genuine correctness issues.',
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
      '```python\nfrom pymongo import WriteConcern, ReadConcern\n\n# write concern: wait for a MAJORITY of replica set members to acknowledge, with journal confirmation\ndb.orders.with_options(write_concern=WriteConcern(w="majority", j=True)).insert_one({\n    "customer_id": "c1", "total": 550\n})\n\n# w=1 (the historical default): only the PRIMARY needs to acknowledge — fastest, but\n# a primary crash immediately after acknowledging (before replicating to any secondary)\n# could lose that write entirely if the crashed primary never recovers\ndb.logs.with_options(write_concern=WriteConcern(w=1)).insert_one({"event": "page_view"})\n\n# read concern: \"majority\" guarantees the data returned has been acknowledged by a majority\n# and will NOT be rolled back even if the current primary subsequently fails\ncollection = db.orders.with_options(read_concern=ReadConcern("majority"))\norder = collection.find_one({"_id": order_id})\n```\n\nThe durability-vs-performance tradeoff, made concrete: `w: 1` (acknowledge as soon as the PRIMARY alone has applied the write, no journal wait) is the fastest possible write, but carries genuine data-loss risk — if the primary crashes before that write has replicated to ANY secondary, and the primary\'s data is unrecoverable, the write is permanently lost despite having been "acknowledged" to the client. `w: "majority"` waits for a majority of the replica set to confirm before acknowledging — this means the write is guaranteed to SURVIVE even if the current primary immediately fails afterward (since a majority, including at least one secondary, already has it), at the cost of the extra network round trip(s) to those secondaries before the write is considered complete.\n\nWhen each write concern level is appropriate: `w: "majority", j: true` for anything genuinely durability-critical (financial transactions, order placement, account state changes) — this is the modern recommended baseline for most meaningful production writes; `w: 1` (or even `w: 0`, fire-and-forget, no acknowledgement at all) only for genuinely disposable, high-volume, loss-tolerant data (e.g. non-critical analytics event logging where losing an occasional event under a rare primary-crash-and-non-recovery scenario is an acceptable tradeoff for maximum write throughput).\n\nRead concern `"majority"` specifically prevents a subtle correctness trap: reading data from the CURRENT primary that was written with only `w: 1` and has NOT yet replicated to a majority — if that primary then fails and a DIFFERENT secondary (which never received that write) is elected the new primary, the write effectively "disappears" (a ROLLBACK) even though a client already read and acted on it moments earlier. `read_concern="majority"` guarantees the application never reads data that could later vanish this way, at the cost of only being able to read data that has already achieved majority acknowledgement (slightly more conservative/lagged than reading the absolute latest state on the primary).',
    productionExample:
      'A payments service writes every transaction with `w: "majority", j: True` (durability is non-negotiable for money) but a separate, high-volume clickstream-analytics service writes page-view events with `w: 1` (occasionally losing an event during a rare primary failure is an acceptable tradeoff for the analytics service\'s need to sustain very high write throughput without the extra replication-acknowledgement latency).',
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
      '```text\n                    mongos            (stateless query router; consults config servers for chunk locations)\n                      |\n             Config Servers        (store cluster metadata: which chunks live on which shard)\n                      |\n          +-----------+-----------+\n          v                       v\n       Shard 1                 Shard 2      (each shard is itself typically its own replica set)\n     (chunks A-M)             (chunks N-Z)\n```\n\nThe HOT SHARD problem, worked concretely — a naive choice of `_id` (ObjectId, which is roughly chronologically increasing) or `created_at` as a RANGE shard key:\n\n```javascript\n// BAD shard key for a high-write-volume collection: MONOTONICALLY increasing\nsh.shardCollection("shop.events", { created_at: 1 })\n// every NEW document has a created_at GREATER than all prior ones — so every single\n// new INSERT lands in the chunk holding the highest range, which lives on exactly\n// ONE shard — that one shard absorbs 100% of write traffic while every other shard sits idle\n```\n\nThe fix — HASHED sharding, which distributes documents essentially randomly (via a hash of the key) across shards, completely destroying the monotonic ordering that caused the hot shard:\n\n```javascript\nsh.shardCollection("shop.events", { created_at: "hashed" })\n// now writes are spread roughly evenly across ALL shards, since a hash of a\n// continuously-increasing timestamp is effectively uniformly distributed\n```\n\nThe explicit tradeoff hashed sharding introduces: you gain even write distribution, but LOSE the ability to do efficient RANGE queries across the shard key (e.g. "all events between two dates") without hitting every shard (a "scatter-gather" query), since hashed values no longer preserve the original field\'s ordering — RANGE sharding (the default, non-hashed form) preserves range-query efficiency (a date-range query can be routed to just the relevant shards) but is vulnerable to the hot-shard problem for monotonic keys, exactly the tension the tradeoff must be resolved for based on the collection\'s actual dominant access pattern (write-distribution priority vs range-query-efficiency priority).\n\nWhat makes a shard key GOOD, as three explicit criteria: (1) CARDINALITY — many distinct possible values (a boolean `is_active` field, with only 2 possible values, is a terrible shard key — chunks could never be split beyond 2 buckets); (2) FREQUENCY — values should be roughly evenly represented (a `country` field where 80% of documents are `"US"` creates one enormous, unsplittable chunk for that value); (3) non-MONOTONICITY (or explicitly hashed if monotonic) — as detailed above. A commonly-recommended pattern for genuinely balancing both write-distribution AND range-query needs is a COMPOUND shard key combining a high-cardinality, evenly-distributed field with a monotonic one (e.g. `{customer_id: 1, created_at: 1}` for a multi-tenant events collection) — distributing writes across customers while still preserving useful range-query locality WITHIN a given customer\'s data.\n\nThe BALANCER runs as a background process, automatically migrating chunks between shards to keep the overall data (and, in modern MongoDB, ideally the WRITE LOAD) roughly balanced — chunk migrations themselves consume real network/IO resources, which is why balancing activity is often scheduled to run during known low-traffic windows in latency-sensitive production deployments.',
    productionExample:
      'A multi-tenant SaaS platform\'s `events` collection initially shard-keyed on `created_at` alone suffered a severe hot-shard problem (all new-tenant event writes landing on whichever shard held the "current" time range) — migrating to a compound shard key `{tenant_id: 1, created_at: 1}` distributed writes evenly across shards by tenant while still preserving efficient "this tenant\'s events in this date range" range queries, resolving the hot shard without sacrificing the platform\'s most common query pattern.',
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
      'TTL index — automatic session/OTP expiry, exactly the pattern from Module 19 revisited with its precise limitations:\n\n```python\ndb.sessions.create_index("expires_at", expireAfterSeconds=0)\n# documents are deleted once `expires_at` (an actual Date field) is in the PAST\n# — the background TTL monitor thread runs approximately every 60 seconds, so a\n# document can persist for up to roughly a minute PAST its nominal expiry time\n\ndb.otp_codes.create_index("created_at", expireAfterSeconds=300)\n# an alternative form: expire exactly N seconds after a FIXED point in time (created_at),\n# rather than requiring the application to compute and store an explicit expires_at field\n```\n\nTTL LIMITATIONS worth naming explicitly for an interview: (1) not instantaneous — never rely on a TTL index for anything requiring precise, guaranteed-immediate deletion (e.g. a security-critical "this token must be unusable within milliseconds of expiry" requirement needs an explicit expiry CHECK in application logic, with the TTL index as a cleanup mechanism, not the sole enforcement); (2) TTL indexes cannot be COMPOUND (only a single field); (3) they do not fire on capped collections.\n\nChange streams — a Python worker reacting to new orders in real time:\n\n```python\nfrom pymongo import MongoClient\n\nclient = MongoClient("mongodb://localhost:27017/?replicaSet=rs0")   # change streams require a replica set (or sharded cluster)\ndb = client["shop"]\n\nresume_token = None\ntry:\n    with db.orders.watch([{"$match": {"operationType": "insert"}}]) as stream:\n        for change in stream:\n            resume_token = change["_id"]                       # save this after EVERY processed event\n            new_order = change["fullDocument"]\n            send_order_confirmation_notification(new_order)      # react to the event in real time\nexcept Exception:\n    # on a dropped connection, RESUME exactly where you left off using the saved token —\n    # this is what makes change streams reliable rather than \"best effort\"\n    with db.orders.watch([{"$match": {"operationType": "insert"}}], resume_after=resume_token) as stream:\n        for change in stream:\n            ...\n```\n\nWhy the RESUME TOKEN matters, precisely: a change stream is a live, ongoing subscription — if the worker process crashes, or the network connection drops, events that occurred during the outage would otherwise be LOST forever with no way to know what was missed. Persisting the resume token after each processed event (to a durable store, not just in-process memory) and passing `resume_after=<token>` when re-establishing the stream after a restart guarantees the worker picks up EXACTLY where it left off, with no gap and no duplicate processing (beyond the usual at-least-once semantics inherent to resuming — a worker crash between processing an event and persisting its resume token could reprocess that one event, so downstream handlers should be idempotent).\n\nChange streams vs polling: the alternative to change streams (an application periodically running `find({updated_at: {$gt: last_poll_time}})` on a timer) is simpler to implement but introduces real latency (bounded by the poll interval) and wasted work (most polls find nothing new) — change streams push events with near-real-time latency and no wasted polling, at the cost of needing a replica set (or sharded cluster; NOT available on a lone standalone `mongod`) and the added operational complexity of correct resume-token handling for reliability.',
    productionExample:
      'A search-index synchronization service uses a change stream on the `products` collection to push every insert/update/delete into an Elasticsearch index in near-real-time, persisting its resume token to a small durable state collection after each processed batch — this replaced an earlier design that periodically re-indexed the ENTIRE products collection on a timer, eliminating both the staleness window and the wasted work of re-processing unchanged documents on every cycle.',
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
      'RBAC/least-privilege setup, mirroring the PostgreSQL pattern from Module 15:\n\n```javascript\n// application role: only the CRUD privileges the app actually needs, on a specific database\ndb.createRole({\n  role: "appReadWrite",\n  privileges: [{ resource: { db: "shop", collection: "" }, actions: ["find", "insert", "update", "remove"] }],\n  roles: [],\n})\ndb.createUser({ user: "app_user", pwd: "s3cret", roles: [{ role: "appReadWrite", db: "shop" }] })\n\n// read-only reporting role — cannot write at all\ndb.createUser({ user: "readonly_reporting", pwd: "r3port", roles: [{ role: "read", db: "shop" }] })\n```\n\nThe NoSQL injection vulnerability, concretely — a login endpoint that naively builds a query filter from raw request input:\n\n```python\n# VULNERABLE: request.json is used DIRECTLY as (part of) the MongoDB query filter\n@app.post("/login")\nasync def login_unsafe(request: Request):\n    body = await request.json()\n    user = db.users.find_one({"username": body["username"], "password": body["password"]})\n    # if an attacker sends {"username": "admin", "password": {"$ne": ""}}\n    # the query filter BECOMES: {"username": "admin", "password": {"$ne": ""}}\n    # which matches ANY user named "admin" whose password is not an empty string —\n    # i.e., ALMOST CERTAINLY MATCHES, completely bypassing the password check entirely!\n    if user:\n        return {"token": create_token(user)}\n```\n\nThe SAFE fix — explicit type validation via Pydantic BEFORE the value ever touches a query, guaranteeing it can only ever be the plain scalar type expected, never an operator dict:\n\n```python\nfrom pydantic import BaseModel\n\nclass LoginRequest(BaseModel):\n    username: str      # Pydantic REJECTS a dict/object here — {"$ne": ""} fails validation with a 422,\n    password: str       # never reaching the database query at all\n\n@app.post("/login")\nasync def login_safe(payload: LoginRequest):\n    user = db.users.find_one({"username": payload.username})   # only username in the filter\n    if user is None or not verify_password(payload.password, user["password_hash"]):\n        raise HTTPException(status_code=401, detail="Invalid credentials")\n    return {"token": create_token(user)}\n```\n\nThe core lesson, stated generally: NEVER pass a raw, user-controlled dict/object directly as (or into) a MongoDB query filter — always pass it through explicit type validation (Pydantic models with concrete field types) first, which structurally guarantees a client cannot smuggle an operator object where a plain scalar was expected. This is conceptually the exact same DEFENSE as SQL parameterized queries (Module 18) — never let attacker-controlled input influence the STRUCTURE of a query, only its scalar VALUES.\n\nA second, related injection vector worth naming: the (mostly legacy, and disabled by default in modern MongoDB configurations) `$where` operator executes arbitrary JavaScript server-side — accepting user input into a `$where` clause is a direct remote-code-execution-adjacent risk and should never be done; modern MongoDB deployments should have `$where`/server-side JavaScript execution disabled entirely unless there is a very specific, carefully audited need for it.',
    productionExample:
      'A security audit of a legacy internal admin tool found a search endpoint building `db.users.find(json.loads(request.args["filter"]))` directly from a raw, fully user-controlled JSON query string — an attacker could pass an ENTIRELY ARBITRARY MongoDB query filter (including `$where` if enabled), effectively giving them unrestricted read access to the collection; the remediation replaced the raw filter with an explicit, narrow ALLOWLIST of specific supported search fields, each validated to a concrete scalar type via Pydantic before being assembled into the actual query.',
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
      '```javascript\n// sample input `orders` documents\n{ _id: 1, customer: "c1", placed_at: ISODate("2026-01-05"), items: [\n    { category: "electronics", product: "Laptop", subtotal: 999 },\n    { category: "books", product: "Novel", subtotal: 20 },\n]}\n{ _id: 2, customer: "c2", placed_at: ISODate("2026-01-10"), items: [\n    { category: "electronics", product: "Mouse", subtotal: 25 },\n]}\n{ _id: 3, customer: "c1", placed_at: ISODate("2026-01-20"), items: [\n    { category: "electronics", product: "Keyboard", subtotal: 45 },\n]}\n\ndb.orders.aggregate([\n  { $match: { placed_at: { $gte: ISODate("2026-01-01"), $lt: ISODate("2026-02-01") } } },\n  { $unwind: "$items" },\n  // after $unwind: one document per (order, line item) pair, e.g.\n  // { customer: "c1", placed_at: ..., items: { category: "electronics", product: "Laptop", subtotal: 999 } }\n\n  {\n    $group: {\n      _id: { category: "$items.category", customer: "$customer" },\n      customer_spend: { $sum: "$items.subtotal" },\n    },\n  },\n  // after this $group: revenue per (category, customer) pair —\n  // { _id: { category: "electronics", customer: "c1" }, customer_spend: 1044 }\n  // { _id: { category: "electronics", customer: "c2" }, customer_spend: 25 }\n  // { _id: { category: "books", customer: "c1" }, customer_spend: 20 }\n\n  { $sort: { customer_spend: -1 } },\n\n  {\n    $group: {\n      _id: "$_id.category",\n      total_revenue: { $sum: "$customer_spend" },\n      top_customer: { $first: "$_id.customer" },       // relies on the preceding $sort\n      top_customer_spend: { $first: "$customer_spend" },\n    },\n  },\n  // after this SECOND $group:\n  // { _id: "electronics", total_revenue: 1069, top_customer: "c1", top_customer_spend: 1044 }\n  // { _id: "books", total_revenue: 20, top_customer: "c1", top_customer_spend: 20 }\n\n  { $sort: { total_revenue: -1 } },\n  {\n    $project: {\n      _id: 0,\n      category: "$_id",\n      total_revenue: 1,\n      top_customer: 1,\n      top_customer_spend: 1,\n    },\n  },\n]);\n\n// EXACT expected output:\n// [\n//   { category: "electronics", total_revenue: 1069, top_customer: "c1", top_customer_spend: 1044 },\n//   { category: "books", total_revenue: 20, top_customer: "c1", top_customer_spend: 20 }\n// ]\n```\n\nEquivalent Python:\n\n```python\nfrom datetime import datetime\n\npipeline = [\n    {"$match": {"placed_at": {"$gte": datetime(2026, 1, 1), "$lt": datetime(2026, 2, 1)}}},\n    {"$unwind": "$items"},\n    {"$group": {"_id": {"category": "$items.category", "customer": "$customer"}, "customer_spend": {"$sum": "$items.subtotal"}}},\n    {"$sort": {"customer_spend": -1}},\n    {"$group": {"_id": "$_id.category", "total_revenue": {"$sum": "$customer_spend"}, "top_customer": {"$first": "$_id.customer"}, "top_customer_spend": {"$first": "$customer_spend"}}},\n    {"$sort": {"total_revenue": -1}},\n    {"$project": {"_id": 0, "category": "$_id", "total_revenue": 1, "top_customer": 1, "top_customer_spend": 1}},\n]\nreport = list(db.orders.aggregate(pipeline))\n```\n\nIndex recommendation for this pipeline\'s `$match` stage on a large `orders` collection: `db.orders.createIndex({placed_at: 1})` lets the initial time-window filter use an index scan rather than a full collection scan before the (unavoidably expensive, since it must touch every matching document\'s array) `$unwind` stage runs — pushing that filter as early as possible, exactly per this module\'s pipeline-ordering guidance, minimizes how many documents the costly `$unwind`/double-`$group` portion of the pipeline has to process.',
    productionExample:
      'This exact pipeline shape backs a monthly merchandising report showing category performance and each category\'s single biggest customer for the period — run as a scheduled nightly job writing its output to a small `monthly_category_reports` collection, so the actual dashboard simply reads a handful of pre-computed documents rather than re-running this multi-stage aggregation on every page view.',
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
