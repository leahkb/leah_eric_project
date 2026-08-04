# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
WORKDIR /app

# Prisma needs OpenSSL on Debian-based images.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

FROM base AS dev
COPY . .
CMD ["sh", "-c", "npm run db:generate && npm run dev"]

FROM base AS build

# Prisma generate reads DATABASE_URL from the environment.
ARG DATABASE_URL=postgresql://user:password@localhost:5432/mydb
ENV DATABASE_URL=${DATABASE_URL}

COPY . .
RUN npm run db:generate && npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN npm prune --omit=dev && npm cache clean --force

EXPOSE 3000
CMD ["npm", "start"]
