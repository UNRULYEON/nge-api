import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
import { toListResponse } from "@/shared/pagination";
import { idParams } from "@/shared/params";
import { BaseModel } from "@/shared/responses";

export const movies = new Elysia({
  prefix: "/movies",
  tags: ["movies"],
})
  .get(
    "",
    ({ query }) => {
      const resolved = schemas.movies.resolveQuery(query);
      return toListResponse(repositories.movies.list(resolved), resolved);
    },
    {
      query: schemas.movies.query,
      detail: {
        description: "Get a paginated list of movies.",
      },
      response: {
        200: schemas.movies.list,
        400: BaseModel.badRequest,
      },
    },
  )
  .get("/:id", ({ params }) => notFoundIfNull(repositories.movies.byId({ id: params.id })), {
    params: idParams,
    detail: {
      description: "Get a movie by ID.",
    },
    response: {
      200: schemas.movies.movie,
      400: BaseModel.badRequest,
      404: BaseModel.notFound,
    },
  });
