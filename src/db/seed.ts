import { db } from "@/db";
import { schema } from "@/db/schema";

import { uuids } from "./uuids";

export const seed = async () => {
  await db
    .insert(schema.shows)
    .values([
      {
        id: uuids.SHOWS.nge,
        title: "Neon Genesis Evangelion",
        episodes: 26,
        aired: "1995-10-04 to 1996-03-27",
        synopsis:
          "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of NERV, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin.",
      },
    ])
    .onConflictDoNothing();
};
