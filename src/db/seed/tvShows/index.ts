import type { PrismaClient } from "@prisma/client";
import type { TVShow } from "@/types";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const tvShows = async (prisma: PrismaClient) => {
  console.log(`Seeding ${TV_SHOWS.length} TV shows`);

  return await Promise.all(
    TV_SHOWS.map(async ({ id, title }) => {
      let imageUrl: string | null = null;

      const fileName =
        title.english.toLowerCase().replaceAll(" ", "-") + ".jpg";
      const path = `${import.meta.dirname}/images/${fileName}`;

      if (existsSync(path)) {
        const file = createReadStream(path);
        const { size } = statSync(path);

        const key = `production/tv-shows/${fileName}`;

        await s3Client.uploadImage({
          key,
          file,
          size,
        });

        imageUrl = `${CDN_BASE_URL}/${key}`;
      }

      return await prisma.tVShow.upsert({
        create: {
          id,
          titleEnglish: title.english,
          titleJapanese: title.japanese,
          titleJapaneseLiteral: title.japaneseLiteral,
          titleRomaji: title.romaji,
          imageUrl,
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
        },
      });
    })
  );
};

export { tvShows };

export const TV_SHOWS: TVShow[] = [
  {
    id: "01JD5VYX4CP94HVVRZ31VH3111",
    title: {
      english: "Neon Genesis Evangelion",
      japanese: "新世紀エヴァンゲリオン",
      japaneseLiteral: "New Century Evangelion",
      romaji: "Shinseiki Evangerion",
    },
    imageUrl: null,
  },
];
