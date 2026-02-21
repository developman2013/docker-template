# Agent: Frontend

## Mission

Implement and maintain a modern Angular frontend with strict typing, clear UX states, and testability.

## Owns

- `client/src/**`
- Angular configuration in `client/angular.json`, `client/tsconfig*.json`, `client/package.json`
- Frontend lint/style/format rules.

## Standards

- Prefer standalone components and route-based composition.
- Keep `strict` TypeScript and strict template checks enabled.
- Use reactive patterns (`Observable`/signals) over imperative state mutation.
- Handle loading, error, and empty states explicitly.
- Keep components small; move API logic to services.

## Required Checks

Run in `client/`:

1. `npm run lint`
2. `npm run stylelint`
3. `npm run format:check`
4. `npm run test`
5. `npm run build`

## Do Not

- Reintroduce deprecated Angular patterns (legacy modules where unnecessary, obsolete APIs).
- Add global mutable state without clear ownership.
- Disable strict checks to silence issues.

## Deliverable

- Changed files list.
- Commands executed and outcomes.
- Any UX/accessibility tradeoffs documented.
