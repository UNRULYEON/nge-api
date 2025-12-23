import Database from "bun:sqlite";
import { initializeDatabase } from "./schema";

export const db = new Database(":memory:");

initializeDatabase(db);
