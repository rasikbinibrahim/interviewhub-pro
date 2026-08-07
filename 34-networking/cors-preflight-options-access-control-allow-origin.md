# T3409 · CORS Architecture: Simple Requests vs Preflight `OPTIONS` Requests

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** Networking  
**Concepts:** networking, cors, preflight, options, HTTP  

## Question

What triggers a **CORS Preflight `OPTIONS` Request** (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`), and how do Simple Requests bypass preflighting?

## Expected Answer

- **Simple Requests**: Standard `GET`/`HEAD`/`POST` with simple content-type headers (`text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`). No preflight triggered!
- **Preflighted Requests**: Custom headers (`Authorization`), JSON content-type (`application/json`), or non-simple HTTP methods (`PUT`/`DELETE`). Browser sends `OPTIONS` preflight request first!
