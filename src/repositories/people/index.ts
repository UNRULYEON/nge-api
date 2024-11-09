import { prisma } from "@/db";
import type { PersonSchema, WrittenSchema, DirectedSchema } from "@/schemas";
import { sortEpisodes } from "@/utils";

const all = async (): Promise<PersonSchema[]> => {
  const people = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  return people;
};

const byId = async ({ id }: { id: string }): Promise<PersonSchema | null> => {
  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  return person;
};

const written = async ({
  id,
}: {
  id: string;
}): Promise<WrittenSchema | null> => {
  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    select: {
      written: {
        select: {
          episode: {
            select: {
              id: true,
              number: true,
              titleEnglish: true,
              titleJapanese: true,
              titleRomaji: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    return null;
  }

  const episodesDirected = person.written
    .map((m) => m.episode)
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return {
    episodes: sortEpisodes(episodesDirected),
    movies: [],
  };
};

const directed = async ({
  id,
}: {
  id: string;
}): Promise<DirectedSchema | null> => {
  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    select: {
      directed: {
        select: {
          type: true,
          episode: {
            select: {
              id: true,
              number: true,
              titleEnglish: true,
              titleJapanese: true,
              titleRomaji: true,
            },
          },
          movie: {
            select: {
              id: true,
              titleEnglish: true,
              titleJapanese: true,
              titleJapaneseLiteral: true,
              titleRomaji: true,
              imageUrl: true,
              runTimeInMinutes: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    return null;
  }

  const episodesDirected = person.directed
    .map((m) => m.episode)
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const moviesDirected = person.directed
    .map((m) => m.movie)
    .filter((m): m is NonNullable<typeof m> => m !== null);

  return {
    episodes: sortEpisodes(episodesDirected),
    movies: moviesDirected,
  };
};

const personRepository = {
  get: {
    all,
    byId,
    written,
    directed,
  },
};

export { personRepository };
