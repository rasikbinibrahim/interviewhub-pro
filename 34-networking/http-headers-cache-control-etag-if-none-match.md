# T3412 · HTTP Caching Headers: `Cache-Control`, `ETag`, `If-None-Match` & `304 Not Modified`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** Networking  
**Concepts:** networking, http-headers, cache-control, etag, 304-not-modified  

## Question

How do HTTP Caching Directives (`max-age`, `no-cache`, `no-store`, `must-revalidate`, `immutable`) and Validation Headers (`ETag` / `If-None-Match`, `Last-Modified` / `If-Modified-Since`) interact to return `304 Not Modified` status codes?

## Expected Answer

- **`max-age=31536000, immutable`**: Cache asset locally for 1 year without revalidating (ideal for hashed assets `app.a1b2c3.js`).
- **`no-cache`**: Forces browser to revalidate with server before using cached copy.
- **`no-store`**: Forbids caching response entirely (for sensitive data).
- **Validation**: Browser sends `If-None-Match: "etag_hash"`. If server content is unchanged, returns `304 Not Modified` without response body!
