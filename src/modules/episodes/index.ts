import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { EpisodesModel } from "./model";
import { BaseModel } from "@/utils/base-model";

export const episodes = new Elysia({
  prefix: "/episodes",
  tags: ["episodes"],
})
  .get(
    "/",
    () => {
      return repositories.episodes.getAll();
    },
    {
      response: {
        200: EpisodesModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return episode;
    },
    {
      response: {
        200: EpisodesModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
