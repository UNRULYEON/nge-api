import { t } from "elysia";

import { uuids } from "@/db/uuids";
import { listQuery, paginated, resolveListQuery } from "@/shared/pagination";

export namespace Studios {
  export const sortFields = ["name", "founded"] as const;
  export type Sort = (typeof sortFields)[number];
  export const defaultSort: Sort = "name";
  export const query = listQuery(sortFields, defaultSort);
  export const resolveQuery = (query: {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "asc" | "desc";
  }) => resolveListQuery<Sort>(query, defaultSort);

  export const studioType = t.Object({
    id: t.String({
      format: "uuid",
      examples: [uuids.STUDIO_IDS.gainax],
    }),
    name: t.String({ examples: ["Gainax"] }),
    founded: t.Integer({ examples: [1984] }),
    location: t.String({ examples: ["Tokyo, Japan"] }),
    website: t.Nullable(t.String({ format: "uri", examples: ["https://www.khara.co.jp"] })),
  });

  export const list = paginated(studioType);
  export const studio = studioType;
}
