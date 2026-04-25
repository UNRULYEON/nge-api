import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { repositories } from "@/repository";

beforeAll(() => {
  db.delete(schema.studios).run();
  db.insert(schema.studios).values(data.studios).run();
});

afterAll(() => {
  db.delete(schema.studios).run();
});

describe("studios repository", () => {
  describe("all", () => {
    it("returns all studios in the table", () => {
      expect(repositories.studios.all()).toEqual(data.studios);
    });
  });

  describe("byId", () => {
    it("returns a studio by id", () => {
      expect(repositories.studios.byId({ id: data.studios[0].id })).toStrictEqual(data.studios[0]);
    });

    it("returns null when not found", () => {
      expect(repositories.studios.byId({ id: "non-existing-id" })).toBeNull();
    });
  });
});
