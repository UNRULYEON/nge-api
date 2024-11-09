import { prisma } from "@/db";
import type { EpisodeSchema, PersonSchema } from "@/schemas";

const all = async (): Promise<EpisodeSchema[]> => {
  const episodes = await prisma.episode.findMany({
    select: {
      id: true,
      number: true,
      titleEnglish: true,
      titleJapanese: true,
      titleRomaji: true,
    },
  });

  return episodes;
};

const byId = async ({ id }: { id: string }): Promise<EpisodeSchema | null> => {
  const episode = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      number: true,
      titleEnglish: true,
      titleJapanese: true,
      titleRomaji: true,
    },
  });

  return episode;
};

const writers = async ({
  id,
}: {
  id: string;
}): Promise<PersonSchema[] | null> => {
  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      writers: {
        select: {
          person: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    return null;
  }

  const writers = person.writers.map((writer) => writer.person);

  return writers;
};

const directors = async ({
  id,
}: {
  id: string;
}): Promise<PersonSchema[] | null> => {
  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      directors: {
        select: {
          person: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    return null;
  }

  const directors = person.directors.map((director) => director.person);

  return directors;
};

const episodesRepository = {
  get: {
    all,
    byId,
    writers,
    directors,
  },
};

export { episodesRepository };
