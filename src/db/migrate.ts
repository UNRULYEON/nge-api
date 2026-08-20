import { migrate as drizzleMigrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "@/db";
import { migrationsFolder } from "@/paths";

export const migrate = () => {
  drizzleMigrate(db, { migrationsFolder });
};
