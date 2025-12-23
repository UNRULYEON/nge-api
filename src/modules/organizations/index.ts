import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { OrganizationsModel } from "./model";
import { CharactersModel } from "../characters/model";
import { EpisodesModel } from "../episodes/model";
import { BaseModel } from "@/utils/base-model";

export const organizations = new Elysia({
  prefix: "/organizations",
  tags: ["organizations"],
})
  .get(
    "/",
    () => {
      return repositories.organizations.getAll();
    },
    {
      response: {
        200: OrganizationsModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return organization;
    },
    {
      response: {
        200: OrganizationsModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.organizations.getCharacters(params.id);
    },
    {
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.organizations.getEpisodes(params.id);
    },
    {
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
