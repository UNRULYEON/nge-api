import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { BaseModel } from "@/shared/responses";

export const movies = new Elysia({
  prefix: "/movies",
  tags: ["movies"],
})
  .get("/", () => repositories.movies.all(), {
    detail: {
      description: "Get a list of all movies.",
    },
    response: {
      200: schemas.movies.list,
    },
  })
  .get(
    "/:id",
    ({ params, status }) => {
      const movie = repositories.movies.byId({ id: params.id });

      if (!movie) return status(404, "NOT_FOUND");

      return movie;
    },
    {
      detail: {
        description: "Get a movie by ID.",
      },
      response: {
        200: schemas.movies.movie,
        404: BaseModel.notFound,
      },
    },
  )
