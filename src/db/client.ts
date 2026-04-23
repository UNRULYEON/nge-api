import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";

const file = process.env.NODE_ENV === "test" ? ":memory:" : "db.sqlite";
const sqlite = new Database(file);
export const db = drizzle({ client: sqlite });
