import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";

export const episodes = {
  all: () => db.select().from(schema.episodes).all(),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.episodes).where(eq(schema.episodes.id, id)).get() ?? null,
};
