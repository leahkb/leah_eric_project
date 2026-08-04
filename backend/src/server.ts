import { env } from "./config/env.js";
import { buildApp } from "./app.js";
import { closeDatabase } from "./lib/prisma.js";

export async function startServer() {
  const app = buildApp();

  app.addHook("onClose", async () => {
    await closeDatabase();
  });

  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT,
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}
