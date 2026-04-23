import { Elysia } from "elysia";

import { BaseModel } from "@/shared/responses";

import { repository } from "./shows.repository";
import { ShowsModel } from "./shows.schema";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
})
  .get("/", () => repository.all(), {
    detail: {
      description: "Get a list of all shows.",
    },
    response: {
      200: ShowsModel.list,
    },
  })
  .get(
    "/:id",
    ({ params, status }) => {
      const show = repository.byId({ id: params.id });

      if (!show) return status(404, "NOT_FOUND");

      return show;
    },
    {
      detail: {
        description: "Get a show by ID.",
      },
      response: {
        200: ShowsModel.show,
        404: BaseModel.notFound,
      },
    },
  );
