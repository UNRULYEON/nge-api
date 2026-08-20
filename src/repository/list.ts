import { asc, count, desc, type SQL } from "drizzle-orm";
import type { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

import { db } from "@/db";
import type { ListQuery } from "@/shared/pagination";

export const listRows = <Sort extends string, Row>(
  table: SQLiteTable,
  columns: Record<Sort, SQLiteColumn>,
  query: ListQuery<Sort>,
  where?: SQL,
): { data: Row[]; total: number } => {
  const orderBy = query.order === "desc" ? desc(columns[query.sort]) : asc(columns[query.sort]);

  const totalRow = where
    ? db.select({ total: count() }).from(table).where(where).get()
    : db.select({ total: count() }).from(table).get();

  const rows = where
    ? db
        .select()
        .from(table)
        .where(where)
        .orderBy(orderBy)
        .limit(query.limit)
        .offset(query.offset)
        .all()
    : db.select().from(table).orderBy(orderBy).limit(query.limit).offset(query.offset).all();

  return {
    data: rows as Row[],
    total: totalRow?.total ?? 0,
  };
};
