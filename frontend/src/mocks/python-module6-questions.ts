// Python + DSA Interview Handbook — Module 6: Exceptions, Files,
// Serialization and Logging. Hand-authored technical questions covering the
// exception hierarchy, custom exceptions and chaining, file I/O with
// pathlib, JSON serialization, and production logging practices. Mirrors
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
    id: 'python-m6-1',
    number: 'PY-M6-1',
    title: 'The exception hierarchy, try/except/else/finally, and custom exceptions',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Exceptions',
    expectedAnswer:
      'All exceptions inherit from `BaseException`; `Exception` is the practical root for application code (you should almost never catch `BaseException` directly, since it also covers `SystemExit`/`KeyboardInterrupt`). `try` runs risky code; `except` handles specific exception types (most specific first); `else` runs only if NO exception occurred; `finally` always runs, exception or not. Custom exceptions should subclass `Exception` (or a more specific built-in) to let callers catch precisely by TYPE instead of parsing error message strings.',
    deepExplanation:
      '```python\nclass InsufficientStockError(Exception):\n    def __init__(self, sku: str, requested: int, available: int):\n        super().__init__(f"{sku}: requested {requested}, only {available} available")\n        self.sku = sku\n        self.requested = requested\n        self.available = available\n\ndef reserve_stock(sku, qty):\n    available = get_available(sku)\n    if qty > available:\n        raise InsufficientStockError(sku, qty, available)\n    ...\n\ntry:\n    reserve_stock("WIDGET-1", 10)\nexcept InsufficientStockError as exc:\n    log.warning("stock reservation failed", extra={"sku": exc.sku, "available": exc.available})\nexcept (ConnectionError, TimeoutError) as exc:\n    log.error("upstream unavailable: %s", exc)\nelse:\n    print("reserved successfully")   # only runs if reserve_stock did NOT raise\nfinally:\n    release_lock()                    # ALWAYS runs — success, handled failure, or unhandled failure\n```\nWhy custom exception CLASSES beat encoding the error type in a message string: `except InsufficientStockError as exc: exc.sku` gives structured, typed access to the failure details for handling logic (retry, log fields, user-facing messages) — parsing `str(exc)` with regex to extract the SKU is fragile and breaks the moment the message wording changes.\n\n`except` clauses are checked TOP TO BOTTOM, and the FIRST matching one wins — so more specific exception types must be listed BEFORE more general ones (`except InsufficientStockError` before a broader `except Exception`), otherwise the general clause silently swallows the specific case first.',
    productionExample:
      'A payment service defines a small hierarchy — `PaymentError` (base) with `CardDeclinedError`, `InsufficientFundsError`, `FraudSuspectedError` as subclasses — so calling code can catch `PaymentError` broadly for generic handling, or catch `FraudSuspectedError` specifically to trigger an extra security workflow, all without any string parsing.',
    bestPractices: [
      'Define a small, meaningful exception hierarchy per domain/module (a base exception plus specific subclasses) rather than raising bare `Exception`/`ValueError` for every failure.',
      'Order `except` clauses from most specific to least specific — Python checks them in order and stops at the first match.',
      'Use `finally` (or a context manager) for cleanup that MUST happen regardless of success/failure — never rely on code after a `try` block "probably" running.',
    ],
    tradeOffs:
      'A rich exception hierarchy gives callers precise, typed error handling at the cost of more classes to define/maintain; a flatter approach (fewer custom exception types, more reliance on generic ones) is less upfront work but pushes error-type discrimination onto fragile string inspection later.',
    commonMistakes: [
      'Catching `Exception` (or worse, bare `except:`) broadly and silently swallowing errors that should have surfaced/crashed loudly.',
      'Listing a general `except Exception:` clause BEFORE a more specific one, which then never gets reached.',
      'Encoding meaningful error details only in the exception MESSAGE string rather than as structured attributes on a custom exception class.',
    ],
    followUpQuestions: [
      'Why is catching a bare `except:` (no exception type at all) almost always wrong, and what does it accidentally catch?',
      'What is the difference between putting cleanup code in `else` versus `finally`?',
      'How would you design an exception hierarchy for a multi-step order-processing pipeline with several distinct failure modes?',
    ],
    relatedTopics: ['Exceptions', 'Exception Hierarchy', 'Custom Exceptions', 'try/except/else/finally'],
  },
  {
    id: 'python-m6-2',
    number: 'PY-M6-2',
    title: 'Exception chaining: `raise ... from ...` and preserving root cause',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Exceptions',
    expectedAnswer:
      'When you catch one exception and raise a DIFFERENT one in response (e.g. wrapping a low-level error in a domain-specific one), `raise NewError(...) from original_exc` explicitly links them via `__cause__`, so the traceback shows BOTH the original root cause and the new wrapping exception — versus a bare `raise NewError(...)` inside an `except` block, which still shows both (via implicit `__context__`) but marks it as "During handling of the above exception, another exception occurred" rather than an intentional, explicit chain.',
    deepExplanation:
      '```python\ndef load_config(path):\n    try:\n        with open(path) as f:\n            return json.load(f)\n    except (OSError, json.JSONDecodeError) as exc:\n        raise ConfigError(f"failed to load config from {path}") from exc\n\ntry:\n    load_config("missing.json")\nexcept ConfigError as exc:\n    print(exc)              # "failed to load config from missing.json"\n    print(exc.__cause__)     # the original FileNotFoundError — full context preserved\n\n# raise NewError("x") from None explicitly SUPPRESSES the chain (use sparingly, when the\n# original exception is genuinely irrelevant noise for the caller, e.g. an internal retry detail)\ndef strict_parse(value):\n    try:\n        return int(value)\n    except ValueError:\n        raise InvalidInputError(f"{value!r} is not a valid integer") from None\n```\nWhy this matters in production: without explicit chaining, debugging a wrapped exception in a log/traceback often shows only the NEW, higher-level message ("failed to load config") with no visibility into WHY it actually failed (permission denied? malformed JSON? file missing?) — `from exc` (or even the implicit chain from a bare `raise NewError(...)` inside an `except` block) keeps that root-cause information attached to the traceback instead of discarding it.\n\n`from None` is the deliberate opposite — it explicitly says "this chain is not useful information, hide it" — appropriate when the original exception is an internal implementation detail that would just confuse the exception\'s eventual consumer (e.g. a user-facing validation error where "ValueError: invalid literal for int()" is noise on top of your own clear message).',
    productionExample:
      'An API layer catching a low-level database connection error and re-raising a `ServiceUnavailableError` uses `from exc` specifically so the ON-CALL engineer debugging a production incident can see the FULL chain (connection timeout -> service error) in the logged traceback, instead of just the generic wrapping message with no root cause.',
    bestPractices: [
      'Always use `raise NewError(...) from original_exc` when translating one exception type into another — preserves debugging context for free.',
      'Reserve `from None` specifically for cases where the original exception is genuinely internal noise that would confuse the exception\'s actual audience.',
      'Log the FULL exception chain (most logging frameworks/`traceback.format_exc()` do this automatically) rather than only the top-level message.',
    ],
    tradeOffs:
      'Explicit chaining costs nothing at runtime and only adds value; the only real trade-off is `from None` deliberately DISCARDING debugging information in exchange for a cleaner, less confusing exception for the end consumer — a decision that should be made intentionally per boundary, not as a blanket default.',
    commonMistakes: [
      'Catching an exception and re-raising a new one WITHOUT `from exc`, silently making root-cause debugging harder (though Python still shows an implicit chain via `__context__` unless `from None` is used).',
      'Using `from None` everywhere as a habit, discarding genuinely useful debugging information from internal/operational error paths.',
      'Logging only `str(exc)` instead of the full traceback (`traceback.format_exc()` or the logging framework\'s `exc_info=True`), losing the chain entirely regardless of how it was raised.',
    ],
    followUpQuestions: [
      'What is the difference between `__cause__` (explicit `from`) and `__context__` (implicit, from being inside an `except` block)?',
      'When would you deliberately use `raise ... from None`, and why?',
      'How would you extract and log the full exception chain, not just the top-level exception\'s message?',
    ],
    relatedTopics: ['Exception Chaining', 'raise from', '__cause__', '__context__', 'Debugging'],
  },
  {
    id: 'python-m6-3',
    number: 'PY-M6-3',
    title: 'File I/O: context managers, modes, and `pathlib`',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'Files',
    expectedAnswer:
      'Always open files via `with open(...) as f:` — the context manager guarantees the file is closed even if an exception occurs while reading/writing, unlike a bare `f = open(...)` which leaks the file handle on any error before an explicit `f.close()`. `pathlib.Path` is the modern, object-oriented, cross-platform-correct way to handle filesystem paths, generally preferred over manually joining strings with `os.path`.',
    deepExplanation:
      '```python\nfrom pathlib import Path\n\n# Reading\nwith open("data.txt", encoding="utf-8") as f:\n    contents = f.read()          # whole file into memory\n\nwith open("data.txt", encoding="utf-8") as f:\n    for line in f:                # lazy, line-by-line — memory-efficient for large files\n        process(line.strip())\n\n# Writing modes: "w" truncates/creates, "a" appends, "x" fails if the file already exists\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write("hello\\n")\n\n# Binary mode for non-text data\nwith open("image.png", "rb") as f:\n    header = f.read(8)\n\n# pathlib — object-oriented, cross-platform path handling\ndata_dir = Path("data") / "2026" / "reports"   # `/` overload for joining, correct on any OS\ndata_dir.mkdir(parents=True, exist_ok=True)\nfor csv_file in data_dir.glob("*.csv"):\n    print(csv_file.stem, csv_file.suffix, csv_file.stat().st_size)\n\ncontent = (data_dir / "summary.txt").read_text(encoding="utf-8")   # shortcut, still safe\n```\nWhy `with` matters even for READ-only operations: an exception raised WHILE reading (e.g. mid-loop, from a downstream `process()` call) would otherwise leave the file handle open for the rest of the process\'s lifetime without an explicit `try/finally: f.close()` — on a long-running service processing many files, this leaks file descriptors and can eventually hit the OS\'s open-file-descriptor limit, causing unrelated later operations to fail with `OSError: too many open files`.\n\n`pathlib.Path` methods (`.read_text()`, `.write_text()`, `.glob()`, `.exists()`, `.is_file()`) ALSO handle the context-manager/closing correctly under the hood for the single-call convenience methods, while being far more readable and OS-portable than manual `os.path.join`/`os.listdir` string manipulation.',
    productionExample:
      'A log-rotation or batch-file-processing job that opens hundreds of files per run MUST use `with` for every single one — without it, a single malformed file that raises mid-processing leaves that handle open, and after enough repeated runs/malformed files, the process eventually crashes with "too many open files", a real and painful production incident class.',
    bestPractices: [
      'Always use `with open(...) as f:` (or a `pathlib.Path` convenience method) — never a bare `open()` without a guaranteed close.',
      'Always pass `encoding="utf-8"` explicitly for text files (see Module 1\'s encoding question) rather than relying on the platform default.',
      'Prefer `pathlib.Path` over manual `os.path` string joining for new code — clearer, less error-prone across platforms, and provides convenient methods (`.glob`, `.stat`, `.exists`) directly on the path object.',
    ],
    tradeOffs:
      'Reading a whole file with `.read()` is simple but O(file size) memory; line-by-line iteration (`for line in f:`) is nearly as simple and uses O(1) memory per line — prefer the latter for files that could be large, and reserve `.read()` for files known to be small (config files, small fixtures).',
    commonMistakes: [
      'Opening a file without `with` and forgetting to close it, especially inside a function where an early `return`/exception skips a manual `f.close()` call placed at the end.',
      'Not specifying `encoding="utf-8"` explicitly, causing platform-dependent decoding behavior (Module 1\'s encoding trap, applied to file I/O specifically).',
      'Using `.read()` to load an entire multi-gigabyte file into memory when line-by-line iteration or chunked reading would suffice.',
    ],
    followUpQuestions: [
      'What specifically happens to a file handle if an exception is raised inside a `with open(...) as f:` block partway through processing?',
      'What is the practical difference between `"w"` and `"x"` file modes, and when would you specifically want `"x"`?',
      'How would you process a file too large to fit in memory, in fixed-size chunks rather than line-by-line?',
    ],
    relatedTopics: ['File I/O', 'Context Managers', 'pathlib', 'Encoding', 'Resource Leaks'],
  },
  {
    id: 'python-m6-4',
    number: 'PY-M6-4',
    title: 'JSON serialization: `json.dumps`/`loads`, custom encoders, and common pitfalls',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Serialization',
    expectedAnswer:
      '`json.dumps(obj)` serializes a Python object to a JSON string (`json.dump` writes directly to a file); `json.loads(s)` parses a JSON string back into Python objects (`json.load` reads directly from a file). JSON has a smaller type system than Python — tuples become JSON arrays (and come back as `list`, not `tuple`), dict keys are always coerced to strings, and types like `datetime`/`Decimal`/custom classes are NOT serializable by default and need a custom encoder or explicit conversion.',
    deepExplanation:
      '```python\nimport json\nfrom datetime import datetime, date\nfrom decimal import Decimal\n\ndata = {"name": "Ada", "tags": ("admin", "eng"), "score": 9.5}\njson.dumps(data)\n# \'{"name": "Ada", "tags": ["admin", "eng"], "score": 9.5}\'  — tuple became a JSON array\n\nparsed = json.loads(json.dumps(data))\ntype(parsed["tags"])   # <class \'list\'> — NOT tuple; the round trip is LOSSY for type\n\njson.dumps({1: "a", 2: "b"})\n# \'{"1": "a", "2": "b"}\'  — integer keys silently become STRING keys in JSON\n\njson.dumps({"created": datetime.now()})\n# TypeError: Object of type datetime is not JSON serializable\n\nclass EnhancedJSONEncoder(json.JSONEncoder):\n    def default(self, obj):\n        if isinstance(obj, (datetime, date)):\n            return obj.isoformat()\n        if isinstance(obj, Decimal):\n            return str(obj)   # preserve precision — do NOT convert to float\n        return super().default(obj)\n\njson.dumps({"created": datetime.now()}, cls=EnhancedJSONEncoder)\n# \'{"created": "2026-08-20T10:30:00.123456"}\'\n```\nWhy `Decimal` must be converted to `str`, not `float`: converting `Decimal("19.99")` to `float` reintroduces exactly the binary floating-point precision error that `Decimal` was chosen to avoid in the first place (Module 1\'s float question) — serializing as a string preserves exact precision, and the CONSUMER is responsible for parsing it back into a `Decimal` if further arithmetic is needed.\n\nThe int-key-becomes-string-key behavior is a very common silent-data-shape-change bug: code that builds a dict keyed by integer IDs, serializes it to JSON for an API response or cache, and later deserializes it, will get back a dict with STRING keys unless it explicitly converts them back — this breaks `if user_id in parsed_dict:` checks that assume integer keys.',
    productionExample:
      'An API response cache (serialize a Python dict to JSON, store in Redis, deserialize on read) that keys its cache dict by integer user IDs will silently break lookups after the round trip unless the consuming code explicitly converts keys back to `int` — a real, easy-to-miss production bug rooted directly in this JSON type-coercion behavior.',
    bestPractices: [
      'Never assume a JSON round trip preserves Python types exactly — explicitly convert (`datetime` <-> ISO string, `Decimal` <-> string, tuple accepted as list) at both serialization and deserialization boundaries.',
      'Write a custom `json.JSONEncoder` subclass (or pass a `default=` function) for any application-specific types instead of manually pre-converting every field by hand at every call site.',
      'Use `json.dumps(..., indent=2)` for human-readable debug output/config files, but omit `indent` (compact) for production wire payloads to save bandwidth.',
    ],
    tradeOffs:
      'JSON is universally interoperable and human-readable but has a genuinely smaller type system than Python, forcing explicit conversion for anything beyond str/int/float/bool/None/list/dict; a Python-specific format like `pickle` preserves types exactly but is insecure to deserialize from untrusted sources and not interoperable with non-Python systems.',
    commonMistakes: [
      'Assuming a `tuple` survives a JSON round trip as a `tuple` — it always comes back as a `list`.',
      'Assuming integer dict keys survive a JSON round trip as integers — they are always coerced to strings.',
      'Converting `Decimal` values to `float` before serializing "to make JSON happy," silently reintroducing floating-point precision errors for money/precise values.',
    ],
    followUpQuestions: [
      'Why does JSON coerce all dictionary keys to strings, and how would you safely restore integer keys after deserializing?',
      'What is the security risk of using `pickle` instead of `json` for data from an untrusted source, and why does `json` not have that risk?',
      'How would you serialize a `set` to JSON, given that JSON has no native set type?',
    ],
    relatedTopics: ['JSON', 'Serialization', 'Custom Encoders', 'pickle', 'Type Coercion'],
  },
  {
    id: 'python-m6-5',
    number: 'PY-M6-5',
    title: 'Production logging: levels, handlers, formatters, and structured logging',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Logging',
    expectedAnswer:
      'The standard `logging` module separates LOGGERS (named, hierarchical entry points your code calls), HANDLERS (where records go — console, file, network), and FORMATTERS (how a record is rendered) — this separation lets the SAME log call be simultaneously written to a rotating file AND streamed to a monitoring system with different formats, without changing application code. Log LEVELS (DEBUG < INFO < WARNING < ERROR < CRITICAL) let you filter verbosity per-environment without code changes. Structured logging (attaching key-value fields, often as JSON) makes logs machine-parseable for alerting/dashboards, not just human-readable.',
    deepExplanation:
      '```python\nimport logging\nimport logging.handlers\n\nlogger = logging.getLogger(__name__)   # hierarchical naming, e.g. "myapp.payments"\nlogger.setLevel(logging.INFO)\n\nhandler = logging.handlers.RotatingFileHandler(\n    "app.log", maxBytes=10_000_000, backupCount=5\n)\nformatter = logging.Formatter(\n    "%(asctime)s %(levelname)s %(name)s %(message)s"\n)\nhandler.setFormatter(formatter)\nlogger.addHandler(handler)\n\nlogger.info("order processed", extra={"order_id": 123, "amount": 49.99})\n\n# Common beginner mistake vs correct lazy formatting:\nlogger.info(f"processing order {order_id}")            # BAD — f-string ALWAYS builds the message,\n                                                          # even if INFO logs are filtered out downstream\nlogger.info("processing order %s", order_id)             # GOOD — lazy: only formats if this record\n                                                          # actually passes the level filter and gets handled\n```\nWhy lazy `%s`-style formatting matters at scale: `logger.debug(f"expensive: {compute_debug_summary()}")` ALWAYS calls `compute_debug_summary()` and builds the string, even when DEBUG logging is disabled in production — `logger.debug("expensive: %s", compute_debug_summary())` still has the same problem for the ARGUMENT itself (it is still evaluated eagerly, since Python evaluates function arguments before the call), so the real fix for a genuinely expensive-to-compute debug value is `if logger.isEnabledFor(logging.DEBUG): logger.debug(...)` — but for the FORMATTING step itself (not argument computation), lazy `%s` avoids the string-building/interpolation cost when the message text itself is cheap but building it is not free (e.g. serializing a large object\'s repr).\n\nRotating file handlers (`maxBytes`/`backupCount`) prevent an unbounded, ever-growing log file from filling the disk — a real operational concern for any long-running service.',
    productionExample:
      'A production service typically routes INFO+ logs to stdout (collected by the container platform / log aggregator) with a JSON formatter (so the log aggregator can index fields like `order_id` for search/alerting), while DEBUG-level logs are either disabled or routed only to a local rotating file for on-demand troubleshooting — the exact separation of concerns (logger -> handler -> formatter) is what makes this configuration possible without touching any application `logger.info(...)` call sites.',
    bestPractices: [
      'Use `logger.info("...", extra={...})` (or a JSON/structured logging library) to attach queryable fields, rather than interpolating everything into one opaque message string.',
      'Use lazy `%s`-style argument passing (`logger.info("msg %s", value)`) instead of eager f-string interpolation for log messages, so formatting cost is skipped when the level is filtered out.',
      'Configure log levels per environment (DEBUG locally, INFO/WARNING in production) rather than hardcoding one level everywhere, and use rotating handlers to bound disk usage.',
    ],
    tradeOffs:
      'Structured (JSON) logging is far more useful for automated alerting/dashboards but is harder to visually scan in a raw terminal than a plain human-readable format — many production setups keep a human-readable console format for local dev and a structured JSON format for the deployed environment\'s log aggregator.',
    commonMistakes: [
      'Using `print()` instead of the `logging` module in production code, losing levels, handlers, and structured fields entirely.',
      'Building log messages with eager f-strings in hot paths, paying formatting cost even when that log level is disabled.',
      'Letting a log file grow unbounded without a rotating handler, eventually filling the disk on a long-running service.',
    ],
    followUpQuestions: [
      'Why is `logger.info(f"...")` potentially wasteful compared to `logger.info("...", arg)` even though both produce the same final message?',
      'How would you route DEBUG logs to a local file while sending only WARNING+ logs to a centralized alerting system, using the same `logger` calls throughout the codebase?',
      'What is the risk of logging sensitive data (passwords, tokens, PII) via `extra={}` fields, and how would you prevent it?',
    ],
    relatedTopics: ['Logging', 'Log Levels', 'Handlers', 'Formatters', 'Structured Logging', 'Rotating Logs'],
  },
];

export const MOCK_PYTHON_MODULE6_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
