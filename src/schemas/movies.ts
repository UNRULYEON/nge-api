import { t } from "elysia";

import { uuids } from "@/db/uuids";
import { listQuery, paginated, resolveListQuery } from "@/shared/pagination";

export namespace Movies {
  export const sortFields = ["title", "release_date", "runtime"] as const;
  export type Sort = (typeof sortFields)[number];
  export const defaultSort: Sort = "release_date";
  export const query = listQuery(sortFields, defaultSort);
  export const resolveQuery = (query: {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "asc" | "desc";
  }) => resolveListQuery<Sort>(query, defaultSort);

  export const movieType = t.Object({
    id: t.String({
      format: "uuid",
      examples: [uuids.MOVIE_IDS.endOfEva],
    }),
    title: t.String({ examples: ["The End of Evangelion"] }),
    title_japanese: t.String({
      examples: ["新世紀エヴァンゲリオン劇場版 Air/まごころを、君に"],
    }),
    release_date: t.String({ format: "date", examples: ["1997-07-19"] }),
    runtime: t.Integer({ examples: [87] }),
    synopsis: t.String({
      examples: [
        "Concurrent theatrical ending to the TV series, taking place during episodes 25 and 26. SEELE launches an attack on NERV headquarters, leading to a climactic confrontation.",
      ],
    }),
    studio_id: t.String({
      format: "uuid",
      examples: [uuids.STUDIO_IDS.gainax],
    }),
  });

  export const list = paginated(movieType);
  export const movie = movieType;
}
