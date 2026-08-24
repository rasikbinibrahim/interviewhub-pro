// Python + DSA Interview Handbook — Module 2: Functions, Modules and Packages.
// Hand-authored technical questions covering function mechanics (args/kwargs,
// scope, closures, recursion), the mutable-default-argument trap, custom
// map/filter/reduce, decorators as a preview, and the import/module/package
// system. Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m2-1',
    number: 'PY-M2-1',
    title: 'Positional, keyword, default, and variable-length arguments (*args/**kwargs)',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Functions',
    expectedAnswer:
      'Parameters can be positional, keyword, or both; `*args` collects extra positional arguments into a tuple, `**kwargs` collects extra keyword arguments into a dict. Python 3 also supports `/` and `*` markers in a signature to force positional-only or keyword-only parameters. Argument order in a `def` must be: positional, `*args`, keyword-only, `**kwargs`.',
    deepExplanation:
      '```python\ndef describe(name, age=0, *tags, active=True, **extra):\n    print(name, age, tags, active, extra)\n\ndescribe("Ada", 30, "engineer", "lead", active=False, team="infra")\n# Ada 30 (\'engineer\', \'lead\') False {\'team\': \'infra\'}\n\ndef positional_only(a, b, /, c):\n    # a, b MUST be positional (Python 3.8+); c can be positional or keyword\n    return a + b + c\n\ndef keyword_only(a, *, b):\n    # b MUST be passed as a keyword argument\n    return a + b\n\nkeyword_only(1, b=2)   # ok\nkeyword_only(1, 2)     # TypeError: takes 1 positional argument but 2 were given\n```\n\nCall-site unpacking mirrors this: `f(*a_list)` spreads a list/tuple as positional args, `f(**a_dict)` spreads a dict as keyword args — extremely common when forwarding arguments through wrapper functions/decorators.',
    productionExample:
      'API client wrapper functions commonly use `def request(method, url, *, headers=None, **kwargs):` — forcing `headers` and any additional requests-library options to be passed by keyword only, which prevents callers from accidentally passing them positionally and makes call sites self-documenting at every call site.',
    bestPractices: [
      'Use keyword-only parameters (`*,`) for optional flags/config so call sites stay self-documenting and immune to positional-arg reordering bugs.',
      'Use `**kwargs` sparingly and deliberately (e.g. thin wrapper/proxy functions) — overusing it hides the real function signature from callers and tooling (autocomplete, type checkers).',
      'When forwarding args through a wrapper (e.g. a decorator), always forward both `*args, **kwargs` to stay signature-agnostic.',
    ],
    tradeOffs:
      '`**kwargs` gives maximum flexibility for forwarding/wrapping, but sacrifices explicit documentation and static type-checking of what the function actually accepts — prefer explicit named parameters wherever the API surface is meant to be discoverable.',
    commonMistakes: [
      'Putting a parameter with a default before one without a default (`def f(a=1, b):`) — SyntaxError, defaults must come after non-defaults.',
      'Forgetting `*args`/`**kwargs` ordering rules and writing `def f(**kwargs, *args):` — SyntaxError; `**kwargs` must always be last.',
      'Mutating a dict/list passed via `**kwargs`/`*args` and assuming it does not affect the caller\'s original object (it does — see the mutable-default-argument question for the related aliasing trap).',
    ],
    followUpQuestions: [
      'What is the difference between `*args` and `**kwargs` at the call site vs the function-definition site?',
      'Why would you mark a parameter positional-only with `/`?',
      'How would you write a decorator that works for any wrapped function regardless of its signature?',
    ],
    relatedTopics: ['*args', '**kwargs', 'Keyword-Only Arguments', 'Positional-Only Arguments', 'Argument Unpacking'],
  },
  {
    id: 'python-m2-2',
    number: 'PY-M2-2',
    title: 'The mutable default argument trap',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Functions',
    expectedAnswer:
      'Default argument values are evaluated exactly ONCE, at function-definition time, and that single object is reused across every call that does not override it. Using a mutable default (`def f(items=[])`) means every call that relies on the default shares and mutates the SAME list object — a classic, very commonly interview-tested bug.',
    deepExplanation:
      '```python\ndef add_item(item, bucket=[]):\n    bucket.append(item)\n    return bucket\n\nprint(add_item("a"))   # [\'a\']\nprint(add_item("b"))   # [\'a\', \'b\'] — SAME list object reused, not a fresh []!\nprint(add_item("c"))   # [\'a\', \'b\', \'c\']\n\n# The fix: use None as a sentinel and create the mutable object inside the function body\ndef add_item_fixed(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket\n\nprint(add_item_fixed("a"))   # [\'a\']\nprint(add_item_fixed("b"))   # [\'b\'] — fresh list every call\n```\n\nWhy this happens: `def` executes once, and the default-value expression is evaluated at that moment and stored on the function object (`add_item.__defaults__`). Every call that omits `bucket` reuses `add_item.__defaults__[0]`, the exact same list, forever (until the process/module is reloaded). This is not a bug in Python — it is a direct, logical consequence of "functions are objects, defaults are attributes of that object" — but it surprises almost everyone the first time they hit it.',
    productionExample:
      'This exact bug has shipped to production as "a cache/log/accumulator that inexplicably grows across unrelated requests" — e.g. a `def handle_request(logs=[])` helper silently accumulating log entries from EVERY request into one shared list because no caller ever passes `logs` explicitly, leaking data between unrelated requests and growing unbounded memory over the life of the process.',
    bestPractices: [
      'Never use a mutable literal (`[]`, `{}`, `set()`) as a default argument value — always default to `None` and create the mutable object inside the function body.',
      'Enable a linter rule for this (e.g. Ruff\'s `B006`/`B008`, pylint\'s `dangerous-default-value`) so it is caught automatically in CI rather than relying on manual review.',
      'If you deliberately WANT a persistent cache across calls (rare, intentional), name it clearly and document the intent — do not let it happen by accident.',
    ],
    tradeOffs:
      'N/A — this is a pure correctness footgun, not a legitimate design trade-off; there is no scenario where the mutable-default bug is the desired behavior versus using `None` + explicit construction.',
    commonMistakes: [
      'Using `def f(x=[])` or `def f(x={})` and being surprised the "default" accumulates state across calls.',
      'Fixing it by writing `bucket = bucket or []` instead of `if bucket is None: bucket = []` — the `or` version incorrectly replaces a legitimately passed-in EMPTY list (falsy) with a new one.',
      'Not realizing the same issue applies to any mutable default, not just list/dict — a default `datetime.now()` argument has an analogous "evaluated once at def time" surprise (it freezes to import time, not call time).',
    ],
    followUpQuestions: [
      'Why does `def f(x=[])` reuse the same list across calls instead of creating a fresh empty list each time?',
      'What is wrong with fixing it via `bucket = bucket or []` instead of an explicit `is None` check?',
      'What other "evaluated once at def time" surprises exist with default arguments (e.g. a default of `datetime.now()`)?',
    ],
    relatedTopics: ['Mutable Default Arguments', 'Function Objects', 'Aliasing', 'Linting'],
  },
  {
    id: 'python-m2-3',
    number: 'PY-M2-3',
    title: 'Scope resolution: LEGB, `global`, and `nonlocal`',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Functions',
    expectedAnswer:
      'Name lookup follows LEGB order: Local (current function) -> Enclosing (any enclosing function\'s scope, for closures) -> Global (module level) -> Built-in (Python\'s builtins). Assigning to a name inside a function makes it local by default UNLESS declared `global` (binds to the module-level name) or `nonlocal` (binds to the nearest enclosing function\'s name, not global).',
    deepExplanation:
      '```python\nx = "global"\n\ndef outer():\n    x = "enclosing"\n    def inner():\n        x = "local"\n        print(x)      # "local"\n    inner()\n    print(x)          # "enclosing" — inner\'s assignment did not affect outer\'s x\n\nouter()\nprint(x)              # "global" — untouched\n\ncounter = 0\ndef increment():\n    counter += 1   # UnboundLocalError! Assigning anywhere in the function makes `counter` local\n                    # for the WHOLE function body, so this is read-before-assignment.\n\ndef increment_fixed():\n    global counter\n    counter += 1\n```\n\nThe UnboundLocalError case above is the single most common LEGB interview trap: Python decides at COMPILE time (parsing the function body) whether a name is local, based on whether it is EVER assigned anywhere in that function — so a variable can be "local" and still raise UnboundLocalError if you read it before the local assignment executes, even though a same-named global exists.\n\n`nonlocal` (Python 3) is specifically for closures — it lets an inner function rebind a name from an ENCLOSING function\'s scope (not global), which is the mechanism behind stateful closures like counters (see Module 5).',
    productionExample:
      'A closure-based rate limiter or in-memory counter (`def make_counter(): count = 0; def increment(): nonlocal count; count += 1; return count; return increment`) relies directly on `nonlocal` to maintain per-closure state across calls without using a class or global variable.',
    bestPractices: [
      'Avoid `global` in application code where possible — prefer passing values explicitly or using a class/module-level object with clear ownership.',
      'Use `nonlocal` deliberately for closures that need mutable state, and keep the enclosing function\'s intent well-documented since this pattern is less obvious to readers than a class.',
      'When you see `UnboundLocalError` on a variable that "clearly" has a global default, check for ANY assignment to that name anywhere in the function body — that is almost always the cause.',
    ],
    tradeOffs:
      '`global`/`nonlocal` enable stateful functions/closures without a class, which is concise for small utilities, but scales poorly — implicit shared mutable state is harder to test and reason about than an explicit class instance or passed-in parameter once the logic grows.',
    commonMistakes: [
      'Reading a variable before assigning to it later in the same function, triggering UnboundLocalError, and not realizing the later assignment is what made Python treat it as local.',
      'Using `global` inside a function to "fix" an UnboundLocalError without considering whether shared global mutable state is actually the right design.',
      'Confusing `nonlocal` (nearest ENCLOSING function scope) with `global` (module scope) — they resolve to different scopes and `nonlocal` will raise SyntaxError if no enclosing function defines that name.',
    ],
    followUpQuestions: [
      'Why does assigning to a variable anywhere in a function make it local for the entire function body, even before that assignment line executes?',
      'What is the difference between `global` and `nonlocal`, and when would `nonlocal` raise a SyntaxError?',
      'How would you implement a stateful counter using a closure with `nonlocal`, versus using a class?',
    ],
    relatedTopics: ['LEGB', 'Scope', 'Closures', 'UnboundLocalError', 'global/nonlocal'],
  },
  {
    id: 'python-m2-4',
    number: 'PY-M2-4',
    title: 'Lambda expressions, first-class functions, and higher-order functions',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Functions',
    expectedAnswer:
      '`lambda args: expr` creates a small anonymous function limited to a single expression (no statements, no multiple lines). Functions are first-class objects in Python — they can be assigned to variables, stored in data structures, and passed as arguments to (or returned from) other functions, which is what enables higher-order functions like `sorted(key=...)`, `map`, and `filter`.',
    deepExplanation:
      '```python\nsquare = lambda x: x ** 2\nsquare(5)   # 25\n\npeople = [{"name": "Bo", "age": 25}, {"name": "Al", "age": 19}]\nsorted(people, key=lambda p: p["age"])   # sorted by age, ascending\n\nfunctions = {"add": lambda a, b: a + b, "sub": lambda a, b: a - b}\nfunctions["add"](3, 4)   # 7 — functions stored and looked up like any other value\n\ndef apply_twice(fn, value):\n    return fn(fn(value))\n\napply_twice(lambda x: x + 3, 10)   # 16 — a function passed as an argument\n```\n\nWhen NOT to use lambda: anything beyond a single simple expression should be a named `def` function — lambdas cannot contain statements (`if`/`for` as statements, assignments, multiple lines), and giving logic a name via `def` improves tracebacks (a named function shows its name in a stack trace; `lambda` shows `<lambda>`) and testability (you can unit-test a named function directly, an inline lambda much less easily).',
    productionExample:
      'Sorting/grouping keys (`sorted(records, key=lambda r: (r.priority, -r.created_at))`) and simple event-handler callbacks (`button.on_click(lambda: set_state(...))`) are the idiomatic, appropriate uses of lambda in production code — anything with real business logic should be a named function instead.',
    bestPractices: [
      'Reserve `lambda` for short, throwaway expressions passed inline (sort keys, simple callbacks) — extract anything more complex into a named `def`.',
      'Prefer `operator.itemgetter`/`operator.attrgetter` over `lambda x: x["key"]`/`lambda x: x.attr` for sort keys — they are slightly faster (C-implemented) and communicate intent just as clearly.',
      'Never assign a lambda to a name (`f = lambda x: x + 1`) — PEP 8 explicitly recommends `def f(x): return x + 1` instead, since it produces a properly named function for tracebacks/debugging.',
    ],
    tradeOffs:
      'Lambdas are concise for inline throwaway logic but hurt debuggability (anonymous in tracebacks) and cannot express multi-statement logic — named functions are strictly more capable and more debuggable, at the cost of a few extra lines.',
    commonMistakes: [
      'Trying to put an `if` STATEMENT or a `for` loop inside a lambda body — only expressions (including conditional expressions `a if cond else b`) are allowed.',
      'Assigning a lambda to a variable name instead of just using `def`, which PEP 8 flags and which produces a confusingly-named `<lambda>` function object.',
      'Capturing a loop variable by reference inside a lambda created in a loop (a late-binding closure bug — see the closures question in Module 5) and getting the same final value in every lambda.',
    ],
    followUpQuestions: [
      'Why can a lambda only contain a single expression, and what are the practical implications for its use cases?',
      'What is wrong with `f = lambda x: x + 1` from a style/tooling perspective, and what should you write instead?',
      'What does `[lambda: i for i in range(3)]` produce when each lambda is called, and why?',
    ],
    relatedTopics: ['Lambda', 'First-Class Functions', 'Higher-Order Functions', 'sorted/key', 'operator module'],
  },
  {
    id: 'python-m2-5',
    number: 'PY-M2-5',
    title: 'Coding: implement custom `map`, `filter`, and `reduce`',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Functions',
    expectedAnswer:
      'Implementing map/filter/reduce from scratch demonstrates understanding of generators/iterators and the accumulator pattern that underlies functional-style processing. `map` transforms each element, `filter` keeps elements matching a predicate, `reduce` folds a sequence down to a single accumulated value.',
    deepExplanation:
      '```python\ndef my_map(fn, iterable):\n    for item in iterable:\n        yield fn(item)\n\ndef my_filter(predicate, iterable):\n    for item in iterable:\n        if predicate(item):\n            yield item\n\ndef my_reduce(fn, iterable, initial=None):\n    it = iter(iterable)\n    if initial is None:\n        accumulator = next(it)\n    else:\n        accumulator = initial\n    for item in it:\n        accumulator = fn(accumulator, item)\n    return accumulator\n\nlist(my_map(lambda x: x * 2, [1, 2, 3]))          # [2, 4, 6]\nlist(my_filter(lambda x: x % 2 == 0, range(10)))   # [0, 2, 4, 6, 8]\nmy_reduce(lambda a, b: a + b, [1, 2, 3, 4], 0)     # 10\n```\n\nDry run my_reduce(lambda a,b: a+b, [1,2,3,4], 0): accumulator=0; item=1 -> 1; item=2 -> 3; item=3 -> 6; item=4 -> 10 -> returns 10.\n\nImplementing these as GENERATORS (using `yield`) rather than returning lists is the key design choice interviewers look for: it makes `my_map`/`my_filter` lazy and composable (`my_map(f, my_filter(pred, data))` never materializes an intermediate list), mirroring how the real built-in `map`/`filter` behave in Python 3 (they return lazy iterator objects, not lists — a common Python-2-to-3 gotcha).',
    productionExample:
      'This exercise is the conceptual foundation for building real streaming data-processing pipelines (e.g. `functools.reduce` used to fold a stream of transaction records into a running balance, or a generator pipeline transforming/filtering log lines from a multi-GB file without loading it all into memory).',
    bestPractices: [
      'Implement map/filter as generators (`yield`) so they compose lazily instead of eagerly materializing intermediate lists.',
      'For `reduce`, explicitly support (and clearly document) the optional `initial` value, matching `functools.reduce`\'s real signature and behavior on empty input.',
      'In real code, prefer the standard library\'s `map`/`filter`/`functools.reduce` (or, often more readably, list/generator comprehensions) over hand-rolled versions — this exercise is for demonstrating understanding, not for shipping.',
    ],
    tradeOffs:
      'Generator-based implementations use O(1) extra memory per step (lazy) versus list-based versions that are O(n) memory but allow multiple iterations/indexing — choose based on whether the consumer needs to iterate once (generator is fine) or multiple times/randomly access (materialize a list).',
    commonMistakes: [
      'Implementing `my_map`/`my_filter` to return a fully-built list instead of a lazy generator, losing composability and memory efficiency.',
      'Not handling the empty-iterable-with-no-initial-value case in `reduce`, which should raise (matching `functools.reduce`\'s real `TypeError: reduce() of empty iterable with no initial value`).',
      'Confusing `filter`\'s predicate return semantics — forgetting `None` as a predicate in the REAL `filter()` builtin means "keep truthy values" (a distinct built-in behavior worth knowing, separate from this custom implementation).',
    ],
    followUpQuestions: [
      'Why does Python 3\'s built-in `map`/`filter` return lazy iterators instead of lists, unlike Python 2?',
      'How would you chain your custom `my_map` and `my_filter` together without materializing an intermediate list?',
      'What does `functools.reduce(fn, [], initial)` return versus `functools.reduce(fn, [])`, and why?',
    ],
    relatedTopics: ['Generators', 'functools.reduce', 'Lazy Evaluation', 'Functional Programming'],
  },
  {
    id: 'python-m2-6',
    number: 'PY-M2-6',
    title: 'Coding: recursive factorial, sum, string reverse, and nested-array sum',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Functions',
    expectedAnswer:
      'Standard recursion drills: each function needs a correct base case and a recursive step that provably shrinks toward that base case. Nested-array sum additionally needs to distinguish "is this element a list (recurse) or a number (add directly)" — a tree-shaped recursion rather than linear.',
    deepExplanation:
      '```python\ndef factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef recursive_sum(nums: list[int]) -> int:\n    if not nums:\n        return 0\n    return nums[0] + recursive_sum(nums[1:])\n\ndef recursive_reverse(s: str) -> str:\n    if len(s) <= 1:\n        return s\n    return recursive_reverse(s[1:]) + s[0]\n\ndef nested_sum(data: list) -> int:\n    total = 0\n    for item in data:\n        if isinstance(item, list):\n            total += nested_sum(item)\n        else:\n            total += item\n    return total\n\nnested_sum([1, [2, 3, [4, 5]], 6])   # 21\n```\n\nDry run recursive_reverse("abc"): recursive_reverse("bc") + "a" -> (recursive_reverse("c") + "b") + "a" -> (("c") + "b") + "a" -> "cb" + "a" -> "cba".\n\nNote `recursive_sum` using `nums[1:]` creates a new list slice at every call — O(n) work per call, O(n²) total — a good example of recursion that is elegant but not efficient; an accumulator-passing version or simple iteration avoids the repeated slicing cost entirely.',
    productionExample:
      '`nested_sum`\'s "recurse if it is a container, otherwise process directly" pattern is exactly how real-world recursive JSON/tree traversal works — e.g. walking an arbitrarily nested API response or config structure to collect all values matching a predicate, or to redact all fields named "password" at any depth.',
    bestPractices: [
      'Always identify the base case FIRST and verify the recursive step provably approaches it (e.g. shrinking list/string length) before writing the recursive call.',
      'Avoid slicing (`nums[1:]`) in recursion over large lists — pass an index instead of a sliced copy to keep each call O(1) instead of O(n).',
      'Use `isinstance(item, list)` (or a more general `isinstance(item, (list, tuple))`) deliberately when handling heterogeneous nested structures, and be explicit about which container types should recurse.',
    ],
    tradeOffs:
      'Recursive solutions read close to the mathematical/inductive definition of the problem (very natural for tree-shaped data like `nested_sum`), but pay call-stack overhead and, without care (slicing), can hide accidental quadratic behavior that an iterative version would not have.',
    commonMistakes: [
      'Missing or incorrect base case, causing infinite recursion and eventual RecursionError.',
      'Using `nums[1:]` in a hot recursive path over large lists without realizing the O(n) slicing cost at every level multiplies to O(n²) overall.',
      'Forgetting to check `isinstance(item, list)` and instead trying to call `len()`/iterate on a plain number, raising TypeError.',
    ],
    followUpQuestions: [
      'How would you rewrite `recursive_sum` to avoid the O(n²) cost from repeated slicing, while staying recursive?',
      'How would `nested_sum` need to change to also handle nested dictionaries, not just lists?',
      'At what input size would `recursive_reverse` hit Python\'s default recursion limit, and how would you handle larger input?',
    ],
    relatedTopics: ['Recursion', 'Base Case', 'Tree Recursion', 'Recursion Limit', 'Nested Data Structures'],
  },
  {
    id: 'python-m2-7',
    number: 'PY-M2-7',
    title: 'Coding: closures — a stateful counter, and function composition',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Functions',
    expectedAnswer:
      'A closure is an inner function that "remembers" variables from its enclosing scope even after that outer function has returned. Combined with `nonlocal`, this gives you private, encapsulated mutable state without a class. Function composition builds a new function by chaining several functions so the output of one feeds the input of the next.',
    deepExplanation:
      '```python\ndef make_counter(start: int = 0):\n    count = start\n    def increment(step: int = 1) -> int:\n        nonlocal count\n        count += step\n        return count\n    return increment\n\ncounter_a = make_counter()\ncounter_b = make_counter(100)\nprint(counter_a())   # 1\nprint(counter_a())   # 2\nprint(counter_b())   # 101 — counter_a and counter_b have INDEPENDENT closures over separate `count` variables\n\nfrom functools import reduce\n\ndef compose(*functions):\n    return reduce(lambda f, g: lambda x: g(f(x)), functions)\n\npipeline = compose(lambda x: x + 1, lambda x: x * 2, str)\npipeline(3)   # "8" — (3+1)=4, 4*2=8, str(8)="8"\n```\n\nWhy `counter_a` and `counter_b` are independent: each call to `make_counter()` creates a NEW `count` variable in a NEW enclosing scope; `increment`\'s closure captures a reference to that specific scope\'s `count`, not a shared global one. This is the mechanism behind memoization decorators, event-handler factories, and any "configure once, call many times" pattern.',
    productionExample:
      'A rate limiter or request-id generator implemented as a closure (`make_rate_limiter(max_per_minute)` returning an `allow()` function that closes over a private, per-instance sliding window) is a real production pattern — each call site gets its own independent, encapsulated state without needing a full class.',
    bestPractices: [
      'Use closures for small, focused stateful utilities (counters, memoizers, simple rate limiters); reach for a class once the state or behavior grows beyond one or two variables/operations.',
      'Always use `nonlocal` explicitly when an inner function needs to REASSIGN (not just read) an enclosing variable — reading works without it, reassigning does not.',
      'For composition, name the pipeline stages clearly and keep each function pure (no side effects) so the composed pipeline stays easy to reason about and test.',
    ],
    tradeOffs:
      'Closures give lightweight encapsulation with less boilerplate than a class (no `self`, no `__init__`), but they are less discoverable/introspectable — a class instance can be inspected (`vars(instance)`), while a closure\'s captured state is hidden inside the function object\'s `__closure__` cells, harder to debug.',
    commonMistakes: [
      'Forgetting `nonlocal` when an inner function reassigns an enclosing variable, causing UnboundLocalError.',
      'Assuming all closures created in a loop capture the loop variable\'s value AT CREATION TIME — they actually capture the VARIABLE (late binding), a classic bug covered in depth in Module 5.',
      'Reaching for a closure when a simple class with a couple of methods would be clearer and more testable, especially once more than one or two pieces of state are involved.',
    ],
    followUpQuestions: [
      'Why are `counter_a` and `counter_b` independent even though they are built from the same `make_counter` function?',
      'What would happen if you removed the `nonlocal count` line — what error, and why?',
      'How would you rewrite `make_counter` as a class instead of a closure, and what changes in terms of encapsulation and introspectability?',
    ],
    relatedTopics: ['Closures', 'nonlocal', 'Function Composition', 'functools.reduce', 'Encapsulation'],
  },
  {
    id: 'python-m2-8',
    number: 'PY-M2-8',
    title: 'Coding: a memoization decorator and a retry decorator',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Functions',
    expectedAnswer:
      'A decorator is a higher-order function that wraps another function to add behavior (caching, retrying, logging, timing) without modifying the wrapped function\'s own code. A memoization decorator caches results keyed by arguments; a retry decorator re-invokes the wrapped function on failure, typically with a maximum attempt count and a delay.',
    deepExplanation:
      '```python\nimport functools\nimport time\n\ndef memoize(fn):\n    cache = {}\n    @functools.wraps(fn)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = fn(*args)\n        return cache[args]\n    return wrapper\n\n@memoize\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nfib(35)   # fast — O(n) instead of O(2^n) thanks to caching each subproblem once\n\ndef retry(max_attempts=3, delay_seconds=1, exceptions=(Exception,)):\n    def decorator(fn):\n        @functools.wraps(fn)\n        def wrapper(*args, **kwargs):\n            last_error = None\n            for attempt in range(1, max_attempts + 1):\n                try:\n                    return fn(*args, **kwargs)\n                except exceptions as exc:\n                    last_error = exc\n                    if attempt < max_attempts:\n                        time.sleep(delay_seconds)\n            raise last_error\n        return wrapper\n    return decorator\n\n@retry(max_attempts=3, delay_seconds=0.5, exceptions=(ConnectionError,))\ndef fetch_data():\n    ...\n```\n\nKey mechanics: `@functools.wraps(fn)` preserves the wrapped function\'s `__name__`/`__doc__`/`__module__` on the wrapper — omitting it silently breaks introspection, debugging, and tools like `help()`. `memoize`\'s cache is keyed on `args` (a tuple) directly, which only works because tuples of hashable arguments are themselves hashable — it breaks if any argument is unhashable (e.g. a list), a real limitation worth calling out. `retry` is a decorator FACTORY (a function that returns a decorator) because it needs to accept configuration (`max_attempts`) — that extra level of nesting is exactly why it has three nested function layers instead of two.',
    productionExample:
      'Production retry decorators (e.g. the real `tenacity` library) generalize exactly this pattern with exponential backoff, jitter, and stop conditions; production memoization at scale moves from an in-process dict to an external cache (Redis) once the cache needs to be shared across processes/replicas or needs eviction policies (`functools.lru_cache(maxsize=...)` is the standard-library middle ground for single-process, size-bounded memoization).',
    bestPractices: [
      'Always apply `@functools.wraps(fn)` inside a decorator\'s wrapper — otherwise introspection, debugging, and doc tools silently see the wrapper\'s identity instead of the original function\'s.',
      'Prefer the standard library\'s `functools.lru_cache` over a hand-rolled memoize decorator for production code — it is battle-tested, thread-considerations documented, and supports `maxsize`/`typed`.',
      'For retry logic, always cap the maximum attempts and prefer exponential backoff with jitter over a fixed delay to avoid synchronized retry storms against a struggling downstream service.',
    ],
    tradeOffs:
      'A hand-rolled memoize decorator is simple but has an unbounded cache (memory leak risk) and requires hashable arguments; `functools.lru_cache(maxsize=N)` solves the unbounded-growth problem via LRU eviction but still requires hashable arguments and lives only in-process (not shared across replicas).',
    commonMistakes: [
      'Forgetting `@functools.wraps(fn)`, silently breaking `help(wrapped_fn)`, `wrapped_fn.__name__`, and any tooling that introspects the function.',
      'Memoizing a function whose arguments include an unhashable type (e.g. a list) and getting `TypeError: unhashable type` at call time instead of at decoration time.',
      'Writing a retry decorator with no maximum attempt cap or no backoff, risking an infinite retry loop or a retry storm that overwhelms a struggling dependency.',
    ],
    followUpQuestions: [
      'Why does a decorator that accepts configuration arguments (like `retry(max_attempts=3)`) need an extra level of function nesting compared to a plain `@memoize`?',
      'What breaks if you memoize a function that takes a `list` argument, and how would you work around it?',
      'How would you make the memoization cache bounded (LRU) instead of growing forever, without using `functools.lru_cache` directly?',
    ],
    relatedTopics: ['Decorators', 'functools.wraps', 'functools.lru_cache', 'Memoization', 'Retry Logic', 'Closures'],
  },
  {
    id: 'python-m2-9',
    number: 'PY-M2-9',
    title: 'Modules, packages, `__init__.py`, and `if __name__ == "__main__"`',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Modules and Packages',
    expectedAnswer:
      'A module is any `.py` file; a package is a directory containing an `__init__.py` (or, since Python 3.3, an implicit "namespace package" without one, though explicit `__init__.py` is still standard practice for regular packages). `__name__` equals `"__main__"` only when a file is executed directly (`python file.py`), and equals the module\'s dotted import path when it is imported — the `if __name__ == "__main__":` guard lets a file be both an importable module and a runnable script.',
    deepExplanation:
      '```text\nmypackage/\n  __init__.py\n  core.py\n  utils.py\n```\n```python\n# core.py\ndef run():\n    print("running")\n\nif __name__ == "__main__":\n    run()   # only executes when `python core.py` is run directly, NOT when imported\n```\n```python\n# another_file.py\nfrom mypackage import core\ncore.run()   # imports core.py without triggering its __main__ block\n```\n`__init__.py` runs once, the first time a package is imported, and is commonly used to (a) mark a directory as a regular package, (b) control what `from package import *` exposes via `__all__`, and (c) re-export selected symbols so consumers can `from mypackage import run` instead of `from mypackage.core import run`. Absolute imports (`from mypackage.utils import helper`) are strongly preferred over implicit relative imports for clarity, though explicit relative imports (`from .utils import helper`, using a leading dot) are fine and common within a package\'s own internal modules.',
    productionExample:
      'Nearly every Python CLI tool or service entry point uses the `if __name__ == "__main__":` guard so its `main.py` can be both imported by tests (calling internal functions directly, without side effects firing) and run directly in production (`python -m mypackage.main` or via a console-script entry point defined in `pyproject.toml`).',
    bestPractices: [
      'Always guard script-level side effects (starting a server, running a CLI) behind `if __name__ == "__main__":` so the module stays safely importable by tests and other code.',
      'Use `__all__` in `__init__.py` to explicitly declare the package\'s public API surface, rather than letting `import *` pull in everything by accident.',
      'Prefer absolute imports for anything crossing package boundaries; use explicit relative imports (`.`, `..`) only for tightly-coupled sibling modules within the same package.',
    ],
    tradeOffs:
      'Re-exporting symbols in `__init__.py` gives a clean public API surface (`from mypackage import Thing`) at the cost of that `__init__.py` needing to import all its submodules eagerly, which can slow down `import mypackage` and, in pathological cases, contribute to circular-import issues (next question).',
    commonMistakes: [
      'Putting real, non-trivial logic directly in `__init__.py` instead of a submodule, making the package harder to navigate and test.',
      'Forgetting the `if __name__ == "__main__":` guard, causing a script\'s top-level side effects (e.g. starting a server) to fire the moment it is merely IMPORTED by another module or by a test.',
      'Relying on `from module import *` in application code, silently pulling unexpected names into scope and shadowing existing ones.',
    ],
    followUpQuestions: [
      'What is the practical difference between a "regular package" (with `__init__.py`) and a "namespace package" (without one)?',
      'Why would you put `if __name__ == "__main__":` at the bottom of a file that is also meant to be imported?',
      'What does `__all__` control, specifically, and what does it NOT control (hint: `from module import specific_name` still works even if `specific_name` is not in `__all__`)?',
    ],
    relatedTopics: ['Modules', 'Packages', '__init__.py', '__name__', '__all__', 'Relative Imports'],
  },
  {
    id: 'python-m2-10',
    number: 'PY-M2-10',
    title: 'Circular imports: why they happen and how to fix them',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Modules and Packages',
    expectedAnswer:
      'A circular import occurs when module A imports module B, and module B (directly or transitively) imports module A, and the specific name being imported has not been defined yet at the point the import executes — Python modules are executed top-to-bottom exactly once, so a partially-initialized module can be seen mid-import, causing `ImportError: cannot import name X` or `AttributeError`.',
    deepExplanation:
      '```python\n# a.py\nfrom b import helper   # triggers loading b.py\n\ndef thing():\n    return helper()\n\n# b.py\nfrom a import thing   # a.py is already "being imported" (in sys.modules but incomplete) —\n                        # `thing` may not be defined yet at this point -> ImportError\n\ndef helper():\n    return thing()\n```\nFixes, roughly in order of preference:\n```python\n# 1) Restructure: move the shared dependency into a third module both can import\n#    (breaks the cycle structurally — usually the best fix)\n\n# 2) Import inside the function body instead of at module top-level (deferred import) —\n#    by the time the function actually RUNS, both modules have finished loading.\n# b.py\ndef helper():\n    from a import thing   # deferred — safe because it happens at call time, not import time\n    return thing()\n\n# 3) Import the module object itself, not a name from it, and reference lazily via attribute access\n# b.py\nimport a\ndef helper():\n    return a.thing()   # `a.thing` is looked up at call time, after a.py has fully finished loading\n```\nWhy option 3 often works when option 1\'s naive `from a import thing` does not: `import a` just binds the module object (fast, does not need `thing` to exist yet); the NAME `thing` is only looked up later, at call time, by which point module `a` has finished executing and `thing` definitely exists.',
    productionExample:
      'Django\'s own documentation explicitly recommends deferred imports inside functions (or Django\'s special `apps.get_model()`) specifically to break circular-import cycles between models in different apps that reference each other via foreign keys — this exact pattern shows up constantly in real Django/Flask codebases as the project grows.',
    bestPractices: [
      'Prefer restructuring (extract a shared base module) over deferred imports where practical — it is a structural fix, not a workaround.',
      'When a deferred import is the pragmatic choice, put it at the TOP of the function body (not scattered mid-function) so it stays discoverable.',
      'Use `import module` + attribute access (`module.name`) instead of `from module import name` in circular-prone code, since it defers the actual name lookup to call time.',
    ],
    tradeOffs:
      'Deferred (function-local) imports fix the cycle with minimal code churn but scatter import statements away from the top of the file, hurting at-a-glance dependency visibility; restructuring the module boundaries fixes it properly but is a bigger, more invasive change.',
    commonMistakes: [
      'Treating a circular import as "just add a deferred import and move on" everywhere, instead of recognizing it as a signal that two modules may be too tightly coupled and should be restructured.',
      'Not realizing that `import a` (binding the module) behaves very differently from `from a import thing` (binding a specific attribute AT IMPORT TIME) with respect to circular-import safety.',
      'Assuming reordering the `import` statements at the top of a file "fixes" a genuine circular dependency — it usually just moves which module fails first.',
    ],
    followUpQuestions: [
      'Why does `import a` (then using `a.thing`) often survive a circular import that `from a import thing` does not?',
      'How would you restructure two mutually-dependent modules to remove the cycle structurally?',
      'How does Python\'s `sys.modules` cache relate to why circular imports produce a PARTIALLY initialized module rather than infinite recursion?',
    ],
    relatedTopics: ['Circular Imports', 'sys.modules', 'Module Initialization', 'Deferred Imports'],
  },
  {
    id: 'python-m2-11',
    number: 'PY-M2-11',
    title: 'Virtual environments, pip, requirements.txt, and pyproject.toml',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Modules and Packages',
    expectedAnswer:
      'A virtual environment (`venv`) is an isolated Python installation (its own `site-packages`) so that per-project dependencies do not collide globally. `pip` installs packages into the currently active environment. `requirements.txt` is a flat, unpinned-or-pinned list of dependencies (legacy but still extremely common); `pyproject.toml` (PEP 517/518/621) is the modern, standardized way to declare project metadata, dependencies, and build configuration in one file, used by tools like Poetry, Hatch, PDM, and modern pip/setuptools itself.',
    deepExplanation:
      '```bash\npython -m venv .venv                 # create an isolated environment\nsource .venv/bin/activate             # activate it (Linux/macOS)\npip install requests==2.31.0          # installs into .venv/lib/site-packages, not globally\npip freeze > requirements.txt         # snapshot exact installed versions\npip install -r requirements.txt       # reproduce that exact environment elsewhere\n```\n```toml\n# pyproject.toml (PEP 621 style)\n[project]\nname = "myservice"\nversion = "1.0.0"\ndependencies = [\n    "requests>=2.31,<3",\n    "fastapi>=0.110",\n]\n\n[project.optional-dependencies]\ndev = ["pytest>=8", "mypy>=1.8"]\n```\nWhy this matters for reproducibility: `requirements.txt` typically pins only DIRECT dependencies unless generated via `pip freeze` (which pins EVERYTHING, including transitive deps, but loses the "why" — you cannot tell which pins are direct vs incidental). Modern tooling (Poetry/PDM/pip-tools) separates a human-edited "what I depend on, with loose ranges" file from a machine-generated, fully-pinned LOCK file (`poetry.lock`, `requirements.lock`) — giving both reproducibility (exact resolved versions, hashed) and maintainability (readable intent).',
    productionExample:
      'A production deployment pipeline installs from a fully-pinned LOCK file (not the loose dependency list) specifically so that "works on my machine" cannot silently diverge from what actually gets deployed — a transitive dependency bumping a minor version between a developer\'s local install and the CI/production install has caused real, hard-to-diagnose outages.',
    bestPractices: [
      'Always work inside a virtual environment per project — never `pip install` into the system/global Python.',
      'Use a lock file (via Poetry/PDM/pip-tools, or at minimum a `pip freeze`-generated pinned requirements file) for deployments, distinct from a human-maintained loose-range dependency list.',
      'Prefer `pyproject.toml` for new projects — it consolidates dependencies, build config, tool config (ruff/mypy/pytest sections), and metadata in one standardized file instead of scattering `setup.py`/`setup.cfg`/`requirements.txt`.',
    ],
    tradeOffs:
      'Loose version ranges (`requests>=2.31,<3`) keep dependencies patchable (security fixes flow in automatically) but risk unpredictable transitive upgrades; fully pinned versions are perfectly reproducible but require an explicit, deliberate process to pull in security patches.',
    commonMistakes: [
      'Installing packages globally (outside any virtual environment), causing version conflicts between unrelated projects on the same machine.',
      'Committing a `requirements.txt` with no version pins at all, so "works today" silently becomes "broken next month" when a dependency ships a breaking change.',
      'Confusing a dependency DECLARATION file (loose ranges, human intent) with a LOCK file (exact resolved versions) and using only one when both serve different purposes.',
    ],
    followUpQuestions: [
      'What is the practical difference between `requirements.txt` and a lock file like `poetry.lock`?',
      'Why might `pip freeze` output be a poor source of truth for a project\'s actual DIRECT dependencies?',
      'How would you reproduce an exact production environment locally for debugging a version-specific bug?',
    ],
    relatedTopics: ['Virtual Environments', 'pip', 'pyproject.toml', 'Dependency Locking', 'Reproducibility'],
  },
];

export const MOCK_PYTHON_MODULE2_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
