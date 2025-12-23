export interface Studio {
  id: string;
  name: string;
  founded: number;
  location: string;
  website: string | null;
}

export interface Show {
  id: string;
  title: string;
  titleJapanese: string;
  episodes: number;
  aired: string;
  studioId: string;
  synopsis: string;
}

export interface Movie {
  id: string;
  title: string;
  titleJapanese: string;
  releaseDate: string;
  runtime: number;
  studioId: string;
  synopsis: string;
}

export interface Character {
  id: string;
  name: string;
  nameJapanese: string;
  age: number | null;
  gender: string;
  occupations: string[];
  bio: string;
  showIds: string[];
  movieIds: string[];
  organizationIds: string[];
  episodeIds: string[];
}

export interface Organization {
  id: string;
  name: string;
  nameJapanese: string;
  type: string;
  description: string;
  episodeIds: string[];
}

export interface Episode {
  id: string;
  showId: string;
  episodeNumber: number;
  title: string;
  titleJapanese: string;
  airDate: string;
  synopsis: string;
  characterIds: string[];
  angelIds: string[];
}

export interface Angel {
  id: string;
  name: string;
  nameJapanese: string;
  number: number;
  description: string;
  episodeIds: string[];
}
