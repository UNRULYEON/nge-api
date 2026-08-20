import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
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
  .get("/:id", ({ params }) => notFoundIfNull(repositories.studios.byId({ id: params.id })), {
    detail: {
      description: "Get a studio by ID.",
    },
    response: {
      200: schemas.studios.studio,
      404: BaseModel.notFound,
    },
  })
  .get(
    "/:id/shows",
    ({ params }) => {
      const studio = notFoundIfNull(repositories.studios.byId({ id: params.id }));

      return repositories.shows.byStudioId({ studio_id: studio.id });
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
    ({ params }) => {
      const studio = notFoundIfNull(repositories.studios.byId({ id: params.id }));

      return repositories.movies.byStudioId({ studio_id: studio.id });
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
  );
