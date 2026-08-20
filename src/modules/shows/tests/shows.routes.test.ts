import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { shows } from "@/modules/shows/shows.routes";
import { missingId, page } from "@/test/list";

beforeAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.shows).run();
  db.insert(schema.shows).values(data.shows).run();
  db.insert(schema.episodes).values(data.episodes).run();
});

afterAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.shows).run();
});

const app = new Elysia().use(shows);

describe("shows routes", () => {
  describe("GET /shows", () => {
    it("returns a paginated list of shows", async () => {
      const response = await app.handle(new Request("http://localhost/shows"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(data.shows));
    });

    it("applies limit and offset", async () => {
      const response = await app.handle(new Request("http://localhost/shows?limit=1&offset=0"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(data.shows.slice(0, 1), data.shows.length, 1, 0));
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
      const response = await app.handle(new Request(`http://localhost/shows/${missingId}`));

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });

  describe("GET /shows/:id/episodes", () => {
    it("returns episodes by show id", async () => {
      const showId = data.shows[0].id;

      const response = await app.handle(new Request(`http://localhost/shows/${showId}/episodes`));

      const res = await response.json();

      const expected = data.episodes.filter((episode) => episode.show_id === showId);

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(expected));
    });

    it("returns 404 if show not found", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${missingId}/episodes`),
      );

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });
});
