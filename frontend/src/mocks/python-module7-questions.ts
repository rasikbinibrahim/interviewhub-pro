// Python + DSA Interview Handbook — Module 7: Async Python and Concurrency.
// Hand-authored, senior-level technical questions covering the GIL,
// threading vs multiprocessing vs asyncio, the asyncio event loop and
// coroutines, and concurrent-request/retry/backoff patterns. Mirrors the
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
    id: 'python-m7-1',
    number: 'PY-M7-1',
    title: 'The GIL: what it is, why it exists, and when it actually matters',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'GIL',
    expectedAnswer:
      'The Global Interpreter Lock is a single mutex in CPython ensuring only ONE thread executes Python bytecode at a time, even on a multi-core machine — it exists primarily because CPython\'s reference-counting memory management is not thread-safe without it (every object touch increments/decrements a refcount; without a lock, concurrent updates from multiple threads would race and corrupt memory). The practical consequence: Python THREADS do not give true parallelism for CPU-bound work, but DO help for I/O-bound work, because the GIL is released during blocking I/O calls.',
    deepExplanation:
      '```python\nimport threading\nimport time\n\ndef cpu_bound(n):\n    total = 0\n    for i in range(n):\n        total += i * i\n    return total\n\nstart = time.perf_counter()\ncpu_bound(50_000_000)\ncpu_bound(50_000_000)\nprint("sequential:", time.perf_counter() - start)\n\nstart = time.perf_counter()\nt1 = threading.Thread(target=cpu_bound, args=(50_000_000,))\nt2 = threading.Thread(target=cpu_bound, args=(50_000_000,))\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint("threaded:", time.perf_counter() - start)\n# threaded is NOT meaningfully faster than sequential — the GIL serializes bytecode execution,\n# so two CPU-bound threads take roughly the SAME total wall time as running them one after another\n# (often even slightly SLOWER, due to GIL contention/switching overhead).\n```\nWhy I/O-bound threading DOES help: when a thread calls a blocking I/O operation (`socket.recv()`, `file.read()`, `time.sleep()`), CPython explicitly RELEASES the GIL for the duration of that OS-level call, letting another thread run Python bytecode in the meantime — so 10 threads each waiting on a slow network request genuinely overlap their WAITING time, even though only one is ever executing Python bytecode at any instant.\n\nWhy the GIL exists at all (not just "a historical mistake"): removing it entirely (attempted multiple times, e.g. the "Gilectomy" project, and finally shipping as an OPTIONAL free-threaded build starting around Python 3.13) requires replacing simple, fast reference counting with more complex thread-safe alternatives, which historically made SINGLE-threaded code measurably slower — a real trade-off between single-threaded speed (what most Python programs are) and multi-threaded CPU parallelism.',
    productionExample:
      'A web-scraping service issuing thousands of HTTP requests is a textbook I/O-bound workload where Python threading (or better, asyncio) gives a large real speedup, because almost all wall-clock time is spent WAITING on network responses, not executing Python bytecode; the same team\'s image-resizing batch job (CPU-bound) sees NO speedup from threading and instead needs `multiprocessing` (separate processes, separate GILs) or a native extension.',
    bestPractices: [
      'Use `threading`/`asyncio` for I/O-bound work (network calls, file I/O, database queries) where the GIL is released during the actual wait.',
      'Use `multiprocessing` (or a native extension like numpy/Cython/Rust bindings) for CPU-bound work, since separate processes each have their OWN GIL and genuinely run in parallel across cores.',
      'Profile before assuming a workload is one or the other — a "mostly I/O" service can still have CPU-bound hot spots (JSON parsing, serialization) that would not benefit from threading alone.',
    ],
    tradeOffs:
      'Threads are lightweight (shared memory, cheap to create, easy data sharing) but limited to I/O-bound parallelism due to the GIL; processes give genuine CPU parallelism but are heavier (separate memory space, expensive to spawn, data must be explicitly serialized/copied between them via IPC) — asyncio sits in a third category: single-threaded but explicitly cooperative, avoiding both GIL contention AND thread-safety concerns entirely for I/O-bound code.',
    commonMistakes: [
      'Using `threading` to try to speed up a CPU-bound loop and being confused when it does not get faster (or gets slightly slower).',
      'Assuming the GIL means Python has "no real concurrency" at all — it specifically limits PARALLEL BYTECODE EXECUTION, not I/O-bound concurrency, which threading/asyncio both handle well.',
      'Forgetting that C extensions (numpy, many I/O libraries) can and do release the GIL internally during their own native computation, so "numpy in a thread" can sometimes parallelize even though "pure Python math in a thread" cannot.',
    ],
    followUpQuestions: [
      'Why does CPython release the GIL during blocking I/O calls but not during pure Python computation?',
      'How does `multiprocessing` sidestep the GIL, and what does that cost in terms of memory/communication overhead?',
      'What is the free-threaded (no-GIL) CPython build, and what trade-off did it historically make for single-threaded performance?',
    ],
    relatedTopics: ['GIL', 'Threading', 'Multiprocessing', 'CPython Internals', 'Reference Counting', 'I/O-Bound vs CPU-Bound'],
  },
  {
    id: 'python-m7-2',
    number: 'PY-M7-2',
    title: 'asyncio fundamentals: the event loop, coroutines, `async`/`await`',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'asyncio',
    expectedAnswer:
      '`asyncio` runs a single-threaded EVENT LOOP that cooperatively schedules many coroutines, switching between them only at explicit `await` points (never preemptively, unlike OS thread scheduling) — this means two coroutines can never race on a shared variable BETWEEN await points, a major simplification versus thread-safety concerns. `async def` defines a coroutine FUNCTION; calling it returns a coroutine OBJECT that does nothing until awaited or scheduled; `await` suspends the current coroutine until the awaited operation completes, yielding control back to the event loop to run something else meanwhile.',
    deepExplanation:
      '```python\nimport asyncio\nimport time\n\nasync def fetch(name, delay):\n    print(f"{name}: starting")\n    await asyncio.sleep(delay)   # yields control to the event loop for `delay` seconds\n    print(f"{name}: done")\n    return f"{name} result"\n\nasync def main():\n    start = time.perf_counter()\n    results = await asyncio.gather(\n        fetch("A", 2),\n        fetch("B", 1),\n        fetch("C", 3),\n    )\n    print(results, time.perf_counter() - start)\n    # A: starting / B: starting / C: starting  (all three start immediately, in order)\n    # B: done (after ~1s) / A: done (after ~2s) / C: done (after ~3s)\n    # total elapsed ~3s — NOT 2+1+3=6s, because all three `sleep`s overlap concurrently\n\nasyncio.run(main())\n```\nWhy calling `fetch("A", 2)` alone (without `await` or `gather`/`create_task`) does NOTHING: it just constructs a coroutine OBJECT — Python even emits a `RuntimeWarning: coroutine was never awaited` if you call it and discard the result without ever awaiting/scheduling it, since the function body never actually runs.\n\n`asyncio.gather(...)` runs multiple awaitables CONCURRENTLY and waits for all to finish, collecting results in the same order they were passed (not completion order); `asyncio.create_task(coro)` schedules a coroutine to start running in the background immediately (without waiting for it yet), which is how you kick off concurrent work that you plan to `await` LATER, after doing other things in between.\n\nCrucially, this is COOPERATIVE concurrency on ONE thread: it does not use multiple CPU cores and gives no benefit for CPU-bound work (same GIL limitation, but here self-imposed by never yielding — a CPU-bound `async def` that never `await`s anything will block the entire event loop, starving every other coroutine until it finishes).',
    productionExample:
      'A backend service fetching data from three independent downstream APIs to assemble one response uses `asyncio.gather(fetch_user(), fetch_orders(), fetch_recommendations())` to issue all three requests concurrently — turning what would be a sequential ~300ms (100ms each, one after another) into roughly ~100ms total (the slowest single call), which is a very common, very real production async-Python win.',
    bestPractices: [
      'Use `asyncio.gather()` (or `asyncio.TaskGroup` in modern Python) to run independent async operations CONCURRENTLY rather than `await`ing them one at a time in sequence.',
      'Never put CPU-bound, long-running synchronous code directly inside an `async def` without yielding — it blocks the ENTIRE event loop, starving every other coroutine; offload it via `loop.run_in_executor()` instead.',
      'Always actually `await` (or explicitly schedule via `create_task`) a coroutine — calling it alone silently does nothing and Python will warn you.',
    ],
    tradeOffs:
      'asyncio gives massive I/O concurrency wins on a single thread with no locking/thread-safety concerns, at the cost of requiring the ENTIRE call chain (and any libraries used) to be async-aware — mixing in a blocking synchronous call anywhere in that chain silently stalls the whole event loop, which is a much harsher failure mode than a slow synchronous thread merely being slow on its own.',
    commonMistakes: [
      'Calling an `async def` function without `await`ing it, silently doing nothing (and getting a `RuntimeWarning`).',
      'Awaiting several independent coroutines one at a time in sequence (`await fetch(A); await fetch(B)`) instead of using `gather`, losing all the concurrency benefit.',
      'Calling a blocking, synchronous, slow function (e.g. `requests.get()` instead of an async HTTP client, or `time.sleep()` instead of `asyncio.sleep()`) inside an `async def`, freezing the entire event loop for every other concurrent task.',
    ],
    followUpQuestions: [
      'Why can two coroutines never race on shared state BETWEEN await points, while two OS threads can race at any instruction boundary?',
      'What actually happens if you call a slow, blocking, synchronous function inside an `async def` coroutine?',
      'What is the difference between `asyncio.gather()` and `asyncio.create_task()` in terms of when execution actually starts?',
    ],
    relatedTopics: ['asyncio', 'Event Loop', 'Coroutines', 'async/await', 'asyncio.gather', 'Cooperative Concurrency'],
  },
  {
    id: 'python-m7-3',
    number: 'PY-M7-3',
    title: 'Coding: rate-limited concurrent requests with `asyncio.Semaphore`',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'asyncio',
    expectedAnswer:
      '`asyncio.Semaphore(n)` caps how many coroutines can hold the semaphore (and therefore be "in flight" doing the guarded work) simultaneously — a direct, idiomatic way to rate-limit concurrent requests against a downstream service that cannot handle unlimited parallel load, while still processing everything as fast as that cap allows.',
    deepExplanation:
      '```python\nimport asyncio\n\nasync def fetch_with_limit(session, url, semaphore):\n    async with semaphore:              # blocks here if `n` requests are already in flight\n        async with session.get(url) as response:\n            return await response.text()\n\nasync def fetch_all(urls, max_concurrent=5):\n    semaphore = asyncio.Semaphore(max_concurrent)\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_with_limit(session, url, semaphore) for url in urls]\n        return await asyncio.gather(*tasks)\n\n# Timeout handling for an individual request:\nasync def fetch_with_timeout(session, url, timeout_seconds=5):\n    try:\n        async with asyncio.timeout(timeout_seconds):   # Python 3.11+\n            async with session.get(url) as response:\n                return await response.text()\n    except asyncio.TimeoutError:\n        return None   # or raise a domain-specific error\n\n# Retry with exponential backoff\nasync def fetch_with_retry(session, url, max_attempts=4):\n    for attempt in range(1, max_attempts + 1):\n        try:\n            async with session.get(url) as response:\n                response.raise_for_status()\n                return await response.text()\n        except aiohttp.ClientError:\n            if attempt == max_attempts:\n                raise\n            await asyncio.sleep(2 ** attempt)   # 2s, 4s, 8s, ... exponential backoff\n```\nWhy `Semaphore` is the right tool here (not just `gather` alone): `asyncio.gather(*[fetch(url) for url in 10_000_urls])` would fire ALL 10,000 requests essentially at once — likely overwhelming the downstream server, hitting connection-pool limits, or getting rate-limited/blocked by it. Wrapping each request in `async with semaphore:` ensures at most `max_concurrent` requests are actually in flight at any instant, while still processing the FULL list as fast as that cap allows, rather than falling back to fully sequential (one at a time) processing.',
    productionExample:
      'A data-collector service pulling from a third-party API with a documented "20 requests/second" rate limit uses exactly this semaphore pattern (sized to stay under that limit) combined with retry+backoff for the inevitable occasional 429/500 response — this is a standard, load-bearing production pattern for any service that fans out to a rate-limited dependency.',
    bestPractices: [
      'Size the semaphore based on the DOWNSTREAM service\'s actual documented/observed capacity, not an arbitrary guess — too high defeats the purpose, too low leaves throughput on the table.',
      'Combine rate limiting (semaphore) with per-request timeouts AND retry-with-backoff — each solves a different failure mode (overload, hung connection, transient error) and all three are typically needed together in production.',
      'Use exponential backoff (with jitter, ideally) for retries against a struggling service, never a fixed short delay, to avoid synchronized "retry storms" across many concurrent callers.',
    ],
    tradeOffs:
      'A semaphore-based concurrency cap maximizes throughput up to the configured limit but requires knowing/tuning that limit correctly; a simpler fully-sequential approach needs no tuning but leaves significant performance on the table for I/O-bound fan-out work.',
    commonMistakes: [
      'Using `asyncio.gather()` on a large URL list with no concurrency cap at all, overwhelming the downstream service or exhausting local resources (open connections).',
      'Retrying immediately with no backoff delay, worsening load on an already-struggling downstream service (a retry storm).',
      'Not setting a per-request timeout, letting one hung connection stall that slot indefinitely (and, without a semaphore accounting for it correctly, potentially starving the whole batch).',
    ],
    followUpQuestions: [
      'How would you adapt this pattern to also respect a downstream `Retry-After` header on a 429 response?',
      'What would happen if you accidentally created the `Semaphore` INSIDE the per-request coroutine instead of once, shared, outside the loop?',
      'How would you extend this into a persistent async task QUEUE that continuously pulls new URLs to fetch, rather than a fixed one-shot batch?',
    ],
    relatedTopics: ['asyncio.Semaphore', 'Rate Limiting', 'Retry with Backoff', 'Timeouts', 'Concurrent Requests'],
  },
  {
    id: 'python-m7-4',
    number: 'PY-M7-4',
    title: 'Threading vs multiprocessing vs asyncio: choosing the right tool',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Concurrency Models',
    expectedAnswer:
      'Choose based on the workload SHAPE: I/O-bound with many concurrent operations and async-compatible libraries -> asyncio (highest throughput, lowest per-task overhead, single thread, no locking needed). I/O-bound but working with blocking/synchronous-only libraries -> threading (simpler to retrofit onto existing sync code, GIL releases during I/O). CPU-bound -> multiprocessing (or a native extension), since only separate processes get genuine parallel execution across cores.',
    deepExplanation:
      '```python\n# I/O-bound, async-compatible library available -> asyncio (best throughput, least overhead)\nasync def fetch_many(urls):\n    async with aiohttp.ClientSession() as session:\n        return await asyncio.gather(*(session.get(u) for u in urls))\n\n# I/O-bound, but stuck with a synchronous-only library (e.g. an old DB driver) -> threading\nimport concurrent.futures\ndef fetch_sync(url):\n    return requests.get(url)   # blocking, releases the GIL during the actual network wait\n\nwith concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:\n    results = list(pool.map(fetch_sync, urls))\n\n# CPU-bound (e.g. image processing, numeric simulation) -> multiprocessing\nimport concurrent.futures\ndef process_image(path):\n    ...  # genuinely CPU-heavy work\n\nwith concurrent.futures.ProcessPoolExecutor(max_workers=4) as pool:\n    results = list(pool.map(process_image, image_paths))   # true parallel execution, separate GILs\n```\nRough decision framework: "Am I mostly WAITING (network, disk, DB) or mostly COMPUTING (loops, math, parsing)?" — waiting favors asyncio/threading (the GIL is released or irrelevant while waiting), computing favors multiprocessing (only separate processes escape the single-GIL bottleneck). A useful mixed strategy: use `asyncio` for the I/O-bound orchestration layer of a service, and hand off any genuinely CPU-heavy sub-task to a `ProcessPoolExecutor` via `loop.run_in_executor()` so it does not block the event loop.\n\nasyncio vs threading for I/O-bound work specifically: asyncio scales to tens of thousands of concurrent "tasks" cheaply (a coroutine is far lighter-weight than an OS thread, no OS-level context-switch or stack allocation per task) while threading realistically tops out in the hundreds/low-thousands of threads before OS overhead dominates — but asyncio requires your ENTIRE call chain (including third-party libraries) to be async-compatible, while threading works with any existing blocking/synchronous code unmodified.',
    productionExample:
      'A real backend often uses all three in different layers: `asyncio`/FastAPI for the request-handling layer (thousands of concurrent HTTP connections, I/O-bound), a `ThreadPoolExecutor` to call an older synchronous SDK that has no async version, and a `ProcessPoolExecutor` (or a dedicated worker service) for a genuinely CPU-heavy report-generation task — picking the tool per workload SHAPE rather than standardizing on just one.',
    bestPractices: [
      'Default new I/O-bound code to `asyncio` when the ecosystem (HTTP client, DB driver) has good async support — it scales furthest with the least overhead.',
      'Reach for `ThreadPoolExecutor` as the pragmatic bridge when you must call blocking/synchronous code from an otherwise-async codebase, or when retrofitting concurrency onto existing synchronous code without a full async rewrite.',
      'Reach for `ProcessPoolExecutor`/`multiprocessing` specifically and only for CPU-bound work — using it for I/O-bound work wastes the (comparatively expensive) process-spawn/IPC overhead for no parallelism benefit.',
    ],
    tradeOffs:
      'asyncio: highest I/O concurrency and lowest overhead, but an all-or-nothing async ecosystem requirement. Threading: works with existing synchronous code with minimal changes, but limited by GIL for CPU work and by OS thread overhead at very large scale. Multiprocessing: true CPU parallelism, but highest per-task overhead (process spawn, data serialization across process boundaries via pickling) and higher memory usage (separate address spaces).',
    commonMistakes: [
      'Reaching for `multiprocessing` for an I/O-bound workload, paying process-spawn/IPC overhead for no actual benefit over threading/asyncio.',
      'Mixing blocking synchronous calls directly into `asyncio` code without offloading them to an executor, silently stalling the entire event loop.',
      'Assuming `ThreadPoolExecutor` will speed up a CPU-bound task the same way `ProcessPoolExecutor` would — it will not, due to the GIL.',
    ],
    followUpQuestions: [
      'How would you offload a CPU-heavy computation from inside an otherwise-async FastAPI request handler without blocking the event loop?',
      'Why does multiprocessing require arguments/return values to be picklable, and what practical limitation does that impose?',
      'At roughly what number of concurrent operations does asyncio\'s overhead advantage over threading become most significant, and why?',
    ],
    relatedTopics: ['Threading', 'Multiprocessing', 'asyncio', 'ThreadPoolExecutor', 'ProcessPoolExecutor', 'Concurrency Model Selection'],
  },
];

export const MOCK_PYTHON_MODULE7_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
