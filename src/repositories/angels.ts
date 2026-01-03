import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type { Angel, Episode } from "@/types/entities";

const CDN_BASE_URL = "https://cdn.nge-api.dev/public";

interface AngelRow {
  id: string;
  name: string;
  nameJapanese: string;
  number: number;
  description: string;
  pictureImage: string | null;
}

function buildImageUrl(path: string | null): string | null {
  if (!path) return null;
  return `${CDN_BASE_URL}/${path}`;
}

function parseAngel(row: AngelRow): Angel {
  return {
    id: row.id,
    name: row.name,
    nameJapanese: row.nameJapanese,
    number: row.number,
    description: row.description,
    images: {
      picture: buildImageUrl(row.pictureImage),
    },
  };
}

export const angels = {
  getAll(): Angel[] {
    return record("db.angels.getAll", () => {
      const rows = db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, number, description, picture_image as pictureImage FROM angels ORDER BY number`,
        )
        .all() as AngelRow[];
      return rows.map(parseAngel);
    });
  },

  getById(id: string): Angel | null {
    return record("db.angels.getById", () => {
      const row = db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, number, description, picture_image as pictureImage FROM angels WHERE id = ?`,
        )
        .get(id) as AngelRow | null;
      return row ? parseAngel(row) : null;
    });
  },

  getEpisodes(angelId: string): Episode[] {
    return record("db.angels.getEpisodes", () => {
      return db
        .query(
          `SELECT e.id, e.episode_number as episodeNumber, e.title, e.title_japanese as titleJapanese, e.air_date as airDate, e.synopsis
         FROM episodes e
         JOIN angel_episodes ae ON ae.episode_id = e.id
         WHERE ae.angel_id = ?
         ORDER BY e.episode_number`,
        )
        .all(angelId) as Episode[];
    });
  },
};
