import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { studios } from "./studios";

export const movies = sqliteTable("movies", {
  id: text().primaryKey(),
  title: text().notNull(),
  title_japanese: text().notNull(),
  release_date: text().notNull(),
  runtime: int().notNull(),
  synopsis: text().notNull(),
  studio_id: text()
    .notNull()
    .references(() => studios.id),
});
