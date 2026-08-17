// Curated completion for the 150 Foundation / Core / Advanced DSA & System Design Interview Questions.
// Fills the 32 missing questions so all 150 questions are fully present in the mock bank without duplicates.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_DSA_150_CURATED_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  // --- EASY FOUNDATION PROBLEMS ---
  {
    detail: {
      id: 'dsa-150-easy-160',
      questionNumber: 'DSA150-160',
      title: 'Intersection of Two Linked Lists',
      difficulty: 'Easy',
      companies: ['Microsoft', 'Amazon', 'Meta', 'Apple'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Two Pointers', 'Space Complexity'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Given the heads of two singly linked lists headA and headB, return the node at which the two lists intersect. If they do not intersect, return null.',
    },
    answer: {
      expectedAnswer: 'Use two pointers `pA` and `pB` starting at `headA` and `headB`. Advance each pointer by 1 node per step. When a pointer reaches the end (`null`), redirect it to the head of the other list. They will meet at the intersection node in at most `m + n` steps, or both become `null` if no intersection exists.',
      deepExplanation: 'Let list A have length `a + c` and list B have length `b + c`, where `c` is the length of the shared intersection tail. Pointer `pA` traverses `a + c` nodes of A then `b` nodes of B, traveling `a + c + b` total steps. Pointer `pB` traverses `b + c` nodes of B then `a` nodes of A, traveling `b + c + a` total steps. Because `a + c + b === b + c + a`, both pointers reach the intersection node simultaneously on their second iteration. If `c = 0` (no intersection), both pointers reach `null` simultaneously after `a + b` steps.',
      productionExample: 'Used in memory graph traversal (e.g., detecting shared DOM ancestors or merging module dependency graphs without extra hash storage).',
      bestPractices: [
        'Do not modify the original linked list structures',
        'Achieve O(1) auxiliary space complexity without using a HashSet'
      ],
      tradeOffs: 'Two-pointer approach achieves O(N + M) time and O(1) space, whereas HashSet approach requires O(N) space.',
      commonMistakes: [
        'Comparing node values instead of node reference equality (`===`)',
        'Not handling non-intersecting lists cleanly'
      ],
      followUpQuestions: [
        'How would you solve this if the lists contain cycles?'
      ],
      relatedTopics: ['Linked List', 'Two Pointers']
    }
  },
  {
    detail: {
      id: 'dsa-150-easy-169',
      questionNumber: 'DSA150-169',
      title: 'Majority Element',
      difficulty: 'Easy',
      companies: ['Yahoo', 'Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Boyer-Moore Voting', 'Array', 'Frequency Count'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Given an array nums of size n, return the majority element (the element that appears more than n / 2 times). Assume the majority element always exists.',
    },
    answer: {
      expectedAnswer: 'Use Boyer-Moore Voting Algorithm in O(n) time and O(1) space. Maintain a `candidate` and a `count`. Iterate through `nums`: if `count === 0`, set `candidate = num`. Increment `count` if `num === candidate`, else decrement `count`. Return `candidate`.',
      deepExplanation: 'Because the majority element occurs strictly more than `n / 2` times, its count will outweigh the sum of counts of all other elements combined. Decrementing `count` on a mismatch effectively pairs a majority element with a non-majority element and removes both from consideration; the majority element is guaranteed to remain as the candidate at the end.',
      productionExample: 'Used in streaming data analysis and fault-tolerant voting systems (like Paxos/Raft consensus) to identify dominant telemetry values with minimal memory.',
      bestPractices: [
        'Use Boyer-Moore Voting for O(1) space rather than sorting (O(n log n)) or HashMap (O(n) space)',
        'If majority element existence is not guaranteed, add a second pass to verify candidate frequency'
      ],
      tradeOffs: 'Boyer-Moore operates in O(N) time and O(1) space; HashMap needs O(N) space; Sorting needs O(N log N) time.',
      commonMistakes: [
        'Assuming array is sorted',
        'Using extra memory (Map) when O(1) space is requested'
      ],
      followUpQuestions: [
        'How would you find all elements that appear more than n / 3 times?'
      ],
      relatedTopics: ['Boyer-Moore Voting', 'Array', 'Divide and Conquer']
    }
  },
  {
    detail: {
      id: 'dsa-150-easy-190',
      questionNumber: 'DSA150-190',
      title: 'Reverse Bits',
      difficulty: 'Easy',
      companies: ['Apple', 'Microsoft', 'Google'],
      frequency: 4,
      category: 'bit-manipulation',
      part: 'DSA',
      concepts: ['Bit Manipulation', 'Bitwise Operators'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Reverse bits of a given 32-bit unsigned integer.',
    },
    answer: {
      expectedAnswer: 'Iterate 32 times: shift result left by 1 bit, append the lowest bit of n (`n & 1`), then unsigned right-shift n by 1 (`n >>>= 1`). Return the result as an unsigned 32-bit integer.',
      deepExplanation: 'JavaScript bitwise operators treat numbers as 32-bit signed integers. Using unsigned right shift (`>>>`) ensures zero-fill from the left. By shifting `result = (result << 1) | (n & 1)` in a loop of 32 iterations, we extract bits from right-to-left from `n` and push them left-to-right into `result`.',
      productionExample: 'Crucial in low-level graphics processing, cryptography algorithms, network protocol encoding, and bit reversal FFT algorithms.',
      bestPractices: [
        'Always use >>> instead of >> to preserve unsigned 32-bit bitwise behavior in JS',
        'Memoize byte-reversed values in a lookup table if calling in hot loops millions of times'
      ],
      tradeOffs: 'Loop approach takes O(1) time (32 steps); lookup table approach achieves O(1) time (4 array lookups).',
      commonMistakes: [
        'Using standard right shift >> which preserves sign bit',
        'Looping only until n === 0 instead of all 32 bits'
      ],
      followUpQuestions: [
        'How would you optimize this function if called repeatedly millions of times?'
      ],
      relatedTopics: ['Bit Manipulation', 'Unsigned Shift']
    }
  },
  {
    detail: {
      id: 'dsa-150-easy-392',
      questionNumber: 'DSA150-392',
      title: 'Is Subsequence',
      difficulty: 'Easy',
      companies: ['Pinterest', 'Google', 'Amazon'],
      frequency: 4,
      category: 'strings',
      part: 'DSA',
      concepts: ['Two Pointers', 'String Matching', 'Greedy'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Given two strings s and t, return true if s is a subsequence of t, or false otherwise.',
    },
    answer: {
      expectedAnswer: 'Use two pointers `i` (for `s`) and `j` (for `t`). Iterate `j` through `t`. Whenever `s[i] === t[j]`, increment `i`. If `i === s.length`, return `true`. If `j` finishes and `i < s.length`, return `false`.',
      deepExplanation: 'A subsequence preserves character order but permits deleted intermediate characters. A greedy choice (matching the earliest possible match for `s[i]` in `t`) is always optimal because matching earlier leaves maximum remaining characters in `t` to match subsequent characters of `s`.',
      productionExample: 'Used in autocomplete fuzzy search, git diff string matching, and bio-sequence alignment checks.',
      bestPractices: [
        'Greedy matching runs in O(N) time where N is length of t',
        'If checking many s strings against one fixed t, preprocess t into an index map of character positions and use binary search'
      ],
      tradeOffs: 'Two pointers takes O(|T|) time and O(1) space for single queries. Binary search indexing takes O(|T|) preprocessing and O(|S| log |T|) per query for batch requests.',
      commonMistakes: [
        'Confusing subsequence with substring (substring must be contiguous)',
        'Not returning early when i reaches s.length'
      ],
      followUpQuestions: [
        'How would you handle checking millions of incoming s strings against a fixed stream t?'
      ],
      relatedTopics: ['Two Pointers', 'Greedy', 'Binary Search']
    }
  },
  {
    detail: {
      id: 'dsa-150-easy-876',
      questionNumber: 'DSA150-876',
      title: 'Middle of the Linked List',
      difficulty: 'Easy',
      companies: ['Adobe', 'Amazon', 'Meta'],
      frequency: 4,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Fast and Slow Pointers', 'Linked List', 'Two Pointers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.',
    },
    answer: {
      expectedAnswer: 'Use fast and slow pointers (`slow = head`, `fast = head`). Advance `slow` by 1 step and `fast` by 2 steps while `fast && fast.next`. When `fast` reaches the end, `slow` will point directly to the middle node.',
      deepExplanation: 'Because `fast` moves twice as fast as `slow`, when `fast` reaches the end of the list (distance `N`), `slow` has traveled exactly `N / 2` steps. For odd lengths, `slow` lands on the exact middle. For even lengths, `fast` becomes `null` after `slow` steps to the second middle node.',
      productionExample: 'Used as the first phase in Merge Sort for linked lists to split the list in half in a single pass without extra memory.',
      bestPractices: [
        'Check `while (fast !== null && fast.next !== null)` to prevent null pointer dereferences',
        'Solves in single pass O(N) time and O(1) space'
      ],
      tradeOffs: 'Fast and slow pointer approach avoids a two-pass counter method.',
      commonMistakes: [
        'Checking fast.next without first checking fast',
        'Returning node value instead of the node reference itself'
      ],
      followUpQuestions: [
        'How would you return the first middle node instead of the second for even-length lists?'
      ],
      relatedTopics: ['Linked List', 'Two Pointers', 'Fast & Slow Pointers']
    }
  },
  {
    detail: {
      id: 'dsa-150-easy-1929',
      questionNumber: 'DSA150-1929',
      title: 'Concatenation of Array',
      difficulty: 'Easy',
      companies: ['Google', 'Apple'],
      frequency: 5,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Array', 'Iteration', 'Spread Operator'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'Given an integer array nums of length n, create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n.',
    },
    answer: {
      expectedAnswer: 'Return `[...nums, ...nums]` or allocate `ans = new Array(2 * n)` and assign `ans[i] = ans[i + n] = nums[i]` in a single loop from `0` to `n - 1`.',
      deepExplanation: 'Concatenating an array of length N with itself yields an array of length 2N. Spread operator `[...nums, ...nums]` or `nums.concat(nums)` performs this in linear O(N) time and space.',
      productionExample: 'Used in infinite scroll UI loops and carousel rendering to double items for smooth continuous loop animations.',
      bestPractices: [
        'Use spread syntax [...nums, ...nums] for clean readable functional code',
        'Pre-allocate array size for high-performance memory optimization'
      ],
      tradeOffs: 'Spread syntax is clean and readable; pre-allocated loop avoids temporary array allocations.',
      commonMistakes: [
        'Mutating original array in place improperly'
      ],
      followUpQuestions: [
        'How would you concatenate an array k times efficiently?'
      ],
      relatedTopics: ['Array', 'Concatenation']
    }
  },

  // --- MEDIUM CORE PROBLEMS ---
  {
    detail: {
      id: 'dsa-150-med-7',
      questionNumber: 'DSA150-007',
      title: 'Reverse Integer',
      difficulty: 'Medium',
      companies: ['Google', 'Amazon', 'Apple'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Math', 'Overflow Handling', 'Bitwise Limits'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], return 0.',
    },
    answer: {
      expectedAnswer: 'Repeatedly pop the last digit (`x % 10`) and push it onto the reversed number (`rev = rev * 10 + pop`). Before updating `rev`, check if `rev` will exceed `2147483647` or `-2147483648`. If it overflows 32-bit integer boundaries, return `0`.',
      deepExplanation: 'In 32-bit signed arithmetic, max int is `2^31 - 1 = 2147483647` and min int is `-2^31 = -2147483648`. In JS, numbers are double-precision floats, so we must explicitly enforce 32-bit integer boundary overflow checks.',
      productionExample: 'Used in mathematical parsers, legacy data wire protocol decoding, and numeric formatting libraries.',
      bestPractices: [
        'Perform overflow checks prior to multiplying by 10 or check bitwise boundary (rev | 0 !== rev)',
        'Handle negative signs correctly with Math.trunc'
      ],
      tradeOffs: 'Math approach operates in O(log10 |X|) time and O(1) space, avoiding string conversion overhead.',
      commonMistakes: [
        'Converting to string without checking 32-bit numeric overflow',
        'Using Math.floor instead of Math.trunc for negative numbers'
      ],
      followUpQuestions: [
        'How does `(rev | 0) !== rev` detect 32-bit overflow in JS?'
      ],
      relatedTopics: ['Math', 'Bit Manipulation']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-91',
      questionNumber: 'DSA150-091',
      title: 'Decode Ways',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'String Parsing', 'Memoization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'A message containing letters from A-Z is encoded to numbers using "A" -> 1, "B" -> 2, ..., "Z" -> 26. Given a string s containing only digits, return the number of ways to decode it.',
    },
    answer: {
      expectedAnswer: 'Use 1D Dynamic Programming. Let `dp[i]` be the number of ways to decode substring `s[0...i-1]`. `dp[0] = 1`. For position `i`, if `s[i-1] !== "0"`, `dp[i] += dp[i-1]`. If two-digit number `s[i-2...i-1]` is between `10` and `26`, `dp[i] += dp[i-2]`. Return `dp[n]`.',
      deepExplanation: 'Similar to Climbing Stairs, but with conditional constraints. A single digit `s[i-1]` can be decoded alone if it is non-zero. A double digit pair `s[i-2...i-1]` can be decoded together if its numeric value is between `10` and `26` inclusive. If leading character is `"0"`, zero decodings exist.',
      productionExample: 'Used in text encoding/decoding schemes, compressed signal parsing, and natural language tokenization pipelines.',
      bestPractices: [
        'Optimize space from O(N) array to O(1) using two rolling variables (`prev1`, `prev2`)',
        'Handle "0" edge cases (e.g. "06" is invalid, "10" is valid)'
      ],
      tradeOffs: '1D DP runs in O(N) time and O(1) space.',
      commonMistakes: [
        'Treating "06" as valid decoding of "F"',
        'Failing on single invalid leading zero "0"'
      ],
      followUpQuestions: [
        'How would you handle wildcard characters \'*\' that can represent any digit 1-9 (Decode Ways II)?'
      ],
      relatedTopics: ['Dynamic Programming', 'String']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-133',
      questionNumber: 'DSA150-133',
      title: 'Clone Graph',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'BFS', 'DFS', 'Hash Map'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    },
    answer: {
      expectedAnswer: 'Use DFS or BFS with a Map `visited` mapping `originalNode -> clonedNode`. For each node visited, clone it and store it in `visited`. Recursively/iteratively traverse its neighbors, cloning neighbor nodes if unvisited, and push cloned neighbors into the current cloned node\'s `neighbors` array.',
      deepExplanation: 'Because graphs can contain cycles, an un-visited tracking mechanism is required to prevent infinite loops. Using a Map mapping original node references to their new cloned counterparts allows cycle detection and ensures each graph node is instantiated exactly once.',
      productionExample: 'Used in deep-cloning complex state object graphs (Redux/Immer state trees, AST node cloning in Babel/SWC compilers).',
      bestPractices: [
        'Use Map (or WeakMap) to map original node -> cloned node',
        'Handle empty input graph (null node) cleanly'
      ],
      tradeOffs: 'DFS and BFS both run in O(V + E) time and O(V) space.',
      commonMistakes: [
        'Creating duplicate nodes when encountering cycle back-edges',
        'Shallow-copying neighbor arrays instead of deep-cloning neighbor nodes'
      ],
      followUpQuestions: [
        'How would you clone a directed graph with weighted edges?'
      ],
      relatedTopics: ['Graph', 'BFS', 'DFS', 'Hash Table']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-138',
      questionNumber: 'DSA150-138',
      title: 'Copy List with Random Pointer',
      difficulty: 'Medium',
      companies: ['Microsoft', 'Amazon', 'Meta'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Hash Map', 'Interleaving Nodes'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Construct a deep copy of a linked list where each node contains an additional random pointer which could point to any node in the list or null.',
    },
    answer: {
      expectedAnswer: 'Can be solved in 3 passes with O(1) auxiliary space by interleaving: 1) Create cloned node `A\'` right after original node `A` (`A -> A\' -> B -> B\'`). 2) Assign random pointers: `curr.next.random = curr.random ? curr.random.next : null`. 3) Unweave the interleaved list to separate original list from cloned list.',
      deepExplanation: 'By inserting `A\'` immediately after `A`, `A\'`\'s random pointer target is always `A.random.next`. This eliminates the need for an O(N) HashMap to map original nodes to cloned nodes.',
      productionExample: 'Used in serialization/deserialization of object graphs with cross-referencing pointers or DOM tree cloning with arbitrary event target references.',
      bestPractices: [
        'O(1) extra space interleaving trick avoids O(N) map overhead',
        'Ensure original list pointers are restored intact'
      ],
      tradeOffs: 'Interleaving method achieves O(N) time and O(1) space; Map method achieves O(N) time and O(N) space.',
      commonMistakes: [
        'Forgetting to check null random pointers',
        'Failing to properly unweave original list at the end'
      ],
      followUpQuestions: [
        'How would you solve this using a HashMap in a single pass?'
      ],
      relatedTopics: ['Linked List', 'Hash Table', 'Pointer Manipulation']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-143',
      questionNumber: 'DSA150-143',
      title: 'Reorder List',
      difficulty: 'Medium',
      companies: ['Adobe', 'Amazon', 'Meta'],
      frequency: 4,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Two Pointers', 'Reverse List', 'In-place Merge'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Reorder a singly linked list L0 -> L1 -> ... -> Ln-1 -> Ln to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 ... in-place without modifying node values.',
    },
    answer: {
      expectedAnswer: 'Three steps in O(N) time and O(1) space: 1) Find middle of list using fast/slow pointers. 2) Reverse the second half of the list. 3) Merge/interleave the first half and reversed second half node by node.',
      deepExplanation: 'Reordering requires pairing the 1st node with the Nth node, 2nd with (N-1)th, etc. By reversing the second half, the (N-k)th node becomes easily accessible sequentially via forward traversal of the second half.',
      productionExample: 'Used in UI pagination and layout render engines to interleave alternating items from two distinct data streams.',
      bestPractices: [
        'Perform in-place pointer manipulation without copying node values to an array',
        'Break the link between first half and second half before merging'
      ],
      tradeOffs: 'Three-step pointer approach runs in O(N) time and O(1) space; array storage approach requires O(N) space.',
      commonMistakes: [
        'Creating cycle by forgetting to set middle.next = null',
        'Losing reference pointers during interleaving loop'
      ],
      followUpQuestions: [
        'How would you test this for odd vs even length lists?'
      ],
      relatedTopics: ['Linked List', 'Two Pointers', 'In-place Algorithm']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-207',
      questionNumber: 'DSA150-207',
      title: 'Course Schedule',
      difficulty: 'Medium',
      companies: ['Coursera', 'Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'Topological Sort', 'Kahn Algorithm', 'Cycle Detection'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'There are numCourses courses labeled from 0 to numCourses - 1. Given prerequisites array where prerequisites[i] = [a, b] indicates you must take b first, return true if you can finish all courses.',
    },
    answer: {
      expectedAnswer: 'Detect if directed graph contains a cycle. Build adjacency list and in-degree array. Push all nodes with `inDegree === 0` into a BFS queue. Process queue: decrement in-degrees of neighbors. If a neighbor in-degree becomes 0, push to queue. Return `processedCount === numCourses`.',
      deepExplanation: 'This is cycle detection in a directed graph using Kahn\'s algorithm for Topological Sorting. If a cycle exists, nodes in the cycle will never reach an in-degree of 0, so `processedCount` will be strictly less than `numCourses`.',
      productionExample: 'Used in JavaScript module bundlers (Vite/Webpack) to detect circular `import` dependencies and in build systems (Bazel/Make) to order task dependencies.',
      bestPractices: [
        'Represent graph as adjacency list for O(V + E) efficiency',
        'Can also be solved using DFS with tri-color state tracking (unvisited=0, visiting=1, visited=2)'
      ],
      tradeOffs: 'Kahn\'s algorithm (BFS) and tri-color DFS both run in O(V + E) time and O(V + E) space.',
      commonMistakes: [
        'Conflating directed graph cycle detection with undirected graph cycle detection',
        'Not handling disconnected component graphs'
      ],
      followUpQuestions: [
        'How would you return the valid ordering of courses (Course Schedule II)?'
      ],
      relatedTopics: ['Graph', 'Topological Sort', 'BFS', 'DFS']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-210',
      questionNumber: 'DSA150-210',
      title: 'Course Schedule II',
      difficulty: 'Medium',
      companies: ['DoorDash', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Topological Sort', 'Kahn Algorithm', 'Graph', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.',
    },
    answer: {
      expectedAnswer: 'Use Kahn\'s Topological Sort algorithm (BFS). Maintain an in-degree array and result array. Enqueue all 0-in-degree nodes. Append popped nodes to `result`. Decrement neighbor in-degrees. Return `result` if `result.length === numCourses`, else `[]`.',
      deepExplanation: 'Extends Course Schedule I by recording the exact sequence in which 0-in-degree nodes are processed. If the result length equals total courses, it represents a valid topological ordering. If shorter, a cycle prevented complete resolution.',
      productionExample: 'Directly powers package manager resolution tools (npm / yarn dependency execution order) and build pipeline task schedulers.',
      bestPractices: [
        'Return [] immediately when cycle is detected',
        'Construct graph in single pass over prerequisites'
      ],
      tradeOffs: 'BFS Kahn\'s algorithm builds output sequentially in natural order; DFS topological sort produces reverse post-order.',
      commonMistakes: [
        'Returning partial order when cycle exists',
        'Inverting edge direction [a, b] (b is prerequisite of a)'
      ],
      followUpQuestions: [
        'What if multiple valid topological orderings exist?'
      ],
      relatedTopics: ['Topological Sort', 'Graph', 'BFS']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-261',
      questionNumber: 'DSA150-261',
      title: 'Graph Valid Tree',
      difficulty: 'Medium',
      companies: ['LinkedIn', 'Amazon', 'Google'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'Union Find', 'Tree Validation', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Given n nodes labeled 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
    },
    answer: {
      expectedAnswer: 'A graph is a valid tree iff 1) `edges.length === n - 1` and 2) all `n` nodes are connected (no cycles). Check `edges.length === n - 1` first. Then use Union-Find or BFS to confirm all nodes belong to a single connected component.',
      deepExplanation: 'By graph theory properties, an undirected graph with `n` nodes is a tree if and only if it has exactly `n - 1` edges and is fully connected. If `edges.length !== n - 1`, return false immediately. Then check connectivity starting from node 0 using BFS/DFS or Union-Find.',
      productionExample: 'Used in network topology verification (spanning tree protocol) and DOM component tree hierarchy validation.',
      bestPractices: [
        'Check edge count `edges.length === n - 1` early for O(1) rejection',
        'Use Disjoint Set Union (DSU) with path compression for fast cycle detection'
      ],
      tradeOffs: 'Edge count check + DSU runs in O(N alpha(N)) time, virtually O(N).',
      commonMistakes: [
        'Forgetting that disconnected components can satisfy edge count if cycles exist'
      ],
      followUpQuestions: [
        'How does Union-Find with path compression achieve near-constant time per operation?'
      ],
      relatedTopics: ['Graph', 'Union Find', 'BFS', 'DFS']
    }
  },
  {
    detail: {
      id: 'dsa-150-med-371',
      questionNumber: 'DSA150-371',
      title: 'Sum of Two Integers',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Apple'],
      frequency: 4,
      category: 'bit-manipulation',
      part: 'DSA',
      concepts: ['Bit Manipulation', 'XOR', 'Carry Operations'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'Given two integers a and b, return the sum of the two integers without using the operators + and -.',
    },
    answer: {
      expectedAnswer: 'Use bitwise operations in a loop while `b !== 0`: `carry = (a & b) << 1`, `a = a ^ b`, `b = carry`. Return `a`.',
      deepExplanation: 'Bitwise XOR (`a ^ b`) calculates sum without carries (half-adder). Bitwise AND shifted left (`(a & b) << 1`) calculates the carries. Repeating this process propagates carries upward until `b === 0`.',
      productionExample: 'Fundamental hardware arithmetic logic unit (ALU) operation for binary addition circuits.',
      bestPractices: [
        'Understand how XOR acts as addition without carry',
        'Understand how AND shifted left calculates carry'
      ],
      tradeOffs: 'Runs in O(1) time (at most 32 loop iterations for 32-bit integers) and O(1) auxiliary space.',
      commonMistakes: [
        'Forgetting left shift on carry: (a & b) << 1',
        'Reassigning a before calculating carry using old a value'
      ],
      followUpQuestions: [
        'How would you implement subtraction without + or - operators?'
      ],
      relatedTopics: ['Bit Manipulation', 'ALU Design']
    }
  },

  // --- HARD ADVANCED PROBLEMS ---
  {
    detail: {
      id: 'dsa-150-hard-10',
      questionNumber: 'DSA150-010',
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      companies: ['Meta', 'Google', 'Amazon'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Regex Parsing', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given an input string s and a pattern p, implement regular expression matching with support for "." (matches any single character) and "*" (matches zero or more of the preceding element).',
    },
    answer: {
      expectedAnswer: 'Use 2D Dynamic Programming table `dp[i][j]` representing whether `s[0...i-1]` matches `p[0...j-1]`. If `p[j-1] === "*"`, match zero occurrences (`dp[i][j-2]`) or match one+ occurrences if current chars match (`firstMatch && dp[i-1][j]`).',
      deepExplanation: '`dp[0][0] = true`. For `p[j-1] === "*"`, `*` can either skip the pattern pair (`dp[i][j-2]`) or consume one character from `s` if `s[i-1]` matches `p[j-2]` (`dp[i-1][j]`). For standard matching chars or `.`, `dp[i][j] = firstMatch && dp[i-1][j-1]`.',
      productionExample: 'Core logic behind regex execution engines, router pattern matching, and rule-based template engines.',
      bestPractices: [
        'Initialize base case dp[0][j] for patterns like "a*b*c*" matching empty string',
        'Carefully handle zero-occurrence branch for \'*\' wildcard'
      ],
      tradeOffs: '2D DP runs in O(M * N) time and O(M * N) space vs naive recursive backtracking exponential O(2^(M+N)).',
      commonMistakes: [
        'Treating \'*\' as matching any sequence like \'.*\' without binding to preceding character',
        'Index off-by-one errors when mapping 1-based DP table to 0-based strings'
      ],
      followUpQuestions: [
        'How does wildcard matching (\'*\', \'?\') differ from regex matching (\'.*\', \'.\')?'
      ],
      relatedTopics: ['Dynamic Programming', 'String Matching', 'Regex']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-25',
      questionNumber: 'DSA150-025',
      title: 'Reverse Nodes in k-Group',
      difficulty: 'Hard',
      companies: ['Microsoft', 'Amazon', 'Google'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Pointer Manipulation', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given the head of a linked list, reverse the nodes of a list k at a time and return its modified list. If the number of nodes is not a multiple of k, remaining nodes at the end should remain as-is.',
    },
    answer: {
      expectedAnswer: 'Check if at least `k` nodes exist from current head. If yes, reverse `k` nodes in-place using standard 3-pointer list reversal. Connect original `head` (which is now tail of reversed group) to recursive result of next group `reverseKGroup(curr, k)`. Return new head of reversed group.',
      deepExplanation: 'Can be solved recursively or iteratively in O(N) time and O(1) auxiliary space. Counting `k` nodes before reversing guarantees remaining < `k` tail nodes stay untouched.',
      productionExample: 'Used in network packet batching and memory block reallocation routines where fixed-size buffer chunks are inverted.',
      bestPractices: [
        'Count k nodes first before attempting reversal',
        'Preserve pointers across sub-group boundaries carefully'
      ],
      tradeOffs: 'Iterative approach achieves O(N) time and O(1) auxiliary space; recursive approach takes O(N/k) call stack space.',
      commonMistakes: [
        'Reversing tail nodes when fewer than k nodes remain',
        'Losing head node reference of preceding sub-group'
      ],
      followUpQuestions: [
        'How would you reverse nodes in k-group starting from the tail end?'
      ],
      relatedTopics: ['Linked List', 'Recursion', 'In-place Pointer Reversal']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-72',
      questionNumber: 'DSA150-072',
      title: 'Edit Distance',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon', 'Microsoft'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Levenshtein Distance', 'String Matrix'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) required to convert word1 to word2.',
    },
    answer: {
      expectedAnswer: 'Levenshtein Distance via 2D DP. `dp[i][j]` is min operations to convert `word1[0...i-1]` to `word2[0...j-1]`. If `word1[i-1] === word2[j-1]`, `dp[i][j] = dp[i-1][j-1]`. Else `dp[i][j] = 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace))`. Return `dp[m][n]`.',
      deepExplanation: 'Base cases: converting empty string to string of length `j` requires `j` insertions (`dp[0][j] = j`); converting length `i` string to empty requires `i` deletions (`dp[i][0] = i`). Transition takes minimum of 3 allowed edit operations.',
      productionExample: 'Powers spell check auto-correct, fuzzy search matching, DNA sequence alignment, and `git diff` calculation.',
      bestPractices: [
        'Can space-optimize from 2D DP O(M * N) down to 1D DP O(N) space using two rows',
        'Use for fuzzy search scoring metrics'
      ],
      tradeOffs: '2D DP runs in O(M * N) time and O(M * N) space; space optimized runs in O(N) space.',
      commonMistakes: [
        'Forgetting base cases dp[i][0] and dp[0][j]',
        'Adding cost when characters already match'
      ],
      followUpQuestions: [
        'How would you adjust costs if replacements cost 2 operations while insert/delete cost 1?'
      ],
      relatedTopics: ['Dynamic Programming', 'Levenshtein Distance', 'String']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-127',
      questionNumber: 'DSA150-127',
      title: 'Word Ladder',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['BFS', 'Shortest Path', 'Bi-directional BFS', 'Graph Transformation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord replacing 1 letter at a time, or 0 if no such sequence exists.',
    },
    answer: {
      expectedAnswer: 'Use BFS (unweighted shortest path). Put `wordList` in a Set for O(1) lookup. Queue holds `[word, level]`. For current word, change each character (a-z) to generate intermediate patterns. If pattern is in set, add to queue and remove from set to mark visited. Return `level` when `endWord` is popped.',
      deepExplanation: 'BFS guarantees shortest path in unweighted graphs. Optimization: Bi-directional BFS starting simultaneously from `beginWord` and `endWord` reduces search space from O(b^d) to O(b^(d/2)).',
      productionExample: 'Used in shortest path state transition solvers, gene mutation sequence analysis, and network packet routing transformations.',
      bestPractices: [
        'Use Set for O(1) deletion/visited lookup',
        'Use Bi-directional BFS for dramatic performance boost in large wordlists'
      ],
      tradeOffs: 'Standard BFS runs in O(M^2 * N) time; Bi-directional BFS yields 10x-100x practical speedup on dense search graphs.',
      commonMistakes: [
        'Using DFS instead of BFS (DFS does not guarantee shortest path)',
        'Not checking if endWord is in wordList'
      ],
      followUpQuestions: [
        'How would you return all shortest transformation sequences (Word Ladder II)?'
      ],
      relatedTopics: ['BFS', 'Graph', 'Shortest Path', 'Bi-directional BFS']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-269',
      questionNumber: 'DSA150-269',
      title: 'Alien Dictionary',
      difficulty: 'Hard',
      companies: ['Meta', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Topological Sort', 'Graph', 'Kahn Algorithm', 'DFS Cycle Detection'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'There is a new alien language using the Latin alphabet, but order of letters is unknown. Given a sorted list of words from the alien dictionary, return a string of unique letters in the new alien language in lexicographical order. If invalid, return "".',
    },
    answer: {
      expectedAnswer: 'Build directed graph of character precedence by comparing adjacent words. Find first differing character `w1[k] !== w2[k]` -> add directed edge `w1[k] -> w2[k]`. Also check prefix invalidity (if `w1` is longer prefix of `w2`, order is invalid). Perform Topological Sort (Kahn\'s BFS or DFS). Return ordered string if no cycle, else `""`.',
      deepExplanation: 'Lexicographical sorting dictates that adjacent words determine character precedence. The first mismatch between `words[i]` and `words[i+1]` defines a directed edge `charA -> charB`. If a cycle exists or an invalid prefix ordering occurs (e.g. ["abc", "ab"]), return `""`.',
      productionExample: 'Used in compiler dependency resolution, custom language locale sorting rules, and symbol precedence parsing.',
      bestPractices: [
        'Catch invalid prefix ordering (e.g., ["apple", "app"]) early',
        'Include all unique characters in in-degree map initially'
      ],
      tradeOffs: 'Topological sort runs in O(C) time where C is total length of all words, and O(1) auxiliary space (since alphabet size <= 26).',
      commonMistakes: [
        'Ignoring prefix check edge case where longer word precedes shorter prefix',
        'Not handling cyclic precedence relations'
      ],
      followUpQuestions: [
        'What if multiple valid character orderings exist?'
      ],
      relatedTopics: ['Topological Sort', 'Graph', 'BFS', 'DFS']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-297',
      questionNumber: 'DSA150-297',
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'binary-tree',
      part: 'DSA',
      concepts: ['Binary Tree', 'DFS', 'Preorder Traversal', 'Serialization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Design an algorithm to serialize a binary tree into a string and deserialize that string back into the exact same binary tree structure.',
    },
    answer: {
      expectedAnswer: 'Use Preorder DFS traversal with `"null"` markers. `serialize(root)`: recursively append `node.val` separated by commas; if `node === null`, append `"null"`. `deserialize(data)`: split string into queue/array of tokens, recursively pop next token to construct `TreeNode(val)` and assign `.left` and `.right`.',
      deepExplanation: 'Including explicit `null` sentinel markers in Preorder traversal unambiguously determines the tree structure without requiring both Inorder and Preorder traversals.',
      productionExample: 'Used in transmitting complex DOM/Virtual-DOM component trees over web sockets or persisting tree state to JSON/databases.',
      bestPractices: [
        'Use delimiter (like comma) and explicit null markers for unambiguous parsing',
        'Can also use BFS (level-order) with queue for iterative serialization'
      ],
      tradeOffs: 'DFS preorder serialization takes O(N) time and O(N) space for both encoding and decoding.',
      commonMistakes: [
        'Forgetting null sentinel nodes',
        'Using string split repeatedly causing quadratic array shift operations'
      ],
      followUpQuestions: [
        'How would you optimize serialized string size for huge binary trees?'
      ],
      relatedTopics: ['Binary Tree', 'DFS', 'Design', 'Serialization']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-312',
      questionNumber: 'DSA150-312',
      title: 'Burst Balloons',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Interval DP', 'Dynamic Programming', 'Divide and Conquer'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given n balloons with values nums, popping balloon i yields nums[i-1] * nums[i] * nums[i+1] coins. Return max coins obtained by bursting all balloons. Out of bounds values count as 1.',
    },
    answer: {
      expectedAnswer: 'Use Interval DP. Pad `nums` with `1` on both ends (`A = [1, ...nums, 1]`). Define `dp[i][j]` as max coins for bursting balloons between `i` and `j` (exclusive). Iterate subarray length `len` from 1 to `n`. For subinterval `(i, j)`, iterate last balloon `k` popped in interval: `dp[i][j] = max(dp[i][j], A[i] * A[k] * A[j] + dp[i][k] + dp[k][j])`. Return `dp[0][n+1]`.',
      deepExplanation: 'Thinking of the *first* balloon to burst makes subproblems dependent on neighbors outside. Reversing thought process to pick the *last* balloon `k` to burst inside interval `(i, j)` isolates subproblems `(i, k)` and `(k, j)`, because `A[i]` and `A[j]` remain as the adjacent boundaries for `A[k]`.',
      productionExample: 'Used in matrix chain multiplication optimization and optimal code block instruction reordering in compilers.',
      bestPractices: [
        'Reverse perspective to select the LAST balloon popped in interval to decouple subproblems',
        'Pad array with 1s at boundaries'
      ],
      tradeOffs: 'Interval DP runs in O(N^3) time and O(N^2) space.',
      commonMistakes: [
        'Trying top-down memoization selecting first balloon popped (causes interdependent subproblems)'
      ],
      followUpQuestions: [
        'How does this problem relate to Matrix Chain Multiplication?'
      ],
      relatedTopics: ['Dynamic Programming', 'Interval DP']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-332',
      questionNumber: 'DSA150-332',
      title: 'Reconstruct Itinerary',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Eulerian Path', 'Hierholzer Algorithm', 'DFS', 'Priority Queue'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given list of airline tickets where tickets[i] = [from, to], reconstruct itinerary starting from "JFK" using all tickets. If multiple valid itineraries exist, return the one with smallest lexicographical order.',
    },
    answer: {
      expectedAnswer: 'Find Eulerian Path using Hierholzer\'s Algorithm. Build graph mapping `from -> MinPriorityQueue / sorted list of destinations`. Perform DFS starting at `"JFK"`. In DFS for airport `u`, while `u` has outgoing destinations, pop lexicographically smallest destination `v` and recurse DFS(`v`). After loop, unshift/push `u` to result list. Reverse result list at end.',
      deepExplanation: 'Because every ticket must be used once, this is a directed Eulerian path search. Hierholzer\'s post-order traversal visits all outgoing edges, backing out of dead-ends last. Reversing post-order traversal yields the complete valid Eulerian itinerary.',
      productionExample: 'Used in vehicle routing algorithms, delivery flight path planning, and DNA sequence assembly (Eulerian de Bruijn graphs).',
      bestPractices: [
        'Sort destination lists lexicographically prior to traversal',
        'Remove edges as they are traversed to prevent infinite looping'
      ],
      tradeOffs: 'Hierholzer\'s algorithm runs in O(E log E) time due to destination sorting, with O(V + E) space.',
      commonMistakes: [
        'Standard DFS greedy traversal can get stuck in dead-ends without completing all tickets',
        'Not handling duplicate ticket edges between same airports'
      ],
      followUpQuestions: [
        'What guarantees that an Eulerian path exists in this graph?'
      ],
      relatedTopics: ['Graph', 'Eulerian Path', 'DFS', 'Hierholzer Algorithm']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-403',
      questionNumber: 'DSA150-403',
      title: 'Frog Jump',
      difficulty: 'Hard',
      companies: ['Meta', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Hash Map', 'Set', 'Memoization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'A frog is crossing a river with stones at given positions. If last jump was k units, next jump must be k-1, k, or k+1 units. Frog starts at stone 0 and first jump must be 1 unit. Determine if frog can reach last stone.',
    },
    answer: {
      expectedAnswer: 'Use Map `stonePosition -> Set of reachable jump units k`. Map key is stone position, value is Set of jump step sizes `k` that reached this stone. Initialize `map[0] = Set([0])`. Iterate stones: for each `k` in `map[stone]`, for `step` in `[k-1, k, k+1]` where `step > 0`: if `stone + step` exists in map, add `step` to `map[stone + step]`. Return `map[lastStone].size > 0`.',
      deepExplanation: 'Early termination optimization: if `stones[1] !== 1`, return false immediately. Also, max jump size at stone index `i` cannot exceed `i`, bounding the maximum number of jump states.',
      productionExample: 'Used in physics-constrained trajectory validation and energy-limited step routing algorithms.',
      bestPractices: [
        'Use Map<number, Set<number>> for O(1) position checking and state storage',
        'Skip step <= 0 jumps'
      ],
      tradeOffs: 'DP with Set states runs in O(N^2) time and O(N^2) space.',
      commonMistakes: [
        'Trying 1D DP boolean array (fails because reachable state depends on previous jump distance k)'
      ],
      followUpQuestions: [
        'What is the maximum potential jump length reachable at stone index i?'
      ],
      relatedTopics: ['Dynamic Programming', 'Hash Set', 'Graph Search']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-472',
      questionNumber: 'DSA150-472',
      title: 'Concatenated Words',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Trie', 'Dynamic Programming', 'String Verification', 'Hash Set'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given an array of words without duplicates, return all words that are formed entirely by concatenating at least two shorter words in the given array.',
    },
    answer: {
      expectedAnswer: 'Sort words by length ascending. Put words into a Set `wordSet` as we iterate. For each `word`, check if it can be formed by shorter words in `wordSet` using Word Break DP algorithm (or DFS memoization). If true, add to `result`. Then insert `word` into `wordSet`.',
      deepExplanation: 'Sorting by length guarantees that when testing `word`, `wordSet` only contains strictly shorter words. Checking word break with 1D DP `dp[i]` tests if prefix `word[0...i]` can be formed by valid words in `wordSet`.',
      productionExample: 'Used in dictionary segmentation, compound word detection in NLP tokenizers, and domain name brand analyzer tools.',
      bestPractices: [
        'Sort words by length ascending to build lookup dictionary incrementally',
        'Avoid checking empty string'
      ],
      tradeOffs: 'DP word check takes O(L^2) per word, total time O(N * L^2) where L is max word length.',
      commonMistakes: [
        'Including word itself as a component of itself (requires >= 2 shorter words)',
        'Not sorting by length causing missing component words'
      ],
      followUpQuestions: [
        'How would a Trie structure compare with a HashSet for component lookup?'
      ],
      relatedTopics: ['Trie', 'Dynamic Programming', 'Hash Set', 'String']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-588',
      questionNumber: 'DSA150-588',
      title: 'Design In-Memory File System',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Design', 'Trie', 'File System', 'String Parsing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Design an in-memory file system supporting `ls(path)`, `mkdir(path)`, `addContentToFile(filePath, content)`, and `readContentFromFile(filePath)`.',
    },
    answer: {
      expectedAnswer: 'Use a Trie-like node structure `FileNode` where each node has `isFile: boolean`, `content: string`, and `children: Map<string, FileNode>`. Traversal parses path string by splitting on `"/"`. `ls` lists sorted child keys if directory, or single file name if file. `addContentToFile` appends text content.',
      deepExplanation: 'Directories and files naturally form a tree hierarchy (Trie). Splitting paths on `"/"` navigates from root node. Standardizing directory listing to sort keys alphabetically matches POSIX file system expectations.',
      productionExample: 'Foundational architecture for virtual in-memory file systems (e.g. Node.js `memfs`, Webpack Virtual Modules plugin, browser IndexedDB virtual file systems).',
      bestPractices: [
        'Represent both directories and files with a unified FileNode tree class',
        'Sort children keys alphabetically in ls()'
      ],
      tradeOffs: 'Tree-based file system provides O(K) lookup where K is path depth, using memory proportional to stored content.',
      commonMistakes: [
        'Not handling root directory "/" path properly',
        'Replacing file content instead of appending in addContentToFile'
      ],
      followUpQuestions: [
        'How would you add support for symbolic links or file deletion (rm)?'
      ],
      relatedTopics: ['Design', 'Trie', 'Data Structures', 'File System']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-632',
      questionNumber: 'DSA150-632',
      title: 'Smallest Range Covering Elements from K Lists',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Min Heap', 'Sliding Window', 'Priority Queue', 'Two Pointers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given k sorted lists of integers, find the smallest range [a, b] that includes at least one number from each of the k lists.',
    },
    answer: {
      expectedAnswer: 'Use Min-Heap storing `[value, listIndex, elementIndex]`. Push 1st element of each of the `k` lists into heap. Track current `maxVal`. In loop: extract min element `minVal` from heap. Current range is `[minVal, maxVal]`. Update best range if `maxVal - minVal` is smaller. Push next element from `minVal`\'s list into heap and update `maxVal`. Stop when any list is exhausted.',
      deepExplanation: 'Min-Heap keeps track of the smallest element among current heads of all `k` lists, while `maxVal` tracks the largest. The interval `[minVal, maxVal]` covers at least one number from every list. Advancing the minimum element shrinks/shifts the range towards optimal smallest span.',
      productionExample: 'Used in multi-stream sensor data synchronization and logs timeline alignment across distributed clusters.',
      bestPractices: [
        'Track maxVal dynamically when pushing new elements to Min-Heap',
        'Terminate immediately when any single list has no remaining elements'
      ],
      tradeOffs: 'Min-Heap approach operates in O(N log K) time and O(K) space where N is total elements across K lists.',
      commonMistakes: [
        'Continuing loop after one list is exhausted (can no longer cover all K lists)',
        'Not handling tie-breaking on range length comparisons correctly'
      ],
      followUpQuestions: [
        'How could this be solved using a Sliding Window over a merged list?'
      ],
      relatedTopics: ['Min Heap', 'Sliding Window', 'Priority Queue']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-715',
      questionNumber: 'DSA150-715',
      title: 'Range Module',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Interval Tree', 'Binary Search', 'Segment Tree', 'Data Structure Design'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Design a Range Module supporting `addRange(left, right)`, `queryRange(left, right)`, and `removeRange(left, right)` over half-open intervals [left, right).',
    },
    answer: {
      expectedAnswer: 'Maintain a list of disjoint, sorted half-open intervals `[start, end)`. `addRange`: find all overlapping/adjacent intervals, merge them into single expanded interval `[min(left, ...), max(right, ...)]`, replace overlaps. `removeRange`: find overlapping intervals, truncate or split intervals that cross remove boundaries. `queryRange`: binary search to verify if input interval is fully contained inside a single existing range.',
      deepExplanation: 'Using sorted disjoint intervals ensures that range merging and removal keep the list clean and ordered. Binary search (`binary search / bisect`) enables O(log N) point/range containment checking.',
      productionExample: 'Used in memory allocation page tables, disk space block allocators, and calendar availability reservation systems.',
      bestPractices: [
        'Keep interval array strictly sorted and non-overlapping',
        'Use binary search for range queries'
      ],
      tradeOffs: 'Disjoint list approach achieves O(N) add/remove and O(log N) query. Segment Tree / Balanced BST achieves O(log N) for all operations.',
      commonMistakes: [
        'Forgetting that half-open interval [10, 20) does not include 20',
        'Not handling splitting an internal range into two during removeRange'
      ],
      followUpQuestions: [
        'How would a Segment Tree or Treap improve addRange/removeRange time complexity?'
      ],
      relatedTopics: ['Intervals', 'Binary Search', 'Segment Tree', 'Design']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-759',
      questionNumber: 'DSA150-759',
      title: 'Employee Free Time',
      difficulty: 'Hard',
      companies: ['Airbnb', 'Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Intervals', 'Min Heap', 'Sweep Line', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given working schedule of all employees represented as non-overlapping intervals in sorted order, return list of finite common free time intervals for all employees.',
    },
    answer: {
      expectedAnswer: 'Flatten all employee interval schedules into a single list of intervals. Sort by start time. Iterate through sorted intervals maintaining `prevEnd`. If current interval `start > prevEnd`, a common free interval `[prevEnd, start]` is found. Update `prevEnd = max(prevEnd, current.end)`.',
      deepExplanation: 'Any gap between merged working intervals represents a time when NO employee is working (common free time). Merging working intervals converts the problem to finding gaps between disjoint merged intervals.',
      productionExample: 'Core algorithm behind calendar scheduling tools (Google Calendar / Outlook "Find a Meeting Time" feature).',
      bestPractices: [
        'Merge intervals first to simplify gap detection',
        'Ignore infinite free time before first start and after last end'
      ],
      tradeOffs: 'Flatten & sort approach runs in O(N log N) time; Min-Heap k-way merge runs in O(N log K) time where K is employee count.',
      commonMistakes: [
        'Including boundary gaps (-infinity to first start or last end to +infinity)',
        'Not updating prevEnd using Math.max'
      ],
      followUpQuestions: [
        'How to optimize if each employee\'s schedule is already sorted using a Min-Heap?'
      ],
      relatedTopics: ['Intervals', 'Min Heap', 'Sorting']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-778',
      questionNumber: 'DSA150-778',
      title: 'Swim in Rising Water',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Dijkstra', 'Binary Search', 'Union Find', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'In an n x n grid, elevation at (r, c) is grid[r][c]. Rain falls such that water depth at time t is t. Find min time t to reach (n-1, n-1) starting from (0, 0).',
    },
    answer: {
      expectedAnswer: 'Use Modified Dijkstra\'s Algorithm or Binary Search + BFS. With Dijkstra: Min-Heap stores `[maxElevation, r, c]`. Start at `(0, 0)` with `maxElevation = grid[0][0]`. Pop min node: if `(r, c) === (n-1, n-1)`, return `maxElevation`. For neighbors, `nextMax = max(maxElevation, grid[nr][nc])`. Push to heap if unvisited.',
      deepExplanation: 'Path cost is defined as the maximum cell elevation encountered along the path (minimax path problem). Modified Dijkstra efficiently finds the path that minimizes this bottleneck maximum elevation.',
      productionExample: 'Used in pathfinding with elevation/height constraints, flood simulation modeling, and latency-bounded network routing.',
      bestPractices: [
        'Track path bottleneck as max(current_max, cell_elevation)',
        'Use boolean visited grid to avoid redundant node processing'
      ],
      tradeOffs: 'Dijkstra approach runs in O(N^2 log N) time; Binary Search on time t + BFS runs in O(N^2 log(max_elevation)).',
      commonMistakes: [
        'Accumulating cell values as sum instead of finding maximum elevation bottleneck'
      ],
      followUpQuestions: [
        'How would you solve this using Union-Find by adding cell thresholds in sorted order?'
      ],
      relatedTopics: ['Dijkstra', 'Binary Search', 'Graph', 'Union Find']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-895',
      questionNumber: 'DSA150-895',
      title: 'Maximum Frequency Stack',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google'],
      frequency: 4,
      category: 'stack',
      part: 'DSA',
      concepts: ['Design', 'Hash Map', 'Stack', 'Frequency Map'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Design a stack-like data structure `FreqStack` that pushes integers and pops the most frequent element. If tie, pop the element closest to top of stack.',
    },
    answer: {
      expectedAnswer: 'Maintain `freqMap: Map<val, count>`, `groupMap: Map<count, Stack<val>>`, and `maxFreq: number`. `push(x)`: increment `x`\'s count in `freqMap`, update `maxFreq = max(maxFreq, count)`, push `x` onto `groupMap[count]` stack. `pop()`: pop top item `x` from `groupMap[maxFreq]`, decrement `x`\'s count in `freqMap`. If `groupMap[maxFreq]` is empty, decrement `maxFreq`. Return `x`.',
      deepExplanation: 'By maintaining a stack of values for *each* frequency level, pushing an element adds it to its new frequency level stack. Popping from `groupMap[maxFreq]` automatically selects the most recent element that achieved that maximum frequency, handling ties in O(1) time without priority queues.',
      productionExample: 'Used in LFU cache eviction strategies, prioritized event log processing, and multi-tier priority job dispatchers.',
      bestPractices: [
        'Achieve O(1) time for both push and pop using frequency-indexed stacks',
        'Avoid heap sorting overhead'
      ],
      tradeOffs: 'Frequency-indexed stacks achieve O(1) push and O(1) pop time vs Max-Heap O(log N) push/pop.',
      commonMistakes: [
        'Using Max-Heap with timestamp (heap pop takes O(log N) time instead of O(1))',
        'Not decrementing maxFreq when highest frequency stack becomes empty'
      ],
      followUpQuestions: [
        'How does FreqStack guarantee O(1) push and pop time complexity?'
      ],
      relatedTopics: ['Design', 'Hash Map', 'Stack', 'O(1) Data Structure']
    }
  },
  {
    detail: {
      id: 'dsa-150-hard-1235',
      questionNumber: 'DSA150-1235',
      title: 'Maximum Profit in Job Scheduling',
      difficulty: 'Hard',
      companies: ['DoorDash', 'Google', 'Amazon'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Binary Search', 'Interval Scheduling'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years',
      question: 'Given n jobs where job i starts at startTime[i], ends at endTime[i], and yields profit[i], return max profit such that no two jobs in subset overlap.',
    },
    answer: {
      expectedAnswer: 'Combine 1D DP with Binary Search. Zip jobs into `[start, end, profit]` and sort by `end` time ascending. Let `dp[i]` be max profit considering first `i` jobs. For job `i`: 1) Option A: skip job `i` (`dp[i-1]`). 2) Option B: take job `i` (`job.profit + dp[lastNonOverlappingIndex]`). Use binary search (`bisect`) to find `lastNonOverlappingIndex` whose `end <= job.start`. `dp[i] = max(Option A, Option B)`. Return `dp[n]`.',
      deepExplanation: 'Sorting jobs by end time enables binary search to find the latest completed job that does not overlap with the current job\'s start time. This establishes an optimal substructure for dynamic programming.',
      productionExample: 'Used in server resource scheduling, cloud instance spot-bid optimization, and ad slot revenue maximization engines.',
      bestPractices: [
        'Sort jobs by end time ascending to enable binary search',
        'Use upper_bound / binary search on end times for O(log N) lookup'
      ],
      tradeOffs: 'Sorting + DP + Binary Search runs in O(N log N) time and O(N) space.',
      commonMistakes: [
        'Sorting by start time instead of end time (makes binary search lookup inefficient)',
        'Linear search for non-overlapping job (causes TLE O(N^2))'
      ],
      followUpQuestions: [
        'How would you handle job scheduling if at most K jobs can be scheduled?'
      ],
      relatedTopics: ['Dynamic Programming', 'Binary Search', 'Intervals', 'Sorting']
    }
  }
];
