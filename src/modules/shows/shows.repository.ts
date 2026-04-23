import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";

export const repository = {
  all: () => db.select().from(schema.shows).all(),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.shows).where(eq(schema.shows.id, id)).get() ?? null,
};
