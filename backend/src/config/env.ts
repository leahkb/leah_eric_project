import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(3000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables");
  console.error(parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
