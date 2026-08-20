import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
import { toListResponse } from "@/shared/pagination";
import { idParams } from "@/shared/params";
import { BaseModel } from "@/shared/responses";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
})
  .get(
    "",
    ({ query }) => {
      const resolved = schemas.shows.resolveQuery(query);
      return toListResponse(repositories.shows.list(resolved), resolved);
    },
    {
      query: schemas.shows.query,
      detail: {
        description: "Get a paginated list of shows.",
      },
      response: {
        200: schemas.shows.list,
        400: BaseModel.badRequest,
      },
    },
  )
  .get("/:id", ({ params }) => notFoundIfNull(repositories.shows.byId({ id: params.id })), {
    params: idParams,
    detail: {
      description: "Get a show by ID.",
    },
    response: {
      200: schemas.shows.show,
      400: BaseModel.badRequest,
      404: BaseModel.notFound,
    },
  })
  .get(
    "/:id/episodes",
    ({ params, query }) => {
      const show = notFoundIfNull(repositories.shows.byId({ id: params.id }));
      const resolved = schemas.episodes.resolveQuery(query);

      return toListResponse(
        repositories.episodes.listByShowId({ show_id: show.id, ...resolved }),
        resolved,
      );
    },
    {
      params: idParams,
      query: schemas.episodes.query,
      detail: {
        description: "Get a paginated list of episodes for a show.",
      },
      response: {
        200: schemas.episodes.list,
        400: BaseModel.badRequest,
        404: BaseModel.notFound,
      },
    },
  );
