import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { migrate } from "@/db/migrate";
import { seed } from "@/db/seed";
import { modules } from "@/modules";
import { plugins } from "@/plugins";

migrate();
await seed();

export const v1 = new Elysia({
  prefix: "/v1",
  normalize: true,
})
  .headers({
    "x-powered-by": "your-mom",
  })
  .use(staticPlugin())
  .use(plugins.openapi)
  .use(modules.health)
  .use(modules.shows);

const app = new Elysia().use(v1).listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
