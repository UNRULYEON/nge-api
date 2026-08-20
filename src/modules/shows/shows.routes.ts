import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
import { notFoundIfNull } from "@/shared/not-found";
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
  .get("/:id", ({ params }) => notFoundIfNull(repositories.shows.byId({ id: params.id })), {
    detail: {
      description: "Get a show by ID.",
    },
    response: {
      200: schemas.shows.show,
      404: BaseModel.notFound,
    },
  })
  .get(
    "/:id/episodes",
    ({ params }) => {
      const show = notFoundIfNull(repositories.shows.byId({ id: params.id }));

      return repositories.episodes.byShowId({ show_id: show.id });
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
