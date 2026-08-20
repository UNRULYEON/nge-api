import { Elysia } from "elysia";

import { migrate } from "@/db/migrate";
import { seed } from "@/db/seed";
import { modules } from "@/modules";
import { plugins } from "@/plugins";

import favicon from "../public/favicon.svg" with { type: "file" };

migrate();
await seed();

const v1 = new Elysia({
  prefix: "/v1",
  normalize: true,
})
  .use(modules.studios)
  .use(modules.movies)
  .use(modules.shows)
  .use(modules.episodes)
  .use(modules.mcp);

export const base = new Elysia()
  .headers({
    "x-powered-by": "your-mom",
  })
  .get("/public/favicon.svg", () => Bun.file(favicon))
  .use(modules.docs)
  .use(plugins.openapi)
  .use(modules.health)
  .use(v1);

export const app = base.listen({
  port: Number(process.env.PORT ?? 3000),
  hostname: "0.0.0.0",
});

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
