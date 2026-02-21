# Client App (Angular 20)

Frontend built with Angular 20 standalone components and strict typing.

## Local Development

```bash
npm ci
npm start
```

App URL: `http://localhost:4200`

## Quality Gates

```bash
npm run lint
npm run stylelint
npm run format:check
npm run test
npm run build
```

Single command:

```bash
npm run quality
```

## Formatting

```bash
npm run format
```

## Docker Production Build

```bash
npm run docker-build
```

## Configuration

Environment files:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
