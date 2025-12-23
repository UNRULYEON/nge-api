import type Database from "bun:sqlite";

export function initializeDatabase(db: Database) {
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
      id: "019b48ba-eac5-7000-85c0-3ef877607b73",
      name: "Gainax",
      founded: 1984,
      location: "Tokyo, Japan",
      website: null,
    },
    {
      id: "019b48ba-eac5-7001-832b-cc5d8b463318",
      name: "Khara",
      founded: 2006,
      location: "Tokyo, Japan",
      website: "https://www.khara.co.jp",
    },
    {
      id: "019b48ba-eac5-7002-8e4f-b99f9f2765be",
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
