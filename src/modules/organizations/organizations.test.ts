import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { organizations } from ".";

const app = new Elysia().use(organizations);

describe("Organizations", () => {
  describe("GET /organizations", () => {
    it("returns a list of all organizations", async () => {
      const response = await app.handle(
        new Request("http://localhost/organizations"),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const organization = data[0];
      expect(organization).toHaveProperty("id");
      expect(organization).toHaveProperty("name");
      expect(organization).toHaveProperty("nameJapanese");
      expect(organization).toHaveProperty("type");
      expect(organization).toHaveProperty("description");
    });
  });

  describe("GET /organizations/:id", () => {
    const validOrganizationId = "019b4926-f52e-7000-864f-ce83257c95b2"; // NERV

    it("returns an organization by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/organizations/${validOrganizationId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validOrganizationId);
      expect(data.name).toBe("NERV");
      expect(data.nameJapanese).toBe("ネルフ");
    });

    it("returns 404 for non-existent organization", async () => {
      const nonExistentId = "019b4926-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/organizations/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /organizations/:id/characters", () => {
    const validOrganizationId = "019b4926-f52e-7000-864f-ce83257c95b2"; // NERV

    it("returns characters for an organization", async () => {
      const response = await app.handle(
        new Request(
          `http://localhost/organizations/${validOrganizationId}/characters`,
        ),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent organization", async () => {
      const nonExistentId = "019b4926-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/organizations/${nonExistentId}/characters`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /organizations/:id/episodes", () => {
    const validOrganizationId = "019b4926-f52e-7000-864f-ce83257c95b2"; // NERV

    it("returns episodes for an organization", async () => {
      const response = await app.handle(
        new Request(
          `http://localhost/organizations/${validOrganizationId}/episodes`,
        ),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent organization", async () => {
      const nonExistentId = "019b4926-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/organizations/${nonExistentId}/episodes`),
      );

      expect(response.status).toBe(404);
    });
  });
});
