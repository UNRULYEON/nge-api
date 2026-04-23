import { schema } from "@/db/schema";

export type Show = typeof schema.shows.$inferSelect;

export type Studio = typeof schema.studios.$inferSelect;