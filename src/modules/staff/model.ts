import { t } from "elysia";

export namespace StaffModel {
  export const staff = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    nameJapanese: t.String(),
    role: t.String(),
    bio: t.String(),
  });
  export type staff = typeof staff.static;

  export const listResponse = t.Array(staff);
  export type listResponse = typeof listResponse.static;

  export const getResponse = staff;
  export type getResponse = typeof getResponse.static;
}
