import { Elysia } from "elysia";

import { BaseModel } from "@/shared/responses";

import { repository } from "./studios.repository";
import { StudiosModel } from "./studios.schema";

export const studios = new Elysia({
  prefix: "/studios",
  tags: ["studios"],
})
  .get("/", () => repository.all(), {
    detail: {
      description: "Get a list of all studios.",
    },
    response: {
      200: StudiosModel.list,
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
        description: "Get a studio by ID.",
      },
      response: {
        200: StudiosModel.studio,
        404: BaseModel.notFound,
      },
    },
  );
