# Backend

This is the Node + Prisma backend.

## Layout

```text
backend/
  prisma/
    schema.prisma
    migrations/
  src/
    app.ts
    server.ts
    config/
      env.ts
    lib/
      prisma.ts
    plugins/
      cors.ts
    routes/
      health.route.ts
      index.ts
    modules/
      README.md
    generated/
      prisma/
```

## What lives where

- `src/server.ts` boots the HTTP server.
- `src/app.ts` builds the Fastify instance and registers plugins/routes.
- `src/config/env.ts` loads and validates environment variables.
- `src/lib/prisma.ts` owns the Prisma client and database pool.
- `src/plugins/` holds reusable Fastify plugins.
- `src/routes/` holds top-level route registration.
- `src/modules/` holds feature-specific code, grouped by domain.
- `prisma/schema.prisma` is the source of truth for database models.
- `src/generated/prisma/` is Prisma-generated code. Do not edit it by hand.

## How to work on it

1. Update the database schema in `prisma/schema.prisma`.
2. Run `npm run db:migrate` for real schema changes, or `npm run db:push` for quick local syncs.
3. Run `npm run db:generate` if the client needs to be regenerated.
4. Add feature code under `src/modules/<domain>/`.
5. Register routes from `src/routes/index.ts`.
6. Use `prisma` from `src/lib/prisma.ts` instead of creating new clients in handlers.

## Common commands

```bash
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
npm run db:push
```

## Conventions

- Keep startup logic in `src/server.ts`, not inside route files.
- Keep database access out of route handlers when the codebase grows; move it into services or repositories.
- Keep generated code out of hand edits.
- Keep Compose-owned ports and service URLs in `docker-compose.yml`; use `.env` and `.env.example` as mirrors of that setup.
