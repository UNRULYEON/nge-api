import type { Media } from "@prisma/client";

export type MediaCharacter = {
  id: string;

  characterId: string;
  movieId: string | null;
  episodeId: string | null;

  media: Media;
  characterName: string;
  imageUrl: string | null;
};
