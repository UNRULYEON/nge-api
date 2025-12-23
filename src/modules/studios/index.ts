import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { StudiosModel } from "./model";
import { BaseModel } from "@/utils/base-model";

export const studios = new Elysia({
  prefix: "/studios",
  tags: ["studios"],
})
  .get(
    "/",
    () => {
      return repositories.studios.getAll();
    },
    {
      response: {
        200: StudiosModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const studio = repositories.studios.getById(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return studio;
    },
    {
      response: {
        200: StudiosModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  );
