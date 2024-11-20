import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";
import { repositories } from "@/repositories";
import { HTTPException } from "hono/http-exception";

const tvShow = new OpenAPIHono();

tvShow.openapi(routes.base, async (c) => {
  const tvShows = await repositories.tvShows.get.all();

  return c.json(tvShows);
});

tvShow.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const tvShow = await repositories.tvShows.get.byId({ id });

  if (!tvShow) {
    throw new HTTPException(404, { message: "TV show not found" });
  }

  return c.json(tvShow);
});

export default tvShow;
