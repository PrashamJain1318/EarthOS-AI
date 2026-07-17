# EARTHOS AI: Engineering Foundation & Monorepo Architecture
### The Core Software Engineering and DevOps Specification
*Version 1.0 — Architecture and Systems Design Docs*

---

This document establishes the official Engineering Foundation for **EARTHOS AI**. It defines the technology decisions, monorepo configurations, development workflows, API payload structures, database indexes, security settings, and deployment pipelines.

---

## 1. Final Tech Stack

The platform is built on a modern TypeScript stack optimized for component reusability, WebGL rendering efficiency, and fast deployment.

*   **Frontend Web:** React 19, TypeScript, Vite, TailwindCSS (for utility layouts), React Three Fiber (R3F), Drei (3D utilities), Framer Motion, GSAP, Zustand (client state), TanStack Query (server state), React Hook Form + Zod (validation).
*   **Mobile App:** React Native, Expo, Realm DB (offline-first storage), ONNX Runtime Mobile (local AI inferences).
*   **Backend Services:** Node.js, Express, TypeScript, ts-node-dev (development reload).
*   **Database Systems:** MongoDB Atlas (primary datastore), Mongoose (ODM), Neo4j (resource dependency graphs), Redis Cluster (session management and rate limiting).
*   **Storage & CDN:** Cloudinary / AWS S3 (private assets), AWS CloudFront (global caching CDN).
*   **Maps & GIS:** Mapbox GL JS / Google Maps API (fleet tracking).
*   **AI Integration:** Gemini API (primary LLM/Vision), AWS SageMaker (custom YOLOv8 hosting).

---

## 2. Monorepo Folder Structure

We manage code in a unified monorepo using **Turborepo** to share configurations and typing packages across clients:

```
EARTHOS-AI/ (Monorepo Root)
├── apps/
│   ├── web/                     # Next.js / Vite web application
│   ├── admin/                   # Administrative management console
│   └── mobile/                  # React Native mobile client
├── packages/
│   ├── ui/                      # Shared design system components (buttons, inputs)
│   ├── types/                   # Unified TypeScript schemas & interfaces
│   ├── config/                  # Shared eslint, tsconfig, and tailwind settings
│   └── utils/                   # Shared validation rules, formatting helpers
├── server/
│   ├── gateway/                 # Express API Gateway & routing controller
│   ├── services/                # Microservices container folder
│   │   ├── auth/                # Identity & security service
│   │   ├── registry/            # Material inventory & passport service
│   │   ├── matching/            # GNN matchmaking service
│   │   └── logistics/           # 3PL routing service
│   └── shared/                  # Common backend library middleware
├── docs/                        # Architecture & developer setup files
├── scripts/                     # Automated database seeding & backup scripts
├── turbo.json                   # Turborepo build target pipeline settings
└── package.json                 # Monorepo workspaces definition
```

---

## 3. Frontend Architecture

Client applications use **Zustand** for local state management and **TanStack Query** for caching server requests:

```
      TanStack Query (Server State)  ◄──►  Remote REST/gRPC API
                   ▲
                   │ (Updates)
                   ▼
       Zustand Stores (Client State)
                   ▲
                   │ (State hooks)
                   ▼
     React Components (Presentation)
```

*   **Core Zustand Stores:**
    *   `useAuthStore`: Controls active user sessions, permissions, and MFA challenges.
    *   `useInventoryStore`: Manages the local cache of scanned items and upload queues.
    *   `useUiStore`: Tracks dark/light themes, active sidebars, and 3D viewport layers.
*   **Caching Strategy:** TanStack Query handles server requests, caching data for 5 minutes (`staleTime: 300000`) and retrying failed requests up to 3 times with exponential backoff.

---

## 4. Backend Architecture

The backend operates as an event-driven system built on **Express** (monolith phase) transitioning to containerized microservices running on **Docker/Kubernetes (EKS)**.

*   **Request Pipeline:**
    ```
    Request ──► Gateway ──► Rate Limiter ──► JWT Auth ──► Body Validator ──► Controller
    ```
*   **Async Event Model:** Transaction state changes write directly to a Kafka bus topic (e.g., `match-completed`). Consuming services process these events asynchronously to update wallets and mint Digital Passports without blocking the client.

---

## 5. Component Architecture

We follow an adapted **Atomic Design** philosophy to organize frontend code:

```
  1. Atoms     -> e.g. `<EosButton />`, `<EosInput />`
  2. Molecules -> e.g. `<EosInputField />` (Input container + error labels)
  3. Organisms -> e.g. `<EosPassportCard />` (Lineage lists + cryptographic badges)
  4. Templates -> e.g. `<EosDashboardLayout />` (Grid containers for sidebar & main viewport)
  5. Pages     -> e.g. `apps/web/src/pages/Dashboard.tsx`
```

