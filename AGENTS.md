# Agent Operating Mode

This repository supports structured multi-agent execution. Each agent has a dedicated file in `agents/` with strict scope, inputs, outputs, and quality gates.

## Agent Catalog

- `agents/orchestrator.md`: task decomposition, sequencing, handoffs, and final integration.
- `agents/frontend.md`: Angular app architecture, UI behavior, strict typing, and frontend quality.
- `agents/backend.md`: ASP.NET API design, reliability, validation, and backend quality.
- `agents/devops-ci.md`: Docker, Compose, CI workflows, and operational automation.
- `agents/qa.md`: test strategy, smoke/contract coverage, regression checks.
- `agents/security.md`: secrets handling, dependency risk, secure-by-default reviews.
- `agents/reviewer.md`: PR-level review, standards enforcement, release readiness.

## Routing Rules

- If the request spans multiple domains, start with `orchestrator`.
- If the request is domain-specific, route directly to the matching agent.
- If quality or correctness is uncertain, include `qa` and `reviewer` before completion.
- If deployment/runtime is touched, include `devops-ci`.
- If auth, data exposure, secrets, or external input is touched, include `security`.

## Shared Non-Negotiables

- Do not commit secrets, credentials, tokens, or private keys.
- Do not bypass tests or checks to "make CI green".
- Keep changes minimal, reversible, and scoped to the request.
- Preserve backward compatibility unless the task explicitly authorizes breaking changes.
- Update docs when behavior, commands, or architecture changes.

## Definition of Done

A task is complete only when all of the following are true:

1. Relevant agent scope requirements are satisfied.
2. Required checks pass locally for changed areas.
3. CI configuration remains valid.
4. Documentation is updated for user-visible changes.
5. Reviewer agent confirms no blocking risks remain.
