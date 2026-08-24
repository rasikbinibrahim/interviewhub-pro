// Python + DSA Interview Handbook — Module 3: Collections and Data Structures.
// Hand-authored technical questions covering lists/tuples/sets/dicts, shallow
// vs deep copy, hashability, the collections module (Counter, defaultdict,
// deque, namedtuple, OrderedDict), and classic array/hash-map coding problems.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m3-1',
    number: 'PY-M3-1',
    title: 'Lists, list comprehensions, and nested-list gotchas',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Lists',
    expectedAnswer:
      'A `list` is a mutable, ordered, dynamically-resizing array (implemented as an over-allocated contiguous array of object pointers in CPython, giving amortized O(1) append). A list comprehension `[expr for x in iterable if cond]` builds a list eagerly and is generally faster and more idiomatic than an equivalent `for` loop with `.append()`.',
    deepExplanation:
      '```python\nsquares = [x ** 2 for x in range(10) if x % 2 == 0]   # [0, 4, 16, 36, 64]\n\nmatrix = [[0] * 3 for _ in range(3)]   # correct: 3 INDEPENDENT inner lists\nbad_matrix = [[0] * 3] * 3              # WRONG: 3 references to the SAME inner list\nbad_matrix[0][0] = 1\nprint(bad_matrix)   # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] — every row changed!\n```\nWhy `[[0] * 3] * 3` is broken: the outer `* 3` repeats the SAME inner list object three times (it does not call `[0]*3` three separate times) — all three "rows" are literally the same object, so mutating one mutates all of them. `[[0]*3 for _ in range(3)]` instead evaluates `[0]*3` fresh on every loop iteration, producing three genuinely independent lists.\n\nCPython list append is amortized O(1) because the underlying array over-allocates capacity and only reallocates (copying all elements, O(n)) occasionally — `list.insert(0, x)` and `list.pop(0)`, by contrast, are O(n) because every remaining element must shift.',
    productionExample:
      'The `[[0]*3]*3` aliasing bug is a very common real-world source of "my grid/board simulation mutates every row at once" bugs in game-of-life implementations, matrix utilities, and 2D game boards — it is one of the highest-value gotchas to internalize early.',
    bestPractices: [
      'Use `[[0] * cols for _ in range(rows)]`, never `[[0] * cols] * rows`, when building a 2D grid.',
      'Prefer list comprehensions over manual `for`+`.append()` loops for simple transformations — clearer and typically faster (less bytecode overhead per iteration).',
      'Use `collections.deque` instead of `list` when you need frequent inserts/pops from the FRONT — `list.insert(0, x)`/`list.pop(0)` are O(n), `deque`\'s equivalents are O(1).',
    ],
    tradeOffs:
      'List comprehensions are faster and more idiomatic than manual loops for simple cases, but a comprehension with deeply nested conditionals/loops can become hard to read — beyond 2 levels of nesting or non-trivial branching, a regular `for` loop is usually clearer.',
    commonMistakes: [
      'Using `[[0] * n] * m` for a matrix, creating aliased rows.',
      'Using `list.insert(0, x)`/`list.pop(0)` in a hot loop, silently making an algorithm O(n²) instead of O(n) — use `deque` instead.',
      'Overusing nested comprehensions with side effects for the sake of "one-lining" code, hurting readability without a real performance win.',
    ],
    followUpQuestions: [
      'Why does `[[0]*3]*3` produce aliased rows while `[[0]*3 for _ in range(3)]` does not?',
      'What is the time complexity of `list.append()`, `list.insert(0, x)`, and `list.pop(0)`, and why do they differ?',
      'When would you reach for `collections.deque` instead of a plain `list`?',
    ],
    relatedTopics: ['Lists', 'List Comprehensions', 'Aliasing', 'deque', 'Amortized Complexity'],
  },
  {
    id: 'python-m3-2',
    number: 'PY-M3-2',
    title: 'Shallow copy vs deep copy',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Lists',
    expectedAnswer:
      'A shallow copy (`list(x)`, `x.copy()`, `x[:]`, `copy.copy(x)`) creates a new outer container but reuses references to the SAME nested/inner objects. A deep copy (`copy.deepcopy(x)`) recursively copies every nested object too, so the result is fully independent of the original at every level.',
    deepExplanation:
      '```python\nimport copy\n\noriginal = [[1, 2], [3, 4]]\nshallow = original.copy()          # or list(original), or original[:]\ndeep = copy.deepcopy(original)\n\nshallow[0].append(99)\nprint(original)   # [[1, 2, 99], [3, 4]] — shallow copy shares the INNER lists with original!\nprint(deep)       # [[1, 2], [3, 4]]  — untouched, deep copy has independent inner lists\n\nshallow.append([5, 6])   # appending to the OUTER list is fine, does not affect original\nprint(original)          # [[1, 2, 99], [3, 4]] — original\'s outer list unaffected by shallow\'s append\n```\nThe outer container IS genuinely new in a shallow copy (appending to `shallow` does not affect `original`), but every element inside it is the SAME object reference as in `original` — so mutating a NESTED mutable object (like `shallow[0].append(99)`) is visible through both. `copy.deepcopy` walks the whole object graph recursively (and correctly handles cycles/shared references within a single deepcopy call, preserving that internal sharing structure), which is why it is much more expensive.',
    productionExample:
      'Snapshotting application state for an undo/redo stack must use `deepcopy` (or an explicit reconstruction) — a shallow copy of a nested settings/document object would let a later mutation silently corrupt a "saved" snapshot, defeating the entire point of undo history.',
    bestPractices: [
      'Default to shallow copy (fast) when your data is flat (no nested mutable containers) — it is sufficient and much cheaper.',
      'Use `copy.deepcopy` only when you actually have nested mutable state AND need true independence — it is measurably slower and easy to overuse.',
      'For simple flat dict/list snapshots, `dict(d)` / `list(l)` (shallow) is usually the right, fast choice; reserve `deepcopy` for genuinely nested structures.',
    ],
    tradeOffs:
      'Shallow copy is O(n) in the top-level container size and cheap; deep copy is O(total object graph size) and can be significantly more expensive for large nested structures, plus it must handle reference cycles correctly (which it does, via a memo dict) at additional bookkeeping cost.',
    commonMistakes: [
      'Assuming `.copy()` fully isolates a nested structure, then being surprised when mutating a nested list/dict affects "the original" too.',
      'Reaching for `copy.deepcopy` by default even on flat data, paying unnecessary performance cost.',
      'Forgetting that reassigning an element (`shallow[0] = [99]`) is DIFFERENT from mutating it in place (`shallow[0].append(99)`) — the former does not affect original, the latter does.',
    ],
    followUpQuestions: [
      'Why does `shallow[0].append(99)` affect `original` but `shallow.append([5, 6])` does not?',
      'How does `copy.deepcopy` correctly handle an object graph containing a reference cycle without infinite-looping?',
      'How would you implement a custom `__deepcopy__` method for a class that manages an external resource (e.g. a file handle) that should NOT be duplicated?',
    ],
    relatedTopics: ['Shallow Copy', 'Deep Copy', 'Aliasing', 'copy module', 'Object References'],
  },
  {
    id: 'python-m3-3',
    number: 'PY-M3-3',
    title: 'Coding: Two Sum, Three Sum, and Maximum Subarray (Kadane\'s algorithm)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Arrays',
    expectedAnswer:
      'Two Sum: hash map of value->index gives O(n). Three Sum: sort first, then fix one element and two-pointer the rest for O(n²), avoiding duplicates via careful skipping. Maximum Subarray: Kadane\'s algorithm tracks the best sum ending at each position in a single O(n) pass.',
    deepExplanation:
      '```python\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}   # value -> index\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\ndef three_sum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    result = []\n    n = len(nums)\n    for i in range(n - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue   # skip duplicate first elements\n        left, right = i + 1, n - 1\n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            if total < 0:\n                left += 1\n            elif total > 0:\n                right -= 1\n            else:\n                result.append([nums[i], nums[left], nums[right]])\n                left += 1\n                right -= 1\n                while left < right and nums[left] == nums[left - 1]:\n                    left += 1   # skip duplicate second elements\n                while left < right and nums[right] == nums[right + 1]:\n                    right -= 1   # skip duplicate third elements\n    return result\n\ndef max_subarray(nums: list[int]) -> int:\n    best = current = nums[0]\n    for num in nums[1:]:\n        current = max(num, current + num)   # extend the run or start fresh at num\n        best = max(best, current)\n    return best\n```\nDry run max_subarray([-2,1,-3,4,-1,2,1,-5,4]): current/best start -2/-2; num=1: current=max(1,-1)=1, best=1; num=-3: current=max(-3,-2)=-2, best=1; num=4: current=max(4,2)=4, best=4; num=-1: current=max(-1,3)=3, best=4; num=2: current=5, best=5; num=1: current=6, best=6; num=-5: current=1, best=6; num=4: current=5, best=6 -> answer 6 (subarray [4,-1,2,1]).',
    productionExample:
      'Kadane\'s "extend or restart" pattern generalizes directly to real analytics questions like "find the most profitable contiguous time window in a daily P&L series" or "find the longest streak of positive engagement in a metrics stream" — the same single-pass, O(1)-extra-space technique applies.',
    bestPractices: [
      'For Two Sum, always reach for the O(n) hash-map approach over the O(n²) brute-force nested loop unless explicitly asked to solve with O(1) space.',
      'For Three Sum, sort first (O(n log n)) to enable the two-pointer technique and, critically, to make duplicate-skipping straightforward and correct.',
      'For Kadane\'s algorithm, handle the all-negative-numbers edge case explicitly — the correct answer is the single largest (least negative) element, not 0.',
    ],
    tradeOffs:
      'Two Sum\'s hash-map approach trades O(n) extra space for O(n) time versus the O(1)-space/O(n²)-time brute force; Three Sum\'s sort+two-pointer approach is O(n²) time / O(1) extra space (excluding output) versus a hash-set-based O(n²) alternative that avoids sorting but complicates duplicate handling.',
    commonMistakes: [
      'Solving Two Sum with a nested O(n²) loop when the hash-map O(n) solution is expected at this level.',
      'Forgetting to skip duplicate values in Three Sum, producing duplicate triplets in the result.',
      'For Kadane\'s algorithm, initializing `best`/`current` to 0 instead of `nums[0]`, giving a wrong (non-negative) answer when all numbers are negative.',
    ],
    followUpQuestions: [
      'How would Three Sum change for Four Sum, and what is the resulting time complexity?',
      'How would you return the ACTUAL subarray (not just its sum) for the Maximum Subarray problem?',
      'How would you solve Two Sum if the input array were sorted (hint: two pointers, O(1) space)?',
    ],
    relatedTopics: ['Hashing', 'Two Pointers', 'Kadane\'s Algorithm', 'Sorting', 'Arrays'],
  },
  {
    id: 'python-m3-4',
    number: 'PY-M3-4',
    title: 'Coding: rotate array, move zeros, and find the missing/duplicate number',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Arrays',
    expectedAnswer:
      'Rotate array in place uses the reverse-three-times trick for O(1) extra space. Move zeros uses a two-pointer "write index" technique. Missing/duplicate number in a 1..n range uses the sum formula (or XOR) to avoid any extra space or sorting.',
    deepExplanation:
      '```python\ndef rotate(nums: list[int], k: int) -> None:\n    n = len(nums)\n    k %= n\n    nums.reverse()\n    nums[:k] = reversed(nums[:k])\n    nums[k:] = reversed(nums[k:])\n\ndef move_zeros(nums: list[int]) -> None:\n    write = 0\n    for read in range(len(nums)):\n        if nums[read] != 0:\n            nums[write], nums[read] = nums[read], nums[write]\n            write += 1\n\ndef find_missing_number(nums: list[int]) -> int:\n    n = len(nums)   # nums contains n distinct numbers from 0..n, one is missing\n    expected_sum = n * (n + 1) // 2\n    return expected_sum - sum(nums)\n\ndef find_duplicate(nums: list[int]) -> int:\n    seen = set()\n    for num in nums:\n        if num in seen:\n            return num\n        seen.add(num)\n    return -1\n```\nDry run rotate([1,2,3,4,5,6,7], k=3): reverse all -> [7,6,5,4,3,2,1]; reverse first k=3 -> [5,6,7,4,3,2,1]; reverse remaining -> [5,6,7,1,2,3,4] — the correct right-rotation by 3.\n\nWhy "reverse three times" works: reversing the WHOLE array puts the last k elements at the front but in reversed internal order, and puts the rest at the end also reversed; re-reversing each of those two segments individually fixes their internal order while preserving the overall rotated grouping — a neat O(n) time / O(1) extra space trick that avoids allocating a second array.',
    productionExample:
      'The two-pointer "write index" pattern in `move_zeros` (compact non-zero/valid entries to the front, in place) is the same technique used to filter out soft-deleted or expired records from a fixed buffer in place, without allocating a second array — common in embedded or memory-constrained data pipelines.',
    bestPractices: [
      'For rotate-in-place, use the reverse-three-times trick for true O(1) extra space instead of slicing (`nums[:] = nums[-k:] + nums[:-k]`, which is correct but allocates a new list).',
      'Always take `k %= n` first for rotation — a rotation amount larger than the array length is otherwise wasted extra work (and `k=0` after modulo is a valid, cheap no-op case).',
      'For missing-number problems bounded to a known range (0..n), prefer the arithmetic sum-formula trick (O(n) time, O(1) space) over sorting (O(n log n)) or a hash set (O(n) space).',
    ],
    tradeOffs:
      'The sum-formula missing-number trick is elegant and O(1) space but only works for the specific "exactly one missing from a known contiguous range" problem shape; a hash-set approach is more general (works for arbitrary missing/duplicate detection) at the cost of O(n) extra space.',
    commonMistakes: [
      'Forgetting `k %= n` before rotating, causing unnecessary extra reversal passes for k > n (still correct, just wasteful).',
      'Using slicing-based rotation (`nums[k:] + nums[:k]`) when the problem explicitly requires O(1) extra space, and not being able to explain the space-complexity difference from the reverse-trick.',
      'Overflow-style bugs when summing very large ranges for the missing-number trick in languages with fixed-width integers — not an issue in Python (arbitrary precision `int`), but worth mentioning as a contrast.',
    ],
    followUpQuestions: [
      'Why does reversing the whole array, then reversing each of the two resulting segments, correctly rotate it?',
      'How would you find the missing number using XOR instead of the sum formula, and why does that work?',
      'How would you find a duplicate number in an array using O(1) extra space (hint: Floyd\'s cycle detection, treating the array as a linked list via indices)?',
    ],
    relatedTopics: ['Arrays', 'Two Pointers', 'In-Place Algorithms', 'XOR Trick', 'Cycle Detection'],
  },
  {
    id: 'python-m3-5',
    number: 'PY-M3-5',
    title: 'Coding: merge intervals and product of array except self',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Arrays',
    expectedAnswer:
      'Merge Intervals: sort by start time, then sweep and merge overlapping/adjacent intervals in one pass — O(n log n) dominated by the sort. Product Except Self: compute prefix products and suffix products in two passes (or one pass with an extra output-reuse trick) to avoid division entirely, achieving O(n) time / O(1) extra space beyond the output array.',
    deepExplanation:
      '```python\ndef merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    if not intervals:\n        return []\n    intervals.sort(key=lambda pair: pair[0])\n    merged = [intervals[0]]\n    for start, end in intervals[1:]:\n        last_end = merged[-1][1]\n        if start <= last_end:\n            merged[-1][1] = max(last_end, end)   # overlap/adjacent — extend the last merged interval\n        else:\n            merged.append([start, end])           # no overlap — start a new interval\n    return merged\n\ndef product_except_self(nums: list[int]) -> list[int]:\n    n = len(nums)\n    result = [1] * n\n    prefix = 1\n    for i in range(n):\n        result[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        result[i] *= suffix\n        suffix *= nums[i]\n    return result\n```\nDry run product_except_self([1,2,3,4]): after prefix pass, result = [1, 1, 2, 6] (product of everything BEFORE index i); after suffix pass (suffix starts 1): i=3 result[3]*=1 -> 6, suffix=4; i=2 result[2]*=4 -> 8, suffix=12; i=1 result[1]*=12 -> 12, suffix=24; i=0 result[0]*=24 -> 24 -> final [24, 12, 8, 6].\n\nWhy no division: the naive approach (`total_product // nums[i]`) breaks the moment ANY element is 0 (division by zero) or when there are multiple zeros (all outputs should be 0, but division cannot recover the right values); the prefix/suffix approach handles zeros correctly automatically because it never divides.',
    productionExample:
      'Merge Intervals is the exact algorithm behind calendar/scheduling systems computing "busy" blocks from overlapping meeting requests, and behind resource-booking systems (e.g. merging overlapping reservation windows for a conference room) before checking for a free slot.',
    bestPractices: [
      'Always sort by START time for interval-merging problems — sorting by end time or leaving unsorted breaks the single-pass sweep invariant.',
      'For Product Except Self, use the prefix/suffix technique (no division) so zeros in the input are handled correctly without special-casing.',
      'When merging, compare against `merged[-1][1]` (the END of the last MERGED interval, which may already be extended), not the end of the previous ORIGINAL interval — a subtle but common off-by-logic bug.',
    ],
    tradeOffs:
      'Merge Intervals\' O(n log n) is dominated entirely by the sort — if intervals are already known to arrive sorted (e.g. streamed in start-time order from a scheduling system), the merge itself is a cheaper O(n) pass and the sort can be skipped, an important production-relevant optimization to mention.',
    commonMistakes: [
      'Forgetting to sort intervals before merging, causing the single-pass sweep to miss legitimate overlaps that appear out of order.',
      'Using `end` instead of `max(last_end, end)` when merging, silently shrinking the merged interval if a later interval is fully contained within an earlier, larger one.',
      'Attempting Product Except Self via `total_product / nums[i]`, breaking on zero(s) in the input.',
    ],
    followUpQuestions: [
      'How would you handle Merge Intervals if intervals were streamed in and you needed the running merged set at all times, rather than a one-shot batch computation?',
      'How does Product Except Self handle an input with exactly one zero versus two or more zeros, using the prefix/suffix approach?',
      'How would you extend Merge Intervals to also report the total "busy" time covered by the merged intervals?',
    ],
    relatedTopics: ['Intervals', 'Sorting', 'Sweep Line', 'Prefix/Suffix Products', 'Arrays'],
  },
  {
    id: 'python-m3-6',
    number: 'PY-M3-6',
    title: 'Tuples: immutability, unpacking, and named tuples',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Tuples',
    expectedAnswer:
      'A `tuple` is an immutable, ordered sequence — once created its element REFERENCES cannot be reassigned (though a mutable element inside it, like a nested list, can still be mutated). Tuple unpacking (`a, b = 1, 2`) and starred unpacking (`first, *rest = [1,2,3,4]`) are core Python idioms. `collections.namedtuple` (and the modern `typing.NamedTuple`) gives tuples field NAMES while keeping tuple performance/immutability.',
    deepExplanation:
      '```python\npoint = (3, 4)\nx, y = point               # basic unpacking\n\nfirst, *middle, last = [1, 2, 3, 4, 5]\nprint(first, middle, last)   # 1 [2, 3, 4] 5\n\na, b = b, a                  # classic swap — builds a temporary tuple (b, a), then unpacks it\n\nfrom collections import namedtuple\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\np.x, p.y            # 3 4 — named field access\np[0], p[1]           # 3 4 — still works positionally, it IS a tuple\n\nfrom typing import NamedTuple\nclass ModernPoint(NamedTuple):\n    x: int\n    y: int\n```\nWhy prefer tuple over list for fixed-shape data: tuples are hashable (usable as dict keys / set members) as long as all their elements are hashable, are slightly more memory-efficient, and their immutability communicates "this is a fixed record, not a growable collection" to readers — a `(x, y)` coordinate or a `(status_code, message)` pair is conceptually a fixed-shape record, which is exactly what a tuple/namedtuple models, versus a `list` which signals "variable-length, homogeneous, growable".',
    productionExample:
      '`namedtuple`/`NamedTuple` is commonly used for lightweight, immutable value objects returned from functions (e.g. `def get_bounding_box() -> BoundingBox` returning a `BoundingBox(min_x, min_y, max_x, max_y)`), giving self-documenting field access without the overhead of a full class with `__init__`.',
    bestPractices: [
      'Use tuples (or namedtuples) for fixed-shape, heterogeneous records; use lists for variable-length, homogeneous collections.',
      'Prefer `typing.NamedTuple` over `collections.namedtuple` in new code — it supports type annotations and reads more like a regular class definition.',
      'Use starred unpacking (`first, *rest = items`) instead of manual slicing (`items[0]`, `items[1:]`) when the intent is "first element plus the rest".',
    ],
    tradeOffs:
      'Tuples are immutable and hashable but cannot grow/shrink or have elements reassigned; lists are mutable and flexible but unhashable and use slightly more memory per element for the same data — pick based on whether the collection\'s SHAPE is fixed (tuple) or variable (list).',
    commonMistakes: [
      'Trying to reassign a tuple element (`point[0] = 5`) — raises TypeError, tuples do not support item assignment.',
      'Forgetting that a tuple containing a mutable element (e.g. `([1,2], 3)`) is still itself unhashable, since hashability requires ALL elements to be hashable.',
      'Writing `(1)` expecting a one-element tuple — it is just the integer `1`; a one-element tuple needs a trailing comma: `(1,)`.',
    ],
    followUpQuestions: [
      'Why is `(1)` not a tuple, but `(1,)` is?',
      'Why can a tuple containing a list not be used as a dictionary key?',
      'What is the practical difference between `collections.namedtuple` and a `@dataclass(frozen=True)` (previewed in Module 4)?',
    ],
    relatedTopics: ['Tuples', 'Unpacking', 'namedtuple', 'Hashability', 'Immutability'],
  },
  {
    id: 'python-m3-7',
    number: 'PY-M3-7',
    title: 'Sets: union, intersection, difference, and O(1) membership',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Sets',
    expectedAnswer:
      'A `set` is an unordered collection of unique, hashable elements backed by a hash table, giving average O(1) membership testing, insertion, and deletion — dramatically faster than a list\'s O(n) `in` check for large collections. Sets support mathematical operations: union (`|`), intersection (`&`), difference (`-`), and symmetric difference (`^`).',
    deepExplanation:
      '```python\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\na | b   # {1, 2, 3, 4, 5, 6} — union\na & b   # {3, 4} — intersection\na - b   # {1, 2} — elements in a but not b\nb - a   # {5, 6} — elements in b but not a\na ^ b   # {1, 2, 5, 6} — symmetric difference (in exactly one of the two)\n\n# Membership: O(1) average for set, O(n) for list\nlarge_list = list(range(1_000_000))\nlarge_set = set(large_list)\n999_999 in large_list   # slow — scans up to the whole list\n999_999 in large_set    # fast — hash lookup\n```\nWhy sets require hashable elements: the hash table implementation needs a stable `__hash__` value to bucket elements — this is exactly why you can put tuples into a set but not lists (tuples are hashable if their contents are; lists never are, since they are mutable and mutation would invalidate a cached hash bucket).\n\n`frozenset` is the immutable counterpart, usable as a dict key or as an element of ANOTHER set — a `set` itself cannot be a set element for the same hashability reason.',
    productionExample:
      'Deduplicating a large stream of user IDs, or computing "users who did A AND B" (intersection) vs "users who did A but not B" (difference) for a funnel/cohort analysis, are direct, everyday production uses of set operations — far more efficient and readable than the equivalent nested-loop list logic.',
    bestPractices: [
      'Convert a list to a `set` before doing repeated membership checks in a loop — this alone turns an O(n²) algorithm into O(n).',
      'Use `frozenset` when you need an immutable/hashable set (e.g. as a dict key, or as an element of another set).',
      'Prefer set operations (`|`, `&`, `-`, `^`) over manual loops for computing unions/intersections/differences — clearer intent and implemented in C.',
    ],
    tradeOffs:
      'Sets give O(1) average membership at the cost of losing ORDER and losing DUPLICATES — appropriate only when uniqueness matters and order does not; use a list (or `dict.fromkeys()` for order-preserving deduplication) when either of those properties is required.',
    commonMistakes: [
      'Using `in` on a list inside a loop for repeated membership checks, silently making an algorithm O(n²) when a `set` would make it O(n).',
      'Assuming a `set` preserves insertion order — it does not (unlike `dict`, which has preserved insertion order since Python 3.7).',
      'Trying to put an unhashable object (like a list or dict) into a set and hitting `TypeError: unhashable type`.',
    ],
    followUpQuestions: [
      'What is the average and worst-case time complexity of set membership testing, and when does the worst case occur?',
      'How would you deduplicate a list WHILE preserving original order (hint: `dict.fromkeys`)?',
      'Why can a `frozenset` be an element of another set, but a regular `set` cannot?',
    ],
    relatedTopics: ['Sets', 'Hash Tables', 'frozenset', 'Set Operations', 'Deduplication'],
  },
  {
    id: 'python-m3-8',
    number: 'PY-M3-8',
    title: 'Dictionaries: hash tables, hashability, and dictionary comprehensions',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Dictionaries',
    expectedAnswer:
      'A `dict` is a hash table mapping hashable keys to arbitrary values, with average O(1) get/set/delete, and has preserved insertion order since Python 3.7 (an official language guarantee since 3.7, CPython implementation detail since 3.6). Keys must be hashable (so must effectively be immutable — `str`, `int`, `tuple`-of-hashables, but not `list`/`dict`/`set`).',
    deepExplanation:
      '```python\nscores = {"Ada": 95, "Bo": 88}\nscores["Cy"] = 91                 # O(1) average insert\nscores.get("Zed", 0)              # 0 — safe default, no KeyError\nscores["Zed"]                     # KeyError — direct access raises if missing\n\nsquares = {x: x**2 for x in range(5)}   # {0:0, 1:1, 2:4, 3:9, 4:16} — dict comprehension\n\nnested = {"user": {"name": "Ada", "roles": ["admin"]}}\n\nfor key, value in scores.items():   # iterate key-value pairs\n    print(key, value)\n\nlist(scores.keys())     # dict_keys view — reflects LIVE changes to scores\n```\nWhy hashability matters for keys: CPython computes `hash(key)` to find the key\'s bucket; if the key were mutable and its hash could change after insertion, the dict could never find it again (the bucket it now hashes to would differ from the bucket it was actually stored in) — this is exactly why `list`/`dict`/`set` cannot be dict keys but `tuple`/`str`/`int`/`frozenset` can.\n\n`dict.get(key, default)` vs `dict[key]` vs `dict.setdefault(key, default)`: `.get` reads safely with a fallback; `[key]` raises KeyError if missing; `.setdefault` reads AND writes the default into the dict if the key is missing (useful for building grouped structures, though `collections.defaultdict` is usually cleaner for that specific pattern).',
    productionExample:
      'A dict is the default in-memory representation for JSON payloads in every Python web framework (FastAPI/Django/Flask) — request/response bodies deserialize directly into (nested) dicts, so understanding dict semantics (ordering, hashability, `.get` vs `[]`) is directly load-bearing for everyday backend work, not just interview trivia.',
    bestPractices: [
      'Use `dict.get(key, default)` instead of a try/except KeyError pattern for simple default-value lookups — clearer and faster for the common case.',
      'Use `collections.defaultdict` instead of manual `if key not in d: d[key] = []` boilerplate when building grouped/bucketed structures.',
      'Iterate with `.items()` when you need both key and value — avoid `for key in d: value = d[key]`, which does an extra unnecessary lookup.',
    ],
    tradeOffs:
      'Dicts give O(1) average access at the cost of extra memory overhead per entry (hash table bucket bookkeeping) compared to a plain list/array — appropriate whenever lookups by a meaningful key matter more than raw memory compactness or numeric-index access.',
    commonMistakes: [
      'Accessing a possibly-missing key with `d[key]` instead of `.get()`/`in` checks, causing an uncaught KeyError in production.',
      'Mutating a dict WHILE iterating over it directly (`for k in d: del d[k]`), which raises `RuntimeError: dictionary changed size during iteration` — iterate over `list(d.keys())` instead if mutation during iteration is required.',
      'Trying to use a `list` as a dict key and hitting `TypeError: unhashable type: \'list\'`.',
    ],
    followUpQuestions: [
      'Why must dictionary keys be hashable, and what would break if a mutable object were allowed as a key and then mutated after insertion?',
      'What is the difference between `dict.get(key, default)` and `dict.setdefault(key, default)`?',
      'Why does mutating a dict\'s size while iterating over it raise a RuntimeError, and how would you safely delete matching keys during iteration?',
    ],
    relatedTopics: ['Dictionaries', 'Hash Tables', 'Hashability', 'dict comprehension', 'defaultdict'],
  },
  {
    id: 'python-m3-9',
    number: 'PY-M3-9',
    title: 'Coding: character/number frequency counting and group anagrams',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Hashing',
    expectedAnswer:
      'Frequency counting is the direct application of `collections.Counter`. Group Anagrams uses each word\'s SORTED-character tuple (or a character-count signature) as a dict key so that all anagrams of each other collide into the same bucket, giving an O(n·k log k) solution (n words, average length k).',
    deepExplanation:
      '```python\nfrom collections import Counter, defaultdict\n\ndef char_frequency(s: str) -> Counter:\n    return Counter(s)\n\ndef group_anagrams(words: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    for word in words:\n        key = "".join(sorted(word))   # anagrams share the same sorted-character key\n        groups[key].append(word)\n    return list(groups.values())\n\ngroup_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])\n# [[\'eat\', \'tea\', \'ate\'], [\'tan\', \'nat\'], [\'bat\']]\n```\nDry run: "eat"->key "aet", "tea"->key "aet" (same bucket as "eat"), "tan"->key "ant", "ate"->key "aet" (joins "eat"/"tea"), "nat"->key "ant" (joins "tan"), "bat"->key "abt" (new bucket) -> three groups as shown.\n\nAlternative key without sorting: a 26-length character-count TUPLE (`tuple(Counter(word)[c] for c in "abcdefghijklmnopqrstuvwxyz")`) avoids the O(k log k) sort per word, trading it for an O(k) count pass — better asymptotically for long words, though the sorted-string key is simpler to write and usually fine in interviews.',
    productionExample:
      'The "canonical signature as dict key" pattern (sorted characters here) generalizes to deduplicating near-identical records by a normalized fingerprint — e.g. grouping product listings that are the same item with reordered title words, or grouping log lines that are structurally identical but with different variable values.',
    bestPractices: [
      'Use `collections.Counter` for any frequency-counting need instead of manually incrementing a plain dict — it is more concise and handles missing keys (defaults to 0) automatically.',
      'For Group Anagrams, prefer the character-count-tuple key over the sorted-string key when words can be long, since it avoids the O(k log k) sort per word.',
      'Use `collections.defaultdict(list)` to avoid manual `if key not in groups: groups[key] = []` boilerplate when building grouped output.',
    ],
    tradeOffs:
      'The sorted-string key is simpler to write and reason about but costs O(k log k) per word; the character-count-tuple key costs O(k) per word (better for long words) but is more verbose and slightly less intuitive to read at a glance — a real "simplicity vs asymptotic optimality" trade-off worth naming explicitly in an interview.',
    commonMistakes: [
      'Manually incrementing a plain `dict` for frequency counting (`d[c] = d.get(c, 0) + 1`) when `Counter(s)` does the same thing more concisely and just as fast (both are C-optimized internally).',
      'Using a mutable `list` as a dict key when trying to group by a computed "signature" — must join/tuple it into something hashable first.',
      'Comparing words directly with `sorted(a) == sorted(b)` for EVERY pair (O(n²) overall) instead of bucketing by key in one O(n) pass.',
    ],
    followUpQuestions: [
      'How would you implement Group Anagrams without sorting each word, using character counts instead — what is the resulting complexity?',
      'How would you find the most frequent word across many large documents without loading everything into memory at once?',
      'How would you detect anagrams that also ignore case and whitespace (e.g. "Dormitory" and "Dirty Room")?',
    ],
    relatedTopics: ['Hashing', 'Counter', 'defaultdict', 'Anagrams', 'Signature Keys'],
  },
  {
    id: 'python-m3-10',
    number: 'PY-M3-10',
    title: 'The collections module: Counter, defaultdict, deque, namedtuple, OrderedDict',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Collections Module',
    expectedAnswer:
      '`collections` provides specialized, C-optimized alternatives to plain `dict`/`list` for common patterns: `Counter` (frequency counting with convenience methods like `.most_common()`), `defaultdict` (auto-initializes missing keys via a factory function), `deque` (O(1) append/pop from BOTH ends, unlike `list`\'s O(n) at the front), `namedtuple` (lightweight immutable records), and `OrderedDict` (explicit ordering guarantees + `move_to_end`, largely superseded for plain iteration order by dict\'s own 3.7+ guarantee but still useful for its extra methods and explicit intent).',
    deepExplanation:
      '```python\nfrom collections import Counter, defaultdict, deque, OrderedDict\n\nc = Counter("mississippi")\nc.most_common(2)              # [(\'i\', 4), (\'s\', 4)] — top-2 most frequent\nc["z"]                          # 0 — Counter never raises KeyError, missing keys default to 0\n\ngroups = defaultdict(list)\ngroups["a"].append(1)           # no need to check/initialize "a" first\n\nq = deque(maxlen=3)              # a bounded ring buffer — great for "last N events"\nfor i in range(5):\n    q.append(i)\nprint(q)                          # deque([2, 3, 4], maxlen=3) — oldest auto-evicted\n\nq2 = deque([1, 2, 3])\nq2.appendleft(0)                 # O(1) — a plain list would need O(n) insert(0, ...)\n\nod = OrderedDict()\nod["a"] = 1\nod["b"] = 2\nod.move_to_end("a")               # explicit reordering, no plain-dict equivalent\n```\nWhy `deque` matters for complexity: `list.insert(0, x)`/`list.pop(0)` shift every remaining element (O(n)); `deque` is implemented as a doubly-linked list of fixed-size blocks, giving O(1) operations at BOTH ends — this is the standard choice for queues, sliding-window algorithms, and BFS traversal (Module 8).',
    productionExample:
      '`deque(maxlen=N)` is the idiomatic, zero-boilerplate way to implement a "keep the last N events/log lines" ring buffer in a monitoring or debugging tool; `Counter.most_common(k)` is the direct one-liner for "top-k most frequent items" dashboards (most-viewed pages, most-common error codes) without hand-rolling a sort-and-slice.',
    bestPractices: [
      'Use `deque` (not `list`) for any queue/FIFO or sliding-window algorithm — the O(n) front-operations on `list` are a common accidental-quadratic-complexity bug.',
      'Use `Counter.most_common(k)` instead of manually sorting a frequency dict\'s items by value.',
      'Use `defaultdict(list)`/`defaultdict(int)` for grouping/counting instead of `dict.setdefault` boilerplate — clearer intent, same or better performance.',
    ],
    tradeOffs:
      '`deque` gives O(1) operations at both ends but loses O(1) random-index access in the middle (still O(n) like a linked list, unlike a `list`\'s O(1) index access) — choose based on which access pattern (ends vs random index) your algorithm actually needs.',
    commonMistakes: [
      'Using `list.pop(0)` in a loop to implement a queue, silently making the algorithm O(n²) instead of O(n) with `deque.popleft()`.',
      'Manually implementing "keep only the last N items" logic instead of using `deque(maxlen=N)`, which does it automatically and efficiently.',
      'Forgetting `Counter` arithmetic operators exist (`counter_a + counter_b`, `counter_a - counter_b`) and reimplementing frequency merging/diffing manually.',
    ],
    followUpQuestions: [
      'Why is `deque` O(1) for append/pop at both ends while `list` is only O(1) at the right end?',
      'How would you implement a sliding-window maximum using `deque` (a preview of the Module 8 sliding-window pattern)?',
      'What is the practical difference between `OrderedDict` and a plain `dict` in modern Python (3.7+)?',
    ],
    relatedTopics: ['collections module', 'Counter', 'defaultdict', 'deque', 'namedtuple', 'OrderedDict'],
  },
];

export const MOCK_PYTHON_MODULE3_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
