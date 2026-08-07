# T4702 · Micro-Frontends Architecture: Webpack Module Federation, Shared Dependencies & Isolated Deployment

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Uber, Netflix, Stripe, PayPal  
**Interview Frequency:** ★★★★☆  
**Category:** Frontend Architecture  
**Concepts:** micro-frontends, module-federation, architecture, shared-dependencies, deployment  

## Question

How does the **Micro-Frontends Architecture** break large monolithic frontend applications into independently deployable micro-applications, how does **Webpack / Vite Module Federation** enable runtime sharing of code and vendor dependencies (`react`, `react-dom`) without duplication, and how do you handle cross-app state sharing and CSS encapsulation?

## Expected Answer

1. **Micro-Frontends Concept**: Splitting a monolithic web frontend into smaller, domain-driven micro-applications managed by autonomous teams (e.g. Host Container, Checkout App, User Profile App).
2. **Module Federation**:
   - Allows a JavaScript application to dynamically load code from another independent build at **runtime**.
   - **Host (Shell)**: Loads remote micro-apps.
   - **Remote**: Exposes components or utilities to host shells.
   - **Shared Dependencies**: Shared libraries (`singleton: true`, e.g. `react`) are loaded only ONCE at runtime. If Remote and Host share React 18, the browser fetches React only once!
3. **Isolation & Communication**:
   - **CSS Encapsulation**: Use Shadow DOM, CSS Modules, or Scoped Utility CSS to prevent global CSS selector pollution across micro-apps.
   - **Cross-App Communication**: Use Web Custom Events, window EventEmitters, or URL Query Parameters. Avoid tight coupling through shared global state stores.

## Deep Explanation

### Module Federation Runtime Resolution

```
Browser requests Host Application (Shell)
                 │
                 ├── Loads shared React 18 singleton once!
                 │
                 ▼ Dynamically fetches remote Entry points at runtime
   ┌─────────────┴─────────────┐
   ▼                           ▼
Remote App A (Checkout)    Remote App B (Navigation)
(Independently Deployed!)  (Independently Deployed!)
```

## Production Example

```javascript
// host/webpack.config.js (Shell Container)
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_shell',
      remotes: {
        checkoutRemote: 'checkoutApp@https://checkout.example.com/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
};
```

```jsx
// host/src/App.jsx (Consuming Remote Micro-App Component)
import React, { Suspense, lazy } from 'react';

// Dynamic Remote Import loaded at runtime over network!
const RemoteCheckoutButton = lazy(() => import('checkoutRemote/CheckoutButton'));

export function HostApp() {
  return (
    <div>
      <h1>Main Host Shell</h1>
      <Suspense fallback={<div>Loading remote checkout micro-app...</div>}>
        <RemoteCheckoutButton total={99.99} />
      </Suspense>
    </div>
  );
}
```

## Best Practices

- Always configure core framework dependencies (`react`, `react-dom`) with `singleton: true` in Module Federation settings to prevent multiple React instance hook crashes.
- Version-lock contract APIs and type definitions between Host and Remote apps.

## Common Mistakes

- Tight-coupling micro-frontend applications through a single shared Redux store instance, which breaks team deployment independence and forces coordinated monolithic releases.

## Follow-up Questions

1. How do iframe-based micro-frontends compare against Module Federation in terms of security isolation vs performance overhead?

## Related Topics

- Scalable Monorepo Architecture: Turborepo & Nx
- Observer Pattern vs Publisher-Subscriber (Pub/Sub) Architecture
