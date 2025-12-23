import { t } from "elysia";

export namespace EvaUnitsModel {
  export const evaUnit = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    nameJapanese: t.String(),
    designation: t.String(),
    type: t.String(),
    description: t.String(),
  });
  export type evaUnit = typeof evaUnit.static;

  export const listResponse = t.Array(evaUnit);
  export type listResponse = typeof listResponse.static;

  export const getResponse = evaUnit;
  export type getResponse = typeof getResponse.static;
}
