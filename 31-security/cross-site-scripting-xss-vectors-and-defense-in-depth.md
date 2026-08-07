# QSEC005 · Cross-Site Scripting (XSS) Vectors and Defense-in-Depth

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Stripe, PayPal  
**Interview Frequency:** ★★★★★  
**Category:** Security  
**Concepts:** Stored XSS, Reflected XSS, DOM XSS, DOMPurify, Content Security Policy, Contextual Encoding  

## Expected Answer

Cross-Site Scripting occurs when an application executes untrusted user-supplied data in the context of the browser. Defense-in-depth requires contextual HTML/JS output encoding, strict DOM sanitization (DOMPurify), and enforcing a restrictive Content Security Policy (CSP).

## Deep Explanation

XSS vectors manifest in three forms: Stored (persisted in database), Reflected (reflected from HTTP request parameters), and DOM-based (client JS unsafe sink usage like innerHTML, eval, document.write). React escapes string variables in JSX automatically, but dangerous sinks like dangerouslySetInnerHTML bypass this protection.

## Production Example

Rendering user comment HTML directly using dangerouslySetInnerHTML without DOMPurify sanitization allows attackers to inject malicious script tags that steal session tokens.

## Best Practices

- Sanitize all raw HTML strings using DOMPurify before DOM insertion
- Enforce a strict Content Security Policy header disabling inline script execution (script-src 'self')

## Trade-offs

- Strict CSP nonces complicate third-party analytics script loading
- DOM sanitization incurs minor CPU parsing overhead

## Common Mistakes

- Relying solely on simple regex replacement for HTML sanitization
- Storing auth tokens in localStorage where XSS scripts can access them via window.localStorage

## Follow-up Questions

1. How does Trusted Types API eliminate DOM-based XSS at the browser engine level?
2. Why is HttpOnly flag on cookies an effective mitigation against token theft via XSS?

## Related Topics

- Security
- Authentication
