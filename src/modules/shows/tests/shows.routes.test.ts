import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { schema } from "@/db/migrations/schema";
import { shows } from "@/modules/shows/shows.routes";
import { shows as showsFixtures } from "@/test/fixtures/shows";

beforeAll(() => {
  db.delete(schema.shows).run();
  db.insert(schema.shows).values(showsFixtures).run();
});

afterAll(() => {
  db.delete(schema.shows).run();
});

const app = new Elysia().use(shows);

describe("shows routes", () => {
  describe("GET /shows", () => {
    it("returns a list of shows", async () => {
      const response = await app.handle(new Request("http://localhost/shows"));

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(showsFixtures);
    });
  });

  describe("GET /shows/:id", () => {
    it("returns a show by id", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${showsFixtures[0].id}`),
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(showsFixtures[0]);
    });

    it("returns 404 if show not found", async () => {
      const response = await app.handle(new Request(`http://localhost/shows/non-existing-id`));

      expect(response.status).toBe(404);
    });
  });
});
