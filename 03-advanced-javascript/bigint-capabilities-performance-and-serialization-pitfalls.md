# QADVJS047 · BigInt Capabilities, Performance and Serialization Pitfalls

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Stripe, PayPal, Razorpay  
**Interview Frequency:** ★★★☆☆  
**Category:** Advanced JavaScript  
**Concepts:** BigInt, JSON.stringify limitation, 64-bit integers, Arbitrary precision

## Expected Answer

`BigInt` is a primitive type for representing integers of arbitrary precision — beyond `Number.MAX_SAFE_INTEGER` (2^53 − 1), where regular JS numbers (IEEE-754 doubles) start silently losing precision. You create one with an `n` suffix (`123n`) or `BigInt(123)`. `BigInt` and `Number` cannot be mixed in arithmetic — `1n + 1` throws a `TypeError` — one side must be explicitly converted first. `JSON.stringify` throws on any value containing a `BigInt` (`Do not know how to serialize a BigInt`), so serialization requires manually converting to a string before stringifying and parsing it back on the other side.

## Deep Explanation

Regular JS numbers are IEEE-754 double-precision floats with a 53-bit mantissa, which is why integers beyond 2^53 − 1 can't all be represented exactly — two mathematically different large integers can collapse to the same `Number` value. `BigInt` sidesteps this by representing integers as arbitrary-length digit sequences internally rather than a fixed-width float, so it can grow to represent any integer exactly, at the cost of arithmetic that has to operate digit-by-digit instead of mapping to a single CPU floating-point instruction — this is precisely why `BigInt` arithmetic is measurably slower than `Number` arithmetic for values that would have fit safely in a `Number` anyway. Comparison operators do work across the two types (`1n == 1` is `true`, `1n < 2` is `true`) because loose comparison and relational operators coerce; only the arithmetic operators (`+`, `-`, `*`, etc.) refuse to mix types and throw. `Math` object methods don't accept `BigInt` at all (`Math.max(1n, 2n)` throws), and `BigInt` has no representation for fractional values — division truncates toward zero.

## Production Example

A payments/fintech system representing monetary amounts in the smallest currency unit, or a system handling 64-bit database IDs (Postgres `bigint` primary keys, or "snowflake"-style large numeric IDs), is where this surfaces concretely. If such an ID is represented as a plain JS `Number` after a JSON response, IDs above 2^53 silently corrupt — two distinct IDs can collapse to the same `Number` value, a real and easy-to-miss bug class. The standard fix is to transmit such IDs as strings over the wire (JSON has no native `BigInt` type) and convert to `BigInt` client-side only where actual arithmetic on the value is required, not just for display or equality checks. `JSON.stringify` throwing loudly on a raw `BigInt` is actually useful here — it turns a silent-corruption risk (had the value stayed a `Number`) into an immediate, obvious failure during development.

## Best Practices

- Use `BigInt` only when a value genuinely exceeds the safe-integer range or exact precision is required (ledger totals, cryptographic values, large IDs) — it's slower and has a smaller surrounding API than `Number`, so it isn't a safe default numeric type.
- Serialize `BigInt` explicitly, either via `.toString()` or a `JSON.stringify` replacer function that converts `BigInt` values to strings, and revive with `BigInt(str)` on the receiving end.
- Keep `BigInt` and `Number` domains separate in a codebase rather than converting back and forth per operation, since every crossing point is a place `+`/`-`/`*` will throw if handled carelessly.

## Trade-offs

`BigInt` buys exact, unbounded-precision integer arithmetic at the cost of slower operations (no hardware fast path the way some `Number` operations get) and a smaller, less ergonomic API — no implicit mixing with `Number`, no `Math` support, and no native JSON serialization. For values that safely fit in a `Number`, plain `Number` is faster and simpler; `BigInt` is a deliberate, narrow opt-in for correctness over performance and convenience.

## Common Mistakes

- Assuming `1n + 1` works because "it's just a bigger number" — it throws a `TypeError`; the correct form is `1n + BigInt(1)` or `Number(1n) + 1`.
- Assuming `JSON.stringify` handles `BigInt` automatically the way it handles `Number`.
- Reaching for `BigInt` broadly "to be safe" without accounting for its real performance cost in a hot loop.
- Using `===` to compare a `BigInt` and a `Number` of equal value and expecting `true` — strict equality also checks type, so `1n === 1` is `false`; only loose `==` or an explicit conversion works.

## Follow-up Questions

1. Why does `1n + 1` throw, while `1n == 1` returns `true`?
2. How would you serialize an object containing `BigInt` fields to JSON and back?
3. Why is `BigInt` arithmetic slower than `Number` arithmetic under the hood?
4. When would you represent a large ID as a string on the frontend instead of converting it to a `BigInt`?
5. Does `Number.MAX_SAFE_INTEGER + 1` produce a silently wrong result, or does it throw?

## Related Topics

- IEEE-754 floating point representation (02-javascript-fundamentals)
- Structured Cloning API vs JSON.stringify deep copy (03-advanced-javascript)
- JSON serialization boundaries in API design
