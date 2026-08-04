import Fastify from "fastify";
import { corsPlugin } from "./plugins/cors.js";
import { routes } from "./routes/index.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(corsPlugin);
  app.register(routes);

  return app;
}
