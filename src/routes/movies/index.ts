import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { repositories } from "@/repositories";
import { routes } from "./routes";

const movie = new OpenAPIHono();

movie.openapi(routes.base, async (c) => {
  const movies = await repositories.movies.get.all();

  return c.json(movies);
});

movie.openapi(routes.id.base, async (c) => {
  const id = c.req.param("id");

  const movie = await repositories.movies.get.byId({ id });

  if (!movie) {
    throw new HTTPException(404, { message: "Movie not found" });
  }

  return c.json(movie);
});

movie.openapi(routes.id.directors, async (c) => {
  const id = c.req.param("id");

  const directors = await repositories.movies.get.byDirector({ id });

  if (!directors) {
    throw new HTTPException(404, { message: "Movie not found" });
  }

  return c.json(directors);
});

export default movie;
