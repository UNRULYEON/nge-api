import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { health, studios } from "./modules";

const app = new Elysia()
  .use(staticPlugin())
  .use(
    openapi({
      documentation: {
        info: {
          title: "NGE API",
          version: "0.0.1",
        },
      },
      path: "/",
      specPath: "/openapi.json",
      scalar: {
        favicon: "public/rei-plush-favicon.svg",
      },
      exclude: {
        paths: ["/", "/public/*"],
      },
    }),
  )
  .get("/", () => "Hello Elysia")
  .use(health)
  .use(studios)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
