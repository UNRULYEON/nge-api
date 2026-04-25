import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";

export const movies = {
  all: () => db.select().from(schema.movies).all(),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.movies).where(eq(schema.movies.id, id)).get() ?? null,
  byStudioId: ({ studio_id }: { studio_id: string }) =>
    db.select().from(schema.movies).where(eq(schema.movies.studio_id, studio_id)).all(),
};
