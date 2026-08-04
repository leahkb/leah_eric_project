import type { FastifyPluginAsync } from "fastify";
import { healthRoute } from "./health.route.js";

export const routes: FastifyPluginAsync = async (app) => {
  await app.register(healthRoute);
};
