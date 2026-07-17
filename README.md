# EARTHOS AI: The Resource Operating System
### "Nothing useful should ever become waste."

---

EARTHOS AI is an AI-powered Operating System for Earth's Resources. It gives every physical object a digital identity, tracks material lifecycles, and routes secondary inputs back into the circular economy.

This repository is structured as a Turborepo-based monorepo containing the web dashboard, the shared design system components package, and the Express API server.

## Monorepo Layout

*   `apps/web`: React 19 + Vite + TypeScript web application.
*   `packages/ui`: Shared design system UI component library (Tailwind CSS).
*   `packages/types`: Shared TypeScript interface definitions and state parameters.
*   `packages/config`: Shared linter and compiler configs.
*   `server`: Node + Express + TypeScript API server.

## Getting Started

### Prerequisites

*   Node.js v18+
*   npm v9+
*   MongoDB Instance (Local / Atlas cluster)
*   Redis Instance

### Installation

Clone the repository and install dependencies at the root directory:

```bash
npm install
```

### Development

Run the entire monorepo in parallel development mode:

```bash
npm run dev
```

*   Web Dashboard Client: `http://localhost:3000`
*   Express API Server: `http://localhost:8000/health`

### Code Verification

```bash
# Build all workspaces
npm run build

# Run linter configurations
npm run lint

# Format code files via Prettier
npm run format
```
