import { createRequire } from "node:module";
import type { PrismaClient } from "./generated/client/index.d.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) {
  throw new Error(`"DATABASE_URL" not found in the environment variables`);
}

const require = createRequire(import.meta.url);
const Prisma = require("./generated/client/index.js");
export const prisma: PrismaClient = new Prisma.PrismaClient();

export * from "./generated/client/index.d.ts";
