import { z } from "@hono/zod-openapi";

export const MovieSchema = z
  .object({
    id: z.string().openapi({
      example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    }),
    titleEnglish: z.string().openapi({
      example: "Evangelion: 1.0 You Are (Not) Alone",
    }),
    titleJapanese: z.string().openapi({
      example: "ヱヴァンゲリヲン新劇場版: 序",
    }),
    titleJapaneseLiteral: z.string().openapi({
      example: "Evangelion New Theatrical Edition: Prelude",
    }),
    titleRomaji: z.string().openapi({
      example: "Evangerion Shin Gekijōban: Jo",
    }),
    runTimeInMinutes: z.number().openapi({
      example: 98,
    }),
  })
  .openapi("Movie");
