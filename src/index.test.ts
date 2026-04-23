import { describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

const { v1 } = await import("@/index");

const app = new Elysia().use(v1.get("/test", () => "ok"));

describe("v1", () => {
  it("returns expected headers", async () => {
    const response = await app.handle(new Request("http://localhost/v1/test"));

    expect(response.headers.toJSON()).toMatchObject({
      "x-powered-by": "your-mom",
    });
  });
});
