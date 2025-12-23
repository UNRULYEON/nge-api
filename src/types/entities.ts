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
