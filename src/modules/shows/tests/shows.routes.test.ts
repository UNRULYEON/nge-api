import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { shows } from "@/modules/shows/shows.routes";

beforeAll(() => {
  db.delete(schema.shows).run();
  db.insert(schema.shows).values(data.shows).run();
});

afterAll(() => {
  db.delete(schema.shows).run();
});

const app = new Elysia().use(shows);

describe("shows routes", () => {
  describe("GET /shows", () => {
    it("returns a list of shows", async () => {
      const response = await app.handle(new Request("http://localhost/shows"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(data.shows);
    });
  });

  describe("GET /shows/:id", () => {
    it("returns a show by id", async () => {
      const response = await app.handle(new Request(`http://localhost/shows/${data.shows[0].id}`));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(data.shows[0]);
    });

    it("returns 404 if show not found", async () => {
      const response = await app.handle(new Request(`http://localhost/shows/non-existing-id`));

      expect(response.status).toBe(404);
    });
  });
});
