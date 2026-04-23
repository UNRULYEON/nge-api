
import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { schema } from "@/db/schema";
import { repository } from "@/modules/studios/studios.repository";
import { data } from "@/db/data";

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
      expect(repository.all()).toEqual(data.studios);
    });
  });

  describe("byId", () => {
    it("returns a studio by id", () => {
      expect(repository.byId({ id: data.studios[0].id })).toStrictEqual(data.studios[0]);
    });

    it("returns null when not found", () => {
      expect(repository.byId({ id: "non-existing-id" })).toBeNull();
    });
  });
});
