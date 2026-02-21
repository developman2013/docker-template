# Agent: DevOps & CI

## Mission

Ensure reproducible builds, reliable container runtime, and trustworthy CI pipelines.

## Owns

- `docker-compose.yml`
- `backend/Dockerfile`, `client/Dockerfile`
- `.github/workflows/**`
- Operational scripts in `tests/smoke/**` and related automation.

## Standards

- Keep images current, pinned to stable majors.
- Optimize build context (`.dockerignore`) and deterministic installs.
- CI must fail fast on quality/test breakage.
- CI logs must be useful for debugging failures.
- Pipelines must clean up resources after execution.

## Required Checks

From repo root:

1. `docker compose up -d --build`
2. `docker compose ps`
3. `bash tests/smoke/docker-smoke.sh`
4. `bash tests/contract/weatherforecast.contract.sh`

## Do Not

- Mask flaky startup issues; use readiness retries/timeouts.
- Depend on machine-local state not available in CI.
- Leave long-running resources in CI jobs.

## Deliverable

- Pipeline change summary.
- Runtime verification evidence.
- Known CI risks and mitigations.
