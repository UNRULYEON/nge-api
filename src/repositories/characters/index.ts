import { prisma } from "@/db";
import type { CharacterSchema, MediaCharacter } from "@/schemas";

const all = async (): Promise<CharacterSchema[]> => {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return characters;
};

const byId = async ({
  id,
}: {
  id: string;
}): Promise<CharacterSchema | null> => {
  const character = await prisma.character.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return character;
};

const appearsIn = async ({
  characterId,
}: {
  characterId: string;
}): Promise<MediaCharacter[] | null> => {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
    select: {
      id: true,
    },
  });

  if (!character) {
    return null;
  }
  const mediaCharacters = await prisma.mediaCharacter.findMany({
    where: {
      characterId: character.id,
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

const charactersRepository = {
  get: {
    all,
    byId,
  },
  appearsIn,
};

export { charactersRepository };
