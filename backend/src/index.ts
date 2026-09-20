import cors from "@fastify/cors";
import Fastify from "fastify";
import { env } from "./env.js";
import { closePrisma, prisma } from "./prisma.js";

async function main() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: env.FRONTEND_URL,
    credentials: true,
  });

  app.get("/health", async () => ({
    status: "ok",
  }));

  app.get("/api/ideas", async () => {
    const ideas = await prisma.ideas.findMany({
      include: { author: true },
      orderBy: { createdDate: "desc" },
    });
    return ideas;
  });

  app.addHook("onClose", async () => {
    await closePrisma();
  });

  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT,
    });
  } catch (error) {
    app.log.error(error);
    await closePrisma();
    process.exit(1);
  }
}

await main();
