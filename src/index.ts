import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { migrate } from "@/db/migrate";
import { seed } from "@/db/seed";
import { modules } from "@/modules";
import { plugins } from "@/plugins";

migrate();
await seed();

const v1 = new Elysia({
  prefix: "/v1",
  normalize: true,
})
  .use(modules.health)
  .use(modules.studios)
  .use(modules.movies)
  .use(modules.shows)
  .use(modules.episodes);

export const base = new Elysia()
  .headers({
    "x-powered-by": "your-mom",
  })
  .use(staticPlugin())
  .use(plugins.openapi)
  .use(v1);

export const app = base.listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
