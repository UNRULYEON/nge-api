import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp({ withTimezone: true }),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
};
