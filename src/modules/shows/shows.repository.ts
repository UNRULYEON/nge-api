import { db } from "@/db";
import { schema } from "@/db/migrations/schema";

export const repository = {
  all: () => db.select().from(schema.shows).all(),
};
