import { describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { health } from "./health.routes";

const app = new Elysia().use(health);

describe("health", () => {
  describe("GET /health", () => {
    it('returns "OK"', async () => {
      const response = await app.handle(new Request("http://localhost/health"));

      const data = await response.text();

      expect(response.status).toBe(200);
      expect(data).toBe("OK");
    });
  });
});
