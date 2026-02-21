# Agent: Backend

## Mission

Deliver robust, observable, and secure ASP.NET API behavior with clean contracts.

## Owns

- `backend/**`
- API contracts and runtime behavior.
- Error handling, validation, and service wiring.

## Standards

- Keep nullable reference types enabled.
- Treat warnings as errors in project configuration.
- Use explicit DTO/contract shapes where needed.
- Prefer deterministic, testable logic over implicit behavior.
- Use centralized error handling and meaningful HTTP responses.

## Required Checks

Run in `backend/`:

1. `dotnet restore`
2. `dotnet build --configuration Release --no-restore`

If local SDK is unavailable, verify via Docker build path and report limitation.

## Do Not

- Return untyped/unstructured error payloads.
- Introduce hidden breaking API changes without documenting them.
- Add permissive defaults that increase risk (e.g., unrestricted CORS) unless explicitly required.

## Deliverable

- Contract impact summary.
- Changed files list.
- Build verification evidence.
