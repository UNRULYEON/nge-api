import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { routers } from "@/routes/index.ts";

export const router = new Router();

router.get("/hello-world", (ctx) => {
  ctx.response.body = "hello, world";
});

const app = new Application();

routers.forEach((r) => {
  app.use(r.routes());
  app.use(r.allowedMethods());
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });

console.log("Server listening on http://localhost:8080");
