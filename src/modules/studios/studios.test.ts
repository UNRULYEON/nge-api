import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { studios } from ".";

const app = new Elysia().use(studios);

describe("Studios", () => {
  describe("GET /studios", () => {
    it("returns a list of all studios", async () => {
      const response = await app.handle(
        new Request("http://localhost/studios"),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const studio = data[0];
      expect(studio).toHaveProperty("id");
      expect(studio).toHaveProperty("name");
      expect(studio).toHaveProperty("founded");
      expect(studio).toHaveProperty("location");
    });
  });

  describe("GET /studios/:id", () => {
    const validStudioId = "019b48ba-eac5-7000-85c0-3ef877607b73"; // Gainax

    it("returns a studio by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${validStudioId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validStudioId);
      expect(data.name).toBe("Gainax");
      expect(data.founded).toBe(1984);
    });

    it("returns 404 for non-existent studio", async () => {
      const nonExistentId = "019b48ba-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/studios/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /studios/:id/shows", () => {
    const validStudioId = "019b48ba-eac5-7000-85c0-3ef877607b73"; // Gainax

    it("returns shows for a studio", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${validStudioId}/shows`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent studio", async () => {
      const nonExistentId = "019b48ba-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/studios/${nonExistentId}/shows`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /studios/:id/movies", () => {
    const validStudioId = "019b48ba-eac5-7000-85c0-3ef877607b73"; // Gainax

    it("returns movies for a studio", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${validStudioId}/movies`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent studio", async () => {
      const nonExistentId = "019b48ba-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/studios/${nonExistentId}/movies`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /studios/:id/staff", () => {
    const validStudioId = "019b48ba-eac5-7000-85c0-3ef877607b73"; // Gainax

    it("returns staff for a studio", async () => {
      const response = await app.handle(
        new Request(`http://localhost/studios/${validStudioId}/staff`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent studio", async () => {
      const nonExistentId = "019b48ba-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/studios/${nonExistentId}/staff`),
      );

      expect(response.status).toBe(404);
    });
  });
});
