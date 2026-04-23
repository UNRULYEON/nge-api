import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { studios } from "./studios";

export const shows = sqliteTable("shows", {
  id: text().primaryKey(),
  title: text().notNull(),
  episodes: int().notNull(),
  aired: text().notNull(),
  synopsis: text().notNull(),
  studio_id: text().references(() => studios.id),
});
