import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database(":memory:");
export const db = drizzle({ client: sqlite });
