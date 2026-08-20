import { t } from "elysia";

import { uuids } from "@/db/uuids";
import { listQuery, paginated, resolveListQuery } from "@/shared/pagination";

export namespace Shows {
  export const sortFields = ["title", "aired_from", "aired_to", "episodes"] as const;
  export type Sort = (typeof sortFields)[number];
  export const defaultSort: Sort = "aired_from";
  export const query = listQuery(sortFields, defaultSort);
  export const resolveQuery = (query: {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "asc" | "desc";
  }) => resolveListQuery<Sort>(query, defaultSort);

  export const showType = t.Object({
    id: t.String({
      format: "uuid",
      examples: [uuids.SHOW_IDS.nge],
    }),
    title: t.String({ examples: ["Neon Genesis Evangelion"] }),
    title_japanese: t.String({ examples: ["新世紀エヴァンゲリオン"] }),
    episodes: t.Integer({ examples: [26] }),
    aired_from: t.String({ format: "date", examples: ["1995-10-04"] }),
    aired_to: t.String({ format: "date", examples: ["1996-03-27"] }),
    synopsis: t.String({
      examples: [
        "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of NERV, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin.",
      ],
    }),
    studio_id: t.Nullable(
      t.String({
        format: "uuid",
        examples: [uuids.STUDIO_IDS.gainax],
      }),
    ),
  });

  export const list = paginated(showType);
  export const show = showType;
}
