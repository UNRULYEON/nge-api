import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { staff } from ".";

const app = new Elysia().use(staff);

describe("Staff", () => {
  describe("GET /staff", () => {
    it("returns a list of all staff members", async () => {
      const response = await app.handle(new Request("http://localhost/staff"));

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const member = data[0];
      expect(member).toHaveProperty("id");
      expect(member).toHaveProperty("name");
      expect(member).toHaveProperty("nameJapanese");
      expect(member).toHaveProperty("role");
      expect(member).toHaveProperty("bio");
    });
  });

  describe("GET /staff/:id", () => {
    const validStaffId = "019b4ba4-16c8-7000-aa9b-7379f799e904"; // Anno

    it("returns a staff member by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/staff/${validStaffId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validStaffId);
      expect(data.name).toBe("Hideaki Anno");
      expect(data.nameJapanese).toBe("庵野秀明");
    });

    it("returns 404 for non-existent staff member", async () => {
      const nonExistentId = "019b4ba4-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/staff/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /staff/:id/studios", () => {
    const validStaffId = "019b4ba4-16c8-7000-aa9b-7379f799e904"; // Anno

    it("returns studios for a staff member", async () => {
      const response = await app.handle(
        new Request(`http://localhost/staff/${validStaffId}/studios`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent staff member", async () => {
      const nonExistentId = "019b4ba4-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/staff/${nonExistentId}/studios`),
      );

      expect(response.status).toBe(404);
    });
  });
});
