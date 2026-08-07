# T6013 · High-Level System Design: Micro-Frontends Architecture (Webpack Module Federation / Single-SPA)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, micro-frontends, module-federation, single-spa  

## Question

How do you design an enterprise **Micro-Frontend Architecture** using **Webpack 5 Module Federation**, enabling independent deployment of container host applications and remote feature micro-apps with shared dependency deduplication (`React`, `React-DOM`)?

## Key Architectural Principles

1. **Module Federation Remote Containers**: Expose remote feature modules (`remoteEntry.js`) at runtime without rebuilding container application.
2. **Shared Dependency Singleton Matrix**: Deduplicate core vendor libraries (`React`, `React-DOM`, `Zustand`) via `shared` configuration to prevent loading multiple React instance copies.
3. **Cross-App Communication**: Decouple micro-frontend communication using Custom Browser Events (`window.dispatchEvent`) or Global Event Emitters.
