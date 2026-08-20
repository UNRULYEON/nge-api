import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { listRows } from "@/repository/list";
import type { ListQuery } from "@/shared/pagination";
import type { Show } from "@/types";

const sortColumns = {
  title: schema.shows.title,
  aired_from: schema.shows.aired_from,
  aired_to: schema.shows.aired_to,
  episodes: schema.shows.episodes,
} as const;

export type ShowSort = keyof typeof sortColumns;

export const shows = {
  all: () => db.select().from(schema.shows).all(),
  list: (query: ListQuery<ShowSort>) => listRows<ShowSort, Show>(schema.shows, sortColumns, query),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.shows).where(eq(schema.shows.id, id)).get() ?? null,
  byStudioId: ({ studio_id }: { studio_id: string }) =>
    db.select().from(schema.shows).where(eq(schema.shows.studio_id, studio_id)).all(),
  listByStudioId: ({ studio_id, ...query }: { studio_id: string } & ListQuery<ShowSort>) =>
    listRows<ShowSort, Show>(
      schema.shows,
      sortColumns,
      query,
      eq(schema.shows.studio_id, studio_id),
    ),
};
