import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import {
  angels,
  characters,
  episodes,
  evaUnits,
  health,
  movies,
  organizations,
  shows,
  staff,
  studios,
} from "./modules";
import serverTiming from "@elysiajs/server-timing";

const app = new Elysia()
  .headers({
    "X-Powered-By": "your-mom",
  })
  .use(serverTiming())
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
  .use(angels)
  .use(characters)
  .use(episodes)
  .use(evaUnits)
  .use(health)
  .use(movies)
  .use(organizations)
  .use(shows)
  .use(staff)
  .use(studios)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
