import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { schema } from "@/db/schema";
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

  describe("byId", () => {
    it("returns a show by id", () => {
      expect(repository.byId({ id: showsFixtures[0].id })).toStrictEqual(showsFixtures[0]);
    });

    it("returns null when not found", () => {
      expect(repository.byId({ id: "non-existing-id" })).toBeNull();
    });
  });
});
