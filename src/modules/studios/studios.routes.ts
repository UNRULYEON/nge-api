import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
import { toListResponse } from "@/shared/pagination";
import { idParams } from "@/shared/params";
import { BaseModel } from "@/shared/responses";

export const studios = new Elysia({
  prefix: "/studios",
  tags: ["studios"],
})
  .get(
    "",
    ({ query }) => {
      const resolved = schemas.studios.resolveQuery(query);
      return toListResponse(repositories.studios.list(resolved), resolved);
    },
    {
      query: schemas.studios.query,
      detail: {
        description: "Get a paginated list of studios.",
      },
      response: {
        200: schemas.studios.list,
        400: BaseModel.badRequest,
      },
    },
  )
  .get("/:id", ({ params }) => notFoundIfNull(repositories.studios.byId({ id: params.id })), {
    params: idParams,
    detail: {
      description: "Get a studio by ID.",
    },
    response: {
      200: schemas.studios.studio,
      400: BaseModel.badRequest,
      404: BaseModel.notFound,
    },
  })
  .get(
    "/:id/shows",
    ({ params, query }) => {
      const studio = notFoundIfNull(repositories.studios.byId({ id: params.id }));
      const resolved = schemas.shows.resolveQuery(query);

      return toListResponse(
        repositories.shows.listByStudioId({ studio_id: studio.id, ...resolved }),
        resolved,
      );
    },
    {
      params: idParams,
      query: schemas.shows.query,
      detail: {
        description: "Get a paginated list of shows for a studio.",
      },
      response: {
        200: schemas.shows.list,
        400: BaseModel.badRequest,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/movies",
    ({ params, query }) => {
      const studio = notFoundIfNull(repositories.studios.byId({ id: params.id }));
      const resolved = schemas.movies.resolveQuery(query);

      return toListResponse(
        repositories.movies.listByStudioId({ studio_id: studio.id, ...resolved }),
        resolved,
      );
    },
    {
      params: idParams,
      query: schemas.movies.query,
      detail: {
        description: "Get a paginated list of movies for a studio.",
      },
      response: {
        200: schemas.movies.list,
        400: BaseModel.badRequest,
        404: BaseModel.notFound,
      },
    },
  );
