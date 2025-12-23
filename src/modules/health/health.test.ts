import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { health } from ".";

const app = new Elysia().use(health);

describe("Health", () => {
  describe("GET /health", () => {
    it("returns OK status", async () => {
      const response = await app.handle(new Request("http://localhost/health"));

      expect(response.status).toBe(200);

      const data = await response.text();
      expect(data).toBe("OK");
    });
  });
});
