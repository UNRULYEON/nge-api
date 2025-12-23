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
}

export interface Organization {
  id: string;
  name: string;
  nameJapanese: string;
  type: string;
  description: string;
}
