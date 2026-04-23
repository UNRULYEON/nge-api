import { Elysia } from "elysia";

import { modules } from "./modules";

export const v1 = new Elysia({
  prefix: "/v1",
  normalize: true,
})
  .headers({
    "x-powered-by": "your-mom",
  })
  .use(modules.health);

const app = new Elysia().use(v1).listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
