import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { MovieSchema, PersonSchema } from "@/schemas";
import { repositories } from "@/repositories";

const base = createRoute({
  tags: ["Movies"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: MovieSchema.array(),
        },
      },
      description: "Returns details of all movies",
    },
  },
});

const id = createRoute({
  tags: ["Movies"],
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: MovieSchema,
        },
      },
      description: "Returns details of a movie",
    },
    404: {
      description: "Movie not found",
    },
  },
});

const directors = createRoute({
  tags: ["Movies"],
  method: "get",
  path: "/{id}/directors",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PersonSchema.array(),
        },
      },
      description: "Returns directores of a specific movie",
    },
    404: {
      description: "Movie not found",
    },
  },
});

const routes = {
  base,
  id: {
    base: id,
    directors,
  },
};

const movie = new OpenAPIHono();

movie.openapi(routes.base, async (c) => {
  const movies = await repositories.movies.get.all();

  return c.json(movies);
});

movie.openapi(routes.id.base, async (c) => {
  const id = c.req.param("id");

  const movie = await repositories.movies.get.byId(id);

  if (!movie) {
    throw new HTTPException(404, { message: "Movie not found" });
  }

  return c.json(movie);
});

movie.openapi(routes.id.directors, async (c) => {
  const id = c.req.param("id");

  const directors = await repositories.movies.get.byDirector(id);

  if (!directors) {
    throw new HTTPException(404, { message: "Movie not found" });
  }

  return c.json(directors);
});

export default movie;
