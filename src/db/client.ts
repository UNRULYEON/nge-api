import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";

import { schema } from "./schema";

const sqlite = new Database(":memory:");
export const db = drizzle({ client: sqlite, schema });
