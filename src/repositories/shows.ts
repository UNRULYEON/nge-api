import { db } from "@/db";
import type { Show } from "@/types/entities";

export const shows = {
  getAll(): Show[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, studio_id as studioId, synopsis FROM shows`
      )
      .all() as Show[];
  },

  getById(id: string): Show | null {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, studio_id as studioId, synopsis FROM shows WHERE id = ?`
      )
      .get(id) as Show | null;
  },
};
