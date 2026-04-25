import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { BaseModel } from "@/shared/responses";

export const studios = new Elysia({
  prefix: "/studios",
  tags: ["studios"],
})
  .get("/", () => repositories.studios.all(), {
    detail: {
      description: "Get a list of all studios.",
    },
    response: {
      200: schemas.studios.list,
    },
  })
  .get(
    "/:id",
    ({ params, status }) => {
      const studio = repositories.studios.byId({ id: params.id });

      if (!studio) return status(404, "NOT_FOUND");

      return studio;
    },
    {
      detail: {
        description: "Get a studio by ID.",
      },
      response: {
        200: schemas.studios.studio,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/shows",
    ({ params, status }) => {
      const studio = repositories.studios.byId({ id: params.id });

      if (!studio) return status(404, "NOT_FOUND");

      const shows = repositories.shows.byStudioId({ studio_id: studio.id });

      return shows;
    },
    {
      detail: {
        description: "Get the shows of a studio by the studio's ID.",
      },
      response: {
        200: schemas.shows.list,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/movies",
    ({ params, status }) => {
      const studio = repositories.studios.byId({ id: params.id });

      if (!studio) return status(404, "NOT_FOUND");

      const movies = repositories.movies.byStudioId({ studio_id: studio.id });

      return movies;
    },
    {
      detail: {
        description: "Get the movies of a studio by the studio's ID.",
      },
      response: {
        200: schemas.movies.list,
        404: BaseModel.notFound,
      },
    },
  )
