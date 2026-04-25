import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { studios } from "@/modules/studios/studios.routes";

beforeAll(() => {
  db.delete(schema.studios).run();
  db.insert(schema.studios).values(data.studios).run();
});

afterAll(() => {
  db.delete(schema.studios).run();
});

const app = new Elysia().use(studios);

describe("studios routes", () => {
  describe("GET /studios", () => {
    it("returns a list of studios", async () => {
      const response = await app.handle(new Request("http://localhost/studios"));

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toEqual(data.studios);
    });
  });

  describe("GET /studios/:id", () => {
    it("returns a show by id", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${data.studios[0].id}`),
      );

      const res = await response.json();

      expect(response.status).toBe(200);
      expect(res).toEqual(data.studios[0]);
    });

    it("returns 404 if show not found", async () => {
      const response = await app.handle(new Request(`http://localhost/studios/non-existing-id`));

      expect(response.status).toBe(404);
    });
  });
});
