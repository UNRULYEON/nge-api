import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

const router = new Router();

router.get("/hello-world", (ctx) => {
  ctx.response.body = "hello, world";
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
