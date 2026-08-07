# T3101 · Frontend Security: XSS Prevention, CSRF Mitigation & CSP Headers

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Stripe, Netflix, Coinbase  
**Interview Frequency:** ★★★★★  
**Category:** Security  
**Concepts:** security, xss, csrf, csp, http-only-cookies, sanitize  

## Question

What are the fundamental differences between Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF), how do you secure single-page applications against both attack vectors, and what role do Content Security Policy (CSP) headers play?

## Expected Answer

1. **Cross-Site Scripting (XSS)**:
   - Vulnerability where an attacker injects malicious JavaScript code into a trusted website, executing inside victim browsers.
   - **Mitigation**: Sanitize inputs/outputs (`DOMPurify`), avoid `dangerouslySetInnerHTML` / `eval()`, set strict `Content-Security-Policy` (CSP) HTTP headers.
2. **Cross-Site Request Forgery (CSRF)**:
   - Vulnerability where a malicious site tricks a user's browser into sending unauthorized HTTP requests to a target site where the user is currently authenticated.
   - **Mitigation**: Use `SameSite=Strict` or `SameSite=Lax` cookie flags, require custom HTTP headers (`X-Requested-With`), and anti-CSRF tokens.
3. **Content Security Policy (CSP)**:
   - HTTP response header (`Content-Security-Policy`) that restricts the origins from which scripts, stylesheets, images, and fonts can be loaded and executed.

## Deep Explanation

### XSS vs CSRF Threat Vector Comparison

| Property | XSS (Cross-Site Scripting) | CSRF (Cross-Site Request Forgery) |
|---|---|---|
| **Mechanism** | Injects & executes arbitrary JavaScript code | Exploits implicit browser cookie sending behavior |
| **Attacker Goal** | Steal session tokens, read DOM data, keylogging | Perform unauthorized actions (transfer money, change email) |
| **Target** | Client DOM & JavaScript context | Server-side state endpoints |
| **Primary Shield** | Input sanitization, CSP headers, HttpOnly cookies | `SameSite` cookies, Anti-CSRF tokens, Custom Headers |

## Production Example

```javascript
// 1. Recommended Express.js Security Headers Configuration
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-rAnd0m123'"], // Block inline scripts without valid nonce
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:', 'https://cdn.example.com'],
        connectSrc: ["'self'", 'https://api.example.com'],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// 2. Client-Side XSS Protection when Rendering Dynamic User HTML
import DOMPurify from 'dompurify';

export function SafeUserComment({ rawHtmlContent }) {
  // CRITICAL: Clean HTML string before injecting into DOM
  const cleanHtml = DOMPurify.sanitize(rawHtmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
```

## Best Practices

- Store authentication refresh tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies so client JavaScript cannot read them via `document.cookie` (blocking XSS token theft).
- Implement a strict CSP header that disables `unsafe-inline` and `eval()`.

## Common Mistakes

- Storing sensitive JWT access tokens in `localStorage` or `sessionStorage`, where any XSS vulnerability allows instant complete session hijacking.

## Follow-up Questions

1. What is Cross-Origin Resource Sharing (CORS) and why does CORS NOT protect against CSRF attacks?
2. How does Subresource Integrity (SRI) protect CDNs against script manipulation?

## Related Topics

- Web Security: Authentication & OAuth2 Best Practices
- HTTP Headers & Cookie Security Flags
