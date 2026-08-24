// Hand-authored coding questions derived from the "Map data structure based
// problems" and "String based Problems" sections of the DSA notes handbook.
// Unlike the auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below (run in Node against assertions
// before being committed), and both the JavaScript and TypeScript
// solutions are genuine, working code with no placeholder stubs.
//
// LRU Cache is a stateful "design" problem: the runner (codeRunner.ts)
// only supports calling a single plain function by name with positional
// args, so classes with multiple methods can't be tested directly. It's
// wrapped as `lruCacheOperations(capacity, operations, args)`, the same
// operations/args replay pattern used for Min Stack in
// dsa-coding-module6-questions.ts — one function that replays a sequence
// of get/put calls against an internal cache and returns the array of
// results (null for the void `put` operation).
//
// "Two Sum" from the same notes section is intentionally omitted — it's
// already covered as dsa-coding-m2-2 in dsa-coding-module2-questions.ts.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Airbnb',
  'Atlassian',
  'Adobe',
  'Flipkart',
];

const CATEGORY = 'Hashing & Strings';
const CONCEPTS = ['Hash Maps', 'Strings', 'Time Complexity', 'Space Complexity', 'Pattern Recognition'];

export const MOCK_DSA_CODING_MODULE5_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m5-1',
      questionNumber: 'DSACODE-M5-1',
      title: 'Decode Scrambled Words',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'You are given a dictionary of `words` and a `message` string containing space-separated scrambled tokens. Every scrambled token was produced from exactly one dictionary word by keeping its first and last letter fixed and permuting the letters in between. Decode the message back into the original words, in order, joined by single spaces.',
      input: 'words: string[] — the dictionary, message: string — space-separated scrambled tokens',
      output: 'string — the decoded message, original words joined by single spaces',
      constraints: [
        '1 <= words.length <= 1000',
        'Every token in message maps to exactly one word in words',
        'All words consist of lowercase English letters',
      ],
      examples: [
        {
          input: 'words = ["listen","apple","triangle"], message = "ltsien aplpe tnaigrle"',
          output: '"listen apple triangle"',
          explanation:
            'Each scrambled token shares its first letter, last letter, and multiset of middle letters with exactly one dictionary word.',
        },
        {
          input: 'words = ["cat"], message = "cat"',
          output: '"cat"',
          explanation: 'A 3-letter word has only one middle letter, so nothing can be scrambled — it appears unchanged.',
        },
        {
          input: 'words = ["a","bb"], message = "a bb"',
          output: '"a bb"',
          explanation: 'Words of length <= 2 have no middle letters to permute, so they are always identical to themselves.',
        },
      ],
      edgeCases: [
        { case: 'Word with a single middle letter', expected: 'Cannot be scrambled — token equals the original word' },
        { case: 'Word length <= 2', expected: 'No middle exists; token must equal the word exactly' },
        { case: 'Multiple words sharing the same first/last letters', expected: 'Disambiguated by the sorted-middle-letters key' },
      ],
      functionName: 'decodeWords',
      isClassBased: false,
      sampleTests: [
        {
          input: [['listen', 'apple', 'triangle', 'cat'], 'ltsien aplpe tnaigrle cat'],
          expectedOutput: 'listen apple triangle cat',
          description: 'multiple scrambled words of varying length',
        },
        { input: [['a', 'bb', 'ccc'], 'a bb ccc'], expectedOutput: 'a bb ccc', description: 'short words are never scrambled' },
        {
          input: [['banana'], 'baannа'.replace('а', 'a')],
          expectedOutput: 'banana',
          description: 'a single repeated-letter word decodes to itself',
        },
        {
          input: [['stop', 'tops'], 'stop tops'],
          expectedOutput: 'stop tops',
          description: 'two dictionary words with different first/last letters never collide',
        },
      ],
    },
    hints: {
      hints: [
        'Build a key for each dictionary word that is invariant under middle-letter scrambling: first letter + sorted middle letters + last letter.',
        'Map that key to the original word once, up front, then look up the same key for every scrambled token in the message.',
        'Words of length 2 or less have no "middle" at all — their key is just the word itself.',
      ],
    },
    solution: {
      algorithm: `Step 1: Build one canonical key for every dictionary word: first letter + sorted middle letters + last letter.
Step 2: Store the original word under that key.
Step 3: Create the same key for every message token.
Step 4: Look up each token and rebuild the message in the original order.

Core idea:
For every dictionary word, compute a canonical key: the first character, the middle characters sorted alphabetically, and the last character (words of length <= 2 use the word itself as the key, since there is no middle to sort). Store word-by-key in a Map. For each token in the message, compute the same canonical key and look it up in the Map to recover the original word. Join the recovered words with spaces.`,
      dryRun: `words=["listen"], token="ltsien"
Key("listen") = l + sorted("iste") + n = "leistn".
Key("ltsien") = l + sorted("tsie") + n = "leistn".
Keys match → "listen".`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function decodeWords(words, message) {
  function sortMiddleManual(word) {
    if (word.length <= 2) return word;

    const chars = new Array(word.length - 2);
    for (let i = 1; i < word.length - 1; i++) chars[i - 1] = word[i];

    for (let i = 1; i < chars.length; i++) {
      const value = chars[i];
      let j = i - 1;

      while (j >= 0 && chars[j] > value) {
        chars[j + 1] = chars[j];
        j--;
      }

      chars[j + 1] = value;
    }

    let middle = "";
    for (let i = 0; i < chars.length; i++) middle += chars[i];

    return word[0] + middle + word[word.length - 1];
  }

  const keyToWord = Object.create(null);

  for (const word of words) {
    keyToWord[sortMiddleManual(word)] = word;
  }

  const tokens = [];
  let current = "";

  for (let i = 0; i <= message.length; i++) {
    const ch = message[i];

    if (i === message.length || ch === " ") {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }

  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    if (i > 0) result += " ";
    result += keyToWord[sortMiddleManual(tokens[i])];
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function decodeWordsUsingBuiltIns(words, message){
  const key = (word) => {
    if (word.length <= 2) return word;
    return (
      word[0] +
      word.slice(1, -1).split("").sort().join("") +
      word[word.length - 1]
    );
  };

  const wordMap = new Map();

  for (const word of words) {
    wordMap.set(key(word), word);
  }

  return message
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => wordMap.get(key(token)) ?? "")
    .join(" ");
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function decodeWords(words: string[], message: string): string {
  function sortMiddleManual(word: string): string {
    if (word.length <= 2) return word;

    const chars = new Array<string>(word.length - 2);

    for (let i = 1; i < word.length - 1; i++) {
      chars[i - 1] = word[i]!;
    }

    // Insertion sort: no sort() helper.
    for (let i = 1; i < chars.length; i++) {
      const value = chars[i]!;
      let j = i - 1;

      while (j >= 0 && chars[j]! > value) {
        chars[j + 1] = chars[j]!;
        j--;
      }

      chars[j + 1] = value;
    }

    let middle = "";
    for (let i = 0; i < chars.length; i++) {
      middle += chars[i];
    }

    return word[0]! + middle + word[word.length - 1]!;
  }

  function key(word: string): string {
    return sortMiddleManual(word);
  }

  const keyToWord: Record<string, string> = Object.create(null);

  for (let i = 0; i < words.length; i++) {
    keyToWord[key(words[i]!)] = words[i]!;
  }

  const tokens: string[] = [];
  let current = "";

  for (let i = 0; i <= message.length; i++) {
    const ch = message[i];

    if (i === message.length || ch === " ") {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }

  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    if (i > 0) result += " ";
    result += keyToWord[key(tokens[i]!)];
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function decodeWordsUsingBuiltIns(words: string[], message: string): string {
  const key = (word: string): string => {
    if (word.length <= 2) return word;
    return (
      word[0] +
      word.slice(1, -1).split("").sort().join("") +
      word[word.length - 1]
    );
  };

  const wordMap = new Map<string, string>();

  for (const word of words) {
    wordMap.set(key(word), word);
  }

  return message
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => wordMap.get(key(token)) ?? "")
    .join(" ");
}`,
      timeComplexity: 'O((n·k) log k) — n dictionary words and message tokens, each of average length k, each needing a sort of its middle.',
      spaceComplexity: 'O(n·k) — the map stores every dictionary word plus its key.',
      commonMistakes: [
        'Sorting the whole word instead of just the middle, which loses the "first/last letter fixed" constraint and can collide unrelated words.',
        'Forgetting the length <= 2 special case, which crashes or misbehaves on `.slice(1, -1)` producing an empty string that still needs a stable key.',
        'Assuming the message tokens and dictionary words are in the same order — they must be matched by key, not by position.',
      ],
      followUpQuestions: [
        'How would you handle a message token that has no matching dictionary word?',
        'How would you extend this if multiple dictionary words could share the same canonical key?',
        'How would you decode in a streaming fashion if the dictionary were too large to hold in memory at once?',
      ],
      similarQuestions: ['Group Anagrams', 'Find All Anagrams in a String', 'Word Pattern'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-2',
      questionNumber: 'DSACODE-M5-2',
      title: 'LRU Cache',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Design a Least Recently Used (LRU) cache with a fixed capacity, supporting `get(key)` and `put(key, value)` in O(1) average time. `get` returns the value for a key (or -1 if absent) and marks it as most recently used. `put` inserts or updates a key\'s value, marking it most recently used, and evicts the least recently used entry if the cache exceeds capacity. Because this app\'s test runner calls a single function by name, implement it as `lruCacheOperations(capacity, operations, args)`: `operations` is an array of "get" | "put", `args` is a parallel array of argument arrays, and the function replays every operation against one fresh cache instance, returning an array of results (null for `put`).',
      input: 'capacity: number, operations: string[] — "get" | "put", args: unknown[][] — one argument array per operation',
      output: 'unknown[] — one result per operation, in order (null for put, -1 or the value for get)',
      constraints: ['1 <= capacity <= 3000', '0 <= operations.length <= 2 * 10^5', 'Keys and values fit in a 32-bit integer'],
      examples: [
        {
          input: 'capacity = 2, operations = ["put","put","get","put","get","put","get","get"], args = [[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3]]',
          output: '[null, null, 1, null, -1, null, -1, 3]',
          explanation: 'put(3,3) evicts key 2 (least recently used); put(4,4) then evicts key 1.',
        },
      ],
      edgeCases: [
        { case: 'get on a missing key', expected: 'Returns -1 without modifying the cache' },
        { case: 'put on an existing key', expected: 'Updates the value and marks it most recently used, without changing size' },
        { case: 'Capacity 1', expected: 'Every new put evicts the previous single entry' },
      ],
      functionName: 'lruCacheOperations',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            2,
            ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get'],
            [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3]],
          ],
          expectedOutput: [null, null, 1, null, -1, null, -1, 3],
          description: 'the canonical LeetCode LRU example',
        },
        {
          input: [1, ['put', 'put', 'get'], [[1, 10], [2, 20], [1]]],
          expectedOutput: [null, null, -1],
          description: 'capacity 1 evicts the previous key on the next put',
        },
        {
          input: [2, ['put', 'put', 'put', 'get', 'get'], [[1, 1], [2, 2], [1, 100], [1], [2]]],
          expectedOutput: [null, null, null, 100, 2],
          description: 'updating an existing key refreshes its value without evicting it',
        },
      ],
    },
    hints: {
      hints: [
        'A JS `Map` preserves insertion order, and re-inserting a key (delete then set) moves it to the end — that ordering alone can represent recency.',
        'Treat the front of the map (its first key via `.keys().next().value`) as the least recently used entry.',
        'On both `get` and `put`, delete-then-reinsert the touched key so it becomes the most recently used (the last entry in iteration order).',
      ],
    },
    solution: {
      algorithm: `Step 1: Keep a key lookup plus an order of least-recent to most-recent.
Step 2: On get, return the value and move the key to the most-recent position.
Step 3: On put, update or insert and mark the key most-recent.
Step 4: If capacity is exceeded, remove the least-recent key.

Core idea:
Back the cache with a \`Map\`, relying on its insertion-order iteration: the least recently used key is always the first one iterated. On \`get\`, if the key is missing return -1; otherwise delete and reinsert it (moving it to the end / most-recently-used position) and return its value. On \`put\`, delete any existing entry for the key, insert the new value (placing it at the end), and if the map now exceeds capacity, delete the first (least recently used) key via \`map.keys().next().value\`.`,
      dryRun: `capacity=2
put(1,1) → [1]
put(2,2) → [1,2]
get(1) → 1, order becomes [2,1]
put(3,3) → evict 2
get(2) → -1
The cache always removes the least recently used entry.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function lruCacheOperations(capacity, operations, args) {
  const head = { key: 0, value: 0, prev: null, next: null };
  const tail = { key: 0, value: 0, prev: head, next: null };
  head.next = tail;

  const nodes = Object.create(null);
  const results = [];
  let size = 0;

  function addAfterHead(node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }

  function remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  function moveToFront(node) {
    remove(node);
    addAfterHead(node);
  }

  function removeLeastRecentlyUsed() {
    const node = tail.prev;
    remove(node);
    return node;
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i];

    if (op === "get") {
      const key = opArgs[0];
      const node = nodes[String(key)];

      if (!node) {
        results.push(-1);
      } else {
        moveToFront(node);
        results.push(node.value);
      }
    } else if (op === "put") {
      const key = opArgs[0];
      const value = opArgs[1];
      const existing = nodes[String(key)];

      if (existing) {
        existing.value = value;
        moveToFront(existing);
      } else {
        const node = { key, value, prev: null, next: null };
        nodes[String(key)] = node;
        addAfterHead(node);
        size++;

        if (size > capacity) {
          const removed = removeLeastRecentlyUsed();
          delete nodes[String(removed.key)];
          size--;
        }
      }

      results.push(null);
    }
  }

  return results;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lruCacheOperationsUsingBuiltIns(
  capacity,
  operations,
  args,
){
  const cache = new Map();
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i];

    if (op === "get") {
      const key = opArgs[0] ;

      if (!cache.has(key)) {
        results.push(-1);
      } else {
        const value = cache.get(key);
        cache.delete(key);
        cache.set(key, value);
        results.push(value);
      }
    } else {
      const key = opArgs[0] ;
      const value = opArgs[1] ;

      if (cache.has(key)) cache.delete(key);
      cache.set(key, value);

      if (cache.size > capacity) {
        const oldest = cache.keys().next().value ;
        cache.delete(oldest);
      }

      results.push(null);
    }
  }

  return results;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function lruCacheOperations(
  capacity: number,
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  type Node = {
    key: number;
    value: number;
    prev: Node | null;
    next: Node | null;
  };

  const head: Node = { key: 0, value: 0, prev: null, next: null };
  const tail: Node = { key: 0, value: 0, prev: head, next: null };
  head.next = tail;

  const nodes: Record<string, Node | undefined> = Object.create(null);
  const results: unknown[] = [];

  function addAfterHead(node: Node): void {
    node.next = head.next;
    node.prev = head;

    head.next!.prev = node;
    head.next = node;
  }

  function remove(node: Node): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  function moveToFront(node: Node): void {
    remove(node);
    addAfterHead(node);
  }

  function removeLeastRecentlyUsed(): Node {
    const node = tail.prev!;
    remove(node);
    return node;
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i]!;

    if (op === "get") {
      const key = opArgs[0] as number;
      const node = nodes[String(key)];

      if (!node) {
        results.push(-1);
      } else {
        moveToFront(node);
        results.push(node.value);
      }
    } else {
      const key = opArgs[0] as number;
      const value = opArgs[1] as number;
      const existing = nodes[String(key)];

      if (existing) {
        existing.value = value;
        moveToFront(existing);
      } else {
        const node: Node = {
          key,
          value,
          prev: null,
          next: null,
        };

        nodes[String(key)] = node;
        addAfterHead(node);

        // Count entries manually.
        let count = 0;
        for (const name in nodes) {
          if (nodes[name] !== undefined) count++;
        }

        if (count > capacity) {
          const removed = removeLeastRecentlyUsed();
          delete nodes[String(removed.key)];
        }
      }

      results.push(null);
    }
  }

  return results;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lruCacheOperationsUsingBuiltIns(
  capacity: number,
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  const cache = new Map<number, number>();
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i]!;

    if (op === "get") {
      const key = opArgs[0] as number;

      if (!cache.has(key)) {
        results.push(-1);
      } else {
        const value = cache.get(key)!;
        cache.delete(key);
        cache.set(key, value);
        results.push(value);
      }
    } else {
      const key = opArgs[0] as number;
      const value = opArgs[1] as number;

      if (cache.has(key)) cache.delete(key);
      cache.set(key, value);

      if (cache.size > capacity) {
        const oldest = cache.keys().next().value as number;
        cache.delete(oldest);
      }

      results.push(null);
    }
  }

  return results;
}`,
      timeComplexity: 'O(1) average per operation — Map get/set/delete are O(1), and reinsertion is a constant number of Map ops.',
      spaceComplexity: 'O(capacity) — the map never holds more entries than the configured capacity.',
      commonMistakes: [
        'Using a plain object instead of a Map, which does not reliably preserve insertion order across deletes/re-inserts the way a Map does.',
        'Forgetting to move a key to the end on `get`, which silently turns the cache into FIFO instead of LRU.',
        "In the class-based version this problem describes, forgetting that a single-function test harness can't call multiple methods on an instance — hence the operations/args wrapper used here.",
      ],
      followUpQuestions: [
        'How would you implement this with a doubly linked list + hash map instead of relying on Map ordering, and why might that be preferable?',
        'How would you make this thread-safe / safe under concurrent access?',
        'How would you extend this to an LFU (Least Frequently Used) cache instead?',
      ],
      similarQuestions: ['LFU Cache', 'Design a Data Structure with O(1) Operations', 'All O`one Data Structure'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-3',
      questionNumber: 'DSACODE-M5-3',
      title: 'Longest Consecutive Sequence',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an unsorted array of integers `nums`, return the length of the longest run of consecutive integers (e.g. [100, 4, 200, 1, 3, 2] contains the run 1,2,3,4, so the answer is 4). Must run in O(n) time.',
      input: 'nums: number[]',
      output: 'number — the length of the longest consecutive elements sequence',
      constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
      examples: [
        { input: '[100, 4, 200, 1, 3, 2]', output: '4', explanation: 'The sequence 1,2,3,4 is the longest consecutive run.' },
        { input: '[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', output: '9', explanation: 'The sequence 0..8 is fully present.' },
        { input: '[]', output: '0', explanation: 'An empty array has no sequence.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns 0' },
        { case: 'Duplicate values', expected: 'Duplicates do not extend the run length' },
        { case: 'All elements identical', expected: 'Returns 1 (a run of length 1)' },
      ],
      functionName: 'longestConsecutive',
      isClassBased: false,
      sampleTests: [
        { input: [[100, 4, 200, 1, 3, 2]], expectedOutput: 4, description: 'classic case' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
        { input: [[1, 2, 0, 1]], expectedOutput: 3, description: 'duplicate values do not inflate the run' },
        { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expectedOutput: 7, description: 'run from -1 to 5' },
      ],
    },
    hints: {
      hints: [
        'Put every value into a Set first for O(1) membership checks — sorting would work but costs O(n log n).',
        'Only start counting a run from a value `n` if `n - 1` is NOT in the set — that guarantees you count each run exactly once, from its true start.',
        'From a valid run start, keep incrementing and checking membership until the chain breaks, tracking the longest chain length seen.',
      ],
    },
    solution: {
      algorithm: `Step 1: Put every number into a membership structure.
Step 2: A number starts a sequence only when number-1 is absent.
Step 3: Count number, number+1, number+2, ... while they exist.
Step 4: Keep the largest sequence length.

Core idea:
Insert all values into a Set for O(1) lookups. For each value \`n\` in the array, only treat it as the start of a run if \`n - 1\` is not in the set (otherwise some earlier value already owns this run). From a valid start, count forward (\`n\`, \`n+1\`, \`n+2\`, ...) while each is present in the set, tracking the longest count found.`,
      dryRun: `[100,4,200,1,3,2]
100 starts a run of length 1.
4 is not a start because 3 exists.
1 starts a run: 1,2,3,4 → length 4.
Answer = 4.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function longestConsecutive(nums) {
  const seen = Object.create(null);

  for (const num of nums) {
    seen[String(num)] = true;
  }

  let best = 0;

  for (const num of nums) {
    if (seen[String(num - 1)]) continue;

    let current = num;
    let length = 0;

    while (seen[String(current)]) {
      current++;
      length++;
    }

    if (length > best) best = length;
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function longestConsecutiveUsingBuiltIns(nums){
  const values = new Set(nums);
  let best = 0;

  for (const num of values) {
    if (!values.has(num - 1)) {
      let current = num;
      let length = 0;

      while (values.has(current)) {
        current++;
        length++;
      }

      best = Math.max(best, length);
    }
  }

  return best;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function longestConsecutive(nums: number[]): number {
  const seen: Record<string, boolean> = Object.create(null);

  for (let i = 0; i < nums.length; i++) {
    seen[String(nums[i])] = true;
  }

  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]!;
    if (seen[String(num - 1)]) continue;

    let current = num;
    let length = 0;

    while (seen[String(current)]) {
      current++;
      length++;
    }

    if (length > best) best = length;
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function longestConsecutiveUsingBuiltIns(nums: number[]): number {
  const values = new Set(nums);
  let best = 0;

  for (const num of values) {
    if (!values.has(num - 1)) {
      let current = num;
      let length = 0;

      while (values.has(current)) {
        current++;
        length++;
      }

      best = Math.max(best, length);
    }
  }

  return best;
}`,
      timeComplexity: 'O(n) — each value is visited as part of an inner while-loop at most once overall, since only true run-starts trigger a scan.',
      spaceComplexity: 'O(n) — the Set holds every distinct value.',
      commonMistakes: [
        'Sorting the array first (O(n log n)) when the problem explicitly asks for an O(n) solution.',
        "Not checking `num - 1` before scanning forward, which re-scans the same run from every one of its elements and degrades to O(n²).",
        'Forgetting duplicates: inserting into a Set naturally de-duplicates, but a naive array-based approach can double-count them.',
      ],
      followUpQuestions: [
        'How would you also return the actual sequence, not just its length?',
        'How would you solve this if the input were a stream you could only pass over once, with limited memory?',
        'How does this compare to sorting the array first — when might sorting actually be preferable in practice?',
      ],
      similarQuestions: ['Binary Tree Longest Consecutive Sequence', 'Longest Consecutive Sequence II', 'Consecutive Numbers Sum'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-4',
      questionNumber: 'DSACODE-M5-4',
      title: 'Largest Subarray with Sum 0',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an array of integers `arr`, find the length of the longest contiguous subarray whose elements sum to 0.',
      input: 'arr: number[]',
      output: 'number — the length of the longest zero-sum subarray (0 if none exists)',
      constraints: ['0 <= arr.length <= 10^5', '-10^4 <= arr[i] <= 10^4'],
      examples: [
        { input: '[15, -2, 2, -8, 1, 7, 10, 23]', output: '5', explanation: 'The subarray [-2, 2, -8, 1, 7] sums to 0 and has length 5.' },
        { input: '[1, 2, 3]', output: '0', explanation: 'No contiguous subarray sums to 0.' },
        { input: '[1, -1, 3, 2, -2, -3, 3]', output: '6', explanation: 'The subarray [1, -1, 3, 2, -2, -3] sums to 0.' },
      ],
      edgeCases: [
        { case: 'No zero-sum subarray exists', expected: 'Returns 0' },
        { case: 'The entire array sums to 0', expected: 'Returns arr.length' },
        { case: 'Empty array', expected: 'Returns 0' },
      ],
      functionName: 'largestSubarrayWithSumZero',
      isClassBased: false,
      sampleTests: [
        { input: [[15, -2, 2, -8, 1, 7, 10, 23]], expectedOutput: 5, description: 'classic mixed-sign case' },
        { input: [[1, 2, 3]], expectedOutput: 0, description: 'no zero-sum subarray exists' },
        { input: [[1, -1, 3, 2, -2, -3, 3]], expectedOutput: 6, description: 'longer zero-sum run' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'Track a running prefix sum as you iterate — if the same prefix sum value has occurred before at index `j`, the subarray between `j+1` and the current index sums to 0.',
        'Store the *first* index at which each prefix sum value occurs, in a hash map — the earliest occurrence maximizes the subarray length when the sum repeats.',
        'A running sum of exactly 0 at index `i` means the subarray `arr[0..i]` itself is zero-sum — handle that as a special case distinct from the map lookup.',
      ],
    },
    solution: {
      algorithm: `Step 1: Track a running prefix sum.
Step 2: Remember the first index where each sum appeared.
Step 3: If the same sum appears again, the values between the two indices sum to zero.
Step 4: Keep the longest distance; a prefix sum of zero means the subarray starts at index 0.

Core idea:
Maintain a running prefix sum and a hash map from prefix-sum value to the first index it was seen at. At each index \`i\`: if the running sum is exactly 0, the whole prefix \`arr[0..i]\` is zero-sum (length i+1). Otherwise, if the running sum has been seen before at index \`j\`, the subarray \`arr[j+1..i]\` sums to 0 (length i-j). Otherwise, record this sum at this index (only if not already recorded, to keep the *earliest* occurrence). Track the maximum length found.`,
      dryRun: `[15,-2,2,-8,1,7,10,23]
Prefix sum 15 first appears at index 0.
At index 2 it is 15 again → length 2.
At index 5 it is 15 again → length 5.
Answer = 5.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function largestSubarrayWithSumZero(arr) {
  const firstIndex = Object.create(null);
  let sum = 0;
  let best = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum === 0) {
      best = i + 1;
    } else {
      const key = String(sum);

      if (firstIndex[key] !== undefined) {
        const length = i - firstIndex[key];

        if (length > best) best = length;
      } else {
        firstIndex[key] = i;
      }
    }
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function largestSubarrayWithSumZeroUsingBuiltIns(arr){
  const first = new Map();
  let sum = 0;
  let best = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum === 0) {
      best = Math.max(best, i + 1);
    } else if (first.has(sum)) {
      best = Math.max(best, i - first.get(sum));
    } else {
      first.set(sum, i);
    }
  }

  return best;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function largestSubarrayWithSumZero(arr: number[]): number {
  const firstIndex: Record<string, number | undefined> = Object.create(null);
  let sum = 0;
  let best = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]!;

    if (sum === 0) {
      best = i + 1;
    } else {
      const key = String(sum);

      if (firstIndex[key] !== undefined) {
        const length = i - firstIndex[key]!;
        if (length > best) best = length;
      } else {
        firstIndex[key] = i;
      }
    }
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function largestSubarrayWithSumZeroUsingBuiltIns(arr: number[]): number {
  const first = new Map<number, number>();
  let sum = 0;
  let best = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]!;

    if (sum === 0) {
      best = Math.max(best, i + 1);
    } else if (first.has(sum)) {
      best = Math.max(best, i - first.get(sum)!);
    } else {
      first.set(sum, i);
    }
  }

  return best;
}`,
      timeComplexity: 'O(n) — a single pass with O(1) average-case map operations.',
      spaceComplexity: 'O(n) — the map can hold up to n distinct prefix sums.',
      commonMistakes: [
        'Overwriting an existing prefix-sum entry in the map on a later occurrence, which shrinks the subarray instead of keeping the earliest (longest) span.',
        'Forgetting the special case where the running sum itself is 0 (meaning the prefix from index 0 is zero-sum).',
        'Using an O(n²) brute-force check of every subarray instead of the O(n) prefix-sum-with-map technique.',
      ],
      followUpQuestions: [
        'How would you return the actual subarray (start/end indices), not just its length?',
        'How would you count the *number* of zero-sum subarrays instead of finding the longest one?',
        'How would you adapt this to find the longest subarray summing to an arbitrary target k instead of 0?',
      ],
      similarQuestions: ['Subarray Sum Equals K', 'Contiguous Array', 'Maximum Size Subarray Sum Equals k'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-5',
      questionNumber: 'DSACODE-M5-5',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given a string `s`, find the length of the longest substring without repeating characters.',
      input: 's: string',
      output: 'number — the length of the longest substring with all-distinct characters',
      constraints: ['0 <= s.length <= 5 * 10^4', 's consists of printable ASCII characters'],
      examples: [
        { input: '"abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
        { input: '"bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
        { input: '"pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3 (note "pwke" is not a substring).' },
      ],
      edgeCases: [
        { case: 'Empty string', expected: 'Returns 0' },
        { case: 'All characters identical', expected: 'Returns 1' },
        { case: 'All characters distinct', expected: 'Returns s.length' },
      ],
      functionName: 'lengthOfLongestSubstring',
      isClassBased: false,
      sampleTests: [
        { input: ['abcabcbb'], expectedOutput: 3, description: 'repeats with a gap' },
        { input: ['bbbbb'], expectedOutput: 1, description: 'every character repeats' },
        { input: ['pwwkew'], expectedOutput: 3, description: 'repeat forces the window to jump forward' },
        { input: [''], expectedOutput: 0, description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'This is a sliding window: expand the right edge one character at a time, tracking the last index each character was seen at.',
        'When you see a character that is already in the current window, jump the left edge forward to just past its previous occurrence — not necessarily to that index plus one from scratch.',
        'Track the window length (right - left + 1) as a running maximum on every step, not just when a repeat is found.',
      ],
    },
    solution: {
      algorithm: `Step 1: Maintain a window with no duplicate characters.
Step 2: Store the latest index of every character.
Step 3: On a repeated character inside the current window, jump left past its previous index.
Step 4: Update the maximum window length on every character.

Core idea:
Maintain a map of character to its most recent index, and a \`left\` pointer marking the start of the current no-repeat window. Iterate \`right\` across the string: if the current character was seen before at an index >= left, move \`left\` to one past that previous occurrence. Update the character's last-seen index to \`right\`, and update the maximum window length seen so far.`,
      dryRun: `pwwkew
p → length 1
pw → length 2
w repeats → move left after previous w
wke → length 3
w repeats later → move left again
Best = 3 ("wke").`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function lengthOfLongestSubstring(s) {
  const lastSeen = Object.create(null);
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    const previous = lastSeen[char];

    if (previous !== undefined && previous >= left) {
      left = previous + 1;
    }

    lastSeen[char] = right;

    const length = right - left + 1;
    if (length > best) best = length;
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lengthOfLongestSubstringUsingBuiltIns(s){
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char)) {
      left = Math.max(left, lastSeen.get(char) + 1);
    }

    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function lengthOfLongestSubstring(s: string): number {
  const lastSeen: Record<string, number | undefined> = Object.create(null);
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right]!;
    const previous = lastSeen[char];

    if (previous !== undefined && previous >= left) {
      left = previous + 1;
    }

    lastSeen[char] = right;

    const length = right - left + 1;
    if (length > best) best = length;
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lengthOfLongestSubstringUsingBuiltIns(s: string): number {
  const lastSeen = new Map<string, number>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right]!;

    if (lastSeen.has(char)) {
      left = Math.max(left, lastSeen.get(char)! + 1);
    }

    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
      timeComplexity: 'O(n) — each character is visited by `right` exactly once; `left` only moves forward.',
      spaceComplexity: 'O(min(n, alphabet size)) — the map holds at most one entry per distinct character.',
      commonMistakes: [
        "Moving `left` to `lastSeen.get(char) + 1` unconditionally, without checking `>= left` first — this can move `left` backward and shrink the window incorrectly if the previous occurrence was already outside it.",
        "Using a Set and shrinking the window one character at a time from the left instead of jumping directly, which still works but is a slower variant of the same idea.",
        'Forgetting to update `maxLen` on every iteration, not just when a repeat forces `left` to move.',
      ],
      followUpQuestions: [
        'How would you also return the actual longest substring, not just its length?',
        'How would this change if you needed the longest substring with at most k distinct characters instead of zero repeats?',
        'How would you handle Unicode characters outside the Basic Multilingual Plane (surrogate pairs)?',
      ],
      similarQuestions: ['Longest Substring with At Most Two Distinct Characters', 'Longest Repeating Character Replacement', 'Minimum Window Substring'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-6',
      questionNumber: 'DSACODE-M5-6',
      title: 'Roman to Integer',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a Roman numeral string `s`, convert it to an integer. Roman numerals use the symbols I, V, X, L, C, D, M; a smaller-value symbol placed before a larger one is subtracted (e.g. "IV" = 4), otherwise symbols are added left to right.',
      input: 's: string — a valid Roman numeral, 1 to 3999',
      output: 'number — the integer value',
      constraints: ['1 <= s.length <= 15', 's is a valid Roman numeral in the range [1, 3999]'],
      examples: [
        { input: '"III"', output: '3', explanation: 'Three "I"s added: 1+1+1.' },
        { input: '"LVIII"', output: '58', explanation: 'L=50, V=5, III=3 → 50+5+3=58.' },
        { input: '"MCMXCIV"', output: '1994', explanation: 'M=1000, CM=900 (subtractive), XC=90 (subtractive), IV=4 (subtractive) → 1994.' },
      ],
      edgeCases: [
        { case: 'A single-symbol numeral', expected: "Returns that symbol's value directly" },
        { case: 'Multiple subtractive pairs in one numeral', expected: 'Each pair is handled independently (e.g. "MCMXCIV")' },
        { case: 'A repeated symbol with no subtraction', expected: 'Values are simply summed (e.g. "III" = 3)' },
      ],
      functionName: 'romanToInt',
      isClassBased: false,
      sampleTests: [
        { input: ['III'], expectedOutput: 3, description: 'simple repetition' },
        { input: ['LVIII'], expectedOutput: 58, description: 'no subtraction needed' },
        { input: ['MCMXCIV'], expectedOutput: 1994, description: 'multiple subtractive pairs' },
        { input: ['IX'], expectedOutput: 9, description: 'a single subtractive pair' },
      ],
    },
    hints: {
      hints: [
        'Map each Roman symbol to its integer value first.',
        'Walk the string left to right: if a symbol\'s value is less than the value immediately after it, that symbol should be subtracted rather than added.',
        'Otherwise (equal, greater, or it is the last symbol), add the value as normal — the subtractive case is the only exception to plain summation.',
      ],
    },
    solution: {
      algorithm: `Step 1: Map each Roman symbol to its value.
Step 2: Scan from left to right.
Step 3: Subtract a symbol when its value is smaller than the next symbol; otherwise add it.
Step 4: Return the total.

Core idea:
Map each symbol to its numeric value. Scan the string left to right. At each position i, compare the value of s[i] to the value of s[i+1] (if it exists): if s[i]'s value is strictly less than s[i+1]'s value, subtract s[i]'s value from the running total (it's part of a subtractive pair like IV or CM); otherwise add it. This single left-to-right pass correctly handles both additive and subtractive numerals.`,
      dryRun: `MCMXCIV
M=1000 → +1000
C before M → -100
M=1000 → +1000
X before C → -10
C=100 → +100
I before V → -1
V=5 → +5
Total = 1994.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function romanToInt(s) {
  function value(ch) {
    if (ch === "I") return 1;
    if (ch === "V") return 5;
    if (ch === "X") return 10;
    if (ch === "L") return 50;
    if (ch === "C") return 100;
    if (ch === "D") return 500;
    return 1000;
  }

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = value(s[i]);
    const next = i + 1 < s.length ? value(s[i + 1]) : 0;

    if (current < next) total -= current;
    else total += current;
  }

  return total;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function romanToIntUsingBuiltIns(s){
  const values = new Map([
    ["I",1],["V",5],["X",10],["L",50],["C",100],["D",500],["M",1000],
  ]);

  return s.split("").reduce((total, char, index) => {
    const current = values.get(char);
    const next = index + 1 < s.length ? values.get(s[index + 1]) : 0;
    return total + (current < next ? -current : current);
  }, 0);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function romanToInt(s: string): number {
  function value(ch: string): number {
    if (ch === "I") return 1;
    if (ch === "V") return 5;
    if (ch === "X") return 10;
    if (ch === "L") return 50;
    if (ch === "C") return 100;
    if (ch === "D") return 500;
    return 1000;
  }

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = value(s[i]!);
    const next = i + 1 < s.length ? value(s[i + 1]!) : 0;

    if (current < next) total -= current;
    else total += current;
  }

  return total;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function romanToIntUsingBuiltIns(s: string): number {
  const values = new Map<string, number>([
    ["I",1],["V",5],["X",10],["L",50],["C",100],["D",500],["M",1000],
  ]);

  return s.split("").reduce((total, char, index) => {
    const current = values.get(char)!;
    const next = index + 1 < s.length ? values.get(s[index + 1]!)! : 0;
    return total + (current < next ? -current : current);
  }, 0);
}`,
      timeComplexity: 'O(n) — a single pass over the string.',
      spaceComplexity: 'O(1) — a fixed-size lookup table, independent of input length.',
      commonMistakes: [
        'Hardcoding every two-letter subtractive pair (IV, IX, XL, XC, CD, CM) as special cases instead of the general "compare to next symbol" rule.',
        'Reading right to left and trying to track a "previous max" — it works but is more error-prone than the simple left-to-right compare-to-next approach.',
        'Off-by-one errors when checking whether `i + 1` is within bounds before comparing to the next symbol.',
      ],
      followUpQuestions: [
        'How would you validate that the input is actually a well-formed Roman numeral (not just convert it, assuming it is valid)?',
        'How would you extend this beyond the standard 1-3999 range (numerals with a vinculum for larger numbers)?',
        'Why is Integer to Roman generally considered harder than Roman to Integer, and what does that say about greedy algorithm design?',
      ],
      similarQuestions: ['Integer to Roman', 'Roman to Integer II', 'Excel Sheet Column Number'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-7',
      questionNumber: 'DSACODE-M5-7',
      title: 'Integer to Roman',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an integer `num` in the range [1, 3999], convert it to its Roman numeral representation.',
      input: 'num: number — an integer from 1 to 3999',
      output: 'string — the Roman numeral representation',
      constraints: ['1 <= num <= 3999'],
      examples: [
        { input: '9', output: '"IX"', explanation: '9 is a subtractive pair: I before X.' },
        { input: '58', output: '"LVIII"', explanation: 'L(50) + V(5) + I(1) + I(1) + I(1) = 58.' },
        { input: '1994', output: '"MCMXCIV"', explanation: 'M(1000) + CM(900) + XC(90) + IV(4) = 1994.' },
      ],
      edgeCases: [
        { case: 'num = 1', expected: 'Returns "I"' },
        { case: 'num = 3999', expected: 'Returns "MMMCMXCIX", the largest standard Roman numeral' },
        { case: 'A value requiring multiple subtractive pairs', expected: 'Each is applied greedily and independently (e.g. 1994)' },
      ],
      functionName: 'intToRoman',
      isClassBased: false,
      sampleTests: [
        { input: [9], expectedOutput: 'IX', description: 'single subtractive pair' },
        { input: [58], expectedOutput: 'LVIII', description: 'no subtraction needed' },
        { input: [1994], expectedOutput: 'MCMXCIV', description: 'multiple subtractive pairs' },
        { input: [3], expectedOutput: 'III', description: 'simple repetition' },
      ],
    },
    hints: {
      hints: [
        'List every symbol value in descending order, including the six subtractive combinations (CM, CD, XC, XL, IX, IV) alongside the seven base symbols.',
        'For each entry (largest value first), greedily append that symbol as many times as it fits into the remaining number, subtracting its value each time.',
        'Because the list is ordered largest-to-smallest and includes the subtractive pairs as first-class entries, no special-casing is needed anywhere else.',
      ],
    },
    solution: {
      algorithm: `Step 1: Prepare values from largest to smallest, including subtractive pairs.
Step 2: Take the largest symbol that fits.
Step 3: Append it repeatedly while it fits and subtract its value.
Step 4: Continue until the number becomes zero.

Core idea:
Build an ordered list of [symbol, value] pairs from largest to smallest, including the six subtractive combinations (CM=900, CD=400, XC=90, XL=40, IX=9, IV=4) interleaved with the seven base symbols. Walk the list in order; for each pair, while \`num >= value\`, append the symbol to the result and subtract \`value\` from \`num\`. Because larger values (including subtractive pairs) are tried first, this greedy approach always produces the canonical Roman numeral.`,
      dryRun: `1994
1000 fits → M, remainder 994.
900 fits → CM, remainder 94.
90 fits → XC, remainder 4.
4 fits → IV.
Result = MCMXCIV.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function intToRoman(num) {
  const symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  const values = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  let result = "";

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function intToRomanUsingBuiltIns(num){
  const table = [
    ["M",1000],["CM",900],["D",500],["CD",400],
    ["C",100],["XC",90],["L",50],["XL",40],
    ["X",10],["IX",9],["V",5],["IV",4],["I",1],
  ];

  return table.reduce((result, [symbol, value]) => {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
    return result;
  }, "");
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function intToRoman(num: number): string {
  const symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  const values = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

  let result = "";

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]!) {
      result += symbols[i];
      num -= values[i]!;
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function intToRomanUsingBuiltIns(num: number): string {
  const table = [
    ["M",1000],["CM",900],["D",500],["CD",400],
    ["C",100],["XC",90],["L",50],["XL",40],
    ["X",10],["IX",9],["V",5],["IV",4],["I",1],
  ] as const;

  return table.reduce((result, [symbol, value]) => {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
    return result;
  }, "");
}`,
      timeComplexity: 'O(1) — the table has a fixed 13 entries and num <= 3999, so the total work is bounded by a small constant.',
      spaceComplexity: 'O(1) — aside from the fixed-size table and the output string.',
      commonMistakes: [
        'Omitting the subtractive combinations (CM, CD, XC, XL, IX, IV) from the table and trying to special-case them separately, which is far more error-prone.',
        "Ordering the table from smallest to largest, which produces incorrect, non-canonical output (or an infinite loop if `num >= value` is checked against a value that's too small first).",
        'Using `num % value` style digit-by-digit conversion instead of the direct greedy-subtraction approach, which is unnecessarily complex for this problem.',
      ],
      followUpQuestions: [
        'Why does the greedy approach provably produce the correct (canonical) Roman numeral for every value in [1, 3999]?',
        'How would you validate that a given string is a canonical (not just valid-looking) Roman numeral?',
        'How would you extend this to represent numbers beyond 3999?',
      ],
      similarQuestions: ['Roman to Integer', 'Integer to English Words', 'Excel Sheet Column Title'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-8',
      questionNumber: 'DSACODE-M5-8',
      title: 'Valid Anagram',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given two strings `s` and `t`, return true if `t` is an anagram of `s` (uses exactly the same characters, same multiplicities, possibly reordered), and false otherwise.',
      input: 's: string, t: string',
      output: 'boolean — true if t is an anagram of s',
      constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
      examples: [
        { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both strings use the same letters with the same counts.' },
        { input: 's = "rat", t = "car"', output: 'false', explanation: 'The letter counts differ ("t" vs "c").' },
        { input: 's = "a", t = "ab"', output: 'false', explanation: 'Different lengths can never be anagrams.' },
      ],
      edgeCases: [
        { case: 'Different lengths', expected: 'Immediately false — can short-circuit without counting' },
        { case: 'Identical strings', expected: 'true (a string is trivially an anagram of itself)' },
        { case: 'Same letters, different counts', expected: 'false (e.g. "aab" vs "abb")' },
      ],
      functionName: 'isAnagram',
      isClassBased: false,
      sampleTests: [
        { input: ['anagram', 'nagaram'], expectedOutput: true, description: 'classic true case' },
        { input: ['rat', 'car'], expectedOutput: false, description: 'different letters' },
        { input: ['', ''], expectedOutput: true, description: 'two empty strings' },
        { input: ['aab', 'abb'], expectedOutput: false, description: 'same letters, different multiplicities' },
      ],
    },
    hints: {
      hints: [
        'If the two strings have different lengths, they can never be anagrams — check that first as a fast exit.',
        'Count character frequencies in `s` in one pass, then decrement those counts while scanning `t`.',
        'If every count returns to exactly 0 after processing both strings, they are anagrams.',
      ],
    },
    solution: {
      algorithm: `Step 1: If lengths differ, return false.
Step 2: Count each character from the first string.
Step 3: Decrease the same count for every character in the second string.
Step 4: If every count ends at zero, the strings are anagrams.

Core idea:
Return false immediately if the lengths differ. Otherwise build a frequency map by incrementing a counter for each character of \`s\`, then decrementing for each character of \`t\`. If \`t\` is a true anagram of \`s\`, every counter ends at exactly 0; check that with \`.every()\` over the map's values.`,
      dryRun: `s="anagram", t="nagaram"
Count s: a3,n1,g1,r1,m1.
Subtract t: every count returns to zero.
Answer = true.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const counts = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }

  for (let i = 0; i < counts.length; i++) {
    if (counts[i] !== 0) return false;
  }

  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isAnagramUsingBuiltIns(s, t){
  if (s.length !== t.length) return false;

  const normalize = (value) =>
    value.split("").sort().join("");

  return normalize(s) === normalize(t);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Array<number>(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }

  for (let i = 0; i < counts.length; i++) {
    if (counts[i] !== 0) return false;
  }

  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isAnagramUsingBuiltIns(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const normalize = (value: string) =>
    value.split("").sort().join("");

  return normalize(s) === normalize(t);
}`,
      timeComplexity: 'O(n) — two linear passes over strings of length n, plus a final linear scan of the map.',
      spaceComplexity: 'O(1) — bounded by the alphabet size (at most 26 entries for lowercase letters), not the string length.',
      commonMistakes: [
        'Sorting both strings and comparing (O(n log n)) instead of counting characters (O(n)) — works, but is asymptotically worse.',
        'Skipping the length check up front, relying only on the counts ending at zero — correct, but wastes a full pass on inputs that could be rejected immediately.',
        'Using two separate frequency maps and comparing them for equality, which is more code and more allocation than incrementing and decrementing a single shared map.',
      ],
      followUpQuestions: [
        'How would this change if the inputs could contain Unicode characters, not just lowercase English letters?',
        'How would you check if `t` is an anagram of *any* contiguous substring of `s` (Find All Anagrams in a String)?',
        'How would you group a whole list of strings into anagram buckets efficiently (Group Anagrams)?',
      ],
      similarQuestions: ['Group Anagrams', 'Find All Anagrams in a String', 'Ransom Note'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m5-9',
      questionNumber: 'DSACODE-M5-9',
      title: 'Longest Common Prefix',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an array of strings `strs`, return the longest common prefix string shared by all of them. If there is no common prefix, return an empty string.',
      input: 'strs: string[]',
      output: 'string — the longest common prefix (possibly empty)',
      constraints: ['0 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
      examples: [
        { input: '["flower","flow","flight"]', output: '"fl"', explanation: 'All three strings start with "fl", but diverge at the third character.' },
        { input: '["dog","racecar","car"]', output: '""', explanation: 'No common prefix exists among these three.' },
        { input: '["car","car","car"]', output: '"car"', explanation: 'All strings are identical, so the whole string is the common prefix.' },
      ],
      edgeCases: [
        { case: 'Empty array of strings', expected: 'Returns ""' },
        { case: 'One of the strings is empty', expected: 'Returns "" (nothing can be a common prefix with an empty string, unless it too is empty)' },
        { case: 'Only one string in the array', expected: 'Returns that string in full' },
      ],
      functionName: 'longestCommonPrefix',
      isClassBased: false,
      sampleTests: [
        { input: [['flower', 'flow', 'flight']], expectedOutput: 'fl', description: 'partial common prefix' },
        { input: [['dog', 'racecar', 'car']], expectedOutput: '', description: 'no common prefix' },
        { input: [['car', 'car', 'car']], expectedOutput: 'car', description: 'identical strings' },
        { input: [[]], expectedOutput: '', description: 'empty input array' },
      ],
    },
    hints: {
      hints: [
        'The common prefix can never be longer than the shortest string in the array — use the first string as a candidate and check character-by-character.',
        'For each character position in the first string, check whether every other string has the same character at that position.',
        'Stop and return as soon as any string disagrees at a position, or as soon as you run out of characters in the first string.',
      ],
    },
    solution: {
      algorithm: `Step 1: Start with the first string as the candidate prefix.
Step 2: Compare that prefix with each other string.
Step 3: Reduce the candidate until it matches the beginning of the current string.
Step 4: Return the remaining prefix.

Core idea:
Guard the empty-array case first (no strings means no common prefix). Use \`strs[0]\` as the candidate and walk its characters by index; at each index, check with \`.every()\` whether every string in the array has that same character at that index. Append matching characters to the result and stop at the first mismatch (or when the first string runs out).`,
      dryRun: `["flower","flow","flight"]
Start prefix="flower".
Compare with "flow" → "flow".
Compare with "flight" → "fl".
Answer = "fl".`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let end = strs[0].length;

  function samePrefix(a, b, length) {
    for (let i = 0; i < length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  for (let i = 1; i < strs.length; i++) {
    while (
      end > 0 &&
      (strs[i].length < end || !samePrefix(strs[0], strs[i], end))
    ) {
      end--;
    }

    if (end === 0) return "";
  }

  let result = "";
  for (let i = 0; i < end; i++) result += strs[0][i];

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function longestCommonPrefixUsingBuiltIns(strs){
  if (strs.length === 0) return "";

  return strs.reduce((prefix, word) => {
    let length = Math.min(prefix.length, word.length);

    while (
      length > 0 &&
      prefix.slice(0, length) !== word.slice(0, length)
    ) {
      length--;
    }

    return prefix.slice(0, length);
  });
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

  let end = strs[0]!.length;

  for (let i = 1; i < strs.length; i++) {
    while (
      end > 0 &&
      (strs[i]!.length < end || !samePrefix(strs[0]!, strs[i]!, end))
    ) {
      end--;
    }

    if (end === 0) return "";
  }

  let result = "";
  for (let i = 0; i < end; i++) {
    result += strs[0]![i];
  }

  return result;

  function samePrefix(a: string, b: string, length: number): boolean {
    for (let i = 0; i < length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function longestCommonPrefixUsingBuiltIns(strs: string[]): string {
  if (strs.length === 0) return "";

  return strs.reduce((prefix, word) => {
    let length = Math.min(prefix.length, word.length);

    while (
      length > 0 &&
      prefix.slice(0, length) !== word.slice(0, length)
    ) {
      length--;
    }

    return prefix.slice(0, length);
  });
}`,
      timeComplexity: 'O(S) — where S is the sum of all characters across all strings, in the worst case (every string shares the full length of the shortest one).',
      spaceComplexity: 'O(1) extra — aside from the output string, which is bounded by the shortest input string\'s length.',
      commonMistakes: [
        'Not handling the empty-array input, which crashes when reading `strs[0]`.',
        'Comparing every pair of strings to each other (O(n²) comparisons) instead of comparing all strings against a single candidate at each character position.',
        'Forgetting that a shorter string ends the prefix search naturally when `str[i]` is `undefined`, which correctly compares as not-equal to `first[i]` — but only if the loop bound is `first.length`, not the longest string\'s length.',
      ],
      followUpQuestions: [
        'How would you solve this with a divide-and-conquer approach instead (finding the common prefix of halves, then combining)?',
        'How would a Trie make this more efficient if the same set of strings needed repeated common-prefix queries?',
        'How would you find the longest common suffix instead?',
      ],
      similarQuestions: ['Longest Common Subsequence', 'Implement Trie (Prefix Tree)', 'Longest Word in Dictionary'],
    },
  },
];