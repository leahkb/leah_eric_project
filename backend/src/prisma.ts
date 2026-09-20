import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

let isClosed = false;

export async function closePrisma() {
  if (isClosed) {
    return;
  }

  isClosed = true;

  await prisma.$disconnect();
  await pool.end();
}
