import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type { Staff, Studio } from "@/types/entities";

export const staff = {
  getAll(): Staff[] {
    return record("db.staff.getAll", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, role, bio FROM staff`
        )
        .all() as Staff[];
    });
  },

  getById(id: string): Staff | null {
    return record("db.staff.getById", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, role, bio FROM staff WHERE id = ?`
        )
        .get(id) as Staff | null;
    });
  },

  getStudios(staffId: string): Studio[] {
    return record("db.staff.getStudios", () => {
      return db
        .query(
          `SELECT s.id, s.name, s.founded, s.location, s.website
         FROM studios s
         JOIN studio_staff ss ON ss.studio_id = s.id
         WHERE ss.staff_id = ?`
        )
        .all(staffId) as Studio[];
    });
  },
};
