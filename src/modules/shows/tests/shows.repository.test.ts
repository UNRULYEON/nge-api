import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { schema } from "@/db/migrations/schema";
import { repository } from "@/modules/shows/shows.repository";
import { shows as showsFixtures } from "@/test/fixtures/shows";

beforeAll(() => {
  db.delete(schema.shows).run();
  db.insert(schema.shows).values(showsFixtures).run();
});

afterAll(() => {
  db.delete(schema.shows).run();
});

describe("shows repository", () => {
  describe("all", () => {
    it("returns all shows in the table", () => {
      expect(repository.all()).toEqual(showsFixtures);
    });
  });
});
