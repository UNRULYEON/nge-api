import { db } from "@/db";
import { schema } from "@/db/schema";

import { data } from "@/db/data";

const shows = async () => {
  await db.insert(schema.shows).values(data.shows).onConflictDoNothing();
};

const studios = async () => {
  await db.insert(schema.studios).values(data.studios).onConflictDoNothing();
};

export const seed = async () => {
  await studios();
  await shows();
};
