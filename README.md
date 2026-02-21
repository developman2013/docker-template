# Docker Template (High-Quality Baseline)

A modern full-stack template with strict quality gates, automated CI, and Docker-first runtime.

## Stack

- Frontend: Angular 20 (standalone architecture)
- Backend: ASP.NET 10 Web API
- Runtime: Docker + Docker Compose

## Engineering Standards in This Repo

- Strict TypeScript (`strict` + strict Angular template checks)
- ESLint (Angular + TypeScript rules)
- Stylelint for SCSS
- Prettier formatting checks
- Backend nullable reference types enabled
- Backend warnings treated as errors
- Centralized backend exception handling with Problem Details
- Configurable CORS policy (no hardcoded allow-all)
- API health endpoint for operational checks

## Services

- Frontend: `http://localhost` (or `http://localhost:80`)
- Backend: `http://localhost:5001`

Backend endpoints:

- `GET /weatherforecast`
- `GET /healthz`

## Run Locally with Docker

```bash
docker compose up -d --build
```

Check status:

```bash
docker compose ps
```

Stop:

```bash
docker compose down
```

## Quality Commands (Frontend)

```bash
cd client
npm ci
npm run lint
npm run stylelint
npm run format:check
npm run test
npm run build
```

Or run all at once:

```bash
npm run quality
```

## Contract and Smoke Tests

Smoke test:

```bash
bash tests/smoke/docker-smoke.sh
```

API contract test:

```bash
bash tests/contract/weatherforecast.contract.sh
```

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

It runs three jobs:

1. Frontend quality: lint, stylelint, prettier check, unit tests, build
2. Backend quality: restore + release build
3. Docker validation: compose build/up + smoke + contract tests

## Requirements

- Docker Desktop (or Docker Engine + Compose)
- Node.js 24+ (for local frontend tooling)
- .NET SDK 10+ (optional, for local backend build outside Docker)
