import { db } from "@/db";
import type { Angel } from "@/types/entities";

interface AngelRow {
  id: string;
  name: string;
  nameJapanese: string;
  number: number;
  description: string;
}

function getEpisodeIds(angelId: string): string[] {
  const rows = db
    .query(`SELECT episode_id FROM angel_episodes WHERE angel_id = ?`)
    .all(angelId) as { episode_id: string }[];
  return rows.map((r) => r.episode_id);
}

function parseAngel(row: AngelRow): Angel {
  return {
    ...row,
    episodeIds: getEpisodeIds(row.id),
  };
}

export const angels = {
  getAll(): Angel[] {
    const rows = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, number, description FROM angels ORDER BY number`
      )
      .all() as AngelRow[];
    return rows.map(parseAngel);
  },

  getById(id: string): Angel | null {
    const row = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, number, description FROM angels WHERE id = ?`
      )
      .get(id) as AngelRow | null;
    return row ? parseAngel(row) : null;
  },
};
