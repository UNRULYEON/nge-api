import { t, type TSchema } from "elysia";

export const DEFAULT_LIMIT = 50;
export const MAX_LIMIT = 100;

export const order = t.Union([t.Literal("asc"), t.Literal("desc")]);
export type Order = (typeof order)["static"];

export type ListQuery<Sort extends string> = {
  limit: number;
  offset: number;
  sort: Sort;
  order: Order;
};

export const resolveListQuery = <Sort extends string>(
  query: {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: Order;
  },
  defaultSort: NoInfer<Sort>,
): ListQuery<Sort> => ({
  limit: query.limit ?? DEFAULT_LIMIT,
  offset: query.offset ?? 0,
  sort: (query.sort ?? defaultSort) as Sort,
  order: query.order ?? "asc",
});

export const listQuery = <const Fields extends readonly [string, ...string[]]>(
  fields: Fields,
  defaultSort: Fields[number],
) => {
  const sortDescription = `Sort field. Defaults to ${defaultSort}.`;
  const sort =
    fields.length === 1
      ? t.Literal(fields[0], { description: sortDescription })
      : t.Union(
          fields.map((field) => t.Literal(field)) as [
            ReturnType<typeof t.Literal<Fields[number]>>,
            ReturnType<typeof t.Literal<Fields[number]>>,
            ...ReturnType<typeof t.Literal<Fields[number]>>[],
          ],
          { description: sortDescription },
        );

  return t.Object({
    limit: t.Optional(
      t.Numeric({
        minimum: 1,
        maximum: MAX_LIMIT,
        default: DEFAULT_LIMIT,
        description: `Page size (1–${MAX_LIMIT}). Defaults to ${DEFAULT_LIMIT}.`,
      }),
    ),
    offset: t.Optional(
      t.Numeric({
        minimum: 0,
        default: 0,
        description: "Number of rows to skip. Defaults to 0.",
      }),
    ),
    sort: t.Optional(sort),
    order: t.Optional(
      t.Union([t.Literal("asc"), t.Literal("desc")], {
        description: "Sort direction. Defaults to asc.",
      }),
    ),
  });
};

export const listMeta = t.Object({
  total: t.Integer({
    minimum: 0,
    description: "Total rows matching the query before pagination.",
  }),
  limit: t.Integer({ minimum: 1, description: "Page size." }),
  offset: t.Integer({ minimum: 0, description: "Number of rows skipped." }),
});

export const paginated = <T extends TSchema>(item: T) =>
  t.Object({
    data: t.Array(item),
    meta: listMeta,
  });

export const toListResponse = <T>(
  result: { data: T[]; total: number },
  query: Pick<ListQuery<string>, "limit" | "offset">,
) => ({
  data: result.data,
  meta: {
    total: result.total,
    limit: query.limit,
    offset: query.offset,
  },
});
