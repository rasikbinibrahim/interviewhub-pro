// Python + DSA Interview Handbook — Module 1: Python Fundamentals.
// Hand-authored technical questions covering the Python language core:
// interpreter/execution model, variables & data types, operators, strings
// (with coding problems worked in Python), conditions, loops, and I/O.
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
    id: 'python-m1-1',
    number: 'PY-M1-1',
    title: 'CPython, PyPy, and how Python actually executes',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      'Python is a dynamically typed, interpreted, garbage-collected language. "Python" is a language specification; CPython is the reference implementation (written in C) that most people mean when they say "Python". Source (.py) is compiled to platform-independent bytecode (cached in __pycache__/*.pyc), which the CPython virtual machine interprets frame-by-frame. PyPy is an alternative implementation with a JIT compiler that is often much faster for long-running CPU-bound pure-Python code.',
    deepExplanation:
      'Execution pipeline in CPython:\n\n```text\nsource.py\n  -> tokenizer -> AST\n  -> compiled to bytecode (.pyc, cached under __pycache__/)\n  -> executed by the CPython bytecode interpreter (a stack machine)\n```\n\nYou can inspect the bytecode directly:\n\n```python\nimport dis\n\ndef add(a, b):\n    return a + b\n\ndis.dis(add)\n# LOAD_FAST a\n# LOAD_FAST b\n# BINARY_ADD\n# RETURN_VALUE\n```\n\nOther implementations solve different problems: PyPy trades startup time and memory for JIT speed on hot loops; Jython/IronPython target the JVM/.NET to interoperate with those ecosystems; MicroPython targets microcontrollers. For a backend interview, the practical takeaway is: CPython bytecode execution + the GIL (see the concurrency module) explain most of Python\\\n\nStep 1 — Understand the topic.\nTopic: CPython, PyPy, and how Python actually executes\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Production teams pick CPython by default (widest library/ecosystem compatibility — most C extensions like numpy/psycopg2 only support CPython\\\n\nCoding practice: first explain the core/manual approach for **CPython, PyPy, and how Python actually executes**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Default to CPython unless a specific, measured bottleneck justifies PyPy.',
      'Delete stale __pycache__ only when debugging weird stale-bytecode issues — do not hand-edit .pyc files.',
      'Use `dis` or `python -X importtime` when you need to reason about what is actually happening at the bytecode/import level, instead of guessing.',
      'Pin the Python version in production (e.g. via pyproject.toml `requires-python`) since bytecode and semantics change across minor versions.',
    ],
    tradeOffs:
      'CPython: best ecosystem compatibility, simple reference-counted GC, but slower for tight CPU-bound pure-Python loops. PyPy: much faster JIT execution for long-running pure-Python code, but slower startup, higher memory for short scripts, and incomplete C-extension support.',
    commonMistakes: [
      'Assuming ".pyc" files are portable across Python versions or platforms — they are not.',
      'Believing "Python is always slow" without distinguishing interpreter overhead (per-line dispatch) from I/O-bound work, which is fast regardless of implementation.',
      'Switching to PyPy for an I/O-bound web service and being surprised there is no meaningful speedup.',
    ],
    followUpQuestions: [
      'What is the difference between the Python language and CPython the implementation?',
      'What does `.pyc` caching actually save you, and when does it get invalidated?',
      'Why would a CPU-bound simulation benefit from PyPy but a Django API server usually would not?',
      'How would you profile a Python service to decide whether the interpreter is even the bottleneck?',
    ],
    relatedTopics: ['CPython', 'PyPy', 'Bytecode', 'dis module', 'GIL', 'Interpreter'],
  },
  {
    id: 'python-m1-2',
    number: 'PY-M1-2',
    title: 'Dynamic typing, strong typing, and duck typing',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      'Python is dynamically typed (a variable\'s type is resolved at runtime and can change what object it refers to) and strongly typed (it will not silently coerce incompatible types, e.g. `"1" + 1` raises TypeError). Duck typing means Python cares about what an object can do (its methods/protocol), not its declared type: "if it walks like a duck and quacks like a duck, treat it like a duck."',
    deepExplanation:
      'A name binding is just a reference to an object; the object carries the type, not the variable:\n\n```python\nx = 5        # x refers to an int object\nx = "hello"  # x now refers to a str object — legal, no declaration needed\n```\n\nStrong typing means Python will not implicitly convert between unrelated types:\n\n```python\n>>> "1" + 1\nTypeError: can only concatenate str (not "int") to str\n```\n\n(Contrast with JavaScript, which is weakly typed and would coerce this to `"11"`.)\n\nDuck typing shows up constantly in idiomatic Python — e.g. `for x in obj` works on anything implementing `__iter__`/`__getitem__`, and `len(obj)` works on anything implementing `__len__`, regardless of the object\\\n\nStep 1 — Understand the topic.\nTopic: Dynamic typing, strong typing, and duck typing\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A function that accepts "anything file-like" (`read()` method) rather than requiring a concrete `File` class is duck typing in production: it lets you pass an actual file, an `io.BytesIO`, or a mocked test double interchangeably, as long as they expose the same method surface.\n\nCoding practice: first explain the core/manual approach for **Dynamic typing, strong typing, and duck typing**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use type hints (`mypy`/`pyright`) to get static-typing-like safety without giving up dynamic flexibility.',
      'Prefer `isinstance()` checks against abstract base classes (e.g. `collections.abc.Iterable`) over checking concrete types, to keep duck-typing benefits.',
      'Do not rely on implicit coercion between numeric and string types — convert explicitly.',
    ],
    tradeOffs:
      'Dynamic + duck typing gives flexibility and fast iteration but pushes more errors to runtime; static analysis tools (mypy) claw back some of that safety at the cost of extra tooling and annotation discipline.',
    commonMistakes: [
      'Confusing "dynamically typed" with "weakly typed" — Python is both dynamic AND strong.',
      'Writing `isinstance(x, list)` when the function really just needs anything iterable, unnecessarily narrowing what callers can pass.',
      'Assuming type hints are enforced at runtime — by default they are not; they are purely for static tools/documentation unless you add explicit runtime validation (e.g. pydantic).',
    ],
    followUpQuestions: [
      'What is the difference between dynamic typing and weak typing? Give a language example of each combination.',
      'How do type hints interact with the interpreter at runtime?',
      'How would you enforce runtime type validation for an API boundary in Python (hint: pydantic/dataclasses + validators)?',
    ],
    relatedTopics: ['Dynamic Typing', 'Duck Typing', 'Type Hints', 'mypy', 'Protocols'],
  },
  {
    id: 'python-m1-3',
    number: 'PY-M1-3',
    title: 'Mutable vs immutable objects',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      'Immutable objects (`int`, `float`, `bool`, `str`, `tuple`, `frozenset`, `bytes`) cannot be changed after creation — any "modification" creates a new object. Mutable objects (`list`, `dict`, `set`, `bytearray`, most user-defined objects) can be changed in place, so multiple references to the same object see each other\'s changes.',
    deepExplanation:
      '```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)  # [1, 2, 3, 4] — a and b point to the SAME list object\n\ns = "hi"\nt = s\nt += "!"\nprint(s)  # "hi" — string concatenation creates a NEW string; s is untouched\n```\n\n`id()` reveals this: `id(a) == id(b)` for the list case (same object), while for the string case a new object is created and `t` is rebound to it. This has real correctness implications for default mutable arguments (module 2), dict/set keys (must be hashable, so must be immutable in practice), and thread-safety reasoning (immutable objects are trivially safe to share across threads).\n\nStep 1 — Understand the topic.\nTopic: Mutable vs immutable objects\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Config objects are often modeled as frozen dataclasses or namedtuples specifically to make them immutable — once built, no code path can silently mutate shared config and cause a hard-to-reproduce bug in a long-running service.\n\nCoding practice: first explain the core/manual approach for **Mutable vs immutable objects**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Prefer immutable types (tuple, frozenset, frozen dataclass) for values that represent fixed facts (coordinates, config, cache keys).',
      'Never use a mutable default argument (`def f(x=[])`) — covered in depth in Module 2.',
      'Use `copy.deepcopy` only when you actually need an independent nested structure; it is expensive and easy to overuse.',
    ],
    tradeOffs:
      'Immutability buys safety (no aliasing bugs, hashable, thread-safe to share) at the cost of allocating a new object per "change", which can matter in hot loops (e.g. building a large string with `+=` in a loop is O(n²); use `str.join` or a list buffer instead).',
    commonMistakes: [
      'Assuming `b = a` copies a mutable object — it only copies the reference.',
      'Trying to use a `list` as a `dict` key and being surprised by `TypeError: unhashable type`.',
      'Building large strings with repeated `+=` in a loop, causing quadratic behavior because each `+=` allocates a new string.',
    ],
    followUpQuestions: [
      'What is the time complexity of building a 1,000,000-character string with `+=` in a loop, and how do you fix it?',
      'Why must dictionary keys be immutable/hashable?',
      'What is the difference between `copy.copy` and `copy.deepcopy`, and when does shallow copy silently share nested mutable state?',
    ],
    relatedTopics: ['Mutability', 'Hashability', 'Aliasing', 'copy module', 'Reference Semantics'],
  },
  {
    id: 'python-m1-4',
    number: 'PY-M1-4',
    title: 'Python\'s built-in type system: numbers, str/bytes, and collections at a glance',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      'Numeric types are `int` (arbitrary precision, no overflow), `float` (IEEE-754 double), `complex`, and `bool` (a subclass of `int` where `True == 1`). Text is `str` (immutable sequence of Unicode code points); binary data is `bytes` (immutable) and `bytearray` (mutable). `None` is the singleton null value. Core collections are `list` (mutable, ordered), `tuple` (immutable, ordered), `set`/`frozenset` (unordered, unique, hashable-elements-only), and `dict` (ordered since 3.7, key→value hash map).',
    deepExplanation:
      '```python\ntype(True)          # <class \\\n\nStep 1 — Understand the topic.\nTopic: Python\\\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Financial/money calculations in production should never use `float` (rounding errors compound); use `decimal.Decimal` or integer minor units (cents) instead. This is a very common senior-interview trap: "how would you represent currency in Python?"\n\nCoding practice: first explain the core/manual approach for **Python\\**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `decimal.Decimal` for money; never `float`.',
      'Use `bytes`/`bytearray` deliberately for binary/network data; do not conflate them with `str` (Python 3 keeps text and bytes strictly separate, unlike Python 2).',
      'Prefer `is None` / `is not None` over `== None` (None has a single canonical identity).',
    ],
    tradeOffs:
      '`int`\'s arbitrary precision avoids overflow bugs but is slower than fixed-width machine integers for heavy numeric workloads (where numpy/C extensions are used instead).',
    commonMistakes: [
      'Comparing floats with `==` instead of `math.isclose()`.',
      'Using `float` for money and being surprised by `0.1 + 0.2 != 0.3`.',
      'Forgetting `bool` is a subclass of `int`, leading to confusing dict-key collisions between `True`/`1` or `False`/`0`.',
    ],
    followUpQuestions: [
      'Why does `0.1 + 0.2 == 0.3` evaluate to False in Python?',
      'How would you store and manipulate currency values safely?',
      'What is the practical difference between `bytes` and `str`, and when do you need `.encode()`/`.decode()`?',
    ],
    relatedTopics: ['Numeric Types', 'IEEE-754', 'Decimal', 'bytes vs str', 'Encoding'],
  },
  {
    id: 'python-m1-5',
    number: 'PY-M1-5',
    title: '`==` vs `is`, and operator precedence traps',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      '`==` calls `__eq__` and checks value equality; `is` checks object identity (same memory address / `id()`). Use `is` only for singletons (`None`, and carefully, `True`/`False`), never for value comparison of numbers/strings, because CPython\'s small-int/string interning is an implementation detail, not a language guarantee.',
    deepExplanation:
      '```python\na = 1000\nb = 1000\nprint(a == b)  # True\nprint(a is b)  # False in general (outside the -5..256 small-int cache)\n\nx = 100\ny = 100\nprint(x is y)  # True — small ints are cached/interned by CPython, but this is an implementation detail\n```\n\nThis is a classic interview gotcha: relying on `is` for integer comparison "happens to work" for small numbers in CPython because of internal caching, and then breaks for larger numbers or on other implementations. Operator precedence follows a well-defined table (exponent > unary > multiplicative > additive > bitwise shift > comparison/`in`/`is` > boolean `not` > `and` > `or`), and mixing bitwise (`&`, `|`) with comparison without parentheses is a very common bug: `if a == 1 & b == 2` does NOT do what people expect because `&` binds tighter than `==`.\n\nStep 1 — Understand the topic.\nTopic: `==` vs `is`, and operator precedence traps\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A real production bug pattern: `if flags & PERMISSION_READ == PERMISSION_READ:` silently misbehaves without parentheses because of precedence; the fix is `if (flags & PERMISSION_READ) == PERMISSION_READ:`.\n\nCoding practice: first explain the core/manual approach for **`==` vs `is`, and operator precedence traps**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `is`/`is not` exclusively for `None` checks and true singleton comparisons.',
      'Use `==` for all value equality (numbers, strings, custom objects implementing `__eq__`).',
      'Parenthesize bitwise operations mixed with comparisons — never rely on precedence memory in review-critical code.',
    ],
    tradeOffs: 'N/A — this is a correctness/readability issue, not a performance trade-off.',
    commonMistakes: [
      'Using `if x is 1000:` and having it silently fail outside the small-int cache range.',
      'Writing `a and b or c` as a ternary substitute, which breaks silently when `b` is falsy.',
      'Forgetting `and` binds tighter than `or`, changing the meaning of unparenthesized boolean chains.',
    ],
    followUpQuestions: [
      'Why does `a is b` sometimes return True for integers and sometimes False?',
      'What does `and`/`or` return in Python (hint: not necessarily a bool)?',
      'Write a case where `a and b or c` gives the wrong result compared to `b if a else c`.',
    ],
    relatedTopics: ['Identity vs Equality', 'Operator Precedence', 'Small Int Caching', 'String Interning'],
  },
  {
    id: 'python-m1-6',
    number: 'PY-M1-6',
    title: 'Coding: Reverse a string and check for palindrome',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Strings',
    expectedAnswer:
      'Reversing: Python strings are immutable sequences, so "reversing in place" is not possible — you build a new string, either via slicing `s[::-1]` (Pythonic, O(n)) or manually with two pointers for the algorithmic version interviewers often want to see. Palindrome check compares the string to its reverse, or walks two pointers inward.',
    deepExplanation:
      'Problem: reverse "hello" -> "olleh"; check if "racecar" is a palindrome -> True.\n\nApproach 1 — Brute force / manual (shows algorithmic understanding):\n```python\ndef reverse_string(s: str) -> str:\n    chars = list(s)\n    left, right = 0, len(chars) - 1\n    while left < right:\n        chars[left], chars[right] = chars[right], chars[left]\n        left += 1\n        right -= 1\n    return "".join(chars)\n\ndef is_palindrome(s: str) -> bool:\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n```\n\nApproach 2 — Pythonic:\n```python\ndef reverse_string_pythonic(s: str) -> str:\n    return s[::-1]\n\ndef is_palindrome_pythonic(s: str) -> bool:\n    return s == s[::-1]\n```\n\nDry run for is_palindrome("racecar"): left=0/right=6 \\\n\nStep 1 — Understand the topic.\nTopic: Coding: Reverse a string and check for palindrome\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef reverse_manual(text: str) -> str:\n    result = ""\n    for index in range(len(text) - 1, -1, -1):\n        result += text[index]\n    return result\n\ndef is_palindrome(text: str) -> bool:\n    return text == reverse_manual(text)\n\nprint(reverse_manual("hello"))\nprint(is_palindrome("level"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\ntext = "hello"\nprint(text[::-1])\nprint("level" == "level"[::-1])\n```\n\nStep 5 — Example result:\n```text\nolleh\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nTime: O(n) for reversal; Space: O(n) for the returned string.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A real-world variant asked in interviews: check palindrome ignoring case/punctuation ("A man, a plan, a canal: Panama"). Production code would normalize first: `cleaned = "".join(ch.lower() for ch in s if ch.isalnum())`, then apply the two-pointer check — this avoids allocating multiple intermediate strings for large inputs.\n\nCoding practice: first explain the core/manual approach for **Coding: Reverse a string and check for palindrome**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'For interviews, be ready to produce BOTH the O(1)-code slice trick and the manual two-pointer version — interviewers often explicitly forbid slicing to test algorithmic understanding.',
      'For huge strings/streams, avoid materializing full reversed copies; use two-pointer comparison which is O(1) extra space and can short-circuit early.',
      'Normalize input (case, punctuation, unicode) explicitly and intentionally rather than assuming clean ASCII input.',
    ],
    tradeOffs:
      'Slicing is idiomatic and fast (implemented in C) but allocates a full new string; the two-pointer approach uses O(1) extra space for the palindrome check (no reversal needed) and is preferred when you only need a boolean answer on very large input.',
    commonMistakes: [
      'Trying to mutate a string in place (`s[0] = "x"`) — raises TypeError, strings are immutable.',
      'Forgetting to normalize case/punctuation when the problem implies a "real sentence" palindrome check.',
      'Using `s == s[::-1]` for the palindrome check on very large streamed input, wasting O(n) space unnecessarily.',
    ],
    followUpQuestions: [
      'How would you check a palindrome ignoring spaces, punctuation, and case?',
      'How would you reverse a string in place if it were a list of characters (mutable)?',
      'How would you handle multi-codepoint Unicode graphemes (e.g. emoji with skin-tone modifiers) correctly when reversing?',
    ],
    relatedTopics: ['Strings', 'Two Pointers', 'Slicing', 'Immutability', 'Unicode'],
  },
  {
    id: 'python-m1-7',
    number: 'PY-M1-7',
    title: 'Coding: Count vowels, remove duplicate characters, and first non-repeating character',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Strings',
    expectedAnswer:
      'Vowel counting and duplicate-removal are single-pass problems; first-non-repeating-character is the classic case for a frequency map (Counter) combined with an ordered second pass, achieving O(n) time.',
    deepExplanation:
      '```python\ndef count_vowels(s: str) -> int:\n    vowels = set("aeiouAEIOU")\n    return sum(1 for ch in s if ch in vowels)\n\ndef remove_duplicate_chars(s: str) -> str:\n    seen = set()\n    result = []\n    for ch in s:\n        if ch not in seen:\n            seen.add(ch)\n            result.append(ch)\n    return "".join(result)\n\nfrom collections import Counter\n\ndef first_non_repeating(s: str) -> str | None:\n    counts = Counter(s)\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None\n```\n\nDry run first_non_repeating("swiss"): counts = {s:3, w:1, i:1}. Scan: \\\n\nStep 1 — Understand the topic.\nTopic: Coding: Count vowels, remove duplicate characters, and first non-repeating character\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef frequency_manual(text: str) -> dict[str, int]:\n    counts: dict[str, int] = {}\n    for char in text:\n        counts[char] = counts.get(char, 0) + 1\n    return counts\n\ndef first_unique(text: str) -> str | None:\n    counts = frequency_manual(text)\n    for char in text:\n        if counts[char] == 1:\n            return char\n    return None\n\nprint(first_unique("swiss"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom collections import Counter\n\ncounts = Counter("swiss")\nresult = next(\n    (char for char in "swiss" if counts[char] == 1),\n    None,\n)\nprint(result)\n```\n\nStep 5 — Example result:\n```text\nw\n```\n\nStep 6 — Complexity / trade-off:\nTime: O(n); Space: O(k), where k is the number of distinct characters.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A log-deduplication pipeline uses the same "seen set + ordered output" pattern to strip repeated tokens from a stream while preserving first-occurrence order, which is exactly what `remove_duplicate_chars` demonstrates at the character level.\n\nCoding practice: first explain the core/manual approach for **Coding: Count vowels, remove duplicate characters, and first non-repeating character**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `collections.Counter` instead of hand-rolled frequency dicts — it is C-optimized and expresses intent clearly.',
      'Never build strings via repeated concatenation in a loop; accumulate in a list and `"".join(...)` once.',
      'State explicitly whether vowel-counting should be case-sensitive and whether "y" counts — a real interview will probe this ambiguity.',
    ],
    tradeOffs:
      'The Counter + second-pass approach for first-non-repeating is O(n) time / O(k) space (k = distinct chars) versus a brute-force O(n²) approach that calls `.count()` for every character.',
    commonMistakes: [
      'Using `s.count(ch)` inside a loop over `s` for first-non-repeating — this is O(n²).',
      'Forgetting that `set` iteration order is not the original order — first-non-repeating requires re-scanning the original string, not the set.',
      'Not clarifying case sensitivity for "duplicate" or "vowel" before coding.',
    ],
    followUpQuestions: [
      'How would you find the first non-repeating character in a stream (data arrives one character at a time)?',
      'How would this change for a case-insensitive "duplicate character" definition?',
      'What is the space complexity of each approach in terms of the alphabet size vs the input length?',
    ],
    relatedTopics: ['Hashing', 'Counter', 'Frequency Map', 'Streaming'],
  },
  {
    id: 'python-m1-8',
    number: 'PY-M1-8',
    title: 'Coding: Reverse words in a sentence',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Strings',
    expectedAnswer:
      'Reversing word order (not character order) in a sentence: split on whitespace, reverse the list of words, rejoin. The Pythonic one-liner handles multiple/leading/trailing spaces correctly because `str.split()` with no arguments collapses runs of whitespace and strips the ends.',
    deepExplanation:
      'Problem: "  the sky   is blue  " -> "blue is sky the".\n\nApproach 1 — manual (no split/join, shows understanding):\n```python\ndef reverse_words_manual(s: str) -> str:\n    words = []\n    word_chars = []\n    for ch in s + " ":\n        if ch == " ":\n            if word_chars:\n                words.append("".join(word_chars))\n                word_chars = []\n        else:\n            word_chars.append(ch)\n    return " ".join(reversed(words))\n```\n\nApproach 2 — Pythonic:\n```python\ndef reverse_words(s: str) -> str:\n    return " ".join(reversed(s.split()))\n```\n\nDry run reverse_words("  the sky   is blue  "): `s.split()` -> `["the", "sky", "is", "blue"]` (whitespace-run-aware and stripped); reversed -> `["blue", "is", "sky", "the"]`; joined -> `"blue is sky the"`.\n\nStep 1 — Understand the topic.\nTopic: Coding: Reverse words in a sentence\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef reverse_words_manual(sentence: str) -> str:\n    words = sentence.split()\n    result: list[str] = []\n    for index in range(len(words) - 1, -1, -1):\n        result.append(words[index])\n    return " ".join(result)\n\nprint(reverse_words_manual("Python makes interviews easier"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(" ".join(\n    "Python makes interviews easier".split()[::-1]\n))\n```\n\nStep 5 — Example result:\n```text\neasier interviews makes Python\n```\n\nStep 6 — Complexity / trade-off:\nO(n) time and O(n) output space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Search-query normalization pipelines use `str.split()` (not `str.split(" ")`) specifically because user input often has irregular whitespace; `split(" ")` would produce empty-string tokens for consecutive spaces, corrupting downstream tokenization.\n\nCoding practice: first explain the core/manual approach for **Coding: Reverse words in a sentence**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `s.split()` (no args) over `s.split(" ")` unless you specifically need to preserve empty tokens between delimiters.',
      'Use `reversed()` (a lazy iterator) rather than `list[::-1]` when you are just about to consume it once via `join`.',
      'Clarify whether punctuation attached to words should move with the word or be treated as separate tokens.',
    ],
    tradeOffs:
      'The manual approach is O(n) time / O(n) space like the Pythonic one, but is 5-10x more code for the same result — appropriate only when the interviewer explicitly disallows built-ins to test parsing logic.',
    commonMistakes: [
      'Using `s.split(" ")` on input with multiple consecutive spaces, producing spurious empty strings in the result.',
      'Forgetting to `strip()` when manually parsing without `.split()`.',
      'Reversing the entire string with `s[::-1]` and forgetting to also reverse each word back to its original character order.',
    ],
    followUpQuestions: [
      'What is the difference between `str.split()` and `str.split(" ")` on `"a  b"`?',
      'How would you reverse words in place if given a mutable list of characters (classic array-based interview variant)?',
      'How would you handle leading/trailing punctuation attached to a word?',
    ],
    relatedTopics: ['String Parsing', 'split/join', 'Whitespace Handling'],
  },
  {
    id: 'python-m1-9',
    number: 'PY-M1-9',
    title: 'Coding: Check anagram and check string rotation',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Strings',
    expectedAnswer:
      'Anagram check: two strings are anagrams if they contain the same characters with the same frequencies — compare sorted strings (O(n log n)) or compare Counters (O(n)). Rotation check: `s2` is a rotation of `s1` iff `len(s1) == len(s2)` and `s2` is a substring of `s1 + s1` — a classic O(n) trick.',
    deepExplanation:
      '```python\nfrom collections import Counter\n\ndef is_anagram(a: str, b: str) -> bool:\n    if len(a) != len(b):\n        return False\n    return Counter(a) == Counter(b)\n\ndef is_anagram_sort(a: str, b: str) -> bool:\n    return sorted(a) == sorted(b)  # O(n log n), no extra library needed\n\ndef is_rotation(s1: str, s2: str) -> bool:\n    return len(s1) == len(s2) and s2 in (s1 + s1)\n```\n\nWhy the rotation trick works: any rotation of `s1` appears as a contiguous substring of `s1` concatenated with itself. E.g. s1="waterbottle", rotation "erbottlewat" — s1+s1 = "waterbottlewaterbottle", and "erbottlewat" is indeed a substring starting at index 4.\n\nDry run is_anagram("listen", "silent"): Counter("listen") = {l:1,i:1,s:1,t:1,e:1,n:1}; Counter("silent") is identical -> True.\n\nStep 1 — Understand the topic.\nTopic: Coding: Check anagram and check string rotation\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef is_anagram_manual(left: str, right: str) -> bool:\n    if len(left) != len(right):\n        return False\n\n    counts: dict[str, int] = {}\n    for char in left:\n        counts[char] = counts.get(char, 0) + 1\n    for char in right:\n        if char not in counts:\n            return False\n        counts[char] -= 1\n        if counts[char] < 0:\n            return False\n    return True\n\ndef is_rotation(left: str, right: str) -> bool:\n    return len(left) == len(right) and right in (left + left)\n\nprint(is_anagram_manual("listen", "silent"))\nprint(is_rotation("waterbottle", "erbottlewat"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom collections import Counter\n\nprint(Counter("listen") == Counter("silent"))\nprint(\n    len("waterbottle") == len("erbottlewat")\n    and "erbottlewat" in ("waterbottle" * 2)\n)\n```\n\nStep 5 — Example result:\n```text\nTrue\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nHash counting is O(n) expected time; rotation check uses O(n) search space in the practical implementation.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Duplicate-content detection for a document store might normalize and hash character-frequency signatures (an anagram-style fingerprint) to flag near-duplicate short strings (e.g. product titles) cheaply before running expensive fuzzy-matching only on the surviving candidates.\n\nCoding practice: first explain the core/manual approach for **Coding: Check anagram and check string rotation**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Prefer `Counter` (O(n)) over `sorted()` (O(n log n)) when performance matters and you do not need the sorted output itself.',
      'Always check lengths first — a cheap O(1) short-circuit before the O(n) comparison.',
      'For the rotation trick, guard the length-equality check before the substring search, otherwise `s2 in s1+s1` can give false positives for degenerate inputs (e.g. empty strings).',
    ],
    tradeOffs:
      '`Counter` comparison is faster asymptotically than sorting, but sorting-based comparison needs no imports and is easier to explain/verify under interview pressure; both are acceptable, but be ready to state the complexity difference.',
    commonMistakes: [
      'Forgetting the length check before comparing Counters/sorted lists — still correct but wastes work on obviously-mismatched inputs.',
      'Assuming anagram checks are case-insensitive by default — clarify with the interviewer.',
      'Implementing rotation checking with an O(n²) manual rotate-and-compare loop when the O(n) concatenation trick is expected at mid-level.',
    ],
    followUpQuestions: [
      'How would you check if two strings are anagrams using only O(1) extra space (fixed alphabet assumption)?',
      'Why does concatenating s1 with itself correctly capture every possible rotation?',
      'How would you extend the anagram check to work efficiently for a stream of many strings being compared against one reference string?',
    ],
    relatedTopics: ['Hashing', 'Counter', 'Substring Search', 'Sorting'],
  },
  {
    id: 'python-m1-10',
    number: 'PY-M1-10',
    title: 'Coding: Longest common prefix',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Strings',
    expectedAnswer:
      'Given a list of strings, find the longest prefix common to all of them. The efficient approach compares character-by-character across all strings using the shortest string as an upper bound (vertical scanning), stopping at the first mismatch — O(S) where S is the total number of characters.',
    deepExplanation:
      'Problem: ["flower", "flow", "flight"] -> "fl". ["dog", "racecar", "car"] -> "" (no common prefix).\n\nApproach — vertical scanning:\n```python\ndef longest_common_prefix(strs: list[str]) -> str:\n    if not strs:\n        return ""\n    for i, ch in enumerate(strs[0]):\n        for other in strs[1:]:\n            if i >= len(other) or other[i] != ch:\n                return strs[0][:i]\n    return strs[0]\n```\n\nDry run ["flower", "flow", "flight"]: i=0 \\\n\nStep 1 — Understand the topic.\nTopic: Coding: Longest common prefix\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef longest_prefix_manual(words: list[str]) -> str:\n    if not words:\n        return ""\n\n    prefix = words[0]\n    for word in words[1:]:\n        while not word.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                return ""\n    return prefix\n\nprint(longest_prefix_manual(\n    ["flower", "flow", "flight"]\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nwords = ["flower", "flow", "flight"]\nprefix = words[0]\nfor word in words[1:]:\n    while not word.startswith(prefix):\n        prefix = prefix[:-1]\nprint(prefix)\n```\n\nStep 5 — Example result:\n```text\nfl\n```\n\nStep 6 — Complexity / trade-off:\nTime: O(total characters inspected); Space: O(1) auxiliary beyond the output.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Autocomplete/typeahead services compute the longest common prefix across the current candidate set to decide how much text can be safely "ghost-completed" inline without committing to a specific suggestion yet.\n\nCoding practice: first explain the core/manual approach for **Coding: Longest common prefix**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Handle the empty-list and empty-string edge cases explicitly — an empty list has no defined prefix (return "").',
      'Use the shortest string\'s length as the natural loop bound to avoid IndexError, rather than assuming all strings are the same length.',
      'For very large lists, the min/max lexicographic trick avoids comparing every string on every character.',
    ],
    tradeOffs:
      'Vertical scanning is simple and stops as early as possible on a mismatch (good average case); horizontal scanning (reduce the prefix pairwise) is equally correct but touches more characters in the worst case when an early mismatch would have short-circuited sooner.',
    commonMistakes: [
      'Not handling an empty input list (`strs = []`), causing an IndexError on `strs[0]`.',
      'Assuming all strings are the same length and indexing out of bounds on shorter strings.',
      'Off-by-one slicing (`strs[0][:i]` vs `strs[0][:i+1]`) when returning the prefix on mismatch.',
    ],
    followUpQuestions: [
      'How would you solve this using a Trie if you needed to repeatedly query common prefixes for changing subsets of strings?',
      'What is the worst-case time complexity if every string shares the entire shortest string as a prefix?',
      'How would divide-and-conquer (split the list in half, solve recursively, merge) compare in complexity?',
    ],
    relatedTopics: ['Strings', 'Trie', 'Divide and Conquer', 'Vertical Scanning'],
  },
  {
    id: 'python-m1-11',
    number: 'PY-M1-11',
    title: 'Coding: String compression (run-length encoding) and expansion',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Strings',
    expectedAnswer:
      'Compression collapses consecutive repeated characters into "character+count" pairs (e.g. "aaabbc" -> "a3b2c1"), returning the original string if the compressed form is not actually shorter. Expansion reverses the process by repeating each character the given count of times.',
    deepExplanation:
      '```python\ndef compress(s: str) -> str:\n    if not s:\n        return s\n    parts = []\n    count = 1\n    for i in range(1, len(s) + 1):\n        if i < len(s) and s[i] == s[i - 1]:\n            count += 1\n        else:\n            parts.append(s[i - 1] + str(count))\n            count = 1\n    compressed = "".join(parts)\n    return compressed if len(compressed) < len(s) else s\n\ndef expand(s: str) -> str:\n    import re\n    result = []\n    for ch, count in re.findall(r"([a-zA-Z])(\\\\d+)", s):\n        result.append(ch * int(count))\n    return "".join(result)\n```\n\nDry run compress("aaabbc"): i=1 \\\n\nStep 1 — Understand the topic.\nTopic: Coding: String compression (run-length encoding) and expansion\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef compress_manual(text: str) -> str:\n    if not text:\n        return ""\n\n    result = ""\n    count = 1\n\n    for index in range(1, len(text) + 1):\n        if index < len(text) and text[index] == text[index - 1]:\n            count += 1\n        else:\n            result += text[index - 1] + str(count)\n            count = 1\n\n    return result\n\ndef expand_manual(text: str) -> str:\n    result = ""\n    index = 0\n    while index < len(text):\n        char = text[index]\n        index += 1\n\n        number = ""\n        while index < len(text) and text[index].isdigit():\n            number += text[index]\n            index += 1\n\n        result += char * int(number)\n\n    return result\n\nprint(compress_manual("aabbbcc"))\nprint(expand_manual("a2b3c2"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nimport re\n\ncompressed = re.sub(\n    r"(.)\\1*",\n    lambda match: match.group(1) + str(len(match.group(0))),\n    "aabbbcc",\n)\nprint(compressed)\nprint("".join(\n    char * int(count)\n    for char, count in re.findall(r"(\\D)(\\d+)", "a2b3c2")\n))\n```\n\nStep 5 — Example result:\n```text\na2b3c2\naabbbcc\n```\n\nStep 6 — Complexity / trade-off:\nManual scan is O(n) time; built-in regex is concise but should be used only when the pattern remains readable.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Basic RLE is used in production for compressing sparse/repetitive data such as bitmap masks or simple sensor readouts before a more general compressor (gzip) is applied, and it is the conceptual seed for understanding real compression algorithms discussed in system-design interviews.\n\nCoding practice: first explain the core/manual approach for **Coding: String compression (run-length encoding) and expansion**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always compare compressed length to original length and fall back to the original — a naive implementation can make short/non-repetitive strings longer.',
      'Handle multi-digit run lengths correctly in both directions (e.g. 12 consecutive characters -> "a12", not "a1" followed by stray "2").',
      'Use a sentinel/boundary loop (`range(1, len(s) + 1)`) to flush the final run without special-casing it after the loop.',
    ],
    tradeOffs:
      'This RLE approach is O(n) time / O(n) space and simple to reason about, but it is only effective for data with long runs of repeated characters; on typical English text it usually expands rather than compresses, which is exactly why the length check exists.',
    commonMistakes: [
      'Forgetting to flush the last run after the loop ends (common when not using the `range(1, len(s)+1)` sentinel trick).',
      'Not comparing against the original length, so "abcdef" compresses to the longer "a1b1c1d1e1f1".',
      'Using a naive regex expansion that mishandles multi-digit counts (e.g. matching only a single digit).',
    ],
    followUpQuestions: [
      'How would you compress in place if given a mutable character array (the classic in-place variant of this problem)?',
      'What happens to your algorithm on Unicode strings with combining characters?',
      'How does this relate to real compression algorithms like Huffman coding or LZ77?',
    ],
    relatedTopics: ['Run-Length Encoding', 'String Manipulation', 'Regex', 'Compression'],
  },
  {
    id: 'python-m1-12',
    number: 'PY-M1-12',
    title: 'Coding: Count words and capitalize words in a sentence',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Strings',
    expectedAnswer:
      'Word counting splits on whitespace and counts tokens (or counts frequencies with Counter); title-casing capitalizes the first letter of each word. Python provides `str.title()` and `str.capitalize()`, but both have edge cases (apostrophes, all-caps acronyms) worth knowing for interviews.',
    deepExplanation:
      '```python\ndef word_count(s: str) -> int:\n    return len(s.split())\n\ndef word_frequency(s: str):\n    from collections import Counter\n    return Counter(s.lower().split())\n\ndef capitalize_words(s: str) -> str:\n    return " ".join(word[:1].upper() + word[1:] for word in s.split())\n```\n\nWhy not just `s.title()`? `"don\\\n\nStep 1 — Understand the topic.\nTopic: Coding: Count words and capitalize words in a sentence\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef capitalize_words_manual(sentence: str) -> str:\n    words = sentence.split()\n    result: list[str] = []\n\n    for word in words:\n        if word:\n            result.append(\n                word[0].upper() + word[1:].lower()\n            )\n\n    return " ".join(result)\n\nprint(capitalize_words_manual("python backend INTERVIEW"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(" ".join(\n    word.capitalize()\n    for word in "python backend INTERVIEW".split()\n))\n```\n\nStep 5 — Example result:\n```text\nPython Backend Interview\n```\n\nStep 6 — Complexity / trade-off:\nO(n) time over the characters; built-ins improve readability for straightforward text transformations.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A CMS "Title Case my headline" feature avoids `str.title()` for exactly the apostrophe/acronym reason above and instead applies capitalization only to the first character of each split token (and often skips small connector words like "of"/"the" per style-guide rules, which is a further customization on top of this base algorithm).\n\nCoding practice: first explain the core/manual approach for **Coding: Count words and capitalize words in a sentence**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Prefer the `word[:1].upper() + word[1:]` pattern over `str.title()` when input may contain apostrophes or embedded punctuation.',
      'Lowercase before counting word frequency so "The" and "the" are not counted as different words, unless case-sensitivity is explicitly required.',
      'Use `Counter` for frequency; `Counter.most_common(n)` directly answers "top N most frequent words".',
    ],
    tradeOffs:
      '`str.title()` is a one-liner but incorrect on real-world text with apostrophes/acronyms; the manual split-and-capitalize approach is a few more characters but correct — a good example of "the built-in shortcut is not always the right tool".',
    commonMistakes: [
      'Using `str.title()` on text containing apostrophes and shipping the "Don\'T" bug to production.',
      'Not lowercasing before counting frequencies, silently splitting counts for the same word by case.',
      'Using `word.capitalize()` inside the join, which also lowercases the REST of the word (turning "iPhone" into "Iphone") — only the first character should change.',
    ],
    followUpQuestions: [
      'Why does `"don\'t stop".title()` produce "Don\'T Stop", and how do you avoid that?',
      'How would you implement "sentence case" (only the very first word capitalized) instead of title case?',
      'How would you find the top-3 most frequent words in a large text file without loading the whole file into memory?',
    ],
    relatedTopics: ['String Methods', 'Counter', 'Text Normalization'],
  },
  {
    id: 'python-m1-13',
    number: 'PY-M1-13',
    title: 'String immutability, slicing mechanics, and f-strings',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Strings',
    expectedAnswer:
      'Strings are immutable sequences of Unicode code points; indexing/slicing never mutates the original, always returns a new string object. Slicing syntax is `s[start:stop:step]`, all optional, all supporting negative indices. f-strings (`f"{expr}"`, Python 3.6+) are the modern, fastest, most readable string-formatting mechanism, evaluated at runtime and supporting format specs and even nested expressions/calls.',
    deepExplanation:
      '```python\ns = "python"\ns[0]        # \\\n\nStep 1 — Understand the topic.\nTopic: String immutability, slicing mechanics, and f-strings\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Structured logging code commonly uses f-strings for human-readable messages while keeping structured fields separate (e.g. `logger.info(f"user {user_id} logged in", extra={"user_id": user_id})`) — the f-string is for the readable message, not for data that downstream log-processing needs to parse reliably.\n\nCoding practice: first explain the core/manual approach for **String immutability, slicing mechanics, and f-strings**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Default to f-strings for new code; reserve `%`-style only for legacy logging APIs that lazily format (avoiding the cost of building a string on log calls that get filtered out).',
      'Remember slicing is always safe (never raises) while indexing can raise IndexError — choose deliberately based on whether out-of-range should be an error or silently empty.',
      'Use format specs (`:.2f`, `:>10`, `:,`) instead of manually padding/rounding strings.',
    ],
    tradeOffs:
      'f-strings evaluate immediately at the call site, which is great for readability but means you cannot lazily defer formatting (e.g. for a logging call that might get filtered) the way `%`-style lazy logging can.',
    commonMistakes: [
      'Trying to assign to a slice/index of a string directly (`s[0] = "P"`) — raises TypeError.',
      'Forgetting slicing with an out-of-range stop index does NOT raise, while direct indexing does — leads to silently swallowed bugs.',
      'Using f-strings inside hot logging paths where the message is filtered out anyway, paying formatting cost unnecessarily (use lazy `%`-style logging there instead).',
    ],
    followUpQuestions: [
      'Why is `s[0] = "x"` a TypeError but `s = s[1:] + "x"` works fine?',
      'What is the difference between `f"{x!r}"` and `f"{x!s}"`?',
      'When would you deliberately avoid f-strings in favor of `%`-style formatting?',
    ],
    relatedTopics: ['Slicing', 'f-strings', 'String Immutability', 'Format Specs'],
  },
  {
    id: 'python-m1-14',
    number: 'PY-M1-14',
    title: 'Encoding, decoding, ASCII vs Unicode',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Strings',
    expectedAnswer:
      'A Python `str` is an abstract sequence of Unicode code points; it has no inherent byte representation until you `.encode(encoding)` it into `bytes`. `bytes.decode(encoding)` reverses this. ASCII is a 7-bit subset of Unicode covering only 128 characters; UTF-8 is the dominant variable-length encoding that is ASCII-compatible for the first 128 code points and can represent all of Unicode.',
    deepExplanation:
      '```python\ns = "café"\nb_utf8 = s.encode("utf-8")     # b\\\n\nStep 1 — Understand the topic.\nTopic: Encoding, decoding, ASCII vs Unicode\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A common production bug: a service reads a file with `open(path)` (using the OS default encoding) on a Windows CI runner defaulting to cp1252, silently mangling non-ASCII characters, while the same code works fine on Linux. The fix is always passing `encoding="utf-8"` explicitly.\n\nCoding practice: first explain the core/manual approach for **Encoding, decoding, ASCII vs Unicode**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always pass `encoding="utf-8"` explicitly when opening text files — never rely on the platform default.',
      'Decide and document an explicit error-handling strategy (`errors="strict"|"ignore"|"replace"`) for encode/decode instead of leaving it implicit.',
      'Treat network/file I/O boundaries as the place where str<->bytes conversion happens; keep the rest of your code working purely with `str`.',
    ],
    tradeOffs:
      'UTF-8 is more compact for ASCII-heavy text than UTF-16/UTF-32 but requires variable-length decoding logic; UTF-32 gives O(1) code-point indexing at 4 bytes per character, which is rarely worth the memory cost outside specialized text-processing engines.',
    commonMistakes: [
      'Opening files without specifying `encoding=`, causing platform-dependent behavior.',
      'Assuming `len(some_str)` equals the number of bytes needed to transmit it — only true for pure ASCII.',
      'Using `errors="ignore"` in production, silently corrupting/losing user data instead of surfacing a clear error.',
    ],
    followUpQuestions: [
      'Why can `len("café")` differ from `len("café".encode("utf-8"))`?',
      'What happens if you decode UTF-8 bytes as latin-1 by mistake, and why does it not raise an error (mojibake)?',
      'How would you safely truncate a UTF-8 byte string to N bytes without splitting a multi-byte character?',
    ],
    relatedTopics: ['Unicode', 'UTF-8', 'ASCII', 'Encoding/Decoding', 'I/O'],
  },
  {
    id: 'python-m1-15',
    number: 'PY-M1-15',
    title: 'Conditions: truthy/falsy values, the ternary operator, and short-circuit evaluation',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Conditions',
    expectedAnswer:
      'Every object has an implicit boolean value via `__bool__`/`__len__`. Falsy values are: `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `()`, `set()`, and any custom object whose `__bool__` returns False or `__len__` returns 0. Everything else is truthy. Python\'s conditional expression is `value_if_true if condition else value_if_false`. `and`/`or` short-circuit and return one of the actual operand values, not necessarily a bool.',
    deepExplanation:
      '```python\nif []:\n    print("truthy")\nelse:\n    print("falsy")   # prints — empty list is falsy\n\nx = 5\nlabel = "positive" if x > 0 else "non-positive"\n\na = 0\nb = 7\nprint(a or b)     # 7 — `or` returns the first truthy operand (or the last one if none are truthy)\nprint(a and b)    # 0 — `and` returns the first falsy operand (or the last one if all truthy)\n```\n\nOutput-prediction gotcha:\n```python\nx = [] or "default"\nprint(x)  # "default" — [] is falsy so `or` moves on\n\ny = "" or None or 0 or "final"\nprint(y)  # "final" — chains all-falsy through to the first truthy value\n```\nThis is the basis for the common `value = config.get("key") or DEFAULT` pattern — but note it is subtly wrong if a legitimate value of `0`/`""`/`False` should be respected instead of overridden; `config.get("key", DEFAULT)` is the correct fix there.\n\nStep 1 — Understand the topic.\nTopic: Conditions: truthy/falsy values, the ternary operator, and short-circuit evaluation\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A very common production bug: `timeout = user_config.get("timeout") or DEFAULT_TIMEOUT` silently replaces an explicit `timeout=0` (meaning "no timeout", a valid choice) with the default, because `0` is falsy. The correct pattern checks explicitly: `timeout = user_config["timeout"] if "timeout" in user_config else DEFAULT_TIMEOUT`, or uses `dict.get(key, default)` only when `None`/missing (not "falsy") is genuinely the trigger condition.\n\nCoding practice: first explain the core/manual approach for **Conditions: truthy/falsy values, the ternary operator, and short-circuit evaluation**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `if not some_list:` instead of `if len(some_list) == 0:` — more idiomatic and works uniformly across falsy types.',
      'Be deliberate about `or`-based defaults: they overwrite ANY falsy value (0, "", False), not just `None`/missing — use `is None` checks or `dict.get(key, default)` when that distinction matters.',
      'Avoid deeply nested ternaries; they hurt readability fast — prefer explicit if/elif/else once you go beyond one condition.',
    ],
    tradeOffs:
      'Truthy/falsy checks are concise and idiomatic but can silently swallow meaningful falsy values (0, empty string) when used carelessly for defaulting logic — precision (`is None`) vs brevity (`or`) is a real design choice, not just style.',
    commonMistakes: [
      'Using `x or default` when `x` can legitimately be `0`/`""`/`False` and that value should be preserved.',
      'Writing `if x == True:` instead of `if x:` (redundant and breaks for truthy-but-not-`True` values like non-empty strings).',
      'Assuming `and`/`or` always return a `bool` — they return one of the actual operands.',
    ],
    followUpQuestions: [
      'What does `[] or {} or 0 or "x" or None` evaluate to, and why?',
      'When is `x or default` the wrong pattern, and what should you use instead?',
      'How would you implement custom truthiness for a class (hint: `__bool__` and `__len__`, and which one takes priority)?',
    ],
    relatedTopics: ['Truthy/Falsy', 'Short-Circuit Evaluation', 'Ternary Operator', 'dict.get'],
  },
  {
    id: 'python-m1-16',
    number: 'PY-M1-16',
    title: 'Loops: for/while, range, break/continue, and the loop `else` clause',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Loops',
    expectedAnswer:
      '`for` iterates over any iterable (not just index ranges); `while` loops on a condition. `range(start, stop, step)` generates integers lazily. `break` exits the loop immediately; `continue` skips to the next iteration. The lesser-known `for...else` / `while...else` clause runs the `else` block only if the loop completed WITHOUT hitting a `break` — commonly used for "search and report not-found" logic.',
    deepExplanation:
      '```python\nfor i in range(5):\n    print(i)          # 0 1 2 3 4 — range(5) excludes 5\n\nfor i in range(2, 10, 2):\n    print(i)          # 2 4 6 8\n\ndef find_first_even(nums):\n    for n in nums:\n        if n % 2 == 0:\n            print(f"found {n}")\n            break\n    else:\n        print("no even number found")   # only runs if the loop never broke\n\nfind_first_even([1, 3, 5])   # "no even number found"\nfind_first_even([1, 4, 5])   # "found 4"\n```\n\nWithout `for...else`, the same logic needs a separate flag variable (`found = False; ...; if not found: ...`) or a function-level `return` — the `else` clause is a genuine simplification for "search, break on success, otherwise report failure" but is unfamiliar enough that many teams avoid it purely for readability with less-experienced reviewers.\n\nStep 1 — Understand the topic.\nTopic: Loops: for/while, range, break/continue, and the loop `else` clause\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A retry loop uses `for attempt in range(max_retries): ... if success: break` followed by `else: raise MaxRetriesExceededError(...)` — this is a textbook, real use of `for...else` in production retry/backoff code (see Module 7).\n\nCoding practice: first explain the core/manual approach for **Loops: for/while, range, break/continue, and the loop `else` clause**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Prefer `for item in iterable:` over `for i in range(len(iterable)): item = iterable[i]` — more Pythonic and avoids off-by-one bugs.',
      'Use `enumerate(iterable)` when you need both index and value, instead of manually tracking an index counter.',
      'Reach for `for...else` specifically for "search then handle not-found" logic; otherwise a plain flag or early `return` is often clearer to reviewers less familiar with the construct.',
    ],
    tradeOffs:
      '`for...else` avoids an extra boolean flag variable but is genuinely confusing to readers unfamiliar with it (the "else" reads as "else if break" to newcomers, when it actually means "else if NO break") — weigh team familiarity against the minor code-golf benefit.',
    commonMistakes: [
      'Assuming `for...else`\'s `else` runs when the loop DOES break (it is the opposite — runs when it does NOT break).',
      'Off-by-one errors from misremembering that `range(stop)` excludes `stop`.',
      'Using `continue` inside a `try/finally` block without realizing `finally` still executes before continuing.',
    ],
    followUpQuestions: [
      'What does the `else` clause on a `for` loop actually mean, and when does it execute?',
      'How would you rewrite a `for...else` search-loop without using `else`, using a flag or early return instead?',
      'What is the time complexity difference between `for i in range(len(lst)): lst[i]` and `for item in lst:`?',
    ],
    relatedTopics: ['for/while', 'range', 'break/continue', 'for-else', 'enumerate'],
  },
  {
    id: 'python-m1-17',
    number: 'PY-M1-17',
    title: 'Coding: FizzBuzz, factorial (iterative + recursive), and Fibonacci',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Loops',
    expectedAnswer:
      'FizzBuzz prints Fizz/Buzz/FizzBuzz/number for 1..n based on divisibility by 3/5/both. Factorial and Fibonacci are the canonical iteration-vs-recursion teaching examples: both work either way, but naive recursive Fibonacci is exponential without memoization (covered in Module 2), while factorial recursion is linear but still worse than iteration due to call-stack overhead.',
    deepExplanation:
      '```python\ndef fizzbuzz(n: int) -> list[str]:\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append("FizzBuzz")\n        elif i % 3 == 0:\n            result.append("Fizz")\n        elif i % 5 == 0:\n            result.append("Buzz")\n        else:\n            result.append(str(i))\n    return result\n\ndef factorial_iterative(n: int) -> int:\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\ndef factorial_recursive(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial_recursive(n - 1)\n\ndef fibonacci_iterative(n: int) -> int:\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\ndef fibonacci_recursive(n: int) -> int:\n    if n < 2:\n        return n\n    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)\n```\n\nDry run fibonacci_iterative(5): (a,b) starts (0,1) -> (1,1) -> (1,2) -> (2,3) -> (3,5) -> (5,8); after 5 iterations a=5 -> returns 5 (sequence 0,1,1,2,3,5,...).\n\nComplexity: `fibonacci_recursive` is O(2^n) time (branches double each level) / O(n) space (call stack depth) — a very common interview trap where candidates do not realize how badly this scales past n≈35. `fibonacci_iterative` is O(n) time / O(1) space.\n\nStep 1 — Understand the topic.\nTopic: Coding: FizzBuzz, factorial (iterative + recursive), and Fibonacci\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'FizzBuzz itself is purely a screening exercise, but the underlying pattern — check the most specific condition (divisible by both) before the less specific ones — generalizes to real rule-engine code (e.g. tax bracket lookups, discount-tier resolution) where ordering of conditions from most-specific to least-specific is a real correctness requirement.\n\nCoding practice: first explain the core/manual approach for **Coding: FizzBuzz, factorial (iterative + recursive), and Fibonacci**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Check the "divisible by both" (15) condition FIRST, before the individual 3/5 checks — ordering matters for correctness, not just style.',
      'Default to iterative Fibonacci/factorial in production; reserve naive recursion for teaching or when input size is provably small.',
      'Set/respect Python\'s recursion limit (`sys.getrecursionlimit()`, default 1000) — deep recursive factorial/Fibonacci on large n will raise RecursionError before it gets slow.',
    ],
    tradeOffs:
      'Recursive solutions are often more readable for tree-like problems but carry call-stack overhead and, for naive Fibonacci, catastrophic exponential blowup without memoization — iteration (or memoized/DP recursion, Module 8) is the production-appropriate choice for this specific problem shape.',
    commonMistakes: [
      'Checking `i % 3 == 0` and `i % 5 == 0` before `i % 15 == 0`, causing multiples of 15 to print "Fizz" only instead of "FizzBuzz".',
      'Writing naive recursive Fibonacci and calling it with n=40+, which takes an impractically long time (billions of redundant calls).',
      'Forgetting the base case in recursive factorial (`n <= 1`), causing infinite recursion / RecursionError for n=0.',
    ],
    followUpQuestions: [
      'Why is naive recursive Fibonacci O(2^n), and how would memoization fix it (preview of Module 8 DP)?',
      'What happens when factorial_recursive(0) is called, and why must the base case handle both 0 and 1?',
      'How would you compute factorial for very large n without hitting Python\'s recursion limit?',
    ],
    relatedTopics: ['Recursion', 'Iteration', 'Complexity Analysis', 'Recursion Limit', 'Dynamic Programming'],
  },
  {
    id: 'python-m1-18',
    number: 'PY-M1-18',
    title: 'Coding: Prime numbers, Armstrong numbers, and perfect/strong numbers',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Loops',
    expectedAnswer:
      'A prime check only needs to test divisors up to `sqrt(n)`. An Armstrong (narcissistic) number equals the sum of its own digits each raised to the power of the digit count (e.g. 153 = 1³+5³+3³). A perfect number equals the sum of its proper divisors (e.g. 28 = 1+2+4+7+14). A strong number equals the sum of the factorials of its digits (e.g. 145 = 1! + 4! + 5!).',
    deepExplanation:
      '```python\ndef is_prime(n: int) -> bool:\n    if n < 2:\n        return False\n    if n in (2, 3):\n        return True\n    if n % 2 == 0:\n        return False\n    i = 3\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 2\n    return True\n\ndef sieve_of_eratosthenes(limit: int) -> list[int]:\n    is_composite = [False] * (limit + 1)\n    primes = []\n    for num in range(2, limit + 1):\n        if not is_composite[num]:\n            primes.append(num)\n            for multiple in range(num * num, limit + 1, num):\n                is_composite[multiple] = True\n    return primes\n\ndef is_armstrong(n: int) -> bool:\n    digits = str(n)\n    power = len(digits)\n    return n == sum(int(d) ** power for d in digits)\n\ndef is_perfect(n: int) -> bool:\n    if n < 2:\n        return False\n    divisor_sum = sum(i for i in range(1, n) if n % i == 0)\n    return divisor_sum == n\n\nimport math\ndef is_strong(n: int) -> bool:\n    return n == sum(math.factorial(int(d)) for d in str(n))\n```\n\nWhy `i * i <= n` instead of `i <= sqrt(n)`: avoids a floating-point `sqrt` call and its precision edge cases entirely, using pure integer comparison.\n\nThe Sieve of Eratosthenes is the standard upgrade when you need ALL primes up to a limit (e.g. "find all primes below 1,000,000") — checking each number individually with `is_prime` would be O(n·sqrt(n)) total, while the sieve is O(n log log n).\n\nStep 1 — Understand the topic.\nTopic: Coding: Prime numbers, Armstrong numbers, and perfect/strong numbers\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Prime-checking rarely appears directly in backend business logic, but the "test only up to sqrt(n)" optimization pattern (reduce the search space using a mathematical bound instead of brute force) is a recurring interview signal for whether a candidate reaches for the naive O(n) loop or reasons about the actual bound.\n\nCoding practice: first explain the core/manual approach for **Coding: Prime numbers, Armstrong numbers, and perfect/strong numbers**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always test divisibility only up to `sqrt(n)` (via `i*i <= n`), never up to `n` — this is the single most common "did you optimize?" interview check.',
      'Use the Sieve of Eratosthenes (not repeated `is_prime` calls) whenever you need many/all primes up to a limit.',
      'Special-case n<2 explicitly for primality — 0, 1, and negative numbers are never prime, a frequent off-by-one/definition trap.',
    ],
    tradeOffs:
      '`is_prime` (trial division to sqrt(n)) is O(sqrt(n)) per call and simple, ideal for checking a handful of numbers; the Sieve is O(n log log n) total but requires O(n) memory up front and is only worth it when you need many primes in a bounded range.',
    commonMistakes: [
      'Looping divisors up to `n` instead of `sqrt(n)`, which is correct but needlessly slow (O(n) vs O(sqrt(n)) per check).',
      'Forgetting `n < 2` returns False for primality (0 and 1 are not prime by definition).',
      'For `is_perfect`, iterating divisors up to `n` instead of `sqrt(n)` with pair-counting — a valid but unoptimized approach worth mentioning as a follow-up.',
    ],
    followUpQuestions: [
      'Why is checking divisors only up to `sqrt(n)` sufficient to determine primality?',
      'How would you find all Armstrong numbers in a given range efficiently?',
      'How would you optimize `is_perfect` to find divisor pairs up to `sqrt(n)` instead of scanning to n-1?',
    ],
    relatedTopics: ['Number Theory', 'Sieve of Eratosthenes', 'Complexity Analysis', 'Divisors'],
  },
  {
    id: 'python-m1-19',
    number: 'PY-M1-19',
    title: 'Coding: Reverse a number, sum of digits, and count digits',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Loops',
    expectedAnswer:
      'These are the classic "no string conversion allowed" digit-manipulation problems: use `% 10` to extract the last digit and `// 10` (integer floor division) to strip it, building up a result or a running sum/count as you go.',
    deepExplanation:
      '```python\ndef reverse_number(n: int) -> int:\n    sign = -1 if n < 0 else 1\n    n = abs(n)\n    reversed_n = 0\n    while n > 0:\n        digit = n % 10\n        reversed_n = reversed_n * 10 + digit\n        n //= 10\n    return sign * reversed_n\n\ndef sum_of_digits(n: int) -> int:\n    n = abs(n)\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    return total\n\ndef count_digits(n: int) -> int:\n    if n == 0:\n        return 1\n    n = abs(n)\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 10\n    return count\n```\n\nDry run reverse_number(1234): n=1234 digit=4 reversed=4 n=123; digit=3 reversed=43 n=12; digit=2 reversed=432 n=1; digit=1 reversed=4321 n=0, loop ends -> 4321.\n\nThe "Pythonic but arguably cheating" version `int(str(abs(n))[::-1])` is O(n) too but interviewers explicitly testing arithmetic/modulo understanding usually forbid string conversion — know both and be ready to justify each.\n\nStep 1 — Understand the topic.\nTopic: Coding: Reverse a number, sum of digits, and count digits\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'The digit-extraction pattern (`% 10` / `// 10`) generalizes directly to base conversion (e.g. converting to hex/binary manually) and to checksum algorithms like the Luhn algorithm used for credit-card number validation, which is a realistic senior-level follow-up to this exact building block.\n\nCoding practice: first explain the core/manual approach for **Coding: Reverse a number, sum of digits, and count digits**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Explicitly handle the sign (negative numbers) before working with `% 10`, since Python\'s `%` on negatives behaves differently than in C (`-7 % 10 == 3` in Python, not `-3`).',
      'Special-case `n == 0` for digit-count (the while-loop version naturally computes 0 digits for input 0, which is usually wrong — 0 has one digit).',
      'Be ready to produce both the pure-arithmetic version and the string-conversion shortcut, and explain the complexity is the same either way (O(digits) = O(log₁₀ n)).',
    ],
    tradeOffs:
      'Pure arithmetic avoids allocating a string and demonstrates lower-level understanding (often what is being tested); the string-conversion version is shorter and equally correct in production code where readability wins over demonstrating algorithmic technique.',
    commonMistakes: [
      'Forgetting to handle negative numbers, causing an infinite loop (since `n > 0` is never true if n starts negative and is never made positive).',
      'Off-by-one on `count_digits(0)`, returning 0 instead of 1 without an explicit special case.',
      'Using `n / 10` (true division, returns float) instead of `n // 10` (floor division, stays int), which breaks the loop\'s termination logic.',
    ],
    followUpQuestions: [
      'How does Python\'s `%` operator behave differently on negative numbers compared to C/Java, and how does that affect this code?',
      'How would you check if a number is a palindrome using this same digit-extraction technique, without converting to a string?',
      'How would you extend `reverse_number` to detect and handle 32-bit integer overflow, as LeetCode\'s variant of this problem requires?',
    ],
    relatedTopics: ['Modulo Arithmetic', 'Integer Division', 'Digit Manipulation', 'Luhn Algorithm'],
  },
  {
    id: 'python-m1-20',
    number: 'PY-M1-20',
    title: 'Input/output: `input()`, `print()`, and parsing structured input',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Input and Output',
    expectedAnswer:
      '`input(prompt)` always returns a `str` (you must explicitly convert with `int()`/`float()`), reading a single line from stdin up to (but not including) the newline. `print()` accepts multiple positional args (joined by `sep`, default a space), a `sep` override, an `end` override (default `"\\n"`), and a `file`/`flush` for redirection/timing control. Structured input (e.g. "3\\n1 2 3") is typically read line-by-line and parsed with `split()` + a type conversion + often a comprehension.',
    deepExplanation:
      '```python\nname = input("Enter your name: ")   # always str\nage = int(input("Enter your age: "))  # explicit conversion required\n\nprint("a", "b", "c")                 # "a b c" — default sep=" "\nprint("a", "b", "c", sep="-")        # "a-b-c"\nprint("loading", end="")             # no trailing newline\nprint(".", end="")\n\n# Reading a whole line of space-separated integers:\nnums = list(map(int, input().split()))\n\n# Classic competitive-programming pattern: read n, then n lines\nn = int(input())\nrows = [input().split() for _ in range(n)]\n\n# Reading all of stdin at once (useful for piped/file input):\nimport sys\ndata = sys.stdin.read().split()\n```\n\nA very common beginner bug: forgetting `input()` returns `str`, then doing arithmetic like `age + 1` and getting a `TypeError: can only concatenate str`. Another: not stripping trailing whitespace/newlines when input is read from a redirected file rather than an interactive terminal — `input()` already strips the trailing newline, but manually-read lines via `sys.stdin` do not, so `.strip()` is often still needed there.\n\nStep 1 — Understand the topic.\nTopic: Input/output: `input()`, `print()`, and parsing structured input\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'CLI tools built with `input()`/`print()` are rare in production services (which use structured logging and typed config instead), but the type-conversion discipline shown here — never trust incoming data\\\n\nCoding practice: first explain the core/manual approach for **Input/output: `input()`, `print()`, and parsing structured input**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always explicitly convert `input()` results to the type you actually need (`int`, `float`) rather than assuming.',
      'Use `sys.stdin.read()` for high-throughput or file-redirected input instead of many individual `input()` calls, which is measurably slower in large-input scenarios (competitive programming, batch scripts).',
      'Prefer f-strings over multiple `print()` positional args when the message has significant internal structure, for readability.',
    ],
    tradeOffs:
      '`input()` is simple and interactive-friendly but slow for reading thousands of lines (each call has overhead); `sys.stdin.read().split()` reads everything at once and is much faster for large batch input, at the cost of losing per-line interactive prompting.',
    commonMistakes: [
      'Forgetting `input()` returns a string and attempting arithmetic directly on it.',
      'Using many sequential `input()` calls in a loop over thousands of lines when reading in bulk via `sys.stdin` would be dramatically faster.',
      'Not handling `EOFError` when `input()` is called after stdin is exhausted (e.g. in piped/scripted execution).',
    ],
    followUpQuestions: [
      'Why is `sys.stdin.read()` faster than repeated `input()` calls for large inputs?',
      'How would you read input until EOF without knowing the number of lines in advance?',
      'How would you parse a line of mixed types (e.g. "Alice 30 5.6") into (str, int, float) safely?',
    ],
    relatedTopics: ['I/O', 'sys.stdin', 'Type Conversion', 'Parsing'],
  },
  {
    id: 'python-m1-21',
    number: 'PY-M1-21',
    title: 'Python vs JavaScript vs Java: language design trade-offs for a senior interview',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Python Fundamentals',
    expectedAnswer:
      'Python is dynamically/strongly typed, interpreted with reference-counting + cycle-collecting GC, single-implementation-dominant (CPython) with a GIL limiting CPU-bound thread parallelism. JavaScript is dynamically/weakly typed, single-threaded with an event loop (no GIL needed because there genuinely is one thread), historically JIT-compiled (V8) for speed. Java is statically typed, compiled to JVM bytecode, JIT-compiled at runtime, with real OS-level thread parallelism (no GIL) and a tracing garbage collector. These differences drive real architectural decisions: Python favors developer velocity and a huge ecosystem (data/ML/backend), Java favors large-codebase safety and CPU-bound throughput, JavaScript owns the browser and dominates I/O-bound async servers (Node.js).',
    deepExplanation:
      'Type system: Python (dynamic, strong) rejects `"1" + 1`; JavaScript (dynamic, weak) coerces it to `"11"`; Java (static, strong) rejects it at COMPILE time, before the program even runs — the earliest possible error surfacing of the three.\n\nConcurrency: Python\\\n\nStep 1 — Understand the topic.\nTopic: Python vs JavaScript vs Java: language design trade-offs for a senior interview\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef example(value):\n    return value\n\nprint(example("example"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint("example")\n```\n\nStep 5 — Example result:\n```text\nexample\n```\n\nStep 6 — Complexity / trade-off:\nUse the manual/core implementation to understand the mechanism; use Python\'s built-in/standard-library API when it improves readability and remains correct.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A real architecture decision: a data-heavy backend team chooses Python for its ML/data ecosystem (pandas, numpy, PyTorch bind to native code so the GIL rarely matters there) and FastAPI (async, I/O-bound) for the API layer, while a latency-critical matching-engine component that is genuinely CPU-bound and needs true parallel threads gets written in Java or Rust — because "which language" is decided by where the actual bottleneck and ecosystem needs are, not by a single blanket preference.\n\nCoding practice: first explain the core/manual approach for **Python vs JavaScript vs Java: language design trade-offs for a senior interview**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Choose the language/runtime based on the workload shape (I/O-bound vs CPU-bound) and ecosystem fit, not general "speed" reputation.',
      'For Python CPU-bound work, reach for multiprocessing, native extensions (numpy/Cython/Rust via PyO3), or a different language for that specific hot path — do not fight the GIL with threads.',
      'Understand that "dynamic typing" and "no compile step" trade earlier-error-detection for iteration speed — mitigate with type hints + static analysis + strong test coverage in Python codebases meant to scale.',
    ],
    tradeOffs:
      'Python: fastest to write and iterate, huge ecosystem, weaker raw CPU performance and only I/O-bound thread concurrency. JavaScript: ubiquitous (browser + server), naturally non-blocking I/O model, but a single execution thread limits CPU-bound work without workers. Java: strongest raw performance and true thread parallelism, but slower iteration speed, more verbose, heavier tooling/compile step.',
    commonMistakes: [
      'Claiming "Python is always slower than Java" without qualifying I/O-bound vs CPU-bound workloads.',
      'Assuming Python threading gives the same CPU parallelism as Java threading — it does not, due to the GIL.',
      'Treating this as a "which language is best" religious question in an interview instead of a workload-driven trade-off discussion, which is what senior interviewers are actually listening for.',
    ],
    followUpQuestions: [
      'For a CPU-bound image-processing pipeline, would you choose threads, multiprocessing, or a native extension in Python, and why?',
      'Why does Node.js not need a GIL, while Python does?',
      'How would you explain to a Java-background teammate why Python threads do not speed up a CPU-bound loop?',
    ],
    relatedTopics: ['GIL', 'Concurrency Models', 'Type Systems', 'JIT Compilation', 'Garbage Collection', 'Architecture Decisions'],
  },
];

export const MOCK_PYTHON_MODULE1_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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