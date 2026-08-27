// Python + DSA Interview Handbook — Module 5: Advanced Python.
// Hand-authored technical questions covering the iterator protocol,
// generators/yield, decorators, closures/late binding, context managers,
// and output-prediction questions across these topics. Mirrors the
// MockTechnicalQuestion shape defined in @/mocks/questions.

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
    id: 'python-m5-1',
    number: 'PY-M5-1',
    title: 'The iterator protocol: `__iter__`, `__next__`, and building a custom iterator',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Iterators',
    expectedAnswer:
      'An ITERABLE implements `__iter__` (returns an iterator); an ITERATOR implements both `__iter__` (returning itself) and `__next__` (returns the next value or raises `StopIteration` when exhausted). `for x in obj` is syntactic sugar for repeatedly calling `iter(obj)` once, then `next()` on the result until `StopIteration`. Iterators are single-use/exhaustible; iterables (like a `list`) can produce a fresh iterator every time.',
    deepExplanation:
      '```python\nclass CountUpTo:\n    def __init__(self, limit):\n        self.limit = limit\n\n    def __iter__(self):\n        self.current = 0\n        return self       # the object IS its own iterator here\n\n    def __next__(self):\n        if self.current >= self.limit:\n            raise StopIteration\n        self.current += 1\n        return self.current\n\nc = CountUpTo(3)\nfor x in c:\n    print(x)   # 1 2 3\n\n# Manually, what the for-loop actually does under the hood:\nit = iter(c)\nwhile True:\n    try:\n        value = next(it)\n    except StopIteration:\n        break\n    print(value)\n```\nGotcha: a `list` is an ITERABLE but not itself an ITERATOR — `iter([1,2,3])` returns a fresh `list_iterator` object each time, which is why you can loop over the same list multiple times. But if an object IS its own iterator (like `CountUpTo` above, or any generator), calling `for x in c` a SECOND time on the same already-exhausted object yields NOTHING, because its internal state (`self.current`) was never reset — this is a very common bug when accidentally reusing a generator/iterator object as if it were a reusable iterable.\n\nStep 1 — Understand the topic.\nTopic: The iterator protocol: `__iter__`, `__next__`, and building a custom iterator\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nclass CountUpTo:\n    def __init__(self, limit: int):\n        self.limit = limit\n        self.current = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.limit:\n            raise StopIteration\n\n        self.current += 1\n        return self.current\n\nprint(list(CountUpTo(3)))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(list(range(1, 4)))\n```\n\nStep 5 — Example result:\n```text\n[1, 2, 3]\n```\n\nStep 6 — Complexity / trade-off:\nAn iterator is stateful and single-use; iterables can create fresh iterators.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A paginated API client wrapping "fetch next page" logic behind `__iter__`/`__next__` lets callers write plain `for record in api_client.iterate_all_records():` without knowing or caring about pagination tokens/offsets under the hood — the iterator hides that stateful complexity behind the standard protocol.\n\nCoding practice: first explain the core/manual approach for **The iterator protocol: `__iter__`, `__next__`, and building a custom iterator**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'If an object needs to be iterated MULTIPLE times independently, implement `__iter__` to return a NEW iterator object each call, rather than making the object its own single-use iterator.',
      'Prefer a generator FUNCTION (using `yield`, see the next question) over a hand-written `__iter__`/`__next__` class whenever the logic is simple — dramatically less boilerplate for the same protocol.',
      'Always raise `StopIteration` (not return `None` or some sentinel) to signal exhaustion — this is what `for` loops and built-ins like `list()` rely on.',
    ],
    tradeOffs:
      'A class-based iterator gives full control (custom state, multiple cooperating methods) at the cost of boilerplate; a generator function achieves the identical protocol with a fraction of the code, at the cost of being harder to extend with additional methods beyond simple iteration.',
    commonMistakes: [
      'Making an object its own iterator (`__iter__` returns `self`) and then being surprised a SECOND `for` loop over the same object produces nothing, because its state was already exhausted from the first loop.',
      'Forgetting to raise `StopIteration` in `__next__`, causing an infinite loop instead of a clean termination.',
      'Confusing "iterable" (has `__iter__`) with "iterator" (has both `__iter__` returning self AND `__next__`) — not every iterable is an iterator.',
    ],
    followUpQuestions: [
      'Why can you loop over the same `list` multiple times, but not over the same exhausted generator or single-use custom iterator?',
      'What is the exact sequence of protocol calls a `for` loop performs under the hood?',
      'How would you make `CountUpTo` support being iterated multiple times independently and simultaneously (e.g. two separate `for` loops running over the same instance concurrently)?',
    ],
    relatedTopics: ['Iterator Protocol', '__iter__', '__next__', 'StopIteration', 'Iterables vs Iterators'],
  },
  {
    id: 'python-m5-2',
    number: 'PY-M5-2',
    title: 'Generators, `yield`, and generator pipelines',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Generators',
    expectedAnswer:
      'A generator function contains `yield` and, when called, returns a generator object WITHOUT running any code yet — execution starts (and later resumes) only as values are pulled via `next()`/a `for` loop, PAUSING at each `yield` and resuming exactly where it left off (preserving local variables) on the next `next()` call. This gives constant memory usage for processing large/infinite sequences, unlike building a full list up front.',
    deepExplanation:
      '```python\ndef fibonacci_gen():\n    a, b = 0, 1\n    while True:               # an INFINITE generator — perfectly fine, nothing is materialized\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci_gen()\nfor _ in range(5):\n    print(next(fib))   # 0 1 1 2 3\n\ndef read_large_file(path):\n    with open(path, encoding="utf-8") as f:\n        for line in f:               # file objects are themselves lazy iterators over lines\n            yield line.strip()\n\ndef batch(iterable, size):\n    chunk = []\n    for item in iterable:\n        chunk.append(item)\n        if len(chunk) == size:\n            yield chunk\n            chunk = []\n    if chunk:\n        yield chunk        # flush the final partial batch\n\n# A LAZY pipeline — nothing is computed until the final consumer pulls values:\nlines = read_large_file("huge.log")\nerrors = (line for line in lines if "ERROR" in line)   # generator expression\nfirst_ten_errors = list(itertools.islice(errors, 10))    # only reads as much of the file as needed\n```\nWhy the pipeline above is memory-efficient: `read_large_file`, the generator-expression filter, and `itertools.islice` all compose LAZILY — no intermediate list of "all lines" or "all errors" is ever built in memory; only the first 10 matching lines actually get read from disk, no matter how large the file is. This is the core reason generators matter for production data processing: O(1) memory per pipeline stage instead of O(n).\n\n`yield from` delegates to a sub-generator, flattening `yield from other_gen()` so the outer generator yields everything the inner one yields, without an explicit loop — useful for composing generators or recursively flattening nested iterables.\n\nStep 1 — Understand the topic.\nTopic: Generators, `yield`, and generator pipelines\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef squares(values):\n    for value in values:\n        yield value * value\n\ngenerator = squares([1, 2, 3])\nprint(next(generator))\nprint(list(generator))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(list(\n    value * value\n    for value in [1, 2, 3]\n))\n```\n\nStep 5 — Example result:\n```text\n1\n[4, 9]\n```\n\nStep 6 — Complexity / trade-off:\nGenerators are lazy and stream values without materializing the full result.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'ETL/log-processing pipelines built as chained generators (read -> parse -> filter -> transform -> write) can process multi-gigabyte files with near-constant memory, because at any moment only ONE record is "in flight" through the whole pipeline — this is a standard, load-bearing production pattern, not just an interview trick.\n\nCoding practice: first explain the core/manual approach for **Generators, `yield`, and generator pipelines**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use a generator (function with `yield`, or a generator expression) any time you are processing a sequence that could be large, unbounded, or does not need random access/multiple passes.',
      'Chain generators to build lazy pipelines instead of materializing intermediate lists at each stage.',
      'Use `yield from` to delegate to a sub-generator instead of a manual `for ... : yield` loop — clearer and slightly faster.',
    ],
    tradeOffs:
      'Generators give O(1) memory and support infinite sequences, but sacrifice random access (`gen[5]` is not supported), `len()`, and the ability to iterate more than once — materializing a list is still the right choice when you need indexing, length, or multiple independent passes over the data.',
    commonMistakes: [
      'Calling a generator function and expecting it to execute immediately — it does not run any body code until you start pulling values via `next()`/iteration.',
      'Trying to reuse an already-exhausted generator object for a second pass instead of calling the generator FUNCTION again to get a fresh one.',
      'Materializing an unnecessarily large intermediate list (`list(...)`) between pipeline stages that could have stayed lazy generators throughout.',
    ],
    followUpQuestions: [
      'Why does calling a generator function not execute any of its code immediately?',
      'How would you write a generator that reads a huge CSV file and yields parsed rows one at a time, without ever holding the whole file in memory?',
      'What does `yield from` actually do differently from a manual `for item in sub_gen: yield item` loop (hint: it also forwards `.send()`/`.throw()`/return values)?',
    ],
    relatedTopics: ['Generators', 'yield', 'yield from', 'Lazy Evaluation', 'itertools', 'Memory Efficiency'],
  },
  {
    id: 'python-m5-3',
    number: 'PY-M5-3',
    title: 'Decorators: mechanics, decorators with arguments, and class decorators',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Decorators',
    expectedAnswer:
      'A decorator is a function that takes a function (or class) and returns a replacement — `@deco` above `def f(): ...` is exactly equivalent to `f = deco(f)`, executed at DEFINITION time (not call time). A decorator that itself takes arguments (`@deco(arg)`) needs an extra level of nesting: it is a function that RETURNS a decorator. A class decorator works the same way but wraps/modifies a class instead of a function.',
    deepExplanation:
      '```python\nimport functools\nimport time\n\ndef timing(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{fn.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timing\ndef slow_add(a, b):\n    time.sleep(0.1)\n    return a + b\n\n# Exactly equivalent to: slow_add = timing(slow_add)\n\ndef require_role(role):                # a decorator FACTORY — takes config, returns a decorator\n    def decorator(fn):\n        @functools.wraps(fn)\n        def wrapper(user, *args, **kwargs):\n            if role not in user.roles:\n                raise PermissionError(f"requires role {role}")\n            return fn(user, *args, **kwargs)\n        return wrapper\n    return decorator\n\n@require_role("admin")\ndef delete_user(user, target_id):\n    ...\n# Equivalent to: delete_user = require_role("admin")(delete_user)\n\ndef singleton(cls):                     # a CLASS decorator\n    instances = {}\n    @functools.wraps(cls)\n    def get_instance(*args, **kwargs):\n        if cls not in instances:\n            instances[cls] = cls(*args, **kwargs)\n        return instances[cls]\n    return get_instance\n\n@singleton\nclass Config:\n    def __init__(self):\n        self.settings = {}\n```\nWhy `require_role("admin")` needs three nested function levels while `timing` needs only two: `timing` is called directly AS the decorator (`timing(slow_add)`), but `require_role("admin")` is called FIRST with the configuration argument, and the RESULT of that call is what actually gets applied as the decorator to `delete_user` — so there must be an extra layer that "closes over" `role` and returns the real decorator function.\n\nMultiple stacked decorators apply bottom-up: `@a` above `@b` above `def f()` is `f = a(b(f))` — `b` wraps `f` first, then `a` wraps the result of that.\n\nStep 1 — Understand the topic.\nTopic: Decorators: mechanics, decorators with arguments, and class decorators\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom functools import wraps\n\ndef logger(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print("calling", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@logger\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\n@logger\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))\n```\n\nStep 5 — Example result:\n```text\ncalling add\n5\n```\n\nStep 6 — Complexity / trade-off:\nDecorator wrapping is O(1) setup plus wrapper-call overhead.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Web frameworks (`@app.route("/users")`, `@login_required`, `@cache.cached(timeout=60)`) are all decorators in exactly this shape — route registration decorators return the original function unchanged (just registering it as a side effect), while `login_required`/caching decorators wrap the function\\\n\nCoding practice: first explain the core/manual approach for **Decorators: mechanics, decorators with arguments, and class decorators**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always apply `@functools.wraps(fn)` inside the wrapper to preserve `__name__`/`__doc__`/`__module__` — omitting it silently breaks introspection and can confuse other decorators/tooling stacked on top.',
      'Keep decorators focused on ONE cross-cutting concern (timing, auth, retry, caching) each, and stack multiple small decorators rather than building one decorator that does everything.',
      'Be deliberate about stacking order — since decorators apply bottom-up, `@retry` above `@timing` measures time INCLUDING retries, while the reverse order would measure only the final successful attempt.',
    ],
    tradeOffs:
      'Decorators cleanly separate cross-cutting concerns (logging, auth, caching) from business logic and are highly reusable, but they add a layer of indirection that can make debugging/stepping-through code harder (especially several stacked decorators deep) and can obscure a function\'s real signature from tooling if `functools.wraps` is skipped.',
    commonMistakes: [
      'Forgetting the extra function-nesting level for a decorator that needs configuration arguments, and getting `TypeError: decorator() missing 1 required positional argument` at the `@deco(arg)` call site.',
      'Omitting `@functools.wraps(fn)`, breaking `fn.__name__`/docstrings and confusing later introspection or other decorators that rely on it.',
      'Not considering decorator STACKING ORDER, producing correct-looking code whose behavior (e.g. what gets measured/logged) is subtly wrong.',
    ],
    followUpQuestions: [
      'Why does `@require_role("admin")` need three levels of nested functions while `@timing` only needs two?',
      'What is the exact order of execution when three decorators are stacked on one function?',
      'How would you write a decorator that works correctly whether it is used as `@deco` or as `@deco(option=True)` (i.e. an optionally-parameterized decorator)?',
    ],
    relatedTopics: ['Decorators', 'functools.wraps', 'Decorator Factories', 'Class Decorators', 'Closures'],
  },
  {
    id: 'python-m5-4',
    number: 'PY-M5-4',
    title: 'Closures and the late-binding loop-variable trap',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Closures',
    expectedAnswer:
      'Closures capture VARIABLES (by reference to the enclosing scope), not their VALUES at creation time — this is called "late binding". A very common bug: creating multiple functions/lambdas inside a loop, expecting each to remember the loop variable\'s value AT THE TIME IT WAS CREATED, but they all actually see whatever the loop variable\'s FINAL value ended up being, because they all share the SAME enclosing variable.',
    deepExplanation:
      '```python\nfunctions = []\nfor i in range(3):\n    functions.append(lambda: i)\n\nprint([f() for f in functions])   # [2, 2, 2] — NOT [0, 1, 2]!\n# All three lambdas share the SAME `i` from the enclosing scope; by the time\n# they are CALLED (after the loop finishes), `i` has already become 2.\n\n# Fix 1: force early binding via a default argument, evaluated ONCE per lambda creation\nfunctions_fixed = []\nfor i in range(3):\n    functions_fixed.append(lambda i=i: i)   # `i=i` captures the CURRENT value as a default NOW\nprint([f() for f in functions_fixed])   # [0, 1, 2] — correct\n\n# Fix 2: use a factory function to create a fresh scope per iteration\ndef make_fn(value):\n    return lambda: value\nfunctions_fixed2 = [make_fn(i) for i in range(3)]\nprint([f() for f in functions_fixed2])   # [0, 1, 2] — correct\n```\nWhy this happens: `for i in range(3):` does NOT create a new scope per iteration in Python (unlike `let` in JavaScript block scoping) — there is exactly ONE `i` variable in the enclosing function/module scope, reused and reassigned each iteration. Every lambda created inside the loop closes over that SAME variable cell, so when they are finally CALLED (typically after the loop has finished, with `i` frozen at its last value), they all read the same final value.\n\nThis is one of the highest-signal "do you actually understand closures" interview questions, and shows up constantly in real bugs — e.g. registering multiple event handlers or callback functions in a loop.\n\nStep 1 — Understand the topic.\nTopic: Closures and the late-binding loop-variable trap\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef make_multipliers():\n    functions = []\n\n    for i in range(3):\n        def multiply(value, i=i):\n            return value * i\n        functions.append(multiply)\n\n    return functions\n\nprint([fn(10) for fn in make_multipliers()])\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfunctions = [\n    lambda value, i=i: value * i\n    for i in range(3)\n]\n\nprint([fn(10) for fn in functions])\n```\n\nStep 5 — Example result:\n```text\n[0, 10, 20]\n```\n\nStep 6 — Complexity / trade-off:\nCapture the loop value with a default argument or a factory to avoid late binding.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A real production bug: registering per-item callback handlers in a loop (`for item in items: button.on_click(lambda: process(item))`) where every button ends up processing the SAME (last) item when clicked — the exact same late-binding trap, just with a UI callback instead of a bare lambda list.\n\nCoding practice: first explain the core/manual approach for **Closures and the late-binding loop-variable trap**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use the `lambda x=x: ...` default-argument trick, or better, a small factory function, whenever creating closures/callbacks inside a loop.',
      'Prefer a factory function over the default-argument trick for anything beyond a trivial one-liner — it is more explicit and readable to reviewers unfamiliar with the default-argument idiom.',
      'When code review sees a lambda or nested function created inside a loop, treat it as a signal to specifically check for this late-binding trap.',
    ],
    tradeOffs:
      'N/A — like the mutable-default-argument trap, this is a pure correctness footgun rooted in how Python scoping actually works; there is no legitimate design reason to want late-binding closures over a loop variable, only cases where it happens to not matter (e.g. the closures are all called immediately, inside the same iteration, before `i` changes).',
    commonMistakes: [
      'Creating closures/lambdas inside a loop and assuming each one independently "snapshots" the loop variable\'s value at creation time.',
      'Fixing this bug with `lambda: i` still, but wrapped in an unnecessary extra function that does not actually change WHEN `i` is evaluated.',
      'Not recognizing this same late-binding issue can occur with any enclosing-scope variable reused across iterations, not just literally the `for` loop\'s own variable — e.g. a mutable accumulator reused and closed over repeatedly.',
    ],
    followUpQuestions: [
      'Why does `for i in range(3):` not create a new binding of `i` for each iteration the way some other languages\' block-scoped loops do?',
      'How does the `lambda i=i: i` trick actually force the current value to be captured, mechanically?',
      'Would this same bug occur with a `while` loop, and would the fix be identical?',
    ],
    relatedTopics: ['Closures', 'Late Binding', 'Scope', 'Lambda', 'Default Arguments'],
  },
  {
    id: 'python-m5-5',
    number: 'PY-M5-5',
    title: 'Context managers: `with`, `__enter__`/`__exit__`, and `contextlib.contextmanager`',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Context Managers',
    expectedAnswer:
      'A context manager guarantees setup/teardown around a block of code EVEN IF an exception occurs inside it, via `__enter__` (runs before the block, its return value is bound by `as`) and `__exit__` (always runs after the block, receives exception info if one occurred, and can SUPPRESS the exception by returning a truthy value). `contextlib.contextmanager` lets you write a context manager as a single generator function using `yield` instead of a full class with both dunder methods.',
    deepExplanation:
      '```python\nclass Timer:\n    def __enter__(self):\n        import time\n        self.start = time.perf_counter()\n        return self\n    def __exit__(self, exc_type, exc_value, traceback):\n        import time\n        self.elapsed = time.perf_counter() - self.start\n        print(f"elapsed: {self.elapsed:.4f}s")\n        return False   # False (or None) means: do NOT suppress the exception, let it propagate\n\nwith Timer() as t:\n    do_work()\n# __exit__ runs even if do_work() raises — the timing print still happens\n\nfrom contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    import time\n    start = time.perf_counter()\n    try:\n        yield              # code inside the `with` block runs HERE, at the yield point\n    finally:\n        elapsed = time.perf_counter() - start   # this ALWAYS runs, even on exception\n        print(f"elapsed: {elapsed:.4f}s")\n\nwith timer():\n    do_work()\n\n@contextmanager\ndef suppress_and_log(*exceptions):\n    try:\n        yield\n    except exceptions as exc:\n        print(f"suppressed: {exc}")   # exception is caught here, so it does NOT propagate\n```\nWhy the generator-based `@contextmanager` version needs a `try/finally` around the `yield`: the code inside the `with` block actually runs while the generator is paused AT the `yield` statement — if that block raises, the exception is thrown back INTO the generator at that exact `yield` point, so `finally` (or an `except` clause wrapping the `yield`) is what lets you guarantee cleanup or selectively suppress the exception, exactly mirroring what `__exit__`\\\n\nStep 1 — Understand the topic.\nTopic: Context managers: `with`, `__enter__`/`__exit__`, and `contextlib.contextmanager`\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nclass ManagedFile:\n    def __init__(self, path: str):\n        self.path = path\n        self.file = None\n\n    def __enter__(self):\n        self.file = open(self.path, "w", encoding="utf-8")\n        return self.file\n\n    def __exit__(self, exc_type, exc, tb):\n        if self.file:\n            self.file.close()\n        return False\n\nwith ManagedFile("example.txt") as file:\n    file.write("hello")\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef managed_file(path: str):\n    file = open(path, "w", encoding="utf-8")\n    try:\n        yield file\n    finally:\n        file.close()\n\nwith managed_file("example.txt") as file:\n    file.write("hello")\n```\n\nStep 5 — Example result:\n```text\nfile closed after the with block\n```\n\nStep 6 — Complexity / trade-off:\nContext managers guarantee cleanup even when the body raises.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Database transaction management (`with db.transaction(): do_writes()`) is a canonical context-manager use case: `__enter__` begins the transaction, and `__exit__` commits on success or rolls back automatically if ANY exception propagated out of the block — this correctness guarantee (cleanup happens no matter how the block exits) is exactly why context managers exist as a language feature rather than manual try/finally everywhere.\n\nCoding practice: first explain the core/manual approach for **Context managers: `with`, `__enter__`/`__exit__`, and `contextlib.contextmanager`**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use `contextlib.contextmanager` for simple setup/teardown logic — it is far less boilerplate than a full class with `__enter__`/`__exit__` for the common case.',
      'Return `False`/`None` from `__exit__` (or let an exception propagate naturally past the `try/finally` in the generator version) unless you specifically intend to SUPPRESS exceptions — silently swallowing errors is a common, dangerous mistake.',
      'Use `contextlib.ExitStack` when you need to manage a DYNAMIC number of context managers (unknown at code-writing time) rather than hardcoding nested `with` statements.',
    ],
    tradeOffs:
      'The class-based approach is more verbose but supports additional methods/state and can be reused as an object beyond just the `with` block; the `@contextmanager` generator approach is much more concise for simple cases but is fundamentally a single-use generator each time (a fresh call to the generator FUNCTION is needed for each `with` statement).',
    commonMistakes: [
      'Returning `True` from `__exit__` (or catching-and-swallowing in a `@contextmanager`\'s except clause) unintentionally, silently hiding real errors from the caller.',
      'Forgetting the `try/finally` around `yield` in a `@contextmanager` generator, so an exception in the `with` block skips the cleanup code entirely.',
      'Doing expensive setup work in `__init__` instead of `__enter__` — `__init__` runs at OBJECT CREATION, `__enter__` runs when the `with` block actually starts, and conflating them can cause resources to be acquired well before (or held across) their actual usage window.',
    ],
    followUpQuestions: [
      'What do the three arguments to `__exit__` (`exc_type`, `exc_value`, `traceback`) represent, and how do you use them to conditionally suppress specific exception types?',
      'Why does the generator-based `@contextmanager` implementation need a `try/finally` (or `try/except`) wrapped around its single `yield`?',
      'How would you write a context manager that manages MULTIPLE resources (e.g. two files) and guarantees both are closed even if opening the second one fails?',
    ],
    relatedTopics: ['Context Managers', '__enter__/__exit__', 'contextlib', 'with statement', 'Resource Management'],
  },
  {
    id: 'python-m5-6',
    number: 'PY-M5-6',
    title: 'Output-prediction: comprehensions, generators, and mutable state gotchas',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Output Prediction',
    expectedAnswer:
      'A curated set of output-prediction questions testing whether comprehension scoping, generator laziness, and mutable-default/closure interactions are truly understood, not just pattern-memorized.',
    deepExplanation:
      '```python\n# Q1\nx = 10\nsquares = [x for x in range(3)]\nprint(x)\n# Answer: 2 — in Python 3, list comprehensions have their OWN scope, so the\n# comprehension\\\n\nStep 1 — Understand the topic.\nTopic: Output-prediction: comprehensions, generators, and mutable state gotchas\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef squares(values):\n    for value in values:\n        yield value * value\n\ngenerator = squares([1, 2, 3])\nprint(next(generator))\nprint(list(generator))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nprint(list(\n    value * value\n    for value in [1, 2, 3]\n))\n```\n\nStep 5 — Example result:\n```text\n1\n[4, 9]\n```\n\nStep 6 — Complexity / trade-off:\nGenerators are lazy and stream values without materializing the full result.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'These are not just interview trivia — each pattern (comprehension scope, generator laziness, closure late-binding, mutable defaults) has caused REAL production bugs described earlier in this handbook (Module 1-2); this question format is specifically designed to test whether the underlying MECHANISM is understood well enough to predict behavior in a NEW, unseen snippet, not just recall a memorized rule.\n\nCoding practice: first explain the core/manual approach for **Output-prediction: comprehensions, generators, and mutable state gotchas**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'When reasoning about ANY output-prediction snippet, trace through WHEN each piece of code actually executes (definition time vs call time vs iteration time) rather than guessing from surface pattern-matching.',
      'For comprehensions specifically, remember Python 3 gives them their own scope — this differs from Python 2 and is a common point of confusion for engineers with older Python experience.',
      'For generators, remember NOTHING in the body runs until the first `next()`/iteration — a very common wrong guess is that print statements inside a generator function fire immediately upon calling it.',
    ],
    tradeOffs: 'N/A — these are correctness/comprehension checks, not a design trade-off.',
    commonMistakes: [
      'Assuming list-comprehension loop variables leak into the enclosing scope in Python 3 (they do not — this was true in Python 2, changed in Python 3).',
      'Assuming a generator function\'s print statements execute immediately when the function is called, rather than lazily as values are pulled.',
      'Missing that ALL FOUR of these gotchas share a common root cause category — timing of evaluation (definition-time vs call-time vs iteration-time) versus what candidates intuitively expect.',
    ],
    followUpQuestions: [
      'How would you rewrite Q3\'s `make_multipliers` to correctly produce `[0, 10, 20]` instead of `[20, 20, 20]`?',
      'What is the actual scoping rule difference between a list comprehension and a generator expression with respect to variable leakage?',
      'Can you construct a FIFTH snippet combining two of these gotchas at once (e.g. a mutable default that is ALSO built via a comprehension)?',
    ],
    relatedTopics: ['Output Prediction', 'Comprehension Scope', 'Generator Laziness', 'Closures', 'Mutable Defaults'],
  },
];

export const MOCK_PYTHON_MODULE5_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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