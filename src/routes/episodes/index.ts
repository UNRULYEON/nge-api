import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";
import { sortEpisodes } from "@/utils";
import { routes } from "./routes";
import { repositories } from "@/repositories";

const episode = new OpenAPIHono();

episode.openapi(routes.base, async (c) => {
  const episodes = await repositories.episodes.get.all();

  return c.json(sortEpisodes(episodes));
});

episode.openapi(routes.id.base, async (c) => {
  const id = c.req.param("id");

  const episode = await repositories.episodes.get.byId({ id });

  if (!episode) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(episode);
});

episode.openapi(routes.id.writers, async (c) => {
  const id = c.req.param("id");

  const writers = await repositories.episodes.get.writers({ id });

  if (!writers) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(writers);
});

episode.openapi(routes.id.directors, async (c) => {
  const id = c.req.param("id");

  const directors = repositories.episodes.get.directors({ id });

  if (!directors) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(directors);
});

export default episode;
