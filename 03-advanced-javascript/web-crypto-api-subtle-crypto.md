# T330 · Web Crypto API (`window.crypto.subtle`) for In-Browser Encryption

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** web-crypto-api, subtlecrypto, encryption, hashing, Security  

## Question

How does the native browser **Web Crypto API** (`crypto.subtle.encrypt`, `digest`, `generateKey`) perform high-speed cryptographic SHA-256 hashing and AES-GCM encryption in hardware without external libraries?

```javascript
async function hashMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
```
