import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
import { toListResponse } from "@/shared/pagination";
import { idParams } from "@/shared/params";
import { BaseModel } from "@/shared/responses";

export const episodes = new Elysia({
  prefix: "/episodes",
  tags: ["episodes"],
})
  .get(
    "",
    ({ query }) => {
      const resolved = schemas.episodes.resolveQuery(query);
      return toListResponse(repositories.episodes.list(resolved), resolved);
    },
    {
      query: schemas.episodes.query,
      detail: {
        description: "Get a paginated list of episodes.",
      },
      response: {
        200: schemas.episodes.list,
        400: BaseModel.badRequest,
      },
    },
  )
  .get("/:id", ({ params }) => notFoundIfNull(repositories.episodes.byId({ id: params.id })), {
    params: idParams,
    detail: {
      description: "Get an episode by ID.",
    },
    response: {
      200: schemas.episodes.episode,
      400: BaseModel.badRequest,
      404: BaseModel.notFound,
    },
  });
