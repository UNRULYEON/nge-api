import type { Episode } from "@prisma/client";

export const sortEpisodes = <T extends { number: Episode["number"] }>(
  episodes: T[]
) => episodes.sort((a, b) => Number(a.number) - Number(b.number));
