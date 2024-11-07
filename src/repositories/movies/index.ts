import { prisma } from "@/db";
import { MovieSchema, PersonSchema } from "@/schemas";

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

const byId = async (movieId: string): Promise<MovieSchema | null> => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
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

const byDirector = async (personId: string): Promise<PersonSchema[] | null> => {
  const people = await prisma.movie.findUnique({
    where: {
      id: personId,
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

const moviesRepository = {
  get: {
    all,
    byId,
    byDirector,
  },
};

export { moviesRepository };
