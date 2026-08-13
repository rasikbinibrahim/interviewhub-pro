# QADVJS052 · Implement an LRU Cache Using a Map

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Data Structures / Design
**Concepts:** `Map` insertion-order guarantee, O(1) get/put via key-order manipulation, eviction policy, cache design

## Problem Statement

Implement an `LRUCache` class with a fixed `capacity`, supporting:

- `get(key)` — returns the value for `key` if present (and marks it as
  the *most recently used* entry), or `-1`/`undefined` if not present.
- `put(key, value)` — inserts or updates `key`'s value (also marking it
  as most recently used); if inserting a *new* key would exceed
  `capacity`, evict the **least recently used** entry first.

Both operations must run in O(1) time. The classic language-agnostic
solution uses a hand-rolled doubly linked list plus a hash map; in
JavaScript specifically, a `Map` already does most of that heavy
lifting on its own, because a `Map`'s keys iterate in **insertion
order** — this problem is as much about recognizing that JS-idiomatic
shortcut as it is about the LRU eviction logic itself.

## Input

- Constructor: `new LRUCache(capacity)`, `capacity` a positive integer.
- `get(key)`: any valid `Map` key (numbers, strings, objects, etc.).
- `put(key, value)`: a key and a value of any type.

## Output

- `get(key)` returns the stored value, or a sentinel (`-1`, matching
  the common LeetCode-style convention, though `undefined` is also
  defensible — state the choice explicitly) if `key` isn't present.
- `put` has no return value; it mutates the cache in place.

## Constraints

