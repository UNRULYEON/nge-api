import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { movies } from "@/modules/movies/movies.routes";

beforeAll(() => {
  db.delete(schema.movies).run();
  db.insert(schema.movies).values(data.movies).run();
});

afterAll(() => {
  db.delete(schema.movies).run();
});

const app = new Elysia().use(movies);

describe("movies routes", () => {
  describe("GET /movies", () => {
    it("returns a list of movies", async () => {
      const response = await app.handle(new Request("http://localhost/movies"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(data.movies);
    });
  });

  describe("GET /movies/:id", () => {
    it("returns a show by id", async () => {
      const response = await app.handle(
        new Request(`http://localhost/movies/${data.movies[0].id}`),
      );

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(data.movies[0]);
    });

    it("returns 404 if show not found", async () => {
      const response = await app.handle(new Request(`http://localhost/movies/non-existing-id`));

      expect(response.status).toBe(404);
    });
  });
});
