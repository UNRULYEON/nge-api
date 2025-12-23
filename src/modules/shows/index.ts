import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { ShowsModel } from "./model";
import { BaseModel } from "@/utils/base-model";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
})
  .get(
    "/",
    () => {
      return repositories.shows.getAll();
    },
    {
      response: {
        200: ShowsModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const show = repositories.shows.getById(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return show;
    },
    {
      response: {
        200: ShowsModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
