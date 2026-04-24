import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { repositories } from "@/repository";
import { data } from "@/db/data";

beforeAll(() => {
  db.delete(schema.shows).run();
  db.insert(schema.shows).values(data.shows).run();
});

afterAll(() => {
  db.delete(schema.shows).run();
});

describe("shows repository", () => {
  describe("all", () => {
    it("returns all shows in the table", () => {
      expect(repositories.shows.all()).toEqual(data.shows);
    });
  });

  describe("byId", () => {
    it("returns a show by id", () => {
      expect(repositories.shows.byId({ id: data.shows[0].id })).toStrictEqual(data.shows[0]);
    });

    it("returns null when not found", () => {
      expect(repositories.shows.byId({ id: "non-existing-id" })).toBeNull();
    });
  });
});
