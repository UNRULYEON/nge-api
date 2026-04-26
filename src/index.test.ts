import { describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { base } from "@/index";

const app = new Elysia().use(base.get("/test", () => "ok"));

describe("v1", () => {
  it("returns expected headers", async () => {
    const response = await app.handle(new Request("http://localhost/test"));

    expect(response.headers.toJSON()).toMatchObject({
      "x-powered-by": "your-mom",
    });
  });
});
