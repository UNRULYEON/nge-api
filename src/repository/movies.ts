import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { listRows } from "@/repository/list";
import type { ListQuery } from "@/shared/pagination";
import type { Movie } from "@/types";

const sortColumns = {
  title: schema.movies.title,
  release_date: schema.movies.release_date,
  runtime: schema.movies.runtime,
} as const;

export type MovieSort = keyof typeof sortColumns;

export const movies = {
  all: () => db.select().from(schema.movies).all(),
  list: (query: ListQuery<MovieSort>) =>
    listRows<MovieSort, Movie>(schema.movies, sortColumns, query),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.movies).where(eq(schema.movies.id, id)).get() ?? null,
  byStudioId: ({ studio_id }: { studio_id: string }) =>
    db.select().from(schema.movies).where(eq(schema.movies.studio_id, studio_id)).all(),
  listByStudioId: ({ studio_id, ...query }: { studio_id: string } & ListQuery<MovieSort>) =>
    listRows<MovieSort, Movie>(
      schema.movies,
      sortColumns,
      query,
      eq(schema.movies.studio_id, studio_id),
    ),
};
