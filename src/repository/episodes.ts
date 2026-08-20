import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { listRows } from "@/repository/list";
import type { ListQuery } from "@/shared/pagination";
import type { Episode } from "@/types";

const sortColumns = {
  episode_number: schema.episodes.episode_number,
  title: schema.episodes.title,
  air_date: schema.episodes.air_date,
} as const;

export type EpisodeSort = keyof typeof sortColumns;

export const episodes = {
  all: () => db.select().from(schema.episodes).all(),
  list: (query: ListQuery<EpisodeSort>) =>
    listRows<EpisodeSort, Episode>(schema.episodes, sortColumns, query),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.episodes).where(eq(schema.episodes.id, id)).get() ?? null,
  byShowId: ({ show_id }: { show_id: string }) =>
    db.select().from(schema.episodes).where(eq(schema.episodes.show_id, show_id)).all(),
  listByShowId: ({ show_id, ...query }: { show_id: string } & ListQuery<EpisodeSort>) =>
    listRows<EpisodeSort, Episode>(
      schema.episodes,
      sortColumns,
      query,
      eq(schema.episodes.show_id, show_id),
    ),
};
