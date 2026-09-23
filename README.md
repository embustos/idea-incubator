# Idea Incubator

Idea Incubator is a mobile-first workspace for capturing software ideas, developing them over time, and turning them into actionable project plans with AI-assisted analysis.

## Project status

The project is under active development. The current foundation contains:

- An Expo SDK 57 mobile application using Expo Router and TypeScript
- A Fastify API workspace with a tested health endpoint
- npm workspace orchestration
- GitHub Actions validation for linting, typechecking, API tests, and builds

## Repository layout

```text
.
├── src/                 Expo Router routes and mobile application code
├── assets/              Mobile application assets
├── apps/
│   └── api/             Fastify API
└── .github/workflows/   Continuous integration
```

The Expo application remains at the repository root. Backend services live in `apps/` so Railway can deploy them independently without adding custom Metro configuration.

## Requirements

- Node.js 22.13 or newer
- npm 11 or newer

## Local development

Install all workspace dependencies:

```bash
npm install
```

Start the Expo application:

```bash
npm start
```

Start the API on port 3000:

```bash
npm run dev:api
```

The API health endpoint is available at `http://localhost:3000/health`.

## Validation

Run the same checks used by CI:

```bash
npm run ci
```

Individual commands are also available:

```bash
npm run lint
npm run typecheck
npm run test
npm run build:api
```

## Environment variables

Copy `.env.example` to an ignored local environment file when configuration is needed. Variables prefixed with `EXPO_PUBLIC_` are visible in the bundled mobile application. Database credentials and AI provider keys must remain server-only.

## Delivery workflow

Changes are developed on feature branches and merged through pull requests. GitHub Actions must pass before merging into `main`. Railway will deploy the API from `main` after CI succeeds, and merged feature branches are deleted automatically.
