import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env["FRONTEND_URL"] ?? "http://localhost:5173",
  credentials: true,
});

app.get("/health", async () => {
  return { status: "ok" };
});

const port = Number(process.env["PORT"] ?? 3000);
const host = process.env["HOST"] ?? "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
