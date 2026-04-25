import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { shows } from "./shows";

export const episodes = sqliteTable("episodes", {
  id: text().primaryKey(),
  episode_number: int().notNull(),
  title: text().notNull(),
  title_japanese: text().notNull(),
  air_date: text().notNull(),
  synopsis: text().notNull(),
  show_id: text()
    .notNull()
    .references(() => shows.id),
});
