import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { EpisodesModel } from "./model";
import { CharactersModel } from "../characters/model";
import { AngelsModel } from "../angels/model";
import { OrganizationsModel } from "../organizations/model";
import { ShowsModel } from "../shows/model";
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
      detail: {
        description: "Get a list of all episodes.",
      },
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
      detail: {
        description: "Get an episode by ID.",
      },
      response: {
        200: EpisodesModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getCharacters(params.id);
    },
    {
      detail: {
        description: "Get a list of characters for an episode.",
      },
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/angels",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getAngels(params.id);
    },
    {
      detail: {
        description: "Get a list of angels for an episode.",
      },
      response: {
        200: AngelsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/organizations",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getOrganizations(params.id);
    },
    {
      detail: {
        description: "Get a list of organizations for an episode.",
      },
      response: {
        200: OrganizationsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/show",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      const show = repositories.episodes.getShow(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return show;
    },
    {
      detail: {
        description: "Get the show for an episode.",
      },
      response: {
        200: ShowsModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
