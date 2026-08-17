// Hand-authored coding question derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 13 — Trie). Unlike the auto-generated MockTechnicalQuestion
// files, this is a real CodingQuestionDetail problem: every sampleTests
// entry has been checked against the reference solution below (run
// against a real Node process, not just read), and both the JavaScript
// and TypeScript solutions are genuine, working code.
//
// The source notes' `startsWith(prefix)` implementation had a bug: it
// called `this.traverse(word)`, but `word` was never defined in that
// method's scope (it should have been `this.traverse(prefix)`) — a
// classic copy-paste-from-`search` mistake. Fixed below.
//
// This is a stateful "design" problem: the runner (codeRunner.ts) only
// supports calling a single plain function by name with positional
// args, so a class with multiple methods can't be tested directly. It's
// wrapped as `trieOperations(operations, args)`, the same convention
// used by Min Stack in dsa-coding-module6-questions.ts — one function
// that replays a sequence of operations against an internal instance and
// returns the array of results (null for void operations like insert).

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

const CATEGORY = 'Trie';
const CONCEPTS = ['Trie', 'Prefix Tree', 'Hashing', 'Time Complexity', 'Space Complexity'];

export const MOCK_DSA_CODING_MODULE13_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m13-1',
      questionNumber: 'DSACODE-M13-1',
      title: 'Implement Trie (Prefix Tree)',
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
        'Implement a Trie (prefix tree) supporting `insert(word)`, `search(word)` (exact word match), and `startsWith(prefix)` (does any inserted word begin with this prefix). Because this app\'s test runner calls a single function by name, implement it as `trieOperations(operations, args)`: `operations` is an array of operation names ("insert" | "search" | "startsWith"), `args` is a parallel array of argument arrays, and the function returns an array of results (null for insert, boolean for search/startsWith).',
      input: 'operations: string[] — operation names, args: unknown[][] — one argument array per operation',
      output: 'unknown[] — one result per operation, in order (null for insert)',
      constraints: ['1 <= operations.length <= 3 * 10^4', '1 <= word.length, prefix.length <= 2000', 'Words and prefixes consist only of lowercase English letters'],
      examples: [
        {
          input: 'operations = ["insert","search","search","startsWith","insert","search"], args = [["apple"],["apple"],["app"],["app"],["app"],["app"]]',
          output: '[null, true, false, true, null, true]',
          explanation: '"apple" is inserted; "apple" is found exactly, but "app" is not (yet) a complete word, even though "app" is a valid prefix — until it too is inserted.',
        },
      ],
      edgeCases: [
        { case: 'startsWith a prefix that was never inserted as a full word', expected: 'Returns true as long as some inserted word begins with it' },
        { case: 'search for a string that is only a prefix, never inserted as a complete word', expected: 'Returns false, even though startsWith on the same string would return true' },
        { case: 'search/startsWith on an empty trie', expected: 'Returns false for any non-empty query' },
      ],
      functionName: 'trieOperations',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            ['insert', 'search', 'search', 'startsWith', 'insert', 'search'],
            [['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
          ],
          expectedOutput: [null, true, false, true, null, true],
          description: 'the canonical LeetCode Implement Trie example — search vs. startsWith distinction',
        },
        {
          input: [
            ['insert', 'startsWith', 'search'],
            [['banana'], ['ban'], ['ban']],
          ],
          expectedOutput: [null, true, false],
          description: 'startsWith true but search false for an unfinished word',
        },
        {
          input: [
            ['search', 'startsWith'],
            [['x'], ['x']],
          ],
          expectedOutput: [false, false],
          description: 'querying an empty trie',
        },
      ],
    },
    hints: {
      hints: [
        'Each Trie node needs a map (or fixed-size array) from character to child node, plus a flag marking whether a complete word ends at this node.',
        '`insert` and the shared traversal logic behind `search`/`startsWith` walk character by character, following (or creating, for insert) child links.',
        '`search` and `startsWith` share almost all of their logic — the only difference is that `search` additionally requires the final node\'s "end of word" flag to be true, while `startsWith` only cares that the path exists at all.',
      ],
    },
    solution: {
      algorithm:
        'Each TrieNode holds a Map from character to child TrieNode and an `isWord` boolean. `insert(word)` walks the trie from the root, creating a child node for each character not yet present, then marks the final node\'s `isWord = true`. A shared `traverse(str)` helper walks the trie following `str`\'s characters and returns the final node reached, or null if the path breaks partway through. `search(word)` returns true only if `traverse(word)` finds a node AND that node\'s `isWord` flag is set. `startsWith(prefix)` returns true if `traverse(prefix)` finds any node at all — it does not care whether that node ends a complete word.',
      dryRun:
        'insert("apple"): a→p→p→l→e, mark e.isWord=true\nsearch("apple"): traverse reaches the "e" node, isWord=true → true\nsearch("app"): traverse reaches the second "p" node, isWord=false (no word ends there yet) → false\nstartsWith("app"): traverse reaches the second "p" node — path exists → true\ninsert("app"): mark the second "p" node\'s isWord=true\nsearch("app"): now isWord=true → true',
      javascriptSolution: `function trieOperations(operations, args) {
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.isWord = false;
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(word) {
      let node = this.root;
      for (const ch of word) {
        if (!node.children.has(ch)) {
          node.children.set(ch, new TrieNode());
        }
        node = node.children.get(ch);
      }
      node.isWord = true;
    }

    traverse(str) {
      let node = this.root;
      for (const ch of str) {
        if (!node.children.has(ch)) return null;
        node = node.children.get(ch);
      }
      return node;
    }

    search(word) {
      const node = this.traverse(word);
      return node !== null && node.isWord;
    }

    startsWith(prefix) {
      return this.traverse(prefix) !== null;
    }
  }

  const trie = new Trie();
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i];

    if (op === 'insert') {
      trie.insert(opArgs[0]);
      results.push(null);
    } else if (op === 'search') {
      results.push(trie.search(opArgs[0]));
    } else if (op === 'startsWith') {
      results.push(trie.startsWith(opArgs[0]));
    }
  }

  return results;
}`,
      typescriptSolution: `function trieOperations(
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  class TrieNode {
    children = new Map<string, TrieNode>();
    isWord = false;
  }

  class Trie {
    root = new TrieNode();

    insert(word: string): void {
      let node = this.root;
      for (const ch of word) {
        if (!node.children.has(ch)) {
          node.children.set(ch, new TrieNode());
        }
        node = node.children.get(ch)!;
      }
      node.isWord = true;
    }

    traverse(str: string): TrieNode | null {
      let node = this.root;
      for (const ch of str) {
        const next = node.children.get(ch);
        if (!next) return null;
        node = next;
      }
      return node;
    }

    search(word: string): boolean {
      const node = this.traverse(word);
      return node !== null && node.isWord;
    }

    startsWith(prefix: string): boolean {
      return this.traverse(prefix) !== null;
    }
  }

  const trie = new Trie();
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i]!;

    if (op === 'insert') {
      trie.insert(opArgs[0] as string);
      results.push(null);
    } else if (op === 'search') {
      results.push(trie.search(opArgs[0] as string));
    } else if (op === 'startsWith') {
      results.push(trie.startsWith(opArgs[0] as string));
    }
  }

  return results;
}`,
      timeComplexity: 'O(L) per operation, where L is the length of the word/prefix involved — each character requires exactly one map lookup or insertion.',
      spaceComplexity: 'O(total characters inserted) — in the worst case (no shared prefixes), every character across every inserted word gets its own node.',
      commonMistakes: [
        "Copy-pasting `search`'s body for `startsWith` and forgetting to change the final `isWord` check into a plain existence check — the source notes for this exact problem had precisely this bug (calling `traverse(word)` inside `startsWith` where `word` was undefined, instead of `traverse(prefix)`).",
        'Using a fixed-size 26-element array instead of a Map for children — fine and slightly faster for lowercase-only inputs, but breaks silently if the alphabet assumption changes (digits, uppercase, unicode).',
        'Forgetting to mark `isWord = true` at the end of `insert`, which makes every `search` return false even for words that were "inserted".',
      ],
      followUpQuestions: [
        'How would you implement `delete(word)` on this trie without breaking other words that share a prefix with it?',
        'How would you extend this to support wildcard search (e.g. ".ppl." matches "apple")?',
        'How would you use this structure to build autocomplete suggestions (return all words with a given prefix, not just true/false)?',
      ],
      similarQuestions: ['Design Add and Search Words Data Structure', 'Word Search II', 'Replace Words'],
    },
  },
];
