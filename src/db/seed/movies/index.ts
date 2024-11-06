import type { PrismaClient } from "@prisma/client";
import type { Movie } from "@/types/index.ts";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const movies = async (prisma: PrismaClient) => {
  console.log(`Seeding ${MOVIES.length} movies`);

  return await Promise.all(
    MOVIES.map(async ({ id, title, runTimeInMinutes }) => {
      let imageUrl: string | null = null;

      const fileName =
        title.english
          .toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(":", "")
          .replaceAll(".", "-")
          .replaceAll("+", "-")
          .replaceAll("&", "and") + ".jpg";
      const path = `${import.meta.dirname}/images/${fileName}`;

      if (existsSync(path)) {
        const file = createReadStream(path);
        const { size } = statSync(path);

        const key = `production/movies/${fileName}`;

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
          imageUrl,
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
          imageUrl,
          runTimeInMinutes: runTimeInMinutes,
        },
      });
    })
  );
};

export { movies };

export const MOVIES: Movie[] = [
  {
    id: "01JC1J71A6TDCBKCJ544DQ9WBW",
    title: {
      english: "Neon Genesis Evangelion: Death & Rebirth",
      japanese: "新世紀エヴァンゲリオン 劇場版 シト新生",
      japaneseLiteral: null,
      romaji: "Shin Seiki Evangerion Gekijō-ban: Shi to Shinsei",
    },
    imageUrl: null,
    runTimeInMinutes: 115,
  },
  {
    id: "01JC1J71A772HH3F7PF14Z8DZ8",
    title: {
      english: "The End of Evangelion",
      japanese: "新世紀エヴァンゲリオン劇場版 Air/まごころを、君に",
      japaneseLiteral:
        "New Century Evangelion Theatrical Edition: Air/Sincerely Yours",
      romaji: "Shin Seiki Evangerion Gekijō-ban: Air/Magokoro o, Kimi ni",
    },
    imageUrl: null,
    runTimeInMinutes: 87,
  },
  {
    id: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    title: {
      english: "Evangelion: 1.0 You Are (Not) Alone",
      japanese: "ヱヴァンゲリヲン新劇場版: 序",
      japaneseLiteral: "Evangelion New Theatrical Edition: Prelude",
      romaji: "Evangerion Shin Gekijōban: Jo",
    },
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
    runTimeInMinutes: 155,
  },
];
