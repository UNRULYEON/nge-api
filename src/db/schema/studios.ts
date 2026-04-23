import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studios = sqliteTable("studios", {
  id: text().primaryKey(),
  name: text().notNull(),
  founded: int().notNull(),
  location: text().notNull(),
  website: text(),
});
