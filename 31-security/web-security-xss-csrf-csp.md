# T105 · Web Security: XSS, CSRF & Content Security Policy

**Difficulty:** Hard  
**Companies Asked:** Stripe, PayPal, Cloudflare, Google  
**Interview Frequency:** ★★★★★  
**Category:** Security  
**Concepts:** XSS, CSRF, CSP, SameSite cookies, sanitization  

## Question

How do Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) differ, and how do modern Content Security Policies (CSP) and HTTP-only cookies protect frontend applications?

## Expected Answer

XSS occurs when an attacker injects malicious JavaScript into a trusted website, allowing them to steal session tokens or manipulate DOM. CSRF tricks an authenticated user into sending an unauthorized HTTP request to a target site where they are already logged in. XSS is mitigated by contextual output encoding/sanitization and strict CSP headers; CSRF is mitigated by SameSite=Strict/Lax cookie attributes and anti-CSRF tokens.

## Deep Explanation

XSS categories:
1. **Stored XSS**: Malicious payload stored in database (e.g. user comment) and served to all viewers.
2. **Reflected XSS**: Payload reflected off server in response (e.g. query parameter in error message).
3. **DOM-based XSS**: Client-side JS unsafely reads from DOM source (`location.search`) into sink (`element.innerHTML`).

Mitigation Depth:
- **Content-Security-Policy (CSP)**: HTTP header instructing browser which script sources, styles, and origins are permitted to execute.
- **HttpOnly Cookies**: Prevents JavaScript (`document.cookie`) from reading authentication tokens, eliminating XSS token theft.
- **SameSite=Lax/Strict**: Ensures cookies are not sent on cross-origin forgery requests.

## Production Example

Storing JWTs in `localStorage` leaves them vulnerable to XSS theft. Storing session tokens in `HttpOnly`, `Secure`, `SameSite=Lax` cookies ensures script injection cannot exfiltrate the token over network calls.

## Best Practices

- Never use `innerHTML` or `dangerouslySetInnerHTML` with untrusted user input; use DOMPurify for sanitization.
- Set strict CSP headers (`default-src 'self'; script-src 'self' 'nonce-...'`).
- Use `HttpOnly`, `Secure`, `SameSite=Lax` cookies for auth state.

## Trade-offs

Strict CSP headers prevent rogue third-party script execution, but require careful nonce management for inline dynamic scripts in modern SSR frameworks.

## Common Mistakes

- Relying solely on frontend regex sanitization instead of proper DOM parsing / DOMPurify.
- Assuming `localStorage` is secure for storing bearer tokens.

## Follow-up Questions

1. How does strict dynamic CSP nonce generation work during SSR in Next.js?
2. What is CORS, and why does CORS NOT prevent CSRF attacks?

## Related Topics

- CORS
- Strict-Transport-Security
- Sanitization
