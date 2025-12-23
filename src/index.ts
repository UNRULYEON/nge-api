import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { rateLimit } from "elysia-rate-limit";
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
  .use(
    rateLimit({
      max: 1000,
    }),
  )
  .use(staticPlugin())
  .use(
    openapi({
      documentation: {
        info: {
          title: "NGE API",
          version: "0.0.1",
          description: "An API for the Neon Genesis Evangelion franchise.",
          contact: {
            name: "Amar Kisoensingh",
            email: "amar@kisoensingh.sh",
            url: "https://amar.sh",
          },
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