### Component Rules
*   **Styling:** Atoms must read from the shared design system variables and avoid hardcoded layouts.
*   **Logic:** Presentation elements must receive data through props, delegating API calls and state mutations to higher-level container components.

---

## 6. API Standards

API endpoints return standardized JSON payloads to ensure consistent client handling:

### Standard Success Response
```json
{
  "success": true,
  "data": {
    "objectId": "64ca81bc0931e9c2049b812a",
    "status": "REGISTERED"
  },
  "metadata": {
    "timestamp": "2026-07-18T01:36:00Z",
    "requestId": "req-98cf-1234-abcd"
  }
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_MATERIAL_COMPOSITION",
    "message": "The uploaded CAS registry format could not be verified by the system.",
    "details": [
      {
        "field": "chemicalComposition.polyethylene",
        "issue": "Purity ratio must be a numeric value between 0.0 and 1.0."
      }
    ]
  },
  "metadata": {
    "timestamp": "2026-07-18T01:36:00Z",
    "requestId": "req-98cf-1234-abcd"
  }
}
```

### Pagination Formats
Paginated requests must pass `page` and `limit` query parameters, returning cursor markers:
```json
"pagination": {
  "currentPage": 2,
  "totalPages": 15,
  "totalItems": 142,
  "hasNextPage": true
}
```

---

## 7. Database Standards

*   **Collection Naming:** Use plural snake_case format (e.g., `material_batches`, `user_accounts`).
*   **System Indexes:**
    *   `user_accounts`: Unique index on `email` (`db.user_accounts.createIndex({ email: 1 }, { unique: true })`).
    *   `material_batches`: Geospatial index on `facility_location` (`db.material_batches.createIndex({ facility_location: "2dsphere" })`).
*   **Data Validation:** Database schemas use Mongoose validation middleware to block dirty or incomplete records before writing to the database.

---

## 8. Authentication Strategy

```
               JWT AUTHENTICATION LIFECYCLE
    [ Client ] ──► (Auth Request) ──► [ Auth Server ]
                                             │
      (Access JWT - Exp: 15m)  ◄─────────────┤ (Generate Tokens)
      (Refresh Token - Exp: 7d) ◄────────────┘
```

1.  **Access Tokens:** Short-lived JSON Web Tokens (JWT) signed with RS256, carrying an expiration limit of **15 minutes**.
2.  **Refresh Tokens:** Secure, HTTP-only, cookie-stored refresh tokens with an expiration limit of **7 days**. Re-authenticating updates the database token ledger to prevent refresh token reuse.
3.  **Third-Party OAuth:** Standard OpenID Connect (OIDC) integration supporting Google and Apple sign-in flows.

---

## 9. Environment Variables

Sensitive configuration values are isolated across environments using local config files:

### `.env.development`
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/earthos_dev
REDIS_URI=redis://localhost:6379
JWT_PRIVATE_KEY="dev_secret_key"
GEMINI_API_KEY="dev_gemini_key"
```

### `.env.staging`
```env
PORT=8080
MONGODB_URI=mongodb+srv://staging-cluster.mongodb.net/earthos
REDIS_URI=redis://staging-redis.net:6379
JWT_PRIVATE_KEY="staging_secret_key"
GEMINI_API_KEY="staging_gemini_key"
```

### `.env.production`
*   *Security Note:* Production credentials must be injected dynamically at container startup using a secret manager (AWS Secret Manager / Vault). Never store raw production strings in code repository files.

---

## 10. Git Workflow

We use a structured branch layout to manage code quality and coordinate releases:

```
  main          ──────────────────[Tag: v1.0.0]──────────────────
                  ▲
  release/1.0     └─── [Merge] ◄────────────────────────────────
                        ▲
  development   ────────┴─── [Merge] ◄──────┐ ──────────────────
                              ▲             │
  feature/auth  ──────────────┴─── [Merge] ─┘
```

*   **Branching Conventions:**
    *   `main`: Mirror of production environments.
    *   `development`: Central branch for integration.
    *   `feature/<name>`: Feature branches branched from development.
    *   `hotfix/<name>`: Urgent patches branched from main and merged back to both main and development.
*   **Git Hooks (Husky):** Runs formatting linters (`eslint`, `prettier`) and runs the unit test suite before commits are accepted.

---

## 11. Coding Standards

*   **Naming Conventions:**
    *   *React Components:* PascalCase (`EosPassportCard.tsx`).
    *   *Functions & Variables:* camelCase (`calculateCarbonOffset`).
    *   *Constants:* UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE_BYTES`).
*   **TypeScript Rules:**
    *   Strict mode enabled (`"strict": true` in `tsconfig.json`).
    *   Avoid the `any` type constraint. Declare explicit schemas or generic type profiles.
*   **Imports:** Order imports using clean block groupings: External dependencies first, shared packages next, local components last.

---

## 12. State Management Strategy

