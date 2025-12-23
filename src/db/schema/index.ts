import type Database from "bun:sqlite";
import { initializeAngels } from "./angels";
import { initializeCharacters } from "./characters";
import { initializeEpisodes } from "./episodes";
import { initializeEvas } from "./evas";
import { initializeMovies } from "./movies";
import { initializeOrganizations } from "./organizations";
import { initializeRelations } from "./relations";
import { initializeShows } from "./shows";
import { initializeStaff } from "./staff";
import { initializeStudios } from "./studios";

export function initializeDatabase(db: Database) {
  // Initialize core tables first (order matters for foreign keys)
  initializeStudios(db);
  initializeShows(db);
  initializeMovies(db);
  initializeOrganizations(db);
  initializeCharacters(db);
  initializeEpisodes(db);
  initializeAngels(db);
  initializeEvas(db);
  initializeStaff(db);

  // Initialize junction tables last
  initializeRelations(db);
}
