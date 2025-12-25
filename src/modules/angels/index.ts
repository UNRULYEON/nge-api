import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { EpisodesModel } from "../episodes/model";
import { AngelsModel } from "./model";

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
      detail: {
        description: "Get a list of all angels.",
      },
      response: {
        200: AngelsModel.listResponse,
      },
    },
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
      detail: {
        description: "Get an angel by ID.",
      },
      response: {
        200: AngelsModel.getResponse,
        404: BaseModel.notFound,
      },
    },
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
      detail: {
        description: "Get a list of episodes for an angel.",
      },
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
