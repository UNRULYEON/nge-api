import type Database from "bun:sqlite";
import { STUDIO_IDS } from "./ids";

export function initializeStudios(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS studios (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      founded INTEGER NOT NULL,
      location TEXT NOT NULL,
      website TEXT
    )
  `);

  const insertStudio = db.prepare(
    "INSERT INTO studios (id, name, founded, location, website) VALUES (?, ?, ?, ?, ?)"
  );

  const studios = [
    {
      id: STUDIO_IDS.gainax,
      name: "Gainax",
      founded: 1984,
      location: "Tokyo, Japan",
      website: null,
    },
    {
      id: STUDIO_IDS.khara,
      name: "Khara",
      founded: 2006,
      location: "Tokyo, Japan",
      website: "https://www.khara.co.jp",
    },
    {
      id: STUDIO_IDS.tatsunoko,
      name: "Tatsunoko Production",
      founded: 1962,
      location: "Tokyo, Japan",
      website: "https://www.tatsunoko.co.jp",
    },
  ];

  for (const studio of studios) {
    insertStudio.run(studio.id, studio.name, studio.founded, studio.location, studio.website);
  }
}
