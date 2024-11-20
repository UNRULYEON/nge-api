import { prisma } from "@/db";
import type { TVShowSchema } from "@/schemas";

const all = async (): Promise<TVShowSchema[]> => {
  const tvShows = await prisma.tVShow.findMany({
    select: {
      id: true,
      titleEnglish: true,
      titleJapanese: true,
      titleJapaneseLiteral: true,
      titleRomaji: true,
      imageUrl: true,
    },
  });

  return tvShows;
};

const byId = async ({ id }: { id: string }): Promise<TVShowSchema | null> => {
  const tvShow = await prisma.tVShow.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      titleEnglish: true,
      titleJapanese: true,
      titleJapaneseLiteral: true,
      titleRomaji: true,
      imageUrl: true,
    },
  });

  return tvShow;
};

const tvShowsRepository = {
  get: {
    all,
    byId,
  },
};

export { tvShowsRepository };
