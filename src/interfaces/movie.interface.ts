export type MovieGenre = {
    id: number;
    name: string;
  }

export type MovieAPIResponse = {
  page: number;
  results: MovieResult[];
  total_pages?: number;
  total_results?: number;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Pick<MovieGenre, 'id'>[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};


export enum ImageSizeEnum {
  W92 = 'w92',
  W154 = 'w154',
  W185 = 'w185',
  W342 = 'w342',
  W500 = 'w500',
  W780 = 'w780',
  ORIGINAL = 'original'
}
