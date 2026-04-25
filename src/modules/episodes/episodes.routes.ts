import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { BaseModel } from "@/shared/responses";

export const episodes = new Elysia({
  prefix: "/episodes",
  tags: ["episodes"],
})
  .get("/", () => repositories.episodes.all(), {
    detail: {
      description: "Get a list of all episodes.",
    },
    response: {
      200: schemas.episodes.list,
    },
  })
  .get(
    "/:id",
    ({ params, status }) => {
      const episode = repositories.episodes.byId({ id: params.id });

      if (!episode) return status(404, "NOT_FOUND");

      return episode;
    },
    {
      detail: {
        description: "Get an episode by ID.",
      },
      response: {
        200: schemas.episodes.episode,
        404: BaseModel.notFound,
      },
    },
  );
