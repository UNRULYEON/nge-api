import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { episodes } from "@/modules/episodes/episodes.routes";
import { missingId, page } from "@/test/list";

beforeAll(() => {
  db.delete(schema.episodes).run();
  db.insert(schema.episodes).values(data.episodes).run();
});

afterAll(() => {
  db.delete(schema.episodes).run();
});

const app = new Elysia().use(episodes);

describe("episodes routes", () => {
  describe("GET /episodes", () => {
    it("returns a paginated list of episodes", async () => {
      const response = await app.handle(new Request("http://localhost/episodes"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(data.episodes));
    });

    it("applies limit and offset", async () => {
      const response = await app.handle(new Request("http://localhost/episodes?limit=2&offset=2"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(page(data.episodes.slice(2, 4), data.episodes.length, 2, 2));
    });
  });

  describe("GET /episodes/:id", () => {
    it("returns an episode by id", async () => {
      const response = await app.handle(
        new Request(`http://localhost/episodes/${data.episodes[0].id}`),
      );

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toStrictEqual(data.episodes[0]);
    });

    it("returns 404 if episode not found", async () => {
      const response = await app.handle(new Request(`http://localhost/episodes/${missingId}`));

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });
  });
});
