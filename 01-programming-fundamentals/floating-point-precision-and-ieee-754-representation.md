# QPF042 · Floating Point Precision and IEEE 754 Representation

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Amazon, Stripe, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** IEEE 754 double precision, binary floating point, rounding errors, epsilon  

## Expected Answer

JavaScript and most modern engines represent all numbers using 64-bit IEEE 754 double-precision floating-point format (1 sign bit, 11 exponent bits, and 52 mantissa bits). Decimal numbers like 0.1 cannot be represented precisely in binary floating-point, leading to precision issues like 0.1 + 0.2 !== 0.3.

## Deep Explanation

In binary, fractions with non-powers-of-two denominators repeat infinitely just like 1/3 does in decimal. When storing these numbers in a 52-bit mantissa, rounding occurs. To safely compare floating-point calculations, developers use Number.EPSILON or scale numbers into integers (e.g. cents instead of dollars) before performing arithmetic.

## Production Example

Financial transaction systems processing currency totals as raw floating-point numbers incur cumulative rounding errors, resulting in mismatched ledger totals during reconciliation.

## Best Practices

- Represent currency in integer units (e.g., cents or satoshis)
- Use Number.EPSILON for floating point equality checks: Math.abs(a - b) < Number.EPSILON

## Trade-offs

- BigInt provides exact arbitrary-precision integer arithmetic but cannot represent fractional values
- Floating point provides vast dynamic range at the cost of precision guarantees

## Common Mistakes

- Comparing calculated floating-point values directly using ===
- Using native Number for high-precision financial calculations

## Follow-up Questions

1. How does BigInt differ from Number in memory layout and arithmetic operation performance?
2. What happens when a calculation exceeds Number.MAX_SAFE_INTEGER?

## Related Topics

- Type Coercion Internals
- JavaScript Fundamentals
