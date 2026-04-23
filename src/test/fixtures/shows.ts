import type { schema } from "@/db/migrations/schema";

type Show = typeof schema.shows.$inferSelect;

export const shows: Show[] = [
  {
    id: "00000000-0000-7000-8000-000000000001",
    title: "Test Show",
    episodes: 1,
    aired: "2026-03-08 to 2026-03-08",
    synopsis: "A test show.",
  },
];
