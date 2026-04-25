import { schema } from "@/db/schema";

export type Show = typeof schema.shows.$inferSelect;

export type Studio = typeof schema.studios.$inferSelect;

export type Episode = typeof schema.episodes.$inferSelect;
