import { z } from "@hono/zod-openapi";

export const PersonSchema = z
  .object({
    id: z.string().openapi({
      example: "01J8WYGT621JTJRF0TZYZY8EFP",
    }),
    name: z.string().openapi({
      example: "Hideaki Anno",
    }),
    imageUrl: z.string().nullable().openapi({
      example:
        "https://https://nge-api.ams3.cdn.digitaloceanspaces.com/production/people/first-name-last-name.jpg",
    }),
  })
  .openapi("Person");

export type PersonSchema = z.infer<typeof PersonSchema>;