- `1 <= capacity <= 10^4` (a realistic upper bound; the logic itself
  doesn't depend on this specific number).
- `get` and `put` must both run in O(1) **average** time — not O(n) via
  scanning for the least-recently-used entry.
- `get`/`put` on an existing key must move that key to the
  "most recently used" position.
- `put` on a *new* key, once the cache is already at `capacity`, must
  evict the single least-recently-used entry before inserting.

## Examples

| Sequence | Result | Why |
|---|---|---|
| `cache = new LRUCache(2); cache.put(1, 'a'); cache.put(2, 'b'); cache.get(1);` | Returns `'a'`; key `1` is now the most recently used (key `2` is now the least recently used) | `get` on an existing key both returns its value and refreshes its recency |
| Continuing above: `cache.put(3, 'c');` | Evicts key `2` (least recently used, since key `1` was refreshed by the `get` right before this) | Cache was at capacity (2); key `2`, not key `1`, was the actual LRU entry at the moment of eviction |
| `cache.get(2)` (after the above eviction) | Returns `-1` | Key `2` was evicted and no longer exists in the cache |
| `cache = new LRUCache(2); cache.put(1, 'a'); cache.put(1, 'b');` | `cache.get(1)` returns `'b'` | `put` on an *existing* key updates its value and refreshes recency, without counting as inserting a new key (no eviction triggered) |

## Edge Cases

- `capacity = 1` → every new `put` (for a key different from the single
  occupant) evicts the current sole entry immediately.
- `put` called on a key that already exists → must update the value and
  refresh recency, but must **not** trigger eviction (it's not growing
  the cache's key count, just touching an existing one).
- `get` called on a key that was never inserted (or was evicted) →
  returns the "not found" sentinel, and — importantly — must **not**
  affect recency ordering of any other key (a miss is a no-op beyond
  the lookup itself).
- Repeated `get` calls on the *same* key in a row → each one keeps
  refreshing that key to most-recently-used; it never becomes eligible
  for eviction as long as it keeps being accessed more recently than
  other keys.
- `capacity` larger than the number of keys ever inserted → no eviction
  ever occurs; behaves like a plain unlimited cache.

## Hints

1. A JavaScript `Map`'s keys iterate in the exact order they were
   inserted — and re-inserting an existing key (after deleting it
   first) moves it to the *end* of that iteration order. What
   sequence of `Map` operations on `get`/`put` would use that fact to
   keep the "oldest inserted (=least recently used)" key always at the
   very front of iteration order?
2. `map.keys().next().value` gives you the *first* key in iteration
   order in O(1) — without ever scanning the whole map — which is
   exactly the least-recently-used key whenever the map is properly
   maintained so its front is always the LRU entry.
3. On every `get` (that hits) and every `put` (whether updating or
   inserting), the key involved needs to move to the "most recently
   used" end — the standard trick is `map.delete(key)` immediately
   followed by `map.set(key, value)`, which removes it from its old
   position and re-adds it at the end, refreshing its recency in two
   O(1) operations.

## Algorithm

**Pattern:** exploit `Map`'s guaranteed insertion-order iteration as an
implicit recency-ordered list, instead of hand-rolling a doubly linked
list.
**Core insight:** the classic LRU solution needs a doubly linked list
specifically so it can, in O(1), both look up any node by key (via a
companion hash map) *and* move any node to the "most recently used" end
without shifting anything else — that's exactly what a linked list's
O(1) splice gives you. A JavaScript `Map` already provides an
equivalent capability natively: deleting and re-inserting a key is
O(1) and moves it to the end of iteration order, and `.keys().next().value`
reads the front (oldest) key in O(1) without any scan. So the "front" of
a `Map`'s iteration order always represents the least-recently-used key,
as long as every `get` (on a hit) and every `put` (whether updating or
inserting) consistently deletes-then-re-inserts the touched key. This
sidesteps building a linked list entirely — the `Map`'s own internal
ordered hash table implementation *is* the linked list, for the purposes
of this problem.
**Invariant:** at all times, the `Map`'s iteration order — from first
key to last — is exactly the cache's recency order from least- to
most-recently-used; the very first key in that order is always the
correct eviction target the moment the cache exceeds `capacity`.

## Dry Run

**Input:** `capacity = 2`; calls: `put(1, 'a')`, `put(2, 'b')`,
`get(1)`, `put(3, 'c')`, `get(2)`.

| Step | Call | Map before (iteration order) | Action | Map after (iteration order) | Return |
|---|---|---|---|---|---|
| 1 | `put(1, 'a')` | `{}` | New key, under capacity — insert | `{1:'a'}` | — |
| 2 | `put(2, 'b')` | `{1:'a'}` | New key, under capacity — insert | `{1:'a', 2:'b'}` | — |
| 3 | `get(1)` | `{1:'a', 2:'b'}` | Hit — delete key `1`, re-insert it (moves to end) | `{2:'b', 1:'a'}` | `'a'` |
| 4 | `put(3, 'c')` | `{2:'b', 1:'a'}` | New key, at capacity (2 keys already) — evict front (`2`, the LRU), then insert `3` | `{1:'a', 3:'c'}` | — |
| 5 | `get(2)` | `{1:'a', 3:'c'}` | Key `2` no longer exists (evicted in step 4) | `{1:'a', 3:'c'}` (unchanged) | `-1` |

**Result:** key `2` — the least recently used at the moment `put(3,
'c')` needed to evict something — is correctly the one removed, not
key `1` (which had just been refreshed by the `get` in step 3).

## JavaScript Solution

```js
class LRUCache {
  #capacity;
  #map; // Map's own insertion order IS the recency order (oldest first)

  constructor(capacity) {
    this.#capacity = capacity;
    this.#map = new Map();
  }

  get(key) {
    if (!this.#map.has(key)) {
      return -1; // not found — no effect on recency ordering
    }

    const value = this.#map.get(key);

    // Refresh recency: remove and re-insert so this key moves to the
    // "most recently used" (last) position in iteration order.
    this.#map.delete(key);
    this.#map.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.#map.has(key)) {
      // Updating an existing key doesn't grow the cache — just refresh
      // its value and recency, no eviction needed.
      this.#map.delete(key);
    } else if (this.#map.size >= this.#capacity) {
      // Inserting a NEW key at capacity — evict the least recently
      // used entry, which is always the first key in iteration order.
      const lruKey = this.#map.keys().next().value;
      this.#map.delete(lruKey);
    }

    this.#map.set(key, value); // inserts at the "most recently used" end
  }
}
```

## TypeScript Solution

```ts
class LRUCache<K, V> {
  #capacity: number;
  #map: Map<K, V>;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#map = new Map<K, V>();
  }

  get(key: K): V | -1 {
    if (!this.#map.has(key)) {
      return -1;
    }

    const value = this.#map.get(key) as V;

    this.#map.delete(key);
    this.#map.set(key, value);

    return value;
  }

  put(key: K, value: V): void {
    if (this.#map.has(key)) {
      this.#map.delete(key);
    } else if (this.#map.size >= this.#capacity) {
      const lruKey = this.#map.keys().next().value as K;
      this.#map.delete(lruKey);
    }

    this.#map.set(key, value);
  }
}
```

## Time Complexity

O(1) average for both `get` and `put` — `Map#has`/`#get`/`#set`/
`#delete` are all O(1) average (hash-table backed), and
`.keys().next().value` reads the front of iteration order in O(1)
without scanning, since JS engines maintain `Map` iteration order via
an internal linked structure already.

## Space Complexity

O(capacity) — the `Map` never holds more than `capacity` entries at
once, by construction (every insertion past capacity is preceded by
exactly one eviction).

## Common Mistakes

- Using a plain `Object` instead of a `Map` — plain objects don't
  guarantee insertion-order iteration the way `Map` explicitly does in
  the spec (and historically had inconsistent key-ordering quirks,
  especially with numeric-looking keys), so the "front = LRU" trick
  isn't reliably safe to build on top of an object.
- Forgetting to delete-and-re-insert on a `get` **hit** — without
  refreshing recency on reads, the cache degrades into a plain FIFO
  cache (evicting by insertion order, not by actual usage), which
  silently fails the core LRU requirement despite looking correct for
  write-only workloads.
- Evicting on every `put`, even when updating an existing key — this
  incorrectly shrinks the *effective* capacity, since updates don't
  actually add a new entry and shouldn't trigger eviction at all.
- Using `[...map.keys()][0]` to find the LRU key — this materializes
  the *entire* key list into an array just to read the first element,
  turning an O(1) operation into O(n); `map.keys().next().value` gets
  the same answer without the wasted allocation/scan.
- Treating a `get` **miss** as something that should still mutate the
  map (e.g. inserting a placeholder, or accidentally calling
  `delete`/`set` on a key that was never actually present) — a miss
  must be a pure no-op besides returning the sentinel.

## Interview Follow-up Questions

1. Why does the classic (language-agnostic) LRU solution use a hand-
   rolled doubly linked list + hash map instead of relying on a
   `Map`-like structure — is this JS-`Map` trick actually available in
   every language, or is it JS-specific?
2. How would you implement an LFU (Least Frequently Used) cache
   instead — what has to change structurally, given that frequency,
   not recency, now drives eviction?
3. How would you make this cache thread-safe / concurrency-safe if it
   needed to be shared across multiple async operations that could
   interleave (a relevant question even in JS, given `await` points can
   interleave logically-concurrent operations)?
4. How would you add a TTL (time-to-live) on top of the LRU eviction —
   an entry that's still "recently used" but has expired should also be
   evicted?
5. What's the actual internal time complexity of `Map`'s operations in
   V8 — is "O(1) average" doing any hand-waving here, and what would
   make it degrade?

## Similar Questions

- Implement an LFU Cache
- Implement a fixed-size FIFO cache (no recency tracking, simplest
  eviction policy)
- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md) — unrelated
  domain, but a similar "what does the right underlying data structure
  buy you" interview angle
- Design an in-memory key-value store with expiration (a natural
  system-design-adjacent follow-up)

---
[← Back to 61-javascript-coding](README.md)
