import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type { Angel, Episode } from "@/types/entities";

export const angels = {
  getAll(): Angel[] {
    return record("db.angels.getAll", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, number, description FROM angels ORDER BY number`,
        )
        .all() as Angel[];
    });
  },

  getById(id: string): Angel | null {
    return record("db.angels.getById", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, number, description FROM angels WHERE id = ?`,
        )
        .get(id) as Angel | null;
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
