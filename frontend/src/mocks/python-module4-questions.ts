// Python + DSA Interview Handbook — Module 4: Python OOP.
// Hand-authored technical questions covering classes/instances, the four
// pillars, inheritance/MRO/the diamond problem, composition, ABCs,
// properties, dataclasses, and magic methods. Mirrors the
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
    id: 'python-m4-1',
    number: 'PY-M4-1',
    title: 'Classes, `self`, instance vs class variables, and the three method types',
    difficulty: 'Easy',
    experienceLevel: '0–2 Years',
    category: 'OOP Fundamentals',
    expectedAnswer:
      '`self` is the conventional name for the instance being operated on, implicitly passed as the first argument to instance methods (Python does not have an implicit `this`). Instance variables (set via `self.x = ...`, usually in `__init__`) belong to each object separately; class variables (defined directly in the class body) are SHARED across all instances unless shadowed by an instance variable of the same name. `@classmethod` receives the class (`cls`) instead of an instance; `@staticmethod` receives neither.',
    deepExplanation:
      '```python\nclass Account:\n    bank_name = "Chase"   # class variable — shared by ALL instances\n\n    def __init__(self, owner, balance=0):\n        self.owner = owner       # instance variable — unique per object\n        self.balance = balance\n\n    def deposit(self, amount):   # instance method — operates on self\n        self.balance += amount\n\n    @classmethod\n    def from_string(cls, data: str):   # alternate constructor — receives the CLASS\n        owner, balance = data.split(",")\n        return cls(owner, float(balance))\n\n    @staticmethod\n    def is_valid_amount(amount):        # a pure utility, no access to self or cls\n        return amount > 0\n\na = Account("Ada", 100)\nb = Account("Bo", 50)\na.bank_name = "Wells Fargo"   # creates an INSTANCE variable on `a`, shadowing the class variable\nprint(a.bank_name, b.bank_name)   # Wells Fargo Chase — b still sees the class-level value\nprint(Account.bank_name)          # Chase — the class attribute itself is unchanged\n```\nThe key gotcha: `a.bank_name = "Wells Fargo"` does NOT mutate the shared class variable — it creates a brand-new INSTANCE attribute on `a` that merely shadows the class attribute during lookup on `a`. To actually change the shared value for everyone, you must assign via the class itself: `Account.bank_name = "Wells Fargo"`. This is the same mutable-vs-rebind distinction from Module 1/2, applied to attribute lookup (which walks instance `__dict__` first, then the class, then base classes — this IS the object-attribute side of MRO).',
    productionExample:
      '`@classmethod` alternate constructors (`from_string`, `from_json`, `from_row`) are a very common production pattern for building an object from different serialized forms without overloading `__init__` with a pile of conditional branches — e.g. `User.from_db_row(row)` and `User.from_api_payload(payload)` both ultimately call the same `__init__`.',
    bestPractices: [
      'Use `@classmethod` for alternate constructors that need access to the class (`cls`), not `@staticmethod`, so subclasses correctly construct THEIR OWN type when the classmethod is inherited.',
      'Use `@staticmethod` only for pure helper logic that genuinely needs neither `self` nor `cls` — if you find yourself wanting to reference the class inside it, it should be a `@classmethod` instead.',
      'Avoid mutable class variables (a class-level `[]` or `{}`) for anything meant to be per-instance state — it is the class-attribute analogue of the mutable-default-argument trap from Module 2.',
    ],
    tradeOffs:
      'Class variables are efficient for genuinely shared, constant-ish data (e.g. a config value, a counter of total instances created) but are a footgun for anything that should vary per instance — the fix (moving it into `__init__` as `self.x`) costs nothing and removes an entire class of aliasing bugs.',
    commonMistakes: [
      'Using a mutable class variable (e.g. `class Foo: items = []`) intending it as a per-instance default, then discovering every instance shares and mutates the SAME list.',
      'Defining a constructor helper as `@staticmethod` instead of `@classmethod`, so a subclass calling the inherited alternate constructor incorrectly builds an instance of the BASE class instead of the subclass.',
      'Assigning `instance.class_var = new_value` expecting it to update the shared class-level value for all instances — it only shadows it locally on that one instance.',
    ],
    followUpQuestions: [
      'Why does `a.bank_name = "X"` not affect `b.bank_name` or `Account.bank_name`, but `Account.bank_name = "X"` does affect both `a` and `b` (when neither has its own instance-level override)?',
      'Why should an alternate-constructor helper be a `@classmethod` rather than a `@staticmethod`?',
      'What actual sequence of lookups does `a.bank_name` perform (hint: instance `__dict__` -> type(a).__mro__)?',
    ],
    relatedTopics: ['Classes', 'self', 'Class Variables', 'Instance Variables', 'classmethod', 'staticmethod'],
  },
  {
    id: 'python-m4-2',
    number: 'PY-M4-2',
    title: 'The four pillars: encapsulation, abstraction, inheritance, polymorphism',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'OOP Fundamentals',
    expectedAnswer:
      'Encapsulation bundles data and behavior together and controls access (Python uses NAMING CONVENTION, not true enforcement: `_protected` by convention, `__mangled` via name-mangling, neither is truly private). Abstraction exposes a simplified interface while hiding implementation detail (via ABCs/protocols). Inheritance lets a subclass reuse and extend a base class\'s behavior. Polymorphism lets different types respond to the same interface/method call in their own way — Python achieves this primarily through duck typing rather than explicit interface declarations.',
    deepExplanation:
      '```python\nclass BankAccount:\n    def __init__(self, balance):\n        self._balance = balance          # "protected" by convention only\n        self.__pin = "1234"              # name-mangled to _BankAccount__pin\n\n    def withdraw(self, amount):           # public method encapsulates the balance-mutation rule\n        if amount > self._balance:\n            raise ValueError("insufficient funds")\n        self._balance -= amount\n\naccount = BankAccount(100)\naccount._balance = -9999          # Python does NOT prevent this — convention only, not enforcement\nprint(account._BankAccount__pin)   # \'1234\' — name mangling obscures but does not truly hide\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14159 * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s ** 2\n\nfor shape in [Circle(2), Square(3)]:\n    print(shape.area())   # polymorphism — same call, different behavior per actual type\n```\nWhy Python\'s "encapsulation" is different from Java\'s: there is no `private` keyword. `_name` is a documented convention ("internal, do not touch") that tooling/IDEs respect but the interpreter does not enforce; `__name` triggers name mangling (rewritten to `_ClassName__name`) which mainly exists to avoid ACCIDENTAL name collisions in subclasses, not to provide real privacy — a determined caller can always reach `instance._ClassName__name`. This "consenting adults" philosophy is a deliberate Python design choice, not an oversight.',
    productionExample:
      'A payment-processing class exposing only `charge(amount)` / `refund(amount)` methods while keeping `_gateway_client` and `_idempotency_key` as internal (`_`-prefixed) implementation details is real-world encapsulation+abstraction: callers depend on the small public interface, so the internal HTTP client library can be swapped later without breaking any caller.',
    bestPractices: [
      'Use a single leading underscore (`_name`) to signal "internal, not part of the public API" — this is the idiomatic Python convention, respected by linters/IDEs.',
      'Reserve double-leading-underscore name mangling (`__name`) specifically for avoiding accidental subclass name collisions on internal attributes, not as a substitute for real access control.',
      'Favor composition and small, focused public interfaces (abstraction) over deep inheritance hierarchies for polymorphism — see the composition-vs-inheritance question below.',
    ],
    tradeOffs:
      'Python\'s convention-based encapsulation trusts the caller (and enables useful patterns like monkey-patching for tests) but provides no compiler/interpreter-enforced safety net — the trade-off is developer discipline and code review vs the rigid enforcement of languages with true `private`.',
    commonMistakes: [
      'Believing `__name` makes an attribute truly private/inaccessible — it is discoverable and reachable via `instance._ClassName__name`.',
      'Overusing inheritance to achieve polymorphism where duck typing (any object implementing the right method) would be simpler and more flexible.',
      'Exposing internal mutable state directly as public attributes instead of behind methods, losing the ability to validate/change the internal representation later without breaking callers.',
    ],
    followUpQuestions: [
      'Why does Python have no true `private` keyword, and what philosophy does that reflect ("we are all consenting adults")?',
      'What is the actual mechanism and PURPOSE of double-underscore name mangling?',
      'How does Python achieve polymorphism differently from a statically-typed language like Java (duck typing vs explicit interface implementation)?',
    ],
    relatedTopics: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism', 'Name Mangling', 'Duck Typing'],
  },
  {
    id: 'python-m4-3',
    number: 'PY-M4-3',
    title: 'Method Resolution Order (MRO) and the diamond problem',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Advanced OOP',
    expectedAnswer:
      'With multiple inheritance, Python resolves attribute/method lookup using the C3 linearization algorithm, producing a deterministic MRO available via `Class.__mro__` or `Class.mro()`. This correctly and predictably resolves the classic "diamond problem" (two base classes sharing a common ancestor), unlike naive depth-first lookup which could visit the shared ancestor\'s methods in an inconsistent or ancestor-shadowing order.',
    deepExplanation:
      '```python\nclass A:\n    def greet(self):\n        return "A"\n\nclass B(A):\n    def greet(self):\n        return "B -> " + super().greet()\n\nclass C(A):\n    def greet(self):\n        return "C -> " + super().greet()\n\nclass D(B, C):\n    def greet(self):\n        return "D -> " + super().greet()\n\nprint(D().greet())          # "D -> B -> C -> A"\nprint(D.__mro__)\n# (<class D>, <class B>, <class C>, <class A>, <class object>)\n```\nThis is the "diamond": `D` inherits from both `B` and `C`, which both inherit from `A`. Without C3 linearization, calling `super()` inside `B` might jump straight to `A` (skipping `C` entirely) — but Python\'s MRO instead produces a single consistent, LINEAR order (`D, B, C, A, object`) where EACH class appears exactly once, and `super()` in each class simply moves to the NEXT class in that shared order, not "back up to my own direct parent". This is precisely why `B.greet()`\'s `super().greet()` calls `C.greet()`, not `A.greet()` directly — a very common interview surprise.\n\nC3 linearization also enforces monotonicity: if `C3` cannot produce a consistent order (e.g. contradictory base-class orderings), Python raises `TypeError: Cannot create a consistent method resolution order` at CLASS DEFINITION time, rather than silently picking an arbitrary order.',
    productionExample:
      'Mixin-based class composition (e.g. Django\'s class-based views: `class MyView(LoginRequiredMixin, TemplateView):`) relies entirely on MRO + cooperative `super()` calls working correctly — each mixin calls `super().dispatch(...)` and trusts the MRO to chain through every other mixin in the hierarchy exactly once, in a well-defined order.',
    bestPractices: [
      'When designing mixins, ALWAYS call `super().method(...)` (cooperative multiple inheritance) rather than calling a specific base class\'s method directly by name — direct calls bypass the MRO chain and can skip sibling mixins.',
      'Keep multiple-inheritance hierarchies shallow and mixin-shaped (small, focused, single-purpose classes) rather than deep, business-logic-heavy diamonds — deep diamonds are notoriously hard to reason about even with correct MRO.',
      'Inspect `Class.__mro__` directly when debugging unexpected method-resolution behavior instead of guessing.',
    ],
    tradeOffs:
      'Multiple inheritance + MRO gives powerful, flexible composition (mixins) but at real cognitive cost — a deep or wide hierarchy requires understanding the FULL linearized order to predict which method runs, whereas composition (has-a) keeps the call graph explicit and local at the cost of some boilerplate delegation.',
    commonMistakes: [
      'Calling a specific base class directly (`A.greet(self)`) instead of `super().greet()`, breaking the cooperative chain and potentially skipping sibling classes in the MRO.',
      'Assuming multiple inheritance always resolves "left to right, depth first" like some other languages — Python\'s C3 linearization is more subtle and does not always match that naive intuition.',
      'Designing a multiple-inheritance hierarchy that is genuinely inconsistent, triggering a `TypeError` at class-definition time and not understanding why.',
    ],
    followUpQuestions: [
      'Why does `super()` inside `B.greet()` call `C.greet()` rather than `A.greet()` directly, given that `B` only directly inherits from `A`?',
      'What causes Python to raise "Cannot create a consistent method resolution order", and can you construct a minimal example?',
      'How does `super()` behave differently when called with no arguments (Python 3) versus `super(ClassName, self)` (Python 2 style)?',
    ],
    relatedTopics: ['MRO', 'C3 Linearization', 'Diamond Problem', 'super()', 'Multiple Inheritance', 'Mixins'],
  },
  {
    id: 'python-m4-4',
    number: 'PY-M4-4',
    title: 'Composition vs inheritance, and the SOLID principles in Python',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'OOP Design',
    expectedAnswer:
      '"Favor composition over inheritance": model "has-a" relationships by holding a reference to another object and delegating to it, rather than reaching for "is-a" inheritance for every code-reuse need. SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) are five design guidelines that, in Python, are usually achieved with duck typing, small focused classes, and dependency injection rather than the rigid interface hierarchies typical of Java.',
    deepExplanation:
      '```python\n# Inheritance approach — tightly couples Car to Engine\'s exact implementation\nclass Engine:\n    def start(self): return "engine started"\n\nclass Car(Engine):   # "is-a" Engine? Not really — a Car HAS an Engine, it is not one.\n    def drive(self): return self.start() + ", driving"\n\n# Composition approach — Car HOLDS an engine-like object, more flexible and testable\nclass ElectricEngine:\n    def start(self): return "silent engine started"\n\nclass CarComposed:\n    def __init__(self, engine):\n        self.engine = engine          # dependency injected, not inherited\n    def drive(self):\n        return self.engine.start() + ", driving"\n\nCarComposed(Engine()).drive()\nCarComposed(ElectricEngine()).drive()   # swap engines freely — no inheritance hierarchy needed\n```\nWhy composition wins here: `CarComposed` can accept ANY object with a `.start()` method (duck typing), is trivially testable (inject a fake/mock engine), and avoids inheriting unrelated behavior/state from `Engine`. Inheritance is still the right tool when there is a genuine, stable "is-a" relationship AND you want to inherit a wide, correct default behavior (e.g. `class AdminUser(User):`).\n\nSOLID in Python, briefly: Single Responsibility — one class, one reason to change (a `ReportGenerator` should not also handle email sending). Open/Closed — extend behavior via new classes/strategy objects instead of editing existing tested code. Liskov Substitution — a subclass must be usable anywhere its base class is expected without breaking caller assumptions (a classic violation: `Square(Rectangle)` overriding `set_width`/`set_height` to keep both equal, breaking code that assumes independent width/height). Interface Segregation — prefer several small `Protocol`s over one fat interface. Dependency Inversion — depend on an abstraction (a `Protocol`/ABC, or just "anything with this method" via duck typing) rather than a concrete class, usually via constructor injection.',
    productionExample:
      'A `NotificationService` that accepts an injected `sender` (an `EmailSender`, `SmsSender`, or a test `FakeSender`, all sharing a `.send(message)` method) rather than hardcoding `smtplib` calls directly is Dependency Inversion + composition in one real, common backend pattern — it makes the service trivially unit-testable and swappable without touching its internals.',
    bestPractices: [
      'Default to composition; reach for inheritance only for genuine, stable "is-a" relationships where you want the FULL base-class contract, not just a piece of its implementation.',
      'Use `typing.Protocol` (structural typing) to express "anything with this shape" for Dependency Inversion without forcing a rigid ABC hierarchy.',
      'Inject dependencies via constructor parameters rather than hardcoding concrete classes/imports inside a class\'s methods — this is what actually makes SOLID\'s Dependency Inversion testable in practice.',
    ],
    tradeOffs:
      'Inheritance gives free, automatic behavior reuse with minimal boilerplate but tightly couples subclass to base-class implementation details and can violate Liskov Substitution if the "is-a" relationship is not truly stable; composition requires explicit delegation code but keeps components independently testable/swappable and avoids fragile hierarchies.',
    commonMistakes: [
      'Reaching for inheritance purely for code reuse when there is no genuine "is-a" relationship — a classic smell is a subclass that overrides most inherited methods to do something completely different.',
      'Violating Liskov Substitution by having a subclass narrow preconditions or widen postconditions in a way that breaks code written against the base class\'s contract.',
      'Building one large "manager" class that violates Single Responsibility, becoming the de facto reason every unrelated change touches the same file.',
    ],
    followUpQuestions: [
      'Give a concrete example of a Liskov Substitution Principle violation and explain exactly why it breaks caller assumptions.',
      'How would you use `typing.Protocol` to apply Dependency Inversion without defining a formal ABC hierarchy?',
      'When IS inheritance genuinely the better choice over composition — give a real example.',
    ],
    relatedTopics: ['Composition', 'Inheritance', 'SOLID', 'Liskov Substitution', 'Dependency Injection', 'Protocol'],
  },
  {
    id: 'python-m4-5',
    number: 'PY-M4-5',
    title: 'Abstract Base Classes (`abc`) and interfaces in Python',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Advanced OOP',
    expectedAnswer:
      'Python has no `interface` keyword; the standard way to define a required contract is `abc.ABC` with `@abstractmethod`-decorated methods — attempting to instantiate a subclass that has not implemented every abstract method raises `TypeError` at INSTANTIATION time. `typing.Protocol` offers a lighter-weight, STRUCTURAL alternative (no explicit inheritance needed — any object with matching methods satisfies the protocol, checked by static type checkers, not enforced at runtime by default).',
    deepExplanation:
      '```python\nfrom abc import ABC, abstractmethod\n\nclass PaymentProcessor(ABC):\n    @abstractmethod\n    def charge(self, amount: float) -> bool: ...\n\n    @abstractmethod\n    def refund(self, amount: float) -> bool: ...\n\nclass StripeProcessor(PaymentProcessor):\n    def charge(self, amount): return True\n    # missing refund()!\n\nStripeProcessor()   # TypeError: Can\'t instantiate abstract class StripeProcessor\n                      # with abstract method refund\n\nfrom typing import Protocol\n\nclass Chargeable(Protocol):\n    def charge(self, amount: float) -> bool: ...\n\ndef process(processor: Chargeable):   # accepts ANYTHING with a matching charge() method\n    processor.charge(100)\n\nclass AdHocProcessor:   # note: does NOT inherit from Chargeable at all\n    def charge(self, amount): return True\n\nprocess(AdHocProcessor())   # works — structural typing, no explicit inheritance required\n```\nWhy `ABC` catches the missing-method bug EARLY: without it, `StripeProcessor()` would instantiate fine, and you would only discover the missing `refund` method the moment code actually CALLS `.refund()` — potentially in production. `ABC` moves that failure to instantiation time, which is much earlier and safer.\n\n`Protocol` vs `ABC`: `ABC` requires explicit `class Foo(BaseABC):` inheritance and enforces the contract at runtime (instantiation); `Protocol` requires NO inheritance (purely structural — "if it has the right methods, it satisfies the protocol") and is primarily enforced by STATIC type checkers (mypy/pyright), not at runtime, unless you explicitly use `@runtime_checkable` with `isinstance()`.',
    productionExample:
      'A plugin-style architecture (e.g. multiple storage backends: `S3Storage`, `LocalStorage`, `GCSStorage`) commonly defines a `Storage(ABC)` with abstract `upload`/`download`/`delete` methods — this guarantees at instantiation time that every new backend implementation is COMPLETE before it can ever be wired into the application, catching an incomplete implementation in code review/CI rather than at 2am in production.',
    bestPractices: [
      'Use `ABC` + `@abstractmethod` when you want a REQUIRED, ENFORCED contract with a real inheritance relationship (e.g. a plugin system).',
      'Use `typing.Protocol` when you want structural, duck-typing-friendly interfaces checked by static analysis, without forcing unrelated classes into an inheritance hierarchy just to satisfy a type checker.',
      'Give abstract methods a clear docstring describing the REQUIRED behavior/contract (return type, exceptions raised), since the ABC only enforces that the method exists, not that it behaves correctly.',
    ],
    tradeOffs:
      '`ABC` gives real runtime enforcement (fails fast, at instantiation) but requires explicit inheritance, coupling implementations to a specific base class; `Protocol` is more flexible (no inheritance needed, works with existing/third-party classes you cannot modify) but its contract is normally checked only by static tooling, not the runtime, unless you opt into `@runtime_checkable`.',
    commonMistakes: [
      'Defining an "abstract" class WITHOUT actually inheriting from `ABC` or using `@abstractmethod`, so nothing actually prevents instantiating an incomplete subclass.',
      'Assuming `Protocol` enforces its contract at runtime by default — plain `isinstance(x, SomeProtocol)` fails unless the protocol is decorated `@runtime_checkable`, and even then it only checks METHOD PRESENCE, not signatures.',
      'Putting concrete, non-abstract shared logic ONLY in the abstract base class\'s abstract methods (which should have no real implementation) instead of as separate concrete helper methods subclasses can call.',
    ],
    followUpQuestions: [
      'At what point does Python actually enforce that all abstract methods are implemented — class definition time, or instantiation time?',
      'What is the practical difference between subclassing an `ABC` and satisfying a `Protocol`?',
      'How would `@runtime_checkable` change what `isinstance(obj, SomeProtocol)` actually checks, and what are its limitations?',
    ],
    relatedTopics: ['abc module', 'Abstract Methods', 'Protocol', 'Structural Typing', 'Interfaces'],
  },
  {
    id: 'python-m4-6',
    number: 'PY-M4-6',
    title: '`@property`, getters/setters, and dataclasses',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Advanced OOP',
    expectedAnswer:
      '`@property` turns a method into a computed attribute accessed WITHOUT parentheses (`obj.value`, not `obj.value()`), enabling validation/computation on read while keeping the caller-facing API looking like plain attribute access — the idiomatic Python alternative to Java-style explicit `getX()`/`setX()` boilerplate. `@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__` (and optionally ordering/`frozen`-immutability) from type-annotated class-level field declarations, eliminating most of the boilerplate for simple data-holding classes.',
    deepExplanation:
      '```python\nclass Temperature:\n    def __init__(self, celsius=0):\n        self._celsius = celsius\n\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("below absolute zero")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self):          # a READ-ONLY computed property, no setter defined\n        return self._celsius * 9 / 5 + 32\n\nt = Temperature(25)\nt.celsius = 30       # calls the setter — validated, looks like plain attribute assignment\nprint(t.fahrenheit)   # 86.0 — computed on access, no stored fahrenheit field to keep in sync\nt.fahrenheit = 100     # AttributeError: can\'t set attribute — no setter was defined\n\nfrom dataclasses import dataclass, field\n\n@dataclass(frozen=True, order=True)\nclass Point:\n    x: int\n    y: int\n    tags: list[str] = field(default_factory=list)   # avoids the mutable-default-argument trap!\n\np1 = Point(1, 2)\np2 = Point(1, 2)\nprint(p1 == p2)      # True — auto-generated __eq__ compares field values\nprint(p1 < Point(2, 0))   # True — order=True auto-generates comparison by field tuple order\np1.x = 99             # FrozenInstanceError — frozen=True makes instances immutable\n```\nWhy `@property` beats manual `get_x()`/`set_x()`: it lets you START with plain public attributes and LATER add validation/computation without changing the caller-facing API at all (`obj.x = 5` stays exactly the same syntax whether `x` is a plain attribute or a validated property) — this is impossible in languages without properties, where you must either start with getters/setters everywhere "just in case" or do a breaking API change later.\n\n`field(default_factory=list)` in dataclasses is the SAME fix pattern as the mutable-default-argument trap in Module 2 — dataclasses explicitly forbid `tags: list = []` as a default (raising `ValueError` at class-definition time) specifically to prevent that shared-mutable-default bug, and `default_factory` is the sanctioned way to provide a per-instance mutable default.',
    productionExample:
      'API response/config models are commonly modeled as `@dataclass(frozen=True)` — immutable by construction, with auto-generated `__eq__` making them trivially comparable in tests (`assert response == ExpectedResponse(...)`), and `@property` is used when a field needs to be derived (e.g. a `full_name` computed from `first_name`/`last_name`) rather than stored and risked going stale.',
    bestPractices: [
      'Start with plain public attributes for simple data classes; add `@property` later ONLY when you need validation or computed values — do not pre-emptively wrap everything in getters/setters "Java style".',
      'Use `@dataclass` for simple data-holding classes instead of hand-writing `__init__`/`__repr__`/`__eq__` boilerplate.',
      'Always use `field(default_factory=...)` for mutable dataclass field defaults — never a bare mutable literal, which dataclasses actively reject.',
    ],
    tradeOffs:
      '`@property` adds a small function-call overhead versus plain attribute access (usually negligible) in exchange for validation/encapsulation without changing the public API; `@dataclass` trades some flexibility (auto-generated methods may not be exactly what you want) for a large reduction in boilerplate for simple data-holder classes.',
    commonMistakes: [
      'Writing Java-style `get_x()`/`set_x()` methods in Python instead of `@property`, adding unnecessary verbosity and breaking the idiomatic "looks like an attribute" convention.',
      'Defining a mutable default directly in a dataclass field (`tags: list = []`), which raises `ValueError: mutable default ... is not allowed` at class-definition time.',
      'Forgetting that `frozen=True` prevents reassignment of fields AFTER `__init__` but does NOT make nested mutable fields (like a `list`) immutable — mutating `frozen_instance.tags.append(x)` still works.',
    ],
    followUpQuestions: [
      'Why does `@dataclass` explicitly forbid a plain mutable literal as a field default, and what is the sanctioned fix?',
      'Does `frozen=True` on a dataclass make a `list` FIELD\'s contents immutable too? Why or why not?',
      'How would you add a computed, read-only field to a dataclass (hint: `@property`, combined with `__post_init__` for derived fields that ARE stored)?',
    ],
    relatedTopics: ['@property', 'Getters/Setters', 'Dataclasses', 'field(default_factory)', 'Immutability'],
  },
  {
    id: 'python-m4-7',
    number: 'PY-M4-7',
    title: 'Magic methods: `__init__`/`__repr__`/`__eq__`/`__len__`/`__iter__`',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Magic Methods',
    expectedAnswer:
      'Magic (dunder) methods let a custom class integrate with Python\'s built-in syntax/protocols: `__init__` (constructor logic, runs after `__new__` allocates the instance), `__repr__` (unambiguous developer-facing representation, ideally re-creatable via `eval`), `__str__` (readable user-facing string, falls back to `__repr__` if undefined), `__eq__` (defines `==`), `__len__` (enables `len(obj)` and makes empty instances falsy), `__iter__`/`__next__` (enables `for x in obj` and the iterator protocol), `__getitem__` (enables `obj[key]` indexing/slicing).',
    deepExplanation:
      '```python\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __repr__(self):\n        return f"Vector({self.x!r}, {self.y!r})"   # unambiguous, ideally eval()-able\n\n    def __eq__(self, other):\n        if not isinstance(other, Vector):\n            return NotImplemented   # let Python try the OTHER object\'s __eq__, or fall back to False\n        return self.x == other.x and self.y == other.y\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __len__(self):\n        return 2   # a fixed-size vector\n\nv1, v2 = Vector(1, 2), Vector(1, 2)\nprint(v1 == v2)     # True — uses our __eq__, NOT default identity comparison\nprint(v1 + v2)       # Vector(2, 4) — uses our __add__\nprint(repr(v1))       # "Vector(1, 2)"\nprint(bool(Vector(0,0)))   # True — __len__ returns 2 (nonzero), so truthy regardless of x/y values\n\nclass CountUpTo:\n    def __init__(self, limit):\n        self.limit = limit\n    def __iter__(self):\n        self.current = 0\n        return self\n    def __next__(self):\n        if self.current >= self.limit:\n            raise StopIteration\n        self.current += 1\n        return self.current\n\nlist(CountUpTo(3))   # [1, 2, 3] — for-loops and list() both use __iter__/__next__ under the hood\n```\nWhy define `__eq__` explicitly: WITHOUT it, `==` falls back to identity comparison (same as `is`) — two `Vector(1,2)` instances would compare unequal by default, since they are different objects, even with identical field values. IMPORTANT gotcha: defining `__eq__` WITHOUT also defining `__hash__` makes the class UNHASHABLE by default (Python sets `__hash__ = None` automatically when you override `__eq__` but not `__hash__`), so instances can no longer be put in a `set` or used as `dict` keys unless you explicitly define `__hash__` too (or accept that trade-off deliberately).',
    productionExample:
      'A `Money(amount, currency)` value class defines `__eq__` (so `Money(10, "USD") == Money(10, "USD")` is True in tests), `__repr__` (so pytest failure output is legible: `AssertionError: Money(10, \'USD\') != Money(11, \'USD\')` instead of an unhelpful `<Money object at 0x7f...>`), and `__add__` (with validation that currencies match) — this is exactly the kind of small, well-behaved value object real financial backend code relies on.',
    bestPractices: [
      'Always implement `__repr__` for custom classes — the default (`<ClassName object at 0x...>`) is nearly useless in debugger output, logs, and test failure messages.',
      'When defining `__eq__`, decide deliberately whether the class should remain hashable; if so, define a matching `__hash__` based on the same fields used in `__eq__`.',
      'Return `NotImplemented` (not `False`) from `__eq__`/comparison methods when the other operand is an unexpected type, so Python can correctly fall back to the other object\'s reflected method or a sensible default.',
    ],
    tradeOffs:
      'Implementing rich magic methods makes a class integrate naturally with Python syntax (`==`, `len()`, `for`, `+`) at the cost of more code to write and maintain correctly (especially `__eq__`/`__hash__` consistency) — appropriate for genuine value-like or collection-like types, overkill for simple service/manager classes that are never compared or iterated.',
    commonMistakes: [
      'Defining `__eq__` without `__hash__`, then being surprised the class silently became unhashable (`TypeError: unhashable type`) when trying to put instances in a set.',
      'Returning `False` instead of `NotImplemented` from `__eq__` when comparing against an incompatible type, breaking correct reflected-comparison behavior with other types.',
      'Implementing `__len__` to return 0 for a "valid but empty" object and being surprised `if obj:` now treats it as falsy — `__len__` directly participates in truthiness.',
    ],
    followUpQuestions: [
      'Why does defining `__eq__` without `__hash__` make a class unhashable by default, and how would you fix it deliberately?',
      'What is the difference between `__repr__` and `__str__`, and what happens if only `__repr__` is defined?',
      'How would you implement `__getitem__` and `__len__` together so your custom class supports both `obj[i]` and `for x in obj` without explicitly defining `__iter__`?',
    ],
    relatedTopics: ['Magic Methods', '__eq__', '__hash__', '__repr__', '__iter__', 'Iterator Protocol'],
  },
  {
    id: 'python-m4-8',
    number: 'PY-M4-8',
    title: 'Coding project: a Bank Account system with class design',
    difficulty: 'Hard',
    experienceLevel: '2–4 Years',
    category: 'OOP Design Projects',
    expectedAnswer:
      'A bank account system should encapsulate balance mutation behind validated methods (never allow direct external balance assignment), model account TYPES via inheritance/composition (Savings vs Checking with different interest/overdraft rules), and raise domain-specific exceptions for invalid operations (insufficient funds, negative deposit) rather than silently failing or using generic exceptions.',
    deepExplanation:
      '```python\nfrom abc import ABC, abstractmethod\nfrom dataclasses import dataclass, field\nfrom datetime import datetime\n\nclass InsufficientFundsError(Exception):\n    pass\n\n@dataclass\nclass Transaction:\n    kind: str            # "deposit" | "withdraw"\n    amount: float\n    timestamp: datetime = field(default_factory=datetime.now)\n\nclass BankAccount(ABC):\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner\n        self._balance = balance\n        self._history: list[Transaction] = []\n\n    @property\n    def balance(self) -> float:\n        return self._balance   # read-only from outside — no external code can set it directly\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError("deposit amount must be positive")\n        self._balance += amount\n        self._history.append(Transaction("deposit", amount))\n\n    def withdraw(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError("withdraw amount must be positive")\n        if amount > self._allowed_withdrawal_limit():\n            raise InsufficientFundsError(f"cannot withdraw {amount}, limit is {self._allowed_withdrawal_limit()}")\n        self._balance -= amount\n        self._history.append(Transaction("withdraw", amount))\n\n    @abstractmethod\n    def _allowed_withdrawal_limit(self) -> float: ...\n\nclass SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0.0, interest_rate=0.02):\n        super().__init__(owner, balance)\n        self.interest_rate = interest_rate\n\n    def _allowed_withdrawal_limit(self) -> float:\n        return self._balance   # no overdraft allowed\n\n    def apply_interest(self) -> None:\n        self.deposit(self._balance * self.interest_rate)\n\nclass CheckingAccount(BankAccount):\n    def __init__(self, owner, balance=0.0, overdraft_limit=200.0):\n        super().__init__(owner, balance)\n        self.overdraft_limit = overdraft_limit\n\n    def _allowed_withdrawal_limit(self) -> float:\n        return self._balance + self.overdraft_limit\n```\nDesign rationale: `balance` is EXPOSED as a read-only `@property` (`_balance` is the real internal state), so callers can always READ it but can only CHANGE it via validated `deposit`/`withdraw` — this is the encapsulation pillar applied concretely. `_allowed_withdrawal_limit` is an abstract "template method" hook — the shared `withdraw` logic in the base class delegates the account-type-specific RULE (no overdraft vs overdraft allowed) to each subclass, which is the Template Method design pattern.',
    productionExample:
      'This exact shape (base class owns validated shared logic, subclasses override a narrow policy hook) mirrors real production ledger/wallet systems, where a shared `Ledger.withdraw()` enforces double-entry bookkeeping and audit logging while subclasses/strategy objects plug in account-type-specific limits, fee schedules, or fraud-check rules.',
    bestPractices: [
      'Never expose a raw public `balance` attribute that external code can assign directly — always route mutation through validated methods.',
      'Model account-type-specific RULES (overdraft limit, interest) as an overridable hook method, not as scattered `if isinstance(account, SavingsAccount):` checks in shared logic.',
      'Use domain-specific exceptions (`InsufficientFundsError`) instead of generic `Exception`/`ValueError` for business-rule violations, so callers can catch them precisely (see Module 6).',
    ],
    tradeOffs:
      'The abstract-base-class-with-a-hook-method design (Template Method) keeps shared logic (transaction recording, validation) in one place and DRY, at the cost of subclasses being somewhat coupled to the base class\'s exact method-call sequence — a composition-based "withdrawal policy" object injected into a single concrete `Account` class would decouple that further, at the cost of an extra layer of indirection.',
    commonMistakes: [
      'Allowing direct external assignment to `balance`, letting any caller bypass validation entirely (e.g. `account.balance = -500`).',
      'Duplicating the deposit/withdraw transaction-recording logic in each subclass instead of factoring it into the shared base-class methods.',
      'Using a bare `Exception` for insufficient-funds errors, forcing callers to catch overly broadly or inspect the error MESSAGE string to distinguish failure reasons.',
    ],
    followUpQuestions: [
      'How would you add a `transfer(to_account, amount)` method that must be atomic (either both legs succeed or neither does)?',
      'How would you redesign this using composition (an injected `WithdrawalPolicy` object) instead of an abstract base class with an overridden hook method?',
      'How would you add concurrency safety if multiple threads/requests could call `withdraw` on the same account simultaneously (a preview of Module 7)?',
    ],
    relatedTopics: ['OOP Design', 'Template Method Pattern', 'Encapsulation', 'Custom Exceptions', 'Composition'],
  },
];

export const MOCK_PYTHON_MODULE4_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
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
