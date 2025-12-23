import { db } from "@/db";
import type { Studio } from "@/types/entities";

export const studios = {
  getAll(): Studio[] {
    return db.query("SELECT * FROM studios").all() as Studio[];
  },

  getById(id: string): Studio | null {
    return db.query("SELECT * FROM studios WHERE id = ?").get(id) as Studio | null;
  },
};
