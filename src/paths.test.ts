import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { migrationsFolder } from "@/paths";

describe("runtime paths", () => {
  it("resolves drizzle migrations from disk or the compiled bunfs", () => {
    expect(existsSync(join(migrationsFolder, "meta/_journal.json"))).toBe(true);
  });
});
