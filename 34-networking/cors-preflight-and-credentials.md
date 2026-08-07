# T3403 · CORS Architecture: Preflight Options Requests & Credentials Sharing

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Stripe, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Networking  
**Concepts:** cors, preflight, Access-Control-Allow-Origin, same-origin-policy, cookies  

## Question

How does Cross-Origin Resource Sharing (CORS) enforce the browser **Same-Origin Policy (SOP)**, what triggers a Preflight `OPTIONS` HTTP request, and how do server-side headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials`) interact with client-side `fetch(url, { credentials: 'include' })`?

## Expected Answer

1. **Same-Origin Policy (SOP)**: A core security mechanism in browsers restricting how a document or script loaded from one origin (`protocol + domain + port`) can interact with resources from another origin.
2. **Simple Requests vs Preflighted Requests**:
   - **Simple Requests**: Use `GET`, `HEAD`, or `POST` with standard headers (`Content-Type: application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`). Browser sends request immediately.
   - **Preflighted Requests**: Triggered if the request uses non-simple HTTP methods (`PUT`, `DELETE`, `PATCH`), custom headers (`Authorization`, `X-Custom-Header`), or `Content-Type: application/json`. The browser automatically sends an HTTP `OPTIONS` request first to verify server permission.
3. **Credentials Sharing (`withCredentials` / `credentials: 'include'`)**:
   - Allows cross-origin requests to send and receive HTTP cookies or Authorization headers.
   - **CRITICAL SERVER RULE**: When credentials are included, the server **CANNOT use wildcard `Access-Control-Allow-Origin: *`**. It MUST return the specific requesting origin (`Access-Control-Allow-Origin: https://app.example.com`) along with `Access-Control-Allow-Credentials: true`.

## Deep Explanation

### CORS Preflight Request/Response Flow

```
Client (https://app.example.com)                   Server (https://api.example.com)
      │                                                         │
      ├────── 1. OPTIONS /api/user ────────────────────────────►│
      │       Access-Control-Request-Method: POST               │
      │       Access-Control-Request-Headers: Authorization     │
      │                                                         │
      │◄───── 2. HTTP 204 No Content ───────────────────────────┤
      │       Access-Control-Allow-Origin: https://app.example.com
      │       Access-Control-Allow-Methods: POST, OPTIONS       │
      │       Access-Control-Allow-Headers: Authorization       │
      │       Access-Control-Allow-Credentials: true            │
      │                                                         │
      ├────── 3. POST /api/user (Actual Request) ──────────────►│
      │       Header: Authorization: Bearer token123            │
      │                                                         │
      │◄───── 4. HTTP 200 OK (Response Payload) ────────────────┤
```

## Production Example

```javascript
// Express.js Backend CORS Configuration
import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = ['https://app.example.com', 'https://dashboard.example.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS Security Policy'));
      }
    },
    credentials: true, // Allow Access-Control-Allow-Credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400, // Preflight Cache (24 hours)
  })
);
```

## Best Practices

- Cache preflight `OPTIONS` responses on the server using `Access-Control-Max-Age: 86400` to avoid sending an `OPTIONS` request before every single API call.
- Never use wildcard `Access-Control-Allow-Origin: *` in production endpoints that accept authentication cookies or tokens.

## Common Mistakes

- Believing CORS is a server protection mechanism — CORS is enforced by the **Browser Client** to protect users from malicious cross-origin scripts reading sensitive data. Server endpoints still execute un-blocked non-browser requests (Postman, curl).

## Follow-up Questions

1. Why does CORS NOT prevent CSRF state-changing `POST` mutations from executing on un-preflighted simple requests?

## Related Topics

- Frontend Security: XSS Prevention, CSRF Mitigation & CSP Headers
- HTTP/2, HTTP/3, WebSockets & REST Architecture
