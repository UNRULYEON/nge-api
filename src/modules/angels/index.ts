import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { AngelsModel } from "./model";
import { EpisodesModel } from "../episodes/model";
import { BaseModel } from "@/utils/base-model";

export const angels = new Elysia({
  prefix: "/angels",
  tags: ["angels"],
})
  .get(
    "/",
    () => {
      return repositories.angels.getAll();
    },
    {
      response: {
        200: AngelsModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const angel = repositories.angels.getById(params.id);

      if (!angel) {
        throw new NotFoundError("NOT_FOUND");
      }

      return angel;
    },
    {
      response: {
        200: AngelsModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const angel = repositories.angels.getById(params.id);

      if (!angel) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.angels.getEpisodes(params.id);
    },
    {
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  );
