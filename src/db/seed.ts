import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";

const studios = async () => {
  await db.insert(schema.studios).values(data.studios).onConflictDoNothing();
};

const shows = async () => {
  await db.insert(schema.shows).values(data.shows).onConflictDoNothing();
};

const episodes = async () => {
  await db.insert(schema.episodes).values(data.episodes).onConflictDoNothing();
};

export const seed = async () => {
  await studios();
  await shows();
  await episodes();
};
