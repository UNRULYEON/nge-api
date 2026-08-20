import { t } from "elysia";

import { uuids } from "@/db/uuids";
import { listQuery, paginated, resolveListQuery } from "@/shared/pagination";

export namespace Episodes {
  export const sortFields = ["episode_number", "title", "air_date"] as const;
  export type Sort = (typeof sortFields)[number];
  export const defaultSort: Sort = "episode_number";
  export const query = listQuery(sortFields, defaultSort);
  export const resolveQuery = (query: {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "asc" | "desc";
  }) => resolveListQuery<Sort>(query, defaultSort);

  export const episodeType = t.Object({
    id: t.String({
      format: "uuid",
      examples: [uuids.EPISODE_IDS.ep1],
    }),
    episode_number: t.Integer({ examples: [1] }),
    title: t.String({ examples: ["Angel Attack"] }),
    title_japanese: t.String({ examples: ["使徒、襲来"] }),
    air_date: t.String({ format: "date", examples: ["1995-10-04"] }),
    synopsis: t.String({
      examples: [
        "Shinji Ikari arrives in Tokyo-3 and is recruited by his estranged father Gendo to pilot Evangelion Unit-01 against the Angel Sachiel.",
      ],
    }),
    show_id: t.String({
      format: "uuid",
      examples: [uuids.SHOW_IDS.nge],
    }),
  });

  export const list = paginated(episodeType);
  export const episode = episodeType;
}
