import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { studios } from "@/modules/studios/studios.routes";
import { missingId, page } from "@/test/list";

beforeAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.movies).run();
  db.delete(schema.shows).run();
  db.delete(schema.studios).run();
  db.insert(schema.studios).values(data.studios).run();
  db.insert(schema.shows).values(data.shows).run();
  db.insert(schema.movies).values(data.movies).run();
});

afterAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.movies).run();
  db.delete(schema.shows).run();
  db.delete(schema.studios).run();
});

const app = new Elysia().use(studios);

describe("studios routes", () => {
  describe("GET /studios", () => {
    it("returns a paginated list of studios", async () => {
      const response = await app.handle(new Request("http://localhost/studios"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toEqual(page([...data.studios].sort((a, b) => a.name.localeCompare(b.name))));
    });
  });

  describe("GET /studios/:id", () => {
    it("returns a studio by id", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${data.studios[0].id}`),
      );

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toEqual(data.studios[0]);
    });

    it("returns 404 if studio not found", async () => {
      const response = await app.handle(new Request(`http://localhost/studios/${missingId}`));

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });

  describe("GET /studios/:id/shows", () => {
    it("returns shows by studio id", async () => {
      const studioId = data.studios[0].id;

      const response = await app.handle(new Request(`http://localhost/studios/${studioId}/shows`));

      const res = await response.json();
      const expected = data.shows.filter((show) => show.studio_id === studioId);

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(expected));
    });

    it("returns 404 if studio not found", async () => {
      const response = await app.handle(new Request(`http://localhost/studios/${missingId}/shows`));

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });

  describe("GET /studios/:id/movies", () => {
    it("returns movies by studio id", async () => {
      const studioId = data.studios[0].id;

      const response = await app.handle(new Request(`http://localhost/studios/${studioId}/movies`));

      const res = await response.json();
      const expected = data.movies
        .filter((movie) => movie.studio_id === studioId)
        .sort((a, b) => a.release_date.localeCompare(b.release_date));

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(expected));
    });

    it("returns 404 if studio not found", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${missingId}/movies`),
      );

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });
});
