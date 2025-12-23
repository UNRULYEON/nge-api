import { db } from "@/db";
import type { Organization } from "@/types/entities";

interface OrganizationRow {
  id: string;
  name: string;
  nameJapanese: string;
  type: string;
  description: string;
}

function getEpisodeIds(organizationId: string): string[] {
  const rows = db
    .query(
      `SELECT episode_id FROM organization_episodes WHERE organization_id = ?`
    )
    .all(organizationId) as { episode_id: string }[];
  return rows.map((r) => r.episode_id);
}

function parseOrganization(row: OrganizationRow): Organization {
  return {
    ...row,
    episodeIds: getEpisodeIds(row.id),
  };
}

export const organizations = {
  getAll(): Organization[] {
    const rows = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations`
      )
      .all() as OrganizationRow[];
    return rows.map(parseOrganization);
  },

  getById(id: string): Organization | null {
    const row = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations WHERE id = ?`
      )
      .get(id) as OrganizationRow | null;
    return row ? parseOrganization(row) : null;
  },
};
