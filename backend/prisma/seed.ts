import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  const user = await prisma.user.upsert({
    where: { username: "demo" },
    update: {},
    create: { username: "demo" },
  });

  await prisma.ideas.createMany({
    data: [
      { authorId: user.id, body: "First idea from the database!" },
      { authorId: user.id, body: "Testing the backend connection." },
      { authorId: user.id, body: "This data flows from DB → backend → frontend." },
    ],
  });

  console.log("Seeded user:", user.username, "with ideas");
}

seed().finally(() => prisma.$disconnect());
