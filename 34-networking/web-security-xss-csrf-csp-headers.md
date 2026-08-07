# T3416 · Web Security Defenses: XSS, CSRF, & Content Security Policy (CSP)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** Networking  
**Concepts:** security, xss, csrf, csp, http-headers  

## Question

How do **Content Security Policy (CSP)** headers, **SameSite Cookie Attributes** (`SameSite=Strict/Lax`), and HTML escaping defend against XSS and CSRF attacks?

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com; object-src 'none';
Set-Cookie: session_id=xyz; Secure; HttpOnly; SameSite=Strict
```
