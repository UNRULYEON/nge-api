import { prisma } from "@/db";
import type { CharacterSchema } from "@/schemas";

const all = async (): Promise<CharacterSchema[]> => {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
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
      imageUrl: true,
    },
  });

  return character;
};

const charactersRepository = {
  get: {
    all,
    byId,
  },
};

export { charactersRepository };
