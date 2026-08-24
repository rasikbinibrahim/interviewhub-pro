// Python + DSA Interview Handbook — Module 18: PostgreSQL Performance +
// Database Engineering. Hand-authored senior/staff-level questions covering
// indexing internals, EXPLAIN ANALYZE, partitioning, replication, high
// availability, database security (RLS, SQL injection), optimistic vs
// pessimistic locking, soft delete, MVCC/VACUUM, database design, and
// real production debugging scenarios (deadlocks, pool exhaustion, slow
// queries on huge tables) — with genuine, runnable PostgreSQL SQL and
// SQLAlchemy code. Mirrors the MockTechnicalQuestion shape defined in
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
    id: 'python-m18-1',
    number: 'PY-M18-1',
    title: 'How B-tree indexes actually work, and why the planner sometimes ignores them',
    difficulty: 'Medium',
    experienceLevel: '4+ Years',
    category: 'Indexing',
    expectedAnswer:
      'A B-tree index is a sorted, balanced tree structure mapping column VALUES to physical row locations (a tuple identifier, or "TID"); a lookup traverses the tree in O(log n) comparisons to find matching TIDs, then does a HEAP FETCH (a second read) to pull the actual row data from the table — this two-step "index then heap" cost is exactly why the planner sometimes prefers a sequential scan: if a query matches a large fraction of the table, the many extra random heap fetches make the index path slower than just reading the table straight through.',
    deepExplanation:
      '```text\nIndex lookup, conceptually:\nB-tree root\n  -> internal nodes (sorted ranges, binary-search-like traversal)\n    -> leaf nodes (sorted column values + TIDs pointing into the heap/table)\n      -> HEAP FETCH: follow each TID to the actual table page to read the full row\n```\n\nWhy the planner can reasonably CHOOSE a sequential scan over an available index — this is not a bug, it is cost-based reasoning:\n\n```sql\nEXPLAIN SELECT * FROM orders WHERE status = \'pending\';\n-- if 40% of a 1M-row table has status=\'pending\', an index scan would still touch ~400,000\n-- scattered heap pages (expensive random I/O) — a Seq Scan reading the table straight\n-- through (cheap sequential I/O) is often genuinely FASTER for a low-selectivity predicate\n                                  QUERY PLAN\n----------------------------------------------------------------\n Seq Scan on orders  (cost=0.00..21500.00 rows=400000 width=120)\n   Filter: (status = \'pending\'::text)\n\nEXPLAIN SELECT * FROM orders WHERE status = \'refunded\';\n-- only 0.1% of rows match -> highly SELECTIVE -> index scan wins decisively\n                                              QUERY PLAN\n---------------------------------------------------------------------------------------\n Index Scan using idx_orders_status on orders  (cost=0.42..8.86 rows=1000 width=120)\n   Index Cond: (status = \'refunded\'::text)\n```\n\nIndex type selection beyond the default B-tree: **B-tree** — the default, correct for equality and range comparisons (`=`, `<`, `>`, `BETWEEN`, sorting) on scalar types; **GIN** (Generalized Inverted Index) — correct for "contains" style queries on composite/multi-valued data: JSONB key/value containment (`@>`), array containment, full-text search (`tsvector`); **GiST** (Generalized Search Tree) — geometric/range/nearest-neighbor queries (PostGIS, `tsrange` overlap, `<->` distance operators); **BRIN** (Block Range Index) — extremely compact index for very large, naturally-ordered append-only data (e.g. a `created_at` column on a huge, insert-only log table), trading precision for a tiny fraction of the storage cost of a B-tree.\n\nA `EXPLAIN ANALYZE` (not just `EXPLAIN`) actually RUNS the query and reports real elapsed time and actual row counts alongside the planner\'s ESTIMATES — comparing `rows=X estimated` against `rows=Y actual` is the single most useful diagnostic for "why did the planner make a bad choice", since a bad choice is almost always caused by stale or inaccurate table statistics (fixable with `ANALYZE table_name;`).',
    productionExample:
      'A reporting query filtering `WHERE status = \'active\'` on a table where 95% of rows are active correctly used a sequential scan even with an index present — a well-meaning engineer "fixed" this by forcing an index scan via a query hint workaround, which made the query MEASURABLY SLOWER, illustrating that "the index exists but is not being used" is very often the planner making the objectively correct call, not a bug to fight.',
    bestPractices: [
      'Run `ANALYZE table_name;` (or rely on autovacuum\'s automatic ANALYZE) after large bulk loads so the planner\'s row-count estimates stay accurate — stale statistics are the most common cause of a genuinely bad plan choice.',
      'Use `EXPLAIN ANALYZE`, not just `EXPLAIN`, when diagnosing a real production slow query — compare estimated vs actual rows to catch planner misestimation.',
      'Choose the index TYPE (B-tree/GIN/GiST/BRIN) based on the query pattern, not habit — a GIN index on a JSONB column you only ever query with `=` on a top-level key is often the wrong tool versus a B-tree expression index.',
    ],
    tradeOffs:
      'Every index accelerates matching reads but adds write overhead (every INSERT/UPDATE/DELETE must also update each index on that table) and consumes storage — an over-indexed table can have WORSE write throughput and higher storage/maintenance (vacuum) cost than the read benefit justifies, so indexes should be added deliberately based on actual observed query patterns, not applied preemptively to every column.',
    commonMistakes: [
      'Assuming "an index exists, therefore the planner should use it" and treating a sequential-scan plan as automatically a bug rather than checking selectivity first.',
      'Never running `ANALYZE` after a large bulk data load/migration, leaving the planner working from stale statistics that lead to genuinely bad plan choices.',
      'Adding a GIN index to a JSONB column that is only ever queried by extracting one top-level scalar key with `=`, when a cheaper B-tree expression index (`(data->>\'key\')`) would serve that exact pattern better.',
    ],
    followUpQuestions: [
      'Why does a heap fetch make an index scan potentially slower than a sequential scan for a low-selectivity predicate, in terms of I/O pattern (random vs sequential)?',
      'What is an "index-only scan", and what has to be true (visibility map, covering index) for PostgreSQL to use one instead of a regular index scan?',
      'When would BRIN outperform B-tree for the exact same column, and why does BRIN require the data to be physically well-correlated with insertion order?',
    ],
    relatedTopics: ['B-tree Index', 'GIN', 'GiST', 'BRIN', 'Query Planner', 'EXPLAIN ANALYZE', 'ANALYZE'],
  },
  {
    id: 'python-m18-2',
    number: 'PY-M18-2',
    title: 'Composite indexes, the leftmost-prefix rule, partial indexes, and expression indexes',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Indexing',
    expectedAnswer:
      'A composite (multi-column) B-tree index on `(email, status)` can efficiently satisfy queries filtering on `email` alone, or on `email AND status` together, but CANNOT efficiently satisfy a query filtering on `status` alone — this is the "leftmost-prefix rule": a composite index is only usable from its leftmost column inward, because the index is physically sorted first by the leftmost column, then by the next, and so on. Partial indexes (`WHERE` clause on the `CREATE INDEX` itself) and expression indexes (indexing a computed expression rather than a raw column) let you build smaller, more targeted indexes for specific, known query patterns.',
    deepExplanation:
      '```sql\nCREATE INDEX idx_users_email_status ON users (email, status);\n\n-- USES the index efficiently (leftmost column, or leftmost+next both present)\nSELECT * FROM users WHERE email = \'ada@example.com\';\nSELECT * FROM users WHERE email = \'ada@example.com\' AND status = \'active\';\n\n-- CANNOT use this index efficiently — status is not the LEFTMOST column,\n-- so the sorted order of the index does not group rows by status alone\nSELECT * FROM users WHERE status = \'active\';   -- falls back to a sequential scan (or a separate index if one exists)\n\n-- a query on email + a DIFFERENT second column also cannot use the (email, status)\n-- index for that second predicate, though it CAN still use it for the email portion\nSELECT * FROM users WHERE email = \'ada@example.com\' AND country = \'US\';\n-- -> index used to find matching emails, then \"country\" is a residual FILTER applied afterward\n\n-- PARTIAL index: smaller, targeted, only indexes rows matching the WHERE clause\nCREATE INDEX idx_users_active_email ON users (email) WHERE status = \'active\';\n-- ideal when the vast majority of queries only ever care about active users,\n-- and \'active\' is a MINORITY of total rows — the index stays small and fast\n\n-- EXPRESSION index: indexes the RESULT of a function/expression, not the raw column\nCREATE INDEX idx_users_lower_email ON users (LOWER(email));\n-- a query MUST use the exact same expression to benefit:\nSELECT * FROM users WHERE LOWER(email) = LOWER(\'Ada@Example.com\');   -- uses the expression index\nSELECT * FROM users WHERE email = \'ada@example.com\';                  -- does NOT use it (different expression)\n```\n\nWhy column ORDER in a composite index is a real design decision, not arbitrary: put the column used for EQUALITY filtering first, and a column used for RANGE filtering or sorting last — e.g. for a query pattern `WHERE customer_id = ? ORDER BY created_at DESC`, the correct index is `(customer_id, created_at DESC)`, NOT `(created_at, customer_id)`, because the equality column narrows the search first, and the index\'s pre-sorted order on `created_at` then directly satisfies the ORDER BY within that narrowed range with zero extra sort step.\n\nA covering index (`CREATE INDEX ... (email, status) INCLUDE (full_name)`) can go further and let PostgreSQL answer a query directly FROM the index alone, without any heap fetch at all (an "index-only scan"), for queries that only need columns present in the index.',
    productionExample:
      'A `users` table query pattern of "look up by email, and sometimes filter to active-only" was served by ONE composite index `(email, status)` rather than two separate single-column indexes — this both satisfies the common `WHERE email = ?` case and the `WHERE email = ? AND status = ?` case from a single, smaller index, while a hypothetical index on `status` alone (a low-cardinality column, mostly \'active\') would have been nearly useless due to poor selectivity.',
    bestPractices: [
      'Order composite index columns with equality-filtered columns first, then range/sort columns last, matching the actual query pattern rather than an arbitrary or alphabetical order.',
      'Use a partial index (`WHERE status = \'active\'`) when queries consistently filter to a known minority subset of rows, keeping the index small and fast rather than indexing the whole table.',
      'Use an expression index only when application code consistently queries via that EXACT expression (e.g. always `LOWER(email)`) — a mismatched expression silently fails to use the index with no error, just a slow plan.',
    ],
    tradeOffs:
      'A single well-designed composite index often serves multiple query patterns and costs less in write overhead/storage than several separate single-column indexes, but is less flexible — it only helps patterns that respect its leftmost-prefix order, whereas separate single-column indexes each independently help their own column\'s filters at the cost of more total write overhead and storage across all of them.',
    commonMistakes: [
      'Assuming a composite index `(a, b)` helps a query filtering only on `b`, then being confused when `EXPLAIN` shows a sequential scan instead.',
      'Building a composite index in an order that does not match the actual query pattern (e.g. range column first, equality column second), losing most of the efficiency benefit.',
      'Creating an expression index but then writing application/ORM code that queries the raw column instead of the exact indexed expression, silently never benefiting from the index.',
    ],
    followUpQuestions: [
      'If you have queries filtering on `email` alone AND queries filtering on `status` alone, would one composite index on `(email, status)` serve both efficiently — why or why not?',
      'What is an index-only scan, and what makes a composite index with `INCLUDE` columns enable one?',
      'How would you decide whether to add a NEW composite index versus reordering an EXISTING one, given both are used by different queries in production?',
    ],
    relatedTopics: ['Composite Indexes', 'Leftmost-Prefix Rule', 'Partial Indexes', 'Expression Indexes', 'Covering Indexes', 'Index-Only Scan'],
  },
  {
    id: 'python-m18-3',
    number: 'PY-M18-3',
    title: 'Reading EXPLAIN ANALYZE — seq scan vs index scan, nested loop vs hash join, cost vs actual time',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Query Optimization',
    expectedAnswer:
      '`EXPLAIN` shows the planner\'s CHOSEN plan and its cost ESTIMATES without running the query; `EXPLAIN ANALYZE` actually EXECUTES the query and additionally reports real elapsed time and actual row counts per plan node — comparing `rows=X` (estimated) against `actual rows=Y` at each node is the primary tool for diagnosing why a query is slow: a large estimate/actual mismatch means the planner had bad statistics and likely chose a suboptimal join strategy or scan type as a direct consequence.',
    deepExplanation:
      '```sql\nEXPLAIN ANALYZE\nSELECT o.id, o.total, c.name\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = \'pending\';\n```\n```text\nHash Join  (cost=45.00..2104.32 rows=850 width=48) (actual time=0.412..18.223 rows=812 loops=1)\n  Hash Cond: (o.customer_id = c.id)\n  ->  Seq Scan on orders o  (cost=0.00..2000.00 rows=850 width=24) (actual time=0.021..15.900 rows=812 loops=1)\n        Filter: (status = \'pending\'::text)\n        Rows Removed by Filter: 99188\n  ->  Hash  (cost=30.00..30.00 rows=1200 width=32) (actual time=0.350..0.351 rows=1200 loops=1)\n        ->  Seq Scan on customers c  (cost=0.00..30.00 rows=1200 width=32) (actual time=0.005..0.150 rows=1200 loops=1)\nPlanning Time: 0.310 ms\nExecution Time: 18.410 ms\n```\n\nReading this precisely: `cost=45.00..2104.32` is the planner\'s ESTIMATED cost range (arbitrary units, roughly "page fetches"; the first number is startup cost, the second is total cost) — NOT milliseconds. `actual time=0.412..18.223` IS real milliseconds (first number: time to first row, second: time to complete this node) from actually running the query. `rows=850` is the ESTIMATE of how many rows this node will produce; `actual rows=812` is the REAL count — close here, meaning statistics are reasonably accurate. `Rows Removed by Filter: 99188` reveals the Seq Scan read ~100,000 rows just to find 812 matches — a strong signal that an index on `orders.status` (if selective enough) could help.\n\nJoin strategy vocabulary: **Nested Loop** — for each row of the outer input, scan/probe the inner input; efficient when the outer side is small or the inner side has a usable index, disastrous (O(n×m)) when both sides are large and unindexed. **Hash Join** — builds an in-memory hash table from the smaller input, then probes it once per row of the larger input; efficient for large, unsorted inputs with equality join conditions, but requires enough `work_mem` to hold the hash table (spills to disk otherwise, which is much slower). **Merge Join** — requires both inputs pre-sorted (or sorts them), then merges them like a zipper; efficient when both inputs are already sorted (e.g. both scanned via an index on the join column) or the data is large enough that a sort-then-merge beats hashing.\n\nDiagnosing THIS specific plan: the Seq Scan on `orders` with `Rows Removed by Filter: 99188` against only 812 matches is the actual bottleneck (15.9ms of the 18.4ms total) — adding `CREATE INDEX idx_orders_status ON orders(status);` would very likely flip this to an Index Scan, cutting execution time dramatically, PROVIDED `status = \'pending\'` remains a genuinely selective (small-percentage) filter as the table grows.',
    productionExample:
      'An on-call engineer diagnosing a suddenly-slow production endpoint ran `EXPLAIN ANALYZE` on the underlying query and found `actual rows` was 50x higher than the planner\'s `rows` estimate at the join node — tracing this back revealed a large overnight batch INSERT had skewed the table\'s statistics without triggering autovacuum\'s ANALYZE yet; running `ANALYZE orders;` manually immediately fixed the plan choice and resolved the incident faster than any index change would have.',
    bestPractices: [
      'Always use `EXPLAIN ANALYZE` (or `EXPLAIN (ANALYZE, BUFFERS)` for I/O detail) over plain `EXPLAIN` when diagnosing a REAL slow query — estimates alone can mislead you into fixing the wrong thing.',
      'Look for large "estimated rows" vs "actual rows" mismatches first — this single signal points directly at stale statistics as the likely root cause, fixable with `ANALYZE`, before reaching for a schema/index change.',
      'Read cost/time from the BOTTOM of the plan tree upward (innermost scans first) — the actual bottleneck is usually a specific leaf-level scan node, not the top-level join.',
    ],
    tradeOffs:
      '`EXPLAIN ANALYZE` gives ground-truth timing but actually EXECUTES the query (including any side effects for a DML statement, and real load on the database) — for expensive or write queries in a sensitive production environment, `EXPLAIN (ANALYZE, BUFFERS)` wrapped in a transaction that gets rolled back, or testing on a representative staging replica, is the safer way to get real execution statistics without a production side effect or unnecessary load.',
    commonMistakes: [
      'Diagnosing a slow query purely from `EXPLAIN` (cost estimates only), missing that the ACTUAL row counts/timing diverge sharply from what the planner assumed.',
      'Running `EXPLAIN ANALYZE` directly on a write statement (UPDATE/DELETE/INSERT) in production without wrapping it in a transaction that gets rolled back, actually committing the side effect.',
      'Misreading `cost=X..Y` as milliseconds instead of the planner\'s arbitrary internal cost units, leading to a wrong intuition about where real time is spent.',
    ],
    followUpQuestions: [
      'Why would the planner choose a Nested Loop over a Hash Join for the exact same query at a different data size?',
      'What does `Rows Removed by Filter` specifically tell you, and how would you act on it?',
      'How does `work_mem` affect whether a Hash Join stays in memory or spills to disk, and what does that spill look like in an EXPLAIN ANALYZE plan?',
    ],
    relatedTopics: ['EXPLAIN ANALYZE', 'Query Planner', 'Nested Loop', 'Hash Join', 'Merge Join', 'Query Optimization'],
  },
  {
    id: 'python-m18-4',
    number: 'PY-M18-4',
    title: 'Table partitioning — range partitioning an orders table by month',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Partitioning',
    expectedAnswer:
      'Partitioning splits one large logical table into multiple smaller physical tables (partitions) transparently to queries — PostgreSQL supports RANGE (e.g. by date), LIST (e.g. by discrete region/tenant), and HASH (evenly distributed by hash of a key) partitioning. It helps most when queries and maintenance operations naturally scope to a SUBSET of partitions (e.g. "this month\'s orders", enabling "partition pruning" so the planner skips irrelevant partitions entirely) and when old partitions can be dropped/archived cheaply as a whole, rather than via a slow row-by-row DELETE.',
    deepExplanation:
      '```sql\nCREATE TABLE orders (\n    id BIGINT GENERATED ALWAYS AS IDENTITY,\n    customer_id BIGINT NOT NULL,\n    total NUMERIC(12,2) NOT NULL,\n    placed_at TIMESTAMPTZ NOT NULL,\n    PRIMARY KEY (id, placed_at)   -- the partition key MUST be part of any unique/primary key\n) PARTITION BY RANGE (placed_at);\n\nCREATE TABLE orders_2026_01 PARTITION OF orders\n    FOR VALUES FROM (\'2026-01-01\') TO (\'2026-02-01\');\nCREATE TABLE orders_2026_02 PARTITION OF orders\n    FOR VALUES FROM (\'2026-02-01\') TO (\'2026-03-01\');\nCREATE TABLE orders_2026_03 PARTITION OF orders\n    FOR VALUES FROM (\'2026-03-01\') TO (\'2026-04-01\');\n\n-- each partition gets its own indexes, sized only for that partition\'s data\nCREATE INDEX ON orders_2026_01 (customer_id);\nCREATE INDEX ON orders_2026_02 (customer_id);\n\n-- \"partition pruning\": the planner statically eliminates irrelevant partitions\nEXPLAIN SELECT * FROM orders WHERE placed_at >= \'2026-02-10\' AND placed_at < \'2026-02-15\';\n-- plan touches ONLY orders_2026_02 — orders_2026_01 and orders_2026_03 are never scanned\n\n-- dropping an old partition is near-instant (metadata-only operation), versus a slow\n-- row-by-row DELETE that would generate massive WAL traffic and require VACUUM afterward\nDROP TABLE orders_2026_01;   -- or ALTER TABLE orders DETACH PARTITION orders_2026_01; to archive it first\n```\n\nWhen partitioning genuinely helps: very large tables (typically 100M+ rows, though the exact threshold depends on workload) where (a) queries commonly filter by the partition key, letting the planner prune to a handful of partitions instead of scanning the whole table, (b) maintenance operations (VACUUM, index rebuilds, old-data deletion) can be scoped to individual partitions, dramatically reducing their duration and lock footprint, and (c) old data has a natural retention/archival boundary (drop or detach a whole month/year partition instead of an expensive bulk DELETE).\n\nWhen partitioning is UNNECESSARY complexity: smaller tables where a well-chosen index already serves query patterns efficiently, or tables where queries frequently need to scan ACROSS partition boundaries (defeating pruning and adding per-partition planning overhead for no benefit) — partitioning is an operational and schema-complexity cost (every partition needs index/constraint maintenance, foreign keys TO a partitioned table have restrictions) that should be adopted only once the specific pain it solves (huge table, unbounded growth, slow maintenance) is actually being felt, not preemptively.',
    productionExample:
      'A logging/events table growing by 50M rows a month was partitioned by month specifically so old partitions past a 90-day retention window could be DROPPED almost instantly (a metadata operation) instead of running a DELETE that would have taken hours, generated enormous WAL volume, and left substantial dead-tuple bloat requiring a subsequent VACUUM FULL to reclaim space.',
    bestPractices: [
      'Partition by the column your queries and retention policy most naturally filter/scope by (commonly a timestamp for time-series/log-style data).',
      'Include the partition key as part of any PRIMARY KEY/UNIQUE constraint on a partitioned table — PostgreSQL requires this since a unique constraint cannot be enforced globally across independently-indexed partitions otherwise.',
      'Prefer `DETACH PARTITION` (which can later be dropped or archived separately, near-instantly) over a bulk DELETE for retiring old data ranges.',
    ],
    tradeOffs:
      'Partitioning trades schema/operational complexity (more objects to manage, constraints on what unique/foreign keys can reference) for dramatically better performance on very large tables specifically for partition-key-scoped queries and lifecycle operations (archival, retention) — for tables that never grow large enough to strain a single-table index, or whose queries do not naturally align with a partition key, that complexity cost is not repaid.',
    commonMistakes: [
      'Partitioning a table prematurely, before it is actually large enough or before query patterns actually align with a natural partition key, adding complexity with no measurable benefit.',
      'Forgetting the partition key must be included in the primary/unique key, then being surprised `CREATE TABLE ... PARTITION BY RANGE` rejects an otherwise-normal-looking primary key definition.',
      'Running a bulk DELETE across old data instead of DROP/DETACH PARTITION on a partitioned table, missing the near-instant reclaim path partitioning specifically exists to provide.',
    ],
    followUpQuestions: [
      'How does partition pruning differ between queries with a STATIC date literal versus a bind parameter/function call for the boundary — does pruning still work at plan time in both cases?',
      'What are the restrictions on foreign keys referencing (or referenced by) a partitioned table?',
      'How would you migrate an existing large, unpartitioned table to a partitioned one with minimal downtime?',
    ],
    relatedTopics: ['Partitioning', 'Range Partitioning', 'Partition Pruning', 'Table Maintenance', 'Data Retention'],
  },
  {
    id: 'python-m18-5',
    number: 'PY-M18-5',
    title: 'Streaming replication, read replicas, and replication lag',
    difficulty: 'Medium',
    experienceLevel: '4+ Years',
    category: 'Replication',
    expectedAnswer:
      'PostgreSQL streaming replication continuously ships the WAL (Write-Ahead Log) from a PRIMARY server to one or more REPLICA servers, which replay it to stay near-real-time in sync — replicas can serve READ-ONLY queries, letting you scale read throughput horizontally by routing read traffic away from the primary. REPLICATION LAG is the delay between a write committing on the primary and that write becoming visible on a replica; because streaming replication is typically ASYNCHRONOUS by default, a read against a replica can return STALE data, which application code must be designed to tolerate or explicitly avoid for reads that require strict freshness.',
    deepExplanation:
      '```text\nPrimary (accepts ALL writes)\n  |  continuously streams WAL records\n  v\nReplica 1 (read-only, replays WAL, may lag by ms to seconds)\nReplica 2 (read-only, replays WAL, may lag independently)\n```\n\n```sql\n-- checking replication lag from the PRIMARY\'s perspective\nSELECT client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn,\n       write_lag, flush_lag, replay_lag\nFROM pg_stat_replication;\n\n-- checking lag from a REPLICA\'s own perspective (how far behind it currently is)\nSELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;\n```\n\nApplication routing pattern (typical): a connection-string-aware layer (or a proxy like PgBouncer/Pgpool, or explicit application logic) sends WRITE queries (INSERT/UPDATE/DELETE, and any read that must be perfectly fresh, like "read your own write" immediately after a write) to the PRIMARY, and sends read-heavy, latency-tolerant, eventually-consistent-acceptable queries (dashboards, search, most GET endpoints) to a REPLICA — this offloads read load from the primary, which is often the actual bottleneck in a read-heavy application.\n\nThe "read your own write" problem concretely: a user submits a form (write to primary), then the confirmation page immediately reads that same data — if that read is routed to a lagging replica, the user may see STALE data (their own change appears missing) for the duration of the lag. Common fixes: route the immediate post-write read back to the primary explicitly, or use `synchronous_commit` tuning / synchronous replicas for the specific critical path (at a latency cost, since the primary then waits for replica acknowledgment before committing), or have the application optimistically merge the known-good local write result rather than re-reading immediately.\n\nFailover: if the primary fails, a replica must be PROMOTED to become the new primary — this is not automatic in vanilla PostgreSQL streaming replication and requires either manual intervention or an orchestration tool (Patroni, repmgr, or a managed cloud provider\'s built-in failover) that handles leader election, promotion, and redirecting write traffic to the newly-promoted primary.',
    productionExample:
      'A reporting dashboard querying a read replica showed order counts that appeared to "lag behind" the live order-creation flow by a few seconds during traffic spikes — this was correctly diagnosed as normal, expected asynchronous replication lag (confirmed via `pg_last_xact_replay_timestamp()`) rather than a bug, and the team explicitly documented which endpoints were "eventually consistent by design" versus which needed to hit the primary directly.',
    bestPractices: [
      'Explicitly decide, per query/endpoint, whether eventual consistency (replica-safe) or strict freshness (must hit primary) is required — do not assume all reads are interchangeable between primary and replica.',
      'Monitor `pg_stat_replication` lag metrics continuously in production and alert on abnormal lag growth, which often signals a replica falling behind under write load or a network issue.',
      'Route "read immediately after write" flows back to the primary explicitly, rather than assuming a replica will already reflect the just-committed write.',
    ],
    tradeOffs:
      'Asynchronous replication (the common default) gives the primary low write latency (it does not wait for replica acknowledgment) at the cost of potential data loss on primary failure (any WAL not yet shipped/replayed is lost) and stale replica reads; synchronous replication eliminates that data-loss risk and staleness for the synchronous replica specifically, at the cost of every write on the primary now waiting for network round-trip acknowledgment from that replica, directly increasing write latency.',
    commonMistakes: [
      'Assuming a read replica is always perfectly up to date and routing a "read your own write" flow to it, producing confusing intermittent bugs that only appear under load (when lag is highest).',
      'Not monitoring replication lag at all, discovering a replica has fallen far behind (or stopped replicating entirely) only when a downstream consumer notices stale data.',
      'Treating replica promotion as automatic without any orchestration tooling in place, then discovering during an actual primary outage that failover requires manual, error-prone intervention.',
    ],
    followUpQuestions: [
      'What specifically causes replication lag to grow under heavy write load, mechanically (WAL generation rate vs replay rate)?',
      'How does synchronous replication change the primary\'s commit latency, and would you ever use it for only SOME transactions rather than the whole database?',
      'What does a tool like Patroni actually automate during failover that vanilla streaming replication does not provide out of the box?',
    ],
    relatedTopics: ['Replication', 'Read Replicas', 'Replication Lag', 'WAL', 'Failover', 'High Availability'],
  },
  {
    id: 'python-m18-6',
    number: 'PY-M18-6',
    title: 'High availability: point-in-time recovery, WAL archiving, backups, and monitoring',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'High Availability',
    expectedAnswer:
      'A production-grade backup strategy combines periodic BASE BACKUPS (a full physical snapshot of the data directory) with continuous WAL ARCHIVING (every WAL segment shipped to durable storage as it is generated) — together these enable Point-In-Time Recovery (PITR): restoring the base backup, then replaying archived WAL up to any specific target timestamp, letting you recover to "just before" an accidental bad deployment or data-corrupting bug rather than only to the last full backup.',
    deepExplanation:
      '```text\nBase backup (full snapshot, e.g. taken nightly)\n  + continuously archived WAL segments (every change since the base backup, shipped to S3/etc)\n  = ability to restore to ANY point in time between the base backup and now\n\nRestore process:\n1. Restore the most recent base backup taken BEFORE the desired recovery point\n2. Replay archived WAL segments forward, up to (but not past) the target timestamp\n3. PostgreSQL reaches a consistent state AS OF that exact moment\n```\n\n```sql\n-- recovery target configuration (conceptual, actual mechanism varies by PostgreSQL version/tooling)\nrestore_command = \'cp /wal_archive/%f %p\'\nrecovery_target_time = \'2026-03-14 09:15:00+00\'   -- restore to just before a bad 09:16 deploy\n```\n\nWhy PITR matters beyond a simple nightly backup: a nightly-only backup strategy means ANY incident (accidental mass DELETE, a buggy migration, ransomware/corruption) discovered after that night\'s backup loses up to 24 hours of legitimate data on restore — PITR with continuous WAL archiving narrows that recovery point objective (RPO) down to typically SECONDS, since you can restore to the exact moment right before the damaging event, not just the last nightly snapshot.\n\nBackup strategy layers in a real production setup: (1) automated base backups on a schedule (e.g. `pg_basebackup` nightly), (2) continuous WAL archiving to durable off-instance storage (never the same disk as the primary), (3) PERIODIC RESTORE TESTING — a backup that has never actually been restored and verified is not a trustworthy backup, a lesson many teams learn only after a real incident, (4) for HA specifically, streaming replicas provide near-instant FAILOVER (avoiding data loss and minimizing downtime for a hardware/AZ failure), while PITR/backups protect against LOGICAL corruption (a bad DELETE or migration) that replication would otherwise faithfully replicate to every replica too.\n\nMonitoring that should back all of this: replication lag (per the previous question), disk space growth (WAL archive and data directory), backup job success/failure alerting, and periodic automated restore-and-verify jobs against a scratch environment.',
    productionExample:
      'A team accidentally ran an unscoped `UPDATE` in production that corrupted a pricing column across an entire table at 14:32 — because continuous WAL archiving was in place, they restored a base backup plus replayed WAL up to 14:31:59 (one second before the bad statement) into a scratch instance, verified the data was correct, and used it to repair the production table — a nightly-only backup strategy would have lost the entire day\'s legitimate transactions instead.',
    bestPractices: [
      'Combine periodic base backups with continuous WAL archiving to enable PITR, rather than relying on nightly full backups alone.',
      'Regularly test RESTORING from backups into a scratch environment — an untested backup strategy is not a verified one.',
      'Understand that replication (for fast failover on hardware failure) and PITR/backups (for recovery from logical corruption/bad writes) protect against DIFFERENT failure modes and are both needed — replicas faithfully replicate a bad DELETE too.',
    ],
    tradeOffs:
      'Continuous WAL archiving and frequent base backups reduce your Recovery Point Objective (how much data you could lose) dramatically, at the cost of storage and the operational complexity of managing/monitoring the archiving pipeline itself — a smaller startup with looser data-loss tolerance might reasonably accept nightly-only backups, while any system handling financial or otherwise irreplaceable data should treat continuous WAL archiving as close to mandatory.',
    commonMistakes: [
      'Relying on nightly-only backups with no continuous WAL archiving, discovering only after an incident that up to 24 hours of legitimate data is unrecoverable.',
      'Never actually testing a restore, only discovering the backup process was silently broken (e.g. WAL archiving quietly failing for weeks) during a real emergency.',
      'Confusing replication with backup — assuming replicas protect against a bad DELETE, when replication faithfully applies that same bad DELETE to every replica.',
    ],
    followUpQuestions: [
      'What is the difference between Recovery Point Objective (RPO) and Recovery Time Objective (RTO), and how does each part of this backup/replication strategy affect them differently?',
      'Why must WAL archive storage be off-instance/durable, separate from the primary\'s own disk?',
      'How would you design an automated, regularly-scheduled "restore and verify" job to build genuine confidence in a backup strategy?',
    ],
    relatedTopics: ['Point-In-Time Recovery', 'WAL Archiving', 'Backups', 'High Availability', 'Disaster Recovery', 'RPO/RTO'],
  },
  {
    id: 'python-m18-7',
    number: 'PY-M18-7',
    title: 'Database security: least-privilege roles, row-level security, and encryption in transit/at rest',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Security',
    expectedAnswer:
      'Beyond role-based `GRANT`/`REVOKE` (which controls access at the table/column level), PostgreSQL\'s Row-Level Security (RLS) lets you restrict WHICH ROWS a given role can see or modify within a shared table — essential for multi-tenant systems sharing one physical table across tenants, where RLS enforces "tenant A can never see tenant B\'s rows" AT THE DATABASE LEVEL, independent of (and as a defense-in-depth backstop against bugs in) application-layer filtering.',
    deepExplanation:
      '```sql\n-- multi-tenant table, one physical table shared across all tenants\nCREATE TABLE documents (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    tenant_id BIGINT NOT NULL,\n    title TEXT NOT NULL,\n    content TEXT\n);\n\nALTER TABLE documents ENABLE ROW LEVEL SECURITY;\n\n-- a policy: a role can only see/modify rows where tenant_id matches a session-level setting\nCREATE POLICY tenant_isolation ON documents\n    USING (tenant_id = current_setting(\'app.current_tenant_id\')::bigint)\n    WITH CHECK (tenant_id = current_setting(\'app.current_tenant_id\')::bigint);\n\n-- application sets this once per connection/request (e.g. in a SQLAlchemy session event)\nSET app.current_tenant_id = \'42\';\n\nSELECT * FROM documents;   -- ONLY returns rows where tenant_id = 42, even with no WHERE clause written\nINSERT INTO documents (tenant_id, title) VALUES (99, \'sneaky\');   -- REJECTED by WITH CHECK — tenant_id must match\n```\n\nWhy RLS is genuine defense-in-depth, not redundant with application filtering: if a developer forgets a `WHERE tenant_id = ?` clause somewhere in application code (a very common, very dangerous class of multi-tenant bug), RLS still enforces the boundary AT THE DATABASE — the query simply cannot see or write cross-tenant rows, regardless of what the application code did or did not filter. This converts a potentially catastrophic data-leak bug (tenant A sees tenant B\'s private documents) into, at worst, an empty result set.\n\nEncryption layers, each protecting a different threat: **encryption in transit** (`sslmode=require`/`verify-full` on every connection) protects data from network eavesdropping between the application and the database; **encryption at rest** (disk-level encryption, e.g. via the cloud provider\'s managed encrypted volumes, or PostgreSQL\'s `pgcrypto` extension for column-level encryption of specific highly sensitive fields) protects data if the physical storage/backup media is stolen or improperly accessed; neither substitutes for the other — a system needs both to have a coherent security posture, plus least-privilege roles (see Module 15) as a third, independent layer limiting what a compromised credential can even reach.\n\n`GRANT`/`REVOKE` and RLS compose: a role still needs `SELECT`/`INSERT` privilege on the table via GRANT to attempt a query at all — RLS then further restricts WHICH ROWS that already-permitted query can actually see/affect. RLS policies do NOT apply to the table owner or a role with the `BYPASSRLS` attribute (typically only migration/admin roles), so the multi-tenant `app_user` role specifically must NOT have `BYPASSRLS`.',
    productionExample:
      'A SaaS platform storing all tenants\' data in shared tables (rather than one database per tenant, for operational simplicity) uses RLS as a mandatory backstop specifically because their engineering org grew fast enough that not every engineer could be trusted to remember a tenant filter on every single new query — a real incident where a new analytics feature\'s query omitted a tenant filter was contained to "zero rows returned" instead of "cross-tenant data leak" purely because RLS was already enforced at the schema level.',
    bestPractices: [
      'Enable RLS as a mandatory, database-enforced backstop for any shared-table multi-tenant design, never relying solely on application code remembering to filter by tenant.',
      'Ensure the application\'s connecting role does NOT have `BYPASSRLS` or table ownership, both of which silently bypass RLS policies entirely.',
      'Layer security: least-privilege GRANTs (what a role can touch at all) + RLS (which specific rows) + encryption in transit and at rest (protecting the data itself) — no single layer is a substitute for the others.',
    ],
    tradeOffs:
      'RLS adds a small per-query evaluation cost (the policy\'s USING/WITH CHECK expression is effectively folded into every query against that table) and some design complexity (session-level tenant context must be reliably set on every connection/request) in exchange for a database-enforced security boundary that survives even a serious application-layer bug — for genuinely single-tenant systems, or multi-tenant systems using separate databases/schemas per tenant instead of shared tables, RLS is unnecessary complexity.',
    commonMistakes: [
      'Enabling RLS but connecting as a role with `BYPASSRLS` or as the table owner, silently defeating the policy with no error or warning.',
      'Forgetting `WITH CHECK` (only specifying `USING`), which restricts what rows are VISIBLE but not what tenant_id a new INSERT/UPDATE is allowed to write, permitting a role to silently write into another tenant\'s rows.',
      'Treating encryption in transit as sufficient on its own, without also addressing encryption at rest for backup media/disk-level exposure.',
    ],
    followUpQuestions: [
      'Why does the table OWNER bypass RLS by default, and what does that imply about which role your application should connect as?',
      'How would you test that an RLS policy actually enforces the intended isolation, as part of a CI suite?',
      'What is the performance cost of RLS on a hot-path query, and how would you measure it?',
    ],
    relatedTopics: ['Row-Level Security', 'Multi-Tenancy', 'GRANT/REVOKE', 'Encryption', 'Least Privilege', 'Defense in Depth'],
  },
  {
    id: 'python-m18-8',
    number: 'PY-M18-8',
    title: 'SQL injection — the vulnerable f-string pattern, a real payload, and the parameterized fix',
    difficulty: 'Hard',
    experienceLevel: '2–4 Years',
    category: 'SQL Injection',
    expectedAnswer:
      'SQL injection happens when untrusted input is concatenated directly into a SQL string instead of passed as a bound PARAMETER — the database cannot distinguish "data" from "code" once they are merged into one string, so a crafted input can inject arbitrary additional SQL. The fix is universal and simple: NEVER build SQL via string formatting/concatenation with variable data; always use parameterized queries (`%s`/`:name` placeholders with bound values) or an ORM\'s query builder, both of which keep the query STRUCTURE and the DATA strictly separate at the protocol level.',
    deepExplanation:
      '```python\n# VULNERABLE — string-formats untrusted input directly into the SQL text\ndef get_user_by_email_UNSAFE(conn, email: str):\n    query = f"SELECT * FROM users WHERE email = \'{email}\'"\n    return conn.execute(query)\n\n# attacker-controlled `email` input:\n#   \' OR \'1\'=\'1\n# produces the executed query:\n#   SELECT * FROM users WHERE email = \'\' OR \'1\'=\'1\'\n# -> returns EVERY row in the table, bypassing the intended single-user filter\n\n# a more damaging payload using statement stacking:\n#   x\'; DROP TABLE users; --\n# produces:\n#   SELECT * FROM users WHERE email = \'x\'; DROP TABLE users; --\'\n# -> depending on the driver/execution mode, this can execute a SECOND, entirely\n#    different, destructive statement appended by the attacker\n\n# SAFE — raw SQL with a bound parameter (psycopg-style %s placeholder)\ndef get_user_by_email_safe(conn, email: str):\n    query = "SELECT * FROM users WHERE email = %s"\n    return conn.execute(query, (email,))   # the driver sends `email` as DATA, never merged into the SQL text\n\n# SAFE — SQLAlchemy Core, bound parameter via text() with a named placeholder\nfrom sqlalchemy import text\nresult = session.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email})\n\n# SAFE — SQLAlchemy ORM query builder, parameters are handled automatically, never string-built at all\nfrom sqlalchemy import select\nstmt = select(User).where(User.email == email)\nresult = session.execute(stmt)\n```\n\nWhy parameterization actually fixes this at a MECHANICAL level (not just "escaping special characters", which is a much weaker, error-prone mitigation): with a bound parameter, the SQL query TEXT (with a `%s`/`:name` placeholder) is sent to the database and PARSED/PLANNED first, entirely separate from the parameter VALUES, which are sent afterward and substituted at the protocol/execution level — the database never re-parses the parameter value as SQL syntax at all, so no amount of quote characters or SQL keywords inside the parameter value can change the query\'s structure.\n\nThe f-string/`.format()`/`%`-string-formatting pattern is dangerous specifically because it produces the FINAL query text (with attacker data already merged in) BEFORE the database ever sees it — at that point, the database has no way to know which part of the string was "supposed to be" just data.',
    productionExample:
      'A search endpoint built with `f"SELECT * FROM products WHERE name ILIKE \'%{search_term}%\'"` was flagged in a security review — a penetration tester supplied `search_term = "%\' UNION SELECT email, password_hash, NULL FROM users --"` and successfully exfiltrated user password hashes through a product search box, illustrating that injection vulnerabilities are exploitable well beyond the classic "login bypass" example whenever ANY endpoint string-builds SQL from user input.',
    bestPractices: [
      'Never use f-strings, `.format()`, or `%` string interpolation to build SQL containing variable/user-controlled data — always use bound parameters or an ORM query builder.',
      'Prefer an ORM\'s query builder (SQLAlchemy `select(...).where(...)`) over raw SQL with manually-managed placeholders wherever practical — it makes accidental string concatenation structurally harder to reach for.',
      'Run static analysis/linting (e.g. `bandit` for Python) in CI specifically configured to flag string-formatted SQL construction as a hard failure, catching the mistake before code review.',
    ],
    tradeOffs:
      'Parameterized queries and ORM query builders have essentially zero downside versus string-built SQL — there is no meaningful performance or expressiveness cost to bound parameters (PostgreSQL can even cache the parsed/planned query across executions with different parameter values, a genuine PERFORMANCE benefit, not just a security one) — the only real "cost" is occasionally needing to reach for `text()`/raw SQL with parameters for a complex query the ORM builder cannot express cleanly, which is still fully safe as long as parameters remain bound, never concatenated.',
    commonMistakes: [
      'Believing "escaping quotes manually" (e.g. replacing `\'` with `\'\'`) is an adequate defense — it is fragile, encoding/driver-dependent, and a well-known source of bypasses; use real parameterization instead.',
      'Assuming an ORM makes injection impossible by construction, then still writing a raw `text()` query with f-string-interpolated user input inside it "just this once".',
      'Trusting that input validation alone (e.g. "the email field looks like an email") is sufficient protection against injection, when parameterization is the actual structural fix regardless of input shape.',
    ],
    followUpQuestions: [
      'Why is escaping quote characters manually a weaker defense than true parameterized queries, even if implemented carefully?',
      'How does a bound parameter also improve performance via prepared-statement plan caching, independent of the security benefit?',
      'Where else besides WHERE clauses can SQL injection occur (hint: dynamically-built column/table names, ORDER BY clauses) and how would you safely allow a client to choose a sort column?',
    ],
    relatedTopics: ['SQL Injection', 'Parameterized Queries', 'SQLAlchemy', 'Input Validation', 'Prepared Statements'],
  },
  {
    id: 'python-m18-9',
    number: 'PY-M18-9',
    title: 'Optimistic vs pessimistic locking for a concurrent inventory-decrement race condition',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Optimistic vs Pessimistic Locking',
    expectedAnswer:
      'Pessimistic locking (`SELECT ... FOR UPDATE`) acquires a row lock BEFORE reading, blocking any other transaction from reading-for-update (or writing) that same row until the current transaction commits/rolls back — correct and simple for high-contention scenarios where conflicts are frequent. Optimistic locking uses a VERSION column: read the row (no lock), do work, then on write, check `WHERE version = <version you originally read>`; if zero rows were affected, someone else changed it first, so you retry — better for low-contention scenarios where blocking would waste time waiting on locks that rarely actually conflict.',
    deepExplanation:
      '```sql\n-- PESSIMISTIC: lock the row for the whole duration of the check-then-update\nBEGIN;\nSELECT quantity FROM inventory WHERE product_id = 42 FOR UPDATE;   -- blocks other FOR UPDATE/writes on this row\n-- application checks: is quantity >= requested_amount?\nUPDATE inventory SET quantity = quantity - 3 WHERE product_id = 42;\nCOMMIT;   -- lock released here; any transaction that was blocked on the SELECT FOR UPDATE proceeds next\n```\n```python\n# SQLAlchemy pessimistic locking\nfrom sqlalchemy import select\nstmt = select(Inventory).where(Inventory.product_id == 42).with_for_update()\nrow = session.execute(stmt).scalar_one()\nif row.quantity < requested_amount:\n    raise InsufficientStock()\nrow.quantity -= requested_amount\nsession.commit()\n```\n\n```sql\n-- OPTIMISTIC: no lock held during the \"think time\" between read and write\nCREATE TABLE inventory (\n    product_id BIGINT PRIMARY KEY,\n    quantity INTEGER NOT NULL,\n    version INTEGER NOT NULL DEFAULT 0\n);\n\n-- read (no lock)\nSELECT quantity, version FROM inventory WHERE product_id = 42;   -- e.g. quantity=10, version=5\n\n-- write, conditioned on the version being UNCHANGED since the read\nUPDATE inventory\nSET quantity = quantity - 3, version = version + 1\nWHERE product_id = 42 AND version = 5;\n-- if this affects 0 rows, someone else updated the row (and bumped its version) in between —\n-- the application must detect the 0-row result and RETRY the whole read-modify-write cycle\n```\n```python\n# SQLAlchemy optimistic locking — built-in support via version_id_col\nclass Inventory(Base):\n    __tablename__ = \"inventory\"\n    product_id: Mapped[int] = mapped_column(primary_key=True)\n    quantity: Mapped[int]\n    version: Mapped[int] = mapped_column(default=0)\n    __mapper_args__ = {\"version_id_col\": version}\n\n# SQLAlchemy automatically adds \"WHERE version = <loaded version>\" to the UPDATE and raises\n# StaleDataError if zero rows were affected — the application catches this and retries\n```\n\nThe decision framework: pessimistic locking is correct when conflicts are FREQUENT (many concurrent requests genuinely competing for the SAME row, e.g. a flash-sale\'s last few units) — retrying under optimistic locking there would thrash constantly. Optimistic locking is correct when conflicts are RARE (most rows are touched by at most one concurrent request at a time) — paying the lock-acquisition/blocking cost pessimistically would be pure waste for the vast majority of requests that never actually conflict. Pessimistic locking also risks longer-held locks (and potential deadlocks if lock ORDER across multiple rows is inconsistent — see the deadlock debugging question) if the transaction does slow work while holding the lock; optimistic locking never blocks other readers/writers but pushes RETRY logic into the application.',
    productionExample:
      'A flash-sale checkout flow for a limited-quantity item switched FROM optimistic locking TO pessimistic (`SELECT ... FOR UPDATE`) specifically because, under the extreme contention of thousands of concurrent buyers competing for the last few units, optimistic locking\'s constant retry-on-conflict pattern caused a thundering herd of wasted read-modify-write cycles — pessimistic locking\'s natural queueing behavior (each request waits its turn for the lock) produced dramatically more predictable, fair behavior under that specific high-contention shape.',
    bestPractices: [
      'Default to optimistic locking for typical CRUD resources where conflicts are rare — it avoids blocking and scales better under normal, low-contention load.',
      'Switch to pessimistic locking specifically for known HIGH-CONTENTION hot rows (limited inventory, account balance updates) where optimistic retries would thrash.',
      'Always implement and test the RETRY path for optimistic locking failures — a `StaleDataError`/zero-row-affected result must be caught and handled, not left to bubble up as an unhandled exception.',
    ],
    tradeOffs:
      'Pessimistic locking guarantees no wasted retry work but can create a queue of blocked transactions (and risks deadlock if multiple rows are locked in inconsistent order across transactions) under high contention; optimistic locking never blocks other transactions but wastes read-modify-write work on every conflict and pushes retry-loop complexity into application code — the right choice is workload-shape-dependent, not universal.',
    commonMistakes: [
      'Using `SELECT ... FOR UPDATE` broadly "just to be safe" on low-contention resources, needlessly serializing requests that would rarely have actually conflicted.',
      'Implementing optimistic locking\'s version check but forgetting to actually RETRY on a zero-row-affected result, silently dropping the user\'s update instead of applying it.',
      'Holding a pessimistic lock across slow, unrelated work (e.g. an external API call) inside the same transaction, needlessly extending how long other transactions are blocked.',
    ],
    followUpQuestions: [
      'How would you decide, for a NEW feature with unknown contention characteristics, whether to start with optimistic or pessimistic locking?',
      'What specifically can go wrong if you hold a `SELECT ... FOR UPDATE` lock across a slow external network call inside the same transaction?',
      'How does `SELECT ... FOR UPDATE SKIP LOCKED` change the behavior versus plain `FOR UPDATE`, and when is that useful (hint: work-queue/job-claiming patterns)?',
    ],
    relatedTopics: ['Optimistic Locking', 'Pessimistic Locking', 'SELECT FOR UPDATE', 'Race Conditions', 'Concurrency', 'SQLAlchemy'],
  },
  {
    id: 'python-m18-10',
    number: 'PY-M18-10',
    title: 'Soft delete design: deleted_at, partial indexes, restoration, and its real downsides',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Soft Delete & Auditing',
    expectedAnswer:
      'Soft delete marks a row as logically removed (typically a nullable `deleted_at TIMESTAMPTZ` column, non-NULL meaning "deleted") instead of physically removing it via `DELETE`, preserving the data for audit/recovery/referential-integrity purposes — but it requires EVERY normal query to remember to filter `WHERE deleted_at IS NULL`, complicates unique constraints (a "deleted" row\'s unique value, e.g. email, would otherwise block a new row from reusing it), and grows the table unboundedly unless paired with an explicit archival/purge policy.',
    deepExplanation:
      '```sql\nALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ;\n\n-- soft delete\nUPDATE users SET deleted_at = NOW() WHERE id = 42;\n\n-- EVERY normal query must remember this filter — easy to forget in a large codebase\nSELECT * FROM users WHERE deleted_at IS NULL AND email = \'ada@example.com\';\n\n-- restoration is simply clearing the column\nUPDATE users SET deleted_at = NULL WHERE id = 42;\n\n-- a PARTIAL index on the common \"active rows only\" filter keeps the index small and fast,\n-- since most queries only ever care about non-deleted rows\nCREATE INDEX idx_users_active_email ON users (email) WHERE deleted_at IS NULL;\n\n-- the classic soft-delete UNIQUE CONSTRAINT problem: a plain UNIQUE(email) constraint still\n-- blocks a NEW user from registering with an email that belongs to a SOFT-DELETED old account\n-- ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);   -- WRONG for soft delete\n\n-- fix: a PARTIAL unique index that only enforces uniqueness among ACTIVE (non-deleted) rows\nCREATE UNIQUE INDEX idx_users_email_unique_active ON users (email) WHERE deleted_at IS NULL;\n-- now a deleted user\'s email can be legitimately reused by a new registration\n```\n\nA disciplined way to avoid every query needing to remember the filter: create a VIEW (`CREATE VIEW active_users AS SELECT * FROM users WHERE deleted_at IS NULL;`) that application code queries by default, reserving direct access to the base `users` table for the specific, deliberate cases that need to see deleted rows (admin recovery tools, audit reports) — or, in an ORM like SQLAlchemy, a global query filter/mixin applied consistently across all repository methods.\n\nReal downsides worth being explicit about in a senior discussion, not just the upsides: (1) the table grows UNBOUNDED unless paired with an explicit periodic archival/purge job that moves genuinely old soft-deleted rows to cold storage or truly deletes them after a retention window; (2) foreign keys referencing a soft-deleted row still "work" at the database level (the row still physically exists) but now require every JOIN to also decide whether to include or exclude soft-deleted parents/children, adding query complexity throughout the schema, not just at the table itself; (3) indexes on the table include dead rows unless specifically built as partial indexes, wasting space and slowing writes; (4) GDPR/right-to-be-forgotten requirements often require an ACTUAL hard delete eventually, meaning soft delete alone is not a complete data-lifecycle answer for personally identifiable information.',
    productionExample:
      'An e-commerce platform soft-deletes user accounts (preserving order history integrity — an order must still reference SOME user row) but runs a scheduled job that, 90 days after a soft-delete, hard-deletes or anonymizes personally identifiable fields on that row (satisfying GDPR erasure requirements) while leaving a minimal anonymized stub row so historical `orders.user_id` foreign keys remain valid — illustrating that soft delete is usually one stage in a longer data-lifecycle policy, not a permanent end state.',
    bestPractices: [
      'Use a partial UNIQUE index (`WHERE deleted_at IS NULL`) for any column that must be unique among ACTIVE rows only, rather than a plain table-wide UNIQUE constraint that would incorrectly block reuse of a soft-deleted row\'s value.',
      'Centralize the `deleted_at IS NULL` filter in a view, ORM base-query mixin, or repository layer rather than trusting every ad hoc query across the codebase to remember it.',
      'Pair soft delete with an explicit retention/archival policy (and, for PII, an eventual hard-delete/anonymization step) — soft delete alone is not a complete data-lifecycle strategy.',
    ],
    tradeOffs:
      'Soft delete preserves auditability, supports easy restoration, and avoids cascading hard-deletes across dependent tables, at the cost of every query needing awareness of the filter, more complex unique-constraint design, unbounded table growth without an archival policy, and (for regulated PII) not actually satisfying legal erasure requirements on its own — hard delete remains simpler and is the right choice for data with no audit/recovery value.',
    commonMistakes: [
      'Adding a plain `UNIQUE(email)` constraint on a soft-deletable table, then being confused when a legitimate new signup with a previously-deleted-account\'s email fails.',
      'Forgetting `WHERE deleted_at IS NULL` in some query paths across a large codebase, causing "deleted" records to reappear inconsistently in some views/reports but not others.',
      'Treating soft delete as a complete answer for GDPR/privacy erasure requirements, when the underlying PII data still physically exists in the table.',
    ],
    followUpQuestions: [
      'How would you enforce, at the SCHEMA level (not just code convention), that every query against a soft-deletable table respects the deleted_at filter?',
      'How would you design the archival/purge job that eventually removes old soft-deleted rows without breaking foreign key references from other tables?',
      'What changes about cascading behavior — does a soft delete on a parent row need to also "soft cascade" to children, and how would you implement that consistently?',
    ],
    relatedTopics: ['Soft Delete', 'Partial Unique Index', 'Auditing', 'Data Retention', 'GDPR', 'Views'],
  },
  {
    id: 'python-m18-11',
    number: 'PY-M18-11',
    title: 'MVCC, dead tuples, VACUUM/AUTOVACUUM, and diagnosing table/index bloat',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'MVCC & VACUUM',
    expectedAnswer:
      'PostgreSQL\'s MVCC (Multi-Version Concurrency Control) lets readers and writers proceed concurrently without blocking each other by never overwriting a row in place: an `UPDATE` creates a NEW row version and marks the old one as expired (but does not immediately physically remove it), and a `DELETE` marks a row as expired without immediately reclaiming its space — these expired rows are called DEAD TUPLES. VACUUM (run automatically by AUTOVACUUM in the background) reclaims dead tuple space for reuse and updates planner statistics; when VACUUM falls behind actual write volume, dead tuples accumulate faster than they are reclaimed, causing table and index BLOAT — larger-than-necessary physical storage that slows down scans and wastes disk space.',
    deepExplanation:
      '```text\nMVCC in action:\nRow (id=1, balance=100) — version A, visible to transactions started before the UPDATE\nUPDATE sets balance=90 -> creates version B (new physical tuple), marks version A as \"dead\"\n  (but NOT immediately removed — any transaction that started before this UPDATE and is still\n   running can still legitimately see version A, per its own consistent snapshot)\nOnce NO active transaction could possibly still need version A, it becomes eligible for VACUUM\n```\n\nDiagnosing bloat:\n\n```sql\n-- how many dead tuples does this table currently have, and how recently was it vacuumed?\nSELECT relname, n_live_tup, n_dead_tup, last_autovacuum, last_autoanalyze\nFROM pg_stat_user_tables\nWHERE relname = \'orders\';\n--  relname | n_live_tup | n_dead_tup | last_autovacuum        | last_autoanalyze\n--  orders  |    500000  |    380000  | 2026-01-02 03:00:00+00 | 2026-01-02 03:00:00+00\n-- n_dead_tup close to n_live_tup is a strong bloat signal — autovacuum is falling behind\n```\n\nWhat causes AUTOVACUUM to fall behind, in practice: a very high UPDATE/DELETE churn rate on a table, a long-running transaction holding an old snapshot open (preventing dead tuples from becoming eligible for reclaim even if AUTOVACUUM runs — the classic "idle in transaction" problem), or `autovacuum` settings (`autovacuum_vacuum_scale_factor`/`autovacuum_vacuum_cost_delay`) tuned too conservatively for the table\'s actual write volume.\n\nFixing bloat:\n\n```sql\nVACUUM (VERBOSE, ANALYZE) orders;        -- manual vacuum: reclaims dead tuple space for REUSE, updates statistics\n                                            -- (does NOT shrink the file on disk — space is reused internally)\nVACUUM FULL orders;                       -- reclaims space AND physically shrinks the table file —\n                                            -- but takes an EXCLUSIVE lock for the duration, blocking all\n                                            -- reads/writes; use only during a maintenance window on a\n                                            -- severely bloated table, never routinely\n\n-- for a table with a specific known high-churn hot path, tune autovacuum MORE aggressively per-table:\nALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.01);   -- vacuum after only 1% dead tuples, not the 20% default\n```\n\nWhy MVCC is the right tradeoff despite this maintenance cost: it means a long-running analytical SELECT never blocks (or is blocked by) concurrent writers — readers see a consistent SNAPSHOT of the data as of their transaction\'s start, without needing to acquire locks that would serialize against writers, which is a huge concurrency win versus a locking-based (non-MVCC) concurrency model. The "cost" of that benefit is exactly the ongoing VACUUM housekeeping this question covers — dead tuples are the visible byproduct of never blocking readers against writers.',
    productionExample:
      'A high-churn `sessions` table (rows updated on every request, never truly deleted until a nightly cleanup job) developed severe bloat after a batch job accidentally left several transactions "idle in transaction" for hours, preventing AUTOVACUUM from reclaiming ANY dead tuples during that window — `pg_stat_user_tables` showed `n_dead_tup` nearly equal to `n_live_tup`, and query latency on that table had crept up 5x; killing the stuck idle transactions and running a manual `VACUUM (VERBOSE, ANALYZE)` immediately restored normal performance.',
    bestPractices: [
      'Monitor `n_dead_tup` relative to `n_live_tup` via `pg_stat_user_tables` for high-churn tables, and alert when the ratio grows abnormally, rather than discovering bloat only via a general performance complaint.',
      'Watch for and eliminate long-running "idle in transaction" sessions (via `pg_stat_activity` and a `idle_in_transaction_session_timeout` setting) — they are one of the most common real causes of AUTOVACUUM falling behind.',
      'Tune `autovacuum_vacuum_scale_factor` more aggressively on specific known high-churn tables rather than relying on the one-size-fits-all default across the whole database.',
    ],
    tradeOffs:
      '`VACUUM FULL` fully reclaims bloat and shrinks the table on disk, but requires an exclusive table lock for its entire duration (blocking all reads and writes) — appropriate only for a planned maintenance window on a severely bloated table; routine `VACUUM` (as run automatically by AUTOVACUUM) reclaims space for internal reuse without blocking concurrent access, at the cost of not physically shrinking the file, which is the correct ongoing/default behavior for ordinary bloat management.',
    commonMistakes: [
      'Leaving a transaction "idle in transaction" (e.g. a forgotten open transaction in a debugging session, or a bug holding a connection open mid-transaction) for a long time, silently preventing AUTOVACUUM from reclaiming any dead tuples on ANY table for that entire duration.',
      'Reaching for `VACUUM FULL` routinely instead of understanding it takes an exclusive lock, causing unexpected production downtime when run at the wrong time.',
      'Never monitoring `pg_stat_user_tables`, discovering severe bloat only after query latency has already degraded significantly.',
    ],
    followUpQuestions: [
      'Why can a long-running "idle in transaction" session block VACUUM from reclaiming dead tuples across the ENTIRE database, not just the table that session is touching?',
      'What is the difference in effect between `VACUUM`, `VACUUM FULL`, and `REINDEX` for addressing bloat?',
      'How would you safely run `VACUUM FULL` on a large production table with minimal downtime impact (hint: `pg_repack` extension as an alternative)?',
    ],
    relatedTopics: ['MVCC', 'VACUUM', 'AUTOVACUUM', 'Dead Tuples', 'Table Bloat', 'Idle In Transaction'],
  },
  {
    id: 'python-m18-12',
    number: 'PY-M18-12',
    title: 'Database design: a production e-commerce schema (users, products, inventory, carts, orders, payments)',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Design',
    expectedAnswer:
      'A production e-commerce schema separates CATALOG data (products, categories — read-heavy, changes rarely) from TRANSACTIONAL data (carts, orders, payments — write-heavy, must be strictly consistent), uses explicit junction tables for many-to-many relationships (cart_items, order_items), and captures a PRICE SNAPSHOT on order_items (not a live foreign-key-only reference to the current product price) so historical orders remain accurate even after the product\'s price later changes.',
    deepExplanation:
      '```sql\nCREATE TABLE users (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE,\n    hashed_password TEXT NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE categories (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name TEXT NOT NULL,\n    parent_id BIGINT REFERENCES categories(id)   -- self-referencing, supports category hierarchies\n);\n\nCREATE TABLE products (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,\n    name TEXT NOT NULL,\n    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),\n    is_active BOOLEAN NOT NULL DEFAULT TRUE          -- \"discontinued\" flag, never hard-delete a sold product\n);\n\nCREATE TABLE inventory (\n    product_id BIGINT PRIMARY KEY REFERENCES products(id),\n    quantity INTEGER NOT NULL CHECK (quantity >= 0),\n    version INTEGER NOT NULL DEFAULT 0                 -- optimistic locking for concurrent decrements\n);\n\nCREATE TABLE carts (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE cart_items (          -- many-to-many junction: carts <-> products\n    cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,\n    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,\n    quantity INTEGER NOT NULL CHECK (quantity > 0),\n    PRIMARY KEY (cart_id, product_id)\n);\n\nCREATE TABLE orders (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,   -- NEVER cascade-delete order history\n    status TEXT NOT NULL DEFAULT \'pending\',\n    total NUMERIC(12,2) NOT NULL CHECK (total >= 0),\n    placed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE order_items (\n    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,\n    quantity INTEGER NOT NULL CHECK (quantity > 0),\n    unit_price_at_purchase NUMERIC(12,2) NOT NULL,   -- SNAPSHOT, not a live join to products.price\n    PRIMARY KEY (order_id, product_id)\n);\n\nCREATE TABLE payments (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,\n    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),\n    status TEXT NOT NULL DEFAULT \'pending\',\n    idempotency_key TEXT NOT NULL UNIQUE,             -- prevents duplicate-charge on client retry\n    processed_at TIMESTAMPTZ\n);\n```\n\nKey design decisions worth defending in an interview: `order_items.unit_price_at_purchase` is a deliberate DENORMALIZATION (a snapshot copy of the price, not a live reference) — without it, a later product price change would silently rewrite the apparent historical total of every past order that referenced it, which is factually wrong; `products.is_active` (soft "discontinued" flag) plus `ON DELETE RESTRICT` from `order_items` to `products` together make it structurally impossible to ever lose historical order integrity by deleting a product that has been ordered; `payments.idempotency_key` with a UNIQUE constraint gives the database itself (not just application logic) a hard guarantee against double-charging on a client retry.\n\nScaling considerations: `products`/`categories` (read-heavy, changes rarely) are natural candidates for aggressive caching and read-replica routing; `orders`/`payments` (write-heavy, must be strictly consistent) stay on the primary and benefit most from the indexing/pagination/locking techniques covered elsewhere in this module; `inventory.quantity` decrements are the system\'s highest-contention hot path and are the concrete motivating example for the optimistic-vs-pessimistic locking question above.',
    productionExample:
      'A real incident where a product\'s price was corrected after a pricing error, and a NAIVE schema (order_items only storing a `product_id` foreign key, no price snapshot) caused every historical order\'s displayed total to silently change to reflect the corrected price — retroactively and incorrectly altering financial history — is exactly the failure mode `unit_price_at_purchase` as a deliberate snapshot column is designed to prevent.',
    bestPractices: [
      'Snapshot any value at the moment of a transaction (price, tax rate, discount) that must remain historically accurate even if the "live" source value changes later.',
      'Use `ON DELETE RESTRICT` (not CASCADE) from order-related tables back to products/users, forcing an explicit soft-delete/deactivation flow instead of ever risking historical data loss via cascade.',
      'Separate read-heavy catalog data from write-heavy transactional data in your mental model (and eventually your scaling strategy — caching/replicas for one, careful locking/indexing for the other), even within a single physical database.',
    ],
    tradeOffs:
      'Snapshotting values like `unit_price_at_purchase` introduces intentional denormalization (the same logical "price" now exists in two places, `products.price` and `order_items.unit_price_at_purchase`, which can legitimately diverge) — this is the correct tradeoff here because the two values represent genuinely different facts (current catalog price vs. historical transaction price), not accidental duplication of the same fact.',
    commonMistakes: [
      'Storing only a foreign key to `products` on `order_items` with no price snapshot, causing historical order totals to silently change whenever the product\'s current price changes.',
      'Using `ON DELETE CASCADE` from `orders` back to `users`, meaning deleting a user account destroys their entire order/financial history — usually the wrong choice for auditable transactional data.',
      'Omitting an idempotency key on the payments table, leaving the system vulnerable to duplicate charges from client-side retries on network timeouts.',
    ],
    followUpQuestions: [
      'How would you extend this schema to support multiple shipping addresses per order, or partial shipments/multiple shipments per order?',
      'How would you handle a product price change that should apply going forward but must never retroactively affect past orders — walk through the schema and query implications?',
      'How would you evolve this schema to support multi-currency orders?',
    ],
    relatedTopics: ['Database Design', 'E-Commerce Schema', 'Denormalization', 'Idempotency', 'Foreign Key Actions', 'Junction Tables'],
  },
  {
    id: 'python-m18-13',
    number: 'PY-M18-13',
    title: 'Database design: a banking schema with SELECT FOR UPDATE demonstrating ACID end to end',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Design',
    expectedAnswer:
      'A banking transfer schema centers on `accounts` (with a `balance`) and `transactions`/`transfers` as an immutable AUDIT LOG of every balance-affecting event — the transfer operation itself must run inside a single database transaction that locks BOTH the source and destination account rows (in a CONSISTENT order, to avoid deadlock — see the deadlock debugging question), debits one, credits the other, and inserts audit records, all committing atomically or none of it applying at all.',
    deepExplanation:
      '```sql\nCREATE TABLE customers (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name TEXT NOT NULL\n);\n\nCREATE TABLE accounts (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,\n    balance NUMERIC(14,2) NOT NULL CHECK (balance >= 0),   -- CHECK prevents an overdraft at the DB level\n    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE transfers (          -- immutable audit log — NEVER updated or deleted after insert\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    from_account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,\n    to_account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,\n    amount NUMERIC(14,2) NOT NULL CHECK (amount > 0),\n    status TEXT NOT NULL DEFAULT \'completed\',\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n```\n\nThe transfer, demonstrating all four ACID properties concretely:\n\n```sql\nBEGIN;   -- ATOMICITY starts here: everything until COMMIT is all-or-nothing\n\n-- lock BOTH rows involved, in a CONSISTENT order (e.g. always lock the lower id first)\n-- to prevent a deadlock against a concurrent transfer running in the opposite direction\nSELECT balance FROM accounts WHERE id = LEAST(1, 2) FOR UPDATE;\nSELECT balance FROM accounts WHERE id = GREATEST(1, 2) FOR UPDATE;\n\n-- application checks the source account has sufficient balance (or rely on the CHECK constraint\n-- to reject the debit outright if it would go negative)\nUPDATE accounts SET balance = balance - 100.00, updated_at = NOW() WHERE id = 1;   -- debit\nUPDATE accounts SET balance = balance + 100.00, updated_at = NOW() WHERE id = 2;   -- credit\n\nINSERT INTO transfers (from_account_id, to_account_id, amount) VALUES (1, 2, 100.00);\n\nCOMMIT;   -- DURABILITY: once this returns, the change survives a crash (guaranteed via WAL fsync)\n          -- CONSISTENCY: the CHECK(balance >= 0) constraint was enforced throughout\n          -- ISOLATION: FOR UPDATE locks meant no concurrent transaction could observe or act on\n          --            a half-completed state of these two account rows\n```\n\nWhat happens if the credit step fails partway (e.g. a constraint violation, a connection drop, an application crash between the debit and credit): because both statements are inside the SAME transaction, PostgreSQL automatically ROLLS BACK the entire transaction on any error or on explicit `ROLLBACK` — the debit is UNDONE along with everything else, so money is never "lost" mid-transfer (deducted from account 1 but never credited to account 2). This is precisely what Atomicity guarantees, and is the core reason multi-step financial operations MUST be wrapped in an explicit transaction rather than executed as separate auto-committed statements.\n\nWhy `FOR UPDATE` on BOTH rows (not just the debited one) matters: without locking the CREDITED account too, a concurrent transaction reading that account\'s balance mid-transfer could observe a stale value and make a decision based on it (a classic isolation violation) — locking both rows for the duration of the transfer guarantees no other transaction can read or write either account until this transfer fully commits.',
    productionExample:
      'A banking system\'s transfer endpoint wraps the debit + credit + audit-insert sequence in one transaction with `SELECT ... FOR UPDATE` on both accounts in a consistent id-ascending lock order specifically because an earlier version (locking accounts in whatever order the request happened to name them) caused occasional production deadlocks under concurrent A→B and B→A transfers — reordering the lock acquisition consistently by account id eliminated the deadlocks entirely without changing the transfer\'s logical behavior.',
    bestPractices: [
      'Wrap every multi-step financial mutation in an explicit transaction (BEGIN/COMMIT), never as separate auto-committed statements, so a partial failure cannot leave money "in limbo".',
      'Lock rows involved in a transfer in a CONSISTENT, deterministic order (e.g. always by ascending account id) across the whole codebase, specifically to prevent deadlocks between transactions moving money in opposite directions.',
      'Use a `CHECK (balance >= 0)` constraint as a database-level backstop against overdraft, in addition to application-level balance checks — this protects even against a future bug that forgets the application-level check.',
    ],
    tradeOffs:
      'Locking both accounts for the duration of the transfer transaction guarantees correctness under concurrency but serializes concurrent transfers touching the SAME account pair — for a system with extremely high transfer volume between a small set of hot accounts, this could become a throughput bottleneck, at which point more sophisticated techniques (e.g. a ledger/event-sourcing model that avoids in-place balance mutation entirely) become worth considering, at real added complexity.',
    commonMistakes: [
      'Locking only the debited account, not the credited one, allowing a concurrent transaction to observe or act on a stale value for the credited account mid-transfer.',
      'Locking the two accounts in an order that depends on which account happens to be "from" vs "to" for THIS particular transfer, rather than a consistent global order — this is precisely what causes deadlocks between opposite-direction concurrent transfers.',
      'Executing the debit and credit as two separate auto-committed statements instead of one transaction, risking money being deducted but never credited if a failure occurs in between.',
    ],
    followUpQuestions: [
      'Why does locking accounts in a consistent order (e.g. always ascending id) prevent deadlocks between opposite-direction concurrent transfers?',
      'How would you redesign this to an append-only ledger/event-sourcing model where balance is a DERIVED value (sum of ledger entries) rather than a mutable column, and what would that trade off?',
      'What ISOLATION LEVEL would you choose for this transaction, and would SERIALIZABLE change anything meaningfully over the FOR UPDATE approach shown here?',
    ],
    relatedTopics: ['Database Design', 'ACID', 'SELECT FOR UPDATE', 'Deadlocks', 'Banking Schema', 'Transactions'],
  },
  {
    id: 'python-m18-14',
    number: 'PY-M18-14',
    title: 'Debugging: a production deadlock between two transactions locking rows in opposite order',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Debugging',
    expectedAnswer:
      'Symptoms: application logs show intermittent `deadlock detected` errors (PostgreSQL error code 40P01) under concurrent load, always involving the same pair of tables/rows, with one of the two competing transactions automatically aborted by PostgreSQL\'s deadlock detector. Root cause: two transactions each hold a lock the OTHER one needs, acquired in OPPOSITE order (transaction A locks row 1 then waits for row 2; transaction B locks row 2 then waits for row 1) — a circular wait with no possible resolution except aborting one of them. Fix: acquire locks in a single, CONSISTENT order across every code path that could lock more than one row from the same table(s).',
    deepExplanation:
      '```text\nSymptom in application logs:\n  sqlalchemy.exc.OperationalError: (psycopg2.errors.DeadlockDetected)\n  deadlock detected\n  DETAIL: Process 4021 waits for ShareLock on transaction 88342; blocked by process 4033.\n           Process 4033 waits for ShareLock on transaction 88341; blocked by process 4021.\n```\n\nDiagnosis: identify the two conflicting code paths from the deadlock detail (which shows the two blocked processes and what they were each waiting on), then look at what each transaction was doing at the moment of conflict:\n\n```sql\n-- Transaction A (processing transfer: account 5 -> account 12)\nBEGIN;\nSELECT * FROM accounts WHERE id = 5 FOR UPDATE;    -- locks account 5 first\n-- ... meanwhile Transaction B starts ...\nSELECT * FROM accounts WHERE id = 12 FOR UPDATE;   -- now WAITS: B already holds a lock on 12\n\n-- Transaction B (processing transfer: account 12 -> account 5), running CONCURRENTLY\nBEGIN;\nSELECT * FROM accounts WHERE id = 12 FOR UPDATE;   -- locks account 12 first\n-- ... meanwhile Transaction A has already locked account 5 ...\nSELECT * FROM accounts WHERE id = 5 FOR UPDATE;    -- now WAITS: A already holds a lock on 5\n\n-- CIRCULAR WAIT: A holds 5, wants 12. B holds 12, wants 5. Neither can ever proceed.\n-- PostgreSQL\'s deadlock detector identifies this cycle (after deadlock_timeout, default 1s)\n-- and aborts ONE of the two transactions automatically, raising 40P01 in that connection.\n```\n\nLive diagnosis via `pg_locks` while the deadlock is actively forming (useful for a first-time investigation, though the deadlock DETAIL message above is usually sufficient after the fact):\n\n```sql\nSELECT blocked_locks.pid AS blocked_pid,\n       blocking_locks.pid AS blocking_pid,\n       blocked_activity.query AS blocked_query,\n       blocking_activity.query AS blocking_query\nFROM pg_catalog.pg_locks blocked_locks\nJOIN pg_catalog.pg_locks blocking_locks\n    ON blocking_locks.locktype = blocked_locks.locktype\n    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database\n    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation\n    AND blocking_locks.pid != blocked_locks.pid\nJOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid\nJOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid\nWHERE NOT blocked_locks.granted;\n```\n\nThe fix — acquire locks in a single, deterministic order everywhere, regardless of the transfer\'s logical "from"/"to" direction:\n\n```python\ndef transfer(session, from_id: int, to_id: int, amount: Decimal):\n    first_id, second_id = sorted((from_id, to_id))   # ALWAYS lock the lower id first, both directions\n    first = session.execute(\n        select(Account).where(Account.id == first_id).with_for_update()\n    ).scalar_one()\n    second = session.execute(\n        select(Account).where(Account.id == second_id).with_for_update()\n    ).scalar_one()\n    from_account = first if first.id == from_id else second\n    to_account = second if first.id == from_id else first\n    from_account.balance -= amount\n    to_account.balance += amount\n    session.commit()\n```\n\nPrevention: code review checklist item for any code path acquiring `FOR UPDATE` locks on more than one row from the same table — verify a consistent lock order is used; consider a linter/convention (always sort ids before locking) enforced across the codebase, not just in one hand-written function; application-level retry logic on `40P01`/`OperationalError` (deadlocks are, by design, always resolved by aborting one participant — the correct response is to retry that aborted transaction, not treat it as a fatal error).',
    productionExample:
      'A payments team traced a recurring but infrequent `deadlock detected` error to exactly this A→B / B→A concurrent-transfer pattern using `pg_locks` and the deadlock DETAIL log line to identify the two competing queries — the fix (sorting account ids before acquiring locks, shown above) eliminated the deadlocks entirely in the following weeks of production traffic, with zero deadlocks recorded afterward.',
    bestPractices: [
      'Establish and enforce a single, consistent lock-acquisition order (e.g. always sort ids ascending) for ANY code path that locks more than one row from the same table, across the entire codebase, not just the one function you happen to be fixing.',
      'Implement automatic retry-on-deadlock at the application/transaction-boundary layer, since PostgreSQL deadlocks are an EXPECTED, designed-for outcome under certain concurrency patterns, not a data-corruption event — retrying the aborted transaction is the correct, safe response.',
      'Use `pg_locks` joined against `pg_stat_activity` to diagnose lock contention/deadlocks live in a running system, and read the deadlock DETAIL log line carefully — it names the exact two queries/processes involved.',
    ],
    tradeOffs:
      'Enforcing a consistent lock order eliminates deadlocks between symmetric operations (like bidirectional transfers) at essentially zero performance cost — it is a pure correctness fix with no meaningful downside, which is why it should be treated as a mandatory code-review checklist item for any multi-row locking code, not an optional optimization.',
    commonMistakes: [
      'Locking rows in whatever order the request happens to name them (e.g. always "from" then "to") instead of a request-independent, consistent order (e.g. sorted by id), which is precisely what makes opposite-direction operations deadlock-prone.',
      'Treating a `deadlock detected` error as a fatal, unretryable failure rather than implementing automatic retry logic, since PostgreSQL explicitly designs deadlock resolution around aborting-and-retrying one participant.',
      'Only fixing the ONE function that showed up in the deadlock log, without auditing other code paths in the codebase that lock the same tables in a similarly inconsistent order.',
    ],
    followUpQuestions: [
      'Why is a deadlock fundamentally different from ordinary lock contention/blocking, and why can it only be resolved by aborting one participant rather than simply waiting longer?',
      'How would you build automatic retry-on-deadlock into a SQLAlchemy-based service layer generically, rather than one-off per endpoint?',
      'Besides consistent lock ordering, what other technique (hint: `SELECT ... FOR UPDATE SKIP LOCKED`, or reducing transaction/lock duration) could reduce deadlock likelihood for a different access pattern that cannot easily be given a consistent order?',
    ],
    relatedTopics: ['Deadlocks', 'pg_locks', 'SELECT FOR UPDATE', 'Lock Ordering', 'Database Debugging', 'Retry Logic'],
  },
  {
    id: 'python-m18-15',
    number: 'PY-M18-15',
    title: 'Debugging: diagnosing and fixing a connection-pool-exhaustion incident',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Debugging',
    expectedAnswer:
      'Symptoms: application requests start timing out or raising `TimeoutError: QueuePool limit ... reached` (SQLAlchemy) or the database itself rejects new connections once `max_connections` is hit, typically appearing suddenly under load or after a deploy. Root cause is almost always LEAKED connections/sessions — code paths that open a session/transaction but never reliably close it (missing `finally`/context-manager usage, an exception skipping cleanup, or a long-held session across an unrelated slow operation) — combined with a pool sized too small (or too large in aggregate across many instances) relative to actual concurrent demand.',
    deepExplanation:
      '```python\n# LEAKING pattern — if get_data() raises, the session is NEVER closed, silently holding\n# a pooled connection forever (until the process restarts)\ndef get_user_UNSAFE(user_id: int):\n    session = SessionLocal()\n    user = session.query(User).get(user_id)   # if this raises, session.close() below never runs\n    session.close()\n    return user\n\n# FIXED — context manager guarantees cleanup even on exception\ndef get_user_safe(user_id: int):\n    with SessionLocal() as session:\n        return session.get(User, user_id)\n\n# FastAPI dependency pattern — yield + try/finally guarantees cleanup even if the\n# endpoint raises partway through handling the request\nasync def get_db():\n    async with AsyncSessionLocal() as session:\n        try:\n            yield session\n        finally:\n            await session.close()   # ALWAYS runs, even on an unhandled exception in the endpoint\n```\n\nDiagnosis via PostgreSQL\'s own view of current connections (run this DURING the incident):\n\n```sql\nSELECT pid, state, state_change, query, now() - query_start AS query_duration\nFROM pg_stat_activity\nWHERE datname = \'orders_production\'\nORDER BY query_duration DESC;\n-- look specifically for many rows with state = \'idle in transaction\' and a LARGE query_duration —\n-- this is the fingerprint of a leaked/never-committed session holding a connection indefinitely\n\nSELECT count(*), state FROM pg_stat_activity WHERE datname = \'orders_production\' GROUP BY state;\n--  count | state\n--  ------+--------------------\n--     87 | idle in transaction    <- the smoking gun: 87 leaked sessions, not real active work\n--      3 | active\n```\n\nThe fix has two parts: (1) find and eliminate the actual LEAK — audit every place a session/connection is manually opened without a context manager or a guaranteed `finally`, and specifically look for any code that does slow, unrelated work (an external API call, a long computation) WHILE still holding an open session/transaction, and (2) configure the pool defensively even with a correct application: `pool_pre_ping=True` (validates a connection is still alive before handing it out, since a connection can silently die server-side, e.g. from a network blip or the database restarting), a sane `pool_size`/`max_overflow` matched to real concurrency needs, and `pool_timeout` set to fail FAST with a clear error rather than hanging indefinitely when the pool genuinely is exhausted:\n\n```python\nengine = create_async_engine(\n    DATABASE_URL,\n    pool_size=20,\n    max_overflow=10,\n    pool_timeout=5,        # fail fast with a clear TimeoutError instead of hanging\n    pool_recycle=1800,     # recycle connections periodically, avoiding stale/firewall-dropped connections\n    pool_pre_ping=True,\n)\n```\n\nPrevention going forward: set `idle_in_transaction_session_timeout` at the DATABASE level as a hard backstop (PostgreSQL will forcibly terminate any session idle-in-transaction beyond the configured duration, regardless of what application code does) — this converts a silent, slow-building leak into a fast, visible error much closer to its actual source.',
    productionExample:
      'An API endpoint that opened a database session, then made a slow (multi-second) call to a third-party payment gateway WHILE still holding that open, uncommitted session, was fine at low traffic but under a traffic spike accumulated enough concurrently-open sessions to exhaust the connection pool entirely — every OTHER endpoint sharing that pool began timing out, not just the slow one; the fix restructured the code to close the database session BEFORE making the external call, only reopening a new one afterward to persist the result.',
    bestPractices: [
      'Always acquire database sessions/connections via a context manager or a guaranteed try/finally (or a framework\'s dependency-injection yield pattern), never a manual open/close pair that skips cleanup on an exception path.',
      'Never hold an open database session/transaction across a slow, unrelated operation (external API calls, heavy computation, waiting on a queue) — close it first, reopen a new one only when you actually need to persist a result.',
      'Set `pool_pre_ping=True` and a reasonably short `pool_timeout` so pool exhaustion fails fast and visibly, rather than manifesting as vague, hard-to-trace request hangs.',
    ],
    tradeOffs:
      'A larger connection pool tolerates more concurrent leaked/long-held sessions before exhausting, masking the underlying leak for longer at the cost of consuming more of the database\'s shared, hard-limited `max_connections` budget across your whole fleet — the correct fix is always eliminating the actual leak, not just growing the pool size, which only delays the same failure at higher traffic.',
    commonMistakes: [
      'Increasing `pool_size` as the first response to a pool-exhaustion incident without first diagnosing whether a genuine leak exists — this masks the root cause and often just delays a worse incident at higher traffic.',
      'Holding a database session open across a slow external network call, letting unrelated I/O latency directly translate into connection-pool pressure.',
      'Not setting `pool_pre_ping`, causing intermittent, confusing errors when a pooled connection has silently died server-side (e.g. after a database restart or firewall idle timeout) but the pool still believes it is healthy.',
    ],
    followUpQuestions: [
      'Why does `idle_in_transaction_session_timeout` at the database level provide a safety net that application-level fixes alone do not fully guarantee?',
      'How would you distinguish, from `pg_stat_activity` alone, between a genuine leak versus simply high legitimate concurrent load needing a larger pool?',
      'How should `pool_size` be coordinated across MULTIPLE application instances against the database\'s single shared `max_connections` limit?',
    ],
    relatedTopics: ['Connection Pooling', 'pg_stat_activity', 'Session Leaks', 'SQLAlchemy', 'idle_in_transaction', 'Database Debugging'],
  },
  {
    id: 'python-m18-16',
    number: 'PY-M18-16',
    title: 'Debugging: optimizing a slow query on a 100-million-row table via EXPLAIN ANALYZE and indexing',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Database Debugging',
    expectedAnswer:
      'Symptoms: a specific endpoint\'s p99 latency has degraded sharply as a table grew past tens of millions of rows, while smaller/staging environments show no issue (the classic "works fine until real production scale" bug). Root cause, confirmed via `EXPLAIN ANALYZE`, is almost always a missing or wrong index forcing a sequential scan (or a bitmap scan reading far more rows than necessary) over a now-huge table for a query pattern that used to be fast purely because the table was small enough that even a full scan was cheap.',
    deepExplanation:
      '```sql\n-- the slow production query\nEXPLAIN ANALYZE\nSELECT id, total, status\nFROM orders\nWHERE customer_id = 48213\n  AND status = \'completed\'\nORDER BY placed_at DESC\nLIMIT 20;\n```\n```text\n-- BEFORE: no useful index — full sequential scan over 100M rows to find ~40 matches\nLimit  (cost=1850000.00..1850000.05 rows=20 width=48) (actual time=4210.334..4210.340 rows=20 loops=1)\n  ->  Sort  (cost=1850000.00..1850100.00 rows=40000 width=48) (actual time=4210.332..4210.335 rows=20 loops=1)\n        Sort Key: placed_at DESC\n        ->  Seq Scan on orders  (cost=0.00..1840000.00 rows=40000 width=48) (actual time=12.100..4180.221 rows=41 loops=1)\n              Filter: ((customer_id = 48213) AND (status = \'completed\'\'))\n              Rows Removed by Filter: 99999959\nPlanning Time: 0.412 ms\nExecution Time: 4210.501 ms   -- 4.2 SECONDS\n```\n\nDiagnosis: `Rows Removed by Filter: 99999959` is the smoking gun — nearly the ENTIRE 100M-row table was read and discarded just to find 41 matching rows, and a full in-memory `Sort` was then needed on top because nothing was pre-ordered. This is a textbook case for a composite index matching the exact filter + sort pattern:\n\n```sql\nCREATE INDEX CONCURRENTLY idx_orders_customer_status_placed\nON orders (customer_id, status, placed_at DESC);\n-- CONCURRENTLY avoids taking a blocking lock on this 100M-row table while building the index —\n-- essential for building an index on a live production table without an outage window\n```\n```text\n-- AFTER: index scan finds the 41 matching rows directly, already pre-sorted by placed_at DESC\nLimit  (cost=0.56..8.90 rows=20 width=48) (actual time=0.031..0.089 rows=20 loops=1)\n  ->  Index Scan using idx_orders_customer_status_placed on orders\n        (cost=0.56..17.10 rows=41 width=48) (actual time=0.029..0.084 rows=20 loops=1)\n        Index Cond: ((customer_id = 48213) AND (status = \'completed\'))\nPlanning Time: 0.298 ms\nExecution Time: 0.121 ms   -- 0.121 MILLISECONDS — roughly 35,000x faster\n```\n\nWhy the column order `(customer_id, status, placed_at DESC)` specifically: `customer_id` and `status` are both EQUALITY filters (narrow first, in either order relative to each other, though the more selective one first is marginally better), and `placed_at DESC` last lets the index\'s own pre-sorted order directly satisfy `ORDER BY placed_at DESC` with ZERO extra sort step — this is what eliminated both the sequential scan AND the separate Sort node from the plan simultaneously.\n\nWhy this bug was invisible in staging/small environments: with only a few thousand rows, even a full sequential scan completes in a few milliseconds — the query was NEVER actually fast because of good design, it was fast because the table was too small for the missing index to matter yet; this is exactly why load-testing against realistic (or production-scale-sampled) data volumes, not just correctness testing against tiny fixtures, is essential before shipping a new query pattern.',
    productionExample:
      'An order-history endpoint that was fast in every pre-production environment began timing out for high-volume customers within weeks of a marketing campaign that grew the orders table past 80 million rows — `EXPLAIN ANALYZE` immediately revealed the missing composite index shown above; the fix was deployed as a `CREATE INDEX CONCURRENTLY` (avoiding any production lock/outage) and resolved the incident within the hour once the index finished building.',
    bestPractices: [
      'Always run `EXPLAIN ANALYZE` on a genuinely slow query before guessing at a fix — `Rows Removed by Filter` and Seq Scan nodes on a large table are the most common, most decisive diagnostic signals.',
      'Build a composite index whose column order matches the query\'s equality filters first, then its ORDER BY column, to eliminate both a slow scan AND a separate sort step in one index.',
      'Use `CREATE INDEX CONCURRENTLY` (not a plain `CREATE INDEX`) when adding an index to a large, live production table, to avoid taking a blocking lock for the build\'s duration.',
    ],
    tradeOffs:
      '`CREATE INDEX CONCURRENTLY` avoids the blocking lock of a normal `CREATE INDEX` but takes noticeably LONGER to build (it must scan the table twice to handle concurrent writes safely) and, if interrupted, can leave behind an invalid index that must be manually dropped and retried — the tradeoff (slower, non-blocking build vs faster, blocking build) is essentially always worth it for any table receiving live production traffic.',
    commonMistakes: [
      'Only testing new query patterns against small staging/development datasets, never catching a missing-index problem that only manifests once a table reaches real production scale.',
      'Adding a new index with a plain `CREATE INDEX` on a large, actively-used production table, causing an unexpected write-blocking outage for the duration of the (potentially long) index build.',
      'Building the composite index in a column order that does not match the query\'s actual equality-filter-then-sort pattern, leaving either a residual filter or a separate sort step in the plan even after adding the index.',
    ],
    followUpQuestions: [
      'Why does `CREATE INDEX CONCURRENTLY` need to scan the table twice, and what could go wrong if it is interrupted partway through?',
      'How would you proactively catch this class of "works fine until scale" bug BEFORE it reaches production (hint: load testing against production-scale/sampled data, or query-plan regression checks in CI)?',
      'If this table were expected to keep growing indefinitely, would you reach for partitioning in addition to this index, and what would decide that?',
    ],
    relatedTopics: ['EXPLAIN ANALYZE', 'Composite Indexes', 'CREATE INDEX CONCURRENTLY', 'Query Optimization', 'Database Debugging', 'Production Incidents'],
  },
];

export const MOCK_PYTHON_MODULE18_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
