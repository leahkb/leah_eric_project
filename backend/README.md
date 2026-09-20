# Backend

This backend is intentionally small. The easiest way to understand it is to read the files in this order:

1. `src/index.ts` starts Fastify, registers CORS, adds the `/health` route, and starts the server.
2. `src/env.ts` reads and validates environment variables.
3. `src/prisma.ts` creates the Prisma client and closes it when the server shuts down.
4. `prisma/schema.prisma` defines the database models.

## Minimal layout

```text
backend/
  prisma/
    schema.prisma
  src/
    index.ts
    env.ts
    prisma.ts
    generated/
      prisma/
```

`src/generated/prisma/` is Prisma-generated code. Do not edit those files by hand.

## How to run it

1. Copy `backend/.env.example` to `backend/.env` if you want to run it outside Docker.
2. Make sure PostgreSQL is running and `DATABASE_URL` points at it.
3. From `backend/`, run:

```bash
npm install
npm run db:generate
npm run dev
```

4. Open `http://localhost:3000/health`.

## How to add code

1. Put new Fastify routes in `src/index.ts` until the file feels too crowded.
2. When you have more than a couple of routes, extract them into a new file and register them from `src/index.ts`.
3. Import `prisma` from `src/prisma.ts` anywhere you need database access.
4. Keep database schema changes in `prisma/schema.prisma`, then run `npm run db:migrate` or `npm run db:push`.

## Common commands

```bash
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
npm run db:push
```
