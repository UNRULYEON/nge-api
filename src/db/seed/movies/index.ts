import type { PrismaClient } from "@prisma/client";
import type { Movie } from "@/types/index.ts";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const movies = async (prisma: PrismaClient) => {
  return await Promise.all(
    MOVIES.map(async ({ id, title, runTimeInMinutes }) => {
      let imageUrl: string | null = null;

      const fileName = title.english.toLowerCase().replace(" ", "-") + ".jpg";
      const path = `${import.meta.dirname}/images/${fileName}`;

      if (existsSync(path)) {
        const file = createReadStream(path);
        const { size } = statSync(path);

        const key = `production/people/${fileName}`;

        await s3Client.uploadImage({
          key,
          file,
          size,
        });

        imageUrl = `${CDN_BASE_URL}/${key}`;
      }

      return await prisma.movie.upsert({
        create: {
          id,
          titleEnglish: title.english,
          titleJapanese: title.japanese,
          titleJapaneseLiteral: title.japaneseLiteral,
          titleRomaji: title.romaji,
          runTimeInMinutes: runTimeInMinutes,
        },
        where: {
          id,
        },
        update: {
          titleEnglish: title.english,
          titleJapanese: title.japanese,
          titleJapaneseLiteral: title.japaneseLiteral,
          titleRomaji: title.romaji,
          runTimeInMinutes: runTimeInMinutes,
        },
      });
    })
  );
};

export { movies };

export const MOVIES: Movie[] = [
  {
    id: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    title: {
      english: "Evangelion: 1.0 You Are (Not) Alone",
      japanese: "ヱヴァンゲリヲン新劇場版: 序",
      japaneseLiteral: "Evangelion New Theatrical Edition: Prelude",
      romaji: "Evangerion Shin Gekijōban: Jo",
    },
    runTimeInMinutes: 98,
  },
  {
    id: "01JBWT9VX22JY7JA73C5EVWARK",
    title: {
      english: "Evangelion: 2.0 You Can (Not) Advance",
      japanese: "ヱヴァンゲリヲン新劇場版: 破",
      japaneseLiteral: "Evangelion New Theatrical Edition: Break",
      romaji: "Evangerion Shin Gekijōban: Ha",
    },
    runTimeInMinutes: 108,
  },
  {
    id: "01JBWT9VX2TY3FJX01A6566RTS",
    title: {
      english: "Evangelion: 3.0 You Can (Not) Redo",
      japanese: "ヱヴァンゲリヲン新劇場版: Q",
      japaneseLiteral: "Evangelion New Theatrical Edition: Q",
      romaji: "Evangerion Shin Gekijōban: Kyū",
    },
    runTimeInMinutes: 96,
  },
  {
    id: "01JBWT9VX26DG0XMJFTB86HXRP",
    title: {
      english: "Evangelion: 3.0+1.0 Thrice Upon a Time",
      japanese: "シン・エヴァンゲリオン劇場版:𝄂",
      japaneseLiteral: "Shin Evangelion Theatrical Edition: 𝄂",
      romaji: "Shin Evangerion Gekijōban:𝄂",
    },
    runTimeInMinutes: 155,
  },
];
