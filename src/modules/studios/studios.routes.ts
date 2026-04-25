import { Elysia } from "elysia";

import { repositories } from "@/repository";
import { schemas } from "@/schemas";
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
  .get(
    "/:id",
    ({ params, status }) => {
      const show = repositories.studios.byId({ id: params.id });

      if (!show) return status(404, "NOT_FOUND");

      return show;
    },
    {
      detail: {
        description: "Get a studio by ID.",
      },
      response: {
        200: schemas.studios.studio,
        404: BaseModel.notFound,
      },
    },
  );
