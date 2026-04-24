import { eq } from "drizzle-orm";

import { db } from "@/db";
import { schema } from "@/db/schema";

export const studios = {
  all: () => db.select().from(schema.studios).all(),
  byId: ({ id }: { id: string }) =>
    db.select().from(schema.studios).where(eq(schema.studios.id, id)).get() ?? null,
};
