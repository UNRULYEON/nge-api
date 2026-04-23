import { migrate as drizzleMigrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "@/db";

export const migrate = () => {
  drizzleMigrate(db, { migrationsFolder: "src/db/migrations" });
};
