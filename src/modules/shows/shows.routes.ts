import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { BaseModel } from "@/shared/responses";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
})
  .get("/", () => repositories.shows.all(), {
    detail: {
      description: "Get a list of all shows.",
    },
    response: {
      200: schemas.shows.list,
    },
  })
  .get(
    "/:id",
    ({ params, status }) => {
      const show = repositories.shows.byId({ id: params.id });

      if (!show) return status(404, "NOT_FOUND");

      return show;
    },
    {
      detail: {
        description: "Get a show by ID.",
      },
      response: {
        200: schemas.shows.show,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/episodes",
    ({ params, status }) => {
      const show = repositories.shows.byId({ id: params.id });

      if (!show) return status(404, "NOT_FOUND");

      const episodes = repositories.episodes.byShowId({ show_id: show.id });

      return episodes;
    },
    {
      detail: {
        description: "Get the episodes of a show by the show's ID.",
      },
      response: {
        200: schemas.episodes.list,
        404: BaseModel.notFound,
      },
    },
  );
