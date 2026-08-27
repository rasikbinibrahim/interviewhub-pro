// Python + DSA Interview Handbook — Module 16: Advanced PostgreSQL + SQL.
// Hand-authored technical questions covering joins, GROUP BY/HAVING,
// subqueries, CTEs (including recursive), window functions, set operations,
// views vs materialized views, transactions/ACID/isolation levels, locking
// and deadlocks, PL/pgSQL functions and triggers, and JSONB — with genuine,
// runnable PostgreSQL SQL, sample data, and production reasoning. Mirrors
// the MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m16-1',
    number: 'PY-M16-1',
    title: 'JOIN types deep dive — INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Joins',
    expectedAnswer:
      'INNER JOIN keeps only rows with a match on BOTH sides; LEFT JOIN keeps every row from the left table, filling unmatched right-side columns with NULL; RIGHT JOIN is the mirror of LEFT; FULL OUTER JOIN keeps every row from both sides, NULL-filling whichever side has no match; CROSS JOIN produces the full Cartesian product (every left row paired with every right row, no join condition); SELF JOIN is just any of the above where a table is joined to itself, typically to compare rows within the same table (e.g. an employee to their manager, both stored in the same `employees` table).',
    deepExplanation:
      "Sample data:\n\n```text\ncustomers            orders\nid  name             id  customer_id  total\n1   Ada              101  1            250.00\n2   Grace            102  1            80.00\n3   Alan             103  2            500.00\n                     104  99           30.00   -- orphaned: customer_id 99 does not exist\n```\n\n```sql\n-- INNER JOIN: only customers WITH at least one order, only orders with a valid customer\nSELECT c.name, o.id AS order_id, o.total\nFROM customers c\nINNER JOIN orders o ON o.customer_id = c.id;\n-- result: Ada/101/250.00, Ada/102/80.00, Alan/103/500.00   (Grace excluded — no orders; orphan order 104 excluded)\n\n-- LEFT JOIN: every customer, even those with zero orders (NULL-filled order columns)\nSELECT c.name, o.id AS order_id, o.total\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;\n-- result: Ada/101/250.00, Ada/102/80.00, Alan/103/500.00, Grace/NULL/NULL\n\n-- classic pattern: \"customers with NO orders\" — LEFT JOIN + filter for the NULL\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;\n-- result: Grace\n\n-- FULL OUTER JOIN: every customer AND every order, matched where possible, NULL-filled otherwise\nSELECT c.name, o.id AS order_id\nFROM customers c\nFULL OUTER JOIN orders o ON o.customer_id = c.id;\n-- result: Ada/101, Ada/102, Alan/103, Grace/NULL, NULL/104   (includes the orphaned order 104)\n\n-- CROSS JOIN: Cartesian product — 3 customers x 2 sizes = 6 rows, no join condition at all\nSELECT c.name, s.size FROM customers c CROSS JOIN (VALUES (\\\n\nStep 1 — Understand the topic.\nTopic: JOIN types deep dive — INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT c.name, o.id\nFROM customers c\nLEFT JOIN orders o\n  ON o.customer_id = c.id\nWHERE o.id IS NULL;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT c.name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM orders o\n    WHERE o.customer_id = c.id\n);\n```\n\nStep 5 — Example result:\n```text\ncustomers with no orders\n```\n\nStep 6 — Complexity / trade-off:\nKeep right-side match predicates in ON when you need to preserve unmatched left rows.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A \"customers who have never placed an order\" retention-campaign query is a canonical LEFT JOIN + `WHERE right_side.id IS NULL` pattern — it directly identifies rows that exist on the left with NO corresponding match on the right, which is otherwise awkward to express without this idiom (the equivalent `NOT IN`/`NOT EXISTS` subquery forms are functionally similar but often less efficient or riskier with NULLs, as covered in the subqueries question).\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **JOIN types deep dive — INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF**.",
    bestPractices: [
      'Put a condition that should FILTER WHICH RIGHT-SIDE ROWS MATCH inside the `ON` clause; put a condition that should filter the FINAL RESULT SET (after the NULL-fill) inside `WHERE` — conflating these is the single most common LEFT JOIN bug.',
      'Use the `LEFT JOIN ... WHERE right.id IS NULL` idiom specifically to find "rows on the left with no match on the right" (customers with no orders, products never ordered, etc).',
      'Avoid CROSS JOIN unless you genuinely intend a full Cartesian product (e.g. generating all size/color combinations) — an accidental CROSS JOIN from a missing/forgotten join condition silently multiplies row counts and is a common source of duplicate-row bugs.',
    ],
    tradeOffs:
      'INNER JOIN is typically the most efficient join type (the planner can often eliminate non-matching rows earliest), while FULL OUTER JOIN is generally the most expensive (must track unmatched rows from BOTH sides) — choosing the narrowest join type that still expresses your actual requirement (do you truly need unmatched rows from one or both sides, or only matched pairs?) is both a correctness and a performance decision, not just a stylistic one.',
    commonMistakes: [
      'Putting a right-side filter condition in `WHERE` instead of `ON` for a LEFT JOIN, silently degrading it into an INNER JOIN.',
      'Forgetting that a LEFT JOIN can produce duplicate LEFT-side rows when the right side matches multiple rows (e.g. a customer with 3 orders appears 3 times) — needing an aggregate/GROUP BY afterward if a one-row-per-customer result is actually wanted.',
      'Writing an accidental CROSS JOIN by forgetting the join condition entirely (e.g. `FROM customers, orders` with no WHERE linking them), producing a combinatorial explosion of incorrect rows.',
    ],
    followUpQuestions: [
      'Why does moving a right-table condition from ON to WHERE change a LEFT JOIN\'s results, but not an INNER JOIN\'s?',
      'How would you find products that have NEVER appeared in any order, using a LEFT JOIN?',
      'What happens to row count/duplication when a LEFT JOIN\'s right side matches multiple rows per left row, and how would you get back to one row per left-side entity?',
    ],
    relatedTopics: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'SELF JOIN', 'NULL Handling'],
  },
  {
    id: 'python-m16-2',
    number: 'PY-M16-2',
    title: 'GROUP BY, HAVING, and conditional aggregation with FILTER',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Aggregation & GROUP BY',
    expectedAnswer:
      '`GROUP BY` collapses rows sharing the same value(s) in the grouped column(s) into one row per group, letting aggregate functions (`COUNT`, `SUM`, `AVG`) compute per-group results; `HAVING` filters those GROUPS (evaluated after aggregation, unlike `WHERE` which filters individual rows before it); the `FILTER (WHERE ...)` clause lets a single query compute MULTIPLE differently-conditioned aggregates in one pass, avoiding the classic `CASE WHEN ... THEN x END` trick or multiple separate queries.',
    deepExplanation:
      "Sample data (orders):\n\n```text\nid   customer_id  status      total\n1    1            paid        250.00\n2    1            paid        80.00\n3    1            cancelled   40.00\n4    2            paid        500.00\n5    3            pending     30.00\n```\n\n```sql\n-- revenue by customer (only counting PAID orders in the revenue, but counting ALL orders separately)\nSELECT\n    customer_id,\n    COUNT(*) AS total_orders,\n    COUNT(*) FILTER (WHERE status = \\\n\nStep 1 — Understand the topic.\nTopic: GROUP BY, HAVING, and conditional aggregation with FILTER\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT customer_id,\n       COUNT(*) AS order_count,\n       SUM(total) AS revenue\nFROM orders\nGROUP BY customer_id\nHAVING SUM(total) > 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT customer_id, SUM(total)\nFROM orders\nGROUP BY customer_id;\n```\n\nStep 5 — Example result:\n```text\ncustomers whose grouped revenue exceeds 1000\n```\n\nStep 6 — Complexity / trade-off:\nGROUP BY forms groups; HAVING filters groups after aggregation.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A single-query revenue dashboard computing \"total revenue, paid revenue, refunded revenue, and pending revenue, all broken down by month\" in ONE query using four different `FILTER (WHERE status = ...)` clauses avoids running four separate full-table-scanning queries (or four passes over the same GROUP BY), a meaningful efficiency win on a large orders table.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **GROUP BY, HAVING, and conditional aggregation with FILTER**.",
    bestPractices: [
      'Use `FILTER (WHERE ...)` for conditional aggregation in modern PostgreSQL — it is clearer and less error-prone than the `CASE WHEN` trick.',
      'Remember every non-aggregated SELECT column must appear in GROUP BY — PostgreSQL will raise an error rather than silently picking an arbitrary row, which is a genuine safety feature worth understanding rather than fighting.',
      'Filter individual rows with `WHERE` BEFORE aggregation whenever the condition does not depend on the aggregate result itself — only use `HAVING` for conditions that genuinely need the aggregated value (like `HAVING COUNT(*) > 5`).',
    ],
    tradeOffs:
      'Computing multiple conditional aggregates in one GROUP BY pass (via FILTER or CASE) is more efficient than running separate queries per condition (one table scan instead of several), at the cost of a somewhat busier single query — for a small number of conditions this is a clear win; for a very large number of differently-filtered metrics, a pivoted reporting table or materialized view may become more maintainable than one enormous multi-FILTER query.',
    commonMistakes: [
      'Selecting a non-aggregated, non-grouped column and being surprised PostgreSQL rejects the query (correctly) instead of silently picking an arbitrary value the way some other databases do.',
      'Using `HAVING` for a condition that does not actually depend on an aggregate (e.g. `HAVING customer_id = 5`), needlessly deferring a cheap per-row filter to after the expensive GROUP BY step instead of using `WHERE`.',
      'Using `SUM(CASE WHEN cond THEN 1 ELSE 0 END)` where `COUNT(*) FILTER (WHERE cond)` (or `COUNT(CASE WHEN cond THEN 1 END)`, relying on COUNT ignoring NULLs) would be clearer and less bug-prone.',
    ],
    followUpQuestions: [
      'Why does PostgreSQL require every non-aggregated SELECT column to appear in GROUP BY, while some other databases allow it without an error?',
      'How would you compute "percentage of orders that were paid, per customer" in a single query using FILTER and regular aggregates together?',
      'How would you extend the revenue-by-customer-and-month query to also show a running total across months, and what SQL feature would you reach for (hint: window functions, covered next)?',
    ],
    relatedTopics: ['GROUP BY', 'HAVING', 'FILTER Clause', 'Conditional Aggregation', 'Aggregate Functions'],
  },
  {
    id: 'python-m16-3',
    number: 'PY-M16-3',
    title: 'Subqueries — scalar, correlated, IN vs EXISTS vs NOT EXISTS, and the NOT IN + NULL trap',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Subqueries',
    expectedAnswer:
      'A scalar subquery returns exactly one value and can be used anywhere a single value is expected (SELECT list, WHERE comparison); a correlated subquery references a column from the OUTER query, so it conceptually re-runs once per outer row; `IN` checks membership against a subquery\'s result SET, `EXISTS` checks only whether a correlated subquery returns ANY row at all (stopping at the first match) — `EXISTS` is generally safer and often faster than `IN` for large/correlated subqueries, and critically, `NOT IN` has a dangerous, non-obvious behavior with NULLs that `NOT EXISTS` does not share.',
    deepExplanation:
      "```sql\n-- scalar subquery in SELECT: each customer\\\n\nStep 1 — Understand the topic.\nTopic: Subqueries — scalar, correlated, IN vs EXISTS vs NOT EXISTS, and the NOT IN + NULL trap\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT c.id, c.name\nFROM customers c\nWHERE EXISTS (\n    SELECT 1\n    FROM orders o\n    WHERE o.customer_id = c.id\n);\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT c.id\nFROM customers c\nWHERE c.id IN (\n    SELECT customer_id\n    FROM orders\n);\n```\n\nStep 5 — Example result:\n```text\ncustomers with orders\n```\n\nStep 6 — Complexity / trade-off:\nPrefer EXISTS/NOT EXISTS for correlated existence tests; be careful with NOT IN and NULL semantics.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A \"find all products never included in any order\" report query written with `WHERE id NOT IN (SELECT product_id FROM order_items)` silently returned ZERO rows in production the moment a single `order_items.product_id` was ever NULL (e.g. from a data migration glitch or a deleted-product placeholder) — the on-call engineer spent hours debugging why an obviously-non-empty result set came back empty, before discovering the NOT IN NULL trap; switching to `NOT EXISTS` fixed it immediately and permanently, since NOT EXISTS never has this failure mode.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Subqueries — scalar, correlated, IN vs EXISTS vs NOT EXISTS, and the NOT IN + NULL trap**.",
    bestPractices: [
      'Default to `EXISTS`/`NOT EXISTS` over `IN`/`NOT IN` whenever the subquery column could conceivably contain a NULL — as a blanket habit, this eliminates an entire class of silent, hard-to-diagnose bugs.',
      'If you must use `NOT IN`, explicitly filter NULLs out of the subquery first (`... NOT IN (SELECT customer_id FROM orders WHERE customer_id IS NOT NULL)`) to neutralize the trap.',
      'Prefer a JOIN (with GROUP BY/DISTINCT as needed) over a correlated subquery in the SELECT list when fetching the same aggregate for MANY rows — a correlated subquery re-evaluates conceptually once per outer row, while a single JOIN + GROUP BY computes all groups in one pass.',
    ],
    tradeOffs:
      '`EXISTS` is unconditionally safer than `NOT IN` (immune to the NULL trap) with comparable or better performance in modern PostgreSQL, making it close to a strict improvement for correlated existence checks — the main reason `IN` still gets used is readability for simple, NULL-safe, non-correlated membership checks against a known-clean list of values, where the extra safety of EXISTS is not actually needed.',
    commonMistakes: [
      'Using `NOT IN (subquery)` without confirming the subquery column can never be NULL, silently returning zero rows in production the first time a NULL sneaks in.',
      'Writing a correlated scalar subquery in the SELECT list for a metric that would be far more efficiently computed with a single JOIN + GROUP BY over all rows at once.',
      'Assuming `IN` and `EXISTS` are always interchangeable performance-wise without considering the NULL-safety difference, which matters even when performance is identical.',
    ],
    followUpQuestions: [
      'Walk through exactly why `x NOT IN (1, 2, NULL)` evaluates to NULL (not TRUE or FALSE) for any x that is not 1 or 2.',
      'When would a correlated subquery in the SELECT list actually be preferable to a JOIN + GROUP BY?',
      'How does the PostgreSQL query planner typically rewrite a simple, non-correlated `IN` subquery internally, and does that change your recommendation?',
    ],
    relatedTopics: ['Subqueries', 'Correlated Subqueries', 'IN vs EXISTS', 'NOT IN NULL Trap', 'Semi-Join'],
  },
  {
    id: 'python-m16-4',
    number: 'PY-M16-4',
    title: 'Common Table Expressions (CTEs), multiple CTEs, and recursive CTEs for hierarchies',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'CTEs',
    expectedAnswer:
      'A CTE (`WITH name AS (...)`) is a named, temporary result set scoped to a single query, used to break a complex query into readable, composable steps or to enable recursion; since PostgreSQL 12, non-recursive CTEs are no longer an automatic "optimization fence" — the planner can inline and optimize them like a subquery unless explicitly forced to materialize with `MATERIALIZED`. A recursive CTE (`WITH RECURSIVE`) repeatedly evaluates itself, UNION-ing new rows onto the result until no new rows are produced — the standard tool for hierarchical data (org charts, category trees, threaded comments).',
    deepExplanation:
      "```sql\n-- multiple CTEs, each building on readable, named intermediate steps\nWITH paid_orders AS (\n    SELECT * FROM orders WHERE status = \\\n\nStep 1 — Understand the topic.\nTopic: Common Table Expressions (CTEs), multiple CTEs, and recursive CTEs for hierarchies\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nWITH totals AS (\n    SELECT customer_id,\n           SUM(total) AS revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT *\nFROM totals\nWHERE revenue > 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nWITH totals AS (\n    SELECT customer_id, SUM(total) revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT * FROM totals;\n```\n\nStep 5 — Example result:\n```text\naggregated customer totals\n```\n\nStep 6 — Complexity / trade-off:\nCTEs improve query decomposition; recursive CTEs solve hierarchical traversal.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A permissions system storing nested organizational units (division > department > team) uses a recursive CTE to answer \"list every team under this division, at any depth\" in a single query — without recursion, this would require either a fixed maximum-depth chain of manual self-joins (brittle, breaks if the hierarchy ever gets deeper) or N round trips walking the tree level by level from application code.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Common Table Expressions (CTEs), multiple CTEs, and recursive CTEs for hierarchies**.",
    bestPractices: [
      'Use `WITH RECURSIVE` for genuinely hierarchical/graph-shaped data (org charts, category trees, threaded comments, bill-of-materials) rather than walking the tree with repeated application-level queries.',
      'For a cyclic graph (not a strict tree), explicitly track visited nodes in the recursive term (e.g. an accumulating array checked with `NOT (id = ANY(path))`) to prevent infinite recursion.',
      'Use `MATERIALIZED` explicitly only when you deliberately want a CTE computed once and reused multiple times within the same query — do not assume every CTE is automatically an optimization fence in modern PostgreSQL.',
    ],
    tradeOffs:
      'CTEs (especially with multiple named steps) trade a small amount of verbosity for dramatically improved readability/maintainability on complex, multi-step queries — since PG12 this readability benefit comes essentially for free performance-wise for non-recursive CTEs referenced once, though a CTE referenced MANY times in the same query may still benefit from explicit `MATERIALIZED` to avoid redundant recomputation.',
    commonMistakes: [
      'Writing `WITH RECURSIVE` against data that can contain CYCLES without tracking visited nodes, causing an infinite loop (until PostgreSQL\'s statement timeout or `work_mem` limits intervene).',
      'Assuming a CTE is always an optimization fence (pre-PG12 behavior) and manually rewriting readable CTEs into nested subqueries "for performance" on a modern PostgreSQL version where this is no longer necessary.',
      'Using `UNION` instead of `UNION ALL` in a recursive CTE, forcing an expensive deduplication step on every iteration that is usually both unnecessary and can interfere with correct termination.',
    ],
    followUpQuestions: [
      'How would you modify the recursive org-chart CTE to also compute the total number of direct AND indirect reports for each employee?',
      'How would you detect and prevent infinite recursion if the `employees.manager_id` data accidentally contained a cycle?',
      'When would you explicitly force a CTE to materialize with `MATERIALIZED`, given that modern PostgreSQL auto-inlines by default?',
    ],
    relatedTopics: ['CTEs', 'WITH RECURSIVE', 'Hierarchical Data', 'Query Optimization', 'MATERIALIZED'],
  },
  {
    id: 'python-m16-5',
    number: 'PY-M16-5',
    title: 'Window functions part 1 — ROW_NUMBER, RANK, DENSE_RANK, NTILE, and PARTITION BY',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Window Functions',
    expectedAnswer:
      'A window function computes a value ACROSS a set of related rows ("the window", defined by `PARTITION BY` + `ORDER BY`) WITHOUT collapsing them into one row per group the way `GROUP BY` does — every input row still appears in the output, now with an extra computed column. `ROW_NUMBER()` assigns a strictly sequential, unique number per partition; `RANK()` assigns the same rank to ties but SKIPS subsequent numbers (1,1,3); `DENSE_RANK()` assigns the same rank to ties WITHOUT skipping (1,1,2); `NTILE(n)` divides the partition into `n` roughly equal buckets.',
    deepExplanation:
      "Sample data (employees):\n\n```text\nid  name    department  salary\n1   Ada     Engineering 150000\n2   Grace   Engineering 150000\n3   Alan    Engineering 130000\n4   Linus   Engineering 120000\n5   Margaret Sales      110000\n6   Hedy    Sales       105000\n```\n\n```sql\n-- top 3 highest-paid employees PER department — the canonical window-function interview problem\nSELECT * FROM (\n    SELECT\n        name, department, salary,\n        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn\n    FROM employees\n) ranked\nWHERE rn <= 3;\n\n-- ROW_NUMBER vs RANK vs DENSE_RANK on the SAME data, showing how ties are handled differently\nSELECT\n    name, department, salary,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,\n    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank_,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank_\nFROM employees\nWHERE department = \\\n\nStep 1 — Understand the topic.\nTopic: Window functions part 1 — ROW_NUMBER, RANK, DENSE_RANK, NTILE, and PARTITION BY\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT customer_id,\n       total,\n       ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY total DESC\n       ) AS rn\nFROM orders;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT\n    customer_id,\n    total,\n    RANK() OVER (\n        PARTITION BY customer_id\n        ORDER BY total DESC\n    ) AS rank\nFROM orders;\n```\n\nStep 5 — Example result:\n```text\nper-customer ranked orders\n```\n\nStep 6 — Complexity / trade-off:\nWindow functions compute across related rows without collapsing them into one row per group.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A leaderboard feature computing \"each player\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Window functions part 1 — ROW_NUMBER, RANK, DENSE_RANK, NTILE, and PARTITION BY**.",
    bestPractices: [
      'Use `ROW_NUMBER()` when you need a definite, unique per-partition ordinal (e.g. "the single most recent order per customer") and are fine with an arbitrary tiebreak among true ties (add an explicit tiebreaker column to `ORDER BY` for determinism).',
      'Use `RANK()`/`DENSE_RANK()` specifically when ties in the data should be reflected as tied ranks in the output, choosing between them based on whether subsequent ranks should skip the tied count.',
      'Wrap the windowed SELECT in an outer query (or a CTE) to filter on the computed window value — window functions cannot be referenced directly in the SAME level\'s WHERE clause, since (like SELECT-level expressions generally) WHERE is evaluated before window functions in logical execution order.',
    ],
    tradeOffs:
      'Window functions computing "top N per group" in a single query pass are dramatically more efficient than the pre-window-function-era pattern of a correlated subquery per row (or N separate per-group queries from application code), at the cost of a less immediately intuitive mental model for engineers unfamiliar with the `OVER (PARTITION BY ... ORDER BY ...)` syntax — the learning investment pays off directly in both query simplicity and execution efficiency.',
    commonMistakes: [
      'Trying to reference a window function\'s result directly in the same query level\'s `WHERE` clause (e.g. `WHERE ROW_NUMBER() OVER (...) <= 3`), hitting a "window functions are not allowed in WHERE" error — the fix is wrapping in a subquery/CTE and filtering the OUTER query instead.',
      'Using `ROW_NUMBER()` when the intent was actually to reflect ties (should have used `RANK()`/`DENSE_RANK()`), silently giving tied rows different, arbitrary positions.',
      'Forgetting a tiebreaker column in `ORDER BY` within the window definition when using `ROW_NUMBER()` for "the single latest/highest row per group", making the result non-deterministic across query runs when true ties exist.',
    ],
    followUpQuestions: [
      'Why can a window function not be referenced directly in the same query\'s WHERE clause, and what SQL execution-order rule explains this?',
      'How would `NTILE(4)` behave differently from manually computing quartile boundaries with `PERCENTILE_CONT`?',
      'How would you find "the most recent order per customer" using ROW_NUMBER(), and how does that differ from using `DISTINCT ON` (a PostgreSQL-specific shortcut for the same problem)?',
    ],
    relatedTopics: ['Window Functions', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'PARTITION BY', 'Top-N Per Group'],
  },
  {
    id: 'python-m16-6',
    number: 'PY-M16-6',
    title: 'Window functions part 2 — LAG/LEAD, running totals, moving averages, and frame clauses',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Window Functions',
    expectedAnswer:
      '`LAG(col, n)`/`LEAD(col, n)` access a value from `n` rows BEFORE/AFTER the current row within the same window ordering, essential for "compare to the previous/next record" problems; `SUM()`/`AVG() OVER (ORDER BY ... ROWS BETWEEN ...)` compute running totals and moving averages by explicitly defining a FRAME (a sliding sub-window of rows relative to the current row) rather than the whole partition.',
    deepExplanation:
      "Sample data (daily_sales):\n\n```text\nsale_date    revenue\n2026-01-01   1000\n2026-01-02   1200\n2026-01-03   900\n2026-01-04   1500\n2026-01-05   1100\n```\n\n```sql\n-- LAG/LEAD: compare each day to the previous day, compute day-over-day change\nSELECT\n    sale_date, revenue,\n    LAG(revenue, 1) OVER (ORDER BY sale_date) AS previous_day_revenue,\n    revenue - LAG(revenue, 1) OVER (ORDER BY sale_date) AS change_from_previous,\n    LEAD(revenue, 1) OVER (ORDER BY sale_date) AS next_day_revenue\nFROM daily_sales\nORDER BY sale_date;\n-- expected output (first row has no \"previous\", last row has no \"next\" — both NULL):\n-- sale_date  | revenue | previous_day_revenue | change_from_previous | next_day_revenue\n-- 2026-01-01 | 1000    | NULL                  | NULL                  | 1200\n-- 2026-01-02 | 1200    | 1000                  | 200                   | 900\n-- 2026-01-03 | 900     | 1200                  | -300                  | 1500\n-- 2026-01-04 | 1500    | 900                   | 600                   | 1100\n-- 2026-01-05 | 1100    | 1500                  | -400                  | NULL\n\n-- running total: default frame for ORDER BY without explicit ROWS is \"RANGE UNBOUNDED PRECEDING TO CURRENT ROW\"\nSELECT sale_date, revenue,\n    SUM(revenue) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\nFROM daily_sales ORDER BY sale_date;\n-- running_total: 1000, 2200, 3100, 4600, 5700\n\n-- 3-day moving average: an EXPLICIT sliding frame — current row plus the 2 preceding rows\nSELECT sale_date, revenue,\n    AVG(revenue) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3day\nFROM daily_sales ORDER BY sale_date;\n-- moving_avg_3day: 1000.00, 1100.00, 1033.33, 1200.00, 1166.67   (early rows average over fewer than 3 days, since there is no data before day 1)\n\n-- detecting a value CHANGE from the previous row (e.g. status transitions)\nSELECT sale_date, revenue,\n    revenue != LAG(revenue) OVER (ORDER BY sale_date) AS revenue_changed\nFROM daily_sales;\n```\n\nWhy `LAG`/`LEAD` beat a SELF JOIN for this: the equivalent self-join (`daily_sales a JOIN daily_sales b ON b.sale_date = a.sale_date - 1`) works but is awkward to express and reason about for anything beyond a fixed 1-row offset, and becomes genuinely painful for \"compare to N periods ago\" or when the sequence has gaps (missing dates) — `LAG(col, n)` handles both cleanly by operating on ROW POSITION within the ordered window, not on a literal date-arithmetic join condition.\n\nFrame clause vocabulary, precisely: `ROWS BETWEEN x PRECEDING AND y FOLLOWING` defines the frame in terms of a fixed number of physical ROWS relative to the current one; `RANGE BETWEEN ...` instead defines it in terms of VALUE distance in the ORDER BY column (relevant mainly for numeric/date ranges with ties) — for most \"N rows before/after\" business logic (moving averages, running totals), `ROWS` is the more intuitive and commonly used choice. Omitting an explicit frame clause on an aggregate window function with `ORDER BY` defaults to `RANGE UNBOUNDED PRECEDING AND CURRENT ROW` (a running total by default) — a subtlety worth knowing explicitly since it means `SUM(x) OVER (ORDER BY y)` is NOT the same as `SUM(x) OVER ()` (the latter, with no ORDER BY, sums the WHOLE partition into every row).\n\nStep 1 — Understand the topic.\nTopic: Window functions part 2 — LAG/LEAD, running totals, moving averages, and frame clauses\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT customer_id,\n       total,\n       ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY total DESC\n       ) AS rn\nFROM orders;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT\n    customer_id,\n    total,\n    RANK() OVER (\n        PARTITION BY customer_id\n        ORDER BY total DESC\n    ) AS rank\nFROM orders;\n```\n\nStep 5 — Example result:\n```text\nper-customer ranked orders\n```\n\nStep 6 — Complexity / trade-off:\nWindow functions compute across related rows without collapsing them into one row per group.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A financial reporting dashboard computing \"7-day rolling average daily active users\" uses `AVG(dau) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` directly in SQL rather than pulling raw daily rows into application code and computing the rolling average there — pushing the computation into the database avoids transferring more data than needed and leverages PostgreSQL\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Window functions part 2 — LAG/LEAD, running totals, moving averages, and frame clauses**.",
    bestPractices: [
      'Use `LAG`/`LEAD` for "compare to a nearby row in ordered sequence" problems instead of a self-join — clearer intent and correctly handles arbitrary offsets.',
      'Always specify an explicit frame clause (`ROWS BETWEEN ...`) for moving averages/windows rather than relying on the default frame, which is easy to get wrong (the default is a running total from the start, not a fixed-size window) for anything beyond a simple running total.',
      'Remember the FIRST row in a partition has no "previous" (LAG returns NULL) and the LAST has no "next" (LEAD returns NULL) — decide explicitly (via COALESCE or business logic) how these edge NULLs should be handled/displayed.',
    ],
    tradeOffs:
      'Computing running totals/moving averages in SQL via window functions keeps the computation close to the data (efficient, no unnecessary data transfer, leverages the database\'s optimized execution) versus pulling raw rows into application code and computing it there (more flexible for complex custom logic, but wasteful for simple, well-defined aggregations and adds application-layer complexity for something SQL already expresses cleanly).',
    commonMistakes: [
      'Omitting an explicit `ROWS BETWEEN` frame clause when a genuinely bounded moving average was intended, accidentally getting a running total (default RANGE UNBOUNDED PRECEDING) instead.',
      'Forgetting that the first/last rows in a partition yield NULL from LAG/LEAD and not handling that edge case in downstream calculations (e.g. `change_from_previous` being NULL on day 1, not 0).',
      'Using a self-join for "compare to previous row" logic when LAG/LEAD would be simpler, clearer, and handle sequence gaps more gracefully.',
    ],
    followUpQuestions: [
      'What is the practical difference between `ROWS BETWEEN` and `RANGE BETWEEN` frame specifications, and when would that difference actually change your query\'s result?',
      'How would you detect the FIRST occurrence of a value change in an ordered sequence using LAG (e.g. "the day revenue first dropped after 3 consecutive increases")?',
      'How would you compute a "7-day moving average" correctly if the underlying date sequence has GAPS (missing days with no sales rows at all)?',
    ],
    relatedTopics: ['Window Functions', 'LAG/LEAD', 'Running Totals', 'Moving Averages', 'Frame Clauses'],
  },
  {
    id: 'python-m16-7',
    number: 'PY-M16-7',
    title: 'Set operations — UNION, UNION ALL, INTERSECT, EXCEPT',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Set Operations',
    expectedAnswer:
      '`UNION` combines two result sets and removes duplicate rows (requires a sort/hash dedup pass); `UNION ALL` combines them WITHOUT deduplication (cheaper, and correct whenever you know the two sets cannot overlap or duplicates are acceptable/expected); `INTERSECT` returns only rows present in BOTH result sets; `EXCEPT` returns rows present in the first set but NOT the second. All four require the combined queries to have the same number of columns with compatible types.',
    deepExplanation:
      "Sample data:\n\n```text\nactive_customers (id)     newsletter_subscribers (id)\n1, 2, 3                    2, 3, 4\n```\n\n```sql\n-- UNION: all distinct ids from either set — dedup cost applies\nSELECT id FROM active_customers UNION SELECT id FROM newsletter_subscribers;\n-- result: 1, 2, 3, 4\n\n-- UNION ALL: same rows, but 2 and 3 appear TWICE (once from each source) since no dedup happens\nSELECT id FROM active_customers UNION ALL SELECT id FROM newsletter_subscribers;\n-- result: 1, 2, 3, 2, 3, 4\n\n-- INTERSECT: ids present in BOTH sets — active customers who are ALSO subscribed\nSELECT id FROM active_customers INTERSECT SELECT id FROM newsletter_subscribers;\n-- result: 2, 3\n\n-- EXCEPT: ids in the first set but not the second — active customers NOT subscribed\nSELECT id FROM active_customers EXCEPT SELECT id FROM newsletter_subscribers;\n-- result: 1\n\n-- a realistic combined report: \"all customer ids that are EITHER active OR subscribed, tagged by which\"\nSELECT id, \\\n\nStep 1 — Understand the topic.\nTopic: Set operations — UNION, UNION ALL, INTERSECT, EXCEPT\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A data-reconciliation script comparing \"customer ids present in the production database\" against \"customer ids present in the data warehouse\" uses `EXCEPT` in both directions (`prod EXCEPT warehouse` and `warehouse EXCEPT prod`) to directly surface exactly which ids are missing from each side — a much clearer expression of intent than an equivalent LEFT JOIN + IS NULL formulation for a pure \"what is different between these two sets\" question.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Set operations — UNION, UNION ALL, INTERSECT, EXCEPT**.",
    bestPractices: [
      'Default to `UNION ALL` over `UNION` whenever you know duplicates cannot occur (or are acceptable) — it avoids an unnecessary and potentially expensive deduplication pass.',
      'Use `INTERSECT`/`EXCEPT` for genuinely set-comparison-shaped business questions ("what is common", "what is missing from one side") where they read more clearly than the equivalent JOIN/subquery formulation.',
      'Ensure column counts and compatible types line up across every branch of a `UNION`/`INTERSECT`/`EXCEPT` — mismatches raise a clear error, but silent implicit type coercion between compatible-but-different types (e.g. INTEGER and NUMERIC) can still produce subtly unexpected results worth double-checking.',
    ],
    tradeOffs:
      '`UNION ALL` is strictly cheaper than `UNION` (no dedup pass) but produces WRONG results (duplicated rows) if the source sets can actually overlap and true deduplication was required — the performance gain is only safe to take when overlap is genuinely impossible or explicitly acceptable for the use case, never as a blind default optimization.',
    commonMistakes: [
      'Using `UNION` reflexively "to be safe" even when the two sets are provably disjoint, paying an unnecessary deduplication cost on every query execution.',
      'Using `UNION ALL` when the two sets CAN overlap and true deduplication was actually required, silently producing duplicate rows in the output.',
      'Forgetting that `UNION`/`INTERSECT`/`EXCEPT` require matching column counts/compatible types across all branches, and being confused by the resulting type-mismatch error.',
    ],
    followUpQuestions: [
      'Why is `UNION` more expensive than `UNION ALL`, at the execution-plan level?',
      'How would you rewrite an `INTERSECT` query using an equivalent `INNER JOIN` or `EXISTS` formulation, and would the performance differ in practice?',
      'How would you use `EXCEPT` (applied in both directions) to build a full "differences between two tables" reconciliation report?',
    ],
    relatedTopics: ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT', 'Set Operations', 'Deduplication'],
  },
  {
    id: 'python-m16-8',
    number: 'PY-M16-8',
    title: 'Views vs materialized views — when to use each, and refreshing strategies',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Views',
    expectedAnswer:
      'A regular VIEW is just a saved, named SELECT query — it stores no data itself and re-executes the underlying query fresh on every reference, so it is always up to date but adds no performance benefit (and inherits the full cost of the underlying query every time). A MATERIALIZED VIEW physically stores the query\'s RESULT on disk like a table, making reads fast, but the data goes STALE the moment the underlying tables change and must be explicitly `REFRESH`ed to catch up.',
    deepExplanation:
      "```sql\n-- regular view: always fresh, no storage, re-runs the query every time it is referenced\nCREATE VIEW customer_lifetime_value AS\nSELECT c.id, c.name, COALESCE(SUM(o.total), 0) AS lifetime_value\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id AND o.status = \\\n\nStep 1 — Understand the topic.\nTopic: Views vs materialized views — when to use each, and refreshing strategies\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\ndef solve(value):\n    return value\n\nprint(solve(\"example\"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nprint(\"example\")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual form for learning the mechanism and the built-in/standard-library form for concise production code when it stays readable.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A quarterly business-intelligence dashboard showing \"revenue by product category by month\" over a multi-million-row orders table uses a materialized view refreshed nightly via a scheduled job — the dashboard loads instantly (querying pre-computed, indexed rows) instead of re-aggregating millions of rows on every page load, and the acceptable 24-hour staleness is a non-issue for a report reviewed once a day.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Views vs materialized views — when to use each, and refreshing strategies**.",
    bestPractices: [
      'Default to a plain VIEW for readability/reuse of moderately-costed queries where freshness matters; reach for a MATERIALIZED VIEW specifically when the underlying query is expensive AND some staleness is acceptable.',
      'Always create a UNIQUE index on a materialized view you intend to refresh with `CONCURRENTLY`, and default to `CONCURRENTLY` in production to avoid blocking concurrent readers during refresh.',
      'Schedule materialized view refreshes explicitly (cron job, pg_cron extension, or an application-triggered job) — refreshes never happen automatically, unlike a regular view which is always live.',
    ],
    tradeOffs:
      'A materialized view trades data freshness (can be stale between refreshes) for read performance (pre-computed, indexed, instant reads) — the correct choice is entirely determined by whether the consuming use case genuinely tolerates staleness; using a materialized view for data that MUST be real-time (e.g. a live account balance) would be a serious correctness bug, not just a performance tradeoff.',
    commonMistakes: [
      'Using a materialized view for data that needs to be real-time/always-current, introducing subtle staleness bugs that only surface once someone notices the numbers do not match the live source.',
      'Forgetting to schedule/automate the refresh, leaving a materialized view permanently stale after the first manual refresh.',
      'Attempting `REFRESH MATERIALIZED VIEW CONCURRENTLY` without a UNIQUE index already defined on the materialized view, hitting an error rather than a silent fallback to blocking refresh.',
    ],
    followUpQuestions: [
      'How would you decide the right refresh interval/schedule for a given materialized view, considering both staleness tolerance and refresh cost?',
      'What actually happens to concurrent readers during a plain (non-CONCURRENTLY) `REFRESH MATERIALIZED VIEW`?',
      'Could you build an incrementally-updated materialized view in PostgreSQL (rather than always fully recomputing), and what would that require?',
    ],
    relatedTopics: ['Views', 'Materialized Views', 'REFRESH', 'Data Freshness', 'Reporting'],
  },
  {
    id: 'python-m16-9',
    number: 'PY-M16-9',
    title: 'Transactions and ACID — the bank-transfer example and what happens when a step fails',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Transactions',
    expectedAnswer:
      'A transaction (`BEGIN ... COMMIT`/`ROLLBACK`) groups multiple statements into a single all-or-nothing unit — either every statement\'s effects become permanent together (`COMMIT`), or NONE of them do (`ROLLBACK`), even if some statements already appeared to succeed before a later one failed. ACID summarizes the guarantees: Atomicity (all-or-nothing), Consistency (the database moves between valid states, respecting all constraints), Isolation (concurrent transactions do not see each other\'s uncommitted intermediate state, per the isolation level in effect), Durability (once committed, the change survives a crash, guaranteed by the Write-Ahead Log).',
    deepExplanation:
      "The canonical bank-transfer example:\n\n```sql\nBEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = \\\n\nStep 1 — Understand the topic.\nTopic: Transactions and ACID — the bank-transfer example and what happens when a step fails\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nBEGIN;\n\nUPDATE accounts\nSET balance = balance - 100\nWHERE id = 1;\n\nUPDATE accounts\nSET balance = balance + 100\nWHERE id = 2;\n\nCOMMIT;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n```\n\nStep 5 — Example result:\n```text\nboth account updates commit together\n```\n\nStep 6 — Complexity / trade-off:\nUse one transaction for invariants that must change atomically.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce checkout wraps \"create order row, create order_items rows, decrement inventory, create a payment record\" in a single transaction specifically so that a failure at ANY step (e.g. inventory decrementing below zero, rejected by a CHECK constraint) rolls back the ENTIRE checkout — preventing the genuinely dangerous outcome of charging a customer\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Transactions and ACID — the bank-transfer example and what happens when a step fails**.",
    bestPractices: [
      'Wrap any set of statements that must succeed or fail TOGETHER as a business unit (not just individually valid SQL) in an explicit transaction, never relying on each statement auto-committing independently.',
      'Use `SAVEPOINT` when a transaction needs to attempt an operation that MIGHT fail and, on failure, fall back to an alternative path without discarding the entire transaction\'s prior work.',
      'Keep transactions as SHORT as practically possible — a long-running transaction holds locks and prevents VACUUM from cleaning up old row versions, both of which have real production performance consequences.',
    ],
    tradeOffs:
      'Wrapping multiple statements in an explicit transaction adds a small amount of lock-holding duration (rows touched stay locked until COMMIT/ROLLBACK) compared to auto-committing each statement independently, but is the ONLY way to guarantee a multi-step business operation either fully happens or fully does not — for genuinely multi-step, all-or-nothing business logic, this tradeoff is non-negotiable; independent, unrelated statements should NOT be needlessly wrapped in one transaction just out of habit, since that only extends lock duration for no correctness benefit.',
    commonMistakes: [
      'Performing a multi-step business operation (debit + credit, order + inventory + payment) as separate auto-committed statements instead of one explicit transaction, risking a partially-applied, inconsistent state if a later step fails.',
      'Holding a transaction open for an unnecessarily long time (e.g. making a slow external API call in the middle of an open transaction), needlessly extending lock contention and delaying VACUUM.',
      'Forgetting that a failed statement inside a transaction (e.g. a constraint violation) puts the ENTIRE transaction into an aborted state — every subsequent statement in that same transaction will also fail until an explicit `ROLLBACK` (or `ROLLBACK TO SAVEPOINT`) is issued.',
    ],
    followUpQuestions: [
      'What specifically happens if your application crashes AFTER sending COMMIT but BEFORE receiving the server\'s acknowledgment — did the transfer happen or not?',
      'Why does PostgreSQL put an entire transaction into an aborted state after any single statement error, rather than just ignoring the failed statement and continuing?',
      'How would you use SAVEPOINT to implement "try operation A, and if it fails, fall back to operation B" within one larger transaction?',
    ],
    relatedTopics: ['Transactions', 'ACID', 'BEGIN/COMMIT/ROLLBACK', 'SAVEPOINT', 'Atomicity', 'Consistency'],
  },
  {
    id: 'python-m16-10',
    number: 'PY-M16-10',
    title: 'Transaction isolation levels — dirty reads, non-repeatable reads, phantom reads, and Serializable',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Isolation Levels',
    expectedAnswer:
      'PostgreSQL supports Read Committed (the DEFAULT), Repeatable Read, and Serializable isolation levels (it does not implement true Read Uncommitted — it silently upgrades that request to Read Committed, since PostgreSQL\'s MVCC design never exposes uncommitted data to other transactions in the first place). Read Committed allows non-repeatable reads and phantom reads (each statement sees a fresh snapshot as of ITS start); Repeatable Read prevents both (the whole transaction sees one consistent snapshot from its start) but can still suffer serialization anomalies under concurrent writes; Serializable prevents all anomalies by detecting conflicts and forcing one of the conflicting transactions to abort with a serialization failure, which the application must be prepared to retry.',
    deepExplanation:
      "```text\nDirty read           — reading another transaction\\\n\nStep 1 — Understand the topic.\nTopic: Transaction isolation levels — dirty reads, non-repeatable reads, phantom reads, and Serializable\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nBEGIN;\n\nUPDATE accounts\nSET balance = balance - 100\nWHERE id = 1;\n\nUPDATE accounts\nSET balance = balance + 100\nWHERE id = 2;\n\nCOMMIT;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n```\n\nStep 5 — Example result:\n```text\nboth account updates commit together\n```\n\nStep 6 — Complexity / trade-off:\nUse one transaction for invariants that must change atomically.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A ticket-booking system preventing double-booking of the LAST available seat uses `SERIALIZABLE` isolation specifically because Repeatable Read alone is not sufficient to prevent two concurrent transactions from both reading \"1 seat available\" and both successfully booking it — Serializable detects this write-skew-style conflict and aborts one transaction, which the booking API catches and retries (informing that user the seat was just taken by someone else).\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Transaction isolation levels — dirty reads, non-repeatable reads, phantom reads, and Serializable**.",
    bestPractices: [
      'Default to Read Committed (PostgreSQL\'s default) for ordinary CRUD operations — only reach for stricter isolation when a SPECIFIC anomaly (non-repeatable read, phantom, or a write-skew-style conflict) would actually cause a real business-logic bug.',
      'Always implement an application-level retry loop around any transaction run at `SERIALIZABLE` isolation — serialization failures are an EXPECTED, normal outcome under concurrent load, not an exceptional error condition to merely surface to the user.',
      'Use `REPEATABLE READ` for multi-statement reporting/analytics transactions that need one consistent snapshot across several queries, without needing full Serializable guarantees or its retry-loop requirement.',
    ],
    tradeOffs:
      'Stricter isolation levels (Serializable > Repeatable Read > Read Committed) trade throughput/concurrency (more transactions aborted and retried under contention, or more restrictive locking behavior) for stronger correctness guarantees — the right level is determined by which specific anomaly would actually cause a real bug in YOUR business logic, not by reflexively choosing the strictest available option "to be safe", which needlessly costs performance and requires retry-loop complexity everywhere.',
    commonMistakes: [
      'Running everything at `SERIALIZABLE` "for safety" without implementing the required retry logic, causing legitimate concurrent operations to fail outright under load instead of transparently retrying.',
      'Assuming Read Committed (the default) prevents non-repeatable/phantom reads, when it explicitly does not — only Repeatable Read and Serializable do.',
      'Believing dirty reads are possible in PostgreSQL at some isolation level "because the SQL standard defines Read Uncommitted" — PostgreSQL\'s MVCC design makes dirty reads structurally impossible regardless of the requested isolation level.',
    ],
    followUpQuestions: [
      'Why is a dirty read structurally impossible in PostgreSQL even if you explicitly request `READ UNCOMMITTED`?',
      'Give a concrete example of a "write skew" anomaly that Repeatable Read allows but Serializable prevents.',
      'How would you decide, for a specific piece of business logic, whether Repeatable Read is sufficient or true Serializable (with its retry-loop cost) is actually required?',
    ],
    relatedTopics: ['Isolation Levels', 'Read Committed', 'Repeatable Read', 'Serializable', 'Phantom Reads', 'MVCC'],
  },
  {
    id: 'python-m16-11',
    number: 'PY-M16-11',
    title: 'Locking — row vs table locks, SELECT FOR UPDATE, and a concrete deadlock scenario',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Locking',
    expectedAnswer:
      '`SELECT ... FOR UPDATE` takes an exclusive row-level lock on the selected rows, blocking any OTHER transaction from also locking (or updating/deleting) those same rows until the current transaction commits or rolls back — the standard tool for "read a row with the explicit intent to update it safely under concurrency" (pessimistic locking). `FOR SHARE` takes a weaker shared lock (multiple transactions can hold it simultaneously, blocking only writers, not other readers). A DEADLOCK occurs when two transactions each hold a lock the other is waiting for, in a cycle — PostgreSQL automatically detects this and aborts one of the transactions to break the cycle.',
    deepExplanation:
      "```sql\n-- pessimistic locking: lock the row, THEN safely read-modify-write it\nBEGIN;\nSELECT balance FROM accounts WHERE id = \\\n\nStep 1 — Understand the topic.\nTopic: Locking — row vs table locks, SELECT FOR UPDATE, and a concrete deadlock scenario\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nBEGIN;\n\nSELECT id, quantity\nFROM inventory\nWHERE id = 10\nFOR UPDATE;\n\nUPDATE inventory\nSET quantity = quantity - 1\nWHERE id = 10;\n\nCOMMIT;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nUPDATE inventory\nSET quantity = quantity - 1\nWHERE id = 10\n  AND quantity > 0;\n```\n\nStep 5 — Example result:\n```text\nrow is serialized before update\n```\n\nStep 6 — Complexity / trade-off:\nUse row locks for read-modify-write invariants; enforce a consistent lock ordering to reduce deadlocks.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A job-queue table processed by multiple worker processes uses `SELECT * FROM jobs WHERE status = \\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Locking — row vs table locks, SELECT FOR UPDATE, and a concrete deadlock scenario**.",
    bestPractices: [
      'Always acquire locks on multiple rows in a single, globally-consistent order (e.g. sorted by primary key) across every code path that locks more than one row, to structurally eliminate deadlock possibility rather than merely handling the resulting error.',
      'Use `FOR UPDATE SKIP LOCKED` for queue/worker-pool style workloads where you want to atomically claim an available row without blocking on rows other workers are already processing.',
      'Keep the transaction holding a row lock as SHORT as possible (compute values in application code before or after the lock window, not during a slow external call while holding it) to minimize lock contention.',
    ],
    tradeOffs:
      'Pessimistic locking (`FOR UPDATE`) guarantees correctness under contention by making concurrent writers wait, at the direct cost of reduced concurrency/throughput on hot rows — optimistic locking (a version column checked on UPDATE, covered in Module 18) avoids blocking entirely by instead detecting conflicts AFTER the fact and asking the application to retry, which scales better under low-contention conditions but wastes work on genuinely high-contention rows where retries collide repeatedly.',
    commonMistakes: [
      'Locking multiple rows in an order that differs between different code paths/transactions, creating exactly the conditions for a deadlock under concurrent execution.',
      'Holding a `FOR UPDATE` lock open across a slow external operation (an API call, a long computation) instead of doing that work before or after the lock window, needlessly extending contention.',
      'Assuming a deadlock is a bug to eliminate entirely through application logic alone — PostgreSQL always detects and resolves genuine deadlocks automatically (aborting one side), so the correct application behavior is to CATCH that specific error and retry, not to treat it as an unrecoverable failure.',
    ],
    followUpQuestions: [
      'How does PostgreSQL\'s deadlock detector actually work, and why does it only run periodically (not instantly)?',
      'What is the practical difference between `FOR UPDATE`, `FOR NO KEY UPDATE`, `FOR SHARE`, and `FOR KEY SHARE`?',
      'How would `SKIP LOCKED` change the correctness (not just performance) of a queue-processing query compared to plain `FOR UPDATE`?',
    ],
    relatedTopics: ['Locking', 'SELECT FOR UPDATE', 'Deadlocks', 'Pessimistic Locking', 'SKIP LOCKED', 'Queue Pattern'],
  },
  {
    id: 'python-m16-12',
    number: 'PY-M16-12',
    title: 'PL/pgSQL functions, procedures, and triggers — an updated_at trigger and an audit log',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'PL/pgSQL & Triggers',
    expectedAnswer:
      'A PL/pgSQL FUNCTION encapsulates procedural logic (variables, conditionals, loops, exception handling) that runs inside the database and can be called from SQL or invoked automatically by a TRIGGER — a BEFORE trigger can inspect/modify the row before it is written (e.g. auto-setting `updated_at`), while an AFTER trigger runs once the write has already happened (e.g. writing an audit log entry) and cannot modify the row being written. Triggers guarantee the logic runs for EVERY write regardless of which application code path performed it, at the cost of being less visible/discoverable than equivalent application-level logic.',
    deepExplanation:
      "```sql\n-- a reusable trigger FUNCTION: auto-update an updated_at column on any UPDATE\nCREATE OR REPLACE FUNCTION set_updated_at()\nRETURNS TRIGGER AS $$\nBEGIN\n    NEW.updated_at := NOW();   -- BEFORE triggers can modify NEW before it is actually written\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_products_updated_at\nBEFORE UPDATE ON products\nFOR EACH ROW\nEXECUTE FUNCTION set_updated_at();\n\n-- an AFTER trigger for audit logging — cannot modify the row (the write already happened), only observe it\nCREATE TABLE audit_log (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    table_name TEXT NOT NULL,\n    row_id BIGINT NOT NULL,\n    operation TEXT NOT NULL,\n    old_data JSONB,\n    new_data JSONB,\n    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE OR REPLACE FUNCTION audit_products()\nRETURNS TRIGGER AS $$\nBEGIN\n    IF TG_OP = \\\n\nStep 1 — Understand the topic.\nTopic: PL/pgSQL functions, procedures, and triggers — an updated_at trigger and an audit log\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT COUNT(*) AS users,\n       AVG(age) AS avg_age\nFROM users;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT COUNT(*), SUM(total)\nFROM orders;\n```\n\nStep 5 — Example result:\n```text\naggregated metrics\n```\n\nStep 6 — Complexity / trade-off:\nBuilt-in aggregate functions are clearer and usually faster than application-side aggregation.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A compliance-driven system storing financial records uses an AFTER trigger writing to an immutable `audit_log` table for every INSERT/UPDATE/DELETE on the `accounts` table — this guarantees a complete audit trail exists NO MATTER which application code path (or even a manual `psql` session by an engineer) modified the data, which is precisely the universal, cannot-be-bypassed guarantee a trigger provides that equivalent application-level logging could not (a forgotten application-layer log call, or a direct database edit, would silently skip it).\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **PL/pgSQL functions, procedures, and triggers — an updated_at trigger and an audit log**.",
    bestPractices: [
      'Reserve triggers for genuinely universal, database-level concerns (timestamps, audit trails, data normalization) that must apply regardless of which code path performs the write — not general business logic.',
      'Use BEFORE triggers to modify/validate the row being written (updated_at, normalization); use AFTER triggers for side effects that observe an already-completed change (audit logging, notifications).',
      'Document triggers clearly and keep them simple/fast — since they are invisible from typical application-code review, undocumented complex trigger logic is a common source of "mystery" production behavior.',
    ],
    tradeOffs:
      'Trigger-based logic guarantees universal enforcement (cannot be bypassed by any write path, including ad hoc SQL) at the cost of reduced visibility/discoverability from application code and, for AFTER triggers performing significant work, added latency on every write to the trigger-bearing table — application-level logic is more visible/testable/debuggable but can be silently bypassed by any write path that does not go through it (a raw SQL migration, a different microservice writing to the same table).',
    commonMistakes: [
      'Putting genuine business logic (sending emails, calling external APIs, complex conditional workflows) into a trigger, making it invisible to engineers reading the application codebase and hard to test/debug.',
      'Forgetting that an AFTER trigger cannot modify the row being written — attempting to change `NEW` in an AFTER trigger has no effect on what was actually stored.',
      'Writing an expensive trigger (e.g. one issuing multiple additional queries) on a hot, frequently-written table without measuring the added write latency it introduces.',
    ],
    followUpQuestions: [
      'Why can an AFTER trigger not modify the row being written, while a BEFORE trigger can?',
      'How would you use `pg_notify` inside a trigger to push a real-time notification to a listening application process?',
      'What is a concrete example of logic that seems tempting to put in a trigger but genuinely belongs in application code instead, and why?',
    ],
    relatedTopics: ['PL/pgSQL', 'Triggers', 'BEFORE/AFTER Triggers', 'Audit Logging', 'Stored Functions'],
  },
  {
    id: 'python-m16-13',
    number: 'PY-M16-13',
    title: 'JSONB deep dive — operators, GIN indexing, and when to use it (and when not to)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'JSONB',
    expectedAnswer:
      'JSONB stores JSON in a decomposed binary format supporting rich operators for extraction (`->`, `->>`), containment (`@>`), key existence (`?`), and path navigation (`#>`, `#>>`), and can be indexed with a GIN index for fast containment/existence queries even at large scale — but it should supplement, not replace, a normalized relational schema: genuinely structured, frequently-queried, strongly-typed attributes belong in real columns, while JSONB is best reserved for sparse, variable, or rarely-queried-in-bulk data.',
    deepExplanation:
      "```sql\nCREATE TABLE products (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name TEXT NOT NULL,\n    attributes JSONB NOT NULL DEFAULT \\\n\nStep 1 — Understand the topic.\nTopic: JSONB deep dive — operators, GIN indexing, and when to use it (and when not to)\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT id\nFROM users\nWHERE profile @> '{\"role\":\"admin\"}';\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nCREATE INDEX idx_users_profile\nON users USING GIN (profile);\n```\n\nStep 5 — Example result:\n```text\nmatching JSONB records\n```\n\nStep 6 — Complexity / trade-off:\nJSONB is flexible, but frequently queried structure should still have deliberate indexing/schema design.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "A multi-tenant SaaS platform storing per-customer \"custom fields\" (each customer can define their own arbitrary set of fields on a lead record) uses a JSONB `custom_fields` column with a GIN index, since the SET of fields genuinely varies per tenant and a fully normalized schema would require either an unmanageable EAV (entity-attribute-value) table design or per-tenant schema migrations — meanwhile the CORE lead fields (name, email, status, assigned_to) remain real, typed, indexed columns since every tenant shares and frequently queries/filters on those.\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **JSONB deep dive — operators, GIN indexing, and when to use it (and when not to)**.",
    bestPractices: [
      'Keep genuinely structured, frequently-filtered, strongly-typed attributes as real columns — reserve JSONB for sparse, variable, or rarely-individually-queried data.',
      'Add a GIN index on any JSONB column you plan to filter with `@>` or `?` at meaningful scale — without it, JSONB containment queries fall back to a full sequential scan.',
      'Promote a frequently-filtered JSONB field to a real column the moment query patterns show it is being accessed constantly and specifically — JSONB should not become a permanent substitute for proper schema design once a field\'s importance becomes clear.',
    ],
    tradeOffs:
      'JSONB buys schema flexibility (no migration needed to add/change nested fields) at the cost of weaker type safety (no column-level type/constraint enforcement on nested fields), less efficient indexing for arbitrary nested-path queries compared to a dedicated column, and no ability to participate directly in foreign keys — the right amount of JSONB usage in a schema is "exactly the genuinely variable parts", not a wholesale substitute for relational modeling.',
    commonMistakes: [
      'Using JSONB for the ENTIRE row\'s data ("just store everything as one big JSONB blob") instead of a proper relational schema, losing type safety, straightforward indexing, and referential integrity for data that was never actually variable in shape.',
      'Confusing `->` (returns JSONB, chainable) with `->>` (returns TEXT, terminal) mid-path, breaking further chaining or comparison.',
      'Filtering heavily on ONE SPECIFIC nested JSONB field without ever promoting it to a real indexed column, accepting worse query performance than a proper schema would provide for no remaining flexibility benefit.',
    ],
    followUpQuestions: [
      'Why does a GIN index accelerate `@>`/`?` queries but not general nested-path equality lookups?',
      'How would you migrate a frequently-queried JSONB field into a real, typed, indexed column with zero downtime on a large production table?',
      'What is the EAV (entity-attribute-value) anti-pattern, and how does JSONB solve the same underlying problem more effectively in PostgreSQL?',
    ],
    relatedTopics: ['JSONB', 'JSON Operators', 'GIN Index', 'Schema Flexibility', 'jsonb_set'],
  },
  {
    id: 'python-m16-14',
    number: 'PY-M16-14',
    title: 'Coding: recursive CTE for a category tree with parent/child relationships',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'SQL Coding',
    expectedAnswer:
      'Given a self-referencing `categories` table (`id`, `name`, `parent_id`), a recursive CTE builds the FULL descendant tree from any starting category (or the whole tree from the roots), computing depth and a display path in one query — the standard, correct way to materialize an arbitrarily-deep hierarchy without N+1 application-level queries or a hardcoded maximum depth.',
    deepExplanation:
      "```sql\n-- schema\nCREATE TABLE categories (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name TEXT NOT NULL,\n    parent_id BIGINT REFERENCES categories(id)\n);\n\n-- sample data\nINSERT INTO categories (id, name, parent_id) OVERRIDING SYSTEM VALUE VALUES\n    (1, \\\n\nStep 1 — Understand the topic.\nTopic: Coding: recursive CTE for a category tree with parent/child relationships\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nWITH totals AS (\n    SELECT customer_id,\n           SUM(total) AS revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT *\nFROM totals\nWHERE revenue > 1000;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nWITH totals AS (\n    SELECT customer_id, SUM(total) revenue\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT * FROM totals;\n```\n\nStep 5 — Example result:\n```text\naggregated customer totals\n```\n\nStep 6 — Complexity / trade-off:\nCTEs improve query decomposition; recursive CTEs solve hierarchical traversal.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "An e-commerce category browsing feature (\"Electronics > Computers > Laptops > Gaming Laptops\" breadcrumb, plus \"show all products in this category AND its subcategories\") is powered directly by this exact recursive CTE pattern — the breadcrumb uses the ancestor-path variant, and \"all products in this category tree\" joins the products table against the descendants CTE\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: recursive CTE for a category tree with parent/child relationships**.",
    bestPractices: [
      'Use a recursive CTE rather than N sequential application-level queries walking the tree level by level — one round trip regardless of tree depth.',
      'Accumulate an ancestor-id array in the recursive term and guard against revisiting an already-seen id, protecting against infinite recursion if the hierarchy data could ever contain a cycle.',
      'Add an index on `parent_id` (`CREATE INDEX ON categories (parent_id);`) so each recursive iteration\'s join is an efficient indexed lookup rather than a sequential scan.',
    ],
    tradeOffs:
      'A recursive CTE computing the entire tree (or subtree) in one query is far more efficient than N round trips from application code, but for a VERY frequently read, rarely-changing, shallow hierarchy, a denormalized "materialized path" column (storing the full ancestor path as a string or array directly on each row, updated on write) can be even faster to READ at the cost of more complex, careful WRITE-time maintenance — the recursive CTE approach is the more general, lower-maintenance default; materialized path is an optimization worth reaching for only once read performance on the CTE approach is measurably insufficient.',
    commonMistakes: [
      'Walking the tree with repeated application-level queries (fetch node, then fetch its children, then their children...) instead of a single recursive CTE, causing an N+1-style query explosion proportional to tree depth/breadth.',
      'Omitting cycle protection (the ancestor-id array check) when the hierarchy data is not GUARANTEED acyclic by a database constraint, risking infinite recursion on bad data.',
      'Forgetting an index on the `parent_id` foreign key column, making each level of the recursion a sequential scan instead of an efficient indexed lookup.',
    ],
    followUpQuestions: [
      'How would you modify this query to also compute, for each category, the total COUNT of products across itself and all its descendants?',
      'How would a "materialized path" (storing the full path directly on each row) change the tradeoffs compared to always computing it via a recursive CTE?',
      'How would you detect whether the existing `categories` data already contains a cycle, without relying on the recursive query itself to catch it?',
    ],
    relatedTopics: ['Recursive CTE', 'Hierarchical Data', 'Category Tree', 'Materialized Path', 'Cycle Detection'],
  },
  {
    id: 'python-m16-15',
    number: 'PY-M16-15',
    title: 'Coding: a reporting query combining CTEs, JOINs, and a running-total window function',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'SQL Coding',
    expectedAnswer:
      'A realistic monthly revenue report combines everything from this module: a CTE to pre-aggregate raw orders into monthly totals per customer, a JOIN back to customers for display names, and a window function to compute a running cumulative total across months — the kind of query that backs an executive revenue dashboard.',
    deepExplanation:
      "```sql\n-- schema (abridged)\nCREATE TABLE customers (id BIGINT PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE orders (\n    id BIGINT PRIMARY KEY,\n    customer_id BIGINT NOT NULL REFERENCES customers(id),\n    status TEXT NOT NULL,\n    total NUMERIC(12,2) NOT NULL,\n    placed_at TIMESTAMPTZ NOT NULL\n);\n\n-- sample data\nINSERT INTO customers VALUES (1, \\\n\nStep 1 — Understand the topic.\nTopic: Coding: a reporting query combining CTEs, JOINs, and a running-total window function\n\nStep 2 — Easy method.\nIdentify the boundary/rule first, then trace a small valid example and one failure case.\n\nStep 3 — WITHOUT BUILT-IN / CORE implementation:\n```python\nSELECT c.name, o.id\nFROM customers c\nLEFT JOIN orders o\n  ON o.customer_id = c.id\nWHERE o.id IS NULL;\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / FRAMEWORK / STANDARD-LIBRARY implementation:\n```python\nSELECT c.name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM orders o\n    WHERE o.customer_id = c.id\n);\n```\n\nStep 5 — Example result:\n```text\ncustomers with no orders\n```\n\nStep 6 — Complexity / trade-off:\nKeep right-side match predicates in ON when you need to preserve unmatched left rows.\n\nStep 7 — Edge cases:\nCheck empty/null input, invalid values, duplicate data, concurrency, transaction/lifecycle boundaries, large datasets, security exposure, and migration/rollback concerns when relevant.\n\nStep 8 — Interview takeaway:\nExplain the source concept first, then the manual implementation, the framework/standard alternative, complexity, failure mode, and the production reason for choosing one approach.",
    productionExample:
      "This exact CTE-then-window-function shape is what a \"cumulative revenue by customer, month over month\" executive dashboard query looks like in production — pre-aggregating with a CTE keeps the window function\\\n\nCoding practice: explain the manual/core approach first, then the framework/Pythonic/standard-library alternative for **Coding: a reporting query combining CTEs, JOINs, and a running-total window function**.",
    bestPractices: [
      'Pre-aggregate with a CTE (or subquery) to the correct GRANULARITY before applying a window function that should operate on that aggregated level, rather than nesting a window function directly over raw, un-grouped rows.',
      'Be explicit about the frame clause (`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`) for a running total rather than relying on the implicit default, for clarity even where the default happens to match.',
      'Decide deliberately whether zero-activity periods (a customer\'s month with no orders) should be explicitly represented (via a generated calendar series LEFT JOINed in) or simply absent from the result, based on what the report consumer actually needs.',
    ],
    tradeOffs:
      'Computing the running total in SQL (via the window function) keeps the report logic centralized, testable with plain SQL, and efficient (single query, single pass over pre-aggregated data) versus pulling monthly totals into application code and accumulating the running total there — for a report this shape, SQL is clearly the more efficient and less error-prone choice; only genuinely complex, hard-to-express-in-SQL business logic would justify moving the accumulation to application code.',
    commonMistakes: [
      'Applying the running-total window function directly over raw, un-aggregated order rows instead of pre-aggregating to the monthly grain first, producing an incorrectly-granular (or simply wrong) cumulative figure.',
      'Assuming every customer/month combination will appear in the output, when in fact months with zero paid orders are simply ABSENT from a CTE built via GROUP BY — a dashboard needing explicit zero-rows must LEFT JOIN against a generated series.',
      'Forgetting `PARTITION BY customer_id` on the window function, which would incorrectly accumulate a running total ACROSS different customers instead of resetting per customer.',
    ],
    followUpQuestions: [
      'How would you modify this query to explicitly show $0.00 for a customer/month combination with no paid orders, rather than omitting that row entirely?',
      'How would you extend this to also show each customer\'s percentage contribution to that month\'s TOTAL revenue across all customers (hint: a second window function partitioned by month instead of customer)?',
      'How would you materialize this as a scheduled, pre-computed table/materialized view if the dashboard needed to load instantly over a very large orders table?',
    ],
    relatedTopics: ['CTEs', 'Window Functions', 'Running Total', 'JOINs', 'Reporting Queries', 'GROUP BY'],
  },
];

export const MOCK_PYTHON_MODULE16_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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