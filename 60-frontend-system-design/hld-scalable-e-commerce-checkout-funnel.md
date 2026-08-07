# T6010 · High-Level System Design: Scalable E-Commerce Checkout Funnel & Payment State Machine

**Difficulty:** Hard  
**Companies Asked:** Amazon, Stripe, Shopify, Walmart, eBay  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, e-commerce, checkout-funnel, state-machine  

## Question

How do you design a high-conversion, resilient **E-Commerce Checkout Funnel** supporting multi-step form state persistence, idempotent payment submissions (Stripe Elements / Idempotency-Key), inventory reservation timers, and PCI-DSS security compliance?

## Key Architectural Components

1. **State Machine Form Architecture**: State machine (`XState`) managing step transitions (Address ➔ Shipping ➔ Payment ➔ Review) preventing illegal step skips.
2. **Idempotent Submissions**: Pass `idempotency_key` (UUID) with payment POST requests to prevent double-charging users during retry connection spikes.
3. **PCI Compliance**: Isolate payment card details inside sandboxed iframe elements (Stripe Elements).
