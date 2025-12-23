import { db } from "@/db";
import type { Organization } from "@/types/entities";

export const organizations = {
  getAll(): Organization[] {
    return db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations`
      )
      .all() as Organization[];
  },

  getById(id: string): Organization | null {
    return db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations WHERE id = ?`
      )
      .get(id) as Organization | null;
  },
};
