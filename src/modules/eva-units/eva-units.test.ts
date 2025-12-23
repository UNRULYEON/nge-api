import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { evaUnits } from ".";

const app = new Elysia().use(evaUnits);

describe("Eva Units", () => {
  describe("GET /eva-units", () => {
    it("returns a list of all EVA units", async () => {
      const response = await app.handle(
        new Request("http://localhost/eva-units"),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const evaUnit = data[0];
      expect(evaUnit).toHaveProperty("id");
      expect(evaUnit).toHaveProperty("name");
      expect(evaUnit).toHaveProperty("nameJapanese");
      expect(evaUnit).toHaveProperty("designation");
      expect(evaUnit).toHaveProperty("type");
      expect(evaUnit).toHaveProperty("description");
    });
  });

  describe("GET /eva-units/:id", () => {
    const validEvaUnitId = "019b4966-ecc6-7001-af53-7e7c9bcb93aa"; // Unit-01

    it("returns an EVA unit by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${validEvaUnitId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validEvaUnitId);
      expect(data.name).toBe("Evangelion Unit-01");
      expect(data.designation).toBe("EVA-01");
    });

    it("returns 404 for non-existent EVA unit", async () => {
      const nonExistentId = "019b4966-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /eva-units/:id/pilots", () => {
    const validEvaUnitId = "019b4966-ecc6-7001-af53-7e7c9bcb93aa"; // Unit-01

    it("returns pilots for an EVA unit", async () => {
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${validEvaUnitId}/pilots`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it("returns 404 for non-existent EVA unit", async () => {
      const nonExistentId = "019b4966-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${nonExistentId}/pilots`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /eva-units/:id/soul", () => {
    const validEvaUnitId = "019b4966-ecc6-7001-af53-7e7c9bcb93aa"; // Unit-01 (has Yui's soul)

    it("returns the soul for an EVA unit that has one", async () => {
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${validEvaUnitId}/soul`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name");
      expect(data.name).toBe("Yui Ikari");
    });

    it("returns 404 for EVA unit without a soul", async () => {
      const unitWithoutSoul = "019b4966-ecc6-7000-968f-386c0db53e65"; // Unit-00
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${unitWithoutSoul}/soul`),
      );

      expect(response.status).toBe(404);
    });

    it("returns 404 for non-existent EVA unit", async () => {
      const nonExistentId = "019b4966-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${nonExistentId}/soul`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /eva-units/:id/episodes", () => {
    const validEvaUnitId = "019b4966-ecc6-7001-af53-7e7c9bcb93aa"; // Unit-01

    it("returns episodes for an EVA unit", async () => {
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${validEvaUnitId}/episodes`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent EVA unit", async () => {
      const nonExistentId = "019b4966-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${nonExistentId}/episodes`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /eva-units/:id/movies", () => {
    const validEvaUnitId = "019b4966-ecc6-7001-af53-7e7c9bcb93aa"; // Unit-01

    it("returns movies for an EVA unit", async () => {
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${validEvaUnitId}/movies`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent EVA unit", async () => {
      const nonExistentId = "019b4966-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/eva-units/${nonExistentId}/movies`),
      );

      expect(response.status).toBe(404);
    });
  });
});
