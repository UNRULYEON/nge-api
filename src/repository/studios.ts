import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { listRows } from "@/repository/list";
import type { ListQuery } from "@/shared/pagination";
import type { Studio } from "@/types";

const sortColumns = {
  name: schema.studios.name,
  founded: schema.studios.founded,
} as const;

export type StudioSort = keyof typeof sortColumns;

export const studios = {
  all: () => db.select().from(schema.studios).all(),
  list: (query: ListQuery<StudioSort>) =>
    listRows<StudioSort, Studio>(schema.studios, sortColumns, query),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.studios).where(eq(schema.studios.id, id)).get() ?? null,
};
