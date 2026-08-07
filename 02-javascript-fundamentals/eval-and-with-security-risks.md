# T236 · Dangerous JavaScript Patterns: `eval()` & `with` Security Risks

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** eval, with, security, performance  

## Question

Why are `eval()` and the `with` statement considered severe security risks (XSS code injection) and performance bottlenecks in modern JavaScript engines?

## Expected Answer

- **Security Hazard**: `eval(userInput)` executes arbitrary code string payloads, creating XSS vulnerabilities.
- **De-optimization**: `eval()` and `with` mutate local lexical scope scopes dynamically at runtime, preventing V8 engines from optimizing scope lookups.
