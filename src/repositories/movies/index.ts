import { prisma } from "@/db";
import type { MovieSchema, PersonSchema } from "@/schemas";
import type { MediaCharacter } from "@/types";
import type { Media } from "@prisma/client";

const all = async (): Promise<MovieSchema[]> => {
  const movies = await prisma.movie.findMany({
    select: {
      id: true,
      titleEnglish: true,
      titleJapanese: true,
      titleJapaneseLiteral: true,
      titleRomaji: true,
      imageUrl: true,
      runTimeInMinutes: true,
    },
  });

  return movies;
};

const byId = async ({ id }: { id: string }): Promise<MovieSchema | null> => {
  const movie = await prisma.movie.findUnique({
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
      runTimeInMinutes: true,
    },
  });

  return movie;
};

const byDirector = async ({
  id,
}: {
  id: string;
}): Promise<PersonSchema[] | null> => {
  const people = await prisma.movie.findUnique({
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

  if (!people) {
    return null;
  }

  const directors = people.directors.map((director) => director.person);

  return directors;
};

const characters = async ({
  id,
}: {
  id: string;
}): Promise<MediaCharacter[] | null> => {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!movie) {
    return null;
  }

  const mediaCharacters = await prisma.mediaCharacter.findMany({
    where: {
      movieId: movie.id,
    },
    select: {
      id: true,

      movieId: true,
      episodeId: true,
      characterId: true,

      media: true,
      characterName: true,
      imageUrl: true,
    },
  });

  return mediaCharacters;
};

const moviesRepository = {
  get: {
    all,
    byId,
    byDirector,
    characters,
  },
};

export { moviesRepository };
