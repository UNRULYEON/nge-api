import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { StudiosModel } from "../studios/model";
import { StaffModel } from "./model";

export const staff = new Elysia({
  prefix: "/staff",
  tags: ["staff"],
})
  .get(
    "/",
    () => {
      return repositories.staff.getAll();
    },
    {
      detail: {
        description: "Get a list of all staff members.",
      },
      response: {
        200: StaffModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const member = repositories.staff.getById(params.id);

      if (!member) {
        throw new NotFoundError("NOT_FOUND");
      }

      return member;
    },
    {
      detail: {
        description: "Get a staff member by ID.",
      },
      response: {
        200: StaffModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/studios",
    ({ params }) => {
      const member = repositories.staff.getById(params.id);

      if (!member) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.staff.getStudios(params.id);
    },
    {
      detail: {
        description: "Get a list of studios for a staff member.",
      },
      response: {
        200: StudiosModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
