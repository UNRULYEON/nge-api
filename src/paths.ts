import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const resolveExisting = (label: string, candidates: string[]) => {
  const found = candidates.find((path) => existsSync(path));

  if (!found) {
    throw new Error(`Could not find ${label}. Looked in:\n${candidates.join("\n")}`);
  }

  return found;
};

export const migrationsFolder = dirname(
  dirname(
    resolveExisting("drizzle migrations", [
      join(import.meta.dir, "db", "migrations", "meta", "_journal.json"),
      join(import.meta.dir, "migrations", "meta", "_journal.json"),
      join(import.meta.dir, "src", "db", "migrations", "meta", "_journal.json"),
    ]),
  ),
);
