import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";
import { repositories } from "@/repositories";
import { HTTPException } from "hono/http-exception";

const people = new OpenAPIHono();

people.openapi(routes.base, async (c) => {
  const people = await repositories.person.get.all();

  return c.json(people);
});

people.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const person = await repositories.person.get.byId({ id });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json(person);
});

people.openapi(routes.written, async (c) => {
  const id = c.req.param("id");

  const written = await repositories.person.get.written({ id });

  if (!written) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json({
    episodes: written.episodes,
    movies: written.movies,
  });
});

people.openapi(routes.directed, async (c) => {
  const id = c.req.param("id");

  const directed = await repositories.person.get.directed({ id });

  if (!directed) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json({
    episodes: directed.episodes,
    movies: directed.movies,
  });
});

export default people;
