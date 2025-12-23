import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { OrganizationsModel } from "./model";
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
  );