*   **Client UI State:** Managed locally within Zustand stores, keeping state changes lightweight and avoiding unnecessary re-renders.
*   **Server Caching:** TanStack Query handles server requests, caching queries and updating details in the background.
*   **Global Event Loop:** Kafka handles background communication between microservices, tracking operations like passport generation.

---

## 13. Performance Standards

To maintain responsiveness, developers must adhere to strict performance budgets:

*   **Web Bundle Size:** Max size limit of **200KB** for the initial JS bundle payload.
*   **Asset Processing:**
    *   *Images:* Automatically compressed to WebP formats.
    *   *3D Models:* Models must use Draco compression and keep file sizes under **1.2MB**.
*   **Fonts:** Load priority system using system fonts as placeholders while Inter and Space Grotesk download.

---

## 14. Security Standards

*   **Security Headers (Helmet):** All server responses include security headers (CSP rules, XSS protection, frames defense).
*   **Cross-Origin Isolation (CORS):** White-listed origins prevent requests from external websites.
*   **Database Encryption:** Sensitive data (e.g., CAS purity formulas) is encrypted at rest using AES-256 envelope encryption before writing to MongoDB.
*   **Data Validation:** Zod schemas validate client inputs, stripping unrecognized parameters to prevent injection attacks.

---

## 15. Testing Strategy

```
               PLATFORM TESTING INVENTORY
  ┌────────────────────────────────────────────────────────┐
  │ Unit Tests (Vitest)       -> Core math & state functions│
  ├────────────────────────────────────────────────────────┤
  │ Integration (Testing Lib) -> Component interactions    │
  ├────────────────────────────────────────────────────────┤
  │ E2E (Playwright)          -> Full system user journeys│
  ├────────────────────────────────────────────────────────┤
  │ Accessibility (Axe-core)  -> Keyboard & contrast checks │
  └────────────────────────────────────────────────────────┘
```

*   **Unit Tests (Vitest):** Core utility libraries, carbon calculations, and Zustand stores.
*   **Integration Tests (React Testing Library):** Verifies component state mutations and form validation flows.
*   **E2E Tests (Playwright):** Simulates critical user paths (onboarding, camera uploads, marketplace listings).
*   **Accessibility Tests (Axe-core):** Integrated into CI/CD pipelines to enforce WCAG accessibility rules automatically.

---

## 16. Logging Strategy

*   **Output Formats:** Logs use structured JSON format to support indexing in log aggregation tools (Winston / Pino / ELK Stack).
*   **Metadata:** Every log entry includes a unique request ID (`requestId`) to trace logs across services.
*   **Levels:**
    *   `INFO`: Standard flow logs (e.g., match proposed).
    *   `WARN`: Non-fatal issues (e.g., slow API responses).
    *   `ERROR`: Severe anomalies (e.g., database connection drops).

---

## 17. Error Handling Strategy

*   **Unified Error Middleware:** An Express middleware intercepts unhandled exceptions, logs detailed traces, and returns a sanitized JSON response to the client.
*   **Graceful Degenerations:** If the R3F WebGL rendering engine crashes, the canvas automatically catches the issue and displays a 2D static illustration placeholder.

---

## 18. Deployment Strategy

*   **Frontend Apps:** Deployed to Vercel (Web/Admin) for global CDN edge caching.
*   **Backend Services:** Deployed to AWS EKS (Elastic Kubernetes Service) using Docker container instances.
*   **Database Clusters:** Deployed on MongoDB Atlas with multi-region replication sets.

---

## 19. CI/CD Strategy

All code pushes run through a multi-stage GitHub Actions pipeline:

```
  Code Push ──► Lint & Format ──► Unit Tests ──► Docker Build ──► EKS Deploy
```

1.  **Code Check:** Verifies code styling using Eslint and Prettier rules.
2.  **Test Suite:** Runs the unit and integration tests.
3.  **Build Phase:** Compiles packages and builds Docker images.
4.  **Deployment:** Deploys verified images directly to staging/production clusters.

---

## 20. Complete Development Order

To build the platform systematically, development is divided into five milestones:

```
  MILESTONE 1: Monorepo Foundation & Auth (Weeks 1-4)
    ├── Configure Turborepo pipelines
    └── Implement Auth Service & onboarding forms

  MILESTONE 2: Scanner & Passport Systems (Weeks 5-8)
    ├── Deploy AI Object Scanner endpoints
    └── Implement Digital Product Passport (DPP) builders

  MILESTONE 3: Reverse Marketplace & Graph Matching (Weeks 9-12)
    ├── Integrate Neo4j database instances
    └── Write Pgvector matching logic

  MILESTONE 4: Logistics & Compliance Dashboard (Weeks 13-16)
    ├── Implement 3PL route co-loading logic
    └── Deploy Carbon Wallet ledger metrics

  MILESTONE 5: Integration, Optimization & Launch (Weeks 17-20)
    ├── Run security penetration audits
    └── Deploy clients to production clusters
```
