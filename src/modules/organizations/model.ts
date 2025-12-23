import { t } from "elysia";

export namespace OrganizationsModel {
  export const organization = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    nameJapanese: t.String(),
    type: t.String(),
    description: t.String(),
  });
  export type organization = typeof organization.static;

  export const listResponse = t.Array(organization);
  export type listResponse = typeof listResponse.static;

  export const getResponse = organization;
  export type getResponse = typeof getResponse.static;
}
